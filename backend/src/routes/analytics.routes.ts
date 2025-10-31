import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

export const createAnalyticsRouter = (analyticsController: AnalyticsController) => {
  const router = Router();

  // All analytics routes require authentication
  router.use(authenticate);

  router.get('/summary', analyticsController.getDashboardSummary);

  router.get('/engagement/timeseries', analyticsController.getEngagementTimeSeries);

  return router;
};
