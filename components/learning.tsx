"use client"

import { BookOpen, Gamepad2, Heart } from "lucide-react"

const resources = [
  {
    icon: Gamepad2,
    title: "Mini games for baby development",
    description: "Interactive games that support your baby's growth",
  },
  {
    icon: BookOpen,
    title: "Daily tips before & after birth",
    description: "Expert advice tailored to your pregnancy stage",
  },
  {
    icon: Heart,
    title: "Emotional care for moms",
    description: "Mental health resources and wellness tips",
  },
]

export default function Learning() {
  return (
    <section id="learn" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            <span className="text-pretty">Grow together with your baby</span>
          </h2>
          <p className="text-lg text-slate-600">Learning resources designed for every mom</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint to-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{resource.title}</h3>
                <p className="text-slate-600 mb-6">{resource.description}</p>
                <button className="text-mint font-semibold hover:text-mint/80 transition">Learn more →</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
