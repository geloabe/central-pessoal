/* Financeiro: converte lançamentos sincronizados da Pluggy (Nubank, Open Finance) para o formato do painel.
   Funções puras (sem DOM nem rede). Testável no Node: tests/pluggy-fin.test.mjs.
   Entrada: txs = [{id,date,desc,value,type,source,pluggyCategory}] (valor > 0 = gasto, < 0 = entrada).
   Regras (o que NÃO vira gasto): entradas na conta, aportes/resgates de investimento, pagamento da fatura
   (já conta nas compras do cartão), empréstimos. Tudo isso volta em `ignorados` com o motivo. */
(function (root) {
  'use strict';
  var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  // categoria da Pluggy -> categoria do painel
  var CAT = {
    'eating out': 'restaurante', 'food delivery': 'restaurante', 'restaurants': 'restaurante',
    'groceries': 'supermercado', 'supermarkets': 'supermercado',
    'taxi and ridesharing': 'transporte', 'transportation': 'transporte', 'gas stations': 'transporte', 'public transport': 'transporte', 'parking': 'transporte', 'tolls and in vehicle payment': 'transporte',
    'digital services': 'assinaturas', 'video streaming': 'assinaturas', 'music streaming': 'assinaturas',
    'tickets': 'lazer', 'entertainment': 'lazer', 'gaming': 'lazer', 'leisure': 'lazer', 'gyms and fitness centers': 'lazer', 'events': 'lazer',
    'education': 'educacao', 'courses': 'educacao',
    'health': 'saude', 'pharmacy': 'saude', 'healthcare': 'saude', 'dentist': 'saude',
    'online shopping': 'compras_online',
    'clothing': 'vestuario', 'fashion': 'vestuario',
    'travel': 'viagem', 'airport and airlines': 'viagem', 'accomodation': 'viagem', 'accommodation': 'viagem',
    'electricity': 'energia', 'internet': 'internet', 'tv': 'internet', 'telecommunications': 'internet', 'mobile': 'internet',
    'transfers': 'pix_pessoas', 'transfer - pix': 'pix_pessoas', 'third party transfers': 'pix_pessoas',
    'housing': 'moradia', 'rent': 'aluguel'
  };

  // palavras na descrição que valem mais que a categoria da Pluggy (fixos conhecidos)
  var REGRAS = [
    [/loup im[oó]veis|aluguel/, 'aluguel'],
    [/tenda neg[oó]cios|financiamento imobili/, 'financiamento'],
    [/enel/, 'energia'],
    [/alares/, 'internet'],
    [/times office/, 'educacao'],
    [/\buber\b|\b99 ?(app|pop|taxi)|99\*/, 'transporte'],
    [/spotify|netflix|amazon prime|apple\.com\/bill|youtube|disney|hbo|globoplay/, 'assinaturas']
  ];

  function semAcento(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  // "Compra no débito|MP *CAFETERIA" -> "MP *CAFETERIA"; "Transferência enviada|Fulano" -> "Pix: Fulano"
  function limpaDesc(d) {
    d = String(d || '').trim();
    var i = d.indexOf('|');
    if (i < 0) return d;
    var pre = semAcento(d.slice(0, i)).toLowerCase(), resto = d.slice(i + 1).trim();
    if (/transferencia (enviada|recebida)/.test(pre)) return 'Pix: ' + resto;
    return resto || d;
  }

  // chave para casar a mesma loja entre o histórico e o novo lançamento
  function chave(d) {
    return semAcento(limpaDesc(d)).toLowerCase().replace(/^(pix( qr)?:|mp ?\*|pagamento de boleto efetuado - )\s*/, '').replace(/\(parcela.*\)/, '').replace(/[^a-z]+/g, ' ').trim();
  }

  // aprende com o histórico do painel: loja -> categoria mais usada (respeita o que você já classificou)
  function aprender(historico) {
    var cont = {};
    (historico || []).forEach(function (t) {
      var k = chave(t.desc); if (!k || !t.category) return;
      (cont[k] = cont[k] || {})[t.category] = (cont[k][t.category] || 0) + 1;
    });
    var out = {};
    Object.keys(cont).forEach(function (k) {
      out[k] = Object.keys(cont[k]).sort(function (a, b) { return cont[k][b] - cont[k][a]; })[0];
    });
    return out;
  }

  function categoria(t, aprendido) {
    var desc = semAcento(t.desc).toLowerCase();
    var k = chave(t.desc);
    if (aprendido && aprendido[k]) return aprendido[k];
    for (var i = 0; i < REGRAS.length; i++) if (REGRAS[i][0].test(desc)) return REGRAS[i][1];
    if (/^pix:/.test(semAcento(limpaDesc(t.desc)).toLowerCase())) return 'pix_pessoas';
    return CAT[String(t.pluggyCategory || '').toLowerCase()] || 'outros';
  }

  // devolve o motivo para NÃO contar como gasto, ou null
  function motivoIgnorar(t) {
    var d = semAcento(t.desc).toLowerCase();
    var cartao = /cart/.test(String(t.source).toLowerCase());
    if (/investimento|rdb|caixinha|tesouro|cdb/.test(d) && /transferido para|recebido de|aplicacao|resgate/.test(d)) return 'investimento';
    if (/emprestimo/.test(d)) return 'empréstimo';
    if (/pagamento (recebido|da fatura)|fatura/.test(d) && /pagamento|fatura/.test(d)) return 'pagamento de fatura';
    if (!cartao && t.value < 0) return 'entrada na conta';
    return null;
  }

  function mesIdx(date) { return Number(String(date).slice(5, 7)) - 1; }

  /* txs: lançamentos da Pluggy; historico: transações já no painel (para aprender categorias);
     desde: "AAAA-MM-DD" (nada antes disso entra). */
  function paraPainel(txs, historico, desde) {
    var aprendido = aprender(historico), lancamentos = [], ignorados = [];
    (txs || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; }).forEach(function (t) {
      if (desde && t.date < desde) return;
      var motivo = motivoIgnorar(t);
      if (motivo) { ignorados.push({ id: t.id, date: t.date, desc: limpaDesc(t.desc), value: t.value, motivo: motivo }); return; }
      var cartao = /cart/.test(String(t.source).toLowerCase());
      var i = mesIdx(t.date), mes = MESES[i];
      lancamentos.push({
        id: t.id, date: t.date, desc: limpaDesc(t.desc), category: categoria(t, aprendido), value: t.value,
        month: mes, budgetMonth: cartao ? (MESES[i + 1] || mes) : mes, // compra no cartão pesa no mês seguinte (fatura)
        source: cartao ? 'Cartão de crédito' : 'Nubank', type: 'expense', paymentMethod: cartao ? 'cartao' : 'conta', pluggy: true
      });
    });
    return { lancamentos: lancamentos, ignorados: ignorados };
  }

  var api = { paraPainel: paraPainel, categoria: categoria, aprender: aprender, limpaDesc: limpaDesc, motivoIgnorar: motivoIgnorar, chave: chave };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CP_PLUGGY = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
