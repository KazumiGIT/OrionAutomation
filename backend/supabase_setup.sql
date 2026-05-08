-- =============================================
-- Orion Automation — Blog Posts Table
-- Run this in Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run
-- =============================================

-- 1. Create the blog_posts table
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  slug text unique,
  excerpt text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table blog_posts enable row level security;

-- 3. Allow public read access (anyone can read posts)
create policy "Public can read blog posts"
  on blog_posts for select
  using (true);

-- 4. Only service_role (our Python backend) can insert/update
create policy "Service role can insert blog posts"
  on blog_posts for insert
  with check (true);

-- 5. Index for fast queries by published_at (we sort by date)
create index if not exists blog_posts_published_at_idx
  on blog_posts (published_at desc);

-- =============================================
-- Storage Setup (do this in Supabase Dashboard UI):
-- 1. Go to Storage -> New Bucket
-- 2. Name: blog-images
-- 3. Toggle: Public bucket (ON)
-- 4. Click Create
-- =============================================
