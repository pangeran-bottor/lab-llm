'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && user && user.role !== 'admin') {
        router.push('/chat'); // Redirect non-admin users to chat
        return;
      }

      setIsChecking(false);
    }
  }, [user, isLoading, requireAuth, requireAdmin, router, redirectTo]);

  // Show loading while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if user doesn't have access
  if (requireAuth && !user) {
    return null;
  }

  if (requireAdmin && user && user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}

// Convenience wrapper for pages that require authentication
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Convenience wrapper for admin-only pages
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children' | 'requireAdmin'>
) {
  return function AdminProtectedComponent(props: P) {
    return (
      <ProtectedRoute requireAdmin={true} {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
