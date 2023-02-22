import axios, { Method as HTTPMethod, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import { camelizeKeys } from 'humps';
import _ from 'lodash';

import { refreshToken } from 'adapters/Auth';

import ApiError from './errors/ApiErrors';
import { getLocalStorageValue, LocalStorageKey, setLocalStorageValue, removeLocalStorageValue } from './localStorage';

export const defaultOptions: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
  transformRequest: [
    (data) => _.mapKeys(data, (v, k) => _.snakeCase(k)),
    ...(axios.defaults.transformRequest as AxiosTransformer[]),
  ],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (data) => camelizeKeys(data)],
};

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401) {
      const authData = getLocalStorageValue(LocalStorageKey.auth);
      if (authData) {
        refreshToken(authData.refreshToken)
          .then((response) => {
            setLocalStorageValue(LocalStorageKey.auth, response?.data?.attributes);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.attributes.accessToken}`;
            return axios(error.config);
          })
          .catch(() => {
            removeLocalStorageValue(LocalStorageKey.auth);
            window.location.href = '/';
          });
      }
    } else {
      return Promise.reject(error);
    }
    return error;
  }
);

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {Object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */

const requestManager = (
  method: HTTPMethod,
  endpoint: string,
  requestOptions: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions,
    ...requestOptions,
  };

  return axios
    .request(requestParams)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response);
      } else {
        throw error;
      }
    });
};

export default requestManager;
