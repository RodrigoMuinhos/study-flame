#!/bin/bash
# =====================
# CRM FLAME - Deploy Script
# =====================
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
echo "🚀 Deploying CRM FLAME to $ENVIRONMENT..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📝 Please copy .env.example to .env and fill in the values"
    exit 1
fi

# Load environment variables
source .env

# Build images
echo "📦 Building Docker images..."
docker-compose build --no-cache

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Start new containers
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check health
echo "🏥 Checking service health..."
docker-compose ps

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=20

echo ""
echo "✅ Deploy complete!"
echo ""
echo "🌐 Services:"
echo "   - Frontend: http://localhost:3000"
echo "   - API:      http://localhost:8080/api"
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f        # Follow logs"
echo "   docker-compose ps             # Check status"
echo "   docker-compose down           # Stop all"
