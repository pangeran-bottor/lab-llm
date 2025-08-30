'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Notification from './Notification';
import { useNotification } from '@/hooks/useNotification';

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const { notification, isVisible, showSuccess, showError, hideNotification } = useNotification();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const file of acceptedFiles) {
      if (!file.type.includes('pdf')) {
        errorCount++;
        errors.push(`${file.name} is not a PDF file`);
        continue;
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
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Upload failed for ${file.name}`);
        }

        const result = await response.json();
        successCount++;
      } catch (error) {
        console.error('Error uploading file:', error);
        errorCount++;
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Upload failed'}`);
      }
    }

    setIsUploading(false);

    // Show appropriate notifications
    if (successCount > 0 && errorCount === 0) {
      showSuccess(
        'Upload Successful!', 
        `Successfully uploaded ${successCount} document${successCount > 1 ? 's' : ''}.`
      );
    } else if (successCount > 0 && errorCount > 0) {
      showSuccess(
        'Partial Upload Success', 
        `${successCount} file${successCount > 1 ? 's' : ''} uploaded successfully, ${errorCount} failed.`
      );
      // Show error details after a delay
      setTimeout(() => {
        showError(
          'Upload Errors',
          errors.slice(0, 3).join(', ') + (errors.length > 3 ? '...' : '')
        );
      }, 2000);
    } else if (errorCount > 0) {
      showError(
        'Upload Failed',
        errors.slice(0, 2).join(', ') + (errors.length > 2 ? '...' : '')
      );
    }
  }, [showSuccess, showError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    disabled: isUploading,
  });

  return (
    <>
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
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p>Uploading documents...</p>
            </div>
          ) : isDragActive ? (
            <p>Drop the PDF files here...</p>
          ) : (
            <div className="space-y-2">
              <p>Drag & drop PDF files here, or click to select files</p>
              <p className="text-sm text-gray-500">Supports multiple file upload</p>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          show={isVisible}
          onClose={hideNotification}
        />
      )}
    </>
  );
}
