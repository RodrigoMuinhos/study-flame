@echo off
REM =====================
REM CRM FLAME - Deploy Script (Windows)
REM =====================
REM Usage: deploy.bat [environment]

setlocal enabledelayedexpansion

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

echo 🚀 Deploying CRM FLAME to %ENVIRONMENT%...

REM Check if .env file exists
if not exist .env (
    echo ❌ Error: .env file not found!
    echo 📝 Please copy .env.example to .env and fill in the values
    exit /b 1
)

REM Build images
echo 📦 Building Docker images...
docker-compose build --no-cache

REM Stop existing containers
echo 🛑 Stopping existing containers...
docker-compose down --remove-orphans

REM Start new containers
echo 🚀 Starting containers...
docker-compose up -d

REM Wait for services to be healthy
echo ⏳ Waiting for services to be healthy...
timeout /t 10 /nobreak >nul

REM Check health
echo 🏥 Checking service health...
docker-compose ps

REM Show logs
echo 📋 Recent logs:
docker-compose logs --tail=20

echo.
echo ✅ Deploy complete!
echo.
echo 🌐 Services:
echo    - Frontend: http://localhost:3000
echo    - API:      http://localhost:8080/api
echo.
echo 📋 Useful commands:
echo    docker-compose logs -f        # Follow logs
echo    docker-compose ps             # Check status
echo    docker-compose down           # Stop all

endlocal
