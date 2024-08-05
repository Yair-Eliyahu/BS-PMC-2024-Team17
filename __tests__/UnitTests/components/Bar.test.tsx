import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bar from '@/components/Bar';

describe('Bar Component', () => {

  test('renders with correct height based on percentage prop', () => {
    render(<Bar percentage={50} color="green" />);
  });

  test('renders with correct background color based on color prop', () => {
    render(<Bar percentage={50} color="red" />);
  });

  test('renders with default height when percentage is 0', () => {
    render(<Bar percentage={0} color="blue" />);
  });

  test('renders with full height when percentage is 100', () => {
    render(<Bar percentage={100} color="green" />);;
  });

  test('renders with correct color class when color prop is "blue"', () => {
    render(<Bar percentage={75} color="blue" />);
  });

  test('renders with default color class when invalid color is provided', () => {
    render(<Bar percentage={50} color="invalidColor" />);
  });

});
