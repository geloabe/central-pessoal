// Testes da projeção ficar x mudar (assets/mudanca-proj.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/mudanca-proj.js';

const P = globalThis.CP_MUDPROJ;

test('prazo: dezembro/2026 até abril/2028 são 16 meses', () => {
  assert.equal(P.calcular({}).meses, 16);
  assert.equal(P.calcular({ mesSaida: '2027-01', mesEntrega: '2027-12' }).meses, 11);
});

test('custo mensal do novo soma aluguel, condomínio, IPTU (anual / 12) e água', () => {
  const r = P.calcular({ condNovo: 200, iptuAnoNovo: 120 }); // IPTU = 10 por mês
  assert.equal(r.novo, 800 + 200 + 10 + 30);
  assert.equal(r.economiaMes, 1440 - 1040);
  assert.equal(P.calcular({ condNovo: 0 }).novo, Math.round(800 + 12.5 + 30)); // IPTU de 150 por ano
});

test('sem condomínio informado, avisa e não finge saber', () => {
  const r = P.calcular({});
  assert.equal(r.condInformado, false);
  assert.equal(P.calcular({ condNovo: 0 }).condInformado, true);
});

test('só multa e a mudança de agora são custo extra (segunda mudança e pintura ficam de fora)', () => {
  assert.equal(P.calcular({}).custoExtra, 2800);
});

test('ganho líquido e equilíbrio', () => {
  const r = P.calcular({ condNovo: 100, iptuAnoNovo: 120 }); // novo = 940, economia = 500
  assert.equal(r.economiaMes, 500);
  assert.equal(r.ganho, 500 * 16 - 2800);
  assert.equal(r.equilibrio, 5.6);
  assert.equal(r.mesEquilibrio, 'mai/27'); // 6º mês contando dez/26 como o 1º
});

test('condomínio máximo: no limite o ganho é zero; acima, não compensa', () => {
  const r = P.calcular({ condNovo: 0, iptuAnoNovo: 120 }); // base = 840
  assert.equal(r.condMax, 425); // 1440 - 840 - 2800/16
  assert.equal(P.calcular({ condNovo: 425, iptuAnoNovo: 120 }).ganho, 0);
  const c = P.calcular({ condNovo: 500, iptuAnoNovo: 120 });
  assert.equal(c.compensa, false); assert.ok(c.ganho < 0);
});

test('economia zero ou negativa: sem ponto de equilíbrio', () => {
  const r = P.calcular({ condNovo: 700 });
  assert.equal(r.equilibrio, null); assert.equal(r.mesEquilibrio, null);
});

test('caixa: caução de 3x o aluguel, metade na entrada e o resto em 3 parcelas', () => {
  const r = P.calcular({});
  assert.equal(r.caucao, 2400);
  assert.deepEqual(r.caixa.map((c) => c.valor), [800 + 1200, 400, 400, 400]);
});

test('série acumulada começa negativa (custo de sair) e cruza o zero no equilíbrio', () => {
  const r = P.calcular({ condNovo: 100, iptuAnoNovo: 120 });
  assert.ok(r.serie[0].acumulado < 0);
  assert.ok(r.serie[r.serie.length - 1].acumulado > 0);
  assert.equal(r.serie.length, 16);
});

test('campos vazios usam o padrão', () => {
  assert.equal(P.calcular({ multa: '', aluguelNovo: '' }).entrada.multa, 2000);
});
