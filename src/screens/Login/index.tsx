import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import validator from 'validator';

import Button from 'components/Button';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [formInput, setformInput] = useState({ email: '', password: '' });
  const validateInput = (input: any) => {
    if (!(input.email && input.password)) {
      return 'email and password must not blank';
    }
    if (validator.isEmail(input.email)) {
      return '';
    } else {
      return 'invalid email';
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errMessage = validateInput(formInput);
    if (errMessage === '') {
      console.log('proceed login');
    } else {
      // pop up error
      alert(errMessage);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformInput({ ...formInput, [event.target.name]: event.target.value });
  };

  return (
    <AuthLayout headerMessage={t('auth.heading')}>
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <Input label={t('auth.sign_in')} onChange={handleChange} type="text" name="email"></Input>
          <Input label={t('auth.password')} onChange={handleChange} type="password" name="password"></Input>
          <Button name={t('auth.sign_in')} className="sign-in-btn"></Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
