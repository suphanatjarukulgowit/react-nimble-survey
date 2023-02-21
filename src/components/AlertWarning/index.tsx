import React, { ComponentType } from 'react';

interface AlertWarningProps {
  Icon: ComponentType;
  errorMessage: string[];
}

const AlertWarning = ({ Icon, errorMessage }: AlertWarningProps): JSX.Element => {
  return (
    <div className="alert">
      <div className="alert__icon">
        <Icon />
      </div>
      <div className="alert-header-title">Error</div>
      <ul>
        {errorMessage.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertWarning;
