import { Router } from 'express';
import joi from 'joi';
import TasksController from './tasks/TasksController';
import TasksMiddleware from './tasks/TasksMiddleware';
import TasksRepository from './tasks/TasksRepository';
import TasksRoutes from './tasks/TasksRoutes';
import TaskSchema from './tasks/TaskSchema';
import TasksService from './tasks/TasksService';
import OrmInjection from './class/OrmInjection';

export default class Factory {
  public static get tasksRouter() {
    const repository = new TasksRepository(new OrmInjection());
    const service = new TasksService(repository);
    const controller = new TasksController(service);
    const schema = new TaskSchema(joi);
    const middleware = new TasksMiddleware(schema);
    const router = new TasksRoutes(Router(), controller, middleware);

    return router.routes;
  }
}
