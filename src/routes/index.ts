import { Router } from 'express';
import CourseRouter from './Courses';
import StudentRouter from './students';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/coursesModelManager', CourseRouter);
router.use('/students', StudentRouter);

// Export the base-router
export default router;
