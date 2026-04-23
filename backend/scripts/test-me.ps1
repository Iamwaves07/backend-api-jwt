$BaseUrl = "http://localhost:3000"
$tokenPath = Join-Path $PSScriptRoot ".token"

if (-not (Test-Path $tokenPath)) {
  Write-Host "ERROR: No existe scripts/.token. Ejecuta primero: npm run test:login" -ForegroundColor Red
  exit 1
}

$TOKEN = Get-Content -Path $tokenPath -Raw

Write-Host "==> Probando /auth/me" -ForegroundColor Cyan
$me = Invoke-RestMethod -Method Get `
  -Uri "$BaseUrl/auth/me" `
  -Headers @{ Authorization = "Bearer $TOKEN" }

$me | ConvertTo-Json -Depth 10
Write-Host "OK: Me" -ForegroundColor Green
