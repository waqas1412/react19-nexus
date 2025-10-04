# React 19 Actions & Optimistic Updates

This document explains the implementation of React 19's Actions pattern, `useActionState`, and `useOptimistic` hooks in this showcase.

## Overview

React 19 introduces powerful new primitives for handling async operations and providing instant user feedback:

- **Actions**: Async functions that can be used directly in forms and event handlers
- **useActionState**: Hook for managing form state with async actions
- **useOptimistic**: Hook for optimistic UI updates while async operations are pending

## Implementation

### Actions Pattern

Actions are async functions that represent user interactions. They're defined in `src/actions/todoActions.ts`:

```typescript
export async function addTodoAction(text: string): Promise<Todo> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}
```

**Benefits:**
- Clear separation of concerns (actions vs. UI)
- Reusable across components
- Easy to test
- Type-safe with TypeScript

### useActionState Hook

Used in `TodoInputEnhanced.tsx` for form handling:

```typescript
const [state, formAction, isPending] = useActionState(
  async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const text = formData.get('todo') as string;
    // ... validation and processing
    await onAdd(trimmedText);
    return { success: true };
  },
  { success: false }
);
```

**Features:**
- Automatic form state management
- Built-in pending state
- Error handling
- Progressive enhancement (works without JS)

**Key Advantages:**
1. No need for manual `useState` for form state
2. Automatic `isPending` flag
3. Seamless integration with form elements
4. Server-side compatible

### useOptimistic Hook

Implemented in `TodoListEnhanced.tsx` for instant UI updates:

```typescript
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
    }
  }
);
```

**How it works:**
1. User performs an action (e.g., adds a todo)
2. `addOptimisticUpdate` immediately updates the UI
3. Async action runs in the background
4. When action completes, actual state updates
5. UI automatically syncs with real data

**Benefits:**
- Instant user feedback
- No loading spinners for common actions
- Automatic rollback on error (when implemented)
- Better perceived performance

## Usage Example

```typescript
const handleAddTodo = async (text: string) => {
  const optimisticTodo: Todo = {
    id: `temp-${Date.now()}`,
    text,
    completed: false,
    createdAt: Date.now(),
  };

  // Optimistic update - instant UI change
  addOptimisticUpdate({ type: 'add', todo: optimisticTodo });

  startTransition(async () => {
    try {
      // Actual async operation
      const newTodo = await addTodoAction(text);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error('Failed to add todo:', error);
      // Error handling - could revert optimistic update
    }
  });
};
```

## Best Practices

### 1. Use Temporary IDs for Optimistic Updates
```typescript
const optimisticTodo: Todo = {
  id: `temp-${Date.now()}`, // Temporary ID
  // ... other fields
};
```

### 2. Visual Feedback for Pending States
```typescript
const isOptimistic = todo.id.startsWith('temp-');
// Show loading indicator or reduced opacity
```

### 3. Error Handling
Always handle errors and consider reverting optimistic updates:
```typescript
try {
  await action();
} catch (error) {
  // Revert optimistic update or show error
}
```

### 4. Use useTransition for Non-Blocking Updates
```typescript
startTransition(async () => {
  await action();
});
```

## Comparison: Before vs. After

### Before (React 18)
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);
  
  try {
    await addTodo(text);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### After (React 19)
```typescript
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    try {
      await addTodo(formData.get('todo'));
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  },
  {}
);
```

**Improvements:**
- Less boilerplate
- Automatic state management
- Better type safety
- Progressive enhancement

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Actions handle one operation
- **Open/Closed**: Easy to extend with new actions
- **Dependency Inversion**: Components depend on action interfaces

### Scalability
- Actions can be easily moved to API calls
- Optimistic updates work the same regardless of backend
- Easy to add caching, retry logic, etc.

### Reliability
- Consistent error handling
- Automatic state synchronization
- Type-safe operations

## Related Files

- `src/actions/todoActions.ts` - Action definitions
- `src/components/TodoListEnhanced.tsx` - useOptimistic implementation
- `src/components/TodoInputEnhanced.tsx` - useActionState implementation
- `src/components/TodoItemEnhanced.tsx` - Optimistic UI feedback

## Further Reading

- [React 19 Actions RFC](https://github.com/reactjs/rfcs)
- [useOptimistic Hook Documentation](https://react.dev/reference/react/useOptimistic)
- [useActionState Hook Documentation](https://react.dev/reference/react/useActionState)
