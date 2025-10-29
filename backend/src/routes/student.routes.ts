import { Router } from 'express';
import { StudentController } from '../controllers/student.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { CreateStudentSchema, UpdateStudentSchema } from '../types/dtos.js';
import { z } from 'zod';

export const createStudentRouter = (studentController: StudentController) => {
  const router = Router();

  router.post(
    '/',
    validateRequest(z.object({ body: CreateStudentSchema })),
    studentController.createStudent
  );

  router.get('/', studentController.getAllStudents);

  router.get('/:id', studentController.getStudentById);

  router.put(
    '/:id',
    validateRequest(z.object({ body: UpdateStudentSchema })),
    studentController.updateStudent
  );

  router.delete('/:id', studentController.deleteStudent);

  router.patch(
    '/:id/engagement',
    validateRequest(
      z.object({
        body: z.object({ score: z.number().min(0).max(100) }),
      })
    ),
    studentController.updateEngagementScore
  );

  return router;
};
