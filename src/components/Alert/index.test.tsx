import React from 'react';

import { render, screen } from '@testing-library/react';

import WarningIcon from 'components/Icon/WarningIcon';

import Alert from '.';

const testAlerData = {
  dataTestId: 'testAlert',
  message: ['test error'],
  alertHeader: 'Error',
  icon: 'alert-icon',
};

describe('Alert', () => {
  it('render the alert container', () => {
    render(
      <Alert
        Icon={WarningIcon}
        alertHeader={testAlerData.alertHeader}
        dataTestId={testAlerData.dataTestId}
        message={testAlerData.message}
      ></Alert>
    );
    const container = screen.getByTestId(testAlerData.dataTestId);
    expect(container).toBeVisible();
  });
  it('render the alert icon', () => {
    render(
      <Alert
        Icon={WarningIcon}
        alertHeader={testAlerData.alertHeader}
        dataTestId={testAlerData.dataTestId}
        message={testAlerData.message}
      ></Alert>
    );
    const icon = screen.getByTestId(testAlerData.icon);
    expect(icon).toBeVisible();
  });
  it('render the header', () => {
    render(
      <Alert
        Icon={WarningIcon}
        alertHeader={testAlerData.alertHeader}
        dataTestId={testAlerData.dataTestId}
        message={testAlerData.message}
      ></Alert>
    );
    const header = screen.getByText(testAlerData.alertHeader);
    expect(header).toBeVisible();
  });
  it('render the message', () => {
    render(
      <Alert
        Icon={WarningIcon}
        alertHeader={testAlerData.alertHeader}
        dataTestId={testAlerData.dataTestId}
        message={testAlerData.message}
      ></Alert>
    );
    const message = screen.getByText(testAlerData.message[0]);
    expect(message).toBeVisible();
  });
});
