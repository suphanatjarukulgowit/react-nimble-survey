import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { omit } from 'lodash';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import SurveyAdapter from 'adapters/Survey';
import action from 'assets/images/action.svg';
import quit from 'assets/images/quit.svg';
import BackgroundImage from 'components/BackGroundImage';
import Button from 'components/Button';
import Modal from 'components/Modal';
import SurveyQuestion from 'components/SurveyQuestion';
import StoreContext from 'contexts/StoreProvider';
import { SurveyQuestion as SurveyQuestionInterface, SurveyResponse } from 'types/survey';

interface LeaveConfirmationModalProps {
  onConfirmClick: () => void;
  onCancelClick: () => void;
}

const NextButton = () => {
  const swiper = useSwiper();
  return (
    <button className="survey-question-next__button" onClick={() => swiper.slideNext()} aria-label="Next">
      <img src={action} alt="Next button" />
    </button>
  );
};

const SurveyQuestionPage = (): JSX.Element => {
  const { background, currentSurvey } = useContext(StoreContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<number, SurveyResponse>>({});
  const [isSurveySubmit, setIsSurveySubmit] = useState(false);
  const isEmptyResponse = Object.keys(responses).length === 0;
  const lastQuestionOrder = currentSurvey?.questions.length || 0;
  const [showQuitModal, setShowQuitModal] = useState(false);
  const onQuitSurvey = () => {
    setShowQuitModal(true);
  };

  const handleQuitModalClose = () => {
    setShowQuitModal(false);
  };

  const handleQuitSurvey = () => {
    navigate('/');
  };

  const handleResponseChange = (question: SurveyQuestionInterface, response: SurveyResponse | null) => {
    if (response === null) {
      return setResponses(omit(responses, question.displayOrder));
    }
    setResponses({
      ...responses,
      [question.displayOrder]: response,
    });
  };

  const handleSurveySubmit = () => {
    setIsSurveySubmit(true);

    const surveyResponses = Object.values(responses);

    SurveyAdapter.submitSurvey(currentSurvey!.id, surveyResponses)
      .then(() => navigate('/outro'))
      .catch(() => console.log('Something went wrong. Please try again later.'));
  };

  const LeaveConfirmationModal = ({ onConfirmClick, onCancelClick }: LeaveConfirmationModalProps) => (
    <div>
      <div className="modal-description">
        <h3 className="modal-description__header">{t('survey.warning')}</h3>
        <p className="modal-description__paragraph">{t('survey.quit_surey')}</p>
      </div>
      <div className="modal-button-container">
        <Button className="modal-button yes" onClick={onConfirmClick}>
          {t('survey.yes')}
        </Button>
        <Button className="modal-button cancel" onClick={onCancelClick}>
          {t('survey.cancel')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="survey-question">
      <BackgroundImage imageUrl={background} />
      <Modal isOpen={showQuitModal} onClose={handleQuitModalClose}>
        <LeaveConfirmationModal onConfirmClick={handleQuitSurvey} onCancelClick={handleQuitModalClose} />
      </Modal>
      <div className="quit">
        <button className="quit__button" onClick={() => onQuitSurvey()} aria-label="Next">
          <img src={quit} alt="quit survey" />
        </button>
      </div>
      <div className="survey-question-swiper">
        <Swiper slidesPerView={1} speed={750} className="survey-question-swiper-slide">
          {currentSurvey?.questions.map((question) => (
            <SwiperSlide key={question.id}>
              <SurveyQuestion
                lastQuestionOrder={lastQuestionOrder}
                question={question}
                currentResponse={responses[question.displayOrder]}
                onResponseChange={(response) => handleResponseChange(question, response)}
              ></SurveyQuestion>
              <div className="survey-question-next">
                {question.displayOrder < lastQuestionOrder ? (
                  <NextButton />
                ) : (
                  <Button
                    onClick={handleSurveySubmit}
                    className="survey-question-next-submit"
                    disabled={isEmptyResponse || isSurveySubmit}
                  >
                    {t('survey.submit')}
                  </Button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SurveyQuestionPage;
