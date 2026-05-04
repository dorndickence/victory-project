import mongoose from 'mongoose';
import AppError from '../controllers/errorController';
import { NextFunction } from 'express';

/**
 * Validates that `id` is a well-formed MongoDB ObjectId.
 * Calls next() with a 400 AppError if not, and returns false.
 * Returns true when the id is valid so callers can continue.
 */
export function validateObjectId(id: string, next: NextFunction): boolean {
  if (!mongoose.isValidObjectId(id)) {
    next(new AppError(`Invalid ID format: ${id}`, 400));
    return false;
  }
  return true;
}
