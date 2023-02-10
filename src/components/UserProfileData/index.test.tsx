import React from 'react';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Swiper } from 'swiper';

import { mockSurveyList } from 'tests/mockSurveyList';
import { mockUser } from 'tests/mockUserLogin';
import { renderWithRouter } from 'tests/renderWithRouter';

import UserProfileData from '.';

const userProfileDatatestIds = {
  userName: 'userName',
  userLine: 'userLine',
  userAvatarClose: 'userAvatarClose',
  userAvatarOpen: 'userAvatarOpen',
  logOutButton: 'loggoutButton',
  appVersion: 'appVersion',
  userProfileContainer: 'userProfileContainer',
  userMenu: 'userMenu',
};

const openUserMenu = async () => {
  const userAvatar = screen.getByTestId(userProfileDatatestIds.userAvatarOpen);

  await userEvent.click(userAvatar);
};
const closeUserMenu = async () => {
  const userAvatar = screen.getByTestId(userProfileDatatestIds.userAvatarClose);

  await userEvent.click(userAvatar);
};

describe('UserProfileData', () => {
  it('displays the username', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const username = screen.getByTestId(userProfileDatatestIds.userName);
    expect(username).toBeVisible;
  });
  it('displays the user line', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const userLine = screen.getByTestId(userProfileDatatestIds.userLine);
    expect(userLine).toBeVisible;
  });
  it('displays the user user avatar', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const userAvatar = screen.getByTestId(userProfileDatatestIds.userAvatarClose);
    expect(userAvatar).toBeVisible;
  });
  it('displays the user app version', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const appVersion = screen.getByTestId(userProfileDatatestIds.appVersion);
    expect(appVersion).toBeVisible;
  });
  it('given the user clicks logout button', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const logOutButton = screen.getByTestId(userProfileDatatestIds.logOutButton);
    expect(logOutButton).toBeVisible;
  });
  it('given the user clicks logout button', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    const userContainer = screen.getByTestId(userProfileDatatestIds.userProfileContainer);
    const logout = within(userContainer).getByText('auth.sign_out');
    await userEvent.click(logout);
    expect(mockLogoutFn).toHaveBeenCalledTimes(1);
  });
  it('given the user clicks toggle button to close menu', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    await openUserMenu();
    await closeUserMenu();
    const userProfileContainer = screen.getByTestId(userProfileDatatestIds.userProfileContainer);
    expect(userProfileContainer).toHaveClass('user-menu__collapse--close');
  });
  it('given the user clicks toggle button to open menu', async () => {
    const mockLogoutFn = jest.fn();
    renderWithRouter(<UserProfileData userProfile={mockUser} onLogout={mockLogoutFn}></UserProfileData>);
    const userProfileContainer = screen.getByTestId(userProfileDatatestIds.userProfileContainer);
    await openUserMenu();
    expect(userProfileContainer).toHaveClass('user-menu__collapse--open');
  });
});
