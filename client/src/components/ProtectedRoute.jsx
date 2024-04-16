import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const ProtectedRoute = ({ redirectPath = '/login', allowedRoles = [] }) => {
    const { isAuthenticated, userRoles } = useAuth();

    // If not authenticated, redirect to the given path
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    // If roles are specified and user does not have a required role, redirect to a not-authorized page or similar
    if (allowedRoles.length > 0 && !allowedRoles.some(role => userRoles.includes(role))) {
        return <Navigate to="/not-authorized" replace />;
    }

    return <Outlet />; // Render children routes if authorized
};

export default ProtectedRoute;
