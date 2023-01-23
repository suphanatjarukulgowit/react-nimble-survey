import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from 'assets/images/logo.svg';

interface AuthLayoutProps {
  headerMessage?: string;
  children: React.ReactNode;
}

const AuthLayout = ({ children, headerMessage }: AuthLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" className="layout-auth"></html>
      </Helmet>
      <div className="app-content">
        <div className="w-40 h-10 mx-auto mb-4 relative">
          <img src={logo} alt="Nimble Logo" />
          <p className="app-header__title">{headerMessage}</p>
        </div>
        {children}
      </div>
    </HelmetProvider>
  );
};

export default AuthLayout;
