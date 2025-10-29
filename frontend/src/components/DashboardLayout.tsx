'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardNav } from './DashboardNav'

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Placeholder tab components
function OverviewTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Students</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Avg Engagement</h3>
          <p className="text-2xl font-bold mt-2">82%</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Active Alerts</h3>
          <p className="text-2xl font-bold mt-2">15</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Attendance Rate</h3>
          <p className="text-2xl font-bold mt-2">94%</p>
        </div>
      </div>
    </div>
  )
}

function StudentsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Student Management</h2>
      <p className="text-muted-foreground">Manage and monitor student profiles and performance.</p>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
      <p className="text-muted-foreground">View detailed analytics and insights.</p>
    </div>
  )
}

function AlertsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Alerts & Notifications</h2>
      <p className="text-muted-foreground">Monitor and manage student alerts.</p>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      <p className="text-muted-foreground">Configure system settings and integrations.</p>
    </div>
  )
}
