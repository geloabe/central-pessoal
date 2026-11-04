// Valida o conteúdo da trilha de gramática do inglês (assets/gram/*.js). Rodar: node scripts/valida-conteudo-gram.mjs
// Regras: esquema completo, tamanho mínimo, ids únicos, FONTES OFICIAIS (domínios permitidos), respostas válidas. Sai com código 1 se algo falhar.
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'gram.js')).href);
const P = globalThis.CP_GRAM;
const topicosPorLicao = new Map(P.LICOES.map((l) => [l.n, l]));
const topicos = new Set(P.TOPICOS.map((t) => t.id));
const dir = join(raiz, 'assets', 'gram');
const arquivos = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.js')).sort() : [];
for (const f of arquivos) await import(pathToFileURL(join(dir, f)).href);
const C = globalThis.CP_CONTEUDO_ESTUDO;
const erros = [];
const err = (onde, msg) => erros.push(`${onde}: ${msg}`);
const palavras = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const idsQ = new Set(), idsC = new Set();
const resumo = { arquivos: arquivos.length, aulas: 0, palavrasAula: 0, cartoes: 0, questoes: 0, labs: 0, fontes: 0 };
if (!C) { console.error('Nenhum conteúdo carregado (CP_CONTEUDO_ESTUDO ausente).'); process.exit(1); }

/* Só documentação e páginas oficiais de quem mantém a ferramenta/padrão. Blog de terceiro não entra. */
const OFICIAIS = ['learnenglish.britishcouncil.org', 'learnenglishteens.britishcouncil.org', 'www.britishcouncil.org', 'dictionary.cambridge.org', 'www.cambridgeenglish.org', 'www.oxfordlearnersdictionaries.com', 'www.oxfordreference.com', 'owl.purdue.edu', 'www.merriam-webster.com', 'www.collinsdictionary.com', 'languagetool.org', 'www.cambridge.org', 'www.ldoceonline.com'];
function fonteOk(f, onde, rot) {
  if (!Array.isArray(f) || typeof f[0] !== 'string' || f[0].length < 4 || typeof f[1] !== 'string') return err(onde, `${rot}: use [título, url]`);
  let u; try { u = new URL(f[1]); } catch { return err(onde, `${rot}: url inválida (${f[1]})`); }
  if (u.protocol !== 'https:') err(onde, `${rot}: só https (${f[1]})`);
  if (!OFICIAIS.includes(u.hostname)) err(onde, `${rot}: domínio fora da lista de fontes oficiais (${u.hostname}). Se for mesmo oficial, acrescente em OFICIAIS no validador.`);
}

function palavrasBloco(b) {
  let n = palavras(b.t) + (b.p || []).reduce((a, p) => a + palavras(p), 0) + (b.lista || []).reduce((a, p) => a + palavras(p), 0) + palavras(b.dica) + palavras(b.armadilha);
  if (b.tabela) n += (b.tabela.cab || []).reduce((a, p) => a + palavras(p), 0) + (b.tabela.linhas || []).reduce((a, l) => a + l.reduce((x, c) => x + palavras(c), 0), 0);
  return n;
}

function questao(q, onde, lic) {
  if (!q || typeof q !== 'object') return err(onde, 'questão inválida');
  if (!q.id || idsQ.has(q.id)) err(onde, `id ausente ou repetido (${q.id})`); else idsQ.add(q.id);
  const sec = lic.bloco;
  if (q.s !== sec) err(onde, `s deve ser ${sec} (semana desta aula)`);
  if (!topicos.has(q.t)) err(onde, `t (tópico) inválido: ${q.t}`);
  else if (q.t !== lic.topico) err(onde, `t deve ser ${lic.topico} (tópico desta aula), veio ${q.t}`);
  if (typeof q.e !== 'string' || q.e.length < 20) err(onde, 'e (enunciado) curto demais (mín. 20 caracteres)');
  if (!Array.isArray(q.o) || q.o.length < 4 || q.o.length > 5 || q.o.some((x) => typeof x !== 'string' || x.length < 1)) err(onde, 'o deve ter 4 ou 5 alternativas em texto');
  if (!Array.isArray(q.c) || q.c.length < 1 || q.c.length > 2 || q.c.some((i) => !Number.isInteger(i) || i < 0 || i >= (q.o || []).length) || new Set(q.c).size !== q.c.length) err(onde, 'c inválido (1 ou 2 índices distintos dentro de o)');
  if (Array.isArray(q.c) && q.c.length === 2 && !/escolha duas|escolha 2|choose two|choose 2/i.test(q.e || '')) err(onde, 'questão de 2 respostas precisa dizer "Choose two" no enunciado');
  if (Array.isArray(q.c) && q.c.length === 1 && /escolha duas|escolha 2|choose two|choose 2/i.test(q.e || '')) err(onde, '"Choose two" mas só uma resposta marcada');
  if (typeof q.x !== 'string' || q.x.length < 200) err(onde, 'x (explicação) precisa ter 200+ caracteres: por que a certa é certa e por que cada errada erra');
  if (/\bTODO\b|lorem ipsum|xxx/.test(JSON.stringify(q))) err(onde, 'contém marcador de rascunho');
}

for (const [n, d] of Object.entries(C.dias || {})) {
  const onde = `aula ${n}`, num = +n, lic = topicosPorLicao.get(num);
  if (!lic) { err(onde, 'número de aula fora de 1..12'); continue; }
  resumo.aulas++;
  const a = d.aula;
  if (!a || !a.titulo) err(onde, 'aula.titulo ausente');
  else {
    if (!a.resumo || a.resumo.length < 80) err(onde, 'aula.resumo curto (mín. 80 caracteres)');
    if (!Array.isArray(a.blocos) || a.blocos.length < 4) err(onde, 'aula precisa de pelo menos 4 blocos');
    let total = 0, comFonte = 0;
    (a.blocos || []).forEach((b, i) => {
      if (!b.t) err(onde, `bloco ${i}: sem título`);
      if (!(b.p && b.p.length) && !(b.lista && b.lista.length) && !b.tabela) err(onde, `bloco ${i}: sem conteúdo`);
      if (b.tabela && (!Array.isArray(b.tabela.cab) || !Array.isArray(b.tabela.linhas) || b.tabela.linhas.some((l) => l.length !== b.tabela.cab.length))) err(onde, `bloco ${i}: tabela com colunas inconsistentes`);
      if (typeof b.facil !== 'string' || b.facil.length < 40) err(onde, `bloco ${i}: falta "facil" (Traduzindo: 1 a 2 frases simples, 40+ caracteres)`);
      if (b.fonte) { fonteOk(b.fonte, onde, `bloco ${i} fonte`); comFonte++; }
      total += palavrasBloco(b);
    });
    resumo.palavrasAula += total;
    if (total < 800) err(onde, `aula curta: ${total} palavras (mín. 800)`);
    if (comFonte < 4) err(onde, `só ${comFonte} blocos com "fonte" (mín. 4): cada regra deve apontar a página de referência de onde veio`);
    if (!Array.isArray(a.prova) || a.prova.length < 3) err(onde, 'aula.prova precisa de 3+ itens (como isso aparece na prática)');
    if (!a.explique || a.explique.length < 40) err(onde, 'aula.explique ausente (pergunta para explicar com as próprias palavras)');
    if (!a.exemplo || !a.exemplo.t || palavras(a.exemplo.texto) < 60) err(onde, 'aula.exemplo precisa de t e texto com 60+ palavras (caso trabalhado)');
    const s = a.simples;
    if (!s || typeof s.analogia !== 'string' || s.analogia.length < 250) err(onde, 'aula.simples.analogia precisa de 250+ caracteres');
    if (!s || !Array.isArray(s.pontos) || s.pontos.length < 4 || s.pontos.some((x) => typeof x !== 'string' || x.length < 15)) err(onde, 'aula.simples.pontos precisa de 4+ itens curtos');
    if (!s || typeof s.paraQueServe !== 'string' || s.paraQueServe.length < 40) err(onde, 'aula.simples.paraQueServe precisa de 40+ caracteres');
    if (!Array.isArray(a.glossario) || a.glossario.length < 5 || a.glossario.some((g) => !g.t || !g.d || g.d.length < 20)) err(onde, 'aula.glossario precisa de 6+ termos {t, d}');
    if (!Array.isArray(a.checagem) || a.checagem.length < 3 || a.checagem.some((x) => typeof x !== 'string' || x.length < 20)) err(onde, 'aula.checagem precisa de 3+ perguntas de autoteste');
  }
  if (!Array.isArray(d.fontes) || d.fontes.length < 3) err(onde, 'fontes (nível da aula) precisa de 3+ links oficiais [título, url]');
  (d.fontes || []).forEach((f, i) => { resumo.fontes++; fonteOk(f, onde, `fontes[${i}]`); });
  if (new Set((d.fontes || []).map((f) => f && f[1])).size !== (d.fontes || []).length) err(onde, 'fontes repetidas');
  if (!Array.isArray(d.cartoes) || d.cartoes.length < 12) err(onde, 'precisa de pelo menos 12 cartões');
  (d.cartoes || []).forEach((c, i) => {
    resumo.cartoes++;
    if (!c.id || idsC.has(c.id)) err(onde, `cartão ${i}: id ausente ou repetido (${c.id})`); else idsC.add(c.id);
    if (!c.f || c.f.length < 8) err(onde, `cartão ${c.id}: frente curta`);
    if (!c.v || c.v.length < 20) err(onde, `cartão ${c.id}: verso curto`);
    if (c.t !== lic.topico) err(onde, `cartão ${c.id}: t deve ser ${lic.topico}`);
  });
  if (!Array.isArray(d.questoes) || d.questoes.length < 12) err(onde, `precisa de pelo menos 12 questões (tem ${(d.questoes || []).length})`);
  (d.questoes || []).forEach((q, i) => { resumo.questoes++; questao(q, `${onde} questão ${i + 1}`, lic); });
  const L = d.lab;
  if (!L) err(onde, 'toda aula tem treino de fala (lab)');
  else {
    resumo.labs++;
    if (!L.t || !L.custo || !L.verificar) err(onde, 'lab precisa de t, custo e verificar');
    if (!Array.isArray(L.passos) || L.passos.length < 4 || L.passos.some((p) => !p.t || !p.p)) err(onde, 'lab precisa de 4+ passos com t e p');
    if (!Array.isArray(L.limpar) || !L.limpar.length) err(onde, 'lab precisa de "limpar" (o que fazer depois do treino)');
    if (typeof L.antes !== 'string' || L.antes.length < 80) err(onde, 'lab.antes precisa de 80+ caracteres');
    if (!Array.isArray(L.erros) || L.erros.length < 3 || L.erros.some((e) => !e.s || !e.c || !e.r)) err(onde, 'lab.erros precisa de 3+ itens {s, c, r}');
    if (typeof L.tempo !== 'string' || !L.tempo) err(onde, 'lab.tempo ausente');
  }
}
for (const l of P.LICOES) if (arquivos.length && !(C.dias || {})[l.n]) err(`aula ${l.n}`, `ausente (${l.titulo})`);

console.log(JSON.stringify(resumo));
if (erros.length) { console.error(`\n${erros.length} problema(s):\n- ` + erros.slice(0, 80).join('\n- ')); process.exit(1); }
console.log('Conteúdo válido.');
