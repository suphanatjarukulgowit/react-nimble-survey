import React from 'react';

import { PickType } from 'types/survey';

import MultiChoiceAnswer from './MultiChoiceAnswer copy';
import SingleChoiceAnswer from './SingleChoiceAnswer';
import { SurveyAnswerProps } from '..';

const AnswerItems: Record<PickType, React.FunctionComponent<SurveyAnswerProps>> = {
  one: SingleChoiceAnswer,
  any: MultiChoiceAnswer,
};

const ChoiceAnswer = (props: SurveyAnswerProps) => {
  const AnswerItem = AnswerItems[props.question.pick];

  return <AnswerItem {...props} />;
};

export default ChoiceAnswer;
