import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { Swiper } from 'swiper';

import SurveyAdapter from 'adapters/Survey';
import UserAdapter from 'adapters/User';
import BackgroundImage from 'components/BackGroundImage';
import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import SurveyLoading from 'components/SurveyLoding';
import useAuth from 'hooks/useAuth';
import { Survey } from 'types/survey';

const SurveyHomepageScreenDataTestIds = {
  defaultLayout: 'defaultLayout',
  thankYouPage: 'thankYouPage',
  surveyList: 'surveyList',
};

const SurveyHomepageScreen = (): JSX.Element => {
  const { setUserProfile } = useAuth();
  const [surveyBackground, setSurveyBackground] = useState('');
  const fetchUserProfile = () => {
    UserAdapter.me()
      .then((response) => {
        setUserProfile(response?.data?.attributes);
      })
      .catch((error) => {
        // popup error and redirect to login
        console.log(error);
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
          <div data-test-id={SurveyHomepageScreenDataTestIds.thankYouPage}>thank you page</div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default SurveyHomepageScreen;
