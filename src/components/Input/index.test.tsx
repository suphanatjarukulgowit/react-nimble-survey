import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from '.';

const InputTestData = {
  label: 'Sign in',
  dataTestId: 'test-input',
};

describe('Input', () => {
  beforeEach(() => {
    render(<Input label={InputTestData.label} type="text" name="email" data-test-id={InputTestData.dataTestId}></Input>);
  });
  it('render the label correctly', () => {
    const label = screen.getByText(InputTestData.label);
    expect(label).toBeVisible();
  });
  it('render the label correctly', () => {
    const label = screen.getByText(InputTestData.label);
    expect(label).toBeVisible();
  });
  it('render the input correctly', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
    expect(input).toHaveAttribute('class', 'input');
  });
});
