import React, { useEffect } from 'react';

import { me } from 'adapters/User';
import DefaultLayout from 'components/Layout/Default';
import useAuth from 'hooks/useAuth';

import SurveyList from '../../../components/SurveyList';

const SurveyHomepageScreen = (): JSX.Element => {
  const { setUserProfile } = useAuth();
  console.log(setUserProfile);
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
  useEffect(fetchUserProfile, []);
  return (
    <div>
      <DefaultLayout>
        <SurveyList />
      </DefaultLayout>
    </div>
  );
};

export default SurveyHomepageScreen;
