import { Router } from 'express';
import { AlertController } from '../controllers/alert.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { CreateAlertSchema } from '../types/dtos.js';
import { z } from 'zod';

export const createAlertRouter = (alertController: AlertController) => {
  const router = Router();

  // All alert routes require authentication
  router.use(authenticate);

  router.post(
    '/',
    validateRequest(z.object({ body: CreateAlertSchema })),
    alertController.createAlert
  );

  router.get('/', alertController.getAllAlerts);

  router.get('/unread', alertController.getUnreadCount);

  router.get('/:id', alertController.getAlertById);

  router.patch('/:id/read', alertController.markAsRead);

  router.patch('/read-all', alertController.markAllAsRead);

  router.patch(
    '/:id/status',
    validateRequest(
      z.object({
        body: z.object({
          status: z.enum(['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED']),
        }),
      })
    ),
    alertController.updateAlertStatus
  );

  router.delete('/:id', alertController.deleteAlert);

  return router;
};
