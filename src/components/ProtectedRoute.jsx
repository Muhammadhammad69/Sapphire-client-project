// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Replace this with your actual auth state logic (e.g., useAuth() or Redux state)
  const token = localStorage.getItem('token'); 

  // If there's no token, redirect to login page
  // 'replace' prevents the user from clicking "back" to the protected page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;