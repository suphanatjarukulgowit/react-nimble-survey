import React from 'react';

import { QuestionType, SurveyQuestion as SurveyQuestionInterface, SurveyResponse } from 'types/survey';

import ChoiceAnswer from './ChoiceAnswer';
import NpsChoiceAnswer from './NpsChoiceAnswer';
import RatingAnswer from './RatingAnswer';
import SelectAnswer from './SelectAnswer';
import SliderAnswer from './SliderAnswer';
import TextareaAnswer from './TextAreaAnswer';
import TextfieldAnswer from './TextfieldAnswer';

export interface SurveyAnswerProps {
  question: SurveyQuestionInterface;
  onResponseChange: (response: SurveyResponse | null) => void;
  currentResponse?: SurveyResponse;
}

const AnswerItems: Record<QuestionType, React.FunctionComponent<SurveyAnswerProps>> = {
  dropdown: SelectAnswer,
  choice: ChoiceAnswer,
  nps: NpsChoiceAnswer,
  rating: RatingAnswer,
  textfield: TextfieldAnswer,
  slider: SliderAnswer,
  textarea: TextareaAnswer,
};

const SurveyAnswer = (props: SurveyAnswerProps) => {
  const displayType = props.question.displayType as QuestionType;
  const isValidQuestionType = Object.values<string>(QuestionType).includes(displayType);

  if (!isValidQuestionType) {
    return (
      <div>
        <h1>Unknow type of question</h1>
      </div>
    );
  }

  const AnswerItem = AnswerItems[displayType];

  return <AnswerItem {...props} />;
};

export default SurveyAnswer;
