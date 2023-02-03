import requestManager from 'lib/requestManager';

import AuthAdapter from './';


jest.mock('lib/requestManager', () => jest.fn());

describe('AuthAdapter', () => {
    describe('login()', () => {
        it('fires post request to login api with the correct data', () => {
          const email = 'suphanat@nimblehq.co';
          const password = '12345678';
    
          const expectedMethod = 'POST';
          const expectedEndpoint = '/api/v1/oauth/token';
          const expectedData = {
            grantType: 'password',
            email,
            password,
            clientId: process.env.REACT_APP_API_CLIENT_ID,
            clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
          };
    
          AuthAdapter.login(email, password);
    
          expect(requestManager).toHaveBeenCalledTimes(1);
          expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
        });
      });
      describe('refresh()', () => {
        it('fires post request to refresh token api with the correct data', () => {
    
          const expectedMethod = 'POST';
          const expectedEndpoint = '/api/v1/oauth/token';
          const expectedData = {
            grantType: 'refresh_token',
            refreshToken: 'test_token',
            clientId: process.env.REACT_APP_API_CLIENT_ID,
            clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
          };
    
          AuthAdapter.refresh(expectedData.refreshToken);
    
          expect(requestManager).toHaveBeenCalledTimes(1);
          expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
        });
      });
      describe('logout()', () => {
        it('fires post request to revoke api with the correct data', () => {
    
          const expectedMethod = 'POST';
          const expectedEndpoint = '/api/v1/oauth/revoke';
          const expectedData = {
            token: 'test_token',
            clientId: process.env.REACT_APP_API_CLIENT_ID,
            clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
          };
    
          AuthAdapter.logOut(expectedData.token);
    
          expect(requestManager).toHaveBeenCalledTimes(1);
          expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
        });
      });
});