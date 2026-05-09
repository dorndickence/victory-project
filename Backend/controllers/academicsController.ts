import { Request, Response, NextFunction } from 'express';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';
import prisma from '../lib/prisma';

const mapSubject = (subject: { className: string } & Record<string, unknown>) => {
  const { className, ...rest } = subject;
  return { ...rest, class: className };
};

const mapExam = (exam: { className: string } & Record<string, unknown>) => {
  const { className, ...rest } = exam;
  return { ...rest, class: className };
};

// Subjects
export const getAllSubjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.status(200).json({
      status: 'success',
      results: subjects.length,
      data: { subjects: subjects.map(mapSubject) }
    });
  } catch (err) {
    next(err);
  }
};

export const getSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const subject = await prisma.subject.findUnique({ where: { id: req.params.id } });
    if (!subject) {
      return next(new AppError('No subject found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { subject: mapSubject(subject) }
    });
  } catch (err) {
    next(err);
  }
};

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, class: subjectClass, teacherName, hoursPerWeek } = req.body;
    const newSubject = await prisma.subject.create({
      data: { name, className: subjectClass, teacherName, hoursPerWeek }
    });
    res.status(201).json({
      status: 'success',
      data: { subject: mapSubject(newSubject) }
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { name, class: subjectClass, teacherName, hoursPerWeek } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (name !== undefined) allowedUpdates.name = name;
    if (subjectClass !== undefined) allowedUpdates.className = subjectClass;
    if (teacherName !== undefined) allowedUpdates.teacherName = teacherName;
    if (hoursPerWeek !== undefined) allowedUpdates.hoursPerWeek = hoursPerWeek;

    const existingSubject = await prisma.subject.findUnique({ where: { id: req.params.id } });
    if (!existingSubject) {
      return next(new AppError('No subject found with that ID', 404));
    }
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
    res.status(200).json({
      status: 'success',
      data: { subject: mapSubject(subject) }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const existingSubject = await prisma.subject.findUnique({ where: { id: req.params.id } });
    if (!existingSubject) {
      return next(new AppError('No subject found with that ID', 404));
    }
    await prisma.subject.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

// Exams
export const getAllExams = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await prisma.exam.findMany();
    res.status(200).json({
      status: 'success',
      results: exams.length,
      data: { exams: exams.map(mapExam) }
    });
  } catch (err) {
    next(err);
  }
};

export const getExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const exam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { exam: mapExam(exam) }
    });
  } catch (err) {
    next(err);
  }
};

export const createExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject, class: examClass, date, duration, maxMarks, status } = req.body;
    const newExam = await prisma.exam.create({
      data: { subject, className: examClass, date, duration, maxMarks, status }
    });
    res.status(201).json({
      status: 'success',
      data: { exam: mapExam(newExam) }
    });
  } catch (err) {
    next(err);
  }
};

export const updateExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { subject, class: examClass, date, duration, maxMarks, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (subject !== undefined) allowedUpdates.subject = subject;
    if (examClass !== undefined) allowedUpdates.className = examClass;
    if (date !== undefined) allowedUpdates.date = date;
    if (duration !== undefined) allowedUpdates.duration = duration;
    if (maxMarks !== undefined) allowedUpdates.maxMarks = maxMarks;
    if (status !== undefined) allowedUpdates.status = status;

    const existingExam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    if (!existingExam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    const exam = await prisma.exam.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
    res.status(200).json({
      status: 'success',
      data: { exam: mapExam(exam) }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const existingExam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    if (!existingExam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    await prisma.exam.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
