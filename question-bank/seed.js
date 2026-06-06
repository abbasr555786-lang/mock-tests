#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { glob } = require('glob');

const Exam = require('./schema/exam.schema');
const Question = require('./schema/question.schema');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/question_bank';
const DATA_DIR = path.join(__dirname, 'data', 'exams');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const RESET = args.has('--reset');

const log = (...m) => console.log('[seed]', ...m);
const warn = (...m) => console.warn('[seed][warn]', ...m);
const err = (...m) => console.error('[seed][err]', ...m);

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    err(`Failed to parse ${file}: ${e.message}`);
    return null;
  }
}

function validateDifficultyDistribution(questions, topic) {
  const byDiff = { easy: 0, medium: 0, hard: 0 };
  for (const q of questions) byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
  const total = questions.length;
  if (total < 10) return;
  const pct = d => Math.round((byDiff[d] / total) * 100);
  const targets = { easy: 33, medium: 40, hard: 27 };
  for (const d of Object.keys(targets)) {
    const diff = Math.abs(pct(d) - targets[d]);
    if (diff > 10) {
      warn(`Topic "${topic}": ${d}=${pct(d)}% (target ${targets[d]}%, deviation ${diff}%)`);
    }
  }
}

function validateQuestion(q, file) {
  const errors = [];
  if (!/^[A-Z]+-[a-z0-9]+-\d{3}$/.test(q.questionId || '')) {
    errors.push(`bad questionId "${q.questionId}"`);
  }
  if (!q.solution || !q.solution.explanation) errors.push('missing solution.explanation');
  if (['MCQ', 'MSQ', 'AssertionReason'].includes(q.type)) {
    if (!q.options || q.options.length < 2) errors.push('needs >=2 options');
    else if (!q.options.some(o => o.isCorrect)) errors.push('no correct option marked');
  }
  if (q.isPYQ && (!q.year || !q.source)) errors.push('PYQ missing year/source');
  if (errors.length) err(`${file} :: ${q.questionId}: ${errors.join('; ')}`);
  return errors.length === 0;
}

async function loadExams() {
  const metaFiles = await glob('*/metadata.json', { cwd: DATA_DIR, absolute: true });
  const exams = [];
  for (const f of metaFiles) {
    const data = readJson(f);
    if (!data) continue;
    if (!data.code || !data.fullForm) { err(`${f}: missing code/fullForm`); continue; }
    exams.push(data);
  }
  log(`Found ${exams.length} exam metadata file(s).`);
  return exams;
}

async function loadQuestions() {
  const qFiles = await glob('*/questions/**/*.json', { cwd: DATA_DIR, absolute: true });
  const all = [];
  const seenIds = new Set();
  for (const f of qFiles) {
    const data = readJson(f);
    if (!data) continue;
    const arr = Array.isArray(data) ? data : [data];
    for (const q of arr) {
      if (!validateQuestion(q, f)) continue;
      if (seenIds.has(q.questionId)) { err(`Duplicate questionId ${q.questionId} in ${f}`); continue; }
      seenIds.add(q.questionId);
      all.push(q);
    }
  }
  const byTopic = all.reduce((m, q) => ((m[q.topic] = m[q.topic] || []).push(q), m), {});
  for (const t of Object.keys(byTopic)) validateDifficultyDistribution(byTopic[t], t);
  log(`Found ${all.length} valid question(s).`);
  return all;
}

async function main() {
  const exams = await loadExams();
  const questions = await loadQuestions();

  if (DRY_RUN) {
    log('Dry run complete. No DB writes.');
    log(`Summary: ${exams.length} exams, ${questions.length} questions.`);
    return;
  }

  log(`Connecting to ${MONGO_URI} ...`);
  await mongoose.connect(MONGO_URI);

  if (RESET) {
    warn('--reset: dropping Exam and Question collections.');
    await Promise.all([Exam.deleteMany({}), Question.deleteMany({})]);
  }

  let examUp = 0;
  for (const e of exams) {
    await Exam.updateOne({ code: e.code }, { $set: e }, { upsert: true });
    examUp++;
  }
  log(`Upserted ${examUp} exam(s).`);

  let qUp = 0, qFail = 0;
  for (const q of questions) {
    try {
      await Question.updateOne({ questionId: q.questionId }, { $set: q }, { upsert: true, runValidators: true });
      qUp++;
    } catch (e) {
      qFail++;
      err(`${q.questionId}: ${e.message}`);
    }
  }
  log(`Upserted ${qUp} question(s); ${qFail} failed.`);

  await mongoose.disconnect();
  log('Done.');
}

main().catch(e => { err(e); process.exit(1); });
