-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Mirrors the membership model from the WooCommerce "Ahli SPMFokus" product:
-- a single annual membership, paid once, valid until a fixed expiry date.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  amount_myr numeric(10, 2) not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists memberships_user_id_idx on public.memberships (user_id);

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can read their own memberships"
  on public.memberships for select
  using (auth.uid() = user_id);

-- Inserts/updates to memberships happen via the Stripe webhook using the
-- service role key, which bypasses RLS, so no insert/update policy is
-- granted to regular users here.

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'phone');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
