import { Router } from 'express';
import { IntegrationController } from '../controllers/integration.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { LMSConfigSchema, WebhookConfigSchema } from '../types/dtos.js';
import { z } from 'zod';

export const createIntegrationRouter = (integrationController: IntegrationController) => {
  const router = Router();

  // All integration routes require authentication
  router.use(authenticate);

  // LMS routes (admin/teacher only)
  router.post(
    '/lms/config',
    authorize('ADMIN', 'TEACHER'),
    validateRequest(z.object({ body: LMSConfigSchema })),
    integrationController.createLMSConfig
  );

  router.get(
    '/lms/config',
    authorize('ADMIN', 'TEACHER'),
    integrationController.getLMSConfig
  );

  router.delete(
    '/lms/config/:id',
    authorize('ADMIN', 'TEACHER'),
    integrationController.deleteLMSConfig
  );

  router.post(
    '/lms/sync/:platform',
    authorize('ADMIN', 'TEACHER'),
    integrationController.syncLMSData
  );

  // Webhook routes (admin only)
  router.post(
    '/webhooks',
    authorize('ADMIN'),
    validateRequest(z.object({ body: WebhookConfigSchema })),
    integrationController.createWebhook
  );

  router.get(
    '/webhooks/:provider',
    authorize('ADMIN'),
    integrationController.getWebhooks
  );

  router.get(
    '/webhooks/detail/:id',
    authorize('ADMIN'),
    integrationController.getWebhookById
  );

  router.put(
    '/webhooks/:id',
    authorize('ADMIN'),
    integrationController.updateWebhook
  );

  router.delete(
    '/webhooks/:id',
    authorize('ADMIN'),
    integrationController.deleteWebhook
  );

  return router;
};
