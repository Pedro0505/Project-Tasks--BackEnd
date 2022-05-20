import express from 'express';
import cors from 'cors';
import Factory from '../domains/factory';
import 'express-async-errors';
import errorHandler from '../domains/middleware/errorHandler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(errorHandler);
    this.app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'] }));
  }

  private routes() {
    this.app.use('/tasks', Factory.tasksRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server listen in port: ${PORT}`));
  }
}

export { App };

export const { app } = new App();
