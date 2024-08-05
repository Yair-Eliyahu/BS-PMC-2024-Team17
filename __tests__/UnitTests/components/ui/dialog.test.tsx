import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, 
  DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import '@testing-library/jest-dom';

describe('Dialog Component', () => {
  test('renders Dialog and opens/closes correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Footer Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText('Open Dialog');
    fireEvent.click(trigger);

    const title = screen.getByText('Dialog Title');
    const description = screen.getByText('Dialog Description');
    const footerButton = screen.getByText('Footer Button');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(footerButton).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(title).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
    expect(footerButton).not.toBeInTheDocument();
  });

  test('applies custom className correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogHeader className="header-class">
            <DialogTitle className="title-class">Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription className="description-class">Dialog Description</DialogDescription>
          <DialogFooter className="footer-class">
            <button>Footer Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText('Open Dialog');
    fireEvent.click(trigger);

    const content = screen.getByRole('dialog');
    const header = screen.getByText('Dialog Title').closest('div');
    const title = screen.getByText('Dialog Title');
    const description = screen.getByText('Dialog Description');
    const footer = screen.getByText('Footer Button').closest('div');

    expect(content).toHaveClass('custom-class');
    expect(header).toHaveClass('header-class');
    expect(title).toHaveClass('title-class');
    expect(description).toHaveClass('description-class');
    expect(footer).toHaveClass('footer-class');
  });
});
