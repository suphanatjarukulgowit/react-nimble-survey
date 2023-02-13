import React from 'react';

import SimpleBar from 'simplebar-react';

import { SurveyResponse } from 'types/survey';

import MultiplePickAnswerItem from './MultiChoiceAnswerItem';
import { SurveyAnswerProps } from '..';

import 'simplebar-react/dist/simplebar.min.css';

const MultipleChoiceAnswer = ({ question, currentResponse, onResponseChange }: SurveyAnswerProps) => {
  const setCurrentResponses = (updatedAnswers: SurveyResponse['answers']) => {
    if (updatedAnswers.length === 0) {
      return onResponseChange(null);
    }

    onResponseChange({
      questionId: question.id,
      answers: updatedAnswers,
    });
  };

  const onAnswerItemSelect = (answerId: string) => {
    const selectedAnswers = currentResponse?.answers || [];
    const isAnswerSelected = selectedAnswers.some(({ id }) => id === answerId);

    if (isAnswerSelected) {
      const updatedAnswers = selectedAnswers.filter(({ id }) => id !== answerId);

      setCurrentResponses(updatedAnswers);
    } else {
      setCurrentResponses(selectedAnswers.concat({ id: answerId }));
    }
  };
  return (
    <SimpleBar className="miltiple-choice-answer" autoHide={false}>
      {question.answers.map((answer) => (
        <MultiplePickAnswerItem key={answer.id} answer={answer} onAnswerItemSelect={onAnswerItemSelect} />
      ))}
    </SimpleBar>
  );
};

export default MultipleChoiceAnswer;
