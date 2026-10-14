# Central Pessoal

Painéis pessoais (Treino, Plano alimentar, Hábitos, Grimório, Rota Internacional, Financeiro) em HTML estático no **GitHub Pages**, com dados num **Supabase** protegido por login. Contexto de cada painel: `CONTEXTO.md` (só local, não versionado: contém dados pessoais).

## Como a segurança funciona
- O site é público, **os dados não**: ficam só no Supabase, com Row Level Security (`supabase/schema.sql`). Sem login, o banco não devolve nada.
- Cadastro desligado + gatilho que impede um segundo usuário.
- Só a chave `anon` vai para o front-end. A `service_role` nunca é usada.
- `dados/` está no `.gitignore`: seus JSONs nunca vão para o repositório.

## Configuração (uma vez)
1. Supabase → novo projeto. **Authentication → Providers → Email**: desligue *Allow new users to sign up*.
2. **SQL Editor**: rode `supabase/schema.sql`.
3. **Authentication → Users → Add user**: crie seu e-mail e senha (use uma senha forte; opcional: ative MFA).
4. Edite `assets/config.js` com a *Project URL* e a chave *anon* (Settings → API).
5. **Authentication → URL Configuration**: Site URL = a URL do seu GitHub Pages.
6. GitHub: crie o repositório, faça push, e em **Settings → Pages → Source: GitHub Actions**.

## Dados
```powershell
npm install
# preencha APP_EMAIL e APP_PASSWORD no arquivo .env (copiado de .env.example)
npm run import            # envia tudo de dados/ (idempotente: pode reenviar à vontade)
npm run backup            # gera dados/backup-AAAA-MM-DD.json (também aceito pelo import)
```
Hábitos, Grimório e Financeiro (ajustes) dependem de exportações do navegador antigo (`habitos.json`, `grimorio.json`, `financeiro-ajustes.json`, formato `{ "dados": { chave: valor } }`).

## Limitações conhecidas
- Funções de IA da Rota Internacional (analisar vaga, ATS com IA, correção de inglês) ficam desligadas: dependiam da IA do claude.ai. Para religar, use uma Edge Function do Supabase chamando uma API de LLM (chave nunca no front-end).
- Plano alimentar: cardápio reconstruído do `CONTEXTO.md`; o PDF original não estava no pacote.
