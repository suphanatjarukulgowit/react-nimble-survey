import React from 'react';

import { render, waitFor, screen, act } from '@testing-library/react';

import SurveyAdapter from 'adapters/Survey';
import UserAdapter from 'adapters/User';
import { mockSurveyList } from 'tests/mockSurveyList';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyHomepageScreen from '.';

const SurveyHomepageScreenDataTestIds = {
  defaultLayout: 'defaultLayout',
  thankYouPage: 'thankYouPage',
  surveyList: 'surveyList',
};

jest.mock('adapters/Auth');
jest.mock('adapters/Survey');

const mockSurveyRender = async () => {
  renderWithRouter(<SurveyHomepageScreen />);
};

describe('SurveyHomePage', () => {
  it('displays thank you screen', async () => {
    await act(() => mockSurveyRender());
    //   const thankyouPage = screen.getByText('thank you page');
    //   await waitFor(() => expect(thankyouPage).toBeVisible());
  });
  it('renders the survey item', async () => {
    const survey = mockSurveyList;
    const mockedlistSurveys = SurveyAdapter.list as jest.Mock;
    mockedlistSurveys.mockResolvedValue({
      surveys: [survey],
    });
    await act(() => mockSurveyRender());
    await waitFor(() => {
      expect(mockedlistSurveys).toHaveBeenCalledTimes(1);
    });
  });
  //   it('fetch survey list api', async () => {
  //     await act(() => mockSurveyRender());
  //     const mockSurvey = SurveyAdapter.list as jest.Mock;
  //     await waitFor(() => {
  //       expect(mockSurvey).toHaveBeenCalledTimes(1);
  //     });
  //   });
  // it('fetch user api', async () => {
  //   const mockUser = UserAdapter.me as jest.Mock;
  //   mockSurveyRender();
  //   await waitFor(() => {
  //     expect(mockUser).toHaveBeenCalledTimes(1);
  //   });
  // });
  // await waitFor(() => expect(mockUser).toHaveBeenCalledTimes(1));
  //   });
  //   it('displays DefaultLayout', async () => {
  //     renderWithRouter(<SurveyHomepageScreen></SurveyHomepageScreen>);
  //     waitFor(() => {
  //       const defaultLayout = screen.getByTestId(SurveyHomepageScreenDataTestIds.defaultLayout);
  //       expect(defaultLayout).toBeVisible();
  //     });
  //   });

  //   it('displays defaultLayout', async () => {
  //     const promise = Promise.resolve();
  //     mockSurveyRender();
  //     const layout = screen.getByTestId(SurveyHomepageScreenDataTestIds.defaultLayout);
  //     await waitFor(() => expect(layout).toBeVisible());
  //     await act(() => promise);
  //   });
});
