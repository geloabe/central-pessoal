(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  C.dias[5] = {
    aula: {
      titulo: "Medallion com pipelines declarativos e expectations",
      resumo: "Como organizar o lakehouse em camadas bronze, silver e gold usando pipelines declarativos do Databricks: streaming tables para ingestão, materialized views para transformação, expectations para qualidade e o event log para ler as métricas.",
      simples: {
        analogia: "Imagine uma cozinha de restaurante. As caixas de legumes chegam do fornecedor sujas e misturadas: ficam guardadas como vieram, caso seja preciso conferir a entrega depois. Na bancada de preparo, alguém lava, descarta o que estragou e corta tudo no mesmo tamanho. Na pista de saída, os pratos já saem montados para o cliente, do jeito que o cardápio pede. Você não explica ao cozinheiro como cada legume deve andar de uma bancada à outra; você escreve a receita de cada etapa e a cozinha descobre a ordem. E existe uma regra afixada: legume podre vai para o lixo, mas o fiscal anota quantos foram descartados. Isso é o medallion com pipeline declarativo e expectations.",
        pontos: [
          "Medallion separa o dado em bronze (cru), silver (validado) e gold (pronto para uso).",
          "No pipeline declarativo você descreve cada tabela e o Databricks resolve ordem e paralelismo.",
          "Streaming table serve para ingestão incremental; materialized view para transformar e agregar.",
          "Expectation é uma regra SQL por registro, com ação de aviso, descarte ou falha.",
          "As métricas de qualidade ficam na aba Data quality e no event log do pipeline."
        ],
        paraQueServe: "Transformar os arquivos ingeridos na aula 4 em tabelas confiáveis, com regras de qualidade registradas e métricas que você consegue mostrar no portfólio."
      },
      glossario: [
        { t: "Medallion", d: "Padrão de desenho de dados em camadas (bronze, silver, gold) que melhora a qualidade a cada etapa; também chamado de arquitetura multi-hop." },
        { t: "Pipeline declarativo", d: "Contêiner de código em que você declara tabelas e views; o Databricks analisa as dependências e decide a ordem de execução." },
        { t: "Streaming table", d: "Tabela gerenciada pelo Unity Catalog que é alvo de streaming; boa para ingestão incremental de dados que só crescem." },
        { t: "Materialized view", d: "Tabela gerenciada pelo Unity Catalog que é alvo de lote; o resultado é recalculado conforme necessário para refletir os dados atuais." },
        { t: "Expectation", d: "Regra de qualidade opcional, escrita como expressão booleana SQL, aplicada a cada registro de uma tabela ou view do pipeline." },
        { t: "Event log", d: "Tabela Delta estruturada com os eventos do pipeline, incluindo as métricas de expectations; consultada com SQL." },
        { t: "Flow", d: "Unidade básica de processamento: lê uma fonte, aplica a lógica e escreve em um destino, com semântica de streaming ou de lote." },
        { t: "Auto Loader", d: "Leitura incremental de arquivos novos em armazenamento, usada no formato cloudFiles; é a base da ingestão da aula 4." }
      ],
      blocos: [
        {
          t: "Medallion: três camadas, uma ideia",
          facil: "Traduzindo: bronze guarda o dado como chegou, silver limpa e valida, gold entrega o que o negócio consome.",
          p: [
            "A documentação descreve o medallion como um padrão que organiza o dado em camadas por qualidade, com o objetivo de formar uma fonte única de verdade. Também aparece como arquitetura multi-hop. Seguir o padrão é recomendado, mas não obrigatório.",
            "Bronze guarda dados crus e não validados, em geral anexados de forma incremental, preservando o histórico para reprocessar e auditar. A validação é mínima. Silver traz dados limpos e validados: deduplicação, tratamento de nulos, conversão de tipos, checagens e junções. Gold traz conjuntos refinados e alinhados ao negócio, muitas vezes agregados, e a doc cita materialized views como exemplo comum."
          ],
          tabela: {
            cab: ["Camada", "O que guarda", "Quem costuma usar"],
            linhas: [
              ["Bronze", "Dado cru, histórico completo, validação mínima", "Engenharia, operações, auditoria"],
              ["Silver", "Dado limpo e validado, ao menos uma versão sem agregação", "Engenharia, análise, ciência de dados"],
              ["Gold", "Dado agregado e pronto para dashboards e relatórios", "Negócio, BI, ML, gestão"]
            ]
          },
          dica: "Na silver, evite gravar direto da ingestão: leia da bronze. Assim você reprocessa sem buscar a fonte de novo.",
          fonte: ["Medallion architecture (Databricks)", "https://docs.databricks.com/aws/en/lakehouse/medallion"]
        },
        {
          t: "O que é um pipeline declarativo (e o nome do produto)",
          facil: "Traduzindo: você escreve o que cada tabela deve conter; quem decide a ordem de execução é o Databricks.",
          p: [
            "Um pipeline é a unidade de desenvolvimento e execução: o contêiner de flows, streaming tables, materialized views e sinks definidos no seu código. Ao rodar, o pipeline analisa as dependências entre os objetos e orquestra ordem e paralelismo sozinho. A doc também diz que ele tenta de novo falhas transitórias em três níveis: tarefa do Spark, flow e pipeline inteiro.",
            "Sobre o nome: a página de entrada da documentação atual se chama Spark Declarative Pipelines on Lakeflow e o texto fala em Lakeflow pipelines, construídos sobre o Apache Spark Declarative Pipelines. A página O que aconteceu com o Delta Live Tables diz que o produto antes chamado Delta Live Tables (DLT) foi atualizado para Lakeflow pipelines e que código DLT existente não precisa de migração. A página de referência Python mostra a equivalência com o antigo módulo dlt, hoje importado como `from pyspark import pipelines as dp`. Se você ler tutoriais com `import dlt`, a doc diz que ainda é possível usá-lo, mas recomenda o módulo pipelines."
          ],
          armadilha: "Prefira `dp`, que a doc recomenda, em vez de `dlt`. Alguns decoradores mudaram de nome (por exemplo, `@dlt.view` virou `@dp.temporary_view`): confira a página de referência se um exemplo antigo falhar.",
          fonte: ["Lakeflow pipelines: conceitos", "https://docs.databricks.com/aws/en/ldp/concepts/"]
        },
        {
          t: "Streaming table ou materialized view?",
          facil: "Traduzindo: o que cresce e chega aos poucos vira streaming table; o que você recalcula e agrega vira materialized view.",
          p: [
            "A streaming table é uma tabela gerenciada pelo Unity Catalog que também é alvo de streaming. A doc diz que cada registro é processado uma vez, assumindo fonte que só recebe anexos. É a escolha para ingestão e processamento incremental de dados que crescem sem parar.",
            "A materialized view é uma tabela gerenciada que é alvo de lote: o resultado é recalculado conforme necessário para refletir os dados atuais. A doc a indica para transformações, agregações e resultados pré-calculados usados por vários datasets. Existe ainda a view comum, avaliada na hora e não persistida, útil para etapas intermediárias e checagens dentro do mesmo pipeline.",
            "Em Python, a regra da página de referência é: função que devolve DataFrame de streaming com `@dp.table` cria streaming table; função que devolve DataFrame de lote com `@dp.materialized_view` cria materialized view."
          ],
          tabela: {
            cab: ["Objeto", "Semântica", "Camada típica"],
            linhas: [
              ["Streaming table", "Streaming, incremental", "Bronze e silver"],
              ["Materialized view", "Lote, recalculada quando preciso", "Silver com junção e gold"],
              ["View", "Calculada na consulta, não persistida", "Etapas intermediárias"]
            ]
          },
          fonte: ["Lakeflow pipelines: conceitos", "https://docs.databricks.com/aws/en/ldp/concepts/"]
        },
        {
          t: "Expectations: warn, drop e fail",
          facil: "Traduzindo: expectation é uma regra por linha; você escolhe se a linha ruim só gera aviso, é descartada ou derruba a atualização.",
          p: [
            "Expectations são cláusulas opcionais em materialized views, streaming tables ou views. Cada uma tem um nome (único por dataset), uma restrição (expressão booleana SQL, sem funções Python, chamadas externas ou subconsultas a outras tabelas) e uma ação.",
            "Por padrão a ação é aviso: o registro inválido é escrito no destino e a violação é contada. Com descarte, o registro inválido é removido e a contagem entra nas métricas. Com falha, o registro inválido impede a atualização de ter sucesso e é preciso intervir antes de reprocessar. Para várias regras de uma vez, o Python tem as variantes `expect_all`, com versões de descarte e falha."
          ],
          tabela: {
            cab: ["Ação", "SQL", "Python"],
            linhas: [
              ["Aviso (padrão)", "EXPECT (condição)", "dp.expect"],
              ["Descarte", "EXPECT (condição) ON VIOLATION DROP ROW", "dp.expect_or_drop"],
              ["Falha", "EXPECT (condição) ON VIOLATION FAIL UPDATE", "dp.expect_or_fail"]
            ]
          },
          armadilha: "Com falha não há métricas gravadas, porque a atualização falha. E só streaming tables, materialized views e views temporárias aceitam expectations.",
          fonte: ["Expectations nos pipelines", "https://docs.databricks.com/aws/en/ldp/expectations"]
        },
        {
          t: "Código Python: bronze, silver e gold",
          facil: "Traduzindo: três funções, cada uma devolvendo um DataFrame; os decoradores dizem o tipo de tabela e as regras de qualidade.",
          p: [
            "O esqueleto abaixo segue a estrutura do tutorial oficial: a bronze lê arquivos com Auto Loader (formato cloudFiles) como streaming; a silver aplica expectations; a gold agrega. Os nomes seguem o lab da aula 4: Volume /Volumes/<catalogo>/estudo/ingestao/chegada/, arquivos JSON com as colunas id, valor e tipo (mais canal a partir do segundo lote). A tabela bronze do pipeline se chama bronze_chegada para não colidir com a bronze_eventos criada na aula 4. Sem cloudFiles.inferColumnTypes o JSON vem como texto, por isso a silver converte valor para double.",
            "```python\nfrom pyspark import pipelines as dp\nfrom pyspark.sql import functions as F\n\n@dp.table\ndef bronze_chegada():\n    return (spark.readStream.format('cloudFiles')\n        .option('cloudFiles.format', 'json')\n        .load('/Volumes/<catalogo>/estudo/ingestao/chegada/'))\n\n@dp.table\n@dp.expect('id_presente', 'id IS NOT NULL')\n@dp.expect_or_drop('valor_valido', 'valor >= 0')\ndef silver_eventos():\n    return (spark.readStream.table('bronze_chegada')\n        .withColumn('valor', F.col('valor').cast('double')))\n\n@dp.materialized_view\ndef gold_valor_por_tipo():\n    return (spark.read.table('silver_eventos')\n        .groupBy('tipo').agg(F.sum('valor').alias('valor_total')))\n```",
            "A doc pede que a função fique limitada ao código que define o dataset e não chame `collect()`, `count()`, `toPandas()`, `save()`, `saveAsTable()` ou `toTable()` dentro dela."
          ],
          dica: "A página de referência Python não explica como nomes simples de tabela são resolvidos. Se `bronze_chegada` não for encontrada, use o nome completo catalogo.schema.tabela.",
          fonte: ["Referência Python dos pipelines", "https://docs.databricks.com/aws/en/ldp/developer/python-ref"]
        },
        {
          t: "A mesma ideia em SQL",
          facil: "Traduzindo: em SQL, cada tabela é um CREATE OR REFRESH, e a regra de qualidade vira uma linha CONSTRAINT.",
          p: [
            "A sintaxe da doc para streaming table é CREATE OR REFRESH STREAMING TABLE, com a cláusula CONSTRAINT nome EXPECT (expressão) e, opcionalmente, ON VIOLATION FAIL UPDATE ou DROP ROW. A consulta precisa ser de streaming, e a leitura de arquivos usa `STREAM read_files(...)`. A silver lê a bronze com `STREAM(bronze)`. A doc não detalha o separador de várias restrições: o exemplo abaixo usa vírgula, como nas definições de coluna; confira na documentação.",
            "```sql\nCREATE OR REFRESH STREAMING TABLE bronze_chegada AS\nSELECT * FROM STREAM read_files('/Volumes/<catalogo>/estudo/ingestao/chegada/', format => 'json');\n\nCREATE OR REFRESH STREAMING TABLE silver_eventos(\n  CONSTRAINT id_presente EXPECT (id IS NOT NULL),\n  CONSTRAINT valor_valido EXPECT (valor >= 0) ON VIOLATION DROP ROW\n) AS SELECT * FROM STREAM(bronze_chegada);\n\nCREATE OR REFRESH MATERIALIZED VIEW gold_valor_por_tipo AS\nSELECT tipo, SUM(valor) AS valor_total FROM silver_eventos GROUP BY tipo;\n```",
            "Segundo o tutorial oficial, cada arquivo de código-fonte pode ter só uma linguagem, mas o pipeline aceita vários arquivos em linguagens diferentes."
          ],
          fonte: ["CREATE STREAMING TABLE em pipelines", "https://docs.databricks.com/aws/en/ldp/developer/ldp-sql-ref-create-streaming-table"]
        },
        {
          t: "Event log: lendo a qualidade com SQL",
          facil: "Traduzindo: o event log é uma tabela de eventos do pipeline; as contagens de linhas aprovadas e reprovadas ficam dentro dela.",
          p: [
            "Nas métricas de warn e drop, o caminho mais fácil é a interface: abra o pipeline, clique no dataset e vá à aba Data quality. Para consultar por SQL, use o event log. A doc mostra `SELECT * FROM event_log(<pipelineId>);`, que, por padrão, só o usuário run-as do pipeline consegue consultar. A tabela oculta aparece em system.information_schema.tables, mas não no Catalog Explorer, então você acessa pela função event_log().",
            "Os campos do evento incluem timestamp, event_type, details (JSON) e message. O evento flow_progress traz em details o bloco data_quality, com `dropped_records` e a lista `expectations`, cada item com name, dataset, passed_records e failed_records. O esqueleto abaixo parte dessa estrutura; confira a consulta completa na página oficial.",
            "```sql\nSELECT timestamp,\n  from_json(details:flow_progress.data_quality.expectations,\n    'array<struct<name: string, dataset: string, passed_records: int, failed_records: int>>') AS expectativas\nFROM event_log('<id-do-pipeline>')\nWHERE event_type = 'flow_progress';\n```"
          ],
          armadilha: "A entrega de eventos é de melhor esforço, e a doc avisa que as métricas de qualidade podem não estar disponíveis para alguns datasets. Por padrão, só o usuário run-as do pipeline consulta o event log.",
          fonte: ["Consultar o event log", "https://docs.databricks.com/aws/en/ldp/monitor-event-logs"]
        },
        {
          t: "Free Edition e a alternativa com notebooks",
          facil: "Traduzindo: a Free Edition deixa criar pipelines, mas com um pipeline ativo por tipo; se travar, dá para simular com notebooks.",
          p: [
            "A página de limitações da Free Edition informa que só há compute serverless e que Lakeflow pipelines permitem um pipeline ativo por tipo de pipeline. Também existe uma cota de uso justo: se você estourar, o compute fica indisponível pelo resto do dia (em casos extremos, do mês), mantendo seus dados. Confira a página oficial para valores atuais.",
            "Se o pipeline não rodar na sua conta, a alternativa é o mesmo desenho em notebooks: bronze com Auto Loader gravando uma tabela Delta, silver com filtros explícitos e uma tabela de rejeitados, gold com `groupBy`. Você perde a orquestração automática, o grafo e a aba Data quality, mas mantém a arquitetura, e pode medir a qualidade contando linhas aprovadas e rejeitadas na própria tabela.",
            "```python\nbronze = spark.read.table('bronze_chegada')\nvalidos = bronze.where('id IS NOT NULL AND valor >= 0')\nrejeitados = bronze.exceptAll(validos)\nprint(validos.count(), rejeitados.count())\n```"
          ],
          fonte: ["Limitações da Databricks Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: a regra de valor negativo",
        texto: "Um app envia eventos em JSON para o Volume. A bronze guarda tudo como chegou. Na silver, a equipe define duas expectations: id não nulo, só com aviso, e valor maior ou igual a zero, com descarte. Na primeira execução entram 1000 linhas; 12 têm valor negativo e 3 vêm sem id. Resultado: a silver recebe 988 linhas, porque as 12 de valor negativo foram descartadas, e as 3 sem id continuam lá, apenas contadas como falhas, já que a regra era só aviso. Na aba Data quality, a equipe vê failed_records 3 para a primeira regra e 12 para a segunda. Se o negócio decidir que pedido sem id nunca pode seguir adiante, basta trocar para descarte. Se quiser parar tudo para investigar, troca para falha. A decisão é de negócio; o código só muda uma cláusula."
      },
      prova: [
        "Em entrevista: explique bronze, silver e gold com um exemplo seu e diga em qual camada ficam deduplicação e conversão de tipos, justificando por que a bronze guarda o dado cru.",
        "No trabalho: escolher entre aviso, descarte e falha para cada regra é decisão de risco; mostre que você consulta as métricas no event log antes de endurecer uma regra.",
        "Em entrevista: diferencie streaming table e materialized view pelo tipo de leitura (incremental ou lote) e cite onde cada uma entra no medallion.",
        "No trabalho: saber que o nome do produto mudou (Delta Live Tables para pipelines declarativos) evita se perder em código e tutoriais antigos."
      ],
      explique: "Explique com suas palavras como um pipeline declarativo transforma arquivos crus em tabelas confiáveis, e o que muda no resultado quando uma regra é aviso, descarte ou falha.",
      checagem: [
        "Qual a diferença entre uma streaming table e uma materialized view, e em que camada você usaria cada uma?",
        "O que acontece com um registro que viola uma expectation de aviso, de descarte e de falha?",
        "Onde você veria quantas linhas falharam em cada expectation, na interface e por SQL?"
      ]
    },
    fontes: [
      ["Spark Declarative Pipelines on Lakeflow (visão geral)", "https://docs.databricks.com/aws/en/ldp/"],
      ["O que aconteceu com o Delta Live Tables", "https://docs.databricks.com/aws/en/ldp/concepts/where-is-dlt"],
      ["Medallion architecture", "https://docs.databricks.com/aws/en/lakehouse/medallion"],
      ["Expectations nos pipelines", "https://docs.databricks.com/aws/en/ldp/expectations"],
      ["Event log: consultas", "https://docs.databricks.com/aws/en/ldp/monitor-event-logs"],
      ["Event log: esquema", "https://docs.databricks.com/aws/en/ldp/monitor-event-log-schema"],
      ["Tutorial: construir um pipeline ETL", "https://docs.databricks.com/aws/en/getting-started/data-pipeline-get-started"],
      ["Limitações dos pipelines", "https://docs.databricks.com/aws/en/ldp/limitations"]
    ],
    cartoes: [
      { id: "a5c1", f: "O que é a arquitetura medallion?", v: "Padrão em camadas (bronze, silver, gold) que melhora a qualidade do dado a cada etapa, formando uma fonte única de verdade.", t: "d5" },
      { id: "a5c2", f: "O que a camada bronze guarda?", v: "Dado cru, sem validação pesada, anexado de forma incremental, preservando o histórico para reprocessar e auditar.", t: "d5" },
      { id: "a5c3", f: "O que acontece na silver?", v: "Limpeza e validação: deduplicação, nulos, tipos, checagens e junções, lendo da bronze (de preferência em streaming).", t: "d5" },
      { id: "a5c4", f: "Para quem é a gold?", v: "Conjuntos refinados e agregados, alinhados ao negócio, para dashboards, relatórios e ML; materialized views são exemplo comum.", t: "d5" },
      { id: "a5c5", f: "Streaming table vs materialized view", v: "Streaming table é alvo de streaming (ingestão incremental); materialized view é alvo de lote, recalculada para refletir os dados atuais.", t: "d5" },
      { id: "a5c6", f: "Três ações de uma expectation em SQL", v: "EXPECT (aviso, mantém a linha), ON VIOLATION DROP ROW (descarta) e ON VIOLATION FAIL UPDATE (falha a atualização).", t: "d5" },
      { id: "a5c7", f: "Decoradores Python de expectation", v: "dp.expect (aviso), dp.expect_or_drop (descarte), dp.expect_or_fail (falha); variantes expect_all para vários conjuntos.", t: "d5" },
      { id: "a5c8", f: "Que tipo de expressão cabe numa expectation?", v: "Booleana SQL; não aceita funções Python, chamadas a serviços externos nem subconsultas que referenciem outras tabelas.", t: "d5" },
      { id: "a5c9", f: "Como ler as métricas de qualidade?", v: "Aba Data quality do dataset no pipeline, ou event log: evento flow_progress, details, bloco data_quality.", t: "d5" },
      { id: "a5c10", f: "Qual o nome atual de Delta Live Tables?", v: "A doc atual fala em Lakeflow pipelines (Spark Declarative Pipelines on Lakeflow); o módulo Python hoje é pyspark.pipelines, importado como dp.", t: "d5" }
    ],
    questoes: [
      {
        id: "a5q1", s: 1, t: "d5",
        e: "Na camada silver de um pipeline, você criou a expectation valor_valido com a condição valor >= 0 usando apenas EXPECT, sem cláusula ON VIOLATION. Após a execução, a tabela silver ainda contém linhas com valor negativo. O que explica isso?",
        o: ["Sem cláusula ON VIOLATION a ação é de aviso: o registro inválido é escrito no destino e só a violação é contada nas métricas", "A expectation de aviso descarta a linha, mas o descarte só aparece depois da próxima atualização completa", "A cláusula EXPECT sem ON VIOLATION faz o pipeline falhar, e as linhas vistas são de uma execução anterior", "Expectations só funcionam em tabelas de bronze, então a regra foi ignorada na silver"],
        c: [0],
        x: "A ação padrão de uma expectation é o aviso: o registro inválido é gravado no destino e a violação entra nas métricas. Por isso a linha negativa continua na silver. Dizer que o aviso descarta a linha só mais tarde inventa um comportamento que não existe: o descarte exige ON VIOLATION DROP ROW. Dizer que sem cláusula o pipeline falha confunde aviso com FAIL UPDATE, que é a ação que impede a atualização de ter sucesso. Afirmar que expectations só valem na bronze está errado: elas se aplicam a streaming tables, materialized views e views temporárias em qualquer camada."
      },
      {
        id: "a5q2", s: 1, t: "d5",
        e: "Você precisa ingerir continuamente arquivos novos de um Volume para a bronze e, depois, produzir uma tabela gold com o valor total agregado por tipo de evento, recalculado quando a silver muda. Que combinação de objetos do pipeline é a mais adequada?",
        o: ["Materialized view para a bronze e streaming table para a gold agregada", "Streaming table para a bronze e materialized view para a gold agregada", "Duas views comuns, porque views são persistidas e reaproveitadas por vários datasets", "Duas streaming tables, porque agregações em lote não são permitidas em pipelines"],
        c: [1],
        x: "Streaming table é alvo de streaming e serve para ingestão incremental de dados que só crescem, o caso da bronze lendo arquivos novos. Materialized view é alvo de lote, recalculada conforme necessário, indicada para agregações e resultados pré-calculados, o caso da gold. A troca (materialized view na bronze e streaming table na gold) inverte os papéis e perde a leitura incremental. Views comuns não são persistidas, são avaliadas na consulta e só valem dentro do pipeline, então não entregam tabela publicada. A ideia de que agregações em lote não existem em pipelines contradiz a existência das próprias materialized views."
      },
      {
        id: "a5q3", s: 1, t: "d5",
        e: "Sua equipe revisa regras de qualidade de um pipeline declarativo e quer confirmar o que a documentação diz sobre expectations. Quais afirmações estão corretas? (Escolha duas)",
        o: ["A restrição é uma expressão booleana SQL e não pode chamar funções Python nem serviços externos", "Com ON VIOLATION FAIL UPDATE, as linhas inválidas são descartadas e o pipeline segue normalmente", "O nome da expectation deve ser único dentro do mesmo dataset, mas pode se repetir em outros datasets", "Expectations podem ser aplicadas a qualquer arquivo no Volume antes da leitura"],
        c: [0, 2],
        x: "A doc define a restrição como expressão booleana SQL, sem funções Python, chamadas externas ou subconsultas a outras tabelas, e diz que o nome é único por dataset, podendo ser reutilizado entre datasets. Já FAIL UPDATE não descarta nada: a linha inválida impede a atualização de ter sucesso e exige intervenção manual antes de reprocessar, quem descarta é DROP ROW. Por fim, expectations são cláusulas de tabelas e views do pipeline (streaming tables, materialized views e views temporárias), não validam arquivos crus do Volume antes da leitura."
      },
      {
        id: "a5q4", s: 1, t: "d5",
        e: "Um colega propõe fazer a deduplicação e a conversão de tipos já na bronze, para entregar o dado limpo mais cedo e economizar uma etapa. Seguindo a arquitetura medallion descrita na documentação, qual a melhor resposta?",
        o: ["Aceitar: a bronze deve conter só dados validados para que analistas leiam direto dela", "Aceitar, porque a silver só serve para agregações e junções", "Manter a bronze crua e fazer deduplicação e tipagem na silver, lendo da bronze, para poder reprocessar e auditar", "Recusar e fazer toda a limpeza na gold, que é a única camada com regras de qualidade"],
        c: [2],
        x: "A bronze guarda o dado como veio, com validação mínima, justamente para preservar o histórico e permitir reprocessar e auditar. Deduplicação, tratamento de nulos, conversão de tipos e checagens pertencem à silver, que lê da bronze. Aceitar a proposta por a bronze ser para analistas contraria a doc, que diz que ela não é feita para acesso direto de analistas e cientistas. Dizer que a silver serve só para agregações troca o papel da silver pelo da gold. Empurrar tudo para a gold deixa a camada intermediária sem versão validada e não aproveita o padrão em camadas."
      },
      {
        id: "a5q5", s: 1, t: "d5",
        e: "Você tem um pipeline ativo na Free Edition e tenta criar e iniciar um segundo pipeline do mesmo tipo para testar uma variação, mas ele não executa. Qual limitação documentada é a causa mais provável e qual o caminho prático?",
        o: ["A Free Edition não permite pipelines; é preciso migrar para um plano pago", "A Free Edition só aceita pipelines em SQL, e o seu está em Python", "Cada pipeline exige um cartão de crédito cadastrado antes da segunda execução", "A Free Edition permite um pipeline ativo por tipo; pare ou termine o primeiro, ou simule a variação com notebooks"],
        c: [3],
        x: "A página de limitações da Free Edition diz que Lakeflow pipelines permitem um pipeline ativo por tipo de pipeline. O caminho prático é encerrar o primeiro antes de rodar o segundo, ou reproduzir a variação em notebooks. Dizer que a Free Edition não permite pipelines contradiz a própria página, que lista a limitação apenas como um ativo por tipo. A restrição a SQL não consta na doc: pipelines aceitam Python e SQL. E exigir cartão de crédito não aparece como causa; o limite descrito é de quantidade de pipelines ativos, além da cota de uso justo."
      },
      {
        id: "a5q6", s: 1, t: "d5",
        e: "Ao revisar o código de um pipeline Python, você vê uma função decorada com materialized_view que termina com df.count() e imprime o total para depuração, e outra função que usa toPandas() dentro da definição do dataset. O que a documentação recomenda sobre isso?",
        o: ["Manter, pois count() é a forma oficial de registrar métricas de qualidade do dataset", "Trocar o decorador por dp.expect_or_fail, que executa o count de forma segura", "Remover essas chamadas: funções de dataset devem só devolver o DataFrame, sem collect, count, toPandas ou save", "Mover as chamadas para dentro do event log, que aceita código Python arbitrário"],
        c: [2],
        x: "A página de referência Python orienta que a função de dataset devolva um DataFrame e se limite ao código necessário para definir a tabela ou view, sem métodos que escrevem ou disparam execução, como collect(), count(), toPandas(), save(), saveAsTable() e toTable(). Para medir qualidade, use expectations e o event log. Afirmar que count() é a forma oficial de métricas está errado. Trocar o decorador por expect_or_fail não executa nada de forma segura, apenas muda a ação de uma regra. O event log é uma tabela de eventos, não um lugar para executar código."
      }
    ],
    lab: {
      t: "Pipeline bronze/silver/gold com duas expectations",
      custo: "gratuito na Free Edition (compute serverless dentro da cota de uso justo; confira a página oficial de limitações para valores atuais). Não é pedido cartão de crédito em nenhum passo.",
      tempo: "40 a 60 min",
      porque: "Fecha o projeto de portfólio Pipeline medallion com Auto Loader e expectations: junto com a aula 4, gera um pipeline versionável, com métricas de qualidade que você pode mostrar em print.",
      antes: "Você precisa do workspace Free Edition e dos arquivos ingeridos na aula 4 no Volume da aula 4 (caminho /Volumes/<catalogo>/estudo/ingestao/chegada/, com lotes JSON de colunas id, valor e tipo). Os passos foram conferidos contra a documentação oficial e NÃO foram executados: rótulos e nomes de menu podem mudar. Troque <catalogo> pelo nome do seu catálogo. Na tela, a doc descreve New, depois ETL Pipeline, abrindo um editor com a pasta transformations. Se o pipeline não rodar na sua conta, use a alternativa com notebooks do último bloco da aula.",
      passos: [
        { t: "Criar o pipeline", p: "No menu lateral clique em New e escolha ETL Pipeline. Renomeie (por exemplo, medallion_eventos). À direita do nome, defina catálogo e schema padrão onde as tabelas serão criadas (use seu catálogo e o schema estudo da aula 4; a aula 6 move o pipeline para outro schema). Na pasta transformations, abra o arquivo de exemplo e escolha Python na lista de linguagens." },
        { t: "Escrever a bronze e a silver", cmd: "```python\nfrom pyspark import pipelines as dp\nfrom pyspark.sql import functions as F\n\n@dp.table\ndef bronze_chegada():\n    return (spark.readStream.format('cloudFiles')\n        .option('cloudFiles.format', 'json')\n        .load('/Volumes/<catalogo>/estudo/ingestao/chegada/'))\n\n@dp.table\n@dp.expect('id_presente', 'id IS NOT NULL')\n@dp.expect_or_drop('valor_valido', 'valor >= 0')\ndef silver_eventos():\n    return spark.readStream.table('bronze_chegada').withColumn('valor', F.col('valor').cast('double'))\n```", p: "Substitua o conteúdo do arquivo de exemplo pelo código acima, trocando só <catalogo>. A bronze do pipeline se chama bronze_chegada porque a bronze_eventos da aula 4 já existe no schema estudo. Duas expectations: uma de aviso e uma de descarte." },
        { t: "Escrever a gold", cmd: "```python\n@dp.materialized_view\ndef gold_valor_por_tipo():\n    return (spark.read.table('silver_eventos')\n        .groupBy('tipo').agg(F.sum('valor').alias('valor_total')))\n```", p: "Acrescente a materialized view no mesmo arquivo. Ela agrupa pela coluna tipo (compra, visita, clique), gerada na aula 4." },
        { t: "Executar e ver o grafo", p: "Clique em Run pipeline (o tutorial oficial também cita Run file). Ao terminar, confira no editor o grafo com bronze, silver e gold e as tabelas geradas; rótulos exatos podem variar, então confira a documentação se algo não aparecer." },
        { t: "Ver as métricas de qualidade", p: "Em Jobs & Pipelines, abra o pipeline, clique no dataset silver_eventos (que tem expectations) e escolha a aba Data quality na barra lateral direita: ela mostra as métricas das expectations de aviso e descarte. Para ver por SQL, abra um notebook ou o editor de SQL e rode a consulta do bloco do event log, trocando pelo id do seu pipeline. Para provocar falhas, grave no Volume um lote com valor negativo, por exemplo dbutils.fs.put('/Volumes/<catalogo>/estudo/ingestao/chegada/ruim.json', '{\"id\": \"x-1\", \"valor\": -5, \"tipo\": \"compra\"}', True), e rode o pipeline de novo." },
        { t: "Gerar a entrega para o repositório", p: "No repositório databricks-lakehouse-portfolio, crie a pasta 02-medallion-pipeline com: o código do pipeline (arquivo .py), um README em inglês (objetivo, arquitetura, como rodar, regras de qualidade), um diagrama bronze, silver e gold e um print da aba Data quality com o grafo. Escreva no README o que não funcionou ou ficou como limitação." }
      ],
      verificar: "O pipeline termina com sucesso, o grafo mostra três datasets, a silver tem menos linhas que a bronze quando há valores negativos e a aba Data quality (ou o event log) exibe contagens de falha para as duas expectations.",
      limpar: [
        "Se não for continuar, pare o pipeline: a Free Edition permite um pipeline ativo por tipo e a cota de compute é limitada.",
        "Não deixe agenda do pipeline ligada: se criou uma pelo botão Schedule, pause ou apague.",
        "Commitar: código, README em inglês, diagrama e print. NUNCA commitar: tokens, URL de workspace com identificadores pessoais em prints, arquivos de dados pessoais ou reais.",
        "Mantenha as tabelas: a aula 6 usa a linhagem deste pipeline."
      ],
      erros: [
        { s: "Erro dizendo que o dataset já existe ou está definido duas vezes", c: "Duas funções ou statements criam o mesmo nome, ou arquivos antigos de exemplo continuam na pasta transformations", r: "Cada dataset só pode ser definido uma vez: remova o arquivo de exemplo ou renomeie as tabelas." },
        { s: "O pipeline não inicia ou fica esperando", c: "Já existe outro pipeline ativo do mesmo tipo (limite da Free Edition) ou a cota de uso foi atingida", r: "Pare o pipeline anterior; se a cota acabou, espere o reset e confira a página de limitações. Alternativa: refaça o desenho em notebooks." },
        { s: "A aba Data quality não mostra números", c: "Sem expectations na tabela, sem atualização recente ou regra de falha que interrompeu a execução", r: "Confirme que os decoradores estão na função da silver, rode de novo e consulte o event log por SQL. Com falha, não há métricas gravadas." },
        { s: "Erro de permissão ao ler o caminho do Volume", c: "Caminho errado ou falta de acesso ao Volume ou ao schema", r: "Confira catálogo, schema e nome do Volume no Catalog Explorer e use o caminho /Volumes/... exatamente como aparece lá." }
      ]
    }
  };
  C.dias[6] = {
    aula: {
      titulo: "Unity Catalog: governança, permissões e linhagem",
      resumo: "Como o Unity Catalog organiza e protege dados no Databricks: a hierarquia catalog, schema, tabela e volume, o modelo de permissões com GRANT, REVOKE e propriedade, a linhagem automática, as tags e uma visão de row filters e column masks.",
      simples: {
        analogia: "Pense num prédio de escritórios com portaria central. O prédio todo é o metastore. Cada andar é um catalog, cada sala do andar é um schema, e dentro das salas ficam as pastas (tabelas) e os armários de arquivos soltos (volumes). Quem entra no prédio passa pela mesma portaria, que tem um livro com o nome de cada visitante e o que ele abriu. A chave de um andar abre as salas daquele andar, mas só se você também tiver o crachá de entrada do andar e da sala. Cada pasta tem um dono, que decide quem pode lê-la. E o livro da portaria também mostra de onde cada papel veio e para onde foi copiado: isso é a linhagem. Governar dados é cuidar da portaria, dos crachás e do livro.",
        pontos: [
          "A hierarquia é metastore, catalog, schema e objetos (tabelas, views, volumes, funções).",
          "Todo objeto tem dono; permissões se dão com GRANT e se retiram com REVOKE.",
          "Privilégio concedido no pai vale para os filhos atuais e futuros; propriedade não desce.",
          "A linhagem é capturada automaticamente e aparece na aba Lineage do Catalog Explorer.",
          "Tags, row filters e column masks ajudam a classificar e restringir o que cada pessoa vê."
        ],
        paraQueServe: "Mostrar que seu lakehouse não é só um monte de tabelas: tem organização por camadas, acesso controlado e rastreio de onde cada dado vem."
      },
      glossario: [
        { t: "Metastore", d: "Contêiner de topo do Unity Catalog para metadados e permissões; na Free Edition há um metastore por conta." },
        { t: "Catalog", d: "Primeiro nível do namespace de três níveis catalog.schema.objeto; agrupa schemas e costuma ter seu próprio local de armazenamento gerenciado." },
        { t: "Schema", d: "Segundo nível do namespace; agrupa tabelas, views, volumes e funções de um domínio ou de uma camada." },
        { t: "Volume", d: "Objeto do Unity Catalog para governar dados não tabulares (arquivos de qualquer formato), acessado por /Volumes/catalogo/schema/volume/." },
        { t: "Securable", d: "Qualquer objeto governado ao qual se pode conceder privilégios a usuários, grupos ou service principals." },
        { t: "Linhagem", d: "Rastreio automático de relações a montante e a jusante entre tabelas, colunas, jobs, pipelines e outros ativos." },
        { t: "Tag", d: "Par chave-valor aplicado a objetos do Unity Catalog para organizar e achar ativos; não deve conter informação sensível." },
        { t: "Row filter e column mask", d: "Controles por tabela, baseados em funções SQL, que limitam quais linhas e quais valores de coluna cada pessoa enxerga." }
      ],
      blocos: [
        {
          t: "A hierarquia: metastore, catalog, schema, objeto",
          facil: "Traduzindo: todo dado tem um endereço de três partes, catalogo.schema.objeto, e quem manda nele é o Unity Catalog.",
          p: [
            "A documentação define o Unity Catalog como a camada unificada de governança para dados e IA. Quando está habilitado, ele aplica controle de acesso, registra linhagem e guarda logs para auditoria. Cada ativo governado é um securable: você pode conceder permissões sobre ele a usuários, service principals ou grupos.",
            "Tabelas, views, volumes, funções e modelos usam o namespace de três níveis catalog.schema.objeto. Tabelas e volumes podem ser gerenciados (o Unity Catalog cuida de governança e armazenamento) ou externos (cuida só da governança). Credenciais de armazenamento, locais externos, conexões e compartilhamentos ficam direto sob o metastore."
          ],
          tabela: {
            cab: ["Nível", "Exemplo", "Função"],
            linhas: [
              ["Metastore", "um por conta na Free Edition", "Topo: metadados e permissões"],
              ["Catalog", "portfolio_lakehouse", "Isola por ambiente ou projeto"],
              ["Schema", "medallion", "Agrupa por camada ou domínio"],
              ["Objeto", "silver_eventos", "Tabela, view, volume ou função"]
            ]
          },
          fonte: ["Unity Catalog: visão geral", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/"]
        },
        {
          t: "Criando catálogo e schema",
          facil: "Traduzindo: catálogo e schema são criados por SQL ou pelo Catalog Explorer, e exigem privilégios próprios.",
          p: [
            "Para criar um catálogo, a doc pede o privilégio CREATE CATALOG no metastore e dá a sintaxe `CREATE CATALOG [ IF NOT EXISTS ] nome [ MANAGED LOCATION 'caminho' ] [ COMMENT comentario ]`. Sem armazenamento padrão no metastore, é preciso informar um local gerenciado; mesmo com padrão, a página recomenda definir um para catálogos padrão. No Catalog Explorer: Catalog, Catalogs, Create catalog.",
            "Para criar um schema, é preciso USE CATALOG e CREATE SCHEMA no catálogo pai. A sintaxe é `CREATE SCHEMA [ IF NOT EXISTS ] catalogo.schema [ COMMENT comentario ]`, e na interface você seleciona o catálogo e clica em Create schema.",
            "```sql\nCREATE CATALOG IF NOT EXISTS portfolio_lakehouse;\nCREATE SCHEMA IF NOT EXISTS portfolio_lakehouse.medallion;\n```"
          ],
          armadilha: "A página de criação de catálogos não menciona a Free Edition. Como ela não aceita locais de armazenamento customizados, o CREATE CATALOG pode falhar na sua conta: nesse caso, use um schema novo no catálogo que já existe.",
          fonte: ["Criar catálogos", "https://docs.databricks.com/aws/en/catalogs/create-catalog"]
        },
        {
          t: "Volumes: o lugar dos arquivos",
          facil: "Traduzindo: volume é uma pasta governada para arquivos que não são tabela, como os que o Auto Loader lê.",
          p: [
            "Volumes governam conjuntos de dados não tabulares: arquivos de qualquer formato. Os caminhos têm o formato `/Volumes/<catalogo>/estudo/ingestao/chegada/<arquivo>`, e o mesmo caminho funciona em Spark, SQL e Python. Volumes gerenciados ficam no armazenamento gerenciado do schema, e o Unity Catalog cuida do layout e da exclusão (com retenção de 7 dias na exclusão). Volumes externos apontam para um caminho já existente na nuvem.",
            "Entre os usos listados estão áreas de aterrissagem para dado cru e locais de staging para ingestão com Auto Loader, COPY INTO ou CTAS, exatamente o papel que o seu Volume teve na aula 4. Um limite importante: arquivos em volumes não são registrados como tabelas, só acessados por caminho."
          ],
          dica: "Se o Volume da aula 4 está num schema antigo, tudo bem: você pode ler dele e escrever tabelas no schema novo.",
          fonte: ["Volumes do Unity Catalog", "https://docs.databricks.com/aws/en/volumes/"]
        },
        {
          t: "GRANT, REVOKE e propriedade",
          facil: "Traduzindo: o dono do objeto manda; ele dá e tira permissão com GRANT e REVOKE.",
          p: [
            "O modelo central é: `GRANT privilegio ON tipo nome TO principal` e `REVOKE privilegio ON tipo nome FROM principal`, mais `SHOW GRANTS` para listar. O principal pode ser usuário, service principal ou grupo (nomes com caracteres especiais pedem crases). Um REVOKE tem sucesso mesmo se o privilégio nunca foi concedido.",
            "Todo securable tem um dono, que pode fazer tudo sobre ele, conceder e revogar privilégios e transferir a propriedade (o dono não recebe um ALL PRIVILEGES explícito, então isso não aparece no SHOW GRANTS). Quem pode conceder ou revogar: o dono do objeto, o dono do catálogo ou schema que o contém, quem tem MANAGE no objeto e um administrador do metastore. O dono se troca com `ALTER TABLE ... OWNER TO`.",
            "```sql\nGRANT USE CATALOG ON CATALOG portfolio_lakehouse TO `account users`;\nGRANT USE SCHEMA ON SCHEMA portfolio_lakehouse.medallion TO `account users`;\nSHOW GRANTS ON SCHEMA portfolio_lakehouse.medallion;\nREVOKE USE SCHEMA ON SCHEMA portfolio_lakehouse.medallion FROM `account users`;\n```"
          ],
          dica: "Prefira conceder a grupos, não a pessoas: quando alguém entra ou sai, você muda o grupo e não centenas de GRANTs.",
          fonte: ["Gerenciar privilégios no Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/"]
        },
        {
          t: "Herança, USE CATALOG e BROWSE",
          facil: "Traduzindo: permissão dada no pai vale para tudo que está dentro; para chegar numa tabela, você precisa abrir as portas do catálogo e do schema.",
          p: [
            "A doc diz que ao conceder um privilégio num objeto pai ele se aplica a todos os filhos atuais e futuros. Privilégios concedidos no metastore não herdam para os filhos, e a propriedade não passa para os filhos, embora quem é dono de um contêiner (catálogo ou schema) ganhe direitos de gestão sobre o que há dentro, funcionalmente como MANAGE e sem concessão explícita. Na hierarquia, catalogs e schemas são contêineres; tabelas, views, volumes e funções não são.",
            "Para ler uma tabela é preciso, além do SELECT nela, USE CATALOG no catálogo e USE SCHEMA no schema: a doc diz que o SELECT sozinho não basta. Já BROWSE permite descobrir objetos e ver seus metadados sem acesso aos dados de baixo; é concedido no nível do catálogo, e a doc recomenda dá-lo ao grupo All account users. Isso responde à pergunta clássica: encontrar uma tabela não é o mesmo que poder lê-la."
          ],
          armadilha: "Privilégio no metastore não desce. Se você concedeu algo lá e espera que valha em tabelas, não vai valer.",
          fonte: ["Conceitos de permissões do Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/access-control/permissions-concepts"]
        },
        {
          t: "Linhagem: de onde veio e para onde vai",
          facil: "Traduzindo: o Unity Catalog desenha sozinho o mapa que liga bronze, silver, gold e quem os alimenta, sem você instrumentar nada.",
          p: [
            "A linhagem captura relações a montante e a jusante entre tabelas, views, colunas, modelos e caminhos de arquivo, incluindo o que passa por tabelas temporárias e por UDFs (estas só no nível de tabela). Requisitos: tabelas registradas num metastore do Unity Catalog e consultas feitas por DataFrames do Spark ou interfaces de SQL do Databricks. Para ver, abra Catalog, ache a tabela, aba Lineage, See Lineage Graph; clique no ícone numa aresta para ver detalhes e filtrar por notebooks, jobs, pipelines e consultas.",
            "A linhagem a nível de coluna aparece ao clicar numa coluna do grafo. A linhagem exibida no Catalog Explorer é mantida por tempo indefinido (dados capturados depois de 1.º de setembro de 2024); as tabelas de sistema system.access.table_lineage e column_lineage guardam janela móvel de um ano. Para ver o grafo de uma tabela é preciso BROWSE ou SELECT nela, BROWSE no catálogo pai e CAN VIEW num pipeline com Unity Catalog."
          ],
          armadilha: "A linhagem não é preservada quando catálogos, schemas, tabelas ou colunas são renomeados. Não renomeie depois de tirar o print.",
          fonte: ["Linhagem de dados no Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage"]
        },
        {
          t: "Tags: etiquetas para achar e classificar",
          facil: "Traduzindo: tag é uma etiqueta chave-valor colada num catálogo, tabela ou coluna para organizar e buscar.",
          p: [
            "Tags são pares chave-valor aplicados a securables, como catálogos, schemas, tabelas, colunas e volumes. Elas ajudam a achar objetos na busca do workspace. Atenção: os dados de tag são texto simples e podem ser replicados globalmente, então nada sensível em nomes, valores ou descrições.",
            "Para etiquetar, você precisa ser dono do objeto ou ter APPLY TAG nele, mais USE SCHEMA e USE CATALOG nos pais. Há tags governadas (chaves e valores definidos por administradores, na conta) e não governadas. Cada objeto aceita até 50 tags, e as chaves não podem conter os caracteres ponto, vírgula, hífen, igual, barra ou dois-pontos.",
            "```sql\nALTER TABLE portfolio_lakehouse.medallion.silver_eventos\nALTER COLUMN id SET TAGS ('classificacao' = 'identificador');\n```"
          ],
          fonte: ["Tags do Unity Catalog", "https://docs.databricks.com/aws/en/database-objects/tags"]
        },
        {
          t: "Row filters e column masks: visão geral",
          facil: "Traduzindo: o filtro de linha esconde linhas inteiras e a máscara de coluna troca o valor de uma coluna, conforme quem consulta.",
          p: [
            "Row filters usam uma função SQL que avalia cada linha: linhas em que ela devolve FALSE ficam fora do resultado. Column masks usam uma função que recebe o valor da coluna e devolve o original ou uma versão mascarada. Exemplos da doc: `ALTER TABLE sales SET ROW FILTER us_filter ON (region);` e `ALTER TABLE users ALTER COLUMN ssn SET MASK ssn_mask;`. Para aplicar numa tabela existente, é preciso ser dono dela ou ter MANAGE e SELECT, além de EXECUTE na função.",
            "Limites relevantes: não se aplicam a views, não funcionam com time travel nem clones e não são suportados em runtime abaixo do 12.2 LTS. A doc recomenda políticas ABAC (baseadas em tags) para consistência em muitas tabelas, e dynamic views como alternativa. Nesta aula, o objetivo é saber que existem e quando usá-los; aplicar de verdade fica opcional."
          ],
          fonte: ["Row filters e column masks", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/filters-and-masks/"]
        },
        {
          t: "O que a Free Edition permite",
          facil: "Traduzindo: você usa o Unity Catalog, mas com um metastore só, sem console de conta e com armazenamento padrão.",
          p: [
            "Segundo a página de limitações, a Free Edition tem um workspace e um metastore por conta, não tem console de conta nem APIs de nível de conta, não suporta locais de armazenamento customizados do workspace nem personalização de segurança, e o login é por e-mail com código, Google ou Microsoft (sem SSO ou SCIM). Também é uso não comercial.",
            "O que a doc não diz: se CREATE CATALOG funciona sem MANAGED LOCATION nessa edição, e quais grupos existem para você conceder. Por isso o lab testa e dá alternativa. Como você é a única pessoa no workspace, os GRANTs do lab são para praticar a sintaxe e inspecionar com SHOW GRANTS; confira a página oficial para limites atuais."
          ],
          fonte: ["Limitações da Databricks Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: quem pode ler a silver?",
        texto: "A equipe de análise precisa ler silver_eventos no schema medallion do catálogo portfolio_lakehouse, mas não deve ver a bronze. O dono do schema concede USE CATALOG no catálogo ao grupo analistas, USE SCHEMA no schema medallion e SELECT na tabela silver_eventos. Como a bronze ficou em outro schema, que não recebeu GRANT algum, o grupo não consegue lê-la, embora possa vê-la na busca caso tenha BROWSE no catálogo. Meses depois, uma coluna passa a guardar um identificador sensível: a equipe aplica uma tag na coluna para facilitar achá-la e avalia uma máscara de coluna para quem não é do time financeiro. Quando alguém pergunta de onde vem a gold, abre a aba Lineage da tabela e mostra o grafo até o Volume. Nada disso exigiu mudar o código do pipeline."
      },
      prova: [
        "Em entrevista: descreva o namespace catalog.schema.objeto, diga onde ficam tabelas e volumes e explique por que privilégio concedido no pai vale para filhos futuros.",
        "No trabalho: mostre que você sabe a diferença entre BROWSE (descobrir) e SELECT (ler) e que concede a grupos, com o mínimo necessário.",
        "Em entrevista: explique como você responderia a uma auditoria de origem de dado usando a aba Lineage e as tabelas de sistema de linhagem.",
        "No trabalho: reconhecer que tags não devem guardar informação sensível, e que row filters e column masks existem para casos por tabela, mostra maturidade de governança."
      ],
      explique: "Explique com suas palavras como um analista chega a ler uma tabela no Unity Catalog, passando por catálogo, schema e propriedade, e como você descobriria de onde essa tabela vem.",
      checagem: [
        "Que privilégios uma pessoa precisa, além do SELECT na tabela, para conseguir consultá-la?",
        "O que a propriedade de um objeto permite e por que ela não desce para os filhos?",
        "Como você abriria o grafo de linhagem de uma tabela e quais permissões precisa para isso?"
      ]
    },
    fontes: [
      ["Unity Catalog: visão geral", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/"],
      ["Gerenciar privilégios", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/"],
      ["Conceitos de permissões", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/access-control/permissions-concepts"],
      ["Controle de acesso no Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/access-control/"],
      ["Linhagem de dados", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage"],
      ["Tags", "https://docs.databricks.com/aws/en/database-objects/tags"],
      ["Criar schemas", "https://docs.databricks.com/aws/en/schemas/create-schema"]
    ],
    cartoes: [
      { id: "a6c1", f: "Qual o namespace dos objetos no Unity Catalog?", v: "Três níveis: catalog.schema.objeto, em que o objeto pode ser tabela, view, volume, função ou modelo.", t: "d6" },
      { id: "a6c2", f: "Para que serve um volume?", v: "Governar dados não tabulares (arquivos de qualquer formato), acessados por /Volumes/catalogo/schema/volume/pasta/arquivo.", t: "d6" },
      { id: "a6c3", f: "Sintaxe de GRANT e REVOKE", v: "GRANT privilegio ON tipo nome TO principal; REVOKE privilegio ON tipo nome FROM principal; SHOW GRANTS lista as concessões.", t: "d6" },
      { id: "a6c4", f: "Quem pode conceder privilégios sobre um objeto?", v: "Dono do objeto, dono do catálogo ou schema pai, quem tem MANAGE no objeto e administrador do metastore.", t: "d6" },
      { id: "a6c5", f: "Como funciona a herança de privilégios?", v: "Concedido num pai, vale para filhos atuais e futuros. Privilégio no metastore não herda, e a propriedade não desce.", t: "d6" },
      { id: "a6c6", f: "O que é BROWSE?", v: "Privilégio que permite descobrir objetos e ver metadados sem acesso aos dados; concedido no nível do catálogo.", t: "d6" },
      { id: "a6c7", f: "Como ver a linhagem de uma tabela?", v: "Catalog, tabela, aba Lineage, See Lineage Graph; expandir nós e clicar em colunas para ver linhagem de coluna.", t: "d6" },
      { id: "a6c8", f: "Onde consultar linhagem por SQL?", v: "Tabelas de sistema system.access.table_lineage e system.access.column_lineage, com janela móvel de um ano.", t: "d6" },
      { id: "a6c9", f: "Row filter vs column mask", v: "Filtro de linha usa função que devolve booleano e remove linhas; máscara usa função que devolve o valor original ou mascarado de uma coluna.", t: "d6" },
      { id: "a6c10", f: "Que cuidado ter com tags?", v: "Tags são texto simples, possivelmente replicado globalmente: não coloque informação sensível em chaves, valores ou descrições.", t: "d6" }
    ],
    questoes: [
      {
        id: "a6q1", s: 1, t: "d6",
        e: "Um analista recebeu SELECT na tabela portfolio_lakehouse.medallion.silver_eventos, mas a consulta falha com erro de permissão. Ele não tem nenhum outro privilégio no catálogo nem no schema. Qual é a causa mais provável?",
        o: ["O SELECT só funciona se o analista também for dono do catálogo", "Faltam USE CATALOG no catálogo e USE SCHEMA no schema, necessários para alcançar a tabela", "A tabela precisa ser externa para aceitar SELECT concedido", "Falta apenas conceder MANAGE ao analista na tabela"],
        c: [1],
        x: "Para acessar uma tabela é preciso o privilégio sobre ela e também USE CATALOG no catálogo e USE SCHEMA no schema: a doc afirma que ter só o SELECT na tabela não basta para lê-la. Exigir ser dono do catálogo é exagero, pois propriedade não é pré-requisito de leitura. Dizer que a tabela precisa ser externa confunde gerenciada e externa, que descrevem armazenamento e não permissão de leitura. MANAGE serve para administrar privilégios do objeto, não para ler dados. A correção é conceder os dois USE faltantes, de preferência a um grupo."
      },
      {
        id: "a6q2", s: 1, t: "d6",
        e: "Você concedeu SELECT a um grupo no schema medallion e, depois, criou uma nova tabela gold nesse schema. O grupo precisa ler a nova tabela sem que você faça outro GRANT. O que a documentação diz sobre esse comportamento?",
        o: ["O privilégio concedido no schema se aplica também a filhos futuros, então a nova tabela já fica legível", "É preciso repetir o GRANT para cada tabela nova, porque privilégios nunca herdam", "A nova tabela só fica legível depois de transferir a propriedade ao grupo", "Isso só vale se o privilégio tiver sido concedido no metastore"],
        c: [0],
        x: "A doc afirma que, ao conceder um privilégio num objeto pai, ele se aplica a todos os filhos atuais e futuros. Por isso a nova tabela no schema já está coberta. Dizer que privilégios nunca herdam contradiz isso. Transferir propriedade não é necessário e a propriedade nem herda para baixo. A ressalva do metastore está invertida: a doc diz que privilégios concedidos no metastore não herdam aos filhos, então esse seria exatamente o caso em que não funcionaria."
      },
      {
        id: "a6q3", s: 1, t: "d6",
        e: "Uma pessoa precisa achar tabelas no catálogo para saber que existem e ler seus metadados, mas ainda não deve ter acesso aos dados. Qual configuração atende a esse pedido da forma mais direta?",
        o: ["Conceder SELECT em todas as tabelas, e depois revogar manualmente", "Torná-la dona do catálogo", "Aplicar column masks em todas as colunas", "Conceder BROWSE no nível do catálogo"],
        c: [3],
        x: "BROWSE permite descobrir objetos e ver seus metadados sem conceder acesso aos dados subjacentes, e é concedido no nível do catálogo (a doc recomenda dá-lo ao grupo All account users). Conceder SELECT e revogar depois dá acesso aos dados, mesmo que por pouco tempo, e dá muito trabalho. Fazer a pessoa dona do catálogo dá todos os privilégios, o oposto do mínimo necessário. Column masks alteram o que se vê dentro das colunas, mas pedem acesso à tabela e não resolvem apenas a descoberta de objetos."
      },
      {
        id: "a6q4", s: 1, t: "d6",
        e: "Durante uma auditoria, pedem para mostrar de onde vem a tabela gold e quais colunas da silver a alimentam, sem ter documentado isso antes. Quais ações ajudam, segundo a documentação do Unity Catalog? (Escolha duas)",
        o: ["Abrir a aba Lineage da tabela no Catalog Explorer e ver o grafo, clicando em colunas para ver a linhagem de coluna", "Pedir aos usuários que escrevam manualmente cada dependência numa tag", "Consultar as tabelas de sistema de linhagem, como system.access.table_lineage e column_lineage", "Renomear a tabela para que o Unity Catalog recalcule a linhagem do zero"],
        c: [0, 2],
        x: "A linhagem é capturada automaticamente, e pode ser vista no grafo da aba Lineage (com nível de coluna) ou consultada por SQL nas tabelas de sistema table_lineage e column_lineage, que guardam uma janela móvel de um ano. Registrar dependências manualmente em tags não é o mecanismo previsto, além de tags não servirem para dado sensível e não substituírem a captura automática. Renomear é prejudicial: a doc avisa que a linhagem não é preservada entre renomeações de catálogos, schemas, tabelas, views ou colunas."
      },
      {
        id: "a6q5", s: 1, t: "d6",
        e: "Você quer marcar a coluna id_cliente de uma tabela com uma etiqueta que facilite achá-la na busca, e um colega sugere gravar no valor da tag o CPF de exemplo do cliente para dar contexto. Qual a melhor conduta?",
        o: ["Fazer como sugerido: o valor da tag é criptografado pelo Unity Catalog", "Usar apenas classificação genérica, como identificador; tags são texto simples e podem ser replicadas globalmente, então nada sensível", "Gravar o CPF na chave da tag, pois a chave é protegida e o valor não", "Evitar tags e guardar o CPF no nome do schema"],
        c: [1],
        x: "A doc avisa que dados de tag são armazenados como texto simples e podem ser replicados globalmente, então não se deve colocar informação sensível em nomes, valores ou descrições. Usar uma classificação genérica atende ao objetivo de busca. A ideia de que o valor é criptografado contradiz o aviso. Colocar o CPF na chave também é errado, já que chaves são texto simples igualmente e ainda têm restrições de caracteres. Pôr o dado no nome do schema só espalha a informação sensível por mais um lugar visível."
      },
      {
        id: "a6q6", s: 1, t: "d6",
        e: "Você tenta rodar CREATE CATALOG portfolio_lakehouse na Free Edition e recebe erro pedindo um local de armazenamento gerenciado. A doc de criação de catálogos não menciona a Free Edition, e a página de limitações diz que locais de armazenamento customizados não são suportados. Qual o caminho mais sensato para continuar o lab?",
        o: ["Pagar um plano para liberar locais de armazenamento customizados antes de continuar", "Criar um schema novo dentro do catálogo que já existe no workspace e seguir o lab com ele, registrando a limitação no README", "Desistir da governança, pois sem catálogo próprio nenhuma permissão pode ser testada", "Inventar um caminho de armazenamento qualquer em MANAGED LOCATION até o erro sumir"],
        c: [1],
        x: "Como a doc não garante CREATE CATALOG sem local gerenciado e a Free Edition não suporta locais customizados, o caminho prático e gratuito é criar um schema no catálogo existente e registrar a limitação, mantendo o aprendizado de schemas, GRANTs e linhagem. Pagar um plano não é necessário para o objetivo do lab. Desistir joga fora o que ainda funciona, porque privilégios em schemas e tabelas continuam testáveis. Inventar um caminho em MANAGED LOCATION não funciona, pois a doc diz que ele precisa estar definido numa external location ou ser um subcaminho dela."
      }
    ],
    lab: {
      t: "Catálogo, permissões e linhagem do pipeline",
      custo: "gratuito na Free Edition (SQL e interface do workspace, dentro da cota de uso justo). Nenhum passo pede cartão de crédito.",
      tempo: "30 a 45 min",
      porque: "Dá ao portfólio a evidência de governança: um catálogo organizado, permissões documentadas em SQL e o print da linhagem ligando Volume, bronze, silver e gold.",
      antes: "Você precisa do pipeline da aula 5 já executado. Os passos foram conferidos contra a documentação oficial e NÃO foram executados: rótulos de menu podem mudar. Na tela, a doc descreve Catalog, depois Catalogs em Quick access e o botão Create catalog; a aba Lineage fica na página da tabela. Como você é a única pessoa do workspace, os GRANTs servem para treinar a sintaxe e inspecionar com SHOW GRANTS. A documentação não confirma se CREATE CATALOG funciona na Free Edition sem MANAGED LOCATION: o passo 1 traz a alternativa.",
      passos: [
        { t: "Criar catálogo e schema (ou só schema)", cmd: "```sql\nCREATE CATALOG IF NOT EXISTS portfolio_lakehouse;\nCREATE SCHEMA IF NOT EXISTS portfolio_lakehouse.medallion;\n```", p: "Rode num notebook ou no editor de SQL. Se o catálogo falhar pedindo local gerenciado, não force: use o catálogo que já aparece no Catalog Explorer e crie só o schema, por exemplo CREATE SCHEMA IF NOT EXISTS <catalogo-existente>.medallion. Anote qual caminho você usou." },
        { t: "Apontar o pipeline para o novo schema", p: "Abra o pipeline da aula 5 e, ao lado do nome, ajuste catálogo e schema padrão para os novos (a doc mostra essa opção no editor). Se o editor não deixar alterar um pipeline existente, crie um pipeline novo com o mesmo código. Rode e confirme no Catalog Explorer que bronze_chegada, silver_eventos e gold_valor_por_tipo estão no schema medallion." },
        { t: "Aplicar permissões e inspecionar", cmd: "```sql\nGRANT USE CATALOG ON CATALOG portfolio_lakehouse TO `account users`;\nGRANT USE SCHEMA ON SCHEMA portfolio_lakehouse.medallion TO `account users`;\nGRANT SELECT ON TABLE portfolio_lakehouse.medallion.gold_valor_por_tipo TO `account users`;\nSHOW GRANTS ON TABLE portfolio_lakehouse.medallion.gold_valor_por_tipo;\n```", p: "Estes comandos seguem a sintaxe da doc. A doc cita o grupo All account users (na recomendação de BROWSE), mas não mostra o nome exato para usar no GRANT: se `account users` não existir ou não aceitar o GRANT, leia a mensagem de erro, veja os grupos na aba Permissions do Catalog Explorer e confira a página oficial de privilégios. Em seguida desfaça com REVOKE SELECT ON TABLE ... FROM `account users` e rode SHOW GRANTS de novo, para ver a mudança." },
        { t: "Aplicar uma tag (OPCIONAL)", cmd: "```sql\nALTER TABLE portfolio_lakehouse.medallion.silver_eventos\nALTER COLUMN id SET TAGS ('classificacao' = 'identificador');\n```", p: "Opcional. Não coloque nada sensível na tag. Depois confira a tag na página da tabela no Catalog Explorer." },
        { t: "Explorar a linhagem", p: "No Catalog Explorer, abra gold_valor_por_tipo, aba Lineage, See Lineage Graph. Expanda os nós com o ícone de mais até chegar à bronze. Clique numa coluna para ver a linhagem de coluna e no ícone da aresta para ver o pipeline envolvido. Tire um print do grafo." },
        { t: "Guardar a evidência", p: "No repositório databricks-lakehouse-portfolio, crie 03-governance com: governance.sql (apenas CREATE, GRANT, REVOKE e tag usados, com comentários), o print da linhagem e um README em inglês descrevendo o desenho catálogo, schema, objetos e as limitações da Free Edition que você encontrou." }
      ],
      verificar: "SHOW GRANTS mostra os privilégios concedidos e some o que você revogou, as tabelas do pipeline estão no schema medallion e a aba Lineage exibe o grafo de bronze, silver e gold com o Volume à esquerda.",
      limpar: [
        "Desfaça os GRANTs do exercício com REVOKE para não deixar acesso aberto ao grupo account users.",
        "Commitar: governance.sql, print do grafo e README. NUNCA commitar: tokens, e-mails ou ids de workspace visíveis em prints sem cortar, nem dados pessoais.",
        "Não apague o schema se for seguir para as aulas 7 e 8: o job e o bundle usam estas tabelas."
      ],
      erros: [
        { s: "Erro ao criar o catálogo pedindo local de armazenamento gerenciado", c: "Sem armazenamento padrão disponível ou sem permissão para criar catálogo nesta edição", r: "Use um schema novo no catálogo existente e registre a limitação no README. Confira a página oficial de criação de catálogos." },
        { s: "A aba Lineage aparece vazia", c: "O pipeline ainda não rodou depois da mudança de schema, ou você não tem BROWSE ou SELECT na tabela", r: "Rode o pipeline de novo no schema novo e confirme seus privilégios. A linhagem só cobre consultas feitas por DataFrames do Spark ou SQL do Databricks." },
        { s: "Erro de permissão ao rodar GRANT", c: "Você não é dono nem tem MANAGE no objeto, ou o principal não existe", r: "Rode SHOW GRANTS no objeto, confirme o dono e o nome do grupo entre crases, e tente no objeto que você criou." },
        { s: "A tag é recusada", c: "Chave com caractere proibido (como hífen ou dois-pontos) ou falta de permissão APPLY TAG", r: "Use chaves simples sem os caracteres restritos e confira se é dono da tabela." }
      ]
    }
  };
  C.dias[7] = {
    aula: {
      titulo: "Orquestração com Jobs: tarefas, parâmetros e agenda",
      resumo: "Como usar o Lakeflow Jobs (antes Workflows) para encadear tarefas com dependências, passar parâmetros e valores entre elas, agendar com cron, configurar retries e notificações e acompanhar o histórico de execuções.",
      simples: {
        analogia: "Pense numa lista de tarefas da casa para uma festa. Comprar os ingredientes vem antes de cozinhar, e cozinhar vem antes de arrumar a mesa. Se a compra der errado, ninguém começa a cozinhar à toa. Você deixa um bilhete na geladeira com o número de convidados, e todo mundo lê o mesmo bilhete. Quem comprou deixa um recado para o cozinheiro: trouxe 12 ovos. Se o mercado estiver fechado, você tenta de novo mais tarde, e se continuar fechado, manda mensagem para alguém. Dá para marcar a festa para toda sexta, mas é possível deixar o alarme desligado até querer. E há um caderno com o registro de cada vez que a lista foi seguida. Isso é um job: tarefas, dependências, parâmetros, agenda, retries, aviso e histórico.",
        pontos: [
          "Job é o recurso principal; tarefa é uma unidade de trabalho; gatilho (trigger) inicia a execução.",
          "As tarefas formam um grafo acíclico: Depends on define a ordem e Run if define a condição.",
          "Parâmetros do job chegam às tarefas; valores de tarefa passam resultados de uma para outra.",
          "A agenda usa sintaxe cron do Quartz e pode ficar pausada; retries e notificações tratam falhas.",
          "O histórico de execuções fica na aba Runs, por 60 dias."
        ],
        paraQueServe: "Trocar o clicar manualmente em notebooks por um fluxo repetível, observável e que avisa quando quebra, a base de qualquer pipeline de dados em produção."
      },
      glossario: [
        { t: "Job", d: "Recurso principal do Lakeflow Jobs para coordenar, agendar e executar operações; suas tarefas e dependências formam um grafo acíclico dirigido." },
        { t: "Task", d: "Unidade específica de trabalho dentro de um job, como rodar um notebook, um pipeline ou um script Python." },
        { t: "Trigger", d: "Mecanismo que inicia a execução de um job por tempo (agenda) ou por evento, como a chegada de arquivos." },
        { t: "Depends on", d: "Campo da tarefa que lista de quais tarefas ela depende; só aparece quando o job tem mais de uma tarefa." },
        { t: "Run if dependencies", d: "Condição que decide se a tarefa roda conforme o resultado das dependências, como All succeeded (padrão) ou All done." },
        { t: "Job parameter", d: "Par chave-valor definido no job e enviado às tarefas que aceitam parâmetros; quem tem CAN MANAGE RUN pode sobrescrever numa execução manual." },
        { t: "Task value", d: "Valor gerado durante a execução de uma tarefa, lido por tarefas seguintes por referência dinâmica ou por dbutils.jobs.taskValues." },
        { t: "Quartz cron", d: "Sintaxe de agenda usada na agenda avançada do job, exibida e editada em Show Cron Syntax." }
      ],
      blocos: [
        {
          t: "Job, tarefa e gatilho",
          facil: "Traduzindo: o job é a lista, a tarefa é cada item e o gatilho é o que dá a partida.",
          p: [
            "A documentação do Lakeflow Jobs define o job como o recurso principal para coordenar, agendar e executar operações. As tarefas e suas dependências formam um grafo acíclico dirigido, que a interface mostra na visão Graph. Um job também pode ter gatilho, parâmetros de execução, notificações e configurações de controle de versão por Git.",
            "Uma tarefa é uma unidade específica de trabalho. Os tipos incluem notebook, pipeline (executa um pipeline existente) e script Python, e a lista completa fica na página de tipos de tarefa. Um gatilho inicia o job por tempo ou por evento, como chegada de dados no armazenamento. Quanto ao nome: a documentação atual usa Lakeflow Jobs. Um blog oficial da Databricks (www.databricks.com) o descreve como antes conhecido como Databricks Workflows; as páginas da documentação consultadas não citam o nome antigo."
          ],
          fonte: ["Lakeflow Jobs: visão geral", "https://docs.databricks.com/aws/en/jobs/"]
        },
        {
          t: "Criando um job com várias tarefas",
          facil: "Traduzindo: crie o job, salve a primeira tarefa e vá adicionando as próximas; cada nova tarefa nasce dependendo da selecionada.",
          p: [
            "O caminho da doc é: no menu lateral, Jobs & Pipelines, depois Create, depois Job. Clique no bloco Notebook, dê um Task name, escolha o notebook em Path e clique em Save task. O job aparece na lista com nome padrão New Job seguido de data e hora, e você pode renomeá-lo.",
            "Para a segunda tarefa, use o ícone de mais, Add task e o tipo desejado. Se você cria uma tarefa com outra selecionada no grafo, a nova depende da selecionada por padrão. Para executar, clique em Run now; para ver resultado, abra a aba Runs, clique no link da coluna Start time e depois numa tarefa. Há também Run now with different parameters, que a página de parâmetros cita para trocar parâmetros numa execução manual.",
            "A doc recomenda sempre usar jobs compute; na Free Edition só existe compute serverless, então use o que a interface oferecer."
          ],
          dica: "Dê nomes de tarefa curtos e de verbo, como ingestao, transformacao e verificacao: eles viram chaves em referências dinâmicas.",
          fonte: ["Configurar um job", "https://docs.databricks.com/aws/en/jobs/configure-job"]
        },
        {
          t: "Dependências e Run if",
          facil: "Traduzindo: Depends on diz quem vem antes; Run if diz com qual resultado a tarefa pode seguir.",
          p: [
            "Selecione a tarefa e, no campo Depends on, adicione ou remova dependências (o campo só aparece com mais de uma tarefa). Em Run if dependencies, escolha a condição. As opções documentadas: All succeeded (padrão), At least one succeeded, None failed, All done, At least one failed e All failed. Quando a condição não é atendida, a tarefa fica como Upstream failed ou Excluded, conforme o caso.",
            "O padrão All succeeded é o que você quer na maioria das cadeias: se a ingestão falha, a transformação nem começa. A opção All done é útil para tarefas de limpeza ou notificação que devem rodar de qualquer jeito. A doc ainda explica que tarefas Excluded contam como sucesso ao avaliar condições, e que o cancelamento se propaga para as tarefas seguintes."
          ],
          tabela: {
            cab: ["Run if", "Quando roda"],
            linhas: [
              ["All succeeded", "Todas as dependências deram certo (padrão)"],
              ["None failed", "Nenhuma falhou e ao menos uma rodou"],
              ["All done", "Depois que todas terminam, qualquer resultado"],
              ["At least one failed", "Pelo menos uma dependência falhou"]
            ]
          },
          fonte: ["Run if dependencies", "https://docs.databricks.com/aws/en/jobs/run-if"]
        },
        {
          t: "Parâmetros e valores entre tarefas",
          facil: "Traduzindo: parâmetro é o bilhete que o job entrega a todos; valor de tarefa é o recado que uma tarefa deixa para a próxima.",
          p: [
            "Parâmetros de job são pares chave-valor definidos no job e empurrados às tarefas que aceitam parâmetros. Em tarefas de notebook, o acesso é pelo submódulo dbutils.widgets. Tarefas de script Python recebem os valores como argumentos de linha de comando; o formato exato está na página do tipo de tarefa. Para repassar um parâmetro do job a uma tarefa, a referência dinâmica é `{{job.parameters.nome}}`. Quem tem CAN MANAGE RUN pode sobrescrever o valor numa execução manual, então um valor padrão não é controle de segurança.",
            "Para passar resultado entre tarefas, a tarefa de origem grava com `dbutils.jobs.taskValues.set(key = 'linhas', value = 120)`. A doc recomenda ler por referência dinâmica, `{{tasks.nome_da_tarefa.values.linhas}}`, colocada num parâmetro da tarefa seguinte, em vez de usar taskValues.get. Valores precisam ser JSON, com até 48 KiB, e set e get funcionam só em notebooks Python.",
            "Referências dinâmicas usam chaves duplas e podem ficar em parâmetros de job ou de tarefa, mas notebooks não as leem diretamente."
          ],
          armadilha: "Se um parâmetro de tarefa repete a chave de um parâmetro do job, a documentação consultada não diz qual vale. Evite chaves repetidas.",
          fonte: ["Referências a valores dinâmicos", "https://docs.databricks.com/aws/en/jobs/dynamic-value-references"]
        },
        {
          t: "Agenda: cron e gatilhos",
          facil: "Traduzindo: a agenda é um relógio em sintaxe cron; você pode criá-la e deixá-la pausada.",
          p: [
            "Para criar: abra o job, no painel Job details clique em Add trigger, defina Trigger type como Scheduled e escolha o tipo de agenda, Simple ou Advanced. Na avançada você define período, hora de início e fuso, e Show Cron Syntax mostra e permite editar a expressão em Quartz Cron Syntax. Com fuso que tem horário de verão, jobs horários podem ser pulados ou atrasados em uma ou duas horas; para horários absolutos, use UTC.",
            "Limites: há um mínimo de 10 segundos entre execuções agendadas, e o agendador não serve para baixa latência, podendo atrasar alguns minutos. Para pausar, na seção Schedules & Triggers clique em Pause (execuções em andamento continuam); Resume retoma. Você também pode ajustar Trigger Status para Paused ou Active na janela do gatilho.",
            "Outros gatilhos listados: table update, file arrival, continuous e execução manual."
          ],
          dica: "Em portfólio, deixe a agenda criada e pausada: o repositório mostra a configuração sem gastar sua cota.",
          fonte: ["Agendas e gatilhos de jobs", "https://docs.databricks.com/aws/en/jobs/scheduled"]
        },
        {
          t: "Retries, timeout e concorrência",
          facil: "Traduzindo: retry tenta de novo quando algo falha; timeout corta o que demora demais.",
          p: [
            "Na configuração da tarefa, em Retries você adiciona uma política de repetição. O intervalo é medido em milissegundos, do início da execução que falhou até o início da repetição. Por padrão, na maioria das configurações, tarefas com falha não são repetidas; jobs serverless otimizam retries automaticamente. Se você define Timeout e Retries, o timeout vale para cada tentativa.",
            "Em Metric thresholds, escolha Run duration para definir um Warning (dispara um evento que pode virar notificação) e um Timeout (o status vira Timed Out). No nível do job, Max concurrent runs tem padrão 1: se o limite é atingido, a nova execução é pulada, a menos que a fila (Queue) esteja ligada, caso em que ela espera até 48 horas."
          ],
          armadilha: "Retry em tarefa que grava dados precisa ser idempotente. Repetir uma carga que anexa linhas pode duplicar o resultado.",
          fonte: ["Configurar tarefas", "https://docs.databricks.com/aws/en/jobs/configure-task"]
        },
        {
          t: "Notificações e histórico de execuções",
          facil: "Traduzindo: configure um e-mail para falhas e use a aba Runs como diário de bordo.",
          p: [
            "Em Job details, role até Job notifications, clique em Edit notifications e depois Add notification. Em Destination escolha Email address (ou um destino de sistema como Slack, criado por um admin), marque os eventos (Start, Success, Failure, Duration warning) e salve. Notificações do job não disparam em retries; para alerta em cada falha de tarefa use notificações de tarefa. Execuções que terminam com falhas contam como sucesso, então marque Success se quiser avisos nesse caso.",
            "Para o histórico, abra Jobs & Pipelines e clique no nome do job para ver a aba Runs, em matriz ou lista. A aba Runs geral lista execuções dos últimos 60 dias. O link de Start time abre a página de detalhes, com as visões Graph, Timeline e List. O Databricks guarda o histórico por 60 dias: para guardar mais, exporte antes. Os status incluem Succeeded, Failed, Skipped, Timed Out e Canceled."
          ],
          fonte: ["Notificações de jobs", "https://docs.databricks.com/aws/en/jobs/notifications"]
        },
        {
          t: "Limites na Free Edition",
          facil: "Traduzindo: dá para montar jobs, mas só com compute serverless e poucas tarefas ao mesmo tempo.",
          p: [
            "A página de limitações da Free Edition informa que só existe compute serverless e que jobs podem rodar até cinco tarefas concorrentes por conta. Há também a cota de uso justo: ao excedê-la, o compute fica indisponível pelo resto do dia (em casos extremos, do mês). Confira a página oficial para os números atuais, que podem mudar.",
            "A página da Free Edition não detalha limites de agenda nem de notificações; a doc geral de notificações menciona destinos de sistema que exigem um administrador. Por isso, no lab, use notificação por e-mail e, se o recurso não estiver disponível na sua conta, registre isso no README. Lembre que a Free Edition é para uso não comercial."
          ],
          fonte: ["Limitações da Databricks Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: três tarefas, uma falha",
        texto: "Um job tem três tarefas: ingestao, transformacao e verificacao, cada uma dependendo da anterior com Run if All succeeded. O job tem o parâmetro data_ref. A ingestão conta os arquivos novos do Volume e grava o resultado com taskValues.set. A verificação recebe esse número por referência dinâmica num parâmetro e dispara um erro se for zero. Na segunda-feira, o Volume está vazio: a ingestão grava zero, a transformação roda sem problema, e a verificação falha com a mensagem clara, gerando o e-mail de falha. Como a transformação tem uma política de retry, ela tentou de novo uma vez antes de seguir. Na aba Runs, a matriz mostra a tarefa vermelha, e o grafo mostra onde parou. A agenda diária continua pausada, então ninguém é incomodado fora do horário."
      },
      prova: [
        "Em entrevista: explique job, tarefa, dependência e gatilho, e diga como você evita que uma tarefa rode depois de uma falha upstream (Run if).",
        "No trabalho: mostre como passar parâmetros e resultados entre tarefas sem acoplar notebooks, citando referências dinâmicas.",
        "Em entrevista: compare Lakeflow Jobs com Airflow ou Prefect, que você já usa, em dependências, agenda cron, retries e histórico.",
        "No trabalho: saber configurar retries idempotentes, timeouts e alertas de falha por e-mail mostra preocupação com operação, não só com código."
      ],
      explique: "Explique com suas palavras como um job encadeia três tarefas, passa um número da primeira para a terceira e avisa você quando algo falha, sem rodar a agenda.",
      checagem: [
        "Qual a diferença entre Depends on e Run if dependencies, e qual o padrão do segundo?",
        "Como uma tarefa passa um valor para a tarefa seguinte, e qual forma de leitura a documentação recomenda?",
        "Como você cria uma agenda cron e a deixa pausada, e o que acontece com execuções em andamento ao pausar?"
      ]
    },
    fontes: [
      ["Lakeflow Jobs: visão geral", "https://docs.databricks.com/aws/en/jobs/"],
      ["Blog: Lakeflow Jobs, antes Databricks Workflows", "https://www.databricks.com/blog/from-airflow-to-lakeflow-data-first-orchestration"],
      ["Configurar um job", "https://docs.databricks.com/aws/en/jobs/configure-job"],
      ["Configurar tarefas", "https://docs.databricks.com/aws/en/jobs/configure-task"],
      ["Run if dependencies", "https://docs.databricks.com/aws/en/jobs/run-if"],
      ["Agendas e gatilhos", "https://docs.databricks.com/aws/en/jobs/scheduled"],
      ["Tipos de gatilho e pausa", "https://docs.databricks.com/aws/en/jobs/triggers"],
      ["Task values", "https://docs.databricks.com/aws/en/jobs/task-values"],
      ["Monitorar jobs", "https://docs.databricks.com/aws/en/jobs/monitor"],
      ["Quickstart de jobs", "https://docs.databricks.com/aws/en/jobs/jobs-quickstart"]
    ],
    cartoes: [
      { id: "a7c1", f: "Qual o nome atual de Workflows?", v: "Lakeflow Jobs: a documentação atual o descreve como automação de fluxos de trabalho; um blog oficial da Databricks o chama de antigo Databricks Workflows.", t: "d7" },
      { id: "a7c2", f: "Job, tarefa e gatilho", v: "Job é o recurso principal; tarefa é uma unidade de trabalho dentro dele; gatilho inicia o job por tempo ou evento.", t: "d7" },
      { id: "a7c3", f: "Qual o padrão do Run if dependencies?", v: "All succeeded: a tarefa só roda quando todas as dependências tiveram sucesso; senão fica como Upstream failed.", t: "d7" },
      { id: "a7c4", f: "Quando usar All done?", v: "Em tarefas que devem rodar depois que todas as dependências terminam, qualquer que seja o resultado, como limpeza ou aviso.", t: "d7" },
      { id: "a7c5", f: "Como referenciar um parâmetro do job?", v: "Com a referência dinâmica {{job.parameters.nome}}, usada em parâmetros de tarefa; notebooks leem via dbutils.widgets.", t: "d7" },
      { id: "a7c6", f: "Como passar um valor entre tarefas?", v: "Grave com dbutils.jobs.taskValues.set e leia com {{tasks.tarefa.values.chave}} num parâmetro da tarefa seguinte (recomendado).", t: "d7" },
      { id: "a7c7", f: "Qual a sintaxe da agenda cron?", v: "Quartz Cron Syntax, visível em Show Cron Syntax na agenda Advanced; há mínimo de 10 segundos entre execuções.", t: "d7" },
      { id: "a7c8", f: "Como pausar uma agenda?", v: "Em Schedules & Triggers clique em Pause (ou Trigger Status Paused); execuções em andamento continuam, e Resume retoma.", t: "d7" },
      { id: "a7c9", f: "Como funcionam retries e timeout juntos?", v: "O timeout vale para cada tentativa; o intervalo do retry conta do início da execução que falhou até o início da repetição.", t: "d7" },
      { id: "a7c10", f: "Quanto tempo o histórico de execuções é guardado?", v: "A documentação diz que o Databricks guarda o histórico de execuções por 60 dias; exporte se precisar guardar mais.", t: "d7" }
    ],
    questoes: [
      {
        id: "a7q1", s: 1, t: "d7",
        e: "Um job tem as tarefas ingestao, transformacao e verificacao em cadeia, todas com Run if All succeeded. A ingestão falha por indisponibilidade da fonte. Qual o comportamento esperado das tarefas seguintes?",
        o: ["A transformação roda normalmente e só a verificação é marcada como falha", "As duas tarefas seguintes rodam com dados do dia anterior", "As tarefas seguintes não rodam e são marcadas como Upstream failed", "O job reinicia sozinho a ingestão até ela ter sucesso, sem configuração"],
        c: [2],
        x: "Com All succeeded, que é o padrão, a tarefa só roda se todas as dependências tiveram sucesso; caso contrário, ela é marcada como Upstream failed. Por isso transformação e verificação não rodam. Dizer que a transformação roda e só a verificação falha ignora a condição de dependência. Rodar com dados do dia anterior não é um comportamento do Jobs. O reinício automático só existe se você configurar uma política de retries, e mesmo assim ele repete a tarefa que falhou, sem liberar as seguintes antes de ela ter sucesso."
      },
      {
        id: "a7q2", s: 1, t: "d7",
        e: "Você quer que uma tarefa de limpeza dos arquivos temporários rode ao final do job, mesmo quando alguma tarefa anterior falhou. Qual configuração de Run if dependencies atende a isso?",
        o: ["All succeeded, que é o padrão e roda em qualquer cenário", "All failed, porque ela deve rodar só em falhas", "None failed, para rodar apenas quando nenhuma falhou", "All done, que roda depois que todas as dependências terminam, com qualquer resultado"],
        c: [3],
        x: "All done executa a tarefa depois que todas as dependências terminam, independentemente do resultado, o que serve para limpeza e avisos. All succeeded, o padrão, só roda se tudo deu certo: numa falha a tarefa ficaria como Upstream failed. All failed exige que todas as dependências tenham falhado e, se alguma teve sucesso, a tarefa fica Excluded. None failed roda apenas quando nenhuma dependência falhou, o oposto do que se quer."
      },
      {
        id: "a7q3", s: 1, t: "d7",
        e: "A tarefa ingestao grava a quantidade de arquivos processados com dbutils.jobs.taskValues.set. A tarefa verificacao precisa desse número para decidir se falha. Segundo a documentação, qual a forma recomendada de entregar o valor à verificação?",
        o: ["Escrever o número numa tag do catálogo e lê-la na verificação", "Usar um parâmetro da tarefa verificacao com a referência dinâmica que aponta ao valor da tarefa ingestao", "Ler o número do histórico de execuções da aba Runs por meio de um notebook", "Fazer a ingestão gravar o valor em outra tarefa por variável global do Python compartilhada"],
        c: [1],
        x: "A doc recomenda referenciar task values com a referência dinâmica no formato tasks, nome da tarefa, values, nome do valor, colocada num parâmetro da tarefa seguinte, em vez de usar taskValues.get. Tags servem para classificar objetos do catálogo, não para trafegar resultados entre tarefas, e seriam texto simples replicado. O histórico da aba Runs é para acompanhar execuções, não um canal de dados entre tarefas. Variáveis globais de Python não atravessam tarefas, que são execuções separadas, possivelmente em compute diferente."
      },
      {
        id: "a7q4", s: 1, t: "d7",
        e: "Você criou um job com agenda diária para o portfólio, mas não quer gastar a cota da Free Edition com execuções automáticas durante a semana. Quais ações mantêm a configuração visível e sem execuções automáticas? (Escolha duas)",
        o: ["Clicar em Pause no gatilho, na seção Schedules & Triggers do painel Job details", "Definir o Trigger Status do gatilho como Paused na janela do gatilho", "Apagar o notebook da primeira tarefa e manter o gatilho ativo", "Definir Max concurrent runs como 0 e manter o gatilho ativo"],
        c: [0, 1],
        x: "A doc descreve duas formas de deixar o gatilho parado: o botão Pause em Schedules & Triggers e o Trigger Status definido como Paused na janela do gatilho; execuções em andamento continuam, mas nenhuma nova é iniciada, e Resume retoma. Apagar o notebook mantém o gatilho ativo e só garante que cada execução vai falhar, ainda consumindo recursos. Max concurrent runs é um limite de execuções simultâneas (padrão 1) e não consta como forma de desligar a agenda; um valor assim não pausa o gatilho."
      },
      {
        id: "a7q5", s: 1, t: "d7",
        e: "Uma tarefa de transformação falha de vez em quando por instabilidade temporária e você configurou 2 retries e um timeout de 10 minutos. Como esses dois ajustes interagem segundo a documentação?",
        o: ["O timeout só vale para a primeira tentativa; as repetições não têm limite de tempo", "O timeout se aplica a cada tentativa, e o intervalo do retry é contado do início da execução que falhou até o início da repetição", "O timeout é dividido igualmente entre as tentativas", "Os retries são desativados automaticamente quando há timeout definido"],
        c: [1],
        x: "A documentação diz que, quando Timeout e Retries estão configurados, o timeout se aplica a cada retry, e que o intervalo de retry é medido do início da execução com falha até o início da execução de repetição. Dizer que só a primeira tentativa tem limite está errado, e dividir o timeout entre tentativas não é descrito em lugar algum. Retries não são desativados pela presença de timeout: são configurações complementares. Lembre ainda que tarefas que gravam dados precisam ser idempotentes para repetir sem duplicar."
      },
      {
        id: "a7q6", s: 1, t: "d7",
        e: "Você foi consultar na semana seguinte o histórico de uma execução de um job de teste de 70 dias atrás para anexar ao README e não a encontra na aba Runs. Qual explicação é compatível com a documentação, e o que fazer da próxima vez?",
        o: ["O Databricks guarda o histórico de execuções por 60 dias, então a execução expirou; exporte ou tire print antes", "A Free Edition não grava histórico de execuções de jobs", "O histórico só aparece para jobs com agenda ativa", "As execuções manuais com Run now nunca são registradas na aba Runs"],
        c: [0],
        x: "A página de monitoramento afirma que o Databricks guarda o histórico de execuções por 60 dias, e recomenda exportar antes de expirar se for preciso guardar mais. Por isso uma execução de 70 dias atrás não aparece. A ideia de que a Free Edition não grava histórico não consta na página de limitações. A doc não condiciona o histórico a ter agenda ativa. Execuções manuais por Run now aparecem na aba Runs, tanto que o quickstart manda abrir a aba Runs depois de usá-lo."
      }
    ],
    lab: {
      t: "Job de três tarefas encadeadas, com agenda pausada",
      custo: "gratuito na Free Edition (compute serverless dentro da cota de uso justo; confira a página oficial de limitações). Execute poucas vezes. Nenhum passo pede cartão de crédito.",
      tempo: "40 a 60 min",
      porque: "É a parte de orquestração do projeto Orquestração, governança e CI do lakehouse: um job versionável com tarefas, parâmetros, retries, notificação e agenda desligada.",
      antes: "Você precisa das tabelas das aulas 5 e 6 (schema medallion) e de três notebooks Python que criará no passo 1. Os passos foram conferidos contra a documentação oficial e NÃO foram executados: rótulos podem ter mudado. Na tela, a doc descreve Jobs & Pipelines, depois Create e Job, e o painel Job details à direita. Troque os nomes entre colchetes angulares pelos seus. A leitura do parâmetro usa dbutils.widgets, conforme a página de jobs com notebooks; confira se um widget com valor padrão é preciso na sua versão.",
      passos: [
        { t: "Criar os três notebooks", cmd: "```python\n# 01_ingestao\ndbutils.widgets.text('data_ref', '2025-01-01')\narquivos = dbutils.fs.ls('/Volumes/<catalogo>/estudo/ingestao/chegada/')\ndbutils.jobs.taskValues.set(key = 'arquivos', value = len(arquivos))\nprint(dbutils.widgets.get('data_ref'), len(arquivos))\n\n# 02_transformacao\nfrom pyspark.sql import functions as F\n(spark.read.table('<catalogo>.medallion.silver_eventos')\n  .groupBy('tipo').agg(F.sum('valor').alias('valor_total'))\n  .write.mode('overwrite').saveAsTable('<catalogo>.medallion.gold_valor_por_tipo_job'))\n\n# 03_verificacao\ndbutils.widgets.text('arquivos', '0')\nif int(dbutils.widgets.get('arquivos')) == 0:\n    raise Exception('Nenhum arquivo na ingestao')\nn = spark.read.table('<catalogo>.medallion.gold_valor_por_tipo_job').count()\nassert n > 0, 'gold vazia'\n```", p: "Crie um notebook Python para cada bloco, em células próprias, num Git folder ou pasta do workspace. Ajuste caminhos e nomes de colunas aos do seu dataset." },
        { t: "Criar o job e a primeira tarefa", p: "Jobs & Pipelines, Create, Job. Clique no bloco Notebook, nomeie a tarefa ingestao, escolha o notebook 01_ingestao em Path e clique em Save task. Renomeie o job (por exemplo, lakehouse_diario)." },
        { t: "Encadear as outras tarefas", p: "Clique no ícone de mais, Add task, Notebook: nome transformacao, notebook 02, e confirme que Depends on é ingestao e Run if dependencies é All succeeded. Repita com verificacao dependendo de transformacao. Na verificacao, em Parameters, clique em Add: Key arquivos, Value {{tasks.ingestao.values.arquivos}}." },
        { t: "Parâmetro, retry e notificação", p: "No Job details, adicione o parâmetro de job data_ref com um valor de exemplo. Na tarefa transformacao, em Retries, configure 1 repetição. Em Job notifications, Edit notifications, Add notification, escolha Email address, marque Failure e salve." },
        { t: "Criar a agenda e deixá-la pausada", p: "Em Job details, Add trigger, Trigger type Scheduled, Schedule type Advanced; use Show Cron Syntax para ver a expressão Quartz (por exemplo, uma execução diária pela manhã, conferindo a sintaxe na página oficial). Salve e, em Schedules & Triggers, clique em Pause (ou defina Trigger Status como Paused)." },
        { t: "Executar manualmente e inspecionar", p: "Clique em Run now, abra a aba Runs, o link de Start time e as visões Graph e Timeline. Depois use Run now with different parameters para trocar data_ref. Para provocar a falha da verificação, esvazie temporariamente a pasta do Volume (só se for seguro) e veja o e-mail e o status." },
        { t: "Guardar a entrega", p: "No repositório databricks-lakehouse-portfolio, crie 04-orchestration com os três notebooks (.py ou .ipynb exportados), um README em inglês descrevendo a cadeia, o parâmetro, o retry e a agenda pausada, e um print do grafo de uma execução." }
      ],
      verificar: "Uma execução manual mostra as três tarefas em sequência com status Succeeded no Graph, a tabela gold_valor_por_tipo_job existe e o gatilho aparece como Paused no painel Job details.",
      limpar: [
        "Confirme que a agenda está pausada e, se não for mais usar, apague o job para liberar recursos.",
        "Não deixe retries altos nem agenda ativa: a cota da Free Edition é limitada.",
        "Commitar: notebooks, README em inglês e print do grafo. NUNCA commitar: e-mail pessoal nas notificações, tokens ou URL de workspace sem cortar em prints.",
        "Guarde a configuração (print ou JSON do job): a aula 8 recria o job como código em um bundle."
      ],
      erros: [
        { s: "A verificação falha dizendo que o valor de arquivos é a própria referência literal", c: "A referência dinâmica foi digitada com erro e é tratada como texto literal (erros de sintaxe viram strings)", r: "Confira as chaves duplas e o nome exato da tarefa e do valor: {{tasks.ingestao.values.arquivos}}." },
        { s: "A tarefa não aparece como dependente da anterior", c: "A tarefa foi criada sem a anterior selecionada, e o campo Depends on só aparece com mais de uma tarefa", r: "Abra a tarefa, preencha Depends on e salve com Save task." },
        { s: "A execução fica na fila ou é pulada", c: "Já há uma execução em andamento e o limite de execuções concorrentes do job é 1, ou a cota de compute foi atingida", r: "Espere terminar, confira Max concurrent runs e a página de limitações da Free Edition." },
        { s: "Não chega e-mail de falha", c: "Notificação sem o evento Failure marcado, ou a falha foi só em retry (o job não notifica retries)", r: "Revise Edit notifications e, se precisar de alerta por tarefa, use notificações de tarefa." }
      ]
    }
  };
  C.dias[8] = {
    aula: {
      titulo: "Engenharia de software: Git, bundles e CI",
      resumo: "Como tratar o lakehouse como código: Git folders no workspace, testes com pytest fora do notebook, bundles (Declarative Automation Bundles) com databricks.yml, comandos validate, deploy e run, ambientes dev e prod e CI no GitHub Actions.",
      simples: {
        analogia: "Imagine que você escreve a receita da sua melhor lasanha só de cabeça e cozinha sempre na mesma panela. Se a panela quebra, a receita some junto. Agora imagine que você anota a receita num caderno com histórico, que alguém prova a massa antes de ir para a mesa, e que existe uma ficha que descreve a cozinha inteira: fogão, panelas e horários. Com essa ficha, você monta a mesma cozinha em outra casa com um comando. Antes de cada jantar, um assistente confere a ficha e prova a receita sozinho, sem acesso à despensa. É isso: Git guarda o caderno, pytest prova a receita, o bundle descreve a cozinha, e a integração contínua é o assistente que confere tudo a cada mudança.",
        pontos: [
          "Git folders levam um repositório Git para dentro do workspace, com commit e push pela interface.",
          "Lógica que não depende do Spark vira módulo Python testado com pytest, fora do notebook.",
          "O bundle descreve jobs e pipelines em YAML, em databricks.yml, e se implanta como unidade.",
          "A CLI valida, implanta e roda o bundle: bundle validate, bundle deploy e bundle run.",
          "No GitHub Actions, credenciais ficam em secrets, nunca no repositório."
        ],
        paraQueServe: "Entregar um repositório que qualquer pessoa clona, testa e implanta, com histórico, testes automáticos e configuração como código, o que diferencia um projeto de portfólio de um conjunto de notebooks."
      },
      glossario: [
        { t: "Git folder", d: "Cliente Git visual dentro do workspace que integra repositórios Git, com clone, branches, commit e push pela interface." },
        { t: "pytest", d: "Framework de testes de Python; descobre arquivos test_*.py ou *_test.py e usa assert simples nas funções com prefixo test_." },
        { t: "Bundle", d: "Projeto como código que descreve jobs, pipelines e arquivos e os implanta como unidade; hoje se chama Declarative Automation Bundles (antes Databricks Asset Bundles)." },
        { t: "databricks.yml", d: "Arquivo único e obrigatório na raiz do bundle, com nome do bundle, includes, resources, targets e variáveis." },
        { t: "Target", d: "Ambiente nomeado de implantação dentro do bundle, como dev e prod; só um pode ter default: true." },
        { t: "Databricks CLI", d: "Ferramenta de linha de comando usada para validar, implantar e executar bundles, entre outras tarefas." },
        { t: "Secret do GitHub", d: "Valor guardado nas configurações do repositório e lido no workflow como ${{ secrets.NOME }}, sem aparecer no código." },
        { t: "CI", d: "Integração contínua: workflow automático que roda testes e validações a cada push ou pull request." }
      ],
      blocos: [
        {
          t: "Git folders: o repositório dentro do workspace",
          facil: "Traduzindo: um Git folder é um repositório do GitHub aberto dentro do Databricks, com botão de commit e push.",
          p: [
            "A documentação descreve Git folders como um cliente Git visual e uma API que integra repositórios Git ao workspace, para desenvolver código em notebooks e arquivos com controle de versão, colaboração e CI/CD. Para clonar: no menu lateral abra Workspace, navegue até a pasta, Create, Git folder, e preencha a URL do repositório, o provedor Git e o nome. Você precisa de CAN MANAGE na pasta pai e de credenciais Git configuradas no workspace.",
            "Para branches: abra o diálogo Git, clique em Create Branch, informe o nome e a base. Para salvar: escreva a mensagem de commit (obrigatória) e clique em Commit & Push. Sem permissão na branch padrão, crie uma branch e abra o pull request pela interface do provedor. Para as credenciais do GitHub, a doc remete à página Connect your Git provider to Databricks: confira lá."
          ],
          dica: "Trabalhe sempre numa branch própria e abra pull request: é o fluxo que o CI do fim da aula vai validar.",
          fonte: ["Criar e gerenciar Git folders", "https://docs.databricks.com/aws/en/repos/git-operations-with-repos"]
        },
        {
          t: "Código testável fora do notebook",
          facil: "Traduzindo: tire as funções do notebook, ponha num arquivo .py e teste com pytest, sem precisar de cluster.",
          p: [
            "A página de boas práticas de engenharia de software mostra um fluxo: mover funções auxiliares para um módulo compartilhado (no exemplo, covid_analysis/transforms.py), declarar dependências em requirements.txt na raiz e criar testes em tests/. O notebook passa a importar o módulo, e o mesmo módulo é testado sozinho. A doc também sugere um job em que uma tarefa roda os testes e a seguinte depende dela, ambas usando a versão commitada do Git, e adverte contra o botão de agenda do notebook para isso, porque ele usa a cópia de trabalho.",
            "Regra prática: lógica pura (limpar texto, calcular faixa, validar valor) vai para funções Python simples. Transformações de DataFrame podem ser testadas com Spark local ou em job, mas começar pelo que não precisa de Spark deixa o CI rápido e gratuito."
          ],
          fonte: ["Boas práticas de engenharia de software para notebooks", "https://docs.databricks.com/aws/en/notebooks/best-practices"]
        },
        {
          t: "pytest em cinco minutos",
          facil: "Traduzindo: escreva funções que começam com test_ e usam assert; o pytest acha e roda todas.",
          p: [
            "Segundo a documentação do pytest, você instala num ambiente virtual com `python3 -m venv .venv`, ativa com `source .venv/bin/activate` (no Windows, `.venv\\Scripts\\activate`) e roda `pip install -U pytest`. Funções de teste têm prefixo test_ e a verificação é um assert simples; em caso de falha, o pytest mostra os valores intermediários. A descoberta procura, no diretório atual e nos subdiretórios, arquivos test_*.py ou *_test.py.",
            "```python\n# src/transformacoes.py\ndef normalizar_valor(texto):\n    return float(str(texto).replace(',', '.'))\n\n# tests/test_transformacoes.py\nfrom src.transformacoes import normalizar_valor\n\ndef test_virgula_decimal():\n    assert normalizar_valor('12,5') == 12.5\n```",
            "Se a importação falhar por causa da estrutura de pastas, uma solução comum é criar um arquivo vazio __init__.py em src e tests, ou ajustar o caminho de importação; confira a documentação do pytest sobre layouts de projeto."
          ],
          fonte: ["pytest: primeiros passos", "https://docs.pytest.org/en/stable/getting-started.html"]
        },
        {
          t: "Bundles: o novo nome e a ideia",
          facil: "Traduzindo: um bundle é a descrição, em arquivos, do que você quer no workspace; o comando de deploy faz o resto.",
          p: [
            "O nome atual na documentação é Declarative Automation Bundles, antes Databricks Asset Bundles. A página os descreve como uma ferramenta para adotar boas práticas de engenharia de software em projetos de dados e IA, tratando o projeto como infraestrutura como código. Um bundle pode incluir configuração de recursos (jobs, pipelines, dashboards), arquivos-fonte como notebooks e Python, e testes, e é implantado num ambiente de destino como uma unidade.",
            "Requisitos: Databricks CLI na versão 0.218.0 ou superior (confira com `databricks -v`), arquivos de workspace habilitados e a CLI configurada para o seu workspace. A doc recomenda autenticação OAuth usuário-máquina (U2M) para uso pessoal. Também é possível usar bundles dentro do workspace, sem instalar a CLI."
          ],
          armadilha: "Se um tutorial antigo falar em Databricks Asset Bundles, é o mesmo recurso com nome anterior; os comandos da CLI continuam sob databricks bundle.",
          fonte: ["Declarative Automation Bundles (visão geral)", "https://docs.databricks.com/aws/en/dev-tools/bundles/"]
        },
        {
          t: "databricks.yml e um job como código",
          facil: "Traduzindo: o databricks.yml dá nome ao bundle, aponta para os recursos e lista os ambientes.",
          p: [
            "Cada bundle tem um, e só um, arquivo databricks.yml na raiz. A chave bundle (com name) é obrigatória; include carrega outros arquivos por caminho ou padrão; resources declara jobs, pipelines e outros objetos; targets nomeia os ambientes, e só um pode ter default: true. A doc recomenda definir workspace.host no target para que a CLI encontre o perfil correspondente.",
            "```yaml\n# databricks.yml\nbundle:\n  name: lakehouse_portfolio\ninclude:\n  - resources/*.yml\ntargets:\n  dev:\n    mode: development\n    default: true\n    workspace:\n      host: https://<seu-workspace>\n```",
            "```yaml\n# resources/lakehouse_job.yml\nresources:\n  jobs:\n    lakehouse_diario:\n      name: lakehouse_diario\n      tasks:\n        - task_key: ingestao\n          notebook_task:\n            notebook_path: ../notebooks/01_ingestao.ipynb\n        - task_key: transformacao\n          depends_on:\n            - task_key: ingestao\n          notebook_task:\n            notebook_path: ../notebooks/02_transformacao.ipynb\n```",
            "A estrutura de tarefas com depends_on (lista com task_key) e notebook_task (a doc usa notebook_path: ./my-notebook.ipynb) segue a página de tipos de tarefa de job em bundles. Ela não explica como resolver caminhos relativos a partir da subpasta resources nem qual compute usar na Free Edition: confira os campos exatos lá e ajuste os caminhos se o validate reclamar."
          ],
          fonte: ["Configurações do bundle (databricks.yml)", "https://docs.databricks.com/aws/en/dev-tools/bundles/settings"]
        },
        {
          t: "CLI: validate, deploy e run",
          facil: "Traduzindo: validar confere a ficha, implantar cria os recursos no workspace e rodar executa o job.",
          p: [
            "O ciclo documentado: `databricks bundle init` cria um projeto a partir de um template; editar os YAMLs; `databricks bundle validate` confere a configuração, rodado na raiz do bundle; `databricks bundle deploy` implanta no workspace do target; `databricks bundle run <chave-do-recurso>` executa um job ou pipeline pela chave (`-t dev` escolhe o target; sem ele, vale o default); `databricks bundle destroy` apaga o que foi implantado, e `--auto-approve` pula a confirmação.",
            "Instalação da CLI: no Windows, `winget install Databricks.DatabricksCLI`; no macOS, Homebrew; no Linux, o script de instalação do repositório oficial. Para conferir, `databricks -v`. O login local por OAuth usa `databricks auth login --host <url-do-workspace>`; a página de OAuth U2M manda seguir as instruções no navegador."
          ],
          tabela: {
            cab: ["Comando", "O que faz"],
            linhas: [
              ["databricks bundle validate", "Confere a configuração na raiz do bundle"],
              ["databricks bundle deploy --target dev", "Implanta os recursos no workspace do target"],
              ["databricks bundle run lakehouse_diario", "Executa o job pela chave do recurso"],
              ["databricks bundle destroy", "Apaga recursos implantados (irreversível)"]
            ]
          },
          fonte: ["Ciclo de vida do bundle", "https://docs.databricks.com/aws/en/dev-tools/bundles/work-tasks"]
        },
        {
          t: "Ambientes dev e prod",
          facil: "Traduzindo: o mesmo bundle serve para dev (mais solto e seguro) e prod (mais rígido).",
          p: [
            "Com `mode: development` no target, a doc lista efeitos: prefixa os nomes dos recursos com [dev seu_usuario] e marca jobs e pipelines com a tag dev, marca pipelines como development, pausa agendas e gatilhos (para retomar um job, defina pause_status como UNPAUSED), habilita execuções concorrentes e desabilita o bloqueio de implantação.",
            "Com `mode: production`, a validação exige pipelines com development: false, confere se a branch Git atual corresponde à do target (--force ignora), e recomenda service principals via run_as; sem eles, valida que caminhos não dependem de um usuário e que run_as e permissions estão definidos. Na Free Edition, que tem um workspace por conta, prod é conceitual: use dev e documente como seria o prod."
          ],
          armadilha: "Não rode bundle deploy em modo production no seu workspace de estudos esperando que passe a validação: ela pede run_as e permissions.",
          fonte: ["Modos de implantação", "https://docs.databricks.com/aws/en/dev-tools/bundles/deployment-modes"]
        },
        {
          t: "Autenticação e segredos no GitHub Actions",
          facil: "Traduzindo: o CI precisa de um token, mas ele fica nos secrets do GitHub, nunca no código.",
          p: [
            "Para CI/CD, a doc de autenticação de bundles prefere OAuth máquina-a-máquina (M2M) com service principal, tendo o token pessoal ligado a um service principal como alternativa; as configurações ficam como variáveis de ambiente do sistema de CI. A página de GitHub Actions mostra DATABRICKS_HOST e DATABRICKS_TOKEN, e um segredo do repositório (por exemplo SP_TOKEN) mapeado para DATABRICKS_TOKEN.",
            "No GitHub, o secret se cria em Settings, Secrets and variables, Actions, New repository secret, e se lê com `${{ secrets.NOME }}` em env ou with. Se o secret não existe, a expressão vira string vazia, e secrets não são passados a workflows de forks (GITHUB_TOKEN é exceção). A action databricks/setup-cli instala a CLI no workflow. Um token pessoal (PAT) se cria em Settings, Developer, Access tokens, com tempo de vida em dias; a doc o trata como alternativa menos segura que OAuth, e tokens sem uso por 90 dias são revogados.",
            "```yaml\nname: ci\non:\n  pull_request:\n  push:\n    branches: [main]\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: |\n          python3 -m venv .venv\n          source .venv/bin/activate\n          pip install -U pytest\n          pytest\n  bundle:\n    runs-on: ubuntu-latest\n    env:\n      DATABRICKS_HOST: ${{ secrets.DATABRICKS_HOST }}\n      DATABRICKS_TOKEN: ${{ secrets.DATABRICKS_TOKEN }}\n    steps:\n      - uses: actions/checkout@v4\n      - uses: databricks/setup-cli@main\n      - run: databricks bundle validate --target dev\n```"
          ],
          armadilha: "Não imprima o token com echo nem o grave em arquivo. Se um token vazar num commit, revogue-o na hora.",
          fonte: ["CI/CD com GitHub Actions no Databricks", "https://docs.databricks.com/aws/en/dev-tools/ci-cd/github"]
        },
        {
          t: "O que a Free Edition permite",
          facil: "Traduzindo: git, testes e bundles funcionam como código, mas a documentação não garante token nem service principal na Free Edition.",
          p: [
            "A página de limitações da Free Edition informa: um workspace e um metastore por conta, sem console de conta nem APIs de nível de conta, só compute serverless e acesso de saída à internet restrito a domínios confiáveis. Ela não cita Git folders, CLI, bundles nem secrets, então trate o que segue como a ser confirmado por você.",
            "Sobre credenciais: a página de tokens pessoais não menciona a Free Edition e diz que admins podem desabilitar a criação de tokens. Como não há console de conta, service principals de nível de conta podem não estar disponíveis. Plano de contingência do lab: o job de testes do CI roda sem credenciais; o job de bundle é OPCIONAL e depende de você conseguir gerar um token. Se não conseguir, rode validate e deploy localmente e documente isso no README."
          ],
          fonte: ["Limitações da Databricks Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: uma mudança, três verificações",
        texto: "Você altera a função normalizar_valor para aceitar também valores com ponto de milhar. Cria a branch ajuste-valor no Git folder, edita src/transformacoes.py, adiciona um teste novo em tests/ e roda pytest localmente: passa. Faz Commit & Push e abre um pull request. O workflow de CI dispara sozinho com dois jobs. O primeiro cria o ambiente virtual, instala pytest e roda os testes. O segundo instala a CLI com setup-cli e roda databricks bundle validate no target dev, usando secrets do repositório. Se o teste falhar, o pull request fica vermelho antes do merge. Depois do merge na main, você roda bundle deploy localmente para o target dev e bundle run para executar o job. A configuração do ambiente mora no databricks.yml, não na sua memória, e qualquer pessoa reproduz o processo clonando o repositório."
      },
      prova: [
        "Em entrevista: explique por que a lógica de transformação vai para módulos testáveis fora do notebook e como você testa sem depender de cluster.",
        "No trabalho: descreva o fluxo validate, deploy e run de um bundle e como separar dev e prod com targets e modos de implantação.",
        "Em entrevista: explique como você guarda credenciais em CI (secrets, OAuth M2M, service principal) e o que nunca faz (commitar token, imprimir em log).",
        "No trabalho: saber que Databricks Asset Bundles virou Declarative Automation Bundles evita confusão ao ler documentação e exemplos de épocas diferentes."
      ],
      explique: "Explique com suas palavras o caminho de uma mudança de código desde a branch até a validação no CI, dizendo o que o bundle descreve e onde ficam as credenciais.",
      checagem: [
        "O que o databricks.yml contém e qual a diferença entre os targets dev e prod em termos de modo de implantação?",
        "Quais comandos da CLI você usa, em ordem, para validar, implantar e executar um job de um bundle?",
        "Como o workflow do GitHub Actions lê o token do Databricks sem que ele apareça no repositório?"
      ]
    },
    fontes: [
      ["Git folders no Databricks", "https://docs.databricks.com/aws/en/repos/"],
      ["Criar e gerenciar Git folders", "https://docs.databricks.com/aws/en/repos/git-operations-with-repos"],
      ["Boas práticas para notebooks", "https://docs.databricks.com/aws/en/notebooks/best-practices"],
      ["Declarative Automation Bundles", "https://docs.databricks.com/aws/en/dev-tools/bundles/"],
      ["Ciclo de vida do bundle", "https://docs.databricks.com/aws/en/dev-tools/bundles/work-tasks"],
      ["Configurações do bundle", "https://docs.databricks.com/aws/en/dev-tools/bundles/settings"],
      ["Tipos de tarefa de job em bundles", "https://docs.databricks.com/aws/en/dev-tools/bundles/job-task-types"],
      ["Modos de implantação", "https://docs.databricks.com/aws/en/dev-tools/bundles/deployment-modes"],
      ["Autenticação de bundles", "https://docs.databricks.com/aws/en/dev-tools/bundles/authentication"],
      ["Instalar a Databricks CLI", "https://docs.databricks.com/aws/en/dev-tools/cli/install"],
      ["CI/CD com GitHub Actions", "https://docs.databricks.com/aws/en/dev-tools/ci-cd/github"],
      ["Tokens de acesso pessoal", "https://docs.databricks.com/aws/en/dev-tools/auth/pat"],
      ["Secrets no GitHub Actions", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions"],
      ["Quickstart do GitHub Actions", "https://docs.github.com/en/actions/writing-workflows/quickstart"],
      ["setup-cli (action do Databricks)", "https://github.com/databricks/setup-cli"]
    ],
    cartoes: [
      { id: "a8c1", f: "O que é um Git folder?", v: "Cliente Git visual dentro do workspace: clone, branches, commit e push pela interface, para versionar notebooks e arquivos.", t: "d8" },
      { id: "a8c2", f: "Como o pytest descobre testes?", v: "Procura no diretório atual e subdiretórios arquivos test_*.py ou *_test.py, e roda funções com prefixo test_.", t: "d8" },
      { id: "a8c3", f: "Qual o nome atual de Databricks Asset Bundles?", v: "Declarative Automation Bundles: a documentação atual usa esse nome e cita o anterior; os comandos seguem sob databricks bundle.", t: "d8" },
      { id: "a8c4", f: "O que é o databricks.yml?", v: "Arquivo único na raiz do bundle com bundle.name, include, resources, targets e variáveis; define o que e onde implantar.", t: "d8" },
      { id: "a8c5", f: "Comandos básicos do ciclo do bundle", v: "databricks bundle validate, databricks bundle deploy e databricks bundle run chave, com -t para escolher o target.", t: "d8" },
      { id: "a8c6", f: "O que faz mode: development?", v: "Prefixa nomes com [dev usuario], marca com tag dev, pausa agendas e gatilhos e habilita execuções concorrentes.", t: "d8" },
      { id: "a8c7", f: "O que exige mode: production?", v: "Pipelines com development false, branch Git correspondente ao target e recomendação de service principals via run_as.", t: "d8" },
      { id: "a8c8", f: "Como guardar o token no GitHub Actions?", v: "Em Settings, Secrets and variables, Actions, New repository secret, lido no workflow como secrets.NOME em env; nunca no código.", t: "d8" },
      { id: "a8c9", f: "Variáveis de ambiente para a CLI em CI", v: "DATABRICKS_HOST (URL do workspace) e DATABRICKS_TOKEN (token); a doc prefere OAuth M2M com service principal para CI.", t: "d8" },
      { id: "a8c10", f: "Que action instala a CLI no workflow?", v: "databricks/setup-cli, usada como passo uses; pode fixar a versão com um release tag ou o input version.", t: "d8" }
    ],
    questoes: [
      {
        id: "a8q1", s: 1, t: "d8",
        e: "Você roda databricks bundle validate na raiz do projeto e quer, em seguida, criar no workspace o job descrito nos YAMLs e depois executá-lo. Qual sequência de comandos segue o ciclo documentado?",
        o: ["bundle deploy e depois bundle run com a chave do job", "bundle run com a chave do job e depois bundle deploy", "bundle destroy e depois bundle run com a chave do job", "bundle init e depois bundle validate de novo"],
        c: [0],
        x: "O ciclo da documentação é criar, desenvolver, validar, implantar com bundle deploy e executar com bundle run usando a chave do recurso, opcionalmente com -t para escolher o target. Rodar antes de implantar não funciona, porque o job ainda não existe no workspace. bundle destroy apaga o que foi implantado, então executá-lo antes do run elimina o job. bundle init serve para criar um projeto a partir de um template, e repetir a validação não cria nem executa nada."
      },
      {
        id: "a8q2", s: 1, t: "d8",
        e: "Seu bundle tem os targets dev e prod. Você quer que, ao implantar em dev, os nomes dos jobs recebam um prefixo com seu usuário e as agendas fiquem pausadas, para não gastar cota. Qual configuração do target dev entrega isso?",
        o: ["mode: production, que prefixa nomes e pausa agendas", "default: true, que prefixa nomes e pausa agendas", "mode: development, que prefixa nomes, marca com tag dev e pausa agendas e gatilhos", "Nenhuma: prefixos e pausa só são possíveis editando cada job no workspace"],
        c: [2],
        x: "Com mode: development, a documentação lista os efeitos: prefixo [dev usuario] nos nomes de recursos, tag dev em jobs e pipelines, pausa de agendas e gatilhos (retomáveis com pause_status UNPAUSED) e execuções concorrentes habilitadas. mode: production faz o contrário, validando e endurecendo: exige run_as e permissões, não prefixa. default: true só indica qual target é usado quando você omite -t; não muda comportamento de implantação. Também é falso que seja preciso editar cada job à mão: o modo existe para isso."
      },
      {
        id: "a8q3", s: 1, t: "d8",
        e: "Seu workflow de CI precisa chamar a CLI do Databricks, e um colega propõe escrever o token direto no arquivo YAML do workflow, que está num repositório público, já que o token é só de teste. O que fazer?",
        o: ["Aceitar: tokens de teste não têm risco em repositório público", "Gravar o token num arquivo .env commitado e lê-lo no workflow", "Criar um repository secret e lê-lo no workflow com a expressão de secrets, mapeada para DATABRICKS_TOKEN em env", "Imprimir o token no log do workflow para conferir se está correto"],
        c: [2],
        x: "Secrets do repositório existem para isso: você cria em Settings, Secrets and variables, Actions, e o workflow lê com a expressão secrets, mapeando para DATABRICKS_TOKEN em env, sem expor o valor no código. Deixar o token no YAML de repositório público o expõe a qualquer pessoa, mesmo que seja de teste, pois ele ainda acessa o workspace. Um .env commitado tem o mesmo problema de exposição. Imprimir o token em log também o vaza e deve ser evitado. Se um token vazar, revogue-o imediatamente."
      },
      {
        id: "a8q4", s: 1, t: "d8",
        e: "Um repositório público tem o workflow de CI com o passo bundle validate usando secrets do Databricks. Uma pessoa externa abre um pull request a partir de um fork, e o passo falha por falta de credenciais. Qual explicação e qual cuidado combinam com a documentação do GitHub?",
        o: ["O GitHub bloqueou o repositório por conter secrets", "Secrets geralmente não são enviados ao runner em workflows de forks, exceto GITHUB_TOKEN; isso protege suas credenciais e é esperado", "O pytest apagou os secrets durante a execução dos testes", "O Databricks revoga o token sempre que há um pull request de fork"],
        c: [1],
        x: "A documentação do GitHub diz que secrets geralmente não são passados ao runner quando o workflow roda a partir de um repositório fork, e que GITHUB_TOKEN é a exceção. Isso explica a falha por falta de credenciais e é um comportamento de proteção. O repositório não é bloqueado por usar secrets: é o uso recomendado. Os testes com pytest não manipulam secrets do GitHub. E não há nada na documentação consultada sobre revogação de token por pull requests de forks. O cuidado prático é manter o job de testes sem credenciais, para que ele rode também em forks."
      },
      {
        id: "a8q5", s: 1, t: "d8",
        e: "Você quer testar a lógica de limpeza de valores do seu pipeline sem subir cluster e rodando em segundos no CI. Qual abordagem se alinha às boas práticas da documentação?",
        o: ["Manter a lógica dentro de células do notebook e testá-la manualmente a cada mudança", "Mover a lógica para um módulo Python importável e escrever testes pytest em tests/, rodados no CI", "Criar um segundo workspace só para testar e copiar os resultados à mão", "Escrever os testes como comentários no próprio notebook"],
        c: [1],
        x: "A doc de boas práticas mostra mover funções para um módulo compartilhado, declarar dependências e testá-las com pytest em uma pasta de testes, e depois rodar os testes em job ou CI. Testar manualmente em células não repete nem escala e não roda no CI. Um segundo workspace é desnecessário e, na Free Edition, a conta permite um workspace. Comentários em notebook documentam, mas não executam nada, então não falham quando o código quebra. Começar por funções puras mantém o CI rápido e gratuito."
      },
      {
        id: "a8q6", s: 1, t: "d8",
        e: "Ao ler um tutorial antigo, você vê comandos databricks bundle e o nome Databricks Asset Bundles, mas a documentação atual fala em Declarative Automation Bundles. Você precisa decidir se o tutorial serve para o seu projeto. Qual conclusão é segura?",
        o: ["São produtos diferentes e incompatíveis; o tutorial não serve", "Tratam-se do mesmo recurso com nome atualizado; confira na documentação atual os campos do YAML antes de copiar", "O recurso foi descontinuado e você deve usar apenas notebooks", "Só o nome da CLI mudou, e os comandos bundle foram removidos"],
        c: [1],
        x: "A página atual de bundles afirma que o recurso se chama Declarative Automation Bundles e foi antes Databricks Asset Bundles, descrevendo os mesmos conceitos e comandos de databricks bundle. Por isso o tutorial é aproveitável, com a ressalva de conferir a documentação atual para campos e sintaxe. Dizer que são produtos incompatíveis ou descontinuados contradiz a página. E os comandos bundle continuam documentados no ciclo de vida atual, com validate, deploy, run e destroy."
      }
    ],
    lab: {
      t: "Bundle mínimo e CI no GitHub Actions",
      custo: "gratuito: GitHub Actions em repositório público (confira a página oficial do GitHub para limites atuais) e Free Edition do Databricks. Os passos de deploy e de token são OPCIONAIS e consomem pouco da cota de compute; nenhum passo pede cartão de crédito.",
      tempo: "60 a 90 min",
      porque: "Completa o projeto Orquestração, governança e CI do lakehouse: o job da aula 7 vira código versionado, com testes e validação automática a cada pull request.",
      antes: "Você precisa de uma conta no GitHub, do repositório databricks-lakehouse-portfolio, de Python 3 e do job e dos notebooks da aula 7. Os passos foram conferidos contra a documentação oficial e NÃO foram executados: confira nomes de campos de YAML e rótulos na documentação. A documentação não confirma tokens pessoais nem service principals na Free Edition: se você não conseguir gerar um token, mantenha apenas o job de testes no CI e rode validate localmente. Troque os nomes entre colchetes angulares pelos seus e nunca coloque token no repositório.",
      passos: [
        { t: "Montar a estrutura do repositório", p: "Na pasta 05-bundle do repositório, crie: databricks.yml, resources/lakehouse_job.yml, notebooks/ (exportados da aula 7 como .ipynb), src/transformacoes.py e tests/test_transformacoes.py. Na raiz do repositório, crie .github/workflows/ci.yml. Crie também um .gitignore com .venv/ e .databrickscfg." },
        { t: "Escrever e rodar os testes localmente", cmd: "```bash\npython3 -m venv .venv\nsource .venv/bin/activate   # Windows: .venv\\Scripts\\activate\npip install -U pytest\npytest\n```", p: "Use as funções e testes do bloco de pytest da aula (normalizar_valor). Rode na raiz de 05-bundle. Para a falha, mude o valor esperado, veja a mensagem e corrija." },
        { t: "Escrever o bundle", cmd: "```yaml\n# databricks.yml\nbundle:\n  name: lakehouse_portfolio\ninclude:\n  - resources/*.yml\ntargets:\n  dev:\n    mode: development\n    default: true\n    workspace:\n      host: https://<seu-workspace>\n```", p: "Crie também resources/lakehouse_job.yml com as três tarefas e depends_on, como no bloco de databricks.yml da aula. Mantenha só o target dev: a Free Edition tem um workspace, e mode production exigiria run_as e permissões." },
        { t: "Instalar a CLI, autenticar e validar", cmd: "```bash\ndatabricks -v\ndatabricks auth login --host <url-do-workspace>\ndatabricks bundle validate --target dev\n```", p: "Instale a CLI conforme seu sistema (no Windows, winget install Databricks.DatabricksCLI). O login abre o navegador (OAuth). Corrija os erros que o validate apontar. A versão mínima para bundles é 0.218.0." },
        { t: "Implantar e executar em dev (OPCIONAL)", cmd: "```bash\ndatabricks bundle deploy --target dev\ndatabricks bundle run -t dev lakehouse_diario\n```", p: "Opcional: gasta um pouco da cota de compute. Em modo development, o nome do job ganha o prefixo [dev seu_usuario] e a agenda fica pausada. Ao terminar, rode databricks bundle destroy --target dev para apagar o que implantou." },
        { t: "Escrever o workflow de CI", p: "Crie .github/workflows/ci.yml com o job testes (checkout, venv, pip install -U pytest, pytest) e, OPCIONAL, o job bundle com setup-cli e bundle validate, como no bloco de CI da aula. Ajuste o caminho de trabalho para 05-bundle com working-directory se necessário, e commite numa branch." },
        { t: "Configurar secrets (OPCIONAL) e abrir o pull request", p: "Somente se conseguir um token: no Databricks, Settings, Developer, Access tokens, Generate new token, com tempo de vida curto; no GitHub, Settings, Secrets and variables, Actions, New repository secret: DATABRICKS_HOST e DATABRICKS_TOKEN. Abra um pull request, vá à aba Actions e confirme os jobs verdes. Tire um print." }
      ],
      verificar: "Localmente o pytest passa e o bundle validate termina sem erro; no GitHub, a aba Actions mostra o job testes verde no pull request (e o job bundle verde, se você configurou secrets).",
      limpar: [
        "Revogue o token de teste nas configurações do Databricks ao final, ou deixe-o com validade curta, e apague os secrets do GitHub se não for mais usar.",
        "Rode databricks bundle destroy --target dev se implantou, para não deixar job nem pipeline sobrando.",
        "Commitar: databricks.yml, resources, notebooks, src, tests, workflow, README em inglês, print da aba Actions e diagrama. NUNCA commitar: tokens, .databrickscfg, .env, URL de workspace com dados pessoais em prints, nem dados reais.",
        "Se um token for commitado por engano, revogue-o imediatamente: apagar o commit não basta."
      ],
      erros: [
        { s: "pytest não encontra o módulo src", c: "Estrutura de pastas ou diretório de execução diferente do esperado", r: "Rode na raiz de 05-bundle, crie __init__.py em src e tests, ou ajuste o caminho de importação conforme a documentação do pytest." },
        { s: "bundle validate pede autenticação ou não acha o workspace", c: "CLI sem login, ou workspace.host ausente ou errado no target", r: "Rode databricks auth login --host com a URL certa e confirme o host no databricks.yml. No CI, confira os secrets." },
        { s: "O job bundle do CI falha por credenciais vazias", c: "Secrets não criados, nome diferente do usado no workflow, ou PR vindo de fork (secrets não são passados)", r: "Crie os secrets com os nomes exatos, ou remova o job opcional e mantenha só os testes." },
        { s: "Erro no deploy sobre compute ou tipo de tarefa", c: "Campos do job incompatíveis com serverless ou com a Free Edition", r: "Compare com a página de tipos de tarefa de bundles e a de limitações da Free Edition; simplifique o job para notebook_task." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
