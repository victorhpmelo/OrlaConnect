# Development Environment (Windows PowerShell)
Write-Host "Starting Orla Conecta in Development mode..." -ForegroundColor Cyan

$env:ENVIRONMENT = "development"
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:API_PORT = "5001"
$env:DOCKERFILE = "Dockerfile.dev"
$env:VOLUME_MOUNT = "../:/app"

Set-Location $PSScriptRoot
docker compose up --build

Write-Host ""
Write-Host "Services running:" -ForegroundColor Green
Write-Host "  API:      http://localhost:5001"
Write-Host "  Swagger:  http://localhost:5001/swagger"
Write-Host "  MailHog:  http://localhost:8025  (catch all test emails)"
Write-Host "  SQL:      localhost,1433  (user: sa / pass: OrlaDev@12345)"
