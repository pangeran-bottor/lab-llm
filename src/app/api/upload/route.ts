import { NextRequest, NextResponse } from 'next/server';
import { storeDocument } from '@/lib/langchain';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { requireAuth } from '@/lib/auth-utils';
import { logRequest, logError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  logRequest(request, 'upload');
  // JWT authentication check
  const authResult = await requireAuth(request);
  
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

    try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 10MB.' },
        { status: 413 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Parse PDF using the correct import
    const data = await pdf(buffer);
    
    // Store in vector database
    await storeDocument(data.text, { 
      filename: file.name,
      uploadedBy: authResult.user.email,
      uploadedAt: new Date().toISOString()
    });
    
    return NextResponse.json({ message: 'Document processed successfully' });
  } catch (error) {
    logError(error, 'upload');
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('authentication') || error.message.includes('authorization')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      if (error.message.includes('PDF') || error.message.includes('parse')) {
        return NextResponse.json(
          { error: 'Invalid PDF file or file is corrupted' },
          { status: 400 }
        );
      }
      if (error.message.includes('size') || error.message.includes('large')) {
        return NextResponse.json(
          { error: 'File is too large. Please upload a smaller PDF.' },
          { status: 413 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to process document. Please try again.' },
      { status: 500 }
    );
  }
}
