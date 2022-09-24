import OrmInjection from '../class/OrmInjection';
import { ITaskCreateParams } from './interfaces/ICreateTask';
import { ITaskRepository } from './interfaces/ITaskRepository';
import { IUpdateContent, IUpdateStatus } from './interfaces/IUpdateTask';

class TasksRepository implements ITaskRepository {
  private _prisma: OrmInjection;

  constructor(prisma: OrmInjection) {
    this._prisma = prisma;
  }

  public async getAll() {
    const getAll = await this._prisma.tasks.findMany({ orderBy: { createdAt: 'asc' } });

    return getAll;
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
    await this._prisma.tasks.delete({ where: { id } });
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
    const task = await this._prisma.tasks.findUnique({ where: { id } });

    return task;
  }
}

export default TasksRepository;
