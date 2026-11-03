(function (root) {
  var C = root.CP_CERT_CONTEUDO = root.CP_CERT_CONTEUDO || { dias: {} };
C.dias[8] = {
  aula: {
    titulo: 'Pub/Sub: o sistema nervoso da ingestão em streaming',
    simples: {
      analogia: 'Pense numa agência dos Correios. Quem escreve a carta (o **produtor**) deixa na caixa de uma rua com nome, o **tópico**. Não precisa saber quem vai ler. Cada interessado abre uma **caixa postal** própria nessa rua: a **assinatura**. O correio copia cada carta para todas as caixas postais da rua. Assim a loja, o banco e o arquivo recebem a mesma carta, cada um no seu ritmo. Se duas pessoas dividem UMA caixa postal, cada carta é lida por só uma delas. Se ninguém retira a carta a tempo, o correio tenta de novo. Por isso a mesma carta pode chegar duas vezes, e você precisa saber reconhecer a repetida. Carta que volta sempre vai para uma caixa de "devolvidas": a **dead-letter**. Limite da analogia: o Pub/Sub guarda as cartas por um prazo e deixa você reler as antigas. O correio de verdade não faz isso.',
      pontos: [
        'O **Pub/Sub** é uma caixa de correio no meio, entre quem envia dados e quem os usa.',
        'Quem envia publica num **tópico**. Quem lê tem uma **assinatura**.',
        'Cada assinatura recebe uma cópia. Consumidores da mesma assinatura dividem as mensagens.',
        'A entrega padrão pode repetir mensagens. Seu código precisa aguentar a repetição.',
        'Não vai transformar nada? Use assinatura que grava direto no BigQuery ou no Cloud Storage.',
        'Mensagem que sempre falha vai para um tópico **dead-letter**, para você examinar depois.'
      ],
      paraQueServe: 'Você usa isso quando sensores, apps ou sistemas geram eventos o tempo todo e vários times precisam receber esses dados sem um depender do outro.'
    },
    glossario: [
      { t: 'Streaming', d: 'Dados que chegam o tempo todo, aos poucos, em vez de um arquivo grande de uma vez.' },
      { t: 'Evento', d: 'Um fato registrado no momento em que acontece, como um clique ou a leitura de um sensor.' },
      { t: 'Pub/Sub (Publish/Subscribe)', d: 'Serviço do Google Cloud que recebe mensagens de quem envia e as entrega a quem se interessa.' },
      { t: 'Publisher e subscriber', d: 'Publisher envia mensagens. Subscriber (consumidor) as recebe e processa.' },
      { t: 'Topic (tópico)', d: 'O canal com nome onde as mensagens são publicadas.' },
      { t: 'Subscription (assinatura)', d: 'A "caixa postal" de um consumidor no tópico, com seu próprio progresso de leitura.' },
      { t: 'Ack (acknowledgement)', d: 'A confirmação "recebi e processei". Sem ela, o Pub/Sub entrega a mensagem de novo.' },
      { t: 'Idempotente', d: 'Que dá o mesmo resultado final mesmo se a mesma mensagem for processada duas vezes.' },
      { t: 'Backlog', d: 'Fila de mensagens que chegaram e ainda não foram processadas.' },
      { t: 'Dead-letter topic', d: 'Tópico para onde vão as mensagens que falharam muitas vezes, para você inspecionar depois.' }
    ],
    checagem: [
      'Sem olhar a aula: explique o que é tópico, o que é assinatura e o que acontece com duas assinaturas no mesmo tópico.',
      'Por que o Pub/Sub às vezes entrega a mesma mensagem duas vezes? O que seu código deve fazer sobre isso?',
      'Quando você usaria uma assinatura que grava direto no BigQuery em vez de montar um pipeline?',
      'Uma mensagem sempre dá erro e trava o consumidor. Qual configuração resolve e o que ela guarda?'
    ],
    resumo: 'Entenda como o Pub/Sub desacopla produtores e consumidores, os quatro tipos de assinatura, as garantias de entrega (at-least-once e exactly-once), ordering, dead-letter, replay e quando escolher Kafka ou Cloud Tasks.',
    blocos: [
      {
        t: 'Ideia central: desacoplar quem produz de quem consome',
        facil: 'Traduzindo: o Pub/Sub é uma caixa de correio no meio. Quem envia não sabe quem lê, e cada interessado recebe a sua própria cópia.',
        p: [
          'Pub/Sub é um serviço de mensageria global, serverless e assíncrono. O produtor (publisher) envia mensagens a um tópico (topic) sem saber quem vai ler. Cada consumidor lê por meio de uma assinatura (subscription). Uma mensagem publicada no tópico é copiada logicamente para TODAS as assinaturas daquele tópico (fan-out), e dentro de uma mesma assinatura cada mensagem vai para apenas um dos consumidores que compartilham essa assinatura (balanceamento de carga).',
          'Isso resolve três problemas que aparecem em prova: absorver picos (o tópico armazena o que o consumidor ainda não processou), desacoplar sistemas (o produtor não cai se o consumidor cair) e distribuir o mesmo evento para vários destinos (um mesmo evento alimenta o BigQuery, um modelo de fraude e um arquivo no Cloud Storage, cada um com sua assinatura).'
        ],
        lista: [
          'Mensagem: dados (até 10 MB) + atributos (até 100 pares chave/valor) + messageId + publishTime + orderingKey opcional.',
          'Tópico: canal nomeado onde se publica. Assinatura: visão de um consumidor sobre o tópico, com seu próprio progresso (backlog) e suas próprias configurações.',
          'Duas assinaturas no mesmo tópico recebem cópias independentes. Dois consumidores na MESMA assinatura dividem as mensagens entre si.'
        ],
        dica: 'Pergunta de prova com "vários sistemas precisam reagir ao mesmo evento" aponta para um tópico com várias assinaturas, não para várias cópias do pipeline.'
      },
      {
        t: 'Os tipos de assinatura: como a mensagem chega ao destino',
        facil: 'Traduzindo: escolher a assinatura é escolher como a carta chega. Sem mexer na mensagem, grave direto no destino. Com lógica sua, busque (pull). Para um site HTTPS, receba por push.',
        p: [
          'A escolha do tipo de assinatura é a decisão mais cobrada do Pub/Sub. A regra de ouro: se você não precisa transformar a mensagem, use uma assinatura de exportação (BigQuery ou Cloud Storage) e elimine o pipeline inteiro. Se precisa de lógica, use pull (ou Dataflow, que usa pull por baixo). Se o destino é um endpoint HTTPS, use push.'
        ],
        tabela: {
          cab: ['Tipo', 'Como funciona', 'Quando usar', 'Observações'],
          linhas: [
            ['Pull', 'O consumidor pede mensagens (inclui StreamingPull, conexão aberta de alto throughput) e confirma com ack.', 'Consumidores sob seu controle: Dataflow, aplicações em GKE/Compute, controle de ritmo (flow control).', 'Único tipo que oferece exactly-once. Funciona atrás de firewall pois o cliente inicia a conexão.'],
            ['Push', 'O Pub/Sub envia um POST HTTPS para um endpoint; resposta de sucesso (2xx) = ack.', 'Serviços serverless como Cloud Run ou Cloud Functions, webhooks, baixa latência sem cliente de polling.', 'Endpoint precisa ser HTTPS acessível. Usa controle de fluxo com slow start. Sem exactly-once.'],
            ['BigQuery subscription', 'Grava cada mensagem direto numa tabela BigQuery, sem código.', 'Ingestão simples para análise: mínima operação e baixo custo.', 'Usa a Storage Write API. Esquema do tópico ou modo "drop unknown fields"; opção de gravar o corpo cru em uma coluna data. Sem transformação.'],
            ['Cloud Storage subscription', 'Grava lotes de mensagens em arquivos no bucket (Avro ou texto), em intervalos ou por tamanho.', 'Arquivamento barato, data lake, reprocesso posterior.', 'Arquivos são fechados por tempo (min. 1 minuto) ou tamanho; não é tempo real por mensagem.']
          ]
        },
        armadilha: 'Exactly-once só existe para assinaturas pull (incluindo StreamingPull) e dentro de uma região. Push e assinaturas de exportação (BigQuery, Cloud Storage) não têm essa garantia.'
      },
      {
        t: 'Entrega: at-least-once, exactly-once, ack deadline e retry',
        facil: 'Traduzindo: o Pub/Sub prefere entregar de novo a perder mensagem, então pode haver repetição. Confirme (ack) a tempo e faça seu código tolerar a mesma mensagem duas vezes.',
        p: [
          'O padrão é at-least-once: a mensagem é entregue pelo menos uma vez e, em casos raros ou se o ack não chegar a tempo, pode ser entregue de novo. Por isso o consumidor deve ser idempotente (processar a mesma mensagem duas vezes gera o mesmo resultado final) ou deduplicar por messageId ou por uma chave de negócio.',
          'Ack deadline: depois da entrega, o Pub/Sub espera um ack até o prazo (padrão 10 segundos, configurável de 10 a 600 segundos). Sem ack no prazo, a mensagem é reentregue. Bibliotecas de cliente estendem o prazo automaticamente enquanto a mensagem está sendo processada. Um nack (ou deixar expirar) provoca nova tentativa.',
          'Exactly-once delivery: quando habilitado na assinatura pull, o Pub/Sub garante que, após um ack bem-sucedido, a mensagem não será reentregue, e que somente o ack id mais recente é válido. Há limite regional: consumidores espalhados por várias regiões podem receber duplicatas, então use um endpoint regional. Para saber se o ack funcionou, use a variante "ack with response". Ele não elimina a necessidade de idempotência no efeito externo (por exemplo, a gravação no destino).',
          'Retry policy: por padrão, mensagens não confirmadas são reentregues imediatamente. Com a política de backoff exponencial você define um intervalo mínimo e máximo entre as tentativas (o máximo vai até 600 segundos; se só um dos dois for informado, o outro assume um padrão), o que evita martelar um consumidor que está falhando.'
        ],
        lista: [
          'Subscriber lento: aumente o ack deadline ou use extensão automática (lease management), em vez de aceitar reentregas.',
          'Sintoma de ack deadline curto demais: duplicatas e backlog que não cai mesmo com consumidores saudáveis.',
          'Exactly-once reduz a vazão e aumenta a latência de publicação-para-entrega; use só quando duplicata custa caro e o destino não é idempotente.'
        ]
      },
      {
        t: 'Dead-letter, retenção, replay (seek) e snapshots',
        facil: 'Traduzindo: mensagem que sempre falha vai para uma caixa de "devolvidas". Guardar mensagens por mais tempo permite voltar no tempo e reprocessar, mas só o que ainda está guardado.',
        p: [
          'Dead-letter topic: mensagem "veneno" (poison message), que sempre falha, não deve travar o fluxo. Configure na assinatura um tópico de dead-letter e o número máximo de tentativas de entrega (de 5 a 100, padrão 5; a contagem é aproximada). Passado o limite, a mensagem é encaminhada ao outro tópico, onde você a inspeciona depois. Para funcionar, a conta de serviço do Pub/Sub precisa de papel de publisher no tópico dead-letter e de subscriber na assinatura de origem. Atenção: o tópico dead-letter também precisa de uma assinatura, senão as mensagens encaminhadas não ficam retidas.',
          'Retenção: assinaturas retêm mensagens não confirmadas por 7 dias por padrão (configurável, até 31 dias). Se quiser retenção também de mensagens já confirmadas, ative "retain acknowledged messages" na assinatura. Há ainda retenção no nível do tópico (até 31 dias), que permite criar uma assinatura nova e reler o histórico mesmo para quem não existia na época.',
          'Replay (seek): você pode "voltar no tempo" numa assinatura, para um timestamp ou para um snapshot. Isso reentrega mensagens já confirmadas, desde que ainda retidas. É a resposta para "um bug no consumidor corrompeu dados das últimas 6 horas, como reprocessar?". Snapshot é uma foto do estado de ack de uma assinatura, útil antes de um deploy arriscado.'
        ],
        armadilha: 'Replay não cria mensagens do nada: só reentrega o que ainda está retido. Sem retenção de mensagens confirmadas (na assinatura) ou retenção no tópico, seek para o passado devolve pouco ou nada.'
      },
      {
        t: 'Ordering keys, schemas e política de falhas de publicação',
        facil: 'Traduzindo: a ordem só é garantida entre mensagens com a mesma chave, como o mesmo cliente. O schema é um formulário: mensagem fora do formato é recusada na entrada.',
        p: [
          'Ordering: sem chave, a ordem de entrega não é garantida. Com ordering key e ordenação habilitada na assinatura, mensagens da mesma chave publicadas na mesma região são entregues na ordem. A ordem vale por chave, não globalmente, e cada chave tem limite de 1 MBps de publicação. Se uma mensagem de uma chave sofre nack, as seguintes dessa chave são reentregues junto, para preservar a ordem. Use a chave que representa a entidade que exige sequência (id do cliente, id do dispositivo).',
          'Schemas: você associa um schema Avro ou Protocol Buffers ao tópico, e o Pub/Sub rejeita na publicação mensagens que não o respeitam, com codificação JSON ou binária. Isso protege consumidores a jusante e é pré-requisito para a assinatura BigQuery usar o esquema do tópico.',
          'Mensagens grandes: o limite é 10 MB. Para arquivos maiores, grave no Cloud Storage e publique só o caminho (padrão claim check).'
        ],
        lista: [
          'Ordenação reduz paralelismo por chave: poucas chaves "quentes" viram gargalo.',
          'Schema evolui por revisões; mudanças incompatíveis exigem planejamento.'
        ]
      },
      {
        t: 'Pub/Sub x Managed Service for Apache Kafka x Cloud Tasks',
        facil: 'Traduzindo: Pub/Sub é o padrão para eventos novos. Kafka gerenciado serve a quem já usa Kafka. Cloud Tasks não move dados: envia tarefas, uma a uma, com controle de ritmo.',
        tabela: {
          cab: ['Critério', 'Pub/Sub', 'Google Cloud Managed Service for Apache Kafka', 'Cloud Tasks'],
          linhas: [
            ['Modelo', 'Mensageria global serverless, sem partições para gerenciar.', 'Cluster Apache Kafka gerenciado: tópicos, partições, consumer groups, API Kafka.', 'Fila de tarefas: você enfileira chamadas HTTP/App Engine para um alvo.'],
            ['Melhor para', 'Ingestão de eventos nova no Google Cloud, fan-out, picos, mínimo de operação.', 'Migrar ou manter apps que já usam o protocolo e o ecossistema Kafka (Connect, Streams) com menos operação.', 'Controlar execução de trabalho individual: taxa, retries por tarefa, agendar para o futuro, deduplicar por nome.'],
            ['Consumo', 'Várias assinaturas independentes por tópico.', 'Consumer groups e offsets sobre partições (log reutilizável).', 'Um alvo executa cada tarefa; sem fan-out.'],
            ['Armadilha', 'Ordem só por chave; sem offsets controlados pelo cliente (use seek).', 'Você ainda dimensiona o cluster (vCPU e memória) e as partições.', 'Não é pipeline de dados nem transporta grandes volumes de eventos analíticos.']
          ]
        },
        p: [
          'Regra prática: aplicação nova e escalável sem requisito Kafka, Pub/Sub. Equipe com código Kafka existente e exigência de compatibilidade de API, Kafka gerenciado (ou conectores Kafka para Pub/Sub). Despachar tarefas com controle de taxa para um serviço (enviar e-mail, chamar API externa limitada), Cloud Tasks. Disparo por horário, Cloud Scheduler (dia 13).'
        ]
      }
    ],
    exemplo: {
      t: 'Telemetria de 50 mil sensores com duplicata e reprocesso',
      texto: 'Uma empresa recebe leituras de 50 mil sensores e quer análise no BigQuery com o menor esforço operacional. Passo 1: os sensores publicam em um tópico com schema Avro, para rejeitar leituras malformadas já na origem. Passo 2: como não há transformação, cria-se uma assinatura BigQuery apontando para a tabela, sem código nem Dataflow. Passo 3: uma segunda assinatura com Cloud Storage guarda os arquivos Avro brutos como arquivo morto. Passo 4: a assinatura BigQuery recebe dead-letter com 5 tentativas, de modo que mensagens com tipo incompatível não bloqueiam o fluxo. Passo 5: um bug de unidade é descoberto 3 horas depois; como a assinatura retém mensagens confirmadas, faz-se seek para o timestamp anterior ao bug e a tabela é recarregada em um destino corrigido. Como a entrega é at-least-once, a tabela final usa messageId para deduplicação em consulta ou MERGE.'
    },
    prova: [
      'Palavras como "no code", "minimal operational overhead" e "no transformation needed" com destino BigQuery ou Cloud Storage apontam para assinaturas de exportação, não para Dataflow.',
      '"Duplicate messages", "process exactly once" e "idempotent" levam a: exactly-once delivery em assinatura pull, ou deduplicação por messageId/chave no destino. Cuidado se o enunciado fala de push ou BigQuery subscription: exactly-once não se aplica.',
      '"Messages that always fail", "poison message" e "inspect later" apontam para dead-letter topic com limite de tentativas; "replay last N hours" aponta para seek com retenção; "process in order per customer" aponta para ordering key; "existing Kafka applications" aponta para Managed Kafka.'
    ],
    explique: 'Explique sem consultar: o que acontece com uma mensagem desde a publicação até o ack, o que muda quando o ack deadline expira, e como você combinaria dead-letter, retenção e seek para lidar com um consumidor com bug.'
  },
  cartoes: [
    { id: 'd8c1', t: '2.2', f: 'Qual é a garantia de entrega padrão do Pub/Sub e o que ela exige do consumidor?', v: 'At-least-once: a mensagem pode chegar mais de uma vez. O consumidor deve ser idempotente ou deduplicar por messageId ou chave de negócio.' },
    { id: 'd8c2', t: '2.2', f: 'Quais assinaturas suportam exactly-once delivery?', v: 'Somente pull (incluindo StreamingPull), dentro de uma região. Push e assinaturas de exportação (BigQuery, Cloud Storage) não suportam.' },
    { id: 'd8c3', t: '2.2', f: 'Qual a faixa configurável do ack deadline e o padrão?', v: 'De 10 a 600 segundos; o padrão é 10 segundos. Sem ack no prazo, a mensagem é reentregue.' },
    { id: 'd8c4', t: '2.2', f: 'Quando usar BigQuery subscription em vez de Dataflow?', v: 'Quando a mensagem vai para o BigQuery sem transformação: zero código, menor operação e custo. Se precisar de enriquecimento, janelas ou joins, use Dataflow.' },
    { id: 'd8c5', t: '2.2', f: 'Para que serve a Cloud Storage subscription?', v: 'Grava lotes de mensagens como arquivos (Avro ou texto) no bucket, por tempo ou tamanho. Boa para arquivo morto e data lake, não para latência por mensagem.' },
    { id: 'd8c6', t: '2.2', f: 'Como configurar dead-letter e qual o intervalo de max delivery attempts?', v: 'Defina um dead-letter topic na assinatura com tentativas de 5 a 100 (padrão 5). A conta de serviço do Pub/Sub precisa de publisher no tópico dead-letter e subscriber na assinatura.' },
    { id: 'd8c7', t: '2.2', f: 'Qual a retenção padrão de mensagens não confirmadas numa assinatura e o máximo?', v: 'Padrão de 7 dias, configurável até 31 dias. A retenção no tópico também vai até 31 dias.' },
    { id: 'd8c8', t: '2.2', f: 'Como reprocessar as últimas horas de mensagens já confirmadas?', v: 'Faça seek da assinatura para um timestamp ou snapshot. Exige que as mensagens ainda estejam retidas (retain acknowledged messages ou retenção no tópico).' },
    { id: 'd8c9', t: '2.2', f: 'O que garante uma ordering key?', v: 'Entrega em ordem das mensagens da mesma chave (mesma região, com ordenação habilitada na assinatura). Não há ordem global; limite de 1 MBps de publicação por chave.' },
    { id: 'd8c10', t: '2.2', f: 'Diferença entre pull e push na iniciativa da conexão.', v: 'Pull: o consumidor inicia e busca mensagens (funciona atrás de firewall). Push: o Pub/Sub envia POST HTTPS ao endpoint, ideal para Cloud Run e Cloud Functions.' },
    { id: 'd8c11', t: '2.2', f: 'Qual o tamanho máximo de mensagem do Pub/Sub e o que fazer com arquivos maiores?', v: '10 MB. Para arquivos maiores, grave no Cloud Storage e publique somente a referência (claim check).' },
    { id: 'd8c12', t: '2.2', f: 'Quando escolher Cloud Tasks em vez de Pub/Sub?', v: 'Para despachar tarefas individuais a um alvo HTTP com controle de taxa, retry por tarefa e agendamento no futuro. Não serve para fan-out nem ingestão de eventos em massa.' },
    { id: 'd8c13', t: '2.2', f: 'Quando preferir Managed Service for Apache Kafka a Pub/Sub?', v: 'Quando há aplicações e ecossistema Kafka existentes (API Kafka, Connect, Streams) e você quer menos operação. Para aplicação nova sem requisito Kafka, Pub/Sub.' },
    { id: 'd8c14', t: '2.1', f: 'Como absorver picos de tráfego entre produtor e pipeline?', v: 'Coloque o Pub/Sub no meio: o tópico guarda o backlog enquanto o consumidor escala, desacoplando a taxa do produtor da taxa do processamento.' }
  ],
  questoes: [
    {
      id: 'd8q1', s: 2, t: '2.2',
      e: 'A retailer publishes clickstream events to Pub/Sub. The events must land in a BigQuery table for analysts with no transformation, and the team wants the LEAST operational overhead. Which design should you choose?',
      o: ['Create a Dataflow streaming job that reads from a pull subscription and writes with the BigQuery connector.', 'Create a BigQuery subscription on the topic that writes to the destination table.', 'Create a push subscription to a Cloud Run service that inserts rows into BigQuery.', 'Create a Dataproc cluster running Spark Structured Streaming that reads from Pub/Sub.'],
      c: [1],
      x: 'A resposta correta é a BigQuery subscription: grava direto na tabela sem código, sem workers e sem serviço para manter, que é o menor overhead quando não há transformação. Dataflow funciona, mas exige pipeline, template e monitoramento sem necessidade aqui. Push para Cloud Run exige escrever e operar um serviço, tratar erros e escala. Dataproc com Spark Streaming é o caminho mais pesado, com cluster para gerenciar, e só faria sentido para reaproveitar código Spark existente.'
    },
    {
      id: 'd8q2', s: 2, t: '2.2',
      e: 'A payment application processes Pub/Sub messages with a pull subscriber on GKE. Duplicated processing causes double charges, and the charge API is not idempotent. The subscribers run in one region. What should you do FIRST at the Pub/Sub layer?',
      o: ['Switch the subscription to push delivery so Pub/Sub controls retries.', 'Enable exactly-once delivery on the pull subscription and use acknowledgment with response.', 'Increase the topic message retention to 31 days.', 'Create an ordering key per payment and disable acknowledgments.'],
      c: [1],
      x: 'Exactly-once delivery em assinatura pull, dentro de uma região, impede reentrega após ack bem-sucedido, e o ack com resposta confirma se o ack valeu. Push não suporta exactly-once e ainda tem retries automáticos que geram duplicatas. Aumentar a retenção do tópico não tem relação com duplicatas, só permite replay. Ordering key garante ordem, não unicidade, e desabilitar acks causaria reentrega contínua. Ainda assim, como a API não é idempotente, vale enviar uma chave de idempotência ao chamar o serviço de cobrança.'
    },
    {
      id: 'd8q3', s: 2, t: '2.2',
      e: 'A subscriber occasionally receives a malformed message that throws an exception, is nacked, and is redelivered endlessly, blocking the throughput of the consumer. Developers want to examine such messages later without stopping the flow. Which configuration meets this requirement?',
      o: ['Reduce the acknowledgment deadline to 10 seconds.', 'Enable message ordering on the subscription.', 'Configure a dead-letter topic with a maximum number of delivery attempts, and grant the Pub/Sub service account the required roles.', 'Enable exactly-once delivery so the message is delivered only once.'],
      c: [2],
      x: 'O dead-letter topic com limite de tentativas encaminha a mensagem veneno para outro tópico após N falhas, liberando o fluxo e permitindo inspeção; é preciso dar publisher no dead-letter e subscriber na assinatura de origem à conta de serviço do Pub/Sub. Reduzir o ack deadline só acelera as reentregas. Ordenação piora o problema, pois mensagens da mesma chave ficam presas atrás da que falha. Exactly-once não impede que uma mensagem com nack seja reentregue, só evita reentrega depois de um ack.'
    },
    {
      id: 'd8q4', s: 2, t: '2.2',
      e: 'A bug in a streaming consumer wrote incorrect values for the past 5 hours. All messages were acknowledged. The subscription was created with default settings. Which statement is correct about replaying the data?',
      o: ['Seek to a timestamp cannot redeliver acknowledged messages under any configuration.', 'You can seek back only if acknowledged messages are retained, for example with retain acknowledged messages enabled on the subscription, or topic retention.', 'You must recreate the topic and republish from the source.', 'Dead-letter topics automatically store all acknowledged messages for replay.'],
      c: [1],
      x: 'Seek para timestamp reentrega mensagens já confirmadas, mas somente se elas ainda estiverem retidas: com a opção de reter mensagens confirmadas na assinatura (ou retenção no tópico). Na configuração padrão isso não está ativo, então é preciso planejar antes do incidente. A primeira alternativa é falsa, pois seek é justamente o mecanismo de replay. Recriar o tópico não recupera nada. Dead-letter guarda apenas mensagens que excederam tentativas de entrega, não as confirmadas.'
    },
    {
      id: 'd8q5', s: 2, t: '2.2',
      e: 'A bank must process events for each account in the order they were published, while still scaling across millions of accounts. Which two actions should you take? Choose two.',
      o: ['Publish messages with the account ID as the ordering key.', 'Enable message ordering on the subscription.', 'Create one topic per account.', 'Use a push subscription with a single worker to avoid parallelism.', 'Disable the acknowledgment deadline.'],
      c: [0, 1],
      x: 'A ordem por entidade exige chave de ordenação (o id da conta) na publicação e a ordenação habilitada na assinatura; isso mantém ordem por chave e paralelismo entre chaves diferentes. Um tópico por conta não escala para milhões e gera enorme custo de gestão. Um único worker em push elimina escala e nem sozinho garante ordem sem as chaves. Desabilitar o ack deadline não existe como forma de ordenar e levaria a reentregas sem controle.'
    },
    {
      id: 'd8q6', s: 2, t: '2.2',
      e: 'A company has dozens of applications that use Apache Kafka client libraries, Kafka Connect and consumer groups. It wants to move off self-managed brokers on virtual machines with minimal code changes. What is the BEST option?',
      o: ['Rewrite all applications to use Pub/Sub client libraries.', 'Use Cloud Tasks queues to replace Kafka topics.', 'Use Google Cloud Managed Service for Apache Kafka.', 'Use Cloud Storage subscriptions to replace consumers.'],
      c: [2],
      x: 'O Managed Service for Apache Kafka mantém a API e o ecossistema Kafka (Connect, consumer groups), reduzindo a operação dos brokers com poucas mudanças de código. Reescrever para Pub/Sub é viável, mas contraria a exigência de mínimas mudanças. Cloud Tasks é fila de tarefas HTTP, sem logs particionados nem consumer groups. Cloud Storage subscription apenas grava arquivos a partir de Pub/Sub e não substitui consumidores nem o protocolo Kafka.'
    },
    {
      id: 'd8q7', s: 2, t: '2.1',
      e: 'A web application must call an external partner API that allows only 20 requests per second. Each call must be retried independently on failure and some calls must run 30 minutes in the future. Which service fits BEST?',
      o: ['Cloud Tasks with a queue configured with a rate limit and retry settings.', 'Pub/Sub pull subscription with ordering keys.', 'Cloud Storage subscription writing to a bucket.', 'Dataflow streaming job with a fixed window.'],
      c: [0],
      x: 'Cloud Tasks é feito para despachar tarefas individuais a um alvo HTTP com limite de taxa, retry por tarefa e agendamento no futuro (schedule time). Pub/Sub não tem agendamento por mensagem nem limite de taxa de despacho para um alvo, apenas flow control no cliente. Cloud Storage subscription apenas arquiva mensagens em arquivos. Dataflow com janela fixa é para processamento analítico de fluxo, não para chamadas controladas de API por tarefa.'
    },
    {
      id: 'd8q8', s: 2, t: '2.2',
      e: 'A subscriber needs 90 seconds to process each message. Monitoring shows many duplicate deliveries and a growing backlog although the subscribers are healthy. Which change addresses the root cause?',
      o: ['Add a dead-letter topic with 100 delivery attempts.', 'Switch to a Cloud Storage subscription.', 'Increase the acknowledgment deadline (or rely on automatic lease extension) to exceed the processing time.', 'Reduce the topic message retention.'],
      c: [2],
      x: 'Com ack deadline padrão de 10 segundos e processamento de 90, as mensagens expiram antes do ack e são reentregues: duplicatas e backlog. Aumentar o prazo (até 600 segundos) ou usar a extensão automática da biblioteca resolve a causa. Dead-letter só tiraria as mensagens do fluxo depois das tentativas, perdendo processamento. Cloud Storage subscription muda o destino, não o prazo. Reduzir retenção do tópico não afeta o prazo de ack.'
    },
    {
      id: 'd8q9', s: 2, t: '2.2',
      e: 'You want raw Pub/Sub events archived cheaply in Cloud Storage for later batch reprocessing, with no code, while another subscription feeds a real-time pipeline. Which approach is correct?',
      o: ['Create a second subscription on the same topic using the Cloud Storage subscription type.', 'Create a second topic and ask publishers to send every message twice.', 'Pull messages from the real-time subscription and copy them to Cloud Storage from the same consumer.', 'Use a push subscription to Cloud Storage objects URL.'],
      c: [0],
      x: 'Um tópico pode ter várias assinaturas independentes, e uma assinatura Cloud Storage grava os lotes em arquivos sem código, ideal para arquivo morto barato. Publicar duas vezes aumenta custo e acopla produtores. Copiar a partir do mesmo consumidor adiciona código e acopla a falha do arquivamento ao pipeline em tempo real. Push exige um endpoint HTTPS que processe a mensagem; a URL de objetos do Cloud Storage não aceita esse protocolo de entrega do Pub/Sub.'
    },
    {
      id: 'd8q10', s: 2, t: '2.2',
      e: 'Which two statements about Pub/Sub delivery guarantees are correct? Choose two.',
      o: ['Exactly-once delivery is supported on pull subscriptions within a cloud region.', 'Push subscriptions support exactly-once delivery.', 'By default, Pub/Sub provides at-least-once delivery, so consumers should be idempotent.', 'BigQuery subscriptions guarantee exactly-once delivery to the table.', 'Message ordering guarantees global order across all keys.'],
      c: [0, 2],
      x: 'Corretas: exactly-once existe para assinaturas pull dentro de uma região, e o padrão é at-least-once, exigindo consumidores idempotentes. Push não suporta exactly-once. BigQuery subscription é uma assinatura de exportação e não oferece essa garantia, então pode haver duplicatas na tabela. A ordenação vale por chave de ordenação, nunca globalmente entre chaves.'
    }
  ],
  lab: {
    t: 'Tópico, assinatura BigQuery, dead-letter e publicação com gcloud',
    tempo: '30 a 45 minutos',
    antes: 'Você precisa de um projeto Google Cloud com cobrança (billing) vinculada e do **Cloud Shell**, um terminal no navegador. Clique no ícone ">_" no canto superior direito do console. Os comandos gcloud e bq já vêm instalados. Na primeira vez, aparece uma janela pedindo para autorizar o Cloud Shell: clique em Autorizar. Na tela, cada comando de criação responde com mensagens como "Created topic" e "Created subscription". Habilitar APIs pode levar cerca de um minuto, sem barra de progresso. Para conferir o que criou, abra Pub/Sub no console e veja Tópicos e Assinaturas. Rode um passo por vez e leia a saída antes de seguir. Se algo der errado, a seção de limpeza apaga tudo.',
    erros: [
      { s: 'API has not been used in project ... or it is disabled', c: 'A API do serviço ainda não foi habilitada neste projeto.', r: 'Rode gcloud services enable pubsub.googleapis.com bigquery.googleapis.com, espere cerca de um minuto e repita o comando.' },
      { s: 'PERMISSION_DENIED ao criar tópico ou aplicar permissões', c: 'Sua conta não tem papel suficiente, ou o projeto ativo é outro.', r: 'Confira o projeto com gcloud config get-value project. Use um projeto seu ou peça ao dono o papel de Editor, ou os papéis Pub/Sub Admin e BigQuery Admin.' },
      { s: 'Billing account for the project is not enabled', c: 'O projeto não tem conta de cobrança vinculada.', r: 'No console, abra Faturamento, vincule uma conta de cobrança ao projeto e repita. O custo deste lab é próximo de zero.' },
      { s: 'ALREADY_EXISTS ao criar tópico, assinatura ou tabela', c: 'Você já rodou o passo antes e o recurso ficou criado.', r: 'Pule a criação desse recurso. Ou apague-o com o comando da seção de limpeza e crie de novo.' },
      { s: 'A assinatura BigQuery existe, mas nenhuma linha aparece na tabela', c: 'A conta de serviço do Pub/Sub não tem permissão na tabela, ou as colunas não batem com o schema.', r: 'Reaplique o papel bigquery.dataEditor na tabela. Compare nomes e tipos das colunas com o schema do tópico. Espere alguns segundos e consulte de novo.' }
    ],
    custo: 'Perto de US$ 0 (poucas mensagens ficam dentro do nível gratuito do Pub/Sub e do BigQuery). Apague tudo ao final.',
    porque: 'Fixa na prática a ideia de assinatura de exportação sem código, a necessidade de IAM para a conta de serviço do Pub/Sub e o caminho de falha até o dead-letter.',
    passos: [
      { t: 'Preparar projeto e APIs', cmd: 'gcloud config set project SEU_PROJETO\ngcloud services enable pubsub.googleapis.com bigquery.googleapis.com\nPROJECT_ID=$(gcloud config get-value project)\nPROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")', p: 'Habilita as APIs e guarda o id e o número do projeto, necessário para a conta de serviço do Pub/Sub.' },
      { t: 'Criar dataset, tabela e tópico com schema', cmd: 'bq mk --dataset $PROJECT_ID:lab_pubsub\nbq mk --table lab_pubsub.eventos id:STRING,valor:INTEGER\ngcloud pubsub schemas create esquema-eventos --type=AVRO --definition=\'{"type":"record","name":"Evento","fields":[{"name":"id","type":"string"},{"name":"valor","type":"int"}]}\'\ngcloud pubsub topics create topico-eventos --schema=esquema-eventos --message-encoding=json', p: 'A tabela tem as mesmas colunas do schema Avro do tópico, o que permite à assinatura BigQuery usar o esquema do tópico.' },
      { t: 'Dar permissão e criar a assinatura BigQuery', cmd: 'bq add-iam-policy-binding --member="serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" --role=roles/bigquery.dataEditor --table=true $PROJECT_ID:lab_pubsub.eventos\ngcloud pubsub subscriptions create sub-bq --topic=topico-eventos --bigquery-table=$PROJECT_ID:lab_pubsub.eventos --use-topic-schema', p: 'A conta de serviço do Pub/Sub grava na tabela, então precisa de acesso de edição. O flag --table=true indica que o recurso é uma tabela. Se o comando de IAM de tabela não estiver disponível na sua versão do bq, conceda o papel pelo console na tabela. Confira os flags com gcloud pubsub subscriptions create --help.' },
      { t: 'Publicar e consultar', cmd: 'gcloud pubsub topics publish topico-eventos --message=\'{"id":"a1","valor":10}\'\ngcloud pubsub topics publish topico-eventos --message=\'{"id":"a2","valor":20}\'\nbq query --use_legacy_sql=false \'SELECT * FROM lab_pubsub.eventos\'', p: 'As linhas podem levar alguns segundos para aparecer. Mensagem fora do schema (por exemplo valor como texto) será rejeitada já na publicação, graças ao schema do tópico.' },
      { t: 'Forçar falha e cair na dead-letter', cmd: 'gcloud pubsub topics create topico-dlq\ngcloud pubsub subscriptions create sub-dlq-leitura --topic=topico-dlq\ngcloud pubsub topics create topico-simples\ngcloud pubsub subscriptions create sub-pull --topic=topico-simples --dead-letter-topic=topico-dlq --max-delivery-attempts=5\ngcloud pubsub topics add-iam-policy-binding topico-dlq --member="serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" --role=roles/pubsub.publisher\ngcloud pubsub subscriptions add-iam-policy-binding sub-pull --member="serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" --role=roles/pubsub.subscriber\ngcloud pubsub topics publish topico-simples --message="veneno"', p: 'Uma assinatura pull que nunca confirma a mensagem a reentrega; depois de 5 tentativas ela vai para topico-dlq. Para forçar as tentativas, faça pull sem ack repetidas vezes no próximo passo.' },
      { t: 'Receber sem confirmar até o encaminhamento', cmd: 'for i in 1 2 3 4 5 6; do gcloud pubsub subscriptions pull sub-pull --limit=1; sleep 12; done\ngcloud pubsub subscriptions pull sub-dlq-leitura --auto-ack', p: 'O pull sem --auto-ack deixa o ack deadline expirar (padrão 10 s), contando uma tentativa por entrega. Depois do limite, a mensagem aparece em sub-dlq-leitura.' }
    ],
    limpar: [
      'gcloud pubsub subscriptions delete sub-bq sub-pull sub-dlq-leitura',
      'gcloud pubsub topics delete topico-eventos topico-simples topico-dlq',
      'gcloud pubsub schemas delete esquema-eventos',
      'bq rm -r -f -d $PROJECT_ID:lab_pubsub'
    ],
    verificar: 'As linhas a1 e a2 aparecem na tabela lab_pubsub.eventos, e a mensagem "veneno" aparece na assinatura sub-dlq-leitura depois das tentativas esgotadas.'
  }
};
C.dias[9] = {
  aula: {
    titulo: 'Dataflow e Apache Beam I: o modelo de programação e a plataforma',
    simples: {
      analogia: 'Imagine uma cozinha industrial que faz marmitas. A **receita** está escrita num formato que qualquer cozinha entende: é o **Apache Beam**. A cozinha que a executa, contratando e dispensando ajudantes conforme o número de pedidos, é o **Dataflow**. Os ingredientes viajam em **bandejas**. Cada estação recebe uma bandeja e entrega outra, sem mexer na original. Cada ajudante trata um item de cada vez, e muitos ajudantes trabalham juntos. Agrupar todos os tomates numa só mesa obriga a carregar caixas de um lado para o outro, e isso é lento. Se cada ajudante conta os tomates que já tem e só leva o total para a mesa, o trabalho fica bem mais leve. Limite da analogia: numa cozinha as estações ficam lado a lado. No Dataflow elas rodam em máquinas diferentes, e a ordem dos itens não é garantida.',
      pontos: [
        '**Apache Beam** é o jeito de escrever o pipeline. **Dataflow** é quem o executa na nuvem.',
        'O mesmo código serve para dados em arquivo (batch) e dados contínuos (streaming).',
        'Uma **PCollection** é uma coleção de itens que nunca é alterada. Cada etapa gera outra.',
        'Agrupar por chave move dados entre máquinas e é caro. Prefira **Combine** para somar.',
        'Para atualizar um job de streaming sem perder estado, use **update**. Para desligar com cuidado, **drain**.',
        'Spark pronto? Dataproc. Dado já no BigQuery? SQL. Pipeline novo? Dataflow.'
      ],
      paraQueServe: 'Você usa isso quando precisa limpar, juntar e agregar muitos dados, em lote ou em fluxo, sem montar nem cuidar de servidores.'
    },
    glossario: [
      { t: 'Apache Beam', d: 'Biblioteca de código aberto para escrever pipelines de dados uma vez e rodar em vários executores.' },
      { t: 'Runner', d: 'O executor do pipeline. DirectRunner roda na sua máquina. DataflowRunner roda no Google Cloud.' },
      { t: 'Pipeline', d: 'O conjunto completo de etapas que lê, transforma e grava dados.' },
      { t: 'PCollection', d: 'Coleção distribuída e imutável de itens. Cada transformação recebe uma e produz outra.' },
      { t: 'ParDo e DoFn', d: 'ParDo aplica a sua função (DoFn) a cada item, em paralelo, em várias máquinas.' },
      { t: 'Shuffle', d: 'A troca de dados entre máquinas para juntar itens da mesma chave. É a parte mais cara.' },
      { t: 'Bounded e unbounded', d: 'Bounded: dados com fim, como arquivos. Unbounded: fluxo que não termina, como um tópico.' },
      { t: 'Autoscaling', d: 'O serviço aumenta ou diminui o número de máquinas (workers) conforme a carga.' },
      { t: 'Flex Template', d: 'Pipeline empacotado em imagem de contêiner, que qualquer pessoa executa só passando parâmetros.' },
      { t: 'Drain', d: 'Desligar um job de streaming terminando o que já foi lido, sem perder dados em andamento.' }
    ],
    checagem: [
      'Sem olhar a aula: qual a diferença entre Beam e Dataflow?',
      'Por que somar com Combine é melhor do que agrupar por chave e somar depois?',
      'Você precisa mudar o código de um job de streaming sem perder dados. Qual ação usa, e por quê?',
      'Quando você escolheria Dataproc, SQL no BigQuery ou Dataflow?'
    ],
    resumo: 'Aprenda o modelo do Beam (Pipeline, PCollection, ParDo, GroupByKey, Combine, side inputs), os recursos do Dataflow (autoscaling, Streaming Engine, Shuffle, FlexRS, templates) e como escolher e operar Dataflow frente a Dataproc, BigQuery SQL e Data Fusion.',
    blocos: [
      {
        t: 'Beam é o modelo; Dataflow é o executor gerenciado',
        facil: 'Traduzindo: Beam é a receita escrita num formato universal. Dataflow é a cozinha do Google que executa a receita e contrata os ajudantes (workers) sozinha. Para pipeline novo, escolha Dataflow.',
        p: [
          'Apache Beam é um modelo de programação unificado para batch e streaming, com SDKs em Java, Python e Go. Você escreve o pipeline uma vez e escolhe o runner: DirectRunner (local, para testes), DataflowRunner (Google Cloud), Flink, Spark. Dataflow é o serviço serverless do Google Cloud que executa pipelines Beam: provisiona workers, escala, rebalanceia o trabalho, cuida de falhas e integra com Pub/Sub, BigQuery, Cloud Storage, Bigtable, Spanner e outros.',
          'A ideia central que sustenta tudo: o mesmo código processa dados limitados (bounded, como arquivos) e ilimitados (unbounded, como um fluxo do Pub/Sub). Em batch, a PCollection é limitada; em streaming, é ilimitada e exige pensar em janelas (dia 10).'
        ],
        dica: 'Para pipeline NOVO, serverless, batch ou streaming, a resposta padrão é Dataflow. Para reaproveitar código Spark/Hadoop existente, Dataproc.'
      },
      {
        t: 'Os blocos do Beam: Pipeline, PCollection e transformações',
        facil: 'Traduzindo: os dados passam por etapas. Cada etapa recebe uma coleção, não altera a original e entrega outra. Para somar, use Combine: soma localmente antes de enviar e gasta menos rede.',
        p: [
          'Pipeline é o grafo completo. PCollection é um conjunto de elementos imutável e distribuído: cada transformação recebe PCollections e produz outras, nunca altera a de entrada. Uma PTransform é uma etapa (leitura, ParDo, GroupByKey, escrita). O grafo é montado de forma declarativa e o runner o otimiza (por exemplo, fusão de etapas) antes de executar.',
          'Exemplo em Python, contando palavras de arquivos de texto:',
          'import apache_beam as beam\nfrom apache_beam.options.pipeline_options import PipelineOptions\n\nwith beam.Pipeline(options=PipelineOptions()) as p:\n    (p\n     | "Ler" >> beam.io.ReadFromText("gs://bucket/entrada/*.txt")\n     | "Palavras" >> beam.FlatMap(lambda linha: linha.split())\n     | "Par" >> beam.Map(lambda w: (w.lower(), 1))\n     | "Somar" >> beam.CombinePerKey(sum)\n     | "Formatar" >> beam.MapTuple(lambda w, n: f"{w},{n}")\n     | "Gravar" >> beam.io.WriteToText("gs://bucket/saida/contagem"))'
        ],
        lista: [
          'Map: um elemento entra, um sai. FlatMap: um entra, zero ou mais saem. Filter: mantém ou descarta.',
          'ParDo: a transformação genérica que roda uma DoFn por elemento, em paralelo; permite saídas múltiplas (tagged outputs), estado e timers.',
          'GroupByKey: agrupa por chave e causa shuffle, ou seja, troca de dados entre workers. É a operação mais cara e é onde aparecem chaves quentes (hot keys).',
          'CombinePerKey / Combine: agregação associativa e comutativa (soma, contagem, média via CombineFn). O runner faz pré-agregação em cada worker antes do shuffle (combiner lifting), por isso Combine é muito mais eficiente que GroupByKey seguido de soma manual.',
          'Flatten: junta várias PCollections do mesmo tipo. Partition: divide uma PCollection em várias.',
          'CoGroupByKey: join de várias PCollections por chave.'
        ],
        armadilha: 'GroupByKey seguido de soma no código do usuário move todos os valores pela rede. Se a operação é associativa e comutativa, use Combine.'
      },
      {
        t: 'ParDo na prática, side inputs e saídas de erro',
        facil: 'Traduzindo: dados de apoio pequenos podem ser entregues inteiros a cada worker (side input). Linhas com defeito vão para uma saída de erros, para não travar o pipeline inteiro.',
        p: [
          'Side input é uma PCollection pequena, entregue inteira a cada worker, para enriquecer a PCollection principal (uma tabela de referência, um limite de configuração). Formas: AsSingleton, AsList, AsDict. Se o dado de referência é grande, side input não serve: use CoGroupByKey ou consulte uma base de baixa latência como Bigtable. Em streaming, o side input fica na janela correspondente e pode ser recarregado periodicamente.',
          'Padrão clássico de qualidade de dados: dead-letter dentro do pipeline. Em vez de deixar uma exceção derrubar o worker repetidamente, a DoFn captura o erro e emite o elemento ruim em uma saída com tag para gravar em uma tabela ou bucket de erros.',
          'class Parse(beam.DoFn):\n    OK, ERRO = "ok", "erro"\n    def process(self, linha):\n        import json\n        try:\n            yield json.loads(linha)\n        except Exception:\n            yield beam.pvalue.TaggedOutput(self.ERRO, linha)\n\nres = linhas | beam.ParDo(Parse()).with_outputs(Parse.ERRO, main=Parse.OK)\nres[Parse.OK] | beam.io.WriteToBigQuery("proj:ds.tabela")\nres[Parse.ERRO] | beam.io.WriteToText("gs://bucket/erros/linhas")',
          'Cuidado: em Dataflow batch, um elemento que falha sempre faz o item de trabalho ser repetido algumas vezes antes de falhar o job; em streaming, o item é repetido indefinidamente e o pipeline fica travado. Por isso o padrão de dead-letter em código é essencial.'
        ]
      },
      {
        t: 'Recursos do Dataflow que caem em prova',
        facil: 'Traduzindo: esta tabela é um cardápio de recursos que reduzem custo e trabalho. Cada um resolve um problema específico. FlexRS, por exemplo, só serve para batch que pode esperar.',
        tabela: {
          cab: ['Recurso', 'O que faz', 'Quando importa'],
          linhas: [
            ['Autoscaling horizontal', 'Ajusta o número de workers conforme backlog e uso de CPU, até o máximo (max-num-workers).', 'Cargas variáveis. Defina um máximo para controlar custo.'],
            ['Streaming Engine', 'Move o estado de janelas e o shuffle de streaming do disco dos workers para o back-end do serviço.', 'Reduz CPU, memória e disco dos workers e melhora o autoscaling de streaming.'],
            ['Dataflow Shuffle', 'Mesmo conceito para batch: o shuffle sai dos workers para o serviço.', 'Jobs batch com muito GroupByKey; workers menores e mais rápidos.'],
            ['FlexRS', 'Agendamento flexível para batch: o job é enfileirado e iniciado em até 6 horas, e usa uma mistura de VMs preemptíveis (Spot) e padrão com desconto. Habilita o Dataflow Shuffle automaticamente.', 'Batch tolerante a atraso e sensível a custo. Não existe para streaming.'],
            ['Dataflow Prime', 'Opção de execução com Vertical Autoscaling (ajuste automático de memória dos workers, junto do autoscaling horizontal). Right fitting é um recurso opcional à parte, disponível também no Dataflow padrão.', 'Pipelines com uso de memória difícil de dimensionar (evita erros de falta de memória). Não é compatível com FlexRS. Confira na documentação os recursos atuais.'],
            ['Templates clássicos e Flex Templates', 'Empacotam o pipeline para rodar sem ambiente de desenvolvimento: Flex Templates guardam uma imagem de contêiner e metadados e aceitam parâmetros em tempo de execução.', 'Operação e CI/CD: quem executa não precisa do código-fonte. Prefira Flex Templates.'],
            ['Templates fornecidos pelo Google', 'Pipelines prontos (Pub/Sub para BigQuery, Text para BigQuery, Cloud Storage para Pub/Sub, e outros).', 'Cenários padrão sem escrever código.']
          ]
        },
        p: [
          'Workers rodam em Compute Engine, na região do job. Use conta de serviço de worker dedicada com o papel Dataflow Worker e acesso mínimo às fontes e destinos. Para segurança de rede: workers sem IP externo (Private Google Access na sub-rede), CMEK para criptografia do estado e VPC compartilhada quando exigido.'
        ],
        armadilha: 'FlexRS só vale para batch. Se o enunciado fala em streaming e custo, a resposta é ajustar autoscaling, Streaming Engine ou o modo de streaming at-least-once (quando duplicatas são toleráveis), não FlexRS.'
      },
      {
        t: 'Operar um job: update, drain, cancel e snapshots',
        facil: 'Traduzindo: para trocar o código de um job de streaming sem perder nada, use update. Drain desliga com cuidado, terminando o que já foi lido. Cancel para na hora e descarta o que estava em andamento.',
        tabela: {
          cab: ['Ação', 'Efeito', 'Quando usar'],
          linhas: [
            ['Update (substituição em andamento)', 'Lança um novo job que substitui o antigo mantendo o estado, desde que o grafo seja compatível (nomes de etapas ou mapeamento de transformações).', 'Corrigir bug ou mudar lógica de streaming sem perder estado nem dados.'],
            ['Drain', 'Para de ler novas entradas, termina o trabalho em andamento, dispara as janelas abertas e encerra.', 'Desligar streaming com segurança sem perder dados em voo (o dado já lido é processado).'],
            ['Cancel', 'Encerra imediatamente, descartando o trabalho em andamento.', 'Quando perder o dado em voo não importa (teste, dados reprocessáveis).'],
            ['Snapshot', 'Foto do estado de um job de streaming (inclui o estado da fonte Pub/Sub), para iniciar um novo job a partir daquele ponto.', 'Mudanças incompatíveis com update, migração de região, testes com reprocesso.']
          ]
        },
        p: [
          'Se a mudança é incompatível com update (por exemplo, mudar a estrutura do grafo ou o tipo de chave), use drain e inicie um novo job, ou use snapshot. O drain não é ideal se a janela é global e não fecha: o estado aberto pode ser descartado ou emitido parcialmente, então confira a documentação para o seu caso.'
        ],
        dica: 'Resposta de prova para "atualizar o código de um pipeline de streaming sem perder dados e sem duplicar": update de job em andamento; se incompatível, drain e novo job (ou snapshot).'
      },
      {
        t: 'Dataflow x Dataproc x BigQuery SQL x Data Fusion',
        facil: 'Traduzindo: escolha pela situação. Pipeline novo: Dataflow. Código Spark pronto: Dataproc. Dado já no BigQuery e SQL resolve: use SQL. Equipe que prefere arrastar blocos na tela: Data Fusion.',
        tabela: {
          cab: ['Cenário', 'Escolha', 'Motivo'],
          linhas: [
            ['Pipeline novo, batch ou streaming, sem gerenciar cluster', 'Dataflow', 'Serverless, autoscaling, janelas e dados atrasados nativos.'],
            ['Já existe código Spark, Hadoop ou Hive e se quer mudar pouco', 'Dataproc (ou Serverless for Apache Spark)', 'Compatibilidade com o ecossistema, migração com ajuste mínimo.'],
            ['Transformação sobre dados que já estão no BigQuery', 'SQL no BigQuery (Dataform, consulta agendada)', 'Sem mover dado, sem infraestrutura, cobrança por consulta ou slot.'],
            ['Equipe prefere interface visual, integração com muitas fontes, sem código', 'Data Fusion', 'ETL visual (CDAP) que executa em Dataproc; custo de instância fixo por hora.'],
            ['Streaming com janelas, joins por tempo, dados atrasados e exactly-once', 'Dataflow', 'Modelo de tempo de evento do Beam.']
          ]
        },
        p: [
          'Regra de ouro de custo e simplicidade: se SQL resolve e o dado está no BigQuery, use SQL. Mover dado para fora só para transformá-lo e devolvê-lo costuma ser a opção errada.'
        ]
      }
    ],
    exemplo: {
      t: 'Escolhendo e implantando um pipeline de logs',
      texto: 'Uma empresa precisa ler logs JSON do Cloud Storage todas as noites, limpar campos, juntar com uma tabela de 5 mil linhas de clientes e gravar no BigQuery, tolerando atraso de horas para pagar menos. Passo 1: o job é batch e novo, portanto Dataflow. Passo 2: a tabela de clientes é pequena, então entra como side input AsDict, evitando um shuffle. Passo 3: linhas com JSON inválido saem por TaggedOutput para um bucket de erros. Passo 4: como tolera atraso e é batch, o job roda com FlexRS para usar VMs Spot e desconto. Passo 5: o pipeline é empacotado como Flex Template e disparado por um orquestrador (Composer ou Scheduler) com parâmetros de data. Passo 6: workers sem IP externo e conta de serviço dedicada atendem a segurança. Se o time só tivesse jobs Spark prontos, a escolha mudaria para Dataproc efêmero.'
    },
    prova: [
      'Palavras-chave "serverless", "unified batch and streaming", "autoscaling" e "minimal operations" apontam para Dataflow; "existing Spark/Hadoop jobs" e "minimal code changes" apontam para Dataproc.',
      '"Batch, cost-effective, flexible time" aponta para FlexRS; "reduce worker resources/improve streaming autoscaling" aponta para Streaming Engine; "run without development environment / parameterized" aponta para Flex Template.',
      '"Update a streaming pipeline without losing data" aponta para update ou drain; "enrich with small reference table" aponta para side input; "aggregation is slow due to shuffle" aponta para Combine em vez de GroupByKey.'
    ],
    explique: 'Explique sem consultar: a diferença entre Beam e Dataflow, por que Combine é melhor que GroupByKey para somar, e quando você escolheria Dataflow, Dataproc, SQL no BigQuery ou Data Fusion.'
  },
  cartoes: [
    { id: 'd9c1', t: '2.2', f: 'Qual a diferença entre Apache Beam e Dataflow?', v: 'Beam é o modelo de programação e SDK (portável entre runners). Dataflow é o runner serverless gerenciado do Google Cloud que executa pipelines Beam.' },
    { id: 'd9c2', t: '2.2', f: 'O que é uma PCollection?', v: 'Um conjunto distribuído e imutável de elementos, limitado (batch) ou ilimitado (streaming). Cada transformação gera uma nova PCollection.' },
    { id: 'd9c3', t: '2.2', f: 'Por que preferir Combine a GroupByKey seguido de soma?', v: 'Combine é associativo e comutativo, permitindo pré-agregação em cada worker (combiner lifting) antes do shuffle, reduzindo dados na rede.' },
    { id: 'd9c4', t: '2.2', f: 'Quando usar side input e quando não?', v: 'Para enriquecer com um conjunto pequeno de referência entregue a cada worker (AsSingleton, AsList, AsDict). Para dado grande, use CoGroupByKey ou lookup em Bigtable.' },
    { id: 'd9c5', t: '2.2', f: 'O que o Streaming Engine faz?', v: 'Move estado de janelas e shuffle de streaming dos workers para o back-end do serviço Dataflow, reduzindo recursos dos workers e melhorando o autoscaling.' },
    { id: 'd9c6', t: '5.1', f: 'Para que serve FlexRS e qual seu limite?', v: 'Batch barato: enfileira o job e o inicia em até 6 horas, usando VMs preemptíveis (Spot) e padrão com desconto. Não existe para streaming.' },
    { id: 'd9c7', t: '2.3', f: 'Qual a vantagem de Flex Templates?', v: 'Empacotam o pipeline em imagem de contêiner com parâmetros de execução, permitindo rodar sem ambiente de desenvolvimento, ideal para CI/CD e orquestração.' },
    { id: 'd9c8', t: '2.2', f: 'Diferença entre drain e cancel num job de streaming.', v: 'Drain para de ler, processa o que já foi lido, dispara janelas e encerra sem perder dado em voo. Cancel encerra na hora e descarta o trabalho em andamento.' },
    { id: 'd9c9', t: '2.2', f: 'Como atualizar um pipeline de streaming mantendo o estado?', v: 'Update (substituição de job em andamento) com grafo compatível. Se incompatível, drain e novo job, ou snapshot para iniciar a partir do estado salvo.' },
    { id: 'd9c10', t: '2.2', f: 'Como tratar elementos malformados sem derrubar o pipeline?', v: 'Capture a exceção na DoFn e emita o elemento em uma saída com tag (TaggedOutput) para gravar numa tabela ou bucket de erros (dead-letter no pipeline).' },
    { id: 'd9c11', t: '2.2', f: 'Quando Dataproc é melhor que Dataflow?', v: 'Quando já existem jobs Spark, Hadoop ou Hive e se quer migrar com o mínimo de reescrita. Para pipelines novos e serverless, Dataflow.' },
    { id: 'd9c12', t: '2.2', f: 'Qual operação do Beam é a mais cara e onde surgem hot keys?', v: 'GroupByKey, pelo shuffle entre workers. Chaves muito frequentes concentram dados em um worker; mitigue com fanout de chave quente em Combine.' },
    { id: 'd9c13', t: '2.2', f: 'Quando preferir SQL no BigQuery a um pipeline Dataflow?', v: 'Quando os dados já estão no BigQuery e a transformação cabe em SQL: não move dado, não tem infraestrutura e usa Dataform ou consulta agendada.' },
    { id: 'd9c14', t: '2.2', f: 'Qual runner do Beam usar para testar localmente?', v: 'DirectRunner, que executa em memória na sua máquina, sem custo de nuvem. Valide a lógica antes de rodar no DataflowRunner.' }
  ],
  questoes: [
    {
      id: 'd9q1', s: 2, t: '2.2',
      e: 'A company has hundreds of existing Spark jobs on Hadoop and wants to move to Google Cloud quickly with minimal code changes. Which service should it use to run them?',
      o: ['Dataflow with a rewrite to Apache Beam.', 'Dataproc, using ephemeral clusters or Serverless for Apache Spark.', 'BigQuery scheduled queries.', 'Cloud Functions triggered by Pub/Sub.'],
      c: [1],
      x: 'Dataproc (ou Serverless for Apache Spark) executa Spark e Hadoop com pouca ou nenhuma mudança de código, atendendo à migração rápida. Reescrever centenas de jobs em Beam com Dataflow é viável, mas contraria o requisito de mínimas mudanças. Consultas agendadas do BigQuery exigiriam reescrever tudo em SQL. Cloud Functions não é plataforma de processamento distribuído para jobs Spark e tem limites de tempo e memória.'
    },
    {
      id: 'd9q2', s: 2, t: '2.2',
      e: 'A batch Dataflow job runs nightly and has no deadline before morning. The team wants to reduce its cost as much as possible without changing the code. What should they do?',
      o: ['Enable Flexible Resource Scheduling (FlexRS) for the job.', 'Convert the job to streaming mode.', 'Disable autoscaling and use the largest machine type.', 'Move the job to a different Cloud Storage bucket.'],
      c: [0],
      x: 'FlexRS foi criado para batch tolerante a atraso: agenda o job com flexibilidade de horário e usa mistura de VMs Spot e padrão com desconto, sem mudar código. Converter para streaming aumenta custo e não se aplica a dados limitados. Desabilitar autoscaling com máquinas grandes tende a gastar mais. Trocar de bucket não altera o custo de processamento.'
    },
    {
      id: 'd9q3', s: 2, t: '2.2',
      e: 'A Beam pipeline sums transaction amounts per customer. It is slow because it uses GroupByKey and then sums the values in a Python loop. What is the BEST improvement?',
      o: ['Replace the logic with CombinePerKey(sum) so partial sums happen before the shuffle.', 'Use a larger side input with all transactions.', 'Switch to the DirectRunner for production.', 'Add a Flatten transform before the GroupByKey.'],
      c: [0],
      x: 'Soma é associativa e comutativa, então CombinePerKey permite pré-agregar em cada worker e embaralhar apenas somas parciais, reduzindo tráfego de rede e memória. Side input com todas as transações seria enorme e não serve a esse propósito. DirectRunner é local e não é para produção em escala. Flatten apenas une PCollections e não muda o custo do shuffle.'
    },
    {
      id: 'd9q4', s: 2, t: '2.2',
      e: 'A streaming Dataflow pipeline must be updated with a bug fix. The team cannot lose in-flight data or duplicate results. The new code keeps the same pipeline graph. Which approach is BEST?',
      o: ['Cancel the job and start a new one from scratch.', 'Update the running job by launching a replacement job with the update option.', 'Delete the Pub/Sub subscription and recreate it.', 'Drain the job and delete its staging bucket.'],
      c: [1],
      x: 'O update de job em andamento substitui o pipeline preservando o estado, desde que o grafo seja compatível, sem perder dados nem duplicar. Cancel descarta o trabalho em voo e perde estado de janelas. Apagar a assinatura perde as mensagens pendentes. Drain seria uma opção válida se o update fosse incompatível, mas apagar o bucket de staging não faz sentido e quebraria o relançamento.'
    },
    {
      id: 'd9q5', s: 2, t: '2.2',
      e: 'A team wants to reduce worker CPU, memory and disk usage in a streaming Dataflow job and improve its autoscaling responsiveness. Which two options help? Choose two.',
      o: ['Enable Streaming Engine.', 'Enable FlexRS.', 'Move window state and shuffle to the Dataflow service backend rather than worker disks.', 'Switch to the DirectRunner.', 'Use Dataflow Shuffle for batch only.'],
      c: [0, 2],
      x: 'Streaming Engine é a funcionalidade que move estado de janelas e shuffle de streaming para o back-end do serviço, aliviando os workers e melhorando o autoscaling; a opção de mover estado e shuffle descreve exatamente esse mecanismo. FlexRS é exclusivo de batch. DirectRunner executa localmente e não é solução de produção. Dataflow Shuffle é o equivalente para batch e, sozinho, não ajuda um job de streaming.'
    },
    {
      id: 'd9q6', s: 2, t: '2.2',
      e: 'You need to enrich a stream of orders with a 2,000-row currency table that changes rarely. The pipeline runs on Dataflow. What is the MOST efficient approach?',
      o: ['Perform a CoGroupByKey with the table on every element.', 'Query BigQuery for each order inside the DoFn.', 'Pass the table as a side input (for example AsDict) to the ParDo.', 'Publish the table to Pub/Sub for each order.'],
      c: [2],
      x: 'Side input é ideal para conjuntos pequenos de referência: cada worker recebe a tabela inteira e faz lookup local, sem shuffle e sem chamadas externas. CoGroupByKey faz shuffle e se justifica para dados grandes de ambos os lados. Consultar o BigQuery por pedido gera latência, custo e limites de cota. Publicar a tabela no Pub/Sub para cada pedido é um desenho sem sentido que multiplica tráfego.'
    },
    {
      id: 'd9q7', s: 2, t: '2.2',
      e: 'A data engineer needs to ingest CSV files from Cloud Storage into BigQuery using a prebuilt solution, with no custom code, and run it on demand with different file paths. Which option meets this requirement?',
      o: ['Write a custom Beam pipeline and run it from a laptop.', 'Launch a Google-provided Dataflow template (Text Files on Cloud Storage to BigQuery) with runtime parameters.', 'Create a Dataproc cluster and install a custom script.', 'Use a Pub/Sub push subscription.'],
      c: [1],
      x: 'Os templates fornecidos pelo Google resolvem cenários comuns sem código e aceitam parâmetros em tempo de execução, como caminhos de arquivo. Escrever pipeline próprio contraria o requisito de nenhum código. Dataproc com script personalizado é mais operação. Pub/Sub push não lê arquivos do Cloud Storage; é um mecanismo de entrega de mensagens.'
    },
    {
      id: 'd9q8', s: 2, t: '2.2',
      e: 'A company stores sales data in BigQuery and needs a daily aggregation that joins two tables and writes the result to another BigQuery table. The team wants the simplest and cheapest approach. What should they choose?',
      o: ['A Dataflow batch pipeline reading from BigQuery.', 'A Dataproc cluster with Spark SQL.', 'A scheduled query or Dataform workflow running SQL inside BigQuery.', 'A Data Fusion pipeline running on a persistent instance.'],
      c: [2],
      x: 'Quando os dados já estão no BigQuery e a lógica cabe em SQL, consulta agendada ou Dataform executa dentro do serviço, sem mover dados e sem infraestrutura. Dataflow, Dataproc e Data Fusion exigem tirar os dados do BigQuery, provisionar recursos e operar um pipeline, custando mais e complicando sem ganho. Data Fusion ainda mantém custo fixo da instância.'
    },
    {
      id: 'd9q9', s: 2, t: '2.2',
      e: 'A streaming pipeline stops repeatedly because one malformed JSON message throws an exception in a DoFn, and Dataflow keeps retrying that element. How should the pipeline be redesigned?',
      o: ['Increase max workers to retry faster.', 'Catch the exception in the DoFn and emit the bad record to a tagged side output that is written to an error table.', 'Switch the job to batch mode.', 'Disable the Streaming Engine.'],
      c: [1],
      x: 'Em streaming, o item que falha é repetido indefinidamente e trava o pipeline. Capturar a exceção e enviar o registro ruim para uma saída com tag (dead-letter dentro do pipeline) mantém o fluxo e preserva o dado para análise. Aumentar workers não muda o fato de o mesmo elemento falhar. Modo batch não se aplica a fonte ilimitada e não resolve o erro. Desabilitar Streaming Engine não tem relação com a falha do elemento.'
    },
    {
      id: 'd9q10', s: 2, t: '2.2',
      e: 'An analytics team wants a visual, low-code way to build ETL from many source systems into BigQuery, and accepts that jobs run on managed Spark clusters under the hood. Which service fits?',
      o: ['Cloud Data Fusion.', 'Pub/Sub BigQuery subscription.', 'Cloud Tasks.', 'Bigtable change streams.'],
      c: [0],
      x: 'Cloud Data Fusion é a ferramenta de ETL visual, baseada em CDAP, com muitos conectores e execução em Dataproc. A BigQuery subscription só grava mensagens do Pub/Sub, sem ETL visual. Cloud Tasks despacha tarefas HTTP e não integra fontes de dados. Change streams do Bigtable emitem alterações da tabela e não são ferramenta de ETL.'
    }
  ],
  lab: {
    t: 'Pipeline Beam local (DirectRunner) e, opcionalmente, template do Google no Dataflow',
    tempo: '25 a 40 minutos',
    antes: 'Você precisa de Python instalado e de um terminal. Pode ser o seu computador ou o Cloud Shell, que já tem Python. A instalação do pacote apache-beam leva alguns minutos e imprime muitas linhas de "Collecting" e "Installing". Ao final, aparece "Successfully installed". Ao rodar o script, o terminal mostra pares como ("beam", 2), sem janela nem botão. A parte opcional exige projeto com cobrança. No console, em Dataflow, menu Jobs, você vê o grafo do job com caixinhas ligadas por setas, o estado (Running, Succeeded) e o número de workers. O job de exemplo termina em poucos minutos. Confira a limpeza no fim.',
    erros: [
      { s: 'pip falha ao instalar apache-beam ou erro de versão do Python', c: 'A versão do Python é nova ou antiga demais para o SDK do Beam.', r: 'Veja as versões de Python aceitas na documentação do Beam. Crie o ambiente virtual com uma delas e rode o pip install de novo.' },
      { s: '"source" não é reconhecido (Windows)', c: 'O comando source é do Linux. No Windows o ambiente virtual é ativado de outro jeito.', r: 'No Windows, rode venv\\Scripts\\activate. Ou use o Cloud Shell, onde o comando source funciona.' },
      { s: 'Dataflow API has not been used in project', c: 'A API do Dataflow não está habilitada.', r: 'Rode gcloud services enable dataflow.googleapis.com, espere cerca de um minuto e repita o comando.' },
      { s: 'Falha ao criar o bucket: nome já existe ou permissão negada', c: 'Nomes de bucket são únicos no mundo todo, ou sua conta não pode criar buckets.', r: 'Escolha um nome mais único, por exemplo com o id do projeto. Confira o projeto ativo e suas permissões.' },
      { s: 'Job com erro de permissão ou cota ao subir workers', c: 'A conta de serviço dos workers sem acesso ao bucket, ou a cota de máquinas da região esgotada.', r: 'Dê acesso de escrita ao bucket. Se for cota, repita em outra região (e use a mesma região no comando e no bucket).' }
    ],
    custo: 'US$ 0 na parte local. A parte opcional no Dataflow usa 1 worker por poucos minutos: centavos a poucos dólares dependendo da região; limpeza obrigatória.',
    porque: 'Você escreve e entende o grafo Beam sem custo, depois vê o mesmo conceito rodando no Dataflow: grafo, workers, autoscaling e métricas.',
    passos: [
      { t: 'Criar ambiente local', cmd: 'python -m venv venv\nsource venv/bin/activate   # no Windows: venv\\Scripts\\activate\npip install "apache-beam[gcp]"', p: 'Instala o SDK do Beam com as extras do Google Cloud. Use uma versão de Python compatível com o SDK (confira na documentação do Beam).' },
      { t: 'Escrever o pipeline (arquivo contagem.py)', cmd: 'cat > contagem.py <<\'EOF\'\nimport apache_beam as beam\nlinhas = ["ola mundo", "ola beam", "beam e dataflow"]\nwith beam.Pipeline() as p:\n    (p | beam.Create(linhas)\n       | beam.FlatMap(lambda l: l.split())\n       | beam.Map(lambda w: (w, 1))\n       | beam.CombinePerKey(sum)\n       | beam.Map(print))\nEOF', p: 'Sem opções de runner, o Beam usa o DirectRunner. Troque o Combine por GroupByKey e some em Python para perceber a diferença conceitual.' },
      { t: 'Rodar localmente', cmd: 'python contagem.py', p: 'Imprime pares como ("beam", 2). Inclua uma saída com tag para linhas inválidas e teste o padrão de dead-letter.' },
      { t: 'Opcional: template do Google no Dataflow', cmd: 'gcloud services enable dataflow.googleapis.com\ngcloud storage buckets create gs://SEU_BUCKET_LAB --location=us-central1\ngcloud dataflow jobs run lab-wordcount --gcs-location=gs://dataflow-templates/latest/Word_Count --region=us-central1 --max-workers=1 --parameters=inputFile=gs://dataflow-samples/shakespeare/kinglear.txt,output=gs://SEU_BUCKET_LAB/saida/contagem', p: 'Roda o template Word_Count com no máximo 1 worker. Caminho e parâmetros (inputFile e output, este último um prefixo de arquivos) conforme o exemplo oficial "Run a sample template"; a CLI gcloud precisa estar atualizada. Alternativa: template Text Files on Cloud Storage to BigQuery.' },
      { t: 'Olhar grafo e métricas', p: 'No console, abra Dataflow, Jobs, o job criado: veja o grafo, o número de workers, a vazão e os logs. Observe que o grafo mostra etapas fundidas e qual etapa causa shuffle.' }
    ],
    limpar: [
      'gcloud dataflow jobs list --region=us-central1 --status=active   # confirme que nada ficou rodando',
      'gcloud dataflow jobs cancel ID_DO_JOB --region=us-central1   # só se ainda estiver ativo',
      'gcloud storage rm -r gs://SEU_BUCKET_LAB'
    ],
    verificar: 'Localmente você vê as contagens impressas; no Dataflow (opcional) o job chega ao estado Succeeded e há arquivos de saída no bucket.'
  }
};
C.dias[10] = {
  aula: {
    titulo: 'Beam II: streaming, janelas, watermark e dados atrasados',
    simples: {
      analogia: 'Você trabalha num setor que conta cartas de reclamação por dia. Cada carta tem dois horários: o **carimbo postal**, que diz quando foi escrita e enviada, e o **relógio da parede**, que marca quando chegou na sua mesa. Os dois nem sempre combinam, porque cartas atrasam. Para o negócio, vale o carimbo, o **tempo de evento**. Você separa as cartas em pilhas por dia do carimbo: são as **janelas**. O chefe do correio diz: "acho que todas as cartas de terça já chegaram". Esse palpite é o **watermark**. Quando ele passa de terça, você anota o total. É o **gatilho**. Carta de terça que chega depois ainda entra, se a pasta de terça continuar aberta pelo prazo combinado (**allowed lateness**). Depois do prazo, a carta é descartada sem aviso. Limite da analogia: o palpite do watermark é calculado pelo sistema, não por uma pessoa, e pode errar.',
      pontos: [
        '**Tempo de evento** é quando o fato aconteceu. **Tempo de processamento** é quando o pipeline o vê.',
        'Em streaming, agrupe pelo tempo de evento, porque os dados chegam fora de ordem.',
        'A **janela** define o intervalo do tempo de evento que cada resultado cobre.',
        'O **watermark** é a estimativa de que já chegou tudo até certo horário. É um palpite.',
        'O **gatilho** decide quando emitir. O **allowed lateness** decide até quando aceitar atrasados.',
        'Dado atrasado fora do prazo é descartado sem erro. O padrão do prazo é zero.'
      ],
      paraQueServe: 'Você usa isso quando precisa de contagens e médias por período em dados ao vivo, como cliques por minuto, e os dados chegam atrasados ou fora de ordem.'
    },
    glossario: [
      { t: 'Event time (tempo de evento)', d: 'O horário em que o fato realmente aconteceu, gravado no próprio dado.' },
      { t: 'Processing time (tempo de processamento)', d: 'O horário em que o pipeline processa o dado. Depende de rede e filas.' },
      { t: 'Window (janela)', d: 'Um intervalo de tempo de evento que agrupa itens para uma agregação, como cada minuto.' },
      { t: 'Watermark', d: 'Estimativa do sistema de que todos os dados até certo horário de evento já chegaram.' },
      { t: 'Trigger (gatilho)', d: 'A regra que diz quando o resultado de uma janela é emitido.' },
      { t: 'Allowed lateness', d: 'Por quanto tempo depois do fim da janela dados atrasados ainda são aceitos. O padrão é zero.' },
      { t: 'Late data (dado atrasado)', d: 'Dado cujo horário de evento já ficou para trás do watermark quando ele chega.' },
      { t: 'Accumulation mode', d: 'Define se cada novo disparo da janela traz o total acumulado ou só a novidade.' },
      { t: 'Deduplicação', d: 'Descartar repetições do mesmo evento, em geral usando um identificador único.' },
      { t: 'Backfill', d: 'Reprocessar um período do passado, por exemplo relendo dados guardados.' }
    ],
    checagem: [
      'Sem olhar a aula: qual a diferença entre tempo de evento e tempo de processamento? Dê um exemplo.',
      'O que é o watermark e por que ele é só um palpite?',
      'Qual a diferença entre gatilho e allowed lateness?',
      'Seu pipeline de streaming nunca emite resultado. Que duas coisas você verifica?'
    ],
    resumo: 'Domine tempo de evento x tempo de processamento, watermark, janelas fixed, sliding, session e global, gatilhos, allowed lateness, modos de acumulação, deduplicação e exatidão (exactly-once) em pipelines de streaming no Dataflow.',
    blocos: [
      {
        t: 'O problema: dados chegam fora de ordem e atrasados',
        facil: 'Traduzindo: o que importa é quando o fato aconteceu, não quando o dado chegou. Como dados atrasam e se embaralham, o Beam agrupa pelo horário do evento.',
        p: [
          'Em streaming, o relógio que importa para o negócio é o tempo de evento (event time): quando o fato aconteceu (o clique, a leitura do sensor). O tempo de processamento (processing time) é quando o pipeline vê o dado. Eles divergem: celulares ficam sem sinal, filas acumulam, redes falham. Se você agrupar por tempo de processamento, o resultado depende da saúde da rede, não do que aconteceu. Por isso o Beam agrupa por tempo de evento.',
          'Para isso, cada elemento carrega um timestamp. Em Pub/Sub, o padrão é o tempo de publicação; para usar o horário real do evento, informe um atributo da mensagem com timestamp_attribute na leitura (ou atribua o timestamp em uma DoFn). Se o timestamp do evento for muito antigo em relação ao watermark, o dado nasce "atrasado".',
          'Quatro perguntas organizam todo o modelo de streaming do Beam: O QUE se calcula (transformações), ONDE no tempo de evento (janelas), QUANDO no tempo de processamento o resultado é emitido (gatilhos e watermark) e COMO os refinamentos se relacionam (modo de acumulação).'
        ],
        dica: 'Questão de janela quase sempre se resolve respondendo as quatro perguntas na ordem: o quê, onde, quando, como.'
      },
      {
        t: 'Janelas: onde no tempo de evento',
        facil: 'Traduzindo: janela é a gaveta do tempo onde você junta eventos. Fixa: gavetas iguais. Deslizante: gavetas que se sobrepõem. Sessão: a gaveta fecha quando há um silêncio longo.',
        tabela: {
          cab: ['Janela', 'Como é', 'Uso típico', 'Observação'],
          linhas: [
            ['Fixed (tumbling)', 'Intervalos de tamanho fixo e sem sobreposição (ex.: 1 minuto).', 'Contagem por minuto ou por hora, relatórios periódicos.', 'Cada evento cai em exatamente uma janela.'],
            ['Sliding (hopping)', 'Tamanho fixo que avança por um período menor, com sobreposição (ex.: 10 min a cada 1 min).', 'Médias móveis, detecção de tendência.', 'Um evento pertence a várias janelas; custo e volume maiores.'],
            ['Session', 'Janelas por chave, definidas por lacunas de inatividade (gap duration).', 'Sessões de usuário, atividade em rajadas.', 'Tamanho variável; cada chave tem janelas próprias; janelas vizinhas se fundem.'],
            ['Global', 'Uma única janela para todos os dados (padrão).', 'Batch; streaming só com gatilhos explícitos.', 'Em fluxo ilimitado, um GroupByKey/Combine na janela global nunca "termina" sem gatilho.']
          ]
        },
        p: [
          'Código em Python para uma janela fixa de 1 minuto, contando eventos por chave:',
          'import apache_beam as beam\nfrom apache_beam import window\n\ncontagem = (eventos\n    | "Janela" >> beam.WindowInto(window.FixedWindows(60))\n    | "Par" >> beam.Map(lambda e: (e["tipo"], 1))\n    | "Contar" >> beam.CombinePerKey(sum))',
          'Variações: window.SlidingWindows(600, 60) (tamanho de 10 minutos, avanço de 1 minuto) e window.Sessions(30 * 60) (lacuna de 30 minutos).'
        ],
        armadilha: 'Janela global em streaming sem gatilho: o pipeline roda mas nunca emite agregações. Em prova, "aggregation never produces output" aponta para falta de janela ou gatilho.'
      },
      {
        t: 'Watermark: até onde o tempo de evento "chegou"',
        facil: 'Traduzindo: o watermark é o palpite do sistema sobre "já chegou tudo até este horário". Quando o palpite passa do fim da janela, o resultado sai. Como é palpite, pode errar.',
        p: [
          'O watermark é a estimativa do sistema de que, no tempo de evento, todos os dados até certo instante já chegaram. É uma heurística, não uma garantia. Quando o watermark passa do fim de uma janela, o Beam considera a janela "completa" e emite o resultado on-time. Dados com timestamp anterior ao watermark que chegam depois são "late data".',
          'Na leitura do Pub/Sub, o Dataflow calcula o watermark com base no backlog: ele não avança além da mensagem mais antiga ainda não processada na assinatura. Consequência prática: se o backlog cresce, o watermark atrasa e as janelas demoram a fechar. O watermark é uma das métricas principais (data freshness e system latency) para diagnosticar atraso.',
          'Se o watermark é heurístico, ele pode avançar cedo demais (dados atrasados "furam" o watermark) ou ser lento demais (um produtor parado trava o avanço). Por isso existem gatilhos e allowed lateness.'
        ]
      },
      {
        t: 'Gatilhos, allowed lateness e acumulação',
        facil: 'Traduzindo: o gatilho diz quando anotar o resultado. O allowed lateness diz até quando aceitar atrasados. A acumulação diz se cada anotação nova é o total ou só a novidade.',
        p: [
          'Gatilho (trigger) decide QUANDO emitir o resultado de uma janela. O gatilho padrão é AfterWatermark: emite uma vez quando o watermark passa o fim da janela. Você pode compor: disparos antecipados (early firings) para resultados parciais enquanto a janela está aberta, o disparo on-time no watermark e disparos tardios (late firings) para dados que chegaram depois.',
          'Allowed lateness é por quanto tempo de evento depois do fim da janela o Beam ainda aceita dado atrasado e atualiza a janela. O padrão é ZERO: dado que chega depois do watermark e fora do lateness é descartado silenciosamente. Quanto maior o lateness, mais estado fica retido (custo de memória) e mais tempo o resultado pode ser corrigido.',
          'Modo de acumulação define como os disparos de uma mesma janela se relacionam: DISCARDING emite apenas o delta desde o último disparo (bom para somar no destino); ACCUMULATING emite o total acumulado a cada disparo (bom para sobrescrever o valor da janela no destino, mas requer destino que substitui, senão há dupla contagem).',
          'from apache_beam.transforms import trigger\nfrom apache_beam.utils.timestamp import Duration\n\nresultado = (eventos\n    | beam.WindowInto(\n        window.FixedWindows(60),\n        trigger=trigger.AfterWatermark(\n            early=trigger.AfterProcessingTime(15),\n            late=trigger.AfterCount(1)),\n        accumulation_mode=trigger.AccumulationMode.ACCUMULATING,\n        allowed_lateness=Duration(seconds=600))\n    | beam.Map(lambda e: (e["tipo"], 1))\n    | beam.CombinePerKey(sum))'
        ],
        tabela: {
          cab: ['Conceito', 'Responde a', 'Padrão', 'Efeito de errar'],
          linhas: [
            ['Janela', 'ONDE (tempo de evento)', 'Global', 'Agrega o período errado.'],
            ['Watermark', 'Estimativa de completude', 'Calculado pelo runner', 'Janelas fecham cedo ou tarde demais.'],
            ['Trigger', 'QUANDO emitir', 'AfterWatermark', 'Latência alta ou resultados parciais demais.'],
            ['Allowed lateness', 'Até quando aceitar atrasados', '0', 'Dado atrasado é descartado.'],
            ['Accumulation mode', 'COMO refinar', 'Discarding', 'Dupla contagem ou perda de dados no destino.']
          ]
        },
        armadilha: 'Acumulação ACCUMULATING com um destino que apenas soma (append) gera dupla contagem. Use DISCARDING ou grave por chave (janela + chave) substituindo o valor.'
      },
      {
        t: 'Exatidão: exactly-once, deduplicação, sinks idempotentes',
        facil: 'Traduzindo: o Dataflow evita contar duas vezes dentro do pipeline, mas repetições surgem na entrada e na saída. Use ids para deduplicar e grave de modo que repetir não estrague.',
        p: [
          'Dataflow garante processamento exactly-once dentro do pipeline: o efeito sobre o estado interno e os resultados de agregação é como se cada elemento tivesse sido processado uma única vez, mesmo com retentativas de workers. Ele consegue isso com checkpoints internos e deduplicação. Há também um modo de streaming "at-least-once", opcional, que pode reduzir custo e latência quando duplicatas são toleráveis (a taxa costuma ser baixa, mas pode subir em falhas de workers). Ele é ativado com a opção de serviço streaming_mode_at_least_once (por exemplo, --dataflow_service_options=streaming_mode_at_least_once no Python), exige Streaming Engine (habilitado junto) e não combina com o método FILE_LOADS do BigQuery.',
          'Fronteiras do pipeline é onde aparecem duplicatas: (1) A fonte: Pub/Sub é at-least-once; o Dataflow deduplica por messageId do Pub/Sub, e, se o PUBLICADOR pode enviar a mesma informação duas vezes com ids diferentes, use id_label na leitura para deduplicar por um atributo seu. (2) O destino: o sink precisa ser idempotente ou transacional. Para o BigQuery, a Storage Write API oferece semântica exactly-once (com streams commited ou pending) e é preferida à API de inserção em streaming legada; inserção em streaming pode usar insertId para deduplicação de melhor esforço.',
          'Para escrita idempotente, use chaves naturais: MERGE por chave no BigQuery, upsert no Bigtable (mesma row key sobrescreve) ou arquivo com nome determinístico por janela.',
          'leitura = (p | beam.io.ReadFromPubSub(\n    subscription="projects/P/subscriptions/S",\n    with_attributes=True,\n    timestamp_attribute="event_ts",\n    id_label="event_id"))',
          'Reprocesso e backfill: guarde o bruto (Cloud Storage subscription ou tabela bruta) para reprocessar. Duas formas: (a) seek da assinatura Pub/Sub para um instante anterior, e (b) rodar o mesmo pipeline em modo batch lendo o arquivo bruto. Como o código Beam é o mesmo, a lógica de janelas dá o mesmo resultado em ambos.'
        ],
        lista: [
          'Janelas e estado de streaming são reconstruídos após falha; não escreva efeitos colaterais externos dentro de ParDo sem idempotência (uma DoFn pode ser reexecutada).',
          'Late data descartado não gera erro: monitore a métrica de elementos descartados por atraso.',
          'Reprocessar com seek pode duplicar no destino se ele não for idempotente.'
        ]
      }
    ],
    exemplo: {
      t: 'Contagem de cliques por minuto com celulares offline',
      texto: 'Um app móvel envia cliques ao Pub/Sub; alguns aparelhos ficam offline e enviam eventos até 10 minutos depois. O negócio quer a contagem por minuto, com o painel mostrando um valor aproximado a cada 15 segundos e corrigindo depois. Passo 1 (quê): contar por tipo de clique com CombinePerKey. Passo 2 (onde): janela fixa de 60 segundos sobre o timestamp do evento, lido do atributo event_ts. Passo 3 (quando): AfterWatermark com early firing a cada 15 segundos de processamento e late firing a cada elemento atrasado. Passo 4 (até quando): allowed lateness de 10 minutos, pois depois disso o dado é descartado. Passo 5 (como): ACCUMULATING, e a tabela de destino é sobrescrita por chave (janela, tipo) por MERGE, evitando dupla contagem. Passo 6: id_label deduplica reenvios do aparelho. Resultado: números parciais rápidos, resultado final correto até 10 minutos depois e custo de estado limitado.'
    },
    prova: [
      '"Events arrive out of order / devices offline / use the time the event happened" aponta para tempo de evento com janelas e watermark, nunca tempo de processamento. "Late data is lost" aponta para allowed lateness (padrão 0) e gatilhos de late firing.',
      '"Group activity separated by inactivity" aponta para session windows; "moving average over last N minutes updated every M" aponta para sliding; "count per minute" aponta para fixed; "aggregation never emits in streaming" aponta para janela global sem gatilho.',
      '"Duplicates in the output / exactly-once" aponta para: id_label ou messageId para deduplicar a fonte, Storage Write API ou MERGE/upsert no destino; "preview partial results early" aponta para early firings com modo de acumulação coerente com o destino.'
    ],
    explique: 'Explique sem consultar: a diferença entre tempo de evento e de processamento, o que o watermark estima, como gatilho, allowed lateness e modo de acumulação se combinam, e onde nascem as duplicatas num pipeline Pub/Sub para BigQuery.'
  },
  cartoes: [
    { id: 'd10c1', t: '2.2', f: 'Qual a diferença entre event time e processing time?', v: 'Event time é quando o fato ocorreu; processing time é quando o pipeline o processa. Janelas corretas agrupam por event time, pois o processamento sofre atrasos.' },
    { id: 'd10c2', t: '2.2', f: 'O que é o watermark no Beam?', v: 'Estimativa heurística de até onde o tempo de evento está completo. Quando passa do fim da janela, o resultado on-time é emitido; dados anteriores a ele que chegam depois são atrasados.' },
    { id: 'd10c3', t: '2.2', f: 'Qual o allowed lateness padrão e o que acontece com dado além dele?', v: 'O padrão é zero. Dado atrasado fora do lateness é descartado silenciosamente (sem erro).' },
    { id: 'd10c4', t: '2.2', f: 'Quando usar janela de sessão (session window)?', v: 'Para agrupar atividade por chave separada por lacunas de inatividade (gap), como sessões de usuário. O tamanho da janela varia por chave.' },
    { id: 'd10c5', t: '2.2', f: 'Diferença entre fixed e sliding windows.', v: 'Fixed não se sobrepõe: cada evento está em uma janela. Sliding tem tamanho e período (ex.: 10 min a cada 1 min) e cada evento cai em várias janelas.' },
    { id: 'd10c6', t: '2.2', f: 'Por que streaming com janela global exige gatilho?', v: 'Porque a janela global nunca fecha em fluxo ilimitado; sem gatilho explícito, GroupByKey e Combine nunca emitem resultado.' },
    { id: 'd10c7', t: '2.2', f: 'O que são early, on-time e late firings?', v: 'Early: resultados parciais antes do watermark. On-time: no watermark passando o fim da janela. Late: disparos para dados que chegam depois do watermark dentro do allowed lateness.' },
    { id: 'd10c8', t: '2.2', f: 'Diferença entre modos de acumulação DISCARDING e ACCUMULATING.', v: 'DISCARDING emite só o delta desde o último disparo. ACCUMULATING emite o total acumulado a cada disparo e exige destino que substitui o valor, senão há dupla contagem.' },
    { id: 'd10c9', t: '2.2', f: 'Como deduplicar mensagens do Pub/Sub no Dataflow?', v: 'O Dataflow usa o messageId do Pub/Sub; para duplicatas enviadas pelo publicador com ids diferentes, use id_label apontando para um atributo de identificador único.' },
    { id: 'd10c10', t: '2.2', f: 'Como o Dataflow calcula o watermark de uma assinatura Pub/Sub?', v: 'Com base no backlog: não avança além da mensagem mais antiga ainda não processada. Backlog crescente atrasa o watermark e o fechamento das janelas.' },
    { id: 'd10c11', t: '2.2', f: 'Qual a forma preferida de gravar em BigQuery com semântica exactly-once?', v: 'Storage Write API (conector com método STORAGE_WRITE_API). Inserções em streaming legadas só dão deduplicação de melhor esforço com insertId.' },
    { id: 'd10c12', t: '2.2', f: 'Como usar o horário real do evento ao ler do Pub/Sub?', v: 'Informe timestamp_attribute com o atributo que carrega o horário do evento; sem isso o timestamp padrão é o de publicação.' },
    { id: 'd10c13', t: '2.2', f: 'Como reprocessar dados antigos num pipeline de streaming?', v: 'Faça seek da assinatura para o passado (se ainda retido) ou rode o mesmo código em batch sobre o bruto guardado no Cloud Storage; garanta destino idempotente.' },
    { id: 'd10c14', t: '2.2', f: 'Quais são as quatro perguntas do modelo de streaming do Beam?', v: 'O quê (transformações), onde (janelas no tempo de evento), quando (gatilhos e watermark) e como (modo de acumulação).' }
  ],
  questoes: [
    {
      id: 'd10q1', s: 2, t: '2.2',
      e: 'A mobile game sends events to Pub/Sub. Some players are offline and upload events up to 15 minutes after they happened. The analytics team needs per-minute counts based on when the event occurred. Which design is BEST?',
      o: ['Fixed windows on processing time with no allowed lateness.', 'Fixed windows of 1 minute on event time, with allowed lateness of 15 minutes and late firings.', 'Global window with a count trigger of 100 elements.', 'Session windows with a gap of 1 minute.'],
      c: [1],
      x: 'Contagem por minuto de acordo com o momento do evento exige janela fixa de 1 minuto no tempo de evento; o allowed lateness de 15 minutos aceita os dados dos jogadores offline e os late firings atualizam o resultado. Janela por tempo de processamento agrupa pela chegada, não pela ocorrência, e com lateness zero descarta atrasados. Janela global com gatilho por contagem não produz minutos. Session windows agrupam por inatividade, não por minuto de calendário.'
    },
    {
      id: 'd10q2', s: 2, t: '2.2',
      e: 'A streaming pipeline computes a 30-minute moving average that must be refreshed every 5 minutes. Which windowing strategy should you use?',
      o: ['Fixed windows of 30 minutes.', 'Session windows with a 5-minute gap.', 'Sliding windows with a size of 30 minutes and a period of 5 minutes.', 'Global window with no trigger.'],
      c: [2],
      x: 'Média móvel com atualização periódica é o caso da janela deslizante (sliding): tamanho de 30 minutos e período de 5 minutos, de modo que cada evento participa de várias janelas. Janelas fixas de 30 minutos só emitem a cada 30 minutos e não se sobrepõem. Sessões dependem de lacunas de inatividade, não de períodos regulares. Janela global sem gatilho nunca emite resultado em um fluxo ilimitado.'
    },
    {
      id: 'd10q3', s: 2, t: '2.2',
      e: 'A Dataflow streaming job aggregates events in fixed windows using the default trigger and default allowed lateness. Analysts notice that a small number of events that arrive minutes late never show up in the totals. What is the cause?',
      o: ['The default allowed lateness is zero, so data arriving after the watermark passes the end of the window is dropped.', 'Pub/Sub deletes messages older than 10 seconds.', 'Streaming Engine removes late events.', 'The DirectRunner is being used.'],
      c: [0],
      x: 'O allowed lateness padrão é zero: depois que o watermark passa o fim da janela, o dado atrasado é descartado silenciosamente. A correção é definir allowed lateness e um gatilho de late firing. O Pub/Sub retém mensagens por dias, não segundos, e não descarta por idade em 10 segundos. Streaming Engine apenas muda onde o estado é mantido e não filtra eventos. Usar o DirectRunner não explica o comportamento em um job Dataflow.'
    },
    {
      id: 'd10q4', s: 2, t: '2.2',
      e: 'A dashboard needs a fast approximate count every 10 seconds for each 1-minute window, and the final correct count when the window completes. The destination table is overwritten per (window, key). Which two settings should you use? Choose two.',
      o: ['Early firings every 10 seconds of processing time.', 'Accumulating mode so each firing contains the total so far.', 'Discarding mode with an append-only destination.', 'A global window with no trigger.', 'Session windows with a 10-second gap.'],
      c: [0, 1],
      x: 'Disparos antecipados a cada 10 segundos entregam os valores parciais rápidos, e o modo ACCUMULATING emite o total até o momento, adequado a um destino que sobrescreve por (janela, chave). Discarding com destino append emitiria deltas e exigiria somar depois, o que não é o requisito de sobrescrita. Janela global sem gatilho nunca emite. Session windows agrupam por inatividade e não por janelas de 1 minuto.'
    },
    {
      id: 'd10q5', s: 2, t: '2.2',
      e: 'A Dataflow pipeline reads from Pub/Sub and writes counts to BigQuery. Publishers sometimes retry and send the same business event twice with different Pub/Sub message IDs. The event payload contains a unique event_id attribute. How can you remove these duplicates at the source?',
      o: ['Increase the ack deadline of the subscription.', 'Use the id_label option in the Pub/Sub read pointing to the event_id attribute.', 'Switch the subscription to push.', 'Disable autoscaling.'],
      c: [1],
      x: 'O Pub/Sub atribui messageIds diferentes para cada publicação, então a deduplicação automática por messageId não pega reenvios do publicador. A opção id_label aponta para um atributo seu (event_id) e o Dataflow deduplica por ele. Aumentar o ack deadline evita reentregas, mas não duplicatas geradas na publicação. Push não resolve e não tem exactly-once. Desabilitar autoscaling não tem relação com duplicidade.'
    },
    {
      id: 'd10q6', s: 2, t: '2.2',
      e: 'You must analyze user activity where each session ends after 20 minutes of inactivity, and report the number of page views per user session. Which window type fits?',
      o: ['Fixed windows of 20 minutes.', 'Sliding windows of 20 minutes every minute.', 'Global window per user.', 'Session windows with a gap duration of 20 minutes, keyed by user.'],
      c: [3],
      x: 'Session windows têm tamanho variável definido por lacunas de inatividade e são calculadas por chave: a sessão do usuário se encerra após 20 minutos sem eventos. Janelas fixas cortariam a sessão em intervalos arbitrários. Sliding duplicaria eventos em várias janelas sem refletir sessões. A janela global por usuário acumularia tudo sem delimitar sessões.'
    },
    {
      id: 'd10q7', s: 2, t: '2.2',
      e: 'A team writes streaming aggregates to BigQuery and requires that results are not duplicated if Dataflow retries a bundle after a worker failure. Which approach is MOST appropriate?',
      o: ['Write with the legacy streaming insert API and ignore insert IDs.', 'Write using the BigQuery Storage Write API connector with exactly-once semantics, or write idempotently with MERGE on a key.', 'Run the pipeline with a single worker so retries never happen.', 'Use FlexRS to reduce retries.'],
      c: [1],
      x: 'A Storage Write API oferece semântica exactly-once na gravação, e MERGE por chave torna a escrita idempotente; ambos neutralizam retentativas de bundles. A inserção legada sem insertId aceita duplicatas. Um único worker não elimina falhas ou retentativas e prejudica escala. FlexRS é para batch e não trata duplicatas.'
    },
    {
      id: 'd10q8', s: 2, t: '2.2',
      e: 'A streaming Dataflow job reading a Pub/Sub subscription shows a growing backlog and the pipeline watermark is falling behind real time. What does this indicate and what should you do?',
      o: ['The job processes data faster than expected; reduce workers.', 'Windows are closing too early; set allowed lateness to zero.', 'The pipeline cannot keep up with the input; investigate bottlenecks and scale up workers or fix slow steps.', 'The topic retention is too long; reduce it to 1 hour.'],
      c: [2],
      x: 'Como o watermark da fonte Pub/Sub depende do backlog, o atraso crescente indica que o pipeline não acompanha a entrada: investigue etapas lentas, hot keys, limites de quota e aumente workers ou o máximo do autoscaling. Reduzir workers pioraria. Allowed lateness zero faria descartar mais dados e não resolve o gargalo. Retenção do tópico não influencia a velocidade de processamento.'
    },
    {
      id: 'd10q9', s: 2, t: '2.2',
      e: 'A company discovers a logic bug that produced wrong hourly aggregates for the last two days. Raw events are archived in Cloud Storage. Which approach re-computes the results with the LEAST new code?',
      o: ['Rewrite the pipeline in SQL and ignore the windowing logic.', 'Run the same Beam pipeline logic in batch mode over the archived files and write corrected results idempotently.', 'Cancel the streaming job and discard the data.', 'Replay the data by changing the Pub/Sub topic name.'],
      c: [1],
      x: 'Beam usa o mesmo código para batch e streaming, então rodar o mesmo pipeline em batch sobre o bruto arquivado recalcula as janelas igual e exige pouco código novo; gravar de forma idempotente evita duplicar. Reescrever em SQL cria novo código e risco de divergir da lógica. Cancelar e descartar perde o dado. Mudar o nome do tópico não reentrega nada; o replay seria por seek na assinatura, e só se as mensagens ainda estiverem retidas.'
    },
    {
      id: 'd10q10', s: 2, t: '2.2',
      e: 'Which two statements about watermarks and lateness in Beam are correct? Choose two.',
      o: ['The watermark is a heuristic estimate that event-time data up to a point has arrived, not a guarantee.', 'Late data is always preserved regardless of allowed lateness.', 'With the default allowed lateness, data older than the watermark and outside the window is dropped.', 'The watermark is computed from the processing time of the workers.', 'Sliding windows make every event belong to exactly one window.'],
      c: [0, 2],
      x: 'O watermark é uma estimativa heurística de completude no tempo de evento, e com allowed lateness padrão (zero) o dado que chega depois do fim da janela e do watermark é descartado. Dizer que dados atrasados são sempre preservados é falso, pois depende do lateness. O watermark não vem do tempo de processamento dos workers, mas do progresso do tempo de evento da fonte. Em janelas deslizantes um evento pode pertencer a várias janelas, não a uma só.'
    }
  ],
  lab: {
    t: 'Pipeline de janela fixa de 1 minuto: local (DirectRunner) com dados atrasados simulados',
    tempo: '25 a 35 minutos',
    antes: 'Você precisa de Python e do pacote apache-beam já instalados, como no dia anterior. O lab não usa a nuvem: o TestStream simula um fluxo com tempo controlado por você, então nada depende do relógio real. Ao rodar o script, o terminal imprime pares como ("clique", 2). A primeira execução mostra apenas o resultado da janela 0 a 60, e o evento atrasado some. Na segunda, com lateness maior, aparece uma linha a mais, o disparo tardio. Anote a saída de cada execução para comparar. A parte opcional com Pub/Sub e Dataflow pede projeto com cobrança, e o comando date com a opção -d funciona no Linux e no Cloud Shell, não no Mac.',
    erros: [
      { s: 'ModuleNotFoundError: No module named apache_beam', c: 'O ambiente virtual não está ativado ou o pacote não foi instalado nele.', r: 'Ative o ambiente (venv) e rode pip install apache-beam. Depois execute python janela.py de novo.' },
      { s: 'sed não é reconhecido (Windows)', c: 'O comando sed é do Linux e não existe no PowerShell.', r: 'Abra o arquivo janela.py e troque Duration(seconds=0) por Duration(seconds=120) à mão. Ou use o Cloud Shell.' },
      { s: 'O script roda mas não imprime nada', c: 'O pipeline não está em modo de streaming, ou o TestStream não terminou com o watermark no infinito.', r: 'Confira a linha que liga streaming = True e o advance_watermark_to_infinity() no fim do fluxo.' },
      { s: 'O evento atrasado aparece mesmo com lateness 0, ou nunca aparece com 120', c: 'Você editou outro arquivo, ou o timestamp do evento atrasado não pertence à janela 0 a 60.', r: 'Confira o valor do Duration salvo no arquivo e o timestamp 30 do evento atrasado. Salve e rode de novo.' },
      { s: 'Erro de data no comando de publicação (date: illegal option)', c: 'O date do Mac e o do Linux têm opções diferentes.', r: 'Use o Cloud Shell, ou escreva o horário à mão no formato 2025-01-01T10:00:00Z no atributo event_ts.' }
    ],
    custo: 'US$ 0 na parte local. Opcional no Dataflow e Pub/Sub: 1 worker por alguns minutos (centavos a poucos dólares); limpeza obrigatória.',
    porque: 'Você vê, com dados que você controla, a diferença entre tempo de evento e de processamento e o efeito de allowed lateness e gatilhos, sem gastar nuvem.',
    passos: [
      { t: 'Criar o pipeline com eventos de timestamps controlados (janela.py)', cmd: 'cat > janela.py <<\'EOF\'\nimport apache_beam as beam\nfrom apache_beam import window\nfrom apache_beam.testing.test_stream import TestStream\nfrom apache_beam.options.pipeline_options import PipelineOptions, StandardOptions\nfrom apache_beam.transforms import trigger\nfrom apache_beam.utils.timestamp import Duration\n\nopts = PipelineOptions()\nopts.view_as(StandardOptions).streaming = True\n\nfluxo = (TestStream()\n    .add_elements([window.TimestampedValue("clique", 5), window.TimestampedValue("clique", 20)])\n    .advance_watermark_to(65)\n    .add_elements([window.TimestampedValue("clique", 30)])   # atrasado: pertence a janela 0-60\n    .advance_watermark_to_infinity())\n\nwith beam.Pipeline(options=opts) as p:\n    (p | fluxo\n       | beam.WindowInto(window.FixedWindows(60),\n            trigger=trigger.AfterWatermark(late=trigger.AfterCount(1)),\n            accumulation_mode=trigger.AccumulationMode.DISCARDING,\n            allowed_lateness=Duration(seconds=0))\n       | beam.Map(lambda x: (x, 1))\n       | beam.CombinePerKey(sum)\n       | beam.Map(print))\nEOF', p: 'TestStream simula um fluxo com tempo controlado: dois eventos, o watermark passa de 60 e chega um evento atrasado com timestamp 30.' },
      { t: 'Rodar com lateness zero', cmd: 'python janela.py', p: 'Esperado: a janela 0-60 emite 2 e o evento atrasado é descartado (lateness 0). Anote a saída.' },
      { t: 'Aumentar allowed lateness e comparar', cmd: 'sed -i "s/Duration(seconds=0)/Duration(seconds=120)/" janela.py\npython janela.py', p: 'Agora a janela dispara de novo com o evento atrasado (late firing). Em Windows sem sed, edite o arquivo manualmente. Troque DISCARDING por ACCUMULATING e veja o total passar de 1 para 3 no disparo tardio.' },
      { t: 'Opcional: tópico e assinatura Pub/Sub e envio de eventos com atributo de horário', cmd: 'gcloud pubsub topics create lab-janela\ngcloud pubsub subscriptions create lab-janela-sub --topic=lab-janela\ngcloud pubsub topics publish lab-janela --message="clique" --attribute=event_ts=$(date -u -d "10 minutes ago" +%Y-%m-%dT%H:%M:%SZ)', p:'Para ler com horário real, use ReadFromPubSub com timestamp_attribute="event_ts" e escreva em BigQuery com WriteToBigQuery. Para rodar no Dataflow use --runner=DataflowRunner --streaming --max_num_workers=1 e acompanhe o custo. Envie um evento com event_ts de 10 minutos atrás para ver o atraso.' },
      { t: 'Observar métricas (opcional)', p: 'No console do Dataflow, veja System latency, Data freshness e Watermark age. Entenda como o backlog da assinatura afeta o watermark.' }
    ],
    limpar: [
      'gcloud dataflow jobs list --region=us-central1 --status=active',
      'gcloud dataflow jobs drain ID_DO_JOB --region=us-central1   # se criou job de streaming',
      'gcloud pubsub subscriptions delete lab-janela-sub',
      'gcloud pubsub topics delete lab-janela',
      'bq rm -f -t SEU_DATASET.contagem_janelas   # se criou tabela'
    ],
    verificar: 'Com lateness 0 o evento atrasado não aparece em nenhuma saída; com lateness 120 aparece um disparo tardio para a janela 0-60 incluindo o evento.'
  }
};
C.dias[11] = {
  aula: {
    titulo: 'Dataproc, Data Fusion, Kafka e migração de dados',
    simples: {
      analogia: 'Pense em consertar carros. Antes, você mantinha uma oficina própria, aberta o ano todo, com as peças guardadas dentro dela. Se a oficina fechava, as peças ficavam presas lá. Na nuvem, o jeito inteligente é guardar as peças num **depósito** separado, o **Cloud Storage**. A oficina, o **cluster Dataproc**, é alugada só pelo tempo do serviço e devolvida no fim. Você paga só pelas horas usadas, e as peças continuam seguras. Para economizar mais, parte dos mecânicos pode ser **temporária e barata** (VMs Spot), porque o depósito guarda tudo. Agora a mudança de casa: se há pouca coisa e a estrada é boa, você leva as caixas de carro (a rede). Se são caminhões de caixas, chama o **caminhão de mudança** (Transfer Appliance). Limite da analogia: oficina e depósito ficam em lugares diferentes, então o trabalho lê e grava os dados pela rede.',
      pontos: [
        '**Dataproc** roda Spark e Hadoop sem você montar servidores.',
        'Guarde os dados no **Cloud Storage** e crie o cluster só para o job. Depois apague.',
        'Máquinas **Spot** são baratas, mas podem ser retomadas. Use-as só para computar.',
        '**Data Fusion** monta pipelines arrastando blocos. Não é a melhor escolha para streaming complexo.',
        'Para migrar, descubra primeiro o que mover, quanto e se a cópia precisa ser contínua.',
        'Volume enorme e rede lenta? Divida volume por banda. Se der semanas, use Transfer Appliance.'
      ],
      paraQueServe: 'Você usa isso quando herda jobs Spark ou Hadoop, ou precisa levar dados e bancos de um datacenter ou de outra nuvem para o Google Cloud.'
    },
    glossario: [
      { t: 'Cluster', d: 'Um grupo de máquinas que trabalham juntas na mesma tarefa.' },
      { t: 'Apache Spark e Hadoop', d: 'Ferramentas de código aberto para processar grandes volumes de dados em vários computadores.' },
      { t: 'HDFS', d: 'Sistema de arquivos do Hadoop, que guarda dados nos discos das próprias máquinas do cluster.' },
      { t: 'Cloud Storage', d: 'Armazenamento de arquivos (objetos) do Google Cloud, durável e barato, fora do cluster.' },
      { t: 'VM Spot', d: 'Máquina virtual com desconto grande, mas que o Google pode retomar a qualquer momento.' },
      { t: 'Hive Metastore', d: 'Catálogo que guarda o esquema das tabelas e indica onde os arquivos estão.' },
      { t: 'CDC (change data capture)', d: 'Capturar cada mudança feita num banco e copiá-la quase em tempo real para outro lugar.' },
      { t: 'ETL', d: 'Extrair, transformar e carregar: o ciclo de buscar dados, ajustá-los e gravá-los no destino.' },
      { t: 'Cloud VPN e Cloud Interconnect', d: 'VPN é um túnel cifrado pela internet. Interconnect é uma conexão privada e dedicada.' },
      { t: 'Transfer Appliance', d: 'Aparelho físico que o Google envia até você para carregar dados e devolver por transporte.' }
    ],
    checagem: [
      'Sem olhar a aula: por que separar computação (Dataproc) de armazenamento (Cloud Storage) reduz custo?',
      'Por que máquinas Spot só devem fazer computação, e não guardar dados?',
      'Qual a diferença entre Datastream e Database Migration Service?',
      'Como você decide entre mandar dados pela rede ou usar o Transfer Appliance?'
    ],
    resumo: 'Aprenda a rodar Spark e Hadoop no Dataproc (efêmero, Spot, autoscaling, Serverless), o papel do Data Fusion e do Kafka gerenciado, e a escolher a ferramenta certa de migração e transferência por volume, tempo e tipo de fonte.',
    blocos: [
      {
        t: 'Dataproc: Spark e Hadoop gerenciados',
        facil: 'Traduzindo: Dataproc é Spark e Hadoop alugados. O segredo é guardar os dados no Cloud Storage, criar o cluster só para o trabalho e apagar ao final. Assim você paga só pelo tempo usado.',
        p: [
          'Dataproc (no console, agora sob a marca Managed Service for Apache Spark; API e gcloud mantêm o nome dataproc) é o serviço gerenciado para Apache Spark, Hadoop, Hive, Flink, Presto/Trino e outros componentes do ecossistema. Um cluster sobe em cerca de 90 segundos, com um nó mestre (ou três, em modo de alta disponibilidade), workers primários e workers secundários. Você escolhe Dataproc quando já tem código ou habilidades em Spark/Hadoop e quer migrar com pouca reescrita, ou quando precisa de bibliotecas do ecossistema que não existem no Beam.',
          'A grande mudança de mentalidade da nuvem: separar computação de armazenamento. No Hadoop local, o HDFS vive nos discos dos nós, então o cluster precisa ficar sempre ligado. No Google Cloud, deixe os dados no Cloud Storage (conector gs://) e trate o cluster como descartável. Assim você cria um cluster efêmero por job (ou por fluxo de trabalho), roda, e apaga: paga só pelo tempo de execução, sem contenção entre equipes e com dados duráveis e baratos.'
        ],
        tabela: {
          cab: ['Aspecto', 'Cluster efêmero (recomendado)', 'Cluster persistente (long-running)'],
          linhas: [
            ['Custo', 'Paga só enquanto o job roda.', 'Paga 24x7, mesmo ocioso.'],
            ['Armazenamento', 'Dados no Cloud Storage (gs://), desacoplado.', 'HDFS nos discos, acoplado ao cluster.'],
            ['Isolamento', 'Um cluster por job ou equipe, configuração sob medida.', 'Recursos compartilhados e disputa por capacidade.'],
            ['Quando usar', 'Jobs batch, ETL noturno, dev e teste.', 'Cargas interativas contínuas que exigem HDFS local ou latência mínima.']
          ]
        },
        dica: 'Em prova, "reduce cost of Hadoop/Spark on GCP" quase sempre significa: dados no Cloud Storage, clusters efêmeros por job, workers Spot e autoscaling.'
      },
      {
        t: 'Custo e escala no Dataproc: Spot, autoscaling, scheduled deletion',
        facil: 'Traduzindo: para gastar menos, use máquinas baratas (Spot) só para computar, deixe o cluster crescer e encolher sozinho e programe a exclusão para não esquecer nada ligado.',
        p: [
          'Workers secundários podem ser VMs Spot (preemptíveis): baratos, mas podem ser retomados a qualquer momento. Eles não armazenam dados HDFS, apenas computam; por isso devem ser usados com dados no Cloud Storage e para cargas tolerantes a falha (Spark re-executa tarefas perdidas). Mantenha workers primários (sob demanda) para garantir estabilidade, e nunca coloque o nó mestre em Spot.',
          'Autoscaling: uma política (autoscaling policy) define limites mínimo e máximo e a agressividade de escala de workers primários e secundários, com base na memória YARN pendente e disponível. Útil para cargas variáveis. Para jobs Spark curtos e imprevisíveis, considere Serverless for Apache Spark.',
          'Para evitar clusters esquecidos, use exclusão agendada: tempo ocioso máximo (--max-idle), idade máxima (--max-age) ou data de expiração (--expiration-time). Workflow Templates definem um grafo de jobs com um cluster gerenciado que é criado e apagado automaticamente, e podem ser disparados por orquestradores.',
          'gcloud dataproc clusters create meu-cluster --region=us-central1 --num-workers=2 --num-secondary-workers=4 --secondary-worker-type=spot --max-idle=30m --autoscaling-policy=minha-politica\ngcloud dataproc jobs submit pyspark gs://bucket/job.py --cluster=meu-cluster --region=us-central1'
        ],
        armadilha: 'Spot em workers secundários não guarda HDFS. Se os dados estiverem no HDFS dos workers e eles forem retomados, há perda ou reprocessamento; a solução é Cloud Storage como armazenamento principal.'
      },
      {
        t: 'Serverless for Apache Spark, Metastore e Dataproc na prática',
        facil: 'Traduzindo: existe Spark sem cluster para cuidar: você envia o job e o Google faz o resto. O Metastore guarda o catálogo das tabelas, que sobrevive quando o cluster é apagado.',
        p: [
          'Serverless for Apache Spark (antes Dataproc Serverless) executa cargas Spark em lotes ou sessões interativas sem criar nem gerenciar cluster: você envia o job e o serviço provisiona e escala os recursos, cobrando pelo uso. É a escolha quando você quer Spark sem operar cluster, com baixa sobrecarga. Dataproc em cluster continua melhor quando você precisa de controle fino de configuração, componentes específicos (Hive, HBase, Flink), ou jobs de longa duração e sempre ligados.',
          'Metastore: o Hive Metastore guarda o esquema de tabelas (mapeando arquivos no Cloud Storage para tabelas). Um metastore gerenciado e compartilhado (Dataproc Metastore) permite que vários clusters e serviços vejam as mesmas definições de tabela, o que é essencial para clusters efêmeros: o esquema persiste mesmo quando o cluster é apagado. O serviço continua disponível, mas há descontinuações parciais (suporte multirregional e versões antigas do Hive) e um caminho de migração para o catálogo de runtime do Lakehouse (antigo metastore do BigLake). Confira na documentação o estado atual antes de recomendar em um projeto novo.',
          'Conector BigQuery para Spark: leitura e escrita direta entre Spark e BigQuery (usando a Storage Read API), útil em migrações de pipelines Spark que mantêm o BigQuery como destino analítico.'
        ]
      },
      {
        t: 'Data Fusion e Kafka no Google Cloud',
        facil: 'Traduzindo: Data Fusion é montar pipelines arrastando blocos na tela. Kafka gerenciado serve a quem já usa Kafka. Para streaming com janelas e tempo de evento, a melhor escolha é Dataflow.',
        p: [
          'Cloud Data Fusion é um serviço de integração de dados (ETL/ELT) visual, baseado no projeto de código aberto CDAP. Você arrasta e solta fontes, transformações e destinos num canvas, com muitos plugins prontos (bancos, SaaS, arquivos). O pipeline publicado é executado como job no Dataproc (Spark), e você pode agendar e acompanhar a execução. Há edições (Developer, Basic, Enterprise) que variam em recursos, como acesso privado e funções avançadas; a instância cobra por hora enquanto existe. Use quando a equipe prefere interface visual e baixo código, tem muitas fontes heterogêneas e quer governança com linhagem; não use para streaming complexo com janelas e semântica de tempo de evento (Dataflow é melhor) nem se SQL no BigQuery resolve.',
          'Kafka no Google Cloud: o Google Cloud Managed Service for Apache Kafka oferece clusters Apache Kafka gerenciados, com a API padrão (produtores, consumidores, consumer groups, Kafka Connect para integração). Você ainda planeja capacidade (vCPU e memória do cluster) e partições, mas o Google cuida de provisionamento, patching e operação dos brokers. Use para migrar aplicações Kafka existentes ou quando o ecossistema Kafka é requisito. Dataflow tem conectores nativos de leitura e escrita Kafka, e há conectores para ligar Kafka e Pub/Sub. Para aplicação nova sem requisito Kafka, o Pub/Sub tem menos operação.'
        ]
      },
      {
        t: 'Migração e transferência: o mapa de ferramentas',
        facil: 'Traduzindo: cada ferramenta move um tipo de coisa: arquivos, dados de SaaS, cópia contínua de banco, banco inteiro ou caixa física. Pergunte primeiro: o que mover, quanto, e se a cópia precisa ser contínua.',
        p: [
          'A pergunta de prova é sempre: o que mover (arquivos, banco de dados, dados de SaaS), quanto, em quanto tempo, e se precisa de replicação contínua. Cada ferramenta cobre um caso específico.'
        ],
        tabela: {
          cab: ['Ferramenta', 'O que move', 'Use quando', 'Não use quando'],
          linhas: [
            ['BigQuery Data Transfer Service', 'Dados de SaaS (Google Ads, YouTube e outros), Cloud Storage, Amazon S3, e data warehouses como Teradata e Redshift, para o BigQuery, de forma agendada e gerenciada.', 'Carga recorrente e gerenciada para o BigQuery sem escrever código. Consultas agendadas também usam essa infraestrutura.', 'Destino não é BigQuery ou é preciso CDC em tempo real.'],
            ['Storage Transfer Service', 'Arquivos/objetos: entre buckets, de S3, Azure Blob, URLs HTTP e de sistemas de arquivos on-premises (com agentes), com agenda, filtros e validação.', 'Mover dados de objetos pela rede de forma gerenciada, recorrente ou única, em escala.', 'Dados de banco com replicação contínua; volume gigantesco com rede lenta (use Appliance).'],
            ['Transfer Appliance', 'Dispositivo físico enviado ao seu datacenter para carga offline de dados e devolução ao Google (centenas de TB a PB).', 'Volume enorme e/ou rede lenta ou cara, tempo de rede inviável (semanas ou meses).', 'Volume pequeno ou rede rápida com janela suficiente; replicação contínua.'],
            ['Datastream', 'CDC (change data capture) sem servidor de bancos como MySQL, PostgreSQL, Oracle e SQL Server para BigQuery e Cloud Storage.', 'Replicação contínua e de baixa latência de bancos transacionais para análise.', 'Migração de banco para outro banco operacional (use DMS).'],
            ['Database Migration Service (DMS)', 'Migração de bancos para Cloud SQL, AlloyDB e outros; homogênea (MySQL, PostgreSQL, SQL Server) e heterogênea (ex.: Oracle para PostgreSQL), com replicação contínua até o corte.', 'Mover o banco operacional com mínimo de downtime.', 'Destino analítico no BigQuery (use Datastream).'],
            ['BigQuery Migration Service', 'Avaliação e tradução de SQL e esquemas de data warehouses legados para o BigQuery.', 'Migrar warehouse (Teradata, Redshift, Snowflake etc.) incluindo código SQL.', 'Só mover arquivos.']
          ]
        },
        armadilha: 'Datastream não é o destino final de um banco operacional (ele replica para análise); DMS não alimenta o BigQuery. Confundir esses dois é erro clássico de prova.'
      },
      {
        t: 'Rede para migração e escolha por volume e tempo',
        facil: 'Traduzindo: divida o volume pela velocidade real da rede. Se der semanas, mande um aparelho físico (Transfer Appliance). Para conectar com privacidade, VPN é rápida de montar e Interconnect é um cabo dedicado.',
        p: [
          'Tempo de transferência = volume / largura de banda efetiva. Com 100 TB e 1 Gbps efetivos, são cerca de 9 a 10 dias de saturação total do link; em condições reais, bem mais. Quando o cálculo estoura o prazo ou ocupa a rede de produção, a resposta é transporte offline (Transfer Appliance) ou um link dedicado.',
          'Opções de conectividade: Cloud VPN (HA VPN) é um túnel IPsec cifrado sobre a internet, rápido de ativar e barato, adequado a volumes e larguras moderados (cada túnel tem limite de banda; confira a documentação). Cloud Interconnect é conexão privada dedicada ou via parceiro: Dedicated (circuitos de 10, 100 ou 400 Gbps, conforme a localização) e Partner (anexos VLAN de 50 Mbps a 50 Gbps, conforme o parceiro), com mais banda, menor latência e previsibilidade, com semanas de prazo para provisionar. Private Google Access permite que VMs sem IP externo acessem APIs do Google (como Cloud Storage e BigQuery) por IPs internos; para on-premises, existe o acesso privado a partir de hosts locais via VPN ou Interconnect.'
        ],
        tabela: {
          cab: ['Cenário', 'Escolha'],
          linhas: [
            ['Poucos GB a alguns TB, rede boa, recorrente', 'Storage Transfer Service (ou gcloud storage cp) por internet ou VPN'],
            ['Centenas de TB a PB, rede lenta ou prazo curto, uma vez', 'Transfer Appliance'],
            ['Dados de SaaS (ex.: Google Ads) para BigQuery, agendado', 'BigQuery Data Transfer Service'],
            ['Replicar MySQL/PostgreSQL/Oracle continuamente para BigQuery', 'Datastream'],
            ['Migrar banco operacional com mínimo downtime para Cloud SQL ou AlloyDB', 'Database Migration Service'],
            ['Transferência contínua grande e privada de datacenter', 'Cloud Interconnect com Storage Transfer Service'],
            ['Data warehouse legado e SQL para BigQuery', 'BigQuery Migration Service + DTS (Teradata ou Redshift)']
          ]
        },
        dica: 'Crie o hábito de calcular: volume em bits dividido pela banda efetiva. Se o resultado for de semanas, pense em Appliance; se há CDC, Datastream; se há objetos recorrentes, Storage Transfer Service.'
      }
    ],
    exemplo: {
      t: 'Migrando um data center Hadoop para o Google Cloud',
      texto: 'Uma empresa tem 600 TB em HDFS, 200 jobs Spark noturnos, um Oracle de pedidos e relatórios do Google Ads. Plano: (1) Os 600 TB, com link de 500 Mbps compartilhado, levariam meses, então usa-se Transfer Appliance para a carga inicial, e depois Storage Transfer Service para deltas diários por Interconnect. (2) Os jobs Spark vão para Dataproc: cada job roda em cluster efêmero criado por Workflow Template, com 30 por cento de workers Spot, dados no Cloud Storage e Metastore compartilhado para as tabelas Hive. (3) O Oracle de pedidos é replicado continuamente para o BigQuery com Datastream para análise, enquanto uma instância Cloud SQL ou AlloyDB para o sistema operacional seria tratada com Database Migration Service. (4) Os relatórios do Google Ads entram no BigQuery com Data Transfer Service, sem código. (5) Quem prefere interface visual monta integrações auxiliares no Data Fusion. O resultado reduz custo ocioso, evita código novo e usa uma ferramenta por tipo de fonte.'
    },
    prova: [
      '"Hundreds of TB or petabytes, limited bandwidth" aponta para Transfer Appliance; "scheduled transfer from S3/Azure/on-premises files" aponta para Storage Transfer Service; "SaaS data to BigQuery on a schedule" aponta para BigQuery Data Transfer Service.',
      '"Continuous replication / CDC from MySQL, PostgreSQL or Oracle to BigQuery" aponta para Datastream; "migrate database to Cloud SQL/AlloyDB with minimal downtime" aponta para Database Migration Service.',
      '"Existing Spark/Hadoop, reduce cost" aponta para Dataproc com Cloud Storage, cluster efêmero, workers Spot e autoscaling; "no cluster management for Spark" aponta para Serverless for Apache Spark; "visual ETL, no code" aponta para Data Fusion; "existing Kafka apps" aponta para Managed Kafka.'
    ],
    explique: 'Explique sem consultar: por que separar computação (Dataproc) de armazenamento (Cloud Storage) reduz custo, quando usar Datastream e quando usar Database Migration Service, e como decidir entre rede e Transfer Appliance.'
  },
  cartoes: [
    { id: 'd11c1', t: '2.2', f: 'Por que usar clusters Dataproc efêmeros com dados no Cloud Storage?', v: 'Separa computação de armazenamento: o cluster existe só durante o job e os dados persistem baratos e duráveis no GCS, reduzindo custo e permitindo isolamento por job.' },
    { id: 'd11c2', t: '5.1', f: 'Onde usar workers Spot no Dataproc e quais cuidados?', v: 'Como workers secundários, para computação tolerante a falha. Não armazenam HDFS confiável; mantenha dados no GCS, workers primários sob demanda e nunca o mestre em Spot.' },
    { id: 'd11c3', t: '2.2', f: 'Como evitar clusters Dataproc esquecidos ligados?', v: 'Use exclusão agendada: --max-idle, --max-age ou --expiration-time, ou Workflow Templates com cluster gerenciado criado e apagado automaticamente.' },
    { id: 'd11c4', t: '2.2', f: 'Quando preferir Serverless for Apache Spark a um cluster Dataproc?', v: 'Quando quer rodar Spark sem criar nem gerenciar cluster, pagando pelo uso. Cluster é melhor para controle fino, componentes específicos ou cargas sempre ligadas.' },
    { id: 'd11c5', t: '2.2', f: 'Qual o papel do Hive Metastore em clusters efêmeros?', v: 'Guarda o esquema das tabelas fora do cluster, para que as definições persistam e sejam compartilhadas entre clusters que são criados e apagados.' },
    { id: 'd11c6', t: '2.2', f: 'O que é o Cloud Data Fusion e onde executa?', v: 'ETL/ELT visual de baixo código baseado em CDAP; os pipelines publicados executam no Dataproc (Spark). A instância cobra por hora enquanto existe.' },
    { id: 'd11c7', t: '1.4', f: 'Quando usar Transfer Appliance?', v: 'Para centenas de TB a PB quando a rede é lenta, cara ou o prazo de transferência pela rede é inviável: carga offline com dispositivo físico enviado e devolvido.' },
    { id: 'd11c8', t: '1.4', f: 'Quando usar Storage Transfer Service?', v: 'Para mover objetos de S3, Azure, HTTP, on-premises (com agentes) ou entre buckets, de forma agendada ou única, com filtros e validação.' },
    { id: 'd11c9', t: '1.4', f: 'O que faz o BigQuery Data Transfer Service?', v: 'Carga agendada e gerenciada para o BigQuery de SaaS (Google Ads, YouTube etc.), Cloud Storage, Amazon S3 e warehouses como Teradata e Redshift, sem código.' },
    { id: 'd11c10', t: '1.4', f: 'Quando usar Datastream?', v: 'Para CDC contínuo, serverless, de MySQL, PostgreSQL, Oracle e SQL Server para BigQuery ou Cloud Storage, alimentando análise em tempo quase real.' },
    { id: 'd11c11', t: '1.4', f: 'Diferença entre Datastream e Database Migration Service.', v: 'Datastream replica para análise (BigQuery, GCS). DMS migra o banco operacional para Cloud SQL, AlloyDB e similares, com mínimo de downtime até o corte.' },
    { id: 'd11c12', t: '1.4', f: 'Diferença entre Cloud VPN e Cloud Interconnect.', v: 'VPN: túnel IPsec pela internet, rápido e barato, banda limitada por túnel. Interconnect: conexão privada dedicada ou via parceiro, mais banda, latência estável e prazo maior.' },
    { id: 'd11c13', t: '1.4', f: 'Para que serve o Private Google Access?', v: 'Permite que VMs sem IP externo acessem APIs e serviços do Google (Cloud Storage, BigQuery) por IPs internos, sem sair para a internet pública.' },
    { id: 'd11c14', t: '2.2', f: 'Quando escolher Managed Service for Apache Kafka em vez de Pub/Sub?', v: 'Quando há aplicações e ecossistema Kafka existentes e é preciso manter a API Kafka com menos operação; ainda se planejam capacidade e partições.' },
    { id: 'd11c15', t: '1.4', f: 'Como estimar se a rede basta para uma migração?', v: 'Divida o volume em bits pela banda efetiva disponível. Se resultar em semanas ou ocupar a rede de produção, considere Transfer Appliance ou link dedicado.' }
  ],
  questoes: [
    {
      id: 'd11q1', s: 1, t: '1.4',
      e: 'A media company must move 800 TB of archived video from its data center to Cloud Storage. Its internet link is 300 Mbps and shared with production traffic. The project must finish within three weeks. What should it use?',
      o: ['Storage Transfer Service over the internet link.', 'Transfer Appliance.', 'BigQuery Data Transfer Service.', 'Datastream.'],
      c: [1],
      x: 'Transfer Appliance é indicado para volumes de centenas de TB com rede lenta: 800 TB a 300 Mbps levariam bem mais que três semanas, mesmo com uso total do link. Storage Transfer Service pela internet sofre do mesmo limite de banda. O BigQuery Data Transfer Service carrega dados para o BigQuery de fontes específicas, não vídeos para o Cloud Storage. Datastream replica bancos de dados (CDC) e não arquivos.'
    },
    {
      id: 'd11q2', s: 1, t: '1.4',
      e: 'An online retailer runs an on-premises Oracle database for orders. Analysts need the data in BigQuery with latency of seconds to minutes, without custom code and without impacting the source heavily. Which service meets this requirement?',
      o: ['Database Migration Service to Cloud SQL.', 'Datastream with BigQuery as the destination.', 'Storage Transfer Service with daily exports.', 'Transfer Appliance.'],
      c: [1],
      x: 'Datastream faz CDC serverless lendo logs do banco (inclusive Oracle) e entregando no BigQuery com baixa latência e pouco impacto na origem. DMS migra o banco para outro banco operacional (Cloud SQL, AlloyDB), não para análise no BigQuery. Storage Transfer Service move arquivos, e exportações diárias não atendem a segundos ou minutos. Transfer Appliance é carga offline de volume, não replicação contínua.'
    },
    {
      id: 'd11q3', s: 1, t: '1.4',
      e: 'A company wants to migrate a production PostgreSQL database to Cloud SQL with minimal downtime, keeping the data synchronized until the cutover. Which service is MOST appropriate?',
      o: ['Datastream to Cloud Storage.', 'Database Migration Service.', 'BigQuery Data Transfer Service.', 'Cloud Data Fusion.'],
      c: [1],
      x: 'Database Migration Service faz carga inicial e replicação contínua até o corte, minimizando o downtime ao migrar para Cloud SQL. Datastream replica para BigQuery ou Cloud Storage para análise, não para um banco operacional gerenciado. O BigQuery Data Transfer Service é para carga em BigQuery. Data Fusion é ETL visual e não é a ferramenta para migrar o banco com sincronização contínua.'
    },
    {
      id: 'd11q4', s: 2, t: '2.2',
      e: 'A company runs Spark ETL jobs every night on a permanent Dataproc cluster with data in HDFS. The cluster sits idle 20 hours a day and costs are high. Which two changes reduce cost the MOST? Choose two.',
      o: ['Store data in Cloud Storage and create an ephemeral cluster per job.', 'Add more primary workers to finish the jobs faster on the permanent cluster.', 'Use Spot VMs as secondary workers for the fault-tolerant Spark tasks.', 'Move the data to local SSDs of the master node.', 'Disable autoscaling and keep a fixed cluster size.'],
      c: [0, 2],
      x: 'Cluster efêmero com dados no Cloud Storage elimina o custo de ociosidade, e workers secundários Spot reduzem o preço da computação em tarefas tolerantes a falha. Mais workers primários no cluster permanente aumentam o custo e mantêm o problema da ociosidade. SSDs locais do mestre acoplam dados a um nó e não escalam nem persistem. Desabilitar o autoscaling mantém capacidade paga sem necessidade.'
    },
    {
      id: 'd11q5', s: 2, t: '2.2',
      e: 'A small team without Spark cluster expertise wants to run occasional PySpark batch jobs and pay only while they run, with no cluster to create or delete. What is the BEST option?',
      o: ['A permanent Dataproc cluster with autoscaling.', 'Dataproc on a three-master high-availability cluster.', 'Serverless for Apache Spark batches.', 'A Compute Engine VM with Spark installed manually.'],
      c: [2],
      x: 'Serverless for Apache Spark executa lotes PySpark sem provisionar cluster e cobra pelo uso, o que atende equipes pequenas e cargas ocasionais. Um cluster permanente com autoscaling continua exigindo operar e pagar por recursos mínimos. O modo de alta disponibilidade com três mestres aumenta custo e complexidade. Uma VM com Spark manual implica instalação, patching e escala por conta da equipe.'
    },
    {
      id: 'd11q6', s: 2, t: '2.2',
      e: 'A business team with little coding experience needs to integrate data from several databases and SaaS applications into BigQuery using a drag-and-drop interface and prebuilt connectors. Which service should it choose?',
      o: ['Cloud Data Fusion.', 'Dataflow with a custom Beam pipeline.', 'Cloud Tasks.', 'Pub/Sub with a push subscription.'],
      c: [0],
      x: 'Cloud Data Fusion oferece interface visual de baixo código com muitos conectores prontos, executando os pipelines no Dataproc. Um pipeline Beam personalizado exige programação. Cloud Tasks despacha tarefas HTTP e não integra dados. Pub/Sub com push entrega mensagens a um endpoint e não é uma ferramenta de integração visual de fontes.'
    },
    {
      id: 'd11q7', s: 1, t: '1.4',
      e: 'Every night a marketing team needs data from Google Ads and YouTube loaded into BigQuery. They want a managed solution with no code. What should they use?',
      o: ['A custom Dataproc job calling the Ads API.', 'BigQuery Data Transfer Service with a scheduled transfer.', 'Transfer Appliance.', 'Database Migration Service.'],
      c: [1],
      x: 'O BigQuery Data Transfer Service tem conectores gerenciados para Google Ads e YouTube e agenda cargas recorrentes sem código. Um job Dataproc personalizado exige desenvolver e operar a integração. Transfer Appliance é transporte físico de grande volume. DMS migra bancos de dados e não lê dados de produtos de publicidade.'
    },
    {
      id: 'd11q8', s: 2, t: '2.2',
      e: 'A company has applications that use the Apache Kafka protocol and Kafka Connect, and wants Google to operate the brokers. It does not want to rewrite client code. Which service should it use?',
      o: ['Cloud Pub/Sub with schema validation.', 'Google Cloud Managed Service for Apache Kafka.', 'Cloud Tasks.', 'Cloud Storage subscription.'],
      c: [1],
      x: 'O Managed Service for Apache Kafka mantém o protocolo e o ecossistema Kafka (incluindo Connect) e transfere a operação dos brokers ao Google. Pub/Sub exigiria reescrever clientes para outra API. Cloud Tasks é fila de tarefas HTTP. Cloud Storage subscription é um tipo de assinatura do Pub/Sub que grava arquivos e não substitui o protocolo Kafka.'
    },
    {
      id: 'd11q9', s: 1, t: '1.4',
      e: 'A company needs to copy 40 TB from Amazon S3 into Cloud Storage once, and then synchronize new objects weekly. The team wants a managed service with scheduling and integrity checks. What should it use?',
      o: ['Storage Transfer Service.', 'Transfer Appliance.', 'Datastream.', 'Dataproc with distcp on a permanent cluster.'],
      c: [0],
      x: 'Storage Transfer Service copia de Amazon S3 para o Cloud Storage de forma gerenciada, com agendamento, filtros, transferências incrementais e verificação de integridade. Transfer Appliance é para dados on-premises com rede inviável, não para S3 acessível pela internet. Datastream faz CDC de bancos de dados. Dataproc com distcp funciona, mas exige cluster e operação manual, contrariando o requisito de serviço gerenciado.'
    },
    {
      id: 'd11q10', s: 1, t: '1.4',
      e: 'Virtual machines in a private subnet have no external IP addresses and must read data from Cloud Storage without traversing the public internet. Which configuration allows this?',
      o: ['Create a Cloud NAT gateway with a static public IP.', 'Enable Private Google Access on the subnet.', 'Attach external IPs temporarily to the VMs.', 'Use Transfer Appliance.'],
      c: [1],
      x: 'O Private Google Access na sub-rede permite que VMs sem IP externo alcancem APIs do Google, como Cloud Storage, por IPs internos. Cloud NAT permitiria saída para a internet pública, o que o requisito quer evitar. Atribuir IPs externos, mesmo que temporariamente, contraria a restrição e aumenta a exposição. Transfer Appliance é um dispositivo físico de migração e não tem relação com o acesso de VMs ao Cloud Storage.'
    }
  ]
};
C.dias[13] = {
  aula: {
    titulo: 'Orquestração e CI/CD: Composer, Workflows, Scheduler, Dataform e entrega de pipelines',
    simples: {
      analogia: 'Imagine uma orquestra. O **maestro** não toca nenhum instrumento. Ele decide quem entra, em que ordem e quando, e repete um trecho se alguém errar. O **orquestrador** de dados faz o mesmo: não transforma dados, só coordena BigQuery, Dataflow e outros serviços. O **Cloud Composer** é o maestro com partitura completa, para peças grandes com muitos músicos. O **Workflows** é um roteiro curto de poucos passos. O **Cloud Scheduler** é só um despertador: toca na hora marcada e não coordena ninguém. Se o maestro volta de férias, ele pode tocar os concertos perdidos de uma vez (**catchup**). Antes de uma peça nova ir ao palco, ela passa por um ensaio geral com revisão: é o **CI/CD**. Limite da analogia: o maestro rege ao vivo, mas o Airflow pode rodar execuções de dias passados, quando você pedir.',
      pontos: [
        'Orquestrador coordena **ordem, dependências, retries e horário**. Quem processa é outro serviço.',
        '**Composer** serve a fluxos grandes. **Workflows** a poucos passos. **Scheduler** só dispara.',
        'No Airflow, o fluxo é um **DAG**: tarefas ligadas por setas, sem voltar atrás.',
        '**Retries** repetem falhas passageiras. Por isso as tarefas precisam ser idempotentes.',
        '**Dataform** organiza vários SQLs no BigQuery, com testes de qualidade e Git.',
        '**CI/CD** testa e entrega código por pipeline. Nada de editar produção à mão.'
      ],
      paraQueServe: 'Você usa isso quando um fluxo diário tem várias etapas que dependem umas das outras, e você quer que ele rode sozinho, se recupere de falhas e seja entregue com segurança.'
    },
    glossario: [
      { t: 'Orquestração', d: 'Coordenar a ordem, as dependências e o horário de tarefas feitas por outros serviços.' },
      { t: 'DAG (Directed Acyclic Graph)', d: 'Fluxo de tarefas com dependências em uma direção, sem ciclos. É a unidade do Airflow.' },
      { t: 'Operador (operator)', d: 'Peça pronta do Airflow que executa um tipo de ação, como rodar uma consulta no BigQuery.' },
      { t: 'Sensor', d: 'Tarefa que espera uma condição, como a chegada de um arquivo, antes de seguir.' },
      { t: 'Retries', d: 'Novas tentativas automáticas quando uma tarefa falha, com espera entre elas.' },
      { t: 'Catchup', d: 'Opção do Airflow que cria execuções para todos os períodos passados desde a data de início.' },
      { t: 'Backfill', d: 'Rodar o fluxo de novo para um período antigo, de propósito, para reprocessar dados.' },
      { t: 'Cron', d: 'Formato de texto que descreve horários repetidos, como "todo dia às 3 horas".' },
      { t: 'CI/CD', d: 'Integração e entrega contínuas: testes e implantação automáticos a cada mudança no código.' },
      { t: 'Terraform (IaC)', d: 'Ferramenta que descreve a infraestrutura em arquivos de código e a cria de forma repetível.' }
    ],
    checagem: [
      'Sem olhar a aula: o que um orquestrador faz e o que ele não faz?',
      'Para cada caso, qual ferramenta: fluxo grande com muitas dependências, poucas chamadas de API, só disparar às 2 horas, muitos SQLs no BigQuery?',
      'O que o catchup faz e por que esquecê-lo pode gerar custo?',
      'Descreva o caminho de um DAG, do pull request até a produção.'
    ],
    resumo: 'Aprenda a escolher entre Cloud Composer, Workflows, Cloud Scheduler, Dataform e consultas agendadas, a escrever DAGs do Airflow com retries e catchup, e a montar CI/CD para dados com Git, Cloud Build, Terraform e ambientes dev e prod.',
    blocos: [
      {
        t: 'Orquestrar é coordenar, não processar',
        facil: 'Traduzindo: orquestrador é o maestro: não toca instrumento, só decide quem entra e quando. Escolha pelo tamanho do trabalho: Composer para fluxos grandes, Workflows para poucos passos, Scheduler só para despertar.',
        p: [
          'Orquestrador não transforma dados: ele decide a ORDEM, as DEPENDÊNCIAS, os RETRIES e o MOMENTO em que outros serviços (BigQuery, Dataflow, Dataproc, Cloud Run) trabalham, e registra o resultado. Esse é o conceito central da seção 2.3 e do 5.2. Pergunte sempre: o que dispara a execução (horário, evento, upstream), o que depende do quê, o que fazer em falha, e como reexecutar um período passado.',
          'Há quatro ferramentas principais e uma regra de decisão: dependências complexas entre muitas tarefas, com agenda, retries, backfill e visibilidade, pedem Cloud Composer. Poucas chamadas de API ou serviços em sequência, com lógica simples e baixo custo, pedem Workflows. Apenas disparar algo num horário, Cloud Scheduler. Transformações em SQL dentro do BigQuery com dependências e testes, Dataform; uma única consulta recorrente, consulta agendada.'
        ],
        tabela: {
          cab: ['Ferramenta', 'O que é', 'Escolha quando', 'Cuidado'],
          linhas: [
            ['Cloud Composer', 'Apache Airflow gerenciado: DAGs em Python, centenas de operadores, UI, agenda, retries, backfill.', 'Pipelines com muitas etapas e dependências entre sistemas, necessidade de reexecução, monitoramento rico, multicloud.', 'Ambiente sempre ligado: custo fixo. Excessivo para duas chamadas simples.'],
            ['Workflows', 'Orquestração serverless por YAML ou JSON: chamadas HTTP e conectores de serviços do Google, condicionais, loops, tratamento de erro.', 'Sequência simples de chamadas de API e serviços, event-driven, pagamento por etapa executada.', 'Não é feito para dependências de dados complexas, backfill e sensores ricos como o Airflow.'],
            ['Cloud Scheduler', 'Serviço de cron gerenciado: dispara alvo HTTP, Pub/Sub ou App Engine em horários.', 'Apenas agendar um disparo (por exemplo, acionar um Workflow ou uma Cloud Function).', 'Não tem dependências, retries por tarefa nem estado do fluxo.'],
            ['Dataform', 'Transformação SQL (SQLX) no BigQuery com grafo de dependências, assertions, documentação e Git.', 'Camadas ELT dentro do BigQuery com testes de qualidade e versionamento.', 'Só orquestra SQL no BigQuery; para outros sistemas combine com Composer ou Workflows.'],
            ['Consultas agendadas (BigQuery)', 'Uma consulta SQL recorrente, com destino tabela, via Data Transfer Service.', 'Uma única consulta ou poucas, independentes, sem dependências entre si.', 'Sem grafo de dependências nem assertions.']
          ]
        },
        dica: 'Palavra-chave "complex dependencies, retries, backfill, many tasks" é Composer. "Simple sequence of API calls, serverless, low cost" é Workflows. "Only trigger at 2 AM" é Scheduler. "SQL transformations with tests inside BigQuery" é Dataform.'
      },
      {
        t: 'Cloud Composer e Airflow: DAG, operadores, sensores, retries e catchup',
        facil: 'Traduzindo: no Airflow você desenha o fluxo como um DAG: tarefas com setas de dependência. Retries repetem falhas passageiras. Catchup decide se o Airflow recupera os dias que ficaram para trás.',
        p: [
          'Um DAG (Directed Acyclic Graph) é o fluxo: tarefas (tasks) com dependências sem ciclos. Cada tarefa é a instância de um operador: BigQueryInsertJobOperator (rodar SQL), BigQueryToGCSOperator (exportar), DataflowStartFlexTemplateOperator, DataprocCreateClusterOperator, GCSToBigQueryOperator e muitos outros. Sensores (por exemplo, GCSObjectExistenceSensor) esperam uma condição. Para sensores, prefira o modo deferrable ou mode="reschedule", que liberam o worker enquanto esperam, em vez de ocupá-lo.',
          'Cada execução do DAG tem um intervalo lógico de dados (data_interval_start e data_interval_end). catchup=True faz o Airflow criar execuções para todos os intervalos passados desde start_date até agora (backfill automático). catchup=False executa apenas o intervalo mais recente. Esquecer catchup=True ao ligar um DAG antigo dispara dezenas de execuções simultâneas e gera custo. Para um período específico, use o comando de backfill ou o recurso de rodar de novo na UI.',
          'Retries e SLAs: defina em default_args retries, retry_delay e retry_exponential_backoff; falhas transitórias (cota, rede) se resolvem sozinhas. Idempotência é obrigatória: como tarefas podem rodar de novo, use WRITE_TRUNCATE em partições, MERGE ou nomes de arquivo determinísticos por data lógica (macros como {{ ds }}). Evite XCom para dados grandes: passe referências (caminhos).',
          'from datetime import datetime, timedelta\nfrom airflow import DAG\nfrom airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator\nfrom airflow.providers.google.cloud.transfers.bigquery_to_gcs import BigQueryToGCSOperator\n\nwith DAG(\n    dag_id="vendas_diario",\n    start_date=datetime(2025, 1, 1),\n    schedule="0 3 * * *",\n    catchup=False,\n    default_args={"retries": 2, "retry_delay": timedelta(minutes=5)},\n) as dag:\n    agrega = BigQueryInsertJobOperator(\n        task_id="agrega",\n        configuration={"query": {"query": "SELECT ... WHERE dt = \'{{ ds }}\'", "useLegacySql": False}},\n    )\n    exporta = BigQueryToGCSOperator(\n        task_id="exporta",\n        source_project_dataset_table="proj.ds.vendas_{{ ds_nodash }}",\n        destination_cloud_storage_uris=["gs://bucket/saida/{{ ds }}/*.csv"],\n    )\n    agrega >> exporta'
        ],
        armadilha: 'DAG no Composer lê o código do bucket de DAGs. Código pesado no nível superior do arquivo (consultas, chamadas de API) roda a cada parse do scheduler e degrada o ambiente. Coloque lógica dentro das tarefas.'
      },
      {
        t: 'Composer 2 e 3, custo e operação',
        facil: 'Traduzindo: o Composer é o Airflow que o Google mantém, mas fica sempre ligado e cobra mesmo sem tarefas. Por isso não vale para um agendamento simples. Use versões atuais e ambientes separados.',
        p: [
          'O Composer gerencia a infraestrutura do Airflow: scheduler, workers, banco de metadados, servidor web. As gerações atuais (Composer 2 e Composer 3) usam autoscaling de workers e são cobradas pelos recursos consumidos mais uma taxa de ambiente. Composer 3 simplifica a infraestrutura (menos componentes expostos no seu projeto) e a configuração de rede. Composer 3 também suporta Airflow 3 e executa os componentes fora do seu projeto, com algumas restrições em relação ao Composer 2 (por exemplo, sem plugins de scheduler nem PyPI customizado para schedulers). Composer 1 está fora de manutenção desde 2024 e tinha fim de vida previsto para 15 de setembro de 2026 (essa data já passou; confira na documentação se o encerramento foi concluído), então não use em projeto novo. Confira na documentação o estado atual de cada versão e o suporte às versões de Airflow.',
          'Pontos que caem em prova: o ambiente é sempre ligado e tem custo mínimo mesmo sem DAGs rodando, então não é a escolha para um único agendamento simples; use contas de serviço dedicadas com privilégio mínimo; a UI do Airflow e o Cloud Monitoring mostram falhas e atrasos; DAGs vão para o bucket do ambiente (pasta dags/); dependências Python extras são instaladas pelo ambiente, e o Composer pode ser privado (sem IP público).',
          'Ambiente de teste e produção devem ser separados (projetos diferentes), e o ambiente de produção só recebe DAGs vindos do pipeline de CI/CD.'
        ]
      },
      {
        t: 'Workflows, Cloud Scheduler e Dataform em detalhe',
        facil: 'Traduzindo: Workflows encadeia chamadas num roteiro YAML. Scheduler é o despertador que dispara algo. Dataform põe muitos SQLs do BigQuery em ordem e testa a qualidade dos dados.',
        p: [
          'Workflows: o fluxo é um arquivo YAML com steps: chamadas HTTP, conectores prontos (BigQuery, Dataflow, Cloud Run, entre outros) que aguardam operações demoradas, expressões, condicionais, loops, paralelismo e try/except com retry. Cobra por etapa executada, sem ambiente fixo, e é ótimo como cola entre serviços. Exemplo típico: Scheduler chama o Workflow, que roda um job do BigQuery, espera o resultado, chama uma Cloud Run function e notifica em caso de falha.',
          'Cloud Scheduler: cron (formato unix) com fuso horário; alvos HTTP/S, Pub/Sub e App Engine; suporta retry configurável. Cobre a lacuna do "quando" para outros serviços, mas não coordena dependências.',
          'Dataform: você escreve arquivos SQLX (SQL com cabeçalho de configuração: tipo table, view, incremental, declaration; funções como ref("outra_tabela") que criam o grafo de dependências automaticamente). Assertions (por exemplo, nonNull, uniqueKey, rowConditions) são testes de qualidade que falham o fluxo. O repositório é versionado em Git, com ambientes de desenvolvimento por workspace, e execuções podem ser agendadas com configurações de workflow. O processamento roda no BigQuery; você paga o BigQuery, não o Dataform.',
          'config { type: "incremental", uniqueKey: ["pedido_id"], assertions: { nonNull: ["pedido_id"] } }\nSELECT pedido_id, cliente_id, valor, atualizado_em\nFROM ${ref("pedidos_raw")}\n${when(incremental(), `WHERE atualizado_em > (SELECT MAX(atualizado_em) FROM ${self()})`)}'
        ],
        lista: [
          'Consulta agendada: ideal para uma única consulta recorrente (por exemplo, agregação diária) sem grafo.',
          'Dataform substitui dezenas de consultas agendadas encadeadas por um grafo versionado e testado.',
          'Disparo por evento (arquivo novo no bucket) usa Eventarc com Workflows ou Cloud Run, ou sensor no Composer.'
        ]
      },
      {
        t: 'CI/CD para dados: Git, Cloud Build, Terraform, ambientes e testes',
        facil: 'Traduzindo: trate pipelines como software: código no Git, testes automáticos a cada mudança, entrega por Cloud Build, infraestrutura em Terraform e dev e prod em projetos separados.',
        p: [
          'Trate pipelines de dados como software: código e SQL no Git (revisão por pull request), testes automáticos, implantação por pipeline e infraestrutura como código. Fluxo típico: o desenvolvedor abre um pull request; o Cloud Build executa verificações (lint, testes unitários do Beam com DirectRunner, validação de DAGs, compilação do Dataform); na aprovação e merge para a branch principal, outro gatilho implanta em produção.',
          'O que implantar e como: DAGs são copiados para o bucket do ambiente do Composer (gcloud storage cp ou rsync); templates do Dataflow viram Flex Templates: construa a imagem com Cloud Build, guarde no Artifact Registry e registre o spec no Cloud Storage; infraestrutura (datasets, tópicos, buckets, ambientes Composer, contas de serviço) é declarada com Terraform e aplicada com plan e apply, mantendo estado remoto no Cloud Storage; SQL do Dataform vem do repositório Git.',
          'Ambientes: dev, staging e prod separados por PROJETO, cada um com suas contas de serviço, IAM e quotas, parametrizados por variáveis (nome do projeto, dataset, bucket). Dados sensíveis não vão para dev: use amostras ou dados mascarados. A promoção entre ambientes é feita pela mesma definição com variáveis diferentes, nunca editando em produção.',
          'Testes de pipeline em camadas: unitários (funções e DoFns com dados pequenos e TestPipeline), integração (pipeline completo com DirectRunner ou em projeto de dev com dados de amostra), de contrato e qualidade (assertions do Dataform, verificações de contagem, nulos e unicidade), e de DAG (importar sem erro, sem ciclos, retries e tags corretos). Um gatilho do Cloud Build executa isso a cada pull request.',
          'steps:\n  - name: python:3.11\n    entrypoint: bash\n    args: ["-c", "pip install -r requirements-dev.txt && pytest tests/"]\n  - name: gcr.io/google.com/cloudsdktool/cloud-sdk\n    entrypoint: gcloud\n    args: ["storage", "rsync", "--recursive", "dags/", "gs://${_BUCKET_DAGS}/dags/"]\nsubstitutions:\n  _BUCKET_DAGS: bucket-composer-prod'
        ],
        armadilha: 'Deploy manual de DAG em produção pelo console contorna revisão e testes. A resposta de prova para repetibilidade e auditoria é pipeline de CI/CD com Git, Cloud Build e Terraform.'
      }
    ],
    exemplo: {
      t: 'Escolhendo a orquestração de um fluxo noturno',
      texto: 'Uma varejista tem este fluxo noturno: esperar o arquivo do ERP chegar no Cloud Storage, carregar no BigQuery, rodar 40 transformações SQL com dependências e testes, executar um job Dataflow de enriquecimento, e exportar relatórios; se algo falhar, tentar de novo três vezes e alertar. Passo 1: são dezenas de etapas com dependências em vários sistemas, então a orquestração geral é Cloud Composer, com sensor deferrable para o arquivo e retries no default_args. Passo 2: as 40 transformações SQL ficam em Dataform, com ref() para o grafo e assertions para qualidade; o DAG dispara a execução do Dataform por operador. Passo 3: se o requisito fosse apenas "chamar uma Cloud Function às 2h", bastaria Scheduler; se fosse uma sequência curta de três chamadas de API, Workflows custaria menos que um ambiente Composer. Passo 4: o DAG e o SQL ficam no Git; o Cloud Build testa a importação do DAG e implanta no bucket de produção após merge; Terraform cria buckets e contas de serviço. Resultado: execuções repetíveis, auditáveis e com reprocesso por backfill.'
    },
    prova: [
      '"Complex dependencies / backfill / retries / monitor many tasks across services" aponta para Composer; "simple, serverless, call a few APIs in order, pay per step" aponta para Workflows; "trigger at a specific time" aponta para Cloud Scheduler.',
      '"SQL transformations in BigQuery with dependency graph, data quality tests, version control" aponta para Dataform; "single recurring query" aponta para scheduled query. "Rerun a past date range" aponta para catchup e backfill do Airflow.',
      '"Repeatable, auditable deployments of pipelines across dev and prod" aponta para Git, Cloud Build e Terraform com projetos separados; "validate a DAG before deploying" aponta para teste de importação do DagBag em CI.'
    ],
    explique: 'Explique sem consultar: quando você escolheria Composer, Workflows, Scheduler ou Dataform, o que catchup e backfill fazem no Airflow, e como seria um pipeline de CI/CD que leva um DAG do pull request até produção.'
  },
  cartoes: [
    { id: 'd13c1', t: '2.3', f: 'Quando escolher Cloud Composer?', v: 'Para pipelines com muitas tarefas e dependências entre sistemas, agenda, retries, backfill e monitoramento rico. Tem custo fixo por ambiente sempre ligado.' },
    { id: 'd13c2', t: '2.3', f: 'Quando escolher Workflows em vez de Composer?', v: 'Para sequências simples de chamadas de API e serviços, serverless e pagamento por etapa executada, sem ambiente fixo.' },
    { id: 'd13c3', t: '2.3', f: 'O que o Cloud Scheduler faz e não faz?', v: 'Faz cron gerenciado disparando HTTP, Pub/Sub ou App Engine. Não gerencia dependências nem estado de fluxos; combina com Workflows ou funções.' },
    { id: 'd13c4', t: '2.3', f: 'O que é Dataform?', v: 'Ferramenta de transformação SQL (SQLX) no BigQuery com grafo via ref(), assertions, Git e agendamento; o processamento ocorre no BigQuery.' },
    { id: 'd13c5', t: '2.3', f: 'Qual a diferença entre consulta agendada e Dataform?', v: 'Consulta agendada: uma consulta recorrente isolada. Dataform: vários modelos SQL com dependências, testes de qualidade e versionamento.' },
    { id: 'd13c6', t: '5.2', f: 'O que faz catchup=True em um DAG do Airflow?', v: 'Cria execuções para todos os intervalos passados desde start_date (backfill automático). Com catchup=False roda só o intervalo mais recente.' },
    { id: 'd13c7', t: '5.2', f: 'Por que tarefas de DAG devem ser idempotentes?', v: 'Porque retries e reexecuções (backfill) rodam a tarefa de novo. Use WRITE_TRUNCATE por partição, MERGE ou nomes determinísticos por data lógica.' },
    { id: 'd13c8', t: '2.3', f: 'Qual a vantagem de sensores deferrable ou em modo reschedule?', v: 'Liberam o worker enquanto esperam a condição, em vez de ocupá-lo, reduzindo custo e risco de esgotar slots.' },
    { id: 'd13c9', t: '2.3', f: 'Onde o Composer lê o código dos DAGs?', v: 'Da pasta dags/ do bucket do Cloud Storage associado ao ambiente. O deploy de DAG é copiar o arquivo para lá, de preferência via CI/CD.' },
    { id: 'd13c10', t: '2.3', f: 'Por que não colocar consultas pesadas no nível superior de um arquivo de DAG?', v: 'O scheduler faz parse do arquivo com frequência; código no nível superior roda a cada parse e degrada o ambiente. Coloque a lógica dentro das tarefas.' },
    { id: 'd13c11', t: '5.2', f: 'Como separar ambientes dev e prod em dados?', v: 'Projetos distintos com IAM e contas de serviço próprios, mesma definição parametrizada por variáveis, promoção via CI/CD e dados sensíveis mascarados ou amostrados em dev.' },
    { id: 'd13c12', t: '5.2', f: 'Qual o papel do Terraform em dados?', v: 'Infraestrutura como código: declara datasets, tópicos, buckets, ambientes e IAM de forma repetível, com plan e apply e estado remoto, evitando configuração manual.' },
    { id: 'd13c13', t: '5.2', f: 'Como o Cloud Build entra no CI/CD de pipelines?', v: 'Gatilhos do Git executam testes (unitários, validação de DAG) e implantam: copiar DAGs, construir Flex Templates em imagem e aplicar Terraform.' },
    { id: 'd13c14', t: '5.2', f: 'Quais camadas de teste para pipelines de dados?', v: 'Unitário (DoFns e funções), integração (DirectRunner ou projeto dev), qualidade (assertions, contagens, nulos, unicidade) e teste de DAG (importa sem erro e sem ciclos).' },
    { id: 'd13c15', t: '2.3', f: 'Como disparar um fluxo por evento de arquivo novo no bucket?', v: 'Eventarc ou notificação do Cloud Storage acionando Workflows ou Cloud Run; no Airflow, um sensor ou DAG acionado por evento em vez de horário.' }
  ],
  questoes: [
    {
      id: 'd13q1', s: 2, t: '2.3',
      e: 'A company runs a nightly pipeline with 60 interdependent tasks across BigQuery, Dataflow and Dataproc. It needs retries, backfill of past dates and a UI to monitor failures. Which service should it use?',
      o: ['Cloud Scheduler.', 'Workflows.', 'Cloud Composer.', 'BigQuery scheduled queries.'],
      c: [2],
      x: 'Cloud Composer (Airflow gerenciado) foi feito para muitos DAGs com dependências complexas entre sistemas, retries, backfill e UI de monitoramento. Cloud Scheduler só dispara em horários, sem dependências. Workflows atende sequências simples de chamadas, mas não oferece backfill nem a visibilidade de dezenas de tarefas como o Airflow. Consultas agendadas executam apenas SQL no BigQuery, sem orquestrar Dataflow ou Dataproc.'
    },
    {
      id: 'd13q2', s: 2, t: '2.3',
      e: 'A team must call three REST APIs and a BigQuery job in sequence, with conditional logic and error handling. The process runs a few times a day and the team wants the LOWEST cost with no infrastructure to manage. Which option is BEST?',
      o: ['Workflows.', 'A Cloud Composer environment.', 'A permanent Dataproc cluster.', 'A Compute Engine VM running cron.'],
      c: [0],
      x: 'Workflows é serverless, cobra por etapa executada e atende sequências simples de chamadas HTTP e conectores com condicionais e tratamento de erro. Um ambiente Composer tem custo fixo contínuo e é excessivo para poucas chamadas. Um cluster Dataproc permanente é para processamento Spark, não orquestração. Uma VM com cron exige gerenciar infraestrutura, patches e alta disponibilidade.'
    },
    {
      id: 'd13q3', s: 2, t: '2.3',
      e: 'Analysts maintain 40 SQL transformations in BigQuery with dependencies between tables. They want automatic dependency ordering, data quality assertions, version control and scheduled runs. Which service fits BEST?',
      o: ['Forty separate scheduled queries.', 'Dataform.', 'Cloud Scheduler calling a Cloud Function per query.', 'Dataflow batch pipelines.'],
      c: [1],
      x: 'Dataform organiza modelos SQLX com ref() para montar o grafo de dependências, assertions para qualidade, Git para versionamento e agendamento, tudo executado no BigQuery. Quarenta consultas agendadas separadas não têm dependências nem testes e são difíceis de manter na ordem correta. Scheduler com funções repete esse problema e adiciona código. Dataflow tiraria os dados do BigQuery e exigiria código Beam sem necessidade.'
    },
    {
      id: 'd13q4', s: 2, t: '2.3',
      e: 'An Airflow DAG was created with a start_date six months ago and a daily schedule, and it is deployed for the first time with catchup enabled. What happens, and how should the team avoid unwanted cost? Choose two.',
      o: ['Airflow creates runs for every missed daily interval since start_date.', 'Airflow runs only the most recent interval regardless of catchup.', 'Setting catchup to False runs only the latest interval and avoids the burst of historical runs.', 'catchup only affects sensors, not DAG runs.', 'Composer automatically deletes old runs before they execute.'],
      c: [0, 2],
      x: 'Com catchup habilitado, o Airflow cria execuções de cada intervalo perdido desde start_date (aqui, cerca de 180), o que pode gerar custo e carga; definir catchup como False executa apenas o intervalo mais recente, e backfills específicos podem ser feitos de modo controlado. Dizer que roda só o mais recente independentemente do parâmetro é falso. Catchup afeta execuções de DAG e não só sensores. O Composer não apaga execuções antes que elas rodem.'
    },
    {
      id: 'd13q5', s: 2, t: '2.3',
      e: 'A team wants a job to run at 02:00 every day. The job itself is a single Cloud Run service endpoint that accepts an HTTP POST. There are no dependencies. What is the SIMPLEST solution?',
      o: ['Create a Cloud Composer environment with one DAG.', 'Create a Cloud Scheduler job that sends an HTTP request to the Cloud Run endpoint.', 'Create a Dataflow streaming job.', 'Use Dataform with a workflow configuration.'],
      c: [1],
      x: 'Para apenas disparar um endpoint HTTP em horário fixo, Cloud Scheduler é a solução mais simples e barata. Composer traria um ambiente sempre ligado para uma única chamada. Dataflow streaming é para processamento contínuo e não para agendar um POST. Dataform orquestra transformações SQL no BigQuery e não chama endpoints de Cloud Run.'
    },
    {
      id: 'd13q6', s: 5, t: '5.2',
      e: 'A company wants every change to its data pipelines to be peer reviewed, tested automatically and deployed to production in a repeatable way. Infrastructure such as buckets and Pub/Sub topics must also be consistent between environments. Which approach meets these requirements?',
      o: ['Developers edit DAGs directly in the production bucket from the console.', 'Store code and Terraform in Git, run tests in Cloud Build on pull requests, and deploy on merge using separate dev and prod projects.', 'Share one project for dev and prod and separate them with labels.', 'Export the configuration to a spreadsheet and apply it by hand.'],
      c: [1],
      x: 'Git com revisão por pull request, Cloud Build executando testes e implantação, e Terraform para infraestrutura como código entregam repetibilidade, auditoria e consistência, com ambientes isolados em projetos separados. Edição direta em produção contorna revisão e testes. Rótulos não isolam IAM, quotas nem dados entre dev e prod. Planilha com aplicação manual é propensa a erros e não é auditável.'
    },
    {
      id: 'd13q7', s: 2, t: '2.3',
      e: 'A Composer DAG has a sensor that waits up to 6 hours for a file in Cloud Storage. The environment is running out of worker slots because many sensors occupy workers while waiting. Which change helps MOST?',
      o: ['Use deferrable sensors or reschedule mode so workers are released while waiting.', 'Increase the sensor poke interval to 1 second.', 'Convert all sensors to PythonOperators with sleep loops.', 'Disable retries on the sensors.'],
      c: [0],
      x: 'Sensores em modo deferrable ou reschedule liberam o worker entre verificações, evitando ocupar slots por horas. Reduzir o intervalo para 1 segundo aumenta a pressão e as chamadas. PythonOperator com sleep ocupa o worker durante toda a espera, o que piora o problema. Desabilitar retries não libera slots e reduz a resiliência.'
    },
    {
      id: 'd13q8', s: 2, t: '2.3',
      e: 'A DAG task loads data into a BigQuery table using an append write disposition. After a transient failure the task is retried, and the table contains duplicate rows. What should the team change?',
      o: ['Make the task idempotent, for example by writing to a date partition with WRITE_TRUNCATE or using MERGE on a key.', 'Remove retries from the DAG.', 'Increase the Composer environment size.', 'Switch the DAG schedule to every minute.'],
      c: [0],
      x: 'Retries e backfills reexecutam tarefas, então elas precisam ser idempotentes: gravar na partição da data lógica com WRITE_TRUNCATE ou usar MERGE por chave produz o mesmo resultado em qualquer número de execuções. Remover retries perde a resiliência a falhas transitórias e não resolve reexecuções manuais. Aumentar o ambiente não altera a lógica de escrita. Agendar a cada minuto aumentaria as execuções e as duplicatas.'
    },
    {
      id: 'd13q9', s: 5, t: '5.2',
      e: 'A data engineering team wants to detect broken DAG files before deployment to Composer, so invalid imports never reach production. Which two practices help? Choose two.',
      o: ['Run a CI test in Cloud Build that loads the DAGs folder with DagBag and fails on import errors.', 'Test the DAG for the first time in production on a low-traffic night.', 'Run linting and unit tests for custom operators and functions on every pull request.', 'Ask each developer to inspect the code visually and approve in chat.', 'Disable the Airflow scheduler until all DAGs are verified in production.'],
      c: [0, 2],
      x: 'Um teste de CI que carrega a pasta de DAGs com DagBag falha em erros de importação e ciclos antes do deploy, e lint mais testes unitários em cada pull request detectam problemas de lógica cedo. Testar pela primeira vez em produção expõe os clientes ao erro. Revisão apenas visual sem automação não é confiável nem repetível. Desabilitar o scheduler em produção para verificar não é prática e interrompe os fluxos.'
    },
    {
      id: 'd13q10', s: 2, t: '2.3',
      e: 'A data team runs one BigQuery SQL aggregation every morning that writes to a summary table. It has no dependencies on other jobs and requires no testing framework. What is the MOST cost-effective way to schedule it?',
      o: ['Create a Cloud Composer environment.', 'Use a BigQuery scheduled query.', 'Deploy a Dataproc cluster that runs a Spark job.', 'Create a Dataflow batch template.'],
      c: [1],
      x: 'Uma consulta agendada do BigQuery executa SQL recorrente com destino em tabela, sem infraestrutura nem custo adicional de orquestração. Um ambiente Composer teria custo fixo desproporcional para uma consulta isolada. Dataproc e Dataflow tirariam os dados do BigQuery e exigiriam código e recursos para algo que o SQL resolve nativamente.'
    }
  ],
  lab: {
    t: 'Escrever e validar um DAG do Airflow localmente (consulta BigQuery e exportação para GCS)',
    tempo: '40 a 60 minutos',
    antes: 'Você precisa de Linux, WSL, Docker ou Cloud Shell, porque o Airflow não roda nativamente no Windows. Também precisa de Python e de paciência: instalar o Airflow leva vários minutos e imprime centenas de linhas. Não precisa de Composer nem de nuvem para a parte principal. Ao rodar airflow dags list-import-errors, a tela fica vazia quando está tudo certo. Isso é bom sinal. O comando airflow dags list mostra uma tabela com o nome vendas_diario. O pytest termina com a linha "2 passed". O passo opcional usa o BigQuery de verdade e pede autenticação com gcloud auth application-default login. Antes de rodar, troque SEU_PROJETO e SEU_BUCKET_LAB nos arquivos.',
    erros: [
      { s: 'Falha ao instalar o Airflow: conflito de dependências ou erro com o constraints', c: 'A versão do Python não bate com a do arquivo de constraints usado no pip install.', r: 'Use na URL de constraints a versão do Python que você tem e a versão do Airflow escolhida. Instale em um ambiente virtual novo.' },
      { s: 'ModuleNotFoundError: No module named airflow.providers.google', c: 'O pacote apache-airflow-providers-google não foi instalado no ambiente ativo.', r: 'Ative o ambiente virtual certo e rode pip install apache-airflow-providers-google, com o mesmo arquivo de constraints.' },
      { s: 'airflow dags list-import-errors mostra um erro de importação', c: 'Erro de sintaxe ou de import no arquivo do DAG, ou caminho de pasta de DAGs errado.', r: 'Rode python dags/vendas_diario.py e leia a mensagem. Confira a variável AIRFLOW__CORE__DAGS_FOLDER apontando para a pasta dags.' },
      { s: '"db migrate" não existe ou o comando falha', c: 'Versão antiga do Airflow, em que o comando se chamava db init.', r: 'Rode airflow db init. Em versões novas, use airflow db migrate.' },
      { s: 'DefaultCredentialsError ou 404 Not found: dataset ao rodar dags test', c: 'Você não autenticou no gcloud, ou esqueceu de trocar SEU_PROJETO, ou o dataset lab_af não existe.', r: 'Rode gcloud auth application-default login, troque os nomes nos arquivos e crie o dataset com bq mk antes.' }
    ],
    custo: 'US$ 0 para escrever e validar localmente (nenhum recurso na nuvem). Rodar no Composer é opcional e caro (ambiente sempre ligado, cobrança por hora); só faça com crédito e apague logo depois.',
    porque: 'Você aprende a estrutura de DAG, operadores do Google, retries, catchup e como testar um DAG em CI sem Composer, que é exatamente o que um pipeline de CI/CD faz.',
    passos: [
      { t: 'Criar ambiente Python e instalar Airflow com providers do Google', cmd: 'python -m venv venv-af\nsource venv-af/bin/activate   # Windows: venv-af\\Scripts\\activate\npip install "apache-airflow==2.10.5" apache-airflow-providers-google --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-2.10.5/constraints-3.11.txt"', p: 'Airflow exige um arquivo de constraints para versões compatíveis; o Airflow 2.10.5 é uma versão antiga, usada aqui só como exemplo: ajuste a versão do Airflow e do Python (a URL de constraints segue o padrão constraints-VERSAO_AIRFLOW/constraints-VERSAO_PYTHON.txt) conforme a documentação do Airflow. No Windows, rode no WSL ou Docker, pois o Airflow não é suportado nativamente no Windows.' },
      { t: 'Escrever o DAG (dags/vendas_diario.py)', cmd: 'mkdir -p dags && cat > dags/vendas_diario.py <<\'EOF\'\nfrom datetime import datetime, timedelta\nfrom airflow import DAG\nfrom airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator\nfrom airflow.providers.google.cloud.transfers.bigquery_to_gcs import BigQueryToGCSOperator\n\nwith DAG(\n    dag_id="vendas_diario",\n    start_date=datetime(2025, 1, 1),\n    schedule="0 3 * * *",\n    catchup=False,\n    default_args={"retries": 2, "retry_delay": timedelta(minutes=5)},\n    tags=["lab"],\n) as dag:\n    agrega = BigQueryInsertJobOperator(\n        task_id="agrega",\n        configuration={"query": {\n            "query": "SELECT DATE(\'{{ ds }}\') AS dt, COUNT(*) AS n FROM `bigquery-public-data.samples.shakespeare`",\n            "useLegacySql": False,\n            "destinationTable": {"projectId": "SEU_PROJETO", "datasetId": "lab_af", "tableId": "resumo_{{ ds_nodash }}"},\n            "writeDisposition": "WRITE_TRUNCATE",\n        }},\n    )\n    exporta = BigQueryToGCSOperator(\n        task_id="exporta",\n        source_project_dataset_table="SEU_PROJETO.lab_af.resumo_{{ ds_nodash }}",\n        destination_cloud_storage_uris=["gs://SEU_BUCKET_LAB/saida/{{ ds }}/resumo.csv"],\n    )\n    agrega >> exporta\nEOF', p: 'Duas tarefas encadeadas por >>, retries, catchup desligado e escrita idempotente com WRITE_TRUNCATE no destino com data lógica. Troque SEU_PROJETO e SEU_BUCKET_LAB.' },
      { t: 'Validar sintaxe e importação', cmd: 'python dags/vendas_diario.py\nexport AIRFLOW__CORE__DAGS_FOLDER=$(pwd)/dags\nexport AIRFLOW__CORE__LOAD_EXAMPLES=False\nairflow db migrate\nairflow dags list-import-errors\nairflow dags list\nairflow tasks list vendas_diario --tree', p: 'Se o arquivo importa sem exceção, list-import-errors não mostra nada e o DAG aparece na lista. A árvore mostra a dependência agrega >> exporta. Em versões antigas do Airflow, "db migrate" é "db init".' },
      { t: 'Escrever um teste automatizado de DAG (tests/test_dags.py)', cmd: 'mkdir -p tests && cat > tests/test_dags.py <<\'EOF\'\nfrom airflow.models import DagBag\n\ndef test_sem_erros_de_importacao():\n    bag = DagBag(dag_folder="dags", include_examples=False)\n    assert bag.import_errors == {}\n\ndef test_retries_configurados():\n    bag = DagBag(dag_folder="dags", include_examples=False)\n    dag = bag.get_dag("vendas_diario")\n    assert dag.default_args["retries"] >= 1\n    assert dag.catchup is False\nEOF\npip install pytest\npytest tests/ -q', p: 'Esse é o mesmo teste que um gatilho do Cloud Build rodaria a cada pull request antes de copiar o DAG para o bucket do Composer.' },
      { t: 'Opcional (custo): rodar de verdade no BigQuery sem Composer', cmd: 'bq mk --dataset SEU_PROJETO:lab_af\ngcloud storage buckets create gs://SEU_BUCKET_LAB --location=US\nairflow dags test vendas_diario 2025-01-02', p: 'O comando airflow dags test executa o DAG uma vez, localmente, usando suas credenciais (gcloud auth application-default login). O custo é de poucos bytes processados no dataset público. Só use Composer se tiver crédito: um ambiente fica cobrando enquanto existir.' }
    ],
    limpar: [
      'bq rm -r -f -d SEU_PROJETO:lab_af',
      'gcloud storage rm -r gs://SEU_BUCKET_LAB',
      'Se criou um ambiente Composer: gcloud composer environments delete NOME --location=REGIAO e depois apague o bucket de DAGs que sobrou',
      'Apague o ambiente virtual local (venv-af) se não precisar mais'
    ],
    verificar: 'airflow dags list-import-errors não mostra erros, o DAG vendas_diario aparece na lista com duas tarefas encadeadas e pytest passa com 2 testes; no passo opcional, a tabela resumo e o CSV aparecem.'
  }
};
})(typeof window !== 'undefined' ? window : globalThis);
