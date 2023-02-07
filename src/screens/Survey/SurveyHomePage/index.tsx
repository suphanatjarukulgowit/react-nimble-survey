import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { Swiper } from 'swiper';

import { list } from 'adapters/Survey';
import { me } from 'adapters/User';
import BackgroundImage from 'components/BackGroundImage';
import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import useAuth from 'hooks/useAuth';
import { Survey } from 'types/survey';

const SurveyHomepageScreen = (): JSX.Element => {
  const { setUserProfile } = useAuth();
  const [surveyBackground, setSurveyBackground] = useState('');
  const fetchUserProfile = () => {
    me()
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

    const data = await list();
    const surveysResponse: Survey[] = _.get(data, 'data');

    setSurveys(surveysResponse);
    if (surveysResponse.length !== 0) {
      setSurveyBackground(surveysResponse[0].attributes.coverImageUrl);
    }
    setSuryveyLoading(false);
  }, []);
  const onSlideChange = async (swiper: Swiper) => {
    setSurveyBackground(surveys[swiper.activeIndex].attributes.coverImageUrl);
  };
  useEffect(fetchUserProfile, []);
  useEffect(() => {
    fetchSurveyList();
  }, [fetchSurveyList]);

  return (
    <div>
      <DefaultLayout>
        {surveyLoading ? (
          <div>display skeleton loading</div>
        ) : surveys && surveys.length !== 0 ? (
          <>
            <BackgroundImage imageUrl={surveyBackground} />
            <SurveyList onSlideChange={onSlideChange} surveys={surveys} />
          </>
        ) : (
          <div>thank you page</div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default SurveyHomepageScreen;
