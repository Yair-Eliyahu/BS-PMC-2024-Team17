import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

  test('redirects to login if no userId is provided', async () => {
    render(<SubscribeBtn price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  test('handles checkout process correctly when userId is provided', async () => {
    // Mock fetch response with a proper JSON
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ sessionId: 'test-session-id' }),
    });
  
    render(<SubscribeBtn userId="user123" price="10" />);
    const button = screen.getByText('Upgrade Your Plan');
    
    act(() => {
      fireEvent.click(button);
    });
  
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
    
    // Trigger click event
    act(() => {
      fireEvent.click(button);
    });

    // Check if button is disabled and loading state is shown
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(screen.getByText('Please Wait')).toBeInTheDocument();
    });
  });
});
