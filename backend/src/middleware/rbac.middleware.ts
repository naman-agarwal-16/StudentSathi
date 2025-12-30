import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware.js';

export enum Permission {
  VIEW_STUDENTS = 'VIEW_STUDENTS',
  MANAGE_STUDENTS = 'MANAGE_STUDENTS',
  DELETE_STUDENTS = 'DELETE_STUDENTS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  VIEW_ALL_ANALYTICS = 'VIEW_ALL_ANALYTICS',
  EXPORT_REPORTS = 'EXPORT_REPORTS',
  VIEW_ALERTS = 'VIEW_ALERTS',
  MANAGE_ALERTS = 'MANAGE_ALERTS',
  VIEW_ATTENDANCE = 'VIEW_ATTENDANCE',
  MANAGE_ATTENDANCE = 'MANAGE_ATTENDANCE',
  VIEW_PERFORMANCE = 'VIEW_PERFORMANCE',
  MANAGE_PERFORMANCE = 'MANAGE_PERFORMANCE',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  MANAGE_INTEGRATIONS = 'MANAGE_INTEGRATIONS',
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_OWN_DATA = 'VIEW_OWN_DATA',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ASSISTANT = 'ASSISTANT',
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
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
    Permission.VIEW_OWN_DATA,
  ],
  [UserRole.ASSISTANT]: [
    Permission.VIEW_STUDENTS,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_ALERTS,
    Permission.VIEW_ATTENDANCE,
    Permission.VIEW_PERFORMANCE,
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.includes(permission) || false;
}

export function requireRole(roles: UserRole | UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as UserRole;
    
    if (!userRole) {
      res.status(401).json({ error: 'Unauthorized', message: 'No role found' });
      return;
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You do not have permission to access this resource' 
      });
      return;
    }

    next();
  };
}

export function requirePermission(permission: Permission | Permission[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as UserRole;
    
    if (!userRole) {
      res.status(401).json({ error: 'Unauthorized', message: 'No role found' });
      return;
    }

    const requiredPermissions = Array.isArray(permission) ? permission : [permission];
    const hasRequiredPermission = requiredPermissions.some(perm => 
      hasPermission(userRole, perm)
    );

    if (!hasRequiredPermission) {
      res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You do not have the required permissions' 
      });
      return;
    }

    next();
  };
}
