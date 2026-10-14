/* Motor de progresso da Central: transforma os dados de cada painel em evolução, recordes, sequências e marcos.
   Funções puras (sem DOM nem rede): recebem um objeto `d` e devolvem números. Testável no Node.
   d = { sessions:[], habitos:{config,records}, grimorio:{entries:[]}, apps:[], profile:{}, medidas:[], fin:{portfolio:[]}, investEntries:{},
         mud:{check:{done,extra}, cfg:{}, imoveis:[], cotacoes:[]}, exercicios:{id:nome} } */
(function (root) {
  'use strict';
  var DIA = 864e5;

  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getTime()); d.setDate(d.getDate() + n); return d; }
  function segunda(dt) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); var w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); return d; }
  function num(v) { var n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isNaN(n) ? 0 : n; }
  function na(lista, campo, ini, fim) { // quantos itens têm a data do campo em [ini, fim)
    return lista.filter(function (x) { if (!x[campo]) return false; var t = parse(x[campo]).getTime(); return t >= ini.getTime() && t < fim.getTime(); }).length;
  }

  /* ---------- Treino ---------- */
  function e1rm(w, r) { return w * (1 + r / 30); } // Epley, a mesma fórmula do painel de treino
  function treino(d, hoje) {
    var ss = (d.sessions || []).slice().sort(function (a, b) { return (a.timestamp || 0) - (b.timestamp || 0); });
    var melhor = {}, prs = [];
    ss.forEach(function (s) {
      Object.keys(s.exercises || {}).forEach(function (ex) {
        var topo = 0;
        (s.exercises[ex] || []).forEach(function (set) {
          var w = num(set.weight), r = num(set.reps);
          if (set.done && w > 0 && r > 0) topo = Math.max(topo, e1rm(w, r));
        });
        if (!topo) return;
        if (melhor[ex] !== undefined && topo > melhor[ex] + 0.05) {
          prs.push({ ex: ex, nome: (d.exercicios || {})[ex] || ex, de: melhor[ex], para: topo, pct: (topo / melhor[ex] - 1) * 100, data: s.dateISO });
        }
        if (melhor[ex] === undefined || topo > melhor[ex]) melhor[ex] = topo;
      });
    });
    var ini = segunda(hoje), ant = addDias(ini, -7), fim = addDias(ini, 7);
    // carga média por sessão (volume/ séries concluídas) para a linha de evolução
    var serie = ss.slice(-6).map(function (s) {
      var tot = 0, n = 0;
      Object.keys(s.exercises || {}).forEach(function (ex) { (s.exercises[ex] || []).forEach(function (set) { if (set.done && num(set.weight) > 0) { tot += num(set.weight); n++; } }); });
      return n ? tot / n : 0;
    });
    return {
      total: ss.length, semana: na(ss, 'dateISO', ini, fim), anterior: na(ss, 'dateISO', ant, ini),
      hoje: ss.filter(function (s) { return s.dateISO === iso(hoje); }).length,
      prs: prs, ultimoPR: prs.length ? prs[prs.length - 1] : null, serie: serie
    };
  }

  /* ---------- Hábitos: sequência com "pausa" (1 dia ruim a cada 7 não quebra) ---------- */
  function habitosDiarios(cfg) { return ((cfg && cfg.habits) || []).filter(function (h) { return h.freq === 'day'; }); }
  function bateu(h, v) { return h.kind === 'boolean' ? !!v : num(v) >= h.target; }
  function habitos(d, hoje) {
    var cfg = (d.habitos && d.habitos.config) || null, rec = (d.habitos && d.habitos.records) || {};
    if (!cfg) return { ativo: false, feitosHoje: 0, totalHoje: 0, sequencia: 0, pausas: 0, melhor: 0, emRisco: false, semana: [] };
    var diarios = habitosDiarios(cfg);
    function feitos(dia) { var r = rec[dia] || {}; return diarios.filter(function (h) { return bateu(h, r[h.id]); }).length; }
    function bom(dia) { return diarios.length ? feitos(dia) >= Math.ceil(diarios.length / 2) : false; }
    // sequência que termina em `fim` (um dia bom). Uma falha isolada vira "pausa"; duas falhas em menos de 7 dias quebram.
    function corrida(fim) {
      var dt = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate()), seq = 0, pausas = 0, ultima = null, set = {}, guarda = 0;
      while (guarda++ < 800) {
        if (bom(iso(dt))) { seq++; }
        else if (seq > 0 && (ultima === null || (ultima - dt) / DIA >= 7)) { pausas++; ultima = new Date(dt.getTime()); set[iso(dt)] = 1; }
        else break;
        dt = addDias(dt, -1);
      }
      return { seq: seq, pausas: pausas, set: set };
    }
    var h0 = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    var fim = bom(iso(h0)) ? h0 : addDias(h0, -1); // hoje ainda pode virar: não zera a sequência durante o dia
    var atual = corrida(fim);
    // melhor sequência já alcançada: o maior valor entre todos os dias bons do histórico
    var melhor = atual.seq, datas = Object.keys(rec).sort();
    datas.forEach(function (k) { if (bom(k)) { var c = corrida(parse(k)).seq; if (c > melhor) melhor = c; } });
    var semana = [], ini = segunda(hoje);
    for (var i = 0; i < 7; i++) { var dia = addDias(ini, i), k = iso(dia); semana.push({ dia: k, feito: bom(k), pausa: !!atual.set[k], futuro: dia > hoje, hoje: k === iso(hoje) }); }
    return { ativo: true, feitosHoje: feitos(iso(hoje)), totalHoje: diarios.length, sequencia: atual.seq, pausas: atual.pausas,
      melhor: melhor, emRisco: !bom(iso(h0)) && atual.seq > 0, semana: semana };
  }

  /* ---------- Grimório: dias seguidos com registro ---------- */
  function grimorio(d, hoje) {
    var datas = {}; ((d.grimorio && d.grimorio.entries) || []).forEach(function (e) { if (e.date) datas[String(e.date).slice(0, 10)] = 1; });
    var dt = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    if (!datas[iso(dt)]) dt = addDias(dt, -1);
    var seq = 0; while (datas[iso(dt)]) { seq++; dt = addDias(dt, -1); }
    return { total: Object.keys(datas).length, sequencia: seq, hoje: !!datas[iso(hoje)] };
  }

  /* ---------- Rota: candidaturas na semana ---------- */
  function rota(d, hoje) {
    var apps = d.apps || [], meta = Math.max(1, num((d.profile || {}).weeklyGoal) || 10);
    var ini = segunda(hoje), ant = addDias(ini, -7), fim = addDias(ini, 7);
    return { semana: na(apps, 'appliedAt', ini, fim), anterior: na(apps, 'appliedAt', ant, ini), meta: meta, total: apps.length,
      hoje: apps.filter(function (a) { return a.appliedAt === iso(hoje); }).length };
  }

  /* ---------- Plano alimentar: medidas ---------- */
  function plano(d, hoje) {
    var m = (d.medidas || []).filter(function (x) { return x.date; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var pesos = m.filter(function (x) { return num(x.peso) > 0; });
    var ult = pesos[pesos.length - 1], pri = pesos[0];
    return { total: m.length, ultimoPeso: ult ? num(ult.peso) : null, variacao: ult && pri && ult !== pri ? num(ult.peso) - num(pri.peso) : null,
      hoje: m.filter(function (x) { return x.date === iso(hoje); }).length };
  }

  /* ---------- Financeiro: entrada do imóvel ---------- */
  function financeiro(d) {
    var meta = num(((d.mud || {}).cfg || {}).entrada) || 75000, total = 0, ie = d.investEntries || {}, ks = Object.keys(ie);
    if (ks.length && ks.every(function (k) { return typeof ie[k] === 'number' || !isNaN(num(ie[k])); })) ks.forEach(function (k) { total += num(ie[k]); });
    else ((d.fin && d.fin.portfolio) || []).forEach(function (p) { total += num(p.valor); });
    return { guardado: total, meta: meta, pct: meta ? Math.min(100, Math.round(total / meta * 100)) : 0 };
  }

  /* ---------- Mudança ---------- */
  var FASES_N = [5, 5, 8, 7, 5, 5]; // itens do checklist padrão por fase (precisa bater com mudanca.html)
  function mudanca(d) {
    var m = d.mud || {}, ch = m.check || {}, done = ch.done || {}, extra = (ch.extra || []).length;
    var total = FASES_N.reduce(function (a, b) { return a + b; }, 0) + extra, n = Object.keys(done).filter(function (k) { return done[k]; }).length;
    return { pct: total ? Math.round(n / total * 100) : 0, feitos: n, total: total, imoveis: (m.imoveis || []).length, cotacoes: (m.cotacoes || []).length };
  }

  /* ---------- Marcos: conquistas que se acendem aos poucos ---------- */
  function marcos(p) {
    var l = [];
    function add(id, nome, ok) { l.push({ id: id, nome: nome, ok: !!ok }); }
    add('t1', '1º treino registrado', p.treino.total >= 1);
    add('t5', '5 treinos', p.treino.total >= 5);
    add('tpr', '1º recorde de carga', p.treino.prs.length >= 1);
    add('t10', '10 treinos', p.treino.total >= 10);
    add('h3', '3 dias seguidos nos hábitos', p.habitos.sequencia >= 3);
    add('h7', '7 dias seguidos nos hábitos', p.habitos.sequencia >= 7);
    add('h14', '14 dias seguidos nos hábitos', p.habitos.sequencia >= 14);
    add('h30', '30 dias seguidos nos hábitos', p.habitos.sequencia >= 30);
    add('g3', '3 dias de estudo no Grimório', p.grimorio.sequencia >= 3);
    add('r1', '1ª candidatura', p.rota.total >= 1);
    add('r10', 'Meta semanal de candidaturas batida', p.rota.semana >= p.rota.meta);
    add('f10', '10% da entrada do imóvel', p.financeiro.pct >= 10);
    add('f25', '25% da entrada do imóvel', p.financeiro.pct >= 25);
    add('f50', 'Metade da entrada do imóvel', p.financeiro.pct >= 50);
    add('m1', '1º imóvel anotado', p.mudanca.imoveis >= 1);
    add('m3', '3 orçamentos de mudança', p.mudanca.cotacoes >= 3);
    add('m50', 'Metade do checklist da mudança', p.mudanca.pct >= 50);
    add('p1', '1ª medição do plano alimentar', p.plano.total >= 1);
    return l;
  }

  function coisasHoje(p) {
    return p.treino.hoje + p.habitos.feitosHoje + p.rota.hoje + (p.grimorio.hoje ? 1 : 0) + p.plano.hoje;
  }

  function calcular(d, hoje) {
    hoje = hoje || new Date();
    var p = { treino: treino(d, hoje), habitos: habitos(d, hoje), grimorio: grimorio(d, hoje), rota: rota(d, hoje), plano: plano(d, hoje), financeiro: financeiro(d), mudanca: mudanca(d) };
    p.marcos = marcos(p); p.hoje = coisasHoje(p); return p;
  }

  var api = { calcular: calcular, iso: iso, e1rm: e1rm };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_PROG = api;
})(typeof window !== 'undefined' ? window : globalThis);
