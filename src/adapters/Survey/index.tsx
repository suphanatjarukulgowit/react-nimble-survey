import requestManager from 'lib/requestManager';

const SurveyAdapter = {
  list: () => {
    return requestManager('GET', '/api/v1/surveys');
  },
};

export default SurveyAdapter;
