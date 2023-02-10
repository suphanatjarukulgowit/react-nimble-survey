import React from 'react';

import { render, screen } from '@testing-library/react';
import { Swiper } from 'swiper';

import { mockSurveyList } from 'tests/mockSurveyList';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyList from '.';

const surveyListDataTestIds = {
  surveyListContainer: 'surveyListContainer',
  todayContainer: 'todayContainer',
};

const onSlideChange = async (swiper: Swiper) => {};
describe('SurveyList', () => {
  it('renders today date', async () => {
    const { container } = renderWithRouter(<SurveyList surveys={mockSurveyList} onSlideChange={onSlideChange} />);

    const swipers = container.getElementsByClassName('survey-cover-image');
    expect(swipers[0]).toBeInTheDocument();
    expect(swipers[1]).toBeInTheDocument();
  });
  it('renders correct amount of survey list', async () => {
    renderWithRouter(<SurveyList surveys={mockSurveyList} onSlideChange={onSlideChange} />);

    const today = screen.getByTestId(surveyListDataTestIds.todayContainer);
    expect(today).toBeVisible;
  });
  it('renders survey container', async () => {
    renderWithRouter(<SurveyList surveys={mockSurveyList} onSlideChange={onSlideChange} />);

    const survey = screen.getByTestId(surveyListDataTestIds.surveyListContainer);
    expect(survey).toBeVisible;
  });
});
