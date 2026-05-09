import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalStudents, totalTeachers, feeRecords, attendanceRecords] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.feeRecord.findMany({ orderBy: { month: 'asc' } }),
      prisma.attendanceRecord.findMany({ orderBy: { month: 'asc' } })
    ]);

    const totalRevenue = feeRecords.reduce((sum, r) => sum + r.collected, 0);

    res.status(200).json({
      status: 'success',
      data: {
        totalStudents,
        totalTeachers,
        totalRevenue,
        feeRecords,
        attendanceRecords
      }
    });
  } catch (err) {
    next(err);
  }
};
