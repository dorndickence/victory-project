import { Request, Response, NextFunction } from 'express';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';
import prisma from '../lib/prisma';

const mapStudentFee = (fee: { className: string } & Record<string, unknown>) => {
  const { className, ...rest } = fee;
  return { ...rest, class: className };
};

// Monthly fee summary records (for charts)
export const getAllFeeRecords = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const feeRecords = await prisma.feeRecord.findMany({ orderBy: { month: 'asc' } });
    res.status(200).json({
      status: 'success',
      results: feeRecords.length,
      data: { feeRecords }
    });
  } catch (err) {
    next(err);
  }
};

// Per-student fee records
export const getAllStudentFees = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const studentFees = await prisma.studentFee.findMany();
    res.status(200).json({
      status: 'success',
      results: studentFees.length,
      data: { studentFees: studentFees.map(mapStudentFee) }
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const fee = await prisma.studentFee.findUnique({ where: { id: req.params.id } });
    if (!fee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { fee: mapStudentFee(fee) }
    });
  } catch (err) {
    next(err);
  }
};

export const createStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, studentName, class: studentClass, month, amount, paid, due, status, dueDate } = req.body;
    const newFee = await prisma.studentFee.create({
      data: {
        studentId,
        studentName,
        className: studentClass,
        month,
        amount,
        paid,
        due,
        status,
        dueDate
      }
    });
    res.status(201).json({
      status: 'success',
      data: { fee: mapStudentFee(newFee) }
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { studentId, studentName, class: studentClass, month, amount, paid, due, status, dueDate } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (studentId !== undefined) allowedUpdates.studentId = studentId;
    if (studentName !== undefined) allowedUpdates.studentName = studentName;
    if (studentClass !== undefined) allowedUpdates.className = studentClass;
    if (month !== undefined) allowedUpdates.month = month;
    if (amount !== undefined) allowedUpdates.amount = amount;
    if (paid !== undefined) allowedUpdates.paid = paid;
    if (due !== undefined) allowedUpdates.due = due;
    if (status !== undefined) allowedUpdates.status = status;
    if (dueDate !== undefined) allowedUpdates.dueDate = dueDate;

    const existingFee = await prisma.studentFee.findUnique({ where: { id: req.params.id } });
    if (!existingFee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    const fee = await prisma.studentFee.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
    res.status(200).json({
      status: 'success',
      data: { fee: mapStudentFee(fee) }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const existingFee = await prisma.studentFee.findUnique({ where: { id: req.params.id } });
    if (!existingFee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    await prisma.studentFee.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
