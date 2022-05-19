import { Request, Response } from 'express';
import { ITaskController } from './interfaces/ITaskController';
import TasksService from './service';

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
}

export default TasksController;
