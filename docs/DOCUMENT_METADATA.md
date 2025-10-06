# React 19 Document Metadata

This document explains React 19's built-in support for document metadata, allowing you to render `<title>`, `<meta>`, and `<link>` tags directly in components.

## Overview

React 19 introduces native support for document metadata. You can now render metadata tags anywhere in your component tree, and React will automatically hoist them to the document `<head>`.

## Key Features

- **Automatic Hoisting**: Metadata tags are automatically moved to `<head>`
- **Component-Level Metadata**: Define metadata where it's used
- **Deduplication**: React handles duplicate tags intelligently
- **SSR Compatible**: Works seamlessly with server-side rendering

## Implementation

### DocumentMeta Component

Located in `src/components/DocumentMeta.tsx`:

```typescript
export function DocumentMeta({ title, description, keywords }: DocumentMetaProps) {
  return (
    <>
      <title>{title} | React 19 Showcase</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
```

**How it works:**
1. Component renders metadata tags
2. React detects these special tags
3. Tags are hoisted to `<head>`
4. Duplicate tags are handled automatically

### Per-Route Metadata

Implemented in `src/components/Router.tsx`:

```typescript
export function Router({ routes, defaultRoute }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState(defaultRoute);
  const activeRoute = routes.find((r) => r.path === currentRoute);

  return (
    <>
      {/* Metadata updates when route changes */}
      <DocumentMeta
        title={activeRoute.title}
        description={activeRoute.description}
        keywords={activeRoute.keywords}
      />
      
      {/* Route content */}
      {activeRoute.component}
    </>
  );
}
```

**Benefits:**
- Each route has its own metadata
- SEO-friendly page titles and descriptions
- Social media preview customization
- No manual DOM manipulation

## Supported Tags

React 19 supports automatic hoisting for:

### Title
```typescript
<title>Page Title</title>
```

### Meta Tags
```typescript
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<meta property="og:title" content="..." />
<meta name="twitter:card" content="..." />
```

### Link Tags
```typescript
<link rel="canonical" href="..." />
<link rel="icon" href="..." />
<link rel="stylesheet" href="..." />
```

### Other Head Elements
```typescript
<base href="..." />
<style>{`...`}</style>
<script src="..." />
```

## Best Practices

### 1. Create Reusable Metadata Components

```typescript
// Good: Reusable component
function PageMeta({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}

// Usage
<PageMeta title="Home" description="Welcome" />
```

### 2. Use Conditional Metadata

```typescript
function ProductPage({ product }) {
  return (
    <>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />
      {product.image && (
        <meta property="og:image" content={product.image} />
      )}
      
      {/* Page content */}
    </>
  );
}
```

### 3. Handle Duplicate Tags

React automatically handles duplicates based on tag type:

```typescript
// Later tags override earlier ones for unique tags (title, canonical)
<title>First Title</title>
<title>Second Title</title> // This wins

// Multiple meta tags are allowed
<meta name="keywords" content="react" />
<meta name="keywords" content="typescript" /> // Both rendered
```

### 4. Combine with Routing

```typescript
const routes = [
  {
    path: '/home',
    title: 'Home',
    description: 'Welcome to our site',
    component: <HomePage />,
  },
  {
    path: '/about',
    title: 'About',
    description: 'Learn about us',
    component: <AboutPage />,
  },
];

function Router({ routes }) {
  const [route, setRoute] = useState(routes[0]);
  
  return (
    <>
      <DocumentMeta {...route} />
      {route.component}
    </>
  );
}
```

## Comparison: Before vs. After

### Before (React 18)

```typescript
import { Helmet } from 'react-helmet';

function Page() {
  return (
    <>
      <Helmet>
        <title>Page Title</title>
        <meta name="description" content="..." />
      </Helmet>
      
      <div>Content</div>
    </>
  );
}
```

**Issues:**
- Requires third-party library
- Extra bundle size
- Potential SSR complications

### After (React 19)

```typescript
function Page() {
  return (
    <>
      <title>Page Title</title>
      <meta name="description" content="..." />
      
      <div>Content</div>
    </>
  );
}
```

**Benefits:**
- No dependencies
- Built-in support
- Better performance
- Simpler code

## Advanced Patterns

### Dynamic Metadata from Data

```typescript
function ArticlePage({ articlePromise }) {
  const article = use(articlePromise);
  
  return (
    <>
      <title>{article.title}</title>
      <meta name="description" content={article.excerpt} />
      <meta property="og:image" content={article.coverImage} />
      <meta property="article:published_time" content={article.publishedAt} />
      
      <article>{/* Content */}</article>
    </>
  );
}
```

### Metadata with Suspense

```typescript
function Page() {
  return (
    <Suspense fallback={
      <>
        <title>Loading...</title>
        <div>Loading...</div>
      </>
    }>
      <AsyncContent />
    </Suspense>
  );
}

function AsyncContent() {
  const data = use(fetchData());
  
  return (
    <>
      <title>{data.title}</title>
      <div>{data.content}</div>
    </>
  );
}
```

### Nested Metadata

```typescript
function App() {
  return (
    <>
      {/* Global metadata */}
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      
      <Router>
        <Route path="/products/:id">
          {/* Route-specific metadata */}
          <ProductPage />
        </Route>
      </Router>
    </>
  );
}
```

## SEO Benefits

### 1. Better Search Engine Visibility

```typescript
<title>React 19 Features | Modern Web Development</title>
<meta name="description" content="Comprehensive guide to React 19 features including Actions, Suspense, and more." />
<meta name="keywords" content="React 19, Actions, Suspense, useOptimistic" />
```

### 2. Social Media Previews

```typescript
<meta property="og:title" content="React 19 Showcase" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://example.com/preview.png" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="React 19 Showcase" />
<meta name="twitter:image" content="https://example.com/preview.png" />
```

### 3. Canonical URLs

```typescript
<link rel="canonical" href="https://example.com/page" />
```

## Server-Side Rendering

React 19's metadata works seamlessly with SSR:

```typescript
// Server
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
// Metadata is automatically included in <head>
```

**Benefits:**
- Metadata available on first paint
- Better SEO
- Faster perceived performance
- No client-side DOM manipulation

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Each component manages its own metadata
- **Open/Closed**: Easy to extend with new metadata types

### Scalability
- Component-level metadata scales with your app
- No global state management needed
- Works with any routing solution

### Reliability
- Type-safe with TypeScript
- Automatic deduplication
- SSR compatible

## Related Files

- `src/components/DocumentMeta.tsx` - Reusable metadata component
- `src/components/Router.tsx` - Per-route metadata implementation
- `src/components/pages/*.tsx` - Page components with metadata

## Further Reading

- [React 19 Document Metadata RFC](https://github.com/reactjs/rfcs)
- [MDN: Meta Tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
