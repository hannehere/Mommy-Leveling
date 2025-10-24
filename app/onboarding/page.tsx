"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import WelcomeStep from "@/components/onboarding/welcome-step"
import AvatarStep from "@/components/onboarding/avatar-step"
import BabyInfoStep from "@/components/onboarding/baby-info-step"
import GoalsStep from "@/components/onboarding/goals-step"
import CelebrationStep from "@/components/onboarding/celebration-step"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [selectedBabyAge, setSelectedBabyAge] = useState<string | null>(null)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [babyName, setBabyName] = useState("")
  const [momName, setMomName] = useState("")

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      localStorage.setItem(
        "onboarding",
        JSON.stringify({
          avatar: selectedAvatar,
          babyAge: selectedBabyAge,
          goals: selectedGoals,
          babyName,
          momName,
          completedAt: new Date().toISOString(),
        }),
      )
      router.push("/skill-tree")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return true // Welcome step is always valid
      case 2:
        return momName.trim() !== ""
      case 3:
        return selectedAvatar !== null
      case 4:
        return selectedBabyAge !== null && babyName.trim() !== ""
      case 5:
        return selectedGoals.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-peach to-lavender flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-8">
          <div className="flex gap-2 justify-center mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-gradient-to-r from-peach to-lavender w-8" : "bg-border w-2"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">Bước {step} / 5</p>
        </div>

        <div className="transition-all duration-300">
          {step === 1 && <WelcomeStep />}
          {step === 2 && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-foreground mb-2">Mẹ tên gì?</h2>
              <p className="text-muted-foreground mb-8">
                Chúng tôi muốn biết tên của mẹ để cá nhân hóa hành trình của mẹ. 💕
              </p>
              <input
                type="text"
                placeholder="Nhập tên của mẹ..."
                value={momName}
                onChange={(e) => setMomName(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 border-border focus:border-peach focus:outline-none text-base bg-background text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <p className="text-sm text-muted-foreground mt-6">✨ +10 XP cho việc tham gia!</p>
            </div>
          )}
          {step === 3 && <AvatarStep selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} />}
          {step === 4 && (
            <BabyInfoStep
              babyName={babyName}
              setBabyName={setBabyName}
              selectedBabyAge={selectedBabyAge}
              setSelectedBabyAge={setSelectedBabyAge}
            />
          )}
          {step === 5 && <GoalsStep selectedGoals={selectedGoals} onToggleGoal={handleGoalToggle} />}
          {step === 6 && <CelebrationStep momName={momName} />}
        </div>

        <div className="flex gap-4 mt-8 justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border/50 text-foreground min-h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach"
            aria-label="Quay lại bước trước"
          >
            Quay lại 💗
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-peach to-lavender text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95 min-h-12 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach"
            aria-label={step === 5 ? "Hoàn thành onboarding" : "Tiếp tục"}
          >
            {step === 5 ? "Bắt đầu hành trình 🚀" : "Tiếp theo"}
          </button>
        </div>

        {step < 5 && (
          <div className="text-center mt-6">
            <Link
              href="/skill-tree"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach rounded px-2 py-1"
            >
              Bỏ qua bước này
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
