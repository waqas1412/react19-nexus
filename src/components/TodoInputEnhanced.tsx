import { useActionState } from 'react';

interface TodoInputEnhancedProps {
  onAdd: (text: string) => Promise<void>;
}

interface FormState {
  error?: string;
  success?: boolean;
}

export function TodoInputEnhanced({ onAdd }: TodoInputEnhancedProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const text = formData.get('todo') as string;
      const trimmedText = text?.trim();

      if (!trimmedText) {
        return { error: 'Task cannot be empty' };
      }

      try {
        await onAdd(trimmedText);
        return { success: true };
      } catch {
        return { error: 'Failed to add task' };
      }
    },
    { success: false }
  );

  return (
    <form action={formAction} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            name="todo"
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            aria-label="New task"
            aria-invalid={!!state.error}
            aria-describedby={state.error ? 'todo-error' : undefined}
            disabled={isPending}
          />
          {state.error && (
            <p id="todo-error" className="mt-1 text-sm text-red-400" role="alert">
              {state.error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}
