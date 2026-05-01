export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type TaskFilter = TaskStatus | 'todas';

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};

export const TASK_PRIORITY_LABEL: Record<TaskPriority, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

export const TASK_CATEGORIES: { name: string; icon: string }[] = [
  { name: 'Trabalho', icon: '💼' },
  { name: 'Estudos', icon: '📚' },
  { name: 'Casa', icon: '🏠' },
  { name: 'Saúde', icon: '🩺' },
  { name: 'Lazer', icon: '🎮' },
  { name: 'Compras', icon: '🛒' },
];
