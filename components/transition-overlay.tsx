"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface TransitionOverlayProps {
  onComplete?: () => void
}

export default function TransitionOverlay({ onComplete }: TransitionOverlayProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<"xp-celebration" | "transform" | "reveal" | "complete">("xp-celebration")

  useEffect(() => {
    const timings = {
      "xp-celebration": 800,
      transform: 1200,
      reveal: 1000,
    }

    const timer = setTimeout(
      () => {
        if (phase === "xp-celebration") {
          setPhase("transform")
        } else if (phase === "transform") {
          setPhase("reveal")
        } else if (phase === "reveal") {
          setPhase("complete")
          setTimeout(() => {
            onComplete?.()
            router.push("/skill-tree")
          }, 500)
        }
      },
      timings[phase as keyof typeof timings],
    )

    return () => clearTimeout(timer)
  }, [phase, router, onComplete])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background transition */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          phase === "xp-celebration" || phase === "transform"
            ? "bg-gradient-to-b from-peach/20 to-lavender/20"
            : "bg-gradient-to-b from-cream via-white to-cream"
        }`}
      />

      {/* XP Badge celebration and float animation */}
      {(phase === "xp-celebration" || phase === "transform") && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Floating hearts and sparkles */}
          {phase === "xp-celebration" && (
            <>
              {[...Array(12)].map((_, i) => (
                <div
                  key={`heart-${i}`}
                  className="absolute animate-float-up"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 100}px`,
                    top: "50%",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {["💕", "✨", "🌸"][i % 3]}
                </div>
              ))}
            </>
          )}

          {/* XP Badge */}
          <div
            className={`relative w-40 h-40 transition-all duration-1000 ${
              phase === "transform" ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              transform: phase === "transform" ? "translate(0, -200px) scale(1.5)" : "translate(0, 0) scale(1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-peach to-lavender rounded-full blur-2xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-peach to-lavender rounded-full shadow-lg border-4 border-white">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground">+50</div>
                <div className="text-sm font-medium text-foreground">XP</div>
              </div>
            </div>
          </div>

          {/* Celebration text */}
          {phase === "xp-celebration" && (
            <div className="absolute bottom-32 text-center animate-fade-in">
              <p className="text-lg font-semibold text-foreground">Mẹ vừa unlock hành trình đầu tiên 🌸</p>
            </div>
          )}
        </div>
      )}

      {/* Skill Tree reveal with particles */}
      {(phase === "reveal" || phase === "complete") && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glowing particles expanding outward */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full animate-particle-expand"
              style={{
                left: "50%",
                top: "50%",
                animationDelay: `${i * 30}ms`,
              }}
            />
          ))}

          {/* Mom Avatar at center (where XP badge was) */}
          <div className="absolute z-10 flex flex-col items-center animate-avatar-appear">
            <div className="relative w-24 h-24 mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-peach to-lavender rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-peach to-lavender rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-4xl">👩‍👧</span>
              </div>
            </div>

            {/* Affirming message */}
            <div className="text-center animate-fade-in">
              <p className="text-lg font-semibold text-foreground mb-2">Đây là cây kỹ năng của mẹ 🌿</p>
              <p className="text-sm text-foreground/70">Mỗi nhiệm vụ nhỏ là một bước lớn trên hành trình yêu thương.</p>
            </div>
          </div>

          {/* Glowing leaves drifting down */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`leaf-${i}`}
              className="absolute animate-leaf-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                animationDelay: `${i * 150}ms`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
