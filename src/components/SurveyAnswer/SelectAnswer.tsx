import React, { useState } from 'react';

import Select, { SelectOptionType } from 'components/Select';

import { SurveyAnswerProps } from '.';

const SelectAnswer = ({ question, onResponseChange }: SurveyAnswerProps) => {
  const [currentAnswer, setCurrentAnswer] = useState<SelectOptionType | null>(null);

  const options = question.answers.map((answer) => ({
    value: answer.id,
    label: answer.text,
  }));

  const onAnswerSelect = (selectedAnswer: SelectOptionType | null) => {
    setCurrentAnswer(selectedAnswer);

    if (selectedAnswer === null) {
      onResponseChange(null);

      return;
    }

    onResponseChange({
      questionId: question.id,
      answers: [{ id: selectedAnswer.value }],
    });
  };

  return (
    <Select
      options={options}
      value={currentAnswer}
      blurInputOnSelect={true}
      className="swiper-no-swiping"
      onChange={onAnswerSelect}
    />
  );
};

export default SelectAnswer;
