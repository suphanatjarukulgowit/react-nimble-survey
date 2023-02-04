import React, { ComponentType } from 'react';

export type AlertProps = {
  Icon: ComponentType;
  dataTestId?: string;
  alertHeader?: string;
  errorMessage: string[];
};

const Alert = ({ Icon, dataTestId, alertHeader, errorMessage }: AlertProps): JSX.Element => {
  return (
    <div data-test-id={dataTestId} className="alert">
      <div className="alert-content">
        <div className="alert-icon" data-test-id="alert-icon">
          <Icon />
        </div>
        <div className="alert-header-title">{alertHeader}</div>
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
