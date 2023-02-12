import { Survey } from 'types/survey';

export const mockSurveyList1: Survey = {
  id: '1',
  attributes: {
    title: '',
    description: '',
    coverImageUrl: 'coverImage1',
    createdAt: '',
  },
};
export const mockSurveyList2: Survey = {
  id: '2',
  attributes: {
    title: '',
    description: '',
    coverImageUrl: 'coverImage2',
    createdAt: '',
  },
};

export const mockSurveyList: Survey[] = [mockSurveyList1, mockSurveyList2];
