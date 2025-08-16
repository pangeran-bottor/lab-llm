import { ChatOpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from '@langchain/core/documents';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import client, { COLLECTION_NAME, initializeQdrant } from './qdrant';

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-3-small'
});

export const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4',
  temperature: 0.1
});

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
});

export async function storeDocument(text: string, metadata: object = {}) {
  // Initialize Qdrant collection if needed
  await initializeQdrant();
  
  const docs = await textSplitter.createDocuments([text], [metadata]);
  
  for (const doc of docs) {
    const vector = await embeddings.embedQuery(doc.pageContent);
    
    console.log('Vector length:', vector.length);
    console.log('Document content length:', doc.pageContent.length);
    
    const point = {
      id: Date.now() + Math.floor(Math.random() * 1000), // Use numeric ID
      vector: vector,
      payload: {
        text: doc.pageContent,
        metadata: doc.metadata
      }
    };
    
    console.log('Point structure:', JSON.stringify(point, null, 2).substring(0, 200) + '...');
    
    try {
      await client.upsert(COLLECTION_NAME, {
        points: [point]
      });
      console.log('Successfully stored document chunk');
    } catch (error: any) {
      console.error('Error storing document chunk:', error);
      if (error.response && error.response.data) {
        console.error('Qdrant error details:', error.response.data);
      }
      throw error;
    }
  }
}

export async function similaritySearch(query: string, k: number = 4) {
  const queryVector = await embeddings.embedQuery(query);
  
  const results = await client.search(COLLECTION_NAME, {
    vector: queryVector,
    limit: k
  });

  return results.map(result => new Document({
    pageContent: (result.payload?.text as string) || '',
    metadata: result.payload?.metadata || {}
  }));
}

export async function generateResponse(query: string, context: Document[]) {
  const contextText = context.map(doc => doc.pageContent).join('\n\n');
  
  const systemMessage = new SystemMessage(`You are a helpful customer support AI assistant. Use the following context to answer the question. If you cannot find the answer in the context, respond with "I don't have that information. Please contact support@yourdomain.com."

Context:
${contextText}`);

  const humanMessage = new HumanMessage(query);

  const response = await model.invoke([systemMessage, humanMessage]);
  
  return response.content;
}
