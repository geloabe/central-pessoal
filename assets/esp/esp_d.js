(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var PLAN = ["Instituto Cervantes: Plan curricular (Niveles de referencia para el español)", "https://cervantes.org/es/sobre-nosotros/publicaciones/plan-curricular-instituto-cervantes-niveles-referencia-espanol"];
  var DELE = ["Instituto Cervantes: exámenes DELE (níveis A1 a C2)", "https://cervantes.org/es/examenes/dele"];

  /* ===================== AULA 13 ===================== */
  C.dias[13] = {
    aula: {
      titulo: "Passado, primeiro contato: pretérito perfecto e pretérito indefinido",
      resumo: "Como contar o que você fez no trabalho em espanhol: 'he trabajado' (pretérito perfecto, ligado ao presente) e 'trabajé / fui / hice / tuve' (pretérito indefinido, passado fechado), os particípios irregulares mais úteis, os marcadores de tempo e o motivo de o 'tenho trabalhado' do português NÃO ser o 'he trabajado' do espanhol.",
      simples: {
        analogia: "Imagine duas gavetas na sua mesa. Na gaveta 'este período ainda não acabou' ficam hoje, esta semana, este mês e o 'já' de uma tarefa que ainda importa agora: aí você usa he/has/ha + particípio, o pretérito perfecto. Na gaveta 'esse tempo já fechou' ficam ontem, o ano passado, em 2022 e 'faz dois anos': aí você usa o pretérito indefinido, com verbos como fui, hice, tuve, estuve, dije, pude. Antes de falar, olhe o marcador de tempo da frase e abra a gaveta certa. O português engana porque 'tenho trabalhado' parece o he trabajado, mas em português ele quase sempre diz que a ação se repete ou continua; em espanhol, 'he trabajado' costuma equivaler a 'trabalhei' (por exemplo, 'trabalhei hoje') dentro de um período que ainda não acabou. Atenção: na América Latina o indefinido aparece com muito mais frequência do que esse esquema de manual sugere, inclusive com 'hoy' e 'ya'; aqui treinamos o contraste básico.",
        pontos: [
          "Período que ainda não acabou (hoy, esta semana, este mes, ya, todavía no): pretérito perfecto, he/has/ha + particípio. Na América Latina, o indefinido também é comum nesses casos.",
          "Período fechado (ayer, el año pasado, en 2022, hace dos años): pretérito indefinido (trabajé, fui, hice).",
          "Particípios regulares: -ar vira -ado (trabajado) e -er/-ir viram -ido (comido, vivido).",
          "Seis particípios irregulares para decorar já: hecho, dicho, escrito, visto, puesto, abierto.",
          "Cuidado: 'tenho trabalhado' do português não equivale a 'he trabajado'; o auxiliar do perfecto em espanhol é haber, não tener."
        ],
        paraQueServe: "Dar o status do trabalho em espanhol ('Ya he enviado el informe', 'Ayer hice la revisión', 'Todavía no he terminado') sem confundir os dois passados."
      },
      glossario: [
        { t: "Pretérito perfecto compuesto", d: "Verbo haber (he, has, ha, hemos, han) + particípio; o passado visto como parte de um período que chega até o presente." },
        { t: "Pretérito indefinido", d: "Passado fechado e situado num momento preciso (trabajé, fui, hice); combina com ayer, el año pasado, en 2022." },
        { t: "Participio", d: "Forma do verbo que vem depois de haber: trabajado, comido, vivido; irregulares como hecho e dicho." },
        { t: "Marcador temporal", d: "Palavra que indica o tempo da frase (hoy, ayer, ya, todavía no, el año pasado) e ajuda a escolher o passado." },
        { t: "Verbo irregular", d: "Verbo cuja raiz muda no indefinido: hacer vira hice, tener vira tuve, decir vira dije, poder vira pude." },
        { t: "ir / ser (fui)", d: "No indefinido, os dois verbos têm a mesma forma: fui, fuiste, fue, fuimos, fueron. O contexto diz se é 'fui' (de ir) ou 'fui' (de ser)." },
        { t: "ya / todavía no", d: "ya = já; todavía no = ainda não. Combinam com o pretérito perfecto: 'Ya he enviado', 'Todavía no he terminado'." }
      ],
      blocos: [
        {
          t: "Duas gavetas: perfecto ou indefinido?",
          facil: "Traduzindo: se o tempo ainda não acabou (hoje, esta semana), use he + particípio; se já fechou (ontem, ano passado), use trabajé, fui, hice.",
          p: [
            "Os manuais de espanhol costumam apresentar os dois passados lado a lado: o indefinido, para ações passadas situadas num momento preciso, e o perfecto, para ação passada com relevância no presente, com marcadores como hoy, ya e todavía no. Esta explicação é nossa, de uso geral; vale conferir também num manual de gramática.",
            "Na prática, a pergunta é: o período em que a ação aconteceu já fechou? 'Hoy he enviado tres informes' fala de hoje, que ainda está em curso. 'Ayer envié tres informes' fala de um dia que já acabou. O verbo muda junto com o marcador.",
            "Regra de bolso: marcador de período aberto, perfecto; marcador de data ou período encerrado, indefinido. Essa é a regra de manual; na fala, sobretudo na América Latina, o indefinido também aparece com marcadores como hoy e ya, enquanto na Espanha o perfecto é mais frequente nesses casos."
          ],
          tabela: {
            cab: ["Marcador", "Passado", "Exemplo de trabalho"],
            linhas: [
              ["hoy, esta semana, este mes", "Perfecto", "Esta semana he terminado la consulta."],
              ["ya, todavía no", "Perfecto", "Todavía no he recibido los datos."],
              ["ayer, anoche, el lunes", "Indefinido", "Ayer recibí los datos."],
              ["el año pasado, en 2022, hace dos años", "Indefinido", "En 2022 cambié de empresa."]
            ]
          },
          dica: "Se a frase tem uma data exata, ayer ou 'hace + tempo', é indefinido. Se tem hoy, esta semana ou ya, é perfecto.",
        },
        {
          t: "Como formar o pretérito perfecto: he + particípio",
          facil: "Traduzindo: haber (he, has, ha, hemos, han) mais o particípio. Particípio de -ar termina em -ado; de -er e -ir termina em -ido.",
          p: [
            "A fórmula tem duas peças. Primeira: o presente do verbo haber, que é he, has, ha, hemos, habéis (Espanha) e han. Segunda: o particípio, que termina em -ado para os verbos em -ar (trabajado, cargado, enviado) e em -ido para os verbos em -er e -ir (comido, vivido, recibido). Depois de haber o particípio não muda nunca: 'he enviado', 'hemos enviado', 'han enviado', sempre -ado.",
            "O pronome vai antes do he, nunca no meio: 'Lo he enviado', 'Ya la he revisado'. Em português escrito formal também se vê o pronome depois do verbo ('enviei-o'); em espanhol, com he + particípio, o pronome fica antes de haber e nada entra entre haber e o particípio.",
            "Os exemplos abaixo são nossos, para treinar: repare que haber muda com a pessoa (he, has, ha, hemos, han) e o particípio fica igual."
          ],
          lista: [
            "Yo he trabajado todo el día. (trabalhei o dia todo)",
            "Tú has cargado el archivo. (você carregou o arquivo)",
            "Ella ha revisado el informe. (ela revisou o relatório)",
            "Nosotros hemos terminado la entrega. (terminamos a entrega)",
            "Ustedes han recibido el correo. (vocês receberam o e-mail)"
          ],
          dica: "Particípio depois de haber nunca concorda com gênero ou número: 'las tablas que he revisado', e não 'revisadas'.",
        },
        {
          t: "Seis particípios irregulares para decorar",
          facil: "Traduzindo: hecho, dicho, escrito, visto, puesto, abierto. Decore como palavras soltas, com uma frase de trabalho para cada.",
          p: [
            "Os particípios irregulares mais úteis no trabalho são seis. A lista é uma seleção nossa de uso frequente; existem outros, como vuelto, roto e cubierto.",
            "Hacer vira hecho: 'He hecho el informe'. Decir vira dicho: 'Me ha dicho que sí'. Escribir vira escrito: 'He escrito el código'. Ver vira visto: 'He visto el error'. Poner vira puesto: 'He puesto el archivo en la nube'. Abrir vira abierto: 'He abierto la tabla'.",
            "Os verbos derivados seguem o molde: deshacer vira deshecho e descubrir vira descubierto. Volver (vuelto) é outro irregular comum. Por enquanto, fique com os seis e treine em voz alta."
          ],
          tabela: {
            cab: ["Infinitivo", "Particípio", "Frase para dizer"],
            linhas: [
              ["hacer", "hecho", "He hecho la revisión."],
              ["decir", "dicho", "Ya lo he dicho en la reunión."],
              ["escribir", "escrito", "He escrito la consulta."],
              ["ver", "visto", "No he visto el error."],
              ["poner", "puesto", "He puesto el plazo en el calendario."],
              ["abrir", "abierto", "He abierto un ticket."]
            ]
          },
          dica: "Não existe 'hacido', 'decido' nem 'escribido': se o infinitivo é um desses seis, decore a forma irregular.",
        },
        {
          t: "Pretérito indefinido: os verbos que você mais vai usar",
          facil: "Traduzindo: com ayer, el año pasado ou en 2022, use trabajé, fui, hice, tuve, estuve, dije, pude. Muitos mudam a raiz e não têm acento.",
          p: [
            "O indefinido regular é parecido nas três conjugações: trabajar vira trabajé, trabajaste, trabajó, trabajamos, trabajaron; comer e vivir viram comí, comiste, comió, comimos, comieron. Verbos muito frequentes, como tener, hacer e estar, são irregulares na raiz.",
            "Os irregulares de raiz mudada não levam acento na primeira e na terceira pessoa do singular: hacer vira hice e hizo; tener vira tuve e tuvo; estar vira estuve e estuvo; decir vira dije e dijo (e dijeron, sem o 'i'); poder vira pude e pudo. Ir e ser são idênticos: fui, fuiste, fue, fuimos, fueron.",
            "Cuidado com o acento nos regulares: trabajé e trabajó levam acento, e é ele que diferencia trabajó (indefinido) de trabajo (presente, yo). As formas dos irregulares acima não levam acento: 'hice', 'tuve', 'dije'."
          ],
          tabela: {
            cab: ["Infinitivo", "yo", "él / ella / usted", "ellos / ustedes"],
            linhas: [
              ["ir / ser", "fui", "fue", "fueron"],
              ["hacer", "hice", "hizo", "hicieron"],
              ["tener", "tuve", "tuvo", "tuvieron"],
              ["estar", "estuve", "estuvo", "estuvieron"],
              ["decir", "dije", "dijo", "dijeron"],
              ["poder", "pude", "pudo", "pudieron"]
            ]
          },
          dica: "Quando a raiz mudou (tuv-, estuv-, hic-, dij-, pud-), as terminações são -e, -iste, -o, -imos, -ieron (depois de j, -eron: dijeron), sem acento.",
        },
        {
          t: "Marcadores de tempo que escolhem o passado",
          facil: "Traduzindo: hoy, esta semana, ya e todavía no vão com he + particípio; ayer, el año pasado e hace dos años vão com trabajé, fui, hice.",
          p: [
            "O contraste entre perfecto e indefinido é um conteúdo clássico de manuais de nível A2. Os marcadores a seguir são os que costumam ser ensinados, como regra geral de manual. Na América Latina o indefinido é mais frequente do que o manual sugere (por exemplo, 'Hoy llegué tarde' ou 'Ya terminé'), então não estranhe se ouvir isso.",
            "Com perfecto: hoy, esta mañana, esta semana, este mes, este año, ya, todavía no, nunca, alguna vez. 'Todavía no he terminado' é uma frase de status muito útil: significa 'ainda não terminei' e deixa claro que a tarefa continua em aberto. 'Ya he terminado' é o 'já terminei'.",
            "Com indefinido: ayer, anoche, el lunes, la semana pasada, el año pasado, en 2022, hace dos años, 'el otro día'. 'Hace dos años' conta a partir de hoje e fecha o tempo: 'Hace dos años fui a México'.",
            "Para falar de quanto tempo você trabalha em algo, o espanhol usa muitas vezes o presente, como o português: 'Trabajo aquí desde 2020' ou 'Trabajo en datos desde hace seis años'. Regra geral, sem citação."
          ],
          dica: "Quando a frase tiver 'ya' ou 'todavía no', pense em status: está pronto agora ou ainda não? Use he + particípio.",
        },
        {
          t: "Armadilhas de brasileiro: 'tenho trabalhado' não é 'he trabajado'",
          facil: "Traduzindo: em português 'tenho feito' é repetição ou continuidade; em espanhol 'he hecho' é só 'fiz' num período que ainda não fechou.",
          p: [
            "Este bloco reúne erros comuns de falantes de português; tudo aqui é observação nossa.",
            "Primeiro engano: traduzir 'tenho trabalhado muito' por 'tengo trabajado'. Em espanhol, o auxiliar do perfecto é haber, não tener: 'He trabajado mucho'. ('Tengo trabajado' existe em outros usos, com valor de resultado, mas não é o perfecto que estudamos.) Segundo engano, o inverso: achar que 'he trabajado' sempre carrega a ideia de repetição. Em espanhol, 'Hoy he enviado el informe' é um fato único, equivalente a 'Hoje enviei o relatório'. Para a ideia de continuidade do 'tenho trabalhado muito' do português, o espanhol costuma usar o presente: 'Últimamente trabajo mucho'.",
            "Terceiro: usar o perfecto com data fechada, como 'He ido a México el año pasado'. O certo é 'Fui a México el año pasado'. Quarto: confundir fui (de ir) com fui (de ser) e desconfiar. O contexto resolve: 'Fui a la reunión' (ir) e 'Fui el responsable' (ser).",
            "Quinto, a trilha do portuñol: escrever 'trabalhé' em vez de 'trabajé' (em espanhol é j, não lh) ou dizer 'tenía trabajado' tentando imitar o português 'tinha trabalhado'; o espanhol usa 'había trabajado'.",
            "Uma observação de uso, nossa e de caráter geral: em boa parte da América Latina o indefinido é mais frequente do que o perfecto, inclusive em contextos de período aberto ('Hoy llegué tarde', 'Ya terminé'); na Espanha o perfecto é mais usado nesses casos. Para A2, aprenda o contraste de manual e não estranhe se ouvir o indefinido com 'hoy'."
          ],
          armadilha: "Não use 'tener' como auxiliar ('tengo trabajado'): use haber (he trabajado). E não combine he + particípio com data fechada ('ayer he trabajado' é a confusão clássica).",
        }
      ],
      exemplo: {
        t: "Um stand-up com os dois passados",
        texto: "Ana pergunta no stand-up: '¿Cómo va la entrega?' Resposta modelo: 'Esta semana he terminado la consulta y he revisado la tabla de clientes. Ayer hice la prueba con los datos de octubre y encontré un error en el archivo. Hoy he abierto un ticket y ya se lo he dicho al equipo. Todavía no he recibido la respuesta del servidor, pero espero tenerla mañana.' Repare nos dois grupos: com 'esta semana', 'hoy', 'ya' e 'todavía no' o verbo está no perfecto (he terminado, he abierto, he dicho, he recibido); com 'ayer' o verbo está no indefinido (hice, encontré). Note também os particípios irregulares hecho, abierto e dicho e o pronome antes do auxiliar: 'se lo he dicho'."
      },
      prova: [
        "Stand-up: dizer o que você já fez hoje e o que ainda não terminou (he terminado, todavía no he terminado).",
        "Reunião: contar o que aconteceu ontem com hice, estuve, tuve, dije, pude.",
        "Slack: responder 'Ya lo he enviado' ou 'Ya lo envié' conforme o marcador de tempo.",
        "Entrevista simples: dizer onde você trabalhou em 2022 com um indefinido (trabajé, fui, hice)."
      ],
      explique: "Explique com as próprias palavras quando usar he + particípio e quando usar o indefinido em espanhol, e por que 'tenho trabalhado' não se traduz por 'tengo trabajado'. Dê um exemplo seu de cada.",
      checagem: [
        "Que marcadores de tempo combinam com o pretérito perfecto e quais combinam com o indefinido?",
        "Quais são os seis particípios irregulares desta aula e como você os usa numa frase de trabalho?",
        "Qual é a forma de fui, hice, tuve, estuve, dije e pude, e o que muda na terminação dos irregulares?"
      ]
    },
    fontes: [PLAN, DELE],
    cartoes: [
      { id: "e13c1", f: "Diga em espanhol: 'Hoje eu terminei a consulta.'", v: "Hoy he terminado la consulta. 'Hoy' é período aberto: he + particípio (-ado).", t: "e13" },
      { id: "e13c2", f: "Diga: 'Ontem eu terminei a consulta.'", v: "Ayer terminé la consulta. 'Ayer' fecha o tempo: indefinido, com acento em -é.", t: "e13" },
      { id: "e13c3", f: "Diga: 'Ainda não recebi os dados.'", v: "Todavía no he recibido los datos. 'Todavía no' pede he + particípio (-ido).", t: "e13" },
      { id: "e13c4", f: "Diga: 'Já enviei o relatório.'", v: "Ya he enviado el informe. 'Ya' + he + particípio; o particípio de enviar é enviado.", t: "e13" },
      { id: "e13c5", f: "Diga o particípio de hacer e use numa frase de trabalho.", v: "Hecho: 'He hecho la revisión.' Irregular: não existe 'hacido'.", t: "e13" },
      { id: "e13c6", f: "Diga: 'Eu já disse isso na reunião.'", v: "Ya lo he dicho en la reunión. Decir vira dicho e o 'lo' vem antes do he.", t: "e13" },
      { id: "e13c7", f: "Diga: 'Abri um ticket.' (perfecto)", v: "He abierto un ticket. Abrir tem particípio irregular: abierto.", t: "e13" },
      { id: "e13c8", f: "Diga: 'Eu fui à reunião ontem.'", v: "Ayer fui a la reunión. Fui (de ir) é indefinido, igual ao fui de ser.", t: "e13" },
      { id: "e13c9", f: "Diga: 'Eu tive um problema no servidor.'", v: "Tuve un problema en el servidor. Tener vira tuve no indefinido, sem acento.", t: "e13" },
      { id: "e13c10", f: "Diga: 'Nós fizemos o teste no ano passado.'", v: "El año pasado hicimos la prueba. Hacer vira hic- no indefinido: hicimos.", t: "e13" },
      { id: "e13c11", f: "Corrija em voz alta: 'Tengo trabajado mucho esta semana.'", v: "He trabajado mucho esta semana. O auxiliar é haber, não tener.", t: "e13" },
      { id: "e13c12", f: "Corrija: 'Ayer he enviado el archivo.'", v: "Ayer envié el archivo. Com 'ayer' (tempo fechado) use indefinido, não he + particípio.", t: "e13" },
      { id: "e13c13", f: "Diga: 'Eu não pude abrir o arquivo.'", v: "No pude abrir el archivo. Poder vira pude no indefinido, sem acento.", t: "e13" },
      { id: "e13c14", f: "Diga: 'Ela disse que sim.' (indefinido)", v: "Ella dijo que sí. Decir vira dijo; 'dijeron' não tem 'i' antes do -eron.", t: "e13" }
    ],
    questoes: [
      {
        id: "e13q1", s: 4, t: "e13",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'Esta semana ___ el informe.'",
        o: ["he terminado", "terminaba", "terminando", "había terminado"],
        c: [0],
        x: "Com 'esta semana' o período ainda está aberto, então se usa o pretérito perfecto: he terminado. As outras formas não dizem 'terminei nesta semana': 'terminaba' é imperfecto (cenário ou hábito), 'terminando' é um gerúndio solto, sem 'estoy', e 'había terminado' é um passado anterior a outro passado, outro conteúdo. Observação: em parte da América Latina também se ouve 'esta semana terminé el informe'; aqui treinamos o contraste de manual."
      },
      {
        id: "e13q2", s: 4, t: "e13",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'Ayer ___ a la reunión con el equipo.'",
        o: ["he ido", "iba", "fui", "voy"],
        c: [2],
        x: "'Ayer' fecha o tempo e pede o indefinido: fui. A forma 'he ido' é o perfecto e combina com hoy ou esta semana, não com ontem. 'Iba' é o imperfecto, que descreve hábito ou cenário e não um fato pontual. 'Voy' é o presente e ficaria sem sentido de passado. Lembre que fui é a mesma forma para ir e ser."
      },
      {
        id: "e13q3", s: 4, t: "e13",
        e: "¿Cuál es el participio de 'hacer'? (Qual é o particípio de 'hacer'?)",
        o: ["hacido", "hecho", "hizo", "haciendo"],
        c: [1],
        x: "O particípio irregular de hacer é hecho: 'He hecho el informe'. A forma 'hacido' é um erro típico de quem aplica a regra regular onde ela não vale. 'Hizo' é a forma de ele/ela do indefinido, não um particípio. 'Haciendo' é o gerúndio ('estoy haciendo'), usado para ação em andamento, não depois de haber."
      },
      {
        id: "e13q4", s: 4, t: "e13",
        e: "Elige las dos opciones con participio irregular. (Escolha duas)",
        o: ["escrito", "trabajado", "visto", "comido"],
        c: [0, 2],
        x: "Escrito (de escribir) e visto (de ver) são irregulares e precisam ser decorados. Trabajado segue a regra regular de -ar para -ado, e comido segue a regra regular de -er para -ido; por isso nenhum dos dois entra no grupo dos irregulares. A pegadinha é achar que 'comido' é estranho: é só regular, como vivido."
      },
      {
        id: "e13q5", s: 4, t: "e13",
        e: "Elige la frase correcta para decir 'Ainda não terminei'. (Escolha a frase correta.)",
        o: ["Todavía no terminado.", "Todavía no he terminado.", "Todavía no he terminé.", "Todavía no terminaba."],
        c: [1],
        x: "'Todavía no' marca que a tarefa segue em aberto e combina com o perfecto: he terminado. 'Todavía no terminado' fica sem verbo conjugado; 'he terminé' mistura o auxiliar com o indefinido; 'terminaba' é imperfecto, que descreve cenário ou hábito, e não o status da tarefa. (Na fala latino-americana também se ouve 'Todavía no terminé', mas aqui a forma de manual é he terminado.)"
      },
      {
        id: "e13q6", s: 4, t: "e13",
        e: "¿Qué frase está bien? (Qual frase está certa?)",
        o: ["El año pasado he cambiado de empresa.", "El año pasado cambié de empresa.", "El año pasado tengo cambiado de empresa.", "El año pasado cambio de empresa."],
        c: [1],
        x: "'El año pasado' é um tempo fechado, então vai com o indefinido: cambié. A frase com he cambiado mistura perfecto com tempo fechado, um erro comum. A frase com 'tengo cambiado' repete o erro do auxiliar tener. A frase com 'cambio' está no presente e não conta o fato passado."
      },
      {
        id: "e13q7", s: 4, t: "e13",
        e: "Elige las dos frases que usan bien un marcador. (Escolha duas)",
        o: ["Hoy he enviado el archivo.", "Ayer he enviado el archivo.", "Ayer envié el archivo.", "Hoy envié el archivo ayer."],
        c: [0, 2],
        x: "'Hoy he enviado' usa o perfecto com um período aberto, e 'ayer envié' usa o indefinido com um tempo fechado: as duas seguem o contraste de manual. 'Ayer he enviado' mistura perfecto com tempo fechado. A frase 'Hoy envié el archivo ayer' junta hoy e ayer na mesma oração e não tem sentido. Lembre que no uso real é comum ouvir o indefinido com hoy; aqui treinamos o contraste básico."
      },
      {
        id: "e13q8", s: 4, t: "e13",
        e: "Completa: 'Yo ___ un problema en el servidor ayer.' (Complete.)",
        o: ["tené", "tuve", "tengué", "tuvo"],
        c: [1],
        x: "Tener é irregular no indefinido e vira tuve para yo, sem acento. 'Tené' tenta aplicar a terminação regular na raiz errada. 'Tengué' inventa uma forma com o g do presente. 'Tuvo' é a forma de ele/ela/usted e não concorda com 'yo'. O verbo concorda com a pessoa: yo tuve, él tuvo."
      },
      {
        id: "e13q9", s: 4, t: "e13",
        e: "Elige la traducción de 'Eu disse isso na reunião ontem'. (Escolha a tradução.)",
        o: ["Dije eso en la reunión ayer.", "Dicé eso en la reunión ayer.", "He dicho eso en la reunión ayer.", "Dijé eso en la reunión ayer."],
        c: [0],
        x: "Decir é irregular no indefinido e vira dije para yo. 'Dicé' e 'dijé' são formas inexistentes: uma aplica a regra regular, a outra mistura a raiz irregular com a terminação regular. A frase com he dicho usa o perfecto junto com 'ayer', que fecha o tempo e pede o indefinido. Repare que 'dije' não leva acento, como todos os irregulares de raiz mudada."
      },
      {
        id: "e13q10", s: 4, t: "e13",
        e: "¿Dónde va el pronombre? 'Ya ___ el informe.' (Onde vai o pronome? Complete: 'Ya o enviei.')",
        o: ["he lo enviado", "lo he enviado", "he enviado lo", "he enviadolo"],
        c: [1],
        x: "Em espanhol o pronome de objeto vai antes do auxiliar: lo he enviado. Nenhuma palavra entra entre haber e o particípio, então 'he lo enviado' está errado. Pôr o pronome depois do particípio, solto ou colado, é transferência do português ('enviei-o') e não se usa com o perfecto. A ordem certa é pronome + haber + particípio."
      },
      {
        id: "e13q11", s: 4, t: "e13",
        e: "Elige las dos ideas verdaderas sobre 'he trabajado'. (Escolha duas)",
        o: ["O auxiliar é haber, não tener.", "Quer dizer sempre 'tenho trabalhado' (repetição).", "Pode traduzir 'trabalhei hoje' para um período aberto.", "Concorda em gênero e número com o objeto."],
        c: [0, 2],
        x: "O auxiliar do perfecto é haber, e por isso 'he trabajado' não usa tener. Num período ainda aberto, como hoy, ele equivale ao 'trabalhei hoje' do português. A ideia de repetição ou continuidade do 'tenho trabalhado' do português não é o significado de 'he trabajado'. E o particípio depois de haber não concorda com gênero nem número: é invariável (he revisado las tablas)."
      },
      {
        id: "e13q12", s: 4, t: "e13",
        e: "Elige la frase correcta. (Escolha a frase correta.)",
        o: ["Yo hací la prueba.", "Yo hice la prueba.", "Yo hizo la prueba.", "Yo he hizo la prueba."],
        c: [1],
        x: "Hacer vira hice na primeira pessoa do indefinido: 'hice la prueba'. 'Hací' aplica a terminação regular e erra a raiz. 'Hizo' é a forma de ele/ela/usted e não concorda com 'yo'. 'He hizo' mistura o auxiliar do perfecto com o indefinido; depois de haber o certo seria o particípio hecho."
      },
      {
        id: "e13q13", s: 4, t: "e13",
        e: "Elige la frase que significa 'Já abri o arquivo'. (Escolha a frase.)",
        o: ["Ya he abrido el archivo.", "Ya he abierto el archivo.", "Ya abriendo el archivo.", "Ya tengo abierto el archivo."],
        c: [1],
        x: "Abrir tem particípio irregular, abierto, e com 'ya' se usa o perfecto: ya he abierto. 'Abrido' aplica a regra regular onde ela não vale. 'Abriendo' é gerúndio e descreve ação em andamento, não o 'já abri'. A frase com 'tengo abierto' é gramatical, mas descreve o estado do arquivo (está aberto comigo), não o ato de abrir."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: contar a semana com dois passados",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Falar em voz alta mostra se he + particípio e os irregulares saem sem você pensar. Ouvir a gravação ajuda a achar o erro que mais se repete.",
      antes: "Ter lido a aula e as frases-modelo em voz alta uma vez. Deixar anotadas três coisas que você fez esta semana e duas que fez ontem. Escolher um lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste as frases ao seu jeito de falar e ao seu trabalho.",
      passos: [
        { t: "Preparar 5 palavras-chave", p: "Anote em papel cinco verbos que você usa no trabalho (por exemplo enviar, revisar, abrir, hacer, decir). Anote ao lado o particípio e a forma do indefinido de cada um." },
        { t: "Ouvir e repetir os modelos", p: "Leia em voz alta cinco frases da aula (duas com hoy ou esta semana, duas com ayer, uma com todavía no). Repita cada uma duas vezes, devagar, marcando he e a terminação do particípio." },
        { t: "Gravar a primeira versão (2 min)", p: "Grave-se contando o status da semana: 'Esta semana he…', 'Ayer…', 'Todavía no he…'. Use pelo menos um particípio irregular e um verbo irregular no indefinido." },
        { t: "Ouvir e comparar", p: "Escute uma vez e marque no papel: quantas vezes usou haber certo, se esqueceu o pronome antes do he e se usou perfecto com ayer." },
        { t: "Regravar corrigindo", p: "Grave de novo (2 min) corrigindo os erros marcados. Se der, grave uma terceira versão só da parte mais difícil." }
      ],
      verificar: "Na segunda gravação você disse pelo menos 3 frases com he/ha + particípio, 2 frases com indefinido e ayer, 1 particípio irregular (hecho, dicho, escrito, visto, puesto ou abierto), 'todavía no he…' ao menos uma vez, e nenhuma frase com 'tengo + particípio' ou 'ayer he…'.",
      limpar: [
        "Apague as gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na aula 16, se quiser.",
        "Anote numa linha o erro que mais apareceu, para focar nele no cartão de amanhã."
      ],
      erros: [
        { s: "Travo e não lembro o particípio", c: "Tentar lembrar a regra antes de falar.", r: "Olhe a lista dos seis irregulares e fale a frase-modelo trocando só uma palavra; aceite pausas e continue." },
        { s: "Digo 'tengo trabajado'", c: "Hábito do português ('tenho trabalhado').", r: "Escreva 'haber, não tener' num papel ao lado do celular e regrave só essas frases." },
        { s: "Não sei se falei o tempo certo", c: "Ouvir sem um critério.", r: "Ouça procurando uma coisa por vez: primeiro o marcador (hoy, ayer), depois o verbo." },
        { s: "Misturo fui de ir e de ser", c: "As duas formas são iguais e o cérebro estranha.", r: "Fale sempre fui + lugar (fui a la reunión) ou fui + profissão; o contexto desfaz a dúvida." }
      ]
    }
  };

  /* ===================== AULA 14 ===================== */
  C.dias[14] = {
    aula: {
      titulo: "Comparar, preferir e opinar: más que, tan como, creo que, estoy de acuerdo",
      resumo: "Como comparar ferramentas, prazos e opções em espanhol (más/menos… que, tan… como, mejor, peor, mayor, menor, el más…), dizer o que você prefere e dar opinião com 'creo que', 'me parece que' e 'en mi opinión', e concordar ou discordar com educação numa reunião.",
      simples: {
        analogia: "Pense numa balança de feira com dois pratos. Quando um prato pesa mais, você diz 'más… que'. Quando pesam igual, 'tan… como'. Quando pesa menos, 'menos… que'. Em espanhol a estrutura é sempre a mesma: um adjetivo ou advérbio no meio, e o segundo prato vem depois de 'que' ou 'como'. Há só quatro adjetivos que fogem da balança e têm peso próprio: mejor, peor, mayor e menor. Depois da comparação vem a opinião: você coloca a balança na mesa e diz 'creo que Python es más rápido de escribir' ou 'me parece que esta opción es mejor'. E, em reunião, você ainda precisa saber dizer 'estoy de acuerdo' ou 'no estoy de acuerdo, pero…' sem soar seco. Treine uma balança por vez.",
        pontos: [
          "Superioridade: más + adjetivo + que (más rápido que). Inferioridade: menos + adjetivo + que.",
          "Igualdade: tan + adjetivo + como (tan claro como). Com substantivo: tanto/a/os/as + substantivo + como.",
          "Quatro irregulares: mejor (melhor), peor (pior), mayor (maior ou mais velho), menor (menor ou mais novo).",
          "Opinião: creo que, me parece que, en mi opinión, para mí; preferência: prefiero X a Y.",
          "Acordo e desacordo: estoy de acuerdo, no estoy de acuerdo, sí, es verdad, pero…"
        ],
        paraQueServe: "Comparar opções técnicas, dar sua opinião e concordar ou discordar com educação em reuniões e mensagens de trabalho em espanhol."
      },
      glossario: [
        { t: "Comparativo de superioridade", d: "Estrutura más + adjetivo + que: 'Este informe es más claro que el otro'." },
        { t: "Comparativo de igualdade", d: "Estrutura tan + adjetivo + como: 'La consulta es tan rápida como la anterior'." },
        { t: "Comparativo de inferioridade", d: "Estrutura menos + adjetivo + que: 'El plazo es menos largo que el del año pasado'." },
        { t: "mejor / peor", d: "Comparativos irregulares de bueno e malo: mejor e peor. Não se diz 'más mejor', e 'más bueno' não é a forma habitual de comparar." },
        { t: "Superlativo relativo", d: "Estrutura el/la/los/las + más + adjetivo: 'el más rápido', 'la opción más segura'." },
        { t: "Creo que / me parece que", d: "Fórmulas para dar opinião; 'creo que' é direta e 'me parece que' é mais suave." },
        { t: "Estoy de acuerdo", d: "Expressão fixa para concordar; para discordar se diz 'no estoy de acuerdo'." }
      ],
      blocos: [
        {
          t: "Más… que, menos… que e tan… como",
          facil: "Traduzindo: más que é 'mais do que', menos que é 'menos do que' e tan como é 'tão quanto'. O segundo termo entra depois de que ou como.",
          p: [
            "Os manuais costumam separar três tipos de comparativo: superioridade com 'más… que', igualdade com 'tan… como' e inferioridade com 'menos… que'. Exemplos clássicos: 'Juan es más alto que yo' e 'Juan es tan alto como yo'.",
            "Adaptando para o trabalho (frases nossas, para treinar): 'Esta tabla es más grande que la otra', 'El servidor es tan rápido como el anterior', 'La reunión de hoy es menos larga que la de ayer'. O adjetivo fica no meio e concorda com o sujeito: 'la consulta es más rápida', 'los informes son más claros'.",
            "Com substantivos, a igualdade usa tanto, tanta, tantos ou tantas, que concordam com o substantivo: 'Tenemos tantos datos como ustedes'. Com verbos, usa-se 'tanto como': 'Trabajo tanto como tú'.",
            "Número depois de 'más' pede 'de', não 'que': 'más de diez archivos', 'menos de cinco errores'. Regra geral, sem citação."
          ],
          tabela: {
            cab: ["Ideia", "Estrutura", "Exemplo de trabalho"],
            linhas: [
              ["mais do que", "más + adj. + que", "El panel es más claro que el informe."],
              ["menos do que", "menos + adj. + que", "El plazo es menos largo que antes."],
              ["tão quanto", "tan + adj. + como", "Esta consulta es tan rápida como esa."],
              ["tantos quanto", "tanto/a/os/as + subst. + como", "Hay tantos errores como ayer."],
              ["mais de + número", "más de + número", "Hay más de diez tablas."]
            ]
          },
          dica: "'Que' fecha o prato desigual (más/menos) e 'como' fecha o prato igual (tan). Não troque: 'tan que' e 'más como' são erros.",
        },
        {
          t: "Mejor, peor, mayor, menor: os quatro irregulares",
          facil: "Traduzindo: mejor é 'melhor', peor é 'pior', mayor é 'maior' ou 'mais velho', menor é 'menor' ou 'mais novo'. Não diga 'más bueno'.",
          p: [
            "Mejor, peor, mayor e menor são os quatro comparativos irregulares mais frequentes e valem a pena já nesta fase.",
            "Mejor é o comparativo de bueno: 'Esta opción es mejor que la anterior'. Peor é o de malo: 'El resultado es peor que el de ayer'. Eles já trazem o 'mais' dentro, então 'más mejor' e 'más peor' estão errados. Para advérbios a regra é a mesma: 'Funciona mejor', 'Lo hicimos peor'.",
            "Mayor e menor servem para idade e para importância ou quantidade: 'mi hermano mayor', 'la mayor parte del equipo', 'el menor error'. Para tamanho físico, no dia a dia se diz 'más grande' e 'más pequeño': 'Esta tabla es más grande que la otra'. Essa preferência de uso é regra geral, sem citação.",
            "Cuidado com bueno antes de substantivo: 'un buen informe', 'un mal día' (bueno e malo perdem a última letra antes de substantivo masculino singular). Regra geral, sem citação."
          ],
          lista: [
            "Esta solución es mejor que la anterior.",
            "El servidor nuevo funciona mejor.",
            "El resultado de hoy es peor que el de ayer.",
            "Mi jefe es mayor que yo.",
            "Este error es menor que el otro."
          ],
          dica: "Mejor e peor nunca recebem 'más'. Se você ouvir seu cérebro dizer 'más bom', troque por mejor.",
        },
        {
          t: "El más…, la más…: o superlativo",
          facil: "Traduzindo: 'o mais rápido' é 'el más rápido'. Artigo + más + adjetivo. Para dizer 'de quê', use 'de'.",
          p: [
            "Regra geral: o artigo concorda com o substantivo, e depois vem más + adjetivo. O superlativo absoluto, com 'muy' ('muy bueno'), é mais simples e aparece antes.",
            "Exemplos nossos: 'Es el servidor más rápido', 'Es la opción más segura', 'Son los datos más importantes'. Para dizer o grupo de comparação, o espanhol usa 'de': 'el más rápido del equipo', 'la mejor opción de todas'. Em português diríamos 'da equipe', então 'de' é natural e você não precisa pensar muito.",
            "Com mejor e peor o molde é 'el mejor', 'la peor': 'Es la mejor solución del proyecto'. Não se diz 'el más mejor'. Se o substantivo vem depois, também vale a ordem 'la mejor solución' ou 'la solución más rápida', como no português.",
            "Para algo simplesmente muito bom, sem comparar, use muy: 'muy claro', 'muy rápido'. Esse é o chamado superlativo absoluto."
          ],
          dica: "Superlativo = artigo + más + adjetivo + de + grupo. 'Es el más rápido de los tres.'",
        },
        {
          t: "Preferir e opinar: prefiero, creo que, me parece que",
          facil: "Traduzindo: 'creo que' é 'acho que' direto; 'me parece que' é 'me parece que'; 'en mi opinión' abre uma opinião mais formal. Para preferir, use prefiero.",
          p: [
            "Para dar opinião, as fórmulas mais simples são 'creo que' e 'para mí'; 'me parece que' e 'en mi opinión' aparecem logo depois.",
            "Fórmulas de opinião (frases nossas): 'Creo que es mejor esperar', 'Me parece que el plazo es corto', 'Para mí, la nube es más cómoda', 'En mi opinión, deberíamos revisar los datos'. A diferença entre elas é de tom: 'creo que' é neutra, 'me parece que' suaviza e 'en mi opinión' soa mais formal.",
            "Para preferir, o molde é 'prefiero' + o que você escolhe e, se quiser comparar, 'a' + o outro: 'Prefiero Python a Java', 'Prefiero trabajar por la mañana'. Com dois infinitivos você vai ouvir 'Prefiero trabajar a descansar' e também 'Prefiero trabajar que descansar'. No começo, use 'a' com substantivos e imite a forma que ouvir ao seu redor com infinitivos.",
            "Para negar a opinião, a negação vai no verbo de opinião ('no creo que…') e depois muda o verbo seguinte para o subjuntivo, conteúdo que fica além do A2. No A2, prefira dizer 'Creo que no es buena idea', com o 'no' dentro. Regra geral, sem citação."
          ],
          lista: [
            "Creo que es una buena opción.",
            "Me parece que necesitamos más tiempo.",
            "Para mí, esta tabla es más clara.",
            "En mi opinión, el informe está bien.",
            "Prefiero Python a Java."
          ],
          dica: "Quando estiver na dúvida, abra com 'Creo que…' e fale uma ideia curta. Frases curtas funcionam melhor em reunião.",
        },
        {
          t: "Concordar e discordar com educação em reunião",
          facil: "Traduzindo: 'estoy de acuerdo' concorda; 'no estoy de acuerdo' discorda; 'sí, es verdad, pero…' suaviza a discordância.",
          p: [
            "Para concordar e discordar, as fórmulas básicas são 'estoy de acuerdo' e 'no estoy de acuerdo'; para contra-argumentar com suavidade, 'sí, es verdad, pero…'. Use essas como base.",
            "Para concordar: 'Estoy de acuerdo', 'Estoy de acuerdo contigo / con usted', 'Sí, tiene razón'. Para discordar com educação, o molde é concordar um pouco e apresentar a diferença: 'Sí, es verdad, pero creo que necesitamos más tiempo', 'Entiendo, pero para mí el plazo es corto', 'No estoy de acuerdo, creo que hay otra opción'. As duas últimas são frases nossas, regra geral, sem citação.",
            "Atenção ao 'con': 'estoy de acuerdo con ustedes' usa 'con' (não 'de acuerdo a'). O pronome fica depois do 'con': 'con usted', 'con ustedes', 'contigo' (e não 'con ti'). Regra geral, sem citação.",
            "Em reunião com colegas novos, a regra de cortesia é amaciar a negativa com 'creo que' ou 'me parece que' e fechar com uma proposta: 'No estoy del todo de acuerdo. ¿Podemos probar otra opción?'."
          ],
          dica: "Fórmula de três tempos: reconhecer ('Sí, es verdad'), contrastar ('pero creo que…'), propor ('¿Podemos…?').",
        },
        {
          t: "Armadilhas de brasileiro: 'mais bom', 'do que' e 'tão quanto'",
          facil: "Traduzindo: o português deixa 'mais bom' e 'tão quanto'; o espanhol pede mejor, 'que' e 'tan… como'. É fácil cair no portuñol.",
          p: [
            "Estes são erros comuns de falantes de português; tudo aqui é observação nossa.",
            "'Más bueno' ou 'más bom': no uso comum se diz mejor. 'Más malo' também é pouco usado em comparações de qualidade: prefira peor. 'Más mejor': não se diz, porque mejor já inclui o 'mais'.",
            "'Más do que', 'más de que': o 'do que' do português vira simplesmente 'que': 'más rápido que'. 'Tan cuanto' calca o 'tão quanto': o certo é 'tan… como'. 'Tanto quanto' vira 'tanto como'.",
            "'Yo acho que' mistura português e espanhol: diga 'creo que' ou 'pienso que'. Também é comum dizer 'concordo' sem a expressão fixa: use 'estoy de acuerdo'. E 'estoy de acuerdo' + 'a' calca o português 'de acordo a': use 'con'.",
            "Cuidado com 'mayor': significa 'maior' em importância ou quantidade e 'mais velho' em idade ('mi hermano mayor' é meu irmão mais velho). Para tamanho físico, prefira 'más grande'."
          ],
          armadilha: "Antes de dizer 'más bueno', 'tan cuanto' ou 'yo acho', pare e troque por mejor, 'tan… como' e creo que.",
        }
      ],
      exemplo: {
        t: "Uma discussão curta sobre duas opções de ferramenta",
        texto: "Na reunião, Luis diz: 'Creo que la herramienta A es más rápida que la B.' Ana responde: 'Sí, es verdad, pero me parece que la B es más fácil de usar. Para mí, es la mejor opción para el equipo nuevo.' Você entra: 'Estoy de acuerdo con Ana en que la B es más fácil, pero creo que la A es tan segura como la B y es la más barata. En mi opinión, deberíamos probar las dos esta semana.' Luis fecha: 'Perfecto. No estoy de acuerdo con el plazo, pero podemos hablarlo mañana.' Repare na estrutura: comparação (más rápida que, tan segura como), superlativo (la más barata, la mejor opción), opinião (creo que, me parece que, para mí, en mi opinión) e acordo e desacordo com educação (estoy de acuerdo, sí, es verdad, pero, no estoy de acuerdo)."
      },
      prova: [
        "Reunião: comparar duas ferramentas com más… que e tan… como.",
        "Revisão de proposta: dizer 'creo que' ou 'me parece que' antes de uma opinião.",
        "Discussão: concordar ('estoy de acuerdo') ou discordar com 'sí, es verdad, pero…'.",
        "Slack: escolher entre duas opções com 'prefiero A a B' e uma justificativa curta."
      ],
      explique: "Explique com as próprias palavras como se formam os três tipos de comparativo em espanhol, quais são os quatro irregulares e como discordar com educação, dando um exemplo seu de trabalho em cada caso.",
      checagem: [
        "Qual é a diferença entre 'más… que' e 'tan… como', e quando se usa 'tanto'?",
        "Por que 'más mejor' está errado e qual é a forma certa?",
        "Que fórmula de três tempos serve para discordar com educação em reunião?"
      ]
    },
    fontes: [PLAN, DELE],
    cartoes: [
      { id: "e14c1", f: "Diga: 'Este servidor é mais rápido que o outro.'", v: "Este servidor es más rápido que el otro. Más + adjetivo + que.", t: "e14" },
      { id: "e14c2", f: "Diga: 'A consulta é tão rápida quanto a anterior.'", v: "La consulta es tan rápida como la anterior. Tan + adjetivo + como.", t: "e14" },
      { id: "e14c3", f: "Diga: 'O prazo é menos longo que o do ano passado.'", v: "El plazo es menos largo que el del año pasado. Menos + adjetivo + que.", t: "e14" },
      { id: "e14c4", f: "Diga: 'Esta opção é melhor que a anterior.'", v: "Esta opción es mejor que la anterior. Mejor já tem o 'mais': não use 'más mejor'.", t: "e14" },
      { id: "e14c5", f: "Diga: 'O resultado de hoje é pior que o de ontem.'", v: "El resultado de hoy es peor que el de ayer. Peor é o comparativo de malo.", t: "e14" },
      { id: "e14c6", f: "Diga: 'É a melhor solução do projeto.'", v: "Es la mejor solución del proyecto. Artigo + mejor + substantivo; 'de' indica o grupo.", t: "e14" },
      { id: "e14c7", f: "Diga: 'É o servidor mais rápido da equipe.'", v: "Es el servidor más rápido del equipo. Artigo + más + adjetivo + de + grupo.", t: "e14" },
      { id: "e14c8", f: "Diga: 'Acho que é uma boa ideia.'", v: "Creo que es una buena idea. Creo que abre uma opinião e vem seguido de uma frase completa.", t: "e14" },
      { id: "e14c9", f: "Diga: 'Me parece que o prazo é curto.'", v: "Me parece que el plazo es corto. Me parece que suaviza a opinião.", t: "e14" },
      { id: "e14c10", f: "Diga: 'Na minha opinião, devemos revisar os dados.'", v: "En mi opinión, deberíamos revisar los datos. En mi opinión abre uma opinião formal.", t: "e14" },
      { id: "e14c11", f: "Diga: 'Prefiro Python a Java.'", v: "Prefiero Python a Java. Prefiero + o que escolho + a + o outro.", t: "e14" },
      { id: "e14c12", f: "Diga: 'Concordo com você.'", v: "Estoy de acuerdo contigo (ou con usted). Expressão fixa; pronome 'contigo', não 'con ti'.", t: "e14" },
      { id: "e14c13", f: "Diga: 'Não concordo, mas entendo.'", v: "No estoy de acuerdo, pero entiendo. Negar com 'no estoy de acuerdo' e suavizar com 'pero entiendo'.", t: "e14" },
      { id: "e14c14", f: "Diga: 'Sim, é verdade, mas acho que precisamos de mais tempo.'", v: "Sí, es verdad, pero creo que necesitamos más tiempo. Reconhecer, contrastar, propor.", t: "e14" }
    ],
    questoes: [
      {
        id: "e14q1", s: 4, t: "e14",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'Esta tabla es ___ grande que la otra.'",
        o: ["tan", "más", "tanto", "mejor"],
        c: [1],
        x: "Com 'que' no fim, a estrutura é a de superioridade: más + adjetivo + que. 'Tan' pede 'como' no fim e expressa igualdade. 'Tanto' acompanha substantivo ou verbo e também fecha com 'como'. 'Mejor' é um comparativo que já vale por si, então não pode ficar diante de 'grande'."
      },
      {
        id: "e14q2", s: 4, t: "e14",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'La consulta nueva es ___ rápida como la anterior.'",
        o: ["más", "menos", "tan", "tanto"],
        c: [2],
        x: "Com 'como' no fim, a estrutura de igualdade é tan + adjetivo + como: tan rápida como. 'Más' e 'menos' pedem 'que' e não 'como'. 'Tanto' é usado antes de substantivos ou depois de verbos, então não combina com um adjetivo como 'rápida'. A tradução natural é 'tão rápida quanto a anterior'."
      },
      {
        id: "e14q3", s: 4, t: "e14",
        e: "¿Cuál es correcta? (Qual está certa?)",
        o: ["Esta opción es más mejor que la otra.", "Esta opción es mejor que la otra.", "Esta opción es más buena que la otra.", "Esta opción es mejor de la otra."],
        c: [1],
        x: "Mejor é o comparativo de bueno e já contém a ideia de 'mais', então vem sozinho e é seguido de 'que': mejor que. A frase com 'más mejor' soma o 'mais' duas vezes. A frase com 'más buena' é a tradução literal de 'mais boa' e não é a forma habitual. A frase com 'mejor de' troca 'que' por 'de', e a comparação em espanhol é fechada por 'que'."
      },
      {
        id: "e14q4", s: 4, t: "e14",
        e: "Elige las dos frases con comparación correcta. (Escolha duas)",
        o: ["El servidor es más rápido que el anterior.", "El servidor es tan rápido que el anterior.", "El servidor es tan rápido como el anterior.", "El servidor es más rápido como el anterior."],
        c: [0, 2],
        x: "'Más rápido que' (superioridade) e 'tan rápido como' (igualdade) são as duas estruturas completas. As frases com 'tan… que' e 'más… como' misturam as peças e não formam uma comparação normal, já que más e menos fecham com 'que', enquanto tan fecha com 'como'. Treine as duas duplas juntas."
      },
      {
        id: "e14q5", s: 4, t: "e14",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'Es ___ mejor solución del proyecto.'",
        o: ["el", "la", "lo", "las"],
        c: [1],
        x: "Solución é substantivo feminino singular, então o artigo é 'la': la mejor solución. 'El' seria para um substantivo masculino, como 'el mejor plan'. 'Lo' não funciona como artigo de um substantivo comum. 'Las' é plural e não concordaria com o singular 'solución'. No superlativo, o artigo concorda com o substantivo."
      },
      {
        id: "e14q6", s: 4, t: "e14",
        e: "¿Qué frase abre una opinión? (Qual frase abre uma opinião?)",
        o: ["Creo que es mejor esperar.", "Estoy en esperar.", "Yo acho que esperar.", "Pienso mejor esperar."],
        c: [0],
        x: "'Creo que' é a forma direta de dar uma opinião e vem seguida de uma oração completa. 'Estoy en esperar' não é uma fórmula de opinião. 'Yo acho que' mistura português e espanhol, um caso típico de portuñol. 'Pienso mejor esperar' não é uma construção válida, pois falta o 'que' que liga as ideias."
      },
      {
        id: "e14q7", s: 4, t: "e14",
        e: "Elige las dos fórmulas que sirven para opinar con cortesía. (Escolha duas)",
        o: ["Me parece que el plazo es corto.", "En mi opinión, el plazo es corto.", "El plazo es corto, y punto.", "Yo no sé nada del plazo."],
        c: [0, 1],
        x: "'Me parece que' e 'en mi opinión' são fórmulas que marcam a frase como opinião pessoal e deixam a conversa aberta, o que é o objetivo da cortesia. 'Y punto' fecha a discussão de modo seco. 'Yo no sé nada' não expressa opinião e pode soar desinteressado. Em reunião, prefira fórmulas que apresentem sua ideia como opinião, não como ordem."
      },
      {
        id: "e14q8", s: 4, t: "e14",
        e: "¿Cómo se dice 'Concordo com você'? (Como se diz?)",
        o: ["Concuerdo a ti.", "Estoy de acuerdo contigo.", "Estoy de acuerdo con ti.", "Estoy acuerdo contigo."],
        c: [1],
        x: "A forma fixa é 'estar de acuerdo con', e com a pessoa 'tú' o pronome se funde: contigo. 'Con ti' não existe nesse caso, pois a fusão é obrigatória. 'Estoy acuerdo' perde o 'de' e fica incompleto. 'Concuerdo a ti' mistura uma forma pouco usada com uma preposição errada. Treine 'estoy de acuerdo con' como um bloco só."
      },
      {
        id: "e14q9", s: 4, t: "e14",
        e: "Elige la mejor forma de discrepar con cortesía. (Escolha a melhor forma de discordar com educação.)",
        o: ["No, está mal.", "Sí, es verdad, pero creo que necesitamos más tiempo.", "Eso no tiene sentido.", "No estoy de acuerdo y no voy a cambiar."],
        c: [1],
        x: "A forma 'Sí, es verdad, pero…' reconhece o ponto do outro antes de contrastar e propõe uma ideia, que é o desenho da discordância cortês. 'No, está mal' e 'Eso no tiene sentido' atacam a ideia e fecham a conversa. 'No estoy de acuerdo y no voy a cambiar' é correto gramaticalmente, mas rígido e sem proposta. Em reunião, o tom conta tanto quanto a frase."
      },
      {
        id: "e14q10", s: 4, t: "e14",
        e: "Elige la frase correcta. (Escolha a frase correta.) Tradução de 'Há mais de dez tabelas'.",
        o: ["Hay más que diez tablas.", "Hay más de diez tablas.", "Hay más como diez tablas.", "Hay mas de diez tablas."],
        c: [1],
        x: "Antes de um número, 'más' pede 'de': más de diez. 'Más que' é usado para comparar duas coisas, não para marcar uma quantidade. 'Más como' mistura a estrutura de igualdade com a de superioridade. A forma escrita 'mas' sem acento é outra palavra: em espanhol é a conjunção 'mas' (pero), e não o 'mais'; o 'más' de comparação leva acento."
      },
      {
        id: "e14q11", s: 4, t: "e14",
        e: "Elige las dos ideas verdaderas. (Escolha duas)",
        o: ["Mejor e peor nunca recebem 'más'.", "Se diz 'más bueno' em vez de 'mejor'.", "'Tan… como' expressa igualdade.", "'Más… como' expressa superioridade."],
        c: [0, 2],
        x: "Mejor e peor já são comparativos completos, então não aceitam 'más'. 'Tan… como' é a estrutura de igualdade. 'Más bueno' é a tradução do português 'mais bom' e não é a forma de comparar, já que o certo é mejor. 'Más… como' mistura peças: a superioridade fecha com 'que', não com 'como'."
      },
      {
        id: "e14q12", s: 4, t: "e14",
        e: "Elige la frase correcta. (Escolha a frase correta.) 'Prefiro Python a Java.'",
        o: ["Prefiero Python que Java.", "Prefiero Python a Java.", "Prefiero Python de Java.", "Prefiero más Python a Java."],
        c: [1],
        x: "Com substantivos, o contraste vai com 'a': prefiero Python a Java. A forma com 'que' também se ouve, sobretudo com infinitivos, mas com substantivos a construção usual é 'a'. A forma com 'de' não funciona com preferir. A forma com 'más' repete a ideia de comparação, e prefiero já inclui a ideia de escolher uma coisa sobre outra."
      },
      {
        id: "e14q13", s: 4, t: "e14",
        e: "Elige la opción correcta. (Escolha a opção correta.) 'Esta tabla es ___ que la otra: tiene menos filas.'",
        o: ["más pequeña", "tan pequeña", "tanto pequeña", "mejor pequeña"],
        c: [0],
        x: "O 'que' no fim pede uma estrutura de superioridade ou inferioridade, e 'más pequeña que' é a que combina com a ideia de ter menos linhas. 'Tan pequeña' pediria 'como'. 'Tanto pequeña' não é uma combinação possível, porque 'tanto' não acompanha adjetivos. 'Mejor pequeña' não existe: mejor é para bueno, não para tamanho."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: comparar duas opções e opinar",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Falar em voz alta ajuda a automatizar más… que, tan… como e as fórmulas de opinião, que ainda não saem naturalmente para quem vem do português.",
      antes: "Ter lido a aula. Escolher duas opções reais do seu trabalho (duas ferramentas, dois horários, duas tabelas) para comparar. Ficar num lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste as frases ao que você realmente pensa.",
      passos: [
        { t: "Preparar as duas opções", p: "Em papel, escreva A e B e três adjetivos para comparar (por exemplo rápido, claro, barato). Não escreva frases inteiras." },
        { t: "Ouvir e repetir", p: "Leia em voz alta as frases-modelo da aula (más… que, tan… como, mejor, el más…) duas vezes cada, devagar." },
        { t: "Gravar a primeira versão (2 min)", p: "Fale: duas comparações, um superlativo, uma opinião com 'creo que' e uma preferência com 'prefiero… a…'." },
        { t: "Ouvir e comparar", p: "Escute uma vez e marque quantas vezes disse 'más bueno', 'tan cuanto' ou 'yo acho'; conte os acertos de mejor e como." },
        { t: "Regravar e treinar o desacordo", p: "Regrave corrigindo e termine com uma simulação: imagine uma colega dizendo algo com que você não concorda e responda com 'Sí, es verdad, pero…'." }
      ],
      verificar: "Na segunda gravação você usou pelo menos 2 comparativos corretos (más/menos… que ou tan… como), mejor ou peor ao menos uma vez sem 'más', 1 superlativo com 'el/la más' ou 'el/la mejor', 1 opinião com 'creo que' ou 'me parece que' e 1 resposta com 'estoy de acuerdo' ou 'sí, es verdad, pero…'.",
      limpar: [
        "Apague as gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na aula 16, se quiser.",
        "Anote numa linha qual fórmula saiu mais travada, para treinar nos cartões."
      ],
      erros: [
        { s: "Digo 'más mejor' ou 'más bueno'", c: "Tradução do português 'mais bom'.", r: "Escreva 'mejor = melhor, sem más' num papel e regrave só as frases com mejor." },
        { s: "Troco que e como", c: "O 'quanto' e o 'do que' do português confundem.", r: "Decore as duplas: más… que, tan… como. Repita as duas duplas em voz alta antes de gravar." },
        { s: "Falo tudo em tom seco", c: "Falta de fórmulas de abertura.", r: "Abra sempre com 'creo que' ou 'me parece que' e termine com uma pergunta ('¿Qué opinan?')." },
        { s: "Não sei o que dizer ao discordar", c: "Só treinou concordar.", r: "Use a fórmula de três tempos: reconhecer, contrastar, propor. Treine com um exemplo de trabalho." }
      ]
    }
  };

  /* ===================== AULA 15 ===================== */
  C.dias[15] = {
    aula: {
      titulo: "Espanhol no trabalho de dados e tecnologia: vocabulário, status e Slack",
      resumo: "Quinze palavras de dados e tecnologia com artigo e gênero (el dato, la tabla, el servidor…), sete verbos de trabalho (cargar, extraer, transformar, revisar, enviar, solucionar, actualizar), como dar status em stand-up e Slack ('Estoy trabajando en…', 'Ya terminé…', 'Falta…') e o que fazer com anglicismos como deploy e pipeline.",
      simples: {
        analogia: "Pense na sua caixa de ferramentas de trabalho em português: dado, tabela, servidor, prazo, entrega. Em espanhol quase todas as ferramentas têm um irmão parecido, e isso é uma vantagem enorme: dato, tabla, servidor, plazo, entrega. O trabalho é pequeno e muito prático. Primeiro, cada ferramenta ganha uma etiqueta de gênero (el ou la), porque em espanhol o artigo vem junto com a palavra. Segundo, os verbos de trabalho (cargar, enviar, revisar) funcionam como as mãos que usam a caixa. Terceiro, três moldes de status resolvem a maior parte do stand-up: 'Estoy trabajando en…' para o que está em andamento, 'Ya terminé…' para o que acabou, 'Falta…' para o que resta. Quando uma palavra técnica for emprestada do inglês, como deploy ou pipeline, você não precisa decidir sozinha: ouça como o seu time fala e acompanhe.",
        pontos: [
          "Decore cada substantivo com o artigo: el dato, la base de datos, la tabla, el archivo, la nube.",
          "Três moldes de status: 'Estoy trabajando en…', 'Ya terminé…' (ou 'Ya he terminado…'), 'Falta…'.",
          "Verbos de trabalho no infinitivo servem para pedidos e planos: cargar, extraer, transformar, revisar, enviar, solucionar, actualizar.",
          "Palavras parecidas com o português, mas com cuidado: 'archivo' (arquivo, escrito com ch), 'informe' (relatório) e 'consulta' (em dados, costuma ser a query).",
          "Anglicismos técnicos aparecem no dia a dia; acompanhe o termo que o seu time usa e, se tiver dúvida, pergunte."
        ],
        paraQueServe: "Dar status e pedir ajuda em espanhol num stand-up, no Slack ou num e-mail curto com colegas de tecnologia, sem travar nas palavras do dia a dia."
      },
      glossario: [
        { t: "el dato / los datos", d: "Informação. No trabalho de dados, costuma aparecer no plural: 'los datos están listos'." },
        { t: "la base de datos", d: "Banco de dados. Feminino singular, com 'datos' no plural dentro da expressão." },
        { t: "el plazo", d: "Prazo. 'El plazo es el viernes' significa que a data-limite é sexta-feira." },
        { t: "la entrega", d: "Entrega: o ato ou o produto entregue. 'La entrega es mañana'." },
        { t: "la consulta", d: "Consulta, e em dados costuma ser a query SQL. Também pode ser uma consulta médica; o contexto decide." },
        { t: "faltar", d: "Verbo para o que ainda resta: 'Falta una tabla', 'Faltan dos pruebas', 'Me falta acceso'." },
        { t: "Anglicismo", d: "Palavra emprestada do inglês que o falante usa em espanhol, como deploy, pipeline ou ticket." }
      ],
      blocos: [
        {
          t: "Quinze palavras com artigo e gênero",
          facil: "Traduzindo: aprenda cada palavra junto com el ou la. Quase todas parecem o português, mas o artigo é diferente de algumas.",
          p: [
            "As quinze palavras desta aula são uma seleção nossa de uso frequente em trabalho de dados; não vêm de nenhuma lista oficial.",
            "Masculinas: el dato, el archivo, el equipo, el plazo, el informe, el error, el servidor, el panel, el requisito. Femininas: la base de datos, la tabla, la nube, la reunión, la consulta, la entrega. Quase todas têm o mesmo gênero que em português; o engano mais comum é 'la base de datos' (feminino), enquanto 'banco de dados' é masculino.",
            "Outras observações: 'los datos' costuma aparecer no plural; 'el equipo' é a equipe de pessoas (e também equipamento); 'la nube' é a nuvem de cloud computing; 'el requisito' é o requisito de um projeto. Para 'computador', na Espanha se usa 'ordenador' e na América Latina é mais comum 'computadora' (ou 'computador' em alguns países); isso é observação geral nossa.",
            "Escrita: archivo (ch, não 'arquivo'), reunión (acento no o), informe (sem acento), servidor (com v), consulta (com s). Palavras que terminam em -ción levam acento: reunión, solución, versión."
          ],
          tabela: {
            cab: ["Palavra", "Artigo", "Frase de trabalho"],
            linhas: [
              ["dato", "el", "El dato está en la tabla."],
              ["base de datos", "la", "La base de datos está en la nube."],
              ["archivo", "el", "Te envío el archivo."],
              ["equipo", "el", "El equipo tiene una reunión."],
              ["plazo", "el", "El plazo es el viernes."],
              ["informe", "el", "El informe está listo."],
              ["error", "el", "Hay un error en la consulta."],
              ["servidor", "el", "El servidor no responde."],
              ["panel", "el", "El panel muestra los datos."],
              ["requisito", "el", "Falta un requisito."],
              ["entrega", "la", "La entrega es mañana."]
            ]
          },
          dica: "Estude em duplas: 'el dato, los datos', 'la tabla, las tablas'. O artigo é parte da palavra.",
        },
        {
          t: "Sete verbos de trabalho",
          facil: "Traduzindo: cargar (carregar), extraer (extrair), transformar, revisar, enviar, solucionar (resolver), actualizar (atualizar).",
          p: [
            "Os sete verbos desta aula são uma seleção nossa para trabalho com dados. 'Resolver' também é muito usado no lugar de 'solucionar', e 'corregir' é comum para corrigir um erro.",
            "Cargar (carregar): 'Cargo los datos en la tabla'. Extraer (extrair): 'Extraigo los datos del servidor'. Transformar: 'Transformamos los archivos'. Revisar (conferir): 'Reviso el informe'. Enviar: 'Envío el archivo por correo'. Solucionar (resolver): 'Soluciono el error'. Actualizar (atualizar): 'Actualizo la tabla'.",
            "Para pedir ou planejar, use o infinitivo depois de verbos como ir a, poder ou necesitar: 'Voy a revisar el informe', 'Puedo enviar el archivo mañana', 'Necesito actualizar la base de datos'. Para a conjugação no presente, lembre que extraer tem yo extraigo e que cargar, enviar e revisar seguem o padrão de -ar.",
            "Atenção à escrita: o verbo é 'actualizar', com c antes do t, e não 'atualizar'. 'Revisar' é conferir, e 'solucionar' é resolver um problema."
          ],
          lista: [
            "Cargo los datos en la base de datos.",
            "Extraigo los datos del servidor.",
            "Reviso el informe antes de enviarlo.",
            "Voy a solucionar el error hoy.",
            "Necesito actualizar la tabla."
          ],
          dica: "Pense: 'verbo no infinitivo + o que' para planos e pedidos: 'Voy a revisar…', 'Puedo enviar…', 'Necesito actualizar…'.",
        },
        {
          t: "Status em andamento: Estoy trabajando en…",
          facil: "Traduzindo: 'estoy trabajando en' é 'estou trabalhando em'. A preposição é 'en', não 'no' nem 'em'.",
          p: [
            "O molde de ação em andamento é 'estar + gerúndio'. Para o dia a dia de status, use esse valor básico: algo que você está fazendo agora ou nesta fase do trabalho.",
            "O molde é 'estoy' + gerúndio + o que você faz. Gerúndio de -ar: -ando (trabajando, revisando, cargando); de -er e -ir: -iendo (extrayendo, escribiendo). Extraer vira extrayendo, com y. Exemplos de status: 'Estoy trabajando en la consulta', 'Estoy revisando el informe', 'Estoy cargando los datos', 'Estoy solucionando un error'.",
            "'Trabajar en' acompanha a coisa em que você trabalha: 'Estoy trabajando en el panel'. Para dizer que usa uma ferramenta, use 'con': 'Estoy trabajando con la base de datos'. Em português é fácil escorregar para 'no/na' e dizer 'trabajando no panel'; em espanhol é 'en el panel'.",
            "Para a pessoa que fala em nome do time: 'Estamos trabajando en…'. Para perguntar: '¿En qué estás trabajando?' (com tú) ou '¿En qué está trabajando?' (com usted)."
          ],
          dica: "Estoy + -ando/-iendo + en + a tarefa. 'Estoy revisando el informe'. Se for uma ferramenta, use con.",
        },
        {
          t: "Status concluído e pendente: Ya terminé / Ya he terminado / Todavía no / Falta",
          facil: "Traduzindo: 'ya' é 'já'; 'todavía no' é 'ainda não'; 'falta' é 'falta' ou 'resta'. Com eles você dá o estado de cada tarefa.",
          p: [
            "Nos manuais, marcadores como hoy, ya e todavía no acompanham o pretérito perfecto. Por isso 'Ya he terminado el informe' e 'Todavía no he terminado la consulta' são frases naturais de status. Com o indefinido, a frase fica fechada em um momento: 'Ayer terminé el informe'. Na fala do dia a dia, sobretudo na América Latina, você também ouvirá 'Ya terminé' e 'Todavía no terminé', e isso é normal; o contraste de manual está na aula 13.",
            "'Falta' funciona com o que ainda resta: 'Falta una prueba', 'Faltan dos tablas', 'Falta revisar el informe'. Concorda com o que falta (falta/faltan) e pode ser seguido de infinitivo. Para o que falta a você, use 'me falta': 'Me falta acceso al servidor'. Isso é regra geral, sem citação.",
            "Frases úteis de bloqueio: 'Estoy bloqueado/a por…' (estou bloqueado por…), 'Necesito ayuda con…' (preciso de ajuda com…), 'No tengo acceso a…' (não tenho acesso a…). Para prazo: 'Lo entrego el viernes' (entrego sexta) ou 'El plazo es el viernes'.",
            "Mini-roteiro de stand-up em três linhas: 1) 'Ayer terminé la consulta.' 2) 'Hoy estoy trabajando en el informe.' 3) 'Me falta acceso al servidor; necesito ayuda.' Ele resume o que fez, o que está fazendo e o que bloqueia."
          ],
          dica: "Stand-up em três linhas: Ayer… (indefinido), Hoy estoy… (gerúndio), Me falta… (bloqueio).",
        },
        {
          t: "Mensagens curtas para Slack e e-mail",
          facil: "Traduzindo: no Slack, frases curtas bastam. Cumprimente, diga o que precisa e agradeça. Use ustedes para o time (na Espanha, vosotros).",
          p: [
            "Mensagens curtas e simples são um bom ponto de partida. As frases de Slack a seguir são nossas.",
            "Abertura: 'Hola, equipo' ou 'Buenos días' (cumprimento comum). Pedido: '¿Pueden revisar la consulta?', '¿Alguien puede enviarme el archivo?'. Status: 'Ya envié el informe', 'Todavía no he recibido los datos', 'Estoy trabajando en el error'. Fechamento: 'Gracias' ou 'Gracias por la ayuda'.",
            "Para o time todo, use ustedes na América Latina ('vosotros' é o plural informal usado na Espanha): '¿Pueden…?', '¿Ustedes tienen…?'. Para uma pessoa com quem tem cerimônia, use usted. A aula 16 explica tú x usted em mais detalhe.",
            "Frase de erro: 'Hay un error en la tabla de clientes. ¿Pueden revisarlo?'. Frase de entrega: 'La entrega es mañana a las 10:00. Ya está lista.'."
          ],
          lista: [
            "Hola, equipo. Ya envié el informe.",
            "Estoy trabajando en la consulta.",
            "Me falta acceso al servidor. ¿Pueden ayudarme?",
            "Hay un error en el archivo. ¿Pueden revisarlo?",
            "Gracias por la ayuda."
          ],
          dica: "Uma mensagem boa tem um verbo claro, um pedido simples e um 'gracias'. Evite frases longas.",
        },
        {
          t: "Anglicismos em tecnologia: deploy, pipeline e companhia",
          facil: "Traduzindo: times de tecnologia falam deploy, pipeline e ticket em espanhol. Não invente uma tradução: ouça o que o seu time usa.",
          p: [
            "Esta aula NÃO afirma nenhuma recomendação da Fundéu, da RAE ou de qualquer outra instituição sobre esses anglicismos; o que segue é só observação de uso.",
            "O que é seguro dizer, como observação nossa (regra geral, sem citação): equipes de tecnologia misturam inglês e espanhol e usam palavras como deploy, pipeline, ticket, commit e dashboard. Em espanhol aparecem verbos como 'desplegar' ou 'implementar' para o ato de colocar software no ar, e 'canalización' às vezes aparece para pipeline, mas isso varia de equipe para equipe e não é uma recomendação.",
            "Uma vantagem: as palavras em inglês são as mesmas que você já usa em português. A dica é marcar o artigo e o verbo em espanhol: 'el deploy', 'el pipeline', 'el ticket'; 'hacer el deploy' ou 'desplegar'. Se escolher entre as duas formas, pergunte: '¿Cómo lo dicen ustedes: deploy o despliegue?'.",
            "Ao escrever para clientes ou documentos formais, confira o termo no glossário da empresa ou no dicionário da RAE antes de publicar. Esta dica é prática, sem citação."
          ],
          armadilha: "Não invente tradução ('o pipeline' vira 'el tubo'). Se não tiver certeza, use a palavra em inglês com o artigo (el pipeline) e confirme com o time.",
        }
      ],
      exemplo: {
        t: "Stand-up e Slack de um dia de trabalho",
        texto: "No stand-up, você diz: 'Buenos días, equipo. Ayer terminé la consulta de clientes y envié el informe. Hoy estoy trabajando en el panel y estoy revisando un error en el archivo. Todavía no he recibido los datos del servidor, y me falta acceso a la base de datos. Necesito ayuda con eso.' Depois, no Slack: 'Hola, equipo. Ya revisé el error: estaba en la tabla de clientes. Estoy cargando los datos otra vez. Falta actualizar el panel. La entrega sigue siendo el viernes. Gracias.' Repare os moldes: Ayer + indefinido (terminé, envié), Hoy estoy + gerúndio (trabajando, revisando), 'todavía no he' + particípio (recibido), 'me falta' + acesso e 'falta' + infinitivo (actualizar)."
      },
      prova: [
        "Stand-up: dar três linhas de status (ontem, hoje, bloqueio) com os moldes da aula.",
        "Slack: pedir revisão de um erro com '¿Pueden revisarlo?' e dizer o que já fez.",
        "Reunião: usar el plazo e la entrega para combinar datas.",
        "Conversa com o time: perguntar como eles chamam deploy e pipeline antes de escrever uma documentação."
      ],
      explique: "Explique com as próprias palavras os três moldes de status (Estoy trabajando en, Ya terminé, Falta) e dê um exemplo seu de cada num dia de trabalho com dados.",
      checagem: [
        "Que artigo (el ou la) acompanha dato, tabla, plazo, reunión, consulta e servidor?",
        "Quando se usa 'falta' e quando 'me falta' num stand-up?",
        "O que você faz quando não sabe como o time chama deploy ou pipeline em espanhol?"
      ]
    },
    fontes: [PLAN, DELE],
    cartoes: [
      { id: "e15c1", f: "Diga: 'Estou trabalhando na consulta.'", v: "Estoy trabajando en la consulta. Estoy + gerúndio + en + a tarefa.", t: "e15" },
      { id: "e15c2", f: "Diga: 'Já terminei o relatório.'", v: "Ya terminé el informe (ou Ya he terminado el informe). Ya = já.", t: "e15" },
      { id: "e15c3", f: "Diga: 'Falta revisar a tabela.'", v: "Falta revisar la tabla. Falta + infinitivo para o que resta.", t: "e15" },
      { id: "e15c4", f: "Diga: 'Faltam duas provas.'", v: "Faltan dos pruebas. Faltan concorda com o plural: dos pruebas.", t: "e15" },
      { id: "e15c5", f: "Diga: 'Me falta acesso ao servidor.'", v: "Me falta acceso al servidor. Me falta = o que falta a mim.", t: "e15" },
      { id: "e15c6", f: "Diga: 'Os dados estão na nuvem.'", v: "Los datos están en la nube. Datos é plural; la nube é feminino.", t: "e15" },
      { id: "e15c7", f: "Diga: 'O prazo é sexta-feira.'", v: "El plazo es el viernes. Plazo é masculino: el plazo.", t: "e15" },
      { id: "e15c8", f: "Diga: 'Há um erro no arquivo.'", v: "Hay un error en el archivo. Archivo com ch; error é masculino.", t: "e15" },
      { id: "e15c9", f: "Diga: 'Vou carregar os dados hoje.'", v: "Voy a cargar los datos hoy. Voy a + infinitivo para planos.", t: "e15" },
      { id: "e15c10", f: "Diga: 'Preciso atualizar a base de dados.'", v: "Necesito actualizar la base de datos. Actualizar leva c antes de t.", t: "e15" },
      { id: "e15c11", f: "Diga: 'Preciso de ajuda com a consulta.'", v: "Necesito ayuda con la consulta. 'Ayuda con' = ajuda com.", t: "e15" },
      { id: "e15c12", f: "Diga: 'A entrega é amanhã.'", v: "La entrega es mañana. Entrega é feminino: la entrega.", t: "e15" },
      { id: "e15c13", f: "Pergunte ao time: 'Como vocês dizem: deploy ou implantação?'", v: "¿Cómo lo dicen ustedes: deploy o despliegue? Pergunte em vez de inventar um termo.", t: "e15" },
      { id: "e15c14", f: "Diga: 'Ontem terminei a consulta e hoje estou revisando o informe.'", v: "Ayer terminé la consulta y hoy estoy revisando el informe. Ayer + indefinido; hoy estoy + gerúndio.", t: "e15" }
    ],
    questoes: [
      {
        id: "e15q1", s: 4, t: "e15",
        e: "Elige la opción correcta. (Escolha a opção correta.) '___ trabajando en la consulta.'",
        o: ["Estoy", "Tengo", "Soy", "Voy"],
        c: [0],
        x: "O status em andamento usa estar + gerúndio: estoy trabajando. 'Tengo trabajando' mistura tener com gerúndio, o que não forma o progressivo. 'Soy trabajando' usa ser, que não combina com ação em andamento. 'Voy trabajando' tem outro sentido, de ir avançando aos poucos, e não é o molde do status. Para stand-up, fique com estoy + gerúndio."
      },
      {
        id: "e15q2", s: 4, t: "e15",
        e: "Elige el artículo correcto. (Escolha o artigo correto.) '___ plazo es el viernes.'",
        o: ["La", "El", "Lo", "Las"],
        c: [1],
        x: "Plazo é masculino singular, então o artigo é el: el plazo. 'La' é feminino e combina com palavras como la tabla ou la entrega. 'Lo' não é artigo de um substantivo comum. 'Las' é feminino plural. A dica é decorar a palavra junto com o artigo: el plazo, la entrega."
      },
      {
        id: "e15q3", s: 4, t: "e15",
        e: "¿Cuál es la frase correcta para 'Me falta acceso al servidor'? (Qual é a frase correta?)",
        o: ["Me falta acceso al servidor.", "Me falto acceso al servidor.", "Yo falta acceso al servidor.", "Me faltan acceso al servidor."],
        c: [0],
        x: "'Me falta acceso' usa faltar com o pronome me para indicar o que falta a mim, e 'falta' concorda com 'acceso', que é singular. 'Me falto' é uma conjugação que não existe nesse sentido. 'Yo falta' tem a pessoa errada e deixa a frase sem sentido. 'Me faltan acceso' põe o verbo no plural com um substantivo singular. Se faltar mais de uma coisa, aí sim se usa faltan."
      },
      {
        id: "e15q4", s: 4, t: "e15",
        e: "Elige las dos frases con sustantivo y artículo correctos. (Escolha duas)",
        o: ["la base de datos", "el reunión", "la consulta", "la servidor"],
        c: [0, 2],
        x: "Base de datos e consulta são femininas, e por isso aparecem com 'la'. Reunión também é feminina, então 'el reunión' está errado. Servidor é masculino, então 'la servidor' está errado. Como em português, o artigo é parte da palavra, mas o gênero nem sempre coincide: 'la base de datos' é feminino, enquanto 'banco de dados' é masculino."
      },
      {
        id: "e15q5", s: 4, t: "e15",
        e: "Elige la mejor frase para decir 'Ainda não recebi os dados'. (Escolha a melhor frase.)",
        o: ["Todavía no he recibido los datos.", "Ya recibí los datos.", "Todavía recibo los datos.", "Falta recibir yo los datos."],
        c: [0],
        x: "'Todavía no he recibido' é o molde de ainda não: todavía no + he + particípio. A frase com 'ya recibí' diz o contrário: que os dados já chegaram. 'Todavía recibo' sem 'no' muda o sentido para 'ainda recebo', como uma ação habitual. 'Falta recibir yo' é gramaticalmente estranha, já que falta pede o que resta, não o sujeito. Em stand-up, use todavía no he."
      },
      {
        id: "e15q6", s: 4, t: "e15",
        e: "Elige las dos frases que dan status con los moldes de la aula. (Escolha duas)",
        o: ["Estoy revisando el informe.", "Falta actualizar el panel.", "El informe de revisar.", "Yo informe revisando."],
        c: [0, 1],
        x: "'Estoy revisando el informe' é o molde de ação em andamento (estoy + gerúndio). 'Falta actualizar el panel' é o molde do que resta fazer (falta + infinitivo). As outras duas frases não formam uma oração com verbo conjugado, então não comunicam status. No stand-up, prefira frases curtas e completas."
      },
      {
        id: "e15q7", s: 4, t: "e15",
        e: "¿Cómo se escribe? (Como se escreve?) 'Voy a ___ el archivo.'",
        o: ["atualizar", "actualizar", "actulizar", "actualisar"],
        c: [1],
        x: "A grafia certa é actualizar, com c antes do t e z (não s) antes do -ar final. 'Atualizar' é a forma do português, um caso típico de portuñol. 'Actulizar' esquece uma letra. 'Actualisar' troca z por s, que não segue a grafia. Em espanhol, a ortografia pede atenção a esses pares."
      },
      {
        id: "e15q8", s: 4, t: "e15",
        e: "Elige la preposición correcta. (Escolha a preposição correta.) 'Estoy trabajando ___ el panel.'",
        o: ["no", "en", "a", "de"],
        c: [1],
        x: "Trabajar vai com 'en' quando o que vem depois é a tarefa: trabajando en el panel. 'No' é negação, e a tradução literal de 'no panel' não funciona em espanhol. 'A' e 'de' mudam o sentido e não combinam com trabalhar numa tarefa. Para falar de uma ferramenta, 'con' é a opção: trabajando con la base de datos."
      },
      {
        id: "e15q9", s: 4, t: "e15",
        e: "Elige la traducción de 'Preciso de ajuda com a consulta'. (Escolha a tradução.)",
        o: ["Necesito ayuda con la consulta.", "Necesito ayuda a la consulta.", "Necesito ayudo con la consulta.", "Necesito ayudar la consulta."],
        c: [0],
        x: "'Necesito ayuda con la consulta' é a forma natural: necesitar + substantivo, e 'con' para o assunto. 'Necesito ayuda a la consulta' usa a preposição errada. 'Necesito ayudo' mistura o verbo ayudar com o substantivo ayuda. 'Necesito ayudar la consulta' muda o sentido: ajudar a consulta, e não pedir ajuda."
      },
      {
        id: "e15q10", s: 4, t: "e15",
        e: "¿Qué hacer con 'deploy' o 'pipeline' si no sabes el término? (O que fazer se você não sabe o termo?)",
        o: ["Preguntar al equipo cómo lo dicen.", "Inventar una traducción literal.", "Evitar hablar del tema.", "Copiar la palabra del portugués."],
        c: [0],
        x: "O mais seguro é perguntar ao time como eles chamam o termo, porque a escolha entre o anglicismo e uma tradução varia de equipe para equipe, e esta aula não confirmou nenhuma recomendação oficial. Inventar uma tradução literal pode causar confusão. Evitar o tema atrapalha o trabalho. Copiar uma palavra do português pode criar um falso amigo ou uma forma inexistente."
      },
      {
        id: "e15q11", s: 4, t: "e15",
        e: "Elige las dos frases que puedes usar en un stand-up. (Escolha duas)",
        o: ["Ayer terminé la consulta.", "Hoy estoy trabajando en el informe.", "Ayer estoy terminando la consulta.", "Hoy terminé trabajando el informe."],
        c: [0, 1],
        x: "'Ayer terminé' usa o indefinido com um tempo fechado, e 'hoy estoy trabajando' usa o gerúndio para algo em andamento. 'Ayer estoy terminando' mistura um tempo fechado com uma ação em andamento. 'Hoy terminé trabajando' não forma uma frase com sentido claro. Em stand-up, combine bem o marcador de tempo com o verbo."
      },
      {
        id: "e15q12", s: 4, t: "e15",
        e: "Completa: 'Hay un ___ en la tabla de clientes.' (Complete.)",
        o: ["error", "erro", "errar", "erró"],
        c: [0],
        x: "O substantivo é error, com dois r no meio e sem o 'o' final do português. 'Erro' é a forma do português. 'Errar' é verbo (cometer um erro) e não encaixa depois do artigo 'un'. 'Erró' é uma forma do verbo errar no passado e também não completa a frase. Lembre: el error, los errores."
      },
      {
        id: "e15q13", s: 4, t: "e15",
        e: "Elige la mejor frase para el Slack. (Escolha a melhor frase para o Slack.)",
        o: ["Hola, equipo. Ya envié el informe. Gracias.", "Mande el informe.", "Informe enviado por mí en el pasado ya.", "Yo enviado informe ya."],
        c: [0],
        x: "A mensagem com cumprimento, status claro com verbo conjugado (ya envié) e agradecimento, que é o desenho de uma mensagem curta e cortês. 'Mande el informe' é uma ordem, e soa como se você estivesse pedindo para o outro enviar. As outras duas frases têm ordem estranha e não seguem a gramática que você aprendeu. Frases curtas e completas funcionam melhor."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: stand-up de três linhas",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "O stand-up repete sempre os mesmos moldes. Falar em voz alta faz o 'Ayer… / Hoy estoy… / Me falta…' sair automático.",
      antes: "Ter lido a aula. Escolher três tarefas reais do seu dia: uma que você terminou, uma que está fazendo e uma que está bloqueada. Ficar num lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: adapte as frases às tarefas do seu trabalho.",
      passos: [
        { t: "Preparar as três tarefas", p: "Anote em papel três palavras-chave de tarefas (por exemplo consulta, informe, servidor) e o artigo de cada uma." },
        { t: "Ouvir e repetir", p: "Leia em voz alta o stand-up de três linhas da aula duas vezes, devagar, marcando 'Ayer terminé', 'Hoy estoy' e 'Me falta'." },
        { t: "Gravar a primeira versão (1 a 2 min)", p: "Grave seu stand-up com as três tarefas reais, sem ler. Inclua uma frase com 'todavía no he' e uma com 'falta'." },
        { t: "Ouvir e comparar", p: "Escute uma vez e marque: artigos corretos (el ou la), 'en' depois de trabajando e 'archivo' pronunciado com ch." },
        { t: "Regravar com uma pergunta", p: "Regrave corrigindo e acrescente uma pergunta: '¿Pueden revisar la consulta?' ou '¿Cómo lo dicen ustedes: deploy o despliegue?'." }
      ],
      verificar: "Na segunda gravação você usou 'ayer' com um verbo no indefinido, 'hoy estoy' com um gerúndio, 'me falta' ou 'falta' ao menos uma vez, el/la certos em pelo menos 3 substantivos, e fez uma pergunta ao time.",
      limpar: [
        "Apague as gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na aula 16, se quiser.",
        "Anote os dois substantivos em que você errou o artigo e revise-os nos cartões."
      ],
      erros: [
        { s: "Esqueço o 'estoy' e falo só 'trabajando'", c: "Pressa e hábito de frase curta.", r: "Comece sempre com 'estoy' e pare um instante antes do gerúndio." },
        { s: "Troco el e la", c: "Aprender a palavra sem o artigo.", r: "Estude em duplas (el servidor, la tabla) e regrave só as frases com erro." },
        { s: "Digo 'no' em vez de 'en' depois de trabajando", c: "Tradução literal de 'trabalhando no'.", r: "Escreva 'trabajando en' num papel e repita três vezes antes de regravar." },
        { s: "Travo ao falar de deploy ou pipeline", c: "Medo de errar o termo.", r: "Use a palavra em inglês com o artigo (el deploy) e pergunte ao time como eles preferem." }
      ]
    }
  };

  /* ===================== AULA 16 ===================== */
  C.dias[16] = {
    aula: {
      titulo: "Conversar numa reunião em espanhol: apresentar-se, pedir a palavra, confirmar e fechar",
      resumo: "Aula de fechamento da trilha: frases fixas para se apresentar, pedir a palavra, pedir para repetir ou falar mais devagar, confirmar entendimento, dizer que não sabe e propor o próximo passo, um e-mail curto, tú x usted no trabalho e um roteiro de apresentação de 60 segundos que revisa o que você aprendeu.",
      simples: {
        analogia: "Pense numa reunião como uma estrada com cinco placas de trânsito. A primeira diz 'apresente-se': Mucho gusto, soy… y trabajo en datos. A segunda diz 'peça a vez': ¿Puedo decir algo? A terceira diz 'confirme que entendeu': ¿Entendí bien que…? A quarta diz 'se não sabe, avise e prometa': No tengo ese dato ahora, pero lo reviso. A quinta diz 'feche com próximo passo': Podemos… / Le mando… Você não precisa criar frases novas a cada reunião: basta reconhecer a placa e dizer a frase pronta, trocando só as palavras do seu trabalho. Quando algo não for entendido, pedir para repetir ou falar mais devagar não é fraqueza, é a manobra mais profissional que existe. E, para escolher entre tú e usted, olhe a placa de velocidade: com pessoas desconhecidas ou com hierarquia, comece com usted.",
        pontos: [
          "Apresentação em uma frase: 'Mucho gusto, soy [nome] y trabajo en datos.'",
          "Pedir a palavra: '¿Puedo decir algo?'; pedir para repetir: '¿Puede repetir, por favor?'; devagar: '¿Puede hablar más despacio?'.",
          "Confirmar: '¿Entendí bien que…?'. Admitir: 'No tengo ese dato ahora, pero lo reviso.'",
          "Próximo passo: 'Podemos…' (nós) ou 'Le mando… / Te mando…' (eu envio).",
          "Com desconhecidos ou hierarquia, comece com usted; com colegas próximos, passe a tú se eles propuserem."
        ],
        paraQueServe: "Participar de uma reunião curta em espanhol com frases prontas, sem travar, e fechar com um e-mail de duas linhas e um próximo passo claro."
      },
      glossario: [
        { t: "Mucho gusto", d: "Fórmula de apresentação: 'prazer em conhecê-lo(a)'. Vem junto com 'soy…' e o seu trabalho." },
        { t: "usted / ustedes", d: "Tratamento de respeito (usted) e plural (ustedes). Na América Latina, 'ustedes' é o plural usado em geral (na Espanha, para o informal, usa-se 'vosotros')." },
        { t: "tú", d: "Tratamento informal e próximo. Pode ser usado com colegas quando a outra pessoa propõe." },
        { t: "¿Puede repetir?", d: "Pedido educado (com usted) para repetir. Com tú: '¿Puedes repetir?'." },
        { t: "¿Entendí bien que…?", d: "Pergunta para confirmar entendimento: 'Entendi bem que…?'. Pode ser seguida de um resumo curto." },
        { t: "Quedo atento/a", d: "Fórmula de despedida em e-mail: 'fico no aguardo'. Atento (masculino) ou atenta (feminino)." },
        { t: "Saludos", d: "Despedida curta e comum em e-mail: 'saudações'. Pode ser 'Saludos cordiales' em tom mais formal." }
      ],
      blocos: [
        {
          t: "Apresentar-se e o roteiro de 60 segundos",
          facil: "Traduzindo: diga seu nome, sua função e uma frase sobre o que você faz hoje. Em 60 segundos cabem umas oito frases curtas.",
          p: [
            "Apresentar-se e usar saudações e despedidas básicas é conteúdo de nível inicial; fórmulas de cortesia e de tratamento aparecem logo depois.",
            "Molde de apresentação: 'Hola, buenos días. Mucho gusto, soy [nombre] y trabajo en datos.' Depois, o que você faz: 'Trabajo con bases de datos y consultas.' E o que está fazendo agora: 'Ahora estoy trabajando en un panel para el equipo.' (revisão de estar + gerúndio).",
            "Roteiro de 60 segundos para treinar (frases nossas): 1) 'Hola, mucho gusto, soy Ana y trabajo en datos.' 2) 'Soy ingeniera de datos y trabajo en una empresa de tecnología.' 3) 'Trabajo con tablas, consultas y servidores.' 4) 'Esta semana he terminado un informe.' 5) 'Ayer revisé un error en un archivo.' 6) 'Ahora estoy trabajando en un panel.' 7) 'Creo que mi trabajo es más técnico que de gestión.' 8) 'Estoy aprendiendo español y quiero hablar con ustedes. Gracias.'",
            "Esse roteiro, de propósito, retoma ser e estar, o presente, o perfecto, o indefinido, o gerúndio, a comparação e o vocabulário de dados. Troque os detalhes por informações reais suas e treine em voz alta, sem ler."
          ],
          lista: [
            "Hola, mucho gusto, soy Ana y trabajo en datos.",
            "Trabajo con bases de datos y consultas.",
            "Esta semana he terminado un informe. (perfecto)",
            "Ayer revisé un error. (indefinido)",
            "Ahora estoy trabajando en un panel. (gerúndio)"
          ],
          dica: "Escolha uma ferramenta, um fato com número ou data e uma tarefa atual: com isso o seu roteiro fica pessoal e curto.",
        },
        {
          t: "Pedir a palavra, pedir para repetir e falar mais devagar",
          facil: "Traduzindo: pedir a vez é '¿Puedo decir algo?'; pedir para repetir é '¿Puede repetir, por favor?'; pedir devagar é '¿Puede hablar más despacio?'.",
          p: [
            "As frases desta parte são de uso geral e nossas, para treinar.",
            "Para pedir a palavra: '¿Puedo decir algo?', 'Perdón, ¿puedo añadir algo?'. Para pedir repetição: '¿Puede repetir, por favor?' (com usted) ou '¿Puedes repetir, por favor?' (com tú). Para pedir velocidade menor: '¿Puede hablar más despacio, por favor?'. Para dizer que não entendeu: 'No entendí' ou 'No entiendo bien'. Para ganhar tempo: 'Un momento, por favor'.",
            "Cuidado: 'por favor' costuma vir no fim e ajuda a soar cortês em reunião de trabalho. 'Perdón' abre pedidos e interrupções; 'disculpe' (usted) e 'disculpa' (tú) são alternativas. Com gente de gerações ou cargos diferentes, a forma com usted é mais segura.",
            "Ao pedir repetição, é melhor dizer o que você entendeu: '¿Puede repetir la fecha, por favor?'. Isso ajuda a outra pessoa a repetir só a parte que faltou."
          ],
          tabela: {
            cab: ["Situação", "Com usted", "Com tú"],
            linhas: [
              ["Pedir repetição", "¿Puede repetir, por favor?", "¿Puedes repetir, por favor?"],
              ["Pedir devagar", "¿Puede hablar más despacio?", "¿Puedes hablar más despacio?"],
              ["Pedir a palavra", "¿Puedo decir algo?", "¿Puedo decir algo?"],
              ["Pedir desculpa", "Disculpe, no entendí.", "Disculpa, no entendí."]
            ]
          },
          dica: "Decore as três: '¿Puedo decir algo?', '¿Puede repetir?', '¿Puede hablar más despacio?'. Elas salvam qualquer reunião.",
        },
        {
          t: "Confirmar entendimento e admitir que não sabe",
          facil: "Traduzindo: '¿Entendí bien que…?' confirma; 'No tengo ese dato ahora, pero lo reviso' admite e promete.",
          p: [
            "Os modelos abaixo são frases nossas, de uso geral, para confirmar informação e admitir que não sabe.",
            "Confirmar: '¿Entendí bien que el plazo es el viernes?', '¿Entonces la entrega es mañana?', '¿Es correcto que…?'. A fórmula '¿Entendí bien que…?' usa o indefinido (entendí) e a conjunção que; depois vem a informação que você entendeu.",
            "Admitir que não sabe: 'No tengo ese dato ahora, pero lo reviso', 'No lo sé todavía, pero lo averiguo', 'No estoy segura/o. Lo reviso y le escribo'. A estrutura é dizer que não tem, prometer revisar e, se possível, dar prazo: 'Se lo mando hoy' ou 'Le escribo mañana'.",
            "Cuidado: 'no sé' sozinho soa seco em reunião. Acrescente sempre uma ação: 'pero lo reviso'. Para pedir ajuda: '¿Alguien tiene ese dato?'. Para esclarecer: 'No me quedó claro…' (não me ficou claro)."
          ],
          lista: [
            "¿Entendí bien que el plazo es el viernes?",
            "No tengo ese dato ahora, pero lo reviso.",
            "No lo sé todavía, pero lo averiguo.",
            "No me quedó claro el requisito. ¿Puede explicarlo?",
            "Lo reviso y le escribo hoy."
          ],
          dica: "Fórmula: não sei + mas faço algo + prazo. 'No tengo ese dato ahora, pero lo reviso y le escribo hoy.'",
        },
        {
          t: "Propor o próximo passo e fechar a reunião",
          facil: "Traduzindo: 'Podemos…' propõe algo para o grupo; 'Le mando… / Te mando…' diz o que você envia.",
          p: [
            "Fechar com um próximo passo mostra clareza. Molde de grupo: 'Podemos revisar los datos mañana', 'Podemos hacer una reunión corta el jueves', 'Podemos empezar por la tabla de clientes'. Molde pessoal: 'Le mando el informe hoy' (usted), 'Te mando el archivo esta tarde' (tú), 'Les mando el resumen' (ustedes).",
            "Ao dizer o que você faz: 'Reviso el error y les escribo', 'Preparo el informe para el viernes'. Para pedir algo ao outro: '¿Puede enviarme el archivo?'. Para confirmar o prazo: '¿Le parece bien el viernes?' (usted) ou '¿Te parece bien el viernes?' (tú).",
            "Revisão: 'Podemos' vem do verbo poder (puedo, puedes, puede, podemos); 'Le/Te/Les mando' usa o pronome indireto (para quem) antes do verbo, como em 'Le escribo'. Estas frases são nossas, de uso geral, sem citação.",
            "Fechamento de reunião: 'Entonces, el próximo paso es revisar los datos. ¿Les parece bien?' E agradeça: 'Gracias a todos.'"
          ],
          dica: "Pronome antes do verbo: 'Le mando', 'Te mando', 'Les escribo'. Em português formal escrito se vê 'mando-lhe'; em espanhol o pronome vai antes do verbo conjugado.",
        },
        {
          t: "Tú ou usted no trabalho",
          facil: "Traduzindo: usted é o tratamento de respeito. Com pessoas que você não conhece, com chefia ou mais velhas, comece com usted.",
          p: [
            "Regra de bolso: com desconhecidos, pessoas em posição hierárquica ou mais velhas, usted marca respeito e distância; na dúvida, comece com usted.",
            "Na prática, 'usted' é o singular de respeito e 'ustedes' o plural para todos (na América Latina). O uso varia muito por país, região e empresa: em algumas equipes os colegas se tratam por tú, em outras (por exemplo, em partes da Colômbia) usted aparece até entre colegas e amigos, e o voseo existe em vários países. Quem é mais velho ou mais sênior pode propor 'puedes tutearme' (pode me tratar por tú). Por isso, siga a pessoa: se ela propuser tú, você pode usar.",
            "Mudança prática: com usted o verbo vai na terceira pessoa: '¿Puede repetir?', 'Le mando el archivo'. Com tú: '¿Puedes repetir?', 'Te mando el archivo'. Para o plural, use ustedes: '¿Pueden repetir?', 'Les mando el archivo'.",
            "Há outras formas de tratamento: 'vosotros' (plural informal na Espanha) e o voseo ('vos', usado em países como Argentina e Uruguai e em outras regiões). Esta trilha usa ustedes e usted/tú, e deixa essas formas para você reconhecer ao ouvir."
          ],
          tabela: {
            cab: ["Situação", "Tratamento seguro", "Exemplo"],
            linhas: [
              ["Cliente ou pessoa desconhecida", "usted", "¿Puede enviarme el archivo?"],
              ["Chefia ou pessoa mais velha", "usted, até a pessoa propor tú", "Le mando el informe hoy."],
              ["Colega próximo", "tú", "Te mando el archivo."],
              ["Grupo de pessoas", "ustedes", "¿Les parece bien el viernes?"]
            ]
          },
          dica: "Na dúvida, comece com usted e deixe a outra pessoa propor tú. É mais seguro do que começar informal.",
        },
        {
          t: "E-mail curto: saudação, pedido e despedida",
          facil: "Traduzindo: um e-mail curto tem três partes: abertura, pedido ou informação e despedida, com Saludos e Quedo atento/a.",
          p: [
            "Os modelos a seguir são nossos, para treinar mensagens eletrônicas breves e simples.",
            "Abertura: 'Hola, Ana:', 'Buenos días:' ou, em tom formal, 'Estimada Ana:' (se for mulher) e 'Estimado Luis:' (se for homem). Depois da saudação é comum usar dois-pontos ou vírgula. Regra geral, sem citação.",
            "Corpo: 'Le escribo para pedirle el informe de ventas.' ou 'Te mando el archivo con los datos de octubre.' Pedido: '¿Puede enviarme el informe antes del viernes?'. Informação: 'Ya he terminado la consulta. Falta revisar la tabla.'",
            "Despedida: 'Saludos' (simples), 'Saludos cordiales' (formal), 'Gracias' e 'Quedo atento' (homem) ou 'Quedo atenta' (mulher), que significa 'fico no aguardo'. Assinatura: nome e cargo. Estas formas são de uso geral; em e-mails formais também se vê 'Quedo a la espera'."
          ],
          lista: [
            "Hola, Ana: Te mando el archivo con los datos de octubre.",
            "¿Puedes enviarme el informe antes del viernes?",
            "Ya he terminado la consulta. Falta revisar la tabla.",
            "Gracias. Quedo atenta. Saludos, [nombre]"
          ],
          dica: "Três partes, três frases: saudação, pedido ou informação, despedida. Menos é mais.",
        },
        {
          t: "Armadilhas de brasileiro em reunião",
          facil: "Traduzindo: em reunião o portuñol escapa por nervosismo. Pare, respire e escolha a frase pronta da aula.",
          p: [
            "Estes são erros comuns de falantes de português; são observações nossas.",
            "Cortesia: 'Muito obrigada' vira 'Muchas gracias' (a mulher não muda o 'gracias'); 'prazer' vira 'mucho gusto' ou 'encantada/o'. Não use 'obrigado/a' em espanhol.",
            "Pronome: dizer 'mando-te' ou 'mando-lhe' (pronome depois do verbo) por hábito. Em espanhol, 'te mando' / 'le mando'. Confusão tú/usted no meio da frase: 'Usted puedes' mistura as duas formas; escolha uma e mantenha ('usted puede' ou 'tú puedes').",
            "Preposição: depois de 'estoy de acuerdo' vem 'con' (con ustedes), e não 'com' do português. Acento: 'reunión', 'sí' (sim) e 'si' (se).",
            "Última armadilha: responder 'sí' a tudo para não travar. Se não entendeu, peça para repetir: '¿Puede repetir, por favor?'."
          ],
          armadilha: "Não responda 'sí' quando não entendeu. Peça: '¿Puede repetir, por favor?' ou '¿Puede hablar más despacio?'. E nunca misture 'usted' com verbo em tú.",
        }
      ],
      exemplo: {
        t: "Uma reunião curta de ponta a ponta",
        texto: "Reunião com o time de Bogotá. Você: 'Buenos días. Mucho gusto, soy Ana y trabajo en datos.' O gerente diz: 'La entrega es el viernes y el servidor no responde.' Você: 'Perdón, ¿puede hablar más despacio, por favor?' Ele repete. Você confirma: '¿Entendí bien que la entrega es el viernes y que el servidor tiene un error?' Ele: 'Sí. ¿Tienen los datos de octubre?' Você: 'No tengo ese dato ahora, pero lo reviso y le escribo hoy.' Depois propõe: 'Podemos hacer una reunión corta mañana. Creo que es mejor revisar primero la tabla de clientes.' Ele: 'Estoy de acuerdo.' Você fecha: 'Le mando el resumen esta tarde. Gracias.' No e-mail: 'Hola, Luis: Te mando el resumen. Ya he terminado la consulta; falta revisar la tabla. Saludos, Ana.' Repare na revisão da trilha: apresentação, perfecto, comparação, vocabulário de dados e tratamento por usted e tú."
      },
      prova: [
        "Reunião: apresentar-se em uma frase e dar uma frase de status.",
        "Conversa: pedir repetição ou velocidade menor sem se desculpar demais.",
        "Entendimento: confirmar um prazo com '¿Entendí bien que…?'.",
        "E-mail: escrever três linhas com saudação, pedido e despedida."
      ],
      explique: "Explique com as próprias palavras como você se apresenta, como pede para repetir, como confirma entendimento e como propõe um próximo passo numa reunião em espanhol, e quando escolhe usted em vez de tú.",
      checagem: [
        "Que frase você usa para pedir a palavra, para pedir repetição e para pedir que falem mais devagar?",
        "Como você admite que não tem um dado sem soar seco, e qual é o próximo passo?",
        "Quando você usa usted, tú e ustedes no trabalho?"
      ]
    },
    fontes: [PLAN, DELE],
    cartoes: [
      { id: "e16c1", f: "Apresente-se: 'Prazer, sou Ana e trabalho com dados.'", v: "Mucho gusto, soy Ana y trabajo en datos. Mucho gusto + soy + nome + trabajo en.", t: "e16" },
      { id: "e16c2", f: "Peça a palavra numa reunião.", v: "¿Puedo decir algo? Frase curta e educada para entrar na conversa.", t: "e16" },
      { id: "e16c3", f: "Peça para repetir, com usted.", v: "¿Puede repetir, por favor? Com usted o verbo vai na terceira pessoa: puede.", t: "e16" },
      { id: "e16c4", f: "Peça para repetir, com tú.", v: "¿Puedes repetir, por favor? Com tú o verbo termina em -es: puedes.", t: "e16" },
      { id: "e16c5", f: "Peça que falem mais devagar.", v: "¿Puede hablar más despacio, por favor? Más despacio = mais devagar.", t: "e16" },
      { id: "e16c6", f: "Confirme que o prazo é sexta-feira.", v: "¿Entendí bien que el plazo es el viernes? Entendí bien que + informação.", t: "e16" },
      { id: "e16c7", f: "Diga: 'Não tenho esse dado agora, mas vou conferir.'", v: "No tengo ese dato ahora, pero lo reviso. Não tenho + mas faço algo.", t: "e16" },
      { id: "e16c8", f: "Proponha uma reunião curta amanhã.", v: "Podemos hacer una reunión corta mañana. Podemos + infinitivo propõe algo ao grupo.", t: "e16" },
      { id: "e16c9", f: "Diga: 'Eu lhe envio o relatório hoje.' (usted)", v: "Le mando el informe hoy. O pronome le vem antes do verbo.", t: "e16" },
      { id: "e16c10", f: "Diga: 'Mando o arquivo para você esta tarde.' (tú)", v: "Te mando el archivo esta tarde. Te = para ti; vem antes do verbo.", t: "e16" },
      { id: "e16c11", f: "Feche um e-mail em tom neutro.", v: "Gracias. Saludos, [nombre]. Saludos é a despedida curta e comum.", t: "e16" },
      { id: "e16c12", f: "Diga que fica no aguardo, sendo mulher.", v: "Quedo atenta. Atenta com -a para mulher; atento para homem.", t: "e16" },
      { id: "e16c13", f: "Diga: 'Concordo com vocês.' (revisão)", v: "Estoy de acuerdo con ustedes. Estoy de acuerdo + con + pessoa.", t: "e16" },
      { id: "e16c14", f: "Diga: 'Esta semana terminei o relatório.' (revisão)", v: "Esta semana he terminado el informe. Esta semana pede he + particípio.", t: "e16" },
      { id: "e16c15", f: "Diga: 'Estou trabalhando num painel.' (revisão)", v: "Estoy trabajando en un panel. Estoy + gerúndio + en + a tarefa.", t: "e16" }
    ],
    questoes: [
      {
        id: "e16q1", s: 4, t: "e16",
        e: "Elige la mejor frase para presentarte. (Escolha a melhor frase para se apresentar.)",
        o: ["Mucho gusto, soy Ana y trabajo en datos.", "Prazer, eu sou Ana e trabalho no dados.", "Soy trabajo Ana en datos.", "Mucho gusto, me llamo trabajo en datos."],
        c: [0],
        x: "A frase 'Mucho gusto, soy Ana y trabajo en datos' tem a ordem natural: fórmula de cortesia, 'soy' com o nome e 'trabajo en' com a área. A versão com 'prazer' e 'no dados' mistura português e espanhol. 'Soy trabajo Ana' coloca verbos em lugares errados. A frase com 'me llamo trabajo' confunde o verbo de nome com o de trabalho. Aprenda a ordem como um bloco."
      },
      {
        id: "e16q2", s: 4, t: "e16",
        e: "Elige la frase para pedir repetición con usted. (Escolha a frase com usted.)",
        o: ["¿Puede repetir, por favor?", "¿Puedes repetir, por favor?", "¿Puedo repetir, por favor?", "¿Pueden repetir tú, por favor?"],
        c: [0],
        x: "Com usted, o verbo fica na terceira pessoa do singular: puede. A forma terminada em -es é do tratamento por tú. A forma com 'puedo' significa 'eu posso', e inverte quem repete. A forma com 'pueden' está no plural e ainda mistura o pronome tú, o que contradiz o plural de ustedes. Em reunião, mantenha uma forma de tratamento do início ao fim."
      },
      {
        id: "e16q3", s: 4, t: "e16",
        e: "Elige las dos frases para pedir ayuda a entender. (Escolha duas)",
        o: ["¿Puede hablar más despacio, por favor?", "¿Puedes repetir la fecha, por favor?", "Sí, sí, entiendo todo.", "No importa, sigan."],
        c: [0, 1],
        x: "Pedir que falem mais devagar e pedir que repitam a data são formas diretas e educadas de resolver uma dúvida. Responder 'sí, sí' sem ter entendido não resolve e pode causar um erro de prazo. Dizer 'no importa, sigan' abre mão de entender. Observação: uma frase está com usted e a outra com tú; em reunião real, escolha um tratamento e mantenha."
      },
      {
        id: "e16q4", s: 4, t: "e16",
        e: "Elige la opción correcta. (Escolha a opção correta.) '¿___ bien que el plazo es el viernes?'",
        o: ["Entendí", "Entendo", "Entenderé", "Entendido"],
        c: [0],
        x: "A pergunta '¿Entendí bien que…?' usa o indefinido de entender na primeira pessoa (também se ouve '¿Entiendo bien que…?', com o presente). 'Entendo' é a forma do português e não existe em espanhol. 'Entenderé' está no futuro e muda o sentido. 'Entendido' é o particípio, usado depois de haber, e sozinho não conjuga com 'yo'. O indefinido (entendí) retoma a aula 13 e fala de um momento passado: você acabou de ouvir."
      },
      {
        id: "e16q5", s: 4, t: "e16",
        e: "Elige la frase que admite que no sabes con educación. (Escolha a frase que admite com educação.)",
        o: ["No tengo ese dato ahora, pero lo reviso.", "No sé.", "Eso no es mi problema.", "Pregúntele a otro."],
        c: [0],
        x: "A frase que diz que não tem o dado agora e promete revisar admite a lacuna e oferece uma ação, que é o que reuniões esperam. 'No sé' sozinho fecha a conversa. 'Eso no es mi problema' é hostil. 'Pregúntele a otro' passa a responsabilidade sem ajudar. Em espanhol de trabalho, admita e comprometa-se com uma ação curta."
      },
      {
        id: "e16q6", s: 4, t: "e16",
        e: "Elige las dos frases que proponen un próximo paso. (Escolha duas)",
        o: ["Podemos hacer una reunión corta mañana.", "Le mando el resumen esta tarde.", "Yo no tengo tiempo.", "El resumen es interesante."],
        c: [0, 1],
        x: "'Podemos hacer una reunión' propõe uma ação ao grupo, e 'Le mando el resumen' diz o que você mesma vai fazer e quando. As outras duas frases descrevem uma situação ou uma opinião, mas não definem quem faz o quê. Um próximo passo precisa de verbo de ação e, de preferência, um prazo."
      },
      {
        id: "e16q7", s: 4, t: "e16",
        e: "¿Dónde va el pronombre? (Onde vai o pronome?) 'Ya ___ el informe, Luis.' (Eu te mando.)",
        o: ["te mando", "mando te", "mando-te", "mandote"],
        c: [0],
        x: "Com um verbo conjugado, o pronome vem antes: te mando. 'Mando te' separa o pronome depois do verbo, que não é o caso aqui. 'Mando-te' copia o hífen do português, e não existe em espanhol. 'Mandote' cola o pronome ao final como se fosse uma palavra, o que também não funciona com um verbo no presente."
      },
      {
        id: "e16q8", s: 4, t: "e16",
        e: "¿Cuándo es mejor usar 'usted'? (Quando é melhor usar usted?)",
        o: ["Con una persona desconocida o con un jefe.", "Con un amigo muy cercano.", "Siempre con el equipo de trabajo.", "Nunca en el trabajo."],
        c: [0],
        x: "Usted marca respeito e distância e costuma ser a escolha segura com desconhecidos, pessoas em posição hierárquica e diferenças de idade. Com um amigo muito próximo, o tratamento natural é tú. Usar usted 'sempre' com o time pode soar frio quando todos se tratam por tú, e 'nunca' ignora situações em que o respeito importa. A regra é seguir a outra pessoa e o costume do lugar."
      },
      {
        id: "e16q9", s: 4, t: "e16",
        e: "Elige las dos despedidas correctas para un e-mail. (Escolha duas)",
        o: ["Saludos cordiales.", "Quedo atenta.", "Tchau, valeu.", "Hasta nunca."],
        c: [0, 1],
        x: "'Saludos cordiales' é uma despedida formal e comum, e 'Quedo atenta' (para mulher) indica que você fica no aguardo de uma resposta. As outras duas não servem: 'tchau, valeu' é português informal, e 'hasta nunca' é uma despedida hostil. Se quem escreve é homem, a forma correspondente é 'Quedo atento'."
      },
      {
        id: "e16q10", s: 4, t: "e16",
        e: "Elige la frase correcta para el correo. (Escolha a frase correta.)",
        o: ["Hola, Ana: Te mando el archivo con los datos.", "Hola Ana, te enviado el archivo con los datos.", "Hola Ana: yo enviar archivo datos.", "Querida Ana, mando-te o arquivo."],
        c: [0],
        x: "A frase com saudação, dois-pontos e 'te mando el archivo' tem pronome antes do verbo, concordância correta e ordem natural. A versão com 'te enviado' usa o particípio onde se esperava um verbo conjugado. A versão com 'yo enviar archivo datos' é telegráfica demais. A versão com 'mando-te o arquivo' é português, não espanhol."
      },
      {
        id: "e16q11", s: 4, t: "e16",
        e: "Elige la frase de revisión correcta. (Escolha a frase de revisão correta.) 'Esta semana ___ el informe y hoy ___ en el panel.'",
        o: ["he terminado / estoy trabajando", "terminando / estoy trabajado", "terminado / estoy trabajo", "terminaba / trabajando"],
        c: [0],
        x: "'Esta semana' pede o perfecto (he terminado) e 'hoy' com ação em andamento pede o gerúndio (estoy trabajando). As outras opções deixam o verbo sem auxiliar ('terminando', 'terminado', 'trabajando' soltos) ou formam um progressivo que não existe ('estoy trabajado', 'estoy trabajo'). Observação: na fala latino-americana também se ouve 'terminé' com 'esta semana', mas aqui treinamos o contraste de manual. Esta questão retoma as aulas 13 e 15."
      },
      {
        id: "e16q12", s: 4, t: "e16",
        e: "Elige la frase de revisión correcta. (Escolha a frase correta.) 'Creo que esta opción es ___ que la otra.'",
        o: ["mejor", "más mejor", "más bueno", "tan mejor"],
        c: [0],
        x: "'Mejor que' é o comparativo certo de bueno e já inclui a ideia de 'mais'. 'Más mejor' soma duas vezes. 'Más bueno' é a tradução literal de 'mais bom'. 'Tan mejor' mistura a estrutura de igualdade com um comparativo e não funciona. A questão retoma a aula 14, junto com a fórmula de opinião 'creo que'."
      },
      {
        id: "e16q13", s: 4, t: "e16",
        e: "Elige la mejor respuesta si no entendiste. (Escolha a melhor resposta se você não entendeu.)",
        o: ["Perdón, no entendí. ¿Puede repetir, por favor?", "Sí, claro.", "No hablo español.", "Más tarde te escribo."],
        c: [0],
        x: "Dizer que não entendeu e pedir repetição resolve o problema na hora e é cortês. Responder 'sí, claro' sem ter entendido cria risco de erro. 'No hablo español' fecha a conversa e nem é verdade: você fala o suficiente para pedir uma repetição. 'Más tarde te escribo' adia sem explicar o que ficou sem resposta."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: reunião de ponta a ponta em 60 segundos",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "A reunião é uma sequência de frases fixas. Treinar a sequência completa em voz alta mostra onde você trava e onde o portuñol escapa.",
      antes: "Ter lido a aula e o roteiro de 60 segundos. Preparar um papel com seu nome, sua área, uma tarefa que terminou, uma em andamento e um bloqueio. Escolher um lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste as frases ao seu trabalho.",
      passos: [
        { t: "Preparar o roteiro", p: "Escreva em papel só palavras-chave: nome, área, uma tarefa concluída, uma em andamento, um bloqueio e um próximo passo. Não escreva frases inteiras." },
        { t: "Ouvir e repetir", p: "Leia em voz alta o roteiro de 60 segundos da aula e as frases de pedir repetição, confirmar e propor próximo passo. Repita cada uma duas vezes, devagar." },
        { t: "Gravar a primeira versão (60 a 90 s)", p: "Grave o seu roteiro completo, sem ler. Inclua uma frase com '¿Entendí bien que…?' e uma com 'No tengo ese dato ahora, pero lo reviso'." },
        { t: "Ouvir e comparar", p: "Escute uma vez e marque: tratamento (usted ou tú) mantido, pronome antes do verbo (le mando), 'sí' dito sem entender e travadas." },
        { t: "Regravar e simular uma pergunta", p: "Regrave corrigindo e acrescente uma simulação: imagine que alguém fala rápido e peça '¿Puede hablar más despacio, por favor?'. Termine com 'Le mando el resumen esta tarde. Gracias.'" }
      ],
      verificar: "Na segunda gravação você se apresentou com 'mucho gusto, soy… y trabajo en…', usou um perfecto, um indefinido e um gerúndio, pediu repetição ou velocidade menor, confirmou com '¿Entendí bien que…?', admitiu que não sabia com um 'pero lo reviso', propôs um próximo passo e manteve o mesmo tratamento do início ao fim.",
      limpar: [
        "Apague as gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar daqui a algumas semanas, se quiser.",
        "Anote em uma linha as três frases que mais travou e coloque-as nos cartões da semana."
      ],
      erros: [
        { s: "Travo na hora de pedir repetição", c: "Medo de parecer que não sabe espanhol.", r: "Treine '¿Puede repetir, por favor?' dez vezes até sair sem pensar; é uma frase profissional e comum." },
        { s: "Misturo usted e tú", c: "Mudança de formalidade no meio da frase.", r: "Escolha uma forma antes de gravar e escreva-a no papel; regrave só as frases com mistura." },
        { s: "Digo 'mando-te' ou 'mando-lhe'", c: "Ordem do pronome no português.", r: "Treine 'le mando', 'te mando' e 'les mando' com três objetos diferentes: archivo, informe, resumen." },
        { s: "Falo muito rápido e engulo palavras", c: "Nervosismo e vontade de terminar logo.", r: "Respire entre as frases do roteiro, marque pausas no papel e regrave mais devagar." }
      ]
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
