import React, { useState } from 'react';

import { SurveyAnswer } from 'types/survey';

import { SurveyAnswerProps } from '.';

const NpsChoiceAnswer = ({ question, onResponseChange }: SurveyAnswerProps) => {
  const [lastClickedButtonIndex, setLastClickedButtonIndex] = useState(-1);

  const onAnswerSelect = (answerId: string, index: number) => {
    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
    setLastClickedButtonIndex(index);
  };

  const answerStateClass = (index: number) => {
    if (index <= lastClickedButtonIndex) {
      return 'active-answer';
    }
  };

  const getFirstAndLastIndexClass = (index: number, answers: SurveyAnswer[]) => {
    if (index === 0) {
      return 'nps-answer__first';
    }

    if (index === answers.length - 1) {
      return 'nps-answer__last';
    }

    return '';
  };

  return (
    <div className="nps-answer-container">
      <div>
        {question.answers.map((answer, index) => (
          <button
            key={answer.id}
            className={`nps-answer ${getFirstAndLastIndexClass(index, question.answers)} ${answerStateClass(index)}`}
            onClick={() => onAnswerSelect(answer.id, index)}
          >
            {answer.text}
          </button>
        ))}
        <div className="nps-answer-description">
          <span className="nps-answer-description__not-at-all-likely">Not at all Likely</span>
          <span className="nps-answer-description__extremely-likely">Extremely Likely</span>
        </div>
      </div>
    </div>
  );
};

export default NpsChoiceAnswer;
