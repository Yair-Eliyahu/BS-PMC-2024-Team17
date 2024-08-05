import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

describe('Card Component', () => {
  test('renders Card with default styles', () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm');
  });

  test('renders CardHeader with default styles', () => {
    render(<CardHeader>Card Header</CardHeader>);

    const cardHeader = screen.getByText('Card Header');
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  test('renders CardFooter with default styles', () => {
    render(<CardFooter>Card Footer</CardFooter>);

    const cardFooter = screen.getByText('Card Footer');
    expect(cardFooter).toBeInTheDocument();
    expect(cardFooter).toHaveClass('flex items-center p-6 pt-0');
  });

  test('renders CardTitle with default styles', () => {
    render(<CardTitle>Card Title</CardTitle>);

    const cardTitle = screen.getByText('Card Title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
  });

  test('renders CardDescription with default styles', () => {
    render(<CardDescription>Card Description</CardDescription>);

    const cardDescription = screen.getByText('Card Description');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveClass('text-sm text-muted-foreground');
  });

  test('renders CardContent with default styles', () => {
    render(<CardContent>Card Content</CardContent>);

    const cardContent = screen.getByText('Card Content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveClass('p-6 pt-0');
  });

  test('renders Card with custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>);

    const card = screen.getByText('Custom Card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('custom-class');
  });

  test('renders CardHeader with custom className', () => {
    render(<CardHeader className="custom-class">Custom Header</CardHeader>);

    const cardHeader = screen.getByText('Custom Header');
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveClass('custom-class');
  });

  test('renders CardFooter with custom className', () => {
    render(<CardFooter className="custom-class">Custom Footer</CardFooter>);

    const cardFooter = screen.getByText('Custom Footer');
    expect(cardFooter).toBeInTheDocument();
    expect(cardFooter).toHaveClass('custom-class');
  });

  test('renders CardTitle with custom className', () => {
    render(<CardTitle className="custom-class">Custom Title</CardTitle>);

    const cardTitle = screen.getByText('Custom Title');
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveClass('custom-class');
  });

  test('renders CardDescription with custom className', () => {
    render(<CardDescription className="custom-class">Custom Description</CardDescription>);

    const cardDescription = screen.getByText('Custom Description');
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveClass('custom-class');
  });

  test('renders CardContent with custom className', () => {
    render(<CardContent className="custom-class">Custom Content</CardContent>);

    const cardContent = screen.getByText('Custom Content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveClass('custom-class');
  });
});
