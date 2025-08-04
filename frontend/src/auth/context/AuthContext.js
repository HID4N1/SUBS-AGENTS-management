import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../../services/api';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (decoded.exp > currentTime) {
          const userRole = decoded.role || decoded.user_role || 'User';
          const username = decoded.username || decoded.sub || 'User';
          
          setUser({
            username: username,
            role: userRole
          });
          setIsAuthenticated(true);
        } else {
          // Token expired, remove it
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    
    setLoading(false);
  };

  const login = (accessToken, refreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Set user data
      setUser({
        username: decoded.username,
        role: decoded.role
      });
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    // Remove tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Reset user state
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user && user.role === 'Admin';
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    isAdmin,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
