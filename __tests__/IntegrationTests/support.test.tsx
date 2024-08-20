import { render, screen, fireEvent } from '@testing-library/react';
import Support from '@/app/support/page'; 
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Support Page', () => {
  it('renders the support form', () => {
    render(<Support />);

    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    const router = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    render(<Support />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message.' } });

    fireEvent.click(screen.getByText('Send'));
  });

  it('shows an error message on failed submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to send message. Please try again.' }),
      })
    ) as jest.Mock;

    render(<Support />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message.' } });

    fireEvent.click(screen.getByText('Send'));

    expect(await screen.findByText('Failed to send message. Please try again.')).toBeInTheDocument();
  });
});
