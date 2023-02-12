import React from 'react';

import SurveyAnswer, { SurveyAnswerProps } from 'components/SurveyAnswer';
import { SurveyQuestion as SurveyQuestionInterface } from 'types/survey';

interface SurveyQuestionProps extends SurveyAnswerProps {
  lastQuestionOrder: number;
  question: SurveyQuestionInterface;
}

const SurveyQuestion = ({ lastQuestionOrder, question, ...answerProps }: SurveyQuestionProps) => {
  return (
    <div className="survey-question-container">
      <div className="survey-question-page-order">{`${question.displayOrder}/${lastQuestionOrder}`}</div>
      <h1 className="survey-question-description">{question.text}</h1>
      <div className="survey-question-answer">
        <SurveyAnswer question={question} {...answerProps} />
      </div>
    </div>
  );
};

export default SurveyQuestion;
