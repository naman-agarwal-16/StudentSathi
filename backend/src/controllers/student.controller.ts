import { Request, Response } from 'express';
import { StudentService } from '../services/student.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { PaginationQueryDto } from '../types/dtos.js';

export class StudentController {
  constructor(private studentService: StudentService) {}

  createStudent = asyncHandler(async (req: Request, res: Response) => {
    const student = await this.studentService.createStudent(req.body);
    res.status(201).json(student);
  });

  getStudentById = asyncHandler(async (req: Request, res: Response) => {
    const student = await this.studentService.getStudentById(req.params.id);
    res.json(student);
  });

  getAllStudents = asyncHandler(async (req: Request, res: Response) => {
    const pagination: PaginationQueryDto = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      sortBy: req.query.sortBy as string,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };
    const result = await this.studentService.getAllStudents(pagination);
    res.json(result);
  });

  updateStudent = asyncHandler(async (req: Request, res: Response) => {
    const student = await this.studentService.updateStudent(req.params.id, req.body);
    res.json(student);
  });

  deleteStudent = asyncHandler(async (req: Request, res: Response) => {
    await this.studentService.deleteStudent(req.params.id);
    res.status(204).send();
  });

  updateEngagementScore = asyncHandler(async (req: Request, res: Response) => {
    const { score } = req.body;
    const student = await this.studentService.updateEngagementScore(req.params.id, score);
    res.json(student);
  });
}
