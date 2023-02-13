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
      return 'activeAnswer';
    }
  };

  const onAnswerItemClick = () => {
    setIsSelectedAnswer(!isSelectedAnswer);
    onAnswerItemSelect(answer.id);
  };

  return (
    <button className={`${'multiplePickAnswer'} ${answerStateClass()}`} onClick={onAnswerItemClick}>
      {answer.text}
      <div className={'checkbox'}>
        <div className={'checkboxIcon'}>
          {/* <Image
            width={13}
            height={13}
            src="/icon/check.svg"
            alt="active answer icon"
          /> */}
          <img src={check} alt="check box" />
        </div>
      </div>
    </button>
  );
};

export default MultiChoiceAnswerItem;
