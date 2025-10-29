import { PrismaClient, Student } from '@prisma/client';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto, PaginationQueryDto } from '../types/dtos.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export class StudentService {
  constructor(private prisma: PrismaClient) {}

  async createStudent(data: CreateStudentDto): Promise<StudentResponseDto> {
    try {
      // Check if student with email or studentId already exists
      const existingStudent = await this.prisma.student.findFirst({
        where: {
          OR: [
            { email: data.email },
            { studentId: data.studentId },
          ],
        },
      });

      if (existingStudent) {
        if (existingStudent.email === data.email) {
          throw new AppError(409, 'Student with this email already exists');
        }
        throw new AppError(409, 'Student with this ID already exists');
      }

      const student = await this.prisma.student.create({
        data: {
          name: data.name,
          email: data.email,
          studentId: data.studentId,
          enrollmentDate: data.enrollmentDate ? new Date(data.enrollmentDate) : new Date(),
          grade: data.grade,
          section: data.section,
        },
      });

      logger.info(`Student created: ${student.id}`);
      return this.mapToDto(student);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Error creating student:', error);
      throw new AppError(500, 'Failed to create student');
    }
  }

  async getStudentById(id: string): Promise<StudentResponseDto> {
    try {
      const student = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!student) {
        throw new AppError(404, 'Student not found');
      }

      return this.mapToDto(student);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Error fetching student:', error);
      throw new AppError(500, 'Failed to fetch student');
    }
  }

  async getAllStudents(pagination: PaginationQueryDto) {
    try {
      const { page, limit, sortBy = 'createdAt', sortOrder } = pagination;
      const skip = (page - 1) * limit;

      const [students, total] = await Promise.all([
        this.prisma.student.findMany({
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
        }),
        this.prisma.student.count(),
      ]);

      return {
        data: students.map(this.mapToDto),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error fetching students:', error);
      throw new AppError(500, 'Failed to fetch students');
    }
  }

  async updateStudent(id: string, data: UpdateStudentDto): Promise<StudentResponseDto> {
    try {
      // Check if student exists
      await this.getStudentById(id);

      // If updating email or studentId, check for conflicts
      if (data.email || data.studentId) {
        const conflicts = await this.prisma.student.findFirst({
          where: {
            AND: [
              { id: { not: id } },
              {
                OR: [
                  data.email ? { email: data.email } : {},
                  data.studentId ? { studentId: data.studentId } : {},
                ],
              },
            ],
          },
        });

        if (conflicts) {
          throw new AppError(409, 'Email or Student ID already in use');
        }
      }

      const student = await this.prisma.student.update({
        where: { id },
        data,
      });

      logger.info(`Student updated: ${student.id}`);
      return this.mapToDto(student);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Error updating student:', error);
      throw new AppError(500, 'Failed to update student');
    }
  }

  async deleteStudent(id: string): Promise<void> {
    try {
      await this.getStudentById(id);
      await this.prisma.student.delete({
        where: { id },
      });
      logger.info(`Student deleted: ${id}`);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Error deleting student:', error);
      throw new AppError(500, 'Failed to delete student');
    }
  }

  async updateEngagementScore(id: string, score: number): Promise<StudentResponseDto> {
    try {
      if (score < 0 || score > 100) {
        throw new AppError(400, 'Engagement score must be between 0 and 100');
      }

      // Check if student exists
      await this.getStudentById(id);

      const student = await this.prisma.student.update({
        where: { id },
        data: { engagementScore: score },
      });

      return this.mapToDto(student);
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Error updating engagement score:', error);
      throw new AppError(500, 'Failed to update engagement score');
    }
  }

  private mapToDto(student: Student): StudentResponseDto {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      enrollmentDate: student.enrollmentDate.toISOString(),
      grade: student.grade || undefined,
      section: student.section || undefined,
      engagementScore: student.engagementScore,
      attendanceRate: student.attendanceRate,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
    };
  }
}
