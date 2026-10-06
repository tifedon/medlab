-- Allow administrators to manage account roles and contributor upload access.
-- The helper lives in a non-exposed schema so it cannot be called through the
-- Data API, and only authenticated sessions may execute it during RLS checks.

grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null
    and exists (
      select 1
      from public.profiles
      where profiles.id = (select auth.uid())
        and profiles.role = 'admin'
    );
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

grant update (role, can_upload) on table public.profiles to authenticated;

create policy "Administrators can read member profiles"
on public.profiles
for select
to authenticated
using ((select private.is_admin()));

create policy "Administrators can update member access"
on public.profiles
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));
