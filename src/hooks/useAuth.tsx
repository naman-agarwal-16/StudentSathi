import React, { useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext, useAuth, User } from './auth-context';

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

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      setUser(response.user);
      toast.success('Logged in successfully');
      navigate('/');
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
  }) => {
    const response = await api.register(data);
    setUser(response.user);
    navigate('/dashboard');
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear user state even if API call fails
      setUser(null);
      navigate('/login');
    }
  };

  const refetchUser = async () => {
    await fetchUser();
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
