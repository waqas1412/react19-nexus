/**
 * Task Service - React 19 Server Actions
 * Demonstrates Actions API with async operations
 */

import type { Task } from '../types';
import { eventBus, Events } from '../../../shared/utils/eventBus';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a new task
 */
export async function createTask(title: string, description?: string): Promise<Task> {
  await delay(500); // Simulate network request
  
  const task: Task = {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    completed: false,
    priority: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  // Emit event for other micro-frontends
  eventBus.emit(Events.TASK_CREATED, task);
  
  return task;
}

/**
 * Update a task
 */
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  await delay(300);
  
  const updatedTask: Task = {
    id,
    ...updates,
    updatedAt: Date.now(),
  } as Task;
  
  eventBus.emit(Events.TASK_UPDATED, updatedTask);
  
  return updatedTask;
}

/**
 * Toggle task completion
 */
export async function toggleTask(task: Task): Promise<Task> {
  return updateTask(task.id, { completed: !task.completed });
}

/**
 * Delete a task
 */
export async function deleteTask(id: string): Promise<void> {
  await delay(300);
  
  eventBus.emit(Events.TASK_DELETED, { id });
}

/**
 * Batch update tasks
 */
export async function batchUpdateTasks(
  taskIds: string[],
  updates: Partial<Task>
): Promise<Task[]> {
  await delay(500);
  
  return taskIds.map(id => ({
    id,
    ...updates,
    updatedAt: Date.now(),
  } as Task));
}
