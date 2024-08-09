import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgressBar from '@/components/progressBar';

describe('ProgressBar Component', () => {
  test('renders with correct width based on value prop', () => {
    const value = 50;
    render(<ProgressBar value={value} />);
    
    const outerContainer = screen.getByTestId('progress-bar-outer');
    expect(outerContainer).toHaveClass('w-full');
    expect(outerContainer).toHaveClass('bg-secondary');
    expect(outerContainer).toHaveClass('rounded-full');
    expect(outerContainer).toHaveClass('h-2.5');

    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveClass('bg-primary');
    expect(innerBar).toHaveClass('h-2.5');
    expect(innerBar).toHaveStyle(`width: ${value}%`); // Verify the width style
  });

  test('renders with 0% width when value is 0', () => {
    const value = 0;
    render(<ProgressBar value={value} />);
    
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveStyle('width: 0%');
  });

  test('renders with 100% width when value is 100', () => {
    const value = 100;
    render(<ProgressBar value={value} />);
    
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar).toHaveStyle('width: 100%');
  });
});
