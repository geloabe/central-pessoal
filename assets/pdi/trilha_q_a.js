(function (root) {
  var C = root.CP_CONTEUDO_ESTUDO = root.CP_CONTEUDO_ESTUDO || { dias: {} };
C.dias[1] = {
aula: {
titulo: "Qualidade de dados: dimensões e como medir",
resumo: "O que significa dado de boa qualidade, as seis dimensões (completude, unicidade, validade, consistência, atualidade, acurácia), como transformar cada uma em uma consulta que devolve as linhas ruins, e onde checar no pipeline.",
simples: {
analogia: "Pense na despensa de casa antes de cozinhar para a semana. Você confere se tem de tudo (completude), se não comprou dois potes iguais sem querer (unicidade), se o arroz é mesmo arroz e não farinha na embalagem errada (validade), se a etiqueta do pote bate com o que está dentro (consistência), se nada passou da validade (atualidade) e se o 1 kg de feijão pesa mesmo 1 kg (acurácia). Ninguém faz isso olhando prato por prato depois de pronto: faz na entrada da despensa e antes de cozinhar. Qualidade de dados é essa conferência, só que escrita como regra que uma máquina roda sozinha toda vez que chega comida nova.",
pontos: [
"Qualidade não é uma nota única: são dimensões, e cada uma vira uma regra testável.",
"Uma regra boa é uma consulta que devolve as linhas ruins: zero linhas, passou.",
"Teste de código confere a lógica com dados de mentira; teste de dado confere os dados reais de hoje.",
"Cheque o mais cedo possível no pipeline, e de novo antes de publicar para quem consome.",
"Serviços gerenciados (como o Dataplex) usam a mesma ideia com nomes oficiais de regras."
],
paraQueServe: "Dar vocabulário e método para dizer com precisão o que está quebrado numa tabela, em vez de dizer só que o dado está estranho, e preparar as próximas aulas de contratos e testes."
},
glossario: [
{ t: "Completude (completeness)", d: "Os valores que deveriam existir estão preenchidos. Costuma ser medida como contagem ou percentual de NULL em colunas obrigatórias." },
{ t: "Unicidade (uniqueness)", d: "Uma entidade aparece uma só vez. Medida procurando chaves repetidas, por exemplo com GROUP BY e HAVING count(*) > 1." },
{ t: "Validade (validity)", d: "O valor respeita formato, faixa ou lista permitida: total não negativo, status dentro do conjunto conhecido, e-mail com arroba." },
{ t: "Consistência (consistency)", d: "Dados que se relacionam concordam entre si: toda linha filha tem pai, e o total do pedido bate com a soma dos itens." },
{ t: "Atualidade ou frescor (freshness)", d: "Quão recente é o dado mais novo comparado com o que o negócio espera. Medida pela idade do maior timestamp de carga." },
{ t: "Acurácia (accuracy)", d: "O dado representa a realidade. É a mais difícil: quase sempre exige comparar com uma fonte confiável ou conferir amostras." },
{ t: "Teste de dado (data test)", d: "Regra executada sobre os dados reais de uma tabela, que passa ou falha conforme o conteúdo daquele dia." },
{ t: "Regra de linhas ruins", d: "Formato de regra em que a consulta devolve apenas as linhas que violam a expectativa; zero linhas significa que a regra passou." }
],
blocos: [
{ t: "Qualidade vira dimensões", facil: "Traduzindo: em vez de perguntar se o dado é bom, pergunte qual dimensão está falhando: faltando, repetido, inválido, incoerente, velho ou errado.", p: [
"Dado bom depende do uso: um e-mail nulo é irrelevante para um relatório de vendas e fatal para uma campanha. Por isso a prática é quebrar qualidade em dimensões e medir cada uma contra uma expectativa explícita.",
"Os nomes variam por ferramenta, e isso é normal. O Dataplex, serviço de qualidade de dados do Google Cloud, exige que toda regra pertença a uma de sete dimensões: Freshness, Volume, Completeness, Validity, Consistency, Accuracy e Uniqueness. O padrão aberto Open Data Contract Standard lista as dimensões accuracy, completeness, conformity, consistency, coverage, timeliness e uniqueness. Mesma ideia, vocabulário diferente.",
"Neste curso usamos seis, que cobrem a maior parte do dia a dia: completude, unicidade, validade, consistência, atualidade e acurácia. Volume (a tabela recebeu a quantidade esperada de linhas?) entra junto com atualidade quando você olha o pipeline."
], fonte: ["Dataplex: visão geral da qualidade de dados (dimensões)", "https://cloud.google.com/dataplex/docs/data-quality-overview"], dica: "Ao nomear uma regra, escreva a dimensão no nome: invoice_id_unicidade, invoice_total_validade. Fica fácil agrupar depois." },
{ t: "Medir: a consulta das linhas ruins", facil: "Traduzindo: escreva a regra como uma consulta que devolve só o que está errado. Se voltar vazio, passou.", p: [
"O formato mais simples e portátil para qualquer regra é: SELECT das linhas que violam a expectativa. Zero linhas, a regra passou; uma ou mais, falhou, e as próprias linhas já são o diagnóstico. É exatamente a convenção dos singular data tests do dbt, que passam quando a consulta retorna zero linhas, e a dos SQL assertions do Dataplex, que falham se qualquer linha voltar.",
"Cada dimensão tem uma consulta típica:",
"```sql\n-- completude: coluna obrigatória vazia\nSELECT * FROM invoice WHERE customer_id IS NULL;\n\n-- unicidade: chave repetida\nSELECT invoice_id, count(*) AS n FROM invoice GROUP BY invoice_id HAVING count(*) > 1;\n\n-- validade: valor fora da faixa\nSELECT * FROM invoice WHERE total < 0;\n\n-- consistência: filha sem pai\nSELECT l.* FROM invoice_line l LEFT JOIN invoice i ON i.invoice_id = l.invoice_id WHERE i.invoice_id IS NULL;\n```",
"Para virar número, conte as linhas ruins e divida pelo total. Percentual dá contexto: 3 linhas ruins em 10 milhões é diferente de 3 em 10."
], fonte: ["dbt: data tests (singular tests passam com zero linhas)", "https://docs.getdbt.com/docs/build/data-tests"], armadilha: "Escrever a regra como contagem que deve ser maior que zero para passar. Prefira sempre o sentido de linhas ruins: o resultado vazio é o único estado de sucesso, e fica fácil de automatizar." },
{ t: "Atualidade, volume e acurácia: as três mais traiçoeiras", facil: "Traduzindo: atualidade e volume olham o relógio e o tamanho; acurácia exige uma referência externa e raramente é automática.", p: [
"Atualidade compara o maior timestamp de carga com agora: SELECT max(loaded_at) e verifique se a idade passa do limite combinado. Volume compara a contagem de linhas de hoje com o esperado (por exemplo, não menos que a média dos últimos dias menos uma margem). Ambas pegam o pior tipo de falha: o pipeline que parou em silêncio, sem erro, e a tabela segue com cara de normal.",
"Acurácia pergunta se o dado é verdadeiro. Sem uma fonte de verdade, o máximo que se faz é conferir contra uma referência: totais do sistema de origem, uma amostra auditada, ou duas fontes independentes que devem concordar. No Dataplex, Accuracy é uma das sete dimensões, e a página observa que dado válido não é necessariamente acurado: passar nas regras de formato e faixa não prova que o valor é verdadeiro.",
"Regra prática: automatize primeiro o que é barato e objetivo (completude, unicidade, validade, atualidade) e trate acurácia como auditoria periódica por amostra."
], fonte: ["Dataplex: qualidade de dados automática (regras e dimensões)", "https://cloud.google.com/dataplex/docs/auto-data-quality-overview"], dica: "Uma tabela que parou de atualizar passa em todos os testes de completude e unicidade. Sempre inclua atualidade ou volume nas tabelas críticas." },
{ t: "Teste de código versus teste de dado", facil: "Traduzindo: teste de código pergunta se a receita está certa; teste de dado pergunta se os ingredientes de hoje estão bons.", p: [
"Teste de código (unitário) usa entradas pequenas e fixas, escritas à mão, para provar que a lógica da transformação faz o que deveria. Roda no desenvolvimento e na integração contínua, e não muda de resultado entre um dia e outro. O dbt tem exatamente isso nos unit tests, que validam a lógica do SQL contra entradas estáticas antes de materializar o modelo.",
"Teste de dado roda sobre os dados reais que chegaram. A mesma transformação, sem nenhum bug, pode falhar hoje porque a origem mandou chave duplicada. O resultado muda com os dados, então precisa rodar a cada carga, em produção.",
"Você precisa dos dois: lógica errada com dado bom gera lixo, e lógica boa com dado ruim também."
], tabela: { cab: ["Aspecto", "Teste de código", "Teste de dado"], linhas: [
["Pergunta", "A lógica está certa?", "Os dados de hoje estão bons?"],
["Entrada", "Pequena, fixa, escrita à mão", "Dados reais da tabela"],
["Quando roda", "Desenvolvimento e CI", "A cada carga, em produção"],
["Falha indica", "Bug no código", "Problema na origem ou no pipeline"]
] }, fonte: ["dbt: unit tests (entradas estáticas, antes de materializar)", "https://docs.getdbt.com/docs/build/unit-tests"] },
{ t: "Onde checar no pipeline", facil: "Traduzindo: quanto mais perto da origem você pega o erro, mais barato é consertar; mas confira de novo antes de publicar.", p: [
"Um pipeline típico tem quatro pontos de checagem. Na entrada (dado bruto recém-ingerido): atualidade, volume e formato. Depois de limpar (camada staging): unicidade das chaves e não nulos. Depois de transformar (camada de negócio): consistência entre tabelas e regras de negócio. Antes de servir (a tabela que o painel consome): o que o consumidor exige, de preferência amarrado a um contrato.",
"Falhou onde? Uma regra que falha na entrada aponta para a origem; a mesma falhando só no fim aponta para a sua transformação. Esse mapa encurta o diagnóstico.",
"Também decida o que cada falha faz: bloquear a carga (para o que quebra o negócio) ou apenas avisar. A aula seguinte aprofunda a escolha."
], lista: [
"Entrada: atualidade, volume, esquema.",
"Staging: unicidade e não nulos de chave.",
"Camada de negócio: consistência, faixas, regras de domínio.",
"Antes de servir: contrato com o consumidor."
] },
{ t: "Taxonomia de regras de um serviço oficial: Dataplex", facil: "Traduzindo: serviços gerenciados oferecem regras prontas por tipo; saber os tipos ajuda a traduzir o que você escreveu em SQL.", p: [
"O Dataplex separa regras em duas categorias. Row-level: avaliadas linha a linha, cada linha passa ou falha, e a regra precisa de um percentual mínimo de aprovação (passing threshold). Aggregate: avaliadas uma vez sobre o conjunto todo, e passam apenas se o resultado for verdadeiro.",
"Tipos prontos: RangeExpectation, NonNullExpectation, SetExpectation e RegexExpectation são row-level; Uniqueness e StatisticRangeExpectation (média, mínimo ou máximo dentro de uma faixa) são aggregate. Tipos personalizados em SQL: row condition (expressão por linha), table condition (expressão booleana por tabela) e SQL assertion, uma consulta que devolve as linhas inválidas, e a regra falha se qualquer linha voltar. É a mesma ideia da consulta de linhas ruins.",
"Os resultados trazem uma pontuação (percentual de regras aprovadas) por execução, por dimensão e, via API, por coluna, e uma consulta para recuperar as linhas que falharam."
], tabela: { cab: ["Seu SQL de linhas ruins", "Tipo no Dataplex"], linhas: [
["WHERE col IS NULL", "NonNullExpectation (row-level)"],
["GROUP BY ... HAVING count(*) > 1", "Uniqueness (aggregate)"],
["WHERE total < 0", "RangeExpectation ou row condition"],
["Consulta que devolve linhas violadoras", "SQL assertion (aggregate)"]
] }, fonte: ["Dataplex: visão geral da qualidade de dados", "https://cloud.google.com/dataplex/docs/data-quality-overview"], armadilha: "Confundir percentual de aprovação de regra row-level com sucesso da tabela inteira. Uma regra a 99% de passing threshold tolera 1% de linhas ruins por definição." }
],
exemplo: { t: "Fatura com três problemas escondidos", texto: "A tabela invoice tem 412 linhas. Consulta de completude (customer_id IS NULL) devolve 0 linhas: passou. Unicidade (GROUP BY invoice_id HAVING count(*) > 1) devolve 2 linhas, os ids 98 e 215 com n = 2: falhou, e os ids já dizem onde olhar. Validade (total < 0) devolve 5 linhas, as devoluções lançadas com sinal trocado: falhou, mas o negócio pode decidir que estornos são válidos e mudar a regra para total < -1000. Consistência: 3 linhas de invoice_line sem fatura correspondente. Atualidade: max(invoice_date) é de 9 dias atrás e o combinado era 1 dia: falhou. Resultado: 4 de 5 regras falharam, cada uma com um dono provável diferente. A tabela não está ruim, está desconhecida; agora está medida." },
prova: [
"Você abre uma tabela do lakehouse e precisa responder rápido se ela está confiável: roda as cinco consultas de linhas ruins e anota quantas voltaram.",
"Num incidente de painel zerado, você pergunta qual dimensão falhou (atualidade? volume?) em vez de caçar o bug às cegas.",
"Ao revisar uma pull request de transformação, você pede um teste de unicidade da chave nova.",
"Ao conversar com o dono da origem, você leva a lista de linhas ruins com ids, em vez de dizer que o dado está estranho."
],
explique: "Explique com as próprias palavras as seis dimensões de qualidade, dê para cada uma a consulta de linhas ruins correspondente e diga em que ponto do pipeline você a colocaria.",
checagem: [
"Qual a diferença entre teste de código e teste de dado, e por que é preciso os dois?",
"Escreva em SQL uma regra de unicidade para a chave de uma tabela e diga o que significa zero linhas.",
"Por que uma tabela que parou de atualizar passa em completude e unicidade, e qual dimensão pegaria o problema?",
"Qual é a diferença entre regras row-level e aggregate no Dataplex?"
]
},
fontes: [
["Dataplex: visão geral da qualidade de dados", "https://cloud.google.com/dataplex/docs/data-quality-overview"],
["Dataplex: qualidade de dados automática", "https://cloud.google.com/dataplex/docs/auto-data-quality-overview"],
["dbt: data tests", "https://docs.getdbt.com/docs/build/data-tests"],
["dbt: unit tests", "https://docs.getdbt.com/docs/build/unit-tests"],
["Open Data Contract Standard: seção de qualidade", "https://bitol-io.github.io/open-data-contract-standard/latest/data-quality/"],
["DuckDB: extensão SQLite", "https://duckdb.org/docs/2.0/core_extensions/sqlite.html"],
["Chinook database: releases", "https://github.com/lerocha/chinook-database/releases"]
],
cartoes: [
{ id: "a1c1", t: "q1", f: "Quais são as seis dimensões de qualidade deste curso?", v: "Completude, unicidade, validade, consistência, atualidade (frescor) e acurácia. Cada serviço pode usar nomes próprios." },
{ id: "a1c2", t: "q1", f: "Qual o formato universal de uma regra de qualidade em SQL?", v: "Uma consulta que devolve apenas as linhas ruins. Zero linhas significa que a regra passou." },
{ id: "a1c3", t: "q1", f: "Teste de código x teste de dado?", v: "Código: lógica com entradas fixas e pequenas, no dev/CI. Dado: conteúdo real da tabela, a cada carga." },
{ id: "a1c4", t: "q1", f: "Qual dimensão pega o pipeline que parou em silêncio?", v: "Atualidade (frescor) e volume: comparam o timestamp mais novo e a quantidade de linhas com o esperado." },
{ id: "a1c5", t: "q1", f: "Por que acurácia é difícil de automatizar?", v: "Exige uma fonte de verdade externa para comparar. Sem ela, só se faz conferência por amostra ou entre fontes independentes." },
{ id: "a1c6", t: "q1", f: "No Dataplex, quais as duas categorias de regra?", v: "Row-level (cada linha passa ou falha, com passing threshold) e aggregate (um valor sobre o conjunto, precisa ser verdadeiro)." },
{ id: "a1c7", t: "q1", f: "O que é um SQL assertion no Dataplex?", v: "Regra aggregate personalizada: uma consulta que devolve as linhas inválidas; se qualquer linha voltar, a regra falha." },
{ id: "a1c8", t: "q1", f: "Em que pontos do pipeline se checa qualidade?", v: "Entrada (atualidade, volume), staging (chaves), camada de negócio (consistência) e antes de servir (contrato)." },
{ id: "a1c9", t: "q1", f: "Quais as sete dimensões obrigatórias do Dataplex?", v: "Freshness, Volume, Completeness, Validity, Consistency, Accuracy e Uniqueness. Toda regra precisa pertencer a uma delas." }
],
questoes: [
{ id: "a1q1", s: 1, t: "q1", e: "Uma tabela de pedidos carrega todo dia às 6h. Numa segunda-feira o painel mostra os mesmos números de sexta, sem nenhum erro no orquestrador. As regras existentes são não nulo e unicidade da chave, e ambas passaram. Qual dimensão deveria ter pego o problema?", o: ["Completude, porque faltaram linhas", "Atualidade (frescor), comparando o maior timestamp de carga com o esperado", "Validade, porque os valores estão fora da faixa", "Acurácia, porque os números estão errados", "Unicidade, porque há chaves repetidas"], c: [1], x: "Atualidade compara a idade do dado mais novo com o limite combinado e pega justamente a carga que parou sem erro. Completude e unicidade olham o conteúdo que já existe, e uma tabela velha pode ser perfeitamente completa e única. Validade olha formato e faixa, não a idade. Acurácia é sobre fidelidade à realidade e exige uma referência; aqui o dado está desatualizado, não necessariamente incorreto. Completude por 'faltaram linhas' mistura com volume." },
{ id: "a1q2", s: 1, t: "q1", e: "Você precisa escrever uma regra de unicidade para invoice_id e quer um formato fácil de automatizar, que também sirva de diagnóstico quando falhar. Qual formulação segue a convenção de linhas ruins?", o: ["SELECT count(*) FROM invoice, e esperar que seja maior que zero", "SELECT invoice_id, count(*) FROM invoice GROUP BY invoice_id HAVING count(*) > 1, esperando zero linhas", "SELECT DISTINCT invoice_id FROM invoice, e comparar a olho", "SELECT * FROM invoice LIMIT 10, e inspecionar", "SELECT max(invoice_id) FROM invoice, esperando um valor"], c: [1], x: "A consulta com HAVING count(*) > 1 devolve apenas as chaves repetidas: vazia é sucesso e, se falhar, as linhas devolvidas já dizem quais ids investigar. Contar linhas e esperar mais que zero não detecta duplicidade nenhuma. SELECT DISTINCT e inspeção visual não são automatizáveis nem escalam. LIMIT 10 olha uma amostra arbitrária. max(invoice_id) não diz nada sobre repetição." },
{ id: "a1q3", s: 1, t: "q1", e: "Uma pessoa da equipe diz que, como o modelo de transformação tem unit tests com todos os casos passando, não precisa de testes de dado em produção. Qual a resposta mais correta?", o: ["Está certo: lógica correta garante dado correto", "Errado: unit tests usam entradas fixas e provam a lógica; só testes de dado verificam o conteúdo real que chegou hoje, que pode violar regras mesmo com código correto", "Errado: unit tests e testes de dado são o mesmo recurso", "Está certo, desde que os unit tests rodem em produção todo dia", "Errado: unit tests só funcionam com dados reais"], c: [1], x: "Unit tests validam a transformação com entradas estáticas escritas à mão, e o resultado não muda com os dados. Já os dados reais podem trazer chave duplicada, nulos ou atraso da origem sem que o código tenha bug algum. Por isso os dois se complementam. Dizer que são o mesmo recurso é falso, e rodar unit tests em produção todo dia desperdiça computação porque as entradas não mudam. Eles também não usam dados reais: usam dados fixos." },
{ id: "a1q4", s: 1, t: "q1", e: "No Dataplex você quer uma regra que falhe se existir qualquer fatura com total negativo, devolvendo as linhas violadoras para diagnóstico. Qual tipo de regra personalizada se parece mais com isso?", o: ["Table condition, que avalia uma expressão booleana por linha", "SQL assertion, uma consulta que devolve as linhas inválidas e falha se alguma voltar", "Uniqueness, que valida repetição", "Debug query, que substitui a regra", "StatisticRangeExpectation, que valida média, mínimo ou máximo"], c: [1], x: "O SQL assertion é uma regra aggregate cuja consulta devolve as linhas que violam a condição e que falha se qualquer linha for retornada, a mesma lógica de linhas ruins. Table condition é uma expressão booleana avaliada uma vez por tabela, não por linha. Uniqueness só trata repetição. A debug query é um auxílio opcional para diagnosticar, não a regra. StatisticRangeExpectation controla média, mínimo ou máximo, e poderia pegar mínimo negativo, mas não devolve as linhas ruins." },
{ id: "a1q5", s: 1, t: "q1", e: "(Escolha duas) Uma coluna customer_id em invoice_line deve sempre existir na tabela de clientes. Quais regras tratam desse requisito de consistência e de completude da referência?", o: ["Consulta de linhas de invoice_line com customer_id sem correspondência em customer (LEFT JOIN com IS NULL)", "Verificar apenas se o nome da coluna existe", "Regra de não nulo em customer_id", "Contar linhas da tabela cliente", "Medir a atualidade de customer"], c: [0, 2], x: "A consulta com LEFT JOIN e IS NULL acha filhas sem pai, que é consistência referencial; a regra de não nulo garante que a referência está preenchida, ou seja, completude. Verificar só o nome da coluna é checagem de esquema e não diz nada sobre valores. Contar linhas da tabela cliente é volume, não referência. Atualidade de customer mede a idade da carga, não a relação entre tabelas." },
{ id: "a1q6", s: 1, t: "q1", e: "A equipe decide checar qualidade só no final, na tabela que alimenta o painel. Um erro de unicidade aparece lá, mas ninguém sabe se veio da origem ou da transformação. Qual melhoria aplica o princípio de checar em vários pontos?", o: ["Remover os testes finais para reduzir ruído", "Adicionar checagens de entrada e de staging, para localizar em qual etapa a regra passou a falhar", "Trocar a tabela final por uma view", "Aumentar o limite de linhas ruins tolerado até passar", "Rodar os testes apenas uma vez por semana"], c: [1], x: "Com checagens em vários pontos, a regra que falha primeiro indica a etapa culpada: na entrada aponta para a origem, só no fim aponta para a transformação. Remover os testes finais perde a proteção ao consumidor. Trocar por view não diagnostica nada. Aumentar a tolerância até passar esconde o problema. Rodar uma vez por semana atrasa a detecção e piora o diagnóstico." }
],
lab: {
t: "Primeiras cinco checagens em SQL puro",
custo: "gratuito",
tempo: "30 a 40 min",
porque: "Transformar as dimensões em consultas de linhas ruins numa tabela real é o que torna o conceito concreto, e o resultado vira a primeira evidência do PDI: um arquivo com as cinco consultas e o que cada uma devolveu.",
antes: "Escolha um dos modos. Modo A (No Snowfox): use uma tabela crítica em ambiente de desenvolvimento, só leitura, com colunas que não sejam dado pessoal; nunca cole linhas reais no arquivo de evidência, só contagens e ids técnicos. Modo B (Sem acesso): baixe Chinook_Sqlite.sqlite dos releases do repositório oficial lerocha/chinook-database no GitHub e use o DuckDB para consultar (INSTALL AND LOAD sqlite e ATTACH com TYPE sqlite, conforme a documentação do DuckDB). Os comandos foram conferidos contra a documentação, mas não foram executados no seu ambiente: se algum nome de coluna diferir, rode DESCRIBE na tabela e ajuste. Você verá uma tabela de resultados no terminal; zero linhas aparece como resultado vazio.",
passos: [
{ t: "Abrir o banco", cmd: "duckdb\nATTACH 'Chinook_Sqlite.sqlite' AS chinook (TYPE sqlite);\nUSE chinook;\nSHOW TABLES;", p: "Modo B: no shell do DuckDB, anexe o arquivo SQLite. A documentação diz que as tabelas podem ser lidas como tabelas normais do DuckDB. No Modo A, abra o cliente SQL do seu lakehouse em ambiente de desenvolvimento e use o nome da tabela real." },
{ t: "Completude e unicidade", cmd: "SELECT * FROM chinook.Customer WHERE Email IS NULL;\nSELECT InvoiceId, count(*) AS n FROM chinook.Invoice GROUP BY InvoiceId HAVING count(*) > 1;", p: "Rode as duas e anote quantas linhas voltaram. Zero é passou. Se voltar alguma, copie só os ids para a evidência." },
{ t: "Validade e consistência", cmd: "SELECT * FROM chinook.Invoice WHERE Total < 0;\nSELECT l.* FROM chinook.InvoiceLine l LEFT JOIN chinook.Invoice i ON i.InvoiceId = l.InvoiceId WHERE i.InvoiceId IS NULL;", p: "A primeira checa faixa; a segunda acha itens sem fatura. Anote os resultados do mesmo jeito." },
{ t: "Atualidade", cmd: "SELECT max(InvoiceDate) AS ultima, current_timestamp AS agora FROM chinook.Invoice;", p: "Compare a data mais recente com o limite que você definiria (por exemplo, 1 dia). No Chinook, que é um banco estático de exemplo, a regra vai falhar por construção: registre isso como falha esperada e explique por quê. No Modo A, use a coluna de data de carga da sua tabela." },
{ t: "Registrar a evidência", cmd: "", p: "Crie o arquivo checagens_q1.md com cinco linhas: dimensão, a consulta, o número de linhas que voltaram e se passou. Acrescente uma frase sobre o que você faria em cada falha. Guarde o arquivo no PDI." }
],
verificar: "Você tem cinco consultas executadas, cada uma com contagem de linhas ruins anotada, e um arquivo checagens_q1.md com a dimensão, o resultado e a decisão para cada uma.",
limpar: [
"Guarde checagens_q1.md como evidência; apague capturas de tela que mostrem dados reais do Snowfox.",
"Não commite o arquivo Chinook_Sqlite.sqlite nem credenciais de conexão; se precisar de senha, use variável de ambiente.",
"Feche a sessão do DuckDB; o ATTACH é só da sessão."
],
erros: [
{ s: "Erro de tabela ou coluna não encontrada", c: "O nome real da coluna difere do usado no exemplo ou a tabela não foi anexada.", r: "Rode SHOW TABLES (depois de USE chinook) e DESCRIBE nome_da_tabela e ajuste os nomes antes de repetir a consulta." },
{ s: "Mismatch Type Error ao ler o SQLite", c: "O SQLite não impõe tipos de coluna e o DuckDB impõe: algum valor não bate com o tipo mapeado.", r: "Conforme a documentação do DuckDB, rode SET GLOBAL sqlite_all_varchar = true antes do ATTACH para ler tudo como texto." },
{ s: "Todas as regras passam e você desconfia", c: "A regra pode estar escrita no sentido errado ou o filtro está tirando as linhas ruins.", r: "Provoque uma falha de propósito: rode a consulta sobre uma cópia com uma linha adulterada e confirme que ela aparece." }
]
}
};
C.dias[2] = {
aula: {
titulo: "Contratos de dados e criticidade: o que proteger primeiro",
resumo: "Como escolher as cinco tabelas que merecem proteção primeiro (impacto x chance de quebrar), escrever regras do tipo esta tabela está quebrada se..., formalizá-las em contratos (dbt model contracts e Open Data Contract Standard) e decidir o que bloqueia e o que apenas avisa.",
simples: {
analogia: "Imagine um prédio com cem portas e um único segurança. Ele não vigia todas com o mesmo cuidado: começa pela sala do cofre, pelo quadro de luz e pela entrada principal, porque é onde um problema custa mais e onde as chances de algo dar errado são maiores. Depois combina por escrito com cada morador o que é aceitável: o cofre fica trancado sempre, a porta do depósito só gera um bilhete de aviso. Contrato de dados é esse combinado por escrito entre quem produz a tabela e quem a usa, e criticidade é a decisão de por onde começar a vigiar, já que você não consegue vigiar tudo ao mesmo tempo.",
pontos: [
"Priorize por impacto se quebrar x chance de quebrar, não por gosto nem por barulho.",
"Cinco tabelas bem protegidas valem mais que cinquenta com teste decorativo.",
"Escreva cada regra no formato: esta tabela está quebrada se... e uma consulta que prova.",
"Contrato é combinado explícito de forma, qualidade e prazo entre produtor e consumidor.",
"Severidade decide o que acontece na falha: bloquear a carga ou apenas avisar."
],
paraQueServe: "Evitar o erro de querer testar tudo e não proteger nada, e deixar o PDI com uma lista curta e defendível de tabelas críticas, cada uma com regras e severidade definidas."
},
glossario: [
{ t: "Criticidade", d: "Medida de quanto uma tabela importa: combina o dano causado se ela quebrar com a probabilidade de ela quebrar." },
{ t: "Matriz impacto x chance", d: "Grade simples com impacto (baixo a alto) de um lado e chance de quebrar do outro, usada para ordenar as tabelas." },
{ t: "Regra de quebra", d: "Frase no formato: esta tabela está quebrada se..., acompanhada da consulta que devolve as linhas que provam a quebra." },
{ t: "Contrato de dados", d: "Acordo explícito entre produtor e consumidores sobre esquema, qualidade, atualidade e responsabilidades de uma tabela." },
{ t: "dbt model contract", d: "Recurso do dbt (contract enforced) que confere nomes e tipos das colunas de um modelo a cada build e impede a criação se não baterem." },
{ t: "Open Data Contract Standard (ODCS)", d: "Padrão aberto, mantido pelo projeto Bitol, que descreve um contrato de dados em YAML com seções como fundamentals, schema e quality." },
{ t: "Severidade", d: "Nível de gravidade de uma regra: define se a falha bloqueia o fluxo (erro) ou apenas notifica (aviso)." },
{ t: "Consumidor", d: "Quem depende da tabela: painel, modelo, equipe, ou outro pipeline. O contrato existe por causa dele." }
],
blocos: [
{ t: "Você não consegue proteger tudo", facil: "Traduzindo: comece pelo que dói mais e quebra mais; o resto espera.", p: [
"Um lakehouse tem centenas de tabelas. Testar todas igual gera três problemas: tempo que você não tem, alertas demais que viram ruído e uma falsa sensação de cobertura. A saída é priorizar com um critério simples e defensável.",
"O critério é a matriz de criticidade. Para cada candidata, responda duas perguntas. Impacto: se esta tabela estiver errada ou atrasada, quem é afetado e quanto custa (decisão errada, dinheiro, relatório regulatório, outro pipeline parado)? Chance: com que frequência ela já quebrou, quantas origens externas alimentam, quão complexa é a transformação, quantas pessoas mexem nela?",
"Dê nota de 1 a 3 para cada eixo e multiplique. Notas altas nos dois eixos vão para o topo. Quem tem impacto alto e chance baixa fica logo atrás, e impacto baixo cai para depois, mesmo que quebre muito."
], tabela: { cab: ["", "Chance baixa", "Chance alta"], linhas: [
["Impacto alto", "Proteger logo (cofre trancado)", "Proteger primeiro (prioridade 1)"],
["Impacto baixo", "Ignorar por ora", "Só avisar, sem bloquear"]
] }, dica: "Pergunte a quem consome: se esta tabela estivesse errada amanhã de manhã, quem ligaria para você? A resposta mostra o impacto real." },
{ t: "Escolher cinco tabelas críticas", facil: "Traduzindo: liste candidatas, dê notas, pegue as cinco maiores e anote por que escolheu cada uma.", p: [
"Passo a passo: liste de 8 a 12 candidatas (as que alimentam painéis, modelos, relatórios, cobrança). Preencha uma tabela com colunas: tabela, consumidor principal, impacto (1 a 3), chance (1 a 3), produto das notas e uma frase de justificativa. Ordene e fique com as cinco primeiras.",
"Registre também o dono (quem responde quando quebra) e a frequência de carga esperada. Sem dono, a regra falha e ninguém age; sem frequência, não há como definir atualidade.",
"Revise a lista a cada trimestre ou quando entrar um novo consumidor importante: criticidade muda com o uso."
], lista: [
"Tabela, consumidor, dono, frequência de carga.",
"Impacto de 1 a 3 e chance de 1 a 3, com a frase do porquê.",
"Produto das notas para ordenar, com desempate pelo consumidor mais exigente."
], armadilha: "Escolher pela tabela que mais incomoda quem está de plantão e não pela que causa o maior dano. O barulho de ontem não é o mesmo que impacto." },
{ t: "Regras no formato: esta tabela está quebrada se...", facil: "Traduzindo: para cada tabela crítica, escreva de 3 a 5 frases de quebra e, para cada uma, a consulta que devolve as linhas ruins.", p: [
"Uma regra clara é uma afirmação sobre os dados que alguém de negócio entende, mais a consulta que a prova. Exemplos para uma tabela de faturas:",
"```text\ninvoice está quebrada se:\n1. existe invoice_id repetido            (unicidade)\n2. existe total negativo               (validade)\n3. existe fatura sem cliente           (consistência)\n4. o maior invoice_date tem > 1 dia    (atualidade)\n5. total difere da soma dos itens      (consistência)\n```",
"Cada frase vira uma consulta no formato da aula anterior (zero linhas, passou). Anote para cada regra: dimensão, severidade (bloqueia ou avisa) e quem é avisado. Três a cinco regras por tabela bastam para começar; o objetivo é cobrir os modos de quebra mais prováveis, não todos os imagináveis.",
"Essa lista é o rascunho do seu contrato: o que for combinado com o consumidor entra nele."
], dica: "Se você não consegue escrever a regra em uma frase que o consumidor entenda, ela provavelmente está vaga demais para virar teste." },
{ t: "dbt model contracts: o contrato de forma", facil: "Traduzindo: o dbt confere, a cada build, se as colunas e os tipos continuam os prometidos; se não, o modelo nem é criado.", p: [
"Um model contract é um conjunto de garantias sobre o formato da saída de um modelo: nomes de colunas, tipos de dados e constraints. Para ativar, configure contract com enforced: true e declare nome e tipo de todas as colunas:",
"```yaml\nmodels:\n  - name: dim_customers\n    config:\n      contract:\n        enforced: true\n    columns:\n      - name: customer_id\n        data_type: int\n        constraints:\n          - type: not_null\n      - name: customer_name\n        data_type: string\n```",
"Com o contrato ativo, o dbt faz uma verificação prévia (a consulta devolve as colunas e tipos declarados? a ordem não importa) e, se não bater, o modelo não é construído; também inclui nomes, tipos e constraints no DDL enviado, para a plataforma impor. O contrato precisa cobrir todas as colunas do modelo.",
"Limites: funciona com materializações table, incremental (com on_schema_change append_new_columns ou fail) e view; não vale para Python models, materialized views, ephemeral, seeds, sources nem snapshots. Constraints dependem da plataforma: umas são impostas na criação, outras só descritivas, e há as que a plataforma nem define. Confira a tabela da sua plataforma na documentação."
], fonte: ["dbt: model contracts", "https://docs.getdbt.com/docs/mesh/govern/model-contracts"], armadilha: "Achar que contrato valida o conteúdo. Ele valida a forma (colunas, tipos). Para checar os valores depois do build, continue usando data tests." },
{ t: "Open Data Contract Standard: o contrato em YAML", facil: "Traduzindo: um arquivo YAML aberto e independente de ferramenta que descreve o dado, seu dono, seu esquema e suas regras de qualidade.", p: [
"O Open Data Contract Standard (ODCS), do projeto Bitol, define as chaves de um contrato em YAML, organizado em seções como Fundamentals, Schema, Data Quality, Service-Level Agreement e Infrastructures & Servers. Na seção de fundamentos, apiVersion (versão do padrão) e kind (valor DataContract) são obrigatórios, junto com id e version; há também name, status e domain. Um trecho do exemplo da documentação:",
"```yaml\napiVersion: v3.2.0\nkind: DataContract\nid: 53581432-6c55-4ba2-a65f-72344a91553a\nname: seller_payments_v1\nversion: 1.1.0\nstatus: active\ndomain: seller\n```"
], fonte: ["ODCS: fundamentos", "https://bitol-io.github.io/open-data-contract-standard/latest/fundamentals/"] },
{ t: "ODCS: a seção de qualidade", facil: "Traduzindo: dentro do contrato, cada regra diz qual métrica medir, qual valor esperar e quão grave é a falha.", p: [
"A seção de qualidade aceita regras do tipo library (com metric, como nullValues, invalidValues e duplicateValues), text, sql ou custom, operadores como mustBe e mustBeGreaterThan, unit (rows ou percent), dimension e severity. Exemplo da documentação:",
"```yaml\nproperties:\n  - name: order_id\n    quality:\n      - id: order_id_no_nulls\n        type: library\n        metric: nullValues\n        mustBe: 0\n        unit: rows\n        description: 'There must be no null values in the column.'\n```",
"Segundo a página, as regras ficam em quality dentro de cada item de properties (regra de coluna) ou no nível do schema (regra da tabela, como rowCount). Confira a versão do padrão que sua ferramenta aceita; a página marca rule como obsoleto em favor de metric."
], fonte: ["ODCS: qualidade de dados", "https://bitol-io.github.io/open-data-contract-standard/latest/data-quality/"], dica: "Comece pequeno: fundamentos, uma lista de colunas e duas regras de qualidade. Contrato enorme que ninguém mantém é pior que nenhum." },
{ t: "Severidade: bloqueia ou avisa", facil: "Traduzindo: erro para o que não pode chegar ao consumidor errado; aviso para o que deve ser olhado, mas não justifica parar tudo.", p: [
"Toda regra precisa de uma resposta para a pergunta: se falhar, o que acontece? Bloquear (a carga para, o consumidor continua vendo o dado de ontem, que é certo e velho) ou avisar (a carga segue e alguém recebe notificação). Critério: bloqueie quando dado errado causa dano maior do que dado atrasado; avise quando o desvio é tolerável ou ainda está em observação.",
"Os mecanismos existem nas ferramentas. No dbt, a config severity vale error (padrão) ou warn, e error_if e warn_if aceitam limites sobre a contagem de falhas, por exemplo error_if '>1000' e warn_if '>10'. No ODCS, a regra de qualidade tem campo severity. No Dataplex, regras row-level toleram um percentual mínimo de aprovação.",
"Uma boa prática de adoção: comece uma regra nova como aviso, observe por duas semanas, e promova a erro quando os falsos positivos acabarem."
], fonte: ["dbt: severity, error_if e warn_if", "https://docs.getdbt.com/reference/resource-configs/severity"], armadilha: "Deixar tudo como erro desde o primeiro dia. O pipeline vai parar por motivos que não importam e a equipe aprende a ignorar ou a desligar os testes." }
],
exemplo: { t: "Escolhendo cinco entre oito candidatas", texto: "Oito candidatas, notas de impacto e chance de 1 a 3: invoice (impacto 3, chance 2, produto 6), invoice_line (3, 2, 6), customer (2, 2, 4), track (1, 1, 1), album (1, 1, 1), media_type (1, 1, 1), employee (2, 1, 2) e playlist_track (1, 3, 3). Ordenando por produto: invoice 6, invoice_line 6, customer 4, playlist_track 3, employee 2. Ficam como críticas as cinco primeiras; track, album e media_type esperam. Para invoice, as regras de quebra: id repetido (bloqueia), total negativo (avisa, estornos podem ser válidos), fatura sem cliente (bloqueia), dado com mais de 1 dia (bloqueia). O contrato dbt trava nomes e tipos de colunas; o YAML do ODCS registra dono, frequência e as regras de qualidade, cada uma com sua severidade." },
prova: [
"Seu gestor pergunta quais tabelas você protegeria primeiro e por quê: você mostra a matriz com as notas e as cinco escolhidas.",
"Uma equipe de painel pede garantia de que uma coluna não muda de tipo: você propõe um dbt model contract e explica o que ele não cobre.",
"Um teste novo falha às 3h da manhã e para tudo: você revisa se a severidade deveria ser aviso até estabilizar.",
"Ao assumir a tabela de outra equipe, você pede ou escreve um contrato com dono, esquema e regras antes de mexer."
],
explique: "Explique com as próprias palavras como você escolheria as cinco tabelas críticas, como transformaria uma delas em regras do tipo esta tabela está quebrada se..., e como decidiria o que bloqueia e o que apenas avisa.",
checagem: [
"Como funciona a matriz de impacto x chance e como ela gera a ordem de prioridade?",
"O que um dbt model contract valida e o que ele não valida?",
"Dê um exemplo de regra que deveria bloquear e outro que deveria apenas avisar, e justifique.",
"Quais seções e campos obrigatórios básicos tem um contrato ODCS?"
]
},
fontes: [
["dbt: model contracts", "https://docs.getdbt.com/docs/mesh/govern/model-contracts"],
["dbt: severity, error_if e warn_if", "https://docs.getdbt.com/reference/resource-configs/severity"],
["Open Data Contract Standard: início", "https://bitol-io.github.io/open-data-contract-standard/latest/"],
["ODCS: fundamentos", "https://bitol-io.github.io/open-data-contract-standard/latest/fundamentals/"],
["ODCS: qualidade de dados", "https://bitol-io.github.io/open-data-contract-standard/latest/data-quality/"],
["Dataplex: qualidade de dados automática", "https://cloud.google.com/dataplex/docs/auto-data-quality-overview"]
],
cartoes: [
{ id: "a2c1", t: "q2", f: "Como se calcula a criticidade de uma tabela neste método?", v: "Nota de impacto (1 a 3) vezes nota de chance de quebrar (1 a 3). Quanto maior o produto, mais cedo se protege." },
{ id: "a2c2", t: "q2", f: "Qual o formato de uma regra de quebra?", v: "Esta tabela está quebrada se... mais a consulta que devolve as linhas ruins (zero linhas, passou)." },
{ id: "a2c3", t: "q2", f: "Como ativar um model contract no dbt?", v: "Em config, contract com enforced: true, declarando name e data_type de todas as colunas do modelo." },
{ id: "a2c4", t: "q2", f: "O que acontece se o modelo não bate com o contrato dbt?", v: "A verificação prévia falha e o modelo não é construído. A ordem das colunas não importa, nomes e tipos sim." },
{ id: "a2c5", t: "q2", f: "Contrato dbt substitui data tests?", v: "Não. O contrato valida a forma da saída; data tests validam o conteúdo depois do build, com severidade e store_failures." },
{ id: "a2c6", t: "q2", f: "Quais campos são obrigatórios na seção de fundamentos do ODCS?", v: "apiVersion, kind (valor DataContract), id e version. Também há name, status, domain e outros opcionais." },
{ id: "a2c7", t: "q2", f: "Quais valores tem a severity no dbt?", v: "error (padrão) ou warn. error_if e warn_if definem limites sobre a quantidade de linhas que falharam." },
{ id: "a2c8", t: "q2", f: "Quando uma regra deve bloquear em vez de avisar?", v: "Quando dado errado causa mais dano ao consumidor do que dado atrasado. Regras novas começam como aviso até estabilizar." },
{ id: "a2c9", t: "q2", f: "Por que limitar a cinco tabelas críticas?", v: "Para proteger de verdade o que importa, sem excesso de alertas e sem falsa sensação de cobertura. A lista é revisada a cada trimestre." }
],
questoes: [
{ id: "a2q1", s: 1, t: "q2", e: "Sua equipe tem 120 tabelas e tempo para testar bem pouca coisa neste mês. Uma tabela de cobrança alimenta o fechamento financeiro e já falhou duas vezes; outra, de logs de depuração, falha toda semana mas ninguém a consome. Qual a decisão mais coerente com a matriz de criticidade?", o: ["Proteger primeiro a tabela de logs, porque falha mais", "Proteger primeiro a tabela de cobrança: impacto alto e chance razoável; a de logs tem impacto baixo", "Proteger as duas igualmente", "Esperar a próxima falha para decidir", "Testar as 120 com os mesmos testes genéricos"], c: [1], x: "A matriz combina impacto e chance. A cobrança tem impacto alto (fechamento financeiro) e chance comprovada pelo histórico, então tem o maior produto. A de logs falha muito, mas o impacto é baixo e pode, no máximo, receber só aviso. Proteger as duas igual ignora o critério, esperar a próxima falha é reativo e testar tudo igual dilui esforço e gera ruído." },
{ id: "a2q2", s: 1, t: "q2", e: "Um modelo dbt, dim_customers, tem contract enforced com customer_id int e customer_name string. Alguém altera a consulta e customer_id passa a sair como texto. O que acontece no build?", o: ["O modelo é criado e um aviso é emitido", "O dbt verifica as colunas e tipos antes de construir e o modelo não é criado", "O dbt converte o tipo sozinho sem avisar", "Somente os data tests acusam o problema depois", "O contrato só vale se houver data tests de not_null"], c: [1], x: "O model contract faz uma verificação prévia: se nomes e tipos devolvidos pela consulta não baterem com os declarados, o modelo não é construído e o build falha. Não é um mero aviso, não há conversão silenciosa e não depende de data tests. Os data tests rodam depois do build e validam conteúdo, não a forma do contrato." },
{ id: "a2q3", s: 1, t: "q2", e: "Uma pessoa propõe substituir todos os data tests de uma tabela por um model contract, dizendo que contrato garante qualidade dos dados. Qual a objeção correta?", o: ["Contrato é mais fraco e não pode ser usado em tabelas", "O contrato valida forma (colunas, tipos, constraints impostas pela plataforma), não regras de conteúdo como faixa de valores ou chaves repetidas na maioria dos casos", "Contratos só funcionam com Python models", "Data tests não podem coexistir com contratos", "Contrato valida frescor da tabela"], c: [1], x: "O contrato verifica o formato da saída e algumas constraints, conforme a plataforma. Regras de conteúdo (valores aceitos, relações, faixa, atualidade) continuam sendo data tests. Contratos funcionam em tabelas (table, incremental, view) e não em Python models. Contratos e data tests coexistem, e frescor é config de source freshness, não de contrato." },
{ id: "a2q4", s: 1, t: "q2", e: "Você escreveu uma regra nova de validade para total de fatura e, no primeiro dia, ela acusa 300 linhas por causa de estornos que talvez sejam legítimos. A equipe de negócio ainda não decidiu. Qual severidade e fluxo são mais adequados?", o: ["Error imediatamente para forçar a decisão", "Warn por duas semanas, coletando as falhas, e promover a error depois de definir a regra com o negócio", "Apagar a regra", "Aumentar a tolerância para 100% de linhas ruins", "Manter como error e desligar o alerta"], c: [1], x: "Regras novas ou ambíguas começam como aviso para observar sem parar a produção; depois de alinhar com o negócio, ajusta-se a regra e promove-se a erro. Error imediato bloqueia a carga por algo ainda indefinido. Apagar perde a proteção. Tolerância de 100% torna a regra inútil. Error com alerta desligado combina o pior dos dois: para o fluxo e ninguém é avisado." },
{ id: "a2q5", s: 1, t: "q2", e: "(Escolha duas) Quais itens fazem parte de um contrato de dados bem definido, conforme o padrão aberto ODCS e as boas práticas desta aula?", o: ["Identificação e dono do contrato (id, version, status, domain)", "A senha do banco de produção", "Regras de qualidade com métricas, dimensão e severidade", "O código completo da transformação", "A lista de funcionários da empresa"], c: [0, 2], x: "O ODCS descreve fundamentos (id, version, status, domain) e uma seção de qualidade com metric, operadores, dimension e severity. Senhas jamais entram em contrato: segredos ficam em variáveis de ambiente ou cofre. O código da transformação é implementação, não acordo sobre o dado. Lista de funcionários não faz parte do contrato." },
{ id: "a2q6", s: 1, t: "q2", e: "Ao montar a lista de cinco tabelas críticas, você tem duas empatadas com produto 6 para a última vaga: uma alimenta um painel executivo diário, a outra um relatório mensal usado por duas pessoas. Qual critério de desempate se encaixa no método?", o: ["Sorteio", "O consumidor mais exigente e o prazo de reação: o painel diário", "A tabela com mais colunas", "A mais antiga", "A que o time conhece melhor"], c: [1], x: "O método de desempate usa o consumidor mais exigente: quem sofre mais, e mais rápido, se a tabela quebrar. O painel executivo diário reage em horas; o relatório mensal tolera correção. Sorteio, número de colunas, idade e familiaridade não medem impacto." }
],
lab: {
t: "Tabela de criticidade e primeiras regras de quebra",
custo: "gratuito",
tempo: "30 a 40 min",
porque: "Esta é a base de todo o módulo: as cinco tabelas escolhidas aqui são as que você testará com dbt e com Great Expectations ou Soda nas próximas aulas. A evidência é o arquivo de criticidade com regras e severidades.",
antes: "Modo A (No Snowfox): você precisa da lista de tabelas do lakehouse e, se possível, conversar com um consumidor; trabalhe só com nomes de tabela e colunas, sem dado sensível no arquivo. Modo B (Sem acesso): use o Chinook (Chinook_Sqlite.sqlite, release do repositório oficial lerocha/chinook-database) com o DuckDB e o ATTACH TYPE sqlite. Passos conferidos contra a documentação, não executados no seu ambiente; os nomes de colunas do Chinook devem ser confirmados com DESCRIBE. Você trabalhará num arquivo de texto ou planilha e no terminal do DuckDB; zero linhas aparece como resultado vazio.",
passos: [
{ t: "Listar candidatas", cmd: "ATTACH 'Chinook_Sqlite.sqlite' AS chinook (TYPE sqlite);\nUSE chinook;\nSHOW TABLES;", p: "Modo B: liste as tabelas do Chinook (confira os nomes reais na saída do SHOW TABLES; esperam-se nomes como Invoice, InvoiceLine, Customer, Track, Album, Employee e PlaylistTrack). Modo A: liste de 8 a 12 tabelas do lakehouse. Crie criticidade_q2.md com a tabela: tabela, consumidor, dono, frequência, impacto, chance, produto, justificativa." },
{ t: "Pontuar e escolher cinco", cmd: "", p: "Dê notas de 1 a 3, multiplique, ordene e marque as cinco primeiras. No Modo B, finja consumidores: faturamento consome Invoice e InvoiceLine, atendimento consome Customer, e assim por diante. Escreva uma frase de justificativa por tabela." },
{ t: "Escrever as regras de quebra", cmd: "invoice está quebrada se:\n1. existe InvoiceId repetido        [unicidade, bloqueia]\n2. existe Total negativo            [validade, avisa]\n3. existe item sem fatura          [consistência, bloqueia]", p: "Para cada uma das cinco tabelas, escreva de 3 a 5 regras no formato esta tabela está quebrada se..., com a dimensão e a severidade (bloqueia ou avisa)." },
{ t: "Provar duas regras em SQL", cmd: "ATTACH 'Chinook_Sqlite.sqlite' AS chinook (TYPE sqlite);\nSELECT InvoiceId, count(*) FROM chinook.Invoice GROUP BY InvoiceId HAVING count(*) > 1;\nSELECT * FROM chinook.Invoice WHERE Total < 0;", p: "Rode pelo menos duas das regras e anote quantas linhas voltaram. Zero é passou." },
{ t: "Esboçar um contrato", cmd: "apiVersion: v3.2.0\nkind: DataContract\nid: troque-por-um-uuid\nname: invoice_v1\nversion: 1.0.0\nstatus: draft\ndomain: faturamento", p: "Copie os fundamentos do ODCS para um arquivo contrato_invoice.yaml e acrescente, em comentário ou conforme a página de qualidade do padrão, uma regra com metric nullValues ou duplicateValues. Confira os campos na documentação do ODCS antes de considerá-lo válido." }
],
verificar: "Você tem criticidade_q2.md com cinco tabelas escolhidas e justificadas, de 3 a 5 regras de quebra com severidade para cada uma, duas regras executadas em SQL com contagem de linhas, e um rascunho de contrato.",
limpar: [
"Guarde criticidade_q2.md e contrato_invoice.yaml como evidência do PDI.",
"No Modo A, não inclua dados pessoais, chaves ou nomes de pessoas no arquivo; só nomes de tabelas, colunas e contagens.",
"Não commite arquivos .sqlite nem credenciais."
],
erros: [
{ s: "Todas as tabelas ficaram com nota igual", c: "Os critérios de impacto e chance não foram definidos com exemplos concretos.", r: "Defina o que é nota 1, 2 e 3 por escrito (por exemplo, impacto 3 = afeta dinheiro ou relatório regulatório) e pontue de novo." },
{ s: "Regra impossível de transformar em consulta", c: "A frase de quebra está vaga, como dados ruins.", r: "Reescreva em termos de colunas e condição: existe linha onde X. Se não der, divida a regra em duas." },
{ s: "ATTACH falha ao abrir o arquivo", c: "Caminho errado do arquivo .sqlite ou arquivo corrompido no download.", r: "Confira o caminho com ls, rode o DuckDB na mesma pasta do arquivo e baixe de novo da página de releases se necessário." }
]
}
};
C.dias[5] = {
aula: {
titulo: "Testes de dados com dbt: genéricos, singulares e frescor",
resumo: "Como o dbt transforma regras de qualidade em testes: os quatro data tests genéricos, os singulares, as configs severity, where e store_failures, a checagem de frescor das sources, os unit tests e o comando dbt build que junta tudo.",
simples: {
analogia: "Pense numa linha de montagem de fábrica com inspetores. Alguns inspetores usam um formulário padrão, que serve para qualquer peça: tem número de série? É repetido? É de um modelo permitido? Esses são os testes genéricos. Outros recebem uma instrução feita sob medida para uma peça específica: o peso das duas metades tem que somar o peso total. Esses são os singulares. Há ainda o inspetor do relógio, que confere se a última entrega de matéria-prima chegou dentro do prazo, que é o frescor. E existe o ensaio com peças de teste, feito antes de ligar a linha, que é o unit test. Se um inspetor barra a peça, o que vem depois dela na linha nem começa: é o que o dbt build faz.",
pontos: [
"Teste genérico é parametrizado e declarado no YAML; singular é um arquivo SQL que devolve linhas ruins.",
"Os quatro genéricos prontos são unique, not_null, accepted_values e relationships.",
"severity, where e store_failures ajustam o quanto, onde e o que guardar de cada falha.",
"Source freshness mede a idade do dado carregado, com warn_after e error_after.",
"dbt build roda modelos e testes na ordem do DAG e pula o que depende de teste que falhou."
],
paraQueServe: "Transformar as regras de quebra das tabelas críticas em testes versionados no repositório, que rodam a cada build e deixam evidência de falha."
},
glossario: [
{ t: "Data test", d: "Consulta que devolve as linhas que violam uma regra; o teste passa quando devolve zero linhas." },
{ t: "Generic data test", d: "Teste parametrizado, definido uma vez e anexado a modelos, colunas, sources, seeds ou snapshots por propriedades YAML." },
{ t: "Singular data test", d: "Teste escrito como um arquivo .sql na pasta tests; o nome do arquivo é o nome do teste." },
{ t: "severity, warn_if, error_if", d: "Configs que definem se a falha vale error ou warn e a partir de quantas linhas falhas cada nível dispara." },
{ t: "store_failures", d: "Config que salva em uma tabela as linhas que falharam no teste, para inspeção posterior." },
{ t: "Source freshness", d: "Verificação da idade do dado mais recente de uma source, com limites warn_after e error_after e um loaded_at_field." },
{ t: "Unit test (dbt)", d: "Teste da lógica de um modelo SQL com entradas estáticas escritas à mão, rodado antes de materializar o modelo." },
{ t: "dbt build", d: "Comando que executa modelos, testes, seeds e snapshots na ordem do DAG e bloqueia o que depende de teste falho." }
],
blocos: [
{ t: "A ideia: teste é uma consulta que devolve linhas ruins", facil: "Traduzindo: o dbt usa o mesmo formato da aula 1: se o SELECT devolve linhas, o teste falha; se devolve zero, passa.", p: [
"O dbt chama as regras de data tests. Há dois tipos. Os generic data tests são consultas parametrizadas, que você anexa a modelos, colunas, sources, seeds ou snapshots em arquivos .yml. Os singular data tests são consultas soltas em arquivos .sql na pasta tests, e o nome do arquivo é o nome do teste. A documentação diz que os genéricos devem ser a maior parte da sua suíte de testes.",
"Por baixo, o genérico not_null é só isto: um select das linhas em que a coluna é nula.",
"```sql\n{% test not_null(model, column_name) %}\nselect *\nfrom {{ model }}\nwhere {{ column_name }} is null\n{% endtest %}\n```",
"Os testes rodam com dbt test, ou dentro do dbt build. Confira a versão da sua instalação: o dbt tem linhas v1 e v2 em paralelo, e alguns detalhes mudam entre elas."
], fonte: ["dbt: data tests", "https://docs.getdbt.com/docs/build/data-tests"] },
{ t: "Os quatro genéricos prontos", facil: "Traduzindo: unique acha repetido, not_null acha vazio, accepted_values acha valor fora da lista e relationships acha filha sem pai.", p: [
"O dbt já traz quatro testes genéricos: unique (sem duplicados), not_null (sem nulos), accepted_values (só valores da lista) e relationships (integridade referencial para outra tabela). Exemplo da documentação, na chave data_tests:",
"```yaml\nmodels:\n  - name: orders\n    columns:\n      - name: order_id\n        data_tests:\n          - unique\n          - not_null\n      - name: status\n        data_tests:\n          - accepted_values:\n              arguments:\n                values: ['placed', 'shipped', 'completed', 'returned']\n      - name: customer_id\n        data_tests:\n          - relationships:\n              arguments:\n                to: ref('customers')\n                field: id\n```",
"Detalhes de versão: data_tests é a chave atual e tests ainda funciona como apelido, mas não dá para ter as duas no mesmo recurso. A propriedade arguments, para as entradas do teste, está disponível a partir da v1.10.5 e é exigida na v2; em versões antigas, as entradas ficavam no nível de cima. Confira a versão da sua instalação."
], fonte: ["dbt: data tests (testes genéricos e YAML)", "https://docs.getdbt.com/docs/build/data-tests"], dica: "Mapeie direto das dimensões: unique é unicidade, not_null é completude, accepted_values é validade e relationships é consistência." },
{ t: "Testes singulares: a regra sob medida", facil: "Traduzindo: quando a regra não cabe nos quatro genéricos, escreva um SELECT que devolve as linhas ruins e salve em tests/.", p: [
"Um singular test é um arquivo .sql na pasta tests. Passa quando a consulta devolve zero linhas. Exemplo da documentação:",
"```sql\n-- tests/assert_total_payment_amount_is_positive.sql\nselect\n    order_id,\n    sum(amount) as total_amount\nfrom {{ ref('fct_payments') }}\ngroup by 1\nhaving total_amount < 0\n```",
"Cuidados citados na documentação: não termine a consulta com ponto e vírgula, porque isso pode fazer o teste falhar; os singulares da pasta tests rodam automaticamente com dbt test, e não devem ser referenciados no YAML do modelo, ou o dbt acusa erro. A descrição de um singular vai num .yml dentro da pasta tests.",
"Use singulares para regras entre colunas ou tabelas, como o total da fatura bater com a soma dos itens."
], fonte: ["dbt: data tests (testes singulares)", "https://docs.getdbt.com/docs/build/data-tests"], armadilha: "Esquecer que o teste singular precisa devolver as linhas ruins. Se você escrever a consulta no sentido contrário, ela passa quando o dado está errado." },
{ t: "Configs: severity, where e store_failures", facil: "Traduzindo: severity diz se falha bloqueia, where limita o teste a um pedaço da tabela e store_failures guarda as linhas ruins.", p: [
"severity vale error (padrão) ou warn. error_if e warn_if recebem uma condição sobre a contagem de linhas que falharam (padrão != 0). Exemplo da documentação:",
"```yaml\ndata_tests:\n  - unique:\n      config:\n        severity: error\n        error_if: '>1000'\n        warn_if: '>10'\n```",
"Com severity error, o dbt checa error_if primeiro; se não bater, checa warn_if; com warn, só olha warn_if. A config where limita o teste a um subconjunto: o dbt coloca a condição num subselect antes de testar, útil para testar só os dados recentes de uma tabela grande. A config é ignorada para testes singulares.",
"store_failures, quando true, salva as linhas que falharam numa tabela. Por padrão, no schema com o sufixo dbt_test__audit; cada execução substitui as falhas anteriores daquele teste. Pode ser definido por teste, ou em dbt_project.yml com data_tests: +store_failures: true. Pode exigir permissão para criar o schema: se aparecer permission denied, peça a quem administra o banco."
], fonte: ["dbt: severity, error_if e warn_if", "https://docs.getdbt.com/reference/resource-configs/severity"], dica: "Use store_failures nas tabelas críticas durante o desenvolvimento: abrir as linhas ruins é mais rápido que reconstruir a consulta." },
{ t: "Source freshness: o relógio da tabela", facil: "Traduzindo: o dbt compara o horário da carga mais recente com um limite e avisa ou falha se o dado estiver velho.", p: [
"O frescor é configurado na source. warn_after e error_after recebem count (inteiro positivo) e period (minute, hour ou day); loaded_at_field indica a coluna com o horário de carga. Valores na tabela sobrescrevem os da source, e freshness: null desliga a checagem. Exemplo da documentação:",
"```yaml\nsources:\n  - name: jaffle_shop\n    database: raw\n    config:\n      freshness:\n        warn_after: {count: 12, period: hour}\n        error_after: {count: 24, period: hour}\n      loaded_at_field: _etl_loaded_at\n    tables:\n      - name: customers\n      - name: orders\n        config:\n          freshness:\n            warn_after: {count: 6, period: hour}\n            error_after: {count: 12, period: hour}\n```",
"Se loaded_at_field não existe, o dbt usa metadados do warehouse quando possível. A página recomenda o comando dbt freshness (marcado como v2.0 ou superior), que checa sources e modelos com frescor configurado; dbt source freshness é o comando legado, que checa só sources e ainda funciona. Nas versões anteriores, freshness e loaded_at_field ficavam fora de config (a documentação marca a mudança nas v1.9 e v1.10). Confira a versão da sua instalação."
], fonte: ["dbt: configuração de source freshness", "https://docs.getdbt.com/reference/resource-properties/freshness"], armadilha: "Usar como loaded_at_field a data do negócio (por exemplo, a data do pedido) em vez da data de carga. Uma tabela com pedidos antigos parece velha mesmo estando em dia." },
{ t: "Unit tests e dbt build", facil: "Traduzindo: unit test confere a lógica antes de construir; dbt build constrói e testa na ordem certa e para o que depende de um teste que falhou.", p: [
"Unit tests validam a lógica SQL de um modelo contra entradas pequenas e estáticas, antes de materializar. Estão disponíveis desde o dbt v1.8. São indicados para lógica complexa (regex, datas, janelas, muitos case when) e casos de borda ainda ausentes nos dados. Declaram-se em YAML com model, given (entradas) e expect (saída esperada), em formatos dict, csv ou sql. Rodam com dbt test --select \"test_type:unit\". A documentação recomenda rodá-los só em desenvolvimento e CI, porque em produção as entradas estáticas gastam computação à toa.",
"dbt build executa modelos, testes (de dados e unitários), snapshots e seeds na ordem do DAG. Se um teste falha, os recursos que dependem dele são pulados: com unique falhando em model_a, model_b não roda (para não bloquear, use severity warn). A página marca esse comportamento como v2.0 ou superior; na v1, confira na documentação da sua versão. Num modelo com unit tests, a ordem é: unit tests, materializa o modelo, data tests; o modelo só é materializado se os unit tests passarem."
], fonte: ["dbt: unit tests", "https://docs.getdbt.com/docs/build/unit-tests"], dica: "Para as cinco tabelas críticas: data tests em tudo, unit tests só onde há lógica complexa, e dbt build como comando do CI." },
{ t: "dbt build e o bloqueio na prática", facil: "Traduzindo: um teste com severidade error que falha impede que as tabelas seguintes sejam construídas; esse é o freio.", p: [
"O comportamento de bloqueio do dbt build é o que transforma uma regra de qualidade em um portão: a tabela crítica errada não alimenta o que vem depois. Para ajustar o rigor, use severity warn nas regras em observação. O detalhe sobre falhas em testes com vários pais está na página oficial, e pode mudar entre versões: confira a versão da sua instalação.",
"Para economizar, o dbt tem a opção --empty, que constrói tabelas vazias (limita refs e sources a zero linhas, mas executa o SQL de verdade) e serve para validar dependências sem ler dados caros."
], fonte: ["dbt: comando build", "https://docs.getdbt.com/reference/commands/build"] }
],
exemplo: { t: "Do papel ao dbt: a tabela invoice", texto: "Regras da aula 2 para invoice: id repetido (bloqueia), total negativo (avisa), fatura sem cliente (bloqueia) e frescor de 1 dia. Em dbt: unique e not_null em invoice_id, relationships de customer_id para customer (ambos error); um singular tests/assert_invoice_total_not_negative.sql com config error_if e severity warn; e na source, freshness com warn_after de 12 horas e error_after de 24 horas sobre loaded_at. Rodando dbt build com 412 faturas, 2 ids repetidos fazem o unique falhar com 2 linhas ruins; o relationships passa; o total negativo devolve 5 linhas e vira só aviso. Resultado: o unique bloqueia os modelos que dependem de invoice, o aviso aparece no log, e as 2 linhas ruins ficam gravadas em uma tabela por causa de store_failures." },
prova: [
"Numa pull request, você adiciona unique e not_null a uma chave nova e roda dbt build para ver se algum modelo seguinte é pulado.",
"Um painel zera: você roda a checagem de frescor das sources para ver se a carga parou.",
"Um teste dispara 5 mil falhas: você usa store_failures e where para olhar só as linhas recentes.",
"Você refatora uma transformação com regex e escreve um unit test com casos de borda antes de mexer."
],
explique: "Explique com as próprias palavras a diferença entre teste genérico e singular, o que fazem severity, where e store_failures, e como o dbt build trata uma falha de teste.",
checagem: [
"Quais são os quatro testes genéricos prontos do dbt e a que dimensão de qualidade cada um corresponde?",
"Como um teste singular passa ou falha, e onde o arquivo fica?",
"O que significam warn_after, error_after e loaded_at_field na configuração de frescor?",
"Por que a documentação recomenda rodar unit tests só em desenvolvimento e CI?"
]
},
fontes: [
["dbt: data tests", "https://docs.getdbt.com/docs/build/data-tests"],
["dbt: severity, error_if e warn_if", "https://docs.getdbt.com/reference/resource-configs/severity"],
["dbt: config where", "https://docs.getdbt.com/reference/resource-configs/where"],
["dbt: config store_failures", "https://docs.getdbt.com/reference/resource-configs/store_failures"],
["dbt: source freshness", "https://docs.getdbt.com/reference/resource-properties/freshness"],
["dbt: unit tests", "https://docs.getdbt.com/docs/build/unit-tests"],
["dbt: comando build", "https://docs.getdbt.com/reference/commands/build"],
["dbt: configurar DuckDB", "https://docs.getdbt.com/docs/local/connect-data-platform/duckdb-setup"]
],
cartoes: [
{ id: "a5c1", t: "q3", f: "Quais são os quatro data tests genéricos prontos do dbt?", v: "unique, not_null, accepted_values e relationships." },
{ id: "a5c2", t: "q3", f: "Quando um teste singular passa?", v: "Quando a consulta do arquivo .sql na pasta tests devolve zero linhas. O nome do arquivo é o nome do teste." },
{ id: "a5c3", t: "q3", f: "Qual a chave YAML atual para declarar testes?", v: "data_tests. A chave tests ainda funciona como apelido, mas não dá para usar as duas no mesmo recurso." },
{ id: "a5c4", t: "q3", f: "Valores e padrão da config severity?", v: "error (padrão) ou warn. error_if e warn_if aceitam condições sobre a contagem de falhas, com padrão != 0." },
{ id: "a5c5", t: "q3", f: "O que faz a config where num teste?", v: "Limita o teste a um subconjunto da tabela: o dbt coloca a condição num subselect antes de aplicar o teste." },
{ id: "a5c6", t: "q3", f: "O que faz store_failures?", v: "Salva as linhas que falharam numa tabela (schema com sufixo dbt_test__audit por padrão); cada execução substitui as anteriores." },
{ id: "a5c7", t: "q3", f: "Como configurar frescor numa source?", v: "freshness com warn_after e/ou error_after (count e period), mais loaded_at_field apontando a coluna de carga." },
{ id: "a5c8", t: "q3", f: "Para que servem unit tests no dbt e onde rodá-los?", v: "Testam a lógica SQL com entradas estáticas antes de materializar. Recomenda-se rodar só em desenvolvimento e CI." },
{ id: "a5c9", t: "q3", f: "O que o dbt build faz quando um teste falha?", v: "Pula os recursos que dependem do teste falho (a página marca isso como dbt v2.0 ou superior). Para não bloquear, a severidade do teste deve ser warn." }
],
questoes: [
{ id: "a5q1", s: 1, t: "q3", e: "Você precisa garantir que order_id nunca se repita nem seja nulo na tabela orders, e que status só tenha placed, shipped, completed ou returned. Qual conjunto de testes do dbt atende isso com o mínimo de código?", o: ["Um arquivo .sql em tests com quatro consultas", "unique e not_null em order_id e accepted_values em status, tudo declarado como data_tests no YAML do modelo", "relationships em order_id", "Um unit test para cada coluna", "source freshness em orders"], c: [1], x: "Os genéricos unique, not_null e accepted_values cobrem exatamente os três requisitos e se declaram no YAML, sem SQL. Um singular com quatro consultas funcionaria mas é mais código e a documentação recomenda genéricos como a maior parte da suíte. relationships valida referência a outra tabela, o que não é pedido. Unit tests validam lógica com entradas fixas, não os dados reais. Freshness mede a idade da carga." },
{ id: "a5q2", s: 1, t: "q3", e: "A regra é: o total de cada pedido deve ser igual à soma dos itens, com diferença menor que 0,01. Nenhum genérico pronto serve. Como implementar no dbt?", o: ["accepted_values com o total", "Um singular test em tests/ cujo SELECT devolve os pedidos em que a diferença é maior ou igual a 0,01, sem ponto e vírgula no final", "Um unit test", "Um source freshness com loaded_at_field", "unique no total"], c: [1], x: "Regras entre tabelas ou colunas sob medida são casos de singular test: um SELECT das linhas ruins em tests/, que passa com zero linhas; a documentação alerta para não usar ponto e vírgula final. accepted_values compara com lista fixa. Unit test não verifica dados reais. Freshness mede atualidade. unique no total checaria repetição de valores, o que não tem relação com a regra." },
{ id: "a5q3", s: 1, t: "q3", e: "Um teste unique numa tabela enorme falha com 7 linhas ruins e você não quer parar o pipeline por menos de 10 linhas, mas quer parar acima de 1000. Qual configuração do dbt expressa isso?", o: ["severity: error sem outras configs", "severity: error com warn_if: '>0' e error_if: '>1000'", "where: 'true'", "store_failures: false", "freshness: null"], c: [1], x: "error_if e warn_if recebem condições sobre a contagem de linhas que falharam. Com severity error, o dbt checa error_if primeiro (>1000, não bateu) e depois warn_if (>0, bateu), então emite aviso e o pipeline segue. Só severity error tornaria qualquer falha um erro. where limita as linhas testadas, store_failures só guarda as linhas e freshness: null desliga o frescor de uma source." },
{ id: "a5q4", s: 1, t: "q3", e: "A tabela de eventos tem bilhões de linhas e você só quer testar not_null nos dados do dia atual para economizar custo. Qual recurso usar?", o: ["store_failures", "A config where no teste, com a condição de data", "Um model contract", "A chave tests em vez de data_tests", "O comando dbt source freshness"], c: [1], x: "A config where faz o dbt colocar a condição em um subselect e testar apenas aquele subconjunto, reduzindo o custo. store_failures grava as linhas ruins, não filtra. Model contract valida a forma das colunas. Trocar data_tests por tests é só o apelido antigo. Source freshness checa a idade da carga, não valores nulos." },
{ id: "a5q5", s: 1, t: "q3", e: "(Escolha duas) Você vai configurar a checagem de frescor das sources de um projeto dbt para as tabelas críticas. Quais afirmações sobre source freshness estão corretas?", o: ["warn_after e error_after recebem count e period (minute, hour ou day)", "loaded_at_field deve apontar a data do negócio, como a data do pedido", "Valores definidos na tabela sobrescrevem os da source, e freshness: null desliga a checagem", "A checagem só funciona se não houver nenhuma configuração", "O frescor é checado por dbt test"], c: [0, 2], x: "A documentação define warn_after e error_after com count positivo e period minute, hour ou day, e a hierarquia em que a tabela sobrescreve a source, com freshness: null para excluir. O loaded_at_field deve ser o horário de carga, e usar data do negócio gera falso alarme. A checagem exige configuração de freshness. Frescor é verificado por dbt freshness (ou o antigo dbt source freshness), não pelo dbt test." },
{ id: "a5q6", s: 1, t: "q3", e: "No CI você roda dbt build (dbt v2, conforme a documentação). O teste unique em stg_invoice (severity error) falha. O modelo fct_sales depende de stg_invoice. Qual o comportamento esperado e como evitar o bloqueio se a regra fosse apenas informativa?", o: ["fct_sales é construído normalmente; nada muda", "fct_sales é pulado; para não bloquear, definir a severity do teste como warn", "O build apaga stg_invoice", "O dbt repete o teste três vezes", "fct_sales é construído e depois removido"], c: [1], x: "No dbt build, falhas de teste com severidade error bloqueiam os recursos que dependem do que foi testado, e fct_sales é pulado. A documentação indica mudar a severity para warn quando o teste não deve bloquear. Construir normalmente ignoraria o portão; apagar tabela, repetir o teste ou remover depois não são comportamentos descritos." }
],
lab: {
t: "Regras da tabela crítica como dbt tests (ou SQL equivalente)",
custo: "gratuito",
tempo: "30 a 40 min",
porque: "Aqui as regras de quebra da aula 2 viram código versionado e executável. A evidência é o arquivo YAML dos testes e o resultado do dbt build (ou das consultas) com contagens de falhas.",
antes: "Modo A (No Snowfox): use o projeto dbt existente em ambiente de desenvolvimento, crie uma branch e adicione os testes de uma tabela crítica; não rode contra produção. Modo B (Sem acesso): use o DuckDB com o Chinook; a página do DuckDB na documentação do dbt diz que o adaptador DuckDB é embutido na v2; para a v1, a página não traz instruções de instalação (só cita o dbt-duckdb de passagem), então confira a versão da sua instalação (dbt --version) e a documentação do adaptador. Sem dbt, rode as mesmas regras como SQL no DuckDB (passo 5). Os passos foram conferidos contra a documentação, não foram executados no seu ambiente. Você verá no terminal as linhas PASS, WARN e FAIL de cada teste.",
passos: [
{ t: "Copiar o Chinook para um arquivo DuckDB", cmd: "duckdb chinook.duckdb\nATTACH 'Chinook_Sqlite.sqlite' AS ch (TYPE sqlite);\nCREATE TABLE invoice AS SELECT * FROM ch.Invoice;\nCREATE TABLE customer AS SELECT * FROM ch.Customer;", p: "Modo B: cria o arquivo chinook.duckdb com as tabelas que serão a source do dbt. No Modo A, pule este passo: a source já existe no seu projeto." },
{ t: "Configurar o perfil", cmd: "chinook_q:\n  target: dev\n  outputs:\n    dev:\n      type: duckdb\n      path: './chinook.duckdb'", p: "Em profiles.yml, conforme a documentação do DuckDB no dbt. Rode dbt debug para validar a conexão. O nome do perfil precisa ser o mesmo de profile em dbt_project.yml." },
{ t: "Declarar a source com frescor e os testes", cmd: "sources:\n  - name: chinook\n    schema: main\n    tables:\n      - name: customer\n      - name: invoice\n        columns:\n          - name: InvoiceId\n            data_tests: [unique, not_null]\n          - name: CustomerId\n            data_tests:\n              - relationships:\n                  arguments:\n                    to: source('chinook', 'customer')\n                    field: CustomerId", p: "Em models/sources.yml. Para frescor, acrescente freshness com warn_after e error_after e um loaded_at_field (no Chinook, InvoiceDate serve só como demonstração e o teste vai falhar por o banco ser estático). Ajuste nomes de colunas conforme DESCRIBE." },
{ t: "Um singular e uma config", cmd: "-- tests/assert_invoice_total_not_negative.sql\n{{ config(severity='warn') }}\nselect * from {{ source('chinook', 'invoice') }}\nwhere Total < 0", p: "Salve em tests/. Sem ponto e vírgula no final. Depois rode dbt test (ou dbt build, se tiver modelos) e anote os resultados." },
{ t: "Sem dbt: as mesmas regras em SQL", cmd: "SELECT InvoiceId FROM invoice WHERE InvoiceId IS NULL;\nSELECT InvoiceId, count(*) FROM invoice GROUP BY 1 HAVING count(*) > 1;\nSELECT i.* FROM invoice i LEFT JOIN customer c ON c.CustomerId = i.CustomerId WHERE c.CustomerId IS NULL;", p: "Equivale a not_null, unique e relationships. Zero linhas é passou. Registre a contagem de cada uma." }
],
verificar: "Você tem o sources.yml com os testes, o singular em tests/, a saída do dbt test com PASS, WARN ou FAIL por teste (ou a contagem das consultas equivalentes) e uma nota dizendo qual regra bloquearia e qual só avisaria.",
limpar: [
"Guarde sources.yml, o arquivo do singular e uma captura da saída do dbt test (sem dados pessoais) como evidência.",
"Não commite chinook.duckdb, .sqlite, nem profiles.yml com credenciais; use variáveis de ambiente (env_var) para segredos.",
"Se usou store_failures, apague o schema dbt_test__audit de desenvolvimento ao final."
],
erros: [
{ s: "Could not find profile ou erro no dbt debug", c: "O nome do perfil em dbt_project.yml difere do nome em profiles.yml, ou o arquivo está noutra pasta.", r: "Alinhe os nomes, confira onde está o profiles.yml e rode dbt debug de novo." },
{ s: "Erro de coluna não encontrada nos testes", c: "O nome da coluna difere (maiúsculas, nomes do Chinook) ou a tabela foi copiada com outros nomes.", r: "Use DESCRIBE invoice no DuckDB e copie os nomes exatos para o YAML." },
{ s: "Erro de parse ao usar a chave arguments", c: "A sua versão do dbt é anterior à que aceita arguments (disponível a partir da v1.10.5).", r: "Atualize o dbt ou, em versões antigas, coloque as entradas do teste no nível de cima, conforme a documentação da sua versão." },
{ s: "Teste singular falha sem motivo claro", c: "Ponto e vírgula no final da consulta, ou o teste está listado também no YAML do modelo.", r: "Remova o ponto e vírgula e retire a referência ao singular do YAML." }
]
}
};
C.dias[6] = {
aula: {
titulo: "Great Expectations e Soda: validação fora do dbt",
resumo: "Como o Great Expectations (GX Core) organiza validações em Expectations, Suites, Validation Definitions e Checkpoints, como o Soda descreve verificações em YAML (contratos na linha atual, SodaCL na v3), e como decidir entre eles e os testes do dbt.",
simples: {
analogia: "Imagine que o dbt é o fiscal que trabalha dentro da cozinha: vê cada receita sendo feita e barra o prato errado ali mesmo. Mas nem todo alimento passa pela cozinha: há o que chega de caminhão direto na despensa, o que vem de outro restaurante, o que fica numa geladeira que o fiscal não alcança. Para esses casos você contrata um fiscal externo, com a própria prancheta, que confere o lote onde ele estiver e entrega um relatório. Great Expectations e Soda são fiscais externos de duas marcas: um pede que você descreva, em Python, cada afirmação sobre o lote e agrupe em listas; o outro pede uma folha em YAML com as verificações. A pergunta é de onde o dado vem e quem vai ler o relatório.",
pontos: [
"GX Core: você descreve Expectations em Python, agrupa em Suites e executa por Checkpoints.",
"Soda: as verificações ficam em YAML; a linha atual usa contratos e a v3 usa SodaCL.",
"Ambos servem quando o dado não passa pelo dbt ou quando a validação precisa rodar fora do build.",
"dbt tests continuam a melhor escolha para dados que o dbt produz e já conhece.",
"A decisão depende de onde o dado está, de quem mantém a regra e de como o resultado é consumido."
],
paraQueServe: "Saber escolher a ferramenta certa para validar dados que não passam pelo dbt, e conseguir ler uma suíte de regras em Great Expectations ou Soda sem se perder nos nomes."
},
glossario: [
{ t: "Expectation (GX)", d: "Afirmação verificável sobre os dados, equivalente a uma asserção de teste unitário, como valores de uma coluna não nulos." },
{ t: "Expectation Suite", d: "Coleção de Expectations que pode ser aplicada a um ou mais Batches de dados." },
{ t: "Batch Definition", d: "Define como organizar os registros de um Data Asset e permite recuperar um Batch na hora da execução." },
{ t: "Validation Definition", d: "Liga um Batch Definition a uma Expectation Suite: define que dado é conferido contra quais Expectations." },
{ t: "Checkpoint", d: "Executa uma lista de Validation Definitions com parâmetros compartilhados e pode disparar Actions, como atualizar Data Docs." },
{ t: "Data Docs", d: "Documentação legível gerada pelo GX com as definições das Suites e os resultados das validações." },
{ t: "SodaCL", d: "Linguagem de verificações do Soda v3, escrita em YAML, com linhas como row_count > 0 ou missing_count(coluna) = 0." },
{ t: "Contrato Soda", d: "Arquivo YAML da linha atual do Soda com dataset, columns e checks (missing, invalid, duplicate, freshness e outros), verificado por soda contract verify." }
],
blocos: [
{ t: "GX Core: o mapa de conceitos", facil: "Traduzindo: no GX você liga o dado a uma lista de afirmações e roda tudo por um Checkpoint.", p: [
"A visão geral do GX Core descreve esta cadeia. Data Context é o objeto Python que dá acesso às configurações e resultados. Data Source representa o local dos dados e como se conectar. Data Asset é uma coleção de registros, como uma tabela ou o resultado de uma consulta. Batch Definition organiza esses registros e recupera um Batch na execução.",
"Do outro lado, uma Expectation é uma afirmação verificável sobre os dados. Várias formam uma Expectation Suite. A Validation Definition liga um Batch Definition a uma Suite. O Checkpoint, a forma principal de validar em produção, executa uma lista de Validation Definitions e pode disparar Actions. O resultado são os Validation Results, e os Data Docs os apresentam em formato legível.",
"A documentação consultada mostra a versão 1.24.1 do GX Core; confira a versão da sua instalação."
], fonte: ["GX Core: visão geral", "https://docs.greatexpectations.io/docs/core/introduction/gx_overview"], dica: "Memorize em duas metades: dado (Source, Asset, Batch Definition) e regras (Expectation, Suite), unidas pela Validation Definition e executadas pelo Checkpoint." },
{ t: "GX Core: a primeira Expectation em código", facil: "Traduzindo: crie o contexto, conecte o DataFrame, descreva a afirmação e valide o lote.", p: [
"Instalação: pip install great_expectations (a página indica Python 3.10 a 3.14). O exemplo oficial valida um DataFrame do pandas:",
"```python\nimport great_expectations as gx\nimport pandas as pd\n\ncontext = gx.get_context()\ndf = pd.read_csv('arquivo.csv')\n\ndata_source = context.data_sources.add_pandas('pandas')\ndata_asset = data_source.add_dataframe_asset(name='pd dataframe asset')\nbatch_definition = data_asset.add_batch_definition_whole_dataframe('batch definition')\nbatch = batch_definition.get_batch(batch_parameters={'dataframe': df})\n\nexpectation = gx.expectations.ExpectColumnValuesToBeBetween(\n    column='passenger_count', min_value=1, max_value=6, severity='warning'\n)\nvalidation_result = batch.validate(expectation)\nprint(validation_result)\n```",
"Segundo a página Create an Expectation, a Expectation aceita mostly (validação fuzzy: passa se o percentual de linhas válidas for pelo menos o valor informado) e severity, com os valores critical, warning ou info (padrão critical). É o equivalente da tolerância e da gravidade da aula 2."
], fonte: ["GX Core: experimente", "https://docs.greatexpectations.io/docs/core/introduction/try_gx"], armadilha: "Copiar exemplos de versões antigas da internet. O GX 1.x mudou a API (Data Context, Validation Definition, Checkpoint); sempre confira a versão da sua instalação e use a documentação dela." },
{ t: "GX Core: Suite, Validation Definition e Checkpoint", facil: "Traduzindo: agrupe as Expectations numa Suite, ligue ao dado numa Validation Definition e rode pelo Checkpoint.", p: [
"Passos documentados: criar a Suite, adicionar Expectations, criar a Validation Definition e criar o Checkpoint.",
"```python\nsuite = gx.ExpectationSuite(name='my_expectation_suite')\nsuite = context.suites.add(suite)\nsuite.add_expectation(\n    gx.expectations.ExpectColumnValuesToNotBeNull(column='passenger_count')\n)\n\nvalidation_definition = gx.ValidationDefinition(\n    data=batch_definition, suite=suite, name='my_validation_definition'\n)\nvalidation_definition = context.validation_definitions.add(validation_definition)\n\ncheckpoint = gx.Checkpoint(\n    name='my_checkpoint',\n    validation_definitions=[validation_definition],\n)\ncontext.checkpoints.add(checkpoint)\n\nresults = checkpoint.run(batch_parameters={'dataframe': df})\n```",
"A página de Checkpoint mostra a criação com validation_definitions e actions (por exemplo, UpdateDataDocsAction e notificação no Slack em caso de falha). A execução usa checkpoint.run com batch_parameters, cujas chaves dependem do Batch Definition: um DataFrame inteiro usa a chave dataframe (como no exemplo oficial de get_batch), e a execução devolve os Validation Results. Para ler o sucesso, a página Try GX mostra que o resultado do Checkpoint, em describe(), traz um success geral e um por Expectation. A criação da Suite está na página de Suites e a execução, na página de rodar Checkpoint (ambas em fontes)."
], fonte: ["GX Core: criar um Checkpoint com Actions", "https://docs.greatexpectations.io/docs/core/trigger_actions_based_on_results/create_a_checkpoint_with_actions"], dica: "Chaves de segredo, como tokens do Slack, ficam em variáveis de ambiente (a documentação usa substituições como ${nome}), nunca no código." },
{ t: "Soda: a linha atual usa contratos", facil: "Traduzindo: no Soda atual você descreve o dataset e as verificações num YAML e roda soda contract verify.", p: [
"A documentação atual do Soda organiza o produto em torno de contratos de dados. Um contrato é um YAML com dataset (no formato fonte/banco/schema/tabela), um bloco checks para verificações do dataset e uma lista columns com verificações por coluna. Tipos de verificação documentados: schema, row_count, freshness, missing, invalid, duplicate, aggregate, metric, failed_rows e group_by. Limiares usam must_be, must_be_greater_than, must_be_between e outros; um limiar adicional com level: warn cria faixa de aviso (exige versão recente do Runner). Exemplo adaptado da página:",
"```yaml\ndataset: datasource/db/schema/dataset\n\nchecks:\n  - row_count:\n      threshold:\n        must_be_greater_than: 100\n\ncolumns:\n  - name: id\n    checks:\n      - missing:\n          threshold:\n            metric: percent\n            must_be_less_than: 5\n```",
"O README do repositório do Soda Core o descreve como um mecanismo de verificação de qualidade de dados e de contratos; instala-se um pacote por fonte de dados, como pip install soda-postgres, e a execução é soda contract verify -ds ds_config.yml -c contract.yml. Atenção: a página de início rápido afirma que o pacote soda vem de um índice PyPI privado e exige licença Team ou Enterprise, fora do Runner, enquanto o README do repositório mostra o pip comum. Confira as condições na documentação antes de planejar."
], fonte: ["Soda: referência da linguagem de contratos", "https://docs.soda.io/soda-documentation/developer-tools/contract-language-reference.md"], armadilha: "Seguir tutoriais antigos com soda scan e checks.yml numa instalação nova. Na linha atual o comando é soda contract verify; scan e SodaCL pertencem à v3." },
{ t: "Soda v3 e SodaCL: legado que ainda aparece", facil: "Traduzindo: SodaCL é a linguagem da v3; você a encontrará em projetos existentes, mas a linha nova usa contratos.", p: [
"O README do Soda Core diz que os pacotes legados da v3 se chamam soda-core-{fonte} (para ficar na v3, fixe a versão, como soda-core-postgres~=3.5.0) e aponta para a documentação da v3 dentro do próprio repositório. A documentação v3 ainda está no site, sob o caminho soda-v3.",
"SodaCL é uma linguagem de confiabilidade de dados baseada em YAML: você escreve checks num arquivo e um scan os executa. Exemplo da página:",
"```yaml\nchecks for dim_customer:\n  - row_count between 10 and 1000\n  - missing_count(birth_date) = 0\n  - duplicate_count(phone) = 0\n```",
"Cada verificação devolve pass, fail ou error, e é possível configurar alerta para avisar (warn) em vez de falhar; para a sintaxe exata, confira a página de SodaCL. O comando documentado na v3 é soda scan -d fonte -c configuration.yml checks.yml. A tradução para o que você já conhece é direta: missing_count é completude e duplicate_count é unicidade."
], fonte: ["Soda v3: escrever verificações SodaCL", "https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview"], dica: "Ao ler uma regra Soda, traduza para a dimensão: missing é completude, duplicate é unicidade, invalid é validade, freshness é atualidade." },
{ t: "Quando usar cada um e como decidir", facil: "Traduzindo: dado que o dbt produz fica com dbt tests; dado fora do dbt, ou validação com fluxo e relatório próprios, pede GX ou Soda.", p: [
"Esta parte é critério de decisão, não afirmação das documentações: avalie as perguntas abaixo para cada tabela crítica.",
"Os três têm a mesma ideia central, uma regra que passa ou falha sobre dados reais; as diferenças estão no lugar, na linguagem e no resultado."
], tabela: { cab: ["Pergunta", "dbt tests", "Great Expectations", "Soda"], linhas: [
["Onde a regra mora", "No projeto dbt, junto do modelo", "Em código Python", "Em YAML (contrato ou SodaCL)"],
["Dado que passa pelo dbt?", "Primeira escolha", "Desnecessário", "Desnecessário"],
["Dado fora do dbt (arquivo, DataFrame, ingestão)", "Não se aplica", "Boa opção, valida DataFrames", "Boa opção por contrato em YAML"],
["Quem escreve a regra", "Engenharia de dados em SQL e YAML", "Quem programa em Python", "Quem prefere YAML declarativo"],
["Resultado", "Log do dbt e store_failures", "Validation Results e Data Docs", "Resultado do verify, opcionalmente em Soda Cloud"]
] }, dica: "Comece pelo que a equipe já usa. Três ferramentas para as mesmas cinco tabelas é complexidade sem ganho." }
],
exemplo: { t: "Mesma regra, três ferramentas", texto: "Regra da tabela invoice: InvoiceId não pode ser nulo nem repetido, e Total não pode ser negativo. No dbt: unique e not_null em InvoiceId e um singular para Total, rodando no dbt build. No GX: uma Suite com ExpectColumnValuesToNotBeNull e ExpectColumnValuesToBeBetween em Total com min_value=0, ligada ao DataFrame por uma Validation Definition e executada por um Checkpoint. No Soda atual: um contrato com missing e duplicate em InvoiceId e um invalid com valid_min em Total. Decisão para um arquivo de faturas que chega por ingestão e não passa pelo dbt: GX, porque o time já programa em Python e consegue validar o DataFrame antes de gravar. Para a tabela que o dbt constrói: ficar com dbt tests, sem ferramenta nova." },
prova: [
"Um arquivo CSV de fornecedor chega fora do dbt: você valida o DataFrame com GX antes de gravar no lakehouse.",
"Em outro time você encontra um checks.yml com missing_count e duplicate_count: reconhece que é SodaCL da v3 e traduz as regras.",
"Numa revisão de arquitetura, alguém propõe adicionar GX às tabelas do dbt: você explica quando não compensa.",
"Um Checkpoint falha na pipeline e você abre os Validation Results para ver qual Expectation quebrou."
],
explique: "Explique com as próprias palavras a cadeia de conceitos do GX (do dado ao Checkpoint), como o Soda descreve verificações e como você decidiria entre dbt tests, GX e Soda para uma tabela nova.",
checagem: [
"Qual a função de uma Validation Definition e de um Checkpoint no GX Core?",
"Qual a diferença entre contratos Soda e SodaCL, e qual comando roda cada um?",
"Em que situação você escolheria GX ou Soda em vez de dbt tests?",
"O que significam mostly e severity numa Expectation do GX?"
]
},
fontes: [
["GX Core: visão geral", "https://docs.greatexpectations.io/docs/core/introduction/gx_overview"],
["GX Core: experimente", "https://docs.greatexpectations.io/docs/core/introduction/try_gx"],
["GX Core: criar uma Expectation (mostly e severity)", "https://docs.greatexpectations.io/docs/core/define_expectations/create_an_expectation/"],
["GX: ExpectColumnValuesToBeUnique", "https://greatexpectations.io/expectations/expect_column_values_to_be_unique"],
["DuckDB: exportar para pandas (.df())", "https://duckdb.org/docs/2.0/guides/python/export_pandas.html"],
["GX Core: criar Suite", "https://docs.greatexpectations.io/docs/core/define_expectations/organize_expectation_suites"],
["GX Core: criar Validation Definition", "https://docs.greatexpectations.io/docs/core/run_validations/create_a_validation_definition"],
["GX Core: Checkpoint com Actions", "https://docs.greatexpectations.io/docs/core/trigger_actions_based_on_results/create_a_checkpoint_with_actions"],
["GX Core: rodar um Checkpoint", "https://docs.greatexpectations.io/docs/core/trigger_actions_based_on_results/run_a_checkpoint/"],
["Soda: início rápido", "https://docs.soda.io/soda-documentation/get-started/quickstart.md"],
["Soda: linguagem de contratos", "https://docs.soda.io/soda-documentation/developer-tools/contract-language-reference.md"],
["Soda Core no GitHub", "https://github.com/sodadata/soda-core"],
["Soda v3: SodaCL", "https://docs.soda.io/soda-documentation/soda-v3/soda-cl-overview"],
["Soda v3: métricas numéricas", "https://docs.soda.io/soda-documentation/soda-v3/sodacl-reference/numeric-metrics"]
],
cartoes: [
{ id: "a6c1", t: "q4", f: "O que é uma Expectation no GX?", v: "Uma afirmação verificável sobre os dados, comparável a uma asserção de teste unitário." },
{ id: "a6c2", t: "q4", f: "Para que serve a Expectation Suite?", v: "Agrupa várias Expectations e pode ser aplicada a um ou mais Batches de dados." },
{ id: "a6c3", t: "q4", f: "O que a Validation Definition liga?", v: "Um Batch Definition (o dado) a uma Expectation Suite (as regras): define que dado é conferido contra quais Expectations." },
{ id: "a6c4", t: "q4", f: "Qual o papel do Checkpoint no GX Core?", v: "É a forma principal de validar em produção: roda Validation Definitions com parâmetros compartilhados e dispara Actions." },
{ id: "a6c5", t: "q4", f: "Valores da severity de uma Expectation do GX?", v: "critical (padrão), warning e info. O parâmetro mostly define o percentual mínimo de linhas que precisam passar." },
{ id: "a6c6", t: "q4", f: "Como se roda um contrato Soda na linha atual?", v: "Com soda contract verify -ds ds_config.yml -c contract.yml, conforme o README do Soda Core." },
{ id: "a6c7", t: "q4", f: "O que é SodaCL e a que versão pertence?", v: "Linguagem de checks em YAML da v3 (por exemplo, row_count > 0), executada por soda scan. A documentação v3 fica sob o caminho soda-v3." },
{ id: "a6c8", t: "q4", f: "Quando preferir GX ou Soda a dbt tests?", v: "Quando o dado não passa pelo dbt (arquivo, DataFrame, ingestão) ou a validação precisa de fluxo e relatório próprios." },
{ id: "a6c9", t: "q4", f: "O que são os Data Docs do GX?", v: "Documentação legível gerada pelo GX com as definições das Suites e os resultados das validações." }
],
questoes: [
{ id: "a6q1", s: 1, t: "q4", e: "Um arquivo CSV de um parceiro chega todo dia a um bucket e é carregado em Python antes de entrar no lakehouse; não há projeto dbt envolvido nessa etapa. Você quer validar não nulos e faixa de valores sobre o DataFrame antes de gravar. Qual escolha se encaixa melhor?", o: ["dbt tests, que funcionam sobre qualquer DataFrame", "Great Expectations, validando o DataFrame com Expectations e um Checkpoint", "Um unit test do dbt", "source freshness do dbt", "Nenhuma ferramenta: confiar no parceiro"], c: [1], x: "O GX Core valida DataFrames e organiza Expectations em Suites e Checkpoints, o que atende a validação antes de gravar fora do dbt. Os dbt tests rodam sobre o que o dbt conhece no warehouse, não sobre um DataFrame em memória. Unit test do dbt testa lógica de modelo com entradas fixas e source freshness mede idade da carga. Confiar no parceiro abandona a proteção da tabela crítica." },
{ id: "a6q2", s: 1, t: "q4", e: "Você precisa explicar a um colega quem une o dado às regras no GX Core. Qual objeto faz a ligação entre um Batch Definition e uma Expectation Suite?", o: ["Data Docs", "Validation Definition", "Data Source", "Expectation", "Action"], c: [1], x: "A Validation Definition liga um Batch Definition a uma Expectation Suite e define que dado é conferido contra quais Expectations. Data Docs só apresentam resultados em formato legível. Data Source representa a conexão com a origem dos dados. Uma Expectation é uma única afirmação, não a ligação. Action é o que um Checkpoint dispara após validar, como notificação." },
{ id: "a6q3", s: 1, t: "q4", e: "Um colega herdou um repositório com um arquivo checks.yml que contém linhas como missing_count(birth_date) = 0 e duplicate_count(phone) = 0 e um comando soda scan. Como classificar essa configuração?", o: ["Contrato Soda da linha atual", "SodaCL, da linha v3 do Soda, ainda documentada sob soda-v3", "Uma Expectation Suite do GX", "Um singular test do dbt", "Um model contract do dbt"], c: [1], x: "Verificações escritas como missing_count(coluna) = 0 e executadas por soda scan são SodaCL, da v3, cuja documentação continua publicada sob o caminho soda-v3; os pacotes legados se chamam soda-core-{fonte}. Contratos da linha atual têm dataset, columns e checks e usam soda contract verify. Suites são conceito do GX, singular tests e model contracts são do dbt." },
{ id: "a6q4", s: 1, t: "q4", e: "Uma tabela crítica é construída por modelos dbt e você já tem unique e not_null nela. Um colega sugere adicionar GX e Soda por cima para as mesmas regras. Qual a resposta mais sensata?", o: ["Adicionar as duas, mais ferramenta é sempre mais segurança", "Manter dbt tests para o que o dbt produz e adotar outra ferramenta apenas quando houver dado fora do dbt ou uma necessidade que o dbt não cubra", "Remover os testes do dbt", "Trocar tudo por GX", "Rodar os testes só uma vez por mês"], c: [1], x: "Regras duplicadas em ferramentas diferentes aumentam manutenção e alertas sem ganho de proteção. Para dados que o dbt produz, dbt tests são a primeira escolha; GX ou Soda entram para dado fora do dbt ou necessidade específica. Remover ou trocar tudo joga fora o que já funciona e rodar uma vez por mês atrasa a detecção." },
{ id: "a6q5", s: 1, t: "q4", e: "(Escolha duas) Sobre Expectations do Great Expectations na documentação consultada, quais afirmações estão corretas?", o: ["mostly define o percentual mínimo de linhas que precisam validar para a Expectation passar", "severity aceita critical, warning ou info, com padrão critical", "severity só aceita true ou false", "Expectation é o mesmo que Checkpoint", "mostly é obrigatório em toda Expectation"], c: [0, 1], x: "A documentação descreve mostly como argumento opcional de validação fuzzy por percentual de linhas e severity com critical (padrão), warning e info. severity não é booleana, Expectation e Checkpoint são conceitos diferentes (uma é afirmação, o outro executa Validation Definitions) e mostly é opcional." },
{ id: "a6q6", s: 1, t: "q4", e: "Você começa um tutorial do Soda e vê que a documentação atual pede soda contract verify com um YAML de dataset e columns, mas um tutorial de blog usa soda scan e checks for. Qual atitude está alinhada ao aprendizado pela documentação oficial?", o: ["Seguir o blog, que é mais fácil", "Confirmar na documentação oficial qual linha (contratos atuais ou v3) a sua instalação usa e seguir só essa", "Misturar os dois comandos", "Instalar as duas versões no mesmo ambiente", "Ignorar a versão"], c: [1], x: "Soda tem duas linhas documentadas: contratos (soda contract verify) e SodaCL da v3 (soda scan). Cada uma tem pacotes e comandos próprios, então a atitude correta é identificar a que sua instalação usa na documentação oficial. Blogs envelhecem, misturar comandos gera erros, instalar as duas no mesmo ambiente causa conflitos e ignorar a versão leva a seguir instruções que não existem na sua instalação." }
],
lab: {
t: "Validar a tabela crítica com Great Expectations (ou Soda)",
custo: "gratuito",
tempo: "30 a 40 min",
porque: "Repetir as regras da aula 5 numa ferramenta fora do dbt mostra a diferença na prática. A evidência é o script de validação e o resultado (Validation Results) da execução.",
antes: "Modo A (No Snowfox): extraia uma amostra pequena da tabela crítica, de ambiente de desenvolvimento, para um DataFrame; sem colunas de dado pessoal e sem salvar a amostra em disco. Modo B (Sem acesso): use o Chinook (Chinook_Sqlite.sqlite, release do repositório oficial lerocha/chinook-database) lido via DuckDB. Instale com pip install great_expectations (Python 3.10 a 3.14 segundo a documentação), mais pandas e duckdb. Os trechos de GX seguem a documentação; a conversão do resultado do DuckDB em DataFrame com .df() está no guia de exportação para pandas do DuckDB, e a Expectation de unicidade chama-se ExpectColumnValuesToBeUnique (página da Expectation Gallery). A combinação do GX com um DataFrame vindo do DuckDB não aparece pronta na documentação do GX: confira. Nada foi executado no seu ambiente. Para Soda, o caminho é um contrato YAML e soda contract verify; confira antes o pacote e a licença necessários.",
passos: [
{ t: "Ambiente", cmd: "python -m venv .venv\n.venv\\Scripts\\activate\npip install great_expectations pandas duckdb", p: "Crie um ambiente virtual isolado (no Windows, o activate fica em Scripts) e instale as dependências. Confira a versão instalada com pip show great_expectations." },
{ t: "Carregar a tabela num DataFrame", cmd: "import duckdb\ncon = duckdb.connect()\ncon.execute(\"ATTACH 'Chinook_Sqlite.sqlite' AS ch (TYPE sqlite)\")\ndf = con.sql('SELECT * FROM ch.Invoice').df()\nprint(df.shape)", p: "Modo B. A extensão sqlite é carregada automaticamente no primeiro uso, segundo a documentação do DuckDB. No Modo A, preencha o DataFrame com a amostra da tabela crítica de desenvolvimento." },
{ t: "Conectar o dado e definir a Suite", cmd: "import great_expectations as gx\ncontext = gx.get_context()\nds = context.data_sources.add_pandas('pandas')\nasset = ds.add_dataframe_asset(name='invoice')\nbd = asset.add_batch_definition_whole_dataframe('inteiro')\nsuite = context.suites.add(gx.ExpectationSuite(name='invoice_suite'))\nsuite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(column='InvoiceId'))\nsuite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(column='Total', min_value=0))", p: "Duas Expectations espelham as regras da aula 5: não nulo na chave e total não negativo. Se quiser unicidade, acrescente ExpectColumnValuesToBeUnique(column='InvoiceId'), nome da Expectation de unicidade na Expectation Gallery (confira a versão instalada)." },
{ t: "Validation Definition e Checkpoint", cmd: "vd = context.validation_definitions.add(gx.ValidationDefinition(data=bd, suite=suite, name='invoice_vd'))\ncp = context.checkpoints.add(gx.Checkpoint(name='invoice_cp', validation_definitions=[vd]))\nresultado = cp.run(batch_parameters={'dataframe': df})\nprint(resultado)", p: "Liga dado e regras, cria o Checkpoint e executa. Leia no resultado impresso quais Expectations passaram (procure o campo success; a página Try GX mostra o success geral e por Expectation em checkpoint_result.describe())." },
{ t: "Provocar uma falha e registrar", cmd: "df.loc[0, 'Total'] = -1", p: "Altere uma linha do DataFrame em memória, rode o Checkpoint de novo e confirme que a Expectation de faixa falha. Salve o script como validacao_q4.py e a saída num arquivo texto, sem dados pessoais." }
],
verificar: "O primeiro run passa nas duas Expectations e o segundo, com um valor negativo provocado, mostra a de faixa falhando. Você tem o script validacao_q4.py e a saída das duas execuções.",
limpar: [
"Guarde validacao_q4.py e a saída como evidência; apague amostras de dados do Snowfox da máquina.",
"Não commite .sqlite, a pasta do Data Context com resultados que contenham linhas reais, nem tokens (Slack ou Soda Cloud): use variáveis de ambiente.",
"Desative o ambiente virtual e apague a pasta .venv se não for reutilizar."
],
erros: [
{ s: "AttributeError ou nome de classe inexistente em gx.expectations", c: "A versão instalada do GX difere da documentada, ou o nome da Expectation está errado.", r: "Rode pip show great_expectations, abra a documentação da mesma versão e confirme o nome exato da Expectation." },
{ s: "Erro ao rodar o Checkpoint sobre DataFrame", c: "Faltou passar batch_parameters com a chave dataframe, que o Batch Definition de DataFrame inteiro exige.", r: "Passe batch_parameters={'dataframe': df} em checkpoint.run, como mostra a documentação." },
{ s: "Mismatch Type Error ao ler o SQLite no DuckDB", c: "O SQLite não impõe tipos e o DuckDB impõe: algum valor não bate com o tipo mapeado.", r: "Use SET GLOBAL sqlite_all_varchar = true antes do ATTACH, conforme a documentação do DuckDB, e converta as colunas no pandas." }
]
}
};
})(typeof window !== 'undefined' ? window : globalThis);
