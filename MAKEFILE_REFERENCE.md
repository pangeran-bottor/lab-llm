# Makefile Quick Reference

## 🚀 First Time Setup
```bash
make setup              # Complete project setup (recommended)
make check-deps         # Check required dependencies
make env-setup          # Setup .env file
```

## 💻 Development
```bash
make dev                # Start local dev server + databases
make dev-full           # Start full development environment
make services-start     # Start only database services
make services-stop      # Stop database services
```

## 🐳 Docker Operations
```bash
make start              # Start all Docker services
make stop               # Stop all services
make restart            # Restart all services
make down               # Stop and remove containers
make down-volumes       # ⚠️ Stop and remove with data volumes
```

## 🔄 Code Updates
```bash
make update             # Full update after code changes
make quick-update       # Quick app container update only
make update-deps        # Update dependencies and rebuild
```

## 🗄️ Database
```bash
make db-generate        # Generate database migrations
make db-migrate-local   # Run migrations locally
make db-migrate-docker  # Run migrations in Docker
make db-studio          # Open database studio
make db-reset           # ⚠️ Reset database (deletes all data)
make backup-db          # Create database backup
```

## 🔨 Build Operations
```bash
make docker-build       # Build Docker images
make docker-rebuild     # Rebuild images (no cache)
make prod-build         # Build for production
make install            # Install npm dependencies
```

## 📊 Monitoring & Debugging
```bash
make status             # Show service status
make logs               # Show all service logs
make logs-app           # App logs only
make logs-db            # Database logs only
make logs-qdrant        # Qdrant logs only
make health             # Check service health
```

## 🛠️ Utilities
```bash
make shell-app          # Open shell in app container
make shell-db           # Open PostgreSQL shell
make urls               # Show all service URLs
make env-info           # Show environment information
make clean              # Clean up Docker resources
```

## 🧪 Code Quality
```bash
make lint               # Run linting
make lint-fix           # Fix linting issues
make format             # Format code with prettier
```

## 📖 Help
```bash
make help               # Show all available commands
make                    # Same as 'make help' (default)
```

## 🌐 Service URLs (when running)
- **Application**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Qdrant**: http://localhost:6333
- **Qdrant Dashboard**: http://localhost:6333/dashboard

## 💡 Common Workflows

### First Time Setup
```bash
make setup
# Edit .env file with your API keys
make dev
```

### Daily Development
```bash
make dev                # Start development environment
# Make your code changes
make quick-update       # Quick rebuild after changes
```

### After Major Changes
```bash
make update             # Full rebuild and restart
```

### Debugging Issues
```bash
make status             # Check what's running
make health             # Check service health
make logs-app           # Check app logs
```

### Database Management
```bash
make db-studio          # Visual database management
make backup-db          # Create backup before changes
make db-reset           # Start fresh (⚠️ deletes data)
```
