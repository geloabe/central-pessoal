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
  for (const x of I.todas()) { assert.ok(x.t.como.length >= 3 && x.t.pronto && x.t.vezes >= 1, x.t.id); }
});

test('foco em fala e vocabulário: nada de escrita no plano e fala + cartões somam mais da metade do tempo', () => {
  for (const s of I.INGLES) {
    assert.deepEqual(s.tarefas.map((t) => t.id.split('-')[1]), ['sh', 'es', 'fa', 'vc']);
    const fala = s.tarefas.filter((t) => ['fa', 'vc'].includes(t.id.split('-')[1])).reduce((a, t) => a + t.min * t.vezes, 0);
    assert.ok(fala / I.MIN_ING >= 0.5, 'semana ' + s.n);
  }
});

test('é pessoal: nada no texto manda tratar o inglês como parte do PDI', () => {
  assert.doesNotMatch(JSON.stringify(I.INGLES) + JSON.stringify(I.VOCAB), /PDI|Metas →/);
});

test('vocabulário: 60 expressões, 15 por semana, ids únicos e campos completos', () => {
  assert.equal(I.VOCAB.length, 60);
  assert.equal(new Set(I.VOCAB.map((c) => c.id)).size, 60);
  for (const s of I.INGLES) assert.equal(s.vocab.length, 15);
  for (const c of I.VOCAB) {
    assert.ok(c.pt.length > 8 && c.en.length >= 3 && c.ex.length > 15, c.id);
    assert.ok(![c.pt, c.en, c.ex].some((x) => x.includes(';')), 'sem ponto e vírgula (exportação): ' + c.id);
  }
});

test('anki exporta 15 linhas por semana', () => {
  for (const s of I.INGLES) assert.equal(I.cartoesAnki(s.n).split('\n').length, 15);
  assert.equal(I.cartoesAnki(99), '');
});

test('cenários de fala: 3 por semana, cada um aponta para uma estrutura que existe', () => {
  for (const s of I.INGLES) {
    assert.equal(s.fala.length, 3); assert.equal(s.estruturas.length, 3);
    for (const f of s.fala) assert.ok(f.p.length > 15 && s.estruturas[f.estr], s.n + ': ' + f.p);
    assert.ok(s.pauta.length > 40);
  }
  assert.match(I.INGLES[0].fala[0].p, /linha de base/);
  assert.match(I.INGLES[3].fala[0].p, /nova medição/);
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
  assert.equal(e.porSemana[1].feito, 30 + 20);
  assert.equal(e.prox.t.id, '1-es');
});

test('atrasadas vêm primeiro e a prática adianta quando a semana termina', () => {
  const cfg = I.cfgPadrao(d('2026-11-04'));
  const e = I.estado(cfg, d('2026-11-12')); // semana 2
  assert.equal(e.prox.t.id, '1-sh'); assert.equal(e.atrasadas, 4);
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

test('cartões: libera por semana, limita as novas por dia e a sessão', () => {
  let cfg = I.cfgPadrao(d('2026-11-04'));
  let f = I.fila(cfg, d('2026-11-04'));
  assert.equal(f.novos.length, I.NOVOS_DIA); assert.equal(f.devidos.length, 0);
  assert.ok(f.sessao.every((c) => c.w === 1));
  // depois de ver as 8 de hoje, não há mais novas no mesmo dia
  f.novos.forEach((c) => { cfg = { ...cfg, srs: I.responder(cfg, c.id, true, d('2026-11-04')) }; });
  f = I.fila(cfg, d('2026-11-04'));
  assert.equal(f.novos.length, 0); assert.equal(f.sessao.length, 0);
  // semana 1 tem só 15: no dia seguinte vencem 8 e entram as 7 restantes
  f = I.fila(cfg, d('2026-11-05'));
  assert.equal(f.devidos.length, 8); assert.equal(f.novos.length, 7);
  assert.ok(f.sessao.length <= 20);
  // cartões da semana 2 só aparecem quando a semana 2 chega
  assert.ok(!I.fila(cfg, d('2026-11-06')).novos.some((c) => c.w === 2));
  const ids2 = I.fila(cfg, d('2026-11-12')).novos.map((c) => c.w);
  assert.ok(ids2.includes(2));
});

test('cartões: errar volta amanhã (caixa 0); acertar espaça 1, 3, 7, 14, 30 dias', () => {
  const hoje = d('2026-11-04');
  let cfg = I.cfgPadrao(hoje);
  cfg = { ...cfg, srs: I.responder(cfg, 'v1', false, hoje) };
  assert.deepEqual(cfg.srs.v1, { c: 0, p: '2026-11-05', d: '2026-11-04' });
  const esperados = [[1, 1], [2, 3], [3, 7], [4, 14], [5, 30], [5, 30]];
  let t = hoje;
  for (const [caixa, dias] of esperados) {
    cfg = { ...cfg, srs: I.responder(cfg, 'v1', true, t) };
    assert.equal(cfg.srs.v1.c, caixa);
    assert.equal(cfg.srs.v1.p, I.iso(I.addDias(t, dias)));
    t = I.addDias(t, dias);
  }
  cfg = { ...cfg, srs: I.responder(cfg, 'v1', false, t) };
  assert.equal(cfg.srs.v1.c, 0); assert.equal(cfg.srs.v1.d, '2026-11-04');
  const antes = I.cfgPadrao(hoje); I.responder(antes, 'v2', true, hoje);
  assert.deepEqual(antes.srs, {}); // não muta o original
});

test('estatísticas de vocabulário: vistas, firmes e devidas', () => {
  const hoje = d('2026-11-10');
  const cfg = { inicio: '2026-11-04', srs: { v1: { c: 3, p: '2026-11-20', d: '2026-11-04' }, v2: { c: 1, p: '2026-11-10', d: '2026-11-04' }, v3: { c: 0, p: '2026-11-11', d: '2026-11-09' }, zz: { c: 5, p: '2026-11-01', d: '2026-11-01' } } };
  const s = I.estado(cfg, hoje).vocab;
  assert.equal(s.total, 60); assert.equal(s.vistos, 3); assert.equal(s.dominados, 1); assert.equal(s.devidos, 1);
});

test('integração com o painel', async () => {
  await import('../assets/progresso.js');
  const G = globalThis.CP_PROG, hoje = new Date(2026, 10, 10);
  assert.equal(G.calcular({}, hoje).ingles.ativo, false);
  const p = G.calcular({ ingles: { inicio: '2026-11-04', cont: { '1-sh': 1 }, aulas: { 1: 3 } } }, hoje);
  assert.equal(p.ingles.ativo, true); assert.equal(p.ingles.aulasSemana, 3); assert.equal(p.ingles.aulasTotal, 3);
  assert.ok(p.metas.vida.some((m) => m.id === 'ingles'));
});

test('aulas do curso por dia: meta 7, semana de segunda a domingo, nota e remoção', () => {
  assert.equal(I.AULAS_SEMANA, 7);
  const qua = new Date(2026, 10, 4); // quarta 04/11/2026
  let cfg = {};
  cfg = { ...cfg, curso: I.cursoMarcar(cfg, '2026-11-04') };
  cfg = { ...cfg, curso: I.cursoMarcar(cfg, '2026-11-02', 'verbos') }; // segunda da mesma semana
  cfg = { ...cfg, curso: I.cursoMarcar(cfg, '2026-11-01') };           // domingo anterior: fora da semana
  cfg = { ...cfg, curso: I.cursoMarcar(cfg, '2026-13-45') };           // data inválida é ignorada
  const r = I.cursoResumo(cfg, qua);
  assert.equal(r.semana, 2); assert.equal(r.total, 3); assert.equal(r.hoje, true); assert.equal(r.meta, 7);
  assert.equal(r.lista[0].data, '2026-11-04'); assert.equal(r.lista.find(x => x.data === '2026-11-02').nota, 'verbos');
  cfg = { ...cfg, curso: I.cursoMarcar(cfg, '2026-11-04', 'novo texto') };
  assert.equal(I.cursoResumo(cfg, qua).lista[0].nota, 'novo texto');
  cfg = { ...cfg, curso: I.cursoRemover(cfg, '2026-11-04') };
  assert.equal(I.cursoResumo(cfg, qua).hoje, false);
  assert.equal(I.cursoResumo(undefined, qua).semana, 0);
});

test('home: aulas do curso aparecem mesmo sem ciclo iniciado', async () => {
  await import('../assets/progresso.js'); const G = globalThis.CP_PROG;
  const p = G.calcular({ ingles: { curso: { '2026-11-04': { nota: '' } } } }, new Date(2026, 10, 4));
  assert.equal(p.ingles.ativo, false); assert.equal(p.ingles.cursoSemana, 1); assert.equal(p.ingles.cursoMeta, 7); assert.equal(p.ingles.cursoHoje, true);
});

test('aulas do curso: várias no mesmo dia (n), teto 9, zero remove o dia', () => {
  const qua = new Date(2026, 10, 4);
  let cfg = { curso: { '2026-11-02': { nota: 'antigo, sem n' } } }; // formato anterior conta 1
  cfg = { curso: I.cursoAjustar(cfg, '2026-11-04', 1) };
  cfg = { curso: I.cursoAjustar(cfg, '2026-11-04', 1) };
  let r = I.cursoResumo(cfg, qua);
  assert.equal(r.hojeN, 2); assert.equal(r.semana, 3); assert.equal(r.lista[0].n, 2);
  cfg = { curso: I.cursoAjustar(cfg, '2026-11-02', 1) };
  assert.equal(I.cursoResumo(cfg, qua).semana, 4);
  assert.equal(I.cursoResumo(cfg, qua).lista.find(x => x.data === '2026-11-02').nota, 'antigo, sem n');
  for (let i = 0; i < 12; i++) cfg = { curso: I.cursoAjustar(cfg, '2026-11-04', 1) };
  assert.equal(I.cursoResumo(cfg, qua).hojeN, 9);
  cfg = { curso: I.cursoMarcar(cfg, '2026-11-04', 'nota') };
  assert.equal(I.cursoResumo(cfg, qua).hojeN, 9);
  for (let i = 0; i < 9; i++) cfg = { curso: I.cursoAjustar(cfg, '2026-11-04', -1) };
  assert.equal(I.cursoResumo(cfg, qua).hoje, false);
});
