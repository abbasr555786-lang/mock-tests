# Merges the original 300-question bank with the 200 newly-authored questions in
# authoring\new_*.json, validates every question's schema, renumbers the new ids
# into the canonical global scheme, and writes the 500-question canonical file
# data\ssc_cgl_papers.json. Fails loudly on any schema problem or count mismatch.
#
# Usage:  powershell -ExecutionPolicy Bypass -File .\tools\merge-new.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$origin = Join-Path $env:USERPROFILE 'Downloads\ssc_cgl_papers.json'
$authDir = Join-Path $root 'authoring'
$out = Join-Path $root 'data\ssc_cgl_papers.json'

$SECTIONS = @('General Intelligence & Reasoning','General Awareness','Quantitative Aptitude','English Comprehension')
$YEARS = 2020..2024
$DIFFS = @('easy','medium','hard')

# Read as UTF-8 explicitly: PS 5.1 Get-Content defaults to ANSI, which mangles
# multibyte chars like the rupee sign (U+20B9) into mojibake.
$doc = [System.IO.File]::ReadAllText($origin, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$original = @($doc.questions)
if ($original.Count -ne 300) { throw "Expected 300 original questions, found $($original.Count)." }

$newFiles = @('new_reasoning.json','new_ga.json','new_quant.json','new_english.json')
$new = New-Object System.Collections.Generic.List[object]
foreach ($f in $newFiles) {
  $p = Join-Path $authDir $f
  if (-not (Test-Path -LiteralPath $p)) { throw "Missing authoring file: $p" }
  # Assign first, then wrap: in Windows PowerShell 5.1, @(pipe | ConvertFrom-Json)
  # collapses a JSON array to a single element.
  $parsed = [System.IO.File]::ReadAllText($p, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
  $arr = @($parsed)
  if ($arr.Count -ne 50) { throw "$f : expected 50 questions, found $($arr.Count)." }
  $arr | ForEach-Object { $new.Add($_) }
}
if ($new.Count -ne 200) { throw "Expected 200 new questions, found $($new.Count)." }

# --- Validate every new question ---
$errs = New-Object System.Collections.Generic.List[string]
foreach ($q in $new) {
  $where = "id=$($q.id)"
  if ($SECTIONS -notcontains $q.section) { $errs.Add("$where bad section '$($q.section)'") }
  if ($YEARS -notcontains [int]$q.year)  { $errs.Add("$where bad year '$($q.year)'") }
  if ([int]$q.tier -ne 1)                { $errs.Add("$where tier must be 1") }
  if ($DIFFS -notcontains $q.difficulty) { $errs.Add("$where bad difficulty '$($q.difficulty)'") }
  if ([double]$q.marks -ne 2)            { $errs.Add("$where marks must be 2") }
  if ([double]$q.negative_marks -ne 0.5) { $errs.Add("$where negative_marks must be 0.5") }
  if (-not "$($q.question_text)".Trim()) { $errs.Add("$where empty question_text") }
  if ('A','B','C','D' -notcontains "$($q.correct_option)".ToUpper()) { $errs.Add("$where bad correct_option '$($q.correct_option)'") }
  foreach ($L in 'A','B','C','D') { if (-not "$($q.options.$L)".Trim()) { $errs.Add("$where empty option $L") } }
  if (-not "$($q.explanation)".Trim()) { $errs.Add("$where empty explanation") }
}
if ($errs.Count) { $errs | ForEach-Object { Write-Host "  ERR $_" -ForegroundColor Red }; throw "$($errs.Count) schema error(s)." }

# --- Renumber new ids: per-year blocks of 40, ordered by section then original order ---
$counter = @{}
$base = 301
foreach ($y in $YEARS) { $counter[$y] = $base; $base += 40 }
$renumbered = New-Object System.Collections.Generic.List[object]
foreach ($y in $YEARS) {
  foreach ($sec in $SECTIONS) {
    $bucket = $new | Where-Object { [int]$_.year -eq $y -and $_.section -eq $sec }
    if (@($bucket).Count -ne 10) { throw "Year $y / $sec : expected 10 new, found $(@($bucket).Count)." }
    foreach ($q in $bucket) {
      $n = '{0:D4}' -f $counter[$y]; $counter[$y]++
      $q.id = "ssc_cgl_${y}_t1_s1_$n"
      $renumbered.Add($q)
    }
  }
}

# --- Combine, normalize property order to match the originals, sanity-check ---
$all = New-Object System.Collections.Generic.List[object]
$original | ForEach-Object { $all.Add($_) }
$renumbered | ForEach-Object {
  $all.Add([pscustomobject][ordered]@{
    id = $_.id; year = [int]$_.year; tier = [int]$_.tier; shift = 1
    section = $_.section; topic = $_.topic; subtopic = $_.subtopic
    difficulty = $_.difficulty; question_text = $_.question_text
    options = [pscustomobject][ordered]@{ A = $_.options.A; B = $_.options.B; C = $_.options.C; D = $_.options.D }
    correct_option = "$($_.correct_option)".ToUpper(); explanation = $_.explanation
    marks = 2; negative_marks = 0.5
  })
}
if ($all.Count -ne 500) { throw "Expected 500 total, got $($all.Count)." }

# Per year+section must now be exactly 25
$all | Group-Object { "$($_.year)|$($_.section)" } | ForEach-Object {
  if ($_.Count -ne 25) { throw "Bucket $($_.Name) has $($_.Count), expected 25." }
}
# Unique ids
$dupIds = $all | Group-Object id | Where-Object { $_.Count -gt 1 }
if ($dupIds) { throw "Duplicate ids: $(($dupIds | ForEach-Object Name) -join ', ')" }

$doc.questions = $all
$doc.generated_on = (Get-Date -Format 'yyyy-MM-dd')
$json = $doc | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($out, $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("  Wrote {0} questions to {1}" -f $all.Count, $out) -ForegroundColor Green
$all | Group-Object year | Sort-Object Name | ForEach-Object { "    $($_.Name): $($_.Count)" }
