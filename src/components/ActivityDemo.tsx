import { useState } from 'react';

/**
 * React 19.2 introduces <Activity/> component for view transitions
 * 
 * Note: As of React 19.2, this is an experimental feature
 * The Activity component helps manage warm/hidden view states
 * for better performance in navigation and view transitions
 * 
 * Concept:
 * - "warm" state: Component is mounted but hidden (fast to show)
 * - "visible" state: Component is visible
 * - "hidden" state: Component is hidden but can be quickly shown
 * 
 * This demo simulates the concept with manual state management
 */

type ViewState = 'visible' | 'warm' | 'hidden';

interface View {
  id: string;
  title: string;
  content: string;
  color: string;
}

const views: View[] = [
  {
    id: 'home',
    title: 'Home View',
    content: 'This is the home view. Switch between views to see smooth transitions.',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'profile',
    title: 'Profile View',
    content: 'User profile information would be displayed here with instant loading.',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'settings',
    title: 'Settings View',
    content: 'Application settings and preferences can be configured here.',
    color: 'from-green-600 to-green-800',
  },
];

export function ActivityDemo() {
  const [activeViewId, setActiveViewId] = useState('home');
  const [viewStates, setViewStates] = useState<Record<string, ViewState>>({
    home: 'visible',
    profile: 'warm',
    settings: 'warm',
  });

  const switchView = (viewId: string) => {
    setViewStates((prev) => ({
      ...prev,
      [activeViewId]: 'warm', // Previous view becomes warm
      [viewId]: 'visible', // New view becomes visible
    }));
    setActiveViewId(viewId);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        Activity Component
        <span className="ml-3 text-sm font-normal text-primary-400">
          View Transitions (Experimental)
        </span>
      </h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-white mb-3">
            Concept: Warm/Hidden Views
          </h3>
          <p className="text-slate-300 mb-4">
            The Activity component allows views to remain "warm" (mounted but hidden) for instant transitions.
            This eliminates loading delays when switching between frequently accessed views.
          </p>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="font-semibold text-green-400 mb-1">✓ Visible</div>
              <p className="text-xs text-slate-300">Currently displayed view</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="font-semibold text-yellow-400 mb-1">⏸ Warm</div>
              <p className="text-xs text-slate-300">Mounted but hidden, ready to show</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
              <div className="font-semibold text-slate-400 mb-1">○ Hidden</div>
              <p className="text-xs text-slate-300">Unmounted, needs loading</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">
            Interactive Demo
          </h3>

          {/* View Tabs */}
          <div className="flex gap-2 mb-4">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => switchView(view.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeViewId === view.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {view.title}
                <span className="ml-2 text-xs opacity-75">
                  {viewStates[view.id] === 'visible' && '●'}
                  {viewStates[view.id] === 'warm' && '⏸'}
                  {viewStates[view.id] === 'hidden' && '○'}
                </span>
              </button>
            ))}
          </div>

          {/* View Content */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            {views.map((view) => (
              <div
                key={view.id}
                className={`absolute inset-0 transition-all duration-300 ${
                  viewStates[view.id] === 'visible'
                    ? 'opacity-100 translate-x-0'
                    : viewStates[view.id] === 'warm'
                    ? 'opacity-0 -translate-x-full pointer-events-none'
                    : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                <div className={`h-full bg-gradient-to-br ${view.color} p-8 flex flex-col justify-center items-center text-center`}>
                  <h4 className="text-3xl font-bold text-white mb-4">{view.title}</h4>
                  <p className="text-lg text-white/90 max-w-md">{view.content}</p>
                  <div className="mt-6 text-sm text-white/70">
                    State: <span className="font-semibold">{viewStates[view.id]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">
            Benefits
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-green-400 font-semibold mb-2">⚡ Instant Transitions</div>
              <p className="text-sm text-slate-300">
                No loading delay when switching between warm views
              </p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-blue-400 font-semibold mb-2">💾 State Preservation</div>
              <p className="text-sm text-slate-300">
                Component state is maintained in warm views
              </p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-yellow-400 font-semibold mb-2">🎯 Better UX</div>
              <p className="text-sm text-slate-300">
                Smooth navigation without loading spinners
              </p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-purple-400 font-semibold mb-2">⚙️ Optimized Performance</div>
              <p className="text-sm text-slate-300">
                Reduced re-renders and component initialization
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-white mb-3">
            Usage Pattern (Conceptual)
          </h3>

          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-slate-300">
              <div className="text-gray-500">// React 19.2 Activity component (experimental)</div>
              <div className="text-blue-400">import</div> {'{ Activity }'} <div className="text-blue-400">from</div> <div className="text-orange-400">'react'</div>;
              <br /><br />
              <div className="text-blue-400">function</div> <div className="text-yellow-400">App</div>() {'{'}
              <div className="ml-4">
                <div className="text-blue-400">return</div> (
                <div className="ml-4">
                  {'<>'}
                  <div className="ml-4">
                    <div className="text-gray-500">{'// Visible view'}</div>
                    {'<'}<div className="text-green-400">Activity</div> <div className="text-blue-400">mode</div>=<div className="text-orange-400">"visible"</div>{'>'}<br />
                    <div className="ml-4">{'<'}<div className="text-green-400">HomeView</div> /{'>'}</div>
                    {'</'}<div className="text-green-400">Activity</div>{'>'}
                    <br /><br />
                    <div className="text-gray-500">{'// Warm view (mounted but hidden)'}</div>
                    {'<'}<div className="text-green-400">Activity</div> <div className="text-blue-400">mode</div>=<div className="text-orange-400">"warm"</div>{'>'}<br />
                    <div className="ml-4">{'<'}<div className="text-green-400">ProfileView</div> /{'>'}</div>
                    {'</'}<div className="text-green-400">Activity</div>{'>'}
                  </div>
                  {'</>'}
                </div>
                );
              </div>
              {'}'}
            </code>
          </div>
        </section>

        <section className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-300 mb-2">
            ⚠️ Experimental Feature
          </h4>
          <p className="text-sm text-slate-300">
            The Activity component is experimental in React 19.2. The API may change in future releases.
            This demo shows the concept using manual state management. Check the official React documentation
            for the latest implementation details.
          </p>
        </section>
      </div>
    </div>
  );
}
