import { Bell, Home, Users, BarChart3, Settings, AlertTriangle, LogOut } from 'lucide-react';
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
    <nav className="flex items-center gap-2 p-4 bg-card border-b border-border">
      <div className="flex items-center gap-4 mr-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg text-primary">StudentSathi</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`relative transition-smooth ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
              {item.badge && item.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-2 px-1.5 py-0.5 text-xs min-w-[18px] h-5"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" className="relative" onClick={() => onTabChange('alerts')}>
          <Bell className="w-4 h-4" />
          {unreadAlerts > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
          )}
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {user ? getInitials(user.name) : 'U'}
          </div>
          <Button variant="ghost" size="sm" onClick={logout} title="Logout">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};