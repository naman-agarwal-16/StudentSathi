/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext, useAuth, User } from './auth-context';
import { UserRole, Permission, hasPermission as checkPermission } from '@/types/roles';

export { useAuth };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = React.useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      const response = await api.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('accessToken');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string, role?: UserRole) => {
    try {
      const response = await api.login(email, password);
      setUser(response.user);
      toast.success('Logged in successfully');
      
      // Role-based navigation
      if (response.user.role === UserRole.STUDENT) {
        navigate('/student/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      toast.error(errorMessage || 'Login failed');
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }) => {
    const response = await api.register(data);
    setUser(response.user);
    
    // Role-based navigation
    if (response.user.role === UserRole.STUDENT) {
      navigate('/student/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear state even if API call fails
      setUser(null);
      navigate('/login');
    }
  };

  const hasPermissionCheck = (permission: Permission): boolean => {
    if (!user) return false;
    return checkPermission(user.role, permission);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const refetchUser = async () => {
    await fetchUser();
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasPermission: hasPermissionCheck,
    hasRole,
    login,
    register,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
