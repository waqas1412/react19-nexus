import { use } from 'react';
import type { Activity } from '../lib/dataFetching';

interface ActivityFeedProps {
  activityPromise: Promise<Activity[]>;
}

/**
 * Component demonstrating React 19's use() API with arrays
 */
export function ActivityFeed({ activityPromise }: ActivityFeedProps) {
  const activities = use(activityPromise);

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const getIcon = () => {
    switch (activity.type) {
      case 'completed':
        return '✓';
      case 'created':
        return '+';
      case 'updated':
        return '↻';
    }
  };

  const getColor = () => {
    switch (activity.type) {
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'created':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'updated':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    }
  };

  const formatTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 1000 / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors duration-200">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getColor()} font-bold`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{activity.task}</p>
        <p className="text-sm text-slate-400">{formatTime(activity.timestamp)}</p>
      </div>
    </div>
  );
}
