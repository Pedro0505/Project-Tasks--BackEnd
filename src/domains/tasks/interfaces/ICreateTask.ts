import tasksStatus from "./taskStatus";

export interface ITaskCreateParams {
  content: string;
  status: tasksStatus;
}
