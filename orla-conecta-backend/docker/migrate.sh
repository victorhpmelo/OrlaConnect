#!/bin/bash

# EF Core Migrations
echo "🗄️ Running Entity Framework Migrations..."

cd ../orla-conecta-backend

# Add dotnet tools to PATH
export PATH="$PATH:/home/victorhpmelo/.dotnet/tools"

# Install EF tools if not present
if ! dotnet tool list -g | grep -q "dotnet-ef"; then
    echo "📦 Installing dotnet-ef..."
    dotnet tool install --global dotnet-ef
    # Refresh PATH after installation
    export PATH="$PATH:/home/victorhpmelo/.dotnet/tools"
fi

# First, let's check if we can connect to the database
echo "🔍 Testing database connection..."
dotnet ef database update --dry-run --verbose

if [ $? -ne 0 ]; then
    echo "❌ Cannot connect to database. Please check:"
    echo "  1. Your Azure SQL Database user 'viaggia_admin' exists"
    echo "  2. The user has proper permissions (db_owner or equivalent)"
    echo "  3. Your network can access the Azure SQL server"
    echo "  4. The connection string in appsettings.Development.json is correct"
    cd ../docker
    exit 1
fi

# Check if migrations exist and handle accordingly
if [ "$1" ]; then
    # If migration name provided, add new migration
    echo "➕ Adding migration: $1"
    dotnet ef migrations add "$1"
    
    if [ $? -eq 0 ]; then
        echo "✅ Migration '$1' created successfully!"
    else
        echo "❌ Failed to create migration '$1'"
        cd ../docker
        exit 1
    fi
elif [ -d "Migrations" ] && [ "$(ls -A Migrations 2>/dev/null)" ]; then
    # If migrations exist but no name provided, just update database
    echo "📋 Existing migrations found, updating database..."
else
    # No migrations exist and no name provided, create initial migration
    echo "➕ No migrations found, creating CreateInitial migration..."
    dotnet ef migrations add CreateInitial
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create initial migration"
        cd ../docker
        exit 1
    fi
fi

echo "🔄 Updating database..."
dotnet ef database update --verbose

if [ $? -eq 0 ]; then
    echo "✅ Database updated successfully!"
    if [ -d "Migrations" ]; then
        echo "📋 Current migrations:"
        ls -la Migrations/
    fi
else
    echo "❌ Database update failed!"
    echo "💡 Common solutions:"
    echo "  - Ensure the SQL user exists: CREATE USER viaggia_admin WITH PASSWORD = 'ViaggiaAzure123!';"
    echo "  - Grant permissions: ALTER ROLE db_owner ADD MEMBER viaggia_admin;"
    echo "  - Check firewall rules in Azure SQL Database"
    cd ../docker
    exit 1
fi

echo "✅ Migrations complete!"
cd ../docker
