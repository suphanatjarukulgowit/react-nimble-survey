import requestManager from 'lib/requestManager';

import { list } from '.';

jest.mock('lib/requestManager', () => jest.fn());

describe('AuthAdapter', () => {
  describe('list()', () => {
    it('fires get request to fetch survey list data', () => {
      const expectedMethod = 'GET';
      const expectedEndpoint = '/api/v1/surveys';

      list();

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint);
    });
  });
});
