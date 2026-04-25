import { Request, Response, NextFunction } from 'express';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import FeeRecord from '../models/FeeRecord';
import AttendanceRecord from '../models/AttendanceRecord';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalStudents, totalTeachers, feeRecords, attendanceRecords] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      FeeRecord.find().sort({ month: 1 }),
      AttendanceRecord.find().sort({ month: 1 })
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
