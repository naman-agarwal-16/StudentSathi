import { Router } from 'express';
import { PerformanceController } from '../controllers/performance.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { CreatePerformanceSchema } from '../types/dtos.js';
import { z } from 'zod';

export const createPerformanceRouter = (performanceController: PerformanceController) => {
  const router = Router();

  // All performance routes require authentication
  router.use(authenticate);

  router.post(
    '/',
    validateRequest(z.object({ body: CreatePerformanceSchema })),
    performanceController.createPerformance
  );

  router.get('/:id', performanceController.getPerformanceById);

  router.get('/student/:studentId', performanceController.getPerformanceByStudent);

  router.get('/student/:studentId/gpa', performanceController.getStudentGPA);

  router.put('/:id', performanceController.updatePerformance);

  router.delete('/:id', performanceController.deletePerformance);

  return router;
};
