import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Calendar, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';

export const StudentDashboard = () => {
  const { user, isLoading } = useAuth();

  // Show loading state while user data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F8FAFC] via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#F8FAFC] border-t-[#0EA5E9] mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // This will be replaced with real API data
  const studentData = {
    engagementScore: 0,
    attendanceRate: 0,
    averageGrade: 0,
    upcomingAssignments: 0,
    recentGrades: [],
    attendanceRecords: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-slate-50 to-slate-100">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-200">Here's your academic overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-[#0EA5E9]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#0EA5E9]" />
            </CardHeader>
            <CardContent>
              {studentData.engagementScore > 0 ? (
                <>
                  <div className="text-2xl font-bold text-[#0F172A]">{studentData.engagementScore}%</div>
                  <Progress value={studentData.engagementScore} className="mt-2" />
                </>
              ) : (
                <div className="text-sm text-slate-500">No data available</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {studentData.attendanceRate > 0 ? (
                <>
                  <div className="text-2xl font-bold text-[#0F172A]">{studentData.attendanceRate}%</div>
                  <Progress value={studentData.attendanceRate} className="mt-2" />
                </>
              ) : (
                <div className="text-sm text-slate-500">No data available</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              {studentData.averageGrade > 0 ? (
                <>
                  <div className="text-2xl font-bold text-[#0F172A]">{studentData.averageGrade}%</div>
                  <Badge variant="secondary" className="mt-2">A Grade</Badge>
                </>
              ) : (
                <div className="text-sm text-slate-500">No data available</div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              {studentData.upcomingAssignments > 0 ? (
                <>
                  <div className="text-2xl font-bold text-[#0F172A]">{studentData.upcomingAssignments}</div>
                  <p className="text-xs text-slate-500 mt-2">assignments due soon</p>
                </>
              ) : (
                <div className="text-sm text-slate-500">No pending tasks</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0EA5E9]" />
                Recent Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No grades available yet</p>
                <p className="text-sm text-slate-400 mt-2">
                  Your grades will appear here once your teacher adds them
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0EA5E9]" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No assignments due</p>
                <p className="text-sm text-slate-400 mt-2">
                  You're all caught up! Check back later for new assignments
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connect LMS Notice */}
        <Card className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0F172A]/10 border-[#0EA5E9]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#0EA5E9] rounded-full p-3">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A] mb-2">Connect Your LMS</h3>
                <p className="text-slate-600 text-sm">
                  Your school administrator needs to connect your Learning Management System (LMS) 
                  to view your grades, attendance, and assignments here. Contact your teacher or 
                  school admin for more information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
