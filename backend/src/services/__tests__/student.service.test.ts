import { StudentService } from '../student.service';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../middleware/errorHandler';
import { CreateStudentDto, UpdateStudentDto } from '../../types/dtos';

// Mock Prisma Client
const mockPrismaClient = {
  student: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as PrismaClient;

describe('StudentService', () => {
  let studentService: StudentService;

  beforeEach(() => {
    studentService = new StudentService(mockPrismaClient);
    jest.clearAllMocks();
  });

  describe('createStudent', () => {
    const validStudentData: CreateStudentDto = {
      name: 'John Doe',
      email: 'john@example.com',
      studentId: 'STU001',
      grade: '10',
      section: 'A',
    };

    it('should create a student successfully', async () => {
      const mockStudent = {
        id: '123',
        ...validStudentData,
        enrollmentDate: new Date(),
        engagementScore: 0,
        attendanceRate: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(null);
      (mockPrismaClient.student.create as jest.Mock).mockResolvedValue(mockStudent);

      const result = await studentService.createStudent(validStudentData);

      expect(result).toBeDefined();
      expect(result.name).toBe(validStudentData.name);
      expect(result.email).toBe(validStudentData.email);
      expect(mockPrismaClient.student.create).toHaveBeenCalledTimes(1);
    });

    it('should throw error if email already exists', async () => {
      const existingStudent = {
        id: '123',
        email: validStudentData.email,
        studentId: 'STU002',
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(existingStudent);

      await expect(studentService.createStudent(validStudentData)).rejects.toThrow(AppError);
      await expect(studentService.createStudent(validStudentData)).rejects.toThrow(
        'Student with this email already exists'
      );
    });

    it('should throw error if studentId already exists', async () => {
      const existingStudent = {
        id: '123',
        email: 'different@example.com',
        studentId: validStudentData.studentId,
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(existingStudent);

      await expect(studentService.createStudent(validStudentData)).rejects.toThrow(AppError);
      await expect(studentService.createStudent(validStudentData)).rejects.toThrow(
        'Student with this ID already exists'
      );
    });
  });

  describe('getStudentById', () => {
    it('should return student if found', async () => {
      const mockStudent = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'A',
        engagementScore: 75,
        attendanceRate: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);

      const result = await studentService.getStudentById('123');

      expect(result).toBeDefined();
      expect(result.id).toBe('123');
      expect(result.name).toBe('John Doe');
    });

    it('should throw error if student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(studentService.getStudentById('999')).rejects.toThrow(AppError);
      await expect(studentService.getStudentById('999')).rejects.toThrow('Student not found');
    });
  });

  describe('getAllStudents', () => {
    it('should return paginated students', async () => {
      const mockStudents = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          studentId: 'STU001',
          enrollmentDate: new Date(),
          grade: '10',
          section: 'A',
          engagementScore: 75,
          attendanceRate: 90,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          studentId: 'STU002',
          enrollmentDate: new Date(),
          grade: '10',
          section: 'B',
          engagementScore: 85,
          attendanceRate: 95,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (mockPrismaClient.student.findMany as jest.Mock).mockResolvedValue(mockStudents);
      (mockPrismaClient.student.count as jest.Mock).mockResolvedValue(2);

      const result = await studentService.getAllStudents({
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      expect(result.data).toHaveLength(2);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.totalPages).toBe(1);
    });
  });

  describe('updateStudent', () => {
    const updateData: UpdateStudentDto = {
      name: 'John Updated',
      grade: '11',
    };

    it('should update student successfully', async () => {
      const existingStudent = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'A',
        engagementScore: 75,
        attendanceRate: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedStudent = { ...existingStudent, ...updateData };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(existingStudent);
      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(null);
      (mockPrismaClient.student.update as jest.Mock).mockResolvedValue(updatedStudent);

      const result = await studentService.updateStudent('123', updateData);

      expect(result.name).toBe('John Updated');
      expect(result.grade).toBe('11');
    });

    it('should throw error if student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(studentService.updateStudent('999', updateData)).rejects.toThrow(AppError);
    });
  });

  describe('deleteStudent', () => {
    it('should delete student successfully', async () => {
      const mockStudent = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'A',
        engagementScore: 75,
        attendanceRate: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);
      (mockPrismaClient.student.delete as jest.Mock).mockResolvedValue(mockStudent);

      await studentService.deleteStudent('123');

      expect(mockPrismaClient.student.delete).toHaveBeenCalledWith({ where: { id: '123' } });
    });
  });

  describe('updateEngagementScore', () => {
    it('should update engagement score successfully', async () => {
      const mockStudent = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'A',
        engagementScore: 85,
        attendanceRate: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);
      (mockPrismaClient.student.update as jest.Mock).mockResolvedValue(mockStudent);

      const result = await studentService.updateEngagementScore('123', 85);

      expect(result.engagementScore).toBe(85);
    });

    it('should throw error if score is out of range', async () => {
      await expect(studentService.updateEngagementScore('123', 150)).rejects.toThrow(AppError);
      await expect(studentService.updateEngagementScore('123', -10)).rejects.toThrow(AppError);
    });

    it('should throw error if student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(studentService.updateEngagementScore('999', 85)).rejects.toThrow(AppError);
      await expect(studentService.updateEngagementScore('999', 85)).rejects.toThrow('not found');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors in createStudent', async () => {
      (mockPrismaClient.student.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(studentService.createStudent({
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
      })).rejects.toThrow(AppError);
    });

    it('should handle database errors in getAllStudents', async () => {
      (mockPrismaClient.student.count as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(studentService.getAllStudents({ page: 1, limit: 20, sortOrder: 'desc' })).rejects.toThrow(AppError);
    });

    it('should handle database errors in updateStudent', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(studentService.updateStudent('123', { name: 'Updated' })).rejects.toThrow(AppError);
    });

    it('should handle conflicts in updateStudent with email/studentId', async () => {
      const existingStudent = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'A',
        engagementScore: 0,
        attendanceRate: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const conflictingStudent = {
        id: '456',
        name: 'Jane Doe',
        email: 'jane@example.com',
        studentId: 'STU002',
        enrollmentDate: new Date(),
        grade: '10',
        section: 'B',
        engagementScore: 0,
        attendanceRate: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(existingStudent);
      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(conflictingStudent);

      await expect(studentService.updateStudent('123', {
        email: 'jane@example.com',
      })).rejects.toThrow(AppError);
      await expect(studentService.updateStudent('123', {
        email: 'jane@example.com',
      })).rejects.toThrow('already in use');
    });
  });
});
