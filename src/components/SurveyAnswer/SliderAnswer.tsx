import React from 'react';

import { SurveyAnswerProps } from '.';
import Slider from './Slider';

const SliderAnswer = ({ question, onResponseChange }: SurveyAnswerProps) => {
  const setCurrentResponse = (index: number) => {
    const answerId = question.answers[index].id;

    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
  };

  return <Slider className="swiper-no-swiping" max={question.answers.length - 1} onChange={setCurrentResponse} />;
};

export default SliderAnswer;
