import { Request, Response, NextFunction } from 'express';
import Teacher from '../models/Teacher';
import AppError from './errorController';

export const getAllTeachers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      status: 'success',
      results: teachers.length,
      data: { teachers }
    });
  } catch (err) {
    next(err);
  }
};

export const getTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return next(new AppError('No teacher found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { teacher }
    });
  } catch (err) {
    next(err);
  }
};

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, subject, experience, avatar, status } = req.body;
    const newTeacher = await Teacher.create({ id, name, subject, experience, avatar, status });
    res.status(201).json({
      status: 'success',
      data: { teacher: newTeacher }
    });
  } catch (err) {
    next(err);
  }
};

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, subject, experience, avatar, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (name !== undefined) allowedUpdates.name = name;
    if (subject !== undefined) allowedUpdates.subject = subject;
    if (experience !== undefined) allowedUpdates.experience = experience;
    if (avatar !== undefined) allowedUpdates.avatar = avatar;
    if (status !== undefined) allowedUpdates.status = status;

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!teacher) {
      return next(new AppError('No teacher found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { teacher }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return next(new AppError('No teacher found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
