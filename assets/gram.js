/* Gramática do inglês para a carreira: 12 aulas em 4 blocos (um por semana do módulo Inglês), cada aula com leitura, cartões, quiz de 80%+ e treino de fala.
   Sem calendário: a ordem é a trilha e o ritmo é seu (sugestão: 3 aulas por semana, junto das 4 semanas do módulo Inglês).
   Funções puras (sem DOM nem rede), testáveis no Node. Também expõe CP_PLANO_ESTUDO (plano no formato do motor de estudo).
   Dados do usuário (documento gram/main):
     { aulas:{n:'AAAA-MM-DD'}, quiz:{n:{pct,data,n}}, labs:{n:'AAAA-MM-DD'}, notas:{n:'texto'}, leitura:{n:passo}, srs:{id:{b,p,n,e,u}} } */
(function (root) {
  'use strict';
  var N_AULAS = 12;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }

  var BLOCOS = [
    { id: 1, nome: 'Semana 1 · Entrevista: contar sua história e seus resultados' },
    { id: 2, nome: 'Semana 2 · Conversa técnica: explicar, discutir e decidir' },
    { id: 3, nome: 'Semana 3 · Reuniões e stakeholders' },
    { id: 4, nome: 'Semana 4 · Apresentar, negociar e crescer' }
  ];
  var L = [
    ['g1', 1, 'Present perfect, past simple e present perfect continuous: contar a carreira'],
    ['g2', 1, 'Tempos narrativos: histórias STAR e relatos de incidente'],
    ['g3', 1, 'Resultados e números: comparações, mudanças, contáveis e artigos'],
    ['g4', 2, 'Voz passiva e descrição de processos e pipelines'],
    ['g5', 2, 'Condicionais: trade-offs e decisões técnicas'],
    ['g6', 2, 'Modais: recomendar, expressar certeza e suavizar'],
    ['g7', 3, 'Perguntas diretas e indiretas, question tags e pedidos educados'],
    ['g8', 3, 'Discurso indireto e formas de futuro para compromissos'],
    ['g9', 3, 'Preposições, colocações e phrasal verbs de trabalho'],
    ['g10', 4, 'Frases complexas e ênfase: falar com autoridade'],
    ['g11', 4, 'Linguagem de negociação e pedidos'],
    ['g12', 4, 'Gerúndio x infinitivo e revisão dos erros mais comuns de brasileiros']
  ];
  var LICOES = L.map(function (x, i) { return { n: i + 1, topico: x[0], bloco: x[1], ordem: i + 1, titulo: x[2], minutos: 45 }; });

  var TOPICOS = LICOES.map(function (l) { return { id: l.topico, s: l.bloco, nome: l.titulo, d: [l.n], foco: 'medio', por: '' }; });
  var SECOES = BLOCOS.map(function (b) { return { id: b.id, nome: b.nome, peso: 25 }; });
  var ROTULOS = { dia: 'Aula', lab: 'TREINO', labFeito: 'Treino de fala feito ✓', prova: 'Como soa numa entrevista ou reunião',
    fontesTitulo: 'Fontes desta aula', fontesNota: 'A aula foi escrita a partir das páginas abaixo (British Council, Cambridge, Oxford e dicionários de referência). Em caso de dúvida, vale a página de referência.',
    limpar: 'Depois do treino', labOk: 'Fiz o treino de fala' };

  function licao(n) { return LICOES.filter(function (l) { return l.n === n; })[0] || null; }
  function tem(m, n) { return !!(m && m[n]); }
  function passosDa(cfg, n) { cfg = cfg || {}; var q = (cfg.quiz || {})[n]; return { aula: tem(cfg.aulas, n), quiz: !!(q && q.pct >= 80), lab: tem(cfg.labs, n) }; }
  function completa(cfg, n) { var p = passosDa(cfg, n); return p.aula && p.quiz && p.lab; }
  function proxPasso(p) { return !p.aula ? 'aula' : !p.quiz ? 'quiz' : 'lab'; }
  function diaPlano(cfg) { var m = 0; Object.keys((cfg && cfg.aulas) || {}).forEach(function (k) { if (+k > m) m = +k; }); return Math.min(N_AULAS, Math.max(1, m + 1)); }

  function estado(cfg, hoje) {
    cfg = cfg || {}; hoje = hoje || new Date();
    var k = iso(hoje), feitos = 0, hojeN = 0, completas = 0, porBloco = {}, prox = null;
    BLOCOS.forEach(function (b) { porBloco[b.id] = { aulas: 0, completas: 0, total: 0, passos: 0, passosTotal: 0 }; });
    LICOES.forEach(function (l) {
      var p = passosDa(cfg, l.n), n3 = (p.aula ? 1 : 0) + (p.quiz ? 1 : 0) + (p.lab ? 1 : 0), b = porBloco[l.bloco];
      feitos += n3; b.total++; b.passos += n3; b.passosTotal += 3; if (p.aula) b.aulas++;
      if (p.aula && p.quiz && p.lab) { completas++; b.completas++; }
      if (tem(cfg.aulas, l.n) && cfg.aulas[l.n] === k) hojeN++;
      if (tem(cfg.labs, l.n) && cfg.labs[l.n] === k) hojeN++;
      if (((cfg.quiz || {})[l.n] || {}).data === k) hojeN++;
    });
    for (var i = 0; i < LICOES.length && !prox; i++) { var l = LICOES[i]; if (!completa(cfg, l.n)) prox = { n: l.n, titulo: l.titulo, bloco: l.bloco, ordem: l.ordem, passo: proxPasso(passosDa(cfg, l.n)) }; }
    Object.keys(porBloco).forEach(function (id) { var b = porBloco[id]; b.pct = b.passosTotal ? Math.round(b.passos / b.passosTotal * 100) : 0; });
    return { ativo: true, diaPlano: diaPlano(cfg), passos: feitos, totalPassos: N_AULAS * 3, pct: Math.round(feitos / (N_AULAS * 3) * 100),
      completas: completas, total: N_AULAS, porBloco: porBloco, hoje: hojeN, prox: prox };
  }

  var PLANO = { iso: iso, addDias: addDias, parse: parse, TOPICOS: TOPICOS, SECOES: SECOES, DOCS_DIA: {}, ROTULOS: ROTULOS, RELATOS_DIA: {},
    estado: function (cfg) { return { ativo: true, diaPlano: diaPlano(cfg) }; } };

  var api = { N_AULAS: N_AULAS, BLOCOS: BLOCOS, LICOES: LICOES, TOPICOS: TOPICOS, SECOES: SECOES, iso: iso, parse: parse, addDias: addDias,
    licao: licao, passosDa: passosDa, completa: completa, diaPlano: diaPlano, estado: estado, PLANO: PLANO };
  root.CP_PLANO_ESTUDO = PLANO;
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_GRAM = api;
})(typeof window !== 'undefined' ? window : globalThis);
