import React from 'react';

import requestManager from 'lib/requestManager';

import UserAdapter from '.';

jest.mock('lib/requestManager', () => jest.fn());

describe('AuthAdapter', () => {
  describe('list()', () => {
    it('fires get request to fetch user data', () => {
      const expectedMethod = 'GET';
      const expectedEndpoint = '/api/v1/me';

      UserAdapter.me();

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint);
    });
  });
});
