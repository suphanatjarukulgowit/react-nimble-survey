import React, { ComponentType } from 'react';

export type AlertProps = {
  Icon: ComponentType;
  dataTestId?: string;
  alertHeader?: string;
  message: string[];
  displayBullet?: boolean;
};

const Alert = ({ Icon, dataTestId, alertHeader, message, displayBullet = true }: AlertProps): JSX.Element => {
  return (
    <div data-test-id={dataTestId} className="alert">
      <div className="alert-content">
        <div className="alert-icon" data-test-id="alert-icon">
          <Icon />
        </div>
        <div className="alert-header-title">{alertHeader}</div>
        {displayBullet ? (
          <ul>
            {message.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;
