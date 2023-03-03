import React from 'react';

import { render, screen } from '@testing-library/react';

import SurveyBlankState from '.';
const surveyBlankStateTestIds = {
  blankStateContainer: 'blankStateContainer',
  emoji: 'blankStateEmoji',
  description: 'blankStateDescription',
  todayContainer: 'todayContainer',
  blankState: 'blankState',
};

describe('SurveyBlankState', () => {
  it('renders today date', async () => {
    render(<SurveyBlankState emoji={'😎'} description={'testDescription'} />);

    const today = screen.getByTestId(surveyBlankStateTestIds.todayContainer);

    expect(today).toBeVisible();
  });

  it('renders blank state', async () => {
    render(<SurveyBlankState emoji={'😎'} description={'testDescription'} />);

    const blankState = screen.getByTestId(surveyBlankStateTestIds.blankState);
    const emoji = screen.getByTestId(surveyBlankStateTestIds.todayContainer);
    const description = screen.getByTestId(surveyBlankStateTestIds.todayContainer);

    expect(blankState).toBeVisible();
    expect(emoji).toBeVisible();
    expect(description).toBeVisible();
  });

  it('renders correct discription', async () => {
    render(<SurveyBlankState emoji={'😎'} description={'testDescription'} />);

    const description = screen.getByText('testDescription');

    expect(description).toBeInTheDocument();
  });

  it('renders correct emoji', async () => {
    render(<SurveyBlankState emoji={'😎'} description={'testDescription'} />);

    const emoji = screen.getByText('😎');

    expect(emoji).toBeInTheDocument();
  });
});
