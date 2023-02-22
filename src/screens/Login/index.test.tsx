import React from 'react';

import { screen, render, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { logIn } from 'adapters/Auth';

import LoginScreen from '.';

const loginScreenTestIds = {
  loginHeader: 'login-header',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
  loginAlertError: 'login-alert-error',
};

const mockUseNavigate = jest.fn();

jest.mock('adapters/Auth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const setup = () => {
  const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
  const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
  const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);
  return {
    emailInput,
    passwordInput,
    submitButton,
    ...screen,
  };
};

describe('LoginScreen', () => {
  describe('given invalid credentials', () => {
    test('displays an error message if email is blank', () => {
      render(<LoginScreen />);
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.change(passwordInput, { target: { value: 'xxxxxxx' } });
      fireEvent.click(submitButton);
      expect(getByText('error.email_blank')).toBeInTheDocument();
      expect(logIn).not.toHaveBeenCalled();
    });

    test('displays an error message if password is blank', () => {
      render(<LoginScreen />);
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: 'xxxxxxx' } });
      fireEvent.change(passwordInput, { target: { value: '' } });
      fireEvent.click(submitButton);
      expect(getByText('error.password_blank')).toBeInTheDocument();
      expect(logIn).not.toHaveBeenCalled();
    });

    test('displays an error message if email is invalid', () => {
      render(<LoginScreen />);
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: 'xxxxxxx' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.click(submitButton);
      expect(getByText('error.email_invalid')).toBeInTheDocument();
      expect(logIn).not.toHaveBeenCalled();
    });
  });

  describe('given valid credentials', () => {
    test('redirects user to survey home page', async () => {
      render(<LoginScreen />);
      const mockedLogin = logIn as jest.Mock;
      mockedLogin.mockResolvedValue(null);

      const { emailInput, passwordInput, submitButton } = setup();
      fireEvent.change(emailInput, { target: { value: 'suphanat@nimblehq.co' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.click(submitButton);

      const alertError = screen.queryByTestId(loginScreenTestIds.loginAlertError);
      expect(alertError).not.toBeInTheDocument();
      await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith('/home'));
    });
  });
});
