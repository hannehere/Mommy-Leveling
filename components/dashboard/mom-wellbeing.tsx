"use client"

import type React from "react"

import { Heart, Droplet, Smile, Calendar } from "lucide-react"

interface MetricData {
  label: string
  value: number
  max: number
  unit: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

export default function MomWellbeing() {
  const metrics: MetricData[] = [
    {
      label: "Giờ Nghỉ",
      value: 7,
      max: 8,
      unit: "h",
      icon: <Heart className="w-5 h-5" />,
      color: "text-peach",
      bgColor: "bg-peach/10",
    },
    {
      label: "Uống Nước",
      value: 1.8,
      max: 2,
      unit: "L",
      icon: <Droplet className="w-5 h-5" />,
      color: "text-baby-blue",
      bgColor: "bg-baby-blue/10",
    },
    {
      label: "Tâm Trạng",
      value: 8,
      max: 10,
      unit: "/10",
      icon: <Smile className="w-5 h-5" />,
      color: "text-mint",
      bgColor: "bg-mint/10",
    },
    {
      label: "Ngày Chu Kỳ",
      value: 14,
      max: 28,
      unit: "ngày",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-lavender",
      bgColor: "bg-lavender/10",
    },
  ]

  const encouragementMessages = [
    "Mẹ đang chăm sóc bản thân tốt lắm!",
    "Sức khỏe của mẹ rất quan trọng.",
    "Mẹ xứng đáng được yêu thương.",
    "Hãy tiếp tục chăm sóc bản thân.",
  ]

  const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sức Khỏe Của Mẹ</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {metrics.map((metric, i) => {
          const percentage = (metric.value / metric.max) * 100
          return (
            <div key={i} className={`${metric.bgColor} rounded-lg p-4 border border-gray-200`}>
              {/* Icon & Label */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`${metric.color}`}>{metric.icon}</div>
                <p className="text-xs font-medium text-gray-600">{metric.label}</p>
              </div>

              {/* Value */}
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {metric.value}
                <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
              </p>

              {/* Progress Ring */}
              <svg className="w-full h-12" viewBox="0 0 100 20">
                <rect x="0" y="8" width="100" height="4" rx="2" fill="#e5e7eb" />
                <rect
                  x="0"
                  y="8"
                  width={percentage}
                  height="4"
                  rx="2"
                  fill={
                    metric.color === "text-peach"
                      ? "#FFD6C9"
                      : metric.color === "text-baby-blue"
                        ? "#BCE5FF"
                        : metric.color === "text-mint"
                          ? "#C8F2D4"
                          : "#E7D1FF"
                  }
                />
              </svg>
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-r from-mint/20 to-baby-blue/20 rounded-lg p-4 border border-mint/40">
        <p className="text-sm font-medium text-gray-800">{randomEncouragement}</p>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 bg-peach/20 hover:bg-peach/30 text-peach font-semibold rounded-lg transition-colors text-sm">
          Ghi Giờ Nghỉ
        </button>
        <button className="px-3 py-2 bg-baby-blue/20 hover:bg-baby-blue/30 text-baby-blue font-semibold rounded-lg transition-colors text-sm">
          Ghi Tâm Trạng
        </button>
      </div>
    </div>
  )
}
