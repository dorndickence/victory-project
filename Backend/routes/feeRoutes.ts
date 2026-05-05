import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllFeeRecords,
  getAllStudentFees,
  getStudentFee,
  createStudentFee,
  updateStudentFee,
  deleteStudentFee
} from '../controllers/feeController';

const router = express.Router();

// Monthly fee summary for charts
router.get('/monthly', getAllFeeRecords);

// Per-student fee records
router.route('/')
  .get(getAllStudentFees)
  .post(protect, restrictTo('admin'), createStudentFee);

router.route('/:id')
  .get(getStudentFee)
  .patch(protect, restrictTo('admin'), updateStudentFee)
  .delete(protect, restrictTo('admin'), deleteStudentFee);

export default router;
