import React from 'react';

import { screen } from '@testing-library/react';

import { mockSurveyList } from 'tests/mockSurveyList';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyList from '.';

const surveyListDataTestIds = {
  surveyListContainer: 'surveyListContainer',
  todayContainer: 'todayContainer',
};

describe('SurveyList', () => {
  it('renders amount of survey list correctly', async () => {
    // eslint-disable-next-line
    const { container } = renderWithRouter(<SurveyList surveys={mockSurveyList} />);
    // eslint-disable-next-line
    const swipers = container.getElementsByClassName('survey-cover-image');

    expect(swipers[0]).toBeInTheDocument();
    expect(swipers[1]).toBeInTheDocument();
  });

  it('renders today date', async () => {
    renderWithRouter(<SurveyList surveys={mockSurveyList} />);

    const today = screen.getByTestId(surveyListDataTestIds.todayContainer);

    expect(today).toBeVisible();
  });

  it('renders survey container', async () => {
    renderWithRouter(<SurveyList surveys={mockSurveyList} />);

    const survey = screen.getByTestId(surveyListDataTestIds.surveyListContainer);

    expect(survey).toBeVisible();
  });
});
