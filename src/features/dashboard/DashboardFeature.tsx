/**
 * DashboardFeature - Analytics micro-frontend
 * Demonstrates React 19 Suspense and use() API
 */

import { Suspense, use } from 'react';
import { motion } from 'framer-motion';

// Simulated data fetching
function fetchDashboardData() {
  return new Promise<{
    activeUsers: number;
    completionRate: number;
    avgTasksPerDay: number;
    trend: 'up' | 'down';
  }>(resolve => {
    setTimeout(() => {
      resolve({
        activeUsers: 1247,
        completionRate: 87.5,
        avgTasksPerDay: 12.3,
        trend: 'up',
      });
    }, 1000);
  });
}

function DashboardContent() {
  const data = use(fetchDashboardData());

  const metrics = [
    {
      label: 'Active Users',
      value: data.activeUsers.toLocaleString(),
      icon: '👥',
      color: 'from-cyan-400 to-blue-600',
    },
    {
      label: 'Completion Rate',
      value: `${data.completionRate}%`,
      icon: '✓',
      color: 'from-green-400 to-emerald-600',
    },
    {
      label: 'Avg Tasks/Day',
      value: data.avgTasksPerDay.toFixed(1),
      icon: '📊',
      color: 'from-purple-400 to-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card-hover p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{metric.icon}</span>
            <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${metric.color} text-white font-semibold`}>
              {data.trend === 'up' ? '↑' : '↓'} 12%
            </div>
          </div>
          <div className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
            {metric.value}
          </div>
          <div className="text-white/60 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="glass-card p-6 animate-pulse-slow">
          <div className="h-12 w-12 bg-white/10 rounded-full mb-4" />
          <div className="h-10 bg-white/10 rounded mb-2" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function DashboardFeature() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-5xl font-bold text-neon">
          Analytics Dashboard
        </h1>
        <p className="text-white/60 text-lg">
          Real-time insights • React 19 Suspense
        </p>
      </motion.div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
