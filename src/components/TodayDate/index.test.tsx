import React from 'react';

import { render, screen } from '@testing-library/react';

import TodayDate, { todayDateTestIds } from '.';
import { mockCurrentDate, resetMockCurrentDate } from '../../tests/mockCurrentDate';

describe('TodayDate', () => {
  it('displays the current date', () => {
    const now = Date.parse('2022-09-29T04:15:27.898Z');
    mockCurrentDate(now);

    render(<TodayDate />);

    const date = screen.getByTestId(todayDateTestIds.date);

    expect(date).toBeVisible();
    expect(date).toHaveTextContent('Thursday, September 29');

    resetMockCurrentDate();
  });

  it('displays the today title', () => {
    render(<TodayDate />);

    const title = screen.getByTestId(todayDateTestIds.title);

    expect(title).toBeVisible();
    expect(title).toHaveTextContent('survey.today');
  });
});
