import React from 'react';

import { render, screen } from '@testing-library/react';

import Input from '.';

const InputTestData = {
  label: 'Sign in',
  dataTestId: 'test-input',
};

describe('Input', () => {
  it('renders the component', () => {
    render(<Input label={InputTestData.label} type="text" name="email" data-test-id={InputTestData.dataTestId} />);

    const label = screen.getByText(InputTestData.label);
    const input = screen.getByRole('textbox');

    expect(label).toBeVisible();
    expect(input).toBeVisible();
    expect(input).toHaveAttribute('class', 'form-field__input');
  });
});
