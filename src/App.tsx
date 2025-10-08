import { Layout } from './components/Layout';
import { Router } from './components/Router';
import { HomePage } from './components/pages/HomePage';
import { DashboardPage } from './components/pages/DashboardPage';
import { TasksPage } from './components/pages/TasksPage';
import { AboutPage } from './components/pages/AboutPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { SSRPage } from './components/pages/SSRPage';

function App() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <Router
          defaultRoute="home"
          routes={[
            {
              path: 'home',
              title: 'Home',
              description: 'React 19.2.0 showcase - explore the latest features',
              keywords: 'React 19, React 19.2, Actions, useOptimistic, use API',
              component: <HomePage />,
            },
            {
              path: 'dashboard',
              title: 'Dashboard',
              description: 'Interactive dashboard with Suspense and use() API',
              keywords: 'React Suspense, use hook, async data fetching',
              component: <DashboardPage />,
            },
            {
              path: 'tasks',
              title: 'Tasks',
              description: 'Task management with Actions and optimistic updates',
              keywords: 'useActionState, useOptimistic, React forms',
              component: <TasksPage />,
            },
            {
              path: 'about',
              title: 'About',
              description: 'Learn about this React 19 showcase application',
              keywords: 'React 19 features, modern React, best practices',
              component: <AboutPage />,
            },
            {
              path: 'resources',
              title: 'Resources',
              description: 'Resource preloading with preinit, preload, preconnect APIs',
              keywords: 'preinit, preload, preconnect, prefetchDNS, resource hints',
              component: <ResourcesPage />,
            },
            {
              path: 'ssr',
              title: 'SSR Features',
              description: 'Stylesheet precedence and async script handling',
              keywords: 'stylesheet precedence, async scripts, SSR, streaming',
              component: <SSRPage />,
            },
          ]}
        />
      </div>
    </Layout>
  );
}

export default App;
