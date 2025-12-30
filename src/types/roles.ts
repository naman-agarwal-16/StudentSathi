// Role-Based Access Control (RBAC) Types and Permissions

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export enum Permission {
  // Student Management
  VIEW_STUDENTS = 'VIEW_STUDENTS',
  MANAGE_STUDENTS = 'MANAGE_STUDENTS',
  DELETE_STUDENTS = 'DELETE_STUDENTS',
  
  // Analytics & Reports
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  VIEW_ALL_ANALYTICS = 'VIEW_ALL_ANALYTICS',
  EXPORT_REPORTS = 'EXPORT_REPORTS',
  
  // Alerts
  VIEW_ALERTS = 'VIEW_ALERTS',
  MANAGE_ALERTS = 'MANAGE_ALERTS',
  
  // Attendance
  VIEW_ATTENDANCE = 'VIEW_ATTENDANCE',
  MANAGE_ATTENDANCE = 'MANAGE_ATTENDANCE',
  
  // Performance
  VIEW_PERFORMANCE = 'VIEW_PERFORMANCE',
  MANAGE_PERFORMANCE = 'MANAGE_PERFORMANCE',
  
  // System Settings
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  MANAGE_INTEGRATIONS = 'MANAGE_INTEGRATIONS',
  MANAGE_USERS = 'MANAGE_USERS',
  
  // Own Data (for students)
  VIEW_OWN_DATA = 'VIEW_OWN_DATA',
}

// Role-Permission Mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // All permissions for admins
    Permission.VIEW_STUDENTS,
    Permission.MANAGE_STUDENTS,
    Permission.DELETE_STUDENTS,
    Permission.VIEW_ALL_ANALYTICS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_ALERTS,
    Permission.MANAGE_ALERTS,
    Permission.VIEW_ATTENDANCE,
    Permission.MANAGE_ATTENDANCE,
    Permission.VIEW_PERFORMANCE,
    Permission.MANAGE_PERFORMANCE,
    Permission.MANAGE_SETTINGS,
    Permission.MANAGE_INTEGRATIONS,
    Permission.MANAGE_USERS,
  ],
  [UserRole.TEACHER]: [
    // Teachers can manage their students
    Permission.VIEW_STUDENTS,
    Permission.MANAGE_STUDENTS,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_ALL_ANALYTICS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_ALERTS,
    Permission.MANAGE_ALERTS,
    Permission.VIEW_ATTENDANCE,
    Permission.MANAGE_ATTENDANCE,
    Permission.VIEW_PERFORMANCE,
    Permission.MANAGE_PERFORMANCE,
  ],
  [UserRole.STUDENT]: [
    // Students can only view their own data
    Permission.VIEW_OWN_DATA,
  ],
};

// Helper function to check if a role has a permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}

// Helper function to check multiple permissions
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

// Helper function to check all permissions
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

// Route access control
export interface RouteAccess {
  path: string;
  roles: UserRole[];
  permissions?: Permission[];
}

export const ROUTE_ACCESS: RouteAccess[] = [
  // Admin only routes
  {
    path: '/admin',
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_SETTINGS],
  },
  {
    path: '/admin/users',
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_USERS],
  },
  {
    path: '/admin/integrations',
    roles: [UserRole.ADMIN],
    permissions: [Permission.MANAGE_INTEGRATIONS],
  },
  
  // Teacher & Admin routes
  {
    path: '/dashboard',
    roles: [UserRole.ADMIN, UserRole.TEACHER],
  },
  {
    path: '/students',
    roles: [UserRole.ADMIN, UserRole.TEACHER],
    permissions: [Permission.VIEW_STUDENTS],
  },
  {
    path: '/analytics',
    roles: [UserRole.ADMIN, UserRole.TEACHER],
    permissions: [Permission.VIEW_ANALYTICS],
  },
  {
    path: '/alerts',
    roles: [UserRole.ADMIN, UserRole.TEACHER],
    permissions: [Permission.VIEW_ALERTS],
  },
  
  // Student routes
  {
    path: '/student/dashboard',
    roles: [UserRole.STUDENT],
    permissions: [Permission.VIEW_OWN_DATA],
  },
  {
    path: '/student/grades',
    roles: [UserRole.STUDENT],
    permissions: [Permission.VIEW_OWN_DATA],
  },
  {
    path: '/student/attendance',
    roles: [UserRole.STUDENT],
    permissions: [Permission.VIEW_OWN_DATA],
  },
];

// Get allowed routes for a role
export function getAllowedRoutes(role: UserRole): RouteAccess[] {
  return ROUTE_ACCESS.filter(route => route.roles.includes(role));
}

// Check if user can access route
export function canAccessRoute(role: UserRole, path: string): boolean {
  const route = ROUTE_ACCESS.find(r => path.startsWith(r.path));
  if (!route) return true; // Public route
  
  if (!route.roles.includes(role)) return false;
  
  if (route.permissions) {
    return hasAnyPermission(role, route.permissions);
  }
  
  return true;
}
