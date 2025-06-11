export type Task = {
    id: number,
    title: string,
    isDone: boolean,
    dueDate: string | null,
    completedAt: string | null,
    priority: 'low' | 'medium' | 'high',
  };
