# React 19.2.0 Showcase

> A comprehensive demonstration of React 19.2.0 features, modern development practices, and production-ready patterns.

[![CI](https://github.com/Waqas1412/react19-showcase/actions/workflows/ci.yml/badge.svg)](https://github.com/Waqas1412/react19-showcase/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

This project showcases **all major React 19.2.0 features** with production-ready implementations, comprehensive documentation, and best practices for scalability, reliability, and maintainability.

### Key Highlights

- ✅ **React 19.2.0** - Latest stable release with all new features
- ✅ **TypeScript** - Strict mode with full type safety
- ✅ **Vite** - Lightning-fast build tool
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Vitest + RTL** - Comprehensive test coverage
- ✅ **ESLint Flat Config** - Modern linting setup
- ✅ **Accessibility** - WCAG 2.1 Level AA compliant
- ✅ **CI/CD** - Automated testing and deployment

## 🚀 Features

### React 19 Core Features

| Feature | Status | Documentation |
|---------|--------|---------------|
| **Actions & useActionState** | ✅ | [docs/ACTIONS_AND_OPTIMISTIC.md](docs/ACTIONS_AND_OPTIMISTIC.md) |
| **useOptimistic** | ✅ | [docs/ACTIONS_AND_OPTIMISTIC.md](docs/ACTIONS_AND_OPTIMISTIC.md) |
| **use() API** | ✅ | [docs/SUSPENSE_AND_USE.md](docs/SUSPENSE_AND_USE.md) |
| **Document Metadata** | ✅ | [docs/DOCUMENT_METADATA.md](docs/DOCUMENT_METADATA.md) |
| **Resource Preloading** | ✅ | [docs/RESOURCE_PRELOADING.md](docs/RESOURCE_PRELOADING.md) |
| **Stylesheet Precedence** | ✅ | [docs/SSR_AND_STYLESHEETS.md](docs/SSR_AND_STYLESHEETS.md) |
| **Custom Elements** | ✅ | See `src/components/CustomElements.tsx` |

### React 19.2 Experimental Features

| Feature | Status | Documentation |
|---------|--------|---------------|
| **Activity Component** | ✅ | See `src/components/ActivityDemo.tsx` |
| **useEffectEvent** | ✅ | See `src/hooks/useEffectEvent.ts` |
| **cacheSignal (RSC)** | 📚 | [docs/ADVANCED_FEATURES.md](docs/ADVANCED_FEATURES.md) |
| **Partial Pre-rendering** | 📚 | [docs/ADVANCED_FEATURES.md](docs/ADVANCED_FEATURES.md) |
| **SSR Batching** | 📚 | [docs/ADVANCED_FEATURES.md](docs/ADVANCED_FEATURES.md) |

### Architecture & Best Practices

| Pattern | Status | Documentation |
|---------|--------|---------------|
| **SOLID Principles** | ✅ | Applied throughout codebase |
| **DRY Principle** | ✅ | Reusable components & hooks |
| **Micro-Frontends** | 📚 | [docs/MICRO_FRONTENDS.md](docs/MICRO_FRONTENDS.md) |
| **Accessibility (a11y)** | ✅ | [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) |
| **Testing Strategy** | ✅ | Unit, integration, and component tests |

## 📦 Quick Start

### Prerequisites

- **Node.js** 22.13.0 (LTS as of October 2025)
- **pnpm** 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Waqas1412/react19-showcase.git
cd react19-showcase

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` to see the application.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm test         # Run tests
pnpm test:ui      # Run tests with UI
pnpm lint         # Lint code
pnpm typecheck    # Check TypeScript types
```

## 🏗️ Project Structure

```
react19-showcase/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── docs/                       # Comprehensive documentation
│   ├── ACTIONS_AND_OPTIMISTIC.md
│   ├── SUSPENSE_AND_USE.md
│   ├── DOCUMENT_METADATA.md
│   ├── RESOURCE_PRELOADING.md
│   ├── SSR_AND_STYLESHEETS.md
│   ├── ADVANCED_FEATURES.md
│   ├── ACCESSIBILITY.md
│   └── MICRO_FRONTENDS.md
├── public/
│   └── x-clock.js              # Custom web component
├── src/
│   ├── actions/                # Server actions
│   │   └── todoActions.ts
│   ├── components/             # React components
│   │   ├── __tests__/          # Component tests
│   │   ├── pages/              # Page components
│   │   ├── Layout.tsx
│   │   ├── Router.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoListEnhanced.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ActivityDemo.tsx
│   │   ├── UseEffectEventDemo.tsx
│   │   └── ...
│   ├── hooks/                  # Custom hooks
│   │   ├── __tests__/
│   │   └── useEffectEvent.ts
│   ├── lib/                    # Utilities
│   │   ├── dataFetching.ts
│   │   └── utils.ts
│   ├── types/                  # TypeScript types
│   │   └── todo.ts
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── LICENSE                     # MIT License
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Code of conduct
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── eslint.config.js
```

## 🎨 Features Walkthrough

### 1. Actions & Optimistic Updates

Demonstrates React 19's new Actions API with `useActionState` and `useOptimistic` for instant UI feedback.

**Location:** `src/components/TodoListEnhanced.tsx`

```typescript
const [optimisticTodos, addOptimisticUpdate] = useOptimistic(
  todos,
  (state, action) => {
    // Instant UI update
    return [...state, action.todo];
  }
);
```

**Benefits:**
- Instant UI feedback
- Automatic error handling
- Pending state management

### 2. Suspense & use() API

Shows how to fetch data with the new `use()` hook and Suspense boundaries.

**Location:** `src/components/Dashboard.tsx`

```typescript
function UserStats({ userPromise }) {
  const user = use(userPromise); // Unwrap promise
  return <div>{user.name}</div>;
}

<Suspense fallback={<Loading />}>
  <UserStats userPromise={fetchUser()} />
</Suspense>
```

**Benefits:**
- Declarative data fetching
- Automatic loading states
- Error boundaries integration

### 3. Document Metadata

Per-route metadata management without third-party libraries.

**Location:** `src/components/DocumentMeta.tsx`

```typescript
<>
  <title>Page Title | React 19 Showcase</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
</>
```

**Benefits:**
- No react-helmet needed
- SSR compatible
- Automatic deduplication

### 4. Resource Preloading

Optimize performance with `preinit`, `preload`, `preconnect`, and `prefetchDNS`.

**Location:** `src/components/ResourcePreloading.tsx`

```typescript
preinit('https://example.com/critical.css', { as: 'style' });
preload('/hero.jpg', { as: 'image', fetchPriority: 'high' });
preconnect('https://api.example.com');
```

**Benefits:**
- Faster page loads
- Better Core Web Vitals
- Reduced layout shifts

### 5. Custom Elements Integration

Seamless integration with Web Components.

**Location:** `public/x-clock.js` + `src/components/CustomElements.tsx`

```typescript
// Define custom element
class XClock extends HTMLElement { ... }
customElements.define('x-clock', XClock);

// Use in React
<x-clock />
```

**Benefits:**
- Framework-agnostic components
- Shadow DOM encapsulation
- Reusable across projects

### 6. useEffectEvent Hook

Stable event handlers without stale closures.

**Location:** `src/hooks/useEffectEvent.ts`

```typescript
const onEvent = useEffectEvent(() => {
  console.log(latestValue); // Always latest
});

useEffect(() => {
  socket.on('message', onEvent);
}, []); // No dependencies needed!
```

**Benefits:**
- No stale closures
- Fewer effect re-runs
- Cleaner code

## 🧪 Testing

Comprehensive test coverage with Vitest and React Testing Library.

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test -- --coverage
```

**Test Files:**
- `src/components/__tests__/TodoList.test.tsx`
- `src/components/__tests__/Router.test.tsx`
- `src/hooks/__tests__/useEffectEvent.test.tsx`

## ♿ Accessibility

WCAG 2.1 Level AA compliant with:

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Color contrast (15.8:1 ratio)
- ✅ Reduced motion support
- ✅ High contrast mode
- ✅ Focus indicators

See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) for details.

## 📚 Documentation

Comprehensive guides for every feature:

- **[Actions & Optimistic Updates](docs/ACTIONS_AND_OPTIMISTIC.md)** - useActionState, useOptimistic, form actions
- **[Suspense & use() API](docs/SUSPENSE_AND_USE.md)** - Data fetching, error boundaries, loading states
- **[Document Metadata](docs/DOCUMENT_METADATA.md)** - SEO, social media, per-route metadata
- **[Resource Preloading](docs/RESOURCE_PRELOADING.md)** - preinit, preload, preconnect, prefetchDNS
- **[SSR & Stylesheets](docs/SSR_AND_STYLESHEETS.md)** - Stylesheet precedence, async scripts, streaming
- **[Advanced Features](docs/ADVANCED_FEATURES.md)** - cacheSignal, PPR, SSR batching
- **[Accessibility](docs/ACCESSIBILITY.md)** - WCAG compliance, testing, best practices
- **[Micro-Frontends](docs/MICRO_FRONTENDS.md)** - Architecture patterns, scalability, SOLID principles

## 🏛️ Architecture

### SOLID Principles

- **Single Responsibility** - Each component has one clear purpose
- **Open/Closed** - Easy to extend without modification
- **Liskov Substitution** - Components are interchangeable
- **Interface Segregation** - Minimal, focused interfaces
- **Dependency Inversion** - Depend on abstractions

### DRY Principle

- Reusable components (`Layout`, `Router`, `DocumentMeta`)
- Shared utilities (`lib/utils.ts`, `lib/dataFetching.ts`)
- Custom hooks (`useEffectEvent`)

### Scalability

- **Code Splitting** - Lazy-loaded routes
- **Tree Shaking** - Minimal bundle size
- **Micro-Frontend Ready** - Component-based architecture
- **Type Safety** - Full TypeScript coverage

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `test:` - Test additions/changes
- `refactor:` - Code refactoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for React 19
- [Vite Team](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vitest](https://vitest.dev/) for fast testing
- [TypeScript](https://www.typescriptlang.org/) for type safety

## 📞 Contact

- **GitHub:** [@Waqas1412](https://github.com/Waqas1412)
- **Repository:** [react19-showcase](https://github.com/Waqas1412/react19-showcase)

## 🗺️ Roadmap

- [x] React 19 core features
- [x] React 19.2 experimental features
- [x] Comprehensive documentation
- [x] Test coverage
- [x] Accessibility compliance
- [ ] Module Federation demo
- [ ] Performance monitoring
- [ ] Storybook integration
- [ ] Docker deployment

---

**Built with ❤️ using React 19.2.0**

*Last updated: October 2025*
