import { AxiosRequestConfig } from 'axios';
import { deserialize } from 'deserialize-json-api';

import requestManager from 'lib/requestManager';
import { RatingType, Survey, SurveyAnswer, SurveyDetail, SurveyQuestion } from 'types/survey';

// eslint-disable-next-line
const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  attributes: {
    title: surveyResponse.title,
    description: surveyResponse.description,
    coverImageUrl: `${surveyResponse.coverImageUrl}`,
    createdAt: surveyResponse.createdAt,
  },
});

// eslint-disable-next-line
const parseDisplayType = (rawDisplayType: string) => {
  // eslint-disable-next-line
  if (Object.values(RatingType).includes(rawDisplayType as any)) {
    return {
      displayType: 'rating' as SurveyQuestion['displayType'],
      ratingType: rawDisplayType as RatingType,
    };
  }
  return { displayType: rawDisplayType as SurveyQuestion['displayType'] };
};

// eslint-disable-next-line
const parseSurveyAnswer = (answerResponse: any): SurveyAnswer => ({
  id: answerResponse.id,
  displayOrder: answerResponse.displayOrder,
  text: answerResponse.text,
  isMandatory: answerResponse.isMandatory,
});

// eslint-disable-next-line
const sortRecords = (records: any[]) =>
  records.sort((firstRecord, secondRecord) => firstRecord.displayOrder - secondRecord.displayOrder);

// eslint-disable-next-line
const parseSurveyQuestion = (questionResponse: any): SurveyQuestion => {
  const parsedAnswer = (<object[]>questionResponse.answers)?.map((answer) => parseSurveyAnswer(answer)) || [];

  return {
    id: questionResponse.id,
    displayOrder: questionResponse.displayOrder,
    coverImageUrl: `${questionResponse.coverImageUrl}l`,
    text: questionResponse.text,
    pick: questionResponse.pick,
    isMandatory: questionResponse.isMandatory,
    answers: sortRecords(parsedAnswer),
    ...parseDisplayType(questionResponse.displayType),
  };
};

// eslint-disable-next-line
const parseSurveyDetail = (surveyDetailResponse: any): SurveyDetail => {
  const parsedQuestions = (<object[]>surveyDetailResponse.questions).map((question) => parseSurveyQuestion(question));

  const [surveyIntro] = parsedQuestions.filter(({ displayType }) => displayType === 'intro');
  const [surveyOutro] = parsedQuestions.filter(({ displayType }) => displayType === 'outro');
  const questions = parsedQuestions.filter(({ displayType }) => displayType !== 'intro' && displayType !== 'outro');
  return {
    ...parseSurvey(surveyDetailResponse),
    intro: surveyIntro,
    outro: surveyOutro,
    questions: sortRecords(questions),
  };
};

const SurveyAdapter = {
  list: (pageSize: number) => {
    const pageSizeParam: AxiosRequestConfig = {
      params: { 'page[size]': pageSize },
    };
    return requestManager('GET', '/api/v1/surveys', pageSizeParam);
  },
  details: async (surveyId: string) => {
    const response = await requestManager('GET', `/api/v1/surveys/${surveyId}`);
    const deserializedResponse = await deserialize(response);
    return parseSurveyDetail(deserializedResponse.data);
  },
};

export default SurveyAdapter;
