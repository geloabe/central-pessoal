// Testes do conteúdo de estudo do PDI (assets/pdi/*.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'pdi.js')).href);
const P = globalThis.CP_PDI;
const dir = join(raiz, 'assets', 'pdi');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) await import(pathToFileURL(join(dir, f)).href);
const C = globalThis.CP_CONTEUDO_ESTUDO;

test('o validador do conteúdo aprova as 16 aulas (esquema, tamanho, fontes oficiais, respostas)', () => {
  const r = spawnSync(process.execPath, [join(raiz, 'scripts', 'valida-conteudo-pdi.mjs')], { encoding: 'utf8' });
  assert.equal(r.status, 0, (r.stdout || '') + (r.stderr || ''));
  assert.match(r.stdout, /Conteúdo válido/);
});

test('toda aula do plano tem conteúdo, na trilha certa', () => {
  assert.deepEqual(Object.keys(C.dias).map(Number).sort((a, b) => a - b), P.LICOES.map((l) => l.n));
  for (const l of P.LICOES) {
    const d = C.dias[l.n], sec = l.trilha === 'q' ? 1 : 2;
    assert.ok(d.cartoes.every((c) => c.t === l.topico), 'cartões da aula ' + l.n);
    assert.ok(d.questoes.every((q) => q.t === l.topico && q.s === sec), 'questões da aula ' + l.n);
  }
});

test('fontes oficiais: cada aula cita 3+ links e as questões não repetem ids entre aulas', () => {
  for (const l of P.LICOES) assert.ok(C.dias[l.n].fontes.length >= 3, 'aula ' + l.n);
  const ids = Object.values(C.dias).flatMap((d) => [...d.cartoes.map((c) => c.id), ...d.questoes.map((q) => q.id)]);
  assert.equal(new Set(ids).size, ids.length);
});

test('as explicações não citam alternativas por letra (o app embaralha a ordem das alternativas a cada tentativa)', () => {
  const re = /\b(?:alternativas?|op[cç][aã]o|op[cç][oõ]es|letras?)\s+\(?[A-E]\)?(?:\s*(?:,|e|ou)\s*\(?[A-E]\)?)*\b|\([A-E]\)|(?:^|[\s.;:])[A-E]\)\s/;
  for (const [n, d] of Object.entries(C.dias)) for (const q of d.questoes) assert.doesNotMatch(q.x + ' ' + q.e, re, `aula ${n} ${q.id}`);
});

test('nenhum texto promete aprovação ou resultado garantido', () => {
  const tudo = JSON.stringify(C);
  assert.doesNotMatch(tudo, /aprovação garantida|garantia de aprovação|vai passar na prova|você passa na prova/i);
});
