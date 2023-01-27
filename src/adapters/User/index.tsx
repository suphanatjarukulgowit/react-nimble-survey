import requestManager from 'lib/requestManager';

const UserAdapter = {
  me: () => {
    return requestManager('GET', '/api/v1/me');
  },
};

export default UserAdapter;
