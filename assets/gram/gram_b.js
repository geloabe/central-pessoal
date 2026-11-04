(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };

  /* Treino de fala (lab) padrão da trilha de gramática: o que muda de uma aula para outra é o cenário, a estrutura e os erros típicos. */
  function treino(o) {
    return {
      t: o.t,
      custo: "Grátis (gravador de voz do celular)",
      tempo: "10 a 15 min",
      porque: o.porque,
      antes: o.antes,
      passos: [
        { t: "Preparar 4 palavras-chave", p: "Escolha o cenário: " + o.cenario + " Anote só 4 palavras-chave num papel ou nas notas do celular (" + o.chaves + "). Nada de roteiro escrito frase por frase: o objetivo é produzir a estrutura na hora." },
        { t: "Gravar 5 a 6 minutos", p: "Abra o gravador, respire e fale em inglês, olhando só para as 4 palavras. " + o.gravar + " Se travar, diga em voz alta a primeira palavra da estrutura e continue; não pare a gravação para consertar." },
        { t: "Ouvir contando erros da estrutura", p: "Ouça tudo uma vez, sem corrigir, só com papel e caneta. Faça um traço para cada erro desta aula: " + o.erros_contar + " Não conte sotaque nem vocabulário: só a estrutura da aula." },
        { t: "Regravar com as correções", p: "Escolha os 3 erros mais frequentes, escreva a versão certa de cada um e grave de novo por 4 a 5 minutos, usando as versões corrigidas de propósito. Compare o número de traços das duas gravações." },
        { t: "Fechar com 3 frases-modelo", p: "Escreva 3 frases suas, corretas, que você pode reutilizar numa entrevista ou reunião real. Leia-as em voz alta uma vez e guarde-as nas notas." }
      ],
      verificar: o.verificar,
      limpar: [
        "Apague gravações antigas se quiser; guarde só a melhor versão se quiser ouvir de novo na semana seguinte.",
        "Não envie as gravações a terceiros: elas são só para o seu treino.",
        "Se usou nomes reais de clientes, empresas ou colegas no cenário, troque por nomes fictícios na próxima rodada."
      ],
      erros: o.errosLab.concat([
        { s: "Trava e fica em silêncio por muito tempo", c: "Tentar montar a frase inteira em português antes de falar.", r: "Comece com a palavra de abertura da estrutura (por exemplo, a conjunção ou o verbo auxiliar) e complete aos poucos; pausa curta é normal." },
        { s: "Na hora de ouvir, não consigo perceber os erros", c: "Ouvir de forma geral, em vez de procurar um padrão específico.", r: "Ouça uma vez só atrás de uma estrutura (por exemplo, só o verbo depois de if) e depois uma segunda vez atrás de outra." }
      ])
    };
  }

  /* ===================== AULA 5 ===================== */
  C.dias[5] = {
    aula: {
      titulo: "Condicionais para trade-offs e decisões técnicas",
      resumo: "Zero, first, second, third e condicionais mistas aplicadas a custo, risco e causa de falhas; unless, as long as, provided that e otherwise; e wish / if only para lamentar ou desejar mudança. Com o erro clássico de pôr will depois de if.",
      simples: {
        analogia: "Pense num mapa com bifurcações. A primeira condicional é a estrada que você realmente pode pegar amanhã: se chover, a gente adia o deploy. A segunda é uma estrada que só existe na imaginação, para comparar caminhos: se tivéssemos mais orçamento, escolheríamos streaming. A terceira é voltar no tempo e olhar a bifurcação que já passou: se tivéssemos validado o schema, o job não teria falhado. Cada tipo de condicional avisa o ouvinte, pelo tempo verbal, se a estrada é real, imaginária ou já ficou para trás. Em reunião e entrevista, escolher o tempo certo mostra que você sabe separar o que é plano, o que é hipótese e o que é lição aprendida.",
        pontos: [
          "Real e possível no futuro: if + presente, will + verbo (If the job fails, we'll rerun it).",
          "Hipótese irreal ou pouco provável: if + passado, would + verbo (If we used streaming, costs would rise).",
          "Passado que não aconteceu: if + past perfect, would have + particípio.",
          "Depois de if, não se usa will para futuro: If I have time (nunca If I will have time).",
          "Unless significa if not; as long as e provided that significam só se; otherwise significa senão.",
          "Wish / if only + passado fala do presente; wish / if only + past perfect fala do passado."
        ],
        paraQueServe: "Explicar trade-offs de arquitetura, justificar decisões e contar um incidente (o que deu errado e o que teria evitado) com precisão, em entrevista e reunião."
      },
      glossario: [
        { t: "Zero conditional", d: "If + presente, presente: fatos e regras gerais (If the schema changes, the job breaks)." },
        { t: "First conditional", d: "If + presente, will + verbo: situação real ou possível no futuro, com plano ou previsão." },
        { t: "Second conditional", d: "If + passado, would + verbo: situação imaginada, improvável ou irreal no presente ou futuro." },
        { t: "Third conditional", d: "If + past perfect, would have + particípio: imaginar um passado diferente e o resultado diferente." },
        { t: "Mixed conditional", d: "Mistura de tempos: passado que afeta o presente, ou presente que mudaria o passado." },
        { t: "Unless", d: "Significa if not (a menos que): I won't deploy unless the tests pass." },
        { t: "As long as / provided that", d: "Só se, desde que: condição que precisa ser cumprida; provided that soa mais formal." },
        { t: "Otherwise", d: "Senão, caso contrário: aponta a consequência de não cumprir a condição anterior." },
        { t: "Wish / if only", d: "Expressam desejo de que algo fosse diferente; if only costuma soar um pouco mais forte que wish." }
      ],
      blocos: [
        {
          t: "Zero e first: fatos e planos reais",
          facil: "Traduzindo: use zero para o que é sempre verdade e first para o que pode realmente acontecer e você já tem um plano.",
          p: [
            "A zero conditional usa presente nos dois lados e fala de fatos, regras e comportamento de sistemas. A página do British Council traz o modelo if ou when mais presente simples, depois presente simples. No trabalho de dados, serve para descrever como a ferramenta se comporta: If a column is renamed upstream, the downstream model fails.",
            "A first conditional usa if mais presente simples, depois will mais verbo. Ela fala de futuro real ou possível. A mesma página mostra o padrão com exemplos do dia a dia, e no trabalho ele vira plano de contingência: If the backfill takes more than two hours, we'll pause the dashboards.",
            "Importante: a página de verbos em cláusulas de tempo e de if diz que normalmente não usamos will nessas cláusulas. O will fica no resultado, e o if pede presente. Existe uma exceção: will pode aparecer depois de if quando significa querer ou estar disposto a (a página dá I will be very happy if you will come to my party), mas isso é raro e formal, então evite no começo."
          ],
          lista: [
            "Zero: If the job runs twice, it duplicates the rows.",
            "First: If the load fails tonight, I'll rerun it in the morning.",
            "First com when: I'll send the report when the pipeline finishes."
          ],
          armadilha: "Erro típico de falantes de português: If I will have time, I will check it. O correto é If I have time, I'll check it. Pense: o if já carrega a ideia de futuro, então o verbo fica no presente.",
          dica: "Se a ideia é plano, comece com if e presente. Guarde o will para o resultado.",
          fonte: ["British Council LearnEnglish: conditionals zero, first, second", "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second"]
        },
        {
          t: "Second conditional: comparar caminhos e trade-offs",
          facil: "Traduzindo: second é a conditional dos trade-offs, porque fala de cenários que você imagina e compara, sem dizer que eles vão acontecer.",
          p: [
            "A second conditional usa if mais passado simples, depois would mais verbo. A página do British Council a descreve como situação imaginada, improvável ou impossível no presente ou no futuro. O verbo está no passado, mas o tempo é presente ou futuro: o passado aqui marca distância da realidade.",
            "Em decisões técnicas ela é muito útil porque evita comprometer-se: If we moved to streaming, costs would rise, but latency would drop. Você apresenta duas consequências sem anunciar a decisão. Em entrevista, também serve para falar de escolhas que você faria: If I had more time on that project, I would add data contracts.",
            "Com o verbo be, a página explica que were é tradicionalmente correto para todas as pessoas (If I were you), mas was é comum, especialmente com he, she e it. Em fala, as duas formas aparecem; em texto formal, prefira were."
          ],
          tabela: {
            cab: ["Cenário", "Frase-modelo"],
            linhas: [
              ["Custo versus latência", "If we used streaming, costs would rise, but dashboards would update in seconds."],
              ["Equipe e prazo", "If we had two more engineers, we could migrate this quarter."],
              ["Conselho na reunião", "If I were you, I would start with the largest tables."],
              ["Entrevista (você mesma)", "If I joined your team, I would focus first on observability."]
            ]
          },
          armadilha: "Erro comum de falantes de português: If we would use streaming, costs would rise, com would nos dois lados. No lado do if, use passado simples: If we used streaming.",
          fonte: ["British Council LearnEnglish: conditionals zero, first, second", "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second"]
        },
        {
          t: "Third e mistas: contar o que deu errado",
          facil: "Traduzindo: third olha para trás e diz o que teria acontecido; mista liga um passado diferente a um resultado de hoje, ou o contrário.",
          p: [
            "A página do British Council define a third conditional como a forma de imaginar um passado diferente, com um resultado diferente: if mais past perfect, depois would have mais particípio. Exemplo do trabalho: If we had validated the schema, the job wouldn't have failed. Isso é perfeito para uma retrospectiva de incidente, porque a frase aponta a causa sem acusar ninguém.",
            "A mesma página apresenta dois tipos de condicional mista. No tipo passado para presente, a mudança no passado tem resultado hoje: if mais past perfect, would mais verbo: If we had chosen a partitioned table, queries would be cheaper now. No tipo presente para passado, um presente diferente teria mudado o passado: if mais passado simples, would have mais particípio: If our data volume were smaller, we wouldn't have needed a cluster.",
            "Para escolher sem se perder, faça duas perguntas rápidas. Primeira: a condição é sobre agora ou sobre antes? Segunda: o resultado é sobre agora ou sobre antes? Cada resposta define o tempo do lado correspondente."
          ],
          tabela: {
            cab: ["Condição", "Resultado", "Frase-modelo"],
            linhas: [
              ["Antes (past perfect)", "Antes (would have)", "If we had added alerts, we would have caught the delay."],
              ["Antes (past perfect)", "Agora (would)", "If we had documented the model, onboarding would be easier today."],
              ["Agora (passado simples)", "Antes (would have)", "If the SLA were stricter, we would have chosen a different design."]
            ]
          },
          dica: "Na retrospectiva, prefira a third para falar do processo (If we had...) e evite apontar pessoas.",
          fonte: ["British Council LearnEnglish: conditionals third and mixed", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed"]
        },
        {
          t: "Unless, as long as, provided that e otherwise",
          facil: "Traduzindo: são formas de dizer a condição de outro jeito: unless é se não, as long as e provided that são só se, otherwise é senão.",
          p: [
            "A página do British Council apresenta unless e as long as como alternativas a if na primeira condicional. Unless significa if not: I won't call unless I need help. As long as significa somente se: You can use the sandbox as long as you delete the tables afterwards. Depois dessas conjunções, o verbo também fica no presente, como depois de if.",
            "Provided that e otherwise não aparecem nas páginas que abri, então trate esta parte como uso comum que não consegui confirmar na fonte: provided that tem o sentido de desde que, num tom um pouco mais formal que as long as, e otherwise funciona como senão, com o resultado vindo na frase seguinte (We need approval by Friday. Otherwise, we'll miss the release).",
            "Em negociação, essas palavras deixam suas condições claras e educadas: I can take the on-call rotation, provided that it's included in my compensation. Uma regra prática é não misturar negação dupla com unless: evite unless we don't, porque unless já carrega o não."
          ],
          lista: [
            "Unless: We won't migrate unless the tests are green.",
            "As long as: It's fine to ship as long as the rollback plan is ready.",
            "Provided that: I can lead the project, provided that I have a clear budget.",
            "Otherwise: Please send the access request today. Otherwise, I can't start on Monday."
          ],
          armadilha: "Erro comum de falantes de português: unless we don't have approval, por causa do não que fica implícito. Diga unless we have approval, ou if we don't have approval.",
          fonte: ["British Council LearnEnglish: conditionals zero, first, second", "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second"]
        },
        {
          t: "Wish e if only: desejos sobre o presente e o passado",
          facil: "Traduzindo: wish e if only dizem eu queria que fosse diferente; o tempo verbal volta um passo para marcar que não é real.",
          p: [
            "A página do British Council explica que wish e if only expressam coisas que gostaríamos que fossem diferentes, e que if only costuma ser um pouco mais forte. Para o presente, use wish ou if only com passado simples: I wish we had more time. Para o passado, use past perfect: If only I'd asked about the SLA earlier.",
            "A mesma página mostra wish com would para falar de algo que irrita, quando a pessoa provavelmente não vai mudar: I wish the vendor wouldn't change the API without notice. Cuidado com o tom em reunião: é uma queixa, então reserve para contextos informais.",
            "Outra página do British Council, sobre tempo irreal, lembra que wish não é usado para futuro: para esperanças sobre o futuro use I hope. Em vez de I wish the deploy goes well, diga I hope the deploy goes well."
          ],
          dica: "Em entrevista, wish com passado simples soa natural para metas honestas: I wish I had more experience with Kafka, so I'm studying it now.",
          armadilha: "Erro comum de falantes de português: I wish I have more time, com presente. Use I wish I had more time, porque o presente irreal pede passado.",
          fonte: ["British Council LearnEnglish: wish and if only", "https://learnenglish.britishcouncil.org/en/intermediate-grammar/wish-and-if-only"]
        }
      ],
      exemplo: {
        t: "Retrospectiva de um pipeline que falhou",
        texto: "Na reunião de retrospectiva, a engenheira diz: If we had validated the schema before the load, the job wouldn't have failed last night. Depois, olhando para o custo, ela compara caminhos: If we moved this job to streaming, costs would rise, but the dashboard would update in seconds. Para decidir, ela fecha com uma condição: We can keep the batch design as long as the business accepts a one-hour delay. E avisa o plano real: If the check fails tomorrow, I'll pause the load and notify the owners. Repare nos quatro tempos em uma só fala: third para o passado, second para a hipótese, as long as para a condição e first para o plano. Em nenhum momento aparece will depois de if."
      },
      prova: [
        "Retrospectiva: você explica a causa de um incidente com if + past perfect, sem apontar culpados.",
        "Design review: você compara duas arquiteturas com a second conditional (If we used X, costs would rise).",
        "Negociação: você diz suas condições com as long as, provided that ou unless.",
        "Entrevista: você fala de um arrependimento profissional e do que aprendeu com wish e if only."
      ],
      explique: "Explique com as suas palavras a diferença entre first, second e third conditional, e diga como você escolheria entre elas para contar um incidente de pipeline.",
      checagem: [
        "Que tempo verbal vem depois de if em uma frase sobre o futuro real?",
        "Qual a diferença entre If we used streaming e If we had used streaming?",
        "Como você diria que um trabalho só acontece se os testes passarem, usando unless?",
        "Quando você usa wish com would, e que cuidado de tom isso exige?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: conditionals zero, first, second", "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-zero-first-second"],
      ["British Council LearnEnglish: conditionals third and mixed", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-third-mixed"],
      ["British Council LearnEnglish: wish and if only", "https://learnenglish.britishcouncil.org/en/intermediate-grammar/wish-and-if-only"],
      ["British Council LearnEnglish: verbs in time clauses and if clauses", "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/verbs-time-clauses-if-clauses"],
      ["British Council LearnEnglish: unreal time", "https://learnenglish.britishcouncil.org/free-resources/grammar/c1/unreal-time"]
    ],
    cartoes: [
      { id: "g5c1", f: "Corrija: If I will have time tomorrow, I will review the PR.", v: "If I have time tomorrow, I'll review the PR. Depois de if, use presente para futuro; will fica no resultado.", t: "g5" },
      { id: "g5c2", f: "Complete: If we ___ (use) streaming, costs ___ (rise).", v: "used / would rise. Second conditional: if + passado, would + verbo para hipótese.", t: "g5" },
      { id: "g5c3", f: "Diga em inglês: se tivéssemos validado o schema, o job não teria falhado.", v: "If we had validated the schema, the job wouldn't have failed. Third: if + past perfect, would have + particípio.", t: "g5" },
      { id: "g5c4", f: "Corrija: If we would have more budget, we would hire a data engineer.", v: "If we had more budget, we would hire a data engineer. Lado do if em second conditional: passado simples, sem would.", t: "g5" },
      { id: "g5c5", f: "Reescreva com unless: I won't deploy if the tests don't pass.", v: "I won't deploy unless the tests pass. Unless significa if not, então o verbo fica afirmativo.", t: "g5" },
      { id: "g5c6", f: "Complete com as long as ou unless: You can query the table ___ you don't change it.", v: "as long as. Quer dizer só se: você pode consultar desde que não altere.", t: "g5" },
      { id: "g5c7", f: "Qual é o tempo da zero conditional e quando usar?", v: "Presente nos dois lados: If the schema changes, the job breaks. Fatos e regras gerais.", t: "g5" },
      { id: "g5c8", f: "Escolha: If we had chosen a partitioned table, queries ___ cheaper now. (would be / would have been)", v: "would be. Mista passado-presente: a condição é do passado, mas o resultado vale para agora.", t: "g5" },
      { id: "g5c9", f: "Corrija: I wish I have more time to study Spark.", v: "I wish I had more time to study Spark. Wish + passado simples fala de um presente que você queria diferente.", t: "g5" },
      { id: "g5c10", f: "Diga em inglês, de forma educada: eu posso liderar o projeto, desde que tenha um orçamento claro.", v: "I can lead the project, provided that I have a clear budget. Provided that marca a condição de modo mais formal.", t: "g5" },
      { id: "g5c11", f: "Complete: We need approval by Friday. ___, we'll miss the release.", v: "Otherwise. Mostra a consequência de não cumprir a condição anterior.", t: "g5" },
      { id: "g5c12", f: "Corrija: I wish the deploy goes well tomorrow.", v: "I hope the deploy goes well tomorrow. Wish não serve para esperança sobre o futuro; use hope.", t: "g5" },
      { id: "g5c13", f: "Reformule para soar menos acusatório: Someone forgot the alert, so we missed the delay.", v: "If we had set up an alert, we would have caught the delay. Third conditional aponta o processo, não a pessoa.", t: "g5" }
    ],
    questoes: [
      {
        id: "g5q1", s: 2, t: "g5",
        e: "Na daily, você avisa o plano de contingência do carregamento de hoje à noite. Qual frase está correta e natural?",
        o: [
          "If the load will fail tonight, I rerun it in the morning.",
          "If the load fails tonight, I'll rerun it in the morning.",
          "If the load would fail tonight, I'll rerun it in the morning.",
          "If the load failed tonight, I'll rerun it in the morning."
        ],
        c: [1],
        x: "Em plano real para o futuro, a first conditional usa presente depois de if e will no resultado: If the load fails tonight, I'll rerun it in the morning. A versão com will depois de if repete o erro típico de transferir o futuro do português. A versão com would no lado do if mistura a estrutura hipotética com um plano real. A versão com passado depois de if e will no resultado mistura tempos e soa incoerente, como se a falha fosse imaginária e o plano real."
      },
      {
        id: "g5q2", s: 2, t: "g5",
        e: "Numa design review você compara streaming com batch, sem decidir ainda. Qual frase apresenta a hipótese com a second conditional?",
        o: [
          "If we would use streaming, costs would rise.",
          "If we use streaming, costs would rise.",
          "If we used streaming, costs would rise.",
          "If we have used streaming, costs will rise."
        ],
        c: [2],
        x: "Para um cenário imaginado, a second conditional usa passado simples depois de if e would no resultado: If we used streaming, costs would rise. Usar would também no lado do if é erro comum. Misturar presente depois de if com would no resultado não é a second conditional (trata a condição como real e o resultado como hipotético). A versão com have used e will rise mistura presente perfeito e futuro real, e muda o sentido para uma previsão concreta."
      },
      {
        id: "g5q3", s: 2, t: "g5",
        e: "Complete a frase da retrospectiva do incidente de ontem (uma falha específica, que já aconteceu): If we ___ the schema, the job ___ failed.",
        o: [
          "validated / wouldn't have",
          "had validated / wouldn't",
          "validated / wouldn't",
          "had validated / wouldn't have"
        ],
        c: [3],
        x: "O incidente já aconteceu, então a estrutura é a third conditional: if + past perfect e would have + particípio. Por isso a combinação had validated com wouldn't have está correta. Validated com wouldn't have seria uma mista presente-passado, que fala de uma situação geral e não de uma falha específica de ontem. Had validated com wouldn't deixa a frase sem o particípio failed no lugar certo (wouldn't failed não existe). Validated com wouldn't também gera wouldn't failed, que não existe."
      },
      {
        id: "g5q4", s: 2, t: "g5",
        e: "Escolha duas frases corretas para dizer que o deploy só vai acontecer se os testes passarem. (Escolha duas) Choose two.",
        o: [
          "We won't deploy unless the tests pass.",
          "We won't deploy unless the tests don't pass.",
          "We'll deploy as long as the tests pass.",
          "We'll deploy as long as the tests will pass."
        ],
        c: [0, 2],
        x: "Unless significa if not, então o verbo seguinte é afirmativo: We won't deploy unless the tests pass. As long as significa só se, e fica com presente: We'll deploy as long as the tests pass. A versão com unless e don't pass cria uma negação dupla e inverte o sentido. A versão com as long as e will pass repete o problema de usar will na cláusula de condição, que pede presente."
      },
      {
        id: "g5q5", s: 2, t: "g5",
        e: "Numa negociação de oferta, você quer aceitar o plantão desde que ele conste na remuneração. Qual frase soa mais natural e profissional?",
        o: [
          "I can take the on-call rotation, provided that it's included in my compensation.",
          "I can take the on-call rotation, unless it's included in my compensation.",
          "I can take the on-call rotation, otherwise it's included in my compensation.",
          "I can take the on-call rotation, if it will be included in my compensation."
        ],
        c: [0],
        x: "Provided that marca uma condição que precisa ser cumprida e soa profissional, ideal para negociar. Unless inverteria o sentido, porque diria que você aceita a menos que o plantão esteja incluído. Otherwise introduz a consequência de não cumprir algo, e aqui ficou sem sentido. Se com will be repete o erro de futuro depois de if, e soa menos firme do que a condição clara com presente."
      },
      {
        id: "g5q6", s: 2, t: "g5",
        e: "Nível C1. Você quer dizer que, se o volume de dados fosse menor (hoje não é), a equipe não teria precisado de um cluster (o que de fato aconteceu). Qual estrutura é a mais precisa?",
        o: [
          "If our data volume had been smaller, we wouldn't need a cluster.",
          "If our data volume were smaller, we wouldn't have needed a cluster.",
          "If our data volume is smaller, we wouldn't have needed a cluster.",
          "If our data volume would be smaller, we didn't need a cluster."
        ],
        c: [1],
        x: "É uma mista presente-passado: a condição descreve a situação de agora (volume menor) e o resultado olha para o passado (não ter precisado do cluster). Por isso passado simples (were) com would have + particípio. A versão com past perfect e wouldn't need fala de um resultado de hoje, não do que ocorreu. A versão com is smaller trata a condição como real, o que contradiz o cenário. A versão com would be e didn't need não tem estrutura condicional válida."
      },
      {
        id: "g5q7", s: 2, t: "g5",
        e: "Encontre o erro. Qual destas frases de entrevista contém um erro de condicional?",
        o: [
          "If I joined your team, I would start with data quality checks.",
          "If I had had more time on that project, I would have added alerts.",
          "If I have a question during the onboarding, I'll ask my manager.",
          "If I would have more experience with dbt, I would apply for the senior role."
        ],
        c: [3],
        x: "A frase com would no lado do if é a errada: If I would have more experience deveria ser If I had more experience, em second conditional. A frase com joined e would start está correta como hipótese. A frase com had had more time e would have added é uma third conditional correta para um projeto passado. A frase com have e I'll ask segue o padrão da first conditional, correta para um plano real."
      },
      {
        id: "g5q8", s: 2, t: "g5",
        e: "Você lamenta não ter perguntado sobre o SLA no início do projeto e quer expressar isso em uma frase única. Qual está correta?",
        o: [
          "I wish I asked about the SLA at the start.",
          "I wish I would ask about the SLA at the start.",
          "I wish I have asked about the SLA at the start.",
          "I wish I had asked about the SLA at the start."
        ],
        c: [3],
        x: "Para um arrependimento sobre o passado, wish pede past perfect: I wish I had asked. Passado simples depois de wish fala de um presente irreal, não de algo que ficou para trás. Wish com would serve para queixas sobre o comportamento de outra pessoa, não para um arrependimento próprio. A forma com have asked mistura presente perfeito com wish, que não segue o padrão de tempo irreal."
      },
      {
        id: "g5q9", s: 2, t: "g5",
        e: "Escolha duas frases corretas para uma postagem técnica sobre uma decisão passada. (Escolha duas) Choose two.",
        o: [
          "If we had added a data contract, the breaking change wouldn't have reached production.",
          "If we would have added a data contract, the breaking change wouldn't have reached production.",
          "If we had used a partitioned table, queries would be cheaper now.",
          "If we used a partitioned table, queries would have been cheaper now."
        ],
        c: [0, 2],
        x: "A primeira é uma third conditional completa: had added e wouldn't have reached. A terceira é mista passado-presente: had used para o passado e would be cheaper para o resultado de hoje. A versão com would have added no lado do if é erro comum de falantes de português. A versão com used e would have been cheaper now mistura passado simples com um resultado no passado e uma marca de tempo presente, o que desalinha o sentido."
      },
      {
        id: "g5q10", s: 2, t: "g5",
        e: "Nível C1. O vendor muda a API sem aviso, e você quer expressar irritação, sabendo que ele provavelmente não vai mudar. Qual frase combina estrutura e tom?",
        o: [
          "I wish the vendor wouldn't change the API without notice.",
          "I wish the vendor won't change the API without notice.",
          "I wish the vendor didn't have changed the API without notice.",
          "I wish the vendor doesn't change the API without notice."
        ],
        c: [0],
        x: "Wish com would e a forma negativa expressa irritação com o comportamento de outra pessoa, segundo a página do British Council: wouldn't change é a estrutura correta. Wish com won't mistura o futuro real com um desejo irreal. Didn't have changed combina auxiliar e verbo de forma que não existe. Wish com doesn't change usa presente depois de wish, que não é tempo irreal. Em reunião formal, pese o tom, porque a estrutura transmite queixa."
      },
      {
        id: "g5q11", s: 2, t: "g5",
        e: "Complete com a palavra mais adequada: Please send the access request today. ___, I can't start the migration on Monday.",
        o: [
          "Unless",
          "Otherwise",
          "As long as",
          "Provided that"
        ],
        c: [1],
        x: "Otherwise abre a consequência de não cumprir o pedido anterior e funciona como uma frase nova depois do ponto. Unless, as long as e provided that são conjunções que ligam uma condição à mesma frase, e não funcionam como início de uma frase independente com vírgula. Além disso, as long as e provided that diriam que a migração depende de algo cumprido, e o pedido já foi feito na frase anterior."
      },
      {
        id: "g5q12", s: 2, t: "g5",
        e: "Qual alternativa expressa melhor uma esperança sobre o resultado do deploy de amanhã, sem usar um desejo irreal?",
        o: [
          "I wish the deploy goes well tomorrow.",
          "I hope the deploy goes well tomorrow.",
          "I wish the deploy would have gone well tomorrow.",
          "I hope the deploy went well tomorrow."
        ],
        c: [1],
        x: "Para esperança sobre o futuro, o inglês usa hope, como a página de unreal time do British Council lembra. A versão com wish e goes mistura um verbo de desejo irreal com presente. A versão com would have gone fala de um passado imaginado, e a palavra tomorrow pede futuro. A versão com hope e went coloca o verbo no passado, que contradiz a marca de tempo de amanhã."
      }
    ],
    lab: treino({
      t: "Treino de fala: condicionais numa retrospectiva e numa decisão de arquitetura",
      porque: "Condicionais mudam de tempo em segundos; gravar e contar erros mostra se você está usando will depois de if ou would no lado do if sem perceber.",
      antes: "Releia os blocos desta aula e as frases-modelo, e escolha um incidente real ou inventado de pipeline (sem nomes de clientes). Tenha papel e caneta e um lugar silencioso. Este treino é uma sugestão de prática: nada aqui foi executado por quem escreveu a aula, e o resultado depende de você.",
      cenario: "você apresenta uma retrospectiva de incidente e compara duas arquiteturas (batch versus streaming).",
      chaves: "schema, streaming, custo, prazo",
      gravar: "Conte o que deu errado com a third conditional, compare custo e latência com a second, diga seu plano com a first e uma condição com unless ou as long as.",
      erros_contar: "will depois de if, would no lado do if, past perfect esquecido na third conditional, e wish com presente.",
      verificar: "Na segunda gravação você usa pelo menos uma frase de cada: first, second, third e uma com unless, as long as ou provided that, sem nenhum will depois de if. Você tem um número menor de traços do que na primeira.",
      errosLab: [
        { s: "Digo If I will... sem perceber", c: "O hábito de traduzir se eu tiver para um futuro em inglês.", r: "Antes de gravar, escreva três frases com If I have e leia em voz alta; na regravação, pare e diga só o presente depois de if." },
        { s: "Misturo second e third (If we would have...)", c: "Confusão entre hipótese de agora e passado que não ocorreu.", r: "Pergunte antes de falar: é sobre agora ou sobre antes? Agora pede passado simples; antes pede past perfect." }
      ]
    })
  };

  /* ===================== AULA 6 ===================== */
  C.dias[6] = {
    aula: {
      titulo: "Modais para recomendar, expressar certeza e suavizar",
      resumo: "Should, ought to e could para recomendar; must, can't, might, may, likely to e bound to para graduar a certeza; would e expressões como it may be worth para suavizar; modais com have para falar do passado; e como discordar com educação sem soar agressiva.",
      simples: {
        analogia: "Pense num botão de volume que vai de sussurro a grito. Os verbos modais são esse botão aplicado à sua opinião. Might é volume baixo: pode ser, não tenho certeza. Should é volume médio: acho que é o melhor caminho. Must é volume alto: tenho certeza ou não tem alternativa. Em reunião internacional, o volume errado causa dois problemas: soar mais firme do que você quer, e parecer mandona, ou soar insegura demais, e perder autoridade. A habilidade é escolher o volume certo para cada frase, e suavizar de propósito quando está discordando. Recomendar, calcular a certeza e suavizar são a mesma ferramenta usada em três situações.",
        pontos: [
          "Para recomendar: should e ought to (conselho), could (sugestão de opção).",
          "Para certeza no presente: must (quase certo), can't (quase certo que não), might, may e could (possível).",
          "Para probabilidade futura: be likely to (quase certo), be bound to (muito certo), might (talvez).",
          "Depois de modal, o verbo vem sem to e sem -s: She might know, nunca She mights knows.",
          "Passado: should have (devia ter feito), could have (era possível), might have (talvez tenha acontecido).",
          "Para discordar: reconheça o ponto, suavize com would ou could e proponha uma alternativa."
        ],
        paraQueServe: "Dar recomendações técnicas, falar de incerteza com precisão e discordar de um stakeholder ou de um colega de forma clara e respeitosa, em entrevista e reunião."
      },
      glossario: [
        { t: "Modal verb", d: "Verbo auxiliar como should, could, might, would; vem antes do verbo base, sem to e sem -s." },
        { t: "Should / ought to", d: "Conselho e recomendação: indicam que há uma escolha melhor, e não uma obrigação." },
        { t: "Could", d: "Sugere uma opção possível: We could reprocess only the last week." },
        { t: "Must / can't", d: "Dedução forte: tenho quase certeza de que é verdade (must) ou de que não é (can't)." },
        { t: "Might / may", d: "Possibilidade sem certeza; may soa mais formal que might." },
        { t: "Be likely to / be bound to", d: "Expressões de probabilidade futura: likely é quase certo, bound é muito certo." },
        { t: "Hedging", d: "Suavizar uma afirmação para não soar categórica: it seems, it may be worth, I'd suggest." },
        { t: "Should have + particípio", d: "Crítica ou lamento sobre o passado: algo que era o certo a fazer e não foi feito." },
        { t: "Could have + particípio", d: "Possibilidade que existia no passado, mas não se concretizou, ou palpite sobre o passado." }
      ],
      blocos: [
        {
          t: "Should, ought to e could: recomendar sem mandar",
          facil: "Traduzindo: should e ought to dão conselho, could apresenta uma opção; nenhum dos três é ordem.",
          p: [
            "A página do British Council sobre sugestões e obrigações diz que should e shouldn't servem para sugestões e conselhos, com exemplos como You should send an email. Could também faz sugestões positivas, como We could meet at the weekend. Em dados, soa assim: You should add a freshness check to this table, ou We could partition the table by date.",
            "Ought to aparece na página só em um comentário da equipe, que diz que should e ought to expressam conselho em vez de obrigação, e que esses verbos implicam que existe uma escolha, ao contrário de must. Por isso, em reunião, use should para recomendar e deixe must para regras reais, como exigência de segurança.",
            "Uma regra mecânica que evita erros comuns: depois de modal, vem o verbo base, sem to e sem -s. Ought to é a exceção, porque leva to por ser parte da expressão."
          ],
          tabela: {
            cab: ["Intenção", "Frase-modelo"],
            linhas: [
              ["Conselho firme", "You should document the schema before the handoff."],
              ["Conselho com ought to", "We ought to review the access list this quarter."],
              ["Opção entre outras", "We could migrate the oldest tables first."],
              ["Regra real", "Anyone with prod access must use MFA."]
            ]
          },
          armadilha: "Erro comum de falantes de português: You should to add a check, ou He shoulds add a check. Depois de should vem o verbo base sem to e sem -s: You should add a check.",
          fonte: ["British Council LearnEnglish: suggestions and obligations", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/suggestions-obligations"]
        },
        {
          t: "Certeza e probabilidade: o botão de volume",
          facil: "Traduzindo: must é quase certeza, might e may e could são possibilidade, can't é quase certeza de que não; likely to e bound to falam do futuro.",
          p: [
            "A página de modais de dedução do presente, do British Council, diz que must mostra confiança de que algo é verdade ou é a única possibilidade realista; might, may e could mostram que algo é possível, mas sem certeza; e can't mostra confiança de que algo não é possível. May é mais formal que might e could. Depois de qualquer modal vem o verbo base sem to.",
            "A página de probabilidade do nível C1 acrescenta que adicionar well deixa a situação mais provável (That could well be true), que should expressa expectativa razoável (if all goes well) e que should não se usa para prever algo negativo. Ela também diz que couldn't é diferente: significa impossível.",
            "Para o futuro, a página sobre graus de certeza apresenta be likely to para quase certeza (The government's likely to call an election soon), be bound to para muita certeza e might para incerteza. Em dados: The migration is likely to finish by Friday, but it might slip if the source team changes the schema."
          ],
          lista: [
            "Quase certo: The job must be stuck; it has run for six hours.",
            "Quase certo que não: That can't be the cause; the code did not change.",
            "Possível: The delay might come from the source API.",
            "Futuro provável: We're likely to hit the deadline."
          ],
          dica: "Em estimativas, troque will por is likely to ou might quando você não tem certeza: soa honesto, não fraco.",
          armadilha: "Armadilha de tradução: It must not be the cause, para dizer que quase certamente não é a causa. A página de deduções ensina can't para essa ideia (e a de deduções sobre o passado, can't have ou couldn't have). Must not costuma ser lido como proibição, embora no inglês americano às vezes apareça como dedução; para uma fala segura, use can't.",
          fonte: ["British Council LearnEnglish: modals, deductions about the present", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-present"]
        },
        {
          t: "Suavizar (hedging) com would, could e expressões de cautela",
          facil: "Traduzindo: suavizar é deixar a frase menos direta; would, could e expressões como it may be worth fazem isso sem tirar o conteúdo.",
          p: [
            "A página sobre will e would, do British Council, explica que would é o passado de will e que formas no passado tornam a linguagem mais polida: Dan would help you if you asked him é mais polido do que Dan will help you if you ask him. Um comentário da equipe, na página de verbos modais, resume que would deixa a frase menos direta e possivelmente mais polida.",
            "Na prática de reunião, você suaviza trocando afirmações secas por frases com modal. Em vez de This approach is wrong, diga This approach might not scale. Em vez de You need to fix the tests, diga We may want to fix the tests first.",
            "Expressões como it may be worth, it seems that, I would suggest e I'd lean towards são formas comuns de suavizar em inglês de trabalho. Não encontrei essas expressões em uma página oficial aberta para esta aula, então trate-as como uso corrente, não como regra confirmada. A estrutura it may be worth + verbo com -ing é prática: It may be worth adding a retry before we scale the cluster."
          ],
          tabela: {
            cab: ["Mais direto", "Suavizado"],
            linhas: [
              ["This design is wrong.", "This design might not scale to our volume."],
              ["You should change the schema.", "It may be worth reviewing the schema."],
              ["We need more time.", "We would probably need a bit more time."],
              ["That won't work.", "I'm not sure that would work in our case."]
            ]
          },
          armadilha: "Erro comum de falantes de português: suavizar demais e perder a mensagem (I think maybe perhaps it could be a little bit not ideal). Um suavizador por frase basta: This might not scale.",
          fonte: ["British Council LearnEnglish: will and would", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/will-would"]
        },
        {
          t: "Modais no passado: should have, could have, might have",
          facil: "Traduzindo: modal + have + particípio olha para trás: devia ter feito (should have), era possível (could have), talvez tenha acontecido (might have).",
          p: [
            "A página sobre modais com have, do British Council, mostra que should have descreve algo que se esperava e não ocorreu (You should have helped her when she asked), could have descreve possibilidade no passado, might have faz palpite com incerteza (We thought someone might have taken the car) e would have descreve um resultado imaginado, geralmente com um if implícito.",
            "A página de deduções sobre o passado dá o quadro completo: must have quando temos quase certeza de que algo ocorreu, might have ou may have quando é possível, e can't have ou couldn't have quando é quase certo que não ocorreu. Depois do modal vem have, nunca have to. Para a ideia de quase certo que não, o padrão ensinado é can't have ou couldn't have.",
            "No trabalho: The job might have failed because of the new column; it can't have been the network, since other jobs ran. Para retrospectiva sem acusar, prefira should have no plural: We should have added an alert."
          ],
          lista: [
            "Crítica leve: We should have validated the input.",
            "Possibilidade que não aconteceu: We could have used a smaller cluster.",
            "Palpite: The file might have arrived late.",
            "Quase certo que não: The deploy can't have caused it; it ran after the failure."
          ],
          dica: "Em retrospectiva, prefira we should have em vez de you should have: o foco fica no processo.",
          armadilha: "Erro comum de falantes de português: I should have gone to check, mas dito I should went. Depois de should have vem o particípio: should have checked.",
          fonte: ["British Council LearnEnglish: modals with have", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/modals-have"]
        },
        {
          t: "Discordar com educação sem soar agressiva",
          facil: "Traduzindo: discordar bem é reconhecer o ponto do outro, suavizar sua frase e propor uma alternativa; nada disso exige abrir mão da sua opinião.",
          p: [
            "Esta parte são sugestões de prática minhas, sem fonte oficial aberta. Uma sequência simples tem três passos. Primeiro, reconheça algo do que a outra pessoa disse: I see your point about the deadline. Segundo, suavize a discordância com modal: I'm not sure that would work, or I'd be a bit concerned about the cost. Terceiro, proponha: Could we try a smaller pilot first?",
            "Evite começar com No, you're wrong ou That's not true; prefira a frase em primeira pessoa, que fala da sua visão e não da pessoa: I see it a bit differently, ou My concern is that this might break the downstream reports. Se precisar ser firme, use should ou must, mas com a razão: We must keep the audit logs because of compliance."
          ],
          tabela: {
            cab: ["Situação", "Frase-modelo"],
            linhas: [
              ["Discordar de uma estimativa", "I see your point, but I'd be a bit concerned about that timeline."],
              ["Discordar de uma escolha técnica", "I'm not sure that would scale; could we test it on one table first?"],
              ["Dizer não com firmeza", "I understand the urgency, but we shouldn't skip the tests in production."]
            ]
          },
          armadilha: "Erro comum de falantes de português: traduzir a franqueza direta do português como You are wrong. Em inglês de trabalho soa duro. Troque por I see it differently ou I'm not sure that would work.",
          dica: "Fórmula: ponto + suavizador + alternativa."
        }
      ],
      exemplo: {
        t: "Reunião de planejamento com discordância",
        texto: "O gerente propõe migrar tudo em uma semana. A engenheira responde: I see your point about the deadline, but I'd be a bit concerned about the risk. We could migrate the three most critical tables first, and the rest might follow next sprint. Ela dá uma recomendação: I think we should add reconciliation checks before we switch the dashboards. Ela estima: The first phase is likely to finish by Friday, but it might slip if the source team changes the schema. Mais tarde, ao falar do incidente da semana anterior, ela comenta: We should have validated the files, and the delay can't have come from the network. A fala mistura recomendação, certeza, suavização e passado, sempre com o volume certo."
      },
      prova: [
        "Design review: você recomenda uma mudança com should ou could sem soar mandona.",
        "Estimativa: você usa likely to e might para ser honesta sobre incerteza.",
        "Desacordo: você discorda de um stakeholder reconhecendo o ponto dele e propondo uma alternativa.",
        "Retrospectiva: você usa should have e could have para falar do que poderia ter sido feito."
      ],
      explique: "Explique com as suas palavras como escolher entre must, should e might, e dê um exemplo de como discordar com educação de uma estimativa de prazo.",
      checagem: [
        "Qual a diferença entre should e must numa recomendação técnica?",
        "Como você diria que é quase certo que algo não foi a causa, no passado?",
        "Que modais servem para suavizar uma discordância, e que estrutura de três passos você usa?",
        "Por que should have + particípio é um bom jeito de falar de um incidente?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: suggestions and obligations", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/suggestions-obligations"],
      ["British Council LearnEnglish: modals, deductions about the present", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-present"],
      ["British Council LearnEnglish: modals, deductions about the past", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/modals-deductions-about-past"],
      ["British Council LearnEnglish: modals with have", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/modals-have"],
      ["British Council LearnEnglish: modals, probability (C1)", "https://learnenglish.britishcouncil.org/free-resources/grammar/c1/modals-probability"],
      ["British Council LearnEnglish: the future, degrees of certainty", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-degrees-certainty"],
      ["British Council LearnEnglish: will and would", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/will-would"],
      ["British Council LearnEnglish: modal verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/modal-verbs"]
    ],
    cartoes: [
      { id: "g6c1", f: "Corrija: You should to add a freshness check.", v: "You should add a freshness check. Depois de modal, verbo base sem to (ought to é exceção).", t: "g6" },
      { id: "g6c2", f: "Diga em inglês: acho que a causa é a nova coluna (palpite, sem certeza).", v: "The new column might be the cause. Might expressa possibilidade sem certeza.", t: "g6" },
      { id: "g6c3", f: "Corrija: It must not be the network, other jobs ran fine.", v: "It can't be the network. Para quase certeza de que não, o padrão é can't (can't have ou couldn't have no passado); must not costuma soar como proibição.", t: "g6" },
      { id: "g6c4", f: "Complete: We ___ have validated the file. (devíamos ter validado)", v: "should. Should have + particípio fala de algo que era o certo a fazer e não foi feito.", t: "g6" },
      { id: "g6c5", f: "Suavize: This design is wrong.", v: "This design might not scale. Modal com negação deixa a crítica sobre o resultado, não sobre a pessoa.", t: "g6" },
      { id: "g6c6", f: "Qual a diferença entre must e should numa recomendação?", v: "Should dá conselho e deixa escolha; must indica regra ou necessidade, sem escolha.", t: "g6" },
      { id: "g6c7", f: "Diga em inglês: é provável que a migração termine na sexta.", v: "The migration is likely to finish on Friday. Be likely to expressa probabilidade alta no futuro.", t: "g6" },
      { id: "g6c8", f: "Corrija: He shoulds check the logs first.", v: "He should check the logs first. Modais não levam -s na terceira pessoa.", t: "g6" },
      { id: "g6c9", f: "Complete para discordar com educação: I see your point, ___ I'd be a bit concerned about the cost.", v: "but. Reconheça o ponto, depois suavize com would e proponha uma alternativa.", t: "g6" },
      { id: "g6c10", f: "Corrija: I should went to check the dashboard.", v: "I should have checked the dashboard. Should have + particípio, nunca should + passado.", t: "g6" },
      { id: "g6c11", f: "Diga em inglês: poderíamos migrar primeiro só as tabelas críticas.", v: "We could migrate only the critical tables first. Could apresenta uma opção sem impor.", t: "g6" },
      { id: "g6c12", f: "Reformule de forma suave: You need to fix the tests first.", v: "It may be worth fixing the tests first. ou We may want to fix the tests first. (expressões de uso corrente).", t: "g6" },
      { id: "g6c13", f: "Qual modal usar: quase certo que algo aconteceu no passado, por dedução?", v: "Must have + particípio: The job must have timed out. Para quase certo que não, use can't have.", t: "g6" }
    ],
    questoes: [
      {
        id: "g6q1", s: 2, t: "g6",
        e: "No design review, você quer recomendar um check de frescor numa tabela, sem dar uma ordem. Qual frase está correta e natural?",
        o: [
          "You should to add a freshness check to this table.",
          "You shoulds add a freshness check to this table.",
          "You should add a freshness check to this table.",
          "You should adding a freshness check to this table."
        ],
        c: [2],
        x: "Should expressa conselho e é seguido do verbo base: You should add a freshness check. A forma com to depois de should mistura com ought to e com have to. A forma com shoulds aplica o -s da terceira pessoa a um modal, o que não existe. A forma com adding usa o gerúndio depois de modal, mas modais pedem o verbo base."
      },
      {
        id: "g6q2", s: 2, t: "g6",
        e: "O job de ontem falhou. Você tem uma suspeita, mas ainda não confirmou. Qual frase transmite a incerteza correta?",
        o: [
          "The job must have failed because of nothing.",
          "The job might have failed because of the new column.",
          "The job should have failed because of the new column.",
          "The job can't have failed because of the new column."
        ],
        c: [1],
        x: "Might have + particípio expressa possibilidade no passado, sem certeza, o que combina com uma suspeita. Must have indicaria quase certeza, o que contradiz o estado de dúvida, e a razão nothing nem faz sentido. Should have falaria de uma expectativa não cumprida, não de uma hipótese sobre a causa. Can't have afirma quase certeza de que não foi isso, o oposto da suspeita."
      },
      {
        id: "g6q3", s: 2, t: "g6",
        e: "Outros jobs rodaram bem na mesma rede, e você quer dizer que é quase certo que a rede não causou o atraso. Qual frase usa o modal ensinado como padrão pelo British Council?",
        o: [
          "It can't have been the network.",
          "It must not have been the network.",
          "It might not be the network.",
          "It should have been the network."
        ],
        c: [0],
        x: "Can't have + particípio expressa quase certeza de que algo não aconteceu, como a página de deduções do British Council indica, evitando must not have. A forma com must not é a tradução típica de deve não ter sido, mas não é o padrão ensinado (no inglês americano aparece, e must not costuma ser lido como proibição). Might not expressa só possibilidade, mais fraca que a certeza pretendida. Should have been indica que a rede era a causa esperada, o contrário do que se quer dizer."
      },
      {
        id: "g6q4", s: 2, t: "g6",
        e: "Escolha duas frases que suavizam uma crítica ao desenho de um colega sem perder o conteúdo. (Escolha duas) Choose two.",
        o: [
          "This design is wrong and will fail.",
          "This design might not scale to our volume.",
          "It may be worth reviewing how this scales.",
          "You obviously did not think about scale."
        ],
        c: [1, 2],
        x: "A frase com might not scale e a frase com it may be worth são suavizadas: transmitem a preocupação técnica, sem afirmar de forma categórica e sem apontar a pessoa. A frase com wrong and will fail é categórica e acusatória. A frase com obviously did not think é pessoal e agressiva. Em reunião internacional, falar do resultado e não da pessoa preserva a relação."
      },
      {
        id: "g6q5", s: 2, t: "g6",
        e: "Um stakeholder quer migrar tudo em uma semana. Você discorda de forma educada e propõe uma alternativa. Qual resposta é a mais adequada?",
        o: [
          "No, that's impossible and you're wrong about the deadline.",
          "Whatever you decide is fine, I guess.",
          "I see your point, but I'd be a bit concerned about the risk. Could we start with the critical tables?",
          "That won't work. We must do it my way."
        ],
        c: [2],
        x: "A resposta correta segue a fórmula de reconhecer o ponto, suavizar com would e propor uma opção com could. A resposta com No e you're wrong é direta demais e ataca a pessoa. A resposta de whatever you decide abdica da opinião e perde a chance de proteger o projeto. A resposta com my way endurece a discussão sem justificar com razões."
      },
      {
        id: "g6q6", s: 2, t: "g6",
        e: "Nível C1. Na retrospectiva, você quer dizer que a equipe tinha a opção de usar um cluster menor, mas não usou. Qual frase expressa isso com precisão?",
        o: [
          "We could have used a smaller cluster.",
          "We could use a smaller cluster yesterday.",
          "We would use a smaller cluster last week.",
          "We can have used a smaller cluster."
        ],
        c: [0],
        x: "Could have + particípio descreve uma possibilidade passada que não se concretizou, segundo a página de modais com have. As outras opções erram na forma: could use com yesterday mistura modal no presente com tempo passado; would use com last week também; can have used não é uma construção normal, porque can não se combina com have para falar do passado nesse sentido."
      },
      {
        id: "g6q7", s: 2, t: "g6",
        e: "Encontre o erro. Qual destas frases, ditas numa reunião de planejamento com a equipe de dados, contém um erro no uso de modal?",
        o: [
          "We should have added an alert before the launch.",
          "The migration is likely to finish by Friday.",
          "She might knows the answer; let's ask her.",
          "It may be worth reviewing the access list."
        ],
        c: [2],
        x: "Depois de um modal, o verbo fica na forma base: She might know the answer. A frase com knows soma um -s que modais não aceitam. A frase com should have added está correta como crítica ao processo. A frase com likely to finish usa uma expressão de probabilidade corretamente. A frase com may be worth reviewing é uma forma comum de recomendar com cautela."
      },
      {
        id: "g6q8", s: 2, t: "g6",
        e: "Você quer dar uma recomendação firme, mas ainda como conselho, e não como regra. Qual modal é o mais adequado?",
        o: [
          "You must document the schema before the handoff, as a suggestion.",
          "You should document the schema before the handoff.",
          "You might to document the schema before the handoff.",
          "You can't document the schema before the handoff."
        ],
        c: [1],
        x: "Should expressa conselho firme, mas deixa uma escolha, como a página do British Council aponta. Must indica uma regra sem opção, o que contradiz a ideia de sugestão. Might com to mistura um modal de possibilidade com uma forma de infinitivo que não existe. Can't document diz que é impossível documentar, o que muda totalmente o sentido."
      },
      {
        id: "g6q9", s: 2, t: "g6",
        e: "Escolha duas frases corretas para falar do incidente de ontem sem acusar ninguém. (Escolha duas) Choose two.",
        o: [
          "We should have validated the files before the load.",
          "You should have went to check the files first.",
          "The delay might have come from the source API.",
          "The delay might had come from the source API."
        ],
        c: [0, 2],
        x: "A primeira usa should have + particípio com sujeito we, que foca o processo. A terceira usa might have + particípio para um palpite sobre a causa. A frase com should have went erra o particípio (o certo é gone, ou checked) e ainda acusa uma pessoa. A frase com might had usa had no lugar de have depois de modal, o que não existe em inglês."
      },
      {
        id: "g6q10", s: 2, t: "g6",
        e: "Nível C1. Você estima o prazo de uma entrega com honestidade: é provável que termine na sexta, mas há risco de atraso. Qual frase equilibra as duas informações?",
        o: [
          "It will finish on Friday, no doubt about it.",
          "It is likely to finish by Friday, but it might slip if the schema changes.",
          "It must finish on Friday, and it can't slip.",
          "It might finish, or might not, I really don't know anything."
        ],
        c: [1],
        x: "Is likely to expressa probabilidade alta e might slip assinala o risco, com a condição explícita; é uma estimativa honesta. Will com no doubt é categórico demais para o que se sabe. Must finish e can't slip fala como dedução de certeza, que não existe. A última frase é tão vaga que não informa nada, e dizer que não sabe nada reduz a credibilidade."
      },
      {
        id: "g6q11", s: 2, t: "g6",
        e: "Complete para discordar com educação: I see your point, ___ I'd be a bit concerned about the cost of the cluster.",
        o: [
          "because",
          "so",
          "and therefore",
          "but"
        ],
        c: [3],
        x: "But marca o contraste: reconhece o ponto do outro e introduz a ressalva, que é a base de uma discordância educada. Because ligaria a causa de algo a seu ponto de vista, invertendo a lógica. So e and therefore indicam consequência, como se a preocupação decorresse do ponto dele, o que não é o caso. A estrutura reconhece, contrasta e propõe."
      },
      {
        id: "g6q12", s: 2, t: "g6",
        e: "Um colega diz: It must not be the code, since nothing changed. Qual correção usa o modal ensinado como padrão para quase certeza de que algo não é verdade?",
        o: [
          "It mustn't be the code, since nothing changed.",
          "It should not be the code, since nothing changed.",
          "It can't be the code, since nothing changed.",
          "It would not be the code, since nothing changed."
        ],
        c: [2],
        x: "Para dedução negativa forte, a página do British Council usa can't (e couldn't ou can't have no passado), em vez de must not. A versão com mustn't repete a forma que costuma ser lida como proibição, e não é a ensinada como padrão para dedução. Should not indica expectativa ou conselho, e não uma dedução. Would not é hipotético e depende de um se, que não existe na frase."
      }
    ],
    lab: treino({
      t: "Treino de fala: recomendar, estimar e discordar com educação",
      porque: "A escolha de modais muda o tom e a certeza da frase; ouvir sua gravação mostra onde você soa dura demais ou vaga demais.",
      antes: "Releia o bloco de certeza e o de discordar com educação, e escolha uma situação: uma estimativa de prazo e um colega que propõe algo arriscado. Tenha papel e caneta e um lugar silencioso. Este treino é uma sugestão de prática: nada aqui foi executado por quem escreveu a aula, e o resultado depende de você.",
      cenario: "você dá uma estimativa de prazo, recomenda uma ação e discorda com educação de uma proposta arriscada.",
      chaves: "prazo, risco, tabelas críticas, testes",
      gravar: "Dê uma recomendação com should, uma estimativa com likely to e might, uma discordância no formato ponto, suavizador e alternativa, e uma frase de retrospectiva com should have.",
      erros_contar: "to depois de modal, -s em modal, must not no lugar de can't, should + passado em vez de should have, e frases secas sem suavizador.",
      verificar: "Na segunda gravação você usa should, might, likely to, can't e should have corretamente, e sua discordância tem três partes (ponto, suavizador, alternativa). Os traços de erro diminuíram em relação à primeira.",
      errosLab: [
        { s: "Sou categórica em tudo (will, must)", c: "Usar o mesmo volume para qualquer certeza.", r: "Marque no papel duas frases de estimativa e troque will por is likely to e might." },
        { s: "Suavizo tanto que a mensagem some", c: "Empilhar vários suavizadores na mesma frase.", r: "Use um suavizador por frase e termine com uma proposta clara, como Could we start with the critical tables?" }
      ]
    })
  };

  /* ===================== AULA 7 ===================== */
  C.dias[7] = {
    aula: {
      titulo: "Perguntas diretas e indiretas, question tags e pedidos educados",
      resumo: "Ordem das palavras em perguntas diretas e indiretas (Do you know where the file is?), os auxiliares do, does e did que costumam ser omitidos, question tags, pedidos educados com Could you e Would you mind, e perguntas de esclarecimento para reuniões.",
      simples: {
        analogia: "Imagine que a pergunta direta é uma porta que você abre empurrando: Where is the file? O verbo salta para a frente e anuncia a pergunta. A pergunta indireta é a mesma porta com uma pequena antecâmara: Do you know where the file is? Primeiro vem a frase de cortesia, que faz a pergunta de verdade; depois vem o conteúdo, e ele volta à ordem normal de uma afirmação, sem o verbo saltar. É por isso que dizer Do you know where is the file? soa estranho: você empurrou a porta de dentro da antecâmara. Em inglês de trabalho, as perguntas indiretas e os pedidos com could e would são o jeito padrão de soar educada, principalmente com pessoas que você não conhece bem.",
        pontos: [
          "Pergunta direta: auxiliar antes do sujeito (Where is the file? Did you run it?).",
          "Pergunta indireta: frase de abertura + ordem normal de afirmação (Do you know where the file is?).",
          "Em perguntas indiretas não entram do, does ou did para o verbo do conteúdo.",
          "Perguntas diretas no presente e no passado simples pedem do, does ou did, que muita gente omite.",
          "Question tags: positivo pede tag negativa e vice-versa (The job ran, didn't it?).",
          "Pedidos educados: Could you, Would you mind + -ing, I was wondering if you could."
        ],
        paraQueServe: "Pedir informações, confirmar fatos e esclarecer dúvidas em reuniões e entrevistas sem soar seca, e sem errar a ordem das palavras."
      },
      glossario: [
        { t: "Direct question", d: "Pergunta com inversão de auxiliar e sujeito: Where is the file? Did you run the job?" },
        { t: "Indirect question", d: "Pergunta embutida em outra frase, com ordem de afirmação e sem inversão: Do you know where the file is?" },
        { t: "Do-support", d: "Uso de do, does ou did para formar perguntas e negativas no presente e passado simples." },
        { t: "Inversion", d: "Troca de lugar entre sujeito e auxiliar: You are ready vira Are you ready?" },
        { t: "Question tag", d: "Pergunta curta no fim da frase para confirmar algo: It ran, didn't it?" },
        { t: "Would you mind + -ing", d: "Pedido muito educado, seguido do verbo com -ing: Would you mind sending the file?" },
        { t: "Could you", d: "Forma educada de pedir que alguém faça algo: Could you share the dashboard link?" },
        { t: "Clarifying question", d: "Pergunta para conferir que você entendeu: So, just to confirm, you want daily refreshes?" }
      ],
      blocos: [
        {
          t: "Perguntas diretas: inversão e do/does/did",
          facil: "Traduzindo: em pergunta direta o auxiliar vai para antes do sujeito; quando a frase só tem o verbo principal, entra do, does ou did.",
          p: [
            "Em perguntas diretas, o auxiliar vem antes do sujeito. A página sobre verbos modais, do British Council, mostra a inversão com modais: May I ask a question? e Could I have some tea, please? O mesmo vale para be e have como auxiliares: Are you ready? Have you run the job?",
            "Quando a frase não tem auxiliar (verbo principal no presente ou passado simples), a pergunta pede do, does ou did. Esta regra é conhecida e não encontrei uma página aberta específica para ela nesta aula, então trate esta parte como regra geral do inglês, e não como citação. Exemplos: Do you use dbt? Does the job run daily? Did you check the logs?",
            "Depois de do, does ou did, o verbo principal volta à forma base: Did you run it, e não Did you ran it. Já nas perguntas com palavra interrogativa, a ordem é palavra, auxiliar, sujeito, verbo: Where did you find the file?"
          ],
          tabela: {
            cab: ["Frase sem auxiliar", "Pergunta direta"],
            linhas: [
              ["You use Airflow.", "Do you use Airflow?"],
              ["The job runs every night.", "Does the job run every night?"],
              ["She checked the logs.", "Did she check the logs?"],
              ["The file is in the bucket.", "Is the file in the bucket? (be já é auxiliar)"]
            ]
          },
          armadilha: "Erro comum de falantes de português: You use Airflow? (só com entonação) ou Did you ran it? A pergunta formal pede Do you use Airflow? e Did you run it?, com o verbo na forma base depois do auxiliar.",
          fonte: ["British Council LearnEnglish: modal verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/modal-verbs"]
        },
        {
          t: "Perguntas indiretas: abertura mais ordem de afirmação",
          facil: "Traduzindo: depois de Do you know ou Could you tell me, volte para a ordem normal: sujeito e depois verbo, sem do, does ou did.",
          p: [
            "Uma pergunta indireta tem duas partes: uma abertura educada (Do you know, Could you tell me, I was wondering) e a pergunta embutida. A página sobre discurso indireto do British Council explica que, nessa pergunta embutida, vale a ordem normal da afirmação, sem inversão e sem do, does ou did: Where is your new coat? vira She asked where his new coat was.",
            "A mesma regra vale para perguntas feitas a você ou por você: Where is the file? vira Do you know where the file is? E Did the job fail? vira Could you tell me if the job failed? Para perguntas de sim ou não, use if ou whether depois da abertura.",
            "Note a pontuação: se a abertura é uma pergunta (Do you know...), a frase termina com ponto de interrogação; se a abertura é afirmativa (I wonder where the file is), termina com ponto final. Essa regra de pontuação é geral e não vem de uma das páginas citadas aqui."
          ],
          tabela: {
            cab: ["Direta", "Indireta"],
            linhas: [
              ["Where is the file?", "Do you know where the file is?"],
              ["What time does the job start?", "Could you tell me what time the job starts?"],
              ["Did the load finish?", "Do you know if the load finished?"],
              ["Who owns this table?", "I wonder who owns this table."]
            ]
          },
          armadilha: "Erro típico de quem pensa em português: Do you know where is the file? e Could you tell me what time does the job start? Depois da abertura, a ordem volta ao normal: where the file is, what time the job starts.",
          dica: "Teste mental: se você consegue riscar a abertura e a frase vira uma afirmação, a ordem está certa (the file is in the bucket).",
          fonte: ["British Council LearnEnglish: reported speech", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/reported-speech"]
        },
        {
          t: "Question tags: confirmar sem interrogar",
          facil: "Traduzindo: a tag é uma pergunta curta no fim, para confirmar um fato; positivo pede negativo, negativo pede positivo.",
          p: [
            "A página de question tags do British Council explica que um enunciado positivo recebe tag negativa e um negativo recebe tag positiva: She's a doctor, isn't she? He isn't here, is he? Se há auxiliar, ele se repete na tag: Your parents have retired, haven't they? Sem auxiliar, usa-se don't, doesn't ou didn't depois de um verbo positivo no presente ou passado simples.",
            "Com modal, repete-se o modal. A mesma página diz que, nas formas perfeitas, a tag segue o modal e não o infinitivo: We should have gone, shouldn't we? Para I am, a tag negativa costuma ser aren't I?",
            "A entonação muda o sentido: tom descendente mostra que você tem quase certeza de que o ouvinte concorda; tom ascendente mostra que você tem menos certeza. Em reunião, tag com tom descendente serve para confirmar um combinado: The deadline is Friday, isn't it?"
          ],
          lista: [
            "Positivo, tag negativa: The job ran last night, didn't it?",
            "Negativo, tag positiva: The data isn't ready, is it?",
            "Com modal: We should add an alert, shouldn't we?",
            "Com I am: I'm on the call list, aren't I?"
          ],
          armadilha: "Erro comum de falantes de português: usar uma tag única para tudo (right? ou no?). Funciona de modo informal, mas na fala formal e nas entrevistas, use a tag completa (isn't it, didn't they).",
          fonte: ["British Council LearnEnglish: question tags", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/question-tags"]
        },
        {
          t: "Pedidos educados: Could you, Would you mind, I was wondering",
          facil: "Traduzindo: Could you e Would you mind + -ing são pedidos educados padrão; can e will funcionam, mas soam menos polidos.",
          p: [
            "A página sobre can e could, do British Council, diz que Could you é uma forma educada de pedir que alguém faça algo, e que Can you é menos educada: Could you take a message, please? A mesma página diz que Could I é mais educado do que Can I para pedir permissão.",
            "A página sobre will e would lista Would you mind + -ing como pedido educado: Would you mind carrying this? E mostra Would you mind not + -ing para pedir que alguém não faça algo. Atenção: depois de mind o verbo vem com -ing, nunca com to.",
            "A página também explica que formas no passado soam mais polidas. É por isso que a abertura I was wondering if you could... é comum em e-mails e reuniões; ela combina uma pergunta indireta com o passado educado. Essa expressão específica não aparece nas páginas que abri, então trate-a como uso corrente."
          ],
          tabela: {
            cab: ["Nível de formalidade", "Frase-modelo"],
            linhas: [
              ["Casual com colegas", "Can you share the link?"],
              ["Educada", "Could you share the dashboard link, please?"],
              ["Muito educada", "Would you mind sending me the access request?"],
              ["Indireta e cuidadosa", "I was wondering if you could review my pull request."]
            ]
          },
          armadilha: "Erro comum de falantes de português: Would you mind to send me the file? Depois de mind, use -ing: Would you mind sending me the file? E lembre que a resposta educada para aceitar é No, not at all.",
          dica: "Em dúvida, comece com Could you e acrescente please no fim.",
          fonte: ["British Council LearnEnglish: can and could", "https://learnenglish.britishcouncil.org/english-grammar-reference/can-and-could"]
        },
        {
          t: "Perguntas de esclarecimento em reunião",
          facil: "Traduzindo: antes de discordar ou responder, confirme o que entendeu; frases prontas ajudam a manter a ordem certa das palavras.",
          p: [
            "Estas são sugestões de prática minhas, sem fonte oficial aberta. Em reunião, o esclarecimento tem quatro movimentos: confirmar (So, just to confirm, you need the report every morning?), pedir repetição (Could you say that again?), pedir exemplo (Could you give me an example?) e verificar prazo ou responsável (Do you know who owns this table?).",
            "Combine perguntas indiretas com tags quando quiser confirmar sem soar desconfiada: The deadline is next Friday, isn't it? Se você não entendeu, diga com naturalidade: Sorry, I didn't catch that. Could you repeat the last part? Essas frases usam exatamente a estrutura desta aula: abertura educada e ordem normal, ou o auxiliar certo na pergunta direta."
          ],
          lista: [
            "Confirmar: So, just to confirm, the deadline is Friday, right?",
            "Pedir exemplo: Could you give me an example of a typical request?",
            "Pedir mais contexto: Could you tell me what the report is used for?",
            "Verificar responsável: Do you know who is responsible for this table?"
          ],
          dica: "Anote 3 aberturas de esclarecimento prontas e use uma em cada reunião; a prática vira hábito."
        }
      ],
      exemplo: {
        t: "Esclarecimento numa reunião de requisitos",
        texto: "A analista de negócios descreve um novo relatório, e a engenheira de dados precisa de detalhes. Ela começa: Could you tell me what the report is used for? Em seguida, confirma: So, just to confirm, you need it every morning, don't you? Depois pergunta sobre a fonte: Do you know where the sales data comes from? A resposta dela é: I'm not sure; I was wondering if you could check with the finance team. Ao final, ela pede um favor: Would you mind sending me the access request today? Observe que, em todas as perguntas indiretas, a ordem volta à de afirmação (what the report is used for, where the sales data comes from), e que as tags concordam com o auxiliar (need, don't you)."
      },
      prova: [
        "Reunião: você pergunta onde está um arquivo com Do you know where the file is?, na ordem certa.",
        "Entrevista: você pede esclarecimento com Could you give me an example?",
        "Equipe: você pede um favor com Would you mind sending...? e acompanha com please.",
        "Alinhamento: você confirma um combinado com uma question tag, como isn't it?"
      ],
      explique: "Explique com as suas palavras como transformar uma pergunta direta em indireta e por que do, does e did desaparecem na parte embutida.",
      checagem: [
        "Como você transforma Where is the file? em uma pergunta educada?",
        "Quando entram do, does e did, e quando eles desaparecem?",
        "Como você forma a tag de The job ran last night?",
        "Qual a diferença de formalidade entre Can you e Would you mind?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: reported speech", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/reported-speech"],
      ["British Council LearnEnglish: reported speech, questions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-questions"],
      ["British Council LearnEnglish: question tags", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/question-tags"],
      ["British Council LearnEnglish: can and could", "https://learnenglish.britishcouncil.org/english-grammar-reference/can-and-could"],
      ["British Council LearnEnglish: will and would", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/will-would"],
      ["British Council LearnEnglish: modal verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/modal-verbs"]
    ],
    cartoes: [
      { id: "g7c1", f: "Corrija: Do you know where is the file?", v: "Do you know where the file is? Depois da abertura, ordem de afirmação, sem inversão.", t: "g7" },
      { id: "g7c2", f: "Corrija: Could you tell me what time does the job start?", v: "Could you tell me what time the job starts? Na parte embutida não entra does; o verbo concorda com o sujeito.", t: "g7" },
      { id: "g7c3", f: "Transforme em educada: Did the load finish?", v: "Do you know if the load finished? Para sim ou não, use if ou whether na parte embutida.", t: "g7" },
      { id: "g7c4", f: "Corrija: You use Airflow? (pergunta formal)", v: "Do you use Airflow? Na pergunta direta com verbo principal, entra do ou does antes do sujeito.", t: "g7" },
      { id: "g7c5", f: "Corrija: Did you ran the job?", v: "Did you run the job? Depois de did, o verbo volta à forma base.", t: "g7" },
      { id: "g7c6", f: "Complete a tag: The job ran last night, ___?", v: "didn't it. Enunciado positivo no passado simples pede didn't na tag.", t: "g7" },
      { id: "g7c7", f: "Complete a tag: The data isn't ready, ___?", v: "is it. Enunciado negativo pede tag positiva com o mesmo auxiliar (be).", t: "g7" },
      { id: "g7c8", f: "Complete a tag: We should add an alert, ___?", v: "shouldn't we. Com modal, a tag repete o modal.", t: "g7" },
      { id: "g7c9", f: "Corrija: Would you mind to send me the file?", v: "Would you mind sending me the file? Depois de mind, use o verbo com -ing.", t: "g7" },
      { id: "g7c10", f: "Qual pedido é mais educado: Can you share the link ou Could you share the link?", v: "Could you share the link. Could you é mais educado que Can you, segundo o British Council.", t: "g7" },
      { id: "g7c11", f: "Diga em inglês: você sabe quem é o dono desta tabela?", v: "Do you know who owns this table? Quem é o sujeito aqui, então não há inversão nem do na parte embutida.", t: "g7" },
      { id: "g7c12", f: "Peça esclarecimento: não entendi a última parte, pode repetir?", v: "Sorry, I didn't catch that. Could you repeat the last part? Abertura de desculpa mais Could you.", t: "g7" },
      { id: "g7c13", f: "Complete a tag: I'm on the call list, ___?", v: "aren't I. Com I am, a tag negativa costuma ser aren't I.", t: "g7" }
    ],
    questoes: [
      {
        id: "g7q1", s: 3, t: "g7",
        e: "Você precisa localizar um arquivo de entrada e pergunta a um colega de outra equipe, de modo educado. Qual frase está correta?",
        o: [
          "Do you know where is the input file?",
          "Do you know where the input file is?",
          "Do you know where does the input file is?",
          "Do you know where the input file does?"
        ],
        c: [1],
        x: "Numa pergunta indireta, a parte embutida volta à ordem de afirmação: where the input file is. A versão com where is inverte o verbo, e é o erro típico de tradução. A versão com where does ... is mistura do e is, e duplica o verbo. A versão com the input file does termina com um verbo que não completa o sentido e ignora o verbo be."
      },
      {
        id: "g7q2", s: 3, t: "g7",
        e: "Você quer saber, de modo educado, a que horas o job começa. Qual frase está correta?",
        o: [
          "Could you tell me what time does the job start?",
          "Could you tell me what time the job start?",
          "Could you tell me what time the job starts?",
          "Could you tell me what time starts the job?"
        ],
        c: [2],
        x: "Na parte embutida não há do nem inversão, e o verbo concorda com o sujeito: the job starts. A versão com does mantém o auxiliar da pergunta direta. A versão com the job start esquece a concordância com a terceira pessoa. A versão com starts the job inverte a ordem, como se fosse uma pergunta com palavra interrogativa em português."
      },
      {
        id: "g7q3", s: 3, t: "g7",
        e: "Escolha duas frases corretas para perguntar, de modo educado, se o carregamento terminou. (Escolha duas) Choose two.",
        o: [
          "Do you know if the load finished?",
          "Do you know did the load finish?",
          "Could you tell me whether the load has finished?",
          "Could you tell me finished the load?"
        ],
        c: [0, 2],
        x: "Para perguntas de sim ou não, a parte embutida usa if ou whether e a ordem de afirmação: if the load finished e whether the load has finished. A versão com did the load finish mantém a inversão e o did da pergunta direta. A versão com finished the load não traz if nem whether e inverte a ordem, o que deixa a pergunta confusa."
      },
      {
        id: "g7q4", s: 3, t: "g7",
        e: "Você quer fazer uma pergunta direta, sem introdução, a respeito de uma ferramenta que a equipe usa. Qual frase tem a estrutura correta?",
        o: [
          "Your team use Airflow?",
          "Does your team use Airflow?",
          "Your team does use Airflow?",
          "Do your team uses Airflow?"
        ],
        c: [1],
        x: "Na pergunta direta com verbo principal no presente, entra does com sujeito da terceira pessoa e o verbo fica na forma base: Does your team use Airflow? A versão sem auxiliar só funciona com entonação e é informal. A versão com does depois do sujeito é afirmativa enfática. A versão com do e uses erra a concordância e põe o -s no verbo principal."
      },
      {
        id: "g7q5", s: 3, t: "g7",
        e: "Você quer confirmar um combinado, com quase certeza de que o colega concorda. Qual frase tem a question tag correta?",
        o: [
          "The deadline is Friday, isn't it?",
          "The deadline is Friday, doesn't it?",
          "The deadline is Friday, is it?",
          "The deadline isn't Friday, isn't it?"
        ],
        c: [0],
        x: "Enunciado positivo com be pede tag negativa com o mesmo auxiliar: is, isn't it. A versão com doesn't usa o auxiliar errado, porque a frase tem is. A versão com is it deixa positivo com positivo, que muda o sentido para um tom de surpresa. A versão com isn't Friday, isn't it repete a negação nos dois lados, quando a regra pede polaridade oposta."
      },
      {
        id: "g7q6", s: 3, t: "g7",
        e: "Nível C1. Você quer dizer, na reunião, que a equipe deveria ter adicionado um alerta, e confirmar com um colega. Qual frase tem a tag correta?",
        o: [
          "We should have added an alert, haven't we?",
          "We should have added an alert, shouldn't we?",
          "We should have added an alert, didn't we?",
          "We should have added an alert, hadn't we?"
        ],
        c: [1],
        x: "Segundo a página de question tags, com modal e infinitivo perfeito a tag segue o modal, não o infinitivo: should have added, shouldn't we. A versão com haven't usa o auxiliar do infinitivo perfeito. A versão com didn't trata a frase como passado simples. A versão com hadn't usa o auxiliar do past perfect, que não aparece na frase."
      },
      {
        id: "g7q7", s: 3, t: "g7",
        e: "Você pede a um colega que envie o pedido de acesso hoje, em tom muito educado. Qual frase está correta?",
        o: [
          "Would you mind to send me the access request today?",
          "Would you mind sending me the access request today?",
          "Would you mind send me the access request today?",
          "Would you mind that send me the access request today?"
        ],
        c: [1],
        x: "Would you mind pede o verbo com -ing, como a página sobre will e would mostra em Would you mind carrying this? A versão com to usa infinitivo, erro comum de falantes de português. A versão com send usa o verbo base, que não é a forma após mind. A versão com that send mistura uma cláusula com um verbo base e não existe nesse padrão."
      },
      {
        id: "g7q8", s: 3, t: "g7",
        e: "Encontre o erro. Qual frase de reunião contém um problema de ordem das palavras?",
        o: [
          "Could you tell me who owns this table?",
          "Do you know what the report is used for?",
          "I was wondering if you could review my pull request.",
          "Could you tell me where is the data stored?"
        ],
        c: [3],
        x: "A frase com where is the data stored inverte a ordem dentro da pergunta indireta; o correto é where the data is stored. A frase com who owns está certa porque who é o sujeito. A frase com what the report is used for mantém a ordem de afirmação. A frase com I was wondering if you could usa if e a ordem normal, e está correta."
      },
      {
        id: "g7q9", s: 3, t: "g7",
        e: "Escolha duas frases corretas para pedir esclarecimento a um stakeholder. (Escolha duas) Choose two.",
        o: [
          "Could you give me an example of a typical request?",
          "Could you to give me an example of a typical request?",
          "Do you know what time does the report refresh?",
          "Do you know what time the report refreshes?"
        ],
        c: [0, 3],
        x: "Could you give me an example é um pedido educado com verbo base, e Do you know what time the report refreshes mantém a ordem de afirmação na parte embutida. A versão com Could you to usa to depois de um modal, o que não existe. A versão com what time does the report refresh mantém does dentro da pergunta indireta, que deveria ser refreshes sem auxiliar."
      },
      {
        id: "g7q10", s: 3, t: "g7",
        e: "Nível C1. Em um e-mail a um gerente que você ainda não conhece bem, você quer pedir uma revisão de documento de forma cuidadosa. Qual frase é mais adequada ao tom?",
        o: [
          "Review my document.",
          "Can you review my document now?",
          "I was wondering if you could review my document when you have a moment.",
          "You must review my document."
        ],
        c: [2],
        x: "A abertura I was wondering if you could mistura passado educado, pergunta indireta e could, o que soa cuidadoso com um gerente que você mal conhece. A ordem direta soa como comando. Can you now é informal e pressiona o prazo. You must review é uma ordem, e transforma o pedido em exigência."
      },
      {
        id: "g7q11", s: 3, t: "g7",
        e: "Complete a pergunta de esclarecimento: So, just to confirm, you need the report every morning, ___?",
        o: [
          "doesn't it",
          "isn't it",
          "don't you",
          "aren't you"
        ],
        c: [2],
        x: "A frase tem o sujeito you e o verbo need, sem auxiliar. Num verbo positivo no presente simples, a tag usa don't com o mesmo sujeito: don't you. A versão com doesn't it usa o sujeito it, que não aparece. A versão com isn't it assume um verbo be inexistente. A versão com aren't you também assume um be, que não está na frase."
      },
      {
        id: "g7q12", s: 3, t: "g7",
        e: "Um colega diz: Do you know where do I find the staging data? Qual correção mantém a pergunta educada com a ordem certa?",
        o: [
          "Do you know where I finding the staging data?",
          "Do you know where I can find the staging data?",
          "Do you know where can I find the staging data?",
          "Do you know where find I the staging data?"
        ],
        c: [1],
        x: "A parte embutida volta à ordem de afirmação, e can é um modal que cabe bem aqui: where I can find the staging data. A versão com finding é gramaticalmente impossível (falta o auxiliar). A versão com where can I inverte a ordem dentro da pergunta indireta. A versão com find I tem ordem impossível em inglês."
      }
    ],
    lab: treino({
      t: "Treino de fala: perguntas indiretas, tags e pedidos educados",
      porque: "A ordem das palavras e os auxiliares são automáticos em português e exigem atenção em inglês; gravar permite contar quantas vezes você inverte ou omite do e did.",
      antes: "Releia as tabelas de pergunta direta e indireta e escolha uma reunião fictícia de requisitos com um stakeholder. Tenha papel e caneta e um lugar silencioso. Este treino é uma sugestão de prática: nada aqui foi executado por quem escreveu a aula, e o resultado depende de você.",
      cenario: "você faz perguntas de esclarecimento a um stakeholder que pede um novo relatório diário.",
      chaves: "relatório, fonte de dados, prazo, acesso",
      gravar: "Faça pelo menos quatro perguntas indiretas com Do you know ou Could you tell me, duas question tags para confirmar combinados e dois pedidos educados com Could you e Would you mind.",
      erros_contar: "inversão depois da abertura (where is the file), do, does ou did omitidos nas perguntas diretas, did + verbo no passado, e mind + to.",
      verificar: "Na segunda gravação todas as perguntas indiretas têm a ordem de afirmação, as perguntas diretas têm do, does ou did quando necessário, e as tags concordam com o auxiliar. Você tem menos traços do que na primeira.",
      errosLab: [
        { s: "Inverto a ordem depois de Do you know", c: "Transferir a ordem da pergunta direta para a parte embutida.", r: "Termine a frase mentalmente como afirmação (the file is in the bucket) e só depois fale." },
        { s: "Esqueço o auxiliar nas perguntas diretas", c: "Fazer pergunta só com entonação, como em português.", r: "Antes de gravar, escreva três perguntas com Do, Does e Did e leia em voz alta; use a mesma ordem na regravação." }
      ]
    })
  };

  /* ===================== AULA 8 ===================== */
  C.dias[8] = {
    aula: {
      titulo: "Discurso indireto, verbos de relato e futuro para compromissos",
      resumo: "Como relatar o que alguém disse em atas e follow-ups, com mudança de tempo (backshift) quando necessária; verbos de relato como suggest, recommend, insist, mention, agree e warn e seus padrões; e formas de futuro para compromissos: will, going to, present continuous, I'll have it done by, be due to e be about to.",
      simples: {
        analogia: "Pense no jogo do telefone sem fio, mas com regras. Quando você conta a um colega o que o gerente disse ontem, a frase precisa de ajustes para fazer sentido no novo momento: o eu vira ele, o hoje vira naquele dia, e o verbo costuma recuar um passo no tempo, porque a fala já ficou no passado. Só que, se o que foi dito ainda vale, você pode manter o tempo original, porque a informação continua atual. Os verbos de relato são etiquetas que mostram a intenção de quem falou: sugeriu, recomendou, insistiu, avisou. Cada etiqueta pede um molde diferente depois dela. Já as formas de futuro dizem o grau de compromisso: promessa na hora, plano já decidido ou combinado com outra pessoa. Escolher bem faz sua ata soar profissional e seu compromisso soar confiável.",
        pontos: [
          "Em relato, o verbo costuma recuar um passo (backshift): am working vira was working, will vira would.",
          "Se a informação ainda é verdade, pode manter o presente: She said the deadline is Friday.",
          "Say não leva pessoa direto (He said that...); tell leva (He told me that...). Nunca He said me.",
          "Suggest e recommend aceitam -ing ou that (I suggest adding a check), não suggest you to.",
          "Agree + to; warn + pessoa + not to; insist on + -ing ou insist that.",
          "Futuro: will para decisão na hora ou promessa, going to para plano, presente contínuo para combinado marcado."
        ],
        paraQueServe: "Escrever atas e e-mails de follow-up fiéis ao que foi dito, relatar conversas em entrevistas e assumir compromissos com prazos claros, sem soar vaga ou exagerada."
      },
      glossario: [
        { t: "Reported speech", d: "Discurso indireto: contar o que alguém disse sem repetir as palavras exatas." },
        { t: "Backshift", d: "Recuo do tempo verbal no relato: present simple vira past simple, will vira would." },
        { t: "Reporting verb", d: "Verbo que apresenta a fala de alguém: say, tell, suggest, recommend, insist, warn, agree." },
        { t: "Say / tell", d: "Say não leva pessoa diretamente; tell leva: He said that... / He told me that..." },
        { t: "Reported question", d: "Pergunta relatada: ordem de afirmação, sem do, does ou did, com if ou whether para sim ou não." },
        { t: "Be going to", d: "Futuro para planos decididos antes do momento da fala." },
        { t: "Present continuous (futuro)", d: "Combinado já confirmado com alguém, com hora e lugar conhecidos: We're meeting at noon." },
        { t: "Future perfect", d: "Will have + particípio: algo estará concluído antes de um momento futuro (I'll have finished by Friday)." },
        { t: "Be due to / be about to", d: "Be due to: está previsto para; be about to: está prestes a acontecer." }
      ],
      blocos: [
        {
          t: "Discurso indireto e backshift: o verbo recua um passo",
          facil: "Traduzindo: ao relatar uma fala que já ficou no passado, o verbo costuma recuar um passo no tempo e os pronomes mudam.",
          p: [
            "A página de discurso indireto sobre afirmações, do British Council, define o backshift como mover o tempo do verbo um passo para o passado. Os pares da página: present simple vira past simple (I travel a lot virou she said she travelled a lot), present continuous vira past continuous, present perfect vira past perfect, past simple vira past perfect e past perfect permanece como está.",
            "Em ata de reunião, isso aparece assim: A fala era We are migrating the tables this week. A ata diz: The manager said they were migrating the tables that week. Observe que os pronomes mudam (we virou they), e expressões de tempo também: a página lista this para that, now para then, yesterday para the day before, tomorrow para the next day e ago para before.",
            "O will vira would, e can vira could. Esta correspondência de modais não aparece como lista na página que abri, mas é a forma esperada de acompanhar o recuo, então trate como regra geral: I will send the report virou She said she would send the report."
          ],
          tabela: {
            cab: ["Fala original", "Relato com backshift"],
            linhas: [
              ["We are testing the pipeline.", "He said they were testing the pipeline."],
              ["I have fixed the schema.", "She said she had fixed the schema."],
              ["The job failed yesterday.", "He said the job had failed the day before."],
              ["I will send the report.", "She said she would send the report."]
            ]
          },
          armadilha: "Erro comum de falantes de português: He said me that the job failed. Say não leva a pessoa diretamente. Diga He said that the job failed, ou He told me that the job had failed.",
          fonte: ["British Council LearnEnglish: reported speech, statements", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements"]
        },
        {
          t: "Quando não recuar, e como relatar perguntas",
          facil: "Traduzindo: se a informação ainda vale, mantenha o presente; e em perguntas relatadas, use ordem de afirmação, sem do, does ou did.",
          p: [
            "A página de discurso indireto do British Council diz que o backshift é uma escolha, não uma regra, e dá exemplos de quando se pode manter o presente: a situação ainda é verdadeira, a afirmação é uma verdade geral ou o contexto mostra que ainda vale. Mary said she enjoyed the film because Robert de Niro is her favourite actor mantém o presente em is, porque continua sendo verdade.",
            "Na prática, uma ata pode dizer The manager said the deadline is Friday se o prazo ainda vale, ou was Friday se mudou. Esse detalhe indica ao leitor se a informação continua atual.",
            "Para perguntas relatadas, a página sobre perguntas diz que vale a ordem de afirmação, sem inversão, e que não entra do, does ou did. Perguntas de sim ou não usam if ou whether: Did you call the bank? vira She wanted to know if I had called the bank. Perguntas com palavra interrogativa mantêm a palavra e seguem a ordem de afirmação: What time is it? virou She asked me what time it was."
          ],
          lista: [
            "Ainda vale: She said the budget is approved. (continua aprovado)",
            "Ficou no passado: She said the budget was approved. (sem informação sobre agora)",
            "Pergunta de sim ou não: He asked if the load had finished.",
            "Pergunta com palavra interrogativa: He asked where the file was stored."
          ],
          dica: "Em dúvida, o backshift é seguro: ele funciona mesmo quando a informação ainda vale.",
          armadilha: "Erro típico de quem pensa em português: She asked me where was the file. Em pergunta relatada a ordem volta à de afirmação: where the file was.",
          fonte: ["British Council LearnEnglish: reported speech", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/reported-speech"]
        },
        {
          t: "Verbos de relato: suggest, recommend, insist, mention, agree, warn",
          facil: "Traduzindo: cada verbo de relato pede um molde depois dele; escolher o verbo certo mostra o que a pessoa fez ao falar.",
          p: [
            "A página de verbos de relato do British Council traz os padrões: suggest + -ing (She suggested taking a break) ou suggest + that + cláusula (a página mostra suggested that we ask); insist on + -ing (He insisted on paying); mention + -ing (She mentioned forgetting her keys); agree + to + verbo (They agreed to meet at noon); e warn + pessoa + not to + verbo (The officer warned us not to park here), ou warn + pessoa + against + -ing. Em um comentário da equipe na página, aparece que suggest não leva infinitivo. Os exemplos com insist on e mention são meus: a página só lista esses verbos com -ing.",
            "A página de padrões do nível C1 acrescenta que recommend aceita -ing (She recommends waiting for the refund), que suggest aceita that + verbo base (We suggest that she read the documents carefully before signing) e que warn aceita pessoa + that (Gairola warned ministers that the situation was critical). Agree também aceita that + cláusula: Sengupta agrees that we need a better system.",
            "Na ata: The team agreed to freeze deployments on Friday. The lead recommended adding monitoring before the migration. Security warned us not to share credentials in chat. A página indica que as listas variam entre fontes; confira o padrão do verbo antes de usar."
          ],
          tabela: {
            cab: ["Verbo", "Padrão", "Frase-modelo"],
            linhas: [
              ["suggest", "-ing ou that + base", "She suggested adding a retry. / She suggested that we add a retry."],
              ["recommend", "-ing", "He recommended waiting for the vendor's fix."],
              ["insist", "on + -ing ou that", "The client insisted on reviewing the dashboard first."],
              ["mention", "-ing", "He mentioned reprocessing the last week."],
              ["agree", "to + verbo ou that", "We agreed to meet on Monday."],
              ["warn", "pessoa + not to / against -ing", "She warned us not to change the schema."]
            ]
          },
          armadilha: "Erro típico de quem pensa em português: I suggest you to check the logs. Suggest não leva infinitivo, segundo o British Council. Diga I suggest checking the logs ou I suggest that you check the logs.",
          fonte: ["British Council LearnEnglish: reported speech, reporting verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs"]
        },
        {
          t: "Futuro para compromissos: will, going to, presente contínuo",
          facil: "Traduzindo: will é decisão na hora ou promessa, going to é plano que já existe, presente contínuo é combinado já marcado com alguém.",
          p: [
            "A página de formas de futuro do British Council explica que will serve para planos espontâneos, decididos no momento da fala (exemplo da página: I'll buy some when I go to the shops). Be going to é para planos decididos antes do momento da fala, e o presente contínuo é para arranjos já confirmados com outra pessoa, com hora e lugar conhecidos (exemplo da página: I'm meeting Jane at 8 o'clock on Saturday).",
            "Duas regras gerais, sem citação desta página: o presente simples serve para eventos programados (The train arrives at 6.30) e will também serve para promessas e ofertas (We'll send you an email).",
            "No trabalho: I'll look into it (decisão na hora, promessa), I'm going to refactor this job next sprint (plano), We're presenting to the client on Thursday at 10 (combinado marcado). Em follow-up, essa escolha informa o quanto o compromisso é firme."
          ],
          tabela: {
            cab: ["Forma", "Quando usar", "Frase-modelo"],
            linhas: [
              ["will", "Decisão na hora, promessa", "I'll send you the link right after the call."],
              ["be going to", "Plano já decidido", "I'm going to document the pipeline this week."],
              ["Presente contínuo", "Combinado marcado", "We're reviewing the design on Wednesday at 3."],
              ["Presente simples", "Agenda fixa", "The release window starts at 6 p.m."]
            ]
          },
          armadilha: "Erro comum de falantes de português: usar will para tudo, inclusive para combinados marcados (I will meet the client tomorrow at 10). Para um compromisso confirmado, prefira I'm meeting the client tomorrow at 10.",
          fonte: ["British Council LearnEnglish: future forms, will, be going to and present continuous", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous"]
        },
        {
          t: "Prazos firmes: I'll have it done by, be due to, be about to",
          facil: "Traduzindo: para prometer que algo estará pronto antes de um prazo use I'll have it done by; be due to fala do previsto e be about to do que está para acontecer.",
          p: [
            "A página sobre futuro contínuo e futuro perfeito, do British Council, diz que will have + particípio descreve ações que estarão concluídas antes de um momento futuro, e que by, by the time e in + período marcam o prazo: I'll have finished in an hour. Daí vem o compromisso com prazo: I'll have the report done by Friday. Aqui, have it done é uma construção comum no inglês de trabalho (will + have + objeto + particípio); a página que abri mostra o futuro perfeito, mas não essa construção com objeto, então trate-a como uso corrente.",
            "Be due to + verbo significa estar previsto para, como em The release is due to go out on Monday. Be about to + verbo significa estar prestes a, como em I'm about to start the migration. Não consegui confirmar essas duas expressões em uma página aberta do British Council (a página de graus de certeza não as cobre), então trate esses dois sentidos como uso corrente do inglês de trabalho.",
            "Em follow-up, combine prazo e comprometimento: I'll have the first draft ready by Thursday, and the final version is due next Monday."
          ],
          lista: [
            "Prazo próprio: I'll have the dashboard ready by Friday.",
            "Previsto: The audit report is due to be published on Monday.",
            "Iminente: We're about to start the deployment.",
            "Antes de um evento: By the time the client joins, I'll have updated the slides."
          ],
          armadilha: "Erro comum de falantes de português: I will have it finished until Friday. Em inglês, o prazo usa by, não until: I'll have it finished by Friday.",
          fonte: ["British Council LearnEnglish: future continuous and future perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-continuous-future-perfect"]
        }
      ],
      exemplo: {
        t: "Ata e follow-up depois da reunião",
        texto: "Depois da reunião, a engenheira escreve o follow-up. Na reunião, o gerente disse: We are freezing deployments on Friday, and I will approve the plan tomorrow. A ata fica: The manager said they were freezing deployments on Friday and that he would approve the plan the next day. Ela também registra: Security warned us not to share credentials in chat. The lead recommended adding monitoring, and the client insisted on reviewing the dashboard first. Todos agreed to meet again on Monday. Para o próprio compromisso, ela fecha com prazo: I'll have the first draft done by Thursday, and we're reviewing it together on Friday at 10. Reparou que cada verbo de relato leva um padrão diferente, e que o compromisso próprio usa by e presente contínuo?"
      },
      prova: [
        "Ata: você relata o que o gerente disse, com backshift e pronomes ajustados.",
        "Follow-up: você usa suggest, recommend, warn e agree com o padrão certo.",
        "Entrevista: você conta o que um colega ou chefe disse, sem dizer He said me.",
        "Compromisso: você promete algo com I'll have it done by e marca reuniões com presente contínuo."
      ],
      explique: "Explique com as suas palavras quando o verbo recua um passo no relato e quando você pode manter o presente, e escolha o verbo de relato certo para três situações de ata.",
      checagem: [
        "Que mudanças ocorrem com pronomes e marcadores de tempo em um relato?",
        "Qual a diferença entre say e tell, e por que He said me está errado?",
        "Quais padrões seguem suggest, agree e warn?",
        "Quando você usa will, going to e o presente contínuo para o futuro?"
      ]
    },
    fontes: [
      ["British Council LearnEnglish: reported speech, statements", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements"],
      ["British Council LearnEnglish: reported speech", "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/reported-speech"],
      ["British Council LearnEnglish: reported speech, questions", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-questions"],
      ["British Council LearnEnglish: reported speech, reporting verbs", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs"],
      ["British Council LearnEnglish: patterns with reporting verbs (C1)", "https://learnenglish.britishcouncil.org/free-resources/grammar/c1/patterns-reporting-verbs"],
      ["British Council LearnEnglish: future forms, will, be going to and present continuous", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous"],
      ["British Council LearnEnglish: future continuous and future perfect", "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-continuous-future-perfect"]
    ],
    cartoes: [
      { id: "g8c1", f: "Corrija: He said me that the job failed.", v: "He told me that the job had failed. (ou He said that the job failed.) Say não leva a pessoa; tell leva.", t: "g8" },
      { id: "g8c2", f: "Relate com backshift: We are testing the pipeline.", v: "He said they were testing the pipeline. Presente contínuo vira passado contínuo e we vira they.", t: "g8" },
      { id: "g8c3", f: "Relate: I will send the report tomorrow.", v: "She said she would send the report the next day. Will vira would e tomorrow vira the next day.", t: "g8" },
      { id: "g8c4", f: "Corrija: I suggest you to check the logs.", v: "I suggest checking the logs. (ou I suggest that you check the logs.) Suggest não leva infinitivo.", t: "g8" },
      { id: "g8c5", f: "Corrija: She asked me where was the file.", v: "She asked me where the file was. Pergunta relatada tem ordem de afirmação.", t: "g8" },
      { id: "g8c6", f: "Relate com if: Did you call the bank?", v: "She wanted to know if I had called the bank. Sem do, did; if para sim ou não.", t: "g8" },
      { id: "g8c7", f: "Complete: The team agreed ___ freeze deployments on Friday.", v: "to. Agree + to + verbo base.", t: "g8" },
      { id: "g8c8", f: "Complete: Security warned us ___ share credentials in chat.", v: "not to. Warn + pessoa + not to + verbo.", t: "g8" },
      { id: "g8c9", f: "Corrija: The client insisted to review the dashboard first.", v: "The client insisted on reviewing the dashboard first. Insist on + -ing.", t: "g8" },
      { id: "g8c10", f: "Quando posso manter o presente em um relato?", v: "Quando a informação ainda é verdade ou é uma verdade geral: She said the deadline is Friday.", t: "g8" },
      { id: "g8c11", f: "Diga em inglês: eu vou deixar isso pronto até sexta.", v: "I'll have it done by Friday. Will have + particípio marca o prazo com by.", t: "g8" },
      { id: "g8c12", f: "Corrija: I will meet the client tomorrow at 10 (já marcado).", v: "I'm meeting the client tomorrow at 10. Combinado marcado com alguém usa presente contínuo.", t: "g8" },
      { id: "g8c13", f: "Corrija: I will have it finished until Friday.", v: "I'll have it finished by Friday. Para prazo, use by, não until.", t: "g8" }
    ],
    questoes: [
      {
        id: "g8q1", s: 3, t: "g8",
        e: "Você está escrevendo a ata. O gerente disse na reunião: We are freezing deployments on Friday. Qual frase relata isso corretamente, com backshift?",
        o: [
          "The manager said they are freezing deployments on Friday.",
          "The manager said they were freezing deployments on Friday.",
          "The manager said me they were freezing deployments on Friday.",
          "The manager said they will freeze deployments on Friday."
        ],
        c: [1],
        x: "Com o verbo de relato no passado, o presente contínuo recua para o passado contínuo e we vira they: they were freezing. A versão com are mantém o presente, que só serve se a informação ainda fosse atual e ainda assim é menos segura. A versão com said me comete o erro de dar uma pessoa direta ao say. A versão com will freeze muda o tempo e o sentido da fala original."
      },
      {
        id: "g8q2", s: 3, t: "g8",
        e: "Qual frase de follow-up relata corretamente uma sugestão do tech lead de adicionar um retry ao job?",
        o: [
          "The lead suggested me to add a retry.",
          "The lead suggested to add a retry.",
          "The lead suggested adding a retry.",
          "The lead suggested add a retry."
        ],
        c: [2],
        x: "Suggest aceita -ing ou that + cláusula, como a página do British Council mostra: suggested adding. A versão com me to usa pessoa mais infinitivo, o que a página descarta. A versão com to add usa infinitivo, que também não funciona com suggest. A versão com add usa o verbo base solto, o que só se aceita depois de that (suggested that we add)."
      },
      {
        id: "g8q3", s: 3, t: "g8",
        e: "Escolha duas frases corretas para registrar na ata o que o time e a equipe de segurança fizeram. (Escolha duas) Choose two.",
        o: [
          "The team agreed to freeze deployments on Friday.",
          "The team agreed freezing deployments on Friday.",
          "Security warned us not to share credentials in chat.",
          "Security warned us not sharing credentials in chat."
        ],
        c: [0, 2],
        x: "Agree pede to + verbo, e warn aceita pessoa + not to + verbo, como mostram as páginas de verbos de relato. A versão com agreed freezing usa -ing, que não é o padrão de agree. A versão com warned us not sharing usa -ing depois de not, que não segue o padrão warn + pessoa + not to + verbo."
      },
      {
        id: "g8q4", s: 3, t: "g8",
        e: "Em entrevista, você conta que a gerente perguntou se você já tinha terminado o relatório. Qual frase é a correta?",
        o: [
          "She asked if I had finished the report.",
          "She asked did I finish the report.",
          "She asked if had I finished the report.",
          "She asked me that I finished the report."
        ],
        c: [0],
        x: "Em pergunta relatada de sim ou não, use if e a ordem de afirmação, com backshift: if I had finished. A versão com did I finish mantém a ordem e o did da pergunta direta. A versão com if had I inverte sujeito e auxiliar dentro da parte embutida. A versão com me that transforma a pergunta em uma afirmação."
      },
      {
        id: "g8q5", s: 3, t: "g8",
        e: "Você combinou com o cliente uma apresentação, com hora e dia marcados e confirmados. Qual frase expressa esse compromisso da forma mais natural?",
        o: [
          "We're presenting to the client on Thursday at 10.",
          "We will to present to the client on Thursday at 10.",
          "We present to the client on Thursday at 10 by.",
          "We are present to the client on Thursday at 10."
        ],
        c: [0],
        x: "Para arranjos já confirmados com outra pessoa, com hora e lugar conhecidos, o presente contínuo é a forma indicada pela página de formas de futuro do British Council. A versão com will to mistura will com to e não existe. A versão com by no fim coloca a preposição num lugar impossível. A versão com are present usa o adjetivo present, que muda o sentido."
      },
      {
        id: "g8q6", s: 3, t: "g8",
        e: "Nível C1. O cliente ainda exige o mesmo prazo hoje. Na ata de ontem, a engenheira relatou a fala dele (The deadline is Friday). Qual frase mostra, pelo tempo verbal, que o prazo continua valendo?",
        o: [
          "He said the deadline was Friday, but it changed.",
          "He said the deadline is Friday.",
          "He said the deadline would have been Friday.",
          "He said the deadline had been Friday."
        ],
        c: [1],
        x: "Segundo a página de discurso indireto, manter o presente sinaliza que a informação continua válida: he said the deadline is Friday. A versão com was seguida de but it changed informa o contrário. A versão com would have been cria um sentido hipotético que não existe. A versão com had been indica que o prazo valia antes de outro momento passado, não que ainda vale hoje."
      },
      {
        id: "g8q7", s: 3, t: "g8",
        e: "Encontre o erro. Qual frase de follow-up contém um erro de padrão de verbo de relato?",
        o: [
          "The client insisted on reviewing the dashboard first.",
          "The lead recommended adding monitoring before the migration.",
          "She warned us not to change the schema.",
          "The team agreed freezing deployments until Monday."
        ],
        c: [3],
        x: "Agree pede to + verbo, e a frase com agreed freezing usa -ing, o que está errado. A frase com insisted on reviewing segue insist on + -ing. A frase com recommended adding segue recommend + -ing. A frase com warned us not to segue warn + pessoa + not to + verbo, como no exemplo da página de verbos de relato."
      },
      {
        id: "g8q8", s: 3, t: "g8",
        e: "Você quer prometer, em um e-mail, que o relatório estará concluído antes da sexta. Qual frase expressa o prazo corretamente?",
        o: [
          "I'll have the report done until Friday.",
          "I'll have the report done by Friday.",
          "I have the report done for Friday will.",
          "I will be done the report by Friday."
        ],
        c: [1],
        x: "Will have + particípio marca algo concluído antes de um momento futuro, e by Friday dá o prazo, como na página de futuro perfeito. A versão com until indica até quando algo dura, não o limite de conclusão. A versão com Friday will é desordenada. A versão com will be done the report mistura o adjetivo done e a ordem do objeto de forma incorreta."
      },
      {
        id: "g8q9", s: 3, t: "g8",
        e: "Escolha duas frases corretas para usar no seu e-mail de follow-up depois da reunião com o cliente. (Escolha duas) Choose two.",
        o: [
          "He told me that the job had failed.",
          "He said me that the job had failed.",
          "I'm going to document the pipeline this week.",
          "I'm going to documenting the pipeline this week."
        ],
        c: [0, 2],
        x: "Tell leva a pessoa, e he told me that segue o padrão do relato. Be going to + verbo base expressa um plano já decidido. A versão com said me dá uma pessoa direta ao say, o erro típico. A versão com going to documenting usa -ing depois de to, que pede o verbo base."
      },
      {
        id: "g8q10", s: 3, t: "g8",
        e: "Nível C1. Você quer registrar, com precisão, que a equipe de segurança avisou que a situação era crítica. Qual frase usa warn de acordo com o padrão com pessoa e that?",
        o: [
          "Security warned ministers that the situation was critical.",
          "Security warned that ministers the situation was critical.",
          "Security warned to ministers that the situation was critical.",
          "Security warned ministers to that the situation was critical."
        ],
        c: [0],
        x: "A página de padrões do British Council mostra warn + pessoa + that + cláusula, com backshift quando necessário: warned ministers that the situation was critical. As outras frases desordenam esses elementos: that vem antes da pessoa, aparece um to depois de warn que o padrão não pede ou um to extra antes de that."
      },
      {
        id: "g8q11", s: 3, t: "g8",
        e: "A decisão do cliente foi ontem. O cliente disse: I will approve the plan tomorrow. Qual frase da ata de hoje relata corretamente a promessa?",
        o: [
          "The client said he will approve the plan tomorrow.",
          "The client said he would approve the plan the next day.",
          "The client said he approves the plan tomorrow.",
          "The client said he had approve the plan the next day."
        ],
        c: [1],
        x: "O will recua para would e tomorrow vira the next day, porque o relato foi escrito depois da fala. A versão com will e tomorrow mantém a perspectiva do dia da fala. A versão com approves muda o tempo e o sentido. A versão com had approve mistura had com o verbo base e não forma um tempo válido."
      },
      {
        id: "g8q12", s: 3, t: "g8",
        e: "Você quer dizer que a equipe de segurança recomendou um passo e quer registrar a recomendação. Qual frase está correta?",
        o: [
          "Security recommended me to rotate the keys.",
          "Security recommended to rotate the keys.",
          "Security recommended rotating the keys.",
          "Security recommended rotate the keys."
        ],
        c: [2],
        x: "Recommend aceita -ing, como a página do nível C1 mostra com recommends waiting. A versão com me to mistura pessoa e infinitivo, padrão que a página não confirma para recommend. A versão com to rotate usa infinitivo direto, que também não é o padrão listado. A versão com rotate usa o verbo base solto, que só funciona depois de that."
      }
    ],
    lab: treino({
      t: "Treino de fala: relatar uma reunião e assumir compromissos",
      porque: "Relato e futuro exigem escolher tempo e padrão de verbo em segundos; gravar mostra se você diz said me, suggest you to ou will para tudo.",
      antes: "Releia a tabela de verbos de relato e a de formas de futuro. Escolha uma reunião fictícia de planejamento e anote o que três pessoas disseram. Tenha papel e caneta e um lugar silencioso. Este treino é uma sugestão de prática: nada aqui foi executado por quem escreveu a aula, e o resultado depende de você.",
      cenario: "você relata a um colega ausente o que foi dito na reunião de planejamento e depois assume seus próprios compromissos.",
      chaves: "prazo, segurança, monitoramento, cliente",
      gravar: "Relate o que o gerente, a segurança e o cliente disseram, com pelo menos um suggest, um recommend, um warn e um agree, e termine com três compromissos seus usando will, going to e presente contínuo.",
      erros_contar: "said me, suggest you to, falta de backshift sem motivo, ordem de pergunta direta em relato, until em vez de by, e will para combinado marcado.",
      verificar: "Na segunda gravação você usa pelo menos quatro verbos de relato com o padrão certo, usa tell e say de modo correto e termina com compromissos que combinam a forma de futuro com o grau de certeza. Você tem menos traços do que na primeira.",
      errosLab: [
        { s: "Digo said me ou suggest you to", c: "Tradução direta de disse a mim e sugiro a você.", r: "Antes de gravar, escreva três frases corretas (He told me..., I suggest checking...) e use-as de propósito." },
        { s: "Recuo o tempo de modo inconsistente", c: "Misturar o tempo do relato com o da fala original.", r: "Escolha uma regra por gravação: sempre recuar. Depois, na regravação, experimente manter o presente apenas para o que ainda vale." }
      ]
    })
  };

})(typeof globalThis !== 'undefined' ? globalThis : this);
