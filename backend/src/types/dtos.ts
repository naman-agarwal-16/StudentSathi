import { z } from 'zod';

// Student DTOs
export const CreateStudentSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  studentId: z.string().min(3).max(50),
  enrollmentDate: z.string().datetime().optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
});

export const UpdateStudentSchema = CreateStudentSchema.partial();

export const StudentResponseSchema = CreateStudentSchema.extend({
  id: z.string().uuid(),
  engagementScore: z.number().min(0).max(100),
  attendanceRate: z.number().min(0).max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentDto = z.infer<typeof UpdateStudentSchema>;
export type StudentResponseDto = z.infer<typeof StudentResponseSchema>;

// Analytics DTOs
export const AnalyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  studentId: z.string().uuid().optional(),
  metric: z.enum(['engagement', 'attendance', 'performance']).optional(),
});

export type AnalyticsQueryDto = z.infer<typeof AnalyticsQuerySchema>;

export const AnalyticsResponseSchema = z.object({
  metric: z.string(),
  value: z.number(),
  trend: z.enum(['up', 'down', 'stable']),
  timestamp: z.string().datetime(),
});

export type AnalyticsResponseDto = z.infer<typeof AnalyticsResponseSchema>;

// Alert DTOs
export const CreateAlertSchema = z.object({
  studentId: z.string().uuid(),
  type: z.enum(['engagement_drop', 'attendance_low', 'grade_drop', 'behavioral']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  message: z.string().min(10).max(500),
  metadata: z.record(z.unknown()).optional(),
});

export const AlertResponseSchema = CreateAlertSchema.extend({
  id: z.string().uuid(),
  status: z.enum(['active', 'acknowledged', 'resolved']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreateAlertDto = z.infer<typeof CreateAlertSchema>;
export type AlertResponseDto = z.infer<typeof AlertResponseSchema>;

// LMS Integration DTOs
export const LMSConfigSchema = z.object({
  platform: z.enum(['google_classroom', 'canvas', 'moodle', 'teams']),
  apiKey: z.string().min(10),
  baseUrl: z.string().url(),
  enabled: z.boolean().default(true),
});

export type LMSConfigDto = z.infer<typeof LMSConfigSchema>;

// Webhook DTOs
export const WebhookConfigSchema = z.object({
  name: z.string().min(2).max(100),
  url: z.string().url(),
  event: z.enum(['engagement_alert', 'attendance_low', 'grade_drop', 'weekly_report']),
  enabled: z.boolean().default(true),
});

export type WebhookConfigDto = z.infer<typeof WebhookConfigSchema>;

// Error Response DTO
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
  timestamp: z.string().datetime(),
  path: z.string().optional(),
  details: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })).optional(),
});

export type ErrorResponseDto = z.infer<typeof ErrorResponseSchema>;

// Pagination DTOs
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationQueryDto = z.infer<typeof PaginationQuerySchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  });
