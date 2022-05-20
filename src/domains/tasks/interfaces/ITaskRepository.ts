import { ICreateTask, ITaskCreateParams } from './ICreateTask';
import { IUpdateContent, IUpdateStatus } from './IUpdateTask';
import tasksStatus from './taskStatus';

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

export interface ITaskRepository {
  getAll(): Promise<ITasks[]>;
  getTaskById(id: string): Promise<ITasks | null>;
  create({ content, status }: ITaskCreateParams): Promise<ICreateTask>;
  updateContent({ content, id }: IUpdateContent): Promise<IUpdateContent>;
  updateStatus({ status, id }: IUpdateStatus): Promise<IUpdateStatus>;
  deleteTask(id: string): Promise<void>;
}
