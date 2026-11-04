// Testes do PDI (assets/pdi.js): plano de estudo de 4 semanas em duas trilhas. Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/pdi.js';

const P = globalThis.CP_PDI;
const d = (s) => P.parse(s);

test('16 aulas, 4 por semana, duas trilhas de 8; em cada semana: 2 de qualidade e 2 de IA', () => {
  assert.equal(P.LICOES.length, 16);
  for (let w = 1; w <= 4; w++) assert.deepEqual(P.LICOES.filter((l) => l.semana === w).map((l) => l.trilha), ['q', 'q', 'ia', 'ia'], 'semana ' + w);
  assert.equal(P.LICOES.filter((l) => l.trilha === 'q').length, 8);
  assert.equal(P.LICOES.filter((l) => l.trilha === 'ia').length, 8);
  assert.deepEqual(P.LICOES.map((l) => l.n), Array.from({ length: 16 }, (_, i) => i + 1));
  assert.equal(new Set(P.LICOES.map((l) => l.topico)).size, 16);
  assert.deepEqual(P.METAS.map((m) => m.id), ['cert', 'q', 'ia']);
});

test('plano no formato do motor de estudo: tópicos, seções, rótulos e estado', () => {
  const K = globalThis.CP_PLANO_ESTUDO;
  assert.equal(K.TOPICOS.length, 16); assert.equal(K.SECOES.length, 2);
  assert.ok(K.TOPICOS.every((t) => t.d.length === 1 && [1, 2].includes(t.s) && t.id));
  assert.equal(K.ROTULOS.dia, 'Aula');
  assert.equal(K.estado({ inicio: '2026-11-04' }, d('2026-11-12')).diaPlano, 8);
  assert.equal(K.estado(null, d('2026-11-12')).diaPlano, 4); // sem plano ainda: libera a 1ª semana
  assert.equal(typeof K.iso, 'function'); assert.equal(typeof K.addDias, 'function');
});

test('estado: antes, durante e depois do ciclo; aulas liberadas por semana', () => {
  const cfg = P.cfgPadrao(d('2026-11-04'));
  assert.equal(P.estado(null, d('2026-11-04')).ativo, false);
  const a = P.estado(cfg, d('2026-11-02'));
  assert.equal(a.semana, 0); assert.equal(a.comecaEm, 2); assert.equal(a.diaPlano, 4);
  assert.equal(P.estado(cfg, d('2026-11-04')).semana, 1);
  assert.equal(P.estado(cfg, d('2026-11-11')).diaPlano, 8);
  assert.equal(P.estado(cfg, d('2026-12-01')).semana, 4); assert.equal(P.estado(cfg, d('2026-12-01')).diaPlano, 16);
  const z = P.estado(cfg, d('2026-12-02'));
  assert.equal(z.encerrado, true); assert.equal(z.diaPlano, 16); assert.equal(z.fim, '2026-12-01');
});

test('uma aula só conta como concluída com aula lida, quiz de 80% ou mais e lab', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  assert.deepEqual(P.passosDa(cfg, 1), { aula: false, quiz: false, lab: false });
  cfg = { ...cfg, aulas: { 1: '2026-11-05' }, quiz: { 1: { pct: 79, data: '2026-11-05' } } };
  assert.deepEqual(P.passosDa(cfg, 1), { aula: true, quiz: false, lab: false });
  cfg = { ...cfg, quiz: { 1: { pct: 80, data: '2026-11-05' } }, labs: { 1: '2026-11-06' } };
  assert.deepEqual(P.passosDa(cfg, 1), { aula: true, quiz: true, lab: true });
  const e = P.estado(cfg, d('2026-11-06'));
  assert.equal(e.completas, 1); assert.equal(e.passos, 3); assert.equal(e.pct, Math.round(3 / 48 * 100));
  assert.equal(e.porTrilha.q.completas, 1); assert.equal(e.porTrilha.ia.completas, 0);
});

test('próximo passo: aula, depois quiz, depois lab, depois a aula seguinte; atrasadas sem culpa', () => {
  let cfg = P.cfgPadrao(d('2026-11-04'));
  const hoje = d('2026-11-12'); // semana 2: aulas 1..8 liberadas
  let e = P.estado(cfg, hoje);
  assert.deepEqual([e.prox.n, e.prox.passo], [1, 'aula']); assert.equal(e.atrasadas, 4);
  cfg = { ...cfg, aulas: { 1: '2026-11-12' } };
  assert.deepEqual([P.estado(cfg, hoje).prox.n, P.estado(cfg, hoje).prox.passo], [1, 'quiz']);
  cfg = { ...cfg, quiz: { 1: { pct: 70, data: '2026-11-12' } } };
  assert.equal(P.estado(cfg, hoje).prox.passo, 'quiz'); // 70% não passa
  cfg = { ...cfg, quiz: { 1: { pct: 85, data: '2026-11-12' } } };
  assert.equal(P.estado(cfg, hoje).prox.passo, 'lab');
  cfg = { ...cfg, labs: { 1: '2026-11-12' } };
  e = P.estado(cfg, hoje);
  assert.deepEqual([e.prox.n, e.prox.passo], [2, 'aula']); assert.equal(e.atrasadas, 3);
});

test('terminar tudo liberado adianta a próxima aula', () => {
  let cfg = P.cfgPadrao(d('2026-11-04')), a = {}, q = {}, l = {};
  for (let n = 1; n <= 4; n++) { a[n] = '2026-11-05'; q[n] = { pct: 90, data: '2026-11-05' }; l[n] = '2026-11-05'; }
  cfg = { ...cfg, aulas: a, quiz: q, labs: l };
  const e = P.estado(cfg, d('2026-11-06')); // semana 1: só 1..4 liberadas
  assert.equal(e.atrasadas, 0); assert.equal(e.prox.n, 5); assert.equal(e.proxAdiantada, true);
});

test('conta as etapas feitas hoje', () => {
  const cfg = { ...P.cfgPadrao(d('2026-11-04')), aulas: { 1: '2026-11-10', 2: '2026-11-09' }, quiz: { 1: { pct: 90, data: '2026-11-10' } }, labs: { 3: '2026-11-10' } };
  assert.equal(P.estado(cfg, d('2026-11-10')).hoje, 3);
});

test('resumo para o gestor usa só o que foi concluído ou medido', () => {
  const cfg = { ...P.cfgPadrao(d('2026-11-04')), aulas: { 1: '2026-11-05' }, res: { q_tabelas: '5' }, evid: { q: [{ t: 'Tabela de criticidade', url: '' }] } };
  const t = P.resumoTexto(cfg, { ativo: true, pct: 20, prontidao: 15, simMax: 0, aprovada: false, prova: '2026-12-03' }, d('2026-11-10'));
  assert.match(t, /0 de 16 aulas concluídas/);
  assert.match(t, /Tabelas cobertas: 5/); assert.match(t, /Problemas reais encontrados: —/);
  assert.match(t, /Acurácia final: —/); assert.match(t, /Prova prevista para 03\/12\/2026/);
  assert.match(t, /Evidência: Tabela de criticidade/);
  assert.match(t, /Estudo: 0 de 8 aulas concluídas; 1 aula lida/);
  assert.doesNotMatch(t, /prática de inglês|aulas de inglês/);
  assert.equal(P.resumoTexto(null, null, d('2026-11-10')), '');
});

test('integração com o painel: sem PDI não conta; com PDI conta etapas de hoje e aulas concluídas', async () => {
  await import('../assets/progresso.js');
  const G = globalThis.CP_PROG, hoje = new Date(2026, 10, 10);
  const vazio = G.calcular({}, hoje);
  assert.equal(vazio.pdi.ativo, false);
  assert.ok(!vazio.metas.vida.some((m) => m.id === 'pdi'));
  const doc = { inicio: '2026-11-04', aulas: { 1: '2026-11-10' }, quiz: { 1: { pct: 90, data: '2026-11-10', n: 1 } }, labs: { 1: '2026-11-09' } };
  const p = G.calcular({ pdi: doc }, hoje);
  assert.equal(p.pdi.ativo, true); assert.equal(p.pdi.hoje, 2); assert.equal(p.pdi.feitas, 1); assert.equal(p.pdi.total, 16);
  assert.ok(p.metas.vida.some((m) => m.id === 'pdi'));
  assert.ok(p.marcos.find((m) => m.id === 'pd1').ok);
  assert.ok(p.hoje >= 1);
  assert.equal(typeof p.pdi.proximo, 'string');
});
