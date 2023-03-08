import React, { ComponentType } from 'react';

interface AlertWarningProps {
  Icon: ComponentType;
  dataTestId?: string;
  errorMessage: string[];
}

const AlertWarning = ({ Icon, dataTestId, errorMessage }: AlertWarningProps): JSX.Element => {
  return (
    <div data-test-id={dataTestId} className="alert">
      <div className="alert__icon" data-test-id="alert-icon">
        <Icon />
      </div>
      <span className="alert__title">Error</span>
      <ul>
        {errorMessage.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertWarning;
