"use client"

import { useEffect, useState } from "react"

interface AchievementUnlockModalProps {
  show: boolean
  achievement: {
    name: string
    icon: string
    description: string
  }
}

export function AchievementUnlockModal({ show, achievement }: AchievementUnlockModalProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-sm mx-4 animate-bounce">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-spin">{achievement.icon}</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-peach to-lavender bg-clip-text text-transparent mb-2">
            Achievement Unlocked!
          </h2>
          <p className="text-xl font-semibold text-foreground mb-2">{achievement.name}</p>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>

          <div className="mt-6 flex gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-peach animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 rounded-full bg-lavender animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-mint animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
