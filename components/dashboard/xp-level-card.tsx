"use client"

import { useState } from "react"
import { Zap, Trophy } from "lucide-react"

export default function XPLevelCard() {
  const [isLevelingUp, setIsLevelingUp] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number }>>([])

  const currentLevel = 12
  const currentXP = 2450
  const maxXP = 3000
  const xpPercentage = (currentXP / maxXP) * 100

  const handleLevelUp = () => {
    setIsLevelingUp(true)
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setConfetti(newConfetti)

    setTimeout(() => {
      setIsLevelingUp(false)
      setConfetti([])
    }, 1000)
  }

  const motivationalMessages = [
    "Mẹ giỏi lắm! Tiếp tục cố gắng nha.",
    "Mẹ đang tiến bộ từng ngày.",
    "Tình yêu của mẹ là sức mạnh lớn nhất.",
    "Mẹ xứng đáng được nghỉ ngơi.",
    "Mẹ là siêu nhân của bé.",
  ]

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

  return (
    <div className="relative">
      {/* Confetti Animation */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: "float-up 1s ease-out forwards",
          }}
        >
          <div className="text-2xl">✨</div>
        </div>
      ))}

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
          }
        }
      `}</style>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20 hover:shadow-xl transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Cấp độ Mẹ</h2>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Circle */}
              <circle cx="60" cy="60" r="55" fill="none" stroke="#f0f0f0" strokeWidth="8" />
              {/* Progress Circle */}
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 55}`}
                strokeDashoffset={`${2 * Math.PI * 55 * (1 - xpPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD6C9" />
                  <stop offset="100%" stopColor="#E7D1FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-peach to-lavender bg-clip-text text-transparent">
                {currentLevel}
              </div>
              <div className="text-xs text-gray-500 font-medium">CẤP ĐỘ</div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Kinh Nghiệm</span>
            <span className="text-sm font-bold text-gray-800">
              {currentXP.toLocaleString()} / {maxXP.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-peach to-lavender transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{Math.round(xpPercentage)}% đến cấp độ tiếp theo</div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleLevelUp}
            className="flex-1 bg-gradient-to-r from-peach to-lavender text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Xem Cây Kỹ Năng
          </button>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 p-3 bg-mint/20 rounded-lg border border-mint/40">
          <p className="text-sm text-gray-700 font-medium">{randomMessage}</p>
        </div>
      </div>
    </div>
  )
}
