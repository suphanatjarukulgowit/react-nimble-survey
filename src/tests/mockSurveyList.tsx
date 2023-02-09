import { Survey } from 'types/survey';

const mockSurveyList1: Survey = {
  attributes: {
    id: '1',
    title: '',
    description: '',
    coverImageUrl: 'coverImage1',
    createdAt: '',
  },
};
const mockSurveyList2: Survey = {
  attributes: {
    id: '2',
    title: '',
    description: '',
    coverImageUrl: 'coverImage2',
    createdAt: '',
  },
};

export const mockSurveyList: Survey[] = [mockSurveyList1, mockSurveyList2];
