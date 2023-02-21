import React, { useState } from 'react';

import { SurveyAnswerProps } from '.';
import RaingAnsweItem from './RaingAnsweItem';

const answerStateClass = (answerIndex: number, selectedIndex: number, hoverIndex: number) => {
  const isActiveAnswer = answerIndex <= Math.max(selectedIndex, hoverIndex);
  return isActiveAnswer ? 'opacity-100' : 'opacity-50';
};

const RatingAnswer = ({ question, currentResponse, onResponseChange }: SurveyAnswerProps) => {
  const setDefaultSelectedIndex = () => {
    const currentAnswer = currentResponse?.answers?.[0];
    const { displayOrder = -1 } = question.answers.find(({ id }) => id === currentAnswer?.id) || {};
    return displayOrder;
  };

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(setDefaultSelectedIndex());

  const onAnswerSelect = (answerId: string, index: number) => {
    setSelectedIndex(index);
    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
  };

  return (
    <div className="rating-container">
      {question.answers.map((answer, index) => (
        <RaingAnsweItem
          key={answer.id}
          ratingType={question.ratingType}
          answerStateClass={answerStateClass(index, selectedIndex, hoverIndex)}
          onClick={() => onAnswerSelect(answer.id, index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        />
      ))}
    </div>
  );
};

export default RatingAnswer;
