import { PrismaClient, PerformanceRecord } from '@prisma/client';
import logger from '../utils/logger.js';
import { CreatePerformanceDto } from '../types/dtos.js';

export class PerformanceService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createPerformance(data: CreatePerformanceDto): Promise<PerformanceRecord> {
    try {
      // Calculate letter grade and GPA
      const percentage = (data.score / data.maxScore) * 100;
      const { letterGrade, gpa } = this.calculateGrade(percentage);

      const performance = await this.prisma.performanceRecord.create({
        data: {
          studentId: data.studentId,
          subject: data.subject,
          score: data.score,
          maxScore: data.maxScore,
          letterGrade,
          gpa,
          date: new Date(data.date),
          type: data.type,
          notes: data.notes,
        },
      });

      logger.info(`Performance record created: ${performance.id}`);
      return performance;
    } catch (error) {
      logger.error('Error creating performance:', error);
      throw new Error('Failed to create performance record');
    }
  }

  async getPerformanceById(id: string): Promise<PerformanceRecord> {
    const performance = await this.prisma.performanceRecord.findUnique({
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

    if (!performance) {
      throw new Error('Performance record not found');
    }

    return performance;
  }

  async getPerformanceByStudent(
    studentId: string,
    options?: {
      subject?: string;
      type?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<PerformanceRecord[]> {
    const where: {
      studentId: string;
      subject?: string;
      type?: string;
      date?: {
        gte?: Date;
        lte?: Date;
      };
    } = { studentId };

    if (options?.subject) where.subject = options.subject;
    if (options?.type) where.type = options.type;

    if (options?.startDate || options?.endDate) {
      where.date = {};
      if (options.startDate) where.date.gte = options.startDate;
      if (options.endDate) where.date.lte = options.endDate;
    }

    return this.prisma.performanceRecord.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async updatePerformance(
    id: string,
    data: Partial<CreatePerformanceDto>
  ): Promise<PerformanceRecord> {
    const updateData: {
      score?: number;
      maxScore?: number;
      subject?: string;
      type?: string;
      notes?: string;
      date?: Date;
      letterGrade?: string;
      gpa?: number;
    } = {};

    if (data.score !== undefined) updateData.score = data.score;
    if (data.maxScore !== undefined) updateData.maxScore = data.maxScore;
    if (data.subject) updateData.subject = data.subject;
    if (data.type) updateData.type = data.type;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.date) updateData.date = new Date(data.date);

    // Recalculate grade if score or maxScore changed
    if (data.score !== undefined || data.maxScore !== undefined) {
      const existing = await this.prisma.performanceRecord.findUnique({
        where: { id },
      });

      if (existing) {
        const score = data.score ?? existing.score;
        const maxScore = data.maxScore ?? existing.maxScore;
        const percentage = (score / maxScore) * 100;
        const { letterGrade, gpa } = this.calculateGrade(percentage);
        updateData.letterGrade = letterGrade;
        updateData.gpa = gpa;
      }
    }

    const performance = await this.prisma.performanceRecord.update({
      where: { id },
      data: updateData,
    });

    logger.info(`Performance updated: ${id}`);
    return performance;
  }

  async deletePerformance(id: string): Promise<void> {
    await this.prisma.performanceRecord.delete({
      where: { id },
    });

    logger.info(`Performance deleted: ${id}`);
  }

  async getStudentGPA(
    studentId: string,
    options?: {
      subject?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<{
    overallGPA: number;
    subjectGPAs: Array<{ subject: string; gpa: number; count: number }>;
  }> {
    const where: {
      studentId: string;
      subject?: string;
      date?: {
        gte?: Date;
        lte?: Date;
      };
    } = { studentId };

    if (options?.subject) where.subject = options.subject;

    if (options?.startDate || options?.endDate) {
      where.date = {};
      if (options.startDate) where.date.gte = options.startDate;
      if (options.endDate) where.date.lte = options.endDate;
    }

    const records = await this.prisma.performanceRecord.findMany({
      where,
    });

    if (records.length === 0) {
      return { overallGPA: 0, subjectGPAs: [] };
    }

    // Calculate overall GPA
    const totalGPA = records.reduce((sum: number, record: PerformanceRecord) => sum + (record.gpa || 0), 0);
    const overallGPA = totalGPA / records.length;

    // Calculate per-subject GPA
    const subjectMap = new Map<string, { totalGPA: number; count: number }>();

    records.forEach((record: PerformanceRecord) => {
      const existing = subjectMap.get(record.subject) || { totalGPA: 0, count: 0 };
      subjectMap.set(record.subject, {
        totalGPA: existing.totalGPA + (record.gpa || 0),
        count: existing.count + 1,
      });
    });

    const subjectGPAs = Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      gpa: data.totalGPA / data.count,
      count: data.count,
    }));

    return { overallGPA, subjectGPAs };
  }

  private calculateGrade(percentage: number): { letterGrade: string; gpa: number } {
    if (percentage >= 93) return { letterGrade: 'A', gpa: 4.0 };
    if (percentage >= 90) return { letterGrade: 'A-', gpa: 3.7 };
    if (percentage >= 87) return { letterGrade: 'B+', gpa: 3.3 };
    if (percentage >= 83) return { letterGrade: 'B', gpa: 3.0 };
    if (percentage >= 80) return { letterGrade: 'B-', gpa: 2.7 };
    if (percentage >= 77) return { letterGrade: 'C+', gpa: 2.3 };
    if (percentage >= 73) return { letterGrade: 'C', gpa: 2.0 };
    if (percentage >= 70) return { letterGrade: 'C-', gpa: 1.7 };
    if (percentage >= 67) return { letterGrade: 'D+', gpa: 1.3 };
    if (percentage >= 63) return { letterGrade: 'D', gpa: 1.0 };
    if (percentage >= 60) return { letterGrade: 'D-', gpa: 0.7 };
    return { letterGrade: 'F', gpa: 0.0 };
  }
}
