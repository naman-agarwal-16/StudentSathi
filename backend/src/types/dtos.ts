import { z } from 'zod';

// Auth DTOs
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(100),
  role: z.enum(['ADMIN', 'TEACHER', 'ASSISTANT']).default('TEACHER'),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(100),
});

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    role: z.enum(['ADMIN', 'TEACHER', 'ASSISTANT']),
  }),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;

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
  type: z.enum(['ENGAGEMENT_DROP', 'ATTENDANCE_LOW', 'GRADE_DROP', 'BEHAVIORAL']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  message: z.string().min(10).max(500),
  metadata: z.record(z.unknown()).optional(),
});

export const AlertResponseSchema = CreateAlertSchema.extend({
  id: z.string().uuid(),
  status: z.enum(['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED']),
  isRead: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CreateAlertDto = z.infer<typeof CreateAlertSchema>;
export type AlertResponseDto = z.infer<typeof AlertResponseSchema>;

// Attendance DTOs
export const CreateAttendanceSchema = z.object({
  studentId: z.string().uuid(),
  date: z.string().datetime(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
  notes: z.string().optional(),
});

export const BulkAttendanceSchema = z.object({
  date: z.string().datetime(),
  records: z.array(z.object({
    studentId: z.string().uuid(),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
    notes: z.string().optional(),
  })),
});

export type CreateAttendanceDto = z.infer<typeof CreateAttendanceSchema>;
export type BulkAttendanceDto = z.infer<typeof BulkAttendanceSchema>;

// Performance DTOs
export const CreatePerformanceSchema = z.object({
  studentId: z.string().uuid(),
  subject: z.string().min(1).max(100),
  score: z.number().min(0),
  maxScore: z.number().min(0),
  date: z.string().datetime(),
  type: z.enum(['quiz', 'test', 'assignment', 'exam']),
  notes: z.string().optional(),
});

export const PerformanceResponseSchema = CreatePerformanceSchema.extend({
  id: z.string().uuid(),
  letterGrade: z.string().optional(),
  gpa: z.number().optional(),
  createdAt: z.string().datetime(),
});

export type CreatePerformanceDto = z.infer<typeof CreatePerformanceSchema>;
export type PerformanceResponseDto = z.infer<typeof PerformanceResponseSchema>;

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
