"use client"

import { useEffect, useState } from "react"

interface MicroFeedbackProps {
  show: boolean
  text: string
  position?: "top" | "center" | "bottom"
}

export function MicroFeedback({ show, text, position = "center" }: MicroFeedbackProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!isVisible) return null

  const positionClass = position === "top" ? "top-1/4" : position === "bottom" ? "bottom-1/4" : "top-1/2"

  return (
    <div className={`fixed left-1/2 ${positionClass} transform -translate-x-1/2 -translate-y-1/2 z-50 animate-pulse`}>
      <div className="bg-white dark:bg-slate-800 rounded-full px-6 py-3 shadow-lg border-2 border-peach">
        <p className="text-sm font-semibold text-foreground text-center">{text}</p>
      </div>
    </div>
  )
}
