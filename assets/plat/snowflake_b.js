(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var F = "```";

  C.dias[17] = {
    aula: {
      titulo: "Desempenho: micro-partições, cache e dimensionamento",
      resumo: "Entenda como o Snowflake guarda a tabela em micro-partições, como o pruning evita ler dados à toa, quais caches existem, como ler o Query Profile e quando mexer no tamanho do warehouse.",
      simples: {
        analogia: "Imagine uma biblioteca enorme em que cada estante tem uma etiqueta dizendo o menor e o maior ano dos livros que guarda. Se você procura livros de 2023, nem entra nas estantes cuja etiqueta diz 1990 a 2005: você só abre as que podem ter o que procura. Isso é o pruning. Já o cache é o bibliotecário que, se você repete a mesma pergunta, entrega a resposta anotada sem ir às estantes, e a mesa de trabalho onde ficam os livros que você acabou de pegar. Dimensionar o warehouse é decidir quantos carrinhos de transporte usar: carrinho maior ajuda numa carga pesada, mais carrinhos ajudam quando muita gente pede ao mesmo tempo.",
        pontos: [
          "A tabela é dividida automaticamente em micro-partições, cada uma com metadados de faixa de valores.",
          "Pruning é pular micro-partições que o filtro da consulta não precisa.",
          "Existe cache de resultado (reuso de resposta) e cache de dados no warehouse que está ligado.",
          "O Query Profile mostra partições lidas versus total e se houve spilling.",
          "Tamanho maior ajuda consulta pesada; mais clusters ajudam concorrência.",
          "Clustering key é para tabelas muito grandes, não para toda tabela."
        ],
        paraQueServe: "Para você diagnosticar uma consulta lenta com evidência (partições lidas, cache, spilling) em vez de sair aumentando o warehouse, o que gasta crédito à toa."
      },
      glossario: [
        { t: "Micro-partição", d: "Unidade contígua de armazenamento criada automaticamente pelo Snowflake; guarda de 50 a 500 MB de dados não comprimidos, em formato colunar." },
        { t: "Pruning", d: "Poda: uso dos metadados de cada micro-partição para pular as que não podem conter linhas do filtro." },
        { t: "Clustering key", d: "Colunas ou expressões que você define com CLUSTER BY para o Snowflake organizar a tabela por elas." },
        { t: "Cache de resultado", d: "Resultado de consulta persistido que pode ser devolvido se a mesma consulta for repetida e as condições de reuso forem atendidas." },
        { t: "Cache do warehouse", d: "Dados de tabela mantidos pelo warehouse em execução; é perdido quando o warehouse suspende." },
        { t: "Query Profile", d: "Tela do Snowsight com o plano de execução da consulta, estatísticas por operador e indícios de problemas." },
        { t: "Spilling", d: "Gravação em disco (local ou remoto) de resultados intermediários que não couberam na memória do warehouse." },
        { t: "Multi-cluster warehouse", d: "Warehouse que pode ter vários clusters para atender muita concorrência; exige a edição Enterprise." }
      ],
      blocos: [
        {
          t: "Micro-partições: como a tabela é guardada",
          facil: "Traduzindo: você não escolhe como a tabela é fatiada; o Snowflake fatia sozinho e anota o que tem em cada fatia.",
          p: [
            "Segundo a documentação, o Snowflake divide automaticamente os dados de toda tabela em unidades contíguas de armazenamento chamadas micro-partições. Cada uma guarda entre 50 MB e 500 MB de dados não comprimidos (o dado é armazenado comprimido, então ocupa menos) em layout colunar. Você não define nem mantém essas partições.",
            "Para cada micro-partição o Snowflake registra metadados: a faixa de valores de cada coluna, o número de valores distintos e outras propriedades usadas na otimização. Esse é o combustível do pruning."
          ],
          lista: [
            "Ordem de inserção influencia como os valores se espalham pelas partições.",
            "Dentro das partições que sobram, o Snowflake lê só as colunas necessárias.",
            "Predicados com subconsulta não são usados no pruning, mesmo que a subconsulta devolva uma constante (segundo a página)."
          ],
          dica: "Escreva filtros diretos em colunas (por exemplo, data entre duas datas) para dar ao pruning o que ele precisa.",
          fonte: ["Micro-partitions & Data Clustering", "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions"]
        },
        {
          t: "Pruning e clustering keys",
          facil: "Traduzindo: clustering key é pedir ao Snowflake que mantenha a tabela organizada por certas colunas; vale para tabelas gigantes com filtros repetidos.",
          p: [
            "Clustering depth mede o quanto as micro-partições se sobrepõem para as colunas escolhidas: quanto menor, melhor agrupada. A própria página avisa que a profundidade não é medida precisa de qualidade e que o desempenho das consultas é o melhor indicador.",
            "Quando vale a pena, segundo a página de clustering keys: tabelas muito grandes (tipicamente vários terabytes), consultas seletivas que leem pequena parte das linhas ou que ordenam (ORDER BY), muitas consultas filtrando as mesmas poucas colunas, e tabela consultada com frequência e atualizada pouco. Clustering consome créditos (a computação do reclustering gasta créditos) e pode aumentar o armazenamento, porque as partições antigas ficam retidas para Time Travel e Fail-safe. A doc recomenda testar um conjunto representativo de consultas antes.",
            F + "sql\nALTER TABLE vendas CLUSTER BY (data_venda, regiao);\nSELECT SYSTEM$CLUSTERING_INFORMATION('vendas', '(data_venda)');\nALTER TABLE vendas DROP CLUSTERING KEY;\n" + F
          ],
          armadilha: "Definir clustering key em tabela pequena só gera custo. A doc recomenda no máximo 3 ou 4 colunas por chave e, em geral, ordem da menor para a maior cardinalidade.",
          fonte: ["Clustering Keys & Clustered Tables", "https://docs.snowflake.com/en/user-guide/tables-clustering-keys"]
        },
        {
          t: "Os caches: resultado, warehouse e metadados",
          facil: "Traduzindo: o resultado pode ser reaproveitado de graça se a consulta for idêntica; o cache do warehouse some quando ele suspende.",
          p: [
            "Cache de resultado: o Snowflake pode devolver um resultado persistido em vez de reexecutar quando a nova consulta é exatamente igual (maiúsculas e apelidos contam), não usa funções não reutilizáveis como UUID_STRING ou RANDOM, os dados das tabelas não mudaram, o papel tem privilégios e as opções que afetam o resultado são as mesmas. Cumprir tudo não garante o reuso. O resultado expira em 24 horas; cada reuso renova o relógio, mas ele é descartado 31 dias após a primeira execução.",
            "O parâmetro USE_CACHED_RESULT é booleano, vale TRUE por padrão e pode ser definido em conta, usuário e sessão. Basta mudá-lo na sessão para comparar execuções.",
            "Cache do warehouse: um warehouse em execução mantém um cache de dados de tabela acessível às consultas dele. Ao suspender, o cache é perdido. Por isso um auto-suspend muito curto pode jogar fora o cache antes da consulta seguinte, mas um warehouse ligado consome crédito mesmo ocioso.",
            "Cache de metadados: as páginas de cache que conferi descrevem só o cache de resultado e o cache de dados do warehouse, e não descrevem um cache de metadados. O que a doc mostra é que os metadados por micro-partição sustentam o pruning."
          ],
          fonte: ["Using Persisted Query Results", "https://docs.snowflake.com/en/user-guide/querying-persisted-results"]
        },
        {
          t: "Query Profile: onde olhar",
          facil: "Traduzindo: o Query Profile é o raio-X da consulta; você compara partições lidas com o total e vê se houve spilling.",
          p: [
            "No Snowsight: Monitoring, Query History, escolha a consulta e abra a aba Query Profile. Os detalhes podem não estar disponíveis se a consulta ainda roda, falhou ou rodou há mais de 14 dias.",
            "Estatísticas que importam: Bytes scanned (com o percentual lido do cache de disco local), Partitions scanned versus Partitions total (se lidas forem uma fração pequena, o pruning funcionou) e Bytes spilled to local storage / remote storage (o spilling remoto é o que mais prejudica o desempenho)."
          ],
          lista: [
            "Join que produz muito mais linhas do que consome: condição ausente ou ampla demais (exploding join).",
            "UNION sem ALL com Aggregate por cima: eliminação de duplicatas talvez desnecessária.",
            "TableScan lendo quase tudo e um Filter descartando depois: a ordem de armazenamento não combina com o filtro.",
            "Spilling: considere warehouse maior ou processar em lotes menores."
          ],
          fonte: ["Analyze query performance with Query Profile", "https://docs.snowflake.com/en/user-guide/ui-query-profile"]
        },
        {
          t: "Dimensionar o warehouse: para cima ou para fora",
          facil: "Traduzindo: aumentar o tamanho ajuda consultas grandes; aumentar o número de clusters ajuda quando muita gente consulta ao mesmo tempo.",
          p: [
            "Cada tamanho acima dobra os recursos de computação, e a tabela de créditos por hora vai de 1 (X-Small) a 2, 4, 8, 16 e assim por diante, segundo a página de visão geral. O faturamento é por segundo, com mínimo de 60 segundos cada vez que o warehouse inicia.",
            "Escalar para cima é redimensionar (ALTER WAREHOUSE nome SET WAREHOUSE_SIZE = ...). A doc diz que isso ajuda consultas maiores e complexas e não serve para problema de concorrência. Escalar para fora é adicionar clusters em um multi-cluster warehouse, pensado para fila e desempenho com muitos usuários simultâneos; exige a edição Enterprise e cada cluster em execução consome créditos.",
            "A doc recomenda auto-suspend baixo (por exemplo, 5 ou 10 minutos ou menos), ajustado ao intervalo entre consultas, e sugere experimentar tamanhos para achar o melhor encaixe. Maior custa mais por hora, mas pode terminar antes; o custo total depende da carga."
          ],
          tabela: {
            cab: ["Sintoma", "Caminho que a doc aponta"],
            linhas: [
              ["Consulta grande e complexa lenta", "Redimensionar o warehouse (para cima)"],
              ["Muitas consultas em fila ao mesmo tempo", "Multi-cluster (para fora)"],
              ["Spilling em disco", "Warehouse maior ou lotes menores"],
              ["Ocioso consumindo crédito", "Auto-suspend curto"]
            ]
          },
          armadilha: "Aumentar o tamanho para resolver fila de concorrência é o erro clássico: a página diz que redimensionar não foi pensado para isso.",
          fonte: ["Warehouse considerations", "https://docs.snowflake.com/en/user-guide/warehouses-considerations"]
        },
        {
          t: "Boas práticas e como medir cache pela view de histórico",
          facil: "Traduzindo: meça antes de mexer; a view QUERY_HISTORY tem as colunas para provar o que aconteceu.",
          p: [
            "A view SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY tem latência de até 45 minutos e cobre os últimos 365 dias. Tem colunas como QUERY_ID, WAREHOUSE_NAME, TOTAL_ELAPSED_TIME (milissegundos), BYTES_SCANNED, PARTITIONS_SCANNED, PARTITIONS_TOTAL, PERCENTAGE_SCANNED_FROM_CACHE (de 0.0 a 1.0) e BYTES_SPILLED_TO_LOCAL_STORAGE. Já a função de tabela INFORMATION_SCHEMA.QUERY_HISTORY só aceita janelas dentro dos últimos 7 dias.",
            F + "sql\nSELECT query_id, warehouse_name, total_elapsed_time,\n       bytes_scanned, partitions_scanned, partitions_total\nFROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY\nWHERE start_time >= DATEADD('hours', -3, CURRENT_TIMESTAMP())\nORDER BY start_time DESC\nLIMIT 20;\n" + F,
            "Rotina simples: 1) abra o Query Profile; 2) compare partições lidas e total; 3) veja spilling; 4) só então decida entre filtro melhor, clustering, tamanho maior ou mais clusters; 5) suspenda o warehouse quando acabar."
          ],
          fonte: ["QUERY_HISTORY view (ACCOUNT_USAGE)", "https://docs.snowflake.com/en/sql-reference/account-usage/query_history"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: relatório diário que ficou lento",
        texto: "Uma tabela de eventos cresceu e o relatório diário passou a demorar. Antes de pedir um warehouse maior, a engenheira abre o Query Profile da consulta: Partitions scanned está quase igual a Partitions total, e o filtro por data é aplicado só depois do TableScan. Isso indica pruning ruim, pois os dados não estão agrupados pela data. Ela testa uma consulta com filtro de data direto na coluna e repara que as partições lidas caem. Como a tabela é pequena para os padrões da doc (vários terabytes), ela não define clustering key; registra o achado e o custo evitado. Em outra consulta vê spilling para armazenamento remoto e, só nessa, testa um tamanho maior com aviso de custo, medindo tempo antes e depois."
      },
      prova: [
        "Em entrevista: explique pruning com metadados de micro-partição e por que clustering key não é para toda tabela, citando custo de reclustering.",
        "No trabalho: diante de consulta lenta, mostrar partições lidas versus total e spilling antes de propor warehouse maior.",
        "Diferenciar escalar para cima (consulta pesada) de para fora (concorrência) é pergunta recorrente sobre warehouses.",
        "Saber que o cache de resultado tem condições e prazo (24 horas, até 31 dias) evita conclusões erradas em benchmarks."
      ],
      explique: "Explique com suas palavras como o Snowflake evita ler dados desnecessários numa tabela grande e quando você aumentaria o tamanho do warehouse versus adicionaria clusters.",
      checagem: [
        "O que o Query Profile mostra que prova que o pruning funcionou ou falhou?",
        "Cite três condições para o cache de resultado ser reutilizado e o que acontece depois de 24 horas.",
        "Por que um auto-suspend muito curto pode atrapalhar o cache do warehouse, e por que ligado ocioso também custa?",
        "Em que tipo de tabela e consulta a doc considera clustering key vantajosa?"
      ]
    },
    fontes: [
      ["Micro-partitions & Data Clustering", "https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions"],
      ["Clustering Keys & Clustered Tables", "https://docs.snowflake.com/en/user-guide/tables-clustering-keys"],
      ["Using Persisted Query Results", "https://docs.snowflake.com/en/user-guide/querying-persisted-results"],
      ["Optimizing the warehouse cache", "https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache"],
      ["Analyze query performance with Query Profile", "https://docs.snowflake.com/en/user-guide/ui-query-profile"],
      ["Warehouse considerations", "https://docs.snowflake.com/en/user-guide/warehouses-considerations"],
      ["Overview of warehouses", "https://docs.snowflake.com/en/user-guide/warehouses-overview"],
      ["QUERY_HISTORY view (ACCOUNT_USAGE)", "https://docs.snowflake.com/en/sql-reference/account-usage/query_history"],
      ["Parameters", "https://docs.snowflake.com/en/sql-reference/parameters"],
      ["Using the sample database", "https://docs.snowflake.com/en/user-guide/sample-data-using"]
    ],
    cartoes: [
      { id: "a17c1", f: "Tamanho de uma micro-partição", v: "Entre 50 MB e 500 MB de dados não comprimidos, em layout colunar, criada automaticamente.", t: "s7" },
      { id: "a17c2", f: "O que é pruning?", v: "Usar os metadados de faixa de valores das micro-partições para pular as que o filtro não precisa ler.", t: "s7" },
      { id: "a17c3", f: "Quando clustering key costuma valer?", v: "Tabelas muito grandes (vários TB), consultas seletivas ou com ORDER BY nas mesmas colunas, tabela lida muito e atualizada pouco.", t: "s7" },
      { id: "a17c4", f: "Custo do clustering", v: "Consome créditos (a computação do reclustering gasta créditos) e pode aumentar o armazenamento por causa de Time Travel e Fail-safe.", t: "s7" },
      { id: "a17c5", f: "Prazo do cache de resultado", v: "Expira em 24 horas; cada reuso renova, mas é descartado 31 dias após a primeira execução.", t: "s7" },
      { id: "a17c6", f: "USE_CACHED_RESULT", v: "Parâmetro booleano, TRUE por padrão, em conta, usuário e sessão; FALSE desativa o reuso de resultado.", t: "s7" },
      { id: "a17c7", f: "O que acontece com o cache do warehouse ao suspender?", v: "É perdido; o cache existe enquanto o warehouse está em execução.", t: "s7" },
      { id: "a17c8", f: "Escalar para cima versus para fora", v: "Para cima: redimensionar, ajuda consulta grande. Para fora: mais clusters (multi-cluster), ajuda concorrência.", t: "s7" },
      { id: "a17c9", f: "Onde ver spilling?", v: "No Query Profile (Bytes spilled to local/remote storage) e na coluna BYTES_SPILLED_TO_LOCAL_STORAGE do histórico.", t: "s7" }
    ],
    questoes: [
      {
        id: "a17q1", s: 2, t: "s7",
        e: "Uma tabela de pedidos com poucos GB tem consultas lentas. Um colega propõe definir uma clustering key com seis colunas para acelerar tudo. Qual é a avaliação mais alinhada à documentação?",
        o: ["Definir a chave nas seis colunas, pois mais colunas sempre melhoram o pruning", "Primeiro analisar o Query Profile; clustering é pensado para tabelas muito grandes com filtros repetidos e tem custo de créditos e armazenamento", "Clustering é gratuito e automático em qualquer tabela, então não há o que avaliar", "Trocar a tabela por tabela temporária para ganhar pruning"],
        c: [1],
        x: "A doc diz que clustering keys fazem sentido para tabelas muito grandes (tipicamente vários terabytes) com consultas seletivas ou ordenadas pelas mesmas colunas, e recomenda testar consultas representativas antes. Também recomenda no máximo 3 ou 4 colunas, então seis colunas contraria a orientação. Dizer que é gratuito erra porque reclustering consome créditos e aumenta armazenamento. Tabela temporária não está ligada ao pruning. Mais colunas não melhora sempre: a ordem e a cardinalidade importam."
      },
      {
        id: "a17q2", s: 2, t: "s7",
        e: "Você roda a mesma consulta duas vezes na mesma sessão e a segunda retorna quase instantaneamente. No Query Profile da segunda, quase nada foi processado. Qual é a explicação mais provável?",
        o: ["O warehouse foi redimensionado automaticamente para Large", "O resultado persistido foi reutilizado, já que USE_CACHED_RESULT é TRUE por padrão e a consulta era idêntica", "As micro-partições foram reorganizadas pelo clustering na hora", "A consulta foi enviada para o Fail-safe"],
        c: [1],
        x: "Com USE_CACHED_RESULT habilitado (padrão) e consulta idêntica, sem mudança nos dados e com privilégios válidos, o Snowflake pode devolver o resultado persistido sem reexecutar. Redimensionamento automático não existe nesse cenário e não explica ausência de processamento. Reclustering não acontece em segundos por causa de uma repetição. Fail-safe é recuperação feita só pela Snowflake, não um mecanismo de desempenho de consulta."
      },
      {
        id: "a17q3", s: 2, t: "s7",
        e: "Um warehouse de BI atende dezenas de analistas ao mesmo tempo e as consultas ficam em fila nos horários de pico, embora cada consulta seja leve. O que a documentação indica como caminho mais adequado?",
        o: ["Multi-cluster warehouse (escalar para fora), na edição Enterprise", "Apenas aumentar o tamanho para 6X-Large", "Desligar o auto-suspend para sempre", "Criar clustering key em todas as tabelas"],
        c: [0],
        x: "Multi-cluster foi desenhado para fila e desempenho com muitos usuários simultâneos e exige Enterprise. A doc diz que redimensionar não foi pensado para resolver concorrência, então o tamanho máximo erra e gasta muito mais crédito por hora. Desligar auto-suspend não reduz fila e mantém custo. Clustering key ajuda pruning em tabelas grandes, não a concorrência de consultas leves."
      },
      {
        id: "a17q4", s: 2, t: "s7",
        e: "No Query Profile, a consulta mostra Partitions scanned quase igual a Partitions total, e um operador Filter descarta a maior parte das linhas depois do TableScan. O que isso sugere?",
        o: ["O pruning está funcionando muito bem", "O pruning foi ineficiente: a ordem de armazenamento pode não combinar com o filtro", "A consulta usou o cache de resultado", "O warehouse está em Fail-safe"],
        c: [1],
        x: "Ler quase todas as partições e filtrar depois indica que os metadados não permitiram pular partições, ou seja, pruning ineficiente, conforme a página do Query Profile. Pruning bom mostraria partições lidas como fração pequena do total. Se tivesse usado cache de resultado, quase nada seria processado. Fail-safe não é estado de warehouse."
      },
      {
        id: "a17q5", s: 2, t: "s7",
        e: "Sua consulta de transformação grande mostra Bytes spilled to remote storage altos e demora muito. Qual ação é coerente com a documentação do Query Profile? (Escolha duas)",
        o: ["Testar um warehouse maior, aceitando custo maior por hora e medindo o resultado", "Processar os dados em lotes menores", "Criar um monitor de recursos, que elimina o spilling", "Trocar USE_CACHED_RESULT para FALSE, o que libera memória"],
        c: [0, 1],
        x: "A página do Query Profile sugere, para consultas grandes demais para a memória, considerar um warehouse maior ou processar em lotes menores, pois o spilling para armazenamento remoto é o que mais prejudica o desempenho. Resource monitor controla créditos, não memória. USE_CACHED_RESULT controla reuso de resultado e não altera a memória disponível durante a execução."
      },
      {
        id: "a17q6", s: 2, t: "s7",
        e: "Você configurou AUTO_SUSPEND de 5 segundos em um warehouse que recebe consultas a cada 2 minutos e percebe que cada consulta parece começar do zero. Qual a leitura correta com base na documentação?",
        o: ["O cache do warehouse é perdido a cada suspensão e cada retomada cobra o mínimo de 60 segundos, então o valor deve acompanhar o intervalo entre consultas", "Auto-suspend curto nunca afeta o desempenho", "O cache de resultado é apagado a cada suspensão, sem exceção", "O pruning deixa de existir quando o warehouse suspende"],
        c: [0],
        x: "A doc diz que o cache do warehouse some ao suspender e que cada início cobra no mínimo 60 segundos, recomendando ajustar o auto-suspend ao intervalo das consultas. Afirmar que nunca afeta o desempenho contraria isso. O cache de resultado é persistido e segue regras próprias de 24 horas, não é apagado pela suspensão do warehouse. Pruning usa metadados da tabela e independe do estado do warehouse."
      }
    ],
    lab: {
      t: "Comparar consulta com e sem cache de resultado e ler o Query Profile",
      custo: "Gratuito dentro do saldo da conta de teste (um warehouse X-Small por poucos minutos consome uma pequena fração de crédito). A conta de teste não exige cartão para abrir; confira a página oficial para duração e saldo atuais.",
      tempo: "30 a 45 min",
      porque: "Medir é a habilidade central de desempenho; o print do Query Profile com partições lidas e tempo é evidência de portfólio.",
      antes: "Você precisa de uma conta de teste do Snowflake, uma worksheet no Snowsight e acesso ao banco SNOWFLAKE_SAMPLE_DATA (somente leitura, criado por padrão em contas novas). Na tela você verá o resultado da consulta e, em Monitoring, Query History, a aba Query Profile. Os passos foram conferidos contra a documentação e NÃO foram executados. Se um nome de coluna ou menu estiver diferente, confie na página oficial.",
      passos: [
        {
          t: "Criar um warehouse pequeno e suspenso",
          cmd: "CREATE OR REPLACE WAREHOUSE lab_wh WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 60 INITIALLY_SUSPENDED = TRUE;\nUSE WAREHOUSE lab_wh;",
          p: "X-Small, auto-suspend de 60 segundos e criado suspenso. O auto-suspend é verificado aproximadamente a cada 30 segundos, então valores muito pequenos não são exatos."
        },
        {
          t: "Desligar o cache de resultado e rodar a consulta duas vezes",
          cmd: "ALTER SESSION SET USE_CACHED_RESULT = FALSE;\nSELECT l_returnflag, COUNT(*) AS n, SUM(l_extendedprice) AS total\nFROM snowflake_sample_data.tpch_sf1.lineitem\nGROUP BY l_returnflag;",
          p: "Rode a consulta duas vezes. Anote o tempo de cada uma na linha de resultado do Snowsight. A segunda pode ser mais rápida por causa do cache do warehouse (dados já lidos), não do cache de resultado."
        },
        {
          t: "Ligar o cache de resultado e repetir a mesma consulta",
          cmd: "ALTER SESSION SET USE_CACHED_RESULT = TRUE;\n-- repita exatamente o mesmo texto da consulta, incluindo maiúsculas",
          p: "O texto precisa ser idêntico. Se o resultado for reaproveitado, o tempo cai muito. Lembre que cumprir as condições não garante o reuso."
        },
        {
          t: "Ler o Query Profile e o histórico",
          cmd: "SELECT query_id, query_text, total_elapsed_time\nFROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY(DATEADD('hours', -1, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP()))\nORDER BY start_time DESC LIMIT 10;",
          p: "No Snowsight abra Monitoring, Query History, escolha cada execução e a aba Query Profile. Compare Bytes scanned, percentual lido do cache e Partitions scanned versus total. Tire prints."
        },
        {
          t: "OPCIONAL, com custo maior: testar um tamanho acima",
          cmd: "ALTER WAREHOUSE lab_wh SET WAREHOUSE_SIZE = SMALL;\n-- desligue o cache de resultado e rode de novo\nALTER WAREHOUSE lab_wh SET WAREHOUSE_SIZE = XSMALL;",
          p: "AVISO DE CUSTO: cada tamanho acima dobra os créditos por hora. Faça só se quiser comparar, por poucos minutos, e volte para X-Small logo depois."
        }
      ],
      verificar: "Você tem os tempos das execuções com cache de resultado desligado e ligado, e prints do Query Profile mostrando Bytes scanned e partições. Consegue explicar a diferença entre cache de resultado e cache do warehouse.",
      limpar: [
        "ALTER WAREHOUSE lab_wh SUSPEND;",
        "ALTER SESSION UNSET USE_CACHED_RESULT;",
        "Opcional: DROP WAREHOUSE lab_wh; ao fim do estudo.",
        "Guarde só os prints e os números; nunca commite senhas, chaves ou nomes de conta com dados pessoais."
      ],
      erros: [
        { s: "Erro dizendo que não há warehouse em uso", c: "Faltou USE WAREHOUSE ou o warehouse não foi criado", r: "Rode USE WAREHOUSE lab_wh; e confirme que auto-resume está habilitado (padrão TRUE)." },
        { s: "O banco SNOWFLAKE_SAMPLE_DATA não aparece", c: "Em contas mais antigas ou sem o share criado", r: "Um ACCOUNTADMIN pode criá-lo com CREATE DATABASE SNOWFLAKE_SAMPLE_DATA FROM SHARE SFC_SAMPLES.SAMPLE_DATA; e conceder acesso com GRANT IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE_SAMPLE_DATA TO ROLE PUBLIC; (sintaxe da página oficial do banco de amostra)." },
        { s: "A segunda execução continua lenta mesmo com cache ligado", c: "Texto da consulta diferente, função não reutilizável ou parâmetro ainda em FALSE na sessão", r: "Copie o texto exatamente, confirme USE_CACHED_RESULT = TRUE e evite funções como RANDOM." }
      ]
    }
  };

  C.dias[18] = {
    aula: {
      titulo: "Controle de custo: monitores de recurso e relatórios de uso",
      resumo: "Aprenda de onde vêm os créditos, como resource monitors notificam e suspendem warehouses, como auto-suspend evita gasto ocioso e como consultar as views de uso para montar um relatório de custo por warehouse.",
      simples: {
        analogia: "Pense na conta de luz de uma casa. O medidor registra quanto cada aparelho gastou, e o preço depende de quanto tempo ele ficou ligado, não de ter trabalhado de verdade. O resource monitor é como um disjuntor com aviso: ao chegar em 75 por cento da meta do mês ele manda uma mensagem, e ao chegar em 100 por cento desliga o aparelho. O auto-suspend é a luz com sensor de presença, que apaga sozinha quando ninguém está no cômodo. E o relatório de uso é a leitura do medidor, que chega com um pequeno atraso: não mostra o segundo exato, mostra o que já foi contabilizado.",
        pontos: [
          "Warehouse consome créditos enquanto está rodando, mesmo ocioso.",
          "Resource monitor tem cota de créditos e gatilhos: NOTIFY, SUSPEND e SUSPEND_IMMEDIATE.",
          "AUTO_SUSPEND e AUTO_RESUME evitam pagar por tempo parado sem travar o uso.",
          "ACCOUNT_USAGE tem histórico longo e latência; INFORMATION_SCHEMA é mais imediato e curto.",
          "Budgets avisam sobre gasto mensal previsto, inclusive de serviços serverless."
        ],
        paraQueServe: "Para você nunca ser surpreendida por uma conta, e para entregar um relatório de custo por warehouse que mostra maturidade de engenharia no portfólio."
      },
      glossario: [
        { t: "Crédito", d: "Unidade de consumo de computação no Snowflake; o custo em dinheiro é créditos consumidos vezes o preço do crédito." },
        { t: "Resource monitor", d: "Objeto com cota de créditos e gatilhos que notificam ou suspendem warehouses ao atingir percentuais da cota." },
        { t: "CREDIT_QUOTA", d: "Número de créditos permitidos por intervalo de frequência do monitor; zera a cada novo intervalo." },
        { t: "AUTO_SUSPEND", d: "Segundos de inatividade até o warehouse suspender sozinho; o padrão é 600 segundos." },
        { t: "AUTO_RESUME", d: "Faz o warehouse voltar sozinho quando chega uma instrução que precisa dele; o padrão é TRUE." },
        { t: "ACCOUNT_USAGE", d: "Schema do banco SNOWFLAKE com metadados e uso históricos da conta, com latência e retenção de 365 dias na maioria das views." },
        { t: "Budget", d: "Limite mensal de gasto, em créditos, usado para alertar quando a previsão de gasto passa do limite." },
        { t: "Cloud services", d: "Camada de serviços (autenticação, metadados, controle de acesso) cujo consumo só é cobrado acima de 10 por cento do uso diário dos warehouses." }
      ],
      blocos: [
        {
          t: "De onde vem o custo",
          facil: "Traduzindo: você paga por computação (créditos), armazenamento e transferência; o warehouse é quase sempre o maior controle que você tem.",
          p: [
            "Segundo a página de custos, o total é a soma de transferência de dados, armazenamento e computação, cobrados separadamente. Computação consome créditos: warehouses (gerenciados por você), serverless (gerenciado pelo Snowflake, como Snowpipe) e cloud services. O valor em dinheiro é créditos multiplicados pelo preço do crédito, que está no guia de preços oficial; confira a página para números atuais.",
            "Para warehouses, o faturamento é por segundo, com mínimo de 60 segundos cada vez que o warehouse inicia. Cada tamanho acima dobra o consumo por hora (X-Small 1, Small 2, Medium 4, Large 8, e assim por diante). Cloud services só é cobrado se passar de 10 por cento do uso diário dos warehouses. Entrada de dados é gratuita; saída para outra região ou nuvem é cobrada."
          ],
          dica: "O ganho mais barato é sempre o mesmo: warehouse pequeno e suspenso quando não está em uso.",
          fonte: ["Understanding overall cost", "https://docs.snowflake.com/en/user-guide/cost-understanding-overall"]
        },
        {
          t: "Auto-suspend e auto-resume",
          facil: "Traduzindo: o warehouse apaga sozinho depois de um tempo parado e acende sozinho quando chega uma consulta.",
          p: [
            "AUTO_SUSPEND é o número de segundos de inatividade antes de suspender. O padrão na criação é 600 (10 minutos); 0 ou NULL significa que nunca suspende, o que pode ser caro. A checagem acontece mais ou menos a cada 30 segundos. AUTO_RESUME vale TRUE por padrão: quando uma instrução chega e o warehouse é o da sessão, ele volta.",
            "A doc de considerações recomenda um valor baixo (5 ou 10 minutos ou menos) e alerta que valores menores que o intervalo entre as consultas causam ciclos de suspender e retomar, cada um cobrando o mínimo de 60 segundos. Também lembra que suspender descarta o cache do warehouse.",
            F + "sql\nCREATE WAREHOUSE IF NOT EXISTS lab_wh\n  WAREHOUSE_SIZE = XSMALL\n  AUTO_SUSPEND = 60\n  AUTO_RESUME = TRUE\n  INITIALLY_SUSPENDED = TRUE;\n\nALTER WAREHOUSE lab_wh SUSPEND;\n" + F
          ],
          armadilha: "ALTER WAREHOUSE nome SUSPEND remove todos os nós de computação; esquecer de suspender um warehouse com AUTO_SUSPEND desativado mantém o gasto correndo.",
          fonte: ["CREATE WAREHOUSE", "https://docs.snowflake.com/en/sql-reference/sql/create-warehouse"]
        },
        {
          t: "Resource monitors: cota, gatilhos e limites",
          facil: "Traduzindo: o resource monitor é o alarme de meta de créditos; no limite, ele pode desligar os warehouses ligados a ele.",
          p: [
            "Um resource monitor define CREDIT_QUOTA (créditos por intervalo), FREQUENCY (diária, semanal, mensal, anual ou nunca) e START_TIMESTAMP. A frequência exige START_TIMESTAMP. Cada gatilho é do tipo ON n PERCENT DO ação. As ações são NOTIFY (só avisa), SUSPEND (suspende depois que as instruções em execução terminam) e SUSPEND_IMMEDIATE (suspende já, cancelando instruções). Cada monitor aceita uma ação SUSPEND, uma SUSPEND_IMMEDIATE e até cinco NOTIFY; percentuais podem passar de 100.",
            "Apenas ACCOUNTADMIN cria monitores e atribui warehouses a eles (a doc permite conceder MONITOR ou MODIFY a outros papéis para ver ou alterar). Um monitor no nível da conta cobre todos os warehouses (só pode haver um); no nível de warehouse, cada warehouse só pode ter um monitor, e a atribuição é feita com ALTER WAREHOUSE.",
            F + "sql\nUSE ROLE ACCOUNTADMIN;\nCREATE OR REPLACE RESOURCE MONITOR lab_monitor\n  WITH CREDIT_QUOTA = 5\n  TRIGGERS ON 75 PERCENT DO NOTIFY\n           ON 100 PERCENT DO SUSPEND\n           ON 110 PERCENT DO SUSPEND_IMMEDIATE;\nALTER WAREHOUSE lab_wh SET RESOURCE_MONITOR = lab_monitor;\n" + F
          ],
          lista: [
            "Monitor não controla serverless (Snowpipe, clustering automático, materialized views) nem serviços de IA: para isso a doc aponta budgets.",
            "Um monitor de warehouse não suspende o consumo de cloud services.",
            "Para impor a cota com folga, a doc recomenda limiares abaixo de 100 por cento, como 90, e um warehouse por monitor para controle mais justo."
          ],
          fonte: ["Working with resource monitors", "https://docs.snowflake.com/en/user-guide/resource-monitors"]
        },
        {
          t: "Views de uso: ACCOUNT_USAGE e INFORMATION_SCHEMA",
          facil: "Traduzindo: ACCOUNT_USAGE guarda muito histórico mas chega atrasado; INFORMATION_SCHEMA é imediato mas olha para trás pouco.",
          p: [
            "O schema SNOWFLAKE.ACCOUNT_USAGE guarda metadados e uso da conta. Para a maioria das views a latência é de 2 horas, e outras variam de 45 minutos a 3 horas. O histórico dura 1 ano (365 dias) nas views históricas, e inclui objetos apagados. O INFORMATION_SCHEMA não tem latência, não traz objetos apagados e a retenção vai de 7 dias a 6 meses, conforme a view. Acesso: o banco SNOWFLAKE é visível, mas o schema precisa ser concedido (IMPORTED PRIVILEGES ou database roles como USAGE_VIEWER) por um ACCOUNTADMIN. A doc recomenda não usar SELECT * nessas views.",
            "WAREHOUSE_METERING_HISTORY dá o uso de crédito por hora por warehouse nos últimos 365 dias. Latência de até 3 horas, e CREDITS_USED_CLOUD_SERVICES pode atrasar até 6 horas. CREDITS_USED é compute mais cloud services e pode exceder o faturado; para valores faturados, a doc aponta METERING_DAILY_HISTORY. QUERY_HISTORY (ACCOUNT_USAGE) tem latência de até 45 minutos."
          ],
          tabela: {
            cab: ["Fonte", "Latência", "Retenção"],
            linhas: [
              ["ACCOUNT_USAGE (maioria)", "cerca de 2 horas", "365 dias, com objetos apagados"],
              ["WAREHOUSE_METERING_HISTORY", "até 3 horas (cloud services até 6)", "365 dias"],
              ["QUERY_HISTORY (ACCOUNT_USAGE)", "até 45 minutos", "365 dias"],
              ["INFORMATION_SCHEMA", "sem latência", "7 dias a 6 meses, conforme a view"]
            ]
          },
          fonte: ["Account Usage", "https://docs.snowflake.com/en/sql-reference/account-usage"]
        },
        {
          t: "Relatório de custo por warehouse",
          facil: "Traduzindo: uma consulta que soma créditos por dia e por warehouse já é um relatório útil e versionável.",
          p: [
            "A página de WAREHOUSE_METERING_HISTORY traz colunas como START_TIME, WAREHOUSE_NAME, CREDITS_USED, CREDITS_USED_COMPUTE, CREDITS_USED_CLOUD_SERVICES e CREDITS_ATTRIBUTED_COMPUTE_QUERIES (computação atribuída a consultas, sem tempo ocioso). A diferença entre computação total e atribuída a consultas é o custo ocioso, e a própria doc mostra essa conta.",
            F + "sql\nSELECT warehouse_name,\n       DATE_TRUNC('day', start_time) AS dia,\n       SUM(credits_used_compute) AS creditos_compute,\n       SUM(credits_used_cloud_services) AS creditos_cloud,\n       SUM(credits_used_compute) - SUM(credits_attributed_compute_queries) AS creditos_ociosos\nFROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY\nWHERE start_time >= DATEADD('days', -30, CURRENT_DATE())\nGROUP BY warehouse_name, dia\nORDER BY dia DESC, creditos_compute DESC;\n" + F,
            "Guarde esse SQL num arquivo do repositório. Os dados chegam com atraso, então não espere ver a última hora."
          ],
          fonte: ["WAREHOUSE_METERING_HISTORY view", "https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history"]
        },
        {
          t: "Budgets em visão geral",
          facil: "Traduzindo: budget é um aviso mensal de gasto previsto que cobre também serviços que o resource monitor não cobre.",
          p: [
            "Um budget define um limite mensal de gasto em créditos para a conta toda (account budget) ou para um grupo de objetos (custom budget). Ele envia alerta (e-mail, fila na nuvem ou webhook) quando a previsão passa do limite, e o limite é usado só para alerta. Sozinho, o budget não suspende nada; ações personalizadas (procedimentos armazenados) podem fazer isso. Cobre warehouses e muitos serviços serverless e de IA. A página não declara requisitos de edição, então confira na documentação ou na sua conta.",
            "Regra prática da doc: resource monitor para warehouses; budget para serverless e IA.",
            "Na prática, combine as ferramentas: auto-suspend curto evita gasto parado, o resource monitor funciona como freio de segurança nos warehouses, o relatório de WAREHOUSE_METERING_HISTORY mostra para onde os créditos foram, e o budget cobre o que fica fora do monitor. Registre cada escolha no README do projeto."
          ],
          fonte: ["Budgets", "https://docs.snowflake.com/en/user-guide/budgets"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: três warehouses e uma meta mensal",
        texto: "Uma equipe tem os warehouses etl_wh, bi_wh e dev_wh. A engenheira cria um monitor por warehouse, com NOTIFY em 75 por cento e SUSPEND em 100 por cento da cota, e deixa dev_wh com cota menor e SUSPEND_IMMEDIATE em 110. Na primeira semana, o relatório de WAREHOUSE_METERING_HISTORY mostra que bi_wh tem muito crédito ocioso: o AUTO_SUSPEND estava em 3600 segundos. Ela reduz para 300 e, ao revisar o relatório dias depois (lembrando a latência de até 3 horas), vê o custo ocioso cair. Como o time usa Snowpipe, ela cria também um budget, porque monitores de recurso não cobrem serverless. No README do projeto registra a decisão e a consulta."
      },
      prova: [
        "Em entrevista: explique a diferença entre resource monitor (warehouses, suspende) e budget (alerta, inclui serverless e IA).",
        "No trabalho: apontar custo ocioso por warehouse com WAREHOUSE_METERING_HISTORY é argumento concreto para ajustar auto-suspend.",
        "Saber a latência das views evita conclusão errada ao investigar um pico de custo recente.",
        "Mostrar um relatório SQL versionado de custo é diferencial em projeto de portfólio de engenharia de dados."
      ],
      explique: "Explique com suas palavras como você impediria um warehouse esquecido ligado de consumir créditos além da meta, usando auto-suspend e resource monitor.",
      checagem: [
        "Qual a diferença entre as ações NOTIFY, SUSPEND e SUSPEND_IMMEDIATE de um resource monitor?",
        "Por que não dá para confiar em ACCOUNT_USAGE para ver o que aconteceu há dez minutos?",
        "O que resource monitor não cobre e qual recurso a doc indica nesse caso?",
        "Como calcular custo ocioso por warehouse a partir de WAREHOUSE_METERING_HISTORY?"
      ]
    },
    fontes: [
      ["Understanding overall cost", "https://docs.snowflake.com/en/user-guide/cost-understanding-overall"],
      ["Working with resource monitors", "https://docs.snowflake.com/en/user-guide/resource-monitors"],
      ["CREATE RESOURCE MONITOR", "https://docs.snowflake.com/en/sql-reference/sql/create-resource-monitor"],
      ["Account Usage", "https://docs.snowflake.com/en/sql-reference/account-usage"],
      ["WAREHOUSE_METERING_HISTORY view", "https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history"],
      ["Budgets", "https://docs.snowflake.com/en/user-guide/budgets"],
      ["ALTER WAREHOUSE", "https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse"],
      ["QUERY_HISTORY table function", "https://docs.snowflake.com/en/sql-reference/functions/query_history"],
      ["Overview of warehouses", "https://docs.snowflake.com/en/user-guide/warehouses-overview"],
      ["Free trial account", "https://docs.snowflake.com/en/user-guide/admin-trial-account"]
    ],
    cartoes: [
      { id: "a18c1", f: "Como o warehouse é faturado", v: "Por segundo, com mínimo de 60 segundos cada vez que inicia; cada tamanho acima dobra os créditos por hora.", t: "s8" },
      { id: "a18c2", f: "Padrão de AUTO_SUSPEND", v: "600 segundos na criação; 0 ou NULL significa que nunca suspende.", t: "s8" },
      { id: "a18c3", f: "Ações de um resource monitor", v: "NOTIFY só avisa; SUSPEND espera as instruções terminarem; SUSPEND_IMMEDIATE cancela as instruções em execução.", t: "s8" },
      { id: "a18c4", f: "Quem cria resource monitor?", v: "Somente ACCOUNTADMIN; depois atribui-se a um warehouse com ALTER WAREHOUSE ... SET RESOURCE_MONITOR.", t: "s8" },
      { id: "a18c5", f: "O que resource monitor não cobre", v: "Serverless (Snowpipe, clustering automático, materialized views) e serviços de IA; para isso use budgets.", t: "s8" },
      { id: "a18c6", f: "Latência de WAREHOUSE_METERING_HISTORY", v: "Até 3 horas; CREDITS_USED_CLOUD_SERVICES pode atrasar até 6 horas.", t: "s8" },
      { id: "a18c7", f: "Latência de QUERY_HISTORY em ACCOUNT_USAGE", v: "Até 45 minutos e histórico de 365 dias; a função do INFORMATION_SCHEMA cobre só os últimos 7 dias.", t: "s8" },
      { id: "a18c8", f: "Budget suspende warehouse sozinho?", v: "Não: só alerta; ações personalizadas com procedimentos armazenados podem suspender.", t: "s8" },
      { id: "a18c9", f: "Como obter custo ocioso", v: "Soma de CREDITS_USED_COMPUTE menos soma de CREDITS_ATTRIBUTED_COMPUTE_QUERIES por warehouse.", t: "s8" }
    ],
    questoes: [
      {
        id: "a18q1", s: 2, t: "s8",
        e: "Você quer ser avisada ao consumir 75 por cento da cota mensal de um warehouse e que ele seja suspenso, deixando terminar as consultas em andamento, ao chegar a 100 por cento. Qual configuração atende?",
        o: ["Gatilho ON 75 PERCENT DO NOTIFY e ON 100 PERCENT DO SUSPEND", "Gatilho ON 75 PERCENT DO SUSPEND_IMMEDIATE apenas", "Dois gatilhos NOTIFY em 100 por cento", "Budget com ação SUSPEND automática"],
        c: [0],
        x: "NOTIFY só envia aviso e SUSPEND suspende depois que as instruções em execução terminam, que é exatamente o pedido. SUSPEND_IMMEDIATE cancela consultas em curso e dispararia cedo demais em 75 por cento. Dois NOTIFY em 100 por cento não suspendem nada. Budget sozinho só alerta, não suspende, a menos que você configure ações personalizadas, então não atende o pedido."
      },
      {
        id: "a18q2", s: 2, t: "s8",
        e: "Um pico de custo aconteceu há 20 minutos e você consulta WAREHOUSE_METERING_HISTORY em ACCOUNT_USAGE, mas não vê esse período. O que explica isso e o que fazer?",
        o: ["A view está quebrada; recriar o warehouse", "A view tem latência de até 3 horas; aguardar ou usar uma fonte mais imediata como o INFORMATION_SCHEMA para consultas recentes", "A view só guarda 7 dias e apagou o dado", "O resource monitor apagou o histórico"],
        c: [1],
        x: "ACCOUNT_USAGE não é em tempo real: WAREHOUSE_METERING_HISTORY pode atrasar até 3 horas. Para atividade recente de consultas, a função INFORMATION_SCHEMA.QUERY_HISTORY não tem a mesma espera documentada (janela de 7 dias). A view guarda 365 dias, não 7, então o dado não foi apagado. Recriar o warehouse não ajuda e resource monitor não apaga histórico de uso."
      },
      {
        id: "a18q3", s: 2, t: "s8",
        e: "Sua equipe usa Snowpipe e clustering automático e quer limitar gasto com eles, além dos warehouses. Qual afirmação é correta segundo a documentação?",
        o: ["Um resource monitor de conta já controla todo o consumo serverless", "Resource monitors não rastreiam serverless nem serviços de IA; budgets cobrem esses serviços com alerta mensal", "Serverless não consome créditos", "Só é possível controlar serverless desligando a conta"],
        c: [1],
        x: "A página de resource monitors afirma que eles cobrem apenas warehouses e que serverless e serviços de IA devem ser acompanhados por budgets. Budgets cobrem Snowpipe, clustering automático e outros. Dizer que o monitor de conta cobre serverless contraria a doc. Serverless consome créditos, então a alternativa que nega isso erra, e desligar a conta não é a abordagem documentada."
      },
      {
        id: "a18q4", s: 2, t: "s8",
        e: "Um warehouse recebe uma consulta a cada 3 minutos e foi configurado com AUTO_SUSPEND de 30 segundos. O time reclama que está lento e o custo não caiu. Qual a análise mais coerente?",
        o: ["Auto-suspend menor que o intervalo entre consultas causa suspender e retomar, com mínimo de 60 segundos por início e perda de cache", "AUTO_RESUME deve estar FALSE", "O mínimo de 60 segundos só vale para o primeiro início do mês", "Aumentar o tamanho para 6X-Large reduz o custo"],
        c: [0],
        x: "A doc de considerações explica que valor menor que o intervalo das consultas gera ciclos de suspender e retomar, cada início cobrando o mínimo de 60 segundos, além de perder o cache do warehouse. O mínimo vale a cada início, não só o primeiro do mês. AUTO_RESUME em FALSE exigiria retomada manual e não explica o custo. Tamanho maior aumenta o consumo por hora, não reduz custo."
      },
      {
        id: "a18q5", s: 2, t: "s8",
        e: "Você precisa de um relatório de crédito por warehouse que também mostre o custo ocioso. Quais colunas de WAREHOUSE_METERING_HISTORY permitem isso? (Escolha duas)",
        o: ["CREDITS_USED_COMPUTE", "CREDITS_ATTRIBUTED_COMPUTE_QUERIES", "PERCENTAGE_SCANNED_FROM_CACHE", "BYTES_SPILLED_TO_LOCAL_STORAGE"],
        c: [0, 1],
        x: "O custo ocioso é a computação total menos a computação atribuída a consultas, e a própria página mostra essa conta com as duas primeiras colunas. As duas últimas pertencem a QUERY_HISTORY e descrevem cache e spilling de consultas, não crédito por hora de warehouse, então não entram nessa conta."
      },
      {
        id: "a18q6", s: 2, t: "s8",
        e: "Ao tentar criar um resource monitor, sua conta devolve erro de privilégio. Qual é a causa mais provável segundo a documentação?",
        o: ["O monitor só pode ser criado com FREQUENCY NEVER", "Somente o papel ACCOUNTADMIN cria resource monitors", "Resource monitors exigem warehouse multi-cluster", "O nome do monitor não pode ter letras maiúsculas"],
        c: [1],
        x: "A doc diz que apenas usuários com ACCOUNTADMIN criam resource monitors; depois é possível conceder MONITOR ou MODIFY a outros papéis. FREQUENCY NEVER é só uma opção de frequência e não é exigência. Multi-cluster é recurso separado e não é pré-requisito. Maiúsculas no nome não são restrição: o nome só precisa começar com letra, e caracteres especiais pedem aspas duplas."
      }
    ],
    lab: {
      t: "Criar um resource monitor, consultar o uso e montar o relatório de custo",
      custo: "Gratuito dentro do saldo da conta de teste; usa um warehouse X-Small por poucos minutos. Confira a página oficial do trial para duração e saldo atuais.",
      tempo: "40 a 60 min",
      porque: "Faz parte do projeto final ELT governado com relatório de custo: o SQL do relatório entra no repositório snowflake-elt-portfolio.",
      antes: "Precisa de uma conta de teste, do papel ACCOUNTADMIN (para criar monitor e ler ACCOUNT_USAGE) e do warehouse lab_wh da aula anterior (ou crie outro). Na tela você verá mensagens de sucesso e tabelas de resultado; as views de ACCOUNT_USAGE podem vir vazias nas primeiras horas por causa da latência. Os passos foram conferidos contra a documentação e NÃO foram executados. A cota do monitor abaixo é um exemplo: ajuste ao saldo da sua conta.",
      passos: [
        {
          t: "Criar o monitor com gatilhos",
          cmd: "USE ROLE ACCOUNTADMIN;\nCREATE OR REPLACE RESOURCE MONITOR lab_monitor\n  WITH CREDIT_QUOTA = 5\n  TRIGGERS ON 75 PERCENT DO NOTIFY\n           ON 100 PERCENT DO SUSPEND\n           ON 110 PERCENT DO SUSPEND_IMMEDIATE;",
          p: "Sem FREQUENCY, o padrão começa imediatamente e reinicia mensalmente. Para receber e-mail use NOTIFY_USERS com usuários de e-mail verificado."
        },
        {
          t: "Atribuir o monitor ao warehouse",
          cmd: "ALTER WAREHOUSE lab_wh SET RESOURCE_MONITOR = lab_monitor;\nALTER WAREHOUSE lab_wh SET AUTO_SUSPEND = 60;",
          p: "O monitor só passa a valer quando há warehouse atribuído (ou nível de conta)."
        },
        {
          t: "Gerar atividade e consultar o histórico imediato",
          cmd: "USE WAREHOUSE lab_wh;\nSELECT COUNT(*) FROM snowflake_sample_data.tpch_sf1.orders;\nSELECT query_id, query_text, total_elapsed_time\nFROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY(DATEADD('hours', -1, CURRENT_TIMESTAMP()), CURRENT_TIMESTAMP()))\nORDER BY start_time DESC LIMIT 5;",
          p: "A função do INFORMATION_SCHEMA cobre só os últimos 7 dias."
        },
        {
          t: "Montar o relatório de custo por warehouse",
          cmd: "SELECT warehouse_name,\n       DATE_TRUNC('day', start_time) AS dia,\n       SUM(credits_used_compute) AS creditos_compute,\n       SUM(credits_used_cloud_services) AS creditos_cloud,\n       SUM(credits_used_compute) - SUM(credits_attributed_compute_queries) AS creditos_ociosos\nFROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY\nWHERE start_time >= DATEADD('days', -30, CURRENT_DATE())\nGROUP BY warehouse_name, dia\nORDER BY dia DESC, creditos_compute DESC;",
          p: "Salve como sql/cost_report.sql no repositório snowflake-elt-portfolio, seguindo a numeração dos scripts que você já usa. Se vier vazio, espere até 3 horas e tente de novo."
        },
        {
          t: "Registrar a entrega no repositório",
          p: "Adicione o SQL do monitor, o SQL do relatório e um print (sem dados pessoais, ocultando nome de conta e e-mail). No README em inglês, escreva um parágrafo Cost control explicando cota, gatilhos e auto-suspend."
        }
      ],
      verificar: "O monitor existe e está atribuído ao warehouse, você obteve o relatório com créditos por warehouse (ou entendeu que a latência explica o vazio) e o SQL está versionado.",
      limpar: [
        "ALTER WAREHOUSE lab_wh SUSPEND;",
        "Se não for mais usar: ALTER WAREHOUSE lab_wh UNSET RESOURCE_MONITOR; e DROP RESOURCE MONITOR lab_monitor; (DROP não tem recuperação: é preciso recriar o monitor).",
        "Nunca commite senhas, chaves, tokens ou e-mails reais; revise o print antes de publicar."
      ],
      erros: [
        { s: "Erro de privilégio ao criar o monitor", c: "Papel diferente de ACCOUNTADMIN", r: "Rode USE ROLE ACCOUNTADMIN; antes do CREATE RESOURCE MONITOR." },
        { s: "Erro ao ler SNOWFLAKE.ACCOUNT_USAGE", c: "Papel sem acesso ao schema", r: "Use ACCOUNTADMIN ou peça concessão de IMPORTED PRIVILEGES ou da database role USAGE_VIEWER." },
        { s: "Relatório vazio ou sem a última hora", c: "Latência da view de até 3 horas", r: "Aguarde e rode de novo; para atividade imediata use INFORMATION_SCHEMA.QUERY_HISTORY." }
      ]
    }
  };

  C.dias[19] = {
    aula: {
      titulo: "Time Travel, clonagem e compartilhamento de dados",
      resumo: "Veja como o Time Travel permite consultar e restaurar dados do passado, o que é Fail-safe, como a clonagem zero-copy economiza armazenamento e como o Secure Data Sharing compartilha dados sem copiá-los.",
      simples: {
        analogia: "Pense num documento de texto com histórico de versões ligado. Se você apagar um parágrafo sem querer, abre o histórico, volta ao momento anterior e recupera, mas só dentro de um prazo. Passado o prazo, existe ainda um cofre da empresa, o Fail-safe, que só a equipe técnica do provedor abre em emergência, e você não tem a chave. A clonagem é tirar uma cópia do caderno sem fotocopiar as páginas: as duas versões apontam para as mesmas folhas até que uma delas escreva algo novo, e só as folhas novas ocupam espaço extra. Já o compartilhamento é emprestar a leitura do caderno a outra pessoa, sem entregar cópia: ela lê, mas não pode riscar.",
        pontos: [
          "Time Travel consulta, clona e restaura dados dentro do período de retenção.",
          "UNDROP restaura tabelas, schemas e bancos apagados dentro da retenção.",
          "Fail-safe são 7 dias não configuráveis, recuperáveis só pela Snowflake.",
          "Clone zero-copy compartilha micro-partições e só gasta espaço ao divergir.",
          "Secure Data Sharing dá acesso somente leitura sem copiar dados."
        ],
        paraQueServe: "Para recuperar de erros humanos (DROP ou UPDATE errado), criar ambientes de teste baratos com clones e entender como dados são compartilhados entre contas sem duplicar armazenamento."
      },
      glossario: [
        { t: "Time Travel", d: "Recurso que permite consultar, clonar e restaurar dados e objetos de um ponto passado, dentro do período de retenção." },
        { t: "DATA_RETENTION_TIME_IN_DAYS", d: "Parâmetro que define quantos dias o Time Travel guarda o histórico de uma conta, banco, schema ou tabela." },
        { t: "UNDROP", d: "Comando que restaura um objeto apagado (como tabela, schema ou banco) se a retenção ainda não expirou." },
        { t: "Fail-safe", d: "Período de 7 dias, não configurável, após o Time Travel em que só a Snowflake pode tentar recuperar dados." },
        { t: "Zero-copy clone", d: "Cópia lógica de banco, schema ou tabela que compartilha as micro-partições da origem até haver mudanças." },
        { t: "Share", d: "Objeto nomeado do provedor que contém o necessário para compartilhar dados com outras contas, em modo somente leitura." },
        { t: "Provider e consumer", d: "Provedor é a conta que compartilha os dados; consumidor é a conta que os recebe e consulta." },
        { t: "TABLE_STORAGE_METRICS", d: "View que detalha armazenamento por tabela: bytes ativos, de Time Travel, de Fail-safe e retidos por clones." }
      ],
      blocos: [
        {
          t: "Time Travel: o que é e quanto tempo dura",
          facil: "Traduzindo: é o botão de desfazer do Snowflake, com prazo de validade que depende da configuração e da edição.",
          p: [
            "Time Travel permite consultar, clonar e restaurar dados de uma janela passada. A retenção padrão é 1 dia (24 horas) e vem habilitada em todas as contas. Na edição Standard a retenção pode ser 0 ou 1 dia. Na Enterprise ou superior, objetos transitórios e temporários vão de 0 a 1 dia, e bancos, schemas e tabelas permanentes podem ir de 0 a 90 dias. Retenção 0 desativa o Time Travel para o objeto; não dá para desativá-lo para a conta toda.",
            "O parâmetro DATA_RETENTION_TIME_IN_DAYS define o padrão da conta (ACCOUNTADMIN) ou sobrescreve em banco, schema ou tabela. Há também MIN_DATA_RETENTION_TIME_IN_DAYS, mínimo para a conta; vale o maior dos dois. Quando a retenção acaba, os dados entram no Fail-safe e não podem mais ser consultados, clonados ou restaurados pelo Time Travel. Valores e regras mudam: confira a página oficial."
          ],
          tabela: {
            cab: ["Tipo de objeto", "Padrão", "Máximo conforme a doc"],
            linhas: [
              ["Qualquer conta", "1 dia", "Standard: 0 ou 1 dia"],
              ["Permanente (Enterprise ou superior)", "1 dia", "90 dias"],
              ["Transitório e temporário (Enterprise ou superior)", "1 dia", "1 dia"]
            ]
          },
          fonte: ["Understanding & using Time Travel", "https://docs.snowflake.com/en/user-guide/data-time-travel"]
        },
        {
          t: "Consultar o passado e restaurar com UNDROP",
          facil: "Traduzindo: AT e BEFORE olham a tabela como estava antes; UNDROP traz de volta o que foi apagado.",
          p: [
            "A cláusula AT ou BEFORE aceita TIMESTAMP, OFFSET (segundos em relação a agora) ou STATEMENT (um ID de consulta). Com BEFORE e STATEMENT você vê a tabela imediatamente antes de um comando ruim.",
            F + "sql\nSELECT * FROM vendas AT(OFFSET => -300);\nSELECT * FROM vendas BEFORE(STATEMENT => '<query_id>');\nCREATE TABLE vendas_backup CLONE vendas AT(OFFSET => -3600);\nDROP TABLE vendas;\nUNDROP TABLE vendas;\n" + F,
            "UNDROP TABLE restaura a versão mais recente da tabela apagada, só dentro da retenção, e no mesmo banco e schema de onde foi apagada. Se já existir uma tabela com o mesmo nome, ocorre erro. Há exemplo na doc para restaurar por ID quando existem várias apagadas com o mesmo nome. Para schemas e bancos a sintaxe é UNDROP SCHEMA nome e UNDROP DATABASE nome; valem as mesmas regras: só dentro da retenção, erro se já existir objeto com o mesmo nome, e o objeto volta para onde estava (o schema, para o banco que o continha). Tabelas híbridas não são restauradas."
          ],
          armadilha: "Recriar uma tabela com o mesmo nome depois do DROP faz o UNDROP falhar por conflito de nome; renomeie a nova antes.",
          fonte: ["UNDROP TABLE", "https://docs.snowflake.com/en/sql-reference/sql/undrop-table"]
        },
        {
          t: "Fail-safe: a rede de segurança que não é sua",
          facil: "Traduzindo: o Fail-safe existe, mas você não consegue usar por conta própria; não conte com ele como backup.",
          p: [
            "Fail-safe é um período de 7 dias, não configurável, que começa logo depois do fim do Time Travel. É de uso exclusivo da Snowflake para recuperar dados perdidos ou danificados em falhas operacionais extremas. A página diz que não é um meio de acessar dados históricos depois do Time Travel; para pedir recuperação é preciso abrir um caso com o suporte da Snowflake, e a recuperação usa computação serverless gerenciada por ela, que é cobrada.",
            "Você pode ver o armazenamento de Fail-safe no Snowsight, em Admin, Cost management, Consumption, com o papel ACCOUNTADMIN. A página não detalha preço separado. Segundo a página de armazenamento de tabelas, tabelas transitórias e temporárias não têm Fail-safe e têm Time Travel de 0 ou 1 dia."
          ],
          dica: "Backup de verdade para o seu projeto é Time Travel dentro da retenção, mais scripts versionados no git. Se um dado precisa de recuperação além da retenção, planeje isso fora do Fail-safe: exporte, replique ou recrie a partir dos scripts de carga.",
          fonte: ["Understanding and viewing Fail-safe", "https://docs.snowflake.com/en/user-guide/data-failsafe"]
        },
        {
          t: "Clonagem zero-copy",
          facil: "Traduzindo: o clone nasce sem ocupar espaço novo e só cresce quando você muda dados nele ou na origem.",
          p: [
            "Dá para clonar bancos, schemas e tabelas não temporárias. Um clone compartilha todas as micro-partições existentes da origem no momento da clonagem, então inicialmente não usa armazenamento adicional. Cada mudança no clone gera micro-partições novas que pertencem só a ele. ",
            F + "sql\nCREATE OR REPLACE SCHEMA analytics_dev CLONE analytics;\nCREATE OR REPLACE TABLE vendas_20260101\n  CLONE vendas AT(OFFSET => -60*30);\n" + F,
            "Privilégios: o contêiner clonado (banco ou schema) não herda os privilégios da origem; os objetos filhos herdam os seus. Com COPY GRANTS, quase todos os privilégios são copiados, exceto OWNERSHIP. Tarefas e alertas clonados ficam suspensos por padrão; pipes clonados ficam pausados ou parados (STOPPED_CLONED se AUTO_INGEST = TRUE) e o clustering automático também vem suspenso. Clonar não é instantâneo: renomear ou recriar objetos de origem durante a clonagem pode gerar conflitos."
          ],
          fonte: ["Cloning considerations", "https://docs.snowflake.com/en/user-guide/object-clone"]
        },
        {
          t: "Como medir o armazenamento de clones",
          facil: "Traduzindo: para comparar espaço, olhe as colunas de bytes e o CLONE_GROUP_ID da view de métricas de armazenamento.",
          p: [
            "O armazenamento compartilhado pertence à tabela mais antiga do grupo de clones. O armazenamento é cobrado em cada estado (ativo, Time Travel e Fail-safe). A view TABLE_STORAGE_METRICS, no Information Schema, é a mais detalhada e mostra ACTIVE_BYTES, TIME_TRAVEL_BYTES, FAILSAFE_BYTES e RETAINED_FOR_CLONE_BYTES, além de ID e CLONE_GROUP_ID (iguais quando a tabela não tem clones).",
            F + "sql\nSELECT table_schema, table_name, id, clone_group_id,\n       active_bytes, time_travel_bytes, failsafe_bytes, retained_for_clone_bytes\nFROM lab_db.information_schema.table_storage_metrics\nORDER BY table_schema, table_name;\n" + F,
            "A versão de ACCOUNT_USAGE da mesma view pode atrasar até 90 minutos."
          ],
          fonte: ["Table storage considerations", "https://docs.snowflake.com/en/user-guide/tables-storage-considerations"]
        },
        {
          t: "Secure Data Sharing e Marketplace em visão geral",
          facil: "Traduzindo: o provedor libera leitura dos dados dele; o consumidor consulta sem receber cópia.",
          p: [
            "Na conta que compartilha (provider) cria-se um share; na conta que recebe (consumer), cria-se um banco a partir dele. A doc afirma que nenhum dado real é copiado ou transferido; o consumidor paga só pela computação das consultas, não pelo armazenamento dos dados compartilhados. Objetos compartilhados são somente leitura, e o provedor pode revogar o acesso a qualquer momento.",
            "Para o seu portfólio, trate compartilhamento como leitura: entender o modelo (provider, consumer, share, listing) basta para explicar em entrevista; montar um listing no Marketplace exige conta e decisões que a página trata à parte, então confira a documentação antes de tentar.",
            "Opções para compartilhar: listing, direct share, data exchange ou clean room. Listings podem ser oferecidos a várias contas como produto de dados, inclusive no Snowflake Marketplace. Reader accounts permitem compartilhar com quem não tem conta Snowflake, mas só consomem dados do provedor que as criou. Direct shares funcionam na mesma região; entre regiões ou nuvens é preciso listing com cross-cloud auto-fulfillment."
          ],
          fonte: ["About Secure Data Sharing", "https://docs.snowflake.com/en/user-guide/data-sharing-intro"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: DELETE sem WHERE em produção",
        texto: "Num ambiente de testes, alguém roda um DELETE sem WHERE na tabela vendas. A engenheira pega o ID da consulta no histórico e executa CREATE TABLE vendas_recuperada CLONE vendas BEFORE(STATEMENT => 'id'). Confere a contagem de linhas, troca os nomes das tabelas com cuidado e registra o incidente. Como a retenção era de 1 dia, ela só conseguiu isso porque agiu no mesmo dia; ela explica ao time que Fail-safe não substitui backup, pois só a Snowflake o acessa. Depois cria um clone do schema para os testes do dbt, sem custo inicial de armazenamento, e documenta que o clone passará a ocupar espaço conforme os dados divergirem."
      },
      prova: [
        "Em entrevista: diferencie Time Travel (usuário, configurável, até 90 dias em Enterprise ou superior) de Fail-safe (7 dias, só a Snowflake).",
        "No trabalho: criar ambiente de teste com clone de schema é prática comum e barata, mas lembre que privilégios do contêiner não são herdados.",
        "Explicar por que o clone não duplica armazenamento (micro-partições compartilhadas) demonstra entendimento da arquitetura.",
        "Saber que dados compartilhados são somente leitura e não são copiados responde perguntas sobre colaboração e governança."
      ],
      explique: "Explique com suas palavras a diferença entre Time Travel, Fail-safe e clone, e quando você usaria cada um depois de um erro de DELETE em produção.",
      checagem: [
        "Qual é a retenção padrão do Time Travel e o que mudaria ao ir para a edição Enterprise?",
        "Por que UNDROP TABLE falha se existe uma tabela nova com o mesmo nome?",
        "O que o Fail-safe faz e por que você não deve usá-lo como backup?",
        "Quando o clone começa a ocupar armazenamento próprio?"
      ]
    },
    fontes: [
      ["Understanding & using Time Travel", "https://docs.snowflake.com/en/user-guide/data-time-travel"],
      ["UNDROP TABLE", "https://docs.snowflake.com/en/sql-reference/sql/undrop-table"],
      ["UNDROP SCHEMA", "https://docs.snowflake.com/en/sql-reference/sql/undrop-schema"],
      ["UNDROP DATABASE", "https://docs.snowflake.com/en/sql-reference/sql/undrop-database"],
      ["Understanding and viewing Fail-safe", "https://docs.snowflake.com/en/user-guide/data-failsafe"],
      ["Cloning considerations", "https://docs.snowflake.com/en/user-guide/object-clone"],
      ["Table storage considerations", "https://docs.snowflake.com/en/user-guide/tables-storage-considerations"],
      ["About Secure Data Sharing", "https://docs.snowflake.com/en/user-guide/data-sharing-intro"],
      ["TABLE_STORAGE_METRICS view (ACCOUNT_USAGE)", "https://docs.snowflake.com/en/sql-reference/account-usage/table_storage_metrics"]
    ],
    cartoes: [
      { id: "a19c1", f: "Retenção padrão do Time Travel", v: "1 dia (24 horas), habilitada automaticamente em todas as contas.", t: "s9" },
      { id: "a19c2", f: "Retenção máxima de tabela permanente", v: "Até 90 dias, na edição Enterprise ou superior; na Standard, 0 ou 1 dia.", t: "s9" },
      { id: "a19c3", f: "AT versus BEFORE com STATEMENT", v: "AT olha o ponto indicado; BEFORE(STATEMENT => id) olha logo antes daquela consulta rodar.", t: "s9" },
      { id: "a19c4", f: "UNDROP TABLE: restrições", v: "Só dentro da retenção, no banco e schema originais, e dá erro se já existir tabela com o mesmo nome.", t: "s9" },
      { id: "a19c5", f: "Fail-safe", v: "Sete dias não configuráveis após o Time Travel; só a Snowflake recupera, via caso de suporte.", t: "s9" },
      { id: "a19c6", f: "Clone zero-copy: espaço", v: "Compartilha micro-partições da origem; mudanças geram partições novas que pertencem só a quem mudou.", t: "s9" },
      { id: "a19c7", f: "Privilégios em clone de schema", v: "O schema clonado não herda privilégios da origem; filhos herdam os seus; COPY GRANTS copia, menos OWNERSHIP.", t: "s9" },
      { id: "a19c8", f: "O que é TABLE_STORAGE_METRICS", v: "View com ACTIVE_BYTES, TIME_TRAVEL_BYTES, FAILSAFE_BYTES, RETAINED_FOR_CLONE_BYTES e CLONE_GROUP_ID.", t: "s9" },
      { id: "a19c9", f: "Data sharing e cópia de dados", v: "Nenhum dado é copiado; consumidor tem leitura e paga só a computação das suas consultas.", t: "s9" }
    ],
    questoes: [
      {
        id: "a19q1", s: 2, t: "s9",
        e: "Alguém executou um UPDATE errado numa tabela há duas horas. A retenção do Time Travel está no padrão. Qual abordagem é adequada para ver e recuperar os dados anteriores?",
        o: ["Abrir um caso com o suporte para recuperar via Fail-safe", "Usar AT ou BEFORE (por exemplo, BEFORE com o ID da consulta) e criar uma tabela por clone nesse ponto", "Aumentar o tamanho do warehouse para reverter o UPDATE", "Recriar a tabela do zero, pois o histórico não é acessível"],
        c: [1],
        x: "Dentro da retenção (padrão de 1 dia), Time Travel permite consultar e clonar a tabela como era antes da instrução usando BEFORE com STATEMENT ou AT com OFFSET ou TIMESTAMP. Fail-safe só entra depois do fim do Time Travel e é para uso da Snowflake, via suporte, então não é o primeiro passo. Warehouse maior não reverte dados. O histórico é acessível dentro da retenção, logo recriar do zero é desnecessário."
      },
      {
        id: "a19q2", s: 2, t: "s9",
        e: "Você apagou a tabela clientes, criou uma nova tabela com o mesmo nome e agora tenta UNDROP TABLE clientes. O que acontece segundo a documentação?",
        o: ["A nova tabela é sobrescrita silenciosamente", "Ocorre erro porque já existe tabela com esse nome", "O Fail-safe restaura em segundo plano", "O UNDROP restaura em outro schema automaticamente"],
        c: [1],
        x: "A página do UNDROP TABLE diz que, se uma tabela com o mesmo nome já existe, um erro é retornado. Por isso o caminho é renomear a nova antes ou restaurar com outro procedimento, como o por ID. A sobrescrita silenciosa não ocorre. Fail-safe não age em segundo plano para o usuário. A tabela só é restaurada no banco e schema que a continham ao ser apagada, não em outro."
      },
      {
        id: "a19q3", s: 2, t: "s9",
        e: "Um colega afirma que, como existe Fail-safe de 7 dias, não precisa se preocupar com backup depois que a retenção do Time Travel acabar. Qual a resposta correta?",
        o: ["Correto: o Fail-safe permite que ele mesmo restaure os dados com um comando", "Incorreto: Fail-safe é de uso exclusivo da Snowflake e exige pedido ao suporte, não sendo meio de acesso a dados históricos", "Correto: o Fail-safe dura 90 dias configuráveis", "Incorreto: Fail-safe é o mesmo que Time Travel com outro nome"],
        c: [1],
        x: "A doc afirma que Fail-safe é para uso apenas da Snowflake em falhas operacionais extremas e que não é meio de acessar dados históricos após o Time Travel; é preciso abrir caso de suporte. Não existe comando de usuário para isso. A duração é de 7 dias não configuráveis, não 90 configuráveis. E não é o mesmo que Time Travel, pois este é acessível ao usuário dentro da retenção."
      },
      {
        id: "a19q4", s: 2, t: "s9",
        e: "Você clona um schema com 200 tabelas para testes e logo em seguida consulta o armazenamento. O que se espera segundo a documentação sobre o espaço usado pelo clone?",
        o: ["Dobra imediatamente, pois os dados são copiados fisicamente", "Inicialmente nenhum armazenamento adicional, pois compartilha micro-partições; cresce quando há mudanças", "O clone nunca usa armazenamento adicional, mesmo com mudanças", "O clone só funciona se a tabela de origem estiver suspensa"],
        c: [1],
        x: "Um clone compartilha todas as micro-partições existentes da origem no momento da clonagem, então começa sem armazenamento extra; cada mudança cria partições novas pertencentes só ao clone, e aí o espaço cresce. Por isso a primeira alternativa está errada, e dizer que nunca usa espaço também erra. Tabelas não precisam estar suspensas; clonar não exige isso, embora DDL durante a clonagem possa causar conflitos de nome."
      },
      {
        id: "a19q5", s: 2, t: "s9",
        e: "Sua conta provedora compartilha um banco com a conta de um parceiro. Quais afirmações sobre Secure Data Sharing estão corretas segundo a documentação? (Escolha duas)",
        o: ["Nenhum dado é copiado entre as contas; o consumidor paga a computação das consultas", "Os objetos compartilhados são somente leitura para o consumidor", "O consumidor pode executar UPDATE nas tabelas compartilhadas", "Direct share funciona entre quaisquer regiões sem requisitos adicionais"],
        c: [0, 1],
        x: "A doc afirma que nenhum dado é copiado ou transferido e que o consumidor paga só computação; também diz que todos os objetos compartilhados são somente leitura. UPDATE pelo consumidor contraria isso. Direct shares funcionam apenas na mesma região; entre regiões ou nuvens é preciso listing com cross-cloud auto-fulfillment, então a última alternativa erra."
      },
      {
        id: "a19q6", s: 2, t: "s9",
        e: "Uma tabela permanente em conta Standard foi configurada para retenção de 30 dias, mas o comando falha. Qual é a explicação coerente com a documentação sobre edições?",
        o: ["Na edição Standard a retenção só pode ser 0 ou 1 dia; 30 dias exige Enterprise ou superior (até 90)", "O valor mínimo permitido é 90 dias", "Tabelas permanentes não têm Time Travel", "O parâmetro correto é FAILSAFE_DAYS"],
        c: [0],
        x: "Segundo a página de Time Travel, na Standard a retenção pode ser 0 ou o padrão de 1 dia; tabelas permanentes podem ir de 0 a 90 dias na Enterprise ou superior. Não existe mínimo de 90. Tabelas permanentes têm Time Travel. O parâmetro usado é DATA_RETENTION_TIME_IN_DAYS, e o Fail-safe não é configurável. Confira a página oficial para regras atuais."
      }
    ],
    lab: {
      t: "Apagar e restaurar uma tabela, clonar um schema e comparar o armazenamento",
      custo: "Gratuito dentro do saldo da conta de teste: usa um warehouse X-Small por poucos minutos e pouquíssimo armazenamento. Armazenamento de clone cresce se você alterar dados; apague tudo no final.",
      tempo: "40 a 50 min",
      porque: "Mostra recuperação de erro e governança de ambientes, com números reais de bytes para o relato em entrevista.",
      antes: "Precisa de conta de teste, de um warehouse pequeno (lab_wh) e de permissão para criar banco. Você verá mensagens de sucesso, como Table restored, e uma tabela com bytes na view de métricas. Os passos foram conferidos contra a documentação e NÃO foram executados. Se a edição da conta limitar a retenção, o padrão de 1 dia basta para este lab.",
      passos: [
        {
          t: "Criar banco, schema e uma tabela própria",
          cmd: "USE WAREHOUSE lab_wh;\nCREATE OR REPLACE DATABASE lab_db;\nCREATE OR REPLACE SCHEMA lab_db.origem;\nCREATE OR REPLACE TABLE lab_db.origem.pedidos AS\n  SELECT * FROM snowflake_sample_data.tpch_sf1.orders LIMIT 100000;",
          p: "O banco de amostra é somente leitura e não pode ser clonado, por isso você cria uma tabela sua com CREATE TABLE AS SELECT."
        },
        {
          t: "Apagar e restaurar com UNDROP",
          cmd: "DROP TABLE lab_db.origem.pedidos;\nUNDROP TABLE lab_db.origem.pedidos;\nSELECT COUNT(*) FROM lab_db.origem.pedidos;",
          p: "Você deve ver a mensagem de restauração e a contagem de 100000 linhas."
        },
        {
          t: "Consultar o passado",
          cmd: "SELECT COUNT(*) FROM lab_db.origem.pedidos AT(OFFSET => -60);",
          p: "Se der erro dizendo que o objeto não existia há 60 segundos, aumente o tempo de espera e tente de novo."
        },
        {
          t: "Clonar o schema e comparar armazenamento",
          cmd: "CREATE OR REPLACE SCHEMA lab_db.clone_dev CLONE lab_db.origem;\nSELECT table_schema, table_name, id, clone_group_id, active_bytes, retained_for_clone_bytes\nFROM lab_db.information_schema.table_storage_metrics\nWHERE table_schema IN ('ORIGEM', 'CLONE_DEV');",
          p: "Observe se ID e CLONE_GROUP_ID diferem e quanto de ACTIVE_BYTES cada um mostra. Depois altere o clone e consulte de novo."
        },
        {
          t: "Divergir o clone e comparar de novo",
          cmd: "UPDATE lab_db.clone_dev.pedidos SET o_comment = 'alterado' WHERE o_orderkey <= 1000;\n-- rode novamente a consulta de métricas",
          p: "Registre os bytes antes e depois em uma tabelinha no README do projeto (valores reais que você viu)."
        }
      ],
      verificar: "A tabela voltou após UNDROP, o clone existe e você tem os bytes de armazenamento antes e depois da divergência para explicar o zero-copy.",
      limpar: [
        "DROP DATABASE lab_db;",
        "ALTER WAREHOUSE lab_wh SUSPEND;",
        "Nunca commite senhas, chaves ou dados pessoais; no repositório vão só o SQL e a tabela de números."
      ],
      erros: [
        { s: "UNDROP retorna erro de que a tabela já existe", c: "Existe tabela nova com o mesmo nome", r: "Renomeie a tabela nova (ALTER TABLE ... RENAME TO ...) e rode o UNDROP de novo." },
        { s: "Não aparecem linhas na view de métricas do clone", c: "Filtro de schema em minúsculas ou view sem permissão para o banco", r: "Use os nomes em maiúsculas (ORIGEM, CLONE_DEV) e confirme que seu papel é dono do banco." },
        { s: "Erro ao usar AT(OFFSET => -60)", c: "O objeto não existia 60 segundos atrás", r: "Espere mais um pouco depois da criação ou use um OFFSET menor." }
      ]
    }
  };

  C.dias[20] = {
    aula: {
      titulo: "Projeto final de portfólio e caminho de certificação",
      resumo: "Monte e conte o projeto final ELT governado com relatório de custo, entenda em visão geral Snowpark e os recursos de IA da Snowflake, e conheça a certificação SnowPro Core e os recursos de estudo oficiais.",
      simples: {
        analogia: "Um projeto de portfólio é como a maquete de uma casa que você mostra a quem vai contratar a obra. Ninguém espera um prédio inteiro: esperam ver a planta clara, os materiais escolhidos e o motivo de cada escolha. O README em inglês é a placa na entrada da maquete, que diz o que ela é e como visitar. A página de decisões é o caderno do arquiteto: por que laje e não telhado, o que ficou de fora e o que custaria mudar. E contar o projeto em entrevista é guiar a visita: números verdadeiros, limites honestos, sem prometer o que a maquete não mostra. A certificação, por sua vez, é um carimbo opcional de que você conhece as regras do bairro.",
        pontos: [
          "O projeto junta carga, transformação incremental, dbt, governança e relatório de custo.",
          "O README em inglês diz o que é, por que importa, como rodar e quem mantém.",
          "A página de decisões e trade-offs explica escolhas, alternativas e limites.",
          "Em entrevista use só números que você mediu e prints que você tem.",
          "Snowpark e funções de IA têm disponibilidade e custo próprios: confira a doc.",
          "SnowPro Core custa 175 dólares por tentativa segundo a página oficial lida."
        ],
        paraQueServe: "Para transformar o que você estudou em evidência pública, honesta e fácil de explicar, e decidir com calma se a certificação vale o investimento para você."
      },
      glossario: [
        { t: "ELT governado", d: "Carregar primeiro e transformar dentro do Snowflake, com controle de acesso, mascaramento e custo acompanhados." },
        { t: "Transformação incremental", d: "Processar só dados novos ou alterados em vez de recalcular tudo a cada execução." },
        { t: "README", d: "Arquivo na raiz do repositório que explica o que o projeto faz, por que é útil, como começar e quem mantém." },
        { t: "Trade-off", d: "Escolha consciente entre alternativas, registrando o que se ganha e o que se perde com cada uma." },
        { t: "Snowpark", d: "Conjunto de bibliotecas (Java, Python e Scala) que processa dados dentro do Snowflake sem movê-los para fora." },
        { t: "Cortex AI Functions", d: "Funções SQL (e Python) que usam modelos de linguagem dentro do Snowflake, com disponibilidade regional e custos próprios." },
        { t: "SnowPro Core", d: "Certificação técnica da Snowflake sobre implementar o Snowflake; o código atual listado na página é COF-C03." },
        { t: "Rotacionar segredo", d: "Revogar uma credencial exposta e criar outra, passo essencial se uma senha ou chave foi parar no histórico do git." }
      ],
      blocos: [
        {
          t: "Arquitetura do projeto final",
          facil: "Traduzindo: um pipeline pequeno e completo, do arquivo bruto ao relatório de custo, todo em SQL versionado.",
          p: [
            "O projeto final da trilha, ELT governado com relatório de custo, reúne o que as aulas anteriores cobriram: carga com COPY INTO, transformação incremental (streams, tasks ou dynamic tables), modelos dbt, governança (funções, mascaramento e acesso por linha, da aula 16) e o relatório de custo da aula 18. Um desenho possível, que você pode ajustar ao que realmente construiu: arquivos de exemplo em um stage, carga em tabelas brutas, camadas transformadas, modelos dbt, políticas de acesso e um script de relatório de uso.",
            "Regra de ouro: só desenhe no diagrama o que existe no repositório. Se algo foi planejado e não feito, marque como próximo passo."
          ],
          lista: [
            "Carga: COPY INTO a partir de stage, com tabelas brutas.",
            "Transformação incremental: escolha uma técnica e explique o porquê.",
            "dbt: modelos, testes e documentação.",
            "Governança: papéis, mascaramento, acesso por linha.",
            "Custo: warehouse X-Small, auto-suspend, resource monitor e SQL de WAREHOUSE_METERING_HISTORY."
          ],
          dica: "Use o relatório de custo como prova de que você controla o gasto do próprio projeto.",
          fonte: ["Understanding overall cost", "https://docs.snowflake.com/en/user-guide/cost-understanding-overall"]
        },
        {
          t: "README em inglês e página de decisões e trade-offs",
          facil: "Traduzindo: o README ensina a rodar; a página de decisões mostra que você pensou.",
          p: [
            "A documentação do GitHub diz que um README costuma informar o que o projeto faz, por que é útil, como começar, onde obter ajuda e quem mantém; documentação longa é melhor em wikis. O GitHub exibe o README da pasta .github, da raiz ou de docs, nessa ordem.",
            "Estrutura sugerida (escolha sua, esta é uma sugestão): Overview, Architecture (com diagrama), Prerequisites and free trial notes, How to run (scripts numerados), Cost control (monitor e relatório), Security (nada de segredos), Limitations. Em docs/decisions.md registre, para cada decisão: contexto, opções, escolha, consequência. Exemplos de tema: X-Small com auto-suspend curto, por que dynamic table ou task, o que não foi feito por custo.",
            F + "text\nsnowflake-elt-portfolio/\n  README.md\n  docs/decisions.md\n  docs/architecture.png\n  sql/ (scripts numerados)\n  dbt/\n  .gitignore\n" + F
          ],
          armadilha: "README bonito com passos que você nunca testou quebra sua credibilidade; só afirme o que rodou.",
          fonte: ["About READMEs", "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"]
        },
        {
          t: "Como contar o projeto em entrevista",
          facil: "Traduzindo: problema, decisão, resultado medido e limite, nessa ordem, com números que você realmente viu.",
          p: [
            "Roteiro de 2 minutos: 1) o problema (carregar e transformar dados com governança e custo controlado); 2) a arquitetura em uma frase; 3) duas decisões e o trade-off de cada; 4) um número verdadeiro, como créditos consumidos no relatório, bytes lidos antes e depois, ou tempo de uma consulta; 5) o que faria diferente com mais tempo.",
            "Números verdadeiros significam: saiam do seu print, do seu relatório ou do seu Query Profile, com a data e a conta de teste. Se não mediu, diga que não mediu. Evite adjetivos como enorme ou em produção quando foi um laboratório; diga conta de teste e dados de amostra. Não prometa resultado: a entrevista avalia o seu raciocínio."
          ],
          dica: "Treine em voz alta com um temporizador; o TDAH agradece um roteiro curto de cinco tópicos.",
          fonte: ["Free trial account", "https://docs.snowflake.com/en/user-guide/admin-trial-account"]
        },
        {
          t: "Snowpark e recursos de IA: visão geral com cautela",
          facil: "Traduzindo: Snowpark deixa você escrever código em Python (ou Java e Scala) que roda no Snowflake; as funções de IA são SQL com modelos, com custo e disponibilidade próprios.",
          p: [
            "Snowpark é um conjunto de bibliotecas cliente para processar dados no Snowflake sem movê-los para o sistema da aplicação. Há bibliotecas para Java, Python e Scala. A abstração principal é o DataFrame, e a execução é preguiçosa: construir o DataFrame não busca dados; uma ação como collect envia o SQL ao Snowflake. As transformações são empurradas para o Snowflake, sem cluster separado, e UDFs inline também rodam lá.",
            "Cortex AI Functions (AISQL) são funções SQL (também disponíveis em Python) que usam modelos de linguagem, como AI_COMPLETE, AI_CLASSIFY, AI_EXTRACT e AI_SENTIMENT. A página avisa que estão disponíveis só em contas de regiões selecionadas, que algumas funções são preview e não indicadas para produção, e que o chamador precisa do privilégio USE AI FUNCTIONS e de uma database role como CORTEX_USER ou AI_FUNCTIONS_USER. Custos ficam em páginas separadas de Cost considerations e Pricing; a página do trial diz que um cartão é necessário para habilitar recursos de IA. Para o projeto de custo zero, trate isso como leitura, não como lab."
          ],
          armadilha: "Não ligue recursos de IA numa conta de teste sem ler a página de custos: consomem créditos por uso.",
          fonte: ["Snowpark API", "https://docs.snowflake.com/en/developer-guide/snowpark/index"]
        },
        {
          t: "Certificação SnowPro Core: o que a página oficial mostra",
          facil: "Traduzindo: é opcional, custa 175 dólares por tentativa segundo a página e recomenda experiência prática; para o resto, confira o guia oficial.",
          p: [
            "A página de certificações lista SnowPro Core (COF-C03, com versões regionais), especialidades (AI Governance and Security, Gen AI, Native Apps) e avançadas (como Architect, Data Engineer DEA-C02, Administrator). A página também indica que Security Engineer e Data Analyst avançadas são retiradas em 1 de dezembro de 2026.",
            "Na página do exame Core: custo de 175 dólares americanos por tentativa, com registro individual pagando o valor integral. A página recomenda 6 meses ou mais de experiência prática com o Snowflake e não lista exame prerrequisito. Habilidades testadas: arquitetura, gestão de contas e warehouses, carga e transformação, dados estruturados, semiestruturados e não estruturados, monitoramento de desempenho, colaboração e proteção de dados e conectividade. Número de questões, duração, nota de corte, validade e pesos dos domínios não aparecem nessa página: veja o Exam Study Guide oficial. Preços e regras mudam.",
            "Certificação não promete emprego nem aprovação. Para quem já tem projeto e prática, é um sinal extra, não substituto."
          ],
          fonte: ["SnowPro Core certification page", "https://learn.snowflake.com/en/certifications/snowpro-core-c03/"]
        },
        {
          t: "Recursos gratuitos oficiais para estudar",
          facil: "Traduzindo: o site de treinamento e os guias da Snowflake têm material gratuito, mas confirme cada item antes.",
          p: [
            "O learn.snowflake.com é o site de treinamento da Snowflake; a página lista cursos sob demanda, e os workshops de badges (Data Warehousing, Collaboration, Marketplace e Cost Estimation, Data Application Builders, Data Lake, Data Engineering, Data Science) aparecem como sob demanda e gratuitos. A página não diz que todo curso é gratuito: confira item a item, e nada de instrutor ao vivo, cujos preços ela não lista.",
            "Os guias e quickstarts ficam em www.snowflake.com/en/developers/guides (o endereço antigo quickstarts.snowflake.com redireciona para lá). A listagem mostra centenas de guias de vários tipos e não afirma se são gratuitos; execute com o saldo do trial e leia cada guia antes, atentando ao custo.",
            "Ordem sugerida: terminar o repositório, fazer um workshop gratuito de Data Engineering e só então decidir sobre o exame."
          ],
          fonte: ["Snowflake University", "https://learn.snowflake.com/"]
        }
      ],
      exemplo: {
        t: "Caso trabalhado: roteiro de entrevista de dois minutos",
        texto: "A engenheira abre o repositório snowflake-elt-portfolio e fala: construí um pipeline ELT em conta de teste com dados de amostra. Os arquivos entram por COPY INTO em tabelas brutas, a transformação incremental usa uma dynamic table e os modelos dbt têm testes. Para governança, apliquei mascaramento e acesso por linha. Ao medir o relatório de WAREHOUSE_METERING_HISTORY, o warehouse X-Small consumiu poucos créditos na semana, e o custo ocioso caiu quando reduzi o auto-suspend; o print está no repositório. Um trade-off: não usei multi-cluster porque o volume não exige e custaria mais. Se tivesse mais tempo, adicionaria alertas e monitoramento de falhas das tasks. Ela não cita números que não mediu."
      },
      prova: [
        "Em entrevista: o repositório com README em inglês, diagrama e trade-offs mostra comunicação técnica além do código.",
        "No trabalho: relatório de custo versionado e monitor de recursos mostram responsabilidade com gasto.",
        "Ser honesta sobre limites (conta de teste, dados de amostra) é melhor do que inflar o projeto.",
        "Conhecer Snowpark e funções de IA em visão geral, com ressalva de custo, mostra maturidade sem exagero."
      ],
      explique: "Explique com suas palavras, como numa entrevista, o seu projeto: problema, arquitetura, duas decisões com trade-offs e um número que você mediu de verdade.",
      checagem: [
        "Quais componentes compõem o projeto final e onde cada um aparece no repositório?",
        "O que fazer primeiro se uma senha foi commitada por engano e por que reescrever o histórico sozinho não basta?",
        "Que informações da página do exame SnowPro Core você confirmou e quais precisa buscar no guia oficial?",
        "Por que recursos de IA exigem cuidado de custo e disponibilidade numa conta de teste?"
      ]
    },
    fontes: [
      ["Snowpark API", "https://docs.snowflake.com/en/developer-guide/snowpark/index"],
      ["Cortex AI Functions (AISQL)", "https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql"],
      ["SnowPro Core certification page", "https://learn.snowflake.com/en/certifications/snowpro-core-c03/"],
      ["Snowflake certifications", "https://learn.snowflake.com/en/certifications/"],
      ["Snowflake University", "https://learn.snowflake.com/"],
      ["Snowflake Developer Guides and quickstarts", "https://www.snowflake.com/en/developers/guides/"],
      ["About READMEs", "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"],
      ["Removing sensitive data from a repository", "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository"],
      ["Free trial account", "https://docs.snowflake.com/en/user-guide/admin-trial-account"]
    ],
    cartoes: [
      { id: "a20c1", f: "Componentes do projeto final", v: "Carga com COPY INTO, transformação incremental, dbt, governança (mascaramento e acesso por linha) e relatório de custo.", t: "s10" },
      { id: "a20c2", f: "O que um README costuma dizer (GitHub)", v: "O que o projeto faz, por que é útil, como começar, onde obter ajuda e quem mantém.", t: "s10" },
      { id: "a20c3", f: "Conteúdo da página de decisões", v: "Contexto, opções, escolha e consequência de cada decisão, incluindo o que ficou de fora por custo.", t: "s10" },
      { id: "a20c4", f: "Número verdadeiro em entrevista", v: "Vem do seu print, relatório ou Query Profile, com a data; se não mediu, diga que não mediu.", t: "s10" },
      { id: "a20c5", f: "O que é Snowpark", v: "Bibliotecas Java, Python e Scala que processam dados no Snowflake com DataFrames de execução preguiçosa.", t: "s10" },
      { id: "a20c6", f: "Aviso sobre funções de IA do Snowflake", v: "Disponíveis em regiões selecionadas, algumas em preview, exigem privilégios e têm custos em páginas próprias.", t: "s10" },
      { id: "a20c7", f: "Custo do SnowPro Core na página oficial", v: "175 dólares americanos por tentativa; a página recomenda 6 meses ou mais de experiência prática.", t: "s10" },
      { id: "a20c8", f: "O que a página do Core não mostra", v: "Número de questões, duração, nota de corte, validade e pesos dos domínios: consulte o guia oficial.", t: "s10" },
      { id: "a20c9", f: "Segredo commitado por engano", v: "Primeiro revogar e rotacionar o segredo; reescrever o histórico com git-filter-repo pode ser complemento.", t: "s10" }
    ],
    questoes: [
      {
        id: "a20q1", s: 2, t: "s10",
        e: "Você descobre que commitou um arquivo com a senha da conta de teste no repositório público há dois commits. Qual é o primeiro passo mais importante segundo a documentação do GitHub?",
        o: ["Apagar o arquivo em um novo commit, pois isso remove a senha do histórico", "Revogar ou rotacionar a senha, pois a exposição já ocorreu", "Tornar o repositório privado e considerar o assunto resolvido", "Trocar o nome do repositório"],
        c: [1],
        x: "A doc diz que, se o dado é um segredo, é preciso revogar ou rotacionar; depois de rotacionado, ele não dá mais acesso. Apagar o arquivo em novo commit mantém a senha nos commits antigos. Reescrever o histórico com git-filter-repo é opcional e, mesmo assim, clones, forks e visões em cache podem manter o dado. Tornar o repositório privado não desfaz a exposição passada, e renomear não tem efeito."
      },
      {
        id: "a20q2", s: 2, t: "s10",
        e: "Na entrevista pedem um número do seu projeto de portfólio. Qual resposta é mais alinhada ao uso de números verdadeiros?",
        o: ["Dizer que processa milhões de linhas por dia em produção, mesmo sendo laboratório", "Citar os créditos do relatório de WAREHOUSE_METERING_HISTORY da conta de teste, com a data e o print no repositório", "Inventar um percentual de melhora para soar convincente", "Evitar qualquer número"],
        c: [1],
        x: "O número deve vir do que você mediu e pode mostrar, como o relatório de uso do próprio projeto, deixando claro que é conta de teste com dados de amostra. Afirmar produção sem ser verdade e inventar percentuais quebra a integridade e costuma ser descoberto com perguntas de acompanhamento. Evitar todo número desperdiça a evidência que o projeto gera, e o relatório de custo foi feito justamente para isso."
      },
      {
        id: "a20q3", s: 2, t: "s10",
        e: "Uma colega quer se preparar para o SnowPro Core e pergunta o que a página oficial do exame confirma sobre custo e preparo. Qual alternativa descreve corretamente o que foi lido?",
        o: ["175 dólares americanos por tentativa e recomendação de 6 ou mais meses de experiência prática, sem exame prerrequisito", "Exame gratuito para todos e validade de 10 anos", "Cobrança mensal recorrente de assinatura", "Exige obrigatoriamente um curso instrutor-led pago"],
        c: [0],
        x: "A página do Core mostra o custo de 175 dólares americanos por tentativa, recomenda 6 meses ou mais de experiência prática e não lista exame prerrequisito. Não mostra validade, então afirmar dez anos é inventar. Não fala de assinatura mensal. Também não exige curso pago obrigatório. Para questões, duração e domínios, é preciso abrir o guia de estudo oficial; preços mudam, então confira de novo."
      },
      {
        id: "a20q4", s: 2, t: "s10",
        e: "Você quer incluir Cortex AI Functions no projeto para classificar textos, mas está na conta de teste e quer evitar gastos inesperados. Qual postura é mais coerente com a documentação lida?",
        o: ["Usar à vontade, pois funções de IA são sempre gratuitas na conta de teste", "Ler as páginas de custo e disponibilidade antes, lembrando que há regiões selecionadas, itens em preview e que o trial pede cartão para recursos de IA", "Habilitar em todas as funções e conferir o custo depois", "Substituir o resource monitor por essas funções"],
        c: [1],
        x: "A página de AISQL informa regiões selecionadas, funções em preview e custos em páginas separadas; a página do trial diz que cartão é exigido para habilitar recursos de IA. Assumir gratuidade ou habilitar tudo e conferir depois contraria o objetivo de custo mínimo. Resource monitors nem cobrem serviços de IA, e as funções de IA não os substituem; a doc de monitores aponta budgets para isso."
      },
      {
        id: "a20q5", s: 2, t: "s10",
        e: "Sobre Snowpark, quais afirmações estão de acordo com a documentação? (Escolha duas)",
        o: ["Há bibliotecas para Java, Python e Scala", "Construir um DataFrame já busca todos os dados para o cliente", "As transformações são empurradas para o Snowflake, sem precisar de um cluster separado", "Snowpark só funciona com dados fora do Snowflake"],
        c: [0, 2],
        x: "A página do Snowpark afirma que há bibliotecas para Java, Python e Scala e que a transformação pesada é empurrada para o Snowflake, sem cluster separado. A execução é preguiçosa: criar o DataFrame não recupera dados, e uma ação como collect envia o SQL. Por isso a alternativa sobre buscar tudo no cliente erra, e a ideia de funcionar só fora do Snowflake contraria o propósito do recurso."
      },
      {
        id: "a20q6", s: 2, t: "s10",
        e: "Você montou o repositório final e quer verificar se algum segredo foi parar no histórico do git antes de divulgar. Qual conjunto de ações é mais adequado?",
        o: ["Olhar só o último commit; o histórico não importa", "Buscar no histórico completo por padrões de senha e chave, conferir o .gitignore e, se achar algo, rotacionar o segredo antes de reescrever histórico", "Apenas apagar a pasta local", "Confiar que o GitHub remove segredos sozinho"],
        c: [1],
        x: "Segredos podem estar em commits antigos mesmo que o arquivo atual esteja limpo, então a busca precisa cobrir todo o histórico, e .gitignore evita novos acidentes. A doc do GitHub diz que o primeiro passo diante de um segredo exposto é rotacionar; reescrever histórico é complementar. Olhar só o último commit deixa passar o antigo, apagar a pasta local não altera o remoto e não se deve contar que a plataforma limpe isso automaticamente."
      }
    ],
    lab: {
      t: "Montar o repositório final e conferir segredos no histórico",
      custo: "Gratuito: só usa seu computador e o GitHub. Se rodar consultas no Snowflake para prints, use warehouse X-Small e suspenda ao final.",
      tempo: "60 a 90 min",
      porque: "Entrega o artefato principal do portfólio e o hábito de higiene de segredos antes de publicar.",
      antes: "Precisa do git instalado, de uma conta no GitHub e dos arquivos SQL das aulas anteriores (carga, transformação, governança e o relatório de custo da aula 18). Nada aqui foi executado por mim: os passos foram conferidos contra a documentação oficial do GitHub e do Snowflake, e os comandos de git de busca são padrão do próprio git; se algo divergir, confie em git help. Você verá a estrutura de pastas e a saída das buscas de segredo no terminal.",
      passos: [
        {
          t: "Criar a estrutura de pastas",
          cmd: "mkdir snowflake-elt-portfolio && cd snowflake-elt-portfolio\ngit init\nmkdir sql docs dbt",
          p: "Coloque os SQL numerados em sql/ (carga, transformação, governança, custo), o projeto dbt em dbt/ e o diagrama em docs/architecture.png."
        },
        {
          t: "Criar .gitignore e arquivos de configuração de exemplo",
          cmd: "printf '.env\\n*.pem\\n*.p8\\nprofiles.yml\\ntarget/\\n' > .gitignore",
          p: "Guarde apenas modelos sem segredos (por exemplo, profiles.example.yml com valores fictícios). Nunca commite senhas, chaves, tokens, nome real da conta ou dados pessoais."
        },
        {
          t: "Escrever o README em inglês e a página de decisões",
          p: "README.md com Overview, Architecture, How to run, Cost control, Security e Limitations, dizendo que foi feito em conta de teste com dados de amostra. Em docs/decisions.md, uma entrada por decisão com contexto, opções, escolha e consequência. Inclua o print do relatório de custo e o SQL da aula 18. Só descreva o que você executou."
        },
        {
          t: "Conferir segredos no histórico antes do push",
          cmd: "git add -A && git commit -m \"Initial portfolio\"\ngit log --all -p -S\"password\" --oneline\ngit log --all -p -S\"PRIVATE KEY\" --oneline\ngit grep -n -i -E \"password|secret|token\" $(git rev-list --all)",
          p: "Se qualquer busca devolver algo real, pare: rotacione o segredo no Snowflake primeiro. A doc do GitHub explica a remoção com git-filter-repo, avisando que clones e forks podem manter o dado."
        },
        {
          t: "Publicar o repositório",
          cmd: "git remote add origin <url-do-seu-repositorio>\ngit push -u origin main",
          p: "Crie o repositório público snowflake-elt-portfolio no GitHub, revise o README renderizado e confirme que o diagrama aparece."
        }
      ],
      verificar: "O repositório público tem sql numerado, dbt, README em inglês, diagrama, relatório de custo, página de trade-offs, .gitignore, e as buscas no histórico não encontraram segredos.",
      limpar: [
        "ALTER WAREHOUSE lab_wh SUSPEND; (se usou o Snowflake hoje).",
        "Apague arquivos locais com credenciais (.env, chaves) fora da pasta do repositório ou mantenha-os só no cofre de senhas.",
        "Nunca commite senhas, chaves privadas, tokens, e-mails reais ou dados pessoais; se commitar, rotacione primeiro."
      ],
      erros: [
        { s: "A busca de histórico não retorna nada, mas você suspeita de vazamento", c: "O padrão buscado não cobre o formato do segredo", r: "Busque também por nomes de variáveis, trechos da chave e o nome da conta; considere ferramentas de varredura, e na dúvida rotacione." },
        { s: "git push é recusado pelo remoto", c: "Branch com nome diferente ou repositório criado com README inicial", r: "Confira o nome da branch com git branch e faça pull com rebase antes do push." },
        { s: "O diagrama não aparece no README no GitHub", c: "Caminho relativo errado ou arquivo não adicionado", r: "Use caminho relativo, como docs/architecture.png, e confirme com git status." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
