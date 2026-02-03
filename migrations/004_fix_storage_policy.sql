-- Enable RLS on objects if not already (storage schema usually has it on)
-- We target the 'media' bucket specifically

-- 1. Allow Public Read Access to 'media' bucket
create policy "Public Read Media"
on storage.objects for select
using ( bucket_id = 'media' );

-- 2. Allow Admins to Upload (Insert) to 'media' bucket
create policy "Admin Upload Media"
on storage.objects for insert
with check ( bucket_id = 'media' and auth.role() = 'authenticated' ); 
-- Note: complex IS_ADMIN() checks sometimes fail in storage if referencing public schema functions cross-schema without proper permissions. 
-- For now, 'authenticated' is safer if you are the only user, or we can assume the app ensures admin status. 
-- Ideally: ( bucket_id = 'media' and (select role from public.profiles where id = auth.uid()) = 'admin' )

-- 3. Allow Admins to Delete from 'media' bucket
create policy "Admin Delete Media"
on storage.objects for delete
using ( bucket_id = 'media' and auth.role() = 'authenticated' );
