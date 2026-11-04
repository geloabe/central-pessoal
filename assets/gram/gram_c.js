(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };

  /* ===================== AULA 9 ===================== */
  C.dias[9] = {
    aula: {
      titulo: "Preposições e phrasal verbs no trabalho: a palavrinha que muda tudo",
      resumo: "As preposições que ficam coladas a verbos e expressões de trabalho (depend on, responsible for, in charge of, at risk, on track), a diferença entre by, until, for e in em prazos, os phrasal verbs mais usados em equipe de dados (carry out, set up, roll out, follow up, sign off, point out, run into) e as armadilhas de quem traduz do português (discuss about, depend of, consist in).",
      simples: {
        analogia: "Pense numa tomada e num plugue. O verbo é o aparelho e a preposição é o pino do plugue: cada aparelho tem o seu formato, e não adianta forçar um pino de outro formato só porque no português a tomada era diferente. Em português a gente liga 'depender DE'. Em inglês o plugue é outro: depend ON (e também responsible FOR, in charge OF). Você não precisa entender por quê, precisa guardar o par inteiro como uma peça só, igual decora o formato do carregador do celular. Já os phrasal verbs são aparelhos de duas peças, o verbo mais a partícula, que mudam de significado quando o par muda. Guarde sempre o par, nunca o verbo sozinho.",
        pontos: [
          "Preposição de verbo é par fixo: aprenda depend on inteiro, não só depend.",
          "Prazo: by Friday é até sexta no máximo (deadline); until Friday é continuar até sexta.",
          "For mede duração (for three days); in mede quanto falta daqui a pouco (in three days).",
          "Phrasal verb com pronome separa: set it up, nunca set up it.",
          "Depois de preposição, o verbo vai para -ing: responsible for deploying, not for deploy."
        ],
        paraQueServe: "Soar preciso em status de projeto, e-mail de prazo e entrevista: dizer que algo está on track, que você é responsible for um pipeline e que vai follow up até sexta."
      },
      glossario: [
        { t: "Dependent preposition", d: "Preposição que o verbo, o adjetivo ou o substantivo pede por hábito da língua: depend on, interested in, responsible for." },
        { t: "Collocation (colocação)", d: "Combinação de palavras que soa natural para falantes nativos: on track, at risk, in charge of." },
        { t: "Phrasal verb", d: "Verbo mais uma partícula (up, out, off) cujo sentido muda: set up significa configurar ou montar." },
        { t: "Separable", d: "Phrasal verb em que o objeto pode ficar no meio: set up the server ou set the server up." },
        { t: "Deadline", d: "Prazo máximo para algo ficar pronto; combina com by: by Friday." },
        { t: "Rollout", d: "Lançamento gradual de uma mudança ou versão; o verbo é roll out." },
        { t: "Sign-off", d: "Aprovação final de algo; o verbo é sign off on." },
        { t: "Stakeholder", d: "Pessoa ou área com interesse no resultado do seu trabalho: produto, negócio, cliente." }
      ],
      blocos: [
        {
          t: "Verbo + preposição: pares que você precisa decorar inteiros",
          facil: "Traduzindo: em inglês muitos verbos exigem uma preposição específica; aprenda o verbo junto com ela e dentro de uma frase.",
          p: [
            "A página de verbos e preposições do British Council diz que muitos verbos vêm seguidos de uma preposição específica e que não há regra geral: você aprende cada par. Na lista de verbos com on aparecem depend on (a decisão vai depender do resultado do teste), concentrate on, rely on e agree on. Com for aparecem wait for, apply for, ask for e prepare for. Com with, agree with e deal with. Com to, listen to e respond to.",
            "Exemplo de trabalho: 'The release date depends on the test results.' Em português você diria 'depende DOS resultados', e a vontade é traduzir a preposição. Resista: o par é depend + on. A mesma página mostra focar em algo como concentrate on; a forma focus on é a que você vai ouvir em reunião e funciona do mesmo jeito (a página não lista focus, então este é um uso comum que você deve conferir no dicionário)."
          ],
          lista: [
            "It depends on the data volume.",
            "We rely on the nightly job to refresh the dashboard.",
            "Please concentrate on the failing tests first.",
            "I agree with your estimate, but we don't agree on the scope."
          ],
          armadilha: "Armadilha de brasileiro: 'depend of' e 'depend from' soam naturais por causa do 'depende de', mas o par certo é depend on. Anote assim: depend ON, always.",
          fonte: ["British Council LearnEnglish: Verbs and prepositions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-prepositions"]
        },
        {
          t: "Colocações de trabalho: responsible for, in charge of, at risk, on track, focus on",
          facil: "Traduzindo: são blocos prontos de status de projeto; use a preposição do bloco, sem traduzir do português.",
          p: [
            "Estas expressões aparecem em quase toda reunião de equipe. Importante: nesta redação nenhuma página aberta das fontes confirmou cada uma delas, então o significado abaixo é o uso comum de ambiente de trabalho e vale conferir no dicionário de aprendizes (Cambridge, Oxford) antes de usar em texto formal.",
            "Responsible for + algo ou -ing: 'I'm responsible for the ingestion layer' e 'She is responsible for deploying the model'. In charge of + algo ou -ing: 'He's in charge of the migration'. At risk: 'The deadline is at risk because the vendor is late'. On track: 'We're on track to finish by Friday'. Focus on + algo: 'This sprint we focus on data quality'."
          ],
          tabela: {
            cab: ["Expressão", "Quando usar", "Frase-modelo"],
            linhas: [
              ["responsible for", "dono de uma entrega ou área", "I'm responsible for the ETL jobs."],
              ["in charge of", "comandar, liderar uma frente", "She's in charge of the cloud migration."],
              ["at risk", "pode dar errado ou atrasar", "The launch is at risk because of the schema change."],
              ["on track", "andando conforme o plano", "We're on track to deliver by the end of the month."],
              ["focus on", "dar prioridade", "Let's focus on the critical pipelines first."]
            ]
          },
          dica: "Em entrevista, descreva seu papel com uma delas: 'I was responsible for designing and monitoring the pipelines'.",
          armadilha: "Erro comum de falantes de português: dizer 'responsible of' ou 'in charge for' por tradução direta de 'responsável por' e 'encarregado de'. Guarde os blocos inteiros: responsible FOR, in charge OF."
        },
        {
          t: "Prazos: by, until, for e in",
          facil: "Traduzindo: by Friday é um limite (entregar até sexta, no máximo); until Friday é continuar até sexta; for mede quanto tempo; in diz daqui a quanto tempo.",
          p: [
            "A página de preposições de tempo do British Council confirma o uso de at com horas, in com meses, anos e partes do dia, e on com dias e datas, e traz o exemplo 'On weekdays, I work until 12'. A página não explica by nem for, então a distinção abaixo é a regra comum dos dicionários de aprendizes, a conferir na fonte antes de ensinar a terceiros.",
            "Regra prática: by marca um prazo final, uma ação que acontece em algum momento antes ou nesse limite. Until marca uma situação que continua sem parar até aquele momento. For responde 'por quanto tempo?'. In (com número) responde 'daqui a quanto tempo?'."
          ],
          tabela: {
            cab: ["Palavra", "Ideia", "Exemplo de trabalho"],
            linhas: [
              ["by Friday", "prazo final: ficar pronto até sexta", "I'll send you the report by Friday."],
              ["until Friday", "continua o tempo todo até sexta", "The system will be down until Friday."],
              ["for three days", "duração", "The job has been failing for three days."],
              ["in three days", "daqui a três dias", "We'll go live in three days."]
            ]
          },
          armadilha: "Armadilha de brasileiro: 'I'll finish until Friday' parece traduzir 'até sexta', mas para prazo de entrega o inglês pede by Friday. Until serve para o que dura sem parar: 'I'll work until Friday'.",
          fonte: ["British Council LearnEnglish: Prepositions of time: at, in, on", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on"]
        },
        {
          t: "Depois da preposição vem -ing (e alguns verbos pedem objeto antes)",
          facil: "Traduzindo: se vem um verbo depois da preposição, ele fica no -ing: apologise for being late, never for be late.",
          p: [
            "A página de padrões com verbos de relato (nível C1) diz que o verbo depois de uma preposição dependente sempre toma -ing. A página lista apologise for, complain about, confess to, insist on e object to, e traz o exemplo 'Two organisations apologised for not being present' (apologise for + -ing).",
            "Há ainda o padrão com objeto no meio: accuse someone of, blame someone for e congratulate someone on (exemplos da página: 'O'Reilly accused the government of lying about the issue' e 'Parents blame schools for not doing enough to tackle bullying'). Frase útil: 'Thanks for waiting' e 'I apologise for missing the stand-up'."
          ],
          lista: [
            "I apologise for missing the stand-up.",
            "She insisted on reviewing the code herself.",
            "I'm responsible for monitoring the alerts."
          ],
          dica: "A regra do -ing vale para qualquer preposição, inclusive responsible for e interested in: responsible for deploying.",
          fonte: ["British Council LearnEnglish: Patterns with reporting verbs (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/patterns-reporting-verbs"]
        },
        {
          t: "Phrasal verbs: separáveis, inseparáveis e com duas partículas",
          facil: "Traduzindo: alguns phrasal verbs deixam o objeto no meio e outros não; com pronome (it, them) o objeto vai sempre no meio nos separáveis.",
          p: [
            "A página de phrasal verbs do British Council explica que um phrasal verb é um verbo mais uma ou duas partículas. Nos separáveis o objeto pode ficar entre o verbo e a partícula ou depois dela, mas com pronome pessoal ele precisa ficar no meio: 'They've called it off.' Nos inseparáveis, verbo e partícula ficam juntos mesmo com pronome: 'Who looks after her?'. Com duas partículas, tudo fica junto: 'Who came up with that idea?'.",
            "A página de ordem das palavras (nível C1) acrescenta: objeto longo ou complexo costuma vir depois da partícula (took out all the rubbish from the party), e na fala a partícula acentuada pode vir separada. Verbos intransitivos, como grow up, não têm objeto."
          ],
          lista: [
            "Separável: 'Can you set up the pipeline?' ou 'Can you set it up?'",
            "Errado: 'Can you set up it?'",
            "Inseparável: 'We ran into a bug' e 'We ran into it' (nunca 'ran it into')."
          ],
          armadilha: "Erro comum de falantes de português: colocar o pronome depois da partícula (set up it), porque em português o pronome vem depois do verbo. Com separáveis, o pronome vai no meio.",
          fonte: ["British Council LearnEnglish: Phrasal verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs"]
        },
        {
          t: "Sete phrasal verbs de trabalho e como eles se comportam",
          facil: "Traduzindo: estes sete aparecem toda semana em times de dados; veja o sentido e se aceitam objeto no meio.",
          p: [
            "As páginas do British Council abertas para esta aula não listam estes sete verbos, então os sentidos abaixo são o uso comum de trabalho e devem ser conferidos num dicionário de aprendizes. O que as páginas confirmam é a regra de ordem das palavras, aplicada na coluna de comportamento: transitivos separáveis aceitam pronome no meio.",
            "Para o inseparável run into, a regra do British Council para verbos com preposição vale: o objeto fica depois. Para follow up e sign off, é comum usar com preposição: follow up on something, sign off on something."
          ],
          tabela: {
            cab: ["Phrasal verb", "Sentido", "Frase-modelo"],
            linhas: [
              ["carry out", "executar, realizar (separável)", "We carried out a data audit last week."],
              ["set up", "configurar, montar (separável)", "I set the environment up yesterday."],
              ["roll out", "lançar aos poucos (separável)", "We'll roll the change out to all teams in May."],
              ["follow up (on)", "dar seguimento", "I'll follow up on this after the meeting."],
              ["sign off (on)", "aprovar formalmente", "Legal still has to sign off on the contract."],
              ["point out", "chamar a atenção para (separável)", "She pointed out a problem in the schema."],
              ["run into", "esbarrar em, topar com (inseparável)", "We ran into a permission issue."]
            ]
          },
          fonte: ["British Council LearnEnglish: Word order in phrasal verbs (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/word-order-phrasal-verbs"]
        },
        {
          t: "Armadilhas de preposição para falantes de português",
          facil: "Traduzindo: alguns verbos em inglês não pedem preposição (discuss) ou pedem outra (consist of, depend on); não traduza o português.",
          p: [
            "O guia de preposições da Purdue lista consist com of ('consist of') entre os verbos com preposição fixa, junto com approve of e smell of. Para depend, a página do British Council mostra on. Já 'discuss about' não aparece nas páginas abertas: tratamos como erro comum de falantes de português, porque em português se diz 'discutir sobre'. Em inglês, 'We discussed the plan' (sem about) é a forma que você ouve; confirme no dicionário. A mesma ideia vale para 'We discussed it', não 'discussed about it'.",
            "Resumo: depend on (não of), consist of (não in), discuss algo (sem about), agree with alguém e agree on um assunto, listen to (a página do British Council confirma to) e wait for (confirmada com for). Quando em dúvida, procure o verbo em um dicionário e copie a frase-exemplo."
          ],
          lista: [
            "Wrong: We need to discuss about the schedule. Right: We need to discuss the schedule.",
            "Wrong: It depends of the budget. Right: It depends on the budget.",
            "Wrong: The team consists in five people. Right: The team consists of five people."
          ],
          dica: "Faça uma página de caderno só de pares de preposição e escreva sempre uma frase sua de trabalho ao lado.",
          fonte: ["Purdue OWL: Prepositions", "https://owl.purdue.edu/owl/general_writing/grammar/prepositions/index.html"]
        }
      ],
      exemplo: {
        t: "Status de projeto na daily, sem escorregar na preposição",
        texto: "Marina lidera a migração de um pipeline e precisa dar o status em inglês. Ela fala: 'I'm responsible for the migration, and we're on track to finish by Friday. The launch depends on the test results, so we're focusing on the data quality checks. One thing is at risk: we ran into a permission issue, and I'll follow up with the platform team today. Once Legal signs off on the new access rules, we can roll out the change to the other teams.' Repare no que ela faz: usa responsible for e on track como blocos prontos, escolhe by Friday porque é prazo, depende de on, usa -ing depois da preposição quando precisa, e deixa ran into sem pronome separado. Nenhuma frase foi traduzida palavra por palavra do português.",
      },
      prova: [
        "Entrevista: 'I was responsible for designing and monitoring the data pipelines' descreve seu papel com a preposição certa.",
        "Reunião: você avisa que algo está at risk e diz até quando vai fazer o follow up (by Friday).",
        "Revisão de e-mail: você troca 'depend of' por depend on e 'discuss about' por discuss antes de enviar.",
        "Daily: você diz 'We set it up' e não 'We set up it' ao falar do ambiente já montado."
      ],
      explique: "Explique com as suas palavras a diferença entre by Friday e until Friday, por que o pronome vai no meio em set it up, e dê três pares de verbo mais preposição que você costuma errar.",
      checagem: [
        "Qual a preposição de depend e por que 'depend of' soa natural para quem fala português?",
        "Quando usar by e quando usar until em um prazo?",
        "Onde vai o pronome em um phrasal verb separável e em um inseparável?",
        "Por que se diz responsible for deploying e não responsible for deploy?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: Verbs and prepositions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-prepositions"],
      ["British Council LearnEnglish: Prepositions of time: at, in, on", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on"],
      ["British Council LearnEnglish: Patterns with reporting verbs (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/patterns-reporting-verbs"],
      ["British Council LearnEnglish: Phrasal verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs"],
      ["British Council LearnEnglish: Word order in phrasal verbs (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/word-order-phrasal-verbs"],
      ["Purdue OWL: Prepositions", "https://owl.purdue.edu/owl/general_writing/grammar/prepositions/index.html"]
    ],
    cartoes: [
      { id: "g9c1", f: "Corrija: 'The release depends of the test results.'", v: "The release depends on the test results. O par fixo é depend + on, nunca of nem from.", t: "g9" },
      { id: "g9c2", f: "Complete: 'I'll send the report ___ Friday' (prazo final).", v: "by. By marca o prazo máximo para a ação ficar pronta; until é para algo que dura sem parar.", t: "g9" },
      { id: "g9c3", f: "Complete: 'The server will be down ___ Friday' (fica fora do ar o tempo todo até sexta).", v: "until. Until descreve uma situação contínua que vai até aquele momento.", t: "g9" },
      { id: "g9c4", f: "Corrija: 'Can you set up it before the demo?'", v: "Can you set it up before the demo? Phrasal verb separável com pronome: o pronome vai entre verbo e partícula.", t: "g9" },
      { id: "g9c5", f: "Corrija: 'We need to discuss about the budget.'", v: "We need to discuss the budget. Erro comum de falantes de português: discuss não leva about (confira no dicionário).", t: "g9" },
      { id: "g9c6", f: "Como dizer que seu papel é cuidar do pipeline de ingestão?", v: "I'm responsible for the ingestion pipeline. Responsible FOR + substantivo ou -ing.", t: "g9" },
      { id: "g9c7", f: "Complete: 'I'm responsible for ___ (deploy) the model.'", v: "deploying. Depois de preposição o verbo fica no -ing.", t: "g9" },
      { id: "g9c8", f: "Diga em inglês: 'Estamos dentro do prazo para entregar até o fim do mês.'", v: "We're on track to deliver by the end of the month. On track = andando conforme o plano.", t: "g9" },
      { id: "g9c9", f: "Diga em inglês: 'O lançamento está em risco por causa do atraso do fornecedor.'", v: "The launch is at risk because the vendor is late. At risk é bloco pronto, sem artigo.", t: "g9" },
      { id: "g9c10", f: "Corrija: 'The team consists in six engineers.'", v: "The team consists of six engineers. Consist + of (Purdue lista consist of).", t: "g9" },
      { id: "g9c11", f: "Complete: 'We ran ___ a permission issue.' Qual a ordem com pronome?", v: "into. Run into é inseparável: 'We ran into it', nunca 'ran it into'.", t: "g9" },
      { id: "g9c12", f: "Complete: 'Legal still has to sign ___ the contract.'", v: "off on. Sign off on = aprovar formalmente (confira no dicionário).", t: "g9" },
      { id: "g9c13", f: "O que significa 'We'll go live in three days' e como difere de 'for three days'?", v: "In three days = daqui a três dias; for three days = durante três dias. In aponta o futuro, for mede duração.", t: "g9" }
    ],
    questoes: [
      {
        id: "g9q1", s: 3, t: "g9",
        e: "In a sprint review, your manager asks whether the new dashboard will be ready. You want to say the answer is conditional on the QA results. Which sentence is correct?",
        o: [
          "It depends on the QA results.",
          "It depends of the QA results.",
          "It depends from the QA results.",
          "It depends about the QA results."
        ],
        c: [0],
        x: "O par fixo é depend + on, e a página de verbos e preposições do British Council mostra exatamente 'depend on'. As outras três usam of, from e about: of e from vêm de tradução do português ('depende DE') e about não pertence ao par. Guarde a expressão inteira, depend on, e a frase 'It depends on...' é um molde muito útil em reunião."
      },
      {
        id: "g9q2", s: 3, t: "g9",
        e: "Your stakeholder needs the final report no later than Friday evening. Which sentence best expresses a deadline?",
        o: [
          "I'll send it by Friday.",
          "I'll send it until Friday.",
          "I'll send it to Friday.",
          "I'll send it in Friday."
        ],
        c: [0],
        x: "By Friday marca o prazo final: a ação acontece até esse momento. A versão com until sugere uma ação contínua que dura até sexta, o que não faz sentido para um envio único. For responde por quanto tempo (e 'for Friday' indicaria para quando algo é destinado, não o prazo de envio), to não cabe aqui e in com dia da semana não é a forma natural (para dias se usa on). A regra by x until vem do uso comum de dicionário, a conferir."
      },
      {
        id: "g9q3", s: 3, t: "g9",
        e: "Find the error. A colleague writes in Slack: 'Can you set up it before the demo tomorrow?' How should the sentence be corrected?",
        o: [
          "Can you set it up before the demo tomorrow?",
          "Can you set up of it before the demo tomorrow?",
          "Can you up set it before the demo tomorrow?",
          "Can you set it before up the demo tomorrow?"
        ],
        c: [0],
        x: "Set up é um phrasal verb separável, e com pronome pessoal o objeto precisa ficar entre o verbo e a partícula, como mostra a página do British Council com 'called it off'. A versão com of cria uma preposição que não existe, a que inverte up e set quebra o phrasal verb, e a que joga up para depois de before separa a partícula do verbo de forma impossível."
      },
      {
        id: "g9q4", s: 3, t: "g9",
        e: "Choose the sentence that sounds most natural in a status update to a non-technical stakeholder about a project that is going as planned.",
        o: [
          "We're on track to finish by the end of the month.",
          "We're on the track to finish until the end of the month.",
          "We're in track to finish at the end of month.",
          "We're on track for to finish by end of the month."
        ],
        c: [0],
        x: "On track é o bloco pronto para algo andando conforme o plano, e by the end of the month expressa o prazo final. A versão com the track e until muda o bloco e usa a preposição errada para prazo. A que usa in track troca a preposição do bloco e dispensa o artigo. A que usa for to junta duas estruturas e não existe em inglês natural."
      },
      {
        id: "g9q5", s: 3, t: "g9",
        e: "During a retrospective, you want to say you are the owner of the monitoring of alerts. Choose the two correct sentences. (Choose two.)",
        o: [
          "I'm responsible for monitoring the alerts.",
          "I'm responsible for the alerts.",
          "I'm responsible of monitor the alerts.",
          "I'm responsible for monitor the alerts."
        ],
        c: [0, 1],
        x: "Responsible for aceita um substantivo (the alerts) ou um verbo no -ing (monitoring), porque depois de preposição o verbo fica no -ing, regra confirmada nas páginas do British Council sobre verbo mais preposição mais -ing. As duas versões erradas usam responsible of, tradução de 'responsável DE', ou deixam o verbo sem -ing depois de for."
      },
      {
        id: "g9q6", s: 3, t: "g9",
        e: "A teammate wrote: 'We discussed about the migration plan with the vendor.' Which correction follows the usual English pattern for this verb?",
        o: [
          "We discussed the migration plan with the vendor.",
          "We discussed on the migration plan with the vendor.",
          "We discussed of the migration plan with the vendor.",
          "We discussed for the migration plan with the vendor."
        ],
        c: [0],
        x: "Em inglês, discuss é transitivo: o assunto vem direto depois do verbo, sem preposição. A forma com about é um erro comum de falantes de português, por influência de 'discutir sobre'; as versões com on, of e for inventam outras preposições. Como esta regra não foi confirmada em página aberta nesta redação, vale conferir no dicionário de aprendizes."
      },
      {
        id: "g9q7", s: 3, t: "g9",
        e: "You are describing your role in an interview. Which sentence is the most natural way to say you led the cloud migration?",
        o: [
          "I was in charge of the cloud migration.",
          "I was in charge for the cloud migration.",
          "I was charge of the cloud migration.",
          "I was in the charge to the cloud migration."
        ],
        c: [0],
        x: "In charge of é o bloco fixo para liderar uma frente. A versão com for troca a preposição do bloco; a sem in perde a expressão; a com the charge to desmonta o bloco por tradução literal. Este bloco é uso comum de trabalho e vale conferir no dicionário de aprendizes."
      },
      {
        id: "g9q8", s: 3, t: "g9",
        e: "Your pipeline job will be down all the time up to Monday morning. Which sentence uses the right preposition?",
        o: [
          "The pipeline will be down until Monday morning.",
          "The pipeline will be down by Monday morning.",
          "The pipeline will be down for Monday morning.",
          "The pipeline will be down in Monday morning."
        ],
        c: [0],
        x: "A situação é contínua até um momento, e para isso se usa until, como no exemplo oficial do British Council 'I work until 12'. A versão com by mudaria o sentido para 'fica pronto antes de segunda'. For e in não combinam com um ponto no tempo desse jeito: for pede duração, e in com dia da semana não é a forma natural."
      },
      {
        id: "g9q9", s: 3, t: "g9",
        e: "In a post-mortem, a colleague says: 'We ran into a permission error.' Which statement about run into is correct?",
        o: [
          "It is inseparable: with a pronoun you say 'We ran into it'.",
          "It is separable: with a pronoun you say 'We ran it into'.",
          "It needs two objects, one before and one after into.",
          "It only works in the passive voice."
        ],
        c: [0],
        x: "Run into é um verbo com preposição, em que o objeto fica sempre depois, como a página de ordem das palavras do British Council explica para verbos com preposição (came up with it, nunca came up it with). A versão separável inventa uma ordem impossível, exigir dois objetos não existe, e o verbo funciona perfeitamente na voz ativa."
      },
      {
        id: "g9q10", s: 3, t: "g9",
        e: "C1 level. Which sentence uses both a dependent preposition and an -ing form correctly, in the way you would in a formal apology email?",
        o: [
          "I apologise for not sending the report earlier.",
          "I apologise for not to send the report earlier.",
          "I apologise to not sending the report earlier.",
          "I apologise about to not send the report earlier."
        ],
        c: [0],
        x: "Apologise for pede -ing depois da preposição, e a página C1 do British Council traz 'apologised for not being present' (apologise for + -ing). As versões com not to send e about to not send usam o infinitivo depois de preposição, o que não funciona, e a versão com to troca a preposição (apologise to alguém, apologise for algo)."
      },
      {
        id: "g9q11", s: 3, t: "g9",
        e: "C1 level. Choose the two sentences that correctly use a phrasal verb with a pronoun or a long object. (Choose two.)",
        o: [
          "The team rolled it out last week.",
          "The team rolled out the new version of the ingestion service last week.",
          "The team rolled out it last week.",
          "The team rolled the new version of the ingestion service out of last week."
        ],
        c: [0, 1],
        x: "Com pronome, o objeto vai entre verbo e partícula (rolled it out), e com objeto longo é comum deixá-lo depois da partícula (rolled out the new version...), como diz a página C1 do British Council sobre objetos longos. A versão com out it coloca o pronome depois da partícula, e a versão com 'out of last week' cria uma preposição extra que não existe nessa expressão."
      },
      {
        id: "g9q12", s: 3, t: "g9",
        e: "C1 level. Your lead asks why the launch is delayed. Choose the most natural and precise reply for a stand-up meeting.",
        o: [
          "It's at risk because we ran into an access issue, and I'll follow up by Friday.",
          "It's in risk because we ran an access issue, and I'll follow up until Friday.",
          "It's at the risk because we ran into the access issue, and I follow up in Friday.",
          "It's on risk because we run in an access issue, and I'll follow up for Friday."
        ],
        c: [0],
        x: "A resposta correta combina at risk (sem artigo), ran into (verbo com preposição) e by Friday (prazo). As outras trocam preposições dos blocos (in risk, on risk), perdem a partícula de run into, ou usam until, in e for com prazo, onde o inglês natural pede by. Os blocos at risk e follow up são uso comum a conferir no dicionário."
      }
    ],
    lab: {
      t: "Treino de fala: status de projeto com prazos e phrasal verbs",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Falar em voz alta fixa os pares de preposição e a ordem do phrasal verb melhor do que só ler; ouvir a gravação mostra os escorregões que você não percebe na hora.",
      antes: "Ter lido a aula inteira e ter à mão as tabelas de colocações e de phrasal verbs. Escolha um projeto real seu (ou inventado) para dar o status. Um lugar sem barulho e o gravador de voz do celular. Nada aqui foi executado por quem escreveu a aula: ajuste o tempo ao seu ritmo.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote só 4 palavras: seu papel (responsible for), o prazo (by), um risco (at risk) e uma ação (follow up). Não escreva frases inteiras." },
        { t: "Gravar 3 a 4 minutos", p: "Dê o status do projeto como na daily, usando as 4 palavras-chave e pelo menos dois phrasal verbs (set up, roll out, run into, carry out). Se travar, siga em frente." },
        { t: "Ouvir contando erros", p: "Ouça com papel e caneta e faça um traço para cada erro da estrutura da aula: preposição trocada, by e until confundidos, pronome depois da partícula, verbo sem -ing depois de preposição." },
        { t: "Regravar corrigindo", p: "Regrave a mesma fala corrigindo só os erros anotados. Depois repita mais uma vez, agora sem olhar as palavras-chave, e compare as duas versões." },
        { t: "Anotar o par que mais escapa", p: "Escreva uma frase sua com o par de preposição que mais errou e releia em voz alta duas vezes." }
      ],
      verificar: "Você gravou duas versões, anotou o número de erros em cada uma e a segunda versão tem menos erros. Você usou by para prazo, ao menos um verbo com -ing depois de preposição e nenhum 'depend of' ou 'discuss about'.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Guarde só a lista dos pares de preposição que errou, para revisar na semana seguinte."
      ],
      erros: [
        { s: "Travei e fiquei em silêncio na gravação", c: "Tentou montar a frase inteira em português antes de falar.", r: "Use só as 4 palavras-chave e fale frases curtas. Prefira uma frase simples e correta a uma frase longa com erro." },
        { s: "Não percebo meus erros ao ouvir", c: "Ouviu de forma geral, sem uma lista do que procurar.", r: "Ouça uma vez só para preposições, outra só para phrasal verbs, e faça um traço por erro." },
        { s: "Misturo by e until toda hora", c: "Está traduzindo 'até' do português, que cobre os dois sentidos.", r: "Pergunte: a ação acontece uma vez até o prazo (by) ou dura o tempo todo até ali (until)? Escreva uma frase de cada e fale em voz alta." }
      ]
    }
  };

  /* ===================== AULA 10 ===================== */
  C.dias[10] = {
    aula: {
      titulo: "Frases complexas e ênfase: falar com autoridade (C1)",
      resumo: "Orações relativas (who, which, that; defining x non-defining; 'which means that...'), conectores de contraste e causa (although, whereas, despite, however, therefore), frases clivadas ('What I did was...', 'It was X that...') e marcadores de discurso para estruturar uma apresentação em reunião ou entrevista.",
      simples: {
        analogia: "Imagine que cada frase simples é um tijolo: 'We built a pipeline.' 'The pipeline is fast.' Quem só fala com tijolos soltos passa a impressão de uma construção pequena. Quem sabe encaixar os tijolos com cimento faz uma parede: 'We built a pipeline that is fast.' O cimento são as palavras de ligação: who, which, although, therefore. E a ênfase é a tinta de uma cor forte numa parede só: com 'What I did was...' você pinta de cor forte a parte que quer que o ouvinte guarde. Autoridade em inglês não vem de palavras difíceis, vem de frases bem encaixadas, com uma ideia principal clara e um destaque no lugar certo.",
        pontos: [
          "Relativa que define (sem vírgula) diz de qual coisa você fala; a que acrescenta (com vírgula) dá um extra.",
          "Em relativa com vírgula não se usa that: use who ou which.",
          "Although e whereas ligam duas frases com sujeito e verbo; despite pede substantivo ou -ing.",
          "'What I did was...' e 'It was X that...' põem uma informação em destaque.",
          "Em apresentação, avise a estrutura, use marcadores (firstly, next) e resuma no final."
        ],
        paraQueServe: "Responder perguntas de entrevista em frases mais longas e claras e conduzir uma apresentação em reunião sem soar como uma lista de frases soltas."
      },
      glossario: [
        { t: "Relative clause", d: "Oração que descreve um substantivo e começa com who, which, that, whose, when ou where." },
        { t: "Defining clause", d: "Relativa essencial, sem vírgulas, que identifica de qual pessoa ou coisa você fala." },
        { t: "Non-defining clause", d: "Relativa com vírgulas que apenas acrescenta uma informação extra sobre algo já identificado." },
        { t: "Cleft sentence (frase clivada)", d: "Frase dividida em duas partes para destacar uma informação: 'What I like is...' ou 'It was X that...'." },
        { t: "Signposting", d: "Marcadores que guiam o ouvinte numa apresentação: firstly, next, in summary." },
        { t: "Linking word (conector)", d: "Palavra que liga ideias, como although, whereas, therefore." },
        { t: "Contrast", d: "Relação entre duas ideias que se opõem ou surpreendem: although, whereas, despite." },
        { t: "Emphasis (ênfase)", d: "Destaque dado a uma parte da frase para o ouvinte guardar aquela informação." }
      ],
      blocos: [
        {
          t: "Relativa que define: who, which e that",
          facil: "Traduzindo: a relativa que define diz de qual pessoa ou coisa você fala, sem vírgula; who é para gente, which e that para coisas.",
          p: [
            "A página do British Council sobre defining relative clauses diz que a relativa essencial informa qual pessoa ou coisa você quer dizer. Who ou that para pessoas (that é mais comum e levemente mais informal), which ou that para coisas, when para tempo, where para lugar e whose para posse.",
            "Sobre omitir o pronome: a página diz que dá para deixar de fora who, which ou that quando o que vem depois tem seu próprio sujeito, como em 'The cake my sister baked was delicious', e que em geral não se omite quando o verbo vem logo depois, como em 'The man who lives upstairs is a musician'."
          ],
          lista: [
            "The engineer who wrote the pipeline is on vacation.",
            "The pipeline that failed last night is the one we use for billing.",
            "The report (that) you asked for is ready. (pronome pode sair: 'you' é sujeito)",
            "The team whose models are in production will present first."
          ],
          armadilha: "Erro comum de falantes de português: colocar um pronome a mais na relativa, como 'the report that I sent it'. Em inglês o that já é o objeto: 'the report that I sent'.",
          fonte: ["British Council LearnEnglish: Relative clauses: defining relative clauses", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses"]
        },
        {
          t: "Relativa que acrescenta, e o 'which' que comenta a frase toda",
          facil: "Traduzindo: com vírgulas, a relativa só dá um extra; nela você usa who ou which, nunca that.",
          p: [
            "A página sobre non-defining relative clauses diz que essa oração dá informação extra, que a frase continua fazendo sentido sem ela, que ela vem entre vírgulas e que começa com who, which, whose, when ou where, sem that. Exemplos da página: 'Yesterday I met my new boss, who was very nice' e 'The house, which is very big, is also very cold'.",
            "Nos comentários da mesma página, um leitor pergunta sobre 'They put a party together for me, that/which was surprising', e a equipe responde que that não pode ser usado ali, porque that só aparece em relativas que definem; a versão com which comentando a frase toda é a correta. Esse é o molde de 'which means that...' que soa muito profissional: 'The pipeline failed, which means that the report will be late.'"
          ],
          tabela: {
            cab: ["Tipo", "Pontuação", "Exemplo de trabalho"],
            linhas: [
              ["Defining (essencial)", "sem vírgulas", "The dashboard that Finance uses is down."],
              ["Non-defining (extra)", "com vírgulas, sem that", "Our dashboard, which Finance uses daily, is down."],
              ["Which sobre a frase toda", "vírgula antes de which", "The job failed, which means that we'll miss the deadline."]
            ]
          },
          dica: "Teste rápido: se você pode apagar a relativa e a frase continua clara, ela é non-defining e leva vírgulas.",
          armadilha: "Armadilha de brasileiro: usar that depois de vírgula ('the server, that crashed...'). Com vírgula, use who ou which.",
          fonte: ["British Council LearnEnglish: Relative clauses: non-defining relative clauses", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-non-defining-relative-clauses"]
        },
        {
          t: "Contraste: although, even though, whereas, while e despite",
          facil: "Traduzindo: although e whereas ligam duas frases completas; despite pede um substantivo ou um verbo no -ing.",
          p: [
            "A página de contrasting ideas (C1) diz que although, though e even though ligam duas ideias contrastantes e que even though é mais forte e enfático. Depois deles vêm sujeito e verbo: 'Although Marjorie lost the election, many more people voted for her.' Despite e in spite of têm o mesmo sentido e pedem substantivo ou -ing: 'We arrived on time in spite of missing the train.' Para usar sujeito e verbo, acrescente the fact that: despite the fact that...",
            "Whereas e while contrastam duas ideias, parecido com but: 'While Ivan is very sociable, his brother is more reserved.' A página diz que while é uma conjunção muito usada com tempo, mas também pode significar although, e que nesse caso ele vem no começo da frase. Para falar de dados, serve bem: 'Sales grew in Brazil, whereas they fell in Mexico.'"
          ],
          tabela: {
            cab: ["Conector", "Vem seguido de", "Exemplo"],
            linhas: [
              ["although / even though", "sujeito + verbo", "Although the model is accurate, it is slow."],
              ["despite / in spite of", "substantivo ou -ing", "Despite the delay, we shipped on time."],
              ["despite the fact that", "sujeito + verbo", "Despite the fact that we were late, the client agreed."],
              ["whereas / while", "sujeito + verbo (contraste)", "Batch is cheap, whereas streaming is expensive."]
            ]
          },
          armadilha: "Erro comum de falantes de português: 'Despite of the delay' ou 'Although of the delay'. Despite não leva of (in spite of leva of), e although pede uma frase completa.",
          fonte: ["British Council LearnEnglish: Contrasting ideas (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/contrasting-ideas"]
        },
        {
          t: "However e therefore: contraste e consequência entre frases",
          facil: "Traduzindo: however abre uma frase que contraria a anterior; therefore abre uma frase que é consequência dela.",
          p: [
            "Nenhuma das páginas abertas para esta aula explica however e therefore, então o que segue é o uso comum de escrita e fala profissional, a conferir num dicionário de aprendizes ou num guia de transições antes de usar em texto formal. A página de transições da Purdue, que abrimos, trata de transições entre parágrafos e não menciona estes dois conectores.",
            "Uso comum: however começa uma frase nova que contraria a anterior e costuma levar vírgula depois: 'The model is accurate. However, it is too slow for production.' Therefore indica consequência: 'The data is incomplete. Therefore, we cannot publish the report yet.' Eles ligam frases, diferente de although, que liga as duas ideias numa frase só."
          ],
          lista: [
            "The pipeline passed all tests. However, the data was stale.",
            "The vendor delayed the delivery. Therefore, we moved the launch to May.",
            "Although the pipeline passed all tests, the data was stale."
          ],
          dica: "Fale um conector por vez: ao final de uma ideia, faça uma pausa curta e abra a próxima com However ou Therefore."
        },
        {
          t: "Frases clivadas: destacar a informação nova",
          facil: "Traduzindo: 'What I did was...' e 'It was X that...' empurram para o fim da frase a informação que você quer destacar.",
          p: [
            "A página do British Council sobre ênfase (C1) explica que as frases clivadas ressaltam uma parte da frase de dois modos. Com it: it mais be, o elemento destacado e depois who ou that, como em 'It was you who invited me to the party yesterday'. Com what: uma oração what mais be, e a informação destacada vem depois do be, como em 'What I like best about going to the cinema is talking about the film afterwards'. A página diz que a forma com what é comum na fala e que dá para usar where, why, who e how em estruturas parecidas.",
            "Moldes de trabalho: 'What I did was redesign the schema.' 'It was the schema that caused the delay.' 'The reason why we chose dbt is that it fits our workflow.' O molde com the reason why é uma adaptação comum da ideia da página, que lista why entre as palavras que abrem a estrutura."
          ],
          lista: [
            "What I did was rebuild the incremental model.",
            "What we need is a clearer owner for the pipeline.",
            "It was the schema change that broke the report.",
            "It was in March that we migrated to the cloud."
          ],
          dica: "Em entrevista, abra com a ação: 'What I did was...' e termine com o resultado: 'which reduced the runtime by half' (use só números reais).",
          fonte: ["British Council LearnEnglish: Emphasis: cleft sentences, inversion and auxiliaries (C1)", "https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries"]
        },
        {
          t: "Como estruturar uma apresentação com marcadores de discurso",
          facil: "Traduzindo: diga o que vai falar, avise cada mudança de assunto, resuma no fim e abra para perguntas.",
          p: [
            "A lição de escuta B2 do British Council (A design presentation) mostra um roteiro com expressões prontas: abrir com agradecimento ('Thanks for coming to this short presentation on...'), anunciar a estrutura ('I'd like to talk you through the following three points'), sequenciar ('Firstly', 'I'd now like to tell you about...', 'Finally, I'm going to talk to you about...'), apontar visuais ('As you can see', 'You'll notice...'), resumir ('In summary') e abrir para perguntas ('Any questions?').",
            "Para dados e TI você troca o conteúdo e mantém os marcadores: 'I'd like to talk you through three points: the problem, our approach and the results. Firstly... Now let me move on to... In summary...'. Combine com as aulas: relativas dão detalhe, although dá contraste e a clivada dá destaque."
          ],
          tabela: {
            cab: ["Momento", "Marcador", "Exemplo"],
            linhas: [
              ["Abrir", "Thanks for... / Today I'd like to...", "Thanks for joining. Today I'd like to talk about our data quality plan."],
              ["Estrutura", "I'd like to talk you through...", "I'd like to talk you through three points."],
              ["Avançar", "Firstly / Now let me move on to... / Finally", "Now let me move on to the results."],
              ["Apontar", "As you can see / You'll notice", "As you can see, the error rate dropped."],
              ["Fechar", "In summary / Any questions?", "In summary, we reduced failures. Any questions?"]
            ]
          },
          fonte: ["British Council LearnEnglish: A design presentation (B2 listening)", "https://learnenglish.britishcouncil.org/skills/listening/b2-listening/design-presentation"]
        }
      ],
      exemplo: {
        t: "Resposta de entrevista em frases encaixadas",
        texto: "A entrevistadora pergunta: 'Tell me about a problem you solved.' Camila responde: 'Last year we had a pipeline that failed almost every week, which meant that Finance received late reports. Although the code was correct, the problem was in the data contracts. What I did was add validation at the source, and it was this change that stopped the weekly failures. As a result, the team, who used to spend Mondays fixing reports, could focus on new features. In summary, I found the root cause, I fixed it and I made the fix last.' Repare nos encaixes: uma relativa que define, um which comentando a frase, um although de contraste, uma frase clivada para destacar a ação e a causa, uma relativa com vírgulas para um extra e um resumo no final.",
      },
      prova: [
        "Entrevista: você responde 'Tell me about a challenge' com uma relativa, um contraste e uma frase com 'What I did was...'.",
        "Reunião: você explica uma consequência com 'The job failed, which means that...' em vez de duas frases soltas.",
        "Apresentação: você anuncia 'three points' no começo e termina com 'In summary...' e 'Any questions?'.",
        "E-mail: você usa 'Despite the delay' (com substantivo) e 'Although we were late' (com frase) sem misturar."
      ],
      explique: "Explique com as suas palavras a diferença entre relativa que define e relativa com vírgulas, por que despite não aceita sujeito e verbo sem the fact that, e como você abriria uma apresentação de dois minutos.",
      checagem: [
        "Quando a relativa leva vírgulas e por que that não é usado nela?",
        "Que estrutura vem depois de although e que estrutura vem depois de despite?",
        "Como se forma uma frase clivada com what e com it?",
        "Quais marcadores você usa para abrir, avançar e fechar uma apresentação?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: Relative clauses: defining relative clauses", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses"],
      ["British Council LearnEnglish: Relative clauses: non-defining relative clauses", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-non-defining-relative-clauses"],
      ["British Council LearnEnglish: Contrasting ideas (C1)", "https://learnenglish.britishcouncil.org/grammar/c1-grammar/contrasting-ideas"],
      ["British Council LearnEnglish: Emphasis: cleft sentences, inversion and auxiliaries (C1)", "https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries"],
      ["British Council LearnEnglish: A design presentation (B2 listening)", "https://learnenglish.britishcouncil.org/skills/listening/b2-listening/design-presentation"]
    ],
    cartoes: [
      { id: "g10c1", f: "Junte com that: 'The pipeline failed last night.' + 'It feeds the billing report.'", v: "The pipeline that failed last night feeds the billing report. Relativa que define, sem vírgulas.", t: "g10" },
      { id: "g10c2", f: "Corrija: 'The server, that crashed, is back.'", v: "The server, which crashed, is back. Com vírgulas (non-defining) não se usa that.", t: "g10" },
      { id: "g10c3", f: "Complete: 'The job failed, ___ means that the report will be late.'", v: "which. Which comenta a frase inteira, com vírgula antes.", t: "g10" },
      { id: "g10c4", f: "Corrija: 'Despite we were late, the client agreed.'", v: "Although we were late... ou Despite being late / Despite the fact that we were late. Despite pede substantivo, -ing ou the fact that.", t: "g10" },
      { id: "g10c5", f: "Corrija: 'Despite of the delay, we shipped.'", v: "Despite the delay, we shipped. Despite não leva of; in spite of leva.", t: "g10" },
      { id: "g10c6", f: "Reescreva com contraste: 'Batch is cheap. Streaming is expensive.' (whereas)", v: "Batch is cheap, whereas streaming is expensive. Whereas contrasta duas ideias na mesma frase.", t: "g10" },
      { id: "g10c7", f: "Destaque a ação com 'What I did was...': 'I rebuilt the model.'", v: "What I did was rebuild the model. Depois de 'was' o verbo costuma voltar à forma base.", t: "g10" },
      { id: "g10c8", f: "Destaque a causa: 'The schema change broke the report.' (It was... that)", v: "It was the schema change that broke the report. It + be + elemento destacado + that.", t: "g10" },
      { id: "g10c9", f: "Corrija: 'The report that I sent it is attached.'", v: "The report that I sent is attached. O that já é o objeto: não repita it.", t: "g10" },
      { id: "g10c10", f: "Qual marcador você usa para avisar a estrutura no início de uma apresentação?", v: "I'd like to talk you through three points... O British Council usa 'talk you through the following three points'.", t: "g10" },
      { id: "g10c11", f: "Qual marcador você usa no fim da apresentação, antes de abrir perguntas?", v: "In summary, ... seguido de 'Any questions?'. Resume os pontos e convida ao diálogo.", t: "g10" },
      { id: "g10c12", f: "Complete: 'The data is incomplete. ___, we cannot publish yet.' (consequência)", v: "Therefore (com vírgula). Therefore abre a frase que é consequência; uso comum a conferir no dicionário.", t: "g10" },
      { id: "g10c13", f: "Quando 'that' pode sair de 'The tool (that) we use is open source'?", v: "Quando o que vem depois tem seu próprio sujeito (we). Se o verbo vem logo depois, o pronome fica.", t: "g10" }
    ],
    questoes: [
      {
        id: "g10q1", s: 4, t: "g10",
        e: "You describe a colleague in a status meeting. Which sentence correctly uses a defining relative clause for a person?",
        o: [
          "The analyst who owns the dashboard is on leave.",
          "The analyst which owns the dashboard is on leave.",
          "The analyst what owns the dashboard is on leave.",
          "The analyst who he owns the dashboard is on leave."
        ],
        c: [0],
        x: "Para pessoas, a relativa essencial usa who (ou that), como diz a página do British Council. Which é para coisas, what não funciona como pronome relativo aqui, e repetir he depois de who duplica o sujeito, erro comum de falantes de português. A frase certa identifica de qual analista você fala, sem vírgulas."
      },
      {
        id: "g10q2", s: 4, t: "g10",
        e: "Choose the sentence that correctly adds extra information about a system that everyone already knows, using commas.",
        o: [
          "Our data warehouse, which we migrated last year, is very fast.",
          "Our data warehouse, that we migrated last year, is very fast.",
          "Our data warehouse which we migrated last year, is very fast.",
          "Our data warehouse, what we migrated last year, is very fast."
        ],
        c: [0],
        x: "A relativa com vírgulas é non-defining: dá informação extra e começa com who, which, whose, when ou where, nunca com that, segundo a página do British Council. A versão com that quebra essa regra, a com vírgula só no final deixa a pontuação incompleta e a com what não é pronome relativo nesse uso."
      },
      {
        id: "g10q3", s: 4, t: "g10",
        e: "Your pipeline failed and the report will be late. Which sentence best uses 'which' to comment on the whole situation?",
        o: [
          "The pipeline failed, which means that the report will be late.",
          "The pipeline failed, that means that the report will be late.",
          "The pipeline failed which, means that the report will be late.",
          "The pipeline failed, what means the report will be late."
        ],
        c: [0],
        x: "Which depois de vírgula pode comentar a frase inteira, como em 'They put a party together for me, which was surprising', discutida nos comentários da página do British Council, onde that não cabe. A versão com that depois da vírgula repete o erro de usar that em oração com vírgula, a com vírgula depois de which desloca a pausa, e what não é pronome relativo nesse uso."
      },
      {
        id: "g10q4", s: 4, t: "g10",
        e: "Find the error. A candidate says in an interview: 'Despite we had little time, we delivered the project.' Which correction is grammatical?",
        o: [
          "Although we had little time, we delivered the project.",
          "Despite of we had little time, we delivered the project.",
          "Despite that we had little time, we delivered the project.",
          "Although of little time, we delivered the project."
        ],
        c: [0],
        x: "Although pede sujeito e verbo, e a frase tem os dois (we had). A página de contrasting ideas diz que despite pede substantivo ou -ing, ou the fact that antes de sujeito e verbo. As versões com despite of e com despite that não seguem essas formas, e although of little time mistura uma conjunção com um substantivo e com of."
      },
      {
        id: "g10q5", s: 4, t: "g10",
        e: "You want to compare two data tools in one sentence. Choose the two correct sentences. (Choose two.)",
        o: [
          "Batch processing is cheap, whereas streaming is expensive.",
          "While batch processing is cheap, streaming is expensive.",
          "Batch processing is cheap, despite streaming is expensive.",
          "Batch processing is cheap, whereas of streaming is expensive."
        ],
        c: [0, 1],
        x: "Whereas e while, com o sentido de contraste, ligam duas ideias contrastantes, como no exemplo 'While Ivan is very sociable, his brother is more reserved' do British Council, e quando while significa although ele vem no começo da frase. A versão com despite seguido de sujeito e verbo ignora a estrutura de despite, e a com whereas of mistura uma preposição que não existe ali."
      },
      {
        id: "g10q6", s: 4, t: "g10",
        e: "In an interview you want to put the focus on your own action. Which sentence is a correct cleft sentence?",
        o: [
          "What I did was redesign the data model.",
          "What I did it was redesign the data model.",
          "What did I was redesign the data model.",
          "It what I did was redesign the data model."
        ],
        c: [0],
        x: "A frase clivada com what tem o molde what mais oração mais be, e a informação destacada vem depois do be, como na página do British Council ('What I like best... is...'). As outras versões repetem o sujeito com it, invertem a ordem como em pergunta ou misturam it e what, o que não forma um molde válido."
      },
      {
        id: "g10q7", s: 4, t: "g10",
        e: "Your manager asks why the report broke. You want to stress that the cause was a schema change, not the code. Which sentence does that?",
        o: [
          "It was the schema change that broke the report.",
          "It was the schema change what broke the report.",
          "It is the schema change who broke the report yesterday.",
          "That was the schema change it broke the report."
        ],
        c: [0],
        x: "A frase clivada com it é it mais be, o elemento destacado e that (ou who para pessoas), como descreve a página do British Council. A versão com what troca o conector, a com who usa o pronome de pessoa para uma coisa, e a que começa com that mais it duplica o sujeito, o que não é um molde válido."
      },
      {
        id: "g10q8", s: 4, t: "g10",
        e: "You are opening a 3-minute presentation for stakeholders. Which opening is the most effective use of signposting?",
        o: [
          "I'd like to talk you through three points: the problem, our approach and the results.",
          "I will say you three points about the problem, approach and results.",
          "Today I want to show you something and then another thing.",
          "Please see slides, we have many things."
        ],
        c: [0],
        x: "O roteiro de apresentação do British Council usa 'talk you through' e anuncia o número de pontos, o que prepara o ouvinte. As outras versões usam 'say you', que é erro de verbo, deixam a estrutura vaga ou não estruturam nada, sem marcadores para o ouvinte seguir."
      },
      {
        id: "g10q9", s: 4, t: "g10",
        e: "Which closing is the best way to end a short presentation and open it to questions?",
        o: [
          "In summary, we reduced failures by fixing the data contracts. Any questions?",
          "That's all, thank you, bye.",
          "Finally, firstly, I think maybe that is all.",
          "So, I don't know, we can finish."
        ],
        c: [0],
        x: "A lição do British Council usa 'In summary' para resumir e 'Any questions?' para abrir a conversa. A primeira alternativa faz exatamente isso e ainda entrega a conclusão. As demais encerram sem resumo, misturam marcadores de começo e de fim, ou soam incertas."
      },
      {
        id: "g10q10", s: 4, t: "g10",
        e: "C1 level. Which sentence correctly combines a non-defining relative clause and a contrast linker in a formal email?",
        o: [
          "Our client, who has used the platform for years, remains satisfied, although the migration caused delays.",
          "Our client, that has used the platform for years, remains satisfied, despite the migration caused delays.",
          "Our client who has used the platform for years, remains satisfied, although of the migration delays.",
          "Our client, who he has used the platform for years, remains satisfied, whereas of the delays."
        ],
        c: [0],
        x: "A frase certa usa who com vírgulas (non-defining) e although seguido de sujeito e verbo, as duas regras das páginas do British Council. As outras usam that em oração com vírgulas, despite seguido de sujeito e verbo, of depois de although ou whereas, ou repetem he depois de who, quebrando uma regra cada uma."
      },
      {
        id: "g10q11", s: 4, t: "g10",
        e: "C1 level. Choose the two sentences that correctly use despite or in spite of. (Choose two.)",
        o: [
          "Despite the budget cuts, the team delivered the project.",
          "In spite of working under pressure, the team delivered the project.",
          "Despite the team worked under pressure, they delivered the project.",
          "In spite the budget cuts, the team delivered the project."
        ],
        c: [0, 1],
        x: "Despite e in spite of aceitam substantivo (the budget cuts) ou -ing (working), conforme a página de contrasting ideas do British Council. A versão com despite seguido de sujeito e verbo precisaria de the fact that, e in spite sem of omite uma palavra da expressão, erro comum de falantes de português."
      },
      {
        id: "g10q12", s: 4, t: "g10",
        e: "C1 level. In a negotiation meeting, you want to explain a decision with emphasis on the reason. Which sentence is the most natural and correct?",
        o: [
          "The reason why we chose this vendor is that their pipeline is more reliable.",
          "The reason why we chose this vendor it is that their pipeline is more reliable.",
          "The reason because we chose this vendor is that their pipeline is more reliable.",
          "The reason why that we chose this vendor is their pipeline more reliable."
        ],
        c: [0],
        x: "O molde 'The reason why... is that...' usa why (uma das palavras que a página de ênfase do British Council lista para abrir estruturas clivadas) e fecha com is that. As outras duplicam o sujeito com it, trocam why por because ('the reason because' não é a construção usual) ou deixam a ordem sem o verbo no lugar certo."
      }
    ],
    lab: {
      t: "Treino de fala: responder e apresentar em frases encaixadas",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Frases encaixadas exigem planejar a estrutura enquanto você fala; gravar mostra se a relativa, o contraste e o destaque saíram de verdade.",
      antes: "Ter lido a aula e escolhido um problema real que você resolveu no trabalho (ou inventado). Separe a tabela de marcadores de apresentação e as seis estruturas da aula: relativa que define, relativa com vírgulas, which sobre a frase toda, although, whereas e frase clivada. Nada aqui foi executado por quem escreveu a aula.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote quatro palavras: o problema, a causa, o que você fez e o resultado. Não escreva frases." },
        { t: "Gravar a resposta de entrevista (2 minutos)", p: "Responda 'Tell me about a problem you solved' com pelo menos: uma relativa que define, um which comentando a frase, um although e um 'What I did was...'." },
        { t: "Gravar mini-apresentação (2 minutos)", p: "Anuncie três pontos, use Firstly, Now let me move on to... e In summary, e termine com Any questions?" },
        { t: "Ouvir contando erros", p: "Ouça duas vezes e conte: that depois de vírgula, despite com sujeito e verbo, pronome repetido na relativa, clivada mal formada, marcador esquecido." },
        { t: "Regravar", p: "Regrave as duas partes corrigindo só os erros contados e compare quantos erros ficaram." }
      ],
      verificar: "Você gravou duas versões de cada parte, contou os erros e a segunda tem menos. Nas gravações há pelo menos uma relativa com vírgulas sem that, um although com sujeito e verbo, uma frase com 'What I did was' e os marcadores de abertura e fechamento.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Guarde só um papel com as três frases-modelo que mais funcionaram, para reusar na próxima entrevista."
      ],
      erros: [
        { s: "Minhas frases ficam longas e me perco no meio", c: "Tentou encaixar tudo numa frase só.", r: "Use no máximo uma relativa por frase e faça pausa antes de which e de although. Frase curta e correta vale mais." },
        { s: "Esqueço o que contar ao ouvir", c: "Ouviu sem lista de erros.", r: "Faça uma escuta por estrutura: primeiro só as relativas, depois só os conectores, depois só as clivadas." },
        { s: "Soa decorado", c: "Leu as frases em vez de falar com as palavras-chave.", r: "Fale só com as quatro palavras-chave e use os moldes como esqueleto, trocando o conteúdo a cada gravação." }
      ]
    }
  };

  /* ===================== AULA 11 ===================== */
  C.dias[11] = {
    aula: {
      titulo: "Negociação e pedidos: educação, concessões e como dizer não",
      resumo: "Como suavizar pedidos com would, could e if ('I was wondering if...', 'Would it be possible to...'), fazer concessões e contrapropostas com o second conditional, falar de obrigação e necessidade (have to, need to, must, mustn't x don't have to) e recusar sem fechar a porta em negociações de salário, prazo e escopo.",
      simples: {
        analogia: "Pense em abrir uma porta que não é sua. Dá para empurrar de uma vez, 'Give me a raise', ou dá para bater antes e perguntar: 'I was wondering if we could talk about my salary.' O conteúdo do pedido é o mesmo, mas a segunda forma bate na porta primeiro. Em inglês de trabalho, a batida na porta é feita pelo tempo verbal: would, could e o passado ('I was wondering') deixam o pedido mais distante e educado, como dar um passo atrás para a outra pessoa poder responder com calma. E o second conditional é a janela entreaberta para negociar: 'If you could offer X, we would be able to do Y.' Você não promete nada, você mostra um caminho. Dizer não também pode deixar a porta encostada, não trancada.",
        pontos: [
          "Could e would deixam o pedido mais educado do que can e will.",
          "O passado suaviza: 'I was wondering if...' soa mais delicado do que 'I wonder if...'.",
          "Second conditional (if + passado, would + base) propõe uma troca sem prometer.",
          "Mustn't é proibido; don't have to é não obrigatório. São coisas bem diferentes.",
          "Para recusar, reconheça o pedido, dê um motivo curto e ofereça uma alternativa."
        ],
        paraQueServe: "Negociar salário, prazo e escopo, pedir mais tempo ou recurso e recusar uma demanda mantendo a boa relação, que importa muito em carreira internacional."
      },
      glossario: [
        { t: "Polite request", d: "Pedido feito com forma suavizada, como 'Could you...' ou 'Would you mind...'." },
        { t: "Second conditional", d: "Estrutura 'if + passado simples, would + verbo base' para situações imaginadas ou pouco prováveis." },
        { t: "Concession (concessão)", d: "Algo que você aceita ceder numa negociação para chegar a um acordo." },
        { t: "Counteroffer (contraproposta)", d: "Resposta a uma oferta com uma oferta diferente sua." },
        { t: "Obligation", d: "Algo que é preciso fazer; em inglês aparece em must, have to, need to." },
        { t: "Prohibition", d: "Algo proibido; em inglês se diz mustn't (must not)." },
        { t: "Hedge (suavizador)", d: "Palavra ou estrutura que reduz a força da frase: perhaps, I was wondering, it might be." },
        { t: "Win-win", d: "Acordo em que os dois lados ganham algo; o artigo de negociação do British Council chama de abordagem colaborativa." }
      ],
      blocos: [
        {
          t: "Pedidos educados: could, would e o passado que suaviza",
          facil: "Traduzindo: could you e would you são pedidos educados; can you e will you são mais diretos. O passado deixa tudo mais gentil.",
          p: [
            "A página de pedidos, ofertas e convites do British Council diz que 'Could you take a message, please?' e 'Would you carry this for me, please?' são formas educadas de pedir algo, e que can e will são menos educados. A página sobre will e would diz que os tempos passados são mais educados (Past tenses are more polite).",
            "Esta é a lógica por trás de 'I was wondering if...': o passado afasta o pedido do momento presente e deixa a outra pessoa à vontade para dizer não. A página abre o princípio ('Past tenses are more polite'), mas não traz o exemplo 'I was wondering', que vem de outra fonte do British Council que não abrimos; trate esta frase como molde comum de trabalho. No trabalho: 'Could you share the access logs?' e 'I was wondering if you could review my draft.'"
          ],
          lista: [
            "Could you send me the contract draft by Thursday?",
            "Would you be able to extend the deadline by two days?",
            "I was wondering if we could talk about the scope.",
            "Would you mind reviewing the proposal today?"
          ],
          dica: "Quando a resposta pode ser não, use a forma mais suave: 'I was wondering if...'. Para um pedido de rotina, 'Could you...' basta.",
          armadilha: "Erro comum de falantes de português: usar 'I want' num pedido a um superior ('I want a raise'). Prefira 'I'd like to discuss...' ou 'I was wondering if...'.",
          fonte: ["British Council LearnEnglish: Requests, offers and invitations", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/requests-offers-invitations"]
        },
        {
          t: "Would you mind, I'd like e Is there any chance",
          facil: "Traduzindo: would you mind pede -ing; I'd like diz o que você quer sem soar seco; is there any chance é para pedido delicado.",
          p: [
            "A página sobre will e would mostra 'Would you mind carrying this?' e 'Would you mind not telling him until tomorrow?', e explica que 'Would you mind' vem seguido de -ing. Mostra também 'I'd like that one, please' e 'I'd like to go home now' para dizer o que você quer de forma educada.",
            "A lição de falar B1 (Asking a favour) traz 'Would you be able to work on it this afternoon?' e 'Is there any chance you could work late tonight?' como pedidos mais tentativos, e 'I'm really sorry about this, but...' para suavizar antes de pedir. No trabalho de dados: 'Would you mind sharing the schema?' e 'Is there any chance you could look at this ticket today?'"
          ],
          tabela: {
            cab: ["Situação", "Frase-modelo", "Nível de suavidade"],
            linhas: [
              ["Pedido de rotina", "Could you share the report?", "educado"],
              ["Pedido que dá trabalho", "Would you mind reviewing this today?", "mais educado"],
              ["Pedido incerto", "Is there any chance you could extend the deadline?", "bem tentativo"],
              ["Pedido que pode incomodar", "I was wondering if it would be possible to move the meeting.", "muito suave"]
            ]
          },
          armadilha: "Armadilha de brasileiro: 'Would you mind to review...'. Depois de would you mind vem -ing: reviewing.",
          fonte: ["British Council LearnEnglish: 'will' and 'would'", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/will-would"]
        },
        {
          t: "Second conditional: ofertas e contrapropostas sem prometer",
          facil: "Traduzindo: if + passado, would + verbo base propõe uma troca como hipótese; você não se compromete ainda.",
          p: [
            "A página de condicionais do British Council diz que o second conditional imagina situações presentes ou futuras impossíveis ou improváveis, com a estrutura if mais passado simples e would mais infinitivo: 'If I won a lot of money, I'd buy a big house in the country.' Com be, a forma gramatical é were ('If I were you...'), embora was também apareça na fala.",
            "Em negociação ele funciona como oferta condicional: 'If you could offer a higher base salary, I would be able to accept right away.' e 'If we extended the deadline by a week, we would deliver a more stable version.' Você mostra uma troca possível e deixa a decisão com a outra parte. A página mostra também could no resultado ('If we had a garden, we could have a cat')."
          ],
          lista: [
            "If you could offer remote work, I would be happy to accept.",
            "If we extended the deadline, we could include the extra tests.",
            "I would consider the offer if the salary were closer to the market range.",
            "If I were you, I'd ask for a written confirmation."
          ],
          dica: "Fórmula de contraproposta: 'I understand X. If you could do Y, I would be able to do Z.' Reconhece, condiciona e mostra o ganho.",
          armadilha: "Erro comum de falantes de português: 'If you will offer a higher salary, I would accept' ou 'If I will get the job...'. No second conditional, o if leva passado: if you offered / if you could offer.",
          fonte: ["British Council LearnEnglish: Conditionals: zero, first and second", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second"]
        },
        {
          t: "Concessões e contrapropostas: frases de quem negocia",
          facil: "Traduzindo: concessão é ceder algo em troca de algo; use frases que sinalizem abertura sem fechar o acordo cedo demais.",
          p: [
            "A lição de escuta B1 do British Council (uma ligação de um cliente) mostra um pedido de concessão sobre prazo de pagamento e as respostas do fornecedor: 'I need an extension on the payment terms', 'You'd really be helping us out if you could extend it to 60 days', 'I'm not sure if I can do that', 'Let me see what I can do', 'Yes, I think we can make an exception this time' e 'It works both ways'.",
            "O artigo de negociação do British Council defende a abordagem colaborativa: conhecer seus objetivos, separar as pessoas do problema, fazer perguntas e ouvir, buscar interesses em comum e olhar opções criativas. Em carreira, isso vira frases como 'What matters most to you?' e 'Is there flexibility on the start date if the salary is fixed?'"
          ],
          tabela: {
            cab: ["Objetivo", "Frase-modelo"],
            linhas: [
              ["Pedir uma concessão", "I need an extension on the deadline. You'd really be helping us out if you could..."],
              ["Ganhar tempo", "Let me see what I can do."],
              ["Sinalizar dúvida", "I'm not sure if I can do that."],
              ["Ceder uma vez", "I think we can make an exception this time."],
              ["Pedir troca", "It works both ways: if we do X, could you do Y?"],
              ["Explorar opções", "What if we split the work in two phases?"]
            ]
          },
          dica: "Concessão boa é troca: só ceda algo se pedir algo em retorno e diga isso em voz alta ('if we do X, could you do Y?').",
          fonte: ["British Council LearnEnglish: A phone call from a customer (B1 listening)", "https://learnenglish.britishcouncil.org/skills/listening/b1-listening/phone-call-customer"]
        },
        {
          t: "Obrigação e necessidade: must, have to, need to, mustn't e don't have to",
          facil: "Traduzindo: must e have to são obrigação; mustn't é proibido; don't have to é não precisa. Mustn't e don't have to NÃO são a mesma coisa.",
          p: [
            "A página de modais de permissão e obrigação do British Council diz que must expressa obrigação ou necessidade forte, muitas vezes vinda do falante ou de quem escreveu a regra, e que have to mostra obrigação vinda de fora, como em 'We have to wear a uniform when we're working in reception.' Para o passado se usa had to, e have to é o preferido em perguntas ('When do we have to hand in our homework?').",
            "Don't have to mostra que não há obrigação, ou seja, é opcional: 'You don't have to come with me, honestly.' Mustn't mostra que algo é proibido: 'You mustn't be late to class.' Sobre need to, a página de sugestões e obrigações do British Council mostra must e need to como necessidade ('Everyone needs to bring something to eat') e diz que mustn't é proibição ('You mustn't make any noise in the library'). Uma resposta da equipe do British Council diz que have to é mais comum para regras e need to para o que é necessário para chegar a um objetivo, e que em muitos contextos os dois servem. 'Be required to' não aparece nas páginas abertas: é uma forma mais formal de obrigação por regra ('Candidates are required to submit a portfolio'), a conferir no dicionário."
          ],
          tabela: {
            cab: ["Forma", "Significado", "Exemplo de trabalho"],
            linhas: [
              ["must", "obrigação forte", "We must fix this before the audit."],
              ["have to", "obrigação externa", "I have to submit the report by Friday."],
              ["need to", "necessidade para um objetivo", "We need to add tests before the release."],
              ["mustn't", "proibido", "You mustn't share customer data."],
              ["don't have to", "não é obrigatório", "You don't have to attend the optional meeting."],
              ["be required to", "obrigação formal por regra", "Candidates are required to submit a portfolio."]
            ]
          },
          armadilha: "Armadilha de brasileiro: achar que 'You mustn't come' quer dizer 'você não precisa vir'. Quer dizer 'é proibido você vir'. Para 'não precisa', use don't have to.",
          fonte: ["British Council LearnEnglish: Modals: permission and obligation", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-permission-obligation"]
        },
        {
          t: "Como recusar sem fechar a porta",
          facil: "Traduzindo: não diga só 'no': reconheça o pedido, dê um motivo curto e ofereça uma alternativa.",
          p: [
            "A lição de falar B1 do British Council (Asking a favour) mostra respostas que recusam sem bater a porta: 'I'm not really sure if I can.' (hesitação) e 'I would if I could, but I can't.' (recusa com motivo). A lição da ligação do cliente mostra 'I'm not sure if I can do that' e 'Let me see what I can do', que ganham tempo.",
            "Fórmula de três passos, adaptada dessas frases: (1) reconhecer, 'I understand why this matters'; (2) dar o motivo curto, 'but we don't have the capacity this sprint'; (3) abrir alternativa, 'Could we do it next sprint, or start with a smaller scope?' A porta fica encostada: a outra parte sabe que o não é sobre a situação, não sobre ela."
          ],
          lista: [
            "I'd love to help, but we can't take this on this sprint. Could we look at it next month?",
            "I'm afraid I can't agree to that deadline, but I could deliver a first version by Friday.",
            "I'm not sure I can commit to that. Let me check with my team and get back to you tomorrow.",
            "That's a bit outside what we can do. What if we reduced the scope?"
          ],
          dica: "Em oferta de salário, uma forma educada de não aceitar ainda: 'Thank you for the offer. I'd like to take a couple of days to consider it.'",
          fonte: ["British Council LearnEnglish: Asking a favour (B1 speaking)", "https://learnenglish.britishcouncil.org/free-resources/speaking/b1/asking-favour"]
        }
      ],
      exemplo: {
        t: "Contraproposta de salário sem tensão",
        texto: "Depois de uma entrevista final, a empresa oferece um salário abaixo do esperado por Júlia. Ela responde: 'Thank you for the offer, I'm really excited about the role. I was wondering if there is some flexibility on the base salary. If you could bring it closer to the market range, I would be happy to accept right away. I understand that budgets are tight, so I'm also open to talking about other benefits. Would it be possible to discuss a review after six months?' Repare no que ela faz: agradece, usa 'I was wondering if' para suavizar, faz uma oferta condicional com second conditional, mostra flexibilidade e faz um pedido final com 'Would it be possible'. Nenhuma frase fecha a porta, e cada uma deixa claro o que ela quer.",
      },
      prova: [
        "Negociação: você faz uma contraproposta com 'If you could..., I would be able to...' sem prometer demais.",
        "Reunião: você pede mais prazo com 'Would it be possible to extend the deadline?' em vez de 'I need more time'.",
        "Entrevista: você diferencia 'We don't have to use that tool' de 'We mustn't use that tool'.",
        "Pedido de escopo: você recusa com motivo e alternativa ('We can't take this on this sprint, but we could start with a smaller scope')."
      ],
      explique: "Explique com as suas palavras como o passado e o would deixam um pedido mais educado, por que mustn't e don't have to têm significados diferentes e como você faria uma contraproposta de salário.",
      checagem: [
        "Qual a diferença de tom entre 'Can you...' e 'Would you mind...'?",
        "Qual é a estrutura do second conditional e por que ela serve para negociar?",
        "O que significa 'You don't have to' e o que significa 'You mustn't'?",
        "Quais são os três passos para recusar sem fechar a porta?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: Requests, offers and invitations", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/requests-offers-invitations"],
      ["British Council LearnEnglish: 'will' and 'would'", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/will-would"],
      ["British Council LearnEnglish: Conditionals: zero, first and second", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second"],
      ["British Council LearnEnglish: Modals: permission and obligation", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-permission-obligation"],
      ["British Council LearnEnglish: Suggestions and obligations", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/suggestions-obligations"],
      ["British Council LearnEnglish: A phone call from a customer (B1 listening)", "https://learnenglish.britishcouncil.org/skills/listening/b1-listening/phone-call-customer"],
      ["British Council LearnEnglish: Asking a favour (B1 speaking)", "https://learnenglish.britishcouncil.org/free-resources/speaking/b1/asking-favour"],
      ["British Council LearnEnglish: Negotiating (business magazine)", "https://learnenglish.britishcouncil.org/free-resources/business/business/magazine/negotiating"]
    ],
    cartoes: [
      { id: "g11c1", f: "Suavize: 'I want a salary review.' (pedido ao gestor)", v: "I was wondering if we could talk about a salary review. O passado e o if deixam o pedido mais delicado.", t: "g11" },
      { id: "g11c2", f: "Corrija: 'Would you mind to review my draft?'", v: "Would you mind reviewing my draft? Would you mind + -ing.", t: "g11" },
      { id: "g11c3", f: "Peça mais prazo de forma educada.", v: "Would it be possible to extend the deadline by two days? Would it be possible to + verbo base.", t: "g11" },
      { id: "g11c4", f: "Complete: 'If you ___ (offer) remote work, I would accept.'", v: "offered (ou could offer). Second conditional: if + passado, would + base.", t: "g11" },
      { id: "g11c5", f: "Corrija: 'If I will get the offer, I would accept.'", v: "If I got the offer, I would accept. No second conditional o if leva passado, não will.", t: "g11" },
      { id: "g11c6", f: "Diga: 'Você não precisa vir à reunião opcional.'", v: "You don't have to come to the optional meeting. Don't have to = não é obrigatório.", t: "g11" },
      { id: "g11c7", f: "Diga: 'É proibido compartilhar dados de clientes.'", v: "You mustn't share customer data. Mustn't = proibido.", t: "g11" },
      { id: "g11c8", f: "Qual a diferença entre 'must' e 'have to' segundo o British Council?", v: "Must costuma vir do falante ou de quem escreveu a regra; have to mostra obrigação vinda de fora (regra, chefe).", t: "g11" },
      { id: "g11c9", f: "Como ganhar tempo numa negociação sem dizer sim nem não?", v: "Let me see what I can do. (frase do British Council); depois volte com resposta.", t: "g11" },
      { id: "g11c10", f: "Faça uma contraproposta de salário em uma frase.", v: "If you could bring the base salary closer to the market range, I would be happy to accept. Condicional + ganho.", t: "g11" },
      { id: "g11c11", f: "Recuse um pedido de escopo sem fechar a porta.", v: "I'd love to help, but we can't take this on this sprint. Could we look at it next month? Reconhece, motivo, alternativa.", t: "g11" },
      { id: "g11c12", f: "Corrija: 'I want to know if you can send the contract.' (tom seco)", v: "Could you send me the contract, please? ou I was wondering if you could send it. Prefira could ou would a want.", t: "g11" },
      { id: "g11c13", f: "Qual a diferença entre 'can you' e 'could you' em tom?", v: "Could you é mais educado; can you é mais direto, segundo o British Council.", t: "g11" }
    ],
    questoes: [
      {
        id: "g11q1", s: 4, t: "g11",
        e: "You want to ask your manager, politely and tentatively, for a meeting about your promotion. Which sentence is the most appropriate?",
        o: [
          "I was wondering if we could schedule a meeting to talk about my promotion.",
          "I want a meeting about my promotion now.",
          "You must talk to me about my promotion.",
          "Give me a meeting about my promotion."
        ],
        c: [0],
        x: "O passado e o if suavizam o pedido, na mesma lógica da página do British Council que diz que os tempos passados são mais educados, e 'could' deixa o pedido ainda mais aberto. As outras três versões soam como ordem ou exigência: I want, must e a forma imperativa, que fecham o espaço da resposta e não combinam com um pedido a um gestor."
      },
      {
        id: "g11q2", s: 4, t: "g11",
        e: "A colleague asks you to review a long document today. You want to ask the same favour of someone else. Which sentence is correct and polite?",
        o: [
          "Would you mind reviewing this document today?",
          "Would you mind to review this document today?",
          "Would you mind review this document today?",
          "Would you mind of reviewing this document today?"
        ],
        c: [0],
        x: "A página do British Council sobre will e would diz que would you mind vem seguido de -ing: 'Would you mind carrying this?'. As versões com to review e review erram a forma do verbo, e a com of reviewing acrescenta uma preposição que não existe nessa estrutura."
      },
      {
        id: "g11q3", s: 4, t: "g11",
        e: "Find the error. A candidate writes: 'If you will offer a higher salary, I would accept immediately.' Which correction is grammatical?",
        o: [
          "If you offered a higher salary, I would accept immediately.",
          "If you will offer a higher salary, I accept immediately.",
          "If you would offer a higher salary, I will accept immediately.",
          "If you offer a higher salary, I would accepted immediately."
        ],
        c: [0],
        x: "O second conditional é if mais passado simples e would mais base, segundo a página de condicionais do British Council, e cabe para oferta hipotética. As outras versões misturam will no if, mantêm um presente solto no resultado, ou pioram a estrutura com would accepted, que usa o passado depois de would."
      },
      {
        id: "g11q4", s: 4, t: "g11",
        e: "Your manager says: 'You mustn't join the client call.' How should you understand this sentence?",
        o: [
          "You are not allowed to join the client call.",
          "You do not need to join the client call, but you may.",
          "You should join the client call if you want.",
          "You have to join the client call."
        ],
        c: [0],
        x: "Mustn't indica proibição, e a página do British Council diz que ele mostra que algo é proibido, usado em especial quando a proibição vem do falante. A leitura de 'não precisa mas pode' descreve don't have to, a de 'pode se quiser' é uma permissão, e a de 'tem que entrar' é o contrário do que foi dito."
      },
      {
        id: "g11q5", s: 4, t: "g11",
        e: "A colleague tells you the optional training session is not compulsory. Choose the two sentences that express the same idea. (Choose two.)",
        o: [
          "You don't have to attend the training session.",
          "You don't need to attend the training session.",
          "You mustn't attend the training session.",
          "You must not to attend the training session."
        ],
        c: [0, 1],
        x: "Don't have to e don't need to dizem que não há obrigação, como a página do British Council mostra em 'You don't have to come with me, honestly'; need to é alternativa comum a have to (a equipe do British Council diz que os dois costumam ser intercambiáveis). As versões com mustn't e must not to dizem que é proibido ou erram a forma (must não leva to), e por isso trocam o sentido para proibição."
      },
      {
        id: "g11q6", s: 4, t: "g11",
        e: "In a negotiation, the other party asks for a one-week extension. You cannot answer yet, but you want to keep the conversation open. Which reply is best?",
        o: [
          "Let me see what I can do, and I'll get back to you tomorrow.",
          "No. Impossible.",
          "I have decided that the deadline is the deadline.",
          "That is your problem, not mine."
        ],
        c: [0],
        x: "Let me see what I can do é uma frase da lição de escuta B1 do British Council que ganha tempo sem fechar a porta, e o prazo para voltar dá segurança à outra parte. As outras respostas encerram a conversa com recusa seca, rigidez ou agressividade, o oposto de uma negociação colaborativa."
      },
      {
        id: "g11q7", s: 4, t: "g11",
        e: "You received a job offer but want some days to think. Which sentence is the most professional and natural?",
        o: [
          "Thank you for the offer. I'd like to take a couple of days to consider it.",
          "I want a couple of days to think about it.",
          "Wait. I need to decide, so you must wait.",
          "Maybe I accept, maybe not, who knows."
        ],
        c: [0],
        x: "A frase certa agradece e usa I'd like to, que a página do British Council mostra como forma educada de dizer o que se quer. As outras soam como ordem (I want, you must wait) ou como indecisão sem profissionalismo, e não preservam a relação com a empresa."
      },
      {
        id: "g11q8", s: 4, t: "g11",
        e: "You need to refuse an extra task but keep a good relationship. Which reply follows the pattern recognise, reason and alternative?",
        o: [
          "I'd love to help, but we can't take this on this sprint. Could we look at it next month?",
          "No, I can't. It's not my job.",
          "I would if I could, and that's final.",
          "We will never accept this task."
        ],
        c: [0],
        x: "A frase certa reconhece o pedido (I'd love to help), dá um motivo curto (this sprint) e oferece uma alternativa (next month), como na fórmula adaptada das frases do British Council. As outras só recusam, ou recusam de forma definitiva, e assim fecham a porta sem oferecer caminho."
      },
      {
        id: "g11q9", s: 4, t: "g11",
        e: "You are asked about a rule in your company: all invoices must be approved by the finance team. Which sentence correctly expresses an obligation that comes from the company?",
        o: [
          "We have to get every invoice approved by the finance team.",
          "We mustn't get every invoice approved by finance.",
          "We don't have to get every invoice approved by finance.",
          "We can not have to get invoices approved."
        ],
        c: [0],
        x: "Have to mostra obrigação vinda de fora, como uma regra da empresa, segundo a página do British Council. Mustn't mudaria o sentido para proibido, don't have to diria que não é necessário, e a última forma mistura can e have to de um jeito que não existe em inglês."
      },
      {
        id: "g11q10", s: 4, t: "g11",
        e: "C1 level. Choose the most diplomatic way to propose a different salary while signalling flexibility.",
        o: [
          "If you could bring the base salary closer to the market range, I would be happy to accept straight away.",
          "If you will give more money, I accept.",
          "Your salary is too low and I want more.",
          "I must have a higher salary or I leave."
        ],
        c: [0],
        x: "A primeira resposta é um second conditional (if mais passado, would mais base), que a página do British Council descreve para situações hipotéticas, e mostra o ganho da outra parte. As outras usam will no if, fazem uma afirmação seca de insatisfação ou um ultimato com must, e perdem a abertura que uma negociação colaborativa pede."
      },
      {
        id: "g11q11", s: 4, t: "g11",
        e: "C1 level. Choose the two sentences that form a correct polite request or counteroffer. (Choose two.)",
        o: [
          "Would it be possible to move the deadline to next Friday?",
          "If we extended the scope, we would need two more weeks.",
          "Would it be possible moving the deadline to next Friday?",
          "If we will extend the scope, we would need two more weeks."
        ],
        c: [0, 1],
        x: "Would it be possible to mais verbo base é um molde de pedido educado, e if mais passado com would mais base é o second conditional da página do British Council, bom para condicionar uma troca. A versão com moving usa o -ing depois de possible to, e a com will no if mistura o futuro do first conditional com would, quebrando a estrutura."
      },
      {
        id: "g11q12", s: 4, t: "g11",
        e: "C1 level. A recruiter says the start date is fixed, but you need two more weeks. Which reply is the most natural and keeps the door open?",
        o: [
          "I understand the start date is important. Would it be possible to start two weeks later if I wrapped up my current projects?",
          "I understand the start date is important, but I will start whenever I want.",
          "The start date doesn't work. I must have two more weeks.",
          "I can't start on that date, never, forget it."
        ],
        c: [0],
        x: "A primeira resposta reconhece o interesse da empresa, usa Would it be possible to e oferece uma troca em forma de second conditional (if I wrapped up), mostrando colaboração. As outras ignoram a restrição, usam exigência com must ou recusam de forma definitiva, sem oferecer caminho."
      }
    ],
    lab: {
      t: "Treino de fala: negociar um pedido, uma contraproposta e uma recusa",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Em negociação real o tom pesa tanto quanto a gramática; gravar deixa você ouvir se soou educada e firme ao mesmo tempo.",
      antes: "Ter lido a aula e escolhido três situações: pedir algo (prazo, recurso ou revisão salarial), fazer uma contraproposta e recusar uma demanda. Tenha à mão a lista de moldes: I was wondering if, Would it be possible to, If you could..., I would be able to..., I'd love to help, but... Nada aqui foi executado por quem escreveu a aula.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote quatro palavras: o pedido, o que você oferece em troca, o limite que você não passa e a alternativa." },
        { t: "Gravar o pedido e a contraproposta (3 minutos)", p: "Faça um pedido com 'I was wondering if...' e uma contraproposta com 'If you could..., I would be able to...'." },
        { t: "Gravar a recusa (2 minutos)", p: "Recuse uma demanda com os três passos: reconhecer, motivo curto, alternativa. Use 'We can't... but we could...'." },
        { t: "Ouvir contando erros", p: "Ouça e conte: pedido seco com want ou must, will no if do second conditional, would you mind com to, mustn't no lugar de don't have to." },
        { t: "Regravar", p: "Regrave só as partes com erro, corrigindo, e compare o tom: soa firme e educada ao mesmo tempo?" }
      ],
      verificar: "Você gravou pedido, contraproposta e recusa, contou os erros e a segunda gravação tem menos erros. Há pelo menos um 'I was wondering if', um second conditional correto, um don't have to ou mustn't no sentido certo e uma recusa com alternativa.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Guarde só a folha com as suas frases-modelo de pedido, contraproposta e recusa para a próxima negociação."
      ],
      erros: [
        { s: "Minha recusa soa seca mesmo com 'sorry'", c: "Faltou a alternativa depois do motivo.", r: "Sempre termine a recusa com uma pergunta: 'Could we look at it next month?' ou 'What if we reduced the scope?'." },
        { s: "Me perco no second conditional", c: "Está misturando will e would na mesma frase.", r: "Decore o molde: if + passado, would + base. Treine três frases com 'If you could..., I would be able to...' em voz alta." },
        { s: "Soo agressiva sem querer", c: "Usou want, must ou need sem suavizador.", r: "Troque por I'd like to, could you ou I was wondering if, e releia a gravação procurando I want e must." }
      ]
    }
  };

  /* ===================== AULA 12 ===================== */
  C.dias[12] = {
    aula: {
      titulo: "Gerúndio x infinitivo e revisão dos erros mais comuns de quem fala português",
      resumo: "Quando usar -ing e quando usar to + verbo (enjoy doing, decide to do, stop doing x stop to do, look forward to + -ing, used to x be used to), os false friends de trabalho (actually, eventually, pretend, attend, push, realize, resume, support, college, library) e a revisão dos erros clássicos: I am agree, explain me, people is, make x do e o -s da terceira pessoa. Aula final: serve de revisão geral da trilha.",
      simples: {
        analogia: "Imagine duas ferramentas na caixa: o martelo (-ing) e a chave de fenda (to + verbo). Cada verbo em inglês já nasce 'casado' com uma delas. Enjoy só trabalha com o martelo: enjoy working. Decide só trabalha com a chave de fenda: decide to move. Se você troca, a peça não encaixa, e quem ouve percebe. Alguns verbos, como stop, aceitam as duas ferramentas, mas o trabalho muda completamente: stop working é parar de trabalhar, stop to work é parar o que estava fazendo para trabalhar. Os false friends são como etiquetas trocadas nas gavetas: a gaveta se chama 'actually', e você acha que lá dentro está 'atualmente', mas lá dentro está 'na verdade'. Abrir a gaveta certa evita mal-entendido em entrevista.",
        pontos: [
          "Cada verbo escolhe -ing (enjoy, avoid, finish) ou to + verbo (decide, hope, plan).",
          "Stop doing é parar de fazer; stop to do é parar para fazer outra coisa.",
          "Depois de preposição vem -ing, inclusive em look forward to hearing from you.",
          "Used to + verbo é hábito do passado; be used to + -ing é estar acostumado.",
          "Cuidado com false friends: actually quer dizer na verdade, não atualmente."
        ],
        paraQueServe: "Fechar a trilha com uma checagem dos erros que mais denunciam o 'pensar em português' em entrevistas, e-mails e reuniões, para falar com mais segurança."
      },
      glossario: [
        { t: "Gerund (-ing form)", d: "Forma do verbo com -ing usada como substantivo ou depois de certos verbos e preposições: enjoy working." },
        { t: "To-infinitive", d: "Verbo base precedido de to, usado depois de verbos como decide, hope, plan." },
        { t: "Bare infinitive", d: "Verbo base sem to, usado depois de make e let: make him pay." },
        { t: "False friend", d: "Palavra que parece com uma do português mas tem outro sentido, como actually." },
        { t: "Dependent preposition", d: "Preposição presa a um verbo ou expressão, como look forward to." },
        { t: "Third person -s", d: "O -s do verbo no presente com he, she e it: she works, it runs." },
        { t: "Transitive verb", d: "Verbo que leva objeto direto; em inglês, discuss e explain são exemplos do dia a dia." },
        { t: "Countable plural", d: "Substantivo plural contável que pede verbo no plural, como people are." }
      ],
      blocos: [
        {
          t: "Quem pede -ing e quem pede to + verbo",
          facil: "Traduzindo: cada verbo escolhe sua forma; enjoy, avoid, finish pedem -ing; decide, hope, plan, agree pedem to + verbo.",
          p: [
            "A página do British Council sobre verbos seguidos de -ing ou infinitivo lista os verbos que pedem -ing: enjoy, admit, mind, avoid, consider, dislike, finish, give up, miss, practise, suggest, mais as expressões can't help e feel like. Exemplos: 'She enjoys cooking for her friends.' e 'I don't mind waiting.' Pedem to + verbo: want, learn, offer, afford, agree, ask, choose, decide, expect, hope, plan, prepare, promise e refuse, e would like. Exemplos: 'They decided to move to Spain.' e 'She offered to help us.'",
            "No trabalho: 'I enjoy working with data', 'We decided to migrate to the cloud', 'I suggest checking the logs first', 'We hope to finish by Friday'. A página diz ainda que like e love aceitam as duas formas, sem muita diferença de sentido."
          ],
          tabela: {
            cab: ["Padrão", "Verbos", "Exemplo de trabalho"],
            linhas: [
              ["verbo + -ing", "enjoy, avoid, finish, consider, suggest, mind", "I avoid changing production on Fridays."],
              ["verbo + to + base", "decide, hope, plan, agree, offer, refuse", "We plan to release next week."],
              ["aceita as duas", "like, love", "I like working remotely. / I like to work early."]
            ]
          },
          armadilha: "Erro comum de falantes de português: 'I enjoy to work' ou 'I decided moving'. Em inglês não há regra simples; decore o verbo com a sua forma.",
          fonte: ["British Council LearnEnglish: Verbs followed by '-ing' or infinitive", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/verbs-followed-ing-or-infinitive"]
        },
        {
          t: "Verbos que mudam de sentido: stop, remember, forget, try",
          facil: "Traduzindo: com -ing o verbo fala de algo que aconteceu ou de uma experiência; com to + verbo fala de uma tarefa ou de um propósito.",
          p: [
            "A página do British Council sobre verbos que mudam de sentido diz: stop + -ing quer dizer que uma atividade termina ('She stopped eating meat last year'); stop + to + infinitivo quer dizer que alguém para uma atividade para fazer outra ('We stopped to buy some water'). Remember e forget + -ing falam de uma memória de uma ação passada ('I remember visiting Rome as a child'); com to + infinitivo falam de uma tarefa ('Remember to call your mum', 'He forgot to pay the bill'). Try + -ing é experimentar ('Try restarting the router'); try + to + infinitivo é fazer esforço ('I tried to open the window, but it was stuck').",
            "Na rotina de dados: 'We stopped running the job manually' (paramos de fazer), 'We stopped to check the logs' (paramos para checar), 'Remember to commit your changes' (tarefa), 'I remember fixing that bug last year' (lembrança) e 'Try restarting the pipeline' (experimentar)."
          ],
          tabela: {
            cab: ["Verbo", "+ -ing", "+ to + verbo"],
            linhas: [
              ["stop", "parar de fazer: stopped running the job", "parar para fazer: stopped to check the logs"],
              ["remember", "lembrar de algo passado: remember fixing it", "lembrar de fazer: remember to commit"],
              ["forget", "esquecer algo passado: never forget meeting you", "esquecer de fazer: forgot to pay the bill"],
              ["try", "experimentar: try restarting it", "esforçar-se: tried to open the window"]
            ]
          },
          dica: "Teste mental: -ing olha para trás ou para a atividade em si; to olha para frente, para a tarefa ou o propósito.",
          fonte: ["British Council LearnEnglish: Verbs followed by '-ing' or infinitive to change meaning", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-followed-ing-or-infinitive-change-meaning"]
        },
        {
          t: "Look forward to + -ing: o 'to' que é preposição",
          facil: "Traduzindo: em look forward to, o to é preposição, então o verbo depois fica no -ing: I look forward to hearing from you.",
          p: [
            "A página do British Council sobre as formas -ing diz que o -ing pode ser objeto de uma preposição ('Some people are not interested in learning English') e que, em 'I look forward to hearing from you', o to é uma preposição e não parte de um infinitivo; por isso o verbo seguinte fica no -ing. A página contrasta com 'I want to hear from you', em que o to marca o infinitivo.",
            "Frases de e-mail de carreira: 'I look forward to hearing from you', 'We are looking forward to working with you' e 'I'm looking forward to discussing the next steps'. A mesma lógica vale para outras expressões com to preposição: object to e confess to aparecem na página C1 de padrões com verbos, com -ing em seguida."
          ],
          lista: [
            "I look forward to hearing from you.",
            "We look forward to working with your team.",
            "She objected to changing the deadline."
          ],
          armadilha: "Erro comum de falantes de português: 'I look forward to hear from you', porque 'esperar ouvir' em português usa infinitivo. Em inglês, depois da preposição to, use -ing.",
          fonte: ["British Council LearnEnglish: '-ing' forms", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/ing-forms"]
        },
        {
          t: "Used to, be used to e get used to",
          facil: "Traduzindo: used to + verbo é hábito do passado que acabou; be used to + -ing é estar acostumado; get used to + -ing é ir se acostumando.",
          p: [
            "A página do British Council sobre os usos de used to diz que used to + infinitivo descreve um hábito ou estado passado que não vale mais ('She used to be a long-distance runner when she was younger'); be used to + -ing quer dizer estar familiarizado ou à vontade ('She's used to the city now and doesn't get lost any more'); get used to + -ing descreve o processo de se acostumar ('I'm sure I'll get used to it soon'). Be used to e get used to podem ser seguidos de substantivo, pronome ou -ing.",
            "No trabalho: 'I used to work on-premise, but now I work in the cloud' (antes sim, agora não); 'I'm used to working across time zones' (estou acostumada); 'I'm getting used to the new tool' (estou me acostumando)."
          ],
          tabela: {
            cab: ["Estrutura", "Sentido", "Exemplo"],
            linhas: [
              ["used to + verbo", "hábito do passado que acabou", "I used to maintain the old ETL."],
              ["be used to + -ing", "estar acostumada", "I'm used to working with remote teams."],
              ["get used to + -ing", "ir se acostumando", "I'm getting used to using dbt."]
            ]
          },
          armadilha: "Armadilha de brasileiro: 'I'm used to work remotely' (sem -ing) e 'I use to work there' no passado. O passado é used to, sem o d de use.",
          fonte: ["British Council LearnEnglish: Different uses of 'used to'", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/different-uses-of-used-to"]
        },
        {
          t: "Make e let: o verbo vem sem to",
          facil: "Traduzindo: depois de make ou let + pessoa, o verbo fica na forma base, sem to: they made me stay, never made me to stay.",
          p: [
            "A página de referência do British Council sobre verbos seguidos de infinitivo diz que make e let usam o padrão verbo + objeto + infinitivo sem to. Exemplos da página: 'They made him pay for the things he had broken' e 'They let you go in free at the weekend.' Os verbos que pedem to + infinitivo incluem choose, decide, expect, hope, learn, plan, prefer, promise, refuse, try e manage.",
            "No trabalho: 'The error made us rerun the whole pipeline' (nunca 'made us to rerun'), 'The new tool lets us deploy faster' e 'My manager let me present the results'. Já want pede to: 'I want you to review this', e é um erro comum de falantes de português escrever 'I want that you review this' por influência de 'quero que você revise'."
          ],
          lista: [
            "The outage made us rethink our process.",
            "Please let me know if you need help.",
            "I want you to review the schema."
          ],
          armadilha: "Erro comum de falantes de português: 'It makes the code to run slowly' e 'I want that you review'. Use make + objeto + base e want + objeto + to + base.",
          fonte: ["British Council LearnEnglish: Verbs followed by the infinitive", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/verbs-followed-infinitive"]
        },
        {
          t: "False friends: o caso actually e o método para os outros",
          facil: "Traduzindo: actually quer dizer 'na verdade', não 'atualmente'; para qualquer palavra suspeita, veja o contexto e confira num dicionário de aprendizes.",
          p: [
            "O podcast do British Council (série 2, episódio 5) diz que actually é um false friend em português, espanhol e francês: em inglês significa 'in reality', dar a informação verdadeira, e não 'at the moment' nem 'nowadays'. Exemplos do episódio: 'Well, actually I was born in Spain, in Madrid' e 'Well no actually. I'm going to talk about Formula 1.'",
            "O episódio 7 da série 1 ensina o método: perceber o contexto, conferir no dicionário de aprendizes se continuar em dúvida e anotar o false friend numa página do caderno de vocabulário. Ele ainda avisa que false friends são perigosos, mesmo para falantes muito bons, em especial quando estão cansados. No trabalho: 'Actually, the data is correct' (na verdade) e, para atualmente, use currently: 'We are currently migrating to the cloud'."
          ],
          lista: [
            "Actually = na verdade: 'Actually, we shipped yesterday, not today.'",
            "Atualmente = currently ou at the moment: 'We currently use Airflow.'",
            "Método: contexto, dicionário de aprendizes, caderno de false friends."
          ],
          fonte: ["British Council LearnEnglish: Elementary Podcasts series 2, episode 5 (actually)", "https://learnenglish.britishcouncil.org/general-english/audio-series/podcasts/podcasts-series-2/episode-05"]
        },
        {
          t: "Mais false friends de trabalho: eventually, pretend, attend, push, realize, resume, support, college, library",
          facil: "Traduzindo: nove palavras que parecem português e dizem outra coisa; antes de usar em entrevista, confira cada uma no dicionário.",
          p: [
            "Conferência: o Oxford Learner's Dictionaries abriu e confirma eventually (no fim de um período ou de uma série de eventos), pretend (agir para fazer os outros acreditarem em algo falso), attend (estar presente num evento), resume (recomeçar ou continuar depois de uma interrupção), college (no Reino Unido, lugar de estudo depois da escola; nos EUA, curso superior), library (prédio com livros e também coleção armazenada em formato digital), realize (perceber; em sentido formal, também realizar um objetivo) e support (ajudar, apoiar, dar suporte). Cambridge, Merriam-Webster e Collins não abriram. Push e a ideia de biblioteca de código são uso comum de TI: confira no dicionário antes de usar em texto formal.",
            "Use a tabela como lista de revisão: leia a palavra inglesa, diga o sentido em voz alta e crie uma frase de trabalho sua. Na dúvida, o método do British Council vale: contexto, dicionário e caderno."
          ],
          tabela: {
            cab: ["Palavra em inglês", "Sentido usual em inglês", "Parece com (português)", "Frase de trabalho"],
            linhas: [
              ["eventually", "no fim, depois de um tempo", "eventualmente (às vezes)", "Eventually, we migrated all the jobs."],
              ["pretend", "fingir", "pretender (planejar)", "Don't pretend you understood. Ask."],
              ["attend", "comparecer a, assistir a (reunião)", "atender (um cliente, um telefone)", "I attended the planning meeting."],
              ["push", "empurrar, enviar para o repositório", "puxar (o contrário)", "Please push your changes."],
              ["realize", "perceber, dar-se conta (formal: também realizar um sonho)", "realizar (executar)", "I realized the schema was wrong."],
              ["resume", "retomar", "resumir (sintetizar)", "Let's resume after lunch."],
              ["support", "apoiar, dar suporte", "suportar (aguentar)", "Our team supports the data platform."],
              ["college", "faculdade ou curso superior (EUA); no Reino Unido, escola de formação pós-escolar", "colégio (escola)", "I studied computer science in college."],
              ["library", "biblioteca; também biblioteca de código", "livraria (loja)", "We use a Python library for validation."]
            ]
          },
          dica: "Pense assim: se a palavra parece fácil demais, desconfie e confira. As mais perigosas em entrevista são actually, eventually, pretend e realize.",
          armadilha: "Erro comum de falantes de português: dizer 'I will pretend to do it next week' querendo dizer 'pretendo fazer'. Para planos, use intend to ou plan to.",
          fonte: ["Oxford Learner's Dictionaries: college (UK x US)", "https://www.oxfordlearnersdictionaries.com/definition/english/college"]
        },
        {
          t: "Os erros clássicos: I am agree, explain me, people is, make x do e o -s",
          facil: "Traduzindo: cinco erros que denunciam o pensamento em português; cada um tem uma regra curta para corrigir.",
          p: [
            "I am agree: agree é verbo, sem to be. A página do British Council sobre verbos e preposições traz 'I agree with everything you've said', e 'agree on' para o assunto. Explain me: o verbo explain com pessoa pede to: 'Can you explain it to me?'. A página C1 de padrões com verbos de relato lista explain entre os verbos seguidos de that-clause e não mostra explain + pessoa, então a forma com to é regra comum de dicionário, a conferir. People is: people é plural e leva verbo no plural ('People are waiting'); é regra básica, a conferir no dicionário, pois não está nas páginas abertas.",
            "Make x do: já vista, sem to. Terceira pessoa -s: no presente com he, she e it, o verbo leva -s ('She works', 'It runs'); as páginas abertas não trazem esta regra, então é conhecimento básico a conferir. Frase de revisão: 'She agrees with me, people are waiting and he explains it to us.'"
          ],
          tabela: {
            cab: ["Erro", "Correção", "Regra em uma linha"],
            linhas: [
              ["I am agree", "I agree", "agree é verbo, sem to be"],
              ["Explain me the plan", "Explain the plan to me", "explain algo + to + pessoa"],
              ["People is waiting", "People are waiting", "people é plural"],
              ["It makes the job to fail", "It makes the job fail", "make + objeto + base, sem to"],
              ["She work remotely", "She works remotely", "he, she, it + verbo com -s"]
            ]
          },
          armadilha: "Erro comum de falantes de português: esquecer o -s da terceira pessoa quando a frase é longa ('The pipeline that failed yesterday need a fix'). Procure o sujeito principal e confira o -s.",
          fonte: ["British Council LearnEnglish: Verbs and prepositions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-prepositions"]
        },
        {
          t: "Revisão geral: checklist para antes de uma entrevista ou reunião",
          facil: "Traduzindo: uma lista curta para você passar os olhos antes de falar; revise também suas anotações das aulas anteriores da trilha.",
          p: [
            "Como esta é a aula final da trilha, use a lista abaixo como checagem rápida dos tópicos das aulas 9 a 12. Para os temas das aulas anteriores, releia as suas próprias anotações e a lista de erros que você mesma contou nos treinos de fala.",
            "Método simples de revisão: escolha duas linhas por dia, fale as frases em voz alta, grave e conte os erros. Quando um erro aparecer três vezes, ele vira o seu 'erro da semana' e merece um cartão só dele."
          ],
          lista: [
            "Preposições: depend on, responsible for, in charge of; by para prazo, until para duração contínua.",
            "Phrasal verbs: pronome no meio nos separáveis (set it up); run into é inseparável.",
            "Frases complexas: relativa com vírgulas sem that; despite + substantivo ou -ing; What I did was...",
            "Negociação: could e would para suavizar; second conditional; mustn't não é don't have to.",
            "Gerúndio x infinitivo: enjoy doing, decide to do, look forward to hearing, stop doing x stop to do.",
            "Erros clássicos: I agree (sem am), explain it to me, people are, make it run, she works."
          ],
          dica: "Revise com a gravação: um erro ouvido na própria voz fica na memória muito melhor do que um erro lido numa lista."
        }
      ],
      exemplo: {
        t: "E-mail de agradecimento após entrevista, sem escorregar",
        texto: "Depois da entrevista, Renata escreve: 'Thank you for taking the time to talk with me. I really enjoyed learning about your data platform, and I realized how much your team values quality. Actually, one thing I forgot to mention is that I used to maintain a similar pipeline, so I'm used to working with strict deadlines. If you could share the next steps, I would be happy to attend a second round at any time. I look forward to hearing from you.' Repare nos acertos: enjoyed learning (enjoy pede -ing), realized no sentido de perceber, actually no sentido de na verdade, forgot to mention (tarefa), used to e be used to no sentido certo, would no condicional, attend no sentido de comparecer e look forward to hearing com -ing depois da preposição.",
      },
      prova: [
        "Entrevista: você diz 'I look forward to hearing from you' e 'I enjoy working with data' sem erro de -ing.",
        "Reunião: você usa actually no sentido de na verdade e currently para dizer atualmente.",
        "E-mail: você escreve 'explain it to me', 'people are' e 'she works' sem errar a estrutura.",
        "Conversa: você diferencia 'I used to work remotely' de 'I'm used to working remotely'."
      ],
      explique: "Explique com as suas palavras a diferença entre stop doing e stop to do, entre used to e be used to, e escolha três false friends e dê uma frase de trabalho para cada um.",
      checagem: [
        "Por que look forward to leva -ing e não o verbo base?",
        "Qual a diferença de sentido entre 'I stopped working' e 'I stopped to work'?",
        "Quais false friends você mais corre risco de usar errado e como você os corrige?",
        "Quais dos erros clássicos desta aula você mais comete e qual regra curta o corrige?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: Verbs followed by '-ing' or infinitive", "https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/verbs-followed-ing-or-infinitive"],
      ["British Council LearnEnglish: Verbs followed by '-ing' or infinitive to change meaning", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-followed-ing-or-infinitive-change-meaning"],
      ["British Council LearnEnglish: '-ing' forms", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/ing-forms"],
      ["British Council LearnEnglish: Different uses of 'used to'", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/different-uses-of-used-to"],
      ["British Council LearnEnglish: Verbs followed by the infinitive", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/verbs-followed-infinitive"],
      ["British Council LearnEnglish: Elementary Podcasts series 2, episode 5 (actually)", "https://learnenglish.britishcouncil.org/general-english/audio-series/podcasts/podcasts-series-2/episode-05"],
      ["British Council LearnEnglish: Elementary Podcasts series 1, episode 7 (false friends)", "https://learnenglish.britishcouncil.org/general-english/audio-series/podcasts/podcasts-series-1/episode-07"],
      ["British Council LearnEnglish: Verbs and prepositions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-prepositions"],
      ["Oxford Learner's Dictionaries: college (UK x US)", "https://www.oxfordlearnersdictionaries.com/definition/english/college"]
    ],
    cartoes: [
      { id: "g12c1", f: "Corrija: 'I enjoy to work with data.'", v: "I enjoy working with data. Enjoy pede -ing (lista do British Council).", t: "g12" },
      { id: "g12c2", f: "Corrija: 'We decided moving to the cloud.'", v: "We decided to move to the cloud. Decide pede to + verbo.", t: "g12" },
      { id: "g12c3", f: "Qual a diferença entre 'stopped working' e 'stopped to work'?", v: "Stopped working = parou de trabalhar; stopped to work = parou algo para trabalhar.", t: "g12" },
      { id: "g12c4", f: "Corrija: 'I look forward to hear from you.'", v: "I look forward to hearing from you. O to é preposição, então -ing.", t: "g12" },
      { id: "g12c5", f: "Complete: 'I'm used to ___ (work) across time zones.'", v: "working. Be used to + -ing = estar acostumada.", t: "g12" },
      { id: "g12c6", f: "Qual a diferença entre 'I used to work on-premise' e 'I'm used to working on-premise'?", v: "Used to + base = hábito antigo que acabou; be used to + -ing = estou acostumada hoje.", t: "g12" },
      { id: "g12c7", f: "Corrija: 'The error made us to rerun the job.'", v: "The error made us rerun the job. Make + objeto + base, sem to.", t: "g12" },
      { id: "g12c8", f: "Como dizer 'Atualmente usamos Airflow'?", v: "We currently use Airflow. Actually quer dizer na verdade, não atualmente.", t: "g12" },
      { id: "g12c9", f: "Corrija: 'I am agree with your estimate.'", v: "I agree with your estimate. Agree é verbo; sem am.", t: "g12" },
      { id: "g12c10", f: "Corrija: 'Can you explain me the plan?'", v: "Can you explain the plan to me? Explain algo to alguém (regra comum, conferir no dicionário).", t: "g12" },
      { id: "g12c11", f: "Corrija: 'People is waiting in the meeting room.'", v: "People are waiting in the meeting room. People é plural.", t: "g12" },
      { id: "g12c12", f: "Corrija: 'She work on the data team.'", v: "She works on the data team. Terceira pessoa do singular leva -s no presente.", t: "g12" },
      { id: "g12c13", f: "Eu quis dizer 'pretendo mudar de empresa'. O que está errado em 'I pretend to change jobs'?", v: "Pretend = fingir. Para planejar use intend to ou plan to: I intend to change jobs.", t: "g12" },
      { id: "g12c14", f: "O que significa 'Let's resume the meeting after lunch'?", v: "Retomar a reunião. Resume = retomar; resumir é summarize.", t: "g12" }
    ],
    questoes: [
      {
        id: "g12q1", s: 4, t: "g12",
        e: "In an interview you are asked what you like about your job. Which sentence is grammatically correct and natural?",
        o: [
          "I enjoy working with large datasets.",
          "I enjoy to work with large datasets.",
          "I enjoy work with large datasets.",
          "I enjoy of working with large datasets."
        ],
        c: [0],
        x: "Enjoy pede a forma -ing do verbo seguinte, como na lista de verbos da página do British Council ('She enjoys cooking for her friends'). As versões com to work e com work sem -ing usam a forma errada, e a com of acrescenta uma preposição que enjoy não leva. É o tipo de erro que a pessoa percebe ao ouvir a própria gravação."
      },
      {
        id: "g12q2", s: 4, t: "g12",
        e: "At the end of a formal email to a recruiter you want to say you expect an answer. Which sentence is correct?",
        o: [
          "I look forward to hearing from you.",
          "I look forward to hear from you.",
          "I look forward hearing from you.",
          "I look forward to heard from you."
        ],
        c: [0],
        x: "Em look forward to, o to é uma preposição, e depois de preposição o verbo fica no -ing, como diz a página do British Council sobre formas -ing. A versão com to hear usa o infinitivo, a sem to apaga a preposição e a com heard usa o particípio, que também não cabe depois de preposição."
      },
      {
        id: "g12q3", s: 4, t: "g12",
        e: "You are tired after a long sprint and say: 'We stopped to check the logs.' What does this sentence mean?",
        o: [
          "We paused what we were doing in order to check the logs.",
          "We stopped checking the logs for good.",
          "We forgot to check the logs.",
          "We tried checking the logs."
        ],
        c: [0],
        x: "Stop + to + infinitivo indica parar uma atividade para fazer outra, como no exemplo do British Council 'We stopped to buy some water'. Parar de verificar para sempre seria stop checking, esquecer seria forgot to check e experimentar seria try checking. Cada verbo muda o sentido conforme a forma que o segue."
      },
      {
        id: "g12q4", s: 4, t: "g12",
        e: "A colleague says: 'I'm used to working across time zones.' Which sentence best describes what she means?",
        o: [
          "She is accustomed to working across time zones.",
          "She worked across time zones in the past but no longer does.",
          "She is slowly becoming accustomed to it, but is not there yet.",
          "She plans to work across time zones next year."
        ],
        c: [0],
        x: "Be used to + -ing significa estar familiarizada ou à vontade, segundo a página do British Council ('She's used to the city now'). Um hábito que acabou seria used to + verbo base, o processo de se acostumar seria get used to, e um plano seria plan to. A diferença entre as três estruturas é central nesta aula."
      },
      {
        id: "g12q5", s: 4, t: "g12",
        e: "You want to say that a bug forced the team to start again. Choose the two correct sentences. (Choose two.)",
        o: [
          "The bug made us rerun the whole pipeline.",
          "The bug made us restart the work.",
          "The bug made us to rerun the whole pipeline.",
          "The bug made that we rerun the whole pipeline."
        ],
        c: [0, 1],
        x: "Make + objeto + infinitivo sem to é o padrão da página de referência do British Council ('They made him pay for the things he had broken'). A versão com to rerun acrescenta um to que não cabe depois de make, e a com that we rerun usa uma construção de 'fazer com que' do português que não existe assim em inglês."
      },
      {
        id: "g12q6", s: 4, t: "g12",
        e: "Your British colleague asks: 'Do you work here at the moment?' You want to answer that you work in the cloud team nowadays. Which sentence uses the right word?",
        o: [
          "Currently, I work in the cloud team.",
          "Actually, I work in the cloud team (meaning nowadays).",
          "Eventually, I work in the cloud team (meaning nowadays).",
          "Pretendedly, I work in the cloud team."
        ],
        c: [0],
        x: "Currently é a palavra para atualmente. O British Council explica que actually quer dizer 'na verdade', não 'at the moment' nem 'nowadays', então é false friend; eventually significa 'no fim' e 'pretendedly' nem é uma palavra de uso comum. O Oxford Learner's Dictionaries confirma que eventually é 'no fim de um período ou de uma série de eventos'."
      },
      {
        id: "g12q7", s: 4, t: "g12",
        e: "Find the error. A candidate writes: 'I am agree with your suggestion.' Which correction is correct?",
        o: [
          "I agree with your suggestion.",
          "I am agreeing with your suggestion to.",
          "I am agree to your suggestion.",
          "I agree on of your suggestion."
        ],
        c: [0],
        x: "Agree é um verbo, então não leva to be: 'I agree with everything you've said' é o exemplo da página do British Council, com agree with para a pessoa ou a opinião. As outras versões mantêm am, trocam a preposição para to ou criam on of, que não existe."
      },
      {
        id: "g12q8", s: 4, t: "g12",
        e: "You want a colleague to explain a process to you. Which sentence is the most natural?",
        o: [
          "Could you explain the process to me?",
          "Could you explain me the process?",
          "Could you explain for me the process?",
          "Could you explaining the process to me?"
        ],
        c: [0],
        x: "Explain algo to alguém é a forma comum de dicionário, a conferir, porque as páginas abertas do British Council mostram explain com that-clause e não a estrutura com pessoa. A versão com explain me copia a ordem do português, a com for troca a preposição e a com explaining usa -ing depois de could, que pede verbo base."
      },
      {
        id: "g12q9", s: 4, t: "g12",
        e: "In a meeting you want to say that the attendees are waiting for the report. Choose the correct sentence with the subject 'people in the room'.",
        o: [
          "People in the room are waiting for the report.",
          "People in the room is waiting for the report.",
          "People in the room be waiting for the report.",
          "People in the room waits for the report."
        ],
        c: [0],
        x: "People é plural, e substantivo plural contável pede verbo no plural, regra básica do inglês (confira no dicionário). A versão com is trata people como singular, a com be não conjuga o verbo e a com waits coloca o -s da terceira pessoa do singular, que não cabe com sujeito plural."
      },
      {
        id: "g12q10", s: 4, t: "g12",
        e: "You are describing, in an interview, a past habit that has ended and no longer applies. Which sentence is correct?",
        o: [
          "I used to maintain the old ETL jobs.",
          "I use to maintain the old ETL jobs.",
          "I am used to maintain the old ETL jobs.",
          "I used to maintaining the old ETL jobs."
        ],
        c: [0],
        x: "Used to + infinitivo descreve um hábito passado que não vale mais, como no exemplo 'She used to be a long-distance runner' do British Council. A versão com use to perde o d do passado, a com am used to maintain mistura a estrutura de estar acostumado com o infinitivo, e a com used to maintaining usa -ing depois de used to de hábito, que pede verbo base."
      },
      {
        id: "g12q11", s: 4, t: "g12",
        e: "C1 level. Which sentence is correct and avoids false-friend traps in a work context?",
        o: [
          "I realized that the schema was wrong, so we resumed the migration after fixing it.",
          "I realized that the schema was wrong, so we resumed the report after fixing it, pretending to finish soon.",
          "I performed that the schema was wrong, so we summarized the migration after fixing it.",
          "I pretended to finish the migration, so we attended the report after fixing it."
        ],
        c: [0],
        x: "Realized no sentido de perceber e resumed no sentido de retomar são os usos usuais em inglês, como confirma o Oxford Learner's Dictionaries (realize = perceber; resume = recomeçar depois de interrupção). As outras versões trocam realize por perform (que seria realizar), usam resume como resumir, ou pretend como pretender, caindo nas armadilhas das palavras parecidas com o português."
      },
      {
        id: "g12q12", s: 4, t: "g12",
        e: "C1 level. In a cover letter about your work habits, choose the two sentences with correct verb patterns. (Choose two.)",
        o: [
          "She avoided changing the production schema on Fridays.",
          "We decided to postpone the launch.",
          "She avoided to change the production schema on Fridays.",
          "We decided postponing the launch."
        ],
        c: [0, 1],
        x: "Avoid pede -ing (a página do British Council lista avoid entre os verbos com -ing) e decide pede to + infinitivo (decide está entre os verbos com to). As versões com avoided to change e decided postponing trocam as formas, e são o tipo de erro que se resolve decorando o verbo junto com o seu padrão."
      }
    ],
    lab: {
      t: "Treino de fala: entrevista curta com -ing, to e os erros clássicos",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Esta é a revisão final: falar em voz alta mostra quais erros ainda escapam, e ouvir a própria voz transforma um erro difícil de ver em um erro fácil de notar.",
      antes: "Ter lido a aula inteira e ter à mão a tabela de erros clássicos e a lista de verbos com -ing e com to. Escolha duas perguntas de entrevista (por exemplo 'Tell me about your current job' e 'What are you looking for in your next role?'). Nada aqui foi executado por quem escreveu a aula.",
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Anote quatro palavras: um verbo com -ing (enjoy), um com to (decide), uma expressão com look forward to e um false friend (actually ou currently)." },
        { t: "Gravar a resposta (3 a 4 minutos)", p: "Responda às duas perguntas usando as quatro palavras-chave e pelo menos um used to ou be used to, e um make + objeto + base." },
        { t: "Ouvir contando erros", p: "Ouça e faça um traço para cada erro: -ing ou to errado, falta de -s, people is, I am agree, explain me, actually no sentido errado." },
        { t: "Regravar corrigindo", p: "Regrave a mesma resposta corrigindo apenas os erros contados e compare o número de erros." },
        { t: "Escolher o erro da semana", p: "Anote o erro que apareceu mais vezes, escreva uma frase certa com ele e repita em voz alta três vezes." }
      ],
      verificar: "Você gravou duas versões, contou os erros e a segunda tem menos. Você usou pelo menos um verbo com -ing, um com to, look forward to hearing e nenhum I am agree, explain me ou people is.",
      limpar: [
        "Apague gravações antigas se quiser; não envie a terceiros.",
        "Guarde só a folha com o seu erro da semana e as três frases certas para revisar no dia seguinte."
      ],
      erros: [
        { s: "Corrijo um erro e cometo outro", c: "Está tentando consertar tudo ao mesmo tempo.", r: "Na regravação, escolha um único alvo (por exemplo, o -s da terceira pessoa) e deixe os outros para outra rodada." },
        { s: "Não sei se uso -ing ou to", c: "Falta decorar o verbo com a forma que ele pede.", r: "Consulte a lista da aula, escreva três frases do seu dia a dia com cada verbo e fale em voz alta." },
        { s: "Fico com vergonha da minha voz", c: "É comum estranhar a própria gravação.", r: "Ouça uma vez só prestando atenção na estrutura, não no sotaque; o objetivo é contar erros de gramática." }
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
