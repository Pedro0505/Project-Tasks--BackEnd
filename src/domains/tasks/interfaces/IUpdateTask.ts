import { ITaskId } from "./ITaskRepository";
import tasksStatus from "./taskStatus";

export interface IUpdateContent extends ITaskId {
  content: string;
}

export interface IUpdateStatus extends ITaskId {
  status: tasksStatus;
}
