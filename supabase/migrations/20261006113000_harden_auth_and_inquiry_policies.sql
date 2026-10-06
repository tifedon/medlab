-- Complete the login/profile lifecycle and keep administrator checks inside
-- row-level security without exposing a SECURITY DEFINER RPC through the API.

create schema if not exists private;
revoke all on schema private from public;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '')
  )
  on conflict (id) do update
  set full_name = coalesce(excluded.full_name, public.profiles.full_name),
      updated_at = now();

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- Backfill a profile for accounts that predate the trigger. New and backfilled
-- accounts are regular users until an administrator explicitly promotes them.
insert into public.profiles (id, full_name)
select
  users.id,
  nullif(btrim(coalesce(users.raw_user_meta_data ->> 'full_name', '')), '')
from auth.users as users
on conflict (id) do nothing;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

-- Replace the exposed public.is_admin() function with policy expressions that
-- are constrained by the caller's own profile RLS policy.
drop policy if exists "Administrators can read inquiries" on public.inquiries;
drop policy if exists "Administrators can update inquiry status" on public.inquiries;
drop function if exists public.is_admin();

create policy "Administrators can read inquiries"
on public.inquiries
for select
to authenticated
using (
  (select auth.uid()) is not null
  and exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

create policy "Administrators can update inquiry status"
on public.inquiries
for update
to authenticated
using (
  (select auth.uid()) is not null
  and exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  (select auth.uid()) is not null
  and exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);
