import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

describe('Alert Component', () => {
  test('renders Alert with default variant', () => {
    render(<Alert>Default Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Default Alert');
    expect(alert).toHaveClass('bg-background text-foreground');
  });

  test('renders Alert with destructive variant', () => {
    render(<Alert variant="destructive">Destructive Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Destructive Alert');
    expect(alert).toHaveClass('border-destructive/50 text-destructive');
  });

  test('renders AlertTitle', () => {
    render(<AlertTitle>Alert Title</AlertTitle>);

    const alertTitle = screen.getByText('Alert Title');
    expect(alertTitle).toBeInTheDocument();
    expect(alertTitle).toHaveClass('mb-1 font-medium leading-none tracking-tight');
  });

  test('renders AlertDescription', () => {
    render(<AlertDescription>Alert Description</AlertDescription>);

    const alertDescription = screen.getByText('Alert Description');
    expect(alertDescription).toBeInTheDocument();
    expect(alertDescription).toHaveClass('text-sm [&_p]:leading-relaxed');
  });

  test('renders Alert with AlertTitle and AlertDescription', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    const alertTitle = screen.getByText('Alert Title');
    const alertDescription = screen.getByText('Alert Description');

    expect(alert).toBeInTheDocument();
    expect(alertTitle).toBeInTheDocument();
    expect(alertDescription).toBeInTheDocument();
  });
});
