"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function OnboardingPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("onboarding")
    if (!hasOnboarded) {
      setShowPrompt(true)
    }
  }, [])

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-peach">
        <h3 className="font-bold text-foreground mb-2 text-base">Chào mừng mẹ đến Mommy Leveling</h3>
        <p className="text-base text-muted-foreground mb-4">
          Hãy hoàn thành bước onboarding để bắt đầu hành trình level up của mẹ.
        </p>
        <div className="flex gap-2">
          <Link
            href="/onboarding"
            className="flex-1 px-4 py-3 rounded-lg bg-peach text-foreground font-medium text-center hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach min-h-12 flex items-center justify-center"
          >
            Bắt đầu
          </Link>
          <button
            onClick={() => setShowPrompt(false)}
            className="px-4 py-3 rounded-lg border-2 border-border text-foreground font-medium hover:bg-border/50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border min-h-12"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
