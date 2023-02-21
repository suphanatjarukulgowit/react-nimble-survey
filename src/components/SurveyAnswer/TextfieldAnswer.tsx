import React from 'react';

import { SurveyAnswerProps } from '.';

const TextfieldAnswer = ({ question, currentResponse, onResponseChange }: SurveyAnswerProps) => {
  const answerValue = (answerId: string) => {
    const currentValue = currentResponse?.answers.find((answer) => answer.id === answerId)?.answer;
    return currentValue || '';
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, answerId: string) => {
    const currentResponseAnswers = currentResponse?.answers || [];
    const updatedResponseAnswers = currentResponseAnswers
      .filter((answer) => answer.id !== answerId)
      .concat({ id: answerId, answer: event.target.value });

    onResponseChange({
      questionId: question.id,
      answers: updatedResponseAnswers,
    });
  };

  return (
    <div className="text-field-answer">
      {question.answers.map((answer) => (
        <div key={answer.id} className="text-field-answer-item">
          <h2 className="text-field-answer-text">{answer.text}</h2>
          <input
            className="text-field-answer-input"
            value={answerValue(answer.id)}
            onChange={(event) => handleAnswerChange(event, answer.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TextfieldAnswer;
