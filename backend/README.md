# StudentSathi Backend API

A robust, type-safe backend API for the StudentSathi Learning Management System built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- ✅ **TypeScript** - Fully typed codebase for better developer experience
- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **PostgreSQL** - Robust relational database with Prisma ORM
- ✅ **Input Validation** - Zod schema validation for all endpoints
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Dependency Injection** - Clean architecture with DI pattern
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Testing** - Jest unit tests with >90% coverage target
- ✅ **Logging** - Winston logger for production-grade logging
- ✅ **Database Migrations** - Prisma migrations for schema versioning
- ✅ **Connection Pooling** - Optimized database connections

## Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/studentsathi"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

## Development

```bash
# Start development server with hot reload
npm run dev

# Run in production mode
npm run build
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## API Endpoints

### Students

- `GET /api/students` - Get all students (paginated)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `PATCH /api/students/:id/engagement` - Update engagement score

### Health Check

- `GET /health` - Health check endpoint

## Database Schema

The database uses a normalized schema with the following main entities:

- **Students** - Student information and metrics
- **Alerts** - Engagement and performance alerts
- **Analytics** - Time-series analytics data
- **AttendanceRecords** - Daily attendance tracking
- **PerformanceRecords** - Academic performance tracking
- **LMSIntegration** - External LMS platform configurations
- **WebhookConfig** - Webhook configurations for notifications

## Environment Variables

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/studentsathi
CORS_ORIGIN=http://localhost:8080
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Architecture

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Database models (Prisma)
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types and DTOs
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Database seeder
└── package.json
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Current test coverage target: **≥90%**

## Security Features

- **Helmet.js** - Secure HTTP headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Zod schema validation
- **Error Handling** - Secure error messages
- **SQL Injection Protection** - Prisma ORM

## Performance Optimizations

- Connection pooling with Prisma
- Database indexes on frequently queried fields
- Compression middleware for responses
- Efficient pagination for large datasets
- Query optimization with proper relations

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

MIT
