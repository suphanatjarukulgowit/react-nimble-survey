import React from 'react';
import { Link } from 'react-router-dom';

import action from 'assets/images/action.svg';
import { getHiResImageUrl } from 'helpers/image';
import { Survey } from 'types/survey';

interface SurveyItemProps {
  survey: Survey;
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  return (
    <div className="cursor-pointer">
      <Link to={`/survey/${survey.id}`}>
        <img
          src={getHiResImageUrl(survey.attributes.coverImageUrl)}
          className="survey-cover-image"
          alt={survey.attributes.title}
        />
      </Link>
      <div>
        <div className="survey-title">
          <h1>{survey.attributes.title}</h1>
          <div className="survey-description">{survey.attributes.description}</div>
        </div>
        <div className="survey-button">
          <Link to={`/survey/${survey.id}`}>
            <img src={action} alt="take survey button" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyItem;
