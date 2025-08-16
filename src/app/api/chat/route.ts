import { NextRequest, NextResponse } from 'next/server';
import { similaritySearch, generateResponse } from '@/lib/langchain';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Search for relevant documents
    const docs = await similaritySearch(message);
    
    // Generate response using context
    const response = await generateResponse(message, docs);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
