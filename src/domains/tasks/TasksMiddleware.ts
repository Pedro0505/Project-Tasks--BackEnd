import { NextFunction, Request, Response } from 'express';
import Middleware from '../class/Middleware';
import TaskSchema from './TaskSchema';

class TasksMiddleware extends Middleware {
  private _schema: TaskSchema;

  constructor(schema: TaskSchema) {
    super();
    this._schema = schema;
  }

  public createValidate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const { error } = this._schema.createTask().validate(req.body);

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ message });
    }

    const regexStatus = /IN_PROGRESS|DONE|PEDDING/g;

    if (status) {
      if (!regexStatus.test(status)) {
        return res.status(400).json({ message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' });
      }
    }

    next();
  };

  public updateContentValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this._schema.updateContent().validate(req.body);

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ message });
    }

    next();
  };

  public updateStatusValidate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const { error } = this._schema.updateStatus().validate(req.body);

    if (error) {
      const { code, message } = super.handleError(error.message.split('|'));
      return res.status(code).json({ message });
    }

    const regexStatus = /IN_PROGRESS|DONE|PEDDING/g;

    if (!regexStatus.test(status)) {
      return res.status(400).json({ message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' });
    }

    next();
  };
}

export default TasksMiddleware;
