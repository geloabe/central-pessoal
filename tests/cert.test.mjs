// Testes do plano da certificação (assets/cert.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/progresso.js';
import '../assets/cert.js';

const C = globalThis.CP_CERT;
const d = (s) => new Date(s + 'T12:00:00');

test('plano: 29 dias, 7 por semana nas 4 semanas e a prova no último', () => {
  assert.equal(C.N_DIAS, 29);
  assert.equal(C.PLANO[28].t, 'Dia da prova');
  assert.ok(C.PLANO.every((p) => p.tarefas.length >= 2 && p.min > 0));
  const ids = C.PLANO.flatMap((p) => p.tarefas.map((t) => t.id));
  assert.equal(new Set(ids).size, ids.length); // ids únicos
});

test('plano: pesos oficiais somam 100 e há 19 tópicos, todos ligados a dias que existem', () => {
  assert.equal(C.SECOES.reduce((a, s) => a + s.peso, 0), 100);
  assert.equal(C.TOPICOS.length, 19);
  assert.ok(C.TOPICOS.every((t) => t.d.every((n) => n >= 1 && n <= C.N_DIAS)));
  assert.ok(C.SECOES.every((s) => C.TOPICOS.some((t) => t.s === s.id)));
});

test('prontidão: sem notas é 0 e tudo 3 é 100; respeita o peso das seções', () => {
  assert.equal(C.prontidao({}).pct, 0);
  const todos = Object.fromEntries(C.TOPICOS.map((t) => [t.id, 3]));
  assert.equal(C.prontidao(todos).pct, 100);
  const s2 = Object.fromEntries(C.TOPICOS.filter((t) => t.s === 2).map((t) => [t.id, 3]));
  assert.equal(C.prontidao(s2).pct, 25); // seção 2 vale 25%
});

test('estado: sem início não está ativo', () => {
  const e = C.estado({}, d('2026-11-03'));
  assert.equal(e.ativo, false);
  assert.equal(e.pct, 0);
});

test('estado: antes do início mostra o dia 1 e quantos dias faltam', () => {
  const e = C.estado({ inicio: '2026-11-04' }, d('2026-11-03'));
  assert.equal(e.ativo, true);
  assert.equal(e.dia, 0);
  assert.equal(e.diaPlano, 1);
  assert.equal(e.comecaEm, 1);
});

test('estado: dia, tarefas de hoje e atrasadas sem culpa', () => {
  const cfg = { inicio: '2026-11-04', feitas: { '1-0': '2026-11-04' } };
  const e = C.estado(cfg, d('2026-11-06')); // dia 3
  assert.equal(e.dia, 3);
  assert.equal(e.tarefasHoje.length, C.PLANO[2].tarefas.length);
  assert.ok(e.atrasadas.length > 0);
  assert.ok(e.atrasadas.every((a) => a.dia < 3));
  assert.equal(e.atrasadas.some((a) => a.id === '1-0'), false); // o que foi feito não é atraso
});

test('estado: um dia sem estudar não quebra a sequência (regra de pausa)', () => {
  const feitas = { '1-0': '2026-11-04', '2-0': '2026-11-05', '4-0': '2026-11-07' }; // dia 6/11 em branco
  const e = C.estado({ inicio: '2026-11-04', feitas }, d('2026-11-07'));
  assert.equal(e.seq, 3);
  assert.equal(e.pausas, 1);
});

test('estado: dois dias em branco em menos de 7 dias quebram a sequência', () => {
  const feitas = { '1-0': '2026-11-04', '3-0': '2026-11-06', '5-0': '2026-11-08' }; // 5 e 7 em branco
  const e = C.estado({ inicio: '2026-11-04', feitas }, d('2026-11-08'));
  assert.equal(e.seq, 2); // só 06 e 08: o 7 é a pausa, o 5 quebra e o dia 4 não conta
});

test('alternar marca com a data de hoje e desmarca', () => {
  const f1 = C.alternar({ feitas: {} }, '2-1', d('2026-11-05'));
  assert.equal(f1['2-1'], '2026-11-05');
  const f2 = C.alternar({ feitas: f1 }, '2-1', d('2026-11-05'));
  assert.equal(f2['2-1'], undefined);
});

test('empurrar adia o início e a prova na mesma medida', () => {
  const o = C.empurrar({ inicio: '2026-11-04', prova: '2026-12-02' }, 1);
  assert.equal(o.inicio, '2026-11-05');
  assert.equal(o.prova, '2026-12-03');
});

test('padrão: começa amanhã e a prova cai 29 dias depois', () => {
  const c = C.cfgPadrao(d('2026-11-03'));
  assert.equal(c.inicio, '2026-11-04');
  assert.equal(c.prova, '2026-12-03');
});

test('simulados: média dos 2 últimos completos define a zona; parcial não entra', () => {
  const s = C.simStats([
    { data: '2026-11-15', tipo: 'completo', acertos: 30, total: 50, fraca: 2 },
    { data: '2026-11-20', tipo: 'parcial', acertos: 28, total: 30, fraca: null },
    { data: '2026-11-28', tipo: 'completo', acertos: 42, total: 50, fraca: 2 }
  ]);
  assert.equal(s.media, 72); // (60 + 84) / 2
  assert.equal(s.zona, 'amarela');
  assert.equal(s.maisFraca, 2);
  assert.equal(s.melhor, 93);
});

test('integração: calcular funciona sem plano e com plano (marcos, meta e contagem de hoje)', () => {
  const P = globalThis.CP_PROG;
  const vazio = P.calcular({}, d('2026-11-10'));
  assert.equal(vazio.cert.ativo, false);
  assert.equal(vazio.marcos.find((m) => m.id === 'c1').ok, false);
  const cert = { inicio: '2026-11-04', prova: '2026-12-02', feitas: { '1-0': '2026-11-10', '1-1': '2026-11-10' }, simulados: [{ data: '2026-11-10', tipo: 'completo', acertos: 41, total: 50 }] };
  const p = P.calcular({ cert }, d('2026-11-10'));
  assert.equal(p.cert.ativo, true);
  assert.equal(p.cert.hoje, 2);
  assert.equal(p.marcos.find((m) => m.id === 'c1').ok, true);
  assert.equal(p.marcos.find((m) => m.id === 'cs80').ok, true); // 82%
  assert.ok(p.metas.vida.some((m) => m.id === 'cert'));
  assert.ok(p.hoje >= 1);
});

test('materiais: links https, dias válidos e grupos preenchidos', () => {
  const urls = [];
  for (const g of C.MATERIAIS) { assert.ok(g.t && g.i.length); g.i.forEach((x) => { assert.equal(x.length, 3); urls.push(x[1]); assert.ok(x[2].length > 10); }); }
  for (const [dia, lista] of Object.entries(C.DOCS_DIA)) { assert.ok(+dia >= 1 && +dia <= C.N_DIAS); lista.forEach((x) => urls.push(x[1])); }
  assert.ok(urls.every((u) => /^https:\/\//.test(u)));
  assert.equal(new Set(urls.filter((u, i) => urls.indexOf(u) !== i)).size >= 0, true);
});
