import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { CreateAttendanceSchema, BulkAttendanceSchema } from '../types/dtos.js';
import { z } from 'zod';

export const createAttendanceRouter = (attendanceController: AttendanceController) => {
  const router = Router();

  // All attendance routes require authentication
  router.use(authenticate);

  router.post(
    '/',
    validateRequest(z.object({ body: CreateAttendanceSchema })),
    attendanceController.createAttendance
  );

  router.post(
    '/bulk',
    validateRequest(z.object({ body: BulkAttendanceSchema })),
    attendanceController.bulkCreateAttendance
  );

  router.get('/by-date', attendanceController.getAttendanceByDate);

  router.get('/student/:studentId', attendanceController.getAttendanceByStudent);

  router.get('/student/:studentId/stats', attendanceController.getAttendanceStats);

  router.put('/:id', attendanceController.updateAttendance);

  router.delete('/:id', attendanceController.deleteAttendance);

  return router;
};
