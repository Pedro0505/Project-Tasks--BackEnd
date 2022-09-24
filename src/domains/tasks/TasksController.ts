import { Request, Response } from 'express';
import { ResponseError } from '../http-responses/class';
import { ITaskController } from './interfaces/ITaskController';
import TasksService from './TasksService';

class TasksController implements ITaskController {
  private _service: TasksService;

  constructor(service: TasksService) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const { reponse: { code, data } } = await this._service.getAll();

    return res.status(code).json({ data });
  };

  public create = async (req: Request, res: Response) => {
    const { content, status } = req.body;

    const { reponse: { code, data } } = await this._service.create({ content, status });

    return res.status(code).json({ data });
  };

  public updateContent = async (req: Request, res: Response) => {
    const { content } = req.body;
    const { id } = req.params;

    const { reponse: { code, data } } = await this._service.updateContent({ content, id });

    return res.status(code).json({ data });
  };

  public updateStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    const { id } = req.params;

    const { reponse: { code, data } } = await this._service.updateStatus({ id, status });

    return res.status(code).json({ data });
  };

  public deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const reponse = await this._service.deleteTask(id);

    if (reponse instanceof ResponseError) {
      const { reponse: { code, data } } = reponse;

      return res.status(code).json({ data });
    }

    return res.status(204).end();
  };
}

export default TasksController;
