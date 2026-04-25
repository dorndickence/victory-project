import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware';
import {
  getAllAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from '../controllers/communicationController';

const router = express.Router();

router.route('/')
  .get(getAllAnnouncements)
  .post(protect, restrictTo('admin', 'teacher'), createAnnouncement);

router.route('/:id')
  .get(getAnnouncement)
  .patch(protect, restrictTo('admin', 'teacher'), updateAnnouncement)
  .delete(protect, restrictTo('admin'), deleteAnnouncement);

export default router;
