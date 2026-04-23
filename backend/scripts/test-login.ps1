$BaseUrl = "http://localhost:3000"
$Email = "admin@local.cl"
$Password = "Admin1234!"

Write-Host "==> Login" -ForegroundColor Cyan
$login = Invoke-RestMethod -Method Post `
  -Uri "$BaseUrl/auth/login" `
  -ContentType "application/json" `
  -Body (@{
    email = $Email
    password = $Password
  } | ConvertTo-Json)

if (-not $login.token) {
  Write-Host "ERROR: No se recibió token" -ForegroundColor Red
  exit 1
}

$tokenPath = Join-Path $PSScriptRoot ".token"
Set-Content -Path $tokenPath -Value $login.token -NoNewline

Write-Host "OK: Token guardado en scripts/.token" -ForegroundColor Green
$login | ConvertTo-Json -Depth 10
