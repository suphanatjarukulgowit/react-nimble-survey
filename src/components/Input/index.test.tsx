import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from '.';

const InputTestData = {
  label: 'Sign in',
  dataTestId: 'test-input',
};

describe('Input', () => {
  it('render the label correctly', () => {
    render(<Input label={InputTestData.label} type="text" name="email" data-test-id={InputTestData.dataTestId}></Input>);
    const label = screen.getByText(InputTestData.label);
    expect(label).toBeVisible();
  });
  it('render class correctly', () => {
    render(<Input label={InputTestData.label} type="text" name="email" data-test-id={InputTestData.dataTestId}></Input>);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
    expect(input).toHaveAttribute('class', 'input');
  });
});
