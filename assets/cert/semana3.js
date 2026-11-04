(function (root) {
  var C = root.CP_CERT_CONTEUDO = root.CP_CERT_CONTEUDO || { dias: {} };
  C.dias[15] = {
 "aula": {
  "titulo": "Privacidade, residência e governança",
  "simples": {
   "analogia": "Imagine um prédio com um cofre no térreo. Proteger dados é responder **três perguntas diferentes**. Primeira: **quem tem a chave** de cada gaveta do cofre? Segunda: **onde fica o prédio** e quem pode carregar caixas para fora dele? Terceira: **o que está escrito dentro dos papéis**, e dá para cobrir o que é secreto antes de mostrar? Cada pergunta tem uma ferramenta própria. Trocar a fechadura da gaveta não muda onde o prédio fica. E uma fechadura melhor não encontra um CPF escondido no meio de uma carta. Existe ainda a câmera da portaria: ela não impede nada, só registra quem entrou e o que mexeu, para provar depois. Limite da analogia: no Google Cloud, o registro de quem LEU dados muitas vezes vem desligado, e você precisa ligar antes de precisar dele.",
   "pontos": [
    "Segurança de dados são três perguntas: quem vê, onde mora e o que há dentro.",
    "**Permissões, policy tags e máscaras** controlam quem vê cada coluna ou linha.",
    "**Localização do dataset** e **VPC Service Controls** controlam onde o dado fica e por onde sai.",
    "**Sensitive Data Protection** acha e transforma dado sensível, até dentro de texto livre.",
    "**Audit logs** registram o que aconteceu; leitura de dados geralmente precisa ser ligada.",
    "Hash e máscara não voltam atrás; criptografia com chave permite recuperar o original."
   ],
   "paraQueServe": "Você usa isso quando precisa liberar dados com CPF ou e-mail para analistas sem expor o que eles não devem ver, e depois provar para a auditoria quem acessou."
  },
  "glossario": [
   {
    "t": "PII (Personally Identifiable Information)",
    "d": "Dado que identifica uma pessoa: CPF, e-mail, telefone, endereço. É o que a lei de privacidade manda proteger."
   },
   {
    "t": "IAM (Identity and Access Management)",
    "d": "O sistema de permissões do Google Cloud. Define quem (pessoa, grupo ou conta de serviço) pode fazer o quê em qual recurso."
   },
   {
    "t": "Sensitive Data Protection (antigo Cloud DLP)",
    "d": "DLP vem de Data Loss Prevention. É um detetive de dados: varre textos, tabelas e imagens e marca onde há CPF ou cartão. Ex.: em 10.000 tickets, aponta os 312 que têm telefone."
   },
   {
    "t": "infoType",
    "d": "O nome de um tipo de dado sensível que o detetive procura, como EMAIL_ADDRESS ou CREDIT_CARD_NUMBER. Você pode criar os seus."
   },
   {
    "t": "Policy tag",
    "d": "Etiqueta de segurança colocada numa coluna do BigQuery. Só quem tem permissão na etiqueta consegue ler aquela coluna."
   },
   {
    "t": "Tokenização",
    "d": "Trocar o valor real por um código. Se o código for feito com uma chave, quem tem a chave consegue voltar ao valor original."
   },
   {
    "t": "Cloud KMS e CMEK (Customer-Managed Encryption Key)",
    "d": "KMS guarda chaves de criptografia. CMEK é usar uma chave sua, em vez da gerenciada pelo Google. É como ficar com a chave do cadeado do cofre: se você desativa 1 chave, as 50 tabelas que dependem dela ficam ilegíveis. Enquanto a chave está ativa, quem tem permissão lê normalmente."
   },
   {
    "t": "VPC Service Controls (VPC SC)",
    "d": "Uma cerca invisível ao redor dos seus projetos e serviços. Mesmo quem tem a permissão certa não consegue mandar dados para fora da cerca. Ex.: você exporta uma tabela para um bucket de projeto pessoal e a cerca bloqueia."
   },
   {
    "t": "Residência de dados",
    "d": "Exigência de que o dado fique guardado em um lugar, como um país ou a União Europeia. Controla onde o dado mora, não quem o lê."
   },
   {
    "t": "Audit logs",
    "d": "O diário do Google Cloud: registra quem fez o quê e quando. Mudanças de configuração sempre são anotadas; leitura de dados muitas vezes precisa ser ligada."
   }
  ],
  "checagem": [
   "Sem olhar a aula: quais são as três perguntas de segurança de dados e uma ferramenta para cada uma?",
   "Qual a diferença entre mascarar, aplicar hash e criptografar de forma determinística um CPF? Qual deles volta ao original?",
   "Que controle impede alguém com permissão válida de levar uma tabela para fora da organização?",
   "Se o CPF está solto dentro de um texto livre, por que uma policy tag não resolve?"
  ],
  "resumo": "Como proteger dado sensível de ponta a ponta no Google Cloud: detectar e transformar PII com Sensitive Data Protection, restringir quem vê colunas no BigQuery, controlar onde o dado mora, auditar acessos e governar com o Knowledge Catalog (antigo Dataplex Universal Catalog).",
  "blocos": [
   {
    "t": "Ideia central: três perguntas diferentes",
    "facil": "Traduzindo: antes de escolher a ferramenta, descubra qual é a pergunta: quem vê, onde o dado fica ou o que existe dentro dele. Cada pergunta tem uma ferramenta diferente.",
    "p": [
     "Segurança de dados na prova se resolve separando três perguntas que parecem a mesma. Primeira: QUEM pode ver este dado? (IAM, policy tags, row-level security, mascaramento, authorized views). Segunda: ONDE o dado pode existir e por onde ele pode sair? (localização do dataset, organization policy de locais, VPC Service Controls). Terceira: O QUE há dentro do dado e como transformá-lo? (Sensitive Data Protection, antigo Cloud DLP). Muitas alternativas erradas respondem bem a pergunta errada, por exemplo propor VPC Service Controls para esconder uma coluna ou policy tag para achar CPF em texto livre.",
     "Uma quarta camada atravessa as três: a evidência. Audit logs dizem quem fez o quê, e o Knowledge Catalog (antigo Dataplex Universal Catalog; catálogo, linhagem, perfil e qualidade) diz o que existe, de onde veio e se pode ser confiado. Governança é a soma: dono, classificação, controle de acesso, localização, trilha de auditoria e qualidade."
    ]
   },
   {
    "t": "Sensitive Data Protection (antigo Cloud DLP): inspecionar",
    "facil": "Traduzindo: o Sensitive Data Protection é um detetive que lê textos e tabelas e marca onde há CPF, e-mail ou cartão. Você escolhe um limiar de certeza para reduzir alarme falso.",
    "p": [
     "Sensitive Data Protection é o serviço que descobre e transforma dado sensível. A inspeção procura infoTypes (tipos de informação) em texto, tabelas e imagens. Há infoTypes predefinidos (EMAIL_ADDRESS, PHONE_NUMBER, CREDIT_CARD_NUMBER, BRAZIL_CPF_NUMBER e muitos específicos por país) e infoTypes customizados: dicionário (lista de palavras), regex e detecção por regras (hotword rules que aumentam ou reduzem a probabilidade perto de certas palavras). Cada achado traz um likelihood (de VERY_UNLIKELY a VERY_LIKELY) e você define o limiar mínimo para reduzir falso positivo.",
     "Há três formas de usar. A API content (inspect, deidentify, reidentify) é síncrona e serve para pedaços pequenos de texto ou tabelas, por exemplo dentro de um pipeline Dataflow ou de uma aplicação. Os jobs de inspeção varrem Cloud Storage, BigQuery e Datastore em escala e gravam os achados numa tabela do BigQuery. O serviço de discovery (perfis de dados) faz varredura contínua e gera perfis por tabela e coluna, mostrando onde estão os dados sensíveis e seu nível de risco, sem você montar job por job."
    ],
    "dica": "Texto livre (chat, tickets, observações) é o caso clássico de Sensitive Data Protection. Se o enunciado diz que o PII está dentro de texto livre ou em local desconhecido, policy tag não resolve: ela protege colunas inteiras já conhecidas."
   },
   {
    "t": "Transformar: mascarar, tokenizar e re-identificar",
    "facil": "Traduzindo: dá para esconder um dado de vários jeitos: apagar, cobrir ou trocar por um código. Só o código feito com chave permite voltar ao valor original.",
    "p": [
     "Tokenização reversível usa uma chave de criptografia embrulhada pelo Cloud KMS (wrapped key). Quem tiver permissão sobre a chave pode re-identificar (reidentify) o token de volta ao valor original. Um surrogate infoType marca o token no texto, para que a re-identificação ache onde ele está. FPE exige entrada com alfabeto limitado (de 2 a 95 caracteres) e tamanho uniforme; para entrada de tamanho variável ou longa, a documentação recomenda a tokenização determinística. A análise de risco (k-anonymity, l-diversity) mede se combinações de quase-identificadores permitem identificar pessoas depois da de-identificação."
    ],
    "tabela": {
     "cab": [
      "Transformação",
      "Reversível",
      "Mesmo valor gera mesma saída",
      "Quando usar"
     ],
     "linhas": [
      [
       "Redaction (remover)",
       "Não",
       "Não",
       "Dado não precisa existir no destino"
      ],
      [
       "Masking (cobrir com caractere, ex.: ***)",
       "Não",
       "Não",
       "Exibir parcialmente, sem necessidade de join"
      ],
      [
       "Replace / infoType replacement",
       "Não",
       "Não",
       "Trocar por valor fixo ou pelo nome do tipo, [EMAIL_ADDRESS]"
      ],
      [
       "Bucketing",
       "Não",
       "Não",
       "Generalizar idade ou valor em faixas"
      ],
      [
       "Date shift",
       "Não",
       "Sim, por chave de contexto",
       "Deslocar datas preservando intervalos entre eventos"
      ],
      [
       "Crypto hash",
       "Não",
       "Sim",
       "Pseudonimizar para join sem precisar voltar ao original"
      ],
      [
       "Deterministic encryption (AES-SIV)",
       "Sim",
       "Sim",
       "Token reversível com join; aceita qualquer tipo de entrada"
      ],
      [
       "Format-preserving encryption (FFX FPE)",
       "Sim",
       "Sim",
       "Quando o token precisa manter tamanho e alfabeto do original"
      ]
     ]
    },
    "armadilha": "Hash e masking não são reversíveis. Se o enunciado exige que a equipe de privacidade consiga recuperar o valor original, só serve criptografia determinística ou FPE com chave no KMS."
   },
   {
    "t": "PII dentro do BigQuery: policy tags, mascaramento e linhas",
    "facil": "Traduzindo: no BigQuery você pode esconder a coluna inteira, mostrar só um pedaço dela ou deixar cada pessoa ver só algumas linhas. Cada uso tem um recurso próprio.",
    "p": [
     "No BigQuery, o controle fino é feito em camadas. Column-level security usa policy tags de uma taxonomia (hoje gerenciada no Knowledge Catalog, antigo Dataplex Universal Catalog): você marca a coluna, ativa o controle de acesso da taxonomia e só quem tem o papel Fine-Grained Reader (roles/datacatalog.categoryFineGrainedReader) na tag lê a coluna. Ter bigquery.dataViewer na tabela NÃO basta: sem permissão na tag a consulta que toca a coluna falha.",
     "Dynamic data masking é a evolução: em vez de negar, você cria data policies na tag com uma regra de mascaramento e dá o papel BigQuery Masked Reader a quem deve ver o dado mascarado. As regras incluem nullify, valor padrão do tipo, hash SHA-256 (determinístico, serve para join, mas vulnerável a força bruta), máscara de e-mail, primeiros ou últimos quatro caracteres, ano da data e rotina customizada. Quem tem Fine-Grained Reader vê o original; quem não tem nenhum dos dois é negado. Row-level access policies filtram LINHAS por usuário ou grupo (ex.: cada gerente vê só sua região). Authorized views expõem um subconjunto de colunas e linhas sem dar acesso à tabela base.",
     "Atenção à edição: segundo a documentação de BigQuery Editions, column-level security, row-level security e data masking não estão disponíveis na edição Standard; estão em Enterprise e Enterprise Plus. Também VPC Service Controls e CMEK não estão na Standard. Confira a tabela de recursos antes de recomendar Standard com requisitos de segurança."
    ],
    "lista": [
     "Esconder coluna inteira de um grupo: policy tag + Fine-Grained Reader apenas para quem pode.",
     "Mostrar versão parcial da coluna e manter a consulta funcionando: data masking com Masked Reader.",
     "Cada usuário vê só algumas linhas: row-level access policy.",
     "Compartilhar recorte sem expor a tabela base: authorized view."
    ]
   },
   {
    "t": "Residência e soberania: regiões, multirregiões e VPC Service Controls",
    "facil": "Traduzindo: uma regra decide onde se pode criar dados; outra cerca os serviços para o dado não sair. Uma não faz o trabalho da outra.",
    "p": [
     "A localização de um dataset BigQuery é definida na criação e não pode ser alterada; mudar exige copiar os dados para um novo dataset. Região é uma localização específica (europe-west3 em Frankfurt); multirregião (US ou EU) é um conjunto de regiões escolhido pelo Google. Para exigência de país específico, use região. Multirregião EU atende 'dado na União Europeia', mas você não escolhe o país nem o datacenter. Multirregião não é, sozinha, proteção contra falha regional entre regiões diferentes: veja o dia 16.",
     "O organization policy constraint constraints/gcp.resourceLocations define em quais localizações novos recursos podem ser criados (com grupos de valor como in:eu-locations). Ele atua na criação do recurso: não move nem apaga o que já existe. É o controle preventivo para 'ninguém pode criar dataset ou bucket fora da UE'.",
     "VPC Service Controls (VPC SC) cria um perímetro de serviço ao redor de projetos e APIs (BigQuery, Cloud Storage, etc.). Ele impede que credenciais válidas copiem dados para fora do perímetro (exfiltração), por exemplo um usuário autorizado exportando uma tabela para um bucket em projeto externo. Entradas e saídas legítimas são liberadas com ingress e egress rules, e existe modo dry-run para testar sem bloquear. VPC SC não restringe localização geográfica e não substitui IAM: é uma camada adicional. Assured Workloads aplica pacotes de conformidade (regime regulatório, localização, pessoal) sobre o resultado."
    ],
    "armadilha": "Localização e exfiltração são controles diferentes. gcp.resourceLocations responde 'onde posso criar'; VPC SC responde 'de onde e para onde a API pode ser chamada'. Enunciado com 'copiar para fora da organização usando credenciais legítimas' pede VPC SC."
   },
   {
    "t": "Audit logs: o que registra e o que precisa ligar",
    "facil": "Traduzindo: os logs são o diário do que aconteceu. Mudanças de configuração sempre são anotadas, mas quem leu um arquivo só aparece se você ligar esse registro antes.",
    "tabela": {
     "cab": [
      "Tipo",
      "O que registra",
      "Padrão"
     ],
     "linhas": [
      [
       "Admin Activity",
       "Operações que alteram configuração ou metadados (criar dataset, mudar IAM)",
       "Sempre ligado, não pode desativar"
      ],
      [
       "System Event",
       "Ações automáticas do Google que alteram recursos",
       "Sempre ligado"
      ],
      [
       "Data Access",
       "Leitura de metadados e leitura e escrita de dados do usuário (ADMIN_READ, DATA_READ, DATA_WRITE)",
       "Desligado por padrão na maioria dos serviços; BigQuery sempre registra"
      ],
      [
       "Policy Denied",
       "Acesso negado por política de segurança, como violação de VPC SC",
       "Gerado por padrão; use filtro de exclusão no sink se precisar reduzir volume"
      ]
     ]
    },
    "p": [
     "Pergunta clássica: 'quem leu estes objetos do Cloud Storage?'. Admin Activity não mostra leituras de objeto; é preciso habilitar Data Access (DATA_READ) do Cloud Storage, e só valerá dali em diante. Os logs ficam em buckets do Cloud Logging (o bucket _Required guarda Admin Activity e System Event por 400 dias, sem poder alterar a retenção; o _Default guarda o restante por 30 dias, configurável de 1 a 3.650 dias em projetos). Para análise com SQL ou retenção longa, crie um log sink para o BigQuery ou para o Cloud Storage. No BigQuery, quem executou consultas também aparece em INFORMATION_SCHEMA.JOBS."
    ]
   },
   {
    "t": "Governança de projeto, dataset e tabela, e dev versus produção",
    "facil": "Traduzindo: governança é saber quem é o dono do dado, de onde ele veio e se dá para confiar. Dev e produção ficam em projetos separados, e dev usa dados já anonimizados.",
    "p": [
     "A hierarquia Organização, Pastas, Projetos, Datasets, Tabelas é a estrutura de herança de IAM e de organization policies. Regras práticas que a prova espera: use projetos separados para dev, teste e produção (fronteira forte de IAM, cota e faturamento); dê aos grupos papéis mínimos (bigquery.dataViewer para leitura, dataEditor para escrita, jobUser para executar consultas, no projeto que paga); aplique IAM em grupos e no nível do dataset, não da pessoa; use authorized views ou authorized datasets para expor dados entre projetos sem dar acesso à origem.",
     "Em dev, não leve PII real. O padrão correto é gerar um conjunto de dev a partir de produção passando pela de-identificação (Sensitive Data Protection) ou por amostragem e mascaramento, e conceder aos desenvolvedores acesso apenas ao projeto de dev. Dar acesso de leitura ao projeto de produção 'só para testar' é a alternativa errada recorrente.",
     "O Knowledge Catalog (antigo Dataplex Universal Catalog; a API, o endpoint dataplex.googleapis.com e os papéis roles/dataplex.* continuam com o prefixo dataplex; ele substitui o Data Catalog) cataloga metadados de BigQuery, Cloud Storage e outros automaticamente, com busca, glossários e aspects. Lineage mostra de onde o dado veio e para onde foi (inclusive no nível de coluna no BigQuery), útil para análise de impacto e auditoria. Data profile scans calculam estatísticas das colunas; data quality scans executam regras (não nulo, faixa, unicidade, expressão SQL) e geram score e alertas. Data Catalog antigo não deve ser indicado como solução nova."
    ],
    "dica": "Governança federada (tópico 3.4): domínios cuidam dos seus dados, o catálogo central mantém padrões, glossário e políticas. O Knowledge Catalog (Dataplex) é a resposta para 'descobrir, classificar e governar dados distribuídos em várias origens'."
   }
  ],
  "exemplo": {
   "t": "Plataforma de varejo com dados de clientes na UE",
   "texto": "Uma varejista tem tickets de suporte em Cloud Storage e tabelas de clientes no BigQuery. Requisitos: tudo na UE; analistas fazem join de pedidos por cliente sem ver CPF e e-mail; o time de privacidade pode recuperar o CPF; desenvolvedores precisam de dados realistas. Passo 1, localização: organization policy gcp.resourceLocations com in:eu-locations e datasets criados na multirregião EU (ou região, se a lei exigir um país). Passo 2, perímetro: VPC Service Controls em volta dos projetos de produção, bloqueando exportação para fora. Passo 3, tickets: job de Sensitive Data Protection inspeciona e aplica infoType replacement (não reversível, o texto livre não precisa voltar). Passo 4, CPF: deterministic encryption com chave no KMS, assim o token é igual em todas as tabelas, permite join, e só o time de privacidade com acesso à chave faz reidentify. Passo 5, e-mail na tabela de clientes: policy tag com máscara de e-mail e Masked Reader para analistas. Passo 6, dev: projeto separado alimentado por cópia de-identificada. Passo 7, evidência: Data Access logs no sink para BigQuery e lineage no Knowledge Catalog (Dataplex)."
  },
  "prova": [
   "Palavras-chave 'free-text', 'unknown location of PII', 'discover' ou 'redact from chat transcripts' apontam para Sensitive Data Protection; 'column' e 'different users see different columns' apontam para policy tags e masking.",
   "'Must be reversible' ou 'privacy team can recover original' pede crypto deterministic ou FPE com KMS; 'join on token' exige saída determinística; 'preserve format and length' aponta FPE; 'no need to recover' aceita redaction ou hash.",
   "'Data must stay in the EU' é organization policy gcp.resourceLocations e escolha de local do dataset; 'prevent data exfiltration even with valid credentials' é VPC Service Controls; 'who accessed' é audit logs (Data Access precisa estar ligado no Cloud Storage).",
   "'Developers need realistic data without exposing PII' pede projeto de dev separado com dados de-identificados, nunca acesso ao projeto de produção.",
   "'Lineage', 'impact analysis', 'data quality score', 'catalog' apontam para o Knowledge Catalog (antigo Dataplex Universal Catalog)."
  ],
  "explique": "Explique, sem consultar, a diferença entre mascarar, aplicar hash e tokenizar de forma determinística um CPF: qual é reversível, qual permite join e quando você usaria cada um. Em seguida diga qual controle impede um usuário autorizado de copiar a tabela para fora da organização."
 },
 "cartoes": [
  {
   "id": "d15c1",
   "t": "1.1",
   "f": "Cloud DLP mudou de nome: qual o nome atual e o que ele faz em uma frase?",
   "v": "Sensitive Data Protection. Descobre (inspeção por infoTypes e perfis de dados) e transforma dado sensível (mascarar, tokenizar, redigir, re-identificar) em texto, tabelas e imagens."
  },
  {
   "id": "d15c2",
   "t": "1.1",
   "f": "Qual a diferença entre crypto hash e deterministic encryption no Sensitive Data Protection?",
   "v": "Ambos geram a mesma saída para a mesma entrada (permitem join), mas hash não é reversível e deterministic encryption (AES-SIV, chave no KMS) é reversível com reidentify."
  },
  {
   "id": "d15c3",
   "t": "1.1",
   "f": "Quando usar FPE (FFX) em vez de deterministic encryption?",
   "v": "Quando o token precisa manter o tamanho e o alfabeto do original (ex.: número de 16 dígitos). FPE exige alfabeto de 2 a 95 caracteres e entrada de tamanho uniforme; para entrada variável, prefira deterministic."
  },
  {
   "id": "d15c4",
   "t": "1.1",
   "f": "O que é um surrogate infoType na tokenização?",
   "v": "Um marcador que identifica o token dentro do texto, permitindo que a re-identificação encontre e reverta os tokens com a chave original."
  },
  {
   "id": "d15c5",
   "t": "1.1",
   "f": "Como esconder uma coluna do BigQuery de um grupo e permitir a outro?",
   "v": "Policy tag da taxonomia na coluna, controle de acesso da taxonomia ativo e papel Fine-Grained Reader apenas para o grupo autorizado. Ter dataViewer na tabela não basta."
  },
  {
   "id": "d15c6",
   "t": "1.1",
   "f": "O que é dynamic data masking no BigQuery e qual papel o ativa?",
   "v": "Data policy na policy tag com regra de máscara (nullify, hash, email, últimos quatro, etc.). Quem tem BigQuery Masked Reader vê o valor mascarado e a consulta continua funcionando."
  },
  {
   "id": "d15c7",
   "t": "1.1",
   "f": "Column-level security, row-level security e masking funcionam na edição Standard do BigQuery?",
   "v": "Não. Segundo a tabela de edições, esses recursos (além de CMEK, VPC SC e BI Engine) exigem Enterprise ou Enterprise Plus."
  },
  {
   "id": "d15c8",
   "t": "1.1",
   "f": "Localização de dataset do BigQuery pode ser mudada depois de criado?",
   "v": "Não. É definida na criação; para mudar é preciso copiar os dados para um novo dataset na localização desejada."
  },
  {
   "id": "d15c9",
   "t": "1.1",
   "f": "Para que serve o constraint gcp.resourceLocations e qual sua limitação?",
   "v": "Restringe as localizações onde novos recursos podem ser criados (ex.: in:eu-locations). Não move nem apaga recursos que já existem fora do permitido."
  },
  {
   "id": "d15c10",
   "t": "1.1",
   "f": "O que o VPC Service Controls impede que IAM sozinho não impede?",
   "v": "Exfiltração por credencial válida: copiar ou exportar dados para recursos fora do perímetro (ex.: bucket em outro projeto). Também usa ingress e egress rules e modo dry-run."
  },
  {
   "id": "d15c11",
   "t": "1.1",
   "f": "Quais audit logs estão sempre ligados e qual precisa ser habilitado?",
   "v": "Admin Activity e System Event estão sempre ligados. Data Access vem desligado na maioria dos serviços (o BigQuery sempre registra) e precisa ser habilitado, valendo só dali em diante."
  },
  {
   "id": "d15c12",
   "t": "1.1",
   "f": "O que é um log do tipo Policy Denied?",
   "v": "Registro de um acesso negado por política de segurança, como violação de VPC Service Controls, trazendo os detalhes da violação para diagnóstico."
  },
  {
   "id": "d15c13",
   "t": "1.1",
   "f": "Como dar a desenvolvedores dados realistas sem expor PII de produção?",
   "v": "Projeto de dev separado alimentado por dados de-identificados (Sensitive Data Protection) ou amostrados, sem conceder acesso ao projeto de produção."
  },
  {
   "id": "d15c14",
   "t": "3.4",
   "f": "Para que servem lineage, data profile e data quality scans no Knowledge Catalog (antigo Dataplex Universal Catalog)?",
   "v": "Lineage mostra origem e destino do dado (análise de impacto); profile calcula estatísticas por coluna; quality executa regras (não nulo, faixa, unicidade, SQL) e gera score e alertas."
  },
  {
   "id": "d15c15",
   "t": "1.3",
   "f": "Qual serviço substitui o Data Catalog nas arquiteturas novas?",
   "v": "Knowledge Catalog (antigo Dataplex Universal Catalog; API e papéis mantêm o prefixo dataplex): catálogo, busca, glossário, aspects e linhagem."
  }
 ],
 "questoes": [
  {
   "id": "d15q1",
   "s": 1,
   "t": "1.1",
   "e": "A company stores customer support chat transcripts as text files in Cloud Storage. The transcripts contain email addresses and phone numbers typed freely by customers. The analytics team needs the transcripts for sentiment analysis but must not see this PII, and there is no need to recover the originals. What should the data engineer do?",
   "o": [
    "Run a Sensitive Data Protection de-identification job that replaces detected email and phone infoTypes with the infoType name",
    "Apply BigQuery policy tags to the transcript column and grant Fine-Grained Reader only to the privacy team",
    "Place the bucket in a VPC Service Controls perimeter and keep the analysts outside it",
    "Encrypt the bucket with a customer-managed encryption key and share the key only with the privacy team"
   ],
   "c": [
    0
   ],
   "x": "A opção “Run a Sensitive Data Protection de-identification job that replaces detected email…” está certa: o PII está em texto livre, e Sensitive Data Protection inspeciona infoTypes dentro do texto e os substitui (infoType replacement), sem necessidade de reversão. “Apply BigQuery policy tags to the transcript column and grant Fine-Grained Reader…” erra: policy tags protegem colunas inteiras conhecidas, não trechos dentro de um campo de texto, e esconderiam a coluna toda, inutilizando a análise. “Place the bucket in a VPC Service Controls perimeter and keep the analysts outside it” erra: VPC SC controla de onde as APIs são chamadas e a exfiltração, não remove PII do conteúdo. “Encrypt the bucket with a customer-managed encryption key and share the key…” erra: CMEK é criptografia em repouso; quem acessa o bucket via IAM continua lendo o texto em claro."
  },
  {
   "id": "d15q2",
   "s": 1,
   "t": "1.1",
   "e": "A bank wants to replace national ID numbers with tokens before loading data into BigQuery. The same ID must always produce the same token so analysts can join tables, and the privacy team must be able to recover the original ID when legally required. Which transformation should be used?",
   "o": [
    "Crypto hash of the ID",
    "Masking with the character # for all digits",
    "Bucketing the IDs into ranges",
    "Deterministic encryption with a Cloud KMS wrapped key and a surrogate infoType"
   ],
   "c": [
    3
   ],
   "x": "A opção “Deterministic encryption with a Cloud KMS wrapped key and a surrogate infoType” está certa: criptografia determinística (AES-SIV) gera o mesmo token para o mesmo valor, o que permite join, e é reversível por reidentify para quem controla a chave no KMS; o surrogate infoType marca o token. “Crypto hash of the ID” erra: crypto hash permite join, mas não é reversível. “Masking with the character # for all digits” erra: masking cobre caracteres, não é reversível e os valores ficam iguais, quebrando o join. “Bucketing the IDs into ranges” erra: bucketing generaliza em faixas, não identifica indivíduos nem volta ao original."
  },
  {
   "id": "d15q3",
   "s": 4,
   "t": "4.1",
   "e": "A BigQuery table in an Enterprise edition reservation has a column named ssn. Finance analysts must see the full value. Marketing analysts must still be able to run queries that include the column, but see only the last four characters. What is the simplest approach with the least duplication of data?",
   "o": [
    "Create a second table for marketing with the column truncated and refresh it nightly",
    "Add a row-level access policy that filters marketing users out of the table",
    "Attach a policy tag to the column, create a data policy with a last-four-characters masking rule, and grant Masked Reader to marketing and Fine-Grained Reader to finance",
    "Move the column to a separate dataset and remove all marketing access to it"
   ],
   "c": [
    2
   ],
   "x": "A opção “Attach a policy tag to the column, create a data policy with a last-four-characters…” está certa: policy tag mais data policy de mascaramento (últimos quatro caracteres) com BigQuery Masked Reader para marketing e Fine-Grained Reader para finance entrega mascaramento dinâmico sem cópia. “Create a second table for marketing with the column truncated and refresh it nightly” erra: funciona, mas duplica dados e cria um pipeline para manter. “Add a row-level access policy that filters marketing users out of the table” erra: row-level policy filtra linhas, não mascara colunas, e bloquearia a tabela inteira para marketing. “Move the column to a separate dataset and remove all marketing access to it” erra: remover o acesso impede que a consulta inclua a coluna, contrariando o requisito de ver os quatro últimos caracteres."
  },
  {
   "id": "d15q4",
   "s": 1,
   "t": "1.1",
   "e": "A European healthcare company must ensure that no new BigQuery datasets or Cloud Storage buckets can be created outside the EU anywhere in its organization. Choose two.",
   "o": [
    "Set the organization policy constraint gcp.resourceLocations to allow only in:eu-locations",
    "Create the datasets in the EU multi-region or in an EU region",
    "Enable Data Access audit logs on the organization",
    "Change the location of existing US datasets by editing dataset properties",
    "Create a VPC Service Controls perimeter around all projects"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Set the organization policy constraint gcp.resourceLocations to allow only in:eu-locations” e “Create the datasets in the EU multi-region or in an EU region” estão corretas: o constraint gcp.resourceLocations é o controle preventivo que bloqueia a criação de recursos fora das localizações permitidas, e os datasets precisam ser criados em local da UE (a localização é definida na criação). “Enable Data Access audit logs on the organization” erra: audit logs registram, não impedem. “Change the location of existing US datasets by editing dataset properties” erra: a localização do dataset é imutável; é preciso copiar para um novo dataset, e o constraint também não move recursos existentes. “Create a VPC Service Controls perimeter around all projects” erra: VPC SC protege contra exfiltração entre perímetros, não restringe a localização geográfica de novos recursos."
  },
  {
   "id": "d15q5",
   "s": 1,
   "t": "1.1",
   "e": "A data engineer with valid credentials in the production project runs a query that exports a sensitive BigQuery table to a Cloud Storage bucket in a personal project outside the organization. The security team wants to make this kind of action impossible even for users who hold the correct IAM roles. What should be implemented?",
   "o": [
    "Grant the engineer only the BigQuery Data Viewer role",
    "Set the organization policy gcp.resourceLocations to the home region",
    "Enable Admin Activity audit logs for the production project",
    "Create a VPC Service Controls perimeter around the production projects with no egress rule to the personal project"
   ],
   "c": [
    3
   ],
   "x": "A opção “Create a VPC Service Controls perimeter around the production projects with no egress…” está certa: VPC SC bloqueia chamadas de API que levam dados para fora do perímetro mesmo com IAM correto, que é o requisito de exfiltração. “Grant the engineer only the BigQuery Data Viewer role” erra: o usuário já tem acesso legítimo de leitura, e reduzir papéis não impede quem precisa ler de exportar. “Set the organization policy gcp.resourceLocations to the home region” erra: restringe onde recursos são criados, não para onde dados podem ser enviados, e o bucket externo poderia estar na mesma região. “Enable Admin Activity audit logs for the production project” erra: Admin Activity é sempre ligado e apenas registra, não previne."
  },
  {
   "id": "d15q6",
   "s": 1,
   "t": "1.1",
   "e": "An auditor asks who downloaded objects from a Cloud Storage bucket containing customer contracts during the last quarter. Admin Activity logs show only bucket configuration changes. What should the data engineer do to provide this evidence for future requests?",
   "o": [
    "Query INFORMATION_SCHEMA.JOBS in BigQuery",
    "Enable Data Access audit logs (DATA_READ) for Cloud Storage and route them to a log sink in BigQuery",
    "Create a Policy Denied log filter",
    "Increase the retention of the _Required log bucket"
   ],
   "c": [
    1
   ],
   "x": "A opção “Enable Data Access audit logs (DATA_READ) for Cloud Storage and route them to a log sink…” está certa: leituras de objeto são Data Access logs, desligados por padrão no Cloud Storage; habilitar DATA_READ e rotear para um sink no BigQuery dá retenção e consulta SQL (vale apenas dali em diante, não retroage). “Query INFORMATION_SCHEMA.JOBS in BigQuery” erra: INFORMATION_SCHEMA.JOBS lista jobs do BigQuery, não downloads de objetos. “Create a Policy Denied log filter” erra: Policy Denied registra acessos negados por política, não leituras permitidas. “Increase the retention of the _Required log bucket” erra: o bucket _Required guarda Admin Activity e System Event, que não contêm leituras de objeto."
  },
  {
   "id": "d15q7",
   "s": 1,
   "t": "1.1",
   "e": "After a VPC Service Controls perimeter was enabled, a nightly job running from a partner network starts failing with 403 errors when calling BigQuery. The engineer needs to find exactly which perimeter rule blocked the request. Where should the engineer look first?",
   "o": [
    "Cloud Monitoring dashboards for BigQuery slot utilization",
    "The Policy Denied audit logs, which include the VPC Service Controls violation details",
    "The BigQuery query plan of the failed job",
    "Data Catalog taxonomy permissions"
   ],
   "c": [
    1
   ],
   "x": "A opção “The Policy Denied audit logs, which include the VPC Service Controls violation details” está certa: violações de VPC SC geram audit logs do tipo Policy Denied com identificador e detalhes da violação (origem, serviço, regra), que permitem criar a ingress rule correta. “Cloud Monitoring dashboards for BigQuery slot utilization” erra: uso de slots não explica um 403 de política. “The BigQuery query plan of the failed job” erra: o job nem chega a executar, então não há plano de execução. “Data Catalog taxonomy permissions” erra: taxonomias de policy tags controlam acesso a colunas, não o perímetro de serviço; o erro de coluna tem mensagem própria sobre acesso negado à tag."
  },
  {
   "id": "d15q8",
   "s": 1,
   "t": "1.1",
   "e": "A team of developers needs realistic customer data to test a new pipeline. Production data contains PII and is subject to strict compliance rules. Which approach follows best practice?",
   "o": [
    "Grant developers the BigQuery Data Viewer role on the production dataset and let them copy what they need",
    "Create a dev dataset in the production project and give developers access to it",
    "Share the production service account key with the development team",
    "Create a separate dev project loaded with de-identified or sampled and masked copies of production data, and give developers access only to that project"
   ],
   "c": [
    3
   ],
   "x": "A opção “Create a separate dev project loaded with de-identified or sampled and masked copies…” está certa: projeto separado é uma fronteira forte de IAM, e os dados de-identificados dão realismo sem expor PII. “Grant developers the BigQuery Data Viewer role on the production dataset and let them…” erra: dá acesso real ao PII, violando a conformidade. “Create a dev dataset in the production project and give developers access to it” erra: um dataset no projeto de produção mistura ambientes, e a cópia continua com PII sem de-identificação; a fronteira de projeto é preferível. “Share the production service account key with the development team” erra: compartilhar chave de service account é prática insegura e concede acesso total à produção."
  },
  {
   "id": "d15q9",
   "s": 3,
   "t": "3.4",
   "e": "Before changing a source system that contains customer email addresses, a governance lead wants to know which downstream BigQuery tables and reports derive from that column, down to the column level. Which capability should be used?",
   "o": [
    "Cloud Audit Logs Data Access",
    "BigQuery INFORMATION_SCHEMA.TABLES",
    "Knowledge Catalog (Dataplex Universal Catalog) lineage",
    "BigQuery dry run"
   ],
   "c": [
    2
   ],
   "x": "A opção “Knowledge Catalog (Dataplex Universal Catalog) lineage” está certa: a linhagem do Knowledge Catalog (antigo Dataplex Universal Catalog) mostra origem e destino do dado, inclusive no nível de coluna no BigQuery, o que permite análise de impacto. “Cloud Audit Logs Data Access” erra: audit logs dizem quem acessou, não como o dado flui entre tabelas. “BigQuery INFORMATION_SCHEMA.TABLES” erra: INFORMATION_SCHEMA.TABLES lista metadados de tabelas, sem relação entre colunas de origem e destino. “BigQuery dry run” erra: dry run estima bytes processados de uma consulta, nada sobre dependências."
  },
  {
   "id": "d15q10",
   "s": 1,
   "t": "1.1",
   "e": "A company wants only the HR group to read the salary column of a BigQuery table, even though many users hold the BigQuery Data Viewer role on the table. Choose two.",
   "o": [
    "Create a taxonomy and policy tag, attach the tag to the salary column, and enforce access control on the taxonomy",
    "Grant the Fine-Grained Reader role on the policy tag to the HR group only",
    "Create a row-level access policy for the HR group",
    "Remove BigQuery Data Viewer from the dataset so only HR keeps it",
    "Enable Data Access audit logs on the table"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Create a taxonomy and policy tag, attach the tag to the salary column, and enforce access…” e “Grant the Fine-Grained Reader role on the policy tag to the HR group only” estão corretas: o column-level security exige a policy tag na coluna, o controle de acesso ativo na taxonomia e o papel Fine-Grained Reader apenas para o grupo HR; sem o papel na tag, mesmo quem tem Data Viewer falha ao consultar a coluna. “Create a row-level access policy for the HR group” erra: row-level policy filtra linhas, não colunas. “Remove BigQuery Data Viewer from the dataset so only HR keeps it” erra: retirar Data Viewer impede qualquer pessoa de ler a tabela, inclusive as demais colunas de que outros precisam. “Enable Data Access audit logs on the table” erra: audit logs registram acesso, não o impedem."
  }
 ]
};
  C.dias[16] = {
 "aula": {
  "titulo": "Confiabilidade, DR e ACID",
  "simples": {
   "analogia": "Pense numa loja que anota as vendas num caderno. **RPO** é quantas páginas você aceita perder se o caderno pegar fogo. Se você fotocopia a cada 15 minutos, perde no máximo 15 minutos de vendas. **RTO** é quanto tempo a loja aceita ficar fechada até voltar a vender: 5 minutos ou 5 horas. Fotocopiar a cada minuto e manter uma segunda loja pronta custa mais caro. Agora três problemas diferentes: um curto-circuito no andar (**falha de zona**), um incêndio no bairro (**falha de região**) e um funcionário que rabisca páginas por engano (**erro humano**). A segunda loja resolve o incêndio. Mas a fotocópia automática copia também o rabisco. Para o rabisco você precisa de uma versão antiga guardada, o voltar no tempo. Limite da analogia: em bancos reais a cópia pode ser quase instantânea; o que muda é o atraso e o custo.",
   "pontos": [
    "**RPO** é quanto dado você aceita perder; **RTO** é quanto tempo aceita ficar fora do ar.",
    "Quanto menores RPO e RTO, mais caro e complexo o desenho.",
    "Réplica protege de falha de lugar, mas copia também o erro humano.",
    "Erro humano se resolve com **time travel, snapshot, backup ou versionamento**.",
    "Spanner copia entre regiões sem perder dado; Bigtable prioriza estar sempre disponível.",
    "Registro ruim deve ir para uma **dead-letter**, sem derrubar o pipeline."
   ],
   "paraQueServe": "Você usa isso quando o enunciado dá metas de perda e de tempo fora do ar e você precisa escolher o serviço mais barato que as cumpre, ou recuperar um DELETE errado."
  },
  "glossario": [
   {
    "t": "RPO (Recovery Point Objective)",
    "d": "Quanto dado, medido em tempo, você aceita perder num desastre. Ex.: RPO de 15 minutos significa que os últimos 15 minutos podem sumir."
   },
   {
    "t": "RTO (Recovery Time Objective)",
    "d": "Quanto tempo o serviço pode ficar fora do ar até voltar. Ex.: RTO de 5 minutos exige uma recuperação quase automática."
   },
   {
    "t": "Zona e região",
    "d": "Zona é um datacenter dentro de uma região. Região é uma área geográfica com várias zonas, como Frankfurt. Falha de zona é comum; falha de região é desastre."
   },
   {
    "t": "Failover",
    "d": "Trocar para a cópia de reserva quando a principal falha. Pode ser automático ou manual, conforme o serviço."
   },
   {
    "t": "Replicação síncrona e assíncrona",
    "d": "Síncrona confirma a escrita só depois de copiar: não perde dado, mas é mais lenta. Assíncrona confirma e copia depois: é mais rápida, mas pode perder o que ainda não foi copiado."
   },
   {
    "t": "Time travel",
    "d": "Recurso do BigQuery que permite consultar ou restaurar uma tabela como ela era alguns dias atrás."
   },
   {
    "t": "Snapshot",
    "d": "Foto de uma tabela num momento, somente leitura, que você pode guardar por muito tempo pagando só o que mudou."
   },
   {
    "t": "ACID",
    "d": "Quatro garantias de uma transação: ou acontece inteira ou não acontece, respeita as regras, não se mistura com outras, e o confirmado não se perde."
   },
   {
    "t": "Dead-letter",
    "d": "Uma caixa de sobras: lugar onde vão parar registros ou mensagens que falharam, para você analisar e reprocessar depois."
   },
   {
    "t": "Assertion (Dataform)",
    "d": "Teste em SQL que faz o pipeline parar se encontrar dado ruim, como chave duplicada, antes de publicar o resultado."
   }
  ],
  "checagem": [
   "Explique RPO e RTO com o exemplo de uma loja, sem usar as siglas na sua explicação.",
   "Por que uma réplica em outra região não salva de um DELETE errado? O que salva?",
   "Qual serviço você escolhe para banco relacional global sem perda de dados? E para NoSQL com failover automático entre regiões?",
   "O que a dead-letter faz com um registro ruim, em vez de derrubar o pipeline?"
  ],
  "resumo": "Como escolher a estratégia de recuperação e de consistência certa: RPO e RTO primeiro, depois os recursos de BigQuery, Cloud Storage, Spanner, Bigtable e Cloud SQL, mais validação de dados com Dataform, Knowledge Catalog (Dataplex) e dead-letter.",
  "blocos": [
   {
    "t": "Ideia central: RPO e RTO decidem tudo",
    "facil": "Traduzindo: RPO é quanto dado você aceita perder; RTO é quanto tempo aceita ficar fora do ar. Réplicas protegem de falha de lugar, não de erro humano.",
    "p": [
     "RPO (Recovery Point Objective) é quanto dado você aceita perder, medido em tempo: RPO de 15 minutos significa que, num desastre, os últimos 15 minutos de escrita podem sumir. RTO (Recovery Time Objective) é quanto tempo o serviço pode ficar fora do ar até voltar. Quanto menores os dois, mais caro e mais complexo o desenho. A prova dá os números no enunciado e a pergunta é qual serviço e qual configuração os atendem pelo MENOR custo ou menor esforço operacional.",
     "Também separe três tipos de falha, que pedem proteções diferentes: falha de zona (um datacenter), falha de região (desastre) e erro humano ou lógico (alguém apagou ou corrompeu dado). Réplica síncrona protege de zona. Réplica entre regiões protege de região. Nenhuma réplica protege de um DELETE errado, porque a réplica replica o erro: para isso existem time travel, snapshots, backups e versionamento."
    ],
    "tabela": {
     "cab": [
      "Tipo de falha",
      "Proteção típica",
      "Exemplo"
     ],
     "linhas": [
      [
       "Zona",
       "Alta disponibilidade na região, réplica síncrona",
       "Cloud SQL HA, Spanner regional, BigQuery (dados em duas zonas)"
      ],
      [
       "Região",
       "Replicação entre regiões e failover",
       "Spanner multirregião, Bigtable multi-cluster, BigQuery managed DR, GCS dual-region"
      ],
      [
       "Erro lógico ou humano",
       "Retorno no tempo, cópia imutável, backup",
       "BigQuery time travel e snapshot, GCS versionamento, Cloud SQL PITR"
      ]
     ]
    }
   },
   {
    "t": "BigQuery: o que cada recurso protege",
    "facil": "Traduzindo: o BigQuery já guarda os dados em mais de uma zona. Para a queda de uma região inteira, o recurso feito para isso é o managed DR, da edição Enterprise Plus.",
    "p": [
     "Por padrão uma região do BigQuery guarda os dados em pelo menos duas zonas, então uma falha de zona não derruba nem perde dados. Uma multirregião (US ou EU) é uma localização mais ampla; a documentação de replicação de dataset deixa claro que multirregião sozinha não oferece redundância entre regiões como estratégia de DR. Para falha de região há duas ferramentas.",
     "Replicação entre regiões de dataset (cross-region dataset replication): cria uma réplica secundária somente leitura em outra região, com replicação assíncrona. Você pode promover a secundária a primária, mas a promoção exige que a região primária esteja online; a própria documentação diz que não serve como plano de DR para queda total da região. Policy tags e data policies não são replicados, e agendamentos (scheduled queries) precisam ser recriados na nova região primária. Recomenda-se evitar DML pesado em tabelas replicadas, pois DML reescreve arquivos inteiros e aumenta o custo de transferência.",
     "Managed disaster recovery: disponível apenas na edição Enterprise Plus. Combina a réplica do dataset com uma reserva de failover na região secundária. O objetivo documentado de RPO é manter a réplica dentro de 15 minutos da primária (meta, não garantia), e a documentação fala em RTO de cerca de 5 minutos. Há dois modos: soft failover, que espera a replicação dos dados já confirmados e exige as duas regiões saudáveis, e hard failover, que promove imediatamente mesmo com a primária fora, aceitando perder dados ainda não replicados. A reserva consome slots-base na região secundária o tempo todo."
    ],
    "armadilha": "Enunciado com 'regional outage' e BigQuery: managed DR (Enterprise Plus) é a resposta de menor esforço. 'Multirregião' sozinha ou 'cópia noturna para outro dataset' são distratores. Para queda total de região, a replicação simples de dataset não é plano de DR segundo a documentação."
   },
   {
    "t": "BigQuery: time travel, fail-safe, snapshots e clones",
    "facil": "Traduzindo: o BigQuery guarda versões antigas das tabelas por alguns dias. Dá para consultar o passado e restaurar; para guardar um ponto por mais tempo, use snapshots.",
    "p": [
     "Time travel permite consultar ou restaurar o estado de uma tabela em um ponto do passado dentro da janela, que vai de 2 a 7 dias (padrão 7), configurável por dataset. Usa-se FOR SYSTEM_TIME AS OF numa consulta, ou o decorator na cópia para restaurar. Tabelas e datasets apagados mantêm a janela vigente no momento da exclusão. Time travel não restaura metadados da tabela e não vale para a maioria das tabelas externas.",
     "Fail-safe são 7 dias adicionais depois da janela de time travel, para recuperação de emergência. Não é configurável, não pode ser consultado diretamente e a recuperação exige abrir chamado com o Cloud Customer Care. Passados esses 7 dias, nem o suporte recupera.",
     "Table snapshot é uma cópia somente leitura de uma tabela em um ponto no tempo, com validade que você define, ideal para retenção longa (um snapshot mensal por um ano) porque você paga apenas pelo que mudou em relação à tabela base. Table clone é uma cópia gravável, leve, também cobrada pela diferença. Ambos servem para teste com dados reais e para guardar um ponto antes de uma carga arriscada.",
     "Cobrança: no modelo de armazenamento lógico (padrão), custos de time travel e fail-safe estão incluídos na tarifa, então reduzir a janela não economiza. No modelo físico, bytes de time travel e fail-safe são cobrados à parte, e uma janela menor reduz custo."
    ],
    "lista": [
     "Apaguei linhas ontem: time travel (FOR SYSTEM_TIME AS OF) e recrie ou faça MERGE.",
     "Apaguei a tabela há 10 dias com janela padrão: já passou do time travel, resta o fail-safe via Customer Care.",
     "Preciso guardar versões mensais por um ano: table snapshots com expiração, não time travel."
    ]
   },
   {
    "t": "Cloud Storage, Spanner, Bigtable e Cloud SQL",
    "facil": "Traduzindo: cada banco reage de um jeito a falhas. Spanner copia entre regiões sem perder dado, Bigtable prioriza ficar disponível e Cloud SQL tem um standby em outra zona.",
    "p": [
     "Cloud Storage tem três tipos de localização: região, dual-region (duas regiões específicas) e multirregião. Dual-region e multirregião mantêm um único nome de bucket com redundância geográfica, então o failover é transparente para a aplicação, sem mudar endpoint. A replicação padrão (dual-region e multirregião) é assíncrona, com RPO de 12 horas (meta de 99,9% dos objetos novos replicados em 1 hora e 100% em 12 horas); a turbo replication (só dual-region) tem RPO de 15 minutos. Versionamento de objetos, soft delete e retention lock protegem contra apagamento e alteração.",
     "Spanner replica de forma síncrona com consenso (Paxos). Configuração regional replica entre zonas; multirregional replica entre regiões com mais disponibilidade (SLA de 99,999%, contra 99,99% do regional, segundo a página de SLA; confira os valores vigentes), RPO zero e consistência externa. É a resposta para banco relacional global, transacional, com escala horizontal e sem perda de dados.",
     "Bigtable replica de forma assíncrona entre clusters (de zonas ou regiões diferentes) e o resultado é consistência eventual entre clusters. O comportamento é controlado pelo app profile: roteamento de cluster único mantém leitura-após-escrita consistente e exige failover manual; roteamento multi-cluster envia para o cluster mais próximo e faz failover automático, mas aceita consistência eventual. Backups podem ser copiados entre regiões.",
     "Cloud SQL tem alta disponibilidade (HA) com instância primária e standby em outra zona da mesma região, replicação síncrona do disco e failover automático. Réplicas de leitura são assíncronas, podem ficar em outra região e, em caso de desastre, são promovidas manualmente (RPO pode ser maior que zero). A edição Enterprise Plus acrescenta DR avançado: você designa uma réplica entre regiões como réplica de DR e pode fazer failover (a replicação continua assíncrona, então transações ainda não replicadas podem ser perdidas) e switchover (troca planejada de papéis, sem perda de dados, segundo a documentação); o SLA da Enterprise Plus é maior, confira o valor vigente. Backups automáticos e point-in-time recovery cobrem erro lógico. AlloyDB segue o mesmo raciocínio, com HA regional e clusters secundários entre regiões."
    ],
    "dica": "Atalho de decisão: relacional global com RPO 0, Spanner. Relacional regional comum com HA, Cloud SQL. Wide-column de baixa latência com failover automático entre regiões, Bigtable multi-cluster. Objetos com redundância entre regiões e mesmo bucket, dual-region ou multirregião."
   },
   {
    "t": "ACID versus disponibilidade",
    "facil": "Traduzindo: ACID garante que uma transação ou acontece inteira ou não acontece, e que o confirmado não se perde. O Bigtable só garante isso dentro de uma única linha.",
    "p": [
     "ACID significa atomicidade (tudo ou nada), consistência (respeita restrições), isolamento (transações concorrentes não se enxergam pela metade) e durabilidade (confirmado, não se perde). Spanner, Cloud SQL, AlloyDB e Firestore oferecem transações ACID. O Bigtable garante atomicidade apenas no nível de UMA linha: não há transação entre linhas. O BigQuery suporta transações multi-statement com isolamento de snapshot, mas é um data warehouse analítico, não um banco OLTP.",
     "A tensão clássica é consistência versus disponibilidade em sistemas distribuídos. Bigtable multi-cluster escolhe disponibilidade com consistência eventual entre clusters. Spanner entrega consistência forte entre regiões com disponibilidade muito alta graças à infraestrutura do Google, ao custo de latência de escrita maior em multirregião, pois a confirmação precisa de quórum. Quando o enunciado diz 'transações entre várias linhas e tabelas com escala global', pense em Spanner; 'single-row atomic, milhões de escritas por segundo', Bigtable."
    ]
   },
   {
    "t": "Validação e qualidade de dados",
    "facil": "Traduzindo: confira a qualidade em três lugares: nas regras SQL, no catálogo e na entrada do pipeline. O registro ruim vai para uma caixa de sobras em vez de parar tudo.",
    "p": [
     "Dados incorretos viram decisão incorreta. Existem três pontos de defesa. No SQL: Dataform (ou dbt) permite assertions, consultas que falham o pipeline se acharem linhas problemáticas. As assertions embutidas são nonNull, uniqueKey, uniqueKeys e rowConditions, e você também escreve assertions SQL customizadas. Uma assertion que falha bloqueia as ações que dependem dela, o que evita publicar dado ruim.",
     "No catálogo: data quality scans do Knowledge Catalog (Dataplex) (e as regras reutilizáveis) rodam sobre tabelas BigQuery, avaliando completude, unicidade, faixas de valor e expressões SQL, geram score por dimensão e podem alertar. Profile scans ajudam a descobrir quais regras criar.",
     "No fluxo de ingestão: o padrão dead-letter. Num pipeline Dataflow, registros que não passam na validação ou não são parseáveis vão para uma saída lateral (side output com TupleTag) gravada numa tabela ou tópico de dead-letter, enquanto os válidos seguem. Assim um registro ruim não derruba o pipeline nem se perde. No Pub/Sub, a assinatura pode ter dead-letter topic: depois de um número máximo de tentativas de entrega, a mensagem vai para outro tópico para análise. Combine com idempotência (por exemplo MERGE por chave ou insertId) para que reprocessar não duplique."
    ],
    "armadilha": "Descartar silenciosamente registro inválido e deixar a exceção derrubar o pipeline são as duas respostas ruins. A boa prática é rotear para dead-letter, alertar e reprocessar depois de corrigir."
   }
  ],
  "exemplo": {
   "t": "Plataforma de pagamentos com metas de RPO e RTO",
   "texto": "Uma fintech tem três componentes. Primeiro, o razão financeiro, que exige transações entre várias contas, RPO zero e usuários em três continentes: Spanner em configuração multirregional, porque Cloud SQL tem réplica assíncrona entre regiões e Bigtable não tem transação multilinha. Segundo, o warehouse no BigQuery, com meta de RPO de 15 minutos e RTO de minutos para a região inteira: Enterprise Plus com managed disaster recovery, replicando o dataset para a região secundária e com reserva de failover. Terceiro, proteção contra erro humano: janela de time travel padrão de 7 dias para corrigir DELETE errado, mais snapshots mensais com expiração de 1 ano para auditoria. Na ingestão, o Dataflow valida cada evento; os inválidos vão para uma tabela dead-letter e geram alerta, enquanto o Dataform roda assertions uniqueKey e nonNull antes de publicar as tabelas de relatório. Resultado: cada requisito de RPO e RTO mapeia para um recurso específico, sem pagar multirregião onde não é necessário."
  },
  "prova": [
   "RPO e RTO aparecem como números: 'RPO of zero' com banco relacional global aponta Spanner multirregional; 'RPO 15 minutes' aponta BigQuery managed DR ou Cloud Storage turbo replication.",
   "'Accidentally deleted', 'restore to state yesterday' apontam para time travel, snapshots ou backups; réplicas NÃO resolvem erro lógico porque replicam o erro.",
   "'Automatic failover across regions' com NoSQL aponta Bigtable multi-cluster routing; 'read-your-writes' aponta single-cluster routing.",
   "'Multi-row transactions' e 'strong consistency' apontam Spanner, Cloud SQL ou AlloyDB; 'single-row atomicity' é Bigtable.",
   "'Bad records must not stop the pipeline' ou 'must be reprocessed later' é dead-letter; 'fail the pipeline if duplicates' é assertion do Dataform."
  ],
  "explique": "Explique, com as próprias palavras, por que uma réplica entre regiões não protege contra um DELETE errado, e diga quais recursos do BigQuery você usaria para o erro lógico e quais para a queda de região."
 },
 "cartoes": [
  {
   "id": "d16c1",
   "t": "1.2",
   "f": "RPO versus RTO: qual a diferença?",
   "v": "RPO é a quantidade máxima de dados (em tempo) que você aceita perder; RTO é o tempo máximo aceitável de indisponibilidade até a recuperação."
  },
  {
   "id": "d16c2",
   "t": "1.2",
   "f": "Qual a janela de time travel do BigQuery e como configurar?",
   "v": "Padrão de 7 dias, configurável de 2 a 7 dias por dataset. Consulta-se com FOR SYSTEM_TIME AS OF."
  },
  {
   "id": "d16c3",
   "t": "1.2",
   "f": "O que é o fail-safe do BigQuery e como se recupera?",
   "v": "7 dias adicionais depois do time travel, não configurável. Não se consulta direto: a recuperação exige o Cloud Customer Care. Depois disso não há recuperação."
  },
  {
   "id": "d16c4",
   "t": "1.2",
   "f": "Snapshot versus clone no BigQuery?",
   "v": "Snapshot é cópia somente leitura em um ponto no tempo, com expiração, para retenção longa. Clone é cópia gravável e leve. Ambos cobram apenas a diferença em relação à tabela base."
  },
  {
   "id": "d16c5",
   "t": "5.5",
   "f": "Qual edição do BigQuery oferece managed disaster recovery e quais as metas documentadas?",
   "v": "Somente Enterprise Plus. Meta de RPO de 15 minutos (meta, não garantia) e RTO documentado de 5 minutos após iniciar o failover, com reserva de failover na região secundária."
  },
  {
   "id": "d16c6",
   "t": "5.5",
   "f": "Soft failover versus hard failover no BigQuery managed DR?",
   "v": "Soft espera os dados confirmados replicarem e exige as duas regiões saudáveis. Hard promove a secundária na hora, mesmo com a primária fora, e pode perder dados não replicados."
  },
  {
   "id": "d16c7",
   "t": "5.5",
   "f": "A replicação simples de dataset entre regiões serve como DR para queda total da região?",
   "v": "Não segundo a documentação: a promoção exige a região primária online. Para queda total use managed DR (Enterprise Plus). Policy tags não são replicados."
  },
  {
   "id": "d16c8",
   "t": "1.2",
   "f": "Por que replicação entre regiões não protege de um DELETE errado?",
   "v": "Porque a réplica replica o erro. Erro lógico se resolve com time travel, snapshots, backups, versionamento de objetos ou point-in-time recovery."
  },
  {
   "id": "d16c9",
   "t": "5.5",
   "f": "Dual-region no Cloud Storage: o que muda para a aplicação em um failover?",
   "v": "Nada: o bucket mantém o mesmo nome e endpoint com dados em duas regiões. Turbo replication (só dual-region) tem RPO de 15 minutos; a replicação padrão tem RPO de 12 horas."
  },
  {
   "id": "d16c10",
   "t": "1.2",
   "f": "Quando escolher Spanner multirregional?",
   "v": "Banco relacional transacional global com consistência forte, escala horizontal, RPO zero (replicação síncrona com consenso) e disponibilidade muito alta. Escrita tem latência maior por precisar de quórum."
  },
  {
   "id": "d16c11",
   "t": "5.5",
   "f": "Bigtable: roteamento de cluster único versus multi-cluster?",
   "v": "Cluster único dá leitura-após-escrita consistente e failover manual. Multi-cluster faz failover automático para outro cluster, mas aceita consistência eventual entre clusters."
  },
  {
   "id": "d16c12",
   "t": "5.5",
   "f": "Cloud SQL: diferença entre HA e réplica de leitura entre regiões?",
   "v": "HA é standby em outra zona, replicação síncrona e failover automático. Réplica entre regiões é assíncrona e promovida manualmente no desastre, com possível perda de dados recentes."
  },
  {
   "id": "d16c13",
   "t": "1.2",
   "f": "Qual o escopo de atomicidade do Bigtable?",
   "v": "Uma única linha. Não há transações entre linhas ou tabelas. Para transações multilinha use Spanner, Cloud SQL ou AlloyDB."
  },
  {
   "id": "d16c14",
   "t": "1.2",
   "f": "Quais assertions embutidas o Dataform oferece?",
   "v": "nonNull, uniqueKey, uniqueKeys e rowConditions, além de assertions SQL customizadas. Se falham, bloqueiam as ações dependentes, evitando publicar dado ruim."
  },
  {
   "id": "d16c15",
   "t": "1.2",
   "f": "Como tratar registros inválidos em um pipeline Dataflow sem parar o fluxo?",
   "v": "Padrão dead-letter: side output (TupleTag) grava os registros ruins em tabela ou tópico separado para análise e reprocessamento, e os válidos seguem."
  },
  {
   "id": "d16c16",
   "t": "1.2",
   "f": "Cobrança de time travel no armazenamento lógico versus físico no BigQuery?",
   "v": "No lógico (padrão) está incluída na tarifa, e reduzir a janela não economiza. No físico, bytes de time travel e fail-safe são cobrados à parte e janela menor reduz custo."
  }
 ],
 "questoes": [
  {
   "id": "d16q1",
   "s": 1,
   "t": "1.2",
   "e": "A global payments company needs a relational database for account ledgers. Transactions update multiple rows across several tables, users are on three continents, and the business requires zero data loss if a region fails and strong consistency. Which service should be used?",
   "o": [
    "Cloud SQL with a cross-region read replica",
    "Bigtable with multi-cluster routing",
    "Spanner in a multi-region configuration",
    "Firestore in Datastore mode with eventual consistency"
   ],
   "c": [
    2
   ],
   "x": "A opção “Spanner in a multi-region configuration” está certa: Spanner multirregional replica de forma síncrona com consenso, dá consistência forte, transações ACID multilinha, escala horizontal e RPO zero. “Cloud SQL with a cross-region read replica” erra: a réplica entre regiões do Cloud SQL é assíncrona, então pode haver perda de dados e a promoção é manual; também não escala escrita globalmente. “Bigtable with multi-cluster routing” erra: Bigtable só tem atomicidade por linha e consistência eventual entre clusters. “Firestore in Datastore mode with eventual consistency” erra: consistência eventual contraria o requisito de consistência forte e transações multilinha para razão financeira."
  },
  {
   "id": "d16q2",
   "s": 1,
   "t": "1.2",
   "e": "An analyst ran a faulty DELETE statement on a BigQuery table three days ago that removed about 40,000 rows. The dataset uses default settings. What is the fastest way to recover the deleted rows?",
   "o": [
    "Open a ticket with Cloud Customer Care to use fail-safe storage",
    "Restore from a Cloud Storage export of the table made last month",
    "Fail over to the secondary region replica of the dataset",
    "Query the table with FOR SYSTEM_TIME AS OF a timestamp before the DELETE and write the result to a new table or MERGE it back"
   ],
   "c": [
    3
   ],
   "x": "A opção “Query the table with FOR SYSTEM_TIME AS OF a timestamp before the DELETE and write…” está certa: três dias está dentro da janela padrão de time travel de 7 dias, então a consulta no passado recupera as linhas imediatamente e sem suporte. “Open a ticket with Cloud Customer Care to use fail-safe storage” erra: fail-safe só vale depois da janela de time travel, não é consultável e exige chamado, sendo mais lento. “Restore from a Cloud Storage export of the table made last month” erra: exportação antiga não tem as alterações dos últimos dias e dá mais trabalho. “Fail over to the secondary region replica of the dataset” erra: a réplica também recebeu o DELETE; replicação não protege de erro lógico e failover não desfaz a operação."
  },
  {
   "id": "d16q3",
   "s": 1,
   "t": "1.2",
   "e": "A BigQuery table was dropped by mistake ten days ago. The dataset uses the default time travel window. The data is business critical. What is the only remaining option to recover it?",
   "o": [
    "Use FOR SYSTEM_TIME AS OF with a timestamp from ten days ago",
    "Contact Cloud Customer Care to request recovery from fail-safe storage and then copy the data",
    "Restore the table from a table snapshot, which BigQuery creates automatically every day",
    "Wait for the cross-region replica to promote the dropped table"
   ],
   "c": [
    1
   ],
   "x": "A opção “Contact Cloud Customer Care to request recovery from fail-safe storage and then copy…” está certa: com janela padrão de 7 dias, o time travel já expirou, mas o fail-safe cobre mais 7 dias e a recuperação é feita via Cloud Customer Care. “Use FOR SYSTEM_TIME AS OF with a timestamp from ten days ago” erra: dez dias está fora da janela de time travel e a consulta falha. “Restore the table from a table snapshot, which BigQuery creates automatically every day” erra: snapshots não são criados automaticamente; precisam ser criados por você ou por agendamento. “Wait for the cross-region replica to promote the dropped table” erra: a réplica replica também a exclusão e a promoção de réplica não recupera tabela apagada."
  },
  {
   "id": "d16q4",
   "s": 5,
   "t": "5.5",
   "e": "A retailer runs its analytics warehouse in BigQuery Enterprise Plus. It needs to survive the complete loss of the primary region with a recovery point objective of about 15 minutes and a recovery time of a few minutes, while keeping operational effort low. What should the data engineer configure?",
   "o": [
    "Create a nightly scheduled query that copies all tables to a dataset in another region",
    "Create the dataset in the US multi-region and rely on its built-in redundancy",
    "Use managed disaster recovery: replicate the dataset to a secondary region and attach it to a failover reservation",
    "Export tables to a dual-region Cloud Storage bucket every hour"
   ],
   "c": [
    2
   ],
   "x": "A opção “Use managed disaster recovery: replicate the dataset to a secondary region and attach it…” está certa: managed DR do BigQuery (Enterprise Plus) combina réplica de dataset e reserva de failover, com meta de RPO de 15 minutos e RTO de minutos, de forma gerenciada. “Create a nightly scheduled query that copies all tables to a dataset in another region” erra: cópia noturna dá RPO de até 24 horas e exige reconstruir reservas e consultas na hora do desastre. “Create the dataset in the US multi-region and rely on its built-in redundancy” erra: multirregião sozinha não é estratégia de DR entre regiões segundo a documentação. “Export tables to a dual-region Cloud Storage bucket every hour” erra: exportação horária dá RPO de uma hora, exige recarga com RTO alto e muito trabalho operacional."
  },
  {
   "id": "d16q5",
   "s": 5,
   "t": "5.5",
   "e": "An ad-tech application stores user profiles in Bigtable in two regions. Profile reads and writes must keep working automatically if one region becomes unavailable, and the application can tolerate reading slightly stale data. How should the app profile be configured?",
   "o": [
    "Single-cluster routing to the primary cluster and manual failover",
    "Multi-cluster routing across the clusters in both regions",
    "Create a daily backup and restore it in the other region during an outage",
    "Use a single cluster with more nodes in multiple zones of one region"
   ],
   "c": [
    1
   ],
   "x": "A opção “Multi-cluster routing across the clusters in both regions” está certa: roteamento multi-cluster faz failover automático para outro cluster disponível e aceita consistência eventual, que é tolerada no enunciado. “Single-cluster routing to the primary cluster and manual failover” erra: cluster único exige failover manual, contrariando o requisito de automático. “Create a daily backup and restore it in the other region during an outage” erra: backup diário implica perda de dados e restauração lenta, não é failover. “Use a single cluster with more nodes in multiple zones of one region” erra: mais nós em um cluster regional não protegem contra a indisponibilidade de uma região inteira."
  },
  {
   "id": "d16q6",
   "s": 1,
   "t": "1.2",
   "e": "A company runs a production database on Cloud SQL for PostgreSQL in us-central1. Requirements: automatic recovery from a zone failure, and the ability to restore service in another region after a regional disaster, accepting a manual step. Choose two.",
   "o": [
    "Enable high availability so a standby instance in another zone takes over automatically",
    "Create a cross-region read replica that can be promoted during a regional disaster",
    "Add more vCPUs to the primary instance",
    "Enable query insights on the instance",
    "Create a read replica in the same zone as the primary"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Enable high availability so a standby instance in another zone takes over automatically” e “Create a cross-region read replica that can be promoted during a regional disaster” estão corretas: HA cria standby em outra zona com replicação síncrona e failover automático, cobrindo a falha de zona; a réplica entre regiões, promovida manualmente, cobre o desastre regional aceitando o passo manual. “Add more vCPUs to the primary instance” erra: mais vCPU melhora desempenho, não disponibilidade. “Enable query insights on the instance” erra: query insights é diagnóstico de desempenho. “Create a read replica in the same zone as the primary” erra: réplica na mesma zona cai junto com a zona e não ajuda na falha regional."
  },
  {
   "id": "d16q7",
   "s": 5,
   "t": "5.5",
   "e": "A media company stores raw video metadata files in Cloud Storage. The application must keep using one bucket name and endpoint if a region fails, and the business wants objects replicated to a second region with a recovery point objective of about 15 minutes. What is the most appropriate configuration?",
   "o": [
    "A regional bucket with a scheduled Storage Transfer Service job to another region each night",
    "A dual-region bucket with turbo replication enabled",
    "A regional bucket with object versioning enabled",
    "Two regional buckets and application logic that writes to both"
   ],
   "c": [
    1
   ],
   "x": "A opção “A dual-region bucket with turbo replication enabled” está certa: dual-region mantém um nome de bucket com dados em duas regiões, o failover é transparente, e turbo replication tem meta de RPO de 15 minutos. “A regional bucket with a scheduled Storage Transfer Service job to another region each…” erra: cópia noturna dá RPO de horas e muda o bucket em caso de falha. “A regional bucket with object versioning enabled” erra: versionamento protege contra apagamento e sobrescrita, mas os dados continuam em uma só região. “Two regional buckets and application logic that writes to both” erra: funciona, mas transfere a complexidade e o risco de inconsistência para a aplicação, contra o requisito de simplicidade com um nome de bucket."
  },
  {
   "id": "d16q8",
   "s": 1,
   "t": "1.2",
   "e": "A data team transforms raw orders into reporting tables in BigQuery using Dataform. Occasionally duplicate order_id values and null customer_id values reach the reporting tables and break dashboards. The team wants the pipeline to stop before publishing bad data. What should it do?",
   "o": [
    "Add Dataform assertions (uniqueKey on order_id and nonNull on customer_id) as dependencies of the reporting tables",
    "Add a LIMIT clause to the reporting queries",
    "Schedule a daily export of the reporting tables to Cloud Storage",
    "Enable BI Engine on the reporting dataset"
   ],
   "c": [
    0
   ],
   "x": "A opção “Add Dataform assertions (uniqueKey on order_id and nonNull on customer_id)…” está certa: assertions uniqueKey e nonNull do Dataform são consultas que falham quando acham problemas e, como dependências, bloqueiam as ações seguintes, evitando publicar dado ruim. “Add a LIMIT clause to the reporting queries” erra: LIMIT não valida nada. “Schedule a daily export of the reporting tables to Cloud Storage” erra: exportar copia o dado ruim sem detectar problemas. “Enable BI Engine on the reporting dataset” erra: BI Engine acelera consultas, não valida qualidade."
  },
  {
   "id": "d16q9",
   "s": 1,
   "t": "1.2",
   "e": "A streaming Dataflow pipeline reads JSON events from Pub/Sub and writes them to BigQuery. Occasionally a malformed event causes a parsing exception that repeatedly fails the pipeline. The business requires that no event is lost and that bad events can be analyzed and reprocessed later. What should the engineer do?",
   "o": [
    "Catch the exception and silently drop the malformed event",
    "Increase the number of Dataflow workers",
    "Send malformed events to a dead-letter output (side output) written to a separate BigQuery table or Pub/Sub topic, and continue processing valid events",
    "Disable acknowledgements in the Pub/Sub subscription"
   ],
   "c": [
    2
   ],
   "x": "A opção “Send malformed events to a dead-letter output (side output) written to a separate…” está certa: o padrão dead-letter com side output isola os registros inválidos sem parar o fluxo e sem perdê-los, permitindo análise e reprocessamento. “Catch the exception and silently drop the malformed event” erra: descartar perde eventos, contra o requisito. “Increase the number of Dataflow workers” erra: mais workers não corrigem uma exceção de parsing determinística. “Disable acknowledgements in the Pub/Sub subscription” erra: desativar acks causaria reentrega contínua e não resolve o dado inválido."
  },
  {
   "id": "d16q10",
   "s": 1,
   "t": "1.2",
   "e": "A compliance team needs to correct accidental changes discovered within one or two days, and also needs a month-end point-in-time copy of a large BigQuery fact table kept for one year at the lowest possible cost. Choose two.",
   "o": [
    "Rely on time travel with the default window for recent accidental changes",
    "Create a monthly table snapshot with a 365-day expiration",
    "Create a monthly full copy of the table using CREATE TABLE AS SELECT",
    "Increase the fail-safe period to one year",
    "Create a clone every month and never expire it"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Rely on time travel with the default window for recent accidental changes” e “Create a monthly table snapshot with a 365-day expiration” estão corretas: time travel resolve erros recentes sem custo operacional, e snapshots mensais com expiração de 365 dias guardam pontos no tempo cobrando só a diferença em relação à tabela base. “Create a monthly full copy of the table using CREATE TABLE AS SELECT” erra: cópia completa duplica o armazenamento da tabela grande a cada mês, o que é o mais caro. “Increase the fail-safe period to one year” erra: o fail-safe é fixo em 7 dias e não pode ser estendido. “Create a clone every month and never expire it” erra: clone é gravável e útil para testes, mas sem expiração acumula custo e não é feito para retenção de auditoria; snapshot é o recurso certo."
  }
 ]
};
  C.dias[17] = {
 "aula": {
  "titulo": "BI, desempenho e compartilhamento",
  "simples": {
   "analogia": "Um dashboard é como um restaurante que recebe o dia todo o mesmo pedido de 200 clientes: faturamento por loja. Se a cozinha cozinhar tudo do zero a cada vez, demora. Há quatro truques. Primeiro, **anotar a resposta do último pedido idêntico** (cache de resultados): se ninguém mudou os ingredientes, entrega na hora. Segundo, **buscar só o que precisa**, com o estoque organizado por prateleiras (partição e cluster). Terceiro, **deixar o molho pronto** (materialized view), que é refeito sozinho quando chega ingrediente novo. Quarto, **deixar os ingredientes mais usados em cima da bancada** (BI Engine, que usa memória). Compartilhar é outro assunto: em vez de entregar a chave da despensa, você entrega um **cardápio** com os pratos permitidos, a authorized view. Limite da analogia: o cache só vale para pedido idêntico e que não dependa da hora atual.",
   "pontos": [
    "Dashboard repete as mesmas consultas; o truque é reduzir o trabalho repetido.",
    "**Cache** guarda a resposta de uma consulta idêntica; a hora atual na consulta o invalida.",
    "**Materialized view** é um resultado pré-pronto que o BigQuery atualiza sozinho.",
    "**BI Engine** guarda dados em memória para acelerar consultas diferentes.",
    "**Authorized view** dá acesso a um recorte sem dar acesso à tabela de origem.",
    "**Analytics Hub** compartilha dados com muita gente, sem copiar."
   ],
   "paraQueServe": "Você usa isso quando um dashboard está lento ou caro, ou quando outra equipe ou empresa precisa ver parte dos seus dados sem receber uma cópia."
  },
  "glossario": [
   {
    "t": "Cache de resultados",
    "d": "O BigQuery lembra a resposta de uma consulta por cerca de 24 horas. Se você repete a mesma consulta e os dados não mudaram, a resposta vem de graça."
   },
   {
    "t": "Partição",
    "d": "Dividir uma tabela em pedaços, em geral por data. Uma consulta com filtro de data lê só os pedaços necessários, como abrir só a prateleira de um mês."
   },
   {
    "t": "Cluster",
    "d": "Organizar os dados dentro da tabela pelas colunas mais filtradas, para o BigQuery pular blocos que não interessam."
   },
   {
    "t": "Slot",
    "d": "Unidade de poder de computação do BigQuery, como um cozinheiro. Ex.: com 100 slots, 100 trabalhos andam em paralelo; com 20, a mesma consulta leva mais tempo."
   },
   {
    "t": "Materialized view",
    "d": "Uma view cujo resultado fica guardado e é mantido atualizado pelo BigQuery. A consulta lê o resultado pronto, não a tabela inteira."
   },
   {
    "t": "BI Engine",
    "d": "Serviço que mantém em memória as partes mais consultadas das tabelas, para dashboards responderem em menos de um segundo."
   },
   {
    "t": "Skew (desbalanceamento)",
    "d": "Quando um trabalhador recebe muito mais dados que os outros, por exemplo por uma chave muito repetida. A consulta espera o mais lento."
   },
   {
    "t": "Authorized view",
    "d": "View num dataset que é autorizada a ler outro dataset. Quem consulta a view não precisa de acesso à tabela de origem."
   },
   {
    "t": "Analytics Hub",
    "d": "Vitrine para compartilhar datasets entre equipes ou empresas. Quem assina recebe um dataset vinculado, somente leitura, sem cópia dos dados."
   },
   {
    "t": "Looker Studio e Looker",
    "d": "Looker Studio é o painel rápido e gratuito. Looker é a plataforma corporativa que define cada métrica uma única vez, para todos usarem o mesmo número."
   }
  ],
  "checagem": [
   "Sem olhar: qual a diferença entre cache de resultados, materialized view e BI Engine?",
   "Por que usar a hora atual dentro da consulta do dashboard faz o cache deixar de funcionar?",
   "Como uma authorized view entrega dados sem que a pessoa tenha acesso à tabela de origem?",
   "Quando você escolhe Analytics Hub em vez de exportar um arquivo?"
  ],
  "resumo": "Como servir dados do BigQuery com rapidez para dashboards (BI Engine, materialized views, cache, partição), diagnosticar consulta lenta e compartilhar dados sem copiar (authorized views, Analytics Hub, datasets públicos, exportação).",
  "blocos": [
   {
    "t": "Ideia central: dashboard é leitura repetida",
    "facil": "Traduzindo: dashboard repete as mesmas perguntas o dia todo. Para ficar rápido, reduza o trabalho repetido; para compartilhar, dê acesso sem copiar os dados.",
    "p": [
     "Um dashboard dispara as mesmas consultas, quase iguais, muitas vezes e por muitos usuários, e espera resposta em segundos. O BigQuery é otimizado para varrer grandes volumes, não para latência de milissegundos, então o desenho para BI consiste em reduzir o trabalho repetido. Há quatro alavancas, da mais barata à mais estrutural: aproveitar o cache de resultados, reduzir o que é lido (partição, cluster, poucas colunas), pré-computar (materialized views, tabelas agregadas, campos pré-calculados) e acelerar a leitura em memória (BI Engine).",
     "Compartilhar dados é o outro lado: entregar acesso a quem precisa, sem criar cópias que ficam desatualizadas, sem perder controle e sem expor o que não deve. A pergunta de prova quase sempre é: copiar, dar acesso direto, expor por view, ou publicar numa listagem?"
    ]
   },
   {
    "t": "Cache de resultados e o que o invalida",
    "facil": "Traduzindo: o BigQuery lembra a resposta de uma consulta idêntica por cerca de 24 horas. Se a consulta usa a hora atual ou os dados mudaram, o cache não vale.",
    "p": [
     "O BigQuery guarda o resultado de uma consulta por cerca de 24 horas e o reutiliza, sem custo e sem consumir slots, quando o texto da consulta é o mesmo, as tabelas referenciadas não mudaram e o resultado é determinístico. O cache NÃO é usado quando a consulta tem funções não determinísticas como CURRENT_TIMESTAMP() ou RAND(), quando grava numa tabela de destino, quando as tabelas leem de streaming buffer recente ou mudaram, ou quando você desliga o cache. Por padrão o cache é por usuário; segundo a tabela de edições, o cache entre usuários não existe na edição Standard (só consulta do mesmo usuário) e existe em Enterprise e Enterprise Plus.",
     "Consequência prática: dashboard que reexecuta a mesma consulta com CURRENT_TIMESTAMP() no filtro paga toda vez. Troque por um valor calculado fora (data como literal ou parâmetro) para o cache funcionar."
    ],
    "armadilha": "Cache e BI Engine são coisas diferentes. Cache guarda resultado pronto de uma consulta idêntica; BI Engine mantém dados de tabelas em memória para acelerar consultas diferentes sobre elas."
   },
   {
    "t": "BI Engine e materialized views",
    "facil": "Traduzindo: a materialized view é a resposta pré-pronta que se atualiza sozinha. O BI Engine é a memória rápida que acelera consultas diferentes sobre as mesmas tabelas.",
    "p": [
     "BI Engine é um serviço de memória que guarda em cache as partes consultadas (colunas e partições) das tabelas e acelera consultas SQL, com respostas em subsegundo para dashboards. Você reserva capacidade em GiB por projeto e localização. Com tabelas preferenciais (preferred tables) você restringe a aceleração às tabelas escolhidas. Funciona melhor com dados pré-agregados ou pré-unidos e com joins INNER e LEFT OUTER de uma tabela de fatos grande com poucas dimensões pequenas. A documentação lista limitações: não acelera, entre outros, UDFs em JavaScript, tabelas externas e BigLake, dados JSON, tabelas com row-level security, busca vetorial e consultas de BigQuery ML; stages que não consegue acelerar voltam a usar slots sem falhar. Segundo a tabela de edições, BI Engine não está disponível na edição Standard.",
     "Materialized view (MV) é uma view cujo resultado é guardado fisicamente e mantido atualizado pelo BigQuery. MVs incrementais leem apenas as mudanças da tabela base, então a consulta lê pouco. O recurso smart tuning reescreve automaticamente uma consulta contra a tabela base para usar a MV quando ela consegue responder, sem mudar a consulta do dashboard. Há opção max_staleness (defasagem máxima tolerada), que permite trocar frescor por custo, e refresh automático: por padrão o BigQuery atualiza a MV em até 5 a 30 minutos depois de uma mudança na tabela base, sem refresh mais frequente que a cada 30 minutos (esse teto é configurável com refresh_interval_minutes, de 1 minuto a 7 dias; o refresh é best-effort, sem garantia de horário). Restrições: sintaxe limitada (agregações permitidas, poucos tipos de join), não pode ser aninhada em outra MV e não consulta tabelas externas comuns."
    ],
    "tabela": {
     "cab": [
      "Necessidade",
      "Melhor ferramenta",
      "Por quê"
     ],
     "linhas": [
      [
       "Mesma agregação pesada repetida, dados mudam",
       "Materialized view",
       "Resultado pré-computado e atualizado de forma incremental e automática"
      ],
      [
       "Consultas variadas e interativas sobre tabelas pequenas ou médias, resposta em subsegundo",
       "BI Engine",
       "Dados em memória; acelera sem alterar a consulta"
      ],
      [
       "Consulta idêntica repetida sem mudança nos dados",
       "Cache de resultados",
       "Gratuito, mas exige texto igual e consulta determinística"
      ],
      [
       "Lógica complexa não suportada em MV",
       "Tabela agregada (scheduled query ou Dataform)",
       "Você controla a lógica; assume a manutenção e a defasagem"
      ],
      [
       "Reduzir bytes lidos de qualquer consulta",
       "Partição e cluster",
       "Poda de partições e blocos; benefício vale para todos os consumidores"
      ]
     ]
    },
    "dica": "Campos pré-calculados são colunas derivadas materializadas na carga ou em tabelas de reporting (ex.: faixa etária, margem). Evitam recalcular expressão caras em cada clique do dashboard."
   },
   {
    "t": "Looker e Looker Studio",
    "facil": "Traduzindo: Looker Studio é o painel rápido e gratuito para equipes. Looker é a plataforma corporativa que define cada métrica uma vez, para todos usarem o mesmo número.",
    "p": [
     "Looker Studio é a ferramenta de dashboards self-service, gratuita, com conector nativo para BigQuery. Ideal para equipes que montam relatórios rápidos. Ele consulta o BigQuery diretamente e possui configuração de atualização de dados (cache do próprio Looker Studio) e de credenciais: com credenciais do proprietário todos os visualizadores usam a permissão de quem criou a fonte; com credenciais do visualizador, cada pessoa só enxerga o que o seu IAM permite, o que respeita policy tags e row-level security.",
     "Looker é a plataforma corporativa de BI com camada semântica em LookML: métricas e dimensões definidas uma vez, em código versionado, reutilizadas por todos, garantindo uma única definição de 'receita'. Looker gera SQL e o executa no BigQuery (pushdown, sem mover dados). Recursos de desempenho: datagroups para controlar o cache, persistent derived tables (PDTs) e aggregate awareness (usa tabelas agregadas automaticamente quando a consulta permite). Resposta de prova: 'métricas governadas e consistentes, camada semântica, controle de versão' é Looker; 'dashboard rápido e gratuito para a equipe' é Looker Studio."
    ]
   },
   {
    "t": "Diagnosticar consulta lenta",
    "facil": "Traduzindo: investigue consulta lenta em ordem: plano de execução, bytes lidos, maus hábitos de SQL e, por último, falta de capacidade.",
    "p": [
     "Siga uma ordem. Primeiro, o plano de execução do job (aba Execution details, ou job_stages em INFORMATION_SCHEMA.JOBS): cada stage mostra tempo de espera, leitura, computação e escrita, além de média versus máximo de slot time entre workers. Se o máximo é muito maior que a média, há skew de dados (chave de join ou agrupamento desbalanceada, por exemplo muitos NULL ou uma chave dominante): filtre ou trate chaves quentes, agregue antes de unir. Segundo, olhe bytes lidos: SELECT *, ausência de filtro de partição, falta de cluster. Terceiro, anti-padrões: CROSS JOIN acidental, ORDER BY sem LIMIT em resultado enorme, UDF JavaScript em linha, subconsultas repetidas, join de duas tabelas gigantes sem pré-filtro. Quarto, contenção: se o job passou muito tempo em espera, faltam slots na reserva ou o limite sob demanda foi atingido, então o problema é capacidade e não a consulta.",
     "Para achar o que otimizar em escala use as visões INFORMATION_SCHEMA.JOBS (por projeto, ou JOBS_BY_PROJECT, JOBS_BY_ORGANIZATION): ordene por total_bytes_billed ou total_slot_ms para listar as consultas mais caras, agrupe por usuário ou por query_info.query_hashes. JOBS_TIMELINE mostra uso de slots ao longo do tempo (picos e contenção). Query insights no console sinaliza causas como skew e join explosivo. Dry run estima bytes antes de executar."
    ],
    "armadilha": "LIMIT não reduz bytes lidos em tabela não clusterizada; o custo sob demanda é por bytes lidos nas colunas escolhidas e partições não podadas. Para reduzir custo filtre por partição e selecione só as colunas necessárias."
   },
   {
    "t": "Compartilhar dados: authorized views, Analytics Hub, públicos e exportação",
    "facil": "Traduzindo: para dar acesso a um recorte, use authorized view. Para muitos consumidores sem cópia, Analytics Hub. Exportar gera uma cópia que envelhece.",
    "p": [
     "Authorized view: uma view num dataset B é autorizada no dataset A (origem). Quem consulta a view precisa de acesso apenas ao dataset B (e a permissão de executar jobs), nunca à tabela de origem. A view pode ocultar colunas, filtrar linhas ou agregar. Authorized dataset autoriza todas as views de um dataset de uma vez, e authorized routines fazem o mesmo para funções. Row-level security e policy tags complementam quando o controle deve ser por usuário.",
     "Analytics Hub: troca de dados em escala, entre equipes ou organizações. O publisher cria uma exchange (privada, pública ou de provedores) e publica listings que apontam para um dataset compartilhado. O subscriber assina e recebe um linked dataset somente leitura no seu projeto; nenhum dado é copiado, o publisher mantém o controle e pode revogar, e o subscriber paga a computação das suas consultas enquanto o armazenamento fica com o publisher. Também suporta data clean rooms, que permitem análise combinada com restrições de privacidade.",
     "Datasets públicos (bigquery-public-data) ficam armazenados de graça para você; você paga as consultas (há uma cota mensal gratuita de processamento sob demanda). Atenção à localização: consulta e tabelas precisam estar na mesma localização, então juntar dado seu na UE com um dataset público nos EUA falha.",
     "Exportação: EXPORT DATA grava resultado em Cloud Storage (CSV, JSON, Avro, Parquet), Pub/Sub, Bigtable ou Spanner (reverse ETL). Exportar cria cópia: serve para entregar arquivo a terceiros ou alimentar sistemas operacionais, mas a cópia envelhece e sai da governança. Prefira compartilhar sem copiar quando o consumidor usa BigQuery."
    ],
    "lista": [
     "Mesmo organização, recorte de colunas ou linhas: authorized view.",
     "Muitos consumidores ou outras organizações, sem cópia, com revogação: Analytics Hub.",
     "Consumidor fora do Google Cloud ou sistema operacional: exportação.",
     "Dados de referência abertos: dataset público, atentando à localização."
    ]
   }
  ],
  "exemplo": {
   "t": "Dashboard comercial lento e dados para um parceiro",
   "texto": "Uma rede de lojas tem uma tabela de vendas de 8 TB particionada por data. O dashboard do Looker Studio, aberto por 200 pessoas, recalcula faturamento por loja e dia e leva 40 segundos. Diagnóstico: o plano mostra leitura de todas as colunas e a consulta usa CURRENT_TIMESTAMP(), logo sem cache. Correções em ordem: (1) filtro de data como parâmetro, que habilita o cache; (2) materialized view que agrega faturamento por loja e dia, com smart tuning mantendo a consulta original; (3) cluster por loja_id na tabela base; (4) BI Engine reservado sobre a MV, que é pequena, trazendo subsegundo. Depois, a diretoria quer entregar uma visão agregada por região a um fornecedor, sem mostrar CPF. Opção A, exportar CSV todo mês: cria cópia envelhecida. Opção B, authorized view agregada: serve se o fornecedor estiver na mesma organização. Opção C, listing privada no Analytics Hub apontando para um dataset com a view: o fornecedor assina um linked dataset, sem cópia, e a empresa revoga quando quiser. Escolha: C para fornecedor externo, B para equipe interna."
  },
  "prova": [
   "'Dashboard users complain about latency', 'sub-second', 'many concurrent users' apontam para BI Engine; 'same aggregation repeatedly', 'automatically refreshed' apontam para materialized view.",
   "'Share without copying' e 'external organizations' apontam para Analytics Hub; 'limit columns/rows to another team' aponta para authorized view.",
   "'Identify the most expensive queries' pede INFORMATION_SCHEMA.JOBS; 'one worker much slower than the others' é skew visto no plano de execução.",
   "'Consistent metric definitions' e 'semantic layer' apontam para Looker (LookML); 'free self-service' aponta para Looker Studio.",
   "'Query bills every time' sugere cache invalidado por função não determinística ou por tabela de destino."
  ],
  "explique": "Descreva, com as próprias palavras, a diferença entre cache de resultados, materialized view e BI Engine, e diga em que situação você escolheria cada uma para um dashboard. Depois explique como uma authorized view dá acesso sem dar acesso à tabela de origem."
 },
 "cartoes": [
  {
   "id": "d17c1",
   "t": "4.1",
   "f": "Por quanto tempo o BigQuery guarda o cache de resultados e quando ele não é usado?",
   "v": "Cerca de 24 horas. Não é usado com funções não determinísticas (CURRENT_TIMESTAMP, RAND), tabela de destino, tabelas alteradas ou texto de consulta diferente. Acertos de cache são gratuitos."
  },
  {
   "id": "d17c2",
   "t": "4.1",
   "f": "O que é BI Engine e como se contrata?",
   "v": "Serviço em memória que acelera consultas de dashboard para subsegundo. Você reserva capacidade em GiB por projeto e localização e pode restringir a tabelas preferenciais. Não está na edição Standard."
  },
  {
   "id": "d17c3",
   "t": "4.1",
   "f": "Quais joins e fontes o BI Engine acelera melhor, e o que não acelera?",
   "v": "Melhor com dados pré-agregados e joins INNER ou LEFT de fato grande com poucas dimensões pequenas. Não acelera UDF JavaScript, tabelas externas e BigLake, JSON, row-level security nem BigQuery ML; stages não suportados usam slots."
  },
  {
   "id": "d17c4",
   "t": "4.1",
   "f": "Como uma materialized view acelera sem mudar a consulta do dashboard?",
   "v": "Smart tuning reescreve consultas na tabela base para usar a MV quando ela responde a consulta. MVs incrementais leem só as mudanças. Há max_staleness (intervalo máximo de defasagem tolerado) para trocar frescor por custo; o refresh automático padrão ocorre em até 5 a 30 minutos, no máximo a cada 30 minutos por padrão."
  },
  {
   "id": "d17c5",
   "t": "4.1",
   "f": "Qual a diferença entre cache de resultados e BI Engine?",
   "v": "Cache reaproveita o resultado pronto de uma consulta idêntica. BI Engine guarda dados das tabelas em memória e acelera consultas diferentes sobre elas."
  },
  {
   "id": "d17c6",
   "t": "4.1",
   "f": "Looker versus Looker Studio: quando cada um?",
   "v": "Looker: camada semântica LookML com métricas governadas e versionadas, em escala corporativa. Looker Studio: dashboards self-service gratuitos e rápidos de montar, conectando direto ao BigQuery."
  },
  {
   "id": "d17c7",
   "t": "4.1",
   "f": "No Looker Studio, qual a diferença entre credenciais do proprietário e do visualizador?",
   "v": "Proprietário: todos veem com a permissão de quem criou a fonte. Visualizador: cada pessoa usa o próprio IAM, respeitando policy tags e row-level security."
  },
  {
   "id": "d17c8",
   "t": "4.1",
   "f": "O que significa o stage com máximo de slot time muito maior que a média no plano de execução?",
   "v": "Skew de dados: chave de join ou agrupamento desbalanceada (muitos NULL, chave dominante). Trate ou filtre a chave quente e agregue antes do join."
  },
  {
   "id": "d17c9",
   "t": "4.1",
   "f": "Como listar as consultas mais caras dos últimos dias?",
   "v": "INFORMATION_SCHEMA.JOBS (por projeto ou organização), ordenando por total_bytes_billed ou total_slot_ms. JOBS_TIMELINE mostra o uso de slots ao longo do tempo."
  },
  {
   "id": "d17c10",
   "t": "4.1",
   "f": "LIMIT reduz o custo de uma consulta sob demanda?",
   "v": "Não em geral: o custo é por bytes lidos nas colunas e partições escaneadas. Reduza com filtro de partição, cluster e seleção de poucas colunas. Dry run mostra os bytes."
  },
  {
   "id": "d17c11",
   "t": "4.3",
   "f": "Como funciona uma authorized view?",
   "v": "A view em um dataset é autorizada no dataset de origem. O consumidor precisa de acesso só ao dataset da view, não à tabela base. Pode ocultar colunas, filtrar linhas ou agregar."
  },
  {
   "id": "d17c12",
   "t": "4.3",
   "f": "Authorized view versus authorized dataset?",
   "v": "Authorized view autoriza uma view específica. Authorized dataset autoriza todas as views existentes e futuras de um dataset de uma só vez."
  },
  {
   "id": "d17c13",
   "t": "4.3",
   "f": "O que o subscriber recebe ao assinar uma listing do Analytics Hub?",
   "v": "Um linked dataset somente leitura no seu projeto, sem cópia dos dados. O publisher mantém o controle e o armazenamento; o subscriber paga as próprias consultas."
  },
  {
   "id": "d17c14",
   "t": "4.3",
   "f": "Quem paga o quê em datasets públicos do BigQuery?",
   "v": "O armazenamento é do Google; você paga o processamento das suas consultas (há cota mensal gratuita sob demanda). Consulta e dados precisam estar na mesma localização."
  },
  {
   "id": "d17c15",
   "t": "4.3",
   "f": "Quando exportar com EXPORT DATA em vez de compartilhar?",
   "v": "Quando o consumidor está fora do BigQuery (arquivo em Cloud Storage, Pub/Sub, Bigtable, Spanner). Cria uma cópia que envelhece e sai da governança."
  }
 ],
 "questoes": [
  {
   "id": "d17q1",
   "s": 4,
   "t": "4.1",
   "e": "A sales dashboard built in Looker Studio queries a 60 GB aggregated BigQuery table. About 300 users open it each morning and complain of 8 to 15 second load times. The business wants sub-second responses with minimal changes to the dashboard queries. What should the data engineer do?",
   "o": [
    "Export the table to Cloud Storage and use a CSV data source",
    "Create a BI Engine capacity reservation for the project and location, optionally limited to the table as a preferred table",
    "Convert the table to a Bigtable table",
    "Increase the on-demand slot limit for the project"
   ],
   "c": [
    1
   ],
   "x": "A opção “Create a BI Engine capacity reservation for the project and location, optionally limited…” está certa: BI Engine mantém em memória as colunas e partições consultadas e entrega subsegundo sem mudar as consultas do dashboard. “Export the table to Cloud Storage and use a CSV data source” erra: CSV é mais lento, perde o SQL e a governança. “Convert the table to a Bigtable table” erra: migrar para Bigtable exige reescrever o acesso e é uma mudança desproporcional. “Increase the on-demand slot limit for the project” erra: o limite de slots não é o gargalo de latência de leitura; o problema é a latência de leitura repetida, não a falta de slots."
  },
  {
   "id": "d17q2",
   "s": 4,
   "t": "4.1",
   "e": "A BigQuery fact table receives new rows every few minutes. Dozens of dashboards run the same query that sums revenue by store and day over the entire history. The team wants lower query cost and latency with the least maintenance, and results must reflect recent data automatically. Which solution fits best?",
   "o": [
    "A logical view with the aggregation query",
    "A materialized view that aggregates revenue by store and day",
    "A scheduled query that rewrites a summary table once a day",
    "Query result caching only"
   ],
   "c": [
    1
   ],
   "x": "A opção “A materialized view that aggregates revenue by store and day” está certa: a materialized view pré-computa a agregação, é atualizada de forma incremental e automática, e com smart tuning serve as consultas sem alterá-las. “A logical view with the aggregation query” erra: view lógica não guarda resultado e reexecuta a consulta completa sempre. “A scheduled query that rewrites a summary table once a day” erra: a tabela diária fica defasada em até um dia e exige manutenção do agendamento. “Query result caching only” erra: o cache só ajuda consultas idênticas e é invalidado sempre que a tabela base recebe novas linhas, o que acontece a cada poucos minutos."
  },
  {
   "id": "d17q3",
   "s": 4,
   "t": "4.3",
   "e": "The finance team owns a BigQuery dataset in project A with a table containing salary and employee names. The HR analytics team in project B must query only department-level averages and must not have any access to the underlying table. What should be done?",
   "o": [
    "Grant the HR analytics team BigQuery Data Viewer on the finance dataset",
    "Copy the table to project B every night",
    "Create a view in a separate dataset that returns department averages, authorize it on the finance dataset, and grant the HR team access only to the view dataset",
    "Export a CSV with the averages and email it every week"
   ],
   "c": [
    2
   ],
   "x": "A opção “Create a view in a separate dataset that returns department averages, authorize it…” está certa: a authorized view lê a tabela de origem em nome do usuário, que só precisa de acesso ao dataset da view, entregando agregados sem dar acesso aos dados base. “Grant the HR analytics team BigQuery Data Viewer on the finance dataset” erra: Data Viewer no dataset dá acesso à tabela completa com salários. “Copy the table to project B every night” erra: a cópia exporia os mesmos dados no projeto B e envelhece. “Export a CSV with the averages and email it every week” erra: CSV por e-mail é uma cópia manual, fora de governança, sem consulta interativa."
  },
  {
   "id": "d17q4",
   "s": 4,
   "t": "4.3",
   "e": "A data provider wants to offer a curated BigQuery dataset to dozens of customers in different organizations. Customers should query it from their own projects without the provider copying data for each of them, and the provider must be able to revoke access at any time. What is the best approach?",
   "o": [
    "Publish the dataset as a listing in a private Analytics Hub exchange and let customers subscribe",
    "Export the dataset to Cloud Storage weekly and share the bucket URL",
    "Add each customer user as BigQuery Data Viewer on the provider dataset one by one",
    "Create one copy of the dataset per customer with a scheduled copy job"
   ],
   "c": [
    0
   ],
   "x": "A opção “Publish the dataset as a listing in a private Analytics Hub exchange and let customers…” está certa: o Analytics Hub entrega um linked dataset somente leitura por assinante, sem cópia, com o publisher controlando e podendo revogar a assinatura. “Export the dataset to Cloud Storage weekly and share the bucket URL” erra: exportação cria cópias que envelhecem e perde a consulta em SQL. “Add each customer user as BigQuery Data Viewer on the provider dataset one by one” erra: concede acesso direto ao projeto do provedor, é difícil de gerenciar em dezenas de organizações e mistura o custo de consulta com o provedor. “Create one copy of the dataset per customer with a scheduled copy job” erra: copiar para cada cliente multiplica armazenamento e manutenção, justamente o que o enunciado quer evitar."
  },
  {
   "id": "d17q5",
   "s": 4,
   "t": "4.1",
   "e": "A platform team suspects that a few queries are responsible for most of the BigQuery cost in the last 7 days. They want a ranked list of the most expensive queries across the project using SQL. What should they use?",
   "o": [
    "Cloud Monitoring uptime checks",
    "Cloud Audit Logs Admin Activity",
    "Query the INFORMATION_SCHEMA.JOBS view and order by total_bytes_billed or total_slot_ms",
    "The BigQuery query result cache"
   ],
   "c": [
    2
   ],
   "x": "A opção “Query the INFORMATION_SCHEMA.JOBS view and order by total_bytes_billed or total_slot_ms” está certa: INFORMATION_SCHEMA.JOBS traz bytes cobrados, slot time, usuário e texto de cada job, permitindo ranquear as consultas mais caras. “Cloud Monitoring uptime checks” erra: uptime checks medem disponibilidade de endpoints, não custo de consultas. “Cloud Audit Logs Admin Activity” erra: Admin Activity registra mudanças de configuração, não o consumo de cada consulta. “The BigQuery query result cache” erra: o cache guarda resultados, não estatísticas de custo."
  },
  {
   "id": "d17q6",
   "s": 4,
   "t": "4.1",
   "e": "In the execution graph of a slow BigQuery join, one stage shows that the maximum compute time of a single worker is many times the average. Over 40% of the join keys on the large table are NULL. What is the most likely problem and fix?",
   "o": [
    "The query is reading too many columns; replace SELECT * with a column list",
    "The slot reservation is too small; buy more slots",
    "Result caching is disabled; enable it",
    "Data skew on the join key; filter or handle NULL keys before the join and aggregate early"
   ],
   "c": [
    3
   ],
   "x": "A opção “Data skew on the join key; filter or handle NULL keys before the join and aggregate early” está certa: máximo muito acima da média em um stage indica skew, e muitos NULL na chave concentram o trabalho em poucos workers; filtrar ou tratar a chave e agregar antes do join resolve. “The query is reading too many columns; replace SELECT * with a column list” erra: SELECT * é um problema de bytes lidos, mas não explica workers desbalanceados. “The slot reservation is too small; buy more slots” erra: mais slots não resolvem uma chave concentrada em poucos workers. “Result caching is disabled; enable it” erra: cache afeta repetição de consultas idênticas, não o desempenho de uma execução com skew."
  },
  {
   "id": "d17q7",
   "s": 4,
   "t": "4.1",
   "e": "A 5 TB BigQuery events table is queried by dashboards that always filter on event_date and usually on customer_id. Queries scan far more data than needed and are slow and costly. Choose two.",
   "o": [
    "Partition the table by event_date",
    "Cluster the table by customer_id",
    "Create one table per day with a date suffix instead of partitioning",
    "Add LIMIT 1000 to every dashboard query",
    "Convert all columns to STRING to simplify filtering"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Partition the table by event_date” e “Cluster the table by customer_id” estão corretas: partição por event_date poda partições inteiras e cluster por customer_id organiza os blocos para pular dados dentro de cada partição, reduzindo bytes lidos e tempo. “Create one table per day with a date suffix instead of partitioning” erra: tabelas fragmentadas por sufixo geram sobrecarga de metadados e são pior que a tabela particionada. “Add LIMIT 1000 to every dashboard query” erra: LIMIT não reduz bytes lidos em consulta sem cluster que precisa agregar. “Convert all columns to STRING to simplify filtering” erra: converter tudo para STRING piora compressão, tipos e filtros e não ajuda a podar dados."
  },
  {
   "id": "d17q8",
   "s": 4,
   "t": "4.1",
   "e": "A large enterprise wants every department to use the same definition of net revenue in all dashboards, defined once in version-controlled code and reused, while the queries run on BigQuery. Which tool is most appropriate?",
   "o": [
    "Looker with LookML modeling the business metrics",
    "Looker Studio with separate calculated fields in each report",
    "Connected Sheets with manually shared formulas",
    "A weekly CSV export maintained by the finance team"
   ],
   "c": [
    0
   ],
   "x": "A opção “Looker with LookML modeling the business metrics” está certa: o Looker oferece camada semântica em LookML, em código versionável, com métricas definidas uma vez e SQL gerado sobre o BigQuery. “Looker Studio with separate calculated fields in each report” erra: campos calculados em cada relatório permitem definições divergentes. “Connected Sheets with manually shared formulas” erra: fórmulas compartilhadas manualmente não são governadas nem versionadas. “A weekly CSV export maintained by the finance team” erra: exportação em CSV não é camada semântica e envelhece."
  },
  {
   "id": "d17q9",
   "s": 4,
   "t": "4.1",
   "e": "A dashboard refreshes every minute and each refresh runs the same BigQuery query, which includes WHERE event_ts >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY). The project is charged for the full scan every time. What explains this and what is the fix?",
   "o": [
    "Cached results are only kept for one second; extend the cache duration in project settings",
    "Queries with non-deterministic functions such as CURRENT_TIMESTAMP are not served from the cache; compute the time boundary outside the query and pass it as a parameter or literal",
    "The dashboard user needs the BigQuery Admin role to use the cache",
    "Cached results require a destination table; add one to the query"
   ],
   "c": [
    1
   ],
   "x": "A opção “Queries with non-deterministic functions such as CURRENT_TIMESTAMP are not served…” está certa: funções não determinísticas como CURRENT_TIMESTAMP() impedem o uso do cache, e passar o limite de tempo como parâmetro ou literal (por exemplo arredondado) permite acertos de cache gratuitos. “Cached results are only kept for one second; extend the cache duration in project settings” erra: o cache dura cerca de 24 horas e não é configurável por projeto. “The dashboard user needs the BigQuery Admin role to use the cache” erra: o cache não depende de papel de administrador. “Cached results require a destination table; add one to the query” erra: usar tabela de destino também desabilita o cache, é o oposto do necessário."
  },
  {
   "id": "d17q10",
   "s": 4,
   "t": "4.3",
   "e": "A company stores customer data in a BigQuery dataset in the EU multi-region. An analyst tries to join it with a Google public dataset hosted in the US multi-region in a single query and gets a location error. What is the best way to proceed?",
   "o": [
    "Use a legacy SQL query, which ignores locations",
    "Grant the analyst BigQuery Admin on the public project",
    "Create the working dataset in the US multi-region if policy allows, or copy the needed public tables into an EU dataset, then run the join",
    "Set the query job location to Asia to match both datasets"
   ],
   "c": [
    2
   ],
   "x": "A opção “Create the working dataset in the US multi-region if policy allows, or copy the needed…” está certa: uma consulta só pode referenciar dados na mesma localização, então é preciso trazer os dados para a mesma localização (respeitando a política de residência de dados) ou copiar as tabelas públicas necessárias para o dataset na UE. “Use a legacy SQL query, which ignores locations” erra: o SQL legado também respeita localização. “Grant the analyst BigQuery Admin on the public project” erra: permissão não resolve incompatibilidade de localização. “Set the query job location to Asia to match both datasets” erra: definir uma terceira localização não faz os dados existirem nela."
  }
 ],
 "lab": {
  "t": "Authorized view sobre um dataset público copiado",
  "antes": "Use o **Cloud Shell**: o ícone de terminal no canto superior direito do console do Google Cloud. Ele já traz `gcloud` e `bq`. Antes de começar, confirme o projeto com `gcloud config get-value project` e veja se ele tem faturamento (billing) vinculado. Você precisa ser proprietário ou editor do projeto para criar datasets e uma conta de serviço. Na tela, o painel Explorer do BigQuery, à esquerda, vai listar os datasets criados; a mensagem 'Dataset successfully created' indica sucesso. Se o Cloud Shell pedir autorização, clique em Authorize. No passo de teste, o erro Access Denied ao ler a tabela de origem é o resultado ESPERADO, não uma falha.",
  "erros": [
   {
    "s": "Access Denied ao consultar a view com a conta de teste, mesmo depois de criá-la",
    "c": "A view ainda não foi autorizada no dataset de origem, ou a conta de teste não tem jobUser no projeto nem dataViewer em cp_views.",
    "r": "1) Rode bq show --format=prettyjson no dataset cp_fonte e procure a view em access. 2) Se faltar, refaça o passo 4. 3) Confira os dois papéis da conta de teste e espere 1 a 2 minutos."
   },
   {
    "s": "Not found: Dataset ... was not found in location US",
    "c": "Variável PROJ vazia ou datasets criados em localização diferente da tabela pública (que está nos EUA).",
    "r": "1) Rode echo $PROJ e defina o projeto se estiver vazio. 2) Crie os datasets com --location=US. 3) Se criou em outro lugar, apague e recrie."
   },
   {
    "s": "Already Exists: Dataset cp_fonte",
    "c": "Você já executou o passo antes.",
    "r": "Use o dataset existente e siga em frente, ou rode a limpeza do final e comece de novo."
   },
   {
    "s": "Permission denied ao criar a conta de serviço ou API not enabled",
    "c": "A API de IAM não está habilitada ou você não tem papel de administrador de contas de serviço.",
    "r": "1) Rode gcloud services enable iam.googleapis.com. 2) Peça o papel Service Account Admin a quem administra o projeto. 3) Alternativa: use uma segunda conta Google sua no lugar da conta de serviço."
   },
   {
    "s": "Permission iam.serviceAccounts.getAccessToken denied ao usar impersonate",
    "c": "Falta o papel Service Account Token Creator para o seu usuário, ou a permissão ainda não propagou.",
    "r": "1) Refaça o último comando do passo 5 com o seu e-mail correto. 2) Espere 1 a 2 minutos. 3) Tente de novo."
   }
  ],
  "tempo": "25 a 35 minutos",
  "custo": "US$ 0 no nível gratuito: a cópia usa uma tabela pública de poucas centenas de MB (dentro de 10 GiB de armazenamento e 1 TiB de consultas gratuitos por mês). A listagem do Analytics Hub é só leitura, sem custo.",
  "porque": "Praticar o desenho de acesso mais cobrado em prova: o consumidor lê um recorte sem ter acesso à tabela base, e ver na prática o erro de acesso negado quando a view não está autorizada.",
  "passos": [
   {
    "t": "Defina variáveis e crie os dois datasets",
    "cmd": "export PROJ=$(gcloud config get-value project)\nbq --location=US mk -d ${PROJ}:cp_fonte\nbq --location=US mk -d ${PROJ}:cp_views",
    "p": "cp_fonte guarda a tabela base; cp_views guarda a view. Separar datasets é o que permite dar acesso à view sem dar acesso à origem. Os dois precisam estar na mesma localização (US)."
   },
   {
    "t": "Copie uma tabela pública pequena para a origem",
    "cmd": "bq query --use_legacy_sql=false --destination_table=${PROJ}:cp_fonte.nomes 'SELECT * FROM `bigquery-public-data.usa_names.usa_1910_2013`'",
    "p": "Cria a tabela base com as colunas state, gender, year, name, number. Consultar dataset público conta para a cota gratuita; confira o tamanho no dry run antes (flag --dry_run)."
   },
   {
    "t": "Crie a view agregada, sem a coluna name",
    "cmd": "bq mk --use_legacy_sql=false --view 'SELECT state, year, SUM(number) AS total FROM `'${PROJ}'.cp_fonte.nomes` GROUP BY state, year' ${PROJ}:cp_views.total_por_estado",
    "p": "A view esconde name e agrega. Neste momento ela ainda não está autorizada: quem não tiver acesso à origem receberá erro."
   },
   {
    "t": "Autorize a view no dataset de origem",
    "cmd": "bq show --format=prettyjson ${PROJ}:cp_fonte > fonte.json\n# edite fonte.json e acrescente em access: {\"view\": {\"projectId\": \"SEU_PROJETO\", \"datasetId\": \"cp_views\", \"tableId\": \"total_por_estado\"}}\nbq update --source fonte.json ${PROJ}:cp_fonte",
    "p": "Isso é a autorização: o dataset de origem passa a aceitar leituras vindas daquela view. Alternativa no console: dataset cp_fonte, Sharing, Authorize Views."
   },
   {
    "t": "Crie uma conta de teste e dê acesso só ao dataset da view",
    "cmd": "gcloud iam service-accounts create cp-leitor\nSA=cp-leitor@${PROJ}.iam.gserviceaccount.com\ngcloud projects add-iam-policy-binding ${PROJ} --member=serviceAccount:${SA} --role=roles/bigquery.jobUser\nbq add-iam-policy-binding --member=serviceAccount:${SA} --role=roles/bigquery.dataViewer ${PROJ}:cp_views\ngcloud iam service-accounts add-iam-policy-binding ${SA} --member=user:SEU_EMAIL --role=roles/iam.serviceAccountTokenCreator",
    "p": "Simula outra pessoa: ela pode executar jobs e ler cp_views, mas não tem papel algum em cp_fonte. Se preferir, use uma segunda conta Google real no lugar da service account."
   },
   {
    "t": "Teste com a conta de teste",
    "cmd": "bq --impersonate_service_account=${SA} query --use_legacy_sql=false 'SELECT * FROM `'${PROJ}'.cp_views.total_por_estado` LIMIT 5'\nbq --impersonate_service_account=${SA} query --use_legacy_sql=false 'SELECT * FROM `'${PROJ}'.cp_fonte.nomes` LIMIT 5'",
    "p": "A primeira consulta deve funcionar (view autorizada). A segunda deve falhar com Access Denied (sem acesso à origem). Se a primeira falhar, confira a autorização do passo 4."
   },
   {
    "t": "Leia o fluxo do Analytics Hub (sem criar nada)",
    "p": "No console, abra BigQuery, Analytics Hub, e navegue por Search listings. Veja uma listing pública: observe que a assinatura cria um linked dataset somente leitura no seu projeto. Anote quem paga armazenamento (publisher) e quem paga consulta (subscriber)."
   }
  ],
  "limpar": [
   "bq rm -r -f -d ${PROJ}:cp_views",
   "bq rm -r -f -d ${PROJ}:cp_fonte",
   "gcloud iam service-accounts delete cp-leitor@${PROJ}.iam.gserviceaccount.com --quiet",
   "rm fonte.json",
   "Se assinou alguma listing no Analytics Hub, remova o linked dataset criado."
  ],
  "verificar": "A consulta na view retorna linhas pela conta de teste, enquanto a consulta direta na tabela cp_fonte.nomes retorna Access Denied. Isso prova que a view está autorizada e que o consumidor não tem acesso à origem."
 }
};
  C.dias[18] = {
 "aula": {
  "titulo": "IA e ML nos dados",
  "simples": {
   "analogia": "Imagine uma biblioteca enorme. Para treinar um aluno, o jeito caro é carregar todos os livros para outra cidade. O **BigQuery ML** faz o contrário: o aluno vem estudar dentro da biblioteca, e você fala com ele na língua que já conhece, o SQL. Um **modelo** é um aluno que aprendeu com exemplos antigos para adivinhar casos novos, por exemplo se um cliente vai cancelar. Para saber se ele aprendeu, você aplica uma **prova com questões que ele nunca viu** (dados de teste). Se o aluno recebeu o gabarito por engano, isso é **vazamento**: ele tira 10 na prova e erra na vida real. Já os **embeddings** são como colocar cada texto num mapa: frases com sentido parecido ficam vizinhas, mesmo com palavras diferentes. Limite da analogia: o modelo não entende como uma pessoa; ele encontra padrões nos exemplos que recebeu.",
   "pontos": [
    "**BigQuery ML** treina e prevê com SQL, sem tirar os dados do BigQuery.",
    "Escolha o tipo de modelo pelo problema: número, classe, grupo, série no tempo.",
    "Avalie sempre em dados que o modelo não viu durante o treino.",
    "Métrica boa demais na avaliação e ruim em produção sugere **vazamento**.",
    "**Embeddings** viram texto em números; busca vetorial acha textos de sentido parecido.",
    "**RAG** faz o LLM responder com base nos seus documentos, sem re-treinar."
   ],
   "paraQueServe": "Você usa isso quando quer prever algo com dados que já estão no BigQuery, buscar documentos por significado ou colocar um LLM para responder com base nos dados da empresa."
  },
  "glossario": [
   {
    "t": "Modelo de ML (machine learning)",
    "d": "Programa que aprende padrões a partir de exemplos, em vez de seguir regras escritas à mão. Depois usa o que aprendeu para prever casos novos."
   },
   {
    "t": "Feature e rótulo (label)",
    "d": "Feature é uma coluna de entrada do modelo. Rótulo é a resposta que você quer prever. Ex.: tempo de uso e chamadas ao suporte (features) para prever cancelou sim ou não (rótulo)."
   },
   {
    "t": "Treino, validação e teste",
    "d": "Você separa os dados: uma parte para o modelo aprender e outra, que ele nunca viu, para medir se aprendeu de verdade."
   },
   {
    "t": "Vazamento de dados (data leakage)",
    "d": "Usar no treino uma informação que não existiria na hora de prever, ou que entrega a resposta. A nota fica ótima na avaliação e péssima na vida real."
   },
   {
    "t": "Desbalanceamento",
    "d": "Quando uma classe é muito rara. Se só 1 em 200 transações é fraude, um modelo que sempre diz não fraude acerta 99,5% e é inútil."
   },
   {
    "t": "Embedding",
    "d": "Lista de números que representa o significado de um texto. Textos parecidos geram listas próximas."
   },
   {
    "t": "Busca vetorial (VECTOR_SEARCH)",
    "d": "Procura os textos cujos embeddings estão mais perto do da sua pergunta, ou seja, os de sentido mais parecido."
   },
   {
    "t": "LLM (large language model)",
    "d": "Modelo de linguagem grande, como o Gemini, que gera texto. Não conhece seus dados privados nem os recentes, a menos que você os entregue na pergunta."
   },
   {
    "t": "RAG (retrieval-augmented generation)",
    "d": "Primeiro busca os trechos relevantes dos seus documentos; depois entrega esses trechos ao LLM para ele responder com base neles."
   },
   {
    "t": "Vertex AI",
    "d": "Plataforma gerenciada de IA do Google Cloud, para modelos sob medida, GPUs, serving online e pipelines de ML."
   }
  ],
  "checagem": [
   "Sem olhar: quando você usa BigQuery ML e quando precisa do Vertex AI?",
   "O que é vazamento de dados e qual sintoma ele costuma dar?",
   "Por que acurácia alta não basta quando só 1 em 200 casos é fraude?",
   "Explique o fluxo de um RAG em poucas frases e diga por que ele é melhor que re-treinar o LLM."
  ],
  "resumo": "BigQuery ML, preparação de dados para ML, visão geral do Vertex AI e IA generativa dentro do BigQuery: embeddings, busca vetorial, RAG e geração de SQL por LLM, sempre com o foco no que a prova pergunta e nos riscos.",
  "blocos": [
   {
    "t": "Ideia central: levar o modelo aos dados",
    "facil": "Traduzindo: em vez de levar os dados até o modelo, você leva o modelo até os dados. O BigQuery ML treina e prevê com SQL, dentro do próprio BigQuery.",
    "p": [
     "Mover dados do warehouse para treinar um modelo custa tempo, dinheiro e cria cópias sem governança. O BigQuery ML (BQML) inverte a lógica: você treina, avalia e prevê com SQL, dentro do BigQuery, onde os dados já estão. Isso serve a quem domina SQL (engenharia de dados, analistas) e a casos de tabela estruturada. Quando o problema exige arquitetura sob medida, treino distribuído com GPU ou serving online de baixa latência, entra o Vertex AI, e o BigQuery continua como origem de dados e destino de previsões.",
     "Para a prova, o raciocínio é: SQL e dados tabulares dentro do warehouse, BQML; modelo customizado ou pipeline completo de MLOps, Vertex AI; busca por significado e RAG sobre texto, embeddings mais VECTOR_SEARCH no BigQuery. Tenha cuidado com a edição: segundo a tabela de edições, BigQuery ML não está disponível na Standard (confira a tabela para capacity pricing; no modelo sob demanda os recursos são os do on-demand)."
    ]
   },
   {
    "t": "BigQuery ML: modelos, TRANSFORM, avaliação e previsão",
    "facil": "Traduzindo: escolha o tipo de modelo conforme o problema: prever número, classificar, agrupar ou prever série no tempo. Depois avalie e só então use para prever.",
    "p": [
     "CREATE MODEL nome OPTIONS(model_type='...', input_label_cols=['coluna']) AS SELECT ... treina o modelo. Tipos treinados no BigQuery: regressão linear (LINEAR_REG), regressão logística (LOGISTIC_REG, classificação binária e multiclasse), k-means (KMEANS, agrupamento sem rótulo), boosted trees e random forest (classificação e regressão, tabular), DNN, wide and deep, autoencoder, ARIMA_PLUS (séries temporais com sazonalidade, feriados e detecção de anomalias), matrix factorization (recomendação) e PCA. AutoML também é acessível via BQML. Se você não sabe qual escolher: tabular de partida, regressão linear ou logística como baseline e boosted trees para mais acurácia.",
     "A cláusula TRANSFORM guarda o pré-processamento dentro do modelo (ex.: ML.STANDARD_SCALER, ML.QUANTILE_BUCKETIZE, ML.FEATURE_CROSS, funções SQL comuns). Na hora de ML.PREDICT você passa as colunas brutas e a mesma transformação é aplicada automaticamente, o que evita o desvio entre treino e previsão (training-serving skew). Strings viram one-hot automaticamente em vários modelos.",
     "Funções: ML.EVALUATE retorna métricas (precisão, recall, acurácia, ROC AUC para classificação; erro médio, R2 para regressão) sobre dados de avaliação; ML.PREDICT gera previsões; ML.FORECAST gera previsão para ARIMA_PLUS; ML.FEATURE_IMPORTANCE e ML.EXPLAIN_PREDICT dão explicabilidade; ML.CONFUSION_MATRIX e ML.ROC_CURVE ajudam a escolher o limiar; ML.RECOMMEND serve matrix factorization; ML.DETECT_ANOMALIES encontra anomalias.",
     "Modelos importados: você traz um modelo já treinado (TensorFlow SavedModel, ONNX, XGBoost) do Cloud Storage com CREATE MODEL e roda a inferência dentro do BigQuery. Modelos remotos: o BigQuery chama um endpoint hospedado no Vertex AI (modelo customizado ou LLM como o Gemini) por uma conexão, e a inferência acontece fora do BigQuery. Regra de bolso: modelo pequeno que cabe dentro do BigQuery, importado; modelo grande, GPU ou serviço gerenciado, remoto."
    ],
    "tabela": {
     "cab": [
      "Problema",
      "model_type típico"
     ],
     "linhas": [
      [
       "Prever valor numérico (preço, demanda)",
       "LINEAR_REG, BOOSTED_TREE_REGRESSOR"
      ],
      [
       "Classificar (churn, fraude)",
       "LOGISTIC_REG, BOOSTED_TREE_CLASSIFIER, RANDOM_FOREST_CLASSIFIER"
      ],
      [
       "Segmentar clientes sem rótulo",
       "KMEANS"
      ],
      [
       "Previsão de série temporal",
       "ARIMA_PLUS (ML.FORECAST)"
      ],
      [
       "Recomendar itens",
       "MATRIX_FACTORIZATION (ML.RECOMMEND)"
      ],
      [
       "Usar modelo treinado fora",
       "TENSORFLOW, ONNX, XGBOOST (importado) ou modelo remoto em endpoint Vertex AI"
      ]
     ]
    }
   },
   {
    "t": "Preparar dados para ML: features, split, desbalanceamento e vazamento",
    "facil": "Traduzindo: antes de treinar, prepare bem: separe dados de teste, cuide das classes raras e nunca deixe a resposta vazar para dentro das colunas de entrada.",
    "p": [
     "Feature é uma coluna de entrada do modelo. Em SQL você cria features por agregação por entidade (compras nos últimos 30 dias, média por cliente), codificação de categorias, bucketização e cruzamento de colunas. Trate nulos e outliers conscientemente, e mantenha a definição da feature idêntica no treino e na previsão (a razão de existir do TRANSFORM e do Feature Store).",
     "Divisão treino, validação e teste: o modelo deve ser avaliado em dados que não viu. No BQML use DATA_SPLIT_METHOD (RANDOM, SEQ para dados ordenados no tempo, CUSTOM com coluna booleana, AUTO_SPLIT) e DATA_SPLIT_EVAL_FRACTION. Para séries temporais e qualquer problema em que o futuro não deve alimentar o passado, divida por tempo, nunca aleatoriamente.",
     "Desbalanceamento: se 0,5% dos casos são fraude, um modelo que sempre diz 'não fraude' tem 99,5% de acurácia e é inútil. Medidas: pesos de classe (AUTO_CLASS_WEIGHTS=TRUE ou class_weights), reamostragem (subamostrar a classe majoritária ou sobreamostrar a minoritária) e avaliar com precisão, recall, F1 e AUC em vez de acurácia, ajustando o limiar de decisão ao custo do erro.",
     "Vazamento de dados (data leakage): usar no treino informação que não existirá no momento da previsão ou que revela o rótulo, como a coluna 'data de cancelamento' para prever churn, ou estatísticas calculadas com o conjunto inteiro antes do split, ou registros duplicados que caem em treino e teste. Sintoma típico: métrica excelente na avaliação e péssima em produção. Correção: remover a coluna, calcular features só com dados anteriores ao evento e dividir por tempo."
    ],
    "armadilha": "Acurácia alta em dados desbalanceados e métrica quase perfeita demais são dois sinais clássicos: o primeiro pede métricas e pesos adequados; o segundo cheira a vazamento."
   },
   {
    "t": "Vertex AI em visão geral",
    "facil": "Traduzindo: Vertex AI é a plataforma completa de IA do Google. Use quando precisar de modelo sob medida, GPU ou resposta online muito rápida.",
    "p": [
     "Vertex AI (nas documentações mais recentes a plataforma aparece com novos nomes, como Agent Platform; confira o nome vigente) é a plataforma gerenciada de IA do Google Cloud. Para o engenheiro de dados o importante é saber o papel de cada peça: Workbench e notebooks para exploração; treinamento customizado e AutoML para treinar modelos; Model Registry para versionar; Endpoints para serving online e batch prediction para lotes; Pipelines para orquestrar etapas repetíveis de ML (preparar, treinar, avaliar, implantar); Feature Store para guardar features reutilizáveis com consistência entre treino e serving online (usa o BigQuery como armazenamento offline); e acesso aos modelos Gemini e de embeddings.",
     "Critério de escolha: modelos tabulares simples com dados no BigQuery e equipe SQL, BQML. Necessidade de serving online de baixa latência, treino customizado, GPUs, pipelines de MLOps e monitoramento do modelo, Vertex AI. É comum combinar: features em SQL no BigQuery, treino no Vertex AI, previsões em lote gravadas de volta no BigQuery."
    ]
   },
   {
    "t": "IA generativa nos dados: embeddings, busca vetorial e RAG",
    "facil": "Traduzindo: embeddings transformam texto em números que representam significado, e a busca vetorial acha textos parecidos. O RAG usa isso para o LLM responder com base nos seus documentos.",
    "p": [
     "Embedding é um vetor numérico que representa o significado de um texto (ou imagem): textos parecidos geram vetores próximos. No BigQuery você cria um modelo remoto sobre um endpoint de embeddings do Vertex AI, usando uma conexão (CLOUD_RESOURCE) cuja service account precisa do papel de usuário do Vertex AI, e chama ML.GENERATE_EMBEDDING sobre uma tabela ou consulta (a entrada precisa de uma coluna STRING chamada content). A saída é a coluna ml_generate_embedding_result (ARRAY<FLOAT64>), mais colunas de estatísticas e status. A documentação oficial também oferece AI.GENERATE_EMBEDDING, com a mesma função e nomes de colunas de saída simplificados, e recomenda essa função em consultas novas; ML.GENERATE_EMBEDDING não consta como descontinuada. Confira a sintaxe de AI.GENERATE_EMBEDDING na referência dela.",
     "VECTOR_SEARCH recebe uma tabela com a coluna de embeddings, os vetores de consulta, top_k e distance_type (COSINE, EUCLIDEAN, DOT_PRODUCT) e devolve os vizinhos mais próximos. Sem índice, a busca é exata por força bruta (varre tudo). Com índice vetorial (CREATE VECTOR INDEX, tipos IVF ou TREE_AH, que usa a técnica ScaNN) a busca é aproximada (ANN): muito mais rápida em tabelas grandes, trocando um pouco de recall por velocidade. Tabela menor que 10 MB não tem o índice populado (a busca segue exata), e existe um limite por organização para o total de dados indexados: confira o valor na página de cotas do BigQuery. Segundo a tabela de edições, índices de busca e vetoriais não estão disponíveis na Standard.",
     "RAG (retrieval-augmented generation) resolve a limitação de que o LLM não conhece seus dados privados nem os recentes. Fluxo: (1) coletar documentos, incluindo não estruturados em Cloud Storage (PDFs, imagens) que o BigQuery pode referenciar por object tables ou ObjectRef; (2) extrair texto e dividir em pedaços (chunks); (3) gerar embeddings e gravar em tabela, com índice vetorial se for grande; (4) na pergunta, gerar o embedding da pergunta e usar VECTOR_SEARCH para recuperar os top_k pedaços; (5) montar um prompt com a pergunta mais os trechos e chamar o LLM (por exemplo Gemini via modelo remoto) para responder com base neles. RAG é preferível a re-treinar ou ajustar o modelo quando os dados mudam com frequência, e permite citar a fonte.",
     "LLM gerando SQL (text-to-SQL, por exemplo com Gemini): útil, mas arriscado. Riscos: alucinar tabelas e colunas, interpretar errado uma métrica, gerar consulta cara (CROSS JOIN, SELECT * em tabela enorme), vazar dados sensíveis, ou executar escrita ou remoção se a credencial permitir; injeção de prompt também é um risco. Controles: revisão humana antes de executar, execução com identidade de menor privilégio (somente leitura, acesso apenas a authorized views ou datasets liberados), dry run e maximum bytes billed para limitar custo, fornecer o esquema e definições de métricas no contexto, e registrar auditoria."
    ],
    "dica": "Busca por palavra-chave exata (LIKE, função SEARCH com índice de texto) não encontra sinônimos. 'Find similar by meaning' é embeddings mais VECTOR_SEARCH."
   }
  ],
  "exemplo": {
   "t": "Churn, produtos parecidos e SQL por linguagem natural",
   "texto": "Uma operadora quer prever cancelamento. Passo 1, features em SQL: chamadas ao suporte e uso mensal nos últimos 90 dias por cliente. Passo 2, cuidado com vazamento: a coluna motivo_cancelamento só existe depois do evento e é removida; o split é por tempo (treino nos meses antigos, avaliação no mês recente). Passo 3, desbalanceamento: 4% cancelam, então usa AUTO_CLASS_WEIGHTS=TRUE e avalia recall e AUC, não acurácia. Passo 4, CREATE MODEL com BOOSTED_TREE_CLASSIFIER e TRANSFORM com bucketização; ML.EVALUATE confirma; ML.PREDICT gera a probabilidade de cancelamento por cliente direto numa tabela. Em paralelo, o time de e-commerce quer 'produtos parecidos pela descrição': cria modelo remoto de embeddings, gera embeddings de 2 milhões de descrições, cria um índice vetorial (TREE_AH ou IVF) e usa VECTOR_SEARCH com COSINE. Por fim, o diretor quer perguntar em português e receber SQL: o sistema usa Gemini com o esquema no prompt, mas executa com uma service account somente leitura sobre authorized views, com dry run e limite de bytes, e um analista revisa as consultas novas."
  },
  "prova": [
   "'Analysts who know SQL', 'data already in BigQuery', 'avoid moving data' apontam para BigQuery ML; 'custom training', 'GPU', 'online low-latency serving', 'ML pipelines' apontam para Vertex AI.",
   "'Same preprocessing at prediction' aponta TRANSFORM; 'imbalanced classes' aponta class weights e métricas de precisão e recall; 'model performs great in evaluation and poorly in production' aponta vazamento.",
   "'Semantic similarity', 'search by meaning', 'recommend similar items' apontam para ML.GENERATE_EMBEDDING e VECTOR_SEARCH; 'millions of vectors, low latency' aponta índice vetorial (busca aproximada).",
   "'Answers grounded in company documents' ou 'LLM does not know private data' apontam para RAG, não para re-treinar o modelo.",
   "'LLM generates SQL' vem com riscos: a resposta certa inclui revisão humana, menor privilégio e controle de custo."
  ],
  "explique": "Explique o fluxo completo de um RAG sobre PDFs guardados no Cloud Storage usando o BigQuery, da ingestão à resposta, e diga por que ele é melhor que re-treinar o LLM quando os documentos mudam toda semana."
 },
 "cartoes": [
  {
   "id": "d18c1",
   "t": "4.2",
   "f": "Quando escolher BigQuery ML em vez do Vertex AI?",
   "v": "Dados tabulares já no BigQuery e equipe SQL: treino, avaliação e previsão sem mover dados. Vertex AI quando há treino customizado, GPU, serving online de baixa latência ou pipelines de MLOps."
  },
  {
   "id": "d18c2",
   "t": "4.2",
   "f": "Que tipos de modelo o BQML treina?",
   "v": "Linear e logística, k-means, boosted trees e random forest, DNN e wide and deep, autoencoder, ARIMA_PLUS (séries temporais), matrix factorization (recomendação), PCA e AutoML."
  },
  {
   "id": "d18c3",
   "t": "4.2",
   "f": "Para que serve a cláusula TRANSFORM do CREATE MODEL?",
   "v": "Guarda o pré-processamento dentro do modelo. No ML.PREDICT passa-se a coluna bruta e a mesma transformação é aplicada, evitando desvio entre treino e previsão."
  },
  {
   "id": "d18c4",
   "t": "4.2",
   "f": "O que ML.EVALUATE e ML.PREDICT retornam?",
   "v": "ML.EVALUATE: métricas do modelo (precisão, recall, AUC, erro, R2) sobre dados de avaliação. ML.PREDICT: as previsões para novos dados. Para ARIMA_PLUS usa-se ML.FORECAST."
  },
  {
   "id": "d18c5",
   "t": "4.2",
   "f": "Modelo importado versus modelo remoto no BigQuery ML?",
   "v": "Importado: modelo treinado fora (TensorFlow, ONNX, XGBoost) do Cloud Storage, inferência dentro do BigQuery. Remoto: chama endpoint no Vertex AI por conexão, inferência fora do BigQuery (modelos grandes, LLMs)."
  },
  {
   "id": "d18c6",
   "t": "4.2",
   "f": "Qual o problema de usar acurácia com classes muito desbalanceadas, e o que fazer?",
   "v": "Um modelo que sempre prevê a classe majoritária tem acurácia altíssima e é inútil. Use pesos de classe (AUTO_CLASS_WEIGHTS), reamostragem e avalie precisão, recall, F1 e AUC."
  },
  {
   "id": "d18c7",
   "t": "4.2",
   "f": "O que é vazamento de dados (data leakage) em ML e qual o sintoma?",
   "v": "Usar no treino informação indisponível na previsão ou que revela o rótulo (ex.: data de cancelamento para prever churn). Sintoma: métrica ótima na avaliação e ruim em produção."
  },
  {
   "id": "d18c8",
   "t": "4.2",
   "f": "Quando dividir treino e teste por tempo em vez de aleatoriamente?",
   "v": "Em séries temporais e sempre que o futuro não pode influenciar o passado. No BQML, DATA_SPLIT_METHOD='SEQ' ou CUSTOM com coluna de divisão."
  },
  {
   "id": "d18c9",
   "t": "4.2",
   "f": "O que é um embedding e como gerar no BigQuery?",
   "v": "Vetor numérico que representa o significado do conteúdo; itens parecidos ficam próximos. Cria-se um modelo remoto sobre endpoint de embeddings do Vertex AI via conexão e chama-se ML.GENERATE_EMBEDDING."
  },
  {
   "id": "d18c10",
   "t": "4.2",
   "f": "Qual a diferença entre VECTOR_SEARCH com e sem índice vetorial?",
   "v": "Sem índice: busca exata por força bruta. Com índice (IVF ou TREE_AH): busca aproximada (ANN), muito mais rápida em tabelas grandes, trocando um pouco de recall."
  },
  {
   "id": "d18c11",
   "t": "4.2",
   "f": "Quais distance_type o VECTOR_SEARCH aceita?",
   "v": "COSINE, EUCLIDEAN e DOT_PRODUCT. O tipo usado no índice deve combinar com o da busca para aproveitar o índice."
  },
  {
   "id": "d18c12",
   "t": "4.2",
   "f": "Descreva os passos do RAG com BigQuery.",
   "v": "Extrair texto e dividir em chunks; gerar embeddings e gravar em tabela (com índice se grande); embedar a pergunta e recuperar top_k com VECTOR_SEARCH; montar prompt com os trechos e chamar o LLM."
  },
  {
   "id": "d18c13",
   "t": "4.2",
   "f": "Por que RAG em vez de re-treinar ou ajustar um LLM com os documentos da empresa?",
   "v": "Os dados mudam: no RAG basta reindexar os novos pedaços. Também reduz alucinação ao ancorar a resposta em trechos e permite citar a fonte, a custo menor."
  },
  {
   "id": "d18c14",
   "t": "4.2",
   "f": "Quais os riscos de usar um LLM para gerar SQL e como mitigar?",
   "v": "Riscos: tabelas ou colunas inventadas, métrica errada, consulta cara, vazamento ou escrita indevida. Mitigação: revisão humana, menor privilégio (somente leitura, authorized views), dry run e maximum bytes billed, esquema no prompt."
  },
  {
   "id": "d18c15",
   "t": "4.2",
   "f": "Qual o papel do Feature Store e do Vertex AI Pipelines?",
   "v": "Feature Store guarda features reutilizáveis com consistência entre treino e serving online (offline no BigQuery). Pipelines orquestram etapas repetíveis de ML: preparar, treinar, avaliar, implantar."
  }
 ],
 "questoes": [
  {
   "id": "d18q1",
   "s": 4,
   "t": "4.2",
   "e": "A retail analytics team knows SQL well but has no ML engineers. Customer purchase history is already in BigQuery and they want to build a churn classifier and score customers daily, without exporting data or managing infrastructure. Which approach should they choose?",
   "o": [
    "Export the data to Cloud Storage and train a custom TensorFlow model on a GPU cluster",
    "Use BigQuery ML with CREATE MODEL (for example a logistic regression or boosted tree classifier) and ML.PREDICT on a schedule",
    "Load the data into Cloud SQL and run a stored procedure for scoring",
    "Build a Dataflow pipeline that implements gradient boosting in Beam"
   ],
   "c": [
    1
   ],
   "x": "A opção “Use BigQuery ML with CREATE MODEL (for example a logistic regression or boosted tree…” está certa: BQML treina e prevê com SQL dentro do BigQuery, sem mover dados nem gerenciar infraestrutura, e ML.PREDICT pode rodar em consulta agendada. “Export the data to Cloud Storage and train a custom TensorFlow model on a GPU cluster” erra: exige exportar dados, engenharia de ML e infraestrutura de GPU, desnecessários para dados tabulares. “Load the data into Cloud SQL and run a stored procedure for scoring” erra: Cloud SQL não é plataforma de ML e obriga a mover os dados. “Build a Dataflow pipeline that implements gradient boosting in Beam” erra: implementar o algoritmo no Beam é complexo e não gerenciado; o BQML já oferece o modelo pronto."
  },
  {
   "id": "d18q2",
   "s": 4,
   "t": "4.2",
   "e": "A data engineer trains a BigQuery ML model using bucketized and scaled features computed in the training query. Later, analysts call ML.PREDICT with raw columns and the predictions are wrong because the raw values were not preprocessed. How should the model be created to avoid this?",
   "o": [
    "Use the TRANSFORM clause in CREATE MODEL so preprocessing is stored in the model and applied automatically at prediction",
    "Ask every analyst to repeat the preprocessing SQL manually before each prediction",
    "Train the model with fewer features",
    "Export the model weights and apply them in a spreadsheet"
   ],
   "c": [
    0
   ],
   "x": "A opção “Use the TRANSFORM clause in CREATE MODEL so preprocessing is stored in the model…” está certa: com TRANSFORM, o pré-processamento fica dentro do modelo e ML.PREDICT aplica as mesmas transformações às colunas brutas, evitando o desvio entre treino e previsão. “Ask every analyst to repeat the preprocessing SQL manually before each prediction” erra: repetir manualmente é frágil e é a causa do erro. “Train the model with fewer features” erra: menos features não resolve a inconsistência de pré-processamento. “Export the model weights and apply them in a spreadsheet” erra: exportar pesos para planilha é impraticável e continua sem aplicar o pré-processamento."
  },
  {
   "id": "d18q3",
   "s": 4,
   "t": "4.2",
   "e": "A bank builds a fraud classifier where only 0.4% of transactions are fraud. The first model shows 99.6% accuracy but misses most fraud cases. Choose two.",
   "o": [
    "Set class weights (for example AUTO_CLASS_WEIGHTS=TRUE) or resample the training data",
    "Evaluate with precision, recall, F1 or AUC and tune the decision threshold",
    "Report accuracy only, because it is already very high",
    "Evaluate the model on the training data to get stable metrics",
    "Remove the label column to reduce bias"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Set class weights (for example AUTO_CLASS_WEIGHTS=TRUE) or resample the training data” e “Evaluate with precision, recall, F1 or AUC and tune the decision threshold” estão corretas: pesos de classe ou reamostragem fazem o modelo dar importância à classe rara, e métricas como precisão, recall, F1 e AUC com ajuste de limiar mostram o desempenho real nos casos de fraude. “Report accuracy only, because it is already very high” erra: a acurácia é enganosa, pois um modelo que nunca prevê fraude já tem 99,6%. “Evaluate the model on the training data to get stable metrics” erra: avaliar no treino esconde o sobreajuste. “Remove the label column to reduce bias” erra: remover o rótulo impede o aprendizado supervisionado."
  },
  {
   "id": "d18q4",
   "s": 4,
   "t": "4.2",
   "e": "A churn model shows 99% AUC during evaluation but performs poorly in production. A review shows one feature, days_since_cancellation_request, which is populated only for customers who already asked to cancel. What is the root cause and fix?",
   "o": [
    "Underfitting; use a simpler model",
    "Data leakage; remove features not available at prediction time and split data by time",
    "Too many training rows; sample fewer rows",
    "Missing regularization; increase the learning rate"
   ],
   "c": [
    1
   ],
   "x": "A opção “Data leakage; remove features not available at prediction time and split data by time” está certa: a feature só existe depois do evento que se quer prever, o que revela o rótulo (vazamento), explicando a métrica irreal; deve-se remover a coluna e construir features só com dados anteriores ao momento da previsão, dividindo por tempo. “Underfitting; use a simpler model” erra: o sintoma é métrica altíssima, não subajuste. “Too many training rows; sample fewer rows” erra: mais ou menos linhas não corrige uma coluna que contém a resposta. “Missing regularization; increase the learning rate” erra: aumentar a taxa de aprendizado não afeta o vazamento."
  },
  {
   "id": "d18q5",
   "s": 4,
   "t": "4.2",
   "e": "A utility company stores three years of daily energy consumption per region in BigQuery. It wants a next-30-days forecast that accounts for weekly and yearly seasonality, using SQL only. Which option is most appropriate?",
   "o": [
    "A BigQuery ML k-means model",
    "A BigQuery ML matrix factorization model",
    "A BigQuery ML ARIMA_PLUS model with ML.FORECAST",
    "A logistic regression model on the date column"
   ],
   "c": [
    2
   ],
   "x": "A opção “A BigQuery ML ARIMA_PLUS model with ML.FORECAST” está certa: ARIMA_PLUS é o modelo de séries temporais do BQML, trata sazonalidade e feriados, e ML.FORECAST gera a previsão. “A BigQuery ML k-means model” erra: k-means agrupa sem rótulo, não prevê séries. “A BigQuery ML matrix factorization model” erra: matrix factorization serve para recomendação a partir de interações usuário-item. “A logistic regression model on the date column” erra: regressão logística é classificação e não modela sazonalidade temporal."
  },
  {
   "id": "d18q6",
   "s": 4,
   "t": "4.2",
   "e": "A data science team hosts a large custom model on a Vertex AI endpoint with GPUs. The analytics team wants to score rows stored in BigQuery with that model using SQL, without exporting data to files. What should they use?",
   "o": [
    "Import the model into BigQuery ML as a TensorFlow SavedModel regardless of its size",
    "Create a BigQuery ML remote model that references the Vertex AI endpoint through a connection and call ML.PREDICT",
    "Copy the data to Bigtable and call the endpoint from the application",
    "Export the table to CSV and send it to the endpoint manually"
   ],
   "c": [
    1
   ],
   "x": "A opção “Create a BigQuery ML remote model that references the Vertex AI endpoint through…” está certa: o modelo remoto aponta para o endpoint do Vertex AI por uma conexão, e a inferência é feita lá (com GPU) enquanto o SQL permanece no BigQuery. “Import the model into BigQuery ML as a TensorFlow SavedModel regardless of its size” erra: importar exige modelo compatível e pequeno o bastante para rodar dentro do BigQuery, e perderia a GPU do endpoint. “Copy the data to Bigtable and call the endpoint from the application” erra: move dados e exige código de aplicação. “Export the table to CSV and send it to the endpoint manually” erra: exportar CSV e envio manual não é uma solução escalável nem automatizada."
  },
  {
   "id": "d18q7",
   "s": 4,
   "t": "4.2",
   "e": "An e-commerce company has 3 million product descriptions in BigQuery and wants a feature that returns the 10 products most similar in meaning to a shopper's free-text query, with low latency. Which design is most appropriate?",
   "o": [
    "Use LIKE '%query%' filters on the description column",
    "Generate embeddings with ML.GENERATE_EMBEDDING, create a vector index, and use VECTOR_SEARCH with top_k of 10",
    "Export descriptions to CSV and sort them alphabetically",
    "Train a k-means model on product price"
   ],
   "c": [
    1
   ],
   "x": "A opção “Generate embeddings with ML.GENERATE_EMBEDDING, create a vector index, and use…” está certa: embeddings capturam significado, o índice vetorial dá busca aproximada rápida em milhões de vetores e VECTOR_SEARCH devolve os 10 mais próximos. “Use LIKE '%query%' filters on the description column” erra: LIKE é correspondência literal de texto, não encontra sinônimos nem semelhança de significado. “Export descriptions to CSV and sort them alphabetically” erra: ordenar alfabeticamente não tem relação com semelhança. “Train a k-means model on product price” erra: k-means por preço agrupa por valor e não por descrição."
  },
  {
   "id": "d18q8",
   "s": 4,
   "t": "4.2",
   "e": "A company wants a chatbot that answers questions using thousands of internal policy PDFs stored in Cloud Storage. The PDFs change every week and answers must be grounded in the current documents. The data lives in BigQuery and Cloud Storage. Choose two steps that belong to the solution.",
   "o": [
    "Split the extracted text into chunks, generate embeddings for them, and store them in a BigQuery table (with a vector index if large)",
    "At question time, embed the question, retrieve the nearest chunks with VECTOR_SEARCH, and include them in the prompt sent to the LLM",
    "Fine-tune the LLM from scratch every time a PDF changes",
    "Place all the PDFs in every prompt",
    "Disable embeddings and search only by file name"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Split the extracted text into chunks, generate embeddings for them, and store them…” e “At question time, embed the question, retrieve the nearest chunks with VECTOR_SEARCH,…” estão corretas: são as etapas centrais do RAG: indexar os documentos como embeddings e, na pergunta, recuperar os trechos mais próximos e colocá-los no prompt para ancorar a resposta; atualizar os documentos significa apenas reindexar. “Fine-tune the LLM from scratch every time a PDF changes” erra: ajustar o LLM a cada semana é caro e lento e não garante respostas atuais. “Place all the PDFs in every prompt” erra: milhares de PDFs não cabem na janela de contexto e seriam muito caros. “Disable embeddings and search only by file name” erra: o nome do arquivo não representa o conteúdo."
  },
  {
   "id": "d18q9",
   "s": 4,
   "t": "4.2",
   "e": "A company lets business users ask questions in natural language and uses a Gemini model to generate BigQuery SQL that is executed automatically. The security team is worried about wrong results, large bills and data exposure. Which design best reduces the risk?",
   "o": [
    "Run the generated SQL with a read-only identity limited to authorized views, enforce dry run and maximum bytes billed, and have a human review new queries",
    "Give the service account BigQuery Admin so the model can fix its own errors",
    "Disable audit logs to reduce cost",
    "Allow the model to choose any dataset in the organization for better answers"
   ],
   "c": [
    0
   ],
   "x": "A opção “Run the generated SQL with a read-only identity limited to authorized views, enforce dry…” está certa: menor privilégio e views autorizadas limitam o que pode ser lido, dry run e bytes máximos limitam custo, e a revisão humana reduz o risco de métricas erradas ou alucinadas. “Give the service account BigQuery Admin so the model can fix its own errors” erra: Admin permite escrita e remoção e amplia o dano de uma consulta errada ou de injeção de prompt. “Disable audit logs to reduce cost” erra: desligar auditoria remove a rastreabilidade. “Allow the model to choose any dataset in the organization for better answers” erra: acesso amplo aumenta a exposição de dados."
  },
  {
   "id": "d18q10",
   "s": 4,
   "t": "4.2",
   "e": "A machine learning team trains models on features computed in BigQuery. In production, a recommendation service needs the same features at low latency, and the team wants consistent feature definitions between training and online serving plus a repeatable retraining workflow. Which combination fits best?",
   "o": [
    "Vertex AI Feature Store for feature serving and Vertex AI Pipelines for the retraining workflow",
    "BigQuery scheduled queries only, with the application querying BigQuery on every request",
    "Cloud Storage CSV files read by the application at startup",
    "A Cloud SQL replica of the BigQuery tables"
   ],
   "c": [
    0
   ],
   "x": "A opção “Vertex AI Feature Store for feature serving and Vertex AI Pipelines for the retraining…” está certa: o Feature Store serve features online com baixa latência e mantém a consistência entre treino e serving (com o BigQuery como armazenamento offline), e o Vertex AI Pipelines orquestra o retreinamento repetível. “BigQuery scheduled queries only, with the application querying BigQuery on every request” erra: consultar o BigQuery a cada requisição não entrega a latência de serving online e não garante consistência. “Cloud Storage CSV files read by the application at startup” erra: arquivos CSV não são versionados nem servem features frescas em baixa latência. “A Cloud SQL replica of the BigQuery tables” erra: Cloud SQL replicado cria cópia sem gestão de features e sem orquestração de ML."
  }
 ],
 "lab": {
  "t": "Classificador no BigQuery ML com dataset público e busca vetorial opcional",
  "antes": "Use o **Cloud Shell** (ícone de terminal no canto superior direito do console). Confirme o projeto com `gcloud config get-value project` e veja se o faturamento está vinculado. Toda a parte principal roda em `bq query`; os resultados aparecem como tabelas de texto no terminal. A parte opcional exige ativar a API do Vertex AI e criar uma **conexão**, e custa poucos centavos: só faça se quiser. Na tela, o Explorer do BigQuery mostrará o dataset cp_ml e o modelo pinguim com ícone de modelo. Mensagens como 'Created model' indicam sucesso. Todos os recursos precisam estar na localização US.",
  "erros": [
   {
    "s": "Cannot read and write in different locations ou Not found: Dataset in location",
    "c": "O dataset cp_ml foi criado fora de US, mas a tabela pública penguins está nos EUA.",
    "r": "1) Apague o dataset com bq rm -r -f -d. 2) Recrie com bq --location=US mk -d. 3) Rode o treino de novo."
   },
   {
    "s": "Access Denied: User does not have bigquery.models.create ou bigquery.jobs.create",
    "c": "Seu usuário não tem papel suficiente no projeto, ou o projeto errado está ativo.",
    "r": "1) Rode gcloud config get-value project. 2) Peça o papel BigQuery User ou Admin a quem administra o projeto. 3) Tente de novo."
   },
   {
    "s": "Vertex AI API has not been used in project ou SERVICE_DISABLED",
    "c": "A API de IA não foi habilitada, ou o faturamento não está vinculado ao projeto.",
    "r": "1) Rode gcloud services enable aiplatform.googleapis.com bigqueryconnection.googleapis.com. 2) Se pedir faturamento, vincule uma conta de billing (precisa do papel de administrador de faturamento). 3) Espere 1 a 2 minutos."
   },
   {
    "s": "Permission denied ao criar o modelo remoto (aiplatform.endpoints.predict ou conexão sem acesso)",
    "c": "A conta de serviço da conexão não recebeu o papel aiplatform.user, você copiou o ID errado, ou a permissão ainda não propagou.",
    "r": "1) Rode bq show --connection e copie o serviceAccountId correto. 2) Refaça o add-iam-policy-binding. 3) Espere alguns minutos e repita o CREATE MODEL."
   },
   {
    "s": "Not found: Model ou Endpoint text-embedding-005 not found",
    "c": "O nome do endpoint de embeddings mudou ou não existe na sua localização.",
    "r": "1) Consulte na documentação do BigQuery o nome vigente do endpoint de embeddings. 2) Troque o valor em ENDPOINT. 3) Confirme que a conexão está em US."
   }
  ],
  "tempo": "30 a 45 minutos (mais 15 se fizer a parte opcional)",
  "custo": "Parte principal: US$ 0 a poucos centavos (tabela pública de 344 linhas, treino em segundos, dentro da cota gratuita). Parte opcional de embeddings: poucos centavos (chamadas ao modelo de embeddings sobre cerca de 10 frases; confira o preço atual do Vertex AI) e exige ativar a API do Vertex AI e criar uma conexão.",
  "porque": "Ver na prática o ciclo CREATE MODEL, ML.EVALUATE e ML.PREDICT, e o fluxo embeddings mais VECTOR_SEARCH que a prova cobra em perguntas de RAG e busca semântica.",
  "passos": [
   {
    "t": "Crie o dataset na localização US",
    "cmd": "export PROJ=$(gcloud config get-value project)\nbq --location=US mk -d ${PROJ}:cp_ml",
    "p": "O dataset público ml_datasets está nos EUA, e o modelo e os dados devem estar na mesma localização."
   },
   {
    "t": "Treine o classificador",
    "cmd": "bq query --use_legacy_sql=false 'CREATE OR REPLACE MODEL `'${PROJ}'.cp_ml.pinguim` OPTIONS(model_type=\"LOGISTIC_REG\", input_label_cols=[\"species\"], data_split_method=\"AUTO_SPLIT\") AS SELECT species, island, culmen_length_mm, culmen_depth_mm, flipper_length_mm, body_mass_g, sex FROM `bigquery-public-data.ml_datasets.penguins` WHERE body_mass_g IS NOT NULL AND sex IS NOT NULL'",
    "p": "Prevê a espécie do pinguim. O BigQuery faz o split automático, trata strings com one-hot e padroniza numéricos. Para o fluxo completo, repare que o treino roda sem mover dados."
   },
   {
    "t": "Avalie o modelo",
    "cmd": "bq query --use_legacy_sql=false 'SELECT * FROM ML.EVALUATE(MODEL `'${PROJ}'.cp_ml.pinguim`)'",
    "p": "Mostra precisão, recall, acurácia, F1 e ROC AUC calculados no conjunto de avaliação separado. Em multiclasse as métricas são médias entre classes."
   },
   {
    "t": "Gere previsões",
    "cmd": "bq query --use_legacy_sql=false 'SELECT predicted_species, species FROM ML.PREDICT(MODEL `'${PROJ}'.cp_ml.pinguim`, (SELECT * FROM `bigquery-public-data.ml_datasets.penguins` WHERE body_mass_g IS NOT NULL AND sex IS NOT NULL LIMIT 10))'",
    "p": "ML.PREDICT devolve as colunas de entrada mais predicted_<rótulo>. Compare a previsão com a espécie real. Nota: o conjunto pequeno serve só para aprender o fluxo."
   },
   {
    "t": "Opcional (custo explícito): conexão e modelo remoto de embeddings",
    "cmd": "gcloud services enable aiplatform.googleapis.com bigqueryconnection.googleapis.com\nbq mk --connection --location=US --connection_type=CLOUD_RESOURCE cp_conn\nbq show --connection ${PROJ}.US.cp_conn   # copie o serviceAccountId\ngcloud projects add-iam-policy-binding ${PROJ} --member=serviceAccount:ID_COPIADO --role=roles/aiplatform.user\nbq query --use_legacy_sql=false 'CREATE OR REPLACE MODEL `'${PROJ}'.cp_ml.emb` REMOTE WITH CONNECTION `'${PROJ}'.US.cp_conn` OPTIONS(ENDPOINT=\"text-embedding-005\")'",
    "p": "A conexão tem uma service account que o BigQuery usa para chamar o Vertex AI; ela precisa do papel aiplatform.user. O nome do endpoint de embeddings muda com o tempo: confira o modelo vigente na documentação. Pode levar alguns minutos até a permissão propagar."
   },
   {
    "t": "Opcional: gere embeddings e busque por significado",
    "cmd": "bq query --use_legacy_sql=false 'CREATE OR REPLACE TABLE `'${PROJ}'.cp_ml.docs_emb` AS SELECT * FROM ML.GENERATE_EMBEDDING(MODEL `'${PROJ}'.cp_ml.emb`, (SELECT content FROM UNNEST([\"how to reset my password\",\"refund policy for damaged items\",\"change shipping address\",\"cancel my subscription\",\"update credit card\"]) AS content), STRUCT(TRUE AS flatten_json_output))'\nbq query --use_legacy_sql=false 'SELECT base.content, distance FROM VECTOR_SEARCH(TABLE `'${PROJ}'.cp_ml.docs_emb`, \"ml_generate_embedding_result\", (SELECT ml_generate_embedding_result FROM ML.GENERATE_EMBEDDING(MODEL `'${PROJ}'.cp_ml.emb`, (SELECT \"I forgot my login\" AS content))), top_k => 2, distance_type => \"COSINE\")'",
    "p": "A primeira consulta transforma cada frase em vetor. A segunda embeda a pergunta e devolve as 2 frases mais próximas em significado, sem compartilhar palavras. Em tabela tão pequena a busca é por força bruta; índice vetorial só vale para tabelas grandes."
   }
  ],
  "limpar": [
   "bq rm -r -f -d ${PROJ}:cp_ml",
   "bq rm --connection ${PROJ}.US.cp_conn   (se criou a parte opcional)",
   "Remova o papel aiplatform.user da service account da conexão: gcloud projects remove-iam-policy-binding ${PROJ} --member=serviceAccount:ID_COPIADO --role=roles/aiplatform.user",
   "Opcional: desative as APIs que ativou só para o lab (gcloud services disable aiplatform.googleapis.com)."
  ],
  "verificar": "ML.EVALUATE retorna uma linha de métricas com acurácia alta (acima de 0,9 é comum neste dataset), ML.PREDICT mostra predicted_species próxima de species, e (na parte opcional) a busca por 'I forgot my login' devolve primeiro a frase sobre redefinir a senha."
 }
};
  C.dias[19] = {
 "aula": {
  "titulo": "Custos e capacidade",
  "simples": {
   "analogia": "Pense em como você se locomove. **Táxi** é pagar por corrida: bom se você anda pouco e de forma irregular. **Carro alugado por mês** é pagar pelo carro, rodando ou parado: compensa se você anda todo dia. Se o aluguel mensal custa o mesmo que 20 corridas e você faz 30 por mês, alugar vence; se faz 5, o táxi vence. Contrato de um ano sai mais barato por mês, mas você paga mesmo se parar de usar. E, nos dias de pico, você chama um carro extra só por aquele dia. No BigQuery, táxi é o modelo **sob demanda** (paga pelos bytes lidos), aluguel é **capacidade em slots** e o carro extra é o **autoscaling**. Guardar dados é outra conta, o aluguel do depósito: no físico você paga pelo volume compactado, com preço maior por unidade. Limite da analogia: os preços reais mudam, então use o raciocínio e confira os valores.",
   "pontos": [
    "Uso constante e previsível pede capacidade reservada; uso raro pede pagar sob demanda.",
    "Computação e armazenamento são duas contas separadas no BigQuery.",
    "**Baseline** cobre o piso fixo; **autoscaling** cobre os picos.",
    "**Budget** só avisa. Quem trava o gasto são limite de bytes, cota e máximo de slots.",
    "A edição **Standard** não tem CMEK, segurança por coluna nem VPC Service Controls.",
    "No Dataproc, ligue o cluster, rode o job e desligue."
   ],
   "paraQueServe": "Você usa isso quando a conta do BigQuery sobe e é preciso escolher entre sob demanda e reservas, ou quando precisa cortar custo de Spark e Dataflow sem perder o prazo."
  },
  "glossario": [
   {
    "t": "Slot",
    "d": "Unidade de CPU e memória do BigQuery, como um cozinheiro. Ex.: 100 slots trabalham em paralelo; uma consulta grande termina mais rápido com 100 do que com 20."
   },
   {
    "t": "Sob demanda (on-demand)",
    "d": "Você paga pelos dados que cada consulta lê, sem custo fixo. É o táxi: ótimo para uso esporádico."
   },
   {
    "t": "Editions (Standard, Enterprise, Enterprise Plus)",
    "d": "Modelo de pagar por slots. Cada edição libera recursos diferentes: a Standard é a mais simples e a Enterprise Plus traz recuperação de desastre gerenciada."
   },
   {
    "t": "Reserva e assignment",
    "d": "Reserva é um grupo de slots dedicado a um tipo de trabalho. Assignment liga um projeto a essa reserva."
   },
   {
    "t": "Baseline e autoscaling",
    "d": "Baseline são slots que você paga sempre. Autoscaling adiciona slots nos picos, até um máximo, e cobra só pelo uso. Ex.: baseline 300, máximo 1.200."
   },
   {
    "t": "Commitment",
    "d": "Compromisso de pagar pelos slots por 1 ou 3 anos, em troca de desconto. Você paga usando ou não."
   },
   {
    "t": "Armazenamento lógico e físico",
    "d": "Lógico cobra pelo tamanho sem compactar, com preço menor. Físico cobra pelo tamanho compactado, com preço maior por GiB; se o dado comprime 8 para 1, a conta tende a cair bastante."
   },
   {
    "t": "Budget (orçamento) do Cloud Billing",
    "d": "Avisa por e-mail quando o gasto passa de percentuais do valor definido, como 50% e 90%. Não bloqueia nada sozinho."
   },
   {
    "t": "Maximum bytes billed e custom quota",
    "d": "Teto que realmente bloqueia: o primeiro cancela uma consulta que leria bytes demais; a cota limita o total por dia."
   },
   {
    "t": "Cluster efêmero e FlexRS",
    "d": "Cluster efêmero existe só durante o job. FlexRS roda pipelines Dataflow em lote mais barato, aceitando esperar até horas para começar."
   }
  ],
  "checagem": [
   "Sem olhar: quando sob demanda compensa e quando reservas com baseline compensam?",
   "O que é baseline, o que é autoscaling e por que não se compra commitment para o pico?",
   "Qual a diferença entre um budget e um limite de bytes por consulta?",
   "Quando faz sentido trocar um dataset para armazenamento físico e o que passa a ser cobrado à parte?"
  ],
  "resumo": "Como decidir entre BigQuery sob demanda e Editions com reservas, ajustar slots e armazenamento, controlar gastos com quotas e budgets, e reduzir custo em Dataproc e Dataflow com clusters por job e FlexRS.",
  "blocos": [
   {
    "t": "Ideia central: pague pelo padrão de uso, não pelo pico",
    "facil": "Traduzindo: escolha o jeito de pagar conforme o seu padrão de uso. Uso constante pede capacidade reservada; uso raro pede pagar só quando usar.",
    "p": [
     "Custo na nuvem é a combinação de quanto você usa, quando usa e como o preço é cobrado. As questões de custo da prova trazem um padrão de uso (constante ou esporádico, previsível ou em picos, tolerante a atraso ou não) e pedem o modelo de cobrança certo. A regra geral: carga previsível e constante favorece capacidade reservada, que é mais barata por unidade; carga esporádica favorece pagar só quando usa; trabalho que aceita atraso favorece capacidade barata e interrompível.",
     "No BigQuery existem dois eixos independentes: como você paga a COMPUTAÇÃO (sob demanda por bytes lidos, ou capacidade por slots em Editions) e como você paga o ARMAZENAMENTO (lógico ou físico). Misturar os dois eixos é a fonte de erros: reservas não mudam o preço de armazenar, e escolher armazenamento físico não muda o preço das consultas."
    ]
   },
   {
    "t": "Computação no BigQuery: sob demanda versus Editions",
    "facil": "Traduzindo: sob demanda cobra pelo que a consulta lê; Editions cobra por slots reservados. Cada edição libera recursos diferentes, e a Standard não tem os de segurança avançada.",
    "p": [
     "Sob demanda (on-demand): você paga por TiB de dados lidos pela consulta, com uma cota mensal gratuita; o projeto pode usar até cerca de 2.000 slots simultâneos, compartilhados de um pool, sem configuração. Bom para uso esporádico, imprevisível ou pequeno. O custo depende dos bytes lidos, então particionamento, cluster e escolha de colunas reduzem a conta diretamente.",
     "Editions (modelo por capacidade): você paga slot-hora, independente dos bytes lidos. Um slot é uma unidade de CPU e memória do BigQuery. Há três edições e a prova cobra as diferenças: Standard (autoscaling apenas, sem baseline e sem commitments, reserva máxima de 1.600 slots, SLO de 99,9%, sem BI Engine, BigQuery ML, CMEK, controles de acesso por coluna e linha, mascaramento e VPC Service Controls); Enterprise (autoscaling mais baseline, commitments, SLO de 99,99%, esses recursos de segurança e BI Engine); Enterprise Plus (tudo da Enterprise mais managed disaster recovery e controles de conformidade como Assured Workloads). Valores de desconto de commitment documentados: 20% para 1 ano e 40% para 3 anos (confira os percentuais atuais na página de preços).",
     "Reserva (reservation) é um grupo de slots dedicado a cargas de trabalho. Baseline slots são slots que você paga sempre; autoscaling slots são adicionados conforme a demanda até o máximo configurado e cobrados por uso, com cobrança mínima de 1 minuto por padrão (existe opção de fluid scaling sem mínimo). A reserva mínima é de 50 slots. Idle slot sharing deixa slots ociosos de uma reserva serem usados por outras no mesmo projeto administrativo. Assignments ligam um projeto, pasta ou organização a uma reserva para um tipo de job (QUERY, PIPELINE para cargas, ML_EXTERNAL, BACKGROUND); confira na documentação as restrições de assignment da edição Standard. Um projeto pode ficar sem reserva e continuar sob demanda."
    ],
    "tabela": {
     "cab": [
      "Cenário",
      "Escolha",
      "Motivo"
     ],
     "linhas": [
      [
       "Consultas esporádicas, volume baixo",
       "Sob demanda",
       "Sem custo fixo; paga só o que lê"
      ],
      [
       "Carga constante 24 horas, previsível",
       "Enterprise com baseline + commitment",
       "Capacidade reservada é mais barata por slot; commitment dá desconto"
      ],
      [
       "Carga com picos ocasionais sobre uma base estável",
       "Baseline para a base + autoscaling para os picos",
       "Paga o piso sempre e o pico só quando ocorre"
      ],
      [
       "Equipe pequena, precisa de previsibilidade, sem requisitos de segurança avançados",
       "Standard com autoscaling",
       "Sem baseline, sem commitment; limite de 1.600 slots por reserva"
      ],
      [
       "ETL pesado não pode atrasar dashboards",
       "Reservas separadas por carga",
       "Isolamento; idle slot sharing recupera capacidade ociosa"
      ],
      [
       "Exige CMEK, controles de coluna e linha ou VPC SC",
       "Enterprise ou superior",
       "Recursos ausentes na Standard"
      ],
      [
       "Exige DR gerenciado entre regiões",
       "Enterprise Plus",
       "Managed disaster recovery"
      ]
     ]
    },
    "armadilha": "Um commitment é um compromisso de pagar pelos slots durante o prazo, usados ou não. Comprar commitment para uma carga que oscila muito ou desaparece é desperdício. Dimensione o baseline pela carga mínima estável e deixe o autoscaling cobrir o resto."
   },
   {
    "t": "Armazenamento lógico versus físico, interativo versus batch",
    "facil": "Traduzindo: armazenar tem a sua própria conta. O físico cobra pelo dado compactado, mas custa mais por GiB. A consulta batch espera uma vaga e custa o mesmo.",
    "p": [
     "Armazenamento lógico (padrão): você paga pelos bytes não compactados, com preço menor por GiB; time travel e fail-safe estão incluídos. Armazenamento físico: você paga pelos bytes compactados, com preço por GiB maior, e paga à parte por time travel e fail-safe. Vale a pena trocar o dataset para físico quando a taxa de compressão é alta (regra prática: o preço por GiB físico é cerca do dobro do lógico, então acima de aproximadamente 2 para 1 a conta tende a cair, considerando ainda time travel e fail-safe cobrados à parte; confira os preços vigentes e calcule com INFORMATION_SCHEMA.TABLE_STORAGE antes de decidir, que mostra bytes lógicos e físicos). A configuração é por dataset. Em ambos os modelos, tabelas ou partições sem modificação por 90 dias passam automaticamente para o preço de armazenamento de longo prazo, mais barato, sem perda de desempenho. Com físico, reduzir a janela de time travel (mínimo de 2 dias) diminui a conta.",
     "Interativo versus batch: consultas interativas (padrão) começam logo e contam para os limites de concorrência. Consultas batch entram numa fila e começam quando há capacidade ociosa (normalmente em minutos, com tentativa por até 24 horas), não contam para o limite de concorrência e têm o mesmo preço. Use batch para trabalho que aceita espera, como relatórios noturnos, para não competir com consultas de usuários. Dentro de reservas, a prioridade batch usa os mesmos slots."
    ]
   },
   {
    "t": "Controles de custo: particionar, expirar, limitar, alertar",
    "facil": "Traduzindo: o orçamento só avisa. Quem realmente trava o gasto são o limite de bytes por consulta, a cota diária e o máximo de slots da reserva.",
    "p": [
     "Reduzir bytes lidos é a alavanca principal no modelo sob demanda: partição (por data de ingestão ou coluna de data) com filtro obrigatório (require_partition_filter), cluster nas colunas filtradas, escolha de colunas em vez de SELECT *, tabelas pré-agregadas e materialized views. O dry run (ou o validador do console) mostra os bytes que seriam lidos antes de executar. LIMIT não reduz os bytes lidos.",
     "Reduzir bytes guardados: expiração de tabela e de partição (e expiração padrão do dataset) para apagar dados que perderam valor, armazenamento de longo prazo automático, exportar dados frios para Cloud Storage com classes mais baratas e ciclo de vida (Autoclass ou regras Nearline, Coldline, Archive), e escolha do modelo físico quando compensa.",
     "Limites: maximum bytes billed por consulta faz o job falhar sem custo se ultrapassar o valor. Cotas customizadas (custom quotas) limitam bytes processados por dia por projeto ou por usuário, funcionando como teto rígido. Reservas com máximo de slots limitam o custo do modelo por capacidade. Budgets e alertas do Cloud Billing avisam por e-mail ou Pub/Sub quando o gasto cruza percentuais de um valor (por exemplo 50%, 90%, 100%), mas NÃO interrompem o uso por si só; para corte automático é preciso reagir à notificação do Pub/Sub com automação. Labels em recursos e a exportação do billing para o BigQuery permitem atribuir custo por equipe e projeto."
    ],
    "dica": "Resumo para a prova: alerta é budget; teto rígido de consulta é custom quota e maximum bytes billed; teto de capacidade é max slots da reserva."
   },
   {
    "t": "Dataproc e Dataflow: pagar só pelo tempo de trabalho",
    "facil": "Traduzindo: pague só pelo tempo de trabalho. No Dataproc, ligue o cluster, rode o job e desligue; no Dataflow em lote que pode esperar, use FlexRS.",
    "p": [
     "Dataproc: o padrão recomendado é o cluster efêmero por job (ou por fluxo de trabalho): criar, rodar e apagar, orquestrado por Cloud Composer ou workflow templates, com os dados no Cloud Storage em vez de no HDFS do cluster, para que o cluster seja descartável. O custo cai porque você só paga durante o job. Para cluster que precisa existir mais tempo, use autoscaling, exclusão por inatividade (idle delete) e agendada, e workers secundários preemptíveis ou Spot (mais baratos, mas podem ser retirados e não guardam dados de HDFS). Cluster persistente só se justifica com muitos jobs contínuos, uso interativo frequente ou quando o tempo de criação do cluster inviabiliza o fluxo. Serverless for Apache Spark (Dataproc Serverless) elimina o cluster: você envia o job e paga pelo uso.",
     "Dataflow: FlexRS (Flexible Resource Scheduling) reduz o custo de pipelines batch combinando VMs preemptíveis e regulares e adiando o início: o job entra em fila e começa em até 6 horas, no momento que o serviço escolher. Só vale para batch, não para streaming, e exige Dataflow Shuffle. É a resposta quando o enunciado diz 'batch, tolerante a atraso, minimizar custo'. Para streaming a otimização vem de dimensionamento correto, autoscaling e Streaming Engine."
    ]
   }
  ],
  "exemplo": {
   "t": "Decidindo a capacidade de uma empresa de e-commerce",
   "texto": "A empresa gasta muito em BigQuery sob demanda. O histórico mostra: das 2h às 6h, ETL pesado e estável; das 9h às 18h, dashboards com picos; nos fins de semana quase nada. Requisitos: CMEK e controle de acesso por coluna. Passo 1: como CMEK e controle por coluna não existem na Standard, a escolha é Enterprise. Passo 2: medir pelo INFORMATION_SCHEMA.JOBS_TIMELINE o uso médio de slots por minuto; suponha que o piso estável seja de 300 slots e o pico de 1.200. Passo 3: criar duas reservas, uma de ETL e uma de BI, com baseline somente para o que é constante, e autoscaling até o máximo para os picos; idle slot sharing deixa o ETL usar o ocioso do BI à noite. Passo 4: comprar commitment de 1 ano apenas para o baseline previsto, não para o pico. Passo 5: nos datasets com compressão de 8 para 1, trocar para armazenamento físico e reduzir time travel para 2 dias. Passo 6: budget com alertas a 50%, 90% e 100% e custom quota para os projetos que seguem sob demanda. Passo 7: o job Spark noturno passa a rodar em cluster efêmero com workers preemptíveis, e o reprocessamento batch semanal no Dataflow usa FlexRS."
  },
  "prova": [
   "'Predictable steady workload' aponta reservas com baseline e commitment; 'sporadic', 'unpredictable' ou 'small' aponta on-demand; 'spikes' aponta autoscaling.",
   "Requisitos de segurança (CMEK, column-level security, VPC SC) eliminam a Standard; 'cross-region disaster recovery' exige Enterprise Plus.",
   "'Highly compressible data' e armazenamento caro aponta para troca para armazenamento físico; lembre que time travel e fail-safe passam a ser cobrados.",
   "'Alert when spending reaches' é budget; 'prevent users from scanning more than' é custom quota ou maximum bytes billed; budgets sozinhos não bloqueiam gasto.",
   "'Batch, can wait several hours, minimize cost' é FlexRS no Dataflow; 'job runs a few hours a day' no Dataproc é cluster efêmero ou Serverless com dados no Cloud Storage; 'low priority queries must not compete' é prioridade batch."
  ],
  "explique": "Explique como você decidiria, para uma empresa com carga constante durante o dia e picos às segundas, entre BigQuery sob demanda, Standard e Enterprise com baseline e autoscaling, e o que muda no custo de armazenamento ao trocar para o modelo físico."
 },
 "cartoes": [
  {
   "id": "d19c1",
   "t": "5.3",
   "f": "Como funciona a cobrança sob demanda do BigQuery e qual o limite de slots por projeto?",
   "v": "Por TiB de dados lidos pela consulta (com cota mensal gratuita). O projeto usa até cerca de 2.000 slots simultâneos de um pool compartilhado, sem configuração."
  },
  {
   "id": "d19c2",
   "t": "5.3",
   "f": "Qual a diferença de computação entre Standard e Enterprise do BigQuery?",
   "v": "Standard: só autoscaling, sem baseline nem commitment, reserva máxima de 1.600 slots, SLO 99,9%. Enterprise: autoscaling mais baseline, commitments, SLO 99,99%, mais recursos de segurança."
  },
  {
   "id": "d19c3",
   "t": "5.3",
   "f": "Que recursos faltam na edição Standard?",
   "v": "BI Engine, BigQuery ML, CMEK, controle de acesso por coluna e linha, mascaramento, VPC Service Controls, índices de busca e vetoriais, e cache entre usuários. Também não há managed DR (só Enterprise Plus)."
  },
  {
   "id": "d19c4",
   "t": "5.3",
   "f": "O que diferencia a Enterprise Plus?",
   "v": "Inclui managed disaster recovery e controles de conformidade (Assured Workloads), além de tudo da Enterprise."
  },
  {
   "id": "d19c5",
   "t": "5.3",
   "f": "Baseline slots versus autoscaling slots: como são cobrados?",
   "v": "Baseline é capacidade que você paga continuamente. Autoscaling adiciona slots até o máximo configurado e cobra pelo uso, com mínimo de 1 minuto por padrão (fluid scaling remove o mínimo)."
  },
  {
   "id": "d19c6",
   "t": "5.3",
   "f": "O que é idle slot sharing?",
   "v": "Slots ociosos de uma reserva podem ser usados por outras reservas do mesmo projeto administrativo, melhorando a utilização sem perder o isolamento quando há demanda."
  },
  {
   "id": "d19c7",
   "t": "5.3",
   "f": "O que é um commitment de slots e quando faz sentido?",
   "v": "Compromisso de pagar pelos slots por 1 ou 3 anos (Enterprise e Plus) em troca de desconto (20% e 40%, conforme a documentação). Faz sentido só para a carga estável de baseline, pois é pago usado ou não."
  },
  {
   "id": "d19c8",
   "t": "5.1",
   "f": "Armazenamento lógico versus físico no BigQuery: quando o físico compensa?",
   "v": "Lógico cobra bytes não compactados; físico cobra bytes compactados a preço por GiB maior e cobra time travel e fail-safe à parte. Compensa com alta compressão (regra prática acima de 2 para 1); confira em TABLE_STORAGE."
  },
  {
   "id": "d19c9",
   "t": "5.1",
   "f": "O que muda ao reduzir a janela de time travel conforme o modelo de armazenamento?",
   "v": "No lógico, nada na conta (já incluído). No físico, reduz o custo, pois bytes de time travel e fail-safe são cobrados. A janela mínima é de 2 dias; o fail-safe não é configurável."
  },
  {
   "id": "d19c10",
   "t": "5.3",
   "f": "Consulta interativa versus batch no BigQuery?",
   "v": "Interativa começa logo e conta para limites de concorrência. Batch espera capacidade ociosa, não conta para concorrência e tem o mesmo preço. Use batch para trabalho tolerante a espera."
  },
  {
   "id": "d19c11",
   "t": "5.1",
   "f": "Quais controles limitam o custo de consultas e quais apenas alertam?",
   "v": "Limitam: maximum bytes billed (por consulta), custom quotas (por dia, projeto ou usuário) e max slots da reserva. Apenas alertam: budgets do Cloud Billing (não interrompem o uso)."
  },
  {
   "id": "d19c12",
   "t": "5.1",
   "f": "Como reduzir o custo de armazenamento de dados que envelhecem no BigQuery?",
   "v": "Expiração de tabela, partição ou dataset; armazenamento de longo prazo automático após 90 dias sem modificação; exportar dados frios para Cloud Storage com ciclo de vida; avaliar armazenamento físico."
  },
  {
   "id": "d19c13",
   "t": "5.1",
   "f": "Dataproc persistente ou por job: qual o padrão recomendado?",
   "v": "Cluster efêmero por job (ou Serverless for Apache Spark) com dados no Cloud Storage, pagando só durante o job. Persistente só para jobs contínuos ou uso interativo frequente, com autoscaling e idle delete."
  },
  {
   "id": "d19c14",
   "t": "5.1",
   "f": "O que são workers secundários preemptíveis ou Spot no Dataproc e qual a restrição?",
   "v": "VMs mais baratas que podem ser retiradas a qualquer momento; adequadas para processamento, mas não guardam dados de HDFS, então os dados devem ficar no Cloud Storage."
  },
  {
   "id": "d19c15",
   "t": "5.1",
   "f": "O que é FlexRS e quando usar?",
   "v": "Flexible Resource Scheduling do Dataflow: só batch, usa VMs preemptíveis e regulares e adia o início em até 6 horas, com desconto. Use quando o batch tolera atraso e o objetivo é custo mínimo."
  }
 ],
 "questoes": [
  {
   "id": "d19q1",
   "s": 5,
   "t": "5.3",
   "e": "A company runs about 800 slots worth of BigQuery processing continuously, 24 hours a day, with occasional spikes to 1,500 slots. Its on-demand bill is high and unpredictable. It needs CMEK. What should the data engineer recommend to reduce cost while handling spikes?",
   "o": [
    "Stay on on-demand pricing and add custom quotas",
    "Use the Standard edition with a baseline of 800 slots",
    "Buy Enterprise edition capacity with a baseline sized near the steady load (using a commitment for it) and autoscaling for the spikes",
    "Use Enterprise Plus with a baseline of 1,500 slots permanently"
   ],
   "c": [
    2
   ],
   "x": "A opção “Buy Enterprise edition capacity with a baseline sized near the steady load (using…” está certa: carga constante e previsível é mais barata em capacidade reservada, o commitment dá desconto para o baseline, o autoscaling cobre os picos pagando só quando usados, e a Enterprise suporta CMEK. “Stay on on-demand pricing and add custom quotas” erra: sob demanda tende a ser mais cara para carga constante e a quota só limita, não reduz custo. “Use the Standard edition with a baseline of 800 slots” erra: a Standard não tem baseline nem suporta CMEK. “Use Enterprise Plus with a baseline of 1,500 slots permanently” erra: um baseline de 1.500 slots paga a capacidade de pico continuamente e a Enterprise Plus não é necessária, pois não há requisito de DR ou conformidade."
  },
  {
   "id": "d19q2",
   "s": 5,
   "t": "5.3",
   "e": "A small analytics team runs ad hoc BigQuery queries a few times a week. Total scanned data is about 600 GB per month and there are no special security requirements. Which pricing model is likely the most cost-effective?",
   "o": [
    "On-demand pricing",
    "Enterprise edition with a 3-year commitment of 500 slots",
    "Enterprise Plus edition with managed disaster recovery",
    "Standard edition with a baseline of 100 slots"
   ],
   "c": [
    0
   ],
   "x": "A opção “On-demand pricing” está certa: com uso esporádico e baixo volume (600 GB por mês cabe na cota gratuita sob demanda), pagar por bytes lidos é o mais barato, sem custo fixo. “Enterprise edition with a 3-year commitment of 500 slots” erra: commitment de 3 anos de 500 slots é um custo fixo enorme para uso mínimo. “Enterprise Plus edition with managed disaster recovery” erra: Enterprise Plus acrescenta recursos desnecessários e capacidade reservada. “Standard edition with a baseline of 100 slots” erra: a Standard não tem baseline e, de qualquer forma, pagar por slots fixos num uso tão baixo desperdiça dinheiro."
  },
  {
   "id": "d19q3",
   "s": 5,
   "t": "5.3",
   "e": "A company wants to move from on-demand to capacity pricing for its BigQuery workloads. Requirements: customer-managed encryption keys, column-level access control, and the lowest cost edition that supports these. Which edition should they choose?",
   "o": [
    "Standard edition",
    "Enterprise edition",
    "Enterprise Plus edition",
    "Any edition, since all editions support these features"
   ],
   "c": [
    1
   ],
   "x": "A opção “Enterprise edition” está certa: CMEK e controle de acesso por coluna exigem pelo menos a Enterprise, que é a mais barata das edições que os suportam. “Standard edition” erra: a Standard não suporta CMEK nem controles por coluna e linha. “Enterprise Plus edition” erra: funciona, mas é mais cara e seus extras (managed DR, conformidade) não são requeridos. “Any edition, since all editions support these features” erra: os recursos de segurança variam entre as edições."
  },
  {
   "id": "d19q4",
   "s": 5,
   "t": "5.3",
   "e": "Heavy nightly ETL jobs in a shared BigQuery reservation are slowing down business dashboards in the morning when ETL overruns. The company wants isolation between the two workloads without wasting idle capacity. What should be done?",
   "o": [
    "Move dashboards to on-demand and leave ETL in the reservation with no change",
    "Create separate reservations for ETL and for BI with assignments for each project, keeping idle slot sharing enabled",
    "Ask analysts to run dashboards later in the day",
    "Convert all ETL jobs to interactive priority"
   ],
   "c": [
    1
   ],
   "x": "A opção “Create separate reservations for ETL and for BI with assignments for each project…” está certa: reservas separadas isolam as cargas, e o idle slot sharing deixa uma reserva usar a capacidade ociosa da outra, evitando desperdício. “Move dashboards to on-demand and leave ETL in the reservation with no change” erra: pode ajudar, mas muda o modelo de custo dos dashboards e não resolve o desenho; o enunciado pede isolamento dentro de capacidade reservada. “Ask analysts to run dashboards later in the day” erra: depende de comportamento humano e não isola. “Convert all ETL jobs to interactive priority” erra: prioridade interativa não cria isolamento e aumenta a competição por slots."
  },
  {
   "id": "d19q5",
   "s": 5,
   "t": "5.1",
   "e": "A dataset in BigQuery holds highly compressible clickstream data with a measured physical-to-logical compression ratio of about 8 to 1, billed with the logical storage model. The team wants to cut storage cost. Choose two.",
   "o": [
    "Switch the dataset to the physical storage billing model",
    "Reduce the time travel window to 2 days, because physical billing charges for time travel bytes",
    "Reduce the fail-safe period to 1 day",
    "Enable BI Engine on the dataset",
    "Convert the tables to external tables in a regional Cloud Storage bucket without any other change"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Switch the dataset to the physical storage billing model” e “Reduce the time travel window to 2 days, because physical billing charges for time travel…” estão corretas: com compressão alta, o armazenamento físico cobra os bytes compactados e tende a custar menos, e como no modelo físico time travel e fail-safe são cobrados, reduzir a janela de time travel para o mínimo de 2 dias diminui a conta. “Reduce the fail-safe period to 1 day” erra: o fail-safe é fixo em 7 dias e não é configurável. “Enable BI Engine on the dataset” erra: BI Engine acelera consultas e não reduz armazenamento. “Convert the tables to external tables in a regional Cloud Storage bucket without any…” erra: externalizar muda o desempenho e os recursos e não é uma otimização equivalente, além de a pergunta tratar de armazenamento do BigQuery."
  },
  {
   "id": "d19q6",
   "s": 5,
   "t": "5.3",
   "e": "A company runs hundreds of low-priority BigQuery report queries every night. They are hitting concurrency limits and delaying interactive user queries. The reports can wait for several hours. What should be done to minimize impact at no extra cost?",
   "o": [
    "Run the reports as batch priority queries",
    "Increase the maximum bytes billed on each report",
    "Create a new project for every report",
    "Add LIMIT clauses to the report queries"
   ],
   "c": [
    0
   ],
   "x": "A opção “Run the reports as batch priority queries” está certa: consultas batch esperam capacidade ociosa, não contam para o limite de concorrência e têm o mesmo preço, ideal para trabalho que tolera espera. “Increase the maximum bytes billed on each report” erra: bytes máximos cobrados é um limite de custo por consulta, não afeta prioridade nem concorrência. “Create a new project for every report” erra: projetos novos não resolvem a contenção de slots e criam sobrecarga administrativa. “Add LIMIT clauses to the report queries” erra: LIMIT não reduz os bytes lidos nem a concorrência."
  },
  {
   "id": "d19q7",
   "s": 5,
   "t": "5.4",
   "e": "A finance team is concerned that analysts might run very expensive queries on on-demand BigQuery pricing. They want a single query to fail if it would scan more than 1 TB, and a daily cap on bytes processed per project. Choose two.",
   "o": [
    "Set maximum bytes billed on queries (job-level limit)",
    "Configure a custom quota for query usage per day on the project",
    "Create a Cloud Billing budget with alerts at 100 percent",
    "Move the tables to long-term storage",
    "Add a LIMIT 100 to every query"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Set maximum bytes billed on queries (job-level limit)” e “Configure a custom quota for query usage per day on the project” estão corretas: maximum bytes billed faz o job falhar sem custo se ultrapassar o valor, e a cota customizada limita os bytes processados por dia no projeto como teto rígido. “Create a Cloud Billing budget with alerts at 100 percent” erra: budgets apenas alertam e não interrompem o uso. “Move the tables to long-term storage” erra: armazenamento de longo prazo reduz o preço de armazenamento, não de consultas. “Add a LIMIT 100 to every query” erra: LIMIT não reduz os bytes lidos."
  },
  {
   "id": "d19q8",
   "s": 5,
   "t": "5.4",
   "e": "A finance lead wants to be notified by email when cloud spending reaches 50, 90 and 100 percent of a monthly amount for a project. No automatic cutoff is needed. What should be configured?",
   "o": [
    "A BigQuery custom quota",
    "A Cloud Billing budget with threshold alert rules",
    "A BigQuery reservation with a maximum slot count",
    "A log sink to Cloud Storage"
   ],
   "c": [
    1
   ],
   "x": "A opção “A Cloud Billing budget with threshold alert rules” está certa: budgets do Cloud Billing definem um valor e regras de limite que notificam por e-mail ou Pub/Sub ao cruzar percentuais. “A BigQuery custom quota” erra: cota customizada limita o uso de um serviço, não alerta sobre gasto geral. “A BigQuery reservation with a maximum slot count” erra: o máximo de slots limita capacidade de uma reserva e não notifica gasto. “A log sink to Cloud Storage” erra: um sink de logs exporta logs e não monitora custo."
  },
  {
   "id": "d19q9",
   "s": 5,
   "t": "5.1",
   "e": "A nightly Spark job on Dataproc takes about 2 hours. The current persistent cluster runs 24 hours a day, mostly idle, and stores its data in HDFS. The goal is to minimize cost with the least operational effort. What should be done?",
   "o": [
    "Keep the persistent cluster and resize it manually every evening",
    "Move the data to Cloud Storage and run the job on an ephemeral cluster (or Serverless for Apache Spark) created and deleted per job, optionally with preemptible secondary workers",
    "Use a larger machine type for the persistent cluster so the job finishes faster",
    "Keep the cluster but disable autoscaling"
   ],
   "c": [
    1
   ],
   "x": "A opção “Move the data to Cloud Storage and run the job on an ephemeral cluster (or Serverless…” está certa: com os dados no Cloud Storage, o cluster vira descartável e você paga só durante as 2 horas, e workers preemptíveis reduzem ainda mais; Serverless elimina o cluster. “Keep the persistent cluster and resize it manually every evening” erra: redimensionar manualmente é trabalho operacional e o cluster segue existindo. “Use a larger machine type for the persistent cluster so the job finishes faster” erra: máquinas maiores aumentam o custo do cluster ocioso. “Keep the cluster but disable autoscaling” erra: desativar autoscaling não reduz custo e mantém o cluster ocioso."
  },
  {
   "id": "d19q10",
   "s": 5,
   "t": "5.1",
   "e": "A retailer reprocesses its full sales history in a Dataflow batch pipeline once a week. The job has no strict start time and results are needed within a day. The team wants to minimize cost. What should be enabled?",
   "o": [
    "Streaming Engine",
    "A larger worker machine type",
    "FlexRS (Flexible Resource Scheduling)",
    "Dataflow Prime on a streaming job"
   ],
   "c": [
    2
   ],
   "x": "A opção “FlexRS (Flexible Resource Scheduling)” está certa: FlexRS é para pipelines batch tolerantes a atraso e reduz o custo usando VMs preemptíveis e regulares e agendando o início em até 6 horas. “Streaming Engine” erra: Streaming Engine é para pipelines de streaming. “A larger worker machine type” erra: máquinas maiores aumentam o custo por hora e não reduzem custo total necessariamente. “Dataflow Prime on a streaming job” erra: o pipeline é batch, e a solução de custo para batch tolerante a atraso é o FlexRS."
  }
 ],
 "lab": {
  "t": "Achar as consultas mais caras e criar um orçamento com alerta",
  "antes": "Use o **Cloud Shell** (ícone de terminal no canto superior direito do console). Os comandos de `bq query` mostram tabelas de texto no terminal. Para as consultas em INFORMATION_SCHEMA, troque `region-us` pela região onde você roda jobs. Para o orçamento, o seu usuário precisa de papel de administrador de faturamento na conta (Billing Account Administrator ou Costs Manager); sem isso o comando falha. Na tela de Billing, em Budgets and alerts, você verá o orçamento criado com as três regras de limite. No passo 4, a mensagem de erro sobre bytes cobrados é o resultado ESPERADO: prova que o limite funciona.",
  "erros": [
   {
    "s": "Not found ou Invalid ... region-us.INFORMATION_SCHEMA retorna vazio",
    "c": "Seus jobs rodaram em outra região, ou ainda não existem jobs recentes no projeto.",
    "r": "1) Troque region-us pela região real dos seus jobs. 2) Rode de novo os comandos do passo 1. 3) Espere um minuto e repita a consulta."
   },
   {
    "s": "Access Denied: bigquery.jobs.listAll ao consultar JOBS_BY_PROJECT",
    "c": "Para listar jobs de todos os usuários é preciso uma permissão especial no projeto.",
    "r": "1) Use INFORMATION_SCHEMA.JOBS_BY_USER para ver só os seus. 2) Ou peça o papel BigQuery Resource Viewer ao administrador do projeto."
   },
   {
    "s": "Query exceeded limit for bytes billed no passo 4",
    "c": "Isso não é erro: o limite de 1 MB funcionou e bloqueou a consulta sem custo.",
    "r": "Nada a corrigir. Anote que o limite de bytes bloqueia, enquanto o budget só avisa."
   },
   {
    "s": "PERMISSION_DENIED em billing budgets create, ou gcloud billing accounts list vazio",
    "c": "Seu usuário não é administrador de faturamento (ou Costs Manager) da conta, ou o projeto não está vinculado a nenhuma conta de billing.",
    "r": "1) Peça ao administrador de faturamento o papel de Billing Account Costs Manager. 2) Ou peça que ele crie o orçamento com você olhando. 3) Se não tiver conta, vincule uma ao projeto antes."
   },
   {
    "s": "billingbudgets.googleapis.com has not been used ou SERVICE_DISABLED",
    "c": "A API de orçamentos não está habilitada no projeto.",
    "r": "1) Rode gcloud services enable billingbudgets.googleapis.com. 2) Espere 1 a 2 minutos. 3) Repita o comando de criação."
   }
  ],
  "tempo": "20 a 30 minutos",
  "custo": "US$ 0: consultas em INFORMATION_SCHEMA leem metadados pequenos e o orçamento do Cloud Billing é gratuito (apenas alerta). Exige permissão de administrador de faturamento (Billing Account Administrator ou Costs Manager) para criar o budget.",
  "porque": "Saber diagnosticar quem consome mais (bytes e slots) e quando, e distinguir alerta (budget) de limite (quota e maximum bytes billed), que a prova cobra.",
  "passos": [
   {
    "t": "Gere alguns jobs para ter o que analisar",
    "cmd": "bq query --use_legacy_sql=false --dry_run 'SELECT * FROM `bigquery-public-data.usa_names.usa_1910_2013`'\nbq query --use_legacy_sql=false 'SELECT name, SUM(number) n FROM `bigquery-public-data.usa_names.usa_1910_2013` GROUP BY name ORDER BY n DESC LIMIT 10'\nbq query --use_legacy_sql=false 'SELECT state, COUNT(*) FROM `bigquery-public-data.usa_names.usa_1910_2013` GROUP BY state'",
    "p": "O dry run mostra quantos bytes a consulta leria sem executar nem cobrar. Compare com a segunda e a terceira, que leem poucas colunas. Os jobs aparecem em INFORMATION_SCHEMA em instantes."
   },
   {
    "t": "Liste as consultas mais caras por bytes cobrados",
    "cmd": "bq query --use_legacy_sql=false 'SELECT job_id, user_email, ROUND(total_bytes_billed/POW(1024,3),3) AS gib_billed, ROUND(total_slot_ms/1000,1) AS slot_seconds, SUBSTR(query,1,80) AS q FROM `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY) AND job_type = \"QUERY\" ORDER BY total_bytes_billed DESC LIMIT 10'",
    "p": "Ajuste region-us para a região onde você roda os jobs. Ordene por bytes cobrados para custo sob demanda e por total_slot_ms para consumo em capacidade. Sempre filtre por creation_time para ler menos metadados."
   },
   {
    "t": "Veja o uso de slots ao longo do tempo",
    "cmd": "bq query --use_legacy_sql=false 'SELECT TIMESTAMP_TRUNC(period_start, MINUTE) AS minuto, ROUND(SUM(period_slot_ms)/60000, 2) AS slots_medios FROM `region-us`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT WHERE job_creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) GROUP BY minuto ORDER BY minuto DESC LIMIT 20'",
    "p": "JOBS_TIMELINE distribui o uso de slots por intervalo de tempo e mostra picos e contenção. É a base para dimensionar baseline e autoscaling de uma reserva."
   },
   {
    "t": "Teste um teto de custo por consulta",
    "cmd": "bq query --use_legacy_sql=false --maximum_bytes_billed=1000000 'SELECT * FROM `bigquery-public-data.usa_names.usa_1910_2013`'",
    "p": "Com limite de cerca de 1 MB a consulta deve falhar por exceder maximum bytes billed, sem custo. Isso demonstra um limite que de fato bloqueia, ao contrário do budget."
   },
   {
    "t": "Crie um orçamento com alertas",
    "cmd": "export PROJ=$(gcloud config get-value project)\ngcloud services enable billingbudgets.googleapis.com\ngcloud billing accounts list\ngcloud billing budgets create --billing-account=ID_DA_CONTA --display-name=cp-budget-lab --budget-amount=10USD --filter-projects=projects/${PROJ} --threshold-rule=percent=0.5 --threshold-rule=percent=0.9 --threshold-rule=percent=1.0",
    "p": "O orçamento envia alertas aos administradores da conta de faturamento ao cruzar 50%, 90% e 100% de US$ 10. Ele NÃO interrompe nenhum serviço: para corte automático é preciso usar a notificação por Pub/Sub e automação. Também é possível criar pelo console em Billing, Budgets and alerts."
   }
  ],
  "limpar": [
   "gcloud billing budgets list --billing-account=ID_DA_CONTA   (anote o nome do orçamento)",
   "gcloud billing budgets delete NOME_DO_ORCAMENTO --billing-account=ID_DA_CONTA",
   "Nenhum recurso do BigQuery foi criado; as consultas leram só tabelas públicas."
  ],
  "verificar": "A listagem de INFORMATION_SCHEMA mostra suas consultas ordenadas por GiB cobrados; a consulta com maximum_bytes_billed baixo falha com erro de limite de bytes; o budget aparece em gcloud billing budgets list com três regras de limite (0.5, 0.9 e 1.0)."
 }
};
  C.dias[20] = {
 "aula": {
  "titulo": "Observabilidade e falhas",
  "simples": {
   "analogia": "Pense no painel de um carro. A luz de óleo acesa é um **sintoma** que você sente na hora; o diagnóstico completo fica no computador da oficina, com os registros do motor (os **logs**). Em dados é igual: o alerta deve avisar o que o negócio sente, como relatório atrasado, e os logs ajudam a achar a causa depois. Agora, o restaurante lotado: se a linha está ocupada, você não liga 50 vezes seguidas. Espera 1 minuto, depois 2, depois 4 (**backoff exponencial**), e cada cliente espera um tempo um pouco diferente (**jitter**), para todos não ligarem juntos. Já apertar duas vezes o botão do elevador chama um elevador só: é a **idempotência**, repetir sem mudar o resultado. Limite da analogia: carro tem poucas luzes; um pipeline precisa de alertas escolhidos com cuidado, para não gerar ruído.",
   "pontos": [
    "Alerte sobre sintomas: dado atrasado, fila crescendo, tarefa que falhou.",
    "No Dataflow, observe atraso e frescor; no Pub/Sub, a idade da mensagem mais antiga sem confirmação.",
    "**Log sink** copia logs para BigQuery, Storage ou Pub/Sub; não retroage.",
    "Erro 429 ou 503 pede nova tentativa com **backoff e jitter**.",
    "Erro de memória em consulta se resolve reescrevendo, não comprando slots.",
    "Torne toda gravação **idempotente** e guarde o dado bruto para reprocessar."
   ],
   "paraQueServe": "Você usa isso quando um pipeline atrasa de madrugada, gera duplicatas depois de reiniciar ou publica dado errado, e você precisa achar a causa e evitar que se repita."
  },
  "glossario": [
   {
    "t": "Pub/Sub e Dataflow",
    "d": "Pub/Sub é um serviço de mensagens: um lado publica eventos numa fila e outro lado consome. Dataflow é o serviço que processa esses dados em fluxo ou em lote."
   },
   {
    "t": "Alerting policy",
    "d": "Regra que avisa pessoas (e-mail, Slack, PagerDuty) quando uma métrica passa de um limite por um tempo. Ex.: mensagem mais antiga sem confirmação acima de 10 minutos."
   },
   {
    "t": "Log sink",
    "d": "Regra que copia os logs que casam com um filtro para outro lugar, como o BigQuery, para analisar com SQL ou guardar por muito tempo."
   },
   {
    "t": "System lag e data freshness",
    "d": "System lag é quanto tempo um dado espera para ser processado. Frescor é a idade do dado mais recente que já saiu pronto. Sobem juntos quando o pipeline não acompanha."
   },
   {
    "t": "Ack e backlog",
    "d": "Ack é a confirmação de que uma mensagem foi processada. Backlog é a fila de mensagens sem ack. Ex.: a mais antiga espera 40 minutos e o limite é 10."
   },
   {
    "t": "Hot key",
    "d": "Uma chave que concentra muitos dados e sobrecarrega um único worker. Se resolve espalhando a chave em partes (salting ou fanout)."
   },
   {
    "t": "Backoff exponencial e jitter",
    "d": "Ao receber erro temporário, esperar tempos crescentes (1, 2, 4 minutos) com uma variação aleatória, em vez de insistir sem parar."
   },
   {
    "t": "Idempotência",
    "d": "Poder repetir uma operação sem mudar o resultado. Ex.: gravar com MERGE por chave única evita linhas duplicadas se o job rodar duas vezes."
   },
   {
    "t": "Dead-letter",
    "d": "Caixa de sobras para mensagens ou registros que falharam depois de várias tentativas, guardados para análise e reprocessamento."
   },
   {
    "t": "Drain",
    "d": "Forma de parar um pipeline Dataflow em fluxo terminando o trabalho em andamento, sem perder dados."
   }
  ],
  "checagem": [
   "Sem olhar: quais três sinais você alertaria em um pipeline Pub/Sub, Dataflow e BigQuery, e por quê?",
   "Por que erro 429 ou 503 pede retry com backoff e jitter, e por que o erro 403 não melhora com retry?",
   "Depois de um reinício aparecem linhas duplicadas. Qual a correção de fundo?",
   "Descobriu dado corrompido dois dias depois: que recursos você usa para voltar ao estado bom?"
  ],
  "resumo": "O que monitorar em Dataflow, Pub/Sub, BigQuery e Composer, como montar alertas e log sinks, como diagnosticar erros clássicos (quota, resources exceeded, schema, hot key, 429 e 503) e como projetar o pipeline para sobreviver a falhas.",
  "blocos": [
   {
    "t": "Ideia central: métrica de sintoma, não de causa",
    "facil": "Traduzindo: alerte sobre o que o negócio sente, como dado atrasado ou tarefa que falhou. Use logs e métricas internas depois, para achar a causa.",
    "p": [
     "Observabilidade é conseguir responder 'o pipeline está saudável e entregando no prazo?' sem entrar nas máquinas. O Google Cloud divide isso em Cloud Monitoring (métricas, painéis, alertas), Cloud Logging (logs, filtros, sinks, métricas baseadas em log) e Error Reporting e Trace para aplicações. A melhor prática é alertar sobre sintomas que o negócio sente (dado atrasado, fila crescendo, DAG falhou) e usar logs e métricas internas para achar a causa depois.",
     "Pense em três perguntas para cada pipeline: está vivo (job rodando, ambiente saudável)? está atrasado (frescor do dado, idade da fila)? está correto (erros, registros em dead-letter, validações)? A prova costuma dar um sintoma e pedir a métrica ou ação correspondente."
    ]
   },
   {
    "t": "Métricas-chave por serviço",
    "facil": "Traduzindo: cada serviço tem o seu sinal de alarme: atraso no Dataflow, mensagem antiga sem confirmação no Pub/Sub, slots no BigQuery e DAG com falha no Composer.",
    "tabela": {
     "cab": [
      "Serviço",
      "Métrica ou sinal",
      "O que indica"
     ],
     "linhas": [
      [
       "Dataflow (streaming)",
       "System lag (job/system_lag)",
       "Tempo máximo que um elemento aguarda processamento; cresce quando o pipeline não acompanha a entrada"
      ],
      [
       "Dataflow (streaming)",
       "Data freshness (idade da marca d'água; confira o nome exato da métrica no Metrics Explorer)",
       "Atraso do dado mais recente já processado em relação ao tempo do evento; frescor para o consumidor"
      ],
      [
       "Dataflow",
       "Número de vCPUs e workers, falhas de job, uso de CPU",
       "Autoscaling, gargalo de capacidade, estágio lento"
      ],
      [
       "Pub/Sub",
       "oldest_unacked_message_age",
       "Idade da mensagem mais antiga sem ack: consumidor atrasado ou travado"
      ],
      [
       "Pub/Sub",
       "num_undelivered_messages e backlog em bytes",
       "Tamanho da fila acumulada"
      ],
      [
       "Pub/Sub",
       "Mensagens no dead-letter topic",
       "Mensagens que esgotaram as tentativas de entrega"
      ],
      [
       "BigQuery",
       "Slots alocados e utilização, jobs em execução, tempo de execução de consultas",
       "Contenção de capacidade em reservas; consultas lentas"
      ],
      [
       "BigQuery",
       "INFORMATION_SCHEMA.JOBS e JOBS_TIMELINE",
       "Bytes, slots e erros por job; picos de uso ao longo do tempo"
      ],
      [
       "Cloud Composer",
       "environment/healthy (saúde do ambiente), workflow/run_count (execuções de DAG, com estado), workflow/task/run_count (tarefas), environment/scheduler_heartbeat_count, environment/dagbag_size",
       "DAG falhou, scheduler parado ou ambiente com sobrecarga"
      ]
     ]
    },
    "p": [
     "Nomes exatos de métricas mudam: use o Metrics Explorer para confirmar. O que importa na prova é a lógica: lag e frescor para Dataflow streaming, idade da mensagem mais antiga sem ack para Pub/Sub, slots e tempo de consulta para BigQuery, falha de DAG e saúde do ambiente para Composer."
    ],
    "dica": "System lag mede quanto o pipeline está atrás do processamento; data freshness mede quão antigo é o dado que já saiu. Os dois sobem juntos quando o pipeline não dá conta da entrada."
   },
   {
    "t": "Alertas e log sinks",
    "facil": "Traduzindo: o alerta avisa as pessoas certas quando uma métrica passa do limite. O log sink copia os logs escolhidos para um lugar onde você pode analisar ou guardar por mais tempo.",
    "p": [
     "Uma alerting policy tem uma condição (limiar sobre métrica por uma duração, ausência de dados, taxa de variação, ou correspondência de log) e canais de notificação (e-mail, Slack, PagerDuty, Pub/Sub, webhook). Exemplos úteis: alertar se a idade da mensagem mais antiga sem ack passar de 10 minutos por 5 minutos; alertar se o frescor do Dataflow passar do SLA; alertar se um DAG falhar; alerta por log quando aparece uma mensagem de erro específica. Métricas baseadas em log (counter ou distribution) transformam padrões nos logs em séries para alertar e criar painéis. Uptime checks e SLOs medem a disponibilidade de endpoints.",
     "Log sink é uma regra que roteia cópias de logs que casam com um filtro para um destino: bucket de log, BigQuery (análise em SQL), Cloud Storage (retenção barata e longa) ou Pub/Sub (integração com outros sistemas). O sink tem uma identidade de escrita (writer identity) que precisa de permissão no destino, por exemplo BigQuery Data Editor no dataset. Sinks só roteiam logs a partir da criação (não retroagem). Filtros de exclusão no sink _Default reduzem custo de ingestão de logs de pouco valor. Sinks agregados em pasta ou organização centralizam logs. Cada bucket de log tem retenção configurável; o padrão do _Default é 30 dias (configurável de 1 a 3.650 dias em projetos) e o do _Required é 400 dias, fixo."
    ]
   },
   {
    "t": "Troubleshooting: erros clássicos e a correção",
    "facil": "Traduzindo: cada erro clássico tem um diagnóstico e uma correção típicos. Erro temporário se resolve esperando e tentando de novo; erro de lógica ou de permissão, não.",
    "tabela": {
     "cab": [
      "Sintoma",
      "Causa provável",
      "Correção"
     ],
     "linhas": [
      [
       "Quota exceeded (BigQuery, APIs)",
       "Excesso de operações por janela (muitos jobs de carga, DML ou atualizações de metadados), ou cota customizada atingida",
       "Agrupar em lotes maiores, usar carga em lote ou Storage Write API em vez de milhares de pequenas operações, espaçar, solicitar aumento de cota se for o caso; confira os limites atuais"
      ],
      [
       "Resources exceeded during query execution",
       "Consulta usa mais memória que o permitido por stage: ORDER BY global em volume enorme, window function em partição gigante, ARRAY_AGG ou DISTINCT em chave concentrada, skew",
       "Remover ORDER BY desnecessário ou usar LIMIT, filtrar antes, agregar em etapas, tratar chave concentrada; mais slots não resolvem um stage que estoura memória por falta de paralelismo"
      ],
      [
       "Schema mismatch na carga ou insert em streaming",
       "Origem trouxe campo novo, tipo diferente ou campo ausente em coluna obrigatória",
       "Atualizar o schema (adicionar coluna NULLABLE, opções de schema update), validar antes e enviar registros inválidos para dead-letter"
      ],
      [
       "Hot key no Dataflow (GroupByKey ou Combine lento em um worker)",
       "Uma chave concentra grande parte dos elementos",
       "Combine com fanout, salting (adicionar sufixo à chave e agregar em duas etapas), pré-agregação"
      ],
      [
       "HTTP 429 (too many requests) e 503 (unavailable)",
       "Limite de taxa ou indisponibilidade transitória do serviço",
       "Retry com exponential backoff e jitter, respeitando idempotência; nunca laço de retry imediato; reduzir taxa e usar flow control"
      ],
      [
       "Job atrasado com muita espera",
       "Falta de capacidade (slots) ou autoscaling no limite",
       "Aumentar reserva ou max workers; checar JOBS_TIMELINE"
      ]
     ]
    },
    "p": [
     "429 e 503 são sinais transitórios: o cliente deve tentar de novo com backoff exponencial (esperas crescentes) e jitter (aleatoriedade para que milhares de clientes não retentem juntos). As bibliotecas oficiais do Google já fazem isso para operações idempotentes. O retry só é seguro se a operação é idempotente, ou se você usa identificadores únicos para deduplicar. Erros 4xx de lógica (400, 403 de permissão, 404) não melhoram com retry."
    ],
    "armadilha": "Surpresas de billing costumam vir de SELECT * sem filtro de partição em tabela enorme, streaming inserts e tráfego entre regiões, clusters ociosos e logs em excesso. Ative a exportação do billing para BigQuery, budgets com alertas e analise por labels e projetos."
   },
   {
    "t": "Falhas e mitigação: reiniciar sem duplicar nem perder",
    "facil": "Traduzindo: assuma que tudo falha e reinicia. Faça cada gravação poder ser repetida sem duplicar, e guarde o dado bruto para reprocessar se algo sair errado.",
    "p": [
     "Sistemas de dados distribuídos falham o tempo todo: workers morrem, mensagens são reentregues, tarefas reiniciam. O projeto deve assumir isso. A regra central é idempotência: reexecutar a mesma operação produz o mesmo resultado. Técnicas: gravar com MERGE por chave única, usar chaves determinísticas (ou insertId em streaming legado) para deduplicar, gravar em partições com WRITE_TRUNCATE por data de execução, usar Storage Write API com semântica adequada, e escrever saídas em arquivos nomeados de forma determinística. O Pub/Sub entrega pelo menos uma vez por padrão, então o consumidor deve tolerar duplicatas; há entrega exactly-once para assinaturas pull em uma região, que reduz mas não elimina a necessidade de idempotência fim a fim. O Dataflow garante processamento exactly-once dentro do pipeline, mas o efeito no destino depende do conector.",
     "Tolerância por localização: zona (workers do Dataflow se redistribuem; Dataproc HA com 3 masters; Composer em modo resiliente multi-zona; Cloud SQL HA), região (rodar novamente o job em outra região usando os dados de origem replicados; Pub/Sub é global em endpoints, mas guarde snapshot e retenção; BigQuery managed DR; veja o dia 16). Dataflow permite drain (termina o trabalho em andamento sem perder dados), update (substitui o pipeline compatível sem parar) e snapshot de streaming para recomeçar.",
     "Dado corrompido ou faltando: mantenha uma camada bruta imutável (Cloud Storage ou tabela bruta) para poder reprocessar; use dead-letter para isolar o que falhou; reprocessamento deve ser idempotente; para reler mensagens do Pub/Sub use seek para timestamp ou snapshot dentro do período de retenção (retenção da assinatura até 7 dias, do tópico até 31 dias, confira os limites atuais); no BigQuery use time travel e snapshots para voltar ao estado anterior à carga defeituosa; valide com assertions e data quality antes de publicar. Para dado faltando, backfill por janela de tempo, sem reabrir o pipeline inteiro."
    ],
    "lista": [
     "Duplicatas depois de reinício: tornar a escrita idempotente (MERGE, chave única).",
     "Mensagem venenosa travando o consumo: dead-letter com número máximo de tentativas.",
     "Dado ruim já publicado: reprocessar a partir da camada bruta e restaurar com time travel ou snapshot.",
     "Falha de região: pipeline reproduzível em outra região, dados replicados e infraestrutura como código."
    ]
   }
  ],
  "exemplo": {
   "t": "Pipeline de eventos que atrasa de madrugada",
   "texto": "Um pipeline lê eventos do Pub/Sub, processa no Dataflow e grava no BigQuery. O painel mostra, às 3h, a idade da mensagem mais antiga sem ack subindo para 40 minutos e o system lag do Dataflow crescendo, enquanto o frescor dos dados piora. Passo 1: sintoma confirmado, o pipeline não acompanha a entrada. Passo 2: nos logs do Dataflow aparece aviso de hot key: um único customer_id responde por boa parte do tráfego, e o estágio de agregação está concentrado em um worker. Passo 3: correção com Combine com fanout (ou salting da chave e agregação em duas etapas). Passo 4: as chamadas do pipeline a uma API externa retornam 429; troca-se o laço de retry imediato por backoff exponencial com jitter. Passo 5: como o worker reiniciou durante o problema, apareceram linhas duplicadas; a escrita passa a ser um MERGE por event_id. Passo 6: três alertas permanentes: idade da mensagem mais antiga sem ack acima de 10 minutos, frescor acima do SLA e mensagens no dead-letter acima de zero, notificando o on-call. Passo 7: um log sink envia erros do Dataflow ao BigQuery para análise em SQL, com retenção longa."
  },
  "prova": [
   "'Streaming pipeline is falling behind' ou 'data is stale' aponta system lag e data freshness; 'subscriber is slow' aponta idade da mensagem mais antiga sem ack no Pub/Sub; 'DAG failed' aponta alerta sobre métricas ou falhas do Composer.",
   "'Analyze logs with SQL' ou 'retain logs for years' aponta log sink para BigQuery ou Cloud Storage; 'notify when error appears in logs' aponta métrica ou alerta baseado em log.",
   "'Resources exceeded' quase sempre é ORDER BY, window function ou skew, e a correção é reescrever a consulta, não comprar slots; 'hot key' pede fanout ou salting; '429 or 503' pede backoff exponencial com jitter.",
   "'Duplicates after retry or restart' pede idempotência (MERGE ou chave única); 'poison message' pede dead-letter; 'corrupt data was published' pede camada bruta, reprocessamento e time travel ou snapshot.",
   "'Budgets alert but do not block': para surpresas de custo, billing export, budgets e labels."
  ],
  "explique": "Descreva como você monitoraria um pipeline Pub/Sub, Dataflow e BigQuery: quais três sinais você alertaria, por quê, e o que você faria, passo a passo, quando um reinício causa duplicatas e quando descobre dado corrompido dois dias depois."
 },
 "cartoes": [
  {
   "id": "d20c1",
   "t": "5.4",
   "f": "System lag versus data freshness no Dataflow streaming?",
   "v": "System lag é o tempo máximo que um elemento espera para ser processado. Data freshness é a idade da marca d'água (atraso do dado mais recente já processado). Ambos sobem quando o pipeline não acompanha a entrada."
  },
  {
   "id": "d20c2",
   "t": "5.4",
   "f": "Qual métrica do Pub/Sub indica consumidor atrasado ou travado?",
   "v": "oldest_unacked_message_age (idade da mensagem mais antiga sem ack). Complementam num_undelivered_messages e o backlog em bytes."
  },
  {
   "id": "d20c3",
   "t": "5.4",
   "f": "O que monitorar no Cloud Composer?",
   "v": "Saúde do ambiente, falhas de execução de DAG e de tarefas, heartbeat do scheduler e sobrecarga. Alerta sobre DAG falhado com canal de notificação (confira os nomes das métricas no Metrics Explorer)."
  },
  {
   "id": "d20c4",
   "t": "5.4",
   "f": "O que é uma alerting policy e quais canais de notificação existem?",
   "v": "Condição (limiar, ausência de dados, taxa ou log) mais canais: e-mail, Slack, PagerDuty, Pub/Sub e webhook. Alertar em sintomas de negócio (atraso, falha) e não em causas."
  },
  {
   "id": "d20c3b",
   "t": "5.4",
   "f": "Qual a função de um log sink e do que ele precisa?",
   "v": "Roteia cópias dos logs que casam com um filtro para BigQuery, Cloud Storage, Pub/Sub ou outro bucket de log. A writer identity do sink precisa de permissão no destino. Não retroage a logs anteriores."
  },
  {
   "id": "d20c5",
   "t": "5.4",
   "f": "Quando escolher sink para BigQuery e quando para Cloud Storage?",
   "v": "BigQuery para análise de logs em SQL. Cloud Storage para retenção longa e barata, auditoria e arquivo. Pub/Sub para integrar com sistemas externos em tempo real."
  },
  {
   "id": "d20c6",
   "t": "5.4",
   "f": "Causa e correção de 'Resources exceeded during query execution' no BigQuery?",
   "v": "Um stage estourou memória (ORDER BY global enorme, window em partição gigante, ARRAY_AGG ou DISTINCT em chave concentrada). Reescreva: remova ORDER BY, filtre antes, agregue em etapas. Mais slots não resolvem."
  },
  {
   "id": "d20c7",
   "t": "5.4",
   "f": "Como tratar 'quota exceeded' por excesso de operações pequenas no BigQuery?",
   "v": "Agrupe em lotes maiores (carga em lote ou Storage Write API em vez de muitos DML ou jobs minúsculos), espace as operações e, se justificado, peça aumento de cota. Confira os limites atuais na documentação."
  },
  {
   "id": "d20c8",
   "t": "5.4",
   "f": "O que fazer com schema mismatch em carga ou streaming?",
   "v": "Atualizar o schema (adicionar coluna NULLABLE, opções de atualização de schema) e validar antes da gravação; registros inválidos vão para dead-letter para o pipeline continuar."
  },
  {
   "id": "d20c9",
   "t": "5.4",
   "f": "O que é hot key no Dataflow e como corrigir?",
   "v": "Uma chave concentra boa parte dos elementos e sobrecarrega um worker. Corrija com Combine com fanout, salting da chave (agregação em duas etapas) ou pré-agregação."
  },
  {
   "id": "d20c10",
   "t": "5.4",
   "f": "Como reagir a respostas HTTP 429 e 503?",
   "v": "Retry com backoff exponencial e jitter, apenas em operações idempotentes. Sem laço de retry imediato. Erros de lógica como 400 e 403 não melhoram com retry."
  },
  {
   "id": "d20c11",
   "t": "5.5",
   "f": "Por que idempotência é a regra central de tolerância a falhas?",
   "v": "Reinícios e reentregas (Pub/Sub entrega pelo menos uma vez) repetem operações. Se reexecutar gera o mesmo resultado (MERGE por chave única, chave determinística), não há duplicata nem perda."
  },
  {
   "id": "d20c12",
   "t": "5.5",
   "f": "Para que servem drain, update e snapshot no Dataflow?",
   "v": "Drain termina o trabalho em andamento sem perder dados antes de parar. Update substitui um pipeline compatível sem parar. Snapshot de streaming guarda estado para recomeçar."
  },
  {
   "id": "d20c13",
   "t": "5.5",
   "f": "Como reprocessar quando dado corrompido já foi publicado?",
   "v": "Manter camada bruta imutável (Cloud Storage), corrigir a lógica e reprocessar de forma idempotente; restaurar tabelas com time travel ou snapshot do BigQuery; validar com assertions antes de publicar."
  },
  {
   "id": "d20c14",
   "t": "5.5",
   "f": "Como reler mensagens já consumidas no Pub/Sub?",
   "v": "Seek para timestamp ou snapshot, dentro do período de retenção da assinatura ou do tópico (confira os limites atuais, que chegam a 7 e 31 dias). Fora disso, só pelo arquivo bruto."
  },
  {
   "id": "d20c15",
   "t": "5.4",
   "f": "Quais as causas comuns de surpresas de billing em dados e como detectar?",
   "v": "SELECT * sem filtro de partição, streaming inserts, tráfego entre regiões, clusters ociosos e excesso de logs. Detecte com exportação do billing para BigQuery, budgets, labels e análise de INFORMATION_SCHEMA.JOBS."
  }
 ],
 "questoes": [
  {
   "id": "d20q1",
   "s": 5,
   "t": "5.4",
   "e": "A streaming Dataflow pipeline that feeds a real-time dashboard sometimes falls behind during traffic peaks. The operations team wants to be alerted when the data shown becomes older than 5 minutes compared with event time. Which signal is the most direct to alert on?",
   "o": [
    "The number of Dataflow workers",
    "The Dataflow data freshness (watermark age) metric",
    "The BigQuery slot utilization of the project",
    "The Cloud Storage bucket size"
   ],
   "c": [
    1
   ],
   "x": "A opção “The Dataflow data freshness (watermark age) metric” está certa: a idade da marca d'água (data freshness) mede o atraso do dado mais recente processado em relação ao tempo do evento, exatamente o requisito de 5 minutos. “The number of Dataflow workers” erra: o número de workers é uma causa ou resposta de autoscaling, não o sintoma de atraso percebido. “The BigQuery slot utilization of the project” erra: slots do BigQuery não medem a latência do pipeline Dataflow. “The Cloud Storage bucket size” erra: tamanho de bucket não indica atraso de processamento."
  },
  {
   "id": "d20q2",
   "s": 5,
   "t": "5.4",
   "e": "An application consumes messages from a Pub/Sub pull subscription. Occasionally the consumer hangs and messages pile up without anyone noticing for hours. What should the data engineer configure to detect this quickly?",
   "o": [
    "A log sink that exports Pub/Sub admin logs to BigQuery",
    "A Cloud Monitoring alerting policy on the subscription oldest unacked message age",
    "A budget alert on the Pub/Sub topic",
    "A larger retention period on the topic"
   ],
   "c": [
    1
   ],
   "x": "A opção “A Cloud Monitoring alerting policy on the subscription oldest unacked message age” está certa: a idade da mensagem mais antiga sem ack cresce quando o consumidor trava, e um alerta com limiar e duração a detecta rapidamente. “A log sink that exports Pub/Sub admin logs to BigQuery” erra: logs de administração registram mudanças de configuração, não o atraso de consumo. “A budget alert on the Pub/Sub topic” erra: budget alerta sobre gasto, não sobre atraso. “A larger retention period on the topic” erra: aumentar a retenção apenas guarda mais mensagens e não avisa de nada."
  },
  {
   "id": "d20q3",
   "s": 5,
   "t": "5.4",
   "e": "A nightly Cloud Composer DAG that loads finance data sometimes fails and the team only discovers it the next afternoon. They want the on-call engineer to be paged within minutes of a DAG failure with the least custom code. What should they do?",
   "o": [
    "Create a Cloud Monitoring alerting policy on Composer DAG run failures (or a log-based alert) with a notification channel to the paging tool",
    "Increase the number of Airflow workers",
    "Export the Composer logs to Cloud Storage and review them weekly",
    "Disable retries on all tasks"
   ],
   "c": [
    0
   ],
   "x": "A opção “Create a Cloud Monitoring alerting policy on Composer DAG run failures (or a log-based…” está certa: um alerta no Cloud Monitoring sobre falhas de execução de DAG (ou alerta baseado em log) com canal de notificação para a ferramenta de plantão avisa em minutos e quase sem código. “Increase the number of Airflow workers” erra: mais workers melhoram capacidade, não notificam falhas. “Export the Composer logs to Cloud Storage and review them weekly” erra: revisão semanal é o oposto de notificação rápida. “Disable retries on all tasks” erra: desativar retries piora a confiabilidade e não notifica ninguém."
  },
  {
   "id": "d20q4",
   "s": 5,
   "t": "5.4",
   "e": "A company must keep Dataflow and BigQuery error logs for two years and wants analysts to query them with SQL to find recurring failure patterns. What is the most appropriate configuration?",
   "o": [
    "Leave logs in the _Default bucket and increase nothing",
    "Create a log sink with a filter for the relevant errors that routes to a BigQuery dataset, and grant the sink writer identity BigQuery Data Editor on that dataset",
    "Print the logs and archive them",
    "Create a Pub/Sub topic and store the messages in memory"
   ],
   "c": [
    1
   ],
   "x": "A opção “Create a log sink with a filter for the relevant errors that routes to a BigQuery…” está certa: o sink roteia os logs filtrados para o BigQuery, onde há retenção configurável e análise em SQL; a identidade de escrita do sink precisa de permissão de escrita no dataset. “Leave logs in the _Default bucket and increase nothing” erra: o bucket _Default retém por 30 dias por padrão e não permite análise em SQL por si só. “Print the logs and archive them” erra: imprimir e arquivar não é analisável nem escalável. “Create a Pub/Sub topic and store the messages in memory” erra: Pub/Sub não é armazenamento de longo prazo e guardar em memória perde os dados."
  },
  {
   "id": "d20q5",
   "s": 5,
   "t": "5.4",
   "e": "A BigQuery query that sorts a 4 TB table with ORDER BY on all rows and no LIMIT fails with the error: Resources exceeded during query execution. Buying more slots does not fix it. What is the best fix?",
   "o": [
    "Increase the query priority to batch",
    "Remove the unnecessary global ORDER BY (or apply LIMIT, or sort only the final small result) and filter or aggregate earlier",
    "Switch the table to physical storage billing",
    "Add a materialized view over the whole table"
   ],
   "c": [
    1
   ],
   "x": "A opção “Remove the unnecessary global ORDER BY (or apply LIMIT, or sort only the final small…” está certa: o ORDER BY global força o resultado completo a passar por um único stage de ordenação que estoura memória, e mais slots não aumentam essa memória; remover a ordenação, usar LIMIT ou ordenar só o resultado final reduzido resolve. “Increase the query priority to batch” erra: prioridade batch muda quando executa, não quanto de memória cada stage usa. “Switch the table to physical storage billing” erra: o modelo de cobrança de armazenamento não afeta recursos de execução. “Add a materialized view over the whole table” erra: uma materialized view sobre a tabela inteira não elimina a ordenação do resultado completo."
  },
  {
   "id": "d20q6",
   "s": 5,
   "t": "5.4",
   "e": "A streaming pipeline writes JSON events into BigQuery. After an upstream team added a new field and sometimes sends malformed values, the pipeline reports schema mismatch errors and rows are rejected. Choose two actions that fix the problem and keep the pipeline running.",
   "o": [
    "Add the new field to the destination table schema as a NULLABLE column",
    "Route rows that fail validation to a dead-letter table or topic for later analysis and reprocessing",
    "Delete the destination table and recreate it every night",
    "Drop all rows that contain unknown fields without recording them",
    "Turn off the upstream system until the schema is stable"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Add the new field to the destination table schema as a NULLABLE column” e “Route rows that fail validation to a dead-letter table or topic for later analysis…” estão corretas: adicionar a coluna NULLABLE acomoda o campo novo sem quebrar os dados antigos, e o dead-letter isola os registros inválidos sem parar o fluxo e sem perdê-los. “Delete the destination table and recreate it every night” erra: recriar a tabela perde histórico e não resolve o desencontro de schema. “Drop all rows that contain unknown fields without recording them” erra: descartar sem registrar perde dados silenciosamente. “Turn off the upstream system until the schema is stable” erra: parar a origem interrompe o negócio e não corrige o pipeline."
  },
  {
   "id": "d20q7",
   "s": 5,
   "t": "5.4",
   "e": "A Dataflow batch job that aggregates clicks by user_id is slow because one worker is busy while the others are idle. The logs report a hot key, and one user_id represents 60 percent of all records. What is the best remedy?",
   "o": [
    "Use a larger machine type for every worker",
    "Use Combine with fanout or salt the key and aggregate in two stages so the work for the hot key is spread across workers",
    "Increase the maximum number of workers only",
    "Convert the pipeline to a streaming pipeline"
   ],
   "c": [
    1
   ],
   "x": "A opção “Use Combine with fanout or salt the key and aggregate in two stages so the work…” está certa: fanout ou salting distribui o trabalho da chave quente em vários workers e combina os resultados parciais depois. “Use a larger machine type for every worker” erra: máquinas maiores não eliminam o fato de uma só chave ir para um só worker. “Increase the maximum number of workers only” erra: mais workers ficam ociosos, pois a chave quente continua sendo processada em um único lugar. “Convert the pipeline to a streaming pipeline” erra: o modo de execução não muda a concentração de dados na chave."
  },
  {
   "id": "d20q8",
   "s": 5,
   "t": "5.4",
   "e": "A pipeline calls an external enrichment API and sometimes receives HTTP 429 and 503 responses, causing task failures. The calls are idempotent. What is the recommended handling?",
   "o": [
    "Retry immediately in a tight loop until the call succeeds",
    "Ignore failed calls and continue without enrichment",
    "Retry with exponential backoff and jitter, with a maximum number of attempts, and send exhausted records to a dead-letter destination",
    "Increase the API client timeout to 10 minutes and do not retry"
   ],
   "c": [
    2
   ],
   "x": "A opção “Retry with exponential backoff and jitter, with a maximum number of attempts, and send…” está certa: 429 e 503 são transitórios; backoff exponencial com jitter evita sobrecarregar o serviço e o dead-letter guarda o que esgotou as tentativas. “Retry immediately in a tight loop until the call succeeds” erra: retry imediato em laço agrava a sobrecarga e pode piorar o 429. “Ignore failed calls and continue without enrichment” erra: ignorar perde enriquecimento silenciosamente. “Increase the API client timeout to 10 minutes and do not retry” erra: timeout longo não resolve limite de taxa nem indisponibilidade, e sem retry a falha continua."
  },
  {
   "id": "d20q9",
   "s": 5,
   "t": "5.5",
   "e": "After a Dataflow worker restart and Pub/Sub redelivery, a BigQuery reporting table contains duplicate events. The business requires exactly one row per event_id regardless of retries. What is the best approach?",
   "o": [
    "Reduce the Pub/Sub ack deadline to avoid redelivery",
    "Make the write idempotent by deduplicating on a unique event_id, for example with a MERGE into the target table",
    "Run the pipeline only once a month",
    "Add more workers to avoid restarts"
   ],
   "c": [
    1
   ],
   "x": "A opção “Make the write idempotent by deduplicating on a unique event_id, for example with a MERGE…” está certa: com escrita idempotente por chave única (MERGE por event_id), reprocessar ou reentregar não gera duplicatas, o que é necessário em sistemas com entrega pelo menos uma vez. “Reduce the Pub/Sub ack deadline to avoid redelivery” erra: reduzir o prazo de ack provoca mais reentregas, não menos. “Run the pipeline only once a month” erra: mudar a frequência não resolve duplicatas. “Add more workers to avoid restarts” erra: reinícios acontecem mesmo com mais workers; é preciso tolerá-los, não evitá-los."
  },
  {
   "id": "d20q10",
   "s": 5,
   "t": "5.5",
   "e": "Two days after deployment, a team discovers that a faulty transformation has written wrong values into a BigQuery reporting table. Raw events are archived in Cloud Storage. Choose two actions to recover correctly.",
   "o": [
    "Fix the transformation and reprocess the archived raw events with an idempotent job",
    "Restore the table to its state before the bad deployment using time travel or a snapshot, if within the window",
    "Delete the raw archive to save cost",
    "Ask users to ignore the wrong values",
    "Rely on the Pub/Sub topic alone, because acknowledged messages are always retained forever"
   ],
   "c": [
    0,
    1
   ],
   "x": "As opções “Fix the transformation and reprocess the archived raw events with an idempotent job” e “Restore the table to its state before the bad deployment using time travel or a snapshot…” estão corretas: corrigir a lógica e reprocessar a camada bruta de forma idempotente recompõe os dados certos, e time travel ou snapshot devolve a tabela ao estado anterior à carga defeituosa (dentro da janela). “Delete the raw archive to save cost” erra: apagar o arquivo bruto elimina a única fonte de reprocessamento. “Ask users to ignore the wrong values” erra: ignorar valores errados compromete as decisões. “Rely on the Pub/Sub topic alone, because acknowledged messages are always retained forever” erra: mensagens confirmadas não são retidas para sempre; o Pub/Sub tem retenção limitada e a reentrega depende de seek dentro desse limite."
  }
 ]
};
})(typeof window !== 'undefined' ? window : globalThis);
