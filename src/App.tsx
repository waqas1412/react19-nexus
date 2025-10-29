/**
 * App - Main application with micro-frontend routing
 */

import { lazy, Suspense, useState } from 'react';
import { AppShell } from './shell/components/AppShell';
import { motion } from 'framer-motion';

// Lazy load micro-frontends
const TasksFeature = lazy(() =>
  import('./features/tasks').then(m => ({ default: m.TasksFeature }))
);

const DashboardFeature = lazy(() =>
  import('./features/dashboard/DashboardFeature').then(m => ({
    default: m.DashboardFeature,
  }))
);

type Route = 'tasks' | 'dashboard';

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto">
          <div className="w-full h-full border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
        <p className="text-white/60">Loading feature...</p>
      </div>
    </div>
  );
}

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('tasks');

  const routes: { id: Route; label: string; icon: string }[] = [
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <AppShell>
      {/* Route navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="glass-card p-2 inline-flex gap-2">
          {routes.map(route => {
            const isActive = currentRoute === route.id;
            return (
              <button
                key={route.id}
                onClick={() => setCurrentRoute(route.id)}
                className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRoute"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg glow-cyan"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">{route.icon}</span>
                  {route.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature content */}
      <Suspense fallback={<LoadingFallback />}>
        {currentRoute === 'tasks' && <TasksFeature />}
        {currentRoute === 'dashboard' && <DashboardFeature />}
      </Suspense>
    </AppShell>
  );
}

export default App;
