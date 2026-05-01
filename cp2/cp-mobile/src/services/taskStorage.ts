import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '@/types/task';

const KEY = '@taskflow:tasks';

export async function getTasks(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}

export async function clearTasks(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
