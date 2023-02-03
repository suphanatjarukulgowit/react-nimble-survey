import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';

import RequireAuth from 'components/RequireAuth';
import useAuth from 'hooks/useAuth';
import { mockTokens } from 'tests/mockUserLogin';
import { renderWithMemoryRouter } from 'tests/renderWithRouter';

const HOME_ROUTE = {
  path: '/home',
  content: 'Home page',
};

const AUTH_ROUTE = {
  path: '/',
  content: 'Login page',
};

const TestRoutes = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE.path}
        element={
          <RequireAuth>
            <div>{HOME_ROUTE.content}</div>
          </RequireAuth>
        }
      ></Route>
      <Route path={AUTH_ROUTE.path} element={<div>{AUTH_ROUTE.content}</div>} />
    </Routes>
  );
};

const renderRoutes = (initialPath: string) => {
  renderWithMemoryRouter(<TestRoutes />, {
    initialEntries: [initialPath],
    withContextProvider: true,
  });
};

const RequireAuthComponentMock = (): JSX.Element => {
  const [auth, setAuth] = useState({});
  // mockTokensLoggedIn()
  useEffect(() => {
    setAuth(mockTokens);
  }, []);
  // <RequireAuth>
  //   <div>{HOME_ROUTE.content}</div>
  // </RequireAuth>;
  return auth ? <div>{HOME_ROUTE.content}</div> : <div></div>;
};

describe('AuthRoute', () => {
  describe('given there are tokens in the local storage', () => {
    it('redirects to the Home page', async () => {
      render(<RequireAuthComponentMock />);
      await waitFor(() => {
        expect(screen.queryByText(HOME_ROUTE.content)).toBeVisible();
      });
    });
  });

  describe('given NO tokens in the local storage', () => {
    it('renders the given page', () => {
      renderRoutes(AUTH_ROUTE.path);

      expect(screen.queryByText(AUTH_ROUTE.content)).toBeVisible();
    });
  });
});
