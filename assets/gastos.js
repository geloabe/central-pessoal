/* Gastos da semana e do mês contra os tetos por categoria (Financeiro + tela inicial).
   Funções puras (sem DOM nem rede). Testável no Node: tests/gastos.test.mjs.
   Conta pela DATA DA COMPRA (cartão, débito ou Pix), não pela fatura: é o que mostra o quanto você gastou de verdade.
   Semana = segunda a domingo. */
(function (root) {
  'use strict';
  var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function soma(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x; }
  function r2(n) { return Math.round(n * 100) / 100; }

  function periodo(hoje) {
    var h = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    var dow = (h.getDay() + 6) % 7; // segunda = 0
    var ini = soma(h, -dow), fim = soma(ini, 6);
    var mesIni = new Date(h.getFullYear(), h.getMonth(), 1), mesFim = new Date(h.getFullYear(), h.getMonth() + 1, 0);
    return {
      hoje: iso(h), semIni: iso(ini), semFim: iso(fim), mesIni: iso(mesIni), mesFim: iso(mesFim),
      mesNome: MESES[h.getMonth()], diaDoMes: h.getDate(), diasMes: mesFim.getDate(), diaDaSemana: dow + 1
    };
  }

  /* o = { pluggy:[tx do painel], manuais:[extraTx], base:[transações do histórico], overrides:{id:cat},
           capsMes:{cat:valor}, capsSemana:{cat:valor}, hoje:Date } */
  function resumo(o) {
    var p = periodo(o.hoje || new Date()), ov = o.overrides || {};
    var pluggy = (o.pluggy || []).filter(function (t) { return t.type !== 'income'; });
    // lançamento manual igual a um da Pluggy (mesma data e valor) é duplicata: vale o oficial
    var manuais = (o.manuais || []).filter(function (t) {
      return t.type !== 'income' && !pluggy.some(function (x) { return x.date === t.date && Math.abs(x.value - t.value) < 0.02; });
    });
    var porData = pluggy.concat(manuais);
    var cat = function (t) { return ov[t.id] || t.category || 'outros'; };

    var sem = {}, mes = {}, totS = 0, totM = 0;
    porData.forEach(function (t) {
      var c = cat(t);
      if (t.date >= p.semIni && t.date <= p.semFim) { sem[c] = (sem[c] || 0) + t.value; totS += t.value; }
      if (t.date >= p.mesIni && t.date <= p.mesFim) { mes[c] = (mes[c] || 0) + t.value; totM += t.value; }
    });
    // parcelas e fixos do histórico que pesam neste mês (campo "month"); só entram no mensal
    (o.base || []).forEach(function (t) {
      if (t.type === 'income' || t.month !== p.mesNome) return;
      var c = cat(t); mes[c] = (mes[c] || 0) + t.value; totM += t.value;
    });

    var capsM = o.capsMes || {}, capsS = o.capsSemana || {};
    var cats = {};
    [sem, mes, capsM, capsS].forEach(function (m) { Object.keys(m).forEach(function (c) { cats[c] = 1; }); });
    function estado(v, teto) { if (!teto) return null; var q = v / teto; return q > 1 ? 'estourou' : q >= 0.8 ? 'atencao' : 'ok'; }
    var linhas = Object.keys(cats).map(function (c) {
      var gs = r2(sem[c] || 0), gm = r2(mes[c] || 0), ts = capsS[c] || 0, tm = capsM[c] || 0;
      return { cat: c, semana: gs, mes: gm, tetoSemana: ts, tetoMes: tm, estSemana: estado(gs, ts), estMes: estado(gm, tm),
        pctSemana: ts ? gs / ts : 0, pctMes: tm ? gm / tm : 0 };
    }).filter(function (l) { return l.semana || l.mes || l.tetoSemana || l.tetoMes; });
    // quem tem teto vem primeiro, do mais apertado para o mais folgado; depois o resto por valor no mês
    linhas.sort(function (a, b) {
      var ta = a.tetoSemana || a.tetoMes ? 1 : 0, tb = b.tetoSemana || b.tetoMes ? 1 : 0;
      if (ta !== tb) return tb - ta;
      if (ta) return Math.max(b.pctSemana, b.pctMes) - Math.max(a.pctSemana, a.pctMes);
      return b.mes - a.mes;
    });
    return { periodo: p, semana: { total: r2(totS) }, mes: { total: r2(totM) }, linhas: linhas };
  }

  var api = { periodo: periodo, resumo: resumo };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.CP_GASTOS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
