import React from 'react';

import { render, waitFor, screen, act } from '@testing-library/react';

import SurveyAdapter from 'adapters/Survey';
import UserAdapter from 'adapters/User';
import { mockSurveyList } from 'tests/mockSurveyList';
import { mockUser } from 'tests/mockUserLogin';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyHomepageScreen from '.';

const SurveyHomepageScreenDataTestIds = {
  defaultLayout: 'defaultLayout',
  thankYouPage: 'thankYouPage',
  surveyList: 'surveyList',
};

const mockUseNavigate = jest.fn();

jest.mock('adapters/User');
jest.mock('adapters/Survey');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('SurveyHomepageScreen', () => {
  it('should fetch user api', async () => {
    renderWithRouter(<SurveyHomepageScreen />);
    const mockUser = jest.fn(() => Promise.resolve());
    mockUser.mockResolvedValue(Promise.resolve());

    act(async () => {
      renderWithRouter(<SurveyHomepageScreen />);
    });
    await waitFor(() => {
      expect(UserAdapter.me).toHaveBeenCalledTimes(1);
    });
  });

  //   it('should fetch survey list', async () => {
  //     const { findByText } = render(<SurveyHomepageScreen />);
  //     const mockSurvey = SurveyAdapter.list as jest.Mock;
  //     await waitFor(() => {
  //       expect(mockSurvey).toHaveBeenCalledTimes(1);
  //     });
  //     await waitFor(() => {
  //       findByText('thank you page');
  //     });
  //   });
});
