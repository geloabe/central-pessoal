// Testes da conversão Pluggy -> painel Financeiro (assets/pluggy-fin.js). Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import '../assets/pluggy-fin.js';

const P = globalThis.CP_PLUGGY;
const conta = (id, date, desc, value, cat) => ({ id, date, desc, value, type: value > 0 ? 'expense' : 'income', source: 'Nubank conta (Pluggy)', pluggyCategory: cat });
const cartao = (id, date, desc, value, cat) => ({ id, date, desc, value, type: value > 0 ? 'expense' : 'income', source: 'Nubank cartão (Pluggy)', pluggyCategory: cat });

test('compra no cartão pesa no mês seguinte; conta pesa no próprio mês', () => {
  const r = P.paraPainel([cartao('c1', '2026-11-02', 'Mp *Cafeteria', 22, 'Eating out'), conta('b1', '2026-11-05', 'Pagamento efetuado|ENEL DISTRIBUICAO', 91.24, 'Electricity')], [], '2026-11-01');
  const c = r.lancamentos.find((t) => t.id === 'c1'), b = r.lancamentos.find((t) => t.id === 'b1');
  assert.equal(c.month, 'Novembro'); assert.equal(c.budgetMonth, 'Dezembro'); assert.equal(c.source, 'Cartão de crédito'); assert.equal(c.paymentMethod, 'cartao');
  assert.equal(b.budgetMonth, 'Novembro'); assert.equal(b.source, 'Nubank'); assert.equal(b.category, 'energia');
});

test('dezembro não vira mês inexistente', () => {
  const [t] = P.paraPainel([cartao('c', '2026-12-10', 'Loja', 10)], [], '2026-12-01').lancamentos;
  assert.equal(t.budgetMonth, 'Dezembro');
});

test('só entra a partir da data pedida', () => {
  const r = P.paraPainel([conta('a', '2026-10-31', 'X', 5), conta('b', '2026-11-01', 'Y', 5)], [], '2026-11-01');
  assert.deepEqual(r.lancamentos.map((t) => t.id), ['b']);
});

test('não vira gasto: entrada na conta, investimento, empréstimo e pagamento de fatura', () => {
  const r = P.paraPainel([
    conta('e', '2026-11-03', 'Crédito em conta', -3200),
    conta('i1', '2026-11-04', 'Valor transferido para Investimentos', 57.75),
    conta('i2', '2026-11-04', 'Valor recebido de Investimentos', -2213.34),
    conta('l', '2026-11-04', 'Empréstimo quitado | Dinheiro do negócio', 3218.8),
    cartao('f', '2026-11-05', 'Pagamento recebido', -500)
  ], [], '2026-11-01');
  assert.equal(r.lancamentos.length, 0);
  assert.deepEqual(r.ignorados.map((t) => t.motivo), ['entrada na conta', 'investimento', 'investimento', 'empréstimo', 'pagamento de fatura']);
});

test('estorno no cartão reduz o gasto (valor negativo)', () => {
  const [t] = P.paraPainel([cartao('r', '2026-11-05', 'Estorno Loja X', -30)], [], '2026-11-01').lancamentos;
  assert.equal(t.value, -30);
});

test('aprende a categoria com o histórico do painel e ela vence a da Pluggy', () => {
  const hist = [{ desc: 'Mp *Guanabara', category: 'vestuario' }, { desc: 'MP*GUANABARA', category: 'vestuario' }];
  const [t] = P.paraPainel([cartao('g', '2026-11-02', 'Mp *Guanabara', 89, 'Shopping')], hist, '2026-11-01').lancamentos;
  assert.equal(t.category, 'vestuario');
});

test('Pix enviado a pessoa vira pix_pessoas e a descrição fica legível', () => {
  const [t] = P.paraPainel([conta('p', '2026-11-04', 'Transferência enviada|Gabriel Santos', 30, 'Transfers')], [], '2026-11-01').lancamentos;
  assert.equal(t.desc, 'Pix: Gabriel Santos'); assert.equal(t.category, 'pix_pessoas');
});

test('fixos conhecidos: aluguel, financiamento, internet, educação', () => {
  const c = (d, cat) => P.categoria({ desc: d, pluggyCategory: cat }, {});
  assert.equal(c('LOUP IMOVEIS', 'Services'), 'aluguel');
  assert.equal(c('TENDA NEGOCIOS IMOBILIARIOS SA', 'Housing'), 'financiamento');
  assert.equal(c('ALARES INTERNET SA', 'TV'), 'internet');
  assert.equal(c('TIMES OFFICE ALTHEMAN LTDA', 'Education'), 'educacao');
});
