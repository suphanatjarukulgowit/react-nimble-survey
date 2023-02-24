import React from 'react';

import { render, screen } from '@testing-library/react';

import Button from '.';

const buttonTestId = 'login-form__button-submit';

describe('Button', () => {
  it('renders the button', () => {
    render(<Button disabled={false} name={'Sign in'} className="sign-in-btn" data-test-id={buttonTestId}></Button>);

    const button = screen.getByTestId(buttonTestId);

    expect(button).toBeVisible();
  });

  it('renders the message correctly', () => {
    render(<Button disabled={false} name={'Sign in'} className="sign-in-btn" data-test-id={buttonTestId}></Button>);

    const button = screen.getByTestId(buttonTestId);

    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Sign in');
  });
});
