import { NotFound, Ok } from "../../http-responses"
import { Create } from "../../http-responses/Create"
import { ICreateTask, ITaskCreateParams } from "./ICreateTask"
import { ITasks } from "./ITaskRepository"
import { IUpdateContent, IUpdateStatus } from "./IUpdateTask"

export interface ITaskService {
  getAll(): Promise<Ok<ITasks[]>>
  create({ content, status }: ITaskCreateParams): Promise<Create<ICreateTask>>
  updateContent({ content, id }: IUpdateContent): Promise<Ok<IUpdateContent> | NotFound>
  updateStatus({ status, id }: IUpdateStatus): Promise<Ok<IUpdateStatus> | NotFound>
  deleteTask(id: string): Promise<void | NotFound>
}
