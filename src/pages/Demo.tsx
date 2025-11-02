import { SpaceLayout } from '@/components/SpaceLayout';
import { SpaceCard as Card, SpaceCardContent as CardContent, SpaceCardHeader as CardHeader, SpaceCardTitle as CardTitle } from '@/components/ui/space-card';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DemoPage = () => {
  const weeklyData = [
    { week: 'Week 1', engagement: 78, attendance: 85 },
    { week: 'Week 2', engagement: 76, attendance: 82 },
    { week: 'Week 3', engagement: 73, attendance: 84 },
    { week: 'Week 4', engagement: 74, attendance: 84 },
  ];

  return (
    <SpaceLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#5eead4' }}>Dashboard Overview</h1>
          <p className="text-muted-foreground">Space-themed student engagement analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#5eead4' }}>156</div>
              <p className="text-xs text-muted-foreground">
                142 active today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#5eead4' }}>75%</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#5eead4' }}>84%</div>
              <Progress value={84} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#ff6b6b' }}>8</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
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
      </div>
    </SpaceLayout>
  );
};

export default DemoPage;
