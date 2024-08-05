import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '@/app/(user)/Invite/page';
import { jest } from '@jest/globals';

// Mock fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}), // Mock the json method if it's used
    })
) as jest.Mock;

describe('Page Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with initial state', () => {
        render(<Page />);

        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    it('updates form fields correctly', () => {
        render(<Page />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
    });

    it('handles form submission correctly', async () => {
        render(<Page />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const submitButton = screen.getByText('Send');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        fireEvent.click(submitButton);

        // Await for fetch call to be made
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith('/api/mail', expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
            }));
        });
    });

    it('shows loading state during form submission', async () => {
        render(<Page />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
        const submitButton = screen.getByText('Send');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        fireEvent.click(submitButton);

        // Await for loading state to be shown
        await waitFor(() => {
            expect(screen.getByText('Please Wait')).toBeInTheDocument();
        });
    });

});
