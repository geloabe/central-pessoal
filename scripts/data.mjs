// Importa e faz backup dos dados da Central Pessoal.
//
//   npm run import              -> envia tudo que estiver em dados/ para o Supabase
//   npm run import -- arquivo   -> envia só um arquivo
//   npm run backup              -> salva tudo em dados/backup-AAAA-MM-DD.json
//
// Usa a chave anon + seu login (a mesma segurança do site; RLS vale). Não precisa de service_role.
// Variáveis: APP_EMAIL e APP_PASSWORD (a URL e a chave anon vêm de assets/config.js).
// Importar é idempotente: reenviar o mesmo arquivo atualiza, não duplica.
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
try { process.loadEnvFile(join(root, '.env')); } catch {}
const dir = join(root, 'dados');

const cfgSrc = readFileSync(join(root, 'assets', 'config.js'), 'utf8');
const pick = (k) => (cfgSrc.match(new RegExp(k + "\s*:\s*'([^']+)'")) || [])[1];
const url = process.env.SUPABASE_URL || pick('SUPABASE_URL');
const anon = process.env.SUPABASE_ANON_KEY || pick('SUPABASE_ANON_KEY');
const { APP_EMAIL, APP_PASSWORD } = process.env;
if (!url || !anon || /SEU-PROJETO|COLE_AQUI/.test(url + anon)) die('Preencha assets/config.js primeiro.');
if (!APP_EMAIL || !APP_PASSWORD) die('Preencha APP_EMAIL e APP_PASSWORD no arquivo .env.');

const sb = createClient(url, anon, { auth: { persistSession: false } });
const { data: auth, error: authErr } = await sb.auth.signInWithPassword({ email: APP_EMAIL, password: APP_PASSWORD });
if (authErr) die('Login falhou: ' + authErr.message);
const uid = auth.user.id;

function die(m) { console.error(m); process.exit(1); }
function check(r, what) { if (r.error) die(`${what}: ${r.error.message}`); return r; }
const hashId = (s) => createHash('sha1').update(String(s)).digest('hex').slice(0, 16);
const now = () => new Date().toISOString();

const kv = []; const docs = [];
const addKv = (key, value) => kv.push({ user_id: uid, key, value: typeof value === 'string' ? value : JSON.stringify(value), updated_at: now() });
const addDoc = (collection, id, data) => docs.push({ user_id: uid, collection, id, data, updated_at: now() });

// Arquivos exportados pelo botão "Copiar meus dados": { painel, dados: { chave: valor } }
function fromExportButton(j) { for (const [k, v] of Object.entries(j.dados || {})) if (v !== null) addKv(k, v); }

const readers = {
  'treino.json': (j) => j.sessions.forEach((s) => addDoc('sessions', 'sess_' + s.timestamp, s)),
  'financeiro-base.json': (j) => addDoc('fin', 'base', j),
  'financeiro-ajustes.json': fromExportButton,
  'habitos.json': fromExportButton,
  'grimorio.json': fromExportButton,
  'rota-internacional.json': (j) => {
    const list = (col, arr) => (arr || []).forEach((d) => addDoc(col, d.id || hashId(d.link || d.title || JSON.stringify(d)), d));
    list('jobs', j.jobs); list('apps', j.apps); list('stories', j.stories);
    for (const col of ['profile', 'plan', 'english']) for (const [id, d] of Object.entries(j[col] || {})) addDoc(col, id, d);
  },
  // Negócios: { colecao: { id: documento } }
  'negocios-base.json': (j) => { for (const [col, m] of Object.entries(j)) for (const [id, d] of Object.entries(m)) addDoc(col, id, d); },
  // formato do "npm run backup"
  backup: (j) => { (j.kv || []).forEach((r) => addKv(r.key, r.value)); (j.docs || []).forEach((r) => addDoc(r.collection, r.id, r.data)); },
};

async function backup() {
  const k = check(await sb.from('kv').select('key,value'), 'kv').data;
  const d = check(await sb.from('docs').select('collection,id,data'), 'docs').data;
  const file = join(dir, `backup-${new Date().toISOString().slice(0, 10)}.json`);
  writeFileSync(file, JSON.stringify({ exportedAt: now(), kv: k, docs: d }, null, 1));
  console.log(`Backup salvo: ${file} (${k.length} chaves, ${d.length} documentos)`);
}

async function importAll(only) {
  const files = only ? [only] : readdirSync(dir).filter((f) => f.endsWith('.json'));
  for (const f of files) {
    const path = existsSync(f) ? f : join(dir, basename(f));
    const j = JSON.parse(readFileSync(path, 'utf8'));
    const reader = readers[basename(path)] || (basename(path).startsWith('backup-') ? readers.backup : null);
    if (!reader) { console.log(`ignorado (formato desconhecido): ${f}`); continue; }
    reader(j);
  }
  for (let i = 0; i < kv.length; i += 200) check(await sb.from('kv').upsert(kv.slice(i, i + 200)), 'kv');
  for (let i = 0; i < docs.length; i += 100) check(await sb.from('docs').upsert(docs.slice(i, i + 100)), 'docs');
  console.log(`Importado: ${kv.length} chaves, ${docs.length} documentos.`);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === 'backup') await backup();
else if (cmd === 'import') await importAll(arg);
else die('Uso: node scripts/data.mjs import|backup [arquivo]');
