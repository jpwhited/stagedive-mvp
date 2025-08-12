-- Supabase storage buckets
insert into storage.buckets (id, name, public) values
  ('tracks', 'tracks', false),
  ('avatars', 'avatars', false),
  ('banners', 'banners', false),
  ('listing-images', 'listing-images', false)
on conflict (id) do nothing;

-- RLS policies for storage objects: only owner can upload/delete, public can read for public tracks or avatars
-- Example: allow anyone to read avatars
create policy "Public read avatars" on storage.objects for select
  using (bucket_id = 'avatars');

-- Example: only authenticated users can upload to buckets
create policy "Authenticated upload" on storage.objects for insert
  with check (auth.role() = 'authenticated');

-- TODO: define row level security for each table. For example, users can update their own profile.
alter table "Profile" enable row level security;
create policy "User can view profiles" on "Profile" for select using (true);
create policy "User can modify own profile" on "Profile" for update using (auth.uid() = userId);
-- Add additional policies for posts, tracks, etc. as needed.