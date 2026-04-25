import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(restrictTo('admin', 'teacher'), getAllStudents)
  .post(restrictTo('admin'), createStudent);

router.route('/:id')
  .get(restrictTo('admin', 'teacher', 'student'), getStudent)
  .patch(restrictTo('admin'), updateStudent)
  .delete(restrictTo('admin'), deleteStudent);

export default router;