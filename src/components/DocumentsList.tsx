'use client';

import { useState, useEffect } from 'react';

interface Document {
  filename: string;
  chunks: Array<{
    id: string;
    text: string;
    textLength: number;
  }>;
  totalChunks: number;
  uploadedBy?: string;
  uploadedAt?: string;
}

interface DocumentsData {
  collection: {
    name: string;
    pointsCount: number;
    status: string;
  };
  documents: Document[];
}

export default function DocumentsList() {
  const [documents, setDocuments] = useState<DocumentsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/documents', {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError('Error loading documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="p-4">Loading documents...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchDocuments}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Document Collection Status</h2>
        {documents && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Collection:</strong> {documents.collection.name}</p>
            <p><strong>Status:</strong> {documents.collection.status}</p>
            <p><strong>Total Chunks:</strong> {documents.collection.pointsCount}</p>
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Uploaded Documents</h3>
        <button 
          onClick={fetchDocuments}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {documents && documents.documents.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No documents uploaded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {documents?.documents.map((doc, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2">{doc.filename}</h4>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">
                  {doc.totalChunks} chunks
                </p>
                {doc.uploadedBy && (
                  <div className="text-xs text-gray-500">
                    <p>Uploaded by: {doc.uploadedBy}</p>
                    {doc.uploadedAt && doc.uploadedAt !== 'Unknown' && (
                      <p>At: {new Date(doc.uploadedAt).toLocaleString()}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {doc.chunks.slice(0, 3).map((chunk, chunkIndex) => (
                  <div key={chunk.id} className="bg-gray-50 p-2 rounded text-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      Chunk {chunkIndex + 1} ({chunk.textLength} characters)
                    </p>
                    <p className="line-clamp-3">
                      {chunk.text.substring(0, 200)}
                      {chunk.text.length > 200 ? '...' : ''}
                    </p>
                  </div>
                ))}
                {doc.chunks.length > 3 && (
                  <p className="text-xs text-gray-500">
                    ... and {doc.chunks.length - 3} more chunks
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
