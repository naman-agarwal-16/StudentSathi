import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendance.service.js';
import logger from '../utils/logger.js';

export class AttendanceController {
  private attendanceService: AttendanceService;

  constructor(attendanceService: AttendanceService) {
    this.attendanceService = attendanceService;
  }

  createAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
      const attendance = await this.attendanceService.createAttendance(req.body);
      res.status(201).json(attendance);
    } catch (error) {
      logger.error('Create attendance error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create attendance';
      res.status(400).json({ error: 'Create failed', message });
    }
  };

  bulkCreateAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.attendanceService.bulkCreateAttendance(req.body);
      res.status(201).json(result);
    } catch (error) {
      logger.error('Bulk create attendance error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create attendance';
      res.status(400).json({ error: 'Create failed', message });
    }
  };

  getAttendanceByStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const { startDate, endDate, status } = req.query;

      const options: any = {};
      if (startDate) options.startDate = new Date(startDate as string);
      if (endDate) options.endDate = new Date(endDate as string);
      if (status) options.status = status;

      const records = await this.attendanceService.getAttendanceByStudent(studentId, options);
      res.status(200).json(records);
    } catch (error) {
      logger.error('Get attendance by student error:', error);
      res.status(500).json({ error: 'Failed to fetch attendance', message: 'Server error' });
    }
  };

  getAttendanceByDate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { date } = req.query;
      const { status } = req.query;

      if (!date) {
        res.status(400).json({ error: 'Bad request', message: 'Date parameter required' });
        return;
      }

      const options: any = {};
      if (status) options.status = status;

      const records = await this.attendanceService.getAttendanceByDate(
        new Date(date as string),
        options
      );
      res.status(200).json(records);
    } catch (error) {
      logger.error('Get attendance by date error:', error);
      res.status(500).json({ error: 'Failed to fetch attendance', message: 'Server error' });
    }
  };

  updateAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const attendance = await this.attendanceService.updateAttendance(id, req.body);
      res.status(200).json(attendance);
    } catch (error) {
      logger.error('Update attendance error:', error);
      res.status(404).json({ error: 'Attendance not found', message: 'Record does not exist' });
    }
  };

  deleteAttendance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.attendanceService.deleteAttendance(id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete attendance error:', error);
      res.status(404).json({ error: 'Attendance not found', message: 'Record does not exist' });
    }
  };

  getAttendanceStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const stats = await this.attendanceService.getAttendanceStats(studentId);
      res.status(200).json(stats);
    } catch (error) {
      logger.error('Get attendance stats error:', error);
      res.status(500).json({ error: 'Failed to fetch stats', message: 'Server error' });
    }
  };
}
