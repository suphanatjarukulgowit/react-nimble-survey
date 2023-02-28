import React from 'react';

import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocalStorageKey } from 'lib/localStorage';
import { mockUserLoggedIn } from 'tests/mockUserLogin';
import { renderWithRouter } from 'tests/renderWithRouter';

import DefaultLayout from '.';

const defaultLayoutDataTestIds = {
  layoutDefault: 'layoutDefault',
  appLogo: 'appLogo',
  userProfile: 'userProfile',
};

const userProfileDatatestIds = {
  userName: 'userName',
  userLine: 'userLine',
  userAvatar: 'userAvatar',
  logOutButton: 'loggoutButton',
  appVersion: 'appVersion',
  userProfileContainer: 'userProfileContainer',
  userMenu: 'userMenu',
};

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('DefaultLayout', () => {
  it('renders the app logo link', () => {
    renderWithRouter(<DefaultLayout />);

    const appLogoLink = screen.getByTestId(defaultLayoutDataTestIds.appLogo);

    expect(appLogoLink).toBeVisible();
    expect(appLogoLink).toHaveAttribute('href', '/home');
  });
  describe('given the user has logged in', () => {
    mockUserLoggedIn();

    it('renders the user menu', () => {
      renderWithRouter(<DefaultLayout />, { withContextProvider: true });

      const userMenu = screen.getByTestId(userProfileDatatestIds.userMenu);

      expect(userMenu).toBeVisible();
    });

    describe('given the user clicks on the logout menu', () => {
      it('logs the user out', async () => {
        renderWithRouter(<DefaultLayout />, { withContextProvider: true });

        const userMenu = screen.getByTestId(userProfileDatatestIds.userMenu);
        const logoutMenu = within(userMenu).getByText('auth.sign_out');

        userEvent.click(userMenu);
        userEvent.click(logoutMenu);

        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith('/'));

        await waitFor(() => {
          expect(localStorage.getItem(LocalStorageKey.auth)).toBe(null);
        });

        await waitFor(() => {
          expect(localStorage.getItem(LocalStorageKey.userProfile)).toBe(null);
        });
      });
    });
  });
});
