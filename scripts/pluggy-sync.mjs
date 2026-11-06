// Sincroniza lançamentos do Nubank (Open Finance, via Pluggy/MeuPluggy) com a Central Pessoal. SÓ LEITURA.
//
//   npm run pluggy -- --dry     -> baixa e salva em dados/pluggy-AAAA-MM-DD.json (nada vai ao Supabase)
//   npm run pluggy              -> baixa e grava no Supabase (docs, coleção "pluggy-tx"; idempotente)
//   npm run pluggy -- --desde 2026-01-01   -> só lançamentos a partir dessa data (padrão: 120 dias)
//
// Variáveis no .env (nunca no front-end, nunca no git):
//   PLUGGY_CLIENT_ID, PLUGGY_CLIENT_SECRET  -> da Development Application no dashboard.pluggy.ai
//   PLUGGY_ITEM_IDS                         -> ids das conexões (vírgula). Se vazio, tenta listar.
// Só usa os endpoints de leitura da Pluggy: /auth, /items, /accounts, /transactions.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const API = 'https://api.pluggy.ai';

// Converte um lançamento da Pluggy para o formato simples da Central (valor positivo = gasto).
export function mapTx(t, acc) {
  const credito = acc?.type === 'CREDIT';
  const amount = Number(t.amount);
  // Conta: saída vem negativa; cartão: compra vem positiva. Normaliza: gasto > 0, entrada < 0.
  const gasto = credito ? amount : -amount;
  const date = String(t.date).slice(0, 10);
  return {
    id: 'pl-' + t.id,
    date,
    month: date.slice(0, 7),
    desc: String(t.descriptionRaw || t.description || '').trim(),
    value: Math.round(gasto * 100) / 100,
    type: gasto > 0 ? 'expense' : 'income',
    source: credito ? 'Nubank cartão (Pluggy)' : 'Nubank conta (Pluggy)',
    pluggyCategory: t.category || null,
    accountId: t.accountId,
    status: t.status || null,
  };
}

async function req(path, apiKey, init = {}) {
  const r = await fetch(API + path, {
    ...init,
    headers: { 'content-type': 'application/json', ...(apiKey ? { 'X-API-KEY': apiKey } : {}) },
  });
  if (!r.ok) throw new Error(`Pluggy ${init.method || 'GET'} ${path.split('?')[0]} -> ${r.status} ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

async function paginate(path, apiKey) {
  const out = [];
  for (let page = 1; ; page++) {
    const j = await req(`${path}${path.includes('?') ? '&' : '?'}pageSize=500&page=${page}`, apiKey);
    out.push(...(j.results || []));
    if (page >= (j.totalPages || 1)) return out;
  }
}

// /v2/transactions usa cursor (campo 'next') e o filtro dateFrom.
async function transacoes(accountId, desde, apiKey) {
  const out = [];
  // 'next' já vem como a query da próxima página (ex.: "?accountId=...&dateFrom=...&after=...").
  let q = `?accountId=${encodeURIComponent(accountId)}&dateFrom=${desde}`;
  while (q) {
    const j = await req('/v2/transactions' + q, apiKey);
    out.push(...(j.results || []));
    q = j.next || null;
  }
  return out;
}

async function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  try { process.loadEnvFile(join(root, '.env')); } catch {}
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const desde = args.includes('--desde') ? args[args.indexOf('--desde') + 1] : new Date(Date.now() - 120 * 864e5).toISOString().slice(0, 10);
  const { PLUGGY_CLIENT_ID: id, PLUGGY_CLIENT_SECRET: secret } = process.env;
  if (!id || !secret) die('Faltam PLUGGY_CLIENT_ID e PLUGGY_CLIENT_SECRET no .env.');

  const { apiKey } = await req('/auth', null, { method: 'POST', body: JSON.stringify({ clientId: id, clientSecret: secret }) });

  let items = (process.env.PLUGGY_ITEM_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!items.length) {
    try { items = (await paginate('/items', apiKey)).map((i) => i.id); }
    catch (e) { die('Não consegui listar as conexões (' + e.message + '). Preencha PLUGGY_ITEM_IDS no .env.'); }
  }
  if (!items.length) die('Nenhuma conexão encontrada. Vincule o MeuPluggy na aplicação de desenvolvimento (OAuth).');

  const txs = [];
  for (const itemId of items) {
    const accounts = await paginate(`/accounts?itemId=${encodeURIComponent(itemId)}`, apiKey);
    for (const acc of accounts) {
      const lista = await transacoes(acc.id, desde, apiKey);
      console.log(`${acc.type} ${acc.name || acc.id}: ${lista.length} lançamentos desde ${desde}`);
      txs.push(...lista.map((t) => mapTx(t, acc)));
    }
  }
  txs.sort((a, b) => b.date.localeCompare(a.date));

  if (dry) {
    mkdirSync(join(root, 'dados'), { recursive: true });
    const file = join(root, 'dados', `pluggy-${new Date().toISOString().slice(0, 10)}.json`);
    writeFileSync(file, JSON.stringify({ syncedAt: new Date().toISOString(), desde, txs }, null, 1));
    return console.log(`Dry-run: ${txs.length} lançamentos salvos em ${file}. Nada foi enviado ao Supabase.`);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const cfg = readFileSync(join(root, 'assets', 'config.js'), 'utf8');
  const pick = (k) => (cfg.match(new RegExp(k + "\\s*:\\s*'([^']+)'")) || [])[1];
  const sb = createClient(process.env.SUPABASE_URL || pick('SUPABASE_URL'), process.env.SUPABASE_ANON_KEY || pick('SUPABASE_ANON_KEY'), { auth: { persistSession: false } });
  const { data: auth, error } = await sb.auth.signInWithPassword({ email: process.env.APP_EMAIL, password: process.env.APP_PASSWORD });
  if (error) die('Login falhou: ' + error.message);
  const rows = txs.map((t) => ({ user_id: auth.user.id, collection: 'pluggy-tx', id: t.id, data: t, updated_at: new Date().toISOString() }));
  for (let i = 0; i < rows.length; i += 100) {
    const r = await sb.from('docs').upsert(rows.slice(i, i + 100));
    if (r.error) die('Supabase: ' + r.error.message);
  }
  console.log(`${rows.length} lançamentos gravados no Supabase (coleção pluggy-tx).`);
}

function die(m) { console.error(m); process.exit(1); }

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((e) => die(e.message));
