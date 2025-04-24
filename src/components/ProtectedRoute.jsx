import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const userToken =
    localStorage.getItem('userToken') ||
    sessionStorage.getItem('userToken');
  const adminToken =
    localStorage.getItem('adminToken') ||
    sessionStorage.getItem('adminToken');

  if (role === 'admin') {
    return adminToken
      ? children
      : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (role === 'user') {
    return userToken
      ? children
      : <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Navigate to="/" replace />;
}
