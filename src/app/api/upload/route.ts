import { NextRequest, NextResponse } from 'next/server';
import { storeDocument } from '@/lib/langchain';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { requireAuth } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  // JWT authentication check
  const authResult = requireAuth(request);
  
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

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
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
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
