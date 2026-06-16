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
