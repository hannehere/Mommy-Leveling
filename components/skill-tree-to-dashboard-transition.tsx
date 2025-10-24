"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { easeInOutCubic } from "@/lib/easing"

interface TransitionProps {
  isActive: boolean
  onComplete: () => void
}

export default function SkillTreeToDashboardTransition({ isActive, onComplete }: TransitionProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let animationFrameId: number
    let startTime: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const duration = 1800 // 1.8 seconds

      if (elapsed < duration) {
        const t = elapsed / duration
        const eased = easeInOutCubic(t)
        setProgress(eased)
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setProgress(1)
        // Navigate to dashboard after transition
        setTimeout(() => {
          router.push("/dashboard")
          onComplete()
        }, 200)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isActive, router, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Background gradient transition */}
      <div
        className="absolute inset-0 transition-all duration-1800"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 214, 201, ${1 - progress * 0.5}),
            rgba(200, 242, 212, ${progress * 0.5}),
            rgba(255, 249, 246, ${progress})
          )`,
        }}
      />

      {/* Sparkle trail */}
      {Array.from({ length: 8 }).map((_, i) => {
        const delay = (i / 8) * 0.3
        const currentProgress = Math.max(0, progress - delay)
        const trailProgress = currentProgress / (1 - delay)

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `calc(50% + ${Math.sin(trailProgress * Math.PI * 2) * 50}px)`,
              top: `calc(50% - ${trailProgress * 300}px)`,
              opacity: Math.sin(trailProgress * Math.PI) * 0.6,
            }}
          >
            <span className="text-2xl animate-pulse">✨</span>
          </div>
        )
      })}

      {/* Affirming message */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: Math.max(0, 1 - Math.abs(progress - 0.5) * 2) }}
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mẹ vừa unlock hành trình đầu tiên</p>
          <p className="text-lg text-gray-600 dark:text-gray-300">Đây là cây kỹ năng của mẹ</p>
        </div>
      </div>

      {/* Floating leaves */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`leaf-${i}`}
          className="absolute animate-leaf-drift"
          style={{
            left: `${20 + i * 15}%`,
            top: "-20px",
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <span className="text-3xl">🍃</span>
        </div>
      ))}
    </div>
  )
}
