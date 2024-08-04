import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubscribeBtn from '@/app/(user)/billing/SubscribeBtn';
import { getStripe } from '@/lib/stripe-client';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/lib/stripe-client', () => ({
  getStripe: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mocks
const mockPush = jest.fn();
const mockRedirectToCheckout = jest.fn();
const mockGetStripe = getStripe as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('SubscribeBtn', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRedirectToCheckout.mockClear();
    mockGetStripe.mockResolvedValue({ redirectToCheckout: mockRedirectToCheckout });
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  test('redirects to login if no userId is provided', () => {
    render(<SubscribeBtn price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  test('handles checkout process correctly when userId is provided', async () => {
    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ sessionId: 'test-session-id' }),
    });

    render(<SubscribeBtn userId="user123" price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    fireEvent.click(button);

    // Wait for the checkout redirect to be called
    await waitFor(() => {
      expect(mockGetStripe).toHaveBeenCalled();
      expect(mockRedirectToCheckout).toHaveBeenCalledWith({ sessionId: 'test-session-id' });
    });
  });

  test('disables button and shows loading state during checkout', async () => {
    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ sessionId: 'test-session-id' }),
    });

    render(<SubscribeBtn userId="user123" price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByText('Please Wait')).toBeInTheDocument();
    
  });

  test('handles errors during checkout gracefully', async () => {
    // Mock fetch to throw an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Checkout error'));

    render(<SubscribeBtn userId="user123" price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(screen.getByText('Upgrade Your Plan')).toBeInTheDocument();
    });
  });
});
