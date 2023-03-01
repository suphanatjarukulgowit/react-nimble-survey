import React from 'react';

import { render, screen } from '@testing-library/react';

import BackgroundImage from '.';

const exampleImage = { src: 'https://www.example.com/image-large.png', alt: 'background' };

describe('BackgroundImage', () => {
  it('render the background correctly', () => {
    render(<BackgroundImage imageUrl={exampleImage.src}></BackgroundImage>);

    const bg = screen.getByRole('img');

    expect(bg).toBeVisible();
    expect(bg).toHaveAttribute('src', exampleImage.src);
    expect(bg).toHaveAttribute('alt', exampleImage.alt);
  });
});
