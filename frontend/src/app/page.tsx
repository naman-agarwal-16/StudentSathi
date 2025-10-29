'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { DashboardLayout } from '@/components/DashboardLayout'

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (!showDashboard) {
    return <HeroSection onGetStarted={() => setShowDashboard(true)} />
  }

  return <DashboardLayout />
}
