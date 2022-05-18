import { PrismaClient } from '@prisma/client';
import { ITaskCreateParams } from './interfaces/ICreateTask';
import { ITaskRepository, IUpdateContent, IUpdateStatus } from './interfaces/ITaskRepository';

class TasksRepository implements ITaskRepository {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async getAll() {
    return await this._prisma.tasks.findMany();
  }

  public async create({ content, status }: ITaskCreateParams) {
    const created = await this._prisma.tasks.create({ data: { content, tasksStatus: status } });

    return {
      id: created.id,
      content,
      status,
    };
  }

  public async deleteTask(id: string) {
    this._prisma.tasks.delete({ where: { id } });
  }

  public async updateStatus({ status, id }: IUpdateStatus) {
    const updated = await this._prisma.tasks.update({
      data: { tasksStatus: status },
      where: { id },
    });

    return { id: updated.id, status: updated.tasksStatus };
  }

  public async updateContent({ content, id }: IUpdateContent) {
    const updated = await this._prisma.tasks.update({ data: { content }, where: { id } });

    return {
      id: updated.id,
      content: updated.content,
    };
  }

  public async getTaskById(id: string) {
    return await this._prisma.tasks.findUnique({ where: { id } });
  }
}

export default TasksRepository;
