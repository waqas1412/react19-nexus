# React 19 Resource Preloading APIs

This document explains React 19's new resource preloading APIs that help optimize resource loading and improve performance.

## Overview

React 19 introduces four new APIs for resource preloading:

- **`preinit()`** - Load and execute a script or stylesheet immediately
- **`preload()`** - Preload a resource that will be needed soon
- **`preconnect()`** - Establish early connection to an origin
- **`prefetchDNS()`** - Resolve DNS for a domain

These APIs provide a declarative way to optimize resource loading without manual DOM manipulation.

## API Reference

### preinit()

Load and execute a script or stylesheet with high priority.

```typescript
import { preinit } from 'react-dom';

// Preinitialize a stylesheet
preinit('https://example.com/styles.css', {
  as: 'style',
  precedence: 'high' // or 'medium', 'low'
});

// Preinitialize a script
preinit('https://example.com/analytics.js', {
  as: 'script'
});
```

**When to use:**
- Critical CSS that should load immediately
- Essential scripts (analytics, error tracking)
- Third-party libraries needed on page load

**Options:**
- `as`: `'style'` or `'script'`
- `precedence`: Controls loading order for stylesheets
- `crossOrigin`: CORS mode
- `integrity`: Subresource integrity hash

### preload()

Preload a resource that will be needed soon.

```typescript
import { preload } from 'react-dom';

// Preload a font
preload('https://example.com/font.woff2', {
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous'
});

// Preload an image
preload('https://example.com/hero.jpg', {
  as: 'image'
});

// Preload a fetch request
preload('https://api.example.com/data', {
  as: 'fetch',
  crossOrigin: 'anonymous'
});
```

**When to use:**
- Fonts used on the page
- Hero images above the fold
- Data that will be fetched soon
- Resources for next route

**Options:**
- `as`: Resource type (`'font'`, `'image'`, `'fetch'`, `'style'`, `'script'`)
- `type`: MIME type
- `crossOrigin`: CORS mode
- `integrity`: Subresource integrity hash
- `fetchPriority`: `'high'`, `'low'`, or `'auto'`

### preconnect()

Establish an early connection to an origin.

```typescript
import { preconnect } from 'react-dom';

// Preconnect to an API server
preconnect('https://api.example.com');

// Preconnect with CORS
preconnect('https://cdn.example.com', {
  crossOrigin: 'anonymous'
});
```

**When to use:**
- External API servers
- CDNs for images/assets
- Third-party services (analytics, ads)
- WebSocket servers

**Options:**
- `crossOrigin`: CORS mode

**What it does:**
- DNS resolution
- TCP handshake
- TLS negotiation (for HTTPS)

### prefetchDNS()

Resolve DNS for a domain.

```typescript
import { prefetchDNS } from 'react-dom';

// Prefetch DNS for external domains
prefetchDNS('https://analytics.example.com');
prefetchDNS('https://cdn.example.com');
```

**When to use:**
- Domains for lower-priority resources
- Third-party domains you might use
- Speculative loading

**What it does:**
- DNS resolution only
- Lighter than `preconnect()`

## Usage Patterns

### In Components

```typescript
function App() {
  // Preload critical resources
  useEffect(() => {
    preinit('https://fonts.googleapis.com/css2?family=Inter', {
      as: 'style'
    });
    
    preload('/hero-image.jpg', {
      as: 'image',
      fetchPriority: 'high'
    });
    
    preconnect('https://api.example.com');
  }, []);

  return <div>{/* App content */}</div>;
}
```

### Route-Based Preloading

```typescript
function ProductPage({ productId }) {
  useEffect(() => {
    // Preload product image
    preload(`/products/${productId}/image.jpg`, {
      as: 'image'
    });
    
    // Preconnect to reviews API
    preconnect('https://reviews.example.com');
  }, [productId]);

  return <div>{/* Product page */}</div>;
}
```

### Conditional Preloading

```typescript
function Gallery({ images }) {
  useEffect(() => {
    // Preload first 3 images
    images.slice(0, 3).forEach((image) => {
      preload(image.url, { as: 'image' });
    });
  }, [images]);

  return <div>{/* Gallery */}</div>;
}
```

## Best Practices

### 1. Prioritize Critical Resources

```typescript
// High priority: Above-the-fold content
preinit('/critical.css', {
  as: 'style',
  precedence: 'high'
});

// Medium priority: Important but not critical
preload('/hero.jpg', {
  as: 'image',
  fetchPriority: 'high'
});

// Low priority: Nice to have
prefetchDNS('https://analytics.example.com');
```

### 2. Avoid Over-Preloading

❌ **Don't:**
```typescript
// Preloading too many resources wastes bandwidth
images.forEach((img) => preload(img.url, { as: 'image' }));
```

✅ **Do:**
```typescript
// Only preload what's immediately needed
images.slice(0, 3).forEach((img) => preload(img.url, { as: 'image' }));
```

### 3. Use Appropriate API for Each Resource

```typescript
// Critical CSS - use preinit
preinit('/app.css', { as: 'style' });

// Font - use preload
preload('/font.woff2', { as: 'font', type: 'font/woff2' });

// API origin - use preconnect
preconnect('https://api.example.com');

// Analytics domain - use prefetchDNS
prefetchDNS('https://analytics.example.com');
```

### 4. Combine with Suspense

```typescript
function App() {
  // Preload data
  const dataPromise = useMemo(() => {
    preconnect('https://api.example.com');
    return fetch('https://api.example.com/data').then((r) => r.json());
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  );
}
```

## Performance Impact

### Before (Manual Link Tags)

```html
<!-- Manual management in HTML -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>
```

**Issues:**
- Static, can't be dynamic
- No component-level control
- Hard to maintain
- Can't respond to user interactions

### After (React 19 APIs)

```typescript
function Component() {
  useEffect(() => {
    preconnect('https://fonts.googleapis.com');
    preload('/font.woff2', {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    });
  }, []);
}
```

**Benefits:**
- Dynamic and conditional
- Component-scoped
- Type-safe
- Automatic deduplication

## Real-World Examples

### E-commerce Product Page

```typescript
function ProductPage({ product }) {
  useEffect(() => {
    // Preload product image
    preload(product.image, {
      as: 'image',
      fetchPriority: 'high'
    });
    
    // Preconnect to reviews API
    preconnect('https://reviews.example.com');
    
    // Prefetch DNS for payment gateway
    prefetchDNS('https://payments.example.com');
  }, [product]);

  return <div>{/* Product details */}</div>;
}
```

### Blog Post with Code Highlighting

```typescript
function BlogPost({ post }) {
  useEffect(() => {
    if (post.hasCode) {
      // Preinit syntax highlighting CSS
      preinit('https://cdn.example.com/prism.css', {
        as: 'style'
      });
      
      // Preinit highlighting script
      preinit('https://cdn.example.com/prism.js', {
        as: 'script'
      });
    }
  }, [post]);

  return <article>{/* Post content */}</article>;
}
```

### Image Gallery

```typescript
function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload current and next 2 images
    const toPreload = images.slice(currentIndex, currentIndex + 3);
    toPreload.forEach((img) => {
      preload(img.url, { as: 'image' });
    });
  }, [currentIndex, images]);

  return <div>{/* Gallery UI */}</div>;
}
```

## Comparison with Traditional Methods

| Method | React 19 API | Traditional |
|--------|--------------|-------------|
| **Stylesheet** | `preinit(url, { as: 'style' })` | `<link rel="stylesheet">` |
| **Script** | `preinit(url, { as: 'script' })` | `<script src="...">` |
| **Font** | `preload(url, { as: 'font' })` | `<link rel="preload" as="font">` |
| **Image** | `preload(url, { as: 'image' })` | `<link rel="preload" as="image">` |
| **Connection** | `preconnect(origin)` | `<link rel="preconnect">` |
| **DNS** | `prefetchDNS(origin)` | `<link rel="dns-prefetch">` |

## Core Web Vitals Impact

### Largest Contentful Paint (LCP)

```typescript
// Preload hero image to improve LCP
preload('/hero.jpg', {
  as: 'image',
  fetchPriority: 'high'
});
```

### First Input Delay (FID)

```typescript
// Preinit critical JS to reduce FID
preinit('/app.js', {
  as: 'script'
});
```

### Cumulative Layout Shift (CLS)

```typescript
// Preload fonts to prevent layout shift
preload('/font.woff2', {
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous'
});
```

## Architecture Benefits

### SOLID Principles
- **Single Responsibility**: Each API has one clear purpose
- **Open/Closed**: Easy to extend with new resource types

### Scalability
- Component-level resource management
- Works with code splitting
- Supports lazy loading

### Reliability
- Type-safe with TypeScript
- Automatic deduplication
- SSR compatible

## Related Files

- `src/components/ResourcePreloading.tsx` - Demo component
- `src/components/pages/ResourcesPage.tsx` - Resources page

## Further Reading

- [Resource Hints Spec](https://www.w3.org/TR/resource-hints/)
- [Preload Spec](https://www.w3.org/TR/preload/)
- [Web Performance Working Group](https://www.w3.org/webperf/)
- [Core Web Vitals](https://web.dev/vitals/)
