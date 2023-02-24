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
import SurveyQuestion from 'components/SurveyQuestion';
import StoreContext from 'contexts/StoreProvider';
import { SurveyQuestion as SurveyQuestionInterface, SurveyResponse } from 'types/survey';

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

  const onQuitSurvey = () => {
    console.log('onQuitSurvey');
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
  const lastQuestionOrder = currentSurvey?.questions.length || 0;
  return (
    <div className="survey-question">
      <BackgroundImage imageUrl={background} />
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
