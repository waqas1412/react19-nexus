import { useState } from 'react';
import type { Todo, TodoFilter } from '../types/todo';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import { TodoFilters } from './TodoFilters';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Tasks</h2>
        <p className="text-slate-400">
          {activeCount} active • {completedCount} completed
        </p>
      </div>

      <TodoInput onAdd={addTodo} />

      <TodoFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={{ all: todos.length, active: activeCount, completed: completedCount }}
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
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
