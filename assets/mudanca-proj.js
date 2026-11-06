/* Mudança: projeção "ficar no aluguel atual" x "mudar agora para um aluguel mais barato".
   Funções puras (sem DOM nem rede). Testável no Node: tests/mudanca-proj.test.mjs.
   Compara o custo mensal TOTAL de morar (aluguel + condomínio + IPTU/12 + água) até a entrega do apartamento próprio.
   A segunda mudança (para o apê próprio) acontece nos dois cenários, então não entra na comparação.
   A caução do novo volta no fim do contrato: pesa no caixa, não é custo. A pintura é devida de qualquer jeito. */
(function (root) {
  'use strict';
  var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var PADRAO = {
    aluguelAtual: 1440, outrosAtual: 0, aluguelNovo: 800, condNovo: null, iptuAnoNovo: 150, aguaNovo: 30,
    multa: 2000, mudanca: 800, mesSaida: '2026-12', mesEntrega: '2028-04',
    caucaoMeses: 3, caucaoEntradaPct: 50, caucaoParcelas: 3
  };

  function n(v, d) { var x = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isNaN(x) ? d : x; }
  function idx(ym) { var p = String(ym).split('-'); return Number(p[0]) * 12 + Number(p[1]) - 1; }
  function rotulo(i) { return MESES[((i % 12) + 12) % 12] + '/' + String(Math.floor(i / 12)).slice(2); }
  function r0(x) { return Math.round(x); }

  function calcular(entrada) {
    var o = {}, k;
    for (k in PADRAO) o[k] = PADRAO[k];
    for (k in (entrada || {})) if (entrada[k] !== '' && entrada[k] != null) o[k] = entrada[k];
    var aluguelAtual = n(o.aluguelAtual, PADRAO.aluguelAtual), outrosAtual = n(o.outrosAtual, 0);
    var condInformado = !(o.condNovo === null || o.condNovo === undefined || o.condNovo === '' || isNaN(parseFloat(String(o.condNovo).replace(',', '.'))));
    var cond = condInformado ? n(o.condNovo, 0) : 0;
    var iptuMes = n(o.iptuAnoNovo, 0) / 12;
    var novo = n(o.aluguelNovo, 0) + cond + iptuMes + n(o.aguaNovo, 0);
    var atual = aluguelAtual + outrosAtual;
    var meses = Math.max(1, idx(o.mesEntrega) - idx(o.mesSaida));
    var custoExtra = n(o.multa, 0) + n(o.mudanca, 0);
    var economiaMes = atual - novo;
    var ganho = economiaMes * meses - custoExtra;
    var equilibrio = economiaMes > 0 ? custoExtra / economiaMes : null;
    var base = n(o.aluguelNovo, 0) + iptuMes + n(o.aguaNovo, 0);
    // condomínio máximo do novo para a mudança ainda compensar até a entrega do apê
    var condMax = atual - base - custoExtra / meses;

    var serie = [], i;
    for (i = 1; i <= meses; i++) serie.push({ mes: rotulo(idx(o.mesSaida) + i - 1), acumulado: r0(economiaMes * i - custoExtra) });

    var caucao = n(o.caucaoMeses, 3) * n(o.aluguelNovo, 0), entradaC = caucao * n(o.caucaoEntradaPct, 50) / 100;
    var parcelas = Math.max(1, n(o.caucaoParcelas, 3)), parcela = (caucao - entradaC) / parcelas;
    var caixa = [{ mes: rotulo(idx(o.mesSaida)), valor: r0(n(o.mudanca, 0) + entradaC), nota: 'mudança + entrada da caução' }];
    for (i = 1; i <= parcelas; i++) caixa.push({ mes: rotulo(idx(o.mesSaida) + i), valor: r0(parcela), nota: 'parcela da caução' });

    var sens = [0, 100, 150, 200, 250, 300, 350].map(function (c) {
      var e = atual - (base + c), g = e * meses - custoExtra;
      return { cond: c, economiaMes: r0(e), ganho: r0(g), equilibrio: e > 0 ? Math.round(custoExtra / e * 10) / 10 : null };
    });

    return {
      entrada: o, condInformado: condInformado, meses: meses, atual: r0(atual), novo: r0(novo), economiaMes: r0(economiaMes),
      custoExtra: r0(custoExtra), ganho: r0(ganho), equilibrio: equilibrio == null ? null : Math.round(equilibrio * 10) / 10,
      mesEquilibrio: equilibrio == null ? null : rotulo(idx(o.mesSaida) + Math.ceil(equilibrio) - 1),
      condMax: r0(condMax), serie: serie, caixa: caixa, caucao: r0(caucao), sensibilidade: sens,
      compensa: ganho > 0
    };
  }

  var api = { calcular: calcular, PADRAO: PADRAO };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CP_MUDPROJ = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
