import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import { mockStudents, mockClassMetrics } from '@/data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';

export const AnalyticsTab = () => {
  // Generate analytics data
  const engagementDistribution = [
    { range: '90-100%', count: mockStudents.filter(s => s.engagementScore >= 90).length, color: 'hsl(var(--engagement-high))' },
    { range: '80-89%', count: mockStudents.filter(s => s.engagementScore >= 80 && s.engagementScore < 90).length, color: 'hsl(var(--engagement-high))' },
    { range: '70-79%', count: mockStudents.filter(s => s.engagementScore >= 70 && s.engagementScore < 80).length, color: 'hsl(var(--engagement-medium))' },
    { range: '60-69%', count: mockStudents.filter(s => s.engagementScore >= 60 && s.engagementScore < 70).length, color: 'hsl(var(--engagement-medium))' },
    { range: '0-59%', count: mockStudents.filter(s => s.engagementScore < 60).length, color: 'hsl(var(--engagement-low))' },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', avgGrade: 79.4, avgEngagement: 77.2 },
    { subject: 'Science', avgGrade: 78.6, avgEngagement: 76.4 },
    { subject: 'English', avgGrade: 78.8, avgEngagement: 74.8 }
  ];

  const weeklyTrends = [
    { week: 'Week 1', engagement: 78.2, attendance: 85.2, assignments: 82.4 },
    { week: 'Week 2', engagement: 76.8, attendance: 82.6, assignments: 79.8 },
    { week: 'Week 3', engagement: 73.4, attendance: 84.2, assignments: 78.2 },
    { week: 'Week 4', engagement: 74.2, attendance: 83.6, assignments: 80.4 },
  ];

  const engagementVsPerformance = mockStudents.map(student => ({
    name: student.name,
    engagement: student.engagementScore,
    performance: student.averageGrade,
    attendance: student.attendanceRate
  }));

  const statusDistribution = [
    { name: 'High Engagement', value: mockStudents.filter(s => s.status === 'high').length, color: 'hsl(var(--engagement-high))' },
    { name: 'Medium Engagement', value: mockStudents.filter(s => s.status === 'medium').length, color: 'hsl(var(--engagement-medium))' },
    { name: 'Low Engagement', value: mockStudents.filter(s => s.status === 'low').length, color: 'hsl(var(--engagement-low))' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Deep insights into class performance and engagement patterns</p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClassMetrics.averageEngagement}%</div>
            <p className="text-xs text-engagement-high">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockStudents.filter(s => s.engagementScore < 60).length}
            </div>
            <p className="text-xs text-muted-foreground">Need immediate attention</p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-engagement-high">
              {mockStudents.filter(s => s.engagementScore >= 85).length}
            </div>
            <p className="text-xs text-muted-foreground">High engagement students</p>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">Per week per student</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[60, 90]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Engagement %"
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Attendance %"
                />
                <Line 
                  type="monotone" 
                  dataKey="assignments" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Assignment Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Distribution */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Subject Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgGrade" fill="hsl(var(--primary))" name="Average Grade %" />
                <Bar dataKey="avgEngagement" fill="hsl(var(--secondary))" name="Average Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Pie Chart */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle>Student Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Engagement vs Performance Scatter */}
      <Card className="transition-smooth hover:shadow-lg">
        <CardHeader>
          <CardTitle>Engagement vs Performance Correlation</CardTitle>
          <p className="text-sm text-muted-foreground">
            Scatter plot showing the relationship between student engagement and academic performance
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={engagementVsPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="engagement" name="Engagement Score %" />
              <YAxis dataKey="performance" name="Academic Performance %" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [`${value}%`, name === 'performance' ? 'Academic Performance' : 'Engagement Score']}
                labelFormatter={(label) => `Student: ${label}`}
              />
              <Scatter 
                dataKey="performance" 
                fill="hsl(var(--primary))"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights Summary */}
      <Card className="transition-smooth hover:shadow-lg">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-light rounded-lg">
              <h4 className="font-semibold text-primary mb-2">📈 Positive Trends</h4>
              <ul className="text-sm space-y-1">
                <li>• 3 students improved engagement by 10%+</li>
                <li>• Mathematics showing strong performance</li>
                <li>• Overall attendance trend is stable</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg">
              <h4 className="font-semibold text-warning mb-2">⚠️ Areas of Concern</h4>
              <ul className="text-sm space-y-1">
                <li>• 2 students with declining engagement</li>
                <li>• Assignment completion below target</li>
                <li>• Weekend login rates are low</li>
              </ul>
            </div>
            
            <div className="p-4 bg-secondary-light rounded-lg">
              <h4 className="font-semibold text-secondary mb-2">💡 Recommendations</h4>
              <ul className="text-sm space-y-1">
                <li>• Schedule 1-on-1s with at-risk students</li>
                <li>• Consider peer tutoring programs</li>
                <li>• Implement weekend study sessions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};