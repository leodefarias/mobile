import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTasks, saveTasks } from '@/services/taskStorage';
import type { Task, TaskInput } from '@/types/task';
import { generateId } from '@/utils/generateId';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (input: TaskInput) => Promise<Task>;
  updateTask: (id: string, input: TaskInput) => Promise<Task | null>;
  removeTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getTasks().then((stored) => {
      if (!active) {
        return;
      }
      setTasks(stored);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (next: Task[]) => {
    setTasks(next);
    await saveTasks(next);
  }, []);

  const addTask = useCallback(
    async (input: TaskInput): Promise<Task> => {
      const now = new Date().toISOString();
      const created: Task = {
        ...input,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };

      const next = [created, ...tasks];
      await persist(next);
      return created;
    },
    [tasks, persist]
  );

  const updateTask = useCallback(
    async (id: string, input: TaskInput): Promise<Task | null> => {
      const existing = tasks.find((task) => task.id === id);

      if (!existing) {
        return null;
      }

      const updated: Task = {
        ...existing,
        ...input,
        updatedAt: new Date().toISOString(),
      };

      const next = tasks.map((task) => (task.id === id ? updated : task));
      await persist(next);
      return updated;
    },
    [tasks, persist]
  );

  const removeTask = useCallback(
    async (id: string) => {
      const next = tasks.filter((task) => task.id !== id);
      await persist(next);
    },
    [tasks, persist]
  );

  const getTask = useCallback(
    (id: string): Task | undefined => tasks.find((task) => task.id === id),
    [tasks]
  );

  const value = useMemo<TaskContextType>(
    () => ({ tasks, loading, addTask, updateTask, removeTask, getTask }),
    [tasks, loading, addTask, updateTask, removeTask, getTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de TaskProvider');
  }

  return context;
}
