Write-Host "==> AUTH FULL TEST" -ForegroundColor Cyan

powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "test-health.ps1")
powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "test-login.ps1")
powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "test-me.ps1")

Write-Host "OK: Flujo AUTH completo" -ForegroundColor Green
