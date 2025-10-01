# Contributing to React 19 Showcase

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Getting Started

### Prerequisites

- Node.js (latest LTS version as of October 2025)
- pnpm (v10.20.0 or later)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react19-showcase.git
   cd react19-showcase
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Building

```bash
pnpm build
```

## Coding Standards

### TypeScript

- Use strict TypeScript mode
- Avoid `any` types; prefer proper typing
- Use interfaces for object shapes
- Use type aliases for unions and complex types

### React

- Use functional components with hooks
- Follow React 19+ best practices
- Leverage new features: Actions, useActionState, useOptimistic, use API, etc.
- Write accessible components (ARIA, keyboard navigation)

### Styling

- Use Tailwind CSS utility classes
- Follow the design system defined in `tailwind.config.js`
- Ensure responsive design
- Maintain high contrast ratios for accessibility

### Code Organization

- Follow SOLID principles
- Keep components small and focused (Single Responsibility)
- Use composition over inheritance
- Apply DRY (Don't Repeat Yourself) principle
- Create reusable utilities and hooks

### Testing

- Write tests for all new features
- Aim for high test coverage
- Use React Testing Library best practices
- Test accessibility features

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```bash
git commit -m "feat: add useOptimistic hook for todo updates"
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add tests for new features
4. Ensure your code follows the coding standards
5. Update the README.md if you add new features
6. Submit a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Architecture Principles

### Scalability

- Design components to be reusable
- Use proper state management patterns
- Implement code splitting where appropriate
- Consider performance implications

### Reliability

- Handle errors gracefully
- Validate user input
- Write defensive code
- Add proper error boundaries

### Micro-Frontend Ready

- Keep components loosely coupled
- Use clear interfaces between modules
- Design for independent deployment
- Follow module federation best practices

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about contributing
- General discussion

Thank you for contributing! 🎉
