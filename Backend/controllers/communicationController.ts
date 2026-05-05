import { Request, Response, NextFunction } from 'express';
import Announcement from '../models/Announcement';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';

export const getAllAnnouncements = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
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
    const announcement = await Announcement.findById(req.params.id);
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
    const newAnnouncement = await Announcement.create({ title, message, audience, date, author });
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

    const announcement = await Announcement.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
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

export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return next(new AppError('No announcement found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
