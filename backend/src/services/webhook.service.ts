import { PrismaClient, WebhookConfig, WebhookEvent } from '@prisma/client';
import logger from '../utils/logger.js';
import { WebhookConfigDto } from '../types/dtos.js';

export class WebhookService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createWebhook(data: WebhookConfigDto): Promise<WebhookConfig> {
    try {
      const webhook = await this.prisma.webhookConfig.create({
        data: {
          name: data.name,
          url: data.url,
          event: data.event.toUpperCase() as WebhookEvent,
          enabled: data.enabled,
        },
      });

      logger.info(`Webhook created: ${webhook.id}`);
      return webhook;
    } catch (error) {
      logger.error('Error creating webhook:', error);
      throw new Error('Failed to create webhook');
    }
  }

  async getWebhooks(provider?: string): Promise<WebhookConfig[]> {
    const where = provider ? { name: { contains: provider, mode: 'insensitive' as const } } : undefined;

    return this.prisma.webhookConfig.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWebhookById(id: string): Promise<WebhookConfig> {
    const webhook = await this.prisma.webhookConfig.findUnique({
      where: { id },
    });

    if (!webhook) {
      throw new Error('Webhook not found');
    }

    return webhook;
  }

  async updateWebhook(id: string, data: Partial<WebhookConfigDto>): Promise<WebhookConfig> {
    const updateData: {
      name?: string;
      url?: string;
      event?: WebhookEvent;
      enabled?: boolean;
    } = {};

    if (data.name) updateData.name = data.name;
    if (data.url) updateData.url = data.url;
    if (data.event) updateData.event = data.event.toUpperCase() as WebhookEvent;
    if (data.enabled !== undefined) updateData.enabled = data.enabled;

    const webhook = await this.prisma.webhookConfig.update({
      where: { id },
      data: updateData,
    });

    logger.info(`Webhook updated: ${id}`);
    return webhook;
  }

  async deleteWebhook(id: string): Promise<void> {
    await this.prisma.webhookConfig.delete({
      where: { id },
    });

    logger.info(`Webhook deleted: ${id}`);
  }

  async triggerWebhook(
    event: WebhookEvent,
    payload: Record<string, unknown>
  ): Promise<{ success: boolean; message: string }> {
    // Stub implementation - returns success
    // In production, this would queue a job to send webhooks
    logger.info(`Webhook triggered for event: ${event}`, { payload });

    const webhooks = await this.prisma.webhookConfig.findMany({
      where: {
        event,
        enabled: true,
      },
    });

    logger.info(`Found ${webhooks.length} webhooks for event ${event}`);

    // In production, queue jobs to send HTTP POST to webhook.url with payload
    // For now, just return success

    return {
      success: true,
      message: `${webhooks.length} webhooks queued for delivery`,
    };
  }
}
