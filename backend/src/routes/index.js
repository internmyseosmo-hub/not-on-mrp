import express from 'express';
import userRoutes from './user.Routes.js';
import contactRoutes from './contact.Routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/contact', contactRoutes);

export default router;
