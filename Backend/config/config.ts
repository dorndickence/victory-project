import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Fail fast: DATABASE_URL must be set in production.
if (!process.env.DATABASE_URL && NODE_ENV === 'production') {
  console.error('FATAL ERROR: DATABASE_URL environment variable is not set.');
  process.exit(1);
}

// Fail fast: JWT_SECRET must be explicitly set in production.
if (!process.env.JWT_SECRET && NODE_ENV === 'production') {
  console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
  process.exit(1);
}
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me';