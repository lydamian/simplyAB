/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, getStatus } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const status = useSelector(getStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => (isUserLoggedIn && status === 'idle'
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
}

export default PrivateRoute;
