import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({ 
  url: process.env.QDRANT_URL || 'http://localhost:6333'
});

export const COLLECTION_NAME = 'support_docs';

export async function initializeQdrant() {
  try {
    // Check if collection exists
    const collections = await client.getCollections();
    const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

    if (!exists) {
      console.log('Creating Qdrant collection:', COLLECTION_NAME);
      // Create collection with specified parameters
      await client.createCollection(COLLECTION_NAME, {
        vectors: {
          size: 1536, // OpenAI text-embedding-3-small dimensions
          distance: 'Cosine'
        }
      });
      console.log('Collection created successfully');
    } else {
      console.log('Collection already exists:', COLLECTION_NAME);
    }
  } catch (error) {
    console.error('Error initializing Qdrant:', error);
    throw error;
  }
}

export default client;
