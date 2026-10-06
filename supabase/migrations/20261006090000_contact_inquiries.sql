-- Structured enquiries from the public contact form (blueprint §17 and §24).
-- Anyone may submit; only administrators may read. No patient medical data is
-- requested, and the form collects the minimum needed to reply.

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  inquiry_type text not null check (inquiry_type in (
    'general', 'research-collaboration', 'education',
    'editorial-publications', 'scientific-review', 'medical-illustration'
  )),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254 and email like '%@%'),
  organisation text check (char_length(organisation) <= 160),
  division text check (char_length(division) <= 64),
  subject text not null check (char_length(subject) between 3 and 160),
  message text not null check (char_length(message) between 20 and 5000),
  consent boolean not null check (consent),
  status text not null default 'new' check (status in ('new', 'in-progress', 'closed'))
);

comment on table public.inquiries is
  'Contact form submissions. Insert-only for the public; readable and updatable by administrators.';

create index inquiries_created_at_idx on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on table public.inquiries from anon, authenticated;
grant insert (inquiry_type, name, email, organisation, division, subject, message, consent)
  on table public.inquiries to anon, authenticated;
grant select, update (status) on table public.inquiries to authenticated;

create policy "Anyone can submit an inquiry"
on public.inquiries
for insert
to anon, authenticated
with check (consent and status = 'new');

create policy "Administrators can read inquiries"
on public.inquiries
for select
to authenticated
using ((select public.is_admin()));

create policy "Administrators can update inquiry status"
on public.inquiries
for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));
