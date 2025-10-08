# React 19 SSR Features: Stylesheet Precedence & Async Scripts

This document explains React 19's improvements to server-side rendering, stylesheet precedence, and async script handling.

## Overview

React 19 introduces several features that improve SSR performance and reliability:

- **Stylesheet Precedence** - Control the order stylesheets are applied
- **Async Script Handling** - Automatic deduplication and proper loading
- **Streaming SSR Improvements** - Better batching and performance
- **Web Streams Support** - Native streaming with modern APIs

## Stylesheet Precedence

### What It Is

The `precedence` attribute allows you to control the order in which stylesheets are loaded and applied.

```typescript
<link
  rel="stylesheet"
  href="/styles.css"
  precedence="high" // or "medium", "low"
/>
```

### How It Works

React groups stylesheets by precedence and ensures they're loaded in order:

1. **High precedence** - Loaded first (resets, critical styles)
2. **Medium precedence** - Loaded second (theme, layout)
3. **Low precedence** - Loaded last (components, utilities)

### Benefits

**1. Predictable CSS Order**
```typescript
// These will load in precedence order, not DOM order
<link rel="stylesheet" href="/component.css" precedence="low" />
<link rel="stylesheet" href="/reset.css" precedence="high" />
<link rel="stylesheet" href="/theme.css" precedence="medium" />

// Actual load order: reset.css → theme.css → component.css
```

**2. No Specificity Wars**
```typescript
// Component styles can safely override theme styles
// because they load later (lower precedence)
function Button() {
  return (
    <>
      <link rel="stylesheet" href="/button.css" precedence="low" />
      <button>Click me</button>
    </>
  );
}
```

**3. SSR Compatible**
```typescript
// Server renders stylesheets in correct order
// Client hydration maintains the same order
// No flash of unstyled content (FOUC)
```

### Usage Patterns

#### Global Styles (High Precedence)

```typescript
function App() {
  return (
    <>
      <link rel="stylesheet" href="/reset.css" precedence="high" />
      <link rel="stylesheet" href="/global.css" precedence="high" />
      {/* App content */}
    </>
  );
}
```

#### Theme Styles (Medium Precedence)

```typescript
function ThemeProvider({ theme, children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href={`/themes/${theme}.css`}
        precedence="medium"
      />
      {children}
    </>
  );
}
```

#### Component Styles (Low Precedence)

```typescript
function Card() {
  return (
    <>
      <link rel="stylesheet" href="/card.css" precedence="low" />
      <div className="card">{/* Content */}</div>
    </>
  );
}
```

## Async Script Handling

### Automatic Deduplication

React 19 automatically deduplicates scripts with the same `src`:

```typescript
// Component A
function ComponentA() {
  return (
    <>
      <script async src="https://example.com/lib.js" />
      {/* Content */}
    </>
  );
}

// Component B
function ComponentB() {
  return (
    <>
      <script async src="https://example.com/lib.js" />
      {/* Content */}
    </>
  );
}

// Result: lib.js is only loaded once, even if both components render
```

### Benefits

**1. No Manual Tracking**
```typescript
// Before React 19: Manual tracking required
const loadedScripts = new Set();

function loadScript(src) {
  if (loadedScripts.has(src)) return;
  loadedScripts.add(src);
  // ... load script
}

// After React 19: Automatic
<script async src="..." /> // React handles deduplication
```

**2. Component-Level Scripts**
```typescript
// Each component can declare its dependencies
function Analytics() {
  return (
    <>
      <script async src="https://analytics.example.com/script.js" />
      {/* Analytics UI */}
    </>
  );
}
```

**3. SSR Support**
```typescript
// Scripts are properly handled during SSR
// Client hydration doesn't reload scripts
```

### Usage Patterns

#### Analytics

```typescript
function AnalyticsProvider({ children }) {
  return (
    <>
      <script
        async
        src="https://analytics.example.com/script.js"
        onLoad={() => console.log('Analytics loaded')}
      />
      {children}
    </>
  );
}
```

#### Third-Party Libraries

```typescript
function Map({ location }) {
  return (
    <>
      <script
        async
        src="https://maps.example.com/api.js"
      />
      <div id="map" data-location={location} />
    </>
  );
}
```

## SSR Batching & Streaming

### Batched DOM Updates

React 19 batches stylesheet and script insertions:

```typescript
// Multiple stylesheets
<link rel="stylesheet" href="/a.css" />
<link rel="stylesheet" href="/b.css" />
<link rel="stylesheet" href="/c.css" />

// React batches these into a single DOM operation
// Reduces reflows and improves performance
```

### Streaming SSR

React 19 improves streaming SSR with better stylesheet handling:

```typescript
// Server
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    // Critical styles are included in shell
    // Content streams after
    pipe(response);
  }
});
```

**Benefits:**
- Faster Time to First Byte (TTFB)
- Progressive rendering
- Better perceived performance
- No FOUC

### Web Streams Support

React 19 supports native Web Streams:

```typescript
// Server (Node.js with Web Streams)
import { renderToReadableStream } from 'react-dom/server';

const stream = await renderToReadableStream(<App />);
return new Response(stream, {
  headers: { 'Content-Type': 'text/html' }
});
```

## Before & After Comparison

### Before (React 18)

```typescript
// Manual stylesheet management
function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <div>{/* Content */}</div>;
}
```

**Issues:**
- Manual DOM manipulation
- No SSR support
- Race conditions
- FOUC possible

### After (React 19)

```typescript
function App() {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" precedence="high" />
      <div>{/* Content */}</div>
    </>
  );
}
```

**Benefits:**
- Declarative
- SSR compatible
- No FOUC
- Automatic deduplication

## Best Practices

### 1. Use Precedence for All Stylesheets

```typescript
// Good: Explicit precedence
<link rel="stylesheet" href="/reset.css" precedence="high" />
<link rel="stylesheet" href="/theme.css" precedence="medium" />
<link rel="stylesheet" href="/component.css" precedence="low" />

// Avoid: No precedence (unpredictable order)
<link rel="stylesheet" href="/styles.css" />
```

### 2. Group Related Styles

```typescript
// Good: Logical grouping
function ThemeProvider() {
  return (
    <>
      <link rel="stylesheet" href="/theme-base.css" precedence="medium" />
      <link rel="stylesheet" href="/theme-colors.css" precedence="medium" />
      <link rel="stylesheet" href="/theme-typography.css" precedence="medium" />
      {/* Content */}
    </>
  );
}
```

### 3. Async for Non-Critical Scripts

```typescript
// Good: Async for analytics
<script async src="https://analytics.example.com/script.js" />

// Good: Blocking for critical scripts
<script src="/critical-polyfill.js" />
```

### 4. Combine with Suspense

```typescript
function App() {
  return (
    <>
      <link rel="stylesheet" href="/critical.css" precedence="high" />
      <Suspense fallback={<Loading />}>
        <AsyncContent />
      </Suspense>
    </>
  );
}
```

## Performance Impact

### Core Web Vitals

**Largest Contentful Paint (LCP)**
```typescript
// High precedence for critical styles
<link rel="stylesheet" href="/above-fold.css" precedence="high" />
```

**First Contentful Paint (FCP)**
```typescript
// Streaming SSR with batched stylesheets
// Faster FCP due to progressive rendering
```

**Cumulative Layout Shift (CLS)**
```typescript
// No FOUC = No layout shift
<link rel="stylesheet" href="/layout.css" precedence="high" />
```

### Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| TTFB | 200ms | 150ms | -25% |
| FCP | 800ms | 600ms | -25% |
| LCP | 1500ms | 1200ms | -20% |
| CLS | 0.15 | 0.05 | -67% |

*Example metrics - actual results vary by application*

## SSR Example

### Server Setup

```typescript
// server.ts
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/client.js'],
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res);
    },
    onError(error) {
      console.error(error);
    }
  });
});
```

### App Component

```typescript
// App.tsx
function App() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/reset.css" precedence="high" />
        <link rel="stylesheet" href="/theme.css" precedence="medium" />
      </head>
      <body>
        <Suspense fallback={<Loading />}>
          <Content />
        </Suspense>
      </body>
    </html>
  );
}
```

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Stylesheets and scripts are declarative
- **Open/Closed**: Easy to extend with new styles/scripts

### Scalability
- Component-level resource management
- Works with code splitting
- Supports micro-frontends

### Reliability
- No race conditions
- Automatic deduplication
- SSR compatible

## Related Files

- `src/components/StylesheetPrecedence.tsx` - Demo component
- `src/components/pages/SSRPage.tsx` - SSR features page

## Further Reading

- [React 19 SSR Improvements](https://react.dev/blog/2024/04/25/react-19)
- [Streaming SSR](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Resource Hints](https://www.w3.org/TR/resource-hints/)
