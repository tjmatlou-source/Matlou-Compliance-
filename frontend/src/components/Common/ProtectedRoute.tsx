import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

interface ProtectedRouteProps {
  allowedRoles?: ('BORROWER' | 'LENDER' | 'ADMIN')[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles, 
  redirectPath = '/login' 
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If user doesn't have the right role, redirect to their default dashboard or home
    const defaultPath = user.role === 'BORROWER' ? '/borrower' : '/lender';
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
