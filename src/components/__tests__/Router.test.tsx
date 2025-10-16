import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from '../Router';

describe('Router', () => {
  const mockRoutes = [
    {
      path: 'home' as const,
      title: 'Home',
      description: 'Home page',
      keywords: 'home',
      component: <div>Home Content</div>,
    },
    {
      path: 'about' as const,
      title: 'About',
      description: 'About page',
      keywords: 'about',
      component: <div>About Content</div>,
    },
  ];

  it('renders default route', () => {
    render(<Router routes={mockRoutes} defaultRoute="home" />);
    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });

  it('switches routes', () => {
    render(<Router routes={mockRoutes} defaultRoute="home" />);
    
    expect(screen.getByText('Home Content')).toBeInTheDocument();

    // Click About button
    fireEvent.click(screen.getByRole('button', { name: /about/i }));

    expect(screen.getByText('About Content')).toBeInTheDocument();
    expect(screen.queryByText('Home Content')).not.toBeInTheDocument();
  });

  it('highlights active route', () => {
    render(<Router routes={mockRoutes} defaultRoute="home" />);
    
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toHaveClass('bg-primary-600');

    fireEvent.click(screen.getByRole('button', { name: /about/i }));

    const aboutButton = screen.getByRole('button', { name: /about/i });
    expect(aboutButton).toHaveClass('bg-primary-600');
    expect(homeButton).not.toHaveClass('bg-primary-600');
  });
});
