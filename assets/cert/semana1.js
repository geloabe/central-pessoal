(function (root) {
  var C = root.CP_CERT_CONTEUDO = root.CP_CERT_CONTEUDO || { dias: {} };
C.dias[1] = {
minQuestoes: 5,
aula: {
titulo: "Como estudar para esta prova",
resumo: "Estrutura do exame, como ler questão de cenário, gestão de tempo, método de estudo que funciona (recuperação ativa e repetição espaçada), mapa dos 19 tópicos e preparação segura da conta do Google Cloud.",
blocos: [
{ t: "Estrutura do exame", p: [
"A Professional Data Engineer testa decisão de arquitetura, não decoreba de comando. Cada questão descreve uma empresa, uma dor e restrições (custo, latência, equipe pequena, conformidade) e pede a melhor solução. Quase sempre mais de uma alternativa funciona tecnicamente; só uma atende todas as restrições ao mesmo tempo.",
"O formato: 40 a 50 questões em 2 horas, de múltipla escolha e múltipla seleção (Choose two). A prova é aplicada somente em inglês ou japonês, então os termos em inglês precisam virar reflexo. A taxa de inscrição é de US$ 200 mais impostos (confira o valor atual na página oficial). A certificação vale por 2 anos. Você pode fazer online, com fiscal remoto, ou presencial em centro de testes; nos dois casos precisa de documento com foto válido. A nota de corte não é divulgada e o resultado é aprovado ou reprovado."
], tabela: { cab: ["Seção do guia v4.2", "Peso", "Foco prático"], linhas: [
["1. Projetar sistemas de processamento", "22%", "Segurança, confiabilidade, portabilidade, migração"],
["2. Ingerir e processar dados", "25%", "Pub/Sub, Dataflow, Dataproc, Composer, streaming"],
["3. Armazenar dados", "20%", "Escolha de armazenamento, BigQuery, lake, Dataplex"],
["4. Preparar e usar dados para análise", "15%", "BI, BigQuery ML, compartilhamento"],
["5. Manter e automatizar cargas", "18%", "Custo, reservas, monitoramento, falhas"]
] }, dica: "Os pesos acima seguem o guia v4.2; confira os percentuais no PDF oficial, que pode ser atualizado. As seções 2 e 1 somam quase metade da prova, mas armazenamento e BigQuery aparecem dentro de quase todas as questões. Por isso a semana 1 foca nelas." },
{ t: "Como ler uma questão de cenário", p: [
"Leia primeiro a última frase (a pergunta) e só depois o cenário. Assim você sabe o que procurar: o serviço mais barato, o de menor esforço operacional, o que minimiza latência, o que atende conformidade. Depois sublinhe mentalmente as restrições: tamanho dos dados, batch ou streaming, SQL ou não, equipe sem DevOps, dados já em Spark, exigência de região, exigência de chave própria.",
"Em seguida elimine por violação de requisito, não por gosto. Uma alternativa que exige gerenciar cluster viola least operational overhead. Uma alternativa que copia dados para fora do perímetro viola conformidade. Uma alternativa que usa um serviço que não serve para aquele padrão (por exemplo, banco transacional para análise de petabytes) cai logo. Sobrando duas, compare qual usa o serviço gerenciado e nativo do Google Cloud."
], lista: [
"Palavras que apontam decisão: MOST cost-effective, LEAST operational overhead, minimize latency, near real-time, globally consistent, petabyte-scale, existing Hadoop/Spark jobs, without changing code.",
"Palavras de restrição: must stay in the EU, customer-managed keys, no public IP, PII, audit, exactly once, ad hoc SQL.",
"Em Choose two, cada resposta precisa ser correta por si só e responder à pergunta; não basta ser verdadeira."
], armadilha: "Escolher a solução mais poderosa em vez da mais simples que atende. A prova premia o serviço gerenciado e suficiente, não o mais sofisticado." },
{ t: "Gestão de tempo", p: [
"Com 2 horas e cerca de 50 questões, o orçamento é de uns 2,4 minutos por questão. Faça uma primeira passada rápida: questões que você sabe, responda em até 1,5 minuto; as duvidosas, marque para revisão e siga. Não gaste 6 minutos em uma questão e perca três fáceis no fim.",
"Reserve os últimos 10 a 15 minutos para revisar as marcadas. Na revisão, releia a pergunta e as restrições, não a sua primeira escolha. Nunca deixe em branco: eliminar duas alternativas já leva o acerto a 50%."
] },
{ t: "Método de estudo que ensina de verdade", p: [
"Reler e sublinhar dá a sensação de aprender sem gerar memória. O que funciona: recuperação ativa (tentar lembrar antes de olhar a resposta), repetição espaçada (rever em 1, 3, 7 e 14 dias) e explicar em voz alta, como se ensinasse. Cada aula daqui termina com uma pergunta de explicar sem consultar: se travou, você achou a lacuna.",
"Mantenha um caderno de erros. Para cada questão errada, escreva: qual restrição eu ignorei, qual conceito faltou e a regra em uma frase. Erro de leitura e erro de conceito pedem remédios diferentes. Transforme cada erro em um cartão. Os labs servem para fixar o mecanismo: quem já viu o dry run mostrar bytes não esquece que LIMIT não reduz custo."
], lista: [
"Dia típico: aula (leitura ativa), cartões, questões, lab quando houver.",
"Antes de ler a explicação de uma questão, justifique em voz alta por que cada alternativa errada erra.",
"Aos domingos, revisar só o caderno de erros da semana."
] },
{ t: "Mapa dos 19 tópicos", p: [
"O guia lista 19 tópicos em 5 seções. Na aba Tópicos, dê nota de 0 a 3 a cada um agora e repita ao fim de cada semana. Veja o mapa como grupos de decisão:"
], lista: [
"Seção 1 (1.1 a 1.4): segurança e conformidade, confiabilidade, portabilidade, migração.",
"Seção 2 (2.1 a 2.3): planejar, construir e operacionalizar pipelines.",
"Seção 3 (3.1 a 3.4): escolher armazenamento, warehouse, lake, data mesh.",
"Seção 4 (4.1 a 4.3): preparar para visualização, para IA/ML e compartilhar dados.",
"Seção 5 (5.1 a 5.5): otimizar recursos, automatizar, organizar cargas, monitorar, mitigar falhas."
] },
{ t: "Preparar a conta do Google Cloud sem surpresa de custo", p: [
"Crie um projeto exclusivo para estudo (projeto é a unidade de cobrança, de APIs e de IAM). Contas novas costumam receber créditos de boas-vindas por prazo limitado; valores e regras mudam, confira na página oficial do nível gratuito (não dependa de um número fixo). Além disso há o nível gratuito permanente de alguns serviços: no BigQuery, o primeiro 1 TiB de consultas por mês e 10 GiB de armazenamento são gratuitos. Existe também o BigQuery sandbox, que dispensa cartão e conta de faturamento, com limites: 10 GiB de armazenamento, 1 TiB de consultas por mês, tabelas e partições que expiram em 60 dias, e sem streaming, DML nem BigQuery Data Transfer Service. Os labs a seguir usam DML e CTAS em parte, então use um projeto com faturamento vinculado (e orçamento).",
"Vincule a conta de faturamento (billing) e, antes de qualquer lab, crie um orçamento (budget) com alertas em 50%, 90% e 100%. Atenção: orçamento não bloqueia gasto; ele apenas notifica. Para cortar automaticamente é preciso automação (notificação por Pub/Sub e uma função que desvincula o billing) ou cotas customizadas.",
"Ative só as APIs necessárias (bigquery.googleapis.com, storage.googleapis.com). Use o Cloud Shell, que já traz gcloud, bq e gsutil autenticados, sem instalar nada."
], lista: [
"Regra 1: todo recurso criado num lab tem um comando de limpeza; rode ao terminar.",
"Regra 2: antes de consulta no BigQuery, rode dry run e use maximum_bytes_billed.",
"Regra 3: nada de cluster, Composer ou Spanner ligado de um dia para o outro sem necessidade; esses cobram por tempo ligado.",
"Regra 4: defina expiração padrão nos datasets e tabelas de estudo.",
"Regra 5: revise o painel de Billing no fim de cada semana."
], armadilha: "Achar que o alerta de orçamento impede cobrança. Ele avisa depois que o gasto já aconteceu e pode atrasar." },
{ t: "Fundamentos que caem em todo lugar", p: [
"Hierarquia de recursos: Organization, Folders, Projects, recursos. IAM e organization policies são herdados de cima para baixo e as permissões somam; não se remove por herança (exceto com deny policies). Daí a regra: conceda no nível mais baixo que resolve, com papéis predefinidos, a grupos e não a pessoas.",
"Localização: região (ex.: southamerica-east1, us-central1) ou multirregião (US, EU). A localização de um dataset do BigQuery não muda depois de criada; para mudar é preciso copiar. Uma consulta não junta tabelas de localizações diferentes. Multirregião favorece disponibilidade e simplicidade; região única favorece soberania, latência perto da fonte e, em geral, custo.",
"BigQuery em uma linha: armazenamento colunar desacoplado da computação, cobrado por bytes lidos (sob demanda) ou por capacidade (slots). Selecionar colunas e filtrar partição reduz custo; LIMIT não reduz."
], tabela: { cab: ["Conceito", "Regra para a prova"], linhas: [
["Projeto", "Fronteira de cobrança, APIs e IAM; separe dev e prod em projetos distintos"],
["Papel básico (Owner/Editor/Viewer)", "Evitar em produção; amplos demais"],
["Papel predefinido", "Padrão recomendado; granular por serviço"],
["Dataset location", "Imutável; define onde os dados ficam"],
["Dry run", "Estima bytes sem custo e sem executar"]
] } }
],
exemplo: { t: "Lendo uma questão de verdade", texto: "Cenário: uma varejista tem 40 TB de vendas no Cloud Storage, analistas que sabem SQL, equipe sem administradores de banco, e quer o menor custo com consultas ad hoc. Passo 1, pergunta: menor custo e menor esforço. Passo 2, restrições: SQL, analítico, equipe pequena, 40 TB. Passo 3, eliminar: Cloud SQL não escala para análise desse tamanho; Bigtable não faz SQL ad hoc; cluster Hadoop exige administração. Passo 4, sobra BigQuery, carregando em lote (grátis) ou usando tabela externa. O detalhe que desempata é carga em lote em vez de streaming, porque não há requisito de tempo real." },
prova: [
"A prova cobra decisão entre serviços vizinhos; palavras como LEAST operational overhead e fully managed empurram para Dataflow, BigQuery, Pub/Sub e para longe de clusters.",
"Palavras como existing Spark jobs ou without rewriting indicam Dataproc; globally consistent transactions indica Spanner; single-digit millisecond at massive scale indica Bigtable.",
"Requisitos de conformidade (residency, customer-managed keys, perimeter) mudam a resposta mesmo quando a opção técnica parece igual.",
"Em Choose two, procure duas respostas independentes que juntas cobrem os requisitos."
],
explique: "Explique em voz alta, sem consultar: como você vai ler uma questão de cenário, em que ordem, e como vai eliminar alternativas. Depois diga por que alerta de orçamento não impede custo."
},
cartoes: [
{ id: "d1c1", t: "1.1", f: "Quantas questões e quanto tempo tem a prova PDE, e em que idiomas?", v: "40 a 50 questões em 2 horas, somente em inglês ou japonês, taxa de US$ 200 mais impostos. Orçamento médio: cerca de 2,4 minutos por questão." },
{ id: "d1c2", t: "1.1", f: "Qual a validade da certificação PDE e como se faz a prova?", v: "Vale 2 anos. Pode ser online (fiscal remoto) ou presencial em centro de testes, com documento com foto. A nota de corte não é divulgada." },
{ id: "d1c3", t: "2.2", f: "Peso da seção 2 (Ingerir e processar dados) e da seção 1?", v: "Seção 2: 25%, a maior. Seção 1 (projetar sistemas): 22%. Juntas somam 47% da prova." },
{ id: "d1c4", t: "3.1", f: "Pesos das seções 3, 4 e 5 do guia v4.2?", v: "Seção 3 (armazenar): 20%. Seção 4 (preparar e usar dados para análise): 15%. Seção 5 (manter e automatizar cargas): 18%." },
{ id: "d1c5", t: "1.1", f: "Regra de ouro: o que fazer primeiro ao ler uma questão de cenário?", v: "Ler a pergunta final, depois marcar restrições (custo, latência, equipe, conformidade) e eliminar alternativas que violam algum requisito." },
{ id: "d1c6", t: "5.4", f: "Orçamento (budget) do Google Cloud bloqueia gasto acima do limite?", v: "Não. Ele só envia alertas. Para cortar gasto é preciso automação (notificação Pub/Sub mais função que desvincula billing) ou cotas customizadas." },
{ id: "d1c7", t: "3.2", f: "LIMIT reduz o custo de uma consulta sob demanda no BigQuery?", v: "Não. O custo depende dos bytes lidos das colunas e partições escolhidas. Reduz-se com menos colunas e filtro de partição; confira antes com dry run." },
{ id: "d1c8", t: "3.2", f: "Como estimar o custo de uma consulta BigQuery sem executá-la?", v: "Com dry run (bq query --dry_run, ou o validador no console). Mostra os bytes que seriam processados, sem custo." },
{ id: "d1c9", t: "1.1", f: "Hierarquia de recursos do Google Cloud, de cima para baixo?", v: "Organization, Folders, Projects, recursos. IAM e organization policies são herdados para baixo; conceda no nível mais baixo que resolve." },
{ id: "d1c10", t: "5.5", f: "A localização de um dataset do BigQuery pode ser alterada depois?", v: "Não. Para mudar é preciso criar dataset na nova localização e copiar os dados. Consultas também não juntam tabelas de localizações diferentes." },
{ id: "d1c11", t: "1.1", f: "Por que preferir papéis predefinidos a básicos (Owner/Editor/Viewer)?", v: "Os básicos são amplos demais e violam o menor privilégio. Predefinidos são granulares por serviço; customizados só quando nenhum predefinido serve." },
{ id: "d1c12", t: "3.1", f: "Em Choose two, o que cada resposta precisa ser?", v: "Correta por si só e adequada aos requisitos do cenário. Verdadeira mas irrelevante é distrator." }
],
questoes: [
{ id: "d1q1", s: 1, t: "1.1", e: "A company stores sales data in a BigQuery dataset in project data-prod. A group of analysts must run queries on that dataset but must not be able to modify or delete tables, and must not see other datasets in the project. What should you do?", o: ["Grant the group the BigQuery Data Viewer role on the dataset and the BigQuery Job User role on the project", "Grant the group the Editor basic role on project data-prod", "Grant the group the BigQuery Admin role on the dataset", "Grant each analyst the Viewer basic role on the organization"], c: [0], x: "Correta: para consultar, o grupo precisa de permissão de ler os dados (BigQuery Data Viewer, concedido só no dataset, o que limita o acesso aos demais) e de permissão para criar jobs de consulta (BigQuery Job User no projeto). Editor básico é amplo demais e permite alterar recursos, violando o menor privilégio. BigQuery Admin no dataset permite modificar e apagar tabelas, o que é proibido. Viewer básico na organização daria leitura a cada projeto, muito além do necessário, e ainda não substitui a permissão de criar jobs de consulta." },
{ id: "d1q2", s: 1, t: "1.1", e: "Your company has three departments, each with many projects. Security requires that external IP addresses be blocked on VM instances for every project of the Finance department, without configuring each project individually, while other departments are unaffected. What is the best approach?", o: ["Apply the organization policy constraint at the project level in every Finance project", "Create a folder for Finance, move its projects into it, and apply the organization policy at the folder", "Apply the organization policy at the organization node and add exceptions for the other departments in each project", "Grant Finance users a custom IAM role that denies external IPs"], c: [1], x: "Correta: organization policies são herdadas pela hierarquia, então aplicar no folder de Finance cobre cada projeto atual e futuro dele sem tocar nos demais. Aplicar em cada projeto funciona, mas é trabalhoso e novos projetos ficam sem a regra. Aplicar na organização e abrir exceções em cada projeto inverte o esforço e afeta as demais áreas por padrão. Papéis IAM concedem permissões, não negam nem impõem restrições de configuração de recursos; restrições desse tipo são feitas por organization policy." },
{ id: "d1q3", s: 1, t: "1.1", e: "A European bank must keep customer data in the EU and wants to analyze it with BigQuery. A developer created the dataset in the US multi-region by mistake. What should you do?", o: ["Change the dataset location to EU in the dataset settings", "Set an organization policy on the US dataset so that data is stored in the EU", "Create a new dataset in the EU location, copy the tables into it, and delete the US dataset", "Query the US dataset from an EU project to keep the compute in Europe"], c: [2], x: "Correta: a localização de um dataset é imutável; o caminho é criar um dataset na localização EU, copiar as tabelas e remover o antigo. Alterar nas configurações não é possível. Uma organization policy de restrição de localização impede criar recursos em locais proibidos, mas não move dados existentes. Consultar de projeto europeu não muda onde os dados estão armazenados; a consulta roda na localização do dataset e os dados continuam nos EUA, violando a residência." },
{ id: "d1q4", s: 3, t: "3.2", e: "A data analyst runs SELECT * FROM a 20 TB BigQuery table with LIMIT 10 to preview the data, using on-demand pricing. The finance team complains about the cost. What should you recommend to preview data at no cost?", o: ["Add a smaller LIMIT such as LIMIT 1", "Run the query at night when prices are lower", "Convert the table to a view", "Use the table preview in the console or bq head, which does not run a query"], c: [3], x: "Correta: a visualização prévia do console e o comando bq head leem as primeiras linhas diretamente do armazenamento, sem executar consulta e sem custo. LIMIT não reduz os bytes lidos na cobrança sob demanda, então diminuir o LIMIT não ajuda. O preço sob demanda do BigQuery não varia por horário. Uma view é apenas uma consulta salva; ao consultar a view, a tabela subjacente é lida do mesmo jeito." },
{ id: "d1q5", s: 5, t: "5.4", e: "You are setting up a personal Google Cloud project for training and want to avoid an unexpected bill. Which action best ensures spending is automatically stopped when a threshold is reached?", o: ["Create a budget with email alerts at 50 percent and 100 percent", "Create a budget that publishes to Pub/Sub and trigger a function that disables billing on the project", "Enable audit logs on the project", "Use only the Cloud Shell, which is always free"], c: [1], x: "Correta: o orçamento apenas notifica; para agir, ele publica em um tópico Pub/Sub e uma função pode desvincular o billing do projeto, interrompendo o gasto (com o risco de derrubar recursos). Alertas por e-mail sozinhos avisam, mas não param nada. Logs de auditoria registram atividade e não controlam custo. O Cloud Shell em si não gera cobrança, mas os recursos que você cria a partir dele (VMs, datasets, consultas fora do nível gratuito) continuam gerando." }
],
lab: { t: "Configurar a conta e rodar a primeira consulta", custo: "US$ 0 dentro do nível gratuito (consulta de poucos MB em dataset público).",
porque: "Cria o ambiente seguro dos próximos labs e mostra na prática o dry run e o limite de bytes cobrados, dois reflexos cobrados em prova.",
passos: [
{ t: "Criar o projeto e vincular o billing", cmd: "gcloud projects create SEU-PROJETO-ESTUDO-123 --name=\"Estudo PDE\"\ngcloud config set project SEU-PROJETO-ESTUDO-123\ngcloud billing accounts list\ngcloud billing projects link SEU-PROJETO-ESTUDO-123 --billing-account=ID_DA_CONTA", p: "Use o Cloud Shell. O ID do projeto é único globalmente; troque pelo seu. O billing precisa estar vinculado antes de usar a maioria dos serviços." },
{ t: "Criar um orçamento com alertas", cmd: "gcloud services enable billingbudgets.googleapis.com\ngcloud billing budgets create --billing-account=ID_DA_CONTA --display-name=\"estudo-pde\" --budget-amount=10 --threshold-rule=percent=0.5 --threshold-rule=percent=0.9 --threshold-rule=percent=1.0", p: "Orçamento só alerta, não bloqueia. O valor 10 usa a moeda da conta de faturamento (se escrever o código da moeda, como 10USD, ele precisa ser igual ao da conta). Se o comando falhar, crie pelo console em Billing, Budgets & alerts (confira a sintaxe atual do gcloud)." },
{ t: "Ativar as APIs", cmd: "gcloud services enable bigquery.googleapis.com storage.googleapis.com", p: "Algumas APIs já vêm ativadas num projeto novo e outras não; ativar uma API por si só não gera custo." },
{ t: "Dry run em dataset público", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT word, SUM(word_count) AS total FROM `bigquery-public-data.samples.shakespeare` GROUP BY word'", p: "Mostra quantos bytes seriam processados sem executar nem cobrar. Anote o valor." },
{ t: "Executar com teto de bytes e comparar colunas", cmd: "bq query --use_legacy_sql=false --maximum_bytes_billed=100000000 'SELECT word, SUM(word_count) AS total FROM `bigquery-public-data.samples.shakespeare` GROUP BY word ORDER BY total DESC LIMIT 10'\nbq query --use_legacy_sql=false --dry_run 'SELECT * FROM `bigquery-public-data.samples.shakespeare`'", p: "maximum_bytes_billed faz a consulta falhar se passar do teto, protegendo o bolso. Compare os bytes de selecionar 2 colunas com SELECT *: colunar significa ler só o que você pede." }
],
limpar: ["Nada foi criado além do projeto. Para apagar tudo no fim do estudo: gcloud projects delete SEU-PROJETO-ESTUDO-123", "Delete também o orçamento no console (Billing, Budgets & alerts) se não quiser mantê-lo."],
verificar: "O dry run mostra a mensagem com a quantidade de bytes, a consulta com teto retorna 10 linhas e o dry run do SELECT * mostra mais bytes que o da consulta com duas colunas." }
};
C.dias[2] = {
aula: {
titulo: "BigQuery I: arquitetura, carga e particionamento",
resumo: "Como o BigQuery separa armazenamento e computação, como cobra, as formas de carregar dados (lote, streaming, Storage Write API) e quando usar partição, cluster, expiração e time travel para reduzir custo e tempo.",
blocos: [
{ t: "Ideia central: armazenamento e computação separados", p: [
"O BigQuery é um data warehouse serverless. Os dados ficam em armazenamento colunar gerenciado pelo Google (formato Capacitor, sobre o sistema de arquivos distribuído Colossus), e a computação roda em slots, unidades de CPU e memória alocadas por consulta. As duas camadas escalam de forma independente e se falam por uma rede de alta velocidade interna. Por isso você pode guardar petabytes sem pagar por servidores ligados e pode dar mais capacidade de consulta sem mover dado.",
"Como o formato é colunar, a consulta lê apenas as colunas citadas. Esse é o primeiro mecanismo de custo: SELECT * lê tudo, selecionar duas colunas lê só elas. O segundo mecanismo é a poda de dados: partição e cluster dizem ao BigQuery quais blocos nem precisam ser lidos."
], tabela: { cab: ["Modelo de preço", "Como cobra", "Quando escolher"], linhas: [
["Sob demanda (on-demand)", "Por TiB de dados lidos pela consulta", "Uso esporádico, imprevisível, equipe pequena; o nível gratuito cobre os primeiros TiB do mês"],
["Capacidade (BigQuery Editions: Standard, Enterprise, Enterprise Plus)", "Por slot-hora, com autoscaling e reservas", "Carga alta e previsível, necessidade de isolar cargas, recursos de governança das edições superiores"]
] }, dica: "Nas questões, custo previsível e muitas consultas pesadas apontam para capacidade (Editions). Poucas consultas e uso irregular apontam para sob demanda." },
{ t: "Datasets, projetos e localização", p: [
"Tabelas ficam em datasets, e datasets ficam em projetos. O dataset define a localização (região como us-east4 ou multirregião US e EU), a expiração padrão de tabelas e a chave de criptografia padrão. A localização é imutável e consultas não juntam dados de localizações diferentes. Em prova, residência de dados quase sempre se resolve criando o dataset na região exigida.",
"O projeto que roda a consulta é quem paga no modelo sob demanda; o projeto dono do dataset paga o armazenamento. Isso permite separar o custo de consulta dos analistas do custo de armazenamento dos dados."
] },
{ t: "Carregando dados: lote, streaming e Storage Write API", p: [
"Carga em lote (load job) a partir do Cloud Storage ou arquivo local é gratuita: você paga apenas o armazenamento. Formatos: CSV, JSON, Avro, Parquet e ORC. Avro, Parquet e ORC trazem o esquema embutido, comprimem bem, suportam campos aninhados e repetidos e carregam mais rápido que CSV e JSON. A carga é atômica por job: ou entra tudo ou nada.",
"Para dados em tempo real há duas opções. A API legada tabledata.insertAll faz streaming com deduplicação best effort por insertId. A Storage Write API é a recomendada: é mais barata e rápida, e oferece tipos de fluxo. O stream default dá semântica at-least-once com visibilidade imediata. O tipo committed com offsets da stream dá exactly-once. O tipo pending acumula e confirma em lote de forma atômica. Dataflow (conector do BigQuery), Pub/Sub com assinatura BigQuery e outros conectores podem usá-la por baixo."
], tabela: { cab: ["Método", "Custo", "Latência", "Garantia / uso"], linhas: [
["Load job (lote)", "Gratuito (só armazenamento)", "Minutos", "Atômico; ideal para cargas periódicas"],
["insertAll (legado)", "Cobrado por dados inseridos", "Segundos", "Deduplicação best effort; evitar em projetos novos"],
["Storage Write API (default)", "Cobrado, mais barato que o legado", "Segundos", "At-least-once"],
["Storage Write API (committed com offset)", "Idem", "Segundos", "Exactly-once"],
["Storage Write API (pending)", "Idem", "Após commit", "Lote atômico via API"]
] }, armadilha: "Usar streaming quando não há requisito de tempo real. Se a necessidade é carga diária, carga em lote é grátis e atômica." },
{ t: "Particionamento", p: [
"Partição divide a tabela em segmentos físicos por uma regra. O BigQuery só lê as partições que o filtro WHERE permite (partition pruning), então o custo e o tempo caem de forma previsível e o dry run já mostra a economia. Há três tipos: por coluna de tempo (DATE, TIMESTAMP ou DATETIME, com granularidade diária, mensal ou anual; a horária vale só para TIMESTAMP e DATETIME), por tempo de ingestão (pseudocoluna _PARTITIONTIME) e por intervalo de inteiros.",
"Uma tabela aceita até 10.000 partições. Partição horária em vários anos estoura esse teto; use diária ou mensal. Prefira partição por coluna do evento em vez de tempo de ingestão quando chegam dados atrasados, pois a ingestão colocaria o evento na partição errada. Evite o antigo padrão de várias tabelas por dia (tabela_YYYYMMDD): cada tabela carrega metadados e permissões próprias e a consulta fica mais lenta."
], lista: [
"require_partition_filter = TRUE obriga o filtro de partição e impede varreduras completas por engano.",
"partition_expiration_days apaga partições antigas sozinho; table expiration apaga a tabela inteira; o dataset pode ter expiração padrão.",
"Filtre diretamente pela coluna de partição com constantes ou expressões simples para que a poda funcione."
] },
{ t: "Clustering", p: [
"Cluster ordena fisicamente os dados dentro da tabela (ou dentro de cada partição) por até 4 colunas. O BigQuery guarda os intervalos de valores por bloco e pula blocos que não casam com filtros de igualdade ou faixa. A ordem das colunas importa: o filtro precisa começar pela primeira coluna para aproveitar melhor. O reclustering é automático e gratuito em segundo plano.",
"Cluster brilha em colunas de alta cardinalidade usadas em filtros e agrupamentos (customer_id, produto). Tem pouco efeito em tabelas pequenas. Diferença para a partição: a economia do cluster não é conhecida de antemão; o dry run dá um limite superior e o custo real pode ser menor."
], tabela: { cab: ["Critério", "Partição", "Cluster"], linhas: [
["Colunas", "Uma", "Até 4"],
["Cardinalidade ideal", "Baixa a média (dia, mês); máx. 10.000 partições", "Alta (ids, códigos)"],
["Estimativa de custo antes de rodar", "Exata", "Limite superior"],
["Obrigar filtro", "Sim (require_partition_filter)", "Não"],
["Combinar", "Sim: partição por data e cluster por id é o padrão clássico", "Sim"]
] } },
{ t: "Ciclo de vida, time travel e armazenamento barato", p: [
"Time travel permite consultar ou restaurar dados de até 7 dias atrás por padrão (janela configurável de 2 a 7 dias) com FOR SYSTEM_TIME AS OF. Depois dele há um fail-safe de 7 dias, só acessível pelo suporte do Google. Snapshots e clones de tabela guardam versões de forma barata. Tabelas apagadas por engano podem ser restauradas dentro da janela de time travel.",
"Dados em tabela ou partição que não sofrem modificação por 90 dias consecutivos passam automaticamente ao preço de armazenamento de longo prazo, cerca de metade do preço ativo, sem perda de desempenho. Não há migração a fazer. Exportar dado frio para o Cloud Storage só vale se a pessoa aceita perder o desempenho e a conveniência do BigQuery. Também é possível escolher faturar armazenamento por bytes lógicos ou físicos (compactados); confira na documentação qual compensa."
], dica: "Se o cenário diz que o dado deve continuar consultável com o mesmo desempenho e custo menor sem esforço, a resposta é deixar no BigQuery e aproveitar o preço de longo prazo, além de expirar o que não é necessário." },
{ t: "Cache e armadilhas de consulta", p: [
"Resultados de consulta ficam em cache por cerca de 24 horas (melhor esforço) e a reexecução idêntica é gratuita, desde que as tabelas não mudem, o texto da consulta seja idêntico e a consulta não use funções não determinísticas como CURRENT_TIMESTAMP(), nem tabela de destino explícita. Também não usam o cache consultas sobre tabelas com segurança por linha, consultas com curinga de tabelas e tabelas com inserções recentes por streaming. Isso explica por que um painel às vezes cobra e às vezes não."
], lista: [
"LIMIT não reduz bytes lidos na cobrança sob demanda.",
"A pré-visualização da tabela no console e bq head não custam nada.",
"Cópia de tabela e exportação para Cloud Storage são gratuitas (você paga o armazenamento destino).",
"maximum_bytes_billed protege contra consulta cara por engano."
], armadilha: "Particionar por uma coluna que quase nenhuma consulta filtra. A partição só ajuda quando o WHERE usa a coluna de partição." }
],
exemplo: { t: "Escolhendo partição e cluster para uma tabela de eventos", texto: "Uma empresa tem uma tabela de 30 TB de eventos de app, com event_timestamp, customer_id (milhões de valores) e event_type. Quase todas as consultas filtram os últimos 7 ou 30 dias e depois um customer_id. Decisão: partição diária por DATE(event_timestamp), porque o filtro por período é universal e a cardinalidade de dias é baixa; cluster por customer_id e event_type, porque o filtro por id tem alta cardinalidade. Depois ative require_partition_filter para que ninguém varra os 30 TB, e defina partition_expiration_days conforme a política de retenção. Resultado: uma consulta de 7 dias lê cerca de 7 das partições, e dentro delas só os blocos do cliente." },
prova: [
"Enunciado com filter on date column e high-cardinality id aponta para partição por data mais cluster pelo id.",
"Prevent accidental full table scans aponta para require_partition_filter; reduce cost não aponta para LIMIT.",
"Exactly-once streaming into BigQuery aponta para a Storage Write API (committed com offsets); at-least-once e baixa complexidade aponta para stream default ou Pub/Sub com assinatura BigQuery.",
"Daily batch e minimize cost aponta para load job gratuito, nunca streaming."
],
explique: "Explique sem consultar: por que o BigQuery lê só algumas colunas, como partição e cluster reduzem bytes, e por que uma carga em lote é preferível ao streaming quando não há requisito de tempo real."
},
cartoes: [
{ id: "d2c1", t: "3.2", f: "Qual a vantagem de armazenamento e computação separados no BigQuery?", v: "Escalam de forma independente: guarda-se petabytes sem servidores ligados e dá-se mais slots sem mover dados. Armazenamento colunar no Colossus, computação em slots." },
{ id: "d2c2", t: "3.2", f: "Load job (carga em lote) no BigQuery custa quanto?", v: "É gratuito; paga-se só o armazenamento. É atômico por job. Formatos: CSV, JSON, Avro, Parquet, ORC (os três últimos trazem o esquema)." },
{ id: "d2c3", t: "2.2", f: "Qual API é a recomendada para streaming no BigQuery e como obter exactly-once?", v: "Storage Write API. Exactly-once com o tipo committed usando offsets de stream. O stream default é at-least-once; insertAll legado tem deduplicação best effort." },
{ id: "d2c4", t: "3.2", f: "Quantas partições uma tabela BigQuery suporta e o que isso implica?", v: "Até 10.000 partições. Partição horária em vários anos estoura o limite: use granularidade diária ou mensal." },
{ id: "d2c5", t: "3.2", f: "Tipos de particionamento do BigQuery?", v: "Por coluna de tempo (DATE, TIMESTAMP, DATETIME), por tempo de ingestão (_PARTITIONTIME) e por intervalo de inteiros." },
{ id: "d2c6", t: "3.2", f: "Quantas colunas de cluster e por que a ordem importa?", v: "Até 4. Os dados são ordenados na ordem declarada; filtros que usam a primeira coluna aproveitam melhor a poda de blocos." },
{ id: "d2c7", t: "3.2", f: "Partição × cluster: qual dá estimativa exata de custo?", v: "Partição: o dry run mostra a economia exata. Cluster: o dry run mostra só um limite superior; o custo real pode ser menor." },
{ id: "d2c8", t: "3.2", f: "O que faz require_partition_filter?", v: "Obriga toda consulta a filtrar pela coluna de partição, evitando varredura completa por engano e custo alto." },
{ id: "d2c9", t: "3.1", f: "Quando o dado vira armazenamento de longo prazo no BigQuery?", v: "Tabela ou partição sem modificação por 90 dias consecutivos passa sozinha para o preço de longo prazo (cerca de metade), sem perda de desempenho." },
{ id: "d2c10", t: "3.2", f: "Qual a janela padrão de time travel e o que vem depois?", v: "7 dias por padrão (configurável de 2 a 7). Depois há fail-safe de mais 7 dias, acessível só pelo suporte do Google." },
{ id: "d2c11", t: "3.2", f: "Por que uma consulta idêntica foi cobrada de novo apesar do cache?", v: "O cache (cerca de 24 h) não vale se a tabela mudou ou se a consulta usa função não determinística (CURRENT_TIMESTAMP, RAND) ou tabela destino." },
{ id: "d2c12", t: "3.2", f: "Por que preferir partição a tabelas por dia (tabela_YYYYMMDD)?", v: "Tabelas fragmentadas duplicam metadados e permissões e deixam a consulta mais lenta. Uma tabela particionada é gerenciada como uma só." },
{ id: "d2c13", t: "3.2", f: "Por que particionar por coluna do evento em vez de tempo de ingestão?", v: "Com dados atrasados, a ingestão coloca o evento na partição da data de chegada. A coluna do evento mantém cada linha na partição certa." }
],
questoes: [
{ id: "d2q1", s: 3, t: "3.2", e: "A 30 TB BigQuery table holds app events with an event_date column and a customer_id column with millions of distinct values. Most queries filter on a date range and then on a single customer_id. How should you design the table to minimize query cost?", o: ["Partition by customer_id and cluster by event_date", "Partition by event_date and cluster by customer_id", "Create one table per day and union them in a view", "Cluster by event_date only and leave the table unpartitioned"], c: [1], x: "Correta: partição por data (baixa cardinalidade, filtro universal) mais cluster por customer_id (alta cardinalidade) é o padrão clássico. Particionar por customer_id estouraria o limite de 10.000 partições e seria ineficiente. Tabelas por dia tornam a gestão pior e a consulta mais lenta, e a partição substitui esse padrão. Cluster apenas por data perde a poda exata e previsível que a partição oferece, e não cobre o filtro por cliente." },
{ id: "d2q2", s: 2, t: "2.2", e: "A payments application writes records into BigQuery in near real time. Duplicate rows are not acceptable, and the team can handle retries and track stream offsets in code. Which approach should you use?", o: ["The legacy tabledata.insertAll method with insertId", "The BigQuery Storage Write API in committed type using stream offsets", "A load job from Cloud Storage every minute", "The Storage Write API default stream, which is exactly-once"], c: [1], x: "Correta: o tipo committed da Storage Write API, com offsets, dá semântica exactly-once com visibilidade imediata. insertAll com insertId faz deduplicação apenas best effort, sem garantia. Load jobs a cada minuto são lote, mais lentos e esbarram em cotas de jobs, e não atendem tempo quase real. O stream default tem semântica at-least-once (pode duplicar em retentativas), então a afirmação de exactly-once está errada." },
{ id: "d2q3", s: 3, t: "3.2", e: "A retailer receives a 2 TB CSV export from its ERP once per day and analysts only need it the next morning. The solution must be the MOST cost-effective. What should you do?", o: ["Stream rows with the Storage Write API as they are read", "Run a Dataflow streaming job that writes to BigQuery", "Upload the files to Cloud Storage and run a BigQuery load job", "Create a Bigtable table and federate queries from BigQuery"], c: [2], x: "Correta: não há requisito de tempo real, então o load job a partir do Cloud Storage é gratuito (só se paga armazenamento) e atômico. Streaming com a Storage Write API é cobrado e desnecessário. Um job de streaming no Dataflow adiciona custo de workers e complexidade sem benefício. Bigtable não é destino analítico e consultas federadas para ele seriam mais caras e lentas para carga diária de CSV." },
{ id: "d2q4", s: 3, t: "3.2", e: "Analysts frequently forget to filter by date and run queries that scan the entire 50 TB partitioned events table, causing large bills. You want to prevent this without changing the queries already used in scheduled jobs that include date filters. What should you do?", o: ["Set the require_partition_filter option on the table", "Add LIMIT 1000 to all queries", "Move older partitions to Cloud Storage Archive", "Grant analysts only the BigQuery Job User role"], c: [0], x: "Correta: require_partition_filter faz o BigQuery rejeitar consultas sem filtro na coluna de partição, e as consultas agendadas que já filtram por data continuam funcionando. LIMIT não reduz os bytes lidos, então não evita o custo. Mover partições antigas para o Archive tira os dados do BigQuery e não impede varreduras das partições recentes. Job User só permite criar jobs; o acesso à leitura viria de outro papel e não limita o volume lido." },
{ id: "d2q5", s: 3, t: "3.2", e: "You must reduce the cost of queries on a 40 TB BigQuery table that stores 3 years of logs. Most queries analyze the last week and need only 5 of the 60 columns. Choose two.", o: ["Partition the table by the log date and filter on it in queries", "Add LIMIT clauses to every query", "Select only the required columns instead of SELECT *", "Create one sharded table per day", "Enable query result caching, which removes the need to filter"], c: [0, 2], x: "Corretas: a partição por data permite ler só a última semana, e selecionar apenas 5 colunas aproveita o armazenamento colunar e corta os bytes lidos. LIMIT não reduz o custo sob demanda. Tabelas fragmentadas por dia são o padrão antigo, mais difícil de gerir e mais lento que partição. O cache só ajuda quando a mesma consulta se repete com tabelas inalteradas e não elimina a necessidade de filtrar." },
{ id: "d2q6", s: 3, t: "3.2", e: "An engineer accidentally deleted a production BigQuery table two days ago. The dataset uses default settings. What is the simplest way to recover the data?", o: ["Open a Google Cloud support case, since deleted tables cannot be recovered by users", "Restore the table from the time travel window by copying its state from before the deletion", "Re-run the original load jobs, because deleted tables are permanently lost", "Restore from the fail-safe period using the bq cp command"], c: [1], x: "Correta: com a janela padrão de 7 dias, o time travel permite restaurar a tabela apagada copiando o estado anterior à exclusão (por exemplo, bq cp com decorador de tempo). Abrir chamado é desnecessário dentro dessa janela; o suporte só entra no fail-safe. Dizer que a tabela se perde para sempre está errado e refazer cargas dá trabalho evitável. O fail-safe só vale depois de encerrado o time travel e não é acessível por bq cp pelo usuário." },
{ id: "d2q7", s: 3, t: "3.2", e: "A telemetry table receives data from 8,000 devices. The team plans to partition by hour and keep 5 years of data. The table creation fails when partitioning is configured at the hour level. What is the best fix?", o: ["Partition by hour and request a quota increase to remove the partition limit", "Use ingestion-time partitioning at the hour level instead", "Partition at the daily level and cluster by device id", "Split the table into 5 tables, one per year, all partitioned by hour"], c: [2], x: "Correta: uma tabela suporta até 10.000 partições; 5 anos em partições horárias são cerca de 43.800, acima do limite. Partição diária (cerca de 1.826) cabe e o cluster por device_id recupera a seletividade. Pedir aumento do limite de partições não é o caminho de projeto, e o limite continua valendo para ingestão por hora. Particionar por tempo de ingestão em nível horário tem o mesmo teto. Dividir por ano multiplica tabelas e complica consultas que atravessam anos." },
{ id: "d2q8", s: 3, t: "3.1", e: "A company keeps 200 TB of historical sales in BigQuery. Partitions older than 12 months are almost never modified or queried, but they must remain queryable with the same performance and interface. The team wants to lower storage costs with NO operational work. What should you do?", o: ["Export old partitions to Cloud Storage Coldline and create external tables", "Do nothing: unmodified tables and partitions automatically move to long-term storage pricing", "Copy old partitions to a new dataset every month to reset their pricing tier", "Enable Autoclass on the BigQuery dataset"], c: [1], x: "Correta: partições sem alteração por 90 dias consecutivos passam sozinhas ao preço de longo prazo, cerca de metade do valor, sem mudar desempenho nem interface. Exportar para Coldline e usar tabelas externas muda o desempenho, a interface de consulta e adiciona trabalho. Copiar partições reinicia o contador e faz o oposto do desejado. Autoclass é recurso de buckets do Cloud Storage e não existe para datasets do BigQuery." },
{ id: "d2q9", s: 3, t: "3.2", e: "A team must load 5 TB of data exported from an on-premises system into BigQuery. The records contain nested and repeated fields, and the team wants the fastest load that preserves the schema without writing a schema file. Which format should they export?", o: ["CSV with a header row", "Avro", "Newline-delimited JSON compressed with gzip", "Plain text with fixed-width columns"], c: [1], x: "Correta: Avro é autodescritivo (o esquema vai no arquivo), suporta campos aninhados e repetidos e carrega rápido porque é binário e pode ser lido em paralelo. CSV não representa estruturas aninhadas e exige esquema ou autodetecção. JSON delimitado por linha suporta aninhamento, mas é mais lento, textual e comprimido com gzip não pode ser dividido para leitura paralela. Texto de largura fixa nem é formato de carga suportado diretamente." },
{ id: "d2q10", s: 3, t: "3.2", e: "A dashboard runs the same BigQuery query every few minutes against a table that is updated once a day. Billing shows that the query is charged on most runs, although the data did not change. Which is the most likely cause?", o: ["The query uses CURRENT_TIMESTAMP(), so results are not served from the cache", "Query cache only works for queries under 1 GB", "Cached results are always disabled for on-demand projects", "Partitioned tables never use the cache"], c: [0], x: "Correta: funções não determinísticas como CURRENT_TIMESTAMP() ou RAND() impedem o uso do cache de resultados, então cada execução é cobrada. O cache não depende do tamanho da consulta nem do modelo de preço sob demanda. Tabelas particionadas usam cache normalmente. O cache também é invalidado quando a tabela muda, mas aqui os dados mudam só uma vez ao dia." }
],
lab: { t: "Tabela particionada e clusterizada: bytes com e sem filtro", custo: "US$ 0 no nível gratuito (tabela pública de dezenas de MB; consultas bem abaixo de 1 TiB).",
porque: "Mostra a poda de partição no dry run, o efeito de require_partition_filter e a diferença entre tabela comum e particionada.",
passos: [
{ t: "Criar o dataset nos EUA com expiração", cmd: "bq mk --dataset --location=US --default_table_expiration=86400 estudo", p: "O dataset precisa estar na mesma localização do dataset público (US). A expiração de 1 dia evita custo esquecido (valor em segundos)." },
{ t: "Criar a tabela comum e a particionada/clusterizada", cmd: "bq query --use_legacy_sql=false 'CREATE TABLE estudo.trips_plain AS SELECT * FROM `bigquery-public-data.austin_bikeshare.bikeshare_trips`'\nbq query --use_legacy_sql=false 'CREATE TABLE estudo.trips_part PARTITION BY DATE(start_time) CLUSTER BY subscriber_type, start_station_id OPTIONS(require_partition_filter=TRUE) AS SELECT * FROM `bigquery-public-data.austin_bikeshare.bikeshare_trips`'", p: "A segunda tabela é particionada por dia da coluna start_time, clusterizada por duas colunas e exige filtro de partição." },
{ t: "Dry run na tabela comum", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT COUNT(*) FROM estudo.trips_plain WHERE start_time >= TIMESTAMP(\"2018-01-01\") AND start_time < TIMESTAMP(\"2018-02-01\")'", p: "Sem partição, o filtro de data não reduz os bytes: anote o número." },
{ t: "Dry run na tabela particionada, com e sem filtro", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT COUNT(*) FROM estudo.trips_part WHERE start_time >= TIMESTAMP(\"2018-01-01\") AND start_time < TIMESTAMP(\"2018-02-01\")'\nbq query --use_legacy_sql=false --dry_run 'SELECT COUNT(*) FROM estudo.trips_part'", p: "Com filtro, os bytes caem (poda de partição). Sem filtro, a consulta é rejeitada por require_partition_filter." },
{ t: "Ver a estrutura da tabela", cmd: "bq show --format=prettyjson estudo.trips_part | head -60", p: "Procure timePartitioning, clustering e requirePartitionFilter no JSON." }
],
limpar: ["bq rm -r -f -d estudo"],
verificar: "O dry run da tabela particionada com filtro mostra bem menos bytes que o da tabela comum, e a consulta sem filtro falha com mensagem exigindo filtro na coluna de partição." }
};
C.dias[3] = {
aula: {
titulo: "BigQuery II: modelagem e desempenho",
resumo: "Como modelar no BigQuery (estrela, tabela larga, STRUCT e ARRAY, SCD), como diagnosticar consulta lenta pelo plano de execução e quando usar materialized views, BI Engine, search index e aproximações.",
blocos: [
{ t: "Ideia central: o BigQuery perdoa a desnormalização", p: [
"Em bancos transacionais você normaliza para evitar duplicação e anomalias de atualização. No BigQuery o armazenamento é barato e colunar, e o que custa caro é o JOIN de tabelas enormes (embaralhamento de dados entre slots, o shuffle). Por isso a modelagem analítica costuma desnormalizar: guarda-se junto o que é lido junto. Como só as colunas citadas são lidas, repetir um atributo não aumenta o custo das consultas que não o usam.",
"A melhor ferramenta de desnormalização do BigQuery é o campo aninhado e repetido: STRUCT (registro) e ARRAY (lista). Um pedido com seus itens vira uma linha com um ARRAY de STRUCTs. O dado do pedido e dos itens fica fisicamente junto e a consulta evita o JOIN. Para ler os itens, usa-se UNNEST."
] },
{ t: "Estrela, tabela larga e campos aninhados", p: [
"Esquema estrela: uma tabela fato (eventos, medidas) cercada por dimensões (cliente, produto, data). Funciona bem no BigQuery, que otimiza joins de estrela, e é o formato que ferramentas de BI esperam. Tabela larga (one big table): a dimensão é copiada para dentro do fato; consultas ficam simples e rápidas. Aninhado e repetido: preserva a relação pai e filho sem repetir o pai.",
"Quando normalizar: dimensões muito grandes ou que mudam com frequência, porque atualizar uma dimensão desnormalizada exigiria reescrever bilhões de linhas do fato; dados compartilhados por vários fatos; e quando o modelo precisa de governança central por entidade."
], tabela: { cab: ["Modelo", "Vantagem", "Quando usar", "Cuidado"], linhas: [
["Estrela", "Dimensões reutilizáveis, atualizações simples", "BI com muitas dimensões que mudam", "JOINs entre fato grande e dimensão grande"],
["Tabela larga", "Consulta simples, sem joins", "Análise de um assunto, dimensões estáveis", "Atualizar a dimensão exige reescrever o fato"],
["Aninhado e repetido (STRUCT, ARRAY)", "Sem join entre pai e filho, menos bytes", "Pedido e itens, sessão e eventos", "Atualizar elemento do array é caro; UNNEST de dois arrays gera produto cartesiano"],
["Snowflake (normalizado)", "Pouca duplicação", "Raramente recomendado no BigQuery", "Muitos joins, mais shuffle"]
] }, dica: "Se a pergunta diz fewer joins e a relação é pai e filho, a resposta é aninhar com ARRAY de STRUCT. Se a dimensão muda toda hora, mantenha separada." },
{ t: "Dimensões que mudam (SCD)", p: [
"Slowly Changing Dimensions tratam o histórico. Tipo 1 sobrescreve o valor (perde histórico). Tipo 2 cria uma nova linha por mudança, com colunas valid_from, valid_to e is_current, permitindo analisar o fato com o atributo vigente na época. Tipo 3 guarda o valor anterior em uma coluna extra. No BigQuery implementa-se o tipo 2 com MERGE (ou Dataform) ao receber o delta da origem.",
"Chaves primárias e estrangeiras podem ser declaradas, mas não são impostas (NOT ENFORCED). Mesmo assim, o otimizador as usa para eliminar joins desnecessários; a responsabilidade pela integridade é do pipeline."
] },
{ t: "Diagnosticando uma consulta lenta", p: [
"Abra o plano de execução (execution graph, no console). Ele divide a consulta em estágios, mostra tempo médio e máximo de slot por estágio, bytes lidos e embaralhados. Sinais clássicos: um estágio com tempo máximo muito maior que o médio indica skew (uma chave domina, por exemplo NULL ou um cliente gigante); muito shuffle indica join ou agregação pesados antes do filtro; estágio de leitura enorme indica falta de partição ou cluster; spill para disco indica pouca memória por slot para aquela etapa.",
"As correções seguem o sintoma. Skew: filtrar chaves nulas ou dominantes antes do join, pré-agregar. Muito shuffle: filtrar cedo, agregar antes de juntar, juntar na menor granularidade. Leitura grande: partição, cluster, selecionar menos colunas. Computação pesada em UDF JavaScript: reescrever em SQL. Também ajudam: evitar self-join (use funções de janela), colocar ORDER BY só no final e com LIMIT, e reduzir o volume antes de operações caras. Para totais onde pequena imprecisão é aceitável, use APPROX_COUNT_DISTINCT e outras funções APPROX_*, bem mais baratas que COUNT(DISTINCT) exato."
], lista: [
"INFORMATION_SCHEMA.JOBS mostra bytes e tempo de slot de consultas passadas, útil para achar as mais caras.",
"Ordem dos joins: o otimizador costuma reordenar; ainda assim, reduzir os dois lados antes do join ajuda.",
"Mais slots não corrigem skew: o estágio lento continua preso a uma chave."
], armadilha: "Resolver consulta lenta só comprando mais slots. Se o gargalo é skew ou shuffle mal planejado, mais capacidade pouco muda." },
{ t: "Acelerar sem reescrever: materialized views, BI Engine, search index, cache", p: [
"Materialized view (MV) guarda o resultado pré-computado de uma consulta (agregações, alguns joins) e é atualizada de forma incremental e automática, em geral dentro de 5 a 30 minutos após uma mudança na tabela base; por padrão o refresh ocorre no máximo a cada 30 minutos (limite configurável por refresh_interval_minutes, de 1 minuto a 7 dias; também é possível dar refresh manual, e a opção max_staleness equilibra custo e frescor, confira na documentação). O otimizador reescreve consultas à tabela base para usar a MV, de forma transparente, quando é vantajoso. Tem custo de armazenamento e de refresh, e suporta apenas um subconjunto do SQL (por exemplo, sem funções não determinísticas e com limites para joins). Diferente de view lógica, que é só uma consulta salva e não economiza nada.",
"BI Engine é um serviço de análise em memória; você reserva capacidade (GiB) e consultas de dashboards (Looker Studio, Looker, conectores de BI) ganham respostas em subsegundo, com muitos usuários simultâneos. É a resposta para latência de painel; MV é a resposta para evitar recomputar a mesma agregação.",
"Search index (CREATE SEARCH INDEX com SEARCH()) acelera buscas de texto e valores pontuais em colunas de texto, típico de logs. Para similaridade vetorial existe o vector index. O cache de resultados atende repetições idênticas por cerca de 24 horas."
], tabela: { cab: ["Necessidade", "Recurso"], linhas: [
["Mesma agregação repetida sobre tabela grande, sem manutenção de ETL", "Materialized view"],
["Dashboard com resposta em subsegundo e muitos usuários", "BI Engine"],
["Achar um id ou palavra em bilhões de linhas de log", "Search index e SEARCH()"],
["Menos bytes por consulta de período", "Partição e cluster"],
["Contagem distinta aproximada em escala", "APPROX_COUNT_DISTINCT"],
["Esconder dado sensível de parte dos usuários", "Policy tags e mascaramento dinâmico (dia 6); DLP para desidentificar"]
] } },
{ t: "Preparar para visualização e proteger dados sensíveis", p: [
"Para BI, entregue tabelas ou views já modeladas na granularidade do painel, evite que a ferramenta consulte dados brutos e combine MV com BI Engine quando houver pico de usuários. Dados sensíveis são tratados antes da camada de BI: mascaramento dinâmico por policy tag (cada papel vê o valor real ou mascarado), e Sensitive Data Protection (antigo Cloud DLP) para detectar e desidentificar PII em escala. O detalhe de segurança está no dia 6."
] }
],
exemplo: { t: "Consulta de vendas que demora 3 minutos", texto: "Uma consulta junta um fato de 8 bilhões de linhas com a dimensão de clientes (200 milhões) e calcula COUNT(DISTINCT customer_id) por mês. O plano mostra um estágio de join com tempo máximo 40 vezes o médio e muito shuffle. Diagnóstico: skew, porque 30% das linhas do fato têm customer_id NULL, que caem todas no mesmo slot. Correções em ordem: filtrar customer_id IS NOT NULL antes do join; pré-agregar o fato por cliente e mês antes de juntar; trocar COUNT(DISTINCT) por APPROX_COUNT_DISTINCT, já que o painel aceita erro pequeno. Como o painel repete a mesma agregação mensal, criar uma materialized view e, para o pico de usuários, uma reserva de BI Engine. Medir tempo e bytes antes e depois." },
prova: [
"Reduce joins e parent-child records apontam para STRUCT e ARRAY (nested and repeated).",
"Queries on the same aggregation repeatedly e minimal maintenance apontam para materialized view; sub-second dashboard apontam para BI Engine.",
"Stage with much higher max than average aponta para data skew; a resposta correta mexe nos dados, não só em slots.",
"Exact result not required e very large cardinality apontam para APPROX_COUNT_DISTINCT.",
"Mask PII for some users aponta para policy tags com data masking, não para copiar a tabela."
],
explique: "Explique sem consultar: por que no BigQuery se desnormaliza, quando ainda se mantém uma dimensão separada, e como você descobriria e resolveria skew numa consulta lenta."
},
cartoes: [
{ id: "d3c1", t: "3.2", f: "Por que se desnormaliza no BigQuery?", v: "Armazenamento colunar é barato e só colunas citadas são lidas; o caro é o JOIN entre tabelas grandes (shuffle). Guardar junto o que é lido junto reduz joins." },
{ id: "d3c2", t: "3.2", f: "Qual recurso modela pai e filho sem JOIN?", v: "Campos aninhados e repetidos: ARRAY de STRUCT (ex.: pedido com itens). Lê-se com UNNEST." },
{ id: "d3c3", t: "3.2", f: "Quando manter uma dimensão separada em vez de desnormalizar?", v: "Quando ela é grande ou muda com frequência: atualizar uma cópia dentro do fato exigiria reescrever bilhões de linhas." },
{ id: "d3c4", t: "3.2", f: "SCD tipo 2: como funciona?", v: "Cada mudança gera nova linha com valid_from, valid_to e is_current, preservando o histórico. Implementa-se com MERGE no BigQuery." },
{ id: "d3c5", t: "3.2", f: "Chaves primária e estrangeira no BigQuery são impostas?", v: "Não, são NOT ENFORCED. O otimizador as usa para eliminar joins, mas a integridade é responsabilidade do pipeline." },
{ id: "d3c6", t: "3.2", f: "Que sinal no plano de execução indica data skew?", v: "Um estágio com tempo máximo de slot muito maior que o médio. Causa típica: chave NULL ou dominante. Solução: filtrar ou pré-agregar antes do join." },
{ id: "d3c7", t: "4.1", f: "Materialized view × view lógica: qual a diferença?", v: "MV guarda o resultado pré-computado, com refresh incremental automático, e o otimizador a usa de forma transparente. A view lógica é só consulta salva e não economiza." },
{ id: "d3c8", t: "4.1", f: "Qual o intervalo padrão de refresh de uma materialized view?", v: "Refresh automático em melhor esforço, em geral 5 a 30 minutos após a mudança; por padrão no máximo a cada 30 minutos (refresh_interval_minutes, de 1 minuto a 7 dias, configurável). Também há refresh manual." },
{ id: "d3c9", t: "4.1", f: "O que é BI Engine e quando usar?", v: "Serviço de análise em memória, com capacidade reservada em GiB, para respostas em subsegundo e muitos usuários em dashboards (Looker Studio e outras ferramentas de BI)." },
{ id: "d3c10", t: "4.1", f: "Como acelerar busca de um id ou palavra em bilhões de linhas de log?", v: "Search index (CREATE SEARCH INDEX) com a função SEARCH(). Partição e cluster ajudam em faixas e igualdades, não em busca de texto." },
{ id: "d3c11", t: "3.2", f: "Quando usar APPROX_COUNT_DISTINCT?", v: "Quando erro pequeno é aceitável e a cardinalidade é grande. É bem mais barata e rápida que COUNT(DISTINCT) exato." },
{ id: "d3c12", t: "4.1", f: "Como mostrar e-mail mascarado a analistas e real a outro grupo?", v: "Policy tag na coluna com regra de mascaramento dinâmico: quem tem Masked Reader vê mascarado, quem tem Fine-Grained Reader vê o valor real." },
{ id: "d3c13", t: "3.2", f: "Mais slots resolvem uma consulta lenta por skew?", v: "Em geral não: o estágio lento fica preso a uma chave. Corrija nos dados (filtrar nulos, pré-agregar, reduzir shuffle)." }
],
questoes: [
{ id: "d3q1", s: 3, t: "3.2", e: "An e-commerce company stores orders and order line items in two normalized BigQuery tables. Analysts frequently query both together and the join is slow and expensive. Orders are rarely updated after creation. What should you do to reduce cost and latency?", o: ["Create a view that joins the two tables and query the view", "Load both tables into Cloud SQL and join there", "Add a clustering key to the line items table only", "Recreate the orders table with line items stored as an ARRAY of STRUCT"], c: [3], x: "Correta: aninhar os itens como ARRAY de STRUCT dentro de cada pedido guarda pai e filho fisicamente juntos e elimina o JOIN, ideal quando os pedidos quase não mudam. Uma view lógica apenas esconde o join: ele continua sendo executado a cada consulta. Cloud SQL é transacional e escala mal para análise. Cluster só na tabela de itens melhora a leitura de uma tabela, mas não elimina o shuffle do join." },
{ id: "d3q2", t: "3.2", s: 3, e: "A retailer needs to analyze historical sales by the customer tier that applied at the time of each sale. Customer tiers change several times per year. How should you model the customer dimension in BigQuery?", o: ["Overwrite the tier column when it changes (type 1)", "Use a type 2 slowly changing dimension with valid_from, valid_to, and is_current columns", "Store only the current tier in the fact table", "Create a separate table for each tier"], c: [1], x: "Correta: SCD tipo 2 cria uma linha por mudança com período de validade, permitindo juntar o fato à versão do cliente vigente na data da venda. Tipo 1 sobrescreve e perde o histórico exigido. Guardar só o nível atual no fato também reescreve o passado e mostra o nível errado para vendas antigas. Uma tabela por nível não modela a mudança ao longo do tempo e complica as consultas." },
{ id: "d3q3", s: 4, t: "4.1", e: "Many users run the same aggregation on a 20 TB append-only BigQuery table throughout the day. You want faster and cheaper queries, with results kept fresh automatically and with the LEAST operational effort. What should you do?", o: ["Create a materialized view with the aggregation", "Write a scheduled query that rebuilds a summary table every hour and point users to it", "Create a standard logical view with the aggregation", "Export the aggregation to Cloud Storage nightly"], c: [0], x: "Correta: a materialized view é atualizada de forma incremental e automática e o otimizador a usa de modo transparente, sem pipeline para manter. Uma consulta agendada que reconstrói a tabela funciona, mas exige gerenciar agendamento e as consultas dos usuários precisam apontar para a nova tabela. Uma view lógica não guarda resultado, então o custo continua o mesmo. Exportar para o Cloud Storage tira os dados do BigQuery e piora o acesso." },
{ id: "d3q4", s: 4, t: "4.1", e: "A Looker Studio dashboard queries BigQuery and hundreds of executives open it at the same time each morning. Users complain that charts take several seconds to load. Which solution gives sub-second responses with the least change to the dashboard?", o: ["Create a BI Engine reservation for the project and location", "Increase the on-demand slot quota", "Export the data to Cloud SQL and connect the dashboard to it", "Switch the table to Bigtable"], c: [0], x: "Correta: BI Engine mantém dados em memória e acelera consultas de painéis com alta concorrência, sem alterar o dashboard. Aumentar cota sob demanda não é recurso que reduza latência de leitura repetida. Cloud SQL não foi feito para agregações sobre grandes volumes e exigiria nova carga. Bigtable não suporta SQL analítico de painel e a conexão com Looker Studio exigiria reengenharia." },
{ id: "d3q5", s: 3, t: "3.2", e: "A BigQuery query that joins a large fact table to a customer table is slow. The execution graph shows one join stage whose maximum slot time is far larger than the average, and about 25 percent of fact rows have a NULL customer_id. Choose two.", o: ["Buy additional slots through a larger reservation", "Filter out NULL customer_id values before the join, handling them separately if needed", "Add LIMIT to the final query", "Pre-aggregate the fact table by customer_id before joining", "Convert the customer table to JSON files in Cloud Storage"], c: [1, 3], x: "Corretas: o padrão de um estágio muito mais lento que a média indica skew; as chaves NULL caem no mesmo slot. Filtrar os NULL antes do join e pré-agregar o fato reduz o volume e a concentração. Mais slots não resolvem skew, pois o estágio continua preso a uma chave. LIMIT no resultado final não muda o trabalho do join. Converter a dimensão para JSON no Cloud Storage deixa a leitura mais lenta e não ataca o problema." },
{ id: "d3q6", s: 3, t: "3.2", e: "A marketing dashboard shows the number of distinct visitors per day across 15 billion events. A 1 percent error is acceptable, and the exact COUNT(DISTINCT) query is slow and costly. What should you use?", o: ["APPROX_COUNT_DISTINCT", "COUNT(*) with GROUP BY visitor_id", "A window function with ROW_NUMBER", "A JavaScript user-defined function"], c: [0], x: "Correta: APPROX_COUNT_DISTINCT usa um sketch (HyperLogLog++) com pequeno erro e muito menos memória e tempo, adequado quando precisão exata não é exigida. COUNT(*) com GROUP BY visitor_id retorna linhas por visitante, não a contagem distinta, e é pesado. ROW_NUMBER numera linhas e não resolve a contagem distinta de forma eficiente. UDF em JavaScript é mais lenta que as funções nativas e pioraria o desempenho." },
{ id: "d3q7", s: 4, t: "4.1", e: "A security team searches a 6 TB BigQuery table of application logs for specific request IDs and error strings several times a day. Partitioning by date does not help because the IDs span all dates. What should you use to speed up these lookups?", o: ["Cluster the table by the log message column", "Create a search index on the text columns and use the SEARCH function", "Create a materialized view with the request IDs", "Increase the table expiration"], c: [1], x: "Correta: o search index foi feito para buscas pontuais de texto e valores (função SEARCH) em colunas de log, evitando varrer a tabela. Cluster por uma coluna de mensagem livre tem pouca eficácia, pois a cardinalidade e o formato não favorecem poda de blocos. Uma materialized view de IDs não cobre buscas arbitrárias e não é para esse padrão. Expiração apenas apaga dados antigos e não acelera nada." },
{ id: "d3q8", s: 3, t: "3.2", e: "A fact table with 20 billion rows references a customer dimension of 500 million rows. Customer attributes are updated every hour. A developer proposes copying all customer attributes into the fact table to avoid joins. What is the best design?", o: ["Copy the attributes into the fact table and rewrite it every hour", "Keep a star schema with the customer dimension as a separate table and join at query time", "Store the customer attributes in a Cloud SQL table and use federated queries", "Remove customer attributes from the analysis"], c: [1], x: "Correta: dimensões grandes que mudam com frequência devem ficar separadas; atualizar uma cópia no fato exigiria reescrever 20 bilhões de linhas a cada hora, algo caro e lento. Reescrever o fato por hora é justamente o custo a evitar. Consultas federadas ao Cloud SQL são mais lentas e dependem de um banco transacional para cada consulta analítica. Remover os atributos descumpre o requisito de análise." },
{ id: "d3q9", s: 4, t: "4.1", e: "Analysts need to query a customers table in BigQuery but must only see a masked version of the email column, while the data science group must see the real email. You want to avoid duplicating the table. What should you do?", o: ["Create two copies of the table, one with masked emails", "Attach a policy tag with a data masking rule to the email column and grant the masked reader role to analysts and the fine-grained reader role to data scientists", "Remove the email column and ask analysts to request it by ticket", "Encrypt the whole table with a customer-managed key"], c: [1], x: "Correta: policy tags com regra de mascaramento dinâmico mostram valor mascarado a quem tem o papel Masked Reader e o valor real a quem tem Fine-Grained Reader, sem copiar a tabela. Duas cópias duplicam armazenamento, geram divergência e trabalho de sincronia. Remover a coluna impede o grupo de dados de usar o valor real. CMEK protege a chave de criptografia em repouso, mas qualquer usuário autorizado a ler continua vendo o valor claro." },
{ id: "d3q10", s: 3, t: "3.2", e: "A query uses SELECT * with several UNNEST operations on two different ARRAY columns of the same row, and it returns far more rows than expected, making it slow. What is the most likely cause?", o: ["Unnesting two independent arrays with CROSS JOIN creates a Cartesian product of their elements", "ARRAY columns cannot be queried in BigQuery", "The table must be partitioned by the array column", "BigQuery automatically duplicates every row for each cluster column"], c: [0], x: "Correta: ao fazer UNNEST de dois arrays independentes na mesma linha, cada elemento de um se combina com cada elemento do outro (produto cartesiano), multiplicando as linhas. Afirmar que arrays não podem ser consultados está errado, UNNEST existe para isso. Partição não pode ser feita por coluna ARRAY e não é a causa. O BigQuery não duplica linhas por colunas de cluster, que são apenas ordenação física." }
],
lab: { t: "Reescrever uma consulta lenta e criar uma materialized view", custo: "US$ 0 no nível gratuito (tabelas públicas de poucos MB; atenção ao tamanho antes de rodar).",
porque: "Treina o ciclo diagnosticar, reescrever e medir, e mostra a materialized view sendo usada pelo otimizador.",
passos: [
{ t: "Criar o dataset e uma cópia da tabela base", cmd: "bq mk --dataset --location=US --default_table_expiration=86400 estudo3\nbq query --use_legacy_sql=false 'CREATE TABLE estudo3.trips AS SELECT * FROM `bigquery-public-data.austin_bikeshare.bikeshare_trips`'", p: "A MV precisa de uma tabela base sua. A expiração evita custo esquecido." },
{ t: "Consulta ineficiente com dry run", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT * FROM estudo3.trips ORDER BY duration_minutes DESC'", p: "SELECT * com ORDER BY global lê todas as colunas e ordena tudo. Anote os bytes." },
{ t: "Versão reescrita", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT trip_id, duration_minutes FROM estudo3.trips ORDER BY duration_minutes DESC LIMIT 100'\nbq query --use_legacy_sql=false 'SELECT subscriber_type, APPROX_COUNT_DISTINCT(trip_id) AS viagens_distintas FROM estudo3.trips GROUP BY subscriber_type'", p: "Poucas colunas, ORDER BY com LIMIT e contagem aproximada (se alguma coluna não existir, veja o esquema com bq show). Compare os bytes e o tempo com o passo anterior." },
{ t: "Criar a materialized view", cmd: "bq query --use_legacy_sql=false 'CREATE MATERIALIZED VIEW estudo3.mv_viagens AS SELECT subscriber_type, COUNT(*) AS viagens, SUM(duration_minutes) AS minutos FROM estudo3.trips GROUP BY subscriber_type'", p: "A MV guarda a agregação e atualiza sozinha quando a base muda." },
{ t: "Comparar com e sem a MV", cmd: "bq query --use_legacy_sql=false --dry_run 'SELECT subscriber_type, COUNT(*) FROM estudo3.trips GROUP BY subscriber_type'\nbq query --use_legacy_sql=false --dry_run 'SELECT * FROM estudo3.mv_viagens'", p: "Consultar a MV lê menos bytes. A consulta à tabela base também pode ser reescrita pelo otimizador para usar a MV; veja os detalhes do job." }
],
limpar: ["bq rm -f -t estudo3.mv_viagens", "bq rm -r -f -d estudo3"],
verificar: "Os dry runs da versão reescrita e da MV mostram bem menos bytes que a consulta com SELECT *, e bq ls estudo3 lista a MV antes da limpeza." }
};
C.dias[4] = {
aula: {
titulo: "Escolha de armazenamento",
resumo: "Árvore de decisão para escolher entre Bigtable, Spanner, Cloud SQL, AlloyDB, Firestore, Memorystore, BigQuery, Cloud Storage e BigLake, com desenho de row key do Bigtable, classes do Cloud Storage e custo de ciclo de vida.",
blocos: [
{ t: "Ideia central: o padrão de acesso escolhe o serviço", p: [
"Nenhum serviço de armazenamento é o melhor em tudo. Você escolhe pelo padrão de acesso: leituras e escritas pontuais de baixa latência (operacional) ou varreduras e agregações sobre muitos dados (analítico); modelo de dados (relacional, documento, chave-valor, objeto); escala; consistência; alcance geográfico. Esta decisão é cobrada em muitas questões e quase sempre há um requisito que elimina as vizinhas.",
"Faça as perguntas nesta ordem: é analítico ou transacional? Precisa de SQL e transações? Qual a escala e a latência? Precisa ser global com consistência forte? Dados são arquivos ou objetos? Isso leva à tabela de decisão abaixo."
] },
{ t: "Árvore de decisão em tabela", tabela: { cab: ["Requisito dominante", "Escolha", "Por que", "Não use quando"], linhas: [
["Análise SQL em escala de TB a PB, ad hoc, BI", "BigQuery", "Warehouse serverless, colunar, cobra por uso", "Precisa de escritas pontuais frequentes de baixa latência"],
["Arquivos brutos, imagens, backups, data lake barato", "Cloud Storage", "Objetos duráveis, classes de custo, ciclo de vida", "Precisa de consulta SQL rápida direta ou transações"],
["Lake em formato aberto (Parquet, Iceberg) com SQL e segurança por linha e coluna", "BigLake", "Tabelas sobre Cloud Storage consultáveis pelo BigQuery e Spark com governança", "Dados pequenos e simples que cabem em tabelas nativas"],
["Chave-valor e séries temporais em escala massiva, milissegundos, milhões de operações por segundo", "Bigtable", "Wide-column NoSQL, escala por nós, baixa latência", "Precisa de SQL com joins, transações multilinha ou consultas ad hoc"],
["Relacional global, transações ACID, consistência forte, escala horizontal de escrita", "Spanner", "SQL relacional distribuído com consistência externa", "Carga pequena e regional; custo e complexidade desnecessários"],
["Relacional regional MySQL, PostgreSQL ou SQL Server, lift and shift, até 64 TB", "Cloud SQL", "Banco gerenciado simples, compatível", "Escala horizontal de escrita ou alcance global"],
["PostgreSQL de alto desempenho, OLTP pesado mais análise no mesmo banco", "AlloyDB", "Compatível com PostgreSQL, mais rápido, motor colunar para análise", "Não precisa de PostgreSQL ou do desempenho extra"],
["Documentos para apps web e mobile, sincronização em tempo real, sem servidor", "Firestore", "Banco de documentos serverless com listeners", "Análise pesada ou transações relacionais complexas"],
["Cache em memória, latência de submilissegundo, sessões, rankings", "Memorystore", "Redis, Valkey ou Memcached gerenciado", "Dado precisa ser a fonte de verdade durável"]
] }, dica: "Palavras que disparam a resposta: global e strongly consistent igual a Spanner; single-digit millisecond em escala massiva igual a Bigtable; existing PostgreSQL igual a Cloud SQL ou AlloyDB; ad hoc SQL em petabytes igual a BigQuery; mobile e real-time sync igual a Firestore." },
{ t: "Bigtable: como funciona e como desenhar a row key", p: [
"Bigtable guarda linhas ordenadas lexicograficamente pela row key, a única chave indexada. As linhas são divididas em tablets, distribuídos entre os nós do cluster. A escala é linear: mais nós, mais throughput. Colunas se organizam em famílias, e cada célula pode ter várias versões por timestamp, com política de garbage collection por família. Escritas e leituras de uma linha são atômicas; não há transação multilinha nem joins.",
"Hotspot é o erro mais cobrado: se a chave começa por valor sequencial (timestamp crescente, ID incremental), todas as escritas novas vão para o mesmo tablet e um nó fica sobrecarregado enquanto os outros ociosos. Desenhe a chave para espalhar escritas e ainda permitir as leituras por faixa que a aplicação faz."
], lista: [
"Ruim: timestamp#sensor_id (escritas sempre no fim do espaço de chaves).",
"Bom: sensor_id#timestamp. O prefixo espalha as escritas entre sensores e permite varrer o histórico de um sensor por faixa.",
"Últimos eventos primeiro: sensor_id#(Long.MAX_VALUE menos timestamp), a reversed timestamp.",
"Salting (prefixo hash) espalha mais, mas dificulta varreduras por faixa; use só quando não há leitura por faixa.",
"Field promotion: promover campos de alta cardinalidade e bem distribuídos (usuário, dispositivo) para o início da chave.",
"Evite chaves grandes (o limite da row key é 4 KB), linhas enormes (o limite é 256 MB por linha; o ideal é ficar bem abaixo de 100 MB) e prefixos com domínio concentrado.",
"Key Visualizer mostra mapas de calor de acesso por faixa de chave e revela hotspots."
], armadilha: "Usar timestamp no início da chave para facilitar consultas recentes. É exatamente o padrão que gera hotspot." },
{ t: "Bigtable: operação e configuração", p: [
"Armazenamento SSD é o padrão e serve quase todos os casos; HDD só para grandes volumes com acesso sequencial pouco sensível a latência. Replicação entre clusters (mesma ou outras regiões) é assíncrona e eventualmente consistente; perfis de aplicativo (app profiles) controlam o roteamento: single-cluster dá consistência de leitura após escrita, multi-cluster dá disponibilidade com failover automático. Autoscaling de nós está disponível. Para análise, consulte Bigtable por tabelas externas do BigQuery ou exporte, em vez de usar Bigtable como warehouse."
] },
{ t: "Relacionais e documentos: Spanner, Cloud SQL, AlloyDB, Firestore", p: [
"Cloud SQL é MySQL, PostgreSQL ou SQL Server gerenciado: bom para migrar aplicações existentes com poucas mudanças, escala verticalmente, com réplicas de leitura e alta disponibilidade regional. O armazenamento chega a 64 TB em instâncias de núcleo dedicado, e os limites de escala de escrita aparecem em cenários de alta carga (confira os limites atuais).",
"Spanner é relacional com escala horizontal e consistência forte global, usando TrueTime. Oferece configurações regionais e multirregionais com SLAs altos de disponibilidade e interfaces GoogleSQL e PostgreSQL. É a resposta para ledger global, inventário mundial e jogos com milhões de jogadores com transações. Custa mais; não use para carga pequena regional.",
"AlloyDB é PostgreSQL de alto desempenho, com motor colunar para consultas analíticas sobre dados operacionais (HTAP) e pools de leitura. Firestore é documento serverless, em modo nativo ou Datastore, com consistência forte e sincronização em tempo real para apps móveis e web."
] },
{ t: "Cloud Storage: classes, localização e ciclo de vida", p: [
"As classes diferem no preço de armazenamento, no custo de acesso e na duração mínima: Standard (sem mínimo, dados quentes), Nearline (30 dias, acesso cerca de uma vez por mês), Coldline (90 dias, uma vez por trimestre) e Archive (365 dias, uma vez por ano). Todas têm latência de milissegundos no primeiro byte, inclusive Archive; o que muda é o custo: classes frias têm armazenamento mais barato e cobrança por recuperação e por apagar antes do mínimo.",
"Lifecycle rules movem objetos de classe ou os apagam por condições como idade. Autoclass gerencia a classe automaticamente conforme o acesso, ideal para padrão imprevisível; não cobra retrieval nem deleção antecipada nas transições (há uma taxa de gerenciamento, veja a página de preços). A classe final padrão é Nearline, com Archive como opção. Localização: região (menor custo, latência perto da computação), dual-region (duas regiões escolhidas, georredundância com um só bucket) e multirregião (US, EU, ASIA, maior disponibilidade e alcance). Versionamento, retenção (retention policy) e bloqueio de objetos protegem contra apagar."
], tabela: { cab: ["Classe", "Duração mínima", "Uso típico"], linhas: [
["Standard", "Nenhuma", "Dados quentes, data lake ativo"],
["Nearline", "30 dias", "Backups mensais"],
["Coldline", "90 dias", "Recuperação de desastre, acesso trimestral"],
["Archive", "365 dias", "Retenção legal e histórico de longo prazo"]
] } },
{ t: "Custo e ciclo de vida de ponta a ponta", p: [
"Combine: dados novos em Standard; regra de lifecycle para Nearline, Coldline e Archive conforme a idade; no BigQuery, o preço de longo prazo vale automaticamente após 90 dias sem modificação; expiração de partição e tabela para o que não precisa ficar; exportar dado frio do BigQuery para o Cloud Storage só quando a perda de desempenho de consulta for aceitável. Escolher a classe errada pode custar mais: Archive para dado lido toda semana gera taxas de recuperação altas."
] }
],
exemplo: { t: "Plataforma de sensores industriais", texto: "Uma fábrica tem 200 mil sensores enviando uma leitura por segundo. O app de operação precisa mostrar as últimas 24 horas de um sensor em milissegundos, e analistas querem SQL sobre dois anos de dados. Decisão: Bigtable para o serviço operacional, com row key sensor_id#reversed_timestamp, pois o prefixo espalha escritas e a chave invertida entrega as leituras mais novas primeiro; app profile single-cluster ou multi-cluster conforme a disponibilidade exigida. Para análise, exportar ou consultar por tabela externa no BigQuery, que é o warehouse. Dados brutos antigos vão ao Cloud Storage com lifecycle para Coldline e Archive. Spanner seria exagero, pois não há transações relacionais globais." },
prova: [
"Consistent globally e relational transactions apontam para Spanner; ad hoc analytics apontam para BigQuery; low-latency key lookups at massive scale apontam para Bigtable.",
"Questões de row key descrevem hotspot ou escrita lenta com chave sequencial; a resposta move o identificador de alta cardinalidade para o início.",
"Unknown or changing access pattern aponta para Autoclass; rarely accessed e retained for years aponta para lifecycle com Coldline ou Archive.",
"Migrate existing MySQL or PostgreSQL with minimal changes aponta para Cloud SQL; mais desempenho e análise no mesmo banco apontam para AlloyDB."
],
explique: "Explique sem consultar: como você escolheria entre Bigtable, Spanner, Cloud SQL e BigQuery para um sistema novo, e por que timestamp no início da row key é um problema."
},
cartoes: [
{ id: "d4c1", t: "3.1", f: "Quando escolher Bigtable?", v: "Chave-valor ou séries temporais em escala massiva, latência de milissegundos, altíssimo throughput. Não serve para joins, SQL ad hoc ou transações multilinha." },
{ id: "d4c2", t: "3.1", f: "O que é hotspot no Bigtable e como evitar?", v: "Escritas concentradas num tablet por causa de row key sequencial (timestamp no início). Evite com prefixo de alta cardinalidade (sensor_id#timestamp), reversed timestamp, salting." },
{ id: "d4c3", t: "3.1", f: "Row key para ler o histórico recente de um sensor?", v: "sensor_id#reversed_timestamp (Long.MAX menos o timestamp): espalha escritas pelo prefixo e traz os mais recentes primeiro numa varredura por faixa." },
{ id: "d4c4", t: "3.1", f: "Quando escolher Spanner em vez de Cloud SQL?", v: "Quando precisa de escala horizontal de escrita, consistência forte global e alta disponibilidade multirregional com SQL relacional. Cloud SQL é regional e escala verticalmente." },
{ id: "d4c5", t: "3.1", f: "Quando escolher Cloud SQL?", v: "Aplicação existente em MySQL, PostgreSQL ou SQL Server, regional, escala moderada, mínimo de alteração e de operação." },
{ id: "d4c6", t: "3.1", f: "O que o AlloyDB oferece sobre o Cloud SQL para PostgreSQL?", v: "Mais desempenho transacional e um motor colunar para consultas analíticas sobre dados operacionais (HTAP), além de pools de leitura." },
{ id: "d4c7", t: "3.1", f: "Para que serve o Firestore?", v: "Banco de documentos serverless para apps web e móveis, com sincronização em tempo real e consistência forte. Não é para análise pesada." },
{ id: "d4c8", t: "3.1", f: "Quando usar Memorystore?", v: "Cache em memória (Redis, Valkey, Memcached) para latência de submilissegundo: sessões, rankings, consultas repetidas. Não é fonte de verdade durável." },
{ id: "d4c9", t: "3.1", f: "Durações mínimas das classes do Cloud Storage?", v: "Standard: nenhuma. Nearline: 30 dias. Coldline: 90 dias. Archive: 365 dias. Apagar antes cobra o restante do período." },
{ id: "d4c10", t: "3.1", f: "Archive do Cloud Storage tem latência alta de recuperação?", v: "Não. Todas as classes entregam o primeiro byte em milissegundos. A diferença é o custo: armazenamento mais barato e cobrança por recuperação." },
{ id: "d4c11", t: "3.1", f: "Quando usar Autoclass?", v: "Quando o padrão de acesso é desconhecido ou muda: o Cloud Storage move os objetos entre classes sozinho, sem regras manuais de lifecycle." },
{ id: "d4c12", t: "3.1", f: "Região × dual-region × multirregião no Cloud Storage?", v: "Região: menor custo, perto da computação. Dual-region: duas regiões escolhidas, um só bucket. Multirregião: continente inteiro, maior alcance e disponibilidade." },
{ id: "d4c13", t: "3.1", f: "Como o BigQuery reduz o custo de dados parados?", v: "Tabela ou partição sem alteração por 90 dias passa ao preço de longo prazo automaticamente; também se usa expiração de partição e tabela." },
{ id: "d4c14", t: "3.1", f: "Réplicas do Bigtable são fortemente consistentes?", v: "Entre clusters, a replicação é assíncrona (eventual). Com app profile single-cluster há leitura após escrita; multi-cluster dá failover automático com consistência eventual." }
],
questoes: [
{ id: "d4q1", s: 3, t: "3.1", e: "A logistics company ingests location pings from 5 million vehicles every few seconds. The application must read the latest 24 hours of a single vehicle in under 10 milliseconds and the solution must scale linearly. Which storage service should you choose?", o: ["Cloud SQL for PostgreSQL", "BigQuery", "Cloud Bigtable", "Cloud Storage Standard"], c: [2], x: "Correta: Bigtable foi feito para séries temporais de enorme volume com leituras por faixa de chave em milissegundos e escala linear ao adicionar nós. Cloud SQL não escala escrita e armazenamento nessa magnitude. BigQuery é analítico e sua latência de consulta é de segundos, não de milissegundos para uma leitura pontual. Cloud Storage é armazenamento de objetos, sem leitura por faixa de chave de baixa latência." },
{ id: "d4q2", s: 3, t: "3.1", e: "A global bank is building a ledger. It needs relational schema, ACID transactions across rows, strong consistency for users on three continents, and horizontal scaling of writes with no downtime for maintenance. Which database should you choose?", o: ["Cloud SQL with cross-region read replicas", "Firestore in Datastore mode", "Cloud Spanner in a multi-region configuration", "Cloud Bigtable with multi-cluster routing"], c: [2], x: "Correta: Spanner combina SQL relacional, transações ACID, consistência forte global e escala horizontal de escrita em configuração multirregional. Cloud SQL com réplicas de leitura ainda tem um único primário que limita escrita e a consistência das réplicas é eventual. Firestore não oferece o modelo relacional com transações ricas exigido. Bigtable com multi-cluster tem consistência eventual entre clusters e não tem transações multilinha." },
{ id: "d4q3", s: 3, t: "3.1", e: "A team stores IoT readings in Bigtable with row key timestamp#device_id. Write latency rises under load, and Key Visualizer shows a single hot band at the end of the key space. How should you fix it?", o: ["Add more nodes to the cluster", "Change the row key to device_id#timestamp", "Switch the storage type from SSD to HDD", "Enable multi-cluster replication"], c: [1], x: "Correta: com o timestamp no início, todas as escritas novas caem no mesmo tablet (hotspot). Colocar device_id primeiro espalha as escritas entre dispositivos e mantém a leitura por faixa dentro de um dispositivo. Adicionar nós não ajuda, pois o tráfego continua num tablet só. HDD é mais lento e piora a latência. Replicação aumenta disponibilidade, mas não redistribui a carga de escrita dentro de um cluster." },
{ id: "d4q4", s: 3, t: "3.1", e: "A company wants to move a 2 TB on-premises MySQL database used by an internal application to Google Cloud. The workload is regional, the application cannot be rewritten, and the team wants the LEAST operational overhead. What should you choose?", o: ["Cloud Spanner", "Cloud SQL for MySQL", "Self-managed MySQL on Compute Engine", "Bigtable with the HBase API"], c: [1], x: "Correta: Cloud SQL para MySQL é gerenciado (backups, patches, alta disponibilidade) e compatível, então a aplicação roda sem reescrita e com pouca operação. Spanner exigiria adaptar o esquema e a aplicação e é excesso para carga regional. MySQL em VM é compatível, mas aumenta o trabalho operacional, contrariando o requisito. Bigtable é NoSQL e não suporta o modelo relacional da aplicação." },
{ id: "d4q5", s: 3, t: "3.1", e: "A gaming company needs (1) sub-millisecond lookups for a real-time leaderboard that can be rebuilt from other data and (2) a serverless document store for player profiles that syncs changes to mobile clients in real time. Which two services should you use? Choose two.", o: ["Cloud Spanner for both requirements", "Memorystore for the leaderboard", "Cloud SQL for the leaderboard", "Firestore for the player profiles", "BigQuery for the player profiles"], c: [1, 3], x: "Corretas: Memorystore dá latência de submilissegundo em memória, adequado para ranking reconstruível; Firestore é documento serverless com listeners em tempo real para clientes móveis. Spanner para tudo seria caro e não oferece sincronização em tempo real nem latência de memória. Cloud SQL para o ranking não atinge submilissegundo em escala. BigQuery é analítico e não serve perfis com leitura e escrita pontuais de baixa latência." },
{ id: "d4q6", s: 3, t: "3.1", e: "Application logs are read often during the first 30 days, rarely until day 180, and must be kept for 7 years for compliance with almost no reads afterward. You want the lowest total storage cost with minimal manual work. What should you do?", o: ["Keep everything in Standard and delete after 7 years", "Store in Archive from day one", "Store in Standard and configure lifecycle rules to move objects to colder classes as they age", "Store in a multi-region bucket and rely on versioning"], c: [2], x: "Correta: Standard para o período de leitura frequente e regras de lifecycle para Nearline, Coldline e Archive conforme a idade minimizam o custo total com trabalho automático. Manter tudo em Standard paga o preço máximo por sete anos. Archive desde o primeiro dia cobraria recuperação alta e duração mínima de 365 dias para dados lidos com frequência nos primeiros 30 dias. Multirregião e versionamento não reduzem custo, aumentam." },
{ id: "d4q7", s: 3, t: "3.1", e: "A media company stores millions of objects in Cloud Storage. Some objects are popular for weeks and then are never touched; others are unpredictable. The team does not want to analyze access patterns or maintain lifecycle rules. Which feature should you enable?", o: ["Autoclass on the bucket", "Object versioning", "A retention policy", "Requester pays"], c: [0], x: "Correta: Autoclass move cada objeto automaticamente entre classes com base no padrão de acesso real, sem regras manuais. Versionamento guarda versões anteriores e não otimiza custo. A retention policy impede apagar antes de um prazo, o que é conformidade e não classe de armazenamento. Requester pays muda quem paga o acesso, não o custo de armazenamento." },
{ id: "d4q8", s: 3, t: "3.1", e: "An online retailer runs a PostgreSQL OLTP database. Product teams now also run heavy analytical queries on live operational data, causing slowdowns. The company wants to stay PostgreSQL-compatible, minimize latency for both workloads, and avoid building a separate warehouse pipeline. What should you choose?", o: ["AlloyDB for PostgreSQL with its columnar engine and read pool instances", "Bigtable", "Memorystore for Redis", "Export nightly to Cloud Storage and query with BigQuery"], c: [0], x: "Correta: AlloyDB é compatível com PostgreSQL e traz um motor colunar para consultas analíticas sobre dados operacionais, além de pools de leitura, atendendo as duas cargas sem pipeline separado. Bigtable não é relacional nem compatível com PostgreSQL. Memorystore é cache e não armazena a fonte de verdade. A exportação noturna cria atraso nos dados e o pipeline extra que se queria evitar." },
{ id: "d4q9", s: 3, t: "3.1", e: "A data science team needs ad hoc SQL with joins across 200 TB of historical data. Query latency of a few seconds to minutes is acceptable, and the team has no database administrators. Which service best fits?", o: ["Cloud Spanner", "Cloud Bigtable", "BigQuery", "Cloud SQL"], c: [2], x: "Correta: BigQuery é o warehouse serverless para SQL analítico em escala de petabytes, sem administração. Spanner é transacional e caro para varreduras analíticas desse tamanho. Bigtable não suporta joins nem consultas ad hoc. Cloud SQL tem limite de armazenamento muito menor e não é otimizado para varreduras analíticas de 200 TB." },
{ id: "d4q10", s: 3, t: "3.1", e: "A company must store backups in Cloud Storage so that data survives the loss of an entire region, with data residing only in two specific regions required by internal policy, using a single bucket name. Which location type should you choose?", o: ["A single region bucket with versioning", "A dual-region bucket with the two required regions", "A multi-region bucket", "Two region buckets synchronized by a script"], c: [1], x: "Correta: o bucket dual-region guarda os dados em duas regiões escolhidas, com georredundância e um único nome de bucket. Região única com versionamento não sobrevive à perda da região. A multirregião distribui em locais que a empresa não escolhe, violando a política das duas regiões específicas. Dois buckets com script dão mais operação e risco de inconsistência, contrariando o requisito de nome único." }
]
};
C.dias[5] = {
aula: {
titulo: "Data lake, BigLake e Dataplex",
resumo: "Como montar um lakehouse no Google Cloud: tabelas externas, nativas e BigLake, formatos abertos, segurança fina sobre arquivos, e como o Dataplex Universal Catalog dá descoberta, qualidade, linhagem e governança federada.",
blocos: [
{ t: "Ideia central: lake barato com governança de warehouse", p: [
"Um data lake guarda dados em formato bruto ou aberto (Parquet, ORC, Avro, Iceberg) no Cloud Storage: barato, durável, desacoplado de qualquer motor de consulta. O problema clássico do lake é virar pântano: ninguém sabe o que existe, não há controle de acesso por linha e coluna, a qualidade é desconhecida. Lakehouse é a ideia de manter o armazenamento aberto e barato, mas com a segurança, o desempenho e a governança de um warehouse.",
"No Google Cloud isso se faz com três peças: Cloud Storage como armazenamento, BigLake para consultar e proteger os arquivos com o motor do BigQuery (e com Spark), e Dataplex Universal Catalog para descoberta, qualidade, linhagem e governança. Lembre: o Data Catalog, serviço antigo, foi substituído pelo Dataplex Universal Catalog, que desde abril de 2026 se chama Knowledge Catalog. A prova ou materiais mais velhos podem usar o nome Dataplex Universal Catalog ou Dataplex; trate como o mesmo produto (API, CLI e papéis continuam com o nome dataplex). As policy tags ainda usam a API do Data Catalog."
] },
{ t: "Tabela externa, nativa ou BigLake?", p: [
"Uma tabela externa do BigQuery aponta para arquivos no Cloud Storage. O dado não é copiado, o que evita duplicação, mas a consulta é mais lenta que em tabela nativa e o acesso exige que o usuário tenha permissão direta no bucket; não há segurança por linha e coluna. Uma tabela nativa copia e reorganiza o dado em armazenamento do BigQuery e entrega o melhor desempenho e recursos (partição, cluster, MV, time travel).",
"Uma tabela BigLake é uma tabela externa com delegação de acesso: o usuário só precisa de permissão na tabela do BigQuery, e uma conexão (conta de serviço da conexão) lê os arquivos. Isso habilita segurança em nível de linha e de coluna, mascaramento, cache de metadados para acelerar o planejamento e acesso por outros motores (Spark pela Storage Read API) com as mesmas regras. BigLake também permite consultar dados no AWS S3 e no Azure Blob pelo BigQuery Omni, sem mover os dados."
], tabela: { cab: ["Característica", "Externa", "BigLake", "Nativa"], linhas: [
["Onde ficam os dados", "Cloud Storage", "Cloud Storage (ou S3/Azure)", "Armazenamento do BigQuery"],
["Acesso aos arquivos", "Usuário precisa de permissão no bucket", "Delegado pela conexão; usuário só precisa do BigQuery", "Não aplicável"],
["Segurança por linha e coluna", "Não", "Sim", "Sim"],
["Desempenho", "Menor", "Bom, com cache de metadados", "Melhor"],
["Outros motores (Spark)", "Direto nos arquivos", "Com políticas via Storage Read API", "Via Storage Read API"],
["Quando usar", "Exploração rápida, sem governança", "Lake aberto governado, multicloud", "Dados de consumo, desempenho máximo"]
] }, dica: "Se o enunciado pede row-level ou column-level security sobre arquivos Parquet no Cloud Storage sem dar acesso ao bucket, a resposta é BigLake." },
{ t: "Formatos e layout do lake", p: [
"Prefira formatos colunares abertos (Parquet, ORC) a CSV e JSON: comprimem melhor, carregam o esquema e permitem ler só as colunas necessárias. Apache Iceberg, e também Delta Lake e Apache Hudi, adicionam camada de tabela com transações, evolução de esquema e viagem no tempo sobre os arquivos; o BigQuery consulta Iceberg por BigLake e oferece as Apache Iceberg managed tables (tabelas gerenciadas do BigQuery com dados em formato Iceberg no seu bucket). O suporte a Delta e Hudi varia, confira na documentação.",
"Organize o layout com partições estilo Hive (pasta ano=2025/mes=01) e configure a tabela com o prefixo de partição para que o BigQuery possa podar pastas. Evite milhões de arquivos minúsculos: prefira arquivos de tamanho moderado, com compactação periódica. Use zonas lógicas: bruto (raw/landing), limpo e curado, equivalentes à arquitetura medalhão (bronze, silver, gold)."
], armadilha: "Deixar tudo em CSV e em arquivos pequenos: custo de leitura alto, consultas lentas e esquema frágil." },
{ t: "Dataplex Universal Catalog: o que ele faz", p: [
"O Dataplex Universal Catalog é a plataforma de governança e metadados do Google Cloud. Ele coleta metadados de recursos (BigQuery, Cloud Storage, Pub/Sub, entre outros) para busca e descoberta, com entradas, aspectos e glossário de negócio. Scans de descoberta (discovery) em buckets do Cloud Storage detectam arquivos e criam tabelas BigLake ou externas automaticamente. Também oferece:"
], lista: [
"Data profiling: estatísticas das colunas (percentual de nulos, valores distintos, mínimos e máximos) para entender um dataset antes de construir pipelines.",
"Auto data quality: regras (não nulo, faixa, unicidade, conjunto de valores, expressão SQL) executadas em scans agendados, com pontuação e resultados que podem ir para o BigQuery e gerar alertas.",
"Data lineage: grafo de origem e destino das colunas e tabelas (BigQuery, Dataflow, Composer e outros), usado para análise de impacto e auditoria.",
"Lakes, zones e assets: modelo mais antigo de organizar dados distribuídos por domínio, com zonas raw e curated; o modelo atual de metadados usa entries e aspects (confira na documentação o status e o que é recomendado).",
"Governança federada: cada domínio é dono dos seus dados e produtos de dados, enquanto políticas centrais de segurança, qualidade e metadados valem para todos; é o espírito do data mesh."
], dica: "Mapeamento rápido: achar dado igual a Catalog; saber como o dado é igual a profiling; garantir regras igual a data quality; saber de onde veio e o que quebra igual a lineage." },
{ t: "Dataplex versus serviços vizinhos", p: [
"Sensitive Data Protection (antigo Cloud DLP) detecta e desidentifica dados sensíveis (cartão, CPF, e-mail) por inspeção e perfis; Dataplex Profiling descreve a distribuição estatística. IAM e policy tags dão a segurança; Dataplex dá o contexto e a governança. Dataform e Dataflow executam transformações; Dataplex Quality as valida. Para portabilidade (tópico 1.3), formatos abertos, Iceberg e BigLake com Omni reduzem a dependência de um fornecedor ou motor."
] },
{ t: "Controle de custo, processamento e monitoramento do lake", p: [
"Custo: classes de armazenamento e lifecycle no Cloud Storage; Parquet particionado para ler menos; tabela nativa para o que é muito consultado, BigLake para o que é compartilhado entre motores; cache de metadados para reduzir listagem de objetos. Processamento: BigQuery para SQL, Dataproc ou Serverless for Apache Spark para Spark lendo do Cloud Storage em vez de HDFS, Dataflow para pipelines. Monitoramento: Cloud Monitoring e Logging, logs de auditoria do Cloud Storage e do BigQuery, e resultados de qualidade do Dataplex."
] }
],
exemplo: { t: "Lakehouse para analistas e cientistas", texto: "Uma empresa recebe arquivos Parquet diários de varejo em um bucket do Cloud Storage. Analistas usam SQL e cientistas usam Spark; o RH não pode ver a coluna de salário e cada gerente só vê a própria região. Solução: criar uma conexão Cloud Resource, dar a ela leitura no bucket e criar uma tabela BigLake sobre os arquivos com partição Hive. Aplicar política de linha por região e policy tag de coluna para salário; os usuários só recebem papéis no BigQuery. Spark lê pela Storage Read API e as mesmas regras valem. No Dataplex Universal Catalog, a tabela é descoberta e documentada, um scan de profiling mostra a distribuição e regras de qualidade checam não nulos e faixas; a linhagem mostra os relatórios impactados por mudanças." },
prova: [
"Row-level security on files in Cloud Storage without bucket access aponta para BigLake; query data in AWS or Azure without moving it aponta para BigLake com BigQuery Omni.",
"Discover and catalog data, profile columns, enforce data quality rules e lineage apontam para Dataplex Universal Catalog; atenção ao nome antigo Data Catalog como distrator; o produto atual se chama Knowledge Catalog (antes Dataplex Universal Catalog).",
"Federated governance e data mesh apontam para Dataplex com domínios donos de seus dados e políticas centrais.",
"Open formats, avoid lock-in e use Spark and BigQuery on the same data apontam para Parquet ou Iceberg no Cloud Storage com BigLake."
],
explique: "Explique sem consultar: a diferença entre tabela externa, BigLake e nativa; o que cada função do Dataplex entrega; e por que um lake sem governança vira pântano."
},
cartoes: [
{ id: "d5c1", t: "3.3", f: "Tabela externa × BigLake: qual a diferença principal?", v: "BigLake delega o acesso aos arquivos a uma conexão (usuário só precisa do BigQuery) e habilita segurança por linha e coluna e cache de metadados. Externa exige permissão no bucket e não tem segurança fina." },
{ id: "d5c2", t: "3.3", f: "Quando a tabela nativa é melhor que BigLake?", v: "Quando o dado é muito consultado e o desempenho máximo importa: nativa tem armazenamento otimizado, partição, cluster e MV. BigLake serve para manter dados abertos e compartilhados com outros motores." },
{ id: "d5c3", t: "3.3", f: "Como consultar dados do AWS S3 ou Azure pelo BigQuery sem mover?", v: "BigQuery Omni com tabelas BigLake, que lê os arquivos na outra nuvem com o mesmo SQL e governança." },
{ id: "d5c4", t: "3.3", f: "Por que usar Parquet ou ORC em vez de CSV no lake?", v: "São colunares e comprimidos, trazem o esquema e deixam ler só as colunas necessárias, reduzindo custo e tempo. CSV não tem tipos nem compressão eficiente." },
{ id: "d5c5", t: "3.3", f: "O que o Apache Iceberg acrescenta ao lake?", v: "Camada de tabela sobre arquivos: transações ACID, evolução de esquema e time travel. O BigQuery consulta Iceberg via BigLake." },
{ id: "d5c6", t: "3.4", f: "O que substituiu o Data Catalog?", v: "Dataplex Universal Catalog, hoje chamado Knowledge Catalog: metadados, busca, aspectos e glossário. Data Catalog é o nome antigo." },
{ id: "d5c7", t: "3.4", f: "O que faz o data profiling do Dataplex?", v: "Calcula estatísticas por coluna (nulos, distintos, mínimo, máximo etc.) para entender o dado antes de construir o pipeline." },
{ id: "d5c8", t: "3.4", f: "O que faz o auto data quality do Dataplex?", v: "Executa regras (não nulo, faixa, unicidade, conjunto, SQL) em scans agendados, com pontuação e resultados em tabela do BigQuery, permitindo alertas." },
{ id: "d5c9", t: "3.4", f: "Para que serve data lineage?", v: "Mostra a origem e o destino de tabelas e colunas, usado em análise de impacto de mudanças e em auditoria." },
{ id: "d5c10", t: "3.4", f: "O que é governança federada (data mesh) no Dataplex?", v: "Cada domínio é dono dos seus dados e produtos, com políticas centrais de segurança, qualidade e metadados aplicadas a todos." },
{ id: "d5c11", t: "3.3", f: "O que faz o scan de discovery do Dataplex em um bucket?", v: "Detecta arquivos estruturados no Cloud Storage e cria tabelas externas ou BigLake automaticamente, catalogando-as." },
{ id: "d5c12", t: "1.3", f: "Como projetar para portabilidade e evitar lock-in no lake?", v: "Formatos abertos (Parquet, Iceberg) no Cloud Storage, motores intercambiáveis (BigQuery, Spark) e BigLake com Omni para multicloud." },
{ id: "d5c13", t: "3.3", f: "Boas práticas de layout de arquivos no lake?", v: "Partições estilo Hive, arquivos de tamanho moderado com compactação, zonas raw e curated. Evitar milhões de arquivos pequenos." }
],
questoes: [
{ id: "d5q1", s: 3, t: "3.3", e: "Parquet files in a Cloud Storage bucket must be queryable from BigQuery. Analysts must see only rows for their own region, and they must not have any permission on the bucket. What should you do?", o: ["Create an external table and grant analysts Storage Object Viewer on the bucket", "Create a BigLake table through a Cloud resource connection and apply row-level access policies", "Make the bucket public and filter in the BI tool", "Load the files into Cloud SQL and use database views"], c: [1], x: "Correta: a tabela BigLake usa a conta de serviço da conexão para ler os arquivos, então os analistas não precisam de acesso ao bucket, e permite políticas de acesso por linha. Tabela externa com Storage Object Viewer dá acesso direto aos arquivos e não oferece segurança por linha. Bucket público expõe qualquer dado. Cloud SQL é transacional e adicionaria carga e cópia desnecessárias." },
{ id: "d5q2", t: "3.3", s: 3, e: "A company keeps Parquet data in Cloud Storage. Data scientists use Spark and analysts use BigQuery SQL. Security requires the same column-level restrictions for both groups without maintaining two copies of the data. Which design fits best?", o: ["Copy the data into BigQuery native tables and export a second copy for Spark", "Use BigLake tables so both engines read through BigQuery enforced policies", "Use external tables and rely on bucket IAM for column security", "Run Spark directly on the bucket and BigQuery on a CSV export"], c: [1], x: "Correta: BigLake aplica as políticas de linha e coluna no BigQuery e o Spark lê pela Storage Read API, respeitando as mesmas regras sobre um só conjunto de arquivos. Duas cópias dobram custo e criam divergência. IAM do bucket opera por objeto, não por coluna. Spark direto nos arquivos ignora as políticas do BigQuery, e a exportação CSV cria nova cópia, sem controle de coluna." },
{ id: "d5q3", t: "3.4", s: 3, e: "Your team inherits a data lake with thousands of files in Cloud Storage and no documentation. You want tables to be discovered and registered automatically so that analysts can search for them, with minimal custom code. What should you use?", o: ["A Dataflow job that lists the bucket and writes metadata to Firestore", "Dataplex discovery scans and Dataplex Universal Catalog", "Cloud Composer DAG that parses file names", "Sensitive Data Protection inspection jobs"], c: [1], x: "Correta: os scans de discovery do Dataplex detectam arquivos estruturados, criam tabelas e as publicam no catálogo para busca, sem código. Um job do Dataflow gravando no Firestore é construção manual que reinventa o catálogo. Um DAG do Composer analisando nomes de arquivos é frágil e também manual. Sensitive Data Protection procura dados sensíveis, não cataloga tabelas nem cria esquemas." },
{ id: "d5q4", t: "3.4", s: 3, e: "A company still documents datasets in Data Catalog. A new engineer asks which Google Cloud service now provides metadata search, business glossary, lineage, and data quality in one governance platform. What is the answer?", o: ["Looker", "Cloud Composer", "Dataplex Universal Catalog", "Cloud Asset Inventory"], c: [2], x: "Correta: o Dataplex Universal Catalog (hoje chamado Knowledge Catalog) substituiu o Data Catalog e reúne busca de metadados, glossário, linhagem e qualidade. Looker é BI e modelagem semântica. Cloud Composer é orquestração de workflows. Cloud Asset Inventory lista recursos e políticas de IAM da nuvem, não metadados de dados de negócio nem qualidade." },
{ id: "d5q5", t: "3.4", s: 3, e: "A finance team wants to automatically verify that the amount column in a BigQuery table is never null and stays within a valid range, run these checks daily, store the results in BigQuery, and trigger an alert on failures. Which approach has the LEAST operational overhead?", o: ["Write a Dataflow batch job that validates rows and writes errors to a table", "Create Dataplex auto data quality rules and a scheduled scan", "Ask analysts to review the table manually each morning", "Run a Cloud Function every minute that scans the table"], c: [1], x: "Correta: o auto data quality do Dataplex define regras declarativas (não nulo, faixa) em scans agendados, grava resultados no BigQuery e permite alertas, sem código. Um job do Dataflow exige desenvolver e operar um pipeline. A revisão manual não é automática nem confiável. Uma Cloud Function a cada minuto varrendo a tabela é cara, imprecisa e manual de manter." },
{ id: "d5q6", t: "3.3", s: 3, e: "A data lake stores 300 TB of CSV files, partly as millions of small files, and queries are slow and expensive. You want to reduce query cost and improve performance with a sensible layout. Choose two.", o: ["Convert the data to Parquet", "Store the data in Archive class to lower cost", "Organize files in Hive-style partition folders and compact small files", "Convert Parquet to JSON for flexibility", "Keep the small files so that each source system stays isolated"], c: [0, 2], x: "Corretas: Parquet é colunar e comprimido, reduz bytes lidos, e partições estilo Hive com compactação de arquivos pequenos permitem podar pastas e reduzem sobrecarga de listagem e abertura. Archive é para dados raramente acessados e adicionaria custos de recuperação para consultas frequentes. JSON é mais pesado e lento que Parquet. Manter milhões de arquivos pequenos é justamente a causa da lentidão." },
{ id: "d5q7", t: "3.4", s: 3, e: "A global retailer wants each business domain to own and publish its data products, while a central team enforces security, quality, and metadata standards across all domains without becoming a bottleneck. Which approach describes this?", o: ["A single centralized warehouse managed only by the central team", "Federated governance with Dataplex, organizing data by domain and applying central policies", "Separate projects with no shared catalog to maximize independence", "A data lake with no metadata layer"], c: [1], x: "Correta: governança federada (data mesh) com Dataplex deixa cada domínio dono de seus dados enquanto políticas centrais de segurança, qualidade e metadados valem para os demais domínios. Um warehouse centralizado vira o gargalo que se quer evitar. Projetos isolados sem catálogo compartilhado perdem descoberta e padrões comuns. Um lake sem camada de metadados é o pântano de dados, sem governança." },
{ id: "d5q8", t: "3.4", s: 3, e: "Before renaming a column in a source table, an engineer needs to know which downstream tables, pipelines, and reports will be affected. Which capability should they use?", o: ["Dataplex data lineage", "Dataplex data profiling", "BigQuery time travel", "Cloud Audit Logs data access logs"], c: [0], x: "Correta: a linhagem de dados mostra o grafo de origem e destino entre tabelas e colunas, usado em análise de impacto. O profiling descreve estatísticas de colunas, não dependências. Time travel recupera estados passados de uma tabela. Logs de auditoria registram quem acessou o dado, mas não montam o grafo de dependências entre ativos." },
{ id: "d5q9", t: "1.3", s: 1, e: "A company stores part of its data in Amazon S3 and wants to analyze it together with BigQuery data using standard SQL, without copying the S3 data into Google Cloud and while applying column-level security. What should you use?", o: ["BigQuery Omni with BigLake tables", "Storage Transfer Service followed by a load job", "A Dataflow pipeline that copies S3 data nightly", "Cloud SQL federated queries"], c: [0], x: "Correta: BigQuery Omni consulta dados no S3 no local, por tabelas BigLake, mantendo SQL e governança como segurança por coluna. Storage Transfer mais load job copia os dados, contrariando o requisito. Um pipeline Dataflow noturno também copia e adiciona latência e operação. Cloud SQL não consulta arquivos do S3 e não é a ferramenta analítica para isso." },
{ id: "d5q10", t: "3.4", s: 3, e: "Before building a pipeline on a new third-party dataset in BigQuery, a data engineer wants to understand the percentage of null values, distinct counts, and value ranges for each column, without writing SQL for every column. What should they do?", o: ["Run a Dataplex data profile scan on the table", "Run Sensitive Data Protection to redact the table", "Create a materialized view for each column", "Export the table to CSV and inspect it in a spreadsheet"], c: [0], x: "Correta: o scan de profiling do Dataplex calcula automaticamente nulos, valores distintos e faixas por coluna. Sensitive Data Protection detecta e desidentifica dados sensíveis, não descreve a distribuição geral. Criar uma MV por coluna é trabalhoso e não entrega as estatísticas. Exportar para planilha não escala e perde tempo com tabelas grandes." }
],
lab: { t: "Lakehouse: Parquet no Cloud Storage, tabela BigLake e perfil de dados", custo: "Cerca de US$ 0 a poucos centavos (arquivos de KB, scan de profiling em tabela minúscula); apague tudo ao final.",
porque: "Mostra a delegação de acesso por conexão, a diferença para tabela externa e o uso do Dataplex para catalogar e fazer profiling.",
passos: [
{ t: "Preparar APIs, bucket e arquivo Parquet", cmd: "gcloud services enable bigqueryconnection.googleapis.com dataplex.googleapis.com\nexport P=$(gcloud config get-value project)\nexport B=gs://lake-estudo-$P\ngcloud storage buckets create $B --location=US\nbq mk --dataset --location=US --default_table_expiration=86400 estudo5\nbq query --use_legacy_sql=false 'CREATE TABLE estudo5.estacoes AS SELECT * FROM `bigquery-public-data.austin_bikeshare.bikeshare_stations`'\nbq extract --destination_format=PARQUET estudo5.estacoes $B/estacoes/part-*.parquet", p: "Bucket e dataset ficam na multirregião US, como o dataset público. O extract gera arquivos Parquet no bucket." },
{ t: "Criar a conexão e dar acesso ao bucket", cmd: "bq mk --connection --location=US --connection_type=CLOUD_RESOURCE lake_conn\nbq show --connection $P.US.lake_conn", p: "Copie o serviceAccountId da saída. Essa conta de serviço, e não o usuário, vai ler os arquivos." },
{ t: "Conceder leitura à conta da conexão", cmd: "gcloud storage buckets add-iam-policy-binding $B --member=serviceAccount:SERVICE_ACCOUNT_ID --role=roles/storage.objectViewer", p: "Troque SERVICE_ACCOUNT_ID pelo valor do passo anterior. Esse é o princípio da delegação de acesso do BigLake." },
{ t: "Criar a tabela BigLake e consultar", cmd: "bq query --use_legacy_sql=false 'CREATE EXTERNAL TABLE estudo5.estacoes_biglake WITH CONNECTION `'$P'.US.lake_conn` OPTIONS (format=\"PARQUET\", uris=[\"'$B'/estacoes/*.parquet\"])'\nbq query --use_legacy_sql=false 'SELECT status, COUNT(*) FROM estudo5.estacoes_biglake GROUP BY status'", p: "A tabela lê os arquivos Parquet sem copiar. O nome da conexão tem o formato projeto.localização.conexão. Se a sintaxe da sua versão do bq reclamar (confira bq --help), crie a tabela pelo console (Add data, Google Cloud Storage, tipo BigLake)." },
{ t: "Catalogar e perfilar no Dataplex", p: "No console, abra Knowledge Catalog (antes Dataplex Universal Catalog; os menus ainda podem mostrar Dataplex), procure a tabela estudo5.estacoes_biglake e veja os metadados. Em Data profiling and quality, crie um data profile scan sobre a tabela (execução sob demanda) e rode. Observe nulos, distintos e faixas por coluna." }
],
limpar: ["Apague o scan de profiling no console do Dataplex", "bq rm -f -t estudo5.estacoes_biglake", "bq rm --connection $P.US.lake_conn", "bq rm -r -f -d estudo5", "gcloud storage rm -r $B"],
verificar: "A consulta na tabela BigLake retorna contagens por status, e o scan de profiling exibe as estatísticas de cada coluna da tabela." }
};
C.dias[6] = {
aula: {
titulo: "Segurança I: IAM, chaves e BigQuery",
resumo: "IAM e contas de serviço, organization policies, VPC Service Controls, criptografia (padrão, CMEK, CSEK, EKM) e os controles de acesso do BigQuery: authorized views, datasets e rotinas, row-level, policy tags e mascaramento.",
blocos: [
{ t: "Ideia central: camadas de defesa", p: [
"Segurança em dados não é um controle, é uma pilha. Pergunte em ordem: quem pode fazer o quê (IAM), o que a organização proíbe por padrão (organization policies), de onde os dados podem sair (VPC Service Controls), quem controla as chaves (CMEK, CSEK, EKM) e quem vê quais linhas e colunas (controles do BigQuery). Cada questão de prova mira uma camada; encontrar a camada certa elimina metade das alternativas.",
"O princípio que guia tudo é o menor privilégio: conceder o papel mais restrito, no menor escopo, pelo menor tempo."
] },
{ t: "IAM: papéis, escopo e herança", p: [
"Uma política IAM liga uma entidade (usuário, grupo, conta de serviço) a um papel em um recurso. Papéis básicos (Owner, Editor, Viewer) são amplos e evitados em produção. Papéis predefinidos são granulares por serviço (BigQuery Data Viewer, BigQuery Job User, Dataflow Worker). Papéis customizados agrupam permissões exatas quando nenhum predefinido serve, mas dão trabalho de manutenção. Prefira conceder a grupos, não a pessoas.",
"A herança vai de Organization a Folder, Project e recurso, e as permissões somam. Conceder em um dataset restringe mais que no projeto. IAM Conditions limitam por tempo, recurso ou atributo; deny policies negam explicitamente e prevalecem sobre concessões. Para refinar, o IAM Recommender sugere remover permissões não usadas."
], tabela: { cab: ["Papel BigQuery", "O que permite"], linhas: [
["BigQuery Data Viewer", "Ler dados e metadados de tabelas (no escopo concedido)"],
["BigQuery Data Editor", "Ler e modificar dados e tabelas"],
["BigQuery Job User", "Executar jobs (consultas, cargas) no projeto"],
["BigQuery User", "Executar jobs e criar datasets"],
["BigQuery Admin", "Controle total"]
] }, dica: "Para consultar são necessárias duas coisas: ler os dados (Data Viewer no dataset) e rodar o job (Job User no projeto que será cobrado)." },
{ t: "Contas de serviço", p: [
"Conta de serviço é uma identidade para aplicações e cargas de trabalho, não para pessoas. A boa prática é criar uma conta dedicada por carga, com papéis mínimos, e anexá-la ao recurso (por exemplo, a conta dos workers do Dataflow, da Composer, da Cloud Function). Assim não existe chave para vazar: a credencial é emitida automaticamente.",
"Chaves JSON baixadas são o risco clássico: duram muito, são copiadas, vazam em repositórios. Alternativas: anexar a conta ao recurso, impersonation (uma pessoa ou outra conta recebe o papel Service Account Token Creator e gera credenciais temporárias, sem chave) e Workload Identity Federation para cargas fora do Google Cloud (AWS, Azure, GitHub, on-premises). Para anexar uma conta a um recurso, quem cria o recurso precisa do papel Service Account User nela. Contas padrão com papel Editor devem ser evitadas."
], armadilha: "Dar o papel Editor ou Owner a uma conta de serviço por conveniência, ou distribuir chaves JSON. A resposta correta quase sempre usa uma conta dedicada e mínima, sem chave." },
{ t: "Organization policies e VPC Service Controls", p: [
"Organization policies definem restrições (constraints) sobre o que pode ser configurado, herdadas pela hierarquia, independentemente do IAM. Exemplos úteis: restringir localizações de recursos (constraints/gcp.resourceLocations) para soberania de dados; desabilitar criação de chaves de conta de serviço (iam.disableServiceAccountKeyCreation); bloquear IPs externos em VMs; restringir compartilhamento a domínios permitidos (iam.allowedPolicyMemberDomains). IAM diz quem pode; a organization policy diz o que é permitido existir.",
"VPC Service Controls cria um perímetro de serviço em volta de projetos e serviços (BigQuery, Cloud Storage, entre outros) para impedir a exfiltração de dados pelas APIs do Google, mesmo com credenciais válidas: copiar de um dataset protegido para um bucket fora do perímetro é bloqueado. Regras de ingress e egress abrem exceções controladas, níveis de acesso do Access Context Manager definem de onde o acesso é permitido, e o modo dry run testa antes de impor. Ele complementa o IAM, não o substitui."
], tabela: { cab: ["Ameaça ou requisito", "Controle"], linhas: [
["Quem pode ler este dataset", "IAM"],
["Ninguém pode criar chaves de conta de serviço na organização", "Organization policy"],
["Dados só podem existir na UE", "Organization policy de localização"],
["Evitar cópia dos dados para fora, mesmo por quem tem acesso", "VPC Service Controls"]
] } },
{ t: "Criptografia e gestão de chaves", p: [
"Por padrão, todo dado é criptografado em repouso (AES-256) com chaves gerenciadas pelo Google e em trânsito com TLS, sem nenhuma configuração. Usa-se criptografia de envelope: uma chave de dados (DEK) criptografa o dado e uma chave de criptografia de chave (KEK), no Cloud KMS, protege a DEK. Trocar a KEK exige apenas reembrulhar as DEKs, não recriptografar todo o dado.",
"Quando a conformidade exige controle das chaves, escolha entre três opções. CMEK: você cria e controla a chave no Cloud KMS (rotação, desativação, destruição), e serviços como BigQuery, Cloud Storage, Dataflow e Pub/Sub a usam; desabilitar a chave torna os dados ilegíveis. CSEK: você fornece a chave a cada requisição e o Google não a guarda; só vale para Cloud Storage e Compute Engine, e perder a chave é perder o dado. EKM: a chave fica num gerenciador externo fora do Google, e o Cloud KMS a referencia, para quem exige que a chave nunca esteja no Google. Cloud HSM usa módulos de hardware certificados."
], tabela: { cab: ["Opção", "Quem guarda a chave", "Serviços", "Use quando"], linhas: [
["Padrão do Google", "Google", "Todos", "Sem requisito especial"],
["CMEK (Cloud KMS)", "Você, no Cloud KMS ou HSM", "Muitos (BigQuery, Cloud Storage, Dataflow...)", "Precisa controlar rotação e revogar acesso"],
["CSEK", "Você fornece em cada requisição", "Apenas Cloud Storage e Compute Engine", "Controle total e aceita o risco de perda"],
["EKM (Cloud External Key Manager)", "Provedor externo", "Serviços compatíveis", "A chave não pode residir no Google"]
] }, armadilha: "Esquecer que a chave do Cloud KMS precisa estar na mesma localização do recurso (por exemplo, dataset na multirregião EU exige chave no local multirregional europe, e dataset US exige chave em us). Também esquecer de conceder à conta de serviço do BigQuery o papel de criptografar e descriptografar com a chave." },
{ t: "Segurança dentro do BigQuery", p: [
"IAM pode ser concedido em projeto, dataset, tabela e view. Para granularidade menor há quatro mecanismos. Authorized view: uma view em um dataset é autorizada a ler o dataset de origem, e os usuários recebem acesso só ao dataset da view, nunca à origem; serve para expor um recorte. Authorized dataset autoriza todas as views de um dataset de uma vez; authorized routine faz o mesmo para UDFs, table functions e procedures.",
"Row-level security: CREATE ROW ACCESS POLICY com GRANT TO e FILTER USING define quais linhas cada grupo vê; quem não está em nenhuma política não vê linha nenhuma. Column-level security: uma taxonomia de policy tags (criada e gerenciada pela API do Data Catalog, com o papel Policy Tag Admin; a busca e o catálogo migraram para o Knowledge Catalog) é anexada às colunas; só quem tem o papel Fine-Grained Reader na tag lê a coluna, os demais recebem erro de acesso. Mascaramento dinâmico de dados: regras associadas à tag (hash, nulificar, valor padrão, máscara de e-mail, últimos ou primeiros caracteres) fazem o usuário com Masked Reader ver o valor mascarado em vez de erro, e quem tem Fine-Grained Reader ver o real."
], tabela: { cab: ["Necessidade", "Mecanismo"], linhas: [
["Expor um recorte de colunas e linhas sem dar acesso à origem", "Authorized view (ou dataset, ou rotina)"],
["Cada grupo vê só as suas linhas", "Row access policy"],
["Só um grupo lê a coluna de CPF", "Policy tag (column-level security)"],
["Todos consultam, mas o CPF aparece mascarado", "Policy tag com regra de mascaramento"],
["Proteger o conteúdo em repouso com chave própria", "CMEK no dataset"]
] } },
{ t: "Dev versus produção e residência de dados", p: [
"Separe ambientes em projetos distintos, agrupados em folders, com IAM e organization policies próprios e contas de serviço próprias. Em desenvolvimento, use dados sintéticos, amostrados ou mascarados, não cópias de PII de produção. Para soberania, use a organization policy de localização de recursos e crie datasets e buckets na região exigida; Assured Workloads aplica controles de regimes regulatórios. Auditoria: os logs de atividade administrativa estão sempre ativos; logs de acesso a dados do BigQuery vêm habilitados por padrão e os de muitos outros serviços precisam ser habilitados."
] }
],
exemplo: { t: "Compartilhar vendas com parceiros sem expor o cliente", texto: "Uma empresa quer que o time do parceiro consulte vendas por produto e região, sem ver nomes e CPF dos clientes e sem acessar a tabela de origem. Passos: criar um dataset parceiro_views em outro projeto, escrever uma view que seleciona só produto, região e total, autorizar a view no dataset de origem, e dar ao grupo do parceiro BigQuery Data Viewer no dataset parceiro_views e Job User no projeto dele. Para a coluna CPF dentro da origem, aplicar policy tag para que apenas a equipe de conformidade a leia. O perímetro VPC Service Controls impede que alguém com acesso copie os dados para um bucket externo, e o dataset usa CMEK por exigência de auditoria, com chave na mesma localização." },
prova: [
"Least privilege, grupos e papéis predefinidos são a base; evite Owner e Editor e chaves JSON.",
"Prevent data exfiltration, even by users with valid access aponta para VPC Service Controls; restrict where resources can be created aponta para organization policy.",
"Customer-managed keys aponta para CMEK; keys must stay outside Google Cloud aponta para EKM; CSEK só vale para Cloud Storage e Compute Engine.",
"Share only some columns or rows without access to the source aponta para authorized view; mask the value for some users aponta para policy tag com mascaramento; each manager sees own region aponta para row access policy."
],
explique: "Explique sem consultar: o que cada controle protege (IAM, organization policy, VPC Service Controls, CMEK, authorized view, row-level e policy tags) e como uma conta de serviço acessa dados sem chave JSON."
},
cartoes: [
{ id: "d6c1", t: "1.1", f: "Por que evitar papéis básicos (Owner, Editor, Viewer) em produção?", v: "São amplos e violam o menor privilégio. Use papéis predefinidos por serviço, e customizados só se nenhum servir." },
{ id: "d6c2", t: "1.1", f: "Duas permissões necessárias para um analista consultar uma tabela BigQuery?", v: "BigQuery Data Viewer (ler os dados, no dataset) e BigQuery Job User (rodar o job, no projeto que será cobrado)." },
{ id: "d6c3", t: "1.1", f: "Como uma carga acessa dados sem chave JSON de conta de serviço?", v: "Anexando uma conta dedicada ao recurso, impersonation com Service Account Token Creator, ou Workload Identity Federation para cargas externas." },
{ id: "d6c4", t: "1.1", f: "Qual constraint impede criar chaves de conta de serviço?", v: "iam.disableServiceAccountKeyCreation, aplicada por organization policy na organização, folder ou projeto." },
{ id: "d6c5", t: "1.1", f: "Como restringir onde os recursos podem ser criados (soberania)?", v: "Organization policy de localização de recursos (constraints/gcp.resourceLocations), herdada pela hierarquia." },
{ id: "d6c6", t: "1.1", f: "O que o VPC Service Controls protege?", v: "Cria um perímetro em volta de serviços e projetos para impedir exfiltração de dados pelas APIs, mesmo com credenciais válidas. Complementa o IAM." },
{ id: "d6c7", t: "1.1", f: "CMEK × CSEK × EKM: diferença?", v: "CMEK: chave sua no Cloud KMS. CSEK: você envia a chave a cada requisição (só Cloud Storage e Compute Engine). EKM: chave em gerenciador externo fora do Google." },
{ id: "d6c8", t: "1.1", f: "Regra de localização da chave do Cloud KMS com CMEK?", v: "A chave deve estar na mesma localização do recurso (dataset na multirregião EU exige chave em europe; US exige us). Dar à conta de serviço do serviço o papel de criptografar e descriptografar." },
{ id: "d6c9", t: "1.1", f: "O que é criptografia de envelope?", v: "Uma chave de dados (DEK) criptografa o dado e uma chave de criptografia de chave (KEK), no Cloud KMS, protege a DEK. Reembrulhar as DEKs com nova KEK não exige recriptografar todo o dado." },
{ id: "d6c10", t: "1.1", f: "O que acontece se a chave CMEK é desativada?", v: "Os dados ficam ilegíveis até reativar a chave. Destruí-la torna a perda irreversível." },
{ id: "d6c11", t: "1.1", f: "Para que serve uma authorized view no BigQuery?", v: "Expor um recorte de dados a usuários que não têm acesso ao dataset de origem: a view é autorizada na origem e os usuários acessam só o dataset da view." },
{ id: "d6c12", t: "1.1", f: "Authorized dataset e authorized routine: o que são?", v: "Authorized dataset autoriza todas as views de um dataset de uma vez. Authorized routine autoriza UDFs, table functions e procedures a ler a origem." },
{ id: "d6c13", t: "1.1", f: "Como funciona uma row access policy?", v: "CREATE ROW ACCESS POLICY com GRANT TO e FILTER USING define as linhas visíveis a cada grupo. Quem não está em nenhuma política não vê linhas." },
{ id: "d6c14", t: "4.1", f: "Policy tag: sem papel e com mascaramento, o que o usuário vê?", v: "Sem acesso à tag, a consulta que lê a coluna dá erro. Com regra de mascaramento e papel Masked Reader, vê valor mascarado. Com Fine-Grained Reader, vê o real." },
{ id: "d6c15", t: "1.1", f: "Como separar dev e produção?", v: "Em projetos distintos (dentro de folders), com IAM, contas de serviço e organization policies próprios, e dados mascarados ou amostrados em dev." }
],
questoes: [
{ id: "d6q1", s: 1, t: "1.1", e: "A Dataflow pipeline running in production reads from Cloud Storage and writes to BigQuery. A developer proposes creating a service account key with the Editor role and storing it in the pipeline code. What is the best practice instead?", o: ["Create a key with the Owner role and store it in Secret Manager", "Run the job with a dedicated user-managed service account with only the required roles attached as the worker service account", "Use the default Compute Engine service account with the Editor role", "Run the pipeline with the developer's personal credentials"], c: [1], x: "Correta: uma conta de serviço dedicada, anexada como conta dos workers e com apenas os papéis necessários, segue o menor privilégio e elimina a chave. Uma chave Owner no Secret Manager continua sendo uma chave de longa duração com privilégio excessivo. A conta padrão do Compute Engine com Editor é ampla demais. Credenciais pessoais não devem rodar cargas de produção e prendem o pipeline a uma pessoa." },
{ id: "d6q2", s: 1, t: "1.1", e: "A data engineer must run a local script that calls BigQuery as a specific service account for testing, without downloading a key. What should you do?", o: ["Grant the engineer the Service Account Token Creator role on that service account and use impersonation", "Create a JSON key and delete it after the test", "Give the engineer the Owner role on the project", "Share the service account password with the engineer"], c: [0], x: "Correta: com o papel Service Account Token Creator, a pessoa gera credenciais temporárias como a conta de serviço (impersonation), sem chave. Criar a chave e apagar depois ainda expõe uma credencial de longa duração durante o teste. Owner no projeto é privilégio excessivo e não resolve a identidade. Contas de serviço não têm senha; essa opção não existe." },
{ id: "d6q3", s: 1, t: "1.1", e: "A team in project A owns a BigQuery dataset with customer orders. A team in project B needs to query only product, region, and total columns without any access to the source dataset. What should you do?", o: ["Grant the project B team BigQuery Data Viewer on the source dataset", "Create a view in a separate dataset and authorize it on the source dataset, then grant the team access only to the view dataset", "Copy the full table to project B and delete sensitive columns by hand each week", "Export the table to a public Cloud Storage bucket"], c: [1], x: "Correta: a authorized view lê a origem em nome dos usuários, que só precisam de acesso ao dataset da view, expondo apenas as colunas desejadas. Dar Data Viewer na origem expõe todas as colunas. Copiar a tabela manualmente cria duplicação e risco de esquecer a limpeza. Exportar para bucket público expõe os dados a qualquer pessoa." },
{ id: "d6q4", s: 1, t: "1.1", e: "A BigQuery sales table includes a region column. Each regional manager must see only rows for their own region, and managers must be added or removed through Google Groups. What should you do?", o: ["Create one table per region and grant access to each", "Create row access policies with FILTER USING on region granted to each manager group", "Create a policy tag for the region column", "Use CMEK with a different key per region"], c: [1], x: "Correta: políticas de acesso por linha filtram as linhas conforme o grupo, mantendo uma só tabela e gerenciamento por grupos. Uma tabela por região multiplica objetos e a manutenção. Policy tag controla o acesso a uma coluna inteira, não a linhas. CMEK por região protege em repouso, mas não restringe quais linhas um usuário autorizado consulta." },
{ id: "d6q5", s: 1, t: "1.1", e: "A BigQuery table contains a national_id column that only the compliance group may read. Everyone else must still query the other columns. Which two actions should you take? Choose two.", o: ["Create a taxonomy with a policy tag and attach it to the national_id column", "Create a row access policy on the national_id column", "Grant the compliance group the Fine-Grained Reader role on the policy tag", "Enable CMEK on the dataset to hide the column", "Apply an organization policy constraint to the table"], c: [0, 2], x: "Corretas: a segurança em nível de coluna usa uma policy tag anexada à coluna e o papel Fine-Grained Reader na tag para quem pode ler. Row access policy filtra linhas, não colunas. CMEK criptografa em repouso e não esconde colunas de usuários com acesso à tabela. Organization policy restringe configurações de recursos e não controla a leitura de uma coluna." },
{ id: "d6q6", s: 1, t: "1.1", e: "A company worries that an employee with valid BigQuery access could copy sensitive datasets to a Cloud Storage bucket in a personal Google Cloud project. Which control best prevents this exfiltration?", o: ["Remove the BigQuery Data Viewer role from all users", "Create a VPC Service Controls perimeter around the projects and services holding the data", "Enable CMEK on the dataset", "Enable Data Access audit logs"], c: [1], x: "Correta: o VPC Service Controls bloqueia no nível da API a movimentação de dados para fora do perímetro, mesmo por quem tem credenciais válidas. Remover o papel de leitura impede o uso legítimo dos dados e não é o controle de exfiltração. CMEK criptografa em repouso, mas quem pode ler continua podendo copiar. Logs de auditoria detectam depois do fato, não previnem." },
{ id: "d6q7", s: 1, t: "1.1", e: "A regulation requires that you can instantly revoke the cloud provider's ability to read data in a BigQuery dataset located in the EU multi-region. Creating the dataset with a customer-managed key fails when the Cloud KMS key was created in us-central1. What should you do?", o: ["Create the key in the europe multi-region location and grant the BigQuery service account the encrypter/decrypter role", "Use a customer-supplied encryption key (CSEK) for the dataset", "Keep the key in us-central1 and move the dataset to the US", "Disable encryption for the dataset"], c: [0], x: "Correta: a chave do Cloud KMS precisa estar na localização correspondente à do dataset (multirregião europe para um dataset EU), e a conta de serviço do BigQuery precisa do papel de criptografar e descriptografar. CSEK não é suportada pelo BigQuery, só por Cloud Storage e Compute Engine. Mover o dataset para os EUA quebra a exigência de residência na UE. A criptografia em repouso não pode ser desligada e a exigência é justamente ter controle da chave." },
{ id: "d6q8", s: 1, t: "1.1", e: "A financial institution requires that encryption keys for its Cloud Storage data be held in a third-party key management system outside Google Cloud at all times. Which option meets this requirement?", o: ["Google-managed encryption keys", "Cloud KMS software keys", "Cloud External Key Manager (Cloud EKM)", "Cloud HSM keys"], c: [2], x: "Correta: o Cloud EKM referencia chaves mantidas em um gerenciador externo, de modo que o material da chave nunca fica no Google. Chaves gerenciadas pelo Google estão no Google por definição. Chaves de software do Cloud KMS residem no Google. Cloud HSM usa módulos de hardware, mas dentro da infraestrutura do Google Cloud, não fora dela." },
{ id: "d6q9", s: 1, t: "1.1", e: "Security leaders want to eliminate long-lived service account keys across the organization. Which two actions should you take? Choose two.", o: ["Enforce the iam.disableServiceAccountKeyCreation organization policy constraint", "Rotate all keys once per year and keep them in a private repository", "Attach dedicated service accounts to workloads and use impersonation or Workload Identity Federation instead of keys", "Grant the Owner role to service accounts so that keys are never needed", "Ask developers to delete unused keys when they remember"], c: [0, 2], x: "Corretas: a organization policy impede criar novas chaves, e anexar contas, impersonation ou Workload Identity Federation entregam credenciais temporárias sem chave. Rotacionar uma vez por ano e guardar em repositório mantém credenciais de longa duração e o risco de vazamento. Dar Owner às contas amplia o privilégio e não elimina chaves. Pedir que desenvolvedores apaguem chaves quando lembrarem não é um controle." },
{ id: "d6q10", s: 1, t: "1.1", e: "Developers need to test new pipelines against realistic data. Production tables contain PII, and the company wants to prevent accidental changes to production while keeping governance simple. What is the best design?", o: ["Give developers Editor on the production project and use naming conventions", "Use separate dev and prod projects in folders, with dev holding masked or sampled data and its own service accounts and IAM", "Use one project and separate dev and prod only by dataset names", "Let developers copy production tables to their personal projects"], c: [1], x: "Correta: projetos separados dão fronteira de IAM, cobrança e organization policies; em dev ficam dados mascarados ou amostrados e contas próprias, protegendo a produção e o PII. Editor em produção permite alterações acidentais e a convenção de nomes não é controle. Um projeto só com datasets separados mistura permissões e cotas. Cópias para projetos pessoais tiram o PII do controle de governança." }
]
};

/* ===== Camada fácil e didática (semana 1): analogia, glossário, "Traduzindo", checagem e apoio aos labs ===== */
function camada(n, x) {
  var d = C.dias[n], a = d.aula;
  a.simples = x.simples;
  a.glossario = x.glossario;
  a.checagem = x.checagem;
  a.blocos.forEach(function (b, i) { b.facil = x.facil[i]; });
  if (x.lab && d.lab) { d.lab.antes = x.lab.antes; d.lab.erros = x.lab.erros; d.lab.tempo = x.lab.tempo; }
}

/* ---------- DIA 1 ---------- */
camada(1, {
  simples: {
    analogia: "Estudar para esta prova é parecido com tirar carta de motorista. A prova prática não pede que você decore o manual do carro; ela coloca você numa rua real e quer ver se toma boas decisões: qual faixa pegar, quando frear, o que fazer num imprevisto. Aqui é igual. Cada questão conta a história de uma empresa com um problema e algumas regras (gastar pouco, guardar dados num país, ter pouca gente na equipe). Você precisa escolher o serviço que resolve respeitando as regras. Por isso estudar bem é treinar a decisão: ler a situação, achar as regras, descartar o que quebra alguma regra. Reler a aula dá sensação de progresso, mas é como ler o manual sem nunca dirigir. Tentar lembrar sem olhar, explicar em voz alta e errar de propósito nos exercícios é o que realmente cria memória. O limite da analogia: na prova você não pode consultar nada, então a prática precisa acontecer antes.",
    pontos: [
      "A prova testa decisão de arquitetura, não decoreba de comando.",
      "Leia primeiro a pergunta final e depois marque as regras do cenário.",
      "Descarte a alternativa que quebra uma regra, mesmo que ela pareça poderosa.",
      "Tentar lembrar sem olhar ensina mais do que reler.",
      "Crie um projeto só para estudo e um orçamento de alerta antes de qualquer lab.",
      "Entender como o Google Cloud se organiza evita metade dos erros de iniciante."
    ],
    paraQueServe: "Você usa isso em toda sessão de estudo e na hora da prova, ao ler um cenário e escolher o serviço certo sem se perder nos detalhes."
  },
  glossario: [
    { t: "Google Cloud", d: "Conjunto de serviços de computação, armazenamento e dados que você usa pela internet e paga conforme o uso." },
    { t: "Console (Cloud console)", d: "O site onde você vê e mexe nos seus recursos com menus e botões." },
    { t: "Organização (organization)", d: "O nível mais alto da hierarquia, que representa a empresa inteira. Contas pessoais costumam não ter uma." },
    { t: "Pasta (folder)", d: "Agrupa projetos, por exemplo por departamento ou por ambiente. Regras definidas na pasta valem para tudo dentro dela." },
    { t: "Projeto (project)", d: "A caixa onde seus recursos vivem. Define quem paga, quais APIs estão ativas e quem tem acesso." },
    { t: "Conta de faturamento (billing account)", d: "Quem paga a conta. Os projetos são vinculados a ela para poder usar serviços pagos." },
    { t: "Região (region)", d: "Área geográfica onde o serviço roda, como southamerica-east1 (São Paulo)." },
    { t: "Zona (zone)", d: "Um espaço isolado dentro de uma região. Se uma zona falha, as outras da região continuam de pé." },
    { t: "API", d: "A porta pela qual programas e comandos pedem coisas a um serviço. Em cada projeto, cada serviço precisa ter a sua API ativada." },
    { t: "IAM (Identity and Access Management)", d: "O sistema que decide quem pode fazer o quê em qual recurso." },
    { t: "Papel (role)", d: "Um pacote de permissões, como BigQuery Data Viewer, que você concede a alguém." },
    { t: "Conta de serviço (service account)", d: "Identidade usada por um programa, e não por uma pessoa, para acessar recursos." },
    { t: "Cloud Shell", d: "Terminal que abre no navegador, com gcloud e bq já instalados e autenticados." },
    { t: "gcloud e bq", d: "gcloud é o comando geral do Google Cloud. bq é o comando específico do BigQuery." },
    { t: "Dataset e bucket", d: "Dataset é a pasta de tabelas do BigQuery. Bucket é o contêiner de arquivos do Cloud Storage." },
    { t: "Cota (quota)", d: "Limite de uso que o Google coloca por projeto, para evitar abusos e sustos. Alguns limites podem ser pedidos em aumento." }
  ],
  checagem: [
    "Sem olhar: em que ordem você vai ler uma questão de cenário e o que vai marcar nela?",
    "Explique com suas palavras por que alerta de orçamento não impede cobrança.",
    "Cite a hierarquia do Google Cloud, de cima para baixo, e diga onde as permissões são herdadas.",
    "Qual a diferença entre região e zona, e por que a localização de um dataset importa?"
  ],
  facil: [
    "Traduzindo: a prova mostra casos reais de empresas e pede a melhor decisão. Saber comandos de cor importa bem menos do que saber escolher o serviço.",
    "Traduzindo: leia a pergunta final primeiro, marque as regras do cenário (custo, local, segurança) e corte as respostas que quebram alguma regra.",
    "Traduzindo: não trave numa questão difícil. Marque, siga em frente e volte no fim com a cabeça mais calma.",
    "Traduzindo: o que fixa o conteúdo é tentar lembrar sem olhar, explicar em voz alta e anotar seus erros. Reler sozinho engana.",
    "Traduzindo: são 19 temas em 5 grupos. Dê uma nota a cada um agora e refaça toda semana para ver o progresso.",
    "Traduzindo: crie um projeto só para estudo, ligue um alerta de gasto e apague tudo que criar nos labs. Assim você aprende sem susto na fatura.",
    "Traduzindo: projeto é a caixa dos seus recursos, a localização dos dados não muda depois de criada, e no BigQuery você paga pelo que lê."
  ],
  lab: {
    antes: "Você precisa de uma conta Google e de um cartão para a conta de faturamento, a menos que use o sandbox. Abra o console em console.cloud.google.com e clique no ícone Activate Cloud Shell (símbolo >_) no canto superior direito. Uma janela de terminal abre embaixo, e na primeira vez aparece um pedido de autorização: clique em Authorize. O terminal já mostra seu usuário e o projeto atual entre parênteses. Troque SEU-PROJETO-ESTUDO-123 por um ID só seu, em minúsculas, com letras, números e hífens. Ao rodar o dry run, você verá uma frase do tipo: esta consulta vai processar N bytes. Anote o número, porque você vai comparar depois.",
    erros: [
      { s: "The project ID you specified is already in use by another project", c: "O ID de projeto é único no mundo inteiro e alguém já usou esse nome.", r: "Acrescente números ou iniciais ao ID (por exemplo estudo-pde-seunome-4821), rode o create de novo e atualize o config set project." },
      { s: "Billing must be enabled ou This API method requires billing to be enabled", c: "O projeto não está vinculado a uma conta de faturamento.", r: "Rode gcloud billing accounts list, copie o ID da conta e rode gcloud billing projects link com ele. Confira em Billing, My projects no console." },
      { s: "API has not been used in project ... or it is disabled", c: "A API do serviço ainda não foi ativada nesse projeto.", r: "Rode gcloud services enable com o nome da API que a mensagem cita e espere um a dois minutos antes de repetir o comando." },
      { s: "Permission denied ou 403 ao criar o orçamento", c: "Sua conta não tem um papel de faturamento na conta de faturamento, ou a API de orçamentos não foi ativada.", r: "Ative billingbudgets.googleapis.com e peça ao administrador do faturamento o papel necessário. Se for você mesmo, crie o orçamento pelo console, em Billing, Budgets and alerts." },
      { s: "Query exceeded limit for bytes billed", c: "A consulta leria mais bytes do que o teto de maximum_bytes_billed que você definiu.", r: "Isso é o limite funcionando. Se o dado é seu e pequeno, aumente o teto com cuidado; se não, selecione menos colunas e rode o dry run antes." }
    ],
    tempo: "25 a 35 minutos"
  }
});

/* Novos blocos do dia 1: Google Cloud do zero (entram antes de 'Preparar a conta') */
(function () {
  var blocos = C.dias[1].aula.blocos;
  var novos = [
    { t: "O que é o Google Cloud e como a plataforma é organizada",
      facil: "Traduzindo: o Google Cloud é um conjunto de serviços alugados. Tudo fica dentro de projetos, que ficam em pastas e numa organização, e alguém paga a conta.",
      p: [
        "O **Google Cloud** é um conjunto de serviços que você usa pela internet: guardar arquivos, rodar bancos de dados, analisar dados. Você não compra servidor. Você usa e paga pelo que usar.",
        "A porta de entrada é o **console**, um site com menus e botões. Você também pode controlar tudo por comandos, que veremos em seguida.",
        "Tudo que você cria mora dentro de um **projeto**. Pense no projeto como uma caixa de trabalho: ela tem dono, regras e conta próprias. Um bucket, uma tabela e um pipeline pertencem sempre a um projeto.",
        "Acima dos projetos há uma hierarquia: **organização** (a empresa inteira), **pastas** (departamentos ou ambientes como dev e prod) e **projetos**. Quem usa uma conta pessoal costuma ter só projetos soltos, sem organização.",
        "Regra que cai na prova: permissões e políticas **descem** de cima para baixo. Algo definido na organização vale para tudo que está abaixo dela.",
        "Cada projeto tem três identificações. O **nome** é livre e serve para humanos. O **ID do projeto** é único no mundo e não muda. O **número do projeto** é gerado pelo Google. Nos comandos, você usa o ID.",
        "Quem paga? A **billing account** (conta de faturamento). Ela é como o cartão da empresa. O projeto precisa estar vinculado a uma conta de faturamento para usar a maioria dos serviços pagos. Sem esse vínculo, a criação de recursos costuma falhar.",
        "Onde ficam os dados? Em **regiões** e **zonas**. Região é uma área geográfica, como `southamerica-east1` (São Paulo). Zona é um espaço isolado dentro da região, como `southamerica-east1-a`.",
        "Alguns serviços oferecem **multirregião**, como `US` e `EU`, que espalha o dado por várias regiões de uma grande área. É mais disponível, mas você escolhe menos sobre onde exatamente o dado está.",
        "Por que isso importa? A localização afeta **lei** (residência de dados), **latência** (distância até quem usa) e **custo**. Em muitos serviços, como o dataset do BigQuery, você não troca a localização depois de criar.",
        "Por fim, as **APIs**. Cada serviço é acessado por uma API, a porta que comandos e programas usam para pedir coisas. Várias APIs vêm desativadas num projeto novo e outras já vêm ativadas. Para ligar uma: `gcloud services enable nome-da-api`.",
        "Se você esquecer de ativar, o erro típico diz que a API não foi usada no projeto ou está desativada. Ativar uma API que já está ativa não causa problema."
      ],
      lista: [
        "Ordem de cima para baixo: organização, pastas, projetos, recursos.",
        "Projeto: fronteira de cobrança, de APIs e de permissões.",
        "Região: área geográfica. Zona: pedaço isolado de uma região.",
        "API desativada é a causa número um de erro de iniciante."
      ],
      dica: "Analogia útil, com limite: o projeto é uma caixa de trabalho, mas diferente de uma pasta de arquivos ele também carrega a conta, as APIs ativas e as permissões." },
    { t: "Quem pode fazer o quê (IAM em 5 minutos)",
      facil: "Traduzindo: IAM é o sistema de crachás. Você escolhe quem entra (usuário, grupo ou conta de serviço), dá um papel e define em que recurso ele vale.",
      p: [
        "**IAM** significa Identity and Access Management (gerenciamento de identidade e acesso). Ele responde a uma pergunta: **quem** pode fazer **o quê** em **qual recurso**.",
        "Comece pelos quem. Eles se chamam **principais**: **usuários** (pessoas), **grupos** (conjuntos de pessoas) e **contas de serviço** (identidades de programas).",
        "Depois vêm as ações. Cada ação é uma **permissão**, como `bigquery.tables.getData`, que significa ler os dados de uma tabela. Ninguém concede permissão solta. Você concede um **papel**, que é um pacote de permissões, como **BigQuery Data Viewer**.",
        "A concessão tem sempre três partes: este **principal** recebe este **papel** neste **recurso**. O conjunto dessas concessões forma a **política IAM** do recurso.",
        "Pense em um prédio de escritórios. O **crachá** é a identidade. O **papel** é a lista de portas que o crachá abre. O limite da analogia: no IAM, os acessos que você recebe de vários lugares se somam.",
        "Existem três tipos de papel. **Básicos** (Owner, Editor, Viewer) são amplos demais e devem ser evitados em produção. **Predefinidos** são criados pelo Google, por serviço, e são o padrão recomendado. **Customizados** você monta com permissões exatas, quando nenhum predefinido serve.",
        "O princípio central é o **menor privilégio**: dar só o necessário, no menor escopo possível e pelo menor tempo.",
        "Exemplo: uma analista só precisa ler tabelas de um dataset. Dê **BigQuery Data Viewer** nesse dataset. Para executar consultas ela também precisa de **BigQuery Job User** no projeto, porque rodar uma consulta cria um job. Não dê Editor no projeto inteiro.",
        "Outro exemplo: um pipeline do Dataflow roda como **conta de serviço**. Dê a essa conta só os papéis que o pipeline usa. Evite baixar **chaves JSON** dela: são como senhas que duram muito e vazam fácil.",
        "A **herança** funciona de cima para baixo. Um papel dado numa pasta vale para todos os projetos dentro dela. Por isso conceda no **nível mais baixo que resolve** e, sempre que puder, a **grupos** em vez de pessoas.",
        "Quando aparecer **Permission denied** ou erro 403, quase sempre falta um papel ao principal certo, no recurso certo."
      ],
      lista: [
        "Principal = quem. Papel = pacote de permissões. Recurso = onde vale.",
        "Prefira papéis predefinidos a básicos.",
        "Conceda a grupos e no escopo mais baixo.",
        "Conta de serviço é para programas, não para pessoas."
      ],
      armadilha: "Resolver um erro de permissão dando o papel Owner ou Editor. Funciona, mas quebra o menor privilégio e é a resposta errada na prova." },
    { t: "Como você vai interagir: console, Cloud Shell, gcloud e bq",
      facil: "Traduzindo: o console é para olhar e clicar. O Cloud Shell é um terminal pronto no navegador, onde você roda gcloud e bq para criar e repetir tarefas.",
      p: [
        "Há quatro jeitos de falar com o Google Cloud: console, Cloud Shell, `gcloud` e `bq`. Todos chegam ao mesmo lugar.",
        "O **console** é o site. Ele é ótimo para explorar, ver gráficos e entender o que existe. Clicar é fácil, mas difícil de repetir igual.",
        "O **Cloud Shell** é um terminal que abre no navegador. Ele já traz `gcloud` e `bq` instalados e logados com a sua conta. Você não instala nada.",
        "Para abrir: no console, clique no ícone **Activate Cloud Shell**, o símbolo `>_` na barra do topo. Na primeira vez, autorize. Os arquivos da sua pasta pessoal ficam guardados entre sessões, mas o resto da máquina é temporário.",
        "O **gcloud** é o comando geral para criar e gerenciar recursos. O **bq** é o comando do BigQuery. Para arquivos no Cloud Storage use `gcloud storage`.",
        "Comandos têm uma estrutura previsível: `gcloud grupo subgrupo comando --flag=valor`. Leia da esquerda para a direita, do geral para o específico.",
        "Exemplo: `gcloud storage buckets create gs://meu-bucket --location=US`. Aqui `storage` é o grupo, `buckets` o subgrupo, `create` a ação, `gs://meu-bucket` o alvo e `--location=US` uma flag (opção) que escolhe a localização.",
        "Exemplo no BigQuery: `bq query --use_legacy_sql=false 'SELECT 1'`. Aqui `query` é a ação, a flag escolhe o SQL padrão e o texto entre aspas simples é a consulta.",
        "Comandos úteis para se orientar: `gcloud config list` mostra o projeto atual. `gcloud config set project ID` troca de projeto. `gcloud auth list` mostra quem está logado.",
        "Perdeu-se? Use `--help`. Por exemplo, `gcloud storage --help` lista os subgrupos e `gcloud storage buckets create --help` explica cada flag. No BigQuery, use `bq help query`.",
        "A documentação oficial fica em cloud.google.com. Cada serviço tem uma página com áreas parecidas: **conceitos** (como funciona), **guias** (passo a passo e quickstarts), **referência** (comandos e APIs), **preços** e **quotas and limits** (cotas e limites).",
        "Na dúvida de prova, a página de conceitos explica o porquê. A de cotas e limites mostra os números que não vale a pena decorar de cabeça."
      ],
      lista: [
        "Console: explorar e clicar.",
        "Cloud Shell: terminal pronto, sem instalar nada.",
        "gcloud: recursos em geral. bq: BigQuery.",
        "Estrutura: gcloud grupo subgrupo comando --flag.",
        "Perdeu-se? Acrescente --help."
      ],
      dica: "Na prova quase não há comandos para decorar. Você lê o comando só para entender a ideia: onde, o quê e com qual opção." },
    { t: "Mapa dos serviços em analogias",
      facil: "Traduzindo: cada serviço faz um trabalho diferente. Use a tabela como mapa rápido e volte aqui sempre que um nome novo aparecer.",
      p: [
        "Não tente decorar a tabela agora. Leia como um mapa: **onde guardar**, **como entrar**, **como transformar**, **como organizar** e **como proteger**. Os detalhes vêm nos próximos dias.",
        "Toda analogia tem limite. Aqui ela serve só para fixar a função de cada serviço, não os detalhes técnicos."
      ],
      tabela: { cab: ["Serviço", "Analogia do dia a dia", "Para que serve", "Aparece na prova como"], linhas: [
        ["BigQuery", "Um grande arquivo onde analistas fazem perguntas rápidas, sem você montar sala nenhuma", "Armazém de dados para análise com SQL em escala enorme, sem servidor para administrar", "Análise ad hoc e BI sobre TB ou PB; custo por bytes lidos ou por capacidade"],
        ["Cloud Storage", "Depósito de caixas etiquetadas, onde cada arquivo é uma caixa", "Guarda arquivos (objetos): dados brutos, imagens, backups, data lake", "Pouso dos dados brutos e lake barato; classes e lifecycle"],
        ["Pub/Sub", "Caixa de correio: quem envia deixa a carta e quem assina recebe, sem se conhecerem", "Mensageria que recebe eventos em tempo real e entrega a vários consumidores", "Porta de entrada de streaming que desacopla quem envia de quem recebe"],
        ["Dataflow", "Linha de produção que trata cada item que chega, com esteiras que o Google liga e desliga", "Processa dados em lote e em streaming, de forma gerenciada (Apache Beam)", "Transformar e enriquecer dados em fluxo; janelas, exatamente uma vez"],
        ["Dataproc", "Alugar uma cozinha industrial já equipada com os fogões que sua equipe conhece", "Clusters gerenciados de Spark e Hadoop", "Migrar jobs Spark e Hadoop existentes com poucas mudanças"],
        ["Cloud Composer", "Um gerente com agenda que manda cada equipe trabalhar na ordem certa", "Orquestra e agenda fluxos de trabalho (Apache Airflow gerenciado)", "Coordenar pipelines com dependências, horários e novas tentativas"],
        ["Bigtable", "Armário gigante de gavetas numeradas: achar uma gaveta pelo número é instantâneo", "Banco NoSQL de baixa latência para volumes massivos, buscando pela chave da linha", "Séries temporais e IoT; desenho da row key e hotspot"],
        ["Spanner", "Cartório central do mundo todo, em que qualquer filial vê o mesmo registro", "Banco relacional com consistência forte e escala horizontal, até global", "Transações globais com SQL e escala que um banco comum não alcança"],
        ["Cloud SQL", "Uma planilha de loja bem organizada, com um zelador contratado para backups e atualizações", "MySQL, PostgreSQL e SQL Server gerenciados", "Migrar aplicação relacional existente; escala regional"],
        ["AlloyDB", "A mesma planilha, mas com um motor de corrida por baixo (compatível com PostgreSQL)", "PostgreSQL gerenciado de alto desempenho, com apoio a consultas analíticas", "Carga transacional pesada em PostgreSQL com análise no mesmo banco"],
        ["Firestore", "Fichário com fichas flexíveis, em que cada ficha é um documento", "Banco de documentos sem servidor para apps web e mobile", "Dados de aplicativo com sincronização em tempo real"],
        ["Dataplex", "Bibliotecária que cataloga o acervo e diz o que existe, em que estado e quem pode usar", "Catálogo, governança, qualidade e linhagem de dados", "Descoberta, metadados e governança de data lake e warehouse"],
        ["Looker", "Painel do carro, que mostra os números para quem precisa decidir", "Ferramenta de BI: painéis e métricas (Looker e Looker Studio)", "Camada de visualização sobre o BigQuery"],
        ["IAM, KMS e DLP", "Crachá (IAM), cofre de chaves (KMS) e detector de dados sensíveis (DLP, hoje Sensitive Data Protection)", "Permissões, chaves de criptografia e detecção de dados sensíveis", "Segurança e conformidade: menor privilégio, chaves próprias, mascaramento"]
      ] } }
  ];
  blocos.splice.apply(blocos, [5, 0].concat(novos));
})();

/* ---------- DIA 2 ---------- */
camada(2, {
  simples: {
    analogia: "Imagine uma biblioteca gigante. Os livros ficam num galpão enorme, e os leitores trabalham em salas de leitura que são alugadas só enquanto alguém está lendo. O galpão e as salas crescem de forma independente: mais livros não obrigam a ter mais salas, e mais leitores não obrigam a ter mais livros. O BigQuery funciona assim, com o armazenamento separado do processamento. Agora pense numa tabela como uma planilha enorme. O BigQuery guarda cada coluna em uma gaveta separada. Se a sua pergunta usa duas colunas, ele abre só duas gavetas, e você paga pelo tamanho do que foi aberto (no modelo sob demanda). Partição é dividir as gavetas em estantes por data, para ignorar estantes inteiras. Cluster é manter as fichas de cada estante em ordem, para achar rápido. O limite da analogia: no BigQuery quem arruma tudo é o próprio serviço; você só escolhe as regras.",
    pontos: [
      "O BigQuery separa onde os dados ficam de quem faz o cálculo.",
      "Ele lê só as colunas que a consulta cita, então SELECT * é caro.",
      "Partição divide a tabela por data ou por faixa, e a consulta pula o resto.",
      "Cluster ordena os dados dentro da tabela para filtrar mais rápido.",
      "Carga em lote é gratuita. Streaming serve para dado em tempo real.",
      "Dry run mostra os bytes da consulta antes de gastar algo."
    ],
    paraQueServe: "Você usa isso quando precisa carregar dados no BigQuery e quer que as consultas dos analistas custem pouco e respondam rápido."
  },
  glossario: [
    { t: "BigQuery", d: "Serviço do Google Cloud para analisar muitos dados com SQL, sem servidor para administrar." },
    { t: "Data warehouse", d: "Banco organizado para análises e relatórios, e não para registrar vendas uma a uma." },
    { t: "Dataset", d: "Pasta de tabelas dentro de um projeto. Define a localização dos dados e algumas regras." },
    { t: "Slot", d: "Pequena fatia de computação (CPU e memória) que o BigQuery usa para executar sua consulta." },
    { t: "Tabela particionada (partitioned table)", d: "Tabela dividida em pedaços por uma regra, como um pedaço por dia. A consulta lê só os pedaços de que precisa." },
    { t: "Cluster (clustering)", d: "Ordenação dos dados dentro da tabela por até algumas colunas, para pular blocos que não interessam." },
    { t: "Load job (carga em lote)", d: "Tarefa que traz um arquivo para dentro do BigQuery de uma vez. É gratuita; você paga o armazenamento." },
    { t: "Streaming", d: "Envio de dados linha a linha, em tempo real, para a tabela, em vez de em arquivos grandes." },
    { t: "Dry run", d: "Modo que só estima quantos bytes a consulta leria, sem executar nem cobrar." },
    { t: "Time travel", d: "Recurso para consultar ou recuperar como a tabela estava dias atrás." }
  ],
  checagem: [
    "Sem olhar: o que significa dizer que o BigQuery separa armazenamento e computação?",
    "Por que SELECT * custa mais do que escolher duas colunas, e o LIMIT ajuda ou não?",
    "Explique em voz alta a diferença entre partição e cluster, com um exemplo de cada.",
    "Quando você usaria carga em lote e quando usaria streaming?"
  ],
  facil: [
    "Traduzindo: no BigQuery os dados ficam num lugar e o cálculo acontece em outro, e cada um cresce sozinho. Você paga pelo que a consulta lê.",
    "Traduzindo: o dataset é a pasta de tabelas e define onde elas ficam. A localização não muda depois, e você não junta tabelas de locais diferentes.",
    "Traduzindo: para trazer arquivos, use carga em lote, que é gratuita. Para dado em tempo real, use streaming, de preferência pela Storage Write API.",
    "Traduzindo: partição corta a tabela em pedaços, por exemplo por dia. Se você filtra a data, o BigQuery lê só os pedaços necessários.",
    "Traduzindo: cluster mantém os dados ordenados por colunas que você filtra muito. A economia existe, mas só aparece depois que a consulta roda.",
    "Traduzindo: dá para desfazer erros por alguns dias com time travel, e dado parado por muito tempo fica mais barato sozinho, sem você fazer nada.",
    "Traduzindo: repetir a mesma consulta pode sair de graça pelo cache, mas só se nada mudou. Fique atento a quando o cache não vale."
  ],
  lab: {
    antes: "Antes de começar, tenha o projeto de estudo criado, o billing vinculado e a API do BigQuery ativa. Abra o Cloud Shell e confirme o projeto com gcloud config get-value project. Os comandos bq mk e bq query não pedem nenhuma tela especial: você verá mensagens como Dataset estudo successfully created e, nos dry runs, a frase sobre quantos bytes seriam processados. No console, em BigQuery, abra o painel Explorer e clique no seu projeto para ver o dataset estudo e as tabelas aparecerem. O último dry run, sem filtro, vai falhar de propósito por causa de require_partition_filter. Esse erro é o resultado esperado, não um problema.",
    erros: [
      { s: "Already Exists: Dataset ... estudo", c: "Você já criou um dataset com esse nome em outra tentativa.", r: "Reaproveite o dataset, ou apague com bq rm -r -f -d estudo e crie de novo. Cuide para não apagar dados que você queira manter." },
      { s: "Not found: Dataset ... was not found in location ...", c: "O dataset e a tabela pública estão em localizações diferentes, ou você digitou o nome do dataset errado.", r: "Crie o dataset com --location=US, igual ao dado público, e confira o nome com bq ls." },
      { s: "Cannot query over table ... without a filter over column(s) start_time", c: "A tabela exige filtro de partição (require_partition_filter=TRUE) e a consulta não tem esse filtro.", r: "É o comportamento esperado do lab. Para consultar, acrescente WHERE na coluna de partição, como start_time em um intervalo." },
      { s: "Access Denied ... does not have bigquery.jobs.create permission", c: "Seu usuário não tem papel para rodar consultas neste projeto.", r: "Use o projeto onde você é dono, ou peça o papel BigQuery Job User no projeto. Confira o projeto atual com gcloud config get-value project." },
      { s: "BigQuery API has not been used in project ... or it is disabled", c: "A API ainda não foi ativada no projeto que você está usando.", r: "Rode gcloud services enable bigquery.googleapis.com, espere um ou dois minutos e repita o comando." }
    ],
    tempo: "25 a 35 minutos"
  }
});

/* ---------- DIA 3 ---------- */
camada(3, {
  simples: {
    analogia: "Pense numa cozinha de restaurante. Se cada prato exige buscar ingrediente em vários armários distantes, o cozinheiro perde muito tempo andando. Esse andar é o que o BigQuery chama de JOIN: juntar tabelas diferentes, o que custa caro quando elas são gigantes. A solução comum é deixar tudo que é usado junto na mesma bancada, o que se chama desnormalizar: guardar a informação já reunida, mesmo repetindo um pouco. Como o espaço (armazenamento) é barato, vale a pena. Uma materialized view é como uma marmita pronta que a cozinha repõe sozinha quando os ingredientes mudam: a resposta já está pronta para quem pedir de novo. O limite da analogia: a marmita só serve para pedidos parecidos com ela, e não substitui a cozinha inteira.",
    pontos: [
      "No BigQuery, juntar tabelas enormes custa caro, e guardar dado repetido custa pouco.",
      "Por isso se costuma desnormalizar: deixar junto o que é lido junto.",
      "STRUCT e ARRAY guardam itens dentro da linha e evitam o JOIN.",
      "Para achar a causa de uma consulta lenta, olhe o plano de execução.",
      "Materialized view guarda uma resposta pronta e se atualiza sozinha.",
      "BI Engine deixa painéis rápidos usando memória reservada."
    ],
    paraQueServe: "Você usa isso quando desenha tabelas para análise ou quando uma consulta ou um painel demora demais e você precisa descobrir por quê."
  },
  glossario: [
    { t: "Desnormalização", d: "Guardar dados repetidos de propósito, juntos na mesma tabela, para consultar sem precisar juntar tabelas." },
    { t: "JOIN", d: "Operação de SQL que combina linhas de duas tabelas usando uma chave em comum." },
    { t: "Tabela fato", d: "Tabela com os eventos e medidas do negócio, como cada venda ou cada clique." },
    { t: "Tabela dimensão", d: "Tabela que descreve quem, o quê e quando, como clientes, produtos e datas." },
    { t: "STRUCT e ARRAY", d: "STRUCT é um registro com vários campos dentro de uma coluna. ARRAY é uma lista de valores em uma coluna." },
    { t: "SCD (Slowly Changing Dimension)", d: "Técnica para guardar o histórico quando uma dimensão muda, como um cliente que muda de categoria." },
    { t: "Shuffle", d: "Movimentação de dados entre slots durante uma consulta. Muito shuffle deixa a consulta lenta." },
    { t: "Skew (desequilíbrio)", d: "Quando uma chave concentra muitos dados e um slot trabalha muito mais que os outros." },
    { t: "Materialized view (MV)", d: "Resultado pré-calculado de uma consulta, guardado e atualizado sozinho pelo BigQuery." },
    { t: "BI Engine", d: "Serviço em memória que acelera painéis, como os do Looker Studio, sobre o BigQuery." }
  ],
  checagem: [
    "Por que no BigQuery se costuma desnormalizar, ao contrário de um banco comum?",
    "O que são STRUCT e ARRAY, e que problema eles ajudam a evitar?",
    "Que sinais no plano de execução indicam skew e que correções você aplicaria?",
    "Quando usar materialized view e quando usar BI Engine?"
  ],
  facil: [
    "Traduzindo: no BigQuery o JOIN entre tabelas gigantes é o que pesa. Guardar a informação já junta, mesmo repetida, costuma compensar.",
    "Traduzindo: estrela é um fato no centro com dimensões em volta. Tabela larga junta tudo numa só. STRUCT e ARRAY colocam os itens dentro da linha.",
    "Traduzindo: quando um atributo muda (como a categoria do cliente), você decide se perde o passado ou guarda uma linha nova para cada mudança.",
    "Traduzindo: abra o plano de execução e procure estágios muito mais lentos que os outros, ou muito dado movido. Cada sinal tem uma correção.",
    "Traduzindo: cada acelerador resolve um caso. MV evita refazer a mesma conta. BI Engine acelera painel. Search index acha texto em logs.",
    "Traduzindo: entregue ao painel tabelas já preparadas e esconda dados sensíveis antes de chegar na ferramenta de visualização."
  ],
  lab: {
    antes: "Tenha o projeto de estudo com billing e a API do BigQuery ativa, e abra o Cloud Shell. Este lab cria um dataset estudo3, copia uma tabela pública e compara os bytes de consultas com dry run. Você verá mensagens com a quantidade de bytes de cada consulta. No console, abra o BigQuery, clique no dataset estudo3 e veja que a materialized view aparece na lista de tabelas, com um ícone próprio. Fique atento à ordem: se a criação da tabela base falhar, todos os passos seguintes também vão falhar, porque dependem dela. Anote os bytes de cada dry run para comparar no fim.",
    erros: [
      { s: "Already Exists: Dataset ... estudo3", c: "O dataset de uma tentativa anterior ainda existe.", r: "Rode bq rm -r -f -d estudo3 para apagar e crie de novo, ou reaproveite o dataset existente." },
      { s: "Not found: Table ... estudo3.trips", c: "O passo de criar a cópia da tabela falhou ou foi pulado, então a consulta não encontra a tabela.", r: "Volte ao primeiro passo, confira a mensagem de erro dele, e rode de novo a criação da tabela. Use bq ls estudo3 para conferir." },
      { s: "Access Denied ... bigquery.tables.create ou bigquery.jobs.create", c: "Seu usuário não tem papéis suficientes neste projeto.", r: "Confirme o projeto com gcloud config get-value project. Em projeto seu, você é dono. Em outro, peça BigQuery Data Editor e BigQuery Job User." },
      { s: "Materialized view ... query is not supported ou unsupported", c: "A consulta da MV usa algo que materialized views não aceitam.", r: "Simplifique para uma agregação simples sobre uma tabela, como COUNT e SUM com GROUP BY. Confira as limitações na documentação de materialized views." },
      { s: "bq: command not found", c: "Você abriu um terminal comum, fora do Cloud Shell, sem o Google Cloud CLI instalado.", r: "Use o Cloud Shell, onde bq já vem pronto, ou instale o Google Cloud CLI e rode gcloud auth login." }
    ],
    tempo: "30 a 40 minutos"
  }
});

/* ---------- DIA 4 ---------- */
camada(4, {
  simples: {
    analogia: "Pense em como organizar uma loja. O caderno do caixa, onde cada venda é anotada na hora e consultada rapidamente, não é o mesmo lugar onde o dono analisa as vendas do ano inteiro. E nenhum dos dois é o depósito onde as caixas ficam empilhadas. Cada lugar serve para um jeito de usar. No Google Cloud é igual: não existe o melhor serviço de armazenamento, existe o que combina com o seu padrão de acesso. Para pergunta sobre todo o histórico, serve o BigQuery. Para guardar arquivos como estão, o Cloud Storage. Para anotar e consultar registros pontuais bem rápido, um banco como Cloud SQL ou Spanner, e o Bigtable para volumes enormes de medições. A pergunta certa é: como vou ler e escrever esses dados? O limite da analogia: na vida real o mesmo dado pode morar em mais de um lugar, cada um para um uso.",
    pontos: [
      "Não existe o melhor armazenamento. O padrão de acesso escolhe o serviço.",
      "Análise sobre muito histórico aponta para o BigQuery.",
      "Leitura e escrita pontual e rápida aponta para bancos operacionais.",
      "Bigtable vai bem em volume enorme, mas depende da row key certa.",
      "Spanner é relacional e global. Cloud SQL é relacional e regional.",
      "No Cloud Storage, a classe depende de quantas vezes você acessa o dado."
    ],
    paraQueServe: "Você usa isso sempre que uma questão ou um projeto pede para escolher onde guardar os dados com a melhor relação entre custo, velocidade e esforço."
  },
  glossario: [
    { t: "OLTP e OLAP", d: "OLTP são operações pequenas e rápidas do dia a dia (uma venda). OLAP são análises grandes sobre muito histórico." },
    { t: "Bigtable", d: "Banco NoSQL do Google Cloud para volumes enormes e leituras e escritas em milissegundos." },
    { t: "Row key", d: "A chave que identifica cada linha no Bigtable. É o único índice, então o desenho dela é decisivo." },
    { t: "Hotspot", d: "Quando muitas escritas caem no mesmo ponto e um nó fica sobrecarregado enquanto os outros ficam livres." },
    { t: "Spanner", d: "Banco relacional que escala horizontalmente e mantém consistência forte, inclusive entre regiões." },
    { t: "Cloud SQL", d: "Bancos MySQL, PostgreSQL ou SQL Server gerenciados pelo Google." },
    { t: "AlloyDB", d: "Banco gerenciado compatível com PostgreSQL, com foco em alto desempenho." },
    { t: "Firestore", d: "Banco de documentos sem servidor, feito para apps web e mobile." },
    { t: "Classe de armazenamento (storage class)", d: "Tipo de armazenamento do Cloud Storage: Standard, Nearline, Coldline e Archive, do mais acessado ao mais frio." },
    { t: "Regra de ciclo de vida (lifecycle rule)", d: "Regra que move ou apaga objetos automaticamente, por exemplo conforme a idade." }
  ],
  checagem: [
    "Sem olhar: que perguntas você faz, em ordem, para escolher um serviço de armazenamento?",
    "O que é hotspot no Bigtable e como o desenho da row key o evita?",
    "Quando você escolheria Spanner em vez de Cloud SQL?",
    "Como as classes do Cloud Storage e as regras de ciclo de vida ajudam a economizar?"
  ],
  facil: [
    "Traduzindo: antes de escolher o serviço, pergunte como você vai usar o dado. Consulta pontual e rápida e análise de histórico pedem serviços diferentes.",
    "Traduzindo: a tabela casa cada necessidade com um serviço. Use como atalho para eliminar alternativas que não encaixam no cenário.",
    "Traduzindo: o Bigtable ordena as linhas pela row key. Se a chave começa por algo sempre crescente, as escritas se acumulam num ponto só.",
    "Traduzindo: no Bigtable você também escolhe disco, réplicas e como o tráfego é roteado. Isso muda a velocidade, o custo e a consistência.",
    "Traduzindo: Cloud SQL serve para apps relacionais comuns. Spanner serve quando precisa escalar muito e ser global. AlloyDB e Firestore têm usos próprios.",
    "Traduzindo: no Cloud Storage, quanto menos você acessa, mais barata a classe. A regra de ciclo de vida muda a classe sozinha com o tempo.",
    "Traduzindo: junte as peças. Dado novo no lugar quente, dado antigo migrando para mais barato, e apagando o que ninguém mais usa."
  ]
});

/* ---------- DIA 5 ---------- */
camada(5, {
  simples: {
    analogia: "Imagine um grande galpão onde você guarda caixas do jeito que elas chegam, sem reorganizar nada. É barato e cabe de tudo. O risco é virar uma bagunça: ninguém sabe o que existe, quem pode abrir cada caixa ou se o conteúdo está bom. Para resolver, você coloca uma porta com um porteiro, que confere o crachá antes de deixar alguém ver cada prateleira. Esse é o papel do BigLake. E contrata uma bibliotecária que cataloga as caixas, descreve o conteúdo e avisa quando algo está estragado. Esse é o papel do Dataplex. O galpão é o Cloud Storage. Juntando as três coisas, você tem um data lake organizado, com a economia do galpão e o controle de um armazém bem administrado. O limite da analogia: o porteiro e a bibliotecária não mudam o conteúdo das caixas, só controlam e descrevem.",
    pontos: [
      "Data lake guarda dados brutos em arquivos baratos, como no Cloud Storage.",
      "Sem catálogo e regras, um lake vira um pântano que ninguém entende.",
      "Tabela externa aponta para os arquivos. BigLake acrescenta segurança por linha e coluna.",
      "Parquet é um formato em colunas, compacto e rápido para análise.",
      "Dataplex cataloga, mede qualidade e mostra de onde cada dado vem.",
      "Tabela nativa do BigQuery é mais rápida que ler arquivos soltos."
    ],
    paraQueServe: "Você usa isso quando a empresa guarda muitos arquivos no Cloud Storage e quer consultá-los com SQL, protegê-los e saber o que existe."
  },
  glossario: [
    { t: "Data lake", d: "Lugar onde dados ficam em formato bruto ou aberto, como arquivos, por pouco custo." },
    { t: "Lakehouse", d: "Ideia de unir o baixo custo do lake com as regras e a segurança de um data warehouse." },
    { t: "Parquet", d: "Formato de arquivo em colunas, compacto, que guarda o esquema junto e é ótimo para análise." },
    { t: "Tabela externa (external table)", d: "Tabela do BigQuery que lê arquivos que continuam no Cloud Storage, sem copiá-los." },
    { t: "BigLake", d: "Tabela que lê arquivos no Cloud Storage e permite segurança por linha e coluna." },
    { t: "Conexão (connection)", d: "Ligação do BigQuery com outro serviço, com uma conta de serviço própria que lê os arquivos no lugar do usuário." },
    { t: "Dataplex Universal Catalog", d: "Plataforma de catálogo e governança: descoberta, qualidade e linhagem. Os menus podem mostrar Knowledge Catalog." },
    { t: "Metadados (metadata)", d: "Dados sobre os dados: nome, dono, colunas, descrição e quando foram atualizados." },
    { t: "Linhagem (lineage)", d: "Mapa de onde um dado veio e por quais transformações passou." },
    { t: "Data profiling", d: "Análise automática que descreve cada coluna: nulos, valores distintos e faixas." }
  ],
  checagem: [
    "Sem olhar: o que torna um data lake um pântano e como Dataplex e BigLake ajudam?",
    "Qual a diferença entre tabela externa, tabela BigLake e tabela nativa?",
    "Por que preferir Parquet a CSV para dados de análise?",
    "O que o Dataplex faz que o IAM sozinho não faz?"
  ],
  facil: [
    "Traduzindo: o lake guarda arquivos baratos no Cloud Storage. Para não virar bagunça, você acrescenta segurança e um catálogo.",
    "Traduzindo: externa só aponta para os arquivos. BigLake acrescenta segurança por linha e coluna. Nativa copia o dado e é a mais rápida.",
    "Traduzindo: prefira formatos em colunas, como Parquet, e pastas organizadas por data. Evite milhões de arquivos minúsculos.",
    "Traduzindo: o Dataplex descobre os dados, descreve, mede a qualidade e mostra de onde vêm. Ele ajuda a governar, mas não é o banco de dados.",
    "Traduzindo: cada serviço vizinho tem sua tarefa. Dataplex descreve e governa, e outras ferramentas protegem, transformam e executam.",
    "Traduzindo: controle custo com formato bom, partição e classes de armazenamento, e escolha o motor certo para cada tipo de processamento."
  ],
  lab: {
    antes: "Antes de começar, tenha o projeto de estudo com billing e abra o Cloud Shell. Este lab usa vários serviços ao mesmo tempo: bucket no Cloud Storage, conexão do BigQuery e Dataplex. Os comandos usam variáveis como P e B; não feche o Cloud Shell no meio do lab, senão elas se perdem. Na etapa da conexão, o comando bq show mostra um campo serviceAccountId. Copie esse valor e use no lugar de SERVICE_ACCOUNT_ID no passo seguinte. No console, procure Knowledge Catalog (antes Dataplex Universal Catalog) pela busca no topo e abra Data profiling and quality para criar o scan. Ao final, apague tudo, porque bucket e scans podem gerar custo.",
    erros: [
      { s: "The requested bucket name is not available (409)", c: "O nome de bucket é único no mundo todo e outra pessoa já o usa.", r: "Escolha outro nome, por exemplo acrescentando suas iniciais e um número, e atualize a variável B antes de repetir." },
      { s: "Permission bigquery.connections.create denied ou Access Denied na criação da conexão", c: "Faltam papéis para criar conexões ou a API de conexões não está ativa.", r: "Ative bigqueryconnection.googleapis.com e, em projeto que não seja seu, peça o papel BigQuery Connection Admin." },
      { s: "Not found: Connection ... in location US", c: "A conexão foi criada em uma localização diferente da do dataset, ou o ID da conexão está errado.", r: "Crie a conexão com --location=US, igual ao dataset e ao bucket, e confira com bq ls --connection --location=US." },
      { s: "Access Denied: ... does not have storage.objects.get access", c: "A conta de serviço da conexão ainda não tem permissão de leitura no bucket, ou você não trocou o SERVICE_ACCOUNT_ID.", r: "Rode o add-iam-policy-binding com o serviceAccountId real, no papel Storage Object Viewer, espere um a dois minutos e consulte de novo." },
      { s: "API has not been used in project ... dataplex.googleapis.com", c: "A API do Dataplex ainda não foi ativada.", r: "Rode gcloud services enable dataplex.googleapis.com, espere um pouco e abra a tela do catálogo de novo." }
    ],
    tempo: "40 a 55 minutos"
  }
});

/* ---------- DIA 6 ---------- */
camada(6, {
  simples: {
    analogia: "Pense em um prédio com informações valiosas. A segurança não é só uma porta trancada: é uma pilha de camadas. Na portaria, o crachá decide quem entra e em quais andares. É o IAM. As regras do condomínio proíbem certas coisas para todos, como levar objetos para fora ou fazer obras sem aviso. São as políticas da organização. Um muro em volta do prédio inteiro impede que algo saia, mesmo nas mãos de quem tem crachá válido. É o VPC Service Controls. Dentro, o cofre guarda os documentos mais sensíveis e a chave fica com você, no Cloud KMS. E nas salas, cada pessoa só vê as pastas que lhe cabem. Se uma camada falhar, as outras continuam protegendo. O limite da analogia: no Google Cloud, os documentos já vêm trancados por padrão, sem você pedir.",
    pontos: [
      "Segurança é uma pilha de camadas, e não um único controle.",
      "Princípio do menor privilégio: o mínimo de acesso, pelo menor tempo.",
      "Conta de serviço é para programas, e chaves baixadas são um risco.",
      "VPC Service Controls impede que dados saiam, mesmo com credencial válida.",
      "O Google criptografa tudo por padrão. Chave própria é para quem exige controle.",
      "No BigQuery dá para limitar linhas e colunas por grupo."
    ],
    paraQueServe: "Você usa isso quando precisa dar acesso aos dados só a quem deve, cumprir exigências de segurança da empresa e proteger informações sensíveis."
  },
  glossario: [
    { t: "IAM", d: "Sistema que define quem pode fazer o quê em cada recurso do Google Cloud." },
    { t: "Papel (role)", d: "Pacote de permissões. Pode ser básico, predefinido ou customizado." },
    { t: "Conta de serviço (service account)", d: "Identidade para programas. Pode receber papéis como qualquer usuário." },
    { t: "Menor privilégio (least privilege)", d: "Princípio de dar só o acesso necessário, no escopo e no tempo certos." },
    { t: "Política da organização (organization policy)", d: "Regra de restrição aplicada a toda a organização ou parte dela, como limitar em quais regiões criar recursos." },
    { t: "VPC Service Controls", d: "Perímetro em volta de projetos e serviços que bloqueia a saída de dados mesmo por quem tem acesso." },
    { t: "Exfiltração de dados", d: "Cópia ou saída indevida de dados para fora do ambiente permitido." },
    { t: "Cloud KMS", d: "Serviço que cria e guarda chaves de criptografia." },
    { t: "CMEK (Customer-Managed Encryption Keys)", d: "Chave de criptografia criada e controlada por você no Cloud KMS e usada pelos serviços do Google." },
    { t: "Policy tag", d: "Etiqueta que protege uma coluna do BigQuery: só quem tem a permissão certa lê o valor." }
  ],
  checagem: [
    "Sem olhar: cite as camadas de segurança em ordem e o que cada uma responde.",
    "Por que evitar chaves JSON de conta de serviço e quais são as alternativas?",
    "O que o VPC Service Controls faz que o IAM sozinho não faz?",
    "Quando usar CMEK em vez da criptografia padrão do Google?"
  ],
  facil: [
    "Traduzindo: segurança são camadas, cada uma com uma pergunta: quem acessa, o que é proibido, para onde os dados podem ir e quem guarda as chaves.",
    "Traduzindo: o papel é o pacote de acessos que você dá a alguém num recurso. Quanto mais baixo o escopo e mais específico o papel, melhor.",
    "Traduzindo: conta de serviço é o crachá de um programa. Evite chaves baixadas e prefira anexar a conta ao recurso ou usar credenciais temporárias.",
    "Traduzindo: política da organização proíbe configurações. O VPC Service Controls impede dados de saírem do perímetro, mesmo com acesso válido.",
    "Traduzindo: tudo já vem criptografado. Se a empresa exige controlar as chaves, use CMEK. Em casos mais rígidos, existem outras opções.",
    "Traduzindo: dentro do BigQuery, dá para mostrar só um recorte de linhas ou colunas a cada grupo, sem copiar tabelas.",
    "Traduzindo: separe desenvolvimento e produção em projetos diferentes, use dados de teste e controle o local onde os dados ficam."
  ]
});

})(typeof window !== 'undefined' ? window : globalThis);
