# StudentSathi - Student Engagement & Analytics Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A comprehensive Learning Management System with **role-based access control**, **real-time analytics**, and **LMS integration support**. Built for modern education with **Supabase** and ready for **separate deployment**.

## Overview

StudentSathi is a production-ready LMS platform designed for educators to track student engagement, manage attendance, analyze performance, and integrate with external platforms. Features enterprise-grade RBAC, Supabase integration, and monorepo structure optimized for independent frontend/backend deployment.

## Features

### ✅ Implemented

#### 1. **Authentication & Authorization**
- Secure user registration and login with JWT
- Access and refresh token mechanism
- Password reset via email
- Role-based access control (Admin, Teacher, Assistant)
- Protected API endpoints
- HttpOnly cookie security

#### 2. **Student Management**
- Complete CRUD operations for students
- Pagination and search functionality
- Engagement score tracking
- Attendance rate monitoring
- Student profile management

#### 3. **Alert System**
- Real-time alert generation
- Unread notification counts
- Alert categorization (engagement drop, attendance low, grade drop, behavioral)
- Severity levels (low, medium, high, critical)
- Mark as read/acknowledged functionality

#### 4. **Attendance Tracking**
- Bulk attendance recording
- Date-based attendance queries
- Student attendance history
- Automatic attendance rate calculation
- Status tracking (present, absent, late, excused)

#### 5. **Performance & Grades**
- Grade recording with automatic GPA calculation
- Subject-wise performance tracking
- Letter grade assignment (A to F scale)
- Overall and per-subject GPA
- Performance history and trends

#### 6. **Analytics Dashboard**
- Real-time dashboard metrics
- Date-range filtering (7/30/90 days)
- Attendance trends
- Engagement trends
- Performance averages
- Active student monitoring

#### 7. **LMS Integrations**
- Configurable LMS integrations (Google Classroom, Canvas, Moodle, Teams)
- Encrypted API key storage
- Sync data functionality (stub implementation)

#### 8. **Webhook System**
- Webhook configuration for external services
- Event-based triggers
- Webhook management (CRUD operations)

#### 9. **Real-time UX**
- Loading states on all actions
- Toast notifications for success/error
- Auto-refresh of notification counts (30s interval)
- Optimistic UI updates
- Error handling with retry logic

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Routing**: React Router v6

## 📁 Project Structure

```
StudentSathi/                    # Monorepo root
├── frontend/                    # Frontend application (React + Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom hooks (auth, RBAC)
│   │   ├── services/           # API service layer
│   │   ├── lib/                # Utilities
│   │   └── types/              # TypeScript types
│   ├── public/                 # Static assets
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite configuration
├── backend/                     # Backend API (Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, RBAC, validation
│   │   ├── types/              # DTOs and types
│   │   └── config/             # Configuration
│   └── package.json            # Backend dependencies
├── .github/
│   ├── workflows/              # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json                # Root package (monorepo scripts)
├── LICENSE                     # MIT License
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Community guidelines
├── CHANGELOG.md                # Version history
├── SECURITY.md                 # Security policy
├── SETUP_GUIDE.md              # Local development setup
├── SUPABASE_MIGRATION.md       # Supabase migration guide
├── RBAC_GUIDE.md               # RBAC implementation guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL 14+ OR Supabase account
- Git

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/naman-agarwal-16/StudentSathi.git
cd StudentSathi

# 2. Install all dependencies
npm run install:all

# 3. Configure backend
cd backend
cp .env.example .env
# Edit .env with your database credentials

# 4. Run database migrations
npx prisma generate
npx prisma migrate dev

# 5. Start development servers (from root)
cd ..
npm run dev
# Frontend: http://localhost:8080
# Backend: http://localhost:3001
```

### Using Supabase

See [SUPABASE_MIGRATION.md](SUPABASE_MIGRATION.md) for complete Supabase setup guide.

```bash
# Quick Supabase setup
cd backend
cp .env.example .env

# Update DATABASE_URL in .env:
# DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

npx prisma generate
npx prisma migrate deploy
```

## API Documentation

All API endpoints are documented in [SETUP_GUIDE.md](./SETUP_GUIDE.md#api-endpoints).

Key endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/students` - List students
- `GET /api/alerts/unread` - Get unread alert count
- `POST /api/attendance/bulk` - Record attendance
- `GET /api/analytics/summary` - Dashboard data

## 🔐 Security

- ✅ Password hashing with bcrypt (salt rounds: 12)
- ✅ JWT token authentication with refresh tokens
- ✅ HttpOnly cookies for secure token storage
- ✅ CORS protection with configurable origins
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Input validation with Zod schemas
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection with sanitization
- ✅ Security headers (Helmet.js)
- ✅ Encrypted API key storage
- ✅ Role-based access control (RBAC)
- ✅ Row-level security ready (Supabase RLS)

See [SECURITY.md](SECURITY.md) for security policy and [SECURITY_IMPLEMENTATION.md](SECURITY_IMPLEMENTATION.md) for implementation details.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend linting
cd frontend
npm run lint
```

Current test coverage: ~90% (backend)

## 🛠️ Development

### Monorepo Commands (from root)
```bash
npm run dev                 # Start both frontend and backend
npm run dev:frontend        # Start only frontend
npm run dev:backend         # Start only backend
npm run build               # Build both projects
npm run build:frontend      # Build frontend
npm run build:backend       # Build backend
npm run install:all         # Install all dependencies
npm run prisma:generate     # Generate Prisma Client
npm run prisma:migrate      # Run database migrations
npm run prisma:studio       # Open Prisma Studio
```

### Backend Development
```bash
cd backend
npm run dev                 # Starts on port 3001 with hot reload
npm run build               # Build for production
npm start                   # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev                 # Starts on port 8080 with HMR
npm run build               # Build for production
npm run preview             # Preview production build
```

### Database Management
```bash
cd backend
npx prisma studio  # Visual database browser
npx prisma migrate dev  # Create new migration
npx prisma generate  # Regenerate Prisma client
```

## Environment Variables

## 📦 Deployment

### Separate Frontend & Backend Deployment

This project is structured as a **monorepo** with independent frontend and backend that can be deployed separately.

#### Deploy Backend
**Recommended Platforms:**
- [Railway](https://railway.app) - Easy PostgreSQL + Node.js deployment
- [Render](https://render.com) - Free tier available
- [Heroku](https://heroku.com) - Classic PaaS
- [Fly.io](https://fly.io) - Global edge deployment

**Quick Deploy to Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add
railway up

# Set environment variables in Railway dashboard
```

#### Deploy Frontend
**Recommended Platforms:**
- [Vercel](https://vercel.com) - Optimized for Vite/React
- [Netlify](https://netlify.com) - Easy continuous deployment
- [Cloudflare Pages](https://pages.cloudflare.com) - Fast global CDN

**Quick Deploy to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set VITE_API_BASE_URL environment variable
```

#### Using Supabase
See [SUPABASE_MIGRATION.md](SUPABASE_MIGRATION.md) for complete guide.

**Benefits:**
- Managed PostgreSQL database
- Connection pooling included
- Automatic backups
- Real-time capabilities
- Row Level Security (RLS)

## 🌍 Environment Variables

### Backend (`backend/.env`)
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/studentsathi"
# OR for Supabase:
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Security
JWT_SECRET=your-secret-key-minimum-32-characters-long
ENCRYPTION_KEY=your-encryption-key-32-characters-long
FRONTEND_URL=http://localhost:8080

# Email (Optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (`frontend/.env`)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
# OR for production:
VITE_API_BASE_URL=https://your-backend.railway.app/api

# Supabase (Optional - if using Supabase client directly)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Quick Start:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our code style
4. Add tests for new features
5. Commit using conventional commits (`feat:`, `fix:`, `docs:`, etc.)
6. Push and open a Pull Request

See also:
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

## 📋 Roadmap

### ✅ Phase 1 (Completed)
- [x] Authentication system with JWT
- [x] Student CRUD operations
- [x] Alert management system
- [x] Attendance tracking
- [x] Performance/grades management
- [x] Analytics dashboard
- [x] LMS integrations (infrastructure)
- [x] Webhook system (infrastructure)
- [x] Role-based access control (RBAC)
- [x] Monorepo structure for separate deployment
- [x] Supabase integration support

### 🚧 Phase 2 (In Progress)
- [ ] Enhanced UI/UX improvements
- [ ] Comprehensive test coverage (>95%)
- [ ] E2E tests with Playwright
- [ ] Real LMS integrations (Google Classroom, Canvas)
- [ ] Actual webhook delivery system
- [ ] Two-factor authentication (2FA)

### 🔮 Phase 3 (Planned)
- [ ] Advanced analytics and ML predictions
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Bulk import/export (CSV, Excel)
- [ ] Custom reporting system
- [ ] Multi-language support (i18n)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Local development setup
- **[SUPABASE_MIGRATION.md](SUPABASE_MIGRATION.md)** - Supabase deployment guide
- **[RBAC_GUIDE.md](RBAC_GUIDE.md)** - Role-based access control documentation
- **[SECURITY.md](SECURITY.md)** - Security policy and reporting
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** - Community guidelines

## 💬 Support

- 📖 **Documentation**: Check the guides above
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/naman-agarwal-16/StudentSathi/issues/new?template=bug_report.yml)
- ✨ **Feature Requests**: [GitHub Issues](https://github.com/naman-agarwal-16/StudentSathi/issues/new?template=feature_request.yml)
- 🔒 **Security Issues**: See [SECURITY.md](SECURITY.md)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/naman-agarwal-16/StudentSathi/discussions)

## 🙏 Acknowledgments

Built with modern technologies and best practices:
- **Frontend**: React 18, TypeScript, Vite, shadcn/ui, TailwindCSS
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Database**: Supabase/PostgreSQL
- **Deployment**: Vercel, Railway, Netlify ready
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

Special thanks to the open-source community and contributors!

---

<div align="center">

**Built with ❤️ for Education**

[![GitHub stars](https://img.shields.io/github/stars/naman-agarwal-16/StudentSathi?style=social)](https://github.com/naman-agarwal-16/StudentSathi)
[![GitHub forks](https://img.shields.io/github/forks/naman-agarwal-16/StudentSathi?style=social)](https://github.com/naman-agarwal-16/StudentSathi/fork)

**Version 1.0.0** | **Status: Production Ready** | **License: MIT**

[Report Bug](https://github.com/naman-agarwal-16/StudentSathi/issues/new?template=bug_report.yml) • [Request Feature](https://github.com/naman-agarwal-16/StudentSathi/issues/new?template=feature_request.yml) • [View Demo](#) • [Documentation](SETUP_GUIDE.md)

</div>
