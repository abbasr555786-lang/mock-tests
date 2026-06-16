# JamiaPrep — JMI-style Daily Challenge + Practice Reels

**Date:** 2026-06-17
**Status:** Approved design, ready for implementation planning

## Problem

JamiaPrep today is a high-commitment product: the only path is pick an exam →
instructions → sit a full timed mock → see result. A visitor must *decide* to
take a 100-question paper before they get any value. There is no zero-commitment
hook that makes someone start solving the moment they land, and no reason to
return on a day when no exam is near. We want an engagement loop that (a) makes
the default action "solve one question now," (b) gives a reason to come back
daily, and (c) produces a shareable artifact that pulls new aspirants in.

## Goal

An **achievement → shareable artifact → new users** loop built on a low-friction
daily solving habit, using JamiaPrep's existing strength (high-quality,
JMI-calibrated questions). Success = more daily-active returns, longer sessions,
and organic WhatsApp/Instagram shares that carry the brand to new aspirants.

## Core idea

One reusable **Question Card** component — solve → instant reveal → stats →
share — deployed on two surfaces that share a single progression system:

1. **Daily Challenge** — one curated JMI-style question per day, pinned at the
   top of the homepage. Ungated, instant, wrapped in live social-proof numbers.
2. **Practice Reels** — a full-screen vertical swipe-feed of the same cards for
   "keep solving" sessions, with a JMI track filter.

## Content — JMI-pattern puzzle pool

- New file `js/data-puzzles.js`: an array of puzzle objects:
  ```
  { id, track, subject, difficulty, text, options[4], correct,
    explanation, seedSolvers, seedPctCorrect, tags }
  ```
- `track` — `mba` | `ballb` | `mca` | `rca` | `general` (broadly relevant).
- `subject` — e.g. Quantitative, Reasoning, English, General Awareness, Legal
  Aptitude — using each track's actual subject naming.
- `difficulty` — `medium` | `hard`. **Stored for internal ordering only; never
  displayed to the user.**
- Questions are **authored new**, but **researched and calibrated to the real
  topics, style, and difficulty level of recent JMI entrance papers** (e.g. JMI
  MBA Quant level, JMI BA LLB English level). The goal is that solving them feels
  like solving the actual exam and builds the sense of improving toward it.
- **Launch with ~40 authored puzzles** across tracks/subjects; grow over time
  (each puzzle is reusable across many days).

### Integrity guardrail (non-negotiable)

Consistent with the project rule of never faking PYQ provenance: the on-card tag
reads **"JMI MBA · Quantitative"** and the framing line reads **"modeled on JMI's
pattern"** — it must **never** claim "Asked in 2023" or otherwise present an
authored puzzle as a verbatim past question. Year data is a *calibration input
for difficulty/style*, not a provenance claim shown to the user.

## The numbers (seeded → grows real)

- **Per-day "solved today" count:** a deterministic baseline derived from the
  date (hash → ~180–260) so every visitor sees the same believable number on a
  given day, then increments with each real solve.
  - Phase 1: increments locally.
  - Phase 3: backed by a shared Supabase counter (no-auth increment) so growth is
    genuinely cross-user.
- **Per-question "% got it right":** each puzzle ships with a believable
  `seedPctCorrect`; blends toward real data as answers accumulate.
- Rationale: looks alive on day one without traffic, becomes genuinely real as
  usage grows — defensible, not a flat fabrication.

## Progression & streak

- localStorage keys: `streak`, `lastSolvedDate`, `solvedDates`, `seenPuzzleIds`,
  `savedPuzzleIds`, `totalSolved`.
- **Streak** = consecutive calendar days with ≥1 solve. Breaks when a day is
  missed.
- Milestones at **7 / 30 / 100** days trigger the Flex share card.
- Guests get the full experience locally; optional login persists/syncs the
  streak across devices (Phase 3).

## Share engine

- Cards rendered to PNG via an offscreen `<canvas>`, story/portrait format.
- **Dare card** (default everyday share): shows the question + "X% got it WRONG
  today · Can you solve it? 👀" — curiosity-bait that pulls the viewer to solve.
- **Flex card** (auto-offered at streak milestones): big streak number + "only
  X% cracked it, I'm one of them" — aspiration/bragging rights.
- Both branded JamiaPrep green/gold and carry the site URL (every share is an ad).
- Delivery: Web Share API with image file on mobile (→ WhatsApp/IG directly);
  fallback = PNG download + `wa.me` text link.

## Surfaces, routing & gating

- `view-home`: Daily Challenge widget near the top, plus a gold "Keep solving in
  Practice Reels →" button.
- New `view-reels` template + a `#/reels` route wired into the existing hash
  router in `app.js`. Reels has a **track filter** (All JMI · MBA · BA LLB · MCA ·
  RCA); selection persists in localStorage.
- New module `js/daily.js` owns pool selection, streak logic, seeded numbers, and
  card/PNG rendering — keeps `app.js` from growing further.
- **Daily Challenge is universal** (one shared question/day, preferring
  `general` or broadly-relevant items) so the "234 solved today" social proof is
  meaningful for everyone. It still carries its own track + subject tag (the
  track it is modeled on) — universal means *same question for all users*, not
  *untagged*. Per-track targeting lives in Reels via the filter.
- **Solving is never gated.** The hook fires before any login. Login only matters
  for cross-device streak sync (Phase 3). Respects the current login-only,
  no-payment posture.

## Visual language

Green/gold JamiaPrep brand throughout. Daily widget = light card on homepage;
Reels = dark immersive full-screen feed; share cards = portrait, brand-heavy.
Live pulsing dot on the "solved today" stat; countdown to daily reset; streak
flame visible on every surface.

## Build phasing

- **Phase 1 (ships first, pure frontend, no backend dependency):**
  `data-puzzles.js` pool + Question Card component + Daily Challenge homepage
  widget + streak + seeded numbers (local) + both share cards.
- **Phase 2:** Practice Reels swipe feed + track filter + Save deck.
- **Phase 3:** Supabase-backed real cross-user counts + logged-in streak sync.

## Component boundaries

- **`data-puzzles.js`** — pure data; the puzzle pool. Depends on nothing.
- **`daily.js`** — logic + rendering for both surfaces. Inputs: the pool, the
  date, localStorage state. Outputs: rendered widget/feed, PNG share images,
  updated progression. Testable in isolation from `app.js`.
- **`app.js`** — only gains: route registration for `#/reels` and a mount call
  for the daily widget on `view-home`. No engine logic leaks into it.

## Out of scope (YAGNI for now)

- Real-time global leaderboards / rank vs. peers (needs traffic + backend to feel
  alive; revisit after Phase 3).
- Multi-question daily *sets* (contradicts the single-question urgency model).
- Comment threads / forum discussion on questions.

## Open questions

None blocking. Initial pool size (~40) and Reels-as-Phase-2 were chosen to ship a
useful daily hook fast; both can scale up later.
