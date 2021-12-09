/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getStatus } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {
  const userIsAuthenticated = useSelector(isAuthenticated);
  const status = useSelector(getStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => (userIsAuthenticated && status === 'idle'
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
}

export default PrivateRoute;
