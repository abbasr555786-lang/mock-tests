# Near-duplicate detector for the SSC CGL question bank.
# Implements the product rule: no question may repeat across any mock. Detection
# is token-set Jaccard similarity over (question text + all option strings),
# lowercased, punctuation-stripped, stopwords removed - threshold 0.80. Exact
# text matching misses rewordings; including options avoids over-flagging
# legitimate template questions (e.g. "choose the correct sentence").
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\tools\dedup-check.ps1 `
#       -Candidate .\data\ssc_cgl_papers.json `
#       [-Bank .\authoring\bank-export.json] [-Threshold 0.8]
#
# -Candidate: native bank JSON ({questions:[...]} or a bare array) - checked
#             against itself AND against -Bank.
# -Bank:      optional array of pre-existing questions exported from the browser
#             (window.EXAMS), each { text, options:[...] }. Candidate items that
#             collide with the bank must be replaced (the bank wins).
# Exit code 0 = zero collisions; 1 = collisions found (printed).

param(
  [Parameter(Mandatory = $true)][string]$Candidate,
  [string]$Bank = '',
  [double]$Threshold = 0.8
)
$ErrorActionPreference = 'Stop'

$stop = @('a','an','the','of','to','in','is','are','was','were','and','or','for','on','at','by','with','as','that','this','which','it','be','from','his','her','their','its','if','then','what','how','who','will','can','of','into','than') |
  ForEach-Object { $_ } | Group-Object | ForEach-Object { $_.Name }
$stopSet = New-Object System.Collections.Generic.HashSet[string]
$stop | ForEach-Object { [void]$stopSet.Add($_) }

function Get-TokenSet([string]$s) {
  $set = New-Object System.Collections.Generic.HashSet[string]
  if (-not $s) { return $set }
  $clean = ($s.ToLower() -replace '[^a-z0-9 ]', ' ')
  foreach ($t in ($clean -split '\s+')) {
    if ($t.Length -gt 0 -and -not $stopSet.Contains($t)) { [void]$set.Add($t) }
  }
  return $set
}

function Jaccard($a, $b) {
  if ($a.Count -eq 0 -or $b.Count -eq 0) { return 0.0 }
  $inter = 0
  foreach ($t in $a) { if ($b.Contains($t)) { $inter++ } }
  $union = $a.Count + $b.Count - $inter
  if ($union -eq 0) { return 0.0 }
  return [double]$inter / $union
}

function Load-Items([string]$path) {
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
  $arr = if ($raw.questions) { $raw.questions } else { $raw }
  $items = New-Object System.Collections.Generic.List[object]
  foreach ($q in $arr) {
    $text = if ($q.question_text) { $q.question_text } else { $q.text }
    $opts = @()
    if ($q.options -is [string]) { $opts = @($q.options) }
    elseif ($q.options.A) { $opts = @($q.options.A, $q.options.B, $q.options.C, $q.options.D) }
    elseif ($q.options) { $opts = @($q.options) }
    $combined = ($text + ' ' + ($opts -join ' '))
    $id = if ($q.id) { $q.id } else { '(no-id)' }
    $items.Add([pscustomobject]@{ id = $id; text = $text; tokens = (Get-TokenSet $combined) })
  }
  return $items
}

$cand = Load-Items $Candidate
Write-Host ("Loaded {0} candidate questions from {1}" -f $cand.Count, $Candidate)
$bank = $null
if ($Bank) { $bank = Load-Items $Bank; Write-Host ("Loaded {0} bank questions from {1}" -f $bank.Count, $Bank) }

$pairs = New-Object System.Collections.Generic.List[string]

# Candidate vs candidate
for ($i = 0; $i -lt $cand.Count; $i++) {
  for ($j = $i + 1; $j -lt $cand.Count; $j++) {
    $s = Jaccard $cand[$i].tokens $cand[$j].tokens
    if ($s -ge $Threshold) {
      $pairs.Add(("  [{0:N2}] INTRA  {1}  <->  {2}" -f $s, $cand[$i].id, $cand[$j].id))
    }
  }
}
# Candidate vs bank
if ($bank) {
  for ($i = 0; $i -lt $cand.Count; $i++) {
    for ($j = 0; $j -lt $bank.Count; $j++) {
      $s = Jaccard $cand[$i].tokens $bank[$j].tokens
      if ($s -ge $Threshold) {
        $pairs.Add(("  [{0:N2}] BANK   {1}  <->  {2}" -f $s, $cand[$i].id, $bank[$j].id))
      }
    }
  }
}

if ($pairs.Count -eq 0) {
  Write-Host "OK - no near-duplicate pairs at threshold $Threshold." -ForegroundColor Green
  exit 0
} else {
  Write-Host ("Found {0} near-duplicate pair(s) at threshold {1}:" -f $pairs.Count, $Threshold) -ForegroundColor Yellow
  $pairs | ForEach-Object { Write-Host $_ }
  exit 1
}
