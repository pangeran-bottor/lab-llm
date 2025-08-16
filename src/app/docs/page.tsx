import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DocsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-lg text-gray-600">
            Complete documentation for the AI Customer Support Portal API endpoints.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              The AI Customer Support Portal provides REST API endpoints for chat functionality and document management.
              All endpoints require JWT authentication.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">
                <strong>Base URL:</strong> http://localhost:3000/api
              </p>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              API endpoints require JWT authentication. Include the JWT token in the Authorization header:
            </p>
            <div className="bg-gray-100 rounded p-4 font-mono text-sm mb-4">
              <p><strong>Authorization:</strong> Bearer &lt;your-jwt-token&gt;</p>
            </div>
            <p className="text-gray-700 mb-4">
              To obtain a JWT token, authenticate through the login endpoint:
            </p>
            <div className="bg-gray-100 rounded p-4 font-mono text-sm">
              <p><strong>POST</strong> /api/auth/login</p>
              <p><strong>Body:</strong> {"{ \"email\": \"your@email.com\", \"password\": \"yourpassword\" }"}</p>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Endpoints</h2>
          
          {/* Chat Endpoint */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">POST</span>
                <code className="text-lg font-mono">/api/chat</code>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">Send a message to the AI assistant and get a response based on the knowledge base.</p>
              
              <h4 className="font-semibold mb-2">Request Body:</h4>
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto mb-4">
{`{
  "message": "How do I reset my password?"
}`}
              </pre>
              
              <h4 className="font-semibold mb-2">Response:</h4>
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">
{`{
  "response": "To reset your password, please follow these steps..."
}`}
              </pre>
            </div>
          </div>

          {/* Upload Endpoint */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">POST</span>
                <code className="text-lg font-mono">/api/upload</code>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">Upload PDF documents to the knowledge base.</p>
              
              <h4 className="font-semibold mb-2">Request:</h4>
              <p className="text-sm text-gray-600 mb-2">Content-Type: multipart/form-data</p>
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto mb-4">
{`Form Data:
file: [PDF file]`}
              </pre>
              
              <h4 className="font-semibold mb-2">Response:</h4>
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">
{`{
  "message": "Document processed successfully"
}`}
              </pre>
            </div>
          </div>

          {/* Documents Endpoint */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3">GET</span>
                <code className="text-lg font-mono">/api/documents</code>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">Retrieve information about uploaded documents and collection status.</p>
              
              <h4 className="font-semibold mb-2">Response:</h4>
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">
{`{
  "collection": {
    "name": "support_docs",
    "pointsCount": 42,
    "status": "green"
  },
  "documents": [
    {
      "filename": "user-guide.pdf",
      "chunks": [
        {
          "id": "abc123",
          "text": "Welcome to our platform...",
          "textLength": 150
        }
      ],
      "totalChunks": 5
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Error Responses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Responses</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-600">401 Unauthorized</h4>
                <p className="text-sm text-gray-600">Missing or invalid authentication credentials.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">400 Bad Request</h4>
                <p className="text-sm text-gray-600">Invalid request format or missing required parameters.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">500 Internal Server Error</h4>
                <p className="text-sm text-gray-600">Server error occurred while processing the request.</p>
              </div>
            </div>
          </div>
        </section>

        {/* cURL Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">cURL Examples</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="font-semibold mb-3">Chat with AI:</h4>
            <pre className="bg-gray-900 text-green-400 rounded p-4 text-sm overflow-x-auto mb-6">
{`curl -X POST http://localhost:3000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "How do I reset my password?"}'`}
            </pre>

            <h4 className="font-semibold mb-3">Upload Document:</h4>
            <pre className="bg-gray-900 text-green-400 rounded p-4 text-sm overflow-x-auto mb-6">
{`curl -X POST http://localhost:3000/api/upload \\
  -u admin:password \\
  -F "file=@document.pdf"`}
            </pre>

            <h4 className="font-semibold mb-3">Get Documents:</h4>
            <pre className="bg-gray-900 text-green-400 rounded p-4 text-sm overflow-x-auto">
{`curl -X GET http://localhost:3000/api/documents \\
  -u admin:password`}
            </pre>
          </div>
        </section>

        {/* SDKs and Libraries */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 15.4.6</li>
                  <li>• React with TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Heroicons</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend & AI</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• LangChain for AI orchestration</li>
                  <li>• OpenAI GPT-4 & Embeddings</li>
                  <li>• Qdrant Vector Database</li>
                  <li>• PDF parsing with pdf-parse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
    </ProtectedRoute>
  );
}
