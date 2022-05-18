import TasksService from './service';

class TasksController {
  private _service: TasksService;

  constructor(service: TasksService) {
    this._service = service;
  }
}

export default TasksController;
