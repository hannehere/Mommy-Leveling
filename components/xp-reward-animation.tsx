"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface XPRewardAnimationProps {
  xp: number
  affirmation: string
  onComplete: () => void
}

export default function XPRewardAnimation({ xp, affirmation, onComplete }: XPRewardAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Generate confetti particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.cos((i / 12) * Math.PI * 2) * 100,
      y: Math.sin((i / 12) * Math.PI * 2) * 100,
    }))
    setParticles(newParticles)

    // Auto-complete after animation
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      {/* XP Badge */}
      <div className="relative">
        <div className="animate-xp-badge-fly">
          <div className="bg-gradient-to-br from-peach to-lavender rounded-full px-6 py-4 shadow-xl border-4 border-white flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-gray-800 text-xl">+{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-particle-expand"
          style={
            {
              left: "50%",
              top: "50%",
              "--tx": `${particle.x}px`,
              "--ty": `${particle.y}px`,
            } as React.CSSProperties
          }
        >
          <div className="text-2xl">{["💕", "🌸", "✨", "🌿", "💖"][particle.id % 5]}</div>
        </div>
      ))}

      {/* Affirmation text */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 animate-slide-up-fade">
        <p className="text-center text-lg font-semibold text-gray-800 dark:text-white bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-lg">
          {affirmation}
        </p>
      </div>
    </div>
  )
}
