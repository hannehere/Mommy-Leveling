"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface MissionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  skill: {
    id: string
    name: string
    icon: string
    description: string
    reward: {
      xp: number
      points: string
    }
    duration: string
    affirmation: string
  }
}

export default function MissionModal({ isOpen, onClose, onComplete, skill }: MissionModalProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  if (!isOpen) return null

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      onComplete()
      setIsCompleting(false)
    }, 1500)
  }

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
          {/* Illustration */}
          <div className="mb-6 flex justify-center">
            <div className="text-6xl animate-bounce">{skill.icon}</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{skill.name}</h2>

          {/* Affirmation */}
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4 font-medium">{skill.affirmation}</p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">{skill.description}</p>

          {/* Duration */}
          <div className="bg-peach/20 dark:bg-rose-900/20 rounded-xl p-3 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Thời gian đề xuất: <span className="font-semibold">{skill.duration}</span>
            </p>
          </div>

          {/* Reward */}
          <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-gradient-to-r from-peach/10 to-lavender/10 dark:from-rose-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">XP</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">+{skill.reward.xp}</p>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Phần thưởng</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{skill.reward.points}</p>
            </div>
          </div>

          {/* Complete button */}
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="w-full py-4 px-6 bg-gradient-to-r from-peach to-lavender text-gray-800 font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed min-h-12"
          >
            {isCompleting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Đang hoàn thành...
              </span>
            ) : (
              "Hoàn thành nhiệm vụ 🌸"
            )}
          </button>

          {/* Skip option */}
          <button
            onClick={onClose}
            className="w-full mt-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  )
}
