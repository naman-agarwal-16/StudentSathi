import { Request, Response } from 'express';
import { AlertService } from '../services/alert.service.js';
import { AlertStatus } from '@prisma/client';
import logger from '../utils/logger.js';

export class AlertController {
  private alertService: AlertService;

  constructor(alertService: AlertService) {
    this.alertService = alertService;
  }

  createAlert = async (req: Request, res: Response): Promise<void> => {
    try {
      const alert = await this.alertService.createAlert(req.body);
      res.status(201).json(alert);
    } catch (error) {
      logger.error('Create alert error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create alert';
      res.status(400).json({ error: 'Create failed', message });
    }
  };

  getAlertById = async (req: Request, res: Response): Promise<void> => {
    try {
      const alert = await this.alertService.getAlertById(req.params.id);
      res.status(200).json(alert);
    } catch (error) {
      logger.error('Get alert error:', error);
      res.status(404).json({ error: 'Alert not found', message: 'Alert does not exist' });
    }
  };

  getAllAlerts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page, limit, studentId, type, severity, status, isRead } = req.query;

      const result = await this.alertService.getAllAlerts({
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        studentId: studentId as string,
        type: type as any,
        severity: severity as any,
        status: status as any,
        isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
      });

      res.status(200).json({
        data: result.alerts,
        pagination: {
          page: parseInt((page as string) || '1'),
          limit: parseInt((limit as string) || '20'),
          total: result.total,
          totalPages: Math.ceil(result.total / parseInt((limit as string) || '20')),
        },
      });
    } catch (error) {
      logger.error('Get alerts error:', error);
      res.status(500).json({ error: 'Failed to fetch alerts', message: 'Server error' });
    }
  };

  getUnreadCount = async (_req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.alertService.getUnreadCount();
      res.status(200).json({ count });
    } catch (error) {
      logger.error('Get unread count error:', error);
      res.status(500).json({ error: 'Failed to fetch count', message: 'Server error' });
    }
  };

  markAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const alert = await this.alertService.markAsRead(req.params.id);
      res.status(200).json(alert);
    } catch (error) {
      logger.error('Mark as read error:', error);
      res.status(404).json({ error: 'Alert not found', message: 'Alert does not exist' });
    }
  };

  markAllAsRead = async (_req: Request, res: Response): Promise<void> => {
    try {
      const count = await this.alertService.markAllAsRead();
      res.status(200).json({ count, message: `${count} alerts marked as read` });
    } catch (error) {
      logger.error('Mark all as read error:', error);
      res.status(500).json({ error: 'Failed to mark alerts', message: 'Server error' });
    }
  };

  updateAlertStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      const alert = await this.alertService.updateAlertStatus(req.params.id, status as AlertStatus);
      res.status(200).json(alert);
    } catch (error) {
      logger.error('Update alert status error:', error);
      res.status(404).json({ error: 'Alert not found', message: 'Alert does not exist' });
    }
  };

  deleteAlert = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.alertService.deleteAlert(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete alert error:', error);
      res.status(404).json({ error: 'Alert not found', message: 'Alert does not exist' });
    }
  };
}
