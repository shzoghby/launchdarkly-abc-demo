import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App currentUser={{ key: 'user1', name: 'John Doe', office: 'New York', email: 'john.doe@example.com', title: 'Software Engineer' }} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
