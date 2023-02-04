import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import AuthAdapter from 'adapters/Auth';
import Logo from 'components/Logo';
import UserProfileData from 'components/UserProfileData';
import useAuth from 'hooks/useAuth';

export type DefaultLayoutProps = {
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  // const { t } = useTranslation();
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
        <html lang="en" className="layout-default"></html>
      </Helmet>
      <header>
        <Link to="/home">
          <Logo></Logo>
        </Link>
        {userProfile && <UserProfileData userProfile={userProfile} onLogout={logout} />}
      </header>
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default DefaultLayout;
