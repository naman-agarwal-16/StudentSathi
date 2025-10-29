'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GraduationCap, BarChart, Bell, Users } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            StudentSathi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            AI-Powered Student Engagement & Performance Analytics Platform
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform student outcomes with real-time analytics, early intervention alerts, 
            and data-driven insights for educators.
          </p>
          <Button 
            size="lg" 
            className="mt-6 text-lg px-8 py-6"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-center">
              <BarChart className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Analytics</h3>
            <p className="text-muted-foreground">
              Track engagement, attendance, and performance metrics in real-time
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-center">
              <Bell className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Smart Alerts</h3>
            <p className="text-muted-foreground">
              Get early warnings for at-risk students with AI-powered insights
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Student Management</h3>
            <p className="text-muted-foreground">
              Comprehensive student profiles with detailed analytics and history
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
