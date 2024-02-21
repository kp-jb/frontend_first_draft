import { render, screen } from '@testing-library/react';

import HomePage from '@/pages/index';

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />);
    const welcomeMessage = screen.getByText(/Our Motivation/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders directions', () => {
    render(<HomePage />);
    const directionsHeader = screen.getByText(/Directions/i);
    expect(directionsHeader).toBeInTheDocument();

    const homeDirection = screen.getByText(/Home: Users can effortlessly review/i);
    expect(homeDirection).toBeInTheDocument();

    // Add similar expectations for other directions
  });

  // Add more tests as needed for other parts of the component
});