import React from 'react';
import { RouteObject } from 'react-router-dom';

import RequireAuth from 'components/RequireAuth';
import LoginScreen from 'screens/Login';
import SurveyHomepageScreen from 'screens/Survey/SurveyHomePage';
import SurveyQuestionPage from 'screens/Survey/SurveyQuestionPage';
import StartSurvey from 'screens/Survey/SurveyStart';

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
  {
    path: '/survey/:surveyId',
    element: (
      <RequireAuth>
        <StartSurvey />
      </RequireAuth>
    ),
  },
  {
    path: '/survey/:surveyId/question',
    element: (
      <RequireAuth>
        <SurveyQuestionPage />
      </RequireAuth>
    ),
  },
];
const routes = [...nomalRoutes, ...protectedRoutes];

export default routes;
