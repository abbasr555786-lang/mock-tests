# Transforms the canonical NEET UG question parts (data/neet-parts/*.json) into
# the browser seed js/data-neet-ug.js, which exposes window.NEET_UG_POOL
# ([{ id, section, topic, difficulty, text, options[4], correct(0-3),
# explanation }]) for a future repo.buildMock() generalization, and appends one
# full-length 180-Q NEET paper to window.EXAMS.
#
# Usage:  powershell -ExecutionPolicy Bypass -File .\tools\build-neet-seed.ps1
#
# The part JSON files are the single source of truth; this regenerates the JS
# seed. Never hand-edit the generated file.

$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dir   = Join-Path $root 'data\neet-parts'
$outJs = Join-Path $root 'js\data-neet-ug.js'

# Section order of a NEET paper. Each entry: file, section id, section name.
$sectionDefs = @(
  @{ file = 'physics.json';   id = 'phy'; name = 'Physics' }
  @{ file = 'chemistry.json'; id = 'che'; name = 'Chemistry' }
  @{ file = 'botany.json';    id = 'bot'; name = 'Botany' }
  @{ file = 'zoology.json';   id = 'zoo'; name = 'Zoology' }
)

$allowedDiff = @('easy','easy-medium','medium','medium-hard','hard')
$pool     = New-Object System.Collections.Generic.List[object]
$sections = New-Object System.Collections.Generic.List[object]
$errors   = New-Object System.Collections.Generic.List[string]
$seenIds  = @{}

foreach ($def in $sectionDefs) {
  $path = Join-Path $dir $def.file
  if (-not (Test-Path -LiteralPath $path)) { throw "Source not found: $path" }
  # Read as UTF-8 explicitly (PS 5.1 Get-Content defaults to ANSI and mangles
  # multibyte characters such as subscripts and the degree sign).
  $parsed = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
  $arr = @($parsed)

  $secQs = New-Object System.Collections.Generic.List[object]
  foreach ($q in $arr) {
    if ($seenIds.ContainsKey($q.id)) { $errors.Add("$($def.name): duplicate id '$($q.id)'"); continue }
    $seenIds[$q.id] = 1
    $opts = @($q.options)
    if ($opts.Count -ne 4) { $errors.Add("$($q.id): must have exactly 4 options"); continue }
    if (($opts | Where-Object { -not "$_".Trim() }).Count -gt 0) { $errors.Add("$($q.id): empty option"); continue }
    if ($q.correct -lt 0 -or $q.correct -gt 3) { $errors.Add("$($q.id): correct index out of range"); continue }
    $diff = "$($q.difficulty)"
    if ($allowedDiff -notcontains $diff) { $errors.Add("$($q.id): bad difficulty '$diff'"); continue }

    $qObj = [ordered]@{
      id = $q.id; text = $q.text; options = $opts; correct = [int]$q.correct
      topic = $q.topic; difficulty = $diff; explanation = $q.explanation
    }
    $secQs.Add($qObj)
    $pool.Add([ordered]@{
      id = $q.id; section = $def.name; topic = $q.topic; difficulty = $diff
      text = $q.text; options = $opts; correct = [int]$q.correct; explanation = $q.explanation
    })
  }
  $sections.Add([ordered]@{ id = $def.id; name = $def.name; questions = $secQs })
}

if ($errors.Count -gt 0) {
  $errors | ForEach-Object { Write-Host "  ERROR $_" -ForegroundColor Red }
  throw "$($errors.Count) question(s) failed transform; fix the source and re-run."
}

# One full-length NEET paper, tagged honestly as expert-crafted (not official).
$exams = New-Object System.Collections.Generic.List[object]
$exams.Add([ordered]@{
  id = 'neet-ug-fp-1'
  name = 'NEET UG - Full Mock Test 1'
  template = 'nta'
  examCatalogueId = 'neet-ug'
  kind = 'mock'
  scope = 'full'
  year = $null
  sectionTag = $null
  sourceSet = 'Expert-crafted, NEET-pattern (not official)'
  durationMin = 200
  marking = [ordered]@{ correct = 4; wrong = -1; unattempted = 0 }
  allowSectionSwitch = $true
  timerMode = 'full'
  calculator = $false
  questionTypes = @('mcq')
  languages = @('en')
  sections = $sections
})

$poolJson  = $pool  | ConvertTo-Json -Depth 6
$examsJson = $exams | ConvertTo-Json -Depth 8

$header = @"
// AUTO-GENERATED from data/neet-parts/*.json by tools/build-neet-seed.ps1.
// Do not edit by hand - edit the JSON parts and re-run the script.
// Exposes window.NEET_UG_POOL and appends one full-length 180-Q NEET paper to window.EXAMS.
(function () {
  window.NEET_UG_POOL =
"@

$mid = @"
;
  window.EXAMS = (window.EXAMS || []).concat(
"@

$footer = @"
);
})();
"@

$content = $header + $poolJson + $mid + $examsJson + $footer
# Write UTF-8 without BOM so the browser parses it cleanly.
[System.IO.File]::WriteAllText($outJs, $content, (New-Object System.Text.UTF8Encoding($false)))

Write-Host ("  Wrote {0} questions to {1}" -f $pool.Count, $outJs) -ForegroundColor Green
$pool | Group-Object section | Sort-Object Name | ForEach-Object { "    $($_.Name) => $($_.Count)" }
