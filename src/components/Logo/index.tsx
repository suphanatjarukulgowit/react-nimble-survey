import React from 'react';

type LogoProps = {
  dataTestId: string;
};

import logo from 'assets/images/logo.svg';
const Logo = ({ dataTestId }: LogoProps) => {
  return (
    <div>
      <img src={logo} data-test-id={dataTestId} className="app-logo" alt="logo" />
    </div>
  );
};

export default Logo;
