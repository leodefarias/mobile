import { useMemo } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import type { Task, TaskFilter } from '@/types/task';

export interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  filtered: Task[];
  addTask: ReturnType<typeof useTaskContext>['addTask'];
  updateTask: ReturnType<typeof useTaskContext>['updateTask'];
  removeTask: ReturnType<typeof useTaskContext>['removeTask'];
  getTask: ReturnType<typeof useTaskContext>['getTask'];
}

export function useTasks(filter: TaskFilter = 'todas', search = ''): UseTasksResult {
  const { tasks, loading, addTask, updateTask, removeTask, getTask } =
    useTaskContext();

  const filtered = useMemo<Task[]>(() => {
    const term = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const statusOk = filter === 'todas' ? true : task.status === filter;

      if (!statusOk) {
        return false;
      }

      if (!term) {
        return true;
      }

      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.category.toLowerCase().includes(term)
      );
    });
  }, [tasks, filter, search]);

  return { tasks, loading, filtered, addTask, updateTask, removeTask, getTask };
}
