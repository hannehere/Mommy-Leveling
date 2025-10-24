"use client"

import { useState } from "react"
import { Trophy, Share2 } from "lucide-react"

interface Badge {
  id: number
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

export default function AchievementsBadges() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 1,
      name: "Sleep Hero",
      description: "Complete 10 nights of 8+ hours sleep",
      icon: "😴",
      unlocked: true,
      unlockedDate: "Oct 15",
    },
    {
      id: 2,
      name: "Feeding Queen",
      description: "Complete 50 feeding sessions",
      icon: "👑",
      unlocked: true,
      unlockedDate: "Oct 10",
    },
    {
      id: 3,
      name: "Calm Heart",
      description: "Maintain mood score of 8+ for 7 days",
      icon: "💚",
      unlocked: true,
      unlockedDate: "Oct 8",
    },
    {
      id: 4,
      name: "Hydration Master",
      description: "Drink 2L of water for 14 consecutive days",
      icon: "💧",
      unlocked: false,
      progress: 8,
      maxProgress: 14,
    },
    {
      id: 5,
      name: "Milestone Maker",
      description: "Track 5 baby milestones",
      icon: "🎯",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: 6,
      name: "Community Star",
      description: "Share 10 moments with the community",
      icon: "⭐",
      unlocked: false,
      progress: 2,
      maxProgress: 10,
    },
  ])

  const [newBadgeAnimation, setNewBadgeAnimation] = useState<number | null>(null)

  const handleShareBadge = (badgeId: number) => {
    setNewBadgeAnimation(badgeId)
    setTimeout(() => setNewBadgeAnimation(null), 600)
  }

  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
        </div>
        <span className="text-sm font-semibold text-peach bg-peach/10 px-3 py-1 rounded-full">
          {unlockedCount}/{badges.length}
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group cursor-pointer transition-all ${
              newBadgeAnimation === badge.id ? "animate-bounce" : ""
            }`}
          >
            {/* Badge Card */}
            <div
              className={`rounded-lg p-3 text-center transition-all ${
                badge.unlocked
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 hover:shadow-lg"
                  : "bg-gray-100 border border-gray-200 opacity-60"
              }`}
            >
              {/* Icon */}
              <div className="text-3xl mb-2">{badge.icon}</div>

              {/* Name */}
              <p className="text-xs font-bold text-gray-800 line-clamp-2">{badge.name}</p>

              {/* Progress or Date */}
              {badge.unlocked ? (
                <p className="text-xs text-gray-500 mt-1">{badge.unlockedDate}</p>
              ) : (
                <div className="mt-2">
                  <div className="w-full bg-gray-300 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-peach to-lavender transition-all"
                      style={{ width: `${(badge.progress! / badge.maxProgress!) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {badge.progress}/{badge.maxProgress}
                  </p>
                </div>
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                {badge.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>

            {/* Share Button (Unlocked Only) */}
            {badge.unlocked && (
              <button
                onClick={() => handleShareBadge(badge.id)}
                className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-6 h-6 bg-peach rounded-full shadow-lg hover:bg-lavender transition-colors"
              >
                <Share2 className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-gradient-to-r from-peach/10 to-lavender/10 rounded-lg border border-peach/20">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-peach">You're amazing!</span> Unlock 1 more badge to reach the next milestone.
        </p>
      </div>
    </div>
  )
}
