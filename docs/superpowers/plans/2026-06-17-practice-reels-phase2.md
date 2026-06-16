# Practice Reels (Phase 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** A full-screen, TikTok-style vertical swipe feed of JMI-style questions — solve one, see the reveal, swipe up for the next — with a track filter, a save deck, and the same share + streak system as the Daily Challenge.

**Architecture:** Reuses the Phase 1 building blocks: `window.PUZZLES` (pool), `window.dailyCore` (date/streak), `window.dailyShare` (share cards). New `js/reels-core.js` holds the pure, testable feed logic (filter by track, track counts) with a dual export for Node tests. New `js/reels.js` renders the feed into a new `#view-reels` template and handles swipe (native CSS scroll-snap), solve/reveal, save, share, and lazy infinite append. The SPA router gains a `#/reels` route. Streak/seen/saved state share localStorage with Phase 1 so progression is unified.

**Tech Stack:** Vanilla browser JS (ES5-ish, no framework/build), `<template>`-clone SPA, CSS scroll-snap for swipe, IntersectionObserver for lazy append, `node:test` for unit tests (Node v24). Brand green/gold.

---

## File Structure

- **Create `js/reels-core.js`** — pure feed logic. Dual export (`window.reelsCore` + `module.exports`). Depends on nothing.
- **Create `js/reels.js`** — DOM feed renderer. Depends on `window.PUZZLES`, `window.dailyCore`, `window.dailyShare`, `window.reelsCore`. Exposes `window.reels = { mount }`.
- **Create `css/reels.css`** — full-screen feed, scroll-snap cards, filter chips, side rail.
- **Create `test/reels-core.test.mjs`** — Node unit tests for `reels-core.js`.
- **Modify `index.html`** — add `<link>` for reels.css, a `<template id="view-reels">`, a "Keep solving" entry button in the `lp-daily` section, and `<script>` tags for reels-core.js + reels.js.
- **Modify `js/app.js`** — add a `#/reels` route + `renderReels()`.

### Shared localStorage keys (consistent with Phase 1)

- `jp:daily:streak` — SHARED streak state (solving a reel advances the same streak).
- `jp:daily:seen` — JSON array of puzzle ids the user has answered (cross-session).
- `jp:daily:saved` — JSON array of bookmarked puzzle ids (the Save deck).
- `jp:reels:track` — last selected track filter (plain string, e.g. `all`).

### Track taxonomy (used in reels-core.js and reels.js)

```js
// id matches puzzle.track; 'all' is the unfiltered view.
[ { id: 'all',     label: 'All JMI' },
  { id: 'mba',     label: 'MBA' },
  { id: 'ballb',   label: 'BA LLB' },
  { id: 'mca',     label: 'MCA' },
  { id: 'rca',     label: 'RCA' },
  { id: 'general', label: 'General' } ]
```

---

## Task 1: Pure feed logic — `reels-core.js` (TDD)

**Files:**
- Create: `js/reels-core.js`
- Test: `test/reels-core.test.mjs`

- [ ] **Step 1: Write the failing test `test/reels-core.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const core = require('../js/reels-core.js');

const POOL = [
  { id: 'a', track: 'mba' }, { id: 'b', track: 'mba' },
  { id: 'c', track: 'ballb' }, { id: 'd', track: 'general' },
];

test('TRACKS lists all + the five tracks in order', () => {
  assert.deepEqual(core.TRACKS.map((t) => t.id),
    ['all', 'mba', 'ballb', 'mca', 'rca', 'general']);
});

test('filterByTrack all returns the whole pool', () => {
  assert.equal(core.filterByTrack(POOL, 'all').length, 4);
});

test('filterByTrack filters by track id', () => {
  assert.deepEqual(core.filterByTrack(POOL, 'mba').map((p) => p.id), ['a', 'b']);
  assert.deepEqual(core.filterByTrack(POOL, 'ballb').map((p) => p.id), ['c']);
});

test('filterByTrack unknown track returns empty', () => {
  assert.deepEqual(core.filterByTrack(POOL, 'phd'), []);
});

test('trackCounts counts per track plus all', () => {
  const c = core.trackCounts(POOL);
  assert.equal(c.all, 4);
  assert.equal(c.mba, 2);
  assert.equal(c.ballb, 1);
  assert.equal(c.general, 1);
  assert.equal(c.mca, 0);
});

test('availableTracks returns only all + tracks with >=1 puzzle, in TRACKS order', () => {
  assert.deepEqual(core.availableTracks(POOL).map((t) => t.id),
    ['all', 'mba', 'ballb', 'general']);
});
```

- [ ] **Step 2: Run `node --test` — confirm FAIL (module not found).**

- [ ] **Step 3: Implement `js/reels-core.js`**

```js
// JamiaPrep — Practice Reels pure logic. No DOM. Dual export:
// window.reelsCore in the browser; module.exports under Node tests.
(function (root) {
  'use strict';

  var TRACKS = [
    { id: 'all', label: 'All JMI' },
    { id: 'mba', label: 'MBA' },
    { id: 'ballb', label: 'BA LLB' },
    { id: 'mca', label: 'MCA' },
    { id: 'rca', label: 'RCA' },
    { id: 'general', label: 'General' },
  ];

  function filterByTrack(pool, track) {
    if (track === 'all') return (pool || []).slice();
    return (pool || []).filter(function (p) { return p.track === track; });
  }

  function trackCounts(pool) {
    var counts = {};
    TRACKS.forEach(function (t) { counts[t.id] = 0; });
    counts.all = (pool || []).length;
    (pool || []).forEach(function (p) {
      if (counts[p.track] === undefined) counts[p.track] = 0;
      counts[p.track] += 1;
    });
    return counts;
  }

  // Only 'all' plus tracks that actually have puzzles, preserving TRACKS order.
  function availableTracks(pool) {
    var counts = trackCounts(pool);
    return TRACKS.filter(function (t) { return t.id === 'all' || counts[t.id] > 0; });
  }

  var api = { TRACKS: TRACKS, filterByTrack: filterByTrack, trackCounts: trackCounts, availableTracks: availableTracks };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.reelsCore = api;
})(typeof window !== 'undefined' ? window : null);
```

- [ ] **Step 4: Run `node --test` — confirm all reels-core + the 9 existing daily-core tests PASS.**

- [ ] **Step 5: Commit**

```bash
git add js/reels-core.js test/reels-core.test.mjs
git commit -m "feat(reels): add tested pure feed logic (track filter + counts)"
```

---

## Task 2: Styles — `css/reels.css`

**Files:**
- Create: `css/reels.css`

- [ ] **Step 1: Create `css/reels.css`**

```css
/* JamiaPrep — Practice Reels: immersive full-screen swipe feed. Green/gold. */
.reels { position: relative; }
.reels-feed {
  height: 100dvh; overflow-y: scroll; scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch; scrollbar-width: none; background: #0e3d20;
}
.reels-feed::-webkit-scrollbar { display: none; }

.reels-head {
  position: fixed; top: 0; left: 0; right: 0; z-index: 20; padding: 12px 14px 26px;
  display: flex; align-items: center; gap: 10px;
  background: linear-gradient(180deg, rgba(14,61,32,.92), rgba(14,61,32,0));
  pointer-events: none;
}
.reels-head > * { pointer-events: auto; }
.reels-back {
  width: 38px; height: 38px; flex: 0 0 auto; border-radius: 50%;
  background: rgba(255,255,255,.14); color: #fff; text-decoration: none;
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.reels-chips { display: flex; gap: 7px; overflow-x: auto; flex: 1 1 auto; scrollbar-width: none; }
.reels-chips::-webkit-scrollbar { display: none; }
.reels-chip {
  flex: 0 0 auto; font-size: 12px; font-weight: 700; padding: 7px 13px; border-radius: 999px;
  background: rgba(255,255,255,.14); color: #dfeee5; border: none; cursor: pointer; white-space: nowrap;
}
.reels-chip.is-on { background: #d4a017; color: #3a2c00; }
.reels-streak { flex: 0 0 auto; color: #d4a017; font-weight: 800; font-size: 14px; }

.reel-card {
  height: 100dvh; scroll-snap-align: start; scroll-snap-stop: always;
  position: relative; box-sizing: border-box;
  padding: 84px 64px 78px 22px; color: #fff;
  display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(165deg, #1b6e3c, #0e3d20);
}
.reel-card:nth-child(even) { background: linear-gradient(165deg, #186436, #0c3a1f); }
.reel-tag {
  align-self: flex-start; font-size: 11px; font-weight: 800; letter-spacing: .5px;
  text-transform: uppercase; background: rgba(212,160,23,.25); color: #d4a017;
  padding: 4px 9px; border-radius: 6px;
}
.reel-q { font-size: 21px; font-weight: 800; line-height: 1.4; margin: 16px 0 18px; }
.reel-opts { display: flex; flex-direction: column; gap: 10px; }
.reel-opt {
  text-align: left; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
  border-radius: 12px; padding: 13px 15px; font-size: 15px; color: #fff; cursor: pointer;
  display: flex; gap: 10px; align-items: center; font-family: inherit;
  transition: background .12s, border-color .12s;
}
.reel-opt:hover:not(:disabled) { background: rgba(255,255,255,.2); }
.reel-opt:disabled { cursor: default; }
.reel-opt__k { font-weight: 800; opacity: .7; }
.reel-opt.is-correct { background: rgba(62,196,109,.35); border-color: #3ec46d; }
.reel-opt.is-wrong { background: rgba(214,90,90,.35); border-color: #d65a5a; }
.reel-expl {
  background: rgba(255,255,255,.1); border-radius: 11px; padding: 12px 14px;
  font-size: 13.5px; line-height: 1.5; margin-top: 14px;
}
.reel-foot { margin-top: 16px; font-size: 13px; color: #dfeee5; min-height: 20px; }
.reel-foot b { color: #fff; }

.reel-rail {
  position: absolute; right: 10px; bottom: 92px; z-index: 5;
  display: flex; flex-direction: column; gap: 16px; align-items: center;
}
.reel-rail button {
  border: none; background: none; cursor: pointer; color: #dfeee5;
  display: flex; flex-direction: column; align-items: center; gap: 3px; font-family: inherit;
}
.reel-rail__ico {
  width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,.14);
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.reel-rail__cap { font-size: 9px; }
.reel-rail .is-saved .reel-rail__ico { background: #d4a017; color: #3a2c00; }

.reel-hint {
  position: absolute; left: 0; right: 0; bottom: 26px; text-align: center;
  font-size: 11px; color: rgba(255,255,255,.6); animation: reelBob 1.5s infinite;
}
@keyframes reelBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

@media (min-width: 760px) {
  .reels-feed { max-width: 460px; margin: 0 auto; }
  .reel-card { border-radius: 0; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/reels.css
git commit -m "feat(reels): add full-screen swipe-feed styles"
```

---

## Task 3: Feed renderer — `js/reels.js`

**Files:**
- Create: `js/reels.js`

- [ ] **Step 1: Implement `js/reels.js`**

```js
// JamiaPrep — Practice Reels feed. Renders into #view-reels (mounted by app.js
// router). Reuses window.PUZZLES, dailyCore, dailyShare, reelsCore. Solving a
// reel advances the SAME streak as the Daily Challenge.
(function () {
  'use strict';
  var core = window.dailyCore;
  var reelsCore = window.reelsCore;
  var STREAK_KEY = 'jp:daily:streak';
  var SEEN_KEY = 'jp:daily:seen';
  var SAVED_KEY = 'jp:daily:saved';
  var TRACK_KEY = 'jp:reels:track';
  var BATCH = 5;

  var TRACK_LABEL = { all: 'JMI Entrance', general: 'JMI Entrance', mba: 'JMI MBA', ballb: 'JMI BA LLB', mca: 'JMI MCA', rca: 'JMI RCA' };

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function writeJSON(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ } }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var state = { track: 'all', order: [], cursor: 0, observer: null };

  function buildOrder(track) {
    return shuffle(reelsCore.filterByTrack(window.PUZZLES || [], track));
  }

  function streakNow() { return readJSON(STREAK_KEY, { streak: 0, lastSolvedDate: null, solvedDates: [], totalSolved: 0 }); }
  function todayKey() { return core.dateKey(new Date()); }

  function updateStreakHeader() {
    var s = streakNow();
    var node = document.getElementById('reels-streak');
    if (node) node.textContent = s.streak > 0 ? '🔥 ' + s.streak : '🔥 0';
  }

  function renderChips() {
    var host = document.getElementById('reels-chips');
    if (!host) return;
    host.innerHTML = '';
    reelsCore.availableTracks(window.PUZZLES || []).forEach(function (t) {
      var chip = el('button', { type: 'button', class: 'reels-chip' + (t.id === state.track ? ' is-on' : ''), 'data-track': t.id }, escapeHTML(t.label));
      chip.addEventListener('click', function () { setTrack(t.id); });
      host.appendChild(chip);
    });
  }

  function setTrack(track) {
    state.track = track;
    try { localStorage.setItem(TRACK_KEY, track); } catch (e) { /* ignore */ }
    state.order = buildOrder(track);
    state.cursor = 0;
    var feed = document.getElementById('reels-feed');
    if (feed) { feed.innerHTML = ''; appendBatch(); feed.scrollTop = 0; }
    renderChips();
  }

  function trackLabelFor(puzzle) { return TRACK_LABEL[puzzle.track] || ('JMI ' + puzzle.track.toUpperCase()); }

  function renderCard(puzzle) {
    var saved = readJSON(SAVED_KEY, []);
    var card = el('div', { class: 'reel-card' });
    card.appendChild(el('span', { class: 'reel-tag' }, trackLabelFor(puzzle) + ' · ' + escapeHTML(puzzle.subject)));
    card.appendChild(el('p', { class: 'reel-q' }, escapeHTML(puzzle.text)));

    var opts = el('div', { class: 'reel-opts' });
    puzzle.options.forEach(function (opt, i) {
      opts.appendChild(el('button', { class: 'reel-opt', type: 'button', 'data-idx': String(i) },
        '<span class="reel-opt__k">' + 'ABCD'[i] + '</span>' + escapeHTML(opt)));
    });
    card.appendChild(opts);

    var foot = el('div', { class: 'reel-foot' });
    card.appendChild(foot);

    var hint = el('div', { class: 'reel-hint' }, 'Pick an answer ↑');
    card.appendChild(hint);

    // Side rail: Save / Share / Next
    var rail = el('div', { class: 'reel-rail' });
    var saveBtn = el('button', { type: 'button', class: saved.indexOf(puzzle.id) !== -1 ? 'is-saved' : '' },
      '<span class="reel-rail__ico">🔖</span><span class="reel-rail__cap">Save</span>');
    saveBtn.addEventListener('click', function () {
      var list = readJSON(SAVED_KEY, []);
      var at = list.indexOf(puzzle.id);
      if (at === -1) { list.push(puzzle.id); saveBtn.className = 'is-saved'; }
      else { list.splice(at, 1); saveBtn.className = ''; }
      writeJSON(SAVED_KEY, list);
    });
    var shareBtn = el('button', { type: 'button' }, '<span class="reel-rail__ico">↗</span><span class="reel-rail__cap">Share</span>');
    shareBtn.addEventListener('click', function () {
      if (window.dailyShare && window.dailyShare.shareDare) {
        window.dailyShare.shareDare(puzzle, { pctWrong: 100 - puzzle.seedPctCorrect, solved: core.seededSolvers(todayKey()) });
      }
    });
    var nextBtn = el('button', { type: 'button' }, '<span class="reel-rail__ico">▾</span><span class="reel-rail__cap">Next</span>');
    nextBtn.addEventListener('click', function () {
      if (card.nextElementSibling) card.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    });
    rail.appendChild(saveBtn); rail.appendChild(shareBtn); rail.appendChild(nextBtn);
    card.appendChild(rail);

    var answered = false;
    Array.prototype.forEach.call(opts.children, function (btn) {
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var chosen = Number(btn.getAttribute('data-idx'));
        Array.prototype.forEach.call(opts.children, function (b, i) {
          b.disabled = true;
          if (i === puzzle.correct) b.classList.add('is-correct');
          else if (i === chosen) b.classList.add('is-wrong');
        });
        hint.textContent = 'Swipe up for next ↑';
        card.appendChild(el('div', { class: 'reel-expl' }, escapeHTML(puzzle.explanation)));
        foot.innerHTML = '<b>' + puzzle.seedPctCorrect + '%</b> got this right · <b>+1</b> solved 🎉';

        // Record seen + advance the shared streak (first solve of the day).
        var seen = readJSON(SEEN_KEY, []);
        if (seen.indexOf(puzzle.id) === -1) { seen.push(puzzle.id); writeJSON(SEEN_KEY, seen); }
        var newStreak = core.updateStreakOnSolve(streakNow(), todayKey());
        writeJSON(STREAK_KEY, newStreak);
        updateStreakHeader();
      });
    });

    return card;
  }

  function appendBatch() {
    var feed = document.getElementById('reels-feed');
    if (!feed) return;
    if (!state.order.length) {
      feed.appendChild(el('div', { class: 'reel-card' },
        '<p class="reel-q">No questions in this track yet — check back soon.</p>'));
      return;
    }
    for (var n = 0; n < BATCH; n++) {
      if (state.cursor >= state.order.length) { state.order = buildOrder(state.track); state.cursor = 0; }
      var puzzle = state.order[state.cursor++];
      feed.appendChild(renderCard(puzzle));
    }
    armSentinel();
  }

  // Observe the last card; when it scrolls into view, append the next batch.
  function armSentinel() {
    var feed = document.getElementById('reels-feed');
    if (!feed) return;
    if (state.observer) state.observer.disconnect();
    var last = feed.lastElementChild;
    if (!last) return;
    state.observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        state.observer.disconnect();
        appendBatch();
      }
    }, { root: feed, threshold: 0.25 });
    state.observer.observe(last);
  }

  function mount() {
    var root = document.getElementById('reels-root');
    if (!root) return;
    if (!core || !reelsCore || !window.PUZZLES) return;
    var saved = 'all';
    try { saved = localStorage.getItem(TRACK_KEY) || 'all'; } catch (e) { /* ignore */ }
    // Guard against a stale track that no longer has puzzles.
    var avail = reelsCore.availableTracks(window.PUZZLES).map(function (t) { return t.id; });
    state.track = avail.indexOf(saved) !== -1 ? saved : 'all';
    renderChips();
    updateStreakHeader();
    state.order = buildOrder(state.track);
    state.cursor = 0;
    var feed = document.getElementById('reels-feed');
    if (feed) feed.innerHTML = '';
    appendBatch();
  }

  window.reels = { mount: mount };
})();
```

- [ ] **Step 2: `node --check js/reels.js` (exit 0).**

- [ ] **Step 3: Commit**

```bash
git add js/reels.js
git commit -m "feat(reels): render swipe feed with solve/save/share/streak"
```

---

## Task 4: Wiring — template, route, entry point, scripts

**Files:**
- Modify: `index.html`
- Modify: `js/app.js`

- [ ] **Step 1: Link reels.css in `index.html`.** Find the `<link rel="stylesheet" href="css/daily.css" />` line and add directly after it:
```html
  <link rel="stylesheet" href="css/reels.css" />
```

- [ ] **Step 2: Add the `view-reels` template.** In `index.html`, find the closing `</template>` of `<template id="view-home">` … actually add the new template directly AFTER the `<template id="view-result">` … `</template>` block (so it sits with the other view templates, before the `<script>` tags around line 765). Insert:
```html
  <template id="view-reels">
    <div class="reels" id="reels-root">
      <header class="reels-head">
        <a class="reels-back" href="#/" aria-label="Back to home">←</a>
        <div class="reels-chips" id="reels-chips"></div>
        <span class="reels-streak" id="reels-streak">🔥 0</span>
      </header>
      <div class="reels-feed" id="reels-feed"></div>
    </div>
  </template>
```

- [ ] **Step 3: Add the entry button in the home `lp-daily` section.** In `index.html`, inside `<template id="view-home">`, find the daily section:
```html
        <div id="daily-challenge-mount" hidden></div>
```
Replace it with:
```html
        <div id="daily-challenge-mount" hidden></div>
        <p class="lp-daily__more"><a class="lp-btn lp-btn--gold" href="#/reels">Keep solving in Practice Reels →</a></p>
```

- [ ] **Step 4: Style the entry button.** Append to `css/daily.css`:
```css
.lp-daily__more { text-align: center; margin: 16px 0 0; }
```

- [ ] **Step 5: Add the reels scripts in `index.html`.** Find the block of new Phase 1 scripts (the line `<script src="js/daily-share.js"></script>`) and add directly after it:
```html
  <script src="js/reels-core.js"></script>
```
Then find `<script src="js/daily.js"></script>` and add directly after it:
```html
  <script src="js/reels.js"></script>
```
(reels-core before reels.js; both before app.js, which still loads last.)

- [ ] **Step 6: Add the route in `js/app.js`.** In the `route()` function, find the line `if (parts[0] === 'result') return renderResult();` and add directly after it:
```js
    if (parts[0] === 'reels') return renderReels();
```

- [ ] **Step 7: Add `renderReels()` in `js/app.js`.** Immediately after the `renderHome()` function's closing brace (search for the end of `function renderHome() { … }`), add:
```js
  // ---------- Practice Reels ----------
  function renderReels() {
    stopTimer();
    mount('view-reels');
    if (window.reels && window.reels.mount) window.reels.mount();
  }
```
(`mount` and `stopTimer` are existing helpers in app.js. `renderReels` must be in the same IIFE scope as `route()` and `renderHome()`.)

- [ ] **Step 8: Verify**
- `node --test` → all daily-core + reels-core tests pass.
- `node --check js/app.js` → exit 0.
- grep that index.html contains exactly one `id="view-reels"`, one `id="reels-feed"`, one `css/reels.css`, one `js/reels-core.js`, one `js/reels.js`, one `href="#/reels"` entry button.

- [ ] **Step 9: Commit**
```bash
git add index.html js/app.js css/daily.css
git commit -m "feat(reels): wire #/reels route, view template, and home entry point"
```

---

## Task 5: Browser verification (controller-run) + finish

This task is run by the controller, not a subagent.

- [ ] **Step 1: Start preview (`preview_start` name `mockcbt`).**
- [ ] **Step 2: Navigate to `#/reels`.** Verify:
  1. Full-screen dark feed renders with a header: back arrow, filter chips (All JMI · MBA · BA LLB · MCA · RCA · General), and "🔥 N" streak.
  2. First card shows a "JMI <Track> · <Subject>" tag, question, 4 options, a side rail (Save/Share/Next), and a swipe hint. NO difficulty shown.
  3. Clicking an option locks it, marks correct/wrong, shows explanation + "<pct>% got this right · +1 solved", and advances the streak in the header.
  4. Scrolling down snaps to the next card; nearing the end appends more (feed never runs out).
  5. Save toggles the bookmark icon; Next scrolls to the next card.
  6. Changing the track chip rebuilds the feed (only that track's questions) and scrolls to top; selection persists across reload.
  7. The home page shows a gold "Keep solving in Practice Reels →" button that routes to the feed.
  8. No console errors.
- [ ] **Step 3: Mobile viewport check (`preview_resize` mobile).** Confirm cards fill the screen and snap cleanly; rail and chips usable.
- [ ] **Step 4: Screenshot the feed (unsolved + answered) as proof.**
- [ ] **Step 5: Stop preview; final code review; merge to main and push (auto-deploys).**

---

## Self-Review notes (applied)

- **Spec coverage:** swipe feed (Tasks 2/3) ✓; one-question-per-screen solve→reveal→stats (Task 3) ✓; track filter (Tasks 1/3/4) ✓; Save deck (Task 3, `jp:daily:saved`) ✓; share reuses Phase 1 Dare card (Task 3) ✓; streak shared with Daily Challenge (Task 3, `jp:daily:streak`) ✓; entry from homepage (Task 4) ✓; difficulty never shown ✓; honest track labels ✓. Supabase real counts + login sync remain Phase 3 (out of scope).
- **Type consistency:** `reelsCore.filterByTrack/trackCounts/availableTracks/TRACKS` defined in Task 1, used in Task 3. `dailyShare.shareDare(puzzle, {pctWrong, solved})` and `dailyCore.updateStreakOnSolve/dateKey/seededSolvers` match Phase 1 signatures. localStorage keys consistent with Phase 1.
- **No placeholders:** all code complete; no TODOs.
```
