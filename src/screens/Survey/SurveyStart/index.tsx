import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import SurveyAdapter from 'adapters/Survey';
import back from 'assets/images/back.svg';
import BackgroundImage from 'components/BackGroundImage';
import Button from 'components/Button';
import SurveyStartLoader from 'components/SurveyStartLoading';
import StoreContext from 'contexts/StoreProvider';
import { getHiResImageUrl } from 'helpers/image';
import { SurveyDetail } from 'types/survey';

const SurveyStart = (): JSX.Element => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyDetail>();
  const [surveyLoading, setSuryveyLoading] = useState(false);
  const { t } = useTranslation();
  const { setBackground, setCurrentSurvey } = useContext(StoreContext);
  useEffect(() => {
    if (surveyId) {
      setSuryveyLoading(true);
      SurveyAdapter.details(surveyId)
        .then((surveyDetail) => {
          setSurvey(surveyDetail);
          setCurrentSurvey(surveyDetail);
          setBackground(getHiResImageUrl(surveyDetail.attributes.coverImageUrl));
          setSuryveyLoading(false);
        })
        .catch(() => {
          setSuryveyLoading(false);
          navigate('/home');
        });
    }
    // eslint-disable-next-line
  }, [surveyId]);
  return (
    <div>
      {surveyLoading ? (
        <SurveyStartLoader />
      ) : survey ? (
        <>
          <BackgroundImage imageUrl={survey.attributes.coverImageUrl} />
          <div>
            <Link className="back-button" to="/home">
              <img src={back} alt="back button" />
            </Link>
          </div>
          <div className="survey-start-container">
            <div>
              <img
                className="survey-start-image"
                src={getHiResImageUrl(survey.attributes.coverImageUrl)}
                alt={survey.attributes.title}
              />
            </div>
            <div>
              <h1 className="survey-start-title">{survey.attributes.title}</h1>
            </div>
            <div className="survey-start-description">{survey.intro.text}</div>
            <div className="survey-start-button">
              <Link to={`/survey/${surveyId}/question`}>
                <Button type="button" className="survey-start-button">
                  {t('survey.start_survey')}
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : // pop up error and redirect to home
      null}
    </div>
  );
};

export default SurveyStart;
