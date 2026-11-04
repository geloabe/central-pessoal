// Testes da trilha de gramática do inglês (assets/gram.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/gram.js';

const G = globalThis.CP_GRAM;
const hoje = new Date(2026, 10, 10);

test('12 aulas em 4 semanas, 3 por semana, com tópicos únicos g1..g12', () => {
  assert.equal(G.LICOES.length, 12);
  assert.deepEqual(G.LICOES.map((l) => l.n), Array.from({ length: 12 }, (_, i) => i + 1));
  assert.deepEqual(G.LICOES.map((l) => l.topico), Array.from({ length: 12 }, (_, i) => 'g' + (i + 1)));
  for (const b of G.BLOCOS) assert.equal(G.LICOES.filter((l) => l.bloco === b.id).length, 3, 'semana ' + b.id);
});

test('plano no formato do motor de estudo: tópicos, 4 seções, rótulos e aulas liberadas', () => {
  const K = globalThis.CP_PLANO_ESTUDO;
  assert.equal(K.TOPICOS.length, 12); assert.equal(K.SECOES.length, 4);
  assert.deepEqual([...new Set(K.TOPICOS.map((t) => t.s))], [1, 2, 3, 4]);
  assert.equal(K.ROTULOS.dia, 'Aula');
  assert.equal(K.estado({}).diaPlano, 1);
  assert.equal(K.estado({ aulas: { 1: '2026-11-05' } }).diaPlano, 2);
  assert.equal(K.estado({ aulas: { 12: '2026-11-05' } }).diaPlano, 12);
});

test('passos da aula: leitura, quiz de 80% e treino de fala', () => {
  assert.deepEqual(G.passosDa({}, 1), { aula: false, quiz: false, lab: false });
  assert.equal(G.passosDa({ quiz: { 1: { pct: 79 } } }, 1).quiz, false);
  assert.equal(G.passosDa({ quiz: { 1: { pct: 80 } } }, 1).quiz, true);
  const cfg = { aulas: { 1: '2026-11-10' }, quiz: { 1: { pct: 90, data: '2026-11-10' } }, labs: { 1: '2026-11-10' } };
  assert.equal(G.completa(cfg, 1), true);
  assert.equal(G.completa({ aulas: { 1: 'x' } }, 1), false);
});

test('estado: próximo passo, progresso por semana e etapas de hoje', () => {
  let e = G.estado({}, hoje);
  assert.equal(e.prox.n, 1); assert.equal(e.prox.passo, 'aula'); assert.equal(e.pct, 0); assert.equal(e.totalPassos, 36);
  const cfg = { aulas: { 1: '2026-11-10' }, quiz: { 1: { pct: 85, data: '2026-11-10' } }, labs: {} };
  e = G.estado(cfg, hoje);
  assert.equal(e.prox.n, 1); assert.equal(e.prox.passo, 'lab'); assert.equal(e.hoje, 2);
  assert.equal(e.porBloco[1].aulas, 1);
  const tudo = { aulas: {}, quiz: {}, labs: {} };
  for (let n = 1; n <= 12; n++) { tudo.aulas[n] = '2026-11-01'; tudo.quiz[n] = { pct: 100, data: '2026-11-01' }; tudo.labs[n] = '2026-11-01'; }
  e = G.estado(tudo, hoje);
  assert.equal(e.completas, 12); assert.equal(e.pct, 100); assert.equal(e.prox, null);
});
