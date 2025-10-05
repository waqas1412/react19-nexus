import { use } from 'react';
import type { UserStats as UserStatsType } from '../lib/dataFetching';

interface UserStatsProps {
  statsPromise: Promise<UserStatsType>;
}

/**
 * Component demonstrating React 19's use() API
 * The use() hook allows components to read the value of a Promise
 */
export function UserStats({ statsPromise }: UserStatsProps) {
  // use() hook suspends the component until the promise resolves
  const stats = use(statsPromise);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total Tasks"
        value={stats.totalTasks}
        icon="📋"
      />
      <StatCard
        label="Completed"
        value={stats.completedTasks}
        icon="✅"
      />
      <StatCard
        label="Active Projects"
        value={stats.activeProjects}
        icon="🚀"
      />
      <StatCard
        label="Productivity"
        value={`${stats.productivity}%`}
        icon="📈"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-primary-500 transition-colors duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
