export interface ITasks {
  id: string;
  content: string;
  updatedAt?: Date;
  createdAt?: Date;
  tasksStatus?: 'PEDDING' | 'DONE' | 'IN_PROGRESS';
}
