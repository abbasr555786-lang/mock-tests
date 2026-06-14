-- ============================================================
--  Paid-papers backend schema  (run in Supabase SQL Editor)
--  Safe to re-run: uses "if not exists" / "or replace".
--  RLS is ON for every table. The public (publishable) key can
--  ONLY: read the papers catalog, read its OWN profile/purchases/
--  attempts, and insert attempts for papers it owns or that are
--  free. Purchases are written ONLY server-side (service role),
--  after a verified Razorpay payment.
-- ============================================================

-- 1. PROFILES -------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. PAPERS (catalog: metadata + price) -----------------------
create table if not exists public.papers (
  id          text primary key,                 -- matches the paper id used on the site
  exam        text not null,                    -- e.g. 'JMI MBA', 'NEET'
  title       text not null,
  is_paid     boolean not null default false,
  price_paise integer not null default 0,       -- price in paise (Rs.15 = 1500)
  created_at  timestamptz not null default now()
);

alter table public.papers enable row level security;

-- Catalog is public so the store page can list papers + prices
drop policy if exists "papers: public read" on public.papers;
create policy "papers: public read"
  on public.papers for select using (true);

-- 3. PURCHASES (1-year access per paper) ----------------------
create table if not exists public.purchases (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  paper_id            text not null references public.papers(id),
  razorpay_payment_id text,
  razorpay_order_id   text,
  amount_paise        integer not null default 0,
  status              text not null default 'active',
  purchased_at        timestamptz not null default now(),
  expires_at          timestamptz not null default (now() + interval '1 year')
);

create index if not exists purchases_user_idx on public.purchases(user_id);
-- one active purchase per user+paper
create unique index if not exists purchases_active_uniq
  on public.purchases(user_id, paper_id) where status = 'active';

alter table public.purchases enable row level security;

-- Users can read their own purchases. NO insert/update policy =>
-- the public key cannot create purchases; only the server (service
-- role, which bypasses RLS) writes them after verifying payment.
drop policy if exists "purchases: read own" on public.purchases;
create policy "purchases: read own"
  on public.purchases for select using (auth.uid() = user_id);

-- 4. HELPER: does the current user have active access to a paper?
create or replace function public.has_active_access(p_paper_id text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.papers pa
    where pa.id = p_paper_id and pa.is_paid = false
  )
  or exists (
    select 1 from public.purchases pu
    where pu.user_id = auth.uid()
      and pu.paper_id = p_paper_id
      and pu.status = 'active'
      and pu.expires_at > now()
  );
$$;

-- 5. ATTEMPTS (saved scores, unlimited retries) ---------------
create table if not exists public.attempts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  paper_id        text not null references public.papers(id),
  score           numeric,
  max_score       numeric,
  correct_count   integer,
  total_questions integer,
  answers         jsonb,
  started_at      timestamptz,
  submitted_at    timestamptz not null default now()
);

create index if not exists attempts_user_paper_idx on public.attempts(user_id, paper_id);

alter table public.attempts enable row level security;

drop policy if exists "attempts: read own" on public.attempts;
create policy "attempts: read own"
  on public.attempts for select using (auth.uid() = user_id);

-- Can only save an attempt for yourself, and only for a paper you
-- own (or a free paper).
drop policy if exists "attempts: insert own if access" on public.attempts;
create policy "attempts: insert own if access"
  on public.attempts for insert
  with check (auth.uid() = user_id and public.has_active_access(paper_id));

-- 6. FEEDBACK / CONTACT (public contact form) -----------------
-- Anyone (signed in or not) can submit a message; the public key can
-- ONLY insert. There is no select policy, so messages are NOT readable
-- with the publishable key — read them in the Supabase Table Editor /
-- SQL Editor (service role bypasses RLS), or wire up a private admin view.
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  topic      text,
  message    text not null,
  page       text,
  user_id    uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Public submit: allow inserts from anon + authenticated, with light
-- guards so the column can't be abused as unbounded storage.
drop policy if exists "feedback: public insert" on public.feedback;
create policy "feedback: public insert"
  on public.feedback for insert
  to anon, authenticated
  with check (
    char_length(message) between 5 and 2000
    and (email is null or char_length(email) <= 120)
    and (name  is null or char_length(name)  <= 80)
  );
