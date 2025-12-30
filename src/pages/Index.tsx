import { useState, useCallback } from 'react';
import { DashboardNav } from '@/components/DashboardNav';
import { OverviewTab } from '@/components/OverviewTab';
import { StudentsTab } from '@/components/StudentsTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { AlertsTab } from '@/components/AlertsTab';
import { SettingsTab } from '@/components/SettingsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Memoize callbacks to prevent unnecessary re-renders
  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'students':
        return <StudentsTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'alerts':
        return <AlertsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="transition-all duration-300">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Index;
