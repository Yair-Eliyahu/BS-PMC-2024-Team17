import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgressBar from '@/components/progressBar';

describe('ProgressBar Component', () => {
  test('renders with correct width based on value prop', () => {
    const value = 50;
    const totalQuestions = 10; // Sample totalQuestions for testing
    render(<ProgressBar value={value} totalQuestions={totalQuestions} />);
    
    const outerContainer = screen.getByTestId('progress-bar-outer');
    expect(outerContainer).toHaveClass('w-full');
    expect(outerContainer).toHaveClass('bg-secondary');
    expect(outerContainer).toHaveClass('rounded-full');
    expect(outerContainer).toHaveClass('h-2.5');

    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveClass('bg-primary');
    expect(innerBar).toHaveClass('h-2.5');
    expect(innerBar).toHaveStyle(`width: ${value}%`); // Verify the width style

    // Check the white separator lines
    const separators = screen.getAllByTestId('progress-bar-separator');
    expect(separators).toHaveLength(totalQuestions - 1); // Should be totalQuestions - 1
    separators.forEach((separator, index) => {
      expect(separator).toHaveStyle(`left: ${(100 / totalQuestions) * (index + 1)}%`);
      expect(separator).toHaveStyle('width: 1px');
    });
  });

  test('renders with 0% width when value is 0', () => {
    const value = 0;
    const totalQuestions = 10; // Sample totalQuestions for testing
    render(<ProgressBar value={value} totalQuestions={totalQuestions} />);
    
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveStyle('width: 0%');
  });

  test('renders with 100% width when value is 100', () => {
    const value = 100;
    const totalQuestions = 10; // Sample totalQuestions for testing
    render(<ProgressBar value={value} totalQuestions={totalQuestions} />);
    
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveStyle('width: 100%');
  });
});
