import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;