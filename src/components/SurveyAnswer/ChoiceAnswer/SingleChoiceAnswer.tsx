import React from 'react';

import SimpleBar from 'simplebar-react';

import { SurveyAnswerProps } from '..';

import 'simplebar-react/dist/simplebar.min.css';

const SingleChoiceAnswer = ({ question, currentResponse, onResponseChange }: SurveyAnswerProps) => {
  const onAnswerSelect = (answerId: string) => {
    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
  };

  const answerClass = (answerId: string) => {
    const isActiveAnswer = currentResponse?.answers[0].id === answerId;

    if (isActiveAnswer) {
      return 'single-choice-answer-active';
    }
    return 'single-choice-answer-default';
  };

  return (
    <>
      <SimpleBar className="single-choice-answer" autoHide={false}>
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            className={`single-choice-answer-list ${answerClass(answer.id)}`}
            onClick={() => onAnswerSelect(answer.id)}
          >
            {answer.text}
          </button>
        ))}
      </SimpleBar>
    </>
  );
};

export default SingleChoiceAnswer;
