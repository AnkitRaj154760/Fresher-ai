# FresherAI - Start All Services
# Run this script from the project root: 2.fresherAI\2.fresherAI

$root = $PSScriptRoot

$services = @(
    @{ name = "Gateway";   path = "$root\backend\gateway" },
    @{ name = "Auth";      path = "$root\backend\services\auth" },
    @{ name = "Resume";    path = "$root\backend\services\resume" },
    @{ name = "Interview"; path = "$root\backend\services\interview" },
    @{ name = "Roadmap";   path = "$root\backend\services\roadmap" },
    @{ name = "Billing";   path = "$root\backend\services\billing" },
    @{ name = "Frontend";  path = "$root\frontend" }
)

Write-Host "🚀 Starting FresherAI..." -ForegroundColor Cyan

foreach ($service in $services) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$($service.path)'; Write-Host '▶ $($service.name) Service' -ForegroundColor Green; npm run dev"
    Start-Sleep -Milliseconds 500
}

Write-Host "✅ All 7 services started in separate windows!" -ForegroundColor Green
Write-Host "🌐 Frontend running at: http://localhost:5173" -ForegroundColor Yellow
