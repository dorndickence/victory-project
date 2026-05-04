import { Request, Response, NextFunction } from 'express';
import Book from '../models/Book';
import BorrowRecord from '../models/BorrowRecord';
import AppError from './errorController';
import { validateObjectId } from '../utils/validateId';

// Books
export const getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: { books }
    });
  } catch (err) {
    next(err);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { book }
    });
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, category, copies, available } = req.body;
    const newBook = await Book.create({ title, author, category, copies, available });
    res.status(201).json({
      status: 'success',
      data: { book: newBook }
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { title, author, category, copies, available } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (title !== undefined) allowedUpdates.title = title;
    if (author !== undefined) allowedUpdates.author = author;
    if (category !== undefined) allowedUpdates.category = category;
    if (copies !== undefined) allowedUpdates.copies = copies;
    if (available !== undefined) allowedUpdates.available = available;

    const book = await Book.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { book }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

// Borrow Records
export const getAllBorrowRecords = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowRecords = await BorrowRecord.find();
    res.status(200).json({
      status: 'success',
      results: borrowRecords.length,
      data: { borrowRecords }
    });
  } catch (err) {
    next(err);
  }
};

export const getBorrowRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const record = await BorrowRecord.findById(req.params.id);
    if (!record) {
      return next(new AppError('No borrow record found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { borrowRecord: record }
    });
  } catch (err) {
    next(err);
  }
};

export const createBorrowRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookTitle, studentName, issueDate, dueDate, returnDate, status } = req.body;
    const newRecord = await BorrowRecord.create({ bookTitle, studentName, issueDate, dueDate, returnDate, status });
    res.status(201).json({
      status: 'success',
      data: { borrowRecord: newRecord }
    });
  } catch (err) {
    next(err);
  }
};

export const updateBorrowRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const { bookTitle, studentName, issueDate, dueDate, returnDate, status } = req.body;
    const allowedUpdates: Record<string, unknown> = {};
    if (bookTitle !== undefined) allowedUpdates.bookTitle = bookTitle;
    if (studentName !== undefined) allowedUpdates.studentName = studentName;
    if (issueDate !== undefined) allowedUpdates.issueDate = issueDate;
    if (dueDate !== undefined) allowedUpdates.dueDate = dueDate;
    if (returnDate !== undefined) allowedUpdates.returnDate = returnDate;
    if (status !== undefined) allowedUpdates.status = status;

    const record = await BorrowRecord.findByIdAndUpdate(req.params.id, allowedUpdates, {
      new: true,
      runValidators: true
    });
    if (!record) {
      return next(new AppError('No borrow record found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { borrowRecord: record }
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBorrowRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validateObjectId(req.params.id, next)) return;
    const record = await BorrowRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return next(new AppError('No borrow record found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
