import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Database } from 'lucide-react';

export const AlertsTab = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-[#0EA5E9]" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-[#0F172A] to-[#0EA5E9] bg-clip-text text-transparent">
            No Alerts Available
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-600">
            Alerts will appear here when students need attention based on engagement, attendance, or performance.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Database className="w-4 h-4" />
            <span>Connect your LMS to enable automated student alerts</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
