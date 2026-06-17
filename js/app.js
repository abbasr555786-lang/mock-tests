// Mockly — SPA router + exam engine.
// No frameworks. Plain DOM. State is held in module-scope vars.
// Views are <template> blocks in index.html; we clone whichever matches the hash route.

(function () {
  'use strict';

  // ---------- Tiny helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function mount(templateId) {
    const tpl = document.getElementById(templateId);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(tpl.content.cloneNode(true));
    injectSidebarToggle();
  }

  function findExam(id) {
    if (window.repo) return window.repo.getExam(id);
    return (window.EXAMS || []).find((e) => e.id === id);
  }

  function listExamsForHome() {
    if (window.repo) return window.repo.listPublishedExams();
    return window.EXAMS || [];
  }

  function flattenQuestions(exam) {
    // Returns [{ q, sectionIdx, sectionId, sectionName, globalIdx, sectionIdx }, ...]
    const out = [];
    exam.sections.forEach((sec, si) => {
      sec.questions.forEach((q, qi) => {
        out.push({
          q,
          sectionIdx: si,
          sectionId: sec.id,
          sectionName: sec.name,
          inSectionIdx: qi,
          globalIdx: out.length,
        });
      });
    });
    return out;
  }

  function formatMMSS(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return s + 's';
    return m + 'm ' + s + 's';
  }

  // ---------- Difficulty taxonomy (post-test ribbons) ----------
  // 5-level scale with colour-coded ribbons shown in the answer review.
  const DIFFICULTY_META = {
    'easy':        { label: 'Easy',        cls: 'diff--easy' },
    'easy-medium': { label: 'Easy–Medium', cls: 'diff--easy-medium' },
    'medium':      { label: 'Medium',      cls: 'diff--medium' },
    'medium-hard': { label: 'Medium–Hard', cls: 'diff--medium-hard' },
    'hard':        { label: 'Hard',        cls: 'diff--hard' },
  };
  function difficultyMeta(key) {
    return DIFFICULTY_META[key] || DIFFICULTY_META.medium;
  }
  function difficultyRibbon(key) {
    const m = difficultyMeta(key);
    return '<span class="diff-ribbon ' + m.cls + '"><span class="diff-ribbon__dot"></span>' + m.label + '</span>';
  }
  // Per-question time chip from accumulated milliseconds.
  function timeChip(ms) {
    const secs = Math.round((ms || 0) / 1000);
    return '<span class="rev-time" title="Time spent on this question">' +
      '<span class="rev-time__icon" aria-hidden="true">⏱</span>' + formatDuration(secs) + '</span>';
  }

  // Human descriptor shown under the exam name in the test runner.
  // Derived from the exam's own metadata instead of a hardcoded "Tier 1".
  function examSubtitle(exam) {
    const parts = [];
    if (exam.year) parts.push(String(exam.year));
    if (exam.sectionTag) parts.push(exam.sectionTag);
    else if (exam.scope === 'full') parts.push('Full Length');
    parts.push(
      exam.kind === 'pyq' ? 'PYQ-Pattern Paper'
        : exam.scope === 'sectional' ? 'Sectional Mock'
        : 'CBT Mock'
    );
    return parts.join(' · ');
  }

  // Stable, non-PII candidate roll number derived from the device id (not the phone).
  function candidateRoll() {
    const seed = (window.repo && window.repo.deviceId && window.repo.deviceId()) || 'guest';
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return 'MC' + String(h % 1000000).padStart(6, '0');
  }

  // ---------- Catalogue categories ----------
  // Ordered category list for the home page, plus a catalogue-id → category map.
  // JamiaPrep groups programmes by academic level (same taxonomy as ssfjamia.in/pyq.html).
  // All 10 levels are declared; only levels that actually contain programmes render,
  // so new levels appear automatically once a programme is mapped into them.
  const CATEGORY_ORDER = [
    { id: 'ug',          label: 'Under Graduation' },
    { id: 'pg',          label: 'Post Graduation' },
    { id: 'school',      label: 'School' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'diploma',     label: 'Diploma' },
    { id: 'adv-diploma', label: 'Advance Diploma' },
    { id: 'pg-diploma',  label: 'PG Diploma' },
    { id: 'phd',         label: 'PhD' },
    { id: 'cdoe',        label: 'CDOE' },
    { id: 'rca',         label: 'RCA' },
  ];
  const CATEGORY_MAP = {
    'jmi-mba': 'pg',
    'jmi-ballb': 'ug',
    'jmi-mca': 'pg',
    'jmi-class9': 'school',
    'jmi-class11-science': 'school',
    'jmi-rca': 'rca',
    'jmi-phd': 'phd',
  };
  /* Previous (single-bucket) JMI categories:
  const CATEGORY_ORDER = [
    { id: 'jmi', label: 'JMI Entrance' },
  ];
  const CATEGORY_MAP = {
    'jmi-mba': 'jmi',
    'jmi-ballb': 'jmi',
  };
  */
  /* Original (multi-exam) categories:
  const CATEGORY_ORDER = [
    { id: 'ssc-railways', label: 'SSC & Railways' },
    { id: 'banking',      label: 'Banking & Insurance' },
    { id: 'engineering',  label: 'Engineering' },
    { id: 'medical',      label: 'Medical' },
    { id: 'management',   label: 'Management' },
    { id: 'civil',        label: 'Civil Services' },
    { id: 'school',       label: 'School & University' },
  ];
  const CATEGORY_MAP = {
    'ssc-cgl': 'ssc-railways', 'ssc-chsl': 'ssc-railways', 'rrb-ntpc': 'ssc-railways',
    'ibps-po': 'banking', 'sbi-po': 'banking',
    'jee-main': 'engineering', 'jee-advanced': 'engineering', 'gate': 'engineering',
    'neet-ug': 'medical',
    'cat': 'management',
    'upsc-cse': 'civil',
    'cuet-ug': 'school',
  };
  */
  function categoryOf(id) { return CATEGORY_MAP[id] || 'other'; }
  function categoryLabel(catId) {
    const c = CATEGORY_ORDER.find((x) => x.id === catId);
    return c ? c.label : 'Other exams';
  }

  // ---------- Persistent bottom nav (mobile) ----------
  // A single global element appended to <body>, kept in sync by the router.
  // Shown on browse-type screens; hidden during login / instructions / test / admin.
  function ensureBottomNav() {
    if (document.getElementById('bottom-nav')) return;
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.id = 'bottom-nav';
    nav.hidden = true;
    nav.innerHTML =
      '<a href="#/" data-nav="home"><span class="bottom-nav__icon" aria-hidden="true">&#8962;</span>Home</a>' +
      '<a href="#/my-tests" data-nav="mytests"><span class="bottom-nav__icon" aria-hidden="true">&#9776;</span>My Tests</a>' +
      '<a href="#/profile" data-nav="account"><span class="bottom-nav__icon" aria-hidden="true">&#9737;</span>Account</a>';
    document.body.appendChild(nav);
  }
  function updateBottomNav(parts) {
    ensureBottomNav();
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    const top = parts[0] || '';
    const hideOn = ['login', 'instructions', 'test', 'admin', 'reels', 'saved'];
    nav.hidden = hideOn.indexOf(top) !== -1;

    let active = 'home';
    if (top === 'my-tests') active = 'mytests';
    else if (top === 'profile') active = 'account';
    nav.querySelectorAll('[data-nav]').forEach((a) => {
      a.classList.toggle('is-active', a.dataset.nav === active);
    });

    // The third tab routes to the profile for onboarded users, else to login.
    const acct = nav.querySelector('[data-nav="account"]');
    if (acct) {
      const onboarded = window.repo && window.repo.hasOnboarded && window.repo.hasOnboarded();
      acct.setAttribute('href', onboarded ? '#/profile' : '#/login');
    }
  }

  // ---------- Persistent left sidebar ----------
  // Global element appended once to <body>; persistent on desktop, an off-canvas
  // drawer (slides from the left) on mobile. The router keeps it in sync. Hidden
  // on focused flows (login / instructions / running test / admin) just like the
  // bottom nav. Navigation lives here now, so the per-view topbar links are hidden
  // whenever the sidebar is active (see .has-sidebar in CSS).
  // '' = home: the landing page is a full-width marketing layout with its own
  // header/footer, so the app sidebar (and hamburger) stay out of it.
  const SIDEBAR_HIDE_ON = ['', 'login', 'instructions', 'test', 'admin', 'reels', 'saved'];

  function ensureSidebar() {
    if (document.getElementById('app-sidebar')) return;
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    aside.id = 'app-sidebar';
    aside.setAttribute('aria-label', 'Main navigation');
    aside.innerHTML =
      '<a class="sidebar__brand" href="#/" aria-label="JamiaPrep home">' +
        '<span class="sidebar__logo" aria-hidden="true"></span><span>JamiaPrep</span></a>' +
      '<nav class="sidebar__nav" aria-label="Primary">' +
        '<a class="sidebar__link" data-nav="home" href="#/"><span class="sidebar__ico" aria-hidden="true">&#8962;</span><span>Home</span></a>' +
        '<a class="sidebar__link" data-nav="mytests" href="#/my-tests"><span class="sidebar__ico" aria-hidden="true">&#9776;</span><span>My Tests</span></a>' +
        '<a class="sidebar__link user-only" data-nav="profile" href="#/profile"><span class="sidebar__ico" aria-hidden="true">&#9737;</span><span>Profile</span></a>' +
        '<a class="sidebar__link admin-only" data-nav="admin" href="#/admin"><span class="sidebar__ico" aria-hidden="true">&#9881;</span><span>Admin</span></a>' +
      '</nav>' +
      '<div class="sidebar__label">Featured exams</div>' +
      '<nav class="sidebar__nav" aria-label="Featured exams">' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-mba" href="#/exam/jmi-mba"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI MBA CET</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-ballb" href="#/exam/jmi-ballb"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI BA LLB</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-mca" href="#/exam/jmi-mca"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI MCA</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-class9" href="#/exam/jmi-class9"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI Class 9</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-class11-science" href="#/exam/jmi-class11-science"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI Class 11 Science</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-rca" href="#/exam/jmi-rca"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI RCA</span></a>' +
        '<a class="sidebar__link sidebar__link--exam" data-nav="exam:jmi-phd" href="#/exam/jmi-phd"><span class="sidebar__tag sidebar__tag--ssc" aria-hidden="true">JMI</span><span>JMI PhD</span></a>' +
      '</nav>' +
      '<div class="sidebar__foot">' +
        '<button class="sidebar__link theme-toggle" type="button" id="sidebar-theme"><span class="sidebar__ico" aria-hidden="true">&#9728;</span><span>Theme</span></button>' +
        '<a class="sidebar__link guest-only" data-nav="login" href="#/login"><span class="sidebar__ico" aria-hidden="true">&#8594;</span><span>Login</span></a>' +
        '<a class="sidebar__link user-only" href="#" id="sidebar-logout"><span class="sidebar__ico" aria-hidden="true">&#8617;</span><span>Logout</span></a>' +
      '</div>';
    document.body.appendChild(aside);

    const bd = document.createElement('div');
    bd.className = 'sidebar-backdrop';
    bd.id = 'sidebar-backdrop';
    bd.hidden = true;
    bd.addEventListener('click', closeSidebar);
    document.body.appendChild(bd);

    // Tapping any nav link closes the drawer on mobile.
    aside.addEventListener('click', (e) => {
      if (e.target.closest('a.sidebar__link')) closeSidebar();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    const logout = aside.querySelector('#sidebar-logout');
    if (logout) logout.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
      if (window.auth && window.auth.signOut) {
        window.auth.signOut();
      } else {
        if (window.repo) window.repo.clearUser();
        window.location.hash = '#/login';
      }
    });

    const themeBtn = aside.querySelector('#sidebar-theme');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  function openSidebar() { document.body.classList.add('sidebar-open'); }
  function closeSidebar() { document.body.classList.remove('sidebar-open'); }

  // Hamburger lives inside the current view's topbar (mobile only via CSS).
  // Called from mount() after each view is cloned in.
  function injectSidebarToggle() {
    const top = (window.location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean)[0] || '';
    if (SIDEBAR_HIDE_ON.indexOf(top) !== -1) return;
    const bar = document.querySelector('.topbar__inner');
    if (!bar || bar.querySelector('.hamburger')) return;
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.addEventListener('click', (e) => { e.stopPropagation(); openSidebar(); });
    bar.insertBefore(btn, bar.firstChild);
  }

  function updateSidebar(parts) {
    ensureSidebar();
    const top = parts[0] || '';
    const enabled = SIDEBAR_HIDE_ON.indexOf(top) === -1;
    document.documentElement.classList.toggle('has-sidebar', enabled);
    const aside = document.getElementById('app-sidebar');
    const bd = document.getElementById('sidebar-backdrop');
    if (aside) aside.hidden = !enabled;
    if (bd) bd.hidden = !enabled;
    if (!enabled) { closeSidebar(); return; }

    const user = window.repo ? window.repo.getUser() : null;
    const isAuthed = !!(user && user.name);
    const isAdmin = !!(window.repo && window.repo.isAdmin && window.repo.isAdmin());
    aside.querySelectorAll('.user-only').forEach((el) => { el.hidden = !isAuthed; });
    aside.querySelectorAll('.guest-only').forEach((el) => { el.hidden = isAuthed; });
    aside.querySelectorAll('.admin-only').forEach((el) => { el.hidden = !isAdmin; });

    let active = top === '' ? 'home' : '';
    if (top === 'my-tests') active = 'mytests';
    else if (top === 'profile') active = 'profile';
    else if (top === 'exam' && parts[1]) active = 'exam:' + parts[1];
    aside.querySelectorAll('[data-nav]').forEach((a) => {
      a.classList.toggle('is-active', a.dataset.nav === active);
    });

    updateThemeButtons();
  }

  // ---------- Theme (light / dark) ----------
  // Manual, opt-in dark mode (default light). Scoped entirely to [data-theme="dark"].
  const THEME_KEY = 'mockcbt:theme';
  function isDarkActive() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
  function applySavedTheme() {
    if (localStorage.getItem(THEME_KEY) === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }
  function toggleTheme() {
    const next = isDarkActive() ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    document.documentElement.setAttribute('data-theme', next);
    updateThemeButtons();
  }
  function updateThemeButtons() {
    const dark = isDarkActive();
    $$('.theme-toggle').forEach((b) => {
      b.textContent = dark ? '☀ Light' : '☾ Dark';
      b.setAttribute('aria-pressed', String(dark));
    });
  }
  // Inject a theme toggle into a topbar nav (idempotent per render).
  function addThemeToggle(nav) {
    if (!nav || nav.querySelector('.theme-toggle')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'topbar__link theme-toggle';
    b.setAttribute('aria-label', 'Toggle dark mode');
    b.addEventListener('click', toggleTheme);
    nav.appendChild(b);
    updateThemeButtons();
  }

  // ---------- Router ----------
  function route() {
    const hash = window.location.hash || '#/';
    const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);

    applySavedTheme();
    updateBottomNav(parts);
    updateSidebar(parts);

    if (parts.length === 0) {
      // No browse-time gate: exploring the catalogue is fully open. Login is
      // requested only at the moment of attempting a paper (see paperAccess).
      return renderHome();
    }
    if (parts[0] === 'login') return renderLogin();
    if (parts[0] === 'profile') return renderProfile();
    if (parts[0] === 'my-tests') return renderMyTests();
    if (parts[0] === 'exam' && parts[1]) {
      const quadrant = parts[2] || null; // 'pyq-full' | 'pyq-sectional' | 'mock-full' | 'mock-sectional' | null
      const group = parts[3] || null;    // optional discipline slug within a quadrant (e.g. PhD → 'social-sciences')
      return renderExamDashboard(parts[1], quadrant, group);
    }
    if (parts[0] === 'instructions' && parts[1]) return renderInstructions(parts[1]);
    if (parts[0] === 'test' && parts[1]) return renderTest(parts[1]);
    if (parts[0] === 'result') return renderResult();
    if (parts[0] === 'reels') return renderReels();
    if (parts[0] === 'saved') return renderSaved();
    if (parts[0] === 'admin') {
      if (!window.admin) return renderHome();
      if (parts.length === 1) return window.admin.renderAdminHome();
      if (parts[1] === 'exam' && parts[2] && parts[3] === 'section' && parts[4]) {
        return window.admin.renderAdminSection(parts[2], parts[4]);
      }
      if (parts[1] === 'exam' && parts[2]) return window.admin.renderAdminExam(parts[2]);
      if (parts[1] === 'question' && parts[2] && parts[3] && parts[4]) {
        return window.admin.renderAdminQuestion(parts[2], parts[3], parts[4]);
      }
      return window.admin.renderAdminHome();
    }
    return renderHome();
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('DOMContentLoaded', route);

  // ---------- Home ----------
  function renderHome() {
    stopTimer();
    mount('view-home');

    // Show "Admin" link only when in admin role.
    const adminLink = document.querySelector('.admin-only');
    if (adminLink) adminLink.hidden = !(window.repo && window.repo.isAdmin());

    // Auth-aware nav + greeting card.
    const user = window.repo ? window.repo.getUser() : null;
    const isAuthed = !!(user && user.name);
    $$('.user-only').forEach((el) => { el.hidden = !isAuthed; });
    $$('.guest-only').forEach((el) => { el.hidden = isAuthed; });

    const greet = $('#greeting-card');
    if (greet && isAuthed) {
      const firstName = String(user.name).trim().split(/\s+/)[0] || user.name;
      const targetLabels = (user.targetExams || []).map(exLabel).filter(Boolean);
      greet.hidden = false;
      greet.querySelector('.greeting-card__hello').textContent = 'Hi ' + firstName + ' \u{1F44B}';
      greet.querySelector('.greeting-card__exams').textContent =
        targetLabels.length
          ? 'Preparing for: ' + targetLabels.join(', ')
          : 'Pick a target exam from your profile to get tailored recommendations.';
    }

    const logout = $('#nav-logout');
    if (logout) logout.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.auth && window.auth.signOut) {
        window.auth.signOut();
      } else {
        if (window.repo) window.repo.clearUser();
        window.location.hash = '#/login';
      }
    });

    addThemeToggle($('.topbar__nav'));
    if (window.daily && window.daily.mount) window.daily.mount();

    // Pinned (target exams) keep their own section at the top.
    const catalogue = (window.repo && window.repo.listCatalogue()) || [];
    const pinnedIds = new Set((user && user.targetExams) ? user.targetExams : []);
    const pinned = catalogue.filter((c) => pinnedIds.has(c.id));

    const pinnedSection = $('#pinned-section');
    const pinnedList = $('#pinned-list');
    if (pinned.length > 0) {
      pinnedSection.hidden = false;
      pinned.forEach((entry) => pinnedList.appendChild(buildCatalogueCard(entry, true)));
    }

    // Featured exams — JMI MBA CET, SSC CGL & NEET UG get prime placement.
    const featuredList = $('#featured-list');
    if (featuredList) {
      FEATURED_EXAM_IDS.forEach((id) => {
        const entry = catalogue.find((c) => c.id === id);
        if (entry) featuredList.appendChild(buildFeaturedCard(entry));
      });
    }

    // Category + search controls drive the "Explore exams" grid.
    setupCatalogueExplorer(catalogue);

    initLanding(catalogue);
  }

  // ---------- Landing page extras ----------
  // Smooth in-page scrolling (without disturbing the hash router), live archive
  // stats in the hero band, and a solid header once the hero is scrolled past.
  function initLanding(catalogue) {
    // In-page anchors: navigating to "#lp-papers" would be swallowed by the hash
    // router and re-render the view, so intercept and scroll instead.
    $$('[data-scroll]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = (a.getAttribute('href') || '').replace('#', '');
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Archive stats — counted live from the registered papers so they never lie.
    try {
      const ids = new Set(catalogue.map((c) => c.id));
      let papers = 0;
      catalogue.forEach((c) => { papers += window.repo.catalogueCounts(c.id).total; });
      let questions = 0;
      window.repo.listPublishedExams().forEach((t) => {
        if (!ids.has(t.examCatalogueId)) return;
        (t.sections || []).forEach((s) => { questions += (s.questions || []).length; });
      });
      const fmt = (n) => n.toLocaleString('en-IN');
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      set('lp-stat-papers', fmt(papers));
      set('lp-stat-questions', fmt(questions) + '+');
      set('lp-stat-programmes', fmt(catalogue.length));
    } catch (e) { /* stats are decorative — never block the page */ }

    const yr = document.getElementById('lp-year');
    if (yr) yr.textContent = String(new Date().getFullYear());

    // Header turns solid after the hero; bound once, no-ops off the landing page.
    if (!window.__lpScrollBound) {
      window.__lpScrollBound = true;
      window.addEventListener('scroll', () => {
        const head = document.getElementById('lp-header');
        if (head) head.classList.toggle('is-scrolled', window.scrollY > 24);
      }, { passive: true });
    }
    const head = document.getElementById('lp-header');
    if (head) head.classList.toggle('is-scrolled', window.scrollY > 24);

    wireContactForm();
  }

  // ---------- Contact / feedback form ----------
  // Where messages go. The form first tries to persist to the Supabase
  // "feedback" table (run supabase/schema.sql so it exists + accepts public
  // inserts); if that table/network is unavailable it falls back to saving the
  // message locally AND opening the visitor's email client pre-filled, so a
  // message is never silently lost. Change this address to your real inbox.
  const CONTACT_EMAIL = 'Jamiaprep.contact@gmail.com';

  function wireContactForm() {
    const form = $('#contact-form');
    if (!form || form.dataset.wired) return;
    form.dataset.wired = '1';

    // Keep the visible email + its mailto in sync with CONTACT_EMAIL.
    const emailLink = $('#lp-contact-email');
    if (emailLink) { emailLink.textContent = CONTACT_EMAIL; emailLink.href = 'mailto:' + CONTACT_EMAIL; }

    const topicWrap = $('#cf-topic');
    let topic = 'Feedback';
    if (topicWrap) {
      topicWrap.querySelectorAll('.lp-segment__opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          topic = btn.dataset.topic || 'Feedback';
          topicWrap.querySelectorAll('.lp-segment__opt').forEach((b) => {
            const on = b === btn;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
        });
      });
    }

    const message = $('#cf-message');
    const count = $('#cf-count');
    if (message && count) {
      const sync = () => { count.textContent = String(message.value.length); };
      message.addEventListener('input', sync);
      sync();
    }

    const errBox = $('#cf-error');
    const showError = (msg, field) => {
      if (errBox) { errBox.textContent = msg; errBox.hidden = false; }
      if (field) { field.classList.add('is-invalid'); field.focus(); }
    };
    const clearError = () => {
      if (errBox) errBox.hidden = true;
      ['#cf-name', '#cf-email', '#cf-message'].forEach((s) => { const el = $(s); if (el) el.classList.remove('is-invalid'); });
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearError();

      const name = $('#cf-name').value.trim();
      const email = $('#cf-email').value.trim();
      const body = message.value.trim();

      if (body.length < 5) return showError('Please write a short message so we know how to help.', message);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showError('That email doesn’t look right — please check it (or leave it blank).', $('#cf-email'));
      }

      const payload = {
        name: name.slice(0, 80) || null,
        email: email.slice(0, 120) || null,
        topic: topic,
        message: body.slice(0, 2000),
        page: location.href.slice(0, 300),
      };

      const submitBtn = $('#cf-submit');
      const original = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.setAttribute('aria-busy', 'true'); submitBtn.textContent = 'Sending…'; }

      let saved = false;
      try {
        if (window.sb && window.sb.from) {
          const { error } = await window.sb.from('feedback').insert(payload);
          if (!error) saved = true;
          else console.warn('[contact] supabase insert failed, falling back:', error.message);
        }
      } catch (err) {
        console.warn('[contact] supabase insert threw, falling back:', err);
      }

      // Always keep a local copy so nothing is lost even if the network/table is down.
      try {
        const key = 'jp_feedback_outbox';
        const outbox = JSON.parse(localStorage.getItem(key) || '[]');
        outbox.push(Object.assign({ ts: Date.now(), synced: saved }, payload));
        localStorage.setItem(key, JSON.stringify(outbox.slice(-50)));
      } catch (e) { /* storage full / disabled — non-fatal */ }

      // If it didn't reach the server, open the visitor's mail client pre-filled.
      if (!saved) {
        const subject = encodeURIComponent('[JamiaPrep] ' + topic);
        const lines = [
          body, '', '— — —',
          name ? 'From: ' + name : '',
          email ? 'Reply to: ' + email : '',
        ].filter(Boolean).join('\n');
        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + encodeURIComponent(lines);
      }

      if (submitBtn) { submitBtn.removeAttribute('aria-busy'); submitBtn.textContent = original; }

      const doneMsg = $('#contact-done-msg');
      if (doneMsg) {
        doneMsg.textContent = saved
          ? 'We’ve received it and will reply' + (email ? ' to ' + email : ' soon') + '. Thank you for helping make JamiaPrep better.'
          : 'We’ve opened your email app with the message ready — just hit send and it’ll reach us.';
      }
      form.hidden = true;
      const done = $('#contact-done');
      if (done) done.hidden = false;
    });

    const again = $('#cf-again');
    if (again) again.addEventListener('click', () => {
      form.reset();
      if (count) count.textContent = '0';
      clearError();
      const done = $('#contact-done');
      if (done) done.hidden = true;
      form.hidden = false;
      $('#cf-name').focus();
    });
  }

  // Exams given prime placement in the home-screen featured band, in order.
  const FEATURED_EXAM_IDS = ['jmi-mba', 'jmi-ballb', 'jmi-mca', 'jmi-class9', 'jmi-class11-science', 'jmi-rca', 'jmi-phd']; // JamiaPrep: JMI-only. Was ['jmi-mba','ssc-cgl','neet-ug'].
  const FEATURED_BADGE = { 'jmi-mba': 'JMI', 'jmi-ballb': 'JMI', 'jmi-mca': 'JMI', 'jmi-class9': 'JMI', 'jmi-class11-science': 'JMI', 'jmi-rca': 'JMI', 'jmi-phd': 'JMI', 'ssc-cgl': 'SSC', 'neet-ug': 'NEET' };

  function buildFeaturedCard(entry) {
    const counts = window.repo.catalogueCounts(entry.id);
    const card = document.createElement('a');
    card.className = 'featured-card featured-card--' + entry.id;
    card.href = '#/exam/' + entry.id;

    const badge = FEATURED_BADGE[entry.id] ||
      entry.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

    card.innerHTML =
      '<div class="featured-card__top">' +
        '<span class="featured-card__badge">' + badge + '</span>' +
        '<div class="featured-card__title">' +
          '<div class="featured-card__name"></div>' +
          '<div class="featured-card__tag"></div>' +
        '</div>' +
      '</div>' +
      // JamiaPrep focus: only previous-year papers are live, so show a single
      // honest count instead of the old Full-length/Sectional/Total mocks split.
      '<div class="featured-card__stats">' +
        '<span class="featured-stat"><b>' + counts.pyqFull + '</b> Previous year paper' + (counts.pyqFull === 1 ? '' : 's') + '</span>' +
      '</div>' +
      '<span class="featured-card__cta">Explore papers &rarr;</span>';
    card.querySelector('.featured-card__name').textContent = entry.name;
    card.querySelector('.featured-card__tag').textContent = entry.tagline;
    return card;
  }

  // Renders category chips + search and (re)renders the grouped/filtered catalogue.
  function setupCatalogueExplorer(catalogue) {
    const host = $('#catalogue-list');
    const searchInput = $('#exam-search');
    const chipsWrap = $('#cat-chips');
    if (!host) return;

    const filter = { query: '', category: 'all' };

    // Build chips: "All" + only the categories that actually have exams.
    const presentCats = CATEGORY_ORDER.filter((c) =>
      catalogue.some((e) => categoryOf(e.id) === c.id));
    const chipDefs = [{ id: 'all', label: 'All levels' }].concat(presentCats);
    if (chipsWrap) {
      chipsWrap.innerHTML = '';
      chipDefs.forEach((c) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip' + (c.id === 'all' ? ' is-selected' : '');
        chip.textContent = c.label;
        chip.dataset.cat = c.id;
        chip.addEventListener('click', () => {
          filter.category = c.id;
          $$('.chip', chipsWrap).forEach((b) => b.classList.toggle('is-selected', b === chip));
          renderGroups();
        });
        chipsWrap.appendChild(chip);
      });
    }

    // When searching, collapse the featured / pinned bands so results are the
    // sole focus; restore them when the query is cleared.
    const featuredSection = $('#featured-section');
    const pinnedSection = $('#pinned-section');
    const hadPinned = pinnedSection && !pinnedSection.hidden;
    const exploreHeading = $$('.section-heading').find((h) => /Browse by level/i.test(h.textContent));
    function toggleBands(searching) {
      if (featuredSection) featuredSection.hidden = searching;
      if (pinnedSection) pinnedSection.hidden = searching ? true : !hadPinned;
      if (exploreHeading) exploreHeading.textContent = searching ? 'Search results' : 'Browse by level';
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        filter.query = searchInput.value || '';
        toggleBands(!!filter.query.trim());
        renderGroups();
      });
    }

    function matches(e) {
      if (filter.category !== 'all' && categoryOf(e.id) !== filter.category) return false;
      const q = filter.query.trim().toLowerCase();
      if (q && (e.name + ' ' + (e.tagline || '')).toLowerCase().indexOf(q) === -1) return false;
      return true;
    }

    function renderGroups() {
      host.innerHTML = '';
      const found = catalogue.filter(matches);
      if (found.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'catalogue-empty';
        empty.textContent = 'No exams match “' + filter.query + '”. Try a different search.';
        host.appendChild(empty);
        return;
      }
      const q = filter.query.trim();
      // Grouped-by-category only in the default view; a search or specific
      // category collapses to a single flat grid of results.
      if (filter.category === 'all' && !q) {
        CATEGORY_ORDER.forEach((c) => {
          const items = found.filter((e) => categoryOf(e.id) === c.id);
          if (!items.length) return;
          const sec = document.createElement('section');
          sec.className = 'cat-section';

          // Level header: name + "N programmes · M papers" count line.
          let paperCount = 0;
          items.forEach((e) => {
            const counts = window.repo.catalogueCounts(e.id);
            paperCount += (counts.pyqFull || 0);
          });
          const head = document.createElement('div');
          head.className = 'cat-section__head';
          const h = document.createElement('h3');
          h.className = 'cat-section__title';
          h.textContent = c.label;
          head.appendChild(h);
          const meta = document.createElement('span');
          meta.className = 'cat-section__meta';
          meta.textContent =
            items.length + (items.length === 1 ? ' programme' : ' programmes') +
            ' · ' + paperCount + (paperCount === 1 ? ' paper' : ' papers');
          head.appendChild(meta);
          sec.appendChild(head);

          const grid = document.createElement('div');
          grid.className = 'catalogue-grid';
          items.forEach((e) => grid.appendChild(buildCatalogueCard(e, false)));
          sec.appendChild(grid);
          host.appendChild(sec);
        });
      } else {
        const grid = document.createElement('div');
        grid.className = 'catalogue-grid';
        found.forEach((e) => grid.appendChild(buildCatalogueCard(e, false)));
        host.appendChild(grid);
      }
    }

    renderGroups();
  }

  // ---------- Practice Reels ----------
  function renderReels() {
    stopTimer();
    mount('view-reels');
    if (window.reels && window.reels.mount) window.reels.mount();
  }

  // ---------- Saved questions shelf ----------
  function renderSaved() {
    stopTimer();
    mount('view-saved');
    if (window.reels && window.reels.mountSaved) window.reels.mountSaved();
  }

  // ---------- My Tests (attempt history) ----------
  function renderMyTests() {
    stopTimer();
    mount('view-mytests');

    const user = window.repo ? window.repo.getUser() : null;
    const isAuthed = !!(user && user.name);
    $$('.user-only').forEach((el) => { el.hidden = !isAuthed; });
    $$('.guest-only').forEach((el) => { el.hidden = isAuthed; });
    addThemeToggle($('.topbar__nav'));

    const inProgress = (window.repo && window.repo.listAttempts) ? window.repo.listAttempts() : [];
    const completed = (window.repo && window.repo.listResults) ? window.repo.listResults() : [];

    // ---- In-progress ----
    const ipSection = $('#mt-inprogress');
    const ipList = $('#mt-inprogress-list');
    if (inProgress.length && ipSection && ipList) {
      ipSection.hidden = false;
      inProgress.forEach((att) => {
        const exam = findExam(att.examId);
        if (!exam) return;
        const total = (att.qs || []).length;
        const answered = (att.qs || []).filter((q) =>
          q.status === 'answered' || q.status === 'answered-marked').length;
        const card = document.createElement('div');
        card.className = 'mt-card mt-card--progress';
        card.innerHTML =
          '<div class="mt-card__body">' +
            '<div class="mt-card__name"></div>' +
            '<div class="mt-card__meta">' +
              '<span class="mt-pill mt-pill--live">In progress</span>' +
              '<span>' + answered + ' / ' + total + ' answered</span>' +
              '<span>' + formatMMSS(att.remainingSec || 0) + ' left</span>' +
            '</div>' +
          '</div>' +
          '<div class="mt-card__actions"></div>';
        card.querySelector('.mt-card__name').textContent = exam.name;
        const resume = document.createElement('a');
        resume.className = 'btn btn--primary btn--xs';
        resume.href = '#/test/' + att.examId;
        resume.textContent = 'Resume';
        card.querySelector('.mt-card__actions').appendChild(resume);
        ipList.appendChild(card);
      });
    }

    // ---- Completed ----
    const compList = $('#mt-completed-list');
    if (!compList) return;
    if (!completed.length) {
      compList.innerHTML =
        '<div class="catalogue-empty">No completed attempts yet. ' +
        '<a href="#/">Pick a mock</a> and your results will show up here.</div>';
      return;
    }
    completed.forEach((r) => {
      const acc = (typeof r.accuracy === 'number') ? r.accuracy.toFixed(0) + '%' : '—';
      const scoreCls = r.score > 0 ? 'positive' : (r.score < 0 ? 'negative' : '');
      const card = document.createElement('div');
      card.className = 'mt-card';
      card.innerHTML =
        '<div class="mt-card__body">' +
          '<div class="mt-card__name"></div>' +
          '<div class="mt-card__meta">' +
            '<span class="mt-score ' + scoreCls + '">' + (r.score != null ? r.score.toFixed(2) : '—') +
              ' / ' + (r.maxScore != null ? r.maxScore : '—') + '</span>' +
            '<span>' + (r.correct || 0) + '/' + (r.totalQ || 0) + ' correct</span>' +
            '<span>' + acc + ' accuracy</span>' +
            '<span class="mt-date">' + formatAttemptDate(r.finishedAt) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="mt-card__actions"></div>';
      card.querySelector('.mt-card__name').textContent = r.examName || 'Mock test';

      const actions = card.querySelector('.mt-card__actions');
      const review = document.createElement('button');
      review.type = 'button';
      review.className = 'btn btn--xs';
      review.textContent = 'Review';
      review.addEventListener('click', () => {
        try { sessionStorage.setItem('mockcbt:last-result', JSON.stringify(r)); } catch (e) {}
        window.location.hash = '#/result';
      });
      actions.appendChild(review);

      if (r.examId && findExam(r.examId)) {
        const retake = document.createElement('a');
        retake.className = 'btn btn--xs btn--tonal';
        retake.href = '#/instructions/' + r.examId;
        retake.textContent = 'Retake';
        actions.appendChild(retake);
      }
      compList.appendChild(card);
    });
  }

  function formatAttemptDate(ts) {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return ''; }
  }

  function buildCatalogueCard(entry, isPinned) {
    const counts = window.repo.catalogueCounts(entry.id);
    const card = document.createElement('a');
    card.className = 'catalogue-card' + (isPinned ? ' catalogue-card--pinned' : '');
    card.href = '#/exam/' + entry.id;

    const head = document.createElement('div');
    head.className = 'catalogue-card__head';
    const badge = document.createElement('div');
    badge.className = 'catalogue-card__badge';
    badge.textContent = entry.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    const titleWrap = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'catalogue-card__name';
    title.textContent = entry.name;
    const tag = document.createElement('div');
    tag.className = 'catalogue-card__tag';
    tag.textContent = entry.tagline;
    titleWrap.appendChild(title);
    titleWrap.appendChild(tag);
    head.appendChild(badge);
    head.appendChild(titleWrap);
    card.appendChild(head);

    const stats = document.createElement('div');
    stats.className = 'catalogue-card__stats';
    stats.appendChild(buildStat('PYQs', counts.pyqFull + counts.pyqSectional));
    stats.appendChild(buildStat('Mocks', counts.mockFull + counts.mockSectional + counts.mockShort));
    stats.appendChild(buildStat('Total', counts.total));
    card.appendChild(stats);

    if (isPinned) {
      const pin = document.createElement('span');
      pin.className = 'catalogue-card__pin';
      pin.textContent = '★ Target exam';
      card.appendChild(pin);
    }

    return card;
  }
  function buildStat(label, value) {
    const wrap = document.createElement('div');
    wrap.className = 'catalogue-stat';
    const v = document.createElement('div');
    v.className = 'catalogue-stat__value';
    v.textContent = value;
    const l = document.createElement('div');
    l.className = 'catalogue-stat__label';
    l.textContent = label;
    wrap.appendChild(v);
    wrap.appendChild(l);
    return wrap;
  }

  // ---------- Exam Dashboard ----------
  const QUADRANT_DEFS = [
    { key: 'mock-full',      kind: 'mock', scope: 'full',       title: 'Full-Length Mocks',     blurb: 'Original full mocks built to the latest pattern.',            countKey: 'mockFull',     accent: '#1f7a3a' },
    { key: 'mock-sectional', kind: 'mock', scope: 'sectional',  title: 'Sectional Mocks',       blurb: 'Topic-focused practice tests by section.',                    countKey: 'mockSectional',accent: '#d39a00' },
    { key: 'mock-short',     kind: 'mock', scope: 'short',      title: 'Short Mocks',           blurb: 'Quick 20 & 25-question mixed mocks for a fast practice run.',  countKey: 'mockShort',    accent: '#0d9488' },
    { key: 'pyq-full',       kind: 'pyq',  scope: 'full',       title: 'Previous Year Papers',  blurb: 'Full-length papers from past attempts.',                       countKey: 'pyqFull',      accent: '#0b3d7a' },
    { key: 'pyq-sectional',  kind: 'pyq',  scope: 'sectional',  title: 'PYQ Sectionals',        blurb: 'Section-wise PYQ practice (Quant, Reasoning, English, ...).', countKey: 'pyqSectional', accent: '#8a4baf' },
  ];

  // JamiaPrep focus: only previous-year papers are live right now. The other
  // quadrants (full-length mocks, sectional mocks, short mocks, PYQ sectionals)
  // are kept in QUADRANT_DEFS but hidden from the exam dashboard until we upload
  // that content. To re-enable a section later, add its key back to this list.
  const VISIBLE_QUADRANT_KEYS = ['pyq-full'];

  // Slug a discipline name into a URL-safe key, e.g. "Humanities & Languages" → "humanities-languages".
  function disciplineSlug(name) {
    return String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function renderExamDashboard(catalogueId, quadrantKey, groupKey) {
    stopTimer();
    const entry = window.repo && window.repo.getCatalogueEntry(catalogueId);
    if (!entry) { window.location.hash = '#/'; return; }
    mount('view-exam-dashboard');

    $('#exam-hero-name').textContent = entry.name;
    $('#exam-hero-tag').textContent = entry.tagline;

    // Only honor a quadrant route if that section is currently live; otherwise
    // fall back to the selectors view (avoids dead-ending on a hidden section).
    const def = quadrantKey && VISIBLE_QUADRANT_KEYS.includes(quadrantKey)
      ? QUADRANT_DEFS.find((d) => d.key === quadrantKey)
      : null;

    // Context-aware back button: from a paper list, go back to the exam's selectors;
    // from the selectors, go back to all exams.
    const back = $('#exam-back');
    const backLabel = $('#exam-back-label');
    if (def) {
      back.setAttribute('href', '#/exam/' + catalogueId);
      backLabel.textContent = 'Back';
    } else {
      back.setAttribute('href', '#/');
      backLabel.textContent = 'All Exams';
    }

    // Exam tabs (papers + on-demand exam info) live on the main exam page only.
    if (!def) renderExamTabs(entry);

    const counts = window.repo.catalogueCounts(catalogueId);
    const grid = $('#quadrant-grid');

    if (def) {
      const allTests = window.repo.listTestsForCatalogue(catalogueId, { kind: def.kind, scope: def.scope });

      // Some tracks (e.g. JMI PhD) bundle papers from several disciplines under a
      // single quadrant. When any paper carries a `discipline`, insert a chooser
      // layer: first pick a discipline, then see that discipline's papers by year.
      const hasDisciplines = allTests.some((t) => t.discipline);

      if (hasDisciplines && !groupKey) {
        // ---- Discipline chooser (reuses the quadrant-card grid) ----
        const groups = {};
        allTests.forEach((t) => {
          const d = t.discipline || 'Other';
          (groups[d] = groups[d] || []).push(t);
        });
        const ordered = Object.keys(groups).sort(
          (a, b) => groups[b].length - groups[a].length || a.localeCompare(b)
        );

        $('#paper-list-section').hidden = true;
        grid.hidden = false;
        ordered.forEach((d) => {
          const n = groups[d].length;
          const card = document.createElement('a');
          card.className = 'quadrant-card';
          card.style.borderTopColor = def.accent;
          card.href = '#/exam/' + catalogueId + '/' + def.key + '/' + disciplineSlug(d);
          card.innerHTML =
            '<div class="quadrant-card__count"></div>' +
            '<div class="quadrant-card__title"></div>' +
            '<div class="quadrant-card__blurb"></div>';
          card.querySelector('.quadrant-card__count').textContent = n;
          card.querySelector('.quadrant-card__title').textContent = d;
          card.querySelector('.quadrant-card__blurb').textContent =
            n + ' paper' + (n === 1 ? '' : 's') + ' by year';
          grid.appendChild(card);
        });
        return;
      }

      // ---- Paper list as its own page (quadrant selectors hidden) ----
      grid.hidden = true;
      let tests = allTests;
      let groupName = null;
      if (hasDisciplines && groupKey) {
        // Filter to the chosen discipline; back goes to the discipline chooser.
        const match = allTests.find((t) => disciplineSlug(t.discipline) === groupKey);
        groupName = match ? match.discipline : null;
        tests = allTests.filter((t) => disciplineSlug(t.discipline) === groupKey);
        back.setAttribute('href', '#/exam/' + catalogueId + '/' + def.key);
        backLabel.textContent = 'Back';
      }

      const section = $('#paper-list-section');
      section.hidden = false;
      $('#paper-list-title').textContent = groupName ? (groupName + ' — ' + def.title) : def.title;
      $('#paper-list-meta').textContent = tests.length + ' paper' + (tests.length === 1 ? '' : 's');

      const list = $('#paper-list');
      if (tests.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'paper-empty';
        empty.innerHTML =
          '<div class="paper-empty__title">Coming soon</div>' +
          '<div class="paper-empty__sub">We’re adding ' + def.title.toLowerCase() +
          ' for ' + escape(entry.name) + '. Check back shortly — new papers drop regularly.</div>';
        list.appendChild(empty);
        return;
      }
      tests.forEach((t) => list.appendChild(buildPaperCard(t, def)));
      return;
    }

    // ---- Selectors view: only the live sections (previous-year papers) ----
    QUADRANT_DEFS.filter((qd) => VISIBLE_QUADRANT_KEYS.includes(qd.key)).forEach((qd) => {
      const count = counts[qd.countKey] || 0;
      const isEmpty = count === 0;
      // Zero-count quadrants are NOT links — tapping them used to dead-end on an
      // empty page. They render as a muted "coming soon" tile instead.
      const card = document.createElement(isEmpty ? 'div' : 'a');
      card.className = 'quadrant-card' + (isEmpty ? ' quadrant-card--empty' : '');
      card.style.borderTopColor = qd.accent;
      if (!isEmpty) card.href = '#/exam/' + catalogueId + '/' + qd.key;
      card.innerHTML =
        '<div class="quadrant-card__count"></div>' +
        '<div class="quadrant-card__title"></div>' +
        '<div class="quadrant-card__blurb"></div>';
      card.querySelector('.quadrant-card__count').textContent = isEmpty ? '—' : count;
      card.querySelector('.quadrant-card__title').textContent = qd.title;
      card.querySelector('.quadrant-card__blurb').textContent = isEmpty ? 'Coming soon' : qd.blurb;
      grid.appendChild(card);
    });
  }

  // ---------- Exam page tabs (Question Papers + on-demand exam info) ----------
  // Papers are the default view; Important Dates / Syllabus / Exam Pattern /
  // Eligibility / How to Apply render inline ONLY when the student taps that
  // tab. Driven entirely by the catalogue entry's `info`, so any new exam gets
  // these sections by filling in its data.
  function renderExamTabs(entry) {
    const bar = $('#exam-tabs');
    const panelWrap = $('#exam-tab-panel');
    const grid = $('#quadrant-grid');
    if (!bar || !panelWrap || !grid) return;

    const info = entry.info;
    if (!info) return; // no info data — papers only, no tab bar needed

    const tabs = [{ key: 'papers', label: 'Question Papers', build: null }];
    if (info.dates) tabs.push({ key: 'dates', label: 'Important Dates', build: () => buildDatesPanel(info) });
    tabs.push(
      { key: 'syllabus',    label: 'Syllabus',     build: () => buildSyllabusPanel(info, entry) },
      { key: 'pattern',     label: 'Exam Pattern', build: () => buildPatternPanel(info, entry) },
      { key: 'eligibility', label: 'Eligibility',  build: () => buildEligibilityPanel(info) }
    );
    if (info.application) tabs.push({ key: 'apply', label: 'How to Apply', build: () => buildApplyPanel(info) });

    bar.innerHTML = '';
    const built = {}; // panels are built lazily, once, on first visit
    tabs.forEach((t, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'exam-tab' + (i === 0 ? ' is-active' : '');
      btn.textContent = t.label;
      btn.setAttribute('role', 'tab');
      btn.dataset.tab = t.key;
      btn.addEventListener('click', () => activate(t));
      bar.appendChild(btn);
    });

    function activate(t) {
      $$('.exam-tab', bar).forEach((b) => b.classList.toggle('is-active', b.dataset.tab === t.key));
      if (t.key === 'papers') {
        panelWrap.hidden = true;
        grid.hidden = false;
        return;
      }
      if (!built[t.key]) built[t.key] = t.build();
      panelWrap.innerHTML = '';
      panelWrap.appendChild(built[t.key]);
      panelWrap.hidden = false;
      grid.hidden = true;
    }

    bar.hidden = false;
    panelWrap.hidden = true;
  }

  function buildPatternPanel(info, entry) {
    const p = info.pattern || {};
    const panel = document.createElement('div');
    const secs = Array.isArray(p.sections) ? p.sections : [];

    if (secs.length) panel.appendChild(buildPatternTable(p, entry));

    if (p.footnote) {
      const fn = document.createElement('p');
      fn.className = 'pattern-footnote';
      fn.textContent = p.footnote;
      panel.appendChild(fn);
    }

    // Supplementary details below the table.
    const detailRows = [
      ['Exam type', p.type],
      ['Mode', p.mode],
      ['Languages', p.languages],
      ['Marking scheme', p.marking],
    ].filter((r) => r[1]);
    if (detailRows.length) {
      const h = document.createElement('h3');
      h.className = 'pattern-details__title';
      h.textContent = 'Other details';
      panel.appendChild(h);
      const dl = document.createElement('dl');
      dl.className = 'info-spec';
      detailRows.forEach(([k, v]) => {
        const dt = document.createElement('dt');
        dt.textContent = k;
        const dd = document.createElement('dd');
        dd.textContent = v;
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
      panel.appendChild(dl);
    }

    panel.appendChild(buildInfoNote());
    return panel;
  }

  function buildPatternTable(p, entry) {
    const secs = p.sections;
    const perDur = secs.some((s) => s.durationMin != null);
    const fmt = (v) => (v == null ? '—' : String(v));
    const sumOf = (key, fallback) => {
      if (secs.every((s) => typeof s[key] === 'number')) {
        return String(secs.reduce((n, s) => n + s[key], 0));
      }
      return fallback != null ? String(fallback) : '—';
    };
    const cell = (tag, text, cls) => {
      const el = document.createElement(tag);
      el.textContent = text;
      if (cls) el.className = cls;
      return el;
    };

    const wrap = document.createElement('div');
    wrap.className = 'pattern-table-wrap';
    const table = document.createElement('table');
    table.className = 'pattern-table';

    const caption = document.createElement('caption');
    caption.textContent = p.title || ((entry && entry.name ? entry.name + ' ' : '') + 'Exam Pattern');
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const htr = document.createElement('tr');
    ['Sections', 'Number of Questions', 'Total Marks', 'Duration'].forEach((h, i) => {
      htr.appendChild(cell('th', h, i === 0 ? 'pattern-col-sec' : 'pattern-col-num'));
    });
    thead.appendChild(htr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const overallDuration = p.durationText || (p.durationMin != null ? p.durationMin + ' minutes' : '—');

    secs.forEach((s, i) => {
      const tr = document.createElement('tr');
      tr.appendChild(cell('td', s.name, 'pattern-col-sec'));
      tr.appendChild(cell('td', fmt(s.questions), 'pattern-col-num'));
      tr.appendChild(cell('td', fmt(s.marks), 'pattern-col-num'));
      if (perDur) {
        tr.appendChild(cell('td', s.durationMin != null ? s.durationMin + ' min' : '—', 'pattern-col-num'));
      } else if (i === 0) {
        const d = cell('td', overallDuration, 'pattern-col-num pattern-duration-merged');
        d.rowSpan = secs.length + (p.noTotal ? 0 : 1);
        tr.appendChild(d);
      }
      tbody.appendChild(tr);
    });

    if (!p.noTotal) {
      const tr = document.createElement('tr');
      tr.className = 'pattern-total-row';
      tr.appendChild(cell('td', 'Total', 'pattern-col-sec'));
      tr.appendChild(cell('td', sumOf('questions', p.totalQuestions), 'pattern-col-num'));
      tr.appendChild(cell('td', sumOf('marks', p.totalMarks), 'pattern-col-num'));
      if (perDur) {
        tr.appendChild(cell('td', p.durationMin != null ? p.durationMin + ' min' : overallDuration, 'pattern-col-num'));
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function buildEligibilityPanel(info) {
    const panel = document.createElement('div');
    const items = info.eligibility || [];
    if (items.length === 0) {
      panel.appendChild(buildInfoEmpty('Eligibility details will be added soon.'));
      return panel;
    }
    const ul = document.createElement('ul');
    ul.className = 'info-list';
    items.forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    panel.appendChild(buildInfoNote());
    return panel;
  }

  function buildSyllabusPanel(info, entry) {
    const panel = document.createElement('div');
    const groups = (info.syllabus && info.syllabus.length)
      ? info.syllabus
      : (entry.sections || []).map((name) => ({ section: name, topics: [] }));

    if (groups.length === 0) {
      panel.appendChild(buildInfoEmpty('Syllabus will be added soon.'));
      return panel;
    }
    groups.forEach((g) => {
      const block = document.createElement('div');
      block.className = 'syllabus-block';
      const h = document.createElement('h3');
      h.className = 'syllabus-block__title';
      h.textContent = g.section;
      block.appendChild(h);
      if (g.topics && g.topics.length) {
        const ul = document.createElement('ul');
        ul.className = 'syllabus-topics';
        g.topics.forEach((t) => {
          const li = document.createElement('li');
          li.textContent = t;
          ul.appendChild(li);
        });
        block.appendChild(ul);
      }
      panel.appendChild(block);
    });
    panel.appendChild(buildInfoNote());
    return panel;
  }

  function buildDatesPanel(info) {
    const d = info.dates || {};
    const panel = document.createElement('div');
    const rows = Array.isArray(d.rows) ? d.rows : [];
    if (!rows.length) {
      panel.appendChild(buildInfoEmpty('Important dates will be added soon.'));
      return panel;
    }
    if (d.cycle) {
      const badge = document.createElement('p');
      badge.className = 'dates-cycle';
      badge.textContent = d.cycle + ' admission cycle';
      panel.appendChild(badge);
    }
    const ol = document.createElement('ol');
    ol.className = 'dates-timeline';
    rows.forEach((r) => {
      const li = document.createElement('li');
      li.className = 'dates-item' + (r.highlight ? ' dates-item--highlight' : '');
      const lab = document.createElement('div');
      lab.className = 'dates-item__label';
      lab.textContent = r.label;
      const val = document.createElement('div');
      val.className = 'dates-item__value';
      val.textContent = r.value;
      li.appendChild(lab);
      li.appendChild(val);
      ol.appendChild(li);
    });
    panel.appendChild(ol);
    const note = document.createElement('p');
    note.className = 'info-note';
    note.textContent = d.note || 'Always confirm exact dates with the latest official notification.';
    panel.appendChild(note);
    return panel;
  }

  function buildApplyPanel(info) {
    const a = info.application || {};
    const panel = document.createElement('div');

    const dl = document.createElement('dl');
    dl.className = 'info-spec';
    const spec = [
      ['Mode', a.mode],
      ['Application fee', a.fee],
    ].filter((r) => r[1]);
    spec.forEach(([k, v]) => {
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    if (spec.length) panel.appendChild(dl);

    if (Array.isArray(a.steps) && a.steps.length) {
      const h = document.createElement('h3');
      h.className = 'syllabus-block__title';
      h.style.marginTop = spec.length ? '18px' : '0';
      h.textContent = 'How to apply, step by step';
      panel.appendChild(h);
      const ol = document.createElement('ol');
      ol.className = 'apply-steps';
      a.steps.forEach((s) => {
        const li = document.createElement('li');
        li.textContent = s;
        ol.appendChild(li);
      });
      panel.appendChild(ol);
    }

    if (a.portal) {
      const link = document.createElement('a');
      link.className = 'apply-portal-btn';
      link.href = a.portal;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Apply on ' + (a.portalLabel || a.portal.replace(/^https?:\/\//, '')) + ' ↗';
      panel.appendChild(link);
    }

    panel.appendChild(buildInfoNote());
    return panel;
  }

  function buildInfoNote() {
    const note = document.createElement('p');
    note.className = 'info-note';
    note.textContent = 'Indicative only — always confirm exact figures and rules with the latest official notification.';
    return note;
  }

  function buildInfoEmpty(msg) {
    const el = document.createElement('p');
    el.className = 'info-empty';
    el.textContent = msg;
    return el;
  }

  function buildPaperCard(test, def) {
    const card = document.createElement('div');
    card.className = 'paper-card';
    const totalQ = (test.sections || []).reduce((n, s) => n + (s.questions || []).length, 0);

    const head = document.createElement('div');
    head.className = 'paper-card__head';
    const title = document.createElement('div');
    title.className = 'paper-card__title';
    title.textContent = test.name;
    head.appendChild(title);

    const tags = document.createElement('div');
    tags.className = 'paper-card__tags';
    if (test.year) tags.appendChild(makeBadge(String(test.year), 'badge--type'));
    if (test.sectionTag) tags.appendChild(makeBadge(test.sectionTag, 'badge--type'));
    if (test.sourceSet) tags.appendChild(makeBadge(test.sourceSet, 'badge--draft'));
    head.appendChild(tags);
    card.appendChild(head);

    const meta = document.createElement('div');
    meta.className = 'paper-card__meta';
    meta.innerHTML =
      '<span><strong>Questions:</strong> ' + totalQ + '</span>' +
      '<span><strong>Duration:</strong> ' + test.durationMin + ' min</span>' +
      '<span><strong>Marking:</strong> +' + test.marking.correct + ' / ' + test.marking.wrong + '</span>';
    card.appendChild(meta);

    // Attempt-aware status line, from the local history / in-progress store.
    const history = (window.repo && window.repo.listResults)
      ? window.repo.listResults().filter((r) => r.examId === test.id) : [];
    const inProgress = (window.repo && window.repo.getAttempt) ? window.repo.getAttempt(test.id) : null;

    const status = document.createElement('div');
    status.className = 'paper-card__status';
    if (inProgress) {
      status.innerHTML = '<span class="paper-status paper-status--live">In progress</span>';
    } else if (history.length) {
      const best = history.reduce((m, h) => (h.score > m.score ? h : m), history[0]);
      status.innerHTML =
        '<span class="paper-status paper-status--done">Best: ' + best.score.toFixed(2) + ' / ' + best.maxScore + '</span>' +
        '<span class="paper-status__sub">' + history.length + ' attempt' + (history.length === 1 ? '' : 's') + '</span>';
    } else {
      status.innerHTML = '<span class="paper-status__sub">Not attempted yet</span>';
    }
    card.appendChild(status);

    const cta = document.createElement('div');
    cta.className = 'paper-card__cta';
    if (inProgress) {
      const resume = document.createElement('a');
      resume.className = 'btn btn--primary';
      resume.href = '#/test/' + test.id;
      resume.textContent = 'Resume';
      cta.appendChild(resume);

      // Restart must clear the saved attempt first, otherwise renderTest auto-resumes it.
      const restart = document.createElement('button');
      restart.type = 'button';
      restart.className = 'btn btn--ghost';
      restart.textContent = 'Restart';
      restart.addEventListener('click', () => {
        confirmDialog({
          title: 'Restart this test?',
          message: 'Your in-progress attempt will be cleared and you’ll start fresh.',
          confirmLabel: 'Restart', cancelLabel: 'Keep progress', danger: true,
        }).then((ok) => {
          if (!ok) return;
          if (window.repo) window.repo.clearAttempt(test.id);
          window.location.hash = '#/instructions/' + test.id;
        });
      });
      cta.appendChild(restart);
    } else {
      const startBtn = document.createElement('a');
      startBtn.className = 'btn btn--primary';
      startBtn.href = '#/instructions/' + test.id;
      startBtn.textContent = history.length ? 'Start again' : (def.kind === 'pyq' ? 'Attempt Paper' : 'Start Test');
      cta.appendChild(startBtn);
    }
    card.appendChild(cta);

    return card;
  }

  function makeBadge(text, cls) {
    const b = document.createElement('span');
    b.className = 'badge ' + cls;
    b.textContent = text;
    return b;
  }

  // ---------- Instructions ----------
  function renderInstructions(examId) {
    stopTimer();
    const exam = findExam(examId);
    if (!exam) return renderHome();
    mount('view-instructions');
    $('#instr-title').textContent = 'Instructions — ' + exam.name;

    // Summary strip — key facts at a glance before the rulebook.
    const totalQ = (exam.sections || []).reduce((n, s) => n + (s.questions || []).length, 0);
    const totalMarks = totalQ * (exam.marking.correct || 0);
    const summaryRows = [
      ['Questions', String(totalQ)],
      ['Duration', exam.durationMin + ' min'],
      ['Maximum marks', String(totalMarks)],
      ['Sections', String((exam.sections || []).length)],
      ['Marking', '+' + exam.marking.correct + ' / ' + exam.marking.wrong],
    ];
    if (exam.calculator) summaryRows.push(['Calculator', 'Allowed']);
    const summary = document.createElement('div');
    summary.className = 'instr-summary';
    summary.innerHTML = summaryRows.map((r) =>
      '<div class="instr-summary__item"><div class="instr-summary__v">' + escape(r[1]) +
      '</div><div class="instr-summary__k">' + escape(r[0]) + '</div></div>').join('');
    const titleEl = $('#instr-title');
    if (titleEl && titleEl.parentNode) titleEl.parentNode.insertBefore(summary, titleEl.nextSibling);

    const items = [
      'Total duration of the examination is ' + exam.durationMin + ' minutes.',
      'The countdown timer at the top of the screen shows the time remaining. When it reaches zero, the test ends automatically and your answers are submitted.',
      'The Question Palette on the right side of the screen shows the status of each question using colour codes (see legend below).',
      'You can click on a question number in the Question Palette to go to that question directly.',
      'You can use the section tabs at the top to switch between sections. ' +
        (exam.allowSectionSwitch ? 'You may freely move between sections.' : 'Once a section is submitted you cannot return to it.'),
      'To answer a question: click the option, then click "Save & Next" to save and move on, or "Mark for Review & Next" to flag it for revisit.',
      '"Clear Response" deselects the chosen option for the current question.',
      'Only questions that are "Answered" or "Answered & Marked for Review" are considered for evaluation. "Marked for Review" alone is NOT evaluated.',
      'You can change your answers any time before final submission.',
    ];
    const ol = $('#instr-list');
    items.forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      ol.appendChild(li);
    });

    const markUl = $('#instr-marking');
    [
      'Correct answer: +' + exam.marking.correct + ' marks',
      'Wrong answer: ' + exam.marking.wrong + ' marks (negative marking)',
      'Unattempted: ' + exam.marking.unattempted + ' marks',
    ].forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      markUl.appendChild(li);
    });

    const cb = $('#declare-cb');
    const btn = $('#start-btn');
    cb.addEventListener('change', () => { btn.disabled = !cb.checked; });
    btn.addEventListener('click', () => {
      // Gate the actual attempt: sign-in is required before the test loads.
      if (window.paperAccess) {
        btn.disabled = true;
        window.paperAccess.ensure(exam).then((ok) => {
          btn.disabled = false;
          if (ok) window.location.hash = '#/test/' + exam.id;
        });
        return;
      }
      window.location.hash = '#/test/' + exam.id;
    });

    const backLink = $('#instr-back');
    if (backLink) {
      backLink.addEventListener('click', (e) => {
        if (window.history.length > 1) {
          e.preventDefault();
          window.history.back();
        }
      });
    }
  }

  // ---------- Onboarding data ----------
  // JamiaPrep: JMI-only focus. Full list preserved below for re-enabling later.
  const TARGET_EXAMS = [
    { id: 'jmi-mba',        label: 'JMI MBA CET' },
    { id: 'jmi-ballb',      label: 'JMI BA LLB' },
    { id: 'jmi-mca',        label: 'JMI MCA' },
    { id: 'jmi-class9',     label: 'JMI Class 9' },
    { id: 'jmi-class11-science', label: 'JMI Class 11 Science' },
    { id: 'jmi-rca',        label: 'JMI RCA' },
    { id: 'jmi-phd',        label: 'JMI PhD' },
  ];
  /* Original (multi-exam) onboarding targets:
  const TARGET_EXAMS = [
    { id: 'ssc-cgl',        label: 'SSC CGL' },
    { id: 'ssc-chsl',       label: 'SSC CHSL' },
    { id: 'jee-main',       label: 'JEE Main' },
    { id: 'jee-advanced',   label: 'JEE Advanced' },
    { id: 'neet-ug',        label: 'NEET UG' },
    { id: 'cat',            label: 'CAT' },
    { id: 'gate',           label: 'GATE' },
    { id: 'upsc-cse',       label: 'UPSC CSE' },
    { id: 'ibps-po',        label: 'IBPS PO' },
    { id: 'sbi-po',         label: 'SBI PO' },
    { id: 'rrb-ntpc',       label: 'RRB NTPC' },
    { id: 'cuet-ug',        label: 'CUET UG' },
  ];
  */
  const EDUCATION_OPTIONS = ['Class 11', 'Class 12', 'Dropper', 'Undergraduate', 'Graduate', 'Working Professional'];
  const INDIAN_STATES = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
    'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
    'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
    'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
    'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry',
  ];
  function exLabel(id) {
    const found = TARGET_EXAMS.find((e) => e.id === id);
    return found ? found.label : id;
  }

  // ---------- Login (mobile + OTP) ----------
  function renderLogin() {
    stopTimer();
    mount('view-login');

    const phoneInput = $('#phone-input');
    const sendBtn = $('#send-otp-btn');
    const phoneErr = $('#phone-error');
    const stepPhone = $('#login-step-phone');
    const stepOtp = $('#login-step-otp');
    const otpBoxes = $$('.otp-box');
    const otpErr = $('#otp-error');
    const verifyBtn = $('#verify-otp-btn');
    const echo = $('#otp-phone-echo');
    const changeLink = $('#change-phone-link');
    const resendLink = $('#resend-otp-link');
    const skipLink = $('#skip-login-link');
    const googleBtn = $('#google-signin-btn');

    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        if (window.auth && window.auth.signInWithGoogle) {
          googleBtn.disabled = true;
          window.auth.signInWithGoogle();
        }
      });
    }

    function showError(node, msg) {
      node.textContent = msg;
      node.hidden = false;
    }
    function clearError(node) { node.hidden = true; node.textContent = ''; }

    function validPhone(v) { return /^[6-9]\d{9}$/.test(v); }

    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      clearError(phoneErr);
    });
    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); sendBtn.click(); }
    });

    sendBtn.addEventListener('click', () => {
      const v = phoneInput.value.trim();
      if (!validPhone(v)) {
        showError(phoneErr, 'Enter a valid 10-digit Indian mobile number.');
        phoneInput.focus();
        return;
      }
      echo.textContent = '+91 ' + v;
      stepPhone.hidden = true;
      stepOtp.hidden = false;
      otpBoxes[0].focus();
    });

    otpBoxes.forEach((box, i) => {
      box.addEventListener('input', () => {
        box.value = box.value.replace(/\D/g, '').slice(0, 1);
        clearError(otpErr);
        if (box.value && i < otpBoxes.length - 1) otpBoxes[i + 1].focus();
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && i > 0) {
          otpBoxes[i - 1].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault(); verifyBtn.click();
        }
      });
      box.addEventListener('paste', (e) => {
        const txt = (e.clipboardData || window.clipboardData).getData('text');
        const digits = (txt || '').replace(/\D/g, '').slice(0, 6);
        if (!digits) return;
        e.preventDefault();
        for (let j = 0; j < otpBoxes.length; j++) otpBoxes[j].value = digits[j] || '';
        const next = Math.min(digits.length, otpBoxes.length - 1);
        otpBoxes[next].focus();
      });
    });

    verifyBtn.addEventListener('click', () => {
      const code = otpBoxes.map((b) => b.value).join('');
      if (code.length !== 6) {
        showError(otpErr, 'Enter all 6 digits of the OTP.');
        return;
      }
      if (code !== '123456') {
        showError(otpErr, 'Incorrect OTP. For this demo, use 123456.');
        return;
      }
      const phone = phoneInput.value.trim();
      window.repo.saveUser({ phone: phone, verifiedAt: Date.now(), skipped: false });
      window.location.hash = '#/profile';
    });

    changeLink.addEventListener('click', (e) => {
      e.preventDefault();
      otpBoxes.forEach((b) => (b.value = ''));
      clearError(otpErr);
      stepOtp.hidden = true;
      stepPhone.hidden = false;
      phoneInput.focus();
    });

    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      otpBoxes.forEach((b) => (b.value = ''));
      clearError(otpErr);
      otpBoxes[0].focus();
    });

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.repo.saveUser({ skipped: true, verifiedAt: Date.now() });
      window.location.hash = '#/';
    });

    phoneInput.focus();
  }

  // ---------- Profile (basic details + target exams) ----------
  function renderProfile() {
    stopTimer();
    // Must have at least started login (phone + verifiedAt) to access profile.
    const existing = window.repo ? window.repo.getUser() : null;
    if (!existing || !existing.verifiedAt) {
      window.location.hash = '#/login';
      return;
    }
    mount('view-profile');

    const nameInput = $('#pf-name');
    const cityInput = $('#pf-city');
    const stateSel = $('#pf-state');
    const eduWrap = $('#pf-education');
    const examsWrap = $('#pf-exams');
    const examsErr = $('#exams-error');
    const profileErr = $('#profile-error');
    const saveBtn = $('#profile-save-btn');
    const skipBtn = $('#profile-skip-btn');

    // States dropdown
    INDIAN_STATES.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      stateSel.appendChild(opt);
    });

    // Education chips (single-select)
    let selectedEducation = existing.education || '';
    EDUCATION_OPTIONS.forEach((label) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (label === selectedEducation ? ' is-selected' : '');
      chip.textContent = label;
      chip.addEventListener('click', () => {
        selectedEducation = label;
        $$('.chip', eduWrap).forEach((c) => c.classList.toggle('is-selected', c.textContent === label));
      });
      eduWrap.appendChild(chip);
    });

    // Target exams chips (multi-select)
    const selectedExams = new Set(existing.targetExams || []);
    TARGET_EXAMS.forEach((ex) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (selectedExams.has(ex.id) ? ' is-selected' : '');
      chip.dataset.examId = ex.id;
      chip.textContent = ex.label;
      chip.addEventListener('click', () => {
        if (selectedExams.has(ex.id)) {
          selectedExams.delete(ex.id);
          chip.classList.remove('is-selected');
        } else {
          selectedExams.add(ex.id);
          chip.classList.add('is-selected');
        }
        examsErr.hidden = true;
      });
      examsWrap.appendChild(chip);
    });

    // Prefill from existing
    if (existing.name) nameInput.value = existing.name;
    if (existing.city) cityInput.value = existing.city;
    if (existing.state) stateSel.value = existing.state;

    saveBtn.addEventListener('click', () => {
      profileErr.hidden = true;
      const name = nameInput.value.trim();
      if (name.length < 2) {
        profileErr.textContent = 'Please enter your full name (at least 2 characters).';
        profileErr.hidden = false;
        nameInput.focus();
        return;
      }
      if (selectedExams.size === 0) {
        examsErr.textContent = 'Pick at least one target exam.';
        examsErr.hidden = false;
        return;
      }
      window.repo.saveUser({
        name: name,
        city: cityInput.value.trim(),
        state: stateSel.value,
        education: selectedEducation,
        targetExams: Array.from(selectedExams),
        skipped: false,
      });
      window.location.hash = '#/';
    });

    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.repo.saveUser({ skipped: true });
      window.location.hash = '#/';
    });

    nameInput.focus();
  }

  // ---------- Test (exam engine) ----------
  // State held in module-scope; reset on each test render.
  let state = null;
  let timerHandle = null;

  function stopTimer() {
    if (timerHandle) {
      clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function renderTest(examId) {
    const exam = findExam(examId);
    if (!exam) return renderHome();

    // Access guard: block direct navigation to a paper while signed out.
    // Resuming an already-saved in-progress attempt is allowed. Otherwise route
    // through the instructions page, where the sign-in gate runs.
    if (window.paperAccess && !window.paperAccess.isGranted(examId)) {
      const hasSavedAttempt = !!(window.repo && window.repo.getAttempt(examId));
      if (!hasSavedAttempt) {
        window.paperAccess.ensure(exam).then((ok) => {
          if (ok) renderTest(examId);
          else window.location.hash = '#/instructions/' + examId;
        });
        return;
      }
    }

    mount('view-test');

    const flat = flattenQuestions(exam);
    state = {
      exam,
      flat,
      currentIdx: 0,                                  // global index across all sections
      currentSection: 0,
      durationSec: exam.durationMin * 60,
      remainingSec: exam.durationMin * 60,
      startedAt: Date.now(),
      autoSubmitted: false,
      // Per-question runtime: status + selectedOption + accumulated time on the question
      qs: flat.map(() => ({ status: 'not-visited', selected: null, timeMs: 0 })),
      // Wall-clock time accounting: which question is "active" and since when.
      activeIdx: null,
      activeSince: 0,
      resumed: false,
    };

    // Resume an in-progress attempt if one was saved (refresh / accidental nav).
    // Only restore when the saved snapshot matches this exam's question count.
    const saved = window.repo ? window.repo.getAttempt(examId) : null;
    if (saved && Array.isArray(saved.qs) && saved.qs.length === flat.length) {
      state.qs = saved.qs.map((q) => ({
        status: q.status || 'not-visited',
        selected: (q.selected === undefined ? null : q.selected),
        timeMs: q.timeMs || 0,
      }));
      state.currentIdx = Math.min(Math.max(0, saved.currentIdx || 0), flat.length - 1);
      state.currentSection = saved.currentSection || 0;
      if (typeof saved.remainingSec === 'number') state.remainingSec = Math.max(0, saved.remainingSec);
      if (saved.startedAt) state.startedAt = saved.startedAt;
      state.resumed = true;
    }

    $('#exam-name').textContent = exam.name;
    const subEl = $('#exam-sub');
    if (subEl) subEl.textContent = examSubtitle(exam);
    $('#cand-exam').textContent = exam.name;

    // Personalize candidate strip from user profile. The roll number is a stable,
    // non-PII id derived from the device — never from the user's phone number.
    const user = window.repo ? window.repo.getUser() : null;
    if (user && user.name) $('#cand-name').textContent = user.name;
    $('#cand-roll').textContent = candidateRoll();
    $('#q-pos').textContent = exam.marking.correct;
    $('#q-neg').textContent = exam.marking.wrong;

    renderSectionTabs();
    renderPalette();
    goToQuestion(state.currentIdx);
    bindTestEvents();
    setupCalculator(exam);
    startTimer();
    persistAttempt();

    if (state.resumed) {
      const restartBtn = $('#test-restart-btn');
      if (restartBtn) restartBtn.hidden = false;
      toast('Resumed your in-progress attempt');
    }
  }

  // Snapshot the running attempt so a refresh/navigation doesn't lose progress.
  function persistAttempt() {
    if (!state || !state.exam || !window.repo) return;
    window.repo.saveAttempt(state.exam.id, {
      qs: state.qs,
      currentIdx: state.currentIdx,
      currentSection: state.currentSection,
      remainingSec: state.remainingSec,
      durationSec: state.durationSec,
      startedAt: state.startedAt,
    });
  }

  // Lightweight toast (the admin panel has its own; this keeps the test runner self-contained).
  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('toast--show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('toast--show'), 2600);
  }

  // In-app confirmation dialog — replaces native window.confirm() for a premium feel.
  // Returns a Promise<boolean>.
  function confirmDialog(opts) {
    const o = opts || {};
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'modal confirm-modal';
      overlay.innerHTML =
        '<div class="modal__panel confirm-modal__panel" role="alertdialog" aria-modal="true">' +
          '<h2></h2><p></p>' +
          '<div class="actions-row confirm-modal__actions">' +
            '<button class="btn btn--ghost" data-act="cancel"></button>' +
            '<button class="btn" data-act="ok"></button>' +
          '</div>' +
        '</div>';
      overlay.querySelector('h2').textContent = o.title || 'Are you sure?';
      overlay.querySelector('p').textContent = o.message || '';
      const cancelBtn = overlay.querySelector('[data-act="cancel"]');
      const okBtn = overlay.querySelector('[data-act="ok"]');
      cancelBtn.textContent = o.cancelLabel || 'Cancel';
      okBtn.textContent = o.confirmLabel || 'Confirm';
      okBtn.classList.add(o.danger ? 'btn--danger' : 'btn--primary');

      function close(val) {
        document.removeEventListener('keydown', onKey);
        overlay.remove();
        resolve(val);
      }
      function onKey(e) {
        if (e.key === 'Escape') close(false);
        else if (e.key === 'Enter') close(true);
      }
      cancelBtn.addEventListener('click', () => close(false));
      okBtn.addEventListener('click', () => close(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(overlay);
      okBtn.focus();
    });
  }

  // ---------- On-screen calculator (shown only when exam.calculator) ----------
  let calcExpr = '';
  function calcEval(expr) {
    const clean = String(expr).replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/.()\s]*$/.test(clean)) return 'Error';
    if (!clean.trim()) return '0';
    try {
      // Input is produced only by calculator buttons (digits/operators/parens),
      // and is regex-validated above, so evaluating it is safe here.
      const v = Function('"use strict"; return (' + clean + ')')();
      if (typeof v !== 'number' || !isFinite(v)) return 'Error';
      return String(Math.round(v * 1e9) / 1e9);
    } catch (e) { return 'Error'; }
  }

  function setupCalculator(exam) {
    const btn = $('#test-calc-btn');
    if (!btn) return;
    if (!exam.calculator) { btn.hidden = true; return; }
    btn.hidden = false;

    let panel = document.getElementById('calc-panel');
    if (!panel) {
      const keys = [
        'C', '⌫', '(', ')',
        '7', '8', '9', '÷',
        '4', '5', '6', '×',
        '1', '2', '3', '−',
        '0', '.', '=', '+',
      ];
      panel = document.createElement('div');
      panel.id = 'calc-panel';
      panel.className = 'calc-panel';
      panel.hidden = true;
      panel.innerHTML =
        '<div class="calc-panel__head"><span>Calculator</span>' +
          '<button class="calc-panel__close" id="calc-close" aria-label="Close calculator">&times;</button></div>' +
        '<div class="calc-display" id="calc-display">0</div>' +
        '<div class="calc-keys">' +
          keys.map((k) => {
            const op = (k === '÷' || k === '×' || k === '−' || k === '+');
            const cls = k === '=' ? 'calc-key calc-key--eq'
              : (k === 'C' || k === '⌫') ? 'calc-key calc-key--fn'
              : op ? 'calc-key calc-key--op' : 'calc-key';
            return '<button class="' + cls + '" data-k="' + k + '">' + k + '</button>';
          }).join('') +
        '</div>';
      document.body.appendChild(panel);

      const display = panel.querySelector('#calc-display');
      const render = () => { display.textContent = calcExpr || '0'; };
      panel.querySelector('#calc-close').addEventListener('click', () => { panel.hidden = true; });
      panel.querySelectorAll('.calc-key').forEach((kbtn) => {
        kbtn.addEventListener('click', () => {
          const k = kbtn.dataset.k;
          if (k === 'C') { calcExpr = ''; }
          else if (k === '⌫') { calcExpr = calcExpr.slice(0, -1); }
          else if (k === '=') {
            const r = calcEval(calcExpr);
            calcExpr = (r === 'Error') ? '' : r;
            display.textContent = r;
            return;
          } else {
            // Map operator glyphs to themselves (evaluated later); append digits/parens.
            calcExpr += k;
          }
          render();
        });
      });
    }

    calcExpr = '';
    panel.querySelector('#calc-display').textContent = '0';
    panel.hidden = true;
    btn.onclick = () => { panel.hidden = !panel.hidden; };
  }

  function bindTestEvents() {
    $('#btn-save-next').addEventListener('click', onSaveNext);
    $('#btn-mark').addEventListener('click', onMarkNext);
    $('#btn-clear').addEventListener('click', onClear);
    $('#btn-prev').addEventListener('click', onPrev);
    $('#btn-next').addEventListener('click', onNext);
    $('#btn-submit').addEventListener('click', openSubmitModal);
    $('#cancel-submit').addEventListener('click', closeSubmitModal);
    $('#confirm-submit').addEventListener('click', () => finalizeSubmit(false));
    $('#palette-toggle').addEventListener('click', () => {
      $('#palette').classList.toggle('open');
    });
    const restartBtn = $('#test-restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      confirmDialog({
        title: 'Restart this test?',
        message: 'Your current progress on this attempt will be cleared and the test will start again from the beginning.',
        confirmLabel: 'Restart', cancelLabel: 'Keep going', danger: true,
      }).then((ok) => {
        if (!ok) return;
        const id = state.exam.id;
        stopTimer();
        if (window.repo) window.repo.clearAttempt(id);
        renderTest(id);
      });
    });
    const homeBtn = $('#test-home-btn');
    if (homeBtn) homeBtn.addEventListener('click', () => {
      confirmDialog({
        title: 'Leave the test?',
        message: 'Your progress is saved — you can resume this attempt anytime from My Tests.',
        confirmLabel: 'Leave test', cancelLabel: 'Stay',
      }).then((ok) => {
        if (!ok) return;
        stopTimer();
        persistAttempt();
        window.location.hash = '#/';
      });
    });
  }

  function renderSectionTabs() {
    const tabs = $('#section-tabs');
    tabs.innerHTML = '';
    state.exam.sections.forEach((sec, idx) => {
      const btn = document.createElement('button');
      btn.className = 'section-tab' + (idx === state.currentSection ? ' active' : '');
      btn.textContent = sec.name + ' (' + sec.questions.length + ')';
      if (state.exam.allowSectionSwitch === false && idx !== state.currentSection) {
        btn.disabled = true;
        btn.title = 'Section switching is disabled for this exam.';
      }
      btn.addEventListener('click', () => {
        if (state.exam.allowSectionSwitch === false && idx !== state.currentSection) return;
        const target = state.flat.findIndex((f) => f.sectionIdx === idx);
        if (target >= 0) goToQuestion(target);
      });
      tabs.appendChild(btn);
    });
  }

  function renderPalette() {
    const grid = $('#palette-grid');
    const sectionTitle = $('#palette-section-title');
    grid.innerHTML = '';
    const section = state.exam.sections[state.currentSection];
    sectionTitle.textContent = section.name;

    state.flat.forEach((f, idx) => {
      if (f.sectionIdx !== state.currentSection) return;
      const q = state.qs[idx];
      const chip = document.createElement('button');
      chip.className = 'palette-chip s-' + q.status + (idx === state.currentIdx ? ' current' : '');
      chip.textContent = String(f.inSectionIdx + 1);
      chip.title = 'Q' + (f.inSectionIdx + 1) + ' — ' + q.status.replace(/-/g, ' ');
      chip.addEventListener('click', () => {
        goToQuestion(idx);
        $('#palette').classList.remove('open'); // close drawer on mobile
      });
      grid.appendChild(chip);
    });
  }

  // Bank the wall-clock time spent on the currently active question, then
  // reset the clock. Call before switching questions and on submit.
  function commitTime() {
    if (!state) return;
    if (state.activeIdx !== null && state.activeSince) {
      const elapsed = Date.now() - state.activeSince;
      if (elapsed > 0) state.qs[state.activeIdx].timeMs += elapsed;
    }
    state.activeSince = Date.now();
  }

  function goToQuestion(globalIdx) {
    if (globalIdx < 0 || globalIdx >= state.flat.length) return;
    commitTime();
    state.currentIdx = globalIdx;
    state.activeIdx = globalIdx;
    state.activeSince = Date.now();
    const f = state.flat[globalIdx];

    // Switch active section if needed.
    if (f.sectionIdx !== state.currentSection) {
      state.currentSection = f.sectionIdx;
      renderSectionTabs();
    }

    // Mark as visited (not-visited → not-answered, others unchanged).
    const qs = state.qs[globalIdx];
    if (qs.status === 'not-visited') qs.status = 'not-answered';

    renderQuestion();
    renderPalette();
    persistAttempt();
  }

  function renderQuestion() {
    const f = state.flat[state.currentIdx];
    const qs = state.qs[state.currentIdx];
    const q = f.q;
    $('#q-no').textContent = String(f.inSectionIdx + 1) + ' (Section: ' + f.sectionName + ')';

    const qText = $('#q-text');
    if (q.format === 'html') qText.innerHTML = q.text;
    else { qText.textContent = ''; qText.innerText = q.text; }

    const ol = $('#q-options');
    ol.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    if ((q.type || 'mcq') === 'numerical') {
      const li = document.createElement('li');
      li.className = 'numerical-input';
      li.innerHTML =
        '<label>Your answer:</label> ' +
        '<input type="number" step="any" id="num-answer" placeholder="Enter a number" />';
      ol.appendChild(li);
      const input = li.querySelector('#num-answer');
      if (qs.selected !== null && qs.selected !== undefined) input.value = qs.selected;
      input.addEventListener('input', () => {
        const v = input.value.trim();
        qs.selected = v === '' ? null : parseFloat(v);
        if (isNaN(qs.selected)) qs.selected = null;
      });
    } else {
      (q.options || []).forEach((opt, i) => {
        const li = document.createElement('li');
        if (qs.selected === i) li.classList.add('selected');
        const labelSpan = '<span class="option-label">' + letters[i] + '.</span>';
        const txt = '<span class="option-text">' + (typeof opt === 'string' ? escape(opt) : '') + '</span>';
        li.innerHTML = '<input type="radio" name="opt" />' + labelSpan + txt;
        li.querySelector('input').checked = qs.selected === i;
        li.addEventListener('click', () => selectOption(i));
        ol.appendChild(li);
      });
    }

    $('#btn-prev').disabled = state.currentIdx === 0;
    $('#btn-next').disabled = state.currentIdx === state.flat.length - 1;

    // Render KaTeX math (if loaded) over the question + options.
    if (window.renderMathIn) {
      window.renderMathIn($('.question-area'));
    }
  }

  function selectOption(i) {
    const qs = state.qs[state.currentIdx];
    qs.selected = i;
    renderQuestion();
    persistAttempt();
    // Don't auto-update palette status — only Save&Next / Mark commits it. Matches real CBT.
  }

  function onSaveNext() {
    const qs = state.qs[state.currentIdx];
    if (qs.selected !== null) {
      qs.status = qs.status === 'marked' || qs.status === 'answered-marked'
        ? 'answered-marked'
        : 'answered';
    }
    // If nothing selected, status stays whatever it is (typically 'not-answered').
    advance();
  }

  function onMarkNext() {
    const qs = state.qs[state.currentIdx];
    qs.status = qs.selected !== null ? 'answered-marked' : 'marked';
    advance();
  }

  function onClear() {
    const qs = state.qs[state.currentIdx];
    qs.selected = null;
    if (qs.status === 'answered-marked') qs.status = 'marked';
    else if (qs.status === 'answered') qs.status = 'not-answered';
    renderQuestion();
    renderPalette();
    persistAttempt();
  }

  function onPrev() { goToQuestion(state.currentIdx - 1); }
  function onNext() { goToQuestion(state.currentIdx + 1); }

  function advance() {
    if (state.currentIdx < state.flat.length - 1) {
      goToQuestion(state.currentIdx + 1);
    } else {
      // On last question, just re-render to reflect status change.
      renderQuestion();
      renderPalette();
      persistAttempt();
    }
  }

  // ---------- Timer ----------
  function startTimer() {
    updateTimerDisplay();
    timerHandle = setInterval(() => {
      state.remainingSec -= 1;
      if (state.remainingSec <= 0) {
        state.remainingSec = 0;
        updateTimerDisplay();
        stopTimer();
        finalizeSubmit(true);
        return;
      }
      updateTimerDisplay();
      // Periodically snapshot remaining time so a crash loses at most ~5s.
      if (state.remainingSec % 5 === 0) persistAttempt();
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = $('#timer');
    if (!el) return;
    el.textContent = formatMMSS(state.remainingSec);
    el.classList.toggle('warn', state.remainingSec <= 300 && state.remainingSec > 60);
    el.classList.toggle('danger', state.remainingSec <= 60);
  }

  // ---------- Submit flow ----------
  function computeCounts() {
    const counts = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 };
    state.qs.forEach((q) => {
      if (q.status === 'answered') counts.answered++;
      else if (q.status === 'not-answered') counts.notAnswered++;
      else if (q.status === 'not-visited') counts.notVisited++;
      else if (q.status === 'marked') counts.marked++;
      else if (q.status === 'answered-marked') counts.answeredMarked++;
    });
    return counts;
  }

  function openSubmitModal() {
    const c = computeCounts();
    const tbl = $('#submit-summary');
    tbl.innerHTML =
      '<tr><th>Answered</th><td>' + c.answered + '</td></tr>' +
      '<tr><th>Not Answered</th><td>' + c.notAnswered + '</td></tr>' +
      '<tr><th>Not Visited</th><td>' + c.notVisited + '</td></tr>' +
      '<tr><th>Marked for Review</th><td>' + c.marked + '</td></tr>' +
      '<tr><th>Answered &amp; Marked (counted)</th><td>' + c.answeredMarked + '</td></tr>' +
      '<tr><th>Total</th><td><strong>' + state.flat.length + '</strong></td></tr>';
    $('#submit-modal').hidden = false;
  }

  function closeSubmitModal() { $('#submit-modal').hidden = true; }

  function finalizeSubmit(auto) {
    stopTimer();
    commitTime();
    state.autoSubmitted = !!auto;
    const result = buildResult();
    // The attempt is finished — clear the in-progress snapshot and persist the
    // result durably (survives tab close; backs the future "My Tests" history).
    if (window.repo) {
      window.repo.clearAttempt(state.exam.id);
      window.repo.saveResult(result);
    }
    try { sessionStorage.setItem('mockcbt:last-result', JSON.stringify(result)); } catch (e) {}
    // Count a real paper submission — the truest "people are actually solving
    // papers" signal (one event per finished attempt, auto-submit included).
    if (window.track) {
      window.track('Paper submitted', {
        paper: result.examName,
        examId: result.examId,
        score: result.score,
        maxScore: result.maxScore,
        autoSubmitted: result.autoSubmitted,
      });
    }
    window.location.hash = '#/result';
  }

  function buildResult() {
    const exam = state.exam;
    const totalQ = state.flat.length;
    const maxScore = totalQ * exam.marking.correct;

    // Per-section tally
    const sectionStats = exam.sections.map((sec) => ({
      id: sec.id,
      name: sec.name,
      total: sec.questions.length,
      correct: 0,
      wrong: 0,
      unattempted: 0,
      score: 0,
    }));

    const review = [];
    let correct = 0, wrong = 0, unattempted = 0, score = 0;

    state.flat.forEach((f, idx) => {
      const qs = state.qs[idx];
      const wasEvaluated = qs.status === 'answered' || qs.status === 'answered-marked';
      const sec = sectionStats[f.sectionIdx];
      let outcome;
      const isNumerical = (f.q.type || 'mcq') === 'numerical';
      const isCorrect = isNumerical
        ? (qs.selected !== null && qs.selected !== undefined && !isNaN(qs.selected)
            && Math.abs(qs.selected - f.q.answer) <= (f.q.tolerance || 0))
        : (qs.selected === f.q.correct);

      if (!wasEvaluated || qs.selected === null || qs.selected === undefined) {
        outcome = 'unattempted';
        unattempted++;
        sec.unattempted++;
        score += exam.marking.unattempted;
      } else if (isCorrect) {
        outcome = 'correct';
        correct++;
        sec.correct++;
        score += exam.marking.correct;
        sec.score += exam.marking.correct;
      } else {
        outcome = 'wrong';
        wrong++;
        sec.wrong++;
        score += exam.marking.wrong;
        sec.score += exam.marking.wrong;
      }
      review.push({
        sectionName: f.sectionName,
        qNum: f.inSectionIdx + 1,
        type: f.q.type || 'mcq',
        text: f.q.text,
        format: f.q.format || 'text',
        options: f.q.options || null,
        correct: f.q.correct,
        answer: f.q.answer,
        tolerance: f.q.tolerance,
        selected: qs.selected,
        outcome,
        difficulty: f.q.difficulty || 'medium',
        timeMs: qs.timeMs || 0,
        explanation: f.q.explanation || '',
        explanationFormat: f.q.explanationFormat || 'text',
      });
    });

    const attempted = correct + wrong;
    const accuracy = attempted === 0 ? 0 : (correct / attempted) * 100;
    const timeTakenSec = Math.max(0, state.durationSec - state.remainingSec);

    return {
      examId: exam.id,
      examName: exam.name,
      autoSubmitted: state.autoSubmitted,
      totalQ,
      maxScore,
      score,
      attempted,
      correct,
      wrong,
      unattempted,
      accuracy,
      timeTakenSec,
      durationSec: state.durationSec,
      sectionStats,
      review,
    };
  }

  // ---------- Result ----------
  function renderResult() {
    stopTimer();
    mount('view-result');

    let r;
    try { r = JSON.parse(sessionStorage.getItem('mockcbt:last-result') || 'null'); } catch (e) { r = null; }
    // Fall back to the durable copy so the result survives a tab close / reopen.
    if (!r && window.repo) r = window.repo.getLastResult();
    if (!r) {
      $('#result-card').innerHTML = '<p>No recent attempt found. <a href="#/">Take a test</a> first.</p>';
      $('#result-sections').innerHTML = '';
      $('#result-review').innerHTML = '';
      return;
    }

    const banner = r.autoSubmitted
      ? '<div class="result-banner"><strong>Auto-submitted:</strong> Time ran out before you submitted.</div>'
      : '';

    const card = $('#result-card');
    card.innerHTML = banner +
      stat('Score', r.score.toFixed(2) + ' / ' + r.maxScore, r.score > 0 ? 'positive' : (r.score < 0 ? 'negative' : '')) +
      stat('Attempted', r.attempted + ' / ' + r.totalQ) +
      stat('Correct', String(r.correct), 'positive') +
      stat('Wrong', String(r.wrong), 'negative') +
      stat('Unattempted', String(r.unattempted)) +
      stat('Accuracy', r.accuracy.toFixed(1) + '%') +
      stat('Time Taken', formatDuration(r.timeTakenSec));

    // Section table (wrapped so it scrolls horizontally instead of breaking the page on small screens)
    const secsHtml =
      '<div class="table-scroll"><table><thead><tr>' +
      '<th>Section</th><th>Total</th><th>Correct</th><th>Wrong</th><th>Unattempted</th><th>Score</th>' +
      '</tr></thead><tbody>' +
      r.sectionStats.map((s) =>
        '<tr><td>' + escape(s.name) + '</td><td>' + s.total + '</td>' +
        '<td class="tag-correct">' + s.correct + '</td>' +
        '<td class="tag-wrong">' + s.wrong + '</td>' +
        '<td class="tag-skip">' + s.unattempted + '</td>' +
        '<td><strong>' + s.score.toFixed(2) + '</strong></td></tr>'
      ).join('') +
      '</tbody></table></div>';
    $('#result-sections').innerHTML = secsHtml;

    // Review — per-question cards (mobile-friendly; replaces the old 4-column table that overflowed).
    const letters = ['A', 'B', 'C', 'D'];
    const cards = r.review.map((q) => {
      const label = q.outcome === 'correct' ? 'Correct'
        : q.outcome === 'wrong' ? 'Wrong' : 'Not Attempted';

      const qtext = q.format === 'html'
        ? '<div class="rev-card__qtext review-qtext">' + q.text + '</div>'
        : '<div class="rev-card__qtext" style="white-space:pre-wrap">' + escape(q.text) + '</div>';

      let body;
      if (q.type === 'numerical') {
        const your = (q.selected === null || q.selected === undefined) ? '—' : escape(String(q.selected));
        const corr = escape(String(q.answer)) + (q.tolerance ? ' (±' + escape(String(q.tolerance)) + ')' : '');
        body =
          '<div class="rev-answers">' +
            '<div class="rev-answer"><span class="rev-answer__k">Your answer</span><span class="rev-answer__v">' + your + '</span></div>' +
            '<div class="rev-answer rev-answer--correct"><span class="rev-answer__k">Correct answer</span><span class="rev-answer__v">' + corr + '</span></div>' +
          '</div>';
      } else {
        body = '<ul class="rev-options">' + (q.options || []).map((opt, oi) => {
          const isCorrect = oi === q.correct;
          const isYour = oi === q.selected;
          const cls = isCorrect ? ' is-correct' : (isYour ? ' is-wrong' : '');
          const tagYou = isYour ? '<span class="rev-opt__tag">Your answer</span>' : '';
          const mark = isCorrect ? '<span class="rev-opt__mark">✓</span>'
            : (isYour ? '<span class="rev-opt__mark">✗</span>' : '');
          return '<li class="rev-opt' + cls + '">' +
            '<span class="rev-opt__letter">' + letters[oi] + '</span>' +
            '<span class="rev-opt__text">' + escape(opt) + '</span>' +
            tagYou + mark +
          '</li>';
        }).join('') + '</ul>';
        if (q.selected === null || q.selected === undefined) {
          body += '<div class="rev-skip-note">You did not attempt this question.</div>';
        }
      }

      const expl = q.explanation
        ? '<div class="rev-card__expl"><span class="rev-card__expl-label">Explanation</span>' +
            (q.explanationFormat === 'html'
              ? '<div class="review-expl">' + q.explanation + '</div>'
              : '<div class="review-expl" style="white-space:pre-wrap">' + escape(q.explanation) + '</div>') +
          '</div>'
        : '';

      return '<article class="rev-card rev-card--' + q.outcome + '">' +
        '<div class="rev-card__top">' +
          '<span class="rev-card__q">' + escape(q.sectionName) + ' · Q' + q.qNum + '</span>' +
          '<span class="rev-badge rev-badge--' + q.outcome + '">' + label + '</span>' +
        '</div>' +
        '<div class="rev-card__meta">' + difficultyRibbon(q.difficulty) + timeChip(q.timeMs) + '</div>' +
        qtext + body + expl +
      '</article>';
    }).join('');
    $('#result-review').innerHTML = '<div class="rev-cards">' + cards + '</div>';

    if (window.renderMathIn) window.renderMathIn($('#result-review'));

    setupReviews(r.examId, r.examName);
  }

  // ---------- Ratings & reviews ----------
  function setupReviews(examId, examName) {
    const section = $('#result-reviews-section');
    if (!examId) { if (section) section.hidden = true; return; }
    if (section) section.hidden = false;

    renderReviewsSection(examId);
    wireRatingModal(examId, examName);
    // Note: we intentionally do NOT auto-pop the rating modal. Asking "How was this
    // mock?" before the student has seen their score/review feels intrusive (especially
    // after a low score). They rate via the "Rate this mock" button when ready.
  }

  function renderReviewsSection(examId) {
    const host = $('#result-reviews');
    if (!host) return;
    const summary = repo.getRatingSummary(examId);
    const reviews = repo.listReviews(examId);

    if (summary.count === 0) {
      host.innerHTML =
        '<div class="reviews-empty">No ratings yet. Be the first to rate this mock!</div>';
      syncRateButton(examId);
      return;
    }

    const avg = summary.average;
    const maxBar = Math.max(...[5, 4, 3, 2, 1].map((n) => summary.distribution[n]), 1);
    const bars = [5, 4, 3, 2, 1].map((n) => {
      const count = summary.distribution[n];
      const pct = Math.round((count / maxBar) * 100);
      return '<div class="rating-bar">' +
        '<span class="rating-bar__num">' + n + '</span>' +
        '<span class="rating-bar__track"><span class="rating-bar__fill" style="width:' + pct + '%"></span></span>' +
        '<span class="rating-bar__count">' + count + '</span>' +
        '</div>';
    }).join('');

    const overview =
      '<div class="rating-overview">' +
        '<div class="rating-overview__score">' +
          '<div class="rating-overview__avg">' + avg.toFixed(1) + '</div>' +
          starsDisplay(avg) +
          '<div class="rating-overview__count">' + summary.count + ' ' +
            (summary.count === 1 ? 'rating' : 'ratings') + '</div>' +
        '</div>' +
        '<div class="rating-overview__bars">' + bars + '</div>' +
      '</div>';

    const list = reviews.map((rev) => {
      const comment = rev.comment
        ? '<div class="review-card__comment">' + escape(rev.comment) + '</div>'
        : '';
      return '<div class="review-card">' +
        '<div class="review-card__head">' +
          '<span class="review-card__avatar">' + escape((rev.name || 'A').charAt(0).toUpperCase()) + '</span>' +
          '<div>' +
            '<div class="review-card__name">' + escape(rev.name || 'Anonymous') + '</div>' +
            '<div class="review-card__meta">' + starsDisplay(rev.rating) +
              '<span class="review-card__date">' + formatReviewDate(rev.ts) + '</span></div>' +
          '</div>' +
        '</div>' + comment +
        '</div>';
    }).join('');

    host.innerHTML = overview + '<div class="review-list">' + list + '</div>';
    syncRateButton(examId);
  }

  function syncRateButton(examId) {
    const btn = $('#open-rating-btn');
    if (btn) btn.textContent = repo.getMyReview(examId) ? 'Edit your rating' : 'Rate this mock';
  }

  // Read-only star row for a given (possibly fractional) rating.
  function starsDisplay(value) {
    const v = Math.max(0, Math.min(5, Number(value) || 0));
    let html = '<span class="stars-display" aria-label="' + v.toFixed(1) + ' out of 5">';
    for (let i = 1; i <= 5; i++) {
      const cls = v >= i ? 'is-full' : (v >= i - 0.5 ? 'is-half' : '');
      html += '<span class="stars-display__star ' + cls + '">&#9733;</span>';
    }
    return html + '</span>';
  }

  function formatReviewDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  let ratingState = { examId: null, value: 0 };

  function wireRatingModal(examId, examName) {
    const modal = $('#rating-modal');
    if (!modal || modal.dataset.wired === '1') {
      // Re-bind open button each render (cheap, idempotent).
      const openBtn = $('#open-rating-btn');
      if (openBtn) openBtn.onclick = () => openRatingModal(examId, examName);
      return;
    }
    modal.dataset.wired = '1';

    const stars = Array.from(modal.querySelectorAll('.star-input__star'));
    const hint = $('#star-hint');
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

    function paint(val) {
      stars.forEach((s) => s.classList.toggle('is-on', Number(s.dataset.star) <= val));
      if (hint) hint.textContent = val ? labels[val] : 'Tap a star to rate';
    }

    stars.forEach((s) => {
      const val = Number(s.dataset.star);
      s.addEventListener('mouseenter', () => paint(val));
      s.addEventListener('click', () => { ratingState.value = val; paint(val); $('#rating-error').hidden = true; });
    });
    const starWrap = $('#star-input');
    starWrap.addEventListener('mouseleave', () => paint(ratingState.value));

    $('#open-rating-btn').onclick = () => openRatingModal(ratingState.examId || examId, examName);
    $('#rating-close').onclick = closeRatingModal;
    $('#rating-skip').onclick = closeRatingModal;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeRatingModal(); });

    $('#rating-submit').onclick = () => {
      if (!ratingState.value) {
        const err = $('#rating-error');
        err.textContent = 'Please tap a star to rate before submitting.';
        err.hidden = false;
        return;
      }
      repo.saveReview(ratingState.examId, {
        rating: ratingState.value,
        name: $('#rating-name').value,
        comment: $('#rating-comment').value,
      });
      closeRatingModal();
      renderReviewsSection(ratingState.examId);
    };
  }

  function openRatingModal(examId, examName) {
    ratingState.examId = examId;
    const modal = $('#rating-modal');
    if (!modal) return;
    const mine = repo.getMyReview(examId);
    ratingState.value = mine ? mine.rating : 0;

    $('#rating-modal-title').textContent = mine ? 'Update your rating' : 'How was this mock?';
    $('#rating-name').value = mine ? (mine.name === 'Anonymous' ? '' : mine.name) : '';
    $('#rating-comment').value = mine ? mine.comment : '';
    $('#rating-error').hidden = true;

    modal.querySelectorAll('.star-input__star').forEach((s) => {
      s.classList.toggle('is-on', Number(s.dataset.star) <= ratingState.value);
    });
    $('#star-hint').textContent = ratingState.value
      ? ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][ratingState.value]
      : 'Tap a star to rate';

    modal.hidden = false;
  }

  function closeRatingModal() {
    const modal = $('#rating-modal');
    if (modal) modal.hidden = true;
  }

  function stat(label, value, mod) {
    return '<div class="result-stat ' + (mod || '') + '">' +
      '<div class="result-stat__label">' + label + '</div>' +
      '<div class="result-stat__value">' + value + '</div>' +
      '</div>';
  }

  function escape(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
})();
