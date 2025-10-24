"use client"

const BABY_AGES = [
  { id: 1, label: "Newborn (0-3 months)", value: "newborn", icon: "👶" },
  { id: 2, label: "Infant (3-6 months)", value: "infant", icon: "🍼" },
  { id: 3, label: "Baby (6-12 months)", value: "baby", icon: "🧸" },
  { id: 4, label: "Toddler (1-2 years)", value: "toddler", icon: "🌼" },
  { id: 5, label: "Preschooler (2-4 years)", value: "preschooler", icon: "🎨" },
  { id: 6, label: "School Age (4+ years)", value: "school-age", icon: "📚" },
]

interface BabyInfoStepProps {
  babyName: string
  setBabyName: (name: string) => void
  selectedBabyAge: string | null
  setSelectedBabyAge: (age: string) => void
}

export default function BabyInfoStep({
  babyName,
  setBabyName,
  selectedBabyAge,
  setSelectedBabyAge,
}: BabyInfoStepProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-foreground mb-2">Bé của mẹ đang ở giai đoạn nào rồi?</h2>
      <p className="text-muted-foreground mb-8">Để Mommy Leveling chọn nhiệm vụ phù hợp cho mẹ và bé.</p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-3">Tên bé</label>
        <input
          type="text"
          placeholder="Nhập tên bé..."
          value={babyName}
          onChange={(e) => setBabyName(e.target.value)}
          className="w-full px-4 py-4 rounded-xl border-2 border-border focus:border-baby-blue focus:outline-none text-base bg-background text-foreground placeholder:text-muted-foreground"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Tuổi của bé</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BABY_AGES.map((age) => (
            <button
              key={age.id}
              onClick={() => setSelectedBabyAge(age.value)}
              className={`p-4 rounded-xl text-left transition-all duration-300 border-2 flex items-center gap-3 min-h-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-baby-blue ${
                selectedBabyAge === age.value
                  ? "border-baby-blue bg-baby-blue/10 scale-102 shadow-md"
                  : "border-border hover:border-baby-blue/50"
              }`}
              aria-pressed={selectedBabyAge === age.value}
            >
              <span className="text-2xl">{age.icon}</span>
              <span className="font-medium text-foreground">{age.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
