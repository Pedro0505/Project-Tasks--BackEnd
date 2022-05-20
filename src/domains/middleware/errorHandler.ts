import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);

  return res.status(500).json({ message: 'Something unexpected happened, try again later' });
};

export default errorHandler;
