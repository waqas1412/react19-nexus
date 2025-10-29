/**
 * TasksFeature - Main micro-frontend component
 * Demonstrates React 19 features: Actions, useOptimistic, useActionState
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { TaskFilter } from './components/TaskFilter';
import { createTask, toggleTask, deleteTask } from './services/taskService';
import type { Task, TaskFilter as TFilter } from './types';

export function TasksFeature() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TFilter>('all');

  const handleTaskCreated = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleToggle = async (task: Task) => {
    const updated = await toggleTask(task);
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-5xl font-bold text-neon">
          Task Nexus
        </h1>
        <p className="text-white/60 text-lg">
          Powered by React 19 • useOptimistic • Actions
        </p>
      </motion.div>

      {/* Input */}
      <TaskInput onTaskCreated={handleTaskCreated} createAction={createTask} />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400">{counts.all}</div>
          <div className="text-white/60 text-sm mt-1">Total Tasks</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{counts.active}</div>
          <div className="text-white/60 text-sm mt-1">Active</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-pink-400">{counts.completed}</div>
          <div className="text-white/60 text-sm mt-1">Completed</div>
        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex justify-center">
        <TaskFilter current={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
