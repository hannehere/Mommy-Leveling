"use client"

const MOTHERHOOD_GOALS = [
  { id: 1, label: "Chăm sóc sức khỏe của con", value: "health", icon: "❤️" },
  { id: 2, label: "Kết nối cảm xúc với bé", value: "bond", icon: "💕" },
  { id: 3, label: "Chăm sóc bản thân nhiều hơn", value: "wellbeing", icon: "🌸" },
  { id: 4, label: "Tìm động lực và niềm vui mỗi ngày", value: "joy", icon: "✨" },
]

interface GoalsStepProps {
  selectedGoals: string[]
  onToggleGoal: (goal: string) => void
}

export default function GoalsStep({ selectedGoals, onToggleGoal }: GoalsStepProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-foreground mb-2">Mẹ muốn tập trung vào điều gì nhất lúc này?</h2>
      <p className="text-muted-foreground mb-8">Chọn một hoặc nhiều mục tiêu để bắt đầu hành trình của mẹ.</p>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {MOTHERHOOD_GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onToggleGoal(goal.value)}
            className={`p-5 rounded-xl text-left transition-all duration-300 border-2 flex items-center gap-4 min-h-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint ${
              selectedGoals.includes(goal.value)
                ? "border-mint bg-mint/10 scale-102 shadow-md"
                : "border-border hover:border-mint/50"
            }`}
            aria-pressed={selectedGoals.includes(goal.value)}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selectedGoals.includes(goal.value) ? "border-mint bg-mint" : "border-border"
              }`}
            >
              {selectedGoals.includes(goal.value) && <span className="text-white text-sm font-bold">✓</span>}
            </div>
            <span className="text-lg">{goal.icon}</span>
            <span className="font-medium text-foreground flex-1">{goal.label}</span>
            {selectedGoals.includes(goal.value) && <span className="text-xl animate-pulse">💕</span>}
          </button>
        ))}
      </div>

      {selectedGoals.length > 0 && (
        <div className="bg-lavender/10 dark:bg-purple-900/20 rounded-2xl p-4 border-2 border-lavender/30">
          <p className="text-sm font-medium text-foreground mb-2">Mục tiêu của mẹ:</p>
          <div className="flex flex-wrap gap-2">
            {selectedGoals.map((goal) => {
              const goalObj = MOTHERHOOD_GOALS.find((g) => g.value === goal)
              return (
                <span key={goal} className="px-3 py-1 rounded-full bg-lavender/30 text-foreground text-sm font-medium">
                  {goalObj?.icon} {goalObj?.label}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
