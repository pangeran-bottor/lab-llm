'use client';

import { useState } from 'react';
import Upload from '@/components/Upload';
import DocumentsList from '@/components/DocumentsList';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'documents'>('upload');

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Document Management
          </h1>            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                📤 Upload Documents
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                📋 View Documents
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'upload' && <Upload />}
            {activeTab === 'documents' && <DocumentsList />}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
