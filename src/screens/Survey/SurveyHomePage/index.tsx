import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthAdapter from 'adapters/Auth';
import UserAdapter from 'adapters/User';
import useAuth from 'hooks/useAuth';
import ApiError from 'lib/errors/ApiErrors';

const SurveyHomepageScreen = (): JSX.Element => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const fetchUserProfile = () => {
    UserAdapter.me()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // popup error and redirect to login
        console.log(error);
      });
  };
  useEffect(fetchUserProfile, []);
  const testLogOut = () => {
    if (auth) {
      AuthAdapter.logOut(auth.accessToken)
        .then(() => {
          setAuth(null);
          navigate('/');
        })
        .catch((error) => {
          if (error instanceof ApiError) {
            console.log('Api error', error);
          } else {
            console.log('else error : ', error);
          }
        });
    }
  };
  return (
    <div className="app">
      This is Home Screen!
      <button onClick={testLogOut}>Logout</button>
    </div>
  );
};

export default SurveyHomepageScreen;
