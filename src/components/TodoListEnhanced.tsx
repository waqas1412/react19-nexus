import { useState, useOptimistic, useTransition } from 'react';
import type { Todo, TodoFilter } from '../types/todo';
import { TodoItemEnhanced } from './TodoItemEnhanced';
import { TodoInputEnhanced } from './TodoInputEnhanced';
import { TodoFilters } from './TodoFilters';
import { addTodoAction, toggleTodoAction, removeTodoAction } from '../actions/todoActions';

type OptimisticAction = 
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string };

export function TodoListEnhanced() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [isPending, startTransition] = useTransition();

  // useOptimistic for instant UI updates
  const [optimisticTodos, addOptimisticUpdate] = useOptimistic(
    todos,
    (state: Todo[], action: OptimisticAction) => {
      switch (action.type) {
        case 'add':
          return [action.todo, ...state];
        case 'toggle':
          return state.map((todo) =>
            todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
          );
        case 'remove':
          return state.filter((todo) => todo.id !== action.id);
        default:
          return state;
      }
    }
  );

  const handleAddTodo = async (text: string) => {
    const optimisticTodo: Todo = {
      id: `temp-${Date.now()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };

    // Optimistic update
    addOptimisticUpdate({ type: 'add', todo: optimisticTodo });

    startTransition(async () => {
      try {
        const newTodo = await addTodoAction(text);
        setTodos((prev) => [newTodo, ...prev]);
      } catch (error) {
        console.error('Failed to add todo:', error);
        // In a real app, you'd show an error message
      }
    });
  };

  const handleToggleTodo = async (todo: Todo) => {
    // Optimistic update
    addOptimisticUpdate({ type: 'toggle', id: todo.id });

    startTransition(async () => {
      try {
        const updatedTodo = await toggleTodoAction(todo);
        setTodos((prev) =>
          prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        );
      } catch (error) {
        console.error('Failed to toggle todo:', error);
      }
    });
  };

  const handleRemoveTodo = async (id: string) => {
    // Optimistic update
    addOptimisticUpdate({ type: 'remove', id });

    startTransition(async () => {
      try {
        await removeTodoAction(id);
        setTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Failed to remove todo:', error);
      }
    });
  };

  const filteredTodos = optimisticTodos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = optimisticTodos.filter((t) => !t.completed).length;
  const completedCount = optimisticTodos.filter((t) => t.completed).length;

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Enhanced Tasks
              <span className="ml-3 text-sm font-normal text-primary-400">
                with Actions & useOptimistic
              </span>
            </h2>
            <p className="text-slate-400">
              {activeCount} active • {completedCount} completed
              {isPending && <span className="ml-2 text-primary-400">• Syncing...</span>}
            </p>
          </div>
        </div>
      </div>

      <TodoInputEnhanced onAdd={handleAddTodo} />

      <TodoFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={{ all: optimisticTodos.length, active: activeCount, completed: completedCount }}
      />

      <div className="space-y-2 mt-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            {filter === 'all' && 'No tasks yet. Add one above!'}
            {filter === 'active' && 'No active tasks.'}
            {filter === 'completed' && 'No completed tasks.'}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItemEnhanced
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onRemove={handleRemoveTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
