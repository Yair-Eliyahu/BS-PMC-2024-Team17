// App.test.js
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders the heading', () => {
  render(<Home />);
  const headingElement = screen.getByText(/Team 17 Sami Quizzer AI👋/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders the description', () => {
  render(<Home />);
  const descriptionElement = screen.getByText(/Your go-to AI for quizzes and learning./i);
  expect(descriptionElement).toBeInTheDocument();
});

test('renders the Get Started button', () => {
  render(<Home />);
  const buttonElement = screen.getByRole('button', { name: /Get Started/i });
  expect(buttonElement).toBeInTheDocument();
});
