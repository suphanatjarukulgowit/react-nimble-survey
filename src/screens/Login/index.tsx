import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash';
import validator from 'validator';

import Alert from 'components/Alert';
import Button from 'components/Button';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [formInput, setformInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const validateInput = (input: any) => {
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
    validateInput(formInput);
    setFormLoading(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformInput({ ...formInput, [event.target.name]: event.target.value });
  };

  return (
    <AuthLayout headerMessage={t('auth.heading')}>
      <div className="form-group">
        {errorMessage && !isEmpty(errorMessage) && <Alert Icon={WarningIcon} errorMessage={errorMessage}></Alert>}
        <form onSubmit={handleSubmit}>
          <Input label={t('auth.sign_in')} onChange={handleChange} type="text" name="email"></Input>
          <Input label={t('auth.password')} onChange={handleChange} type="password" name="password"></Input>
          <Button disabled={formLoading} name={t('auth.sign_in')} className="sign-in-btn"></Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
