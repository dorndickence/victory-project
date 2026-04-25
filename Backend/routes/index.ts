import express from 'express';
import authRouter from './authRoutes';
import studentRouter from './studentRoutes';
// Import other routers...

const router = express.Router();

router.use('/auth', authRouter);
router.use('/students', studentRouter);
// Use other routers...

export default router;