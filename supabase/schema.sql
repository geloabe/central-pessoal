-- Central Pessoal — schema do Supabase
-- Rode no SQL Editor do projeto (uma vez).
--
-- Duas tabelas genéricas, que espelham as duas APIs de armazenamento que os
-- painéis já usavam no claude.ai:
--   kv   -> window.storage  (chave/valor)      Hábitos, Grimório, Financeiro
--   docs -> db (coleção/documento)             Treino, Rota Internacional, base do Financeiro
-- Tudo é isolado por user_id = auth.uid() via Row Level Security.

create table if not exists public.kv (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  key        text not null,
  value      text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

create table if not exists public.docs (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  collection text not null,
  id         text not null,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, collection, id)
);

alter table public.kv   enable row level security;
alter table public.docs enable row level security;

-- Sem políticas para o papel "anon": quem não está logado não lê nem escreve nada.
drop policy if exists kv_owner   on public.kv;
drop policy if exists docs_owner on public.docs;

create policy kv_owner on public.kv
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy docs_owner on public.docs
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Garante que o papel anon não tenha nenhum privilégio nas tabelas.
revoke all on public.kv   from anon;
revoke all on public.docs from anon;
grant select, insert, update, delete on public.kv   to authenticated;
grant select, insert, update, delete on public.docs to authenticated;

-- Trava extra: mesmo que o cadastro seja reativado por engano no painel,
-- só o primeiro usuário (você) pode existir.
create or replace function public.only_one_user() returns trigger
language plpgsql security definer set search_path = public, auth as $$
begin
  if (select count(*) from auth.users) >= 1 then
    raise exception 'cadastro fechado';
  end if;
  return new;
end $$;

drop trigger if exists only_one_user on auth.users;
create trigger only_one_user before insert on auth.users
  for each row execute function public.only_one_user();
