import { TodoList } from '../TodoList';
import { TodoListEnhanced } from '../TodoListEnhanced';

export function TasksPage() {
  return (
    <div className="space-y-8">
      <div>
        <TodoList />
      </div>

      <div>
        <TodoListEnhanced />
      </div>
    </div>
  );
}
