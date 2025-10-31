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
import { AuthService } from './services/auth.service.js';
import { EmailService } from './services/email.service.js';
import { StudentController } from './controllers/student.controller.js';
import { AuthController } from './controllers/auth.controller.js';
import { createStudentRouter } from './routes/student.routes.js';
import { createAuthRouter } from './routes/auth.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

class Server {
  private app: Application;
  private dbService: DatabaseService;

  constructor() {
    this.app = express();
    this.dbService = DatabaseService.getInstance();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS
    this.app.use(
      cors({
        origin: config.corsOrigin,
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

  private configureRoutes(): void {
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
    const authService = new AuthService(prisma);
    const emailService = new EmailService();
    const authController = new AuthController(authService, emailService);
    this.app.use('/api/auth', createAuthRouter(authController));

    // Student routes
    const studentService = new StudentService(prisma);
    const studentController = new StudentController(studentService);
    this.app.use('/api/students', createStudentRouter(studentController));

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
