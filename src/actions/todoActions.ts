import type { Todo } from '../types/todo';

/**
 * Simulates an async operation (e.g., API call) for adding a todo
 * Demonstrates React 19 Actions pattern
 */
export async function addTodoAction(text: string): Promise<Todo> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}

/**
 * Simulates an async operation for toggling a todo
 */
export async function toggleTodoAction(todo: Todo): Promise<Todo> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    ...todo,
    completed: !todo.completed,
  };
}

/**
 * Simulates an async operation for removing a todo
 */
export async function removeTodoAction(id: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return id;
}
