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

  var state = { track: 'all', order: [], cursor: 0 };

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
  }

  // Scroll-driven prefetch: append the next batch once the user is within ~2
  // screens of the bottom, so a full-height snap card never becomes a dead end.
  // Plain scroll math (no IntersectionObserver / rAF) — fires reliably across
  // renderers. The near-bottom check plus the growing scrollHeight after each
  // append are self-limiting, so a direct call can't over-append.
  function onScroll() {
    var feed = document.getElementById('reels-feed');
    if (!feed || !state.order.length) return;
    if (feed.scrollTop + feed.clientHeight * 2 >= feed.scrollHeight) appendBatch();
  }

  function mount() {
    var root = document.getElementById('reels-root');
    if (!root) return;
    if (!core || !reelsCore || !window.PUZZLES) return;
    var saved = 'all';
    try { saved = localStorage.getItem(TRACK_KEY) || 'all'; } catch (e) { /* ignore */ }
    var avail = reelsCore.availableTracks(window.PUZZLES).map(function (t) { return t.id; });
    state.track = avail.indexOf(saved) !== -1 ? saved : 'all';
    renderChips();
    updateStreakHeader();
    state.order = buildOrder(state.track);
    state.cursor = 0;
    var feed = document.getElementById('reels-feed');
    if (feed) {
      feed.innerHTML = '';
      feed.addEventListener('scroll', onScroll, { passive: true });
    }
    appendBatch();
  }

  window.reels = { mount: mount };
})();
