import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem('token');

  let userRole = null;
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    userRole = decodedToken.UserInfo.role;     
  }
  
  const isAuthenticated = !!token;
  const hasRequiredRole = userRole === requiredRole;

  

  return isAuthenticated && hasRequiredRole ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
