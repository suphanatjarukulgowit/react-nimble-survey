import React from 'react';

import TodayDate from 'components/TodayDate';

const surveyBlankStateTestIds = {
  blankStateContainer: 'blankStateContainer',
  emoji: 'blankStateEmoji',
  description: 'blankStateDescription',
  todayContainer: 'todayContainer',
  blankState: 'blankState',
};

export interface SurveyBlankStateProps extends React.HTMLAttributes<HTMLDivElement> {
  emoji: string;
  description: string;
}

const SurveyBlankState = ({ emoji, description }: SurveyBlankStateProps) => {
  return (
    <>
      <div data-test-id={surveyBlankStateTestIds.todayContainer} className="today-container">
        <TodayDate />
      </div>
      <div className="blank-state-container" data-test-id={surveyBlankStateTestIds.blankState}>
        <div className="blank-state-emoji" data-test-id={surveyBlankStateTestIds.emoji}>
          {emoji}
        </div>
        <h2 className="blank-state-description" data-test-id={surveyBlankStateTestIds.description}>
          {description}
        </h2>
      </div>
    </>
  );
};

export default SurveyBlankState;
