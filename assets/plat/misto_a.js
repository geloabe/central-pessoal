(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var F = "```";
  function cod(lang, linhas) { return F + lang + "\n" + linhas.join("\n") + "\n" + F; }

  /* ============================== AULA 9 ============================== */
  C.dias[9] = {
    aula: {
      titulo: "Desempenho e custo: layout de dados, otimização e boas práticas",
      resumo: "Como o jeito que os arquivos de uma tabela Delta ficam organizados muda o tempo e o custo de uma consulta: liquid clustering, arquivos pequenos, OPTIMIZE, Query Profile, cache, Photon e a escolha entre serverless e clusters, com medição antes e depois.",
      simples: {
        analogia: "Imagine uma biblioteca em que os livros foram jogados em caixas na ordem em que chegaram. Para achar todos os livros de culinária, você precisa abrir todas as caixas. Agora imagine que alguém reorganizou as caixas por assunto e colou uma etiqueta em cada uma dizendo o que tem dentro. Você abre só as caixas de culinária. O conteúdo da biblioteca é o mesmo, mas o trabalho para achar o que você quer caiu muito. Em uma tabela Delta acontece algo parecido: os dados ficam em arquivos, cada arquivo tem uma etiqueta com valores mínimo e máximo, e organizar os dados de forma inteligente faz o motor pular arquivos inteiros sem ler.",
        pontos: [
          "Ler menos arquivos é a forma mais barata de ficar rápido.",
          "Muitos arquivos minúsculos deixam tudo lento; OPTIMIZE junta eles.",
          "Liquid clustering substitui particionamento e ZORDER em tabelas novas.",
          "Query Profile mostra onde o tempo foi gasto, de verdade, sem chute.",
          "Na Free Edition só existe compute serverless, com cota diária."
        ],
        paraQueServe: "Em entrevista e no trabalho, otimizar sem medir é chute. Saber medir antes e depois, e explicar o porquê, mostra maturidade e evita custo desnecessário."
      },
      glossario: [
        { t: "Liquid clustering", d: "Técnica de organização de dados em tabelas Delta que agrupa linhas por chaves de clustering e substitui particionamento e ZORDER." },
        { t: "OPTIMIZE", d: "Comando que reescreve arquivos de dados da tabela para melhorar o layout, compactando arquivos pequenos sem mudar os resultados das consultas." },
        { t: "Small files", d: "Excesso de arquivos pequenos em uma tabela, que aumenta o custo de abrir e planejar a leitura." },
        { t: "Data skipping", d: "Uso de estatísticas por arquivo (mínimo, máximo, nulos) para pular arquivos que não podem conter os dados filtrados." },
        { t: "Query Profile", d: "Tela do Databricks SQL que mostra duração, operadores, linhas e dados de entrada e saída de uma consulta executada." },
        { t: "Photon", d: "Motor de execução nativo e vetorizado da Databricks que acelera SQL e DataFrames sem mudar o código." },
        { t: "Serverless compute", d: "Compute gerenciado pela Databricks, sem você configurar cluster; é o único tipo disponível na Free Edition." },
        { t: "Predictive optimization", d: "Recurso que roda OPTIMIZE, VACUUM e ANALYZE automaticamente em tabelas gerenciadas do Unity Catalog." }
      ],
      blocos: [
        {
          t: "Por que layout de dados importa",
          facil: "Traduzindo: uma tabela Delta é uma pasta de arquivos. Quanto menos arquivos o motor precisa abrir, mais rápida e barata é a consulta.",
          p: [
            "O Databricks coleta estatísticas de data skipping ao gravar em tabelas Delta: para cada arquivo guarda valor mínimo, valor máximo, contagem de nulos e total de registros. Na consulta, usa isso para pular arquivos que não têm dados relevantes.",
            "Isso só ajuda se os dados parecidos estiverem juntos. Se o valor de cliente 42 aparece espalhado em todos os arquivos, o mínimo e o máximo de cada arquivo cobrem 42 e nada é pulado. Organizar o layout é fazer com que os filtros mais comuns caiam em poucos arquivos."
          ],
          dica: "Por padrão as estatísticas valem para as primeiras 32 colunas do esquema; por isso faz sentido manter colunas muito filtradas entre as primeiras (conclusão nossa, não frase da doc).",
          fonte: ["Data skipping for Delta Lake (Databricks)", "https://docs.databricks.com/aws/en/delta/data-skipping"]
        },
        {
          t: "Liquid clustering",
          facil: "Traduzindo: você diz por quais colunas costuma filtrar e o Databricks agrupa os dados por elas. Pode trocar de ideia depois sem reescrever tudo.",
          p: [
            "Segundo a doc, liquid clustering é uma técnica de layout que substitui particionamento de tabela e ZORDER, e a Databricks recomenda para todas as tabelas novas. Permite mudar as chaves depois sem reescrever os dados existentes.",
            cod("sql", [
              "CREATE TABLE table1 (col0 INT, col1 STRING) CLUSTER BY (col0);",
              "ALTER TABLE table1 CLUSTER BY (col1);",
              "ALTER TABLE table1 CLUSTER BY AUTO;   -- clustering automático exige predictive optimization",
              "OPTIMIZE table1;                      -- agrupa dados ainda não agrupados"
            ])
          ],
          lista: [
            "Até quatro chaves de clustering, com estatísticas coletadas.",
            "Não combina com particionamento nem ZORDER na mesma tabela.",
            "Escritas pequenas só agrupam acima de um limite de tamanho; OPTIMIZE completa o trabalho.",
            "OPTIMIZE ... FULL (Runtime 16.0 ou superior) força o reagrupamento, mas não reescreve arquivos que já estão agrupados pelas chaves atuais."
          ],
          armadilha: "Ligar clustering numa tabela existente não reorganiza os dados antigos sozinho; é preciso rodar OPTIMIZE (com FULL para reagrupar tudo). Versões mínimas segundo a página: liquid clustering em tabelas Delta é GA a partir do Runtime 15.4 LTS; o clustering na escrita exige 13.3 LTS ou superior; OPTIMIZE FULL, 16.0 ou superior.",
          fonte: ["Use liquid clustering for tables (Databricks)", "https://docs.databricks.com/aws/en/delta/clustering"]
        },
        {
          t: "Arquivos pequenos e OPTIMIZE",
          facil: "Traduzindo: mil arquivos de 1 MB custam mais para ler do que um de 1 GB. OPTIMIZE junta os pequenos em arquivos bem dimensionados.",
          p: [
            "OPTIMIZE reescreve arquivos de dados para melhorar o layout. Em tabelas com liquid clustering, agrupa pelas chaves. Não muda dados: o resultado das consultas é o mesmo antes e depois. A compactação por bin-packing é idempotente: rodar duas vezes seguidas sem dados novos não faz nada.",
            cod("sql", [
              "OPTIMIZE nome_da_tabela;",
              "OPTIMIZE nome_da_tabela WHERE data >= '2025-01-01';  -- limita o escopo (partições)"
            ]),
            "Segundo a doc de boas práticas do Delta, OPTIMIZE não remove os arquivos antigos; é o VACUUM que remove. Para tabelas gerenciadas do Unity Catalog, a predictive optimization roda OPTIMIZE e VACUUM sozinha."
          ],
          fonte: ["OPTIMIZE (Databricks)", "https://docs.databricks.com/aws/en/delta/optimize"]
        },
        {
          t: "Outros recursos de arquivo: compactação automática e tamanho-alvo",
          facil: "Traduzindo: além do OPTIMIZE manual, existem propriedades para o Delta compactar sozinho durante a escrita.",
          p: [
            "A doc de tamanho de arquivo descreve duas propriedades de tabela: auto compaction (autoOptimize.autoCompact) e optimized writes (autoOptimize.optimizeWrite). Também existe delta.targetFileSize para definir um tamanho-alvo, respeitado pelo OPTIMIZE em tabelas gerenciadas do Unity Catalog.",
            "A página afirma que o Databricks ajusta automaticamente o tamanho dos arquivos de tabelas gerenciadas do Unity Catalog, então ajuste manual interessa sobretudo a tabelas externas e cargas legadas. Quando não há tamanho-alvo definido, o autotune usa 256 MB para tabelas abaixo de 2,56 TB."
          ],
          dica: "Em tabela gerenciada na Free Edition, comece sem mexer em nada e só ajuste se a medição mostrar problema.",
          fonte: ["Control data file size (Databricks)", "https://docs.databricks.com/aws/en/delta/tune-file-size"]
        },
        {
          t: "EXPLAIN e Query Profile",
          facil: "Traduzindo: EXPLAIN mostra o plano que o motor pretende executar; o Query Profile mostra o que realmente aconteceu e onde gastou tempo.",
          p: [
            cod("sql", ["EXPLAIN FORMATTED SELECT * FROM minha_tabela WHERE cliente_id = 42;"]),
            "A sintaxe é EXPLAIN [ EXTENDED | CODEGEN | COST | FORMATTED ] instrução; sem modo, mostra só o plano físico. Para o profile: no menu lateral, abra Query History, clique na consulta e em See query profile.",
            "O painel traz duração dividida em agendamento, otimização e poda de arquivos, e execução; tempo agregado de tarefas; e detalhes de entrada e saída (IO) de dados lidos e escritos. Há aba Top operators com os operadores mais caros."
          ],
          armadilha: "Consulta atendida pelo cache de consultas não tem profile (aparece 'Query profile is not available'). Para medir de novo, altere ou remova o LIMIT.",
          fonte: ["Query profile (Databricks)", "https://docs.databricks.com/aws/en/sql/user/queries/query-profile"]
        },
        {
          t: "Cache e Photon: só o que a doc diz",
          facil: "Traduzindo: cache evita ler de novo do armazenamento remoto; Photon é um motor mais rápido para consultas grandes. Nenhum dos dois conserta layout ruim.",
          p: [
            "O disk cache (antes chamado Delta cache) guarda cópia local de arquivos Parquet buscados do armazenamento remoto, e vale para todos os Parquet, inclusive Delta. Em SQL warehouses, a doc diz que o comando CACHE SELECT é ignorado e um algoritmo de disk cache aprimorado é usado.",
            "Photon é o motor nativo vetorizado da Databricks; acelera SQL, DataFrames e ETL sem mudar código. Está ligado em serverless e SQL warehouses. A doc diz que consultas que terminam em menos de dois segundos não têm melhora relevante, e que Photon não suporta UDFs, RDD nem Dataset API (operações sem suporte voltam ao runtime Spark)."
          ],
          lista: [
            "Medida a olho nu engana: cache esquentado faz a segunda execução parecer melhor.",
            "Se uma operação não tem suporte no Photon, o compute volta ao runtime Spark para o restante dela."
          ],
          fonte: ["What is Photon? (Databricks)", "https://docs.databricks.com/aws/en/compute/photon"]
        },
        {
          t: "Serverless ou cluster, e os limites da Free Edition",
          facil: "Traduzindo: na Free Edition você não escolhe: tudo é serverless e com cota diária. No trabalho, a regra geral da doc é preferir serverless.",
          p: [
            "A página de escolha de compute recomenda serverless para a maioria das cargas: notebooks interativos (inicia mais rápido, escala sozinho), jobs e pipelines. Compute clássico fica para casos específicos, como RDD, R, ou configurações de cluster que serverless não oferece.",
            "A página de limitações da Free Edition diz: apenas serverless, sem configurações customizadas de compute; um SQL warehouse limitado ao tamanho 2X-Small; no máximo 5 tarefas de job concorrentes; sem R e Scala. Ao passar da cota, o compute do workspace desliga pelo resto do dia (em casos extremos, do mês), sem apagar dados. Os valores da cota não são publicados: confira a página oficial."
          ],
          fonte: ["Databricks Free Edition limitations", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        },
        {
          t: "Boas práticas de custo",
          facil: "Traduzindo: o guia de custo se resume a escolher o recurso certo, desligar o que está parado, medir quem gasta e desenhar cargas econômicas.",
          p: [
            "O pilar de otimização de custo do lakehouse tem quatro princípios: escolher recursos adequados (job compute, SQL warehouses, serverless), alocar dinamicamente (autoscaling, auto terminação, políticas), monitorar e controlar (tags, orçamentos, alertas, system tables) e desenhar cargas econômicas, por exemplo streaming disparado por gatilho em vez de sempre ligado.",
            "Para o seu projeto: uma consulta que lê menos dados custa menos em qualquer plano pago. Registrar tempo e dados lidos de cada otimização transforma o texto do README em evidência."
          ],
          fonte: ["Cost optimization best practices (Databricks)", "https://docs.databricks.com/aws/en/lakehouse-architecture/cost-optimization/best-practices"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: filtro por cliente",
        texto: "Uma tabela de eventos com milhões de linhas é consultada várias vezes por dia com filtro em cliente_id. Primeiro, você roda a consulta na tabela sem clustering e abre o Query Profile: anota a duração e os dados de entrada lidos. Depois cria uma cópia com CLUSTER BY (cliente_id), roda OPTIMIZE e executa a mesma consulta, alterando o LIMIT para não cair no cache de consultas. Se o motor pulou arquivos, os dados lidos caem e o tempo também. Se a tabela for pequena demais, a diferença pode ser quase nula, e isso também é um resultado honesto: registre e explique que o ganho aparece em tabelas maiores. O importante é que os números vêm da medição, não de opinião."
      },
      prova: [
        "Entrevista: 'Como você deixaria mais rápida uma consulta que filtra sempre pela mesma coluna?' Resposta forte: clustering nessa coluna, OPTIMIZE e prova com Query Profile.",
        "Trabalho: antes de pedir cluster maior, olhar arquivos pequenos, layout e tempo de planejamento e execução no profile.",
        "Entrevista: explicar a diferença entre liquid clustering, particionamento e ZORDER e por que a doc recomenda liquid clustering em tabelas novas."
      ],
      explique: "Explique com suas palavras por que organizar os dados de uma tabela Delta reduz o custo de uma consulta e como você provaria isso com números.",
      checagem: [
        "O que o OPTIMIZE faz com os arquivos e por que ele não muda o resultado das consultas?",
        "Por que a segunda execução de uma consulta idêntica pode não ter Query Profile?",
        "Quais opções de compute existem na Free Edition e o que acontece quando a cota diária acaba?"
      ]
    },
    fontes: [
      ["Use liquid clustering for tables (Databricks)", "https://docs.databricks.com/aws/en/delta/clustering"],
      ["OPTIMIZE (Databricks)", "https://docs.databricks.com/aws/en/delta/optimize"],
      ["Delta Lake best practices (Databricks)", "https://docs.databricks.com/aws/en/delta/best-practices"],
      ["Query profile (Databricks)", "https://docs.databricks.com/aws/en/sql/user/queries/query-profile"],
      ["EXPLAIN (Databricks SQL)", "https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-syntax-qry-explain"],
      ["Choose compute (Databricks)", "https://docs.databricks.com/aws/en/compute/choose-compute"],
      ["Predictive optimization (Databricks)", "https://docs.databricks.com/aws/en/optimizations/predictive-optimization"],
      ["Disk cache (Databricks)", "https://docs.databricks.com/aws/en/optimizations/disk-cache"],
      ["range table-valued function (Databricks)", "https://docs.databricks.com/aws/en/sql/language-manual/functions/range"]
    ],
    cartoes: [
      { id: "a9c1", f: "O que é liquid clustering?", v: "Técnica de layout de dados em tabelas Delta que agrupa por chaves e substitui particionamento e ZORDER; as chaves podem mudar depois.", t: "d9" },
      { id: "a9c2", f: "Como ativar clustering numa tabela nova?", v: "CREATE TABLE ... CLUSTER BY (coluna). Em tabela existente: ALTER TABLE ... CLUSTER BY (colunas).", t: "d9" },
      { id: "a9c3", f: "Quantas chaves de clustering são permitidas?", v: "Até quatro, e elas precisam ter estatísticas coletadas (por padrão, as primeiras 32 colunas).", t: "d9" },
      { id: "a9c4", f: "O que OPTIMIZE faz?", v: "Reescreve arquivos para melhorar o layout (compactação e agrupamento) sem alterar os dados; é idempotente.", t: "d9" },
      { id: "a9c5", f: "OPTIMIZE apaga arquivos antigos?", v: "Não. Os arquivos substituídos continuam até um VACUUM removê-los; predictive optimization roda os dois sozinha.", t: "d9" },
      { id: "a9c6", f: "Qual a sintaxe do EXPLAIN?", v: "EXPLAIN [ EXTENDED | CODEGEN | COST | FORMATTED ] instrução; sem modo, mostra só o plano físico.", t: "d9" },
      { id: "a9c7", f: "Como abrir o Query Profile?", v: "Query History no menu lateral, clicar na consulta e em See query profile.", t: "d9" },
      { id: "a9c8", f: "Por que uma consulta pode vir sem profile?", v: "Se foi atendida pelo cache de consultas aparece 'Query profile is not available'; altere ou remova o LIMIT.", t: "d9" },
      { id: "a9c9", f: "Quando o Photon não ajuda?", v: "Consultas que terminam em menos de 2 segundos não têm melhora relevante, e UDFs, RDD e Dataset API não são suportados.", t: "d9" },
      { id: "a9c10", f: "Que compute existe na Free Edition?", v: "Apenas serverless; sem configuração customizada. Um SQL warehouse 2X-Small. Acabou a cota: compute desliga no resto do dia.", t: "d9" }
    ],
    questoes: [
      {
        id: "a9q1", s: 1, t: "d9",
        e: "Sua tabela de eventos é sempre filtrada por cliente_id e cresce todo dia. Hoje ela é particionada por data e tem muitos arquivos pequenos. Qual abordagem a documentação recomenda para tabelas novas com esse padrão de acesso?",
        o: ["Criar a tabela com CLUSTER BY (cliente_id) e rodar OPTIMIZE", "Particionar por cliente_id, que tem muitos valores distintos", "Usar ZORDER BY e também particionamento na mesma tabela", "Desligar o data skipping para forçar leitura completa"],
        c: [0],
        x: "A documentação de liquid clustering diz que a técnica substitui particionamento e ZORDER e é recomendada para tabelas novas, em especial com filtros de alta cardinalidade e tabelas que crescem rápido. Particionar por uma coluna com muitos valores gera partições minúsculas e piora o problema de arquivos pequenos. Clustering não é compatível com particionamento ou ZORDER na mesma tabela, então combinar as duas técnicas está errado. Desligar o data skipping tira justamente o mecanismo que permite pular arquivos, aumentando a leitura."
      },
      {
        id: "a9q2", s: 1, t: "d9",
        e: "Você ligou clustering numa tabela Delta que já tinha dados e trocou as chaves. Quer que os dados antigos sejam reagrupados pelas novas chaves. Qual comando faz isso, segundo a documentação?",
        o: ["VACUUM tabela", "OPTIMIZE tabela FULL", "ANALYZE TABLE tabela COMPUTE DELTA STATISTICS", "ALTER TABLE tabela CLUSTER BY NONE"],
        c: [1],
        x: "A página de liquid clustering informa que, para reagrupar dados existentes depois de ligar o clustering ou mudar as chaves, usa-se OPTIMIZE com FULL. O OPTIMIZE comum é incremental e agrupa só o que ainda não foi agrupado. VACUUM remove arquivos não referenciados e não reorganiza nada. ANALYZE TABLE recomputa estatísticas e não muda o layout. CLUSTER BY NONE remove as chaves de clustering, o contrário do que se quer."
      },
      {
        id: "a9q3", s: 1, t: "d9",
        e: "Você mediu uma consulta, melhorou o layout e rodou a mesma consulta de novo, mas ao abrir o histórico o painel mostra que o profile não está disponível. O que provavelmente aconteceu e o que fazer?",
        o: ["A consulta falhou; recriar a tabela do zero", "O Photon desligou; religar nas configurações da Free Edition", "O resultado veio do cache de consultas; alterar ou remover o LIMIT para obter um profile", "O workspace perdeu o acesso ao Query History; reiniciar o navegador"],
        c: [2],
        x: "A documentação do Query Profile diz que consultas atendidas pelo cache de consultas não têm profile e mostram 'Query profile is not available'; para obter um, faça uma mudança trivial, como alterar ou remover o LIMIT. Não indica falha da consulta, então recriar a tabela é exagero. Photon não é algo que se religue manualmente na Free Edition (é serverless) e não afeta a existência do profile. Problema de navegador não explica a mensagem específica descrita pela doc."
      },
      {
        id: "a9q4", s: 1, t: "d9",
        e: "Colega propõe ativar um cluster grande em modo clássico na Free Edition para acelerar um notebook de portfólio. Considerando a página de limitações da Free Edition, qual é a resposta correta?",
        o: ["Pode, basta escolher o tipo de instância no assistente de cluster", "Pode, desde que o cluster use Photon", "Pode, mas só com GPU", "Não: a Free Edition tem apenas compute serverless, sem configurações customizadas"],
        c: [3],
        x: "A página de limitações é explícita: na Free Edition só existe compute serverless e configurações customizadas de compute não são suportadas, além de cota diária. Escolher instância é justamente uma configuração customizada, portanto não existe. Photon não resolve a ausência de clusters clássicos. A página só cita GPU no contexto de model serving e não oferece GPU para clusters, então essa opção também é inválida."
      },
      {
        id: "a9q5", s: 1, t: "d9",
        e: "Depois de rodar OPTIMIZE em uma tabela, o time percebe que o armazenamento não diminuiu. Eles esperavam que os arquivos antigos desaparecessem. Qual explicação bate com a documentação? (Escolha duas)",
        o: ["OPTIMIZE não apaga os arquivos que substituiu; o VACUUM é que remove", "OPTIMIZE só funciona em tabelas externas", "Predictive optimization pode rodar OPTIMIZE e VACUUM automaticamente em tabelas gerenciadas do Unity Catalog", "OPTIMIZE altera os dados e por isso mantém uma cópia de segurança", "OPTIMIZE precisa ser rodado duas vezes para apagar o histórico"],
        c: [0, 2],
        x: "Segundo a doc de boas práticas do Delta, OPTIMIZE não remove os arquivos que substitui; é preciso VACUUM, e a predictive optimization executa OPTIMIZE e VACUUM sozinha nas tabelas gerenciadas do Unity Catalog. A afirmação sobre tabelas externas é falsa: OPTIMIZE vale para Delta em geral. OPTIMIZE não muda dados, só reorganiza arquivos, então não existe cópia por alteração. Rodar duas vezes seguidas não tem efeito, pois a compactação é idempotente; o histórico não some por isso."
      },
      {
        id: "a9q6", s: 1, t: "d9",
        e: "Uma consulta de 1 segundo numa tabela pequena não ficou mais rápida depois de você habilitar clustering e rodar OPTIMIZE. Você precisa explicar isso no README. Qual é a conclusão mais honesta e coerente com a documentação?",
        o: ["O clustering não funciona na Free Edition", "O Photon e o layout só rendem ganhos relevantes em consultas maiores; registrar o resultado e testar com mais dados", "OPTIMIZE precisa ser rodado a cada consulta", "É preciso trocar para um cluster clássico"],
        c: [1],
        x: "A documentação do Photon afirma que consultas que normalmente terminam em menos de dois segundos não têm melhora significativa, e, em uma tabela pequena, há poucos arquivos para pular (raciocínio nosso, não frase da doc). Dizer que não funciona na Free Edition é falso, pois a página de limitações não proíbe isso. OPTIMIZE não precisa rodar a cada consulta e é idempotente. A Free Edition não oferece cluster clássico, então essa alternativa nem existe."
      }
    ],
    lab: {
      t: "Medir antes e depois de uma otimização e registrar numa tabela de resultados",
      custo: "gratuito (Databricks Free Edition, consome a cota de compute serverless). Se a cota diária acabar, a doc diz que o compute fica indisponível pelo resto do dia e volta quando o limite renova.",
      tempo: "40 a 60 min",
      porque: "Medir transforma 'otimizei' em evidência: tempo e dados lidos de uma consulta idêntica, antes e depois, ficam registrados numa tabela e no README do projeto databricks-lakehouse-portfolio.",
      antes: "Você precisa de um workspace Databricks Free Edition e de um schema onde possa criar tabelas (use o catálogo e schema que aparecem no seu workspace; os nomes variam). Os passos foram conferidos contra a documentação oficial e NÃO foram executados. Na tela, o SQL editor mostra o resultado e a aba de histórico (Query History) traz o botão See query profile. O volume de 5 milhões de linhas é um ponto de partida: se gastar cota demais, reduza; se a diferença não aparecer, aumente e registre isso.",
      passos: [
        {
          t: "Criar a tabela de resultados",
          cmd: cod("sql", [
            "CREATE TABLE IF NOT EXISTS resultados_desempenho (",
            "  experimento STRING, etapa STRING, duracao_s DOUBLE,",
            "  dados_lidos STRING, observacao STRING",
            ");"
          ]),
          p: "Ela guarda uma linha por medição. Preencha à mão com os números do Query Profile."
        },
        {
          t: "Criar a tabela base sem clustering",
          cmd: cod("sql", [
            "CREATE TABLE eventos_base AS",
            "SELECT id AS evento_id, id % 1000 AS cliente_id, id % 97 AS valor",
            "FROM range(0, 5000000);"
          ]),
          p: "range(start, end) gera uma sequência de números como tabela. A coluna cliente_id terá mil valores distintos espalhados pelos arquivos."
        },
        {
          t: "Medir ANTES: EXPLAIN e consulta",
          cmd: cod("sql", [
            "EXPLAIN FORMATTED SELECT SUM(valor) FROM eventos_base WHERE cliente_id = 42;",
            "SELECT SUM(valor) FROM eventos_base WHERE cliente_id = 42;"
          ]),
          p: "Guarde o texto do EXPLAIN. Depois abra Query History, clique na consulta, See query profile, e anote a duração total e os dados lidos (Input) do resumo. Registre uma linha 'antes' em resultados_desempenho."
        },
        {
          t: "Aplicar a otimização",
          cmd: cod("sql", [
            "CREATE TABLE eventos_cluster CLUSTER BY (cliente_id) AS",
            "SELECT * FROM eventos_base;",
            "OPTIMIZE eventos_cluster;"
          ]),
          p: "Cria uma cópia agrupada por cliente_id e roda OPTIMIZE. A saída do OPTIMIZE mostra estatísticas de arquivos removidos e adicionados: anote."
        },
        {
          t: "Medir DEPOIS e registrar",
          cmd: cod("sql", [
            "EXPLAIN FORMATTED SELECT SUM(valor) FROM eventos_cluster WHERE cliente_id = 42 LIMIT 1;",
            "SELECT SUM(valor) FROM eventos_cluster WHERE cliente_id = 42 LIMIT 1;",
            "INSERT INTO resultados_desempenho VALUES",
            "  ('filtro_cliente', 'antes', 0.0, 'preencher', 'tabela sem clustering'),",
            "  ('filtro_cliente', 'depois', 0.0, 'preencher', 'CLUSTER BY + OPTIMIZE');"
          ]),
          p: "Substitua 0.0 e 'preencher' pelos valores reais do Query Profile. Se o profile aparecer como indisponível, mude o LIMIT. Se a diferença for pequena, escreva isso na observação."
        }
      ],
      verificar: "A tabela resultados_desempenho tem pelo menos duas linhas (antes e depois) com duração e dados lidos copiados do Query Profile, e você guardou os textos do EXPLAIN e um print do profile para o repositório.",
      limpar: [
        "Opcional: DROP TABLE eventos_base e eventos_cluster para não ocupar espaço; mantenha resultados_desempenho.",
        "Salve prints do Query Profile e os textos de EXPLAIN na pasta docs/ do repositório (sem nomes de usuário, e-mails ou tokens visíveis).",
        "Nunca commite tokens de acesso, senhas ou dados pessoais."
      ],
      erros: [
        { s: "Query profile is not available", c: "A consulta foi atendida pelo cache de consultas.", r: "Altere ou remova o LIMIT e rode de novo." },
        { s: "Compute indisponível ou consulta recusada no meio do lab", c: "A cota diária da Free Edition foi atingida.", r: "Espere o reset da cota (a doc diz que dados e configurações permanecem) e reduza o volume de linhas." },
        { s: "ALTER/CREATE com CLUSTER BY dá erro de sintaxe ou recurso não suportado", c: "Requisito de runtime ou tipo de tabela; a página de liquid clustering lista versões mínimas.", r: "Confira a página oficial de liquid clustering e use tabelas gerenciadas do Unity Catalog em serverless." },
        { s: "Antes e depois com tempos iguais", c: "Tabela pequena demais ou cache esquentado.", r: "Aumente o volume, mude o filtro e registre honestamente que o ganho foi pequeno." }
      ]
    }
  };

  /* ============================== AULA 10 ============================== */
  C.dias[10] = {
    aula: {
      titulo: "Projeto final de portfólio e caminho de certificação",
      resumo: "Como fechar o repositório databricks-lakehouse-portfolio com ingestão, medallion, governança, orquestração e medida de desempenho; como escrever README em inglês e decisões e trade-offs; como contar o projeto em entrevista; e o que a página oficial diz sobre a certificação Data Engineer Associate.",
      simples: {
        analogia: "Pense em um projeto de portfólio como uma receita publicada, e não só o prato pronto. Quem lê não vai provar a comida; vai julgar se você explica os ingredientes, por que escolheu cada um, quanto custou e o que daria errado. Um prato bonito sem receita convence pouco. Uma receita clara, com tempos medidos e a lista do que você faria diferente, convence mais, mesmo que o prato seja simples. É isso que o repositório final faz: mostra o caminho dos dados, as escolhas e os números verdadeiros, para qualquer pessoa reproduzir e para você contar em cinco minutos de entrevista.",
        pontos: [
          "O projeto junta cinco peças: ingestão, medallion, governança, orquestração e medida.",
          "README em inglês, curto, com diagrama e como rodar.",
          "A página de decisões e trade-offs vale mais do que listar tecnologias.",
          "Contar números verdadeiros, inclusive os pequenos, gera credibilidade.",
          "Certificação é complemento e tem custo; confira a página oficial."
        ],
        paraQueServe: "Dá a você uma prova pública e reproduzível do que sabe, e um roteiro honesto para entrevistas, sem prometer resultado de contratação ou de prova."
      },
      glossario: [
        { t: "Medallion architecture", d: "Padrão de camadas bronze (bruto), silver (validado e limpo) e gold (refinado para o negócio) de organização de dados no lakehouse." },
        { t: "Lakeflow Jobs", d: "Recurso de orquestração da Databricks: um job coordena tarefas com dependências e pode ter gatilho por horário ou evento." },
        { t: "Unity Catalog", d: "Camada de governança da Databricks onde privilégios são concedidos com GRANT em catálogos, schemas e tabelas." },
        { t: "README", d: "Arquivo de entrada do repositório que explica o que o projeto faz, como rodar e quais resultados ele mostra." },
        { t: "Trade-off", d: "Escolha consciente entre alternativas, com o que se ganha e o que se perde, registrada para justificar a decisão." },
        { t: "Secret scanning", d: "Recurso do GitHub que procura credenciais expostas no histórico completo do Git; roda automaticamente em repositórios públicos." },
        { t: "Databricks Free Edition", d: "Versão sem custo da Databricks para aprender, apenas serverless, com cota e uso não comercial." },
        { t: "Data Engineer Associate", d: "Certificação Databricks de nível associado para engenharia de dados; detalhes de formato e custo estão na página oficial." }
      ],
      blocos: [
        {
          t: "Arquitetura do projeto final",
          facil: "Traduzindo: o projeto conta uma história em cinco passos: o dado entra, ganha camadas, é protegido, roda sozinho e tem desempenho medido.",
          p: [
            "Proposta de arquitetura para o repositório databricks-lakehouse-portfolio, tudo na Free Edition:",
          ],
          lista: [
            "Ingestão: arquivos pequenos de uma fonte pública carregados em um volume e lidos para a camada bronze.",
            "Medallion: bronze (bruto), silver (limpo, tipado, sem duplicatas), gold (agregados para análise).",
            "Governança: privilégios com GRANT no Unity Catalog e documentação de quem pode ler o quê.",
            "Orquestração: um job com tarefas encadeadas bronze, silver e gold, com gatilho ou execução manual.",
            "Desempenho: a tabela de resultados da aula 9, com antes e depois."
          ],
          dica: "Escolha uma fonte de dados pequena e pública, para caber na cota diária e ser fácil de reproduzir.",
          fonte: ["Medallion architecture (Databricks)", "https://docs.databricks.com/aws/en/lakehouse/medallion"]
        },
        {
          t: "Camadas e orquestração, conforme a doc",
          facil: "Traduzindo: bronze guarda o dado como chegou; silver limpa; gold serve o negócio. Um job liga as etapas.",
          p: [
            "A doc descreve bronze como dados brutos mantidos no formato original, com todo o histórico para reprocessar e auditar. Silver traz dados validados e enriquecidos, com deduplicação, tratamento de nulos, conversão de tipos e imposição de esquema. Gold traz conjuntos refinados e orientados ao negócio, muitas vezes agregados e modelados dimensionalmente.",
            "Lakeflow Jobs é o recurso de automação: um job tem tarefas (por exemplo notebook ou script Python) e dependências formando um grafo acíclico, com gatilhos por horário ou por evento. Na Free Edition há limite de tarefas concorrentes e de pipelines ativos; confira a página oficial."
          ],
          fonte: ["Lakeflow Jobs (Databricks)", "https://docs.databricks.com/aws/en/jobs/"]
        },
        {
          t: "Governança com Unity Catalog",
          facil: "Traduzindo: governança aqui é decidir e registrar quem pode usar cada catálogo, schema e tabela, com comandos GRANT.",
          p: [
            "A sintaxe geral é GRANT tipo-de-privilégio ON tipo-de-objeto nome TO principal. Exemplos da doc:",
            cod("sql", [
              "GRANT USE CATALOG ON CATALOG main TO `finance-team`;",
              "GRANT USE SCHEMA ON SCHEMA main.default TO `finance-team`;",
              "GRANT CREATE TABLE ON SCHEMA main.default TO `finance-team`;"
            ]),
            "Na Free Edition há apenas um workspace e uma metastore, sem SSO. Então, no portfólio, você documenta o modelo de acesso que adotaria (quais grupos, quais privilégios) e mostra os GRANTs que pode rodar. Para conceder é preciso ser metastore admin, ter MANAGE no objeto ou ser dono."
          ],
          armadilha: "Não afirme no README que o projeto 'tem governança de produção' se só você usa o workspace; descreva o que foi aplicado e o que seria o próximo passo.",
          fonte: ["Manage privileges in Unity Catalog (Databricks)", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/"]
        },
        {
          t: "README em inglês e a página de decisões e trade-offs",
          facil: "Traduzindo: o README responde em dois minutos: o que é, como rodar, o que mostra. A página de decisões explica o porquê.",
          p: [
            "Estrutura sugerida do README (em inglês, curto): Title and one-line summary; Architecture (diagram); Data source; How to run (steps and prerequisites); Results (tabela de desempenho com antes e depois); Costs (Free Edition); Limitations; What I would do next.",
            "Página docs/decisions.md, uma decisão por seção, com este molde: Context, Options considered, Decision, Trade-offs, Evidence. Exemplos: 'Liquid clustering instead of partitioning' com a tabela da aula 9 como evidência; 'Serverless only' porque a Free Edition não permite clusters customizados; 'Small public dataset' por causa da cota."
          ],
          dica: "Frases curtas, verbos no presente, sem adjetivos de marketing. Cada afirmação deve apontar para um arquivo, print ou número do repositório.",
          fonte: ["Free Edition limitations (Databricks)", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        },
        {
          t: "Como contar o projeto em entrevista",
          facil: "Traduzindo: conte em quatro partes: problema, desenho, medida, o que mudaria. Use só números que estão no seu repositório.",
          p: [
            "Roteiro de cerca de 2 minutos: (1) O problema e o dado; (2) A arquitetura em três frases (bronze, silver, gold, job); (3) Uma decisão com trade-off, por exemplo clustering em vez de partição; (4) A medida, 'a consulta caiu de X para Y segundos e leu Z de dados', lendo da sua tabela de resultados; (5) O que faria diferente em produção.",
            "Se o ganho foi pequeno, diga: 'a tabela era pequena, o ganho foi marginal, e eu sei que ele cresce com o volume, mas não mostrei isso'. Entrevistadores costumam valorizar a clareza sobre os limites do experimento. Não invente escala nem equipe: o projeto roda em ambiente gratuito de aprendizagem, de uso não comercial."
          ],
          armadilha: "Evite 'produção' ou 'milhões de usuários'. A página de limitações diz que contas Free Edition não podem ser usadas para fins comerciais, e a página da Free Edition a descreve como voltada a aprender e experimentar.",
          fonte: ["Databricks Free Edition limitations", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        },
        {
          t: "Certificação Databricks Data Engineer Associate",
          facil: "Traduzindo: é uma prova de múltipla escolha, com custo e validade definidos pela Databricks. Confira a página antes de decidir.",
          p: [
            "A página oficial mostra: 45 questões de múltipla escolha pontuadas, 90 minutos, taxa de registro de USD 200, sem materiais de apoio, aplicação supervisionada online ou em centro de testes, sem pré-requisitos (treinamento relacionado é fortemente recomendado), validade de 2 anos, e recertificação fazendo a versão atual da prova. Idiomas listados: inglês, japonês, português (BR) e coreano. Alguns exames incluem itens não pontuados.",
            "O conteúdo exato (seções e pesos) está no guia do exame em PDF, linkado na própria página; o guia mostrado leva data no nome. Confira a versão vigente antes de estudar, pois valores e conteúdo mudam. Certificação não garante emprego nem aprovação: é um complemento ao projeto."
          ],
          fonte: ["Databricks Certified Data Engineer Associate", "https://www.databricks.com/learn/certification/data-engineer-associate"]
        },
        {
          t: "Cursos gratuitos oficiais",
          facil: "Traduzindo: a Databricks tem cursos e trilhas gratuitos; só use os que a página marca como gratuitos.",
          p: [
            "A página de treinamento marca como gratuitos: Databricks Fundamentals (1h30, com quiz e badge), AI Agent Fundamentals (1h30), Generative AI Fundamentals (60 min) e trilhas por função de 12 horas com laboratórios (Data Engineer, Machine Learning Engineer e Data Analyst). Há também a série 'Free Azure Databricks Training' (webinars): o título diz free, mas a página não mostra o rótulo FREE nela.",
            "A mesma página marca como pagos, por exemplo, Data Engineering With Databricks (16 h) e Data Ingestion with Lakeflow Connect (4 h). A página não diz se a Databricks Academy inteira é gratuita, e a trilha gratuita de Data Engineer é a candidata natural para estudo sem custo. Confira a página oficial antes de se inscrever."
          ],
          lista: ["Prefira a trilha gratuita de Data Engineer e o Databricks Fundamentals.", "Não pague curso sem antes conferir o rótulo de preço na página."],
          fonte: ["Databricks training", "https://www.databricks.com/learn/training/home"]
        },
        {
          t: "Segredos no histórico do Git",
          facil: "Traduzindo: apagar um token no último commit não apaga ele do histórico. Verifique antes de publicar.",
          p: [
            "O secret scanning do GitHub procura credenciais em todo o histórico, em todas as branches, e roda automaticamente em repositórios públicos sem custo. Se encontrar um segredo, a doc orienta rotacionar a credencial imediatamente; remover do histórico é opcional, demorado e muitas vezes desnecessário quando a credencial já foi revogada.",
            "Antes de tornar o repositório público, faça uma busca simples no histórico (veja o lab). É uma checagem heurística, não substitui revogar tokens que tenham vazado."
          ],
          fonte: ["About secret scanning (GitHub Docs)", "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: a decisão sobre clustering no README",
        texto: "Na página decisions.md você escreve uma seção chamada 'Liquid clustering instead of partitioning'. Em Context, diz que a consulta mais comum filtra por cliente_id. Em Options, lista particionar por cliente_id, usar clustering e não fazer nada. Em Decision, escolhe CLUSTER BY (cliente_id) porque a documentação recomenda liquid clustering para tabelas novas e partições por muitos valores gerariam arquivos pequenos. Em Trade-offs, anota que clustering exige runtime recente e que não combina com partição. Em Evidence, aponta para a tabela resultados_desempenho, mostrando a duração e os dados lidos antes e depois, e admite se o ganho foi pequeno por causa do tamanho dos dados. Assim cada decisão tem motivo, custo e prova."
      },
      prova: [
        "Entrevista: 'Fale de um projeto seu.' Use o roteiro problema, desenho, decisão, medida, próximo passo, com números do seu repositório.",
        "Trabalho: decisões documentadas (ADR simples) evitam discutir de novo por que algo foi escolhido e aceleram a entrada de pessoas novas.",
        "Entrevista: perguntas sobre medallion, GRANT no Unity Catalog e orquestração com jobs aparecem como cenário; o projeto vira exemplo concreto."
      ],
      explique: "Explique com suas palavras como você apresentaria o projeto lakehouse ponta a ponta em dois minutos, citando uma decisão com trade-off e um número medido.",
      checagem: [
        "Quais são as cinco peças do projeto final e que arquivo do repositório prova cada uma?",
        "O que a seção Evidence de uma decisão deve conter e de onde vêm os números?",
        "Por que apagar um token no último commit não resolve se ele já foi commitado antes?"
      ]
    },
    fontes: [
      ["Medallion architecture (Databricks)", "https://docs.databricks.com/aws/en/lakehouse/medallion"],
      ["Lakeflow Jobs (Databricks)", "https://docs.databricks.com/aws/en/jobs/"],
      ["Manage privileges in Unity Catalog (Databricks)", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/"],
      ["What is Auto Loader? (Databricks)", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/"],
      ["Databricks Certified Data Engineer Associate", "https://www.databricks.com/learn/certification/data-engineer-associate"],
      ["Databricks training", "https://www.databricks.com/learn/training/home"],
      ["Databricks Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition"],
      ["Free Edition limitations (Databricks)", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"],
      ["About secret scanning (GitHub Docs)", "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning"]
    ],
    cartoes: [
      { id: "a10c1", f: "Quais as cinco peças do projeto final?", v: "Ingestão, medallion (bronze, silver, gold), governança, orquestração e medida de desempenho.", t: "d10" },
      { id: "a10c2", f: "O que guarda a camada bronze?", v: "Dados brutos no formato original, com histórico, para reprocessar e auditar; validação mínima.", t: "d10" },
      { id: "a10c3", f: "O que acontece na silver?", v: "Validação e limpeza: deduplicação, nulos, conversão de tipos, imposição de esquema e junções.", t: "d10" },
      { id: "a10c4", f: "Para que serve a gold?", v: "Conjuntos refinados e orientados ao negócio, geralmente agregados, para dashboards, ML e aplicações.", t: "d10" },
      { id: "a10c5", f: "Sintaxe geral do GRANT no Unity Catalog?", v: "GRANT privilégio ON tipo-de-objeto nome TO principal; ex.: GRANT USE CATALOG ON CATALOG main TO `grupo`.", t: "d10" },
      { id: "a10c6", f: "Molde de uma decisão no decisions.md", v: "Context, Options considered, Decision, Trade-offs, Evidence, com número ou print do repositório.", t: "d10" },
      { id: "a10c7", f: "Formato da prova Data Engineer Associate segundo a página", v: "45 questões de múltipla escolha pontuadas, 90 minutos, USD 200, validade de 2 anos; confira a página atual.", t: "d10" },
      { id: "a10c8", f: "Que treinamentos gratuitos a página lista?", v: "Databricks Fundamentals, AI Agent Fundamentals, Generative AI Fundamentals e trilhas de 12 horas por função (Data Engineer, ML Engineer, Data Analyst), marcados FREE.", t: "d10" },
      { id: "a10c9", f: "O que fazer se um segredo foi commitado?", v: "Rotacionar a credencial imediatamente; remover do histórico é opcional e demorado, segundo a doc do GitHub.", t: "d10" },
      { id: "a10c10", f: "Como falar de ganho pequeno em entrevista?", v: "Dizer o número real, explicar a causa (ex.: tabela pequena) e o que testaria com mais dados.", t: "d10" }
    ],
    questoes: [
      {
        id: "a10q1", s: 1, t: "d10",
        e: "Você está montando as camadas do projeto. Uma etapa remove duplicatas, converte tipos e impõe o esquema dos dados vindos da ingestão bruta. Em qual camada do medallion essa etapa deve ficar, segundo a documentação?",
        o: ["Gold", "Bronze", "Silver", "Camada de governança"],
        c: [2],
        x: "A doc de medallion descreve silver como a camada de dados validados e enriquecidos, onde ocorrem deduplicação, tratamento de nulos, conversão de tipos, imposição de esquema e junções. Bronze guarda dados brutos no formato original, com validação mínima, então limpar ali perde o histórico fiel. Gold é para conjuntos refinados e orientados ao negócio, geralmente agregados. Governança não é uma camada de dados do medallion, e sim controle de acesso por privilégios."
      },
      {
        id: "a10q2", s: 1, t: "d10",
        e: "No README em inglês você quer registrar por que usou clustering em vez de particionamento. Qual conteúdo na página de decisões dá mais credibilidade a essa escolha numa entrevista?",
        o: ["Uma frase dizendo que clustering é a melhor técnica", "Uma lista de tecnologias da moda usadas no projeto", "Apenas o código SQL sem explicação", "Contexto, opções, decisão, trade-offs e evidência com números medidos por você"],
        c: [3],
        x: "A página de decisões serve para justificar escolhas. Contexto, alternativas, trade-offs e evidência mensurável mostram raciocínio e permitem que outra pessoa reproduza e discorde. Afirmar que algo é a melhor técnica sem prova é opinião. Listar tecnologias mostra o que foi usado, não por que. SQL sem explicação deixa o leitor sem o raciocínio. A medida da aula 9 é a evidência que sustenta a decisão."
      },
      {
        id: "a10q3", s: 1, t: "d10",
        e: "Você pretende prestar a certificação Data Engineer Associate e quer saber custo e validade. De onde essas informações devem vir e o que a página oficial mostra hoje?",
        o: ["De um blog de terceiros, que costuma ser mais atualizado", "Da página oficial da certificação: 45 questões, 90 minutos, USD 200 e validade de 2 anos; confirmar antes de se inscrever", "De um grupo de mensagens, que garante o valor fixo para sempre", "Da Free Edition, que inclui a prova sem custo"],
        c: [1],
        x: "Fatos de custo, duração e validade mudam e devem ser lidos da página oficial no momento da decisão. A página mostra 45 questões de múltipla escolha, 90 minutos, USD 200 e validade de 2 anos. Blogs de terceiros e grupos podem ficar desatualizados. A Free Edition é um ambiente gratuito de aprendizagem e a página não diz que inclui a prova. Em nenhum caso o valor é garantido para sempre."
      },
      {
        id: "a10q4", s: 1, t: "d10",
        e: "Antes de tornar o repositório databricks-lakehouse-portfolio público, você descobre que um token de acesso foi commitado três commits atrás e depois apagado do arquivo. O que a documentação do GitHub orienta como primeiro passo?",
        o: ["Apagar o arquivo e fazer um novo commit, o que remove o token do histórico", "Rotacionar (revogar e trocar) a credencial imediatamente", "Esperar o secret scanning avisar antes de fazer qualquer coisa", "Tornar o repositório privado e considerar o assunto encerrado"],
        c: [1],
        x: "O secret scanning examina todo o histórico de todas as branches, então um token apagado em commit posterior continua visível nos commits antigos. A doc orienta rotacionar a credencial imediatamente; remover do histórico é opcional, trabalhoso e muitas vezes desnecessário depois da revogação. Novo commit não apaga histórico. Esperar o aviso deixa a credencial exposta. Tornar privado não revoga um segredo que já pode ter sido copiado."
      },
      {
        id: "a10q5", s: 1, t: "d10",
        e: "Na entrevista, perguntam sobre o desempenho do seu projeto. Sua medição mostrou ganho quase nulo, pois a tabela tinha poucos dados. Qual resposta é mais honesta e mais forte? (Escolha duas)",
        o: ["Informar o número medido e explicar que a tabela era pequena", "Dizer que o ganho foi grande, pois tabelas assim sempre ganham", "Explicar que testaria com mais dados e que o ganho de data skipping tende a crescer com o volume", "Evitar falar do número e mudar de assunto", "Afirmar que o projeto roda em produção com milhões de usuários"],
        c: [0, 2],
        x: "Credibilidade vem de números verdadeiros e de entender os limites do experimento: dizer o resultado real, a causa provável (tabela pequena) e como testaria de novo mostra raciocínio. Inventar ganho ou escala é desonesto e fácil de desmascarar com perguntas de detalhe. Fugir do assunto sugere que não há medida. A Free Edition é um ambiente de aprendizagem de uso não comercial, então alegar produção com milhões de usuários não corresponde ao projeto."
      },
      {
        id: "a10q6", s: 1, t: "d10",
        e: "Você quer automatizar o fluxo bronze, silver e gold do projeto, com cada etapa dependendo da anterior e execução por horário. Qual recurso da Databricks descrito na documentação faz esse papel?",
        o: ["Lakeflow Jobs: um job com tarefas e dependências e gatilho por horário ou evento", "Um SQL warehouse 2X-Small, que agenda sozinho todos os notebooks", "O Query Profile, que dispara consultas em sequência", "O comando OPTIMIZE, que encadeia tabelas"],
        c: [0],
        x: "A documentação descreve Lakeflow Jobs como o recurso de orquestração: um job reúne tarefas (notebook, pipeline, script Python) com dependências formando um grafo acíclico, e gatilhos por horário ou por evento. Um SQL warehouse executa consultas, não orquestra fluxos. O Query Profile só mostra detalhes de execução de uma consulta já rodada. OPTIMIZE reorganiza arquivos de uma tabela e não encadeia etapas."
      }
    ],
    lab: {
      t: "Montar o repositório final e conferir segredos no histórico do git",
      custo: "gratuito (Git local e arquivos de texto; GitHub em repositório público, conforme a doc de secret scanning).",
      tempo: "45 a 60 min",
      porque: "O repositório é a evidência pública das aulas 1 a 9: o que você construiu, como reproduzir e quanto custou. Revisar segredos antes de publicar evita um vazamento real.",
      antes: "Você precisa de Git instalado, uma conta no GitHub e os arquivos produzidos nas aulas anteriores (notebooks ou SQL, prints, tabela de resultados da aula 9). Os passos foram conferidos contra a documentação oficial e NÃO foram executados. Na tela do GitHub, a aba Security mostra os alertas de secret scanning (em repositórios públicos ele roda sozinho). Atenção: nunca coloque tokens, senhas, e-mails ou dados pessoais em nenhum arquivo.",
      passos: [
        {
          t: "Criar a estrutura de pastas",
          cmd: cod("text", [
            "databricks-lakehouse-portfolio/",
            "  README.md",
            "  docs/",
            "    architecture.png",
            "    decisions.md",
            "    results.md",
            "  sql/ (ou notebooks/)",
            "  .gitignore"
          ]),
          p: "No .gitignore liste arquivos de credenciais e dados locais (por exemplo .env e pastas de dados baixados). Exporte seus notebooks como arquivos de código ou SQL."
        },
        {
          t: "Escrever o README em inglês",
          p: "Seções: summary in one sentence, Architecture (imagem do diagrama), Data source, How to run, Results (cole a tabela antes e depois da aula 9), Cost (Free Edition, cota de uso), Limitations, Next steps. Seja específico e curto."
        },
        {
          t: "Escrever docs/decisions.md",
          p: "Uma seção por decisão, no molde Context, Options considered, Decision, Trade-offs, Evidence. Escreva no mínimo três decisões: clustering em vez de partição, serverless por restrição da Free Edition, dataset pequeno por causa da cota."
        },
        {
          t: "Conferir segredos no histórico",
          cmd: cod("bash", [
            "git log --all -p | grep -inE \"token|secret|password|api[_-]?key\"",
            "git status --short"
          ]),
          p: "A primeira linha varre todo o histórico em busca de palavras suspeitas (checagem simples, não exaustiva). A segunda mostra arquivos pendentes para você garantir que nada sensível entre no próximo commit."
        },
        {
          t: "Publicar e olhar a aba Security",
          cmd: cod("bash", [
            "git add .",
            "git commit -m \"Add final lakehouse portfolio\"",
            "git push"
          ]),
          p: "Depois do push em repositório público, abra a aba Security no GitHub e veja se há alertas de secret scanning. Se houver, rotacione a credencial imediatamente."
        }
      ],
      verificar: "O repositório abre com README em inglês, diagrama, tabela de resultados e decisions.md; a busca no histórico não mostra credenciais reais; a aba Security não mostra alertas.",
      limpar: [
        "Se achou segredo: revogue e troque a credencial antes de qualquer outra coisa.",
        "Remova prints que exibam e-mail, nome de usuário ou IDs do workspace.",
        "Nunca commite tokens, senhas ou dados pessoais; guarde-os fora do repositório."
      ],
      erros: [
        { s: "O grep encontra a palavra 'token' em código legítimo", c: "A busca é por texto e gera falsos positivos.", r: "Leia cada ocorrência; só é problema se houver um valor real de credencial." },
        { s: "Alerta de secret scanning após o push", c: "Uma credencial real foi commitada em algum ponto do histórico.", r: "Rotacione a credencial imediatamente; remover do histórico é opcional segundo a doc." },
        { s: "git push rejeitado por falta de remoto", c: "O repositório local não está ligado ao GitHub.", r: "Crie o repositório no GitHub, adicione o remote conforme a tela de criação mostra e repita o push." }
      ]
    }
  };

  /* ============================== AULA 11 ============================== */
  C.dias[11] = {
    aula: {
      titulo: "Snowflake: arquitetura, edições, créditos e o teste grátis",
      resumo: "Entenda as três camadas do Snowflake, micro-partições, edições, o modelo de créditos, tamanhos de warehouse e o teste grátis de 30 dias, e planeje quando abri-lo para não gastar dias à toa. O lab é uma conta de papel, sem abrir a conta.",
      simples: {
        analogia: "Imagine um grande armazém compartilhado com três áreas. Na primeira ficam as prateleiras onde tudo é guardado, bem organizado e sempre no mesmo lugar. Na segunda ficam equipes de trabalhadores que você aluga por hora para buscar e processar mercadorias; cada equipe é independente, e se uma estiver ocupada, a outra não atrasa. Na terceira fica a recepção, que conhece o inventário, confere crachás e distribui pedidos. Você paga o aluguel das equipes pelo tempo em que trabalham. Se esquecer a equipe parada, o relógio continua correndo, por isso há o hábito de mandá-la para casa quando ninguém está pedindo nada.",
        pontos: [
          "Três camadas: armazenamento, computação (warehouses) e serviços de nuvem.",
          "Warehouses são independentes, então cargas não competem entre si.",
          "Compute é cobrado em créditos, por segundo, com mínimo de 60 segundos ao iniciar.",
          "Cada tamanho de warehouse dobra os créditos por hora.",
          "O teste grátis dura até 30 dias ou até acabar o saldo; estude teoria antes."
        ],
        paraQueServe: "Entender créditos e warehouses permite planejar o uso do teste grátis sem desperdício e explicar custo em entrevista com precisão."
      },
      glossario: [
        { t: "Virtual warehouse", d: "Cluster de recursos de computação que executa consultas e cargas; cada um é independente dos demais." },
        { t: "Cloud services", d: "Camada que coordena a plataforma: autenticação, controle de acesso, metadados, otimização de consultas e infraestrutura." },
        { t: "Micro-partição", d: "Unidade de armazenamento automática de tabela Snowflake, com 50 a 500 MB de dados não comprimidos e metadados por coluna." },
        { t: "Crédito", d: "Unidade de consumo de compute no Snowflake; o custo é créditos consumidos multiplicados pelo preço do crédito." },
        { t: "Auto-suspend", d: "Configuração que suspende o warehouse após um período de inatividade para parar o consumo de créditos." },
        { t: "Edição", d: "Nível de recursos da conta: Standard, Enterprise, Business Critical e Virtual Private Snowflake." },
        { t: "Secure Data Sharing", d: "Compartilhamento de objetos entre contas sem copiar dados; o consumidor consulta os dados do provedor em modo leitura." },
        { t: "Resource monitor", d: "Objeto que acompanha créditos de warehouses e pode notificar ou suspender warehouses ao atingir limites." }
      ],
      blocos: [
        {
          t: "As três camadas",
          facil: "Traduzindo: guardar, computar e coordenar são três serviços separados, por isso é possível ligar e desligar computação sem mexer nos dados.",
          p: [
            "A doc descreve três camadas. Armazenamento: guarda dados estruturados, semiestruturados e não estruturados; tabelas ficam em formato colunar comprimido em armazenamento de nuvem. Computação: virtual warehouses são clusters que executam SQL e código em linguagens como Java, Python e Scala, e cada warehouse é independente, então um não afeta o desempenho do outro. Serviços de nuvem: coordenam a plataforma, da autenticação ao despacho de consultas, com segurança, metadados, parsing e otimização.",
            "Como computação e armazenamento são separados, você cria um warehouse pequeno para estudar e o suspende quando termina, sem alterar os dados."
          ],
          fonte: ["Key concepts and architecture (Snowflake)", "https://docs.snowflake.com/en/user-guide/intro-key-concepts"]
        },
        {
          t: "Micro-partições",
          facil: "Traduzindo: o Snowflake divide cada tabela em pedaços automáticos com etiquetas de valores, e pula os pedaços que não interessam.",
          p: [
            "Cada micro-partição guarda entre 50 MB e 500 MB de dados não comprimidos (armazenados comprimidos). As colunas são guardadas separadamente, então uma consulta lê só as colunas que cita. Para cada micro-partição, o Snowflake registra faixa de valores e contagem de valores distintos por coluna, e usa isso para pular partições que não podem satisfazer o filtro (poda).",
            "Tudo é automático: você não define nem mantém partições. A divisão segue a ordem em que os dados são inseridos ou carregados. Compare com a aula 9: lá o layout é escolha sua; aqui o Snowflake cuida do particionamento básico."
          ],
          dica: "Predicados com subconsultas não fazem poda, segundo a doc; prefira filtros simples nas colunas mais usadas quando quiser que o Snowflake pule micro-partições.",
          fonte: ["Micro-partitions and data clustering (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions"]
        },
        {
          t: "Edições",
          facil: "Traduzindo: a edição define os recursos que sua conta tem. Para estudar, importa saber o que muda, não decorar tudo.",
          p: [
            "Standard é a edição de entrada, com Time Travel limitado a 1 dia e sem multi-cluster warehouses, views materializadas e segurança por linha e coluna. Enterprise adiciona Time Travel de até 90 dias, multi-cluster warehouses, query acceleration, search optimization, views materializadas e segurança por linha e coluna. Business Critical adiciona proteção para dados sensíveis (como PHI sob HIPAA), chaves gerenciadas pelo cliente, conectividade privada e failover. Virtual Private Snowflake roda em ambiente totalmente separado.",
            "No teste grátis você escolhe a edição ao se cadastrar, e a página de edições diz que a edição influencia o custo unitário dos créditos e do armazenamento."
          ],
          fonte: ["Snowflake editions", "https://docs.snowflake.com/en/user-guide/intro-editions"]
        },
        {
          t: "Créditos e o modelo de consumo",
          facil: "Traduzindo: você paga por créditos de computação, mais armazenamento e transferência. O warehouse parado não deveria gastar.",
          p: [
            "O custo total é a soma de compute, armazenamento e transferência de dados. Compute é créditos consumidos vezes preço por crédito, e três recursos consomem créditos: warehouses (cobrança por segundo, mínimo de 60 segundos a cada início), compute serverless (recursos gerenciados pelo Snowflake, como Snowpipe e Search Optimization) e cloud services (cobrado só quando o uso diário passa de 10% do uso diário de warehouses).",
            "Armazenamento é cobrado por terabyte ao mês pela média diária de bytes em disco. Entrada de dados é gratuita; saída para outra região ou nuvem tem custo."
          ],
          armadilha: "Não confunda crédito com dinheiro: a conversão depende do preço por crédito do contrato. No teste grátis, o que importa é o saldo em créditos mostrado no Snowsight e o prazo, então acompanhe os dois a cada sessão.",
          fonte: ["Understanding overall cost (Snowflake)", "https://docs.snowflake.com/en/user-guide/cost-understanding-overall"]
        },
        {
          t: "Tamanhos de warehouse e créditos por hora",
          facil: "Traduzindo: cada tamanho acima dobra o gasto por hora. X-Small custa 1 crédito por hora.",
          p: [
            "A tabela oficial de warehouses padrão (Gen1) mostra os créditos por hora:",
            "X-Small 1, Small 2, Medium 4, Large 8, X-Large 16, 2X-Large 32, 3X-Large 64, 4X-Large 128, 5X-Large 256 e 6X-Large 512. Cada tamanho acima dobra a taxa.",
            "Auto-suspend e auto-resume vêm habilitados por padrão. Cobra-se por segundo, com mínimo de 60 segundos cada vez que o warehouse inicia; a doc dá o exemplo de uma execução de 0 a 60 segundos em X-Small consumindo cerca de 0,017 crédito."
          ],
          dica: "Para estudar, X-Small basta. Subir para Small dobra o gasto por hora e raramente é necessário com dados de amostra.",
          fonte: ["Overview of warehouses (Snowflake)", "https://docs.snowflake.com/en/user-guide/warehouses-overview"]
        },
        {
          t: "O teste grátis: o que a doc mostra",
          facil: "Traduzindo: o teste dura até 30 dias ou até acabar o saldo, o que vier primeiro. Não pede cartão para começar.",
          p: [
            "A página de contas de teste diz: o teste continua por 30 dias a partir do cadastro ou até o saldo gratuito acabar, o que ocorrer primeiro. Você escolhe edição, nuvem e região no cadastro. Não é preciso cartão de crédito, e recursos de IA ficam desabilitados por padrão até adicionar um cartão (adicionar não encerra nem converte o teste). Indisponíveis no teste: acesso externo à rede, hybrid tables, conectividade privada de saída, Snowflake Openflow e Duo para MFA.",
            "Ao terminar o prazo ou o saldo, a conta é suspensa: você ainda entra, mas não executa warehouses, nem carrega ou consulta dados. O saldo restante aparece para o ACCOUNTADMIN no menu lateral do Snowsight. A página que li NÃO informa o número de créditos do teste: confira o valor atual na página oficial de cadastro."
          ],
          armadilha: "Abrir a conta cedo demais queima dias do relógio de 30 dias enquanto você ainda está só lendo teoria.",
          fonte: ["Trial accounts (Snowflake)", "https://docs.snowflake.com/en/user-guide/admin-trial-account"]
        },
        {
          t: "Compartilhamento de dados",
          facil: "Traduzindo: em vez de copiar dados para outra conta, o provedor deixa a outra conta consultá-los no lugar onde estão.",
          p: [
            "No Secure Data Sharing, o provedor compartilha objetos selecionados (tabelas, views, UDFs) com outras contas, e a doc afirma que nenhum dado é copiado ou transferido entre contas. O consumidor cria um banco somente leitura a partir do share e consulta com o controle de acesso normal. O consumidor paga só o compute de suas consultas; o provedor continua pagando o armazenamento.",
            "Compartilhamento direto vale dentro de uma mesma região; entre regiões ou nuvens usa-se um listing. Cada conta leitora pertence à conta provedora que a criou, e o provedor a possui e paga por ela."
          ],
          fonte: ["About Secure Data Sharing (Snowflake)", "https://docs.snowflake.com/en/user-guide/data-sharing-intro"]
        },
        {
          t: "Controle de gasto com resource monitor",
          facil: "Traduzindo: um resource monitor é um alarme de créditos que também pode desligar o warehouse.",
          p: [
            "Um resource monitor acompanha créditos de warehouses e dos serviços de nuvem que os apoiam e pode enviar alertas ou suspender warehouses ao atingir limites (notify, suspend e suspend immediate). Apenas o ACCOUNTADMIN cria monitores. Exemplo da doc, com cota de 1000 créditos:",
            cod("sql", [
              "USE ROLE ACCOUNTADMIN;",
              "CREATE OR REPLACE RESOURCE MONITOR limit1 WITH CREDIT_QUOTA=1000",
              "  TRIGGERS ON 100 PERCENT DO SUSPEND;",
              "ALTER WAREHOUSE wh1 SET RESOURCE_MONITOR = limit1;"
            ]),
            "No seu teste, troque 1000 por uma fração do saldo real mostrado no Snowsight. Confirme na página oficial se o recurso está disponível na sua conta de teste."
          ],
          fonte: ["Resource monitors (Snowflake)", "https://docs.snowflake.com/en/user-guide/resource-monitors"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: a conta de papel",
        texto: "Suponha, só para este exemplo e sem ser o valor real, que o saldo do teste seja de 100 créditos. Um warehouse X-Small consome 1 crédito por hora, então caberiam 100 horas de warehouse ligado. Mas você não vai deixá-lo ligado: com auto-suspend de 60 segundos, cada consulta curta paga o mínimo de 60 segundos, cerca de 0,017 crédito. Dez mil execuções mínimas seriam 170 créditos, bem acima do saldo hipotético, então o limite real é o número de inícios e o tempo ativo, não só as horas. Por isso o roteiro de uso agrupa as consultas em sessões, usa auto-suspend curto e evita deixar warehouse ligado. Troque o saldo hipotético pelo valor real quando abrir a conta."
      },
      prova: [
        "Entrevista: 'Como o Snowflake separa armazenamento e computação e que vantagem isso traz?' Resposta: warehouses independentes, escala e suspensão sem mexer nos dados.",
        "Trabalho: estimar custo de uma carga com créditos por hora do tamanho do warehouse vezes horas ativas, lembrando o mínimo de 60 segundos por início.",
        "Entrevista: explicar o que são micro-partições e como a poda por metadados evita ler dados desnecessários."
      ],
      explique: "Explique com suas palavras como um warehouse X-Small consome créditos e por que o auto-suspend importa para quem está usando um teste grátis.",
      checagem: [
        "Quais são as três camadas do Snowflake e o que cada uma faz?",
        "Quantos créditos por hora consome um warehouse Small e como isso se compara ao X-Small?",
        "O que acontece com a conta quando os 30 dias do teste ou o saldo terminam?"
      ]
    },
    fontes: [
      ["Key concepts and architecture (Snowflake)", "https://docs.snowflake.com/en/user-guide/intro-key-concepts"],
      ["Snowflake editions", "https://docs.snowflake.com/en/user-guide/intro-editions"],
      ["Overview of warehouses (Snowflake)", "https://docs.snowflake.com/en/user-guide/warehouses-overview"],
      ["Trial accounts (Snowflake)", "https://docs.snowflake.com/en/user-guide/admin-trial-account"],
      ["Understanding overall cost (Snowflake)", "https://docs.snowflake.com/en/user-guide/cost-understanding-overall"],
      ["Micro-partitions and data clustering (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions"],
      ["About Secure Data Sharing (Snowflake)", "https://docs.snowflake.com/en/user-guide/data-sharing-intro"],
      ["Resource monitors (Snowflake)", "https://docs.snowflake.com/en/user-guide/resource-monitors"]
    ],
    cartoes: [
      { id: "a11c1", f: "Quais as três camadas do Snowflake?", v: "Armazenamento de banco de dados, computação (virtual warehouses) e serviços de nuvem (coordenação, segurança, metadados).", t: "s1" },
      { id: "a11c2", f: "O que é um virtual warehouse?", v: "Cluster de computação que executa SQL e código; cada warehouse é independente e não afeta o desempenho de outro.", t: "s1" },
      { id: "a11c3", f: "Tamanho de uma micro-partição?", v: "Entre 50 MB e 500 MB de dados não comprimidos; criadas automaticamente, com metadados por coluna para poda.", t: "s1" },
      { id: "a11c4", f: "Quantos créditos por hora tem X-Small, Small e Medium?", v: "X-Small 1, Small 2 e Medium 4 créditos por hora; cada tamanho acima dobra a taxa.", t: "s1" },
      { id: "a11c5", f: "Como o warehouse é cobrado?", v: "Por segundo, com mínimo de 60 segundos cada vez que inicia; X-Small por 0 a 60 segundos usa cerca de 0,017 crédito.", t: "s1" },
      { id: "a11c6", f: "Quanto dura o teste grátis, segundo a doc?", v: "30 dias a partir do cadastro ou até o saldo acabar, o que vier primeiro; sem cartão para começar.", t: "s1" },
      { id: "a11c7", f: "O que acontece quando o teste termina?", v: "A conta é suspensa: dá para entrar, mas não executar warehouses, carregar ou consultar; saldo não usado expira.", t: "s1" },
      { id: "a11c8", f: "Quais edições existem?", v: "Standard, Enterprise, Business Critical e Virtual Private Snowflake; Time Travel e multi-cluster variam por edição.", t: "s1" },
      { id: "a11c9", f: "Secure Data Sharing copia dados?", v: "Não. O provedor mantém os dados e o consumidor consulta em modo leitura; só o consumidor paga o compute das consultas.", t: "s1" },
      { id: "a11c10", f: "Quando abrir o teste grátis?", v: "Só depois de estudar a teoria e com roteiro pronto: abrir na aula 12 evita gastar dias do relógio de 30 dias.", t: "s1" }
    ],
    questoes: [
      {
        id: "a11q1", s: 2, t: "s1",
        e: "Sua equipe roda um relatório pesado de manhã e consultas ad hoc o dia todo, e as consultas ad hoc ficavam lentas durante o relatório. Que característica da arquitetura do Snowflake ajuda a resolver isso, segundo a documentação?",
        o: ["O armazenamento fica dentro de cada warehouse e precisa ser copiado", "A camada de serviços de nuvem limita o número de consultas por conta", "Cada virtual warehouse é independente, então se pode usar um warehouse separado por carga", "O Snowflake só permite um warehouse por conta"],
        c: [2],
        x: "A doc de arquitetura afirma que cada virtual warehouse é independente e que um não afeta o desempenho de outro. Assim, relatório e consultas ad hoc podem usar warehouses diferentes sobre os mesmos dados. O armazenamento é uma camada separada, não fica dentro de cada warehouse. A camada de serviços de nuvem coordena a plataforma e não impõe esse tipo de limite. Contas podem ter vários warehouses; a afirmação de um só está incorreta."
      },
      {
        id: "a11q2", s: 2, t: "s1",
        e: "Você vai estimar o gasto de uma sessão de estudo com um warehouse Large ligado por 3 horas, e depois comparar com um X-Small pelo mesmo tempo. Com a tabela oficial de créditos por hora, quanto cada um consome?",
        o: ["Large 8 por hora, 24 créditos; X-Small 1 por hora, 3 créditos", "Large 4 por hora, 12 créditos; X-Small 1 por hora, 3 créditos", "Large 16 por hora, 48 créditos; X-Small 2 por hora, 6 créditos", "Ambos consomem 1 crédito por hora"],
        c: [0],
        x: "A tabela oficial mostra X-Small com 1 crédito por hora e cada tamanho acima dobrando: Small 2, Medium 4, Large 8. Em 3 horas, Large consome 24 créditos e X-Small 3. A alternativa que atribui 4 créditos ao Large confunde com o Medium. A que atribui 16 ao Large confunde com X-Large e dá 2 ao X-Small, também errado. Dizer que ambos consomem 1 crédito ignora a regra de dobrar a cada tamanho."
      },
      {
        id: "a11q3", s: 2, t: "s1",
        e: "Eloabe acabou de abrir uma conta de teste e ainda não terminou de estudar a teoria. Ela quer 'garantir o saldo' e pergunta quando a conta deve ser aberta. Considerando que o teste dura até 30 dias ou até o saldo acabar, qual é a melhor recomendação?",
        o: ["Abrir já e deixar um warehouse ligado para não esquecer", "Abrir já e pausar o relógio do teste quando não estiver usando", "Estudar a teoria primeiro e abrir a conta no começo do lab prático, com roteiro pronto", "Adicionar um cartão para estender o teste automaticamente"],
        c: [2],
        x: "A página de contas de teste diz que o teste dura 30 dias a partir do cadastro ou até o saldo acabar. Como o relógio corre desde o cadastro, abrir antes de estar pronta desperdiça dias. A melhor prática é estudar antes e abrir com um roteiro. Deixar warehouse ligado consome créditos à toa. Não há opção de pausar o relógio do teste na página lida. Adicionar cartão não estende nem converte o teste, segundo a doc."
      },
      {
        id: "a11q4", s: 2, t: "s1",
        e: "O teste de um colega terminou e ele tenta rodar uma consulta, sem sucesso, mas consegue entrar na conta. Qual descrição corresponde ao que a documentação do teste diz sobre o estado da conta?",
        o: ["A conta foi apagada e é preciso se cadastrar de novo", "A conta é suspensa: ele ainda faz login, mas não pode executar warehouses, carregar dados ou consultar", "A conta vira automaticamente paga e cobra no cartão", "A conta continua igual, mas com warehouses menores"],
        c: [1],
        x: "Segundo a página, quando o prazo ou o saldo acaba a conta é suspensa: o usuário ainda pode entrar, mas não consegue executar warehouses, carregar dados nem consultar; para reativar é preciso adicionar cartão e fazer upgrade, e o saldo gratuito não usado expira. A conta não é apagada, não vira paga sozinha e não muda o tamanho dos warehouses, então as demais descrições não correspondem à documentação."
      },
      {
        id: "a11q5", s: 2, t: "s1",
        e: "Uma empresa quer entregar dados a um parceiro que também tem conta Snowflake, sem duplicar tabelas e com o parceiro apenas lendo. Segundo a documentação, qual opção atende e quem paga o quê? (Escolha duas)",
        o: ["Secure Data Sharing: nada é copiado e o consumidor cria um banco somente leitura", "Exportar CSV semanal e enviar por e-mail", "O consumidor paga o compute de suas consultas, enquanto o provedor segue pagando o armazenamento", "O consumidor paga o armazenamento de todos os dados compartilhados", "O consumidor pode alterar as tabelas compartilhadas se tiver o privilégio"],
        c: [0, 2],
        x: "A doc de Secure Data Sharing diz que nenhum dado é copiado ou transferido; o consumidor cria um banco somente leitura a partir do share, paga apenas o compute das consultas e o provedor continua pagando o armazenamento. Exportar CSV duplica dados e não é o recurso descrito. O consumidor não paga armazenamento dos dados compartilhados. E o banco é somente leitura: consumidores não podem modificar ou apagar objetos compartilhados."
      },
      {
        id: "a11q6", s: 2, t: "s1",
        e: "Você roda uma consulta curta em um warehouse X-Small recém-iniciado e ela termina em 5 segundos, depois o warehouse suspende. Como a documentação diz que isso é cobrado em créditos?",
        o: ["Por 5 segundos exatos, sem mínimo", "Por uma hora inteira, porque cobra por hora cheia", "Por 10 minutos, o valor padrão do auto-suspend", "Por segundo, com mínimo de 60 segundos a cada início, cerca de 0,017 crédito em X-Small"],
        c: [3],
        x: "A página de warehouses informa cobrança por segundo com mínimo de 60 segundos sempre que o warehouse inicia, e dá o exemplo de X-Small de 0 a 60 segundos consumindo cerca de 0,017 crédito. Portanto uma consulta de 5 segundos paga 60. Cobrança sem mínimo, por hora cheia ou pelo tempo de auto-suspend não correspondem ao que a doc afirma; o auto-suspend define quando suspende, não o mínimo cobrado por início."
      }
    ],
    lab: {
      t: "Conta de papel: horas de X-Small no saldo do teste e roteiro de uso (sem abrir a conta)",
      custo: "gratuito (nenhuma conta é aberta e nada é executado).",
      tempo: "30 a 45 min",
      porque: "Planejar antes evita queimar o relógio de 30 dias e o saldo. O roteiro e a conta viram a evidência que abre o repositório snowflake-elt-portfolio.",
      antes: "Você só precisa de papel, planilha ou arquivo de texto e da página oficial de créditos por hora de warehouses aberta. NÃO abra a conta de teste neste lab. Os passos foram conferidos contra a documentação oficial e NÃO foram executados. O número de créditos do teste não consta na página de contas de teste que li: confira o valor atual na página oficial de cadastro e use-o na conta. Nenhum dado sensível é necessário.",
      passos: [
        {
          t: "Anotar a fonte dos números",
          p: "Em um arquivo plan.md escreva a data de hoje, o saldo de créditos do teste conforme a página oficial de cadastro, a duração (a doc de teste diz 30 dias ou até o saldo acabar) e a tabela de créditos por hora (X-Small 1, Small 2, Medium 4, Large 8)."
        },
        {
          t: "Calcular as horas de X-Small",
          cmd: cod("text", [
            "horas_X-Small = saldo_de_creditos / 1",
            "inicios_minimos = saldo_de_creditos / 0.017   (cada inicio custa no minimo 60 s)",
            "Exemplo hipotetico: saldo 100 -> 100 horas ligado, ou ~5.880 inicios minimos"
          ]),
          p: "Use o seu saldo real. O resultado diz que o limite não é o calendário de 30 dias, e sim quanto tempo o warehouse fica ligado e quantas vezes inicia."
        },
        {
          t: "Montar o roteiro por aula com limites",
          cmd: cod("text", [
            "Aula 12: criar warehouse X-Small, AUTO_SUSPEND = 60, consultar amostras, VARIANT e FLATTEN",
            "Aulas seguintes: carga de dados, transformacoes e ELT do projeto",
            "Reserva: pelo menos 20% do saldo sem uso para erros e refazer"
          ]),
          p: "Para cada aula, estime horas ativas e subtraia do saldo. Todas as sessões usam X-Small, auto-suspend curto e um resource monitor opcional com cota abaixo do saldo."
        },
        {
          t: "Escrever a regra de ouro do teste",
          p: "Regras: abrir a conta só no dia do lab da aula 12; nunca deixar warehouse ligado; conferir o saldo no Snowsight (menu lateral, como ACCOUNTADMIN) ao fim de cada sessão; se o saldo cair mais rápido que o previsto, parar e revisar."
        }
      ],
      verificar: "plan.md contém o saldo (com data da consulta), a conta de horas e de inícios mínimos, o roteiro por aula com tamanho X-Small, auto-suspend curto e reserva de 20%.",
      limpar: [
        "Guarde plan.md no repositório snowflake-elt-portfolio (pasta docs/).",
        "Não registre senhas, links de convite nem e-mail pessoal no arquivo.",
        "Nada para desligar: nenhuma conta foi aberta."
      ],
      erros: [
        { s: "Não acho o número de créditos do teste", c: "A página de contas de teste não informa o valor.", r: "Consulte a página oficial de cadastro do teste e anote a data da consulta." },
        { s: "A conta dá um número absurdo de horas", c: "Considerou warehouse sempre ligado e ignorou o mínimo de 60 segundos por início.", r: "Calcule também os inícios mínimos e planeje sessões agrupadas." },
        { s: "Dúvida sobre o tamanho certo", c: "Tendência de escolher um warehouse maior 'por garantia'.", r: "Use X-Small: cada tamanho acima dobra os créditos por hora; só suba se a medição mostrar necessidade." }
      ]
    }
  };

  /* ============================== AULA 12 ============================== */
  C.dias[12] = {
    aula: {
      titulo: "Objetos e SQL: bancos, stages, formatos e dados semiestruturados",
      resumo: "A hierarquia de objetos do Snowflake, tipos de tabela, stages internos e externos, formatos de arquivo, VARIANT, OBJECT, ARRAY e FLATTEN, e dados de amostra; no lab você abre o teste, cria um warehouse X-Small e consulta um JSON em VARIANT.",
      simples: {
        analogia: "Pense em um escritório com um prédio, andares e armários. O prédio é a conta, cada andar é um banco de dados, e dentro de cada andar há salas, os schemas, com armários que são as tabelas. Existem armários permanentes, armários de rascunho que somem quando você sai da sala e armários sem cópia de segurança. Antes de guardar um documento no armário, ele pode ficar numa mesa de entrada, o stage, de onde é conferido e arquivado. Alguns documentos chegam como envelopes com cartas dentro de cartas; é para isso que existe um campo que aceita qualquer formato e uma ferramenta que abre cada envelope em linhas separadas.",
        pontos: [
          "Hierarquia: conta, database, schema, objetos.",
          "Tabelas: permanente, temporária, transiente e externa, cada uma com sua proteção.",
          "Stage é o lugar de onde arquivos são carregados, interno ou externo.",
          "VARIANT guarda JSON; a notação com dois-pontos acessa os campos.",
          "FLATTEN transforma arrays em linhas."
        ],
        paraQueServe: "É a base de qualquer ELT no Snowflake: organizar objetos, carregar arquivos e consultar JSON sem esquema rígido."
      },
      glossario: [
        { t: "Database e schema", d: "Um database pertence a uma conta e um schema pertence a um database; juntos formam o namespace dos objetos." },
        { t: "Stage", d: "Local de arquivos para carga e descarga: interno (usuário, tabela ou nomeado) ou externo (S3, GCS, Azure)." },
        { t: "File format", d: "Objeto que descreve como ler arquivos: CSV, JSON, AVRO, ORC, PARQUET ou XML, com opções." },
        { t: "VARIANT", d: "Tipo que guarda valor de qualquer outro tipo, inclusive OBJECT e ARRAY; usado para JSON e outros dados semiestruturados." },
        { t: "OBJECT e ARRAY", d: "OBJECT é um conjunto de pares chave-valor, como um objeto JSON; ARRAY é uma lista ordenada acessada por índice a partir de zero." },
        { t: "FLATTEN", d: "Função de tabela que converte VARIANT, OBJECT ou ARRAY em linhas, com colunas como KEY, INDEX e VALUE." },
        { t: "Tabela transiente", d: "Tabela que persiste até ser apagada, mas sem período de Fail-safe." },
        { t: "SNOWFLAKE_SAMPLE_DATA", d: "Banco compartilhado somente leitura com dados de amostra, como o schema tpch_sf1." }
      ],
      blocos: [
        {
          t: "Hierarquia de objetos",
          facil: "Traduzindo: conta contém bancos; banco contém schemas; schema contém tabelas e outros objetos.",
          p: [
            "Cada database pertence a uma única conta, cada schema pertence a exatamente um database, e um schema agrupa objetos como tabelas e views. Database e schema juntos formam um namespace; se a sessão não tem database e schema em uso, os nomes precisam ser qualificados (banco.schema.objeto).",
            "Os comandos relevantes são CREATE DATABASE, CREATE SCHEMA, USE DATABASE e USE SCHEMA. A página lista esses comandos sem mostrar a sintaxe completa; veja as páginas de referência de cada um."
          ],
          dica: "Organize o projeto em um database por projeto e schemas por camada (por exemplo raw e staging), e qualifique os nomes nos scripts do repositório para que rodem em qualquer sessão.",
          fonte: ["Database, schema, and share DDL (Snowflake)", "https://docs.snowflake.com/en/sql-reference/ddl-database"]
        },
        {
          t: "Tipos de tabela",
          facil: "Traduzindo: o tipo da tabela define quanto tempo ela vive e que proteção de recuperação tem.",
          p: [
            "Se você omitir a palavra-chave, a tabela é permanente. Só se usa um tipo por comando.",
            cod("sql", [
              "CREATE TEMPORARY TABLE demo_temporary (i INTEGER);",
              "CREATE TRANSIENT TABLE demo_transient (i INTEGER);"
            ]),
            "Temporária existe só na sessão e é apagada ao fim dela. Transiente persiste até ser apagada, com proteção de dados menor que a permanente. Time Travel: 0 ou 1 dia (padrão 1) para temporária e transiente; permanente tem 0 ou 1 na Standard e 0 a 90 em Enterprise ou superior. Fail-safe: 0 dias para temporária e transiente, 7 para permanente. Depois de criadas, tabelas temporárias e transientes não podem ser convertidas para outro tipo."
          ],
          dica: "Para staging de estudo, tabelas transientes custam menos em proteção; para dados finais do projeto, use permanentes.",
          fonte: ["Temporary and transient tables (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-temp-transient"]
        },
        {
          t: "Tabelas externas",
          facil: "Traduzindo: uma tabela externa lê arquivos que ficam fora do Snowflake, só para consulta.",
          p: [
            "Uma tabela externa permite consultar dados em um stage externo como se fossem uma tabela. É somente leitura: não aceita DML, mas pode ser consultada, usada em joins e em views. Tem a coluna VALUE (VARIANT, uma linha do arquivo) e a pseudocoluna METADATA$FILENAME (nome do arquivo no stage).",
            "A doc recomenda considerar tabelas Apache Iceberg para melhor desempenho com Parquet, e para arquivos Delta Lake avisa que o recurso está previsto para depreciação. Para o projeto de portfólio, prefira tabelas comuns carregadas por COPY INTO."
          ],
          dica: "Ao recriar um file format com CREATE OR REPLACE, a ligação com tabelas externas que o usam se perde e elas precisam ser recriadas, segundo a doc de file format.",
          fonte: ["Introduction to external tables (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-external-intro"]
        },
        {
          t: "Stages e formatos de arquivo",
          facil: "Traduzindo: stage é a área de recebimento de arquivos. Formato de arquivo diz ao Snowflake como interpretá-los.",
          p: [
            "Stages externos são armazenamento em nuvem que você gerencia (Amazon S3, Google Cloud Storage, Azure). Os internos são três: de usuário (um por usuário), de tabela (implícito, um por tabela) e nomeado (objeto do schema, criado com CREATE STAGE). Arquivos sobem para stage interno com PUT, que NÃO roda na página de Worksheets: use o Snowflake CLI ou um driver. COPY INTO carrega arquivos de stages em tabelas, usando um warehouse que você especifica.",
            "Formatos com CREATE FILE FORMAT: CSV (padrão), JSON, AVRO, ORC, PARQUET e XML. Exemplo da doc para JSON:",
            cod("sql", [
              "CREATE OR REPLACE FILE FORMAT my_json_format",
              "  TYPE = JSON",
              "  STRIP_OUTER_ARRAY = TRUE;"
            ])
          ],
          fonte: ["CREATE FILE FORMAT (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/create-file-format"]
        },
        {
          t: "VARIANT, OBJECT e ARRAY",
          facil: "Traduzindo: VARIANT é uma caixa que guarda qualquer coisa, inclusive JSON inteiro. OBJECT e ARRAY ficam dentro dela.",
          p: [
            "VARIANT guarda valor de qualquer outro tipo, incluindo OBJECT e ARRAY. OBJECT é um conjunto de pares chave-valor (chaves VARCHAR, valores VARIANT); ARRAY é uma lista ordenada de zero ou mais elementos VARIANT, acessados por índice a partir de zero. O tamanho teórico máximo é de 128 MB, mas a doc diz que o limite prático costuma ser menor.",
            "Dá para carregar JSON sem descrever a estrutura. Para dados regulares com tipos JSON nativos (strings e números), desempenho e armazenamento ficam muito próximos de colunas relacionais; datas e timestamps ficam armazenados como strings, o que pode ser mais lento. PARSE_JSON converte uma string JSON em VARIANT."
          ],
          armadilha: "A doc distingue NULL do SQL (VARIANT ausente) de null do JSON (um valor VARIANT real): confira a diferença antes de filtrar nulos. A opção STRIP_NULL_VALUES = TRUE do formato JSON remove campos e elementos nulos ao carregar (COPY INTO e CREATE FILE FORMAT).",
          fonte: ["Semi-structured data types (Snowflake)", "https://docs.snowflake.com/en/sql-reference/data-types-semistructured"]
        },
        {
          t: "Consultar VARIANT com dois-pontos",
          facil: "Traduzindo: use coluna:campo para entrar no JSON, ponto para descer, colchetes para índice e :: para converter o tipo.",
          p: [
            cod("sql", [
              "SELECT src:dealership FROM car_sales;",
              "SELECT src:salesperson.name FROM car_sales;",
              "SELECT src:customer[0].name, src:vehicle[0].price FROM car_sales;",
              "SELECT src:vehicle[0].price::NUMBER * 0.10 AS tax FROM car_sales;"
            ]),
            "O resultado é VARIANT, então strings aparecem entre aspas duplas; o cast com :: remove as aspas e permite aritmética. O nome da coluna não diferencia maiúsculas, mas os nomes de elementos diferenciam: src:salesperson.name e SRC:salesperson.name são equivalentes, SRC:Salesperson.Name não. Se a chave tiver espaços, use aspas duplas: src:\"company name\"."
          ],
          dica: "Também existe a notação com colchetes: src['salesperson']['name'], em que cada chave vai entre aspas simples. Escolha um estilo e mantenha o mesmo em todo o projeto para o SQL ficar legível.",
          fonte: ["Querying semi-structured data (Snowflake)", "https://docs.snowflake.com/en/user-guide/querying-semistructured"]
        },
        {
          t: "FLATTEN",
          facil: "Traduzindo: FLATTEN pega uma lista dentro do JSON e devolve uma linha por elemento.",
          p: [
            "FLATTEN é uma função de tabela com argumentos INPUT (obrigatório), PATH, OUTER, RECURSIVE e MODE. Devolve colunas SEQ, KEY, PATH, INDEX, VALUE e THIS; as colunas da tabela de origem se repetem em cada linha gerada. Padrão de uso com LATERAL:",
            cod("sql", [
              "SELECT value:name::string AS \"Customer Name\"",
              "FROM car_sales, LATERAL FLATTEN(INPUT => SRC:customer);"
            ]),
            "Com OUTER => TRUE, entradas que não podem ser expandidas geram uma linha com NULL em vez de sumir. RECURSIVE => TRUE expande todos os sub-elementos."
          ],
          dica: "Quando houver arrays dentro de arrays, encadeie vários LATERAL FLATTEN, como a doc mostra com o exemplo de contatos e business, usando PATH para apontar o nível. Teste cada nível em separado antes de juntar tudo.",
          fonte: ["FLATTEN (Snowflake)", "https://docs.snowflake.com/en/sql-reference/functions/flatten"]
        },
        {
          t: "Dados de amostra",
          facil: "Traduzindo: o banco SNOWFLAKE_SAMPLE_DATA tem tabelas de exemplo prontas, somente leitura.",
          p: [
            "A doc diz que contas novas recebem SNOWFLAKE_SAMPLE_DATA por padrão, compartilhado e somente leitura. A página NÃO menciona contas de teste, então confirme no seu Snowsight (Catalog, Explorer) ou com SHOW DATABASES LIKE '%sample%'. Se faltar, o ACCOUNTADMIN pode criá-lo com CREATE DATABASE ... FROM SHARE, conforme a página.",
            cod("sql", [
              "SELECT COUNT(*) FROM snowflake_sample_data.tpch_sf1.lineitem;"
            ]),
            "A página mostra esse resultado como 6001215 linhas. Você precisa de um warehouse em execução na sessão. Por ser somente leitura, não aceita DDL, DML, clone nem Time Travel."
          ],
          fonte: ["Using the sample database (Snowflake)", "https://docs.snowflake.com/en/user-guide/sample-data-using"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: um pedido em JSON",
        texto: "Chega um JSON com um pedido: id, cliente com nome e uma lista de itens, cada um com produto e preço. Você cria uma tabela com uma coluna VARIANT chamada src e insere o JSON com PARSE_JSON. Para o nome do cliente usa src:cliente.nome::STRING, que desce no objeto e converte o tipo. Para ver os itens, usa LATERAL FLATTEN(INPUT => src:itens), que devolve uma linha por item, e então pega value:produto::STRING e value:preco::NUMBER. Sem FLATTEN, a lista inteira vira uma única célula. Com ele, cada item vira linha e pode ser somado, filtrado e juntado com outras tabelas em SQL normal. Cuidado: os nomes dos campos diferenciam maiúsculas e minúsculas."
      },
      prova: [
        "Entrevista: 'Como você consulta JSON no Snowflake?' Resposta: coluna VARIANT, notação com dois-pontos, cast com :: e LATERAL FLATTEN para arrays.",
        "Trabalho: escolher entre tabela permanente, transiente e temporária para camadas de staging, justificando Time Travel e Fail-safe.",
        "Entrevista: diferença entre stage interno e externo e entre tabela externa e tabela carregada com COPY INTO."
      ],
      explique: "Explique com suas palavras como você leria um array dentro de um JSON guardado em VARIANT e por que o cast com dois-pontos duplos é necessário.",
      checagem: [
        "Qual a diferença de proteção entre tabelas permanentes, transientes e temporárias?",
        "O que a coluna VALUE de uma tabela externa guarda e que operações a tabela não permite?",
        "O que muda no resultado de FLATTEN quando OUTER é TRUE e a entrada não pode ser expandida?"
      ]
    },
    fontes: [
      ["Database, schema, and share DDL (Snowflake)", "https://docs.snowflake.com/en/sql-reference/ddl-database"],
      ["Temporary and transient tables (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-temp-transient"],
      ["CREATE TABLE (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/create-table"],
      ["Introduction to external tables (Snowflake)", "https://docs.snowflake.com/en/user-guide/tables-external-intro"],
      ["Overview of data loading (Snowflake)", "https://docs.snowflake.com/en/user-guide/data-load-overview"],
      ["CREATE FILE FORMAT (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/create-file-format"],
      ["PUT (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/put"],
      ["Semi-structured data types (Snowflake)", "https://docs.snowflake.com/en/sql-reference/data-types-semistructured"],
      ["Querying semi-structured data (Snowflake)", "https://docs.snowflake.com/en/user-guide/querying-semistructured"],
      ["FLATTEN (Snowflake)", "https://docs.snowflake.com/en/sql-reference/functions/flatten"],
      ["Using the sample database (Snowflake)", "https://docs.snowflake.com/en/user-guide/sample-data-using"],
      ["CREATE WAREHOUSE (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/create-warehouse"],
      ["ALTER WAREHOUSE (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse"],
      ["COPY INTO <table> (Snowflake)", "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table"]
    ],
    cartoes: [
      { id: "a12c1", f: "Hierarquia de objetos no Snowflake?", v: "Conta contém databases, cada database contém schemas, e o schema agrupa tabelas, views e outros objetos.", t: "s2" },
      { id: "a12c2", f: "Fail-safe por tipo de tabela?", v: "Permanente tem 7 dias; transiente e temporária têm 0.", t: "s2" },
      { id: "a12c3", f: "O que acontece com uma tabela temporária?", v: "Existe só na sessão que a criou e é apagada ao fim dela; dados não são recuperáveis.", t: "s2" },
      { id: "a12c4", f: "Tabela externa permite DML?", v: "Não, é somente leitura; tem coluna VALUE (VARIANT) e pseudocoluna METADATA$FILENAME.", t: "s2" },
      { id: "a12c5", f: "Tipos de stage interno?", v: "Usuário (um por usuário), tabela (implícito) e nomeado (objeto do schema criado com CREATE STAGE).", t: "s2" },
      { id: "a12c6", f: "Formatos de arquivo em CREATE FILE FORMAT?", v: "CSV (padrão), JSON, AVRO, ORC, PARQUET e XML, cada um com opções próprias.", t: "s2" },
      { id: "a12c7", f: "Como acessar campo JSON em VARIANT?", v: "coluna:campo, ponto para níveis, [0] para índice de array e :: para converter o tipo.", t: "s2" },
      { id: "a12c8", f: "Para que serve LATERAL FLATTEN?", v: "Converte um array ou objeto de uma coluna em linhas, uma por elemento, repetindo colunas da tabela de origem.", t: "s2" },
      { id: "a12c9", f: "PUT roda em Worksheets?", v: "Não: use o Snowflake CLI ou um driver; a página do PUT diz que não roda na página de Worksheets.", t: "s2" },
      { id: "a12c10", f: "Como confirmar se há dados de amostra?", v: "SHOW DATABASES LIKE '%sample%' ou Catalog, Explorer, SNOWFLAKE_SAMPLE_DATA; a doc não cita contas de teste.", t: "s2" }
    ],
    questoes: [
      {
        id: "a12q1", s: 2, t: "s2",
        e: "Para uma camada de staging temporária de um pipeline, você quer uma tabela que persista entre sessões mas não precise do período de Fail-safe de 7 dias. Qual tipo de tabela atende, segundo a documentação do Snowflake?",
        o: ["Tabela permanente", "Tabela temporária", "Tabela transiente", "Tabela externa"],
        c: [2],
        x: "A transiente persiste até ser apagada e tem Fail-safe de 0 dias, exatamente o que se pede. A permanente é o padrão e tem 7 dias de Fail-safe. A temporária tem Fail-safe 0, mas existe só na sessão e é apagada quando ela termina, não persiste entre sessões. A externa não guarda dados no Snowflake: lê arquivos de um stage externo em modo somente leitura, não serve como staging gravável."
      },
      {
        id: "a12q2", s: 2, t: "s2",
        e: "Você guarda o JSON de pedidos em uma coluna VARIANT chamada src. Quer o valor de src:cliente.nome sem as aspas duplas, como texto comum, para usar em um filtro. O que fazer?",
        o: ["Usar FLATTEN sobre src:cliente.nome", "Converter com ::STRING, como src:cliente.nome::STRING", "Trocar src por SRC para remover aspas", "Criar uma tabela externa para essa coluna"],
        c: [1],
        x: "A doc explica que o resultado de uma consulta em VARIANT continua VARIANT, por isso strings aparecem entre aspas duplas, e que o cast com :: converte para um tipo SQL e remove as aspas. FLATTEN serve para arrays e objetos, não para extrair um texto. O nome da coluna não diferencia maiúsculas, então trocar src por SRC não muda nada. Tabela externa é outro recurso, para ler arquivos em stage externo, e não resolve as aspas."
      },
      {
        id: "a12q3", s: 2, t: "s2",
        e: "Um JSON tem o campo itens como lista de objetos e você precisa de uma linha por item para somar preços em SQL. Qual construção da documentação faz isso?",
        o: ["SELECT src:itens[0] FROM pedidos", "SELECT ARRAY_SIZE(src:itens) FROM pedidos", "SELECT src:itens::NUMBER FROM pedidos", "SELECT value:preco::NUMBER FROM pedidos, LATERAL FLATTEN(INPUT => src:itens)"],
        c: [3],
        x: "LATERAL FLATTEN converte cada elemento do array em uma linha, e a coluna value permite acessar campos de cada item com a notação de dois-pontos e cast, que é o padrão que a documentação mostra. Usar [0] devolve apenas o primeiro elemento. Medir o tamanho do array dá um número por pedido, não uma linha por item. Converter o array inteiro para NUMBER não é possível, pois a lista não é um número."
      },
      {
        id: "a12q4", s: 2, t: "s2",
        e: "Você tenta rodar PUT file://dados.json @~ na página de Worksheets do Snowsight e recebe erro. Segundo a documentação do PUT, qual é a explicação e uma saída?",
        o: ["O stage de usuário não existe; criar com CREATE STAGE", "O formato JSON não é suportado no PUT", "PUT não pode rodar na página de Worksheets; use o Snowflake CLI ou um driver", "O warehouse está pequeno demais; aumentar para Medium"],
        c: [2],
        x: "A página do PUT afirma que o comando não pode ser executado na página de Worksheets da interface web; é preciso usar o Snowflake CLI ou um driver. O stage de usuário (@~) existe para cada usuário e não precisa ser criado. PUT apenas envia arquivos, não limita o formato JSON. O tamanho do warehouse não tem relação com essa restrição, e aumentar para Medium só gastaria créditos a mais."
      },
      {
        id: "a12q5", s: 2, t: "s2",
        e: "Antes de abrir o lab com dados de amostra, Eloabe quer ter certeza de que SNOWFLAKE_SAMPLE_DATA existe na conta de teste e como consultá-lo. Quais afirmações coincidem com a documentação? (Escolha duas)",
        o: ["A página afirma que o banco existe em todas as contas de teste", "É possível checar com SHOW DATABASES LIKE '%sample%' e consultar com nomes como snowflake_sample_data.tpch_sf1.lineitem", "O banco aceita INSERT e DDL para o usuário adicionar tabelas", "É preciso um warehouse em execução na sessão para consultar", "É necessário criar o banco com CREATE TABLE antes de qualquer consulta"],
        c: [1, 3],
        x: "A doc diz para listar com SHOW DATABASES LIKE '%sample%', mostra consultas com nome totalmente qualificado e informa que um warehouse em execução é necessário. A afirmação de que existe em todas as contas de teste não consta: a página só diz que contas novas o recebem por padrão e não menciona contas de teste. O banco é somente leitura, então INSERT e DDL não são permitidos. E se faltar, ele é criado com CREATE DATABASE FROM SHARE, não com CREATE TABLE."
      },
      {
        id: "a12q6", s: 2, t: "s2",
        e: "Você criou um warehouse para estudar e quer limitar o gasto de créditos criando-o em X-Small e fazendo-o parar sozinho depois de um minuto sem uso. Que comando reflete a sintaxe oficial?",
        o: ["CREATE WAREHOUSE wh_estudo WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 60 AUTO_RESUME = TRUE", "CREATE WAREHOUSE wh_estudo WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 0", "CREATE WAREHOUSE wh_estudo WAREHOUSE_SIZE = LARGE AUTO_SUSPEND = 600", "CREATE WAREHOUSE wh_estudo AUTO_SUSPEND = NULL"],
        c: [0],
        x: "AUTO_SUSPEND recebe segundos de inatividade, então 60 corresponde a um minuto, e AUTO_RESUME = TRUE retoma o warehouse quando uma consulta chega. A segunda opção com AUTO_SUSPEND = 0 significa nunca suspender, e a doc não recomenda isso salvo carga contínua. Large com 600 usa 8 créditos por hora e 10 minutos de espera, o oposto do objetivo. Com AUTO_SUSPEND NULL o warehouse também nunca suspende, e a doc avisa que o processo de suspensão roda cerca de a cada 30 segundos."
      }
    ],
    lab: {
      t: "Abrir o teste, criar warehouse X-Small, consultar amostras e carregar JSON em VARIANT",
      custo: "gratuito dentro do saldo do teste (sem cartão para começar). Este lab consome créditos do teste: X-Small usa 1 crédito por hora ligado, com mínimo de 60 segundos por início. Confira o saldo atual na página oficial e no Snowsight. Passo opcional marcado abaixo.",
      tempo: "30 a 45 min",
      porque: "É a primeira entrega do repositório snowflake-elt-portfolio: warehouse econômico, consulta de amostra e JSON consultado com dois-pontos e FLATTEN, com prints e SQL salvos.",
      antes: "Você precisa do roteiro da aula 11 pronto. Ao abrir a conta de teste pela página oficial, escolha edição, nuvem e região; confira a duração e o saldo mostrados na hora, pois mudam. Os passos foram conferidos contra a documentação oficial e NÃO foram executados. Na tela, o Snowsight tem worksheets de SQL e o menu lateral mostra o saldo do teste para o ACCOUNTADMIN. Nunca coloque senha, e-mail pessoal ou tokens em arquivos do repositório.",
      passos: [
        {
          t: "Abrir a conta e ver o saldo",
          p: "Cadastre-se pela página oficial de teste, entre no Snowsight e anote no plan.md a data de abertura e o saldo exibido no menu lateral. Não adicione cartão."
        },
        {
          t: "Criar o warehouse X-Small com auto-suspend curto",
          cmd: cod("sql", [
            "CREATE WAREHOUSE IF NOT EXISTS wh_estudo",
            "  WAREHOUSE_SIZE = XSMALL",
            "  AUTO_SUSPEND = 60",
            "  AUTO_RESUME = TRUE",
            "  INITIALLY_SUSPENDED = TRUE;",
            "USE WAREHOUSE wh_estudo;"
          ]),
          p: "INITIALLY_SUSPENDED = TRUE cria o warehouse parado; ele inicia quando a primeira consulta chegar."
        },
        {
          t: "Consultar dados de amostra",
          cmd: cod("sql", [
            "SHOW DATABASES LIKE '%sample%';",
            "SELECT COUNT(*) FROM snowflake_sample_data.tpch_sf1.lineitem;"
          ]),
          p: "Se SNOWFLAKE_SAMPLE_DATA não aparecer, a doc de dados de amostra descreve como o ACCOUNTADMIN o cria; confira a página. A contagem esperada pela doc é 6001215."
        },
        {
          t: "Criar banco, schema e tabela com VARIANT",
          cmd: cod("sql", [
            "CREATE DATABASE IF NOT EXISTS portfolio_db;",
            "CREATE SCHEMA IF NOT EXISTS portfolio_db.raw;",
            "USE SCHEMA portfolio_db.raw;",
            "CREATE TABLE pedidos (src VARIANT);",
            "INSERT INTO pedidos (src)",
            "  SELECT PARSE_JSON('{\"id\": 1, \"cliente\": {\"nome\": \"Ana\"}, \"itens\": [{\"produto\": \"caneta\", \"preco\": 3.5}, {\"produto\": \"caderno\", \"preco\": 12}]}');"
          ]),
          p: "O JSON é de exemplo, sem dados reais. PARSE_JSON converte a string em VARIANT."
        },
        {
          t: "Consultar com dois-pontos e FLATTEN",
          cmd: cod("sql", [
            "SELECT src:cliente.nome::STRING AS cliente FROM pedidos;",
            "SELECT src:id::NUMBER AS pedido_id,",
            "       value:produto::STRING AS produto,",
            "       value:preco::NUMBER(10,2) AS preco",
            "FROM pedidos, LATERAL FLATTEN(INPUT => src:itens);"
          ]),
          p: "A segunda consulta deve devolver uma linha por item. Salve o SQL e um print do resultado. OPCIONAL: carregar um arquivo JSON via stage. PUT não roda em Worksheets: suba o arquivo com o Snowflake CLI ou um driver (ou pela interface Snowsight, para stage nomeado), e então rode o COPY INTO abaixo, com o stage e o arquivo que você criou (mantenha o arquivo pequeno)."
        },
        {
          t: "OPCIONAL: COPY INTO de JSON a partir de um stage",
          cmd: cod("sql", [
            "COPY INTO pedidos",
            "  FROM @meu_stage",
            "  FILES = ('pedidos.json')",
            "  FILE_FORMAT = (TYPE = JSON STRIP_OUTER_ARRAY = TRUE);"
          ]),
          p: "Sintaxe conforme a página de COPY INTO: FROM @stage, FILES e FILE_FORMAT = (TYPE = JSON ...). A tabela pedidos tem uma única coluna VARIANT, então cada objeto JSON vira uma linha. STRIP_OUTER_ARRAY = TRUE remove os colchetes externos se o arquivo for uma lista. meu_stage e pedidos.json são nomes de exemplo, e o comando não foi executado."
        }
      ],
      verificar: "O warehouse wh_estudo existe com tamanho X-Small e auto-suspend de 60 segundos, a contagem de amostra apareceu, e a consulta com FLATTEN devolveu duas linhas (caneta e caderno), com nome do cliente sem aspas.",
      limpar: [
        "Suspenda o warehouse com ALTER WAREHOUSE wh_estudo SUSPEND; (sintaxe da doc; a suspensão não aborta consultas em andamento) ou aguarde o auto-suspend. A doc avisa que o processo de suspensão roda cerca de a cada 30 segundos.",
        "Anote o saldo restante no plan.md e commite o SQL e prints no repositório snowflake-elt-portfolio.",
        "Nunca commite senhas, tokens ou dados pessoais; remova e-mail e conta dos prints."
      ],
      erros: [
        { s: "No active warehouse selected in the current session", c: "Nenhum warehouse foi selecionado na sessão.", r: "Rode USE WAREHOUSE wh_estudo; ou escolha o warehouse no seletor do worksheet." },
        { s: "Retorno nulo em src:Cliente.Nome", c: "Nomes de elementos diferenciam maiúsculas e minúsculas.", r: "Use exatamente as maiúsculas do JSON: src:cliente.nome." },
        { s: "Erro de privilégio ao consultar SNOWFLAKE_SAMPLE_DATA", c: "O banco foi criado sem conceder IMPORTED PRIVILEGES ao papel em uso, ou o papel não é o esperado.", r: "Use o papel que a doc indica e, se necessário, o ACCOUNTADMIN para conceder IMPORTED PRIVILEGES conforme a página de dados de amostra." },
        { s: "Saldo caindo mais rápido que o esperado", c: "Warehouse ligado sem auto-suspend ou tamanho maior que X-Small.", r: "Confira AUTO_SUSPEND e o tamanho, suspenda o warehouse e revise o roteiro." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
