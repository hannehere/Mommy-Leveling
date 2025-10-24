"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Zap } from "lucide-react"
import { CelebrationToast } from "../celebration-toast"
import { ConfettiBurst } from "../confetti-burst"

interface Mission {
  id: number
  title: string
  xp: number
  completed: boolean
  progress?: number
  maxProgress?: number
}

export default function DailyMissions() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, title: "Cho bé ăn 3 lần", xp: 10, completed: false, progress: 2, maxProgress: 3 },
    { id: 2, title: "Uống 2L nước", xp: 5, completed: false, progress: 1, maxProgress: 2 },
    { id: 3, title: "Vận động 10 phút", xp: 5, completed: false, progress: 0, maxProgress: 1 },
    { id: 4, title: "Tập tummy time cho bé", xp: 8, completed: true },
  ])

  const [xpGain, setXpGain] = useState<{ id: number; show: boolean } | null>(null)
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const toggleMission = (id: number) => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id === id) {
          const newCompleted = !mission.completed
          if (newCompleted) {
            setXpGain({ id, show: true })
            setCelebrationMessage(`+${mission.xp} XP - Mẹ giỏi lắm!`)
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 1500)
            setTimeout(() => setXpGain(null), 1000)
          }
          return { ...mission, completed: newCompleted }
        }
        return mission
      }),
    )
  }

  const completedCount = missions.filter((m) => m.completed).length
  const totalXP = missions.reduce((sum, m) => (m.completed ? sum + m.xp : sum), 0)

  const celebrationMessages = [
    "Tuyệt vời! Mẹ đang tiến bộ.",
    "Mẹ làm tốt lắm!",
    "Thêm một bước yêu thương nữa.",
    "Bé sẽ tự hào về mẹ.",
  ]

  const randomCelebration = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-peach/20">
      <ConfettiBurst trigger={showConfetti} />
      {celebrationMessage && <CelebrationToast message={celebrationMessage} type="success" />}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Nhiệm Vụ Hôm Nay</h2>
        <span className="text-sm font-semibold text-peach bg-peach/10 dark:bg-peach/20 px-3 py-1 rounded-full">
          {completedCount}/{missions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-mint to-baby-blue transition-all duration-500"
            style={{ width: `${(completedCount / missions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-3">
        {missions.map((mission) => (
          <div key={mission.id} className="relative">
            {/* XP Gain Animation */}
            {xpGain?.id === mission.id && xpGain.show && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg font-bold text-green-500 animate-bounce">
                +{mission.xp} XP
              </div>
            )}

            <button
              onClick={() => toggleMission(mission.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-cream dark:hover:bg-slate-700 transition-colors text-left group"
            >
              {/* Checkbox */}
              <div className="flex-shrink-0">
                {mission.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-mint" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 group-hover:text-peach transition-colors" />
                )}
              </div>

              {/* Mission Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium ${mission.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-white"}`}
                >
                  {mission.title}
                </p>
                {mission.progress !== undefined && mission.maxProgress !== undefined && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-peach to-lavender transition-all"
                        style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {mission.progress}/{mission.maxProgress}
                    </span>
                  </div>
                )}
              </div>

              {/* XP Badge */}
              <div className="flex-shrink-0 flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">+{mission.xp}</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-peach/10 to-lavender/10 dark:from-peach/20 dark:to-lavender/20 rounded-lg border border-peach/20">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-bold text-peach">XP Hôm Nay: </span>
          <span className="font-bold text-gray-800 dark:text-white">{totalXP} XP</span>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium italic">{randomCelebration}</p>
      </div>
    </div>
  )
}
