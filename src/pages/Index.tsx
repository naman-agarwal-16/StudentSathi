import { useState } from 'react';
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

  if (!showDashboard) {
    return <HeroSection onGetStarted={() => setShowDashboard(true)} />;
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
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="transition-smooth">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Index;
