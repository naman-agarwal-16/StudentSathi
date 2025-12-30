# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Monorepo structure with separate frontend and backend directories
- Supabase integration support
- Comprehensive RBAC system with 3 roles (ADMIN, TEACHER, STUDENT)
- 16 granular permissions for fine-grained access control
- Student-specific dashboard
- Role-based route protection
- LMS integration readiness (Google Classroom, Canvas, Moodle, Microsoft Teams)
- Professional UI design system with Royal Navy, Luminous Teal color palette
- GitHub Actions CI/CD pipeline
- MIT License
- Contributing guidelines
- Code of Conduct

### Changed
- Restructured project for separate frontend/backend deployment
- Updated authentication flow with role-based navigation
- Migrated to monorepo architecture
- Updated GitHub username from Agent05-code to naman-agarwal-16

### Removed
- Mock data files (mockData.ts, seed.ts)
- Redundant documentation files
- Sample/test data from all components

## [0.1.0] - 2025-12-31

### Added
- Initial release
- JWT-based authentication with refresh tokens
- Student management CRUD operations
- Alert system with real-time notifications
- Attendance tracking
- Performance and grades management
- Analytics dashboard
- PostgreSQL database with Prisma ORM
- React 18 + TypeScript frontend
- Express + Node.js backend
- shadcn/ui component library
- Role-based access control foundation

### Security
- HttpOnly cookie implementation
- Password hashing with bcrypt
- JWT token validation
- Rate limiting
- CORS protection
- SQL injection prevention via Prisma

---

## Version Guidelines

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

## Categories

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Vulnerability fixes
