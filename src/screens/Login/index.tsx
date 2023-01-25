import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { isEmpty } from 'lodash';
import validator from 'validator';

import AuthAdapter from 'adapters/Auth';
import AlertWarning from 'components/AlertWarning';
import Button from 'components/Button';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';
import useAuth from 'hooks/useAuth';
import ApiError from 'lib/errors/ApiErrors';

const LoginScreen = (): JSX.Element => {
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (formValid) {
      AuthAdapter.login(formInput.email, formInput.password)
        .then((response) => {
          setAuth(response?.data?.attributes);
          axios.defaults.headers.common['Authorzation'] = `Bearer ${response?.data?.attributes.accessToken}`;
          navigate('/home');
        })
        .catch((error) => {
          if (error instanceof ApiError) {
            console.log('Api error', error);
          } else {
            console.log('else error : ', error);
          }
        });
    }
  }, [formValid, formInput, setAuth, navigate]);

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

  return (
    <AuthLayout headerMessage={t('auth.heading')}>
      <div className="form-group">
        {errorMessage && !isEmpty(errorMessage) && <AlertWarning Icon={WarningIcon} errorMessage={errorMessage}></AlertWarning>}
        <form onSubmit={handleSubmit}>
          <Input label={t('auth.email')} onChange={handleChange} type="email" name="email"></Input>
          <Input label={t('auth.password')} onChange={handleChange} type="password" name="password"></Input>
          <Button disabled={formLoading} name={t('auth.sign_in')} className="sign-in-btn"></Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
