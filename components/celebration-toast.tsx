"use client"

import { useEffect, useState } from "react"

interface CelebrationToastProps {
  message: string
  type: "success" | "achievement" | "milestone"
  duration?: number
}

export function CelebrationToast({ message, type, duration = 3000 }: CelebrationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  const bgColor =
    type === "success"
      ? "bg-gradient-to-r from-mint to-baby-blue"
      : type === "achievement"
        ? "bg-gradient-to-r from-peach to-lavender"
        : "bg-gradient-to-r from-lavender to-mint"

  const icon = type === "success" ? "✓" : type === "achievement" ? "🏆" : "⭐"

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${bgColor} text-white px-6 py-4 rounded-full shadow-lg animate-bounce`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  )
}
