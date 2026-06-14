// JamiaPrep — static SEO page generator.
//
// The app is a hash-router SPA, so Google sees only one page. This script
// pre-renders one crawlable HTML guide per exam track at /exams/<slug>/
// (dates, pattern, syllabus, eligibility, how to apply, paper list, FAQ),
// plus /exams/ hub, sitemap.xml and robots.txt.
//
// Source of truth is the same js/data.js + paper data files the app loads —
// run this after editing exam info or adding a paper, commit the output:
//
//   node tools/build-exam-pages.js
//
// New exam tracks get a page automatically once their catalogue entry has
// `slug` and `info` filled in.

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://jamia-prep.vercel.app';

// ---- Load the app's data files exactly as the browser does ----
// Parse index.html for the *active* (non-commented) js/data*.js script tags so
// unregistered exams stay excluded here too.
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const activeHtml = indexHtml.replace(/<!--[\s\S]*?-->/g, '');
const dataFiles = [...activeHtml.matchAll(/<script src="(js\/data[^"]*\.js)"><\/script>/g)].map((m) => m[1]);
if (!dataFiles.length) throw new Error('No active js/data*.js script tags found in index.html');

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const rel of dataFiles) {
  const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  vm.runInContext(code, sandbox, { filename: rel });
}
const CATALOGUE = sandbox.window.EXAM_CATALOGUE || [];
const EXAMS = sandbox.window.EXAMS || [];
if (!CATALOGUE.length) throw new Error('window.EXAM_CATALOGUE is empty after loading data files');

// ---- Helpers ----
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const today = new Date();
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const updatedHuman = today.getDate() + ' ' + MONTHS[today.getMonth()] + ' ' + today.getFullYear();
const updatedIso = today.toISOString().slice(0, 10);

function papersFor(entryId) {
  return EXAMS
    .filter((e) => e.examCatalogueId === entryId && e.kind === 'pyq' && e.scope === 'full')
    .map((e) => ({
      name: e.name,
      year: e.year || null,
      durationMin: e.durationMin,
      questions: (e.sections || []).reduce((n, s) => n + (s.questions || []).length, 0),
    }))
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

function guideTitle(entry) {
  // "JMI MBA CET" -> "JMI MBA CET Entrance Exam"; avoid double "Entrance"
  return /entrance/i.test(entry.name) ? entry.name : entry.name + ' Entrance Exam';
}

// ---- Page renderer ----
function renderGuide(entry, allEntries) {
  const info = entry.info || {};
  const p = info.pattern || {};
  const d = info.dates || {};
  const a = info.application || {};
  const papers = papersFor(entry.id);
  const cycle = d.cycle || '';
  const title = guideTitle(entry);
  const url = SITE + '/exams/' + entry.slug + '/';
  const appUrl = SITE + '/#/exam/' + entry.id;
  const examDateRow = (d.rows || []).find((r) => r.highlight);

  const pageTitle = title + ' ' + cycle + ': Dates, Syllabus, Pattern & Previous Year Papers — JamiaPrep';
  const metaDesc = title + ' ' + cycle + ' complete guide — important dates' +
    ((d.rows || [])[0] ? ' (' + d.rows[0].label.toLowerCase() + ': ' + d.rows[0].value + ')' : '') +
    (p.totalQuestions ? ', exam pattern (' + p.totalQuestions + ' questions, ' + p.durationMin + ' minutes)' : '') +
    ', full syllabus, eligibility and how to apply' +
    (papers.length ? ', plus ' + papers.length + ' real previous-year paper' + (papers.length === 1 ? '' : 's') + ' you can attempt free online.' : '.');

  // ---- FAQ (visible HTML + matching JSON-LD) ----
  const faqs = [];
  if (examDateRow) {
    faqs.push({
      q: 'When is the ' + title + ' held in ' + cycle + '?',
      a: 'The entrance test: ' + examDateRow.value + '. ' + (d.note || ''),
    });
  }
  if (p.totalQuestions) {
    faqs.push({
      q: 'What is the ' + title + ' pattern?',
      a: p.totalQuestions + ' multiple-choice questions, ' + p.totalMarks + ' marks, ' + p.durationMin +
         ' minutes. ' + (p.marking || ''),
    });
  }
  if (a.fee) {
    faqs.push({ q: 'What is the application fee for ' + title + '?', a: a.fee + ' Applications are made online at admission.jmi.ac.in.' });
  }
  if ((info.eligibility || []).length) {
    faqs.push({ q: 'Who is eligible for ' + title + '?', a: info.eligibility.join(' ') });
  }
  if (papers.length) {
    faqs.push({
      q: 'Where can I practise ' + title + ' previous year question papers?',
      a: 'JamiaPrep has ' + papers.length + ' real ' + entry.name + ' previous-year paper' + (papers.length === 1 ? '' : 's') +
         ' (' + papers.map((x) => x.year).filter(Boolean).join(', ') + ') digitised question by question, free to practise online with a sectional timer, instant scoring and full solutions.',
    });
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'JamiaPrep', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'JMI Exam Guides', item: SITE + '/exams/' },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  // ---- Section builders ----
  const quickFacts = [
    p.totalQuestions != null && ['Questions', p.totalQuestions],
    p.totalMarks != null && ['Total marks', p.totalMarks],
    p.durationMin != null && ['Duration', p.durationMin + ' min'],
    p.mode && ['Mode', p.mode],
    examDateRow && ['Exam date', examDateRow.value],
    a.fee && ['Form fee', (a.fee.match(/^[^—(]+/) || [a.fee])[0].trim()],
  ].filter(Boolean);

  const datesRows = (d.rows || []).map((r) =>
    '<tr' + (r.highlight ? ' class="hl"' : '') + '><th scope="row">' + esc(r.label) + '</th><td>' + esc(r.value) + '</td></tr>'
  ).join('\n            ');

  const patternRows = (p.sections || []).map((s) =>
    '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.questions != null ? s.questions : '—') + '</td><td>' + esc(s.marks != null ? s.marks : '—') + '</td></tr>'
  ).join('\n            ');

  const syllabusBlocks = (info.syllabus || []).map((g) =>
    '<div class="syl">\n          <h3>' + esc(g.section) + '</h3>\n          <ul>' +
    (g.topics || []).map((t) => '<li>' + esc(t) + '</li>').join('') +
    '</ul>\n        </div>'
  ).join('\n        ');

  const eligibilityItems = (info.eligibility || []).map((t) => '<li>' + esc(t) + '</li>').join('\n          ');
  const applySteps = (a.steps || []).map((s) => '<li>' + esc(s) + '</li>').join('\n          ');

  const paperCards = papers.map((x) =>
    '<li class="paper"><b>' + esc(x.name) + '</b><span>' + x.questions + ' questions · ' + x.durationMin +
    ' min · with solutions</span><a href="' + esc(appUrl + '/pyq-full') + '">Attempt free →</a></li>'
  ).join('\n          ');

  const faqHtml = faqs.map((f) =>
    '<details>\n          <summary>' + esc(f.q) + '</summary>\n          <p>' + esc(f.a) + '</p>\n        </details>'
  ).join('\n        ');

  const otherGuides = allEntries.filter((e) => e.id !== entry.id).map((e) =>
    '<a href="/exams/' + esc(e.slug) + '/">' + esc(guideTitle(e)) + '</a>'
  ).join('\n          ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0b4a38" />
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(metaDesc)}" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="JamiaPrep" />
  <meta property="og:title" content="${esc(pageTitle)}" />
  <meta property="og:description" content="${esc(metaDesc)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta name="twitter:card" content="summary" />
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" />
  <link rel="stylesheet" href="/css/exam-guide.css" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <header class="g-header">
    <a class="g-brand" href="/"><img src="/assets/logo-mark.svg" alt="" width="34" height="34" /><span>Jamia<b>Prep</b></span></a>
    <nav>
      <a href="/exams/">All JMI guides</a>
      <a class="g-cta" href="${esc(appUrl)}">Practise this exam free</a>
    </nav>
  </header>

  <main class="g-main">
    <p class="g-crumbs"><a href="/">Home</a> › <a href="/exams/">JMI Exam Guides</a> › ${esc(title)}</p>

    <h1>${esc(title)} ${esc(cycle)} — Dates, Syllabus, Pattern &amp; Previous Year Papers</h1>
    <p class="g-tagline">${esc(entry.tagline)} · Updated ${esc(updatedHuman)}</p>

    <div class="g-facts">
      ${quickFacts.map(([k, v]) => '<div><b>' + esc(v) + '</b><span>' + esc(k) + '</span></div>').join('\n      ')}
    </div>

    <p class="g-intro">Everything you need for the ${esc(title)} in one place — the official ${esc(cycle)} dates,
    the exact exam pattern and marking scheme, the full section-wise syllabus, eligibility, how to apply, and
    ${papers.length ? papers.length + ' real previous-year paper' + (papers.length === 1 ? '' : 's') + ' you can practise free online with a sectional timer, instant scoring and full solutions.' : 'real previous-year papers (being digitised).'}</p>

    <nav class="g-toc" aria-label="On this page">
      <a href="#papers">Previous Year Papers</a><a href="#dates">Important Dates</a><a href="#pattern">Exam Pattern</a><a href="#syllabus">Syllabus</a><a href="#eligibility">Eligibility</a><a href="#apply">How to Apply</a><a href="#faq">FAQ</a>
    </nav>

    <section id="papers">
      <h2>${esc(entry.name)} Previous Year Question Papers — Attempt Free Online</h2>
      <p>Real ${esc(entry.name)} entrance papers, digitised question by question with verified answers and
      solutions, served in a timed online test player with instant scoring. Free — sign in and practise.</p>
      <ul class="g-papers">
          ${paperCards}
      </ul>
      <p><a class="g-btn g-btn--gold" href="${esc(appUrl)}">Open the ${esc(entry.name)} practice track →</a></p>
    </section>

    <section id="dates">
      <h2>${esc(entry.name)} Important Dates ${esc(cycle)}</h2>
      <table class="g-table">
        <tbody>
            ${datesRows}
        </tbody>
      </table>
      ${d.note ? '<p class="g-note">' + esc(d.note) + '</p>' : ''}
    </section>

    <section id="pattern">
      <h2>${esc(entry.name)} Exam Pattern</h2>
      ${p.type ? '<p>' + esc(p.type) + (p.languages ? ' · Medium: ' + esc(p.languages) : '') + '</p>' : ''}
      <table class="g-table">
        <thead><tr><th>Section</th><th>Questions</th><th>Marks</th></tr></thead>
        <tbody>
            ${patternRows}
            <tr class="total"><td>Total — ${p.durationMin != null ? esc(p.durationMin) + ' minutes' : ''}</td><td>${esc(p.totalQuestions != null ? p.totalQuestions : '—')}</td><td>${esc(p.totalMarks != null ? p.totalMarks : '—')}</td></tr>
        </tbody>
      </table>
      ${p.marking ? '<p><b>Marking scheme:</b> ' + esc(p.marking) + '</p>' : ''}
      ${p.footnote ? '<p class="g-note">' + esc(p.footnote) + '</p>' : ''}
    </section>

    <section id="syllabus">
      <h2>${esc(entry.name)} Syllabus — Section by Section</h2>
        ${syllabusBlocks}
    </section>

    <section id="eligibility">
      <h2>Eligibility for ${esc(title)}</h2>
      <ul class="g-list">
          ${eligibilityItems}
      </ul>
    </section>

    <section id="apply">
      <h2>How to Apply</h2>
      ${a.mode ? '<p><b>Mode:</b> ' + esc(a.mode) + '</p>' : ''}
      ${a.fee ? '<p><b>Application fee:</b> ' + esc(a.fee) + '</p>' : ''}
      <ol class="g-list">
          ${applySteps}
      </ol>
      ${a.portal ? '<p><a class="g-btn" href="' + esc(a.portal) + '" target="_blank" rel="noopener">Apply on ' + esc(a.portalLabel || a.portal) + ' ↗</a></p>' : ''}
    </section>

    <section id="faq">
      <h2>Frequently Asked Questions</h2>
        ${faqHtml}
    </section>
  </main>

  <footer class="g-footer">
    <div class="g-footer__cols">
      <nav><h4>JMI exam guides</h4>
          ${otherGuides}
      </nav>
      <nav><h4>JamiaPrep</h4>
        <a href="/">Home</a>
        <a href="${esc(appUrl)}">Practise ${esc(entry.name)}</a>
        <a href="/#/my-tests">My tests</a>
      </nav>
      <nav><h4>Official JMI</h4>
        <a href="https://www.jmi.ac.in" target="_blank" rel="noopener">jmi.ac.in</a>
        <a href="https://admission.jmi.ac.in" target="_blank" rel="noopener">Admissions portal</a>
      </nav>
    </div>
    <p>JamiaPrep is an independent study platform and is <b>not affiliated with or endorsed by Jamia Millia Islamia</b>.
    Exam details are indicative — always confirm with the official JMI notification. Question papers are reproduced for educational practice.</p>
  </footer>
</body>
</html>
`;
}

// ---- Hub page (/exams/) ----
function renderHub(entries) {
  const url = SITE + '/exams/';
  const cards = entries.map((e) => {
    const p = (e.info && e.info.pattern) || {};
    const n = papersFor(e.id).length;
    return '<a class="hub-card" href="/exams/' + esc(e.slug) + '/"><b>' + esc(guideTitle(e)) + '</b><span>' + esc(e.tagline) +
      '</span><span class="hub-meta">' + (p.totalQuestions ? p.totalQuestions + ' Qs · ' + p.durationMin + ' min · ' : '') +
      n + ' previous-year paper' + (n === 1 ? '' : 's') + '</span><span class="hub-go">Dates, syllabus, pattern &amp; papers →</span></a>';
  }).join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0b4a38" />
  <title>JMI Entrance Exam Guides ${esc(String(today.getFullYear()))}: Dates, Syllabus, Pattern &amp; Papers — JamiaPrep</title>
  <meta name="description" content="Guides to every Jamia Millia Islamia entrance exam covered on JamiaPrep — important dates, syllabus, exam pattern, eligibility, application fees and free real previous-year papers." />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="JamiaPrep" />
  <meta property="og:title" content="JMI Entrance Exam Guides — JamiaPrep" />
  <meta property="og:description" content="Dates, syllabus, pattern, eligibility and free previous-year papers for JMI entrance exams." />
  <meta property="og:url" content="${esc(url)}" />
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" />
  <link rel="stylesheet" href="/css/exam-guide.css" />
</head>
<body>
  <header class="g-header">
    <a class="g-brand" href="/"><img src="/assets/logo-mark.svg" alt="" width="34" height="34" /><span>Jamia<b>Prep</b></span></a>
    <nav><a class="g-cta" href="/">Practise free</a></nav>
  </header>
  <main class="g-main">
    <p class="g-crumbs"><a href="/">Home</a> › JMI Exam Guides</p>
    <h1>JMI Entrance Exam Guides</h1>
    <p class="g-tagline">Every Jamia Millia Islamia entrance we cover — dates, syllabus, pattern, eligibility,
    application steps and real previous-year papers you can attempt free. Updated ${esc(updatedHuman)}.</p>
    <div class="hub-grid">
      ${cards}
    </div>
  </main>
  <footer class="g-footer">
    <p>JamiaPrep is an independent study platform and is <b>not affiliated with or endorsed by Jamia Millia Islamia</b>.
    Always confirm details with the official JMI notification.</p>
  </footer>
</body>
</html>
`;
}

// ---- Write everything ----
const entries = CATALOGUE.filter((e) => e.slug && e.info);
const skipped = CATALOGUE.filter((e) => !e.slug || !e.info);
skipped.forEach((e) => console.log('skip (no slug/info): ' + e.id));

const urls = [SITE + '/', SITE + '/exams/'];
for (const entry of entries) {
  const dir = path.join(ROOT, 'exams', entry.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderGuide(entry, entries));
  urls.push(SITE + '/exams/' + entry.slug + '/');
  console.log('wrote exams/' + entry.slug + '/index.html');
}

fs.mkdirSync(path.join(ROOT, 'exams'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'exams', 'index.html'), renderHub(entries));
console.log('wrote exams/index.html');

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => '  <url><loc>' + u + '</loc><lastmod>' + updatedIso + '</lastmod></url>').join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml (' + urls.length + ' URLs)');

fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n');
console.log('wrote robots.txt');
