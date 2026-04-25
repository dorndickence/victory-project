import { Request, Response, NextFunction } from 'express';
import Subject from '../models/Subject';
import Exam from '../models/Exam';
import AppError from './errorController';

// Subjects
export const getAllSubjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({
      status: 'success',
      results: subjects.length,
      data: { subjects }
    });
  } catch (err) {
    next(err);
  }
};

export const getSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return next(new AppError('No subject found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { subject }
    });
  } catch (err) {
    next(err);
  }
};

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, class: subjectClass, teacherName, hoursPerWeek } = req.body;
    const newSubject = await Subject.create({ name, class: subjectClass, teacherName, hoursPerWeek });
    res.status(201).json({
      status: 'success',
      data: { subject: newSubject }
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, class: subjectClass, teacherName, hoursPerWeek } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (name !== undefined) allowedUpdates.name = name;
    if (subjectClass !== undefined) allowedUpdates.class = subjectClass;
    if (teacherName !== undefined) allowedUpdates.teacherName = teacherName;
    if (hoursPerWeek !== undefined) allowedUpdates.hoursPerWeek = hoursPerWeek;

    const subject = await Subject.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!subject) {
      return next(new AppError('No subject found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { subject }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return next(new AppError('No subject found with that ID', 404));
    }
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
    const exams = await Exam.find();
    res.status(200).json({
      status: 'success',
      results: exams.length,
      data: { exams }
    });
  } catch (err) {
    next(err);
  }
};

export const getExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { exam }
    });
  } catch (err) {
    next(err);
  }
};

export const createExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject, class: examClass, date, duration, maxMarks, status } = req.body;
    const newExam = await Exam.create({ subject, class: examClass, date, duration, maxMarks, status });
    res.status(201).json({
      status: 'success',
      data: { exam: newExam }
    });
  } catch (err) {
    next(err);
  }
};

export const updateExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject, class: examClass, date, duration, maxMarks, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (subject !== undefined) allowedUpdates.subject = subject;
    if (examClass !== undefined) allowedUpdates.class = examClass;
    if (date !== undefined) allowedUpdates.date = date;
    if (duration !== undefined) allowedUpdates.duration = duration;
    if (maxMarks !== undefined) allowedUpdates.maxMarks = maxMarks;
    if (status !== undefined) allowedUpdates.status = status;

    const exam = await Exam.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { exam }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return next(new AppError('No exam found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
