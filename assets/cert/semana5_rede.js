(function (root) {
  var C = root.CP_CERT_CONTEUDO = root.CP_CERT_CONTEUDO || { dias: {} };
  C.dias[24] = {
    minQuestoes: 10,
    aula: {
      titulo: "Rede e segurança em cenários",
      resumo: "Rede para engenheiro de dados: VPC, firewall, Private Google Access, Cloud NAT, peering e Shared VPC, Dataflow sem IP externo, conectividade híbrida, VPC Service Controls, chaves de criptografia e IAM em cenários da prova.",
      simples: {
        analogia: "Pense num condomínio com vários prédios. A rua do condomínio é a **VPC**: uma rede só, que atravessa vários bairros. Cada prédio fica em um bairro e é uma **sub-rede**. A **portaria** é o firewall: o porteiro barra quem chega sem ser esperado, mas deixa os moradores saírem, e a resposta de uma conversa que eles começaram volta sem novo cadastro. Apartamento sem telefone externo só liga para dentro do condomínio. Para falar com a prefeitura existe um ramal interno só para ela. Para ligar a uma empresa qualquer da cidade, existe uma central que faz a chamada por você, mas não aceita ligação de estranho. Já a **cerca do bairro** vigia os malotes que saem com documentos, e o **crachá** diz quem pode abrir cada sala. Limite da analogia: o porteiro de verdade olha o rosto. O firewall olha só endereço, porta e etiqueta, nunca a pessoa.",
        pontos: [
          "A **VPC** é global e cada **sub-rede** mora em uma região.",
          "O **firewall** barra por padrão o que entra e deixa sair o que você começou.",
          "Sem IP externo, use **Private Google Access** para APIs do Google e **Cloud NAT** para a internet.",
          "O **peering** não é transitivo: A falar com B e B com C não liga A a C.",
          "**VPC Service Controls** segura dados nas APIs; firewall segura pacotes; **IAM** diz quem pode o quê.",
          "Chave comprometida: nova versão, reescrever dados, validar, só então desabilitar a antiga."
        ],
        paraQueServe: "Você usa isso quando um pipeline em produção roda sem IP externo, fala com banco privado ou com o datacenter da empresa, e precisa de segurança sem quebrar o fluxo dos dados."
      },
      glossario: [
        { t: "VPC (Virtual Private Cloud)", d: "Sua rede privada dentro do Google Cloud. Ela é global: uma só rede pode ter sub-redes em várias regiões." },
        { t: "Sub-rede (subnet)", d: "Uma faixa de endereços IP que mora em uma única região. As máquinas e os workers do Dataflow recebem IP de uma sub-rede." },
        { t: "Firewall (regra de firewall)", d: "Regra que libera ou barra tráfego por direção (entrada ou saída), porta e origem. É stateful: se a ida foi permitida, a volta também é." },
        { t: "Network tag", d: "Etiqueta de texto colocada numa máquina para que uma regra de firewall a escolha. Quem edita a máquina consegue mudar a etiqueta." },
        { t: "Private Google Access (PGA)", d: "Opção ligada por sub-rede que deixa máquinas só com IP interno chamarem as APIs do Google, como BigQuery e Cloud Storage." },
        { t: "Cloud NAT", d: "Serviço que deixa máquinas sem IP externo saírem para a internet. Ele não aceita conexões novas vindas de fora." },
        { t: "VPC peering", d: "Liga duas VPCs por IP interno. Troca só rotas, e não é transitivo: não repassa tráfego para uma terceira rede." },
        { t: "Shared VPC", d: "Uma VPC no projeto host que projetos de serviço usam. A equipe de rede cuida dela e as equipes de dados criam recursos nela." },
        { t: "VPC Service Controls (perímetro)", d: "Cerca ao redor de projetos e serviços como BigQuery e Cloud Storage. Barra copiar dados para fora, mesmo com credencial válida." },
        { t: "CMEK, CSEK e EKM", d: "Três formas de ter mais controle da chave: CMEK fica no Cloud KMS, CSEK é entregue por você a cada uso, EKM fica num sistema externo." }
      ],
      blocos: [
        {
          t: "Mapa mental: VPC, sub-redes, rotas e firewall",
          facil: "Traduzindo: a rede é uma só e global, mas cada sub-rede mora numa região. As regras de firewall decidem quem entra e quem sai, e as rotas decidem por onde o pacote vai.",
          p: [
            "Comece pelo desenho. Uma **VPC** é um recurso **global**. Dentro dela, cada **sub-rede** é **regional**. Duas máquinas em regiões diferentes, na mesma VPC, falam por IP interno sem VPN.",
            "As **rotas** dizem para onde cada pacote vai. A rota padrão manda o tráfego para a internet. Rotas de sub-rede são criadas sozinhas.",
            "O **firewall** é o porteiro. Regras têm direção (**ingress** é entrada, **egress** é saída), prioridade de 0 a 65535 (número menor vence), ação (permitir ou negar), porta e protocolo.",
            "O firewall é **stateful**. Se uma conexão foi permitida em uma direção, a resposta volta sem outra regra.",
            "Por padrão, o que **entra** é **negado** e o que **sai** é **permitido**. A boa prática é bloquear tudo e liberar só o necessário.",
            "Uma regra escolhe seus alvos de três jeitos: todas as máquinas da rede, as que têm certa **network tag**, ou as que rodam com certa **conta de serviço**. Tags e contas de serviço não se misturam na mesma regra."
          ],
          dica: "Na prova, 'só as máquinas do pipeline podem receber essa regra, e ninguém deve conseguir mudar isso editando a VM' aponta para **conta de serviço** como alvo, não tag.",
          armadilha: "Tag é texto livre. Quem tem permissão de editar a instância muda a tag e, com isso, muda quais regras valem para ela."
        },
        {
          t: "Como os serviços de dados falam com a rede",
          facil: "Traduzindo: máquina sem IP externo só alcança a própria VPC. Para APIs do Google use Private Google Access. Para a internet use Cloud NAT. Para um serviço em outra rede use Private Service Connect.",
          p: [
            "Uma máquina tem **IP interno**, que vale dentro da VPC, e pode ter **IP externo**, que a expõe à internet. Em ambiente de dados seguro, o comum é **não** usar IP externo.",
            "Sem IP externo, a máquina só alcança o que está na VPC e nas redes ligadas a ela. Aí entram três ferramentas, cada uma para um destino diferente.",
            "**Private Google Access** é ligado **por sub-rede**. Ele deixa a máquina só com IP interno chamar as APIs do Google (BigQuery, Cloud Storage, Pub/Sub). Não leva a máquina à internet em geral.",
            "**Cloud NAT** é regional. Deixa máquinas sem IP externo **iniciarem** conexões para a internet, por exemplo baixar um pacote. Ele só aceita respostas, nunca conexão nova de fora. Para APIs do Google com PGA, o tráfego segue pelo PGA, não pelo NAT.",
            "**Private Service Connect (PSC)** cria um ponto de acesso com IP interno na sua VPC que leva a um serviço em outra rede ou projeto. Serve, por exemplo, para o Cloud SQL ser alcançado por várias VPCs."
          ],
          tabela: {
            cab: ["Preciso falar com...", "Ferramenta", "Sentido", "Ponto de atenção"],
            linhas: [
              ["APIs do Google (BigQuery, Storage)", "Private Google Access", "Saída da sua VPC", "Ligar na sub-rede dos workers"],
              ["Internet pública (PyPI, Maven)", "Cloud NAT", "Só saída; resposta volta", "Regional; não recebe conexão nova"],
              ["Serviço em outra rede (ex.: Cloud SQL privado)", "Private Service Connect", "Endpoint com IP interno", "Funciona com várias VPCs"],
              ["Outra VPC sua", "Peering ou Shared VPC", "IP interno", "Peering não é transitivo"]
            ]
          },
          dica: "Pergunte primeiro: **para onde** o tráfego vai? API do Google, internet ou serviço privado em outra rede? Cada resposta tem uma ferramenta.",
          armadilha: "Private Google Access **não** dá acesso à internet. Se o job precisa baixar um pacote do PyPI ou do Maven, precisa de Cloud NAT (ou de dependências já empacotadas)."
        },
        {
          t: "Peering, Shared VPC e o problema do Cloud SQL privado",
          facil: "Traduzindo: peering liga duas redes só entre elas, sem repasse para uma terceira. Shared VPC coloca vários projetos na mesma rede. Escolha pelo número de projetos e por quem administra a rede.",
          p: [
            "**VPC peering** liga duas VPCs por IP interno, mesmo em projetos ou organizações diferentes. Só **rotas** são trocadas. As redes continuam administradas separadamente.",
            "O peering **não é transitivo**. Se A tem peering com B e B com C, A **não** alcança C. Para A falar com C, crie um peering direto entre eles.",
            "Peering também exige faixas de IP **sem sobreposição**. Regras de firewall **não** são trocadas: cada rede precisa das suas regras. Tags e contas de serviço não podem ser citadas entre redes.",
            "**Shared VPC** funciona diferente. Um **projeto host** tem a rede. **Projetos de serviço** são ligados a ele e usam as sub-redes compartilhadas. A equipe de rede administra a rede num lugar só, e as equipes de dados criam recursos nos seus projetos.",
            "Escolha **Shared VPC** quando muitos projetos da mesma organização precisam de uma rede e regras centrais. Escolha **peering** para ligar redes que já são separadas, até de organizações diferentes.",
            "O caso clássico: o projeto A liga por peering ao projeto B, e o Cloud SQL com IP privado está na rede gerenciada ligada a B. Esperar que A alcance o banco passando por B é esperar transitividade, e não funciona.",
            "A saída é dar ao A um caminho próprio. O Cloud SQL oferece **Private Service Connect**, que permite conectar de várias redes. Outra opção é colocar os projetos na mesma **Shared VPC**."
          ],
          tabela: {
            cab: ["Critério", "VPC peering", "Shared VPC"],
            linhas: [
              ["Escopo", "Duas redes, até de organizações diferentes", "Projetos da mesma organização"],
              ["Quem administra", "Cada rede, separadamente", "Equipe de rede, no projeto host"],
              ["Firewall", "Cada rede tem as suas regras", "Regras centrais na rede compartilhada"],
              ["Transitividade", "Não é transitivo", "Mesma rede, sem salto entre redes"],
              ["Quando usar", "Ligar redes independentes", "Padronizar rede para muitos projetos"]
            ]
          },
          dica: "Se o enunciado diz 'A fala com B, B fala com C, A precisa de C', a resposta tem a palavra **transitive**: peering direto A-C, ou Shared VPC.",
          armadilha: "Não adianta abrir firewall em B para 'passar' o tráfego de A. O problema é de rota e de peering, não de porta."
        },
        {
          t: "Dataflow, Dataproc, Cloud SQL, Datastream e Composer",
          facil: "Traduzindo: worker sem IP externo precisa de Private Google Access. Workers precisam falar entre si por portas liberadas no firewall, a menos que o job use Streaming Engine ou Shuffle. Banco privado exige um caminho de rede.",
          p: [
            "**Dataflow sem IP externo.** Por padrão, os workers recebem IP externo e interno. Para desligar, use `--usePublicIps=false` em Java ou `--no_use_public_ips` em Python e Go, junto com `--network` ou `--subnetwork`.",
            "Sem IP externo, os workers só alcançam recursos da mesma VPC, de uma Shared VPC ou de rede ligada por peering. As APIs do Google exigem **Private Google Access** na sub-rede. Sem ele, o job fica sem alcançar BigQuery, Storage ou Pub/Sub. Internet exige **Cloud NAT**.",
            "Em Python, empacote as dependências antes. Sem IP externo e sem NAT, o worker não baixa pacote do PyPI na hora.",
            "**Firewall entre workers.** Eles trocam dados pela porta **TCP 12345** em jobs de streaming e **TCP 12346** em jobs de batch. A regra deve permitir esse tráfego entre os workers.",
            "O Dataflow coloca nos workers a tag padrão **dataflow**. Para tags próprias, use a opção de serviço `use_network_tags`, e crie as regras com essas tags. Não dá para trocar as tags depois que o job começa.",
            "Se o job usa **Streaming Engine** ou **Dataflow Shuffle**, as regras entre workers nessas portas **não** são necessárias. Ainda assim, o acesso às APIs do Google continua obrigatório.",
            "**Dataproc com IP interno.** É o padrão nas imagens 2.2 em diante. O Dataproc liga o Private Google Access na sub-rede. Libere no firewall TCP, UDP e ICMP entre as máquinas do cluster, com origem restrita. Para baixar pacotes, use Cloud NAT, imagem customizada ou dependências no Cloud Storage.",
            "**Cloud SQL com IP privado.** Existem duas formas: **private services access**, que usa peering e conecta de uma VPC, e **Private Service Connect**, que Google recomenda e conecta de várias redes.",
            "**Datastream para banco privado.** Crie uma **configuração de conectividade privada**, que faz peering entre a sua VPC e a do Datastream, com uma faixa **/29** livre. Para alcançar um Cloud SQL, a documentação pede um **proxy reverso** (uma VM que repassa a porta do banco).",
            "**Cloud Composer com IP privado:** confira na documentação os requisitos de rede da versão que você usa."
          ],
          dica: "Se o job do Dataflow **não alcança a API** e os workers não têm IP externo, a primeira suspeita é **Private Google Access desligado** na sub-rede.",
          armadilha: "Não confunda as duas portas. 12345 é streaming e 12346 é batch. E ambas deixam de ser exigidas com Streaming Engine ou Shuffle."
        },
        {
          t: "Híbrido: VPN, Interconnect e Transfer Appliance",
          facil: "Traduzindo: VPN é barata e rápida de montar, mas passa pela internet. Interconnect é um cabo privado com banda alta e estável, mas leva mais tempo. Transfer Appliance é um disco físico para volume enorme.",
          p: [
            "O **Cloud VPN** cria túneis **IPsec** pela internet pública. O tráfego vai criptografado. A **HA VPN** tem um gateway com duas interfaces e dá SLA de 99,99% na maioria das topologias, com túneis redundantes. Cada túnel suporta cerca de 1 a 3 Gbps, conforme o tamanho dos pacotes.",
            "O **Cloud Interconnect** liga seu datacenter à rede do Google sem passar pela internet pública. O **Dedicated** é uma conexão física direta. O **Partner** passa por um provedor, com anexos VLAN de 50 Mbps a 50 Gbps.",
            "O Interconnect **não é criptografado** por padrão. Para criptografar, use MACsec nos circuitos que suportam, ou HA VPN sobre Interconnect.",
            "O **Transfer Appliance** é um equipamento físico que você enche e envia ao Google. Serve para volume muito grande ou rede lenta. Prazos e capacidades: confira na documentação.",
            "No **Datastream**, para fontes em rede privada, use a conectividade privada descrita antes, que alcança redes ligadas por VPN ou Interconnect."
          ],
          tabela: {
            cab: ["Critério", "HA VPN", "Interconnect (Dedicated ou Partner)", "Transfer Appliance"],
            linhas: [
              ["Caminho", "Internet pública, com IPsec", "Rede privada, fora da internet pública", "Transporte físico"],
              ["Banda", "Cerca de 1 a 3 Gbps por túnel", "Alta e previsível; Partner de 50 Mbps a 50 Gbps por anexo", "Não se aplica; depende do envio"],
              ["Latência e estabilidade", "Variam com a internet", "Mais estáveis e previsíveis", "Não se aplica"],
              ["Prazo para começar", "Rápido: horas ou dias, via software", "Mais longo: confira na documentação", "Envio e retorno: confira na documentação"],
              ["Quando escolher", "Pouca banda, início rápido, custo baixo", "Volume contínuo, baixa latência, estabilidade", "Carga única enorme ou rede lenta"]
            ]
          },
          dica: "Palavras da prova: **'sustained high throughput'**, **'low latency'**, **'not over the public internet'** apontam para Interconnect. **'quickly'** e **'low cost'** apontam para VPN.",
          armadilha: "Interconnect não é criptografado por padrão. Se o enunciado exige criptografia nesse caminho, a resposta inclui MACsec ou HA VPN sobre Interconnect."
        },
        {
          t: "VPC Service Controls, firewall e IAM: cada um protege uma coisa",
          facil: "Traduzindo: IAM decide quem pode fazer o quê. Firewall decide que pacote passa. VPC Service Controls impede que dados saiam pelas APIs do Google, mesmo para quem tem permissão.",
          p: [
            "São três camadas, e uma não substitui a outra.",
            "**IAM** responde: **quem** pode fazer **o quê** em qual recurso. Baseia-se em identidade.",
            "**Firewall** responde: qual **tráfego de rede** passa entre máquinas. Baseia-se em direção, porta e origem.",
            "**VPC Service Controls** responde: este dado **pode sair** do perímetro por uma API? Ele reduz o risco de **exfiltração** em serviços como BigQuery e Cloud Storage, inclusive com **credencial roubada** ou com alguém que tem permissão.",
            "O **perímetro de serviço** é a cerca. Dentro dele a comunicação é livre. Para atravessar, é preciso uma **regra de entrada (ingress)** ou **saída (egress)**. **Níveis de acesso** (access levels) liberam pedidos externos por atributos como faixa de IP, identidade ou dispositivo.",
            "O modo **dry-run** só registra o que seria bloqueado, sem bloquear. Use para entender o tráfego antes de ativar.",
            "Exemplo: um engenheiro com permissão exporta uma tabela do BigQuery para um bucket de um projeto pessoal. IAM permite, firewall não vê (é chamada de API), e o perímetro **bloqueia**.",
            "Para **negar** de forma explícita, existem as **IAM deny policies**. Elas ficam em organização, pasta ou projeto, são herdadas para baixo e são avaliadas **antes** das permissões concedidas. Você pode listar principais de exceção."
          ],
          tabela: {
            cab: ["Camada", "Pergunta que responde", "Exemplo de uso"],
            linhas: [
              ["IAM", "Quem pode fazer o quê?", "Conceder bigquery.dataViewer a um grupo"],
              ["Firewall", "Que tráfego passa entre máquinas?", "Liberar TCP 12345 entre workers"],
              ["VPC Service Controls", "O dado pode sair pela API?", "Impedir cópia para bucket de outro projeto"],
              ["IAM deny policy", "O que fica proibido apesar de qualquer papel?", "Proibir apagar datasets numa pasta"]
            ]
          },
          dica: "'Mesmo com credenciais válidas' e 'exfiltração' são as palavras que apontam para **VPC Service Controls**.",
          armadilha: "VPC Service Controls não substitui IAM. A documentação recomenda usar os dois, em defesa em camadas."
        },
        {
          t: "Criptografia em repouso e em trânsito, e chave comprometida",
          facil: "Traduzindo: o Google criptografa tudo por padrão. Você ganha controle usando sua própria chave. Se a chave vazar, crie uma nova, reescreva os dados com ela, confira e só depois desabilite a velha.",
          p: [
            "**Em repouso**, o Google criptografa o conteúdo dos clientes por padrão, sem ação sua, com chaves que ele gerencia. **Em trânsito**, a comunicação usa **TLS**. Detalhes por serviço: confira na documentação.",
            "Para ter mais controle, há três opções. **CMEK** (customer-managed encryption key): a chave fica no **Cloud KMS**, e você a cria, gira e desabilita. **CSEK** (customer-supplied): você fornece a chave a cada requisição, e só alguns serviços aceitam (confira a lista). **EKM** (external key manager): a chave fica num sistema fora do Google (confira os serviços compatíveis).",
            "Desabilitar a chave CMEK deixa os dados ilegíveis até reabilitar. **Destruir** a versão da chave, depois do prazo agendado, é **irreversível**.",
            "**Rotação** cria uma nova versão primária da chave. Ela **não** reencripta os dados já gravados e não desabilita as versões antigas.",
            "Roteiro para **chave comprometida**, conforme o guia de reencriptação do Cloud KMS: 1) criar uma nova versão primária (ou uma nova chave); 2) **reencriptar** os dados com ela; 3) validar que tudo lê bem; 4) só então **desabilitar** ou agendar a destruição da versão antiga.",
            "A ordem importa. A decifragem precisa da versão antiga habilitada. Se você a destruir antes de reencriptar, perde os dados.",
            "Em serviços com CMEK, como BigQuery e Cloud Storage, 'reencriptar' costuma significar criar um **novo recurso** com a nova chave e **copiar** os dados para ele. Como fazer em cada serviço: confira na documentação do serviço."
          ],
          dica: "Resposta certa em 'chave comprometida': **primeiro** novo material e reencriptação, **depois** desabilitar ou destruir. Destruir primeiro é sempre errado.",
          armadilha: "Girar a chave não resolve um vazamento. Os dados antigos continuam protegidos pela versão comprometida até você reencriptá-los."
        },
        {
          t: "IAM em cenários: herança, contas de serviço entre projetos e policy tags",
          facil: "Traduzindo: permissão concedida no alto da hierarquia desce para tudo abaixo. Entre projetos, dê à conta de serviço só o papel mínimo no recurso certo. Colunas sensíveis ficam atrás de policy tags.",
          p: [
            "A hierarquia é **organização > pasta > projeto > recurso**. As permissões concedidas em cima são **herdadas** para baixo. Você não consegue retirar, no projeto, um papel concedido na pasta. Por isso, conceda no **nível mais baixo** que resolve.",
            "**Menor privilégio** é dar só as permissões necessárias, ao grupo certo, no recurso certo. Prefira papéis predefinidos específicos a Owner ou Editor do projeto.",
            "**Contas de serviço entre projetos.** Um job do Dataflow no projeto A grava num dataset do projeto B. A **conta de serviço dos workers** (do projeto A) recebe permissão de escrita no **dataset de B**. Como o job roda em A, a conta também precisa criar jobs lá. Nunca exporte chave da conta de serviço.",
            "**Policy tags** protegem colunas do BigQuery. O papel **Fine-Grained Reader** (`datacatalog.categoryFineGrainedReader`) mostra o valor original. O **Masked Reader** (`bigquerydatapolicy.maskedReader`) mostra o valor mascarado, conforme a regra de mascaramento ligada à tag.",
            "Quem tem acesso ao dataset, mas nenhum dos dois papéis, recebe erro ao ler a coluna. Vale o papel concedido mais perto da coluna na árvore de tags.",
            "Para proibir algo que um papel herdado permite, a ferramenta é a **IAM deny policy**, ligada à pasta ou à organização."
          ],
          dica: "'Analistas veem e-mail mascarado e o time de privacidade vê o original' é **Masked Reader** para uns e **Fine-Grained Reader** para outros, sobre a mesma coluna.",
          armadilha: "Dar Project Editor para 'resolver rápido' viola o menor privilégio. Na prova, a alternativa mais ampla quase nunca é a certa."
        }
      ],
      exemplo: {
        t: "Pipeline de pagamentos com banco privado e datacenter",
        texto: "Uma empresa roda um pipeline de streaming no Dataflow, no projeto de dados, sem IP externo nos workers. Ele lê do Pub/Sub e grava no BigQuery do projeto analítico. Primeiro problema: o job não alcança as APIs. Causa: o Private Google Access estava desligado na sub-rede; basta ligar. Segundo: os workers não conversam. Eles estão em batch, sem Shuffle, e o firewall barra a porta TCP 12346; libere entre as tags dos workers. Terceiro: o Cloud SQL privado fica em outra rede; use Private Service Connect ou Shared VPC, nunca esperar transitividade de peering. Quarto: o auditor teme exfiltração, então ponha os projetos num perímetro do VPC Service Controls, primeiro em dry-run. Quinto: a chave CMEK vazou. Crie nova versão, reencripte, valide e só então desabilite a antiga."
      },
      prova: [
        "'Workers without external IP' e 'cannot reach BigQuery or Cloud Storage' apontam para Private Google Access na sub-rede; 'needs to download packages from the internet' aponta para Cloud NAT.",
        "'Workers cannot communicate' com Dataflow aponta para firewall nas portas TCP 12345 (streaming) ou 12346 (batch), usando a tag dataflow ou tags próprias; com Streaming Engine ou Shuffle essas regras não são necessárias.",
        "'Transitive' e 'A to B to C' indicam peering não transitivo: peering direto A-C ou Shared VPC. 'Central network team' e 'many projects' indicam Shared VPC.",
        "'Consistent high throughput', 'low latency' e 'not over the internet' apontam para Interconnect; 'quick setup' e 'low cost' apontam para HA VPN.",
        "'Even with valid credentials' e 'exfiltration' apontam para VPC Service Controls; 'who can do what' é IAM; 'which traffic' é firewall; 'deny regardless of roles' é IAM deny policy.",
        "'Key compromised' pede nova chave, reescrever dados, validar e só depois desabilitar ou destruir a antiga."
      ],
      explique: "Explique com suas palavras a diferença entre Private Google Access, Cloud NAT e Private Service Connect, e depois diga o que protege cada camada: IAM, firewall e VPC Service Controls. Por fim, descreva a ordem dos passos quando uma chave de criptografia é comprometida.",
      checagem: [
        "Um worker do Dataflow sem IP externo não alcança o BigQuery. Qual é a primeira coisa a conferir e onde se liga?",
        "Por que o peering de A com B e de B com C não deixa A falar com C? Cite duas soluções.",
        "Quando você escolhe Interconnect em vez de HA VPN? Dê três critérios.",
        "Qual camada impede alguém com permissão de copiar uma tabela para um bucket externo, e por que o firewall não faz isso?"
      ]
    },
    cartoes: [
      { id: "d24c1", t: "2.1", f: "A VPC do Google Cloud é global ou regional? E a sub-rede?", v: "A VPC é global e a sub-rede é regional. Máquinas de regiões diferentes na mesma VPC falam por IP interno." },
      { id: "d24c2", t: "2.1", f: "O firewall do Google Cloud é stateful? O que é negado por padrão?", v: "É stateful: se uma conexão foi permitida, a resposta também é. Por padrão, o tráfego de entrada é negado e o de saída é permitido." },
      { id: "d24c3", t: "2.1", f: "Tag de rede ou conta de serviço como alvo de firewall: qual é mais segura?", v: "Conta de serviço. Tags são texto livre e quem edita a instância as muda. Tags e contas de serviço não se misturam na mesma regra." },
      { id: "d24c4", t: "2.1", f: "O que o Private Google Access faz e onde se liga?", v: "Deixa máquinas só com IP interno chamarem as APIs do Google. É ligado por sub-rede. Não dá acesso geral à internet." },
      { id: "d24c5", t: "2.1", f: "Cloud NAT: para que serve e o que ele não permite?", v: "Deixa máquinas sem IP externo iniciarem conexões para a internet. Não aceita conexão nova vinda de fora; só respostas." },
      { id: "d24c6", t: "2.1", f: "O VPC peering é transitivo?", v: "Não. Se A tem peering com B e B com C, A não alcança C. Para isso, crie peering direto A-C ou use Shared VPC." },
      { id: "d24c7", t: "2.1", f: "Shared VPC: o que são projeto host e projetos de serviço?", v: "O projeto host tem a rede compartilhada. Projetos de serviço são ligados a ele e usam suas sub-redes. A rede é administrada num lugar só." },
      { id: "d24c8", t: "2.1", f: "Dataflow: quais portas os workers usam entre si e quando deixam de ser necessárias?", v: "TCP 12345 em streaming e TCP 12346 em batch. As regras entre workers não são necessárias com Streaming Engine ou Dataflow Shuffle." },
      { id: "d24c9", t: "2.1", f: "Dataflow sem IP externo: o que a sub-rede precisa ter?", v: "Private Google Access ligado para alcançar as APIs do Google. Para a internet, Cloud NAT. Em Python, empacote as dependências antes." },
      { id: "d24c10", t: "1.4", f: "HA VPN ou Interconnect para banda alta, latência baixa e estabilidade?", v: "Interconnect (Dedicated ou Partner). A HA VPN passa pela internet pública, com cerca de 1 a 3 Gbps por túnel, e serve para início rápido e custo baixo." },
      { id: "d24c11", t: "1.1", f: "VPC Service Controls: o que protege e o que o dry-run faz?", v: "Reduz exfiltração de dados por APIs como BigQuery e Cloud Storage, mesmo com credencial válida. O dry-run só registra o que seria bloqueado." },
      { id: "d24c12", t: "1.1", f: "Roteiro para chave KMS comprometida?", v: "Nova versão primária (ou nova chave), reencriptar os dados, validar e só então desabilitar ou agendar a destruição da antiga. Rotação sozinha não reencripta." },
      { id: "d24c13", t: "1.1", f: "Como proibir uma ação apesar de papéis herdados? E Fine-Grained Reader x Masked Reader?", v: "IAM deny policy em organização, pasta ou projeto, avaliada antes das permissões. Fine-Grained Reader vê o valor original; Masked Reader vê o valor mascarado." }
    ],
    questoes: [
      {
        id: "d24q1", s: 2, t: "2.1",
        e: "A Dataflow streaming job runs in a subnet where workers have no external IP addresses. The job reads from Pub/Sub and writes to BigQuery, but it fails because workers cannot reach Google APIs. What should the data engineer do?",
        o: [
          "Enable Private Google Access on the subnet used by the workers",
          "Assign an external IP address to every worker",
          "Create a VPC peering connection with the default network",
          "Open TCP port 12345 between the workers"
        ],
        c: [0],
        x: "A opção “Enable Private Google Access on the subnet used by the workers” está certa: sem IP externo, os workers só alcançam a VPC, e o Private Google Access, ligado por sub-rede, libera as APIs do Google (Pub/Sub e BigQuery). “Assign an external IP address to every worker” erra: funcionaria, mas quebra o requisito de não ter IP externo. “Create a VPC peering connection with the default network” erra: peering liga redes por IP interno e não dá acesso às APIs do Google. “Open TCP port 12345 between the workers” erra: a porta 12345 é tráfego entre workers, não o caminho até as APIs, e nem é necessária com Streaming Engine."
      },
      {
        id: "d24q2", s: 2, t: "2.1",
        e: "A batch Dataflow job without Dataflow Shuffle runs with workers that have no external IP. Workers start but the job stalls, and logs show workers cannot connect to each other. Private Google Access is enabled. What is the most likely fix?",
        o: [
          "Create a firewall rule allowing TCP 12346 between the worker VMs using the worker network tag",
          "Create a firewall rule allowing TCP 12345 from the internet to the workers",
          "Deploy a Cloud NAT gateway in the region",
          "Move the job to a different region"
        ],
        c: [0],
        x: "A opção “Create a firewall rule allowing TCP 12346 between the worker VMs using the worker network…” está certa: em batch, os workers trocam dados pela porta TCP 12346, e a regra de ingress deve permitir esse tráfego entre eles, usando a tag dataflow ou a tag própria. “Create a firewall rule allowing TCP 12345 from the internet to the workers” erra: 12345 é de streaming e abrir para a internet é inseguro e desnecessário. “Deploy a Cloud NAT gateway in the region” erra: o NAT dá saída para a internet, e o problema é a comunicação interna. “Move the job to a different region” erra: a região não causa o bloqueio por firewall."
      },
      {
        id: "d24q3", s: 2, t: "2.1",
        e: "Project A has a VPC peered with the VPC of project B. The VPC of project B is peered with the VPC of project C. VMs in project A must reach a database in project C using internal IP addresses, but connections fail. What should the engineer do?",
        o: [
          "Create a direct VPC peering connection between the VPC of project A and the VPC of project C",
          "Add a firewall rule in project B allowing all traffic from project A",
          "Deploy Cloud NAT in project B",
          "Enable Private Google Access in project A"
        ],
        c: [0],
        x: "A opção “Create a direct VPC peering connection between the VPC of project A and the VPC…” está certa: o peering não é transitivo, então A só alcança C com um peering direto entre eles (outra saída seria colocar os projetos numa Shared VPC). “Add a firewall rule in project B allowing all traffic from project A” erra: o problema é de rota e de peering, não de porta, e o tráfego nem atravessa B. “Deploy Cloud NAT in project B” erra: NAT serve para saída à internet, não para rotas entre VPCs. “Enable Private Google Access in project A” erra: PGA só dá acesso às APIs do Google."
      },
      {
        id: "d24q4", s: 2, t: "2.1",
        e: "A Dataflow pipeline in project A, in its own VPC, must read from a Cloud SQL instance with a private IP in project B. Peering between the two VPCs was configured, but the connection from project A fails. The team wants to keep private IP only. What should the engineer do?",
        o: [
          "Create a Private Service Connect endpoint in the VPC of project A that connects to the Cloud SQL instance",
          "Assign a public IP to the instance and authorize 0.0.0.0/0",
          "Deploy Cloud NAT in project A",
          "Add network tags to the workers"
        ],
        c: [0],
        x: "A opção “Create a Private Service Connect endpoint in the VPC of project A that connects…” está certa: o acesso privado antigo (private services access) conecta de uma única VPC, e o Private Service Connect permite conectar de várias redes, mantendo só IP interno (a Shared VPC entre os projetos também resolveria). “Assign a public IP to the instance and authorize 0.0.0.0/0” erra: expõe o banco à internet e quebra o requisito. “Deploy Cloud NAT in project A” erra: NAT é para saída à internet, não para chegar a um banco privado. “Add network tags to the workers” erra: tags só escolhem alvos de firewall e não criam rota."
      },
      {
        id: "d24q5", s: 1, t: "1.4",
        e: "A company must send a sustained high volume of data every day from its data center to Google Cloud. It requires stable low latency and the traffic must not traverse the public internet. Which connectivity option should the data engineer choose?",
        o: [
          "Dedicated or Partner Cloud Interconnect",
          "HA VPN with two tunnels",
          "Transfer Appliance",
          "Public internet with TLS"
        ],
        c: [0],
        x: "A opção “Dedicated or Partner Cloud Interconnect” está certa: o Interconnect liga o datacenter à rede do Google sem usar a internet pública, com banda alta, latência estável e previsível. “HA VPN with two tunnels” erra: a HA VPN passa pela internet pública, e cada túnel suporta cerca de 1 a 3 Gbps. “Transfer Appliance” erra: o Transfer Appliance é um envio físico para carga única, não para fluxo diário contínuo. “Public internet with TLS” erra: usa a internet pública, justamente o que o requisito proíbe, e sem garantia de latência."
      },
      {
        id: "d24q6", s: 1, t: "1.1",
        e: "A data engineer with valid permissions in a project exports BigQuery tables to a Cloud Storage bucket owned by a personal project. Security wants to prevent this kind of data exfiltration even when credentials are valid. What should be implemented?",
        o: [
          "A VPC Service Controls perimeter around the projects and services holding the data",
          "A VPC firewall egress deny rule for all VMs",
          "Customer-managed encryption keys on the source tables",
          "Remove the BigQuery Data Viewer role from the engineer"
        ],
        c: [0],
        x: "A opção “A VPC Service Controls perimeter around the projects and services holding the data” está certa: o perímetro do VPC Service Controls barra a cópia de dados por APIs para fora dele, mesmo com credencial válida. “A VPC firewall egress deny rule for all VMs” erra: o firewall controla pacotes entre máquinas, e a exportação é uma chamada de API do Google. “Customer-managed encryption keys on the source tables” erra: CMEK criptografa em repouso, mas quem tem permissão lê e exporta normalmente. “Remove the BigQuery Data Viewer role from the engineer” erra: remover o papel tira o acesso legítimo e não trata exfiltração por quem precisa dele."
      },
      {
        id: "d24q7", s: 1, t: "1.1",
        e: "A Cloud KMS key version used as a CMEK for a Cloud Storage bucket may have been compromised. Choose two actions that follow the recommended process.",
        o: [
          "Create a new primary key version and re-encrypt the data with it",
          "After validating the re-encrypted data, disable or schedule destruction of the compromised key version",
          "Schedule destruction of the compromised key version immediately, before copying any data",
          "Enable automatic rotation and keep the existing data as it is",
          "Place the bucket inside a VPC Service Controls perimeter and keep the old key"
        ],
        c: [0, 1],
        x: "As opções “Create a new primary key version and re-encrypt the data with it” e “After validating the re-encrypted data, disable or schedule destruction…” estão certas: primeiro nova versão primária e reencriptação (ou novo recurso com a nova chave), depois validação e só então desabilitar ou destruir a antiga. “Schedule destruction of the compromised key version immediately, before copying any data” erra: a decifragem precisa da versão antiga, e destruir antes de reencriptar causa perda de dados. “Enable automatic rotation and keep the existing data as it is” erra: a rotação não reencripta os dados já gravados, que continuam sob a chave comprometida. “Place the bucket inside a VPC Service Controls perimeter and keep the old key” erra: o perímetro protege contra exfiltração por API e não troca a chave exposta."
      },
      {
        id: "d24q8", s: 1, t: "1.1",
        e: "A Dataflow job runs in project A and must write results to a BigQuery dataset in project B. The company follows the principle of least privilege. What should the engineer do?",
        o: [
          "Grant the job's worker service account write access on the target dataset in project B and permission to run BigQuery jobs in project A",
          "Grant the worker service account the Owner role on project B",
          "Create a service account key and store it in the pipeline code",
          "Grant Editor on the organization to the engineer who launches the job"
        ],
        c: [0],
        x: "A opção “Grant the job's worker service account write access on the target dataset in project B…” está certa: a conta de serviço dos workers precisa de escrita só no dataset de B e de permissão para criar jobs no projeto onde eles rodam, que é o A. “Grant the worker service account the Owner role on project B” erra: Owner do projeto é amplo demais. “Create a service account key and store it in the pipeline code” erra: chave no código é risco de vazamento, e contas de serviço devem ser usadas sem exportar chaves. “Grant Editor on the organization to the engineer who launches the job” erra: Editor na organização viola o menor privilégio e nem é a identidade que o job usa."
      },
      {
        id: "d24q9", s: 2, t: "2.1",
        e: "A company wants Datastream to replicate from a Cloud SQL database that has only a private IP address. The company does not want to expose the database to the internet. What should the data engineer configure?",
        o: [
          "A private connectivity configuration with a free /29 range, plus a reverse proxy VM that forwards the database port to the Cloud SQL private IP",
          "Allowlist the Datastream public IP addresses on the instance and enable a public IP",
          "Cloud NAT in the Datastream project",
          "A Cloud Interconnect attachment between Datastream and Cloud SQL"
        ],
        c: [0],
        x: "A opção “A private connectivity configuration with a free /29 range, plus a reverse proxy VM…” está certa: a conectividade privada do Datastream usa peering com uma faixa /29 livre, e, para um Cloud SQL, a documentação pede um proxy reverso (VM que repassa a porta). “Allowlist the Datastream public IP addresses on the instance and enable a public IP” erra: expõe o banco com IP público, contra o requisito. “Cloud NAT in the Datastream project” erra: NAT serve para saída à internet de máquinas, não cria rota privada para o banco. “A Cloud Interconnect attachment between Datastream and Cloud SQL” erra: Interconnect liga redes locais ao Google, e não é a forma de ligar o Datastream a um banco na nuvem."
      },
      {
        id: "d24q10", s: 1, t: "1.1",
        e: "A contractors group has the Editor role on a folder containing many projects. Security must make sure the group can never delete BigQuery datasets in any project of that folder, while keeping all its other access. What is the best approach?",
        o: [
          "Create an IAM deny policy on the folder denying the dataset deletion permission for the group",
          "Remove the Editor role at the project level for each project",
          "Create an allow policy at the dataset level without delete permissions",
          "Add a VPC Service Controls perimeter around the folder"
        ],
        c: [0],
        x: "A opção “Create an IAM deny policy on the folder denying the dataset deletion permission…” está certa: a IAM deny policy na pasta é herdada por cada projeto da pasta, é avaliada antes das permissões concedidas e nega a ação apesar do papel Editor. “Remove the Editor role at the project level for each project” erra: o papel foi concedido na pasta, e não se retira no projeto um papel herdado. “Create an allow policy at the dataset level without delete permissions” erra: política de permissão só soma acesso e não anula um papel herdado. “Add a VPC Service Controls perimeter around the folder” erra: o perímetro controla saída de dados por API, não impede um usuário autorizado de apagar um dataset."
      },
      {
        id: "d24q11", s: 2, t: "2.1",
        e: "Dataproc clusters with internal IP addresses only must install libraries from a public package repository during job startup. The jobs fail because the clusters cannot reach the internet. Choose two solutions that keep the clusters without external IP addresses.",
        o: [
          "Create a Cloud NAT gateway for the cluster subnet region",
          "Build a custom image with the libraries or stage them in Cloud Storage",
          "Enable Private Google Access on the subnet",
          "Create VPC peering with the default network",
          "Allow ingress TCP 443 from 0.0.0.0/0 to the cluster VMs"
        ],
        c: [0, 1],
        x: "As opções “Create a Cloud NAT gateway for the cluster subnet region” e “Build a custom image with the libraries or stage them in Cloud Storage” estão certas: o Cloud NAT dá saída à internet sem IP externo, e uma imagem customizada ou dependências no Cloud Storage dispensam a internet. “Enable Private Google Access on the subnet” erra: o Private Google Access alcança as APIs do Google, não repositórios públicos (e o Dataproc já o liga na sub-rede). “Create VPC peering with the default network” erra: peering liga redes e não dá saída à internet. “Allow ingress TCP 443 from 0.0.0.0/0 to the cluster VMs” erra: é regra de entrada, e o problema é de saída, além de expor o cluster."
      },
      {
        id: "d24q12", s: 1, t: "1.1",
        e: "An email column in a BigQuery table is protected by a policy tag. Analysts must see a masked value, and the privacy team must see the original value. Which setup should the data engineer use?",
        o: [
          "Grant the Masked Reader role to the analysts and the Fine-Grained Reader role to the privacy team on the policy tag and its data policy",
          "Grant Fine-Grained Reader to all users and hide the column in a view",
          "Grant BigQuery Admin to the privacy team only",
          "Move the table into a VPC Service Controls perimeter"
        ],
        c: [0],
        x: "A opção “Grant the Masked Reader role to the analysts and the Fine-Grained Reader role…” está certa: o Masked Reader mostra o valor mascarado e o Fine-Grained Reader mostra o original, ambos ligados à tag e à política de dados da coluna. “Grant Fine-Grained Reader to all users and hide the column in a view” erra: Fine-Grained Reader para qualquer pessoa mostra o valor original aos analistas. “Grant BigQuery Admin to the privacy team only” erra: o papel de administrador é amplo e não cria mascaramento para os analistas. “Move the table into a VPC Service Controls perimeter” erra: o perímetro controla saída por API, não o que cada usuário vê numa coluna."
      },
      {
        id: "d24q13", s: 2, t: "2.1",
        e: "A security team wants a firewall rule to apply only to the VMs running the ingestion pipeline. Users with permission to edit instances must not be able to change which VMs the rule applies to. How should the rule target the VMs?",
        o: [
          "Use a dedicated service account as the target of the rule",
          "Use a network tag as the target of the rule",
          "Apply the rule to all instances in the network",
          "Use an instance name pattern as the target"
        ],
        c: [0],
        x: "A opção “Use a dedicated service account as the target of the rule” está certa: a conta de serviço só muda com permissão específica (Service Account User) e com reinício da VM, e quem só edita a instância não escolhe o alvo da regra. “Use a network tag as the target of the rule” erra: tags são texto livre, e quem edita a instância as altera. “Apply the rule to all instances in the network” erra: a regra valeria para tudo, contra o requisito. “Use an instance name pattern as the target” erra: o firewall do Google Cloud não escolhe alvos por padrão de nome de instância."
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
