import type { Todo } from '../types/todo';
import { cn } from '../lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border transition-all duration-200',
        todo.completed
          ? 'bg-slate-700/50 border-slate-600'
          : 'bg-slate-700 border-slate-600 hover:border-slate-500'
      )}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 rounded border-slate-500 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span
        className={cn(
          'flex-1 text-lg transition-all duration-200',
          todo.completed
            ? 'text-slate-400 line-through'
            : 'text-white'
        )}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onRemove(todo.id)}
        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label={`Delete "${todo.text}"`}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
  );
}
