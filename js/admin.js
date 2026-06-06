// Mockly — Admin panel.
// Views build their own DOM (no <template> dependency) and mount into #app.
// Rich text via Quill (CDN), math via KaTeX auto-render (CDN). Both load lazily.

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);

  // ---------- Lazy CDN loaders ----------
  const QUILL_CSS = 'https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css';
  const QUILL_JS = 'https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js';
  const KATEX_CSS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
  const KATEX_JS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
  const KATEX_AUTO_JS = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';

  function loadCSS(href) {
    if (document.querySelector('link[href="' + href + '"]')) return Promise.resolve();
    return new Promise((res, rej) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href;
      l.onload = res; l.onerror = () => rej(new Error('Failed to load ' + href));
      document.head.appendChild(l);
    });
  }
  function loadJS(src) {
    if (document.querySelector('script[src="' + src + '"]')) return Promise.resolve();
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.async = false;
      s.onload = res; s.onerror = () => rej(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }
  async function ensureQuill() {
    if (window.Quill) return;
    await loadCSS(QUILL_CSS);
    await loadJS(QUILL_JS);
  }
  async function ensureKatex() {
    if (window.katex && window.renderMathInElement) return;
    await loadCSS(KATEX_CSS);
    await loadJS(KATEX_JS);
    await loadJS(KATEX_AUTO_JS);
  }

  // Run KaTeX over a node — call after rendering admin previews or student questions.
  window.renderMathIn = async function (el) {
    if (!el) return;
    try {
      await ensureKatex();
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      });
    } catch (e) { console.warn('KaTeX render failed', e); }
  };

  // ---------- Tiny DOM helpers ----------
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === false || v == null) return;
      if (k === 'class') node.className = v;
      else if (k === 'style') node.setAttribute('style', v);
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'html') node.innerHTML = v;
      else node.setAttribute(k, v);
    });
    children.flat().forEach((c) => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function mountAdmin(node) {
    const app = $('#app');
    app.innerHTML = '';
    app.appendChild(buildTopbar());
    app.appendChild(node);
  }

  function buildTopbar() {
    return el('header', { class: 'topbar' },
      el('div', { class: 'topbar__inner' },
        el('div', { class: 'brand' }, 'Mockly — Admin'),
        el('nav', { class: 'topbar__nav' },
          el('a', { class: 'topbar__link', href: '#/admin' }, 'Exams'),
          el('a', { class: 'topbar__link', href: '#/' }, 'Student View'),
        )
      )
    );
  }

  function storageBar() {
    const used = window.repo.usageBytes();
    const cap = 5 * 1024 * 1024; // assume 5MB conservatively
    const pct = Math.min(100, Math.round((used / cap) * 100));
    const warn = used > 4 * 1024 * 1024;
    return el('div', { class: 'storage-bar' + (warn ? ' warn' : '') },
      el('span', {}, 'Storage used: ' + formatBytes(used) + ' / ~5 MB (' + pct + '%)'),
      el('div', { class: 'storage-bar__track' },
        el('div', { class: 'storage-bar__fill', style: 'width:' + pct + '%' })
      ),
      warn ? el('span', { class: 'storage-bar__warn' }, '⚠ Near capacity — export to JSON to back up before localStorage fills.') : null
    );
  }

  function formatBytes(b) {
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1024 / 1024).toFixed(2) + ' MB';
  }

  function confirmDialog(message) { return window.confirm(message); }

  function toast(msg, kind = 'info') {
    const t = el('div', { class: 'toast toast--' + kind }, msg);
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('toast--show'), 10);
    setTimeout(() => { t.classList.remove('toast--show'); setTimeout(() => t.remove(), 300); }, 2600);
  }

  // ---------- Admin home ----------
  function renderAdminHome() {
    if (!window.repo.isAdmin()) {
      mountAdmin(el('main', { class: 'container' },
        el('h1', { class: 'page-title' }, 'Admin Access Required'),
        el('p', {}, 'You are not in admin mode. Click below to switch this browser into admin mode.'),
        el('div', { class: 'actions-row' },
          el('button', {
            class: 'btn btn--primary',
            onclick: () => { window.repo.setRole('admin'); route(); }
          }, 'Enable admin mode'),
          el('a', { class: 'btn btn--ghost', href: '#/' }, 'Back to student view'),
        )
      ));
      return;
    }

    const exams = window.repo.listExams();
    const main = el('main', { class: 'container' });
    main.appendChild(el('h1', { class: 'page-title' }, 'Admin — Exams'));
    main.appendChild(storageBar());

    const toolbar = el('div', { class: 'actions-row' },
      el('button', {
        class: 'btn btn--primary',
        onclick: () => {
          const exam = window.repo.createBlankExam();
          window.repo.saveExam(exam);
          window.location.hash = '#/admin/exam/' + exam.id;
        }
      }, '+ New Exam'),
      el('button', { class: 'btn btn--ghost', onclick: handleExportAll }, 'Export all (JSON)'),
      el('button', { class: 'btn btn--ghost', onclick: handleImport }, 'Import JSON…'),
      el('button', {
        class: 'btn btn--ghost',
        onclick: () => { window.repo.setRole('student'); window.location.hash = '#/'; }
      }, 'Exit admin'),
      el('button', {
        class: 'btn btn--danger',
        onclick: () => {
          if (confirmDialog('Reset ALL exams to the original seed? This wipes every exam you have created.')) {
            window.repo.resetAll(); route();
            toast('Database reset to seed', 'info');
          }
        }
      }, 'Reset all'),
    );
    main.appendChild(toolbar);

    if (!exams.length) {
      main.appendChild(el('p', { class: 'page-sub' }, 'No exams yet. Click + New Exam to begin.'));
    } else {
      const table = el('table', { class: 'admin-table' },
        el('thead', {}, el('tr', {},
          el('th', {}, 'Name'),
          el('th', {}, 'Template'),
          el('th', {}, 'Sections'),
          el('th', {}, 'Questions'),
          el('th', {}, 'Duration'),
          el('th', {}, 'Status'),
          el('th', {}, 'Actions'),
        ))
      );
      const tbody = el('tbody');
      exams.forEach((ex) => {
        const totalQ = ex.sections.reduce((n, s) => n + s.questions.length, 0);
        tbody.appendChild(el('tr', {},
          el('td', {}, el('a', { href: '#/admin/exam/' + ex.id }, ex.name)),
          el('td', {}, ex.template.toUpperCase()),
          el('td', {}, String(ex.sections.length)),
          el('td', {}, String(totalQ)),
          el('td', {}, ex.durationMin + ' min'),
          el('td', {},
            el('span', { class: 'badge ' + (ex.published ? 'badge--ok' : 'badge--draft') },
              ex.published ? 'Published' : 'Draft')
          ),
          el('td', {},
            el('a', { class: 'btn btn--ghost btn--xs', href: '#/admin/exam/' + ex.id }, 'Edit'),
            el('button', {
              class: 'btn btn--ghost btn--xs',
              onclick: () => togglePublish(ex)
            }, ex.published ? 'Unpublish' : 'Publish'),
            el('button', {
              class: 'btn btn--danger btn--xs',
              onclick: () => {
                if (confirmDialog('Delete exam "' + ex.name + '"? This cannot be undone.')) {
                  window.repo.deleteExam(ex.id); route();
                }
              }
            }, 'Delete'),
          ),
        ));
      });
      table.appendChild(tbody);
      main.appendChild(table);
    }

    mountAdmin(main);
  }

  function togglePublish(ex) {
    if (!ex.published) {
      const errs = window.repo.validateExam(ex);
      if (errs.length) {
        alert('Cannot publish — fix these issues:\n\n• ' + errs.join('\n• '));
        return;
      }
    }
    window.repo.publishExam(ex.id, !ex.published);
    route();
  }

  function handleExportAll() {
    const json = window.repo.exportExams();
    download(json, 'mockcbt-exams-' + Date.now() + '.json', 'application/json');
  }

  function handleImport() {
    const inp = el('input', { type: 'file', accept: '.json,application/json' });
    inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const res = window.repo.importExams(reader.result);
          toast(`Imported: ${res.added} added, ${res.updated} updated`, 'ok');
          route();
        } catch (e) {
          alert('Import failed: ' + e.message);
        }
      };
      reader.readAsText(f);
    });
    inp.click();
  }

  function download(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  // ---------- Exam editor ----------
  function renderAdminExam(examId) {
    if (!window.repo.isAdmin()) { window.location.hash = '#/admin'; return; }
    const exam = window.repo.getExam(examId);
    if (!exam) { window.location.hash = '#/admin'; return; }

    const main = el('main', { class: 'container' });
    main.appendChild(el('div', { class: 'crumbs' },
      el('a', { href: '#/admin' }, '← All exams'),
      el('span', {}, ' / '),
      el('strong', {}, exam.name),
    ));

    main.appendChild(el('h1', { class: 'page-title' }, 'Edit Exam'));

    // Metadata form
    const f = el('div', { class: 'form-grid' });
    const fields = [
      input(f, 'Exam name', exam.name, (v) => exam.name = v),
      selectField(f, 'Template', exam.template, [
        ['ssc', 'SSC / Govt CBT'],
        ['nta', 'NTA (JEE / CUET / UGC-NET)'],
        ['cat', 'CAT (per-section timer, section lock)'],
        ['gate', 'GATE (calculator, MSQ, numerical)'],
      ], (v) => exam.template = v),
      numberField(f, 'Duration (minutes)', exam.durationMin, (v) => exam.durationMin = v),
      numberField(f, 'Marks: correct', exam.marking.correct, (v) => exam.marking.correct = v),
      numberField(f, 'Marks: wrong', exam.marking.wrong, (v) => exam.marking.wrong = v),
      numberField(f, 'Marks: unattempted', exam.marking.unattempted, (v) => exam.marking.unattempted = v),
      checkboxField(f, 'Allow section switching', exam.allowSectionSwitch, (v) => exam.allowSectionSwitch = v),
      checkboxField(f, 'Calculator allowed (GATE)', exam.calculator, (v) => exam.calculator = v),
      selectField(f, 'Timer mode', exam.timerMode, [
        ['full', 'Single overall timer'],
        ['per-section', 'Per-section timer (CAT/GATE)'],
      ], (v) => exam.timerMode = v),
    ];
    main.appendChild(el('div', { class: 'panel' },
      el('h2', {}, 'Metadata'),
      f,
      el('div', { class: 'actions-row' },
        el('button', {
          class: 'btn btn--primary',
          onclick: () => { window.repo.saveExam(exam); toast('Saved', 'ok'); }
        }, 'Save Metadata'),
        el('button', {
          class: 'btn ' + (exam.published ? 'btn--warn' : 'btn--success'),
          onclick: () => togglePublish(exam),
        }, exam.published ? 'Unpublish' : 'Publish'),
        el('button', {
          class: 'btn btn--ghost',
          onclick: () => download(JSON.stringify({ exams: [exam] }, null, 2), 'exam-' + exam.id + '.json', 'application/json')
        }, 'Export this exam'),
        el('button', { class: 'btn btn--ghost', onclick: () => importCSVForExam(exam) }, 'Bulk import CSV…'),
      )
    ));

    // Sections panel
    const secsPanel = el('div', { class: 'panel' },
      el('div', { class: 'panel-head' },
        el('h2', {}, 'Sections'),
        el('button', {
          class: 'btn btn--primary',
          onclick: () => {
            exam.sections.push(window.repo.createBlankSection());
            window.repo.saveExam(exam); route();
          }
        }, '+ Add section'),
      )
    );
    const secList = el('ul', { class: 'reorder-list' });
    exam.sections.forEach((sec, idx) => {
      secList.appendChild(buildSectionRow(exam, sec, idx));
    });
    enableReorder(secList, (from, to) => {
      const [m] = exam.sections.splice(from, 1);
      exam.sections.splice(to, 0, m);
      window.repo.saveExam(exam); route();
    });
    secsPanel.appendChild(secList);
    if (exam.sections.length === 0) {
      secsPanel.appendChild(el('p', { class: 'page-sub' }, 'No sections yet. Add one to start authoring questions.'));
    }
    main.appendChild(secsPanel);

    mountAdmin(main);
  }

  function buildSectionRow(exam, sec, idx) {
    const li = el('li', { class: 'reorder-item', draggable: 'true' },
      el('span', { class: 'drag-handle', title: 'Drag to reorder' }, '⋮⋮'),
      el('div', { class: 'reorder-main' },
        el('div', { class: 'reorder-title' },
          el('a', { href: '#/admin/exam/' + exam.id + '/section/' + sec.id }, sec.name || '(Untitled section)')
        ),
        el('div', { class: 'reorder-sub' },
          (sec.questions.length) + ' question' + (sec.questions.length === 1 ? '' : 's') +
          ' · section_id: ' + sec.id),
      ),
      el('div', { class: 'reorder-actions' },
        el('a', { class: 'btn btn--ghost btn--xs', href: '#/admin/exam/' + exam.id + '/section/' + sec.id }, 'Open'),
        el('button', {
          class: 'btn btn--ghost btn--xs',
          onclick: () => {
            const name = prompt('Section name', sec.name);
            if (name) { sec.name = name.trim(); window.repo.saveExam(exam); route(); }
          }
        }, 'Rename'),
        el('button', {
          class: 'btn btn--danger btn--xs',
          onclick: () => {
            if (confirmDialog('Delete section "' + sec.name + '" and all its questions?')) {
              exam.sections.splice(idx, 1); window.repo.saveExam(exam); route();
            }
          }
        }, 'Delete'),
      )
    );
    li.dataset.idx = idx;
    return li;
  }

  function importCSVForExam(exam) {
    const inp = el('input', { type: 'file', accept: '.csv,text/csv' });
    inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const res = window.csvUtil.importQuestionsCSV(exam, reader.result);
        window.repo.saveExam(exam);
        let msg = res.added + ' added, ' + res.skipped + ' skipped.';
        if (res.errors.length) msg += '\n\nFirst issues:\n• ' + res.errors.slice(0, 8).join('\n• ');
        alert(msg);
        route();
      };
      reader.readAsText(f);
    });
    inp.click();
  }

  // ---------- Section editor (questions list) ----------
  function renderAdminSection(examId, sectionId) {
    if (!window.repo.isAdmin()) { window.location.hash = '#/admin'; return; }
    const exam = window.repo.getExam(examId); if (!exam) return goto('#/admin');
    const sec = exam.sections.find((s) => s.id === sectionId); if (!sec) return goto('#/admin/exam/' + examId);

    const main = el('main', { class: 'container' });
    main.appendChild(el('div', { class: 'crumbs' },
      el('a', { href: '#/admin' }, '← All exams'),
      el('span', {}, ' / '),
      el('a', { href: '#/admin/exam/' + exam.id }, exam.name),
      el('span', {}, ' / '),
      el('strong', {}, sec.name),
    ));

    main.appendChild(el('h1', { class: 'page-title' }, 'Section — ' + sec.name));

    const toolbar = el('div', { class: 'actions-row' },
      el('button', {
        class: 'btn btn--primary',
        onclick: () => addQuestion(exam, sec, 'mcq')
      }, '+ Add MCQ'),
      el('button', {
        class: 'btn btn--ghost',
        onclick: () => addQuestion(exam, sec, 'numerical')
      }, '+ Add Numerical'),
      el('button', { class: 'btn btn--ghost', onclick: () => importCSVForExam(exam) }, 'Bulk import CSV…'),
    );
    main.appendChild(toolbar);

    const list = el('ul', { class: 'reorder-list' });
    sec.questions.forEach((q, idx) => list.appendChild(buildQuestionRow(exam, sec, q, idx)));
    enableReorder(list, (from, to) => {
      const [m] = sec.questions.splice(from, 1);
      sec.questions.splice(to, 0, m);
      window.repo.saveExam(exam); route();
    });
    main.appendChild(list);
    if (sec.questions.length === 0) {
      main.appendChild(el('p', { class: 'page-sub' }, 'No questions yet.'));
    }
    mountAdmin(main);

    // Render any math previews on this page (question text snippets).
    window.renderMathIn(main);
  }

  function buildQuestionRow(exam, sec, q, idx) {
    const li = el('li', { class: 'reorder-item', draggable: 'true' });
    li.dataset.idx = idx;
    const preview = el('div', { class: 'q-preview', html: q.format === 'html' ? (q.text || '(empty)') : escapeText(q.text || '(empty)') });
    li.append(
      el('span', { class: 'drag-handle' }, '⋮⋮'),
      el('div', { class: 'reorder-main' },
        el('div', { class: 'reorder-title' },
          el('span', { class: 'badge badge--type' }, q.type.toUpperCase()),
          ' Q' + (idx + 1)),
        preview,
        el('div', { class: 'reorder-sub' },
          (q.topic ? 'Topic: ' + q.topic + ' · ' : '') +
          'Difficulty: ' + q.difficulty),
      ),
      el('div', { class: 'reorder-actions' },
        el('a', {
          class: 'btn btn--ghost btn--xs',
          href: '#/admin/question/' + exam.id + '/' + sec.id + '/' + q.id
        }, 'Edit'),
        el('button', {
          class: 'btn btn--danger btn--xs',
          onclick: () => {
            if (confirmDialog('Delete this question?')) {
              sec.questions.splice(idx, 1); window.repo.saveExam(exam); route();
            }
          }
        }, 'Delete'),
      )
    );
    return li;
  }

  function addQuestion(exam, sec, type) {
    const q = window.repo.createBlankQuestion(type);
    sec.questions.push(q);
    window.repo.saveExam(exam);
    window.location.hash = '#/admin/question/' + exam.id + '/' + sec.id + '/' + q.id;
  }

  // ---------- Question editor ----------
  async function renderAdminQuestion(examId, sectionId, questionId) {
    if (!window.repo.isAdmin()) { window.location.hash = '#/admin'; return; }
    const exam = window.repo.getExam(examId); if (!exam) return goto('#/admin');
    const sec = exam.sections.find((s) => s.id === sectionId); if (!sec) return goto('#/admin/exam/' + examId);
    const qIdx = sec.questions.findIndex((q) => q.id === questionId);
    if (qIdx < 0) return goto('#/admin/exam/' + examId + '/section/' + sectionId);
    const q = sec.questions[qIdx];

    await ensureQuill();

    const main = el('main', { class: 'container' });
    main.appendChild(el('div', { class: 'crumbs' },
      el('a', { href: '#/admin' }, '← All exams'),
      el('span', {}, ' / '),
      el('a', { href: '#/admin/exam/' + exam.id }, exam.name),
      el('span', {}, ' / '),
      el('a', { href: '#/admin/exam/' + exam.id + '/section/' + sec.id }, sec.name),
      el('span', {}, ' / '),
      el('strong', {}, 'Q' + (qIdx + 1) + ' (' + q.type.toUpperCase() + ')'),
    ));

    main.appendChild(el('p', { class: 'page-sub' },
      'Tip: wrap inline math in $...$, block math in $$...$$. KaTeX renders both for students.'));

    // Question text editor
    const qEditorDiv = el('div', { id: 'q-editor', class: 'rich-editor' });
    main.appendChild(el('div', { class: 'panel' },
      el('h2', {}, 'Question Text'),
      qEditorDiv,
    ));

    // Type-specific
    let getOptions = null, getCorrect = null, getNumeric = null;
    if (q.type === 'mcq') {
      const optsPanel = el('div', { class: 'panel' }, el('h2', {}, 'Options (MCQ)'));
      const letters = ['A', 'B', 'C', 'D'];
      const optionInputs = [];
      letters.forEach((L, i) => {
        const row = el('div', { class: 'option-row' });
        const radio = el('input', { type: 'radio', name: 'correct', value: String(i) });
        if (q.correct === i) radio.checked = true;
        const ta = el('textarea', { class: 'option-input', rows: '2' }, q.options[i] || '');
        ta.value = q.options[i] || '';
        row.append(el('label', { class: 'option-letter' }, L + '.'), radio, ta);
        optionInputs.push({ ta, radio });
        optsPanel.appendChild(row);
      });
      main.appendChild(optsPanel);
      getOptions = () => optionInputs.map((x) => x.ta.value);
      getCorrect = () => {
        const found = optionInputs.findIndex((x) => x.radio.checked);
        return found >= 0 ? found : 0;
      };
    } else {
      const numPanel = el('div', { class: 'panel' }, el('h2', {}, 'Numerical Answer'));
      const answerInput = el('input', { type: 'number', step: 'any' });
      answerInput.value = String(q.answer);
      const tolInput = el('input', { type: 'number', step: 'any', min: '0' });
      tolInput.value = String(q.tolerance);
      numPanel.append(
        el('div', { class: 'form-row' }, el('label', {}, 'Correct answer'), answerInput),
        el('div', { class: 'form-row' }, el('label', {}, 'Tolerance (±)'), tolInput),
        el('p', { class: 'page-sub' }, 'A student answer is correct if |answer − their value| ≤ tolerance.'),
      );
      main.appendChild(numPanel);
      getNumeric = () => ({
        answer: parseFloat(answerInput.value) || 0,
        tolerance: parseFloat(tolInput.value) || 0,
      });
    }

    // Metadata
    const topicInp = el('input', { type: 'text' }); topicInp.value = q.topic || '';
    const diffSel = el('select');
    ['easy', 'medium', 'hard'].forEach((d) => {
      const o = el('option', { value: d }, d.charAt(0).toUpperCase() + d.slice(1));
      if (q.difficulty === d) o.selected = true;
      diffSel.appendChild(o);
    });
    main.appendChild(el('div', { class: 'panel' },
      el('h2', {}, 'Metadata'),
      el('div', { class: 'form-row' }, el('label', {}, 'Topic'), topicInp),
      el('div', { class: 'form-row' }, el('label', {}, 'Difficulty'), diffSel),
    ));

    // Explanation editor
    const explDiv = el('div', { id: 'expl-editor', class: 'rich-editor rich-editor--small' });
    main.appendChild(el('div', { class: 'panel' },
      el('h2', {}, 'Explanation (shown on result page)'),
      explDiv,
    ));

    // Action bar
    main.appendChild(el('div', { class: 'actions-row' },
      el('button', {
        class: 'btn btn--primary',
        onclick: () => {
          q.text = qQuill.root.innerHTML;
          q.format = 'html';
          q.explanation = explQuill.root.innerHTML;
          q.explanationFormat = 'html';
          q.topic = topicInp.value.trim();
          q.difficulty = diffSel.value;
          if (q.type === 'mcq') {
            q.options = getOptions();
            q.correct = getCorrect();
          } else {
            const n = getNumeric();
            q.answer = n.answer; q.tolerance = n.tolerance;
          }
          window.repo.saveExam(exam);
          toast('Saved', 'ok');
        }
      }, 'Save question'),
      el('a', {
        class: 'btn btn--ghost',
        href: '#/admin/exam/' + exam.id + '/section/' + sec.id
      }, 'Back to section'),
      qIdx > 0 ? el('a', {
        class: 'btn btn--ghost',
        href: '#/admin/question/' + exam.id + '/' + sec.id + '/' + sec.questions[qIdx - 1].id
      }, '← Previous Q') : null,
      qIdx < sec.questions.length - 1 ? el('a', {
        class: 'btn btn--ghost',
        href: '#/admin/question/' + exam.id + '/' + sec.id + '/' + sec.questions[qIdx + 1].id
      }, 'Next Q →') : null,
    ));

    mountAdmin(main);

    // Initialise Quill instances after DOM mount.
    const toolbar = [
      ['bold', 'italic', 'underline'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['image', 'link'],
      ['clean'],
    ];

    const qQuill = new window.Quill('#q-editor', { theme: 'snow', modules: { toolbar } });
    const explQuill = new window.Quill('#expl-editor', { theme: 'snow', modules: { toolbar } });

    // Seed initial HTML.
    if (q.text) {
      if (q.format === 'html') qQuill.root.innerHTML = q.text;
      else qQuill.setText(q.text);
    }
    if (q.explanation) {
      if (q.explanationFormat === 'html') explQuill.root.innerHTML = q.explanation;
      else explQuill.setText(q.explanation);
    }

    // Override image handlers to resize + cap base64 payload.
    [qQuill, explQuill].forEach((quill) => {
      quill.getModule('toolbar').addHandler('image', () => pickAndInsertImage(quill));
    });
  }

  function pickAndInsertImage(quill) {
    const inp = el('input', { type: 'file', accept: 'image/*' });
    inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      if (f.size > 5 * 1024 * 1024) { alert('Image too large (>5MB). Pick a smaller one.'); return; }
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 800;
          let { width, height } = img;
          if (width > max || height > max) {
            const r = Math.min(max / width, max / height);
            width = Math.round(width * r); height = Math.round(height * r);
          }
          const c = document.createElement('canvas');
          c.width = width; c.height = height;
          c.getContext('2d').drawImage(img, 0, 0, width, height);
          const dataUrl = c.toDataURL('image/jpeg', 0.85);
          if (dataUrl.length > 250 * 1024) {
            alert('Resized image is still large (>250KB). Try a simpler image.');
          }
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', dataUrl, 'user');
          quill.setSelection(range.index + 1);
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(f);
    });
    inp.click();
  }

  // ---------- Drag reorder ----------
  function enableReorder(listEl, onReorder) {
    let dragFrom = null;
    listEl.addEventListener('dragstart', (e) => {
      const li = e.target.closest('li.reorder-item'); if (!li) return;
      dragFrom = Number(li.dataset.idx);
      e.dataTransfer.effectAllowed = 'move';
      li.classList.add('dragging');
    });
    listEl.addEventListener('dragend', (e) => {
      const li = e.target.closest('li.reorder-item');
      if (li) li.classList.remove('dragging');
    });
    listEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      const li = e.target.closest('li.reorder-item');
      if (!li) return;
      li.classList.add('drag-over');
    });
    listEl.addEventListener('dragleave', (e) => {
      const li = e.target.closest('li.reorder-item');
      if (li) li.classList.remove('drag-over');
    });
    listEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const li = e.target.closest('li.reorder-item');
      if (!li || dragFrom == null) return;
      li.classList.remove('drag-over');
      const to = Number(li.dataset.idx);
      if (to === dragFrom) return;
      onReorder(dragFrom, to);
      dragFrom = null;
    });
  }

  // ---------- Small form helpers ----------
  function input(parent, label, value, onchange) {
    const inp = el('input', { type: 'text' }); inp.value = value || '';
    inp.addEventListener('change', () => onchange(inp.value));
    parent.append(el('label', {}, label, inp));
    return inp;
  }
  function numberField(parent, label, value, onchange) {
    const inp = el('input', { type: 'number', step: 'any' }); inp.value = String(value);
    inp.addEventListener('change', () => onchange(parseFloat(inp.value)));
    parent.append(el('label', {}, label, inp));
    return inp;
  }
  function checkboxField(parent, label, value, onchange) {
    const inp = el('input', { type: 'checkbox' }); inp.checked = !!value;
    inp.addEventListener('change', () => onchange(inp.checked));
    const wrap = el('label', { class: 'form-check' }, inp, el('span', {}, label));
    parent.append(wrap);
    return inp;
  }
  function selectField(parent, label, value, options, onchange) {
    const sel = el('select');
    options.forEach(([v, l]) => {
      const o = el('option', { value: v }, l);
      if (v === value) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => onchange(sel.value));
    parent.append(el('label', {}, label, sel));
    return sel;
  }

  function escapeText(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }
  function goto(hash) { window.location.hash = hash; }
  function route() { window.dispatchEvent(new HashChangeEvent('hashchange')); }

  // ---------- Public exports ----------
  window.admin = {
    renderAdminHome,
    renderAdminExam,
    renderAdminSection,
    renderAdminQuestion,
  };
})();
