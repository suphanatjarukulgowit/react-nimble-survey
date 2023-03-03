import React from 'react';

import { render, screen } from '@testing-library/react';

import SurveyLoading from '.';

const SurveyLoadingDataTestIds = {
  avatarLoader: 'avatarLoader',
  dateLoader: 'dateLoader',
  dateTodayLoader: 'dateTodayLoader',
  surveyListLoader: 'surveyListLoader',
  surveyLinkLoader: 'surveyLinkLoader',
  surveyTitleLoader: 'surveyTitleLoader',
  surveyDescriptionLoader: 'surveyDescriptionLoader',
};

describe('SurveyLoading', () => {
  it('renders all loader correctly', async () => {
    render(<SurveyLoading />);
    const avatarLoader = screen.getByTestId(SurveyLoadingDataTestIds.avatarLoader);
    const dateLoader = screen.getByTestId(SurveyLoadingDataTestIds.dateLoader);
    const dateTodayLoader = screen.getByTestId(SurveyLoadingDataTestIds.dateTodayLoader);
    const surveyListLoader = screen.getByTestId(SurveyLoadingDataTestIds.surveyListLoader);
    const surveyLinkLoader = screen.getByTestId(SurveyLoadingDataTestIds.surveyLinkLoader);
    const surveyTitleLoader = screen.getByTestId(SurveyLoadingDataTestIds.surveyTitleLoader);
    const surveyDescriptionLoader = screen.getByTestId(SurveyLoadingDataTestIds.surveyDescriptionLoader);
    expect(avatarLoader).toBeVisible;
    expect(dateLoader).toBeVisible;
    expect(dateTodayLoader).toBeVisible;
    expect(surveyListLoader).toBeVisible;
    expect(surveyLinkLoader).toBeVisible;
    expect(surveyTitleLoader).toBeVisible;
    expect(surveyDescriptionLoader).toBeVisible;
  });
});
