import React from 'react';
import { RouteObject } from 'react-router-dom';

import RequireAuth from 'components/RequireAuth';
import LoginScreen from 'screens/Login';
import SurveyHomepageScreen from 'screens/Survey/SurveyHomePage';

const nomalRoutes: RouteObject[] = [
  {
    path: '*',
    element: <LoginScreen />,
  },
  {
    path: '/',
    element: <LoginScreen />,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/home',
    element: (
      <RequireAuth>
        <SurveyHomepageScreen />
      </RequireAuth>
    ),
  },
];

const routes = [...nomalRoutes, ...protectedRoutes];

export default routes;
