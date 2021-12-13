import React, { useEffect } from 'react'
import {
  useLocation,
  Navigate,
} from 'react-router-dom'
import { isAuthenticated, getStatus } from 'features/auth/authSlice';

import { useSelector } from 'react-redux';


function PrivateRoute({ children }) {
  let location = useLocation();
  const userIsAuthenticated = useSelector(isAuthenticated);
  if (userIsAuthenticated) {
    return children
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location }} 
    />
  );
}

export default PrivateRoute;