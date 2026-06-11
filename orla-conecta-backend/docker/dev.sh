#!/bin/bash

# Development Environment
echo "🚀 Starting Orla Conecta in Development mode..."

export ENVIRONMENT=development
export ASPNETCORE_ENVIRONMENT=Development
export API_PORT=5001
export DOCKERFILE=Dockerfile.dev
export VOLUME_MOUNT=../:/app

docker compose up --build

echo ""
echo "✅ Services running:"
echo "   API:      http://localhost:5001"
echo "   Swagger:  http://localhost:5001/swagger"
echo "   MailHog:  http://localhost:8025  (catch all test emails)"
echo "   SQL:      localhost,1433  (user: sa / pass: OrlaDev@12345)"
