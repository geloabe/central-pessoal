/* Motor de estudo da certificação: repetição espaçada, filas, domínio por tópico e simulados.
   Funções puras (sem DOM nem rede), testáveis no Node. Usa CP_CERT (assets/cert.js) para datas e tópicos.
   Estado do usuário (documento cert/main):
     srs:   { idDoCartaoOuQuestao: { b:0..5 caixa, p:'AAAA-MM-DD' próxima revisão, n:revisões, e:erros, u:1|0 último resultado } }
     aulas: { dia: 'AAAA-MM-DD' }   quiz: { dia: { pct, data, n } }   labs: { dia: 'AAAA-MM-DD' }   notas: { dia: 'texto' } */
(function (root) {
  'use strict';
  var INTERVALOS = [0, 1, 3, 7, 14, 30]; // dias até a próxima revisão ao chegar em cada caixa
  var QTD = { completo: [11, 13, 10, 7, 9], parcial: [7, 8, 6, 4, 5] }; // por seção; 50 e 30 questões (pesos 22/25/20/15/18)
  function T() { return root.CP_PLANO_ESTUDO || root.CP_CERT; } // o PDI entrega o próprio plano; sem ele, vale a certificação

  /* nota: 0 errei, 1 difícil, 2 bom, 3 fácil */
  function proximo(e, nota, hoje) {
    var t = T(), b = e && e.b ? e.b : 0, n = ((e && e.n) || 0) + 1, er = (e && e.e) || 0, u = 1, dias;
    if (nota === 0) { b = 1; er++; u = 0; dias = 1; }
    else if (nota === 1) { b = Math.max(1, b); dias = Math.max(1, Math.ceil(INTERVALOS[b] / 2)); }
    else if (nota === 2) { b = Math.min(5, b + 1); dias = INTERVALOS[b]; }
    else { b = Math.min(5, b + 2); dias = INTERVALOS[b]; }
    return { b: b, n: n, e: er, u: u, p: t.iso(t.addDias(hoje, dias)) };
  }

  function achata(C, campo) {
    var out = [];
    Object.keys((C && C.dias) || {}).forEach(function (n) { ((C.dias[n] || {})[campo] || []).forEach(function (x) { out.push(Object.assign({ dia: +n }, x)); }); });
    if (campo === 'questoes') ((C && C.mix) || []).forEach(function (x) { out.push(Object.assign({ dia: 0, mix: true }, x)); });
    return out;
  }
  function banco(C) { return achata(C, 'questoes'); }
  function cartoes(C) { return achata(C, 'cartoes'); }

  function primeiroDiaDoTopico(id) {
    var t = T().TOPICOS.filter(function (x) { return x.id === id; })[0];
    return t ? Math.min.apply(null, t.d) : 1;
  }
  /* Só entra no estudo o que já foi apresentado no plano (dia <= dia atual). Questões do banco misto seguem o 1º dia do tópico. */
  function liberada(item, diaPlano, todos) {
    if (todos) return true;
    if (item.mix) return primeiroDiaDoTopico(item.t) <= diaPlano;
    return item.dia <= diaPlano;
  }

  function filaCartoes(C, srs, hoje, diaPlano, opts) {
    opts = opts || {}; srs = srs || {};
    var h = T().iso(hoje), max = opts.maxNovos == null ? 25 : opts.maxNovos;
    var lib = cartoes(C).filter(function (c) { return liberada(c, diaPlano, opts.todos); });
    var devidos = lib.filter(function (c) { return srs[c.id] && srs[c.id].p <= h; }).sort(function (a, b) { return srs[a.id].p < srs[b.id].p ? -1 : 1; });
    var novos = lib.filter(function (c) { return !srs[c.id]; }).sort(function (a, b) { return a.dia - b.dia; }).slice(0, max);
    return { devidos: devidos, novos: novos, total: lib.length, vistos: lib.filter(function (c) { return srs[c.id]; }).length };
  }

  function questoesDevidas(C, srs, hoje, diaPlano, opts) {
    opts = opts || {}; srs = srs || {};
    var h = T().iso(hoje);
    return banco(C).filter(function (q) { return liberada(q, diaPlano, opts.todos) && srs[q.id] && srs[q.id].p <= h; });
  }
  /* Caderno de erros: já errou e ainda não consolidou (caixa menor que 3) */
  function cadernoErros(C, srs) {
    srs = srs || {};
    return banco(C).filter(function (q) { var s = srs[q.id]; return s && s.e > 0 && s.b < 3; });
  }

  function mulberry(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function embaralhar(arr, rng) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function ordenarPorPrioridade(lista, srs, rng) {
    var novas = [], erradas = [], vistas = [];
    lista.forEach(function (q) { var s = srs[q.id]; (!s ? novas : (s.e > 0 && s.u === 0) ? erradas : vistas).push(q); });
    return embaralhar(novas, rng).concat(embaralhar(erradas, rng), embaralhar(vistas, rng));
  }

  /* tipo: 'completo' (50), 'parcial' (30) ou 'secao' (20 da seção indicada). pool = questões já filtradas por liberação. */
  function montarSimulado(pool, srs, tipo, rng, secao) {
    rng = rng || Math.random; srs = srs || {};
    var alvo = tipo === 'secao' ? [0, 0, 0, 0, 0] : QTD[tipo] || QTD.completo;
    if (tipo === 'secao') alvo[(secao || 1) - 1] = 20;
    var porSecao = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    pool.forEach(function (q) { if (porSecao[q.s]) porSecao[q.s].push(q); });
    var sel = [], usados = {}, falta = 0;
    [1, 2, 3, 4, 5].forEach(function (s) {
      var cand = ordenarPorPrioridade(porSecao[s], srs, rng), q = alvo[s - 1];
      cand.slice(0, q).forEach(function (x) { sel.push(x); usados[x.id] = 1; });
      if (cand.length < q) falta += q - cand.length;
    });
    if (falta && tipo !== 'secao') {
      var resto = ordenarPorPrioridade(pool.filter(function (q) { return !usados[q.id]; }), srs, rng);
      resto.slice(0, falta).forEach(function (x) { sel.push(x); });
    }
    return embaralhar(sel, rng);
  }

  /* Ordem embaralhada das alternativas (determinística por semente) para não decorar a posição da resposta */
  function ordemAlternativas(q, semente) { return embaralhar(q.o.map(function (_, i) { return i; }), mulberry(semente)); }
  function acertou(q, marcadas) {
    var a = (marcadas || []).slice().sort().join(','), b = q.c.slice().sort().join(',');
    return a === b;
  }

  /* Domínio medido: por tópico e por seção, a partir do último resultado de cada questão respondida */
  function dominio(C, srs) {
    srs = srs || {};
    var porTopico = {}, t = T();
    t.TOPICOS.forEach(function (x) { porTopico[x.id] = { total: 0, resp: 0, ok: 0, pct: null }; });
    banco(C).forEach(function (q) {
      var p = porTopico[q.t]; if (!p) return; p.total++;
      var s = srs[q.id]; if (s && s.n > 0) { p.resp++; if (s.u === 1) p.ok++; }
    });
    Object.keys(porTopico).forEach(function (k) { var p = porTopico[k]; p.pct = p.resp ? Math.round(p.ok / p.resp * 100) : null; });
    var porSecao = t.SECOES.map(function (s) {
      var resp = 0, ok = 0;
      t.TOPICOS.filter(function (x) { return x.s === s.id; }).forEach(function (x) { resp += porTopico[x.id].resp; ok += porTopico[x.id].ok; });
      return { id: s.id, nome: s.nome, peso: s.peso, resp: resp, ok: ok, pct: resp ? Math.round(ok / resp * 100) : null };
    });
    var comDado = porSecao.filter(function (s) { return s.pct != null; }), pesos = comDado.reduce(function (a, s) { return a + s.peso; }, 0);
    var geral = pesos ? Math.round(comDado.reduce(function (a, s) { return a + s.pct * s.peso; }, 0) / pesos) : null;
    return { porTopico: porTopico, porSecao: porSecao, geral: geral, cobertura: comDado.length };
  }

  function topicosFracos(C, srs, n) {
    var d = dominio(C, srs).porTopico;
    return Object.keys(d).filter(function (k) { return d[k].resp >= 2 && d[k].pct != null; }).sort(function (a, b) { return d[a].pct - d[b].pct; }).slice(0, n || 3);
  }

  /* Passos do dia de estudo e se o dia está "dominado" (aula lida, cartões vistos, quiz com 80% ou mais) */
  function passosDoDia(cfg, C, dia) {
    var d = (C && C.dias && C.dias[dia]) || null; cfg = cfg || {};
    if (!d) return null;
    var cs = d.cartoes || [], srs = cfg.srs || {};
    var cartoesVistos = cs.filter(function (c) { return srs[c.id]; }).length;
    var q = (cfg.quiz || {})[dia];
    var passos = {
      aula: !!(cfg.aulas || {})[dia],
      cartoes: cs.length > 0 && cartoesVistos === cs.length, cartoesVistos: cartoesVistos, cartoesTotal: cs.length,
      quiz: !!(q && q.pct >= 80), quizPct: q ? q.pct : null, quizTotal: (d.questoes || []).length,
      lab: d.lab ? !!(cfg.labs || {})[dia] : null,
      explique: !!(((cfg.notas || {})[dia] || '').trim().length >= 20)
    };
    passos.dominado = passos.aula && passos.cartoes && passos.quiz;
    return passos;
  }

  var api = { INTERVALOS: INTERVALOS, QTD: QTD, proximo: proximo, banco: banco, cartoes: cartoes, liberada: liberada, filaCartoes: filaCartoes, questoesDevidas: questoesDevidas,
              cadernoErros: cadernoErros, montarSimulado: montarSimulado, ordemAlternativas: ordemAlternativas, acertou: acertou, dominio: dominio, topicosFracos: topicosFracos,
              passosDoDia: passosDoDia, mulberry: mulberry, embaralhar: embaralhar };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_ESTUDO = api;
})(typeof window !== 'undefined' ? window : globalThis);
