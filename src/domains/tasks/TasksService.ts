import { NotFound, Ok } from '../http-responses';
import { Create } from '../http-responses/Create';
import { ITaskCreateParams } from './interfaces/ICreateTask';
import { ITaskService } from './interfaces/ITaskService';
import { IUpdateContent, IUpdateStatus } from './interfaces/IUpdateTask';
import TasksRepository from './TasksRepository';

class TasksService implements ITaskService {
  private _repository: TasksRepository;

  constructor(repository: TasksRepository) {
    this._repository = repository;
  }

  public async getAll() {
    const allTasks = await this._repository.getAll();

    return new Ok(allTasks);
  }

  public async create({ content, status = 'PEDDING' }: ITaskCreateParams) {
    const created = await this._repository.create({ content, status });

    return new Create(created);
  }

  public async deleteTask(id: string) {
    const findTask = await this._repository.getTaskById(id);

    if (!findTask) return new NotFound('Task Not Found');

    await this._repository.deleteTask(id);
  }

  public async updateContent({ content, id }: IUpdateContent) {
    const findTask = await this._repository.getTaskById(id);

    if (!findTask) return new NotFound('Task Not Found');

    const updated = await this._repository.updateContent({ content, id });

    return new Ok(updated);
  }

  public async updateStatus({ status, id }: IUpdateStatus) {
    const findTask = await this._repository.getTaskById(id);

    if (!findTask) return new NotFound('Task Not Found');

    const updated = await this._repository.updateStatus({ status, id });

    return new Ok(updated);
  }
}

export default TasksService;
