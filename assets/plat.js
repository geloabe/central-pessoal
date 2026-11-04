/* Plataformas: trilhas de estudo de Databricks, Snowflake e dbt, com projetos de portfólio, no que for possível de graça.
   28 aulas (10 de Databricks, 10 de Snowflake, 8 de dbt; ~1 h cada: aula, cartões, quiz de 80%+ e lab). Sem calendário: a ordem é a trilha e o ritmo é seu.
   Funções puras (sem DOM nem rede), testáveis no Node. Também expõe CP_PLANO_ESTUDO (plano no formato do motor de estudo).
   Dados do usuário (documento plat/main):
     { ativa:'db'|'sf'|'dbt', aulas:{n:'AAAA-MM-DD'}, quiz:{n:{pct,data,n}}, labs:{n:'AAAA-MM-DD'}, notas:{n:'texto'}, leitura:{n:passo},
       srs:{id:{b,p,n,e,u}}, proj:{pdb1:{url:'https://github.com/...', ok:true}} } */
(function (root) {
  'use strict';
  var N_AULAS = 28;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }

  var TRILHAS = [
    { id: 'db', s: 1, nome: 'Databricks', curto: 'Databricks' },
    { id: 'sf', s: 2, nome: 'Snowflake', curto: 'Snowflake' },
    { id: 'dbt', s: 3, nome: 'dbt', curto: 'dbt' }
  ];
  var L = [
    ['d1', 'db', 'Lakehouse e Databricks: arquitetura, workspace e a Free Edition'],
    ['d2', 'db', 'Delta Lake: tabelas, transações e time travel'],
    ['d3', 'db', 'Spark SQL e PySpark no Databricks'],
    ['d4', 'db', 'Ingestão incremental: Auto Loader e COPY INTO'],
    ['d5', 'db', 'Medallion com pipelines declarativos e expectations'],
    ['d6', 'db', 'Unity Catalog: governança, permissões e linhagem'],
    ['d7', 'db', 'Orquestração com Jobs: tarefas, parâmetros e agenda'],
    ['d8', 'db', 'Engenharia de software: Git, bundles e CI'],
    ['d9', 'db', 'Desempenho e custo: layout de dados, otimização e boas práticas'],
    ['d10', 'db', 'Projeto final de portfólio e caminho de certificação'],
    ['s1', 'sf', 'Snowflake: arquitetura, edições, créditos e o teste grátis'],
    ['s2', 'sf', 'Objetos e SQL: bancos, stages, formatos e dados semiestruturados'],
    ['s3', 'sf', 'Carga de dados: COPY INTO, stages e Snowpipe'],
    ['s4', 'sf', 'Transformação incremental: streams, tasks e dynamic tables'],
    ['s5', 'sf', 'dbt no Snowflake'],
    ['s6', 'sf', 'Segurança e governança: funções, mascaramento e acesso por linha'],
    ['s7', 'sf', 'Desempenho: micro-partições, cache e dimensionamento'],
    ['s8', 'sf', 'Controle de custo: monitores de recurso e relatórios de uso'],
    ['s9', 'sf', 'Time Travel, clonagem e compartilhamento de dados'],
    ['s10', 'sf', 'Projeto final de portfólio e caminho de certificação'],
    ['t1', 'dbt', 'dbt: o que é, como funciona e como começar de graça'],
    ['t2', 'dbt', 'Modelos, ref() e source(): camadas e estrutura do projeto'],
    ['t3', 'dbt', 'Materializações e modelos incrementais'],
    ['t4', 'dbt', 'Testes, contratos e documentação'],
    ['t5', 'dbt', 'Jinja, macros e pacotes'],
    ['t6', 'dbt', 'Seeds, snapshots e dimensões de variação lenta'],
    ['t7', 'dbt', 'Ambientes, CI/CD e execução em produção'],
    ['t8', 'dbt', 'Projeto final, outros adaptadores e caminho de certificação']
  ];
  var LICOES = L.map(function (x, i) { return { n: i + 1, topico: x[0], trilha: x[1], ordem: x[1] === 'db' ? i + 1 : x[1] === 'sf' ? i - 9 : i - 19, titulo: x[2], minutos: 60 }; });

  /* Projetos de portfólio: cada um fecha quando os labs das aulas indicadas estão feitos e o link do repositório está registrado */
  var PROJETOS = [
    { id: 'pdb1', trilha: 'db', nome: 'Pipeline medallion com Auto Loader e expectations', aulas: [4, 5],
      porque: 'Mostra ingestão incremental e qualidade de dados em camadas bronze, silver e gold, que é o que vagas de Databricks pedem em produção.',
      entregas: ['Repositório público com notebooks ou código do pipeline', 'README em inglês: problema, arquitetura (diagrama), como rodar, resultados e limitações', 'Print do pipeline executado e do painel de qualidade (expectations)', 'Dados de origem 100% públicos e sem segredos no histórico do git'] },
    { id: 'pdb2', trilha: 'db', nome: 'Orquestração, governança e CI do lakehouse', aulas: [7, 8],
      porque: 'Mostra que o pipeline roda sozinho, é versionado e implantado por código, a diferença entre notebook solto e engenharia.',
      entregas: ['Job de várias tarefas com dependências e agenda (print e definição em código)', 'Arquivo do bundle e workflow de CI no repositório', 'README em inglês com como implantar e como reverter', 'Nenhuma credencial no repositório (variáveis e secrets)'] },
    { id: 'pdb3', trilha: 'db', nome: 'Projeto final: lakehouse ponta a ponta', aulas: [9, 10],
      porque: 'É o projeto que você apresenta em entrevista: junta ingestão, medallion, governança, orquestração e uma medida de desempenho antes e depois.',
      entregas: ['Repositório final organizado (pastas, README em inglês, diagrama)', 'Tabela de resultados: tempo e custo antes e depois de uma otimização', 'Uma página curta "decisões e trade-offs"', 'Link no LinkedIn e no currículo'] },
    { id: 'psf1', trilha: 'sf', nome: 'ELT incremental com streams, tasks ou dynamic tables', aulas: [13, 14],
      porque: 'Snowflake apareceu como requisito obrigatório em várias vagas; carga e transformação incremental é o núcleo do uso real.',
      entregas: ['Repositório com os scripts SQL numerados (setup, carga, transformação)', 'README em inglês: arquitetura, como rodar, custo estimado e como limpar tudo', 'Print do histórico de execução das tasks ou do refresh das dynamic tables', 'Sem dados pessoais nem credenciais'] },
    { id: 'psf2', trilha: 'sf', nome: 'dbt no Snowflake com testes e CI', aulas: [15],
      porque: 'Une as duas lacunas mais pedidas pelo mercado: Snowflake e CI/CD com testes de dados.',
      entregas: ['Projeto dbt com modelos staging e marts, testes e documentação gerada', 'Workflow de CI que roda lint e testes (sem ler dados de produção)', 'README em inglês com o diagrama de linhagem', 'Perfil de conexão fora do repositório'] },
    { id: 'psf3', trilha: 'sf', nome: 'Projeto final: ELT governado com relatório de custo', aulas: [16, 18, 20],
      porque: 'Mostra que você não só carrega dados, mas protege (mascaramento, funções), controla custo e documenta as decisões.',
      entregas: ['Repositório final com README em inglês e diagrama', 'Políticas de acesso e de mascaramento versionadas em SQL', 'Relatório de custo por warehouse, com monitor de recurso configurado', 'Uma página "decisões e trade-offs" e o link no currículo'] },
    { id: 'pdbt1', trilha: 'dbt', nome: 'Projeto dbt: staging, marts, testes e documentação', aulas: [22, 24],
      porque: 'Um projeto dbt bem estruturado, com testes e documentação publicada, é o portfólio mais pedido para engenharia de analytics e dados.',
      entregas: ['Repositório público com modelos em camadas (staging e marts)', 'Testes de dados e documentação gerada (print do site de documentação e do grafo de linhagem)', 'README em inglês: o que o projeto responde, como rodar do zero e como é a estrutura', 'Dados de exemplo públicos; nenhum segredo no histórico'] },
    { id: 'pdbt2', trilha: 'dbt', nome: 'Incremental, snapshots e macros', aulas: [23, 25, 26],
      porque: 'Mostra que você vai além de views simples: carga incremental, histórico de mudanças (SCD2) e código reutilizável.',
      entregas: ['Um modelo incremental com explicação da estratégia escolhida', 'Um snapshot (histórico de mudanças) com exemplo de antes e depois', 'Uma macro própria com teste', 'Seção no README em inglês sobre cada decisão'] },
    { id: 'pdbt3', trilha: 'dbt', nome: 'dbt com CI, outro adaptador e documentação publicada', aulas: [27, 28],
      porque: 'Fecha o ciclo profissional: ambientes, CI no GitHub Actions, o mesmo projeto rodando em mais de um banco e a documentação no ar.',
      entregas: ['Workflow de CI que roda lint e testes em cada PR', 'O mesmo projeto rodando em dois adaptadores (por exemplo DuckDB e Databricks ou Snowflake)', 'Documentação publicada (por exemplo no GitHub Pages) e README em inglês com o link dela', 'Link no LinkedIn e no currículo'] }
  ];

  var TOPICOS = LICOES.map(function (l) { return { id: l.topico, s: l.trilha === 'db' ? 1 : l.trilha === 'sf' ? 2 : 3, nome: l.titulo, d: [l.n], foco: 'medio', por: '' }; });
  var SECOES = TRILHAS.map(function (t) { return { id: t.s, nome: t.nome, peso: 50 }; });
  var DOCS_DIA = {};
  var ROTULOS = { dia: 'Aula', prova: 'Como aparece em entrevista e no trabalho', fontesTitulo: 'Fontes oficiais desta aula',
    fontesNota: 'A aula foi escrita a partir da documentação oficial abaixo. Se houver diferença, vale a documentação: planos gratuitos, limites e nomes de produtos mudam.',
    limpar: 'Limpar para não gastar créditos nem deixar recursos ligados', labOk: 'Concluí o lab e limpei os recursos' };

  function licao(n) { return LICOES.filter(function (l) { return l.n === n; })[0] || null; }
  function tem(m, n) { return !!(m && m[n]); }
  function passosDa(cfg, n) { cfg = cfg || {}; var q = (cfg.quiz || {})[n]; return { aula: tem(cfg.aulas, n), quiz: !!(q && q.pct >= 80), lab: tem(cfg.labs, n) }; }
  function completa(cfg, n) { var p = passosDa(cfg, n); return p.aula && p.quiz && p.lab; }
  function proxPasso(p) { return !p.aula ? 'aula' : !p.quiz ? 'quiz' : 'lab'; }
  function diaPlano(cfg) { var m = 0; Object.keys((cfg && cfg.aulas) || {}).forEach(function (k) { if (+k > m) m = +k; }); return Math.min(N_AULAS, Math.max(1, m + 1)); }

  function projetoEstado(cfg, p) {
    var labsOk = p.aulas.every(function (n) { return tem(cfg.labs, n); }), pj = (cfg.proj || {})[p.id] || {};
    return { id: p.id, labs: labsOk, url: pj.url || '', registrado: !!pj.url, ok: labsOk && !!pj.url };
  }

  function estado(cfg, hoje) {
    cfg = cfg || {}; hoje = hoje || new Date();
    var k = iso(hoje), feitos = 0, hojeN = 0, completas = 0, porTrilha = {}, prox = null, ativa = cfg.ativa === 'sf' ? 'sf' : cfg.ativa === 'dbt' ? 'dbt' : 'db';
    TRILHAS.forEach(function (t) { porTrilha[t.id] = { aulas: 0, completas: 0, total: 0, passos: 0, passosTotal: 0 }; });
    LICOES.forEach(function (l) {
      var p = passosDa(cfg, l.n), n3 = (p.aula ? 1 : 0) + (p.quiz ? 1 : 0) + (p.lab ? 1 : 0), t = porTrilha[l.trilha];
      feitos += n3; t.total++; t.passos += n3; t.passosTotal += 3; if (p.aula) t.aulas++;
      if (p.aula && p.quiz && p.lab) { completas++; t.completas++; }
      if (tem(cfg.aulas, l.n) && cfg.aulas[l.n] === k) hojeN++;
      if (tem(cfg.labs, l.n) && cfg.labs[l.n] === k) hojeN++;
      if (((cfg.quiz || {})[l.n] || {}).data === k) hojeN++;
    });
    function achar(trilha) { for (var i = 0; i < LICOES.length; i++) { var l = LICOES[i]; if (l.trilha === trilha && !completa(cfg, l.n)) return { n: l.n, titulo: l.titulo, trilha: l.trilha, ordem: l.ordem, passo: proxPasso(passosDa(cfg, l.n)) }; } return null; }
    prox = achar(ativa) || achar('db') || achar('sf') || achar('dbt');
    Object.keys(porTrilha).forEach(function (id) { var t = porTrilha[id]; t.pct = t.passosTotal ? Math.round(t.passos / t.passosTotal * 100) : 0; });
    var projetos = PROJETOS.map(function (p) { return projetoEstado(cfg, p); });
    return { ativo: true, ativa: ativa, diaPlano: diaPlano(cfg), passos: feitos, totalPassos: N_AULAS * 3, pct: Math.round(feitos / (N_AULAS * 3) * 100),
      completas: completas, total: N_AULAS, porTrilha: porTrilha, hoje: hojeN, prox: prox, projetos: projetos, projetosOk: projetos.filter(function (x) { return x.ok; }).length };
  }

  var PLANO = { iso: iso, addDias: addDias, parse: parse, TOPICOS: TOPICOS, SECOES: SECOES, DOCS_DIA: DOCS_DIA, ROTULOS: ROTULOS, RELATOS_DIA: {},
    estado: function (cfg) { return { ativo: true, diaPlano: diaPlano(cfg) }; } };

  var api = { N_AULAS: N_AULAS, TRILHAS: TRILHAS, LICOES: LICOES, PROJETOS: PROJETOS, TOPICOS: TOPICOS, SECOES: SECOES, iso: iso, parse: parse, addDias: addDias,
    licao: licao, passosDa: passosDa, completa: completa, diaPlano: diaPlano, estado: estado, PLANO: PLANO };
  root.CP_PLANO_ESTUDO = PLANO;
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_PLAT = api;
})(typeof window !== 'undefined' ? window : globalThis);
