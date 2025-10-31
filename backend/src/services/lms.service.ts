import { PrismaClient, LMSIntegration, LMSPlatform } from '@prisma/client';
import crypto from 'crypto';
import logger from '../utils/logger.js';
import { LMSConfigDto } from '../types/dtos.js';

export class LMSService {
  private prisma: PrismaClient;
  private readonly encryptionKey: string;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    // In production, use a proper encryption key from environment
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-32';
  }

  async createOrUpdateConfig(data: LMSConfigDto): Promise<LMSIntegration> {
    try {
      // Encrypt API key
      const encryptedApiKey = this.encrypt(data.apiKey);

      // Check if config already exists for this platform
      const existing = await this.prisma.lMSIntegration.findFirst({
        where: { platform: data.platform.toUpperCase() as LMSPlatform },
      });

      let config: LMSIntegration;

      if (existing) {
        config = await this.prisma.lMSIntegration.update({
          where: { id: existing.id },
          data: {
            apiKey: encryptedApiKey,
            baseUrl: data.baseUrl,
            enabled: data.enabled,
          },
        });
        logger.info(`LMS config updated: ${data.platform}`);
      } else {
        config = await this.prisma.lMSIntegration.create({
          data: {
            platform: data.platform.toUpperCase() as LMSPlatform,
            apiKey: encryptedApiKey,
            baseUrl: data.baseUrl,
            enabled: data.enabled,
          },
        });
        logger.info(`LMS config created: ${data.platform}`);
      }

      return config;
    } catch (error) {
      logger.error('Error creating/updating LMS config:', error);
      throw new Error('Failed to save LMS configuration');
    }
  }

  async getConfig(platform?: string): Promise<LMSIntegration[]> {
    const where = platform ? { platform: platform.toUpperCase() as LMSPlatform } : undefined;

    const configs = await this.prisma.lMSIntegration.findMany({
      where,
    });

    // Return configs with masked API keys
    return configs.map((config: LMSIntegration) => ({
      ...config,
      apiKey: this.maskApiKey(config.apiKey),
    }));
  }

  async deleteConfig(id: string): Promise<void> {
    await this.prisma.lMSIntegration.delete({
      where: { id },
    });
    logger.info(`LMS config deleted: ${id}`);
  }

  async syncData(platform: string): Promise<{ success: boolean; message: string }> {
    // Stub implementation - returns success
    // In production, this would integrate with actual LMS APIs
    logger.info(`LMS sync initiated for: ${platform}`);

    await this.prisma.lMSIntegration.updateMany({
      where: { platform: platform.toUpperCase() as LMSPlatform },
      data: { lastSyncAt: new Date() },
    });

    return {
      success: true,
      message: `Sync job queued for ${platform}`,
    };
  }

  private encrypt(text: string): string {
    // Generate random IV for each encryption
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.encryptionKey.padEnd(32, '0').substring(0, 32)),
      iv
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Prepend IV to encrypted data (IV doesn't need to be secret)
    return iv.toString('hex') + ':' + encrypted;
  }

  // Decrypt function for future use when retrieving API keys
  // private decrypt(encryptedWithIv: string): string {
  //   const parts = encryptedWithIv.split(':');
  //   const iv = Buffer.from(parts[0], 'hex');
  //   const encrypted = parts[1];
  //   const decipher = crypto.createDecipheriv(
  //     'aes-256-cbc',
  //     Buffer.from(this.encryptionKey.padEnd(32, '0').substring(0, 32)),
  //     iv
  //   );
  //   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  //   decrypted += decipher.final('utf8');
  //   return decrypted;
  // }

  private maskApiKey(apiKey: string): string {
    if (apiKey.length <= 8) return '********';
    return apiKey.substring(0, 4) + '********' + apiKey.substring(apiKey.length - 4);
  }
}
