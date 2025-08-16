import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { userStorage } from './users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies as fallback
  const cookieToken = request.cookies.get('token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export function authenticateRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  // Verify user still exists
  const user = userStorage.findById(payload.userId);
  if (!user) return null;

  return payload;
}

export function requireAuth(request: NextRequest): { success: true; user: JWTPayload } | { success: false; error: string } {
  const userPayload = authenticateRequest(request);
  
  if (!userPayload) {
    return { success: false, error: 'Authentication required' };
  }

  return { success: true, user: userPayload };
}

export function requireAdminAuth(request: NextRequest): { success: true; user: JWTPayload } | { success: false; error: string } {
  const authResult = requireAuth(request);
  
  if (!authResult.success) {
    return authResult;
  }

  if (authResult.user.role !== 'admin') {
    return { success: false, error: 'Admin access required' };
  }

  return authResult;
}
