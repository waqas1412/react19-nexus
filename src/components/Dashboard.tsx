import { Suspense } from 'react';
import { UserStats } from './UserStats';
import { ActivityFeed } from './ActivityFeed';
import { fetchUserStats, fetchActivityFeed } from '../lib/dataFetching';

/**
 * Dashboard demonstrating React 19's Suspense with use() API
 * Each section can load independently with its own loading state
 */
export function Dashboard() {
  // Create promises outside of components to avoid recreating on each render
  const statsPromise = fetchUserStats();
  const activityPromise = fetchActivityFeed();

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-2xl font-bold text-white mb-4">
          Dashboard
          <span className="ml-3 text-sm font-normal text-primary-400">
            with Suspense & use() API
          </span>
        </h3>
        
        <Suspense fallback={<StatsLoadingSkeleton />}>
          <UserStats statsPromise={statsPromise} />
        </Suspense>
      </section>

      <section>
        <h4 className="text-xl font-bold text-white mb-4">Recent Activity</h4>
        <Suspense fallback={<ActivityLoadingSkeleton />}>
          <ActivityFeed activityPromise={activityPromise} />
        </Suspense>
      </section>
    </div>
  );
}

function StatsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="h-8 bg-slate-600 rounded mb-2"></div>
          <div className="h-4 bg-slate-600 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

function ActivityLoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <div className="w-8 h-8 rounded-full bg-slate-600"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            <div className="h-3 bg-slate-600 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
