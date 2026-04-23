$BaseUrl = "http://localhost:3000"

Write-Host "==> Probando /health" -ForegroundColor Cyan
$health = Invoke-RestMethod -Method Get -Uri "$BaseUrl/health"
$health | ConvertTo-Json -Depth 5

Write-Host "OK: Health" -ForegroundColor Green
