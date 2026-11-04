// Testes das trilhas Databricks, Snowflake e dbt (assets/plat.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/plat.js';

const P = globalThis.CP_PLAT;
const hoje = new Date(2026, 10, 10);

test('28 aulas: 10 de Databricks, 10 de Snowflake e 8 de dbt, com ordem própria em cada trilha', () => {
  assert.equal(P.LICOES.length, 28);
  const por = (t) => P.LICOES.filter((l) => l.trilha === t);
  assert.deepEqual([por('db').length, por('sf').length, por('dbt').length], [10, 10, 8]);
  assert.deepEqual(por('db').map((l) => l.ordem), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(por('sf').map((l) => l.ordem), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(por('dbt').map((l) => l.ordem), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(new Set(P.LICOES.map((l) => l.topico)).size, 28);
  assert.deepEqual(P.LICOES.map((l) => l.n), Array.from({ length: 28 }, (_, i) => i + 1));
});

test('9 projetos de portfólio, 3 por trilha, cada um com aulas da própria trilha e entregas', () => {
  assert.equal(P.PROJETOS.length, 9);
  assert.equal(new Set(P.PROJETOS.map((p) => p.id)).size, 9);
  for (const t of ['db', 'sf', 'dbt']) assert.equal(P.PROJETOS.filter((p) => p.trilha === t).length, 3, t);
  for (const p of P.PROJETOS) {
    assert.ok(p.aulas.length >= 1 && p.aulas.every((n) => P.licao(n) && P.licao(n).trilha === p.trilha), p.id);
    assert.ok(p.entregas.length >= 4 && p.porque.length > 40, p.id);
    assert.ok(p.entregas.some((e) => /README em inglês|READMEs? em inglês/i.test(e) || /inglês/i.test(e)), 'README em inglês: ' + p.id);
  }
});

test('plano no formato do motor de estudo: tópicos, 3 seções, rótulos e aulas liberadas', () => {
  const K = globalThis.CP_PLANO_ESTUDO;
  assert.equal(K.TOPICOS.length, 28); assert.equal(K.SECOES.length, 3);
  assert.deepEqual([...new Set(K.TOPICOS.map((t) => t.s))], [1, 2, 3]);
  assert.equal(K.ROTULOS.dia, 'Aula');
  assert.equal(K.estado({}).diaPlano, 1);
  assert.equal(K.estado({ aulas: { 1: '2026-11-05' } }).diaPlano, 2);
  assert.equal(K.estado({ aulas: { 11: '2026-11-05' } }).diaPlano, 12);
  assert.equal(K.estado({ aulas: { 28: '2026-11-05' } }).diaPlano, 28);
});

test('sem nada feito: próxima é a aula 1 da trilha ativa; trocar de trilha troca o próximo passo', () => {
  let e = P.estado({}, hoje);
  assert.equal(e.pct, 0); assert.equal(e.ativa, 'db'); assert.deepEqual([e.prox.n, e.prox.passo, e.prox.trilha], [1, 'aula', 'db']);
  e = P.estado({ ativa: 'sf' }, hoje); assert.deepEqual([e.prox.n, e.prox.trilha], [11, 'sf']);
  e = P.estado({ ativa: 'dbt' }, hoje); assert.deepEqual([e.prox.n, e.prox.trilha, e.prox.ordem], [21, 'dbt', 1]);
  assert.equal(P.estado({ ativa: 'xyz' }, hoje).ativa, 'db');
});

test('uma aula só conta como concluída com aula lida, quiz de 80% ou mais e lab; o próximo passo segue essa ordem', () => {
  let cfg = { ativa: 'db' };
  assert.deepEqual(P.passosDa(cfg, 1), { aula: false, quiz: false, lab: false });
  cfg = { ...cfg, aulas: { 1: '2026-11-10' } };
  assert.equal(P.estado(cfg, hoje).prox.passo, 'quiz');
  cfg = { ...cfg, quiz: { 1: { pct: 79, data: '2026-11-10' } } };
  assert.equal(P.estado(cfg, hoje).prox.passo, 'quiz');
  cfg = { ...cfg, quiz: { 1: { pct: 80, data: '2026-11-10' } } };
  assert.equal(P.estado(cfg, hoje).prox.passo, 'lab');
  cfg = { ...cfg, labs: { 1: '2026-11-10' } };
  const e = P.estado(cfg, hoje);
  assert.equal(P.completa(cfg, 1), true); assert.equal(e.completas, 1); assert.equal(e.passos, 3);
  assert.deepEqual([e.prox.n, e.prox.passo], [2, 'aula']);
  assert.equal(e.pct, Math.round(3 / 84 * 100));
  assert.equal(e.hoje, 3);
});

test('quando a trilha ativa termina, o próximo passo vem de outra trilha', () => {
  const aulas = {}, quiz = {}, labs = {};
  for (let n = 1; n <= 10; n++) { aulas[n] = '2026-11-05'; quiz[n] = { pct: 90, data: '2026-11-05' }; labs[n] = '2026-11-05'; }
  const e = P.estado({ ativa: 'db', aulas, quiz, labs }, hoje);
  assert.equal(e.porTrilha.db.completas, 10); assert.equal(e.porTrilha.db.pct, 100);
  assert.deepEqual([e.prox.trilha, e.prox.n], ['sf', 11]);
  assert.equal(e.diaPlano, 11);
});

test('projeto só fica pronto com os labs feitos e o link do repositório registrado', () => {
  let cfg = {};
  const st = () => P.estado(cfg, hoje).projetos.find((p) => p.id === 'pdb1');
  assert.deepEqual([st().labs, st().registrado, st().ok], [false, false, false]);
  cfg = { proj: { pdb1: { url: 'https://github.com/x/databricks-lakehouse-portfolio' } } };
  assert.deepEqual([st().labs, st().registrado, st().ok], [false, true, false]); // link sem labs não vale
  cfg = { ...cfg, labs: { 4: '2026-11-06', 5: '2026-11-07' } };
  assert.deepEqual([st().labs, st().registrado, st().ok], [true, true, true]);
  assert.equal(P.estado(cfg, hoje).projetosOk, 1);
  cfg = { labs: { 4: '2026-11-06', 5: '2026-11-07' } };
  assert.deepEqual([st().labs, st().ok], [true, false]); // labs sem link não vale
});

test('integração com o painel: o módulo só entra nas metas depois de começar', async () => {
  await import('../assets/progresso.js');
  const G = globalThis.CP_PROG;
  const vazio = G.calcular({}, hoje);
  assert.equal(vazio.plat.ativo, true); assert.equal(vazio.plat.iniciado, false);
  assert.ok(!vazio.metas.vida.some((m) => m.id === 'plat'));
  const p = G.calcular({ plat: { aulas: { 21: '2026-11-10' }, quiz: {}, labs: {} } }, hoje);
  assert.equal(p.plat.iniciado, true); assert.equal(p.plat.hoje, 1);
  assert.ok(p.metas.vida.some((m) => m.id === 'plat'));
  assert.ok(p.hoje >= 1);
  assert.equal(typeof p.plat.proximo, 'string');
});
