/**
 * Simulates fetching user statistics from an API
 * Demonstrates React 19's use() API with Promises
 */
export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  activeProjects: number;
  productivity: number;
}

export function fetchUserStats(): Promise<UserStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalTasks: 42,
        completedTasks: 28,
        activeProjects: 5,
        productivity: 67,
      });
    }, 1500);
  });
}

/**
 * Simulates fetching activity feed
 */
export interface Activity {
  id: string;
  type: 'completed' | 'created' | 'updated';
  task: string;
  timestamp: number;
}

export function fetchActivityFeed(): Promise<Activity[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'completed',
          task: 'Review pull request',
          timestamp: Date.now() - 1000 * 60 * 5,
        },
        {
          id: '2',
          type: 'created',
          task: 'Update documentation',
          timestamp: Date.now() - 1000 * 60 * 15,
        },
        {
          id: '3',
          type: 'updated',
          task: 'Fix bug in login flow',
          timestamp: Date.now() - 1000 * 60 * 30,
        },
        {
          id: '4',
          type: 'completed',
          task: 'Deploy to staging',
          timestamp: Date.now() - 1000 * 60 * 60,
        },
      ]);
    }, 1000);
  });
}

/**
 * Create a resource that can be used with React's use() hook
 * This pattern allows for suspense-compatible data fetching
 */
export function createResource<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      }
      return result;
    },
  };
}
