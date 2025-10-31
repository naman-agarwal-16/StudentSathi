import { PrismaClient, AlertStatus } from '@prisma/client';
import logger from '../utils/logger.js';

export class AnalyticsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getDashboardSummary(options?: {
    days?: number;
  }): Promise<{
    totalStudents: number;
    activeStudents: number;
    averageAttendance: number;
    averageEngagement: number;
    averagePerformance: number;
    pendingAlerts: number;
    attendanceTrend: string;
    engagementTrend: string;
    performanceTrend: string;
  }> {
    try {
      const days = options?.days || 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Total and active students
      const totalStudents = await this.prisma.student.count();
      
      // Students with activity in the last 30 days (attendance or performance records)
      const activeStudents = await this.prisma.student.count({
        where: {
          OR: [
            {
              attendanceRecords: {
                some: {
                  date: {
                    gte: startDate,
                  },
                },
              },
            },
            {
              performanceRecords: {
                some: {
                  date: {
                    gte: startDate,
                  },
                },
              },
            },
          ],
        },
      });

      // Average attendance rate
      const students = await this.prisma.student.findMany({
        select: { attendanceRate: true },
      });
      const averageAttendance =
        students.length > 0
          ? students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length
          : 0;

      // Average engagement score
      const studentsWithEngagement = await this.prisma.student.findMany({
        select: { engagementScore: true },
      });
      const averageEngagement =
        studentsWithEngagement.length > 0
          ? studentsWithEngagement.reduce((sum, s) => sum + s.engagementScore, 0) / studentsWithEngagement.length
          : 0;

      // Average performance (GPA)
      const performanceRecords = await this.prisma.performanceRecord.findMany({
        where: {
          date: {
            gte: startDate,
          },
        },
        select: { gpa: true },
      });

      const averagePerformance =
        performanceRecords.length > 0
          ? performanceRecords.reduce((sum, r) => sum + (r.gpa || 0), 0) /
            performanceRecords.length
          : 0;

      // Pending alerts
      const pendingAlerts = await this.prisma.alert.count({
        where: {
          status: AlertStatus.ACTIVE,
          isRead: false,
        },
      });

      // Calculate trends (compare current period with previous period)
      const previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - days);

      const [currentAttendance, previousAttendance] = await Promise.all([
        this.getAverageAttendanceForPeriod(startDate, new Date()),
        this.getAverageAttendanceForPeriod(previousStartDate, startDate),
      ]);

      const [currentEngagement, previousEngagement] = await Promise.all([
        this.getAverageEngagementForPeriod(startDate, new Date()),
        this.getAverageEngagementForPeriod(previousStartDate, startDate),
      ]);

      const [currentPerformance, previousPerformance] = await Promise.all([
        this.getAveragePerformanceForPeriod(startDate, new Date()),
        this.getAveragePerformanceForPeriod(previousStartDate, startDate),
      ]);

      const attendanceTrend = this.calculateTrend(currentAttendance, previousAttendance);
      const engagementTrend = this.calculateTrend(currentEngagement, previousEngagement);
      const performanceTrend = this.calculateTrend(currentPerformance, previousPerformance);

      return {
        totalStudents,
        activeStudents,
        averageAttendance: Math.round(averageAttendance * 100) / 100,
        averageEngagement: Math.round(averageEngagement * 100) / 100,
        averagePerformance: Math.round(averagePerformance * 100) / 100,
        pendingAlerts,
        attendanceTrend,
        engagementTrend,
        performanceTrend,
      };
    } catch (error) {
      logger.error('Error getting dashboard summary:', error);
      throw new Error('Failed to fetch dashboard summary');
    }
  }

  private async getAverageAttendanceForPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const records = await this.prisma.attendanceRecord.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (records.length === 0) return 0;

    const presentCount = records.filter(
      (r) => r.status === 'PRESENT' || r.status === 'LATE'
    ).length;

    return (presentCount / records.length) * 100;
  }

  private async getAverageEngagementForPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const analytics = await this.prisma.analytics.findMany({
      where: {
        metric: 'engagement',
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (analytics.length === 0) return 0;

    return analytics.reduce((sum, a) => sum + a.value, 0) / analytics.length;
  }

  private async getAveragePerformanceForPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const records = await this.prisma.performanceRecord.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { gpa: true },
    });

    if (records.length === 0) return 0;

    return records.reduce((sum, r) => sum + (r.gpa || 0), 0) / records.length;
  }

  private calculateTrend(current: number, previous: number): string {
    if (previous === 0) return 'stable';
    const change = ((current - previous) / previous) * 100;
    if (change > 5) return 'up';
    if (change < -5) return 'down';
    return 'stable';
  }

  async getEngagementTimeSeries(options: {
    startDate?: Date;
    endDate?: Date;
    studentId?: string;
  }): Promise<Array<{ date: string; value: number }>> {
    const where: any = { metric: 'engagement' };

    if (options.studentId) where.studentId = options.studentId;

    if (options.startDate || options.endDate) {
      where.timestamp = {};
      if (options.startDate) where.timestamp.gte = options.startDate;
      if (options.endDate) where.timestamp.lte = options.endDate;
    }

    const analytics = await this.prisma.analytics.findMany({
      where,
      orderBy: { timestamp: 'asc' },
    });

    return analytics.map((a) => ({
      date: a.timestamp.toISOString(),
      value: a.value,
    }));
  }
}
