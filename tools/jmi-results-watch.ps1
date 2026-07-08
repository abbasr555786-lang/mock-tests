# JMI results watcher — detects newly-declared entrance results on the official
# admission portal so they can be OCR'd and published to the JamiaPrep Results page.
#
# Mechanical detection ONLY (no OCR): fetches each session's declared-results index
# PDF, extracts the per-programme merit-list links, and diffs them against a known
# baseline (tools/jmi-results-known.json). Prints any NEW links as JSON.
#
# Usage:  powershell -ExecutionPolicy Bypass -File tools/jmi-results-watch.ps1
# Exit 0 always (a fetch failure for a not-yet-published session is normal -> skipped).
#
# Downstream (the scheduled agent): for each NEW link, download + render + OCR the
# PDF, extract counts + category cut-offs, append to js/data-jmi-results.js, then add
# the link to the baseline and commit. Only publish cleanly-parsed entries; hold and
# report anything low-confidence.

$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$bin = 'C:\Users\wasra\bin'
$repo = Split-Path -Parent $PSScriptRoot
$knownPath = Join-Path $PSScriptRoot 'jmi-results-known.json'
$lastPath  = Join-Path $PSScriptRoot 'jmi-results-watch-last.json'
$tmp = Join-Path $env:TEMP ('jmi-watch-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

# Sessions to probe: current + upcoming (404s are skipped). Extend as years roll on.
$sessions = @('2025-26', '2026-27', '2027-28')
$indexTpl = 'https://admission.jmi.ac.in/application/assets/pdfFile/notices/Results{0}.pdf'

function Get-ResultLinks([string]$pdfPath) {
    $html = & "$bin\pdftohtml.exe" -stdout -i -noframes $pdfPath 2>$null
    if (-not $html) { return @() }
    $rx = [regex]'href="([^"]*uploadedResults[^"]*)"'
    $out = @()
    foreach ($m in $rx.Matches([string]$html)) {
        $u = $m.Groups[1].Value
        $u = $u -replace 'admission\.jmi\.ac\.in/https://admission\.jmi\.ac\.in', 'admission.jmi.ac.in'
        $u = $u -replace 'admisssion', 'admission'
        $out += $u
    }
    return ($out | Sort-Object -Unique)
}

$all = @()
$perSession = @{}
foreach ($s in $sessions) {
    $url = [string]::Format($indexTpl, $s)
    $dest = Join-Path $tmp ("idx-$s.pdf")
    try { Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 40 } catch { continue }
    if (-not (Test-Path $dest)) { continue }
    $links = Get-ResultLinks $dest
    if ($links.Count -gt 0) { $perSession[$s] = $links; $all += $links }
}
$all = $all | Sort-Object -Unique

# Baseline: seed on first run (everything currently declared counts as already known).
if (-not (Test-Path $knownPath)) {
    $all | ConvertTo-Json | Out-File $knownPath -Encoding utf8
    $seed = [ordered]@{ status = 'seeded'; sessionsWithData = @($perSession.Keys); knownCount = $all.Count; newCount = 0; new = @() }
    $seed | ConvertTo-Json -Depth 4 | Tee-Object -FilePath $lastPath
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    return
}

# NB: Windows PowerShell 5.1 emits a ConvertFrom-Json array as a single pipeline
# object, so `@(... | ConvertFrom-Json)` yields ONE element. Cast to [string[]] instead.
$known = @()
try {
    $parsed = Get-Content $knownPath -Raw | ConvertFrom-Json
    if ($parsed) { $known = [string[]]$parsed }
} catch {}
$new = @($all | Where-Object { $known -notcontains $_ })

$result = [ordered]@{
    status           = if ($new.Count -gt 0) { 'new-results' } else { 'no-change' }
    checkedSessions  = $sessions
    sessionsWithData = @($perSession.Keys)
    totalDeclared    = $all.Count
    knownCount       = $known.Count
    newCount         = $new.Count
    new              = $new
}
$result | ConvertTo-Json -Depth 4 | Tee-Object -FilePath $lastPath
Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
