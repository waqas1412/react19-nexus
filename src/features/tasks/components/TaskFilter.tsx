/**
 * TaskFilter Component - Futuristic filter tabs
 */

import { motion } from 'framer-motion';
import type { TaskFilter } from '../types';

interface TaskFilterProps {
  current: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TaskFilter({ current, onChange, counts }: TaskFilterProps) {
  return (
    <div className="glass-card p-2 inline-flex gap-2">
      {filters.map(filter => {
        const isActive = current === filter.value;
        const count = counts[filter.value];

        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {filter.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
