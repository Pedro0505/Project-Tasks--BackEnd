import { NextFunction, Request, Response } from 'express';
import TaskSchema from './schemas/TaskSchema';

export default class TasksMiddleware {
  private _schema: TaskSchema;

  constructor(schema: TaskSchema) {
    this._schema = schema;
  }
  public createValidate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const { error } = this._schema.createTask().validate(req.body);

    const regexStatus = /IN_PROGRESS|DONE|PEDDING/g;

    if (!regexStatus.test(status)) {
      return res.status(400).json({ message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' });
    }

    if (error) {
      const [code, message] = error.message.split('|');
      const codeNum = +code;
      const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
      const validMessage = Number.isNaN(codeNum) ? code : message;
      return res.status(validCode).json({ message: validMessage });
    }

    next();
  };
}
