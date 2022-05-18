import { Router } from 'express';
import TasksController from './controller';

class TasksRoutes {
  private _controller: TasksController;
  private _route: Router;

  constructor(router: Router, controller: TasksController) {
    this._controller = controller;
    this._route = router;
  }
}

export default TasksRoutes;
