import { PrismaClient, AttendanceRecord, AttendanceStatus } from '@prisma/client';
import logger from '../utils/logger.js';
import { CreateAttendanceDto, BulkAttendanceDto } from '../types/dtos.js';

export class AttendanceService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createAttendance(data: CreateAttendanceDto): Promise<AttendanceRecord> {
    try {
      const attendance = await this.prisma.attendanceRecord.create({
        data: {
          studentId: data.studentId,
          date: new Date(data.date),
          status: data.status as AttendanceStatus,
          notes: data.notes,
        },
      });

      // Update student attendance rate
      await this.updateStudentAttendanceRate(data.studentId);

      logger.info(`Attendance created: ${attendance.id}`);
      return attendance;
    } catch (error) {
      logger.error('Error creating attendance:', error);
      throw new Error('Failed to create attendance record');
    }
  }

  async bulkCreateAttendance(data: BulkAttendanceDto): Promise<{ count: number }> {
    try {
      const date = new Date(data.date);
      const records = data.records.map((record) => ({
        studentId: record.studentId,
        date,
        status: record.status as AttendanceStatus,
        notes: record.notes,
      }));

      const result = await this.prisma.attendanceRecord.createMany({
        data: records,
        skipDuplicates: true,
      });

      // Update attendance rates for all students
      const studentIds = data.records.map((r) => r.studentId);
      await Promise.all(studentIds.map((id) => this.updateStudentAttendanceRate(id)));

      logger.info(`Bulk attendance created: ${result.count} records`);
      return { count: result.count };
    } catch (error) {
      logger.error('Error creating bulk attendance:', error);
      throw new Error('Failed to create attendance records');
    }
  }

  async getAttendanceByStudent(
    studentId: string,
    options?: {
      startDate?: Date;
      endDate?: Date;
      status?: AttendanceStatus;
    }
  ): Promise<AttendanceRecord[]> {
    const where: any = { studentId };

    if (options?.startDate || options?.endDate) {
      where.date = {};
      if (options.startDate) where.date.gte = options.startDate;
      if (options.endDate) where.date.lte = options.endDate;
    }

    if (options?.status) {
      where.status = options.status;
    }

    return this.prisma.attendanceRecord.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async getAttendanceByDate(
    date: Date,
    options?: { status?: AttendanceStatus }
  ): Promise<AttendanceRecord[]> {
    const where: any = {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    };

    if (options?.status) {
      where.status = options.status;
    }

    return this.prisma.attendanceRecord.findMany({
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
      orderBy: { student: { name: 'asc' } },
    });
  }

  async updateAttendance(
    id: string,
    data: Partial<CreateAttendanceDto>
  ): Promise<AttendanceRecord> {
    const updateData: any = {};

    if (data.status) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.date) updateData.date = new Date(data.date);

    const attendance = await this.prisma.attendanceRecord.update({
      where: { id },
      data: updateData,
    });

    // Update student attendance rate
    await this.updateStudentAttendanceRate(attendance.studentId);

    logger.info(`Attendance updated: ${id}`);
    return attendance;
  }

  async deleteAttendance(id: string): Promise<void> {
    const attendance = await this.prisma.attendanceRecord.findUnique({
      where: { id },
    });

    if (!attendance) {
      throw new Error('Attendance record not found');
    }

    await this.prisma.attendanceRecord.delete({
      where: { id },
    });

    // Update student attendance rate
    await this.updateStudentAttendanceRate(attendance.studentId);

    logger.info(`Attendance deleted: ${id}`);
  }

  private async updateStudentAttendanceRate(studentId: string): Promise<void> {
    try {
      const records = await this.prisma.attendanceRecord.findMany({
        where: { studentId },
      });

      if (records.length === 0) {
        return;
      }

      const presentCount = records.filter(
        (r) => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE
      ).length;

      const attendanceRate = (presentCount / records.length) * 100;

      await this.prisma.student.update({
        where: { id: studentId },
        data: { attendanceRate },
      });
    } catch (error) {
      logger.error('Error updating attendance rate:', error);
      // Don't throw - this is a background update
    }
  }

  async getAttendanceStats(studentId: string): Promise<{
    totalDays: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    rate: number;
  }> {
    const records = await this.prisma.attendanceRecord.findMany({
      where: { studentId },
    });

    const stats = {
      totalDays: records.length,
      present: records.filter((r) => r.status === AttendanceStatus.PRESENT).length,
      absent: records.filter((r) => r.status === AttendanceStatus.ABSENT).length,
      late: records.filter((r) => r.status === AttendanceStatus.LATE).length,
      excused: records.filter((r) => r.status === AttendanceStatus.EXCUSED).length,
      rate: 0,
    };

    if (stats.totalDays > 0) {
      stats.rate = ((stats.present + stats.late) / stats.totalDays) * 100;
    }

    return stats;
  }
}
