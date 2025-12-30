import { Bell, Home, Users, BarChart3, Settings, AlertTriangle, LogOut, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardNav = ({ activeTab, onTabChange }: DashboardNavProps) => {
  const { user, logout } = useAuth();

  // Fetch unread alert count with 30 second refetch interval
  const { data: alertData } = useQuery({
    queryKey: ['unreadAlerts'],
    queryFn: () => api.getUnreadAlertCount(),
    refetchInterval: 30000, // 30 seconds
  });

  const unreadAlerts = alertData?.count || 0;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: unreadAlerts },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-[#94A3B8] dark:border-slate-800 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
                StudentSathi
              </h1>
              <p className="text-xs text-muted-foreground">Educator Dashboard</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={`relative transition-all ${
                    isActive 
                      ? 'bg-[#0EA5E9] hover:bg-[#0284c7] text-white shadow-lg shadow-[#0EA5E9]/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-[#F8FAFC] dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-2 px-1.5 py-0.5 text-xs min-w-[20px] h-5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative" 
              onClick={() => onTabChange('alerts')}
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.role || 'Teacher'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center text-sm font-semibold shadow-lg">
                {user ? getInitials(user.name) : 'U'}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="text-muted-foreground hover:text-red-600"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};