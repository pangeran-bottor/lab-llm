import { NextRequest, NextResponse } from 'next/server';
import { initializeQdrant } from '@/lib/qdrant';

export async function POST() {
  try {
    await initializeQdrant();
    return NextResponse.json({ 
      message: 'Qdrant collection initialized successfully' 
    });
  } catch (error) {
    console.error('Error initializing Qdrant:', error);
    return NextResponse.json(
      { error: 'Failed to initialize Qdrant collection' },
      { status: 500 }
    );
  }
}
