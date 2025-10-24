"use client"

import { Heart } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    quote: "This app made me feel less alone during those tough first months.",
    avatar: "👩‍🦰",
  },
  {
    name: "Jessica L.",
    quote: "Gamifying motherhood actually helped me stay motivated and positive!",
    avatar: "👩‍🦱",
  },
  {
    name: "Maria G.",
    quote: "The community support is incredible. I found my mom tribe here.",
    avatar: "👩",
  },
]

export default function Community() {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 via-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            <span className="text-pretty">You're never alone, mama 💕</span>
          </h2>
          <p className="text-lg text-slate-600">Join thousands of mothers on their leveling journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-2xl border border-rose-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-peach text-peach" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
