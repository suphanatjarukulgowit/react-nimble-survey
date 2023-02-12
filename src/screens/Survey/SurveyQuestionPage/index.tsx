import React, { useContext, useState } from 'react';

import { omit } from 'lodash';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import action from 'assets/images/action.svg';
import BackgroundImage from 'components/BackGroundImage';
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
  const [responses, setResponses] = useState<Record<number, SurveyResponse>>({});
  const handleResponseChange = (question: SurveyQuestionInterface, response: SurveyResponse | null) => {
    if (response === null) {
      return setResponses(omit(responses, question.displayOrder));
    }

    setResponses({
      ...responses,
      [question.displayOrder]: response,
    });
  };
  const lastQuestionOrder = currentSurvey?.questions.length || 0;
  return (
    <div className="survey-question">
      <BackgroundImage imageUrl={background} />
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
              <div className="survey-question-next">{question.displayOrder < lastQuestionOrder ? <NextButton /> : 'TEST'}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SurveyQuestionPage;
