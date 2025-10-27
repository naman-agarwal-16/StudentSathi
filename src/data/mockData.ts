// Mock data for StudentSathi demo
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  engagementScore: number;
  status: 'high' | 'medium' | 'low';
  lastActive: string;
  attendanceRate: number;
  assignmentCompletion: number;
  averageGrade: number;
  weeklyEngagement: Array<{ week: string; score: number }>;
  subjects: Array<{
    name: string;
    grade: number;
    engagement: number;
  }>;
  recentActivity: Array<{
    type: 'login' | 'assignment' | 'quiz' | 'discussion';
    description: string;
    timestamp: string;
  }>;
}

export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'engagement_drop' | 'attendance_low' | 'grade_drop' | 'missed_assignment';
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface ClassMetrics {
  totalStudents: number;
  averageEngagement: number;
  activeStudents: number;
  alertsCount: number;
  attendanceRate: number;
  assignmentCompletion: number;
}

// Generate mock students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@school.edu',
    avatar: '👩‍🎓',
    engagementScore: 92,
    status: 'high',
    lastActive: '2024-01-15T10:30:00Z',
    attendanceRate: 95,
    assignmentCompletion: 98,
    averageGrade: 91,
    weeklyEngagement: [
      { week: 'Week 1', score: 85 },
      { week: 'Week 2', score: 88 },
      { week: 'Week 3', score: 90 },
      { week: 'Week 4', score: 92 }
    ],
    subjects: [
      { name: 'Mathematics', grade: 94, engagement: 95 },
      { name: 'Science', grade: 89, engagement: 90 },
      { name: 'English', grade: 90, engagement: 91 }
    ],
    recentActivity: [
      { type: 'quiz', description: 'Completed Math Quiz #4', timestamp: '2024-01-15T09:15:00Z' },
      { type: 'discussion', description: 'Posted in Science Discussion', timestamp: '2024-01-15T08:30:00Z' },
      { type: 'assignment', description: 'Submitted English Essay', timestamp: '2024-01-14T16:45:00Z' }
    ]
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex.chen@school.edu',
    avatar: '👨‍🎓',
    engagementScore: 78,
    status: 'medium',
    lastActive: '2024-01-14T14:20:00Z',
    attendanceRate: 88,
    assignmentCompletion: 82,
    averageGrade: 79,
    weeklyEngagement: [
      { week: 'Week 1', score: 82 },
      { week: 'Week 2', score: 79 },
      { week: 'Week 3', score: 75 },
      { week: 'Week 4', score: 78 }
    ],
    subjects: [
      { name: 'Mathematics', grade: 82, engagement: 80 },
      { name: 'Science', grade: 75, engagement: 76 },
      { name: 'English', grade: 80, engagement: 78 }
    ],
    recentActivity: [
      { type: 'login', description: 'Logged into platform', timestamp: '2024-01-14T14:20:00Z' },
      { type: 'assignment', description: 'Late submission: Math Homework', timestamp: '2024-01-13T18:30:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@school.edu',
    avatar: '👩‍🎓',
    engagementScore: 45,
    status: 'low',
    lastActive: '2024-01-12T11:15:00Z',
    attendanceRate: 65,
    assignmentCompletion: 55,
    averageGrade: 62,
    weeklyEngagement: [
      { week: 'Week 1', score: 72 },
      { week: 'Week 2', score: 58 },
      { week: 'Week 3', score: 48 },
      { week: 'Week 4', score: 45 }
    ],
    subjects: [
      { name: 'Mathematics', grade: 58, engagement: 42 },
      { name: 'Science', grade: 65, engagement: 48 },
      { name: 'English', grade: 63, engagement: 45 }
    ],
    recentActivity: [
      { type: 'login', description: 'Logged into platform', timestamp: '2024-01-12T11:15:00Z' },
      { type: 'assignment', description: 'Missing: Science Lab Report', timestamp: '2024-01-10T23:59:00Z' }
    ]
  },
  {
    id: '4',
    name: 'Marcus Williams',
    email: 'marcus.williams@school.edu',
    avatar: '👨‍🎓',
    engagementScore: 87,
    status: 'high',
    lastActive: '2024-01-15T11:45:00Z',
    attendanceRate: 92,
    assignmentCompletion: 94,
    averageGrade: 88,
    weeklyEngagement: [
      { week: 'Week 1', score: 84 },
      { week: 'Week 2', score: 86 },
      { week: 'Week 3', score: 85 },
      { week: 'Week 4', score: 87 }
    ],
    subjects: [
      { name: 'Mathematics', grade: 90, engagement: 89 },
      { name: 'Science', grade: 86, engagement: 85 },
      { name: 'English', grade: 88, engagement: 87 }
    ],
    recentActivity: [
      { type: 'discussion', description: 'Helped peer in Math forum', timestamp: '2024-01-15T11:30:00Z' },
      { type: 'quiz', description: 'Completed Science Quiz #3', timestamp: '2024-01-15T10:15:00Z' }
    ]
  },
  {
    id: '5',
    name: 'Lily Park',
    email: 'lily.park@school.edu',
    avatar: '👩‍🎓',
    engagementScore: 69,
    status: 'medium',
    lastActive: '2024-01-15T09:30:00Z',
    attendanceRate: 78,
    assignmentCompletion: 71,
    averageGrade: 74,
    weeklyEngagement: [
      { week: 'Week 1', score: 76 },
      { week: 'Week 2', score: 73 },
      { week: 'Week 3', score: 68 },
      { week: 'Week 4', score: 69 }
    ],
    subjects: [
      { name: 'Mathematics', grade: 71, engagement: 68 },
      { name: 'Science', grade: 78, engagement: 72 },
      { name: 'English', grade: 73, engagement: 67 }
    ],
    recentActivity: [
      { type: 'assignment', description: 'Submitted Math Assignment #3', timestamp: '2024-01-15T09:00:00Z' },
      { type: 'login', description: 'Logged into platform', timestamp: '2024-01-15T08:45:00Z' }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    studentId: '3',
    studentName: 'Sofia Rodriguez',
    type: 'engagement_drop',
    severity: 'high',
    message: 'Engagement dropped 37% over the last 3 weeks',
    timestamp: '2024-01-15T12:00:00Z',
    isRead: false
  },
  {
    id: '2',
    studentId: '5',
    studentName: 'Lily Park',
    type: 'attendance_low',
    severity: 'medium',
    message: 'Attendance rate is 78% (below class average)',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Sofia Rodriguez',
    type: 'missed_assignment',
    severity: 'high',
    message: 'Has not submitted 3 assignments this week',
    timestamp: '2024-01-14T18:00:00Z',
    isRead: true
  },
  {
    id: '4',
    studentId: '2',
    studentName: 'Alex Chen',
    type: 'grade_drop',
    severity: 'medium',
    message: 'Math grade decreased from 85 to 82 this week',
    timestamp: '2024-01-14T15:30:00Z',
    isRead: true
  }
];

export const mockClassMetrics: ClassMetrics = {
  totalStudents: 25,
  averageEngagement: 74.2,
  activeStudents: 18,
  alertsCount: 4,
  attendanceRate: 83.6,
  assignmentCompletion: 80.4
};

// Utility function to get engagement status color
export const getEngagementColor = (score: number): string => {
  if (score >= 80) return 'engagement-high';
  if (score >= 60) return 'engagement-medium';
  return 'engagement-low';
};

// Utility function to format relative time
export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
};