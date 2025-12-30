import { SpaceCard as Card, SpaceCardContent as CardContent, SpaceCardHeader as CardHeader, SpaceCardTitle as CardTitle } from '@/components/ui/space-card';
import { BarChart3, Database } from 'lucide-react';
import { BackendDashboard } from '@/components/BackendDashboard';

export const OverviewTab = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
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
