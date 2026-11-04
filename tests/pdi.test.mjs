// Testes do PDI (assets/pdi.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/pdi.js';

const P = globalThis.CP_PDI;
const d = (s) => P.parse(s);

test('cada semana soma 240 min de PDI e 150 min de inglês', () => {
  for (const s of P.SEMANAS) assert.equal(s.tarefas.reduce((a, t) => a + t.min, 0), P.MIN_PDI, 'PDI semana ' + s.n);
  for (const s of P.INGLES) assert.equal(s.tarefas.reduce((a, t) => a + t.min * t.vezes, 0), P.MIN_ING, 'inglês semana ' + s.n);
});

test('ids únicos, metas válidas e tarefas completas', () => {
  const ids = [...P.todasPdi(), ...P.todasIng()].map((x) => x.t.id);
  assert.equal(new Set(ids).size, ids.length);
  const validas = new Set(['q', 'ia', 'en', 'geral']);
  for (const x of [...P.todasPdi(), ...P.todasIng()]) {
    assert.ok(validas.has(x.t.m), x.t.id);
    assert.ok(x.t.t && x.t.t.length > 5, x.t.id);
    assert.ok(x.t.como.length >= 1 && x.t.como.every((c) => c.length > 20 || x.t.id === '4-b'), x.t.id);
    assert.ok(x.t.pronto, x.t.id);
  }
  for (const x of P.todasPdi()) if (x.t.id !== '4-b') assert.ok(x.t.como.length >= 3, 'passos suficientes ' + x.t.id);
});

test('inglês: 8 frases por semana, todas com tradução de uso', () => {
  for (const s of P.INGLES) {
    assert.equal(s.frases.length, 8);
    assert.ok(s.frases.every((f) => f[0] && f[1]));
    assert.equal(P.cartoesAnki(s.n).split('\n').length, 8);
  }
});

test('estado: antes, durante e depois do ciclo', () => {
  const cfg = P.cfgPadrao(d('2026-11-04'));
  assert.equal(P.estado(null, d('2026-11-04')).ativo, false);
  const a = P.estado(cfg, d('2026-11-02'));
  assert.equal(a.semana, 0); assert.equal(a.comecaEm, 2); assert.equal(a.proxPdi.t.id, '1-q1');
  assert.equal(P.estado(cfg, d('2026-11-04')).semana, 1);
  assert.equal(P.estado(cfg, d('2026-11-11')).semana, 2);
  assert.equal(P.estado(cfg, d('2026-12-01')).semana, 4);
  const z = P.estado(cfg, d('2026-12-02'));
  assert.equal(z.encerrado, true); assert.equal(z.semana, 4);
  assert.equal(P.estado(cfg, d('2026-11-04')).fim, '2026-12-01');
});

test('próximo passo: segue a ordem, acumula atrasadas sem culpa e adianta se tudo da semana acabou', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  const hoje = d('2026-11-12'); // semana 2
  let e = P.estado(cfg, hoje);
  assert.equal(e.proxPdi.t.id, '1-q1'); assert.equal(e.atrasadas, 4);
  for (const id of ['1-q1', '1-q2', '1-i1', '1-i2']) cfg = { ...cfg, feitas: P.alternar(cfg, id, hoje) };
  e = P.estado(cfg, hoje);
  assert.equal(e.proxPdi.t.id, '2-q1'); assert.equal(e.atrasadas, 0);
  for (const id of ['2-q1', '2-q2', '2-i1', '2-i2']) cfg = { ...cfg, feitas: P.alternar(cfg, id, hoje) };
  e = P.estado(cfg, hoje);
  assert.equal(e.proxPdi.t.id, '3-q1'); assert.equal(e.proxPdiAdiantada, true);
  assert.equal(e.pct, Math.round((480 / 960) * 100));
});

test('alternar desfaz e não muta o original', () => {
  const cfg = P.cfgPadrao(d('2026-11-04'));
  const f = P.alternar(cfg, '1-q1', d('2026-11-05'));
  assert.equal(f['1-q1'], '2026-11-05'); assert.deepEqual(cfg.feitas, {});
  assert.deepEqual(P.alternar({ ...cfg, feitas: f }, '1-q1', d('2026-11-06')), {});
});

test('contador de inglês respeita o limite e remove zeros', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  for (let i = 0; i < 5; i++) cfg = { ...cfg, cont: P.contar(cfg, '1-sh', 1) };
  assert.equal(cfg.cont['1-sh'], 3);
  for (let i = 0; i < 5; i++) cfg = { ...cfg, cont: P.contar(cfg, '1-sh', -1) };
  assert.equal(cfg.cont['1-sh'], undefined);
  assert.deepEqual(P.contar(cfg, 'nao-existe', 1), {});
  const e = P.estado({ ...cfg, cont: { '1-sh': 3, '1-es': 1 } }, d('2026-11-05'));
  assert.equal(e.porSemana[1].ingFeito, 36 + 25);
  assert.equal(e.proxIng.t.id, '1-es');
});

test('aulas: contador por semana com teto', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  for (let i = 0; i < 6; i++) cfg = { ...cfg, aulas: P.ajustarAulas(cfg, 1, 1) };
  const e = P.estado(cfg, d('2026-11-05'));
  assert.equal(e.aulasSemana, 6); assert.equal(e.aulasTotal, 6);
  assert.equal(P.ajustarAulas({ aulas: { 1: 0 } }, 1, -1)[1], 0);
});

test('resumo para o gestor usa só o que foi medido', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  cfg = { ...cfg, feitas: P.alternar(cfg, '1-q1', d('2026-11-05')), res: { q_tabelas: '5' }, evid: { q: [{ t: 'Tabela de criticidade', url: '' }] } };
  const t = P.resumoTexto(cfg, { ativo: true, pct: 20, prontidao: 15, simMax: 0, aprovada: false, prova: '2026-12-03' }, d('2026-11-10'));
  assert.match(t, /Tabelas cobertas: 5/);
  assert.match(t, /Problemas reais encontrados: —/);
  assert.match(t, /Prova prevista para 03\/12\/2026/);
  assert.match(t, /Evidência: Tabela de criticidade/);
  assert.match(t, /Acurácia final: —/);
  assert.equal(P.resumoTexto(null, null, d('2026-11-10')), '');
});

test('integração com o painel: sem PDI não conta; com PDI conta entregas de hoje e entra nas metas', async () => {
  await import('../assets/progresso.js');
  const G = globalThis.CP_PROG, hoje = new Date(2026, 10, 10);
  const vazio = G.calcular({}, hoje);
  assert.equal(vazio.pdi.ativo, false);
  assert.ok(!vazio.metas.vida.some((m) => m.id === 'pdi'));
  const doc = { inicio: '2026-11-04', feitas: { '1-q1': '2026-11-10', '1-q2': '2026-11-09' } };
  const p = G.calcular({ pdi: doc }, hoje);
  assert.equal(p.pdi.ativo, true); assert.equal(p.pdi.hoje, 1); assert.equal(p.pdi.feitas, 2);
  assert.ok(p.metas.vida.some((m) => m.id === 'pdi'));
  assert.ok(p.marcos.find((m) => m.id === 'pd1').ok);
  assert.ok(p.hoje >= 1);
});
