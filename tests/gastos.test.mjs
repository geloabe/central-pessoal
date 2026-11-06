// Testes de gastos da semana/mês contra os tetos (assets/gastos.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/gastos.js';

const G = globalThis.CP_GASTOS;
const d = (s) => new Date(s + 'T12:00:00');
const tx = (id, date, value, category, extra = {}) => ({ id, date, value, category, type: 'expense', ...extra });

test('semana vai de segunda a domingo; mês é o do calendário', () => {
  const p = G.periodo(d('2026-11-05')); // quinta
  assert.equal(p.semIni, '2026-11-02'); assert.equal(p.semFim, '2026-11-08');
  assert.equal(p.mesIni, '2026-11-01'); assert.equal(p.mesFim, '2026-11-30'); assert.equal(p.mesNome, 'Novembro');
  assert.equal(G.periodo(d('2026-11-08')).semIni, '2026-11-02'); // domingo ainda é a mesma semana
  assert.equal(G.periodo(d('2026-11-09')).semIni, '2026-11-09'); // segunda abre outra
});

test('semana que cruza o mês: a semana pega os dois lados, o mês só o seu', () => {
  const r = G.resumo({ hoje: d('2026-12-01'), pluggy: [tx('a', '2026-11-30', 40, 'lazer'), tx('b', '2026-12-01', 10, 'lazer')] });
  assert.equal(r.semana.total, 50); assert.equal(r.mes.total, 10);
});

test('conta pela data da compra: compra no cartão de hoje já pesa hoje', () => {
  const r = G.resumo({ hoje: d('2026-11-05'), pluggy: [tx('c', '2026-11-05', 22, 'restaurante', { budgetMonth: 'Dezembro' })] });
  assert.equal(r.mes.total, 22); assert.equal(r.linhas[0].mes, 22);
});

test('teto semanal e mensal: estados e ordem (mais apertado primeiro)', () => {
  const r = G.resumo({
    hoje: d('2026-11-05'),
    pluggy: [tx('1', '2026-11-03', 160, 'restaurante'), tx('2', '2026-11-04', 30, 'transporte'), tx('3', '2026-11-04', 500, 'lazer')],
    capsSemana: { restaurante: 100, transporte: 100 }, capsMes: { restaurante: 400, transporte: 150 }
  });
  assert.deepEqual(r.linhas.map((l) => l.cat), ['restaurante', 'transporte', 'lazer']);
  const rest = r.linhas[0];
  assert.equal(rest.estSemana, 'estourou'); assert.equal(rest.estMes, 'ok');
  assert.equal(r.linhas[1].estSemana, 'ok');
  assert.equal(r.linhas[2].tetoMes, 0); assert.equal(r.linhas[2].estMes, null);
});

test('80% do teto já é atenção', () => {
  const r = G.resumo({ hoje: d('2026-11-05'), pluggy: [tx('1', '2026-11-03', 80, 'lazer')], capsSemana: { lazer: 100 } });
  assert.equal(r.linhas[0].estSemana, 'atencao');
});

test('manual igual a um lançamento da Pluggy não conta duas vezes', () => {
  const r = G.resumo({
    hoje: d('2026-11-05'),
    pluggy: [tx('p', '2026-11-03', 25.5, 'transporte')],
    manuais: [tx('manual-1', '2026-11-03', 25.5, 'transporte'), tx('manual-2', '2026-11-04', 10, 'lazer')]
  });
  assert.equal(r.mes.total, 35.5);
});

test('correção manual de categoria vale; entradas não contam; parcelas do histórico só no mês', () => {
  const r = G.resumo({
    hoje: d('2026-11-05'),
    pluggy: [tx('x', '2026-11-03', 50, 'outros'), { id: 'i', date: '2026-11-03', value: 900, category: 'receita', type: 'income' }],
    base: [tx('b', '2026-05-01', 33.3, 'assinaturas', { month: 'Novembro' }), tx('b2', '2026-05-01', 99, 'lazer', { month: 'Outubro' })],
    overrides: { x: 'saude' }
  });
  assert.equal(r.mes.total, 83.3); assert.equal(r.semana.total, 50);
  assert.equal(r.linhas.find((l) => l.cat === 'saude').semana, 50);
});
