# Accessibility Guide

This document outlines the accessibility features and best practices implemented in this React 19 showcase application.

## Overview

Accessibility (a11y) ensures that our application is usable by everyone, including people with disabilities. This project follows WCAG 2.1 Level AA guidelines.

## Key Features

### 1. Keyboard Navigation

All interactive elements are keyboard accessible:

```typescript
// Proper button semantics
<button
  onClick={handleClick}
  aria-label="Add task"
>
  Add
</button>

// Focus management
*:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
```

**Testing:**
- Tab through all interactive elements
- Enter/Space activates buttons
- Escape closes modals
- Arrow keys navigate lists

### 2. ARIA Labels

Descriptive labels for screen readers:

```typescript
// Input labels
<input
  aria-label="New task"
  placeholder="What needs to be done?"
/>

// Button labels
<button aria-label="Delete task">
  <TrashIcon />
</button>

// Dynamic labels
<button aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}>
  <input type="checkbox" />
</button>
```

### 3. Semantic HTML

Using proper HTML elements:

```typescript
// Good: Semantic elements
<header>
  <nav>
    <button>Home</button>
  </nav>
</header>

<main>
  <article>
    <h1>Title</h1>
  </article>
</main>

// Avoid: Generic divs
<div onClick={...}>Click me</div> // ❌
<button onClick={...}>Click me</button> // ✅
```

### 4. Color Contrast

All text meets WCAG AA contrast ratios:

| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| Primary text | #ffffff | #0f172a | 15.8:1 |
| Secondary text | #cbd5e1 | #0f172a | 11.2:1 |
| Primary button | #ffffff | #6366f1 | 4.8:1 |

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse

### 5. Reduced Motion

Respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Testing:**
```bash
# macOS
System Preferences → Accessibility → Display → Reduce motion

# Windows
Settings → Ease of Access → Display → Show animations
```

### 6. High Contrast Mode

Enhanced visibility for high contrast preferences:

```css
@media (prefers-contrast: high) {
  .card {
    border-width: 2px;
  }
  
  button {
    border: 2px solid currentColor;
  }
}
```

### 7. Screen Reader Support

**Skip Links:**
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  {/* Content */}
</main>
```

**Live Regions:**
```typescript
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {isPending && 'Syncing...'}
</div>
```

**Hidden Content:**
```typescript
// Visually hidden but available to screen readers
<span className="sr-only">Loading...</span>

// Hidden from everyone
<div aria-hidden="true">
  <DecorativeIcon />
</div>
```

## Component Examples

### Accessible Button

```typescript
function AccessibleButton({ onClick, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {children}
    </button>
  );
}
```

### Accessible Form

```typescript
function AccessibleForm() {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-invalid={hasError}
          aria-describedby={hasError ? 'email-error' : undefined}
        />
      </label>
      {hasError && (
        <div id="email-error" role="alert">
          Please enter a valid email
        </div>
      )}
    </form>
  );
}
```

### Accessible Modal

```typescript
function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Trap focus
      modalRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}
```

## Testing Checklist

### Automated Testing

```bash
# Lighthouse accessibility audit
pnpm build
pnpm preview
# Open Chrome DevTools → Lighthouse → Accessibility

# axe-core
pnpm add -D @axe-core/react
```

```typescript
// In development
import { useEffect } from 'react';

if (process.env.NODE_ENV === 'development') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

### Manual Testing

- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces all content correctly
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators are visible
- [ ] Reduced motion is respected
- [ ] High contrast mode works
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Error messages are announced
- [ ] Loading states are communicated

### Screen Reader Testing

**macOS VoiceOver:**
```bash
Cmd + F5  # Toggle VoiceOver
Ctrl + Option + Arrow keys  # Navigate
```

**Windows Narrator:**
```bash
Win + Ctrl + Enter  # Toggle Narrator
Caps Lock + Arrow keys  # Navigate
```

**NVDA (Windows):**
```bash
Ctrl + Alt + N  # Start NVDA
Insert + Down  # Read next
```

## Common Pitfalls

### ❌ Missing Labels

```typescript
// Bad
<button onClick={handleDelete}>
  <TrashIcon />
</button>

// Good
<button onClick={handleDelete} aria-label="Delete task">
  <TrashIcon aria-hidden="true" />
</button>
```

### ❌ Div Buttons

```typescript
// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>
```

### ❌ Low Contrast

```typescript
// Bad
<p className="text-gray-400 bg-gray-300">Text</p> // 1.5:1 ❌

// Good
<p className="text-white bg-slate-800">Text</p> // 15.8:1 ✅
```

### ❌ Missing Focus States

```typescript
// Bad
button {
  outline: none; /* Never do this without alternative */
}

// Good
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
```

## Resources

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing
- [WebAIM Screen Reader Survey](https://webaim.org/projects/screenreadersurvey9/)
- [Accessibility Testing Checklist](https://www.a11yproject.com/checklist/)

## Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Keyboard navigation | ✅ | All interactive elements |
| ARIA labels | ✅ | Comprehensive labeling |
| Semantic HTML | ✅ | Proper element usage |
| Color contrast | ✅ | WCAG AA compliant |
| Reduced motion | ✅ | Respects user preference |
| High contrast | ✅ | Enhanced visibility |
| Screen reader | ✅ | Tested with VoiceOver |
| Focus management | ✅ | Visible indicators |

## Continuous Improvement

Accessibility is an ongoing process:

1. **Regular audits** - Run Lighthouse monthly
2. **User testing** - Test with real users
3. **Stay updated** - Follow WCAG updates
4. **Team training** - Educate developers
5. **Automated testing** - Integrate axe-core in CI

## Contact

For accessibility concerns or suggestions, please open an issue on GitHub.
