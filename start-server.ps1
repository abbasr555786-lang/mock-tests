# Mockly — tiny static file server for local testing.
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\start-server.ps1
# Then open http://localhost:8000/ in your browser.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = if ($env:PORT) { [int]$env:PORT } else { 8000 }
$prefix = "http://localhost:$port/"

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.htm'  = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.ico'  = 'image/x-icon'
  '.txt'  = 'text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
} catch {
  Write-Host "Failed to bind $prefix. If port $port is busy, close the other process or edit `$port in this script." -ForegroundColor Red
  throw
}

Write-Host ""
Write-Host "  Mockly static server running" -ForegroundColor Cyan
Write-Host "  Serving:  $root"
Write-Host "  URL:      $prefix" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop."
Write-Host ""

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    try {
      $rel = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
      if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }
      $path = Join-Path $root $rel

      # Block path traversal — resolved path must stay under $root.
      $full = $null
      try { $full = [System.IO.Path]::GetFullPath($path) } catch { $full = $null }
      if (-not $full -or -not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        $res.StatusCode = 403
      } elseif (Test-Path -LiteralPath $full -PathType Container) {
        $idx = Join-Path $full 'index.html'
        if (Test-Path -LiteralPath $idx) { $full = $idx } else { $res.StatusCode = 403 }
      }

      if ($res.StatusCode -eq 200 -and (Test-Path -LiteralPath $full -PathType Leaf)) {
        $ext = [System.IO.Path]::GetExtension($full).ToLower()
        $ct = $mime[$ext]; if (-not $ct) { $ct = 'application/octet-stream' }
        $bytes = [System.IO.File]::ReadAllBytes($full)
        $res.ContentType = $ct
        $res.Headers.Add('Cache-Control', 'no-cache, no-store, must-revalidate')
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host ("  200  " + $req.HttpMethod + "  " + $req.Url.AbsolutePath)
      } elseif ($res.StatusCode -eq 200) {
        $res.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rel")
        $res.ContentType = 'text/plain; charset=utf-8'
        $res.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host ("  404  " + $req.HttpMethod + "  " + $req.Url.AbsolutePath) -ForegroundColor Yellow
      }
    } catch {
      $res.StatusCode = 500
      $msg = [System.Text.Encoding]::UTF8.GetBytes("500: " + $_.Exception.Message)
      try { $res.OutputStream.Write($msg, 0, $msg.Length) } catch {}
      Write-Host ("  500  " + $req.Url.AbsolutePath + "  " + $_.Exception.Message) -ForegroundColor Red
    } finally {
      try { $res.OutputStream.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
