import { TodoFilter } from '../types/todo';
import { cn } from '../lib/utils';

interface TodoFiltersProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const filters: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({ currentFilter, onFilterChange, counts }: TodoFiltersProps) {
  return (
    <div className="flex gap-2 border-b border-slate-700 pb-4">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
            currentFilter === value
              ? 'bg-primary-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          )}
          aria-pressed={currentFilter === value}
          aria-label={`Show ${label.toLowerCase()} tasks (${counts[value]})`}
        >
          {label}
          <span className="ml-2 text-sm opacity-75">
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  );
}
