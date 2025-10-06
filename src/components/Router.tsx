import { useState, ReactNode } from 'react';
import { DocumentMeta } from './DocumentMeta';

export type Route = 'home' | 'dashboard' | 'tasks' | 'about';

interface RouteConfig {
  path: Route;
  title: string;
  description: string;
  keywords?: string;
  component: ReactNode;
}

interface RouterProps {
  routes: RouteConfig[];
  defaultRoute: Route;
}

export function Router({ routes, defaultRoute }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>(defaultRoute);

  const activeRoute = routes.find((r) => r.path === currentRoute) || routes[0];

  return (
    <>
      {/* Document metadata for current route */}
      <DocumentMeta
        title={activeRoute.title}
        description={activeRoute.description}
        keywords={activeRoute.keywords}
      />

      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-2" role="navigation" aria-label="Main navigation">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => setCurrentRoute(route.path)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              currentRoute === route.path
                ? 'bg-primary-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            aria-current={currentRoute === route.path ? 'page' : undefined}
          >
            {route.title}
          </button>
        ))}
      </nav>

      {/* Active route content */}
      <div className="animate-fade-in">
        {activeRoute.component}
      </div>
    </>
  );
}
