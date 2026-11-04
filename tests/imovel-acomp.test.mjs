// Testes do acompanhamento do imóvel (assets/imovel-acomp.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/imovel-acomp.js';

const M = globalThis.CP_IMV;
const d = (s) => M.parse(s);

test('cronograma segue o quadro resumo: 17 pré-chaves e 84 pós-obra', () => {
  const pre = M.CRONO.filter((x) => x.tipo === 'pre'), pos = M.CRONO.filter((x) => x.tipo === 'pos');
  assert.equal(pre.length, 17); assert.equal(pos.length, 84);
  assert.equal(pre[0].data, '2026-12-09'); assert.equal(pre[1].data, '2027-01-09'); assert.equal(pre[16].data, '2028-04-09');
  assert.equal(pos[0].data, '2028-05-04'); assert.equal(pos[83].data, '2035-04-04');
  assert.ok(pre.every((x) => x.valor === 350)); assert.ok(pos.every((x) => x.valor === 110.33));
  assert.equal(new Set(M.CRONO.map((x) => x.id)).size, M.CRONO.length);
  assert.equal(M.CRONO.find((x) => x.id === 'fin').valor, 212706.01);
});

test('addMeses mantém o dia e respeita meses curtos', () => {
  assert.equal(M.iso(M.addMeses(d('2026-12-09'), 2)), '2027-02-09');
  assert.equal(M.iso(M.addMeses(d('2027-01-31'), 1)), '2027-02-28');
  assert.equal(M.iso(M.addMeses(d('2027-12-15'), 1)), '2028-01-15');
});

test('estado sem nada pago: a próxima é a primeira pré-chaves e não há atraso', () => {
  const e = M.estado({}, d('2026-11-04'));
  assert.equal(e.total, 101); assert.equal(e.pagas, 0); assert.equal(e.pct, 0);
  assert.equal(e.proxima.id, 'pre-1'); assert.equal(e.diasProxima, 35); assert.equal(e.atrasadas.length, 0);
  assert.equal(e.pago, 0); assert.equal(e.obraTotal, 0);
});

test('atrasadas: vencidas e não pagas aparecem; pagar tira do atraso e avança a próxima', () => {
  let cfg = {};
  let e = M.estado(cfg, d('2027-02-20')); // venceram 09/12, 09/01 e 09/02
  assert.equal(e.atrasadas.length, 3); assert.equal(e.proxima.id, 'pre-1');
  cfg = { ...cfg, pagas: M.alternar(cfg, 'pre-1', d('2027-02-20')) };
  e = M.estado(cfg, d('2027-02-20'));
  assert.equal(e.atrasadas.length, 2); assert.equal(e.proxima.id, 'pre-2'); assert.equal(e.pagas, 1);
  cfg = { ...cfg, pagas: M.alternar(cfg, 'pre-1', d('2027-02-21')) }; // desmarcar
  assert.equal(M.estado(cfg, d('2027-02-20')).atrasadas.length, 3);
});

test('pago soma o valor informado ou o valor base; valor pode ser corrigido depois', () => {
  let cfg = {};
  cfg = { ...cfg, pagas: M.alternar(cfg, 'pre-1', d('2026-12-09')) };
  assert.equal(M.estado(cfg, d('2026-12-10')).pago, 350);
  cfg = { ...cfg, pagas: M.definirValor(cfg, 'pre-1', 357.4) };
  assert.equal(M.estado(cfg, d('2026-12-10')).pago, 357.4);
  cfg = { ...cfg, pagas: M.alternar(cfg, 'ato', d('2026-11-04'), 3500) };
  assert.equal(Math.round(M.estado(cfg, d('2026-12-10')).pago * 100) / 100, 3857.4);
  assert.deepEqual(M.definirValor({}, 'pre-9', 10), {}); // não cria pagamento que não existe
});

test('marcos ato e financiamento não entram na contagem de parcelas com data', () => {
  const cfg = { pagas: M.alternar({}, 'ato', d('2026-11-04')) };
  const e = M.estado(cfg, d('2026-11-05'));
  assert.equal(e.total, 101); assert.equal(e.pagas, 0); assert.equal(e.atoPago, true); assert.equal(e.finPago, false);
});

test('juros de obra: soma por mês, um registro por mês, ordenação e remoção', () => {
  let cfg = {};
  cfg = { ...cfg, obra: M.addObra(cfg, { id: 'a', mes: '2027-01', v: 400 }) };
  cfg = { ...cfg, obra: M.addObra(cfg, { id: 'b', mes: '2026-12', v: 150.5 }) };
  cfg = { ...cfg, obra: M.addObra(cfg, { id: 'c', mes: '2027-01', v: 420 }) }; // substitui o mês repetido
  const e = M.estado(cfg, d('2027-02-01'));
  assert.deepEqual(e.obra.map((o) => o.mes), ['2026-12', '2027-01']);
  assert.equal(e.obraTotal, 570.5); assert.equal(e.obraUltima.v, 420);
  cfg = { ...cfg, obra: M.rmObra(cfg, 'c') };
  assert.equal(M.estado(cfg, d('2027-02-01')).obraTotal, 150.5);
});

test('primeiro encargo de obra: até 30 dias depois da assinatura da Caixa', () => {
  const e = M.estado({ caixa: { assinatura: '2026-11-20' } }, d('2026-11-21'));
  assert.equal(e.primeiroEncargoAte, '2026-12-20');
  assert.equal(M.estado({}, d('2026-11-21')).primeiroEncargoAte, null);
});

test('taxa efetiva anual de 1% ao mês e prazo de conclusão com tolerância', () => {
  const e = M.estado({}, d('2026-11-04'));
  assert.equal(Math.round(e.taxaPosAnual * 100) / 100, 12.68);
  assert.equal(e.conclusao, '2028-12-26'); assert.equal(e.conclusaoComTolerancia, '2029-06-24');
  assert.equal(M.num('1.234,50'), 1234.5); assert.equal(M.num('350'), 350); assert.equal(M.num('abc'), 0);
});
