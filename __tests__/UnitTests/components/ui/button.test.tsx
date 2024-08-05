import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  test('renders Button with default variant and size', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Default Button');
    expect(button).toHaveClass('bg-primary text-primary-foreground hover:bg-primary/90');
  });

  test('renders Button with destructive variant', () => {
    render(<Button variant="destructive">Destructive Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Destructive Button');
    expect(button).toHaveClass('bg-destructive text-destructive-foreground hover:bg-destructive/90');
  });

  test('renders Button with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Outline Button');
    expect(button).toHaveClass('border border-input bg-background hover:bg-accent hover:text-accent-foreground');
  });

  test('renders Button with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Secondary Button');
    expect(button).toHaveClass('bg-secondary text-secondary-foreground hover:bg-secondary/80');
  });

  test('renders Button with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Ghost Button');
    expect(button).toHaveClass('hover:bg-accent hover:text-accent-foreground');
  });

  test('renders Button with link variant', () => {
    render(<Button variant="link">Link Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Link Button');
    expect(button).toHaveClass('text-primary underline-offset-4 hover:underline');
  });

  test('renders Button with neo variant', () => {
    render(<Button variant="neo">Neo Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Neo Button');
    expect(button).toHaveClass('bg-primary text-primary-foreground border-blue-900');
  });

  test('renders Button with different sizes', () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonSmall = screen.getByRole('button');
    expect(buttonSmall).toHaveClass('h-9 rounded-md px-3');
  });
});
