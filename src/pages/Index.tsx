import { useState, useCallback, memo } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { DashboardNav } from '@/components/DashboardNav';
import { OverviewTab } from '@/components/OverviewTab';
import { StudentsTab } from '@/components/StudentsTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { AlertsTab } from '@/components/AlertsTab';
import { SettingsTab } from '@/components/SettingsTab';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Memoize callbacks to prevent unnecessary re-renders
  const handleGetStarted = useCallback(() => setShowDashboard(true), []);
  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  if (!showDashboard) {
    return <HeroSection onGetStarted={handleGetStarted} />;
  }

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
    <div className="min-h-screen bg-background">
      <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="transition-smooth">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Index;
