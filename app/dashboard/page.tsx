"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import DashboardHeader from "@/components/dashboard/header"
import XPLevelCard from "@/components/dashboard/xp-level-card"
import DailyMissions from "@/components/dashboard/daily-missions"
import BabyHealthTracker from "@/components/dashboard/baby-health-tracker"
import MomWellbeing from "@/components/dashboard/mom-wellbeing"
import AchievementsBadges from "@/components/dashboard/achievements-badges"
import CommunityFeed from "@/components/dashboard/community-feed"
import CalendarSection from "@/components/dashboard/calendar-section"
import MotivationalFooter from "@/components/dashboard/motivational-footer"
import CelebrationModal from "@/components/dashboard/celebration-modal"
import GratitudeJournal from "@/components/dashboard/gratitude-journal"
import WellnessHealing from "@/components/dashboard/wellness-healing"

export default function Dashboard() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState({
    xpEarned: 25,
    skillName: "Bonding Moments",
    affirmation: "Mẹ và bé vừa gắn kết hơn 🌸",
  })

  useEffect(() => {
    // Check if coming from skill tree transition
    const params = new URLSearchParams(window.location.search)
    if (params.get("celebration") === "true") {
      setShowCelebration(true)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <main className="min-h-screen bg-cream dark:bg-slate-900">
      <Navigation />
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - XP & Missions */}
          <div className="lg:col-span-1 space-y-6">
            <XPLevelCard />
            <DailyMissions />
          </div>

          {/* Center Column - Baby Health & Mom Wellbeing */}
          <div className="lg:col-span-1 space-y-6">
            <BabyHealthTracker />
            <MomWellbeing />
          </div>

          {/* Right Column - Achievements & Community */}
          <div className="lg:col-span-1 space-y-6">
            <AchievementsBadges />
            <CommunityFeed />
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <GratitudeJournal />
          <WellnessHealing />
        </div>

        {/* Full Width Sections */}
        <div className="space-y-6">
          <CalendarSection />
          <MotivationalFooter />
        </div>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        xpEarned={celebrationData.xpEarned}
        skillName={celebrationData.skillName}
        affirmation={celebrationData.affirmation}
      />
    </main>
  )
}
