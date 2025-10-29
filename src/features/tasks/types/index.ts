export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  updatedAt: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  highPriority: number;
}
