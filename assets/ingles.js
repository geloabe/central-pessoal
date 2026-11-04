/* Inglês pessoal — 4 semanas: 5 aulas por semana + 150 min de prática (shadowing, escuta, fala, escrita e frases).
   Funções puras (sem DOM nem rede), testáveis no Node. Dados (documento ingles/main):
   { inicio:'AAAA-MM-DD', cont:{'1-sh':2}, aulas:{'1':4}, res:{wpm0:'110', wpm1:'135'} } */
(function (root) {
  'use strict';
  var DIA = 864e5, N_SEMANAS = 4, MIN_ING = 150, AULAS_SEMANA = 5;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }
  function dias(a, b) { return Math.round((parse(iso(b)) - parse(iso(a))) / DIA); }
  function fmtMin(m) { var h = Math.floor(m / 60), r = m % 60; return h ? h + 'h' + (r ? pad(r) : '') : r + ' min'; }

  /* ---------- Inglês: 5 aulas por semana + 150 min de prática ---------- */
  var INGLES = [
    { n: 1, foco: 'Discordar e opinar com nuance', porque: 'Em discussão técnica, C1 é saber discordar sem soar ríspido e defender uma opção reconhecendo o outro lado. É o que times de fora mais notam.',
      tema: 'agentes de IA e LLMs aplicados a dados', escrita: 'Escreva um bilhete de 8 a 10 linhas com o objetivo e o critério de sucesso de cada uma das suas metas do mês (“Goal”, “Success criteria”).',
      fala: ['Explain to a new teammate what a data quality check is and why we need it.', 'Explain how an LLM agent turns a business question into a SQL query.'],
      frases: [
        ['I see where you’re coming from, but I’d push back on one point.', 'Discordar com educação, reconhecendo o outro lado.'],
        ['That’s a fair point. My concern is…', 'Aceitar e levantar a dúvida.'],
        ['I’m not convinced that scales.', 'Dúvida técnica direta, sem agressividade.'],
        ['Correct me if I’m wrong, but…', 'Abrir espaço para ser corrigida, comum em reuniões.'],
        ['Could you walk me through your reasoning?', 'Pedir que a pessoa explique o raciocínio.'],
        ['I’d lean towards X, mainly because…', 'Dar sua preferência com motivo.'],
        ['It comes down to a trade-off between cost and latency.', 'Resumir a decisão em um trade-off.'],
        ['Let’s park that for now and come back to it.', 'Adiar um assunto sem descartá-lo.']
      ] },
    { n: 2, foco: 'Explicar e estruturar (causa, efeito e trade-off)', porque: 'Explicar bem é mostrar a estrutura do raciocínio. Conectores e frases de resumo deixam a fala organizada e dão tempo para pensar.',
      tema: 'qualidade de dados e observabilidade', escrita: 'Escreva a nota de design do agente em inglês: o que ele faz, o que nunca deve fazer e como você mede se está certo (10 a 12 linhas).',
      fala: ['Walk me through how you would decide which five tables are critical.', 'Explain the trade-off: block the pipeline or just send a warning when a check fails.'],
      frases: [
        ['The root cause turned out to be…', 'Apresentar a causa raiz que você descobriu.'],
        ['What this means in practice is…', 'Traduzir o conceito em consequência prática.'],
        ['The upside is…, the downside is…', 'Estrutura simples de prós e contras.'],
        ['To put it in perspective, …', 'Dar uma noção de escala ou importância.'],
        ['Long story short, …', 'Resumir depois de uma explicação longa.'],
        ['It boils down to…', 'Reduzir o assunto ao ponto central.'],
        ['As a rule of thumb, …', 'Regra prática, não exata.'],
        ['Having said that, …', 'Mudar de direção sem negar o que foi dito.']
      ] },
    { n: 3, foco: 'Escrita assíncrona: PRs, README e avisos de incidente', porque: 'Time remoto vive de texto. Descrição de PR e aviso de falha claros evitam reunião e mostram senioridade.',
      tema: 'CI/CD e DataOps', escrita: 'Escreva uma descrição de pull request em inglês para a mudança de CI: What, Why, How to test e Out of scope.',
      fala: ['Explain what CI does on every pull request, as if talking to a non-technical manager.', 'Tell me about a time something broke in production and how a check could have caught it. Use situation, task, action and result.'],
      frases: [
        ['This PR adds… and fixes…', 'Abrir a descrição do PR em uma linha.'],
        ['No action needed on your side.', 'Avisar que a pessoa não precisa fazer nada.'],
        ['Heads-up: …', 'Aviso rápido antes de algo que pode afetar a pessoa.'],
        ['Following up on…', 'Retomar um assunto por escrito.'],
        ['Could you take a look when you get a chance?', 'Pedir revisão sem pressionar.'],
        ['The pipeline failed at 3 a.m. due to…; it has been re-run and is healthy.', 'Modelo de aviso de incidente resolvido.'],
        ['Steps to reproduce:', 'Título padrão em relatos de bug.'],
        ['Out of scope for this PR: …', 'Deixar claro o que não está na mudança.']
      ] },
    { n: 4, foco: 'Apresentar e lidar com perguntas', porque: 'Apresentar o projeto e responder perguntas ao vivo é o que entrevistas e reuniões testam. Frases de abertura, resumo e “não sei ainda” tiram o peso do improviso.',
      tema: 'arquitetura de dados e IA (escolha livre)', escrita: 'Escreva em 5 frases o resultado do projeto do agente e, em 150 palavras, a resposta para “Tell me about a project you’re proud of”.',
      fala: ['Present your agent project in 3 minutes: problem, approach and result.', 'Answer: “What would you improve if you had another month?”'],
      frases: [
        ['Let me start with the big picture.', 'Abrir uma apresentação.'],
        ['Before I dive in, …', 'Contextualizar antes do detalhe.'],
        ['That’s a great question. Short answer: …', 'Responder pergunta com resposta curta primeiro.'],
        ['I don’t have the numbers on hand; I’ll follow up by email.', 'Admitir que não sabe agora, sem perder credibilidade.'],
        ['If I understand your question correctly, you’re asking…', 'Confirmar a pergunta antes de responder.'],
        ['To recap, …', 'Resumir ao final.'],
        ['The key takeaway is…', 'Apontar a mensagem principal.'],
        ['Happy to go deeper on any of this.', 'Convidar a perguntas.']
      ] }
  ];
  var ESCUTA = ['Latent Space (podcast sobre engenharia de IA)', 'Practical AI (podcast)', 'Data Engineering Podcast', 'Palestras da conferência Coalesce (dbt) no YouTube', 'Canal Google Cloud Tech no YouTube'];

  function tarefasIngles(s) {
    var n = s.n, primeira = n === 1, ultima = n === 4;
    return [
      { id: n + '-sh', m: 'en', vezes: 3, min: 12, t: 'Shadowing do mesmo áudio',
        como: ['Use 1 a 2 minutos de um trecho do que você ouviu na escuta ativa (de preferência com transcrição). Use o mesmo trecho nas 3 sessões.',
          'Sessão 1: ouça 2 vezes lendo a transcrição. Sessão 2: repita colada no áudio, 3 a 5 vezes, imitando ritmo e entonação. Sessão 3: grave a última repetição e compare com o original.',
          'Foque no ritmo (palavras de conteúdo fortes, palavras pequenas fracas) mais do que em sons perfeitos.'],
        pronto: 'Marque cada sessão de 12 minutos que fizer.' },
      { id: n + '-es', m: 'en', vezes: 2, min: 25, t: 'Escuta ativa sobre ' + s.tema,
        como: ['Escolha 1 episódio ou palestra de cerca de 25 minutos sobre ' + s.tema + '. Sugestões para procurar: ' + ESCUTA.join('; ') + ' (confira se há episódio atual no tema).',
          'Primeira passada sem legenda em português. Pause quando ouvir uma frase que você usaria no trabalho e anote 5 frases.',
          'Ao final, diga em voz alta, em inglês, um resumo de 3 frases.'],
        pronto: 'Marque cada escuta de 25 minutos. Uma delas pode ser o áudio do shadowing.' },
      { id: n + '-fa', m: 'en', vezes: 2, min: 12, t: primeira ? 'Fala gravada: linha de base e 4/3/2' : ultima ? 'Fala gravada: apresentação e nova medição' : 'Fala gravada no estilo 4/3/2',
        como: (primeira ? ['Sessão 1 é a sua linha de base: grave 2 minutos respondendo “Tell me about yourself and your last project”, cole a transcrição no corretor da Rota Internacional (aba Inglês), informe a duração e clique em “Registrar só a medição”. Anote as palavras por minuto na aba Medição.'] :
            ultima ? ['Sessão 2 é a nova medição: repita a mesma pergunta da semana 1 (“Tell me about yourself and your last project”) por 2 minutos, registre na Rota e compare com a linha de base na aba Medição.'] : []).concat([
          'Tema desta semana: “' + s.fala[0] + '” (sessão 1) e “' + s.fala[1] + '” (sessão 2).',
          'Método 4/3/2: fale 4 minutos, depois 3 e depois 2 minutos sobre o mesmo assunto. Grave o último.',
          'Cole a transcrição no corretor da Rota, leve 3 erros para o log e use pelo menos 2 frases da semana.']),
        pronto: 'Marque cada sessão gravada.' },
      { id: n + '-ec', m: 'en', vezes: 1, min: 25, t: 'Escrita: ' + s.escrita.split(':')[0].replace(/\.$/, ''),
        como: [s.escrita, 'Use pelo menos 4 frases da semana e leia em voz alta antes de revisar.', 'Revise com o corretor da Rota ou outro revisor e leve 3 erros ao log de erros.'],
        pronto: 'Texto escrito, revisado e com 3 erros no log.' },
      { id: n + '-fr', m: 'en', vezes: 3, min: 5, t: 'Frases da semana (cartões)',
        como: ['Abra a aba Frases, copie as 8 frases para o Anki (botão) ou leia a lista.', 'Para cada frase, diga em voz alta uma frase real do seu trabalho usando a expressão.', 'Foco da semana: ' + s.foco + '.'],
        pronto: 'Marque cada sessão de 5 minutos.' }
    ];
  }
  INGLES.forEach(function (s) { s.tarefas = tarefasIngles(s); });

  /* ---------- Progresso ---------- */
  function todas() { var l = []; INGLES.forEach(function (s) { s.tarefas.forEach(function (t) { l.push({ t: t, semana: s.n }); }); }); return l; }
  function nFeitas(cfg, t) { var n = (cfg && cfg.cont && cfg.cont[t.id]) || 0; return Math.min(t.vezes, Math.max(0, +n || 0)); }

  function estado(cfg, hoje) {
    if (!cfg || !cfg.inicio) return { ativo: false };
    var ini = parse(cfg.inicio), delta = dias(ini, hoje);
    var semana = delta < 0 ? 0 : Math.min(N_SEMANAS, Math.floor(delta / 7) + 1);
    var total = 0, feito = 0, porSemana = {};
    todas().forEach(function (x) {
      var n = nFeitas(cfg, x.t), ps = porSemana[x.semana] || (porSemana[x.semana] = { min: 0, feito: 0 });
      total += x.t.min * x.t.vezes; feito += x.t.min * n; ps.min += x.t.min * x.t.vezes; ps.feito += x.t.min * n;
    });
    var aulas = {}, aulasTotal = 0;
    for (var s = 1; s <= N_SEMANAS; s++) { aulas[s] = Math.max(0, +((cfg.aulas || {})[s]) || 0); aulasTotal += aulas[s]; }
    var lim = Math.max(1, semana), prox = null, adiantada = false, atrasadas = 0;
    todas().forEach(function (x) { if (nFeitas(cfg, x.t) < x.t.vezes) { if (x.semana < lim) atrasadas++; if (!prox && x.semana <= lim) prox = x; } });
    if (!prox) todas().some(function (x) { if (nFeitas(cfg, x.t) < x.t.vezes) { prox = x; adiantada = true; return true; } return false; });
    return { ativo: true, delta: delta, semana: semana, comecaEm: delta < 0 ? -delta : 0, encerrado: delta >= N_SEMANAS * 7, fim: iso(addDias(ini, N_SEMANAS * 7 - 1)),
      total: total, feito: feito, pct: total ? Math.round(feito / total * 100) : 0, porSemana: porSemana, aulas: aulas, aulasTotal: aulasTotal,
      aulasSemana: semana ? aulas[semana] : 0, prox: prox, proxAdiantada: adiantada, atrasadas: atrasadas };
  }

  /* ---------- Alterações (devolvem novos objetos, sem mutar) ---------- */
  function contar(cfg, id, delta) {
    var t = todas().filter(function (x) { return x.t.id === id; })[0], c = Object.assign({}, (cfg && cfg.cont) || {});
    if (!t) return c;
    c[id] = Math.min(t.t.vezes, Math.max(0, (+c[id] || 0) + delta)); if (!c[id]) delete c[id]; return c;
  }
  function ajustarAulas(cfg, semana, delta) { var a = Object.assign({}, (cfg && cfg.aulas) || {}); a[semana] = Math.min(9, Math.max(0, (+a[semana] || 0) + delta)); return a; }
  function cfgPadrao(hoje) { return { inicio: iso(hoje), cont: {}, aulas: {}, res: {} }; }
  function dataDaSemana(cfg, n) { return addDias(parse(cfg.inicio), (n - 1) * 7); }
  function cartoesAnki(n) { var s = INGLES.filter(function (x) { return x.n === n; })[0]; return s ? s.frases.map(function (f) { return f[0] + ';' + f[1]; }).join('\n') : ''; }

  var api = { N_SEMANAS: N_SEMANAS, MIN_ING: MIN_ING, AULAS_SEMANA: AULAS_SEMANA, INGLES: INGLES, ESCUTA: ESCUTA, iso: iso, parse: parse, addDias: addDias, dias: dias, fmtMin: fmtMin,
    todas: todas, estado: estado, contar: contar, ajustarAulas: ajustarAulas, cfgPadrao: cfgPadrao, dataDaSemana: dataDaSemana, cartoesAnki: cartoesAnki };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_INGLES = api;
})(typeof window !== 'undefined' ? window : globalThis);
