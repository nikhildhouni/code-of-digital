
-- Drop existing policies to be safe
drop policy if exists "Public read active testimonials" on testimonials;
drop policy if exists "Admins all testimonials" on testimonials;

-- Ensure RLS is enabled
alter table testimonials enable row level security;

-- Re-create policies

-- 1. Public Read Access (Anon + Authenticated)
create policy "Public read active testimonials" 
on testimonials 
for select 
to public 
using (is_active = true);

-- 2. Admin Full Access
create policy "Admins all testimonials" 
on testimonials 
for all 
to public 
using (is_admin());
