(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
C.dias[13] = {
aula: {
titulo: "Carga de dados: COPY INTO, stages e Snowpipe",
resumo: "Como colocar arquivos dentro de tabelas do Snowflake: subir arquivos para um stage interno, rodar COPY INTO, validar e tratar erros, entender por que rodar de novo não duplica, e quando o Snowpipe e o Snowpipe Streaming entram.",
simples: {
analogia: "Imagine o recebimento de mercadorias de um mercado. O caminhão deixa as caixas na doca (o stage). O conferente abre as caixas, confere cada item contra a lista de compras e guarda nas prateleiras (a tabela). Ele anota num caderno quais caixas já foram guardadas, e por isso, se alguém pedir de novo para guardar a doca inteira, ele só guarda o que ainda não está no caderno. Se uma caixa vem com item estragado, ele decide antes: parar tudo, pular a caixa ou guardar o que presta. O Snowpipe é um conferente de plantão que guarda cada caixa assim que ela chega, sem você pedir. COPY INTO é você mandando o conferente trabalhar agora, em lote.",
pontos: [
"Stage é a doca: um lugar onde os arquivos ficam esperando antes de virar linhas de tabela.",
"COPY INTO é o comando de carga em lote: lê arquivos do stage e insere na tabela.",
"O Snowflake lembra quais arquivos já carregou, então rodar COPY INTO de novo não duplica.",
"Erros são tratados por ON_ERROR e investigados com VALIDATION_MODE ou com a função VALIDATE.",
"Snowpipe carrega sozinho quando o arquivo chega; Snowpipe Streaming recebe linhas, não arquivos."
],
paraQueServe: "Quase todo pipeline começa trazendo dado bruto para dentro do Snowflake. Saber carregar com segurança, sem duplicar e sem perder erro de vista, é a base para as aulas de transformação."
},
glossario: [
{ t: "Stage", d: "Local de preparo para arquivos que serão carregados (ou descarregados). Pode ser interno (dentro do Snowflake) ou externo (S3, GCS, Azure)." },
{ t: "COPY INTO <tabela>", d: "Comando de carga em lote: lê arquivos de um stage e grava as linhas na tabela usando um warehouse." },
{ t: "PUT", d: "Comando que envia arquivos locais para um stage interno. Roda no Snowflake CLI, no SnowSQL ou em drivers, não em qualquer tela." },
{ t: "VALIDATION_MODE", d: "Opção do COPY INTO que só valida os arquivos e devolve os erros, sem carregar nada na tabela." },
{ t: "ON_ERROR", d: "Opção que define o que fazer ao achar erro: CONTINUE, SKIP_FILE ou ABORT_STATEMENT (padrão do COPY em lote)." },
{ t: "Load metadata", d: "Registro por tabela dos arquivos já carregados. É por ele que o COPY pula arquivos repetidos. Expira em 64 dias." },
{ t: "FORCE", d: "Opção que manda carregar arquivos mesmo já carregados, ignorando o registro. Pode duplicar dados." },
{ t: "Snowpipe", d: "Serviço de carga contínua de arquivos, sem warehouse seu: carrega cada arquivo novo conforme ele chega ao stage." },
{ t: "Snowpipe Streaming", d: "Serviço de ingestão de linhas enviadas direto por SDK, API REST ou conector Kafka, para latência baixa, sem arquivos." }
],
blocos: [
{ t: "Stages: a doca antes da prateleira", facil: "Traduzindo: antes de virar tabela, o arquivo precisa estar num stage. Você escolhe entre três tipos de stage interno.", p: [
"Um stage guarda arquivos. O stage interno fica dentro do Snowflake; o externo aponta para um armazenamento seu em nuvem. Para arquivos no seu computador, você usa um stage interno e envia o arquivo com PUT.",
"A doc mostra três tipos de stage interno e como cada um é escrito: o stage de usuário (`@~`), o de tabela (`@%nome_da_tabela`) e o nomeado (`@nome_do_stage`). O nomeado é o mais usado porque pode ser compartilhado e recebe permissões.",
"Para enviar com PUT você usa o Snowflake CLI, o SnowSQL ou um driver; a página do comando PUT diz que ele não roda na página Worksheets. Por padrão o PUT comprime os arquivos (AUTO_COMPRESS), então o nome no stage pode mudar. Para ver o que está no stage, use LIST.",
"```sql\nCREATE STAGE lab_stage ENCRYPTION = (TYPE = 'SNOWFLAKE_SSE');\nLIST @lab_stage;\n```"
], lista: [
"Usuário: `@~`, um por usuário.",
"Tabela: `@%tabela`, um por tabela.",
"Nomeado: `@stage`, objeto de schema, aceita GRANT."
], fonte: ["Staging files using PUT (docs Snowflake)", "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage"], dica: "Na página de criar stage (Creating an internal stage in Snowsight), a doc avisa que, sem criptografia do lado do servidor, os arquivos ficam criptografados no cliente e ilegíveis se baixados. Para laboratório, use SNOWFLAKE_SSE." },
{ t: "Subir arquivo pelo Snowsight (sem instalar nada)", facil: "Traduzindo: se você não quer instalar o SnowSQL, dá para subir o arquivo pela interface web, só para stage nomeado.", p: [
"No Snowsight o caminho é: Ingestion, Add Data, Load files into a Stage. Você escolhe os arquivos, o banco e o schema, o stage e, se quiser, uma pasta dentro do stage, e clica para enviar.",
"A doc lista as condições: tamanho máximo de 250 MB por arquivo; seu papel precisa de USAGE no banco e no schema e de WRITE no stage; e só dá para enviar para stage interno nomeado, não para stage de usuário nem de tabela.",
"Para criar o stage pela interface existe o caminho Create, Stage, Snowflake Managed. Na criação, a doc sugere desmarcar Directory table: ela pode ser ativada depois, mas exige warehouse e gera custo."
], fonte: ["Staging files using Snowsight", "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage-ui"], armadilha: "Botão de upload inativo quase sempre é: stage não é interno, falta privilégio de USAGE ou WRITE, ou outro upload ainda está rodando." },
{ t: "COPY INTO: carga em lote", facil: "Traduzindo: COPY INTO lê os arquivos do stage e insere as linhas. Ele escolhe arquivos por nome, lista ou padrão.", p: [
"A forma básica é COPY INTO tabela FROM stage, com FILE_FORMAT dizendo como ler. Você pode limitar os arquivos com FILES (até 1000 nomes) ou PATTERN (expressão regular). A doc recomenda não usar os dois juntos.",
"O FILE_FORMAT aceita FORMAT_NAME (um objeto de formato já criado) ou TYPE com opções. Os dois juntos podem dar comportamento inesperado, então escolha um.",
"```sql\nCREATE FILE FORMAT csv_fmt TYPE = CSV SKIP_HEADER = 1\n  FIELD_OPTIONALLY_ENCLOSED_BY = '\"';\n\nCOPY INTO pedidos\n  FROM @lab_stage\n  FILES = ('pedidos.csv.gz')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt');\n```",
"Para JSON, o padrão da doc é carregar para uma coluna VARIANT (MATCH_BY_COLUMN_NAME igual a NONE). Com STRIP_OUTER_ARRAY igual a TRUE, um arquivo que é um array JSON vira uma linha por elemento."
], fonte: ["COPY INTO <table>", "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table"], dica: "Confira o nome real do arquivo com LIST antes de usar FILES: o nome no stage pode ter sufixo de compressão." },
{ t: "Erros: ON_ERROR, VALIDATION_MODE e VALIDATE", facil: "Traduzindo: antes de carregar, dá para só testar. Depois de carregar com tolerância a erro, dá para ver as linhas rejeitadas.", p: [
"ON_ERROR define a reação ao erro: CONTINUE (guarda o que presta), SKIP_FILE (pula o arquivo com erro) ou ABORT_STATEMENT, que é o padrão do COPY em lote. A doc avisa que SKIP_FILE precisa ler o arquivo inteiro antes, o que o deixa mais lento.",
"VALIDATION_MODE faz o COPY só validar, sem carregar: RETURN_ERRORS devolve todos os erros de todos os arquivos; RETURN_n_ROWS valida n linhas e falha no primeiro erro. Não funciona em carga com transformação (SELECT no FROM).",
"Depois de uma carga com ON_ERROR igual a CONTINUE, a função VALIDATE mostra o que foi rejeitado, com arquivo, linha e REJECTED_RECORD.",
"```sql\nCOPY INTO pedidos FROM @lab_stage FILES = ('ruim.csv.gz')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt') VALIDATION_MODE = RETURN_ERRORS;\n\nSELECT * FROM TABLE(VALIDATE(pedidos, JOB_ID => '_last'));\n```"
], fonte: ["VALIDATE", "https://docs.snowflake.com/en/sql-reference/functions/validate"], armadilha: "A doc diz que VALIDATE não devolve resultado para COPY com ON_ERROR igual a ABORT_STATEMENT, o padrão. Para usar VALIDATE, a carga precisa ter rodado com CONTINUE ou SKIP_FILE." },
{ t: "Por que rodar de novo não duplica", facil: "Traduzindo: o Snowflake guarda um caderno dos arquivos carregados por tabela. Arquivo igual não entra duas vezes, a menos que você force.", p: [
"A doc explica que o COPY pula arquivos que já carregou na tabela. Esse registro, o load metadata, guarda nome, tamanho, ETag, linhas lidas e erros, e expira depois de 64 dias.",
"O registro guarda também o ETag e a data de modificação do arquivo; se você alterar o arquivo e subir de novo, ele pode ser tratado como arquivo novo (confira na documentação como a alteração é detectada). FORCE igual a TRUE ignora o registro e a doc avisa que isso pode duplicar dados.",
"Se o arquivo é mais antigo que 64 dias, e a primeira carga da tabela também, o status é incerto: o COPY pula por padrão e LOAD_UNCERTAIN_FILES igual a TRUE tenta carregar.",
"PURGE igual a TRUE remove do stage os arquivos carregados com sucesso, mas se a remoção falhar não há erro, então liste o stage de vez em quando."
], fonte: ["Loading data (considerações de carga)", "https://docs.snowflake.com/en/user-guide/data-load-considerations-load"], dica: "Para auditar, COPY_HISTORY (INFORMATION_SCHEMA) lista cada arquivo com STATUS, ROW_COUNT e FIRST_ERROR_MESSAGE, mas só olha os últimos 14 dias." },
{ t: "Histórico de carga e diagnóstico", facil: "Traduzindo: COPY_HISTORY é o extrato da carga: quais arquivos, quantas linhas e qual foi o primeiro erro.", p: [
"A página de troubleshooting manda começar pelo COPY_HISTORY: o STATUS diz se o conjunto de arquivos carregou, carregou parcialmente ou falhou. FIRST_ERROR_MESSAGE mostra só o primeiro erro, então, para ver todos, rode o COPY com VALIDATION_MODE.",
"```sql\nSELECT file_name, status, row_count, row_parsed, first_error_message\nFROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(\n  TABLE_NAME => 'PEDIDOS',\n  START_TIME => DATEADD(hours, -1, CURRENT_TIMESTAMP())));\n```",
"Os valores de STATUS são: Load in progress, Loaded, Load failed, Partially loaded e Load skipped."
], fonte: ["Troubleshooting bulk data loads", "https://docs.snowflake.com/en/user-guide/data-load-bulk-ts"], dica: "Guarde um print do COPY_HISTORY no repositório de portfólio: ele prova carga, erro e não duplicação." },
{ t: "Snowpipe: carga contínua (conceito)", facil: "Traduzindo: o Snowpipe é um serviço que carrega cada arquivo novo sozinho. Ele precisa de armazenamento em nuvem avisando que o arquivo chegou.", p: [
"Um pipe é um objeto que embrulha um COPY INTO. Com AUTO_INGEST igual a TRUE, o Snowpipe carrega cada arquivo quando o armazenamento (S3, GCS ou Azure) avisa que ele chegou. Sem auto-ingest, seu aplicativo chama a API REST com os nomes dos arquivos.",
"A computação é gerenciada pela Snowflake: você não dimensiona nem suspende warehouse. A cobrança, segundo a doc, é um número fixo de créditos por GB carregado, sem cobrança por tempo de warehouse. Para o valor atual, confira a Service Consumption Table.",
"Cada pipe lembra dos arquivos por 14 dias; depois disso, subir o mesmo arquivo de novo pode duplicar. A latência típica é de cerca de um minuto, mas não é garantida.",
"OPCIONAL: este laboratório não cria pipe. A doc exige um stage apontando para armazenamento externo e notificações de eventos configuradas, o que foge do gratuito e simples."
], fonte: ["Snowpipe (visão geral)", "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro"] },
{ t: "Snowpipe Streaming e custo do Snowpipe", facil: "Traduzindo: Snowpipe pega arquivos; Snowpipe Streaming pega linhas direto do seu código, com latência de segundos.", p: [
"O Snowpipe Streaming recebe linhas por SDK (Java, Python, Node.js), API REST ou conector Kafka, sem arquivo intermediário. A doc cita latência de ingestão até consulta a partir de 5 segundos e cobrança por GB não comprimido ingerido.",
"A doc distingue canais elásticos (recomendados para começar, entrega pelo menos uma vez, sem ordem garantida) e canais nomeados (ordem e exatamente uma vez por canal, via offset tokens). Use Snowpipe quando o pipeline já produz arquivos.",
"Para ver o custo do Snowpipe, a doc indica Admin, Cost management no Snowsight ou a view PIPE_USAGE_HISTORY, que pode atrasar até 3 horas."
], fonte: ["Snowpipe Streaming (visão geral)", "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview"], armadilha: "Conta de teste: a doc da conta de teste lista limitações (como acesso externo à rede). Confira a página oficial antes de planejar integração com nuvem externa." }
],
exemplo: { t: "Caso trabalhado: arquivo com uma linha ruim", texto: "A analista tem dois arquivos de pedidos no stage: um limpo, com três linhas, e outro com cinco linhas em que a coluna de valor da quarta linha traz a palavra abc. Primeiro ela roda COPY INTO no arquivo limpo e vê três linhas carregadas. Roda de novo e nada é carregado, porque o arquivo já está no registro. Depois roda o arquivo ruim com VALIDATION_MODE igual a RETURN_ERRORS: a tabela continua com três linhas e a saída mostra o erro, a linha e o registro rejeitado. Então carrega com ON_ERROR igual a CONTINUE: entram as quatro linhas boas e uma é ignorada. Por fim, VALIDATE com o JOB_ID igual a _last devolve a linha rejeitada, que ela corrige na origem. Ela guarda o COPY_HISTORY como evidência de que cada passo ocorreu e de que nada duplicou." },
prova: [
"Entrevista: explique como o COPY INTO evita carregar o mesmo arquivo duas vezes e o que muda com FORCE ou depois de 64 dias.",
"Entrevista: compare COPY INTO em lote, Snowpipe e Snowpipe Streaming e diga quando escolher cada um.",
"Trabalho: investigar uma carga que falhou parcialmente usando COPY_HISTORY, VALIDATION_MODE e VALIDATE, e escolher o ON_ERROR certo para cada tabela."
],
explique: "Explique com suas palavras o caminho de um CSV do seu computador até uma tabela, citando stage, COPY INTO, o que acontece se você rodar duas vezes e como você descobriria uma linha ruim.",
checagem: [
"Qual a diferença entre VALIDATION_MODE e ON_ERROR igual a CONTINUE?",
"Por que o COPY INTO não duplica ao rodar duas vezes e quando isso deixa de valer?",
"Quando faz sentido usar Snowpipe e quando Snowpipe Streaming?",
"Por que o laboratório não cria um pipe e o que a doc exige para o auto-ingest?"
]
},
fontes: [
["COPY INTO <table> (referência)", "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table"],
["Staging files using PUT", "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage"],
["Staging files using Snowsight", "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-stage-ui"],
["Creating an internal stage in Snowsight", "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage"],
["Loading data: considerações e load metadata", "https://docs.snowflake.com/en/user-guide/data-load-considerations-load"],
["VALIDATE (função de tabela)", "https://docs.snowflake.com/en/sql-reference/functions/validate"],
["COPY_HISTORY (INFORMATION_SCHEMA)", "https://docs.snowflake.com/en/sql-reference/functions/copy_history"],
["CREATE FILE FORMAT", "https://docs.snowflake.com/en/sql-reference/sql/create-file-format"],
["Snowpipe (visão geral)", "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro"],
["Custo do Snowpipe", "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-billing"],
["Snowpipe Streaming (visão geral)", "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview"],
["Troubleshooting bulk data loads", "https://docs.snowflake.com/en/user-guide/data-load-bulk-ts"],
["Snowflake trial accounts", "https://docs.snowflake.com/en/user-guide/admin-trial-account"]
],
cartoes: [
{ id: "a13c1", f: "O que é um stage no Snowflake?", v: "Um local de preparo para arquivos que serão carregados ou descarregados. Interno (dentro do Snowflake) ou externo (S3, GCS, Azure).", t: "s3" },
{ id: "a13c2", f: "Como se escrevem os três stages internos?", v: "Usuário: @~ . Tabela: @%nome_da_tabela . Nomeado: @nome_do_stage. O nomeado aceita GRANT e é o mais usado.", t: "s3" },
{ id: "a13c3", f: "Onde roda o comando PUT?", v: "No Snowflake CLI, no SnowSQL ou em drivers. Ele envia arquivos locais para um stage interno. Para a interface web, use o upload do Snowsight.", t: "s3" },
{ id: "a13c4", f: "Limites do upload pelo Snowsight", v: "Máximo de 250 MB por arquivo, só para stage interno nomeado, exige USAGE no banco e schema e WRITE no stage.", t: "s3" },
{ id: "a13c5", f: "Padrão de ON_ERROR no COPY em lote e no Snowpipe", v: "COPY em lote usa ABORT_STATEMENT. Snowpipe usa SKIP_FILE. Outras opções: CONTINUE e SKIP_FILE_num.", t: "s3" },
{ id: "a13c6", f: "O que faz VALIDATION_MODE = RETURN_ERRORS?", v: "O COPY só valida e devolve todos os erros de todos os arquivos, sem carregar nada. Não vale para carga com transformação.", t: "s3" },
{ id: "a13c7", f: "Quando VALIDATE não devolve nada?", v: "Quando o COPY rodou com ON_ERROR = ABORT_STATEMENT (o padrão). Use CONTINUE ou SKIP_FILE para depois investigar com VALIDATE.", t: "s3" },
{ id: "a13c8", f: "Por que COPY INTO repetido não duplica?", v: "O Snowflake guarda load metadata por tabela (nome, tamanho, ETag) e pula arquivos já carregados. Esse registro expira em 64 dias.", t: "s3" },
{ id: "a13c9", f: "O que FORCE = TRUE faz e qual o risco?", v: "Carrega os arquivos mesmo já carregados, ignorando o registro. A doc avisa que pode duplicar dados na tabela.", t: "s3" },
{ id: "a13c10", f: "Como o Snowpipe sabe que chegou arquivo novo?", v: "Com AUTO_INGEST = TRUE, pelo aviso de evento do armazenamento (S3, GCS, Azure). Sem isso, seu código chama a API REST com os nomes.", t: "s3" },
{ id: "a13c11", f: "Como o Snowpipe cobra?", v: "Número fixo de créditos por GB carregado, sem cobrança por tempo de warehouse. Veja o valor atual na Service Consumption Table.", t: "s3" },
{ id: "a13c12", f: "Snowpipe versus Snowpipe Streaming", v: "Snowpipe carrega arquivos que já estão no stage. Streaming recebe linhas direto por SDK, API REST ou Kafka, com latência de segundos.", t: "s3" }
],
questoes: [
{ id: "a13q1", s: 2, t: "s3", e: "Uma analista carrega um CSV de vendas no stage interno e roda COPY INTO. Por engano, executa o mesmo comando uma segunda vez, sem alterar o arquivo e sem opções extras. O que acontece com a tabela?", o: ["As linhas são carregadas em dobro, porque COPY INTO sempre insere tudo", "O arquivo é pulado, porque o Snowflake guarda o registro dos arquivos já carregados na tabela", "O comando falha com erro de chave duplicada", "A tabela é truncada e recarregada do zero"], c: [1], x: "O COPY INTO guarda load metadata por tabela (nome, tamanho, ETag) e, sem FORCE, pula arquivos já carregados, então a segunda execução não insere nada. A alternativa de carregar em dobro descreve o comportamento de FORCE igual a TRUE, não o padrão. Não existe erro de chave duplicada, pois a tabela do exemplo não tem restrição aplicada pelo COPY; e o COPY nunca trunca a tabela sozinho." },
{ id: "a13q2", s: 2, t: "s3", e: "Você quer saber quais linhas de um arquivo estão quebrando a carga, mas não quer inserir nada na tabela de produção ainda. Qual abordagem usar no COPY INTO?", o: ["Rodar com ON_ERROR = CONTINUE e conferir depois", "Rodar com PURGE = TRUE para limpar o stage", "Rodar com FORCE = TRUE para reler o arquivo", "Rodar com VALIDATION_MODE = RETURN_ERRORS", "Criar um Snowpipe para o arquivo"], c: [3], x: "VALIDATION_MODE igual a RETURN_ERRORS valida os arquivos e devolve todos os erros sem carregar nada. ON_ERROR igual a CONTINUE carrega as linhas boas na tabela, o que o enunciado quer evitar. PURGE apaga arquivos carregados do stage e não ajuda a diagnosticar. FORCE apenas ignora o registro de arquivos e pode duplicar dados. Snowpipe exige armazenamento externo e não é uma ferramenta de diagnóstico." },
{ id: "a13q3", s: 2, t: "s3", e: "Depois de uma carga com ON_ERROR = ABORT_STATEMENT (padrão) que falhou, uma engenheira chama SELECT * FROM TABLE(VALIDATE(pedidos, JOB_ID => '_last')) e recebe zero linhas, embora o arquivo tenha erros. Qual a explicação mais provável?", o: ["A carga anterior usou o ON_ERROR padrão (ABORT_STATEMENT), para o qual VALIDATE não devolve resultado", "O VALIDATE só funciona com Snowpipe", "O stage foi apagado pelo PURGE", "A função só devolve erros de arquivos JSON"], c: [0], x: "A doc diz que VALIDATE não devolve resultado para COPY que usou ABORT_STATEMENT, o padrão do COPY em lote. Para investigar, rode a carga com CONTINUE ou SKIP_FILE, ou use VALIDATION_MODE. VALIDATE não depende de Snowpipe, funciona com COPY em lote; o PURGE não foi usado no cenário, e se o stage fosse apagado o resultado indicaria arquivos ausentes, não zero erros; e a função vale para vários formatos, não só JSON." },
{ id: "a13q4", s: 2, t: "s3", e: "Uma equipe tem arquivos Parquet chegando a todo momento em um bucket S3 e quer que cada arquivo vire linhas na tabela em cerca de um minuto, sem ligar warehouse manualmente nem agendar COPY. O que a documentação indica?", o: ["COPY INTO agendado em uma task a cada minuto", "Snowpipe com AUTO_INGEST, usando as notificações de evento do S3", "Snowpipe Streaming com canais nomeados", "Upload manual pelo Snowsight"], c: [1], x: "Snowpipe com AUTO_INGEST igual a TRUE carrega cada arquivo quando o armazenamento avisa que ele chegou, em computação gerenciada, com latência típica de cerca de um minuto (não garantida). Uma task com COPY exige warehouse seu e agenda, o oposto do pedido. Snowpipe Streaming é para linhas enviadas por SDK ou Kafka, não para arquivos já em bucket. O upload manual não é automático e só atende stage interno nomeado." },
{ id: "a13q5", s: 2, t: "s3", e: "Um microsserviço produz eventos linha a linha e a equipe precisa deles consultáveis em poucos segundos, sem gravar arquivos intermediários. Qual serviço de ingestão se encaixa melhor?", o: ["COPY INTO a partir de um stage interno", "Snowpipe com notificação de evento", "Snowpipe Streaming por SDK ou API REST", "PUT seguido de COPY a cada hora"], c: [2], x: "Snowpipe Streaming recebe linhas direto de um SDK, da API REST ou do conector Kafka, e a doc cita latência a partir de 5 segundos sem arquivos intermediários. COPY INTO de stage e PUT com COPY são cargas em lote de arquivos, com latência maior. O Snowpipe tradicional também trabalha com arquivos, só que de forma contínua, então exige gravar arquivos antes e tem latência de cerca de um minuto." },
{ id: "a13q6", s: 2, t: "s3", e: "Um arquivo foi carregado numa tabela em janeiro. Em abril (mais de 64 dias depois) alguém roda COPY INTO de novo com o mesmo arquivo, sem alterá-lo, e sem FORCE. Considerando a doc, qual o risco de entender mal esse cenário?", o: ["O arquivo certamente será carregado em dobro, sempre", "O registro de carga expira em 64 dias; se o status não puder ser determinado, o COPY pula o arquivo por padrão, e LOAD_UNCERTAIN_FILES muda isso", "O COPY nunca consegue pular arquivos depois de 1 dia", "O arquivo é apagado do stage automaticamente"], c: [1], x: "O load metadata expira em 64 dias. Quando o status do arquivo é incerto (data de modificação com mais de 64 dias e carga inicial da tabela também antiga), o COPY pula o arquivo por padrão, e LOAD_UNCERTAIN_FILES igual a TRUE tenta carregar, ainda checando metadados para evitar duplicata. A ideia de que carrega em dobro sempre é falsa; a de que só pula por 1 dia confunde com outros prazos; e o COPY não apaga arquivos do stage a menos que PURGE seja TRUE." }
],
lab: {
t: "Carregar CSV e JSON com COPY INTO, provocar um erro e provar que não duplica",
custo: "Gratuito dentro do saldo da conta de teste (a doc diz que o teste dura 30 dias ou até o saldo acabar e não exige cartão). Usa um warehouse X-Small que liga só para o COPY e suspende em seguida. Confira a página oficial para números atuais.",
tempo: "30 a 45 min",
porque: "Carga é a primeira etapa de qualquer ELT. Provar erro, validação e não duplicação com evidência (COPY_HISTORY) é o que transforma teoria em item de portfólio.",
antes: "Você precisa da conta de teste, de um warehouse X-Small com AUTO_SUSPEND curto e de um banco criados nas aulas 11 e 12. Você vai criar dois arquivos pequenos copiando o texto indicado (dados inventados, sem dado pessoal). Os passos foram conferidos contra a documentação oficial, mas NÃO foram executados: nomes de arquivo no stage, textos de mensagem e telas podem diferir um pouco, então leia o que aparece na tela e use LIST para ver os nomes reais.",
passos: [
{ t: "Preparar schema, stage e formatos", cmd: "USE WAREHOUSE <seu_warehouse_xsmall>;\nCREATE SCHEMA IF NOT EXISTS elt_lab;\nUSE SCHEMA elt_lab;\nCREATE STAGE lab_stage ENCRYPTION = (TYPE = 'SNOWFLAKE_SSE');\nCREATE FILE FORMAT csv_fmt TYPE = CSV SKIP_HEADER = 1;\nCREATE FILE FORMAT json_fmt TYPE = JSON STRIP_OUTER_ARRAY = TRUE;\nCREATE TABLE pedidos (id NUMBER, cliente STRING, valor NUMBER(10,2), data DATE);\nCREATE TABLE eventos (doc VARIANT);", p: "Use o papel e o banco da aula 12. O stage precisa ser interno e nomeado para aceitar upload pelo Snowsight." },
{ t: "Criar os arquivos no seu computador", cmd: "pedidos.csv:\nid,cliente,valor,data\n1,loja_a,10.50,2026-01-05\n2,loja_b,22.00,2026-01-06\n3,loja_a,7.25,2026-01-07\n\npedidos_ruim.csv:\nid,cliente,valor,data\n4,loja_c,abc,2026-01-08\n5,loja_b,9.90,2026-01-09\n\neventos.json:\n[{\"tipo\":\"clique\",\"pagina\":\"home\"},{\"tipo\":\"compra\",\"pagina\":\"carrinho\"}]", p: "Salve como texto simples (UTF-8). Nenhum dado é pessoal: são exemplos inventados." },
{ t: "Subir os arquivos pelo Snowsight", p: "No Snowsight: Ingestion, Add Data, Load files into a Stage. Escolha os três arquivos, o banco, o schema ELT_LAB e o stage LAB_STAGE, e envie. Depois, na planilha SQL, rode LIST @lab_stage; e anote os nomes exatos (podem ter sufixo de compressão).", cmd: "LIST @lab_stage;" },
{ t: "Carregar o CSV bom e provar que repetir não duplica", cmd: "COPY INTO pedidos FROM @lab_stage FILES = ('<nome_do_pedidos.csv_no_stage>')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt');\nSELECT COUNT(*) FROM pedidos;   -- esperado: 3\n\nCOPY INTO pedidos FROM @lab_stage FILES = ('<nome_do_pedidos.csv_no_stage>')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt');\nSELECT COUNT(*) FROM pedidos;   -- continua 3", p: "Na segunda execução o resultado indica que nenhum arquivo novo foi carregado (leia o texto exato). A contagem não muda: o load metadata evitou o arquivo repetido." },
{ t: "Provocar o erro: validar sem carregar, depois carregar com CONTINUE", cmd: "COPY INTO pedidos FROM @lab_stage FILES = ('<nome_do_pedidos_ruim_no_stage>')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt') VALIDATION_MODE = RETURN_ERRORS;\nSELECT COUNT(*) FROM pedidos;   -- ainda 3\n\nCOPY INTO pedidos FROM @lab_stage FILES = ('<nome_do_pedidos_ruim_no_stage>')\n  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt') ON_ERROR = CONTINUE;\nSELECT * FROM TABLE(VALIDATE(pedidos, JOB_ID => '_last'));\nSELECT COUNT(*) FROM pedidos;   -- 4: a linha com abc foi rejeitada", p: "O primeiro COPY só mostra o erro (linha, coluna, registro). O segundo carrega a linha boa e ignora a ruim. VALIDATE com _last lista a linha rejeitada." },
{ t: "Carregar o JSON em VARIANT e consultar", cmd: "COPY INTO eventos FROM @lab_stage FILES = ('<nome_do_eventos.json_no_stage>')\n  FILE_FORMAT = (FORMAT_NAME = 'json_fmt');\nSELECT doc:tipo::STRING AS tipo, doc:pagina::STRING AS pagina FROM eventos;", p: "STRIP_OUTER_ARRAY transforma o array em uma linha por elemento. Esperado: duas linhas." },
{ t: "Registrar a evidência", cmd: "SELECT file_name, status, row_count, row_parsed, first_error_message\nFROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(\n  TABLE_NAME => 'PEDIDOS',\n  START_TIME => DATEADD(hours, -2, CURRENT_TIMESTAMP())));", p: "Tire um print desse resultado e dos dois SELECT COUNT(*). Salve os scripts como 01_setup.sql e 02_carga.sql no repositório snowflake-elt-portfolio." }
],
verificar: "Você deve ver: 3 linhas após o primeiro COPY, 3 depois de repetir, o erro no modo de validação, 4 linhas depois da carga com CONTINUE, a linha rejeitada no VALIDATE, 2 documentos na tabela de eventos e o COPY_HISTORY listando cada arquivo com seu STATUS.",
limpar: [
"Suspenda o warehouse: ALTER WAREHOUSE <seu_warehouse> SUSPEND; e confirme AUTO_SUSPEND curto (ALTER WAREHOUSE <seu_warehouse> SET AUTO_SUSPEND = 60;).",
"Guarde os scripts SQL numerados, um README em inglês e o print no repositório público snowflake-elt-portfolio.",
"NUNCA commite senhas, chaves, tokens, nomes de conta ou dados pessoais. Os arquivos de exemplo são inventados, mas revise antes do commit.",
"Mantenha as tabelas e o stage para a aula 14, ou apague com DROP SCHEMA elt_lab; no final do projeto.",
"Snowpipe é OPCIONAL e não foi criado: não exige limpeza."
],
erros: [
{ s: "COPY falha dizendo que o arquivo não existe", c: "O nome em FILES não bate com o nome real no stage (por exemplo, sufixo .gz)", r: "Rode LIST @lab_stage; e copie o nome exatamente como aparece." },
{ s: "Erro de número de colunas ou de conversão ao carregar o CSV bom", c: "Cabeçalho não foi pulado, ou o arquivo foi salvo com separador diferente", r: "Confirme SKIP_HEADER = 1 no formato e o separador de vírgula; salve o arquivo como texto simples." },
{ s: "VALIDATE devolve zero linhas", c: "O COPY anterior usou ON_ERROR padrão (ABORT_STATEMENT), para o qual VALIDATE não devolve resultado", r: "Recarregue com ON_ERROR = CONTINUE e rode VALIDATE logo depois, na mesma sessão, com JOB_ID => '_last'." },
{ s: "Botão de upload do Snowsight inativo", c: "Stage não é interno nomeado, falta USAGE ou WRITE, ou outro upload em andamento", r: "Crie o stage como interno nomeado, confira os privilégios do papel e espere o upload anterior terminar." }
]
}
};
C.dias[14] = {
aula: {
titulo: "Transformação incremental: streams, tasks e dynamic tables",
resumo: "Como processar só o que mudou: streams registram as mudanças de uma tabela, tasks rodam SQL numa agenda ou quando há dados, e dynamic tables mantêm o resultado atualizado sozinhas. Inclui custo de cada caminho e como suspender tudo.",
simples: {
analogia: "Pense em um caderno de recados na porta da geladeira. Cada vez que alguém compra ou usa algo, escreve um recado. Você não reconta a geladeira inteira toda noite: lê só os recados novos e atualiza a lista de compras, depois risca o que leu. O caderno é o stream: ele só anota o que mudou desde a última vez que você leu. A tarefa de ler os recados todo dia às 20h é a task, e ela pode ter uma regra: só lê se houver recado novo. A dynamic table é uma lista de compras que se atualiza sozinha: você diz o quanto ela pode ficar desatualizada e o Snowflake cuida do resto. Qualquer das três custa se ficar ligada sem necessidade.",
pontos: [
"Stream não guarda dados: guarda um ponto de leitura (offset) sobre uma tabela e mostra o que mudou desde ali.",
"O offset só anda quando o stream é consumido dentro de um comando DML, não quando você apenas faz SELECT.",
"Task roda SQL por agenda; com WHEN SYSTEM$STREAM_HAS_DATA ela só executa se houver mudanças.",
"Dynamic table declara o resultado e o TARGET_LAG; o Snowflake decide quando atualizar.",
"Tasks e dynamic tables gastam crédito de warehouse: suspenda no fim de todo laboratório."
],
paraQueServe: "Pipelines reais não recarregam tudo toda hora. Entender mudança incremental e seu custo é central para o projeto de portfólio ELT incremental e para controlar o saldo da conta de teste."
},
glossario: [
{ t: "Stream", d: "Objeto que registra mudanças (inserts, updates, deletes) de uma tabela, para captura de mudanças. Não contém os dados da tabela." },
{ t: "Offset", d: "Ponto no tempo (versão da tabela) a partir do qual o stream mostra mudanças. Avança quando o stream é consumido em DML." },
{ t: "METADATA$ACTION", d: "Coluna do stream que informa se a mudança registrada foi INSERT ou DELETE." },
{ t: "METADATA$ISUPDATE", d: "Coluna do stream que indica se a mudança veio de um UPDATE. Um update aparece como DELETE mais INSERT, ambos marcados TRUE." },
{ t: "Task", d: "Objeto que executa uma instrução SQL, procedimento ou script, por agenda ou por gatilho. Nasce suspensa." },
{ t: "Task graph (DAG)", d: "Conjunto de tasks com dependências: uma task raiz com agenda e tasks filhas ligadas por AFTER, sem ciclos." },
{ t: "SYSTEM$STREAM_HAS_DATA", d: "Função usada na condição WHEN da task: devolve TRUE se o stream tem mudanças, e a task só roda nesse caso." },
{ t: "Dynamic table", d: "Tabela que materializa o resultado de um SELECT e o mantém atualizado dentro de um TARGET_LAG, usando um warehouse." },
{ t: "TARGET_LAG", d: "Defasagem máxima aceita entre a dynamic table e as tabelas base. O mínimo documentado é 60 segundos; DOWNSTREAM delega aos dependentes." }
],
blocos: [
{ t: "Os três caminhos para transformar só o que mudou", facil: "Traduzindo: você pode montar com peças (stream mais task) ou declarar o resultado e deixar o Snowflake cuidar (dynamic table).", p: [
"Stream mais task dá controle total: você escreve o MERGE ou INSERT, a agenda e a condição. Dynamic table é declarativa: você escreve só o SELECT e o TARGET_LAG.",
"As duas famílias gastam crédito quando rodam. Na task com warehouse, o custo segue o warehouse; na dynamic table, a doc lista computação de warehouse, serviços de nuvem (cloud services) e armazenamento."
], tabela: { cab: ["Abordagem", "Você escreve", "Quem decide quando roda", "Observação da doc"], linhas: [
["Stream mais task", "Lógica de consumo e agenda", "Agenda da task e WHEN", "Task nasce suspensa; precisa de RESUME"],
["Dynamic table", "SELECT, TARGET_LAG, WAREHOUSE", "Snowflake, dentro do lag", "Lag mínimo de 60 segundos"]
] }, fonte: ["Dynamic tables: visão geral", "https://docs.snowflake.com/en/user-guide/dynamic-tables-about"], dica: "Para o portfólio, escolha uma e documente por quê. Quem faz as duas e compara custo e latência mostra mais senso de engenharia." },
{ t: "Streams: captura de mudanças sem copiar dados", facil: "Traduzindo: o stream é um marcador de página sobre a tabela. Ele mostra só o que mudou depois do marcador.", p: [
"A doc define: um stream registra mudanças DML de um objeto de origem e metadados sobre cada mudança. Ele não contém dados da tabela: combina o offset guardado com os metadados de change tracking da tabela.",
"Streams podem ser criados sobre tabelas padrão, views, tabelas dinâmicas, entre outros. Há três tipos: padrão (todas as mudanças), append-only (só inserts, mais eficiente para ELT que depende só de inserts) e insert-only (para tabelas externas).",
"```sql\nCREATE STREAM vendas_stream ON TABLE vendas_origem;\n-- ou, só inserts:\nCREATE STREAM vendas_ins ON TABLE vendas_origem APPEND_ONLY = TRUE;\n```",
"SHOW_INITIAL_ROWS igual a TRUE faz a primeira leitura devolver as linhas que já existiam na criação."
], fonte: ["Introduction to Streams", "https://docs.snowflake.com/en/user-guide/streams-intro"] },
{ t: "Colunas de metadados e como um update aparece", facil: "Traduzindo: cada linha do stream vem com três colunas extras que dizem o que aconteceu e se foi um update.", p: [
"METADATA$ACTION diz INSERT ou DELETE. METADATA$ISUPDATE diz se a mudança veio de um UPDATE. METADATA$ROW_ID é um identificador único e imutável da linha para acompanhar mudanças ao longo do tempo.",
"Um UPDATE na origem aparece como duas linhas: um DELETE e um INSERT, ambos com ISUPDATE igual a TRUE. Como o stream registra a diferença entre offsets, uma linha inserida e depois atualizada antes do consumo aparece só como um INSERT novo, com ISUPDATE igual a FALSE.",
"```sql\nSELECT id, produto, METADATA$ACTION, METADATA$ISUPDATE\nFROM vendas_stream;\n```"
], fonte: ["Introduction to Streams", "https://docs.snowflake.com/en/user-guide/streams-intro"], armadilha: "Contar linhas do stream sem olhar METADATA$ACTION conta um update duas vezes. Em MERGE, trate DELETE e INSERT de update como um par." },
{ t: "Offset: quando o marcador anda e quando o stream fica velho", facil: "Traduzindo: só olhar o stream não move o marcador. Ele só anda quando você o usa em um comando que grava dados.", p: [
"Consultar o stream não move o offset. Ele avança quando o stream é usado em uma transação DML, como CTAS, COPY INTO para um local de armazenamento, INSERT ... SELECT ou MERGE (a página cita os dois primeiros de forma explícita; os outros são DML do mesmo tipo). Dentro de uma transação, todas as consultas ao stream veem os mesmos registros.",
"Um stream fica stale (velho) quando o offset sai do período de retenção de dados da origem; aí é preciso recriá-lo. Se a retenção for menor que 14 dias e o stream não foi consumido, a Snowflake estende a retenção temporariamente, até o limite padrão de 14 dias (MAX_DATA_EXTENSION_TIME_IN_DAYS). DESCRIBE STREAM e SHOW STREAMS mostram STALE_AFTER.",
"SYSTEM$STREAM_HAS_DATA devolve FALSE em stream vazio e, segundo a doc, mantém o stream de ficar stale."
], fonte: ["Introduction to Streams", "https://docs.snowflake.com/en/user-guide/streams-intro"], dica: "Para zerar o offset sem processar, a doc cita recriar o stream com CREATE OR REPLACE." },
{ t: "Tasks: agenda, WHEN e o início suspenso", facil: "Traduzindo: task é um agendador dentro do Snowflake. Nasce desligada e você liga com RESUME.", p: [
"Uma task executa um SQL, procedimento ou script. Ela pode usar warehouse seu (você coloca WAREHOUSE) ou computação serverless (você omite o parâmetro e a Snowflake dimensiona).",
"A agenda usa SCHEDULE com intervalo (por exemplo, '1 MINUTE') ou cron com fuso. Uma execução em andamento faz a próxima ser pulada. A condição WHEN é checada no disparo: se for falsa, a execução é pulada. Segundo a página de CREATE TASK, avaliar o WHEN não exige computação, mas cada avaliação sem execução ainda gera uma pequena cobrança de cloud services, então ajuste a agenda à chegada real dos dados.",
"```sql\nCREATE TASK consome_vendas\n  WAREHOUSE = meu_wh\n  SCHEDULE = '1 MINUTE'\n  WHEN SYSTEM$STREAM_HAS_DATA('vendas_stream')\n  AS INSERT INTO vendas_dest SELECT id, produto FROM vendas_stream;\n\nALTER TASK consome_vendas RESUME;\n```",
"Criar tasks exige CREATE TASK no schema; executar exige o privilégio EXECUTE TASK no nível da conta."
], fonte: ["CREATE TASK", "https://docs.snowflake.com/en/sql-reference/sql/create-task"], armadilha: "Tasks que falham várias vezes seguidas se suspendem sozinhas (SUSPEND_TASK_AFTER_NUM_FAILURES, padrão 10). Confira o estado antes de achar que a task está rodando." },
{ t: "Árvore de tasks (DAG)", facil: "Traduzindo: uma task raiz tem a agenda; as filhas rodam depois dela, em ordem, com AFTER.", p: [
"Um task graph tem uma task raiz e filhas dependentes, sem ciclos. A agenda fica só na raiz. Filhas com o mesmo pai rodam em paralelo; uma filha com vários pais espera todos terem sucesso. Um finalizer opcional roda no fim, tenha o grafo sucedido ou falhado.",
"Para alterar uma task de um grafo agendado, suspenda a raiz primeiro. Para ligar tudo, resuma as filhas e depois a raiz, ou use SYSTEM$TASK_DEPENDENTS_ENABLE na raiz.",
"```sql\nCREATE TASK raiz SCHEDULE = '1 MINUTE' AS SELECT 1;\nCREATE TASK filha AFTER raiz AS SELECT 1;\nALTER TASK filha RESUME;\nALTER TASK raiz RESUME;\n-- para parar:\nALTER TASK raiz SUSPEND;\n```"
], fonte: ["Task graphs", "https://docs.snowflake.com/en/user-guide/tasks-graphs"] },
{ t: "Dynamic tables: TARGET_LAG e modos de refresh", facil: "Traduzindo: você escreve o SELECT e diz o quão fresca a tabela precisa ser. O Snowflake decide quando atualizar.", p: [
"A dynamic table materializa um SELECT e o mantém dentro do TARGET_LAG, em tempo ('10 minutes') ou DOWNSTREAM. O mínimo é 60 segundos. O WAREHOUSE é obrigatório e executa cada refresh.",
"REFRESH_MODE: INCREMENTAL processa só o que mudou; FULL recalcula tudo; AUTO escolhe na criação, e não reavalia depois. A doc lista também ADAPTIVE e CUSTOM_INCREMENTAL. O modo não muda com ALTER: é preciso recriar. Para ver o modo escolhido, use SHOW DYNAMIC TABLES e leia refresh_mode e refresh_mode_reason.",
"```sql\nCREATE DYNAMIC TABLE vendas_por_produto\n  TARGET_LAG = '1 minute'\n  WAREHOUSE = meu_wh\n  REFRESH_MODE = AUTO\n  AS SELECT produto, SUM(qtd) AS total FROM vendas_origem GROUP BY produto;\n```",
"A página de CREATE DYNAMIC TABLE diz que o change tracking precisa estar habilitado em todos os objetos base. Ela não diz se o Snowflake o liga sozinho para a dynamic table: se der erro, habilite conforme a doc (ALTER TABLE ... SET CHANGE_TRACKING = TRUE).",
"Para parar: ALTER DYNAMIC TABLE vendas_por_produto SUSPEND; para voltar, RESUME; para forçar uma atualização, REFRESH."
], fonte: ["CREATE DYNAMIC TABLE", "https://docs.snowflake.com/en/sql-reference/sql/create-dynamic-table"], dica: "A página de refresh das dynamic tables sugere o refresh incremental como diretriz de desempenho quando menos de 5 por cento dos dados da tabela base mudam entre refreshes, e diz que o Snowflake nunca troca de modo sozinho por volume de mudança." },
{ t: "Custo de cada abordagem e como suspender", facil: "Traduzindo: tudo que roda sozinho gasta crédito. Suspenda tasks, dynamic tables e o warehouse quando terminar.", p: [
"Stream: o custo principal é o processamento de warehouse ao consultá-lo; retenção estendida gera armazenamento, e as colunas escondidas de change tracking ocupam pouco espaço. Criar vários streams no mesmo objeto é barato, pois cada um guarda só um offset.",
"Task: com warehouse, custo do warehouse; serverless, cobrança pelo uso real de computação. A doc recomenda rodar menos vezes e usar tasks disparadas por condição.",
"Dynamic table: warehouse a cada refresh, cloud services (mais com lag curto) e armazenamento.",
"Para medir, use a view SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY: ela tem CREDITS_USED e pode atrasar até 3 horas, e os créditos de cloud services até 6 horas. Por isso a medição é feita horas depois e não na hora."
], fonte: ["WAREHOUSE_METERING_HISTORY (Account Usage)", "https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history"], armadilha: "Esquecer uma task retomada com SCHEDULE de 1 minuto gasta crédito sem você ver. Verifique com SHOW TASKS e SHOW DYNAMIC TABLES no fim." }
],
exemplo: { t: "Caso trabalhado: vendas por produto em duas versões", texto: "Uma tabela de vendas recebe linhas novas o dia todo e o time quer o total por produto sempre atualizado. Na primeira versão, a engenheira cria um stream append-only sobre a tabela e uma task com warehouse X-Small, agenda de 1 minuto e condição WHEN SYSTEM$STREAM_HAS_DATA, que faz um MERGE somando as linhas novas no total. Quando o stream está vazio, a task é pulada e o histórico mostra o estado SKIPPED. Na segunda versão, ela apaga tudo isso e cria uma dynamic table com TARGET_LAG de 1 minuto e o mesmo SELECT agregado. Nos dois casos ela insere linhas, espera alguns minutos, confere o resultado, suspende tudo e, algumas horas depois, soma os créditos do warehouse para comparar as abordagens e registrar o custo no README." },
prova: [
"Entrevista: explique como um stream sabe o que mudou, quando o offset avança e o que torna um stream stale.",
"Entrevista: compare stream mais task com dynamic table em controle, latência e custo, e diga quando escolher cada um.",
"Trabalho: desenhar um pipeline incremental que só gasta crédito quando há dados novos, com WHEN SYSTEM$STREAM_HAS_DATA e suspensão documentada."
],
explique: "Explique com suas palavras como um stream, uma task com WHEN e um warehouse X-Small juntos processam só as linhas novas, e o que você faria no fim do dia para não gastar crédito.",
checagem: [
"O que acontece com o offset de um stream quando você apenas faz SELECT nele?",
"Como um UPDATE na tabela de origem aparece dentro de um stream padrão?",
"Por que uma task criada com SCHEDULE não executa até você rodar ALTER TASK RESUME?",
"Quais custos uma dynamic table gera e por que o TARGET_LAG afeta o custo?"
]
},
fontes: [
["Introduction to Streams", "https://docs.snowflake.com/en/user-guide/streams-intro"],
["CREATE STREAM", "https://docs.snowflake.com/en/sql-reference/sql/create-stream"],
["Introduction to Tasks", "https://docs.snowflake.com/en/user-guide/tasks-intro"],
["Task graphs", "https://docs.snowflake.com/en/user-guide/tasks-graphs"],
["CREATE TASK", "https://docs.snowflake.com/en/sql-reference/sql/create-task"],
["TASK_HISTORY (INFORMATION_SCHEMA)", "https://docs.snowflake.com/en/sql-reference/functions/task_history"],
["Dynamic tables: visão geral", "https://docs.snowflake.com/en/user-guide/dynamic-tables-about"],
["CREATE DYNAMIC TABLE", "https://docs.snowflake.com/en/sql-reference/sql/create-dynamic-table"],
["Dynamic tables: refresh", "https://docs.snowflake.com/en/user-guide/dynamic-tables-refresh"],
["ALTER DYNAMIC TABLE", "https://docs.snowflake.com/en/sql-reference/sql/alter-dynamic-table"],
["WAREHOUSE_METERING_HISTORY (Account Usage)", "https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history"],
["ALTER WAREHOUSE", "https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse"]
],
cartoes: [
{ id: "a14c1", f: "O que é um stream no Snowflake?", v: "Objeto que registra mudanças DML (insert, update, delete) de uma tabela, com metadados. Não guarda dados da tabela, só o offset.", t: "s4" },
{ id: "a14c2", f: "Quando o offset de um stream avança?", v: "Quando o stream é usado em uma transação DML (INSERT SELECT, MERGE, CTAS). Fazer só SELECT nele não move o offset.", t: "s4" },
{ id: "a14c3", f: "Colunas de metadados de um stream", v: "METADATA$ACTION (INSERT ou DELETE), METADATA$ISUPDATE (veio de update) e METADATA$ROW_ID (identificador único da linha).", t: "s4" },
{ id: "a14c4", f: "Como um UPDATE aparece no stream padrão?", v: "Como duas linhas: um DELETE e um INSERT, ambos com METADATA$ISUPDATE igual a TRUE.", t: "s4" },
{ id: "a14c5", f: "Stream append-only: quando usar?", v: "Registra só inserts. Mais eficiente para ELT que depende apenas de inserts. Criado com APPEND_ONLY = TRUE.", t: "s4" },
{ id: "a14c6", f: "O que é um stream stale?", v: "O offset saiu do período de retenção da origem; mudanças não consumidas ficam inacessíveis e é preciso recriar o stream.", t: "s4" },
{ id: "a14c7", f: "Como uma task só roda quando há mudanças?", v: "Com a condição WHEN SYSTEM$STREAM_HAS_DATA('nome_do_stream'). Se for falsa, a execução é pulada (estado SKIPPED).", t: "s4" },
{ id: "a14c8", f: "Em que estado uma task nasce e como ligar?", v: "Nasce suspensa. Ligue com ALTER TASK nome RESUME; desligue com ALTER TASK nome SUSPEND.", t: "s4" },
{ id: "a14c9", f: "Onde fica a agenda em um task graph?", v: "Só na task raiz. As filhas usam AFTER e rodam depois dos pais. Suspenda a raiz antes de alterar qualquer task do grafo.", t: "s4" },
{ id: "a14c10", f: "O que é TARGET_LAG?", v: "Defasagem máxima aceita da dynamic table em relação às tabelas base. Mínimo de 60 segundos; DOWNSTREAM delega aos dependentes.", t: "s4" },
{ id: "a14c11", f: "Modos de refresh da dynamic table", v: "INCREMENTAL (só mudanças), FULL (tudo), AUTO (escolhe na criação). O modo não muda com ALTER, só recriando a tabela.", t: "s4" },
{ id: "a14c12", f: "Como parar uma dynamic table e um warehouse?", v: "ALTER DYNAMIC TABLE nome SUSPEND; e ALTER WAREHOUSE nome SUSPEND;. Suspender o warehouse não suspende a task: suspenda as duas coisas.", t: "s4" }
],
questoes: [
{ id: "a14q1", s: 2, t: "s4", e: "Uma engenheira cria um stream sobre a tabela de pedidos e roda SELECT * FROM stream três vezes seguidas, sem nenhum DML. Ao rodar o quarto SELECT, ela esperava que as linhas já tivessem sumido. O que ocorre?", o: ["As linhas continuam aparecendo, porque consultar o stream não move o offset", "As linhas somem na segunda consulta, pois o stream é esvaziado ao ser lido", "O stream fica stale ao ser consultado mais de duas vezes", "Aparece um erro dizendo que o stream só pode ser lido uma vez"], c: [0], x: "Segundo a doc, consultar o stream não move o offset; ele só avança quando o stream é usado em uma transação DML (INSERT SELECT, MERGE, CTAS). Por isso as linhas continuam aparecendo. A ideia de que ler esvazia o stream é falsa, assim como a de que consultas repetidas o deixam stale (stale depende da retenção) ou geram um erro de leitura única, que não existe." },
{ id: "a14q2", s: 2, t: "s4", e: "Uma linha da tabela de origem sofre um UPDATE antes de o stream padrão ser consumido, depois de já existir antes do offset do stream. Como o stream mostra essa mudança?", o: ["Uma única linha com METADATA$ACTION igual a UPDATE", "Duas linhas, um DELETE e um INSERT, ambas com METADATA$ISUPDATE igual a TRUE", "Nenhuma linha, porque streams ignoram updates", "Uma linha com METADATA$ACTION igual a INSERT e METADATA$ISUPDATE igual a FALSE"], c: [1], x: "Um UPDATE em linha que já existia antes do offset aparece como um DELETE e um INSERT, ambos com ISUPDATE igual a TRUE. METADATA$ACTION só assume INSERT ou DELETE, então não há valor UPDATE. Streams padrão não ignoram updates (só o append-only ignora). A última opção descreve uma linha inserida e atualizada antes do consumo, que aparece como INSERT novo com ISUPDATE igual a FALSE, outra situação." },
{ id: "a14q3", s: 2, t: "s4", e: "Você quer uma task que só execute, e só consuma warehouse, quando houver linhas novas em um stream. A agenda é de 1 minuto. Qual definição é a adequada segundo a documentação?", o: ["Adicionar PURGE = TRUE na task", "Colocar a condição WHEN SYSTEM$STREAM_HAS_DATA('nome_do_stream') na task", "Criar a task sem agenda, que ela roda sozinha", "Usar AFTER apontando para o stream"], c: [1], x: "A condição WHEN SYSTEM$STREAM_HAS_DATA faz a task ser pulada quando o stream está vazio; avaliar essa condição não exige computação, mas cada avaliação ainda gera uma pequena cobrança de cloud services. PURGE é opção de COPY INTO, não de task. Uma task sem SCHEDULE ou gatilho não roda automaticamente. AFTER liga uma task a outras tasks do grafo, não a um stream." },
{ id: "a14q4", s: 2, t: "s4", e: "Uma engenheira cria CREATE TASK com WAREHOUSE e SCHEDULE de 1 minuto, espera dez minutos e nada foi processado. O histórico não mostra execuções. Qual o motivo mais provável?", o: ["O warehouse X-Small é pequeno demais para tasks", "Tasks só rodam em horário comercial", "Task nasce suspensa e falta ALTER TASK ... RESUME", "O stream precisa de um índice"], c: [2], x: "A doc diz que quando uma task é criada ela começa suspensa, e só RESUME permite rodar na agenda. O tamanho X-Small não impede execução. Tasks não têm restrição de horário comercial. Streams não usam índices. Em um grafo, resuma as filhas e depois a raiz." },
{ id: "a14q5", s: 2, t: "s4", e: "Uma dynamic table foi criada com REFRESH_MODE = AUTO. Meses depois, o time quer forçar o modo FULL. Qual abordagem a doc descreve?", o: ["ALTER DYNAMIC TABLE ... SET REFRESH_MODE = FULL", "Recriar a tabela com CREATE OR REPLACE ou CREATE OR ALTER definindo o modo desejado", "Suspender a tabela, que muda o modo automaticamente", "Aumentar o TARGET_LAG até virar FULL"], c: [1], x: "A doc diz que o modo de refresh é definido na criação e não pode ser alterado com ALTER DYNAMIC TABLE; é preciso usar CREATE OR REPLACE ou CREATE OR ALTER. SUSPEND apenas para os refreshes, sem mudar o modo. O TARGET_LAG controla a frescura, não o modo, e a Snowflake não troca de modo automaticamente por volume de mudança." },
{ id: "a14q6", s: 2, t: "s4", e: "Ao fim de um laboratório, uma pessoa roda ALTER WAREHOUSE meu_wh SUSPEND e fecha o navegador, mas deixou uma task retomada com agenda de 1 minuto e uma dynamic table ativa com TARGET_LAG de 1 minuto. O que pode acontecer com o saldo da conta?", o: ["Nada, pois suspender o warehouse também suspende todas as tasks e dynamic tables", "O Snowflake apaga tasks e dynamic tables ao fechar o navegador", "Só o cloud services é cobrado e é sempre gratuito", "As tasks e a dynamic table seguem ativas e continuam usando o warehouse, gastando créditos, até serem suspensas"], c: [3], x: "Tasks e dynamic tables rodam em segundo plano e usam o warehouse configurado para cada execução ou refresh, e só param quando são suspensas. Suspender só o warehouse não suspende esses objetos. Por isso o fim do laboratório exige ALTER TASK SUSPEND e ALTER DYNAMIC TABLE SUSPEND. Fechar o navegador não apaga nada, e cloud services também entra na conta de créditos." }
],
lab: {
t: "Pipeline incremental com stream e task, medindo créditos e suspendendo tudo",
custo: "Gratuito dentro do saldo da conta de teste, mas consome créditos enquanto o warehouse X-Small estiver ligado pela task. O laboratório dura poucos minutos de execução e termina com tudo suspenso. A medição de créditos só aparece horas depois (a view pode atrasar até 3 horas). Confira a página oficial para números atuais.",
tempo: "40 a 60 min (mais uma consulta de créditos horas depois)",
porque: "É o centro do projeto de portfólio ELT incremental: mostra que você processa só o que mudou, mede o custo e desliga o que gasta.",
antes: "Você precisa da conta de teste, do warehouse X-Small com AUTO_SUSPEND curto e do schema da aula 13. Se o seu papel não puder executar tasks, um papel com mais permissão precisa conceder EXECUTE TASK (confira a doc de CREATE TASK). Os passos foram conferidos contra a documentação oficial mas NÃO foram executados; o texto das mensagens pode diferir um pouco. A consulta de créditos usa SNOWFLAKE.ACCOUNT_USAGE: a doc diz que o acesso aos schemas desse banco pode ser concedido por ACCOUNTADMIN (via IMPORTED PRIVILEGES ou, de forma recomendada, o papel de banco USAGE_VIEWER). Na conta de teste, use ACCOUNTADMIN só para essa consulta.",
passos: [
{ t: "Criar origem, stream e destino", cmd: "USE WAREHOUSE <seu_warehouse_xsmall>;\nUSE SCHEMA elt_lab;\nCREATE TABLE vendas_origem (id NUMBER, produto STRING, qtd NUMBER);\nCREATE STREAM vendas_stream ON TABLE vendas_origem APPEND_ONLY = TRUE;\nCREATE TABLE vendas_total (produto STRING, qtd_total NUMBER);", p: "Stream append-only: só inserts, suficiente para este ELT. Anote o horário atual (SELECT CURRENT_TIMESTAMP();) para a medição de créditos." },
{ t: "Ver o stream capturar e o offset não andar", cmd: "INSERT INTO vendas_origem VALUES (1,'cafe',2),(2,'cha',1);\nSELECT * FROM vendas_stream;\nSELECT * FROM vendas_stream;   -- as mesmas linhas, o offset não andou\nSELECT SYSTEM$STREAM_HAS_DATA('vendas_stream');", p: "As duas consultas mostram as mesmas linhas e as colunas METADATA$ACTION e METADATA$ISUPDATE. A função deve devolver TRUE." },
{ t: "Criar a task com WHEN e retomar", cmd: "CREATE TASK consome_vendas\n  WAREHOUSE = <seu_warehouse_xsmall>\n  SCHEDULE = '1 MINUTE'\n  WHEN SYSTEM$STREAM_HAS_DATA('vendas_stream')\n  AS MERGE INTO vendas_total t\n     USING (SELECT produto, SUM(qtd) AS q FROM vendas_stream GROUP BY produto) s\n     ON t.produto = s.produto\n     WHEN MATCHED THEN UPDATE SET qtd_total = t.qtd_total + s.q\n     WHEN NOT MATCHED THEN INSERT (produto, qtd_total) VALUES (s.produto, s.q);\n\nALTER TASK consome_vendas RESUME;", p: "O MERGE consome o stream em uma transação DML, então o offset avança. Espere 2 a 3 minutos." },
{ t: "Conferir resultado e histórico da task", cmd: "SELECT * FROM vendas_total;\nSELECT * FROM vendas_stream;   -- vazio\nSELECT name, state, scheduled_time, error_message\nFROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(\n  SCHEDULED_TIME_RANGE_START => DATEADD('hour', -1, CURRENT_TIMESTAMP()),\n  TASK_NAME => 'CONSOME_VENDAS'))\nORDER BY scheduled_time DESC;", p: "Esperado: totais por produto, stream vazio, uma execução SUCCEEDED e execuções SKIPPED depois (WHEN falso). Insira mais linhas e veja uma nova execução." },
{ t: "SUSPENDER tudo antes de qualquer outra coisa", cmd: "ALTER TASK consome_vendas SUSPEND;\nALTER WAREHOUSE <seu_warehouse_xsmall> SUSPEND;\nSHOW TASKS;", p: "Confirme na saída de SHOW TASKS que o estado é suspended. Anote o horário.", },
{ t: "Opcional: a versão com dynamic table", cmd: "CREATE DYNAMIC TABLE vendas_dt\n  TARGET_LAG = '1 minute'\n  WAREHOUSE = <seu_warehouse_xsmall>\n  AS SELECT produto, SUM(qtd) AS total FROM vendas_origem GROUP BY produto;\n\nSELECT * FROM vendas_dt;\nSHOW DYNAMIC TABLES;\nALTER DYNAMIC TABLE vendas_dt SUSPEND;", p: "A página de CREATE STREAM diz que criar o stream inicial já habilita o change tracking na tabela, e a de CREATE DYNAMIC TABLE exige change tracking nos objetos base. Se mesmo assim der erro, confira essa página. Veja refresh_mode e refresh_mode_reason no SHOW. Suspenda no final." },
{ t: "Medir os créditos, horas depois", cmd: "SELECT start_time, warehouse_name, credits_used_compute, credits_used_cloud_services, credits_used\nFROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY\nWHERE warehouse_name = '<SEU_WAREHOUSE_XSMALL>'\n  AND start_time >= DATEADD('hour', -24, CURRENT_TIMESTAMP())\nORDER BY start_time;", p: "A doc diz que a view pode atrasar até 3 horas (cloud services até 6). Espere e rode depois. Registre no README quanto o laboratório consumiu, sem inventar: use o número que a view mostrar." }
],
verificar: "Você deve ter: o stream mostrando as linhas antes do consumo e vazio depois, a tabela de total correta, TASK_HISTORY com SUCCEEDED e SKIPPED, a task e a dynamic table em estado suspenso, e uma linha anotada com os créditos do warehouse retirada da view de uso.",
limpar: [
"ALTER TASK consome_vendas SUSPEND; (e, se criou, ALTER DYNAMIC TABLE vendas_dt SUSPEND;).",
"ALTER WAREHOUSE <seu_warehouse> SUSPEND; e ALTER WAREHOUSE <seu_warehouse> SET AUTO_SUSPEND = 60;",
"Confirme com SHOW TASKS e SHOW DYNAMIC TABLES que nada está ativo.",
"Guarde no repositório snowflake-elt-portfolio: scripts 03_stream_task.sql e 04_dynamic_table.sql, README em inglês com a decisão, o custo medido e como limpar, e o print do TASK_HISTORY.",
"NUNCA commite senhas, chaves, tokens ou nomes de conta. Opcional: DROP TASK, DROP STREAM e DROP DYNAMIC TABLE ao concluir o projeto."
],
erros: [
{ s: "TASK_HISTORY vazio depois de minutos", c: "A task está suspensa (nasce suspensa) ou o papel não tem EXECUTE TASK", r: "Rode ALTER TASK consome_vendas RESUME; e peça a um papel administrador para conceder EXECUTE TASK." },
{ s: "Task aparece como SKIPPED sempre", c: "O WHEN é falso porque o stream está vazio", r: "Insira novas linhas na tabela de origem e espere o próximo minuto; é o comportamento esperado." },
{ s: "A consulta de ACCOUNT_USAGE não mostra o laboratório", c: "Atraso da view (até 3 horas) ou o papel sem acesso ao banco SNOWFLAKE", r: "Espere e rode de novo; se o erro for de permissão, confira a doc e use um papel com acesso." },
{ s: "Erro ao criar dynamic table sobre change tracking", c: "Os objetos base precisam de change tracking habilitado", r: "Leia a mensagem e a página de CREATE DYNAMIC TABLE; habilite o change tracking conforme a doc e recrie." }
]
}
};
C.dias[15] = {
aula: {
titulo: "dbt no Snowflake",
resumo: "O que muda quando o dbt roda no Snowflake: o perfil de conexão, as formas de autenticação (MFA, SSO, chave), segredos fora do repositório, tabelas transient, incremental com merge, warehouse por modelo, dynamic tables e testes em CI.",
simples: {
analogia: "Pense numa cozinha industrial alugada. O dbt é a sua receita e o seu jeito de trabalhar; o Snowflake é a cozinha, com fogões de tamanhos diferentes e uma portaria que confere quem entra. Para usar a cozinha você precisa do endereço (account), do crachá (usuário e forma de autenticação), do avental certo (role), do fogão que vai usar (warehouse) e da bancada onde vai trabalhar (database e schema). Você nunca cola a senha da portaria na porta da sua casa: guarda no cofre. E dá para escolher um fogão pequeno para a receita simples e um grande só para o prato pesado, em vez de ligar o fogão grande o tempo todo.",
pontos: [
"O dbt já foi coberto na trilha dbt: aqui só o que é específico do Snowflake.",
"profiles.yml diz a conta, usuário, role, warehouse, database e schema; segredos vêm de variáveis de ambiente.",
"Para pessoas, a doc fala em MFA ou SSO; para automação, em chave (key pair) e usuário de serviço.",
"No Snowflake, as tabelas criadas pelo dbt são transient por padrão; o incremental usa merge por padrão.",
"Você pode trocar o warehouse por modelo com snowflake_warehouse, usando o menor possível."
],
paraQueServe: "Conectar o dbt ao Snowflake com segurança e custo baixo, e entregar o projeto de portfólio com testes e CI sem expor credenciais."
},
glossario: [
{ t: "profiles.yml", d: "Arquivo que guarda os dados de conexão do dbt (conta, usuário, warehouse etc.). Fica fora do projeto, por padrão em ~/.dbt/." },
{ t: "account", d: "Identificador da sua conta Snowflake. A doc do dbt indica achá-lo em View account details, no Snowsight." },
{ t: "authenticator", d: "Campo do perfil que escolhe a forma de login, como externalbrowser (SSO) ou username_password_mfa (senha com MFA)." },
{ t: "Key pair (par de chaves)", d: "Autenticação com chave privada local e chave pública cadastrada no usuário Snowflake. Indicada para automação." },
{ t: "env_var", d: "Função do dbt que lê variável de ambiente dentro de arquivos YAML, para não escrever segredos no arquivo." },
{ t: "Tabela transient", d: "Tabela do Snowflake sem período de fail-safe e com retenção de 1 dia por padrão. O dbt cria tabelas assim por padrão no Snowflake." },
{ t: "snowflake_warehouse", d: "Configuração do dbt que troca o warehouse usado por um modelo, grupo de modelos, snapshot ou teste." },
{ t: "Modelo incremental", d: "Modelo que na primeira rodada cria a tabela inteira e nas seguintes processa só linhas novas ou alteradas." },
{ t: "dbt build", d: "Comando que roda modelos, testes, seeds e snapshots na ordem do DAG. É o comando típico para CI." }
],
blocos: [
{ t: "O que é específico do Snowflake", facil: "Traduzindo: o dbt é o mesmo; muda como você conecta, como se autentica e algumas opções de materialização.", p: [
"A trilha dbt já explica modelos, ref, testes e materializações. Aqui você aprende o que só existe ou se comporta diferente no Snowflake: o perfil, a autenticação, as tabelas transient, as estratégias de incremental, o warehouse por modelo e as dynamic tables.",
"Atenção à versão: a doc atual do dbt descreve o dbt v2 (a página de instalação mostra python -m pip install dbt) e o projeto jaffle-shop da branch main exige dbt v2.0.0 ou mais. A página de instalação diz que instalar o pacote dbt dá o dbt v2 por padrão, e a página do adaptador (Connect Snowflake to dbt v2) não pede nenhum pacote de adaptador separado nem cita dbt-snowflake. Para o dbt v1, o pacote é dbt-snowflake: essa instalação não aparece nas páginas que conferi, então siga a página de instalação do dbt v1 se precisar dela."
], fonte: ["Install dbt (visão geral)", "https://docs.getdbt.com/docs/core/installation-overview"], armadilha: "Misturar instalações no mesmo ambiente: a doc avisa que dbt-oss e dbt não podem compartilhar o mesmo ambiente Python e manda checar se não há outra versão do dbt instalada ou ativa. Use um ambiente virgem e confira com dbt --version." },
{ t: "profiles.yml: os campos da conexão", facil: "Traduzindo: o perfil é o crachá do dbt: conta, usuário, papel, warehouse, banco e schema.", p: [
"O dbt init pergunta: account, user, database, warehouse, schema e, opcionalmente, role. Você também pode escrever o profiles.yml à mão. A conta pode ser achada no Snowsight: seu nome, Account, View account details, Config file. O perfil aceita threads e vários targets (por exemplo dev).",
"O profiles.yml recomendado fica em ~/.dbt/ por segurança e reuso. A ordem de busca começa pelo flag --profiles-dir, depois a raiz do projeto, depois ~/.dbt/. A chave profile do dbt_project.yml deve ter o mesmo nome do perfil.",
"```yaml\nsnowflake_elt:\n  target: dev\n  outputs:\n    dev:\n      type: snowflake\n      account: \"{{ env_var('SNOWFLAKE_ACCOUNT') }}\"\n      user: \"{{ env_var('SNOWFLAKE_USER') }}\"\n      password: \"{{ env_var('SNOWFLAKE_PASSWORD') }}\"\n      role: TRANSFORMER\n      warehouse: XS_WH\n      database: JAFFLE_SHOP\n      schema: DBT_DEV\n      threads: 4\n```"
], fonte: ["Snowflake setup (dbt)", "https://docs.getdbt.com/docs/local/connect-data-platform/snowflake-setup"], dica: "Use um warehouse X-Small e poucos threads na conta de teste. Mais threads não ajudam um projeto pequeno e não são grátis." },
{ t: "Autenticação: o que a doc atual diz", facil: "Traduzindo: senha sozinha está saindo de cena para pessoas; use MFA, SSO ou chave. Conta de teste ainda aceita senha.", p: [
"A página do adaptador lista quatro métodos: senha, par de chaves (key pair), SSO (authenticator igual a externalbrowser) e senha com MFA (authenticator igual a username_password_mfa). Ela avisa que a Snowflake está descontinuando o login só com senha: desenvolvedores devem usar MFA ou SSO, e o login por senha continua para usuários de serviço do tipo LEGACY_SERVICE.",
"A página da Snowflake sobre o MFA diz que passa a exigir segundo fator para usuários humanos com senha e a bloquear senha para usuários de serviço (TYPE igual a SERVICE), em fases com datas estimadas e sujeitas a mudança. Ela cita que contas de teste (trial) não estão sujeitas a essas fases. Confira a página para o estado atual.",
"Para automação (CI), o caminho é par de chaves: a doc exige chave RSA de no mínimo 2048 bits e mostra openssl para gerar e ALTER USER para cadastrar a chave pública. O dbt recomenda PKCS#8 com AES-256."
], fonte: ["Snowflake MFA e fim do login só com senha", "https://docs.snowflake.com/en/user-guide/security-mfa-rollout"], armadilha: "A doc do dbt avisa que o SSO pede navegador a cada conexão por padrão e que o cache de sessão só vale em Windows e macOS. Não serve para CI." },
{ t: "Credenciais fora do repositório", facil: "Traduzindo: o perfil mora fora do projeto e lê segredos de variáveis de ambiente. Nada de senha em arquivo versionado.", p: [
"A função env_var lê variáveis de ambiente em arquivos YAML. A doc manda colocar a string Jinja inteira entre aspas e avisa que, se a variável não existir, o dbt gera erro de compilação. Variáveis são sempre texto: use filtros como int para números (threads).",
"Variáveis com prefixo DBT_ENV_SECRET são tratadas como segredo: valem em profiles.yml e packages.yml, não aparecem nos logs (viram asteriscos) e são proibidas em outros lugares.",
"Mantenha o profiles.yml em ~/.dbt/, nunca dentro do repositório, e coloque .env, chaves e profiles.yml no .gitignore.",
"```bash\nexport SNOWFLAKE_ACCOUNT=...\nexport SNOWFLAKE_USER=...\nexport SNOWFLAKE_PASSWORD=...\ndbt debug\n```"
], fonte: ["env_var (dbt)", "https://docs.getdbt.com/reference/dbt-jinja-functions/env_var"], dica: "Para a senha, use um nome como DBT_ENV_SECRET_SNOWFLAKE_PASSWORD: a doc diz que só vale em profiles.yml e packages.yml, não pode ser alterado por filtros Jinja e fica fora dos logs." },
{ t: "Materializações no Snowflake: transient e dynamic tables", facil: "Traduzindo: no Snowflake o dbt cria tabelas transient por padrão, e dá para materializar como dynamic table ou view segura.", p: [
"A doc de configurações diz que todas as tabelas criadas pelo dbt no Snowflake são transient por padrão: sem histórico de fail-safe e com retenção de 1 dia por padrão, o que pode reduzir armazenamento. Para desligar, use transient: false no projeto ou no modelo.",
"O dbt também tem materialized igual a dynamic_table, com target_lag (no mínimo 1 minuto), snowflake_warehouse (obrigatório), refresh_mode (AUTO, FULL ou INCREMENTAL) e on_configuration_change. Views seguras usam secure: true; a doc avisa que podem custar desempenho.",
"```sql\n{{ config(\n    materialized='dynamic_table',\n    snowflake_warehouse='XS_WH',\n    target_lag='5 minutes'\n) }}\nselect * from {{ source('raw', 'events') }}\n```"
], fonte: ["Snowflake configurations (dbt)", "https://docs.getdbt.com/reference/resource-configs/snowflake-configs"], armadilha: "Dynamic table criada pelo dbt com target_lag curto continua gastando crédito a cada refresh. Suspenda ao fim do laboratório." },
{ t: "Modelos incrementais no Snowflake", facil: "Traduzindo: incremental processa só o novo. No Snowflake a estratégia padrão é merge.", p: [
"Um modelo incremental cria a tabela inteira na primeira rodada e depois processa só o que passar pelo filtro is_incremental(). Com unique_key, o dbt atualiza as linhas existentes e insere as novas; sem ela, a maioria dos adaptadores apenas insere. --full-refresh reconstrói tudo.",
"No Snowflake, a doc lista as estratégias merge (padrão), append, delete+insert, insert_overwrite e microbatch. O merge falha com erro de merge não determinístico se a unique_key não for única de fato: nesse caso a doc sugere delete+insert.",
"```sql\n{{ config(materialized='incremental', unique_key='id') }}\nselect * from {{ ref('stg_orders') }}\n{% if is_incremental() %}\nwhere updated_at >= (select coalesce(max(updated_at),'1900-01-01') from {{ this }})\n{% endif %}\n```"
], fonte: ["Incremental models (dbt)", "https://docs.getdbt.com/docs/build/incremental-models"], dica: "unique_key não pode ter nulos: use coalesce ou uma chave substituta, como a doc recomenda." },
{ t: "Warehouse por modelo e query tag", facil: "Traduzindo: use o fogão pequeno para quase tudo e só ligue o grande onde precisa, e etiquete as consultas para achá-las depois.", p: [
"A configuração snowflake_warehouse troca o warehouse de modelos, pastas, snapshots e testes, no dbt_project.yml, no arquivo de propriedades ou no config do modelo.",
"```yaml\nmodels:\n  +snowflake_warehouse: \"XS_WH\"\n  my_project:\n    clickstream:\n      +snowflake_warehouse: \"M_WH\"\n```",
"O query_tag é um parâmetro de sessão do Snowflake que você pode configurar por modelo com +query_tag; ajuda a procurar no QUERY_HISTORY. A doc avisa que uma falha no meio da materialização pode deixar consultas seguintes com tag errada.",
"Na conta de teste, mantenha tudo no warehouse X-Small com AUTO_SUSPEND curto."
], fonte: ["Snowflake configurations (dbt)", "https://docs.getdbt.com/reference/resource-configs/snowflake-configs"] },
{ t: "Testes e CI sem vazar segredo", facil: "Traduzindo: dbt build roda modelos e testes. No CI, as credenciais vêm dos secrets do GitHub, nunca do código.", p: [
"Testes de dados são SELECTs que devolvem as linhas que falham: zero linhas, passou. Os genéricos são unique, not_null, accepted_values e relationships, declarados na chave data_tests. dbt test --store-failures guarda as linhas que falharam.",
"No GitHub Actions, secrets são criados em Settings, Secrets and variables, Actions, e usados como ${{ secrets.NOME }} em env. A doc avisa que workflows de forks não recebem secrets e que é preciso evitar imprimir segredos nos logs.",
"Use usuário próprio para CI, de preferência com chave, e um warehouse X-Small. Dispare o CI manualmente ou em pull request, para não gastar crédito à toa."
], fonte: ["dbt data tests", "https://docs.getdbt.com/docs/build/data-tests"], armadilha: "Colocar a senha direto no YAML do workflow. Sempre use secrets do repositório e passe por env." }
],
exemplo: { t: "Caso trabalhado: jaffle-shop no Snowflake com CI", texto: "A engenheira cria o banco JAFFLE_SHOP e um warehouse X-Small com auto-suspend de 60 segundos. Clona o repositório jaffle-shop, escreve o profiles.yml em ~/.dbt/ lendo conta, usuário e senha de variáveis de ambiente e roda dbt debug para validar a conexão. Carrega os dados de exemplo com o seed do README, roda dbt build e vê os modelos e os testes passarem. Depois configura um modelo incremental com unique_key, define o warehouse por pasta e abre um workflow de GitHub Actions que roda dbt build usando secrets do repositório. No README em inglês ela documenta como rodar, o custo e como limpar, e confirma que nenhuma senha ou chave entrou no histórico do Git." },
prova: [
"Entrevista: explique as formas de autenticação do dbt no Snowflake e por que automação deve usar chave ou usuário de serviço, não senha.",
"Entrevista: descreva como um modelo incremental funciona no Snowflake, qual a estratégia padrão e o que causa o erro de merge não determinístico.",
"Trabalho: montar um CI com dbt build usando secrets, warehouse pequeno e sem credenciais no repositório."
],
explique: "Explique com suas palavras o que o dbt precisa saber para falar com o Snowflake, onde ficam as credenciais e como você evitaria gastar crédito à toa no CI.",
checagem: [
"Quais campos mínimos do profiles.yml conectam o dbt ao Snowflake?",
"Por que o profiles.yml fica fora do repositório e como env_var ajuda?",
"O que significa o dbt criar tabelas transient por padrão no Snowflake?",
"Como configurar o warehouse de um modelo específico e por que isso reduz custo?"
]
},
fontes: [
["Snowflake setup (dbt)", "https://docs.getdbt.com/docs/local/connect-data-platform/snowflake-setup"],
["Snowflake configurations (dbt)", "https://docs.getdbt.com/reference/resource-configs/snowflake-configs"],
["Install dbt (visão geral)", "https://docs.getdbt.com/docs/core/installation-overview"],
["profiles.yml (dbt)", "https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml"],
["env_var (dbt)", "https://docs.getdbt.com/reference/dbt-jinja-functions/env_var"],
["Incremental models (dbt)", "https://docs.getdbt.com/docs/build/incremental-models"],
["dbt data tests", "https://docs.getdbt.com/docs/build/data-tests"],
["jaffle-shop (dbt Labs, GitHub)", "https://github.com/dbt-labs/jaffle-shop"],
["Snowflake MFA e fim do login só com senha", "https://docs.snowflake.com/en/user-guide/security-mfa-rollout"],
["Key-pair authentication (Snowflake)", "https://docs.snowflake.com/en/user-guide/key-pair-auth"],
["Using secrets in GitHub Actions", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions"]
],
cartoes: [
{ id: "a15c1", f: "Campos do profiles.yml para Snowflake", v: "account, user, role (opcional), warehouse, database, schema, mais threads e a forma de autenticação. Segredos vêm de env_var.", t: "s5" },
{ id: "a15c2", f: "Onde fica o profiles.yml recomendado?", v: "Em ~/.dbt/, fora do repositório, por segurança e reuso. O flag --profiles-dir tem prioridade e serve para CI.", t: "s5" },
{ id: "a15c3", f: "Quatro métodos de autenticação que a doc do adaptador lista", v: "Senha, par de chaves (key pair), SSO (externalbrowser) e senha com MFA (username_password_mfa).", t: "s5" },
{ id: "a15c4", f: "O que a doc do dbt diz sobre login só com senha?", v: "A Snowflake está descontinuando o login só com senha: use MFA ou SSO. Senha segue para usuários de serviço LEGACY_SERVICE.", t: "s5" },
{ id: "a15c5", f: "Contas de teste e as fases de MFA", v: "A página da Snowflake diz que contas de teste (trial) não estão sujeitas às fases de exigência. Confira a página para o estado atual.", t: "s5" },
{ id: "a15c6", f: "Como gerar chave para key pair?", v: "openssl genrsa 2048 | openssl pkcs8 -topk8 -v2 aes-256-cbc -inform PEM -out rsa_key.p8; depois a chave pública, cadastrada com ALTER USER.", t: "s5" },
{ id: "a15c7", f: "Como usar env_var no profiles.yml?", v: "password: \"{{ env_var('SNOWFLAKE_PASSWORD') }}\" , com a string Jinja inteira entre aspas. Variável ausente gera erro de compilação.", t: "s5" },
{ id: "a15c8", f: "Tipo de tabela criado pelo dbt no Snowflake por padrão", v: "Transient: sem fail-safe e retenção de 1 dia por padrão. Desligue com transient: false.", t: "s5" },
{ id: "a15c9", f: "Estratégia incremental padrão no Snowflake", v: "merge. Outras: append, delete+insert, insert_overwrite e microbatch. Merge falha se unique_key não for única.", t: "s5" },
{ id: "a15c10", f: "Como trocar o warehouse de um modelo?", v: "Config snowflake_warehouse no dbt_project.yml, no arquivo de propriedades ou em config() do modelo, aplicável também a testes.", t: "s5" },
{ id: "a15c11", f: "Configs da dynamic table no dbt", v: "materialized dynamic_table, target_lag (mín. 1 minuto), snowflake_warehouse (obrigatório) e refresh_mode AUTO, FULL ou INCREMENTAL.", t: "s5" },
{ id: "a15c12", f: "Como passar credenciais ao CI no GitHub?", v: "Secrets do repositório, usados como ${{ secrets.NOME }} em env. Workflows de forks não recebem secrets. Não imprima segredos.", t: "s5" }
],
questoes: [
{ id: "a15q1", s: 2, t: "s5", e: "Uma engenheira escreve o profiles.yml do projeto dbt com a senha do Snowflake em texto puro e está prestes a fazer commit do repositório público de portfólio. Qual a prática correta segundo a documentação do dbt?", o: ["Manter assim, pois o repositório só tem um autor", "Ler a senha por env_var com a string Jinja entre aspas, manter o profiles.yml fora do repositório e ignorar arquivos de segredo no Git", "Trocar a senha por base64 no próprio YAML", "Mover o arquivo para a pasta de seeds"], c: [1], x: "A função env_var lê variáveis de ambiente no YAML para não gravar segredos em arquivos, e a doc recomenda o profiles.yml em ~/.dbt/, fora do projeto. Manter a senha em texto puro num repositório público é exatamente o risco evitado. Base64 não é criptografia e continua expondo a senha. A pasta de seeds é versionada com o projeto e não protege nada." },
{ id: "a15q2", s: 2, t: "s5", e: "O pipeline de CI do projeto dbt no Snowflake precisa autenticar sem pessoa digitando segundo fator. Segundo a documentação da Snowflake e do dbt, qual direção seguir?", o: ["Usar SSO com navegador, que abre uma janela a cada conexão", "Usar a conta pessoal com senha e MFA via aplicativo no celular", "Usar um usuário de serviço com autenticação por par de chaves, guardando a chave em secrets", "Compartilhar o login de um colega no secret do repositório"], c: [2], x: "Para automação, a doc da Snowflake descreve usuários de serviço (TYPE igual a SERVICE), sem senha, e a de chaves mostra como cadastrar a chave pública. O SSO do dbt abre navegador a cada conexão por padrão, o que não funciona em CI sem pessoa. Senha com MFA depende de pessoa. Compartilhar login de colega quebra o princípio de menor privilégio e rastreabilidade." },
{ id: "a15q3", s: 2, t: "s5", e: "Um modelo incremental no Snowflake falha com erro de merge não determinístico depois que a fonte passou a trazer dois registros com o mesmo valor em unique_key. O que a doc do dbt sugere?", o: ["Remover o unique_key e usar apenas append", "Trocar a estratégia para delete+insert, que usa duas etapas, ou garantir unicidade da chave", "Trocar para materialized view", "Aumentar o número de threads"], c: [1], x: "A doc explica que o merge do Snowflake falha se a unique_key não for única e sugere incremental_strategy igual a delete+insert, que atua em duas etapas, ou corrigir a unicidade da chave. Usar append deixaria de atualizar linhas e cria duplicatas, e a doc não propõe isso como solução. Trocar de materialização não resolve a chave duplicada, e threads só mudam paralelismo." },
{ id: "a15q4", s: 2, t: "s5", e: "Um projeto dbt tem 40 modelos pequenos e um modelo pesado de clickstream. A equipe quer pagar por um warehouse grande só para esse modelo. Qual configuração do dbt atende?", o: ["Aumentar threads no profiles.yml", "Definir +snowflake_warehouse global como o warehouse grande", "Definir snowflake_warehouse padrão pequeno no projeto e sobrescrever só na pasta ou modelo do clickstream", "Criar um perfil dbt separado para cada modelo"], c: [2], x: "A doc mostra um padrão pequeno para todos os modelos e uma sobrescrita por pasta ou modelo com snowflake_warehouse, inclusive para testes e snapshots. Aumentar threads não troca o tamanho do warehouse. Definir o grande como padrão faria todos os modelos pagarem mais. Criar um perfil por modelo é desnecessário e difícil de manter." },
{ id: "a15q5", s: 2, t: "s5", e: "Depois de rodar dbt run pela primeira vez no Snowflake, uma analista notou que as tabelas aparecem como transient. Ela quer entender se isso é um erro de configuração. Qual a explicação?", o: ["É um defeito do adaptador; deve ser reportado", "É o padrão da doc: tabelas criadas pelo dbt no Snowflake são transient (sem fail-safe, retenção de 1 dia por padrão) a menos que transient seja false", "Acontece só quando o warehouse é X-Small", "Acontece porque a conta é de teste"], c: [1], x: "A página de configurações do dbt para Snowflake diz que todas as tabelas criadas pelo dbt são transient por padrão, e dá transient igual a false para desligar no projeto ou no modelo. Não é defeito. Não depende do tamanho do warehouse nem do tipo de conta." },
{ id: "a15q6", s: 2, t: "s5", e: "Você roda dbt build no GitHub Actions a partir de um fork de pull request e o job de conexão falha por falta de credenciais. Qual a causa mais provável segundo a documentação do GitHub?", o: ["Workflows disparados por forks não recebem secrets do repositório", "O GitHub bloqueia conexões ao Snowflake", "O dbt build não funciona em CI", "Secrets só funcionam em repositórios privados"], c: [0], x: "A doc do GitHub diz que secrets não são passados ao runner em workflows disparados por repositório fork (exceto GITHUB_TOKEN). Por isso variáveis vazias fazem a conexão falhar. Não há bloqueio ao Snowflake, o dbt build roda em CI e secrets funcionam também em repositórios públicos, só não chegam a forks." }
],
lab: {
t: "Rodar o jaffle-shop no Snowflake com testes e credenciais fora do repositório",
custo: "Gratuito dentro do saldo da conta de teste. O seed de exemplo e o dbt build são pequenos e rodam em warehouse X-Small que suspende sozinho. CI é opcional e só deve rodar manualmente. Confira a página oficial para números atuais.",
tempo: "45 a 60 min",
porque: "É a evidência de que você consegue pôr o dbt para falar com o Snowflake de forma segura e testar. Faz parte do projeto de portfólio dbt no Snowflake com testes e CI.",
antes: "Você precisa da conta de teste, do warehouse X-Small, de Git e de Python. Os passos foram conferidos contra a documentação oficial, mas NÃO foram executados. A doc atual descreve o dbt v2 (instalação com python -m pip install dbt, sem pacote de adaptador separado nas páginas conferidas) e o jaffle-shop exige dbt 2.0.0 ou mais na branch main; se seu ambiente usar dbt v1, o pacote é dbt-snowflake (siga a doc do v1). Uma conta de teste não está sujeita às fases de MFA, segundo a página da Snowflake (confira a página); se sua conta exigir MFA ou chave, use as opções da aula.",
passos: [
{ t: "Criar banco e schema de trabalho no Snowflake", cmd: "CREATE DATABASE IF NOT EXISTS jaffle_shop;\nCREATE SCHEMA IF NOT EXISTS jaffle_shop.dbt_dev;", p: "Use o papel e o warehouse X-Small das aulas 11 e 12. O README do jaffle-shop pede um banco novo." },
{ t: "Instalar o dbt conforme a página oficial", cmd: "python -m pip install dbt\ndbt --version", p: "Use um ambiente virtual novo. Confira na página de instalação o comando atual e a versão exibida (dbt 2.x)." },
{ t: "Clonar o projeto e conferir o que ele pede", cmd: "git clone https://github.com/dbt-labs/jaffle-shop.git\ncd jaffle-shop", p: "Leia o README. Adicione ao dbt_project.yml a chave profile com o nome do seu perfil (snowflake_elt) e garanta que profiles.yml e .env estejam no .gitignore." },
{ t: "Escrever o profiles.yml em ~/.dbt/ com variáveis de ambiente", cmd: "snowflake_elt:\n  target: dev\n  outputs:\n    dev:\n      type: snowflake\n      account: \"{{ env_var('SNOWFLAKE_ACCOUNT') }}\"\n      user: \"{{ env_var('SNOWFLAKE_USER') }}\"\n      password: \"{{ env_var('SNOWFLAKE_PASSWORD') }}\"\n      role: <seu_role>\n      warehouse: <seu_warehouse_xsmall>\n      database: JAFFLE_SHOP\n      schema: DBT_DEV\n      threads: 4", p: "Defina as três variáveis no terminal (export no Linux e macOS, $env: no PowerShell). Valor da conta: Snowsight, seu nome, Account, View account details. Rode dbt debug: deve dizer que a conexão está ok." },
{ t: "Carregar os dados de exemplo e construir", cmd: "dbt seed --full-refresh --vars '{\"load_source_data\": true}'\ndbt build", p: "É o comando do README para o conjunto de cerca de um ano de dados. Leia o resultado: modelos criados e testes passando. Depois, o README manda remover a pasta seeds/jaffle-data e a configuração relacionada." },
{ t: "Medir e provar", cmd: "dbt test --store-failures\n-- no Snowflake:\nSELECT * FROM jaffle_shop.information_schema.tables WHERE table_schema = 'DBT_DEV';", p: "Veja as tabelas criadas e anote se aparecem como transient (SHOW TABLES mostra a coluna kind). Tire print do log do dbt build." },
{ t: "Opcional: CI manual no GitHub Actions", cmd: "# .github/workflows/dbt.yml (esboço, confira a doc do GitHub Actions)\non: workflow_dispatch\njobs:\n  build:\n    runs-on: ubuntu-latest\n    env:\n      SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}\n      SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}\n      SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}\n    steps:\n      - uses: actions/checkout@v7\n      - uses: actions/setup-python@v7\n        with:\n          python-version: '3.13'  # confira a versão aceita pelo dbt\n      - run: python -m pip install dbt\n      - run: dbt build --profiles-dir ./ci", p: "Cadastre os secrets em Settings, Secrets and variables, Actions. Use só a conta de teste e um usuário próprio para CI, com o menor privilégio; nunca segredos de produção. A doc do dbt diz que o login só com senha vale para usuários LEGACY_SERVICE, e a da Snowflake manda usuários de serviço migrarem para método sem senha: para algo duradouro, prefira par de chaves. As versões das actions (checkout e setup-python v7) são as do README oficial hoje. Esse esboço não foi executado: ajuste versões e a pasta de perfil de CI (que também só lê variáveis de ambiente, sem segredos)." }
],
verificar: "Você deve ver dbt debug confirmando a conexão, dbt build criando modelos e passando os testes, as tabelas no schema DBT_DEV e, se fez o CI, o workflow rodando sem nenhuma credencial no código.",
limpar: [
"ALTER WAREHOUSE <seu_warehouse> SUSPEND; e confirme AUTO_SUSPEND curto.",
"Apague a pasta seeds/jaffle-data e a configuração dela, como o README orienta.",
"NUNCA commite profiles.yml, .env, chaves privadas, senhas, tokens nem o nome da conta. Rode git status e git log antes do push e revogue qualquer segredo vazado.",
"Guarde no repositório snowflake-elt-portfolio: o projeto dbt, o README em inglês (como rodar, custo, limpeza) e o print do build. Opcional: DROP DATABASE jaffle_shop; ao concluir.",
"Se criou CI, apague os secrets que não usa mais."
],
erros: [
{ s: "dbt debug falha na conexão", c: "Variável de ambiente ausente, conta errada ou usuário sem permissão", r: "Confira as variáveis no terminal e o identificador da conta em View account details; verifique role e warehouse." },
{ s: "Erro de compilação mencionando variável de ambiente", c: "env_var com variável não definida", r: "Defina a variável na mesma sessão do terminal e rode de novo." },
{ s: "dbt não acha o perfil", c: "Nome do profile no dbt_project.yml diferente do perfil, ou profiles.yml em outra pasta", r: "Alinhe os nomes e use ~/.dbt/ ou o flag --profiles-dir." },
{ s: "Erro de autenticação por exigência de MFA ou senha", c: "A conta ou usuário exige segundo fator ou chave", r: "Use authenticator username_password_mfa, SSO ou par de chaves, conforme a doc do dbt e da Snowflake." }
]
}
};
C.dias[16] = {
aula: {
titulo: "Segurança e governança: funções, mascaramento e acesso por linha",
resumo: "Como o Snowflake decide quem vê o quê: papéis (RBAC), privilégios e GRANT, hierarquia de papéis e papéis de sistema, future grants, masking policies, row access policies, tags e uma visão de autenticação e MFA.",
simples: {
analogia: "Pense num prédio de escritórios. Cada pessoa tem um crachá, mas o crachá não abre portas por si só: ele recebe uma função (diretoria, estagiário, limpeza), e cada função abre certas portas. Ninguém entra se ninguém deu permissão. A chave-mestra do prédio existe, mas fica guardada e só sai em emergência. Dentro de uma sala, existe um armário com fichas de clientes: o estagiário abre a gaveta, mas os telefones vêm cobertos por uma tarja preta; a diretoria vê tudo. E um vendedor da região Sul só vê as fichas do Sul. O Snowflake faz isso com papéis, privilégios, mascaramento de coluna e acesso por linha, tudo avaliado na hora da consulta.",
pontos: [
"No Snowflake, privilégios são dados a papéis (roles) e papéis são dados a usuários; sem concessão, o acesso é negado.",
"Papéis podem herdar outros papéis, formando uma hierarquia; boas práticas ligam tudo a SYSADMIN.",
"ACCOUNTADMIN é para poucos casos e não para criar objetos nem para automação.",
"Masking policy esconde valores de uma coluna; row access policy esconde linhas; ambas são avaliadas na consulta.",
"Tags classificam objetos e colunas, e podem guiar o mascaramento em contas Enterprise."
],
paraQueServe: "Dar acesso mínimo e comprovável a quem precisa, proteger colunas sensíveis e documentar isso no portfólio de ELT governado sem expor dados reais."
},
glossario: [
{ t: "RBAC", d: "Controle de acesso baseado em papéis: privilégios vão para papéis e papéis vão para usuários. É o modelo principal do Snowflake." },
{ t: "Role (papel)", d: "Objeto que reúne privilégios. Uma sessão tem um papel primário ativo, e papéis secundários podem ser ativados junto." },
{ t: "Privilégio", d: "Permissão específica sobre um objeto, como USAGE, SELECT ou CREATE TABLE, concedida com GRANT." },
{ t: "Hierarquia de papéis", d: "Papéis concedidos a outros papéis. O papel superior herda os privilégios dos papéis abaixo dele." },
{ t: "Future grant", d: "Concessão que vale para objetos que serão criados depois, em um schema ou banco, evitando conceder um a um." },
{ t: "Masking policy", d: "Política de nível de coluna que decide, na consulta, se o valor aparece em texto claro, parcial ou mascarado. Exige Enterprise ou superior." },
{ t: "Row access policy", d: "Política que decide quais linhas de uma tabela ou view o papel pode ver, via expressão booleana. Exige Enterprise ou superior." },
{ t: "Tag", d: "Objeto de schema do tipo chave e valor atribuído a outros objetos, para classificar (por exemplo sensibilidade)." },
{ t: "ACCOUNTADMIN", d: "Papel de topo que engloba SYSADMIN e SECURITYADMIN. A doc manda limitar seu uso e exigir MFA." }
],
blocos: [
{ t: "RBAC: quem recebe o quê", facil: "Traduzindo: o privilégio vai para o papel, o papel vai para a pessoa. Sem concessão, a resposta é não.", p: [
"A doc descreve o controle de acesso do Snowflake como combinação de DAC (cada objeto tem um dono), RBAC (privilégios para papéis, papéis para usuários) e UBAC. Na prática se usa RBAC. Regra de ouro: sem concessão, o acesso é negado.",
"Objetos ficam numa hierarquia (conta, banco, schema, objeto) e cada um pertence a um único papel, por padrão o que o criou. Acessar uma tabela exige privilégios no banco e no schema também, além da própria tabela.",
"Em cada sessão há um papel primário ativo; papéis secundários podem ser ativados. A doc diz que a autorização para comandos CREATE vem do papel primário.",
"```sql\nCREATE ROLE analista;\nGRANT USAGE ON DATABASE meu_db TO ROLE analista;\nGRANT USAGE ON SCHEMA meu_db.meu_schema TO ROLE analista;\nGRANT SELECT ON ALL TABLES IN SCHEMA meu_db.meu_schema TO ROLE analista;\nGRANT ROLE analista TO USER <seu_usuario>;\n```"
], fonte: ["Overview of access control", "https://docs.snowflake.com/en/user-guide/security-access-control-overview"], armadilha: "Dar SELECT na tabela sem USAGE no banco e no schema: a pessoa não enxerga a tabela mesmo assim." },
{ t: "Papéis de sistema", facil: "Traduzindo: o Snowflake já vem com papéis prontos, cada um com um propósito. Não use o mais poderoso para o dia a dia.", p: [
"A doc lista os papéis definidos pelo sistema e o que fazem. Eles formam uma hierarquia: ACCOUNTADMIN engloba SYSADMIN e SECURITYADMIN. PUBLIC é concedido automaticamente a todo usuário e papel."
], tabela: { cab: ["Papel", "Para que serve (segundo a doc)"], linhas: [
["ACCOUNTADMIN", "Topo; engloba SYSADMIN e SECURITYADMIN"],
["SECURITYADMIN", "Gerencia concessões globalmente (MANAGE GRANTS), usuários e papéis"],
["USERADMIN", "Dedicado à gestão de usuários e papéis"],
["SYSADMIN", "Cria warehouses, bancos e outros objetos"],
["PUBLIC", "Concedido a todos; objetos dele ficam disponíveis a todos"],
["ORGADMIN", "Operações de organização; a doc cita a transição para GLOBALORGADMIN"]
] }, fonte: ["Overview of access control", "https://docs.snowflake.com/en/user-guide/security-access-control-overview"], dica: "Regra prática: criar papéis e usuários com USERADMIN, conceder com SECURITYADMIN, criar objetos com SYSADMIN, e deixar ACCOUNTADMIN guardado." },
{ t: "Hierarquia, menor privilégio e uso de ACCOUNTADMIN", facil: "Traduzindo: crie papéis pequenos de acesso, junte-os em papéis funcionais e ligue o topo a SYSADMIN. Guarde o ACCOUNTADMIN.", p: [
"Segundo a doc, separe papéis de acesso a objetos (permissões específicas) de papéis funcionais (funções de negócio) e conceda os papéis funcionais de topo a SYSADMIN, para que administradores gerenciem tudo. A doc observa que não há diferença técnica entre os dois tipos: a separação é só de organização.",
"Para ACCOUNTADMIN, a doc recomenda: poucas pessoas (pelo menos duas), MFA obrigatório, nunca como papel padrão, nunca para criar objetos e nunca para automação. Scripts devem rodar com SYSADMIN ou papel inferior.",
"Menor privilégio significa conceder o mínimo necessário a cada papel de acesso. Schemas com acesso gerenciado centralizam as decisões de concessão no dono do schema ou em quem tem MANAGE GRANTS."
], fonte: ["Access control considerations", "https://docs.snowflake.com/en/user-guide/security-access-control-considerations"], armadilha: "Rodar o pipeline com ACCOUNTADMIN por comodidade. É o oposto do que a doc recomenda e torna qualquer erro mais caro." },
{ t: "GRANT e future grants", facil: "Traduzindo: GRANT dá privilégio a um papel; future grants fazem o mesmo para objetos que ainda vão existir.", p: [
"GRANT privilégio ON objeto TO ROLE papel concede o privilégio. GRANT ROLE a TO ROLE b cria a herança (b herda de a) e GRANT ROLE a TO USER u dá o papel ao usuário.",
"Grants em lote como ALL TABLES IN SCHEMA afetam só objetos existentes. Para objetos futuros, a doc mostra GRANT ... ON FUTURE TABLES IN SCHEMA. A doc lembra que future grants não se aplicam em renomear ou trocar (swap) tabelas e que conceder privilégios em lote não é recomendado: prefira um papel compartilhado.",
"```sql\nGRANT SELECT ON FUTURE TABLES IN SCHEMA meu_db.meu_schema TO ROLE analista;\nGRANT ROLE analista TO ROLE SYSADMIN;\n```"
], fonte: ["GRANT <privileges>", "https://docs.snowflake.com/en/sql-reference/sql/grant-privilege"] },
{ t: "Masking policies: esconder o valor, não a coluna", facil: "Traduzindo: a política decide, na hora da consulta, se você vê o valor real ou uma tarja, conforme o seu papel.", p: [
"Dynamic Data Masking é segurança de coluna: uma masking policy esconde valores em colunas de tabelas e views, no momento da consulta, em todo lugar onde a coluna aparece. Exige Enterprise Edition ou superior. A política é um objeto de schema.",
"O exemplo da doc usa CURRENT_ROLE() em um CASE e depois aplica com ALTER TABLE ... MODIFY COLUMN ... SET MASKING POLICY.",
"```sql\nCREATE OR REPLACE MASKING POLICY email_mask AS (val string) RETURNS string ->\n  CASE WHEN CURRENT_ROLE() IN ('ANALYST') THEN val ELSE '*********' END;\n\nALTER TABLE clientes MODIFY COLUMN email SET MASKING POLICY email_mask;\n```",
"Privilégios: criar exige CREATE MASKING POLICY no schema; aplicar exige o privilégio global APPLY MASKING POLICY (por padrão concedido a ACCOUNTADMIN), ou APPLY na política específica."
], fonte: ["Using Dynamic Data Masking", "https://docs.snowflake.com/en/user-guide/security-column-ddm-use"], dica: "Confira a edição da conta no Snowsight antes do laboratório: a doc de edições diz que mascaramento e acesso por linha não estão na Standard." },
{ t: "Row access policies: esconder linhas", facil: "Traduzindo: a política devolve verdadeiro ou falso para cada linha; falso, a linha some do resultado.", p: [
"Uma row access policy é um objeto de schema que decide quais linhas aparecem. A expressão retorna BOOLEAN e vale para SELECT e também para UPDATE, DELETE e MERGE. Exige Enterprise ou superior.",
"Você liga a política a uma coluna com ADD ROW ACCESS POLICY ... ON (coluna). Um padrão comum é consultar uma tabela de mapeamento (por exemplo gerente e região); a doc avisa que isso pode reduzir desempenho.",
"```sql\nCREATE OR REPLACE ROW ACCESS POLICY rap_regiao\n  AS (regiao VARCHAR) RETURNS BOOLEAN ->\n  CURRENT_ROLE() = 'ANALISTA_FULL' OR regiao = 'SUL';\n\nALTER TABLE clientes ADD ROW ACCESS POLICY rap_regiao ON (regiao);\n```"
], fonte: ["Row access policies", "https://docs.snowflake.com/en/user-guide/security-row-intro"], armadilha: "A doc diz que o Snowflake avalia a expressão da política usando o papel do dono da política, não o de quem consulta (isso importa nas consultas a tabelas de mapeamento dentro da política). Teste com USE ROLE para ver o efeito real." },
{ t: "Tags: classificar para governar", facil: "Traduzindo: tag é uma etiqueta chave e valor que você cola em tabelas e colunas para dizer, por exemplo, que são sensíveis.", p: [
"Uma tag é um objeto de schema atribuído a outros objetos; guarda um par chave e valor (sempre texto). Tags herdam: tag numa tabela vale para todas as colunas dela. A doc diz que criar e atribuir tags funciona em todas as edições; propagação de tags e mascaramento baseado em tag exigem Enterprise ou superior.",
"```sql\nCREATE TAG sensibilidade ALLOWED_VALUES 'pii', 'publico';\nALTER TABLE clientes MODIFY COLUMN email SET TAG sensibilidade = 'pii';\n```",
"Para ver onde as tags estão, use TAG_REFERENCES (view em ACCOUNT_USAGE, com atraso, ou função em INFORMATION_SCHEMA). Privilégios: CREATE no schema para criar a tag e APPLY para atribuir ou remover a tag em objetos; confira na página de uso de tags o escopo exato de cada um."
], fonte: ["Object tagging: introdução", "https://docs.snowflake.com/en/user-guide/object-tagging/introduction"], dica: "Com tag-based masking, você associa uma masking policy a uma tag e só precisa marcar as colunas. Exige Enterprise." },
{ t: "Autenticação e MFA em visão geral", facil: "Traduzindo: quem entra também importa. Pessoas usam MFA ou SSO; sistemas usam chave.", p: [
"A Snowflake exige segundo fator para usuários humanos que entram com senha e bloqueia senha para usuários de serviço, em fases com datas estimadas. Usuários humanos são TYPE igual a PERSON; usuários de serviço são TYPE igual a SERVICE; LEGACY_SERVICE é temporário. A página cita que contas de teste não estão sujeitas a essas fases.",
"Para chaves, a doc de key-pair pede RSA de no mínimo 2048 bits e cadastra a chave pública com ALTER USER; a rotação com chave nomeada mantém a anterior válida por 24 horas por padrão.",
"Confira a página oficial de MFA para o estado atual, porque datas e regras mudam."
], fonte: ["Snowflake MFA e fim do login só com senha", "https://docs.snowflake.com/en/user-guide/security-mfa-rollout"] }
],
exemplo: { t: "Caso trabalhado: analista vê o e-mail, estagiário não", texto: "A equipe tem uma tabela de clientes com e-mails de exemplo. A engenheira cria dois papéis, um funcional completo e um limitado, e concede a ambos USAGE no banco, no schema e no warehouse e SELECT na tabela. Em seguida cria uma masking policy que devolve o e-mail real só para o papel completo e uma tarja para os demais, e a aplica na coluna. Ela testa com USE ROLE: o papel completo vê os e-mails, o limitado vê asteriscos. Depois adiciona uma row access policy que deixa o papel limitado ver só a região Sul. Marca a coluna com a tag de sensibilidade pii e consulta TAG_REFERENCES para documentar. Por fim, volta para o papel padrão, e guarda os scripts e os prints no repositório, sem dados reais." },
prova: [
"Entrevista: explique RBAC no Snowflake: privilégios, papéis, hierarquia, papéis de sistema e por que ACCOUNTADMIN não deve rodar pipelines.",
"Entrevista: diferencie masking policy, row access policy e tag, e diga quando usar cada uma.",
"Trabalho: desenhar papéis de menor privilégio para um projeto ELT, com future grants e coluna sensível mascarada, e provar com USE ROLE."
],
explique: "Explique com suas palavras como você daria a uma analista acesso de leitura a uma tabela com coluna sensível, usando papéis, GRANT e mascaramento, sem usar ACCOUNTADMIN.",
checagem: [
"Por que dar SELECT na tabela não basta para uma pessoa conseguir consultá-la?",
"Qual a diferença entre masking policy e row access policy?",
"Para que servem future grants e o que ALL TABLES IN SCHEMA não cobre?",
"Quais restrições a doc coloca no uso de ACCOUNTADMIN?"
]
},
fontes: [
["Overview of access control", "https://docs.snowflake.com/en/user-guide/security-access-control-overview"],
["Access control considerations", "https://docs.snowflake.com/en/user-guide/security-access-control-considerations"],
["GRANT <privileges>", "https://docs.snowflake.com/en/sql-reference/sql/grant-privilege"],
["GRANT ROLE", "https://docs.snowflake.com/en/sql-reference/sql/grant-role"],
["Introduction to Dynamic Data Masking", "https://docs.snowflake.com/en/user-guide/security-column-ddm-intro"],
["Using Dynamic Data Masking", "https://docs.snowflake.com/en/user-guide/security-column-ddm-use"],
["Row access policies", "https://docs.snowflake.com/en/user-guide/security-row-intro"],
["Object tagging: introdução", "https://docs.snowflake.com/en/user-guide/object-tagging/introduction"],
["Work with object tags", "https://docs.snowflake.com/en/user-guide/object-tagging/work"],
["Snowflake editions", "https://docs.snowflake.com/en/user-guide/intro-editions"],
["Snowflake MFA e fim do login só com senha", "https://docs.snowflake.com/en/user-guide/security-mfa-rollout"],
["Key-pair authentication", "https://docs.snowflake.com/en/user-guide/key-pair-auth"]
],
cartoes: [
{ id: "a16c1", f: "Como funciona o RBAC no Snowflake?", v: "Privilégios são concedidos a papéis e papéis a usuários. Sem concessão, o acesso é negado. Cada objeto tem um único papel dono.", t: "s6" },
{ id: "a16c2", f: "O que é preciso para consultar uma tabela?", v: "USAGE no banco, USAGE no schema e SELECT na tabela, concedidos ao papel ativo. Só o SELECT não basta.", t: "s6" },
{ id: "a16c3", f: "Para que serve cada papel de sistema?", v: "ACCOUNTADMIN (topo), SECURITYADMIN (concessões), USERADMIN (usuários e papéis), SYSADMIN (objetos), PUBLIC (todos).", t: "s6" },
{ id: "a16c4", f: "O que a doc diz sobre ACCOUNTADMIN?", v: "Poucas pessoas (ao menos duas), MFA obrigatório, nunca papel padrão, nunca para criar objetos nem para automação.", t: "s6" },
{ id: "a16c5", f: "Como organizar papéis segundo a doc?", v: "Papéis de acesso a objetos agrupados em papéis funcionais, e os funcionais de topo concedidos a SYSADMIN.", t: "s6" },
{ id: "a16c6", f: "O que é um future grant?", v: "Concessão que vale para objetos criados depois, como GRANT SELECT ON FUTURE TABLES IN SCHEMA. ALL TABLES cobre só os existentes.", t: "s6" },
{ id: "a16c7", f: "Como aplicar uma masking policy a uma coluna?", v: "ALTER TABLE t MODIFY COLUMN col SET MASKING POLICY nome. A política é avaliada na consulta, com base no papel ativo.", t: "s6" },
{ id: "a16c8", f: "Qual edição exige masking e row access?", v: "Enterprise ou superior. A doc de edições diz que a Standard não inclui masking policies nem row access policies.", t: "s6" },
{ id: "a16c9", f: "O que uma row access policy devolve?", v: "BOOLEAN por linha. Verdadeiro mantém a linha no resultado. Vale para SELECT, UPDATE, DELETE e MERGE.", t: "s6" },
{ id: "a16c10", f: "O que é uma tag e quanto ela herda?", v: "Objeto de schema com chave e valor de texto. Uma tag na tabela é herdada por todas as colunas dela.", t: "s6" },
{ id: "a16c11", f: "Quais usuários a Snowflake classifica por tipo?", v: "PERSON (humano), SERVICE (sem senha, para sistemas) e LEGACY_SERVICE (temporário). Conta de teste não entra nas fases de MFA.", t: "s6" },
{ id: "a16c12", f: "Como testar o efeito de uma masking policy?", v: "Troque o papel com USE ROLE e consulte a coluna: o valor aparece ou vem mascarado conforme CURRENT_ROLE() na política.", t: "s6" }
],
questoes: [
{ id: "a16q1", s: 2, t: "s6", e: "Uma analista recebeu GRANT SELECT na tabela vendas, mas ao consultar recebe erro dizendo que o objeto não existe ou não está autorizado. A tabela está num schema do banco dw. O que provavelmente falta?", o: ["GRANT USAGE no banco e no schema para o papel dela", "GRANT ACCOUNTADMIN ao usuário", "Reiniciar o warehouse", "Criar uma tag na tabela"], c: [0], x: "Acessar uma tabela exige privilégios nos contêineres: USAGE no banco e no schema, além do SELECT. Sem isso, o papel não enxerga o objeto. Conceder ACCOUNTADMIN seria excesso e contra as boas práticas. Reiniciar o warehouse não altera autorização. Tags classificam objetos, não concedem acesso." },
{ id: "a16q2", s: 2, t: "s6", e: "A equipe quer que novas tabelas criadas no schema staging já nasçam legíveis pelo papel analista, sem que alguém precise lembrar de conceder SELECT a cada nova tabela. Qual recurso resolve?", o: ["GRANT SELECT ON ALL TABLES IN SCHEMA, executado uma vez", "Future grants: GRANT SELECT ON FUTURE TABLES IN SCHEMA ao papel analista", "Dar OWNERSHIP do schema ao analista", "Usar uma masking policy"], c: [1], x: "Future grants definem privilégios para objetos que ainda serão criados no schema. ALL TABLES IN SCHEMA afeta só objetos existentes no momento da concessão, então não cobre tabelas novas. Dar OWNERSHIP é privilégio excessivo. Masking policy esconde valores de coluna e não concede acesso." },
{ id: "a16q3", s: 2, t: "s6", e: "Um engenheiro quer rodar o pipeline noturno do ELT com a conta mais poderosa, porque assim nunca falta permissão. O que a documentação do Snowflake recomenda?", o: ["Tudo bem, ACCOUNTADMIN foi feito para automação", "Usar SECURITYADMIN, que engloba SYSADMIN", "Rodar scripts de automação com SYSADMIN ou um papel inferior na hierarquia, e reservar ACCOUNTADMIN para poucos casos", "Definir ACCOUNTADMIN como papel padrão de todos os usuários"], c: [2], x: "A doc diz que ACCOUNTADMIN não deve criar objetos nem ser usado em automação, nem ser papel padrão; scripts devem rodar com SYSADMIN ou papel inferior. SECURITYADMIN gerencia concessões e usuários, não engloba SYSADMIN (é ACCOUNTADMIN que engloba os dois). Tornar ACCOUNTADMIN padrão é o oposto da recomendação." },
{ id: "a16q4", s: 2, t: "s6", e: "Uma tabela de clientes tem e-mails. O papel suporte deve ver a tabela inteira, mas com e-mail mascarado; o papel dpo deve ver o e-mail real. Qual recurso se encaixa melhor, e qual edição é necessária?", o: ["Row access policy, em qualquer edição", "Tag sem policy, em qualquer edição", "Masking policy com CURRENT_ROLE(), em Enterprise ou superior", "View comum sem policy, em Standard apenas"], c: [2], x: "Masking policy esconde valores de coluna conforme o papel, avaliada na consulta; a doc de edições diz que exige Enterprise ou superior. Row access policy esconde linhas, não valores de coluna. Uma tag sozinha só classifica. Uma view comum até pode esconder coluna, mas a pergunta pede o recurso de mascaramento por papel sobre a mesma tabela." },
{ id: "a16q5", s: 2, t: "s6", e: "Representantes comerciais devem ver só os clientes da própria região na mesma tabela, com a mesma consulta SELECT * FROM clientes. Qual recurso e qual abordagem a doc descreve?", o: ["Masking policy na coluna região", "Row access policy ligada à coluna região, às vezes usando uma tabela de mapeamento", "Criar uma tabela por região manualmente", "Future grants por região"], c: [1], x: "Row access policy devolve BOOLEAN por linha e é ligada à coluna com ADD ROW ACCESS POLICY ... ON (coluna); a doc cita o padrão de tabela de mapeamento. Masking policy altera o valor de uma coluna e não remove linhas. Criar tabelas por região é gambiarra de manutenção. Future grants tratam objetos novos e não filtram linhas." },
{ id: "a16q6", s: 2, t: "s6", e: "Uma pessoa criou a masking policy do e-mail, liberando o valor real apenas para o papel analista_full, e a aplicou na coluna. No teste, ela consultou a tabela com o papel analista_full e viu o e-mail real, e concluiu que o mascaramento falhou. O que explica o resultado?", o: ["Masking policies não funcionam em colunas de texto", "Masking policies só passam a valer 24 horas depois de aplicadas", "O teste foi feito com um papel que a própria política libera; para provar o efeito é preciso trocar com USE ROLE para um papel que não está na lista", "Uma tag na coluna cancela a masking policy"], c: [2], x: "A política decide pelo papel ativo, usando CURRENT_ROLE(). Se o papel está na lista de liberados, ele vê o valor real, o que é o comportamento correto. O teste que prova o mascaramento é trocar para outro papel com USE ROLE e consultar de novo. Masking funciona em colunas de texto, é aplicado na hora da consulta, sem espera, e uma tag não cancela a política." }
],
lab: {
t: "Funções de menor privilégio, mascaramento de coluna e teste com USE ROLE",
custo: "Gratuito: só consultas minúsculas em warehouse X-Small, que suspende sozinho. Mascaramento e acesso por linha exigem Enterprise ou superior (confira a edição da sua conta de teste; se for Standard, faça só os papéis e as tags).",
tempo: "40 a 60 min",
porque: "Governança com evidência é o que diferencia um projeto de portfólio. Este laboratório entrega os papéis, a política e o teste que vão para o projeto ELT governado.",
antes: "Você precisa da conta de teste, de um warehouse X-Small e de um banco criados nas aulas 11 e 12. Os dados são inventados. Os passos foram conferidos contra a documentação oficial, mas NÃO foram executados: nomes, privilégios exigidos e mensagens podem diferir. Para a política de mascaramento, a doc diz que o privilégio APPLY MASKING POLICY é concedido por padrão a ACCOUNTADMIN; por simplicidade, o passo usa ACCOUNTADMIN só para criar e aplicar a política. Em produção, crie um papel dedicado como a doc mostra.",
passos: [
{ t: "Criar papéis de menor privilégio", cmd: "USE ROLE USERADMIN;\nCREATE ROLE IF NOT EXISTS lab_analyst_full;\nCREATE ROLE IF NOT EXISTS lab_analyst_limited;\n\nUSE ROLE SECURITYADMIN;\nGRANT ROLE lab_analyst_full TO ROLE SYSADMIN;\nGRANT ROLE lab_analyst_limited TO ROLE SYSADMIN;\nGRANT ROLE lab_analyst_full TO USER <seu_usuario>;\nGRANT ROLE lab_analyst_limited TO USER <seu_usuario>;", p: "USERADMIN cria papéis, SECURITYADMIN concede. A concessão a SYSADMIN liga a hierarquia, como a doc recomenda. Veja seu usuário com SELECT CURRENT_USER();" },
{ t: "Criar a tabela de amostra", cmd: "USE ROLE SYSADMIN;\nCREATE SCHEMA IF NOT EXISTS <seu_db>.gov_lab;\nCREATE OR REPLACE TABLE <seu_db>.gov_lab.clientes (id NUMBER, nome STRING, email STRING, regiao STRING);\nINSERT INTO <seu_db>.gov_lab.clientes VALUES\n  (1,'Cliente A','a@exemplo.test','SUL'),\n  (2,'Cliente B','b@exemplo.test','NORTE');", p: "E-mails de domínio de teste, inventados. Nada de dado real." },
{ t: "Conceder o mínimo necessário", cmd: "USE ROLE SECURITYADMIN;\nGRANT USAGE ON WAREHOUSE <seu_warehouse> TO ROLE lab_analyst_full;\nGRANT USAGE ON WAREHOUSE <seu_warehouse> TO ROLE lab_analyst_limited;\nGRANT USAGE ON DATABASE <seu_db> TO ROLE lab_analyst_full;\nGRANT USAGE ON DATABASE <seu_db> TO ROLE lab_analyst_limited;\nGRANT USAGE ON SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_full;\nGRANT USAGE ON SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_limited;\nGRANT SELECT ON FUTURE TABLES IN SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_full;\nGRANT SELECT ON FUTURE TABLES IN SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_limited;\nGRANT SELECT ON ALL TABLES IN SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_full;\nGRANT SELECT ON ALL TABLES IN SCHEMA <seu_db>.gov_lab TO ROLE lab_analyst_limited;", p: "A doc de GRANT diz que future grants em schema comum exigem MANAGE GRANTS, que por padrão só SECURITYADMIN e ACCOUNTADMIN têm; por isso este passo usa SECURITYADMIN. Os dois papéis começam com o mesmo acesso: o mascaramento é que vai diferenciá-los." },
{ t: "Criar e aplicar a masking policy", cmd: "USE ROLE ACCOUNTADMIN;\nCREATE OR REPLACE MASKING POLICY <seu_db>.gov_lab.email_mask AS (val STRING) RETURNS STRING ->\n  CASE WHEN CURRENT_ROLE() IN ('LAB_ANALYST_FULL') THEN val ELSE '*********' END;\n\nALTER TABLE <seu_db>.gov_lab.clientes MODIFY COLUMN email SET MASKING POLICY <seu_db>.gov_lab.email_mask;\nUSE ROLE SYSADMIN;", p: "O nome do papel dentro da política vem em maiúsculas, como o Snowflake o guarda. Se der erro de edição, sua conta provavelmente é Standard." },
{ t: "Testar com USE ROLE", cmd: "USE ROLE lab_analyst_full;\nUSE WAREHOUSE <seu_warehouse>;\nSELECT * FROM <seu_db>.gov_lab.clientes;\n\nUSE ROLE lab_analyst_limited;\nSELECT * FROM <seu_db>.gov_lab.clientes;", p: "O primeiro papel vê o e-mail real; o segundo vê asteriscos. Tire print dos dois resultados." },
{ t: "Opcional: acesso por linha e tag", cmd: "USE ROLE ACCOUNTADMIN;\nCREATE OR REPLACE ROW ACCESS POLICY <seu_db>.gov_lab.rap_regiao AS (regiao VARCHAR) RETURNS BOOLEAN ->\n  CURRENT_ROLE() = 'LAB_ANALYST_FULL' OR regiao = 'SUL';\nALTER TABLE <seu_db>.gov_lab.clientes ADD ROW ACCESS POLICY <seu_db>.gov_lab.rap_regiao ON (regiao);\n\nCREATE TAG IF NOT EXISTS <seu_db>.gov_lab.sensibilidade ALLOWED_VALUES 'pii','publico';\nALTER TABLE <seu_db>.gov_lab.clientes MODIFY COLUMN email SET TAG <seu_db>.gov_lab.sensibilidade = 'pii';\nUSE ROLE lab_analyst_limited;\nSELECT * FROM <seu_db>.gov_lab.clientes;", p: "O papel limitado agora vê só a linha da região SUL. A tag documenta que o e-mail é sensível; consulte TAG_REFERENCES (view em ACCOUNT_USAGE, que atrasa; ou a função em INFORMATION_SCHEMA) para listar. Para a política de linha, a doc cita o privilégio APPLY ROW ACCESS POLICY na conta; aqui usamos ACCOUNTADMIN só por ser conta de teste." }
],
verificar: "Você deve ver o e-mail real com o papel completo e mascarado com o limitado, e (se fez o opcional) apenas a região SUL para o limitado. Salve os prints e os scripts.",
limpar: [
"USE ROLE SYSADMIN; e volte ao papel de trabalho; não deixe ACCOUNTADMIN como papel ativo.",
"ALTER WAREHOUSE <seu_warehouse> SUSPEND; e confirme AUTO_SUSPEND curto.",
"Guarde no repositório snowflake-elt-portfolio: 05_governanca.sql com papéis, grants, policies e tag, o README em inglês explicando o desenho e os prints do teste.",
"NUNCA commite senhas, chaves, tokens, nomes de conta ou dados pessoais reais. Os dados deste laboratório são inventados.",
"Opcional: remova as políticas (UNSET nas colunas, depois DROP) e os papéis de laboratório ao concluir o projeto."
],
erros: [
{ s: "Erro de feature não disponível ao criar a masking policy", c: "A edição da conta não inclui masking policies (exige Enterprise ou superior)", r: "Confira a edição na conta; se for Standard, faça só papéis, grants e tags." },
{ s: "Os dois papéis veem o e-mail real", c: "Teste feito com papel que a política libera, ou política não aplicada à coluna", r: "Confirme o nome do papel em maiúsculas na política, rode USE ROLE lab_analyst_limited e verifique o SET MASKING POLICY na coluna." },
{ s: "Papel limitado não consegue ler a tabela", c: "Falta USAGE no banco, no schema ou no warehouse, ou SELECT na tabela", r: "Revise os GRANTs do passo 3; use SECURITYADMIN se faltar privilégio para conceder." },
{ s: "Erro de privilégio ao aplicar a política ou a tag", c: "O papel não tem APPLY MASKING POLICY, APPLY TAG ou propriedade sobre o objeto", r: "Confira a doc de privilégios e use um papel com o privilégio, ou ACCOUNTADMIN apenas neste passo de laboratório." }
]
}
};
})(typeof window !== 'undefined' ? window : globalThis);
