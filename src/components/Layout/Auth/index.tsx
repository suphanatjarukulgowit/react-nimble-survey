import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from 'assets/images/logo.svg';

interface AuthLayoutProps {
  headerMessage?: string;
  dataTestId?: string;
  children: React.ReactNode;
}

const AuthLayout = ({ children, dataTestId, headerMessage }: AuthLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" className="layout-auth"></html>
      </Helmet>
      <div className="app-content">
        <img src={logo} alt="Nimble Logo" data-test-id="app-logo" />
        <p data-test-id={dataTestId} className="app-header-title">
          {headerMessage}
        </p>
        {children}
      </div>
    </HelmetProvider>
  );
};

export default AuthLayout;
