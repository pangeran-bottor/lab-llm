import { NextRequest, NextResponse } from 'next/server';
import client, { COLLECTION_NAME } from '@/lib/qdrant';
import { requireAuth } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  // JWT authentication check
  const authResult = requireAuth(request);
  
  if (!authResult.success) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  try {
    // Get collection info
    const collectionInfo = await client.getCollection(COLLECTION_NAME);
    
    // Get all points (documents) with their payloads
    const searchResult = await client.scroll(COLLECTION_NAME, {
      limit: 100, // Adjust as needed
      with_payload: true,
      with_vector: false // We don't need the vectors for display
    });

    // Group documents by filename
    const documents = new Map();
    
    searchResult.points.forEach(point => {
      const payload = point.payload as any;
      const filename = payload?.metadata?.filename || 'Unknown';
      if (!documents.has(filename)) {
        documents.set(filename, {
          filename,
          chunks: [],
          totalChunks: 0,
          uploadedBy: payload?.metadata?.uploadedBy || 'Unknown',
          uploadedAt: payload?.metadata?.uploadedAt || 'Unknown'
        });
      }
      
      documents.get(filename).chunks.push({
        id: point.id,
        text: payload?.text || '',
        textLength: (payload?.text || '').length
      });
      documents.get(filename).totalChunks++;
    });

    return NextResponse.json({
      collection: {
        name: COLLECTION_NAME,
        pointsCount: collectionInfo.points_count,
        status: collectionInfo.status
      },
      documents: Array.from(documents.values())
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
