"use client"

import type React from "react"

import { useState } from "react"
import { Bold as Bottle, Moon, Apple, Smile } from "lucide-react"

type TabType = "growth" | "sleep" | "nutrition" | "milestones"

interface TabConfig {
  id: TabType
  label: string
  icon: React.ReactNode
  color: string
}

export default function BabyHealthTracker() {
  const [activeTab, setActiveTab] = useState<TabType>("growth")

  const tabs: TabConfig[] = [
    { id: "growth", label: "Growth", icon: <Smile className="w-4 h-4" />, color: "from-baby-blue to-mint" },
    { id: "sleep", label: "Sleep", icon: <Moon className="w-4 h-4" />, color: "from-lavender to-baby-blue" },
    { id: "nutrition", label: "Nutrition", icon: <Bottle className="w-4 h-4" />, color: "from-peach to-lavender" },
    { id: "milestones", label: "Milestones", icon: <Apple className="w-4 h-4" />, color: "from-mint to-peach" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "growth":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-baby-blue/10 rounded-lg p-4 border border-baby-blue/20">
                <p className="text-xs text-gray-600 font-medium mb-1">Weight</p>
                <p className="text-2xl font-bold text-gray-800">7.2 kg</p>
                <p className="text-xs text-green-600 font-medium mt-1">+0.3 kg this month</p>
              </div>
              <div className="bg-mint/10 rounded-lg p-4 border border-mint/20">
                <p className="text-xs text-gray-600 font-medium mb-1">Height</p>
                <p className="text-2xl font-bold text-gray-800">68 cm</p>
                <p className="text-xs text-green-600 font-medium mt-1">+2 cm this month</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-baby-blue/5 to-mint/5 rounded-lg p-4 border border-baby-blue/20">
              <p className="text-sm font-semibold text-gray-800 mb-3">Growth Chart</p>
              <svg viewBox="0 0 300 100" className="w-full h-24">
                <polyline
                  points="10,80 50,70 90,60 130,50 170,40 210,35 250,30 290,25"
                  fill="none"
                  stroke="#C8F2D4"
                  strokeWidth="2"
                />
                <polyline
                  points="10,85 50,75 90,65 130,55 170,45 210,40 250,35 290,30"
                  fill="none"
                  stroke="#BCE5FF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>
        )
      case "sleep":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-lavender/10 rounded-lg p-4 border border-lavender/20">
                <p className="text-xs text-gray-600 font-medium mb-1">Last Night</p>
                <p className="text-2xl font-bold text-gray-800">8.5h</p>
                <p className="text-xs text-green-600 font-medium mt-1">Good sleep</p>
              </div>
              <div className="bg-baby-blue/10 rounded-lg p-4 border border-baby-blue/20">
                <p className="text-xs text-gray-600 font-medium mb-1">This Week Avg</p>
                <p className="text-2xl font-bold text-gray-800">8.2h</p>
                <p className="text-xs text-blue-600 font-medium mt-1">On track</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-lavender/5 to-baby-blue/5 rounded-lg p-4 border border-lavender/20">
              <p className="text-sm font-semibold text-gray-800 mb-3">Sleep Pattern (This Week)</p>
              <div className="flex items-end gap-2 h-16">
                {[7.5, 8.2, 8.5, 7.8, 8.1, 8.4, 8.2].map((hours, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-lavender to-baby-blue rounded-t"
                      style={{ height: `${(hours / 9) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "nutrition":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-peach/10 rounded-lg p-4 border border-peach/20">
                <p className="text-xs text-gray-600 font-medium mb-1">Today's Feedings</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
                <p className="text-xs text-green-600 font-medium mt-1">On schedule</p>
              </div>
              <div className="bg-lavender/10 rounded-lg p-4 border border-lavender/20">
                <p className="text-xs text-gray-600 font-medium mb-1">Last Feeding</p>
                <p className="text-2xl font-bold text-gray-800">2h ago</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Next: 2h</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-peach/5 to-lavender/5 rounded-lg p-4 border border-peach/20">
              <p className="text-sm font-semibold text-gray-800 mb-3">Daily Feeding Log</p>
              <div className="space-y-2">
                {["6:30 AM", "9:15 AM", "12:45 PM", "3:20 PM", "6:00 PM"].map((time, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-white rounded border border-peach/10"
                  >
                    <span className="text-sm text-gray-700">{time}</span>
                    <span className="text-xs font-semibold text-peach">Bottle</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "milestones":
        return (
          <div className="space-y-3">
            {[
              { milestone: "First Smile", date: "2 months", completed: true },
              { milestone: "Rolled Over", date: "4 months", completed: true },
              { milestone: "First Laugh", date: "3 months", completed: true },
              { milestone: "Sitting Up", date: "6 months", completed: false },
              { milestone: "First Tooth", date: "6-8 months", completed: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-mint/10 rounded-lg border border-mint/20">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed ? "bg-mint" : "bg-gray-200"}`}
                >
                  {item.completed && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.completed ? "text-gray-800" : "text-gray-600"}`}>
                    {item.milestone}
                  </p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Baby Health & Development</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-48">{renderContent()}</div>
    </div>
  )
}
