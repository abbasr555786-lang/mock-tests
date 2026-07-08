# JMI Results watcher — runbook (for the scheduled agent)

Goal: keep the JamiaPrep **Results & Cut-offs** page (`#/results`) current with JMI's
official declared results, automatically, without ever publishing a wrong or invented number.

Repo: `C:\Users\wasra\OneDrive\Desktop\Claude Tokens Visualizer`
Page data: `js/data-jmi-results.js`  ·  Baseline: `tools/jmi-results-known.json`
Poppler tools: `C:\Users\wasra\bin` (`pdftoppm.exe`, `pdftohtml.exe`, `pdfinfo.exe`)

## 1. Detect
Run the detector:
```
powershell -ExecutionPolicy Bypass -File tools/jmi-results-watch.ps1
```
It prints JSON. `status`:
- `no-change` → nothing to do. Stop. (Not noteworthy.)
- `new-results` → the `new` array lists newly-declared merit-list PDF URLs. Continue.
- `seeded` → baseline was (re)created; treat as no-change.

## 2. Extract (per new URL) — same method used to build the page
For each URL in `new`:
1. Download it, then render the relevant pages to PNG:
   `pdftoppm.exe -png -r 140 -f <a> -l <b> "<pdf>" "<out>"`.
2. Read the PNGs (vision) and extract:
   - **programme name** (page 1 header) and its programme code (from the filename, e.g. `M63`, `B04`, `S07`).
   - **list type** from the title: *Selected*, *Selected + Waiting list*, *Waiting list*, *Called for interview*, or *Cut-off*.
   - **counts** — lists are numbered per reservation category (GENERAL, MUSLIM, MUSLIM OBC/MUSLIM ST,
     MUSLIM WOMEN, JAMIA, J&K, KM, PWD) and sometimes per sub-course / sub-school, with serials
     restarting each block. TOTAL = sum of every block's highest serial. Read every candidate page.
   - **category-wise cut-off table** — the summary table just after the instruction pages
     (usually page 3 for UG/PG, pages 4-6 for schools). Transcribe marks verbatim.
   - JMI lists have **no per-candidate marks column** — never invent one.

## 3. Validation gate (do NOT skip)
Publish an entry ONLY if ALL hold:
- every number was read with high confidence (no blur/guess),
- the counts’ category blocks were fully traced across page breaks,
- the programme name + code are unambiguous.
If ANY entry is low-confidence, **hold the whole batch**: do not edit the data file, and make the
run noteworthy with a summary of what needs a human. Better to publish nothing than a wrong cut-off.

## 4. Publish (only cleanly-parsed entries)
- Add/append the entry into the correct group in `js/data-jmi-results.js`
  (`ug` / `pg` / `diploma` / `school`), matching the existing object shape
  (`code, name, stats[], cutoffs[{group,marks}], lists[{label,url}]`, optional `note`/`cutoffNote`).
  Normalise category keys to: `GENERAL, MUSLIM, MUSLIM OBC/MUSLIM ST, MUSLIM WOMEN, JAMIA, J&K, KM, PWD`.
- Bump `updated` to today.
- **New academic session** (e.g. first `2026-27` URLs): this is a structural change — HOLD and notify a
  human rather than auto-restructuring, unless you can cleanly set `session` to the new year and move the
  prior session into an archive block. Do not silently mix two sessions’ numbers.
- Append every successfully-published URL to `tools/jmi-results-known.json` (a flat JSON string array;
  in PS5.1 read via `[string[]](Get-Content f -Raw | ConvertFrom-Json)`).

## 5. Ship
- Verify locally if possible (load `#/results`, no console errors).
- Commit on a branch or `main` per repo norms and push; Vercel auto-deploys.
  Commit msg: `feat(results): publish JMI <session> <programmes> (auto-watch)`.
- Report: what was published, what was held for review, and why.
