# StudentSathi - Student Engagement & Analytics Platform

## Overview

StudentSathi is a comprehensive Learning Management System (LMS) designed to help educators track student engagement, manage attendance, analyze performance, and integrate with external platforms. Built with modern web technologies, it provides real-time analytics and actionable insights to improve student outcomes.

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

## Quick Start

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

```bash
# Clone repository
git clone https://github.com/Agent05-code/StudentSathi.git
cd StudentSathi

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npx prisma migrate dev
npm run dev

# Setup frontend (in new terminal)
cd ..
npm install
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
npm run dev
```

## Project Structure

```
StudentSathi/
├── backend/               # Backend API
│   ├── prisma/           # Database schema and migrations
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── types/        # TypeScript types and DTOs
│   │   ├── config/       # Configuration
│   │   └── utils/        # Utilities
│   └── package.json
├── src/                  # Frontend application
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks (including auth)
│   ├── services/        # API service layer
│   ├── lib/             # Utilities
│   └── data/            # Mock data (legacy)
├── public/              # Static assets
├── SETUP_GUIDE.md       # Detailed setup instructions
└── package.json         # Frontend dependencies
```

## API Documentation

All API endpoints are documented in [SETUP_GUIDE.md](./SETUP_GUIDE.md#api-endpoints).

Key endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/students` - List students
- `GET /api/alerts/unread` - Get unread alert count
- `POST /api/attendance/bulk` - Record attendance
- `GET /api/analytics/summary` - Dashboard data

## Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ HttpOnly cookies for refresh tokens
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ Security headers (Helmet.js)
- ✅ Encrypted API key storage

See [SECURITY_SUMMARY.md](./SECURITY_SUMMARY.md) for detailed security information.

## Testing

```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend linting
cd ..
npm run lint
```

Current test coverage: ~90% (backend)

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with hot reload
```

### Frontend Development
```bash
npm run dev  # Starts on port 8080
```

### Database Management
```bash
cd backend
npx prisma studio  # Visual database browser
npx prisma migrate dev  # Create new migration
npx prisma generate  # Regenerate Prisma client
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/studentsathi"
JWT_SECRET=your-secret-key-32-chars
ENCRYPTION_KEY=your-encryption-key-32-chars
FRONTEND_URL=http://localhost:8080
SMTP_HOST=smtp.gmail.com  # Optional
SMTP_USER=your-email@gmail.com  # Optional
SMTP_PASS=your-app-password  # Optional
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

### Phase 1 (Completed)
- [x] Authentication system
- [x] Student CRUD
- [x] Alert management
- [x] Attendance tracking
- [x] Performance/grades
- [x] Analytics dashboard
- [x] LMS integrations (stub)
- [x] Webhook system (stub)

### Phase 2 (In Progress)
- [ ] Complete UI integration for all features
- [ ] Comprehensive test coverage (>90%)
- [ ] E2E tests with Cypress
- [ ] Real LMS integrations
- [ ] Actual webhook delivery system

### Phase 3 (Planned)
- [ ] Advanced analytics and ML predictions
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Bulk import/export
- [ ] Reporting system

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/Agent05-code/StudentSathi/issues)
- **Security**: Report via GitHub Security Advisories

## Acknowledgments

Built with modern technologies and best practices:
- React + TypeScript
- Express + Prisma
- shadcn/ui components
- TailwindCSS styling

---

**Project Status**: Production-ready backend, functional frontend with core features implemented.

**Version**: 1.0.0
