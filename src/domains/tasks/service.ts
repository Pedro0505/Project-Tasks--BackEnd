import { Ok } from '../http-responses';
import TasksRepository from './repository';

class TasksService {
  private _repository: TasksRepository;

  constructor(repository: TasksRepository) {
    this._repository = repository;
  }

  public async getAll() {
    const allTasks = await this._repository.getAll();

    return new Ok(allTasks);
  }
}

export default TasksService;
