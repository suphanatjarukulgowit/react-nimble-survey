import React, { ComponentType } from 'react';

interface AlertProps {
  Icon: ComponentType;
  errorMessage: string[];
}

const Alert = ({ Icon, errorMessage }: AlertProps): JSX.Element => {
  return (
    <div className="alert">
      <div className="alert-content">
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
    </div>
  );
};

export default Alert;
