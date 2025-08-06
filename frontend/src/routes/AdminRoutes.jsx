import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../auth/context/AuthContext';
import AdminRoutes from '../admin/components/AdminRoutes';
import AdminLogin from '../admin/pages/AdminLogin';

import AdminDashboard from '../admin/pages/AdminDashboard';
import Locations from '../admin/pages/Locations'; 

const AdminRoutesComponent = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Login Route */}
        <Route path="login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="*" element={<AdminRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="locations" element={<Locations />} />
          {/* Add other admin routes here */}
          {/* Example: <Route path="agents" element={<Agents />} /> */}
          {/* Example: <Route path="missions" element={<Missions />} /> */}
          {/* Example: <Route path="reservations" element={<Reservations />} /> */}

        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutesComponent;
