/* Inglês pessoal para a carreira — 4 semanas, foco em FALA e VOCABULÁRIO.
   Por semana: 5 aulas (meta da pessoa) + 150 min de prática: shadowing, escuta ativa, fala gravada em cenários de carreira e cartões de vocabulário.
   Funções puras (sem DOM nem rede), testáveis no Node. Dados (documento ingles/main):
   { inicio:'AAAA-MM-DD', cont:{'1-sh':2}, aulas:{'1':4}, res:{wpm0:'110', wpm1:'135', hes0:'12', hes1:'6'}, srs:{'v1':{c:2,p:'AAAA-MM-DD',d:'AAAA-MM-DD'}} } */
(function (root) {
  'use strict';
  var DIA = 864e5, N_SEMANAS = 4, MIN_ING = 150, AULAS_SEMANA = 5, NOVOS_DIA = 8, SESSAO_MAX = 20, INT = [1, 1, 3, 7, 14, 30];
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }
  function dias(a, b) { return Math.round((parse(iso(b)) - parse(iso(a))) / DIA); }
  function fmtMin(m) { var h = Math.floor(m / 60), r = m % 60; return h ? h + 'h' + (r ? pad(r) : '') : r + ' min'; }

  /* ---------- Vocabulário de carreira: 15 por semana, [situação em português, expressão em inglês, exemplo, nota de pronúncia] ---------- */
  var V = [
    /* Semana 1 — Entrevista: sua história e seus resultados */
    ['Dizer que você é a responsável por uma área', 'I own… / to own something', 'I own the data platform end to end, from infrastructure to analytics-ready data.', 'data: /ˈdeɪtə/ (DEI-ta). Tônica na primeira sílaba.'],
    ['Dizer o que você faz em uma frase', 'I specialize in…', 'I specialize in building reliable data pipelines on cloud platforms.', 'specialize: /ˈspeʃəlaɪz/, tônica em SPE.'],
    ['Dizer que você cuidava de uma parte do sistema', 'to be in charge of…', 'I was in charge of the ingestion layer.'],
    ['Contar que passou a assumir mais responsabilidade', 'to take on more responsibility', 'Over time I took on more responsibility, from building pipelines to designing the architecture.'],
    ['Dizer que entregou algo do início ao fim', 'to deliver end to end', 'I delivered the project end to end, from requirements to production.'],
    ['Falar de um resultado que dá para medir', 'measurable impact', 'The change had a measurable impact: the refresh time went from X to Y.', 'measurable: /ˈmeʒərəbəl/ (ME-jhe-ra-bol).'],
    ['Dizer que reduziu um número (tempo, custo)', 'to cut X by Y%', 'We cut the report refresh time by Y%.'],
    ['Dizer que automatizou um trabalho manual', 'to automate manual work', 'I automated manual work and saved each team several hours a week.'],
    ['Dizer que aprende rápido um assunto novo', 'to ramp up quickly', 'I ramped up quickly on the new tool and was productive within a few weeks.'],
    ['Dizer que trabalha bem sem supervisão', 'to work independently', 'I’m comfortable working independently, and I ask for help early when I need it.'],
    ['Dizer que trabalha direto com a área de negócio', 'to work closely with stakeholders', 'I work closely with stakeholders to turn vague requirements into reliable pipelines.'],
    ['Dizer o que te atraiu na vaga', 'What drew me to this role is…', 'What drew me to this role is the chance to work on production-grade data platforms.'],
    ['Admitir uma lacuna sem se diminuir', 'I haven’t worked with X directly, but…', 'I haven’t built Salesforce integrations directly, but I integrate REST APIs every day and I learn fast.'],
    ['Pedir para repetir ou reformular a pergunta', 'Could you rephrase that, please?', 'Sorry, could you rephrase the question? I want to make sure I answer the right thing.'],
    ['Ganhar tempo para pensar sem ficar em silêncio', 'That’s a good question. Let me think for a second.', 'That’s a good question. Let me think for a second… I’d say it depends on the volume.'],
    /* Semana 2 — Conversa técnica: explicar, discutir e decidir */
    ['Guiar alguém pelo seu raciocínio passo a passo', 'to walk someone through…', 'Let me walk you through how the pipeline works, step by step.'],
    ['Falar de prós e contras de uma decisão', 'trade-off', 'The main trade-off here is cost versus latency.', 'trade-off: tônica em TRADE (/ˈtreɪd ɔːf/).'],
    ['Dizer que a resposta depende de algo', 'It depends on…', 'It depends on the data volume and on how fresh the reports need to be.'],
    ['Dar sua preferência com motivo', 'I’d lean towards X, mainly because…', 'I’d lean towards batch, mainly because the reports only refresh once a day.'],
    ['Discordar com educação', 'I see where you’re coming from, but…', 'I see where you’re coming from, but I’d push back on one point: it won’t scale.'],
    ['Apontar o gargalo de um sistema', 'bottleneck', 'The bottleneck is the single-threaded export from the source system.', 'bottleneck: /ˈbɑːtlnek/, o “tl” é rápido, sem vogal no meio.'],
    ['Dizer que algo, se falhar, derruba tudo', 'single point of failure', 'That job is a single point of failure for every downstream report.'],
    ['Falar do que vem antes e depois no fluxo de dados', 'upstream / downstream', 'If the upstream source changes its schema, everything downstream breaks.', 'upstream /ˈʌpstriːm/ e downstream /ˈdaʊnstriːm/: tônica na primeira sílaba.'],
    ['Investigar um problema', 'to troubleshoot', 'I spent the morning troubleshooting a failing job.', 'troubleshoot: /ˈtrʌbəlʃuːt/.'],
    ['Dizer a causa raiz', 'root cause', 'The root cause turned out to be a schema change in the source API.'],
    ['Colocar uma mudança em produção', 'to roll out', 'We rolled out the change gradually, starting with one pipeline.'],
    ['Desfazer uma mudança que deu problema', 'to roll back', 'We rolled back the release as soon as the checks failed.'],
    ['Dizer que algo continua bom quando o volume cresce', 'to scale (well)', 'This design scales well as the number of tables grows.'],
    ['Explicar para quem não é da área, em uma frase', 'In plain English, …', 'In plain English, the pipeline copies the data every night and checks that nothing is missing.'],
    ['Resumir o que uma explicação significa na prática', 'What this means in practice is…', 'What this means in practice is that reports are never more than a day old.'],
    /* Semana 3 — Reuniões e stakeholders */
    ['Dizer o que bloqueia você', 'blocker / to be blocked on…', 'My only blocker is access to the production database, so I’m blocked until Thursday.'],
    ['Dar uma previsão de quando fica pronto', 'ETA', 'The ETA for the fix is end of day.'],
    ['Dar um aviso rápido antes de algo que afeta os outros', 'Heads-up: …', 'Heads-up: the nightly job will run late today.'],
    ['Sinalizar um risco ou problema', 'to flag (an issue)', 'I want to flag a risk with the deadline.'],
    ['Incluir alguém numa conversa', 'to loop someone in', 'Let me loop in the data owner so we can confirm the definition.'],
    ['Chegar a um acordo sobre algo', 'to align on…', 'Let’s align on the definition of “active customer” before we build the table.'],
    ['Retomar um assunto depois', 'to circle back', 'Can we circle back to this after the release?'],
    ['Levar um assunto para fora da reunião', 'Can we take this offline?', 'Can we take this offline? I’d like to look at the data first.'],
    ['Falar de pedidos que crescem durante o projeto', 'scope creep', 'We need to avoid scope creep, so let’s agree on what’s in the first release.'],
    ['Falar do que será entregue', 'deliverable', 'The first deliverable is a validated table with documentation.', 'deliverable: /dɪˈlɪvərəbəl/, tônica em LI.'],
    ['Dizer que não tem capacidade agora', 'I don’t have the bandwidth for that right now.', 'I don’t have the bandwidth for that right now, but I can take it next sprint.', 'bandwidth: /ˈbændwɪdθ/, termina em “th” (língua entre os dentes).'],
    ['Dizer que está no prazo, em risco ou atrasado', 'on track / at risk / behind schedule', 'The migration is on track, but the testing phase is at risk.'],
    ['Prometer retorno com prazo', 'I’ll get back to you by…', 'I’ll get back to you by tomorrow morning with a firm date.'],
    ['Negociar prazo oferecendo alternativa', 'What I can do is…', 'I can’t deliver everything by Friday. What I can do is deliver the main table by Friday and the rest next week.'],
    ['Dar o resumo antes do detalhe', 'The short version is…', 'The short version is: the data is delayed by two hours, and we’re fixing it.'],
    /* Semana 4 — Apresentar, negociar e crescer */
    ['Abrir uma apresentação pelo panorama', 'Let me start with the big picture.', 'Let me start with the big picture, and then I’ll go into the details.'],
    ['Apontar a mensagem principal', 'The key takeaway is…', 'The key takeaway is that the agent’s accuracy went from X to Y after three changes.'],
    ['Admitir que não sabe agora, sem perder credibilidade', 'I don’t have that number on hand, but I’ll follow up.', 'I don’t have that number on hand, but I’ll follow up by email today.'],
    ['Confirmar a pergunta antes de responder', 'If I understand your question correctly, you’re asking…', 'If I understand your question correctly, you’re asking whether we can reprocess the history.'],
    ['Convidar a mais perguntas', 'Happy to dive deeper on any of this.', 'That’s the overview. Happy to dive deeper on any of this.'],
    ['Defender seu pedido com argumentos', 'to make a case for…', 'I’d like to make a case for expanding my scope to include the data quality program.'],
    ['Dizer que quer assumir mais', 'I’d like to grow into…', 'I’d like to grow into a more senior role, with ownership of architecture decisions.'],
    ['Falar da abrangência da sua responsabilidade', 'scope', 'Since I joined, the scope of my role has grown beyond pipelines.', 'scope: /skoʊp/, sem vogal antes do “s”.'],
    ['Falar de remuneração total', 'compensation (package)', 'I’d like to understand the full compensation package, including benefits.', 'compensation: /ˌkɑːmpənˈseɪʃən/, tônica em SEI.'],
    ['Falar de valor para quem é contratada como PJ', 'rate (hourly or monthly rate)', 'What is the rate range for this role?'],
    ['Pedir mais do que a primeira proposta', 'I was expecting something closer to…', 'Thanks for the offer. Based on the scope, I was expecting something closer to X.'],
    ['Mostrar flexibilidade na negociação', 'I’m open to discussing…', 'I’m open to discussing the structure, as long as the total is in that range.'],
    ['Pedir um número aproximado', 'ballpark (figure)', 'Could you give me a ballpark figure for the range?', 'ballpark: /ˈbɔːlpɑːrk/.'],
    ['Pedir feedback ao gestor', 'I’d really appreciate your feedback on…', 'I’d really appreciate your feedback on how I handled the migration.'],
    ['Fechar agradecendo e reforçando o interesse', 'I’m very interested in this role and excited about…', 'Thank you for your time. I’m very interested in this role and excited about the project.']
  ];
  var VOCAB = V.map(function (v, i) { return { id: 'v' + (i + 1), w: Math.floor(i / 15) + 1, pt: v[0], en: v[1], ex: v[2], nota: v[3] || '' }; });

  /* ---------- Semanas ---------- */
  function F(p, estr) { return { p: p, estr: estr }; }
  var INGLES = [
    { n: 1, foco: 'Entrevista: sua história e seus resultados',
      porque: 'Toda vaga e toda promoção começam com você contando quem é e o que entregou, com números. Quem tem a história pronta, em inglês, ocupa menos espaço mental e sobra energia para ouvir a pergunta.',
      tema: 'entrevistas de Data Engineer e histórias de carreira',
      estruturas: [
        ['Presente, passado, futuro (apresentação)', 'Right now I’m… at…, where I… / Before that, I… / What I’m looking for next is…'],
        ['Problema, papel, ação, resultado (projeto)', 'The problem was… / My role was… / What I did was… / As a result, …'],
        ['STAR (pergunta comportamental)', 'At the time, … (situação) / I was responsible for… (tarefa) / So I… (ação) / In the end, … (resultado)']],
      fala: [F('Tell me about yourself. (esta é a sua linha de base: dois minutos, depois registre na aba Medição)', 0), F('Walk me through a project you’re proud of.', 1), F('Tell me about a time something went wrong in production.', 2)],
      pauta: 'Peça ao professor uma entrevista simulada de Data Engineer: 15 minutos de perguntas (Tell me about yourself, um projeto, uma pergunta STAR) e feedback focado em pausas, vocabulário e clareza.' },
    { n: 2, foco: 'Conversa técnica: explicar, discutir e decidir',
      porque: 'Ser vista como sênior é, em boa parte, explicar uma decisão técnica com clareza, discordar sem atrito e adaptar a explicação a quem ouve. É o que se testa nas etapas técnicas e nas reuniões de design.',
      tema: 'arquitetura e engenharia de dados no dia a dia',
      estruturas: [
        ['PREP (opinião defendida)', 'My view is… (ponto) / The reason is… (razão) / For example, … (exemplo) / So I’d go with… (ponto de novo)'],
        ['Manchete primeiro', 'In short, … Here’s why: …'],
        ['Trade-off', 'The upside is…, the downside is… If X matters most, I’d choose…']],
      fala: [F('Explain what a data pipeline does to someone who isn’t technical.', 1), F('Batch or streaming for daily sales reports? Pick one and defend it.', 0), F('Walk me through how you would move data from an API into a warehouse.', 2)],
      pauta: 'Peça uma discussão técnica: você explica uma decisão de arquitetura e o professor discorda de propósito. Treine defender com PREP e discordar com educação.' },
    { n: 3, foco: 'Reuniões e stakeholders: status, bloqueios e expectativas',
      porque: 'No dia a dia remoto, a carreira anda pelo que as pessoas entendem do seu trabalho: status claro, riscos avisados cedo e prazos negociados sem conflito.',
      tema: 'comunicação em times remotos e gestão de expectativas',
      estruturas: [
        ['Stand-up', 'Yesterday I… / Today I’ll… / I’m blocked on…'],
        ['Status (manchete, detalhe, próximo passo)', 'The short version is… / The details: … / Next step: …'],
        ['Resistência educada', 'I understand you need… / The constraint is… / What I can do is…']],
      fala: [F('Give your stand-up in 60 to 90 seconds.', 0), F('A stakeholder wants a dashboard by Friday, but the data isn’t ready. Respond.', 2), F('Give the team an incident update: what happened, impact, fix, next steps.', 1)],
      pauta: 'Peça um roleplay: um stand-up e uma conversa em que o “stakeholder” pede um prazo impossível. Treine a resistência educada com uma alternativa.' },
    { n: 4, foco: 'Apresentar, negociar e crescer na carreira',
      porque: 'É aqui que o inglês vira dinheiro e cargo: apresentar para quem decide, negociar valor sem se encolher e pedir mais escopo com argumentos.',
      tema: 'carreira em dados, liderança técnica e negociação',
      estruturas: [
        ['Apresentação', 'Let me start with… (panorama) / The context is… / What we found… / What I’d like from you is…'],
        ['Negociação', 'Thank you for the offer. (apreço) / Based on…, I was expecting… (âncora) / I’m open to discussing… (flexibilidade)'],
        ['Crescimento: impacto, escopo, pedido', 'Over the past months I… / I’d like to take on… / What would it take to get there?']],
      fala: [F('Tell me about yourself. (nova medição: os mesmos dois minutos da semana 1)', 0), F('Present one of your projects in 3 minutes: problem, approach, result.', 0), F('The recruiter offers a rate below what you expected. Negotiate.', 1)],
      pauta: 'Peça duas simulações: uma apresentação de 3 minutos com perguntas e uma negociação de valor (rate) com contraproposta. Se sobrar tempo, treine pedir mais escopo ao gestor.' }
  ];
  var ESCUTA = ['Data Engineering Podcast', 'Software Engineering Daily', 'Soft Skills Engineering (podcast)', 'Lenny’s Podcast (carreira e produto)', 'Palestras da conferência Coalesce (dbt) no YouTube', 'Canal Google Cloud Tech no YouTube'];

  function tarefasIngles(s) {
    var n = s.n;
    return [
      { id: n + '-sh', m: 'en', vezes: 3, min: 10, t: 'Shadowing do mesmo áudio',
        como: ['Use 1 a 2 minutos de um trecho do que você ouviu na escuta ativa, de preferência com transcrição. Escolha alguém que fala sobre trabalho e carreira. Use o mesmo trecho nas 3 sessões.',
          'Sessão 1: ouça 2 vezes lendo a transcrição. Sessão 2: repita colada no áudio, 3 a 5 vezes, imitando ritmo e entonação. Sessão 3: grave a última repetição e compare com o original.',
          'Foque no ritmo (palavras de conteúdo fortes, palavrinhas fracas) mais do que em sons perfeitos.'],
        pronto: 'Marque cada sessão de 10 minutos que fizer.' },
      { id: n + '-es', m: 'en', vezes: 2, min: 20, t: 'Escuta ativa: ' + s.tema,
        como: ['Escolha 1 episódio ou palestra de cerca de 20 minutos sobre ' + s.tema + '. Sugestões para procurar: ' + ESCUTA.join('; ') + ' (confira se há episódio atual no tema).',
          'Primeira passada sem legenda em português. Pause quando ouvir uma expressão que você usaria no trabalho e anote 5.',
          'Leve as 2 melhores para o Anki (aba Vocabulário, botão de copiar) e diga em voz alta, em inglês, um resumo de 3 frases.'],
        pronto: 'Marque cada escuta de 20 minutos. Uma delas pode ser o áudio do shadowing.' },
      { id: n + '-fa', m: 'en', vezes: 3, min: 15, t: 'Fala gravada em cenário de carreira',
        como: ['Os 3 cenários da semana, um por sessão: ' + s.fala.map(function (f, i) { return 'Sessão ' + (i + 1) + ': “' + f.p + '”'; }).join(' · ') + '.',
          'Antes de gravar, leia o molde da estrutura indicada (aba Semanas) e anote só 4 palavras-chave. Não escreva a resposta inteira.',
          'Grave 3 minutos sem parar. Se travar, continue em inglês, mesmo com frase simples. Depois ouça e conte as pausas longas (mais de 2 segundos), as muletas (“é”, “tipo”, “then…”) e quantas expressões da semana você usou.',
          'Regrave em 2 minutos, abrindo com a manchete e usando pelo menos 3 expressões da semana. Compare as duas gravações.',
          'Cole a transcrição no corretor da Rota Internacional (aba Inglês) e leve os 3 erros mais importantes ao log.'],
        pronto: 'Marque cada sessão gravada e regravada.' },
      { id: n + '-vc', m: 'en', vezes: 5, min: 7, t: 'Cartões de vocabulário de carreira',
        como: ['Na aba Hoje, toque em “Começar cartões”. Cada sessão tem de 10 a 20 cartões (os que vencem hoje primeiro, depois os novos).',
          'Antes de virar o cartão, tente dizer a expressão em voz alta. Só depois mostre a resposta.',
          'Com a resposta na tela, diga em voz alta uma frase sua com a expressão. Os exemplos são modelos: só afirme o que for verdade sobre você.',
          'Marque “Lembrei” ou “Não lembrei” com honestidade. O que você errou volta no dia seguinte; o que acertou volta cada vez mais espaçado.'],
        pronto: 'Cada sessão concluída com 5 ou mais cartões conta como uma sessão.' }
    ];
  }
  INGLES.forEach(function (s) { s.tarefas = tarefasIngles(s); s.vocab = VOCAB.filter(function (c) { return c.w === s.n; }); });

  /* ---------- Progresso ---------- */
  function todas() { var l = []; INGLES.forEach(function (s) { s.tarefas.forEach(function (t) { l.push({ t: t, semana: s.n }); }); }); return l; }
  function nFeitas(cfg, t) { var n = (cfg && cfg.cont && cfg.cont[t.id]) || 0; return Math.min(t.vezes, Math.max(0, +n || 0)); }
  function semanaDe(cfg, hoje) { if (!cfg || !cfg.inicio) return 0; var d = dias(parse(cfg.inicio), hoje); return d < 0 ? 0 : Math.min(N_SEMANAS, Math.floor(d / 7) + 1); }

  /* Vocabulário com repetição espaçada (caixas 0 a 5; intervalos em dias: 1, 1, 3, 7, 14, 30) */
  function fila(cfg, hoje, limite) {
    var srs = (cfg && cfg.srs) || {}, k = iso(hoje), sem = Math.max(1, semanaDe(cfg, hoje));
    var devidos = VOCAB.filter(function (c) { return srs[c.id] && srs[c.id].p <= k; })
      .sort(function (a, b) { return srs[a.id].p < srs[b.id].p ? -1 : srs[a.id].p > srs[b.id].p ? 1 : 0; });
    var intro = Object.keys(srs).filter(function (id) { return srs[id].d === k; }).length;
    var novos = VOCAB.filter(function (c) { return !srs[c.id] && c.w <= sem; }).slice(0, Math.max(0, NOVOS_DIA - intro));
    return { devidos: devidos, novos: novos, sessao: devidos.concat(novos).slice(0, limite || SESSAO_MAX) };
  }
  function responder(cfg, id, ok, hoje) {
    var srs = Object.assign({}, (cfg && cfg.srs) || {}), a = srs[id] || { c: 0, d: iso(hoje) };
    var c = ok ? Math.min(5, (a.c || 0) + 1) : 0;
    srs[id] = { c: c, p: iso(addDias(hoje, INT[c])), d: a.d };
    return srs;
  }
  function statsVocab(cfg, hoje) {
    var srs = (cfg && cfg.srs) || {}, k = iso(hoje), ids = Object.keys(srs).filter(function (id) { return VOCAB.some(function (c) { return c.id === id; }); });
    return { total: VOCAB.length, vistos: ids.length, dominados: ids.filter(function (id) { return srs[id].c >= 3; }).length, devidos: ids.filter(function (id) { return srs[id].p <= k; }).length };
  }

  function estado(cfg, hoje) {
    if (!cfg || !cfg.inicio) return { ativo: false };
    var ini = parse(cfg.inicio), delta = dias(ini, hoje), semana = semanaDe(cfg, hoje);
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
    var f = fila(cfg, hoje);
    return { ativo: true, delta: delta, semana: semana, comecaEm: delta < 0 ? -delta : 0, encerrado: delta >= N_SEMANAS * 7, fim: iso(addDias(ini, N_SEMANAS * 7 - 1)),
      total: total, feito: feito, pct: total ? Math.round(feito / total * 100) : 0, porSemana: porSemana, aulas: aulas, aulasTotal: aulasTotal,
      aulasSemana: semana ? aulas[semana] : 0, prox: prox, proxAdiantada: adiantada, atrasadas: atrasadas,
      vocab: Object.assign(statsVocab(cfg, hoje), { novosHoje: f.novos.length, sessao: f.sessao.length }) };
  }

  /* ---------- Alterações (devolvem novos objetos, sem mutar) ---------- */
  function contar(cfg, id, delta) {
    var t = todas().filter(function (x) { return x.t.id === id; })[0], c = Object.assign({}, (cfg && cfg.cont) || {});
    if (!t) return c;
    c[id] = Math.min(t.t.vezes, Math.max(0, (+c[id] || 0) + delta)); if (!c[id]) delete c[id]; return c;
  }
  function ajustarAulas(cfg, semana, delta) { var a = Object.assign({}, (cfg && cfg.aulas) || {}); a[semana] = Math.min(9, Math.max(0, (+a[semana] || 0) + delta)); return a; }
  function cfgPadrao(hoje) { return { inicio: iso(hoje), cont: {}, aulas: {}, res: {}, srs: {} }; }
  function dataDaSemana(cfg, n) { return addDias(parse(cfg.inicio), (n - 1) * 7); }
  function cartoesAnki(n) { return VOCAB.filter(function (c) { return c.w === n; }).map(function (c) { return c.pt + ';' + c.en + ' — ' + c.ex; }).join('\n'); }

  var api = { N_SEMANAS: N_SEMANAS, MIN_ING: MIN_ING, AULAS_SEMANA: AULAS_SEMANA, NOVOS_DIA: NOVOS_DIA, INT: INT, INGLES: INGLES, VOCAB: VOCAB, ESCUTA: ESCUTA,
    iso: iso, parse: parse, addDias: addDias, dias: dias, fmtMin: fmtMin, todas: todas, estado: estado, fila: fila, responder: responder, statsVocab: statsVocab,
    contar: contar, ajustarAulas: ajustarAulas, cfgPadrao: cfgPadrao, dataDaSemana: dataDaSemana, cartoesAnki: cartoesAnki };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_INGLES = api;
})(typeof window !== 'undefined' ? window : globalThis);
