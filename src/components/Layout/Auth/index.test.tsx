import React from 'react';

import { render, screen } from '@testing-library/react';

import AuthLayout from '.';

const inputTestData = {
  header: 'test-header',
  dataTestId: 'test-data-test-id',
  logoTestId: 'app-logo',
};

const childernContent = 'Childern content';
const children = <p>{childernContent}</p>;

describe('Input', () => {
  it('renders the children correctly', () => {
    render(
      <AuthLayout headerMessage={inputTestData.header} data-test-id={inputTestData.dataTestId}>
        {children}
      </AuthLayout>
    );
    const content = screen.getByText(childernContent);
    expect(content).toBeVisible();
  });

  it('renders the logo on the page', () => {
    render(
      <AuthLayout headerMessage={inputTestData.header} data-test-id={inputTestData.dataTestId}>
        {children}
      </AuthLayout>
    );
    const logo = screen.getByTestId(inputTestData.logoTestId);
    expect(logo).toBeVisible();
  });
});
