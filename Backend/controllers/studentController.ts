import { Request, Response, NextFunction } from 'express';
import AppError from './errorController';
import prisma from '../lib/prisma';

const mapStudent = (student: { className: string } & Record<string, unknown>) => {
  const { className, ...rest } = student;
  return { ...rest, class: className };
};

export const getAllStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: { students: students.map(mapStudent) }
    });
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { student: mapStudent(student) }
    });
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, class: studentClass, rollNo, feesDue, attendance, avatar, status } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        name,
        className: studentClass,
        rollNo,
        feesDue,
        attendance,
        avatar,
        status
      }
    });
    res.status(201).json({
      status: 'success',
      data: { student: mapStudent(newStudent) }
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only allow specific fields to be updated to prevent mass-assignment
    const { name, class: studentClass, rollNo, feesDue, attendance, avatar, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (name !== undefined) allowedUpdates.name = name;
    if (studentClass !== undefined) allowedUpdates.className = studentClass;
    if (rollNo !== undefined) allowedUpdates.rollNo = rollNo;
    if (feesDue !== undefined) allowedUpdates.feesDue = feesDue;
    if (attendance !== undefined) allowedUpdates.attendance = attendance;
    if (avatar !== undefined) allowedUpdates.avatar = avatar;
    if (status !== undefined) allowedUpdates.status = status;

    const existingStudent = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!existingStudent) {
      return next(new AppError('No student found with that ID', 404));
    }
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
    res.status(200).json({
      status: 'success',
      data: { student: mapStudent(student) }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingStudent = await prisma.student.findUnique({ where: { id: req.params.id } });
    if (!existingStudent) {
      return next(new AppError('No student found with that ID', 404));
    }
    await prisma.student.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
