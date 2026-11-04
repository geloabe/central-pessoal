// Testes do conteúdo de estudo de Databricks, Snowflake e dbt (assets/plat/*.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'plat.js')).href);
const P = globalThis.CP_PLAT;
const dir = join(raiz, 'assets', 'plat');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) await import(pathToFileURL(join(dir, f)).href);
const C = globalThis.CP_CONTEUDO_ESTUDO;
const SEC = { db: 1, sf: 2, dbt: 3 };

test('o validador do conteúdo aprova as 28 aulas (esquema, tamanho, fontes oficiais, respostas)', () => {
  const r = spawnSync(process.execPath, [join(raiz, 'scripts', 'valida-conteudo-plat.mjs')], { encoding: 'utf8' });
  assert.equal(r.status, 0, (r.stdout || '') + (r.stderr || ''));
  assert.match(r.stdout, /Conteúdo válido/);
});

test('toda aula do plano tem conteúdo, na trilha e no tópico certos', () => {
  assert.deepEqual(Object.keys(C.dias).map(Number).sort((a, b) => a - b), P.LICOES.map((l) => l.n));
  for (const l of P.LICOES) {
    const d = C.dias[l.n];
    assert.ok(d.cartoes.every((c) => c.t === l.topico), 'cartões da aula ' + l.n);
    assert.ok(d.questoes.every((q) => q.t === l.topico && q.s === SEC[l.trilha]), 'questões da aula ' + l.n);
  }
});

test('fontes oficiais: cada aula cita 3+ links https e nenhum id se repete entre aulas', () => {
  for (const l of P.LICOES) {
    const f = C.dias[l.n].fontes;
    assert.ok(f.length >= 3 && f.every((x) => /^https:\/\//.test(x[1])), 'aula ' + l.n);
  }
  const ids = Object.values(C.dias).flatMap((d) => [...d.cartoes.map((c) => c.id), ...d.questoes.map((q) => q.id)]);
  assert.equal(new Set(ids).size, ids.length);
});

test('as explicações não citam alternativas por letra (o app embaralha a ordem das alternativas)', () => {
  const re = /\b(?:alternativas?|op[cç][aã]o|op[cç][oõ]es|letras?)\s+\(?[A-E]\)?(?:\s*(?:,|e|ou)\s*\(?[A-E]\)?)*\b|\([A-E]\)|(?:^|[\s.;:])[A-E]\)\s/;
  for (const [n, d] of Object.entries(C.dias)) for (const q of d.questoes) assert.doesNotMatch(q.x + ' ' + q.e, re, `aula ${n} ${q.id}`);
});

test('todo lab declara custo e avisa que não foi executado; nenhum pede cartão de crédito', () => {
  for (const [n, d] of Object.entries(C.dias)) {
    assert.ok(d.lab.custo && d.lab.custo.length >= 4, 'custo na aula ' + n);
    assert.match(d.lab.antes, /(?:n[ãa]o|nada)[^.]{0,60}executad/i, 'aviso de não executado na aula ' + n);
  }
  const tudo = JSON.stringify(Object.values(C.dias).map((d) => d.lab));
  assert.doesNotMatch(tudo, /informe (?:o )?cart[ãa]o|coloque (?:o )?cart[ãa]o|cadastre (?:um )?cart[ãa]o de cr[ée]dito/i);
});

test('todo projeto de portfólio aponta para aulas que têm lab', () => {
  for (const p of P.PROJETOS) for (const n of p.aulas) assert.ok(C.dias[n] && C.dias[n].lab, `${p.id} aula ${n}`);
});

test('nenhum texto promete aprovação, emprego ou resultado garantido', () => {
  const tudo = JSON.stringify(C);
  assert.doesNotMatch(tudo, /aprovação garantida|garantia de aprovação|vai passar na prova|você passa na prova|emprego garantido|vaga garantida/i);
});
