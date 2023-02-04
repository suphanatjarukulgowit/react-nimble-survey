import React from 'react';

import { screen, render, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import AuthAdapter from 'adapters/Auth';
import ApiError from 'lib/errors/ApiErrors';

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
  const s = screen;
  const emailInput = s.getByTestId(loginScreenTestIds.loginEmail);
  const passwordInput = s.getByTestId(loginScreenTestIds.loginPassWord);
  const submitButton = s.getByTestId(loginScreenTestIds.loginSubmit);
  return {
    emailInput,
    passwordInput,
    submitButton,
    ...s,
  };
};

describe('LoginScreen', () => {
  beforeEach(() => {
    render(<LoginScreen />);
  });
  describe('given invalid credentials', () => {
    test('display an error message if email is blank', () => {
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.change(passwordInput, { target: { value: 'xxxxxxx' } });
      fireEvent.click(submitButton);
      expect(getByText('error.email_blank')).toBeInTheDocument();
      expect(AuthAdapter.login).not.toHaveBeenCalled();
    });

    test('display an error message if password is blank', () => {
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: 'xxxxxxx' } });
      fireEvent.change(passwordInput, { target: { value: '' } });
      fireEvent.click(submitButton);
      expect(getByText('error.password_blank')).toBeInTheDocument();
      expect(AuthAdapter.login).not.toHaveBeenCalled();
    });

    test('display an error message if email is invalid', () => {
      const { emailInput, passwordInput, submitButton, getByText } = setup();
      fireEvent.change(emailInput, { target: { value: 'xxxxxxx' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.click(submitButton);
      expect(getByText('error.email_invalid')).toBeInTheDocument();
      expect(AuthAdapter.login).not.toHaveBeenCalled();
    });
  });
  describe('given valid credentials', () => {
    test('redirect user to survey home page', async () => {
      const mockedLogin = AuthAdapter.login as jest.Mock;
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
