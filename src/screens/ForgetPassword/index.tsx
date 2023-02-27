import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash';

import UserAdapter from 'adapters/User';
import back from 'assets/images/back.svg';
import Alert from 'components/Alert';
import Button from 'components/Button';
import BellIcon from 'components/Icon/BellIcon';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const forgetPasswordScreenTestIds = {
  header: 'forget-password-header',
  email: 'forget-password-email',
  submit: 'forget-password-submit',
  alertCheckEmail: 'forget-password-alert-check-email',
  alertError: 'forget-password-alert-error',
  alertValidate: 'forget-password-alert-validate',
};

interface IFormInput {
  email: string;
}

const ForgetPasswordScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [formLoading, setFormLoading] = useState(false);
  const [popupSentEmail, setPopupSentEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({ email: '' });
  const [errorApi, setErrorApi] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm({ ...emailForm, [event.target.name]: event.target.value });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFormLoading(true);
    setErrorApi([]);
    UserAdapter.resetPassword(data.email)
      .then(() => {
        setPopupSentEmail(true);
        setFormLoading(false);
      })
      .catch(() => {
        setFormLoading(false);
        setErrorApi([t('error.system_error')]);
      });
  };

  return (
    <>
      <div>
        <Link className="back-button" to="/home">
          <img src={back} alt="back button" />
        </Link>
      </div>
      <AuthLayout headerMessage={t('forget_password.header')} data-test-id={forgetPasswordScreenTestIds.header}>
        {errorApi && !isEmpty(errorApi) && (
          <Alert
            Icon={WarningIcon}
            alertHeader="Error"
            message={errorApi}
            dataTestId={forgetPasswordScreenTestIds.alertError}
          ></Alert>
        )}
        {errors?.email?.type === 'required' && (
          <Alert
            Icon={WarningIcon}
            alertHeader="Error"
            message={[t('error.email_blank')]}
            dataTestId={forgetPasswordScreenTestIds.alertCheckEmail}
          ></Alert>
        )}
        {formLoading === false && errors?.email?.type === undefined && popupSentEmail ? (
          <Alert
            Icon={BellIcon}
            alertHeader="Check your email."
            message={[t('forget_password.email_sent')]}
            dataTestId={forgetPasswordScreenTestIds.alertValidate}
            displayBullet={false}
          ></Alert>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            onChange={handleChange}
            label={t('auth.email')}
            type="email"
            name="email"
            data-test-id={forgetPasswordScreenTestIds.email}
            register={register('email', { required: true })}
          />
          <Button disabled={formLoading} type="submit" className="sign-in-btn" dataTestId={forgetPasswordScreenTestIds.submit}>
            {t('forget_password.send_email_button')}
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgetPasswordScreen;
