import requestManager from 'lib/requestManager';

const me = () => {
  return requestManager('GET', '/api/v1/me');
};

export { me };
