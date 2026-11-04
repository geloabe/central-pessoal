(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
  /* Trilha de espanhol, aulas 1 a 4 (A1). Fontes: só páginas efetivamente abertas na redação; o que não pôde ser conferido está marcado no texto como 'regra geral, sem citação'. */
  var FAQ = ["Instituto Cervantes: o que é o MCER (níveis A1 a C2)", "https://cervantes.org/es/preguntas-frecuentes"];
  var DELE = ["Instituto Cervantes: exame DELE e níveis oferecidos (A1 a C2)", "https://cervantes.org/es/examenes/dele"];

  /* ===================== AULA 1 ===================== */
  C.dias[1] = {
    aula: {
      titulo: "Sons e pronúncia: o que o ouvido brasileiro engana",
      resumo: "As cinco vogais puras, j/g, ll/y, ñ, r/rr, z/c, h muda, b/v, d entre vogais, regras de tilde e o alfabeto para soletrar nome e e-mail, sempre comparando com o português para evitar o portuñol.",
      simples: {
        analogia: "Pense no português como um piano com teclas extras: ele tem vogais nasais (pão, maçã), o 'tchi' e o 'dji' que aparecem quando o t e o d encontram um i, e o 'z' que vibra em 'casa'. O espanhol é um violão com menos cordas e todas afinadas de forma fixa: são só cinco vogais, sempre iguais, sem nasalizar e sem trocar o som no fim da palavra. Quem toca violão com a mão acostumada ao piano tende a apertar teclas que não existem: diz 'létchi' em vez de 'léche' e 'djía' em vez de 'día'. Por isso, nesta aula você não aprende sons novos em quantidade; você aprende o que desligar do português e as poucas teclas que mudam de lugar, como j, ñ, rr e z.",
        pontos: [
          "Só cinco vogais (a, e, i, o, u), sempre limpas, sem nasalizar e sem 'i' no final: leche termina em e, não em i.",
          "A letra j (e g antes de e/i) faz um som forte de garganta; a letra h não faz som nenhum.",
          "A letra ñ soa como o 'nh' de 'linha'; rr (e r no início) vibra a língua; r entre vogais é um toque só.",
          "Na América Latina, z e c antes de e/i soam como s; b e v soam igual; o s de 'casa' não soa como 'z' de 'zebra'.",
          "Regra de tilde: palavras que acabam em vogal, n ou s têm força na penúltima sílaba; as demais, na última; fugiu disso, leva tilde."
        ],
        paraQueServe: "Ser entendida logo na primeira frase em uma reunião, entrevista ou ligação com colegas da América Latina, e soletrar seu nome e e-mail sem travar."
      },
      glossario: [
        { t: "Vogal pura", d: "Vogal que mantém o mesmo som do começo ao fim, sem nasalizar nem 'escorregar' para outra vogal. Em espanhol são cinco: a, e, i, o, u." },
        { t: "Portuñol", d: "Mistura de português e espanhol, em que o falante usa sons, palavras ou regras do português sem perceber. Aqui é tratado como interferência comum, não como defeito." },
        { t: "Seseo", d: "Pronúncia de z e de c (antes de e/i) como s, usual na América Latina. Em grande parte da Espanha, essas letras soam como o 'th' do inglês 'think'." },
        { t: "Yeísmo", d: "Pronúncia igual de ll e y, o que acontece na maior parte do mundo hispânico. Por isso 'calle' e 'cayó' podem soar parecidos." },
        { t: "Tilde", d: "O acento gráfico do espanhol (á, é, í, ó, ú). Marca onde fica a sílaba mais forte quando a palavra foge da regra geral." },
        { t: "Sílaba tônica", d: "A sílaba pronunciada com mais força na palavra. Em 'teléfono' é 'lé'; em 'hotel' é 'tel'." },
        { t: "Deletrear", d: "Dizer as letras de uma palavra uma a uma, como ao ditar seu nome ou e-mail: 'a, ene, a'." }
      ],
      blocos: [
        {
          t: "Cinco vogais, sempre puras",
          facil: "Traduzindo: o espanhol só tem a, e, i, o, u, e cada uma soa igual em qualquer lugar da palavra.",
          p: [
            "Regra geral, sem citação: o espanhol tem cinco vogais e elas não mudam de som conforme a posição na palavra. Em português, o 'e' final de 'leite' vira quase 'i' e o 'o' final de 'livro' vira quase 'u'. Em espanhol isso não acontece: 'leche' termina em um 'e' claro e 'libro' termina em um 'o' claro. A boca fica no formato da vogal do início ao fim, sem 'fechar' no final.",
            "Também não existe nasalização como em 'pão', 'mãe' ou 'bom'. Em 'pan', 'mano' ou 'tan', a vogal é oral e o 'n' é só uma consoante depois dela. Quando o brasileiro nasaliza a vogal antes de m ou n, o resultado soa 'portunhol' para o ouvido hispânico.",
            "Outra interferência: no português de muitas regiões, t e d antes de 'i' viram 'tchi' e 'dji' (tio, dia). Em espanhol, t e d continuam secos: 'tío' é 'tí-o' e 'día' é 'dí-a', com a ponta da língua nos dentes. O mesmo vale para 'te', 'de', 'ti', 'di'. E a combinação 'ch' é o 'tch' de 'tchau': 'leche' = 'lé-che', 'chico' = 'chí-co'."
          ],
          lista: [
            "leche = lé-che (e final claro, nunca 'létchi')",
            "libro = lí-bro (o final claro, nunca 'líbru')",
            "pan = pan, sem nasalizar (nada de 'pãn')",
            "día = dí-a, com d seco (nada de 'djía')"
          ],
          dica: "Treine a vogal sozinha: abra a boca para 'a', diga 'a' e só então encaixe a consoante. Mantenha a boca parada até o fim da palavra."
        },
        {
          t: "Consoantes que mudam: j, g, ll, y, ñ",
          facil: "Traduzindo: j faz um som forte de garganta; g antes de e/i faz o mesmo som; ñ é o nosso 'nh'; ll e y soam parecido.",
          p: [
            "Regra geral, sem citação: a letra j faz um som áspero, vindo da garganta, parecido com o 'rr' de 'carro' em muitas pronúncias brasileiras ou com o 'h' do inglês 'hat' bem forte (em algumas regiões, como o Caribe, ele é mais suave, quase um 'h' aspirado). 'Trabajo', 'jefe', 'ejemplo'. A letra g tem dois sons: antes de a, o, u é o 'g' de 'gato' (gato, gordo, gusto); antes de e, i é igual ao j (gente, gigante). Para manter o 'g' duro antes de e/i, o espanhol usa 'gu' e o u não soa: 'guerra', 'guitarra'.",
            "A letra ñ (eñe) representa o som de 'nh' em 'linha': 'año' soa como 'ânho', 'mañana' como 'manhana'. Cuidado com a troca por n simples, porque 'año' (ano) e 'ano' (parte do corpo) são palavras diferentes. A letra ñ nunca é escrita 'nh' em espanhol.",
            "Os dígrafos ll e y: na maior parte da América Latina, ll e y soam igual, parecido com o 'di' de 'dia' dito rápido ('yo', 'calle', 'llamo'). Em algumas regiões do Rio da Prata ele soa mais como um 'ch' suave, parecido com o 'sh' do inglês; você pode ouvir isso e é normal. Sozinha, a palavra 'y' significa 'e' (a conjunção) e é lida como 'i': 'tú y yo'.",
            "Nota de dialeto, regra geral, sem citação: o som de 'll' e 'y' varia entre regiões; para falar, escolha uma pronúncia só e seja consistente."
          ],
          tabela: {
            cab: ["Letra", "Som aproximado", "Exemplos"],
            linhas: [
              ["j", "som forte de garganta", "trabajo, jefe, ejemplo"],
              ["g + a, o, u", "g de 'gato'", "gato, gordo, gusto"],
              ["g + e, i", "igual ao j", "gente, gigante"],
              ["gu + e, i", "g de 'gato'; u mudo", "guerra, guitarra"],
              ["ñ", "nh de 'linha'", "año, mañana, español"],
              ["ll, y", "parecido com 'di' rápido", "llamo, calle, yo"]
            ]
          },
          dica: "Ao ver j, g+e ou g+i, lembre-se do mesmo som áspero. Ao ver ñ, pense em 'linha'. Em espanhol, nunca 'nh'."
        },
        {
          t: "r, rr, z, c, s, h, b/v e d",
          facil: "Traduzindo: rr vibra a língua; z e c (antes de e/i) soam como s; s não vira z; h não soa; b e v são iguais.",
          p: [
            "Regra geral, sem citação: a letra r no início da palavra, depois de n, l ou s ('honra') e o dígrafo rr entre vogais fazem a vibração múltipla da língua (r-r-r): 'rojo', 'perro', 'correo'. Entre vogais, um r só é um toque rápido, parecido com o 'r' de 'caro': 'pero', 'cara'. A diferença muda o sentido: 'pero' (mas) e 'perro' (cachorro). Muitos brasileiros dizem o 'rr' como um 'h' ou um som de garganta, como em 'carro' em algumas regiões; costuma ser entendido pelo contexto, mas vale treinar a vibração para a diferença entre 'pero' e 'perro' ficar clara.",
            "As letras z e c: na América Latina, z (zapato, zona) e c antes de e/i (cena, cielo) soam como s. Na Espanha, soam como o 'th' do inglês. Esse é o seseo. Não existe 'ç' na ortografia do espanhol, e a letra z não soa como o 'z' de 'zebra'. O s entre vogais também não vira 'z': 'casa' tem s de 'sapo', não de 'zebra'. Ler 'casa' como 'caza' costuma denunciar o sotaque brasileiro.",
            "A letra h não tem som: 'hola' soa 'ola', 'hacer' soa 'acer', 'ahora' soa 'aora'. Já ch soa como 'tch' de 'tchau'. As letras b e v têm o mesmo som em espanhol: 'vaca' e 'baca' soam igual. No início da palavra e depois de n/m o som é como o 'b' de 'bola' (bien, vino, un vaso). Entre vogais ele fica mais suave: os lábios quase se tocam sem fechar ('lobo', 'nueve'). Não use o 'v' de 'vaca' com o dente no lábio.",
            "A letra d entre vogais é suave, com a língua tocando de leve entre os dentes, parecido com o 'th' de 'this' em inglês: 'nada', 'lado', 'cada'. No fim da palavra costuma ficar ainda mais fraca ('Madrid', 'verdad'). O d no início de uma frase ou depois de n/l ('día', 'donde') é mais firme, como o do português sem o 'dji'."
          ],
          lista: [
            "rojo, perro, correo = vibração (rr)",
            "pero, cara, trabajo = toque único (r)",
            "zapato, cena, cielo = soam como s (na América Latina)",
            "hola, ahora, hacer = h sem som",
            "vaca = baca; vino = bino (mesmo som)"
          ],
          dica: "Diga 'pero' e 'perro' em voz alta, uma depois da outra, até o ouvido sentir a diferença de vibração."
        },
        {
          t: "Acento tônico e tilde",
          facil: "Traduzindo: veja a terminação da palavra: vogal, n ou s = força na penúltima; outra consoante = força na última. Se foge da regra, leva tilde.",
          p: [
            "Regra geral, sem citação: as palavras de duas ou mais sílabas que terminam em vogal, n ou s têm a sílaba forte na penúltima e não levam tilde ('casa', 'joven', 'lunes', 'examen'). As que terminam em outra consoante têm a sílaba forte na última e também não levam tilde ('hotel', 'ciudad', 'doctor', 'español').",
            "Se a palavra foge da regra, a sílaba forte leva tilde: 'café' e 'inglés' (força na última, mas terminam em vogal ou s), 'lápiz' e 'árbol' (força na penúltima, mas terminam em consoante diferente de n/s). Palavras com força na antepenúltima sempre levam tilde: 'teléfono', 'sábado', 'página', 'matemáticas'. Palavras com ción/sión no final levam tilde em espanhol e perdem no plural: 'canción' vira 'canciones'.",
            "Palavras de uma sílaba, em geral, não levam tilde ('pan', 'sol', 'fue'). O espanhol usa a tilde também para diferenciar palavras iguais: 'tú' (você) e 'tu' (seu), 'él' (ele) e 'el' (artigo), 'sí' (sim) e 'si' (se), 'más' (mais) e 'mas' (mas), 'té' (chá) e 'te' (te). Perguntas e exclamações levam tilde: '¿Qué?', '¿Cómo?', '¿Dónde?', '¿Cuándo?', '¿Quién?'.",
            "Outra diferença do português: o espanhol abre as perguntas e exclamações com ¿ e ¡. Escreva '¿Cómo te llamas?' e '¡Hola!'."
          ],
          tabela: {
            cab: ["Terminação", "Sílaba forte", "Exemplos"],
            linhas: [
              ["vogal, n ou s", "penúltima", "casa, joven, lunes"],
              ["outra consoante", "última", "hotel, ciudad, doctor"],
              ["foge da regra", "tilde na forte", "café, inglés, lápiz, árbol"],
              ["antepenúltima", "sempre tilde", "teléfono, sábado, página"]
            ]
          },
          dica: "Palavras com ción levam tilde ('canción') e perdem no plural ('canciones'). Em perguntas, a tilde está em qué, cómo, dónde, cuándo e quién."
        },
        {
          t: "Alfabeto, nome e e-mail",
          facil: "Traduzindo: para soletrar, aprenda o nome de cada letra em espanhol e as palavras arroba, punto, guion e guion bajo.",
          p: [
            "Regra geral, sem citação: o alfabeto espanhol tem as letras a, be, ce, de, e, efe, ge, hache, i, jota, ka, ele, eme, ene, eñe, o, pe, cu, erre, ese, te, u, uve, uve doble, equis, ye, zeta. Alguns nomes variam: o 'v' é 'uve' na Espanha, mas na América costuma-se dizer 've' (ou 've corta'); o 'w' pode ser 'uve doble', 'doble ve' ou 'doble u'; o 'y' pode ser 'i griega' ou 'ye'. Para não confundir b e v ao soletrar, muita gente diz 'b de burro, v de vaca'. Você vai ouvir variações e isso é normal.",
            "Para soletrar o e-mail 'ana.silva@empresa.com': 'a, ene, a, punto, ese, i, ele, uve, a, arroba, e, eme, pe, erre, e, ese, a, punto, ce, o, eme'. Palavras úteis: 'arroba' (@), 'punto' (.), 'guion' (-), 'guion bajo' (_), 'mayúscula' e 'minúscula'. Peça confirmação com '¿Cómo se escribe?' e confirme com 'Se escribe con hache' ou 'sin tilde'.",
            "Armadilha frequente: dizer as letras com o nome do português ('gê', 'érre', 'zê'). Em espanhol, 'ge' tem som áspero no início, o 'r' é 'erre' e o 'z' é 'zeta'. Treine as letras do seu nome e do domínio do seu e-mail, porque é isso que você vai soletrar na vida real."
          ],
          lista: [
            "@ = arroba; . = punto; - = guion; _ = guion bajo",
            "h = hache; ñ = eñe; j = jota; g = ge; y = ye",
            "¿Cómo se escribe? = como se escreve?",
            "Se escribe con hache / sin tilde"
          ],
          dica: "Escreva seu primeiro nome e seu e-mail em letras separadas num papel e treine dizer em voz alta até sair sem pensar."
        },
        {
          t: "Armadilhas de brasileiro: onde o ouvido engana",
          facil: "Traduzindo: o ouvido brasileiro 'completa' o espanhol com sons do português; é aí que nasce o portuñol.",
          p: [
            "Erros comuns de falantes de português (padrões de interferência; não há estatística aqui): nasalizar vogais ('pan' como 'pãn'), dizer 'tchi' e 'dji' em 'te' e 'de' antes de i, falar o 'e' final como 'i' ('leche' como 'létchi'), ler 'v' como o 'v' do português (dente no lábio) e ler o s de 'casa' como 'z' ('caza') ou o z de 'zapato' como o 'z' de 'zebra'.",
            "Outro erro é escrever em português dentro de frases em espanhol: 'nh' em vez de ñ ('mañana' vira 'manhana') e 'ç' em vez de z ou c. Também é comum suavizar o j demais ('trabajo' soando como 'trabaio') ou ler 'gente' como 'djente'.",
            "O jeito de corrigir: escolher poucos sons por vez. Comece por três: vogais puras (sem 'i' final), j (som áspero) e rr (vibração). Depois, entram o seseo (z e c como s) e o d suave."
          ],
          armadilha: "Seus sinais de alerta: vogal final virando 'i' ou 'u', 'dji'/'tchi' em de/te, 'nh' escrito no lugar de ñ e 'z' no lugar de s. Quando notar um, repita a palavra devagar com boca parada e vogal limpa."
        },
        {
          t: "Onde esta aula se encaixa: nível A1",
          facil: "Traduzindo: A1 é o nível básico do quadro europeu; a meta aqui é comunicação simples, não perfeição.",
          p: [
            "A página do Instituto Cervantes sobre o MCER explica que o quadro de referência vai de A1, chamado de nível básico, até C2, e que a instituição baseia seus cursos e diplomas nele. Esta aula trata de itens de A1, o primeiro degrau.",
            "Isso significa que o objetivo agora é se fazer entender com frases curtas e corretas, e não falar sem erros. Erros de gênero, de artigo ou de som são normais nessa fase e fazem parte do caminho; o treino de voz alta e os cartões diários servem para reduzi-los aos poucos."
          ],
          dica: "Meta de A1: ser entendida em frases curtas. Corrija um erro por vez e comemore o que já sai natural.",
          fonte: FAQ
        }
      ],
      exemplo: {
        t: "Soletrar nome e e-mail numa ligação",
        texto: "Imagine que você liga para um colega de outro país e ele pede seus dados. Ele diz: '¿Cómo se escribe su nombre?' Você responde: 'Mi nombre es Ana Silva. Se escribe a, ene, a, ese, i, ele, uve, a. Todo junto, sin tilde.' Ele pede o e-mail: 'Mi correo es ana punto silva arroba empresa punto com. Se escribe a, ene, a, punto, ese, i, ele, uve, a, arroba, e, eme, pe, erre, e, ese, a, punto, ce, o, eme.' Ele repete e você confirma: 'Sí, correcto. Gracias.' Se ele não entender, você pede ajuda: 'Más despacio, por favor' e depois repete com calma. Repare em 'erre' e em 'arroba': os dois têm vibração forte, e todas as vogais ficam limpas, sem 'i' no final."
      },
      prova: [
        "Reunião: soletrar seu nome e e-mail para que alguém registre você num sistema.",
        "Entrevista: dizer 'trabajo con datos' e 'mañana' sem nasalizar e com j áspero.",
        "Conversa informal: diferenciar 'pero' e 'perro' e usar o sentido certo.",
        "Escrita: colocar a tilde correta em 'teléfono', 'canción', 'inglés' e 'qué'."
      ],
      explique: "Explique com as próprias palavras três diferenças entre pronunciar espanhol e português (vogais, j/ñ/rr, z/s) e mostre como soletrar seu nome e e-mail.",
      checagem: [
        "Quais são as cinco vogais e por que 'leche' não termina em 'i'?",
        "Como se pronunciam j, ñ, rr e z/c na América Latina?",
        "Que regra diz quando uma palavra leva tilde? Dê um exemplo de cada tipo."
      ]
    },
    fontes: [FAQ, DELE],
    cartoes: [
      { id: "e1c1", f: "Diga 'leite' em espanhol e pronuncie a vogal final.", v: "leche, com 'e' final claro (lé-che). Vogal pura: não vira 'i'.", t: "e1" },
      { id: "e1c2", f: "Diga 'trabalho' em espanhol (o j é áspero).", v: "trabajo. A letra j faz o som forte de garganta.", t: "e1" },
      { id: "e1c3", f: "Diga 'amanhã' em espanhol, com o som de nh.", v: "mañana. A letra ñ soa como 'nh' de 'linha'.", t: "e1" },
      { id: "e1c4", f: "Diga 'mas' e 'cachorro' em espanhol (atenção ao r).", v: "pero (r de toque) e perro (rr vibrante). A vibração muda o sentido.", t: "e1" },
      { id: "e1c5", f: "Diga 'gente' em espanhol: qual é o som do g?", v: "gente, com g igual ao j (som áspero). G antes de e/i = j.", t: "e1" },
      { id: "e1c6", f: "Como pronunciar 'zapato' na América Latina?", v: "Soa 'sa-pa-to': z soa como s (seseo). Não soa como o z de 'zebra'.", t: "e1" },
      { id: "e1c7", f: "Diga 'olá' em espanhol; o que acontece com o h?", v: "hola, sem som no h: 'ola'. A letra h é muda.", t: "e1" },
      { id: "e1c8", f: "Diga 'vaca' em espanhol: o v soa diferente de b?", v: "vaca soa 'baca': b e v têm o mesmo som em espanhol.", t: "e1" },
      { id: "e1c9", f: "Diga 'dia' em espanhol, sem 'dji'.", v: "día, com d seco (dí-a). Não use 'dji'.", t: "e1" },
      { id: "e1c10", f: "Como se escreve 'telefone' em espanhol e onde está a força?", v: "teléfono, com tilde na antepenúltima. Antepenúltima sempre leva tilde.", t: "e1" },
      { id: "e1c11", f: "Diga o símbolo @ ao ditar um e-mail.", v: "arroba. Ex.: 'ana arroba empresa punto com'. Ponto é 'punto'.", t: "e1" },
      { id: "e1c12", f: "Como perguntar 'como se escreve?' em espanhol?", v: "¿Cómo se escribe? Com tilde em cómo e ¿ de abertura.", t: "e1" },
      { id: "e1c13", f: "Diga o nome da letra h em espanhol.", v: "hache. É a letra muda; a letra ñ se diz 'eñe'.", t: "e1" }
    ],
    questoes: [
      {
        id: "e1q1", s: 1, t: "e1",
        e: "¿Cómo se pronuncia 'leche'? (Como se pronuncia 'leche'?)",
        o: ["lé-che, con e final clara", "létchi, con i final", "lé-chu, con u final", "léche, con e nasal"],
        c: [0],
        x: "O espanhol tem cinco vogais puras, e o 'e' final continua sendo 'e', claro e oral. A alternativa com 'i' final reproduz a pronúncia brasileira de 'leite' e soa como portuñol. A alternativa com 'u' final troca a vogal sem motivo. A alternativa com e nasal copia a nasalização do português, que o espanhol não tem. Por isso só a pronúncia com 'e' final clara está correta."
      },
      {
        id: "e1q2", s: 1, t: "e1",
        e: "¿Cuál palabra tiene el sonido áspero de la letra j? (Qual palavra tem o som áspero da letra j?)",
        o: ["gente", "gato", "guerra", "gusto"],
        c: [0],
        x: "Antes de e ou i, a letra g tem o mesmo som áspero da letra j, por isso 'gente' é a correta. Em 'gato' e 'gusto', o g está antes de a ou u e soa como o g de 'gato' em português. Em 'guerra', o grupo 'gu' antes de e mantém o g duro e o u é mudo. Quem lê 'gente' como 'dgente' erra o som, e é isso que o item testa."
      },
      {
        id: "e1q3", s: 1, t: "e1",
        e: "¿Qué sonido hace la letra ñ? (Que som faz a letra ñ?)",
        o: ["como 'nh' de 'linha'", "como 'n' simples", "como 'ni' de 'nível'", "como 'm'"],
        c: [0],
        x: "A letra ñ representa o som de 'nh' do português, como em 'linha'. Ler como n simples apaga a diferença entre 'año' (ano) e 'ano' (parte do corpo). O som 'ni' separa duas sílabas, e ñ é um som só. Ler como m não tem relação com a letra. A correta, portanto, é a que compara com o 'nh' de 'linha'."
      },
      {
        id: "e1q4", s: 1, t: "e1",
        e: "Elige dos palabras con tilde correcta. (Escolha duas)",
        o: ["teléfono", "canción", "casá", "hotél"],
        c: [0, 1],
        x: "'Teléfono' tem força na antepenúltima sílaba, que sempre leva tilde. 'Canción' termina em n, mas a força está na última, então foge da regra e leva tilde. 'Casá' está errada, porque 'casa' termina em vogal com força na penúltima e não leva tilde. 'Hotél' também está errada, pois 'hotel' termina em consoante diferente de n e s com força na última, regra normal sem tilde."
      },
      {
        id: "e1q5", s: 1, t: "e1",
        e: "¿Cuál es la diferencia entre 'pero' y 'perro'? (Qual é a diferença entre 'pero' e 'perro'?)",
        o: ["perro lleva rr vibrante y significa cachorro", "pero lleva rr vibrante y significa cachorro", "son iguales", "perro es un toque simple"],
        c: [0],
        x: "'Perro' (cachorro) tem 'rr' com vibração múltipla, e 'pero' (mas) tem um 'r' de toque único. A alternativa que inverte, dizendo que 'pero' vibra e significa cachorro, troca os dois. Dizer que são iguais ignora que a diferença muda o sentido. Dizer que 'perro' tem toque simples contradiz a regra de que rr é vibrante. Só uma alternativa liga a vibração à palavra certa."
      },
      {
        id: "e1q6", s: 1, t: "e1",
        e: "Elige dos frases verdaderas sobre b y v. (Escolha duas)",
        o: ["La b y la v suenan igual.", "'Vaca' y 'baca' suenan igual.", "La v se pronuncia con los dientes en el labio.", "La b siempre suena distinta de la v."],
        c: [0, 1],
        x: "Em espanhol, b e v representam o mesmo som, então 'vaca' e 'baca' soam igual. Por isso as duas afirmações sobre igualdade estão certas. A frase sobre dentes no lábio descreve o 'v' do português, que não existe no espanhol. A frase dizendo que b e v soam diferentes é falsa e é justamente a interferência do português que se evita."
      },
      {
        id: "e1q7", s: 1, t: "e1",
        e: "En América Latina, ¿cómo suena 'zapato'? (Na América Latina, como soa 'zapato'?)",
        o: ["sapato, con z como s", "zapato, con z de 'zebra'", "tchapato", "thapato, como el th inglés en toda América"],
        c: [0],
        x: "Na América Latina, z e c antes de e/i soam como s (seseo), então 'zapato' soa 'sapato'. O z de 'zebra' não existe em espanhol, e é um traço de sotaque brasileiro. A opção 'tchapato' mistura com o som do ch, que não tem relação. O 'th' do inglês aparece na Espanha, mas não em toda a América, então não vale como regra geral para a América Latina."
      },
      {
        id: "e1q8", s: 1, t: "e1",
        e: "¿Cómo se dice @ en un correo electrónico? (Como se diz @ em um e-mail?)",
        o: ["arroba", "guion", "punto", "ñ"],
        c: [0],
        x: "O símbolo @ se diz 'arroba'. 'Punto' é o ponto final, usado em 'ana punto silva'. 'Guion' é o hífen, como em 'ana-silva'. A letra ñ (eñe) não é símbolo de e-mail. Memorizar arroba e punto é o mínimo para ditar um endereço, e é um vocabulário de uso diário no trabalho."
      },
      {
        id: "e1q9", s: 1, t: "e1",
        e: "Elige dos palabras donde la h no suena. (Escolha duas)",
        o: ["hola", "ahora", "chico", "jefe"],
        c: [0, 1],
        x: "Em 'hola' e 'ahora', a letra h é muda, então soam 'ola' e 'aora'. Em 'chico', o h faz parte do dígrafo ch, que soa como 'tch' de 'tchau', então o h não é uma letra muda ali. Em 'jefe' não há h; a letra j faz o som áspero. Por isso as duas corretas são as que têm h isolado, sem outra letra ao lado."
      },
      {
        id: "e1q10", s: 1, t: "e1",
        e: "¿Qué palabra lleva tilde? (Qual palavra leva tilde?)",
        o: ["inglés", "hotel", "joven", "casa"],
        c: [0],
        x: "'Inglés' tem força na última sílaba e termina em s; como a regra geral dá força na penúltima para quem termina em s, essa palavra foge e leva tilde. 'Hotel' tem força na última e termina em l, que é regra normal. 'Joven' termina em n e a força está na penúltima, regra normal. 'Casa' termina em vogal e a força está na penúltima, regra normal, sem tilde."
      },
      {
        id: "e1q11", s: 1, t: "e1",
        e: "Una persona dice: 'Se escribe con hache.' ¿Qué letra tiene la palabra? (Que letra tem a palavra?)",
        o: ["la letra h", "la letra ñ", "la letra j", "la letra y"],
        c: [0],
        x: "'Hache' é o nome da letra h, por isso a palavra tem h. O nome da letra ñ é 'eñe', o da letra j é 'jota' e o da letra y costuma ser 'ye' ou 'i griega'. Conhecer o nome das letras é essencial para soletrar nome e e-mail e para entender quando alguém soletra para você."
      },
      {
        id: "e1q12", s: 1, t: "e1",
        e: "¿Cuál es la pronunciación correcta de 'día' en español? (Qual é a pronúncia correta de 'día'?)",
        o: ["dí-a, con d seca", "djía, con dji", "tchía", "día, con a nasal"],
        c: [0],
        x: "Em espanhol, o d de 'día' não vira 'dj': soa como um d simples, 'dí-a'. A pronúncia 'dji' é uma interferência do português de muitas regiões e soa como portuñol. 'Tchía' troca o d por tch sem motivo. A vogal nasal também não existe em espanhol. Só a pronúncia com d seco e vogais puras está correta."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: vogais, j/ñ/rr e soletrar o e-mail",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "O ouvido brasileiro 'corrige' o espanhol sem avisar. Gravar e comparar mostra o que o ouvido não percebe enquanto você fala.",
      antes: "Ter lido a aula e anotado num papel as palavras: leche, trabajo, mañana, perro, pero, hola, vaca, día, zapato. Ter escrito seu nome e e-mail em letras. Escolher um lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste o ritmo ao seu.",
      passos: [
        { t: "Preparar a lista", p: "Tenha em mãos nove palavras (leche, trabajo, mañana, perro, pero, hola, vaca, día, zapato) e seu e-mail escrito letra a letra." },
        { t: "Ouvir e repetir", p: "Se possível, ouça cada palavra pronunciada por um falante em um dicionário ou vídeo que você já use, e repita em voz alta, devagar, cinco vezes cada uma, com atenção à vogal final e ao j, ñ e rr." },
        { t: "Gravar (2 a 3 min)", p: "Grave a lista inteira, depois seu nome e seu e-mail soletrados, usando 'arroba' e 'punto'." },
        { t: "Comparar", p: "Ouça a gravação procurando só quatro coisas: vogal final virando 'i', 'dji' em 'día', rr em 'perro' e z como s em 'zapato'." },
        { t: "Regravar", p: "Grave de novo a lista, corrigindo o que marcou, e termine dizendo '¿Cómo se escribe? Más despacio, por favor'." }
      ],
      verificar: "Nas regravações, pelo menos 7 das 9 palavras saem com vogal final limpa; 'perro' e 'pero' soam diferentes; 'día' sai sem 'dji'; você soletrou o e-mail inteiro sem pausa maior que dois segundos entre letras.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na próxima semana, se quiser.",
        "Anote em uma linha qual som mais escapou, para focar nele."
      ],
      erros: [
        { s: "Não escuto diferença entre pero e perro", c: "Ouvido ainda não treinado para a vibração.", r: "Exagere o rr por alguns dias, com a língua vibrando, e depois reduza. Grave só essas duas palavras." },
        { s: "Minha gravação soa igual à anterior", c: "Falar no mesmo ritmo sem foco numa coisa.", r: "Escolha um único som por gravação e ouça só esse." },
        { s: "Confundo o nome das letras ao soletrar", c: "Falta de prática com o alfabeto espanhol.", r: "Treine só as letras do seu nome e do domínio do e-mail por dois dias, devagar." }
      ]
    }
  };

  /* ===================== AULA 2 ===================== */
  C.dias[2] = {
    aula: {
      titulo: "Saludos, despedidas e apresentar-se",
      resumo: "Cumprimentar, despedir-se e se apresentar com 'Me llamo… / Soy de… / Trabajo como… / Tengo… años', escolher entre tú e usted e pedir que a pessoa repita ou fale mais devagar.",
      simples: {
        analogia: "Apresentar-se em espanhol é como preencher um cartão de visita com cinco campos fixos: nome, país, profissão, idade e uma cortesia. Cada campo tem uma frase-molde e você só troca a informação, como quem troca o papel dentro de uma moldura. O risco para o brasileiro é misturar os moldes com o português: escrever 'anos' sem o ñ de 'años', dizer 'Yo me chamo' em vez de 'me llamo', 'brasileira' em vez de 'brasileña' ou 'obrigada' em vez de 'gracias'. Soma-se a isso uma escolha social: falar com 'tú' (mais próximo) ou com 'usted' (mais formal), que muda a forma do verbo. Nesta aula você aprende os cinco moldes, a escolha tú ou usted e dois salva-vidas para quando não entender: pedir que repitam e que falem devagar.",
        pontos: [
          "Cumprimento muda com o horário: buenos días, buenas tardes, buenas noches (e 'hola' serve sempre).",
          "Molde de apresentação: Me llamo… / Soy de… / Trabajo como… / Tengo… años.",
          "Idade usa tener: 'tengo 30 años', nunca 'soy 30 años'.",
          "Tú é mais próximo e usted é mais formal; muda o verbo: ¿Cómo estás? / ¿Cómo está usted?",
          "Salva-vidas: '¿Puede repetir, por favor?' e 'Más despacio, por favor'."
        ],
        paraQueServe: "Se apresentar a colegas e recrutadores de países de língua espanhola com segurança e saber como pedir ajuda quando não entender."
      },
      glossario: [
        { t: "Tú", d: "Pronome de tratamento informal ('você', no sentido de pessoa próxima). Verbo na segunda pessoa: tienes, eres, estás." },
        { t: "Usted", d: "Pronome de tratamento formal. Usa o verbo na terceira pessoa: tiene, es, está. O plural é 'ustedes'." },
        { t: "Ustedes", d: "Plural de tratamento na América Latina, tanto formal quanto informal, com verbo na terceira pessoa do plural (tienen, son, están)." },
        { t: "Vosotros", d: "Plural informal usado na Espanha, com formas próprias do verbo (tenéis, sois, estáis). Na América Latina, usa-se 'ustedes'." },
        { t: "Voseo", d: "Uso de 'vos' no lugar de 'tú' em alguns lugares, como Argentina, Uruguai e partes da América Central, com formas como 'vos tenés'. Você vai ouvir e entender por contexto." },
        { t: "Tener", d: "Verbo 'ter'. Em espanhol serve para dizer a idade (tengo 30 años) e várias sensações (tengo hambre)." },
        { t: "Cortesía", d: "Palavras de educação: por favor, gracias, de nada, perdón, con permiso, mucho gusto." }
      ],
      blocos: [
        {
          t: "Saludos y despedidas",
          facil: "Traduzindo: 'hola' serve sempre; buenos días, buenas tardes e buenas noites mudam com o horário; adiós e hasta luego são as despedidas.",
          p: [
            "Regra geral, sem citação: 'Hola' funciona em qualquer momento e com qualquer pessoa. Para ser mais cuidadosa, use 'buenos días' de manhã, 'buenas tardes' à tarde e 'buenas noches' à noite (também para se despedir à noite). Note que em espanhol a forma mais geral é plural: 'buenos días'. 'Buen día' também existe e é comum em algumas regiões (como a Argentina), mas aqui usamos a forma plural, que é entendida em todo lugar.",
            "Para despedir-se: 'adiós' (tchau, mais definitivo), 'hasta luego' (até logo), 'hasta mañana' (até amanhã), 'hasta pronto' (até breve) e 'nos vemos' (a gente se vê). 'Chao' (ou 'chau') é informal e muito usado em muitos países da América Latina. Para desejar algo: 'que tengas un buen día' (tú) ou 'que tenga un buen día' (usted).",
            "Cortesias básicas: 'por favor', 'gracias' (obrigada; em espanhol não varia por gênero, ao contrário de 'obrigado/obrigada'), 'de nada' (de nada), 'perdón' (desculpe, para pedir desculpas ou chamar atenção), 'con permiso' (licença, para passar) e 'mucho gusto' (muito prazer; a pessoa responde 'igualmente')."
          ],
          tabela: {
            cab: ["Situação", "Espanhol", "Português"],
            linhas: [
              ["Qualquer hora", "Hola", "Oi"],
              ["Manhã", "Buenos días", "Bom dia"],
              ["Tarde", "Buenas tardes", "Boa tarde"],
              ["Noite", "Buenas noches", "Boa noite"],
              ["Despedida", "Hasta luego / Adiós / Nos vemos", "Até logo / Tchau / A gente se vê"],
              ["Agradecer", "Gracias / De nada", "Obrigada / De nada"]
            ]
          },
          dica: "Em espanhol, 'gracias' não muda de forma: você é 'obrigada' em português, mas 'gracias' em espanhol, seja quem for que fale."
        },
        {
          t: "Presentarse: nombre, país, profesión",
          facil: "Traduzindo: use 'Me llamo…' para o nome, 'Soy de…' para o país e 'Trabajo como…' ou 'Soy…' para a profissão.",
          p: [
            "Regra geral, sem citação: o molde mais comum para dizer o nome é 'Me llamo Ana' (literalmente 'eu me chamo Ana'). Também se diz 'Mi nombre es Ana' e, mais simples, 'Soy Ana'. Para perguntar: '¿Cómo te llamas?' (tú) ou '¿Cómo se llama usted?' (usted).",
            "Para dizer a origem: 'Soy de Brasil' e 'Soy brasileña' (gênero feminino) ou 'brasileño' (masculino). Atenção: em espanhol, nacionalidades se escrevem com letra minúscula e o adjetivo concorda com o gênero. Para perguntar: '¿De dónde eres?' (tú) ou '¿De dónde es usted?' (usted). Para dizer onde mora: 'Vivo en São Paulo'.",
            "Para a profissão, há duas formas: 'Soy ingeniera de datos' (ser + profissão, sem artigo) e 'Trabajo como ingeniera de datos'. Para dizer onde: 'Trabajo en una empresa de tecnología'. Perguntas: '¿A qué te dedicas?' (tú) ou '¿A qué se dedica usted?'. Fale seus idiomas com 'Hablo portugués, inglés y un poco de español'.",
            "Os pronomes 'yo', 'tú', 'él' normalmente são omitidos, porque o verbo já mostra quem fala: 'Soy Ana', não 'Yo soy Ana' (embora esta forma também seja correta quando se quer contrastar)."
          ],
          lista: [
            "Me llamo Ana. / Mi nombre es Ana. / Soy Ana.",
            "Soy de Brasil. / Soy brasileña.",
            "Vivo en São Paulo.",
            "Soy ingeniera de datos. / Trabajo como ingeniera de datos.",
            "Hablo portugués, inglés y un poco de español."
          ],
          dica: "Fale em sequência: nome, país, profissão, idade. Quatro frases curtas formam uma apresentação completa."
        },
        {
          t: "La edad con 'tener' y la pregunta de la edad",
          facil: "Traduzindo: em espanhol dizemos 'tengo 30 años' (eu tenho 30 anos); nunca 'soy 30 años' nem 'tengo 30 anos'.",
          p: [
            "Regra geral, sem citação: em espanhol a idade usa 'tener' (ter): 'tengo treinta años'. A palavra 'años' leva ñ: se você escreve 'anos' (parecido com o português), a palavra deixa de ser a correta. O português também usa 'ter' para idade, então a estrutura é familiar; o cuidado é com o ñ e com não usar 'ser' ('soy') por influência de outras línguas.",
            "A pergunta é '¿Cuántos años tienes?' (tú) ou '¿Cuántos años tiene usted?' (usted). A conjugação de 'tener' no presente: yo tengo, tú tienes, él/ella/usted tiene, nosotros tenemos, ustedes/ellos tienen. Em vosotros, tenéis; com voseo, 'vos tenés'. Esta nota sobre vosotros e vos é geral, sem citação.",
            "Outros usos de 'tener' que o brasileiro estranha: 'tengo hambre' (estou com fome), 'tengo sed' (estou com sede), 'tengo frío/calor', 'tengo prisa'. A lição 3 volta a isso quando comparamos ser e estar."
          ],
          tabela: {
            cab: ["Pessoa", "Tener", "Exemplo"],
            linhas: [
              ["yo", "tengo", "Tengo 30 años."],
              ["tú", "tienes", "¿Cuántos años tienes?"],
              ["él, ella, usted", "tiene", "¿Cuántos años tiene usted?"],
              ["nosotros/as", "tenemos", "Tenemos una reunión."],
              ["ustedes, ellos/as", "tienen", "Ustedes tienen razón."]
            ]
          },
          dica: "A idade é 'tener + número + años'. 'Soy 30 años' não é como se diz a idade em espanhol."
        },
        {
          t: "Tú o usted, ¿cómo estás? o ¿cómo está usted?",
          facil: "Traduzindo: tú é para pessoas próximas e usted para formalidade ou respeito; o verbo muda junto.",
          p: [
            "Regra geral, sem citação: em espanhol há duas formas de dizer 'você' no singular. 'Tú' é informal: amigos, colegas de mesma idade, ambientes descontraídos. 'Usted' é formal: pessoas mais velhas, clientes, primeiro contato em ambiente formal. A escolha varia entre países e empresas: em algumas regiões 'usted' é usado até em família, em outras 'tú' vale quase sempre. Na dúvida, comece com 'usted' e mude quando a pessoa disser 'puedes tutearme' (pode me chamar de tu).",
            "A forma do verbo muda com o tratamento: '¿Cómo estás?' (tú) e '¿Cómo está usted?' (usted); '¿De dónde eres?' e '¿De dónde es usted?'; '¿Puedes repetir?' e '¿Puede repetir?'. Perceba que usted usa o verbo na terceira pessoa, igual a 'él/ella'.",
            "Plural: na América Latina, 'ustedes' serve para formal e informal. Na Espanha, 'vosotros/as' é o plural informal. Em alguns países (Argentina, Uruguai), 'vos' substitui 'tú' em muitas situações ('vos sos', 'vos tenés'). Nota de dialeto, regra geral, sem citação: você vai ouvir essas formas; neste curso usamos tú, usted e ustedes."
          ],
          tabela: {
            cab: ["Pergunta", "Tú (informal)", "Usted (formal)"],
            linhas: [
              ["Como vai?", "¿Cómo estás?", "¿Cómo está usted?"],
              ["Seu nome?", "¿Cómo te llamas?", "¿Cómo se llama usted?"],
              ["De onde é?", "¿De dónde eres?", "¿De dónde es usted?"],
              ["Quantos anos?", "¿Cuántos años tienes?", "¿Cuántos años tiene usted?"],
              ["Pode repetir?", "¿Puedes repetir?", "¿Puede repetir?"]
            ]
          },
          dica: "Se não souber qual usar com alguém que acabou de conhecer, 'usted' costuma ser a escolha mais segura; depois, acompanhe o tratamento que a pessoa usar com você."
        },
        {
          t: "Pedir ayuda: repetir y hablar despacio",
          facil: "Traduzindo: '¿Puede repetir, por favor?' e 'Más despacio, por favor' são suas duas frases de segurança em qualquer conversa.",
          p: [
            "Regra geral, sem citação: quando não entender, não finja. Peça com educação: '¿Puede repetir, por favor?' (usted) ou '¿Puedes repetir?' (tú). Para pedir mais devagar: 'Más despacio, por favor'. Outras frases úteis: 'No entiendo' (não entendo), '¿Perdón?' (como?), '¿Cómo dice?' (o que disse?), '¿Cómo se escribe?' (como se escreve?), '¿Qué significa…?' (o que significa?) e '¿Cómo se dice … en español?'.",
            "Para avisar o nível: 'Hablo un poco de español' e 'Estoy aprendiendo'. Isso muda o ritmo do outro lado e costuma ser recebido com simpatia. Para confirmar: 'Entonces, ¿es lunes?' ou 'Entiendo, gracias'."
          ],
          lista: [
            "¿Puede repetir, por favor?",
            "Más despacio, por favor.",
            "No entiendo. ¿Cómo dice?",
            "¿Cómo se escribe? / ¿Qué significa…?",
            "Hablo un poco de español."
          ],
          dica: "Decore as duas primeiras frases como se fossem um só bloco; elas valem para qualquer situação, de entrevista a loja."
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: o português 'empurra' para erros previsíveis: 'anos' sem ñ, 'Yo me chamo', nacionalidade com final em -o ou -ira, 'obrigada' no lugar de gracias.",
          p: [
            "Erros comuns de falantes de português (interferência, sem estatística): 'tengo 30 anos' (a palavra é años, com ñ), 'Yo me chamo Ana' (certo: me llamo), 'soy brasileiro' dito por mulher (certo: brasileña), 'soy brasileira' (forma portuguesa) e 'obrigado/a' no lugar de 'gracias'. Outro erro, comum em quem vem de outras línguas, é 'soy 30 años' (certo: tengo 30 años).",
            "Também é comum dizer 'muito prazer' traduzindo literal ('muy placer'), quando o natural é 'mucho gusto' ('mucho placer' também se ouve); usar 'trabajo como una ingeniera' (certo: 'trabajo como ingeniera' ou 'soy ingeniera', sem artigo; 'trabajo de ingeniera' também é usado); e esquecer o ¿ no início da pergunta. Outra: preferir 'buen día' em tudo, quando 'buenos días' é a forma mais geral.",
            "Para treinar: escolha dois erros e crie uma frase certa para cada um. Repita em voz alta até a frase certa soar mais natural do que a errada."
          ],
          armadilha: "Antes de dizer a idade, lembre: é 'tengo', e 'años' leva ñ. Antes de dizer a nacionalidade, concorde o gênero: brasileña ou brasileño. Antes de agradecer, lembre: gracias, sem marcar gênero."
        },
        {
          t: "Onde esta aula se encaixa: nível A1",
          facil: "Traduzindo: A1 é o nível básico do quadro europeu; a meta aqui é comunicação simples, não perfeição.",
          p: [
            "A página do Instituto Cervantes sobre o MCER explica que o quadro de referência vai de A1, chamado de nível básico, até C2, e que a instituição baseia seus cursos e diplomas nele. Esta aula trata de itens de A1, o primeiro degrau.",
            "Isso significa que o objetivo agora é se fazer entender com frases curtas e corretas, e não falar sem erros. Erros de gênero, de artigo ou de som são normais nessa fase e fazem parte do caminho; o treino de voz alta e os cartões diários servem para reduzi-los aos poucos."
          ],
          dica: "Meta de A1: ser entendida em frases curtas. Corrija um erro por vez e comemore o que já sai natural.",
          fonte: FAQ
        }
      ],
      exemplo: {
        t: "Uma apresentação completa numa videochamada",
        texto: "Você entra numa reunião com colegas de outro país. Alguém diz: 'Buenas tardes. ¿Cómo está usted?' Você responde: 'Buenas tardes. Muy bien, gracias. ¿Y usted?' Depois se apresenta: 'Me llamo Ana. Soy de Brasil, soy brasileña. Vivo en São Paulo. Trabajo como ingeniera de datos en una empresa de tecnología. Tengo treinta años. Hablo portugués, inglés y un poco de español.' O colega fala rápido e você pede: '¿Puede repetir, por favor? Más despacio, por favor.' Ele repete com calma. No fim, você agradece e se despede: 'Mucho gusto. Hasta luego.' Repare que cada frase segue um molde, que a idade usa tener e que você escolheu usted porque era um primeiro contato."
      },
      prova: [
        "Videochamada: apresentar-se em quatro frases (nome, país, profissão, idade).",
        "Entrevista: responder '¿A qué se dedica?' e '¿De dónde es usted?' com usted.",
        "Chat com colega: perguntar '¿Cómo estás?' e '¿Cómo te llamas?' com tú.",
        "Qualquer conversa: pedir '¿Puede repetir, por favor?' sem entrar em pânico."
      ],
      explique: "Explique com as próprias palavras como se apresentar em espanhol (nome, país, profissão, idade) e a diferença entre tú e usted, com um exemplo de cada.",
      checagem: [
        "Como se diz a idade em espanhol e por que não se usa 'soy' com número?",
        "Qual é a diferença de verbo entre '¿Cómo estás?' e '¿Cómo está usted?'",
        "Que frases você usa para pedir que repitam e que falem devagar?"
      ]
    },
    fontes: [FAQ, DELE],
    cartoes: [
      { id: "e2c1", f: "Diga seu nome: 'eu me chamo Ana'.", v: "Me llamo Ana. Também: Mi nombre es Ana / Soy Ana.", t: "e2" },
      { id: "e2c2", f: "Diga: 'sou do Brasil' e 'sou brasileira'.", v: "Soy de Brasil. Soy brasileña. Nacionalidade concorda com o gênero.", t: "e2" },
      { id: "e2c3", f: "Diga: 'sou engenheira de dados'.", v: "Soy ingeniera de datos. Sem artigo antes da profissão.", t: "e2" },
      { id: "e2c4", f: "Diga: 'trabalho como engenheira de dados'.", v: "Trabajo como ingeniera de datos. Como + profissão.", t: "e2" },
      { id: "e2c5", f: "Diga: 'tenho 30 anos'.", v: "Tengo treinta años. Idade usa tener, nunca ser.", t: "e2" },
      { id: "e2c6", f: "Pergunte a um colega próximo quantos anos ele tem.", v: "¿Cuántos años tienes? Tú: verbo na segunda pessoa.", t: "e2" },
      { id: "e2c7", f: "Pergunte a um cliente (formal) de onde ele é.", v: "¿De dónde es usted? Usted: verbo na terceira pessoa.", t: "e2" },
      { id: "e2c8", f: "Cumprimente um colega de manhã, à tarde e à noite.", v: "Buenos días / Buenas tardes / Buenas noches. Hola serve sempre.", t: "e2" },
      { id: "e2c9", f: "Despeça-se até amanhã e até logo.", v: "Hasta mañana. / Hasta luego. Também: Nos vemos.", t: "e2" },
      { id: "e2c10", f: "Peça a alguém para repetir (formal).", v: "¿Puede repetir, por favor? Com tú: ¿Puedes repetir?", t: "e2" },
      { id: "e2c11", f: "Peça que falem mais devagar.", v: "Más despacio, por favor. Frase de segurança.", t: "e2" },
      { id: "e2c12", f: "Diga 'muito prazer' ao conhecer alguém.", v: "Mucho gusto. Resposta: Igualmente.", t: "e2" },
      { id: "e2c13", f: "Diga 'falo um pouco de espanhol'.", v: "Hablo un poco de español. Avisa seu nível com educação.", t: "e2" }
    ],
    questoes: [
      {
        id: "e2q1", s: 1, t: "e2",
        e: "¿Cómo dices 'eu tenho 30 anos' en español? (Como se diz 'eu tenho 30 anos' em espanhol?)",
        o: ["Tengo treinta años.", "Soy treinta años.", "Tengo treinta anos.", "Estoy treinta años."],
        c: [0],
        x: "Em espanhol a idade se diz com 'tener' e a palavra 'años' leva ñ. A frase com 'soy' usa o verbo errado para idade. A frase com 'anos' escreve a palavra sem ñ e muda o significado. A frase com 'estoy' também usa o verbo errado, porque 'estar' não expressa idade. Só a frase com 'tengo' e 'años' está certa."
      },
      {
        id: "e2q2", s: 1, t: "e2",
        e: "Una señora mayor es tu cliente. ¿Qué pregunta usas? (Uma senhora mais velha é sua cliente. Que pergunta você usa?)",
        o: ["¿Cómo está usted?", "¿Cómo estás?", "¿Cómo estáis?", "¿Qué tal, tío?"],
        c: [0],
        x: "Com uma cliente mais velha, a forma adequada é usted: '¿Cómo está usted?'. A forma '¿Cómo estás?' é de tú, informal. '¿Cómo estáis?' é plural informal da Espanha (vosotros), e não combina com uma só pessoa. '¿Qué tal, tío?' é uma saudação muito informal e não é apropriada para uma cliente."
      },
      {
        id: "e2q3", s: 1, t: "e2",
        e: "Elige dos frases correctas para decir tu profesión. (Escolha duas)",
        o: ["Soy ingeniera de datos.", "Trabajo como ingeniera de datos.", "Trabajo de una ingeniera.", "Tengo ingeniera de datos."],
        c: [0, 1],
        x: "Duas formas funcionam: 'soy' + profissão, sem artigo, e 'trabajo como' + profissão. A frase 'trabajo de una ingeniera' coloca um artigo que não cabe (a forma correta seria 'trabajo de ingeniera', sem artigo, mas ela não está entre as opções). A frase com 'tengo' usa o verbo de posse para algo que não se possui. Por isso só as duas primeiras são naturais e corretas."
      },
      {
        id: "e2q4", s: 1, t: "e2",
        e: "¿Cuál frase sirve para pedir que repitan? (Qual frase serve para pedir que repitam?)",
        o: ["¿Puede repetir, por favor?", "Hasta luego, gracias.", "Mucho gusto.", "Soy de Brasil."],
        c: [0],
        x: "'¿Puede repetir, por favor?' pede que a pessoa diga de novo, com educação, e é a frase de segurança da aula. 'Hasta luego, gracias' é uma despedida. 'Mucho gusto' é fórmula para cumprimentar ao conhecer alguém. 'Soy de Brasil' informa a origem. Nenhuma delas pede repetição."
      },
      {
        id: "e2q5", s: 1, t: "e2",
        e: "Una mujer brasileña dice su nacionalidad. ¿Cuál frase es correcta? (Uma mulher brasileira diz sua nacionalidade. Qual frase é correta?)",
        o: ["Soy brasileña.", "Soy brasileño.", "Soy Brasileña.", "Soy brasileira."],
        c: [0],
        x: "O adjetivo concorda com o gênero de quem fala: uma mulher diz 'brasileña'. A forma 'brasileño' é masculina. A forma com B maiúsculo viola a regra de que nacionalidades se escrevem em minúscula. A forma com 'brasileira' mantém a terminação do português e não existe em espanhol, é um erro comum de falantes de português."
      },
      {
        id: "e2q6", s: 1, t: "e2",
        e: "Elige dos despedidas. (Escolha duas)",
        o: ["Hasta luego", "Nos vemos", "Soy de Brasil", "¿Cómo te llamas?"],
        c: [0, 1],
        x: "'Hasta luego' e 'nos vemos' são despedidas. 'Soy de Brasil' informa a origem e '¿Cómo te llamas?' pergunta o nome; as duas são usadas no começo de uma conversa, não para encerrá-la. Por isso as duas corretas são as que sinalizam que a conversa está acabando."
      },
      {
        id: "e2q7", s: 1, t: "e2",
        e: "¿Qué frase pregunta el nombre a un amigo? (Que frase pergunta o nome a um amigo?)",
        o: ["¿Cómo te llamas?", "¿Cómo se llama usted?", "¿Cuántos años tienes?", "¿De dónde es usted?"],
        c: [0],
        x: "Com um amigo se usa tú, e '¿Cómo te llamas?' pergunta o nome nessa forma. '¿Cómo se llama usted?' pergunta o nome, mas em tratamento formal, que não combina com amigo. '¿Cuántos años tienes?' pergunta a idade, não o nome. '¿De dónde es usted?' pergunta a origem, também formal."
      },
      {
        id: "e2q8", s: 1, t: "e2",
        e: "¿Qué dices a las diez de la noche al llegar? (O que você diz às dez da noite ao chegar?)",
        o: ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta mañana"],
        c: [0],
        x: "À noite se cumprimenta com 'buenas noches'. 'Buenos días' é para a manhã. 'Buenas tardes' é para a tarde. 'Hasta mañana' é despedida, não cumprimento de chegada. Lembre que essas saudações ficam no plural: 'buenos días', 'buenas noches'."
      },
      {
        id: "e2q9", s: 1, t: "e2",
        e: "Elige dos errores comunes de brasileños que hablan español. (Escolha duas)",
        o: ["Tengo 30 anos.", "Yo me chamo Ana.", "Tengo 30 años.", "Me llamo Ana."],
        c: [0, 1],
        x: "'Tengo 30 anos' escreve 'años' sem o ñ, copiando o português. 'Yo me chamo Ana' mistura o português 'chamo' com o molde espanhol; o certo é 'me llamo'. 'Tengo 30 años' e 'me llamo Ana' são as formas corretas, por isso não são os erros pedidos. Os dois erros vêm de interferência do português."
      },
      {
        id: "e2q10", s: 1, t: "e2",
        e: "¿Cómo se dice 'muito prazer' al conocer a alguien? (Como se diz 'muito prazer' ao conhecer alguém?)",
        o: ["Mucho gusto.", "Muy placer.", "Mucho prazer.", "Muito gusto."],
        c: [0],
        x: "'Mucho gusto' é a forma natural em espanhol. 'Muy placer' é tradução literal e não é a forma usada ('mucho placer' também existe, mas não está entre as opções). 'Mucho prazer' mistura o 'mucho' espanhol com a palavra portuguesa 'prazer'. 'Muito gusto' mistura o 'muito' do português com o 'gusto' do espanhol. As duas últimas são exemplos de portuñol."
      },
      {
        id: "e2q11", s: 1, t: "e2",
        e: "En una reunión no entiendes. ¿Qué frase usas? (Numa reunião você não entende. Que frase usa?)",
        o: ["Más despacio, por favor.", "Hasta mañana.", "Soy de Brasil.", "Tengo hambre."],
        c: [0],
        x: "'Más despacio, por favor' pede que a pessoa fale mais devagar, o que resolve o problema. 'Hasta mañana' é despedida. 'Soy de Brasil' informa sua origem, o que não ajuda a entender. 'Tengo hambre' diz que você está com fome. Apenas a primeira frase corresponde à necessidade da situação."
      },
      {
        id: "e2q12", s: 1, t: "e2",
        e: "¿Cuál es la conjugación correcta? 'Ustedes ___ razón.' (Qual é a conjugação correta?)",
        o: ["tienen", "tienes", "tengo", "tenemos"],
        c: [0],
        x: "Com 'ustedes', o verbo vai para a terceira pessoa do plural: 'tienen'. 'Tienes' é a forma de tú, singular. 'Tengo' é de yo. 'Tenemos' é de nosotros. A concordância depende do sujeito, e 'ustedes' pede a forma de ellos."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: apresentação em 30 segundos",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Dizer o roteiro em voz alta transforma frases decoradas em frases automáticas, e a gravação mostra onde você ainda trava ou volta ao português.",
      antes: "Ter lido a aula e escrito num papel seus dados reais: nome, país, cidade, profissão, idade e idiomas. Escolher um lugar silencioso. Este roteiro não foi executado por quem escreveu a aula: ajuste o ritmo ao seu jeito.",
      passos: [
        { t: "Preparar", p: "Escreva seus dados em cinco linhas curtas (nome, país, profissão, idade, idiomas) e deixe à mão a lista de frases-modelo." },
        { t: "Ouvir e repetir", p: "Se tiver acesso a um áudio de apresentação em espanhol que você já use, ouça uma frase por vez e repita em voz alta, igual ao ritmo. Se não tiver, leia as frases-modelo em voz alta devagar, três vezes cada." },
        { t: "Gravar (1 a 2 min)", p: "Grave sua apresentação completa em tú e depois em usted, trocando só os verbos (¿Cómo estás? / ¿Cómo está usted?)." },
        { t: "Comparar", p: "Ouça e marque: idade com 'tengo'? nacionalidade no gênero certo? 'gracias' no lugar de 'obrigada'? Houve 'Yo me chamo' ou 'muito'?" },
        { t: "Regravar e treinar o pedido", p: "Regrave corrigindo e termine pedindo '¿Puede repetir, por favor?' e 'Más despacio, por favor' três vezes cada, em voz alta." }
      ],
      verificar: "Na regravação, a apresentação tem nome, país, profissão e idade; a idade usa 'tengo'; você usou usted e tú sem misturar os verbos na mesma frase; e disse as duas frases de segurança sem pausa longa.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na próxima aula, se quiser.",
        "Anote em uma linha qual frase mais travou."
      ],
      erros: [
        { s: "Misturo tú e usted na mesma frase", c: "Os verbos ficam parecidos e eu não escolho antes.", r: "Decida o tratamento antes de gravar e mantenha-o até o fim da gravação." },
        { s: "Digo 'Yo me chamo'", c: "Interferência do português.", r: "Troque por 'me llamo' e repita dez vezes, devagar, até soar natural." },
        { s: "Travo na idade", c: "Hesito entre 'soy' e 'tengo'.", r: "Escreva 'tengo + número + años' em um papel e leia em voz alta cinco vezes antes de regravar." }
      ]
    }
  };

  /* ===================== AULA 3 ===================== */
  C.dias[3] = {
    aula: {
      titulo: "Ser x estar (nível A1)",
      resumo: "Quando usar ser (identidade, profissão, origem, hora, data, características) e estar (estado, localização, ação em andamento), o que muda em relação ao português e o que não se traduz palavra por palavra (tener hambre, hace frío).",
      simples: {
        analogia: "Imagine duas etiquetas para colar nas coisas. A etiqueta 'ser' diz o que a coisa é: o nome, a profissão, de onde vem, que horas são, de que material é. É como o texto impresso no rótulo de uma garrafa. A etiqueta 'estar' diz como a coisa está agora e onde ela está: cheia, vazia, na mesa, na geladeira. É como um post-it colado por cima, que pode ser trocado a qualquer momento. O português também tem duas etiquetas, e isso ajuda; o problema é que algumas situações pedem outro verbo. Em português dizemos 'estou com fome' e 'está frio'; em espanhol dizemos 'tengo hambre' e 'hace frío'. Por isso, nesta aula você aprende as duas etiquetas e, principalmente, as expressões que não se traduzem palavra por palavra.",
        pontos: [
          "Ser: identidade, profissão, origem, nacionalidade, hora, data e características que definem.",
          "Estar: localização (onde algo ou alguém está) e estados que mudam (cansada, contente, ocupado).",
          "Ser + de: origem, material e posse (soy de Brasil, es de madera, es de Ana).",
          "Fome, sede, frio, calor, sono e pressa usam tener, não estar: tengo hambre.",
          "Tempo meteorológico usa hacer: hace frío, hace calor; para chuva, está lloviendo."
        ],
        paraQueServe: "Dizer quem você é, onde está e como está sem confundir os dois verbos, e evitar traduções palavra por palavra que soam estranhas."
      },
      glossario: [
        { t: "Ser", d: "Verbo que expressa identidade, origem, profissão, hora, data e características. Presente: soy, eres, es, somos, son." },
        { t: "Estar", d: "Verbo que expressa localização e estado. Presente: estoy, estás, está, estamos, están." },
        { t: "Estado", d: "Situação que pode mudar: estar cansada, estar contente, estar ocupado. Usa estar, não ser." },
        { t: "Localización", d: "Onde alguém ou algo está: estoy en casa, la oficina está en Lima. Usa estar." },
        { t: "Gerundio", d: "Forma em -ando/-iendo (trabajando, comiendo). Com estar, mostra ação em andamento: estoy trabajando." },
        { t: "Tener + sensação", d: "Expressões como tengo hambre, tengo sed, tengo frío. Em espanhol usa tener, não estar." },
        { t: "Hay", d: "Forma que diz que algo existe: hay un error. Não use 'está' para dizer que algo existe." }
      ],
      blocos: [
        {
          t: "Ser: o que algo ou alguém é",
          facil: "Traduzindo: ser serve para dizer quem você é, de onde é, a profissão, a hora, a data e o que define a pessoa ou a coisa.",
          p: [
            "Regra geral, sem citação: use ser para identidade ('Soy Ana'), profissão ('Soy ingeniera'), origem e nacionalidade ('Soy de Brasil', 'Soy brasileña'), hora ('Son las tres', 'Es la una'), data e dia ('Hoy es lunes'), material ('Es de madera') e posse ('Es de Ana'). Também serve para características que definem alguém ou algo: 'Ella es alta', 'El servidor es rápido', 'Mi equipo es pequeño'.",
            "O verbo ser no presente: yo soy, tú eres, él/ella/usted es, nosotros somos, ustedes/ellos son. Em vosotros: sois; com voseo, 'vos sos'. Nota de dialeto, regra geral, sem citação.",
            "O português também usa 'ser' nesses casos: 'sou engenheira', 'sou do Brasil', 'são três horas'. Por isso essa parte costuma ser fácil. O cuidado está em lembrar de dizer 'Son las tres' (plural) e 'Es la una' (singular), exatamente como em português."
          ],
          tabela: {
            cab: ["Uso", "Espanhol", "Português"],
            linhas: [
              ["Identidade", "Soy Ana.", "Eu sou a Ana."],
              ["Profissão", "Soy ingeniera.", "Sou engenheira."],
              ["Origem", "Soy de Brasil.", "Sou do Brasil."],
              ["Hora", "Son las tres.", "São três horas."],
              ["Data", "Hoy es lunes.", "Hoje é segunda."],
              ["Material", "Es de madera.", "É de madeira."]
            ]
          },
          dica: "Para ver se ser serve, pergunte: estou dizendo o que a coisa é ou de onde vem? Se sim, ser."
        },
        {
          t: "Estar: dónde y cómo está",
          facil: "Traduzindo: estar serve para dizer onde alguém ou algo está e como está agora (cansada, contente, ocupado).",
          p: [
            "Regra geral, sem citação: use estar para localização ('Estoy en casa', 'Lima está en Perú', 'La oficina está cerca') e para estados que podem mudar ('Estoy cansada', 'Está contento', 'Estamos ocupados'). Também se usa estar com gerundio para uma ação em andamento: 'Estoy trabajando', 'Estamos hablando'.",
            "O verbo estar no presente: yo estoy, tú estás, él/ella/usted está, nosotros estamos, ustedes/ellos están. Em vosotros: estáis; com voseo, 'vos estás'. Nota de dialeto, regra geral, sem citação.",
            "A comparação com o português é útil: em português dizemos 'estou em casa' e 'estou cansada', e em espanhol a lógica é a mesma. Por isso a maior diferença não está nos usos básicos, mas em frases que em português usam 'ficar', 'ter' ou 'estar com' e que em espanhol pedem outro verbo."
          ],
          tabela: {
            cab: ["Uso", "Espanhol", "Português"],
            linhas: [
              ["Localização", "Estoy en São Paulo.", "Estou em São Paulo."],
              ["Estado", "Estoy cansada.", "Estou cansada."],
              ["Estado do outro", "Está contento.", "Ele está contente."],
              ["Ação em andamento", "Estoy trabajando.", "Estou trabalhando."],
              ["Plural", "Estamos ocupados.", "Estamos ocupados."]
            ]
          },
          dica: "Se a frase responde 'onde?' ou 'como está agora?', use estar."
        },
        {
          t: "Ser x estar: o contraste com adjetivos",
          facil: "Traduzindo: o mesmo adjetivo pode mudar de sentido; com ser descreve a pessoa, com estar mostra um estado do momento.",
          p: [
            "Regra geral, sem citação: alguns adjetivos mudam de sentido conforme o verbo. 'Es aburrido' significa que a pessoa ou a coisa é chata; 'está aburrido' significa que ele está entediado agora. 'Es listo' diz que alguém é esperto; 'está listo' diz que está pronto. 'Es malo' diz que é ruim; 'está malo' costuma dizer que está doente ou que algo estragou.",
            "Esses exemplos são úteis, mas vão além do básico de A1; foque em ser para o que define e estar para o estado. Para a maioria dos adjetivos simples (alto, bajo, simpático, contento, cansado), a escolha segue a regra geral de definição versus estado.",
            "Atenção: eventos usam ser, não estar, para dizer onde acontecem: 'La reunión es en la sala 3', e não 'está en la sala 3'. Esse uso é de nível um pouco acima de A1 e aparece em regra geral, sem citação; guarde como curiosidade."
          ],
          lista: [
            "Es aburrido (é chato) / Está aburrido (está entediado)",
            "Es listo (é esperto) / Está listo (está pronto)",
            "Es malo (é ruim) / Está malo (está doente ou estragado)",
            "La reunión es en la sala 3. (evento: ser)"
          ],
          dica: "Se a mudança de sentido parecer difícil, escolha ser para definir e estar para estado, e pergunte a um falante quando tiver dúvida."
        },
        {
          t: "O que não se traduz palavra por palavra",
          facil: "Traduzindo: em espanhol, fome, sede, frio, calor, sono e pressa usam tener; o clima usa hacer; existir usa hay.",
          p: [
            "Regra geral, sem citação: em português dizemos 'estou com fome', 'estou com sede', 'estou com frio'. Em espanhol, a estrutura é 'tener + substantivo': 'tengo hambre', 'tengo sed', 'tengo frío', 'tengo calor', 'tengo sueño', 'tengo prisa', 'tengo miedo'. 'Estoy con hambre' é um calco do português: em algumas regiões da América se ouve 'estar con' + sensação, mas a forma-base e mais segura é 'tengo hambre'.",
            "Para o tempo, usa-se hacer: 'Hace frío', 'Hace calor', 'Hace sol', 'Hace viento'. Para chuva, 'Está lloviendo' (gerundio) ou 'Llueve'. Em português dizemos 'está frio' ou 'faz frio'; em espanhol, 'hace frío' é a forma natural.",
            "Para dizer que algo existe, usa-se 'hay' (há, tem): 'Hay un error', 'Hay una reunión', 'Hay tres tablas'. Já 'estar' fala de localização de algo específico: 'El error está en la línea 12', 'La reunión está en el calendario'. Em português, 'tem' faz o papel de 'hay' ('tem uma reunião'); então, ao ouvir 'tem', pense em 'hay'.",
            "Outras expressões úteis: 'estoy de acuerdo' (concordo; 'estou de acordo' também funciona em português) e 'es tarde' (é tarde; em português é comum dizer 'está tarde', mas em espanhol se usa ser)."
          ],
          tabela: {
            cab: ["Português", "Espanhol", "Calco do português (evite)"],
            linhas: [
              ["Estou com fome", "Tengo hambre", "Estoy con hambre"],
              ["Estou com frio", "Tengo frío", "Estoy con frío"],
              ["Faz calor", "Hace calor", "Está calor"],
              ["Tem um erro", "Hay un error", "Está un error"],
              ["Estou com sono", "Tengo sueño", "Estoy con sueño"]
            ]
          },
          dica: "Se a frase em português tem 'estou com + sensação', troque por 'tengo + sensação'."
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: os erros típicos vêm de trocar ser por estar, de traduzir 'estar com' e de usar 'está' para existência.",
          p: [
            "Erros comuns de falantes de português (interferência, sem estatística): 'Soy cansada' (certo: estoy cansada, é estado), 'Estoy de Brasil' (certo: soy de Brasil, é origem), 'Es en São Paulo' (certo: 'estoy en São Paulo' para a pessoa e 'está en São Paulo' para um lugar ou coisa), 'Estoy con hambre' (certo: tengo hambre), 'Está un error' (certo: hay un error), 'Tengo calor' dito sobre o clima (para o clima, 'hace calor'; 'tengo calor' é o que você sente).",
            "Outro erro é traduzir 'ficar' sempre do mesmo jeito: 'o escritório fica em Lima' é 'la oficina está en Lima' (localização), mas 'ficar em casa' é 'quedarse en casa' e 'ficar triste' (mudança) é 'ponerse triste'. O ponto é evitar a tradução palavra por palavra e usar as estruturas da aula.",
            "Para treinar: pegue cinco frases que você diria em português ('estou cansada', 'sou de São Paulo', 'estou com fome', 'tem um erro', 'o escritório fica em Lima') e converta para o espanhol usando a regra da etiqueta ser versus estar."
          ],
          armadilha: "Antes de dizer 'soy' ou 'estoy', faça duas perguntas: 'isso define ou é estado?' e 'estou falando de onde?'. Antes de dizer 'estoy con', troque por 'tengo'."
        },
        {
          t: "Onde esta aula se encaixa: nível A1",
          facil: "Traduzindo: A1 é o nível básico do quadro europeu; a meta aqui é comunicação simples, não perfeição.",
          p: [
            "A página do Instituto Cervantes sobre o MCER explica que o quadro de referência vai de A1, chamado de nível básico, até C2, e que a instituição baseia seus cursos e diplomas nele. Esta aula trata de itens de A1, o primeiro degrau.",
            "Isso significa que o objetivo agora é se fazer entender com frases curtas e corretas, e não falar sem erros. Erros de gênero, de artigo ou de som são normais nessa fase e fazem parte do caminho; o treino de voz alta e os cartões diários servem para reduzi-los aos poucos."
          ],
          dica: "Meta de A1: ser entendida em frases curtas. Corrija um erro por vez e comemore o que já sai natural.",
          fonte: FAQ
        }
      ],
      exemplo: {
        t: "Um dia de trabalho remoto",
        texto: "Ana está numa videochamada às nove da manhã. Ela diz: 'Buenos días. Soy Ana, soy ingeniera de datos y soy de Brasil. Ahora estoy en São Paulo, en casa. Hoy estoy un poco cansada porque tengo mucho trabajo, pero estoy contenta.' O colega pergunta: '¿Qué hora es allí?' Ela responde: 'Son las nueve. Hace calor aquí.' Ele pergunta: '¿Dónde está el informe?' Ela diz: 'El informe está en la carpeta compartida. Hay dos versiones.' Repare: ser para identidade, profissão, origem e hora; estar para lugar e estado; tener para a quantidade de trabalho; hacer para o clima; hay para existência."
      },
      prova: [
        "Apresentação: dizer quem é e de onde é com ser, e onde está agora com estar.",
        "Reunião: dizer '¿Dónde está el archivo?' e 'Hay un error en la tabla' sem trocar os verbos.",
        "Chat: responder '¿Cómo estás?' com 'Estoy bien' e '¿Qué hora es?' com 'Son las dos'.",
        "Conversa informal: dizer 'tengo hambre', 'tengo frío' e 'hace calor' sem traduzir literalmente."
      ],
      explique: "Explique com as próprias palavras a diferença entre ser e estar e dê um exemplo seu para cada uso, mais um exemplo de expressão com tener que não se traduz palavra por palavra.",
      checagem: [
        "Quando você usa ser e quando usa estar? Dê um exemplo de cada.",
        "Por que 'tengo hambre' é diferente de 'estoy con hambre'?",
        "Qual é a diferença entre 'hay' e 'está' para falar de algo no seu trabalho?"
      ]
    },
    fontes: [FAQ, DELE],
    cartoes: [
      { id: "e3c1", f: "Diga: 'sou engenheira de dados'.", v: "Soy ingeniera de datos. Profissão: ser.", t: "e3" },
      { id: "e3c2", f: "Diga: 'sou do Brasil'.", v: "Soy de Brasil. Origem: ser + de.", t: "e3" },
      { id: "e3c3", f: "Diga: 'estou em casa'.", v: "Estoy en casa. Localização: estar.", t: "e3" },
      { id: "e3c4", f: "Diga: 'estou cansada hoje'.", v: "Hoy estoy cansada. Estado: estar.", t: "e3" },
      { id: "e3c5", f: "Pergunte e responda a hora: 'são três horas'.", v: "¿Qué hora es? Son las tres. Hora: ser (Es la una).", t: "e3" },
      { id: "e3c6", f: "Diga: 'hoje é segunda'.", v: "Hoy es lunes. Dia e data: ser.", t: "e3" },
      { id: "e3c7", f: "Diga: 'o escritório fica em Lima'.", v: "La oficina está en Lima. Localização: estar.", t: "e3" },
      { id: "e3c8", f: "Diga: 'estou com fome'.", v: "Tengo hambre. Fome usa tener, não estar.", t: "e3" },
      { id: "e3c9", f: "Diga: 'estou com frio'.", v: "Tengo frío. Sensação: tener + substantivo.", t: "e3" },
      { id: "e3c10", f: "Diga: 'faz calor hoje'.", v: "Hoy hace calor. Clima: hacer.", t: "e3" },
      { id: "e3c11", f: "Diga: 'tem um erro na tabela'.", v: "Hay un error en la tabla. Existência: hay.", t: "e3" },
      { id: "e3c12", f: "Diga: 'o relatório está na pasta'.", v: "El informe está en la carpeta. Localização de algo específico: estar.", t: "e3" },
      { id: "e3c13", f: "Diga: 'estou trabalhando agora'.", v: "Estoy trabajando ahora. Estar + gerundio: ação em andamento.", t: "e3" }
    ],
    questoes: [
      {
        id: "e3q1", s: 1, t: "e3",
        e: "Elige la frase correcta: 'Yo ___ ingeniera de datos.' (Escolha a frase correta.)",
        o: ["soy", "estoy", "tengo", "hay"],
        c: [0],
        x: "Profissão usa ser: 'soy ingeniera de datos'. A forma 'estoy' indica estado ou lugar, o que não é o caso. 'Tengo' é para idade e sensações, não para profissão. 'Hay' é para existência de algo. Só 'soy' define a pessoa pela profissão."
      },
      {
        id: "e3q2", s: 1, t: "e3",
        e: "¿Cuál es correcta? 'La oficina ___ en Lima.' (Qual é correta?)",
        o: ["está", "es", "tiene", "hace"],
        c: [0],
        x: "Localização de algo usa estar: 'la oficina está en Lima'. 'Es' serviria para identidade ou característica, mas não para dizer onde fica. 'Tiene' é de posse. 'Hace' é de clima ou de fazer algo. Só 'está' responde à pergunta 'onde?'."
      },
      {
        id: "e3q3", s: 1, t: "e3",
        e: "Elige dos frases con la estructura estándar con 'tener'. (Escolha duas, com a estrutura-padrão com 'tener')",
        o: ["Tengo hambre.", "Tengo frío.", "Estoy con hambre.", "Estoy con frío."],
        c: [0, 1],
        x: "Fome e frio usam 'tener + substantivo' na forma-padrão: 'tengo hambre' e 'tengo frío'. As frases com 'estoy con' são calcos do português ('estou com'); em algumas regiões se ouve algo parecido, mas não é a estrutura-base ensinada aqui. Por isso as duas primeiras seguem a estrutura-padrão."
      },
      {
        id: "e3q4", s: 1, t: "e3",
        e: "¿Qué dices para decir de dónde eres? (O que você diz para dizer de onde é?)",
        o: ["Soy de Brasil.", "Estoy de Brasil.", "Tengo de Brasil.", "Hay de Brasil."],
        c: [0],
        x: "Origem usa ser + de: 'soy de Brasil'. 'Estoy de Brasil' mistura estar com a preposição de, o que não é usado para origem. 'Tengo de Brasil' e 'hay de Brasil' não fazem sentido nesse contexto. Só 'soy de' diz de onde você vem."
      },
      {
        id: "e3q5", s: 1, t: "e3",
        e: "¿Cuál frase dice 'tem um erro na tabela' (frase impessoal, sem sujeito)? (Qual frase diz isso?)",
        o: ["Hay un error en la tabla.", "Está un error en la tabla.", "Tiene un error en la tabla.", "Es un error en la tabla."],
        c: [0],
        x: "Para dizer que algo existe, usa-se 'hay': 'hay un error en la tabla'. 'Está un error' usa o verbo de localização para algo que ainda nem foi apontado. 'Tiene un error en la tabla' pode servir se a tabela for o sujeito, mas não corresponde a 'tem um erro' impessoal. 'Es un error' classifica algo como erro, não indica a existência."
      },
      {
        id: "e3q6", s: 1, t: "e3",
        e: "Elige dos frases correctas sobre la hora y la fecha. (Escolha duas)",
        o: ["Son las tres.", "Hoy es lunes.", "Hoy está lunes.", "Están las tres."],
        c: [0, 1],
        x: "Hora e dia usam ser: 'son las tres' (plural, como 'são três horas') e 'hoy es lunes'. As frases com 'está' e 'están' usam o verbo de estado e não servem para hora nem data. Por isso só as duas com ser estão corretas."
      },
      {
        id: "e3q7", s: 1, t: "e3",
        e: "¿Qué frase es correcta para un estado temporal? (Que frase é correta para um estado temporal?)",
        o: ["Estoy cansada hoy.", "Soy cansada hoy.", "Tengo cansada hoy.", "Hay cansada hoy."],
        c: [0],
        x: "Estado temporal usa estar: 'estoy cansada hoy'. A forma com 'soy' sugere que o cansaço é uma característica permanente, o que não faz sentido com 'hoy'. 'Tengo cansada' e 'hay cansada' não existem como estruturas. Só 'estoy' combina com o estado do momento."
      },
      {
        id: "e3q8", s: 1, t: "e3",
        e: "¿Cómo se dice 'faz calor'? (Como se diz 'faz calor'?)",
        o: ["Hace calor.", "Está calor.", "Es calor.", "Tiene calor."],
        c: [0],
        x: "Para o clima usa-se 'hacer': 'hace calor'. 'Está calor' e 'es calor' são traduções do português que não funcionam no espanhol. 'Tiene calor' diz que uma pessoa sente calor, não que o tempo está quente. A forma com 'hace' é a natural para o clima."
      },
      {
        id: "e3q9", s: 1, t: "e3",
        e: "Elige dos frases que un brasileño puede decir por calco del portugués y que no son la forma estándar. (Escolha duas)",
        o: ["Estoy con hambre.", "Soy cansada.", "Tengo hambre.", "Estoy cansada."],
        c: [0, 1],
        x: "'Estoy con hambre' traduz literalmente 'estou com fome', mas a forma-padrão em espanhol é 'tengo hambre'. 'Soy cansada' usa ser para um estado, quando o correto é 'estoy cansada'. 'Tengo hambre' e 'estoy cansada' são as formas corretas. Os dois erros vêm da tradução palavra por palavra do português."
      },
      {
        id: "e3q10", s: 1, t: "e3",
        e: "¿Cuál significa 'está pronto'? (Qual significa 'está pronto'?)",
        o: ["Está listo.", "Es listo.", "Hay listo.", "Tiene listo."],
        c: [0],
        x: "Com estar, 'listo' significa 'pronto' no momento: 'está listo'. Com ser, 'es listo' significa 'é esperto'. 'Hay listo' e 'tiene listo' não formam a ideia de estar pronto sozinhas. É um exemplo de adjetivo que muda de sentido com ser ou estar."
      },
      {
        id: "e3q11", s: 1, t: "e3",
        e: "¿Qué frase dice dónde está un archivo? (Que frase diz onde está um arquivo?)",
        o: ["El archivo está en la carpeta.", "El archivo es en la carpeta.", "El archivo hay en la carpeta.", "El archivo tiene en la carpeta."],
        c: [0],
        x: "Localização de algo específico usa estar: 'el archivo está en la carpeta'. 'Es en la carpeta' usa ser, que não serve para localizar objetos. 'Hay' não se combina com um sujeito definido como 'el archivo'. 'Tiene en la carpeta' não localiza nada."
      },
      {
        id: "e3q12", s: 1, t: "e3",
        e: "Saludas a un amigo: '¿Cómo ___?' (Você cumprimenta um amigo: 'Como ___?')",
        o: ["estás", "eres", "tienes", "hay"],
        c: [0],
        x: "Para perguntar como a pessoa está agora, usa-se estar: '¿cómo estás?'. 'Eres' pergunta quem a pessoa é, como em '¿cómo eres?', que pede uma descrição. 'Tienes' é de posse ou idade. 'Hay' é existência. Só 'estás' pergunta pelo estado do momento."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: onde estou, quem sou, como estou",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "Escolher entre ser e estar depende de hábito. Falar em voz alta cria o hábito mais rápido do que só ler, e a gravação mostra quando você troca os verbos.",
      antes: "Ter lido a aula e escrito num papel dez frases suas: cinco com ser (nome, profissão, origem, hora, dia) e cinco com estar ou tener (lugar, estado, fome, frio). Este roteiro não foi executado por quem escreveu a aula: ajuste as frases à sua vida.",
      passos: [
        { t: "Preparar", p: "Escreva as dez frases em duas colunas: ser e estar/tener. Deixe um espaço para anotar erros depois." },
        { t: "Ouvir e repetir", p: "Se tiver um áudio em espanhol que você já use, ouça frases com ser e estar e repita em voz alta. Se não tiver, leia as suas frases em voz alta três vezes cada, devagar." },
        { t: "Gravar (2 a 3 min)", p: "Grave as dez frases em ordem aleatória, sem olhar a coluna, só olhando o português que você escreveu ao lado." },
        { t: "Comparar", p: "Ouça e marque: ser onde devia ser, estar onde devia ser, tengo no lugar de 'estoy con', hay no lugar de 'está un'." },
        { t: "Regravar", p: "Regrave corrigindo e termine com três frases livres: onde você está agora, como você está e que hora é." }
      ],
      verificar: "Na regravação, as dez frases usam o verbo certo em pelo menos 8 casos; você disse 'tengo hambre' e 'hace calor' sem 'estoy con' e 'está calor'; e respondeu '¿Dónde estás?' e '¿Cómo estás?' em voz alta.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na próxima aula, se quiser.",
        "Anote em uma linha qual verbo você mais trocou."
      ],
      erros: [
        { s: "Troco ser por estar sem perceber", c: "Falar rápido sem escolher a etiqueta.", r: "Antes de cada frase, diga em pensamento 'define ou estado?' e depois fale." },
        { s: "Continuo dizendo 'estoy con hambre'", c: "Hábito do português.", r: "Escreva 'tengo + sensação' e repita dez vezes com hambre, sed, frío, calor e sueño." },
        { s: "Não sei se acertei", c: "Falta de critério para ouvir.", r: "Ouça uma coisa por vez: primeiro os verbos de ser, depois os de estar, depois os de tener." }
      ]
    }
  };

  /* ===================== AULA 4 ===================== */
  C.dias[4] = {
    aula: {
      titulo: "Artigos, gênero e número",
      resumo: "El, la, los, las, un, una, unos, unas; regras de plural; palavras que mudam de gênero em relação ao português (el color, la leche, la sangre, el puente); concordância com adjetivos e as contrações al e del.",
      simples: {
        analogia: "Pense nos substantivos como crachás num evento: cada um chega com uma cor, azul (masculino) ou rosa (feminino), e todo mundo que anda perto dele tem de usar a mesma cor. O artigo é o primeiro acompanhante, e o adjetivo vem logo atrás, também com a cor do crachá: 'el libro nuevo', 'la casa nueva'. O português usa o mesmo sistema, e isso ajuda muito, porque na maioria das palavras a cor coincide ('el problema' e 'o problema', 'la ciudad' e 'a cidade'). O perigo está nas palavras em que o crachá mudou de cor na travessia: 'a cor' vira 'el color', 'o leite' vira 'la leche', 'o sangue' vira 'la sangre', 'a ponte' vira 'el puente'. Nesta aula você aprende os artigos, o plural, essas diferenças e as duas contrações que o espanhol tem: al e del.",
        pontos: [
          "Artigos definidos: el, la, los, las; indefinidos: un, una, unos, unas.",
          "Plural: vogal + s (libro, libros); consoante + es (ciudad, ciudades); z vira c (lápiz, lápices).",
          "Palavras que mudam de gênero em relação ao português: el color, la leche, la sangre, el puente.",
          "O adjetivo concorda em gênero e número: la casa nueva, los libros nuevos.",
          "Contrações: a + el = al; de + el = del; o espanhol não tem 'no', 'na', 'pelo', 'dele'."
        ],
        paraQueServe: "Falar e escrever frases como 'el servidor nuevo' ou 'la leche fría' sem errar o gênero e sem traduzir contrações do português como 'no' ou 'dele'."
      },
      glossario: [
        { t: "Artículo definido", d: "El, la, los, las: indicam algo conhecido ou específico. Correspondem a o, a, os, as." },
        { t: "Artículo indefinido", d: "Un, una, unos, unas: indicam algo não específico. Correspondem a um, uma, uns, umas." },
        { t: "Género", d: "Classificação do substantivo em masculino ou feminino. Em espanhol, não coincide sempre com o português." },
        { t: "Concordancia", d: "O artigo e o adjetivo combinam em gênero e número com o substantivo: la casa nueva." },
        { t: "Contracción", d: "Fusão de preposição e artigo. O espanhol só tem duas: a + el = al e de + el = del." },
        { t: "Plural", d: "Forma que indica mais de um. Em espanhol, termina em -s ou -es (libros, ciudades)." },
        { t: "Falso amigo de gênero", d: "Palavra parecida nas duas línguas, mas com gênero diferente: el color (m) e a cor (f); la leche (f) e o leite (m)." }
      ],
      blocos: [
        {
          t: "Artículos: el, la, los, las, un, una",
          facil: "Traduzindo: el e la são o e a; los e las são os e as; un e una são um e uma.",
          p: [
            "Regra geral, sem citação: os artigos definidos são el (masculino singular), la (feminino singular), los (masculino plural) e las (feminino plural). Os indefinidos são un, una, unos e unas. Eles combinam com o substantivo: 'el libro', 'la casa', 'los libros', 'las casas'; 'un libro', 'una casa', 'unos libros', 'unas casas'.",
            "O uso é parecido com o português, mas há dois pontos que o brasileiro estranha. Primeiro, com possessivos o espanhol não usa artigo: 'mi equipo', e não 'el mi equipo'. Segundo, com idiomas depois de verbos como hablar o artigo some: 'hablo español', mas 'el español es fácil'. Também se diz 'el lunes' (na segunda) e 'los lunes' (às segundas).",
            "Uma exceção de som: antes de substantivo feminino singular que começa com 'a' tônico, usa-se 'el': 'el agua fría' (o adjetivo continua feminino) e 'las aguas'. Essa regra é de nível um pouco acima de A1; guarde como curiosidade."
          ],
          tabela: {
            cab: ["Gênero e número", "Definido", "Indefinido"],
            linhas: [
              ["Masculino singular", "el libro", "un libro"],
              ["Feminino singular", "la casa", "una casa"],
              ["Masculino plural", "los libros", "unos libros"],
              ["Feminino plural", "las casas", "unas casas"]
            ]
          },
          dica: "Com mi, tu, su, nuestro: sem artigo antes. 'Mi equipo', 'su correo'."
        },
        {
          t: "Gênero: dicas de terminação",
          facil: "Traduzindo: -o costuma ser masculino e -a feminino; -ción, -dad e -tad costumam ser feminino; -aje costuma ser masculino.",
          p: [
            "Regra geral, sem citação: a maioria dos substantivos terminados em -o é masculina ('el dato', 'el archivo', 'el código') e a maioria dos terminados em -a é feminina ('la tabla', 'la nube', 'la pantalla'). Terminações em -ción, -sión, -dad, -tad e -tud são em geral femininas ('la reunión', 'la ciudad', 'la verdad'). Terminações em -aje são em geral masculinas ('el mensaje', 'el lenguaje', 'el viaje').",
            "Há exceções que valem decorar: 'el día', 'el mapa', 'el problema', 'el programa', 'el idioma' e 'el tema' são masculinas apesar do -a; 'la mano', 'la foto' e 'la moto' são femininas apesar do -o (foto e moto são formas curtas de fotografía e motocicleta). Terminações em -e ou consoante precisam ser aprendidas com o artigo: 'el servidor', 'la red', 'el sistema', 'la base de datos'.",
            "Para trabalho: el correo, el archivo, el informe, el error, el equipo (masculinos); la contraseña, la nube, la tabla, la reunión, la pantalla (femininos). Aprenda a palavra sempre junto com o artigo, como se fosse uma única peça."
          ],
          lista: [
            "-o: el dato, el archivo, el código",
            "-a: la tabla, la nube, la pantalla",
            "-ción, -dad: la reunión, la ciudad",
            "-aje: el mensaje, el viaje, el lenguaje",
            "Exceções: el día, el mapa, el problema, la mano"
          ],
          dica: "Decore o substantivo com o artigo: não 'nube', mas 'la nube'. Assim o gênero vem junto."
        },
        {
          t: "Palavras que mudam de gênero em relação ao português",
          facil: "Traduzindo: algumas palavras parecidas têm gênero diferente: a cor é el color, o leite é la leche, o sangue é la sangre, a ponte é el puente.",
          p: [
            "Aviso importante: nenhuma página oficial foi aberta nesta redação para confirmar esta lista; ela é uma regra geral, sem citação. Confira no dicionário (dle.rae.es) quando tiver dúvida. Os exemplos abaixo são palavras de uso muito comum.",
            "Palavras masculinas em espanhol e femininas em português: 'el color' (a cor), 'el puente' (a ponte), 'el viaje' (a viagem), 'el mensaje' (a mensagem), 'el paisaje' (a paisagem), 'el árbol' (a árvore). Palavras femininas em espanhol e masculinas em português: 'la leche' (o leite), 'la sangre' (o sangue), 'la sal' (o sal), 'la nariz' (o nariz), 'la miel' (o mel), 'la costumbre' (o costume), 'la señal' (o sinal).",
            "A terminação ajuda: -aje em espanhol é em geral masculino, e -agem em português é feminino ('el viaje' e 'a viagem', 'el mensaje' e 'a mensagem'). Assim, uma única regra cobre várias palavras.",
            "Para treinar, use frases completas: 'el color rojo', 'la leche fría', 'la sangre es roja', 'el puente es largo'."
          ],
          tabela: {
            cab: ["Espanhol", "Português", "Diferença"],
            linhas: [
              ["el color", "a cor", "m x f"],
              ["el puente", "a ponte", "m x f"],
              ["el viaje", "a viagem", "m x f"],
              ["la leche", "o leite", "f x m"],
              ["la sangre", "o sangue", "f x m"],
              ["la sal", "o sal", "f x m"]
            ]
          },
          dica: "Use as frases completas como 'molde': 'el color rojo', 'la leche fría'. O ouvido aprende o gênero junto com o adjetivo."
        },
        {
          t: "Plural e concordância com o adjetivo",
          facil: "Traduzindo: vogal ganha s, consoante ganha es, z vira c; o adjetivo muda junto com o substantivo.",
          p: [
            "Regra geral, sem citação: para formar o plural, acrescente -s a palavras terminadas em vogal ('libro, libros'; 'casa, casas'; 'base, bases') e -es às terminadas em consoante ('ciudad, ciudades'; 'reunión, reuniones' sem tilde; 'servidor, servidores'). Palavras em -z trocam z por c: 'lápiz, lápices', 'vez, veces'. Palavras terminadas em -s, cuja última sílaba não é a mais forte, não mudam: 'el lunes, los lunes'; 'la crisis, las crisis'.",
            "O adjetivo concorda em gênero e número: 'el libro nuevo', 'la casa nueva', 'los libros nuevos', 'las casas nuevas'. Muitos adjetivos terminados em -e ou consoante têm uma só forma para os dois gêneros no singular: 'grande, fácil, azul' ('el servidor grande', 'la tabla grande', 'la tabla fácil'). Há exceções: nacionalidades em consoante e adjetivos em -or, como 'trabajador, trabajadora'. No plural, acrescentam -s ou -es: 'grandes, fáciles, azules'.",
            "Nacionalidades que terminam em consoante acrescentam -a no feminino: 'español, española'; 'alemán, alemana'; 'inglés, inglesa' (a tilde da última sílaba desaparece no feminino). Em 'brasileño, brasileña', o -o muda para -a. Palavras terminadas em -ista têm forma única: 'el analista, la analista'. Em geral, o adjetivo vem depois do substantivo: 'un servidor rápido', 'una tabla grande'."
          ],
          tabela: {
            cab: ["Singular", "Plural", "Regra"],
            linhas: [
              ["libro", "libros", "vogal + s"],
              ["ciudad", "ciudades", "consoante + es"],
              ["lápiz", "lápices", "z vira c + es"],
              ["lunes", "lunes", "termina em -s e a última sílaba é fraca: igual"],
              ["canción", "canciones", "perde a tilde"],
              ["grande", "grandes", "adjetivo em -e: só muda o plural"]
            ]
          },
          dica: "Confira a cadeia inteira: artigo, substantivo e adjetivo combinam em gênero e número ('las tablas nuevas')."
        },
        {
          t: "Contrações: al e del",
          facil: "Traduzindo: o espanhol só junta duas coisas: a + el = al e de + el = del; todo o resto fica separado: en el, con el, por el.",
          p: [
            "Regra geral, sem citação: em espanhol só existem duas contrações: 'a + el = al' e 'de + el = del'. 'Voy al banco', 'Soy del equipo de datos', 'Vengo del trabajo'. Elas só acontecem com 'el' artigo. Com o pronome 'él' (com tilde) não há contração: 'Hablo de él'.",
            "Isso é muito diferente do português, que contrai muito: no, na, num, pelo, dele, nela, àquele e outras. Em espanhol, essas combinações ficam separadas: 'en el' (no), 'en la' (na), 'por el' (pelo), 'de él' (dele), 'en ella' (nela). Escrever 'enel' ou 'no equipo' no lugar de 'en el equipo' estaria errado.",
            "Com 'la', 'los' e 'las' não há contração: 'a la oficina', 'de la empresa', 'a los clientes', 'de las tablas'. A contração acontece apenas com a combinação a + el e de + el."
          ],
          tabela: {
            cab: ["Português", "Espanhol", "Observação"],
            linhas: [
              ["ao banco", "al banco", "a + el = al"],
              ["do time", "del equipo", "de + el = del"],
              ["no banco", "en el banco", "sem contração"],
              ["pelo sistema", "por el sistema", "sem contração"],
              ["dele", "de él", "sem contração; él leva tilde"],
              ["na empresa", "en la empresa", "sem contração"]
            ]
          },
          dica: "Só a e de contraem com el. Para todas as outras preposições, separe: en el, con el, por el."
        },
        {
          t: "Armadilhas de brasileiro",
          facil: "Traduzindo: os erros típicos são copiar o gênero do português, contrair como em português e pôr artigo antes do possessivo.",
          p: [
            "Erros comuns de falantes de português (interferência, sem estatística): 'la color' e 'el leche' (certo: el color, la leche), 'la puente' e 'el sangre' (certo: el puente, la sangre), 'en el' escrito como 'no' ('no equipo', certo: en el equipo), 'dele' em vez de 'de él', 'el mi equipo' no lugar de 'mi equipo' e 'las problemas' ou 'los problemas grande' com concordância errada.",
            "Outro erro é esquecer o plural em palavras terminadas em consoante ('las ciudad' no lugar de 'las ciudades') e em adjetivos ('los servidores rápido' no lugar de 'los servidores rápidos').",
            "Para treinar, escolha duas palavras por semana, de preferência do seu trabalho (el servidor, la base de datos), e diga a frase completa no singular e no plural."
          ],
          armadilha: "Antes de falar, confira três coisas: o gênero da palavra (ouça o artigo), se ele muda em relação ao português e se a cadeia artigo + adjetivo concorda. Nunca contraia 'en el' ou 'por el'."
        },
        {
          t: "Onde esta aula se encaixa: nível A1",
          facil: "Traduzindo: A1 é o nível básico do quadro europeu; a meta aqui é comunicação simples, não perfeição.",
          p: [
            "A página do Instituto Cervantes sobre o MCER explica que o quadro de referência vai de A1, chamado de nível básico, até C2, e que a instituição baseia seus cursos e diplomas nele. Esta aula trata de itens de A1, o primeiro degrau.",
            "Isso significa que o objetivo agora é se fazer entender com frases curtas e corretas, e não falar sem erros. Erros de gênero, de artigo ou de som são normais nessa fase e fazem parte do caminho; o treino de voz alta e os cartões diários servem para reduzi-los aos poucos."
          ],
          dica: "Meta de A1: ser entendida em frases curtas. Corrija um erro por vez e comemore o que já sai natural.",
          fonte: FAQ
        }
      ],
      exemplo: {
        t: "Descrever um problema no trabalho",
        texto: "Ana escreve numa mensagem: 'Hola equipo. Hay un problema con el servidor nuevo y con las tablas grandes. El mensaje del sistema dice que la conexión es lenta. Voy al banco de datos para ver la base de datos. Los informes están en la carpeta del proyecto. Los lunes revisamos los errores y las contraseñas. Mi jefa dice que la solución es fácil.' Repare nos artigos e no gênero: 'el servidor', 'la conexión', 'el mensaje', 'las tablas', 'los informes'. Veja as contrações: 'del sistema', 'del proyecto', 'al banco'. Note que 'mi jefa' não leva artigo e que 'los lunes' não muda no plural."
      },
      prova: [
        "Mensagem de trabalho: escrever 'el servidor nuevo' e 'la tabla grande' com artigo e adjetivo concordando.",
        "Reunião: dizer 'voy al banco de datos' e 'el informe del equipo' com contração correta.",
        "Cardápio ou loja: pedir 'la leche' e 'el color rojo' sem trocar o gênero.",
        "Escrita: pluralizar 'ciudad', 'lápiz' e 'canción' com a regra certa."
      ],
      explique: "Explique com as próprias palavras como formar o plural em espanhol, quais palavras mudam de gênero em relação ao português e quando se usa al e del.",
      checagem: [
        "Quais são os artigos definidos e indefinidos e como combinam com o substantivo?",
        "Dê três palavras que mudam de gênero em relação ao português.",
        "Quando se usa al e del? Por que 'en el' não vira 'no'?"
      ]
    },
    fontes: [FAQ, DELE],
    cartoes: [
      { id: "e4c1", f: "Diga 'o livro' e 'a casa' em espanhol.", v: "el libro, la casa. El é masculino, la é feminino.", t: "e4" },
      { id: "e4c2", f: "Diga 'os livros' e 'as casas'.", v: "los libros, las casas. Plural: los e las; substantivo + s.", t: "e4" },
      { id: "e4c3", f: "Diga 'um livro' e 'uma casa'.", v: "un libro, una casa. Un é masculino, una é feminino.", t: "e4" },
      { id: "e4c4", f: "Diga 'a cor' em espanhol.", v: "el color. Muda de gênero: é masculino em espanhol.", t: "e4" },
      { id: "e4c5", f: "Diga 'o leite' em espanhol.", v: "la leche. Muda de gênero: é feminino em espanhol.", t: "e4" },
      { id: "e4c6", f: "Diga 'o sangue' e 'a ponte'.", v: "la sangre, el puente. Os dois mudam de gênero.", t: "e4" },
      { id: "e4c7", f: "Diga 'a mensagem' e 'a viagem'.", v: "el mensaje, el viaje. -aje é masculino; em português -agem é feminino.", t: "e4" },
      { id: "e4c8", f: "Faça o plural de 'ciudad'.", v: "ciudades. Consoante + es.", t: "e4" },
      { id: "e4c9", f: "Faça o plural de 'lápiz'.", v: "lápices. Z vira c + es.", t: "e4" },
      { id: "e4c10", f: "Diga 'o servidor novo' e 'a tabela nova'.", v: "el servidor nuevo, la tabla nueva. Adjetivo concorda em gênero.", t: "e4" },
      { id: "e4c11", f: "Diga 'vou ao banco' e 'sou do time'.", v: "Voy al banco. Soy del equipo (time). a + el = al; de + el = del.", t: "e4" },
      { id: "e4c12", f: "Diga 'no banco' e 'pelo sistema'.", v: "en el banco, por el sistema. Não contraem.", t: "e4" },
      { id: "e4c13", f: "Diga 'minha equipe' em espanhol.", v: "mi equipo. Sem artigo antes do possessivo.", t: "e4" }
    ],
    questoes: [
      {
        id: "e4q1", s: 1, t: "e4",
        e: "¿Cuál artículo va con 'color'? (Qual artigo vai com 'color'?)",
        o: ["el color", "la color", "los color", "una color"],
        c: [0],
        x: "Em espanhol, 'color' é masculino, então leva 'el', ao contrário do português 'a cor'. A forma 'la color' copia o gênero do português e é erro comum. 'Los color' usa artigo plural masculino com substantivo no singular. 'Una color' também usa o gênero feminino. Só 'el color' está correto."
      },
      {
        id: "e4q2", s: 1, t: "e4",
        e: "¿Cuál es correcta? '___ leche está fría.' (Qual é correta?)",
        o: ["La", "El", "Los", "Un"],
        c: [0],
        x: "Em espanhol, 'leche' é feminino, então usa 'la leche'. A forma 'el leche' copia o gênero do português ('o leite'). 'Los' é plural masculino, e 'un' é indefinido masculino, que não combina com a frase definida. Só 'la' acompanha 'leche' no singular definido."
      },
      {
        id: "e4q3", s: 1, t: "e4",
        e: "Elige dos palabras que cambian de género respecto al portugués. (Escolha duas)",
        o: ["el color", "la sangre", "el problema", "la casa"],
        c: [0, 1],
        x: "'El color' (a cor, feminino em português) e 'la sangre' (o sangue, masculino em português) mudam de gênero. 'El problema' é masculino nas duas línguas, e 'la casa' é feminino nas duas. Por isso essas duas últimas não são exemplos de mudança de gênero."
      },
      {
        id: "e4q4", s: 1, t: "e4",
        e: "¿Cómo se dice 'a ponte' en español? (Como se diz 'a ponte' em espanhol?)",
        o: ["el puente", "la puente", "los puente", "una puente"],
        c: [0],
        x: "Em espanhol, 'puente' é masculino e leva 'el', diferente do português 'a ponte'. As formas 'la puente' e 'una puente' copiam o gênero do português. 'Los puente' erra o plural, que seria 'los puentes'. Só 'el puente' está correto."
      },
      {
        id: "e4q5", s: 1, t: "e4",
        e: "¿Cuál es el plural de 'ciudad'? (Qual é o plural de 'ciudad'?)",
        o: ["ciudades", "ciudads", "ciudaes", "ciudadas"],
        c: [0],
        x: "Palavras terminadas em consoante formam o plural com -es: 'ciudad, ciudades'. A forma 'ciudads' acrescenta só -s, regra de palavras terminadas em vogal. 'Ciudaes' remove a consoante d. 'Ciudadas' troca a terminação por -as, que é de feminino, e não de plural de palavra terminada em consoante."
      },
      {
        id: "e4q6", s: 1, t: "e4",
        e: "Elige dos frases correctas. (Escolha duas)",
        o: ["Voy al banco.", "Soy del equipo.", "Voy a el banco.", "Soy de el equipo."],
        c: [0, 1],
        x: "Com 'el', a preposição a vira 'al' e de vira 'del': 'voy al banco' e 'soy del equipo'. As formas 'a el' e 'de el' não são usadas em espanhol padrão, porque a contração é obrigatória. Por isso só as duas contraídas estão corretas."
      },
      {
        id: "e4q7", s: 1, t: "e4",
        e: "¿Cómo se dice 'no banco' en español? (Como se diz 'no banco' em espanhol?)",
        o: ["en el banco", "enel banco", "no banco", "al banco"],
        c: [0],
        x: "O espanhol não contrai 'en' com 'el': diz 'en el banco'. 'Enel' inventa uma contração que não existe. 'No banco' copia a contração do português e é erro comum. 'Al banco' indica direção (ao banco), não lugar. Só 'en el' expressa 'no' corretamente."
      },
      {
        id: "e4q8", s: 1, t: "e4",
        e: "¿Cuál frase tiene la concordancia correcta? (Qual frase tem a concordância correta?)",
        o: ["Las tablas nuevas.", "Las tablas nuevos.", "Los tablas nuevas.", "La tabla nuevos."],
        c: [0],
        x: "O artigo, o substantivo e o adjetivo devem combinar: 'las tablas nuevas' é feminino plural nos três. 'Las tablas nuevos' mantém o adjetivo no masculino. 'Los tablas nuevas' usa o artigo masculino para um substantivo feminino. 'La tabla nuevos' mistura singular e plural. Só a primeira combina em tudo."
      },
      {
        id: "e4q9", s: 1, t: "e4",
        e: "Elige dos frases con errores comunes de brasileños. (Escolha duas)",
        o: ["La color es rojo.", "El mi equipo es bueno.", "El color es rojo.", "Mi equipo es bueno."],
        c: [0, 1],
        x: "'La color' copia o gênero do português ('a cor'), mas em espanhol é 'el color'. 'El mi equipo' acrescenta artigo antes do possessivo, o que o espanhol não faz. As formas 'el color es rojo' e 'mi equipo es bueno' estão corretas. Os dois erros têm origem na interferência do português."
      },
      {
        id: "e4q10", s: 1, t: "e4",
        e: "¿Cuál es el plural de 'lápiz'? (Qual é o plural de 'lápiz'?)",
        o: ["lápices", "lápizes", "lápizs", "lápiz"],
        c: [0],
        x: "Palavras terminadas em z trocam o z por c antes de -es: 'lápiz, lápices'. A forma 'lápizes' mantém o z e não segue a regra. 'Lápizs' apenas acrescenta s, o que não funciona para consoante final. 'Lápiz' é a mesma palavra no singular, sem marcar plural."
      },
      {
        id: "e4q11", s: 1, t: "e4",
        e: "¿Cómo se dice 'a viagem' en español? (Como se diz 'a viagem' em espanhol?)",
        o: ["el viaje", "la viaje", "la viagem", "los viaje"],
        c: [0],
        x: "As palavras terminadas em -aje são masculinas em espanhol, então 'el viaje' é a forma correta, ao contrário do português 'a viagem'. 'La viaje' copia o gênero do português. 'La viagem' mantém a palavra portuguesa. 'Los viaje' erra o plural, que seria 'los viajes'. Só 'el viaje' está certa."
      },
      {
        id: "e4q12", s: 1, t: "e4",
        e: "Elige dos frases correctas. (Escolha duas)",
        o: ["Hablo de él.", "Hablo del equipo.", "Hablo del él.", "Hablo de el equipo."],
        c: [0, 1],
        x: "Com o pronome 'él' (com tilde), não há contração: 'hablo de él'. Com o artigo 'el', a contração é obrigatória: 'hablo del equipo'. 'Del él' mistura as duas coisas sem sentido. 'De el equipo' deixa de contrair onde a contração é obrigatória. Por isso só as duas primeiras estão certas."
      }
    ],
    lab: {
      t: "Treino de fala e escuta: artigos, gênero e contrações",
      custo: "Grátis (gravador do celular)",
      tempo: "10 a 15 min",
      porque: "O gênero se aprende de ouvido. Dizer o substantivo sempre com o artigo faz o ouvido registrar a palavra como uma peça só, e a gravação mostra os falsos amigos de gênero.",
      antes: "Ter lido a aula e anotado dez palavras do seu trabalho com artigo (por exemplo: el servidor, la tabla, el informe, la nube) e cinco palavras que mudam de gênero (el color, la leche, la sangre, el puente, el viaje). Este roteiro não foi executado por quem escreveu a aula: ajuste as palavras à sua rotina.",
      passos: [
        { t: "Preparar", p: "Escreva as quinze palavras com artigo em um papel, uma por linha, e ao lado a forma no plural." },
        { t: "Ouvir e repetir", p: "Se tiver um áudio em espanhol que você já use, ouça substantivos com artigo e repita em voz alta. Se não tiver, leia as palavras em voz alta, três vezes cada, sempre com o artigo." },
        { t: "Gravar (2 a 3 min)", p: "Grave cada palavra no singular e no plural ('el servidor, los servidores') e depois quatro frases com al e del ('voy al banco', 'soy del equipo')." },
        { t: "Comparar", p: "Ouça e marque: artigo certo em cada palavra, falsos amigos de gênero certos, plural correto e al e del no lugar certo." },
        { t: "Regravar", p: "Regrave corrigindo e termine com duas frases livres sobre o seu trabalho, com artigo, adjetivo e uma contração." }
      ],
      verificar: "Na regravação, pelo menos 13 das 15 palavras saem com o artigo certo; os cinco falsos amigos de gênero estão corretos; os plurais seguem a regra; e as frases com al e del estão contraídas.",
      limpar: [
        "Apague gravações se quiser; não envie a terceiros.",
        "Guarde só a melhor versão para comparar na próxima aula, se quiser.",
        "Anote em uma linha quais palavras você mais errou, para repetir na próxima prática."
      ],
      erros: [
        { s: "Continuo dizendo 'la color'", c: "O gênero do português está forte.", r: "Repita 'el color rojo' dez vezes e crie uma imagem mental masculina (um crachá azul) para a palavra." },
        { s: "Esqueço de contrair al e del", c: "Falar rápido e separar a preposição do artigo.", r: "Escreva 'a + el = al' e 'de + el = del' num papel e leia em voz alta antes de regravar." },
        { s: "Erro o plural das palavras em consoante", c: "Dizer só -s por hábito.", r: "Treine ciudad, servidor e lápiz com -es e lembre que o z vira c." }
      ]
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
