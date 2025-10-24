"use client"

import { useState } from "react"

const AVATARS = [
  { id: 1, emoji: "👩", label: "Mama Bear" },
  { id: 2, emoji: "👩‍🦰", label: "Mama with Red Hair" },
  { id: 3, emoji: "👩‍🦱", label: "Mama with Curly Hair" },
  { id: 4, emoji: "👩‍🦳", label: "Mama with Gray Hair" },
  { id: 5, emoji: "👩‍🦲", label: "Mama with Bald Head" },
  { id: 6, emoji: "🧑‍🦰", label: "Parent with Red Hair" },
]

interface AvatarStepProps {
  selectedAvatar: number | null
  onSelect: (id: number) => void
}

export default function AvatarStep({ selectedAvatar, onSelect }: AvatarStepProps) {
  const [playSound] = useState(false)

  const handleSelect = (id: number) => {
    onSelect(id)
    if (playSound) {
      // Sound effect would go here
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-foreground mb-2">Chọn hình ảnh thể hiện tinh thần của mẹ hôm nay 🌿</h2>
      <p className="text-muted-foreground mb-8">Mẹ có thể đổi avatar bất cứ lúc nào.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleSelect(avatar.id)}
            className={`p-6 rounded-2xl transition-all duration-300 border-2 min-h-32 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach ${
              selectedAvatar === avatar.id
                ? "border-peach bg-peach/10 scale-105 shadow-lg"
                : "border-border hover:border-peach/50 hover:scale-102"
            }`}
            aria-label={avatar.label}
            aria-pressed={selectedAvatar === avatar.id}
          >
            <div className="text-5xl mb-2 transition-transform duration-300 hover:scale-110">{avatar.emoji}</div>
            <p className="text-sm font-medium text-foreground text-center">{avatar.label}</p>
            {selectedAvatar === avatar.id && <div className="mt-2 text-lg">✨</div>}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center">💡 Mẹ có thể đổi avatar bất cứ lúc nào trong cài đặt.</p>
    </div>
  )
}
