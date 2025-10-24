"use client"

import { Heart, Leaf, Lightbulb, Users } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Track health & nutrition",
    description: "Monitor your baby's milestones and feeding schedules",
    color: "from-peach to-orange-200",
  },
  {
    icon: Leaf,
    title: "Grow your skill tree",
    description: "Unlock new parenting skills and achievements",
    color: "from-mint to-emerald-200",
  },
  {
    icon: Lightbulb,
    title: "Get daily mom-tips",
    description: "Personalized advice for every stage of motherhood",
    color: "from-lavender to-purple-200",
  },
  {
    icon: Users,
    title: "Connect with other moms",
    description: "Build your support network and share experiences",
    color: "from-blue-200 to-cyan-200",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 w-full max-w-full overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 px-4">
            <span className="text-pretty">Everything you need to thrive</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 px-4">Designed for every mom, at every stage</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 hover:border-peach/50 hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-full"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
