import requestManager from 'lib/requestManager';

const logIn = (email: string, password: string) => {
  const data = {
    grantType: 'password',
    email,
    password,
    clientId: process.env.REACT_APP_API_CLIENT_ID,
    clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
  };
  return requestManager('POST', '/api/v1/oauth/token', { data });
};

const refreshToken = (token: string) => {
  const data = {
    grantType: 'refresh_token',
    refreshToken: token,
    clientId: process.env.REACT_APP_API_CLIENT_ID,
    clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
  };
  return requestManager('POST', '/api/v1/oauth/token', { data });
};

const logOut = (token: string) => {
  const data = {
    token: token,
    clientId: process.env.REACT_APP_API_CLIENT_ID,
    clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
  };
  return requestManager('POST', '/api/v1/oauth/revoke', { data });
};
export { logIn, refreshToken, logOut };
