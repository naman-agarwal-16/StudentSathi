import { Request, Response } from 'express';
import { PerformanceService } from '../services/performance.service.js';
import logger from '../utils/logger.js';

export class PerformanceController {
  private performanceService: PerformanceService;

  constructor(performanceService: PerformanceService) {
    this.performanceService = performanceService;
  }

  createPerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const performance = await this.performanceService.createPerformance(req.body);
      res.status(201).json(performance);
    } catch (error) {
      logger.error('Create performance error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create performance';
      res.status(400).json({ error: 'Create failed', message });
    }
  };

  getPerformanceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const performance = await this.performanceService.getPerformanceById(req.params.id);
      res.status(200).json(performance);
    } catch (error) {
      logger.error('Get performance error:', error);
      res.status(404).json({ error: 'Performance not found', message: 'Record does not exist' });
    }
  };

  getPerformanceByStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const { subject, type, startDate, endDate } = req.query;

      const options: any = {};
      if (subject) options.subject = subject as string;
      if (type) options.type = type as string;
      if (startDate) options.startDate = new Date(startDate as string);
      if (endDate) options.endDate = new Date(endDate as string);

      const records = await this.performanceService.getPerformanceByStudent(studentId, options);
      res.status(200).json(records);
    } catch (error) {
      logger.error('Get performance by student error:', error);
      res.status(500).json({ error: 'Failed to fetch performance', message: 'Server error' });
    }
  };

  updatePerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const performance = await this.performanceService.updatePerformance(id, req.body);
      res.status(200).json(performance);
    } catch (error) {
      logger.error('Update performance error:', error);
      res.status(404).json({ error: 'Performance not found', message: 'Record does not exist' });
    }
  };

  deletePerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.performanceService.deletePerformance(id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete performance error:', error);
      res.status(404).json({ error: 'Performance not found', message: 'Record does not exist' });
    }
  };

  getStudentGPA = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const { subject, startDate, endDate } = req.query;

      const options: any = {};
      if (subject) options.subject = subject as string;
      if (startDate) options.startDate = new Date(startDate as string);
      if (endDate) options.endDate = new Date(endDate as string);

      const gpaData = await this.performanceService.getStudentGPA(studentId, options);
      res.status(200).json(gpaData);
    } catch (error) {
      logger.error('Get student GPA error:', error);
      res.status(500).json({ error: 'Failed to fetch GPA', message: 'Server error' });
    }
  };
}
