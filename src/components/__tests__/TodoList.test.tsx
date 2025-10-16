import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../TodoList';

describe('TodoList', () => {
  it('renders empty state', () => {
    render(<TodoList />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('toggles todo completion', () => {
    render(<TodoList />);
    
    // Add a todo
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Toggle it
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('removes a todo', () => {
    render(<TodoList />);
    
    // Add a todo
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Remove it
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test task')).not.toBeInTheDocument();
  });

  it('filters todos', () => {
    render(<TodoList />);
    
    // Add two todos
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    
    fireEvent.change(input, { target: { value: 'Active task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    fireEvent.change(input, { target: { value: 'Completed task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    // Complete the second one (index 0 since they're added to the beginning)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Filter to active - should show only Active task
    fireEvent.click(screen.getByRole('button', { name: /show active tasks/i }));
    
    expect(screen.queryByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Completed task')).not.toBeInTheDocument();
  });

  it('shows correct counts', () => {
    render(<TodoList />);
    
    // Add todos
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/2 active/i)).toBeInTheDocument();
    expect(screen.getByText(/0 completed/i)).toBeInTheDocument();
  });
});
