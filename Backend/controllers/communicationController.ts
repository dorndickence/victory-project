import { Request, Response, NextFunction } from 'express';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';
import prisma from '../lib/prisma';

export const getAllAnnouncements = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const announcements = await prisma.announcement.findMany({ orderBy: { date: 'desc' } });
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: { announcements }
    });
  } catch (err) {
    next(err);
  }
};

export const getAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const announcement = await prisma.announcement.findUnique({ where: { id: req.params.id } });
    if (!announcement) {
      return next(new AppError('No announcement found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { announcement }
    });
  } catch (err) {
    next(err);
  }
};

export const createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, message, audience, date, author } = req.body;
    const newAnnouncement = await prisma.announcement.create({
      data: { title, message, audience, date, author }
    });
    res.status(201).json({
      status: 'success',
      data: { announcement: newAnnouncement }
    });
  } catch (err) {
    next(err);
  }
};

export const updateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { title, message, audience, date, author } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (title !== undefined) allowedUpdates.title = title;
    if (message !== undefined) allowedUpdates.message = message;
    if (audience !== undefined) allowedUpdates.audience = audience;
    if (date !== undefined) allowedUpdates.date = date;
    if (author !== undefined) allowedUpdates.author = author;

    const existingAnnouncement = await prisma.announcement.findUnique({ where: { id: req.params.id } });
    if (!existingAnnouncement) {
      return next(new AppError('No announcement found with that ID', 404));
    }
    const announcement = await prisma.announcement.update({
      where: { id: req.params.id },
      data: allowedUpdates
    });
    res.status(200).json({
      status: 'success',
      data: { announcement }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const existingAnnouncement = await prisma.announcement.findUnique({ where: { id: req.params.id } });
    if (!existingAnnouncement) {
      return next(new AppError('No announcement found with that ID', 404));
    }
    await prisma.announcement.delete({ where: { id: req.params.id } });
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
