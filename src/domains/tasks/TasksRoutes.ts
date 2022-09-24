import { Router } from 'express';
import TasksController from './TasksController';
import TasksMiddleware from './TasksMiddleware';

class TasksRoutes {
  private _controller: TasksController;
  private _route: Router;
  private _middleware: TasksMiddleware;

  constructor(router: Router, controller: TasksController, middleware: TasksMiddleware) {
    this._controller = controller;
    this._route = router;
    this._middleware = middleware;

    this._route.get(
      '/',
      this._controller.getAll,
    );

    this._route.delete(
      '/:id',
      this._controller.deleteTask,
    );

    this._route.patch(
      '/content/:id',
      this._middleware.updateContentValidate,
      this._controller.updateContent,
    );

    this._route.patch(
      '/status/:id',
      this._middleware.updateStatusValidate,
      this._controller.updateStatus,
    );

    this._route.post(
      '/',
      this._middleware.createValidate,
      this._controller.create,
    );
  }

  public get routes() {
    return this._route;
  }
}

export default TasksRoutes;
