import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { ErrorResponseDto } from '../types/dtos.js';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      req.body = validated.body || req.body;
      req.query = validated.query || req.query;
      req.params = validated.params || req.params;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorResponse: ErrorResponseDto = {
          error: 'Validation Error',
          message: 'Invalid request data',
          statusCode: 400,
          timestamp: new Date().toISOString(),
          path: req.path,
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
        res.status(400).json(errorResponse);
        return;
      }
      next(error);
    }
  };
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    const errorResponse: ErrorResponseDto = {
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(err.statusCode).json(errorResponse);
    return;
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  const errorResponse: ErrorResponseDto = {
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  res.status(500).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response) => {
  const errorResponse: ErrorResponseDto = {
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404,
    timestamp: new Date().toISOString(),
    path: req.path,
  };
  res.status(404).json(errorResponse);
};
