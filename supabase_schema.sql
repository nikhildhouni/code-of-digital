-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text check (role in ('admin', 'editor', 'viewer')) default 'viewer',
  created_at timestamptz default now()
);

-- 2. PAGES (Dynamic Pages)
create table pages (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  status text check (status in ('draft', 'published')) default 'draft',
  updated_at timestamptz default now()
);

-- 3. PAGE SECTIONS (Hero, Features, etc.)
create table page_sections (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references pages(id) on delete cascade,
  type text not null, -- 'hero', 'features', 'cta', etc.
  content jsonb not null default '{}'::jsonb,
  sort_order int default 0,
  is_enabled boolean default true
);

-- 4. SEO META (Polymorphic-ish, but using entity_id for simplicity)
create table seo_meta (
  id uuid default uuid_generate_v4() primary key,
  entity_type text check (entity_type in ('page', 'post')) not null,
  entity_id uuid not null, -- ID of the page or post
  title text,
  description text,
  keywords text,
  canonical text,
  og_title text,
  og_description text,
  og_image_url text,
  twitter_title text,
  twitter_description text,
  twitter_image_url text,
  robots_index boolean default true,
  robots_follow boolean default true,
  json_ld jsonb,
  constraint unique_entity unique (entity_type, entity_id)
);

-- 5. BLOG POSTS
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content jsonb, -- TipTap JSON
  featured_image_url text,
  status text check (status in ('draft', 'published', 'scheduled')) default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. CATEGORIES & TAGS
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null
);

create table tags (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null
);

create table post_categories (
  post_id uuid references blog_posts(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (post_id, category_id)
);

create table post_tags (
  post_id uuid references blog_posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- 7. REDIRECTS
create table redirects (
  id uuid default uuid_generate_v4() primary key,
  from_path text unique not null,
  to_path text not null,
  status_code int check (status_code in (301, 302)) default 301
);

-- STORAGE BUCKET
-- Note: Buckets are usually created via API or Dashboard, but we can try to insert if migration allows.
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- RLS POLICIES

-- Helper function to check if user is admin
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Enable RLS
alter table profiles enable row level security;
alter table pages enable row level security;
alter table page_sections enable row level security;
alter table seo_meta enable row level security;
alter table blog_posts enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table post_categories enable row level security;
alter table post_tags enable row level security;
alter table redirects enable row level security;

-- Policies

-- Profiles: Users can read own, Admin can read all
create policy "Public profiles are viewable by everyone" on profiles for select using (true); -- Actually maybe not everyone, let's restrict
-- Retrying Profile Policy:
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Users can see own profile" on profiles for select using (auth.uid() = id);
create policy "Admins can see all profiles" on profiles for select using (is_admin());
create policy "Admins can update profiles" on profiles for update using (is_admin());

-- Pages: Public can read published, Admin all
create policy "Public read published pages" on pages for select using (status = 'published');
create policy "Admins read all pages" on pages for select using (is_admin());
create policy "Admins insert pages" on pages for insert with check (is_admin());
create policy "Admins update pages" on pages for update using (is_admin());
create policy "Admins delete pages" on pages for delete using (is_admin());

-- Page Sections
create policy "Public read enabled sections" on page_sections for select using (is_enabled = true);
create policy "Admins read all sections" on page_sections for select using (is_admin());
create policy "Admins ALL sections" on page_sections for all using (is_admin());

-- SEO Meta
create policy "Public read seo" on seo_meta for select using (true); -- simplify, fetching usually happens by entity_id
create policy "Admins ALL seo" on seo_meta for all using (is_admin());

-- Blog Posts
create policy "Public read published posts" on blog_posts for select using (status = 'published');
create policy "Admins ALL posts" on blog_posts for all using (is_admin());

-- Categories/Tags (Public read, Admin write)
create policy "Public read categories" on categories for select using (true);
create policy "Admins ALL categories" on categories for all using (is_admin());
create policy "Public read tags" on tags for select using (true);
create policy "Admins ALL tags" on tags for all using (is_admin());

-- Join tables
create policy "Public read post_categories" on post_categories for select using (true);
create policy "Admins ALL post_categories" on post_categories for all using (is_admin());
create policy "Public read post_tags" on post_tags for select using (true);
create policy "Admins ALL post_tags" on post_tags for all using (is_admin());

-- Redirects
create policy "Public read redirects" on redirects for select using (true); -- Middleware needs to read
create policy "Admins ALL redirects" on redirects for all using (is_admin());

-- Storage Policies (Conceptual - meant for storage.objects)
-- create policy "Public Access Media" on storage.objects for select using (bucket_id = 'media');
-- create policy "Admin Upload Media" on storage.objects for insert with check (bucket_id = 'media' and is_admin());
-- create policy "Admin Delete Media" on storage.objects for delete using (bucket_id = 'media' and is_admin());

-- Trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'viewer'); -- Default to viewer
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
