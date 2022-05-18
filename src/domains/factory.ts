import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import TasksController from './tasks/controller';
import TasksRepository from './tasks/repository';
import TasksRoutes from './tasks/route.routes';
import TasksService from './tasks/service';

export default class Factory {
  public static get tasksRouter() {
    const repository = new TasksRepository(new PrismaClient());
    const service = new TasksService(repository);
    const controller = new TasksController(service);
    const router = new TasksRoutes(Router(), controller);

    return router;
  }
}
