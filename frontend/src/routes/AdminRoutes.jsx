import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../auth/context/AuthContext';
import AdminRoutes from '../admin/components/AdminRoutes';
import AdminLogin from '../admin/pages/AdminLogin';

import AdminDashboard from '../admin/pages/AdminDashboard';
import LocationsPage from '../admin/pages/LocationsManagement/LocationsPage'; 
import LocationDetailsPage from '../admin/pages/LocationsManagement/LocationDetailsPage';

const AdminRoutesComponent = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login Route */}
        <Route path="login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="*" element={<AdminRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="locationsPage" element={<LocationsPage />} />
          <Route path="locations/:id" element={<LocationDetailsPage />} />
          

        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutesComponent;
