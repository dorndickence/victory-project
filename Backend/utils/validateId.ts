import AppError from '../controllers/errorController';
import { NextFunction } from 'express';

/**
 * Validates that `id` is a well-formed UUID.
 * Calls next() with a 400 AppError if not, and returns false.
 * Returns true when the id is valid so callers can continue.
 */
export function validateObjectId(id: string, next: NextFunction): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    next(new AppError(`Invalid ID format: ${id}`, 400));
    return false;
  }
  return true;
}
