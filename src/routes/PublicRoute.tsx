import React from 'react';
import { Navigate } from 'react-router-dom';
import { HOMEPAGE_URL } from '../constants/routes';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isUserLoggedIn = localStorage.getItem("jwtToken")

    if (!isUserLoggedIn) {
        return children;
    }
    return <Navigate to={HOMEPAGE_URL} replace />;
};

export default PublicRoute;