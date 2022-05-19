import { Router } from 'express';
import TasksController from './controller';

class TasksRoutes {
  private _controller: TasksController;
  private _route: Router;

  constructor(router: Router, controller: TasksController) {
    this._controller = controller;
    this._route = router;

    this._route.get('/', this._controller.getAll);
  }

  public get routes() {
    return this._route;
  }
}

export default TasksRoutes;
