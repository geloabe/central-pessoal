/* Acompanhamento da compra: parcelas da Tenda (quadro resumo do contrato) e juros (encargos) de obra da Caixa.
   Funções puras (sem DOM nem rede), testáveis no Node. Dados do usuário (documento imv_acomp/main):
   { pagas:{'pre-1':{d:'AAAA-MM-DD', v:350}}, obra:[{id,mes:'AAAA-MM',v:812.5}], caixa:{assinatura:'AAAA-MM-DD', taxa:'5,5'} }
   Valores do CONTRATO vêm do quadro resumo (contrato Tenda, Solar dos Ventos Prime, torre 01, apto 803). */
(function (root) {
  'use strict';
  var DIA = 864e5;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }
  function dias(a, b) { return Math.round((parse(iso(b)) - parse(iso(a))) / DIA); }
  /* mesmo dia dos meses seguintes; se o mês não tiver o dia, usa o último dia do mês */
  function addMeses(dt, n) {
    var y = dt.getFullYear(), m = dt.getMonth() + n, d = dt.getDate(), ult = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(d, ult));
  }

  var CONTRATO = {
    preco: 265882.51, ato: 3500, financiamento: 212706.01, adimplente: 37476.90,
    pre: { n: 17, valor: 350, primeira: '2026-12-09' },
    pos: { n: 84, valor: 110.33, primeira: '2028-05-04', jurosMes: 1.0 },
    conclusao: '2028-12-26', tolerancia: 180
  };

  function cronograma() {
    var l = [
      { id: 'ato', tipo: 'ato', t: 'Parcela ato (sinal)', valor: CONTRATO.ato, data: null },
      { id: 'fin', tipo: 'fin', t: 'Parcela financiamento (a Caixa paga à Tenda)', valor: CONTRATO.financiamento, data: null }
    ];
    for (var i = 1; i <= CONTRATO.pre.n; i++) l.push({ id: 'pre-' + i, tipo: 'pre', n: i, t: 'Pré-chaves ' + i + ' de ' + CONTRATO.pre.n, valor: CONTRATO.pre.valor, data: iso(addMeses(parse(CONTRATO.pre.primeira), i - 1)) });
    for (var j = 1; j <= CONTRATO.pos.n; j++) l.push({ id: 'pos-' + j, tipo: 'pos', n: j, t: 'Pós-obra ' + j + ' de ' + CONTRATO.pos.n, valor: CONTRATO.pos.valor, data: iso(addMeses(parse(CONTRATO.pos.primeira), j - 1)) });
    return l;
  }
  var CRONO = cronograma();

  function paga(cfg, id) { return !!(cfg && cfg.pagas && cfg.pagas[id]); }
  function num(v) { var n = +String(v == null ? '' : v).replace(/\./g, '').replace(',', '.'); return isNaN(n) ? 0 : n; }
  function taxaEfetivaAnual(jurosMesPct) { return (Math.pow(1 + jurosMesPct / 100, 12) - 1) * 100; }

  function estado(cfg, hoje) {
    cfg = cfg || {};
    var k = iso(hoje), datadas = CRONO.filter(function (x) { return x.data; });
    var abertas = datadas.filter(function (x) { return !paga(cfg, x.id); });
    var atrasadas = abertas.filter(function (x) { return x.data < k; });
    var prox = abertas[0] || null;
    var pagasDatadas = datadas.length - abertas.length;
    var pago = 0;
    CRONO.forEach(function (x) { var p = cfg.pagas && cfg.pagas[x.id]; if (p) pago += (p.v != null && p.v !== '' ? +p.v : x.valor); });
    var obra = (cfg.obra || []).slice().sort(function (a, b) { return a.mes < b.mes ? -1 : a.mes > b.mes ? 1 : 0; });
    var obraTotal = obra.reduce(function (a, o) { return a + (+o.v || 0); }, 0);
    var ass = cfg.caixa && cfg.caixa.assinatura ? cfg.caixa.assinatura : null;
    return { total: datadas.length, pagas: pagasDatadas, pct: datadas.length ? Math.round(pagasDatadas / datadas.length * 100) : 0,
      proxima: prox, diasProxima: prox ? dias(hoje, parse(prox.data)) : null, atrasadas: atrasadas, pago: pago,
      obra: obra, obraTotal: obraTotal, obraUltima: obra.length ? obra[obra.length - 1] : null,
      primeiroEncargoAte: ass ? iso(addDias(parse(ass), 30)) : null,
      atoPago: paga(cfg, 'ato'), finPago: paga(cfg, 'fin'),
      conclusao: CONTRATO.conclusao, conclusaoComTolerancia: iso(addDias(parse(CONTRATO.conclusao), CONTRATO.tolerancia)),
      taxaPosAnual: taxaEfetivaAnual(CONTRATO.pos.jurosMes) };
  }

  /* ---------- Alterações (devolvem novos objetos, sem mutar) ---------- */
  function alternar(cfg, id, hoje, valor) {
    var p = Object.assign({}, (cfg && cfg.pagas) || {});
    if (p[id]) delete p[id]; else p[id] = { d: iso(hoje), v: valor != null ? valor : null };
    return p;
  }
  function definirValor(cfg, id, valor) {
    var p = Object.assign({}, (cfg && cfg.pagas) || {});
    if (!p[id]) return p;
    p[id] = Object.assign({}, p[id], { v: valor > 0 ? valor : null });
    return p;
  }
  function addObra(cfg, item) {
    var l = ((cfg && cfg.obra) || []).filter(function (o) { return o.mes !== item.mes; });
    return l.concat([{ id: item.id, mes: item.mes, v: item.v }]);
  }
  function rmObra(cfg, id) { return ((cfg && cfg.obra) || []).filter(function (o) { return o.id !== id; }); }

  var api = { CONTRATO: CONTRATO, CRONO: CRONO, iso: iso, parse: parse, addDias: addDias, addMeses: addMeses, dias: dias, num: num,
    taxaEfetivaAnual: taxaEfetivaAnual, estado: estado, alternar: alternar, definirValor: definirValor, addObra: addObra, rmObra: rmObra };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_IMV = api;
})(typeof window !== 'undefined' ? window : globalThis);
