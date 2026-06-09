-- ============================================================
--  Seed the JMI MBA papers catalog (run in Supabase SQL Editor)
--  after schema.sql. Safe to re-run: upserts by id.
--
--  The LATEST set (2026) is FREE. All older previous-year papers
--  are premium at Rs.15 (1500 paise) with 1-year unlimited access
--  once purchased. The site reads this table to decide which
--  papers show "Free" vs a price, and the backend uses price_paise
--  to create the Razorpay order.
-- ============================================================

insert into public.papers (id, exam, title, is_paid, price_paise) values
  ('jmi-2026-mba-full', 'JMI MBA', 'JMI 2026 MBA Paper', false, 0),
  ('jmi-2025-mba-full', 'JMI MBA', 'JMI 2025 MBA Paper', true,  1500),
  ('jmi-2023-mba-full', 'JMI MBA', 'JMI 2023 MBA Paper', true,  1500),
  ('jmi-2022-mba-full', 'JMI MBA', 'JMI 2022 MBA Paper', true,  1500),
  ('jmi-2020-mba-full', 'JMI MBA', 'JMI 2020 MBA Paper', true,  1500),
  ('jmi-2018-mba-full', 'JMI MBA', 'JMI 2018 MBA Paper', true,  1500)
on conflict (id) do update set
  exam        = excluded.exam,
  title       = excluded.title,
  is_paid     = excluded.is_paid,
  price_paise = excluded.price_paise;
