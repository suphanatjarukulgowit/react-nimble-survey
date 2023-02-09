import React from 'react';

import { render, screen } from '@testing-library/react';

import Logo from '.';

const exampleImage = { src: 'logo.svg', alt: 'logo' };

describe('Logo', () => {
  it('render the background correctly', () => {
    render(<Logo></Logo>);
    const logo = screen.getByRole('img');
    expect(logo).toBeVisible();
    expect(logo).toHaveAttribute('src', exampleImage.src);
    expect(logo).toHaveAttribute('alt', exampleImage.alt);
  });
});
