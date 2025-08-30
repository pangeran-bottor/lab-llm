import { NextRequest } from 'next/server';

export function logRequest(request: NextRequest, endpoint?: string) {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const userAgent = request.headers.get('user-agent')?.substring(0, 100) || 'No User-Agent';
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${clientIP} - UA: ${userAgent}`);
  
  if (endpoint) {
    console.log(`[API] ${endpoint} - ${method}`);
  }
}

export function logResponse(status: number, message?: string, duration?: number) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Response: ${status} ${message || ''} ${duration ? `(${duration}ms)` : ''}`);
}

export function logError(error: any, context?: string) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR ${context ? `[${context}]` : ''}: ${error.message || error}`);
  if (error.stack) {
    console.error(error.stack);
  }
}
