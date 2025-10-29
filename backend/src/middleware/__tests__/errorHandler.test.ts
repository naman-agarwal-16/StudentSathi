import { Request, Response } from 'express';
import { z } from 'zod';
import {
  AppError,
  asyncHandler,
  validateRequest,
  errorHandler,
  notFoundHandler,
} from '../errorHandler.js';

describe('Error Handling Middleware', () => {
  describe('AppError', () => {
    it('should create an AppError with status code and message', () => {
      const error = new AppError(404, 'Not found');
      
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not found');
      expect(error.isOperational).toBe(true);
    });

    it('should allow setting isOperational to false', () => {
      const error = new AppError(500, 'Internal error', false);
      
      expect(error.isOperational).toBe(false);
    });
  });

  describe('asyncHandler', () => {
    it('should wrap async functions and catch errors', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Async error'));
      const mockNext = jest.fn();
      const mockReq = {} as Request;
      const mockRes = {} as Response;

      const wrappedFn = asyncHandler(mockFn);
      await wrappedFn(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should pass through successfully resolved functions', async () => {
      const mockFn = jest.fn().mockResolvedValue(undefined);
      const mockNext = jest.fn();
      const mockReq = {} as Request;
      const mockRes = {} as Response;

      const wrappedFn = asyncHandler(mockFn);
      await wrappedFn(mockReq, mockRes, mockNext);

      expect(mockFn).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateRequest', () => {
    it('should validate request and call next on valid data', () => {
      const schema = z.object({
        body: z.object({ name: z.string() }),
      });

      const mockReq = {
        body: { name: 'John' },
        query: {},
        params: {},
        path: '/test',
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      const middleware = validateRequest(schema);
      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 400 with validation error for invalid data', () => {
      const schema = z.object({
        body: z.object({ email: z.string().email() }),
      });

      const mockReq = {
        body: { email: 'invalid-email' },
        query: {},
        params: {},
        path: '/test',
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      const middleware = validateRequest(schema);
      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Validation Error',
          statusCode: 400,
          details: expect.any(Array),
        })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should pass non-Zod errors to next', () => {
      const schema = z.object({
        body: z.object({ name: z.string() }),
      });

      // Mock schema.parse to throw a non-Zod error
      jest.spyOn(schema, 'parse').mockImplementation(() => {
        throw new Error('Non-Zod error');
      });

      const mockReq = {
        body: { name: 'John' },
        query: {},
        params: {},
        path: '/test',
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      const middleware = validateRequest(schema);
      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('errorHandler', () => {
    it('should handle AppError and return appropriate response', () => {
      const error = new AppError(404, 'Resource not found');
      const mockReq = { path: '/test' } as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Error',
          message: 'Resource not found',
          statusCode: 404,
          path: '/test',
        })
      );
    });

    it('should handle generic errors and return 500', () => {
      const error = new Error('Unexpected error');
      const mockReq = { path: '/test' } as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      // Set NODE_ENV to test to see error message
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Internal Server Error',
          message: 'Unexpected error',
          statusCode: 500,
        })
      );

      process.env.NODE_ENV = originalEnv;
    });

    it('should hide error details in production', () => {
      const error = new Error('Secret error');
      const mockReq = { path: '/test' } as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      // Set NODE_ENV to production
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      errorHandler(error, mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'An unexpected error occurred',
        })
      );

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('notFoundHandler', () => {
    it('should return 404 for non-existent routes', () => {
      const mockReq = {
        method: 'GET',
        path: '/non-existent',
      } as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      notFoundHandler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Not Found',
          message: 'Route GET /non-existent not found',
          statusCode: 404,
        })
      );
    });
  });
});
