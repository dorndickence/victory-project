import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getAllBorrowRecords,
  getBorrowRecord,
  createBorrowRecord,
  updateBorrowRecord,
  deleteBorrowRecord
} from '../controllers/libraryController';

const router = express.Router();

// Books
router.route('/books')
  .get(getAllBooks)
  .post(protect, restrictTo('admin'), createBook);

router.route('/books/:id')
  .get(getBook)
  .patch(protect, restrictTo('admin'), updateBook)
  .delete(protect, restrictTo('admin'), deleteBook);

// Borrow records
router.route('/borrows')
  .get(getAllBorrowRecords)
  .post(protect, restrictTo('admin'), createBorrowRecord);

router.route('/borrows/:id')
  .get(getBorrowRecord)
  .patch(protect, restrictTo('admin'), updateBorrowRecord)
  .delete(protect, restrictTo('admin'), deleteBorrowRecord);

export default router;
