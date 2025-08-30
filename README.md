# Lab-LLM: AI Customer Support Portal

A modern AI-powered customer support application built with Next.js, PostgreSQL, and Docker.

## 🚀 Features

- **AI-Powered Chat**: Intelligent customer support using OpenAI and document-based responses
- **User Authentication**: Secure JWT-based authentication with role management
- **Document Management**: Upload and manage knowledge base documents (PDF support)
- **Vector Search**: Fast document retrieval using Qdrant vector database
- **Database Integration**: PostgreSQL for persistent user and application data
- **Dockerized Deployment**: Complete containerized setup with Docker Compose

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Vector DB**: Qdrant for document embeddings
- **AI**: OpenAI GPT models, LangChain
- **Authentication**: JWT tokens, bcrypt password hashing
- **Deployment**: Docker, Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- OpenAI API key

## 🚀 Quick Start

### Option 1: Using Makefile (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lab-llm
   ```

2. **Complete setup with one command**:
   ```bash
   make setup
   ```

3. **Configure environment variables** when prompted:
   - Add your `OPENAI_API_KEY`
   - Set a secure `JWT_SECRET`

### Option 2: Automated Setup Script

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lab-llm
   ```

2. **Run the setup script**:
   ```bash
   ./scripts/setup.sh
   ```

3. **Configure environment variables** when prompted:
   - Add your `OPENAI_API_KEY`
   - Set a secure `JWT_SECRET`

### Option 3: Manual Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd lab-llm
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Generate database schema**:
   ```bash
   npm run db:generate
   ```

4. **Start services**:
   ```bash
   docker-compose up -d
   ```

5. **Run migrations**:
   ```bash
   docker-compose run --rm migrate
   ```

## 🌐 Access Points

After setup, the application will be available at:

- **Application**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Qdrant**: http://localhost:6333

## 📁 Project Structure

```
lab-llm/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── chat/              # Chat interface
│   │   ├── admin/             # Admin panel
│   │   └── auth/              # Authentication pages
│   ├── components/            # React components
│   ├── lib/                   # Utility libraries
│   │   ├── db.ts             # Database configuration
│   │   ├── schema.ts         # Database schema
│   │   ├── user-db.ts        # User database operations
│   │   └── auth.tsx          # Authentication context
│   └── types/                 # TypeScript type definitions
├── drizzle/                   # Database migrations
├── scripts/                   # Setup and utility scripts
├── docker-compose.yml         # Docker services configuration
├── Dockerfile                 # Application container
└── drizzle.config.ts          # Database configuration
```

## 🔧 Development

### Quick Development Commands (Makefile)

```bash
# Complete setup (first time)
make setup

# Start development environment
make dev                    # Local dev server + database services
make dev-full              # Full development environment

# Docker operations
make start                 # Start all services
make stop                  # Stop all services
make restart               # Restart all services
make status                # Show service status

# After code changes
make update                # Full update (rebuild + restart)
make quick-update          # Quick app-only update

# Database operations
make db-generate           # Generate migrations
make db-migrate-docker     # Run migrations in Docker
make db-studio            # Open database studio
make db-reset             # Reset database (⚠️ deletes data)

# Utility commands
make logs                  # Show all logs
make logs-app             # App logs only
make health               # Health check
make urls                 # Show service URLs
make help                 # Show all available commands
```

### Manual Development (Alternative)

1. **Start the database**:
   ```bash
   docker-compose up postgres qdrant -d
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**: http://localhost:3000

### Database Operations

- **Generate migrations**: `npm run db:generate`
- **Run migrations**: `npm run db:migrate`
- **Open database studio**: `npm run db:studio`

### Docker Commands

- **Start all services**: `docker-compose up -d`
- **View logs**: `docker-compose logs -f`
- **Stop services**: `docker-compose down`
- **Rebuild application**: `docker-compose build app`

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/lab_llm` |
| `JWT_SECRET` | Secret for JWT token signing | `your-secret-key-change-this-in-production` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Required |
| `QDRANT_URL` | Qdrant vector database URL | `http://localhost:6333` |
| `NODE_ENV` | Environment mode | `development` |

## 👥 User Roles

- **User**: Basic access to chat interface
- **Admin**: Full access including document management and admin panel

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Chat
- `POST /api/chat` - Send chat message

### Documents
- `POST /api/upload` - Upload documents
- `GET /api/documents` - List documents

### Database
- `GET /api/init-db` - Database health check
- `POST /api/init-db` - Initialize database

## 🚨 Production Deployment

1. **Update environment variables** for production
2. **Use secure JWT secret**: Generate a strong random string
3. **Configure database**: Use a managed PostgreSQL service
4. **SSL/TLS**: Enable HTTPS in production
5. **Resource limits**: Configure Docker resource constraints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database connection failed**:
   - Check if PostgreSQL is running: `docker-compose ps`
   - Verify DATABASE_URL in .env file

2. **OpenAI API errors**:
   - Ensure OPENAI_API_KEY is set correctly
   - Check API quota and billing

3. **Docker issues**:
   - Restart Docker daemon
   - Run `docker-compose down && docker-compose up -d`

4. **Port conflicts**:
   - Check if ports 3000, 5432, or 6333 are in use
   - Update docker-compose.yml port mappings if needed

### Logs

View application logs:
```bash
docker-compose logs -f app
```

View database logs:
```bash
docker-compose logs -f postgres
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [OpenAI API Documentation](https://platform.openai.com/docs)