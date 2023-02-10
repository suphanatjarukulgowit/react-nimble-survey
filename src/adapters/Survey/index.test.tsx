import React from 'react';

import requestManager from 'lib/requestManager';

import SurveyAdapter from '.';

jest.mock('lib/requestManager', () => jest.fn());

describe('AuthAdapter', () => {
  describe('list()', () => {
    it('fires get request to fetch survey list data', () => {
      const expectedMethod = 'GET';
      const expectedEndpoint = '/api/v1/surveys';

      SurveyAdapter.list();

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint);
    });
  });
});
