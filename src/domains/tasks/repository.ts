import { PrismaClient } from '@prisma/client';

class TasksRepository {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }
}

export default TasksRepository;
