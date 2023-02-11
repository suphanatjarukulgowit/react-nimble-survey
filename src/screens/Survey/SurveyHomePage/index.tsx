import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import { Swiper } from 'swiper';

import SurveyAdapter from 'adapters/Survey';
import UserAdapter from 'adapters/User';
import BackgroundImage from 'components/BackGroundImage';
import DefaultLayout from 'components/Layout/Default';
import SurveyBlankState from 'components/SurveyBlankState';
import SurveyList from 'components/SurveyList';
import SurveyLoading from 'components/SurveyLoding';
import useAuth from 'hooks/useAuth';
import { Survey } from 'types/survey';

const SurveyHomepageScreenDataTestIds = {
  defaultLayout: 'defaultLayout',
  surveyList: 'surveyList',
};

const SurveyHomepageScreen = (): JSX.Element => {
  const { setUserProfile } = useAuth();
  const [surveyBackground, setSurveyBackground] = useState('');
  const { t } = useTranslation();
  const fetchUserProfile = () => {
    UserAdapter.me()
      .then((response) => {
        setUserProfile(response?.data?.attributes);
      })
      .catch(() => {
        // popup error and redirect to login
      });
  };
  const [surveyLoading, setSuryveyLoading] = useState(false);

  const [surveys, setSurveys] = useState<Survey[]>([]);
  const fetchSurveyList = useCallback(async () => {
    setSuryveyLoading(true);

    const data = await SurveyAdapter.list();
    const surveysResponse: Survey[] = _.get(data, 'data');

    setSurveys(surveysResponse);
    if (surveysResponse) {
      setSurveyBackground(surveysResponse[0].attributes.coverImageUrl);
    }
    setSuryveyLoading(false);
  }, []);
  const onSlideChange = async (swiper: Swiper) => {
    setSurveyBackground(surveys[swiper.activeIndex].attributes.coverImageUrl);
  };
  useEffect(
    fetchUserProfile,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    fetchSurveyList();
  }, [fetchSurveyList]);

  return (
    <div>
      <DefaultLayout isSurveyLoading={surveyLoading} data-test-id={SurveyHomepageScreenDataTestIds.defaultLayout}>
        {surveyLoading ? (
          <div>
            <SurveyLoading></SurveyLoading>
          </div>
        ) : surveys && surveys.length !== 0 ? (
          <>
            <BackgroundImage imageUrl={surveyBackground} />
            <SurveyList
              data-test-id={SurveyHomepageScreenDataTestIds.surveyList}
              onSlideChange={onSlideChange}
              surveys={surveys}
            />
          </>
        ) : (
          <SurveyBlankState emoji="😎" description={t('survey.Blank_state_desctiption')}></SurveyBlankState>
        )}
      </DefaultLayout>
    </div>
  );
};

export default SurveyHomepageScreen;
