import { ITaskCreateParams } from './ICreateTask';

export type tasksStatus = 'PEDDING' | 'IN_PROGRESS' | 'DONE';

export interface ITasks {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tasksStatus: tasksStatus;
}

export interface ITaskId {
  id: string;
}

export interface ICreateTask extends ITaskId {
  content: string;
  status: tasksStatus
}

export interface IUpdateContent extends ITaskId {
  content: string;
}

export interface IUpdateStatus extends ITaskId {
  status: tasksStatus;
}

export interface ITaskRepository {
  getAll(): Promise<ITasks[]>;
  getTaskById(id: string): Promise<ITasks | null>;
  create({ content, status }: ITaskCreateParams): Promise<ICreateTask>;
  updateContent({ content, id }: IUpdateContent): Promise<IUpdateContent>;
  updateStatus({ status, id }: IUpdateStatus): Promise<IUpdateStatus>;
  deleteTask(id: string): Promise<void>;
}
