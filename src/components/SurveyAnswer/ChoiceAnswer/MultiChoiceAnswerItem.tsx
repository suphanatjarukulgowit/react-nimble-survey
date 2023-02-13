import React, { useState } from 'react';

import check from 'assets/images/check.svg';
import { SurveyAnswer } from 'types/survey';

interface MultiChoiceAnswerItemProps {
  answer: SurveyAnswer;
  onAnswerItemSelect: (answerId: string) => void;
}

const MultiChoiceAnswerItem = ({ answer, onAnswerItemSelect }: MultiChoiceAnswerItemProps) => {
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);

  const answerStateClass = () => {
    if (isSelectedAnswer) {
      return 'active_answer';
    }
  };

  const onAnswerItemClick = () => {
    setIsSelectedAnswer(!isSelectedAnswer);
    onAnswerItemSelect(answer.id);
  };

  return (
    <button className={`${'multiple-pick-answer'} ${answerStateClass()}`} onClick={onAnswerItemClick}>
      {answer.text}
      <div className={'checkbox'}>
        <img src={check} alt="check box" />
      </div>
    </button>
  );
};

export default MultiChoiceAnswerItem;
