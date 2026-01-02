import { SpaceCard as Card, SpaceCardContent as CardContent, SpaceCardHeader as CardHeader, SpaceCardTitle as CardTitle } from '@/components/ui/space-card';
import { BarChart3, Database } from 'lucide-react';
import { BackendDashboard } from '@/components/BackendDashboard';
import { useAuth } from '@/hooks/useAuth';

export const OverviewTab = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#F8FAFC] border-t-[#0EA5E9] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user?.name || 'Educator'}! 👋
        </h1>
        <p className="text-slate-200">
          {user?.role === 'ADMIN' ? 'Manage your entire institution from here' : 'Here\'s your class overview'}
        </p>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-[#0EA5E9]" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
              No Analytics Data Available
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600">
              Connect your LMS or add students to start viewing class metrics and analytics.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Database className="w-4 h-4" />
              <span>Set up data integration in Settings to enable dashboard</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BackendDashboard />
    </div>
  );
};
