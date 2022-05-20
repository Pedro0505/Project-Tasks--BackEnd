import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import joi from 'joi';
import TasksController from './tasks/controller';
import TasksMiddleware from './tasks/middleware';
import TasksRepository from './tasks/repository';
import TasksRoutes from './tasks/route.routes';
import TaskSchema from './tasks/taskSchema';
import TasksService from './tasks/service';

export default class Factory {
  public static get tasksRouter() {
    const repository = new TasksRepository(new PrismaClient());
    const service = new TasksService(repository);
    const controller = new TasksController(service);
    const schema = new TaskSchema(joi);
    const middleware = new TasksMiddleware(schema);
    const router = new TasksRoutes(Router(), controller, middleware);

    return router.routes;
  }
}
