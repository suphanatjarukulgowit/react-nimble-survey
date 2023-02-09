import React from 'react';

import { render, screen } from '@testing-library/react';
import { Swiper } from 'swiper';

import { mockSurveyList } from 'tests/mockSurveyList';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyList from '.';

const onSlideChange = async (swiper: Swiper) => {};
describe('SurveyList', () => {
  it('renders correct abount of survey list', async () => {
    const { container } = renderWithRouter(<SurveyList surveys={mockSurveyList} onSlideChange={onSlideChange} />);

    const swipers = container.getElementsByClassName('survey-cover-image');
    expect(swipers[0]).toBeInTheDocument();
    expect(swipers[1]).toBeInTheDocument();
  });
});
