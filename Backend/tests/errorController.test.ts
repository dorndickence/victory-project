/**
 * Unit tests for AppError and globalErrorHandler.
 * These tests run without a database connection.
 */
import AppError, { globalErrorHandler } from '../controllers/errorController';
import { Request, Response, NextFunction } from 'express';

describe('AppError', () => {
  it('creates a 4xx error with status "fail"', () => {
    const err = new AppError('Not found', 404);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe('fail');
    expect(err.isOperational).toBe(true);
    expect(err.message).toBe('Not found');
  });

  it('creates a 5xx error with status "error"', () => {
    const err = new AppError('Server exploded', 500);
    expect(err.statusCode).toBe(500);
    expect(err.status).toBe('error');
  });
});

describe('globalErrorHandler', () => {
  const mockNext: NextFunction = jest.fn();

  const buildRes = () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res as Response;
  };

  it('returns safe error message in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const res = buildRes();
    const err = new AppError('Validation failed', 400);
    globalErrorHandler(err, {} as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'fail', message: 'Validation failed' })
    );

    process.env.NODE_ENV = originalEnv;
  });

  it('returns full error detail in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const res = buildRes();
    const err = new AppError('Debug error', 422);
    globalErrorHandler(err, {} as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Debug error' })
    );

    process.env.NODE_ENV = originalEnv;
  });
});
