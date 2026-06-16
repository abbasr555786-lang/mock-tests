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
