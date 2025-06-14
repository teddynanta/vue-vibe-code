export type Task = {
    id: number,
    title: string,
    isDone: boolean,
    dueDate: Date,
    completedAt: string | null,
    priority: 'low' | 'medium' | 'high',
  };
