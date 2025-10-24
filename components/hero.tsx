"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number }>>([])

  useEffect(() => {
    const hearts = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10, // Keep hearts within 10-90% to prevent overflow
    }))
    setFloatingHearts(hearts)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-32 w-full max-w-full"
      style={{ maxWidth: '100vw' }}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-peach/10 via-lavender/5 to-transparent pointer-events-none" />

      {/* Floating hearts animation */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-peach/30 text-4xl animate-float pointer-events-none"
          style={{
            left: `${heart.left}%`,
            top: `${20 + heart.id * 15}%`,
            animation: `float ${4 + heart.id}s ease-in-out infinite`,
          }}
          aria-hidden="true"
        >
          ♥
        </div>
      ))}

      <div className="w-full max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          {/* Text Content */}
          <div className="space-y-6 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight break-words">
              <span className="text-pretty">Level up your motherhood journey.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              Track. Learn. Connect. Grow — one baby step at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full">
              <Link href="/skill-tree" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-peach to-lavender text-white rounded-full font-semibold hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach text-sm sm:text-base min-h-12">
                  Start Leveling Up
                </button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-mint text-mint rounded-full font-semibold hover:bg-mint/5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint text-sm sm:text-base min-h-12">
                  Join the Community
                </button>
              </Link>
            </div>
          </div>

          {/* Illustration Area */}
          <div className="relative h-80 sm:h-96 md:h-full min-h-80 w-full max-w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-mint/20 via-lavender/20 to-peach/20 rounded-2xl sm:rounded-3xl" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center w-full">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4" aria-label="Mom and baby emoji">
                  👩‍🍼
                </div>
                <div className="text-3xl sm:text-4xl animate-bounce" aria-label="Baby emoji">
                  👶
                </div>
                <div className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-slate-600">
                  <div className="w-24 sm:w-32 h-2 bg-lavender/30 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-r from-peach to-lavender w-3/4 animate-pulse" />
                  </div>
                  <p className="mt-2">Level 5 - XP: 340/500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}
