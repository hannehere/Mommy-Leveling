"use client"

import { useState } from "react"
import { Heart, ChevronDown, ChevronUp } from "lucide-react"

interface GratitudeEntry {
  id: string
  date: string
  gratitudes: string[]
  reflection: string
  mood: string
  heartXP: number
}

export default function GratitudeJournal() {
  const [gratitudes, setGratitudes] = useState(["", "", ""])
  const [reflection, setReflection] = useState("")
  const [mood, setMood] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [entries, setEntries] = useState<GratitudeEntry[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationXP, setCelebrationXP] = useState(0)

  const moodOptions = [
    { emoji: "🥰", label: "Grateful", vi: "Biết ơn" },
    { emoji: "😊", label: "Happy", vi: "Vui vẻ" },
    { emoji: "😐", label: "Neutral", vi: "Bình thường" },
    { emoji: "😔", label: "Tired", vi: "Mệt mỏi" },
    { emoji: "😢", label: "Overwhelmed", vi: "Quá tải" },
  ]

  const placeholders = [
    "My baby's smile | Nụ cười của con 💕",
    "A quiet cup of tea | Ly trà buổi sáng 🍵",
    "Five minutes just for me | Năm phút cho riêng mình 🌿",
  ]

  const handleSaveGratitude = () => {
    if (gratitudes.some((g) => g.trim()) || reflection.trim()) {
      const xpEarned = 5
      setCelebrationXP(xpEarned)
      setShowCelebration(true)

      const newEntry: GratitudeEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        gratitudes: gratitudes.filter((g) => g.trim()),
        reflection: reflection.trim(),
        mood,
        heartXP: xpEarned,
      }

      setEntries([newEntry, ...entries])
      setGratitudes(["", "", ""])
      setReflection("")
      setMood("")

      setTimeout(() => setShowCelebration(false), 2000)
    }
  }

  return (
    <div className="bg-gradient-to-br from-peach/20 via-lavender/20 to-cream rounded-2xl p-6 shadow-sm border border-peach/30">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">A soft pause for gratitude 🌷</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Một phút dừng lại để biết ơn 🌷</p>
        <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
          Even small joys count. | Dù niềm vui nhỏ thôi cũng đáng trân trọng.
        </p>
      </div>

      {/* Gratitude Input Zone */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Today, I'm grateful for... | Hôm nay, mẹ biết ơn vì...
        </label>
        <div className="space-y-3">
          {gratitudes.map((gratitude, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-lg font-bold text-peach">{index + 1}</span>
              <input
                type="text"
                value={gratitude}
                onChange={(e) => {
                  const newGratitudes = [...gratitudes]
                  newGratitudes[index] = e.target.value
                  setGratitudes(newGratitudes)
                }}
                placeholder={placeholders[index]}
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-peach/30 dark:border-rose-900/30 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-peach/50 text-base"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          How do you feel today? | Hôm nay mẹ cảm thấy thế nào?
        </label>
        <div className="flex gap-3 flex-wrap">
          {moodOptions.map((option) => (
            <button
              key={option.emoji}
              onClick={() => setMood(option.emoji)}
              className={`text-3xl p-3 rounded-xl transition-all ${
                mood === option.emoji
                  ? "bg-peach/40 scale-110 ring-2 ring-peach"
                  : "bg-white dark:bg-slate-800 hover:bg-peach/20 dark:hover:bg-rose-900/20"
              }`}
              title={`${option.label} | ${option.vi}`}
            >
              {option.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Reflection Area */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Write a little reflection | Ghi vài dòng cảm nghĩ nhỏ 💭
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="How was your day? What made you smile? | Hôm nay như thế nào? Điều gì khiến mẹ cười?"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-peach/30 dark:border-rose-900/30 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-peach/50 text-base resize-none h-24"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveGratitude}
        className="w-full bg-gradient-to-r from-peach to-pink-300 hover:from-peach/90 hover:to-pink-300/90 text-white font-semibold py-3 px-4 rounded-xl transition-all min-h-12 text-base"
      >
        Save My Gratitude | Lưu điều biết ơn 🌸
      </button>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="animate-float-up">
            <div className="text-6xl">💗</div>
          </div>
          <div className="absolute text-center">
            <p className="text-2xl font-bold text-peach animate-fade-in">+{celebrationXP} Heart XP</p>
            <p className="text-slate-600 dark:text-slate-400 mt-2 animate-fade-in">
              Thank you for loving yourself today 🌿
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-1 animate-fade-in">
              Cảm ơn mẹ vì đã yêu thương bản thân hôm nay 🌿
            </p>
          </div>
        </div>
      )}

      {/* History Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full mt-4 flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <span className="text-sm font-medium">View History | Xem lại nhật ký 💖 ({entries.length})</span>
        {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* History View */}
      {showHistory && (
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          {entries.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-500 text-sm text-center py-4">
              No entries yet. Start your gratitude journey today! | Chưa có nhật ký nào. Hãy bắt đầu hôm nay!
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-peach/20 dark:border-rose-900/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{entry.date}</span>
                  <span className="text-lg">{entry.mood}</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 mb-2">
                  {entry.gratitudes.map((g, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-peach">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
                {entry.reflection && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic mb-2">"{entry.reflection}"</p>
                )}
                <div className="flex items-center gap-1 text-xs text-peach font-semibold">
                  <Heart size={12} fill="currentColor" />+{entry.heartXP} Heart XP
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
