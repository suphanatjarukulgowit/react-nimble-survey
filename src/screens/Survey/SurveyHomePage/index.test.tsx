import React from 'react';

import { act, screen, waitFor } from '@testing-library/react';

import { list } from 'adapters/Survey';
import { me } from 'adapters/User';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyHomepageScreen from '.';
jest.mock('adapters/Auth');
jest.mock('adapters/Survey');

const mockSurveyRender = async () => {
  renderWithRouter(<SurveyHomepageScreen />);
};

describe('SurveyHomePage', () => {
  it('displays SurveyHomepageScreen', async () => {
    mockSurveyRender();
    const surveyList = screen.getByTestId('surveyListContainer');
    await waitFor(() => {
      expect(surveyList).toBeInTheDocument();
    });
    // const loading = screen.getByTestId('loadingPage');
    // // const thankyouPage = screen.getByTestId('thankYouPage');
    // await waitFor(() => {
    //   expect(list).toHaveBeenCalled();
    // });
    // expect(loading).toBeVisible();
    // await waitFor(() => {
    //   expect(loading).not.toBeInTheDocument();
    // });
    // await waitFor(() => {
    //   expect(thankyouPage).not.toBeInTheDocument();
  });

  // const surveyList = screen.getByTestId('surveyListContainer');
  // expect(surveyList).toBeVisible();
  // await waitFor(() => expect(surveyScreen).toBeVisible());
  // });
  // it('should fetch user api', async () => {
  //   renderWithRouter(<SurveyHomepageScreen />);
  //   const mockUser = jest.fn(() => Promise.resolve());
  //   mockUser.mockResolvedValue(Promise.resolve());

  //   act(async () => {
  //     renderWithRouter(<SurveyHomepageScreen />);
  //   });
  //   await waitFor(() => {
  //     expect(me).toHaveBeenCalledTimes(1);
  //   });
  // });
});
