import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes(props) {
    const isAuthenticated = true;
    return isAuthenticated ? (
        <Outlet />
    ) : (
        (alert('You are not allowed to access this Url!'),
        (<Navigate to="/" />))
    );
}
