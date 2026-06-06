# Transforms the canonical SSC CGL question bank (native {A-D} + correct_option
# letter shape) into the browser seed js/data-ssc-cgl-pyq.js, which exposes
# window.SSC_CGL_POOL ([{ id, year, tier, section, topic, difficulty, text,
# options[4], correct(0-3), explanation }]) for repo.buildMock().
#
# Usage:  powershell -ExecutionPolicy Bypass -File .\tools\build-ssc-seed.ps1
#
# The JSON is the single source of truth; this regenerates the JS seed. Never
# hand-edit the generated file.

$ErrorActionPreference = 'Stop'
$root   = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$src    = Join-Path $root 'data\ssc_cgl_papers.json'
$outJs  = Join-Path $root 'js\data-ssc-cgl-pyq.js'

if (-not (Test-Path -LiteralPath $src)) { throw "Source not found: $src" }

# Read as UTF-8 explicitly (PS 5.1 Get-Content defaults to ANSI and mangles the
# rupee sign U+20B9 and other multibyte characters).
$doc = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$qs  = $doc.questions
$letterToIndex = @{ 'A' = 0; 'B' = 1; 'C' = 2; 'D' = 3 }

$pool = New-Object System.Collections.Generic.List[object]
$errors = New-Object System.Collections.Generic.List[string]

foreach ($q in $qs) {
  $co = "$($q.correct_option)".Trim().ToUpper()
  if (-not $letterToIndex.ContainsKey($co)) { $errors.Add("$($q.id): bad correct_option '$co'"); continue }
  $opts = @($q.options.A, $q.options.B, $q.options.C, $q.options.D)
  if (($opts | Where-Object { -not "$_".Trim() }).Count -gt 0) { $errors.Add("$($q.id): empty option"); continue }
  $pool.Add([ordered]@{
    id         = $q.id
    year       = [int]$q.year
    tier       = [int]$q.tier
    section    = $q.section
    topic      = $q.topic
    difficulty = $q.difficulty
    text       = $q.question_text
    options    = $opts
    correct    = $letterToIndex[$co]
    explanation = $q.explanation
  })
}

if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Host "  ERROR $_" -ForegroundColor Red }
  throw "$($errors.Count) question(s) failed transform; fix the source and re-run."
}

$json = $pool | ConvertTo-Json -Depth 6
# ConvertTo-Json emits a bare object (not an array) when there is exactly one
# element; we always have hundreds, so an array is guaranteed here.

# Build five per-year PYQ-PATTERN full papers (one per year) for the PYQ quadrant.
# These are fixed (not re-randomized): each year already holds exactly 100 Q
# (25 per section), so the paper is simply that year's full set in pool order.
# They are tagged honestly as expert-crafted pattern papers, NOT official PYQs.
$secMap = [ordered]@{
  'gi' = 'General Intelligence & Reasoning'
  'ga' = 'General Awareness'
  'qa' = 'Quantitative Aptitude'
  'en' = 'English Comprehension'
}
$years = $pool | ForEach-Object { $_.year } | Sort-Object -Unique
$exams = New-Object System.Collections.Generic.List[object]
foreach ($y in $years) {
  $sections = New-Object System.Collections.Generic.List[object]
  foreach ($sid in $secMap.Keys) {
    $sname = $secMap[$sid]
    $qs = New-Object System.Collections.Generic.List[object]
    foreach ($q in ($pool | Where-Object { $_.year -eq $y -and $_.section -eq $sname })) {
      $qs.Add([ordered]@{
        id = $q.id; text = $q.text; options = $q.options; correct = $q.correct
        topic = $q.topic; difficulty = $q.difficulty; explanation = $q.explanation
      })
    }
    $sections.Add([ordered]@{ id = $sid; name = $sname; questions = $qs })
  }
  $exams.Add([ordered]@{
    id = "ssc-cgl-pyq-$y"
    name = "SSC CGL Tier 1 - $y (PYQ-Pattern)"
    template = 'ssc'
    examCatalogueId = 'ssc-cgl'
    kind = 'pyq'
    scope = 'full'
    year = [int]$y
    sectionTag = $null
    sourceSet = 'Expert-crafted, PYQ-pattern (not official)'
    durationMin = 60
    marking = [ordered]@{ correct = 2; wrong = -0.5; unattempted = 0 }
    allowSectionSwitch = $true
    timerMode = 'full'
    calculator = $false
    questionTypes = @('mcq')
    languages = @('en')
    sections = $sections
  })
}
$examsJson = $exams | ConvertTo-Json -Depth 8

$header = @"
// AUTO-GENERATED from data/ssc_cgl_papers.json by tools/build-ssc-seed.ps1.
// Do not edit by hand - edit the JSON and re-run the script.
// Exposes window.SSC_CGL_POOL for repo.buildMock() (the GET /mock endpoint),
// and appends five per-year PYQ-pattern full papers to window.EXAMS.
(function () {
  window.SSC_CGL_POOL =
"@

$mid = @"
;
  window.EXAMS = (window.EXAMS || []).concat(
"@

$footer = @"
);
})();
"@

$content = $header + $json + $mid + $examsJson + $footer
# Write UTF-8 without BOM so the browser parses it cleanly.
[System.IO.File]::WriteAllText($outJs, $content, (New-Object System.Text.UTF8Encoding($false)))

Write-Host ("  Wrote {0} questions to {1}" -f $pool.Count, $outJs) -ForegroundColor Green
$pool | Group-Object { "$($_.year) | $($_.section)" } | Sort-Object Name | ForEach-Object { "    $($_.Name) => $($_.Count)" }
