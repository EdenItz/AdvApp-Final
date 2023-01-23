import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from "react-cookie";

export default function UserProtectedRoutes() {
    const [cookies] = useCookies();
    return cookies.eShopToken ? (
        <Outlet />
    ) : (
        (alert('You are not allowed to access this Url!'),
        (<Navigate to="/" />))
    );
}
