import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/sign-in" replace />;


  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
