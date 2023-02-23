import React from 'react';

import { SurveyAnswerProps } from '.';

const TextareaAnswer = ({ question, currentResponse, onResponseChange }: SurveyAnswerProps) => {
  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      onResponseChange(null);
    }

    const currentAnswer = question.answers[0];

    onResponseChange({
      questionId: question.id,
      answers: [{ id: currentAnswer.id, answer: event.target.value }],
    });
  };

  return <textarea className="text-area" value={currentResponse?.answers[0].answer} onChange={handleAnswerChange} />;
};

export default TextareaAnswer;
