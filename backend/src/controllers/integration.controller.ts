import { Request, Response } from 'express';
import { LMSService } from '../services/lms.service.js';
import { WebhookService } from '../services/webhook.service.js';
import logger from '../utils/logger.js';

export class IntegrationController {
  private lmsService: LMSService;
  private webhookService: WebhookService;

  constructor(lmsService: LMSService, webhookService: WebhookService) {
    this.lmsService = lmsService;
    this.webhookService = webhookService;
  }

  // LMS Config endpoints
  createLMSConfig = async (req: Request, res: Response): Promise<void> => {
    try {
      const config = await this.lmsService.createOrUpdateConfig(req.body);
      res.status(200).json(config);
    } catch (error) {
      logger.error('Create LMS config error:', error);
      const message = error instanceof Error ? error.message : 'Failed to save configuration';
      res.status(400).json({ error: 'Configuration failed', message });
    }
  };

  getLMSConfig = async (req: Request, res: Response): Promise<void> => {
    try {
      const { platform } = req.query;
      const configs = await this.lmsService.getConfig(platform as string);
      res.status(200).json(configs);
    } catch (error) {
      logger.error('Get LMS config error:', error);
      res.status(500).json({ error: 'Failed to fetch configuration', message: 'Server error' });
    }
  };

  deleteLMSConfig = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.lmsService.deleteConfig(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete LMS config error:', error);
      res.status(404).json({ error: 'Configuration not found', message: 'Config does not exist' });
    }
  };

  syncLMSData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { platform } = req.params;
      const result = await this.lmsService.syncData(platform);
      res.status(200).json(result);
    } catch (error) {
      logger.error('Sync LMS data error:', error);
      res.status(500).json({ error: 'Sync failed', message: 'Failed to sync data' });
    }
  };

  // Webhook endpoints
  createWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const webhook = await this.webhookService.createWebhook(req.body);
      res.status(201).json(webhook);
    } catch (error) {
      logger.error('Create webhook error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create webhook';
      res.status(400).json({ error: 'Webhook creation failed', message });
    }
  };

  getWebhooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const { provider } = req.params;
      const webhooks = await this.webhookService.getWebhooks(provider);
      res.status(200).json(webhooks);
    } catch (error) {
      logger.error('Get webhooks error:', error);
      res.status(500).json({ error: 'Failed to fetch webhooks', message: 'Server error' });
    }
  };

  getWebhookById = async (req: Request, res: Response): Promise<void> => {
    try {
      const webhook = await this.webhookService.getWebhookById(req.params.id);
      res.status(200).json(webhook);
    } catch (error) {
      logger.error('Get webhook error:', error);
      res.status(404).json({ error: 'Webhook not found', message: 'Webhook does not exist' });
    }
  };

  updateWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const webhook = await this.webhookService.updateWebhook(req.params.id, req.body);
      res.status(200).json(webhook);
    } catch (error) {
      logger.error('Update webhook error:', error);
      res.status(404).json({ error: 'Webhook not found', message: 'Webhook does not exist' });
    }
  };

  deleteWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.webhookService.deleteWebhook(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete webhook error:', error);
      res.status(404).json({ error: 'Webhook not found', message: 'Webhook does not exist' });
    }
  };
}
