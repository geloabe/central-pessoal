(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var F = "```";
  function K(lang, lines) { return F + lang + "\n" + lines.join("\n") + "\n" + F; }

  /* ===================== AULA 25 ===================== */
  C.dias[25] = {
    aula: {
      titulo: "Jinja, macros e pacotes",
      resumo: "Como o dbt usa Jinja para gerar SQL: expressões, if, for e set, macros próprias, funções de contexto úteis, variáveis (vars), pacotes como o dbt_utils instalados por packages.yml e dbt deps, hooks e o equilíbrio entre clareza e abstração.",
      simples: {
        analogia: "Pense numa cozinha que usa fichas de receita. O SQL é o prato final. O Jinja é a máquina de imprimir fichas: você escreve uma ficha com lacunas (a quantidade de sal, a lista de ingredientes) e a máquina preenche as lacunas e entrega a ficha pronta para o cozinheiro, que é o banco de dados. Uma macro é uma ficha que você guarda na gaveta para reaproveitar em várias receitas. Um pacote é uma gaveta inteira de fichas que outra pessoa organizou e você empresta. As variáveis são os botões de ajuste na lateral da máquina. Os hooks são tarefas de abrir e fechar a cozinha. E a regra de ouro: se toda receita virar só ficha com lacunas, ninguém mais entende o que está sendo cozinhado.",
        pontos: [
          "Dentro de chaves duplas {{ }} o Jinja imprime texto; dentro de {% %} ele só executa lógica, sem imprimir.",
          "Macro é uma função Jinja guardada na pasta macros e chamada com {{ nome(args) }}.",
          "vars se definem no dbt_project.yml e se sobrescrevem na linha de comando com --vars.",
          "Pacotes entram por packages.yml e dbt deps; ficam em dbt_packages.",
          "Hooks rodam SQL antes ou depois de um modelo (pre-hook, post-hook) ou da execução inteira (on-run-start, on-run-end).",
          "A documentação recomenda priorizar legibilidade em vez de abstrair toda linha repetida."
        ],
        paraQueServe: "Reaproveitar lógica SQL entre modelos sem copiar e colar, instalar utilitários prontos e ajustar o comportamento por ambiente, mantendo o projeto legível."
      },
      glossario: [
        { t: "Jinja", d: "Linguagem de templates que o dbt usa para transformar arquivos .sql em SQL final antes de mandar ao banco." },
        { t: "Expressão {{ }}", d: "Delimitador Jinja que produz texto na saída, usado para referenciar variáveis e chamar macros." },
        { t: "Statement {% %}", d: "Delimitador Jinja que não imprime texto; serve para for, if, set e para definir macros." },
        { t: "Macro", d: "Função Jinja definida em arquivo .sql, normalmente na pasta macros, reutilizável em modelos, testes e hooks." },
        { t: "vars", d: "Variáveis de projeto declaradas em dbt_project.yml (ou passadas por --vars) e lidas com a função var()." },
        { t: "packages.yml", d: "Arquivo na raiz do projeto que lista pacotes a instalar; dbt deps baixa tudo para dbt_packages." },
        { t: "Hook", d: "SQL executado automaticamente antes ou depois de um modelo, seed ou snapshot, ou no início e no fim de uma execução." },
        { t: "run-operation", d: "Comando que executa uma macro diretamente, passando argumentos em YAML com --args." }
      ],
      blocos: [
        {
          t: "Os três delimitadores do Jinja", facil: "Traduzindo: chaves duplas imprimem, chave com porcentagem manda executar, chave com cerquilha é comentário.", p: [
            "O dbt usa três tipos de delimitador. Expressões {{ ... }} produzem texto: servem para referenciar variáveis e chamar macros. Statements {% ... %} não produzem texto: servem para controle de fluxo (for, if), para definir variáveis com set e para definir macros. Comentários {# ... #} impedem que o trecho seja executado ou impresso. A página alerta: não use -- como comentário dentro de código Jinja, porque o Jinja ainda vai processar o que está depois.",
            "O exemplo principal da documentação monta uma coluna por forma de pagamento com for e set:",
            K("sql", [
              "{% set payment_methods = [\"bank_transfer\", \"credit_card\", \"gift_card\"] %}",
              "",
              "select",
              "    order_id,",
              "    {% for payment_method in payment_methods %}",
              "    sum(case when payment_method = '{{payment_method}}' then amount end) as {{payment_method}}_amount,",
              "    {% endfor %}",
              "    sum(amount) as total_amount",
              "from app_data.payments",
              "group by 1"
            ]),
            "Ao compilar, o laço vira três linhas de sum(case when ...), uma para cada item da lista. O set no topo do arquivo é o método que a documentação prefere para declarar a lista."
          ], fonte: ["dbt: Jinja e macros", "https://docs.getdbt.com/docs/build/jinja-macros"], dica: "Para ver o SQL final, rode dbt compile e abra o arquivo em target/compiled."
        },
        {
          t: "if, set e controle de espaços", facil: "Traduzindo: if decide qual SQL entra, set guarda um valor, e o sinal de menos nas chaves apaga espaços e linhas em branco.", p: [
            "O if deixa o SQL mudar conforme uma condição. A página da variável target mostra um exemplo clássico: limitar os dados quando o alvo é dev.",
            K("sql", [
              "select *",
              "from source('web_events', 'page_views')",
              "{% if target.name == 'dev' %}",
              "where created_at >= dateadd('day', -3, current_date)",
              "{% endif %}"
            ]),
            "A função dateadd desse exemplo depende do banco; a documentação de macros entre bancos traz dbt.dateadd para escrever isso de forma portável (veremos na aula 28).",
            "Para controlar espaços, use o sinal de menos nos delimitadores: {{- ... -}}, {%- ... %} e {#- ... -#} removem espaços em branco ao redor. A própria página avisa que é fácil se perder em controle de espaços: use só quando a saída ficar feia ou quebrar."
          ], fonte: ["dbt: variável target", "https://docs.getdbt.com/reference/dbt-jinja-functions/target"], armadilha: "Usar if para esconder lógica de negócio em vez de ambiente. Ramificar o SQL por target.name é útil para limitar dados em dev; esconder regras ali dificulta testar."
        },
        {
          t: "Macros: definir e chamar", facil: "Traduzindo: macro é uma função guardada na pasta macros; você chama com chaves duplas e o dbt cola o resultado no SQL.", p: [
            "Macros ficam em arquivos .sql, tipicamente na pasta macros. O exemplo da documentação converte centavos em dólares:",
            K("sql", [
              "{% macro cents_to_dollars(column_name, scale=2) %}",
              "    ({{ column_name }} / 100)::numeric(16, {{ scale }})",
              "{% endmacro %}"
            ]),
            "Chamada em um modelo: {{ cents_to_dollars('amount') }} as amount_usd. O resultado compilado é (amount / 100)::numeric(16, 2). O tipo numeric e o operador :: do exemplo são sintaxe de certos bancos; confira o que o seu adaptador aceita.",
            "Regra de aspas: dentro de {{ }} e {% %}, argumentos de texto precisam de aspas. Sem elas (cents_to_dollars(amount)), o Jinja procura uma variável chamada amount, não acha e o trecho compila para nada. Aspas simples e duplas valem igual, desde que combinem. Macros de pacote levam o nome do pacote na frente, como em {{ dbt_utils.dimensions(5) }}.",
            "Você pode documentar macros em um properties.yml sob a chave macros, com description e arguments (name, type, description). A partir do dbt v1.10, a flag validate_macro_args liga a validação desses argumentos."
          ], fonte: ["dbt: Jinja e macros", "https://docs.getdbt.com/docs/build/jinja-macros"], armadilha: "Esquecer as aspas no argumento. O erro não aparece: o campo simplesmente some do SQL compilado."
        },
        {
          t: "Funções de contexto que você vai usar", facil: "Traduzindo: o dbt injeta no Jinja um kit de funções prontas, como ref, var, target e run_query.", p: [
            "O dbt expõe funções e variáveis de contexto em qualquer lugar onde processa Jinja. As descrições abaixo vêm da página de referência.",
            "Cuidado especial com run_query: ela devolve uma tabela Table com o resultado e devolve none se a consulta não retorna linhas (DDL ou DML). A página avisa que ela roda no banco sempre que o dbt compila com conexão viva, inclusive em dbt compile e dbt docs generate. Envolva a chamada em {% if execute %}; mas saiba que esse guarda não impede a execução nesses comandos. Para limitar efeitos colaterais, a página sugere combinar execute com flags.WHICH."
          ], tabela: {
            cab: ["Nome", "O que a página diz"],
            linhas: [
              ["ref e source", "Referenciam modelos e tabelas de origem."],
              ["var", "Passa variáveis do dbt_project.yml para modelos."],
              ["env_var", "Incorpora variáveis de ambiente do sistema."],
              ["target", "Informações sobre a conexão com o banco (name, schema, type, threads)."],
              ["this", "Representa o modelo atual no banco."],
              ["execute", "True quando o dbt está em modo de execução."],
              ["run_query", "Roda consultas e busca resultados."],
              ["log", "Escreve mensagens no log (os exemplos das páginas usam info=True para mostrar no terminal)."]
            ]
          }, fonte: ["dbt: funções Jinja do dbt", "https://docs.getdbt.com/reference/dbt-jinja-functions"], dica: "Conhece a função, mas não lembra a sintaxe? A página de cada função na referência tem exemplos."
        },
        {
          t: "Variáveis de projeto (vars)", facil: "Traduzindo: vars são botões que você declara no projeto e pode girar numa execução específica sem editar arquivo.", p: [
            "Declare vars no topo do dbt_project.yml. Elas podem ser globais ou restritas a um pacote:",
            K("yaml", [
              "vars:",
              "  start_date: '2016-06-01'          # global",
              "  my_dbt_project:",
              "    platforms: ['web', 'mobile']    # só no projeto my_dbt_project"
            ]),
            "Leia com var() em modelos, hooks e macros: select '{{ var(\"event_type\") }}' as event_type. Jinja não é suportado dentro do bloco vars: os valores são lidos literalmente. A página de vars cita o valor padrão como argumento de var() (a forma usual é var('nome', 'padrao'); confira na página da função var).",
            "Sobrescreva na linha de comando com --vars, que recebe um dicionário YAML em texto: dbt run --vars '{event_type: signup, region: us}'. Valores de --vars vencem os do dbt_project.yml. A ordem completa de precedência está na página, marcada como dbt v1.12 ou superior (inclui um arquivo vars.yml); se não achar a variável em nenhum nível e sem padrão, o dbt dá erro de compilação. Mudar qualquer variável desativa o partial parsing da próxima execução."
          ], fonte: ["dbt: variáveis de projeto", "https://docs.getdbt.com/docs/build/project-variables"], armadilha: "Tentar usar Jinja dentro de vars no dbt_project.yml. O valor é tratado como texto literal."
        },
        {
          t: "Pacotes: packages.yml e dbt deps", facil: "Traduzindo: pacote é um projeto dbt de outra pessoa que você instala com um arquivo YAML e um comando.", p: [
            "Crie packages.yml (ou dependencies.yml) ao lado do dbt_project.yml. Pacotes do dbt Hub exigem version, e a página recomenda fixar uma faixa dentro da versão menor:",
            K("yaml", [
              "packages:",
              "  - package: dbt-labs/snowplow",
              "    version: [\">=0.7.0\", \"<0.8.0\"]"
            ]),
            "Também há pacotes por git (git: e revision: com tag, branch ou hash de 40 caracteres) e locais (local:). Rode dbt deps: os pacotes são instalados em dbt_packages, pasta que por padrão o git ignora. O comando também cria ou atualiza package-lock.yml; se o packages.yml não mudou, as próximas execuções instalam a partir do lock. Para novas versões, use dbt deps --upgrade.",
            "O dbt_utils é o pacote mais conhecido (repositório github.com/dbt-labs/dbt-utils; no Hub, dbt-labs/dbt_utils). O README lista macros como generate_surrogate_key, star, date_spine e get_column_values, além de testes como unique_combination_of_columns. Confira no Hub a versão atual e a compatibilidade com a sua versão do dbt: a página de pacotes diz que, no dbt v2, o pacote é compatível se require-dbt-version contém 2.0.0."
          ], fonte: ["dbt: pacotes", "https://docs.getdbt.com/docs/build/packages"], dica: "Prefira o Hub: a página recomenda instalar por ele porque assim o dbt trata dependências duplicadas, e diz que os outros métodos não conseguem lidar com o dbt_utils duplicado."
        },
        {
          t: "Hooks e run-operation", facil: "Traduzindo: hook é SQL que roda sozinho antes ou depois de um modelo, ou no começo e no fim de toda a execução.", p: [
            "pre-hook e post-hook rodam antes e depois da construção de um modelo, seed ou snapshot. on-run-start e on-run-end rodam no início e no fim de dbt build, compile, docs generate, run, seed, snapshot e test (lista da página de referência de on-run-start e on-run-end). Sintaxes documentadas: no dbt_project.yml com +pre-hook e +post-hook, no bloco config do modelo (post_hook=[\"alter table {{ this }} ...\"]) ou no properties.yml. Hooks são cumulativos e, por ordem, rodam primeiro os de pacotes, depois os do dbt_project.yml, depois os do modelo.",
            "No on-run-end existem variáveis extras: schemas (lista de schemas construídos) e results (um resultado por recurso executado). Fora do on-run-end, elas valem none. A página traz uma macro que imprime um resumo por nó, e o hook se declara assim: on-run-end: \"{{ log_results(results) }}\".",
            "Já run-operation executa uma macro avulsa: dbt run-operation grant_select --args '{role: reporter}'. Dentro da macro, é preciso executar a consulta com run_query (ou um bloco statement); senão o dbt só devolve o SQL como texto.",
            "A página adverte que hooks são um recurso avançado e que, havendo a config grants, use-a antes de recorrer a post-hook. Em bancos com transações (Postgres, Redshift), os hooks rodam por padrão dentro da mesma transação do modelo."
          ], fonte: ["dbt: hooks e operations", "https://docs.getdbt.com/docs/build/hooks-operations"], armadilha: "Esquecer que hooks de dbt_project.yml e do modelo se somam: nenhum substitui o outro."
        },
        {
          t: "Clareza versus abstração", facil: "Traduzindo: nem toda linha repetida precisa virar macro; se ninguém entende o SQL, a abstração saiu cara.", p: [
            "A documentação é direta: depois de aprender o poder do Jinja, é comum querer abstrair toda linha repetida em macro. Lembre que o Jinja pode deixar os modelos mais difíceis de interpretar. A recomendação é favorecer a legibilidade ao misturar Jinja com SQL, mesmo que isso signifique repetir algumas linhas de SQL em alguns lugares. Se todos os seus modelos viraram macros, vale reavaliar.",
            "Duas práticas vêm dessa página. Primeiro, antes de escrever uma macro, confira se o dbt-utils já tem uma. Segundo, declare listas no topo do modelo com set e itere sobre a variável, em vez de escrever a lista dentro do for.",
            "Em entrevista, essa é uma boa resposta de maturidade: você sabe usar Jinja e também sabe quando não usar."
          ], fonte: ["dbt: Jinja e macros (legibilidade e DRY)", "https://docs.getdbt.com/docs/build/jinja-macros"], dica: "Teste simples antes de criar uma macro: alguém que não leu a macro consegue entender o modelo lendo só o SQL compilado?"
        }
      ],
      exemplo: {
        t: "Padronizar texto com uma macro e um pacote",
        texto: "O modelo stg_clientes recebe nomes como '  Ana Maria ' e 'ANA MARIA'. Você cria macros/limpar_texto.sql com a macro limpar_texto(coluna), que devolve lower(trim(coluna)), e usa nos dois modelos que precisam. Para a chave, em vez de concatenar colunas à mão, instala o dbt_utils em packages.yml, roda dbt deps e chama dbt_utils.generate_surrogate_key sobre o nome limpo. Para testar, escreve um teste singular que chama a macro com um texto fixo e devolve uma linha se o resultado for diferente do esperado. Uma var chamada pais_padrao no dbt_project.yml permite trocar o filtro em uma execução com --vars. No fim do build, um on-run-end com uma macro imprime o status de cada nó. O resultado: lógica em um lugar só, chave padronizada por pacote, teste automático da macro e logs úteis, sem esconder o SQL."
      },
      prova: [
        "Em code review, alguém pergunta por que um campo sumiu do SQL compilado: o argumento da macro estava sem aspas.",
        "Entrevista: explique a diferença entre {{ }} e {% %} e quando uma macro vira abstração demais.",
        "No trabalho, você precisa trocar um filtro de data numa execução específica: usa var() e --vars em vez de editar o projeto.",
        "Um pacote novo entra no projeto: você fixa uma faixa de versão no packages.yml e commita o package-lock.yml."
      ],
      explique: "Explique com as próprias palavras como o dbt transforma um modelo com Jinja em SQL, o que uma macro faz, como vars e pacotes entram no projeto e quando é melhor repetir SQL em vez de criar uma macro.",
      checagem: [
        "Qual a diferença entre expressões, statements e comentários no Jinja do dbt?",
        "Por que cents_to_dollars(amount) sem aspas compila para nada?",
        "Como se instala um pacote e onde ele fica no projeto?",
        "O que a documentação recomenda sobre legibilidade versus abstrair tudo em macros?"
      ]
    },
    fontes: [
      ["dbt: Jinja e macros", "https://docs.getdbt.com/docs/build/jinja-macros"],
      ["dbt: pacotes", "https://docs.getdbt.com/docs/build/packages"],
      ["dbt: variáveis de projeto", "https://docs.getdbt.com/docs/build/project-variables"],
      ["dbt: hooks e operations", "https://docs.getdbt.com/docs/build/hooks-operations"],
      ["dbt: funções Jinja do dbt", "https://docs.getdbt.com/reference/dbt-jinja-functions"],
      ["dbt: contexto do on-run-end", "https://docs.getdbt.com/reference/dbt-jinja-functions/on-run-end-context"],
      ["dbt: pre-hook e post-hook", "https://docs.getdbt.com/reference/resource-configs/pre-hook-post-hook"],
      ["dbt: função run_query", "https://docs.getdbt.com/reference/dbt-jinja-functions/run_query"],
      ["dbt: comando run-operation", "https://docs.getdbt.com/reference/commands/run-operation"],
      ["dbt: on-run-start e on-run-end", "https://docs.getdbt.com/reference/project-configs/on-run-start-on-run-end"],
      ["dbt: exemplos de seleção de testes", "https://docs.getdbt.com/reference/node-selection/test-selection-examples"],
      ["dbt: testes de dados (singulares)", "https://docs.getdbt.com/docs/build/data-tests"],
      ["Repositório dbt-utils", "https://github.com/dbt-labs/dbt-utils"],
      ["dbt: testes genéricos customizados", "https://docs.getdbt.com/best-practices/writing-custom-generic-tests"]
    ],
    cartoes: [
      { id: "a25c1", f: "O que cada delimitador Jinja faz no dbt?", v: "{{ }} imprime texto (expressão), {% %} executa lógica sem imprimir (for, if, set, macro) e {# #} é comentário.", t: "t5" },
      { id: "a25c2", f: "Onde se definem macros e como se chamam?", v: "Em arquivos .sql, normalmente na pasta macros; chamam-se com {{ nome(args) }} em modelos, testes e hooks.", t: "t5" },
      { id: "a25c3", f: "Por que argumentos de texto de uma macro precisam de aspas?", v: "Sem aspas o Jinja procura uma variável com esse nome; não achando, o trecho compila para nada.", t: "t5" },
      { id: "a25c4", f: "Como se sobrescreve uma var numa execução?", v: "Com --vars e um dicionário YAML em texto, por exemplo dbt run --vars '{event_type: signup}'. Vale mais que o dbt_project.yml.", t: "t5" },
      { id: "a25c5", f: "Como instalar pacotes e onde eles ficam?", v: "Liste em packages.yml e rode dbt deps. Ficam em dbt_packages e o dbt cria ou atualiza o package-lock.yml.", t: "t5" },
      { id: "a25c6", f: "Por que preferir pacotes do dbt Hub a pacotes por git?", v: "A página de pacotes recomenda o Hub porque o dbt consegue tratar dependências duplicadas; ela diz que os outros métodos não lidam com o dbt_utils duplicado.", t: "t5" },
      { id: "a25c7", f: "Quando cada hook roda?", v: "pre-hook e post-hook antes e depois de um modelo, seed ou snapshot; on-run-start e on-run-end no início e no fim da execução.", t: "t5" },
      { id: "a25c8", f: "Quais variáveis extras existem no on-run-end?", v: "schemas (schemas construídos) e results (um resultado por recurso executado). Fora do on-run-end valem none.", t: "t5" },
      { id: "a25c9", f: "O que a doc recomenda sobre macros demais?", v: "Favorecer legibilidade, mesmo repetindo algum SQL. Se todos os modelos viraram macros, reavaliar. Conferir o dbt-utils antes de escrever.", t: "t5" }
    ],
    questoes: [
      { id: "a25q1", s: 3, t: "t5", e: "Num modelo, você escreveu um laço para gerar uma coluna por forma de pagamento. Ao compilar, o SQL contém o texto de cada coluna mas também aparecem linhas em branco inesperadas, e uma variável set não imprimiu nada. Qual descrição dos delimitadores explica o comportamento?", o: ["Os statements com chave e porcentagem não produzem texto, enquanto as expressões com chaves duplas produzem", "Os statements com chave e porcentagem sempre imprimem o valor da variável", "Comentários com dois hifens são ignorados pelo Jinja e por isso são seguros", "Expressões com chaves duplas só funcionam dentro de macros", "Todos os delimitadores imprimem texto e o controle de espaços é impossível"], c: [0], x: "A documentação separa os delimitadores: expressões com chaves duplas produzem texto; statements com chave e porcentagem (for, if, set, macro) não produzem texto, por isso o set não imprime nada, embora as linhas que ele ocupa possam deixar espaço em branco, que se controla com o sinal de menos. Dizer que statements imprimem inverte a regra. Dois hifens não são seguros: a página manda usar chave e cerquilha. Expressões funcionam em modelos, não só em macros. E o controle de espaços existe, com o sinal de menos." },
      { id: "a25q2", s: 3, t: "t5", e: "Você criou a macro cents_to_dollars(column_name, scale=2) e a chamou como {{ cents_to_dollars(amount) }} em um modelo. O SQL compilado perdeu a coluna amount_usd inteira, sem erro. Qual a correção?", o: ["Instalar o dbt_utils com dbt deps", "Chamar a macro com aspas no argumento, por exemplo {{ cents_to_dollars('amount') }}", "Trocar a macro por um hook on-run-end", "Passar o argumento com --vars", "Mover a macro da pasta macros para a pasta models"], c: [1], x: "Dentro das chaves, texto precisa de aspas. Sem elas, o Jinja procura uma variável chamada amount, não encontra e a expressão compila para nada, sem acusar erro. Instalar o dbt_utils não muda como a macro é chamada. Um hook on-run-end roda no fim da execução e não corrige a chamada. --vars define variáveis de projeto, não argumentos de uma chamada de macro. Macros ficam na pasta macros; colocá-las em models não é o que a documentação indica." },
      { id: "a25q3", s: 3, t: "t5", e: "Você adicionou o pacote dbt_utils ao packages.yml, mas ao rodar o projeto o dbt diz que a macro dbt_utils.generate_surrogate_key não existe. O que provavelmente faltou e onde o pacote ficará instalado?", o: ["Rodar dbt seed; o pacote fica em seeds", "Rodar dbt deps; o pacote fica em dbt_packages", "Rodar dbt snapshot; o pacote fica em snapshots", "Rodar dbt docs generate; o pacote fica em target", "Nada; basta reiniciar o terminal"], c: [1], x: "Editar o packages.yml não instala nada: é o dbt deps que baixa os pacotes para a pasta dbt_packages (ignorada pelo git por padrão) e atualiza o package-lock.yml. dbt seed carrega CSVs, dbt snapshot registra histórico e dbt docs generate gera documentação; nenhum instala pacotes. A pasta target guarda artefatos de compilação. Reiniciar o terminal não altera o conjunto de pacotes instalado no projeto." },
      { id: "a25q4", s: 3, t: "t5", e: "O dbt_project.yml define a var start_date como 2016-06-01. Para um backfill pontual você precisa rodar com 2024-01-01 sem editar nem commitar o arquivo. Qual a forma documentada e qual valor prevalece?", o: ["Editar o dbt_project.yml e reverter depois; prevalece o do arquivo", "dbt run --vars '{start_date: 2024-01-01}'; prevalece o valor da linha de comando", "Definir start_date dentro de packages.yml; prevalece o do pacote", "Usar {% set start_date %} no dbt_project.yml; prevalece o set", "Usar um comentário no modelo; prevalece o comentário"], c: [1], x: "O --vars aceita um dicionário YAML em texto e, pela página de variáveis, sobrescreve os valores do dbt_project.yml, ideal para mudar numa execução sem editar arquivo versionado. Editar e reverter funciona mas é arriscado e não é o que a página recomenda. packages.yml lista pacotes, não define vars do projeto. Jinja nem sequer é suportado dentro do bloco vars. Comentários não definem valores." },
      { id: "a25q5", s: 3, t: "t5", e: "(Escolha duas) Você quer registrar no log o status de cada nó ao final de um dbt build e também dar grant nos schemas construídos. Quais afirmações sobre hooks estão corretas segundo a documentação?", o: ["As variáveis schemas e results só estão disponíveis em hooks on-run-end", "Hooks definidos no dbt_project.yml e no config do modelo se somam: ambos são aplicados", "Fora do on-run-end, results continua trazendo a lista de resultados", "Hooks do modelo substituem os do dbt_project.yml", "Um post-hook roda antes da construção do modelo"], c: [0, 1], x: "A página do contexto de on-run-end diz que schemas e results só existem ali e valem none fora dele. A página de pre-hook e post-hook diz que hooks são cumulativos: se existem no dbt_project.yml e no config do modelo, os dois conjuntos são aplicados, com os de pacotes primeiro e os do modelo depois dos do projeto. Afirmar que results existe fora do on-run-end contradiz a página. Dizer que o hook do modelo substitui o do projeto também. Post-hook roda depois da construção, não antes." },
      { id: "a25q6", s: 3, t: "t5", e: "Um colega propõe transformar cada trecho repetido de SQL do projeto em macro, inclusive filtros de duas linhas usados em três modelos. Qual a recomendação da documentação do dbt sobre isso?", o: ["Abstrair tudo, pois DRY é sempre melhor", "Favorecer a legibilidade, aceitando repetir algumas linhas de SQL, e conferir se o dbt-utils já resolve antes de escrever macro", "Nunca usar macros em projetos de produção", "Usar apenas macros de pacotes e nunca escrever as próprias", "Mover toda a lógica para hooks"], c: [1], x: "A página de Jinja e macros recomenda favorecer a legibilidade ao misturar Jinja com SQL, mesmo repetindo algumas linhas, e diz que, se todos os modelos viraram macros, vale reavaliar. Também sugere checar o dbt-utils antes de escrever uma macro. Abstrair tudo é exatamente o que ela desencoraja. Proibir macros ou só aceitar as de pacotes vai além do que a doc diz, que apenas pede equilíbrio. Hooks servem para executar SQL antes ou depois, não para organizar lógica de modelos." },
      { id: "a25q7", s: 3, t: "t5", e: "Uma macro usa run_query para consultar a tabela de origem e você a protegeu com {% if execute %}. Mesmo assim, um dbt docs generate no CI está consultando o banco. A documentação explica isso como?", o: ["O if execute desliga a compilação completamente", "O dbt docs generate e o dbt compile também compilam o projeto com conexão, então execute continua verdadeiro e run_query roda", "O run_query só roda no dbt run", "O guarda só vale para o dbt test", "É um bug conhecido sem solução"], c: [1], x: "Pela página de run_query, ela roda no banco sempre que o dbt compila com conexão viva, inclusive em dbt compile e dbt docs generate. A variável execute é verdadeira sempre que há conexão, não só ao materializar modelos. Por isso o guarda evita a execução durante o parsing, mas não nesses comandos; para limitar efeitos colaterais, a página sugere combinar execute com flags.WHICH. O guarda não desliga a compilação, run_query não é exclusivo do dbt run e o comportamento é documentado, não um bug." }
    ],
    lab: {
      t: "Macro própria, pacote dbt_utils, teste da macro e hook de resumo",
      custo: "gratuito (tudo local, com dbt e DuckDB)",
      tempo: "45 a 60 min",
      porque: "Fecha a parte de Jinja do projeto dbt-portfolio com uma macro sua, um pacote oficial e um teste que prova que a macro funciona.",
      antes: "Você precisa do projeto dbt-portfolio das aulas 21 a 24 rodando com DuckDB e o repositório local no git. Os passos abaixo foram conferidos contra a documentação oficial, mas NÃO foram executados por quem escreveu: pode haver pequenos ajustes de nome de pasta ou de versão. Na tela você verá o dbt imprimindo a contagem de macros e, depois do dbt deps, a pasta dbt_packages. Versões: a página de instalação atual (docs.getdbt.com/docs/local/install-dbt) descreve o dbt v2 (python -m pip install dbt), enquanto o README do dbt-duckdb mostra pip3 install dbt-duckdb (mira dbt-core 1.8 ou superior, ou seja, v1). Escolha um só caminho, em ambiente limpo, e confira o que está instalado com dbt --version: vars.yml e algumas opções são de versões recentes (v1.12 ou superior). Este lab assume o caminho dbt-duckdb (v1). Crie um branch, por exemplo git switch -c aula-25-macros.",
      passos: [
        { t: "Criar a macro limpar_texto", cmd: K("sql", ["-- macros/limpar_texto.sql", "{% macro limpar_texto(coluna) %}", "    lower(trim({{ coluna }}))", "{% endmacro %}"]), p: "Crie o arquivo na pasta macros. Ele recebe uma coluna (ou texto) e devolve a versão minúscula e sem espaços nas pontas." },
        { t: "Usar a macro em um modelo de demonstração", cmd: K("sql", ["-- models/demo_macros.sql", "select", "    {{ limpar_texto(\"'  Ana Maria  '\") }} as nome_limpo"]), p: "Note as aspas: o texto vai entre aspas duplas externas e simples internas, porque o argumento é um texto SQL. Rode dbt compile --select demo_macros e abra o arquivo em target/compiled para ver lower(trim('  Ana Maria  ')). Depois rode dbt run --select demo_macros." },
        { t: "Instalar o dbt_utils", cmd: K("yaml", ["# packages.yml (raiz do projeto)", "packages:", "  - package: dbt-labs/dbt_utils", "    version: [\">=VERSAO_ATUAL\", \"<PROXIMA_VERSAO_MAIOR\"]"]), p: "Abra a página do dbt_utils no dbt Hub (ou o repositório github.com/dbt-labs/dbt-utils) para ver a versão atual e a compatibilidade com o seu dbt, e troque os dois marcadores por uma faixa real, como a página de pacotes recomenda. Rode dbt deps. Confirme que a pasta dbt_packages e o arquivo package-lock.yml existem." },
        { t: "Chamar uma macro do pacote", cmd: K("sql", ["-- models/demo_macros.sql", "select", "    {{ limpar_texto(\"'  Ana Maria  '\") }} as nome_limpo,", "    {{ dbt_utils.generate_surrogate_key([limpar_texto(\"'  Ana Maria  '\")]) }} as chave"]), p: "A macro generate_surrogate_key vem do README do dbt_utils. Rode dbt run --select demo_macros e confira a coluna chave no DuckDB." },
        { t: "Testar a macro com um teste singular", cmd: K("sql", ["-- tests/assert_limpar_texto.sql", "select 1 as falha", "where {{ limpar_texto(\"'  Ana  '\") }} != 'ana'"]), p: "Teste singular devolve as linhas ruins: se a macro estiver certa, não devolve nada e passa. Não termine a consulta com ponto e vírgula. Rode dbt test --select assert_limpar_texto (a página de exemplos de seleção de testes mostra selecionar um teste singular pelo nome; a página de testes dá o nome do arquivo como nome do teste no exemplo dela). Para ver falhar, troque 'ana' por 'xxx', rode de novo e desfaça." },
        { t: "Hook on-run-end com resumo (opcional)", cmd: K("sql", ["-- macros/log_results.sql (da documentação do on-run-end)", "{% macro log_results(results) %}", "  {% if execute %}", "  {{ log(\"========== Begin Summary ==========\", info=True) }}", "  {% for res in results -%}", "    {% set line -%}", "        node: {{ res.node.unique_id }}; status: {{ res.status }} (message: {{ res.message }})", "    {%- endset %}", "    {{ log(line, info=True) }}", "  {% endfor %}", "  {{ log(\"========== End Summary ==========\", info=True) }}", "  {% endif %}", "{% endmacro %}"]) + "\n" + K("yaml", ["# dbt_project.yml", "on-run-end: \"{{ log_results(results) }}\""]), p: "Rode dbt build --select demo_macros e veja o resumo por nó no terminal. Se já tiver um on-run-end no projeto, junte os dois em uma lista em vez de duplicar a chave." },
        { t: "Commitar a entrega do projeto", cmd: K("bash", ["git add macros tests models/demo_macros.sql packages.yml package-lock.yml dbt_project.yml", "git status", "git commit -m \"Aula 25: macro limpar_texto, dbt_utils e teste da macro\""]), p: "Confira com git status que dbt_packages e target não entraram (por padrão são ignorados; se não forem, acrescente ao .gitignore). Adicione ao README do repositório um parágrafo sobre a macro e a decisão de usar o pacote." }
      ],
      verificar: "dbt compile mostra lower(trim(...)) no SQL compilado, dbt deps criou dbt_packages e package-lock.yml, o modelo demo_macros roda e devolve nome_limpo e chave, o teste assert_limpar_texto passa com a macro certa e falha quando você troca o valor esperado, e o commit não contém dbt_packages, target nem credenciais.",
      limpar: [
        "Se não quiser manter o modelo demo_macros no portfólio, apague o arquivo e o teste, mas guarde a macro limpar_texto e o packages.yml.",
        "Nunca commite profiles.yml com credenciais, arquivos .env, tokens ou o arquivo .duckdb com dados pessoais.",
        "Mantenha dbt_packages e target fora do git."
      ],
      erros: [
        { s: "A coluna sumiu do SQL compilado, sem erro", c: "Argumento de texto da macro sem aspas: o Jinja procurou uma variável inexistente.", r: "Coloque o argumento entre aspas, por exemplo limpar_texto('nome'), e rode dbt compile para conferir." },
        { s: "dbt deps falha ou o dbt reclama de versão do pacote", c: "A faixa de versão do packages.yml ficou com o marcador ou é incompatível com a sua versão do dbt.", r: "Abra a página do pacote no Hub, escolha uma versão compatível com o seu dbt e confira require-dbt-version; rode dbt deps de novo." },
        { s: "O teste singular dá erro de sintaxe", c: "A consulta terminou com ponto e vírgula ou o texto da macro não tem as aspas certas.", r: "Remova o ponto e vírgula final e use aspas duplas por fora e simples por dentro no argumento." },
        { s: "Compilation Error ao rodar o hook on-run-end", c: "A macro log_results não está na pasta macros ou o nome da chave no dbt_project.yml está duplicado.", r: "Confira o nome e a pasta do arquivo e deixe uma única chave on-run-end, em lista se precisar de mais de um hook." }
      ]
    }
  };

  /* ===================== AULA 26 ===================== */
  C.dias[26] = {
    aula: {
      titulo: "Seeds, snapshots e dimensões de variação lenta",
      resumo: "Como carregar CSVs versionados com dbt seed, quando usar e quando evitar, e como registrar o histórico de tabelas mutáveis com snapshots (estratégias timestamp e check, colunas dbt_valid_from e dbt_valid_to), incluindo a diferença entre definição em YAML e bloco Jinja por versão.",
      simples: {
        analogia: "Imagine um caderno de anotações e uma câmera de segurança. O seed é uma folha que você cola no caderno: uma lista curta e estável, como a tabela de países, que todo mundo consulta e que só muda quando alguém edita a folha e registra a alteração. O snapshot é a câmera: a cada intervalo ela tira uma foto da prateleira (uma tabela que muda) e, quando algo mudou, guarda a foto antiga marcando até quando ela valeu e abre uma nova foto marcando desde quando vale. Assim você consegue responder o que estava na prateleira em qualquer dia do passado. Essa ideia tem nome em modelagem: dimensão de variação lenta tipo 2.",
        pontos: [
          "Seed é um CSV da pasta seeds carregado por dbt seed e referenciado com ref().",
          "Seeds servem para dados pequenos e estáticos, não para dados brutos grandes nem sensíveis.",
          "Snapshot registra mudanças de uma tabela mutável, implementando SCD tipo 2.",
          "As estratégias são timestamp (recomendada) e check.",
          "dbt_valid_from e dbt_valid_to dizem de quando até quando cada versão da linha valeu; null em dbt_valid_to indica a linha atual.",
          "Snapshots em YAML valem para dbt v1.9 em diante; o bloco Jinja é o formato legado."
        ],
        paraQueServe: "Guardar listas de apoio no próprio repositório e preservar o histórico de dimensões que mudam, para análises como a versão do cadastro que valia na data do pedido."
      },
      glossario: [
        { t: "Seed", d: "Arquivo CSV na pasta seeds que o dbt seed carrega no banco; fica versionado e é referenciado com ref()." },
        { t: "Snapshot", d: "Recurso do dbt que registra mudanças em uma tabela mutável ao longo do tempo, implementando SCD tipo 2." },
        { t: "SCD tipo 2", d: "Dimensão de variação lenta que guarda cada versão de uma linha com intervalo de validade, sem sobrescrever o passado." },
        { t: "Estratégia timestamp", d: "Snapshot que compara a coluna updated_at com a última execução para saber se a linha mudou." },
        { t: "Estratégia check", d: "Snapshot que compara os valores atuais e históricos de uma lista de colunas (check_cols)." },
        { t: "dbt_valid_from e dbt_valid_to", d: "Colunas do snapshot com o início e o fim da validade da versão; dbt_valid_to é null na linha atual por padrão." },
        { t: "unique_key", d: "Coluna ou expressão que identifica cada registro; o dbt usa para casar linhas, por isso precisa ser realmente única." },
        { t: "hard_deletes", d: "Config do snapshot que define como tratar linhas apagadas da origem: ignore, invalidate ou new_record." }
      ],
      blocos: [
        {
          t: "Seeds: CSVs versionados", facil: "Traduzindo: seed é uma planilha CSV dentro do repositório que o dbt transforma em tabela com um comando.", p: [
            "Seeds são arquivos CSV, tipicamente na pasta seeds, que o dbt seed carrega no banco. Como vivem no repositório, ficam versionados e passam por code review. Depois de carregados, você os referencia em modelos com ref(), como qualquer outro modelo.",
            K("bash", ["dbt seed", "dbt seed --select country_codes"]),
            K("sql", ["select * from {{ ref('country_codes') }}"]),
            "O dbt infere os tipos das colunas a partir do CSV; para fixá-los, use column_types. Para preservar zeros à esquerda (CEP, telefone), mantenha os zeros no arquivo e defina um varchar do tamanho certo. Seeds também podem ter descrição e testes (unique, not_null) no YAML sob a chave seeds."
          ], fonte: ["dbt: seeds", "https://docs.getdbt.com/docs/build/seeds"], dica: "Teste a chave do seed como teste qualquer outro recurso: unique e not_null no YAML."
        },
        {
          t: "Quando usar (e quando não) seeds", facil: "Traduzindo: seed é bom para listas pequenas e estáveis; para dado bruto, grande ou sensível, use outra ferramenta.", p: [
            "A página lista bons usos: mapa de códigos de país para nome, lista de e-mails de teste a excluir das análises, lista de IDs de contas de funcionários. E maus usos: carregar dados brutos exportados em CSV e dados de produção com informação sensível, como dados pessoais ou senhas. Ela também avisa que carregar CSVs grandes com dbt seed não é eficiente.",
            "Para o portfólio, isso tem um efeito prático: nada de dado pessoal real num seed de um repositório público. Use dados fictícios.",
            "Se você muda as colunas de um seed, o dbt seed pode falhar com erro de banco (por exemplo, coluna inexistente). A correção é dbt seed --full-refresh, que apaga a tabela com drop cascade e recria, e por isso pode derrubar objetos que dependem dela. Sem a flag, o dbt apenas trunca e reinsere os dados, preservando os objetos a jusante."
          ], fonte: ["dbt: seeds (quando usar)", "https://docs.getdbt.com/docs/build/seeds"], armadilha: "Usar --full-refresh sem pensar: ele pode derrubar objetos que dependem do seed, como visões consultadas em BI."
        },
        {
          t: "Configurando seeds", facil: "Traduzindo: configs de seed ficam no dbt_project.yml ou no YAML, nunca dentro do CSV.", p: [
            "Seeds só se configuram em YAML. A referência lista as configs específicas: quote_columns (se os nomes de colunas vão entre aspas), column_types (mapa de coluna para tipo) e delimiter (o separador do CSV). Também valem configs gerais como enabled, tags, schema, alias, pre-hook e post-hook. A página da referência não define quote_columns nem delimiter com texto próprio; pelo nome, controlam aspas nos nomes e o separador, mas confira a descrição na versão que você usa.",
            K("yaml", [
              "seeds:",
              "  jaffle_shop:          # você precisa incluir o nome do projeto",
              "    warehouse_locations:",
              "      +column_types:",
              "        zipcode: varchar(5)"
            ]),
            "As configs em cascata funcionam como nos modelos: a de uma subpasta sobrescreve a do projeto, e as propriedades do próprio seed sobrescrevem o dbt_project.yml. Hooks, incluindo on-run-start e on-run-end, também funcionam com seeds."
          ], fonte: ["dbt: configurações de seeds", "https://docs.getdbt.com/reference/seed-configs"], dica: "Quer um tipo de data confiável? Declare a coluna em column_types em vez de confiar na inferência."
        },
        {
          t: "Snapshots e SCD tipo 2", facil: "Traduzindo: snapshot guarda cada versão de uma linha com o período em que ela valeu, em vez de sobrescrever.", p: [
            "Snapshots registram mudanças de uma tabela mutável ao longo do tempo. A página diz que eles implementam dimensões de variação lenta tipo 2 sobre tabelas de origem mutáveis. O exemplo oficial usa uma tabela de pedidos:",
            "Na primeira execução, o dbt cria a tabela do snapshot a partir da sua consulta, com dbt_valid_to nulo. Nas seguintes, atualiza dbt_valid_to das linhas que mudaram e insere as novas versões. Se o pedido 1 estava como pending e passou a shipped, o snapshot guarda duas linhas: a primeira com um dbt_valid_to preenchido, a segunda com dbt_valid_to nulo (a atual).",
            K("bash", ["dbt snapshot", "dbt snapshot --select orders_snapshot"]),
            "Importante: snapshots ignoram a config full_refresh e a flag --full-refresh, preservando o histórico. Por isso a página recomenda tratá-los com cuidado: eles não podem ser reconstruídos se a origem já mudou. A página diz que snapshots foram pensados para rodar entre de hora em hora e diariamente."
          ], tabela: {
            cab: ["id", "status", "updated_at", "dbt_valid_from", "dbt_valid_to"],
            linhas: [
              ["1", "pending", "2024-01-01", "2024-01-01", "2024-01-02"],
              ["1", "shipped", "2024-01-02", "2024-01-02", "null"]
            ]
          }, fonte: ["dbt: snapshots", "https://docs.getdbt.com/docs/build/snapshots"]
        },
        {
          t: "Estratégias timestamp e check", facil: "Traduzindo: timestamp confia numa coluna de data de atualização; check compara os valores de colunas escolhidas.", p: [
            "A estratégia timestamp usa um campo updated_at: se o valor de uma linha for mais recente que a última execução do snapshot, o dbt invalida o registro antigo e grava o novo. A página recomenda essa estratégia porque lida com colunas adicionadas e removidas com mais eficiência que check.",
            "A estratégia check compara uma lista de colunas entre os valores atuais e históricos. check_cols aceita uma lista de colunas ou all, mas a página diz que é melhor enumerar as colunas explicitamente. Se você também definir updated_at com check, ele é usado; se for nulo, o dbt cai para o horário atual.",
            K("yaml", [
              "snapshots:",
              "  - name: orders_snapshot_check",
              "    relation: source('jaffle_shop', 'orders')",
              "    config:",
              "      schema: snapshots",
              "      unique_key: id",
              "      strategy: check",
              "      check_cols:",
              "        - status",
              "        - is_cancelled"
            ]),
            "Duas configs são obrigatórias: strategy e unique_key. updated_at é exigido na timestamp e check_cols na check. A página insiste que a unique_key precisa ser realmente única: adicione um teste de unicidade na origem."
          ], fonte: ["dbt: snapshots (estratégias)", "https://docs.getdbt.com/docs/build/snapshots"], armadilha: "unique_key repetida na origem. O dbt usa a chave para casar linhas; com duplicatas, o histórico sai errado."
        },
        {
          t: "YAML ou bloco Jinja: depende da versão", facil: "Traduzindo: no dbt v1.9 em diante você define snapshots em YAML; o bloco com snapshot e endsnapshot é o formato antigo.", p: [
            "A página de snapshots diz que a definição em YAML se aplica ao dbt v1.9 e posteriores, em arquivos YAML nas pastas snapshots ou models, com as chaves name, relation e config (strategy, unique_key, updated_at, check_cols, schema, database, hard_deletes e outras). Para o dbt v1.8 e anteriores, remete à página de configurações legadas.",
            "A página de referência dos snapshots confirma: a partir do dbt v1.9 e do release track v1 mais recente, definir snapshots em arquivo .sql com bloco de config é o método legado. Para novos snapshots, ela recomenda as configs novas. A documentação usa schema em vez de target_schema nos exemplos YAML, e target_schema se tornou opcional.",
            K("yaml", [
              "snapshots:",
              "  - name: orders_snapshot",
              "    relation: source('jaffle_shop', 'orders')",
              "    config:",
              "      unique_key: id",
              "      strategy: timestamp",
              "      updated_at: updated_at"
            ]),
            "Para migrar um snapshot existente, a página manda fazer backup da tabela antes, adicionar colunas necessárias se usar configs novas (como dbt_valid_to_current), testar cada mudança em dev e verificar o resultado. Ela alerta que usar uma config nova sem migrar os dados antigos pode misturar registros e gerar resultados incorretos. Confira a versão com dbt --version."
          ], fonte: ["dbt: configurações de snapshots", "https://docs.getdbt.com/reference/snapshot-configs"], dica: "Projeto novo em v1.9 ou superior: use YAML. Projeto antigo: leia a página legada antes de migrar."
        },
        {
          t: "Colunas de controle e hard deletes", facil: "Traduzindo: o dbt acrescenta colunas que dizem quando cada versão começou e terminou, e você escolhe o que fazer com linhas apagadas.", p: [
            "O snapshot adiciona colunas de controle. dbt_valid_from é quando a linha passou a valer. dbt_valid_to é quando foi invalidada: null nas linhas atuais, ou o valor de dbt_valid_to_current se você definir um (por exemplo uma data futura, o que simplifica consultas por intervalo). dbt_scd_id é uma chave única gerada para cada linha do snapshot. dbt_updated_at é o timestamp de mudança do registro de origem na hora da inserção.",
            "Com a estratégia timestamp, essas datas vêm da coluna updated_at. Com check, o dbt usa o horário atual, a menos que updated_at esteja configurado.",
            "A config hard_deletes define o tratamento de linhas apagadas da origem: ignore (padrão), invalidate (substitui o antigo invalidate_hard_deletes=true) e new_record. Com new_record, o dbt cria a coluna dbt_is_deleted, com True ou False. A config snapshot_meta_column_names permite renomear as colunas de controle."
          ], fonte: ["dbt: snapshots (colunas de controle)", "https://docs.getdbt.com/docs/build/snapshots"]
        },
        {
          t: "Consultando o histórico", facil: "Traduzindo: para o estado atual, filtre onde dbt_valid_to é nulo; para uma data do passado, filtre pelo intervalo de validade.", p: [
            "O snapshot se referencia como um modelo: select * from {{ ref('orders_snapshot') }}. A página não traz um exemplo de consulta de histórico dedicado; as consultas abaixo são SQL comum construído sobre as colunas documentadas.",
            K("sql", [
              "-- estado atual",
              "select * from {{ ref('clientes_snapshot') }}",
              "where dbt_valid_to is null;",
              "",
              "-- como era em uma data",
              "select * from {{ ref('clientes_snapshot') }}",
              "where dbt_valid_from <= '2026-02-01'",
              "  and (dbt_valid_to > '2026-02-01' or dbt_valid_to is null);"
            ]),
            "Boas práticas da página: coloque os snapshots em um schema separado, para os usuários saberem que são especiais e talvez com permissões diferentes; faça transformações antes, em um modelo efêmero ou de staging referenciado em relation, e não dentro do snapshot; use ref() ou source() em relation. Se um snapshot for o único registro do passado, trate-o como dado precioso: não dá para reconstruí-lo."
          ], fonte: ["dbt: snapshots (histórico e boas práticas)", "https://docs.getdbt.com/docs/build/snapshots"], armadilha: "Esquecer que o ponto e vírgula só serve para você testar a consulta no cliente SQL; em singular tests do dbt, não termine a consulta com ponto e vírgula."
        }
      ],
      exemplo: {
        t: "Cadastro de clientes que muda de plano",
        texto: "Você tem um seed clientes_demo com três clientes e a coluna atualizado_em. Cria o snapshot clientes_snapshot com relation ref('clientes_demo'), strategy timestamp, unique_key id e updated_at atualizado_em. Roda dbt seed e dbt snapshot: três linhas, todas com dbt_valid_to nulo. Depois edita o CSV: o Bruno passa do plano basico para pro, com atualizado_em mais novo, e entra o Diego. Roda dbt seed de novo (o dbt trunca e reinsere) e dbt snapshot. Resultado: o Bruno aparece em duas linhas, a antiga com dbt_valid_to preenchido e a nova com dbt_valid_to nulo; o Diego entra como uma linha nova; Ana e Carla seguem iguais. Consultando com dbt_valid_to nulo você vê o estado atual com quatro clientes; consultando por data, vê o Bruno como basico antes da mudança. Esse antes e depois é a evidência do laboratório."
      },
      prova: [
        "Entrevista: explique SCD tipo 2 e como o dbt snapshot o implementa, citando dbt_valid_from e dbt_valid_to.",
        "No trabalho, alguém pergunta qual era o plano do cliente na data de um pedido: você consulta o snapshot pelo intervalo de validade.",
        "Em code review, você escolhe timestamp em vez de check e justifica pela documentação.",
        "Você decide que uma lista fixa de códigos entra como seed e que dados brutos grandes não entram."
      ],
      explique: "Explique com as próprias palavras o que é um seed e quando usá-lo, o que um snapshot faz, a diferença entre as estratégias timestamp e check e como consultar o estado atual e o passado.",
      checagem: [
        "Quando usar um seed e quando evitar, segundo a documentação?",
        "Qual a diferença entre as estratégias timestamp e check e qual é a recomendada?",
        "O que significam dbt_valid_from e dbt_valid_to e como identificar a linha atual?",
        "Como a documentação diferencia a definição de snapshots em YAML e em bloco Jinja por versão?"
      ]
    },
    fontes: [
      ["dbt: seeds", "https://docs.getdbt.com/docs/build/seeds"],
      ["dbt: configurações de seeds", "https://docs.getdbt.com/reference/seed-configs"],
      ["dbt: snapshots", "https://docs.getdbt.com/docs/build/snapshots"],
      ["dbt: configurações de snapshots", "https://docs.getdbt.com/reference/snapshot-configs"],
      ["dbt: snapshot_meta_column_names", "https://docs.getdbt.com/reference/resource-configs/snapshot_meta_column_names"],
      ["dbt: função this", "https://docs.getdbt.com/reference/dbt-jinja-functions/this"]
    ],
    cartoes: [
      { id: "a26c1", f: "O que é um seed no dbt?", v: "Um CSV na pasta seeds que o comando dbt seed carrega no banco; é versionado e se referencia com ref().", t: "t6" },
      { id: "a26c2", f: "Bons e maus usos de seeds segundo a doc?", v: "Bons: mapas de códigos, listas de exclusão. Maus: dados brutos exportados, dados sensíveis, CSVs grandes.", t: "t6" },
      { id: "a26c3", f: "Como corrigir dbt seed após mudar colunas do CSV?", v: "Rodar dbt seed --full-refresh, que dropa a tabela com cascade e recria; pode derrubar objetos dependentes.", t: "t6" },
      { id: "a26c4", f: "O que um snapshot implementa?", v: "SCD tipo 2 sobre tabelas mutáveis: guarda cada versão da linha com início e fim de validade.", t: "t6" },
      { id: "a26c5", f: "Estratégia timestamp: como funciona e é recomendada?", v: "Usa updated_at: se for mais recente que a última execução, invalida a linha antiga e grava a nova. A doc a recomenda.", t: "t6" },
      { id: "a26c6", f: "Estratégia check: como funciona?", v: "Compara colunas listadas em check_cols entre valores atuais e históricos; a doc recomenda enumerar as colunas em vez de all.", t: "t6" },
      { id: "a26c7", f: "Como achar a linha atual e como ler o passado?", v: "Atual: dbt_valid_to nulo (ou o valor de dbt_valid_to_current). Passado: filtrar a data entre dbt_valid_from e dbt_valid_to.", t: "t6" },
      { id: "a26c8", f: "YAML versus bloco Jinja em snapshots?", v: "YAML vale a partir do dbt v1.9. Para v1.8 e anteriores, vale o bloco legado. Confira a versão com dbt --version.", t: "t6" },
      { id: "a26c9", f: "O que faz hard_deletes?", v: "Define o tratamento de linhas apagadas da origem: ignore (padrão), invalidate ou new_record (cria dbt_is_deleted).", t: "t6" }
    ],
    questoes: [
      { id: "a26q1", s: 3, t: "t6", e: "Sua equipe quer versionar no repositório uma lista de 40 códigos de país com os nomes, usada em vários modelos, e também propõe versionar um CSV de 2 milhões de linhas exportado de um sistema de vendas. Qual a orientação da documentação sobre seeds?", o: ["Os dois são bons usos de seed", "A lista de códigos é bom uso; o CSV grande de dados brutos é um mau uso, pois seed não é eficiente para arquivos grandes", "Nenhum dos dois, pois seeds só aceitam números", "Só o CSV grande, pois seed é para dados brutos", "Os dois, desde que usem dbt seed --full-refresh sempre"], c: [1], x: "A página de seeds cita mapas de códigos e listas pequenas e estáveis como bons usos, e cita carregar dados brutos exportados em CSV e CSVs grandes como maus usos, porque o dbt seed não é eficiente nesses casos. Dizer que os dois são bons ignora a avaliação. Seeds aceitam texto e outros tipos; a limitação não é numérica. O CSV grande é justamente o contraexemplo. A flag full-refresh trata mudança de colunas e não resolve a questão de volume." },
      { id: "a26q2", s: 3, t: "t6", e: "Você mudou as colunas do seed country_codes e o dbt seed falhou com erro de coluna inexistente. Antes de rodar a correção, o que você precisa saber sobre dbt seed --full-refresh?", o: ["Ele apenas trunca a tabela, sem risco para modelos dependentes", "Ele apaga a tabela com drop cascade e recria; isso pode derrubar objetos que dependem dela, como visões usadas em BI", "Ele apaga o arquivo CSV do repositório", "Ele atualiza o dbt_project.yml", "Ele roda também os snapshots"], c: [1], x: "Segundo a página de seeds, normalmente o dbt trunca e reinsere os dados para não derrubar objetos a jusante, mas com --full-refresh ele faz drop cascade e reconstrói a tabela, podendo derrubar objetos que dependem dela. Por isso é preciso cuidado. Não é só um truncate. Também não altera o CSV nem o dbt_project.yml, e o comando dbt seed não executa snapshots." },
      { id: "a26q3", s: 3, t: "t6", e: "Uma tabela de clientes tem a coluna atualizado_em, confiável e sempre preenchida quando a linha muda. Você precisa registrar o histórico de plano com o menor custo e a melhor robustez para colunas que podem ser adicionadas depois. Qual estratégia de snapshot a documentação recomenda?", o: ["check com check_cols igual a all", "timestamp com updated_at apontando para atualizado_em", "Nenhuma: snapshots não suportam colunas de data", "check sem check_cols", "timestamp sem unique_key"], c: [1], x: "A documentação recomenda a estratégia timestamp, que usa o campo updated_at para saber se a linha mudou e lida melhor com adição e remoção de colunas do que check. Com check e all o dbt compararia todas as colunas, o que a página desencoraja em favor de enumerá-las. Check exige check_cols. E unique_key é obrigatória em qualquer estratégia, então a última opção está errada." },
      { id: "a26q4", s: 3, t: "t6", e: "Você precisa responder qual era o plano de cada cliente em 01/02/2026, e o snapshot clientes_snapshot já tem histórico. Qual consulta usa corretamente as colunas de controle do snapshot?", o: ["select * where dbt_valid_to is null", "select * where dbt_valid_from <= '2026-02-01' and (dbt_valid_to > '2026-02-01' or dbt_valid_to is null)", "select * where dbt_scd_id = '2026-02-01'", "select * where dbt_is_deleted = 'True'", "select * order by dbt_updated_at limit 1"], c: [1], x: "Para um ponto no tempo, a versão válida é aquela cujo início é anterior ou igual à data e cujo fim é posterior à data ou nulo (linha ainda atual). Filtrar só por dbt_valid_to nulo traz o estado atual, não o do passado. dbt_scd_id é uma chave gerada por linha, não uma data. dbt_is_deleted só existe com hard_deletes new_record e marca exclusões. Ordenar por dbt_updated_at com limit 1 devolveria uma única linha qualquer." },
      { id: "a26q5", s: 3, t: "t6", e: "(Escolha duas) Você está num projeto em dbt v1.9 ou superior e vai criar um novo snapshot. Quais afirmações estão de acordo com a documentação?", o: ["Pode definir o snapshot em YAML, com name, relation e config", "O bloco snapshot com endsnapshot em arquivo .sql é o método legado para novos snapshots nessas versões", "target_schema continua obrigatório", "Snapshots respeitam a flag --full-refresh e são recriados do zero", "A estratégia timestamp não precisa de updated_at"], c: [0, 1], x: "A página de snapshots mostra a definição em YAML (dbt v1.9 e posteriores) com name, relation e config, e a página de configurações diz que, a partir do v1.9, definir snapshots em arquivo .sql com bloco de config é o método legado. target_schema se tornou opcional. Snapshots ignoram full_refresh e --full-refresh, preservando o histórico. E a estratégia timestamp exige updated_at, justamente a coluna que indica a mudança." },
      { id: "a26q6", s: 3, t: "t6", e: "Em um snapshot com hard_deletes: new_record, uma linha foi apagada da origem. O que a documentação diz que acontece e como se compara com o padrão?", o: ["O padrão é new_record e a linha desaparece do snapshot", "O dbt registra uma nova linha com dbt_is_deleted True; o padrão ignore não registra a exclusão", "O dbt apaga a tabela do snapshot", "O dbt falha sempre em exclusões", "O dbt só avisa e para o build"], c: [1], x: "Com hard_deletes new_record, o dbt registra uma nova linha para o registro apagado e preenche a coluna dbt_is_deleted com True, enquanto linhas existentes têm False. O padrão é ignore, que não trata a exclusão, e invalidate apenas fecha a validade do registro. Dizer que o padrão é new_record inverte a regra. O dbt não apaga o snapshot nem falha ou para o build por causa de exclusões." }
    ],
    lab: {
      t: "Snapshot de um seed que muda: antes e depois",
      custo: "gratuito (local, com DuckDB)",
      tempo: "45 a 60 min",
      porque: "Fecha o projeto Incremental, snapshots e macros: mostra, com evidência, o histórico SCD tipo 2 de uma tabela que muda.",
      antes: "Você precisa do projeto dbt-portfolio com DuckDB funcionando e dbt v1.9 ou superior (confira com dbt --version; em versão anterior o snapshot seria em bloco Jinja, formato legado). Os passos foram conferidos contra a documentação e NÃO foram executados: ajuste nomes de projeto e pastas. A página de instalação atual descreve o dbt v2 e o README do dbt-duckdb mostra o caminho v1 (pip3 install dbt-duckdb): não misture os dois no mesmo ambiente e confira com dbt --version. Usamos um seed como origem porque é o jeito mais simples de ter uma tabela que muda localmente; na prática, a origem seria uma tabela de um sistema. Na tela você verá o dbt contar as linhas do seed e do snapshot. Use dados fictícios: este repositório é público.",
      passos: [
        { t: "Criar o seed com dados fictícios", cmd: K("text", ["# seeds/clientes_demo.csv", "id,nome,plano,atualizado_em", "1,Ana,basico,2026-01-10 08:00:00", "2,Bruno,basico,2026-01-10 08:00:00", "3,Carla,pro,2026-01-10 08:00:00"]) + "\n" + K("yaml", ["# dbt_project.yml", "seeds:", "  dbt_portfolio:      # nome do SEU projeto", "    clientes_demo:", "      +column_types:", "        atualizado_em: timestamp"]), p: "Fixe o tipo da coluna de data com column_types, como a página de seeds recomenda. Rode dbt seed --select clientes_demo." },
        { t: "Definir o snapshot em YAML", cmd: K("yaml", ["# snapshots/clientes_snapshot.yml", "snapshots:", "  - name: clientes_snapshot", "    relation: ref('clientes_demo')", "    config:", "      schema: snapshots", "      unique_key: id", "      strategy: timestamp", "      updated_at: atualizado_em"]), p: "Formato YAML (dbt v1.9 em diante). Rode dbt snapshot. Todas as linhas devem entrar com dbt_valid_to nulo." },
        { t: "Criar uma macro para mostrar o histórico", cmd: K("sql", ["-- macros/mostrar_historico.sql", "{% macro mostrar_historico() %}", "  {% if execute %}", "    {% set r = run_query('select * from ' ~ ref('clientes_snapshot') ~ ' order by id, dbt_valid_from') %}", "    {{ log(r.print_table(), info=True) }}", "  {% endif %}", "{% endmacro %}"]) + "\n" + K("bash", ["dbt run-operation mostrar_historico"]), p: "A macro usa run_query e log (print_table aparece no exemplo da página de run_query) e roda com run-operation. A página de run-operation mostra uma macro com ref() chamada por run-operation (nota marcada como dbt v1.12 ou superior); se o ref() falhar na sua versão, escreva o nome da tabela do snapshot em texto. Guarde a saída do terminal como o ANTES. Se preferir, consulte o snapshot em qualquer cliente SQL de DuckDB." },
        { t: "Alterar a origem", cmd: K("text", ["# seeds/clientes_demo.csv (depois da edição)", "id,nome,plano,atualizado_em", "1,Ana,basico,2026-01-10 08:00:00", "2,Bruno,pro,2026-02-15 09:30:00", "3,Carla,pro,2026-01-10 08:00:00", "4,Diego,basico,2026-02-15 09:30:00"]), p: "Mude o plano do Bruno para pro com um atualizado_em mais novo e acrescente o Diego. O atualizado_em precisa mudar, porque a estratégia timestamp só enxerga mudança por essa coluna." },
        { t: "Recarregar e rodar o snapshot de novo", cmd: K("bash", ["dbt seed --select clientes_demo", "dbt snapshot", "dbt run-operation mostrar_historico"]), p: "O dbt seed trunca e reinsere os dados, sem derrubar objetos dependentes. A saída deve mostrar o Bruno em duas linhas e o Diego como linha nova. Guarde como o DEPOIS." },
        { t: "Consultar estado atual e passado", cmd: K("sql", ["-- atual", "select * from {{ ref('clientes_snapshot') }} where dbt_valid_to is null", "", "-- em 2026-02-01", "select * from {{ ref('clientes_snapshot') }}", "where dbt_valid_from <= '2026-02-01'", "  and (dbt_valid_to > '2026-02-01' or dbt_valid_to is null)"]), p: "Coloque as duas consultas em um modelo (por exemplo models/clientes_atual.sql, uma de cada) ou rode no cliente SQL. Registre no README do repositório a tabela antes e depois e a explicação em duas frases." },
        { t: "Commitar", cmd: K("bash", ["git add seeds snapshots macros dbt_project.yml README.md", "git commit -m \"Aula 26: snapshot SCD2 de clientes_demo com antes e depois\""]), p: "Não commite o arquivo .duckdb nem profiles.yml com credenciais." }
      ],
      verificar: "Depois da segunda execução, a consulta do snapshot mostra o Bruno em duas linhas (basico com dbt_valid_to preenchido, pro com dbt_valid_to nulo), o Diego em uma linha nova com dbt_valid_to nulo, Ana e Carla inalteradas, e o README tem o antes e o depois.",
      limpar: [
        "Guarde o seed, o YAML do snapshot, a macro e o README com a evidência; os dados são fictícios.",
        "Nunca commite profiles.yml com credenciais, tokens, dados pessoais reais ou o banco .duckdb.",
        "Se quiser refazer o laboratório do zero, apague as tabelas no DuckDB; lembre que snapshots não são reconstruíveis e ignoram --full-refresh."
      ],
      erros: [
        { s: "O Bruno não gerou nova linha no snapshot", c: "O atualizado_em não ficou mais recente que a execução anterior ou o dbt seed não foi rodado depois da edição.", r: "Confirme a data nova no CSV, rode dbt seed e depois dbt snapshot." },
        { s: "Erro de parsing ao carregar o snapshot em YAML", c: "dbt anterior à v1.9, que não entende a definição em YAML, ou indentação errada.", r: "Confira dbt --version e a indentação; em versão anterior, use o formato legado em bloco Jinja conforme a página de configurações legadas." },
        { s: "dbt seed falha com coluna inexistente após editar o CSV", c: "Você mudou as colunas do seed, não só os valores.", r: "Se mudou colunas, rode dbt seed --full-refresh sabendo que ele dropa a tabela com cascade." },
        { s: "Snapshot com linhas duplicadas para o mesmo id", c: "unique_key repetida na origem.", r: "Garanta ids únicos no CSV e adicione teste unique ao seed." }
      ]
    }
  };

  /* ===================== AULA 27 ===================== */
  C.dias[27] = {
    aula: {
      titulo: "Ambientes, CI/CD e execução em produção",
      resumo: "Como separar dev e prod com targets em profiles.yml, usar variáveis de ambiente e schemas por desenvolvedor, montar CI no GitHub Actions com dbt build e SQLFluff, entender state:modified+ e defer no dbt Core e o que é recurso da plataforma dbt.",
      simples: {
        analogia: "Pense numa padaria que testa receitas novas. Existe a bancada de testes de cada padeiro, onde ele pode errar à vontade, e existe a vitrine, que os clientes veem. Ninguém testa uma receita nova direto na vitrine. Antes de uma receita ir para a vitrine, um fiscal confere o rótulo e prova uma amostra, e só então ela passa. Para não reassar tudo a cada teste, o fiscal só prova as receitas que mudaram e as que dependem delas, e pega emprestados os ingredientes já prontos da vitrine. Os targets são a bancada e a vitrine, o CI é o fiscal, state:modified+ é provar só o que mudou, defer é pegar emprestado da vitrine, e os segredos são as chaves da despensa, que nunca ficam pregadas na porta.",
        pontos: [
          "Targets em profiles.yml separam dev e prod; --target escolhe qual usar.",
          "Credenciais vão em variáveis de ambiente (env_var), nunca no repositório.",
          "Cada desenvolvedor tem seu schema, e o custom schema se soma ao schema do target.",
          "CI no GitHub Actions: instalar, rodar lint e dbt build a cada pull request, em um banco descartável.",
          "state:modified+ e defer são recursos do dbt Core que dependem de um manifest de uma execução anterior.",
          "CI jobs automáticos, schema temporário por PR e agendador pertencem à plataforma dbt."
        ],
        paraQueServe: "Rodar o projeto em produção com segurança: cada mudança é testada em um ambiente isolado antes de chegar à produção, sem expor credenciais."
      },
      glossario: [
        { t: "Target", d: "Conjunto de configurações de conexão dentro de um profile (por exemplo dev ou prod), escolhido por --target." },
        { t: "profiles.yml", d: "Arquivo que guarda perfis de conexão e targets; deve ficar fora do repositório quando tiver credenciais." },
        { t: "env_var", d: "Função Jinja que lê variáveis de ambiente do sistema; dá erro de compilação se a variável não existir e não houver padrão." },
        { t: "DBT_ENV_SECRET", d: "Prefixo de variável de ambiente tratada como segredo: só vale em profiles.yml e packages.yml e é mascarada nos logs." },
        { t: "state:modified+", d: "Seleção de nós novos ou modificados em relação a um manifest anterior, mais tudo o que depende deles." },
        { t: "defer", d: "Faz o dbt resolver referências a nós não selecionados e não existentes no ambiente atual usando o manifest de outro ambiente." },
        { t: "CI (integração contínua)", d: "Automação que testa cada mudança de código, aqui a cada pull request, antes de ir para a produção." },
        { t: "dbt platform", d: "Produto gerenciado do dbt com ambientes, agendador de jobs e CI automático; difere do dbt Core que roda local." }
      ],
      blocos: [
        {
          t: "Targets e profiles.yml", facil: "Traduzindo: profiles.yml diz ao dbt onde se conectar e target escolhe qual conexão (dev ou prod) usar.", p: [
            "O profiles.yml guarda os detalhes de conexão, as definições de target e o target padrão. O campo profile do dbt_project.yml aponta para um nome de profile definido nesse arquivo. Cada profile tem target (o padrão) e outputs (um por ambiente). A página não mostra um bloco completo de prod, apenas diz em texto que você pode ter um target prod que cria objetos no schema de produção, e que a maioria dos usuários locais só tem dev.",
            K("yaml", [
              "my_project_profile:",
              "  target: dev",
              "  outputs:",
              "    dev:",
              "      type: adapter_type",
              "      schema: dev_schema",
              "      threads: 4"
            ]),
            "Para trocar de target, use a flag em qualquer comando: dbt build --target prod. Onde fica o profiles.yml muda por versão: no dbt v2, a ordem é --profiles-dir, depois a raiz do projeto, depois ~/.dbt/; no dbt v1.11 e posteriores, acrescentam-se as variáveis DBT_ENGINE_PROFILES_DIR e DBT_PROFILES_DIR e o diretório atual antes do ~/.dbt/. Confira com dbt --version."
          ], fonte: ["dbt: profiles.yml e targets", "https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml"], dica: "Em CI, use --profiles-dir para apontar para um perfil descartável e sem segredos."
        },
        {
          t: "Variáveis de ambiente e segredos", facil: "Traduzindo: credenciais ficam no ambiente do computador ou do servidor, e o YAML só aponta para o nome da variável.", p: [
            "env_var funciona em profiles.yml, dbt_project.yml, YAMLs de propriedades e modelos. Se a variável não existir quando o dbt for chamado, há erro de compilação, a menos que você passe um segundo argumento como valor padrão. Cite a string Jinja inteira em YAML, para o parser não se confundir com as chaves. Variáveis de ambiente são sempre texto: converta com int, as_number ou as_bool.",
            K("yaml", [
              "outputs:",
              "  prod:",
              "    type: postgres",
              "    user: \"{{ env_var('DBT_USER') }}\"",
              "    password: \"{{ env_var('DBT_PASSWORD') }}\""
            ]),
            "Variáveis com o prefixo DBT_ENV_SECRET são disponíveis em profiles.yml e packages.yml via env_var, proibidas em outros lugares (para o segredo não ir parar no banco ou nos artefatos) e mascaradas nos logs com asteriscos. O uso principal é token de git para pacotes privados.",
            "A partir do dbt v1.12, ao rodar localmente, o dbt carrega variáveis de um arquivo .env na pasta atual; variáveis do shell têm precedência, e a página manda pôr .env no .gitignore."
          ], fonte: ["dbt: função env_var", "https://docs.getdbt.com/reference/dbt-jinja-functions/env_var"], armadilha: "Commitar o .env ou um profiles.yml com senha. Coloque ambos no .gitignore antes do primeiro commit."
        },
        {
          t: "Schemas por desenvolvedor", facil: "Traduzindo: por padrão cada pessoa constrói no próprio schema para ninguém sobrescrever o trabalho dos outros.", p: [
            "Por padrão, os modelos são construídos no schema do target. Quando você define um custom schema (config schema), o dbt o acrescenta ao do target: schema do target mais underline mais o custom. Pela tabela da página, alice_dev com marketing vira alice_dev_marketing, e analytics_prod com marketing vira analytics_prod_marketing. Assim cada pessoa tem o próprio conjunto de objetos.",
            "A macro padrão generate_schema_name usa target.schema. A página adverte: não troque por apenas o custom schema, pois isso faz desenvolvedores sobrescreverem os modelos uns dos outros. A alternativa recomendada é a macro embutida generate_schema_name_for_env, que usa o custom schema em produção e o schema do target nos outros ambientes:",
            K("sql", [
              "-- macros/generate_schema_name.sql",
              "{% macro generate_schema_name(custom_schema_name, node) -%}",
              "    {{ generate_schema_name_for_env(custom_schema_name, node) }}",
              "{%- endmacro %}"
            ]),
            "Com essa macro, o target do job de produção precisa se chamar prod. Macros generate_schema_name de pacotes instalados são ignoradas."
          ], fonte: ["dbt: schemas personalizados", "https://docs.getdbt.com/docs/build/custom-schemas"], dica: "Você pode ler target.name em modelos para limitar dados em dev, como na aula 25."
        },
        {
          t: "CI no GitHub Actions", facil: "Traduzindo: a cada pull request, uma máquina descartável instala o dbt, confere o estilo do SQL e roda dbt build.", p: [
            "O GitHub Actions executa workflows definidos em YAML. O gatilho on: pull_request dispara em eventos de pull request. Cada job roda em um runner definido por runs-on; os steps usam uses (para ações) e run (para comandos). Variáveis de env podem ser definidas no workflow, no job ou no passo. A página da ação setup-python mostra, com a versão v7, o uso de actions/checkout e actions/setup-python, com cache: 'pip' opcional.",
            "Custo: a página de cobrança diz que o uso de runners padrão hospedados pelo GitHub é gratuito em repositórios públicos. Em repositórios privados, o uso vem de um valor mensal incluído no plano, expresso em dinheiro, e, sem forma de pagamento, o uso é bloqueado ao esgotar. Por isso, a trilha usa repositório público.",
            "Segredos: o GitHub retém os segredos de workflows disparados de forks (exceto o GITHUB_TOKEN). Como o CI do portfólio roda em DuckDB descartável, ele nem precisa de segredos. Confira as versões atuais das ações nas páginas delas antes de fixar."
          ], fonte: ["GitHub Docs: sintaxe de workflows", "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"], dica: "O CI do portfólio deve usar um perfil próprio com DuckDB e nenhum segredo: assim ele não toca dados de produção."
        },
        {
          t: "SQLFluff no CI", facil: "Traduzindo: SQLFluff é um corretor de estilo para SQL; no CI ele reprova SQL fora do padrão.", p: [
            "O SQLFluff se instala com pip install sqlfluff e roda com sqlfluff lint e a opção --dialect. A página de início mostra --dialect ansi, e a lista de dialetos tem um chamado duckdb (herda de postgres).",
            "Para projetos dbt, o templater padrão é jinja. O templater dbt é mais fiel (a maioria das macros funciona), mas mais lento. A página recomenda usar dbt em CI/CD, onde a exatidão importa mais que a velocidade, e jinja em IDE ou git hook. Instalação: o adaptador do seu banco e o pacote do templater, como em pip install dbt-postgres sqlfluff-templater-dbt. Configuração:",
            K("ini", [
              "[sqlfluff]",
              "templater = dbt",
              "dialect = duckdb",
              "encoding = utf-8",
              "",
              "[sqlfluff:templater:dbt]",
              "project_dir = .",
              "profiles_dir = ci",
              "profile = dbt_portfolio",
              "target = ci"
            ]),
            "No .sqlfluffignore, ignore target/, macros/ e dbt_packages/. Cuidado: com dbt_skip_compilation_error em True (padrão), erros de compilação ficam escondidos. A página não publica matriz de compatibilidade de versões: confira se o templater funciona com a sua versão do dbt."
          ], fonte: ["SQLFluff: templater dbt", "https://docs.sqlfluff.com/en/stable/configuration/templating/dbt.html"], armadilha: "Deixar dbt_skip_compilation_error em True e achar que o lint passou: um erro de compilação pode estar escondido."
        },
        {
          t: "state:modified+ e defer no dbt Core", facil: "Traduzindo: state:modified+ seleciona só o que mudou e o que depende disso; defer pega emprestado do outro ambiente o que você não construiu.", p: [
            "O método state compara o projeto atual com um manifest anterior, indicado por --state (ou, no dbt v1.11 e posteriores, DBT_ENGINE_STATE). state:new são nós sem equivalente no manifest; state:modified são os novos mais as mudanças em nós existentes; state:unmodified são os existentes sem mudança. Exemplo da página: dbt run --select \"state:modified\" --state path/to/artifacts. O sinal + depois de um nó inclui o próprio nó e todos os descendentes (página de operadores de grafo); por isso state:modified+ seleciona o que mudou e o que depende disso. A página de CI da plataforma descreve o mesmo desenho: construir só o alterado mais os dependentes.",
            "Defer exige --defer e --state (a partir do dbt v1.11 existem também as variáveis DBT_ENGINE_DEFER e DBT_ENGINE_STATE). Com ele, o dbt resolve ref usando o manifest apenas se o nó não está entre os selecionados e não existe no banco de destino (a menos que use --favor-state). Exemplo: dbt run --select \"model_b\" --defer --state prod-run-artifacts compila para prod.model_a. Cuidado com ambientes misturados: testes como relationships podem cruzar dev e produção.",
            "Aviso da página: evite pôr --state e --target-path no mesmo caminho, pois o manifest pode ser sobrescrito. Mova o manifest.json para uma pasta dedicada, como state/. A página de visão geral da seleção por estado diz que state e defer dependem de modelos idempotentes."
          ], fonte: ["dbt: seleção por estado (método state)", "https://docs.getdbt.com/reference/node-selection/methods"], dica: "Para praticar sem produção: gere o manifest de main, copie para state/, edite um modelo e rode dbt ls --select \"state:modified\" --state state."
        },
        {
          t: "dbt Core versus plataforma dbt", facil: "Traduzindo: as flags de linha de comando são do Core; o CI automático por PR e o agendador de jobs são do produto gerenciado.", p: [
            "Do dbt Core (linha de comando): --target, profiles.yml, env_var, --select, --state, state:modified e --defer. Funcionam no seu computador ou em qualquer CI que você montar.",
            "Da plataforma dbt, segundo a página de integração contínua: jobs de CI disparados por notificação do provedor Git, build apenas dos ativos modificados e seus dependentes em um schema temporário por PR (nome no padrão dbt_cloud_pr_<job_id>_<pr_id>), exclusão do schema ao fechar ou mesclar o PR, cancelamento inteligente de execuções antigas na mesma PR e SQL linting integrado (SQLFluff na v1, dbt lint na v2). A página de deploy jobs descreve o agendador da plataforma, com cron de cinco campos em UTC, e avisa que state:modified num job agendado pode terminar sem construir nenhum modelo se nada mudou, sendo melhor reservá-lo a jobs de CI e merge.",
            "A página de CI também diz que, fora da plataforma, existem a API administrativa e o guia de pipelines personalizados. Esse guia é marcado como dbt platform e usa a API para disparar jobs: não é um CI em Core puro. Por isso, o CI do portfólio é um workflow próprio no GitHub Actions."
          ], fonte: ["dbt: integração contínua", "https://docs.getdbt.com/docs/deploy/continuous-integration"], armadilha: "Copiar o guia de pipelines customizados esperando um CI de Core. Ele dispara jobs da plataforma pela API e exige conta e token."
        },
        {
          t: "Agendamento e segredos fora da plataforma", facil: "Traduzindo: sem a plataforma, quem agenda é o seu orquestrador, como um workflow agendado do GitHub, e os segredos ficam no cofre dele.", p: [
            "Um workflow do GitHub Actions pode ser agendado com on: schedule e cron de cinco campos (minuto, hora, dia do mês, mês, dia da semana). Roda em UTC por padrão, com campo opcional timezone, o intervalo mínimo é de cinco minutos e execuções agendadas rodam no último commit da branch padrão.",
            "Outros orquestradores, como o Airflow, também podem chamar o dbt; neste curso apenas mencionamos essa opção, sem detalhar.",
            "Para segredos no GitHub: Settings, Secrets and variables, Actions, New repository secret (ou gh secret set NOME). No workflow, ${{ secrets.NOME }} em env ou with. Não use segredos direto em if. Segredos não passam para workflows de forks. Boas práticas da página: evitar segredos na linha de comando, não imprimir segredos e preferir OpenID Connect para acesso a nuvem.",
            "Para produção real no seu portfólio, o caminho é manter produção fora do escopo: o CI roda em DuckDB, e qualquer execução em Databricks ou Snowflake é manual e opcional, com avisos de custo."
          ], fonte: ["GitHub Docs: segredos em Actions", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions"], dica: "Rodar um dbt build agendado em produção fora da plataforma exige credenciais; para o portfólio, evite: o valor está no CI com PR."
        }
      ],
      exemplo: {
        t: "Do commit ao merge sem tocar produção",
        texto: "A Eloabe abre uma pull request que muda o modelo fct_pedidos. O workflow do GitHub Actions dispara em pull_request, instala dbt-duckdb e SQLFluff, roda o lint e depois dbt build com um perfil de CI que aponta para um arquivo DuckDB criado dentro do runner. O lint acusa uma vírgula fora do padrão; ela corrige e dá push; o workflow roda de novo e passa. Nenhuma credencial entrou no repositório, porque o perfil de CI não usa nenhuma. Localmente, ela usa o target dev com schema próprio, de modo que o schema dela não conflita com o de outra pessoa. Em um projeto com produção real, o job de CI geraria um schema por PR e o dbt rodaria apenas state:modified+ com defer para a produção; na plataforma dbt isso é um recurso nativo, e no Core exige um manifest de referência guardado em algum lugar."
      },
      prova: [
        "Entrevista: explique a diferença entre targets dev e prod e como você evita expor credenciais.",
        "No trabalho, uma PR precisa ser testada sem tocar produção: você descreve CI com banco descartável ou schema por PR.",
        "Alguém pergunta o que é slim CI: você explica state:modified+ com defer e diz o que é do Core e o que é da plataforma.",
        "Em code review, você pergunta por que o segredo está num arquivo versionado."
      ],
      explique: "Explique com as próprias palavras como dev e prod se separam com targets, como as credenciais ficam fora do repositório, o que state:modified+ e defer fazem e quais partes do CI são do dbt Core e quais são da plataforma dbt.",
      checagem: [
        "Como escolher o target prod em um comando e onde o dbt procura o profiles.yml?",
        "Por que o custom schema se soma ao schema do target e o que a documentação recomenda para produção?",
        "O que state:modified+ seleciona e o que o defer exige?",
        "Quais recursos de CI são da plataforma dbt e não do Core?"
      ]
    },
    fontes: [
      ["dbt: profiles.yml e targets", "https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml"],
      ["dbt: função env_var", "https://docs.getdbt.com/reference/dbt-jinja-functions/env_var"],
      ["dbt: schemas personalizados", "https://docs.getdbt.com/docs/build/custom-schemas"],
      ["dbt: seleção por estado (método state)", "https://docs.getdbt.com/reference/node-selection/methods"],
      ["dbt: visão geral da seleção por estado", "https://docs.getdbt.com/reference/node-selection/state-selection"],
      ["dbt: defer", "https://docs.getdbt.com/reference/node-selection/defer"],
      ["dbt: operadores de grafo", "https://docs.getdbt.com/reference/node-selection/graph-operators"],
      ["dbt: integração contínua", "https://docs.getdbt.com/docs/deploy/continuous-integration"],
      ["dbt: jobs de deploy", "https://docs.getdbt.com/docs/deploy/deploy-jobs"],
      ["dbt: guia de pipelines customizados", "https://docs.getdbt.com/guides/custom-cicd-pipelines"],
      ["dbt: variável target", "https://docs.getdbt.com/reference/dbt-jinja-functions/target"],
      ["GitHub Docs: sintaxe de workflows", "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"],
      ["GitHub Docs: cobrança do Actions", "https://docs.github.com/en/billing/concepts/product-billing/github-actions"],
      ["GitHub Docs: segredos em Actions", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions"],
      ["SQLFluff: templater dbt", "https://docs.sqlfluff.com/en/stable/configuration/templating/dbt.html"],
      ["SQLFluff: primeiros passos", "https://docs.sqlfluff.com/en/stable/gettingstarted.html"],
      ["SQLFluff: dialetos", "https://docs.sqlfluff.com/en/stable/reference/dialects.html"],
      ["Ação setup-python", "https://github.com/actions/setup-python"],
      ["Ação checkout", "https://github.com/actions/checkout"],
      ["Adaptador dbt-duckdb", "https://github.com/duckdb/dbt-duckdb"]
    ],
    cartoes: [
      { id: "a27c1", f: "Como escolher outro target num comando dbt?", v: "Com a flag --target, por exemplo dbt build --target prod; o target padrão vem da chave target do profile.", t: "t7" },
      { id: "a27c2", f: "Como evitar credenciais no repositório?", v: "Usar env_var no profiles.yml, manter profiles.yml e .env fora do git e, para segredos, o prefixo DBT_ENV_SECRET.", t: "t7" },
      { id: "a27c3", f: "O que faz o prefixo DBT_ENV_SECRET?", v: "A variável só vale em profiles.yml e packages.yml e é mascarada nos logs com asteriscos.", t: "t7" },
      { id: "a27c4", f: "Como o custom schema se combina com o do target?", v: "Por padrão vira schema_do_target mais underline mais custom: alice_dev com marketing dá alice_dev_marketing.", t: "t7" },
      { id: "a27c5", f: "Qual macro a doc recomenda para usar custom schema só em produção?", v: "generate_schema_name_for_env, chamada dentro de generate_schema_name; o target de produção deve se chamar prod.", t: "t7" },
      { id: "a27c6", f: "O que state:modified seleciona?", v: "Nós novos mais mudanças em nós existentes em relação ao manifest passado em --state; com + inclui os descendentes.", t: "t7" },
      { id: "a27c7", f: "O que defer exige e o que faz?", v: "Exige --defer e --state; resolve refs de nós não selecionados e ausentes no destino usando o manifest.", t: "t7" },
      { id: "a27c8", f: "Quais recursos de CI são da plataforma dbt?", v: "Jobs de CI por PR, schema temporário por PR, cancelamento inteligente, SQL linting integrado e o agendador de jobs.", t: "t7" },
      { id: "a27c9", f: "Actions é gratuito em que condições?", v: "Runners padrão hospedados pelo GitHub são gratuitos em repositórios públicos; em privados há valor incluído e depois bloqueio sem pagamento.", t: "t7" }
    ],
    questoes: [
      { id: "a27q1", s: 3, t: "t7", e: "Seu profiles.yml tem os targets dev e prod. Você roda dbt build sem flags e o dbt usa dev. Para rodar o build apontando para produção, sem editar o arquivo, o que você faz?", o: ["Edita o dbt_project.yml trocando dev por prod", "Roda dbt build --target prod, usando o target definido no profile", "Renomeia o schema do dev para prod", "Usa --vars target=prod", "Cria um novo seed chamado prod"], c: [1], x: "A flag --target funciona com qualquer comando e escolhe o target definido em outputs do profile, sobrescrevendo o target padrão do arquivo. Editar o dbt_project.yml não troca o target, que vem do profiles.yml. Renomear schema não muda a conexão. --vars define variáveis de projeto, não o target. Seeds carregam CSVs e não escolhem ambiente." },
      { id: "a27q2", s: 3, t: "t7", e: "Um colega commitou um profiles.yml com a senha do banco em texto simples num repositório público. Qual prática da documentação evita isso daqui para frente?", o: ["Guardar a senha em um comentário no modelo", "Usar env_var no profiles.yml, definir a variável no ambiente (ou em segredos do CI) e manter o arquivo com credenciais fora do git", "Colocar a senha em um seed", "Passar a senha em uma var no dbt_project.yml", "Codificar a senha em base64 e commitar"], c: [1], x: "A página de env_var recomenda ler credenciais com env_var no profiles.yml, com a string Jinja inteira entre aspas, e prefixar com DBT_ENV_SECRET quando for segredo, para ser mascarado nos logs. A página de segredos do GitHub também lembra que base64 não é criptografia. Seeds e comentários são versionados e públicos. vars no dbt_project.yml também são versionadas e, além disso, a senha deveria vir de segredo e não de arquivo do projeto." },
      { id: "a27q3", s: 3, t: "t7", e: "Alice e Bob desenvolvem no mesmo banco, cada um com seu target dev. Um modelo tem a config schema marketing. Pelo comportamento padrão do dbt, onde cada um constrói e qual risco a doc cita ao trocar a macro generate_schema_name?", o: ["Os dois constroem em marketing, sem risco", "Alice em alice_dev_marketing e Bob em bob_dev_marketing; ao usar só o custom schema, devs sobrescreveriam os modelos uns dos outros", "Os dois constroem em main", "Alice constrói em marketing_alice, sem risco algum", "Nenhum constrói, pois custom schema é só para produção"], c: [1], x: "O comportamento padrão soma o schema do target ao custom schema, então cada pessoa tem o seu conjunto de objetos. A página avisa que remover o schema do target faz os desenvolvedores sobrescreverem os modelos uns dos outros, e recomenda generate_schema_name_for_env. Dizer que ambos constroem em marketing é justamente o cenário perigoso. O nome marketing_alice inverte a ordem do padrão. Custom schema vale em qualquer ambiente, não só produção." },
      { id: "a27q4", s: 3, t: "t7", e: "No CI de uma PR você quer construir só os modelos alterados e seus dependentes, resolvendo os pais não construídos a partir da produção, usando dbt Core. Qual combinação de opções reflete as páginas de seleção por estado e defer?", o: ["--select state:modified+ --defer --state caminho-do-manifest-de-prod", "--select state:unmodified --full-refresh", "--vars state=modified", "--select all --target prod", "--empty somente"], c: [0], x: "A seleção por estado depende de --state apontando para o manifest de uma execução anterior. state:modified inclui nós novos e alterados e o sinal + acrescenta os dependentes. O defer, com --defer e --state, resolve refs de nós não selecionados e ausentes no destino usando o manifest. Selecionar unmodified faz o oposto do desejado. --vars não faz seleção. Apontar para prod construiria tudo em produção, e --empty apenas limita linhas lidas, sem selecionar nada." },
      { id: "a27q5", s: 3, t: "t7", e: "(Escolha duas) Você está montando CI para o repositório de portfólio. Quais afirmações estão de acordo com a documentação?", o: ["Runners padrão do GitHub Actions são gratuitos em repositórios públicos", "Um workflow com on: pull_request pode instalar dbt-duckdb e rodar dbt build em um runner descartável sem segredos", "O schema temporário por PR com nome dbt_cloud_pr é criado pelo dbt Core sem a plataforma", "Segredos do repositório são entregues a workflows disparados de forks", "SQLFluff com templater dbt é sempre mais rápido que o templater jinja"], c: [0, 1], x: "A página de cobrança diz que runners padrão são gratuitos em repositórios públicos, e a página de sintaxe de workflows mostra on: pull_request com jobs e steps, o que permite instalar o adaptador e rodar o build em um runner descartável. O schema dbt_cloud_pr é um comportamento dos jobs de CI da plataforma, não do Core. Segredos são retidos de forks, exceto o GITHUB_TOKEN. E a página do SQLFluff diz que o templater dbt é mais lento, recomendado para CI pela exatidão." },
      { id: "a27q6", s: 3, t: "t7", e: "Um colega quer reaproveitar o guia de pipelines customizados do dbt para um CI de Core puro, sem conta na plataforma. O que a documentação indica sobre esse guia e sobre o CI nativo?", o: ["O guia roda dbt build direto no runner, sem token", "O guia é marcado para a plataforma dbt e dispara jobs pela API com token de serviço; o CI automático por PR com schema temporário também é da plataforma", "O guia só funciona em Airflow", "O CI nativo é gratuito para sempre no Core", "O guia exige o templater jinja"], c: [1], x: "A página do guia é marcada como dbt platform: o workflow chama a API para disparar um job e monitorar o status, e exige um token de serviço guardado como segredo. A página de CI descreve os jobs automáticos por PR, com schema temporário, como recursos da plataforma. Por isso um CI de Core puro, como o do portfólio, é um workflow seu que instala o adaptador e roda dbt build. O guia não roda dbt build direto no runner e não é exclusivo do Airflow. Nada diz que o CI nativo é gratuito no Core, e o templater do SQLFluff não é o tema do guia." },
      { id: "a27q7", s: 3, t: "t7", e: "Seu workflow de dbt build agendado no GitHub Actions deveria rodar às 06:00 de Brasília, mas dispara em outro horário e nunca roda em branches de feature. Qual a explicação segundo a documentação do GitHub?", o: ["Workflows agendados usam UTC por padrão, com campo opcional timezone, e rodam no último commit da branch padrão", "O cron do GitHub só aceita dias úteis", "O Actions não aceita cron", "O schedule roda em todas as branches ao mesmo tempo", "O cron mínimo é de um dia"], c: [0], x: "A página de sintaxe diz que o cron usa cinco campos, roda em UTC por padrão (com um campo timezone opcional) e que workflows agendados rodam no último commit da branch padrão, o que explica o horário e a ausência em branches de feature. O cron aceita qualquer dia da semana, o intervalo mínimo é de cinco minutos, e não roda em todas as branches." }
    ],
    lab: {
      t: "Workflow de CI com dbt-duckdb, SQLFluff e dbt build em cada PR",
      custo: "gratuito (repositório público e runners padrão do GitHub, conforme a página de cobrança; nenhum banco pago)",
      tempo: "60 a 90 min",
      porque: "É a entrega central do projeto dbt com CI: cada mudança é lintada e testada em um banco descartável antes do merge.",
      antes: "Você precisa do repositório público dbt-portfolio no GitHub, com o projeto dbt e DuckDB funcionando. Os passos foram conferidos contra a documentação e NÃO foram executados: erros de versão são possíveis, em especial a compatibilidade entre dbt-duckdb, a sua versão do Python e o templater do SQLFluff, que a documentação não tabula. Na tela, o GitHub mostrará um check por pull request com os passos em verde ou vermelho. Não use dados pessoais nem credenciais: o perfil de CI é um arquivo DuckDB local ao runner. Versões: este lab instala dbt-duckdb (caminho v1, como no README do adaptador), enquanto a página de instalação atual mostra o dbt v2 (python -m pip install dbt); a página do dbt OSS avisa para não instalar dbt-oss no mesmo ambiente de dbt ou dbt-core, porque usam o mesmo entry point. Use o ambiente limpo do runner e confira com dbt --version.",
      passos: [
        { t: "Criar o perfil de CI sem segredos", cmd: K("yaml", ["# ci/profiles.yml", "dbt_portfolio:      # igual ao campo profile do dbt_project.yml", "  target: ci", "  outputs:", "    ci:", "      type: duckdb", "      path: 'ci.duckdb'", "      schema: main", "      threads: 4"]), p: "Este perfil só tem o tipo duckdb e um arquivo local. A página do adaptador diz que caminhos relativos resolvem em relação ao profiles.yml. Não há senha nem token, então pode ser commitado." },
        { t: "Configurar o SQLFluff", cmd: K("ini", ["# .sqlfluff", "[sqlfluff]", "templater = dbt", "dialect = duckdb", "encoding = utf-8", "", "[sqlfluff:templater:dbt]", "project_dir = .", "profiles_dir = ci", "profile = dbt_portfolio", "target = ci"]) + "\n" + K("text", ["# .sqlfluffignore", "target/", "dbt_packages/", "macros/"]), p: "Conforme a página do templater dbt. Se o templater dbt der problema de compatibilidade, use templater = jinja para começar (mais simples), e depois volte. A página de dialetos lista duckdb; ansi também funciona como começo." },
        { t: "Escrever o workflow", cmd: K("yaml", [
          "# .github/workflows/dbt-ci.yml",
          "name: dbt CI",
          "on:",
          "  pull_request:",
          "jobs:",
          "  ci:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v7",
          "      - uses: actions/setup-python@v7",
          "        with:",
          "          python-version: '3.12'",
          "          cache: 'pip'",
          "      - run: python -m pip install dbt-duckdb sqlfluff sqlfluff-templater-dbt",
          "      - run: dbt deps --profiles-dir ci",
          "      - run: sqlfluff lint models --dialect duckdb",
          "      - run: dbt build --profiles-dir ci --target ci"
        ]), p: "As versões v7 das ações vêm das páginas atuais delas; confira antes de fixar. A versão de Python 3.12 é um exemplo: escolha uma que o dbt-duckdb suporte (confira o README do adaptador). Se você não usa pacotes, remova o passo dbt deps. A pasta dbt_packages também precisa estar ignorada." },
        { t: "Abrir uma pull request e ver o check", cmd: K("bash", ["git switch -c aula-27-ci", "git add .github ci .sqlfluff .sqlfluffignore", "git commit -m \"Aula 27: CI com dbt-duckdb e SQLFluff\"", "git push -u origin aula-27-ci"]), p: "Abra a PR no GitHub e vá na aba Actions ou na própria PR. O workflow deve instalar, lintar e rodar dbt build. Se o lint reprovar, corrija o estilo (ou rode sqlfluff fix localmente) e dê push de novo." },
        { t: "Opcional: praticar state:modified localmente", cmd: K("bash", ["dbt build --profiles-dir ci --target ci", "mkdir -p state && cp target/manifest.json state/", "# edite um modelo e depois:", "dbt ls --select \"state:modified\" --state state --profiles-dir ci --target ci"]), p: "Exercício local, sem custo e sem produção: o manifest vira a referência e dbt ls lista o que mudou. Evite apontar --state e --target-path para o mesmo caminho, como a página alerta. O defer só faz sentido com dois ambientes; aqui você só aprende a seleção." },
        { t: "Documentar no README", p: "No README do repositório, descreva o CI em 3 linhas: gatilho, o que roda e por que não usa segredos. Anote o que é do dbt Core (select, state, defer) e o que seria da plataforma dbt (CI jobs por PR, agendador)." }
      ],
      verificar: "A PR mostra um check do workflow dbt CI; os passos de instalação, lint e dbt build passam; o log não contém segredos; e o repositório não contém profiles.yml com credenciais.",
      limpar: [
        "Mantenha o workflow e o perfil ci/profiles.yml (sem segredos) no repositório.",
        "Nunca commite profiles.yml com credenciais, .env, tokens ou arquivos .duckdb de dados reais; confirme que ci.duckdb está no .gitignore.",
        "Se criar segredos de repositório para experimentos, apague os que não usar em Settings, Secrets and variables, Actions."
      ],
      erros: [
        { s: "Falha ao instalar dbt-duckdb ou sqlfluff-templater-dbt", c: "Versão de Python ou de dbt incompatível com o adaptador ou o templater.", r: "Troque a versão do Python no setup-python, consulte o README do adaptador e, se preciso, comece com templater = jinja." },
        { s: "Could not find profile named dbt_portfolio", c: "O nome do profile no ci/profiles.yml não bate com o campo profile do dbt_project.yml, ou faltou --profiles-dir ci.", r: "Alinhe os nomes e passe --profiles-dir ci em todos os comandos dbt." },
        { s: "SQLFluff reprova muitos arquivos de uma vez", c: "Regras padrão contra o estilo existente do projeto.", r: "Rode sqlfluff fix localmente, revise o diff e commite; ajuste regras no .sqlfluff se quiser." },
        { s: "O check não aparece na PR", c: "O arquivo não está em .github/workflows ou o gatilho não é pull_request.", r: "Confira o caminho e a chave on: pull_request e veja a aba Actions por erros de sintaxe do YAML." }
      ]
    }
  };

  /* ===================== AULA 28 ===================== */
  C.dias[28] = {
    aula: {
      titulo: "Projeto final, outros adaptadores e caminho de certificação",
      resumo: "Como o mesmo projeto dbt roda em outro adaptador (diferenças de SQL e de configuração), como publicar a documentação no GitHub Pages, como fechar o repositório com README em inglês e decisões e trade-offs, como contar o projeto em entrevista e o que a página oficial diz da certificação dbt.",
      simples: {
        analogia: "Pense numa receita que você já fez no fogão de casa. Levar a mesma receita para a cozinha de um restaurante é possível, mas o fogão é outro: a chama, a panela e até o nome de alguns utensílios mudam. A receita (o projeto dbt) continua a mesma; o que muda é o ajuste fino de cada cozinha (o adaptador). Depois de pronta, você ainda precisa escrever o cartão da receita, em inglês para turistas, explicar por que escolheu cada técnica e quais atalhos tomou, e pendurar o cardápio na vitrine da rua (documentação publicada). E se quiser um diploma de cozinheiro, a escola oficial diz as regras: o que vale, quanto custa, por quanto tempo é válido. Você só repete as regras que a escola publica.",
        pontos: [
          "O mesmo projeto muda de banco trocando o profile; SQL específico de um adaptador pode quebrar.",
          "Macros entre bancos, como dbt.datediff, ajudam a escrever SQL mais portável.",
          "Databricks e Snowflake são passos OPCIONAIS e com aviso de custo; DuckDB é local e gratuito.",
          "A documentação do dbt é um site estático e pode ser publicada no GitHub Pages por um workflow.",
          "README em inglês, decisões e trade-offs e números verdadeiros formam a história do projeto.",
          "A certificação dbt tem custo e regras publicadas na página oficial; só vale o que a página mostra."
        ],
        paraQueServe: "Fechar o repositório de portfólio de forma que um recrutador entenda o projeto, rode a documentação online e veja decisões justificadas, e saber o caminho oficial de certificação."
      },
      glossario: [
        { t: "Adaptador (adapter)", d: "Plugin que liga o dbt a um banco ou plataforma específica, como DuckDB, Databricks ou Snowflake." },
        { t: "Macros entre bancos", d: "Macros do dbt, como dbt.datediff, que geram o SQL certo para cada adaptador, deixando os modelos mais portáveis." },
        { t: "dbt docs generate", d: "Comando que compila o projeto e gera o site de documentação com modelos, colunas e lineage." },
        { t: "GitHub Pages", d: "Serviço do GitHub que publica um site estático a partir de um repositório, inclusive por um workflow de GitHub Actions." },
        { t: "Trade-off", d: "Escolha que ganha uma coisa e perde outra; a página de decisões do portfólio explica cada uma com seus custos." },
        { t: "README", d: "Arquivo na raiz do repositório com a descrição do projeto, como rodar e o que foi decidido; aqui, em inglês." },
        { t: "dbt Analytics Engineering Certification", d: "Exame online com acompanhamento remoto; a página oficial informa custo, validade e formato dos itens." },
        { t: "Verificação de segredos", d: "Revisão do repositório para garantir que senhas, tokens e arquivos de credenciais não foram commitados." }
      ],
      blocos: [
        {
          t: "O mesmo projeto em outro adaptador", facil: "Traduzindo: trocar de banco costuma mudar o profile e alguns trechos de SQL, não o desenho do projeto.", p: [
            "O projeto dbt é independente do banco no desenho (modelos, testes, documentação), mas o SQL que você escreve pode ser específico. A página de macros entre bancos explica que essas macros geram o SQL certo para cada adaptador, e os usuários finais ganham pacotes e adaptadores que simplesmente funcionam. Exemplo da página: dbt.datediff com colunas e uma unidade.",
            K("sql", ["{{ dbt.datediff(\"column_1\", \"column_2\", \"day\") }}"]),
            "Em PostgreSQL, a página mostra que isso vira ((column_2)::date - (column_1)::date). A lista inclui macros de tipos (type_string, type_timestamp), strings (concat, split_part), datas (dateadd, datediff, date_trunc), casting (cast, safe_cast) e agregação (listagg).",
            "O que trocar ao mudar de adaptador: o type do profile e os campos de conexão; trechos de SQL ou funções específicas do banco; e configs específicas do adaptador, descritas na referência de cada um. Teste no novo banco: o dbt build mostra onde o SQL quebrou."
          ], fonte: ["dbt: macros entre bancos", "https://docs.getdbt.com/reference/dbt-jinja-functions/cross-database-macros"], dica: "Antes de migrar, procure no seu SQL as funções de data, de texto e de tipos: são as primeiras a quebrar."
        },
        {
          t: "DuckDB: o que a página do adaptador diz", facil: "Traduzindo: o DuckDB roda local, sem login, em memória ou em um arquivo, e o dbt v2 traz um driver embutido com limitações.", p: [
            "O DuckDB não exige autenticação: roda na sua máquina. Perfil mínimo: type: duckdb. Para persistir dados, use path: './my_project.duckdb', com schema (padrão main) e threads opcionais. Caminhos relativos resolvem em relação ao profiles.yml. A página também mostra extensions, settings, attach de outros bancos e MotherDuck (nuvem; dbt-duckdb 1.5.2 ou posterior).",
            "A página que li é a do dbt v2: diz que o adaptador DuckDB é embutido no dbt v2 e que esse driver não suporta carregar extensões (para isso, a página manda instalar o driver com dbc). Ela lista lacunas em relação ao dbt-duckdb da v1 e avisa que a análise estática do v2 pode gerar avisos em modelos que leem arquivos locais com read_csv, read_parquet e read_json.",
            "No repositório oficial do adaptador (github.com/duckdb/dbt-duckdb), o README mostra pip3 install dbt-duckdb e diz que a versão mais recente mira dbt-core 1.8 ou superior e duckdb 1.0.0 ou superior; merge incremental exige DuckDB 1.4.0 ou superior. Confira qual caminho você usa, dbt-duckdb (v1) ou dbt v2, com dbt --version."
          ], fonte: ["dbt: configurar DuckDB", "https://docs.getdbt.com/docs/local/connect-data-platform/duckdb-setup"], armadilha: "Misturar instalações v1 e v2 no mesmo ambiente Python. A página de instalação avisa que dbt-oss e dbt não podem compartilhar um ambiente."
        },
        {
          t: "Databricks: OPCIONAL e com aviso de custo", facil: "Traduzindo: o mesmo projeto pode rodar no Databricks trocando o profile; use só o plano gratuito descrito na outra trilha.", p: [
            "OPCIONAL. Antes de qualquer coisa: criar conta ou ligar compute pode gerar cobrança. Use apenas o plano gratuito (Databricks Free Edition) descrito nas aulas da trilha Databricks do app, confira lá os limites e como desligar, e não coloque cartão de crédito sem entender o custo.",
            "A página do adaptador (versão v2 do dbt) diz que o adaptador dbt-databricks é o único método de conexão suportado, configurável por dbt init ou escrevendo o profiles.yml. O dbt init pergunta host (sem http ou https), HTTP Path (do SQL warehouse ou cluster), schema e, opcionalmente, o catálogo. Exemplo do perfil com token pessoal, baseado na página (ela também traz um campo auth_type nesse exemplo: confira lá o valor para o seu caso):",
            K("yaml", ["default:", "  target: dev", "  outputs:", "    dev:", "      type: databricks", "      database: TRANSFORMING", "      schema: JANE_SMITH", "      host: YOUR.HOST.COM", "      http_path: YOUR/PATH/HERE", "      token: ABC123", "      threads: 16"]),
            "Nunca commite um token real: na prática, use env_var no lugar do valor. A página lista OAuth como recomendado em vez de tokens e informa que, se o warehouse estiver iniciando, você pode aumentar connect_timeout (padrão 200 segundos). Desligue o compute ao terminar, como descrito na trilha Databricks."
          ], fonte: ["dbt: configurar Databricks", "https://docs.getdbt.com/docs/local/connect-data-platform/databricks-setup"], armadilha: "Deixar compute ligado depois do laboratório. Desligue conforme a trilha Databricks do app."
        },
        {
          t: "Snowflake: OPCIONAL e com aviso de custo", facil: "Traduzindo: a conexão com a Snowflake pede conta, warehouse e autenticação segura; use apenas o teste gratuito da outra trilha.", p: [
            "OPCIONAL. O teste gratuito da Snowflake é descrito nas aulas da trilha Snowflake do app, com o que ele inclui e como encerrar. Confira lá antes e acompanhe o consumo; não coloque cartão de crédito sem ler os termos.",
            "A página do adaptador mostra os campos do perfil: type: snowflake, account, user, database, warehouse, schema e threads, com opções de autenticação: senha, senha com MFA, key pair e SSO (externalbrowser). A página avisa que a Snowflake está descontinuando o login só com senha e que desenvolvedores individuais devem usar MFA ou SSO. A senha continua suportada para usuários de serviço (LEGACY_SERVICE).",
            K("yaml", ["default:", "  target: dev", "  outputs:", "    dev:", "      type: snowflake", "      threads: 16", "      authenticator: externalbrowser", "      account: ABC123", "      user: JANE.SMITH@YOURCOMPANY.COM", "      database: JAFFLE_SHOP", "      warehouse: TRANSFORM", "      schema: JANE_SMITH"]),
            "Todos os valores acima são de exemplo. A página também não menciona env_var nessa parte; use a página de env_var da aula 27 para tirar valores sensíveis do arquivo. Suspenda o warehouse ao fim, conforme a trilha Snowflake."
          ], fonte: ["dbt: configurar Snowflake", "https://docs.getdbt.com/docs/local/connect-data-platform/snowflake-setup"], dica: "Para o portfólio, rodar no segundo adaptador uma vez, com captura de tela do dbt build verde, já conta; não precisa manter a conta ligada."
        },
        {
          t: "Gerando a documentação", facil: "Traduzindo: dbt docs generate cria um site estático com seus modelos, colunas e lineage.", p: [
            "Descrições se escrevem em YAML (description em modelos e colunas) ou em docs blocks Markdown, referenciados com doc(). Para gerar o site, a página de dbt docs, na versão v2, diz que dbt docs generate compila o projeto, escreve o índice e exporta o site. Por padrão grava em target/ (target/index.html, assets e index), no mesmo layout da v1; com --output-dir site, escreve uma cópia autocontida em outra pasta. dbt docs serve visualiza localmente, na porta 8580 por padrão.",
            K("bash", ["dbt docs generate", "dbt docs generate --output-dir site   # v2, cópia autocontida", "dbt docs serve --port 8081"]),
            "A página afirma que o site gerado é um conjunto de arquivos estáticos que qualquer host de arquivos serve, como S3, GitHub Pages, Netlify ou GitLab Pages, e que um pipeline self-hosted com dbt docs generate && mv target public continua funcionando. As flags específicas da v1 (como --static) não estão nessa página: confira a versão da sua instalação. Na plataforma dbt, o job não produz o site estático."
          ], fonte: ["dbt: comandos docs", "https://docs.getdbt.com/reference/commands/cmd-docs"], armadilha: "Publicar a pasta target inteira. Ela contém também compilados e logs; prefira publicar só o que o site precisa, por exemplo a pasta gerada com --output-dir."
        },
        {
          t: "Publicando no GitHub Pages", facil: "Traduzindo: um workflow gera a documentação e a envia para o GitHub Pages, que a hospeda de graça em repositório público.", p: [
            "O GitHub Pages publica por uma branch ou por um workflow customizado. Para quem tem um build próprio, a página recomenda o workflow: Settings, Pages, Source, GitHub Actions. O fluxo é: checkout, build, upload com actions/upload-pages-artifact e deploy com actions/deploy-pages. O deploy exige permissões pages: write e id-token: write e um ambiente github-pages. Versões mostradas na página: configure-pages v5, upload-pages-artifact v4 e deploy-pages v4; confira as atuais nas páginas das ações.",
            "Limites da página: sites publicados com no máximo 1 GB, limite brando de 100 GB de banda por mês, e limite brando de 10 builds por hora que não vale para workflow customizado. Se a conta usa o GitHub Free, o repositório precisa ser público; e sites do GitHub Pages ficam publicamente disponíveis na internet mesmo se o repositório for privado. Por isso, jamais publique documentação com dados sensíveis.",
            "O build do workflow precisa rodar dbt build antes de dbt docs generate, para o catálogo ter as tabelas. O parâmetro path do upload-pages-artifact aponta a pasta com o site (o padrão é _site/)."
          ], fonte: ["GitHub Docs: workflows customizados com Pages", "https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages"], dica: "Descrições de colunas e modelos também ficam públicas: nada de dado pessoal, nome de cliente real ou segredo."
        },
        {
          t: "README em inglês, decisões e números verdadeiros", facil: "Traduzindo: o README apresenta o projeto, a página de decisões explica as escolhas e os números contados precisam ser verdade.", p: [
            "Este bloco é orientação prática, não uma afirmação da documentação do dbt. README em inglês: o que o projeto faz em uma frase, como rodar localmente (instalar, dbt deps, dbt build), a estrutura em camadas, o link da documentação publicada, o CI e o que o repositório deliberadamente não faz (sem produção, sem dados reais).",
            "Página de decisões e trade-offs: para cada escolha, o contexto, a decisão e o custo. Exemplos: DuckDB em vez de um data warehouse em nuvem (custo zero; menos paridade com produção), seeds de dados fictícios (público; menos realismo), snapshots com timestamp (recomendado pela documentação; depende de uma coluna de atualização confiável).",
            "Como contar em entrevista: situação, o que você decidiu, o que mediu. Use somente números que você conferiu no repositório ou na saída do dbt: quantos modelos, testes, snapshots, e se o CI passou. Nunca invente volumes de dados de produção nem resultado de negócio que o projeto não teve. Se o projeto usa dados de exemplo, diga isso: é uma força, não uma fraqueza.",
            "Antes de tornar público, verifique segredos: procure por senha, token e chave, e confira que profiles.yml com credenciais, .env e arquivos .duckdb não estão no git."
          ], dica: "Escreva o README como se o leitor tivesse cinco minutos: o que é, como rodar e onde ver a documentação."
        },
        {
          t: "Certificação dbt e cursos", facil: "Traduzindo: a página oficial lista exames, custo e validade; repita só o que ela mostra e confira o resto nela.", p: [
            "A página oficial de certificação lista o exame dbt Analytics Engineering, o exame dbt Architect e um exame de renovação do Analytics Engineering. O que ela mostra sobre o formato: tipos de questão (múltipla escolha, completar, associação, hotspot, montar lista e Discrete Option Multiple Choice), resultado de aprovado ou reprovado na hora e com a porcentagem, sem consulta a notas ou recursos, exame online com acompanhamento remoto pela Talview, em inglês (e japonês para os dois exames; francês para o Architect). Número de questões, duração e nota de corte não são mostrados na página.",
            "Custo: a página mostra $200 pelo exame online com acompanhamento remoto, $200 por nova tentativa e cancelamento grátis com pelo menos 24 horas de antecedência. Validade: dois anos a partir da data em que foi concedida. Pré-requisitos mostrados: SQL básico e, como recomendação, pelo menos seis meses de experiência com dbt. Preço e regras podem mudar: confira na página antes de decidir.",
            "Cursos gratuitos: a página dbt Learn diz Start learning free e menciona treinamentos sob demanda, mas o conteúdo que consegui ler não lista nomes de cursos. Confira o catálogo em learn.getdbt.com. A página de certificação mostra apenas um vídeo de preparação como material de estudo. Nada disso garante aprovação ou emprego: é um caminho de estudo."
          ], fonte: ["dbt: certificação", "https://www.getdbt.com/dbt-certification"], armadilha: "Citar número de questões ou nota de corte de memória. A página oficial não mostra esses dados."
        }
      ],
      exemplo: {
        t: "Fechando o repositório dbt-portfolio",
        texto: "A Eloabe tem o projeto rodando em DuckDB, com CI verde. Ela cria um workflow que roda dbt build, gera a documentação com dbt docs generate, sobe o resultado com upload-pages-artifact e publica com deploy-pages; depois confere a URL do Pages e o catálogo de modelos. Em seguida, tenta um segundo adaptador de forma opcional: usa o plano gratuito da Databricks descrito na outra trilha, cria um target apenas local com token em variável de ambiente, roda dbt build e anota duas funções de data que precisaram de ajuste, resolvidas com dbt.datediff. Desliga o compute e guarda uma captura da saída. Ela escreve o README em inglês, uma página de decisões com três trade-offs e uma lista de números que conferiu: quantidade de modelos, testes e snapshots. Por fim, procura por senhas e tokens no histórico do git antes de deixar o repositório público e confirma que nada de profiles.yml com credenciais foi commitado."
      },
      prova: [
        "Entrevista: conte o projeto em um minuto com situação, decisão e números que você conferiu, sem inventar escala.",
        "Alguém pergunta como o projeto migraria de DuckDB para Databricks ou Snowflake: você cita o profile, o SQL específico e as macros entre bancos.",
        "Pergunta sobre documentação: você explica dbt docs generate e como publicou o site estático no GitHub Pages.",
        "Sobre certificação: você diz o que a página oficial mostra e o que precisa conferir lá."
      ],
      explique: "Explique com as próprias palavras o que muda ao rodar o mesmo projeto dbt em outro adaptador, como a documentação foi publicada no GitHub Pages e como você contaria o projeto em entrevista usando só números verdadeiros.",
      checagem: [
        "O que muda ao trocar o adaptador de um projeto dbt e como as macros entre bancos ajudam?",
        "Quais permissões e ambiente o workflow de deploy do GitHub Pages exige?",
        "Que cuidados antes de publicar documentação e tornar o repositório público?",
        "O que a página oficial da certificação dbt mostra sobre custo e validade, e o que ela não mostra?"
      ]
    },
    fontes: [
      ["dbt: macros entre bancos", "https://docs.getdbt.com/reference/dbt-jinja-functions/cross-database-macros"],
      ["dbt: configurar DuckDB", "https://docs.getdbt.com/docs/local/connect-data-platform/duckdb-setup"],
      ["dbt: configurar Databricks", "https://docs.getdbt.com/docs/local/connect-data-platform/databricks-setup"],
      ["dbt: configurar Snowflake", "https://docs.getdbt.com/docs/local/connect-data-platform/snowflake-setup"],
      ["dbt: comandos docs", "https://docs.getdbt.com/reference/commands/cmd-docs"],
      ["dbt: documentação de projetos", "https://docs.getdbt.com/docs/build/documentation"],
      ["GitHub Docs: workflows customizados com Pages", "https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages"],
      ["GitHub Docs: fonte de publicação do Pages", "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"],
      ["GitHub Docs: limites do Pages", "https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits"],
      ["GitHub Docs: criar um site no Pages", "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site"],
      ["Ação upload-pages-artifact", "https://github.com/actions/upload-pages-artifact"],
      ["dbt: certificação", "https://www.getdbt.com/dbt-certification"],
      ["dbt Learn (site de cursos)", "https://learn.getdbt.com"],
      ["dbt Learn (página no site principal)", "https://www.getdbt.com/dbt-learn"],
      ["dbt: instalar dbt", "https://docs.getdbt.com/docs/local/install-dbt"]
    ],
    cartoes: [
      { id: "a28c1", f: "O que costuma mudar ao trocar de adaptador?", v: "O type e os campos do profile, trechos de SQL específicos do banco e configs específicas do adaptador.", t: "t8" },
      { id: "a28c2", f: "Para que servem as macros entre bancos?", v: "Geram o SQL certo para cada adaptador, como dbt.datediff, deixando modelos mais portáveis.", t: "t8" },
      { id: "a28c3", f: "Como é o perfil mínimo do DuckDB no dbt?", v: "type: duckdb, e opcionalmente path para um arquivo, schema e threads. Não exige autenticação.", t: "t8" },
      { id: "a28c4", f: "Como gerar e visualizar a documentação?", v: "dbt docs generate gera o site em target/ (ou --output-dir na v2); dbt docs serve o abre localmente.", t: "t8" },
      { id: "a28c5", f: "O que um workflow de GitHub Pages precisa?", v: "upload-pages-artifact e deploy-pages, permissões pages: write e id-token: write e o ambiente github-pages.", t: "t8" },
      { id: "a28c6", f: "Quando o GitHub Pages exige repositório público?", v: "Se a conta usa GitHub Free ou GitHub Free for organizations, o repositório precisa ser público.", t: "t8" },
      { id: "a28c7", f: "Qual o risco de publicar documentação?", v: "O site fica publicamente disponível na internet, mesmo de repositório privado; não publique dados sensíveis.", t: "t8" },
      { id: "a28c8", f: "O que a página oficial diz do custo e da validade da certificação?", v: "$200 pelo exame online e por retake; validade de dois anos. Número de questões, duração e nota de corte não são mostrados.", t: "t8" },
      { id: "a28c9", f: "Como contar o projeto em entrevista?", v: "Situação, decisão e o que mediu, com números conferidos no repositório; dizer que os dados são de exemplo.", t: "t8" }
    ],
    questoes: [
      { id: "a28q1", s: 3, t: "t8", e: "Seu projeto dbt roda em DuckDB e você vai tentá-lo em outro adaptador. Um modelo usa uma função de diferença de datas específica do DuckDB. Qual caminho a documentação oferece para deixar o SQL mais portável?", o: ["Reescrever o modelo em Python", "Usar macros entre bancos, como dbt.datediff com as colunas e a unidade, que geram o SQL certo para cada adaptador", "Desativar os testes", "Mover o modelo para um seed", "Trocar o target para dev"], c: [1], x: "A página de macros entre bancos explica que macros como datediff, dateadd e date_trunc geram o SQL correspondente de cada adaptador, e dá o exemplo {{ dbt.datediff(\"column_1\", \"column_2\", \"day\") }}. Reescrever em Python é desproporcional e não é o que a página indica. Desativar testes não torna o SQL portável. Um seed carrega CSV. E trocar para o target dev apenas muda o ambiente dentro do mesmo banco." },
      { id: "a28q2", s: 3, t: "t8", e: "Você quer rodar o projeto no Databricks apenas como experimento do portfólio, gastando o mínimo. Qual atitude está de acordo com a trilha do app e com a documentação do adaptador?", o: ["Ligar um cluster grande e deixar ligado", "Usar só o plano gratuito descrito na trilha Databricks, passar host, http_path e credenciais por env_var, marcar o passo como opcional e desligar o compute ao terminar", "Commitar o token no profiles.yml para facilitar", "Usar a mesma conta paga da empresa", "Colocar o cartão de crédito antes de ler os limites"], c: [1], x: "O passo é opcional e deve seguir o plano gratuito descrito na trilha Databricks, com os limites e a forma de desligar. A página do adaptador mostra os campos host, http_path, schema, e a autenticação com token ou OAuth; credenciais não devem ser commitadas, e env_var lê valores do ambiente. Deixar compute ligado, usar conta paga da empresa e colocar cartão sem ler os limites vão contra a regra de custo. Commitar o token expõe uma credencial em um repositório público." },
      { id: "a28q3", s: 3, t: "t8", e: "Seu workflow de documentação precisa publicar o site gerado pelo dbt no GitHub Pages usando um workflow customizado. Quais elementos a documentação do GitHub exige no job de deploy?", o: ["Somente um arquivo index.html na raiz da branch main", "As ações upload-pages-artifact e deploy-pages, as permissões pages: write e id-token: write e o ambiente github-pages", "Um segredo com a senha do banco", "Um runner self-hosted obrigatório", "O pacote dbt_utils"], c: [1], x: "A página de workflows customizados diz que o fluxo usa actions/upload-pages-artifact para enviar a pasta do site e actions/deploy-pages para o deploy; o job de deploy precisa de pages: write e id-token: write e usa o ambiente github-pages. Um index.html na raiz da main corresponde à publicação por branch, que é outra opção. Senha de banco não é necessária para publicar um site estático. Runner self-hosted não é obrigatório e dbt_utils não tem relação com a publicação." },
      { id: "a28q4", s: 3, t: "t8", e: "(Escolha duas) Antes de tornar o repositório dbt-portfolio público e publicar a documentação no Pages, quais cuidados estão de acordo com a documentação e com as regras do projeto?", o: ["Lembrar que sites do GitHub Pages são públicos na internet mesmo com repositório privado, e não publicar dados sensíveis", "Confirmar que profiles.yml com credenciais, .env e arquivos .duckdb com dados reais não estão no git", "Publicar a pasta target inteira, com logs, sem olhar o conteúdo", "Usar dados pessoais reais para o projeto parecer mais realista", "Deixar tokens em comentários do README"], c: [0, 1], x: "A página de criação do site no Pages avisa que os sites são publicamente disponíveis, mesmo de repositórios privados, e recomenda remover dados sensíveis antes de publicar. A regra do projeto também exige conferir que arquivos com credenciais e bancos com dados reais não foram commitados. Publicar target inteiro sem olhar pode expor compilados e logs. Dados pessoais reais num repositório público são exatamente o que se deve evitar. Tokens em comentários seriam uma credencial exposta." },
      { id: "a28q5", s: 3, t: "t8", e: "Em uma conversa, você afirma que o exame dbt Analytics Engineering tem 65 questões e nota de corte 65 por cento, de memória. Segundo a página oficial de certificação que abrimos, o que ela de fato mostra sobre o exame?", o: ["Número de questões, duração e nota de corte", "Custo de $200 pelo exame online e por retake, validade de dois anos, tipos de questão, exame sem consulta, e não mostra número de questões, duração nem nota de corte", "Apenas que o exame é gratuito", "Que a certificação não expira", "Que não há acompanhamento remoto"], c: [1], x: "A página mostra $200 pelo exame online com acompanhamento remoto e $200 por nova tentativa, validade de dois anos, tipos de questão (múltipla escolha, completar, associação, hotspot, montar lista e Discrete Option Multiple Choice) e que o exame é sem consulta. Número de questões, duração e nota de corte não aparecem na página, então afirmá-los seria inventar. O exame não é gratuito, a certificação expira em dois anos e há acompanhamento remoto pela Talview." },
      { id: "a28q6", s: 3, t: "t8", e: "Em uma entrevista, pedem para você contar o projeto dbt-portfolio, que usa dados de exemplo em DuckDB. Qual resposta é honesta e forte?", o: ["Dizer que processa terabytes em produção", "Contar a situação, as decisões (camadas, testes, snapshot, CI), o que mediu com números conferidos no repositório e deixar claro que os dados são de exemplo", "Evitar mencionar que usa DuckDB", "Citar o número de questões do exame como se fosse resultado do projeto", "Prometer que o projeto garante uma vaga"], c: [1], x: "Uma boa resposta mostra raciocínio e honestidade: o contexto, as decisões e seus custos, números que você realmente conferiu (modelos, testes, resultado do CI) e a menção explícita de que os dados são de exemplo. Inventar volume de produção, esconder o uso de DuckDB ou misturar a certificação com resultado do projeto é desonesto. Prometer vaga também não é cabível: nenhum projeto de portfólio garante emprego." }
    ],
    lab: {
      t: "Segundo adaptador (opcional), documentação publicada e repositório fechado",
      custo: "gratuito na parte local (dbt, DuckDB, GitHub Pages e Actions em repositório público). O segundo adaptador é OPCIONAL e pode gerar custo: use só o plano gratuito descrito na trilha Databricks ou Snowflake do app, confira os limites e desligue o compute ou o warehouse ao terminar.",
      tempo: "90 a 120 min",
      porque: "Fecha o projeto dbt com CI, outro adaptador e documentação publicada: o repositório vira algo que um recrutador consegue ler e conferir.",
      antes: "Você precisa do repositório público dbt-portfolio com o CI da aula 27 funcionando. Os passos foram conferidos contra a documentação e NÃO foram executados: ajuste versões das ações e do Python. Na tela você verá o workflow de docs no Actions e, no fim, a URL do Pages. A parte do segundo adaptador é opcional: se exigir conta ou cartão, não faça; descreva no README o que você mudaria e faça só a parte local. Confira com dbt --version se usa dbt-duckdb (v1, README do adaptador) ou dbt v2 (página de instalação atual), pois alguns comandos de docs diferem; os workflows abaixo instalam dbt-duckdb (v1) e a página do comando docs que li descreve a v2. Não use dados pessoais nem credenciais em nenhum arquivo.",
      passos: [
        { t: "Revisar SQL específico e usar macros entre bancos", cmd: K("sql", ["-- exemplo de troca", "{{ dbt.datediff('inicio', 'fim', 'day') }}"]), p: "Procure nos modelos funções de data, texto e tipos específicas do DuckDB e troque por macros entre bancos quando houver equivalente na lista da página. Rode dbt build com o CI local para garantir que continua verde." },
        { t: "OPCIONAL: segundo adaptador com plano gratuito", cmd: K("yaml", ["# ~/.dbt/profiles.yml (FORA do repositório)", "dbt_portfolio:", "  target: dev", "  outputs:", "    dev:", "      type: duckdb", "      path: './dev.duckdb'", "    databricks:", "      type: databricks", "      host: \"{{ env_var('DBX_HOST') }}\"", "      http_path: \"{{ env_var('DBX_HTTP_PATH') }}\"", "      token: \"{{ env_var('DBX_TOKEN') }}\"", "      schema: portfolio_dev"]), p: "Só faça com o plano gratuito da trilha Databricks (ou o teste gratuito da Snowflake, adaptando o perfil conforme a página do adaptador). Instale o adaptador conforme a documentação dele e rode dbt build --target databricks. Anote o que quebrou e o que mudou no SQL. Ao terminar, desligue o compute como a trilha descreve. Os valores vêm do ambiente, nunca do arquivo." },
        { t: "Workflow que publica a documentação", cmd: K("yaml", [
          "# .github/workflows/docs.yml",
          "name: docs",
          "on:",
          "  push:",
          "    branches: ['main']",
          "  workflow_dispatch:",
          "permissions:",
          "  contents: read",
          "  pages: write",
          "  id-token: write",
          "jobs:",
          "  build:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v7",
          "      - uses: actions/setup-python@v7",
          "        with:",
          "          python-version: '3.12'",
          "          cache: 'pip'",
          "      - run: python -m pip install dbt-duckdb",
          "      - run: dbt deps --profiles-dir ci",
          "      - run: dbt build --profiles-dir ci --target ci",
          "      - run: dbt docs generate --profiles-dir ci --target ci",
          "      - uses: actions/configure-pages@v5",
          "      - uses: actions/upload-pages-artifact@v4",
          "        with:",
          "          path: target",
          "  deploy:",
          "    needs: build",
          "    runs-on: ubuntu-latest",
          "    environment:",
          "      name: github-pages",
          "      url: ${{ steps.deployment.outputs.page_url }}",
          "    steps:",
          "      - id: deployment",
          "        uses: actions/deploy-pages@v4"
        ]), p: "Em Settings, Pages, Source, escolha GitHub Actions. Aqui o upload usa a pasta target: a página do comando docs (que descreve a v2) diz que target/index.html segue o mesmo layout da v1, mas confira na documentação da sua versão quais arquivos o dbt docs generate grava em target/. Se você usa dbt v2, também pode usar dbt docs generate --output-dir site e path: site. Confira os parâmetros na página da ação upload-pages-artifact. Antes, olhe o que está em target e prefira publicar apenas o necessário." },
        { t: "Conferir a documentação publicada", p: "Depois do deploy, abra a URL do Pages exibida no job. Confirme que os modelos, colunas, descrições e o lineage aparecem e que nada sensível está visível. Se aparecer algo indevido, apague e refaça antes de divulgar o link." },
        { t: "Escrever o README em inglês e a página de decisões", p: "No README: purpose, how to run locally (install, dbt deps, dbt build), project structure, link to the published docs, CI description and limitations (sample data, DuckDB, no production). Em docs/decisions.md ou no próprio README: três a cinco decisões com contexto, escolha e trade-off. Liste só números que você conferiu (modelos, testes, snapshots, resultado do CI)." },
        { t: "Checagem de segredos antes de tornar público", cmd: K("bash", ["git ls-files | grep -Ei \"profiles.yml|\\.env|\\.duckdb\" || echo \"nada suspeito nos nomes\"", "git grep -nEi \"password|token|secret|private_key\" || echo \"nenhum termo encontrado\"", "git log --oneline | head"]), p: "Os resultados precisam ser lidos por você: termos como token podem aparecer legitimamente em documentação. Se achar uma credencial real em qualquer commit, revogue-a no serviço de origem e não confie em apagar o arquivo, pois o histórico do git a mantém." }
      ],
      verificar: "O workflow de docs concluiu, a URL do Pages mostra a documentação com lineage, o README em inglês existe, a página de decisões lista trade-offs, o CI da aula 27 continua verde e a checagem de segredos não achou credenciais reais.",
      limpar: [
        "Se usou segundo adaptador, desligue o compute ou o warehouse, revogue tokens de teste e apague qualquer variável de ambiente local criada.",
        "Nunca commite profiles.yml com credenciais, .env, tokens ou arquivos .duckdb com dados reais; mantenha o perfil de CI sem segredos.",
        "Guarde o README, a página de decisões, o workflow de docs e uma captura do dbt build verde como evidência."
      ],
      erros: [
        { s: "O deploy do Pages falha por permissão", c: "Faltam pages: write ou id-token: write, ou o Source do Pages não está em GitHub Actions.", r: "Adicione as permissões ao workflow e escolha GitHub Actions em Settings, Pages." },
        { s: "Página publicada em branco ou com 404", c: "O path do upload aponta para a pasta errada ou o dbt docs generate não gerou index.html onde esperado.", r: "Rode dbt docs generate localmente, veja onde está o index.html e ajuste o path do upload conforme a página do comando docs." },
        { s: "dbt build no segundo adaptador falha em funções de data", c: "SQL específico do DuckDB que o outro banco não entende.", r: "Troque por macros entre bancos, como dbt.datediff, ou use a função equivalente do novo banco." },
        { s: "Erro de conexão com o Databricks ou Snowflake", c: "Variáveis de ambiente não definidas, compute desligado ou plano gratuito expirado.", r: "Confira env_var, ligue o compute (se estiver no plano gratuito) ou pule o passo opcional e descreva no README." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
