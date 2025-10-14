# React 19 Advanced Features

This document covers advanced React 19 features including cacheSignal, Partial Pre-rendering, and SSR batching improvements.

## cacheSignal for RSC Data Fetching

### Overview

`cacheSignal` is a React Server Components (RSC) feature that enables efficient data caching and invalidation.

**Note:** This is primarily for React Server Components. In client-only apps (like this Vite project), we demonstrate the concept.

### Concept

```typescript
// Server Component
import { cacheSignal } from 'react';

const getUserData = cacheSignal(async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

function UserProfile({ userId }) {
  const user = use(getUserData(userId));
  return <div>{user.name}</div>;
}
```

**Benefits:**
- Automatic deduplication of identical requests
- Cache invalidation on signal
- Works across component tree
- Optimized for streaming SSR

### Cache Invalidation

```typescript
// Invalidate cache when data changes
getUserData.invalidate(userId);

// Or invalidate all
getUserData.invalidateAll();
```

## Partial Pre-rendering (PPR)

### Overview

Partial Pre-rendering allows you to pre-render parts of a page while keeping other parts dynamic.

### How It Works

```typescript
// Static shell is pre-rendered
<Layout>
  <Header /> {/* Pre-rendered */}
  
  {/* Dynamic content loads on demand */}
  <Suspense fallback={<Skeleton />}>
    <DynamicContent />
  </Suspense>
  
  <Footer /> {/* Pre-rendered */}
</Layout>
```

**Result:**
- Fast initial page load (static shell)
- Dynamic content streams in
- Best of static + dynamic

### Benefits

1. **Faster Time to First Byte (TTFB)**
   - Static parts served immediately
   - No server computation needed

2. **Better SEO**
   - Static content indexed by search engines
   - Dynamic content enhances user experience

3. **Reduced Server Load**
   - Static parts cached at CDN
   - Only dynamic parts hit server

### Configuration

```typescript
// next.config.js (for Next.js)
export default {
  experimental: {
    ppr: true,
  },
};
```

### Use Cases

- E-commerce product pages (static layout + dynamic inventory)
- Blog posts (static content + dynamic comments)
- Dashboards (static shell + dynamic data)

## SSR Batching Improvements

### Overview

React 19 improves server-side rendering with better batching of DOM operations.

### Before (React 18)

```typescript
// Multiple DOM operations
<link rel="stylesheet" href="/a.css" />
<link rel="stylesheet" href="/b.css" />
<link rel="stylesheet" href="/c.css" />

// Result: 3 separate DOM insertions
// Causes multiple reflows
```

### After (React 19)

```typescript
// Same code
<link rel="stylesheet" href="/a.css" />
<link rel="stylesheet" href="/b.css" />
<link rel="stylesheet" href="/c.css" />

// Result: Batched into single DOM operation
// Single reflow, better performance
```

### Streaming SSR

React 19 enhances streaming with:

**1. Selective Hydration**
```typescript
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>

// HeavyComponent hydrates independently
// User can interact with rest of page
```

**2. Progressive Enhancement**
```typescript
// Server sends HTML immediately
// JavaScript loads progressively
// Components become interactive as JS arrives
```

**3. Out-of-Order Streaming**
```typescript
// Fast components stream first
// Slow components stream when ready
// No blocking on slowest component
```

### Performance Metrics

| Metric | React 18 | React 19 | Improvement |
|--------|----------|----------|-------------|
| TTFB | 200ms | 120ms | 40% faster |
| FCP | 800ms | 500ms | 37% faster |
| TTI | 2000ms | 1500ms | 25% faster |
| Reflows | 15 | 3 | 80% reduction |

*Example metrics - actual results vary*

### Web Streams Support

React 19 supports native Web Streams:

```typescript
import { renderToReadableStream } from 'react-dom/server';

const stream = await renderToReadableStream(<App />);

return new Response(stream, {
  headers: {
    'Content-Type': 'text/html',
    'Transfer-Encoding': 'chunked',
  },
});
```

**Benefits:**
- Native browser API
- Better memory management
- Backpressure handling
- Cancellation support

## Comparison Table

| Feature | Client-Side | SSR | RSC |
|---------|-------------|-----|-----|
| **cacheSignal** | ❌ | ⚠️ Limited | ✅ Full support |
| **Partial Pre-rendering** | ❌ | ✅ | ✅ |
| **Streaming** | ❌ | ✅ | ✅ |
| **Selective Hydration** | ❌ | ✅ | ✅ |
| **Out-of-Order Streaming** | ❌ | ✅ | ✅ |

## Best Practices

### 1. Use PPR for Hybrid Pages

```typescript
// Good: Mix static and dynamic
<Page>
  <StaticHeader />
  <Suspense>
    <DynamicContent />
  </Suspense>
  <StaticFooter />
</Page>

// Avoid: All dynamic (no PPR benefit)
<Suspense>
  <EntirePage />
</Suspense>
```

### 2. Optimize Suspense Boundaries

```typescript
// Good: Granular boundaries
<>
  <Suspense fallback={<HeaderSkeleton />}>
    <Header />
  </Suspense>
  <Suspense fallback={<ContentSkeleton />}>
    <Content />
  </Suspense>
</>

// Bad: Single boundary (all or nothing)
<Suspense fallback={<FullPageSkeleton />}>
  <Header />
  <Content />
</Suspense>
```

### 3. Cache Strategically

```typescript
// Good: Cache expensive operations
const expensiveData = cacheSignal(async () => {
  return await complexComputation();
});

// Avoid: Cache simple operations
const simpleData = cacheSignal(async () => {
  return { value: 42 }; // Too simple to cache
});
```

### 4. Batch Resource Loading

```typescript
// Good: Group related resources
<>
  <link rel="stylesheet" href="/theme.css" precedence="high" />
  <link rel="stylesheet" href="/layout.css" precedence="high" />
  <link rel="stylesheet" href="/components.css" precedence="medium" />
</>

// React batches these automatically
```

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Each feature has clear purpose
- **Open/Closed**: Easy to extend with new patterns
- **Dependency Inversion**: Components depend on abstractions

### Scalability
- PPR scales to large pages
- Streaming handles slow data sources
- Caching reduces server load

### Reliability
- Automatic error boundaries
- Graceful degradation
- Progressive enhancement

## Migration Guide

### From React 18 to React 19

**1. Update Dependencies**
```bash
pnpm add react@19.2.0 react-dom@19.2.0
```

**2. Enable New Features**
```typescript
// vite.config.ts
export default {
  plugins: [
    react({
      // Enable experimental features
      experimental: {
        ppr: true,
      },
    }),
  ],
};
```

**3. Adopt New Patterns**
```typescript
// Old: Manual caching
const cache = new Map();
const getData = (id) => {
  if (cache.has(id)) return cache.get(id);
  const data = fetch(id);
  cache.set(id, data);
  return data;
};

// New: cacheSignal
const getData = cacheSignal((id) => fetch(id));
```

**4. Optimize Suspense**
```typescript
// Old: Coarse boundaries
<Suspense fallback={<Loading />}>
  <App />
</Suspense>

// New: Fine-grained boundaries
<Suspense fallback={<HeaderLoading />}>
  <Header />
</Suspense>
<Suspense fallback={<ContentLoading />}>
  <Content />
</Suspense>
```

## Performance Monitoring

### Measure Core Web Vitals

```typescript
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

onCLS(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);
```

### React DevTools Profiler

```typescript
import { Profiler } from 'react';

<Profiler id="App" onRender={logRenderMetrics}>
  <App />
</Profiler>
```

## Further Reading

- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Partial Pre-rendering](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering)
- [Streaming SSR](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
