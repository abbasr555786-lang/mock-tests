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
