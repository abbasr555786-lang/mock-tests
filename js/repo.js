// Mockly — Storage layer.
// One interface, two future implementations:
//   Phase 2 (now):       all methods read/write localStorage.
//   Phase 4 (later):     same method signatures, internals become fetch() to /api/...
// The rest of the app should only ever talk to repo, never to localStorage directly.

(function () {
  'use strict';

  const KEY = 'mockcbt:db';
  const ROLE_KEY = 'mockcbt:role';
  const USER_KEY = 'mockcbt:user';
  const REVIEW_KEY = 'mockcbt:reviews';
  const DEVICE_KEY = 'mockcbt:deviceId';
  const SEED_VERSION_KEY = 'mockcbt:seedVersion';
  const ATTEMPT_KEY = 'mockcbt:attempts';      // in-progress attempts, keyed by examId
  const RESULTS_KEY = 'mockcbt:results';        // completed result history (newest first)
  const LAST_RESULT_KEY = 'mockcbt:last-result-store'; // durable copy of the most recent result

  // Bump this whenever the built-in exams in data*.js change so the new content
  // reaches users who already have a seeded DB. On a version bump, built-in exams
  // are refreshed in place; user-created exams, attempts and reviews are untouched.
  const SEED_VERSION = 29; // Add JMI B.Com/BBA 2021 paper (track now 2021-2025 complete).

  function readDB() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('repo: failed to parse DB, resetting', e);
      return null;
    }
  }

  function writeDB(db) {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
      return true;
    } catch (e) {
      // QuotaExceededError likely.
      console.error('repo: write failed (probably storage quota)', e);
      throw new Error('Local storage is full. Export your data to JSON, then clear some images or older drafts.');
    }
  }

  function seedIfEmpty() {
    const existing = readDB();
    if (existing && Array.isArray(existing.exams)) return syncSeeds(existing);
    const seed = { exams: (window.EXAMS || []).map(normalizeExam).map((e) => ({ ...e, published: true })) };
    writeDB(seed);
    setStoredSeedVersion(SEED_VERSION);
    return seed;
  }

  function getStoredSeedVersion() {
    return Number(localStorage.getItem(SEED_VERSION_KEY) || 0);
  }
  function setStoredSeedVersion(v) {
    try { localStorage.setItem(SEED_VERSION_KEY, String(v)); } catch (e) { /* ignore */ }
  }

  function addNewSeeds(db) {
    const have = new Set(db.exams.map((e) => e.id));
    const additions = (window.EXAMS || [])
      .filter((e) => !have.has(e.id))
      .map(normalizeExam)
      .map((e) => ({ ...e, published: true }));
    if (additions.length) db.exams = db.exams.concat(additions);
    return additions.length;
  }

  // Keep the seeded DB in step with the built-in exams shipped in data*.js.
  // On a SEED_VERSION bump, refresh every built-in exam in place (preserving its
  // published flag) and add any brand-new ones. User-created exams (ids not in
  // window.EXAMS) are left alone; attempts and reviews live under other keys and
  // are never touched. Same version => only additively seed new ids.
  function syncSeeds(db) {
    if (getStoredSeedVersion() < SEED_VERSION) {
      const builtinById = new Map((window.EXAMS || []).map((e) => [e.id, e]));
      db.exams = db.exams.map((e) =>
        builtinById.has(e.id)
          ? { ...normalizeExam(builtinById.get(e.id)), published: e.published !== false }
          : e
      );
      addNewSeeds(db);
      writeDB(db);
      setStoredSeedVersion(SEED_VERSION);
      return db;
    }
    if (addNewSeeds(db)) writeDB(db);
    return db;
  }

  // Normalize legacy seed data into the canonical shape used going forward.
  function inferCatalogueId(exam) {
    if (exam.examCatalogueId) return exam.examCatalogueId;
    const map = window.TEMPLATE_TO_CATALOGUE || {};
    return map[exam.template] || 'ssc-cgl';
  }

  function normalizeExam(exam) {
    return {
      id: exam.id,
      name: exam.name,
      template: exam.template || 'ssc',
      examCatalogueId: inferCatalogueId(exam),
      kind: exam.kind === 'pyq' ? 'pyq' : 'mock',
      scope: ['full', 'sectional', 'short'].includes(exam.scope) ? exam.scope : 'full',
      year: Number.isInteger(exam.year) ? exam.year : null,
      sectionTag: exam.sectionTag || null,
      sourceSet: exam.sourceSet || null,
      discipline: exam.discipline || null,
      durationMin: exam.durationMin || 30,
      marking: exam.marking || { correct: 2, wrong: -0.5, unattempted: 0 },
      allowSectionSwitch: exam.allowSectionSwitch !== false,
      timerMode: exam.timerMode || 'full',
      calculator: !!exam.calculator,
      questionTypes: exam.questionTypes || ['mcq'],
      languages: exam.languages || ['en'],
      published: exam.published !== false,
      sections: (exam.sections || []).map((s) => ({
        id: s.id,
        name: s.name,
        questions: (s.questions || []).map(normalizeQuestion),
      })),
    };
  }

  // Canonical 5-level difficulty scale used by the post-test ribbons.
  // Maps legacy/loose values onto: easy | easy-medium | medium | medium-hard | hard.
  function normalizeDifficulty(d) {
    const v = String(d || '').toLowerCase().trim().replace(/\s+|_/g, '-').replace(/-to-/g, '-');
    const allowed = ['easy', 'easy-medium', 'medium', 'medium-hard', 'hard'];
    if (allowed.includes(v)) return v;
    if (v === 'very-easy') return 'easy';
    if (v === 'very-hard') return 'hard';
    return 'medium';
  }

  function normalizeQuestion(q) {
    const type = q.type || 'mcq';
    const base = {
      id: q.id,
      type,
      text: q.text || '',
      format: q.format || 'text',          // 'text' | 'html' — how to render q.text
      topic: q.topic || '',
      difficulty: normalizeDifficulty(q.difficulty),
      explanation: q.explanation || '',
      explanationFormat: q.explanationFormat || 'text',
    };
    if (type === 'numerical') {
      return {
        ...base,
        answer: typeof q.answer === 'number' ? q.answer : 0,
        tolerance: typeof q.tolerance === 'number' ? q.tolerance : 0,
      };
    }
    // mcq
    return {
      ...base,
      options: Array.isArray(q.options) ? q.options.slice(0, 4) : ['', '', '', ''],
      correct: Number.isInteger(q.correct) ? q.correct : 0,
    };
  }

  function uid(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  // Fisher-Yates shuffle — returns a new array, leaves the input untouched.
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Canonical SSC CGL Tier-1 sections, in paper order. Section `id`s match the
  // engine's existing tab ids (gi/ga/qa/en); `name` matches window.SSC_CGL_POOL.
  const SSC_SECTIONS = [
    { id: 'gi', name: 'General Intelligence & Reasoning' },
    { id: 'ga', name: 'General Awareness' },
    { id: 'qa', name: 'Quantitative Aptitude' },
    { id: 'en', name: 'English Comprehension' },
  ];

  // --- Public API ---

  const repo = {
    // Initialization
    init() { return seedIfEmpty(); },

    // Role (admin gate). Phase 4 replaces with real auth.
    getRole() { return localStorage.getItem(ROLE_KEY) || 'student'; },
    setRole(role) {
      if (role === 'admin' || role === 'student') localStorage.setItem(ROLE_KEY, role);
    },
    isAdmin() { return this.getRole() === 'admin'; },

    // ---- Catalogue (parent entity above tests) ----
    listCatalogue() {
      return (window.EXAM_CATALOGUE || []).slice();
    },
    getCatalogueEntry(id) {
      return (window.EXAM_CATALOGUE || []).find((c) => c.id === id) || null;
    },
    // List published tests under a catalogue entry, optionally filtered.
    listTestsForCatalogue(catalogueId, filter) {
      const f = filter || {};
      return this.listPublishedExams().filter((t) => {
        if (t.examCatalogueId !== catalogueId) return false;
        if (f.kind && t.kind !== f.kind) return false;
        if (f.scope && t.scope !== f.scope) return false;
        if (f.year && t.year !== f.year) return false;
        if (f.sectionTag && t.sectionTag !== f.sectionTag) return false;
        return true;
      }).sort((a, b) => {
        // Newest paper first (2026, 2025, 2024, …); untagged years sink to the bottom.
        const ya = a.year != null ? a.year : -Infinity;
        const yb = b.year != null ? b.year : -Infinity;
        return yb - ya;
      });
    },
    // Quadrant counts for the exam dashboard.
    catalogueCounts(catalogueId) {
      const all = this.listPublishedExams().filter((t) => t.examCatalogueId === catalogueId);
      return {
        pyqFull:        all.filter((t) => t.kind === 'pyq'  && t.scope === 'full').length,
        pyqSectional:   all.filter((t) => t.kind === 'pyq'  && t.scope === 'sectional').length,
        mockFull:       all.filter((t) => t.kind === 'mock' && t.scope === 'full').length,
        mockSectional:  all.filter((t) => t.kind === 'mock' && t.scope === 'sectional').length,
        mockShort:      all.filter((t) => t.kind === 'mock' && t.scope === 'short').length,
        total:          all.length,
      };
    },

    // Exams
    listExams() {
      const db = readDB() || seedIfEmpty();
      return db.exams.map(normalizeExam);
    },

    listPublishedExams() {
      return this.listExams().filter((e) => e.published);
    },

    getExam(id) {
      const db = readDB() || seedIfEmpty();
      const found = db.exams.find((e) => e.id === id);
      return found ? normalizeExam(found) : null;
    },

    // ---- Generated full-length mock — the "GET /mock?year=&tier=" endpoint ----
    // Draws a randomized paper from window.SSC_CGL_POOL: `perSection` questions
    // per section (default 25 => 100 total), each section and its questions
    // shuffled, on a single 60-minute timer with +2 / -0.5 marking. The exam is
    // persisted (so the engine can launch it by id via #/test/<id>) and given a
    // stable id per (tier, year), so each call re-randomizes that slot.
    buildMock(opts) {
      const o = opts || {};
      const tier = o.tier || 1;
      const year = o.year != null ? Number(o.year) : null;
      const perSection = o.perSection || 25;
      const durationMin = o.durationMin || 60;

      const pool = (window.SSC_CGL_POOL || []).filter(
        (q) => q.tier === tier && (year == null || q.year === year)
      );
      if (!pool.length) {
        throw new Error('buildMock: no questions for tier=' + tier + (year != null ? ' year=' + year : '') + '.');
      }

      const sections = SSC_SECTIONS.map((sec) => {
        const picked = shuffle(pool.filter((q) => q.section === sec.name)).slice(0, perSection);
        return {
          id: sec.id,
          name: sec.name,
          questions: shuffle(picked).map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options.slice(0, 4),
            correct: q.correct,
            topic: q.topic || '',
            difficulty: q.difficulty || 'medium',
            explanation: q.explanation || '',
          })),
        };
      });

      const exam = {
        id: 'ssc-cgl-gen-t' + tier + (year != null ? '-' + year : ''),
        name: 'SSC CGL Tier ' + tier + (year != null ? ' — ' + year : '') + ' (Generated Mock)',
        template: 'ssc',
        examCatalogueId: 'ssc-cgl',
        kind: 'mock',
        scope: 'full',
        year: year,
        sectionTag: null,
        sourceSet: null,
        durationMin: durationMin,
        marking: { correct: 2, wrong: -0.5, unattempted: 0 },
        allowSectionSwitch: true,
        timerMode: 'full',
        calculator: false,
        questionTypes: ['mcq'],
        languages: ['en'],
        published: true,
        sections: sections,
      };
      return this.saveExam(exam);
    },

    saveExam(exam) {
      const db = readDB() || seedIfEmpty();
      const norm = normalizeExam(exam);
      const idx = db.exams.findIndex((e) => e.id === norm.id);
      if (idx >= 0) db.exams[idx] = norm; else db.exams.push(norm);
      writeDB(db);
      return norm;
    },

    deleteExam(id) {
      const db = readDB() || seedIfEmpty();
      db.exams = db.exams.filter((e) => e.id !== id);
      writeDB(db);
    },

    publishExam(id, published) {
      const exam = this.getExam(id);
      if (!exam) return;
      exam.published = !!published;
      this.saveExam(exam);
    },

    createBlankExam() {
      return {
        id: uid('exam'),
        name: 'Untitled Exam',
        template: 'ssc',
        examCatalogueId: 'ssc-cgl',
        kind: 'mock',
        scope: 'full',
        year: null,
        sectionTag: null,
        sourceSet: null,
        durationMin: 30,
        marking: { correct: 2, wrong: -0.5, unattempted: 0 },
        allowSectionSwitch: true,
        timerMode: 'full',
        calculator: false,
        questionTypes: ['mcq', 'numerical'],
        languages: ['en'],
        published: false,
        sections: [],
      };
    },

    createBlankSection() {
      return { id: uid('sec'), name: 'New Section', questions: [] };
    },

    createBlankQuestion(type) {
      const t = type === 'numerical' ? 'numerical' : 'mcq';
      const base = {
        id: uid('q'),
        type: t,
        text: '',
        format: 'html',
        topic: '',
        difficulty: 'medium',
        explanation: '',
        explanationFormat: 'html',
      };
      return t === 'numerical'
        ? { ...base, answer: 0, tolerance: 0 }
        : { ...base, options: ['', '', '', ''], correct: 0 };
    },

    // Import / export
    exportExams() {
      const db = readDB() || seedIfEmpty();
      return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), exams: db.exams }, null, 2);
    },

    importExams(jsonStr, { merge = true } = {}) {
      let parsed;
      try { parsed = JSON.parse(jsonStr); } catch (e) { throw new Error('Invalid JSON.'); }
      const incoming = Array.isArray(parsed) ? parsed : parsed.exams;
      if (!Array.isArray(incoming)) throw new Error('JSON must be an array of exams or `{ exams: [...] }`.');

      const db = merge ? (readDB() || { exams: [] }) : { exams: [] };
      let added = 0, updated = 0;
      incoming.forEach((raw) => {
        const e = normalizeExam(raw);
        const idx = db.exams.findIndex((x) => x.id === e.id);
        if (idx >= 0) { db.exams[idx] = e; updated++; } else { db.exams.push(e); added++; }
      });
      writeDB(db);
      return { added, updated, total: incoming.length };
    },

    // Validation — returns array of error strings (empty = valid).
    validateExam(exam) {
      const errs = [];
      if (!exam.name || !exam.name.trim()) errs.push('Exam name is required.');
      if (!(exam.durationMin > 0)) errs.push('Duration must be greater than 0.');
      if (!Array.isArray(exam.sections) || exam.sections.length === 0) {
        errs.push('Exam must have at least one section.');
      }
      (exam.sections || []).forEach((s, i) => {
        if (!s.name || !s.name.trim()) errs.push('Section ' + (i + 1) + ': name is required.');
        if (!Array.isArray(s.questions) || s.questions.length === 0) {
          errs.push('Section "' + (s.name || i + 1) + '": needs at least one question.');
        }
        (s.questions || []).forEach((q, j) => {
          const where = 'Section "' + (s.name || i + 1) + '" Q' + (j + 1);
          const plain = stripHtml(q.text || '').trim();
          if (!plain) errs.push(where + ': text is required.');
          if (q.type === 'numerical') {
            if (typeof q.answer !== 'number' || isNaN(q.answer)) errs.push(where + ': numerical answer must be a number.');
            if (typeof q.tolerance !== 'number' || q.tolerance < 0) errs.push(where + ': tolerance must be a non-negative number.');
          } else {
            if (!Array.isArray(q.options) || q.options.length !== 4) errs.push(where + ': MCQ must have exactly 4 options.');
            else if (q.options.some((o) => !String(o).trim())) errs.push(where + ': all 4 options must have text.');
            if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) errs.push(where + ': correct option must be A, B, C, or D.');
          }
        });
      });
      return errs;
    },

    // Storage usage estimate (in bytes for the DB key only — close enough for warnings).
    usageBytes() {
      const raw = localStorage.getItem(KEY);
      return raw ? raw.length : 0;  // 1 char ≈ 1 byte for JSON ASCII content
    },

    // Reset everything (admin nuke).
    resetAll() {
      localStorage.removeItem(KEY);
      seedIfEmpty();
    },

    // ---- User profile (Phase 4 will swap for real auth) ----
    getUser() {
      try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    },
    saveUser(patch) {
      const current = this.getUser() || {};
      const next = Object.assign({}, current, patch || {});
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    },
    clearUser() {
      localStorage.removeItem(USER_KEY);
    },
    hasOnboarded() {
      const u = this.getUser();
      return !!u && (u.skipped === true || !!u.name);
    },

    // ---- Mock ratings & reviews (Phase 4 will swap for a real reviews API) ----
    // Stored as { [examId]: [ { id, rating, comment, name, ts, userKey } ] }.
    // A stable per-device key lets a user see and overwrite their own review
    // even though there is no real auth yet.
    deviceId() {
      let id = localStorage.getItem(DEVICE_KEY);
      if (!id) { id = uid('dev'); localStorage.setItem(DEVICE_KEY, id); }
      return id;
    },
    _readReviews() {
      try {
        const raw = localStorage.getItem(REVIEW_KEY);
        const obj = raw ? JSON.parse(raw) : {};
        return obj && typeof obj === 'object' ? obj : {};
      } catch (e) { return {}; }
    },
    _writeReviews(obj) {
      localStorage.setItem(REVIEW_KEY, JSON.stringify(obj));
    },
    listReviews(examId) {
      const all = this._readReviews()[examId] || [];
      return all.slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
    },
    getMyReview(examId) {
      const me = this.deviceId();
      return this.listReviews(examId).find((r) => r.userKey === me) || null;
    },
    // rating: integer 1..5 (required). comment/name optional.
    saveReview(examId, { rating, comment, name } = {}) {
      const r = Math.max(1, Math.min(5, Math.round(Number(rating) || 0)));
      if (!r) throw new Error('A star rating is required.');
      const db = this._readReviews();
      const list = db[examId] || (db[examId] = []);
      const me = this.deviceId();
      const author = (name && String(name).trim()) ||
        (this.getUser() && this.getUser().name) || 'Anonymous';
      const existing = list.find((x) => x.userKey === me);
      const payload = {
        rating: r,
        comment: String(comment || '').trim().slice(0, 1000),
        name: String(author).slice(0, 60),
        ts: Date.now(),
        userKey: me,
      };
      if (existing) {
        Object.assign(existing, payload);
      } else {
        list.push(Object.assign({ id: uid('rev') }, payload));
      }
      this._writeReviews(db);
      return existing || list[list.length - 1];
    },
    // { count, average, distribution: {1..5: n} }
    getRatingSummary(examId) {
      const list = this.listReviews(examId);
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let sum = 0;
      list.forEach((r) => {
        const v = Math.max(1, Math.min(5, Math.round(r.rating || 0)));
        distribution[v]++;
        sum += v;
      });
      return {
        count: list.length,
        average: list.length ? sum / list.length : 0,
        distribution,
      };
    },

    // ---- In-progress attempts (autosave / resume) ----
    // A snapshot of a running test, keyed by examId, so a refresh or accidental
    // navigation doesn't wipe the attempt. Cleared on submit.
    _readAttempts() {
      try { const o = JSON.parse(localStorage.getItem(ATTEMPT_KEY) || '{}'); return o && typeof o === 'object' ? o : {}; }
      catch (e) { return {}; }
    },
    saveAttempt(examId, snapshot) {
      if (!examId) return;
      const all = this._readAttempts();
      all[examId] = Object.assign({ examId: examId, savedAt: Date.now() }, snapshot || {});
      try { localStorage.setItem(ATTEMPT_KEY, JSON.stringify(all)); } catch (e) { /* quota — ignore */ }
    },
    getAttempt(examId) {
      return this._readAttempts()[examId] || null;
    },
    // All in-progress attempts, newest first (for the My Tests hub).
    listAttempts() {
      const all = this._readAttempts();
      return Object.keys(all).map((k) => all[k]).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
    },
    clearAttempt(examId) {
      const all = this._readAttempts();
      if (all[examId]) {
        delete all[examId];
        try { localStorage.setItem(ATTEMPT_KEY, JSON.stringify(all)); } catch (e) { /* ignore */ }
      }
    },

    // ---- Completed results history ----
    // Persisted so results survive a tab close and to back a future "My Tests" hub.
    saveResult(result) {
      if (!result) return null;
      let list;
      try { list = JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]'); } catch (e) { list = []; }
      if (!Array.isArray(list)) list = [];
      const entry = Object.assign({ id: uid('att'), finishedAt: Date.now() }, result);
      list.unshift(entry);
      list = list.slice(0, 100); // keep the store bounded
      try { localStorage.setItem(RESULTS_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
      try { localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(entry)); } catch (e) { /* ignore */ }
      return entry;
    },
    listResults() {
      try { const l = JSON.parse(localStorage.getItem(RESULTS_KEY) || '[]'); return Array.isArray(l) ? l : []; }
      catch (e) { return []; }
    },
    getLastResult() {
      try { return JSON.parse(localStorage.getItem(LAST_RESULT_KEY) || 'null'); } catch (e) { return null; }
    },
  };

  function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = String(html || '');
    return tmp.textContent || '';
  }

  // Auto-seed on load.
  seedIfEmpty();

  window.repo = repo;
})();
