import request from 'supertest';
import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';
import { StudentController } from '../student.controller.js';
import { StudentService } from '../../services/student.service.js';
import { createStudentRouter } from '../../routes/student.routes.js';
import { errorHandler, notFoundHandler } from '../../middleware/errorHandler.js';

// Mock Prisma Client
const mockPrismaClient = {
  student: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
} as unknown as PrismaClient;

describe('StudentController Integration Tests', () => {
  let app: Application;
  let studentService: StudentService;
  let studentController: StudentController;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create Express app for testing
    app = express();
    app.use(express.json());

    // Set up dependency injection
    studentService = new StudentService(mockPrismaClient);
    studentController = new StudentController(studentService);

    // Mount routes
    app.use('/api/students', createStudentRouter(studentController));

    // Add error handlers
    app.use(notFoundHandler);
    app.use(errorHandler);
  });

  describe('POST /api/students', () => {
    it('should create a student with valid data and return 201', async () => {
      const mockStudent = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        engagementScore: 0,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(null);
      (mockPrismaClient.student.create as jest.Mock).mockResolvedValue(mockStudent);

      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          studentId: 'STU001',
        });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
      });
      expect(mockPrismaClient.student.create).toHaveBeenCalledTimes(1);
    });

    it('should return 400 with invalid email', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          studentId: 'STU001',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Validation');
    });

    it('should return 400 with missing required fields', async () => {
      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'John Doe',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Validation');
    });

    it('should return 409 when email already exists', async () => {
      const existingStudent = {
        id: '1',
        name: 'Jane Doe',
        email: 'john@example.com',
        studentId: 'STU002',
        engagementScore: 0,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(existingStudent);

      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          studentId: 'STU001',
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('this email already exists');
    });

    it('should return 409 when studentId already exists', async () => {
      const existingStudent = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        studentId: 'STU001',
        engagementScore: 0,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(existingStudent);

      const response = await request(app)
        .post('/api/students')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          studentId: 'STU001',
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('this ID already exists');
    });
  });

  describe('GET /api/students/:id', () => {
    it('should return student when found', async () => {
      const mockStudent = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        engagementScore: 85,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);

      const response = await request(app).get('/api/students/1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
      });
    });

    it('should return 404 when student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/students/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toContain('not found');
    });
  });

  describe('GET /api/students', () => {
    it('should return paginated students', async () => {
      const mockStudents = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          studentId: 'STU001',
          engagementScore: 85,
          enrollmentDate: new Date(),
          grade: null,
          section: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          studentId: 'STU002',
          engagementScore: 90,
          enrollmentDate: new Date(),
          grade: null,
          section: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (mockPrismaClient.student.count as jest.Mock).mockResolvedValue(2);
      (mockPrismaClient.student.findMany as jest.Mock).mockResolvedValue(mockStudents);

      const response = await request(app).get('/api/students?page=1&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.students).toHaveLength(2);
      expect(response.body.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      });
    });

    it('should handle empty results', async () => {
      (mockPrismaClient.student.count as jest.Mock).mockResolvedValue(0);
      (mockPrismaClient.student.findMany as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/students');

      expect(response.status).toBe(200);
      expect(response.body.students).toHaveLength(0);
      expect(response.body.pagination.total).toBe(0);
    });
  });

  describe('PUT /api/students/:id', () => {
    it('should update student successfully', async () => {
      const existingStudent = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        engagementScore: 85,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedStudent = {
        ...existingStudent,
        name: 'John Updated',
      };

      // Mock findUnique for getStudentById check, findFirst for conflicts, and update
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(existingStudent);
      (mockPrismaClient.student.findFirst as jest.Mock).mockResolvedValue(null);
      (mockPrismaClient.student.update as jest.Mock).mockResolvedValue(updatedStudent);

      const response = await request(app)
        .put('/api/students/1')
        .send({
          name: 'John Updated',
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('John Updated');
    });

    it('should return 404 when student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/students/999')
        .send({
          name: 'John Updated',
        });

      expect(response.status).toBe(404);
    });

    it('should return 400 with invalid data', async () => {
      const response = await request(app)
        .put('/api/students/1')
        .send({
          email: 'invalid-email',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('should delete student successfully', async () => {
      const mockStudent = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        engagementScore: 85,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);
      (mockPrismaClient.student.delete as jest.Mock).mockResolvedValue(mockStudent);

      const response = await request(app).delete('/api/students/1');

      expect(response.status).toBe(204);
      expect(mockPrismaClient.student.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return 404 when student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/api/students/999');

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/students/:id/engagement', () => {
    it('should update engagement score successfully', async () => {
      const mockStudent = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        studentId: 'STU001',
        engagementScore: 85,
        enrollmentDate: new Date(),
        grade: null,
        section: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedStudent = {
        ...mockStudent,
        engagementScore: 95,
      };

      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(mockStudent);
      (mockPrismaClient.student.update as jest.Mock).mockResolvedValue(updatedStudent);

      const response = await request(app)
        .patch('/api/students/1/engagement')
        .send({ score: 95 });

      expect(response.status).toBe(200);
      expect(response.body.engagementScore).toBe(95);
    });

    it('should return 400 with score out of range', async () => {
      const response = await request(app)
        .patch('/api/students/1/engagement')
        .send({ score: 150 });

      expect(response.status).toBe(400);
    });

    it('should return 404 when student not found', async () => {
      (mockPrismaClient.student.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .patch('/api/students/999/engagement')
        .send({ score: 95 });

      expect(response.status).toBe(404);
    });
  });
});
