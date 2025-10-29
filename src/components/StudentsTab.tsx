import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { mockStudents, formatRelativeTime } from '@/data/mockData';

export const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Memoize filtered students to avoid recalculating on every render
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Memoize selected student data to avoid recalculating
  const selectedStudentData = useMemo(() => 
    selectedStudent ? mockStudents.find(s => s.id === selectedStudent) : null,
    [selectedStudent]
  );

  // Memoize callbacks
  const getEngagementBadge = useCallback((score: number, status: string) => {
    const variants = {
      high: 'default' as const,
      medium: 'secondary' as const, 
      low: 'destructive' as const
    };
    return variants[status as keyof typeof variants] || 'secondary';
  }, []);

  const getTrendIcon = useCallback((weeklyData: Array<{ week: string; score: number }>) => {
    if (weeklyData.length < 2) return <Minus className="w-3 h-3" />;
    const latest = weeklyData[weeklyData.length - 1].score;
    const previous = weeklyData[weeklyData.length - 2].score;
    
    if (latest > previous) return <TrendingUp className="w-3 h-3 text-engagement-high" />;
    if (latest < previous) return <TrendingDown className="w-3 h-3 text-engagement-low" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">Monitor individual student engagement and performance</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="high">High Engagement</SelectItem>
            <SelectItem value="medium">Medium Engagement</SelectItem>
            <SelectItem value="low">Low Engagement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Class Roster ({filteredStudents.length} students)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-lg border transition-smooth cursor-pointer hover:bg-accent/50 ${
                      selectedStudent === student.id ? 'bg-accent border-primary' : 'border-border'
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{student.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Last active: {formatRelativeTime(student.lastActive)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getEngagementBadge(student.engagementScore, student.status)}>
                            {student.engagementScore}%
                          </Badge>
                          {getTrendIcon(student.weeklyEngagement)}
                        </div>
                        
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Attendance: {student.attendanceRate}%</div>
                          <div>Assignments: {student.assignmentCompletion}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Detail Panel */}
        <div className="lg:col-span-1">
          {selectedStudentData ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{selectedStudentData.avatar}</span>
                  {selectedStudentData.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Engagement Score */}
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    selectedStudentData.status === 'high' ? 'text-engagement-high' :
                    selectedStudentData.status === 'medium' ? 'text-engagement-medium' :
                    'text-engagement-low'
                  }`}>
                    {selectedStudentData.engagementScore}%
                  </div>
                  <Badge variant={getEngagementBadge(selectedStudentData.engagementScore, selectedStudentData.status)}>
                    {selectedStudentData.status.toUpperCase()} ENGAGEMENT
                  </Badge>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{selectedStudentData.attendanceRate}%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{selectedStudentData.assignmentCompletion}%</div>
                    <div className="text-xs text-muted-foreground">Assignments</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{selectedStudentData.averageGrade}%</div>
                    <div className="text-xs text-muted-foreground">Avg Grade</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{selectedStudentData.subjects.length}</div>
                    <div className="text-xs text-muted-foreground">Subjects</div>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-semibold mb-3">Subject Performance</h4>
                  <div className="space-y-2">
                    {selectedStudentData.subjects.map((subject, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/20 rounded">
                        <span className="text-sm">{subject.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">{subject.grade}%</div>
                          <div className="text-xs text-muted-foreground">{subject.engagement}% eng.</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-semibold mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {selectedStudentData.recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="text-sm p-2 bg-muted/20 rounded">
                        <div className="font-medium">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatRelativeTime(activity.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-6">
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-muted-foreground">
                  <div className="w-12 h-12 mx-auto mb-4 opacity-50 flex items-center justify-center bg-muted rounded-lg">
                    👥
                  </div>
                  <p>Select a student to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};