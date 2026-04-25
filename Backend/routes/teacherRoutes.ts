import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController';

const router = express.Router();

router.route('/')
  .get(getAllTeachers)
  .post(protect, restrictTo('admin'), createTeacher);

router.route('/:id')
  .get(getTeacher)
  .patch(protect, restrictTo('admin'), updateTeacher)
  .delete(protect, restrictTo('admin'), deleteTeacher);

export default router;
