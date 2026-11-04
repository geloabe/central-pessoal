// Testes do conteúdo da trilha de gramática (assets/gram/*.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'gram.js')).href);
const G = globalThis.CP_GRAM;
const dir = join(raiz, 'assets', 'gram');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) await import(pathToFileURL(join(dir, f)).href);
const C = globalThis.CP_CONTEUDO_ESTUDO;

test('o validador aprova as 12 aulas (esquema, tamanho, fontes de referência, respostas)', () => {
  const r = spawnSync(process.execPath, [join(raiz, 'scripts', 'valida-conteudo-gram.mjs')], { encoding: 'utf8' });
  assert.equal(r.status, 0, (r.stdout || '') + (r.stderr || ''));
  assert.match(r.stdout, /Conteúdo válido/);
});

test('toda aula do plano tem conteúdo, na semana e no tópico certos', () => {
  assert.deepEqual(Object.keys(C.dias).map(Number).sort((a, b) => a - b), G.LICOES.map((l) => l.n));
  for (const l of G.LICOES) {
    const d = C.dias[l.n];
    assert.ok(d.cartoes.every((c) => c.t === l.topico), 'cartões da aula ' + l.n);
    assert.ok(d.questoes.every((q) => q.t === l.topico && q.s === l.bloco), 'questões da aula ' + l.n);
  }
});

test('ids únicos entre cartões e questões de todas as aulas', () => {
  const ids = Object.values(C.dias).flatMap((d) => [...d.cartoes.map((c) => c.id), ...d.questoes.map((q) => q.id)]);
  assert.equal(new Set(ids).size, ids.length);
});

test('as explicações não citam alternativas por letra (o app embaralha a ordem das alternativas)', () => {
  const re = /\b(?:alternativas?|op[cç][aã]o|op[cç][oõ]es|letras?|options?|choices?)\s+\(?[A-E]\)?(?:\s*(?:,|e|ou|and|or)\s*\(?[A-E]\)?)*\b|\([A-E]\)|(?:^|[\s.;:])[A-E]\)\s|^\s*[A-E]\s+(?:está|estão|é|são|and|is|are)\b|\b[A-E]\s+(?:e|ou)\s+[A-E]\s+(?:está|estão|é|são|erra|erram)/;
  for (const [n, d] of Object.entries(C.dias)) for (const q of d.questoes) assert.doesNotMatch(q.x + ' ' + q.e, re, `aula ${n} ${q.id}`);
});

test('todo treino de fala declara custo e é gratuito; nenhum texto promete nível ou prazo', () => {
  for (const [n, d] of Object.entries(C.dias)) assert.ok(d.lab.custo && d.lab.custo.length >= 4, 'custo na aula ' + n);
  const tudo = JSON.stringify(C);
  assert.doesNotMatch(tudo, /fluência garantida|garantimos|em \d+ (?:dias|semanas) você (?:será|estará|fala)|nível C2 em/i);
});

test('cada aula tem armadilhas de brasileiro (blocos com "armadilha") e questões de produção', () => {
  for (const [n, d] of Object.entries(C.dias)) {
    assert.ok(d.aula.blocos.filter((b) => b.armadilha).length >= 1, 'armadilha na aula ' + n);
    assert.ok(d.questoes.length >= 12, 'questões na aula ' + n);
  }
});
