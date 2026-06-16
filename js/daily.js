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

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
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

    var trackLabel = puzzle.track === 'general' ? 'JMI Entrance' : 'JMI ' + puzzle.track.toUpperCase();
    card.appendChild(el('p', { class: 'dc-framing' },
      'Modeled on the ' + trackLabel + ' pattern · the level Jamia actually asks'));
    card.appendChild(el('span', { class: 'dc-tag' },
      trackLabel + ' · ' + puzzle.subject));
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
        if (window.dailyShare && window.dailyShare.shareDare) {
          window.dailyShare.shareDare(puzzle, { pctWrong: 100 - puzzle.seedPctCorrect, solved: core.seededSolvers(tKey) });
        }
      });
      cta.appendChild(share);
      cta.appendChild(el('span', { class: 'dc-btn dc-btn--ghost' }, 'Come back tomorrow'));
      card.appendChild(cta);

      renderProof(true);
    }

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
              if (window.dailyShare && window.dailyShare.offerFlex) {
                window.dailyShare.offerFlex(newStreak.streak, puzzle.seedPctCorrect);
              }
            }, 600);
          }
          top.querySelector('.dc-streak').textContent = '🔥 ' + newStreak.streak + '-day streak';
          reveal(chosenIdx);
        });
      });
      renderProof(false);
    }

    if (host._dcTimer) clearInterval(host._dcTimer);
    host._dcTimer = setInterval(function () {
      var r = card.querySelector('.dc-reset');
      if (!r) return;
      r.textContent = fmtHMS(secondsToReset());
    }, 1000);
  }

  window.daily = { mount: mount };
})();
