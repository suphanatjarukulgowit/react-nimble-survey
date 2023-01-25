import axios, { Method as HTTPMethod, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import { camelizeKeys } from 'humps';
import _ from 'lodash';

import ApiError from './errors/ApiErrors';

export const defaultOptions: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
  transformRequest: [
    (data) => _.mapKeys(data, (v, k) => _.snakeCase(k)),
    ...(axios.defaults.transformRequest as AxiosTransformer[]),
  ],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (data) => camelizeKeys(data)],
};

const attachHeader = (requestOptions: AxiosRequestConfig) => {
  const authValue = localStorage.getItem('auth');
  if (authValue) {
    const jsonAuth = JSON.parse(authValue);
    requestOptions.headers = {
      ...requestOptions.headers,
      authorization: `Bearer ${jsonAuth.accessToken}`,
    };
  }

  return requestOptions;
};

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

  requestOptions = attachHeader(requestOptions);
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
