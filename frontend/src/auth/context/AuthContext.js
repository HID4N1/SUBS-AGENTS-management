import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../../services/api';  // your axios instance

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // full user info
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          // Initially set user from token
          setUser({
            username: decoded.username || decoded.sub || 'User',
            role: decoded.role || decoded.user_role || 'User',
          });
          setIsAuthenticated(true);

          // --- Fetch full user profile from API ---
          try {
            const response = await API.get('users/auth/me/', {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(response.data);  // override with full user info
          } catch (error) {
            console.error('Failed to fetch full user info:', error);
          }
        } else {
          // Token expired
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

  const login = async (accessToken, refreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);

      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Set user basic info from token
      setUser({
        username: decoded.username,
        role: decoded.role,
      });
      setIsAuthenticated(true);

      // Fetch full user info after login
      try {
        const response = await API.get('/auth/me/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user after login:', error);
      }

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => user && user.role === 'Admin';

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    isAdmin,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
