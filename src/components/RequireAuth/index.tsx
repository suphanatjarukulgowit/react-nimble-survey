import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import StoreContext from 'contexts/StoreProvider';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { auth } = useContext(StoreContext);
  const location = useLocation();

  return auth ? children : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;
