(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };

  /* ===================== AULA 1 ===================== */
  C.dias[1] = {
    aula: {
      titulo: "Contar a carreira: present perfect, past simple e present perfect continuous",
      resumo: "Como escolher entre 'I've worked… for 6 years', 'I worked at X in 2022' e 'I've been working on…' ao falar da sua carreira em entrevista: tempo fechado ou ainda aberto, for, since, ago, 'How long have you…?' e a diferença entre resultado e atividade em andamento.",
      simples: {
        analogia: "Pense na sua carreira como uma linha do tempo desenhada numa parede. O past simple é o alfinete fincado num ponto da linha: 'em 2022, eu migrei o warehouse'. O alfinete tem data e aquele episódio acabou. O present perfect é um barbante esticado de um ponto da linha até a sua mão, que está no dia de hoje: 'trabalho com dados há seis anos' significa que o barbante ainda está preso em você. O present perfect continuous é o mesmo barbante, mas com você ainda puxando: o foco está na atividade que continua acontecendo. Antes de falar, olhe para a parede e pergunte: este período já fechou ou ainda está aberto até hoje?",
        pontos: [
          "Período que ainda continua até hoje: present perfect com for ou since.",
          "Momento ou período que já fechou, com data: past simple (in 2022, last year, two years ago).",
          "'How long have you…?' pede um período aberto: responda com for (duração) ou since (início).",
          "Present perfect continuous destaca a atividade em andamento; o simples destaca o resultado ou a quantidade.",
          "Não misture present perfect com data fechada: 'I have worked there in 2021' soa errado."
        ],
        paraQueServe: "Responder 'Tell me about your experience' com tempos verbais corretos, sem confundir o que você faz hoje com o que ficou no passado."
      },
      glossario: [
        { t: "Present perfect", d: "have/has + particípio passado; liga o passado ao presente (experiência, situação que continua, resultado que importa agora)." },
        { t: "Past simple", d: "Verbo no passado (worked, led, built); fala de algo terminado, normalmente com um tempo fechado." },
        { t: "Present perfect continuous", d: "have/has been + verbo com -ing; destaca uma atividade que vem acontecendo até agora." },
        { t: "for", d: "Vem antes de uma duração: for six years, for three months, for a long time." },
        { t: "since", d: "Vem antes de um ponto de partida: since 2020, since January, since I joined the team." },
        { t: "ago", d: "Vem depois de uma duração e conta a partir de hoje: two years ago. Marca um tempo fechado, então combina com past simple." },
        { t: "Verbo de estado (stative)", d: "Verbo que descreve estado, não ação (know, like, be, have): em geral não usa -ing, então fica no present perfect simples." }
      ],
      blocos: [
        {
          t: "A pergunta que decide o tempo verbal",
          facil: "Traduzindo: se o período ainda está aberto até hoje, use present perfect; se já fechou, use past simple.",
          p: [
            "A página de referência do British Council mostra que o present perfect liga o passado ao presente. Um dos usos é a situação que começou antes e continua verdadeira agora: 'She has lived in Liverpool all her life'. Outro é a experiência até agora, sem dizer quando. E outro é o fato passado que importa hoje, como 'I've lost my keys'.",
            "O past simple, na mesma página, descreve eventos terminados, em geral com uma referência de tempo clara, como yesterday, last week ou in 2017. Na prática, antes de escolher o tempo, faça uma pergunta: esse período já acabou ou ainda estou nele?"
          ],
          tabela: {
            cab: ["O que você quer dizer", "Tempo", "Exemplo de entrevista"],
            linhas: [
              ["Ainda faço isso hoje", "Present perfect", "I've worked with Spark for six years."],
              ["Fiz isso e acabou, com data", "Past simple", "I worked at DataCo from 2019 to 2022."],
              ["Estou nessa atividade ultimamente", "Present perfect continuous", "I've been migrating our jobs to dbt."],
              ["Resultado que importa agora", "Present perfect", "I've reduced the pipeline runtime by 40%."]
            ]
          },
          dica: "Se você não sabe qual usar, procure uma data ou um 'ago' na frase. Se houver, é past simple.",
          fonte: ["British Council LearnEnglish: present perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-perfect"]
        },
        {
          t: "For, since e 'How long have you…?'",
          facil: "Traduzindo: for responde 'por quanto tempo'; since responde 'desde quando'. As duas pedem present perfect quando a situação continua.",
          p: [
            "A página de referência do present perfect traz 'I've worked here since I left school' (since + ponto de partida), e a página de present perfect simples e contínuo traz 'They've been playing tennis for an hour' (for + duração). Em vez de decorar uma regra abstrata, grave os dois moldes: for + quanto tempo, since + quando começou.",
            "Na prática, as perguntas 'how long' pedem for ou since (uso geral, não é uma frase literal da página). A página de present perfect simples e contínuo traz 'We've known each other since we were at school', no present perfect simples, porque 'know' é um verbo de estado. Para uma atividade que continua, a mesma página usa o continuous: 'They've been playing tennis for an hour'.",
            "Modelo de entrevista: 'How long have you been working with Airflow?' Resposta: 'For about four years' ou 'Since 2021'. Para dizer que algo terminou, mude para o past simple: 'I used Airflow for four years' mostra que acabou."
          ],
          lista: [
            "I've worked as a data engineer for six years.",
            "I've worked at this company since 2020.",
            "How long have you used Spark? For about five years.",
            "I've known our product owner since I joined."
          ],
          dica: "For + duração, since + início. Se a palavra seguinte é um número de anos, meses ou semanas, é for; se é uma data ou um acontecimento, é since.",
          fonte: ["British Council LearnEnglish: present perfect simple e continuous", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous"]
        },
        {
          t: "Past simple para o que já fechou (in 2022, ago)",
          facil: "Traduzindo: com ano, data ou 'ago', o passado acabou; use past simple e, se ajudar, dê o resultado logo depois.",
          p: [
            "A página do past simple do British Council lista usos como uma ação completa ('I met my wife in 1983'), um estado que durou um período no passado e a expressão ago ('a long time ago'). Did e didn't formam perguntas e negativas com o verbo base; nos nossos exemplos de trabalho: 'When did you join the team?', 'I didn't use Kafka at that job'. 'I lived abroad for ten years' é exemplo nosso do mesmo uso.",
            "A página de present perfect avisa para não usar esse tempo com expressões de tempo fechado, como yesterday ou in 2017. 'Ago' não aparece nessa lista, mas ela conta a partir de hoje até um ponto que já passou, então o raciocínio é o mesmo: trate como tempo fechado e use past simple.",
            "Em entrevista, o past simple é o tempo dos seus marcos: 'In 2022, I led the migration to BigQuery. We moved forty pipelines in four months.' Cada verbo no passado é um alfinete na linha do tempo."
          ],
          dica: "Estrutura de marco: tempo fechado + verbo no passado + número. 'Two years ago, I cut the nightly load from three hours to forty minutes.'",
          fonte: ["British Council LearnEnglish: past simple", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple"]
        },
        {
          t: "Present perfect continuous: a atividade em andamento",
          facil: "Traduzindo: o simples olha para o resultado ('how many'); o continuous olha para a atividade ('how long').",
          p: [
            "Segundo a página do British Council, o present perfect simples foca no resultado e responde 'how many': 'She's read ten books this summer'. O continuous foca na atividade e responde 'how long': 'She's been reading that book all day'. Ele também serve quando há sinais visíveis de atividade recente, como 'The grass looks wet. Has it been raining?'.",
            "Com número, a diferença é prática: 'I've read three books' indica que terminou; 'I've been reading three books' indica que ainda não terminou, segundo a página. Verbos de estado, como know, like e hate, geralmente não usam o continuous: um comentário respondido na página trata 'Have you always been hating garlic?' como não padrão.",
            "Em entrevista: 'I've been leading the data platform team for two years' destaca a continuidade. 'I've built twelve dashboards this year' destaca o resultado."
          ],
          dica: "Quer falar de número ou entrega? Use o simples. Quer falar de esforço contínuo? Use o continuous.",
          fonte: ["British Council LearnEnglish: present perfect simple e continuous", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous"]
        },
        {
          t: "Como montar a resposta 'Tell me about your experience'",
          facil: "Traduzindo: abra com present perfect (o quadro geral), conte marcos com past simple e feche com o que você faz agora.",
          p: [
            "Uma ordem simples ajuda a não travar. Primeiro, o quadro geral, no present perfect: 'I've worked in data engineering for six years.' Depois, dois marcos com data, no past simple: 'In 2022, I led the move to BigQuery.' Por fim, o presente: 'Right now, I'm designing a data quality framework' ou 'I've been focusing on cost reduction lately.'",
            "Inclua resultados em números: 'I've cut our cloud bill by 25% since March' mistura present perfect (ainda vale hoje) com since (início). 'Last year I cut the runtime from three hours to forty minutes' é um marco fechado, então fica no past simple.",
            "Todas essas frases são modelos meus para treinar, e seguem as regras das páginas do British Council acima."
          ],
          lista: [
            "Quadro geral: I've worked with ___ for ___ years.",
            "Marco fechado: In ___, I led / built / moved ___.",
            "Resultado que vale hoje: I've reduced ___ by ___ since ___.",
            "Presente em andamento: I've been working on ___ for ___."
          ],
          dica: "Treine em voz alta com os seus dados reais: troque os espaços por empresa, ferramenta e número.",
          fonte: ["British Council LearnEnglish: falar sobre o passado", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past"]
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: em português usamos o presente ('trabalho aqui desde 2020') e a gente transporta isso para o inglês. O inglês pede present perfect.",
          p: [
            "Erros comuns de falantes de português ao contar a carreira (são padrões de transferência; não há estatística aqui):",
            "'I work here since 2020': em português dizemos 'trabalho aqui desde 2020', mas em inglês a situação que começou antes e continua pede present perfect: 'I've worked here since 2020'. A página de present perfect do British Council mostra o molde com 'I've worked here since I left school'.",
            "'I have 30 years' (ideia de 'tenho 30 anos'): em inglês, idade usa be: 'I am 30 years old'. Isso é um erro comum de falantes de português; as páginas abertas desta aula não tratam de idade.",
            "'I have worked there in 2021': a página de present perfect diz para não combinar esse tempo com expressões de tempo fechado, como in 2017. Use 'I worked there in 2021'.",
            "'I'm working here since two years' e 'I have been knowing him': o primeiro troca for/since e tempo verbal, e o segundo usa continuous com verbo de estado, o que é não padrão (um comentário na página de present perfect simples e contínuo chama 'always been hating' de não padrão)."
          ],
          armadilha: "Antes de falar 'since' ou 'for', confirme que o verbo está no present perfect; antes de falar uma data fechada, confirme que o verbo está no past simple.",
          fonte: ["British Council LearnEnglish: present perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-perfect"]
        }
      ],
      exemplo: {
        t: "Uma resposta completa de entrevista",
        texto: "A recrutadora pergunta: 'Tell me about your experience with data pipelines.' Resposta modelo: 'I've worked in data engineering for six years, mostly with Python, SQL and Airflow. In 2022, I led the migration of forty pipelines to BigQuery, and we finished it in four months. Last year, I cut the nightly load from three hours to forty minutes. Since then, I've reduced our cloud costs by 25%. Lately, I've been focusing on data quality: I've been building automated checks for the whole platform, and so far I've covered ten critical tables.' Repare nos tempos: present perfect para o quadro geral e o resultado que vale hoje, past simple para os marcos com data, continuous para o que está em andamento, e simples para a contagem de tabelas."
      },
      prova: [
        "Entrevista: responder 'How long have you worked with X?' com for ou since sem pensar duas vezes.",
        "Entrevista: contar um marco fechado ('In 2022, I led…') com past simple e um resultado em números.",
        "Reunião: dizer o que você tem feito nas últimas semanas com present perfect continuous.",
        "Negociação: justificar o pedido com resultados que valem hoje ('I've reduced costs by 25% since March')."
      ],
      explique: "Explique com as próprias palavras quando usar present perfect, past simple e present perfect continuous para falar da sua carreira, e dê um exemplo real seu de cada.",
      checagem: [
        "Como saber se o período está aberto ou fechado, e que tempo verbal cada caso pede?",
        "Qual é a diferença entre for e since, e como você responde 'How long have you…?'",
        "Quando o present perfect continuous é melhor que o simples, e quando um número pede o simples?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: present perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-perfect"],
      ["British Council LearnEnglish: present perfect simple e continuous", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous"],
      ["British Council LearnEnglish: past simple", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple"],
      ["British Council LearnEnglish: falar sobre o passado", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past"]
    ],
    cartoes: [
      { id: "g1c1", f: "Corrija: 'I work here since 2020.'", v: "I've worked here since 2020. Situação que começou no passado e continua: present perfect + since.", t: "g1" },
      { id: "g1c2", f: "Complete: 'I ___ at DataCo from 2019 to 2022.' (work)", v: "worked. Período fechado, com datas: past simple.", t: "g1" },
      { id: "g1c3", f: "Corrija: 'I have worked there in 2021.'", v: "I worked there in 2021. Tempo fechado (in 2021) não combina com present perfect.", t: "g1" },
      { id: "g1c4", f: "Como perguntar 'há quanto tempo você usa Spark?'", v: "How long have you used Spark? 'How long' + present perfect, para um período que ainda está aberto.", t: "g1" },
      { id: "g1c5", f: "Complete: 'I've worked in data ___ six years.' (for ou since?)", v: "for. For + duração (six years); since + ponto de partida (2019).", t: "g1" },
      { id: "g1c6", f: "Complete: 'I've lived in Lisbon ___ 2018.'", v: "since. Since + ponto de partida; o present perfect segue.", t: "g1" },
      { id: "g1c7", f: "Como dizer 'migrei o banco há dois anos'?", v: "I migrated the database two years ago. Ago marca tempo fechado: past simple.", t: "g1" },
      { id: "g1c8", f: "Corrija: 'I'm working here since two years.'", v: "I've worked (ou I've been working) here for two years. Duração pede for, e a situação aberta pede present perfect.", t: "g1" },
      { id: "g1c9", f: "Resultado ou atividade? 'I've built ten dashboards this year.'", v: "Resultado (how many): present perfect simples. Para a atividade: 'I've been building dashboards all year.'", t: "g1" },
      { id: "g1c10", f: "Corrija: 'I have been knowing my manager since 2021.'", v: "I've known my manager since 2021. 'Know' é verbo de estado: sem continuous.", t: "g1" },
      { id: "g1c11", f: "Como dizer 'tenho 30 anos' em inglês?", v: "I am 30 years old. Idade usa be, não have: erro comum de falantes de português.", t: "g1" },
      { id: "g1c12", f: "'I lived in Rome for ten years' ou 'I've lived in Rome for ten years': qual indica que você ainda mora lá?", v: "I've lived in Rome for ten years. O past simple descreve um período fechado; o present perfect liga ao presente.", t: "g1" }
    ],
    questoes: [
      {
        id: "g1q1", s: 1, t: "g1",
        e: "Você descreve seu emprego anterior, que terminou em 2022. Complete a frase da entrevista: 'I ___ at DataCo from 2019 to 2022, and then I joined my current company.'",
        o: ["have worked", "was working", "worked", "have been working"],
        c: [2],
        x: "O período 2019 a 2022 está fechado e tem datas, por isso o past simple (worked) é o tempo certo. As formas com have e have been working ligam a situação ao presente, e isso daria a entender que você ainda trabalha na empresa, o que contradiz 'and then I joined my current company'. O past continuous (was working) descreveria uma ação em andamento em um momento específico, não um período inteiro com início e fim."
      },
      {
        id: "g1q2", s: 1, t: "g1",
        e: "O recrutador pergunta sobre uma ferramenta que você ainda usa hoje. Escolha a pergunta natural: 'How long ___ Airflow?'",
        o: ["did you use", "do you use", "are you used to", "have you used"],
        c: [3],
        x: "'How long' sobre algo que continua até hoje pede present perfect: have you used. A forma 'did you use' trata o uso como encerrado. A forma 'do you use' não pergunta duração e ficaria estranha com 'how long'. 'Are you used to' muda o sentido para estar acostumado e exigiria um verbo com -ing. Para a mesma ideia com ênfase na atividade, também seria possível 'have you been using'."
      },
      {
        id: "g1q3", s: 1, t: "g1",
        e: "Escolha a frase correta para dizer que você começou na empresa em 2020 e continua lá: qual versão em inglês está certa?",
        o: ["I work at this company since 2020.", "I have worked at this company since 2020.", "I worked at this company since 2020.", "I am working at this company since 2020."],
        c: [1],
        x: "Uma situação que começou no passado e continua pede present perfect, e since 2020 marca o início: I have worked at this company since 2020. Usar o presente simples com since é o erro comum de falantes de português, que dizem 'trabalho aqui desde 2020'. O past simple com since sugere um período fechado e não combina com a ideia de continuar. O present continuous com since também não é o tempo usado para essa ligação com o passado."
      },
      {
        id: "g1q4", s: 1, t: "g1",
        e: "Choose two sentences that correctly tell an interviewer you still work at Acme. (Escolha duas)",
        o: ["I've been at Acme for six years.", "I was at Acme for six years.", "I've worked at Acme since 2020.", "I worked at Acme since 2020."],
        c: [0, 2],
        x: "As duas frases certas usam present perfect com for ou since e indicam um período que continua até hoje: I've been at Acme for six years e I've worked at Acme since 2020. 'I was at Acme for six years' é past simple e descreve um período terminado, ou seja, passa a ideia de que você já saiu. 'I worked at Acme since 2020' mistura past simple com since, combinação que não expressa uma situação aberta."
      },
      {
        id: "g1q5", s: 1, t: "g1",
        e: "Na entrevista, você quer contar quando fez a migração do data warehouse, que foi concluída há dois anos. Qual frase está correta?",
        o: ["I have migrated the warehouse two years ago.", "I migrate the warehouse two years ago.", "I migrated the warehouse two years ago.", "I have been migrating the warehouse two years ago."],
        c: [2],
        x: "A expressão two years ago marca um ponto fechado no passado e, por isso, combina com o past simple: I migrated the warehouse two years ago. As versões com have migrated e have been migrating usam present perfect, que não se mistura com tempo fechado. O presente simples (I migrate) não pode ser usado com ago, porque a ação não acontece agora."
      },
      {
        id: "g1q6", s: 1, t: "g1",
        e: "A recrutadora pergunta no que você tem se concentrado recentemente. Você quer destacar a atividade que continua. Qual resposta é a mais natural?",
        o: ["I'm migrating our jobs to dbt since three months.", "I've been migrating our jobs to dbt for three months.", "I migrated our jobs to dbt for three months.", "I migrate our jobs to dbt for three months."],
        c: [1],
        x: "O present perfect continuous (have been + -ing) com for destaca uma atividade que vem acontecendo até agora, que é a intenção. A versão com 'I'm migrating... since three months' mistura present continuous com since e usa since antes de uma duração, quando o certo seria for. O past simple com for descreve um período já terminado. O presente simples não expressa duração de uma atividade em andamento."
      },
      {
        id: "g1q7", s: 1, t: "g1",
        e: "Complete com o tempo verbal correto: 'I ___ my tech lead since 2021, so we work well together.' (verbo know, um verbo de estado)",
        o: ["know", "knew", "have been knowing", "have known"],
        c: [3],
        x: "'Know' é verbo de estado, e a situação continua, então o present perfect simples (have known) com since é o correto. O continuous (have been knowing) não é usado com verbos de estado. O presente simples (know) não liga a situação ao ponto de partida 2021 e ficaria incorreto com since. O past simple (knew) indicaria que a relação acabou."
      },
      {
        id: "g1q8", s: 1, t: "g1",
        e: "[C1] You are describing completed deliverables with a number: 'This quarter, she ___ ten dashboards for the finance team, and they are all live.' Which verb form fits best?",
        o: ["has been building", "builds", "was building", "has built"],
        c: [3],
        x: "Com um número e um trabalho concluído, o present perfect simples foca no resultado: has built ten dashboards. A página do British Council mostra que o continuous com número sugere algo ainda incompleto, e aqui a frase diz que todos estão no ar. O presente simples sugeriria um hábito, e o past continuous descreveria algo em andamento em um momento passado, não um resultado total no trimestre."
      },
      {
        id: "g1q9", s: 1, t: "g1",
        e: "Qual resposta soa mais natural e correta para 'Tell me about your experience' em uma entrevista para engenharia de dados?",
        o: ["I work with Python and SQL since six years, and in 2022 I have led a migration.", "I've worked with Python and SQL for six years, and in 2022 I led the migration to BigQuery.", "I worked with Python and SQL for six years, and in 2022 I'm leading the migration.", "I'm working with Python and SQL for six years, and in 2022 I've led a migration."],
        c: [1],
        x: "A resposta certa usa present perfect com for para o período que continua (I've worked ... for six years) e past simple para o marco com data (in 2022, I led). As outras erram de formas diferentes: o presente com since e a duração 'six years' mistura as palavras, 'in 2022' com have led combina tempo fechado com present perfect, 'worked' com for six years sugere que você parou, e o present continuous com for não cabe para um período longo que já vem de antes."
      },
      {
        id: "g1q10", s: 1, t: "g1",
        e: "[C1] You want the interviewer to understand that you NO LONGER live in Lisbon, but lived there for a long period. Which sentence communicates that?",
        o: ["I've been living in Lisbon for ten years.", "I live in Lisbon for ten years.", "I lived in Lisbon for ten years.", "I've lived in Lisbon for ten years."],
        c: [2],
        x: "O past simple com for descreve um período fechado, o que sugere que você já não mora lá: I lived in Lisbon for ten years. As duas formas de present perfect (simples e continuous) indicam que a situação continua até agora (a página de present perfect lista a situação que começou no passado e continua). O presente simples com for não é uma construção normal em inglês para duração."
      },
      {
        id: "g1q11", s: 1, t: "g1",
        e: "Escolha a frase que combina corretamente um tempo fechado com o tempo verbal e conta o que aconteceu depois com ligação ao presente.",
        o: ["Last year I have led the migration, and since then I maintain it.", "Last year I led the migration, and since then I've maintained it.", "Since last year I led the migration, and then I've maintained it.", "Last year I was leading the migration, and since then I maintained it."],
        c: [1],
        x: "'Last year' é tempo fechado e pede past simple (led). 'Since then' indica um período que continua até hoje, então o present perfect (I've maintained) é o correto. A primeira alternativa errada usa have led com last year e o presente com since then. A terceira usa since com past simple. A quarta usa o past continuous e o past simple depois de since then, o que não fecha a ligação com o presente."
      },
      {
        id: "g1q12", s: 1, t: "g1",
        e: "[C1] The interviewer asks, 'How long have you been working on the data platform?' Choose two natural answers. (Escolha duas)",
        o: ["For about two years.", "Since January.", "Two years ago.", "In January."],
        c: [0, 1],
        x: "'How long' pede duração ou ponto de partida, então as respostas naturais são For about two years (duração) e Since January (início). 'Two years ago' e 'In January' respondem à pergunta 'when', porque marcam um momento fechado, e não dizem por quanto tempo a atividade vem acontecendo. Em conversa, essas respostas curtas completam a ideia do present perfect continuous da pergunta."
      }
    ],
    lab: {
      t: "Treino de fala: contar a carreira com os três tempos",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Falar em voz alta mostra se o present perfect, o past simple e o continuous saem sem você pensar. Ouvir a gravação ajuda a achar o erro mais frequente.",
      antes: "Ter lido a aula e as frases-modelo. Deixar à mão o seu currículo para pegar nomes de ferramentas e números reais. Escolher um lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste tempos e frases ao seu jeito de falar.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote em papel quatro palavras: uma ferramenta, um marco com ano, um número de resultado e algo que você está fazendo agora. Não escreva frases inteiras." },
        { t: "Gravar a primeira versão (2 a 3 min)", p: "Responda 'Tell me about your experience' usando as quatro palavras. Use uma frase com for ou since, uma com in + ano e uma com have been + -ing." },
        { t: "Ouvir contando erros", p: "Escute uma vez e marque no papel: quantas vezes usou present perfect onde queria dizer algo que continua, quantas vezes usou present perfect com data fechada, e se trocou for e since." },
        { t: "Regravar corrigindo", p: "Grave de novo (2 a 3 min) corrigindo os erros marcados. Repita a parte mais difícil mais uma vez, devagar." },
        { t: "Responder 'How long have you…?'", p: "Em uma terceira gravação curta, responda em voz alta a três perguntas: 'How long have you worked in data?', 'How long have you used [ferramenta]?' e 'What have you been working on lately?'." }
      ],
      verificar: "Você usou present perfect com for ou since em pelo menos 3 frases; usou past simple com um ano ou 'ago' em pelo menos 2 frases; usou have been + -ing em pelo menos 1 frase; e não misturou present perfect com data fechada em nenhuma frase da segunda gravação.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar com a próxima aula, se quiser.",
        "Anote em uma linha qual erro mais apareceu, para focar nele na próxima prática."
      ],
      erros: [
        { s: "Travo e fico em silêncio", c: "Tentar construir a frase inteira de cabeça antes de falar.", r: "Fale a primeira frase-modelo da aula e troque só as palavras-chave; aceite pausas e continue." },
        { s: "Não sei se usei o tempo certo", c: "Ouvir sem um critério.", r: "Ouça procurando só uma coisa por vez: primeiro for e since, depois datas fechadas, depois o continuous." },
        { s: "Falo muito rápido e engulo o 've", c: "Nervosismo e vontade de terminar logo.", r: "Fale mais devagar e marque o have/has de propósito: I-have worked, depois reduza para I've." },
        { s: "Sempre volto ao presente simples com since", c: "Hábito do português ('trabalho aqui desde').", r: "Escreva 'since/for = have + particípio' num papel ao lado do celular e regrave só essas frases." }
      ]
    }
  };

  /* ===================== AULA 2 ===================== */
  C.dias[2] = {
    aula: {
      titulo: "Histórias STAR e incidentes: past simple, past continuous e past perfect",
      resumo: "Como contar uma história de trabalho (STAR ou incidente de produção) em inglês: past simple para os eventos, past continuous para o cenário e o que estava em andamento, past perfect para o que aconteceu antes, used to e would para hábitos, e conectores como when, while, after, by the time e as soon as.",
      simples: {
        analogia: "Contar uma história em inglês é como filmar uma cena. O past continuous é a câmera aberta mostrando o cenário: 'o sistema estava processando os dados, as pessoas estavam trabalhando'. O past simple é a ação que acontece na frente da câmera, uma de cada vez: 'o job falhou, eu abri o log, achei o erro'. O past perfect é o flashback, a cena curta que mostra o que já tinha acontecido antes de tudo começar: 'alguém já tinha mudado o schema'. E used to é a narração em off falando de como as coisas eram antes: 'a gente costumava rodar tudo na mão'. Se você escolher bem quem é cenário, ação e flashback, a ordem da história fica clara para quem ouve.",
        pontos: [
          "Past simple conta os eventos, na ordem em que aconteceram.",
          "Past continuous mostra o cenário ou o que estava em andamento quando algo aconteceu.",
          "Past perfect (had + particípio) marca o que aconteceu antes de outro ponto no passado.",
          "Used to fala de estados e hábitos que não são mais verdade; would só serve para hábitos repetidos, não para estados.",
          "Conectores como when, while, after, by the time e as soon as deixam a ordem explícita."
        ],
        paraQueServe: "Contar histórias STAR e post-mortems de incidente de forma clara, com a ordem dos acontecimentos fácil de seguir."
      },
      glossario: [
        { t: "STAR", d: "Situation, Task, Action, Result: estrutura comum para responder perguntas comportamentais em entrevistas." },
        { t: "Past continuous", d: "was/were + verbo com -ing; mostra ação em andamento ou o cenário de uma história." },
        { t: "Past perfect", d: "had + particípio passado; marca o que aconteceu antes de outro momento passado." },
        { t: "used to", d: "Expressa estado ou hábito do passado que não é mais verdade: 'we used to deploy manually'." },
        { t: "would (hábito)", d: "Descreve ações repetidas no passado; não se usa para estados (não 'we would have a monolith')." },
        { t: "Conector temporal", d: "Palavra que liga eventos no tempo: when, while, after, before, by the time, as soon as." },
        { t: "Post-mortem", d: "Relato de um incidente depois que ele acabou: o que aconteceu, a causa e o que mudou." }
      ],
      blocos: [
        {
          t: "As três camadas da história",
          facil: "Traduzindo: o cenário vai no past continuous, a ação principal no past simple e o 'antes de tudo' no past perfect.",
          p: [
            "A página do British Council sobre o passado resume os tempos usados para narrar: o past simple, para eventos terminados; o past continuous, para uma ação em andamento interrompida por outra ('He broke his leg when he was playing rugby'); e o past perfect, para olhar de um ponto do passado para algo que já tinha acontecido (a página de past perfect traz 'When we arrived, the train had (already) left').",
            "Na prática, uma história de incidente usa as três camadas. Cenário: 'It was Friday evening and the batch job was running.' Evento: 'Suddenly, the job failed.' Antes: 'Someone had changed the schema earlier that day.'"
          ],
          tabela: {
            cab: ["Camada", "Tempo", "Exemplo"],
            linhas: [
              ["Cenário / em andamento", "Past continuous", "The pipeline was loading data when the alert fired."],
              ["Evento principal", "Past simple", "I opened the logs and found the error."],
              ["O que veio antes", "Past perfect", "A teammate had renamed a column the day before."]
            ]
          },
          dica: "Pergunte a si mesmo: isto é cenário, ação ou flashback? A resposta escolhe o tempo.",
          fonte: ["British Council LearnEnglish: falar sobre o passado", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past"]
        },
        {
          t: "Past continuous: o cenário e a interrupção",
          facil: "Traduzindo: use was/were + -ing para o que estava acontecendo; o past simple interrompe ou acontece dentro desse cenário.",
          p: [
            "Segundo a página de past continuous, a forma é was/were + -ing. Um uso é a ação em andamento quando outra acontece: 'The children were doing their homework when I got home'. Se fosse o past simple, a ação teria terminado antes de a outra começar. Outro uso é descrever um momento específico: 'It was eight o'clock. I was writing a letter.'",
            "A página também diz que o past continuous costuma abrir uma história como cenário: 'The other day I was waiting for a bus when…'. Verbos de estado, como need, normalmente não usam o continuous: 'When I got home, I really needed a shower'.",
            "Em uma história STAR: 'We were migrating the reporting layer when the finance team asked for a new KPI.' Em duas ações simultâneas, o past continuous funciona nas duas: 'While I was fixing the bug, my teammate was updating the docs.'"
          ],
          dica: "Estava fazendo X quando Y aconteceu: X no past continuous, Y no past simple.",
          fonte: ["British Council LearnEnglish: past continuous", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-continuous"]
        },
        {
          t: "Past perfect: o que tinha acontecido antes",
          facil: "Traduzindo: had + particípio mostra o que aconteceu antes de outro ponto no passado, principalmente quando a ordem pode confundir.",
          p: [
            "A página de past perfect do British Council mostra a forma had + particípio passado e usos como 'I couldn't get into the house. I had lost my keys'. Regra prática: past perfect para a ação mais antiga, past simple para a mais recente.",
            "Nos comentários da mesma página, a equipe explica que o past simple costuma bastar quando a ordem já está clara por outras palavras, como because. Já o past perfect é preferido quando a ordem poderia ser ambígua. Exemplo da página: 'When we arrived, the train had (already) left' deixa claro que o trem saiu antes.",
            "Com until, a página usa o past perfect para uma ação ainda não concluída quando outra aconteceu: 'I didn't say anything until she had finished talking.'",
            "No incidente: 'By the time I joined the call, the team had rolled back the release.' Se o trabalho de rollback foi concluído antes de você chegar, o had rolled back deixa isso explícito."
          ],
          lista: [
            "The job failed because someone had changed the schema.",
            "When I checked the logs, the retry had already succeeded.",
            "We hadn't tested the backfill before we ran it in production."
          ],
          dica: "Se duas ações vieram uma depois da outra e você quer deixar clara a ordem, a mais antiga leva had + particípio.",
          fonte: ["British Council LearnEnglish: past perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-perfect"]
        },
        {
          t: "Used to e would: como as coisas eram antes",
          facil: "Traduzindo: used to serve para estados e hábitos do passado; would só para hábitos repetidos, nunca para estados.",
          p: [
            "A página sobre hábitos no passado do British Council diz que used to descreve estados e hábitos que não são mais verdade, como 'I didn't use to like olives'. A pergunta usa did: 'Did you use to have a garden?'. Would descreve ações repetidas, é um pouco mais formal e comum em narrativas, mas não serve para estados.",
            "O past simple também pode substituir used to ou would, mas não destaca que o hábito foi repetido nem que parou. E para um evento único, só o past simple funciona: 'I went to Egypt in 2014.'",
            "No trabalho: 'We used to deploy by hand' (hábito que mudou) e 'We used to have a single monolithic job' (estado: would não cabe). 'Every Monday, we would review the failed jobs' funciona para hábito repetido. A página alerta para não confundir used to + verbo com be/get used to + -ing, que significa estar acostumado."
          ],
          dica: "Cuidado: depois de did, o used vira use: 'Did you use to…?' e 'I didn't use to…'.",
          fonte: ["British Council LearnEnglish: used to, would e past simple", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple"]
        },
        {
          t: "Conectores e a ordem da história",
          facil: "Traduzindo: conectores como when, while, after, by the time e as soon as dizem ao ouvinte o que veio primeiro.",
          p: [
            "Na página de past perfect, um comentário usa 'By that time, Crassus had died' para mostrar a ordem; o mesmo molde vale para by the time + past simple e past perfect. A equipe também diz que when sozinho pode sugerir que os eventos foram simultâneos, e que acrescentar already ajuda a mostrar a ordem. Para after, um comentário confirma que 'After the exams had finished' e a versão no past simple soam parecidos.",
            "Um uso comum: 'While I was reviewing the logs, I noticed a spike' (cenário com while mais past continuous, evento no past simple). 'As soon as the alert fired, I started investigating' mostra duas ações em sequência rápida. Esse uso de as soon as é uma regra prática comum e não foi conferido em uma das páginas abertas.",
            "Ordem para STAR: Situation no past continuous e past simple, Task no past simple, Action no past simple na ordem dos passos e Result no past simple com números, e, se precisar, flashback no past perfect."
          ],
          lista: [
            "Situation: We were running a nightly pipeline when the source schema changed.",
            "Task: I had to restore the reports before the 9 a.m. meeting.",
            "Action: As soon as I found the cause, I fixed the mapping and re-ran the load.",
            "Result: By the time the meeting started, the dashboards had refreshed."
          ],
          dica: "Um conector por frase já ajuda: não precisa usar todos. Escolha o que deixa a ordem mais clara.",
          fonte: ["British Council LearnEnglish: past perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-perfect"]
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: o português usa o pretérito imperfeito e o mais-que-perfeito de formas diferentes; ao traduzir direto, os tempos ingleses se confundem.",
          p: [
            "Erros comuns de falantes de português ao contar histórias (padrões de transferência; não há estatística aqui):",
            "'When I was arrived, the job already failed': mistura was com particípio e usa past simple para o que veio antes. O correto é 'When I arrived, the job had already failed'; a página de past perfect mostra o molde 'When I arrived, the train had already left'.",
            "'We used to deployed manually' e 'We didn't used to test': depois de used to vem o verbo base, e depois de did o certo é use. A página de hábitos mostra 'didn't use to'.",
            "'We would have a monolith in 2019' para descrever um estado: a página de hábitos diz que would não serve para estados; use used to ou past simple.",
            "'I was knowing the error': verbos de estado normalmente não usam o continuous, como mostra a página de past continuous com 'needed'.",
            "'Before two years' para 'há dois anos': em inglês, o tempo contado a partir de hoje usa ago: 'two years ago'. Isso é erro comum de falantes de português; as páginas abertas da aula não discutem esse caso."
          ],
          armadilha: "Antes de usar had, confirme se há mesmo duas ações no passado e se uma veio antes da outra; se não houver, use past simple.",
          fonte: ["British Council LearnEnglish: past perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-perfect"]
        }
      ],
      exemplo: {
        t: "Uma história de incidente em STAR",
        texto: "Pergunta: 'Tell me about a time you handled a production incident.' Resposta modelo: 'Last March, we were running our nightly pipeline when the finance dashboards stopped refreshing. I had to restore them before the 9 a.m. leadership meeting. While I was checking the logs, I noticed that a teammate had renamed a column in the source table the day before, and nobody had updated our mapping. As soon as I found the cause, I fixed the mapping, re-ran the load and added a schema check. By the time the meeting started, the dashboards had refreshed. Since then, we haven't had the same issue.' Repare nos tempos: past continuous para o cenário e o que estava em andamento, past simple para as ações, past perfect para o que veio antes e, no final, present perfect para ligar ao presente."
      },
      prova: [
        "Entrevista: contar uma história STAR com cenário, ação e resultado, sem confundir a ordem dos eventos.",
        "Post-mortem: explicar a linha do tempo do incidente com when, while, after e by the time.",
        "Reunião: dizer 'We used to deploy manually; now we use CI' ao explicar uma mudança de processo.",
        "Entrevista: responder 'What had you tried before you asked for help?' usando past perfect."
      ],
      explique: "Explique com as próprias palavras o papel do past simple, do past continuous e do past perfect numa história de incidente, e quando você usa used to e would.",
      checagem: [
        "Como você escolhe entre past simple, past continuous e past perfect numa história?",
        "Qual é a diferença entre used to e would, e por que would não serve para estados?",
        "Que conector você usaria para dizer que algo já tinha acontecido quando você chegou, e que tempo vem junto?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: falar sobre o passado", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past"],
      ["British Council LearnEnglish: past continuous", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-continuous"],
      ["British Council LearnEnglish: past perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-perfect"],
      ["British Council LearnEnglish: used to, would e past simple", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple"]
    ],
    cartoes: [
      { id: "g2c1", f: "Corrija: 'When I was arrived, the job already failed.'", v: "When I arrived, the job had already failed. Ação mais antiga no past perfect, a mais recente no past simple.", t: "g2" },
      { id: "g2c2", f: "Complete: 'We ___ (run) the job when the alert fired.'", v: "were running. Ação em andamento quando outra acontece: past continuous.", t: "g2" },
      { id: "g2c3", f: "Corrija: 'We used to deployed manually.'", v: "We used to deploy manually. Depois de used to vem o verbo base.", t: "g2" },
      { id: "g2c4", f: "Corrija: 'Did you used to work with Spark?'", v: "Did you use to work with Spark? Depois de did, o used vira use.", t: "g2" },
      { id: "g2c5", f: "'We would have a monolith in 2019': o que está errado?", v: "Would não serve para estados. Use 'We used to have a monolith' ou past simple.", t: "g2" },
      { id: "g2c6", f: "Complete: 'By the time I joined, the team ___ (roll back) the release.'", v: "had rolled back. Ação concluída antes do ponto no passado: past perfect.", t: "g2" },
      { id: "g2c7", f: "Corrija: 'Before two years I moved to Berlin.'", v: "Two years ago, I moved to Berlin. Tempo contado a partir de hoje usa ago: erro comum de falantes de português.", t: "g2" },
      { id: "g2c8", f: "Complete: '___ I was reviewing the logs, I noticed a spike.' (while ou when?)", v: "While é o mais típico. While combina bem com past continuous para uma ação em andamento (when também seria possível).", t: "g2" },
      { id: "g2c9", f: "Como dizer 'assim que o alerta disparou, comecei a investigar'?", v: "As soon as the alert fired, I started investigating. Duas ações em sequência: past simple nas duas.", t: "g2" },
      { id: "g2c10", f: "Corrija: 'I was knowing the root cause.'", v: "I knew the root cause. Verbo de estado normalmente não usa o continuous.", t: "g2" },
      { id: "g2c11", f: "Past simple ou past perfect? 'I opened the logs. Someone changed the schema earlier.'", v: "Someone had changed the schema earlier. Era a ação mais antiga: past perfect.", t: "g2" },
      { id: "g2c12", f: "Quais tempos formam o cenário, a ação e o flashback de uma história?", v: "Cenário: past continuous. Ação: past simple. Flashback: past perfect.", t: "g2" }
    ],
    questoes: [
      {
        id: "g2q1", s: 1, t: "g2",
        e: "Você conta um incidente: o job estava rodando e, nesse momento, o alerta disparou. Complete: 'We ___ the nightly job when the alert fired.'",
        o: ["ran", "have run", "were running", "had run"],
        c: [2],
        x: "A ação em andamento quando outra acontece pede past continuous: were running. O past simple (ran) diria que o job foi executado até o fim antes do alerta, e não que estava em curso. O present perfect (have run) liga ao presente e não conta história no passado. O past perfect (had run) marcaria uma ação anterior concluída, o que não é o sentido de estar em andamento quando o alerta disparou."
      },
      {
        id: "g2q2", s: 1, t: "g2",
        e: "Ao chegar na call de incidente, o time já tinha feito o rollback. Qual frase mostra com clareza que o rollback veio antes de você chegar?",
        o: ["By the time I joined the call, the team rolled back the release.", "By the time I joined the call, the team had rolled back the release.", "By the time I joined the call, the team was rolling back the release.", "By the time I joined the call, the team has rolled back the release."],
        c: [1],
        x: "A ação mais antiga (o rollback) vai para o past perfect, e a mais recente (entrar na call) fica no past simple: had rolled back. O past perfect com o past simple é o molde da página de past perfect do British Council (ex.: 'When we arrived, the train had (already) left'). O past simple até seria aceito quando a ordem fica clara, mas aqui o had deixa tudo explícito. O past continuous diria que o rollback estava acontecendo, e o present perfect não se encaixa em uma história no passado."
      },
      {
        id: "g2q3", s: 1, t: "g2",
        e: "Escolha a frase correta para dizer que, antigamente, a equipe fazia deploys manuais e hoje não faz mais.",
        o: ["We used to deployed manually.", "We were use to deploy manually.", "We would deploying manually.", "We used to deploy manually."],
        c: [3],
        x: "Used to + verbo base descreve um hábito do passado que não é mais verdade: We used to deploy manually. A primeira alternativa errada coloca o verbo no passado depois de used to, erro comum entre aprendizes. A segunda mistura was com use to, que não existe nessa forma. A terceira usa would com -ing, que não é uma construção válida; would, para hábitos, vem com o verbo base e nunca com -ing."
      },
      {
        id: "g2q4", s: 1, t: "g2",
        e: "Choose two sentences that are correct ways to describe a past STATE (how things were). (Escolha duas)",
        o: ["We used to have a single monolithic job.", "We would have a single monolithic job.", "We had a single monolithic job.", "We were having a single monolithic job."],
        c: [0, 2],
        x: "Para um estado do passado, a página do British Council aceita used to e past simple: We used to have e We had. Would não é usado com estados, então a frase com would está incorreta. A forma com were having usa o continuous com 'have' no sentido de possuir, que é um verbo de estado e normalmente não usa -ing. As duas respostas certas expressam o mesmo estado que não é mais verdade."
      },
      {
        id: "g2q5", s: 1, t: "g2",
        e: "O recrutador pergunta: 'Did you work with Kafka at your previous job?' Qual é a pergunta com used to correta, caso você queira perguntar sobre um hábito antigo?",
        o: ["Did you used to work with Kafka?", "Were you use to work with Kafka?", "Did you use to work with Kafka?", "Do you used to work with Kafka?"],
        c: [2],
        x: "Com did, o verbo used vira use: Did you use to work with Kafka? A página do British Council mostra a mesma estrutura em 'Did you use to have a garden?'. A forma 'Did you used to' mantém o -d desnecessariamente. 'Were you use to' mistura be com use e muda o sentido. 'Do you used to' mistura o presente do auxiliar com o passado de used."
      },
      {
        id: "g2q6", s: 1, t: "g2",
        e: "Qual frase conta corretamente o que aconteceu em uma história: o cenário estava em curso e uma ação o interrompeu?",
        o: ["We were migrating the reporting layer when finance asked for a new KPI.", "We migrated the reporting layer when finance was asking for a new KPI.", "We had migrated the reporting layer when finance asked for a new KPI.", "We migrate the reporting layer when finance asked for a new KPI."],
        c: [0],
        x: "O cenário em curso vai no past continuous (were migrating) e a interrupção no past simple (asked), que é o padrão mostrado pela página de past continuous. Inverter os tempos (migrated e was asking) troca quem interrompe quem. O past perfect (had migrated) diria que a migração já tinha acabado, e o presente simples não se combina com uma história no passado."
      },
      {
        id: "g2q7", s: 1, t: "g2",
        e: "Corrija o erro na frase de entrevista: 'When I was arrived at the call, the incident already ended.' Qual versão está correta?",
        o: ["When I arrived at the call, the incident was already ending.", "When I was arrived at the call, the incident had ended.", "When I have arrived at the call, the incident already ended.", "When I arrived at the call, the incident had already ended."],
        c: [3],
        x: "Chegar é past simple (arrived, sem was) e o que veio antes fica no past perfect (had already ended), como no exemplo 'When I arrived, the train had already left' da página do British Council. A versão com was arrived mistura voz passiva com particípio. A versão com have arrived usa present perfect em uma história no passado. A versão com was already ending muda o sentido, porque indica que o incidente ainda estava terminando."
      },
      {
        id: "g2q8", s: 1, t: "g2",
        e: "[C1] Which sentence uses the connector 'while' most naturally to describe two things happening at the same time in an incident?",
        o: ["While I fix the bug, my teammate updated the docs.", "While I was fixing the bug, my teammate was updating the docs.", "While I had fixed the bug, my teammate updated the docs.", "While I fixed the bug, my teammate has been updating the docs."],
        c: [1],
        x: "Duas ações simultâneas em andamento pedem past continuous nas duas partes: While I was fixing the bug, my teammate was updating the docs. A primeira alternativa errada mistura presente e passado. A terceira usa past perfect, que marca uma ação anterior concluída, e não simultaneidade. A quarta mistura past simple e present perfect continuous, que não combinam em uma história no passado."
      },
      {
        id: "g2q9", s: 1, t: "g2",
        e: "Escolha a frase que tem a ordem dos tempos mais clara em uma história STAR sobre um dashboard quebrado.",
        o: ["The dashboard was broken because someone changed the schema earlier.", "The dashboard was broken because someone has changed the schema earlier.", "The dashboard was broken because someone had changed the schema earlier.", "The dashboard has been broken because someone changes the schema earlier."],
        c: [2],
        x: "O dashboard quebrado e a mudança de schema ocorreram no passado, e a mudança veio antes, então a causa fica no past perfect: had changed. A versão em past simple seria aceitável em contexto claro, mas a ordem fica menos explícita, e a página de past perfect do British Council diz que o past perfect é preferido quando a ordem poderia ser ambígua. As versões com has changed e changes misturam presente com um fato passado."
      },
      {
        id: "g2q10", s: 1, t: "g2",
        e: "[C1] In an interview you say: 'I didn't say anything to the stakeholder until I ___ the root cause.' Which option fits best, following the idea that the action had not happened before the other one?",
        o: ["had confirmed", "was confirming", "confirm", "have confirmed"],
        c: [0],
        x: "Com until, o past perfect mostra que a ação ainda não estava concluída quando a outra aconteceu: until I had confirmed. A página do British Council traz o exemplo 'I didn't say anything until she had finished talking'. O past continuous (was confirming) descreveria algo em andamento, não concluído. O presente simples (confirm) e o present perfect (have confirmed) não pertencem a uma frase cujo verbo principal está no passado."
      },
      {
        id: "g2q11", s: 1, t: "g2",
        e: "Complete: 'As soon as the alert ___, I opened the dashboard and started investigating.'",
        o: ["fired", "has fired", "was firing", "fires"],
        c: [0],
        x: "As duas ações aconteceram em sequência no passado, então o past simple resolve as duas: As soon as the alert fired, I opened the dashboard. O present perfect ligaria o alerta ao presente. O past continuous mostraria o alerta em andamento, mas o sentido aqui é de um evento que disparou e levou a uma reação. O presente simples não cabe em uma frase cujo verbo principal está no passado."
      },
      {
        id: "g2q12", s: 1, t: "g2",
        e: "Em português, 'não tinha testado' costuma ser traduzido direto. Qual frase em inglês expressa corretamente que você ainda não tinha testado o backfill antes de rodar em produção?",
        o: ["I wasn't testing the backfill before I ran it in production.", "I haven't tested the backfill before I ran it in production.", "I hadn't tested the backfill before I ran it in production.", "I didn't tested the backfill before I ran it in production."],
        c: [2],
        x: "A ação que não tinha acontecido antes de outra no passado pede past perfect negativo: I hadn't tested the backfill before I ran it. O past continuous negativo diz que você não estava testando naquele momento, o que muda o sentido. O present perfect negativo liga ao presente e não combina com ran. A última tem o erro de colocar o verbo no passado depois de didn't."
      }
    ],
    lab: {
      t: "Treino de fala: contar um incidente em STAR",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Contar uma história em voz alta mostra se você controla a ordem dos tempos (cenário, ação e flashback) sem precisar escrever.",
      antes: "Ter lido a aula e escolhido um episódio real do seu trabalho (um incidente, uma entrega ou um conflito). Ter à mão datas e números aproximados. Este roteiro não foi executado por quem escreveu a aula: adapte os tempos de gravação ao seu ritmo.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote quatro palavras do episódio: o cenário, o problema, a ação que você tomou e o resultado com um número. Não escreva frases." },
        { t: "Gravar a primeira versão (2 a 3 min)", p: "Conte a história em STAR. Use pelo menos uma frase com 'was/were + -ing' para o cenário e uma com 'had + particípio' para o que veio antes." },
        { t: "Ouvir contando erros", p: "Ouça uma vez e marque: quantas vezes confundiu past simple com past perfect, se usou 'used to' com verbo base e se esqueceu um conector (when, while, as soon as, by the time)." },
        { t: "Regravar corrigindo", p: "Grave de novo corrigindo os erros marcados. Se travar, volte ao início da frase em vez de se corrigir no meio." },
        { t: "Fechar com o antes e o depois", p: "Em uma gravação curta, diga: 'We used to ___; now we ___.' sobre uma mudança que seu episódio gerou." }
      ],
      verificar: "Você usou past continuous para o cenário em pelo menos 2 frases; usou past perfect para um fato anterior em pelo menos 1 frase; usou 'used to' com verbo base em 1 frase; e usou pelo menos 3 conectores diferentes (when, while, as soon as, by the time, after).",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Se o episódio envolve dados ou nomes reais da empresa, não compartilhe a gravação.",
        "Anote qual tempo mais apareceu errado para focar nele na próxima aula."
      ],
      erros: [
        { s: "Misturo a ordem dos acontecimentos", c: "Contar tudo no mesmo tempo, sem separar o que veio antes.", r: "Antes de gravar, ponha as ações em ordem numa lista e marque o que veio primeiro; esse é o candidato a past perfect." },
        { s: "Usei had em todas as frases", c: "Excesso de cuidado com o passado antes do passado.", r: "Use had só quando a ordem puder confundir; nas demais, past simple basta." },
        { s: "Falo 'used to' e depois 'did' no passado", c: "Mistura com o português ('costumava').", r: "Lembre: used to + verbo base; depois de did, use use. Regrave só essas frases." },
        { s: "Esqueço os conectores", c: "A atenção fica no verbo e não na ligação.", r: "Escolha dois conectores antes de gravar e use-os de propósito: um para cenário (while) e um para sequência (as soon as)." }
      ]
    }
  };

  /* ===================== AULA 3 ===================== */
  C.dias[3] = {
    aula: {
      titulo: "Resultados e números: comparar, descrever mudanças e usar data, information e feedback",
      resumo: "Como falar de resultados com números em inglês: comparativos e superlativos, 'from X to Y', 'by X%', 'an increase of', preposições de mudança, e como lidar com substantivos contáveis e incontáveis (data, information, feedback, advice, equipment) e com os artigos a, the e nenhum artigo.",
      simples: {
        analogia: "Imagine que você está mostrando o painel de um carro. Cada preposição aponta uma parte do ponteiro. 'From 3 hours to 40 minutes' mostra onde o ponteiro estava e onde chegou. 'By 25%' mostra o tamanho do movimento, só a distância percorrida. 'Of 25%' fala da distância quando você usa o substantivo: 'an increase of 25%'. E 'in' diz o que mexeu: 'an increase in sales'. Já os substantivos incontáveis são como água na jarra: você não conta 'duas águas' nem 'uma informação', você mede em 'um copo de' ou 'um pedaço de': a piece of information, a piece of advice. Se você pensar em medir em vez de contar, 'informations' e 'a data' deixam de aparecer.",
        pontos: [
          "Comparativo usa than; superlativo usa the: faster than the old job, the fastest pipeline.",
          "From X to Y mostra o ponto de partida e o de chegada; by X% mostra só o tamanho da mudança.",
          "Substantivo + preposição: an increase of 8%, a rise in prices, a 21 per cent fall in spending.",
          "Information, advice, equipment e feedback não têm plural e não levam a/an: some feedback, a piece of advice.",
          "Artigo: a/an para algo novo ou de um tipo, the para algo que o ouvinte já sabe qual é, nada para plural ou incontável em geral."
        ],
        paraQueServe: "Apresentar resultados com números de forma natural em entrevistas, reuniões e negociação, sem tropeçar em preposições e artigos."
      },
      glossario: [
        { t: "Comparativo", d: "Forma que compara duas coisas: faster than, more reliable than; muda a forma ou usa more." },
        { t: "Superlativo", d: "Forma que escolhe um item do grupo: the fastest, the most reliable; leva the." },
        { t: "from X to Y", d: "Ponto de partida e ponto de chegada de uma mudança: from 3 hours to 40 minutes." },
        { t: "by (mudança)", d: "Diz o tamanho da mudança: costs fell by 25%; não diz o valor final." },
        { t: "Substantivo incontável", d: "Substantivo sem plural que não leva a/an: information, advice, equipment, feedback." },
        { t: "a piece of", d: "Expressão que transforma um incontável em unidade: a piece of advice, a piece of equipment." },
        { t: "Artigo zero", d: "Ausência de artigo antes de plural ou incontável em sentido geral: Data drives decisions." }
      ],
      blocos: [
        {
          t: "Comparativos e superlativos para comparar resultados",
          facil: "Traduzindo: use than para comparar duas coisas e the + superlativo para destacar a melhor ou a pior de um grupo.",
          p: [
            "A página do British Council sobre adjetivos comparativos e superlativos diz que o comparativo usa than para comparar uma coisa com outra: 'She is two years older than me'. Para mudanças graduais, usa-se dois comparativos com and: 'Everything is getting more and more expensive'. E para uma coisa que depende da outra, usa-se the + comparativo nas duas partes: 'The faster you drive, the more dangerous it is'.",
            "O superlativo leva the para escolher um item de um grupo: 'It was the happiest day of my life'. Adjetivos de uma sílaba usam -er e -est; os de duas ou mais sílabas costumam usar more e most (alguns de duas sílabas aceitam as duas formas); e good, bad e far são irregulares (better, best; worse, worst). Segundo a equipe da página, o the é necessário quando o superlativo vem antes do substantivo.",
            "No trabalho: 'The new pipeline is faster than the old one.' 'This is the most reliable job we have.' 'The more we automate, the fewer manual errors we get.' (Aqui o fewer segue a regra de few com contáveis, mostrada pela página da Purdue sobre contáveis; a frase 'The more we automate...' é exemplo nosso.)"
          ],
          lista: [
            "faster than the old pipeline",
            "the most reliable job on the platform",
            "better results than last quarter, the best in two years",
            "The sooner we fix it, the smaller the impact."
          ],
          dica: "Não use 'more fast' nem 'the most fast': adjetivos curtos usam -er e -est.",
          fonte: ["British Council LearnEnglish: comparativos e superlativos", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/comparative-superlative-adjectives"]
        },
        {
          t: "From X to Y, by X% e an increase of",
          facil: "Traduzindo: from...to dá o início e o fim; by dá o tamanho da mudança; of e in aparecem quando você usa o substantivo.",
          p: [
            "A página do British Council sobre como descrever um gráfico de barras mostra o verbo e o substantivo para a mesma ideia: 'Spending fell by 21 per cent' equivale a 'There was a 21 per cent fall in spending'. O texto da página também usa by para o tamanho da mudança ('dropped by 14 per cent') e to para o valor final ('... to $4.5 billion'), e 'a rise of 32 per cent' para o tamanho com o substantivo. O molde completo from X to Y, que junta início e fim, é padrão comum de relatórios e não aparece literalmente nessas frases.",
            "Com o substantivo, a preposição depende do que você diz. A página mostra 'a rise of 32 per cent' (tamanho) e 'a 21 per cent fall in spending' (tamanho antes do substantivo, in para o que mudou). Por analogia, 'an increase of 8%' dá o tamanho e 'an increase in sales' diz o que mudou. Os pares verbo e substantivo comuns são rise e a rise, fall e a fall, increase e an increase, decrease e a decrease.",
            "No trabalho: 'We reduced the runtime from three hours to forty minutes.' 'Costs fell by 25%.' 'There was an increase of 12% in daily active users.' 'We saw a 30% drop in failed jobs.'"
          ],
          tabela: {
            cab: ["Padrão", "Exemplo", "O que mostra"],
            linhas: [
              ["verbo + from X to Y", "Runtime fell from 3 hours to 40 minutes.", "Início e fim"],
              ["verbo + by X%", "Costs fell by 25%.", "Tamanho da mudança"],
              ["an increase of X%", "an increase of 12%", "Tamanho (com substantivo)"],
              ["an increase in + coisa", "an increase in sales", "O que mudou"],
              ["a X% fall in + coisa", "a 21% fall in spending", "Tamanho e coisa, juntos"]
            ]
          },
          dica: "Use 'by' quando disser só o tamanho e 'from...to' quando quiser mostrar o antes e o depois.",
          fonte: ["British Council LearnEnglish: descrever um gráfico de barras", "https://learnenglish.britishcouncil.org/skills/writing/b1-writing/describing-bar-chart"]
        },
        {
          t: "Preposições de mudança: mais exemplos prontos",
          facil: "Traduzindo: guarde cinco moldes e troque só os números e as palavras do seu trabalho.",
          p: [
            "A página de gráficos do B1 do British Council traz um texto-modelo com 'smartphone ownership increased during the six-year period' e 'rose steadily, starting at around 35% in 2011 and reaching about 77% by 2016'. Repare que by 2016 mostra um prazo, não um tamanho de mudança, e que steadily descreve o ritmo.",
            "Com o mesmo raciocínio, você pode montar frases de entrevista: 'Data quality incidents dropped from twelve a month to two.' 'Our pipeline success rate rose by 15 points.' 'We reached 99.5% availability by December.' A frase 'by 15 points' mostra o tamanho em pontos percentuais.",
            "Observação: as preposições com numeral seguem o uso das páginas do British Council acima. O uso de 'points' é meu e comum em relatórios; não foi conferido em uma página específica."
          ],
          lista: [
            "rose / fell from A to B",
            "rose / fell by X%",
            "reached X by [data]",
            "an increase of X% in [coisa]",
            "a X% drop in [coisa]"
          ],
          dica: "Em reunião, comece pelo número que importa: 'We cut costs by 25%, from $40k to $30k a month.'",
          fonte: ["British Council LearnEnglish: descrever gráficos (B1)", "https://learnenglish.britishcouncil.org/free-resources/writing/b1/describing-charts"]
        },
        {
          t: "Incontáveis: information, advice, equipment, feedback, data",
          facil: "Traduzindo: esses substantivos não têm plural e não levam a/an. Use some, much, a piece of.",
          p: [
            "A página do British Council sobre substantivos incontáveis diz que eles não têm plural e não levam a/an. A lista de exemplos inclui advice, equipment, furniture, knowledge, luggage, news e traffic, e a página usa information nos exemplos de abertura. Para contar uma unidade, usa-se a piece of, a bit of ou an item of (nossos exemplos: 'a piece of advice', 'a piece of equipment'). Os incontáveis usam verbo no singular e quantificadores como some, a lot of e how much.",
            "A página da Purdue sobre contáveis e incontáveis confirma as palavras de quantidade: much e little vão com incontáveis; many e few com contáveis. 'We don't have much time to get this done.' 'There are few doctors in town.'",
            "Para o trabalho: 'We need more information.' (não informations) 'Can you give me some feedback?' (não a feedback) 'This is a useful piece of advice.' 'We have little data for that region.' Sobre data: as páginas abertas desta aula não tratam dessa palavra. Na prática de trabalho com dados, ela costuma ser usada como substantivo de massa, igual a information ('The data is ready'), e por isso 'a data' soa estranho; essa parte é regra prática, não fonte aberta. Do mesmo modo, feedback é tratado como incontável no uso comum, mas isso não foi confirmado em uma das páginas abertas."
          ],
          tabela: {
            cab: ["Errado (erro comum)", "Certo", "Por quê"],
            linhas: [
              ["informations", "information", "Sem plural"],
              ["an advice", "a piece of advice", "Sem a/an"],
              ["equipments", "equipment / pieces of equipment", "Sem plural"],
              ["a feedback", "some feedback / a piece of feedback", "Tratado como incontável"],
              ["a data", "some data / a data set", "Massa; para unidade, data set"]
            ]
          },
          armadilha: "Informations, advices e equipments são erros comuns de falantes de português, que têm 'informações' e 'conselhos' no plural. A página do British Council confirma que advice, equipment e information não têm plural.",
          fonte: ["British Council LearnEnglish: substantivos incontáveis", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/uncount-nouns"]
        },
        {
          t: "Artigos: a, the ou nenhum",
          facil: "Traduzindo: a/an para algo novo ou de um tipo, the para algo que o ouvinte já sabe qual é, e nenhum artigo para plural e incontável em geral.",
          p: [
            "A página de artigos do British Council diz que a/an serve para algo mencionado pela primeira vez ou que faz parte de um tipo ('I bought a new phone'), e the, quando o ouvinte já sabe de qual coisa se fala, por ter sido mencionada ou por ser única ('Can you pass the salt?'). Para plural ou incontável em sentido geral, não há artigo: 'Dogs are loyal animals', 'Coffee keeps me awake'.",
            "Para grupos específicos, volta o the: 'The dogs in this park are friendly'. O mesmo vale para incontáveis específicos, por regra geral de artigos: 'The information in your files is correct.'",
            "No trabalho: 'We built a pipeline for the finance team. The pipeline loads data every hour.' (a na primeira menção, the na segunda). 'Data quality matters.' (geral, sem artigo). 'The data in this table is outdated.' (específico, com the)."
          ],
          dica: "Pergunte: o ouvinte já sabe qual? Sim, the. Primeira menção, a/an. Geral, plural ou incontável, nenhum.",
          fonte: ["British Council LearnEnglish: artigos a, an, the", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/articles-a-an-the"]
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: o português ajuda no sentido, mas atrapalha em plurais, artigos e preposições.",
          p: [
            "Erros comuns de falantes de português ao falar de resultados (padrões de transferência; não há estatística aqui):",
            "'Informations', 'advices' e 'equipments': em português, são palavras que têm plural. Em inglês, a página de incontáveis do British Council lista advice, equipment e information sem plural.",
            "'A data' e 'datas': tratadas aqui como erro comum de falantes de português; as páginas abertas desta aula não tratam de data, então a regra é prática: use some data, the data, a lot of data.",
            "'We reduced in 25%' em vez de 'by 25%': a preposição que mostra o tamanho da mudança em inglês é by, como mostram os exemplos do British Council ('fell by 21 per cent'). É erro comum de falantes de português.",
            "'More fast' e 'the most fast': adjetivos curtos usam -er e -est, segundo a página de comparativos do British Council.",
            "'The dogs are loyal' para falar de cachorros em geral e 'the data is important' quando é geral: a página de artigos mostra que o geral fica sem artigo. Em português, o artigo aparece ('os dados são importantes'), mas em inglês o geral fica sem."
          ],
          armadilha: "Na dúvida entre 'in' e 'by' depois de verbos como increase e fall: by para o tamanho da mudança, in para o que mudou (com substantivos).",
          fonte: ["British Council LearnEnglish: comparativos e superlativos", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/comparative-superlative-adjectives"]
        }
      ],
      exemplo: {
        t: "Apresentando resultados em uma negociação",
        texto: "Em uma conversa sobre promoção, você diz: 'Over the past year, I've led three projects. The new pipeline is much faster than the old one: it runs in forty minutes, compared to three hours before, so runtime fell from three hours to forty minutes. Our cloud costs fell by 25%, which is the biggest saving we've had in two years. There was also a 40% drop in failed jobs. Besides the numbers, I've received a lot of positive feedback from the finance team, and my manager gave me some good advice on leading the migration. The data shows that we now have the most stable platform since I joined.' Repare em from...to, by, a 40% drop in, feedback e advice sem artigo nem plural, data como substantivo de massa e os superlativos com the."
      },
      prova: [
        "Entrevista: descrever um resultado com número usando from X to Y ou by X%.",
        "Negociação: justificar um pedido comparando antes e depois com 'faster than', 'the biggest saving'.",
        "Reunião: pedir 'some feedback' e 'more information' sem erros de plural e artigo.",
        "Relatório: escrever 'an increase of' e 'a rise in' com a preposição certa."
      ],
      explique: "Explique com as próprias palavras a diferença entre by X% e from X to Y, e por que information, advice e feedback não têm plural nem levam a/an.",
      checagem: [
        "Quando você usa by e quando usa from...to ao descrever uma mudança?",
        "Como você diz 'um conselho' e 'um equipamento' em inglês, sem 'an advice' nem 'an equipment'?",
        "Em que situação usa 'the data' e em que situação usa 'data' sem artigo?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: comparativos e superlativos", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/comparative-superlative-adjectives"],
      ["British Council LearnEnglish: descrever um gráfico de barras", "https://learnenglish.britishcouncil.org/skills/writing/b1-writing/describing-bar-chart"],
      ["British Council LearnEnglish: descrever gráficos (B1)", "https://learnenglish.britishcouncil.org/free-resources/writing/b1/describing-charts"],
      ["British Council LearnEnglish: substantivos incontáveis", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/uncount-nouns"],
      ["British Council LearnEnglish: artigos a, an, the", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/articles-a-an-the"],
      ["Purdue OWL: substantivos contáveis e incontáveis", "https://owl.purdue.edu/owl/general_writing/grammar/count_and_noncount_nouns/index.html"]
    ],
    cartoes: [
      { id: "g3c1", f: "Corrija: 'We need more informations.'", v: "We need more information. Information não tem plural.", t: "g3" },
      { id: "g3c2", f: "Corrija: 'Can you give me an advice?'", v: "Can you give me some advice? (ou a piece of advice). Advice não tem plural e não leva a/an.", t: "g3" },
      { id: "g3c3", f: "Corrija: 'We reduced the costs in 25%.'", v: "We reduced the costs by 25%. By mostra o tamanho da mudança.", t: "g3" },
      { id: "g3c4", f: "Como dizer 'o tempo caiu de 3 horas para 40 minutos'?", v: "Runtime fell from three hours to forty minutes. From...to mostra início e fim.", t: "g3" },
      { id: "g3c5", f: "Corrija: 'This pipeline is more fast than the old one.'", v: "This pipeline is faster than the old one. Adjetivo curto: -er + than.", t: "g3" },
      { id: "g3c6", f: "Complete: 'This is ___ most reliable job we have.'", v: "the. Superlativo leva the.", t: "g3" },
      { id: "g3c7", f: "Como dizer 'um aumento de 12%' e 'um aumento nas vendas'?", v: "an increase of 12% / an increase in sales. Of para o tamanho, in para o que mudou.", t: "g3" },
      { id: "g3c8", f: "Corrija: 'We need new equipments for the lab.'", v: "We need new equipment for the lab. Equipment não tem plural.", t: "g3" },
      { id: "g3c9", f: "Corrija: 'I got a feedback from my manager.'", v: "I got some feedback from my manager. Feedback é tratado como incontável no uso comum.", t: "g3" },
      { id: "g3c10", f: "Corrija: 'The datas are ready.'", v: "The data is ready. Data se comporta como massa no trabalho com dados; datas é erro comum de falantes de português.", t: "g3" },
      { id: "g3c11", f: "'Data quality matters' ou 'The data quality matters': qual fala em geral?", v: "Data quality matters. Sentido geral: sem artigo; com the, fala de algo específico.", t: "g3" },
      { id: "g3c12", f: "Complete: 'We built ___ pipeline. ___ pipeline loads data hourly.'", v: "a / The. Primeira menção, a; segunda, quando o ouvinte já sabe qual, the.", t: "g3" }
    ],
    questoes: [
      {
        id: "g3q1", s: 1, t: "g3",
        e: "Você apresenta um ganho de desempenho. Escolha a frase correta: 'We cut the nightly load time ___.'",
        o: ["from three hours to forty minutes", "of three hours for forty minutes", "in three hours by forty minutes", "to three hours from forty minutes"],
        c: [0],
        x: "From...to dá o ponto de partida e o de chegada, na ordem certa: from three hours to forty minutes. A versão com of e for troca as preposições sem sentido. A versão com in e by mistura os papéis: by mostra o tamanho da mudança, não o valor final. A última inverte a ordem e diria que o tempo subiu de 40 minutos para 3 horas, ao contrário do que você quer dizer."
      },
      {
        id: "g3q2", s: 1, t: "g3",
        e: "Qual frase diz corretamente que os custos caíram 25%, sem citar o valor inicial e o final?",
        o: ["Costs fell in 25%.", "Costs fell by 25%.", "Costs fell of 25%.", "Costs fell from 25%."],
        c: [1],
        x: "By mostra o tamanho da mudança: Costs fell by 25%, como em 'Spending fell by 21 per cent' no exemplo do British Council. 'In 25%' é a tradução direta do português e é erro comum de falantes de português. 'Of 25%' funciona com o substantivo (a fall of 25%), mas não depois do verbo fell. 'From 25%' indicaria o valor inicial, e não o tamanho da queda."
      },
      {
        id: "g3q3", s: 1, t: "g3",
        e: "Escolha a frase correta para pedir opinião sobre uma apresentação que você acabou de fazer.",
        o: ["Could I get a feedback on my presentation?", "Could I get some feedbacks on my presentation?", "Could I get feedbacks on my presentation?", "Could I get some feedback on my presentation?"],
        c: [3],
        x: "Feedback é tratado como incontável no uso comum: some feedback, sem plural e sem a/an. As alternativas com a feedback, some feedbacks e feedbacks tratam a palavra como contável, que é o erro comum de falantes de português. Nota: essa regra sobre feedback não foi confirmada em uma página aberta nesta aula; ela segue o comportamento de information e advice, que o British Council lista como incontáveis."
      },
      {
        id: "g3q4", s: 1, t: "g3",
        e: "Choose two correct sentences about the noun 'information' when you ask a colleague for details at work. (Escolha duas)",
        o: ["We need more information about the schema.", "We need more informations about the schema.", "Can you send me a piece of information?", "Can you send me an information?"],
        c: [0, 2],
        x: "Information é incontável: more information está correto, e a piece of information é a forma de contar uma unidade, como a página de incontáveis do British Council mostra com a piece of. 'Informations' coloca plural onde não existe. 'An information' usa o artigo indefinido, que incontáveis não aceitam. Repare que as duas respostas certas mantêm information sem plural."
      },
      {
        id: "g3q5", s: 1, t: "g3",
        e: "Você compara o novo pipeline com o antigo em uma reunião de resultados. Qual frase compara corretamente os dois?",
        o: ["The new pipeline is more fast than the old one.", "The new pipeline is faster than the old one.", "The new pipeline is fastest than the old one.", "The new pipeline is more faster that the old one."],
        c: [1],
        x: "Adjetivos curtos formam o comparativo com -er e usam than: faster than. 'More fast' mistura as duas formas. 'Fastest' é superlativo e não vai com than. 'More faster' duplica a marca de comparativo, e 'that' no lugar de than também está errado. A página de comparativos do British Council mostra -er para adjetivos de uma sílaba."
      },
      {
        id: "g3q6", s: 1, t: "g3",
        e: "Você destaca a maior economia do período em uma negociação. Complete: 'This is ___ biggest cost saving we have had in two years.'",
        o: ["a", "the", "an", "no article"],
        c: [1],
        x: "O superlativo escolhe um item de um grupo e leva the: the biggest cost saving, como em 'It was the happiest day of my life', da página do British Council. Usar a ou an não combina com superlativo. Sem artigo também não, porque a frase pede a marca do item único do grupo. A equipe da página diz que o the é necessário quando o superlativo vem antes do substantivo."
      },
      {
        id: "g3q7", s: 1, t: "g3",
        e: "Qual frase descreve um aumento usando o substantivo corretamente: o tamanho e a coisa que mudou?",
        o: ["There was an increase of 12% in daily active users.", "There was an increase in 12% of daily active users.", "There was an increase by 12% on daily active users.", "There was an increasing of 12% to daily active users."],
        c: [0],
        x: "Com o substantivo, of mostra o tamanho e in mostra o que mudou: an increase of 12% in daily active users. A página de gráfico de barras do British Council traz 'a rise of 32 per cent' e 'a 21 per cent fall in spending'. A versão com in 12% of troca os papéis, a com by e on usa preposições que não acompanham esse substantivo, e 'increasing of' não é a forma de substantivo usada."
      },
      {
        id: "g3q8", s: 1, t: "g3",
        e: "[C1] You want to say there was a 30% fall in failed jobs, using the noun form. Which sentence is most natural?",
        o: ["We saw a 30% drop in failed jobs.", "We saw a 30% drop of failed jobs.", "We saw a drop on 30% in failed jobs.", "We saw an dropping of 30% failed jobs."],
        c: [0],
        x: "A forma 'a 30% drop in failed jobs' segue o padrão da página do British Council ('a 21 per cent fall in spending'): número antes do substantivo e in para o que mudou. A versão com 'drop of failed jobs' usa a preposição do tamanho para a coisa que mudou. 'A drop on 30%' usa uma preposição que não acompanha esse substantivo. A última erra o artigo e usa uma forma de substantivo que não existe."
      },
      {
        id: "g3q9", s: 1, t: "g3",
        e: "Qual frase é a mais natural em uma entrevista para dizer que você precisa de mais aconselhamento sobre uma decisão?",
        o: ["I would like to get some advice on this decision.", "I would like to get some advices on this decision.", "I would like to get an advice on this decision.", "I would like to get a advices on this decision."],
        c: [0],
        x: "Advice é incontável: some advice, sem plural e sem a/an, como confirma a página de incontáveis do British Council, que também mostra a piece of para contar uma unidade. As versões com advices e a advices colocam plural, e a com an advice usa o artigo indefinido. Esses são erros comuns de falantes de português, que têm 'conselhos' no plural."
      },
      {
        id: "g3q10", s: 1, t: "g3",
        e: "[C1] Choose two sentences that use articles correctly in a project description. (Escolha duas)",
        o: ["We built a pipeline for the finance team. The pipeline loads data hourly.", "We built the pipeline for a finance team. A pipeline loads data hourly.", "Data quality matters for any analytics team.", "The data quality matters for any analytics team."],
        c: [0, 2],
        x: "A primeira mostra a regra básica: a na primeira menção e the quando o ouvinte já sabe qual é. 'Data quality matters for any analytics team' fala em sentido geral e fica sem artigo, como em 'Coffee keeps me awake'. A versão com the na primeira menção e a na segunda inverte a lógica. 'The data quality matters' refere-se a algo específico, o que não combina com 'any analytics team'."
      },
      {
        id: "g3q11", s: 1, t: "g3",
        e: "Complete com a palavra certa: 'We don't have ___ information for the new region, so we can't report yet.'",
        o: ["many", "much", "few", "a few of"],
        c: [1],
        x: "Information é incontável, e com incontáveis, sobretudo em frases negativas, usa-se much (como em 'We don't have much time', na página da Purdue). Many e few vão com contáveis, então não combinam com information. 'A few of' também pede um contável seguido de outra construção, por isso não fecha a frase."
      },
      {
        id: "g3q12", s: 1, t: "g3",
        e: "Qual é a frase correta para falar de dados de forma geral, sem se referir a um conjunto específico?",
        o: ["The data drives good decisions.", "A data drives good decisions.", "Good data drives better decisions.", "Datas drive good decisions."],
        c: [2],
        x: "Para falar de dados em geral, o plural ou o incontável fica sem artigo: Good data drives better decisions, como 'Coffee keeps me awake' na página do British Council. 'The data' aponta para um conjunto específico. 'A data' usa a/an com uma palavra tratada como massa, e 'datas' coloca plural em português. As duas últimas são erros comuns de falantes de português."
      }
    ],
    lab: {
      t: "Treino de fala: apresentar resultados com números",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Números e preposições são onde o inglês mais escapa. Falar em voz alta ajuda a fixar by, from...to e os substantivos incontáveis.",
      antes: "Ter lido a aula e levantado três resultados reais do seu trabalho com números (tempo, custo, taxa de falha, usuários). Este roteiro não foi executado por quem escreveu a aula: ajuste as frases aos seus números.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote os números de três resultados (antes e depois) e uma palavra sobre o feedback que você recebeu. Não escreva frases." },
        { t: "Gravar a primeira versão (2 a 3 min)", p: "Apresente os três resultados: um com 'from X to Y', um com 'by X%' e um com 'an increase of / a drop in'. Cite o feedback com 'some feedback'." },
        { t: "Ouvir contando erros", p: "Ouça uma vez e marque: uso errado de in no lugar de by, 'informations', 'a feedback', 'a data' e falta do the no superlativo." },
        { t: "Regravar corrigindo", p: "Regrave corrigindo as marcas. Se errar uma preposição, repita só aquela frase três vezes." },
        { t: "Fechar com um superlativo", p: "Em uma gravação curta, diga a melhor entrega do ano: 'This is the biggest / most reliable ___ we have had.'" }
      ],
      verificar: "Você usou from...to em pelo menos 1 frase; usou by + percentual em pelo menos 2 frases; usou 'an increase of' ou 'a drop in' em pelo menos 1 frase; disse 'information', 'advice' e 'feedback' sem plural nem a/an; e usou um superlativo com the.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Se usou números reais da empresa, não compartilhe a gravação.",
        "Guarde só a lista de preposições que você errou para rever depois."
      ],
      erros: [
        { s: "Digo 'in 25%' sem perceber", c: "Tradução direta de 'em 25%'.", r: "Escreva 'by = tamanho' num papel e repita três frases com by antes de regravar." },
        { s: "Esqueço o the no superlativo", c: "Foco no adjetivo e não no artigo.", r: "Pratique 'the biggest', 'the most reliable' como bloco de duas palavras." },
        { s: "Falo 'informations' e 'a data' mesmo sabendo", c: "Hábito do português, que tem plural e artigo nessas palavras.", r: "Decore os blocos 'some information', 'some feedback' e 'some data' e use-os como padrão." },
        { s: "Não lembro os números", c: "Falta de preparo das palavras-chave.", r: "Anote os números antes e leia só as palavras-chave, sem frases escritas." }
      ]
    }
  };

  /* ===================== AULA 4 ===================== */
  C.dias[4] = {
    aula: {
      titulo: "Voz passiva e descrição de processos e pipelines",
      resumo: "Como descrever pipelines e migrações em inglês com a voz passiva ('data is extracted and loaded', 'the tables were migrated'), como esconder ou mostrar o agente com by, quando preferir a voz ativa para assumir o que você fez e como organizar a sequência com first, then, once e after that.",
      simples: {
        analogia: "Pense numa linha de montagem de fábrica. Quem vê a esteira não pergunta quem apertou cada parafuso: o que importa é o produto passando de etapa em etapa. A voz passiva é essa visão da esteira: 'the part is cut, then it is painted, then it is packed'. O foco está no que acontece com a peça, não em quem fez. Já a voz ativa é o crachá no peito: 'eu cortei a peça'. Num pipeline, a passiva descreve o fluxo ('data is extracted, cleaned and loaded'); em entrevista, quando a pergunta é sobre você, a ativa mostra a sua contribuição ('I built the pipeline'). Escolha pelo que o ouvinte precisa saber: o fluxo ou quem fez.",
        pontos: [
          "Voz passiva: be + particípio passado; o tempo aparece em be (is extracted, was migrated, has been loaded).",
          "Use a passiva quando o agente é desconhecido, óbvio ou sem importância, ou quando o foco é o dado ou o processo.",
          "By + agente é opcional: inclua quando quem fez importa; omita quando não importa.",
          "Em entrevista, prefira a voz ativa quando quiser mostrar o que você fez: 'I built', 'I led'.",
          "Sequência de processo: first, then, once, after that, finally."
        ],
        paraQueServe: "Descrever pipelines, migrações e processos em inglês de forma clara, e saber quando usar a voz ativa para destacar a sua contribuição."
      },
      glossario: [
        { t: "Voz passiva", d: "Estrutura be + particípio passado em que o foco está no que recebe a ação, não em quem a faz." },
        { t: "Voz ativa", d: "Estrutura em que o sujeito faz a ação: 'I built the pipeline'; mostra quem fez." },
        { t: "Particípio passado", d: "Forma do verbo usada na passiva e no present perfect: extracted, loaded, built, written." },
        { t: "Agente", d: "Quem ou o que faz a ação; na passiva aparece com by ou fica oculto." },
        { t: "by + agente", d: "Frase opcional que diz quem fez a ação: 'was written by the data team'." },
        { t: "Conector de sequência", d: "Palavra que ordena etapas: first, then, next, once, after that, finally." },
        { t: "Verbo intransitivo", d: "Verbo que não recebe objeto (happen, arrive, fail); normalmente não forma voz passiva." }
      ],
      blocos: [
        {
          t: "Como se forma a passiva em cada tempo",
          facil: "Traduzindo: be muda conforme o tempo, e o particípio passado fica igual: is extracted, was migrated, has been loaded, will be deployed.",
          p: [
            "A página do British Council sobre passivas diz que se forma com be + particípio passado, e que só o be muda para mostrar o tempo. Exemplos da página: presente simples ('Alioli is made from oil, garlic and salt'), passado ('Kennedy was assassinated in 1963'), present perfect ('Oranges have been grown here for centuries'), passado perfeito ('His flat had been burgled') e futuro ('The work will be finished next week').",
            "Para pipelines, os moldes mais úteis são o presente simples, para descrever um fluxo que sempre acontece, o passado, para marcos concluídos, e o present perfect, para resultados que valem hoje.",
            "Exemplos de trabalho: 'The data is extracted every night.' 'The tables were migrated last quarter.' 'The checks have been added to every job.' 'The new model will be deployed on Friday.'"
          ],
          tabela: {
            cab: ["Tempo", "Forma", "Exemplo de pipeline"],
            linhas: [
              ["Present simple", "is/are + particípio", "Raw files are loaded into the lake."],
              ["Past simple", "was/were + particípio", "The legacy jobs were migrated in 2022."],
              ["Present perfect", "has/have been + particípio", "Quality checks have been added."],
              ["Future simple", "will be + particípio", "The new model will be deployed on Friday."]
            ]
          },
          dica: "Dois passos: ache o be certo para o tempo e depois coloque o particípio. Extract vira extracted; build vira built.",
          fonte: ["British Council LearnEnglish: passivas", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives"]
        },
        {
          t: "Quando preferir a passiva e o agente oculto",
          facil: "Traduzindo: a passiva é boa quando quem fez é desconhecido, óbvio ou sem importância, ou quando o foco é o que aconteceu com o dado.",
          p: [
            "A página de passivas do British Council lista motivos: mudar o foco de quem faz para o que é afetado ('My bike was stolen' x 'Someone stole my bike'); quando quem faz é desconhecido, óbvio ou sem importância, ou quando não se quer nomeá-lo; e quando se quer começar a frase com a informação mais importante.",
            "A página da Purdue sobre escolher a passiva cita situações parecidas: o agente é desconhecido, óbvio ou sem importância; o foco deve ficar na ação ou no que a recebe; e, em escrita científica, a passiva é mais comum.",
            "Em dados e TI, isso aparece em descrições de processo: 'The logs are rotated every seven days' (não importa quem rotaciona), 'The incident was resolved in two hours' (o foco é o resultado) e 'Credentials are stored in a secrets manager' (o fluxo importa mais que o agente)."
          ],
          lista: [
            "O agente é óbvio: 'Alerts are sent to the on-call channel.'",
            "O agente não importa: 'The table is refreshed every hour.'",
            "O foco é o dado: 'The data is validated before it is loaded.'",
            "Você não quer culpar ninguém: 'A mistake was made in the mapping.'"
          ],
          dica: "A passiva também ajuda em post-mortems sem culpa: foque no que aconteceu com o sistema, não em quem errou.",
          fonte: ["Purdue OWL: escolher a voz passiva", "https://owl.purdue.edu/owl/general_writing/academic_writing/active_and_passive_voice/choosing_passive_voice.html"]
        },
        {
          t: "By + agente: quando mostrar quem fez",
          facil: "Traduzindo: acrescente by + quem fez só quando essa informação for importante; se não for, deixe de fora.",
          p: [
            "Segundo a página de passivas do British Council, adicionar by + o agente é opcional. Você inclui quando quem fez importa, como 'This book was written by Angela Davis', e deixa de fora quando é desconhecido ou sem importância, como 'My flight is cancelled'.",
            "No trabalho: 'The pipeline was designed by the platform team' (útil se o interlocutor precisa saber a quem pedir ajuda) e 'The pipeline was designed in 2021' (quando o agente não importa). 'The report is generated automatically' omite o agente porque é um sistema.",
            "Cuidado em entrevista: se a pergunta é 'What did you do?', responder com a passiva sem by esconde a sua participação. 'The migration was completed in four months' não diz se você participou. A solução é a voz ativa: 'I led the migration, and we completed it in four months.'"
          ],
          dica: "Pergunta sobre você ('What did you do?') pede resposta com I; descrição do sistema pede passiva.",
          fonte: ["British Council LearnEnglish: passivas", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives"]
        },
        {
          t: "Quando preferir a voz ativa",
          facil: "Traduzindo: a passiva descreve o fluxo; a ativa mostra quem fez. Em entrevista e negociação, mostre o que você fez.",
          p: [
            "Nos comentários da página de voz ativa e passiva do British Council, a equipe observa que a passiva serve a propósitos específicos e que frases mais claras costumam vencer. A Purdue, por sua vez, descreve a passiva como uma escolha para situações específicas (agente desconhecido, foco na ação, escrita científica).",
            "Em entrevistas e negociações, a ativa tem uma vantagem prática: ela deixa claro o seu papel. Compare 'The pipeline was built in six weeks' com 'I built the pipeline in six weeks, with two teammates'. A segunda mostra a sua contribuição. Isso é uma observação minha sobre comunicação, não uma regra de gramática das páginas citadas.",
            "Modelo equilibrado: descreva o sistema na passiva e a sua contribuição na ativa. 'The data is extracted from the ERP every night and loaded into BigQuery. I designed this flow and I added the quality checks.'"
          ],
          dica: "Se o ouvinte quer saber quem foi, a frase tem que ter um sujeito humano: I, we, my team.",
          fonte: ["British Council LearnEnglish: voz ativa e passiva", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/active-passive-voice"]
        },
        {
          t: "Sequência: first, then, once, after that",
          facil: "Traduzindo: conectores de sequência deixam as etapas do processo fáceis de seguir de ouvido.",
          p: [
            "Uma lição de fala do British Council sobre dar instruções usa first, then, next e after that para ordenar etapas, como em 'First, you have to put the correct amount of coffee in here' e 'After that, you just press this button'. O mesmo molde funciona para pipelines.",
            "Modelo: 'First, the data is extracted from the source system. Then it is cleaned and validated. Once the checks pass, it is loaded into the warehouse. After that, the dashboards are refreshed.' O conector once, no sentido de 'assim que', é um uso comum em descrições técnicas e não foi conferido em uma das páginas abertas. Finally pode fechar a sequência; ele não aparece nessa lição, mas segue o mesmo padrão.",
            "Dica de fala: use no máximo quatro etapas por vez e faça uma pequena pausa entre elas. Isso ajuda quem ouve e ajuda você a não se perder."
          ],
          lista: [
            "First, the raw files are copied to the landing zone.",
            "Then they are validated against the schema.",
            "Once the checks pass, the data is loaded into the warehouse.",
            "After that, the reports are refreshed automatically."
          ],
          dica: "Treine o ritmo: first, then, once, after that. Quatro etapas cabem num fôlego.",
          fonte: ["British Council LearnEnglish: dar instruções (A2)", "https://learnenglish.britishcouncil.org/free-resources/speaking/a2/giving-instructions"]
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: em português a passiva é mais rara na fala; no inglês técnico, ela é natural, e os erros vêm do be e do particípio.",
          p: [
            "Erros comuns de falantes de português ao descrever processos (padrões de transferência; não há estatística aqui):",
            "Esquecer o be: 'The data extracted every night'. A página de passivas do British Council mostra que a passiva sempre tem be + particípio: 'The data is extracted every night'.",
            "Esquecer o particípio: 'The tables were migrate'. O correto é 'were migrated'. Em verbos irregulares, o particípio muda: 'The pipeline was built' (não 'builded').",
            "Passiva com verbo intransitivo: 'The error was happened last night'. Happen não recebe objeto e normalmente não forma passiva: 'The error happened last night'. Isso é uma regra geral de gramática e as páginas abertas desta aula não a detalham.",
            "Trocar by por from ou for: 'was written from the team'. Quem faz a ação, na passiva, vem com by: 'was written by the team', como no exemplo 'written by Angela Davis' da página do British Council.",
            "Passiva demais: um comentário da equipe na página de voz ativa e passiva do British Council lembra que frases mais claras costumam vencer; em entrevista, prefira 'I led the migration' a 'The migration was led'."
          ],
          armadilha: "Antes de usar a passiva, confira: tem be? Tem particípio? O verbo aceita objeto? Se alguma resposta for não, use a voz ativa.",
          fonte: ["British Council LearnEnglish: passivas", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives"]
        }
      ],
      exemplo: {
        t: "Explicando um pipeline em uma entrevista",
        texto: "O entrevistador pede: 'Walk me through a pipeline you built.' Resposta modelo: 'I designed a pipeline for our finance reports. First, the data is extracted from the ERP every night. Then it is cleaned and validated against a schema. Once the checks pass, it is loaded into BigQuery, and after that the dashboards are refreshed automatically. When I joined, the jobs were run manually, so I automated them and I added alerts. The legacy tables were migrated in four months, and I led that migration with two teammates. As a result, failed jobs have dropped by 40%.' Repare no equilíbrio: passiva para o fluxo ('is extracted', 'is loaded'), passado passivo para o marco ('were migrated'), e ativa para a sua contribuição ('I designed', 'I led')."
      },
      prova: [
        "Entrevista: explicar um pipeline com first, then, once e after that, usando passiva para o fluxo.",
        "Entrevista: responder 'What did you do?' com a ativa ('I built…') e não com a passiva sem agente.",
        "Post-mortem: descrever o incidente na passiva para focar no sistema ('The job was restarted').",
        "Reunião: dizer quem fez o quê com by quando o agente importa ('designed by the platform team')."
      ],
      explique: "Explique com as próprias palavras como se forma a voz passiva, quando você prefere a passiva e quando prefere a ativa ao descrever um pipeline.",
      checagem: [
        "Como se forma a passiva nos tempos presente, passado e present perfect?",
        "Quando você omite o agente e quando usa by + agente?",
        "Por que, em entrevista, 'I built the pipeline' pode ser melhor que 'The pipeline was built'?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: passivas", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives"],
      ["British Council LearnEnglish: voz ativa e passiva", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/active-passive-voice"],
      ["Purdue OWL: escolher a voz passiva", "https://owl.purdue.edu/owl/general_writing/academic_writing/active_and_passive_voice/choosing_passive_voice.html"],
      ["British Council LearnEnglish: dar instruções (A2)", "https://learnenglish.britishcouncil.org/free-resources/speaking/a2/giving-instructions"]
    ],
    cartoes: [
      { id: "g4c1", f: "Corrija: 'The data extracted every night.'", v: "The data is extracted every night. Passiva = be + particípio; faltou o be.", t: "g4" },
      { id: "g4c2", f: "Corrija: 'The tables were migrate last year.'", v: "The tables were migrated last year. Passiva usa o particípio passado.", t: "g4" },
      { id: "g4c3", f: "Passiva de 'We built the pipeline in 2021' (sem agente).", v: "The pipeline was built in 2021. Be no passado + particípio de build (built).", t: "g4" },
      { id: "g4c4", f: "Corrija: 'The error was happened last night.'", v: "The error happened last night. Happen é intransitivo e normalmente não forma passiva.", t: "g4" },
      { id: "g4c5", f: "Complete: 'Quality checks ___ been added to every job.'", v: "have. Present perfect passivo: have/has been + particípio.", t: "g4" },
      { id: "g4c6", f: "Como dizer 'o novo modelo será implantado na sexta' na passiva?", v: "The new model will be deployed on Friday. Futuro passivo: will be + particípio.", t: "g4" },
      { id: "g4c7", f: "Corrija: 'The report was written from the data team.'", v: "The report was written by the data team. O agente da passiva vem com by.", t: "g4" },
      { id: "g4c8", f: "Na entrevista: 'What did you do in the migration?' Passiva ou ativa?", v: "Ativa: 'I led the migration.' A passiva sem agente esconde a sua participação.", t: "g4" },
      { id: "g4c9", f: "Quais conectores ordenam as etapas de um processo?", v: "First, then, next, once, after that, finally. Eles deixam a sequência fácil de seguir.", t: "g4" },
      { id: "g4c10", f: "Corrija: 'The pipeline was builded in six weeks.'", v: "The pipeline was built in six weeks. Build é irregular: built, não 'builded'.", t: "g4" },
      { id: "g4c11", f: "Quando você omite o by + agente?", v: "Quando o agente é desconhecido, óbvio ou sem importância (My flight is cancelled).", t: "g4" },
      { id: "g4c12", f: "Complete: 'First, data ___ extracted. Then it ___ cleaned.'", v: "is / is. Presente simples passivo: is/are + particípio.", t: "g4" }
    ],
    questoes: [
      {
        id: "g4q1", s: 2, t: "g4",
        e: "Você descreve um fluxo que roda todas as noites. Complete: 'First, the raw data ___ from the ERP, and then it is validated.'",
        o: ["is extracted", "extracts", "is extract", "was extracting"],
        c: [0],
        x: "O fluxo é um processo habitual e o foco está no dado, então o presente simples passivo é o certo: is extracted. 'Extracts' tornaria o dado o sujeito que faz a extração, o que não faz sentido. 'Is extract' esquece o particípio passado. 'Was extracting' é past continuous ativo e não descreve um processo habitual. A página de passivas do British Council mostra 'Alioli is made from oil, garlic and salt' com o mesmo padrão."
      },
      {
        id: "g4q2", s: 2, t: "g4",
        e: "Complete para descrever uma migração concluída no passado: 'The legacy tables ___ to BigQuery in four months.'",
        o: ["migrated", "were migrate", "have migrate", "were migrated"],
        c: [3],
        x: "A migração terminou no passado e o foco está nas tabelas, então passado passivo: were migrated (be no passado + particípio). 'Migrated' sozinho seria ativo e faltaria o sujeito que migrou. 'Were migrate' e 'have migrate' esquecem o particípio passado. A página de passivas do British Council mostra 'was assassinated' com o mesmo padrão de be no passado mais particípio."
      },
      {
        id: "g4q3", s: 2, t: "g4",
        e: "O entrevistador pergunta: 'What was your role in the migration?' Qual resposta mostra melhor a sua contribuição?",
        o: ["The migration was completed in four months.", "The tables were migrated and the checks were added.", "I led the migration, and we completed it in four months.", "The migration was led successfully."],
        c: [2],
        x: "A pergunta é sobre o seu papel, então a voz ativa com I mostra a contribuição: I led the migration. As outras respostas estão na passiva sem agente e não dizem quem fez, então o entrevistador não sabe se você participou. Gramaticalmente elas estão corretas, mas respondem a uma pergunta sobre o sistema, não sobre você. Essa é uma observação de comunicação, coerente com o comentário da equipe do British Council de que frases mais claras costumam vencer."
      },
      {
        id: "g4q4", s: 2, t: "g4",
        e: "Choose two situations where the passive voice is a good choice when describing a data process. (Escolha duas)",
        o: ["The agent is obvious or unimportant, such as an automatic job.", "You want to hide that you built something in an interview.", "The focus is on the data or the process, not on who did it.", "The verb has no object, such as 'happen' or 'arrive'."],
        c: [0, 2],
        x: "As páginas do British Council e da Purdue citam como motivos para a passiva: o agente ser desconhecido, óbvio ou sem importância, e o foco estar no que recebe a ação ou no processo. Esconder o seu trabalho em entrevista não é um bom motivo e prejudica a sua comunicação. Verbos sem objeto, como happen e arrive, normalmente não formam passiva, então não são uma situação em que ela seja uma boa escolha."
      },
      {
        id: "g4q5", s: 2, t: "g4",
        e: "Corrija o erro: 'The error was happened last night during the nightly load.' Qual é a versão correta?",
        o: ["The error was happening last night during the nightly load.", "The error happened last night during the nightly load.", "The error has been happened last night during the nightly load.", "The error was happen last night during the nightly load."],
        c: [1],
        x: "Happen não recebe objeto e normalmente não forma voz passiva, então a forma correta é ativa no passado: happened. O erro com was happened é comum em falantes de português, que traduzem 'foi acontecido'. A versão com was happening muda o sentido para ação em andamento, a com has been happened mantém o erro, e was happen tem os dois problemas: be sem particípio. Nota: essa regra é geral de gramática e as páginas abertas desta aula não a detalham."
      },
      {
        id: "g4q6", s: 2, t: "g4",
        e: "Escolha a frase que descreve corretamente um resultado que vale hoje: as verificações de qualidade foram adicionadas e continuam em uso.",
        o: ["Quality checks have been added to every job.", "Quality checks were adding to every job.", "Quality checks have added to every job.", "Quality checks are been added to every job."],
        c: [0],
        x: "O present perfect passivo usa have/has been + particípio e liga o fato ao presente: have been added. 'Were adding' mistura passado com -ing sem sentido passivo. 'Have added' é ativo, mas sem objeto, e muda o sentido para os checks adicionarem algo. 'Are been added' mistura are com been, combinação que não existe. A página do British Council mostra 'have been grown' como modelo."
      },
      {
        id: "g4q7", s: 2, t: "g4",
        e: "Qual frase nomeia corretamente quem fez a ação, porque o time de plataforma é importante para o seu interlocutor?",
        o: ["The pipeline was designed from the platform team.", "The pipeline was designed by the platform team.", "The pipeline was designed to the platform team.", "The pipeline was designed for the platform team's."],
        c: [1],
        x: "Na passiva, quem faz a ação aparece com by: designed by the platform team, como em 'written by Angela Davis' na página do British Council. 'From' e 'to' indicam origem e destino, não o autor. A última, 'for ... team's', muda o sentido para o benefício e ainda tem um possessivo incompleto. Usar by só faz sentido quando o agente importa, e aqui ele importa."
      },
      {
        id: "g4q8", s: 2, t: "g4",
        e: "[C1] You are describing a process in a design review. Which sequence of sentences is the most natural and correctly uses passive voice and sequence words?",
        o: ["First, the data extracts. Then it cleans. Once the checks pass, it loads.", "First, the data is extracted. Then it is cleaned. Once the checks pass, it is loaded.", "First, the data was extracting. Then it was clean. Once the checks pass, it loaded.", "First, the data extracted. After that, it cleans. Once, the checks passed, it load."],
        c: [1],
        x: "A sequência certa mantém o presente passivo (is extracted, is cleaned, is loaded) e usa first, then e once para ordenar, como no molde first-then-after that da lição do British Council. A primeira versão torna o dado o sujeito de extract, clean e load, o que não faz sentido. A terceira mistura formas passadas e adjetivo no lugar de particípio. A quarta mistura passado, presente e forma base do verbo."
      },
      {
        id: "g4q9", s: 2, t: "g4",
        e: "Escolha a frase com o particípio passado correto de um verbo irregular: 'The new pipeline ___ in six weeks.'",
        o: ["was builded", "was building", "was build", "was built"],
        c: [3],
        x: "Build é verbo irregular, e o particípio passado é built: was built. 'Builded' aplica a regra dos verbos regulares por engano. 'Was building' seria past continuous, ação em andamento, sem sentido passivo. 'Was build' usa a forma base no lugar do particípio. A página do British Council mostra que na passiva o particípio fica igual e só o be muda."
      },
      {
        id: "g4q10", s: 2, t: "g4",
        e: "[C1] In a blameless post-mortem you want to focus on the system, not on a person. Which sentence does that best?",
        o: ["I broke the job by changing the schema.", "My teammate changed the schema and broke the job.", "A mistake was made in the mapping, and the job was restarted.", "You should have checked the schema before the release."],
        c: [2],
        x: "A passiva foca no que aconteceu com o sistema e deixa o agente oculto: a mistake was made, the job was restarted. A página do British Council aponta como motivo para a passiva quando não se quer nomear quem fez, e a Purdue cita o foco na ação. As outras frases nomeiam uma pessoa ou apontam para o ouvinte. Atenção: ocultar o agente num post-mortem não significa esconder a causa; ela deve ser descrita em outra frase."
      },
      {
        id: "g4q11", s: 2, t: "g4",
        e: "Complete com a forma correta: 'Once the checks ___, the data is loaded into the warehouse.'",
        o: ["passed", "are passing", "pass", "had pass"],
        c: [2],
        x: "Em uma descrição de processo no presente, a oração com once usa o presente simples: once the checks pass. 'Passed' empurraria a frase para o passado, mas o verbo principal está no presente (is loaded). 'Are passing' descreveria algo em andamento, o que não é o sentido de condição concluída. 'Had pass' esquece o particípio e não combina com o presente. Nota: esse uso de once é padrão comum e não foi confirmado numa página aberta."
      },
      {
        id: "g4q12", s: 2, t: "g4",
        e: "[C1] Choose two correct sentences that describe the process in the passive and make your own authorship clear. (Escolha duas)",
        o: ["The data is loaded nightly, and I designed the flow.", "The data loads nightly, and the flow was designed myself.", "The data is loaded nightly, and the flow was designed by me.", "The data is loading nightly, and I am designed the flow."],
        c: [0, 2],
        x: "As duas respostas certas descrevem o processo com passiva (is loaded) e mostram a sua autoria, uma na ativa (I designed) e outra com by (designed by me), embora a ativa seja mais natural em fala. A versão com 'was designed myself' mistura passiva com pronome reflexivo, que não funciona assim. A última mistura o presente contínuo e uma passiva errada em 'am designed', que não descreve a autoria de modo correto."
      }
    ],
    lab: {
      t: "Treino de fala: descrever um pipeline em passiva e ativa",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Descrever um processo em voz alta mostra se a passiva e os conectores saem naturalmente, e se você consegue alternar com a ativa para mostrar sua contribuição.",
      antes: "Ter lido a aula e escolhido um pipeline ou processo real que você conhece bem. Ter em mente quatro etapas do fluxo e o que você fez nele. Este roteiro não foi executado por quem escreveu a aula: adapte as frases ao seu pipeline.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote quatro palavras: a origem dos dados, uma etapa de limpeza ou validação, o destino e uma contribuição sua. Não escreva frases." },
        { t: "Gravar a primeira versão (2 a 3 min)", p: "Descreva o fluxo com first, then, once e after that, usando a passiva (is extracted, is loaded). Depois diga o que você fez na voz ativa (I designed, I added)." },
        { t: "Ouvir contando erros", p: "Ouça uma vez e marque: be esquecido, particípio errado (builded, migrate), verbo intransitivo na passiva (was happened) e frases em que a sua autoria ficou escondida." },
        { t: "Regravar corrigindo", p: "Regrave corrigindo as marcas. Pare a gravação se travar numa frase, repita só ela e continue." },
        { t: "Responder 'What was your role?'", p: "Em uma gravação curta, responda em voz alta: 'What was your role in this pipeline?' usando só a voz ativa com I e we." }
      ],
      verificar: "Você usou a passiva com be + particípio em pelo menos 3 frases; usou pelo menos 3 conectores de sequência (first, then, once, after that); usou a voz ativa com I em pelo menos 2 frases sobre a sua contribuição; e não usou verbo intransitivo na passiva na segunda gravação.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Se descreveu sistemas reais da empresa, não compartilhe a gravação.",
        "Anote o erro mais frequente (be, particípio ou intransitivo) para rever na próxima prática."
      ],
      erros: [
        { s: "Esqueço o be na passiva", c: "Foco no particípio e no verbo principal.", r: "Fale a fórmula em voz alta antes: 'is + particípio'. Regrave só as frases com erro." },
        { s: "Uso passiva em tudo e não aparece o que fiz", c: "A passiva parece mais formal.", r: "Reserve a passiva para o fluxo e feche com duas frases em I: 'I designed', 'I led'." },
        { s: "Erro o particípio de verbos irregulares", c: "Aplicar -ed em tudo.", r: "Liste cinco irregulares do seu trabalho (build, write, run, send, take) e pratique built, written, run, sent, taken." },
        { s: "Me perco na sequência", c: "Etapas demais numa só fala.", r: "Limite a quatro etapas e use first, then, once, after that como guia." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
