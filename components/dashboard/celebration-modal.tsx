"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  xpEarned: number
  skillName: string
  affirmation: string
}

export default function CelebrationModal({ isOpen, onClose, xpEarned, skillName, affirmation }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full animate-slide-up-fade">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Celebration emoji */}
          <div className="mb-6 flex justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chúc mừng mẹ!</h2>

          {/* Skill name */}
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4 font-medium">{skillName}</p>

          {/* Affirmation */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 italic">{affirmation}</p>

          {/* XP earned */}
          <div className="bg-gradient-to-r from-peach/20 to-lavender/20 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">XP Kiếm được</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">+{xpEarned}</p>
          </div>

          {/* Progress message */}
          <div className="bg-mint/20 dark:bg-emerald-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Mẹ đang tiến bộ từng ngày. Một bước nhỏ hôm nay, một kỷ niệm lớn mai sau.
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={onClose}
            className="w-full py-4 px-6 bg-gradient-to-r from-peach to-lavender text-gray-800 font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 min-h-12"
          >
            Tiếp tục hành trình
          </button>
        </div>

        {/* Confetti particles */}
        {showConfetti &&
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-particle-expand"
              style={
                {
                  left: "50%",
                  top: "50%",
                  "--tx": `${Math.cos((i / 12) * Math.PI * 2) * 100}px`,
                  "--ty": `${Math.sin((i / 12) * Math.PI * 2) * 100}px`,
                } as React.CSSProperties
              }
            >
              <span className="text-2xl">{["💕", "🌸", "✨", "🌿", "💖"][i % 5]}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
