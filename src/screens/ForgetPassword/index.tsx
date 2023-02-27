import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/Alert';
import Button from 'components/Button';
import WarningIcon from 'components/Icon/WarningIcon';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const forgetPasswordScreenTestIds = {
  header: 'forget-password-header',
  email: 'forget-password-email',
  submit: 'forget-password-submit',
  alert: 'forget-password-alert',
};

const ForgetPasswordScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [formLoading, setFormLoading] = useState(false);
  const [popupCheckEmail, setPopupCheckEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setPopupCheckEmail(true);
    setFormLoading(false);
  };

  return (
    <AuthLayout headerMessage={t('forget_password.header')} data-test-id={forgetPasswordScreenTestIds.header}>
      {popupCheckEmail ? (
        <Alert
          Icon={WarningIcon}
          alertHeader="Check your email."
          message={[t('forget_password.email_sent')]}
          dataTestId={forgetPasswordScreenTestIds.alert}
          displayBullet={false}
        ></Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Input
          label={t('auth.email')}
          // onChange={handleChange}
          type="email"
          name="email"
          data-test-id={forgetPasswordScreenTestIds.email}
        ></Input>
        <Button disabled={formLoading} className="sign-in-btn" dataTestId={forgetPasswordScreenTestIds.submit}>
          {t('forget_password.send_email_button')}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgetPasswordScreen;
