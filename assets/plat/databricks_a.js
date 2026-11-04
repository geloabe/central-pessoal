/* Databricks, aulas 1 a 4. Escritas a partir da documentação oficial; fontes por bloco e por aula. */
(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var F = "```";
  function cod(lang, linhas) { return F + lang + "\n" + linhas.join("\n") + "\n" + F; }

  /* ===================== AULA 1 ===================== */
  C.dias[1] = {
    aula: {
      titulo: "Lakehouse e Databricks: arquitetura, workspace e a Free Edition",
      resumo: "O que é um lakehouse, como a Databricks se divide em plano de controle e plano de computação, o que é o workspace e o compute serverless, o papel do Unity Catalog, e como criar de graça a Free Edition para praticar, com os limites que a documentação lista.",
      simples: {
        analogia: "Imagine um mercado de bairro. Antigamente havia dois lugares separados: o depósito enorme nos fundos, onde tudo é jogado em caixas de qualquer jeito (o data lake), e a vitrine arrumada na frente, onde só entra o que já foi conferido e etiquetado (o data warehouse). Para ter os dois, você pagava dois aluguéis e passava o dia carregando caixa de um para o outro. O lakehouse é o mesmo mercado com um só espaço: o depósito continua barato e aberto a qualquer tipo de caixa, mas com etiquetas, caderno de registro e fiscal na porta, então a vitrine e o depósito são a mesma coisa. A Databricks é a empresa que administra esse espaço: o escritório dela (o plano de controle) cuida do cadastro e das telas, e os funcionários que carregam as caixas (o plano de computação) trabalham onde estão os dados.",
        pontos: [
          "Lakehouse junta o armazenamento barato de um data lake com a organização e a confiança de um data warehouse.",
          "A Databricks tem dois planos: o de controle (serviços gerenciados por ela) e o de computação (onde os dados são processados).",
          "Serverless significa que a Databricks cuida das máquinas; na Free Edition só existe serverless.",
          "Unity Catalog é a camada que organiza e protege tudo no formato catálogo.esquema.objeto.",
          "A Free Edition é gratuita para aprender, sem cartão de crédito citado na documentação, mas com cotas e limites."
        ],
        paraQueServe: "Dar o mapa mental da plataforma antes de escrever código, e deixar sua conta gratuita pronta para todas as aulas seguintes de Databricks."
      },
      glossario: [
        { t: "Lakehouse", d: "Sistema de gestão de dados que combina os benefícios de data lakes e data warehouses, evitando manter sistemas separados para BI e machine learning." },
        { t: "Workspace", d: "O ambiente web onde você trabalha: notebooks, catálogo, SQL editor, jobs e pipelines ficam dentro dele." },
        { t: "Plano de controle (control plane)", d: "Serviços de backend gerenciados pela Databricks na conta dela, incluindo a aplicação web que você abre no navegador." },
        { t: "Plano de computação (compute plane)", d: "Onde seus dados são processados. Pode ser clássico (na sua conta de nuvem) ou serverless (hospedado pela Databricks)." },
        { t: "Serverless compute", d: "Computação gerenciada pela Databricks, sem você configurar clusters. É o único tipo disponível na Free Edition." },
        { t: "Unity Catalog", d: "Camada unificada de governança para dados e IA, com nomes no padrão catalog.schema.object e controle de acesso." },
        { t: "Catalog Explorer", d: "Tela do workspace para navegar por catálogos, esquemas, tabelas e volumes, e ver permissões e metadados." },
        { t: "Free Edition", d: "Versão gratuita da Databricks para estudantes, educadores e hobistas, em ambiente só serverless e com cota de uso." }
      ],
      blocos: [
        { t: "O que é um lakehouse", facil: "Traduzindo: lakehouse é um lugar só para guardar dados baratos como num lake e consultá-los com garantias como num warehouse.", p: [
          "Segundo a documentação da Databricks, um data lakehouse é um sistema de gestão de dados que combina os benefícios de data lakes e data warehouses. A ideia é ter armazenamento e processamento escaláveis sem manter sistemas separados para cargas como machine learning e BI.",
          "Na Databricks, o lakehouse se apoia em três peças. O Apache Spark processa os dados em computação separada do armazenamento. O Delta Lake é a camada de armazenamento otimizada, com transações ACID e validação de esquema. O Unity Catalog governa dados e IA de forma unificada.",
          "É comum organizar os dados em etapas, cada uma mais refinada que a anterior. A documentação chama esse padrão de medallion architecture, e é o que você vai montar nas aulas 4 e 5."
        ], fonte: ["Databricks: o que é um data lakehouse", "https://docs.databricks.com/aws/en/lakehouse/"], dica: "Em entrevista, resuma assim: lake barato e aberto, mais transações e governança, num lugar só." },
        { t: "Plano de controle e plano de computação", facil: "Traduzindo: o plano de controle é o escritório da Databricks; o plano de computação é a oficina onde o trabalho pesado acontece.", p: [
          "A arquitetura de alto nível tem duas partes. O plano de controle reúne os serviços de backend que a Databricks gerencia na conta dela, e inclui a aplicação web. O plano de computação é onde seus dados são processados, e existem dois tipos.",
          "No plano clássico, os recursos de computação ficam na sua conta de nuvem, na sua rede. No plano serverless, eles rodam num serverless compute plane hospedado pela Databricks na mesma região do workspace. A documentação explica que o clássico tem isolamento natural por ficar em conta de cada cliente, enquanto o serverless usa fronteiras de rede e camadas de segurança.",
          "Sobre armazenamento, workspaces clássicos exigem que você forneça um bucket para o armazenamento do workspace. Workspaces serverless usam o default storage, um local totalmente gerenciado para dados internos e ativos do Unity Catalog. A página também avisa para nunca apagar nem modificar o armazenamento do workspace na sua nuvem."
        ], fonte: ["Databricks: arquitetura de alto nível", "https://docs.databricks.com/aws/en/getting-started/high-level-architecture"], armadilha: "Achar que serverless quer dizer sem servidor nenhum. Os servidores existem, só que quem cuida deles é a Databricks." },
        { t: "Workspace, notebooks e linguagens", facil: "Traduzindo: o workspace é a sua bancada; o notebook é o caderno onde você mistura texto, SQL e Python.", p: [
          "Notebooks permitem escrever e executar código em Python, SQL, Scala e R. Cada notebook tem uma linguagem padrão, mostrada abaixo do nome, e as células usam essa linguagem. Para trocar a linguagem de uma única célula, comece a célula com um comando mágico: %python, %r, %scala ou %sql. Só pode haver um comando mágico por célula e ele precisa ser a primeira linha.",
          "Duas pegadinhas da documentação. Primeira: variáveis não passam de uma linguagem para outra, porque cada linguagem tem o seu próprio REPL. Segunda: o resultado de uma célula %sql fica disponível como _sqldf nas células Python e SQL seguintes.",
          "Na prática, você vai alternar entre as duas linguagens o tempo todo: SQL para consultar, Python para scripts e para a API de DataFrame."
        ], fonte: ["Databricks: desenvolver código em notebooks", "https://docs.databricks.com/aws/en/notebooks/notebooks-code"] },
        { t: "Unity Catalog em uma página", facil: "Traduzindo: todo objeto tem um endereço de três partes, catálogo, esquema e nome, e é nesse endereço que se dá permissão.", p: [
          "O Unity Catalog é a camada unificada de governança para dados e IA embutida na Databricks. Cada ativo governado é um objeto protegível (securable object), e você concede permissões a usuários, grupos ou service principals.",
          "Tabelas, views, volumes, funções e modelos seguem o padrão catalog.schema.object. Tabelas e volumes podem ser gerenciados, quando o Unity Catalog cuida da governança e do ciclo de vida do armazenamento, ou externos, quando ele cuida só da governança.",
          "A documentação lista como capacidades o controle de acesso, a descoberta pelo Catalog Explorer, a linhagem, a auditoria, a classificação de dados, o monitoramento de qualidade e o compartilhamento. A aula 6 aprofunda; aqui basta saber navegar pelo Catalog Explorer e escrever nomes de três partes."
        ], fonte: ["Databricks: visão geral do Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/"] },
        { t: "Databricks Free Edition: o que é", facil: "Traduzindo: é uma conta gratuita e permanente para aprender, com computação pequena e uma cota de uso.", p: [
          "A Free Edition é descrita como uma versão sem custo da Databricks para estudantes, educadores e hobistas. A página oficial de produto diz que é para uso pessoal, não para produção nem trabalho comercial. Ela substituiu a Community Edition, aposentada em 2025.",
          "Funciona num ambiente só serverless e com cota. Cada novo workspace já vem com computação serverless e armazenamento padrão. A documentação cita notebooks, SQL editor, dashboards com Genie, pipelines com Lakeflow, jobs, e recursos de IA, tudo com limites.",
          "Para criar, entre na página de cadastro da Free Edition, escolha o método de login e a Databricks cria um workspace novo para você. A documentação de limitações cita login por e-mail com código, Google ou Microsoft."
        ], fonte: ["Databricks: documentação da Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition"], dica: "Use um e-mail pessoal. A edição é para aprender, e contas inativas podem ser apagadas segundo a página de limitações." },
        { t: "Limites da Free Edition que importam para estudar", facil: "Traduzindo: dá para fazer todos os labs, mas a máquina é pequena, a internet de saída é restrita e há uma cota diária.", p: [
          "Da página oficial de limitações, os pontos mais úteis: só computação serverless, sem configuração de cluster; acesso de saída à internet limitado a domínios confiáveis; um único SQL warehouse, no tamanho máximo 2X-Small; no máximo 5 tarefas de job simultâneas por conta; um pipeline Lakeflow ativo por tipo de pipeline.",
          "Não há suporte a R nem Scala, nem a locais de armazenamento personalizados do workspace. Há um workspace e um metastore por conta, sem console de conta. O uso é não comercial e não há SLA.",
          "Sobre a cota: se você excede o uso justo, a computação é desligada até o limite reiniciar, o que pode levar o resto do dia ou, em casos extremos, o resto do mês. Seus dados e configurações não são apagados. Os números exatos da cota não aparecem na página, então confira a página oficial para valores atuais."
        ], fonte: ["Databricks: limitações da Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"], armadilha: "Deixar uma consulta pesada ou um loop rodando e estourar a cota do dia. Teste sempre com poucos dados antes." },
        { t: "Dados de amostra e treinamento gratuito", facil: "Traduzindo: já existe um catálogo chamado samples com dados prontos, e a Databricks oferece cursos gratuitos no seu ritmo.", p: [
          "O catálogo samples do Unity Catalog traz, segundo a documentação, o schema nyctaxi com a tabela trips (corridas de táxi de Nova York), o schema tpcds_sf1 (benchmark de cerca de 1 GB), o tpch (cerca de 1 TB, grande demais para brincar), o wanderbricks (reservas de viagem simuladas) e o databricks, que contém o volume datasets em /Volumes/samples/databricks/datasets/.",
          "Para estudo guiado, a página de produto da Free Edition cita treinamento self-paced na Databricks Academy, gratuito. A documentação não detalha quais cursos são gratuitos, então confira o catálogo atual antes de se inscrever."
        ], fonte: ["Databricks: conjuntos de dados de amostra", "https://docs.databricks.com/aws/en/discover/databricks-datasets"] }
      ],
      exemplo: { t: "Sua primeira consulta no catálogo samples", texto: "Você acabou de criar a conta e abriu o workspace. No Catalog Explorer, você expande o catálogo samples, depois o schema nyctaxi e vê a tabela trips. Em um notebook novo, com a linguagem padrão Python, você escreve na primeira célula spark.sql com um SELECT de poucas linhas dessa tabela e exibe com display. Na segunda célula, começa com %sql e escreve SELECT count(*) FROM samples.nyctaxi.trips. Repare que o endereço tem três partes: catálogo, esquema e tabela. Você não criou cluster nenhum, porque a Free Edition só tem serverless. Se a célula demorar na primeira vez, é a computação sendo alocada. Você tira um print do notebook com as duas células executadas e guarda como evidência do lab." },
      prova: [
        "Em entrevista, pedem para explicar a diferença entre plano de controle e plano de computação e onde ficam os dados e o processamento no serverless.",
        "No trabalho, você precisa explicar a um colega por que uma tabela tem nome de três partes e quem controla o acesso a ela.",
        "Ao avaliar custo de uma proposta, você diferencia computação serverless gerenciada pela Databricks de clusters clássicos na conta da empresa.",
        "No portfólio, você aponta uma conta Free Edition como ambiente reproduzível, citando as limitações e o uso não comercial."
      ],
      explique: "Explique com as próprias palavras o que é um lakehouse, o que cada plano (controle e computação) faz, e por que a Free Edition serve para estudar mas não para trabalho de produção.",
      checagem: [
        "Quais são os dois tipos de plano de computação e onde cada um roda?",
        "Qual é o padrão de nome de um objeto no Unity Catalog e o que significa gerenciado versus externo?",
        "Cite três limites da Free Edition e o que acontece quando a cota é excedida.",
        "Como você troca a linguagem de uma única célula num notebook e o que não é compartilhado entre linguagens?"
      ]
    },
    fontes: [
      ["Databricks: documentação da Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition"],
      ["Databricks: limitações da Free Edition", "https://docs.databricks.com/aws/en/getting-started/free-edition-limitations"],
      ["Databricks: página de produto da Free Edition", "https://www.databricks.com/learn/free-edition"],
      ["Databricks: arquitetura de alto nível", "https://docs.databricks.com/aws/en/getting-started/high-level-architecture"],
      ["Databricks: o que é um data lakehouse", "https://docs.databricks.com/aws/en/lakehouse/"],
      ["Databricks: visão geral do Unity Catalog", "https://docs.databricks.com/aws/en/data-governance/unity-catalog/"],
      ["Databricks: desenvolver código em notebooks", "https://docs.databricks.com/aws/en/notebooks/notebooks-code"],
      ["Databricks: conjuntos de dados de amostra", "https://docs.databricks.com/aws/en/discover/databricks-datasets"],
      ["Databricks Learning: treinamento self-paced", "https://learn.databricks.com/"]
    ],
    cartoes: [
      { id: "a1c1", t: "d1", f: "O que é um lakehouse?", v: "Sistema de dados que combina os benefícios de data lakes e data warehouses, sem manter sistemas separados para BI e machine learning." },
      { id: "a1c2", t: "d1", f: "As três peças do lakehouse na Databricks?", v: "Apache Spark (processamento), Delta Lake (camada de armazenamento com ACID e validação de esquema) e Unity Catalog (governança)." },
      { id: "a1c3", t: "d1", f: "O que fica no plano de controle?", v: "Serviços de backend gerenciados pela Databricks na conta dela, incluindo a aplicação web do workspace." },
      { id: "a1c4", t: "d1", f: "Plano de computação clássico x serverless?", v: "Clássico roda na sua conta de nuvem e na sua rede. Serverless roda num plano hospedado pela Databricks, na mesma região do workspace." },
      { id: "a1c5", t: "d1", f: "Padrão de nome no Unity Catalog?", v: "catalog.schema.object, para tabelas, views, volumes, funções e modelos." },
      { id: "a1c6", t: "d1", f: "Como mudar a linguagem de uma célula?", v: "Começar a célula com %python, %sql, %scala ou %r, como primeira linha. Só um comando mágico por célula." },
      { id: "a1c7", t: "d1", f: "Que tipo de computação a Free Edition tem?", v: "Só serverless, com cota de uso. Não dá para configurar clusters personalizados." },
      { id: "a1c8", t: "d1", f: "Qual o tamanho do SQL warehouse na Free Edition?", v: "Existe um único SQL warehouse, limitado ao tamanho 2X-Small, segundo a página de limitações." },
      { id: "a1c9", t: "d1", f: "O que acontece se a cota da Free Edition acaba?", v: "A computação é desligada até o limite reiniciar (resto do dia ou, em casos extremos, do mês). Dados e configurações não são apagados." },
      { id: "a1c10", t: "d1", f: "Onde estão os dados de amostra?", v: "No catálogo samples: nyctaxi.trips, tpcds_sf1, tpch, wanderbricks e o volume databricks.datasets." }
    ],
    questoes: [
      { id: "a1q1", s: 1, t: "d1", e: "Um colega diz que usar a Databricks significa que seus dados saem da sua conta de nuvem e ficam no escritório da empresa fornecedora. Você precisa corrigir a ideia explicando a divisão entre os planos. Qual afirmação descreve melhor a arquitetura?", o: ["O plano de controle abriga os serviços de backend e a aplicação web; o processamento dos dados acontece no plano de computação, clássico ou serverless", "Todo o processamento acontece no plano de controle, e o plano de computação só guarda arquivos", "O plano de computação serve apenas para a interface web, e o processamento fica no navegador", "Existe um único plano, que sempre roda na conta de nuvem do cliente", "O plano de controle roda sempre na conta do cliente e o de computação na Databricks"], c: [0], x: "O plano de controle reúne os serviços gerenciados pela Databricks, incluindo a aplicação web, e o plano de computação é onde os dados são processados, em dois formatos. Dizer que o processamento ocorre no plano de controle inverte os papéis. Dizer que o plano de computação serve a interface confunde com o controle. Falar em plano único ignora que a documentação descreve dois. Inverter quem roda onde também erra: o clássico fica na conta do cliente e o serverless é hospedado pela Databricks." },
      { id: "a1q2", s: 1, t: "d1", e: "Você criou sua conta na Free Edition e tenta criar um cluster com bibliotecas e tipo de máquina customizados para um teste, mas não encontra a opção. Qual é o motivo mais provável segundo a documentação oficial?", o: ["A conta foi bloqueada por falta de pagamento", "A Free Edition só oferece computação serverless e não aceita configurações de computação personalizadas", "Clusters só podem ser criados por quem tem o plano pago de IA", "O navegador precisa ser atualizado", "Clusters são criados automaticamente toda manhã e não podem ser editados"], c: [1], x: "A página de limitações diz que a Free Edition é serverless apenas e que configurações personalizadas de computação não têm suporte. Bloqueio por pagamento não se aplica a um plano sem custo. Associar a criação de clusters a um plano pago de IA não aparece na documentação. Atualizar o navegador não altera o que o plano oferece. A ideia de clusters automáticos diários também não existe: o modelo é serverless sob demanda." },
      { id: "a1q3", s: 1, t: "d1", e: "Num notebook cuja linguagem padrão é Python, você quer rodar apenas uma consulta SQL numa célula e depois reaproveitar o resultado na célula seguinte em Python. O que fazer?", o: ["Criar outro notebook só para SQL e copiar os valores manualmente", "Começar a célula com o comando mágico %sql e usar o resultado como _sqldf nas células seguintes", "Não é possível misturar linguagens num notebook", "Colocar o SQL entre aspas numa variável Python e esperar que ele rode sozinho", "Usar dois comandos mágicos na mesma célula, %sql e %python"], c: [1], x: "Um comando mágico como primeira linha troca a linguagem só daquela célula, e a documentação diz que o resultado do %sql fica disponível como _sqldf em células Python e SQL seguintes. Criar outro notebook é desnecessário. Afirmar que não dá para misturar contradiz a documentação. Uma string em variável não executa nada sozinha. E só pode haver um comando mágico por célula, então usar dois é inválido." },
      { id: "a1q4", s: 1, t: "d1", e: "Você quer escrever uma consulta sobre a tabela de corridas de táxi do catálogo de amostras da Databricks. Qual nome completo segue o padrão de três níveis do Unity Catalog?", o: ["nyctaxi.trips", "samples/nyctaxi/trips", "samples.nyctaxi.trips", "trips.samples.nyctaxi", "samples:nyctaxi:trips"], c: [2], x: "O padrão é catálogo, esquema e objeto separados por ponto, e a documentação de dados de amostra cita samples.nyctaxi.trips. Só esquema e tabela ficam incompletos e dependem do catálogo atual. Barras lembram caminhos de arquivos e volumes, não nomes de tabela. A ordem invertida coloca a tabela como catálogo. Dois pontos não são separador válido de nomes no Unity Catalog." },
      { id: "a1q5", s: 1, t: "d1", e: "(Escolha duas) Você vai usar a Free Edition como ambiente de estudo e portfólio e quer registrar corretamente no README o que a documentação diz sobre ela. Quais afirmações são corretas?", o: ["Ela é para uso não comercial", "Ela oferece SLA de disponibilidade para produção", "Ela permite escolher Scala e R como linguagens de notebook", "Ela tem um único SQL warehouse de tamanho 2X-Small", "Ela permite criar vários workspaces e metastores por conta"], c: [0, 3], x: "A página de limitações lista uso não comercial e um único SQL warehouse limitado a 2X-Small. Ela também diz que não há SLA nem garantias de confiabilidade, então prometer SLA está errado. R e Scala aparecem como recursos sem suporte. E a conta tem um workspace e um metastore, não vários, então a afirmação sobre múltiplos contradiz a documentação." },
      { id: "a1q6", s: 1, t: "d1", e: "Num dia de estudo intenso, a computação da sua Free Edition parou de responder depois de várias consultas pesadas, e você teme ter perdido suas tabelas. O que a documentação diz sobre essa situação?", o: ["Os dados são apagados imediatamente e é preciso recriar tudo", "A conta é cancelada definitivamente", "A computação é desligada até a cota reiniciar, e os dados e as configurações não são excluídos", "A Databricks cobra automaticamente no cartão de crédito", "O workspace é movido para outra região"], c: [2], x: "A página diz que exceder a cota de uso justo desliga a computação até o limite reiniciar, que pode ser o resto do dia ou, em casos extremos, do mês, e que dados e configurações não são excluídos. Apagar tudo ou cancelar a conta não é descrito. Cobrança automática não consta da documentação e não combina com um plano sem custo. Mudança de região também não consta da documentação." },
      { id: "a1q7", s: 1, t: "d1", e: "Seu líder pergunta qual é a vantagem do lakehouse em relação a manter um data lake e um data warehouse separados. Qual resposta reflete a documentação da Databricks?", o: ["Elimina a necessidade de qualquer governança de dados", "Combina os benefícios de lakes e warehouses, evitando sistemas separados para cargas como BI e machine learning", "Só funciona com dados totalmente estruturados", "Obriga a copiar todos os dados para um warehouse proprietário", "Substitui o Spark por um mecanismo único de consulta SQL"], c: [1], x: "A documentação define o lakehouse como a combinação dos benefícios de data lakes e data warehouses, com escala de armazenamento e processamento sem sistemas separados. Dizer que elimina governança é o oposto, pois o Unity Catalog entra justamente para governar. Limitar a dados estruturados ignora o uso para ML. Copiar tudo para um warehouse proprietário contradiz a proposta. E a Databricks é construída sobre o Apache Spark, não o substitui." }
    ],
    lab: {
      t: "Criar a conta, abrir um notebook e explorar o catálogo samples",
      custo: "gratuito (Free Edition; a documentação não cita cartão de crédito no cadastro, mas confira a página oficial no momento de criar a conta)",
      tempo: "30 a 45 min",
      porque: "Sem um workspace funcionando, nenhuma das próximas aulas de Databricks roda. Este lab também gera a primeira evidência: um print do notebook executado.",
      antes: "Você precisa de um e-mail pessoal ou conta Google ou Microsoft, e de um navegador. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu a aula, então os nomes de menus podem ter mudado: se algo estiver diferente, vale a tela. Na tela você verá o workspace com o menu lateral, onde ficam o Catalog (Catalog Explorer), o SQL Editor e os notebooks. Não aparece criação de cluster, porque a Free Edition só tem computação serverless. Se pedirem pagamento ou cartão em algum momento, pare e releia a página oficial antes de continuar.",
      passos: [
        { t: "Criar a conta", cmd: "", p: "Abra a página oficial da Free Edition (www.databricks.com/learn/free-edition), clique em Sign up for Free Edition e escolha um método de login (e-mail com código, Google ou Microsoft). A Databricks cria um workspace novo para você." },
        { t: "Explorar o catálogo", cmd: "", p: "No Catalog Explorer, expanda o catálogo samples e o schema nyctaxi, e abra a tabela trips. Veja as colunas e uma amostra dos dados. Anote também o nome do catálogo do seu workspace que aparece no Catalog Explorer (a documentação não informa um nome padrão), que você usará no lugar de <catalogo> nas próximas aulas." },
        { t: "Criar um notebook e rodar SQL", cmd: "%sql\nSELECT count(*) AS corridas FROM samples.nyctaxi.trips;\n\nSELECT * FROM samples.nyctaxi.trips LIMIT 10;", p: "Crie um notebook novo no workspace. Na primeira célula, use o comando mágico %sql para rodar as consultas. Se a primeira execução demorar, a computação serverless está sendo alocada." },
        { t: "Rodar Python em outra célula", cmd: "df = spark.table('samples.nyctaxi.trips')\nprint(df.count())\ndisplay(df.limit(10))\ndf.printSchema()", p: "Em uma célula Python, leia a mesma tabela com spark.table, conte as linhas e veja o esquema. Compare a contagem com a da consulta SQL: devem ser iguais." },
        { t: "Registrar a evidência", cmd: "", p: "Tire um print do notebook com as células executadas e os resultados visíveis. Salve como docs/aula1_notebook.png na pasta do seu repositório databricks-lakehouse-portfolio, sem mostrar seu e-mail nem dados pessoais." }
      ],
      verificar: "Você tem um notebook com uma célula SQL e uma célula Python executadas sobre samples.nyctaxi.trips, as duas contagens coincidem e o print está salvo.",
      limpar: [
        "Não há recurso pago para desligar: a computação serverless é gerenciada e a Free Edition tem cota de uso.",
        "Guarde o print; antes de publicar, apague da imagem qualquer e-mail ou nome de usuário visível.",
        "Nunca commite tokens de acesso nem cookies. Nesta aula você não precisa criar nenhum."
      ],
      erros: [
        { s: "Não encontro a tabela samples.nyctaxi.trips", c: "Pode ter mudado o nome ou o catálogo samples pode estar oculto no seu workspace.", r: "Abra o Catalog Explorer, procure samples e navegue pelos schemas. Confira também a página oficial de datasets de amostra." },
        { s: "A célula fica carregando por muito tempo na primeira vez", c: "A computação serverless está sendo iniciada, ou a cota do dia foi atingida.", r: "Aguarde um pouco. Se a computação estiver desligada por cota, os dados não foram apagados: volte quando o limite reiniciar e confira a página de limitações." },
        { s: "Erro ao usar uma variável Python numa célula SQL", c: "Variáveis não passam de uma linguagem para outra, pois cada linguagem tem seu REPL.", r: "Reescreva a célula SQL com os valores direto, ou use spark.sql em Python para montar a consulta." }
      ]
    }
  };

  /* ===================== AULA 2 ===================== */
  C.dias[2] = {
    aula: {
      titulo: "Delta Lake: tabelas, transações e time travel",
      resumo: "Como o Delta Lake guarda tabelas como arquivos Parquet mais um log de transações, o que ACID garante, como ler o histórico, voltar no tempo e restaurar versões, fazer upsert com MERGE INTO, lidar com esquema e manter a tabela com OPTIMIZE e VACUUM.",
      simples: {
        analogia: "Pense num caderno de receitas da família escrito a lápis e caneta, onde cada alteração é anotada numa folha de controle no fim: hoje a vovó trocou o açúcar por mel, ontem acrescentaram uma receita. Quem quiser saber como o bolo era na semana passada folheia o controle e reconstrói a versão antiga, sem precisar de uma foto de cada dia. Ninguém rasga páginas antigas na hora, só marca que não valem mais. De vez em quando, alguém faz a faxina e joga fora as páginas velhas que ninguém mais vai consultar. O Delta Lake funciona assim: os dados continuam em arquivos comuns, e uma folha de controle (o log de transações) registra cada mudança, o que permite voltar no tempo, restaurar e garantir que ninguém leia uma receita pela metade.",
        pontos: [
          "Delta é arquivos Parquet mais um log de transações, e toda escrita cria uma nova versão da tabela.",
          "ACID garante que leitores nunca veem dados inconsistentes, mesmo com várias escritas.",
          "DESCRIBE HISTORY mostra o histórico; VERSION AS OF e TIMESTAMP AS OF leem versões antigas; RESTORE volta a tabela.",
          "MERGE INTO faz upsert: atualiza o que existe e insere o que é novo.",
          "VACUUM apaga arquivos antigos e, com isso, encerra a viagem no tempo para além da retenção."
        ],
        paraQueServe: "Dar a base de armazenamento de todo o lakehouse: é nas tabelas Delta que vão morar as camadas bronze, silver e gold dos próximos projetos."
      },
      glossario: [
        { t: "Delta Lake", d: "Camada de armazenamento que estende arquivos Parquet com um log de transações baseado em arquivos, dando ACID e metadados escaláveis." },
        { t: "Log de transações", d: "Registro ordenado de cada alteração na tabela. É dele que saem as versões, o histórico e a viagem no tempo." },
        { t: "ACID", d: "Atomicidade, consistência, isolamento e durabilidade: transações que ou acontecem inteiras ou não acontecem." },
        { t: "Time travel", d: "Consultar uma versão anterior da tabela, por número de versão ou por data e hora." },
        { t: "RESTORE", d: "Comando que devolve a tabela a um estado anterior, registrando isso como uma nova mudança de dados." },
        { t: "MERGE INTO", d: "Comando de upsert: compara origem e destino por uma chave e atualiza, insere ou apaga conforme as cláusulas." },
        { t: "Schema enforcement", d: "Validação na escrita: dados com esquema diferente do da tabela são rejeitados em vez de gravados." },
        { t: "Schema evolution", d: "Alteração controlada do esquema da tabela durante uma escrita, quando você habilita explicitamente." },
        { t: "VACUUM", d: "Remove arquivos de dados não referenciados pela versão atual e mais antigos que o limite de retenção." }
      ],
      blocos: [
        { t: "Delta é Parquet mais um log", facil: "Traduzindo: os dados são arquivos Parquet comuns; o que torna a tabela confiável é o caderno de registro ao lado.", p: [
          "Segundo a documentação da Databricks, o Delta Lake é a camada de armazenamento otimizada que serve de base para as tabelas do lakehouse. Ele estende arquivos de dados Parquet com um log de transações baseado em arquivos, para ter transações ACID e metadados escaláveis.",
          "Todas as tabelas na Databricks são tabelas Delta por padrão. Cada escrita cria uma nova versão da tabela, e você pode consultar as versões anteriores. A documentação cita ainda validação de esquema na escrita, compactação de arquivos, upserts com merge e change data feed.",
          "O projeto de código aberto Delta Lake descreve o ACID com níveis de isolamento serializável, de modo que leitores nunca veem dados inconsistentes."
        ], fonte: ["Databricks: Delta Lake na Databricks", "https://docs.databricks.com/aws/en/delta/"], dica: "Em entrevista: Delta não é um formato novo de arquivo de dados, é Parquet mais um log que dá transações." },
        { t: "Criar tabela e ver o histórico", facil: "Traduzindo: cada comando que muda a tabela vira uma linha no histórico, com número de versão e operação.", p: [
          "Como Delta é o padrão, criar uma tabela já cria uma tabela Delta. Cada alteração gera uma versão, e DESCRIBE HISTORY lista as operações, da mais nova para a mais antiga. Com LIMIT 1 você vê só a última.",
          cod("sql", [
            "CREATE OR REPLACE TABLE <catalogo>.estudo.pedidos (id INT, produto STRING, qtd INT);",
            "INSERT INTO <catalogo>.estudo.pedidos VALUES (1,'caneta',10),(2,'caderno',5);",
            "INSERT INTO <catalogo>.estudo.pedidos VALUES (3,'lapis',20);",
            "DESCRIBE HISTORY <catalogo>.estudo.pedidos;"
          ]),
          "O histórico é guardado conforme a propriedade logRetentionDuration, cujo padrão é 30 dias. Anote os números de versão que aparecem na coluna version: você vai usá-los no time travel e no RESTORE. Repare que cada INSERT virou uma linha própria, com a operação e o horário. É esse registro que permite auditar quem mudou o quê e quando. A aba History do Catalog Explorer mostra os mesmos dados do DESCRIBE HISTORY, se você preferir olhar pela interface em vez de rodar o comando."
        ], fonte: ["Databricks: histórico da tabela Delta", "https://docs.databricks.com/aws/en/delta/history"] },
        { t: "Time travel e RESTORE", facil: "Traduzindo: você pode ler a tabela como ela era numa versão ou data, e também voltar a tabela inteira para esse ponto.", p: [
          "Para ler uma versão antiga, use VERSION AS OF ou TIMESTAMP AS OF. Em Python, as opções são versionAsOf e timestampAsOf. Subconsultas não são permitidas nessas cláusulas.",
          cod("sql", [
            "SELECT * FROM <catalogo>.estudo.pedidos VERSION AS OF 1;",
            "SELECT * FROM <catalogo>.estudo.pedidos TIMESTAMP AS OF '2026-11-04';",
            "RESTORE TABLE <catalogo>.estudo.pedidos TO VERSION AS OF 1;"
          ]),
          "O RESTORE exige permissão MODIFY na tabela e aceita TO VERSION AS OF ou TO TIMESTAMP AS OF. Ele é tratado como uma mudança de dados, então vira uma nova versão no histórico, e consumidores em streaming podem reprocessar linhas restauradas. Não é possível restaurar para uma versão cujos arquivos de dados foram apagados pelo VACUUM."
        ], fonte: ["Databricks: histórico, time travel e RESTORE", "https://docs.databricks.com/aws/en/delta/history"], armadilha: "Achar que RESTORE apaga o histórico. Ele cria uma nova versão; as anteriores continuam até a retenção expirar." },
        { t: "MERGE INTO: o upsert", facil: "Traduzindo: o MERGE compara a tabela com um lote de novidades e decide, linha a linha, se atualiza ou insere.", p: [
          "O MERGE casa linhas da origem com a tabela destino por uma condição. WHEN MATCHED atualiza as linhas que casaram, e WHEN NOT MATCHED insere as que não existiam. Existe ainda WHEN NOT MATCHED BY SOURCE, disponível no Databricks SQL e no Runtime 12.2 LTS ou superior, que atualiza ou apaga linhas do destino sem correspondência na origem; a documentação recomenda condição para não reescrever a tabela toda.",
          cod("sql", [
            "MERGE INTO <catalogo>.estudo.pedidos AS d",
            "USING <catalogo>.estudo.pedidos_novos AS o",
            "ON d.id = o.id",
            "WHEN MATCHED THEN UPDATE SET d.qtd = o.qtd",
            "WHEN NOT MATCHED THEN INSERT (id, produto, qtd) VALUES (o.id, o.produto, o.qtd);"
          ]),
          "Atenção: apenas uma linha da origem pode casar com uma linha do destino. Se várias linhas da origem casarem com a mesma linha do destino, o merge pode falhar, e por isso a documentação recomenda deduplicar a origem antes."
        ], fonte: ["Databricks: upsert com MERGE", "https://docs.databricks.com/aws/en/delta/merge"], dica: "Antes de um MERGE, rode um GROUP BY id HAVING count(*) > 1 na origem. Duplicata na chave é a causa mais comum de erro." },
        { t: "Esquema: enforcement e evolution", facil: "Traduzindo: por padrão a tabela rejeita dados com colunas diferentes; para aceitar colunas novas, você precisa pedir.", p: [
          "O Delta valida o esquema na escrita (enforcement): se os dados não combinam com o esquema da tabela, a escrita é rejeitada. Para mudar o esquema de propósito, há dois caminhos.",
          "O primeiro é manual, com ALTER TABLE ... ADD COLUMNS, e as colunas novas são anuláveis por padrão. O segundo é a evolução durante a escrita, habilitada por operação: em INSERT use a opção mergeSchema do DataFrame (no Runtime 18.1 ou superior também há INSERT WITH SCHEMA EVOLUTION); em MERGE use MERGE WITH SCHEMA EVOLUTION no Runtime 15.4 LTS ou superior, ou withSchemaEvolution() na API.",
          cod("python", [
            "(df_novo.write.format('delta').mode('append')",
            "   .option('mergeSchema', 'true')",
            "   .saveAsTable('<catalogo>.estudo.pedidos'))"
          ]),
          "A configuração de sessão autoMerge afeta todas as escritas e a documentação a desaconselha em produção. Por padrão, sobrescrever dados não troca o esquema; para isso existe overwriteSchema."
        ], fonte: ["Databricks: atualizar o esquema de uma tabela Delta", "https://docs.databricks.com/aws/en/delta/update-schema"], armadilha: "Ligar evolução automática em toda a sessão e deixar uma coluna com erro de digitação virar coluna nova na tabela." },
        { t: "OPTIMIZE e VACUUM", facil: "Traduzindo: OPTIMIZE junta arquivos pequenos em maiores; VACUUM faz a faxina dos arquivos velhos, e a faxina encerra a viagem no tempo.", p: [
          "OPTIMIZE reescreve arquivos de dados para melhorar o layout, compactando arquivos pequenos. É idempotente: rodar duas vezes no mesmo dado não muda nada na segunda. A documentação recomenda liquid clustering em vez de partições ou ZORDER, e cita a predictive optimization, que roda OPTIMIZE automaticamente em tabelas gerenciadas do Unity Catalog.",
          "VACUUM apaga arquivos de dados que a versão atual não referencia e que passaram do limite de retenção, cujo padrão é 7 dias. VACUUM tabela DRY RUN lista o que seria apagado sem apagar. A Databricks recomenda fortemente retenção de pelo menos 7 dias.",
          cod("sql", [
            "OPTIMIZE <catalogo>.estudo.pedidos;",
            "VACUUM <catalogo>.estudo.pedidos DRY RUN;"
          ]),
          "Depois de um VACUUM, versões mais antigas que a retenção deixam de ser consultáveis. Para estender o time travel é preciso aumentar as duas propriedades: delta.logRetentionDuration (padrão 30 dias) e delta.deletedFileRetentionDuration (padrão 7 dias). Retenção maior significa mais custo de armazenamento."
        ], fonte: ["Databricks: VACUUM", "https://docs.databricks.com/aws/en/delta/vacuum"], dica: "No lab, use sempre DRY RUN primeiro. Reduzir a retenção para zero sem entender o risco pode quebrar leituras e jobs longos." }
      ],
      exemplo: { t: "O upsert que corrigiu um estoque e foi desfeito", texto: "Você tem a tabela pedidos com três linhas, versão 2 no histórico. Chega um lote de correções com dois registros: o id 2 com quantidade nova e o id 4, que é novo. O MERGE INTO casa por id: o id 2 cai em WHEN MATCHED e tem a quantidade atualizada, e o id 4 cai em WHEN NOT MATCHED e é inserido, gerando a versão 3. Ao conferir, você percebe que o lote estava errado. Em vez de reprocessar tudo, roda DESCRIBE HISTORY, confirma que a versão 2 era o estado bom, faz SELECT com VERSION AS OF 2 para olhar, e executa RESTORE TABLE para a versão 2. O restore vira a versão 4 no histórico, e as linhas do lote errado somem da tabela atual. Nada foi perdido, pois os arquivos antigos ainda estavam dentro da retenção." },
      prova: [
        "Em entrevista, pedem para explicar como o Delta garante ACID sobre arquivos Parquet e o que é o log de transações.",
        "No trabalho, um dado entrou errado numa tabela e você usa DESCRIBE HISTORY e RESTORE para voltar ao estado bom sem reprocessar tudo.",
        "Ao desenhar um pipeline de carga incremental, você escolhe MERGE INTO com chave e deduplica a origem antes para evitar falha.",
        "Numa revisão de custo, alguém pergunta por que o armazenamento cresce e você explica retenção, versões antigas e VACUUM."
      ],
      explique: "Explique com as próprias palavras como o Delta Lake permite voltar no tempo, qual é o papel do VACUUM nisso e por que deduplicar a origem antes de um MERGE.",
      checagem: [
        "O que o Delta guarda além dos arquivos Parquet e para que serve?",
        "Qual a diferença entre ler VERSION AS OF e executar RESTORE?",
        "Quais propriedades controlam a retenção do histórico e dos arquivos, e quais os padrões?",
        "Por que um MERGE pode falhar quando a origem tem chaves repetidas?"
      ]
    },
    fontes: [
      ["Databricks: Delta Lake na Databricks", "https://docs.databricks.com/aws/en/delta/"],
      ["Databricks: histórico, time travel e RESTORE", "https://docs.databricks.com/aws/en/delta/history"],
      ["Databricks: upsert com MERGE", "https://docs.databricks.com/aws/en/delta/merge"],
      ["Databricks: atualizar o esquema de uma tabela Delta", "https://docs.databricks.com/aws/en/delta/update-schema"],
      ["Databricks: VACUUM", "https://docs.databricks.com/aws/en/delta/vacuum"],
      ["Databricks: OPTIMIZE", "https://docs.databricks.com/aws/en/delta/optimize"],
      ["Databricks: boas práticas do Delta Lake", "https://docs.databricks.com/aws/en/delta/best-practices"],
      ["Delta Lake (projeto aberto): introdução", "https://docs.delta.io/latest/delta-intro.html"]
    ],
    cartoes: [
      { id: "a2c1", t: "d2", f: "O que é uma tabela Delta?", v: "Arquivos de dados Parquet mais um log de transações baseado em arquivos, que dá ACID e metadados escaláveis." },
      { id: "a2c2", t: "d2", f: "Como ver o histórico de uma tabela?", v: "DESCRIBE HISTORY nome_da_tabela, mais recente primeiro. Com LIMIT 1, só a última operação." },
      { id: "a2c3", t: "d2", f: "Sintaxe de time travel em SQL?", v: "SELECT * FROM tabela VERSION AS OF n, ou TIMESTAMP AS OF 'data'. Em Python, as opções versionAsOf e timestampAsOf." },
      { id: "a2c4", t: "d2", f: "Como restaurar uma tabela?", v: "RESTORE TABLE tabela TO VERSION AS OF n (ou TIMESTAMP AS OF). Exige MODIFY e vira uma nova versão no histórico." },
      { id: "a2c5", t: "d2", f: "Retenção padrão do log e dos arquivos?", v: "delta.logRetentionDuration: 30 dias. delta.deletedFileRetentionDuration: 7 dias, usado pelo VACUUM." },
      { id: "a2c6", t: "d2", f: "O que o VACUUM faz com o time travel?", v: "Apaga arquivos não referenciados mais antigos que a retenção; versões mais velhas deixam de poder ser lidas ou restauradas." },
      { id: "a2c7", t: "d2", f: "Como prever o que o VACUUM apagaria?", v: "VACUUM tabela DRY RUN lista os arquivos candidatos sem remover nada." },
      { id: "a2c8", t: "d2", f: "Quais cláusulas tem um MERGE?", v: "WHEN MATCHED, WHEN NOT MATCHED e WHEN NOT MATCHED BY SOURCE (Runtime 12.2 LTS ou superior)." },
      { id: "a2c9", t: "d2", f: "Por que deduplicar a origem do MERGE?", v: "Só uma linha da origem pode casar com uma linha do destino; várias casando com a mesma podem fazer o merge falhar." },
      { id: "a2c10", t: "d2", f: "Como aceitar colunas novas na escrita?", v: "Habilitar evolução por operação: mergeSchema no write, MERGE WITH SCHEMA EVOLUTION ou ALTER TABLE ADD COLUMNS manual." },
      { id: "a2c11", t: "d2", f: "OPTIMIZE é idempotente?", v: "Sim: rodado duas vezes sobre o mesmo dado, a segunda execução não tem efeito. Ele compacta arquivos pequenos." }
    ],
    questoes: [
      { id: "a2q1", s: 1, t: "d2", e: "Uma pessoa nova no time pergunta o que realmente existe no armazenamento quando você cria uma tabela padrão na Databricks e por que ela tem transações, mesmo sendo apenas arquivos. Qual resposta está correta?", o: ["Um banco de dados proprietário fechado que só a Databricks lê", "Arquivos CSV e um catálogo externo mantido pelo usuário", "Arquivos Parquet mais um log de transações baseado em arquivos que registra cada versão", "Um único arquivo JSON reescrito a cada atualização", "Apenas metadados, com os dados guardados na memória do cluster"], c: [2], x: "A documentação diz que o Delta Lake estende arquivos Parquet com um log de transações baseado em arquivos, dando ACID e metadados escaláveis. Dizer banco proprietário fechado erra, pois os dados ficam em arquivos Parquet. CSV com catálogo externo descreve outro desenho. Um JSON único reescrito não escalaria nem daria versões. E guardar dados só em memória do cluster contradiz a persistência em armazenamento." },
      { id: "a2q2", s: 1, t: "d2", e: "Um job gravou um lote errado numa tabela Delta ontem. Você precisa ver como a tabela estava antes do lote e, depois de confirmar, devolver a tabela àquele estado. Qual sequência de comandos faz isso?", o: ["DROP TABLE e recriar a tabela a partir do zero", "DESCRIBE HISTORY para achar a versão, SELECT com VERSION AS OF para conferir e RESTORE TABLE ... TO VERSION AS OF", "VACUUM com retenção de zero horas e depois OPTIMIZE", "MERGE INTO com a própria tabela como origem", "ALTER TABLE ADD COLUMNS para marcar o lote errado"], c: [1], x: "O histórico dá o número da versão, o SELECT com VERSION AS OF permite olhar sem alterar, e o RESTORE devolve a tabela, registrando uma nova versão. Recriar a tabela perde o histórico e é desnecessário. VACUUM remove arquivos e atrapalharia a recuperação em vez de ajudar. MERGE com ela mesma não desfaz nada. ALTER TABLE ADD COLUMNS muda esquema e não desfaz dados." },
      { id: "a2q3", s: 1, t: "d2", e: "Seu MERGE INTO começou a falhar depois que a tabela de origem passou a receber o mesmo id em duas linhas no mesmo lote. Qual é a causa e a correção mais adequada segundo a documentação?", o: ["O destino não pode ter coluna id; renomear a coluna", "Mais de uma linha da origem casa com a mesma linha do destino; deduplicar a origem antes do MERGE", "O MERGE só funciona com tabelas particionadas; particionar por id", "É preciso rodar VACUUM antes de todo MERGE", "O MERGE não aceita WHEN NOT MATCHED; remover essa cláusula"], c: [1], x: "A documentação afirma que apenas uma linha da origem pode casar com uma linha do destino, e recomenda deduplicar a origem. Renomear a coluna id não tem relação. Particionar não é exigência do MERGE. VACUUM antes de cada merge não é requisito e ainda apagaria arquivos antigos. E WHEN NOT MATCHED é uma cláusula válida e comum, então removê-la não resolve." },
      { id: "a2q4", s: 1, t: "d2", e: "Você rodou VACUUM numa tabela e depois tentou RESTORE para uma versão de três semanas atrás, mas a operação falhou por falta de arquivos. Considerando os padrões documentados, qual explicação é mais coerente?", o: ["O RESTORE só funciona nos últimos 5 minutos", "O VACUUM removeu arquivos de dados não referenciados mais antigos que a retenção padrão de 7 dias, e a versão antiga dependia deles", "A tabela não era Delta", "O log de transações só guarda 1 dia", "O RESTORE exige que a tabela seja externa"], c: [1], x: "A documentação diz que o VACUUM apaga arquivos não referenciados além do limite de retenção, que por padrão é de 7 dias, e que não se pode restaurar para uma versão cujos arquivos foram apagados. Limite de 5 minutos não existe. Em Databricks, tabelas são Delta por padrão. O log fica 30 dias por padrão, não um dia. E não há exigência de tabela externa para o RESTORE." },
      { id: "a2q5", s: 1, t: "d2", e: "(Escolha duas) Você precisa aceitar uma coluna nova vinda de um arquivo em uma tabela Delta existente, sem alterar o esquema de forma acidental em outros jobs. Quais abordagens são adequadas?", o: ["Usar a opção mergeSchema apenas na escrita que deve evoluir o esquema", "Ligar a configuração de sessão autoMerge em todos os notebooks", "Rodar ALTER TABLE ADD COLUMNS manualmente antes da carga", "Apagar a tabela e deixar o Spark inferir de novo sempre", "Desligar a validação de esquema do Delta"], c: [0, 2], x: "A evolução por operação com mergeSchema, e a alteração manual com ADD COLUMNS, são os caminhos descritos e controlados. A configuração de sessão autoMerge vale para todas as escritas e a documentação a desaconselha em produção, por causar mudanças não intencionais. Apagar a tabela perde histórico e é exagero. Desligar a validação de esquema não é uma opção descrita e destruiria a garantia do enforcement." },
      { id: "a2q6", s: 1, t: "d2", e: "Antes de limpar arquivos antigos de uma tabela em produção, você quer saber quais seriam removidos sem apagar nada, com a retenção padrão. Qual comando usar?", o: ["OPTIMIZE tabela", "RESTORE TABLE tabela TO VERSION AS OF 0", "VACUUM tabela DRY RUN", "DESCRIBE HISTORY tabela LIMIT 1", "DROP TABLE tabela"], c: [2], x: "VACUUM com DRY RUN lista os arquivos que seriam excluídos sem removê-los, que é exatamente o preview pedido. OPTIMIZE compacta arquivos e não lista candidatos à remoção. RESTORE altera a tabela. DESCRIBE HISTORY mostra operações, não arquivos a apagar. DROP TABLE apagaria a tabela inteira, o oposto de um preview seguro." },
      { id: "a2q7", s: 1, t: "d2", e: "O time quer ter 90 dias de time travel numa tabela crítica e aumentou apenas delta.logRetentionDuration para 90 dias. Dias depois, não conseguem ler versões de duas semanas atrás. Qual é o ajuste que faltou?", o: ["Reduzir o logRetentionDuration para 30 dias", "Aumentar também delta.deletedFileRetentionDuration, pois o VACUUM usa essa propriedade para apagar os arquivos de dados", "Trocar a tabela por uma view", "Rodar OPTIMIZE todos os dias", "Mudar o formato da tabela para CSV"], c: [1], x: "A documentação explica que o time travel precisa do log e dos arquivos de dados da versão, e que para estendê-lo é preciso elevar as duas propriedades, porque o VACUUM apaga arquivos conforme a deletedFileRetentionDuration, de 7 dias por padrão. Reduzir o log só piora. Uma view não guarda versões. OPTIMIZE não controla retenção. CSV não tem log de transações." }
    ],
    lab: {
      t: "Tabela Delta com MERGE, time travel e RESTORE",
      custo: "gratuito (Free Edition, serverless, tabelas pequenas)",
      tempo: "35 a 45 min",
      porque: "Esses cinco comandos (histórico, time travel, MERGE, RESTORE e VACUUM com DRY RUN) são o dia a dia de quem mantém tabelas Delta, e o histórico impresso vira evidência.",
      antes: "Você precisa do workspace da aula 1 e do nome do seu catálogo (veja no Catalog Explorer). Troque <catalogo> pelo nome real. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu a aula, então ajuste nomes e versões ao que aparecer no seu DESCRIBE HISTORY. Se você não tiver permissão para criar o schema, crie-o pelo Catalog Explorer ou use um schema que já exista. Na tela, o DESCRIBE HISTORY mostra colunas como version, timestamp e operation; os números de versão do seu histórico podem diferir dos do exemplo.",
      passos: [
        { t: "Criar schema e tabela", cmd: "CREATE SCHEMA IF NOT EXISTS <catalogo>.estudo;\nCREATE OR REPLACE TABLE <catalogo>.estudo.pedidos (id INT, produto STRING, qtd INT);\nINSERT INTO <catalogo>.estudo.pedidos VALUES (1,'caneta',10),(2,'caderno',5);\nINSERT INTO <catalogo>.estudo.pedidos VALUES (3,'lapis',20);", p: "Rode em células %sql. A tabela é Delta por padrão. Cada INSERT gera uma versão." },
        { t: "Ver o histórico", cmd: "DESCRIBE HISTORY <catalogo>.estudo.pedidos;", p: "Anote os números de versão e as operações. Identifique qual versão tem as três linhas (provavelmente a última)." },
        { t: "Fazer o MERGE", cmd: "CREATE OR REPLACE TEMP VIEW pedidos_novos AS\nSELECT * FROM VALUES (2,'caderno',8),(4,'borracha',30) AS t(id, produto, qtd);\n\nMERGE INTO <catalogo>.estudo.pedidos AS d\nUSING pedidos_novos AS o\nON d.id = o.id\nWHEN MATCHED THEN UPDATE SET d.qtd = o.qtd\nWHEN NOT MATCHED THEN INSERT (id, produto, qtd) VALUES (o.id, o.produto, o.qtd);\n\nSELECT * FROM <catalogo>.estudo.pedidos ORDER BY id;", p: "O id 2 deve ser atualizado e o id 4 inserido. Se o TEMP VIEW falhar na sua computação, crie uma tabela pedidos_novos com os mesmos valores." },
        { t: "Time travel", cmd: "SELECT * FROM <catalogo>.estudo.pedidos VERSION AS OF 2;\nSELECT * FROM <catalogo>.estudo.pedidos ORDER BY id;", p: "Compare a versão anterior ao MERGE (use o número que seu histórico mostra) com a tabela atual. A diferença deve ser o id 2 e o id 4." },
        { t: "Restaurar e conferir", cmd: "RESTORE TABLE <catalogo>.estudo.pedidos TO VERSION AS OF 2;\nDESCRIBE HISTORY <catalogo>.estudo.pedidos;\nVACUUM <catalogo>.estudo.pedidos DRY RUN;", p: "Depois do RESTORE, o id 4 deve sumir e o id 2 voltar a 5. Observe a nova linha RESTORE no histórico. O VACUUM com DRY RUN apenas lista; não apague nada." },
        { t: "Registrar a evidência", cmd: "", p: "Salve em docs/aula2_historico.png um print do DESCRIBE HISTORY mostrando as operações MERGE e RESTORE, e guarde as consultas num arquivo sql/aula2_delta.sql." }
      ],
      verificar: "O histórico mostra INSERTs, MERGE e RESTORE; a tabela voltou ao conteúdo da versão escolhida; o DRY RUN listou arquivos (ou nenhum) sem apagar.",
      limpar: [
        "Se quiser, apague a tabela de estudo com DROP TABLE; os dados de amostra do lab não têm valor de produção.",
        "Não rode VACUUM sem DRY RUN e não reduza a retenção abaixo do padrão para testar.",
        "Guarde o arquivo sql/aula2_delta.sql e o print; nenhum segredo é necessário nesta aula."
      ],
      erros: [
        { s: "Erro de permissão ao criar o schema", c: "Você não tem CREATE SCHEMA no catálogo escolhido.", r: "Crie o schema pelo Catalog Explorer ou use um catálogo onde você tenha CREATE SCHEMA e USE CATALOG (a página de CREATE SCHEMA exige esses dois privilégios)." },
        { s: "MERGE falha com várias linhas casando", c: "A origem tem o mesmo id repetido.", r: "Deduplique a origem antes (por exemplo, com GROUP BY ou row_number) e rode o MERGE de novo." },
        { s: "RESTORE falha por arquivos ausentes", c: "A versão pedida depende de arquivos removidos por VACUUM ou fora da retenção.", r: "Use uma versão mais recente listada no DESCRIBE HISTORY. Em tabelas deste lab o problema não deveria ocorrer, pois nada foi vacuumado." }
      ]
    }
  };

  /* ===================== AULA 3 ===================== */
  C.dias[3] = {
    aula: {
      titulo: "Spark SQL e PySpark no Databricks",
      resumo: "Como usar Spark SQL e a API de DataFrame do PySpark no mesmo notebook: transformações preguiçosas e ações, joins, window functions, funções nativas versus UDF, e como ler e gravar arquivos em Volumes do Unity Catalog.",
      simples: {
        analogia: "Pense em uma receita escrita num caderno versus cozinhar de fato. Enquanto você só escreve a lista de passos (picar a cebola, refogar, juntar o tomate), nada foi para a panela: você apenas planejou. O fogo só acende quando alguém pede o prato. O Spark funciona assim. As transformações (filtrar, juntar, agrupar) só anotam o plano, e as ações (contar, mostrar, gravar) acendem o fogo e executam tudo de uma vez, de um jeito otimizado, já que ele viu a receita inteira. Usar funções nativas é como usar utensílios da cozinha profissional, feitos para aquilo. Uma UDF é como pedir a um vizinho de outra cozinha que faça um passo à mão: funciona, mas cada ida e volta custa tempo.",
        pontos: [
          "SQL e DataFrame são duas formas de escrever o mesmo plano; você pode misturar à vontade.",
          "Transformações são preguiçosas; só ações como count, display e write executam o trabalho.",
          "Window functions calculam valores por grupo sem colapsar as linhas.",
          "Funções nativas são mais rápidas que UDFs; use UDF só quando não houver alternativa.",
          "Arquivos ficam em Volumes, com caminhos /Volumes/catálogo/esquema/volume/..."
        ],
        paraQueServe: "É a ferramenta de transformação de todos os pipelines das próximas aulas, e a diferença entre escrever código que escala e código que trava a computação."
      },
      glossario: [
        { t: "DataFrame", d: "Tabela distribuída com colunas nomeadas, manipulada pela API do Spark em Python, SQL, Scala ou R." },
        { t: "Transformação", d: "Operação que cria um novo conjunto de dados a partir de outro e não executa na hora, como filter, select, join e groupBy." },
        { t: "Ação", d: "Operação que dispara a execução e devolve um resultado, como count, collect, show e escrita em tabela." },
        { t: "Avaliação preguiçosa (lazy)", d: "Spark só lembra as transformações e as computa quando uma ação precisa do resultado, o que permite otimizar o plano todo." },
        { t: "Window function", d: "Função que calcula um valor para cada linha usando um grupo de linhas relacionadas (a janela), sem agregá-las numa só." },
        { t: "UDF", d: "Função definida pelo usuário, aplicada a linhas ou lotes; costuma ser mais lenta que as funções nativas do Spark." },
        { t: "Volume", d: "Objeto do Unity Catalog que governa arquivos de qualquer formato, com caminho /Volumes/catálogo/esquema/volume." },
        { t: "Join", d: "Combinação de dois DataFrames por uma condição ou chave, com tipos como inner, left, full, semi e anti." }
      ],
      blocos: [
        { t: "SQL e DataFrame: duas portas, um motor", facil: "Traduzindo: você pode escrever SQL ou código Python; o Spark monta o mesmo plano de execução.", p: [
          "No Databricks você consulta com SQL em células %sql, ou com a API de DataFrame em Python. A documentação do tutorial de DataFrames mostra spark.sql para consultar tabelas, select e filter para transformar, selectExpr para usar expressões SQL, orderBy para ordenar, display para mostrar e write.mode('overwrite').saveAsTable para gravar. As tabelas gravadas usam o formato Delta por padrão.",
          cod("python", [
            "from pyspark.sql.functions import desc",
            "df = spark.table('samples.nyctaxi.trips')",
            "sub = df.filter(df['trip_distance'] > 5).select('trip_distance', 'fare_amount')",
            "display(sub.orderBy(desc('fare_amount')).limit(10))",
            "sub.write.mode('overwrite').saveAsTable('<catalogo>.estudo.corridas_longas')"
          ]),
          "A documentação não lista as colunas de samples.nyctaxi.trips: os nomes trip_distance e fare_amount aqui são suposições. Rode df.printSchema() antes e troque pelos nomes reais se o erro de coluna aparecer. O display mostra o resultado em tabela e permite alternar para gráfico, o que ajuda a conferir a olho se a transformação fez sentido."
        ], fonte: ["Databricks: tutorial de DataFrames do Apache Spark", "https://docs.databricks.com/aws/en/getting-started/dataframes"], dica: "Quando o SQL for mais natural, use spark.sql para voltar a um DataFrame e continuar em Python." },
        { t: "Transformações preguiçosas e ações", facil: "Traduzindo: filtrar e juntar só anotam o plano; contar, mostrar ou gravar é que fazem o Spark trabalhar.", p: [
          "O guia de programação do Spark define dois tipos de operação: transformações, que criam um novo conjunto de dados a partir de um existente, e ações, que devolvem um valor ao driver depois de executar uma computação. Todas as transformações são preguiçosas: elas não calculam o resultado na hora, apenas lembram o que foi aplicado, e só computam quando uma ação precisa do resultado.",
          "O guia explica que isso permite ao Spark trabalhar com mais eficiência, porque ele enxerga a cadeia inteira antes de executar. Exemplos de ação: reduce, collect, count, first, take e salvar em arquivo. O mesmo raciocínio vale para DataFrames.",
          "Consequência prática: se o seu notebook roda instantaneamente num filter e demora num count, não há mistério. O filter só anotou; o count executou tudo. Por isso também os erros de dados costumam aparecer só na ação. Dica de estudo: ao depurar, chame display ou count depois de cada etapa para descobrir em qual transformação o problema nasce, e remova essas chamadas depois."
        ], fonte: ["Apache Spark: guia de programação (transformações e ações)", "https://spark.apache.org/docs/latest/rdd-programming-guide.html"], armadilha: "Chamar collect() num dataset grande. Ele traz tudo para o driver; prefira limit, take ou agregar antes." },
        { t: "Joins", facil: "Traduzindo: join junta duas tabelas por uma chave; o tipo de join decide quem sobra quando não há par.", p: [
          "No PySpark, a assinatura é join(other, on=None, how=None). O parâmetro on aceita um nome de coluna, uma lista de nomes ou uma condição; how define o tipo: inner (o padrão), left, right, full, cross, semi e anti, com apelidos como left_outer. Quando on é um nome comum às duas tabelas, a coluna aparece uma só vez no resultado.",
          cod("python", [
            "ida = df.groupBy('pickup_zip').count().withColumnRenamed('count', 'saidas')",
            "volta = df.groupBy('dropoff_zip').count().withColumnRenamed('count', 'chegadas')",
            "j = ida.join(volta, ida['pickup_zip'] == volta['dropoff_zip'], 'left')",
            "display(j.orderBy('saidas', ascending=False).limit(10))"
          ]),
          "Os nomes pickup_zip e dropoff_zip também são suposições (a documentação não lista as colunas): confira com printSchema. Left semi e left anti são úteis para filtrar: semi mantém só as linhas com par; anti mantém só as sem par, e nenhum dos dois traz colunas da outra tabela. Já o SQL equivalente usa JOIN com ON na célula %sql."
        ], fonte: ["Apache Spark: DataFrame.join (PySpark)", "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.join.html"], dica: "Ao juntar duas tabelas com colunas de mesmo nome, dê apelido às tabelas para não cair em coluna ambígua." },
        { t: "Window functions", facil: "Traduzindo: calcula um valor para cada linha olhando um grupo ao redor, sem juntar as linhas num resultado só.", p: [
          "A documentação do Spark SQL define a sintaxe: função OVER (PARTITION BY coluna ORDER BY expressão frame). Há três famílias: ranking (RANK, DENSE_RANK, ROW_NUMBER, NTILE e outras), analíticas (LAG, LEAD, FIRST_VALUE, LAST_VALUE e outras) e agregadas (SUM, AVG, MIN, MAX, COUNT usadas sobre a janela).",
          "A diferença entre RANK e DENSE_RANK está nos empates: com RANK, empatados dividem a posição e o número seguinte é pulado; com DENSE_RANK não há buracos. LAG devolve o valor da linha anterior da partição e LEAD o da seguinte.",
          cod("sql", [
            "SELECT pickup_zip, dia, corridas,",
            "  RANK() OVER (PARTITION BY dia ORDER BY corridas DESC) AS posicao,",
            "  LAG(corridas) OVER (PARTITION BY pickup_zip ORDER BY dia) AS ontem",
            "FROM corridas_por_dia;"
          ]),
          "Em PySpark, o equivalente usa Window.partitionBy().orderBy() com .over(), mas confira a página oficial da API para a sintaxe da sua versão."
        ], fonte: ["Apache Spark: funções de janela em SQL", "https://spark.apache.org/docs/latest/sql-ref-syntax-qry-select-window.html"] },
        { t: "Funções nativas versus UDF", facil: "Traduzindo: use as funções que já vêm no Spark; só escreva uma UDF quando não houver como.", p: [
          "A documentação da Databricks diz que as funções nativas do Spark são otimizadas para processamento distribuído e têm melhor desempenho em escala. Funções nativas e UDFs SQL são as opções mais eficientes. UDFs em Python tendem a ser mais lentas que as UDFs Scala, porque os dados precisam ser serializados e enviados ao interpretador Python. As UDFs pandas melhoram isso, usando Apache Arrow para reduzir o custo de serialização; a página afirma que são até 100 vezes mais rápidas que as UDFs Python comuns.",
          "A recomendação oficial: use funções nativas ou UDFs SQL sempre que possível, especialmente em grandes volumes e cargas recorrentes ou de streaming, e reserve UDFs Python ou pandas para lógica que as nativas não conseguem expressar. UDFs são razoáveis para consultas ad hoc, limpeza manual e análise exploratória.",
          "Antes de escrever uma UDF, procure na lista de funções do Spark. Muita coisa que parece exigir UDF (datas, texto, condicionais) já tem função pronta."
        ], fonte: ["Databricks: funções definidas pelo usuário", "https://docs.databricks.com/aws/en/udf/"], armadilha: "Escrever uma UDF Python para algo que when/otherwise ou uma função de texto já resolvem." },
        { t: "Arquivos em Volumes", facil: "Traduzindo: volumes são pastas governadas pelo Unity Catalog, com endereço /Volumes/catálogo/esquema/volume.", p: [
          "Volumes são objetos do Unity Catalog que governam dados não tabulares, em qualquer formato. O caminho é /Volumes/<catálogo>/<esquema>/<volume>/<pasta>/<arquivo>, o mesmo para Spark, SQL, Python e outras bibliotecas. Um volume gerenciado fica no armazenamento gerenciado do esquema; o externo é registrado num caminho de armazenamento existente. A documentação diz que volumes não podem ser registrados como tabelas.",
          "Para criar um volume gerenciado: CREATE VOLUME catálogo.esquema.nome. As páginas de arquivos mostram leitura com Spark (spark.read.format('csv').load do caminho) e com pandas (pd.read_csv do caminho), além de os.mkdir para criar pastas. A página de utilitários do Databricks (dbutils) mostra, com caminhos de volume, dbutils.fs.put(arquivo, texto, True) para gravar um texto, dbutils.fs.cp, dbutils.fs.ls e dbutils.fs.mkdirs.",
          cod("python", [
            "caminho = '/Volumes/<catalogo>/estudo/arquivos'",
            "dbutils.fs.put(caminho + '/amostra.csv', 'id,valor\\n1,10\\n2,20\\n', True)",
            "lido = spark.read.format('csv').option('header', 'true').load(caminho + '/amostra.csv')",
            "display(lido)"
          ]),
          "A página de arquivos em volumes avisa que escrita com append direto ou não sequencial não é suportada. Ela não traz exemplos de escrita com df.write nem com open(); para isso, confira a página oficial."
        ], fonte: ["Databricks: o que são volumes", "https://docs.databricks.com/aws/en/volumes/"], dica: "Para criar o volume e subir arquivos pela interface, use o Catalog Explorer." }
      ],
      exemplo: { t: "O mesmo resultado em SQL e em PySpark", texto: "Você quer saber as cinco zonas de origem com mais corridas na tabela de táxi. Em SQL, escreve um SELECT de pickup_zip e count(*) agrupando por pickup_zip, ordenando de forma decrescente com LIMIT 5. Em PySpark, parte de spark.table da mesma tabela, aplica groupBy, count, orderBy decrescente e limit 5. Nenhuma das duas linhas de transformação executa nada sozinha: o trabalho só começa quando você chama display. Você compara os dois resultados e eles coincidem, porque ambos viram o mesmo plano. Em seguida, acrescenta uma window function com RANK particionada por dia para ver a posição de cada zona em cada dia. Por fim, grava o resultado numa tabela do seu schema. Se alguém sugerir uma UDF para formatar o código da zona, você primeiro procura uma função nativa de texto." },
      prova: [
        "Em entrevista, pedem para explicar a diferença entre transformação e ação e por que o Spark é preguiçoso.",
        "No trabalho, você reescreve uma UDF Python lenta usando funções nativas e mede a diferença de tempo.",
        "Numa análise, você usa uma window function com ranking por grupo para achar o top N de cada categoria.",
        "Ao ingerir arquivos, você lê CSVs de um volume do Unity Catalog em vez de caminhos soltos de armazenamento."
      ],
      explique: "Explique com as próprias palavras o que acontece quando você encadeia filter, join e groupBy e só depois chama count, e por que funções nativas são preferíveis a UDFs.",
      checagem: [
        "Dê dois exemplos de transformação e dois de ação no Spark.",
        "Qual a diferença entre RANK e DENSE_RANK quando há empates?",
        "Por que uma UDF Python costuma ser mais lenta do que uma função nativa?",
        "Como é o caminho de um arquivo dentro de um volume do Unity Catalog?"
      ]
    },
    fontes: [
      ["Databricks: tutorial de DataFrames do Apache Spark", "https://docs.databricks.com/aws/en/getting-started/dataframes"],
      ["Apache Spark: guia de programação (transformações e ações)", "https://spark.apache.org/docs/latest/rdd-programming-guide.html"],
      ["Apache Spark: DataFrame.join (PySpark)", "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.join.html"],
      ["Apache Spark: funções de janela em SQL", "https://spark.apache.org/docs/latest/sql-ref-syntax-qry-select-window.html"],
      ["Databricks: funções definidas pelo usuário", "https://docs.databricks.com/aws/en/udf/"],
      ["Databricks: o que são volumes", "https://docs.databricks.com/aws/en/volumes/"],
      ["Databricks: criar e gerenciar volumes", "https://docs.databricks.com/aws/en/volumes/utility-commands"],
      ["Databricks: trabalhar com arquivos em volumes", "https://docs.databricks.com/aws/en/volumes/volume-files"],
      ["Databricks: conjuntos de dados de amostra", "https://docs.databricks.com/aws/en/discover/databricks-datasets"],
      ["Databricks: utilitários (dbutils.fs)", "https://docs.databricks.com/aws/en/dev-tools/databricks-utils"]
    ],
    cartoes: [
      { id: "a3c1", t: "d3", f: "O que é uma transformação no Spark?", v: "Operação que cria um novo dataset a partir de outro e é preguiçosa: só registra o plano. Ex.: filter, select, join, groupBy." },
      { id: "a3c2", t: "d3", f: "O que é uma ação?", v: "Operação que dispara a execução e devolve resultado ao driver ou grava dados. Ex.: count, collect, first, take, escrita." },
      { id: "a3c3", t: "d3", f: "Por que o Spark é preguiçoso?", v: "Para enxergar a cadeia inteira de transformações e executá-la de forma mais eficiente quando uma ação pede o resultado." },
      { id: "a3c4", t: "d3", f: "Assinatura do join no PySpark?", v: "join(other, on=None, how=None). O how padrão é inner; há left, right, full, cross, semi e anti." },
      { id: "a3c5", t: "d3", f: "Sintaxe de window function em SQL?", v: "função OVER (PARTITION BY col ORDER BY expressão [frame])." },
      { id: "a3c6", t: "d3", f: "Diferença entre RANK e DENSE_RANK?", v: "RANK dá a mesma posição aos empates e pula o número seguinte. DENSE_RANK não deixa buracos." },
      { id: "a3c7", t: "d3", f: "Para que servem LAG e LEAD?", v: "LAG devolve o valor da linha anterior na partição; LEAD, o da próxima linha." },
      { id: "a3c8", t: "d3", f: "Ordem de desempenho segundo a documentação?", v: "Funções nativas e UDFs SQL são as mais eficientes; UDFs pandas são até 100 vezes mais rápidas que UDFs Python comuns, que serializam dados para o interpretador Python." },
      { id: "a3c9", t: "d3", f: "Caminho de arquivo em um volume?", v: "/Volumes/<catálogo>/<esquema>/<volume>/<pasta>/<arquivo>, igual para Spark, SQL e Python." },
      { id: "a3c10", t: "d3", f: "Volumes podem virar tabelas?", v: "Não. A documentação diz que volumes não podem ser registrados como tabelas; para dados tabulares use tabelas." },
      { id: "a3c11", t: "d3", f: "Que catálogo de amostra tem a tabela de táxi?", v: "samples.nyctaxi.trips, no catálogo samples do Unity Catalog." }
    ],
    questoes: [
      { id: "a3q1", s: 1, t: "d3", e: "Num notebook, você encadeia filter, join e groupBy sobre uma tabela grande e a célula termina em milissegundos, sem mostrar resultado. Só ao chamar count a execução demora minutos. Como explicar isso?", o: ["O Spark cacheou tudo automaticamente na primeira célula", "As transformações são preguiçosas e só registram o plano; a ação count dispara a execução real", "O count é lento por natureza e as outras operações são instantâneas porque usam outro motor", "A célula falhou silenciosamente", "O join e o groupBy rodam em outro cluster"], c: [1], x: "Transformações como filter, join e groupBy apenas lembram o que foi pedido; a computação só ocorre quando uma ação, como count, precisa do resultado. Cache automático não é o comportamento descrito. Não existe outro motor para as transformações. Uma falha silenciosa não explicaria a execução longa depois. E o trabalho não vai para outro cluster: é o mesmo plano, adiado até a ação." },
      { id: "a3q2", s: 1, t: "d3", e: "Você precisa mostrar, para cada dia, as três zonas com mais corridas, e empates devem receber a mesma posição sem pular números na sequência seguinte. Qual abordagem atende?", o: ["GROUP BY dia, zona com LIMIT 3", "DENSE_RANK() OVER (PARTITION BY dia ORDER BY corridas DESC) e filtrar posição até 3", "COUNT(*) sem partição", "LAG(corridas) sem ordem", "Uma UDF Python que ordena listas"], c: [1], x: "DENSE_RANK particionado por dia e ordenado por corridas dá a mesma posição aos empates e não deixa buracos, e permite filtrar as três primeiras posições. GROUP BY com LIMIT 3 limita o resultado total, não por dia. COUNT sem partição colapsa tudo. LAG olha a linha anterior e sem ordem não faz sentido. Uma UDF seria mais lenta e desnecessária, já que há função nativa." },
      { id: "a3q3", s: 1, t: "d3", e: "Uma UDF Python aplica uma regra simples de formatação em 200 milhões de linhas e o job está lento. O que a documentação da Databricks recomenda como primeiro passo?", o: ["Trocar por uma UDF ainda mais complexa", "Substituir por funções nativas do Spark ou uma UDF SQL, deixando UDFs Python para lógica que elas não expressem", "Adicionar collect() antes da UDF", "Gravar os dados em CSV e processar em planilha", "Ignorar, porque UDFs Python são as mais rápidas"], c: [1], x: "A documentação diz que funções nativas são otimizadas para processamento distribuído e que funções nativas e UDFs SQL são as mais eficientes; UDFs Python tendem a ser mais lentas, por causa da serialização para o interpretador Python. Complicar a UDF não ajuda. collect traria tudo ao driver e pioraria. Planilha não escala para 200 milhões. E a afirmação de que UDFs Python são as mais rápidas é o contrário do documentado." },
      { id: "a3q4", s: 1, t: "d3", e: "Você tem duas tabelas de clientes e pedidos e quer listar só os clientes que nunca fizeram pedido, sem trazer colunas da tabela de pedidos. Qual tipo de join do PySpark é o mais direto?", o: ["inner", "left_semi", "cross", "left_anti", "full"], c: [3], x: "O left anti mantém apenas as linhas da esquerda sem par na direita e não traz colunas da outra tabela, exatamente o pedido. O inner devolve só quem tem par. O left semi também não traz colunas da direita, mas mantém quem TEM par, o oposto. O cross faz produto cartesiano. O full mantém todas as linhas das duas, trazendo colunas de ambas." },
      { id: "a3q5", s: 1, t: "d3", e: "(Escolha duas) Você vai ler arquivos CSV gravados num volume do Unity Catalog e depois escrever o resultado como tabela. Quais afirmações estão corretas segundo a documentação?", o: ["O caminho segue o padrão /Volumes/catálogo/esquema/volume/pasta/arquivo", "Volumes podem ser registrados como tabelas diretamente", "O mesmo caminho serve para Spark, SQL e Python", "Só dbutils consegue ler arquivos de um volume", "Volumes substituem totalmente as tabelas para dados tabulares"], c: [0, 2], x: "A documentação mostra o padrão /Volumes/<catálogo>/<esquema>/<volume>/... e diz que o caminho é o mesmo em Spark, SQL, Python e outras bibliotecas. Ela afirma também que volumes não podem ser registrados como tabelas, o que derruba a segunda. Dizer que só dbutils lê é falso, pois Spark e pandas aparecem nos exemplos. E para dados tabulares a recomendação é usar tabelas, não volumes." },
      { id: "a3q6", s: 1, t: "d3", e: "Você roda df.limit(5).display() e vê os dados rápido, mas quando roda a mesma lógica sem limit sobre a tabela inteira a computação leva muito mais tempo. Por que o limit ajuda no estudo na Free Edition?", o: ["Porque limit muda o formato da tabela original", "Porque a ação processa só o necessário para devolver poucas linhas, poupando cota e tempo", "Porque limit grava um cache permanente", "Porque o Spark ignora filtros quando há limit", "Porque limit elimina a necessidade de ações"], c: [1], x: "Limitar o resultado reduz o trabalho que a ação precisa fazer e economiza tempo e cota, útil numa computação pequena como a da Free Edition. Limit não altera a tabela original. Não cria cache permanente. O Spark não ignora filtros por causa dele. E limit continua exigindo uma ação, como display, para executar." }
    ],
    lab: {
      t: "Transformar o catálogo samples com SQL e PySpark e comparar",
      custo: "gratuito (Free Edition; use limit e agregações para poupar cota)",
      tempo: "40 a 50 min",
      porque: "Fazer a mesma análise nas duas linguagens mostra que são equivalentes, e o notebook com resultados iguais é evidência de portfólio.",
      antes: "Você precisa do workspace e do nome do seu catálogo. A tabela samples.nyctaxi.trips existe segundo a documentação de dados de amostra, mas a documentação não lista as colunas. Os nomes usados abaixo (pickup_zip, dropoff_zip, fare_amount) são suposições: rode o DESCRIBE do primeiro passo e troque pelos nomes reais. Os passos foram conferidos contra a documentação e NÃO foram executados. A tabela tpch tem cerca de 1 TB: evite na Free Edition. Na tela, display mostra uma tabela com opção de gráfico.",
      passos: [
        { t: "Conferir as colunas", cmd: "%sql\nDESCRIBE samples.nyctaxi.trips;", p: "Anote os nomes e tipos das colunas e ajuste os próximos comandos se algum nome for diferente." },
        { t: "Agregação em SQL", cmd: "%sql\nSELECT pickup_zip, count(*) AS corridas, round(avg(fare_amount), 2) AS tarifa_media\nFROM samples.nyctaxi.trips\nGROUP BY pickup_zip\nORDER BY corridas DESC\nLIMIT 10;", p: "Guarde o resultado: as dez zonas com mais corridas e a tarifa média." },
        { t: "A mesma agregação em PySpark", cmd: "from pyspark.sql import functions as F\ndf = spark.table('samples.nyctaxi.trips')\nres = (df.groupBy('pickup_zip')\n         .agg(F.count('*').alias('corridas'), F.round(F.avg('fare_amount'), 2).alias('tarifa_media'))\n         .orderBy(F.desc('corridas')).limit(10))\ndisplay(res)", p: "Compare com o resultado do SQL: devem coincidir. Empates na contagem podem trocar a ordem entre linhas." },
        { t: "Window function e join", cmd: "%sql\nWITH ida AS (SELECT pickup_zip AS zona, count(*) AS saidas FROM samples.nyctaxi.trips GROUP BY 1),\n     volta AS (SELECT dropoff_zip AS zona, count(*) AS chegadas FROM samples.nyctaxi.trips GROUP BY 1)\nSELECT i.zona, i.saidas, v.chegadas,\n       RANK() OVER (ORDER BY i.saidas DESC) AS posicao\nFROM ida i LEFT JOIN volta v ON i.zona = v.zona\nORDER BY posicao LIMIT 10;", p: "Aqui há um join (saídas e chegadas por zona) e um ranking. Reescreva o join em PySpark com ida.join(volta, ..., 'left') e compare." },
        { t: "Gravar e ler em um Volume", cmd: "%sql\nCREATE SCHEMA IF NOT EXISTS <catalogo>.estudo;\nCREATE VOLUME IF NOT EXISTS <catalogo>.estudo.arquivos;", p: "Depois, em Python, grave um texto CSV com o resultado: txt = res.toPandas().to_csv(index=False) e dbutils.fs.put('/Volumes/<catalogo>/estudo/arquivos/top_zonas.csv', txt, True). Leia de volta com spark.read.format('csv').option('header','true').load(mesmo caminho) e confira a contagem (10). A documentação de dbutils mostra o put com caminho de volume; se der erro de permissão ou caminho, consulte a página oficial de arquivos em volumes." },
        { t: "Registrar a evidência", cmd: "", p: "Salve o notebook como notebooks/aula3_sql_pyspark (exportado como .py ou .ipynb) e um print com os dois resultados lado a lado." }
      ],
      verificar: "Os resultados de SQL e PySpark coincidem, o ranking aparece, e os dados gravados no volume foram lidos de volta com a mesma contagem.",
      limpar: [
        "Pode apagar o volume e as tabelas de estudo se não for reutilizar; nada aqui custa dinheiro na Free Edition.",
        "Antes de commitar o notebook, limpe as saídas se mostrarem dados que você não quer expor e confirme que não há tokens.",
        "Nunca commite arquivos de dados grandes; guarde só o código."
      ],
      erros: [
        { s: "Coluna não encontrada (UNRESOLVED_COLUMN)", c: "O nome da coluna difere do usado nos exemplos.", r: "Rode DESCRIBE na tabela e ajuste os nomes nas consultas." },
        { s: "A célula demora ou a computação desliga", c: "Consulta pesada demais para a cota ou computação serverless limitada.", r: "Use limit, filtre por período e agregue antes de juntar. Se a cota acabou, aguarde o reinício; os dados não são apagados." },
        { s: "Erro de permissão ao criar volume ou gravar", c: "Faltam privilégios (CREATE VOLUME no schema, USE CATALOG e USE SCHEMA).", r: "Use um catálogo onde você tenha esses privilégios, ou crie o volume pelo Catalog Explorer." }
      ]
    }
  };

  /* ===================== AULA 4 ===================== */
  C.dias[4] = {
    aula: {
      titulo: "Ingestão incremental: Auto Loader e COPY INTO",
      resumo: "Como ingerir só os arquivos novos com Auto Loader (cloudFiles), o papel do checkpoint, inferência e evolução de esquema, o modo de trigger availableNow, e o COPY INTO idempotente, usando Volumes. A aula alimenta o projeto de portfólio do pipeline medallion.",
      simples: {
        analogia: "Imagine a caixa de correio do prédio e um porteiro com um caderno. Todo dia chegam cartas novas, e ninguém quer reler as de ontem. O porteiro anota no caderno cada carta que já entregou. Quando ele chega, olha o que há na caixa, compara com o caderno e entrega só o que é novo. Se o porteiro adoecer no meio do dia, outro assume, lê o caderno e continua de onde parou, sem entregar nada duas vezes. Esse caderno é o checkpoint, o porteiro é o Auto Loader, e a caixa de correio é a pasta de chegada. O COPY INTO é um porteiro mais simples: também lembra o que entregou, mas é chamado por um comando SQL e funciona melhor para volumes menores.",
        pontos: [
          "Auto Loader lê só arquivos novos de uma pasta, usando a fonte cloudFiles do Structured Streaming.",
          "O checkpoint guarda o que já foi processado e garante processamento exatamente uma vez ao gravar em Delta.",
          "Trigger availableNow processa o que chegou e termina: é lote incremental barato.",
          "Esquema é inferido com schemaLocation; colunas novas fazem o stream falhar uma vez e reiniciar já evoluído.",
          "COPY INTO é idempotente: arquivos já carregados são pulados."
        ],
        paraQueServe: "É a porta de entrada de dados do pipeline medallion: a camada bronze de todo projeto Databricks real começa assim."
      },
      glossario: [
        { t: "Auto Loader", d: "Fonte de Structured Streaming chamada cloudFiles que detecta e processa arquivos novos conforme chegam ao armazenamento." },
        { t: "Checkpoint", d: "Local onde o stream guarda estado e progresso, permitindo retomar após falha sem reprocessar arquivos." },
        { t: "schemaLocation", d: "Opção cloudFiles.schemaLocation: pasta onde o Auto Loader guarda o esquema inferido e suas evoluções." },
        { t: "_rescued_data", d: "Coluna que o Auto Loader adiciona ao inferir esquema, com valores que não casam com o esquema, em formato JSON." },
        { t: "Trigger availableNow", d: "Modo em que o stream processa os arquivos disponíveis e termina, funcionando como lote incremental." },
        { t: "COPY INTO", d: "Comando SQL que carrega arquivos de um local para uma tabela Delta, de forma repetível e idempotente." },
        { t: "Idempotência", d: "Rodar a operação várias vezes produz o mesmo estado final: arquivos já carregados não duplicam dados." },
        { t: "Bronze", d: "Primeira camada do medallion: dado cru como chegou, com metadados de ingestão, antes de limpeza." }
      ],
      blocos: [
        { t: "O que é o Auto Loader", facil: "Traduzindo: é um leitor de pasta que só pega arquivos novos e lembra o que já pegou.", p: [
          "A documentação descreve o Auto Loader como uma fonte de Structured Streaming chamada cloudFiles, que processa arquivos novos automaticamente e também pode processar os já existentes na pasta. Os metadados dos arquivos ficam armazenados em RocksDB no checkpoint; depois de uma falha, ele retoma do estado salvo. A página afirma que esse armazenamento garante processamento exatamente uma vez, e que a garantia vale ao gravar em Delta Lake. Isso significa que você não precisa escrever código para controlar quais arquivos já foram lidos, nem manter uma tabela de controle própria, como muitos pipelines antigos faziam.",
          "Por padrão ele usa o modo de listagem de diretório. A documentação recomenda o modo de notificação por eventos de arquivo para a maioria das cargas de trabalho, mas listagem é o que usaremos no lab, com poucos arquivos.",
          "Dentro de pipelines Lakeflow, você não precisa informar esquema nem checkpoint, porque o pipeline os gerencia. Na aula 5 você verá isso. Até lá, escreva o código completo com checkpoint e schemaLocation, para entender o que o pipeline faz por baixo e conseguir explicar em entrevista."
        ], fonte: ["Databricks: Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/"] },
        { t: "Checkpoint e trigger availableNow", facil: "Traduzindo: o checkpoint é o caderno de progresso; availableNow faz o job ler tudo o que chegou e terminar.", p: [
          "Com Trigger.AvailableNow, o Auto Loader roda como lote incremental: processa os arquivos que chegaram antes de a consulta começar e termina; arquivos que chegam depois esperam a próxima execução. O limite maxFilesPerTrigger é rígido e vale 1000 arquivos por micro-lote por padrão; maxBytesPerTrigger é um limite flexível.",
          "O checkpointLocation guarda o estado do stream. A documentação avisa para mantê-lo num local sem política de ciclo de vida que apague arquivos: se isso acontecer, o estado fica corrompido e é preciso recomeçar do zero.",
          cod("python", [
            "caminho = '/Volumes/<catalogo>/estudo/ingestao'",
            "(spark.readStream.format('cloudFiles')",
            "   .option('cloudFiles.format', 'json')",
            "   .option('cloudFiles.schemaLocation', caminho + '/_schema')",
            "   .load(caminho + '/chegada')",
            "   .writeStream",
            "   .option('checkpointLocation', caminho + '/_checkpoint')",
            "   .trigger(availableNow=True)",
            "   .toTable('<catalogo>.estudo.bronze_eventos'))"
          ]),
          "Para cargas sem exigência de baixa latência, a documentação recomenda agendar como job em lote com availableNow, reduzindo custo. Triggers contínuos, em modo de listagem, são caros porque listam o diretório inteiro repetidamente."
        ], fonte: ["Databricks: Auto Loader em produção (triggers)", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/production"], armadilha: "Apagar a pasta do checkpoint para reiniciar e esquecer que o stream reprocessa tudo, duplicando a bronze." },
        { t: "Inferência e evolução de esquema", facil: "Traduzindo: o Auto Loader descobre as colunas sozinho, e se aparecer coluna nova ele para uma vez e volta já sabendo dela.", p: [
          "Definir cloudFiles.schemaLocation habilita a inferência e a evolução; pode ser a mesma pasta do checkpoint. Para JSON, CSV e XML, por padrão todas as colunas são inferidas como string. Com cloudFiles.inferColumnTypes igual a true, você obtém colunas tipadas. Parquet e Avro usam os tipos do arquivo.",
          "O modo de evolução é cloudFiles.schemaEvolutionMode. O padrão, sem esquema informado, é addNewColumns: o stream falha uma vez após adicionar as colunas novas e retoma ao reiniciar. Outros: rescue (nunca evolui, e colunas novas vão para a coluna de dados resgatados), failOnNewColumns (falha e não reinicia até você atualizar o esquema) e none (ignora colunas novas, padrão quando você fornece um esquema).",
          "A coluna _rescued_data guarda, em JSON e com o caminho do arquivo, valores que não casam com o esquema: colunas ausentes, tipos diferentes ou diferenças de maiúsculas. A documentação recomenda rodar o stream como job para que ele reinicie sozinho após uma evolução."
        ], fonte: ["Databricks: inferência e evolução de esquema no Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema"], dica: "Peça inferColumnTypes true para datas e números não virarem texto na bronze, ou defina schemaHints para só as colunas críticas." },
        { t: "COPY INTO e idempotência", facil: "Traduzindo: COPY INTO carrega arquivos para uma tabela e pula os que já carregou, então você pode rodar de novo sem medo.", p: [
          "O COPY INTO carrega dados de um local de arquivos numa tabela Delta existente. A documentação o descreve como repetível e idempotente: arquivos já carregados são pulados, mesmo se foram modificados desde então. A opção COPY_OPTIONS force, com padrão false, desliga a idempotência quando true; mergeSchema, também false por padrão, permite evoluir o esquema da tabela.",
          cod("sql", [
            "CREATE TABLE IF NOT EXISTS <catalogo>.estudo.bronze_copy;",
            "COPY INTO <catalogo>.estudo.bronze_copy",
            "FROM '/Volumes/<catalogo>/estudo/ingestao/chegada'",
            "FILEFORMAT = JSON",
            "COPY_OPTIONS ('mergeSchema' = 'true');"
          ]),
          "A página de exemplos de COPY INTO mostra o uso de uma tabela vazia (CREATE TABLE IF NOT EXISTS sem colunas) com mergeSchema para inferir o esquema. Na referência SQL, para diretórios com muitíssimos arquivos a documentação recomenda o Auto Loader, e uma única chamada com vários arquivos costuma render mais que várias chamadas concorrentes. A visão geral do COPY INTO ainda recomenda streaming tables para quem usa SQL e quer ingestão mais escalável e robusta."
        ], fonte: ["Databricks: COPY INTO (referência SQL)", "https://docs.databricks.com/aws/en/sql/language-manual/delta-copy-into"], armadilha: "Usar force igual a true como solução de erro e duplicar dados sem perceber." },
        { t: "Auto Loader ou COPY INTO?", facil: "Traduzindo: COPY INTO para cargas simples em SQL; Auto Loader quando há muitos arquivos, esquema mudando ou streaming.", p: [
          "Os dois são incrementais e idempotentes. A página de COPY INTO diz que ele é adequado para cargas SQL repetidas por agenda e recomenda o Auto Loader para diretórios muito grandes. O Auto Loader oferece inferência e evolução de esquema, resgate de dados inesperados e escala por eventos de arquivo.",
          "Na prática, para o seu portfólio, use o Auto Loader na bronze, porque é o que vagas pedem, e o COPY INTO para demonstrar que você conhece a alternativa. Registre no README por que escolheu cada um: decisões justificadas pesam mais do que código bonito. Lembre também que as duas ferramentas só enxergam arquivos que já chegaram à pasta; elas não buscam dados em APIs nem em bancos, para isso há outros conectores."
        ], fonte: ["Databricks: carregar dados com COPY INTO", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/copy-into/"] },
        { t: "Volumes como pasta de chegada", facil: "Traduzindo: crie um volume e use uma pasta dele como caixa de correio dos arquivos novos.", p: [
          "Um volume gerenciado é criado com CREATE VOLUME catálogo.esquema.nome. O caminho de um arquivo é /Volumes/catálogo/esquema/volume/pasta/arquivo. Você precisa de USE SCHEMA e CREATE VOLUME no esquema e USE CATALOG no catálogo. Para escrever e listar arquivos, a página de utilitários (dbutils.fs) mostra put, cp, ls e mkdirs com caminhos de volume.",
          "No lab, um script Python grava arquivos JSON pequenos na subpasta chegada, simulando lotes que chegam ao longo do tempo. A pasta de esquema e a de checkpoint ficam no mesmo volume, em subpastas com underscore, para separar o que é dado do que é controle. Assim, tudo da aula fica num lugar só, e limpar o ambiente depois é simples."
        ], fonte: ["Databricks: criar e gerenciar volumes", "https://docs.databricks.com/aws/en/volumes/utility-commands"] }
      ],
      exemplo: { t: "Três lotes, duas execuções, zero duplicatas", texto: "Você gera o lote 1 com 100 eventos em JSON na pasta chegada e roda o Auto Loader com availableNow. A tabela bronze fica com 100 linhas. Você roda a mesma célula de novo, sem novos arquivos: o checkpoint diz que tudo já foi processado, o stream termina rápido e a contagem continua 100. Agora gera o lote 2 com mais 100 eventos, e uma coluna nova, canal, que o lote 1 não tinha. Ao rodar, o stream falha uma vez com UnknownFieldException, depois de registrar a coluna no esquema. Você roda de novo e a bronze chega a 200 linhas, com a coluna nova preenchida só nas linhas do lote 2. Esse comportamento é o addNewColumns, o padrão. A coluna _rescued_data permaneceu vazia, pois nada deixou de caber. Você registra as contagens como prova de idempotência no README." },
      prova: [
        "Em entrevista, pedem para explicar como garantir que arquivos não sejam ingeridos duas vezes e o que é o checkpoint.",
        "No trabalho, uma fonte começa a mandar uma coluna nova e você explica o que acontece com o Auto Loader em cada modo de evolução.",
        "Numa discussão de custo, você propõe availableNow agendado em vez de um stream contínuo sempre ligado.",
        "No portfólio, você mostra uma bronze incremental com contagens antes e depois de reexecutar, provando idempotência."
      ],
      explique: "Explique com as próprias palavras como o Auto Loader sabe quais arquivos já foram processados, o que acontece quando chega uma coluna nova e quando você usaria COPY INTO em vez dele.",
      checagem: [
        "Para que servem checkpointLocation e cloudFiles.schemaLocation?",
        "O que faz o trigger availableNow e quando ele é adequado?",
        "O que acontece com o stream quando aparece uma coluna nova no modo padrão?",
        "O que a opção force do COPY INTO faz e por que é perigosa?"
      ]
    },
    fontes: [
      ["Databricks: Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/"],
      ["Databricks: inferência e evolução de esquema no Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema"],
      ["Databricks: Auto Loader em produção (triggers)", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/production"],
      ["Databricks: padrões comuns do Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/patterns"],
      ["Databricks: opções do Auto Loader", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/options"],
      ["Databricks: carregar dados com COPY INTO", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/copy-into/"],
      ["Databricks: COPY INTO (referência SQL)", "https://docs.databricks.com/aws/en/sql/language-manual/delta-copy-into"],
      ["Databricks: criar e gerenciar volumes", "https://docs.databricks.com/aws/en/volumes/utility-commands"],
      ["Databricks: exemplos de COPY INTO", "https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/copy-into/examples"],
      ["Databricks: utilitários (dbutils.fs)", "https://docs.databricks.com/aws/en/dev-tools/databricks-utils"]
    ],
    cartoes: [
      { id: "a4c1", t: "d4", f: "Qual é o nome da fonte do Auto Loader?", v: "cloudFiles, uma fonte de Structured Streaming: spark.readStream.format('cloudFiles')." },
      { id: "a4c2", t: "d4", f: "O que garante exatamente uma vez no Auto Loader?", v: "O estado dos arquivos guardado em RocksDB no checkpoint; a garantia vale ao gravar em Delta Lake." },
      { id: "a4c3", t: "d4", f: "O que faz Trigger.AvailableNow?", v: "Processa os arquivos disponíveis e termina, como lote incremental; arquivos que chegam depois esperam a próxima execução." },
      { id: "a4c4", t: "d4", f: "Como habilitar inferência de esquema?", v: "Definindo cloudFiles.schemaLocation, que pode ser a mesma pasta do checkpoint." },
      { id: "a4c5", t: "d4", f: "Tipos inferidos por padrão em JSON e CSV?", v: "Tudo string. Com cloudFiles.inferColumnTypes igual a true, as colunas ficam tipadas." },
      { id: "a4c6", t: "d4", f: "Modo de evolução padrão sem esquema fornecido?", v: "addNewColumns: o stream falha uma vez após adicionar as colunas novas e retoma ao reiniciar." },
      { id: "a4c7", t: "d4", f: "Para que serve _rescued_data?", v: "Guarda em JSON, com o caminho do arquivo, valores que não casam com o esquema, como colunas ausentes ou tipos diferentes." },
      { id: "a4c8", t: "d4", f: "COPY INTO é idempotente?", v: "Sim: arquivos já carregados são pulados, mesmo se modificados. COPY_OPTIONS force igual a true desliga isso." },
      { id: "a4c9", t: "d4", f: "Limite padrão de arquivos por micro-lote?", v: "cloudFiles.maxFilesPerTrigger vale 1000 por padrão e é um limite rígido." },
      { id: "a4c10", t: "d4", f: "Por que cuidar do local do checkpoint?", v: "Uma política que apague arquivos dele corrompe o estado do stream e obriga a recomeçar do zero." }
    ],
    questoes: [
      { id: "a4q1", s: 1, t: "d4", e: "Um job de ingestão com Auto Loader falhou no meio da execução por problema de rede. Você o reinicia com o mesmo checkpoint e teme que os arquivos já processados sejam gravados de novo. O que acontece?", o: ["Todos os arquivos são reprocessados e a tabela duplica", "O Auto Loader retoma do estado salvo no checkpoint e, gravando em Delta, processa cada arquivo exatamente uma vez", "O job precisa ser reescrito do zero", "Só funciona se os arquivos forem movidos para outra pasta antes", "O Auto Loader ignora o checkpoint e usa a data do arquivo"], c: [1], x: "A documentação diz que os metadados dos arquivos ficam em RocksDB no checkpoint, que após uma falha ele retoma do estado salvo e que o processamento é exatamente uma vez ao gravar em Delta Lake. Reprocessar tudo só ocorreria se o checkpoint fosse perdido. Reescrever o job é desnecessário. Mover arquivos não é requisito. E usar a data do arquivo no lugar do checkpoint não é o mecanismo descrito." },
      { id: "a4q2", s: 1, t: "d4", e: "A fonte do seu pipeline começa a enviar JSON com uma coluna nova. O Auto Loader, no modo padrão sem esquema fixo, interrompe o stream com UnknownFieldException. Qual é o comportamento esperado e o próximo passo?", o: ["É um bug; reinstalar o cluster", "É o addNewColumns: ele registrou a coluna nova no esquema e, ao reiniciar o stream, a ingestão continua com ela", "A coluna nova foi descartada para sempre", "O stream só volta se você apagar o checkpoint", "É preciso mudar o formato para Parquet"], c: [1], x: "No modo addNewColumns, padrão sem esquema informado, o stream falha uma vez após inferir o esquema do último micro-lote e adicionar as colunas novas ao esquema; ao reiniciar, ele segue. A documentação recomenda rodar como job para reiniciar sozinho. Não é bug nem exige reinstalar nada. A coluna não é descartada, e apagar o checkpoint reprocessaria tudo. Trocar de formato não é necessário." },
      { id: "a4q3", s: 1, t: "d4", e: "Você quer que o pipeline diário ingira os arquivos do dia e termine, sem manter computação ligada o tempo todo, para economizar. Qual configuração do Auto Loader atende?", o: ["trigger processingTime a cada segundo, ligado 24 horas", "trigger availableNow, agendado como job em lote", "Remover o checkpoint", "Usar collect() em loop", "Usar a opção force"], c: [1], x: "O availableNow processa o que já chegou e termina, e a documentação o recomenda, agendado como job, para cargas sem exigência de baixa latência, reduzindo custo. O processingTime contínuo mantém computação ligada e é caro em modo de listagem. Sem checkpoint, perde-se o progresso. collect em loop não é ingestão. E force é opção do COPY INTO, não do Auto Loader." },
      { id: "a4q4", s: 1, t: "d4", e: "Você rodou COPY INTO duas vezes sobre a mesma pasta, sem arquivos novos, e a contagem da tabela não mudou. O colega decide rodar com a opção force igual a true para acelerar. O que acontecerá?", o: ["Nada muda, porque force só aumenta a velocidade", "Os arquivos serão carregados de novo, duplicando linhas, pois force desativa a idempotência", "A tabela será apagada", "O esquema será recriado do zero", "Só os arquivos novos serão lidos"], c: [1], x: "O force padrão é false e, quando true, desativa a idempotência: os arquivos são carregados independentemente de terem sido carregados antes, duplicando os dados. Não serve para acelerar. Ele não apaga a tabela nem recria o esquema, e não limita a leitura a arquivos novos, justamente o comportamento padrão que ele desliga." },
      { id: "a4q5", s: 1, t: "d4", e: "(Escolha duas) Um stream do Auto Loader lê arquivos JSON e você quer colunas numéricas como número, não texto, e quer que colunas inesperadas não se percam. Quais ajustes ajudam?", o: ["Definir cloudFiles.inferColumnTypes igual a true", "Confiar no padrão, pois JSON já vem tipado", "Manter a coluna _rescued_data, que guarda valores que não casam com o esquema", "Apagar o schemaLocation a cada execução", "Trocar para failOnNewColumns para esconder erros"], c: [0, 2], x: "Por padrão JSON e CSV são inferidos como string, e inferColumnTypes true gera colunas tipadas. A coluna _rescued_data guarda em JSON valores que não parseiam no esquema, como colunas ausentes ou tipos diferentes, para não perder dados. Dizer que JSON vem tipado contradiz o padrão. Apagar o schemaLocation perde a memória do esquema. E failOnNewColumns faz o stream falhar, o que não esconde nada, é o oposto." },
      { id: "a4q6", s: 1, t: "d4", e: "Uma pasta de chegada recebe milhões de arquivos pequenos por dia e o time de SQL está usando COPY INTO agendado, mas a carga está lenta. O que a documentação sugere considerar?", o: ["Aumentar a retenção do VACUUM", "Usar o Auto Loader, recomendado para diretórios muito grandes", "Rodar várias chamadas concorrentes de COPY INTO", "Desligar o checkpoint", "Converter os arquivos para CSV manualmente"], c: [1], x: "A página do COPY INTO recomenda uma única chamada com vários arquivos em vez de execuções concorrentes e o Auto Loader para diretórios muito grandes. Retenção do VACUUM não afeta ingestão. Rodar várias chamadas concorrentes é o que a documentação desaconselha. COPY INTO nem usa checkpoint como o stream. E converter para CSV manualmente não resolve a escala." },
      { id: "a4q7", s: 1, t: "d4", e: "Você vai guardar o checkpoint do Auto Loader numa pasta de um bucket que tem regra de ciclo de vida apagando arquivos com mais de 30 dias. Meses depois, o stream deixa de funcionar de forma consistente. Qual a causa provável?", o: ["O Auto Loader não suporta mais de 30 dias de histórico", "A política de ciclo de vida apagou arquivos do checkpoint, corrompendo o estado do stream", "A tabela Delta foi compactada", "O trigger availableNow expirou", "O Spark precisa de reinstalação"], c: [1], x: "A documentação avisa que o checkpoint deve ficar num local sem política de ciclo de vida que limpe arquivos, pois isso corrompe o estado e exige reiniciar o stream do zero. Não existe limite de 30 dias no Auto Loader. A compactação da tabela Delta não mexe no checkpoint. O trigger availableNow não expira. E reinstalar o Spark não tem relação com o problema." }
    ],
    lab: {
      t: "Ingestão incremental com Auto Loader e COPY INTO, e prova de idempotência",
      custo: "gratuito (Free Edition; arquivos pequenos e trigger availableNow, sem stream contínuo)",
      tempo: "45 a 60 min",
      porque: "É a primeira metade do projeto de portfólio Pipeline medallion com Auto Loader e expectations: a camada bronze incremental, com código, README e evidência.",
      antes: "Você precisa do workspace, do nome do seu catálogo e de permissão para criar schema e volume (ou criá-los pelo Catalog Explorer). Troque <catalogo>. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu a aula: o resultado exato (por exemplo, o stream falhar uma vez ao surgir coluna nova) pode variar. Use somente trigger availableNow, nunca um stream contínuo, para não gastar cota. Se a Free Edition recusar alguma opção do stream, consulte as páginas oficiais do Auto Loader e as limitações. Na tela, a tabela bronze deve mostrar as colunas dos JSON mais _rescued_data.",
      passos: [
        { t: "Criar schema e volume", cmd: "%sql\nCREATE SCHEMA IF NOT EXISTS <catalogo>.estudo;\nCREATE VOLUME IF NOT EXISTS <catalogo>.estudo.ingestao;", p: "O volume será a pasta de chegada, de esquema e de checkpoint. Se não tiver permissão, crie pelo Catalog Explorer." },
        { t: "Script que simula a chegada de lotes", cmd: "import json, random, time\nbase = '/Volumes/<catalogo>/estudo/ingestao/chegada'\ndbutils.fs.mkdirs(base)\n\ndef gerar_lote(n, com_canal=False):\n    ts = int(time.time())\n    linhas = []\n    for i in range(100):\n        ev = {'id': f'{n}-{i}', 'valor': round(random.uniform(1, 100), 2), 'tipo': random.choice(['compra','visita','clique'])}\n        if com_canal:\n            ev['canal'] = random.choice(['app','web'])\n        linhas.append(json.dumps(ev))\n    dbutils.fs.put(f'{base}/lote_{n}_{ts}.json', '\\n'.join(linhas), True)\n\ngerar_lote(1)", p: "Os dados são aleatórios e sintéticos, sem dados pessoais. Cada lote tem 100 eventos em JSON por linha, gravados com dbutils.fs.put (a documentação de dbutils mostra esse comando com caminho de volume). Se falhar, consulte a página oficial de arquivos em volumes." },
        { t: "Ingerir com Auto Loader (availableNow)", cmd: "base = '/Volumes/<catalogo>/estudo/ingestao'\n(spark.readStream.format('cloudFiles')\n   .option('cloudFiles.format', 'json')\n   .option('cloudFiles.inferColumnTypes', 'true')\n   .option('cloudFiles.schemaLocation', base + '/_schema')\n   .load(base + '/chegada')\n   .writeStream\n   .option('checkpointLocation', base + '/_checkpoint')\n   .trigger(availableNow=True)\n   .toTable('<catalogo>.estudo.bronze_eventos'))", p: "Depois rode SELECT count(*) FROM <catalogo>.estudo.bronze_eventos e anote o resultado (esperado: 100)." },
        { t: "Provar a idempotência", cmd: "%sql\nSELECT count(*) AS total, count(DISTINCT id) AS ids FROM <catalogo>.estudo.bronze_eventos;", p: "Rode a célula do Auto Loader uma segunda vez, sem gerar arquivos novos, e repita a contagem: deve continuar igual. Anote os dois números. Depois gere gerar_lote(2, com_canal=True) e rode o Auto Loader: espere que o stream falhe uma vez por causa da coluna nova; rode de novo e a contagem deve chegar a 200, com a coluna canal." },
        { t: "COPY INTO idempotente", cmd: "%sql\nCREATE TABLE IF NOT EXISTS <catalogo>.estudo.bronze_copy;\nCOPY INTO <catalogo>.estudo.bronze_copy\nFROM '/Volumes/<catalogo>/estudo/ingestao/chegada'\nFILEFORMAT = JSON\nCOPY_OPTIONS ('mergeSchema' = 'true');\n\nSELECT count(*) FROM <catalogo>.estudo.bronze_copy;", p: "Rode o COPY INTO duas vezes seguidas. Na segunda, a contagem não deve mudar, porque arquivos já carregados são pulados. Não use force." },
        { t: "Montar a entrega do repositório", cmd: "databricks-lakehouse-portfolio/\n  README.md\n  notebooks/01_gerar_lotes.py\n  notebooks/02_bronze_autoloader.py\n  notebooks/03_copy_into.sql\n  docs/aula4_idempotencia.png\n  .gitignore", p: "Exporte os notebooks como .py ou .sql. No README, em inglês: o problema (incremental ingestion of JSON files), a arquitetura (diagrama simples: script, Volume, Auto Loader, bronze), como rodar, os resultados (contagens antes e depois de reexecutar) e as limitações (Free Edition, dados sintéticos). Inclua o print das contagens em docs." }
      ],
      verificar: "A contagem da bronze não mudou ao reexecutar sem arquivos novos, subiu para 200 após o segundo lote, e o COPY INTO também não duplicou ao rodar duas vezes. O repositório tem notebooks, README em inglês e o print.",
      limpar: [
        "COMMITAR: notebooks exportados (.py e .sql), README em inglês, o print em docs e o .gitignore.",
        "NUNCA COMMITAR: tokens de acesso pessoal, cookies, e-mails ou nomes visíveis em prints, arquivos de dados e as pastas _checkpoint e _schema.",
        "Não deixe nenhum stream contínuo rodando; aqui só usamos availableNow, que termina sozinho. Se quiser, apague as tabelas e o volume de estudo ao final."
      ],
      erros: [
        { s: "Stream falha com UnknownFieldException após um lote novo", c: "Chegou uma coluna nova e o modo addNewColumns interrompe o stream uma vez, após registrar o esquema.", r: "Rode a célula do Auto Loader de novo: o stream retoma já com a coluna nova." },
        { s: "A contagem dobra ao reexecutar", c: "O checkpoint foi apagado ou mudou de pasta, ou foi usado force no COPY INTO.", r: "Mantenha o mesmo checkpointLocation, não use force, e se necessário recrie a tabela e o checkpoint do zero." },
        { s: "Erro de permissão ou caminho ao gravar no volume", c: "Faltam privilégios no schema ou o caminho do volume está incompleto.", r: "Confira o nome completo /Volumes/catálogo/esquema/volume, use um catálogo onde você tenha os privilégios, ou crie o volume pelo Catalog Explorer." },
        { s: "Colunas numéricas aparecem como texto", c: "Sem inferColumnTypes, JSON é inferido como string.", r: "Defina cloudFiles.inferColumnTypes igual a true e recrie o schemaLocation e o checkpoint de estudo." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
