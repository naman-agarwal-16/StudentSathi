'use client'

import { GraduationCap } from 'lucide-react'

interface DashboardNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">StudentSathi</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Educator Dashboard
          </div>
        </div>
      </div>
    </nav>
  )
}
