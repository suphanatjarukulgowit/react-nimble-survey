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
  beforeEach(() => {
    render(
      <AuthLayout headerMessage={inputTestData.header} data-test-id={inputTestData.dataTestId} children={children}></AuthLayout>
    );
  });
  it('render the children correctly', () => {
    const content = screen.getByText(childernContent);
    expect(content).toBeVisible();
  });
  it('render the logo on the paeg', () => {
    const logo = screen.getByTestId(inputTestData.logoTestId);
    expect(logo).toBeVisible();
  });
});