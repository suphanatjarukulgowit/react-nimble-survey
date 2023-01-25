import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? children : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;
