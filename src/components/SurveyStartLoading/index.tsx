import React from 'react';

import SkeletonLoader from 'components/SkeletonLoader';

const SurveyLoadingDataTestIds = {
  avatarLoader: 'avatarLoader',
  dateLoader: 'dateLoader',
  dateTodayLoader: 'dateTodayLoader',
  surveyListLoader: 'surveyListLoader',
  surveyLinkLoader: 'surveyLinkLoader',
  surveyTitleLoader: 'surveyTitleLoader',
  surveyDescriptionLoader: 'surveyDescriptionLoader',
};

const SurveyStartLoader = () => {
  return (
    <>
      <div className="background-loading"></div>
      <div className="survey-start-container">
        <SkeletonLoader dataTestId={SurveyLoadingDataTestIds.avatarLoader} className="survey-start-image" />
        <SkeletonLoader dataTestId={SurveyLoadingDataTestIds.dateLoader} width={450} height={41} className="survey-start-title" />
        <SkeletonLoader
          dataTestId={SurveyLoadingDataTestIds.dateTodayLoader}
          width={250}
          height={30}
          className="survey-start-description__loader"
        />
      </div>
    </>
  );
};

export default SurveyStartLoader;
