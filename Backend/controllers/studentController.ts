import { Request, Response, NextFunction } from 'express';
import Student from '../models/Student';
import AppError from './errorController';

export const getAllStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: { students }
    });
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { student }
    });
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { student: newStudent }
    });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { student }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
