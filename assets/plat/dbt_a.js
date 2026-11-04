(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };

  /* ===================== AULA 21 ===================== */
  C.dias[21] = {
    aula: {
      titulo: "dbt: o que é, como funciona e como começar de graça",
      resumo: "O que o dbt faz (a etapa T do ELT, com SQL, Jinja e um grafo de dependências), como a documentação atual separa dbt v1, dbt v2, dbt OSS e a plataforma dbt, a estrutura de um projeto, os comandos principais e o caminho gratuito com DuckDB no seu computador.",
      simples: {
        analogia: "Imagine uma cozinha de restaurante. Os ingredientes crus chegam da feira e ficam na despensa: é o dado bruto, já carregado no armazém de dados. O dbt é o livro de receitas com a ordem de preparo: cada receita diz o que fazer com um ingrediente ou com o prato de outra receita, e o livro descobre sozinho qual receita vem antes de qual. Você escreve só o que cada prato deve ser, no formato de uma consulta SQL, e o dbt cuida de montar a mesa na ordem certa. O livro fica numa pasta versionada, então qualquer cozinheira vê o histórico de mudanças. A cozinha em si, onde o fogo acende, é o seu banco de dados.",
        pontos: [
          "O dbt cuida da transformação: você escreve SELECT, ele cria tabelas e views no banco.",
          "Ele descobre a ordem de execução pelas referências entre modelos (o DAG).",
          "O projeto é só texto (SQL e YAML), então vive no Git como qualquer código.",
          "dbt v1, dbt v2, dbt OSS e plataforma dbt são coisas diferentes: confira a versão instalada.",
          "Dá para aprender de graça no seu computador com DuckDB, sem nuvem e sem cartão."
        ],
        paraQueServe: "Ter um ambiente local gratuito onde você pratica dbt de ponta a ponta e gera as primeiras evidências do portfólio, sem depender de conta paga."
      },
      glossario: [
        { t: "ELT", d: "Carregar o dado bruto no armazém primeiro e transformar lá dentro depois; o dbt faz a parte da transformação." },
        { t: "Model (modelo)", d: "Um arquivo .sql com um único SELECT; o dbt o materializa como view ou tabela no banco." },
        { t: "DAG", d: "Grafo dirigido sem ciclos das dependências entre modelos; define a ordem em que o dbt executa tudo." },
        { t: "dbt_project.yml", d: "Arquivo de configuração na raiz do projeto: nome, perfil de conexão, pastas e configs padrão." },
        { t: "profiles.yml", d: "Arquivo com a conexão ao banco (adaptador, caminho, schema, threads), guardado fora do código versionado quando tem segredo." },
        { t: "Adaptador (adapter)", d: "Pacote que ensina o dbt a conversar com um banco específico, como o dbt-duckdb para o DuckDB." },
        { t: "dbt platform", d: "Serviço hospedado da dbt Labs para agendar, rodar CI, hospedar documentação e monitorar; tem plano Developer gratuito." },
        { t: "Seed", d: "Arquivo CSV versionado no projeto que o dbt carrega como tabela com o comando dbt seed." }
      ],
      blocos: [
        {
          t: "O que o dbt faz e onde ele entra",
          facil: "Traduzindo: os dados já estão no banco; o dbt transforma esses dados com SELECTs organizados, testados e versionados.",
          p: [
            "A página de introdução da documentação define o dbt como a ferramenta que transforma dados brutos do armazém em produtos de dados confiáveis. Você escreve instruções SQL select, e o dbt as constrói como modelos modulares no seu armazém. Ele não extrai nem carrega dados: trabalha depois da carga, que é a etapa T do ELT. A página não usa a sigla ELT, mas descreve exatamente essa posição: o dbt transforma o dado diretamente na sua plataforma de dados, junto das ferramentas de ingestão e visualização que você já tem.",
            "A linguagem do dbt, segundo a mesma página, junta SQL select, templates Jinja, configurações em YAML e testes. O dbt cuida da materialização, do DDL e das mudanças de schema, então você não escreve CREATE TABLE na mão. Ele também aplica ao código analítico o que o desenvolvimento de software já tem: controle de versão, testes, modularidade, CI/CD e documentação, com branches e pull requests."
          ],
          dica: "Em entrevista, diga em uma frase: dbt é a camada de transformação do ELT, com SQL e Jinja versionados, testes e documentação.",
          fonte: ["dbt Developer Hub: introdução ao dbt", "https://docs.getdbt.com/docs/introduction"]
        },
        {
          t: "SQL, Jinja e o DAG em um exemplo",
          facil: "Traduzindo: um modelo é um SELECT; ao trocar o nome da tabela por ref(), o dbt aprende quem depende de quem.",
          p: [
            "Segundo a página de modelos SQL, um modelo é uma instrução select definida em um arquivo .sql, geralmente na pasta models. O nome do modelo vem do nome do arquivo, e cada arquivo tem um único select. Ao rodar dbt run, o dbt embrulha o select em um create view as ou create table as. Por padrão, os modelos viram views, no schema de destino que você define.",
            "Para ligar modelos, você usa a função ref no lugar do nome da tabela, e o dbt usa essas referências para decidir a ordem de execução (o DAG) e para resolver o nome correto da relação em cada ambiente.",
            "```sql\n-- models/customers.sql\nselect * from {{ ref('stg_customers') }}\n```",
            "As chaves duplas são Jinja: o dbt as resolve antes de enviar o SQL ao banco. O restante é o dialeto SQL do seu próprio banco, como a página destaca."
          ],
          fonte: ["dbt Developer Hub: SQL models", "https://docs.getdbt.com/docs/build/sql-models"]
        },
        {
          t: "dbt v1, v2, OSS e plataforma: o que a doc atual diz",
          facil: "Traduzindo: hoje a documentação fala em dbt v1 (Python), dbt v2 (novo motor), dbt OSS e plataforma dbt. A introdução não usa o nome dbt Core; ele sobra só no nome do pacote dbt-core.",
          p: [
            "A introdução lista as opções assim: dbt v2, indicado como o motor atual, baseado em Rust e padrão ao instalar; dbt v1, a CLI original em Python, ainda mantida; dbt OSS, a distribuição de código aberto (Apache 2.0) do motor em Rust, para quem exige runtime aberto; e a plataforma dbt, serviço hospedado para agendamento, CI/CD, hospedagem de documentação, monitoramento e alertas. A página de versões diz que dbt v1 é a geração em Python e que a série 1.x continua, enquanto o dbt v2 usa a série 2.x.",
            "Sobre custo: a introdução diz que o dbt é gratuito para usar e que o plano Developer da plataforma é gratuito. A página de preços mostrava, quando foi lida, o plano Developer com um assento, 3.000 modelos construídos com sucesso por mês e 1 projeto. Limites e planos mudam: confira a página oficial antes de contar com eles."
          ],
          tabela: {
            cab: ["Opção", "O que a documentação diz", "Custo para você"],
            linhas: [
              ["dbt v1", "CLI original em Python, série 1.x, ainda mantida", "Roda local; a doc diz que o dbt é gratuito para usar"],
              ["dbt v2", "Motor atual em Rust, padrão ao instalar", "Roda local; alguns recursos da plataforma pedem login gratuito"],
              ["dbt OSS", "Distribuição Apache 2.0 do motor Rust", "Roda local"],
              ["plataforma dbt", "Serviço hospedado; tem plano Developer gratuito", "Confira a página de preços"]
            ]
          },
          armadilha: "Misturar versões: a página de instalação (nas fontes da aula) avisa que dbt-oss e dbt não podem dividir o mesmo ambiente Python. Rode dbt --version e confira qual está ativo.",
          fonte: ["dbt Developer Hub: introdução ao dbt", "https://docs.getdbt.com/docs/introduction"]
        },
        {
          t: "Versões e planos: onde conferir",
          facil: "Traduzindo: antes de seguir um tutorial, veja qual série do dbt ele usa; a doc marca em cada página o que vale para v1 e para v2.",
          p: [
            "A página de versões do dbt v1 explica que cada versão menor recebe um ano de suporte, com fase ativa e depois crítica, até chegar ao fim de vida. Na leitura desta aula, ela listava a v1.12 em suporte ativo e a v1.11 em suporte crítico, e a v2.0 como a versão mais recente da série 2.x. Isso muda com o tempo: use a página como lugar de conferir, não como número para decorar.",
            "Na prática, isso significa ler cada página da documentação com um olho na etiqueta de versão. Várias páginas trazem avisos como disponível a partir da v1.10.5 ou apenas em v2. Ao copiar um exemplo, confirme se a sua instalação suporta o recurso."
          ],
          lista: [
            "dbt --version mostra a versão instalada no seu ambiente.",
            "A página de versões do dbt v1 mostra o estado de suporte de cada série 1.x.",
            "A página de preços mostra o que cada plano da plataforma inclui hoje."
          ],
          fonte: ["dbt Developer Hub: versões do dbt v1", "https://docs.getdbt.com/docs/dbt-versions/core"]
        },
        {
          t: "Estrutura de um projeto: dbt_project.yml, models e profiles.yml",
          facil: "Traduzindo: o projeto tem um arquivo de configuração na raiz e pastas por tipo de recurso; a conexão com o banco fica à parte, no profiles.yml.",
          p: [
            "A página de projetos diz que, no mínimo, um projeto precisa do arquivo dbt_project.yml, que define o diretório do projeto e outras configurações. Chaves listadas: name, version, profile (o perfil que o dbt usa para conectar), os caminhos de cada tipo de recurso (como model-paths e seed-paths) e vars. A página também descreve os tipos de recurso: models (um modelo por arquivo), seeds (CSVs estáticos), snapshots, data tests, macros e analysis; cada um tem uma chave de caminho no dbt_project.yml, como model-paths e seed-paths.",
            "A conexão fica no profiles.yml. A página de perfis diz que o nome do perfil deve bater com o campo profile do dbt_project.yml; cada perfil tem um target padrão e outputs com os ambientes. Em dbt v1 (1.11 e posteriores), a ordem de busca é: flag --profiles-dir, variáveis de ambiente, diretório atual e ~/.dbt/ (recomendado); em v2, flag, raiz do projeto e ~/.dbt/. Para segredos, use env_var e mantenha o arquivo fora do Git."
          ],
          dica: "Com DuckDB não há senha, mas crie o hábito: perfis com credenciais nunca vão para o repositório.",
          fonte: ["dbt Developer Hub: projetos dbt", "https://docs.getdbt.com/docs/build/projects"]
        },
        {
          t: "Comandos principais",
          facil: "Traduzindo: run constrói modelos, test confere regras, build faz os dois na ordem do DAG, compile só mostra o SQL e docs gera a documentação.",
          p: [
            "A página de comandos lista cada um com a nota de versão. Todos os abaixo valem para todas as versões suportadas, segundo a página. Comandos de escrita (build, run, seed, snapshot) rodam um por vez; os de leitura (test, compile, docs, parse) podem rodar juntos.",
            "Sobre o compile, a doc avisa: ele não é pré-requisito do run, porque os comandos de construção já compilam; ele serve para inspecionar o SQL gerado, que fica na pasta target. Para só validar o código sem conectar ao banco, use dbt parse."
          ],
          tabela: {
            cab: ["Comando", "O que faz"],
            linhas: [
              ["dbt run", "Executa os modelos (só modelos, sem testes, seeds ou snapshots)"],
              ["dbt test", "Executa os testes definidos no projeto"],
              ["dbt build", "Constrói e testa tudo que foi selecionado, na ordem do DAG"],
              ["dbt compile", "Gera o SQL executável sem rodar os modelos"],
              ["dbt docs generate / serve", "Gera e pré-visualiza o site de documentação"],
              ["dbt seed / debug", "Carrega CSVs como tabelas / depura conexão e projeto"]
            ]
          },
          fonte: ["dbt Developer Hub: comandos do dbt", "https://docs.getdbt.com/reference/dbt-commands"]
        },
        {
          t: "Instalar de graça com DuckDB",
          facil: "Traduzindo: DuckDB é um banco que roda como arquivo no seu computador; com o adaptador dbt-duckdb o dbt usa esse arquivo como armazém, sem nuvem e sem custo.",
          p: [
            "A página do adaptador DuckDB mostra o perfil mínimo: type duckdb, path para o arquivo (ou memória), schema (padrão main) e threads. O README do repositório do adaptador traz o comando de instalação, pip install dbt-duckdb, e diz que a versão mais recente do adaptador mira dbt-core 1.8 ou superior e duckdb 1.0 ou superior.",
            "```yaml\nmeu_perfil:\n  target: dev\n  outputs:\n    dev:\n      type: duckdb\n      path: './meu_projeto.duckdb'\n      threads: 4\n```",
            "Na documentação de dbt v2, a mesma página diz que o adaptador DuckDB já vem embutido no dbt v2. Para esta trilha, o lab usa o projeto de exemplo da dbt Labs, que fixa as versões em um requirements.txt (dbt v1). Antes de instalar, confira a versão do Python que o README do exemplo pede."
          ],
          armadilha: "O arquivo .duckdb pode ficar bloqueado se outra ferramenta o mantiver aberto. Feche editores e clientes SQL antes de rodar o dbt.",
          fonte: ["dbt Developer Hub: configuração do dbt-duckdb", "https://docs.getdbt.com/docs/core/connect-data-platform/duckdb-setup"]
        },
        {
          t: "Cursos gratuitos oficiais: dbt Learn",
          facil: "Traduzindo: a dbt Labs mantém o dbt Learn, com cursos próprios; confira no catálogo quais são gratuitos e o que cada um exige.",
          p: [
            "O catálogo oficial fica em learn.getdbt.com/catalog. A página carrega o conteúdo por JavaScript, então a leitura automática desta aula não conseguiu listar os cursos. Por isso, nenhum nome de curso, duração ou preço é afirmado aqui: abra o catálogo e veja você mesma.",
            "A página institucional do dbt Learn, em getdbt.com/dbt-learn, descreve treinamento com cursos para todos os níveis e traz a chamada para começar a aprender de graça, mas não detalha quais cursos são gratuitos nem os requisitos de cada um (conta, plano ou ambiente). Antes de começar um curso, confira se ele pede conta na plataforma dbt e se há custo."
          ],
          dica: "Combine: faça o lab desta aula primeiro, depois um curso introdutório do catálogo para ver o mesmo conteúdo em outra voz.",
          fonte: ["dbt Learn: catálogo de cursos", "https://learn.getdbt.com/catalog"]
        }
      ],
      exemplo: {
        t: "Do zero ao primeiro dbt build local",
        texto: "Eloabe quer praticar dbt sem gastar. Ela instala o Python, cria um ambiente virtual e clona o projeto de exemplo da dbt Labs para DuckDB. Instala as dependências do requirements.txt, que já fixa dbt-core e dbt-duckdb. Roda dbt debug para conferir o perfil e então dbt build: o dbt carrega os CSVs como tabelas com seed, constrói os modelos na ordem do grafo e executa os testes. Tudo termina com sucesso, e ela guarda o print do terminal. Depois roda dbt docs generate e dbt docs serve e abre o site no navegador. O custo foi zero: o armazém é um arquivo no disco. Em entrevista, ela consegue explicar o que cada comando fez e por que a ordem de execução não foi escolhida por ela, e sim deduzida das referências entre modelos."
      },
      prova: [
        "Entrevista: explique o que o dbt faz e o que ele não faz (não extrai nem carrega dados; transforma dados já no armazém).",
        "Trabalho: ao ler um tutorial, você confere se ele usa dbt v1 ou v2 antes de copiar a configuração.",
        "Entrevista: diferencie dbt (a ferramenta) da plataforma dbt (o serviço hospedado) e diga o que você usou, localmente, de graça.",
        "Revisão de código: você explica por que profiles.yml com credenciais não entra no repositório."
      ],
      explique: "Explique com as próprias palavras o que o dbt faz no fluxo ELT, o que são o DAG e o dbt_project.yml, e como você roda dbt de graça no seu computador com DuckDB.",
      checagem: [
        "Em que etapa do ELT o dbt atua, e o que ele deixa para outras ferramentas?",
        "Qual a diferença entre dbt v1, dbt v2, dbt OSS e a plataforma dbt segundo a documentação atual?",
        "Qual a diferença entre dbt run, dbt test e dbt build?",
        "Para que servem o dbt_project.yml e o profiles.yml, e qual deles pode ter segredos?"
      ]
    },
    fontes: [
      ["dbt Developer Hub: introdução ao dbt", "https://docs.getdbt.com/docs/introduction"],
      ["dbt Developer Hub: versões do dbt v1", "https://docs.getdbt.com/docs/dbt-versions/core"],
      ["dbt: planos e preços", "https://www.getdbt.com/pricing"],
      ["dbt Developer Hub: instalar o dbt", "https://docs.getdbt.com/docs/local/install-dbt"],
      ["dbt Developer Hub: projetos dbt", "https://docs.getdbt.com/docs/build/projects"],
      ["dbt Developer Hub: perfis de conexão", "https://docs.getdbt.com/docs/core/connect-data-platform/connection-profiles"],
      ["dbt Developer Hub: comandos do dbt", "https://docs.getdbt.com/reference/dbt-commands"],
      ["dbt Developer Hub: configuração do dbt-duckdb", "https://docs.getdbt.com/docs/core/connect-data-platform/duckdb-setup"],
      ["GitHub: duckdb/dbt-duckdb", "https://github.com/duckdb/dbt-duckdb"],
      ["GitHub: dbt-labs/jaffle_shop_duckdb", "https://github.com/dbt-labs/jaffle_shop_duckdb"],
      ["GitHub: dbt-labs/jaffle-shop", "https://github.com/dbt-labs/jaffle-shop"],
      ["dbt Developer Hub: SQL models", "https://docs.getdbt.com/docs/build/sql-models"],
      ["dbt Learn: catálogo de cursos", "https://learn.getdbt.com/catalog"],
      ["dbt: página do dbt Learn", "https://www.getdbt.com/dbt-learn"]
    ],
    cartoes: [
      { id: "a21c1", f: "Em que etapa do ELT o dbt atua?", v: "Na transformação (T): ele trabalha depois que o dado bruto já está no armazém, transformando com SQL.", t: "t1" },
      { id: "a21c2", f: "O que é um model no dbt?", v: "Um arquivo .sql com um único select; o dbt o materializa como view (padrão) ou tabela.", t: "t1" },
      { id: "a21c3", f: "Como o dbt descobre a ordem de execução?", v: "Pelas chamadas a ref() e source() entre modelos, que formam o DAG de dependências.", t: "t1" },
      { id: "a21c4", f: "Qual o mínimo que um projeto dbt precisa ter?", v: "Segundo a página de projetos, só o arquivo dbt_project.yml; as pastas de recursos vêm conforme você precisa.", t: "t1" },
      { id: "a21c5", f: "Para que serve o profiles.yml?", v: "Guarda a conexão com o banco (adaptador, caminho, schema, threads). O nome do perfil deve bater com o campo profile do dbt_project.yml.", t: "t1" },
      { id: "a21c6", f: "dbt run versus dbt build?", v: "run executa só os modelos. build executa modelos, testes, seeds e snapshots selecionados, na ordem do DAG.", t: "t1" },
      { id: "a21c7", f: "O que faz dbt compile?", v: "Gera o SQL executável (fica em target) sem rodar os modelos. Não é pré-requisito do run.", t: "t1" },
      { id: "a21c8", f: "Qual comando instala o adaptador DuckDB para dbt v1?", v: "pip install dbt-duckdb, segundo o README do adaptador; confira a versão do dbt-core compatível.", t: "t1" },
      { id: "a21c9", f: "O que é a plataforma dbt?", v: "Serviço hospedado da dbt Labs para agendar, CI/CD, hospedar documentação e monitorar. Tem plano Developer gratuito; confira a página de preços.", t: "t1" },
      { id: "a21c10", f: "Por que o profiles.yml com credenciais não vai para o Git?", v: "Porque expõe senhas e chaves. Use env_var para ler segredos do ambiente e mantenha o arquivo fora do repositório.", t: "t1" }
    ],
    questoes: [
      {
        id: "a21q1", s: 3, t: "t1",
        e: "Sua equipe carrega dados brutos no armazém todas as noites com uma ferramenta de ingestão. Um colega pergunta onde o dbt entra nesse fluxo e o que ele passará a fazer.",
        o: [
          "Extrai os dados das fontes e os grava no armazém antes da transformação",
          "Transforma, com SELECTs versionados, os dados que já estão no armazém",
          "Substitui o armazém de dados e guarda as tabelas por conta própria",
          "Apenas desenha dashboards a partir das tabelas finais"
        ],
        c: [1],
        x: "O dbt atua na etapa T do ELT: transforma, dentro da sua plataforma de dados, dados que já foram carregados, usando select e Jinja. A alternativa de extrair e gravar descreve ferramentas de ingestão, não o dbt. Dizer que ele substitui o armazém erra porque as tabelas e views continuam sendo criadas no seu banco, e o dbt só gera o DDL. Desenhar dashboards é papel de ferramentas de visualização; o dbt, no máximo, documenta o uso final por meio de exposures."
      },
      {
        id: "a21q2", s: 3, t: "t1",
        e: "Você tem dois modelos: stg_orders e orders. O modelo orders lê de stg_orders. Você quer que o dbt sempre construa stg_orders antes de orders, sem você definir a ordem manualmente.",
        o: [
          "Numerar os arquivos com prefixos como 01_ e 02_ para impor a ordem",
          "Escrever a ordem dos modelos no dbt_project.yml em uma lista",
          "Usar ref('stg_orders') dentro do modelo orders no lugar do nome da tabela",
          "Rodar dbt compile antes de dbt run para fixar a ordem"
        ],
        c: [2],
        x: "A função ref cria a dependência entre modelos e o dbt usa essas referências para montar o DAG e rodar na ordem correta. Prefixos numéricos nos arquivos não influenciam a ordem de execução, porque o dbt não lê nomes de arquivo para isso. O dbt_project.yml configura caminhos e padrões, não uma lista de ordem. E o compile só gera SQL: a doc diz que ele não é pré-requisito do run e não fixa ordem nenhuma."
      },
      {
        id: "a21q3", s: 3, t: "t1",
        e: "Você ouviu dizer que o dbt tem custo. Ao ler a documentação atual para decidir como praticar sem gastar, qual afirmação é a mais correta e segura?",
        o: [
          "Praticar localmente é possível sem custo, e os limites do plano Developer da plataforma devem ser conferidos na página oficial de preços",
          "A plataforma dbt é sempre gratuita e sem limites para qualquer projeto",
          "Todo uso do dbt exige assinatura paga da plataforma desde a versão 2",
          "Só é possível praticar com cartão de crédito cadastrado na plataforma"
        ],
        c: [0],
        x: "A introdução diz que o dbt é gratuito para usar e que o plano Developer da plataforma é gratuito, e a página de preços lista limites que mudam com o tempo, por isso a conferência na fonte. Dizer que a plataforma é sempre gratuita e sem limites ignora o teto de modelos e de projetos do plano. Exigir assinatura paga desde a v2 contradiz a própria documentação, que mantém opções locais. Exigir cartão não aparece como regra para praticar localmente, e este módulo nunca pede cartão sem aviso."
      },
      {
        id: "a21q4", s: 3, t: "t1",
        e: "Depois de clonar um projeto, o dbt debug acusa que não encontra o perfil. O dbt_project.yml tem profile: jaffle_shop e o profiles.yml tem um perfil chamado dev_local. O que corrigir primeiro?",
        o: [
          "Reinstalar o Python, porque o dbt perdeu o interpretador",
          "Trocar dbt debug por dbt compile para ignorar o perfil",
          "Mover o dbt_project.yml para dentro da pasta models",
          "Fazer o nome do perfil no profiles.yml bater com o campo profile do dbt_project.yml"
        ],
        c: [3],
        x: "A página de perfis é explícita: o nome do perfil deve coincidir com o campo profile do dbt_project.yml. Aqui, jaffle_shop e dev_local são diferentes, então o dbt não acha a conexão. Reinstalar o Python não resolve um nome divergente. O compile também depende do perfil e não pula essa verificação para ser uma saída confiável. Mover o dbt_project.yml para models quebraria a estrutura, já que ele precisa ficar na raiz do projeto."
      },
      {
        id: "a21q5", s: 3, t: "t1",
        e: "Você quer construir os modelos e rodar os testes de uma vez, respeitando a ordem do DAG e pulando o que depende de um teste que falhou. Qual comando escolher?",
        o: [
          "dbt run, que também executa os testes automaticamente",
          "dbt build",
          "dbt compile, que executa e testa em sequência",
          "dbt docs generate, que valida os dados"
        ],
        c: [1],
        x: "O build constrói e testa os recursos selecionados, incluindo modelos, testes, seeds e snapshots, em ordem do DAG, e bloqueia o que depende de testes que falharam. O run executa só modelos, e a própria página avisa que ele não roda testes. O compile só gera SQL executável e não materializa nem testa nada. O docs generate gera o site de documentação e não é um mecanismo de validação de dados."
      },
      {
        id: "a21q6", s: 3, t: "t1",
        e: "Ao instalar para o lab, você instala o dbt OSS no mesmo ambiente virtual Python onde já tinha o pacote dbt instalado. Os comandos passam a se comportar de forma estranha. Qual a explicação mais provável segundo a doc?",
        o: [
          "O DuckDB não aceita mais de um ambiente virtual",
          "A documentação de instalação avisa que dbt-oss e dbt não podem dividir o mesmo ambiente Python",
          "O arquivo profiles.yml foi apagado automaticamente na instalação",
          "O dbt-oss só funciona em computadores com conta na plataforma dbt"
        ],
        c: [1],
        x: "A página de instalação diz que dbt-oss e dbt não podem dividir um ambiente Python e indica criar um alias para rodar os dois lado a lado. Isso explica o comportamento misto. A ideia de que o DuckDB limita ambientes virtuais não tem base: o DuckDB é só o banco. A instalação não apaga profiles.yml. E o dbt-oss é o runtime aberto, que roda localmente sem exigir conta na plataforma."
      }
    ],
    lab: {
      t: "Instalar dbt + DuckDB, rodar o projeto de exemplo e abrir a documentação",
      custo: "gratuito (tudo roda no seu computador; nada de nuvem, conta ou cartão)",
      tempo: "30 a 45 min",
      porque: "Cria o ambiente que as aulas seguintes usam e dá a primeira evidência do portfólio: um dbt build com sucesso.",
      antes: "Você precisa de Python, Git e um terminal. O README do projeto de exemplo (dbt-labs/jaffle_shop_duckdb) declara Python 3.13 ou superior; confira essa exigência no README antes de instalar. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu esta aula, então pequenas diferenças de versão podem aparecer. Esperado na tela: no dbt build, linhas com carga de seeds, criação de modelos e testes, terminando com um resumo de sucessos. O README principal do repositório jaffle-shop exige dbt v2 e um armazém (e conta de plataforma); por isso este lab usa a variante DuckDB, que a própria README do jaffle-shop indica para teste local.",
      passos: [
        {
          t: "Conferir Python e Git",
          cmd: "python --version\ngit --version",
          p: "Confirme que o Python atende à versão pedida no README do exemplo. Se não atender, instale a versão correta pelo site oficial do Python antes de continuar."
        },
        {
          t: "Clonar o projeto de exemplo",
          cmd: "git clone https://github.com/dbt-labs/jaffle_shop_duckdb.git\ncd jaffle_shop_duckdb",
          p: "O README que lemos aponta para a branch duckdb. Se o conteúdo clonado não tiver o README com instruções de DuckDB ou o requirements.txt, rode git checkout duckdb e confira de novo."
        },
        {
          t: "Criar o ambiente virtual e instalar as dependências",
          cmd: "python -m venv venv\nvenv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt",
          p: "Os comandos acima são do README para PowerShell no Windows; em bash/zsh, a ativação é source venv/bin/activate. O requirements.txt do projeto fixa dbt-core e dbt-duckdb. Depois, rode dbt --version e dbt debug para conferir versão e perfil. Se aparecer o dbt de outra instalação, ative o ambiente de novo."
        },
        {
          t: "Rodar dbt build e guardar o print",
          cmd: "dbt build",
          p: "O dbt carrega os CSVs (seeds), executa os modelos e roda os testes. Tire um print do terminal com o resumo final de sucesso: essa é a evidência da aula."
        },
        {
          t: "Gerar e abrir a documentação",
          cmd: "dbt docs generate\ndbt docs serve",
          p: "O dbt abre o site no navegador (a página de referência, que descreve o dbt v2, diz que a porta padrão é 8580; este lab usa dbt v1, então confie no endereço que o terminal mostra). Navegue pelos modelos e abra o grafo de linhagem. Pare o servidor com Ctrl+C."
        },
        {
          t: "Opcional: ver o SQL compilado",
          cmd: "dbt compile --select customers",
          p: "Troque customers por um modelo que exista no projeto (use dbt list --resource-type model para ver os nomes). Compare o SQL compilado com o arquivo original: as chaves do Jinja viram nomes de tabela."
        }
      ],
      verificar: "Você tem um print do dbt build terminando com sucesso e consegue abrir a documentação local com o grafo de linhagem. Sabe dizer qual versão do dbt rodou (dbt --version).",
      limpar: [
        "Guarde o print do dbt build; ele vai para o repositório dbt-portfolio (pasta de prints).",
        "Nunca commite profiles.yml com credenciais, a pasta venv nem arquivos .duckdb grandes; use .gitignore.",
        "Feche o servidor do dbt docs serve (Ctrl+C) e qualquer cliente que mantenha o arquivo .duckdb aberto."
      ],
      erros: [
        { s: "IO Error: Could not set lock on file jaffle_shop.duckdb", c: "Outra sessão ou ferramenta mantém o arquivo do banco aberto.", r: "Feche clientes SQL e outras sessões (o README avisa que alguns exigem fechar por completo) e rode de novo." },
        { s: "dbt aponta para outra versão, ou o comando dbt não é o do ambiente", c: "O ambiente virtual não está ativo, ou outra instalação do dbt vem antes no PATH.", r: "Ative o venv de novo e confira com dbt --version; evite misturar instalações: a doc diz que dbt-oss e dbt não podem dividir o mesmo ambiente Python." },
        { s: "pip falha ao instalar o requirements.txt", c: "Versão do Python diferente da que o projeto declara.", r: "Confira a versão pedida no README, instale-a e recrie o venv." },
        { s: "dbt debug diz que não encontra o perfil", c: "O nome do perfil no dbt_project.yml não bate com o do profiles.yml, ou o arquivo está fora do local de busca.", r: "Alinhe os nomes e rode dbt debug a partir da pasta do projeto." }
      ]
    }
  };

  /* ===================== AULA 22 ===================== */
  C.dias[22] = {
    aula: {
      titulo: "Modelos, ref() e source(): camadas e estrutura do projeto",
      resumo: "Como modelos viram SELECTs encadeados por ref() e source(), como isso forma o DAG, e como o guia oficial de estrutura organiza o projeto em staging, intermediate e marts, com convenções de nome, pastas e YAML.",
      simples: {
        analogia: "Pense numa linha de produção de pão. A farinha chega em sacos de vários fornecedores, cada um com etiqueta diferente: essa é a matéria-prima bruta. Na primeira bancada, alguém só abre os sacos, padroniza a etiqueta e separa o que é igual: é o staging. Na segunda bancada, quando a receita é complicada, se prepara a massa-base: é o intermediate. Na última, montam-se os pães prontos que o cliente de fato compra, cada um com identidade clara: são os marts. Em cada bancada, o cartão da receita diz de onde vem a entrada, e por esses cartões dá para desenhar o fluxo inteiro da padaria no quadro. Ninguém mistura as bancadas.",
        pontos: [
          "Modelo é um SELECT; ref() aponta para outro modelo e source() aponta para dado bruto.",
          "As referências formam o DAG, e o dbt usa o DAG para ordenar a execução.",
          "Staging é a única camada que usa source(), com um modelo por tabela bruta.",
          "Intermediate prepara peças para os marts; marts entregam entidades de negócio prontas.",
          "Sources são declaradas em YAML, e o nome do arquivo e dos modelos segue convenções."
        ],
        paraQueServe: "Organizar um projeto dbt de forma que qualquer pessoa entenda onde cada lógica mora, e gerar um grafo de linhagem limpo para o portfólio."
      },
      glossario: [
        { t: "ref()", d: "Função Jinja que aponta para outro modelo, seed ou snapshot, cria a dependência no DAG e resolve o nome real da relação." },
        { t: "source()", d: "Função Jinja que aponta para uma tabela bruta declarada em YAML e cria a dependência entre o modelo e a source." },
        { t: "Staging", d: "Primeira camada: um modelo por tabela de origem, com renomeação, conversão de tipo e contas simples, sem joins." },
        { t: "Intermediate", d: "Camada de modelos que preparam peças para os marts: re-granularização, joins entre entidades e lógica complexa isolada." },
        { t: "Marts", d: "Camada de entidades de negócio prontas, largas e desnormalizadas, nomeadas pelo conceito (customers, orders)." },
        { t: "Grain (granularidade)", d: "O que uma linha de uma tabela representa, por exemplo um pedido ou um item de pedido." },
        { t: "Source-conformed", d: "Dado moldado pelos sistemas de origem; o contrário do business-conformed, moldado pelas definições do negócio." },
        { t: "Base model", d: "Modelo auxiliar em subpasta da origem, usado quando o staging precisa de join ou união para ficar completo." }
      ],
      blocos: [
        {
          t: "Modelos são SELECTs, e ref() liga os modelos",
          facil: "Traduzindo: cada modelo é um SELECT; escrever ref('outro_modelo') diz ao dbt que este depende daquele.",
          p: [
            "A documentação de ref explica que a função devolve uma Relation para um modelo, seed ou snapshot, cria a dependência entre o nó referenciado e o modelo atual, e compila para o nome completo do objeto no banco. Ela faz duas coisas por baixo: insere o schema na consulta, o que permite mudar o schema de implantação por configuração, e usa as referências para construir o grafo de dependências, de modo que o dbt implante os modelos na ordem certa.",
            "```sql\n-- model_a.sql\nselect * from public.raw_data\n\n-- model_b.sql\nselect * from {{ ref('model_a') }}\n```",
            "Existe também a forma com dois argumentos, ref('pacote_ou_projeto', 'modelo'), usada para modelos de outro pacote ou projeto, e que ajuda quando um nome de modelo se repete. A página recomenda a forma com dois argumentos sobretudo quando o nome de um modelo se repete entre projetos ou pacotes instalados."
          ],
          dica: "Se você escreve o nome da tabela direto no FROM, o dbt não enxerga a dependência: o modelo pode rodar na ordem errada.",
          fonte: ["dbt Developer Hub: função ref", "https://docs.getdbt.com/reference/dbt-jinja-functions/ref"]
        },
        {
          t: "source(): declarar o dado bruto em YAML",
          facil: "Traduzindo: você descreve no YAML as tabelas que já existem no banco e depois as lê com source('nome', 'tabela').",
          p: [
            "Segundo a página de sources, elas são declaradas em arquivos .yml, sob a chave sources. Por padrão, o schema é igual ao nome da source; só acrescente schema se o nome for diferente do schema real.",
            "```yaml\nsources:\n  - name: jaffle_shop\n    database: raw\n    schema: jaffle_shop\n    tables:\n      - name: orders\n      - name: customers\n```",
            "Depois, o modelo usa a função source. Ela compila para o nome completo da tabela e também cria uma dependência entre o modelo e a source.",
            "```sql\nselect * from {{ source('jaffle_shop', 'orders') }}\n```",
            "Por padrão, o dbt não coloca aspas em database, schema ou identificador das tabelas da source. O bloco quoting força aspas quando necessário. Declarar sources dá três ganhos: um ponto único para nomes brutos, linhagem completa no grafo e a possibilidade de testar e checar a frescor dos dados brutos."
          ],
          fonte: ["dbt Developer Hub: sources", "https://docs.getdbt.com/docs/build/sources"]
        },
        {
          t: "O guia de estrutura: de source-conformed para business-conformed",
          facil: "Traduzindo: o guia oficial propõe três camadas, staging, intermediate e marts, para ir do dado como a origem entrega ao dado como o negócio fala.",
          p: [
            "O guia de estrutura de projeto da documentação define o objetivo de mover o dado de source-conformed (moldado por sistemas externos fora do seu controle) para business-conformed (moldado pelas necessidades e definições que você cria). A pasta models segue três camadas: staging, que cria os blocos básicos a partir dos dados de origem; intermediate, que empilha camadas de lógica com propósitos claros; e marts, que reúne as peças em entidades largas e ricas que a organização usa.",
            "No projeto de exemplo do guia, cada modelo de staging e de marts tem um YAML com o mesmo nome base, e há um __sources.yml na pasta staging. O exemplo do guia não tem pasta intermediate. O princípio final do guia vale para qualquer escolha de nomes: explique as decisões, documente para todos e, acima de tudo, seja consistente."
          ],
          lista: [
            "staging: átomos, modelos modulares iniciais a partir da origem.",
            "intermediate: lógica empilhada com propósito claro, antes dos marts.",
            "marts: entidades de negócio largas e ricas, prontas para uso."
          ],
          fonte: ["dbt Developer Hub: guia de estrutura (visão geral)", "https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview"]
        },
        {
          t: "Staging: um modelo por tabela de origem",
          facil: "Traduzindo: no staging você só arruma o dado (renomear, converter tipo, conta simples) e não faz join nem agregação.",
          p: [
            "Pelo guia, a pasta de staging tem subpastas por sistema de origem quando há mais de uma. O nome recomendado é stg_[origem]__[entidade]s.sql, com dois sublinhados para separar origem de entidade e entidade no plural. Permitido: renomear, converter tipos, contas básicas e categorizar com lógica condicional. Não permitido, em geral: joins e agregações. Staging é a única camada que usa source, em relação um para um com cada tabela de origem, e a recomendação é materializar como view, para dar aos modelos seguintes o dado mais recente e não encher o banco com objetos que ninguém consulta.",
            "```sql\nwith source as (\n    select * from {{ source('ecom', 'raw_orders') }}\n),\n\nrenamed as (\n    select\n        id as order_id,\n        store_id as location_id,\n        customer as customer_id\n    from source\n)\n\nselect * from renamed\n```",
            "O padrão de dois CTEs (source e renamed) é o do guia. Quando for inevitável um join para completar um conceito, o guia sugere criar base models na subpasta da origem."
          ],
          armadilha: "Fazer join no staging. O guia diz que, na experiência dele, joins aqui quase sempre são má ideia: deixe-os para as camadas seguintes.",
          fonte: ["dbt Developer Hub: camada de staging", "https://docs.getdbt.com/best-practices/how-we-structure/2-staging"]
        },
        {
          t: "Intermediate: preparar peças para os marts",
          facil: "Traduzindo: o intermediate guarda os passos de preparo (juntar, re-granularizar, isolar lógica difícil) que ainda não são o produto final.",
          p: [
            "O guia agrupa as pastas da camada intermediate por área de negócio, não por sistema de origem. O nome segue int_[entidade]s_[verbo]s, pensando em verbos como pivoted, aggregated_to_user ou joined; um exemplo é int_order_items_summed_to_orders. Os usos comuns são simplificar a estrutura (juntar de 4 a 6 entidades para o mart não ter joins demais), re-granularizar e isolar operações complexas.",
            "Sobre materialização, o guia cita duas opções: ephemeral, a mais simples, ao custo de mais dificuldade para depurar, ou views em um schema customizado fora do schema de produção, mais robusto. Os modelos intermediate não devem ser expostos a usuários finais. A regra de bolso do guia é estreitar o DAG e alargar as tabelas: várias setas entrando nos modelos pós-staging são esperadas, várias saindo são sinal de alerta.",
            "O guia também avisa para não otimizar cedo: com menos de uns 10 modelos de marts, dá para dispensar subpastas além do staging."
          ],
          fonte: ["dbt Developer Hub: camada intermediate", "https://docs.getdbt.com/best-practices/how-we-structure/3-intermediate"]
        },
        {
          t: "Marts: entidades de negócio prontas",
          facil: "Traduzindo: o mart é a tabela que o negócio usa, nomeada pelo conceito (customers, orders), larga e com tudo que se precisa saber sobre ele.",
          p: [
            "O guia chama essa camada de camada de entidades ou de conceitos. As regras: agrupar por área (marketing, finanças) quando houver muitos marts, nomear pela entidade em linguagem comum, e não construir o mesmo conceito de formas diferentes para times diferentes (finance_orders e marketing_orders é considerado antipadrão). Marts puros, sem agregação por tempo, não devem ter dimensão de tempo como orders_per_day.",
            "Sobre materialização, a regra de bolso é começar com view; quando ficar lenta para consultar, virar tabela; e só quando a tabela demorar para construir, configurar como incremental. O guia diz que correr para deixar todos os marts incrementais traz dificuldade supérflua. Os marts devem ser largos e desnormalizados, com a ressalva do guia: se você usa a Semantic Layer, a orientação muda e o ideal é ficar mais normalizado. Mais de 4 ou 5 conceitos juntos em um mart sugerem criar modelos intermediários.",
            "Usar um mart para construir outro é aceitável, com cuidado para evitar desperdício e dependências circulares."
          ],
          dica: "Resumo para entrevista: staging arruma, intermediate prepara, marts entregam.",
          fonte: ["dbt Developer Hub: camada de marts", "https://docs.getdbt.com/best-practices/how-we-structure/4-marts"]
        },
        {
          t: "Configurar por pasta no dbt_project.yml",
          facil: "Traduzindo: em vez de repetir config em cada arquivo, você define a materialização por pasta, e a pasta de dentro vence a de fora.",
          p: [
            "A página de modelos SQL explica que configurações podem ficar no dbt_project.yml ou em um bloco config dentro do modelo, e que elas são aplicadas de forma hierárquica: a configuração de uma subpasta sobrescreve a geral. O guia de staging mostra o padrão para views; o exemplo da página de modelos usa tabela para a pasta marts (o guia de marts sugere começar com view).",
            "```yaml\nmodels:\n  jaffle_shop:\n    staging:\n      +materialized: view\n    marts:\n      +materialized: table\n```",
            "O nome do projeto na chave (aqui jaffle_shop) vem do campo name do dbt_project.yml. O sinal de mais antes de materialized marca uma configuração, em oposição ao nome de uma pasta. Confira a página de materializações para as opções; a aula seguinte detalha as cinco."
          ],
          fonte: ["dbt Developer Hub: SQL models", "https://docs.getdbt.com/docs/build/sql-models"]
        }
      ],
      exemplo: {
        t: "Do dado bruto ao mart customers",
        texto: "Eloabe tem tabelas brutas raw_customers e raw_orders no DuckDB. Ela declara uma source chamada jaffle no arquivo models/staging/__sources.yml com essas duas tabelas. Cria stg_jaffle__customers e stg_jaffle__orders, cada um lendo uma tabela com source(), renomeando colunas para customer_id e order_id, sem joins, materializados como view. Na pasta marts, cria customers.sql, que usa ref() nos dois modelos de staging, junta, agrega o número de pedidos por cliente e entrega uma linha por cliente, materializada como tabela. Ela roda dbt build e abre o grafo de linhagem: as duas tabelas brutas apontam para os dois modelos de staging, que apontam para customers. Ao ver a figura, ela confere que source() só aparece no staging e que o mart só usa ref()."
      },
      prova: [
        "Entrevista: explique por que o staging é um para um com a origem e por que joins ficam para depois.",
        "Revisão de PR: você pede para trocar um nome de tabela direto no FROM por ref() ou source(), para o DAG enxergar a dependência.",
        "Entrevista: descreva como você organizaria pastas e nomes (stg_, int_, marts por entidade) e por que é bom ser consistente.",
        "Trabalho: ao abrir a documentação gerada, você usa o grafo de linhagem para achar de onde vem um número de um mart."
      ],
      explique: "Explique com as próprias palavras a diferença entre ref() e source(), o papel de cada camada (staging, intermediate e marts) e uma convenção de nome que você adotaria.",
      checagem: [
        "Para que serve ref() e o que o dbt faz com as referências entre modelos?",
        "Como se declara uma source em YAML e como um modelo a lê?",
        "O que é permitido e o que não é na camada de staging, segundo o guia?",
        "Qual o propósito da camada intermediate e como o guia sugere materializá-la?"
      ]
    },
    fontes: [
      ["dbt Developer Hub: função ref", "https://docs.getdbt.com/reference/dbt-jinja-functions/ref"],
      ["dbt Developer Hub: sources", "https://docs.getdbt.com/docs/build/sources"],
      ["dbt Developer Hub: guia de estrutura (visão geral)", "https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview"],
      ["dbt Developer Hub: camada de staging", "https://docs.getdbt.com/best-practices/how-we-structure/2-staging"],
      ["dbt Developer Hub: camada intermediate", "https://docs.getdbt.com/best-practices/how-we-structure/3-intermediate"],
      ["dbt Developer Hub: camada de marts", "https://docs.getdbt.com/best-practices/how-we-structure/4-marts"],
      ["dbt Developer Hub: SQL models", "https://docs.getdbt.com/docs/build/sql-models"],
      ["GitHub Docs: ignorar arquivos no Git", "https://docs.github.com/en/get-started/git-basics/ignoring-files"]
    ],
    cartoes: [
      { id: "a22c1", f: "O que é um modelo dbt?", v: "Um select em um arquivo .sql; o nome do modelo vem do nome do arquivo e cada arquivo tem um único select.", t: "t2" },
      { id: "a22c2", f: "O que faz ref()?", v: "Aponta para outro modelo, seed ou snapshot, cria a dependência no DAG e compila para o nome completo da relação.", t: "t2" },
      { id: "a22c3", f: "O que faz source()?", v: "Lê uma tabela bruta declarada em YAML e cria a dependência entre o modelo e a source.", t: "t2" },
      { id: "a22c4", f: "Qual o schema padrão de uma source?", v: "O mesmo valor do name da source; só declare schema se o schema real for diferente.", t: "t2" },
      { id: "a22c5", f: "Quais são as três camadas do guia de estrutura?", v: "Staging (átomos a partir da origem), intermediate (lógica empilhada com propósito) e marts (entidades de negócio prontas).", t: "t2" },
      { id: "a22c6", f: "Nome recomendado para um modelo de staging?", v: "stg_[origem]__[entidade]s.sql, com dois sublinhados entre origem e entidade e entidade no plural.", t: "t2" },
      { id: "a22c7", f: "O que NÃO fazer no staging?", v: "Joins e agregações. O guia permite renomear, converter tipos, contas básicas e categorizar.", t: "t2" },
      { id: "a22c8", f: "Como materializar staging, segundo o guia?", v: "Como view, para dar o dado mais recente aos modelos seguintes e não lotar o banco de objetos sem consumo direto.", t: "t2" },
      { id: "a22c9", f: "Como nomear um mart?", v: "Pelo conceito de negócio em linguagem comum (customers, orders), sem prefixo e sem dimensão de tempo em marts puros.", t: "t2" },
      { id: "a22c10", f: "Qual a regra de bolso do guia para materializar marts?", v: "Começar com view, virar tabela quando a consulta ficar lenta e só ir a incremental quando a construção da tabela atrasar as execuções.", t: "t2" }
    ],
    questoes: [
      {
        id: "a22q1", s: 3, t: "t2",
        e: "Um modelo do seu projeto lê direto de public.raw_data no FROM, sem nenhuma função Jinja. Em outro ambiente, os dados brutos estão em outro schema, e a ordem de execução às vezes sai errada. O que resolve os dois problemas de forma recomendada?",
        o: [
          "Escrever o schema novo à mão em todos os modelos",
          "Declarar a tabela como source em YAML e usar source() no modelo, e usar ref() entre modelos",
          "Renomear os arquivos com números para controlar a ordem",
          "Trocar o modelo por uma query de singular test"
        ],
        c: [1],
        x: "Declarar a source e usar source() cria a dependência e resolve o nome completo conforme a configuração, e ref() faz o mesmo entre modelos, o que ordena o DAG. Escrever o schema à mão repete o problema ao mudar de ambiente e não cria dependência. Prefixos numéricos nos arquivos não ordenam a execução, porque a ordem vem das referências. Trocar o modelo por um teste singular muda o propósito: testes verificam dados, não constroem tabelas."
      },
      {
        id: "a22q2", s: 3, t: "t2",
        e: "No modelo stg_orders, um colega adicionou um join com stg_customers e uma agregação de total por cliente, argumentando que assim o dado já sai pronto. Segundo o guia oficial de estrutura, qual a melhor resposta na revisão?",
        o: [
          "Está certo: staging deve entregar o dado final",
          "Mover para uma camada posterior: joins e agregações não são recomendados no staging",
          "Trocar para materialização ephemeral e manter como está",
          "Renomear o arquivo com o prefixo marts_ e manter o conteúdo"
        ],
        c: [1],
        x: "O guia lista renomear, converter tipos, contas básicas e categorizar como permitido no staging, e joins e agregações como o que se evita: eles pertencem às camadas intermediate ou marts, que são business-conformed. Dizer que staging entrega o dado final inverte o papel da camada. Ephemeral muda só a materialização e não resolve a mistura de responsabilidades. Renomear o arquivo com um prefixo marts não faz parte da convenção e esconderia o problema em vez de resolver."
      },
      {
        id: "a22q3", s: 3, t: "t2",
        e: "Você declarou a source jaffle com a tabela orders, mas o dbt acusa que a relação não existe. A tabela real está no schema main, e o nome da sua source é jaffle. O que explica o erro de forma mais direta?",
        o: [
          "Faltou rodar dbt docs serve para registrar a source",
          "O dbt não aceita tabelas de seed como origem de dados",
          "O schema padrão de uma source é igual ao nome dela; é preciso declarar schema: main",
          "É obrigatório que source e modelo tenham o mesmo nome de arquivo"
        ],
        c: [2],
        x: "A página de sources diz que, por padrão, o schema é igual ao name da source, então jaffle procura o schema jaffle. Como a tabela está em main, é preciso declarar schema: main. Rodar docs serve só mostra documentação e não registra nada. Não há regra de que seeds não possam ser lidas como origem: o dbt só vê tabelas no banco. E source e modelo não precisam compartilhar nome de arquivo; a source é descrita no YAML e referenciada por nome e tabela."
      },
      {
        id: "a22q4", s: 3, t: "t2",
        e: "Seu projeto tem poucas tabelas brutas de um único sistema, mas planeja ligar mais três sistemas no próximo trimestre. Você precisa decidir como nomear e agrupar os modelos de staging para não ter que renomear tudo depois.",
        o: [
          "Usar stg_[entidade].sql e uma pasta única, pois é mais curto",
          "Agrupar o staging por time de negócio, como marketing e finanças",
          "Agrupar por ferramenta de carga e nomear sem origem",
          "Usar stg_[origem]__[entidade]s.sql, com uma subpasta por sistema de origem quando houver mais de um"
        ],
        c: [3],
        x: "O guia recomenda nomes com origem e entidade separados por dois sublinhados e subpastas por sistema de origem, porque o formato sem origem quebra à medida que entram novas origens. Agrupar por time de negócio no staging cria sobreposição e definições conflitantes, o que o guia desaconselha. Agrupar por ferramenta de carga também é desaconselhado: o guia considera esse nível amplo demais para ser útil em projetos reais. O formato curto sem origem parece econômico, mas gera retrabalho."
      },
      {
        id: "a22q5", s: 3, t: "t2",
        e: "Seu mart orders junta oito conceitos diferentes em um único arquivo com muitos joins, e ninguém consegue ler a lógica. Qual abordagem o guia oficial sugere para melhorar a legibilidade sem mudar o resultado?",
        o: [
          "Criar modelos intermediate que agrupem conceitos em partes menores e deixar o mart consumi-los",
          "Mover todos os joins para o staging",
          "Duplicar o mart em versões por departamento",
          "Converter o mart em incremental para reduzir a lógica"
        ],
        c: [0],
        x: "O guia diz que, ao reunir mais de 4 ou 5 conceitos em um mart, vale criar modelos intermediários, pois uma cadeia de dois intermediários com três conceitos cada e um mart final é mais legível que um mart com seis joins. Mover joins para o staging contraria a regra da camada. Duplicar por departamento cria o antipadrão de construir o mesmo conceito de formas diferentes. Tornar incremental muda a materialização e a forma de execução, não a organização da lógica, e o guia ainda alerta contra incremental precoce."
      },
      {
        id: "a22q6", s: 3, t: "t2",
        e: "Uma pessoa nova no time pergunta qual camada pode chamar source() e qual deve usar apenas ref(). Considerando o guia de estrutura, como você responde?",
        o: [
          "Todas as camadas chamam source() para ler direto da origem",
          "Só os marts chamam source(); o staging usa ref()",
          "Apenas o staging usa source(); intermediate e marts leem outros modelos com ref()",
          "Nenhuma camada usa source(); isso é exclusivo de seeds"
        ],
        c: [2],
        x: "O guia diz que só os modelos de staging usam source, em relação um para um com cada tabela de origem; as camadas seguintes leem modelos já preparados com ref. Se todas as camadas lessem a origem, haveria lógica duplicada e linhagem confusa. Inverter, com marts em source e staging em ref, contradiz o papel do staging como porta de entrada. E source() não é exclusiva de seeds: ela serve a qualquer tabela bruta declarada em YAML."
      }
    ],
    lab: {
      t: "Estruturar o projeto em camadas, declarar sources e inspecionar a linhagem",
      custo: "gratuito (DuckDB local)",
      tempo: "45 a 60 min",
      porque: "Gera a primeira parte do projeto de portfólio Projeto dbt: staging, marts, testes e documentação, no repositório dbt-portfolio.",
      antes: "Você precisa do ambiente da aula 21 funcionando (venv ativo e dbt build com sucesso no projeto de exemplo). Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu esta aula; os nomes de seeds e de colunas dependem do que existe no projeto de exemplo, então os modelos abaixo são um modelo para você adaptar, não código final. Esperado na tela: o dbt build lista seus modelos de staging como views e os marts como tabelas, e a documentação mostra as tabelas brutas apontando para staging e depois para marts. Este lab produz a entrega do repositório público dbt-portfolio (README em inglês e prints).",
      passos: [
        {
          t: "Criar o repositório dbt-portfolio",
          cmd: "git init dbt-portfolio",
          p: "Copie para dentro dele os arquivos do projeto de exemplo, sem a pasta .git original, sem venv, sem target e sem arquivos .duckdb. Confira a licença do repositório de origem e registre a origem no README. Crie um .gitignore com venv/, target/, logs/, dbt_packages/, *.duckdb e .env."
        },
        {
          t: "Descobrir o que já existe",
          cmd: "dbt list --resource-type seed\ndbt list --resource-type model",
          p: "Anote os nomes dos seeds e dos modelos. Neste lab, os seeds fazem o papel de dado bruto carregado por uma ferramenta de ingestão. Veja também como o projeto organiza a pasta models; se já houver staging e marts, adapte em vez de recriar."
        },
        {
          t: "Declarar as sources em YAML",
          cmd: "# models/staging/__sources.yml\nsources:\n  - name: jaffle\n    schema: main\n    tables:\n      - name: raw_customers\n      - name: raw_orders",
          p: "Troque os nomes das tabelas pelos que o dbt list mostrou. O schema main é o padrão do perfil DuckDB da documentação; confirme no seu profiles.yml. Lembre que, por padrão, o schema da source seria igual ao nome dela."
        },
        {
          t: "Criar os modelos de staging",
          cmd: "-- models/staging/stg_jaffle__customers.sql\nwith source as (\n    select * from {{ source('jaffle', 'raw_customers') }}\n),\n\nrenamed as (\n    select\n        id as customer_id\n        -- renomeie e converta as demais colunas\n    from source\n)\n\nselect * from renamed",
          p: "Faça um modelo por tabela bruta, seguindo o padrão source e renamed do guia, sem joins. Use dbt show --select nome_do_modelo para ver as colunas reais antes de renomear. Configure staging como view e marts como tabela no dbt_project.yml."
        },
        {
          t: "Criar um mart que usa ref()",
          cmd: "-- models/marts/customers.sql\nwith customers as (\n    select * from {{ ref('stg_jaffle__customers') }}\n),\norders as (\n    select * from {{ ref('stg_jaffle__orders') }}\n)\nselect\n    customers.customer_id,\n    count(orders.order_id) as number_of_orders\nfrom customers\nleft join orders using (customer_id)\ngroup by 1",
          p: "Adapte as colunas ao que existe nos seus modelos de staging. Rode dbt build e confirme que não há erros."
        },
        {
          t: "Gerar a documentação e inspecionar a linhagem",
          cmd: "dbt docs generate\ndbt docs serve",
          p: "Abra um modelo e veja o grafo de linhagem: as sources devem aparecer à esquerda, depois staging, depois o mart. Tire um print do grafo e salve em uma pasta screenshots/ do repositório. Escreva o README em inglês com a descrição das camadas e o print."
        }
      ],
      verificar: "Seu projeto tem pastas staging e marts, um __sources.yml, modelos stg_ que usam source() e um mart que usa ref(); o dbt build passa e você tem um print do grafo de linhagem com as sources, o staging e o mart.",
      limpar: [
        "Guarde o print do grafo e o README em inglês no repositório dbt-portfolio.",
        "Nunca commite profiles.yml com credenciais, a pasta venv nem arquivos .duckdb grandes.",
        "Não inclua dados pessoais nos CSVs que forem versionados."
      ],
      erros: [
        { s: "Source not found ou tabela não existe", c: "O schema da source não bate com o schema real, já que o padrão é o nome da source.", r: "Declare schema: main (ou o schema correto) na source e confira o nome da tabela com dbt list ou no DuckDB." },
        { s: "Dois modelos com o mesmo nome", c: "O nome do modelo vem do nome do arquivo, então dois arquivos .sql com o mesmo nome colidem (confira a mensagem exata do dbt).", r: "Renomeie um deles seguindo a convenção (stg_ para staging)." },
        { s: "O mart não aparece depois do staging no grafo", c: "O modelo usa o nome da tabela direto no FROM, sem ref().", r: "Troque por {{ ref('nome_do_modelo') }} e rode dbt build de novo." },
        { s: "Coluna não encontrada no staging", c: "O nome real da coluna no seed é diferente do que foi escrito no select.", r: "Use dbt show para ver as colunas e ajuste o select." }
      ]
    }
  };

  /* ===================== AULA 23 ===================== */
  C.dias[23] = {
    aula: {
      titulo: "Materializações e modelos incrementais",
      resumo: "As cinco materializações do dbt (view, table, incremental, ephemeral e materialized view), como funcionam os modelos incrementais com is_incremental(), unique_key e --full-refresh, as estratégias e o que decidir por custo e tempo.",
      simples: {
        analogia: "Pense numa biblioteca que precisa manter um catálogo atualizado. Uma opção é guardar só a receita de como montar o catálogo e montar de novo a cada consulta: é a view, sempre fresca, mas lenta se a receita for pesada. Outra é imprimir o catálogo inteiro toda noite: é a tabela, rápida de ler, mas cara de refazer quando a biblioteca cresce. A terceira é só acrescentar à lista os livros que chegaram hoje: é o incremental, barato, mas exige cuidado para não repetir ou esquecer nenhum. Há ainda a anotação rascunho, que nem vira página própria e só é copiada dentro de outra: é o ephemeral. Escolher é equilibrar frescor, velocidade e custo.",
        pontos: [
          "View guarda só a consulta; table guarda o resultado e é refeita a cada run.",
          "Incremental só processa os dados novos, e exige filtro com is_incremental().",
          "unique_key permite atualizar linhas existentes em vez de duplicá-las.",
          "dbt run --full-refresh recria um modelo incremental do zero.",
          "Comece simples (view), e só avance quando houver um problema real de tempo ou custo."
        ],
        paraQueServe: "Escolher a materialização certa para cada modelo e reduzir tempo e custo de construção sem perder a correção dos dados."
      },
      glossario: [
        { t: "Materialização", d: "Estratégia com que o dbt persiste um modelo no armazém: view, table, incremental, ephemeral ou materialized view." },
        { t: "Incremental model", d: "Modelo que, depois da primeira carga completa, insere ou atualiza só as linhas novas desde a última execução." },
        { t: "is_incremental()", d: "Macro que devolve verdadeiro quando o modelo já existe como tabela, não há full-refresh e a materialização é incremental." },
        { t: "unique_key", d: "Configuração que identifica linhas; permite que o dbt atualize linhas já existentes em vez de apenas anexar duplicatas." },
        { t: "--full-refresh", d: "Flag que faz o dbt tratar modelos incrementais como tabelas e reconstruir tudo, descartando a tabela existente." },
        { t: "Incremental strategy", d: "Forma como as linhas novas entram na tabela: append, merge, delete+insert, insert_overwrite ou microbatch, conforme o adaptador." },
        { t: "Ephemeral", d: "Modelo que não vira objeto no banco: o dbt injeta seu código nos dependentes como um CTE." },
        { t: "on_schema_change", d: "Config de modelos incrementais que define o que fazer quando as colunas do modelo mudam: ignore, fail, append_new_columns ou sync_all_columns." }
      ],
      blocos: [
        {
          t: "As cinco materializações",
          facil: "Traduzindo: o dbt tem cinco formas de guardar um modelo: view, table, incremental, ephemeral e materialized view; o padrão é view.",
          p: [
            "A página de materializações define as cinco: table, view, incremental, ephemeral e materialized view. Você configura no dbt_project.yml, no arquivo do modelo ou nas propriedades YAML. Por padrão, os modelos são views.",
            "```yaml\nmodels:\n  my_project:\n    events:\n      +materialized: table\n```",
            "A recomendação da página é começar com views e só trocar quando surgirem problemas de desempenho."
          ],
          tabela: {
            cab: ["Materialização", "O que faz", "Ponto forte", "Ponto fraco"],
            linhas: [
              ["view", "Recria a view a cada run", "Sem dado armazenado, sempre fresca", "Lenta se a transformação for pesada"],
              ["table", "Recria a tabela a cada run", "Rápida para consultar", "Pode demorar para reconstruir"],
              ["incremental", "Insere ou atualiza só linhas novas", "Reduz o tempo de build", "Exige configuração extra"],
              ["ephemeral", "Vira CTE nos dependentes", "Reuso sem poluir o banco", "Não dá para consultar direto"]
            ]
          },
          fonte: ["dbt Developer Hub: materializações", "https://docs.getdbt.com/docs/build/materializations"]
        },
        {
          t: "Quando usar cada uma, segundo a doc",
          facil: "Traduzindo: view para transformação leve, table para o que o BI consulta, incremental quando o run ficou lento, ephemeral para passos leves e usados em pouco lugar.",
          p: [
            "A página dá o conselho de cada uma. View: modelos sem transformação pesada, como renomear e converter colunas. Table: modelos consultados por ferramentas de BI e transformações lentas usadas por muitos modelos. Incremental: dados no estilo de eventos, e use quando os runs ficarem lentos; a página diz explicitamente para não começar com incrementais. Ephemeral: transformações muito leves no início do DAG, usadas em um ou dois modelos e que não precisam ser consultadas diretamente.",
            "Para ephemeral, a página lista limites: você não pode dar select direto no modelo, operações via run-operation não podem usar ref de nós efêmeros, o excesso dificulta a depuração e ephemeral não suporta contratos de modelo."
          ],
          armadilha: "Começar com incremental por achar que é mais profissional. A doc diz o contrário: incremental é uso avançado e só entra quando o run está lento.",
          fonte: ["dbt Developer Hub: materializações", "https://docs.getdbt.com/docs/build/materializations"]
        },
        {
          t: "Materialized view: o que a doc diz",
          facil: "Traduzindo: é um meio-termo entre view e tabela, em que o banco mantém o resultado atualizado; nem todo banco suporta, então confira o seu.",
          p: [
            "A página descreve a materialized view como uma combinação de view e tabela, que atende casos parecidos com os dos modelos incrementais. A vantagem citada: o desempenho de uma tabela com o frescor de uma view, e ela costuma poder ser atualizada sem intervenção manual, em cadência regular, dependendo do banco. Rodar dbt run em uma materialized view equivale a uma implantação de código, como nas views.",
            "As ressalvas: bancos tendem a oferecer menos opções de configuração para esse objeto, e ele pode não ser suportado em todas as plataformas. A página afirma que o dbt-snowflake não suporta materialized views e usa Dynamic Tables no lugar, e diz que a maioria das plataformas, exceto o Postgres, oferece atualização automática. Ela não traz uma tabela completa por adaptador, e este módulo também não afirma suporte no DuckDB: confira a página do adaptador. A página de contratos (aula 24) lista materialized view entre os casos sem suporte a contratos."
          ],
          dica: "A doc sugere considerar materialized view quando um incremental seria suficiente, mas você quer que a plataforma gerencie a lógica incremental e a atualização.",
          fonte: ["dbt Developer Hub: materializações", "https://docs.getdbt.com/docs/build/materializations"]
        },
        {
          t: "Modelos incrementais: is_incremental() e o filtro",
          facil: "Traduzindo: na primeira rodada o modelo lê tudo; nas seguintes, o filtro dentro de is_incremental() limita a leitura ao que é novo.",
          p: [
            "Pela página de modelos incrementais, a primeira execução transforma todas as linhas da origem; as seguintes transformam só as linhas filtradas e as inserem na tabela existente. A macro is_incremental() devolve verdadeiro quando todas estas condições valem: o modelo já existe como tabela, a flag full-refresh não foi passada e o modelo está configurado com materialized incremental. O SQL precisa ser válido com a macro verdadeira ou falsa. Use {{ this }} para consultar a própria tabela de destino.",
            "```sql\n{{ config(materialized='incremental') }}\n\nselect * from {{ ref('app_data_events') }}\n\n{% if is_incremental() %}\n  where event_time >= (select coalesce(max(event_time), '1900-01-01') from {{ this }})\n{% endif %}\n```",
            "O comentário do exemplo oficial explica o >=: ele inclui registros com timestamp ocorrido desde a última execução do modelo. A página também dá a dica de filtrar cedo, em modelos com CTEs, porque em alguns armazéns isso melhora muito o tempo de execução."
          ],
          fonte: ["dbt Developer Hub: modelos incrementais", "https://docs.getdbt.com/docs/build/incremental-models"]
        },
        {
          t: "unique_key e --full-refresh",
          facil: "Traduzindo: unique_key evita duplicar linhas que mudam; full-refresh apaga e reconstrói tudo quando a lógica do modelo mudou.",
          p: [
            "O parâmetro opcional unique_key permite atualizar linhas existentes em vez de só anexar novas. Sem ele, a maioria dos adaptadores faz comportamento de append: insere todas as linhas devolvidas sem checar duplicatas. Com ele, se a chave existir nos dados novos e nos antigos, a linha antiga é atualizada; se não existir, a linha inteira é inserida. A página alerta: colunas usadas como chave não devem conter nulos, ou o modelo pode não casar linhas e gerar duplicatas; para várias colunas, prefira uma lista a um concat.",
            "```sql\n{{ config(materialized='incremental', unique_key='date_day') }}\n```",
            "Se a lógica incremental mudar, reconstrua com a flag full-refresh: ela faz o dbt descartar a tabela de destino e recriá-la para todo o histórico. A página dá o exemplo com o sinal de mais no final do seletor para reconstruir também os modelos a jusante.",
            "```bash\ndbt run --full-refresh --select my_incremental_model+\n```",
            "Na página do run, a flag faz o dbt tratar modelos incrementais como tabelas, e is_incremental() devolve falso para todos."
          ],
          fonte: ["dbt Developer Hub: modelos incrementais", "https://docs.getdbt.com/docs/build/incremental-models"]
        },
        {
          t: "Estratégias incrementais e o adaptador DuckDB",
          facil: "Traduzindo: a estratégia define como as linhas novas entram: anexar, mesclar, apagar e inserir, sobrescrever partição ou em lotes de tempo.",
          p: [
            "A página de estratégias define cinco. append insere sem atualizar nem apagar o que existe e não checa duplicatas. delete+insert apaga as linhas da unique_key na tabela e insere as novas, o que pode ser menos eficiente em tabelas grandes; serve quando a chave não é realmente única ou quando merge não é suportado. merge insere linhas cuja chave ainda não existe e atualiza as que existem; é mais adequado a tabelas menores ou conjuntos incrementais pequenos e pode ser caro em tabelas grandes, pois varre a tabela de destino inteira. Sem unique_key, merge se comporta como append. insert_overwrite substitui partições inteiras em tabelas particionadas. microbatch processa séries temporais grandes em lotes de tempo, com execução paralela.",
            "Cada adaptador suporta um subconjunto, e a tabela geral da página perdeu células na leitura automática. A página específica do DuckDB lista append, delete+insert, merge e microbatch, e diz que merge exige DuckDB 1.4.0 ou superior e microbatch exige dbt 1.9 ou superior. Ela não informa qual é a estratégia padrão: confira a página do adaptador e a sua versão.",
            "```sql\n{{ config(\n    materialized='incremental',\n    unique_key='event_id',\n    incremental_strategy='delete+insert'\n) }}\n```"
          ],
          fonte: ["dbt Developer Hub: estratégias incrementais", "https://docs.getdbt.com/docs/build/incremental-strategy"]
        },
        {
          t: "Custo e decisão: como escolher",
          facil: "Traduzindo: comece com view, passe para table quando a consulta ficar lenta e só vá para incremental quando a construção da tabela começar a atrasar tudo.",
          p: [
            "O guia de marts resume a regra de bolso: começar com view, virar tabela quando a view demorar demais para ser consultada, e configurar incremental quando a tabela demorar demais para ser construída e atrasar os runs. Ele alerta que correr para deixar todos os marts incrementais traz dificuldade supérflua.",
            "Em armazéns cobrados por uso, o custo vem do volume lido e processado: um incremental bem filtrado lê menos, mas ainda tem o custo de varrer a tabela de destino em merge, que a página de estratégias aponta como possível ponto caro. A opção incremental_predicates, citada na página de modelos incrementais, limita o quanto da tabela existente é varrido durante o merge. Para validar dependências sem ler dados caros, a página do run traz a flag --empty, que limita refs e sources a zero linhas, mas ainda executa o SQL no armazém."
          ],
          lista: [
            "Frescor máximo e custo baixo de armazenamento: view.",
            "Consulta rápida para BI: table.",
            "Run lento por volume de eventos: incremental, com chave e filtro corretos.",
            "Passo leve usado em pouco lugar: ephemeral."
          ],
          fonte: ["dbt Developer Hub: camada de marts (regra de materialização)", "https://docs.getdbt.com/best-practices/how-we-structure/4-marts"]
        }
      ],
      exemplo: {
        t: "Provar que só o dado novo foi processado",
        texto: "Eloabe tem uma tabela bruta de eventos com 241 linhas e cria um modelo incremental fct_events com unique_key event_id e a coluna loaded_at, que guarda o horário em que a linha foi gravada pelo dbt. Na primeira execução, o modelo roda completo, e as 241 linhas ficam com o mesmo loaded_at. Depois ela insere 25 eventos novos na tabela bruta e roda dbt run de novo. O filtro dentro de is_incremental() pega só os eventos mais recentes que o maior event_time já existente. Ao consultar a tabela, as 241 linhas antigas mantêm o loaded_at da primeira execução, e só as 25 novas têm o horário da segunda. Ela guarda a consulta e o resultado como prova, e roda dbt run --full-refresh para mostrar que todas as linhas voltam a ter o mesmo horário novo."
      },
      prova: [
        "Entrevista: explique quando você escolheria view, table e incremental, e por que não começar com incremental.",
        "Entrevista: o que acontece se você esquecer unique_key em um incremental (append e duplicatas) e como --full-refresh resolve.",
        "Trabalho: um run de 40 minutos vira 4 depois de filtrar por is_incremental() no modelo mais pesado.",
        "Revisão de código: você pergunta se a unique_key pode ter nulos e se o filtro incremental usa a coluna certa."
      ],
      explique: "Explique com as próprias palavras como um modelo incremental decide o que processar, para que serve a unique_key e quando usar --full-refresh.",
      checagem: [
        "Quais são as cinco materializações do dbt e qual é o padrão?",
        "Quais condições fazem is_incremental() devolver verdadeiro?",
        "O que acontece sem unique_key em um modelo incremental, segundo a doc?",
        "Qual a diferença entre append, merge e delete+insert?"
      ]
    },
    fontes: [
      ["dbt Developer Hub: materializações", "https://docs.getdbt.com/docs/build/materializations"],
      ["dbt Developer Hub: modelos incrementais", "https://docs.getdbt.com/docs/build/incremental-models"],
      ["dbt Developer Hub: estratégias incrementais", "https://docs.getdbt.com/docs/build/incremental-strategy"],
      ["dbt Developer Hub: configurações do DuckDB", "https://docs.getdbt.com/reference/resource-configs/duckdb-configs"],
      ["dbt Developer Hub: comando run", "https://docs.getdbt.com/reference/commands/run"],
      ["dbt Developer Hub: camada de marts", "https://docs.getdbt.com/best-practices/how-we-structure/4-marts"],
      ["DuckDB: cliente Python", "https://duckdb.org/docs/2.0/clients/python/overview.html"],
      ["DuckDB: funções de lista (range e generate_series)", "https://duckdb.org/docs/2.0/sql/functions/list.html"]
    ],
    cartoes: [
      { id: "a23c1", f: "Quais são as cinco materializações do dbt?", v: "table, view, incremental, ephemeral e materialized view. O padrão é view.", t: "t3" },
      { id: "a23c2", f: "Quando usar view?", v: "Para modelos sem transformação pesada, como renomear e converter colunas; começar com views e mudar só diante de lentidão.", t: "t3" },
      { id: "a23c3", f: "Quando usar table?", v: "Para modelos consultados por BI e transformações lentas usadas por muitos modelos; a desvantagem é o tempo de reconstrução.", t: "t3" },
      { id: "a23c4", f: "O que é um modelo ephemeral?", v: "Um modelo que não vira objeto no banco: o dbt injeta o código nos dependentes como CTE. Não dá para consultá-lo direto.", t: "t3" },
      { id: "a23c5", f: "Quando is_incremental() é verdadeiro?", v: "Quando o modelo já existe como tabela, a flag full-refresh não foi passada e o modelo é incremental.", t: "t3" },
      { id: "a23c6", f: "O que faz unique_key?", v: "Permite atualizar linhas existentes em vez de anexar duplicatas; sem ela, a maioria dos adaptadores faz append.", t: "t3" },
      { id: "a23c7", f: "O que faz dbt run --full-refresh?", v: "Faz o dbt tratar modelos incrementais como tabelas, descartar a tabela existente e reconstruir tudo.", t: "t3" },
      { id: "a23c8", f: "Quais estratégias o dbt-duckdb lista na doc?", v: "append, delete+insert, merge e microbatch. Merge exige DuckDB 1.4.0 ou superior; confira o padrão na página do adaptador.", t: "t3" },
      { id: "a23c9", f: "Por que a doc diz para não começar com incremental?", v: "Porque é uso avançado e exige configuração extra; só vale quando os runs ficam lentos demais.", t: "t3" },
      { id: "a23c10", f: "O que faz a flag --empty?", v: "Limita refs e sources a zero linhas, mas executa o SQL no armazém: valida dependências sem ler dados caros.", t: "t3" }
    ],
    questoes: [
      {
        id: "a23q1", s: 3, t: "t3",
        e: "Você está começando um projeto novo: os modelos de staging só renomeiam colunas e convertem tipos. A tabela de origem tem poucos milhares de linhas. Qual materialização a documentação sugere como ponto de partida?",
        o: [
          "Incremental com unique_key em todos os modelos",
          "Ephemeral para todos, pois evita objetos no banco",
          "View, mudando para outra só diante de problemas de desempenho",
          "Materialized view em todos, sem checar o banco"
        ],
        c: [2],
        x: "A página de materializações recomenda começar com views, adequadas a modelos sem transformação significativa, como renomear e recastar colunas, e trocar só ao notar problemas de desempenho. Incremental é descrito como uso avançado e não deve ser o ponto de partida. Ephemeral serve a passos leves usados em um ou dois lugares, e usá-lo em tudo dificulta a depuração. Materialized view pode não ser suportada em todo banco, então aplicá-la a tudo sem checar é arriscado."
      },
      {
        id: "a23q2", s: 3, t: "t3",
        e: "Um modelo incremental de eventos foi rodado três vezes sem unique_key. Ao contar as linhas, você vê o mesmo evento repetido várias vezes. O que explica isso, segundo a documentação?",
        o: [
          "O adaptador apagou as chaves durante a execução",
          "O DAG foi construído em ordem errada",
          "A flag full-refresh foi ativada por padrão",
          "Sem unique_key, a maioria dos adaptadores insere todas as linhas devolvidas sem checar duplicatas (append)"
        ],
        c: [3],
        x: "A página de incrementais diz que, sem unique_key, a maioria dos adaptadores resulta em comportamento append: insere todas as linhas devolvidas no destino sem verificar duplicatas, e linhas que se sobrepõem ao filtro se repetem. Dizer que o adaptador apagou chaves não tem base. Ordem errada do DAG afeta quando o modelo roda, não gera repetição dentro dele. Se o full-refresh estivesse ativo, a tabela seria recriada do zero e as duplicatas não se acumulariam entre runs."
      },
      {
        id: "a23q3", s: 3, t: "t3",
        e: "Você alterou a lógica de um modelo incremental: a coluna de valor agora é calculada de outra forma, e os dados antigos precisam refletir isso. Rodar dbt run normal só processa linhas novas. Qual o procedimento?",
        o: [
          "Rodar dbt run --full-refresh no modelo, e com o sinal de mais se os dependentes também precisarem ser refeitos",
          "Apagar o dbt_project.yml e recriar o projeto",
          "Trocar a materialização para ephemeral",
          "Rodar dbt compile para atualizar os dados antigos"
        ],
        c: [0],
        x: "A flag full-refresh faz o dbt descartar a tabela existente e reconstruí-la para todo o histórico com a nova lógica, e o sinal de mais no seletor inclui os modelos dependentes. Apagar o dbt_project.yml destrói a configuração e não reprocessa dados. Mudar para ephemeral remove a tabela como objeto e muda o propósito do modelo. O compile só gera o SQL e não escreve nada no banco, então nenhum dado antigo é atualizado."
      },
      {
        id: "a23q4", s: 3, t: "t3",
        e: "Seu run diário de um mart com 400 milhões de linhas passou de 5 para 50 minutos. Os dados são eventos que só chegam novos, com uma coluna de timestamp confiável. Seguindo o guia oficial, qual o próximo passo razoável?",
        o: [
          "Converter o mart para incremental, com filtro por is_incremental() e chave adequada",
          "Mover a lógica para um modelo ephemeral para o banco não guardar nada",
          "Voltar o mart para view, para ficar sempre fresco",
          "Remover os testes para o run terminar mais cedo"
        ],
        c: [0],
        x: "A regra do guia: depois de view e table, quando a tabela demora demais para construir e atrasa os runs, configure incremental. Eventos novos com timestamp confiável são o caso típico citado para incrementais. Ephemeral não persiste o resultado e só empurra o custo para os dependentes. Voltar para view tornaria cada consulta mais lenta com 400 milhões de linhas. Remover testes reduz a segurança dos dados e não ataca a causa do tempo."
      },
      {
        id: "a23q5", s: 3, t: "t3",
        e: "Ao ler a documentação para o adaptador DuckDB, você quer escolher uma estratégia incremental para um modelo com unique_key. Qual afirmação sobre a página do adaptador é a correta?",
        o: [
          "A página lista append, delete+insert, merge e microbatch, e informa que merge exige DuckDB 1.4.0 ou superior",
          "A página lista apenas insert_overwrite para todos os casos",
          "A página afirma que nenhuma estratégia é suportada no DuckDB",
          "A página define merge como padrão sem requisitos de versão"
        ],
        c: [0],
        x: "A página de configurações do DuckDB lista exatamente append, delete+insert, merge e microbatch, com a nota de que merge exige DuckDB 1.4.0 ou superior e microbatch exige dbt 1.9 ou superior. Ela não afirma insert_overwrite para o DuckDB. Dizer que nenhuma estratégia é suportada contradiz a lista. A página também não declara qual é a estratégia padrão, então afirmar que merge é o padrão sem requisitos não tem base: confira na página."
      },
      {
        id: "a23q6", s: 3, t: "t3",
        e: "Um colega propõe usar uma materialized view em todos os modelos do projeto no Snowflake e no DuckDB, porque a documentação diz que combina o desempenho de tabela com o frescor de view. Qual cuidado a documentação pede?",
        o: [
          "Nenhum: toda plataforma suporta materialized view do mesmo jeito",
          "Conferir o suporte e as opções do seu banco: a página diz que nem toda plataforma suporta, e que o dbt-snowflake usa Dynamic Tables no lugar",
          "Evitar para sempre, porque o dbt não permite esse objeto",
          "Usar apenas em modelos ephemeral para ganhar velocidade"
        ],
        c: [1],
        x: "A página avisa que materialized views podem não ser suportadas por todas as plataformas e que as opções de configuração são menores; ela afirma que o dbt-snowflake não suporta materialized views e usa Dynamic Tables. Dizer que toda plataforma trata igual ignora esse aviso. O dbt permite o objeto quando o banco suporta, então proibir para sempre também erra. E materialized view e ephemeral são materializações distintas: a ephemeral nem cria objeto no banco."
      }
    ],
    lab: {
      t: "Converter um modelo grande em incremental e provar que só o dado novo foi processado",
      custo: "gratuito (DuckDB local; dados sintéticos gerados no seu computador)",
      tempo: "45 a 60 min",
      porque: "Gera a primeira entrega do projeto de portfólio Incremental, snapshots e macros: um modelo incremental com prova de que só o dado novo foi processado.",
      antes: "Você precisa do projeto das aulas 21 e 22 funcionando, no ambiente virtual ativo. O DuckDB tem uma biblioteca Python (pip install duckdb), que já vem como dependência do dbt-duckdb. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu esta aula, então ajuste nomes e confirme a sintaxe SQL. Esperado na tela: no primeiro dbt run, o modelo é criado com todas as linhas; no segundo, a tabela ganha só as linhas novas, e a coluna loaded_at prova isso. O arquivo .duckdb fica bloqueado enquanto outra conexão estiver aberta: feche o script Python antes de rodar o dbt.",
      passos: [
        {
          t: "Criar uma tabela bruta sintética",
          cmd: "python -c \"import duckdb; con = duckdb.connect('jaffle_shop.duckdb'); con.execute(\\\"CREATE OR REPLACE TABLE raw_events AS SELECT row_number() OVER () AS event_id, generate_series AS event_time FROM generate_series(TIMESTAMP '2024-01-01', TIMESTAMP '2024-01-10 23:00:00', INTERVAL '1' HOUR)\\\"); print(con.execute('select count(*) from raw_events').fetchall()); con.close()\"",
          p: "Troque jaffle_shop.duckdb pelo caminho do arquivo no seu profiles.yml. A função generate_series, na documentação do DuckDB, inclui o início e o fim, e a coluna de saída tem o nome da função (por isso o generate_series AS event_time). De 1 de janeiro à 0h até 10 de janeiro às 23h, de hora em hora, dá 240 linhas (10 dias x 24 horas). Se a sintaxe divergir na sua versão, confira a página de funções do DuckDB ou carregue um CSV pequeno como seed. A conexão é fechada ao final para não bloquear o arquivo."
        },
        {
          t: "Declarar a source e criar o modelo incremental",
          cmd: "# models/staging/__sources_events.yml\nsources:\n  - name: events_raw\n    schema: main\n    tables:\n      - name: raw_events\n\n-- models/marts/fct_events.sql\n{{ config(\n    materialized='incremental',\n    unique_key='event_id',\n    incremental_strategy='delete+insert'\n) }}\n\nselect\n    event_id,\n    event_time,\n    current_timestamp as loaded_at\nfrom {{ source('events_raw', 'raw_events') }}\n{% if is_incremental() %}\nwhere event_time > (select max(event_time) from {{ this }})\n{% endif %}",
          p: "A estratégia delete+insert está na lista do adaptador DuckDB. Se preferir merge, ele exige DuckDB 1.4.0 ou superior segundo a página do adaptador. A coluna loaded_at é a nossa prova de quando cada linha foi gravada."
        },
        {
          t: "Primeira execução e conferência",
          cmd: "dbt run --select fct_events\npython -c \"import duckdb; con = duckdb.connect('jaffle_shop.duckdb'); print(con.execute('select count(*), count(distinct loaded_at) from fct_events').fetchall()); con.close()\"",
          p: "Esperado: 240 linhas. O número de valores distintos de loaded_at pode ser maior que 1 se o dbt gravar horários por linha; o importante é guardar o valor máximo de loaded_at desta rodada para comparar depois."
        },
        {
          t: "Adicionar dados novos e rodar de novo",
          cmd: "python -c \"import duckdb; con = duckdb.connect('jaffle_shop.duckdb'); con.execute(\\\"INSERT INTO raw_events SELECT (SELECT max(event_id) FROM raw_events) + row_number() OVER (), generate_series FROM generate_series(TIMESTAMP '2024-01-11', TIMESTAMP '2024-01-11 23:00:00', INTERVAL '1' HOUR)\\\"); con.close()\"\ndbt run --select fct_events",
          p: "Isso insere 24 eventos novos, de 11 de janeiro, na tabela bruta. A segunda execução deve processar só eles, porque is_incremental() é verdadeiro e o filtro usa event_time."
        },
        {
          t: "Provar que só o dado novo entrou",
          cmd: "python -c \"import duckdb; con = duckdb.connect('jaffle_shop.duckdb'); print(con.execute('select count(*), min(loaded_at), max(loaded_at) from fct_events').fetchall()); print(con.execute(\\\"select count(*) from fct_events where event_time >= TIMESTAMP '2024-01-11'\\\").fetchall()); con.close()\"",
          p: "Você deve ver 264 linhas no total (240 mais 24). Compare loaded_at: as linhas de 1 a 10 de janeiro mantêm o horário da primeira rodada, e as 24 novas têm o da segunda. Guarde a saída como evidência."
        },
        {
          t: "Comparar com full-refresh",
          cmd: "dbt run --full-refresh --select fct_events",
          p: "Depois do full-refresh, as 264 linhas voltam a ter horários de uma única execução. Isso mostra a diferença entre incremental e reconstrução total. Registre no README, em inglês, a explicação e as saídas."
        }
      ],
      verificar: "Você tem a saída que mostra 240 linhas na primeira rodada, 264 após a segunda, e loaded_at diferente apenas nas 24 linhas novas; além disso, o resultado do full-refresh. Isso prova que só o dado novo foi processado.",
      limpar: [
        "Guarde as saídas dos comandos e o código do modelo em fct_events.sql no repositório dbt-portfolio.",
        "Não commite arquivos .duckdb nem profiles.yml com credenciais.",
        "Dados sintéticos são seguros para publicar; nunca use dados pessoais reais neste lab."
      ],
      erros: [
        { s: "IO Error: Could not set lock on file", c: "O script Python ou outra ferramenta ainda mantém o arquivo .duckdb aberto.", r: "Feche as conexões (con.close() no final de cada script) e qualquer cliente SQL antes do dbt run." },
        { s: "O segundo run reprocessa todas as linhas", c: "is_incremental() deu falso: o modelo não existia como tabela, a flag full-refresh foi usada ou a materialização não é incremental.", r: "Confira a config materialized='incremental' e rode dbt run sem --full-refresh." },
        { s: "Linhas duplicadas depois do segundo run", c: "Faltou unique_key ou o filtro trouxe linhas já existentes sem chave para casá-las.", r: "Defina unique_key='event_id' e confirme que a chave não tem nulos." },
        { s: "Erro de sintaxe no SQL do generate_series", c: "Sintaxe ou versão do DuckDB diferente do esperado.", r: "Confira a página de funções do DuckDB e a versão instalada; ajuste a consulta. Alternativa simples: escreva um CSV pequeno com event_id e event_time em seeds/ e rode dbt seed." }
      ]
    }
  };

  /* ===================== AULA 24 ===================== */
  C.dias[24] = {
    aula: {
      titulo: "Testes, contratos e documentação",
      resumo: "Visão rápida de data tests e unit tests (com referência à aula de testes dbt de outra trilha), e o foco prático em contratos de modelo, descrições e docs blocks, dbt docs generate e serve, exposures, com as notas de versão que a doc atual traz.",
      simples: {
        analogia: "Pense na entrega de uma encomenda. O contrato é o pedido assinado: diz que a caixa terá três itens, com tamanhos e tipos combinados, e se a loja tentar mandar outra coisa, a entrega nem sai do depósito. O teste é a conferência depois que a caixa chega: os itens estão inteiros, sem repetidos, dentro do prazo? A documentação é a etiqueta e o manual dentro da caixa, que explicam o que cada peça é e de onde veio. E a exposure é o aviso de quem vai usar aquela caixa, como a vitrine ou o relatório da diretoria, para que, se algo mudar no depósito, todos saibam quem será afetado. Cada peça cobre um tipo diferente de risco.",
        pontos: [
          "Contrato garante a forma do modelo (nomes, tipos e constraints); teste confere o conteúdo.",
          "Com contract enforced, uma diferença de coluna ou tipo faz o build falhar.",
          "Descrições e docs blocks em YAML e Markdown viram o site de documentação.",
          "dbt docs generate e dbt docs serve geram e visualizam a documentação local.",
          "Exposures registram quem consome seus modelos, como dashboards, e aparecem no grafo."
        ],
        paraQueServe: "Fechar o projeto de portfólio com garantias de forma, documentação navegável e prints que mostram a qualidade do trabalho."
      },
      glossario: [
        { t: "Data test", d: "Consulta que devolve as linhas que violam uma regra; passa quando devolve zero linhas, e pode ser genérico ou singular." },
        { t: "Unit test (dbt)", d: "Teste da lógica SQL de um modelo com entradas estáticas e saída esperada, disponível a partir do dbt v1.8." },
        { t: "Contract (contrato)", d: "Garantia da forma do modelo: nome e tipo de cada coluna e constraints; ativada com contract enforced true." },
        { t: "Constraint", d: "Restrição declarada em uma coluna ou modelo, como not_null ou primary_key; o suporte depende da plataforma." },
        { t: "Docs block", d: "Trecho de Markdown reutilizável escrito em arquivo .md com a tag docs e chamado com a função doc()." },
        { t: "dbt docs generate", d: "Comando que compila o projeto e gera o site de documentação, por padrão na pasta target." },
        { t: "dbt docs serve", d: "Comando que pré-visualiza localmente o site de documentação gerado." },
        { t: "Exposure", d: "Declaração em YAML de um uso a jusante do projeto, como dashboard ou aplicação, com dono e dependências." }
      ],
      blocos: [
        {
          t: "Testes de dados: o resumo e a referência",
          facil: "Traduzindo: teste de dados é uma consulta que devolve linhas ruins; a aula de testes dbt de outra trilha do app cobre isso em detalhe.",
          p: [
            "Esta aula não repete em detalhe os data tests: veja a aula Testes de dados com dbt, em outra trilha do app. O essencial: a página de data tests diz que há dois tipos, genéricos (parametrizados, declarados em YAML) e singulares (um arquivo .sql na pasta de testes). Testes passam quando devolvem zero linhas.",
            "Sobre severidade, a página do severity diz que o padrão é error, que warn só avisa, e que error_if e warn_if recebem condições sobre a contagem de linhas que falharam, com padrão diferente de zero.",
            "```yaml\nmodels:\n  - name: orders\n    columns:\n      - name: order_id\n        data_tests:\n          - unique\n          - not_null\n```",
            "Nota de versão: data_tests é o nome atual da chave e tests ainda funciona como apelido, mas não dá para usar as duas no mesmo recurso. A propriedade arguments, para as entradas do teste, vale a partir da v1.10.5 e é exigida na v2. Confira a versão instalada."
          ],
          fonte: ["dbt Developer Hub: data tests", "https://docs.getdbt.com/docs/build/data-tests"]
        },
        {
          t: "Unit tests, só o essencial",
          facil: "Traduzindo: o unit test confere a lógica de um modelo com poucas linhas escritas à mão, antes de construir o modelo de verdade.",
          p: [
            "A página de unit tests diz que eles validam a lógica SQL do modelo contra entradas pequenas e estáticas, definidos em YAML na pasta de modelos (e não na pasta de testes de dados). Ficam disponíveis a partir do dbt v1.8. Cada teste tem model, given (entradas, com ref ou source) e expect (saída esperada).",
            "Limitações listadas: só modelos SQL, só do projeto atual, sem suporte para materialized view, SQL recursivo ou consultas introspectivas. A recomendação é rodá-los só em desenvolvimento e CI. Comando de execução da página: dbt test --select \"test_type:unit\"."
          ],
          dica: "Use unit tests em lógica complexa (datas, regex, muitos case when); para o resto, data tests costumam bastar.",
          fonte: ["dbt Developer Hub: unit tests", "https://docs.getdbt.com/docs/build/unit-tests"]
        },
        {
          t: "Contratos de modelo: a forma é garantida",
          facil: "Traduzindo: com contrato ativo, você declara as colunas e os tipos esperados; se o SELECT devolver algo diferente, o modelo não é construído.",
          p: [
            "A página de contratos diz que um contrato garante a forma da saída: nomes de colunas, tipos de dados e constraints. Ao ativar enforced, o contrato deve incluir nome e data_type de cada coluna.",
            "```yaml\nmodels:\n  - name: dim_customers\n    config:\n      materialized: table\n      contract:\n        enforced: true\n    columns:\n      - name: customer_id\n        data_type: int\n        constraints:\n          - type: not_null\n      - name: customer_name\n        data_type: string\n```",
            "Quando o contrato é construído, o dbt faz uma checagem prévia (preflight) para confirmar que o SQL devolve colunas com nomes e tipos compatíveis; a ordem das colunas é ignorada. Se não bater, o modelo falha com uma tabela de diferenças. A página de configuração acrescenta que são checados nome, tipo e número de colunas, mas não tamanho, precisão ou escala (varchar(256) contra varchar(257)); para algo mais rigoroso, escreva um teste customizado."
          ],
          fonte: ["dbt Developer Hub: model contracts", "https://docs.getdbt.com/docs/mesh/govern/model-contracts"]
        },
        {
          t: "Contrato versus teste, e onde o contrato não vale",
          facil: "Traduzindo: contrato cuida da forma antes de construir; teste cuida do conteúdo depois; e há casos em que o contrato não é suportado, como ephemeral.",
          p: [
            "Segundo a página, o contrato define a forma da saída; se a lógica ou o dado de entrada não cabem nela, o modelo não é construído. Os data tests validam o conteúdo depois da construção. Alguns testes podem ser substituídos por constraints, mas só se a plataforma impõe a constraint, o modelo é table ou incremental e o contrato está completo.",
            "Suportado: modelos SQL em table, em incremental (com on_schema_change em append_new_columns ou fail) e em view (nomes e tipos, mas sem constraints). Não suportado: modelos Python, materialized view, ephemeral, materializações customizadas, e recursos como sources, seeds e snapshots. A página traz tabelas de suporte de constraints por plataforma (not_null é a mais amplamente imposta; primary_key, foreign_key e unique costumam ser só metadado) e, na leitura desta aula, não menciona o DuckDB: confira a página e teste no seu ambiente. Mudanças que a doc considera quebra: remover coluna, mudar o tipo de uma coluna e, a partir da v1.6, remover ou alterar constraint."
          ],
          armadilha: "Assumir que not_null em contrato é imposto em qualquer banco. A página diz que o suporte depende da plataforma.",
          fonte: ["dbt Developer Hub: configuração contract", "https://docs.getdbt.com/reference/resource-configs/contract"]
        },
        {
          t: "Descrições e docs blocks",
          facil: "Traduzindo: você escreve description no YAML para modelos e colunas, e usa docs blocks em arquivos Markdown quando o texto é longo ou reaproveitado.",
          p: [
            "Conforme a página de documentação, a chave description fica nos mesmos YAMLs onde você declara testes. O dbt também lê colunas não documentadas do banco, então uma coluna sem entrada não some do site.",
            "```yaml\nmodels:\n  - name: events\n    description: This table contains clickstream events from the marketing website\n    columns:\n      - name: event_id\n        description: This is a unique identifier for the event\n        data_tests:\n          - unique\n          - not_null\n```",
            "Para textos longos, use > (dobrado), | (literal) ou um docs block: um trecho em arquivo .md entre as tags docs e enddocs, chamado no YAML com doc().",
            "```markdown\n{% docs table_events %}\nThis table contains clickstream events from the marketing website.\n{% enddocs %}\n```",
            "```yaml\ndescription: '{{ doc(\"table_events\") }}'\n```",
            "Um docs block chamado __overview__ substitui o texto inicial do site. A leitura desta aula marca essa personalização como disponível apenas no dbt Docs."
          ],
          fonte: ["dbt Developer Hub: documentação", "https://docs.getdbt.com/docs/build/documentation"]
        },
        {
          t: "dbt docs generate e dbt docs serve, e a questão da versão",
          facil: "Traduzindo: generate monta o site de documentação e serve o mostra no navegador; o visual e os detalhes mudam entre dbt v1 e v2.",
          p: [
            "A página de referência dos comandos de documentação, que se aplica ao dbt v2.0 e posteriores, diz que dbt docs generate compila o projeto, escreve o índice e exporta o site em um só comando; por padrão, escreve em target (target/index.html e assets). A opção --output-dir grava uma cópia autônoma em outra pasta, que pode ser hospedada em um site estático, e --no-compile pula a compilação. O dbt docs serve gera o site se estiver faltando ou desatualizado, serve os arquivos estáticos, usa a porta 8580 por padrão e abre o navegador.",
            "```bash\ndbt docs generate\ndbt docs serve\n```",
            "Notas de versão da página de documentação: o dbt Docs v2 funciona apenas com dbt v2 auto-hospedado, roda no navegador com DuckDB-WASM e não está disponível na plataforma dbt, onde a alternativa é o dbt Catalog. Para usuários de dbt v1 e do plano Developer, a página cita o dbt Docs (básico), que não tem a velocidade e os metadados do Catalog. O seu lab usa dbt v1 do projeto de exemplo: os comandos são os mesmos, mas o visual pode diferir do descrito para v2."
          ],
          dica: "Anote a versão do dbt ao lado de cada print no README: assim quem lê entende por que o visual é aquele.",
          fonte: ["dbt Developer Hub: dbt docs generate e serve", "https://docs.getdbt.com/reference/commands/cmd-docs"]
        },
        {
          t: "Exposures: quem usa os seus modelos",
          facil: "Traduzindo: uma exposure registra no YAML um dashboard ou aplicação que consome seus modelos, e aparece no grafo da documentação.",
          p: [
            "Segundo a página, exposures descrevem um uso a jusante do projeto, como dashboard, aplicação ou pipeline de ciência de dados, e permitem rodar, testar e listar os recursos que alimentam a exposure e popular uma página própria no site gerado. Campos obrigatórios: name (snake case), type (dashboard, notebook, analysis, ml ou application) e owner (nome ou e-mail). Esperado: depends_on, com ref e source. Opcionais: label, url, maturity (high, medium ou low) e description.",
            "```yaml\nexposures:\n  - name: weekly_jaffle_metrics\n    label: Jaffles by the Week\n    type: dashboard\n    maturity: high\n    description: Weekly sales dashboard\n    depends_on:\n      - ref('fct_orders')\n    owner:\n      name: Your Name\n      email: you@example.com\n```",
            "Depois de definida, você a referencia em comandos, como dbt run -s +exposure:weekly_jaffle_report. A página diz que o depends_on do YAML é diferente da diretiva de comentário SQL -- depends_on."
          ],
          armadilha: "Colocar e-mail real no YAML de um repositório público. Use um endereço fictício ou só o nome no portfólio.",
          fonte: ["dbt Developer Hub: exposures", "https://docs.getdbt.com/docs/build/exposures"]
        }
      ],
      exemplo: {
        t: "Um mart com contrato, descrição e exposure",
        texto: "Eloabe fecha o projeto de portfólio. No YAML do mart customers, ela declara contract enforced true, com customer_id como integer e number_of_orders como bigint, mais um not_null em customer_id. Adiciona descrições ao modelo e às colunas, e move o texto longo do mart para um docs block em um arquivo .md. Declara uma exposure do tipo dashboard que depende de ref('customers'), com um dono fictício. Roda dbt build: o contrato passa, os testes passam. Para provar o contrato, ela muda de propósito o tipo de uma coluna no SELECT e vê o modelo falhar com a tabela de diferenças; depois desfaz. Roda dbt docs generate e dbt docs serve, abre o site, tira prints da página do modelo (com descrições) e do grafo com a exposure, e salva as imagens no repositório com a versão do dbt anotada no README."
      },
      prova: [
        "Entrevista: diferencie contrato de modelo de data test (forma antes de construir contra conteúdo depois) e cite um caso em que o contrato não é suportado.",
        "Revisão de PR: você pede descrição nas colunas novas e um docs block para o texto longo do mart.",
        "Trabalho: uma mudança de tipo de coluna em uma fonte quebra um modelo com contrato antes de chegar ao dashboard.",
        "Entrevista: você explica o que depende da versão do dbt (arguments em testes, dbt Docs v1 contra v2) e como confere."
      ],
      explique: "Explique com as próprias palavras a diferença entre contrato e data test, como as descrições viram o site de documentação e o que uma exposure acrescenta ao grafo.",
      checagem: [
        "O que um contrato enforced exige de cada coluna e o que acontece se o SQL não bater?",
        "Em quais materializações o contrato não é suportado, segundo a doc?",
        "Como se escreve um docs block e como ele é chamado no YAML?",
        "Quais são os campos obrigatórios de uma exposure?"
      ]
    },
    fontes: [
      ["dbt Developer Hub: data tests", "https://docs.getdbt.com/docs/build/data-tests"],
      ["dbt Developer Hub: severity", "https://docs.getdbt.com/reference/resource-configs/severity"],
      ["dbt Developer Hub: unit tests", "https://docs.getdbt.com/docs/build/unit-tests"],
      ["dbt Developer Hub: model contracts", "https://docs.getdbt.com/docs/mesh/govern/model-contracts"],
      ["dbt Developer Hub: configuração contract", "https://docs.getdbt.com/reference/resource-configs/contract"],
      ["dbt Developer Hub: documentação", "https://docs.getdbt.com/docs/build/documentation"],
      ["dbt Developer Hub: dbt docs generate e serve", "https://docs.getdbt.com/reference/commands/cmd-docs"],
      ["dbt Developer Hub: exposures", "https://docs.getdbt.com/docs/build/exposures"],
      ["dbt Developer Hub: comando build", "https://docs.getdbt.com/reference/commands/build"]
    ],
    cartoes: [
      { id: "a24c1", f: "O que um contrato de modelo garante?", v: "A forma da saída: nome e tipo de cada coluna e constraints. Se o SQL não bater, o modelo não é construído.", t: "t4" },
      { id: "a24c2", f: "Como ativar um contrato?", v: "Em config, contract: enforced: true, e declarar name e data_type de cada coluna no YAML do modelo.", t: "t4" },
      { id: "a24c3", f: "O que o preflight do contrato checa?", v: "Se o SQL devolve colunas com nomes e tipos compatíveis com o YAML; a ordem é ignorada. Não checa tamanho, precisão ou escala.", t: "t4" },
      { id: "a24c4", f: "Onde o contrato NÃO é suportado, segundo a doc?", v: "Modelos Python, materialized view, ephemeral, materializações customizadas, e sources, seeds e snapshots.", t: "t4" },
      { id: "a24c5", f: "Contrato versus data test?", v: "Contrato define a forma e barra o build; data test valida o conteúdo depois da construção.", t: "t4" },
      { id: "a24c6", f: "Como documentar uma coluna?", v: "Com description no mesmo YAML onde se declaram os testes; textos longos podem usar docs blocks.", t: "t4" },
      { id: "a24c7", f: "Como funciona um docs block?", v: "Texto Markdown entre as tags docs e enddocs em arquivo .md, chamado no YAML com doc('nome').", t: "t4" },
      { id: "a24c8", f: "O que fazem dbt docs generate e dbt docs serve?", v: "generate compila e gera o site (por padrão em target); serve gera se faltar e o pré-visualiza localmente no navegador.", t: "t4" },
      { id: "a24c9", f: "O que é uma exposure?", v: "Declaração em YAML de um uso a jusante (dashboard, aplicação) com type, owner e depends_on; aparece no grafo e nos comandos de seleção.", t: "t4" },
      { id: "a24c10", f: "Desde qual versão existem unit tests no dbt?", v: "Desde o dbt v1.8, segundo a doc; recomenda-se rodá-los em desenvolvimento e CI, e não em produção.", t: "t4" }
    ],
    questoes: [
      {
        id: "a24q1", s: 3, t: "t4",
        e: "Uma mudança na fonte fez a coluna customer_id de um mart chegar como texto em vez de inteiro. Você quer que o modelo nem seja construído se isso acontecer, antes de o dashboard receber dados errados. Qual recurso do dbt atende melhor?",
        o: [
          "Um data test unique na coluna customer_id",
          "Uma exposure do tipo dashboard declarada no YAML",
          "Um contrato de modelo com contract enforced e data_type definido",
          "Um docs block descrevendo a coluna"
        ],
        c: [2],
        x: "O contrato valida nomes e tipos de dados das colunas durante o build; se o SQL devolver um tipo diferente do declarado, o modelo falha. O teste unique verifica duplicatas depois da construção e não olha o tipo. A exposure documenta um consumidor e não impede construção. O docs block só descreve a coluna em texto e não aplica regra nenhuma, então nada seria barrado."
      },
      {
        id: "a24q2", s: 3, t: "t4",
        e: "Você ativou contract enforced em um modelo ephemeral que funciona como passo intermediário, e o dbt reclama. Segundo a documentação, qual a explicação correta?",
        o: [
          "Contratos só funcionam em modelos escritos em Jinja puro",
          "Ephemeral é uma das materializações em que contratos não são suportados, porque não há objeto no banco",
          "O contrato exige que o modelo tenha no mínimo cem colunas",
          "Contratos só podem ser usados com a plataforma dbt"
        ],
        c: [1],
        x: "A página de contratos lista ephemeral entre os casos não suportados (junto de materialized view, modelos Python, materializações customizadas e recursos como sources, seeds e snapshots), e a página de materializações diz explicitamente que ephemeral não suporta contratos. Não há regra de Jinja puro nem de quantidade mínima de colunas. E contratos funcionam em projetos locais; não exigem a plataforma dbt."
      },
      {
        id: "a24q3", s: 3, t: "t4",
        e: "Ao ver dbt docs generate no seu projeto local com dbt v1, o site parece diferente do descrito na página de referência dos comandos de documentação, que se aplica a dbt v2. Qual conduta é a mais correta?",
        o: [
          "Concluir que o comando está quebrado e reinstalar o Python",
          "Tratar como erro de YAML e apagar os arquivos de descrição",
          "Trocar para dbt docs serve --port 0 para corrigir o visual",
          "Notar que a página descreve dbt v2, conferir a versão com dbt --version e anotar essa versão junto dos prints"
        ],
        c: [3],
        x: "A página do comando diz que se aplica ao dbt v2.0 e posteriores e compara com o layout da v1; a página de documentação lembra que o dbt Docs v2 só funciona com dbt v2 e que usuários de v1 têm o dbt Docs básico. Então a diferença visual é esperada, e a conduta é conferir a versão e registrá-la. Reinstalar o Python não muda o produto. Apagar descrições não tem relação com o visual. A porta não afeta a aparência do site."
      },
      {
        id: "a24q4", s: 3, t: "t4",
        e: "Você quer que o texto longo que descreve o mart orders seja reaproveitado em mais de um YAML e mantido em um só lugar. Qual a forma documentada de fazer isso?",
        o: [
          "Escrever um docs block em arquivo .md e chamá-lo no YAML com doc('nome_do_bloco')",
          "Copiar o texto em cada YAML e torcer para ficarem iguais",
          "Colocar o texto em um comentário SQL dentro do modelo",
          "Criar um modelo ephemeral com o texto como coluna"
        ],
        c: [0],
        x: "A página de documentação descreve docs blocks como Markdown reutilizável em arquivos separados, entre as tags docs e enddocs, referenciados com a função doc() na chave description do YAML. Copiar o texto à mão cria divergência ao longo do tempo. Comentário SQL não aparece como descrição no site. Um modelo ephemeral com texto como coluna não serve a documentação e ainda polui o DAG."
      },
      {
        id: "a24q5", s: 3, t: "t4",
        e: "Para o portfólio, você declarou uma exposure para um dashboard que consome o mart customers. Qual alternativa descreve corretamente o que ela exige e entrega, segundo a documentação?",
        o: [
          "Exige só uma url e entrega alertas por e-mail ao dono",
          "Exige type e owner (e é esperado um depends_on com ref), e cria uma página no site e um nó no grafo, além de permitir selecionar os recursos que a alimentam",
          "Exige um contrato em todos os modelos e entrega testes automáticos",
          "Exige uma conta na plataforma e entrega métricas de uso em tempo real"
        ],
        c: [1],
        x: "A página lista como obrigatórios name, type e owner, com depends_on esperado, e diz que a exposure popula uma página própria na documentação e permite rodar, testar e listar os recursos que a alimentam, com seletores como +exposure:nome. Dizer que exige só url e envia alertas não corresponde: a url é opcional. Contratos em todos os modelos não são requisito de exposures. E exposures manuais são YAML no projeto, sem exigir conta nem fornecer métricas de uso."
      },
      {
        id: "a24q6", s: 3, t: "t4",
        e: "Um colega diz que o contrato torna os data tests desnecessários em qualquer projeto, já que declarar not_null no contrato resolve tudo. Como corrigir essa ideia usando a documentação?",
        o: [
          "Ele está certo: toda constraint é imposta por todos os bancos",
          "Contratos validam forma e dependem da plataforma para constraints; testes validam conteúdo, e só alguns podem ser trocados por constraints se a plataforma as impuser, o modelo for table ou incremental e o contrato estiver completo",
          "Testes só funcionam em modelos com contrato desativado",
          "Contratos validam o conteúdo das linhas, por isso substituem qualquer teste singular"
        ],
        c: [1],
        x: "A página explica que o contrato define a forma e o teste valida o conteúdo; a substituição só é possível sob condições: plataforma que impõe a constraint, modelo table ou incremental e contrato completo. Dizer que todo banco impõe toda constraint ignora as tabelas de suporte por plataforma. Testes não dependem de o contrato estar desativado. E contratos não validam o conteúdo das linhas, então não substituem regras de negócio de um teste singular."
      }
    ],
    lab: {
      t: "Adicionar testes, contrato e descrições, gerar a documentação e guardar prints",
      custo: "gratuito (DuckDB local)",
      tempo: "45 a 60 min",
      porque: "Fecha o projeto de portfólio Projeto dbt: staging, marts, testes e documentação, com a documentação navegável e prints.",
      antes: "Você precisa do projeto das aulas 22 e 23 funcionando. Os passos foram conferidos contra a documentação oficial e NÃO foram executados por quem escreveu esta aula. A página de contratos não menciona o DuckDB, então o comportamento dos tipos e das constraints pode diferir do descrito: teste e leia a mensagem de erro. Os tipos de dados abaixo são ilustrativos; use os que o seu mart realmente devolve. Esperado na tela: dbt build com contrato, testes e modelos em sucesso, e um site de documentação com descrições, grafo e a exposure. Para detalhes de testes, veja a aula Testes de dados com dbt, em outra trilha do app.",
      passos: [
        {
          t: "Descrever modelos e colunas e adicionar testes",
          cmd: "# models/marts/customers.yml\nmodels:\n  - name: customers\n    description: One row per customer.\n    columns:\n      - name: customer_id\n        description: Unique identifier of the customer.\n        data_tests:\n          - unique\n          - not_null",
          p: "Use as colunas do seu mart. data_tests é a chave atual (tests ainda funciona como apelido, mas não use as duas no mesmo recurso); para testes genéricos com argumentos (como accepted_values), use arguments, que vale a partir da v1.10.5 e é exigido na v2. Confira a versão com dbt --version."
        },
        {
          t: "Ativar o contrato em um mart",
          cmd: "    config:\n      materialized: table\n      contract:\n        enforced: true\n    columns:\n      - name: customer_id\n        data_type: integer\n        constraints:\n          - type: not_null\n      - name: number_of_orders\n        data_type: bigint",
          p: "Com contrato enforced, todas as colunas precisam de name e data_type. Descubra os tipos reais com dbt show ou consultando o DuckDB. Rode dbt build. Se der erro de contrato, a mensagem lista as colunas com diferença de tipo."
        },
        {
          t: "Provar que o contrato barra",
          p: "Mude de propósito o tipo de uma coluna no SELECT do mart (por exemplo com cast para texto) e rode dbt build: o modelo deve falhar com a tabela de diferenças. Guarde esse print como evidência e desfaça a mudança."
        },
        {
          t: "Usar um docs block e declarar uma exposure",
          cmd: "# models/marts/docs.md\n{% docs customers_overview %}\nCustomer entity mart built from staging models.\n{% enddocs %}\n\n# no YAML do mart\ndescription: '{{ doc(\"customers_overview\") }}'\n\n# models/marts/exposures.yml\nexposures:\n  - name: customer_dashboard\n    type: dashboard\n    maturity: low\n    description: Example dashboard that would read the customers mart.\n    depends_on:\n      - ref('customers')\n    owner:\n      name: Your Name",
          p: "O docs block fica em arquivo .md, e a exposure precisa de type e owner. Use um dono fictício ou só o seu nome, sem e-mail pessoal no repositório público."
        },
        {
          t: "Gerar a documentação e tirar os prints",
          cmd: "dbt build\ndbt docs generate\ndbt docs serve",
          p: "Abra o site e tire prints de: a página do mart com descrições e testes, o grafo de linhagem com a exposure e a lista de colunas. Salve em screenshots/ no repositório dbt-portfolio, e anote no README, em inglês, a versão do dbt (dbt --version)."
        }
      ],
      verificar: "O dbt build passa com contrato e testes; você tem prints do site de documentação com descrições, grafo com a exposure e do erro de contrato provocado; o README, em inglês, diz a versão do dbt usada.",
      limpar: [
        "Guarde os prints e o README em inglês no repositório dbt-portfolio, com a versão do dbt anotada.",
        "Nunca commite profiles.yml com credenciais, a pasta target pesada nem arquivos .duckdb grandes.",
        "Sem e-mails pessoais nem dados reais nos YAMLs: use donos fictícios."
      ],
      erros: [
        { s: "Erro de contrato: mismatch de nome ou tipo de coluna", c: "O data_type do YAML não coincide com o que o SELECT devolve, ou falta uma coluna.", r: "Leia a tabela de diferenças da mensagem, ajuste o YAML (ou o cast no SQL) e rode de novo." },
        { s: "Constraint não imposta ou aviso sobre constraints", c: "O suporte a constraints depende da plataforma, e a página de contratos não detalha o DuckDB.", r: "Teste no seu ambiente, mantenha os data tests e confira a página de contratos e a do adaptador." },
        { s: "Erro de validação em data_tests ou arguments", c: "Versão do dbt diferente da esperada: arguments vale a partir da v1.10.5 e é exigido na v2.", r: "Confira dbt --version e ajuste o formato conforme a página de data tests." },
        { s: "dbt docs serve não abre ou a porta está ocupada", c: "Outro processo usa a porta padrão.", r: "Use a opção --port com outro número e confira o endereço que o terminal mostra." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
