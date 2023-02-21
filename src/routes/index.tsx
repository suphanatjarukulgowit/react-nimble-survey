import React from 'react';
import { RouteObject } from 'react-router-dom';

import LoginScreen from 'screens/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginScreen />,
  },
];

export default routes;
