type tasksStatus = 'PEDDING' | 'IN_PROGRESS' | 'DONE';

export interface ITasks {
  id: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasksStatus: tasksStatus;
}