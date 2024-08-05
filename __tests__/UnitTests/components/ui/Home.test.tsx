import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Component', () => {
  test('renders the homepage correctly', () => {
    render(<Home />);

    // Check if the heading is in the document
    expect(screen.getByText(/Get quizzes about anything!/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload documents, and easily generate quizzes with AI./i)).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByAltText('owl')).toBeInTheDocument();

    // Check if the button is rendered and has correct text
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  test('button link has correct attributes', () => {
    render(<Home />);

    // Get the link containing the button
    const link = screen.getByRole('link', { name: /Get Started/i });
    
    // Check link attributes
    expect(link).toHaveAttribute('href', '/quizz/new');
    
    // Check button attributes within the link
    const button = screen.getByRole('button', { name: /Get Started/i });
    expect(button).toHaveClass('mt-4 h-14 text-white');
  });
});
