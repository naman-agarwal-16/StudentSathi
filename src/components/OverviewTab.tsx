import { useMemo } from 'react';
import { SpaceCard as Card, SpaceCardContent as CardContent, SpaceCardHeader as CardHeader, SpaceCardTitle as CardTitle } from '@/components/ui/space-card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';
import { mockClassMetrics, mockStudents, mockAlerts } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BackendDashboard } from '@/components/BackendDashboard';

export const OverviewTab = () => {
  const metrics = mockClassMetrics;
  
  // Memoize recent alerts to avoid recalculating
  const recentAlerts = useMemo(() => mockAlerts.slice(0, 3), []);
  
  const weeklyData = useMemo(() => [
    { week: 'Week 1', engagement: 78, attendance: 85 },
    { week: 'Week 2', engagement: 76, attendance: 82 },
    { week: 'Week 3', engagement: 73, attendance: 84 },
    { week: 'Week 4', engagement: 74, attendance: 84 },
  ], []);

  // Memoize at-risk students to avoid filtering on every render
  const atRiskStudents = useMemo(() => 
    mockStudents
      .filter(student => student.status === 'low' || student.engagementScore < 70)
      .slice(0, 4),
    []
  );

  const getEngagementStatus = useMemo(() => (score: number) => {
    if (score >= 80) return { color: 'bg-engagement-high', label: 'High', variant: 'default' as const };
    if (score >= 60) return { color: 'bg-engagement-medium', label: 'Medium', variant: 'secondary' as const };
    return { color: 'bg-engagement-low', label: 'Low', variant: 'destructive' as const };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Class Overview</h1>
        <p className="text-muted-foreground">Monitor your students' engagement and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeStudents} active today
            </p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageEngagement}%</div>
            <Progress value={metrics.averageEngagement} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.attendanceRate}%</div>
            <Progress value={metrics.attendanceRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{metrics.alertsCount}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends Chart */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00BFA5" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#004D40" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.7}/>
                    <stop offset="100%" stopColor="#0f766e" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 191, 165, 0.1)" />
                <XAxis dataKey="week" stroke="#5eead4" />
                <YAxis stroke="#5eead4" />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(0, 77, 64, 0.9)',
                    border: '1px solid #00BFA5',
                    borderRadius: '8px',
                    backdropFilter: 'blur(12px)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stackId="1" 
                  stroke="#00BFA5" 
                  fill="url(#engagementGradient)" 
                  name="Engagement %"
                />
                <Area 
                  type="monotone" 
                  dataKey="attendance" 
                  stackId="2" 
                  stroke="#14b8a6" 
                  fill="url(#attendanceGradient)" 
                  name="Attendance %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* At-Risk Students */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Students Needing Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atRiskStudents.map((student) => {
                  const status = getEngagementStatus(student.engagementScore);
                  return (
                    <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{student.avatar}</div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Last active: 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={status.variant} className="mb-1">
                          {student.engagementScore}%
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {status.label} engagement
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Recent Alerts */}
      <Card className="transition-smooth hover:shadow-lg">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <AlertTriangle className={`w-4 h-4 mt-1 ${
                  alert.severity === 'high' ? 'text-destructive' : 
                  alert.severity === 'medium' ? 'text-warning' : 'text-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{alert.studentName}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backend Integration Status */}
      <BackendDashboard />
    </div>
  );
};