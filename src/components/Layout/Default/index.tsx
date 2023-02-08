import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import AuthAdapter from 'adapters/Auth';
import Logo from 'components/Logo';
import UserProfileData from 'components/UserProfileData';
import useAuth from 'hooks/useAuth';

export type DefaultLayoutProps = {
  onHelmetStateChange?: () => void;
  isSurveyLoading: boolean;
  children?: React.ReactNode;
};

const defaultLayoutDataTestIds = {
  layoutDefault: 'layoutDefault',
  appLogo: 'appLogo',
  userProfile: 'userProfile',
};

const DefaultLayout = ({ children, isSurveyLoading }: DefaultLayoutProps) => {
  const { auth, userProfile, setAuth, setUserProfile } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    if (auth) {
      AuthAdapter.logOut(auth.accessToken)
        .then(() => {
          setAuth(null);
          setUserProfile(null);
          navigate('/');
        })
        .catch(() => {
          navigate('/');
        });
    }
  };
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" data-test-id={defaultLayoutDataTestIds.layoutDefault} className="layout-default"></html>
      </Helmet>
      <header>
        <Link to="/home" data-test-id={defaultLayoutDataTestIds.appLogo}>
          <Logo></Logo>
        </Link>
        {!isSurveyLoading ? (
          <>
            {userProfile && (
              <UserProfileData data-test-id={defaultLayoutDataTestIds.userProfile} userProfile={userProfile} onLogout={logout} />
            )}
          </>
        ) : null}
      </header>
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default DefaultLayout;