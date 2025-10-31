# StudentSathi - Production Setup Guide

## Overview

StudentSathi is a comprehensive Learning Management System (LMS) with student engagement tracking, attendance management, performance analytics, and third-party integrations.

## Architecture

- **Backend**: Node.js + Express + TypeScript + Prisma + PostgreSQL
- **Frontend**: React + TypeScript + Vite + shadcn/ui + TailwindCSS
- **Authentication**: JWT with refresh tokens + HttpOnly cookies
- **Database**: PostgreSQL with Prisma ORM

## Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm or yarn
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Agent05-code/StudentSathi.git
cd StudentSathi
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

#### Configure Backend Environment (.env)

```env
# Environment
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/studentsathi?schema=public"

# Frontend
FRONTEND_URL=http://localhost:8080

# Security (REQUIRED - Generate strong secrets in production)
JWT_SECRET=your-secret-key-min-32-characters-long
ENCRYPTION_KEY=your-encryption-key-32-chars-long
CORS_ORIGIN=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email / SMTP (optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@studentsathi.com
```

#### Setup Database

```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Optional) Seed database with sample data
npx prisma db seed
```

#### Build and Start Backend

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

Backend will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd ../  # Back to root directory

# Install dependencies
npm install

# Create .env file for frontend
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
```

#### Build and Start Frontend

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm run preview
```

Frontend will be available at `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/me` - Get current user

### Students

- `GET /api/students` - List students (with pagination & search)
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Alerts

- `GET /api/alerts` - List alerts (with filters)
- `GET /api/alerts/unread` - Get unread count
- `POST /api/alerts` - Create alert
- `PATCH /api/alerts/:id/read` - Mark alert as read
- `PATCH /api/alerts/read-all` - Mark all alerts as read

### Attendance

- `POST /api/attendance/bulk` - Bulk create attendance records
- `GET /api/attendance/by-date` - Get attendance by date
- `GET /api/attendance/student/:studentId` - Get student attendance history
- `GET /api/attendance/student/:studentId/stats` - Get attendance statistics

### Performance

- `POST /api/performance` - Create performance record
- `GET /api/performance/student/:studentId` - Get student performance history
- `GET /api/performance/student/:studentId/gpa` - Get student GPA

### Analytics

- `GET /api/analytics/summary` - Get dashboard summary (with date filter)
- `GET /api/analytics/engagement/timeseries` - Get engagement time series

### Integrations

- `POST /api/integrations/lms/config` - Create/update LMS configuration
- `GET /api/integrations/lms/config` - Get LMS configurations
- `POST /api/integrations/webhooks` - Create webhook
- `GET /api/integrations/webhooks/:provider` - List webhooks

## Authentication Flow

1. **Registration**: User registers with email, password, and name
2. **Login**: User logs in, receives access token (15min) and refresh token (7 days)
3. **Access Token**: Stored in localStorage, sent with every API request
4. **Refresh Token**: Stored in HttpOnly cookie, used to get new access token
5. **Token Refresh**: Automatic when access token expires
6. **Logout**: Clears tokens and redirects to login

## Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with expiration
- HttpOnly cookies for refresh tokens
- CORS configured
- Rate limiting on API endpoints
- Helmet.js security headers
- Input validation with Zod
- SQL injection protection (Prisma ORM)
- Role-based authorization

## Email Configuration (Optional)

For password reset functionality, configure SMTP settings:

### Gmail Example

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in .env:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
```

### SendGrid Example

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting

```bash
# Backend
cd backend
npm run lint
npm run lint:fix

# Frontend
cd ../
npm run lint
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:

1. **Generate strong secrets**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **Update .env**:
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET` and `ENCRYPTION_KEY`
- Configure production database URL
- Set production `CORS_ORIGIN` and `FRONTEND_URL`
- Configure production SMTP settings

### Database Migration

```bash
cd backend
npx prisma migrate deploy
```

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd ../
npm run build
```

### Process Management

Use PM2 or similar:

```bash
npm install -g pm2

# Start backend
cd backend
pm2 start dist/server.js --name studentsathi-backend

# Serve frontend with nginx or similar
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Check user permissions

### Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration times
- Clear browser cookies/localStorage
- Check CORS configuration

### SMTP Issues

- Verify SMTP credentials
- Check firewall/port access
- Enable "Less secure app access" or use app passwords
- Check SMTP logs

## Support

For issues and questions:
- GitHub Issues: https://github.com/Agent05-code/StudentSathi/issues
- Documentation: Check README.md files

## License

MIT License - See LICENSE file for details
