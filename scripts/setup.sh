#!/bin/bash

# Lab-LLM Setup Script
echo "🚀 Setting up Lab-LLM with PostgreSQL and Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp env.example .env
    echo "✅ Please edit .env file with your configuration before proceeding."
    echo "   Required: OPENAI_API_KEY, JWT_SECRET"
    read -p "Press Enter after configuring .env file..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate database schema
echo "🗄️ Generating database schema..."
npm run db:generate

# Start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
docker-compose run --rm migrate

# Check if services are healthy
echo "🏥 Checking service health..."
if curl -f http://localhost:3000/api/init-db >/dev/null 2>&1; then
    echo "✅ Application is ready!"
    echo "🌐 Application URL: http://localhost:3000"
    echo "🗄️ PostgreSQL: localhost:5432"
    echo "🔍 Qdrant: http://localhost:6333"
else
    echo "❌ Application health check failed. Check logs with: docker-compose logs"
fi

echo "🎉 Setup complete! Use 'docker-compose logs -f' to view logs."
