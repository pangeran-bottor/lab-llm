# Lab-LLM Makefile
# This Makefile provides convenient commands for development and deployment

# Variables
PROJECT_NAME = lab-llm
COMPOSE_FILE = docker-compose.yml
ENV_FILE = .env

# Colors for output
BLUE = \033[34m
GREEN = \033[32m
YELLOW = \033[33m
RED = \033[31m
NC = \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Help target
.PHONY: help
help: ## Show this help message
	@echo "$(BLUE)Lab-LLM Development Commands$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# ==============================================================================
# SETUP COMMANDS
# ==============================================================================

.PHONY: setup
setup: ## Complete project setup (first time)
	@echo "$(BLUE)🚀 Setting up Lab-LLM...$(NC)"
	@$(MAKE) check-deps
	@$(MAKE) env-setup
	@$(MAKE) install
	@$(MAKE) db-generate
	@$(MAKE) docker-build
	@$(MAKE) start
	@$(MAKE) db-migrate-docker
	@echo "$(GREEN)✅ Setup complete! Application running at http://localhost:3000$(NC)"

.PHONY: check-deps
check-deps: ## Check required dependencies
	@echo "$(BLUE)🔍 Checking dependencies...$(NC)"
	@command -v docker >/dev/null 2>&1 || { echo "$(RED)❌ Docker is required but not installed$(NC)"; exit 1; }
	@command -v docker-compose >/dev/null 2>&1 || { echo "$(RED)❌ Docker Compose is required but not installed$(NC)"; exit 1; }
	@command -v node >/dev/null 2>&1 || { echo "$(RED)❌ Node.js is required but not installed$(NC)"; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "$(RED)❌ npm is required but not installed$(NC)"; exit 1; }
	@echo "$(GREEN)✅ All dependencies found$(NC)"

.PHONY: env-setup
env-setup: ## Setup environment file
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "$(BLUE)📝 Creating .env file from example...$(NC)"; \
		cp env.example $(ENV_FILE); \
		echo "$(YELLOW)⚠️  Please edit .env with your configuration:$(NC)"; \
		echo "   - OPENAI_API_KEY (required)"; \
		echo "   - JWT_SECRET (recommended to change)"; \
	else \
		echo "$(GREEN)✅ .env file already exists$(NC)"; \
	fi

.PHONY: install
install: ## Install dependencies
	@echo "$(BLUE)📦 Installing dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)✅ Dependencies installed$(NC)"

# ==============================================================================
# DEVELOPMENT COMMANDS
# ==============================================================================

.PHONY: dev
dev: ## Start development server locally
	@echo "$(BLUE)🔥 Starting development server...$(NC)"
	@$(MAKE) services-start
	@sleep 3
	@npm run dev

.PHONY: dev-full
dev-full: ## Start full development environment (services + app)
	@echo "$(BLUE)🚀 Starting full development environment...$(NC)"
	@$(MAKE) services-start
	@sleep 5
	@$(MAKE) db-migrate-local &
	@npm run dev

.PHONY: services-start
services-start: ## Start only database services (postgres + qdrant)
	@echo "$(BLUE)🗄️ Starting database services...$(NC)"
	@docker-compose up postgres qdrant -d
	@echo "$(GREEN)✅ Database services started$(NC)"

.PHONY: services-stop
services-stop: ## Stop database services
	@echo "$(BLUE)🛑 Stopping database services...$(NC)"
	@docker-compose stop postgres qdrant
	@echo "$(GREEN)✅ Database services stopped$(NC)"

# ==============================================================================
# DOCKER COMMANDS
# ==============================================================================

.PHONY: start
start: ## Start all services with Docker Compose
	@echo "$(BLUE)🐳 Starting all services...$(NC)"
	@docker-compose up -d
	@echo "$(GREEN)✅ All services started$(NC)"
	@$(MAKE) status

.PHONY: stop
stop: ## Stop all services
	@echo "$(BLUE)🛑 Stopping all services...$(NC)"
	@docker-compose stop
	@echo "$(GREEN)✅ All services stopped$(NC)"

.PHONY: restart
restart: ## Restart all services
	@echo "$(BLUE)🔄 Restarting all services...$(NC)"
	@docker-compose restart
	@echo "$(GREEN)✅ All services restarted$(NC)"

.PHONY: down
down: ## Stop and remove all containers
	@echo "$(BLUE)🗑️ Stopping and removing containers...$(NC)"
	@docker-compose down
	@echo "$(GREEN)✅ Containers removed$(NC)"

.PHONY: down-volumes
down-volumes: ## Stop and remove containers with volumes (⚠️ DELETES DATA)
	@echo "$(RED)⚠️ This will delete all data! Continue? [y/N]$(NC)" && read ans && [ $${ans:-N} = y ]
	@docker-compose down -v
	@echo "$(GREEN)✅ Containers and volumes removed$(NC)"

.PHONY: docker-build
docker-build: ## Build Docker images
	@echo "$(BLUE)🔨 Building Docker images...$(NC)"
	@docker-compose build
	@echo "$(GREEN)✅ Docker images built$(NC)"

.PHONY: docker-rebuild
docker-rebuild: ## Rebuild Docker images (no cache)
	@echo "$(BLUE)🔨 Rebuilding Docker images...$(NC)"
	@docker-compose build --no-cache
	@echo "$(GREEN)✅ Docker images rebuilt$(NC)"

# ==============================================================================
# DATABASE COMMANDS
# ==============================================================================

.PHONY: db-generate
db-generate: ## Generate database migrations
	@echo "$(BLUE)🗄️ Generating database schema...$(NC)"
	@npm run db:generate
	@echo "$(GREEN)✅ Database schema generated$(NC)"

.PHONY: db-migrate-local
db-migrate-local: ## Run database migrations locally
	@echo "$(BLUE)🔄 Running database migrations locally...$(NC)"
	@npm run db:migrate
	@echo "$(GREEN)✅ Database migrations completed$(NC)"

.PHONY: db-migrate-docker
db-migrate-docker: ## Run database migrations in Docker
	@echo "$(BLUE)🔄 Initializing database in Docker...$(NC)"
	@docker-compose run --rm migrate
	@echo "$(GREEN)✅ Database initialization completed$(NC)"

.PHONY: db-studio
db-studio: ## Open database studio
	@echo "$(BLUE)🎨 Opening database studio...$(NC)"
	@npm run db:studio

.PHONY: db-reset
db-reset: ## Reset database (⚠️ DELETES DATA)
	@echo "$(RED)⚠️ This will delete all database data! Continue? [y/N]$(NC)" && read ans && [ $${ans:-N} = y ]
	@docker-compose stop postgres
	@docker volume rm lab-llm_postgres_data 2>/dev/null || true
	@docker-compose up postgres -d
	@sleep 5
	@$(MAKE) db-migrate-docker
	@echo "$(GREEN)✅ Database reset completed$(NC)"

# ==============================================================================
# CODE UPDATE COMMANDS
# ==============================================================================

.PHONY: update
update: ## Update after code changes (rebuild and restart)
	@echo "$(BLUE)🔄 Updating application after code changes...$(NC)"
	@$(MAKE) stop
	@$(MAKE) install
	@$(MAKE) db-generate
	@$(MAKE) docker-build
	@$(MAKE) start
	@$(MAKE) db-migrate-docker
	@echo "$(GREEN)✅ Application updated successfully$(NC)"

.PHONY: quick-update
quick-update: ## Quick update (just rebuild app container)
	@echo "$(BLUE)⚡ Quick update (app container only)...$(NC)"
	@docker-compose stop app
	@docker-compose build app
	@docker-compose up app -d
	@echo "$(GREEN)✅ App container updated$(NC)"

.PHONY: update-deps
update-deps: ## Update dependencies and rebuild
	@echo "$(BLUE)📦 Updating dependencies...$(NC)"
	@npm update
	@$(MAKE) docker-rebuild
	@$(MAKE) restart
	@echo "$(GREEN)✅ Dependencies updated$(NC)"

# ==============================================================================
# UTILITY COMMANDS
# ==============================================================================

.PHONY: status
status: ## Show status of all services
	@echo "$(BLUE)📊 Service Status:$(NC)"
	@docker-compose ps

.PHONY: logs
logs: ## Show logs for all services
	@echo "$(BLUE)📋 Showing logs...$(NC)"
	@docker-compose logs -f

.PHONY: logs-app
logs-app: ## Show app logs only
	@echo "$(BLUE)📋 Showing app logs...$(NC)"
	@docker-compose logs -f app

.PHONY: logs-db
logs-db: ## Show database logs only
	@echo "$(BLUE)📋 Showing database logs...$(NC)"
	@docker-compose logs -f postgres

.PHONY: logs-qdrant
logs-qdrant: ## Show Qdrant logs only
	@echo "$(BLUE)📋 Showing Qdrant logs...$(NC)"
	@docker-compose logs -f qdrant

.PHONY: shell-app
shell-app: ## Open shell in app container
	@echo "$(BLUE)🐚 Opening shell in app container...$(NC)"
	@docker-compose exec app sh

.PHONY: shell-db
shell-db: ## Open PostgreSQL shell
	@echo "$(BLUE)🐚 Opening PostgreSQL shell...$(NC)"
	@docker-compose exec postgres psql -U postgres -d lab_llm

.PHONY: health
health: ## Check health of all services
	@echo "$(BLUE)🏥 Checking service health...$(NC)"
	@echo "App Health:"
	@curl -f http://localhost:3000/api/init-db 2>/dev/null && echo "$(GREEN)✅ App: Healthy$(NC)" || echo "$(RED)❌ App: Unhealthy$(NC)"
	@echo "Qdrant Health:"
	@curl -f http://localhost:6333/health 2>/dev/null && echo "$(GREEN)✅ Qdrant: Healthy$(NC)" || echo "$(RED)❌ Qdrant: Unhealthy$(NC)"

.PHONY: clean
clean: ## Clean up Docker resources
	@echo "$(BLUE)🧹 Cleaning up Docker resources...$(NC)"
	@docker system prune -f
	@echo "$(GREEN)✅ Docker cleanup completed$(NC)"

.PHONY: backup-db
backup-db: ## Backup database
	@echo "$(BLUE)💾 Creating database backup...$(NC)"
	@mkdir -p backups
	@docker-compose exec postgres pg_dump -U postgres lab_llm > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✅ Database backup created in backups/ directory$(NC)"

# ==============================================================================
# TESTING & LINTING
# ==============================================================================

.PHONY: lint
lint: ## Run linting
	@echo "$(BLUE)🔍 Running linter...$(NC)"
	@npm run lint

.PHONY: lint-fix
lint-fix: ## Fix linting issues
	@echo "$(BLUE)🔧 Fixing linting issues...$(NC)"
	@npm run lint -- --fix

.PHONY: format
format: ## Format code (if prettier is configured)
	@echo "$(BLUE)✨ Formatting code...$(NC)"
	@npx prettier --write .

# ==============================================================================
# PRODUCTION COMMANDS
# ==============================================================================

.PHONY: prod-build
prod-build: ## Build for production
	@echo "$(BLUE)🏭 Building for production...$(NC)"
	@npm run build

.PHONY: prod-start
prod-start: ## Start production environment
	@echo "$(BLUE)🚀 Starting production environment...$(NC)"
	@docker-compose -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Production environment started$(NC)"

# ==============================================================================
# INFORMATION COMMANDS
# ==============================================================================

.PHONY: urls
urls: ## Show all service URLs
	@echo "$(BLUE)🌐 Service URLs:$(NC)"
	@echo "  App:        http://localhost:3000"
	@echo "  PostgreSQL: localhost:5432"
	@echo "  Qdrant:     http://localhost:6333"
	@echo "  Qdrant UI:  http://localhost:6333/dashboard"

.PHONY: env-info
env-info: ## Show environment information
	@echo "$(BLUE)📋 Environment Information:$(NC)"
	@echo "  Node.js:    $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "  npm:        $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "  Docker:     $(shell docker --version 2>/dev/null || echo 'Not installed')"
	@echo "  Compose:    $(shell docker-compose --version 2>/dev/null || echo 'Not installed')"
	@echo "  .env file:  $(shell [ -f $(ENV_FILE) ] && echo 'Exists' || echo 'Missing')"
