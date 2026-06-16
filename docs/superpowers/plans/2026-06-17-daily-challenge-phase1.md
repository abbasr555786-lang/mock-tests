# JMI Daily Challenge (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a zero-commitment "Question of the Day" widget on the JamiaPrep homepage — solve one JMI-style question instantly, see live social-proof numbers, build a daily streak, and share a Dare/Flex card to WhatsApp/Instagram.

**Architecture:** Three new browser files. `js/data-puzzles.js` is a self-registering data pool (`window.PUZZLES`) mirroring the existing `window.EXAMS` pattern. `js/daily-core.js` holds all pure logic (date keys, deterministic daily pick, seeded numbers, streak reducer) with a dual export so it runs both in the browser (`window.dailyCore`) and under Node for unit tests. `js/daily.js` renders the widget, handles the solve→reveal flow, and draws share cards to an offscreen `<canvas>`. The homepage view template gets one new section; `app.js` gains one mount call inside `renderHome()`.

**Tech Stack:** Vanilla ES5-ish browser JS (no framework, no build step), `<template>`-cloning SPA, localStorage via per-feature keys, `node:test` + `node:assert` for unit tests (Node v24), Canvas 2D + Web Share API for share cards. Brand = existing green/gold `lp-*` system in `css/landing.css`.

---

## File Structure

- **Create `js/data-puzzles.js`** — the JMI-pattern puzzle pool. Pure data, depends on nothing. Self-registers `window.PUZZLES`.
- **Create `js/daily-core.js`** — pure logic, no DOM. Dual export (`window.dailyCore` + `module.exports`). Depends on nothing.
- **Create `js/daily.js`** — DOM widget + share-card rendering. Depends on `window.PUZZLES`, `window.dailyCore`.
- **Create `css/daily.css`** — widget + reveal + share-button styles, brand-aligned.
- **Create `test/daily-core.test.mjs`** — Node unit tests for `daily-core.js`.
- **Modify `index.html`** — add the Daily Challenge `<section>` to `#view-home` (after the hero), add `<link>` for `css/daily.css`, add `<script>` tags for the two new JS data/logic files and `js/daily.js`.
- **Modify `js/app.js`** — call `window.daily.mount()` at the end of `renderHome()`.

### Data shapes (used across tasks — defined once here)

Puzzle object (`window.PUZZLES[i]`):
```js
{
  id: 'q-mba-quant-001',     // unique, kebab; prefix q-<track>-<subject>-NNN
  track: 'mba',              // 'mba' | 'ballb' | 'mca' | 'rca' | 'general'
  subject: 'Quantitative',   // display subject, e.g. 'Quantitative' | 'Reasoning' | 'English' | 'General Awareness' | 'Legal Aptitude'
  difficulty: 'medium',      // 'medium' | 'hard' — STORED, NEVER DISPLAYED
  text: 'A shopkeeper marks goods 40% above cost and allows a 25% discount. What is his profit percent?',
  options: ['5%', '10%', '15%', '12%'],
  correct: 0,                // index into options
  explanation: 'Let CP = 100. MP = 140. SP = 140 - 25% = 105. Profit = 5 on 100 = 5%.',
  seedPctCorrect: 48,        // believable baseline % who answer correctly (0-100)
  tags: ['profit-loss']      // optional, free-form
}
```

Streak state (localStorage, JSON under one key):
```js
{ streak: 0, lastSolvedDate: null, solvedDates: [], totalSolved: 0 }
```

### localStorage keys (namespaced, do not collide with existing `mockcbt:` / `mockly:` keys)

- `jp:daily:streak` — JSON streak state above.
- `jp:daily:answers` — JSON map `{ [dateKey]: { puzzleId, chosenIdx, correct } }` (records the day's daily answer so a refresh shows the resolved state).

---

## Task 1: Puzzle pool data file

**Files:**
- Create: `js/data-puzzles.js`

- [ ] **Step 1: Create the file with the self-registering wrapper and a starter batch**

Mirror the `window.EXAMS` pattern (see `js/data-short-cat.js:503`). Write this exact scaffold with the first 12 puzzles fully authored across tracks/subjects:

```js
// JamiaPrep — JMI-style Daily Challenge / Practice puzzle pool.
// These are ORIGINAL questions authored to match the topics, style and
// difficulty level of real JMI entrance papers (MBA, BA LLB, MCA, RCA).
// They are NOT past questions — never label them "Asked in <year>".
// Tag pattern matches the integrity rule: show track + subject only.
(function () {
  const puzzles = [
    { id: 'q-mba-quant-001', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'A shopkeeper marks his goods 40% above cost and then allows a discount of 25%. What is his profit percent?',
      options: ['5%', '10%', '15%', '12%'], correct: 0,
      explanation: 'Let CP = 100, so MP = 140. SP = 140 - 25% of 140 = 105. Profit = 5 on CP 100 = 5%.',
      seedPctCorrect: 47, tags: ['profit-loss'] },

    { id: 'q-mba-reason-001', track: 'mba', subject: 'Reasoning', difficulty: 'medium',
      text: 'In a certain code MANGO is written as NBOHP. How is APPLE written in that code?',
      options: ['BQQMF', 'BQPMF', 'BPQMF', 'BQQNF'], correct: 0,
      explanation: 'Each letter is shifted by +1: A->B, P->Q, P->Q, L->M, E->F => BQQMF.',
      seedPctCorrect: 53, tags: ['coding-decoding'] },

    { id: 'q-mba-quant-002', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'Three pipes can fill a tank in 4, 6 and 12 hours respectively. If all are opened together, how long will the tank take to fill?',
      options: ['2 hours', '2.5 hours', '3 hours', '3.5 hours'], correct: 0,
      explanation: 'Combined rate = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 1/2 tank per hour => 2 hours.',
      seedPctCorrect: 51, tags: ['time-work'] },

    { id: 'q-ballb-english-001', track: 'ballb', subject: 'English', difficulty: 'medium',
      text: 'Choose the word most nearly OPPOSITE in meaning to "Candid".',
      options: ['Frank', 'Evasive', 'Honest', 'Blunt'], correct: 1,
      explanation: '"Candid" means open/frank; its antonym is "Evasive" (avoiding directness).',
      seedPctCorrect: 44, tags: ['antonym'] },

    { id: 'q-ballb-legal-001', track: 'ballb', subject: 'Legal Aptitude', difficulty: 'medium',
      text: 'Principle: A person who voluntarily accepts a known risk cannot later claim compensation for resulting harm. Facts: A spectator at a cricket match is hit by a six and injured. Can he claim damages from the organisers?',
      options: ['Yes, organisers are always liable', 'No, he accepted the known risk of the game', 'Yes, because he paid for a ticket', 'No, because cricket is a national sport'], correct: 1,
      explanation: 'This is volenti non fit injuria — voluntarily accepting a known risk bars the claim. A spectator accepts the ordinary risks of the game.',
      seedPctCorrect: 56, tags: ['volenti', 'torts'] },

    { id: 'q-mca-quant-001', track: 'mca', subject: 'Quantitative', difficulty: 'hard',
      text: 'What is the remainder when 7^100 is divided by 5?',
      options: ['1', '2', '3', '4'], correct: 0,
      explanation: '7 = 2 (mod 5). Powers of 2 mod 5 cycle 2,4,3,1 with period 4. 100 is divisible by 4, so 2^100 = 1 (mod 5).',
      seedPctCorrect: 38, tags: ['number-theory', 'modular'] },

    { id: 'q-mca-reason-001', track: 'mca', subject: 'Reasoning', difficulty: 'medium',
      text: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['36', '40', '42', '44'], correct: 2,
      explanation: 'Differences are 4, 6, 8, 10, 12 => next term = 30 + 12 = 42. (n^2 + n pattern.)',
      seedPctCorrect: 58, tags: ['series'] },

    { id: 'q-rca-ga-001', track: 'rca', subject: 'General Awareness', difficulty: 'medium',
      text: 'The "Doctrine of Basic Structure" of the Indian Constitution was propounded by the Supreme Court in which landmark case?',
      options: ['Golaknath case', 'Kesavananda Bharati case', 'Minerva Mills case', 'Maneka Gandhi case'], correct: 1,
      explanation: 'The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973).',
      seedPctCorrect: 49, tags: ['polity'] },

    { id: 'q-general-reason-001', track: 'general', subject: 'Reasoning', difficulty: 'medium',
      text: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
      options: ['0°', '7.5°', '30°', '37.5°'], correct: 1,
      explanation: 'Minute hand at 90°. Hour hand at 3*30 + 15*0.5 = 97.5°. Difference = 7.5°.',
      seedPctCorrect: 41, tags: ['clocks'] },

    { id: 'q-general-quant-001', track: 'general', subject: 'Quantitative', difficulty: 'medium',
      text: 'The average of five consecutive even numbers is 16. What is the largest of them?',
      options: ['18', '20', '22', '24'], correct: 1,
      explanation: 'Five consecutive evens averaging 16 are 12,14,16,18,20. Largest = 20.',
      seedPctCorrect: 62, tags: ['averages'] },

    { id: 'q-general-english-001', track: 'general', subject: 'English', difficulty: 'medium',
      text: 'Choose the correctly spelt word.',
      options: ['Occassion', 'Ocassion', 'Occasion', 'Occassion'], correct: 2,
      explanation: '"Occasion" — one c-c pair, single s. The others are common misspellings.',
      seedPctCorrect: 55, tags: ['spelling'] },

    { id: 'q-general-reason-002', track: 'general', subject: 'Reasoning', difficulty: 'hard',
      text: 'If FRIEND is coded as HUMJTK, then how is CANDLE coded?',
      options: ['EDRIRL', 'DCQHQK', 'ESJKCJ', 'FYOBOC'], correct: 0,
      explanation: 'Letters shift by +2, +3, +4, +5, +6, +7: C+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L => EDRIRL.',
      seedPctCorrect: 33, tags: ['coding-decoding'] },
  ];

  window.PUZZLES = (window.PUZZLES || []).concat(puzzles);
})();
```

- [ ] **Step 2: Author the pool up to at least 40 puzzles**

Add ~28 more objects to the `puzzles` array using the EXACT shape above. Requirements for every new puzzle:
- Spread across tracks: aim for ≥6 `mba`, ≥6 `ballb`, ≥6 `mca`, ≥6 `rca`, ≥8 `general`.
- Cover subjects realistically per track (MBA: Quant/Reasoning/English/Data Interpretation; BA LLB: English/Legal Aptitude/Logical Reasoning/GK; MCA: Quant/Reasoning/basic Computer aptitude; RCA: General Awareness/Reasoning/Current Affairs/Polity).
- `difficulty` only `medium` or `hard` (no easy filler).
- **Verify every answer by hand** before writing `correct` (this is the project's authoring-integrity rule — a wrong key is worse than no question).
- `seedPctCorrect` between 30 and 70, lower for harder items.
- Unique `id` following `q-<track>-<subjectshort>-NNN`.
- No fabricated provenance anywhere in `text`/`tags` (never "JMI 2023 asked...").

- [ ] **Step 3: Validate the pool in Node (count, unique ids, valid correct index)**

Run:
```bash
node -e "global.window={};require('./js/data-puzzles.js');const p=window.PUZZLES;const ids=new Set(p.map(x=>x.id));console.log('count',p.length);console.log('uniqueIds',ids.size===p.length);console.log('badCorrect',p.filter(x=>!(x.options&&x.options.length===4&&x.correct>=0&&x.correct<4)).map(x=>x.id));console.log('badDiff',p.filter(x=>!['medium','hard'].includes(x.difficulty)).map(x=>x.id));"
```
Expected: `count` ≥ 40, `uniqueIds true`, `badCorrect []`, `badDiff []`.

- [ ] **Step 4: Commit**

```bash
git add js/data-puzzles.js
git commit -m "feat(daily): add JMI-style puzzle pool for Daily Challenge"
```

---

## Task 2: Pure logic — `daily-core.js` (TDD)

**Files:**
- Create: `js/daily-core.js`
- Test: `test/daily-core.test.mjs`

- [ ] **Step 1: Write the failing test file**

Create `test/daily-core.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const core = require('../js/daily-core.js');

test('dateKey formats local date as YYYY-MM-DD', () => {
  assert.equal(core.dateKey(new Date(2026, 5, 17)), '2026-06-17');
  assert.equal(core.dateKey(new Date(2026, 0, 3)), '2026-01-03');
});

test('hashString is deterministic and non-negative', () => {
  assert.equal(core.hashString('abc'), core.hashString('abc'));
  assert.ok(core.hashString('abc') >= 0);
  assert.notEqual(core.hashString('abc'), core.hashString('abd'));
});

test('pickDailyIndex is stable per day and cycles the whole pool', () => {
  const pool = Array.from({ length: 5 }, (_, i) => ({ id: 'p' + i }));
  const idxDay0 = core.pickDailyIndex(pool, '2026-06-17');
  assert.equal(idxDay0, core.pickDailyIndex(pool, '2026-06-17')); // stable
  const seen = new Set();
  for (let d = 0; d < 5; d++) {
    const key = core.dateKey(new Date(2026, 5, 17 + d));
    seen.add(core.pickDailyIndex(pool, key));
  }
  assert.equal(seen.size, 5); // no repeat within one full cycle
});

test('seededSolvers is stable per day and in 180..260', () => {
  const a = core.seededSolvers('2026-06-17');
  assert.equal(a, core.seededSolvers('2026-06-17'));
  assert.ok(a >= 180 && a <= 260);
  assert.notEqual(core.seededSolvers('2026-06-18'), undefined);
});

test('updateStreakOnSolve: first solve starts streak at 1', () => {
  const s = core.updateStreakOnSolve(
    { streak: 0, lastSolvedDate: null, solvedDates: [], totalSolved: 0 }, '2026-06-17');
  assert.equal(s.streak, 1);
  assert.equal(s.lastSolvedDate, '2026-06-17');
  assert.equal(s.totalSolved, 1);
});

test('updateStreakOnSolve: consecutive day increments', () => {
  const s = core.updateStreakOnSolve(
    { streak: 3, lastSolvedDate: '2026-06-16', solvedDates: [], totalSolved: 9 }, '2026-06-17');
  assert.equal(s.streak, 4);
  assert.equal(s.totalSolved, 10);
});

test('updateStreakOnSolve: same day is idempotent for streak', () => {
  const s = core.updateStreakOnSolve(
    { streak: 4, lastSolvedDate: '2026-06-17', solvedDates: [], totalSolved: 10 }, '2026-06-17');
  assert.equal(s.streak, 4);
  assert.equal(s.totalSolved, 10); // no double count
});

test('updateStreakOnSolve: gap resets streak to 1', () => {
  const s = core.updateStreakOnSolve(
    { streak: 9, lastSolvedDate: '2026-06-14', solvedDates: [], totalSolved: 20 }, '2026-06-17');
  assert.equal(s.streak, 1);
  assert.equal(s.totalSolved, 21);
});

test('isMilestone true only at 7/30/100', () => {
  assert.equal(core.isMilestone(7), true);
  assert.equal(core.isMilestone(30), true);
  assert.equal(core.isMilestone(100), true);
  assert.equal(core.isMilestone(8), false);
  assert.equal(core.isMilestone(1), false);
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `node --test test/`
Expected: FAIL — `Cannot find module '../js/daily-core.js'`.

- [ ] **Step 3: Implement `js/daily-core.js`**

```js
// JamiaPrep — Daily Challenge pure logic. No DOM, no localStorage here.
// Dual export: window.dailyCore in the browser; module.exports under Node tests.
(function (root) {
  'use strict';
  var MS_PER_DAY = 86400000;
  var MILESTONES = [7, 30, 100];
  var SHUFFLE_SALT = 'jp-daily-v1';

  function pad2(n) { return String(n).padStart(2, '0'); }

  // Local-time YYYY-MM-DD (matches what the user perceives as "today").
  function dateKey(date) {
    return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
  }

  // 32-bit non-negative string hash.
  function hashString(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  // Whole days since the Unix epoch for a YYYY-MM-DD key (UTC midnight).
  function dayNumber(key) {
    return Math.floor(Date.parse(key + 'T00:00:00Z') / MS_PER_DAY);
  }

  // Deterministic daily pick that cycles the WHOLE pool before repeating.
  // Pool is ordered once by a stable per-id hash, then indexed by day number.
  function pickDailyIndex(pool, key) {
    if (!pool.length) return -1;
    var order = pool.map(function (p, i) { return i; }).sort(function (a, b) {
      return hashString((pool[a].id || ('i' + a)) + SHUFFLE_SALT)
           - hashString((pool[b].id || ('i' + b)) + SHUFFLE_SALT);
    });
    var n = ((dayNumber(key) % order.length) + order.length) % order.length;
    return order[n];
  }

  // Believable daily baseline 180..260, stable for a given day.
  function seededSolvers(key) {
    return 180 + (hashString(key + ':solvers') % 81);
  }

  function yesterdayKey(key) {
    var d = new Date(Date.parse(key + 'T00:00:00Z') - MS_PER_DAY);
    return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate());
  }

  // Pure streak reducer. Returns a NEW state object.
  function updateStreakOnSolve(state, key) {
    var s = {
      streak: state.streak || 0,
      lastSolvedDate: state.lastSolvedDate || null,
      solvedDates: (state.solvedDates || []).slice(),
      totalSolved: state.totalSolved || 0,
    };
    if (s.lastSolvedDate === key) return s; // already counted today
    if (s.lastSolvedDate === yesterdayKey(key)) s.streak += 1;
    else s.streak = 1;
    s.lastSolvedDate = key;
    s.totalSolved += 1;
    if (s.solvedDates.indexOf(key) === -1) s.solvedDates.push(key);
    return s;
  }

  function isMilestone(streak) { return MILESTONES.indexOf(streak) !== -1; }

  var api = {
    dateKey: dateKey, hashString: hashString, dayNumber: dayNumber,
    pickDailyIndex: pickDailyIndex, seededSolvers: seededSolvers,
    yesterdayKey: yesterdayKey, updateStreakOnSolve: updateStreakOnSolve,
    isMilestone: isMilestone,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.dailyCore = api;
})(typeof window !== 'undefined' ? window : null);
```

- [ ] **Step 4: Run the tests to confirm they pass**

Run: `node --test test/`
Expected: PASS — all 9 tests green.

- [ ] **Step 5: Commit**

```bash
git add js/daily-core.js test/daily-core.test.mjs
git commit -m "feat(daily): add tested pure logic (date pick, seeded numbers, streak)"
```

---

## Task 3: Widget rendering — `js/daily.js`

**Files:**
- Create: `js/daily.js`

- [ ] **Step 1: Implement the widget module**

```js
// JamiaPrep — Daily Challenge widget. Renders into #daily-challenge-mount on
// the home view. Uses window.PUZZLES + window.dailyCore. Solving is never gated.
(function () {
  'use strict';
  var core = window.dailyCore;
  var STREAK_KEY = 'jp:daily:streak';
  var ANSWERS_KEY = 'jp:daily:answers';

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }

  function todayKey() { return core.dateKey(new Date()); }

  function pickTodaysPuzzle() {
    var pool = window.PUZZLES || [];
    // Prefer broadly-relevant items for the universal daily question.
    var general = pool.filter(function (p) { return p.track === 'general'; });
    var src = general.length >= 10 ? general : pool;
    var idx = core.pickDailyIndex(src, todayKey());
    return idx >= 0 ? src[idx] : null;
  }

  function secondsToReset() {
    var now = new Date();
    var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return Math.floor((end - now) / 1000);
  }
  function fmtHMS(total) {
    var h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
    return [h, m, s].map(function (n) { return String(n).padStart(2, '0'); }).join(':');
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function mount() {
    var host = document.getElementById('daily-challenge-mount');
    if (!host) return;
    var puzzle = pickTodaysPuzzle();
    if (!puzzle) { host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML = '';

    var streak = readJSON(STREAK_KEY, { streak: 0, lastSolvedDate: null, solvedDates: [], totalSolved: 0 });
    var answers = readJSON(ANSWERS_KEY, {});
    var tKey = todayKey();
    var priorAnswer = answers[tKey] && answers[tKey].puzzleId === puzzle.id ? answers[tKey] : null;

    var card = el('div', { class: 'dc-card' });

    var top = el('div', { class: 'dc-top' });
    top.appendChild(el('span', { class: 'dc-badge' }, '🔥 Question of the Day'));
    var streakLabel = streak.streak > 0
      ? '🔥 ' + streak.streak + '-day streak'
      : 'Start a streak';
    top.appendChild(el('span', { class: 'dc-streak' }, streakLabel));
    card.appendChild(top);

    card.appendChild(el('p', { class: 'dc-framing' },
      'Modeled on JMI ' + puzzle.track.toUpperCase() + ' entrance pattern · the level Jamia actually asks'));
    card.appendChild(el('span', { class: 'dc-tag' },
      'JMI ' + puzzle.track.toUpperCase() + ' · ' + puzzle.subject));
    card.appendChild(el('p', { class: 'dc-q' }, escapeHTML(puzzle.text)));

    var opts = el('div', { class: 'dc-opts' });
    puzzle.options.forEach(function (opt, i) {
      var o = el('button', { class: 'dc-opt', type: 'button', 'data-idx': String(i) },
        '<span class="dc-opt__k">' + 'ABCD'[i] + '</span>' + escapeHTML(opt));
      opts.appendChild(o);
    });
    card.appendChild(opts);

    var proof = el('div', { class: 'dc-proof' });
    card.appendChild(proof);
    host.appendChild(card);

    function renderProof(solvedToday) {
      var count = core.seededSolvers(tKey) + (solvedToday ? 1 : 0);
      proof.innerHTML =
        '<span><span class="dc-live"></span><b>' + count + '</b> solved today</span>' +
        '<span><b>' + puzzle.seedPctCorrect + '%</b> got it right</span>' +
        '<span>Resets in <b class="dc-reset">' + fmtHMS(secondsToReset()) + '</b></span>';
    }

    function reveal(chosenIdx) {
      var correct = chosenIdx === puzzle.correct;
      Array.prototype.forEach.call(opts.children, function (btn, i) {
        btn.disabled = true;
        if (i === puzzle.correct) btn.classList.add('is-correct');
        else if (i === chosenIdx) btn.classList.add('is-wrong');
      });
      var result = el('div', { class: 'dc-result ' + (correct ? 'is-ok' : 'is-no') },
        correct
          ? 'Nailed it! You’re among the ' + puzzle.seedPctCorrect + '% who got it right.'
          : 'Not quite — the answer is ' + 'ABCD'[puzzle.correct] + '.');
      var expl = el('div', { class: 'dc-expl' }, escapeHTML(puzzle.explanation));
      card.insertBefore(result, proof);
      card.insertBefore(expl, proof);

      var cta = el('div', { class: 'dc-cta' });
      var share = el('button', { class: 'dc-btn dc-btn--share', type: 'button' }, 'Share challenge ↗');
      share.addEventListener('click', function () {
        window.dailyShare.shareDare(puzzle, { pctWrong: 100 - puzzle.seedPctCorrect, solved: core.seededSolvers(tKey) });
      });
      cta.appendChild(share);
      cta.appendChild(el('span', { class: 'dc-btn dc-btn--ghost' }, 'Come back tomorrow'));
      card.appendChild(cta);

      renderProof(true);
    }

    // Bind answer clicks (only when not already answered today).
    if (priorAnswer) {
      reveal(priorAnswer.chosenIdx);
      // Already answered earlier today: do not bump streak again on reload.
    } else {
      Array.prototype.forEach.call(opts.children, function (btn) {
        btn.addEventListener('click', function () {
          var chosenIdx = Number(btn.getAttribute('data-idx'));
          var correct = chosenIdx === puzzle.correct;
          answers[tKey] = { puzzleId: puzzle.id, chosenIdx: chosenIdx, correct: correct };
          writeJSON(ANSWERS_KEY, answers);
          var newStreak = core.updateStreakOnSolve(streak, tKey);
          writeJSON(STREAK_KEY, newStreak);
          if (core.isMilestone(newStreak.streak)) {
            setTimeout(function () {
              window.dailyShare.offerFlex(newStreak.streak, puzzle.seedPctCorrect);
            }, 600);
          }
          top.querySelector('.dc-streak').textContent = '🔥 ' + newStreak.streak + '-day streak';
          reveal(chosenIdx);
        });
      });
      renderProof(false);
    }

    // Live countdown.
    if (host._dcTimer) clearInterval(host._dcTimer);
    host._dcTimer = setInterval(function () {
      var r = card.querySelector('.dc-reset');
      if (!r) return;
      r.textContent = fmtHMS(secondsToReset());
    }, 1000);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.daily = { mount: mount };
})();
```

- [ ] **Step 2: Add a temporary share shim so the widget runs before Task 4**

At the very top of `js/daily.js` body (right after `'use strict';`), this is NOT needed — Task 4 creates `window.dailyShare`. To verify Task 3 alone in the browser before Task 4, temporarily define a stub in the console: `window.dailyShare = { shareDare(){}, offerFlex(){} }`. Remove reliance after Task 4 lands. (No code change — note only.)

- [ ] **Step 3: Commit**

```bash
git add js/daily.js
git commit -m "feat(daily): render Daily Challenge widget with solve/reveal/streak"
```

---

## Task 4: Share cards — `js/daily.js` companion `window.dailyShare`

**Files:**
- Create: `js/daily-share.js`

- [ ] **Step 1: Implement canvas share-card rendering + delivery**

```js
// JamiaPrep — Daily Challenge share cards. Draws a portrait PNG on an
// offscreen canvas and shares via Web Share API, falling back to a PNG
// download + WhatsApp text link. Brand: green #1b6e3c / gold #d4a017.
(function () {
  'use strict';
  var GREEN = '#1b6e3c', GREEN_D = '#0e3d20', GOLD = '#d4a017', CREAM = '#f6f1e4', INK = '#16241c';
  var W = 1080, H = 1350, SITE = 'jamiaprep.com';

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Wrap text to a max width, return array of lines.
  function wrap(ctx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = words[i]; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function newCanvas() {
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    return c;
  }

  function drawDare(puzzle, stats) {
    var c = newCanvas(), ctx = c.getContext('2d');
    ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
    // header band
    ctx.fillStyle = GREEN; ctx.fillRect(0, 0, W, 150);
    ctx.fillStyle = '#fff'; ctx.font = '700 56px system-ui, sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillText('JamiaPrep', 70, 78);
    ctx.fillStyle = GOLD; ctx.font = '700 34px system-ui, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('DAILY CHALLENGE', W - 70, 78); ctx.textAlign = 'left';
    // eyebrow
    ctx.fillStyle = GREEN; ctx.font = '800 34px system-ui, sans-serif';
    ctx.fillText('JMI ' + puzzle.track.toUpperCase() + ' · ' + puzzle.subject.toUpperCase(), 70, 250);
    // question
    ctx.fillStyle = INK; ctx.font = '800 62px system-ui, sans-serif';
    var lines = wrap(ctx, puzzle.text, W - 140), y = 360;
    lines.slice(0, 5).forEach(function (ln) { ctx.fillText(ln, 70, y); y += 78; });
    // big % wrong
    ctx.fillStyle = '#c0392b'; ctx.font = '900 180px system-ui, sans-serif';
    ctx.fillText(stats.pctWrong + '%', 70, y + 160);
    ctx.fillStyle = '#5a6b62'; ctx.font = '600 40px system-ui, sans-serif';
    ctx.fillText('of aspirants got this WRONG today', 70, y + 280);
    // dashed call-to-action box
    ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.setLineDash([14, 10]);
    roundRect(ctx, 70, H - 320, W - 140, 130, 24); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = GREEN; ctx.font = '800 52px system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Can you solve it? 👀', W / 2, H - 255);
    // footer
    ctx.fillStyle = '#5a6b62'; ctx.font = '700 38px system-ui, sans-serif';
    ctx.fillText(stats.solved + ' solved today  ·  ' + SITE, W / 2, H - 110);
    ctx.textAlign = 'left';
    return c;
  }

  function drawFlex(streak, pctCorrect) {
    var c = newCanvas(), ctx = c.getContext('2d');
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, GREEN); g.addColorStop(1, GREEN_D);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = GOLD; ctx.font = '900 48px system-ui, sans-serif';
    ctx.fillText('JAMIAPREP', W / 2, 150);
    ctx.font = '400 240px system-ui, sans-serif'; ctx.fillStyle = '#fff';
    ctx.fillText('🔥', W / 2, 430);
    ctx.font = '900 220px system-ui, sans-serif';
    ctx.fillText(String(streak), W / 2, 680);
    ctx.font = '600 56px system-ui, sans-serif';
    ctx.fillText('day JMI prep streak', W / 2, 820);
    ctx.fillStyle = 'rgba(255,255,255,0.12)'; roundRect(ctx, 120, 920, W - 240, 230, 28); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '600 46px system-ui, sans-serif';
    ctx.fillText('Today only ' + pctCorrect + '% cracked it.', W / 2, 1010);
    ctx.fillText('I’m one of them. ✅', W / 2, 1075);
    ctx.fillStyle = GOLD; ctx.font = '800 44px system-ui, sans-serif';
    ctx.fillText(SITE, W / 2, 1240);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    return c;
  }

  function canvasToFile(canvas, name) {
    return new Promise(function (resolve) {
      canvas.toBlob(function (blob) {
        resolve(new File([blob], name, { type: 'image/png' }));
      }, 'image/png');
    });
  }

  function deliver(canvas, name, text) {
    canvasToFile(canvas, name).then(function (file) {
      var shareData = { files: [file], text: text, title: 'JamiaPrep Daily Challenge' };
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share(shareData).catch(function () { /* user cancelled */ });
      } else {
        // Fallback: download the PNG, then open WhatsApp with the text + link.
        var url = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = url; a.download = name; document.body.appendChild(a); a.click();
        a.remove(); URL.revokeObjectURL(url);
        window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + SITE), '_blank');
      }
    });
  }

  function shareDare(puzzle, stats) {
    var c = drawDare(puzzle, stats);
    deliver(c, 'jamiaprep-challenge.png',
      'Only ' + stats.pctWrong + '% of aspirants solved today’s JMI challenge wrong — can you crack it?');
  }

  function offerFlex(streak, pctCorrect) {
    var c = drawFlex(streak, pctCorrect);
    deliver(c, 'jamiaprep-streak.png',
      'I’m on a ' + streak + '-day JMI prep streak on JamiaPrep! 🔥');
  }

  window.dailyShare = { shareDare: shareDare, offerFlex: offerFlex };
})();
```

- [ ] **Step 2: Commit**

```bash
git add js/daily-share.js
git commit -m "feat(daily): add Dare/Flex share cards (canvas PNG + Web Share/wa.me)"
```

---

## Task 5: Styles, wiring, and end-to-end verification

**Files:**
- Create: `css/daily.css`
- Modify: `index.html` (head `<link>`, `#view-home` section, footer `<script>` tags)
- Modify: `js/app.js` (`renderHome()`)

- [ ] **Step 1: Create `css/daily.css`**

```css
/* JamiaPrep — Daily Challenge widget. Brand green/gold, matches lp-* system. */
.lp-daily { padding: 28px 20px 8px; }
.lp-daily__inner { max-width: 720px; margin: 0 auto; }
.dc-card { background:#fff; border:1px solid #e2ebe4; border-radius:16px;
  padding:22px 24px; box-shadow:0 8px 28px rgba(18,80,43,.10); }
.dc-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.dc-badge { background:#1b6e3c; color:#fff; font-size:13px; font-weight:800; letter-spacing:.5px;
  padding:6px 13px; border-radius:999px; text-transform:uppercase; }
.dc-streak { color:#d4a017; font-weight:800; font-size:15px; }
.dc-framing { font-size:12.5px; color:#6b7c74; font-style:italic; margin:0 0 12px; }
.dc-tag { display:inline-block; font-size:12px; font-weight:800; color:#1b6e3c; background:#e7f3eb;
  padding:4px 10px; border-radius:7px; margin-bottom:12px; }
.dc-q { font-size:18px; font-weight:700; color:#16241c; line-height:1.5; margin:0 0 18px; white-space:pre-line; }
.dc-opts { display:flex; flex-direction:column; gap:10px; }
.dc-opt { text-align:left; border:1.5px solid #dfe8e1; border-radius:11px; padding:13px 16px;
  font-size:15px; color:#16241c; background:#fff; cursor:pointer; display:flex; gap:11px; align-items:center;
  transition:border-color .15s, background .15s; font-family:inherit; }
.dc-opt:hover:not(:disabled) { border-color:#1b6e3c; background:#f3f9f5; }
.dc-opt:disabled { cursor:default; }
.dc-opt__k { font-weight:800; color:#6b7c74; }
.dc-opt.is-correct { border-color:#1b6e3c; background:#e9f6ee; }
.dc-opt.is-wrong { border-color:#d65a5a; background:#fbecec; }
.dc-result { font-size:16px; font-weight:800; margin:16px 0 6px; }
.dc-result.is-ok { color:#1b6e3c; }
.dc-result.is-no { color:#c0392b; }
.dc-expl { background:#f7faf8; border-left:3px solid #1b6e3c; padding:12px 14px; border-radius:9px;
  font-size:14px; color:#36463f; line-height:1.55; margin-bottom:4px; white-space:pre-line; }
.dc-proof { display:flex; flex-wrap:wrap; gap:18px; margin-top:16px; padding-top:14px;
  border-top:1px dashed #e2ebe4; font-size:13.5px; color:#6b7c74; align-items:center; }
.dc-proof b { color:#16241c; }
.dc-live { width:8px; height:8px; background:#3ec46d; border-radius:50%; display:inline-block;
  margin-right:6px; animation:dcPulse 1.5s infinite; }
@keyframes dcPulse { 0%{box-shadow:0 0 0 0 rgba(62,196,109,.6)} 70%{box-shadow:0 0 0 8px rgba(62,196,109,0)} 100%{box-shadow:0 0 0 0 rgba(62,196,109,0)} }
.dc-cta { display:flex; gap:10px; margin-top:16px; }
.dc-btn { flex:1; text-align:center; padding:13px; border-radius:11px; font-weight:800; font-size:15px;
  border:none; cursor:pointer; font-family:inherit; }
.dc-btn--share { background:#25D366; color:#fff; }
.dc-btn--ghost { background:#eef3ef; color:#1b6e3c; display:flex; align-items:center; justify-content:center; cursor:default; }
@media (max-width:520px){ .dc-cta{flex-direction:column;} .dc-proof{gap:12px;} }
```

- [ ] **Step 2: Link the stylesheet in `index.html`**

Find the existing landing stylesheet link (search `css/landing.css`) and add directly after it:
```html
  <link rel="stylesheet" href="css/daily.css" />
```

- [ ] **Step 3: Add the mount point to `#view-home`**

In `index.html`, inside `<template id="view-home">`, locate the hero section closing `</section>` (the block starting `<section class="lp-hero">`, around line 94) and insert immediately after it:
```html
      <!-- ============ DAILY CHALLENGE ============ -->
      <section class="lp-section lp-daily" id="lp-daily" aria-label="Question of the day">
        <div class="lp-section__inner lp-daily__inner">
          <div id="daily-challenge-mount" hidden></div>
        </div>
      </section>
```

- [ ] **Step 4: Add the script tags in `index.html`**

Find the line `<script src="js/data.js"></script>` (around line 765) and add BEFORE it:
```html
  <script src="js/daily-core.js"></script>
  <script src="js/data-puzzles.js"></script>
  <script src="js/daily-share.js"></script>
```
Then find where `js/app.js` is loaded (it is the last app script) and add immediately BEFORE it:
```html
  <script src="js/daily.js"></script>
```

- [ ] **Step 5: Mount the widget from `renderHome()`**

In `js/app.js`, inside `renderHome()`, find the line `addThemeToggle($('.topbar__nav'));` (around line 444) and add immediately after it:
```js
    if (window.daily && window.daily.mount) window.daily.mount();
```

- [ ] **Step 6: Re-run unit tests to confirm nothing regressed**

Run: `node --test test/`
Expected: PASS — all tests still green.

- [ ] **Step 7: Browser verification**

Start the dev server (`start-server.ps1` or `preview_start`) and load the home route `#/`. Verify:
1. The Daily Challenge card appears under the hero with badge, "Modeled on JMI … pattern" line, a `JMI <TRACK> · <Subject>` tag, the question, four options, and the proof strip ("… solved today", "…% got it right", "Resets in HH:MM:SS" counting down).
2. **No difficulty label is visible anywhere** on the card.
3. Click an option → options lock, correct/chosen highlight, explanation + result line appear, "solved today" increments by 1, streak shows "🔥 1-day streak", and a green "Share challenge ↗" button appears.
4. Reload the page → the resolved state persists (same answer shown, streak unchanged, not double-counted).
5. Click "Share challenge ↗" → on desktop a PNG downloads and a WhatsApp tab opens; inspect the PNG shows the Dare card (green header, question, big % wrong, "Can you solve it?", "… solved today · jamiaprep.com").
6. Check the browser console for errors (there should be none).

Capture a screenshot of the solved card as proof.

- [ ] **Step 8: Commit**

```bash
git add css/daily.css index.html js/app.js
git commit -m "feat(daily): wire Daily Challenge widget into homepage"
```

- [ ] **Step 9: Deploy note**

Push to the default branch; Vercel auto-deploys (see project memory `project_vercel-deploy`). Confirm the live site shows the widget on the home page.

```bash
git push
```

---

## Self-Review notes (already applied)

- **Spec coverage:** puzzle pool (Task 1) ✓; pure logic seeded numbers + streak (Task 2) ✓; widget solve/reveal/streak + universal daily + no-difficulty + honest tag (Task 3) ✓; Dare + Flex share cards via Web Share/wa.me (Task 4) ✓; brand styles + homepage wiring, solving ungated (Task 5) ✓. Practice Reels and Supabase real-counts/login-sync are explicitly Phase 2/3 and out of this plan.
- **Type consistency:** `window.dailyCore` API names (`dateKey`, `pickDailyIndex`, `seededSolvers`, `updateStreakOnSolve`, `isMilestone`) are used identically in Tasks 2/3. `window.dailyShare.shareDare(puzzle, stats)` / `offerFlex(streak, pct)` signatures match between Task 3 callers and Task 4 definitions. Puzzle field names (`track`, `subject`, `seedPctCorrect`, `correct`, `options`, `explanation`) consistent across Tasks 1/3/4.
- **No placeholders:** all code is concrete; the only manual content work is authoring puzzles 13–40 in Task 1 Step 2, which includes an exact template and a Node validation step.
```
