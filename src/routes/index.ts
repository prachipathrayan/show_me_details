import { Router } from 'express';
import CourseRouter from './Courses';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', CourseRouter);
router.use('/students', StudentRouter);

// Export the base-router
export default router;
