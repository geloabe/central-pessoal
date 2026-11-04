(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var F = "```";
C.dias[9] = {
aula: {
titulo: "Qualidade na nuvem: AWS Glue Data Quality e Dataplex",
resumo: "Como usar regras de qualidade gerenciadas na nuvem: AWS Glue Data Quality (linguagem DQDL, rulesets, score, catálogo e jobs) e as varreduras de qualidade do Dataplex (hoje Knowledge Catalog), e quando isso vale mais que dbt, GX ou Soda.",
simples: {
analogia: "Imagine que você recebe caixas de mercado todo dia na cozinha. Você pode conferir uma por uma, com a sua lista de papel: ovos quebrados, validade, itens faltando. Funciona, mas depende de você lembrar. Agora imagine que o próprio mercado tem um fiscal que usa a sua lista, confere cada caixa na hora em que chega, dá uma nota de 0 a 100 e manda mensagem se a nota cair. Você não contrata o fiscal nem cuida dele: só escreve a lista e paga pelo tempo que ele trabalhou. Serviço gerenciado de qualidade é esse fiscal. A lista de regras é sua, o motor que confere é do provedor de nuvem.",
pontos: [
"AWS Glue Data Quality usa a linguagem DQDL para escrever regras.",
"Um conjunto de regras é um ruleset; a nota é o score (percentual de regras que passaram).",
"No Dataplex (Knowledge Catalog) a checagem é uma varredura (scan) em uma tabela.",
"Os dois são serviços gerenciados: sem servidor para você manter.",
"Regras ficam como texto: dá para versionar no Git e revisar em PR."
],
paraQueServe: "Para checar tabelas grandes do lake ou do BigQuery sem montar e manter infraestrutura própria, com nota, histórico e alerta prontos."
},
glossario: [
{ t: "DQDL", d: "Data Quality Definition Language: linguagem de domínio específico do AWS Glue para escrever regras de qualidade, como IsComplete e RowCount." },
{ t: "Ruleset", d: "Recurso do AWS Glue que reúne um conjunto de regras DQDL e fica associado a uma tabela do Data Catalog." },
{ t: "Data quality score", d: "Percentual de regras que passam (resultam em verdadeiro) quando um ruleset é avaliado no AWS Glue Data Quality." },
{ t: "Analyzer", d: "Expressão DQDL que só coleta estatísticas dos dados, sem afirmar condição; serve para detectar anomalias ao longo do tempo." },
{ t: "Data scan (DataScan)", d: "Objeto do Dataplex/Knowledge Catalog que representa uma varredura de qualidade (ou de perfilamento) sobre uma tabela." },
{ t: "Dimensão", d: "Categoria da regra no Dataplex: Freshness, Volume, Completeness, Validity, Consistency, Accuracy ou Uniqueness." },
{ t: "SQL assertion", d: "Regra do Dataplex em que a consulta devolve as linhas que violam a regra; qualquer linha devolvida faz a regra falhar." },
{ t: "Knowledge Catalog", d: "Nome atual do que antes se chamava Dataplex Universal Catalog; a API, o comando gcloud e os papéis ainda usam dataplex." }
],
blocos: [
{ t: "Ideia central: você escreve a regra, o provedor roda", facil: "Traduzindo: em vez de montar um servidor para conferir seus dados, você escreve as regras e a nuvem executa, pontua e avisa.", p: [
"Até agora, nesta trilha, a qualidade rodava no seu próprio código: testes do dbt, expectativas do Great Expectations, checagens do Soda, SQL puro. Nesta aula você vê a outra opção: serviço gerenciado. O provedor cuida da execução (sem instalar nem atualizar nada), guarda histórico de resultados e oferece integração com alerta.",
"O que não muda: quem decide o que é dado bom é você. Um serviço gerenciado não sabe que 'valor de pedido nunca é negativo' no seu negócio. Ele só entrega a forma de escrever e rodar essa regra em escala. Regra mal pensada continua sendo regra mal pensada, agora com nota bonita."
], dica: "Pense em três perguntas para qualquer ferramenta de qualidade: onde a regra é escrita, onde ela roda e para onde vai o resultado." },
{ t: "AWS Glue Data Quality: os dois pontos de entrada", facil: "Traduzindo: você pode checar uma tabela que já está no catálogo (depois que o dado chegou) ou checar dentro do job de ETL (antes de gravar).", p: [
"Segundo a documentação, o AWS Glue Data Quality é construído sobre o framework open source DeeQu e oferece uma experiência gerenciada e serverless. Ele tem dois pontos de entrada: o AWS Glue Data Catalog e os jobs de ETL do AWS Glue.",
"No Data Catalog, ele avalia tabelas (e views do Athena compatíveis) já catalogadas, pelo console ou pelas APIs do Glue; é a rota de quem faz governança do lake de forma contínua. Nos jobs de ETL, a checagem é proativa: ajuda a identificar e filtrar dado ruim antes de carregá-lo no lake, com código nos scripts ou no AWS Glue Studio."
], tabela: { cab: ["Característica", "No Data Catalog", "Em jobs de ETL"], linhas: [
["Recomendação automática de regras", "Suportada", "Não suportada"],
["Identificar registros que falharam", "Não suportado", "Suportado"],
["Escrever e rodar regras DQDL", "Suportado", "Suportado"],
["Resultados no Amazon S3 e métricas no CloudWatch", "Suportado", "Suportado"],
["Analyzers e labels", "Não suportados (página DQDL)", "Suportados"],
["Dynamic rules", "A tabela de comparação diz suportado, mas a página DQDL diz só ETL: confira", "Suportadas"]
] }, armadilha: "Esperar que o Catalog marque as linhas ruins. A tabela de comparação diz que identificar registros que falharam é suportado em jobs de ETL, não no Catalog.", fonte: ["AWS Glue Data Quality", "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html"] },
{ t: "DQDL: a estrutura de um ruleset", facil: "Traduzindo: um ruleset é uma lista chamada Rules; cada linha é uma regra com nome do tipo, a coluna e uma condição.", p: [
"Um documento DQDL diferencia maiúsculas de minúsculas e contém um ruleset: uma lista chamada `Rules` entre colchetes, com regras separadas por vírgula. A forma geral de uma regra é tipo da regra, parâmetros e expressão. Comentários começam com `#`.",
`${F}text
# regras do pedido (exemplo da doc, adaptado)
Rules = [
    IsComplete \"order-id\",
    IsUnique \"order-id\",
    RowCount > 0,
    ColumnValues \"total\" >= 0
]
${F}`,
"Algumas regras já devolvem verdadeiro ou falso (IsComplete, IsUnique). Outras produzem um número e precisam de expressão para virar booleano: `Mean \"colA\" between 80 and 100`. As expressões incluem =, !=, >, <, >=, <=, between, in, matches e now() em ColumnValues, entre outras."
], fonte: ["Data Quality Definition Language (DQDL) reference", "https://docs.aws.amazon.com/glue/latest/dg/dqdl.html"] },
{ t: "Tipos de regra, frescor e regras compostas", facil: "Traduzindo: há regras prontas para completude, unicidade, valores, tamanho, frescor e comparação entre tabelas; dá para combiná-las com and e or.", p: [
"A referência lista dezenas de tipos, entre eles: RowCount, ColumnCount, IsComplete, Completeness, IsUnique, Uniqueness, IsPrimaryKey, ColumnValues, ColumnLength, DistinctValuesCount, Mean, Sum, StandardDeviation, CustomSql, DataFreshness, ReferentialIntegrity, RowCountMatch, DatasetMatch e SchemaMatch.",
"O frescor usa uma coluna de data e uma expressão com unidade de tempo em horas ou dias:",
`${F}text
Rules = [
    DataFreshness \"Order_Date\" <= 24 hours,
    DataFreshness \"Order_Date\" between 2 days and 5 days
]
${F}`,
"Atenção ao comportamento de nulos: a doc diz que DataFreshness falha para linhas com NULL e mostra como permitir nulo com uma regra composta usando `or`. Regras compostas exigem parênteses em cada regra: `(IsComplete \"id\") and (IsUnique \"id\")`. Também existe filtro `where` com SparkSQL (somente no AWS Glue 4.0, conforme a doc) para aplicar a regra a parte dos dados."
], dica: "Comece com poucas regras que, se falharem, o negócio realmente se importa: completude da chave, unicidade da chave, frescor e contagem de linhas.", fonte: ["DataFreshness (DQDL)", "https://docs.aws.amazon.com/glue/latest/dg/dqdl-rule-types-DataFreshness.html"] },
{ t: "Rodar no catálogo: recomendar, editar, avaliar, ler o score", facil: "Traduzindo: o Glue sugere regras olhando seus dados, você revisa, roda e recebe uma nota com a lista do que passou e falhou.", p: [
"Pré-requisitos do passo a passo no console: uma tabela no Data Catalog e uma função do IAM para o Glue com acesso a Glue, Amazon S3 e CloudWatch. Na aba Data quality da tabela você pode gerar recomendações de regras (modo BASIC, o padrão, analisa estatísticas da tabela) e depois editar. A própria doc avisa: revise e edite as regras recomendadas, porque elas refletem os dados atuais e podem trazer regras indesejadas.",
"Ao rodar um ruleset, você escolhe a função IAM, se publica métricas no Amazon CloudWatch, a frequência (sob demanda ou agendada, via Amazon EventBridge) e onde guardar os resultados no Amazon S3. O score é o percentual de regras que passaram. A tela mostra a tendência das últimas execuções e, ao expandir, quais regras passaram ou falharam e o motivo.",
"Sobre custo: a página de visão geral diz que é pagamento por uso, sem licença anual. Valores mudam; confira a página de preços do AWS Glue antes de rodar qualquer coisa."
], armadilha: "Aceitar as regras recomendadas sem ler. O modo ADVANCED usa um modelo generativo e pode devolver regras diferentes para a mesma tabela, e a doc manda revisar o resultado a cada execução.", fonte: ["Getting started with AWS Glue Data Quality for the Data Catalog", "https://docs.aws.amazon.com/glue/latest/dg/data-quality-getting-started.html"] },
{ t: "Dataplex, hoje Knowledge Catalog: varreduras de qualidade", facil: "Traduzindo: no Google Cloud você cria uma varredura (scan) de qualidade para uma tabela, define regras e recebe resultados e notas.", p: [
"A documentação atual chama o recurso de auto data quality no Knowledge Catalog, e informa que ele se chamava antes Dataplex Universal Catalog. A API e os comandos continuam com o nome dataplex (por exemplo, `gcloud dataplex datascans`). Uma varredura de qualidade é um objeto DataScan do tipo data quality, que roda sobre uma tabela. As fontes suportadas, segundo a página: BigQuery, Iceberg REST Catalog, SAP Business Data Cloud Delta Lake e tabelas Apache Hive. As varreduras rodam em um projeto de tenant do Google, sem você provisionar infraestrutura.",
"Tipos de regra: de linha (cada linha passa ou falha, com um limiar de aprovação), como RangeExpectation, NonNullExpectation, SetExpectation e RegexExpectation; agregadas (um valor para a tabela inteira), como Uniqueness e StatisticRangeExpectation; e SQL personalizado (condição de linha, condição de tabela e SQL assertion). Toda regra tem uma das sete dimensões: Freshness, Volume, Completeness, Validity, Consistency, Accuracy, Uniqueness. O limite é de 1000 regras por varredura."
], fonte: ["Auto data quality overview (Knowledge Catalog / Dataplex)", "https://cloud.google.com/dataplex/docs/data-quality-overview"] },
{ t: "Dataplex: criar, rodar, receber resultado e alerta", facil: "Traduzindo: você escolhe a tabela, o escopo (tudo ou incremental), a agenda e para onde vão os resultados e os e-mails.", p: [
"No console, em Data profiling & quality, você cria a varredura: escolhe a tabela, o escopo (Entire data ou Incremental, que exige coluna DATE ou TIMESTAMP), filtro opcional em GoogleSQL e percentual de amostragem. A agenda pode ser recorrente, sob demanda ou única. Resultados podem ser exportados para uma tabela do BigQuery e publicados no catálogo; cada resultado traz scores que indicam o percentual de regras aprovadas.",
"Os alertas por e-mail podem disparar quando o score fica abaixo de uma meta de 0 a 100, quando o job falha ou quando termina. Para regra que falhou, a doc oferece uma consulta que devolve os registros problemáticos. Pela linha de comando, a doc mostra:",
`${F}bash
gcloud dataplex datascans create data-quality DATASCAN --location=LOCATION --data-quality-spec-file=FILE --data-source-resource=DATA_SOURCE_RESOURCE
gcloud dataplex datascans run DATASCAN --location=LOCATION
${F}`,
"O arquivo de especificação (YAML) tem uma lista rules com expectativas como nonNullExpectation, setExpectation e sqlAssertion. Para uma fonte que não está em um lake, a doc usa `--data-source-resource`; para uma entidade de lake, `--data-source-entity`. Confira o comando completo na página antes de usar, e a página de preços para custos. Em SQL assertion, a doc manda omitir o ponto e vírgula final."
], fonte: ["Create and run a data quality scan", "https://cloud.google.com/dataplex/docs/use-auto-data-quality"] },
{ t: "Gerenciado ou dbt, GX, Soda: como escolher", facil: "Traduzindo: use o serviço da nuvem quando a tabela já vive lá e você quer nota e alerta prontos; use dbt, GX ou Soda quando a regra deve morar no código do pipeline.", p: [
"O dbt define data tests como consultas que devolvem as linhas que violam a regra (zero linhas é passar); os testes ficam no repositório, revisados em PR, e rodam no mesmo comando que constrói os modelos. O GX Core é uma biblioteca Python em que Expectations são afirmações verificáveis sobre os dados, agrupadas em suítes; Checkpoints rodam definições de validação e podem acionar ações, como alerta por e-mail. O Soda é outra opção de qualidade de dados; confira a documentação oficial dele.",
"Um critério prático, que é opinião e não regra da documentação: se a regra precisa bloquear o pipeline no momento certo e fazer parte do PR, ela costuma ficar melhor no dbt ou no seu orquestrador. Se o objetivo é varrer muitas tabelas já catalogadas, com histórico e nota por tabela, o serviço gerenciado poupa trabalho. Os dois combinam: as mesmas regras podem existir em DQDL ou YAML do Dataplex e em teste dbt, desde que haja uma fonte da verdade clara para evitar divergência."
], tabela: { cab: ["Situação", "Tende a servir melhor"], linhas: [
["Regra faz parte do modelo e do PR", "dbt test (ou GX/Soda no pipeline)"],
["Varrer muitas tabelas já no catálogo, com nota", "Glue Data Quality ou Dataplex"],
["Quer evitar manter infraestrutura de checagem", "Serviço gerenciado"],
["Quer regras portáveis entre nuvens", "dbt, GX ou Soda (código seu)"]
] }, fonte: ["dbt data tests", "https://docs.getdbt.com/docs/build/data-tests"] }
],
exemplo: { t: "Tabela de pedidos: do papel para DQDL e para scan", texto: "A equipe tem a tabela orders no catálogo. Regras de negócio combinadas: a chave order_id nunca é nula nem repetida, o total nunca é negativo e a tabela foi atualizada nas últimas 24 horas. Em DQDL: IsComplete \"order_id\", IsUnique \"order_id\", ColumnValues \"total\" >= 0 e DataFreshness \"updated_at\" <= 24 hours. A pessoa salva o ruleset em um arquivo do repositório e o revisa em PR, roda no console e vê score de 75 por cento: a regra de frescor falhou. A mensagem mostra o motivo, ela corrige o agendamento do pipeline e roda de novo. No Google Cloud, o equivalente é um scan com NonNullExpectation, Uniqueness, RangeExpectation e uma SQL assertion para o frescor, com e-mail quando o score cair abaixo da meta." },
prova: [
"Em revisão de projeto, alguém pergunta qual nota o lake tem hoje: você abre a aba Data quality da tabela e mostra o score e o histórico.",
"Um job do Glue grava dado ruim no lake: você move a checagem para dentro do ETL para filtrar antes de gravar.",
"O time de BI reclama de tabela velha: você cria regra de frescor e alerta, em vez de esperar a reclamação.",
"Na escolha de ferramenta, você explica por que algumas regras ficam no dbt e outras no serviço gerenciado."
],
explique: "Explique com suas palavras a diferença entre checar a qualidade no catálogo e dentro do job de ETL no AWS Glue, e dê um critério para decidir entre serviço gerenciado e dbt.",
checagem: [
"O que é um ruleset no AWS Glue Data Quality e como o score é calculado?",
"Em qual dos dois pontos de entrada do Glue dá para identificar os registros que falharam?",
"Quais são os tipos de regra do Dataplex (linha, agregada, SQL) e o que é uma SQL assertion?",
"Por que revisar as regras recomendadas automaticamente antes de usá-las?"
]
},
fontes: [
["AWS Glue Data Quality", "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html"],
["Data Quality Definition Language (DQDL) reference", "https://docs.aws.amazon.com/glue/latest/dg/dqdl.html"],
["Getting started with AWS Glue Data Quality for the Data Catalog", "https://docs.aws.amazon.com/glue/latest/dg/data-quality-getting-started.html"],
["Auto data quality overview (Knowledge Catalog / Dataplex)", "https://cloud.google.com/dataplex/docs/data-quality-overview"],
["Create and run a data quality scan", "https://cloud.google.com/dataplex/docs/use-auto-data-quality"],
["dbt data tests", "https://docs.getdbt.com/docs/build/data-tests"],
["GX Core overview", "https://docs.greatexpectations.io/docs/core/introduction/gx_overview"]
],
cartoes: [
{ id: "a9c1", f: "O que é DQDL?", v: "Data Quality Definition Language: linguagem do AWS Glue para escrever regras de qualidade, agrupadas em Rules = [ ... ].", t: "q5" },
{ id: "a9c2", f: "Como o AWS Glue calcula o data quality score?", v: "É o percentual de regras do ruleset que passam (resultam em verdadeiro) na avaliação.", t: "q5" },
{ id: "a9c3", f: "Quais são os dois pontos de entrada do Glue Data Quality?", v: "O AWS Glue Data Catalog (tabelas já catalogadas) e os jobs de ETL do AWS Glue (checagem proativa, antes de gravar).", t: "q5" },
{ id: "a9c4", f: "Como escrever uma regra de frescor em DQDL?", v: "DataFreshness com coluna de data e expressão com unidade, por exemplo DataFreshness \"Order_Date\" <= 24 hours.", t: "q5" },
{ id: "a9c5", f: "O que acontece com NULL em DataFreshness?", v: "A regra falha para linhas com NULL; para permitir nulo, a doc usa uma regra composta com or e ColumnValues = NULL.", t: "q5" },
{ id: "a9c6", f: "Como o Dataplex chama hoje o produto e o que muda nos comandos?", v: "A doc usa Knowledge Catalog (antes Dataplex Universal Catalog); a API e o gcloud ainda usam dataplex, como gcloud dataplex datascans.", t: "q5" },
{ id: "a9c7", f: "O que é uma SQL assertion no Dataplex?", v: "Regra agregada em que a consulta devolve as linhas inválidas: qualquer linha devolvida faz a regra falhar.", t: "q5" },
{ id: "a9c8", f: "Cite as sete dimensões de regra do Dataplex.", v: "Freshness, Volume, Completeness, Validity, Consistency, Accuracy e Uniqueness.", t: "q5" },
{ id: "a9c9", f: "Por que revisar regras recomendadas?", v: "Elas são geradas a partir dos dados atuais e podem trazer regras indesejadas ou frouxas; a doc manda avaliar e editar.", t: "q5" }
],
questoes: [
{ id: "a9q1", s: 1, t: "q5", e: "Sua equipe grava dados de pedidos em um lake na AWS por jobs do AWS Glue. Hoje dados com chave nula chegam ao lake e só são notados dias depois. Você quer impedir a carga de registros ruins no momento em que o job roda. Qual abordagem do AWS Glue Data Quality atende melhor?", o: ["Avaliar um ruleset na aba Data quality do Catalog toda semana", "Incluir checagens de qualidade dentro do job de ETL, identificando e filtrando registros ruins antes de carregar", "Ligar o modo ADVANCED de recomendação de regras", "Publicar métricas no CloudWatch e olhar o gráfico às segundas"], c: [1], x: "A certa é a segunda: a documentação descreve a qualidade em jobs de ETL como proativa, para identificar e filtrar dado ruim antes de carregá-lo, e é nela que se identifica registros que falharam. A primeira avalia tabelas já catalogadas, depois que o dado chegou, e ainda por cima semanalmente, o que repete o atraso do problema. A terceira só muda como regras são sugeridas, não onde elas bloqueiam a carga. A quarta é observação, não prevenção: métricas mostram a queda, mas não impedem a gravação dos registros." },
{ id: "a9q2", s: 1, t: "q5", e: "Um ruleset DQDL do AWS Glue tem 8 regras. Em uma avaliação, 6 passaram e 2 falharam. Uma colega diz que o score é a média de linhas boas da tabela. Qual é a leitura correta do score segundo a documentação?", o: ["75 por cento, o percentual de regras que passaram", "6, o número de regras aprovadas", "Depende do volume de linhas lidas pela regra mais lenta", "O percentual de linhas da tabela que não violam nenhuma regra"], c: [0], x: "Pela documentação, o data quality score é o percentual de regras que passam quando você avalia um ruleset: 6 de 8 dá 75 por cento. A segunda confunde score com contagem. A terceira inventa uma relação com a lentidão da regra, que não existe na definição. A quarta é o erro mais comum: score mede regras, não linhas; identificar quais linhas falharam é outro recurso, que existe em jobs de ETL. Por isso uma regra crítica e uma trivial pesam igual no score, e vale olhar as falhas individualmente." },
{ id: "a9q3", s: 1, t: "q5", e: "Você precisa de uma regra DQDL que falhe se a coluna Order_Date tiver mais de 24 horas de atraso em relação ao horário atual. Qual regra expressa isso corretamente?", o: ["ColumnValues \"Order_Date\" = 24 hours", "RowCount \"Order_Date\" <= 24", "Freshness \"Order_Date\" < 1 day", "DataFreshness \"Order_Date\" <= 24 hours"], c: [3], x: "DataFreshness avalia a diferença entre o momento atual e os valores de uma coluna de data, com expressão em horas ou dias e unidade obrigatória; o exemplo da doc é exatamente DataFreshness \"Order_Date\" <= 24 hours. ColumnValues compara valores, não idade em relação a agora. RowCount conta linhas e não recebe uma coluna de data. Freshness sozinho não é um tipo de regra da referência. Lembre também que linhas com NULL fazem DataFreshness falhar, a menos que você componha com or." },
{ id: "a9q4", s: 1, t: "q5", e: "Você configurou uma varredura de qualidade no Dataplex (Knowledge Catalog) e precisa de uma regra para garantir que não existam pedidos de clientes inexistentes. Você escreve uma consulta que lista os pedidos sem cliente correspondente. Qual tipo de regra usa uma consulta que devolve as linhas inválidas?", o: ["RangeExpectation", "SQL assertion", "NonNullExpectation", "StatisticRangeExpectation"], c: [1], x: "A SQL assertion é a regra em que a consulta devolve as linhas que violam a regra: qualquer linha devolvida faz a regra falhar, e a doc manda omitir o ponto e vírgula final. RangeExpectation checa se valores estão em um intervalo. NonNullExpectation checa nulos. StatisticRangeExpectation checa se uma estatística (média, mínimo ou máximo) cai em um intervalo. Nenhuma delas expressa a comparação entre duas tabelas por consulta livre." },
{ id: "a9q5", s: 1, t: "q5", e: "Sobre os nomes no Google Cloud: um colega procura 'Dataplex Universal Catalog' na documentação e não acha a página de qualidade de dados. Ao mesmo tempo, o comando que você usa continua sendo gcloud dataplex datascans. Qual explicação está correta?", o: ["O produto foi descontinuado e os comandos vão parar de funcionar", "A qualidade de dados passou a existir só no BigQuery, sem varreduras", "A doc atual chama o produto de Knowledge Catalog (antes Dataplex Universal Catalog), e a API e o gcloud mantêm o nome dataplex", "São produtos diferentes, e dataplex datascans pertence ao Dataplex antigo, sem relação com o Knowledge Catalog"], c: [2], x: "A documentação atual diz que o auto data quality no Knowledge Catalog é o antigo Dataplex Universal Catalog, e a API e os comandos continuam usando dataplex. Por isso há dois nomes para a mesma coisa. A primeira alternativa inventa descontinuação. A segunda ignora que a varredura roda sobre tabelas do BigQuery, mas também de outras fontes suportadas, e continua sendo um DataScan. A quarta separa produtos que a própria doc trata como o mesmo. Moral: ao buscar, tente os dois nomes e confie no comando que a doc mostra." },
{ id: "a9q6", s: 1, t: "q5", e: "Sua equipe já tem testes dbt para a tabela de faturas, rodando no PR, e quer também a nota de qualidade por tabela de todas as 300 tabelas do catálogo, com histórico e alertas, sem montar infraestrutura. Qual combinação é mais sensata?", o: ["Remover os testes dbt e manter só o serviço gerenciado, para ter uma única ferramenta", "Manter dbt para regras que bloqueiam o pipeline no PR e usar o serviço gerenciado para varrer o catálogo, com uma fonte da verdade clara para cada regra", "Copiar as mesmas regras nos dois lugares sem registrar onde cada uma nasceu", "Escrever tudo em SQL manual no Airflow para não depender de nenhum serviço"], c: [1], x: "As duas ferramentas respondem a perguntas diferentes: os testes dbt vivem no repositório e bloqueiam no PR; o serviço gerenciado dá nota, histórico e alerta em escala sem infraestrutura. A primeira opção joga fora o bloqueio no PR. A terceira cria divergência: quando uma regra mudar em um lugar, o outro mentirá. A quarta é o oposto do que o time pediu, porque cria infraestrutura para manter. Combinar com uma fonte da verdade por regra é o caminho; esse critério é prático, não uma exigência da documentação." }
],
lab: {
t: "Regras de qualidade como código: DQDL e SQL equivalente",
custo: "gratuito no caminho principal (local); rodar no AWS Glue ou no Dataplex é opcional e pode gerar cobrança",
tempo: "30 a 40 min",
porque: "Você aprende a escrever regras no formato dos serviços gerenciados e as versiona no Git. As mesmas regras viram SQL que você roda de graça, e a evidência é um arquivo de regras mais uma saída de execução.",
antes: "Você precisa de Python 3 e de um repositório Git. Não executei estes passos; os comandos e a sintaxe vêm da documentação lida, e vale conferir os nomes de tabela com o seu arquivo. Modo A, no Snowfox: escolha uma tabela crítica real em desenvolvimento, escreva as regras só com nomes de colunas (sem dados sensíveis no repositório) e rode no ambiente de dev. Modo B, sem acesso: baixe o arquivo SQLite do Chinook nos releases do repositório lerocha/chinook-database e use a tabela de faturas. Não precisa de conta de nuvem. Na tela, o script imprime uma linha por regra com PASSOU ou FALHOU e o score.",
passos: [
{ t: "Crie o repositório e o arquivo de regras DQDL", cmd: "mkdir qualidade-nuvem && cd qualidade-nuvem && git init && mkdir regras", p: "Crie regras/fatura.dqdl com um Rules = [ ... ] de 4 regras: IsComplete na chave, IsUnique na chave, ColumnValues do total >= 0 e RowCount > 0. Use os nomes reais de colunas do seu caso (modo A) ou do Chinook (modo B; confira com .schema no sqlite3). Comente cada regra com #, dizendo por que ela importa." },
{ t: "Escreva o equivalente em SQL", p: "Crie um script Python (checa.py) que abre o SQLite em modo somente leitura (sqlite3.connect com URI file:...?mode=ro e uri=True, conforme a doc do Python) e, para cada regra, executa uma consulta que conta violações: nulos na chave, chaves repetidas (GROUP BY ... HAVING COUNT(*) > 1), totais negativos e contagem de linhas. A regra passa quando as violações são zero (e a contagem é maior que zero)." },
{ t: "Calcule o score como o Glue faz", p: "No fim do script, imprima uma linha por regra e o score: regras que passaram divididas pelo total de regras, em percentual. É a mesma definição da doc do AWS Glue (percentual de regras que passam). Rode e guarde a saída em evidencias/saida.txt." },
{ t: "Quebre uma regra de propósito", p: "Em uma cópia do banco (nunca no original), insira uma linha com total negativo ou chave nula e rode de novo. O score deve cair e a regra certa deve falhar. Anote a mensagem no mesmo arquivo de evidências. Para o frescor, escreva a regra DataFreshness em DQDL e a consulta equivalente (maior data de atualização comparada com agora), mesmo que o Chinook seja um conjunto histórico e vá falhar." },
{ t: "Opcional (pode gerar custo): rodar no serviço", p: "Somente se você já tem conta e quer testar: no AWS Glue, cole o ruleset no editor de DQDL da tabela catalogada e rode; no Dataplex, crie um scan pelo console. Antes, confira a página de preços do serviço e use uma tabela pequena. Se não quiser gastar, pule este passo: a evidência do caminho gratuito basta." },
{ t: "Commit e evidência", cmd: "git add regras checa.py evidencias && git commit -m \"regras de qualidade DQDL e SQL equivalente\"", p: "Faça o commit e, se usar o GitHub, abra o repositório e guarde o link. Evidência do PDI: o arquivo .dqdl, a saída com o score antes e depois de quebrar a regra." }
],
verificar: "O arquivo .dqdl está versionado, o script imprime o score, e uma regra falha de propósito derruba o score e aponta qual regra falhou.",
limpar: ["Apague a cópia do banco com dados quebrados", "Nunca commite chaves, tokens ou dado sensível; no modo A, só nomes de colunas", "Se rodou no AWS Glue ou no Dataplex, apague os recursos de teste e confira a cobrança"],
erros: [
{ s: "O script diz que a tabela não existe", c: "O nome da tabela do Chinook difere do que você digitou", r: "Abra o banco com o sqlite3 e use .tables e .schema para ver os nomes reais, depois ajuste as consultas." },
{ s: "Erro de sintaxe ao colar o ruleset no console do Glue", c: "DQDL diferencia maiúsculas de minúsculas e exige a lista Rules entre colchetes, com vírgulas", r: "Confira a capitalização (Rules, IsComplete) e se não falta vírgula entre as regras; comentários começam com #." },
{ s: "DataFreshness falha em todas as linhas do Chinook", c: "O banco de exemplo tem datas antigas, e a regra compara com o momento atual", r: "É esperado: use a falha como demonstração, ou teste a regra em uma tabela que você atualiza." },
{ s: "Aviso de escrita em banco somente leitura", c: "Você abriu com mode=ro e tentou inserir a linha ruim no original", r: "Faça a quebra de propósito em uma cópia do arquivo, aberta em modo normal." }
]
}
};
C.dias[10] = {
aula: {
titulo: "CI/CD com GitHub Actions",
resumo: "Como montar um pipeline de integração contínua no GitHub Actions: workflows, eventos, jobs, steps e runners, cache, secrets, permissões do GITHUB_TOKEN, matriz, proteção de branch, OIDC e o risco do pull_request_target.",
simples: {
analogia: "Pense em uma cozinha de restaurante em que ninguém serve um prato novo sem passar pela bancada de conferência. Quando o cozinheiro termina um prato (abre um pull request), um assistente automático confere o prato inteiro: tempero, temperatura, se bate com a receita. Se algo estiver errado, o prato volta, e o garçom nem consegue levá-lo ao salão. O assistente tem um crachá com poderes limitados: só entra na bancada, não na adega. O GitHub Actions é esse assistente: roda as conferências a cada mudança, com um crachá de permissões mínimas, e o repositório só aceita o prato quando todas passam.",
pontos: [
"Workflow é um arquivo YAML em .github/workflows que define o que roda.",
"Evento (como pull_request ou push) dispara o workflow.",
"Um job roda em um runner; os steps do job rodam em ordem.",
"O GITHUB_TOKEN deve ter permissões mínimas, declaradas no arquivo.",
"Required status checks impedem o merge se a verificação falhar."
],
paraQueServe: "Para garantir que todo código de pipeline de dados seja conferido (lint, testes, validação) antes de entrar na branch principal, sem depender de memória humana."
},
glossario: [
{ t: "Workflow", d: "Processo automatizado definido em arquivo YAML na pasta .github/workflows do repositório; roda um ou mais jobs." },
{ t: "Evento", d: "Atividade no repositório que dispara um workflow, como abrir um pull request ou fazer push; também pode ser manual ou agendado." },
{ t: "Job", d: "Grupo de steps que rodam no mesmo runner; jobs rodam em paralelo por padrão, a menos que um dependa de outro com needs." },
{ t: "Runner", d: "Servidor que executa um job; o GitHub oferece runners Linux, Windows e macOS, e você também pode hospedar o seu." },
{ t: "GITHUB_TOKEN", d: "Token temporário que o GitHub cria para o workflow; suas permissões se declaram com a chave permissions." },
{ t: "Required status check", d: "Verificação que precisa estar verde (sucesso, ignorada ou neutra) para o merge em uma branch protegida ser permitido." },
{ t: "OIDC", d: "OpenID Connect: o job pede um token curto e assinado (JWT) e a nuvem o valida, sem chave fixa guardada no GitHub." },
{ t: "Matriz (matrix)", d: "Estratégia que gera um job para cada combinação de variáveis, como versões do Python." }
],
blocos: [
{ t: "As peças do GitHub Actions", facil: "Traduzindo: um evento acorda um workflow; o workflow tem jobs; cada job roda num servidor (runner) e faz steps em ordem.", p: [
"Pela documentação oficial, os componentes são estes. Workflow: processo automatizado que roda um ou mais jobs, definido em YAML na pasta `.github/workflows`. Evento: atividade que dispara o workflow (PR aberto, commit enviado; também manual, agendado ou por API). Job: grupo de steps no mesmo runner; roda em paralelo por padrão, mas pode depender de outro. Step: uma unidade do job, que roda um script de shell ou uma action. Action: conjunto reutilizável de código para uma tarefa. Runner: servidor que executa o job.",
"Guarde a hierarquia: evento, workflow, job, step. Quando algo der errado, a primeira pergunta é em qual nível: o evento nem disparou? O job ficou na fila? Um step específico falhou?"
], tabela: { cab: ["Peça", "Analogia", "Onde aparece"], linhas: [
["Workflow", "Receita completa", "Arquivo YAML em .github/workflows"],
["Evento", "Campainha", "Chave on"],
["Job", "Estação de trabalho", "Chave jobs"],
["Step", "Passo da receita", "Lista steps com run ou uses"],
["Runner", "A bancada", "Chave runs-on"]
] }, fonte: ["Understanding GitHub Actions", "https://docs.github.com/en/actions/get-started/understand-github-actions"] },
{ t: "Eventos: pull_request e push", facil: "Traduzindo: pull_request roda a conferência quando alguém propõe uma mudança; push roda quando o código chega em uma branch.", p: [
"Um evento é declarado em `on`. Para `pull_request`, a documentação diz que por padrão o workflow roda nos tipos de atividade opened, synchronize e reopened (PR aberto, novo commit no PR, PR reaberto). Para `push`, é possível filtrar por branches, tags e caminhos (paths). Se você usar filtros de branch e de caminho no mesmo evento, o workflow só roda quando os dois forem satisfeitos.",
`${F}yaml
on:
  pull_request:
  push:
    branches: [main]
    paths:
      - 'sql/**'
      - 'tests/**'
${F}`,
"No `pull_request`, o código testado é o commit de merge resultante (a referência refs/pull/NUMERO/merge). Detalhe útil: o workflow não roda em PR com conflito de merge. Em PRs de forks, os workflows não rodam por padrão e os secrets não são passados ao runner, com exceção do GITHUB_TOKEN, que tem só leitura."
], armadilha: "Filtro de paths em um workflow que vira required check. A doc de sintaxe diz que, se o workflow é pulado por filtro de caminho, de branch ou por mensagem de commit, seus checks ficam em estado Pending, e um PR que exige esses checks fica bloqueado.", fonte: ["Events that trigger workflows", "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows"] },
{ t: "Um workflow mínimo de lint e testes", facil: "Traduzindo: o arquivo diz quando rodar, em qual servidor, e a lista de passos: baixar o código, instalar Python, instalar dependências, testar.", p: [
"O tutorial oficial de Python mostra o padrão: checkout do repositório, setup-python, instalação de dependências e pytest. O exemplo abaixo adapta esse padrão e acrescenta `permissions` mínimas. As versões das actions (checkout@v6, setup-python@v5) são as que esse tutorial mostra, mas os README dos repositórios das actions mostram @v7 para as duas: confira a versão atual no README de cada action.",
`${F}yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  qualidade:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'
      - run: pip install -r requirements.txt
      - run: sqlfluff lint sql --dialect ansi
      - run: pytest
${F}`,
"Cada step `run` que sai com código diferente de zero faz o job falhar, e o PR mostra um X vermelho. É assim que o lint e os testes viram portão de qualidade."
], dica: "Dê a cada job um nome único e claro: é o nome que você vai marcar como required status check.", fonte: ["Building and testing Python", "https://docs.github.com/en/actions/tutorials/build-and-test-code/python"] },
{ t: "Matriz e jobs em sequência", facil: "Traduzindo: a matriz repete o mesmo job para várias combinações (como versões do Python); needs faz um job esperar outro.", p: [
"Com `strategy.matrix`, o job roda para cada combinação possível das variáveis: duas variáveis, com três e dois valores, geram seis jobs. Os valores são lidos com `${{ matrix.nome }}`. Existem `include` e `exclude` para ajustar combinações, `fail-fast` (cancela jobs em andamento quando um falha) e `max-parallel` para limitar a concorrência.",
`${F}yaml
strategy:
  matrix:
    python-version: ['3.11', '3.12']
steps:
  - uses: actions/setup-python@v5
    with:
      python-version: \${{ matrix.python-version }}
${F}`,
"Para dependência entre jobs existe `needs`, que faz um job esperar outro e roda em sequência. Use matriz quando a diferença entre ambientes importa (versões de Python, de biblioteca). Para pipelines de dados com uma versão fixa em produção, uma combinação só costuma bastar: cada job a mais custa tempo de fila e minutos de runner."
], fonte: ["Running variations of jobs in a workflow", "https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations"] },
{ t: "Cache de dependências", facil: "Traduzindo: o cache guarda o que foi baixado na execução anterior para a próxima ser mais rápida, mas nunca deve guardar segredo.", p: [
"O `actions/cache` usa `key` (obrigatória, identifica a entrada), `path` (o que guardar) e `restore-keys` (chaves alternativas, comparadas por prefixo). Com `hashFiles` na chave, um novo cache é criado só quando o arquivo de dependências muda. Um cache existente não pode ser modificado: para mudar o conteúdo, crie uma chave nova. Para pip, a doc lista o `setup-python` com `cache: 'pip'` como opção que exige pouca configuração; por padrão ele procura um arquivo de dependências (requirements.txt ou pyproject.toml, conforme o README da action).",
"Limites e cuidados da documentação: caches não acessados por mais de 7 dias são removidos; o limite padrão por repositório é de 10 GB; o conteúdo do cache não é assinado nem verificado, então arquivos restaurados que forem executados podem levar a execução de código malicioso. Não guarde segredos ou credenciais em caminhos de cache, porque quem abre um pull request pode ler caches da branch base."
], armadilha: "Cachear o diretório inteiro de trabalho 'para ganhar tempo'. Se um token ou arquivo de credencial estiver lá dentro, ele vira parte do cache.", fonte: ["Dependency caching reference", "https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching"] },
{ t: "Secrets e permissões do GITHUB_TOKEN", facil: "Traduzindo: segredos ficam no cofre do GitHub, entram só onde você pediu, e o token do workflow deve ter o menor poder possível.", p: [
"Segredos podem ser guardados em nível de organização, repositório ou ambiente. A doc diz que o Actions só lê um segredo se você o incluir explicitamente no workflow. Segredos de ambiente podem exigir aprovadores antes de o job acessá-los. O GitHub tenta ocultar valores de segredos nos logs, mas isso não é garantido, porque o valor pode ser transformado. Se um segredo aparecer sem máscara no log, apague o log e troque o segredo.",
"Para o `GITHUB_TOKEN`, use a chave `permissions` no workflow (ou no job). Se você especificar qualquer permissão, as não citadas viram `none`. A página de uso seguro manda dar ao token o mínimo necessário: comece só com leitura de conteúdo e eleve por job quando necessário; reduzir permissões também limita o estrago se o token vazar.",
`${F}yaml
permissions:
  contents: read
  pull-requests: write   # só se o job realmente comentar no PR
${F}`,
"A doc também manda fixar a referência das actions em um SHA de commit, o que reduz o risco de uma tag ou branch comprometida."
], armadilha: "Interpolar texto vindo de PR (título, nome de branch) direto em um script. A doc manda passar o valor por uma variável de ambiente intermediária.", fonte: ["Secure use reference", "https://docs.github.com/en/actions/reference/security/secure-use"] },
{ t: "Proteção de branch e required status checks", facil: "Traduzindo: você marca quais verificações precisam estar verdes; sem elas, o botão de merge fica bloqueado.", p: [
"Em uma regra de proteção de branch, cada required status check precisa reportar sucesso, skipped ou neutral antes que as mudanças cheguem à branch protegida. Os nomes dos jobs precisam ser únicos entre os workflows: nomes duplicados geram resultado ambíguo e podem bloquear PRs. Atenção: se o workflow inteiro é pulado por filtro de paths ou de branch, a doc de sintaxe diz que o check fica Pending e bloqueia o PR.",
"A opção 'Require branches to be up to date before merging' (modo strict, o padrão quando você exige checks) obriga a branch a estar atualizada com a base antes do merge, com mais reconstruções. No modo loose, há menos builds, mas os checks podem falhar após o merge se houver conflito com a base. Por padrão, as restrições não valem para administradores ou papéis com permissão de contornar; existe uma opção para não permitir contornar.",
"Combine as duas partes: o workflow roda lint e testes; a regra da branch exige o job como status check. Sem a regra, o CI vira só sugestão."
], dica: "Cada check vermelho que aparece em um PR deve ter uma mensagem clara de como corrigir; isso diminui a tentação de contornar a proteção.", fonte: ["About protected branches", "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches"] },
{ t: "OIDC: entrar na nuvem sem chave fixa", facil: "Traduzindo: em vez de guardar uma senha da nuvem no GitHub, o job apresenta uma identidade temporária que a nuvem confere.", p: [
"Com OIDC, o provedor OIDC do GitHub emite um JWT assinado para cada job, e o provedor de nuvem o valida antes de dar acesso. A doc explica que, em vez de duplicar credenciais de longa duração como secrets do GitHub, você configura a confiança do lado da nuvem, e o token emitido é válido só para um job e depois expira. A nuvem verifica a claim `sub` (que identifica repositório, branch ou ambiente) contra condições que você define na política de confiança.",
"Para AWS, a doc mostra as permissões do workflow e o uso da action de credenciais:",
`${F}yaml
permissions:
  id-token: write   # necessário para pedir o JWT
  contents: read    # necessário para o checkout
${F}`,
"A política de confiança da função IAM deve limitar o `sub` (por exemplo, a um repositório e uma branch ou ambiente) e o `aud`. A doc exige ao menos uma condição na confiança: sem ela, repositórios não confiáveis poderiam pedir acesso aos seus recursos na nuvem. Para Azure e Google Cloud o princípio é o mesmo; confira a página do provedor na documentação do GitHub."
], armadilha: "Criar a função de nuvem com permissão ampla e confiança aberta. OIDC remove a chave fixa, mas a função continua mandando no que o job pode fazer.", fonte: ["OpenID Connect", "https://docs.github.com/en/actions/concepts/security/openid-connect"] },
{ t: "Por que evitar pull_request_target com código de terceiros", facil: "Traduzindo: esse evento roda com os poderes do repositório base, então rodar o código de um PR nele é entregar a chave para o desconhecido.", p: [
"O `pull_request_target` roda no contexto da branch padrão do repositório base, não do commit de merge do PR. Isso permite tarefas como etiquetar ou comentar PRs de forks. A documentação avisa que rodar código não confiável nesse gatilho pode causar vulnerabilidades, incluindo envenenamento de cache e acesso indevido a permissão de escrita ou segredos. Também orienta a evitar o evento se você precisa construir ou executar o código do pull request.",
"A página de uso seguro reforça: evite o `pull_request_target` quando não for necessário e use `workflow_run` para separar privilégios; workflows com esses gatilhos não devem fazer checkout explícito de código não confiável. Regra prática para seu CI: lint e testes rodam em `pull_request`, sem segredos; qualquer passo que use segredos ou escreva no repositório fica em workflow separado e só trata dados, não código do PR."
], armadilha: "Usar pull_request_target só porque o pull_request não tem acesso aos secrets, e depois fazer checkout do head do PR para testá-lo.", fonte: ["Secure use reference", "https://docs.github.com/en/actions/reference/security/secure-use"] }
],
exemplo: { t: "O PR que falha e depois passa", texto: "Maria cria o repositório de treino com requirements.txt, uma pasta sql e uma pasta tests. Ela adiciona .github/workflows/ci.yml com os passos checkout, setup-python com cache pip, instalação, sqlfluff lint e pytest, com permissions contents: read. Em Settings, nas regras da branch main, marca o job qualidade como required status check. Abre um PR com uma consulta SQL mal formatada: o job fica vermelho, o botão de merge fica bloqueado e o log mostra a linha da violação. Ela corrige a consulta no mesmo PR, o novo commit dispara o workflow (evento synchronize), o job fica verde e o merge é liberado. O link do PR vermelho e depois verde é a evidência." },
prova: [
"Em um PR de pipeline, o CI aponta formatação de SQL errada antes de qualquer pessoa revisar.",
"Alguém propõe guardar a chave da AWS como secret: você sugere OIDC com função de confiança restrita ao repositório.",
"Um colega pede para rodar testes de PRs de fork com pull_request_target: você explica o risco e propõe workflows separados.",
"O build ficou lento: você adiciona cache de pip pelo setup-python."
],
explique: "Explique com suas palavras a diferença entre pull_request e pull_request_target, e por que um required status check só protege a branch se o workflow e a regra existirem juntos.",
checagem: [
"Quais são as peças básicas do GitHub Actions e como se relacionam entre si?",
"Como declarar permissões mínimas para o GITHUB_TOKEN em um workflow?",
"O que a política de confiança do OIDC verifica e por que id-token: write é necessário?",
"Por que não guardar segredos em caminhos de cache?"
]
},
fontes: [
["Understanding GitHub Actions", "https://docs.github.com/en/actions/get-started/understand-github-actions"],
["Workflow syntax for GitHub Actions", "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"],
["Events that trigger workflows", "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows"],
["Dependency caching reference", "https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching"],
["Secure use reference", "https://docs.github.com/en/actions/reference/security/secure-use"],
["Using the GITHUB_TOKEN for authentication", "https://docs.github.com/en/actions/tutorials/authenticate-with-github_token"],
["OpenID Connect in AWS", "https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws"],
["Using secrets in GitHub Actions (conceitos)", "https://docs.github.com/en/actions/concepts/security/secrets"]
],
cartoes: [
{ id: "a10c1", f: "Onde fica o arquivo de um workflow?", v: "Em YAML, na pasta .github/workflows do repositório.", t: "q6" },
{ id: "a10c2", f: "Quais tipos de pull_request disparam o workflow por padrão?", v: "opened, synchronize e reopened: PR aberto, novo commit no PR e PR reaberto.", t: "q6" },
{ id: "a10c3", f: "O que acontece com as permissões não citadas quando você usa a chave permissions?", v: "Se você especificar qualquer permissão, as não especificadas viram none. Use o mínimo necessário, como contents: read.", t: "q6" },
{ id: "a10c4", f: "Como funciona a chave de cache e o hashFiles?", v: "A key identifica o cache; com hashFiles na chave, um novo cache nasce só quando o arquivo de dependências muda.", t: "q6" },
{ id: "a10c5", f: "Qual é o risco de guardar credenciais em caminhos de cache?", v: "O cache não é assinado nem verificado, e quem abre um PR pode ler caches da branch base. Nunca guarde segredos nele.", t: "q6" },
{ id: "a10c6", f: "O que é um required status check?", v: "Verificação que precisa reportar sucesso, skipped ou neutral para permitir o merge na branch protegida; os nomes dos jobs devem ser únicos.", t: "q6" },
{ id: "a10c7", f: "Que permissões o job precisa para usar OIDC com a AWS?", v: "id-token: write (para pedir o JWT) e contents: read (para o checkout), conforme a doc do GitHub.", t: "q6" },
{ id: "a10c8", f: "Por que evitar pull_request_target com código de PR?", v: "Ele roda no contexto da branch padrão, com possível acesso a segredos e escrita; rodar código não confiável nele pode vazar privilégios.", t: "q6" },
{ id: "a10c9", f: "Para que serve strategy.matrix?", v: "Gera um job para cada combinação de variáveis (por exemplo, versões do Python), lidas com matrix.nome.", t: "q6" }
],
questoes: [
{ id: "a10q1", s: 1, t: "q6", e: "Você criou .github/workflows/ci.yml com lint e testes e abriu um PR com erro de formatação. O job ficou vermelho, mas o botão de merge continua habilitado e um colega fez o merge. O que falta configurar no repositório?", o: ["Aumentar o tempo limite do runner", "Trocar o runner para self-hosted", "Adicionar um cache de pip ao workflow", "Uma regra de proteção na branch main que exija o job como required status check"], c: [3], x: "O workflow só roda a verificação; quem impede o merge é a regra de proteção de branch com o job marcado como required status check. Sem a regra, o X vermelho é apenas informativo. O tempo limite do runner não influencia o merge. Um runner self-hosted muda onde o job roda, não se o merge é bloqueado. O cache acelera instalação e não tem efeito de bloqueio. Lembre também que os nomes dos jobs precisam ser únicos para o check não ficar ambíguo." },
{ id: "a10q2", s: 1, t: "q6", e: "Seu workflow publica um comentário no PR com o resultado, mas você quer reduzir o dano caso o GITHUB_TOKEN vaze. O que fazer na definição do workflow?", o: ["Declarar permissions com o mínimo necessário, como contents: read e pull-requests: write apenas no job que comenta", "Deixar sem permissions para herdar o padrão mais amplo", "Guardar o token em um arquivo de cache para reutilizar", "Imprimir o token no log para facilitar a depuração"], c: [0], x: "A chave permissions limita o que o token pode fazer, e a doc recomenda dar apenas o acesso necessário. Elevar só o job que comenta restringe o estrago. Deixar sem declaração depende do padrão do repositório e pode ser mais amplo do que o necessário. Guardar o token em cache o expõe a quem lê caches. Imprimir no log é o oposto de proteção, e a máscara automática de segredos não é garantida." },
{ id: "a10q3", s: 1, t: "q6", e: "O time quer que o workflow na AWS não dependa de uma access key fixa guardada como secret. Você configura uma função IAM com confiança no provedor OIDC do GitHub. Qual par de configurações no workflow é necessário para o job pedir o token?", o: ["secrets: inherit e contents: write", "id-token: write e, para o checkout, contents: read", "pull-requests: write e issues: write", "actions: read e packages: read"], c: [1], x: "Segundo a doc de OIDC com AWS, o workflow precisa de id-token: write (para solicitar o JWT) e contents: read (para o checkout). As demais combinações dão acesso a recursos do GitHub (PRs, issues, pacotes) que não têm relação com pedir o JWT. A segurança vem também da política de confiança da função, que deve restringir o sub e o aud. Sem isso, qualquer workflow que consiga um token poderia tentar assumir a função." },
{ id: "a10q4", s: 1, t: "q6", e: "Um mantenedor propõe usar pull_request_target para rodar os testes de PRs vindos de forks, porque assim os secrets ficam disponíveis. O workflow faria checkout do código do PR e rodaria pytest. Qual é o problema?", o: ["Nenhum: pull_request_target é a forma recomendada de testar forks", "O pytest não funciona em eventos de PR", "O evento roda com o contexto da branch base, e executar código não confiável nele pode expor segredos e permissões de escrita", "O evento só funciona com runners macOS"], c: [2], x: "A doc diz que pull_request_target roda no contexto da branch padrão do repositório base e que executar código não confiável nele pode causar vulnerabilidades, como envenenamento de cache e acesso a escrita ou segredos; recomenda evitá-lo se você precisa construir ou executar o código do PR. A primeira alternativa inverte a orientação. O pytest roda normalmente em qualquer evento. A restrição a macOS é inventada. O caminho seguro é rodar testes em pull_request, sem segredos, e separar tarefas privilegiadas em outro workflow." },
{ id: "a10q5", s: 1, t: "q6", e: "Seu CI instala dependências em todo PR e demora 4 minutos só nisso. Você quer reutilizar o que foi baixado, sem arriscar guardar credenciais. Qual abordagem é adequada?", o: ["Cachear a pasta inteira do workspace, inclusive arquivos .env", "Usar setup-python com cache: 'pip' (ou actions/cache com key baseada em hashFiles do arquivo de dependências), sem segredos nos caminhos", "Desligar o lint para ganhar tempo", "Commitar a pasta site-packages no repositório"], c: [1], x: "A doc lista o setup-python com cache pip como opção de pouca configuração para dependências Python, e a chave com hashFiles renova o cache apenas quando o arquivo de dependências muda. Cachear o workspace inteiro arrisca incluir credenciais, e caches podem ser lidos por quem abre um PR. Desligar o lint tira o portão de qualidade e não resolve a causa. Commitar site-packages polui o repositório e não é prática recomendada. Lembre também que caches não acessados por 7 dias são removidos." },
{ id: "a10q6", s: 1, t: "q6", e: "Você precisa testar um script de dados em Python 3.11 e 3.12 e só continuar se os dois passarem. Qual recurso do workflow gera um job para cada versão sem duplicar o YAML?", o: ["Dois workflows idênticos, com versões diferentes copiadas à mão", "needs, para encadear um job de cada versão", "strategy.matrix com a lista de versões, lida por matrix.python-version", "concurrency com cancel-in-progress"], c: [2], x: "strategy.matrix gera um job para cada combinação de variáveis, e o valor é lido com a expressão matrix.nome, como no tutorial de Python da doc. Copiar o workflow funciona, mas duplica manutenção. needs só define ordem entre jobs, não repete o mesmo job para várias versões. concurrency cancela execuções concorrentes do mesmo grupo e não cria combinações. Se um job da matriz falhar com fail-fast ligado, os demais em andamento podem ser cancelados." }
],
lab: {
t: "CI no PR: lint e testes com PR que falha e depois passa",
custo: "gratuito (repositório de treino; confira os limites de minutos de Actions do seu plano)",
tempo: "30 a 40 min",
porque: "Você cria um portão de qualidade real: um workflow que roda lint e testes em todo PR, com a regra de branch bloqueando o merge. A evidência é o link de um PR que falhou e depois passou.",
antes: "Você precisa de conta no GitHub, Git e Python 3. Não executei estes passos; a sintaxe vem da documentação lida, e as versões das actions podem ter mudado, então confira nas páginas oficiais. Modo A, no Snowfox: aplique ao repositório real em desenvolvimento, em uma branch de teste, sem dados sensíveis nos logs e sem secrets. Modo B, sem acesso: crie um repositório de treino próprio com o banco público Chinook (SQLite) em data/, uma pasta sql com consultas, e tests/ com checagens em pytest. Na tela do PR, você verá o check com bolinha amarela, depois verde ou vermelho.",
passos: [
{ t: "Prepare o repositório de treino", cmd: "mkdir ci-treino && cd ci-treino && git init -b main && mkdir -p sql tests data .github/workflows", p: "Coloque o arquivo SQLite do Chinook em data/ (baixe nos releases do repositório lerocha/chinook-database). Crie requirements.txt com sqlfluff e pytest e uma consulta em sql/receita_por_pais.sql (SELECT bem formatada). Crie tests/test_dados.py que abre o banco em modo leitura e assere, por exemplo, que a tabela de faturas tem linhas." },
{ t: "Escreva o workflow", p: "Crie .github/workflows/ci.yml com o modelo do bloco 'Um workflow mínimo': eventos pull_request e push em main, permissions contents: read, checkout, setup-python com cache pip, instalação, sqlfluff lint sql --dialect ansi e pytest. Confira as versões das actions na doc. No modo A, ajuste os comandos aos lints e testes que o repositório real já tem." },
{ t: "Suba a main e crie a regra de branch", cmd: "git add . && git commit -m \"ci inicial\" && git remote add origin URL && git push -u origin main", p: "No GitHub, em Settings, Branches, crie a regra para main exigindo pull request e o job qualidade como required status check (o nome do job aparece na lista depois da primeira execução). Se o seu plano não oferecer essa regra em repositório privado, confira a documentação e considere tornar o repositório de treino público, já que ele só tem dados públicos." },
{ t: "Abra um PR que falha", cmd: "git checkout -b erro-proposital", p: "Quebre algo de propósito: formate mal a consulta SQL ou faça um teste falhar. Faça push, abra o PR e espere o workflow. Confirme o X vermelho e o botão de merge bloqueado. Tire um print do check falhando e do log da linha com erro." },
{ t: "Corrija e deixe passar", p: "Corrija no mesmo branch, faça novo commit e push (evento synchronize). Quando o check ficar verde, faça o merge. Guarde o link do PR e o print do check verde na pasta evidencias do repositório (sem dados sensíveis)." }
],
verificar: "O PR mostra um check vermelho antes da correção e verde depois, e o merge só foi liberado depois do verde.",
limpar: ["Nunca commite chaves, tokens ou arquivos .env; este lab não usa secrets", "Apague a branch de teste depois do merge", "Se o repositório de treino for público, confira que só tem dados públicos", "Guarde o link do PR como evidência do PDI"],
erros: [
{ s: "O job não aparece na lista de required status checks", c: "O workflow ainda não rodou ao menos uma vez, ou o filtro de eventos não disparou", r: "Rode o workflow em um PR primeiro; depois volte a Settings, Branches e procure o nome do job." },
{ s: "Erro: arquivo requirements.txt não encontrado no passo de cache", c: "O setup-python com cache pip procura um arquivo de dependências (requirements.txt ou pyproject.toml, segundo o README)", r: "Crie o arquivo requirements.txt na raiz; para outros arquivos de dependência, confira as opções de cache na documentação do setup-python." },
{ s: "sqlfluff acusa dialeto desconhecido ou muitos avisos", c: "Falta --dialect ou há regras demais para o seu estilo", r: "Passe --dialect ansi (como na doc) ou rode sqlfluff dialects para ver os disponíveis; ajuste regras com um arquivo .sqlfluff." },
{ s: "O workflow não dispara em PRs de outra pessoa (fork)", c: "Workflows de forks não rodam por padrão e não recebem secrets", r: "Para o treino, use branches do mesmo repositório; só mude essa política conhecendo os riscos." }
]
}
};
C.dias[13] = {
aula: {
titulo: "CI de dados na prática: dbt, Terraform e lint no PR",
resumo: "Como montar o CI de um repositório de dados: dbt build só no que mudou (state:modified+ com defer), Terraform com fmt, init, validate e plan, lint de SQL com SQLFluff, pytest com dados de exemplo e a regra de nunca ler produção a partir do CI.",
simples: {
analogia: "Imagine uma reforma de casa em que, antes de mexer na parede real, o pedreiro faz um teste em uma maquete: confere se o desenho fecha (validate), se a escrita da planta está padronizada (fmt), e só então mostra a lista do que vai mudar (plan). Para o encanamento, ele não precisa derrubar a casa inteira: só testa o trecho que mudou e os cômodos que dependem dele. E nunca abre o registro geral da rua para testar, porque um erro lá afeta o bairro. O CI de dados faz isso: verifica o que mudou, em um ambiente de teste, com dados de exemplo, sem encostar na produção.",
pontos: [
"dbt build roda modelos e testes na ordem do DAG.",
"state:modified+ seleciona o que mudou e seus dependentes; defer usa o manifest da produção para o resto.",
"Terraform no PR: fmt -check, init -backend=false, validate; plan quando houver credenciais seguras.",
"SQLFluff faz o lint de SQL e pytest testa Python com dados de exemplo.",
"O CI não deve escrever em produção e deve ler dela só se isso for uma decisão consciente."
],
paraQueServe: "Para pegar erros de SQL, de infraestrutura e de qualidade no PR, antes de chegarem à produção, com tempo e custo controlados."
},
glossario: [
{ t: "dbt build", d: "Comando que roda modelos, testes, snapshots e seeds na ordem do DAG; um teste que falha em um modelo faz os dependentes serem pulados." },
{ t: "state:modified+", d: "Seletor do dbt que escolhe os nós alterados em relação a um manifest salvo, mais os nós que dependem deles." },
{ t: "--defer e --state", d: "Flags do dbt: --state aponta o manifest de uma execução anterior; --defer resolve referências não selecionadas e não construídas usando esse manifest." },
{ t: "terraform validate", d: "Verifica se a configuração é sintaticamente válida e consistente, sem contatar serviços remotos como estado remoto ou APIs de provedores." },
{ t: "terraform plan", d: "Mostra as mudanças que o Terraform faria, sem aplicá-las; por padrão lê o estado atual dos objetos remotos." },
{ t: "SQLFluff", d: "Linter de SQL modular e extensível, que reporta violações com código de regra, linha e posição." },
{ t: "tmp_path", d: "Fixture do pytest que entrega um diretório temporário único por teste, como objeto pathlib.Path." },
{ t: "Slim CI", d: "Padrão de rodar no CI só o que mudou e seus dependentes, combinando seleção por estado e defer, para economizar tempo e custo." }
],
blocos: [
{ t: "O desenho do CI de dados", facil: "Traduzindo: no PR você roda verificações baratas primeiro (formato, lint, validação) e as caras depois (build, plan), sempre sem tocar na produção.", p: [
"Um bom CI de dados é uma pilha de portões, do mais barato ao mais caro. Primeiro, verificações que não precisam de dados nem de nuvem: formatação, lint de SQL, `terraform fmt` e `terraform validate`. Depois, testes com dados de exemplo (pytest). Por fim, o que precisa de um ambiente de dados: `dbt build` do que mudou e `terraform plan`, que lê o estado real.",
"A regra que dá segurança é separar identidades: o CI de PR usa credenciais de um ambiente de teste, com permissões mínimas, e as credenciais de produção ficam só no processo de deploy. A doc do dbt descreve o mesmo princípio para a plataforma dbt (dbt Cloud), um recurso da plataforma e não do dbt Core: os jobs de CI constroem e testam os modelos afetados em um schema temporário único por PR, apagado quando o PR é fechado ou integrado. Em um repositório com dbt Core e GitHub Actions, você reproduz essa ideia por conta própria: um schema por PR, em um banco de teste, removido depois."
], dica: "Coloque as verificações baratas em jobs separados e as caras com needs: o PR falha rápido e gasta menos.", fonte: ["Continuous integration in dbt", "https://docs.getdbt.com/docs/deploy/continuous-integration"] },
{ t: "dbt build: o comando do CI", facil: "Traduzindo: build faz modelos e testes juntos, na ordem certa; se um teste falha, o que depende dele não roda.", p: [
"O `dbt build` roda modelos, testes (de dados e unitários), snapshots e seeds, na ordem do DAG. Quando um modelo tem testes unitários, eles rodam antes; o modelo só é materializado se passarem, e depois rodam os testes de dados. Se um teste de um modelo upstream falha, os modelos dependentes são pulados. Para um teste não bloquear, configure `severity: warn`.",
`${F}bash
dbt build --select model_a        # roda e testa model_a, mais os testes que dependem só dele
dbt build --select test_type:unit # só testes unitários
${F}`,
"Essa interação com severidade é a base de 'bloqueia versus avisa' (aula 14). Segundo a página da doc, `severity` aceita `error` (padrão) e `warn`, e `error_if` e `warn_if` definem limites por número de linhas que falham, como `error_if: \">1000\"` e `warn_if: \">10\"`. Teste crítico fica como error; teste que investiga tendência fica como warn.",
"Outra flag da página: `--empty` limita refs e sources a zero linhas; o dbt ainda executa o SQL dos modelos no warehouse, mas evita leituras caras, e valida se as dependências constroem."
], fonte: ["dbt build", "https://docs.getdbt.com/reference/commands/build"] },
{ t: "Slim CI: state:modified+ e defer", facil: "Traduzindo: construa só o que mudou e quem depende disso; para o resto, use as tabelas que já existem em outro ambiente.", p: [
"A página de defer da doc define: `--state` aponta um manifest (`manifest.json`) de uma execução anterior, como a de produção; `--defer` diz ao dbt para resolver referências não selecionadas usando esse manifest, se o nó não existir no banco. A página de defer mostra `dbt run --select \"model_b\" --defer --state prod-run-artifacts`. O padrão Slim CI aparece na página de boas práticas do dbt:",
`${F}bash
dbt run -s state:modified+ --defer --state path/to/prod/artifacts
dbt test -s state:modified+ --defer --state path/to/prod/artifacts
${F}`,
"Neste curso, `dbt build --select state:modified+ --defer --state path/to/prod/artifacts` é a adaptação que junta os dois comandos (a mesma página usa `dbt build` com `state:modified+ result:error+ result:fail+`). `state:modified+` seleciona os nós alterados em comparação com o manifest de `--state` mais os que dependem deles. A doc diz que `--state` junto com o método de seleção `state:` é a base do 'Slim CI'. Atenção a este cuidado da própria página: o defer pode misturar ambientes, então confirme que é isso que você quer, principalmente em testes com mais de um pai, como `relationships`.",
"Duas armadilhas documentadas: o dbt sobrescreve `target/manifest.json` ao fazer parsing, então se `--state` apontar para o mesmo `target/`, o estado salvo pode ser apagado; guarde o manifest em outra pasta (por exemplo, `state/`). E `state:modified` detecta mudanças de código e configuração, não dado novo em fontes: serve para PR, não para execuções agendadas."
], armadilha: "Apontar --state para a mesma pasta target/ que o dbt acabou de sobrescrever. O resultado pode ser o aviso 'saved manifest not found' e comportamento não idempotente.", fonte: ["dbt: boas práticas, Slim CI", "https://docs.getdbt.com/best-practices/best-practice-workflows"] },
{ t: "Nunca ler produção no CI: o que isso significa com defer", facil: "Traduzindo: o CI de PR não deve escrever em produção, e ler dela só com uma conta de leitura, de propósito e sabendo o custo.", p: [
"Aqui há uma tensão honesta. O defer, por definição, faz referências não construídas apontarem para objetos do ambiente do manifest (por exemplo, `prod.model_a`). Ou seja, o build do PR passa a ler tabelas de produção. A documentação do dbt chama a atenção para os efeitos colaterais: resultados podem misturar ambientes, e testes com vários pais podem comparar dados entre ambientes.",
"A regra de segurança sugerida nesta trilha (é uma boa prática, não uma frase da documentação): (1) o CI nunca escreve em produção; (2) se usar defer, o CI usa uma conta só de leitura, com acesso restrito às tabelas necessárias; (3) se a política da empresa proíbe ler produção, construa tudo em um schema de teste com dados de exemplo ou amostra. Para dados sensíveis, a opção três costuma ser a mais segura, ao custo de um build maior.",
"O manifest de produção é um arquivo de metadados (`manifest.json`), não os dados. Guardá-lo como artefato é questão de processo: a doc exige apenas que o `--state` aponte para um manifest de execução anterior."
], dica: "Escreva no README do repositório qual identidade o CI usa e o que ela pode ler. Se alguém perguntar, a resposta está documentada.", fonte: ["State comparison caveats", "https://docs.getdbt.com/reference/node-selection/state-comparison-caveats"] },
{ t: "Terraform no PR: fmt, init, validate e plan", facil: "Traduzindo: primeiro confira o formato e a coerência do código; só depois peça o plano, que consulta a infraestrutura real.", p: [
"Os comandos, conforme a documentação do Terraform: `terraform fmt -check` testa se os arquivos já estão formatados sem reescrevê-los (status 0 se estiver correto, diferente de zero caso contrário), e `-diff` mostra as diferenças. `terraform validate` verifica sintaxe e consistência sem contatar serviços remotos, e exige diretório inicializado; para inicializar sem acessar o backend, use `terraform init -backend=false`. O `terraform plan` mostra as mudanças sem aplicá-las e, por padrão, lê o estado atual dos objetos remotos; por isso precisa de credenciais. Para automação, `-input=false` impede perguntas.",
`${F}yaml
- uses: actions/checkout@v4
- uses: hashicorp/setup-terraform@v4
- run: terraform fmt -check
- run: terraform init -backend=false
- run: terraform validate -no-color
${F}`,
"O `plan` completo exige `terraform init` com backend e credenciais de leitura (via OIDC, de preferência, conforme a aula 10). A página da HashiCorp com o fluxo de plano em PR usa o HCP Terraform e comenta o resultado no PR. O passo a passo com `setup-terraform` está no README da action (que mostra setup-terraform@v4 e actions/checkout@v4; o tutorial de Python do GitHub mostra checkout@v6). Versões mudam: confira no README de cada action."
], armadilha: "Rodar terraform apply a partir de PR. O PR só planeja; o apply fica em um processo separado, com aprovação.", fonte: ["terraform validate", "https://developer.hashicorp.com/terraform/cli/commands/validate"] },
{ t: "Lint de SQL com SQLFluff", facil: "Traduzindo: o SQLFluff lê seus arquivos .sql e avisa de estilo e erros comuns, com a linha e o código da regra.", p: [
"O SQLFluff é um linter de SQL extensível. Instala-se com `pip install sqlfluff` e roda-se, conforme a página de primeiros passos, com `sqlfluff lint arquivo.sql --dialect ansi`. Cada violação mostra linha, posição, código da regra e descrição. O dialeto importa: a documentação de configuração indica `sqlfluff dialects` para listar os suportados.",
"A configuração fica em arquivo `.sqlfluff` (ou `setup.cfg`, `tox.ini`, `pyproject.toml`), na seção `[sqlfluff]` (no `pyproject.toml`, `tool.sqlfluff`), onde se define `dialect` e `exclude_rules`. Para projetos dbt, existe o templater `dbt` com `project_dir` configurado, mas isso exige o dbt instalado e configurado; no CI, comece com o templater padrão para arquivos SQL simples e avance depois.",
`${F}ini
[sqlfluff]
dialect = ansi
exclude_rules = ambiguous.column_count, structure.column_order
${F}`,
"Na plataforma dbt, a doc de CI diz que os jobs podem rodar SQLFluff para lint dos arquivos SQL alterados. Rode o lint só nos arquivos que mudaram quando o repositório crescer, para o PR ficar rápido."
], dica: "Combine o lint com o formato acordado pelo time uma única vez, e não discuta estilo em review: deixe o linter reclamar.", fonte: ["SQLFluff: getting started", "https://docs.sqlfluff.com/en/stable/gettingstarted.html"] },
{ t: "pytest com dados de exemplo", facil: "Traduzindo: o teste cria um mini banco com 3 ou 4 linhas, roda a função e confere o resultado, sem tocar em dado real.", p: [
"Com `pytest`, qualquer arquivo `test_*.py` ou `*_test.py` é coletado. A fixture `tmp_path` entrega um diretório temporário único por teste, como `pathlib.Path`. Para banco, o módulo `sqlite3` aceita `\":memory:\"`, um banco que existe só enquanto a conexão estiver aberta, e `?` como parâmetros para valores.",
`${F}python
import sqlite3

def test_total_nao_negativo():
    con = sqlite3.connect(\":memory:\")
    con.execute(\"CREATE TABLE fatura(id INTEGER, total REAL)\")
    con.executemany(\"INSERT INTO fatura VALUES(?, ?)\", [(1, 10.0), (2, 0.0)])
    ruins = con.execute(\"SELECT COUNT(*) FROM fatura WHERE total < 0\").fetchone()[0]
    assert ruins == 0
${F}`,
"Esse formato de teste funciona como as regras de dados: a consulta conta violações e o teste exige zero. Use dados mínimos e sintéticos, com um caso bom e um caso ruim de propósito, para provar que a regra pega o erro. Nunca copie dados reais de clientes para dentro do repositório de testes."
], fonte: ["pytest: tmp_path", "https://docs.pytest.org/en/stable/how-to/tmp_path.html"] },
{ t: "Juntando tudo em um workflow", facil: "Traduzindo: um job rápido de lint e testes, e jobs opcionais de Terraform e dbt que só existem quando o repositório tem essas partes.", p: [
"Um desenho enxuto: o job `lint-testes` roda SQLFluff e pytest em todo PR. O job `terraform` roda `fmt -check`, `init -backend=false` e `validate` quando houver arquivos `.tf` (use filtro de caminho com `paths`). O job `dbt` roda `dbt build --select state:modified+ --defer --state` contra um ambiente de teste, quando houver projeto dbt. Todos com `permissions: contents: read` por padrão e `needs` quando um depende de outro.",
"Marque os jobs como required status checks (aula 10). Registre em um arquivo do repositório as decisões: qual identidade o CI usa, o que ela lê e escreve, de onde vem o manifest de estado. Quem entrar no time depois lê e entende em cinco minutos, e você deixa de ser o único ponto de conhecimento do CI."
], fonte: ["Terraform setup-terraform action", "https://github.com/hashicorp/setup-terraform"] }
],
exemplo: { t: "PR que muda um modelo dbt e um módulo Terraform", texto: "Ana altera o modelo receita_mensal e um módulo Terraform que cria um bucket. O CI roda três jobs. O de lint e testes passa depois que ela corrige um alias sem AS apontado pelo SQLFluff. O job de Terraform roda fmt -check, que falha porque ela esqueceu de formatar; ela roda terraform fmt, faz commit, e o job passa com init -backend=false e validate. O job de dbt roda dbt build com state:modified+ e defer, usando o manifest salvo; apenas receita_mensal e seus dependentes são construídos em um schema de teste, e um teste unique falha em uma coluna. Ana descobre que o novo join duplicava linhas, corrige e o build fica verde. O CI não escreveu nem tocou em nada de produção, e o plano do Terraform só rodou depois de uma revisão." },
prova: [
"O time pede para o CI rodar só o que mudou: você usa dbt build com state:modified+ e defer.",
"Um PR de Terraform sem formatação quebra o CI: você roda terraform fmt e entende por que o fmt -check falhou.",
"Alguém quer testar com dados de produção: você propõe dados de exemplo ou um schema de teste e documenta a decisão.",
"O lint de SQL reclama de um alias: você corrige ou ajusta o .sqlfluff com uma justificativa."
],
explique: "Explique com suas palavras a ordem de verificações de um CI de dados, do mais barato ao mais caro, e como o defer interage com a regra de não ler produção no CI.",
checagem: [
"O que state:modified+ seleciona e o que o --defer faz com o --state?",
"Para que serve terraform init -backend=false e por que o validate precisa de init?",
"Por que o terraform plan precisa de credenciais, mas o validate não?",
"Como um teste pytest com sqlite3 em memória prova que uma regra de dados pega o erro?"
]
},
fontes: [
["Continuous integration in dbt", "https://docs.getdbt.com/docs/deploy/continuous-integration"],
["dbt build", "https://docs.getdbt.com/reference/commands/build"],
["Defer", "https://docs.getdbt.com/reference/node-selection/defer"],
["dbt: boas práticas, Slim CI", "https://docs.getdbt.com/best-practices/best-practice-workflows"],
["State comparison caveats", "https://docs.getdbt.com/reference/node-selection/state-comparison-caveats"],
["terraform validate", "https://developer.hashicorp.com/terraform/cli/commands/validate"],
["terraform fmt", "https://developer.hashicorp.com/terraform/cli/commands/fmt"],
["terraform init", "https://developer.hashicorp.com/terraform/cli/commands/init"],
["terraform plan", "https://developer.hashicorp.com/terraform/cli/commands/plan"],
["Terraform plan em PR com GitHub Actions (HCP Terraform)", "https://developer.hashicorp.com/terraform/tutorials/automation/github-actions"],
["setup-terraform", "https://github.com/hashicorp/setup-terraform"],
["SQLFluff: getting started", "https://docs.sqlfluff.com/en/stable/gettingstarted.html"],
["SQLFluff: configuration", "https://docs.sqlfluff.com/en/stable/configuration/index.html"],
["pytest: tmp_path", "https://docs.pytest.org/en/stable/how-to/tmp_path.html"],
["Python sqlite3", "https://docs.python.org/3/library/sqlite3.html"]
],
cartoes: [
{ id: "a13c1", f: "O que o dbt build executa?", v: "Modelos, testes, snapshots e seeds na ordem do DAG; teste que falha em um nó faz os dependentes serem pulados.", t: "q7" },
{ id: "a13c2", f: "Comando de Slim CI da doc do dbt?", v: "dbt run -s state:modified+ --defer --state path/to/prod/artifacts (e dbt test igual); com dbt build é a adaptação deste curso.", t: "q7" },
{ id: "a13c3", f: "O que --state e --defer fazem?", v: "--state aponta o manifest de execução anterior; --defer resolve referências não selecionadas e inexistentes no banco usando esse manifest.", t: "q7" },
{ id: "a13c4", f: "Por que não apontar --state para a pasta target/?", v: "O dbt sobrescreve target/manifest.json no parsing e o estado salvo pode ser apagado; guarde o manifest em outra pasta.", t: "q7" },
{ id: "a13c5", f: "O que faz terraform fmt -check?", v: "Testa se os arquivos já estão formatados sem reescrever; sai com 0 se estiver correto e não zero caso contrário.", t: "q7" },
{ id: "a13c6", f: "Como validar Terraform sem acessar o backend?", v: "terraform init -backend=false e depois terraform validate; o validate não contata serviços remotos.", t: "q7" },
{ id: "a13c7", f: "O que o terraform plan faz por padrão e qual implicação?", v: "Lê o estado atual dos objetos remotos para propor mudanças; por isso exige credenciais e pode detectar drift.", t: "q7" },
{ id: "a13c8", f: "Como rodar o SQLFluff em um arquivo?", v: "sqlfluff lint arquivo.sql --dialect ansi; a config fica em .sqlfluff na seção [sqlfluff].", t: "q7" },
{ id: "a13c9", f: "O que é a fixture tmp_path do pytest?", v: "Diretório temporário único por função de teste, entregue como pathlib.Path.", t: "q7" }
],
questoes: [
{ id: "a13q1", s: 1, t: "q7", e: "Seu projeto dbt tem 400 modelos e o CI constrói todos em cada PR, levando 50 minutos. Você quer construir só os modelos alterados e seus dependentes, usando o ambiente de referência para o restante. Qual comando aplica o padrão Slim CI da documentação do dbt?", o: ["dbt build --full-refresh", "dbt run --select state:modified+ sem --state", "dbt build --select state:modified+ --defer --state path/to/artifacts", "dbt test --select all"], c: [2], x: "A página de boas práticas do dbt mostra o Slim CI com dbt run e dbt test usando state:modified+ --defer --state; dbt build com as mesmas flags é a forma que junta os dois: o seletor escolhe os nós alterados e seus filhos em comparação com o manifest de --state, e o defer resolve os pais não construídos com esse manifest. A primeira alternativa reconstrói tudo e piora o tempo. A segunda usa state:modified+ sem manifest para comparar, então não tem referência. A quarta nem é um seletor válido para esse objetivo e roda só testes. O manifest vem de uma execução anterior, como a de produção." },
{ id: "a13q2", s: 1, t: "q7", e: "Em um workflow de CI, o job do dbt usa state:modified+ com --state target/. Após o parsing, aparece o aviso de manifest salvo não encontrado e a seleção fica instável. Qual é a causa mais provável segundo a documentação?", o: ["O dbt sobrescreveu target/manifest.json durante o parsing, apagando o estado salvo que estava na mesma pasta", "O Terraform bloqueou o arquivo", "O pytest apagou a pasta", "O SQLFluff corrompeu o manifest"], c: [0], x: "A página de caveats diz que o dbt sobrescreve target/manifest.json durante o parsing; se --state aponta para a mesma pasta target/, o estado salvo pode ser apagado, e a correção é mover o manifest para uma pasta dedicada, como state/, ou usar outro --target-path. As demais alternativas citam ferramentas que não escrevem no manifest do dbt. O sintoma de seleção instável também aparece quando o manifest não é encontrado." },
{ id: "a13q3", s: 1, t: "q7", e: "Você quer validar a configuração Terraform em todo PR sem credenciais de nuvem e sem acessar o backend remoto de estado. Qual sequência atende?", o: ["terraform apply -auto-approve e depois terraform destroy", "terraform plan -refresh=false apenas, com backend remoto ativo", "terraform fmt -check, terraform init -backend=false e terraform validate", "terraform import em cada recurso"], c: [2], x: "fmt -check verifica formatação sem reescrever; init -backend=false inicializa sem acessar o backend; validate checa sintaxe e consistência sem contatar serviços remotos. As alternativas erradas: apply e destroy alteram infraestrutura real, o oposto de validar em PR; plan com -refresh=false ainda precisa do backend e de credenciais para o estado; import muda o estado remoto. Um plan completo é um passo posterior, com credenciais de leitura, e não um substituto para o validate." },
{ id: "a13q4", s: 1, t: "q7", e: "Uma pessoa propõe que o CI de PR rode o terraform plan usando uma chave de administrador de produção guardada como secret, para o plano ficar exato. Qual é a melhor resposta?", o: ["Aceitar: plano exato vale o risco", "Usar credenciais de um papel somente leitura, de preferência obtidas por OIDC, e aplicar só em um processo separado com aprovação", "Trocar por terraform validate e nunca fazer plan", "Guardar a chave no cache do Actions para acelerar"], c: [1], x: "O plan lê o estado real dos objetos remotos, então precisa de credenciais; o risco se reduz com um papel de leitura, sem chave fixa (OIDC, aula 10), e com o apply fora do PR. Uma chave de administrador em PR amplia demais o estrago possível. Abandonar o plan perde a visão de mudança real, embora o validate continue útil. Guardar chave em cache é o pior caminho, porque caches não são assinados e podem ser lidos por quem abre PRs. O ideal é equilibrar exatidão e privilégio mínimo." },
{ id: "a13q5", s: 1, t: "q7", e: "O SQLFluff roda no CI e reclama de dialeto em um repositório com SQL de SQLite. Você não sabe quais dialetos existem. Qual é o caminho correto?", o: ["Desligar o lint", "Colocar dialect = qualquer_coisa no .sqlfluff", "Reescrever todo o SQL em ANSI sem perguntar", "Rodar sqlfluff dialects para listar os suportados e configurar o dialeto na seção [sqlfluff] do .sqlfluff ou com --dialect"], c: [3], x: "A documentação de configuração indica o comando sqlfluff dialects para listar os dialetos suportados e a chave dialect na seção [sqlfluff]; a página de primeiros passos usa --dialect na linha de comando. Desligar o lint tira o portão. Um valor inventado gera erro de dialeto desconhecido. Reescrever SQL sem necessidade muda o comportamento e é trabalho em vão se um dialeto compatível já existe. Se o dialeto não existir na lista, use o mais próximo e documente a escolha." },
{ id: "a13q6", s: 1, t: "q7", e: "Seu teste pytest de uma regra de qualidade (sem nulos na chave) usa uma cópia de uma tabela real de clientes dentro do repositório. Qual melhoria é a mais adequada?", o: ["Manter a cópia: dados reais dão mais confiança", "Criar um sqlite3 em memória (:memory:) com poucas linhas sintéticas, uma boa e uma ruim de propósito, e assertar o resultado", "Aumentar a cópia para 1 milhão de linhas", "Guardar a cópia no cache do Actions"], c: [1], x: "Dados sintéticos mínimos, em um banco em memória que existe só enquanto a conexão está aberta, provam que a regra pega o erro sem expor dado pessoal nem tornar o teste lento. A linha 'ruim' de propósito comprova que o teste falharia se a regra não funcionasse. Manter dados reais no repositório cria risco de privacidade. Aumentar a cópia deixa tudo mais lento sem provar mais. O cache não é lugar de dado sensível, pois não é assinado e pode ser lido por quem abre PR." }
],
lab: {
t: "CI de dados: lint, testes de dados e, quando houver, Terraform e dbt",
custo: "gratuito (repositório de treino; confira os limites de minutos de Actions do seu plano)",
tempo: "30 a 40 min",
porque: "Você amplia o CI da aula 10 com verificações de dados reais: SQLFluff e pytest com checagens de qualidade e, quando o repositório tiver Terraform ou dbt, os jobs correspondentes. A evidência é um PR com checks de dados.",
antes: "Você precisa do repositório da aula 10 com o workflow ci.yml funcionando. Não executei estes passos; a sintaxe vem da documentação lida, então confira versões e nomes. Modo A, no Snowfox: acrescente ao repositório real os jobs que fizerem sentido (Terraform se houver .tf, dbt se houver projeto), usando um ambiente de teste e uma conta com o menor privilégio, sem dados sensíveis em logs. Modo B, sem acesso: use o repositório de treino com o banco público Chinook; as checagens em pytest e o SQLFluff bastam, e Terraform e dbt entram só se você já tiver arquivos desses tipos. Na tela do PR você verá um check por job.",
passos: [
{ t: "Escreva checagens de dados em pytest", cmd: "mkdir -p tests && touch tests/test_qualidade.py", p: "No modo B, abra o Chinook em modo somente leitura (sqlite3.connect com file:data/...?mode=ro e uri=True) e escreva três testes: a tabela de faturas tem linhas, nenhum cliente nulo e nenhum total negativo (confira os nomes reais com .schema). No modo A, escreva testes equivalentes sobre dados de exemplo sintéticos criados em memória, nunca sobre cópia de dado real." },
{ t: "Prove que a checagem pega erro", p: "Crie um segundo teste com sqlite3 em memória (':memory:') com uma linha ruim de propósito e assert que a regra a detecta. Rode pytest localmente e guarde a saída." },
{ t: "Separe os jobs", p: "No ci.yml, deixe o job lint-testes (SQLFluff e pytest). Se houver Terraform, crie o job terraform com hashicorp/setup-terraform, terraform fmt -check, terraform init -backend=false e terraform validate -no-color. Se houver dbt, crie o job dbt com dbt build --select state:modified+ --defer --state, apontando para um manifest guardado fora de target/ e para um ambiente de teste. Sem Terraform nem dbt, mantenha só o job de lint e testes." },
{ t: "Abra um PR com uma violação de dado", cmd: "git checkout -b dados-ruins", p: "Em uma cópia do banco de treino, ou em uma checagem alterada, force uma violação (por exemplo, afirme que não há faturas, ou insira uma linha ruim em um banco temporário). Abra o PR, veja o job de testes falhar e guarde o print do log." },
{ t: "Corrija, passe e registre decisões", p: "Corrija, aguarde o verde e faça o merge. Crie docs/ci.md (curto) com: o que cada job verifica, qual identidade o CI usa, o que ela lê e escreve, e de onde vem o manifest do dbt, se houver. Guarde o link do PR e o arquivo como evidência." }
],
verificar: "O PR mostra um check de dados vermelho com a violação e depois verde, e docs/ci.md descreve identidade e permissões do CI.",
limpar: ["Nunca commite chaves, tokens ou dados sensíveis", "Se criou schema ou recursos de teste na nuvem, apague-os; desligue recursos pagos", "Apague a branch de teste depois do merge"],
erros: [
{ s: "terraform validate falha com provider não instalado", c: "Faltou terraform init (mesmo que com -backend=false) antes do validate", r: "Rode terraform init -backend=false antes; o validate exige diretório inicializado, com plugins e módulos instalados." },
{ s: "dbt: saved manifest not found", c: "O --state aponta para a pasta target/ que o dbt sobrescreveu", r: "Guarde o manifest em outra pasta (por exemplo, state/) ou use outro --target-path." },
{ s: "pytest não encontra os testes", c: "O arquivo não segue o padrão test_*.py ou *_test.py", r: "Renomeie o arquivo ou a função; pytest coleta por esse padrão." },
{ s: "sqlfluff aponta dezenas de violações no SQL antigo", c: "O estilo antigo não segue as regras padrão", r: "Corrija o que fizer sentido e ajuste exclude_rules no .sqlfluff para o resto, anotando o motivo." }
]
}
};
C.dias[14] = {
aula: {
titulo: "Observabilidade, alertas e SLOs de dados",
resumo: "Como observar dados em produção: frescor, volume e esquema como sinais, SLI, SLO e orçamento de erro (livro Google SRE), alertas acionáveis, severidade que bloqueia ou avisa, linhagem com OpenLineage, resposta a incidentes de dados e como medir o impacto da trilha.",
simples: {
analogia: "Pense no painel de um carro. Ele não mostra tudo o que acontece no motor, só poucos sinais que importam: combustível, temperatura, velocidade. E cada luz tem um significado e uma ação: a luz de combustível baixo diz 'abasteça nas próximas horas'; a de temperatura alta diz 'pare agora'. Se o painel acendesse dez luzes todo dia por motivos sem importância, você aprenderia a ignorar todas, inclusive a que importa. Observabilidade de dados é montar esse painel: poucos sinais (a tabela chegou? veio o volume esperado? o formato mudou?), uma meta clara e alertas que dizem quem age, sobre o quê e com qual urgência.",
pontos: [
"Três sinais básicos: frescor, volume e esquema.",
"SLI mede, SLO é a meta, orçamento de erro é quanto se pode falhar.",
"Alerta bom diz quem, o quê, quando e o que fazer.",
"Severidade decide se o problema bloqueia o pipeline ou só avisa.",
"Incidente de dados segue detectar, comunicar, corrigir e aprender."
],
paraQueServe: "Para descobrir problemas de dados antes dos usuários, combinar o que é 'bom o bastante' e provar com números o valor do trabalho de qualidade."
},
glossario: [
{ t: "SLI", d: "Indicador de nível de serviço: medida quantitativa de um aspecto do serviço, como a fração de dias em que a tabela chegou no horário." },
{ t: "SLO", d: "Objetivo de nível de serviço: a meta para um SLI, como 99 por cento dos dias com a tabela atualizada até as 8h." },
{ t: "SLA", d: "Acordo de nível de serviço: contrato que tem consequência explícita quando o objetivo não é cumprido." },
{ t: "Orçamento de erro", d: "Quanto o SLO pode ser descumprido no período; é a margem para falhas e mudanças arriscadas." },
{ t: "Burn rate", d: "Velocidade com que o orçamento de erro é consumido em relação ao SLO; 1 esgota o orçamento exatamente no fim da janela." },
{ t: "Linhagem de dados", d: "Registro de quais jobs leem e geram quais conjuntos de dados, útil para achar a causa de um problema e quem ele afeta." },
{ t: "OpenLineage", d: "Framework aberto para coletar linhagem, com as entidades dataset, job e run, ampliáveis por facets." },
{ t: "Postmortem sem culpa", d: "Análise de um incidente que busca causas contribuintes em sistemas e processos, sem apontar culpados individuais." }
],
blocos: [
{ t: "Três sinais para começar: frescor, volume, esquema", facil: "Traduzindo: a tabela chegou a tempo? veio a quantidade certa de linhas? o formato continua o mesmo?", p: [
"Antes de falar de metas, escolha o que observar. Para dados, três sinais cobrem boa parte dos problemas reais. Frescor: há quanto tempo a tabela foi atualizada. Volume: quantas linhas chegaram em comparação com o normal. Esquema: colunas e tipos continuam como o consumidor espera.",
"As ferramentas gerenciadas usam essa mesma divisão. No Dataplex, toda regra pertence a uma dimensão, e entre as sete estão Freshness e Volume. No AWS Glue Data Quality, a regra DataFreshness mede a idade de uma coluna de data, RowCount verifica o número de linhas, e SchemaMatch compara o esquema do dataset com o de um dataset de referência. O que varia é a ferramenta; o sinal é o mesmo.",
"Comece com um sinal por tabela crítica e acrescente conforme os incidentes mostrarem o que faltou. Tabela sem consumidor não precisa de alerta."
], tabela: { cab: ["Sinal", "Pergunta", "Exemplo de regra"], linhas: [
["Frescor", "A tabela está atualizada?", "DataFreshness \"updated_at\" <= 24 hours (Glue)"],
["Volume", "Chegou a quantidade esperada?", "RowCount > 0, ou contra a média recente com dynamic rules (Glue ETL)"],
["Esquema", "O formato mudou?", "SchemaMatch (Glue) ou teste de colunas esperadas"]
] }, fonte: ["Auto data quality overview (Knowledge Catalog / Dataplex)", "https://cloud.google.com/dataplex/docs/data-quality-overview"] },
{ t: "SLI, SLO e orçamento de erro (livro Google SRE)", facil: "Traduzindo: SLI é o que você mede, SLO é a meta, e o orçamento de erro é o quanto você pode errar sem quebrar a promessa.", p: [
"O livro Site Reliability Engineering, do Google, define: SLI é uma medida quantitativa de um aspecto do nível de serviço. SLO é um objetivo para esse SLI, como um limite ou uma faixa. SLA é o contrato com consequência explícita se o objetivo falhar; se não há consequência, provavelmente você tem um SLO.",
"O orçamento de erro vem da ideia de que insistir em 100 por cento não é realista nem desejável: o orçamento define quanto o SLO pode ser descumprido, e a equipe acompanha esse orçamento no tempo para decidir sobre mudanças arriscadas. Conselhos do capítulo úteis para dados: comece pelas necessidades do usuário, não pelo que é fácil medir; escolha poucos indicadores; mantenha os alvos simples; comece com uma meta mais folgada e aperte depois; e remova SLOs que nunca influenciam decisões."
], dica: "Se ninguém muda o que faz quando o SLO é violado, ele é decoração. Escreva a decisão ligada a ele: o que a equipe faz quando o orçamento acaba.", fonte: ["Service Level Objectives (Google SRE book)", "https://sre.google/sre-book/service-level-objectives/"] },
{ t: "Um SLO de frescor para uma tabela", facil: "Traduzindo: escolha uma tabela, diga até que horas ela deve estar atualizada e em quantos dias do mês aceita falhar.", p: [
"A estrutura é: SLI, alvo e janela. Um exemplo ilustrativo (os números são exemplos seus para ajustar, não da documentação): 'SLI: idade da tabela receita_diaria às 8h. SLO: em 95 por cento dos dias dos últimos 30, a idade é de no máximo 24 horas.' Com 30 dias e 95 por cento, o orçamento de erro é de 1,5 dia por janela, na prática um ou dois dias ruins.",
"Como obter o SLI: um job que, todo dia no horário combinado, mede a idade da tabela (por exemplo, a diferença entre agora e o máximo da coluna de atualização) e grava uma linha em uma tabela de histórico. O SLI do mês é a fração de linhas dentro do limite. Ferramentas como DataFreshness do Glue ou uma regra de Freshness do Dataplex produzem o resultado diário; a conta de SLO é sua.",
"Pergunte ao consumidor da tabela qual atraso quebra o trabalho dele. O SLO nasce dessa resposta, não do tempo atual do pipeline. Comece folgado e aperte quando a equipe estiver confortável, como o livro SRE recomenda."
], armadilha: "Definir o SLO pelo desempenho atual do pipeline. O livro SRE alerta que alvos baseados só no que se consegue hoje podem travar um esforço insustentável.", fonte: ["Service Level Objectives (Google SRE book)", "https://sre.google/sre-book/service-level-objectives/"] },
{ t: "Alertas acionáveis: quem, o quê, quando, o que fazer", facil: "Traduzindo: todo alerta deve levar a uma ação clara; se ninguém sabe o que fazer com ele, ele só gera ruído.", p: [
"O capítulo de monitoramento do livro SRE diz que toda página deve ser acionável, e que alertas barulhentos ensinam as pessoas a ignorá-los. Páginas que se repetem e podem virar script indicam uma causa a corrigir ou automatizar. Questões não urgentes pertencem a painéis ou filas de tickets. Antes de criar um alerta, pergunte se você algum dia o ignoraria, se ele reflete impacto real, se dá para agir agora e se outros alertas já o cobrem.",
"Um modelo de mensagem que responde às quatro perguntas:",
`${F}text
[ALTA] Tabela receita_diaria sem atualização há 26 h (SLO: 24 h)
Quem: dono do pipeline financeiro (plantão de dados)
O quê: o job carga_receita não gravou desde ontem 06:10; painel de receita desatualizado
Quando: desde 06:10; próximo horário previsto 06:10 de hoje
O que fazer: ver o log do job; se falha de origem, avisar #dados-financeiro; runbook: link
${F}`,
"Para alertar sobre o SLO, o Workbook do Google descreve o burn rate: velocidade de consumo do orçamento. Pagine quando o consumo é rápido e abra ticket quando é lento. A tabela do Workbook (exemplo para um SLO de 99,9 por cento) recomenda: página quando 2 por cento do orçamento é consumido em 1 hora (burn rate 14,4) e quando 5 por cento é consumido em 6 horas (burn rate 6), e ticket quando 10 por cento é consumido em 3 dias (burn rate 1); a tabela também usa janelas curtas de 5 minutos, 30 minutos e 6 horas, respectivamente, em conjunto com as longas. Para dados diários, adapte as janelas ao seu ritmo."
], dica: "Revise os alertas uma vez por mês: cada um que ninguém acionou ou que sempre foi ignorado vira candidato a remover ou a mudar de severidade.", fonte: ["Alerting on SLOs (Google SRE workbook)", "https://sre.google/workbook/alerting-on-slos/"] },
{ t: "Severidade: o que bloqueia e o que só avisa", facil: "Traduzindo: se o dado ruim causa dano, o pipeline para; se é só uma suspeita, ele segue e avisa.", p: [
"No dbt, a severidade de um teste é `error` (padrão) ou `warn`, e `error_if` e `warn_if` definem limites pelo número de linhas que falham. Com `severity: error`, o dbt verifica `error_if` primeiro e depois `warn_if`; com `warn`, o dbt ignora `error_if` e só verifica `warn_if`: o teste nunca dá erro, só aviso (a flag `--warn-error` promove avisos a erros). E, no `dbt build`, falha de teste em um modelo faz os dependentes serem pulados; quem não deve bloquear usa `warn`.",
`${F}yaml
data_tests:
  - unique:
      config:
        severity: error
        error_if: \">1000\"
        warn_if: \">10\"
${F}`,
"Uma regra prática: bloqueia o que quebra o consumidor ou gera dano (chave duplicada, valor impossível, tabela vazia). Avisa o que indica tendência (aumento leve de nulos, queda moderada de volume). Registre a decisão por regra, com o dono. Nos serviços gerenciados, o equivalente é o score e o alerta de e-mail abaixo de uma meta, no Dataplex, e as ações em jobs do Glue, que podem parar ou continuar o processamento (a doc diz que regras, e não analyzers, permitem essas ações)."
], armadilha: "Deixar tudo como erro: o time desliga os testes. Deixar tudo como aviso: ninguém olha. Decida por regra.", fonte: ["dbt: severity", "https://docs.getdbt.com/reference/resource-configs/severity"] },
{ t: "Linhagem com OpenLineage", facil: "Traduzindo: linhagem responde 'de onde veio este dado e quem usa'; OpenLineage é um padrão aberto para registrar isso.", p: [
"O OpenLineage é um framework aberto para coletar e analisar linhagem. Seu modelo tem três entidades: dataset, job e run, identificadas por nomes consistentes e enriquecidas por facets. Ele registra metadados de um job durante a execução e emite eventos que vão para um backend configurável. A documentação lista integrações com Apache Airflow, Spark, dbt, Great Expectations e SQL, entre outras, e cita o Marquez como implementação de referência da API.",
"Para observabilidade, a linhagem encurta duas perguntas de incidente: de onde veio o problema (upstream) e quem foi afetado (downstream). Na prática, comece ligando a integração do orquestrador que você já usa e olhe o grafo de uma tabela crítica. O ganho vem de usar a linhagem durante um incidente, não de ter o grafo bonito."
], fonte: ["OpenLineage documentation", "https://openlineage.io/docs/"] },
{ t: "Incidente de dados: detectar, comunicar, corrigir, aprender", facil: "Traduzindo: ache o problema, avise quem usa o dado, conserte, e depois mude o sistema para não acontecer de novo.", p: [
"Detectar: o alerta (ou o usuário) aponta o problema. Quanto mais cedo pelo alerta, menos dano. Comunicar: avise os consumidores afetados com o que se sabe, o que não se sabe e quando haverá novidade; use a linhagem para achar quem avisar. Corrigir: primeiro conter (pausar a publicação, marcar a tabela como não confiável), depois reprocessar. Aprender: um postmortem.",
"O livro SRE descreve a cultura de postmortem sem culpa: buscar causas contribuintes sem apontar indivíduos, supondo boa-fé, porque culpar faz as pessoas esconderem incidentes. Define gatilhos antes do incidente (por exemplo, perda de dados, intervenção do plantão, falha de monitoramento que exigiu descoberta manual). 'Um postmortem não revisado é como se nunca tivesse existido.' Termine com ações com dono e prazo, como adicionar uma regra de frescor que teria detectado o problema."
], fonte: ["Postmortem Culture (Google SRE book)", "https://sre.google/sre-book/postmortem-culture/"] },
{ t: "Medir o impacto da trilha com números verdadeiros", facil: "Traduzindo: conte o que existe de fato (tabelas cobertas, checagens, problemas achados) e deixe vazio o que você não mediu.", p: [
"Para o resumo ao gestor, escolha poucos números que você consegue provar: quantas tabelas críticas têm ao menos uma checagem; quantas checagens existem e quantas rodam automaticamente; quantos problemas reais foram encontrados por elas (com data e link do PR ou do alerta); e, se tiver, quanto tempo levou da ocorrência à detecção.",
"Regras de integridade: conte só o que está no repositório ou nos logs; separe 'problema achado em teste de treino' de 'problema real em tabela real'; nunca arredonde para cima; se não mediu, escreva 'não medido'. Um número pequeno e verdadeiro vale mais que um grande sem prova. Guarde a planilha ou o arquivo de onde cada número saiu."
], dica: "Mantenha um arquivo metricas.csv no repositório com data, tabela, checagem e resultado. O resumo do mês é uma soma desse arquivo." }
],
exemplo: { t: "SLO de frescor da receita diária e um alerta bem escrito", texto: "A equipe de finanças usa a tabela receita_diaria às 8h. Eloabe pergunta ao dono do painel: 'a partir de quanto atraso o painel atrapalha?' A resposta: mais de 24 horas. Ela define: SLI é a idade da tabela às 8h, SLO é 95 por cento dos dias dos últimos 30 com idade de no máximo 24 horas. Um job grava a idade diária em uma tabela de histórico. Em um mês com 3 dias ruins em 30, o SLI é 90 por cento: abaixo do SLO e com o orçamento esgotado. O alerta de severidade alta diz quem age, o que quebrou, desde quando e o que fazer, com link do runbook. No incidente, a linhagem mostra os dois painéis afetados, a equipe avisa os donos, corrige a origem e escreve um postmortem sem culpa com uma ação: alerta de falha do job de carga." },
prova: [
"O gestor pergunta qual é a confiabilidade da tabela mais usada: você responde com o SLI do mês e o SLO combinado.",
"Um alerta acorda alguém de madrugada por algo que podia esperar: você revisa a severidade e o transforma em ticket.",
"Um upstream muda uma coluna e quebra três painéis: você usa a linhagem para saber quem avisar.",
"No fim do trimestre você monta o resumo de impacto com tabelas cobertas, checagens e problemas achados, cada um com prova."
],
explique: "Explique com suas palavras a diferença entre SLI, SLO e orçamento de erro usando uma tabela de dados, e o que torna um alerta acionável.",
checagem: [
"Quais três sinais básicos de observabilidade de dados e uma regra de cada um?",
"O que o orçamento de erro representa e como ele ajuda em decisões?",
"Quais informações uma mensagem de alerta acionável deve conter?",
"Quando uma regra deve bloquear o pipeline e quando só avisar?"
]
},
fontes: [
["Service Level Objectives (Google SRE book)", "https://sre.google/sre-book/service-level-objectives/"],
["Alerting on SLOs (Google SRE workbook)", "https://sre.google/workbook/alerting-on-slos/"],
["Monitoring Distributed Systems (Google SRE book)", "https://sre.google/sre-book/monitoring-distributed-systems/"],
["Postmortem Culture (Google SRE book)", "https://sre.google/sre-book/postmortem-culture/"],
["OpenLineage documentation", "https://openlineage.io/docs/"],
["dbt: severity", "https://docs.getdbt.com/reference/resource-configs/severity"],
["dbt data tests", "https://docs.getdbt.com/docs/build/data-tests"],
["Auto data quality overview (Knowledge Catalog / Dataplex)", "https://cloud.google.com/dataplex/docs/data-quality-overview"],
["DataFreshness (DQDL, AWS Glue)", "https://docs.aws.amazon.com/glue/latest/dg/dqdl-rule-types-DataFreshness.html"]
],
cartoes: [
{ id: "a14c1", f: "Qual é a diferença entre SLI, SLO e SLA?", v: "SLI é a medida, SLO é a meta para essa medida, SLA é o contrato com consequência explícita se a meta falhar.", t: "q8" },
{ id: "a14c2", f: "O que é o orçamento de erro?", v: "O quanto o SLO pode ser descumprido no período; 100 por cento não é realista nem desejável, e o orçamento guia decisões.", t: "q8" },
{ id: "a14c3", f: "Quais são os três sinais básicos de dados desta aula?", v: "Frescor (idade da tabela), volume (quantas linhas) e esquema (colunas e tipos esperados).", t: "q8" },
{ id: "a14c4", f: "O que torna um alerta acionável?", v: "Diz quem age, o que quebrou, desde quando e o que fazer; se ninguém sabe agir, é ruído.", t: "q8" },
{ id: "a14c5", f: "O que é burn rate?", v: "Velocidade de consumo do orçamento de erro em relação ao SLO; burn rate 1 esgota o orçamento exatamente no fim da janela.", t: "q8" },
{ id: "a14c6", f: "Como o dbt separa teste que bloqueia de teste que avisa?", v: "Pela severity (error ou warn) e pelos limites error_if e warn_if, que contam linhas com falha.", t: "q8" },
{ id: "a14c7", f: "Quais são as três entidades do OpenLineage?", v: "Dataset, job e run, identificadas por nomes consistentes e enriquecidas por facets.", t: "q8" },
{ id: "a14c8", f: "Qual é o foco de um postmortem sem culpa?", v: "Achar causas contribuintes em sistemas e processos, supondo boa-fé, e fechar com ações que mudem o sistema.", t: "q8" },
{ id: "a14c9", f: "Que números honestos medem o impacto da trilha?", v: "Tabelas cobertas, checagens existentes e problemas reais encontrados, cada um com prova; o que não foi medido fica como não medido.", t: "q8" }
],
questoes: [
{ id: "a14q1", s: 1, t: "q8", e: "A tabela vendas_dia alimenta um painel que a diretoria abre às 8h. Você precisa transformar 'o painel não pode estar velho' em uma meta mensurável. Qual formulação segue o modelo SLI e SLO?", o: ["Deixar o pipeline o mais rápido possível", "SLI: idade da tabela às 8h. SLO: em 95% dos dias dos últimos 30, a idade é de no máximo 24 horas", "SLA: o time promete 100% de disponibilidade da tabela", "Monitorar todos os 40 campos da tabela"], c: [1], x: "Um SLI é uma medida (idade da tabela no horário de uso) e o SLO é a meta para ela, com alvo e janela. A primeira alternativa não é mensurável. A terceira promete 100%, que o livro SRE descreve como irreal e indesejável, e chama de SLA algo sem contrato com consequência. A quarta cria muitos indicadores, quando o livro recomenda poucos e ligados ao que o usuário valoriza. O alvo de 95% e as 24 horas devem nascer de conversa com o consumidor." },
{ id: "a14q2", s: 1, t: "q8", e: "O alerta atual diz apenas 'ERRO NO JOB 17' e chega para 12 pessoas toda madrugada, a maioria das vezes sem necessidade de ação. Qual mudança deixa o alerta acionável?", o: ["Enviar para ainda mais pessoas", "Aumentar a frequência para a cada minuto", "Mudar o texto para 'ATENÇÃO'", "Informar quem age, o que quebrou, desde quando e o que fazer, e rebaixar a ticket o que não é urgente"], c: [3], x: "O livro SRE diz que toda página deve ser acionável, que alertas barulhentos fazem as pessoas ignorá-los e que o que não é urgente vai para painel ou ticket. Um alerta com dono, impacto, momento e ação orienta a resposta. Enviar para mais gente espalha a responsabilidade e aumenta o ruído. Aumentar a frequência piora a fadiga. Mudar só uma palavra no texto não acrescenta informação nova." },
{ id: "a14q3", s: 1, t: "q8", e: "Um teste dbt de unicidade da chave de pedidos falha com 3 linhas duplicadas em 2 milhões. Você quer avisar quando passar de 10 duplicatas e bloquear o pipeline quando passar de 1000. Qual configuração do dbt expressa isso?", o: ["severity: warn e nenhuma outra configuração", "Desativar o teste e olhar a tabela uma vez por mês", "Rodar o teste só em produção", "severity: error com warn_if: \">10\" e error_if: \">1000\""], c: [3], x: "Segundo a doc, com severity error o dbt avalia error_if e depois warn_if: se o número de linhas com falha satisfaz error_if o teste dá erro (bloqueia); se só satisfaz warn_if, avisa. A primeira alternativa nunca bloquearia. Desativar o teste elimina a detecção. Rodar só em produção afasta a detecção do PR e não define limites. Registre também, por regra, por que cada limite foi escolhido." },
{ id: "a14q4", s: 1, t: "q8", e: "Uma coluna de uma tabela upstream foi renomeada e quebrou três painéis. Você precisa descobrir rapidamente quais consumidores foram afetados para avisá-los. Qual recurso ajuda mais?", o: ["Linhagem de dados, por exemplo coletada com OpenLineage", "Aumentar o cache do CI", "Rodar o SQLFluff", "Aumentar o número de workers do Spark"], c: [0], x: "A linhagem mostra quais jobs leem e geram quais datasets, o que responde 'quem usa isto' (downstream) e 'de onde veio' (upstream). O OpenLineage define dataset, job e run para coletar isso, com integrações a Airflow, Spark e dbt. O cache do CI e o SQLFluff atuam no desenvolvimento, não na descoberta de consumidores. Mais workers do Spark mudam desempenho, não visibilidade. Sem linhagem, a busca vira perguntas no chat." },
{ id: "a14q5", s: 1, t: "q8", e: "Após um incidente em que uma tabela ficou 2 dias sem atualização, a gerência pergunta 'quem errou?'. Qual postura segue a cultura de postmortem do livro SRE?", o: ["Identificar o autor do último commit e puni-lo", "Buscar as causas contribuintes em sistemas e processos, supondo boa-fé, e definir ações com dono e prazo, como um alerta de frescor", "Não escrever nada para evitar conflito", "Arquivar o texto sem revisão"], c: [1], x: "O livro defende postmortem sem culpa: buscar causas contribuintes sem apontar indivíduos, porque culpar faz as pessoas esconderem incidentes, e consertar sistemas e processos. Punir o autor do commit ignora as falhas de sistema, como a ausência de alerta. Não escrever nada perde o aprendizado e é justamente o que o texto desencoraja. Arquivar sem revisão contraria a frase do livro de que um postmortem não revisado é como se nunca tivesse existido." },
{ id: "a14q6", s: 1, t: "q8", e: "Você vai montar o resumo do mês para o gestor. Encontrou 4 tabelas críticas, 2 com checagens, 7 checagens existentes e 1 problema real detectado em um PR de teste de treino. Qual redação é íntegra?", o: ["Cobertura total de qualidade e 15 problemas evitados", "2 de 4 tabelas críticas cobertas, 7 checagens, 1 problema encontrado em teste de treino (não em produção); incidentes reais: não medido", "100% das tabelas cobertas e zero incidentes", "7 problemas reais encontrados, um por checagem"], c: [1], x: "A redação íntegra usa só números comprovados, separa treino de produção e declara o que não foi medido. As outras inventam ou inflam: 'cobertura total' e '15 problemas evitados' não têm base nos dados; '100% e zero incidentes' contradiz a cobertura de 2 de 4; e 'um problema por checagem' confunde checagens existentes com problemas encontrados. Um número pequeno e verdadeiro, com o arquivo de onde veio, é mais valioso que um número grande sem prova." }
],
lab: {
t: "Alerta, SLO de frescor e números reais para o gestor",
custo: "gratuito",
tempo: "30 a 40 min",
porque: "Você produz três coisas que o time usa: um modelo de alerta acionável, um SLO de frescor para uma tabela e um registro de números verdadeiros para o resumo. Cada um vira arquivo no repositório.",
antes: "Você precisa do repositório de treino (ou do real) e de Python 3. Não executei estes passos; as ideias de SLI, SLO e alerta vêm das páginas do Google SRE lidas, e os números do exemplo são ilustrativos para você ajustar. Modo A, no Snowfox: escolha uma tabela crítica real, converse com quem a usa e registre números reais, sem expor dado sensível. Modo B, sem acesso: use o banco público Chinook (SQLite) e crie uma tabela de log de cargas simulada com datas suas, deixando claro no arquivo que os dados são de treino. Na tela, o script imprime o SLI do período e se o SLO foi atendido.",
passos: [
{ t: "Escolha a tabela e pergunte ao consumidor", cmd: "mkdir -p docs observabilidade", p: "Escolha uma tabela. Modo A: uma tabela crítica real; pergunte a quem a usa a partir de qual atraso o trabalho dele é afetado. Modo B: escolha a tabela de faturas do Chinook e invente um cenário com consumidor fictício, registrando que é fictício. Escreva a resposta em docs/slo.md." },
{ t: "Defina SLI, SLO e orçamento de erro", p: "Em docs/slo.md, escreva: SLI (idade da tabela no horário de uso), SLO (alvo e janela, por exemplo 95 por cento dos dias dos últimos 30 com idade de no máximo 24 horas; ajuste ao seu caso), o orçamento de erro em dias, e a decisão que a equipe toma quando o orçamento acaba." },
{ t: "Calcule o SLI com um histórico", p: "Crie observabilidade/historico.csv com colunas data e idade_horas (modo A: valores reais medidos; modo B: valores simulados, marcados como treino). Escreva um script curto em Python que lê o CSV, conta os dias com idade dentro do limite e imprime o percentual e se o SLO foi atendido. Guarde a saída em observabilidade/saida.txt." },
{ t: "Escreva o modelo de alerta", p: "Em docs/alerta.md, use o modelo da aula (severidade e resumo, quem, o quê, quando, o que fazer, link do runbook). Escreva um runbook de cinco linhas: onde olhar o log, quem avisar, como reprocessar, como confirmar que corrigiu. Defina se o alerta bloqueia ou avisa." },
{ t: "Registre os números reais", p: "Crie observabilidade/metricas.csv com tabelas_criticas, tabelas_com_checagem, checagens_existentes e problemas_reais_encontrados, com data e a prova de cada um (link de PR, alerta ou commit). Só números verdadeiros; onde não mediu, escreva 'não medido'. Separe problemas de treino de problemas reais." }
],
verificar: "Existem docs/slo.md, docs/alerta.md, observabilidade/historico.csv com a saída do script e metricas.csv com números comprovados.",
limpar: ["Nunca commite dados sensíveis, nomes de pessoas ou chaves", "Marque como treino tudo o que for simulado", "Se criou alertas em ferramentas pagas, desative os de teste"],
erros: [
{ s: "O SLI deu 100 por cento sempre", c: "O histórico é curto ou o limite de idade é frouxo demais", r: "Aumente a janela e converse com o consumidor para apertar o limite; lembre que o livro SRE sugere começar folgado e apertar depois." },
{ s: "O alerta parece vago", c: "Falta alguma das quatro perguntas (quem, o quê, quando, o que fazer)", r: "Releia o modelo da aula e preencha cada campo; se não houver ação possível, rebaixe a ticket ou remova." },
{ s: "Não há problemas reais para registrar", c: "A tabela ainda não teve incidentes ou as checagens são recentes", r: "Registre zero com a data; não invente. O número de problemas achados pode crescer com o tempo." },
{ s: "A conta de percentual não bate", c: "Há dias faltando no CSV ou uma linha duplicada", r: "Confira se cada dia tem uma única linha e se o total de dias é o da janela." }
]
}
};
})(typeof window !== 'undefined' ? window : globalThis);
