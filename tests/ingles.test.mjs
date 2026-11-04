// Testes do módulo Inglês (assets/ingles.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/ingles.js';

const I = globalThis.CP_INGLES;
const d = (s) => I.parse(s);

test('cada semana soma 150 min de prática, com ids únicos e passos', () => {
  for (const s of I.INGLES) assert.equal(s.tarefas.reduce((a, t) => a + t.min * t.vezes, 0), I.MIN_ING, 'semana ' + s.n);
  const ids = I.todas().map((x) => x.t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const x of I.todas()) { assert.ok(x.t.como.length >= 2 && x.t.pronto && x.t.vezes >= 1, x.t.id); }
});

test('é pessoal: nada no texto manda tratar o inglês como parte do PDI', () => {
  const tudo = JSON.stringify(I.INGLES);
  assert.doesNotMatch(tudo, /PDI|Metas →/);
});

test('8 frases por semana, todas com explicação de uso, e exportação para o Anki', () => {
  for (const s of I.INGLES) {
    assert.equal(s.frases.length, 8);
    assert.ok(s.frases.every((f) => f[0] && f[1]));
    assert.equal(I.cartoesAnki(s.n).split('\n').length, 8);
  }
  assert.equal(I.cartoesAnki(99), '');
});

test('estado: antes, durante e depois do ciclo', () => {
  const cfg = I.cfgPadrao(d('2026-11-04'));
  assert.equal(I.estado(null, d('2026-11-04')).ativo, false);
  const a = I.estado(cfg, d('2026-11-02'));
  assert.equal(a.semana, 0); assert.equal(a.comecaEm, 2); assert.equal(a.prox.t.id, '1-sh');
  assert.equal(I.estado(cfg, d('2026-11-11')).semana, 2);
  const z = I.estado(cfg, d('2026-12-02'));
  assert.equal(z.encerrado, true); assert.equal(z.semana, 4);
});

test('contador respeita o limite, remove zeros e alimenta o próximo passo', () => {
  let cfg = I.cfgPadrao(d('2026-11-04'));
  for (let i = 0; i < 5; i++) cfg = { ...cfg, cont: I.contar(cfg, '1-sh', 1) };
  assert.equal(cfg.cont['1-sh'], 3);
  for (let i = 0; i < 5; i++) cfg = { ...cfg, cont: I.contar(cfg, '1-sh', -1) };
  assert.equal(cfg.cont['1-sh'], undefined);
  assert.deepEqual(I.contar(cfg, 'nao-existe', 1), {});
  const e = I.estado({ ...cfg, cont: { '1-sh': 3, '1-es': 1 } }, d('2026-11-05'));
  assert.equal(e.porSemana[1].feito, 36 + 25);
  assert.equal(e.prox.t.id, '1-es');
});

test('atrasadas vêm primeiro e a prática adianta quando a semana termina', () => {
  let cfg = I.cfgPadrao(d('2026-11-04'));
  const e = I.estado(cfg, d('2026-11-12')); // semana 2
  assert.equal(e.prox.t.id, '1-sh'); assert.equal(e.atrasadas, 5);
  const todas1 = {}; I.INGLES[0].tarefas.forEach((t) => { todas1[t.id] = t.vezes; });
  const e2 = I.estado({ ...cfg, cont: todas1 }, d('2026-11-12'));
  assert.equal(e2.prox.t.id, '2-sh'); assert.equal(e2.atrasadas, 0);
});

test('aulas: contador por semana com teto', () => {
  let cfg = I.cfgPadrao(d('2026-11-04'));
  for (let i = 0; i < 6; i++) cfg = { ...cfg, aulas: I.ajustarAulas(cfg, 1, 1) };
  const e = I.estado(cfg, d('2026-11-05'));
  assert.equal(e.aulasSemana, 6); assert.equal(e.aulasTotal, 6);
  assert.equal(I.ajustarAulas({ aulas: { 1: 0 } }, 1, -1)[1], 0);
});

test('integração com o painel', async () => {
  await import('../assets/progresso.js');
  const G = globalThis.CP_PROG, hoje = new Date(2026, 10, 10);
  assert.equal(G.calcular({}, hoje).ingles.ativo, false);
  const p = G.calcular({ ingles: { inicio: '2026-11-04', cont: { '1-sh': 1 }, aulas: { 1: 3 } } }, hoje);
  assert.equal(p.ingles.ativo, true); assert.equal(p.ingles.aulasSemana, 3); assert.equal(p.ingles.aulasTotal, 3);
  assert.ok(p.metas.vida.some((m) => m.id === 'ingles'));
});
