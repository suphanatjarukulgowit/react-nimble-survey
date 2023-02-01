import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { isEmpty } from 'lodash';
import validator from 'validator';

import AuthAdapter from 'adapters/Auth';
import Alert from 'components/Alert';
import Button from 'components/Button';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';
import useAuth from 'hooks/useAuth';
import ApiError from 'lib/errors/ApiErrors';

const loginScreenTestIds = {
  loginHeader: 'login-header',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
  loginAlertError: 'login-alert-error',
};
const LoginScreen = (): JSX.Element => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const validateInput = (input: { email: string; password: string }) => {
    const errors = [];
    if (!input.email) {
      errors.push(t('error.email_blank'));
    }
    if (!input.password) {
      errors.push(t('error.password_blank'));
    }
    if (!validator.isEmail(input.email)) {
      errors.push(t('error.email_invalid'));
    }
    setErrorMessage(errors);
    setFormValid(isEmpty(errors));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    validateInput(formInput);
    setFormLoading(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformInput({ ...formInput, [event.target.name]: event.target.value });
  };
  const checkAuth = () => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
      navigate('/home');
    }
  };
  const triggerLogin = () => {
    if (formValid) {
      AuthAdapter.login(formInput.email, formInput.password)
        .then((response) => {
          setAuth(response?.data?.attributes);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.attributes.accessToken}`;
          navigate('/home');
        })
        .catch((error) => {
          if (error instanceof ApiError) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage([t('error.system_error')]);
          }
        });
    }
  };
  useEffect(checkAuth, [auth, navigate]);
  useEffect(triggerLogin, [formValid, formInput, setAuth, navigate, t]);
  return (
    <AuthLayout headerMessage={t('auth.heading')} data-test-id={loginScreenTestIds.loginHeader}>
      <div className="form-group">
        {errorMessage && !isEmpty(errorMessage) && (
          <Alert
            Icon={WarningIcon}
            alertHeader="Error"
            errorMessage={errorMessage}
            dataTestId={loginScreenTestIds.loginAlertError}
          ></Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            label={t('auth.sign_in')}
            onChange={handleChange}
            type="text"
            name="email"
            data-test-id={loginScreenTestIds.loginEmail}
          ></Input>
          <Input
            label={t('auth.password')}
            onChange={handleChange}
            type="password"
            name="password"
            data-test-id={loginScreenTestIds.loginPassWord}
          ></Input>
          <Button
            disabled={formLoading}
            name={t('auth.sign_in')}
            className="sign-in-btn"
            dataTestId={loginScreenTestIds.loginSubmit}
          ></Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
