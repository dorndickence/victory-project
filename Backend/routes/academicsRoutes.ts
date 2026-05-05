import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getAllExams,
  getExam,
  createExam,
  updateExam,
  deleteExam
} from '../controllers/academicsController';

const router = express.Router();

// Subjects
router.route('/subjects')
  .get(getAllSubjects)
  .post(protect, restrictTo('admin', 'teacher'), createSubject);

router.route('/subjects/:id')
  .get(getSubject)
  .patch(protect, restrictTo('admin', 'teacher'), updateSubject)
  .delete(protect, restrictTo('admin'), deleteSubject);

// Exams
router.route('/exams')
  .get(getAllExams)
  .post(protect, restrictTo('admin', 'teacher'), createExam);

router.route('/exams/:id')
  .get(getExam)
  .patch(protect, restrictTo('admin', 'teacher'), updateExam)
  .delete(protect, restrictTo('admin'), deleteExam);

export default router;
