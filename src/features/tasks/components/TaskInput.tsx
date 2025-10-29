/**
 * TaskInput Component - React 19 useActionState
 */

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import type { Task } from '../types';

interface TaskInputProps {
  onTaskCreated: (task: Task) => void;
  createAction: (title: string) => Promise<Task>;
}

interface FormState {
  error?: string;
  success?: boolean;
}

export function TaskInput({ onTaskCreated, createAction }: TaskInputProps) {
  const [state, submitAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      const title = formData.get('title') as string;
      
      if (!title.trim()) {
        return { error: 'Task title is required' };
      }

      try {
        const task = await createAction(title.trim());
        onTaskCreated(task);
        return { success: true };
      } catch {
        return { error: 'Failed to create task' };
      }
    },
    { success: false }
  );

  return (
    <motion.form
      action={submitAction}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            disabled={isPending}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            autoComplete="off"
          />
          {state.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mt-2"
            >
              {state.error}
            </motion.p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-neon px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding...
            </span>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </motion.form>
  );
}
