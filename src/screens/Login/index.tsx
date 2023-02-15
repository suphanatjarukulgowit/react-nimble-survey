import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash';
import validator from 'validator';

import AlertWarning from 'components/AlertWarning';
import Button from 'components/Button';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);

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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      validateInput(formInput);
    } catch (error) {
      console.log('error: ', error);
    }
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
