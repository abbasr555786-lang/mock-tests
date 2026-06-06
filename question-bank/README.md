# Question Bank

Multi-exam question bank with Mongoose schemas and a JSON-driven seed loader.

## Structure

```
question-bank/
  schema/
    exam.schema.js       # Exam metadata + marking scheme
    question.schema.js   # Questions with validation
  data/exams/
    jee/metadata.json
    jee/questions/*.json
    neet/metadata.json
    upsc/metadata.json
    cat/metadata.json
    gate/metadata.json
  seed.js
```

## Question ID format

`{EXAM}-{subject-short}-{NNN}` (e.g. `JEE-phy-001`, `NEET-bot-014`).

Subject short codes are listed in each exam's `metadata.json` under `metadata.subjectShortCodes`.

## Rules enforced by seed.js

- Unique `questionId` (regex-validated).
- Every question must have `solution.explanation`.
- MCQ/MSQ/AR: >= 2 options, at least one correct.
- PYQ requires `year` and `source` (e.g. `"JEE Main 2023 Paper 1"`).
- Per-topic difficulty distribution warning if it deviates >10% from 33/40/27.

## Usage

```bash
cd question-bank
npm install
MONGO_URI=mongodb://127.0.0.1:27017/question_bank npm run seed
```

Flags:

- `--dry-run` — validate only, no DB writes
- `--reset` — wipe `Exam` and `Question` collections before seeding

## Adding questions

Drop a JSON file (single object or array) under
`data/exams/<exam>/questions/<anything>.json`. The seeder globs recursively.
