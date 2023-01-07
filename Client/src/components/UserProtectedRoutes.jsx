import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function UserProtectedRoutes() {
    const isLogged = sessionStorage.getItem('token');
    const [isAuthenticated, setAuthenticated] = useState(isLogged);
    return isAuthenticated ? (
        <Outlet />
    ) : (
        (alert('You are not allowed to access this Url!'),
        (<Navigate to="/" />))
    );
}
