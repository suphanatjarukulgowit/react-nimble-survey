import React from 'react';

import { screen, waitFor } from '@testing-library/react';

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
    const surveyScreen = screen.getByTestId('SurveyHomepageScreen');
    await waitFor(() => expect(surveyScreen).toBeVisible());
  });
});
