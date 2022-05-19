import { NotFound, Ok } from '../http-responses';
import { Create } from '../http-responses/Create';
import { ITaskCreateParams } from './interfaces/ICreateTask';
import { ITaskService } from './interfaces/ITaskService';
import TasksRepository from './repository';

class TasksService implements ITaskService {
  private _repository: TasksRepository;

  constructor(repository: TasksRepository) {
    this._repository = repository;
  }

  public async getAll() {
    const allTasks = await this._repository.getAll();

    return new Ok(allTasks);
  }

  public async create({ content, status }: ITaskCreateParams) {
    const created = await this._repository.create({ content, status });

    return new Create(created);
  }

  public async deleteTask(id: string) {
    const findTask = this._repository.getTaskById(id);

    if (!findTask) return new NotFound('Task Not Found');

    await this._repository.deleteTask(id);
  }
}

export default TasksService;
