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

## Login e celular
- Você entra **uma vez** em cada navegador/aparelho: o Supabase guarda a sessão e renova o token sozinho. Só pede senha de novo se você clicar em "Sair" ou limpar os dados do navegador.
- No celular, abra o site e use **Adicionar à tela inicial**: vira um app com ícone próprio, e o Safari do iPhone deixa de apagar a sessão por inatividade.
- Requer internet (não há modo offline).

## Identidade visual
Tema lavanda em `assets/tema.css` (claro por padrão; o escuro segue o sistema). Cada módulo tem cor e ícone próprios (`assets/modulos.css`, `assets/modulo.js`); ajustes finos ficam em `assets/extras.css`. `identidade.html` compara as paletas.

## Limitações conhecidas
- Funções de IA da Rota Internacional (analisar vaga, ATS com IA, correção de inglês) ficam desligadas: dependiam da IA do claude.ai. Para religar, use uma Edge Function do Supabase chamando uma API de LLM (chave nunca no front-end).
- Plano alimentar: cardápio reconstruído do `CONTEXTO.md`; o PDF original não estava no pacote.
