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

const SurveyLoading = () => {
  return (
    <div>
      <SkeletonLoader dataTestId={SurveyLoadingDataTestIds.avatarLoader} width={36} height={36} className="user-avatar-loader" />
      <SkeletonLoader dataTestId={SurveyLoadingDataTestIds.dateLoader} width={150} height={25} className="date-loader" />
      <SkeletonLoader
        dataTestId={SurveyLoadingDataTestIds.dateTodayLoader}
        width={100}
        height={25}
        className="date-today-loader"
      />
      <div className="survey-list-loader-container">
        <SkeletonLoader
          dataTestId={SurveyLoadingDataTestIds.surveyListLoader}
          width={704}
          height={302}
          className="survey-list-loader"
        />
        <SkeletonLoader
          dataTestId={SurveyLoadingDataTestIds.surveyLinkLoader}
          width={56}
          height={56}
          className="survey-link-loader"
        />
      </div>
      <SkeletonLoader
        dataTestId={SurveyLoadingDataTestIds.surveyTitleLoader}
        width={318}
        height={25}
        className="survey-title-loader"
      />
      <SkeletonLoader
        dataTestId={SurveyLoadingDataTestIds.surveyDescriptionLoader}
        width={240}
        height={25}
        className="survey-description-loader"
      />
    </div>
  );
};

export default SurveyLoading;
