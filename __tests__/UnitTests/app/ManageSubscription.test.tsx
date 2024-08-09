import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageSubscription from '@/app/(user)/billing/ManageSubscription';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ url: { url: 'https://example.com' } }),
  })
) as jest.Mock;

// Mock console.log
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe('ManageSubscription', () => {
  let router: { push: jest.Mock };

  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
    router = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  test('renders button with correct text', () => {
    render(<ManageSubscription />);
    expect(screen.getByText(/Change Your Subscription/i)).toBeInTheDocument();
  });

  test('disables button and shows loading state when clicked', async () => {
    render(<ManageSubscription />);
    
    const button = screen.getByText(/Change Your Subscription/i);
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(await screen.findByText(/Please Wait/i)).toBeInTheDocument();
  });

  test('redirects to customer portal on successful API response', async () => {
    render(<ManageSubscription />);
    
    fireEvent.click(screen.getByText(/Change Your Subscription/i));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('https://example.com');
    });
  });

  test('handles error during API request', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('API request failed'))
    );

    render(<ManageSubscription />);
    
    fireEvent.click(screen.getByText(/Change Your Subscription/i));
    
    // Wait for the button to be enabled again
    await waitFor(() => {
      expect(screen.getByText(/Change Your Subscription/i)).not.toBeDisabled();
    });

    expect(console.log).toHaveBeenCalledWith('Subscribe Button Error', expect.any(Error));
  });
});
