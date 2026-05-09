/**
 * Unit tests for teacherController handlers.
 * Mocks the Teacher model to avoid a real database connection.
 */
import { Request, Response, NextFunction } from 'express';
import AppError from '../controllers/errorController';

// ── Mock Prisma ──────────────────────────────────────────────────────────────
// Use valid UUIDs so validateObjectId passes.
const ID1 = '11111111-1111-4111-8111-111111111111';
const ID2 = '22222222-2222-4222-8222-222222222222';
const MISSING_ID = '33333333-3333-4333-8333-333333333333';
const NEW_ID = '44444444-4444-4444-8444-444444444444';

const mockTeachers = [
  { id: ID1, name: 'Mr. Smith', subject: 'Mathematics', experience: 10, status: 'Active' },
  { id: ID2, name: 'Ms. Jones', subject: 'Science', experience: 8, status: 'Active' },
];

jest.mock('../lib/prisma', () => ({
  __esModule: true,
  default: {
    teacher: {
      findMany: jest.fn().mockResolvedValue(mockTeachers),
      findUnique: jest.fn().mockImplementation(({ where }: { where: { id: string } }) =>
        Promise.resolve(mockTeachers.find(t => t.id === where.id) ?? null)
      ),
      create: jest.fn().mockImplementation(({ data }: { data: object }) =>
        Promise.resolve({ id: NEW_ID, ...data })
      ),
      update: jest.fn().mockImplementation(({ where, data }: { where: { id: string }; data: object }) => {
        const teacher = mockTeachers.find(t => t.id === where.id);
        return Promise.resolve(teacher ? { ...teacher, ...data } : null);
      }),
      delete: jest.fn().mockResolvedValue({}),
    },
  },
}));

import {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController';

// ── Helpers ──────────────────────────────────────────────────────────────────
const buildRes = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as Response;
};

const mockNext: NextFunction = jest.fn();

// ── Tests ────────────────────────────────────────────────────────────────────
describe('getAllTeachers', () => {
  it('returns all teachers with status 200', async () => {
    const res = buildRes();
    await getAllTeachers({} as Request, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        results: mockTeachers.length,
        data: expect.objectContaining({ teachers: mockTeachers }),
      })
    );
  });
});

describe('getTeacher', () => {
  it('returns a teacher when found', async () => {
    const req = { params: { id: ID1 } } as unknown as Request;
    const res = buildRes();
    await getTeacher(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success' })
    );
  });

  it('calls next with 404 AppError when teacher is not found', async () => {
    const req = { params: { id: MISSING_ID } } as unknown as Request;
    const res = buildRes();
    const next = jest.fn() as NextFunction;
    await getTeacher(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const err = (next as jest.Mock).mock.calls[0][0] as AppError;
    expect(err.statusCode).toBe(404);
  });
});

describe('createTeacher', () => {
  it('creates a teacher and returns 201', async () => {
    const req = {
      body: { id: 'T03', name: 'Dr. Taylor', subject: 'History', experience: 15, status: 'Active' }
    } as unknown as Request;
    const res = buildRes();
    await createTeacher(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success' })
    );
  });
});

describe('updateTeacher', () => {
  it('updates allowed fields and returns the updated teacher', async () => {
    const req = {
      params: { id: ID1 },
      body: { subject: 'Advanced Mathematics' }
    } as unknown as Request;
    const res = buildRes();
    await updateTeacher(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success' })
    );
  });

  it('calls next with 404 when teacher not found', async () => {
    const req = {
      params: { id: MISSING_ID },
      body: { subject: 'Physics' }
    } as unknown as Request;
    const res = buildRes();
    const next = jest.fn() as NextFunction;
    await updateTeacher(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
  });
});

describe('deleteTeacher', () => {
  it('deletes a teacher and returns 204', async () => {
    const req = { params: { id: ID1 } } as unknown as Request;
    const res = buildRes();
    await deleteTeacher(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('calls next with 404 when teacher not found', async () => {
    const req = { params: { id: MISSING_ID } } as unknown as Request;
    const res = buildRes();
    const next = jest.fn() as NextFunction;
    await deleteTeacher(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
  });
});
