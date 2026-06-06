// Mockly — Tiny CSV parser & question importer.
// Handles RFC-4180-ish quoting: "text with, comma","escaped ""quotes""",linebreaks-inside-quotes.

(function () {
  'use strict';

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cur = '';
    let i = 0;
    let inQuotes = false;
    const n = text.length;

    while (i < n) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { cur += '"'; i += 2; continue; }
          inQuotes = false; i++; continue;
        }
        cur += c; i++; continue;
      }
      if (c === '"') { inQuotes = true; i++; continue; }
      if (c === ',') { row.push(cur); cur = ''; i++; continue; }
      if (c === '\r') { i++; continue; }
      if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; i++; continue; }
      cur += c; i++;
    }
    // Flush trailing field/row.
    if (cur.length > 0 || row.length > 0) { row.push(cur); rows.push(row); }
    // Drop fully-empty trailing rows.
    while (rows.length && rows[rows.length - 1].every((f) => f === '')) rows.pop();
    return rows;
  }

  function toRecords(text) {
    const rows = parseCSV(text);
    if (rows.length < 2) return [];
    const headers = rows[0].map((h) => h.trim().toLowerCase());
    return rows.slice(1).map((r) => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = (r[i] || '').trim(); });
      return obj;
    });
  }

  // Import MCQ questions into an exam.
  // Expected columns:
  //   section_id, question_text, option_a, option_b, option_c, option_d, correct, topic, difficulty, explanation
  // `correct` is a letter A|B|C|D (1-indexed for humans).
  function importQuestionsCSV(exam, csvText) {
    const records = toRecords(csvText);
    const errors = [];
    let added = 0;
    const sectionsById = {};
    (exam.sections || []).forEach((s) => { sectionsById[s.id] = s; });

    records.forEach((r, i) => {
      const where = 'Row ' + (i + 2);
      const sid = r.section_id;
      if (!sid) { errors.push(where + ': missing section_id'); return; }
      const sec = sectionsById[sid];
      if (!sec) { errors.push(where + ': section_id "' + sid + '" not found in this exam'); return; }
      const txt = r.question_text;
      if (!txt) { errors.push(where + ': missing question_text'); return; }
      const opts = [r.option_a, r.option_b, r.option_c, r.option_d];
      if (opts.some((o) => !o)) { errors.push(where + ': all four options (option_a..option_d) are required'); return; }
      const letter = (r.correct || '').toUpperCase();
      const correctIdx = { A: 0, B: 1, C: 2, D: 3 }[letter];
      if (correctIdx === undefined) { errors.push(where + ': "correct" must be A, B, C, or D'); return; }
      sec.questions.push({
        id: 'q-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6),
        type: 'mcq',
        text: txt,
        format: 'text',
        options: opts,
        correct: correctIdx,
        topic: r.topic || '',
        difficulty: r.difficulty || 'medium',
        explanation: r.explanation || '',
        explanationFormat: 'text',
      });
      added++;
    });

    return { added, skipped: errors.length, errors };
  }

  window.csvUtil = { parseCSV, toRecords, importQuestionsCSV };
})();
