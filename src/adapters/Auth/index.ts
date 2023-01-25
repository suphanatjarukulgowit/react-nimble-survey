import requestManager from 'lib/requestManager';

const AuthAdapter = {
  login: (email: string, password: string) => {
    const data = {
      grantType: 'password',
      email,
      password,
      clientId: process.env.REACT_APP_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    };
    return requestManager('POST', '/api/v1/oauth/token', { data });
  },
  refresh: (refreshToken: string) => {
    const data = {
      grantType: 'refresh_token',
      refreshToken: refreshToken,
      clientId: process.env.REACT_APP_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    };
    return requestManager('POST', '/api/v1/oauth/token', { data });
  },
  logOut: (token: string) => {
    const data = {
      token: token,
      clientId: process.env.REACT_APP_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    };
    return requestManager('POST', '/api/v1/oauth/revoke', { data });
  },
};

export default AuthAdapter;
