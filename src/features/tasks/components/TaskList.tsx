/**
 * TaskList Component - React 19 useOptimistic
 */

import { useOptimistic } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TaskCard } from './TaskCard';
import type { Task, TaskFilter } from '../types';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggle: (task: Task) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (state, action: { type: 'toggle' | 'delete'; task?: Task; id?: string }) => {
      switch (action.type) {
        case 'toggle':
          return state.map(t =>
            t.id === action.task?.id ? { ...t, completed: !t.completed } : t
          );
        case 'delete':
          return state.filter(t => t.id !== action.id);
        default:
          return state;
      }
    }
  );

  const filteredTasks = optimisticTasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleToggle = async (task: Task) => {
    updateOptimisticTasks({ type: 'toggle', task });
    await onToggle(task);
  };

  const handleDelete = async (id: string) => {
    updateOptimisticTasks({ type: 'delete', id });
    await onDelete(id);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="text-white/40 text-lg">
          {filter === 'active' && 'No active tasks'}
          {filter === 'completed' && 'No completed tasks'}
          {filter === 'all' && 'No tasks yet. Create one to get started!'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
