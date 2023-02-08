import React from 'react';

import { render, screen } from '@testing-library/react';

import Button from '.';

const buttonTestId = 'login-form__button-submit';

describe('Button', () => {
  it('render the button', () => {
    render(<Button disabled={false} name={'Sign in'} className="sign-in-btn" dataTestId={buttonTestId}></Button>);
    const button = screen.getByTestId(buttonTestId);
    expect(button).toBeVisible();
  });
  it('render the message correctly', () => {
    render(
      <Button disabled={false} className="sign-in-btn" dataTestId={buttonTestId}>
        Sign in
      </Button>
    );
    const button = screen.getByTestId(buttonTestId);
    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Sign in');
  });
});