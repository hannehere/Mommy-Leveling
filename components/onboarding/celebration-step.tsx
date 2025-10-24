"use client"

import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import TransitionOverlay from "@/components/transition-overlay"

interface CelebrationStepProps {
  momName: string
}

const confettiAnimation = css`
  @keyframes confetti {
    0% {
      transform: translateY(0) rotateZ(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotateZ(720deg);
      opacity: 0;
    }
  }

  .animate-confetti {
    animation: confetti 3s ease-in forwards;
  }
`

export default function CelebrationStep({ momName }: CelebrationStepProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  const handleStartSkillTree = () => {
    setShowTransition(true)
  }

  if (showTransition) {
    return <TransitionOverlay />
  }

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm text-center relative overflow-hidden"
      css={confettiAnimation}
    >
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {["🎉", "💕", "✨", "🌸", "🎊"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="mb-8 flex justify-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-r from-peach to-lavender rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-peach to-lavender rounded-full shadow-lg">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground">+50</div>
              <div className="text-sm font-medium text-foreground">XP</div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Chúc mừng mẹ 💕</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Mẹ vừa hoàn thành nhiệm vụ đầu tiên – bắt đầu hành trình của tình yêu và trưởng thành.
      </p>

      <div className="bg-mint/10 dark:bg-emerald-900/20 rounded-2xl p-6 mb-8 border-2 border-mint/30">
        <p className="text-base text-foreground">
          ✨ Một ngày tuyệt vời đang chờ mẹ và bé. Hãy cùng nhau khám phá những kỹ năng mới!
        </p>
      </div>

      <p className="text-muted-foreground mb-8">
        Tình yêu của mẹ là sức mạnh lớn nhất. Hãy bắt đầu hành trình level up ngay bây giờ.
      </p>

      <button
        onClick={handleStartSkillTree}
        className="inline-block px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-peach to-lavender text-foreground transition-all hover:shadow-lg active:scale-95 min-h-12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach"
      >
        Khám phá Skill Tree của mẹ 🚀
      </button>
    </div>
  )
}
