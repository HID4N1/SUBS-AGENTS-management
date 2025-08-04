import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Authentication context
import { AuthProvider } from './auth/context/AuthContext';

// Client Routes
import ClientRoutes from './routes/ClientRoutes';

// Admin Routes - Main routing configuration
import AdminRoutesComponent from './routes/AdminRoutes';

function App() {
  return (  
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="App">
            <Routes>
              {/* Main Admin Routes Configuration */}
              <Route path="/admin/*" element={<AdminRoutesComponent />} />
              
              {/* Main ClienClient Routes */}
              <Route path="/*" element={<ClientRoutes />} />
            </Routes>
          </div>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
