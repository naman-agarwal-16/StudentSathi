import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include access token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await axios.post(
              `${API_BASE_URL}/auth/refresh`,
              {},
              { withCredentials: true }
            );

            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear auth and redirect to login
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }) {
    const response = await this.api.post('/auth/register', data);
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    return response.data;
  }

  async logout() {
    try {
      await this.api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
    }
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(token: string, password: string) {
    const response = await this.api.post('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }

  // Student endpoints
  async getStudents(params?: {
    page?: number;
    limit?: number;
    q?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const response = await this.api.get('/students', { params });
    return response.data;
  }

  async getStudent(id: string) {
    const response = await this.api.get(`/students/${id}`);
    return response.data;
  }

  async createStudent(data: any) {
    const response = await this.api.post('/students', data);
    return response.data;
  }

  async updateStudent(id: string, data: any) {
    const response = await this.api.put(`/students/${id}`, data);
    return response.data;
  }

  async deleteStudent(id: string) {
    const response = await this.api.delete(`/students/${id}`);
    return response.data;
  }

  // Alert endpoints
  async getAlerts(params?: {
    page?: number;
    limit?: number;
    studentId?: string;
    isRead?: boolean;
  }) {
    const response = await this.api.get('/alerts', { params });
    return response.data;
  }

  async getUnreadAlertCount() {
    const response = await this.api.get('/alerts/unread');
    return response.data;
  }

  async markAlertAsRead(id: string) {
    const response = await this.api.patch(`/alerts/${id}/read`);
    return response.data;
  }

  async markAllAlertsAsRead() {
    const response = await this.api.patch('/alerts/read-all');
    return response.data;
  }

  // Attendance endpoints
  async bulkCreateAttendance(data: {
    date: string;
    records: Array<{
      studentId: string;
      status: string;
      notes?: string;
    }>;
  }) {
    const response = await this.api.post('/attendance/bulk', data);
    return response.data;
  }

  async getAttendanceByDate(date: string) {
    const response = await this.api.get('/attendance/by-date', {
      params: { date },
    });
    return response.data;
  }

  async getAttendanceByStudent(
    studentId: string,
    params?: {
      startDate?: string;
      endDate?: string;
    }
  ) {
    const response = await this.api.get(`/attendance/student/${studentId}`, {
      params,
    });
    return response.data;
  }

  async getAttendanceStats(studentId: string) {
    const response = await this.api.get(
      `/attendance/student/${studentId}/stats`
    );
    return response.data;
  }

  // Performance endpoints
  async createPerformance(data: {
    studentId: string;
    subject: string;
    score: number;
    maxScore: number;
    date: string;
    type: string;
    notes?: string;
  }) {
    const response = await this.api.post('/performance', data);
    return response.data;
  }

  async getPerformanceByStudent(
    studentId: string,
    params?: {
      subject?: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const response = await this.api.get(`/performance/student/${studentId}`, {
      params,
    });
    return response.data;
  }

  async getStudentGPA(
    studentId: string,
    params?: {
      subject?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const response = await this.api.get(`/performance/student/${studentId}/gpa`, {
      params,
    });
    return response.data;
  }

  // Analytics endpoints
  async getDashboardSummary(days?: number) {
    const response = await this.api.get('/analytics/summary', {
      params: days ? { days } : undefined,
    });
    return response.data;
  }

  // LMS Integration endpoints
  async createLMSConfig(data: {
    platform: string;
    apiKey: string;
    baseUrl: string;
    enabled?: boolean;
  }) {
    const response = await this.api.post('/integrations/lms/config', data);
    return response.data;
  }

  async getLMSConfigs(platform?: string) {
    const response = await this.api.get('/integrations/lms/config', {
      params: platform ? { platform } : undefined,
    });
    return response.data;
  }
}

export const api = new ApiService();
