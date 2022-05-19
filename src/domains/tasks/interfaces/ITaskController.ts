import { NextFunction, Request, Response } from "express";

export interface ITaskController {
  getAll(req: Request, res: Response, next?: NextFunction): Promise<Response>
  create(req: Request, res: Response, next?: NextFunction): Promise<Response>
  updateContent(req: Request, res: Response, next?: NextFunction): Promise<Response>
  updateStatus(req: Request, res: Response, next?: NextFunction): Promise<Response>
  deleteTask(req: Request, res: Response, next?: NextFunction): Promise<Response>
}
