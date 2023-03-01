import requestManager from 'lib/requestManager';

const list = () => {
  return requestManager('GET', '/api/v1/surveys');
};

export { list };
