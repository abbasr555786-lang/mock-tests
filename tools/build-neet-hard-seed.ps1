# Transforms the NEET UG "hard layer" question parts (data/neet-hard/*.json)
# into the browser seed js/data-neet-hard.js, which appends exam-level NEET
# sectional tests to window.EXAMS. This is the tougher tier that sits ON TOP of
# the foundation 180-Q mock (neet-ug-fp-1); it does not replace it.
#
# Currently builds: Physics Advanced (Exam-Level) Test 1 (45 Q sectional).
# As chemistry/botany/zoology hard parts are added, extend $sectionDefs and
# either emit more sectionals or assemble a full hard-tier 180-Q paper.
#
# Usage:  powershell -ExecutionPolicy Bypass -File .\tools\build-neet-hard-seed.ps1
#
# The part JSON files are the single source of truth; never hand-edit the
# generated js/data-neet-hard.js.

$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dir   = Join-Path $root 'data\neet-hard'
$outJs = Join-Path $root 'js\data-neet-hard.js'

# Each entry describes one sectional exam to emit from one part file.
$examDefs = @(
  @{
    file       = 'physics.json'
    secId      = 'phy'
    secName    = 'Physics'
    examId     = 'neet-ug-hard-phy-1'
    examName   = 'NEET UG - Physics Advanced (Exam-Level) Test 1'
    sectionTag = 'Physics'
  }
)

$allowedDiff = @('easy','easy-medium','medium','medium-hard','hard')
$exams  = New-Object System.Collections.Generic.List[object]
$errors = New-Object System.Collections.Generic.List[string]
$seenIds = @{}

foreach ($def in $examDefs) {
  $path = Join-Path $dir $def.file
  if (-not (Test-Path -LiteralPath $path)) { throw "Source not found: $path" }
  # Read as UTF-8 explicitly (PS 5.1 Get-Content defaults to ANSI and mangles
  # multibyte characters such as subscripts and the degree sign).
  $parsed = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
  $arr = @($parsed)

  $secQs = New-Object System.Collections.Generic.List[object]
  foreach ($q in $arr) {
    if ($seenIds.ContainsKey($q.id)) { $errors.Add("$($def.examId): duplicate id '$($q.id)'"); continue }
    $seenIds[$q.id] = 1
    $opts = @($q.options)
    if ($opts.Count -ne 4) { $errors.Add("$($q.id): must have exactly 4 options"); continue }
    if (($opts | Where-Object { -not "$_".Trim() }).Count -gt 0) { $errors.Add("$($q.id): empty option"); continue }
    if ($q.correct -lt 0 -or $q.correct -gt 3) { $errors.Add("$($q.id): correct index out of range"); continue }
    $diff = "$($q.difficulty)"
    if ($allowedDiff -notcontains $diff) { $errors.Add("$($q.id): bad difficulty '$diff'"); continue }

    $secQs.Add([ordered]@{
      id = $q.id; text = $q.text; options = $opts; correct = [int]$q.correct
      topic = $q.topic; difficulty = $diff; explanation = $q.explanation
    })
  }

  if ($secQs.Count -eq 0) { $errors.Add("$($def.examId): no valid questions"); continue }

  $sectionObj = [ordered]@{ id = $def.secId; name = $def.secName; questions = $secQs }
  # Force the single-section list to an array so ConvertTo-Json (PS 5.1) does
  # not collapse a one-element collection into a bare object.
  $sectionsArr = @($sectionObj)

  $exams.Add([ordered]@{
    id = $def.examId
    name = $def.examName
    template = 'nta'
    examCatalogueId = 'neet-ug'
    kind = 'mock'
    scope = 'sectional'
    year = $null
    sectionTag = $def.sectionTag
    sourceSet = 'Expert-crafted, NEET-2025-pattern exam-level (not official)'
    durationMin = 45
    marking = [ordered]@{ correct = 4; wrong = -1; unattempted = 0 }
    allowSectionSwitch = $false
    timerMode = 'full'
    calculator = $false
    questionTypes = @('mcq')
    languages = @('en')
    sections = $sectionsArr
  })
}

if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Host "  ERROR $_" -ForegroundColor Red }
  throw "$($errors.Count) question(s) failed transform; fix the source and re-run."
}

# Difficulty audit (printed for calibration awareness).
$diffCounts = @{}
foreach ($e in $exams) {
  foreach ($s in $e.sections) {
    foreach ($q in $s.questions) {
      $d = $q.difficulty
      if ($diffCounts.ContainsKey($d)) { $diffCounts[$d]++ } else { $diffCounts[$d] = 1 }
    }
  }
}

$examsJson = $exams | ConvertTo-Json -Depth 8

$header = @"
// AUTO-GENERATED from data/neet-hard/*.json by tools/build-neet-hard-seed.ps1.
// Do not edit by hand - edit the JSON parts and re-run the script.
// Appends exam-level (hard tier) NEET sectional tests to window.EXAMS.
(function () {
  window.EXAMS = (window.EXAMS || []).concat(
"@

$footer = @"
);
})();
"@

$content = $header + $examsJson + $footer
# Write UTF-8 without BOM so the browser parses it cleanly.
[System.IO.File]::WriteAllText($outJs, $content, (New-Object System.Text.UTF8Encoding($false)))

$total = ($exams | ForEach-Object { ($_.sections | ForEach-Object { $_.questions.Count } | Measure-Object -Sum).Sum } | Measure-Object -Sum).Sum
Write-Host ("  Wrote {0} exam(s), {1} questions to {2}" -f $exams.Count, $total, $outJs) -ForegroundColor Green
Write-Host "  Difficulty distribution:" -ForegroundColor Cyan
$diffCounts.GetEnumerator() | Sort-Object Name | ForEach-Object { "    {0,-12} => {1}" -f $_.Name, $_.Value }
