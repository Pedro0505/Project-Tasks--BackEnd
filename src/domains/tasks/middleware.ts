/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import TaskSchema from './taskSchema';

export default class TasksMiddleware {
  private _schema: TaskSchema;

  constructor(schema: TaskSchema) {
    this._schema = schema;
  }

  public createValidate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const { error } = this._schema.createTask().validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      const codeNum = +code;
      const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
      const validMessage = Number.isNaN(codeNum) ? code : message;
      return res.status(validCode).json({ message: validMessage });
    }

    const regexStatus = /IN_PROGRESS|DONE|PEDDING/g;

    if (!regexStatus.test(status)) {
      return res.status(400).json({ message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' });
    }

    next();
  };

  public updateContentValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this._schema.updateContent().validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      const codeNum = +code;
      const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
      const validMessage = Number.isNaN(codeNum) ? code : message;
      return res.status(validCode).json({ message: validMessage });
    }

    next();
  };

  public updateStatusValidate = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;

    const { error } = this._schema.updateStatus().validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      const codeNum = +code;
      const validCode = Number.isNaN(codeNum) ? 400 : codeNum;
      const validMessage = Number.isNaN(codeNum) ? code : message;
      return res.status(validCode).json({ message: validMessage });
    }

    const regexStatus = /IN_PROGRESS|DONE|PEDDING/g;

    if (!regexStatus.test(status)) {
      return res.status(400).json({ message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' });
    }

    next();
  };
}
