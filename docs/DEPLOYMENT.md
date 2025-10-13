# Deployment Guide

This guide covers deploying the React 19 showcase application to various platforms and environments.

## Build for Production

### 1. Create Production Build

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint code
pnpm lint

# Build for production
pnpm build
```

The build output will be in the `dist/` directory.

### 2. Preview Production Build

```bash
pnpm preview
```

Visit `http://localhost:4173` to preview the production build locally.

## Platform-Specific Deployment

### Vercel

**Recommended for React applications**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

**vercel.json:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Deploy
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

```bash
# Install gh-pages
pnpm add -D gh-pages

# Add deploy script to package.json
{
  "scripts": {
    "deploy": "pnpm build && gh-pages -d dist"
  }
}

# Deploy
pnpm deploy
```

**vite.config.ts:**
```typescript
export default defineConfig({
  base: '/react19-showcase/', // Repository name
  // ... other config
});
```

### AWS S3 + CloudFront

```bash
# Build
pnpm build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and run:**
```bash
# Build image
docker build -t react19-showcase .

# Run container
docker run -p 8080:80 react19-showcase
```

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

## Environment Variables

### Development

**.env.development:**
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

### Production

**.env.production:**
```bash
VITE_API_URL=https://api.example.com
VITE_APP_ENV=production
```

### Usage

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

## Performance Optimization

### 1. Enable Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

**Node.js (Express):**
```javascript
const compression = require('compression');
app.use(compression());
```

### 2. Set Cache Headers

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 3. Enable HTTP/2

```nginx
listen 443 ssl http2;
```

### 4. CDN Configuration

Use a CDN for static assets:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
```

## Security

### 1. Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### 2. HTTPS

Always use HTTPS in production:

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # ... rest of config
}
```

## Monitoring

### 1. Error Tracking

**Sentry:**
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics

**Google Analytics:**
```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

### 3. Performance Monitoring

```typescript
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

## CI/CD

### GitHub Actions

Already configured in `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

### Automated Deployment

**Deploy to Vercel on push:**
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Rollback Strategy

### 1. Version Tagging

```bash
# Tag release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Rollback to previous version
git checkout v0.9.0
pnpm build
# Deploy
```

### 2. Blue-Green Deployment

Maintain two identical production environments:

```bash
# Deploy to green environment
deploy-to-green.sh

# Test green environment
run-smoke-tests.sh green

# Switch traffic to green
switch-traffic.sh green

# Keep blue as fallback
```

## Health Checks

### 1. Basic Health Check

Create a health check endpoint:

```typescript
// public/health.json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2025-10-13T00:00:00Z"
}
```

### 2. Monitoring Script

```bash
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" https://example.com/health.json)

if [ $response -eq 200 ]; then
    echo "Health check passed"
else
    echo "Health check failed with status $response"
    # Send alert
fi
```

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist .vite
pnpm install
pnpm build
```

### Routing Issues (404 on refresh)

Ensure server redirects all routes to index.html:

**Nginx:**
```nginx
try_files $uri $uri/ /index.html;
```

**Vercel:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables Not Working

- Prefix with `VITE_`
- Rebuild after changing env vars
- Check `.env` files are not in `.gitignore`

## Checklist

- [ ] Run all tests
- [ ] Type check passes
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Preview build locally
- [ ] Environment variables configured
- [ ] Security headers set
- [ ] HTTPS enabled
- [ ] Compression enabled
- [ ] Cache headers configured
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Health checks in place
- [ ] Rollback plan ready

## Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://react.dev/learn/start-a-new-react-project#deploying-to-production)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## Support

For deployment issues, please open an issue on GitHub.
