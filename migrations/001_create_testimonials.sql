-- Create Testimonials Table
create table if not exists testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  company text,
  quote text not null,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table testimonials enable row level security;

-- Policies
create policy "Public read active testimonials" on testimonials 
  for select using (is_active = true);

create policy "Admins all testimonials" on testimonials 
  for all using (is_admin());
