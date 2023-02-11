import React from 'react';

const surveyBlankStateTestIds = {
  blankStateContainer: 'blankStateContainer',
  emoji: 'blankStateEmoji',
  description: 'blankStateDescription',
};

export interface SurveyBlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string;
  description: string;
}

const SurveyBlankState = ({ emoji, description, ...props }: SurveyBlankStateProps) => {
  return (
    <div className="blank-state-container" data-test-id={surveyBlankStateTestIds.blankStateContainer} {...props}>
      <div className="blank-state-emoji" data-test-id={surveyBlankStateTestIds.emoji}>
        {emoji}
      </div>
      <h2 data-test-id={surveyBlankStateTestIds.description}>{description}</h2>
    </div>
  );
};

export default SurveyBlankState;
