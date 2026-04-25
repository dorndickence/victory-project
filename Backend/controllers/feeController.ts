import { Request, Response, NextFunction } from 'express';
import FeeRecord from '../models/FeeRecord';
import StudentFee from '../models/StudentFee';
import AppError from './errorController';

// Monthly fee summary records (for charts)
export const getAllFeeRecords = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const feeRecords = await FeeRecord.find().sort({ month: 1 });
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
    const studentFees = await StudentFee.find();
    res.status(200).json({
      status: 'success',
      results: studentFees.length,
      data: { studentFees }
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fee = await StudentFee.findById(req.params.id);
    if (!fee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { fee }
    });
  } catch (err) {
    next(err);
  }
};

export const createStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, studentName, class: studentClass, month, amount, paid, due, status, dueDate } = req.body;
    const newFee = await StudentFee.create({
      studentId, studentName, class: studentClass, month, amount, paid, due, status, dueDate
    });
    res.status(201).json({
      status: 'success',
      data: { fee: newFee }
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, studentName, class: studentClass, month, amount, paid, due, status, dueDate } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (studentId !== undefined) allowedUpdates.studentId = studentId;
    if (studentName !== undefined) allowedUpdates.studentName = studentName;
    if (studentClass !== undefined) allowedUpdates.class = studentClass;
    if (month !== undefined) allowedUpdates.month = month;
    if (amount !== undefined) allowedUpdates.amount = amount;
    if (paid !== undefined) allowedUpdates.paid = paid;
    if (due !== undefined) allowedUpdates.due = due;
    if (status !== undefined) allowedUpdates.status = status;
    if (dueDate !== undefined) allowedUpdates.dueDate = dueDate;

    const fee = await StudentFee.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!fee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { fee }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudentFee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fee = await StudentFee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return next(new AppError('No fee record found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
