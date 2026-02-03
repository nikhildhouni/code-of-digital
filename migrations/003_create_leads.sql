-- Create Leads Table
create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  status text check (status in ('new', 'contacted', 'closed')) default 'new',
  created_at timestamptz default now()
);

-- Enable RLS
alter table leads enable row level security;

-- Policies

-- 1. Public (Anon) can Insert (for Contact Form)
create policy "Public can submit leads" 
on leads 
for insert 
to public 
with check (true);

-- 2. Admins can view and manage all leads
create policy "Admins all leads" 
on leads 
for all 
to public 
using (is_admin());
