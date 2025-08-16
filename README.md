# 🤖 AI-Powered Customer Support Portal

A comprehensive SaaS application that provides intelligent customer support through AI-powered document chat. Upload your knowledge base and let AI provide instant, accurate answers to customer queries based on your documentation.

## ✨ Features

### 🔐 **Authentication & User Management**
- **Secure Login/Registration** - JWT-based authentication with bcrypt password hashing
- **Role-Based Access** - Admin and user roles with appropriate permissions
- **Route Protection** - Middleware-based route protection for authenticated areas
- **User Profiles** - Complete user management with company and role information

### 🤖 **AI-Powered Support**
- **Document Chat** - Ask questions and get answers based on uploaded documents
- **Vector Search** - Advanced similarity search using Qdrant vector database
- **Context-Aware Responses** - AI understands document context for accurate answers
- **LangChain Integration** - Powered by OpenAI GPT-4 and embeddings

### 📄 **Document Management**
- **PDF Upload** - Upload and process PDF documents into the knowledge base
- **Document Processing** - Automatic text extraction and chunking
- **Document Library** - View and manage uploaded documents
- **Vector Storage** - Documents stored as embeddings for fast retrieval

### 🎨 **Professional UI/UX**
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern Interface** - Built with TailwindCSS for a professional look
- **Comprehensive Navigation** - Sidebar navigation for easy access to all features
- **Loading States** - Professional loading indicators and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker (for Qdrant vector database)
- OpenAI API key

### 1. Clone and Install
```bash
git clone <repository-url>
cd lab-llm
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```bash
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret for authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Qdrant Configuration
QDRANT_URL=http://localhost:6333
```

### 3. Start Qdrant Database
```bash
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
```

### 4. Run the Application
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

##  Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/          # Chat API
│   │   ├── documents/     # Document management
│   │   └── upload/        # File upload
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── chat/              # Chat interface
│   ├── admin/             # Admin dashboard
│   └── docs/              # Document management
├── components/            # React components
│   ├── AppLayout.tsx      # Main layout with sidebar
│   ├── Chat.tsx           # Chat interface
│   ├── Upload.tsx         # File upload component
│   └── DocumentsList.tsx  # Document management
├── lib/                   # Utilities and configurations
│   ├── auth.tsx           # Authentication context
│   ├── langchain.ts       # LangChain setup
│   └── qdrant.ts          # Vector database config
└── types/                 # TypeScript type definitions
```

## 🛠 Technology Stack

- **Frontend**: Next.js 15.4.6, TypeScript, TailwindCSS
- **Authentication**: JWT, bcryptjs, middleware-based protection
- **AI/ML**: LangChain, OpenAI GPT-4, text-embedding-3-small
- **Database**: Qdrant vector database
- **File Processing**: PDF parsing and text chunking
- **UI Components**: React with custom components
- **Styling**: TailwindCSS for responsive design

## 📖 Usage Guide

### For End Users
1. **Register/Login** - Create an account or use demo credentials
2. **Ask Questions** - Use the chat interface to ask questions
3. **Get AI Answers** - Receive instant responses based on the knowledge base

### For Administrators
1. **Upload Documents** - Add PDF files to the knowledge base
2. **Manage Documents** - View and organize uploaded documents
3. **Monitor Usage** - Track system usage and performance

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Chat & Documents
- `POST /api/chat` - Send chat messages and get AI responses
- `GET /api/documents` - List uploaded documents
- `POST /api/upload` - Upload new documents

## 🐳 Docker Deployment

### Qdrant Setup
```bash
# Start Qdrant
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant

# Verify Qdrant is running
curl http://localhost:6333/collections
```

### Application Deployment
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Route Protection** - Middleware protects authenticated routes
- **Environment Variables** - Secure configuration management
- **CORS Protection** - Built-in security headers

## 🧪 Development

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run lint
npm run format
```

### Type Checking
```bash
npm run type-check
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@example.com or create an issue in the repository.

---

**Built with ❤️ using Next.js, LangChain, and OpenAI**
