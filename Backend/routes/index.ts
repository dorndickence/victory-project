import express from 'express';
import authRouter from './authRoutes';
import studentRouter from './studentRoutes';
import teacherRouter from './teacherRoutes';
import feeRouter from './feeRoutes';
import academicsRouter from './academicsRoutes';
import libraryRouter from './libraryRoutes';
import communicationRouter from './communicationRoutes';
import dashboardRouter from './dashboardRoutes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/fees', feeRouter);
router.use('/academics', academicsRouter);
router.use('/library', libraryRouter);
router.use('/communication', communicationRouter);
router.use('/dashboard', dashboardRouter);

export default router;