import Chat from '@/components/Chat';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="bg-gray-100 min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                AI Customer Support
              </h1>
              <p className="text-gray-600">
                Ask questions about our products and services. I'm here to help!
              </p>
            </div>
            <Chat />
            <div className="text-center mt-6 text-sm text-gray-500">
              <p>
                Can't find what you're looking for? 
                <a href="mailto:support@yourdomain.com" className="text-blue-500 hover:underline ml-1">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
