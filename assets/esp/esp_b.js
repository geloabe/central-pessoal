(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  var PLAN = ["Instituto Cervantes: Plan curricular (Niveles de referencia para el español)", "https://cervantes.org/es/sobre-nosotros/publicaciones/plan-curricular-instituto-cervantes-niveles-referencia-espanol"];
  var DELE = ["Instituto Cervantes: exámenes DELE (níveis A1 e A2)", "https://cervantes.org/es/examenes/dele"];
  var PRENSA = ["Instituto Cervantes: edição digital gratuita do Plan curricular (nota de imprensa)", "https://cervantes.org/es/sobre-nosotros/sala-prensa/notas-prensa/el-cervantes-publica-en-internet-la-edicion-digital-de-su"];

  /* ===================== AULA 5 ===================== */
  C.dias[5] = {
    aula: {
      titulo: "Presente regular (-ar, -er, -ir) e verbos de trabalho do dia a dia",
      resumo: "Como conjugar trabajar, comer e vivir no presente, usar os verbos de rotina de uma engenheira de dados (analizar, escribir, leer, enviar, usar…), deixar o pronome sujeito de lado, negar com 'no' e evitar as armadilhas do portuñol, como o -m português no lugar do -n espanhol.",
      simples: {
        analogia: "Pense em cada verbo regular como uma peça de Lego com duas partes. A parte de baixo é o tronco, que guarda o significado: trabaj-, com-, viv-. A parte de cima é a terminação, que funciona como um crachá dizendo quem faz a ação: -o para eu, -as ou -es para tu, -a ou -e para ele, -amos, -emos ou -imos para nós, -an ou -en para eles. O tronco nunca muda nos verbos regulares; só se troca o crachá. Como o crachá já diz a pessoa, o pronome (yo, tú, él) quase sempre fica de fora, como no português, só que em espanhol isso é ainda mais comum. Aprender os três grupos (-ar, -er, -ir) é aprender três cartelas de crachás, e a maior parte dos verbos do seu trabalho cabe nelas.",
        pontos: [
          "Três grupos pela terminação do infinitivo: -ar (trabajar), -er (comer) e -ir (vivir).",
          "Cada grupo troca só a terminação: yo -o, tú -as/-es, él -a/-e, ellos -an/-en.",
          "-er e -ir são quase iguais: só a forma de 'nosotros' difere (-emos x -imos).",
          "O pronome sujeito é opcional: 'Trabajo con datos' basta; use 'yo' só para contrastar.",
          "A negação é 'no' antes do verbo: 'No trabajo hoy', sem verbo auxiliar."
        ],
        paraQueServe: "Falar de rotina e de trabalho em espanhol (o que você faz, usa, lê e escreve) com verbos no presente, sem cair no portuñol."
      },
      glossario: [
        { t: "Infinitivo", d: "Forma do verbo que termina em -ar, -er ou -ir (hablar, aprender, escribir); é o nome do verbo no dicionário." },
        { t: "Tronco (raiz)", d: "A parte do verbo sem a terminação (habl-, aprend-, escrib-); nos verbos regulares ela não muda." },
        { t: "Terminação", d: "A parte final que indica a pessoa (-o, -as, -a, -amos, -an…); é ela que dispensa o pronome sujeito." },
        { t: "Pronome sujeito", d: "yo, tú, él/ella/usted, nosotros/as, ellos/ellas/ustedes; em espanhol costuma ser omitido, e aparece para dar ênfase ou contraste." },
        { t: "usted / ustedes", d: "Tratamento respeitoso (singular e plural). Usam o verbo na forma de 'él' e de 'ellos'; ustedes é o plural usual na América Latina." },
        { t: "Verbo regular", d: "Verbo que segue o modelo do seu grupo sem mudar o tronco (trabajar, comer, vivir)." },
        { t: "Negação com 'no'", d: "Palavra 'no' colocada antes do verbo conjugado: 'No entiendo', 'No uso Excel'." }
      ],
      blocos: [
        {
          t: "Onde esta aula entra no A1-A2",
          facil: "Traduzindo: o presente regular é a base do A1; esta aula é o primeiro passo para falar de rotina e de trabalho.",
          p: [
            "A página do Instituto Cervantes sobre o Plan curricular descreve a obra como um conjunto de três volumes que fixa os níveis de referência do espanhol; o primeiro volume cobre A1-A2 (etapa básica ou de iniciação) e traz inventários de conteúdo, entre eles o de gramática. A edição eletrônica está no Centro Virtual Cervantes.",
            "Aviso de transparência: nesta redação as páginas de inventário do Centro Virtual Cervantes e as páginas da RAE não abriram, então as regras de conjugação abaixo são regra geral de gramática, sem citação de página. Confira em uma gramática ou dicionário de sua confiança, em especial se tiver dúvida numa forma específica.",
            "O que esta aula ensina: conjugar verbos regulares, falar do trabalho do dia a dia, omitir o pronome e negar. É o mínimo para se apresentar e descrever sua rotina em espanhol de forma simples."
          ],
          dica: "Estude em voz alta: a terminação certa precisa sair da boca antes de você pensar nela.",
          fonte: PLAN
        },
        {
          t: "As três famílias: -ar, -er, -ir",
          facil: "Traduzindo: tire o -ar, -er ou -ir e ponha a terminação da pessoa; -er e -ir só diferem em 'nosotros'.",
          p: [
            "Regra geral, sem citação: para conjugar, retire a terminação do infinitivo e acrescente a da pessoa. De trabajar tiramos -ar e ficamos com trabaj-; de comer, com-; de vivir, viv-.",
            "Repare que, nos verbos regulares, 'yo' termina em -o, 'tú' em -s, e 'ellos/ustedes' em -n. Quem lembra desses três pontos já acerta a maior parte das formas."
          ],
          tabela: {
            cab: ["Pessoa", "trabajar (-ar)", "comer (-er)", "vivir (-ir)"],
            linhas: [
              ["yo", "trabajo", "como", "vivo"],
              ["tú", "trabajas", "comes", "vives"],
              ["él / ella / usted", "trabaja", "come", "vive"],
              ["nosotros / nosotras", "trabajamos", "comemos", "vivimos"],
              ["ellos / ellas / ustedes", "trabajan", "comen", "viven"]
            ]
          },
          dica: "Truque: -er e -ir são idênticos, menos em 'nosotros' (comemos x vivimos). Decore só essa exceção.",
        },
        {
          t: "Verbos de trabalho que você vai usar toda semana",
          facil: "Traduzindo: com doze verbos regulares você já descreve boa parte da sua rotina de dados.",
          p: [
            "Regra geral, sem citação: os verbos abaixo seguem os modelos da tabela anterior. Leia cada exemplo em voz alta e troque o objeto por algo da sua realidade.",
            "Observe que 'datos' é masculino plural, 'informe' é masculino e 'consulta' (consulta SQL) é feminino."
          ],
          lista: [
            "trabajar (-ar): Trabajo en una empresa de tecnología.",
            "hablar (-ar): Hablo inglés y un poco de español.",
            "usar (-ar): Uso Python y SQL todos los días.",
            "analizar (-ar): Analizamos los datos de ventas.",
            "enviar (-ar): Envío el informe por correo.",
            "escribir (-ir): Escribo consultas SQL.",
            "leer (-er): Leo la documentación en inglés.",
            "aprender (-er): Aprendo español cada día.",
            "vivir (-ir): Vivo en São Paulo.",
            "responder (-er): Respondo los correos por la mañana.",
            "compartir (-ir): Compartimos el tablero con el equipo.",
            "revisar (-ar): Reviso el código antes de enviarlo."
          ],
          dica: "Escolha três verbos da lista e monte uma frase verdadeira sobre você para cada um.",
        },
        {
          t: "O pronome sujeito é opcional",
          facil: "Traduzindo: em espanhol a terminação já diz quem faz; diga 'yo' só quando quiser ênfase ou contraste.",
          p: [
            "Regra geral, sem citação: como a terminação identifica a pessoa, o espanhol omite o pronome na maior parte das frases. 'Trabajo con datos' é a forma natural; 'Yo trabajo con datos' soa como ênfase, por exemplo ao contrastar: 'Yo trabajo con datos, ella trabaja con ventas'.",
            "Isso é parecido com o português, mas muitos brasileiros mantêm 'eu' o tempo todo. Em espanhol, repetir 'yo' em toda frase soa pesado.",
            "Com 'usted' e 'ustedes' o pronome também pode ficar de fora quando o contexto é claro: '¿Trabaja aquí?' pergunta a uma pessoa, com respeito; '¿Trabajan aquí?' pergunta a várias."
          ],
          lista: [
            "Natural: Escribo informes cada semana.",
            "Com contraste: Yo escribo informes; tú escribes código.",
            "Pergunta formal: ¿Usted trabaja en datos? ou, mais simples, ¿Trabaja en datos?"
          ],
          dica: "Se você pode saber quem fala pelo verbo, pule o pronome.",
        },
        {
          t: "Negação com 'no'",
          facil: "Traduzindo: ponha 'no' logo antes do verbo e pronto; não existe 'do/does' como no inglês.",
          p: [
            "Regra geral, sem citação: a negação mais simples é 'no' antes do verbo conjugado: 'No hablo alemán', 'No usamos Excel', 'No entiendo'.",
            "Diferente do inglês, o espanhol não tem verbo auxiliar de negação (como 'don't'). Em relação ao português a ordem é a mesma; a armadilha é escrever 'não' em vez de 'no' ou colocar o 'no' depois do verbo.",
            "Se o pronome aparece, o 'no' vem entre ele e o verbo: 'Yo no trabajo los domingos'."
          ],
          lista: [
            "No trabajo los fines de semana.",
            "Ellos no leen la documentación completa.",
            "¿No vives en Lima? No, vivo en Bogotá.",
            "Yo no escribo código, escribo consultas."
          ],
          dica: "A negação é sempre 'no' + verbo. Nunca 'trabajo no'.",
        },
        {
          t: "Português x espanhol: o que muda de verdade",
          facil: "Traduzindo: parecer português é o risco; o -n final, o 'tú' e o -imos são onde o brasileiro mais escorrega.",
          p: [
            "Regra geral, sem citação. 'Tú comes' x 'você come': em português do Brasil usamos 'você' com o verbo na forma de ele. Em espanhol, 'tú' (informal) pede a forma com -s: 'tú comes'. O tratamento que mais se parece com 'você' formal é 'usted', que usa a forma de ele: 'usted come'. Misturar as duas (tú come) é um erro típico.",
            "Terceira pessoa do plural: o português termina em -m (eles trabalham, comem, vivem) e o espanhol termina em -n (ellos trabajan, comen, viven). Trocar o -n por -m é um vício de escrita de quem pensa em português.",
            "Nosotros: em português dizemos 'vivemos'; em espanhol o presente distingue -emos (comemos) de -imos (vivimos). Quem escreve 'vivemos' está usando a terminação portuguesa.",
            "Acento escrito: 'tú' (pronome) leva acento e 'tu' (seu/sua) não. O verbo enviar escreve 'envío, envías, envía, enviamos, envían', com acento no í nas formas de yo, tú, él e ellos; em 'enviamos' não há acento. É regra geral, sem citação; confira num dicionário."
          ],
          dica: "Cheque três finais: tú termina em -s, ellos em -n e vivir em 'nosotros' vira vivimos.",
        },
        {
          t: "Armadilhas de brasileiro (portuñol)",
          facil: "Traduzindo: são erros comuns de falantes de português, não regras oficiais; reconheça e corrija a tempo.",
          p: [
            "Estes são erros comuns de falantes de português (padrões de transferência, sem estatística e sem citação de página):",
            "'ellos trabajam' e 'ustedes comem' com -m; o certo é trabajan e comen. 'Yo escrevo' (verbo português): o espanhol é escribir, yo escribo. 'Vivemos' e 'vivimos': só o segundo é espanhol.",
            "'Tú trabaja' ou 'tú come' (formas de ele com 'tú'): o certo é tú trabajas, tú comes. E 'trabalho' com lh: o espanhol escreve com j, trabajo.",
            "Escrever 'no' depois do verbo ('trabajo no') ou duplicar o pronome em toda frase também soam estranhos."
          ],
          armadilha: "Antes de falar, confira: yo termina em -o, tú em -s, ellos em -n; e escreva trabajo com j, nunca com lh.",
        },
        {
          t: "Como saber se você está no nível A1-A2",
          facil: "Traduzindo: o DELE tem provas de nível A1 e A2; esta aula ajuda no que se espera de quem começa.",
          p: [
            "A página dos exames do Instituto Cervantes mostra que o DELE oferece convocatórias para os níveis A1 e A2, entre outros, e traz as datas de inscrição. Esta trilha não prepara para uma prova específica nem promete nível; a ideia é usar a referência para saber qual é o horizonte inicial.",
            "Um bom teste pessoal: consegue dizer cinco frases sobre seu trabalho, em presente, sem olhar o texto, e ouvir a gravação sem achar nenhum -m final nem 'tú' com verbo de ele? Se sim, a base desta aula está firme."
          ],
          dica: "Não use esta aula como prova de nível; use como checklist do que falar sozinha.",
          fonte: DELE
        }
      ],
      exemplo: {
        t: "Uma apresentação curta no presente",
        texto: "Imagine que você se apresenta em uma videochamada com uma equipe de Bogotá. 'Hola, soy Ana. Vivo en São Paulo y trabajo como ingeniera de datos. Uso Python y SQL todos los días y escribo consultas para el equipo de ventas. Cada mañana leo los correos y respondo las dudas del equipo. Aprendo español y todavía no hablo muy rápido. Mis compañeros analizan los datos de clientes, y nosotros compartimos los resultados cada viernes. ¿Y ustedes? ¿Dónde trabajan?' Repare que quase nenhum verbo traz o pronome, que aparece só no contraste e na pergunta final, e que cada terminação combina com quem faz a ação: yo em -o, nosotros em -amos/-imos, ellos em -an. Note também que a negação, 'no hablo muy rápido', fica antes do verbo."
      },
      prova: [
        "Videochamada: dizer onde você mora, onde trabalha e o que usa no trabalho, com verbos no presente.",
        "Reunião: pedir a alguém que explique ('¿Puede escribir el nombre?') sem errar a terminação de usted.",
        "Texto técnico: ler a documentação e comentar 'Leo la documentación' ou 'No entiendo esta parte'.",
        "Mensagem curta: escrever 'Envío el informe hoy' sem trocar o -o final."
      ],
      explique: "Explique com as próprias palavras como se conjuga um verbo regular em -ar, -er e -ir no presente, quando omitir o pronome e como negar, e dê um exemplo real do seu trabalho.",
      checagem: [
        "Quais são as terminações de yo, tú, él, nosotros e ellos nos três grupos, e qual é a única diferença entre -er e -ir?",
        "Por que em espanhol se diz 'Trabajo con datos' e não 'Yo trabajo con datos' na maioria dos casos?",
        "Qual é a forma de 'ellos' de analizar e o que o português faz de diferente no final dessa palavra?"
      ]
    },
    fontes: [PLAN, DELE, PRENSA],
    cartoes: [
      { id: "e5c1", f: "Diga: 'Eu trabalho com dados.' (sem pronome)", v: "Trabajo con datos. Terminação -o de yo; o pronome é opcional.", t: "e5" },
      { id: "e5c2", f: "Diga: 'Você (formal) trabalha aqui?'", v: "¿Usted trabaja aquí? (ou ¿Trabaja aquí?) Usted usa a forma de él: -a.", t: "e5" },
      { id: "e5c3", f: "Diga: 'Tu comes na empresa?' (informal)", v: "¿Tú comes en la empresa? Tú pede -s: comes, nunca 'come'.", t: "e5" },
      { id: "e5c4", f: "Diga: 'Eles trabalham em Lima.'", v: "Ellos trabajan en Lima. Terceira plural termina em -n, não em -m.", t: "e5" },
      { id: "e5c5", f: "Diga: 'Nós moramos em São Paulo.'", v: "Vivimos en São Paulo. Vivir faz -imos em nosotros (comer faz -emos).", t: "e5" },
      { id: "e5c6", f: "Diga: 'Eu escrevo consultas SQL.'", v: "Escribo consultas SQL. Escribir é -ir: yo escribo, nunca 'escrevo'.", t: "e5" },
      { id: "e5c7", f: "Diga: 'Eu leio a documentação.'", v: "Leo la documentación. Leer é -er: leo, lees, lee, leemos, leen.", t: "e5" },
      { id: "e5c8", f: "Diga: 'Eu não falo alemão.'", v: "No hablo alemán. A negação é 'no' antes do verbo.", t: "e5" },
      { id: "e5c9", f: "Diga: 'Nós analisamos os dados.'", v: "Analizamos los datos. Analizar é -ar: analizo, analizas, analiza, analizamos, analizan.", t: "e5" },
      { id: "e5c10", f: "Diga: 'Ele envia o relatório hoje.'", v: "Él envía el informe hoy. Enviar leva acento: envío, envías, envía; informe = relatório.", t: "e5" },
      { id: "e5c11", f: "Diga: 'Eu aprendo espanhol todos os dias.'", v: "Aprendo español todos los días. Aprender é -er: aprendo, aprendes, aprende.", t: "e5" },
      { id: "e5c12", f: "Diga: 'Eu uso Python, mas ela usa R.' (com contraste)", v: "Yo uso Python, pero ella usa R. Aqui yo e ella aparecem porque há contraste.", t: "e5" },
      { id: "e5c13", f: "Diga: 'Vocês respondem os e-mails?'", v: "¿Ustedes responden los correos? Ustedes usa a forma de ellos: -en.", t: "e5" }
    ],
    questoes: [
      {
        id: "e5q1", s: 2, t: "e5",
        e: "Completa: Yo ___ en una empresa de datos. (trabajar) (Complete a frase.)",
        o: ["trabajo", "trabajas", "trabaja", "trabajan"],
        c: [0],
        x: "Com 'yo', o verbo regular em -ar termina em -o: trabajo. A forma que termina em -as é a de 'tú' e não combina com 'yo'. A forma que termina em -a é a de él, ella ou usted, e a que termina em -an é a de ellos ou ustedes. Cada terminação identifica uma pessoa diferente, por isso é preciso casar a terminação com o sujeito da frase."
      },
      {
        id: "e5q2", s: 2, t: "e5",
        e: "Elige la forma correcta: Ellos ___ SQL todos los días. (usar) (Escolha a forma correta.)",
        o: ["usa", "usan", "usamos", "usam"],
        c: [1],
        x: "Com 'ellos', o verbo em -ar termina em -an: usan. A forma que termina em -a é a de uma só pessoa (él), a que termina em -amos é a de 'nosotros', e a que termina em -m é o vício de escrita de quem pensa em português (eles usam): em espanhol a terceira pessoa do plural termina em -n, nunca em -m."
      },
      {
        id: "e5q3", s: 2, t: "e5",
        e: "Elige la opción correcta: ¿Tú ___ el informe? (escribir) (Escolha a opção correta.)",
        o: ["escribo", "escribes", "escribe", "escriben"],
        c: [1],
        x: "Com 'tú', os verbos em -ir e -er terminam em -es: escribes. A forma terminada em -o é a de 'yo', a terminada em -e é a de él, ella ou usted, e a terminada em -en é a de ellos ou ustedes. O erro comum de falantes de português é usar a forma de ele com 'tú' (tú escribe), porque no português do Brasil 'você escreve' usa a forma de ele."
      },
      {
        id: "e5q4", s: 2, t: "e5",
        e: "Elige dos frases correctas en presente. (Escolha duas)",
        o: ["Vivimos en Bogotá.", "Vivemos en Bogotá.", "Aprendemos español.", "Aprendimos español ahora."],
        c: [0, 2],
        x: "Vivimos en Bogotá e Aprendemos español são presente regular com nosotros: vivir faz -imos e aprender faz -emos. A frase com 'Vivemos' mistura a terminação portuguesa com o verbo espanhol, o que não existe em espanhol. A frase com 'Aprendimos' está em pretérito, que é outro tempo e não combina com a ideia de presente da instrução, mesmo com 'ahora'."
      },
      {
        id: "e5q5", s: 2, t: "e5",
        e: "¿Cuál es la frase negativa correcta? (Qual é a frase negativa correta?)",
        o: ["Hablo no inglés en la reunión.", "No hablo inglés en la reunión.", "No yo hablo inglés en la reunión.", "Hablo inglés no en la reunión."],
        c: [1],
        x: "A negação em espanhol é simples: 'no' vem logo antes do verbo conjugado: No hablo inglés en la reunión. As outras versões colocam o 'no' depois do verbo, antes do pronome ou no meio da frase, e nenhuma delas é uma ordem natural do espanhol. Não há verbo auxiliar de negação como o 'don't' do inglês."
      },
      {
        id: "e5q6", s: 2, t: "e5",
        e: "Elige dos frases naturales sobre el trabajo. (Escolha duas)",
        o: ["Trabajo con datos.", "Yo trabajo con datos, pero ella trabaja con ventas.", "Trabajar yo con datos.", "Yo yo trabajo con datos."],
        c: [0, 1],
        x: "Trabajo con datos é a forma natural, sem o pronome. Yo trabajo con datos, pero ella trabaja con ventas também é natural, porque o pronome aparece para contrastar duas pessoas. 'Trabajar yo con datos' deixa o verbo no infinitivo e não forma uma frase afirmativa, e 'Yo yo trabajo' repete o pronome sem razão alguma."
      },
      {
        id: "e5q7", s: 2, t: "e5",
        e: "¿Cuál es la forma de 'nosotros' del verbo vivir? (Qual é a forma de 'nosotros' do verbo vivir?)",
        o: ["vivemos", "vivimos", "viven", "vivamos"],
        c: [1],
        x: "Em -ir, a terminação de 'nosotros' é -imos: vivimos. A forma 'vivemos' é a portuguesa; em espanhol -emos pertence aos verbos em -er (comemos, aprendemos). 'Viven' é a forma de ellos ou ustedes, e 'vivamos' pertence a outro modo verbal que ainda não faz parte desta aula."
      },
      {
        id: "e5q8", s: 2, t: "e5",
        e: "Ustedes ___ los datos de clientes. (analizar) (Complete a frase.)",
        o: ["analizam", "analizan", "analizamos", "analiza"],
        c: [1],
        x: "Ustedes usa a forma de ellos, que em -ar termina em -an: analizan. A forma terminada em -am é portuguesa (eles analisam) e não existe em espanhol. A forma terminada em -amos é a de nosotros e a terminada em -a é a de uma só pessoa. Em espanhol, quando o plural é de terceira pessoa, o último som escrito é sempre -n."
      },
      {
        id: "e5q9", s: 2, t: "e5",
        e: "Pablo, ¿tú ___ documentación en inglés? (leer) (Complete a frase.)",
        o: ["lees", "lee", "leo", "leen"],
        c: [0],
        x: "Com 'tú', o verbo leer faz -es: lees. A forma 'lee' é a de él, ella ou usted, 'leo' é a de yo e 'leen' é a de ellos ou ustedes. Como a pergunta é dirigida a Pablo com 'tú', só a forma terminada em -s combina; usar 'lee' é o erro comum de falantes de português, que associam 'você lê' a ele."
      },
      {
        id: "e5q10", s: 2, t: "e5",
        e: "¿Cómo se dice 'Eu não escrevo relatórios'? (Como se diz isso em espanhol?)",
        o: ["No escribo informes.", "No escrevo informes.", "Escribo no informes.", "No escribo relatórios."],
        c: [0],
        x: "A frase certa tem 'no' antes do verbo, a forma escribo (escribir é -ir) e a palavra espanhola 'informes'. A versão com 'escrevo' mantém o verbo português, a versão com 'relatórios' mantém a palavra portuguesa e a versão com 'no' depois do verbo coloca a negação em lugar errado. Portuñol é justamente misturar essas peças."
      },
      {
        id: "e5q11", s: 2, t: "e5",
        e: "Usted ___ el correo cada mañana. (enviar) (Complete a frase.)",
        o: ["envía", "envia", "envío", "envían"],
        c: [0],
        x: "Usted usa a forma de él, que em enviar é 'envía', com acento na í (regra geral, sem citação nesta aula). A forma 'envia' sem acento não segue a escrita padrão desse verbo. 'Envío' é a forma de yo e 'envían' é a de ellos ou ustedes, então nenhuma das duas combina com o singular formal 'usted'."
      },
      {
        id: "e5q12", s: 2, t: "e5",
        e: "Elige dos verbos terminados en -er. (Escolha duas)",
        o: ["aprender", "analizar", "leer", "usar"],
        c: [0, 2],
        x: "Aprender e leer terminam em -er e seguem o modelo de comer: aprendo, aprendes; leo, lees. Analizar e usar terminam em -ar e seguem o modelo de trabajar: analizo, uso. Identificar o grupo pelo final do infinitivo é o primeiro passo para escolher a terminação certa."
      },
      {
        id: "e5q13", s: 2, t: "e5",
        e: "¿Qué frase está escrita correctamente? (Qual frase está escrita corretamente?)",
        o: ["Tu trabajas en Lima.", "Tú trabajas en Lima.", "Tú trabaja en Lima.", "Tu trabaja en Lima."],
        c: [1],
        x: "O pronome 'tú' leva acento e pede o verbo com -s: Tú trabajas. A forma 'tu' sem acento é o possessivo (tu casa), não o sujeito. Quando o verbo aparece como 'trabaja', ele está na forma de él, ella ou usted, e não combina com 'tú'. Acento e terminação têm de acertar juntos."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: apresentação com verbos no presente",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Ouvir a própria voz mostra se o -n final, o -s do tú e o -imos de vivimos saem de forma automática ou se o português escapa.",
      antes: "Ter lido a aula e as frases da lista de verbos. Escolher um lugar silencioso e ter o gravador de voz do celular pronto. Este roteiro não foi executado por quem escreveu a aula: ajuste tempos e frases ao seu jeito de falar.",
      passos: [
        { t: "Preparar cinco verbos", p: "Escolha cinco verbos da lista da aula e anote só o infinitivo e um objeto (por exemplo: usar, Python; escribir, consultas). Não escreva a frase inteira." },
        { t: "Ouvir e repetir (3 min)", p: "Leia em voz alta as 12 frases da lista de verbos, uma vez devagar, uma vez no ritmo normal. Preste atenção em -o, -s e -n no fim das palavras." },
        { t: "Gravar a primeira versão (2 min)", p: "Grave uma apresentação de 6 frases, sem pronome sujeito em quase todas: onde vive, onde trabalha, o que usa, o que escreve, o que lê e uma negação com 'no'." },
        { t: "Ouvir e comparar", p: "Escute a gravação e marque no papel: quantos finais -n você disse bem, se usou 'tú' com -s e se escreveria 'vivimos' sem hesitar." },
        { t: "Regravar corrigindo (2 min)", p: "Grave de novo, corrigindo as marcas. Depois pergunte a si mesma três coisas em voz alta ('¿Dónde trabajas?', '¿Qué lees?', '¿Qué usas?') e responda." }
      ],
      verificar: "Na segunda gravação: pelo menos 5 verbos diferentes no presente; nenhuma terminação -m na terceira pessoa do plural; pelo menos 1 negação com 'no' antes do verbo; e pronome sujeito usado só em frases de contraste.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão, se quiser, para comparar na próxima aula.",
        "Anote em uma linha qual terminação mais escapou."
      ],
      erros: [
        { s: "Falo as terminações em português sem perceber", c: "O ouvido ainda não distingue -n de -m ou -imos de -emos.", r: "Repita só a lista de terminações em voz alta (-o, -as, -a, -amos, -an) e regrave apenas as frases com erro." },
        { s: "Esqueço o 'no' ou o coloco depois do verbo", c: "Falar rápido demais.", r: "Fale a frase negativa devagar, marcando 'no' + verbo como uma só palavra: 'no-hablo'." },
        { s: "Uso 'yo' em todas as frases", c: "Hábito do português do Brasil.", r: "Escreva as palavras-chave sem o pronome e leia só elas; use 'yo' em apenas uma frase de contraste." },
        { s: "Não sei se a pronúncia está certa", c: "Sem referência de um falante nativo.", r: "Compare com um áudio de um falante nativo de sua preferência (por exemplo, em um vídeo curto) e repita; não precisa ser perfeito, só inteligível." }
      ]
    }
  };

  /* ===================== AULA 6 ===================== */
  C.dias[6] = {
    aula: {
      titulo: "Verbos irregulares mais frequentes: tener, ir, hacer, poder, querer, saber, conocer, decir, venir, poner",
      resumo: "Os verbos que quebram o molde regular e aparecem o tempo todo: tener, ir, hacer, poder, querer, saber x conocer, decir, venir, poner. Inclui a ditongação (e→ie, o→ue), as construções 'tener que / hay que / ir a + infinitivo' e como pedir e oferecer com 'Quiero…' e '¿Puedo…?'.",
      simples: {
        analogia: "Imagine que os verbos regulares são ruas retas da cidade e os irregulares são as poucas ruas com curvas. Você aprende o mapa uma vez e depois circula sem pensar. Os irregulares mais comuns têm dois tipos de curva. A primeira é a 'bota': em poder, querer, preferir e empezar, a vogal do tronco vira ditongo (puedo, quiero, prefiero, empiezo) em todas as pessoas, menos em 'nosotros'; se você desenhar essas formas numa tabela, as que mudam formam o contorno de uma bota. A segunda é a 'curva do yo': tengo, hago, pongo, vengo, digo, voy têm uma forma própria para 'yo'; em hacer e poner as outras pessoas seguem a rota normal, enquanto tener, venir e decir também mudam o tronco em tú, él e ellos, e ir é um caso à parte. O resto, como saber, tem só um desvio pequeno (sé). Decorar essas poucas curvas dá acesso ao espanhol de todo dia.",
        pontos: [
          "Em tener, hacer, poner, venir e decir, a forma de 'yo' é especial (tengo, hago, pongo, vengo, digo).",
          "Em poder, querer, preferir e empezar a vogal do tronco ditonga: puedo, quiero, prefiero, empiezo.",
          "'Nosotros' costuma manter o tronco: podemos, queremos, preferimos, empezamos.",
          "Saber é para informação e habilidade; conocer é para pessoas, lugares e coisas que você já conhece.",
          "Tener que e hay que + infinitivo expressam obrigação; ir a + infinitivo expressa plano."
        ],
        paraQueServe: "Falar de planos, pedidos, obrigações e capacidades no trabalho (Voy a enviar, Tengo que revisar, ¿Puedo preguntar?) sem tropeçar nos verbos mais comuns."
      },
      glossario: [
        { t: "Verbo irregular", d: "Verbo que não segue o modelo regular de seu grupo em todas as formas (tener, ir, hacer, poder…)." },
        { t: "Ditongação", d: "Mudança de vogal do tronco para um ditongo quando a sílaba é tônica: e→ie (quiero) ou o→ue (puedo)." },
        { t: "Forma irregular de 'yo'", d: "Verbos com uma forma própria na primeira pessoa do singular (tengo, hago, pongo, vengo, digo, conozco). Em hacer, poner e conocer as demais pessoas seguem o regular; em tener, venir e decir o tronco também muda em tú, él e ellos." },
        { t: "saber", d: "Saber informação ou saber fazer algo: Sé SQL; ¿Sabes cómo funciona?" },
        { t: "conocer", d: "Conhecer pessoas, lugares e coisas, ter familiaridade: Conozco a Ana; Conozco esta herramienta." },
        { t: "tener que + infinitivo", d: "Obrigação pessoal: Tengo que enviar el informe hoy." },
        { t: "hay que + infinitivo", d: "Necessidade impessoal, para todos: Hay que revisar los datos." },
        { t: "ir a + infinitivo", d: "Futuro próximo ou plano: Voy a analizar los resultados. Atenção à preposição a." }
      ],
      blocos: [
        {
          t: "Onde esta aula entra no A1-A2",
          facil: "Traduzindo: os irregulares frequentes fazem parte do mesmo volume A1-A2 do Plan curricular, mas a lista de formas desta aula é regra geral, sem citação.",
          p: [
            "Segundo a página do Instituto Cervantes, o Plan curricular reúne os níveis de referência do espanhol em três volumes e o primeiro cobre A1-A2, a etapa básica ou de iniciação, com inventários que descrevem o conteúdo de cada nível. Como as páginas dos inventários não abriram nesta redação, não afirmamos aqui qual verbo exato cai em A1 ou A2.",
            "As conjugações abaixo são regra geral de gramática, sem citação. Elas servem para você falar, não como lista oficial de nível; se uma forma parecer estranha, confirme num dicionário ou conjugador de sua confiança."
          ],
          dica: "Aprenda primeiro as formas de 'yo' e de 'tú': são as que você mais fala.",
          fonte: PLAN
        },
        {
          t: "Os dez verbos e suas formas",
          facil: "Traduzindo: tabela com os verbos mais úteis; as formas em destaque quebram o molde regular.",
          p: [
            "Regra geral, sem citação. Leia a tabela em voz alta, linha por linha, e foque nas formas de yo, tú e ellos, que são as mais usadas. Para 'usted' use a forma de él; para 'ustedes', a de ellos.",
            "Ir é o mais diferente: voy, vas, va, vamos, van. Ele não segue nenhum molde, então vale decorar à parte."
          ],
          tabela: {
            cab: ["Infinitivo", "yo", "tú", "él / usted", "nosotros", "ellos / ustedes"],
            linhas: [
              ["tener", "tengo", "tienes", "tiene", "tenemos", "tienen"],
              ["ir", "voy", "vas", "va", "vamos", "van"],
              ["hacer", "hago", "haces", "hace", "hacemos", "hacen"],
              ["poder", "puedo", "puedes", "puede", "podemos", "pueden"],
              ["querer", "quiero", "quieres", "quiere", "queremos", "quieren"],
              ["saber", "sé", "sabes", "sabe", "sabemos", "saben"],
              ["conocer", "conozco", "conoces", "conoce", "conocemos", "conocen"],
              ["decir", "digo", "dices", "dice", "decimos", "dicen"],
              ["venir", "vengo", "vienes", "viene", "venimos", "vienen"],
              ["poner", "pongo", "pones", "pone", "ponemos", "ponen"]
            ]
          },
          dica: "Em tener, venir e decir também muda o tronco em tú, él e ellos (tienes, vienes, dices); em nosotros ele volta ao normal (tenemos, venimos, decimos).",
        },
        {
          t: "Ditongação: e→ie e o→ue (a 'bota')",
          facil: "Traduzindo: em poder, querer, preferir e empezar a vogal vira ditongo, exceto em 'nosotros'.",
          p: [
            "Regra geral, sem citação. Em verbos como querer, preferir e empezar, o e do tronco vira ie quando a sílaba é tônica: quiero, quieres, quiere, quieren. Em poder, o o do tronco vira ue: puedo, puedes, puede, pueden.",
            "A forma de 'nosotros' costuma manter a vogal original (queremos, preferimos, empezamos, podemos). Por isso o desenho dessa mudança lembra uma bota: muda em quatro casas e fica de fora em uma.",
            "Para o português, a armadilha é dizer 'quero' ou 'posso'. As formas espanholas têm o ditongo: quiero e puedo."
          ],
          lista: [
            "poder: ¿Puedes revisar el código? Sí, puedo hacerlo hoy.",
            "querer: Quiero aprender español. Queremos hablar con el equipo.",
            "preferir: Prefiero escribir por correo. Preferimos reunirnos por la mañana.",
            "empezar: Empiezo a las nueve. Empezamos la reunión ahora."
          ],
          dica: "Se a sílaba tônica é a do tronco, ela ditonga; se a tônica é a da terminação (queremos), não ditonga.",
        },
        {
          t: "Saber x conocer: duas formas de 'conhecer'",
          facil: "Traduzindo: saber é informação ou habilidade; conocer é familiaridade com pessoas, lugares e coisas.",
          p: [
            "Regra geral, sem citação. Em português 'saber' e 'conhecer' já são dois verbos, e em espanhol a divisão é parecida: saber para informação e habilidade, conocer para ter contato ou familiaridade. Atenção: com pessoas determinadas, conocer pede 'a' (conozco a Ana).",
            "Com saber: Sé SQL (tenho essa habilidade); No sé la respuesta (não tenho essa informação); ¿Sabes cómo funciona? (pergunta sobre informação). Com saber + infinitivo: Sé analizar datos.",
            "Com conocer: Conozco a Ana (pessoa, com 'a'); Conozco Lima (lugar); Conozco esta herramienta (coisa, familiaridade).",
            "Cuidado com o acento escrito: 'sé' (verbo) leva acento; 'se' sem acento é o pronome."
          ],
          lista: [
            "Sé programar en Python.",
            "No sé dónde está el archivo.",
            "Conozco a mi nueva jefa.",
            "¿Conoces esta herramienta de datos?"
          ],
          dica: "Pergunte: é um fato ou uma habilidade? saber. É uma pessoa, lugar ou coisa que você já viu? conocer.",
        },
        {
          t: "Tener que, hay que e ir a + infinitivo",
          facil: "Traduzindo: tener que = eu preciso; hay que = é preciso (em geral); ir a = vou fazer.",
          p: [
            "Regra geral, sem citação. Tener que + infinitivo expressa obrigação de uma pessoa: Tengo que terminar el informe. Hay que + infinitivo é impessoal, vale para qualquer pessoa: Hay que revisar los datos antes de enviarlos. Em hay, a forma não muda: hay un error, hay tres errores.",
            "Ir a + infinitivo expressa planos e futuro próximo: Voy a enviar el correo, ¿Vas a venir a la reunión? Diferente do português ('vou enviar'), em espanhol é obrigatório colocar a preposição a depois de ir: voy a enviar, nunca 'voy enviar'.",
            "Esses três moldes servem para quase toda conversa de planejamento de trabalho: tarefas, regras de equipe e agenda."
          ],
          lista: [
            "Tengo que revisar la consulta antes de las tres.",
            "Hay que actualizar la documentación.",
            "Vamos a empezar la reunión.",
            "¿Vas a enviar el informe hoy?"
          ],
          dica: "Em 'ir a', o 'a' nunca some: voy a, vas a, va a, vamos a, van a.",
        },
        {
          t: "Pedir e oferecer: 'Quiero…', '¿Puedo…?', '¿Quieres…?'",
          facil: "Traduzindo: 'Quiero' é direto; '¿Puedo…?' pede licença; '¿Quieres/Quiere…?' oferece.",
          p: [
            "Regra geral, sem citação. Para pedir algo, 'Quiero + substantivo' (Quiero un café) é correto, mas pode soar direto; em ambiente de trabalho é comum suavizar com 'por favor' ou perguntar com '¿Puedo…?' ou '¿Me puede…?'.",
            "Para pedir permissão: ¿Puedo preguntar algo? ¿Puedo compartir mi pantalla? Para pedir um favor: ¿Puedes enviarme el archivo? (com tú) ou ¿Puede enviarme el archivo? (com usted).",
            "Para oferecer: ¿Quieres un café? (tú), ¿Quiere un café? (usted), ¿Quieren agua? (ustedes). Para oferecer ajuda: ¿Te puedo ayudar? ou ¿Puedo ayudarte?",
            "Em todas essas frases, o segundo verbo fica no infinitivo, sem 'de' ou 'a': puedo preguntar, quiero aprender."
          ],
          lista: [
            "Quiero un informe actualizado, por favor.",
            "¿Puedo hacer una pregunta?",
            "¿Puede repetir, por favor?",
            "¿Quieren empezar ahora?"
          ],
          dica: "Quer soar educada? Troque 'Quiero…' por '¿Puedo…?' ou acrescente 'por favor'.",
        },
        {
          t: "Armadilhas de brasileiro (portuñol)",
          facil: "Traduzindo: são erros comuns de falantes de português; o português 'quero, posso, faço, tenho' quase nunca serve em espanhol.",
          p: [
            "Estes são erros comuns de falantes de português, sem estatística nem citação de página:",
            "'Yo quero' ou 'yo posso': o espanhol ditonga, quiero e puedo. 'Yo faço' ou 'yo hazo': o certo é hago. 'Yo tenho' ou 'yo tenjo': o certo é tengo. 'Yo ponho' e 'yo venho': o certo é pongo e vengo.",
            "'Vou enviar' traduzido como 'voy enviar' (sem a): o certo é voy a enviar. E 'tengo de' no lugar de 'tengo que': em espanhol a forma habitual é tengo que + infinitivo.",
            "Confundir saber e conocer: para dizer que você sabe usar SQL, 'sé SQL' é o mais natural; 'conozco SQL' diz que você já teve contato com a ferramenta, o que é outra ideia. E 'conozco Ana' sem 'a': com pessoas, use 'conozco a Ana'."
          ],
          armadilha: "Antes de falar, pergunte: tenho 'ue/ie' nas formas de yo, tú e ellos? Estou usando 'a' depois de ir?",
        },
        {
          t: "Como saber se você está no nível A1-A2",
          facil: "Traduzindo: o DELE tem níveis A1 e A2; use essa referência como horizonte, não como promessa de nível.",
          p: [
            "A página dos exames do Instituto Cervantes mostra que o DELE oferece provas para os níveis A1 e A2, entre outros, com calendário de inscrição. Esta trilha não promete nível nem prazo; use a referência apenas como horizonte.",
            "Um bom autoteste desta aula: diga em voz alta três planos (Voy a…), duas obrigações (Tengo que…) e dois pedidos (¿Puedo…?) sem olhar o texto, e ouça se disse quero ou posso por engano."
          ],
          dica: "Se disser 'quero' ou 'posso', pare e repita a frase com o ditongo, devagar.",
          fonte: DELE
        }
      ],
      exemplo: {
        t: "Planejamento de tarefas numa reunião curta",
        texto: "Numa reunião com colegas de Bogotá, a equipe divide as tarefas. Ana diz: 'Hoy voy a revisar la consulta y tengo que enviar el informe antes de las cinco. ¿Puedes preparar los datos, Luis?' Luis responde: 'Sí, puedo hacerlo ahora, pero primero quiero preguntar algo: ¿sabes dónde está el archivo?' Ana: 'No sé, pero conozco a la persona que lo tiene. Voy a escribirle.' Luis acrescenta: 'Hay que actualizar la documentación también. Prefiero empezar mañana.' Ana: 'Perfecto. Entonces vengo a la oficina el jueves y pongo todo en la carpeta compartida.' Repare em cada molde: voy a + infinitivo para o plano, tengo que para a obrigação, hay que para a regra geral, puedo e quiero com ditongo, sé x conozco para fato e pessoa, e as formas de yo vengo e pongo."
      },
      prova: [
        "Reunião: dizer o que você vai fazer e o que precisa entregar com voy a e tengo que.",
        "Pedido: pedir uma ajuda ou um arquivo com ¿Puedes…? ou ¿Puede…? sem soar seca.",
        "Conversa: dizer se você conhece uma ferramenta ou sabe usá-la, escolhendo conocer ou saber.",
        "Agenda: combinar um horário com Prefiero…, Puedo… e ¿Vienes a la reunión?"
      ],
      explique: "Explique com as próprias palavras o que é ditongação em querer e poder, quando usar saber e quando usar conocer, e como se diferenciam tener que, hay que e ir a + infinitivo.",
      checagem: [
        "Quais formas de yo quebram o molde regular (tengo, hago, pongo, vengo, digo) e qual é o ditongo de querer e poder?",
        "Como decidir entre saber e conocer numa frase sobre uma ferramenta, uma pessoa e uma resposta?",
        "Por que 'voy enviar' está errado e como se diz 'vou enviar' em espanhol?"
      ]
    },
    fontes: [PLAN, DELE, PRENSA],
    cartoes: [
      { id: "e6c1", f: "Diga: 'Eu tenho que enviar o relatório hoje.'", v: "Tengo que enviar el informe hoy. Tener que + infinitivo = obrigação; yo tengo.", t: "e6" },
      { id: "e6c2", f: "Diga: 'Eu vou analisar os dados.'", v: "Voy a analizar los datos. Ir a + infinitivo: a preposição é obrigatória.", t: "e6" },
      { id: "e6c3", f: "Diga: 'Eu quero aprender espanhol.'", v: "Quiero aprender español. Querer ditonga: quiero, quieres, quiere, quieren.", t: "e6" },
      { id: "e6c4", f: "Diga: 'Posso fazer uma pergunta?'", v: "¿Puedo hacer una pregunta? Poder ditonga: puedo; hacer fica no infinitivo.", t: "e6" },
      { id: "e6c5", f: "Diga: 'Eu sei SQL.'", v: "Sé SQL. Saber = habilidade ou informação; yo sé leva acento.", t: "e6" },
      { id: "e6c6", f: "Diga: 'Eu conheço a Ana.'", v: "Conozco a Ana. Conocer pessoa leva 'a'; yo conozco.", t: "e6" },
      { id: "e6c7", f: "Diga: 'Eu faço o relatório toda semana.'", v: "Hago el informe cada semana. Hacer: yo hago (não 'hazo' nem 'faço').", t: "e6" },
      { id: "e6c8", f: "Diga: 'Eu digo a verdade; você diz o quê?'", v: "Digo la verdad; ¿tú qué dices? Decir: yo digo, tú dices (e→i).", t: "e6" },
      { id: "e6c9", f: "Diga: 'Eu venho à reunião amanhã.'", v: "Vengo a la reunión mañana. Venir: yo vengo, tú vienes.", t: "e6" },
      { id: "e6c10", f: "Diga: 'Eu ponho os arquivos na pasta.'", v: "Pongo los archivos en la carpeta. Poner: yo pongo.", t: "e6" },
      { id: "e6c11", f: "Diga: 'É preciso revisar os dados.' (impessoal)", v: "Hay que revisar los datos. Hay que + infinitivo é impessoal.", t: "e6" },
      { id: "e6c12", f: "Diga: 'Você (formal) quer um café?'", v: "¿Quiere un café? Para oferecer: querer + objeto; usted usa a forma de él.", t: "e6" },
      { id: "e6c13", f: "Diga: 'Eu prefiro escrever por e-mail.'", v: "Prefiero escribir por correo. Preferir ditonga: prefiero; escribir fica no infinitivo.", t: "e6" }
    ],
    questoes: [
      {
        id: "e6q1", s: 2, t: "e6",
        e: "Completa: Yo ___ que enviar el informe hoy. (tener) (Complete a frase.)",
        o: ["tenho", "tengo", "tiengo", "tiene"],
        c: [1],
        x: "A forma de yo do verbo tener é tengo, e ela é a que combina com 'que enviar' na estrutura de obrigação (tengo que + infinitivo). A forma 'tenho' é a portuguesa, 'tiengo' mistura o ditongo de tienes com a terminação de yo e não existe, e 'tiene' é a forma de él, ella ou usted, não de yo."
      },
      {
        id: "e6q2", s: 2, t: "e6",
        e: "Elige la forma correcta: Yo ___ aprender español. (querer) (Escolha a forma correta.)",
        o: ["quero", "quiero", "quiro", "quieren"],
        c: [1],
        x: "Querer ditonga na primeira pessoa do singular: quiero. A forma 'quero' é a portuguesa, 'quiro' não existe em espanhol e 'quieren' é a forma de ellos ou ustedes. Lembre da bota: o e do tronco vira ie em yo, tú, él e ellos, e fica igual só em nosotros (queremos)."
      },
      {
        id: "e6q3", s: 2, t: "e6",
        e: "Elige dos frases correctas. (Escolha duas)",
        o: ["Voy a enviar el correo.", "Voy enviar el correo.", "Puedo preguntar algo.", "Puedo a preguntar algo."],
        c: [0, 2],
        x: "Voy a enviar el correo usa a preposição a obrigatória em ir a + infinitivo, e Puedo preguntar algo une poder diretamente ao infinitivo, sem preposição. 'Voy enviar' omite o a, como no português, e isso é o erro típico. 'Puedo a preguntar' inventa uma preposição que poder não pede."
      },
      {
        id: "e6q4", s: 2, t: "e6",
        e: "Completa: ___ programar en Python. (Eu sei programar em Python.) (Complete a frase.)",
        o: ["Conozco", "Sé", "Sabo", "Conozo"],
        c: [1],
        x: "Para dizer que você sabe fazer algo (saber + infinitivo), o espanhol usa saber, e a forma de yo é sé, com acento. 'Conozco' é o verbo para ter contato com uma pessoa, lugar ou coisa e não se combina com um infinitivo desse jeito. 'Sabo' e 'Conozo' são formas inexistentes: o certo é sé e conozco."
      },
      {
        id: "e6q5", s: 2, t: "e6",
        e: "Completa: ___ a mi jefa desde 2020. (conocer, yo) (Complete a frase.)",
        o: ["Conozco", "Sé", "Conozo", "Conoce"],
        c: [0],
        x: "Com uma pessoa (a minha chefe), usa-se conocer, e a forma de yo é conozco, com -zc-. A forma 'Sé' é do verbo saber, usado para informação e habilidade, não para pessoas. 'Conozo' tem a ortografia errada e 'Conoce' é a forma de él, ella ou usted. Não esqueça também do 'a' antes de pessoa determinada."
      },
      {
        id: "e6q6", s: 2, t: "e6",
        e: "¿Cuál es la forma de 'nosotros' del verbo poder? (Qual é a forma de 'nosotros'?)",
        o: ["puedemos", "podemos", "pueden", "puedamos"],
        c: [1],
        x: "Em 'nosotros', poder mantém a vogal original porque a sílaba tônica está na terminação: podemos. As formas 'puedemos' e 'puedamos' aplicariam o ditongo onde ele não ocorre, e 'pueden' é a forma de ellos ou ustedes. A regra geral da bota é: o ditongo aparece onde a tônica cai no tronco, não em nosotros."
      },
      {
        id: "e6q7", s: 2, t: "e6",
        e: "Elige dos frases con 'hay que' o 'tener que' correctas. (Escolha duas)",
        o: ["Hay que revisar los datos.", "Tengo que revisar los datos.", "Hay que a revisar los datos.", "Tengo de a revisar los datos."],
        c: [0, 1],
        x: "Hay que revisar los datos é impessoal e serve para qualquer pessoa, e Tengo que revisar los datos é a obrigação pessoal; os dois ligam diretamente ao infinitivo. As outras duas inserem a preposição a depois de que, o que não existe nessas estruturas, e uma delas usa 'tengo de', construção que não é a habitual aqui."
      },
      {
        id: "e6q8", s: 2, t: "e6",
        e: "¿Cuál es la pregunta educada para pedir permiso? (Qual é a pergunta educada para pedir licença?)",
        o: ["¿Puedo hacer una pregunta?", "Quiero hacer una pregunta ahora.", "¿Quiere una pregunta?", "Hago una pregunta."],
        c: [0],
        x: "Para pedir licença, a pergunta com poder é a forma mais comum e educada: ¿Puedo hacer una pregunta? 'Quiero hacer una pregunta ahora' é direto e funciona como afirmação, não como pedido. '¿Quiere una pregunta?' mudaria o sentido para uma oferta, e 'Hago una pregunta' apenas afirma que você a faz."
      },
      {
        id: "e6q9", s: 2, t: "e6",
        e: "Completa: Yo ___ el informe cada semana. (hacer) (Complete a frase.)",
        o: ["hago", "hazo", "faço", "hace"],
        c: [0],
        x: "A forma de yo de hacer é hago, com g. 'Hazo' tenta aplicar o molde regular, mas hacer é irregular em yo; 'faço' é a forma portuguesa, e 'hace' é a forma de él, ella ou usted. Como em tengo, pongo, vengo e digo, a primeira pessoa tem uma forma própria e as demais seguem o padrão normal."
      },
      {
        id: "e6q10", s: 2, t: "e6",
        e: "Completa con la forma correcta: Tú ___ a la reunión mañana. (venir) (Complete a frase.)",
        o: ["vengo", "vienes", "venes", "viene"],
        c: [1],
        x: "Com tú, venir muda o tronco e termina em -es: vienes. 'Vengo' é a forma de yo, 'venes' não existe porque o e do tronco ditonga em tú, e 'viene' é a forma de él, ella ou usted. Só em nosotros o verbo volta ao tronco normal (venimos)."
      },
      {
        id: "e6q11", s: 2, t: "e6",
        e: "Elige la frase correcta para 'Eu ponho os arquivos na pasta': (Escolha a frase correta.)",
        o: ["Yo ponho los archivos en la carpeta.", "Pongo los archivos en la carpeta.", "Pono los archivos en la carpeta.", "Pone los archivos en la carpeta."],
        c: [1],
        x: "A forma de yo de poner é pongo, com -ng-, e o pronome pode ser omitido. 'Ponho' é a forma portuguesa, 'pono' tenta aplicar o molde regular de poner, o que não vale porque o verbo é irregular em yo, e 'pone' é a forma de él, ella ou usted, não a de yo."
      },
      {
        id: "e6q12", s: 2, t: "e6",
        e: "Elige dos verbos que ditongan. (Escolha duas)",
        o: ["querer", "poder", "trabajar", "vivir"],
        c: [0, 1],
        x: "Querer (quiero) e poder (puedo) são os que ditongam na lista, e a forma de nosotros fica sem ditongo (queremos, podemos). Trabajar e vivir são verbos regulares e mantêm o tronco em todas as pessoas (trabajo, vivo). Reconhecer verbos de ditongação ajuda a não errar a forma de yo, tú e ellos."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: planos, obrigações e pedidos",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Os irregulares só ficam automáticos quando você os diz muitas vezes; ouvir a gravação mostra se 'quero' e 'posso' ainda aparecem no lugar de 'quiero' e 'puedo'.",
      antes: "Ter lido a aula e a tabela dos dez verbos. Escolher um lugar silencioso e deixar o gravador do celular pronto. Este roteiro não foi executado por quem escreveu a aula: ajuste frases ao seu dia a dia.",
      passos: [
        { t: "Preparar a tabela de apoio", p: "Anote em papel os verbos tener, ir, hacer, poder e querer só na forma de yo. Deixe o papel à vista, sem as frases completas." },
        { t: "Ouvir e repetir (3 min)", p: "Leia em voz alta os exemplos dos blocos 'Tener que, hay que e ir a' e 'Pedir e oferecer', duas vezes cada. Marque o ditongo: puEdo, quIEro." },
        { t: "Gravar a primeira versão (2 min)", p: "Grave oito frases: duas com voy a, duas com tengo que, duas com ¿Puedo…? e duas com Quiero/Prefiero. Use verbos do seu trabalho." },
        { t: "Ouvir e comparar", p: "Escute e marque quantas vezes disse 'quero', 'posso' ou 'voy enviar' (sem a). Anote também se você usou sé ou conozco no lugar certo." },
        { t: "Regravar corrigindo (2 min)", p: "Grave de novo corrigindo apenas as frases marcadas. Termine respondendo em voz alta: '¿Qué vas a hacer hoy?', '¿Qué tienes que entregar?' e '¿Sabes o conoces esta herramienta?'." }
      ],
      verificar: "Na segunda gravação: nenhuma ocorrência de 'quero' ou 'posso'; todas as frases com ir têm 'a' (voy a, vas a); pelo menos uma frase com sé e uma com conozco; e pelo menos dois pedidos com ¿Puedo…? ou ¿Puede…?",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na próxima aula, se quiser.",
        "Anote uma forma irregular que ainda escapa para revisar amanhã."
      ],
      erros: [
        { s: "Digo 'quero' e 'posso' sem notar", c: "O português domina o ouvido.", r: "Repita só os verbos em voz alta (quiero, puedo, quieres, puedes) cinco vezes, depois regrave as frases." },
        { s: "Esqueço o 'a' em voy a", c: "Em português não existe a preposição.", r: "Fale 'voy-a' como uma unidade (voy-a, vas-a, va-a, vamos-a) antes de dizer o verbo." },
        { s: "Confundo saber e conocer", c: "Em português o par existe, mas o uso com objetos não é igual.", r: "Faça duas listas curtas no papel: o que você SABE (informação) e quem/que você CONOCE (pessoa, lugar, coisa)." },
        { s: "Travo ao pedir algo", c: "Medo de soar rude.", r: "Use sempre o molde ¿Puedo + infinitivo + por favor? e troque só o infinitivo." }
      ]
    }
  };

  /* ===================== AULA 7 ===================== */
  C.dias[7] = {
    aula: {
      titulo: "Números, hora, datas e dinheiro",
      resumo: "Contar de 0 a 1000, dizer e perguntar a hora (¿Qué hora es? / ¿A qué hora…?), usar dias e meses em minúsculas, dizer datas (el primero de mayo), falar preços, idade e telefone, e perceber onde o português ajuda e onde atrapalha.",
      simples: {
        analogia: "Pense nos números em espanhol como um jogo de montar com três tipos de peça. As peças de 0 a 15 são únicas e você decora uma por uma (cero, uno, dos… quince). As de 16 a 29 já vêm coladas (dieciséis, veintidós), e as dezenas redondas (treinta, cuarenta, noventa) se somam com 'y' (treinta y uno). Depois entram as centenas, que mudam de forma (doscientos, quinientos) e o mil, que nunca varia. A hora segue a mesma lógica de encaixe: uma frase fixa ('Son las…') e minutos que se somam com 'y' ou se tiram com 'menos'. Com datas e preços é só encaixar essas peças em moldes prontos: 'el tres de marzo', 'cuesta diez euros'. Se você sabe montar, nunca precisa decorar tudo.",
        pontos: [
          "0 a 15 são formas únicas; 16 a 29 se escrevem numa palavra (dieciséis, veintidós); depois, treinta y uno.",
          "100 é 'cien'; 101 é 'ciento uno'; as centenas mudam (quinientos, setecientos); 1000 é 'mil'.",
          "Hora: Es la una; Son las dos…; minutos com 'y' ou 'menos'; y cuarto, y media, menos cuarto.",
          "Pergunte a hora com ¿Qué hora es? e o horário de um evento com ¿A qué hora es…?",
          "Dias e meses se escrevem em minúsculas: lunes, martes, enero, marzo."
        ],
        paraQueServe: "Combinar horários de reunião, dizer datas de entrega, perguntar preços e passar telefone ou idade sem recorrer ao inglês ou ao celular."
      },
      glossario: [
        { t: "cardinal", d: "Número usado para contar: uno, dos, tres… cien, mil." },
        { t: "y cuarto / y media / menos cuarto", d: "Quinze minutos depois, trinta minutos depois e quinze minutos antes da hora cheia." },
        { t: "¿Qué hora es?", d: "Pergunta pela hora agora; resposta: Es la una / Son las dos…" },
        { t: "¿A qué hora…?", d: "Pergunta pelo horário de um evento: ¿A qué hora es la reunión? Resposta: A las tres." },
        { t: "el primero de…", d: "Forma comum de dizer o dia 1 de um mês (el uno de mayo também se ouve em algumas regiões); os demais dias usam cardinais: el dos de mayo." },
        { t: "¿Cuánto cuesta?", d: "Pergunta pelo preço de algo singular; para plural, ¿Cuánto cuestan?" },
        { t: "minúsculas em dias e meses", d: "Em espanhol, lunes e enero se escrevem com inicial minúscula (diferente do inglês)." }
      ],
      blocos: [
        {
          t: "Onde esta aula entra no A1-A2",
          facil: "Traduzindo: números, hora, datas e preços são conteúdo básico de quem começa; as regras abaixo são regra geral, sem citação de página.",
          p: [
            "Segundo a página do Instituto Cervantes, o Plan curricular reúne os níveis de referência do espanhol em três volumes; o primeiro cobre A1-A2 e traz inventários de conteúdo, incluindo noções (como as de tempo e quantidade). Como as páginas de inventário não abriram nesta redação, não afirmamos aqui quais números ou formas pertencem a A1 ou A2.",
            "Os dados desta aula são regra geral de espanhol, sem citação. Alguns costumes variam por país (por exemplo, o jeito de ler telefone e de escrever separadores de milhar e decimais), e isso é indicado quando for o caso."
          ],
          dica: "Pratique com dados reais seus: seu telefone, sua idade, a data de hoje e o preço do almoço.",
          fonte: PLAN
        },
        {
          t: "Números de 0 a 100",
          facil: "Traduzindo: decore de 0 a 15; depois é só montar; de 31 em diante, dezena + y + unidade.",
          p: [
            "Regra geral, sem citação. De 0 a 15: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince. De 16 a 19: dieciséis, diecisiete, dieciocho, diecinueve. De 20 a 29: veinte, veintiuno, veintidós, veintitrés, veinticuatro, veinticinco, veintiséis, veintisiete, veintiocho, veintinueve.",
            "A partir de 30, a dezena fica separada por 'y': treinta y uno, cuarenta y dos, cincuenta y tres. As dezenas: treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa. E 100 é cien.",
            "Observe os acentos nessas formas (dieciséis, veintidós, veintitrés, veintiséis) e que antes de substantivo masculino 'uno' vira 'un' (veintiún días, un día) e antes de feminino vira 'una' (una hora, veintiuna horas)."
          ],
          tabela: {
            cab: ["Número", "Em espanhol", "Dica"],
            linhas: [
              ["0", "cero", "diferente do português 'zero'"],
              ["7", "siete", "parecido com 'sete'"],
              ["8", "ocho", "'oito' vira ocho"],
              ["9", "nueve", "'nove' vira nueve"],
              ["16", "dieciséis", "uma palavra, com acento"],
              ["21", "veintiuno", "veintiún ante masculino"],
              ["30", "treinta", "depois: treinta y uno"],
              ["100", "cien", "ciento + número: ciento uno"]
            ]
          },
          dica: "Dos 16 aos 29 não há 'y': veintiuno, dieciséis. Dos 31 em diante há: treinta y uno.",
        },
        {
          t: "Centenas e mil: até 1000",
          facil: "Traduzindo: as centenas são palavras próprias; cuidado com quinientos, setecientos e novecientos, que escapam do padrão.",
          p: [
            "Regra geral, sem citação. 100 é cien quando sozinho (cien euros), mas vira ciento antes de outro número (ciento uno, ciento veinte). Depois: doscientos, trescientos, cuatrocientos, quinientos, seiscientos, setecientos, ochocientos, novecientos, mil.",
            "As centenas concordam com o gênero do substantivo: doscientos euros (masculino) mas doscientas páginas (feminino). E 'mil' não vira plural: dos mil, tres mil.",
            "Para ler 215 você diz doscientos quince, sem 'y'. O 'y' só aparece entre dezenas e unidades (treinta y cinco). Assim, 345 é trescientos cuarenta y cinco."
          ],
          lista: [
            "101: ciento uno.",
            "215: doscientos quince.",
            "345: trescientos cuarenta y cinco.",
            "500: quinientos.",
            "999: novecientos noventa y nueve.",
            "1000: mil."
          ],
          dica: "Não diga 'quinhentos' nem 'sietecientos': são quinientos e setecientos.",
        },
        {
          t: "Hora: ¿Qué hora es? e ¿A qué hora…?",
          facil: "Traduzindo: para a hora agora, ¿Qué hora es?; para o horário de um evento, ¿A qué hora…?",
          p: [
            "Regra geral, sem citação. Para a hora cheia: Es la una (singular) e Son las dos, Son las tres… (plural). Para os minutos: Son las tres y diez (3h10), Son las tres y cuarto (3h15), Son las tres y media (3h30), Son las cuatro menos cuarto (3h45), Son las cuatro menos diez (3h50).",
            "Para o horário de um evento use 'a la' ou 'a las': La reunión es a las diez; El almuerzo es a la una.",
            "Para especificar o período do dia: de la mañana, de la tarde, de la noche (las ocho de la mañana). Também existem mediodía e medianoche."
          ],
          tabela: {
            cab: ["Hora", "Hora agora (¿Qué hora es?)", "Horário de evento (¿A qué hora…?)"],
            linhas: [
              ["1:00", "Es la una.", "A la una."],
              ["2:00", "Son las dos.", "A las dos."],
              ["3:15", "Son las tres y cuarto.", "A las tres y cuarto."],
              ["3:30", "Son las tres y media.", "A las tres y media."],
              ["3:45", "Son las cuatro menos cuarto.", "A las cuatro menos cuarto."],
              ["12:00", "Son las doce en punto.", "Al mediodía."]
            ]
          },
          dica: "É 'es la una' (singular) só para uma hora; de duas em diante é 'son las…'.",
        },
        {
          t: "Dias, meses e datas",
          facil: "Traduzindo: dias e meses em minúsculas; datas no molde 'el + número + de + mês'; o dia 1 é 'el primero'.",
          p: [
            "Regra geral, sem citação. Dias: lunes, martes, miércoles, jueves, viernes, sábado, domingo. Meses: enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre. Todos se escrevem com inicial minúscula, ao contrário do inglês (Monday, March).",
            "Data: Hoy es martes, 3 de marzo ou Es el tres de marzo. Para o dia 1, é comum dizer el primero de mayo; para os outros, usam-se cardinais: el dos de mayo, el quince de junio. Em países diferentes, 'el uno de mayo' também aparece; o que importa é que o resto são cardinais, não ordinais.",
            "Para 'na segunda-feira', diga el lunes, sem 'en'. Para 'toda segunda', diga los lunes. Para meses, use 'en': en marzo. Para anos: en dos mil veintiséis."
          ],
          lista: [
            "La reunión es el lunes.",
            "Hacemos retrospectiva los viernes.",
            "La entrega es el 15 de marzo.",
            "Empiezo en enero.",
            "Estamos en dos mil veintiséis."
          ],
          dica: "Diga 'el lunes', nunca 'en el lunes'; diga 'en marzo' para o mês.",
        },
        {
          t: "Dinheiro, idade e telefone",
          facil: "Traduzindo: ¿Cuánto cuesta? pergunta o preço; ¿Cuántos años tienes? pergunta a idade; o telefone se diz em dígitos.",
          p: [
            "Regra geral, sem citação. Preço: ¿Cuánto cuesta? (singular) e ¿Cuánto cuestan? (plural). Resposta: Cuesta diez euros; Cuestan veinte pesos. Para a conta total, ¿Cuánto es? e Son quince dólares. Note o plural dessas moedas: euros, pesos, dólares.",
            "Idade: ¿Cuántos años tienes? e Tengo treinta años (com tener). Diferente do inglês, o espanhol usa tener, igual ao português 'tenho 30 anos'.",
            "Telefone: pergunte ¿Cuál es tu número de teléfono? e responda Mi número es… dizendo dígito por dígito ou em grupos; combine com quem escuta, porque o costume de agrupar varia por país. Os separadores de milhar e decimais também variam por país; confirme antes de ler um preço escrito."
          ],
          lista: [
            "¿Cuánto cuesta este curso? Cuesta cuarenta dólares.",
            "¿Cuánto cuestan los libros? Cuestan ciento cincuenta pesos.",
            "Tengo treinta y dos años.",
            "Mi número es cero, uno, uno, nueve, nueve, ocho… (leia os dígitos)."
          ],
          dica: "Treine o seu telefone e a sua idade em voz alta: são os dois dados que você mais vai dizer.",
        },
        {
          t: "Armadilhas de brasileiro (portuñol)",
          facil: "Traduzindo: o português é parecido, e por isso o brasileiro erra: quinhentos, maiúsculas nos dias e preposição no dia da semana.",
          p: [
            "Estes são erros comuns de falantes de português, sem estatística e sem citação de página. Não afirmamos 'falsos amigos' de número ou hora, porque não confirmamos nenhum nas páginas abertas.",
            "'Quinhentos', 'setecentos' escritos como em português: o certo é quinientos, setecientos. 'Uno cientos' ou 'cem' em vez de cien: 100 é cien e 101 é ciento uno.",
            "'En el lunes' ou 'na segunda' traduzido palavra por palavra: o certo é el lunes. E 'Son la una' ou 'Es las dos': é Es la una e Son las dos.",
            "Escrever Lunes, Marzo com maiúscula por influência do inglês: em espanhol é lunes e marzo."
          ],
          armadilha: "Antes de falar o horário, pergunte: é uma hora (es la una) ou mais (son las…)? Antes de escrever o dia, use minúscula.",
        },
        {
          t: "Como saber se você está no nível A1-A2",
          facil: "Traduzindo: o DELE tem níveis A1 e A2; use como horizonte, não como promessa.",
          p: [
            "A página dos exames do Instituto Cervantes mostra que o DELE oferece provas para os níveis A1 e A2, entre outros. Esta trilha não promete nível nem prazo; a referência serve apenas como horizonte.",
            "Autoteste da aula: diga a hora de agora, o dia de hoje, a data de uma entrega, o preço de um café e o seu telefone, tudo sem olhar o texto. Ouça a gravação procurando 'quinhentos' e 'en el lunes'."
          ],
          dica: "Cinco respostas em 30 segundos é um bom sinal de que o conteúdo está se fixando.",
          fonte: DELE
        }
      ],
      exemplo: {
        t: "Combinar uma reunião e passar o contato",
        texto: "Em uma conversa com um colega do México. Ana: 'Hola, ¿a qué hora es la reunión del equipo?' Luis: 'Es el jueves, a las tres y media de la tarde.' Ana: '¿Es el cuatro de marzo?' Luis: 'No, es el cinco de marzo. Hoy es martes, tres de marzo, y son las diez y cuarto.' Ana: 'Perfecto. ¿Cuánto cuesta el curso de datos que mencionaste?' Luis: 'Cuesta ciento veinte dólares.' Ana: 'Gracias. Mi número es cero, uno, uno, nueve, ocho, siete, seis, cinco, cuatro, tres, dos, uno. Tengo treinta y cuatro años y llevo tres años en esta empresa.' Repare nos moldes: a las tres y media para o horário do evento, el cinco de marzo para a data, ciento veinte para o preço, tengo treinta y cuatro años para a idade e os dígitos para o telefone."
      },
      prova: [
        "Reunião: combinar um horário com ¿A qué hora es? e responder A las tres y media.",
        "Prazo: dizer a data de entrega com el quince de marzo e escrever os meses em minúsculas.",
        "Compra ou orçamento: perguntar ¿Cuánto cuesta? e entender cifras de ciento a mil.",
        "Contato: passar o seu telefone e a sua idade em voz alta sem pedir para mostrar na tela."
      ],
      explique: "Explique com as próprias palavras como se diz a hora (es la una x son las dos), como se monta um número como 345 e como se diz uma data com el primero e el dos.",
      checagem: [
        "Como se diz 15:30, 15:45 e 13:15 em espanhol, e qual a diferença entre ¿Qué hora es? e ¿A qué hora…?",
        "Qual a diferença entre cien e ciento, e como se diz 215 e 500?",
        "Por que se diz 'el lunes' e não 'en el lunes', e por que lunes e marzo se escrevem em minúsculas?"
      ]
    },
    fontes: [PLAN, DELE, PRENSA],
    cartoes: [
      { id: "e7c1", f: "Diga: 'São duas horas.'", v: "Son las dos. A partir de duas horas usa-se 'son las'.", t: "e7" },
      { id: "e7c2", f: "Diga: 'É uma hora.'", v: "Es la una. Só para uma hora usa-se 'es la'.", t: "e7" },
      { id: "e7c3", f: "Diga: 'São três e meia.'", v: "Son las tres y media. Y media = e meia.", t: "e7" },
      { id: "e7c4", f: "Diga: 'São quinze para as oito.' (7:45)", v: "Son las ocho menos cuarto. Menos cuarto = faltam quinze.", t: "e7" },
      { id: "e7c5", f: "Pergunte: 'A que horas é a reunião?'", v: "¿A qué hora es la reunión? 'A qué hora' pergunta o horário do evento.", t: "e7" },
      { id: "e7c6", f: "Diga: 'A reunião é segunda-feira.'", v: "La reunión es el lunes. Sem 'en' antes do dia da semana.", t: "e7" },
      { id: "e7c7", f: "Diga: 'A entrega é dia 15 de março.'", v: "La entrega es el quince de marzo. Mês em minúscula; el + número + de + mês.", t: "e7" },
      { id: "e7c8", f: "Diga: 'Hoje é dia 1º de maio.'", v: "Hoy es el primero de mayo. Para o dia 1 costuma-se dizer 'primero' ('el uno de mayo' também se ouve); os demais usam cardinais.", t: "e7" },
      { id: "e7c9", f: "Diga: 'Quanto custa o curso?'", v: "¿Cuánto cuesta el curso? Singular: cuesta; plural: cuestan.", t: "e7" },
      { id: "e7c10", f: "Diga: 'Eu tenho 30 anos.'", v: "Tengo treinta años. Idade usa tener, como no português.", t: "e7" },
      { id: "e7c11", f: "Diga o número 500 em espanhol.", v: "Quinientos. Forma irregular (não 'quinhentos').", t: "e7" },
      { id: "e7c12", f: "Diga o número 101 em espanhol.", v: "Ciento uno. Cien sozinho; ciento antes de outro número.", t: "e7" },
      { id: "e7c13", f: "Diga o número 2026 (ano) em espanhol.", v: "Dos mil veintiséis. Mil não varia; veintiséis leva acento.", t: "e7" }
    ],
    questoes: [
      {
        id: "e7q1", s: 2, t: "e7",
        e: "Son las ___ y media. (3:30) (Complete com o número.)",
        o: ["tres", "cuatro", "treinta", "trece"],
        c: [0],
        x: "Y media significa 30 minutos depois da hora cheia, então 3:30 é 'Son las tres y media'. Dizer 'cuatro y media' daria 4:30, e 'treinta' e 'trece' não dão 3:30 (trece seria 13h, no formato de 24 horas). A estrutura é sempre a hora cheia mais 'y media', e 'las' vem antes de dois ou mais."
      },
      {
        id: "e7q2", s: 2, t: "e7",
        e: "Elige la frase correcta para 1:00. (Escolha a frase correta para 1h.)",
        o: ["Son las una.", "Es la una.", "Es las una.", "Son la una."],
        c: [1],
        x: "Para uma hora, o espanhol usa o singular: Es la una. As formas 'Son las una' e 'Son la una' misturam plural com singular, e 'Es las una' mistura singular com 'las', que é plural. Só de duas em diante vira plural: Son las dos, Son las tres."
      },
      {
        id: "e7q3", s: 2, t: "e7",
        e: "Elige dos frases correctas para 7:45. (Escolha duas)",
        o: ["Son las ocho menos cuarto.", "Son las siete y cuarenta y cinco.", "Son las siete y cuarto.", "Son las ocho y cuarto."],
        c: [0, 1],
        x: "As duas frases certas dizem 7:45: 'menos cuarto' tira quinze minutos da hora seguinte (ocho menos cuarto) e 'siete y cuarenta y cinco' soma 45 minutos à hora cheia. 'Siete y cuarto' é 7:15 e 'ocho y cuarto' é 8:15, então nenhuma das duas diz 7:45."
      },
      {
        id: "e7q4", s: 2, t: "e7",
        e: "¿Cuál es la pregunta correcta? ___ es la reunión? (Qual pergunta é a correta para o horário de um evento?)",
        o: ["¿Qué hora es la reunión?", "¿A qué hora es la reunión?", "¿Cuánta hora es la reunión?", "¿Cuándo hora es la reunión?"],
        c: [1],
        x: "Para perguntar o horário de um evento, o molde é ¿A qué hora es…? ¿Qué hora es? serve para saber a hora agora e não para um evento. 'Cuánta hora' e 'cuándo hora' não são construções naturais em espanhol. Lembre: 'a' + 'qué hora' pergunta quando exatamente algo acontece."
      },
      {
        id: "e7q5", s: 2, t: "e7",
        e: "¿Cómo se dice 100? (Como se diz o número 100?)",
        o: ["ciento", "cien", "cento", "cienes"],
        c: [1],
        x: "100 sozinho é cien. A forma ciento só aparece antes de outro número (ciento uno, ciento veinte), então não serve sozinha. 'Cento' não existe em espanhol (é a forma de outras línguas) e 'cienes' não é uma forma. Em português usa-se 'cem' para 100 e 'cento e um' para 101, o que lembra a regra."
      },
      {
        id: "e7q6", s: 2, t: "e7",
        e: "¿Cómo se dice 500? (Como se diz o número 500?)",
        o: ["cincocientos", "quinientos", "quinhentos", "cinquientos"],
        c: [1],
        x: "500 é quinientos, uma forma irregular que não segue 'cinco' + 'cientos'. 'Cincocientos' e 'cinquientos' tentam montar a palavra seguindo o padrão e erram, e 'quinhentos' é a forma portuguesa. Entre as centenas, 500 (quinientos), 700 (setecientos) e 900 (novecientos) são as que fogem do padrão 'número + cientos'."
      },
      {
        id: "e7q7", s: 2, t: "e7",
        e: "Elige dos frases correctas con días o meses. (Escolha duas)",
        o: ["La reunión es el lunes.", "La reunión es en el lunes.", "Empiezo en marzo.", "Empiezo en Marzo."],
        c: [0, 2],
        x: "A reunião é 'el lunes', sem preposição, e o mês usa 'en' com inicial minúscula: en marzo. 'En el lunes' acrescenta uma preposição que não existe nesse uso, e 'Marzo' com maiúscula copia o inglês: em espanhol dias e meses se escrevem com minúscula, exceto no início de frase."
      },
      {
        id: "e7q8", s: 2, t: "e7",
        e: "Elige dos formas posibles para decir el 1 de mayo. (Escolha duas)",
        o: ["el primero de mayo", "el uno de mayo", "el primer de mayo", "el primero mayo"],
        c: [0, 1],
        x: "O dia 1 costuma ser dito 'el primero de mayo' e 'el uno de mayo' também aparece, conforme a região. 'El primer de mayo' usa a forma abreviada que só cabe antes de substantivo masculino (primer día), e 'el primero mayo' esquece o 'de'. Os outros dias usam cardinais: el dos de mayo, el tres de mayo."
      },
      {
        id: "e7q9", s: 2, t: "e7",
        e: "¿Cuál es la pregunta correcta? (Qual pergunta é a correta para o preço de um curso?)",
        o: ["¿Cuánto cuesta el curso?", "¿Cuántos cuesta el curso?", "¿Cuánta es el curso?", "¿Qué cuesta el curso?"],
        c: [0],
        x: "Para perguntar o preço de algo no singular o molde é ¿Cuánto cuesta…? Com plural muda para ¿Cuánto cuestan…? '¿Cuántos cuesta?' mistura plural com singular, '¿Cuánta es?' concorda com um feminino que não existe aqui e '¿Qué cuesta?' perguntaria o que custa algo, não quanto."
      },
      {
        id: "e7q10", s: 2, t: "e7",
        e: "¿Cuántos años tienes? Responde: ___ treinta años. (Complete a resposta.)",
        o: ["Soy", "Estoy", "Tengo", "Hago"],
        c: [2],
        x: "Idade em espanhol usa tener: Tengo treinta años. 'Soy' e 'Estoy' são formas de ser e estar, que não se usam para idade, e 'Hago' é de hacer. O uso é igual ao português 'tenho 30 anos', mas muda em relação ao inglês, que usa 'to be'."
      },
      {
        id: "e7q11", s: 2, t: "e7",
        e: "Elige dos números escritos correctamente. (Escolha duas)",
        o: ["veintidós", "veintidos", "setecientos", "sietecientos"],
        c: [0, 2],
        x: "'Veintidós' leva acento na última sílaba, e 'setecientos' é a forma correta de 700. 'Veintidos' sem acento não segue a escrita padrão, e 'sietecientos' usa 'siete' + 'cientos', uma tentativa de montar a palavra sem a forma irregular."
      },
      {
        id: "e7q12", s: 2, t: "e7",
        e: "¿Cuál es la fecha correcta de escribir? (Qual está escrita corretamente?)",
        o: ["El 15 De Marzo", "el 15 de Marzo", "El 15 de marzo", "En el 15 de marzo"],
        c: [2],
        x: "A data é escrita 'El 15 de marzo', com o mês em minúscula e o artigo antes do número, e o 'El' maiúsculo só no início da frase. 'De Marzo' e 'de Marzo' usam maiúscula indevida no mês, copiando o inglês, e 'En el 15 de marzo' acrescenta uma preposição que não existe para a data."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: hora, data, preço e telefone",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Números e hora precisam sair rápido; ouvir a gravação mostra se você hesita em quinientos, dieciséis ou 'menos cuarto'.",
      antes: "Ter lido a aula e a tabela de números e de horas. Escolher um lugar silencioso e ter o gravador do celular pronto, com o relógio à vista. Este roteiro não foi executado por quem escreveu a aula: ajuste frases e exemplos ao seu dia a dia.",
      passos: [
        { t: "Preparar um mini-roteiro", p: "Anote em papel: a hora de agora, o dia de hoje, uma data de entrega, um preço e o seu telefone. Só números, sem frases." },
        { t: "Ouvir e repetir (3 min)", p: "Diga em voz alta os números de 0 a 30, depois as dezenas, depois 100, 200, 500, 700, 900 e 1000. Repita as horas da tabela uma vez." },
        { t: "Gravar a primeira versão (2 min)", p: "Grave as cinco respostas: ¿Qué hora es?, ¿Qué día es hoy?, ¿Cuándo es la entrega?, ¿Cuánto cuesta un café? e ¿Cuál es tu teléfono?" },
        { t: "Ouvir e comparar", p: "Escute e marque: acertou o singular de 'es la una'? disse 'menos cuarto'? usou 'el lunes' sem 'en'? disse quinientos e não 'quinhentos'?" },
        { t: "Regravar corrigindo (2 min)", p: "Grave de novo corrigindo as marcas. Para fechar, diga em voz alta o preço de três itens com ciento, doscientos e mil." }
      ],
      verificar: "Na segunda gravação: a hora dita com 'es la' ou 'son las' corretamente; uma data com el + número + de + mês; um preço com ¿Cuánto cuesta?; telefone em dígitos; e nenhuma ocorrência de 'quinhentos' ou 'en el lunes'.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão, se quiser, para comparar na próxima aula.",
        "Anote um número que ainda hesita, para revisar amanhã."
      ],
      erros: [
        { s: "Travo em números acima de 30", c: "Não fixou o 'y' das dezenas.", r: "Repita treinta y uno até cuarenta y nueve, e só então avance para as centenas." },
        { s: "Confundo es la una e son las dos", c: "Hábito do português ('é uma' e 'são duas' parecem iguais).", r: "Diga 'es la una' em voz alta cinco vezes e depois 'son las dos, son las tres' em sequência." },
        { s: "Digo en el lunes", c: "Tradução palavra por palavra de 'na segunda'.", r: "Troque por 'el lunes' e repita três frases: la reunión es el lunes, la entrega es el viernes." },
        { s: "Leio o telefone muito rápido", c: "Ansiedade e vontade de terminar.", r: "Diga dígito por dígito, faça pausa a cada três ou quatro números, e regrave devagar." }
      ]
    }
  };

  /* ===================== AULA 8 ===================== */
  C.dias[8] = {
    aula: {
      titulo: "Perguntas e palavras interrogativas (inclui por qué x porque x porqué x por que)",
      resumo: "Como perguntar em espanhol: qué, quién, cuál, cuándo, dónde, cómo, por qué, cuánto/a/os/as; os sinais ¿ ? de abertura e fechamento; a entonação; as quatro grafias de 'por que'; e frases prontas para pedir esclarecimento em reunião (¿Qué significa…?, ¿Cómo se dice…?, ¿Puede repetir?).",
      simples: {
        analogia: "Pense numa pergunta em espanhol como uma frase com uma moldura. A moldura são os sinais ¿ e ?, que avisam já no começo que vem uma pergunta e deixam o leitor preparar a entonação. Dentro da moldura mora uma palavra interrogativa, que funciona como o controle remoto de um tipo de informação: qué pede coisa, quién pede pessoa, cuál pede escolha, cuándo pede tempo, dónde pede lugar, cómo pede modo, por qué pede motivo, cuánto pede quantidade. Todas levam acento escrito, o que as distingue de palavras iguais sem acento usadas em afirmações. Em reunião, essa moldura serve para esclarecer sem constrangimento: com poucas frases fixas (¿Qué significa…?, ¿Puede repetir?) você controla a conversa sem precisar falar rápido nem perfeito.",
        pontos: [
          "Toda pergunta tem ¿ no início e ? no fim; as palavras interrogativas levam acento escrito.",
          "Qué pede coisa ou definição; cuál pede escolha entre opções; quién pede pessoa.",
          "Cuándo (tempo), dónde (lugar), cómo (modo), por qué (motivo), cuánto/a/os/as (quantidade).",
          "Por qué (pergunta) é diferente de porque (resposta) e de porqué (substantivo).",
          "Para esclarecer: ¿Qué significa…?, ¿Cómo se dice… en español?, ¿Puede repetir, por favor?"
        ],
        paraQueServe: "Fazer perguntas diretas e pedir esclarecimento em reuniões, entrevistas e conversas de trabalho em espanhol, sem travar quando não entender."
      },
      glossario: [
        { t: "palavra interrogativa", d: "Palavra que abre uma pergunta e leva acento escrito: qué, quién, cuál, cuándo, dónde, cómo, cuánto." },
        { t: "¿ ?", d: "Sinais de pontuação: o de abertura (¿) e o de fechamento (?) são obrigatórios em espanhol." },
        { t: "por qué", d: "Duas palavras com acento: pergunta o motivo (¿Por qué usas SQL?)." },
        { t: "porque", d: "Uma palavra sem acento: conjunção que dá o motivo, a resposta (Porque es rápido)." },
        { t: "porqué", d: "Uma palavra com acento: substantivo masculino que significa 'motivo' (el porqué de la decisión)." },
        { t: "por que", d: "Duas palavras sem acento: preposição por + que relativo; uso pouco frequente e mais formal (hoje se diz mais 'la razón por la que…'). Confira no dicionário da RAE." },
        { t: "cuánto, cuánta, cuántos, cuántas", d: "Quantidade; concordam em gênero e número com o substantivo (¿Cuántos años? ¿Cuánta gente?)." },
        { t: "entonação", d: "Melodia da frase; em perguntas de sim ou não ela costuma subir no fim." }
      ],
      blocos: [
        {
          t: "Onde esta aula entra no A1-A2",
          facil: "Traduzindo: perguntar faz parte do conteúdo básico; esta aula dá os moldes. Sobre 'por qué', não conseguimos abrir a página da RAE e dizemos isso abaixo.",
          p: [
            "Segundo a página do Instituto Cervantes, o Plan curricular reúne os níveis de referência do espanhol em três volumes; o primeiro cobre A1-A2 e traz inventários de conteúdo. Como as páginas de inventário não abriram nesta redação, não afirmamos aqui quais perguntas pertencem a A1 ou A2.",
            "Aviso de transparência sobre 'por qué / porque / porqué / por que': o pedido era confirmar essa distinção no Diccionario panhispánico de dudas (DPD) da RAE, mas as páginas da RAE retornaram acesso negado quando tentamos abrir, então a distinção abaixo é regra geral, sem citação de página. Confira você mesma a entrada de 'porque' no DPD (rae.es) antes de usar como autoridade em texto formal.",
            "As demais regras desta aula (perguntas e frases de esclarecimento) são também regra geral, sem citação."
          ],
          dica: "Em reunião, pedir esclarecimento é sinal de cuidado, não de fraqueza: treine as frases até saírem sozinhas.",
          fonte: PLAN
        },
        {
          t: "As palavras interrogativas e seus usos",
          facil: "Traduzindo: cada palavra pergunta por um tipo de informação; todas levam acento.",
          p: [
            "Regra geral, sem citação. Qué pergunta por coisa ou definição (¿Qué es esto?, ¿Qué hora es?). Quién pergunta por pessoa (¿Quién es el responsable?) e vira quiénes no plural. Cuál pede uma escolha ou dado (¿Cuál es tu correo?). Cuándo pergunta o tempo, dónde o lugar, cómo o modo.",
            "Cuánto e suas formas concordam com o substantivo: ¿Cuántos años tienes?, ¿Cuántas personas hay?, ¿Cuánta gente viene?, ¿Cuánto tiempo tienes? Quando o verbo é o foco, cuánto fica no masculino singular: ¿Cuánto cuesta?",
            "As preposições vêm antes da palavra interrogativa: ¿De dónde eres?, ¿Con quién hablas?, ¿Para qué sirve?"
          ],
          tabela: {
            cab: ["Palavra", "Pergunta por…", "Exemplo de trabalho"],
            linhas: [
              ["qué", "coisa, definição", "¿Qué herramienta usas?"],
              ["quién / quiénes", "pessoa(s)", "¿Quién es el responsable?"],
              ["cuál / cuáles", "escolha ou dado", "¿Cuál es la fecha límite?"],
              ["cuándo", "tempo", "¿Cuándo es la entrega?"],
              ["dónde", "lugar", "¿Dónde está el documento?"],
              ["cómo", "modo", "¿Cómo funciona el proceso?"],
              ["por qué", "motivo", "¿Por qué falla la consulta?"],
              ["cuánto/a/os/as", "quantidade", "¿Cuántas tablas hay?"]
            ]
          },
          dica: "Em dúvida entre qué e cuál? Se você pede uma definição, qué; se escolhe entre opções ou pede um dado, cuál.",
        },
        {
          t: "Sinais ¿ ? e entonação",
          facil: "Traduzindo: abra com ¿ e feche com ?; a voz sobe no fim quando a pergunta é de sim ou não.",
          p: [
            "Regra geral, sem citação. Em espanhol, as perguntas levam dois sinais: ¿ no começo e ? no fim. Se a pergunta vem no meio da frase, o ¿ abre onde ela começa: Hola, ¿cómo estás? O ? sozinho no fim, como no português, está incompleto.",
            "Para sim ou não, a ordem das palavras pode ser a mesma da afirmação, e só a entonação muda: ¿Trabajas en datos? sobe no fim. Não há 'do' ou 'does' como no inglês, então não invente um verbo auxiliar.",
            "Em perguntas com palavra interrogativa, a entonação costuma descer no fim: ¿Dónde trabajas? O sotaque brasileiro costuma ser compreendido; o que ajuda é a clareza e o ritmo."
          ],
          lista: [
            "Sim ou não: ¿Trabajas aquí? (sobe no fim).",
            "Com palavra interrogativa: ¿Dónde trabajas? (desce no fim).",
            "No meio da frase: Perdón, ¿puede repetir?",
            "Exclamação segue a mesma ideia: ¡Qué bien!"
          ],
          dica: "Escreva sempre os dois sinais; sem o de abertura, o leitor só descobre a pergunta no fim.",
        },
        {
          t: "Por qué, porque, porqué e por que",
          facil: "Traduzindo: por qué pergunta; porque responde; porqué é o substantivo 'o motivo'; por que (separado, sem acento) é raro.",
          p: [
            "Regra geral, sem citação (página da RAE não abriu; veja o aviso acima). Por qué, em duas palavras e com acento, abre perguntas diretas e indiretas: ¿Por qué usas SQL? e No sé por qué falla.",
            "Porque, em uma palavra e sem acento, é a conjunção que dá o motivo, e é a resposta típica a um por qué: Uso SQL porque es rápido.",
            "Porqué, em uma palavra e com acento, é um substantivo masculino que significa 'motivo' e leva artigo: el porqué de la decisión, los porqués. Por que, em duas palavras e sem acento, é a preposição por + que relativo (la razón por que decidimos…), uso pouco comum e mais formal; na fala e na escrita de hoje costuma-se preferir 'la razón por la que decidimos…'. Em caso de dúvida, confira no dicionário da RAE.",
            "Em português existem quatro grafias parecidas (por que, porque, por quê, porquê), e a lógica é diferente. Por isso não traduza letra por letra: em espanhol, a pergunta é sempre 'por qué', em duas palavras e com o acento no qué, inclusive no fim da frase."
          ],
          tabela: {
            cab: ["Forma", "Função", "Exemplo"],
            linhas: [
              ["por qué", "pergunta (motivo)", "¿Por qué falla el pipeline?"],
              ["porque", "resposta (motivo)", "Falla porque falta un dato."],
              ["porqué", "substantivo (o motivo)", "Quiero saber el porqué."],
              ["por que", "preposição + que relativo (raro)", "La razón por que lo hacemos es simple. (mais comum: por la que)"]
            ]
          },
          dica: "Teste prático: se é pergunta, por qué; se é resposta, porque; se tem artigo (el), porqué.",
        },
        {
          t: "Perguntas para esclarecer em reunião",
          facil: "Traduzindo: frases prontas para pedir que repitam, expliquem ou digam como se fala algo em espanhol.",
          p: [
            "Regra geral, sem citação. Com tratamento formal (usted), as frases mais úteis são: ¿Puede repetir, por favor?, ¿Puede hablar más despacio?, ¿Puede escribirlo en el chat? e ¿Me puede explicar otra vez? Para vários interlocutores, ustedes: ¿Pueden repetir?",
            "Com tratamento informal (tú): ¿Puedes repetir?, ¿Puedes explicarlo otra vez? Se você não entendeu: No entiendo. ¿Qué quiere decir…? ou ¿Qué significa…?",
            "Quando faltar uma palavra em espanhol, você pode perguntar: ¿Cómo se dice 'deploy' en español? e ¿Cómo se escribe? Também ajuda confirmar o que entendeu: ¿Quiere decir que…?"
          ],
          lista: [
            "¿Puede repetir, por favor?",
            "¿Qué significa 'cuello de botella'?",
            "¿Cómo se dice 'pipeline' en español?",
            "No entiendo. ¿Puede hablar más despacio?",
            "¿Puede escribirlo en el chat?"
          ],
          dica: "Escolha duas frases desta lista e use na próxima reunião, mesmo que seja só para treinar.",
        },
        {
          t: "Armadilhas de brasileiro (portuñol)",
          facil: "Traduzindo: o português tem 'por que', 'porque' etc., e o brasileiro importa as regras de lá para o espanhol.",
          p: [
            "Estes são erros comuns de falantes de português, sem estatística e sem citação de página:",
            "Escrever '¿Por que...?' como no português: em espanhol a pergunta é por qué, com acento no qué. Escrever 'porqué' no lugar de por qué, ou 'por que' no lugar de porque, também é erro.",
            "Esquecer o ¿ de abertura, escrever só o ? no fim, ou perguntar sem a palavra interrogativa com acento: 'Donde esta el archivo?' é erro; o certo é ¿Dónde está el archivo?",
            "Usar 'cuánto' no masculino com substantivo feminino: 'cuánto personas' é erro; o certo é ¿Cuántas personas?",
            "Traduzir 'o que significa' como '¿Qué es significa?': o molde é ¿Qué significa…?"
          ],
          armadilha: "Antes de escrever, confira: tem ¿ e ?? Tem acento em qué, cómo, dónde? Para perguntar motivo, escrevi por qué?",
        },
        {
          t: "Como saber se você está no nível A1-A2",
          facil: "Traduzindo: o DELE tem níveis A1 e A2; use como horizonte, não como promessa.",
          p: [
            "A página dos exames do Instituto Cervantes mostra que o DELE oferece provas para os níveis A1 e A2, entre outros. Esta trilha não promete nível nem prazo; a referência serve apenas como horizonte.",
            "Autoteste da aula: faça em voz alta sete perguntas, uma com cada palavra interrogativa, e peça esclarecimento a um colega imaginário com três frases. Se você usou 'por qué' nas perguntas e 'porque' nas respostas, sem trocar, a base está firme."
          ],
          dica: "Perguntas bem feitas valem mais que respostas perfeitas: treine duas por dia.",
          fonte: DELE
        }
      ],
      exemplo: {
        t: "Pedindo esclarecimento em uma reunião de equipe",
        texto: "Em uma reunião com colegas da Colômbia, o gerente fala rápido sobre a migração. Ana levanta a mão: 'Perdón, ¿puede repetir, por favor? No entendí la última parte.' O gerente repete mais devagar: 'La migración empieza el lunes porque el cliente necesita los datos antes del cierre.' Ana pergunta: '¿Qué significa cierre en este contexto?' Ele responde: 'El cierre contable del mes.' Ana: '¿Quién es el responsable del cierre?' 'Luis.' 'Y ¿cuándo es la entrega?' 'El quince.' 'Gracias. Una última pregunta: ¿cómo se dice deploy en español?' 'Se puede decir despliegue.' Repare nos moldes: ¿puede repetir?, ¿qué significa…?, ¿quién…?, ¿cuándo…?, ¿cómo se dice…? e porque na resposta do gerente, que explica o motivo."
      },
      prova: [
        "Reunião: pedir que repitam, falem mais devagar ou escrevam no chat quando você não entendeu.",
        "Entrevista: perguntar ¿Cuál es el horario? e ¿Cuántas personas hay en el equipo?",
        "Texto de trabalho: escrever ¿Por qué falla la consulta? com os sinais e o acento certos.",
        "Aula ou palestra: perguntar ¿Qué significa…? para um termo novo sem interromper o ritmo."
      ],
      explique: "Explique com as próprias palavras a diferença entre por qué, porque, porqué e por que, e como pedir a um colega de reunião que repita ou explique algo em espanhol.",
      checagem: [
        "Como se escrevem os sinais de pergunta em espanhol e por que a palavra interrogativa leva acento?",
        "Quando usar qué e quando usar cuál, e como concordam cuánto, cuánta, cuántos e cuántas?",
        "Quais frases você usa para pedir que repitam, expliquem um termo ou digam como se fala algo em espanhol?"
      ]
    },
    fontes: [PLAN, DELE, PRENSA],
    cartoes: [
      { id: "e8c1", f: "Pergunte: 'Por que o pipeline falha?'", v: "¿Por qué falla el pipeline? Pergunta de motivo: por qué, duas palavras, com acento.", t: "e8" },
      { id: "e8c2", f: "Responda: 'Porque falta um dado.'", v: "Porque falta un dato. A resposta de motivo usa porque, uma palavra, sem acento.", t: "e8" },
      { id: "e8c3", f: "Pergunte: 'Qual é a data limite?'", v: "¿Cuál es la fecha límite? Cuál pede dado ou escolha; qué pede definição.", t: "e8" },
      { id: "e8c4", f: "Pergunte: 'Quem é o responsável?'", v: "¿Quién es el responsable? Quién pergunta por pessoa.", t: "e8" },
      { id: "e8c5", f: "Pergunte: 'Onde está o documento?'", v: "¿Dónde está el documento? Dónde pergunta lugar; leva acento.", t: "e8" },
      { id: "e8c6", f: "Pergunte: 'Quando é a entrega?'", v: "¿Cuándo es la entrega? Cuándo pergunta tempo; leva acento.", t: "e8" },
      { id: "e8c7", f: "Pergunte: 'Como funciona o processo?'", v: "¿Cómo funciona el proceso? Cómo pergunta modo; leva acento.", t: "e8" },
      { id: "e8c8", f: "Pergunte: 'Quantas pessoas há na equipe?'", v: "¿Cuántas personas hay en el equipo? Cuántas concorda com personas (feminino plural).", t: "e8" },
      { id: "e8c9", f: "Peça: 'Pode repetir, por favor?' (formal)", v: "¿Puede repetir, por favor? Poder + infinitivo; usted usa a forma de él.", t: "e8" },
      { id: "e8c10", f: "Peça: 'O que significa essa palavra?'", v: "¿Qué significa esta palabra? Molde: ¿Qué significa…?", t: "e8" },
      { id: "e8c11", f: "Pergunte: 'Como se diz deploy em espanhol?'", v: "¿Cómo se dice deploy en español? Molde: ¿Cómo se dice… en español?", t: "e8" },
      { id: "e8c12", f: "Diga: 'Eu não entendo. Pode falar mais devagar?'", v: "No entiendo. ¿Puede hablar más despacio? No + verbo; poder + infinitivo.", t: "e8" },
      { id: "e8c13", f: "Pergunte: 'Quanto custa o curso?'", v: "¿Cuánto cuesta el curso? Cuánto fica no masculino singular com o verbo cuesta.", t: "e8" }
    ],
    questoes: [
      {
        id: "e8q1", s: 2, t: "e8",
        e: "Completa: ¿___ falla la consulta? (Complete a pergunta sobre o motivo.)",
        o: ["Porque", "Por qué", "Porqué", "Por que"],
        c: [1],
        x: "Para perguntar o motivo, usa-se por qué, em duas palavras e com acento no qué. 'Porque' em uma palavra é a conjunção que dá o motivo (a resposta). 'Porqué' é o substantivo (el porqué), e 'por que' sem acento não serve para abrir uma pergunta. Lembre: pergunta com acento e separado, resposta junto e sem acento."
      },
      {
        id: "e8q2", s: 2, t: "e8",
        e: "Completa: Falla ___ falta un dato. (Complete a resposta que dá o motivo.)",
        o: ["porque", "por qué", "porqué", "por que"],
        c: [0],
        x: "A conjunção que apresenta o motivo é 'porque', em uma palavra e sem acento. 'Por qué' é de perguntas, 'porqué' é um substantivo (que levaria artigo, como el porqué) e 'por que' separado é uma preposição mais um 'que' relativo, uso mais formal que não cabe aqui. Aqui a frase dá o motivo, e é uma resposta."
      },
      {
        id: "e8q3", s: 2, t: "e8",
        e: "Elige dos frases correctas. (Escolha duas)",
        o: ["¿Por qué usas SQL?", "¿Por que usas SQL?", "Uso SQL porque es rápido.", "Uso SQL por qué es rápido."],
        c: [0, 2],
        x: "'¿Por qué usas SQL?' pergunta o motivo com por qué, e 'Uso SQL porque es rápido' dá o motivo com porque. '¿Por que usas SQL?' copia a grafia portuguesa sem acento e não é a forma espanhola para abrir uma pergunta. 'Uso SQL por qué es rápido' usa a forma de perguntar numa afirmação, onde cabe a conjunção porque."
      },
      {
        id: "e8q4", s: 2, t: "e8",
        e: "¿Cuál es la pregunta correcta? (Qual é a pergunta escrita corretamente?)",
        o: ["Donde esta el archivo?", "¿Donde esta el archivo?", "¿Dónde está el archivo?", "Dónde está el archivo?"],
        c: [2],
        x: "A pergunta completa tem os dois sinais (¿ e ?) e acento nas palavras que o exigem: dónde e está. As outras versões erram o sinal de abertura, o acento da palavra interrogativa ou os dois. Sem o acento em dónde, ele se parece com 'donde' relativo, e sem o ¿ o leitor só descobre a pergunta no fim."
      },
      {
        id: "e8q5", s: 2, t: "e8",
        e: "Completa: ¿___ es tu correo? (Complete: quero saber qual é o e-mail.)",
        o: ["Qué", "Cuál", "Quién", "Dónde"],
        c: [1],
        x: "Para pedir um dado entre muitos possíveis (qual é o seu e-mail), usa-se cuál: ¿Cuál es tu correo? Qué pediria uma definição, como se você não soubesse o que é um correo. Quién pergunta por pessoa e dónde por lugar, e nenhum dos dois combina com pedir um dado."
      },
      {
        id: "e8q6", s: 2, t: "e8",
        e: "Completa: ¿___ personas hay en el equipo? (Complete com a forma correta de 'quanto'.)",
        o: ["Cuánto", "Cuántas", "Cuántos", "Cuánta"],
        c: [1],
        x: "A palavra 'personas' é feminino plural, então 'cuánto' tem de concordar: cuántas. As formas cuánto, cuántos e cuánta têm gênero ou número diferente e não combinam com personas. O mesmo vale para ¿Cuántos años?, em que años é masculino plural, e ¿Cuánta gente?, em que gente é feminino singular."
      },
      {
        id: "e8q7", s: 2, t: "e8",
        e: "Elige dos frases útiles para pedir esclarecimiento. (Escolha duas)",
        o: ["¿Puede repetir, por favor?", "¿Qué significa 'pipeline'?", "Quiero que repite.", "¿Qué es significa?"],
        c: [0, 1],
        x: "'¿Puede repetir, por favor?' pede que repitam e '¿Qué significa…?' pede o sentido de uma palavra; as duas são moldes naturais de esclarecimento. 'Quiero que repite' usa uma forma verbal incorreta (o certo seria 'repita', de um modo verbal que ainda não vimos) e soa direta demais. '¿Qué es significa?' junta dois verbos seguidos e não é o molde espanhol."
      },
      {
        id: "e8q8", s: 2, t: "e8",
        e: "¿Cómo preguntas la forma en español de una palabra? (Como perguntar a forma em espanhol de uma palavra?)",
        o: ["¿Cómo se dice 'deploy' en español?", "¿Cómo dices 'deploy' español?", "¿Qué es 'deploy' en español dice?", "¿Cuánto se dice 'deploy'?"],
        c: [0],
        x: "O molde natural é ¿Cómo se dice … en español?, com o 'se' impessoal e a preposição 'en'. A versão '¿Cómo dices… español?' perde a preposição, a que inverte 'qué es… dice' mistura estruturas, e '¿Cuánto se dice?' perguntaria quantidade, não o modo de dizer algo."
      },
      {
        id: "e8q9", s: 2, t: "e8",
        e: "Elige dos frases con acento correcto. (Escolha duas)",
        o: ["¿Cuándo es la entrega?", "¿Cuando es la entrega?", "¿Cómo funciona?", "¿Como funciona?"],
        c: [0, 2],
        x: "Em perguntas, as palavras interrogativas levam acento escrito: cuándo e cómo. As versões sem acento ('cuando', 'como') existem em espanhol, mas são outras palavras (conjunção ou advérbio) e não abrem uma pergunta. O acento é o que sinaliza ao leitor que se trata da palavra interrogativa."
      },
      {
        id: "e8q10", s: 2, t: "e8",
        e: "Elige la pregunta correcta para pedir el nombre de una persona. (Escolha a pergunta correta.)",
        o: ["¿Quién es el responsable?", "¿Qué es el responsable?", "¿Cuál persona es?", "¿Dónde es el responsable?"],
        c: [0],
        x: "Para perguntar por uma pessoa (quem é o responsável), a palavra é quién: ¿Quién es el responsable? Qué pergunta por coisa ou definição, 'cuál persona' usa cuál com substantivo de um modo que não é o molde habitual, e dónde pergunta por lugar, não por pessoa."
      },
      {
        id: "e8q11", s: 2, t: "e8",
        e: "'Quiero saber el ___ de la decisión.' ¿Qué forma falta? (Qual forma falta?)",
        o: ["porque", "por qué", "porqué", "por que"],
        c: [2],
        x: "Com o artigo 'el' antes, a palavra é um substantivo masculino que significa 'motivo': el porqué (plural los porqués), escrita junta e com acento. 'Porque' é conjunção e não leva artigo, 'por qué' abre perguntas, e 'por que' separado, sem acento, é uma preposição com 'que' relativo e não substitui um substantivo."
      },
      {
        id: "e8q12", s: 2, t: "e8",
        e: "¿Cuál frase tiene la entonación típica de una pregunta de sí o no? (Qual frase costuma subir no fim?)",
        o: ["¿Trabajas en datos?", "¿Dónde trabajas?", "¿Cómo trabajas?", "¿Por qué trabajas?"],
        c: [0],
        x: "As perguntas de sim ou não, como '¿Trabajas en datos?', costumam ter entonação que sobe no fim, e a ordem das palavras pode ser a mesma da afirmação. As outras abrem com palavra interrogativa (dónde, cómo, por qué) e costumam descer no fim. É uma tendência geral, não uma regra rígida, e varia por região."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: perguntar e pedir esclarecimento",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Perguntar em voz alta é o jeito mais rápido de usar o espanhol em reuniões; ouvir a gravação mostra a entonação das perguntas e se por qué e porque estão no lugar certo.",
      antes: "Ter lido a aula e as frases de esclarecimento. Escolher um lugar silencioso e deixar o gravador do celular pronto. Este roteiro não foi executado por quem escreveu a aula: ajuste frases e exemplos ao seu trabalho.",
      passos: [
        { t: "Preparar sete perguntas", p: "Escreva em papel sete perguntas do seu trabalho, uma para cada palavra interrogativa (qué, quién, cuál, cuándo, dónde, cómo, cuánto), sem esquecer ¿ e ?." },
        { t: "Ouvir e repetir (3 min)", p: "Leia as sete perguntas em voz alta, duas vezes. Faça a voz subir no fim das de sim ou não e descer nas com palavra interrogativa." },
        { t: "Gravar a primeira versão (2 min)", p: "Grave as sete perguntas e mais três pedidos de esclarecimento: ¿Puede repetir?, ¿Qué significa…? e ¿Cómo se dice… en español?" },
        { t: "Ouvir e comparar", p: "Escute e marque: a entonação sobe ou desce onde deveria? Você disse por qué na pergunta e porque na resposta? Você disse quién e cuál no lugar certo?" },
        { t: "Regravar corrigindo (2 min)", p: "Grave de novo corrigindo as marcas. Termine com um mini-diálogo: faça uma pergunta com por qué e responda com porque." }
      ],
      verificar: "Na segunda gravação: sete palavras interrogativas diferentes ditas corretamente; pelo menos uma frase de sim ou não com entonação ascendente; os três pedidos de esclarecimento ditos sem pausa longa; e um par pergunta-resposta com por qué / porque.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão, se quiser, para comparar na próxima aula.",
        "Anote em uma linha qual palavra interrogativa mais escapou."
      ],
      erros: [
        { s: "Falo todas as perguntas com a mesma entonação", c: "Hábito de ler em ritmo uniforme.", r: "Escolha duas frases (uma de sim ou não e uma com dónde) e repita exagerando a subida e a descida; depois regrave normal." },
        { s: "Esqueço o ¿ ao escrever as perguntas do roteiro", c: "Em português não há sinal de abertura.", r: "Antes de gravar, confira no papel: toda pergunta começa com ¿ e termina com ?." },
        { s: "Troco por qué e porque", c: "As grafias parecem iguais no português.", r: "Escreva duas frases-modelo (¿Por qué…? e …porque…) e leia em voz alta em pares até saírem sem pensar." },
        { s: "Travo ao pedir que repitam", c: "Receio de parecer que não entende.", r: "Treine ¿Puede repetir, por favor? cinco vezes seguidas; use sempre a mesma frase até ficar automática." }
      ]
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
