import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, CheckCircle, X, Filter, Bell } from 'lucide-react';
import { mockAlerts, formatRelativeTime } from '@/data/mockData';

export const AlertsTab = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Memoize filtered alerts to avoid recalculating on every render
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesType = filterType === 'all' || alert.type === filterType;
      const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
      return matchesType && matchesSeverity;
    });
  }, [alerts, filterType, filterSeverity]);

  // Memoize unread count to avoid recalculating
  const unreadCount = useMemo(() => 
    alerts.filter(alert => !alert.isRead).length,
    [alerts]
  );

  // Memoize severity counts
  const severityCounts = useMemo(() => ({
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
  }), [alerts]);

  // Memoize callbacks
  const markAsRead = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  }, []);

  const markAllAsRead = useCallback(() => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  const getAlertIcon = useCallback((type: string) => {
    switch (type) {
      case 'engagement_drop': return '📉';
      case 'attendance_low': return '🕒';
      case 'grade_drop': return '📊';
      case 'missed_assignment': return '📝';
      default: return '⚠️';
    }
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  }, []);

  const getAlertTypeLabel = useCallback((type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bell className="w-8 h-8" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay informed about student engagement issues and take timely action
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{severityCounts.high}</div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{severityCounts.medium}</div>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{severityCounts.low}</div>
              <p className="text-sm text-muted-foreground">Low Priority</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{unreadCount}</div>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-60">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="engagement_drop">Engagement Drop</SelectItem>
            <SelectItem value="attendance_low">Low Attendance</SelectItem>
            <SelectItem value="grade_drop">Grade Drop</SelectItem>
            <SelectItem value="missed_assignment">Missed Assignment</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="w-full sm:w-48">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto text-engagement-high mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Alerts Found</h3>
              <p className="text-muted-foreground">
                {alerts.length === 0 
                  ? "Great! No alerts to show. Your students are doing well." 
                  : "No alerts match your current filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-smooth ${
                    alert.isRead 
                      ? 'bg-muted/20 border-border' 
                      : 'bg-card border-primary/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{alert.studentName}</h3>
                          <Badge variant={getSeverityColor(alert.severity) as any}>
                            {alert.severity} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getAlertTypeLabel(alert.type)}
                          </Badge>
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(alert.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!alert.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(alert.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dismissAlert(alert.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {alert.severity === 'high' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          Contact Student
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule Meeting
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-light rounded-lg">
              <h4 className="font-semibold text-primary mb-2">📧 Send Notifications</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Send email reminders to students with low engagement
              </p>
              <Button variant="outline" size="sm">
                Send Reminders
              </Button>
            </div>
            
            <div className="p-4 bg-secondary-light rounded-lg">
              <h4 className="font-semibold text-secondary mb-2">📅 Schedule Check-ins</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Book 1-on-1 meetings with at-risk students
              </p>
              <Button variant="outline" size="sm">
                Schedule Meetings
              </Button>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg">
              <h4 className="font-semibold text-warning mb-2">📊 Generate Reports</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Create detailed reports for administration
              </p>
              <Button variant="outline" size="sm">
                Create Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};