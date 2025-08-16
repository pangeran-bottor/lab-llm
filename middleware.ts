import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/'];
  
  // Auth routes (login/register) - redirect to chat if already authenticated
  const authRoutes = ['/login', '/register'];
  
  // API routes that don't require authentication
  const publicApiRoutes = ['/api/auth/login', '/api/auth/register'];

  // Check for authentication token
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  let userPayload: any = null;
  
  // Verify token if present
  if (token) {
    try {
      userPayload = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
      // Invalid token - treat as unauthenticated
      userPayload = null;
    }
  }

  // Handle auth routes (login/register)
  if (authRoutes.includes(pathname)) {
    if (userPayload) {
      // Already authenticated, redirect to chat
      return NextResponse.redirect(new URL('/chat', request.url));
    }
    // Not authenticated, allow access to auth routes
    return NextResponse.next();
  }

  // Handle public routes
  if (publicRoutes.includes(pathname) || publicApiRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!userPayload) {
    // Redirect to login for protected pages
    if (!pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Return 401 for protected API routes
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Add user info to request headers for API routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('user-id', userPayload.userId.toString());
  requestHeaders.set('user-email', userPayload.email);
  requestHeaders.set('user-role', userPayload.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
