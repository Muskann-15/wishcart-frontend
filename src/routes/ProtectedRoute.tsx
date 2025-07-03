import React from 'react';
import { Navigate } from 'react-router-dom';
import { HOMEPAGE_URL } from '../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("jwtToken")

  if (!isUserLoggedIn) {
    return <Navigate to={HOMEPAGE_URL} replace />;
  }
  return children;
};

export default ProtectedRoute;