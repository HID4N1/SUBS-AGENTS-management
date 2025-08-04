import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../auth/context/AuthContext';
import AdminRoutes from '../admin/components/AdminRoutes';
import AdminLogin from '../admin/pages/AdminLogin';

import AdminDashboard from '../admin/pages/AdminDashboard';

const AdminRoutesComponent = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login Route */}
        <Route path="login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="*" element={<AdminRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutesComponent;
