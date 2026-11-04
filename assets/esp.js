/* Espanhol do A1 ao A2 para a carreira: 16 aulas em 4 blocos de 2 semanas, cada aula com leitura, cartões, quiz de 80%+ e treino de fala e escuta.
   Sem calendário: a ordem é a trilha e o ritmo é seu (sugestão: 2 aulas por semana e 10 a 15 min de cartões por dia).
   Funções puras (sem DOM nem rede), testáveis no Node. Também expõe CP_PLANO_ESTUDO (plano no formato do motor de estudo).
   Dados do usuário (documento esp/main):
     { aulas:{n:'AAAA-MM-DD'}, quiz:{n:{pct,data,n}}, labs:{n:'AAAA-MM-DD'}, notas:{n:'texto'}, leitura:{n:passo}, srs:{id:{b,p,n,e,u}} } */
(function (root) {
  'use strict';
  var N_AULAS = 16;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }

  var BLOCOS = [
    { id: 1, nome: 'Semanas 1–2 · Sons, apresentação, ser/estar e gênero' },
    { id: 2, nome: 'Semanas 3–4 · Verbos no presente, números e perguntas' },
    { id: 3, nome: 'Semanas 5–6 · Falsos amigos, gostos, rotina e planos' },
    { id: 4, nome: 'Semanas 7–8 · Passado, opinião e espanhol no trabalho' }
  ];
  var L = [
    ['e1', 1, 'Sons e pronúncia: o que o ouvido brasileiro engana'],
    ['e2', 1, 'Saudações, despedidas e como se apresentar'],
    ['e3', 1, 'Ser e estar'],
    ['e4', 1, 'Artigos, gênero e número'],
    ['e5', 2, 'Presente regular e verbos de trabalho'],
    ['e6', 2, 'Verbos irregulares mais usados'],
    ['e7', 2, 'Números, hora, datas e dinheiro'],
    ['e8', 2, 'Perguntas e palavras interrogativas'],
    ['e9', 3, 'Falsos amigos português-espanhol'],
    ['e10', 3, 'Gostar e verbos como gustar'],
    ['e11', 3, 'Verbos reflexivos e rotina'],
    ['e12', 3, 'Estar + gerúndio e ir a + infinitivo'],
    ['e13', 4, 'Passado: pretérito perfecto e indefinido'],
    ['e14', 4, 'Comparar, preferir e opinar'],
    ['e15', 4, 'Espanhol no trabalho de dados e tecnologia'],
    ['e16', 4, 'Conversar em uma reunião em espanhol']
  ];
  var LICOES = L.map(function (x, i) { return { n: i + 1, topico: x[0], bloco: x[1], ordem: i + 1, titulo: x[2], minutos: 35 }; });

  var TOPICOS = LICOES.map(function (l) { return { id: l.topico, s: l.bloco, nome: l.titulo, d: [l.n], foco: 'medio', por: '' }; });
  var SECOES = BLOCOS.map(function (b) { return { id: b.id, nome: b.nome, peso: 25 }; });
  var ROTULOS = { dia: 'Aula', lab: 'TREINO', labFeito: 'Treino feito ✓', prova: 'Como soa no trabalho e na vida real',
    fontesTitulo: 'Referências do Instituto Cervantes', fontesNota: 'As regras das aulas são regras gerais do espanhol, escritas sem citação de página: as páginas da RAE e do Centro Virtual Cervantes bloquearam a leitura automática durante a produção. Estes links do Instituto Cervantes abriram e sustentam só o que dizem sobre os níveis A1 a A2. Para confirmar uma palavra ou regra, consulte no navegador o dicionário da RAE (dle.rae.es) e o Diccionario panhispánico de dudas (rae.es/dpd).',
    limpar: 'Depois do treino', labOk: 'Fiz o treino de fala e escuta' };

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
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_ESP = api;
})(typeof window !== 'undefined' ? window : globalThis);
