import TasksRepository from './repository';

class TasksService {
  private _repository: TasksRepository;

  constructor(repository: TasksRepository) {
    this._repository = repository;
  }
}

export default TasksService;
