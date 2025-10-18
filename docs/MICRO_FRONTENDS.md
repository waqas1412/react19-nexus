# Micro-Frontend Architecture

This document explains the micro-frontend architecture patterns demonstrated in this React 19 showcase.

## Overview

Micro-frontends extend the concept of microservices to the frontend, allowing teams to work independently on different parts of an application.

## Architecture Patterns

### 1. Component-Based Micro-Frontends

Each feature is a self-contained component that can be developed, tested, and deployed independently.

```
react19-showcase/
├── src/
│   ├── features/
│   │   ├── todos/           # Todo micro-frontend
│   │   │   ├── components/
│   │   │   ├── actions/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── dashboard/       # Dashboard micro-frontend
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── index.ts
│   │   └── resources/       # Resources micro-frontend
│   │       ├── components/
│   │       └── index.ts
│   └── shell/               # Application shell
│       ├── Layout.tsx
│       ├── Router.tsx
│       └── App.tsx
```

### 2. Key Principles

**Independence:**
```typescript
// Each micro-frontend is self-contained
export const TodoFeature = {
  Component: TodoList,
  routes: [
    { path: '/todos', component: TodoList },
  ],
  actions: {
    add: addTodoAction,
    toggle: toggleTodoAction,
    remove: removeTodoAction,
  },
};
```

**Isolation:**
```typescript
// Features don't directly depend on each other
// Communication through events or shared state
import { EventBus } from '@/shell/EventBus';

// Feature A
EventBus.emit('todo:added', { id: '123', text: 'New task' });

// Feature B
EventBus.on('todo:added', (todo) => {
  console.log('Todo added:', todo);
});
```

**Composition:**
```typescript
// Shell composes micro-frontends
function App() {
  return (
    <Shell>
      <Router>
        <Route path="/todos" component={TodoFeature.Component} />
        <Route path="/dashboard" component={DashboardFeature.Component} />
      </Router>
    </Shell>
  );
}
```

## Implementation Strategies

### Strategy 1: Build-Time Integration

Features are integrated during the build process.

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      input: {
        main: './src/main.tsx',
        todos: './src/features/todos/index.ts',
        dashboard: './src/features/dashboard/index.ts',
      },
    },
  },
};
```

**Pros:**
- Simple setup
- Type safety
- Shared dependencies
- Fast runtime

**Cons:**
- Requires rebuild for updates
- Tight coupling at build time

### Strategy 2: Runtime Integration

Features are loaded at runtime using dynamic imports.

```typescript
// Lazy load micro-frontends
const TodoFeature = lazy(() => import('./features/todos'));
const DashboardFeature = lazy(() => import('./features/dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Route path="/todos" component={TodoFeature} />
        <Route path="/dashboard" component={DashboardFeature} />
      </Router>
    </Suspense>
  );
}
```

**Pros:**
- Independent deployment
- Code splitting
- Faster initial load

**Cons:**
- Runtime overhead
- Potential version conflicts

### Strategy 3: Module Federation

Using Webpack Module Federation or Vite Federation.

```typescript
// vite.config.ts (with @originjs/vite-plugin-federation)
import federation from '@originjs/vite-plugin-federation';

export default {
  plugins: [
    federation({
      name: 'host',
      remotes: {
        todoApp: 'http://localhost:5001/assets/remoteEntry.js',
        dashboardApp: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};
```

**Pros:**
- True independence
- Separate deployments
- Shared dependencies

**Cons:**
- Complex setup
- Network overhead
- Version management

## Communication Patterns

### 1. Event Bus

```typescript
// EventBus.ts
type EventCallback = (data: any) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  off(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      this.events.set(
        event,
        callbacks.filter((cb) => cb !== callback)
      );
    }
  }

  emit(event: string, data?: any) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

export const eventBus = new EventBus();
```

### 2. Shared State

```typescript
// Using Zustand for shared state
import { create } from 'zustand';

interface SharedStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useSharedStore = create<SharedStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// In any micro-frontend
function TodoFeature() {
  const user = useSharedStore((state) => state.user);
  return <div>Hello, {user?.name}</div>;
}
```

### 3. Props Drilling

```typescript
// Shell passes data to micro-frontends
function Shell() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <TodoFeature user={user} />
      <DashboardFeature user={user} />
    </>
  );
}
```

## Best Practices

### 1. Clear Boundaries

```typescript
// Good: Clear feature boundaries
features/
├── todos/
│   ├── components/
│   ├── actions/
│   └── index.ts (public API)
├── dashboard/
│   ├── components/
│   ├── lib/
│   └── index.ts (public API)

// Bad: Shared components between features
features/
├── shared/  // ❌ Creates coupling
```

### 2. Versioned APIs

```typescript
// Feature exports versioned API
export const TodoFeatureV1 = {
  version: '1.0.0',
  Component: TodoList,
  actions: { ... },
};

export const TodoFeatureV2 = {
  version: '2.0.0',
  Component: TodoListEnhanced,
  actions: { ... },
};
```

### 3. Error Boundaries

```typescript
// Isolate failures
function App() {
  return (
    <>
      <ErrorBoundary fallback={<TodoError />}>
        <TodoFeature />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<DashboardError />}>
        <DashboardFeature />
      </ErrorBoundary>
    </>
  );
}
```

### 4. Performance Optimization

```typescript
// Code splitting
const TodoFeature = lazy(() => 
  import(/* webpackChunkName: "todos" */ './features/todos')
);

// Preload on hover
<Link
  to="/todos"
  onMouseEnter={() => import('./features/todos')}
>
  Todos
</Link>
```

## Testing Strategy

### Unit Tests

```typescript
// Test features in isolation
describe('TodoFeature', () => {
  it('renders todo list', () => {
    render(<TodoFeature />);
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// Test feature integration
describe('App Integration', () => {
  it('navigates between features', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText(/dashboard/i));
    expect(screen.getByText(/user stats/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/todos/i));
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
// Test full user flows
test('user can create todo and see it in dashboard', async () => {
  await page.goto('/todos');
  await page.fill('[placeholder="What needs to be done?"]', 'Test task');
  await page.click('button:has-text("Add")');
  
  await page.goto('/dashboard');
  await expect(page.locator('text=1 task')).toBeVisible();
});
```

## Deployment Strategies

### 1. Monorepo

```bash
# All features in one repository
pnpm install
pnpm build
pnpm deploy
```

**Pros:**
- Atomic changes
- Shared tooling
- Easy refactoring

**Cons:**
- Large codebase
- Slower CI/CD

### 2. Multi-Repo

```bash
# Each feature in separate repository
cd todos-feature && pnpm deploy
cd dashboard-feature && pnpm deploy
cd shell && pnpm deploy
```

**Pros:**
- Independent releases
- Team autonomy
- Smaller codebases

**Cons:**
- Coordination overhead
- Duplicate tooling

### 3. Hybrid

```bash
# Core in monorepo, features in separate repos
# Monorepo
cd core && pnpm deploy

# Feature repos
cd ../todos-feature && pnpm deploy
cd ../dashboard-feature && pnpm deploy
```

## Scalability Benefits

### Team Scalability

- **Parallel development** - Teams work independently
- **Clear ownership** - Each team owns a feature
- **Reduced conflicts** - Fewer merge conflicts

### Technical Scalability

- **Code splitting** - Smaller bundles
- **Lazy loading** - Faster initial load
- **Independent deployment** - Deploy features separately

### Organizational Scalability

- **Technology diversity** - Different tech stacks per feature
- **Gradual migration** - Migrate features incrementally
- **A/B testing** - Test features independently

## SOLID Principles

### Single Responsibility

Each micro-frontend has one clear purpose.

### Open/Closed

Features are open for extension, closed for modification.

### Liskov Substitution

Features can be swapped without breaking the app.

### Interface Segregation

Features expose minimal, focused APIs.

### Dependency Inversion

Features depend on abstractions, not implementations.

## DRY Principle

### Shared Libraries

```typescript
// Shared utilities in separate package
@react19-showcase/utils
├── formatDate.ts
├── validateEmail.ts
└── index.ts

// Features import shared utilities
import { formatDate } from '@react19-showcase/utils';
```

### Avoid Duplication

```typescript
// Good: Reusable components in shell
<Shell>
  <Button /> {/* Shared component */}
  <TodoFeature />
</Shell>

// Bad: Duplicate components in features
<TodoFeature>
  <Button /> {/* Duplicated */}
</TodoFeature>
```

## Current Implementation

This showcase demonstrates micro-frontend concepts through:

1. **Feature Organization** - Components grouped by feature
2. **Lazy Loading** - Routes loaded on demand
3. **Error Boundaries** - Isolated error handling
4. **Shared State** - Router manages navigation
5. **Code Splitting** - Vite automatic splitting

## Future Enhancements

- [ ] Module Federation setup
- [ ] Feature flags
- [ ] A/B testing framework
- [ ] Performance monitoring
- [ ] Feature versioning

## Resources

- [Micro Frontends](https://micro-frontends.org/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Single-SPA](https://single-spa.js.org/)
- [Nx Monorepo](https://nx.dev/)

## Conclusion

Micro-frontends enable:
- **Scalability** - Grow teams and codebase
- **Flexibility** - Choose best tools per feature
- **Reliability** - Isolate failures
- **Velocity** - Deploy features independently

This architecture is ideal for large applications with multiple teams.
