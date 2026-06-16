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
