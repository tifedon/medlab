-- Public website assets with administrator-only management.
-- Public buckets bypass access checks for downloads only; list, upload, update
-- and delete operations still require the policies below.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'website-files',
  'website-files',
  true,
  52428800,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Administrators can list website files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'website-files'
  and (select private.is_admin())
);

create policy "Administrators can upload website files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'website-files'
  and (select private.is_admin())
);

create policy "Administrators can update website files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'website-files'
  and (select private.is_admin())
)
with check (
  bucket_id = 'website-files'
  and (select private.is_admin())
);

create policy "Administrators can remove website files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'website-files'
  and (select private.is_admin())
);
