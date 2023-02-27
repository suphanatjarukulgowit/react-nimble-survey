import React from 'react';

import { render, screen } from '@testing-library/react';

// import WarningIcon from 'components/Icon/WarningIcon';
import WarningIcon from 'components/Icon/WarningIcon';

// import Alert from '../Alert';
import AlertWarning from '.';

const testAlerData = {
  dataTestId: 'testAlert',
  errorMessage: ['test error'],
  icon: 'alert-icon',
};

describe('Alert', () => {
  it('renders the alert container', () => {
    render(<AlertWarning Icon={WarningIcon} dataTestId={testAlerData.dataTestId} errorMessage={testAlerData.errorMessage} />);

    const container = screen.getByTestId(testAlerData.dataTestId);

    expect(container).toBeVisible();
  });

  it('renders the alert icon', () => {
    render(<AlertWarning Icon={WarningIcon} dataTestId={testAlerData.dataTestId} errorMessage={testAlerData.errorMessage} />);
    const icon = screen.getByTestId(testAlerData.icon);
    expect(icon).toBeVisible();
  });

  it('renders the header', () => {
    render(<AlertWarning Icon={WarningIcon} dataTestId={testAlerData.dataTestId} errorMessage={testAlerData.errorMessage} />);
    const header = screen.getByText('Error');
    expect(header).toBeVisible();
  });

  it('renders the message', () => {
    render(<AlertWarning Icon={WarningIcon} dataTestId={testAlerData.dataTestId} errorMessage={testAlerData.errorMessage} />);
    const message = screen.getByText(testAlerData.errorMessage[0]);
    expect(message).toBeVisible();
  });
});
