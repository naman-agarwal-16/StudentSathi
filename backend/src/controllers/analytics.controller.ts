import { Response } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import logger from '../utils/logger.js';

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor(analyticsService: AnalyticsService) {
    this.analyticsService = analyticsService;
  }

  getDashboardSummary = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { days } = req.query;

      const summary = await this.analyticsService.getDashboardSummary({
        days: days ? parseInt(days as string) : undefined,
      });

      res.status(200).json(summary);
    } catch (error) {
      logger.error('Get dashboard summary error:', error);
      res.status(500).json({ error: 'Failed to fetch summary', message: 'Server error' });
    }
  };

  getEngagementTimeSeries = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { startDate, endDate, studentId } = req.query;

      const options: {
        startDate?: Date;
        endDate?: Date;
        studentId?: string;
      } = {};
      if (startDate) options.startDate = new Date(startDate as string);
      if (endDate) options.endDate = new Date(endDate as string);
      if (studentId) options.studentId = studentId as string;

      const timeSeries = await this.analyticsService.getEngagementTimeSeries(options);

      res.status(200).json(timeSeries);
    } catch (error) {
      logger.error('Get engagement time series error:', error);
      res.status(500).json({ error: 'Failed to fetch time series', message: 'Server error' });
    }
  };
}
