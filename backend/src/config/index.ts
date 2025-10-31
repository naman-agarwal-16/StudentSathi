import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  corsOrigin: string;
  jwtSecret: string;
  frontendUrl: string;
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    from?: string;
    auth?: {
      user: string;
      pass: string;
    };
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  smtp: process.env.SMTP_HOST ? {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    from: process.env.SMTP_FROM,
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
  } : undefined,
};

export default config;
