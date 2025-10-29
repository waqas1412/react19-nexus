/**
 * TaskCard Component - Futuristic glassmorphism design
 */

import { motion } from 'framer-motion';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  isPending?: boolean;
}

export function TaskCard({ task, onToggle, onDelete, isPending }: TaskCardProps) {
  const priorityColors = {
    low: 'border-green-400/30 hover:border-green-400/50',
    medium: 'border-cyan-400/30 hover:border-cyan-400/50',
    high: 'border-pink-400/30 hover:border-pink-400/50',
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card-hover p-4 ${priorityColors[task.priority]} ${
        isPending ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task)}
          disabled={isPending}
          className={`relative w-6 h-6 rounded border-2 transition-all duration-300 flex-shrink-0 mt-1
            ${task.completed 
              ? 'bg-gradient-to-br from-cyan-400 to-purple-600 border-cyan-400' 
              : 'border-white/30 hover:border-cyan-400'
            }
            ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {task.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold transition-all duration-300 ${
              task.completed
                ? 'line-through text-white/40'
                : 'text-white'
            }`}
          >
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-sm text-white/60 mt-1">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2">
            {/* Priority badge */}
            <span
              className={`text-xs px-2 py-1 rounded-full bg-white/10 border ${
                task.priority === 'high'
                  ? 'border-pink-400/50 text-pink-400'
                  : task.priority === 'medium'
                  ? 'border-cyan-400/50 text-cyan-400'
                  : 'border-green-400/50 text-green-400'
              }`}
            >
              {task.priority}
            </span>

            {/* Timestamp */}
            <span className="text-xs text-white/40">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)}
          disabled={isPending}
          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 transition-all duration-300 flex-shrink-0"
        >
          <svg
            className="w-5 h-5 text-white/60 hover:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
