# Role-Based Access Control (RBAC) Implementation

## Overview
StudentSathi now features a comprehensive Role-Based Access Control system supporting three user roles with granular permissions.

## User Roles

### 1. **Administrator (ADMIN)**
Full system access with all permissions.

**Permissions:**
- Manage all students (view, add, edit, delete)
- Access all analytics and reports
- Export comprehensive reports
- Manage all alerts
- Control attendance and performance records
- Configure system settings
- Manage LMS integrations
- Manage user accounts

**Default Route:** `/dashboard`

### 2. **Teacher/Faculty (TEACHER)**
Manage their assigned students with teaching-focused features.

**Permissions:**
- View and manage students
- Access analytics for their classes
- View and manage alerts
- Record and manage attendance
- Record and manage performance/grades
- Export reports for their classes

**Default Route:** `/dashboard`

### 3. **Student (STUDENT)**
View-only access to their own academic data.

**Permissions:**
- View own dashboard
- View own grades and performance
- View own attendance records
- View assignments and due dates

**Default Route:** `/student/dashboard`

## Implementation Details

### Frontend

#### 1. Role Types (`src/types/roles.ts`)
```typescript
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export enum Permission {
  VIEW_STUDENTS,
  MANAGE_STUDENTS,
  VIEW_OWN_DATA,
  // ... more permissions
}
```

#### 2. Protected Routes
```typescript
<ProtectedRoute 
  allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}
  requiredPermissions={[Permission.VIEW_STUDENTS]}
>
  <Dashboard />
</ProtectedRoute>
```

#### 3. Permission Hooks
```typescript
const { hasPermission, hasRole } = useAuth();

if (hasPermission(Permission.MANAGE_STUDENTS)) {
  // Show edit button
}

if (hasRole([UserRole.ADMIN, UserRole.TEACHER])) {
  // Show admin panel
}
```

### Backend

#### 1. Database Schema
```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  name         String
  role         UserRole @default(TEACHER)
  studentId    String?  // For student users
  // ... other fields
}

enum UserRole {
  ADMIN
  TEACHER
  STUDENT
  ASSISTANT
}
```

#### 2. RBAC Middleware (`backend/src/middleware/rbac.middleware.ts`)
```typescript
// Protect routes by role
router.get('/students', 
  authenticate, 
  requireRole([UserRole.ADMIN, UserRole.TEACHER]),
  studentController.getAll
);

// Protect routes by permission
router.delete('/students/:id',
  authenticate,
  requirePermission(Permission.DELETE_STUDENTS),
  studentController.delete
);
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register with role selection
- `POST /api/auth/login` - Login (role-based redirect)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user with role

### Admin Only
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/settings` - System settings
- `PUT /api/admin/integrations` - LMS integrations

### Admin & Teacher
- `GET /api/students` - List students
- `POST /api/students` - Add student
- `PUT /api/students/:id` - Update student
- `GET /api/analytics` - View analytics
- `GET /api/alerts` - View alerts
- `POST /api/attendance` - Record attendance
- `POST /api/performance` - Record grades

### Student Only
- `GET /api/student/dashboard` - Own dashboard
- `GET /api/student/grades` - Own grades
- `GET /api/student/attendance` - Own attendance
- `GET /api/student/assignments` - Own assignments

## LMS Integration Preparation

### Supported LMS Platforms
- Google Classroom
- Canvas
- Moodle
- Microsoft Teams

### Integration Setup (Admin Only)

1. **Navigate to Settings** → **Integrations**
2. **Select LMS Platform**
3. **Configure API Credentials**
   - API Key/Token
   - Base URL
   - Organization ID (if required)
4. **Test Connection**
5. **Enable Sync**

### Data Sync Features
- **Student Roster** - Auto-import students
- **Grades** - Sync performance records
- **Attendance** - Import attendance data
- **Assignments** - Sync upcoming assignments
- **Real-time Webhooks** - Live updates

## Security Features

### Authentication
- JWT-based authentication
- Refresh token rotation
- Secure HTTP-only cookies
- Token expiration handling

### Authorization
- Role-based route protection
- Permission-level access control
- API endpoint security
- CSRF protection

### Data Protection
- Student data isolation
- Role-based data filtering
- Encrypted sensitive fields
- Audit logging (coming soon)

## Usage Examples

### Register as Teacher
```typescript
await register({
  email: 'teacher@school.edu',
  password: 'securepass',
  name: 'John Doe',
  role: UserRole.TEACHER
});
// Redirects to /dashboard
```

### Register as Student
```typescript
await register({
  email: 'student@school.edu',
  password: 'securepass',
  name: 'Jane Smith',
  role: UserRole.STUDENT,
  studentId: 'STU123456'
});
// Redirects to /student/dashboard
```

### Check Permissions in Components
```typescript
const StudentList = () => {
  const { hasPermission } = useAuth();
  
  return (
    <div>
      <StudentTable />
      {hasPermission(Permission.MANAGE_STUDENTS) && (
        <AddStudentButton />
      )}
      {hasPermission(Permission.DELETE_STUDENTS) && (
        <DeleteButton />
      )}
    </div>
  );
};
```

## Migration Guide

### Database Migration
```bash
cd backend
npx prisma migrate dev --name add_student_role
npx prisma generate
```

### Update Existing Users
```sql
-- Set role for existing users
UPDATE users SET role = 'TEACHER' WHERE email LIKE '%@school.edu';
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@school.edu';
```

## Testing RBAC

### Test Accounts
```
Admin:
- Email: admin@studentsathi.com
- Password: admin123
- Access: Full system

Teacher:
- Email: teacher@school.edu
- Password: teacher123
- Access: Student management, analytics

Student:
- Email: student@school.edu
- Password: student123
- Access: Own data only
```

### Test Scenarios
1. **Role-based Navigation**
   - Admin/Teacher logs in → `/dashboard`
   - Student logs in → `/student/dashboard`

2. **Permission Checks**
   - Student tries to access `/dashboard` → Redirected
   - Teacher tries to access `/admin/users` → 403 Forbidden

3. **Data Isolation**
   - Student can only see own grades
   - Teacher sees only assigned students
   - Admin sees all data

## Next Steps

### Phase 1: Core RBAC ✅
- [x] Role definitions
- [x] Permission system
- [x] Protected routes
- [x] User authentication with roles

### Phase 2: LMS Integration (Ready)
- [ ] Google Classroom API
- [ ] Canvas API
- [ ] Moodle integration
- [ ] Microsoft Teams sync

### Phase 3: Advanced Features
- [ ] Class/Section assignments
- [ ] Teacher-Student relationships
- [ ] Parent role (coming soon)
- [ ] Audit logs
- [ ] Role delegation

## Configuration

### Environment Variables
```env
# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Default Admin
DEFAULT_ADMIN_EMAIL=admin@studentsathi.com
DEFAULT_ADMIN_PASSWORD=changeme

# LMS Integration
GOOGLE_CLASSROOM_CLIENT_ID=
GOOGLE_CLASSROOM_CLIENT_SECRET=
CANVAS_API_KEY=
MOODLE_BASE_URL=
```

## Support

For issues or questions:
- Create an issue on GitHub
- Check documentation at `/docs`
- Contact: support@studentsathi.com

---

**Last Updated:** December 31, 2025
**Version:** 2.0.0
**Status:** Production Ready ✅
