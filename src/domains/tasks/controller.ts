import { Request, Response } from 'express';
import TasksService from './service';

class TasksController {
  private _service: TasksService;

  constructor(service: TasksService) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const { reponse: { code, data } } = await this._service.getAll();

    return res.status(code).json({ data });
  };
}

export default TasksController;
