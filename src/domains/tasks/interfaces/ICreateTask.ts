import { ITaskId } from "./ITaskRepository";
import tasksStatus from "./taskStatus";

export interface ITaskCreateParams {
  content: string;
  status: tasksStatus;
}

export interface ICreateTask extends ITaskId {
  content: string;
  status: tasksStatus
}
