// Testes do motor de estudo (assets/cert-estudo.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/cert.js';
import '../assets/cert-estudo.js';

const E = globalThis.CP_ESTUDO;
const d = (s) => new Date(s + 'T12:00:00');

// conteúdo sintético: 2 dias, questões em tópicos de seções diferentes e um banco misto
const q = (id, s, t, c = [0]) => ({ id, s, t, e: 'Which service fits this requirement best for the team?', o: ['A', 'B', 'C', 'D'], c, x: 'x'.repeat(210) });
const C = {
  dias: {
    2: { cartoes: [{ id: 'd2c1', t: '3.2', f: 'f1', v: 'v1' }, { id: 'd2c2', t: '3.2', f: 'f2', v: 'v2' }], questoes: [q('d2q1', 3, '3.2'), q('d2q2', 3, '3.2')], lab: { t: 'x' } },
    9: { cartoes: [{ id: 'd9c1', t: '2.2', f: 'f3', v: 'v3' }], questoes: [q('d9q1', 2, '2.2'), q('d9q2', 2, '2.2')] }
  },
  mix: [q('mx1', 2, '2.2'), q('mx2', 5, '5.4')]
};

test('SRS: errar volta amanhã; acertar sobe a caixa e espaça; fácil pula uma caixa', () => {
  const h = d('2026-11-10');
  assert.deepEqual(E.proximo(null, 0, h), { b: 1, n: 1, e: 1, u: 0, p: '2026-11-11' });
  const a = E.proximo(null, 2, h); assert.equal(a.b, 1); assert.equal(a.p, '2026-11-11');
  const b = E.proximo(a, 2, d('2026-11-11')); assert.equal(b.b, 2); assert.equal(b.p, '2026-11-14'); // 3 dias
  const c = E.proximo(b, 2, d('2026-11-14')); assert.equal(c.b, 3); assert.equal(c.p, '2026-11-21'); // 7 dias
  assert.equal(E.proximo(null, 3, h).b, 2);
  assert.equal(E.proximo({ b: 5, n: 9, e: 0, u: 1 }, 2, h).b, 5); // teto na caixa 5
  assert.equal(E.proximo({ b: 4, n: 9, e: 0, u: 1 }, 0, h).b, 1); // errou: volta ao começo
});

test('fila de cartões: só o que já foi liberado; devidos antes dos novos', () => {
  const srs = { d2c1: { b: 1, n: 1, e: 0, u: 1, p: '2026-11-10' } };
  const f = E.filaCartoes(C, srs, d('2026-11-10'), 2);
  assert.deepEqual(f.devidos.map((x) => x.id), ['d2c1']);
  assert.deepEqual(f.novos.map((x) => x.id), ['d2c2']); // d9c1 ainda não foi liberado (dia 9 > 2)
  assert.equal(E.filaCartoes(C, srs, d('2026-11-10'), 2, { todos: true }).novos.length, 2);
  assert.equal(E.filaCartoes(C, {}, d('2026-11-10'), 12, { maxNovos: 1 }).novos.length, 1);
});

test('questões do banco misto seguem o 1º dia do tópico', () => {
  const pool2 = E.banco(C).filter((x) => E.liberada(x, 2));
  assert.deepEqual(pool2.map((x) => x.id).sort(), ['d2q1', 'd2q2']); // mx1 (2.2) só no dia 8; mx2 (5.4) só no dia 20
  const pool20 = E.banco(C).filter((x) => E.liberada(x, 20));
  assert.equal(pool20.length, 6);
});

test('caderno de erros: errou e ainda não consolidou', () => {
  const srs = { d2q1: { b: 1, n: 1, e: 1, u: 0, p: '2026-11-11' }, d2q2: { b: 3, n: 4, e: 1, u: 1, p: '2026-11-20' } };
  assert.deepEqual(E.cadernoErros(C, srs).map((x) => x.id), ['d2q1']);
});

test('simulado: respeita os pesos por seção, não repete e prioriza o que ainda não viu', () => {
  const pool = [];
  for (let s = 1; s <= 5; s++) for (let i = 0; i < 30; i++) pool.push({ id: `s${s}_${i}`, s, t: `${s}.1`, c: [0], o: ['a', 'b', 'c', 'd'] });
  const srs = {}; for (let i = 0; i < 29; i++) srs[`s1_${i}`] = { b: 2, n: 2, e: 0, u: 1, p: '2026-12-01' }; // quase tudo da seção 1 já visto
  const sim = E.montarSimulado(pool, srs, 'completo', E.mulberry(7));
  assert.equal(sim.length, 50);
  assert.equal(new Set(sim.map((x) => x.id)).size, 50);
  const cont = [1, 2, 3, 4, 5].map((s) => sim.filter((x) => x.s === s).length);
  assert.deepEqual(cont, [11, 13, 10, 7, 9]);
  assert.ok(sim.some((x) => x.id === 's1_29')); // a única nova da seção 1 entra
  assert.equal(E.montarSimulado(pool, srs, 'parcial', E.mulberry(1)).length, 30);
  const sec = E.montarSimulado(pool, srs, 'secao', E.mulberry(1), 4);
  assert.equal(sec.length, 20); assert.ok(sec.every((x) => x.s === 4));
});

test('simulado: se faltar questão numa seção, completa com as outras', () => {
  const pool = [];
  for (let i = 0; i < 40; i++) pool.push({ id: `a${i}`, s: 2, t: '2.1', c: [0], o: ['a', 'b', 'c', 'd'] });
  assert.equal(E.montarSimulado(pool, {}, 'completo', E.mulberry(3)).length, 40); // só existem 40 no total
});

test('alternativas embaralhadas de forma determinística e correção de 1 e 2 respostas', () => {
  const qq = { o: ['a', 'b', 'c', 'd', 'e'], c: [1, 3] };
  assert.deepEqual(E.ordemAlternativas(qq, 5), E.ordemAlternativas(qq, 5));
  assert.deepEqual([...E.ordemAlternativas(qq, 5)].sort(), [0, 1, 2, 3, 4]);
  assert.equal(E.acertou(qq, [3, 1]), true);
  assert.equal(E.acertou(qq, [1]), false);
  assert.equal(E.acertou({ c: [2] }, [2]), true);
});

test('domínio: por tópico, por seção e geral ponderado só pelo que já foi respondido', () => {
  const srs = {
    d2q1: { b: 2, n: 2, e: 0, u: 1, p: 'x' }, d2q2: { b: 1, n: 1, e: 1, u: 0, p: 'x' }, // seção 3: 50%
    d9q1: { b: 2, n: 2, e: 0, u: 1, p: 'x' }                                        // seção 2: 100%
  };
  const dm = E.dominio(C, srs);
  assert.equal(dm.porTopico['3.2'].pct, 50);
  assert.equal(dm.porTopico['2.2'].pct, 100);
  assert.equal(dm.porTopico['5.4'].pct, null);
  assert.equal(dm.cobertura, 2);
  assert.equal(dm.geral, Math.round((100 * 25 + 50 * 20) / 45)); // renormaliza pelos pesos 25 e 20
  assert.deepEqual(E.topicosFracos(C, { d2q1: { n: 1, u: 0, e: 1, b: 1 }, d2q2: { n: 1, u: 0, e: 1, b: 1 } }, 2), ['3.2']);
});

test('passos do dia: dominado só com aula lida, cartões vistos e quiz com 80%', () => {
  const cfg = { aulas: { 2: '2026-11-05' }, srs: { d2c1: { n: 1 }, d2c2: { n: 1 } }, quiz: { 2: { pct: 70 } }, labs: {} };
  let p = E.passosDoDia(cfg, C, 2);
  assert.equal(p.aula, true); assert.equal(p.cartoes, true); assert.equal(p.quiz, false); assert.equal(p.dominado, false); assert.equal(p.lab, false);
  cfg.quiz[2].pct = 85; cfg.labs[2] = '2026-11-05';
  p = E.passosDoDia(cfg, C, 2);
  assert.equal(p.dominado, true); assert.equal(p.lab, true);
  assert.equal(E.passosDoDia(cfg, C, 9).lab, null); // sem lab neste dia
  assert.equal(E.passosDoDia(cfg, C, 5), null); // sem conteúdo
});
