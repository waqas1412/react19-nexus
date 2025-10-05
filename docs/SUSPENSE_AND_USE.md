# React 19 Suspense & use() API

This document explains the implementation of React 19's enhanced Suspense capabilities and the new `use()` hook.

## Overview

React 19 introduces the `use()` hook, which allows components to read the value of a Promise or Context. Combined with Suspense, this enables powerful patterns for async data fetching and loading states.

## Key Concepts

### The use() Hook

The `use()` hook is a new primitive that can:
- Read the value of a Promise (suspends until resolved)
- Read the value of a Context
- Be called conditionally (unlike other hooks)

```typescript
import { use } from 'react';

function Component({ dataPromise }) {
  const data = use(dataPromise); // Suspends until promise resolves
  return <div>{data}</div>;
}
```

### Suspense Boundaries

Suspense boundaries catch suspended components and show fallback UI:

```typescript
<Suspense fallback={<LoadingSkeleton />}>
  <AsyncComponent dataPromise={promise} />
</Suspense>
```

## Implementation

### Data Fetching Layer

Located in `src/lib/dataFetching.ts`:

```typescript
export function fetchUserStats(): Promise<UserStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalTasks: 42,
        completedTasks: 28,
        activeProjects: 5,
        productivity: 67,
      });
    }, 1500);
  });
}
```

**Key Points:**
- Returns a Promise (not a resource)
- Can be replaced with real API calls
- Type-safe with TypeScript

### Component with use() Hook

`src/components/UserStats.tsx`:

```typescript
export function UserStats({ statsPromise }: UserStatsProps) {
  const stats = use(statsPromise); // Suspends here
  
  return (
    <div>
      {/* Render stats */}
    </div>
  );
}
```

**How it works:**
1. Component receives a Promise as prop
2. `use()` hook reads the Promise
3. If pending, component suspends
4. Nearest Suspense boundary shows fallback
5. When resolved, component renders with data

### Dashboard with Multiple Suspense Boundaries

`src/components/Dashboard.tsx`:

```typescript
export function Dashboard() {
  const statsPromise = fetchUserStats();
  const activityPromise = fetchActivityFeed();

  return (
    <>
      <Suspense fallback={<StatsLoadingSkeleton />}>
        <UserStats statsPromise={statsPromise} />
      </Suspense>

      <Suspense fallback={<ActivityLoadingSkeleton />}>
        <ActivityFeed activityPromise={activityPromise} />
      </Suspense>
    </>
  );
}
```

**Benefits:**
- Each section loads independently
- Granular loading states
- Better perceived performance
- No waterfall loading

## Patterns & Best Practices

### 1. Create Promises Outside Components

❌ **Don't:**
```typescript
function Component() {
  const promise = fetchData(); // Creates new promise on every render!
  return <Child dataPromise={promise} />;
}
```

✅ **Do:**
```typescript
function Component() {
  const [promise] = useState(() => fetchData()); // Create once
  return <Child dataPromise={promise} />;
}
```

Or pass from parent:
```typescript
function Parent() {
  const promise = fetchData();
  return <Child dataPromise={promise} />;
}
```

### 2. Use Multiple Suspense Boundaries

```typescript
// Good: Independent loading states
<Suspense fallback={<HeaderSkeleton />}>
  <Header />
</Suspense>
<Suspense fallback={<ContentSkeleton />}>
  <Content />
</Suspense>

// Bad: Everything waits for slowest component
<Suspense fallback={<FullPageSkeleton />}>
  <Header />
  <Content />
</Suspense>
```

### 3. Provide Meaningful Loading States

```typescript
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Match the shape of actual content */}
      <div className="h-8 bg-slate-600 rounded mb-2"></div>
      <div className="h-4 bg-slate-600 rounded w-2/3"></div>
    </div>
  );
}
```

### 4. Error Boundaries with Suspense

```typescript
<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
```

## Comparison: Before vs. After

### Before (React 18 with useEffect)

```typescript
function UserStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserStats()
      .then(setStats)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return <div>{stats}</div>;
}
```

### After (React 19 with use())

```typescript
function UserStats({ statsPromise }) {
  const stats = use(statsPromise);
  return <div>{stats}</div>;
}

// Usage
<Suspense fallback={<Loading />}>
  <UserStats statsPromise={fetchUserStats()} />
</Suspense>
```

**Improvements:**
- No loading state management
- No useEffect
- Automatic error handling (with Error Boundary)
- Better code splitting
- Server-side rendering compatible

## Advanced Patterns

### Conditional use() Calls

Unlike other hooks, `use()` can be called conditionally:

```typescript
function Component({ dataPromise, useCache }) {
  let data;
  
  if (useCache) {
    data = getCachedData();
  } else {
    data = use(dataPromise); // Conditional!
  }
  
  return <div>{data}</div>;
}
```

### Parallel Data Fetching

```typescript
function Dashboard() {
  // Start all fetches in parallel
  const statsPromise = fetchStats();
  const activityPromise = fetchActivity();
  const notificationsPromise = fetchNotifications();

  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <Stats statsPromise={statsPromise} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Activity activityPromise={activityPromise} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Notifications notificationsPromise={notificationsPromise} />
      </Suspense>
    </>
  );
}
```

### Resource Pattern (Optional)

For more complex scenarios, you can create resources:

```typescript
export function createResource<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (err) => {
      status = 'error';
      throw err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    },
  };
}
```

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Components only render, fetching is separate
- **Dependency Inversion**: Components depend on Promise interface

### Scalability
- Easy to add caching layer
- Simple to implement retry logic
- Works with any async data source

### Reliability
- Automatic error propagation
- Consistent loading states
- Type-safe data flow

## Performance Considerations

### Avoid Waterfall Loading

❌ **Bad:**
```typescript
function Parent() {
  const user = use(fetchUser());
  return <Child userId={user.id} />; // Child can't start until user loads
}

function Child({ userId }) {
  const posts = use(fetchPosts(userId));
  return <div>{posts}</div>;
}
```

✅ **Good:**
```typescript
function Parent() {
  const userPromise = fetchUser();
  const user = use(userPromise);
  const postsPromise = fetchPosts(user.id); // Start immediately
  
  return <Child postsPromise={postsPromise} />;
}
```

### Preload Data

```typescript
// Start loading before component mounts
const statsPromise = fetchUserStats();

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserStats statsPromise={statsPromise} />
    </Suspense>
  );
}
```

## Related Files

- `src/lib/dataFetching.ts` - Data fetching utilities
- `src/components/UserStats.tsx` - use() with single Promise
- `src/components/ActivityFeed.tsx` - use() with array data
- `src/components/Dashboard.tsx` - Multiple Suspense boundaries

## Further Reading

- [React use() Hook Documentation](https://react.dev/reference/react/use)
- [Suspense Documentation](https://react.dev/reference/react/Suspense)
- [Data Fetching with Suspense](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks)
