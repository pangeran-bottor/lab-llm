declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFParseResult {
    text: string;
    numpages: number;
    info: any;
    metadata: any;
    version: string;
  }

  function parse(dataBuffer: Buffer, options?: any): Promise<PDFParseResult>;
  export default parse;
}

declare module '@langchain/openai' {
  export class ChatOpenAI {
    constructor(config: any);
    invoke(messages: any[]): Promise<{ content: string }>;
  }

  export class OpenAIEmbeddings {
    constructor(config: any);
    embedQuery(text: string): Promise<number[]>;
  }
}

declare module '@langchain/core/messages' {
  export class SystemMessage {
    constructor(content: string);
  }
  export class HumanMessage {
    constructor(content: string);
  }
}

declare module 'langchain/text_splitter' {
  export class RecursiveCharacterTextSplitter {
    constructor(config: any);
    createDocuments(texts: string[], metadatas?: any[]): Promise<any[]>;
  }
}

declare module '@langchain/core/documents' {
  export class Document {
    pageContent: string;
    metadata: any;
    constructor(fields: { pageContent: string; metadata?: any });
  }
}
