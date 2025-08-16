'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);

    for (const file of acceptedFiles) {
      if (!file.type.includes('pdf')) {
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        // Success message removed
      } catch (error) {
        console.error('Error:', error);
        // Error message removed
      }
    }

    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    disabled: isUploading,
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p>Uploading...</p>
        ) : isDragActive ? (
          <p>Drop the PDF files here...</p>
        ) : (
          <p>Drag & drop PDF files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}
