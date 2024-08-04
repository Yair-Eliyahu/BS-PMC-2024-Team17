// __tests__/components/SwitchMode.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SwitchMode from "@/components/switchMode"; // Adjust the import path as necessary

// Mock localStorage and document.documentElement classList
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true
  });

  Object.defineProperty(document.documentElement, 'classList', {
    value: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    },
    writable: true
  });
});

describe('SwitchMode Component', () => {
  test('renders with correct initial mode', () => {
    // Mock localStorage to return 'dark' or 'light' mode
    (localStorage.getItem as jest.Mock).mockReturnValue('dark');

    // Mock classList.contains to return true if 'dark' is checked
    (document.documentElement.classList.contains as jest.Mock).mockImplementation(className => className === 'dark');

    render(<SwitchMode />);

    // Check if the initial state is dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
  });

  test('toggles between dark and light mode', async () => {
    // Mock localStorage to return 'light' mode initially
    (localStorage.getItem as jest.Mock).mockReturnValue('light');

    render(<SwitchMode />);

    const button = screen.getByRole('button');
    
    // Check initial button text
    expect(button).toHaveTextContent('Dark Mode');
    
    // Click the button to toggle the mode
    fireEvent.click(button);

    // Check if the text and localStorage have updated correctly
    await waitFor(() => {
      expect(button).toHaveTextContent('Light Mode');
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    // Click the button again to toggle back
    fireEvent.click(button);

    // Check if the text and localStorage have updated correctly
    await waitFor(() => {
      expect(button).toHaveTextContent('Dark Mode');
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
    });
  });

  test('does not render until mounted', () => {
    // Mock localStorage to return 'light' mode initially
    (localStorage.getItem as jest.Mock).mockReturnValue('light');

    const { container } = render(<SwitchMode />);

    // Wait for the component to finish mounting and check the button appears
    waitFor(() => {
      expect(container.querySelector('button')).not.toBeNull();
    });
  });
});
