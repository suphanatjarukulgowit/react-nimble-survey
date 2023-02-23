import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import lottie from 'assets/images/lottie.svg';

const SurvetOutro = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="outro">
      <img src={lottie} alt="outro" />
      <h1>{t('survey.outro')}</h1>
    </div>
  );
};

export default SurvetOutro;
