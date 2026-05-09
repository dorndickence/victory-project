import { Request, Response, NextFunction } from 'express';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';
import prisma from '../lib/prisma';

export const getAllTeachers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = await prisma.teacher.findMany();
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
    if (!validateObjectId(req.params.id, next)) return;
    const teacher = await prisma.teacher.findUnique({ where: { id: req.params.id } });
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
    const { name, subject, experience, avatar, status } = req.body;
    const newTeacher = await prisma.teacher.create({
      data: { name, subject, experience, avatar, status }
    });
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
    if (!validateObjectId(req.params.id, next)) return;
    const { name, subject, experience, avatar, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (name !== undefined) allowedUpdates.name = name;
    if (subject !== undefined) allowedUpdates.subject = subject;
    if (experience !== undefined) allowedUpdates.experience = experience;
    if (avatar !== undefined) allowedUpdates.avatar = avatar;
    if (status !== undefined) allowedUpdates.status = status;

    const existingTeacher = await prisma.teacher.findUnique({ where: { id: req.params.id } });
    if (!existingTeacher) {
      return next(new AppError('No teacher found with that ID', 404));
    }
    const teacher = await prisma.teacher.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
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
    if (!validateObjectId(req.params.id, next)) return;
    const existingTeacher = await prisma.teacher.findUnique({ where: { id: req.params.id } });
    if (!existingTeacher) {
      return next(new AppError('No teacher found with that ID', 404));
    }
    await prisma.teacher.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
