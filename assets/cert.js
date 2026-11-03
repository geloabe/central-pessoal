/* Plano da certificação Google Cloud Professional Data Engineer (guia oficial v4.2).
   Funções puras (sem DOM nem rede), testáveis no Node. Dados do usuário (documento cert/main):
   { inicio:'AAAA-MM-DD', prova:'AAAA-MM-DD', feitas:{'4-1':'AAAA-MM-DD'}, topicos:{'1.1':0..3},
     simulados:[{id,data,tipo:'completo'|'parcial',acertos,total,fraca:1..5|null}], aprovada:false } */
(function (root) {
  'use strict';
  var DIA = 864e5;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }
  function dias(a, b) { return Math.round((parse(iso(b)) - parse(iso(a))) / DIA); }

  /* Pesos oficiais das seções do exame (guia v4.2) */
  var SECOES = [
    { id: 1, nome: 'Projetar sistemas de processamento', peso: 22 },
    { id: 2, nome: 'Ingerir e processar os dados', peso: 25 },
    { id: 3, nome: 'Armazenar os dados', peso: 20 },
    { id: 4, nome: 'Preparar e usar dados para análise', peso: 15 },
    { id: 5, nome: 'Manter e automatizar as cargas de dados', peso: 18 }
  ];

  /* 19 tópicos do guia; "d" = dias do plano que cobrem o tópico */
  var TOPICOS = [
    { id: '1.1', s: 1, nome: 'Segurança e conformidade: IAM, criptografia e chaves, privacidade/PII, soberania regional, governança de projeto e dataset, dev × produção', d: [6, 15, 24] },
    { id: '1.2', s: 1, nome: 'Confiabilidade e fidelidade: limpeza, orquestração, recuperação de desastre, ACID × disponibilidade, validação de dados', d: [16] },
    { id: '1.3', s: 1, nome: 'Flexibilidade e portabilidade: requisitos de negócio, multicloud, staging, catálogo, profiling e descoberta', d: [5, 15] },
    { id: '1.4', s: 1, nome: 'Migrações: plano e validação (BigQuery DTS, DMS, Transfer Appliance, rede, Datastream)', d: [11] },
    { id: '2.1', s: 2, nome: 'Planejar pipelines: fontes e destinos, lógica de transformação e orquestração, rede, criptografia', d: [8, 22, 24] },
    { id: '2.2', s: 2, nome: 'Construir pipelines: Dataflow/Beam, Dataproc, Data Fusion, Pub/Sub, Spark, Kafka; batch, streaming, janelas, dados atrasados, enriquecimento com IA', d: [8, 9, 10, 11] },
    { id: '2.3', s: 2, nome: 'Operacionalizar pipelines: Cloud Composer, Workflows, CI/CD', d: [13] },
    { id: '3.1', s: 3, nome: 'Selecionar armazenamento: BigQuery, BigLake, AlloyDB, Bigtable, Spanner, Cloud SQL, Cloud Storage, Firestore, Memorystore; custo e ciclo de vida', d: [4] },
    { id: '3.2', s: 3, nome: 'Data warehouse: modelagem, grau de normalização, padrões de acesso', d: [2, 3] },
    { id: '3.3', s: 3, nome: 'Data lake: descoberta, acesso, controle de custo, processamento e monitoramento', d: [5] },
    { id: '3.4', s: 3, nome: 'Plataforma de dados: Dataplex, catálogo, governança federada', d: [5, 15] },
    { id: '4.1', s: 4, nome: 'Preparar para visualização: BI Engine, materialized views, consultas lentas, mascaramento e DLP', d: [3, 17] },
    { id: '4.2', s: 4, nome: 'Preparar para IA e ML: BigQuery ML, features, embeddings e RAG', d: [18] },
    { id: '4.3', s: 4, nome: 'Compartilhar dados: regras, publicação, Analytics Hub', d: [17] },
    { id: '5.1', s: 5, nome: 'Otimizar recursos: custo por necessidade, clusters persistentes × por job', d: [19] },
    { id: '5.2', s: 5, nome: 'Automação e repetibilidade: DAGs do Composer, agendamento', d: [13] },
    { id: '5.3', s: 5, nome: 'Organizar cargas: BigQuery Editions e reservas, interativo × batch', d: [19] },
    { id: '5.4', s: 5, nome: 'Monitorar e resolver problemas: Monitoring, Logging, cotas, billing, reservas', d: [20] },
    { id: '5.5', s: 5, nome: 'Falhas e mitigação: tolerância, multirregião, dados corrompidos ou faltando, replicação e failover', d: [16, 20] }
  ];


  /* Foco de estudo por tópico: junta o peso OFICIAL da seção com o que relatos de candidatos reforçam (complemento). alto, medio ou base. */
  var FOCO = {
    '1.1': ['alto', 'Seção de 22% da prova; segurança, IAM e menor privilégio reaparecem em quase todo cenário.'],
    '1.2': ['medio', 'Confiabilidade, DR e validação aparecem em cenários de resiliência.'],
    '1.3': ['base', 'Conceitual; costuma entrar como pano de fundo de outras questões.'],
    '1.4': ['medio', 'Datastream, DMS e opções de transferência são citados por candidatos.'],
    '2.1': ['medio', 'Inclui fundamentos de rede e criptografia, que ganharam uma aula no dia 24.'],
    '2.2': ['alto', 'A maior seção (25%). Streaming em Dataflow (janelas, watermark, exactly-once) é apontado como o ponto mais difícil.'],
    '2.3': ['medio', 'Composer x Workflows x Scheduler x Dataform aparecem como pares de decisão.'],
    '3.1': ['alto', 'Escolha de armazenamento é um dos temas mais repetidos; o evento oficial do Google recomenda estudar os fluxogramas.'],
    '3.2': ['alto', 'BigQuery aparece em quase todas as seções: partição, clustering, custo e modelagem.'],
    '3.3': ['medio', 'Lake e BigLake: tema crescente, com peso incerto.'],
    '3.4': ['medio', 'Dataplex e governança federada: tema crescente nos relatos.'],
    '4.1': ['alto', 'Materialized views, BI Engine e consultas lentas aparecem nos relatos e em simulados.'],
    '4.2': ['base', 'Relatos recentes descrevem ML como básico. O guia inclui BigQuery ML, embeddings e RAG: estude o essencial.'],
    '4.3': ['medio', 'Compartilhar sem copiar (authorized views, Analytics Hub) aparece em simulados atuais.'],
    '5.1': ['medio', 'Custo por necessidade: Spot, FlexRS, clusters efêmeros.'],
    '5.2': ['medio', 'DAGs e repetibilidade.'],
    '5.3': ['medio', 'Editions, reservas e slots entram em perguntas de custo.'],
    '5.4': ['base', 'Observabilidade; entra mais como parte de cenários de falha.'],
    '5.5': ['medio', 'Falhas, multirregião e replicação (turbo replication foi citada por um candidato).']
  };
  TOPICOS.forEach(function (t) { var f = FOCO[t.id] || ['medio', '']; t.foco = f[0]; t.por = f[1]; });

  /* Relatos de candidatos por dia do plano (COMPLEMENTO: o guia oficial e a documentação prevalecem) */
  var RELATOS_DIA = {
    1: ['Candidatos descrevem a prova como de decisão, e não de definição: todas as alternativas parecem possíveis e só uma cumpre todos os requisitos.'],
    2: ['O BigQuery aparece em quase todas as seções nos relatos. Em simulados atuais é comum escolher partição por data e cluster pelas colunas filtradas.'],
    3: ['Relatos citam materialized views e BI Engine em questões da seção 4.'],
    4: ['A escolha de armazenamento (Bigtable, Spanner, BigQuery, Cloud SQL) é um dos temas mais repetidos. O evento oficial do Google (2023) recomenda estudar os fluxogramas de decisão. Hotspot de chave aparece em simulados.'],
    5: ['Dataplex, BigLake e Analytics Hub aparecem como temas crescentes, com peso incerto. Um comentário no fórum oficial relata reprovação por não ter estudado Dataplex e BigQuery Omni.'],
    6: ['Segundo o evento oficial do Google (2023), hierarquia de recursos, herança de permissões e menor privilégio reaparecem sempre.'],
    8: ['Pub/Sub + Dataflow + BigQuery é o padrão de streaming mais citado. Seek/replay e exactly-once em assinatura pull aparecem em questões de prática atuais.'],
    9: ['Escolher entre Dataflow, Dataproc e outras ferramentas é tema recorrente. A regra de desempate relatada: o serviço gerenciado com menor sobrecarga operacional.'],
    10: ['Vários candidatos apontam janelas, watermark, dado atrasado e exactly-once como o ponto mais difícil da prova.'],
    11: ['Datastream (CDC) e as opções de transferência (Transfer Appliance, Storage Transfer Service) são citados por candidatos.'],
    13: ['Composer x Workflows x Cloud Functions x Scheduler, e Dataform (assertions, SQL como código), aparecem como pares de decisão nos relatos.'],
    15: ['Em simulados atuais, policy tags, DLP e CMEK aparecem em cenários de governança. Armadilha frequente: ativar o enforcement da taxonomia e remover o papel Fine-Grained Reader herdado.'],
    16: ['Um candidato de 2025 relatou 2 a 3 questões sobre turbo replication do Cloud Storage. RPO e failover aparecem em cenários de resiliência.'],
    17: ['Questões sobre compartilhar sem copiar (authorized views, Analytics Hub) aparecem em simulados atuais.'],
    18: ['Candidatos de 2025 e 2026 descrevem ML como mínimo e básico, e nenhum relatou questões de IA generativa. O guia v4.2 inclui BigQuery ML, embeddings e RAG, então estude o essencial sem exagerar.'],
    19: ['Escolher entre sob demanda e capacidade (Editions) aparece em simulados atuais. O nome "flat-rate" é antigo.'],
    22: ['O Google orienta: ler o objetivo da pergunta, eliminar o que viola algum requisito e preferir o serviço gerenciado.'],
    24: ['Um candidato de 2025 relatou várias questões de rede (sub-redes, balanceador de carga). O guia oficial lista fundamentos de rede no tópico 2.1.']
  };

  var TIPOS = { estudo: 'Estudo', lab: 'Lab', cartoes: 'Cartões', quiz: 'Questões', simulado: 'Simulado', revisao: 'Revisão', prova: 'Prova' };

  /* Plano: t=título, s=seções, o=objetivo, d=dica, k=tarefas [tipo, minutos, texto]. O dia 29 é a prova. */
  var PLANO = [
    // ---------- Semana 1: base, BigQuery e armazenamento ----------
    { t: 'Orientação e diagnóstico', s: [1, 2, 3, 4, 5],
      o: 'Saber de onde você parte e deixar a prova marcada.',
      d: 'A prova é só em inglês (ou japonês). Estude os termos em inglês desde o início.',
      k: [['estudo', 25, 'Ler o guia oficial v4.2 inteiro (5 seções, 19 tópicos). Na aba Tópicos, dar uma nota de 0 a 3 para cada um, com honestidade.'],
          ['quiz', 30, 'Fazer as questões de exemplo oficiais sem consultar nada. Anotar o que errou e por quê.'],
          ['lab', 20, 'Abrir um projeto no Google Cloud (nível gratuito ou crédito), ativar BigQuery e Cloud Storage e rodar uma consulta num dataset público.'],
          ['estudo', 15, 'Decidir a data da prova: dá para marcar já ou esperar o resultado do simulado 2 (dia 25). Antes de pagar, confira no certmetrics as regras de reagendamento e cancelamento e se o seu documento de identidade serve.']] },
    { t: 'BigQuery I: arquitetura, carga e particionamento', s: [3],
      o: 'Entender como o BigQuery armazena, cobra e carrega dados.',
      d: 'LIMIT não reduz o custo. O que reduz é filtrar por partição e escolher poucas colunas. O dry run mostra os bytes antes de rodar.',
      k: [['estudo', 40, 'Armazenamento colunar separado da computação (slots), datasets e regiões; carga em lote (grátis) × streaming × Storage Write API (exactly-once).'],
          ['estudo', 30, 'Partição (por tempo, ingestão ou intervalo inteiro) × cluster (até 4 colunas): quando usar cada um; exigir filtro de partição; expiração de partição e de tabela.'],
          ['lab', 30, 'Criar tabela particionada e clusterizada a partir de um dataset público e comparar os bytes processados (dry run) com e sem filtro de partição.']] },
    { t: 'BigQuery II: modelagem e desempenho', s: [3, 4],
      o: 'Modelar para consulta rápida e barata e diagnosticar consultas lentas.',
      d: 'Desnormalizar com STRUCT e ARRAY costuma vencer JOINs enormes. Normalizar só dimensões que mudam muito.',
      k: [['estudo', 35, 'Modelagem: estrela × tabela larga, campos aninhados e repetidos, SCD, quando normalizar.'],
          ['estudo', 35, 'Desempenho: plano de execução, shuffle, skew, ordem dos joins, APPROX_*, materialized views, BI Engine, search index e cache de resultado.'],
          ['lab', 30, 'Reescrever uma consulta lenta e comparar tempo e bytes. Criar uma materialized view e ver o ganho.']] },
    { t: 'Escolha de armazenamento (dia longo)', s: [3],
      o: 'Escolher o serviço certo só pelos requisitos. Isso é cobrado em muitas questões.',
      d: 'Bigtable: row key sem timestamp crescente no início, senão vira hotspot. Spanner: relacional global com consistência forte.',
      k: [['estudo', 60, 'Bigtable (row key, hotspot, SSD × HDD, replicação), Spanner, Cloud SQL, AlloyDB, Firestore, Memorystore, Cloud Storage (classes, lifecycle, Autoclass, dual e multi-region).'],
          ['cartoes', 30, 'Montar uma árvore de decisão de 1 página: transacional × analítico, escala, latência, consistência, SQL, alcance global.'],
          ['estudo', 40, 'Custo e ciclo de vida: Standard, Nearline (30 d), Coldline (90 d), Archive (365 d); armazenamento de longo prazo do BigQuery; expiração; exportar dado frio para o GCS.'],
          ['quiz', 50, '20 questões só de seleção de armazenamento. Cada erro vira um cartão.']] },
    { t: 'Data lake, BigLake e Dataplex (dia longo)', s: [1, 3],
      o: 'Montar um lakehouse e entender a governança sobre ele.',
      d: 'BigLake dá segurança por linha e coluna sobre arquivos abertos (Parquet, ORC, Iceberg, Delta) no Cloud Storage.',
      k: [['estudo', 45, 'BigLake: tabelas externas × nativas × BigLake, formatos abertos, segurança fina, multicloud.'],
          ['estudo', 45, 'Dataplex: catálogo, lakes e zones, qualidade e profiling, linhagem, governança federada (data mesh). O Data Catalog antigo virou Dataplex Catalog.'],
          ['lab', 60, 'Lakehouse: arquivos Parquet no Cloud Storage, tabela BigLake, consulta no BigQuery; registrar no catálogo e rodar um perfil de dados.']] },
    { t: 'Segurança I: IAM, chaves e BigQuery', s: [1],
      o: 'Dominar os controles de acesso e criptografia mais cobrados.',
      d: 'Conta de serviço: prefira impersonation e identidade da carga em vez de chaves JSON.',
      k: [['estudo', 40, 'IAM: papéis básicos × predefinidos × customizados, menor privilégio, contas de serviço, organization policies, VPC Service Controls (perímetro contra exfiltração).'],
          ['estudo', 30, 'Criptografia: padrão do Google × CMEK (Cloud KMS) × CSEK (só Cloud Storage e Compute Engine) × EKM; rotação de chaves; criptografia por envelope.'],
          ['cartoes', 20, 'Segurança no BigQuery: IAM em dataset e tabela, authorized views, datasets e rotinas, row-level, column-level (policy tags) e mascaramento dinâmico.']] },
    { t: 'Revisão da semana 1', s: [1, 3],
      o: 'Consolidar e medir o que ficou.',
      d: 'Errar aqui é barato. Errar na prova não é.',
      k: [['cartoes', 20, 'Revisar todos os cartões criados na semana.'],
          ['quiz', 30, 'Mini-simulado de 20 questões (armazenamento e BigQuery). Corrigir entendendo o porquê de cada alternativa.'],
          ['revisao', 10, 'Atualizar as notas na aba Tópicos.']] },
    // ---------- Semana 2: ingestão e processamento ----------
    { t: 'Pub/Sub', s: [2],
      o: 'Dominar o modelo de mensageria do Google Cloud.',
      d: 'Por padrão a entrega é at-least-once. Exactly-once está disponível em assinaturas pull. Para duplicatas, pense em idempotência.',
      k: [['estudo', 45, 'Tópico e assinatura; pull × push × BigQuery × Cloud Storage; at-least-once e exactly-once; ordering keys; ack deadline; dead-letter e retry; retenção e replay (seek); schemas Avro e Protobuf.'],
          ['estudo', 25, 'Padrões: fan-out, absorver picos, desacoplar. Pub/Sub × Managed Service for Apache Kafka × Cloud Tasks.'],
          ['lab', 30, 'Criar tópico e assinatura para BigQuery, publicar com gcloud, ver na tabela e forçar uma falha para cair na dead-letter.']] },
    { t: 'Dataflow e Apache Beam I', s: [2],
      o: 'Entender o modelo do Beam e quando escolher Dataflow.',
      d: 'Para pipeline novo, serverless e streaming, Dataflow. Para reaproveitar Spark ou Hadoop existente, Dataproc.',
      k: [['estudo', 50, 'Beam: Pipeline, PCollection, ParDo, GroupByKey, Combine, side inputs; Dataflow: autoscaling, Streaming Engine, Shuffle, FlexRS (batch barato), Flex Templates e templates do Google.'],
          ['estudo', 30, 'Dataflow × Dataproc × SQL do BigQuery × Data Fusion; operar: update, drain, cancel, snapshots.'],
          ['lab', 30, 'Rodar um template do Google (Pub/Sub para BigQuery ou Texto para BigQuery) e olhar o grafo e as métricas.']] },
    { t: 'Beam II: streaming, janelas e dados atrasados', s: [2],
      o: 'Resolver qualquer questão de janela, watermark e dado atrasado.',
      d: 'Tempo de evento ≠ tempo de processamento. Watermark estima até onde o tempo de evento chegou. Gatilho decide quando emitir.',
      k: [['estudo', 50, 'Janelas: fixed, sliding, session e global; watermark; gatilhos (early, on-time, late); lateness permitido; modo de acumulação.'],
          ['estudo', 30, 'Exatidão: exactly-once no Dataflow, sinks idempotentes, deduplicação, reprocesso e backfill.'],
          ['lab', 30, 'Pipeline em Python com janela fixa de 1 min contando eventos do Pub/Sub e gravando no BigQuery; enviar eventos atrasados e ver o efeito.']] },
    { t: 'Dataproc, Data Fusion e migração (dia longo)', s: [1, 2],
      o: 'Cobrir o restante da ingestão e as ferramentas de migração.',
      d: 'Volume enorme e rede lenta: Transfer Appliance (offline). Replicar banco continuamente: Datastream (CDC).',
      k: [['estudo', 45, 'Dataproc: Spark, Hadoop e Hive; cluster efêmero por job com dados no GCS; autoscaling; workers Spot; Serverless for Apache Spark; Metastore.'],
          ['estudo', 30, 'Data Fusion (ETL visual, roda em Dataproc) e Kafka no Google Cloud.'],
          ['estudo', 45, 'Migração e transferência: BigQuery Data Transfer Service, Storage Transfer Service, Transfer Appliance, Datastream, Database Migration Service, rede (VPN, Interconnect, Private Google Access).'],
          ['quiz', 60, '25 questões da seção 2 (ingestão e processamento).']] },
    { t: 'Simulado 1 (diagnóstico, dia longo)', s: [1, 2, 3, 4, 5],
      o: 'Medir onde você está, em condições reais.',
      d: 'Aqui ainda falta metade do conteúdo. Uma nota de 50% a 60% é normal e útil.',
      k: [['simulado', 120, 'Simulado completo: 50 questões em 2 h, em inglês, sem pausas e sem consultar. Registrar na aba Simulados.'],
          ['revisao', 60, 'Para cada erro, escrever por que a certa é certa e por que as outras erram. Criar cartões e marcar a seção mais fraca.']] },
    { t: 'Orquestração e CI/CD', s: [2, 5],
      o: 'Saber escolher entre Composer, Workflows, Scheduler e Dataform.',
      d: 'Dependências complexas entre várias tarefas: Composer. Chamar poucos serviços em sequência: Workflows. Só disparar no horário: Scheduler.',
      k: [['estudo', 40, 'Cloud Composer (Airflow gerenciado): DAG, operadores, sensores, retries, backfill; Composer 2 e 3; Cloud Scheduler; Workflows; Dataform (SQLX, dependências, assertions); consultas agendadas.'],
          ['estudo', 25, 'CI/CD para dados: Git, Cloud Build, deploy de DAGs e templates, Terraform, ambientes dev e prod, teste de pipeline.'],
          ['lab', 25, 'Escrever um DAG simples (consulta no BigQuery e exportação para o GCS) e validar a sintaxe; rodar no Composer só se houver crédito.']] },
    { t: 'Revisão da semana 2', s: [2],
      o: 'Fixar ingestão e processamento.',
      d: 'Se janelas e watermark ainda confundem, volte ao dia 10 antes de seguir.',
      k: [['cartoes', 20, 'Revisar cartões da semana.'],
          ['quiz', 30, 'Mini-simulado de 20 questões (pipelines, Pub/Sub, Dataflow, orquestração).'],
          ['revisao', 10, 'Atualizar as notas na aba Tópicos.']] },
    // ---------- Semana 3: governança, confiabilidade, análise e operação ----------
    { t: 'Privacidade, residência e governança', s: [1, 3],
      o: 'Dominar proteção de dados sensíveis e conformidade.',
      d: 'Dado sensível dentro do BigQuery: policy tags e mascaramento. Detectar e anonimizar: Sensitive Data Protection (DLP).',
      k: [['estudo', 40, 'Cloud DLP (Sensitive Data Protection): inspeção, mascaramento, tokenização (determinística, FPE), re-identificação; PII no BigQuery.'],
          ['estudo', 30, 'Residência e soberania: regiões × multirregião, organization policy de locais, VPC Service Controls, audit logs (Admin Activity sempre ligado; Data Access configurável).'],
          ['estudo', 30, 'Governança de projeto, dataset e tabela; dev × produção; Dataplex Catalog, linhagem e perfil de dados.']] },
    { t: 'Confiabilidade, DR e ACID', s: [1, 5],
      o: 'Escolher a estratégia certa de recuperação e consistência.',
      d: 'Defina primeiro RPO e RTO. Depois escolha: multirregião, réplica, snapshot ou backup.',
      k: [['estudo', 45, 'Recuperação de desastre: RPO e RTO; BigQuery (multirregião, replicação entre regiões, time travel de 7 dias, fail-safe, snapshots), Cloud Storage dual-region, Spanner multirregião, replicação do Bigtable, Cloud SQL HA e réplica entre regiões.'],
          ['estudo', 30, 'ACID e disponibilidade: Spanner, Cloud SQL e AlloyDB são ACID; Bigtable é atômico por linha; transações multi-statement no BigQuery.'],
          ['estudo', 25, 'Validação e qualidade: assertions do Dataform, qualidade do Dataplex, dead-letter no Dataflow.']] },
    { t: 'BI, desempenho e compartilhamento', s: [4],
      o: 'Servir dados com rapidez e compartilhá-los com segurança.',
      d: 'Compartilhar sem copiar: authorized view ou Analytics Hub. Dashboard lento: BI Engine e materialized view.',
      k: [['estudo', 40, 'Looker e Looker Studio sobre o BigQuery: BI Engine, materialized views, campos pré-calculados, partição para dashboards, cache, diagnóstico por INFORMATION_SCHEMA.'],
          ['estudo', 30, 'Compartilhar: Analytics Hub (exchanges e listings), authorized views e datasets, datasets públicos, exportação.'],
          ['lab', 30, 'Criar uma authorized view e testar o acesso com outra conta; ler o fluxo de uma listagem do Analytics Hub.']] },
    { t: 'IA e ML nos dados (dia longo)', s: [4],
      o: 'Cobrir BigQuery ML, embeddings e RAG, que entraram no guia v4.2.',
      d: 'Embeddings + VECTOR_SEARCH no BigQuery resolvem busca semântica e RAG sem sair do warehouse.',
      k: [['estudo', 50, 'BigQuery ML: CREATE MODEL (linear, logística, k-means, boosted trees, DNN, ARIMA_PLUS, matrix factorization), TRANSFORM, ML.EVALUATE e ML.PREDICT, modelos remotos e importados.'],
          ['estudo', 40, 'Dados para ML: features em SQL, divisão treino e teste, desbalanceamento, vazamento; Vertex AI (Feature Store, pipelines) em visão geral.'],
          ['estudo', 40, 'IA generativa: ML.GENERATE_EMBEDDING, VECTOR_SEARCH, índice vetorial, RAG com dados não estruturados, LLM para gerar SQL e seus riscos (revisar e controlar permissões).'],
          ['lab', 50, 'Treinar um classificador no BigQuery ML com dataset público e avaliar; gerar embeddings de texto e fazer busca vetorial.']] },
    { t: 'Custos e capacidade (dia longo)', s: [5],
      o: 'Decidir entre sob demanda e reservas e cortar custo sem perder desempenho.',
      d: 'Carga previsível e constante: reservas (Editions). Carga esporádica: sob demanda. Batch tolerante a atraso: FlexRS.',
      k: [['estudo', 50, 'BigQuery Editions (Standard, Enterprise, Enterprise Plus), reservas, slots com autoscaling, commitments; sob demanda × Editions; armazenamento lógico × físico; interativo × batch.'],
          ['estudo', 40, 'Otimizar custo: partição e cluster, expirar dados, evitar SELECT *, cotas customizadas, budgets e alertas de billing; Dataproc persistente × por job; FlexRS.'],
          ['lab', 50, 'Consultar INFORMATION_SCHEMA.JOBS e JOBS_TIMELINE para achar as consultas mais caras e criar um orçamento com alerta.'],
          ['quiz', 40, '20 questões da seção 5.']] },
    { t: 'Observabilidade e falhas', s: [5],
      o: 'Saber o que monitorar e como reagir.',
      d: 'Dataflow: system lag e data freshness. Pub/Sub: idade da mensagem mais antiga sem ack. Composer: falha de DAG.',
      k: [['estudo', 40, 'Cloud Monitoring e Logging: métricas-chave, alertas, log sinks para o BigQuery.'],
          ['estudo', 30, 'Troubleshooting: quota exceeded, resources exceeded, schema mismatch, hot key, 429 e 503 com retry e backoff; surpresas de billing.'],
          ['cartoes', 20, 'Falhas: restart e idempotência, múltiplas zonas e regiões, dado corrompido ou faltando (reprocessar, dead-letter).']] },
    { t: 'Revisão da semana 3 e lacunas', s: [1, 4, 5],
      o: 'Descobrir os 3 tópicos mais fracos para atacar na semana 4.',
      d: 'Seja duro nas notas: nota 3 só se conseguir explicar para outra pessoa.',
      k: [['cartoes', 20, 'Revisar cartões da semana.'],
          ['quiz', 30, 'Mini-simulado de 20 questões (seções 1 e 4).'],
          ['revisao', 10, 'Atualizar notas na aba Tópicos e escolher os 3 mais fracos para o dia 24.']] },
    // ---------- Semana 4: cenários, simulados e véspera ----------
    { t: 'Cenários de arquitetura I', s: [1, 2, 3],
      o: 'Treinar o formato real: um cenário e a melhor combinação de serviços.',
      d: 'Leia primeiro a última frase da questão (o que ela pede) e depois o cenário.',
      k: [['quiz', 60, '25 cenários do tipo escolha a melhor arquitetura. Para cada um, justificar em voz alta.'],
          ['estudo', 40, 'Matriz de decisão: ingestão × processamento × armazenamento × entrega. Revisar a aba Cola.']] },
    { t: 'Cenários II e pegadinhas de enunciado', s: [1, 2, 3, 4, 5],
      o: 'Reconhecer as palavras que decidem a resposta.',
      d: 'Cost-effective, least operational overhead, serverless, minimize latency, no code changes: cada uma aponta para uma família de serviços.',
      k: [['estudo', 40, 'Padrões de enunciado e o que cada um indica (ver Cola, Palavras-chave).'],
          ['quiz', 60, '30 questões mistas cronometradas, com 2 minutos por questão.']] },
    { t: 'Rede, segurança em cenários e pontos fracos', s: [1, 2, 5],
      o: 'Cobrir o tópico de rede do guia (2.1) e fechar os buracos que ainda doem.',
      d: 'Em rede, pergunte sempre: quem precisa falar com quem, por onde e com que permissão? Um lab rápido fixa mais do que mais uma leitura.',
      k: [['estudo', 40, 'Aula do dia: rede para engenheiros de dados (VPC, firewall, Private Google Access, peering, VPN x Interconnect) e segurança em cenários.'],
          ['quiz', 20, 'Quiz do dia sobre rede e segurança (meta 80%).'],
          ['estudo', 40, 'Reestudo cirúrgico dos 3 tópicos com menor desempenho medido (aba Revisar): documentação, vídeo e um lab rápido para cada.']] },
    { t: 'Simulado 2 (condições reais, dia longo)', s: [1, 2, 3, 4, 5],
      o: 'Ensaio geral: tempo, ambiente e cabeça de prova.',
      d: 'Meta: 80% ou mais. Abaixo de 70%, use o dia 26 inteiro para reforço e adie a prova se precisar.',
      k: [['simulado', 120, 'Simulado completo: 50 questões em 2 h, em inglês, sem pausa e sem consulta. Registrar na aba Simulados.'],
          ['revisao', 60, 'Analisar todos os erros e os acertos por chute. Marcar a seção mais fraca.']] },
    { t: 'Reforço e cola de 1 página (dia longo)', s: [1, 2, 3, 4, 5],
      o: 'Transformar os erros em regras de decisão.',
      d: 'A cola de 1 página é para ler na véspera, não para decorar.',
      k: [['revisao', 60, 'Reestudar os erros do simulado 2 por seção.'],
          ['cartoes', 40, 'Montar a cola de 1 página com as 10 regras de decisão que mais derrubaram você.'],
          ['estudo', 50, 'Reler os comparativos mais cobrados: Bigtable × Spanner × BigQuery, Dataflow × Dataproc, Composer × Workflows × Scheduler.']] },
    { t: 'Simulado 3 parcial e checklist da prova', s: [1, 2, 3, 4, 5],
      o: 'Manter o ritmo sem cansar e deixar o ambiente pronto.',
      d: 'Prova online: teste câmera, microfone, internet e a sala antes. Feche aplicativos e deixe a mesa limpa.',
      k: [['simulado', 60, 'Simulado parcial: 30 questões em 60 min. Registrar na aba Simulados.'],
          ['revisao', 15, 'Checklist técnico: documento de identidade, ambiente, internet, câmera, software de proctoring, horário.']] },
    { t: 'Véspera: descansar', s: [1, 2, 3, 4, 5],
      o: 'Chegar à prova com a cabeça descansada.',
      d: 'Nada de conteúdo novo. Dormir bem rende mais que mais uma hora de estudo.',
      k: [['cartoes', 25, 'Ler a cola de 1 página e os cartões marcados como difíceis.'],
          ['revisao', 15, 'Separar documento, preparar o ambiente e definir o horário de acordar. Dormir pelo menos 7 horas.']] },
    { t: 'Dia da prova', s: [1, 2, 3, 4, 5],
      o: 'Fazer a prova com calma e estratégia.',
      d: 'Cerca de 2,4 minutos por questão (50 em 120). Marque as dúvidas, siga em frente e volte no fim. Elimine alternativas antes de escolher.',
      k: [['prova', 15, 'Acordar cedo, comer leve, conferir o documento e entrar na sala de prova 30 minutos antes.'],
          ['prova', 120, 'Fazer a prova.'],
          ['revisao', 5, 'Registrar o resultado: em Ajustar, marcar Aprovada. Comemorar.']] }
  ];
  // normaliza: número do dia, tempo total e ids das tarefas
  PLANO.forEach(function (d, i) {
    d.n = i + 1; d.min = 0;
    d.tarefas = d.k.map(function (k, j) { d.min += k[1]; return { id: (i + 1) + '-' + j, tipo: k[0], min: k[1], txt: k[2] }; });
  });
  var N_DIAS = PLANO.length, N_TAREFAS = PLANO.reduce(function (a, d) { return a + d.tarefas.length; }, 0);

  /* Cola: regras de decisão mais cobradas */
  var COLA = [
    { t: 'Escolha de armazenamento', i: [
      'Analítico, SQL, petabytes, sem servidor: BigQuery.',
      'Chave e coluna larga, latência de milissegundos, vazão enorme (IoT, séries temporais, adtech): Bigtable. Cuidado com a row key: timestamp crescente no início causa hotspot. Replicação multi-cluster é eventual.',
      'Relacional com consistência forte e escala horizontal global: Spanner.',
      'MySQL, PostgreSQL ou SQL Server gerenciado, escala vertical e réplicas de leitura: Cloud SQL. PostgreSQL de alto desempenho com análise: AlloyDB.',
      'Documentos para apps web e mobile, sincronização em tempo real: Firestore. Cache em memória: Memorystore.',
      'Objetos, arquivos e data lake: Cloud Storage. Classes: Standard, Nearline (mín. 30 dias), Coldline (90) e Archive (365). Lifecycle e Autoclass movem os dados sozinhos.',
      'Tabelas sobre arquivos abertos no GCS, com segurança por linha e coluna: BigLake.'] },
    { t: 'BigQuery', i: [
      'Partição: tempo, ingestão ou intervalo inteiro (até 10.000 partições). Cluster: até 4 colunas, ordem importa. Exigir filtro de partição evita varredura cara.',
      'LIMIT não reduz custo. SELECT * encarece. Dry run mostra os bytes. APPROX_COUNT_DISTINCT é mais barato.',
      'Carga em lote é grátis. Streaming cobra. Storage Write API é a opção moderna e permite exactly-once.',
      'Time travel de 7 dias (configurável de 2 a 7), mais 7 de fail-safe. Snapshots e clones guardam um ponto no tempo. Dado sem alteração por 90 dias vai para armazenamento de longo prazo (mais barato).',
      'Desnormalizar com STRUCT e ARRAY reduz joins. Materialized view acelera agregações repetidas. BI Engine acelera dashboards.',
      'Editions: Standard, Enterprise e Enterprise Plus. Reservas e slots com autoscaling para carga previsível. Sob demanda para carga esporádica.',
      'Segurança: IAM em dataset e tabela; authorized view, dataset e rotina; row-level; column-level por policy tags; mascaramento dinâmico; CMEK.'] },
    { t: 'Pub/Sub e streaming', i: [
      'Entrega at-least-once por padrão. Exactly-once em assinaturas pull. Ordering keys garantem ordem por chave.',
      'Falha repetida de processamento: dead-letter topic com limite de tentativas. Reprocessar: seek (replay) e retenção.',
      'Tipos de assinatura: pull, push, BigQuery e Cloud Storage. Schemas em Avro ou Protobuf.',
      'Janelas: fixed (tumbling), sliding, session (por inatividade) e global. Watermark estima o progresso do tempo de evento. Lateness permitido aceita dado atrasado. Gatilho define quando emitir.',
      'Dataflow: autoscaling, Streaming Engine, FlexRS para batch barato, Flex Templates. Update substitui o job. Drain termina o que já entrou. Cancel descarta.'] },
    { t: 'Processamento: o que usar', i: [
      'Pipeline novo, serverless, batch e streaming: Dataflow (Beam).',
      'Já existe Spark ou Hadoop e quer pouca mudança de código: Dataproc. Prefira cluster efêmero por job com dados no GCS, workers Spot e autoscaling.',
      'ETL visual sem código: Data Fusion.',
      'Transformação em SQL dentro do BigQuery: consultas agendadas ou Dataform (com assertions).',
      'Orquestrar dependências complexas: Cloud Composer (Airflow). Poucos serviços em sequência: Workflows. Só disparar no horário: Cloud Scheduler.'] },
    { t: 'Migração e transferência', i: [
      'Replicar banco continuamente (CDC) para o BigQuery ou o GCS: Datastream.',
      'Migrar banco para Cloud SQL ou AlloyDB: Database Migration Service.',
      'Cargas agendadas de SaaS e de outros warehouses para o BigQuery: BigQuery Data Transfer Service.',
      'Arquivos de S3, Azure ou on-premises para o GCS pela rede: Storage Transfer Service. Volume enorme e rede lenta: Transfer Appliance (offline).',
      'Conectividade: VPN para começar, Interconnect para banda alta e estável, Private Google Access para acessar APIs sem IP público.'] },
    { t: 'Segurança, privacidade e governança', i: [
      'Menor privilégio. Prefira papéis predefinidos; contas de serviço com impersonation em vez de chaves.',
      'Perímetro contra exfiltração de dados: VPC Service Controls. Restringir regiões e outras regras de projeto: organization policies.',
      'Criptografia em repouso é padrão. CMEK usa Cloud KMS (você controla a chave). CSEK existe só em Cloud Storage e Compute Engine.',
      'Achar e anonimizar dado sensível: Sensitive Data Protection (DLP): inspeção, mascaramento, tokenização.',
      'Audit logs: Admin Activity sempre ligado. Data Access é configurável (no BigQuery já fica ligado).',
      'Catálogo, qualidade, perfil e linhagem: Dataplex. Governança federada entre domínios: data mesh com Dataplex.'] },
    { t: 'Confiabilidade e recuperação', i: [
      'Defina RPO (quanto dado pode perder) e RTO (quanto tempo pode ficar fora). Depois escolha a técnica.',
      'Bigtable: replicação com vários clusters (roteamento single-cluster para ler o que escreveu). Spanner multirregião para a maior disponibilidade. Cloud SQL: HA regional mais réplica entre regiões.',
      'Cloud Storage: dual-region ou multi-region para durabilidade e failover.',
      'ACID: Spanner, Cloud SQL e AlloyDB sim. Bigtable só atômico por linha. BigQuery tem transações multi-statement.',
      'Job que falha: torne idempotente, use retry com backoff e dead-letter. Dado corrompido ou faltando: reprocessar a partir da fonte ou de snapshot.'] },
    { t: 'IA e ML', i: [
      'Modelo simples sobre dados do warehouse: BigQuery ML (CREATE MODEL, ML.PREDICT, ML.EVALUATE, TRANSFORM).',
      'Busca semântica e RAG: ML.GENERATE_EMBEDDING, índice vetorial e VECTOR_SEARCH.',
      'Treine e avalie com divisão correta e evite vazamento de dados.',
      'Dado não estruturado (documentos, imagens): extrair e fazer chunking antes de gerar embeddings.'] },
    { t: 'Custos e operação', i: [
      'Carga previsível e constante: reservas. Esporádica: sob demanda. Batch sem pressa: FlexRS, Spot e consultas batch.',
      'Controlar gasto: budgets e alertas, cotas customizadas por projeto e usuário, partição e cluster, expiração de dados.',
      'Dataflow: system lag e data freshness. Pub/Sub: idade da mensagem mais antiga sem ack. Composer: falhas de DAG. BigQuery: INFORMATION_SCHEMA.JOBS e uso de slots.',
      'Erros comuns: quota exceeded, resources exceeded, schema mismatch, hot key. Para 429 e 503, retry com backoff.'] },
    { t: 'Estratégia na hora da prova', i: [
      'Leia primeiro a pergunta final e depois o cenário. Tente prever a resposta antes de olhar as alternativas.',
      'Elimine as alternativas que quebram qualquer requisito do cenário (custo, latência, região, segurança, equipe pequena).',
      'Duas respostas podem parecer certas. Escolha a que cumpre TODOS os requisitos com a menor operação.',
      'Passou de uns 5 minutos? Marque para rever e siga. Com 50 questões em 2 horas, a média é de 2,4 minutos por questão.',
      'Segundo o evento oficial do Google (2023), não há penalidade por chute: não deixe questão em branco.',
      'Em "Choose two", marque as duas só se estiver seguro das duas. Pode ser tudo ou nada.',
      'Prefira a opção gerenciada ou serverless quando o resto empatar (least operational overhead).'] },
    { t: 'Palavras-chave do enunciado', i: [
      'Least operational overhead ou fully managed: escolha o serviço gerenciado (BigQuery, Dataflow, Pub/Sub), não clusters.',
      'Cost-effective: pense em Spot, FlexRS, classe de armazenamento mais fria, partição e reserva de slots.',
      'Minimize latency ou near real-time: streaming (Pub/Sub e Dataflow), Bigtable.',
      'Existing Hadoop or Spark jobs, minimal changes: Dataproc.',
      'Globally consistent transactions: Spanner.',
      'Without moving data ou share without copying: authorized view ou Analytics Hub.',
      'Compliance, PII, sensitive: DLP, CMEK, VPC Service Controls, policy tags.',
      'Elimine primeiro as alternativas que quebram um requisito explícito e depois escolha entre as que sobraram.'] }
  ];

  var RECURSOS = [
    ['Guia oficial do exame (v4.2, PDF)', 'https://services.google.com/fh/files/misc/professional_data_engineer_exam_guide_english.pdf'],
    ['Página da certificação (preço, formato, validade)', 'https://cloud.google.com/learn/certification/data-engineer'],
    ['Trilha oficial no Cloud Skills Boost', 'https://www.cloudskillsboost.google/paths/16'],
    ['Questões de exemplo oficiais (formulário)', 'https://docs.google.com/forms/d/e/1FAIpQLSfkWEzBCP0wQ09ZuFm7G2_4qtkYbfmk_0getojdnPdCYmq37Q/viewform'],
    ['Guia de preparação da comunidade Google', 'https://discuss.google.dev/t/your-guide-to-preparing-for-the-google-cloud-professional-data-engineer-certification/107505'],
    ['Agendar a prova (certmetrics)', 'https://cp.certmetrics.com/google/en/login'],
    ['Documentação do Google Cloud', 'https://cloud.google.com/docs']
  ];

  /* Materiais complementares. Ordem de uso sugerida: documentação e labs oficiais, banco de questões do app, UM banco pago de simulados e livros só para aprofundar. */
  var MATERIAIS = [
    { t: 'Base oficial (gratuito)', n: 'Comece por aqui. É o que a prova realmente cobra.', i: [
      ['Guia do exame v4.2 (PDF)', 'https://services.google.com/fh/files/misc/professional_data_engineer_exam_guide_english.pdf', 'Lista os 19 tópicos e os pesos. Use como índice do que você precisa saber.'],
      ['Trilha oficial no Cloud Skills Boost', 'https://www.cloudskillsboost.google/paths/16', 'Cursos e labs guiados do Google. Os labs rodam em ambiente temporário, sem custo no seu projeto.'],
      ['Questões de exemplo oficiais', 'https://docs.google.com/forms/d/e/1FAIpQLSfkWEzBCP0wQ09ZuFm7G2_4qtkYbfmk_0getojdnPdCYmq37Q/viewform', 'O formato mais fiel da prova. Faça no dia 1 e de novo na semana 4.'],
      ['Architecture Center', 'https://cloud.google.com/architecture', 'Arquiteturas de referência. Ótimo para treinar questões de cenário.'],
      ['Well-Architected Framework', 'https://cloud.google.com/architecture/framework', 'Princípios de confiabilidade, custo, segurança e operação que as questões assumem.'],
      ['Nível gratuito e créditos', 'https://cloud.google.com/free', 'Veja o que é grátis antes de abrir o projeto dos labs.'],
      ['Canal Google Cloud Tech (YouTube)', 'https://www.youtube.com/@googlecloudtech', 'Vídeos oficiais do Google. Bons para Beam, BigQuery e arquitetura. Use junto com a documentação, não no lugar dela.']
    ] },
    { t: 'Cursos (pagos ou parcialmente pagos)', n: 'Úteis se você aprende melhor com vídeo. Não são obrigatórios.', i: [
      ['Coursera: Preparing for Google Cloud Certification: Cloud Data Engineer', 'https://www.coursera.org/professional-certificates/gcp-data-engineering', 'Série de 5 cursos feita pelo Google, com labs. A taxa da prova não está incluída. Confira o idioma e se acompanha o guia atual.']
    ] },
    { t: 'Simulados extras (pagos ou gratuitos)', n: 'Escolha só UM banco externo para não se dispersar. Confira se foi atualizado para o guia v4.2 (BigLake, Dataplex, BigQuery ML, RAG).', i: [
      ['Udemy: Google Cloud Professional Data Engineer Practice Tests', 'https://www.udemy.com/course/slg-google-cloud-professional-data-engineer-practice-tests/', 'Simulados de 50 questões. Verifique a data da última atualização e as avaliações antes de comprar.'],
      ['GitHub (comunidade): materiais gratuitos de 2026', 'https://github.com/aseemmankotia/course-google-cloud-professional-data-engineer-2026', 'Cartões e simulados gratuitos. Não verifiquei a qualidade: trate como complemento e desconfie de gabarito sem explicação.']
    ] },
    { t: 'Leituras para entender a fundo', n: 'Não são específicas da prova, mas fazem os conceitos grudarem.', i: [
      ['Livro: Official Google Cloud Certified Professional Data Engineer Study Guide (Wiley)', 'https://www.wiley.com/en-us/Official+Google+Cloud+Certified+Professional+Data+Engineer+Study+Guide-p-00043099', 'Referência completa, mas é de uma versão anterior da prova: use para conceitos, e o guia v4.2 para saber o que cai.'],
      ['Artigo: The world beyond batch, Streaming 101 (Tyler Akidau)', 'https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/', 'A melhor explicação de tempo de evento, janelas e watermark. Leia antes do dia 10.'],
      ['Beam Programming Guide', 'https://beam.apache.org/documentation/programming-guide/', 'Referência do modelo do Beam (PCollection, janelas, gatilhos). Dias 9 e 10.'],
      ['Machine Learning Crash Course (Google)', 'https://developers.google.com/machine-learning/crash-course', 'Base de ML para o dia 18, se o assunto for novo para você.'],
      ['Guia de preparação da comunidade Google', 'https://discuss.google.dev/t/your-guide-to-preparing-for-the-google-cloud-professional-data-engineer-certification/107505', 'Relatos e dicas de quem já fez a prova.']
    ] }
  ];

  /* Radar: o que candidatos e educadores relatam (COMPLEMENTO, não oficial). Pesquisa de 03/11/2026. */
  var RADAR = {
    aviso: 'Complemento, não regra. O guia oficial v4.2 e a documentação do Google são a referência do que cai. Os achados já foram integrados ao plano (marcas de foco nos tópicos, linhas "Relato de candidatos" nas aulas, o dia 24 de rede). Aqui fica o resumo de onde vieram e quais são os limites. Esta página resume o que candidatos e educadores relatam em blogs, vídeos e fóruns. A maior parte das fontes recentes é de quem vende curso ou simulado, então use como pista de onde reforçar, nunca como lista do que vai cair.',
    base: 'Pesquisa em 03/11/2026: 15 transcrições de vídeos e 22 páginas e posts. Só 4 vídeos e poucos textos são relatos de quem fez a prova. Nenhuma fonte traz medição de frequência por serviço.',
    repetido: [
      ['Alto', 'A prova é de cenário: várias alternativas parecem possíveis, e vale a que cumpre TODOS os requisitos (custo, latência, operação, segurança, conformidade).'],
      ['Alto', 'BigQuery aparece em quase todas as seções: partição, clustering, custo, segurança, materialized views, compartilhamento.'],
      ['Alto', 'Pub/Sub + Dataflow + BigQuery é o padrão de streaming mais citado. Janelas, watermark, dado atrasado e exactly-once são o ponto mais difícil.'],
      ['Alto', 'Escolha de armazenamento (Bigtable, Spanner, BigQuery, Cloud SQL, Cloud Storage) e a diferença entre Dataflow, Dataproc, Composer e Dataform.'],
      ['Alto', 'Segurança e IAM (menor privilégio, hierarquia, DLP, CMEK, VPC Service Controls) e governança (Dataplex, policy tags, Analytics Hub, BigLake).'],
      ['Médio', 'Quando todo o resto empata, ganha o serviço gerenciado com menor sobrecarga operacional.'],
      ['Alto', 'O que mais ajuda: labs de verdade, simulados com revisão de cada erro (entender, não decorar) e a documentação oficial como fonte da verdade.']
    ],
    fraco: [
      ['Rede: um candidato relatou várias questões, e o guia oficial lista fundamentos de rede no tópico 2.1. Por isso há uma aula no dia 24.'],
      ['Dataform, Datastream, BigQuery Omni e Analytics Hub aparecem como "novos" em vários relatos, mas com pesos incertos.'],
      ['Machine learning: os relatos dizem que pesa pouco e é básico (BigQuery ML, escolha de ferramenta). O guia v4.2 inclui BigQuery ML, embeddings e RAG: estude o básico sem exagerar.'],
      ['IA generativa e RAG: nenhum candidato confirmou questões. Siga o guia oficial.'],
      ['Memorystore, Firestore e Cloud SQL: relatos divergem. Trate como prioridade baixa, não zero.']
    ],
    contradicoes: [
      'Número de questões: o oficial diz 40 a 50. Vários relatos dizem 50 ou 50 a 60. Vale o oficial, e estar pronto para 50.',
      'Múltipla seleção "tudo ou nada": um candidato afirma, sem confirmação oficial. Treine como se fosse.',
      'Dificuldade: uns dizem "poucas pegadinhas", outros "duas respostas defensáveis". Planeje para o caso difícil.',
      'Quando o exame foi reescrito (2023 ou 2025) e quanto ML foi cortado: fontes de vendedores discordam. Vale o guia.'
    ],
    nomes: [
      ['Data Catalog / Dataplex Catalog / Dataplex Universal Catalog', 'Knowledge Catalog (as notas de versão oficiais já usam este nome; API e papéis mantêm "dataplex")'],
      ['Dataproc', 'Managed Service for Apache Spark (relatado; confira as notas de versão)'],
      ['BigLake', 'relatos citam "Lakehouse"; confira as notas de versão'],
      ['Dataprep', 'BigQuery data preparation (relatado; confira o status atual do Dataprep)'],
      ['Analytics Hub', 'aparece também como "BigQuery sharing"']
    ],
    nomesAviso: 'Estude os dois nomes: a prova e os materiais podem usar qualquer um.',
    preparo: 'Relatos de quem passou falam em 2 a 5 meses de preparo, por exemplo uns 8 h por semana com experiência em dados e sem GCP prévio. O plano relâmpago concentra isso em 4 semanas. Se esta é a primeira vez que você usa a plataforma, o ritmo leve de 8 semanas é uma escolha sensata. Marque a prova quando os simulados estiverem em 80% ou mais.'
  };

  /* Cuidados com material de terceiros */
  var CUIDADOS = [
    'O guia oficial v4.2 e a documentação do Google são a referência do que cai. Blogs, vídeos e simulados só complementam.',
    'Evite "dumps" (questões vazadas da prova): violam as políticas do Google, podem estar errados ou datados e não ensinam a decidir.',
    'Confira a data de qualquer material. Há muito conteúdo de 2019 a 2022 com respostas hoje erradas (por exemplo, "flat-rate", "snapshot decorators" e streaming inserts como recomendação).',
    'A maioria dos guias recentes é de quem vende curso ou simulado. Números como "BigQuery = 30% a 40% da prova" ou "nota de corte de 70%" não têm fonte oficial.',
    'Se um material discordar da documentação oficial, vale a documentação.'
  ];

  /* Leitura oficial por dia do plano: [rótulo, URL] */
  var DOCS_DIA = {
    1: [['Nível gratuito e créditos', 'https://cloud.google.com/free'], ['BigQuery sandbox', 'https://cloud.google.com/bigquery/docs/sandbox']],
    2: [['Introdução ao BigQuery', 'https://cloud.google.com/bigquery/docs/introduction'], ['Tabelas particionadas', 'https://cloud.google.com/bigquery/docs/partitioned-tables'], ['Tabelas clusterizadas', 'https://cloud.google.com/bigquery/docs/clustered-tables'], ['Carregar dados', 'https://cloud.google.com/bigquery/docs/loading-data'], ['Storage Write API', 'https://cloud.google.com/bigquery/docs/write-api']],
    3: [['Otimizar computação de consultas', 'https://cloud.google.com/bigquery/docs/best-practices-performance-compute'], ['Materialized views', 'https://cloud.google.com/bigquery/docs/materialized-views-intro'], ['BI Engine', 'https://cloud.google.com/bigquery/docs/bi-engine-intro'], ['Campos aninhados e repetidos', 'https://cloud.google.com/bigquery/docs/nested-repeated']],
    4: [['Bigtable: design de esquema e row key', 'https://cloud.google.com/bigtable/docs/schema-design'], ['Spanner', 'https://cloud.google.com/spanner/docs/overview'], ['Cloud SQL', 'https://cloud.google.com/sql/docs/introduction'], ['AlloyDB', 'https://cloud.google.com/alloydb/docs/overview'], ['Classes do Cloud Storage', 'https://cloud.google.com/storage/docs/storage-classes'], ['Firestore', 'https://cloud.google.com/firestore/docs/overview']],
    5: [['BigLake', 'https://cloud.google.com/bigquery/docs/biglake-intro'], ['Dataplex', 'https://cloud.google.com/dataplex/docs/introduction'], ['Analytics Hub', 'https://cloud.google.com/bigquery/docs/analytics-hub-introduction']],
    6: [['IAM', 'https://cloud.google.com/iam/docs/overview'], ['Organization policies', 'https://cloud.google.com/resource-manager/docs/organization-policy/overview'], ['VPC Service Controls', 'https://cloud.google.com/vpc-service-controls/docs/overview'], ['CMEK', 'https://cloud.google.com/kms/docs/cmek'], ['Segurança por coluna no BigQuery', 'https://cloud.google.com/bigquery/docs/column-level-security-intro'], ['Segurança por linha no BigQuery', 'https://cloud.google.com/bigquery/docs/row-level-security-intro'], ['Authorized views', 'https://cloud.google.com/bigquery/docs/authorized-views']],
    8: [['Visão geral do Pub/Sub', 'https://cloud.google.com/pubsub/docs/overview'], ['Tipos de assinatura', 'https://cloud.google.com/pubsub/docs/subscription-overview'], ['Exactly-once delivery', 'https://cloud.google.com/pubsub/docs/exactly-once-delivery'], ['Tratamento de falhas e dead-letter', 'https://cloud.google.com/pubsub/docs/handling-failures'], ['Ordenação de mensagens', 'https://cloud.google.com/pubsub/docs/ordering']],
    9: [['Visão geral do Dataflow', 'https://cloud.google.com/dataflow/docs/overview'], ['Beam Programming Guide', 'https://beam.apache.org/documentation/programming-guide/'], ['Flex Templates', 'https://cloud.google.com/dataflow/docs/guides/templates/using-flex-templates'], ['FlexRS', 'https://cloud.google.com/dataflow/docs/guides/flexrs'], ['Streaming Engine', 'https://cloud.google.com/dataflow/docs/streaming-engine']],
    10: [['Streaming 101 (Akidau)', 'https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/'], ['Pipelines de streaming no Dataflow', 'https://cloud.google.com/dataflow/docs/concepts/streaming-pipelines'], ['Beam Programming Guide (janelas e gatilhos)', 'https://beam.apache.org/documentation/programming-guide/']],
    11: [['Dataproc', 'https://cloud.google.com/dataproc/docs/concepts/overview'], ['Data Fusion', 'https://cloud.google.com/data-fusion/docs/concepts/overview'], ['Datastream', 'https://cloud.google.com/datastream/docs/overview'], ['Database Migration Service', 'https://cloud.google.com/database-migration/docs'], ['BigQuery Data Transfer Service', 'https://cloud.google.com/bigquery/docs/dts-introduction'], ['Storage Transfer Service', 'https://cloud.google.com/storage-transfer/docs/overview'], ['Transfer Appliance', 'https://cloud.google.com/transfer-appliance']],
    13: [['Cloud Composer', 'https://cloud.google.com/composer/docs/concepts/overview'], ['Apache Airflow', 'https://airflow.apache.org/docs/'], ['Workflows', 'https://cloud.google.com/workflows/docs/overview'], ['Dataform', 'https://cloud.google.com/dataform/docs/overview'], ['Cloud Build', 'https://cloud.google.com/build/docs/overview']],
    15: [['Sensitive Data Protection (DLP)', 'https://cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview'], ['Audit logs', 'https://cloud.google.com/logging/docs/audit'], ['Restrição de locais (organization policy)', 'https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations'], ['Mascaramento dinâmico de dados', 'https://cloud.google.com/bigquery/docs/column-data-masking-intro'], ['Linhagem de dados', 'https://cloud.google.com/dataplex/docs/about-data-lineage']],
    16: [['BigQuery: recuperação de desastre gerenciada', 'https://cloud.google.com/bigquery/docs/managed-disaster-recovery'], ['BigQuery: time travel', 'https://cloud.google.com/bigquery/docs/time-travel'], ['Spanner: replicação', 'https://cloud.google.com/spanner/docs/replication'], ['Bigtable: replicação', 'https://cloud.google.com/bigtable/docs/replication-overview'], ['Cloud SQL: alta disponibilidade', 'https://cloud.google.com/sql/docs/mysql/high-availability'], ['Dataplex: qualidade de dados', 'https://cloud.google.com/dataplex/docs/data-quality-overview'], ['Guia de planejamento de DR', 'https://cloud.google.com/architecture/dr-scenarios-planning-guide']],
    17: [['Looker Studio', 'https://cloud.google.com/looker-studio'], ['INFORMATION_SCHEMA', 'https://cloud.google.com/bigquery/docs/information-schema-intro'], ['Plano de execução da consulta', 'https://cloud.google.com/bigquery/docs/query-plan-explanation'], ['Authorized views', 'https://cloud.google.com/bigquery/docs/authorized-views'], ['Analytics Hub', 'https://cloud.google.com/bigquery/docs/analytics-hub-introduction']],
    18: [['BigQuery ML', 'https://cloud.google.com/bigquery/docs/bqml-introduction'], ['Busca vetorial', 'https://cloud.google.com/bigquery/docs/vector-search-intro'], ['Gerar embeddings', 'https://cloud.google.com/bigquery/docs/generate-text-embedding'], ['Machine Learning Crash Course', 'https://developers.google.com/machine-learning/crash-course']],
    19: [['Reservas e slots', 'https://cloud.google.com/bigquery/docs/reservations-intro'], ['BigQuery Editions', 'https://cloud.google.com/bigquery/docs/editions-intro'], ['Preços do BigQuery', 'https://cloud.google.com/bigquery/pricing'], ['Controle de custos', 'https://cloud.google.com/bigquery/docs/best-practices-costs'], ['Orçamentos e alertas de faturamento', 'https://cloud.google.com/billing/docs/how-to/budgets']],
    20: [['Cloud Monitoring', 'https://cloud.google.com/monitoring/docs'], ['Cloud Logging', 'https://cloud.google.com/logging/docs'], ['Monitoramento do BigQuery', 'https://cloud.google.com/bigquery/docs/monitoring'], ['Cotas e limites do BigQuery', 'https://cloud.google.com/bigquery/quotas'], ['Monitoramento do Pub/Sub', 'https://cloud.google.com/pubsub/docs/monitoring']],
    22: [['Architecture Center', 'https://cloud.google.com/architecture'], ['Well-Architected Framework', 'https://cloud.google.com/architecture/framework']],
    23: [['Well-Architected Framework', 'https://cloud.google.com/architecture/framework'], ['Questões de exemplo oficiais', 'https://docs.google.com/forms/d/e/1FAIpQLSfkWEzBCP0wQ09ZuFm7G2_4qtkYbfmk_0getojdnPdCYmq37Q/viewform']]
  };

  /* ---------- lógica ---------- */
  function cfgPadrao(hoje, ritmo) { var i = addDias(hoje || new Date(), 1), r = ritmo === 2 ? 2 : 1; return { inicio: iso(i), prova: iso(addDias(i, N_DIAS * r)), ritmo: r }; }
  function dataDoDia(cfg, n) { var r = cfg && cfg.ritmo === 2 ? 2 : 1; return addDias(parse(cfg.inicio), (n - 1) * r); }

  function prontidao(topicos) {
    topicos = topicos || {};
    var porSecao = SECOES.map(function (s) {
      var ts = TOPICOS.filter(function (t) { return t.s === s.id; });
      var soma = ts.reduce(function (a, t) { return a + Math.max(0, Math.min(3, +topicos[t.id] || 0)); }, 0);
      return { id: s.id, nome: s.nome, peso: s.peso, pct: Math.round(soma / (ts.length * 3) * 100), avaliados: ts.filter(function (t) { return topicos[t.id] != null; }).length, n: ts.length };
    });
    var pct = Math.round(porSecao.reduce(function (a, s) { return a + s.pct * s.peso; }, 0) / 100);
    return { pct: pct, porSecao: porSecao };
  }

  function simStats(sims) {
    sims = (sims || []).filter(function (x) { return x && x.total > 0; }).slice().sort(function (a, b) { return a.data < b.data ? -1 : 1; });
    var pct = function (x) { return Math.round(x.acertos / x.total * 100); };
    var comp = sims.filter(function (x) { return x.tipo === 'completo'; });
    var ult = comp.slice(-2);
    var media = ult.length ? Math.round(ult.reduce(function (a, x) { return a + pct(x); }, 0) / ult.length) : null;
    var melhor = sims.length ? Math.max.apply(null, sims.map(pct)) : null;
    var fracas = {};
    sims.forEach(function (x) { if (x.fraca) fracas[x.fraca] = (fracas[x.fraca] || 0) + 1; });
    var top = Object.keys(fracas).sort(function (a, b) { return fracas[b] - fracas[a]; })[0] || null;
    return { n: sims.length, completos: comp.length, media: media, melhor: melhor, fracas: fracas, maisFraca: top ? +top : null,
             zona: media == null ? null : media >= 80 ? 'verde' : media >= 70 ? 'amarela' : 'vermelha' };
  }

  function estado(cfg, hoje) {
    cfg = cfg || {}; hoje = hoje || new Date();
    var F = cfg.feitas || {}, hojeISO = iso(hoje);
    var feitasN = 0, hojeN = 0;
    PLANO.forEach(function (d) { d.tarefas.forEach(function (t) { if (F[t.id]) { feitasN++; if (F[t.id] === hojeISO) hojeN++; } }); });
    var pront = prontidao(cfg.topicos), sim = simStats(cfg.simulados);
    var base = { ativo: false, total: N_TAREFAS, feitas: feitasN, pct: Math.round(feitasN / N_TAREFAS * 100), hoje: hojeN, dias: N_DIAS,
                 prontidao: pront.pct, pront: pront, sim: sim, aprovada: !!cfg.aprovada, seq: 0, melhor: 0, pausas: 0, emRisco: false };
    if (!cfg.inicio) return base;
    var delta = dias(parse(cfg.inicio), hoje), r = cfg.ritmo === 2 ? 2 : 1;   // ritmo 2 = cada dia do plano ocupa 2 dias de calendário (metade da carga por dia)
    var dia = delta < 0 ? delta + 1 : Math.floor(delta / r) + 1;               // <=0: ainda não começou
    var n = Math.max(1, Math.min(N_DIAS, dia));
    var tarefasHoje = PLANO[n - 1].tarefas.map(function (t) { return { id: t.id, tipo: t.tipo, min: t.min, txt: t.txt, feito: !!F[t.id] }; });
    var atrasadas = [];
    for (var i = 0; i < n - 1; i++) PLANO[i].tarefas.forEach(function (t) { if (!F[t.id]) atrasadas.push({ id: t.id, dia: i + 1, tipo: t.tipo, min: t.min, txt: t.txt }); });
    var bom = {}; Object.keys(F).forEach(function (k) { if (F[k]) bom[F[k]] = 1; });
    var sq = root.CP_PROG && root.CP_PROG.sequencia ? root.CP_PROG.sequencia(function (k) { return !!bom[k]; }, Object.keys(bom), hoje) : { seq: 0, melhor: 0, pausas: 0, emRisco: false };
    base.ativo = true; base.dia = dia; base.diaPlano = n; base.dia0 = parse(cfg.inicio);
    base.comecaEm = dia <= 0 ? 1 - dia : 0; base.encerrado = dia > N_DIAS;
    base.titulo = PLANO[n - 1].t; base.tarefasHoje = tarefasHoje; base.atrasadas = atrasadas;
    base.diaFeito = tarefasHoje.length > 0 && tarefasHoje.every(function (t) { return t.feito; });
    base.prova = cfg.prova || iso(addDias(parse(cfg.inicio), N_DIAS * r)); base.ritmo = r; base.faltamProva = dias(hoje, parse(base.prova));
    base.seq = sq.seq; base.melhor = sq.melhor; base.pausas = sq.pausas; base.emRisco = sq.emRisco;
    return base;
  }

  function alternar(cfg, id, hoje) { // marca ou desmarca uma tarefa; devolve o novo "feitas"
    var F = Object.assign({}, cfg.feitas || {});
    if (F[id]) delete F[id]; else F[id] = iso(hoje || new Date());
    return F;
  }
  function empurrar(cfg, n) { // adia o plano e a prova em n dias
    var o = {}; if (cfg.inicio) o.inicio = iso(addDias(parse(cfg.inicio), n)); if (cfg.prova) o.prova = iso(addDias(parse(cfg.prova), n)); return o;
  }

  var api = { SECOES: SECOES, TOPICOS: TOPICOS, TIPOS: TIPOS, PLANO: PLANO, COLA: COLA, RECURSOS: RECURSOS, MATERIAIS: MATERIAIS, DOCS_DIA: DOCS_DIA, RADAR: RADAR, CUIDADOS: CUIDADOS, RELATOS_DIA: RELATOS_DIA, N_DIAS: N_DIAS, N_TAREFAS: N_TAREFAS,
              estado: estado, dataDoDia: dataDoDia, prontidao: prontidao, simStats: simStats, alternar: alternar, empurrar: empurrar, cfgPadrao: cfgPadrao, iso: iso, parse: parse, addDias: addDias };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_CERT = api;
})(typeof window !== 'undefined' ? window : globalThis);
