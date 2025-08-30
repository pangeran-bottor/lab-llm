import { NextRequest, NextResponse } from 'next/server';
import { similaritySearch, generateResponse } from '@/lib/langchain';
import { logRequest, logError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  logRequest(request, 'chat');
  try {
    const { message } = await request.json();
    
    // Search for relevant documents
    const docs = await similaritySearch(message);
    
    // Generate response using context
    const response = await generateResponse(message, docs);
    
    return NextResponse.json({ response });
  } catch (error) {
    logError(error, 'chat');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
