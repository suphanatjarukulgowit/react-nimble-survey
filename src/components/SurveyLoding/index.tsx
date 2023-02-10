import React from 'react';

import SkeletonLoader from 'components/SkeletonLoader';

const SurveyLoading = () => {
  return (
    <div>
      <SkeletonLoader width={36} height={36} className="user-avatar-loader" />
      <SkeletonLoader width={150} height={25} className="date-loader" />
      <SkeletonLoader width={100} height={25} className="date-today-loader" />
      <SkeletonLoader width={704} height={302} className="survey-list-loader" />
      <SkeletonLoader width={318} height={25} className="survey-title-loader" />
      <SkeletonLoader width={240} height={25} className="survey-description-loader" />
      <SkeletonLoader width={56} height={56} className="survey-link-loader" />
    </div>
  );
};

export default SurveyLoading;
