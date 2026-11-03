// Valida o conteúdo de estudo da certificação (assets/cert/*.js). Rodar: node scripts/valida-conteudo-cert.mjs
// Regras: esquema completo, tamanho mínimo, ids únicos, índices de resposta válidos. Sai com código 1 se algo falhar.
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'cert.js')).href);
const base = globalThis.CP_CERT;
const topicos = new Set(base.TOPICOS.map((t) => t.id));
const dir = join(raiz, 'assets', 'cert');
const arquivos = readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
for (const f of arquivos) await import(pathToFileURL(join(dir, f)).href);
const C = globalThis.CP_CERT_CONTEUDO;
const estrito = true; // camada fácil (simples, glossário, facil, checagem, lab.antes/erros) é obrigatória
const erros = [];
const err = (onde, msg) => erros.push(`${onde}: ${msg}`);
const palavras = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const idsQ = new Set(), idsC = new Set();
const resumo = { arquivos: arquivos.length, dias: 0, aulas: 0, palavrasAula: 0, cartoes: 0, questoes: 0, labs: 0 };

if (!C) { console.error('Nenhum conteúdo carregado (CP_CERT_CONTEUDO ausente).'); process.exit(1); }

function palavrasBloco(b) {
  let n = palavras(b.t) + (b.p || []).reduce((a, p) => a + palavras(p), 0) + (b.lista || []).reduce((a, p) => a + palavras(p), 0) + palavras(b.dica) + palavras(b.armadilha);
  if (b.tabela) n += (b.tabela.cab || []).reduce((a, p) => a + palavras(p), 0) + (b.tabela.linhas || []).reduce((a, l) => a + l.reduce((x, c) => x + palavras(c), 0), 0);
  return n;
}

function questao(q, onde, exigeDia) {
  if (!q || typeof q !== 'object') return err(onde, 'questão inválida');
  if (!q.id || idsQ.has(q.id)) err(onde, `id ausente ou repetido (${q.id})`); else idsQ.add(q.id);
  if (!(q.s >= 1 && q.s <= 5)) err(onde, 's (seção) deve ser 1..5');
  if (!topicos.has(q.t)) err(onde, `t (tópico do guia) inválido: ${q.t}`);
  else if (q.s !== Number(String(q.t).split('.')[0])) err(onde, `s (${q.s}) não bate com a seção do tópico ${q.t}`);
  if (typeof q.e !== 'string' || q.e.length < 60) err(onde, 'e (enunciado em inglês) curto demais');
  if (/[ãõçáéíóúâêô]/i.test(q.e || '')) err(onde, 'enunciado deve estar em inglês (sem acentos do português)');
  if (!Array.isArray(q.o) || q.o.length < 4 || q.o.length > 5 || q.o.some((x) => typeof x !== 'string' || x.length < 2)) err(onde, 'o deve ter 4 ou 5 alternativas em texto');
  if (!Array.isArray(q.c) || q.c.length < 1 || q.c.length > 2 || q.c.some((i) => !Number.isInteger(i) || i < 0 || i >= (q.o || []).length) || new Set(q.c).size !== q.c.length) err(onde, 'c inválido (índices das corretas, 1 ou 2)');
  if (Array.isArray(q.c) && q.c.length === 2 && !/choose two|select two/i.test(q.e || '')) err(onde, 'questão de 2 respostas precisa dizer "Choose two" no enunciado');
  if (Array.isArray(q.c) && q.c.length === 1 && /choose two|select two/i.test(q.e || '')) err(onde, '"Choose two" mas só uma resposta marcada');
  if (typeof q.x !== 'string' || q.x.length < 200) err(onde, 'x (explicação em português) precisa ter pelo menos 200 caracteres: por que a certa é certa e por que cada errada erra');
  if (/TODO|lorem|xxx/i.test(JSON.stringify(q))) err(onde, 'contém marcador de rascunho');
}

for (const [n, d] of Object.entries(C.dias || {})) {
  const onde = `dia ${n}`; resumo.dias++;
  const dia = +n;
  if (!(dia >= 1 && dia <= 29)) err(onde, 'número de dia fora de 1..29');
  const a = d.aula;
  if (!a || !a.titulo) { err(onde, 'aula.titulo ausente'); }
  else {
    resumo.aulas++;
    if (!a.resumo || a.resumo.length < 80) err(onde, 'aula.resumo curto (mín. 80 caracteres)');
    if (!Array.isArray(a.blocos) || a.blocos.length < 5) err(onde, 'aula precisa de pelo menos 5 blocos');
    let total = 0;
    (a.blocos || []).forEach((b, i) => {
      if (!b.t) err(onde, `bloco ${i}: sem título`);
      if (!(b.p && b.p.length) && !(b.lista && b.lista.length) && !b.tabela) err(onde, `bloco ${i}: sem conteúdo`);
      if (b.tabela && (!Array.isArray(b.tabela.cab) || !Array.isArray(b.tabela.linhas) || b.tabela.linhas.some((l) => l.length !== b.tabela.cab.length))) err(onde, `bloco ${i}: tabela com colunas inconsistentes`);
      total += palavrasBloco(b);
    });
    resumo.palavrasAula += total;
    if (total < 800) err(onde, `aula curta: ${total} palavras (mín. 800)`);
    if (!a.prova || !Array.isArray(a.prova) || a.prova.length < 3) err(onde, 'aula.prova precisa de 3+ itens (como a prova cobra)');
    if (!a.explique || a.explique.length < 40) err(onde, 'aula.explique ausente (pergunta para explicar com as próprias palavras)');
    if (!a.exemplo || !a.exemplo.t || palavras(a.exemplo.texto) < 60) err(onde, 'aula.exemplo precisa de t e texto com 60+ palavras (caso trabalhado)');
  }
  if (!Array.isArray(d.cartoes) || d.cartoes.length < 10) err(onde, 'precisa de pelo menos 10 cartões');
  (d.cartoes || []).forEach((c, i) => {
    resumo.cartoes++;
    if (!c.id || idsC.has(c.id)) err(onde, `cartão ${i}: id ausente ou repetido (${c.id})`); else idsC.add(c.id);
    if (!c.f || c.f.length < 8) err(onde, `cartão ${c.id}: frente curta`);
    if (!c.v || c.v.length < 20) err(onde, `cartão ${c.id}: verso curto`);
    if (!topicos.has(c.t)) err(onde, `cartão ${c.id}: t inválido (${c.t})`);
  });

  if (estrito) {
    const a2 = d.aula || {};
    const s = a2.simples;
    if (!s || typeof s.analogia !== 'string' || s.analogia.length < 300) err(onde, 'aula.simples.analogia (analogia do dia a dia, sem jargão) precisa de 300+ caracteres');
    if (!s || !Array.isArray(s.pontos) || s.pontos.length < 4 || s.pontos.some((x) => typeof x !== 'string' || x.length < 15)) err(onde, 'aula.simples.pontos precisa de 4+ itens curtos');
    if (!s || typeof s.paraQueServe !== 'string' || s.paraQueServe.length < 40) err(onde, 'aula.simples.paraQueServe ("você usa isso quando...") precisa de 40+ caracteres');
    if (!Array.isArray(a2.glossario) || a2.glossario.length < 6 || a2.glossario.some((g) => !g.t || !g.d || g.d.length < 20)) err(onde, 'aula.glossario precisa de 6+ termos {t, d} com definição simples');
    (a2.blocos || []).forEach((b, i) => { if (typeof b.facil !== 'string' || b.facil.length < 40) err(onde, `bloco ${i}: falta "facil" (Traduzindo: 1 a 2 frases simples, 40+ caracteres)`); });
    if (!Array.isArray(a2.checagem) || a2.checagem.length < 3 || a2.checagem.some((x) => typeof x !== 'string' || x.length < 20)) err(onde, 'aula.checagem precisa de 3+ perguntas de autoteste');
    if (d.lab) {
      const L2 = d.lab;
      if (typeof L2.antes !== 'string' || L2.antes.length < 150) err(onde, 'lab.antes (o que saber/ter antes e o que aparece na tela) precisa de 150+ caracteres');
      if (!Array.isArray(L2.erros) || L2.erros.length < 3 || L2.erros.some((e) => !e.s || !e.c || !e.r)) err(onde, 'lab.erros precisa de 3+ itens {s: sintoma, c: causa, r: como resolver}');
      if (typeof L2.tempo !== 'string' || !L2.tempo) err(onde, 'lab.tempo (minutos estimados) ausente');
    }
  }
  const minQ = d.minQuestoes != null ? d.minQuestoes : 8;
  if (!Array.isArray(d.questoes) || d.questoes.length < minQ) err(onde, `precisa de pelo menos ${minQ} questões (tem ${(d.questoes || []).length})`);
  (d.questoes || []).forEach((q, i) => { resumo.questoes++; questao(q, `${onde} questão ${i + 1}`); });
  if (d.lab) {
    resumo.labs++;
    const L = d.lab;
    if (!L.t || !L.custo || !L.verificar) err(onde, 'lab precisa de t, custo e verificar');
    if (!Array.isArray(L.passos) || L.passos.length < 4 || L.passos.some((p) => !p.t || !p.p)) err(onde, 'lab precisa de 4+ passos com t e p');
    if (!Array.isArray(L.limpar) || !L.limpar.length) err(onde, 'lab precisa de passos de limpeza (limpar)');
  }
}
if (Array.isArray(C.mix)) C.mix.forEach((q, i) => { resumo.questoes++; questao(q, `mix questão ${i + 1}`); });

console.log(JSON.stringify(resumo));
if (erros.length) { console.error(`\n${erros.length} problema(s):\n- ` + erros.slice(0, 60).join('\n- ')); process.exit(1); }
console.log('Conteúdo válido.');
