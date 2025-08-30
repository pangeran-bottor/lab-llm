# Lab-LLM Automation Guide

This guide covers all the automation tools available for the Lab-LLM project.

## 📋 Available Automation Tools

### 1. **Makefile** (Recommended) 
- **File**: `Makefile`
- **Usage**: `make <command>`
- **Best for**: All development and deployment tasks

### 2. **Setup Script**
- **File**: `scripts/setup.sh`
- **Usage**: `./scripts/setup.sh`
- **Best for**: First-time setup automation

### 3. **Docker Compose**
- **File**: `docker-compose.yml`
- **Usage**: `docker-compose <command>`
- **Best for**: Container orchestration

## 🚀 Getting Started (3 Options)

### Option A: Makefile (Simplest)
```bash
git clone <repo>
cd lab-llm
make setup
```

### Option B: Setup Script
```bash
git clone <repo>
cd lab-llm
./scripts/setup.sh
```

### Option C: Manual Docker
```bash
git clone <repo>
cd lab-llm
cp env.example .env
# Edit .env file
npm install
npm run db:generate
docker-compose up -d
docker-compose run --rm migrate
```

## 💻 Development Workflows

### Starting Development
```bash
# Start everything
make dev-full

# Or start services only, then run app locally
make services-start
npm run dev
```

### After Code Changes
```bash
# Quick update (app only)
make quick-update

# Full update (rebuild everything)
make update
```

### Database Management
```bash
# Generate new migrations after schema changes
make db-generate

# Apply migrations
make db-migrate-docker

# Visual database management
make db-studio

# Reset database (development)
make db-reset
```

## 🐳 Production Deployment

### Build and Deploy
```bash
# Build production images
make prod-build

# Start production environment
make prod-start

# Or manually
docker-compose up -d
```

### Backup and Maintenance
```bash
# Create database backup
make backup-db

# Clean up Docker resources
make clean

# View production logs
make logs
```

## 🔧 Troubleshooting Workflows

### Check System Health
```bash
# Check all dependencies
make check-deps

# Check service status
make status

# Check service health
make health

# Show environment info
make env-info
```

### Debugging Issues
```bash
# View all logs
make logs

# View specific service logs
make logs-app
make logs-db
make logs-qdrant

# Open shell in containers
make shell-app
make shell-db
```

### Common Problem Resolution
```bash
# Restart everything
make restart

# Rebuild and restart
make update

# Nuclear option (reset everything)
make down-volumes
make setup
```

## 📊 Monitoring Commands

### Service URLs
```bash
make urls
```
Shows:
- App: http://localhost:3000
- PostgreSQL: localhost:5432
- Qdrant: http://localhost:6333

### Real-time Monitoring
```bash
# Follow all logs
make logs

# Check health continuously
watch make health

# Monitor Docker stats
docker stats
```

## 🔄 Common Task Automation

### Daily Development Routine
```bash
# Start your day
make dev

# After making changes
make quick-update

# Before committing
make lint
```

### Weekly Maintenance
```bash
# Update dependencies
make update-deps

# Backup database
make backup-db

# Clean up Docker
make clean
```

### Deployment Pipeline
```bash
# Pre-deployment checks
make lint
make prod-build

# Deploy
make prod-start

# Post-deployment verification
make health
make logs-app
```

## 🎯 Best Practices

### Development
1. **Always use `make dev`** for local development
2. **Use `make quick-update`** for rapid iteration
3. **Run `make health`** if something seems wrong
4. **Use `make backup-db`** before major database changes

### Production
1. **Always backup** before updates: `make backup-db`
2. **Use `make prod-start`** for production deployment
3. **Monitor logs** with `make logs` after deployment
4. **Check health** with `make health` regularly

### Database
1. **Generate migrations** after schema changes: `make db-generate`
2. **Always migrate** in Docker: `make db-migrate-docker`
3. **Use `make db-studio`** for visual database management
4. **Backup before resets**: `make backup-db` then `make db-reset`

## 🆘 Emergency Procedures

### Complete Reset (Nuclear Option)
```bash
make down-volumes  # ⚠️ DELETES ALL DATA
make setup         # Fresh start
```

### Service Recovery
```bash
# If app is down
make quick-update

# If database is corrupted
make backup-db     # If possible
make db-reset

# If Docker is acting up
make down
make clean
make start
```

### Rollback Procedure
```bash
# Stop current version
make stop

# Restore database backup (manual)
# Restore from backups/ directory

# Rebuild with previous code
git checkout <previous-commit>
make update
```

## 📚 Reference Documents

- `Makefile` - All automation commands
- `MAKEFILE_REFERENCE.md` - Quick command reference
- `README.md` - Complete project documentation
- `docker-compose.yml` - Service definitions
- `scripts/setup.sh` - Automated setup script

## 🎉 Pro Tips

1. **Use tab completion**: Most commands support tab completion
2. **Chain commands**: `make stop && make clean && make start`
3. **Background services**: `make services-start` then `npm run dev`
4. **Quick health check**: `make urls` to see all endpoints
5. **Emergency stop**: `Ctrl+C` then `make stop`

Remember: When in doubt, run `make help` to see all available commands!
