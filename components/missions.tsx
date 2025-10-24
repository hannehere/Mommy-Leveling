"use client"

import { Zap } from "lucide-react"

const missions = [
  { title: "Feed baby on time", xp: 10, icon: "🍼" },
  { title: "Mom rests 8 hours", xp: 5, icon: "😴" },
  { title: "Baby tummy time", xp: 8, icon: "🤸" },
  { title: "Read a parenting tip", xp: 3, icon: "📖" },
]

export default function Missions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-peach/10 via-lavender/10 to-mint/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            <span className="text-pretty">Turn daily care into daily wins!</span>
          </h2>
          <p className="text-lg text-slate-600">Complete missions and level up your motherhood</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mission.icon}</span>
                  <h3 className="font-semibold text-slate-900">{mission.title}</h3>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-peach to-lavender px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">+{mission.xp} XP</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-peach to-lavender w-2/3 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-peach to-lavender rounded-full">
            <span className="text-white font-bold text-lg">✨ Level Up! ✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
