// Testes do motor de progresso (assets/progresso.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/progresso.js';

const P = globalThis.CP_PROG;
const d = (s) => new Date(s + 'T12:00:00');

test('sequência: um dia ruim isolado não quebra', () => {
  const bons = new Set(['2026-10-10', '2026-10-11', '2026-10-13', '2026-10-14']); // dia 12 falhou
  const r = P.sequencia((k) => bons.has(k), [...bons], d('2026-10-14'));
  assert.equal(r.seq, 4);
  assert.equal(r.pausas, 1);
});

test('sequência: dois dias ruins em menos de 7 dias quebram', () => {
  const bons = new Set(['2026-10-09', '2026-10-11', '2026-10-13', '2026-10-14']); // 10 e 12 falharam
  const r = P.sequencia((k) => bons.has(k), [...bons], d('2026-10-14'));
  assert.equal(r.seq, 3);
});

test('sequência: hoje vazio não zera durante o dia e fica "em risco"', () => {
  const bons = new Set(['2026-10-12', '2026-10-13']);
  const r = P.sequencia((k) => bons.has(k), [...bons], d('2026-10-14'));
  assert.equal(r.seq, 2);
  assert.equal(r.emRisco, true);
});

test('foco: ainda sem foco hoje, mostra o pendente de ontem sem cobrar', () => {
  const f = P.foco({ foco: [{ date: '2026-10-17', texto: 'Ligar para o banco', feito: false }] }, d('2026-10-18'));
  assert.equal(f.hoje, null);
  assert.equal(f.feito, false);
  assert.equal(f.pendenteAnterior.texto, 'Ligar para o banco');
});

test('foco: pendente antigo (mais de 3 dias) não reaparece', () => {
  const f = P.foco({ foco: [{ date: '2026-10-10', texto: 'Velho', feito: false }] }, d('2026-10-18'));
  assert.equal(f.pendenteAnterior, null);
});

test('foco: "Hoje não" fica registrado como dispensado e não vira pendência', () => {
  const dados = { foco: [{ date: '2026-10-17', texto: '', dispensado: true }, { date: '2026-10-18', texto: '', dispensado: true }] };
  const f = P.foco(dados, d('2026-10-18'));
  assert.equal(f.dispensado, true);
  assert.equal(f.hoje, null);
  assert.equal(f.pendenteAnterior, null);
});

test('foco feito conta como uma coisa feita hoje', () => {
  const p = P.calcular({ foco: [{ date: '2026-10-18', texto: 'Pagar a conta', feito: true }] }, d('2026-10-18'));
  assert.equal(p.foco.feito, true);
  assert.equal(p.hoje, 1);
});

test('captura: só as abertas, mais novas primeiro', () => {
  const c = P.captura({ captura: [
    { id: 'a', texto: 'um', criado: '2026-10-17T10:00:00Z', feito: false },
    { id: 'b', texto: 'dois', criado: '2026-10-18T10:00:00Z', feito: false },
    { id: 'c', texto: 'três', criado: '2026-10-18T11:00:00Z', feito: true }] });
  assert.deepEqual(c.abertas.map((x) => x.id), ['b', 'a']);
  assert.equal(c.n, 2);
});

test('ausência: conta dias desde o último registro de qualquer módulo', () => {
  const a = P.ausencia({ refeicoes: [{ date: '2026-10-12', feitas: { cafe: {} } }], agua: [{ date: '2026-10-10', ml: 500 }] }, d('2026-10-18'));
  assert.equal(a.ultima, '2026-10-12');
  assert.equal(a.dias, 6);
});

test('ausência: refeição sem nada marcado e água zerada não contam', () => {
  const a = P.ausencia({ refeicoes: [{ date: '2026-10-17', feitas: {} }], agua: [{ date: '2026-10-16', ml: 0 }] }, d('2026-10-18'));
  assert.equal(a.dias, null);
});

test('refeição: dia bom a partir de 4 refeições', () => {
  const feitas = (n) => Object.fromEntries(Array.from({ length: n }, (_, i) => ['r' + i, { kcal: 100, p: 10 }]));
  assert.equal(P.refDia({ feitas: feitas(3) }).bom, false);
  assert.equal(P.refDia({ feitas: feitas(4) }).bom, true);
});
