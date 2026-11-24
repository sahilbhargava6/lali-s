-- Blog Studio: SEO columns + security lockdown.
-- Run once in Supabase > SQL Editor, AFTER the website update that uses SUPABASE_SERVICE_ROLE_KEY is live
-- (the old dashboard wrote with the public key, which this script blocks).
-- Safe to run more than once.

-- 1. SEO columns used by the Blog Studio
alter table public.blogs
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists meta_keywords text;

-- 2. Blogs table: anyone can read; only the server (service role key, which bypasses RLS) can write
alter table public.blogs enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'blogs' loop
    execute format('drop policy %I on public.blogs', p.policyname);
  end loop;
end $$;

create policy "Public can read blogs" on public.blogs
  for select to anon, authenticated using (true);

revoke insert, update, delete, truncate on public.blogs from anon, authenticated;

-- 3. Cover images: public bucket for reading; remove any policies letting the public upload/change/delete.
--    Wrapped so that a permissions difference on storage tables can't stop the rest of this script.
do $$
declare p record;
begin
  insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
  on conflict (id) do update set public = true;

  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('INSERT', 'UPDATE', 'DELETE', 'ALL')
      and (coalesce(qual, '') || coalesce(with_check, '')) like '%blog-images%'
  loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
exception when others then
  raise notice 'Skipped storage setup: %', sqlerrm;
end $$;

-- 4. Make the API see the new columns immediately
notify pgrst, 'reload schema';
