import { PrismaClient, Alert, AlertType, AlertSeverity, AlertStatus } from '@prisma/client';
import logger from '../utils/logger.js';
import { CreateAlertDto } from '../types/dtos.js';

export class AlertService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createAlert(data: CreateAlertDto): Promise<Alert> {
    try {
      const alert = await this.prisma.alert.create({
        data: {
          studentId: data.studentId,
          type: data.type as AlertType,
          severity: data.severity as AlertSeverity,
          message: data.message,
          metadata: data.metadata as any,
        },
      });

      logger.info(`Alert created: ${alert.id}`);
      return alert;
    } catch (error) {
      logger.error('Error creating alert:', error);
      throw new Error('Failed to create alert');
    }
  }

  async getAlertById(id: string): Promise<Alert> {
    const alert = await this.prisma.alert.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
          },
        },
      },
    });

    if (!alert) {
      throw new Error('Alert not found');
    }

    return alert;
  }

  async getAllAlerts(options: {
    page?: number;
    limit?: number;
    studentId?: string;
    type?: AlertType;
    severity?: AlertSeverity;
    status?: AlertStatus;
    isRead?: boolean;
  }): Promise<{ alerts: Alert[]; total: number }> {
    const {
      page = 1,
      limit = 20,
      studentId,
      type,
      severity,
      status,
      isRead,
    } = options;

    const where: {
      studentId?: string;
      type?: AlertType;
      severity?: AlertSeverity;
      status?: AlertStatus;
      isRead?: boolean;
    } = {};

    if (studentId) where.studentId = studentId;
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (status) where.status = status;
    if (isRead !== undefined) where.isRead = isRead;

    const [alerts, total] = await Promise.all([
      this.prisma.alert.findMany({
        where,
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              studentId: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.alert.count({ where }),
    ]);

    return { alerts, total };
  }

  async getUnreadCount(): Promise<number> {
    return this.prisma.alert.count({
      where: {
        isRead: false,
        status: AlertStatus.ACTIVE,
      },
    });
  }

  async markAsRead(id: string): Promise<Alert> {
    const alert = await this.prisma.alert.update({
      where: { id },
      data: { isRead: true },
    });

    logger.info(`Alert marked as read: ${id}`);
    return alert;
  }

  async markAllAsRead(): Promise<number> {
    const result = await this.prisma.alert.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });

    logger.info(`Marked ${result.count} alerts as read`);
    return result.count;
  }

  async updateAlertStatus(id: string, status: AlertStatus): Promise<Alert> {
    const alert = await this.prisma.alert.update({
      where: { id },
      data: { status },
    });

    logger.info(`Alert status updated: ${id} -> ${status}`);
    return alert;
  }

  async deleteAlert(id: string): Promise<void> {
    await this.prisma.alert.delete({
      where: { id },
    });

    logger.info(`Alert deleted: ${id}`);
  }
}
