import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface ValidationError extends Error {
  name: string;
  message: string;
}

interface SequelizeValidationError extends Error {
  name: string;
  message: string;
}

export const errorHandler: ErrorRequestHandler = (
  err: ValidationError | SequelizeValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation error',
      errors: err.message
    });
  } else if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      message: 'Database validation error',
      errors: err.message
    });
  } else {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};