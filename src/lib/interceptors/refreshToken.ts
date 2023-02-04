import React from 'react';

import axios from 'axios';

import AuthAdapter from 'adapters/Auth';
import useAuth from 'hooks/useAuth';
import ApiError from 'lib/errors/ApiErrors';

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const { setAuth } = useAuth();
    if (error.response.status === 401) {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const jsonAuth = JSON.parse(authData);
        setAuth(jsonAuth);
        AuthAdapter.refresh(jsonAuth.refreshToken)
          .then((response) => {
            setAuth(response?.data?.attributes);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.attributes.accessToken}`;
            return axios(error.config);
          })
          .catch((error) => {
            if (error instanceof ApiError) {
              console.log('Api error', error);
            } else {
              console.log('else error : ', error);
            }
          });
      }
    }
    return error;
  }
);
