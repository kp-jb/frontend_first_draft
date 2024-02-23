import { render, screen } from '@testing-library/react';

import HomePage from '@/pages/index';

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />);
    const welcomeMessage = screen.getByText(/Our Motivation/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders Home direction item correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(/Home:/i)).toBeInTheDocument();
    expect(screen.getByText(/Users can effortlessly review, edit, and delete saved records/i)).toBeInTheDocument();
  });

  test('renders direction list items', () => {
    render(<HomePage />);
    const directionItems = screen.getAllByRole('listitem');
    expect(directionItems.length).toBe(6);
  });

  
});