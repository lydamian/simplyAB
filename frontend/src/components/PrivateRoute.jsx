import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { isAuthenticated } from 'features/auth/authSlice';

import { useSelector } from 'react-redux';

const PrivateRoute = function ({ children }) {
  const location = useLocation();
  const userIsAuthenticated = useSelector(isAuthenticated);
  if (userIsAuthenticated) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
