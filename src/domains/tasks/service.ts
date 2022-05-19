import { Ok } from '../http-responses';
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
}

export default TasksService;
