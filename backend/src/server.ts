import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import config from './config/index.js';
import logger from './utils/logger.js';
import DatabaseService from './services/database.service.js';
import { StudentService } from './services/student.service.js';
import { StudentController } from './controllers/student.controller.js';
import { createStudentRouter } from './routes/student.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

class Server {
  private app: Application;
  private dbService: DatabaseService;

  constructor() {
    this.app = express();
    this.dbService = DatabaseService.getInstance();
  }

  async initialize(): Promise<void> {
    this.configureMiddleware();
    await this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS - support multiple origins
    const allowedOrigins = config.corsOrigin.split(',').map(origin => origin.trim());
    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          
          if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
      })
    );

    // Cookie parser
    this.app.use(cookieParser());

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.maxRequests,
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Request logging
    this.app.use((req, _res, next) => {
      logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('user-agent'),
      });
      next();
    });
  }

  private async configureRoutes(): Promise<void> {
    // Health check
    this.app.get('/health', async (_req: Request, res: Response) => {
      const dbHealthy = await this.dbService.healthCheck();
      res.status(dbHealthy ? 200 : 503).json({
        status: dbHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbHealthy ? 'connected' : 'disconnected',
      });
    });

    // API routes with dependency injection
    const prisma = this.dbService.getClient();
    
    // Auth routes
    const { AuthService } = await import('./services/auth.service.js');
    const { EmailService } = await import('./services/email.service.js');
    const { AuthController } = await import('./controllers/auth.controller.js');
    const { createAuthRouter } = await import('./routes/auth.routes.js');
    
    const authService = new AuthService(prisma);
    const emailService = new EmailService();
    const authController = new AuthController(authService, emailService);
    this.app.use('/api/auth', createAuthRouter(authController));

    // Student routes
    const studentService = new StudentService(prisma);
    const studentController = new StudentController(studentService);
    this.app.use('/api/students', createStudentRouter(studentController));

    // Alert routes
    const { AlertService } = await import('./services/alert.service.js');
    const { AlertController } = await import('./controllers/alert.controller.js');
    const { createAlertRouter } = await import('./routes/alert.routes.js');
    
    const alertService = new AlertService(prisma);
    const alertController = new AlertController(alertService);
    this.app.use('/api/alerts', createAlertRouter(alertController));

    // Attendance routes
    const { AttendanceService } = await import('./services/attendance.service.js');
    const { AttendanceController } = await import('./controllers/attendance.controller.js');
    const { createAttendanceRouter } = await import('./routes/attendance.routes.js');
    
    const attendanceService = new AttendanceService(prisma);
    const attendanceController = new AttendanceController(attendanceService);
    this.app.use('/api/attendance', createAttendanceRouter(attendanceController));

    // Performance routes
    const { PerformanceService } = await import('./services/performance.service.js');
    const { PerformanceController } = await import('./controllers/performance.controller.js');
    const { createPerformanceRouter } = await import('./routes/performance.routes.js');
    
    const performanceService = new PerformanceService(prisma);
    const performanceController = new PerformanceController(performanceService);
    this.app.use('/api/performance', createPerformanceRouter(performanceController));

    // Analytics routes
    const { AnalyticsService } = await import('./services/analytics.service.js');
    const { AnalyticsController } = await import('./controllers/analytics.controller.js');
    const { createAnalyticsRouter } = await import('./routes/analytics.routes.js');
    
    const analyticsService = new AnalyticsService(prisma);
    const analyticsController = new AnalyticsController(analyticsService);
    this.app.use('/api/analytics', createAnalyticsRouter(analyticsController));

    // Integration routes (LMS & Webhooks)
    const { LMSService } = await import('./services/lms.service.js');
    const { WebhookService } = await import('./services/webhook.service.js');
    const { IntegrationController } = await import('./controllers/integration.controller.js');
    const { createIntegrationRouter } = await import('./routes/integration.routes.js');
    
    const lmsService = new LMSService(prisma);
    const webhookService = new WebhookService(prisma);
    const integrationController = new IntegrationController(lmsService, webhookService);
    this.app.use('/api/integrations', createIntegrationRouter(integrationController));

    // Root route
    this.app.get('/', (_req: Request, res: Response) => {
      res.json({
        message: 'StudentSathi API',
        version: '1.0.0',
        documentation: '/api/docs',
      });
    });
  }

  private configureErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Initialize routes
      await this.initialize();

      // Connect to database
      await this.dbService.connect();

      // Start server
      this.app.listen(config.port, () => {
        logger.info(`Server running on port ${config.port}`);
        logger.info(`Environment: ${config.nodeEnv}`);
        logger.info(`CORS enabled for: ${config.corsOrigin}`);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.dbService.disconnect();
      logger.info('Server stopped gracefully');
    } catch (error) {
      logger.error('Error stopping server:', error);
      process.exit(1);
    }
  }
}

// Start server
const server = new Server();
server.start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await server.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await server.stop();
  process.exit(0);
});

export default Server;
