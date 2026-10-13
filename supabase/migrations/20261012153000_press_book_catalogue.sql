-- Editable Sterling IMRES Press catalogue with public visibility and
-- administrator-only management.

create table public.press_books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 240),
  subtitle text,
  summary text not null check (char_length(summary) between 20 and 5000),
  category text not null check (category in ('reference', 'textbook', 'handbook', 'monograph', 'atlas')),
  author_names text[] not null default '{}',
  editor_names text[] not null default '{}',
  publisher text not null default 'Sterling IMRES Press',
  publication_year smallint check (publication_year between 1400 and 2100),
  isbn13 text check (isbn13 is null or isbn13 ~ '^[0-9Xx -]{10,20}$'),
  page_count integer check (page_count is null or page_count > 0),
  status text not null default 'upcoming' check (status in ('upcoming', 'in-development', 'in-editing', 'published', 'archived')),
  cover_image_url text,
  back_cover_image_url text,
  keywords text[] not null default '{}',
  division_ids text[] not null default array['editorial-publications'],
  is_visible boolean not null default true,
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.book_purchase_links (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.press_books(id) on delete cascade,
  retailer_name text not null check (char_length(retailer_name) between 2 and 100),
  url text not null check (url ~ '^https?://'),
  format text,
  price_label text,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);

create index press_books_public_catalogue_idx
  on public.press_books (is_visible, status, title);

create index book_purchase_links_book_id_idx
  on public.book_purchase_links (book_id, sort_order);

alter table public.press_books enable row level security;
alter table public.book_purchase_links enable row level security;

revoke all on table public.press_books from anon, authenticated;
revoke all on table public.book_purchase_links from anon, authenticated;

grant select on table public.press_books to anon;
grant select on table public.book_purchase_links to anon;
grant select, insert, update, delete on table public.press_books to authenticated;
grant select, insert, update, delete on table public.book_purchase_links to authenticated;

create policy "Visible press books are public"
on public.press_books
for select
to anon, authenticated
using (is_visible);

create policy "Administrators can read hidden press books"
on public.press_books
for select
to authenticated
using ((select private.is_admin()));

create policy "Administrators can add press books"
on public.press_books
for insert
to authenticated
with check ((select private.is_admin()));

create policy "Administrators can edit press books"
on public.press_books
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators can remove press books"
on public.press_books
for delete
to authenticated
using ((select private.is_admin()));

create policy "Purchase links for visible books are public"
on public.book_purchase_links
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.press_books
    where press_books.id = book_purchase_links.book_id
      and press_books.is_visible
  )
);

create policy "Administrators can read hidden purchase links"
on public.book_purchase_links
for select
to authenticated
using ((select private.is_admin()));

create policy "Administrators can add purchase links"
on public.book_purchase_links
for insert
to authenticated
with check ((select private.is_admin()));

create policy "Administrators can edit purchase links"
on public.book_purchase_links
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "Administrators can remove purchase links"
on public.book_purchase_links
for delete
to authenticated
using ((select private.is_admin()));

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

create trigger press_books_set_updated_at
before update on public.press_books
for each row execute function private.set_updated_at();

insert into public.press_books (
  slug,
  title,
  subtitle,
  summary,
  category,
  editor_names,
  publisher,
  page_count,
  status,
  cover_image_url,
  back_cover_image_url,
  keywords,
  division_ids,
  is_visible
)
values (
  'encyclopedia-of-pulmonary-medicine',
  'The Encyclopedia of Pulmonary Medicine',
  'A Clinical Reference on Lung Disease, Diagnostic Testing, and Therapy for Students, Nurses, Respiratory Therapists, and Physicians in Training',
  'A structured clinical reference that brings together pulmonary diagnostics, imaging, respiratory physiology, critical care and therapeutics in 200 self-contained entries across 15 sections. It is written for medical, nursing, respiratory therapy and physician assistant students, as well as physicians in training.',
  'reference',
  array['Robert H. Glassman, MD, MACP, FCCP'],
  'Sterling IMRES Press',
  800,
  'published',
  '/books/encyclopedia-of-pulmonary-medicine/front-cover.png',
  '/books/encyclopedia-of-pulmonary-medicine/back-cover.jpg',
  array['pulmonary medicine', 'lung disease', 'respiratory medicine', 'diagnostic testing', 'critical care', 'therapeutics'],
  array['clinical-medicine', 'nursing-allied-health', 'editorial-publications'],
  true
)
on conflict (slug) do nothing;
