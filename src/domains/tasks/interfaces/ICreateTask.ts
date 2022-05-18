type tasksStatus = 'PEDDING' | 'IN_PROGRESS' | 'DONE';

export interface ITaskCreateParams {
  content: string;
  status: tasksStatus;
}
