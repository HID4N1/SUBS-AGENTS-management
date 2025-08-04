import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const AdminRoutes = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not logged in, redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin()) {
    // Logged in but not admin, redirect to home with message
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, render the nested routes
  return <Outlet />;
};

export default AdminRoutes;
