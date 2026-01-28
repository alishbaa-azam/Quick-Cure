import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, validateToken } from '../utils/auth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ roles = [] }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        // Validate token with server
        const valid = await validateToken();
        setIsValid(valid);
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, []);

  // Check role-based access
  const checkRole = () => {
    if (roles.length === 0) return true;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return roles.includes(user.role);
  };

  if (isValidating) {
    return <LoadingSpinner />;
  }

  if (!isValid) {
    // Redirect to login with return URL
    const currentPath = window.location.pathname;
    return <Navigate to={`/login?redirect=${encodeURIComponent(currentPath)}`} replace />;
  }

  if (!checkRole()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;