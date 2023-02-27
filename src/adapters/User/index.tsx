import requestManager from 'lib/requestManager';

const UserAdapter = {
  me: () => {
    return requestManager('GET', '/api/v1/me');
  },
  resetPassword: (email: string) => {
    const data = {
      user: {
        email,
      },
      clientId: process.env.REACT_APP_API_CLIENT_ID,
      clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
    };

    return requestManager('POST', '/api/v1/passwords', { data });
  },
};

export default UserAdapter;
