import React from 'react';

import { render, screen } from '@testing-library/react';

const skeletonLoaderDataTestId = 'skeletonLoader';

import SkeletonLoader from '.';
describe('SurveyList', () => {
  it('renders width and height correctly', async () => {
    render(<SkeletonLoader dataTestId="skeletonLoader" width={25} height={25} />);
    const s = screen.getByTestId(skeletonLoaderDataTestId);
    expect(s).toBeVisible();
    expect(s).toHaveStyle('width:25px;');
    expect(s).toHaveStyle('height:25px;');
  });
});
