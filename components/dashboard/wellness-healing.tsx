"use client"

import { useState, useEffect } from "react"
import { Play, Pause, ChevronLeft, ChevronRight, Heart, Bookmark } from "lucide-react"

interface HealingMessage {
  en: string
  vi: string
}

export default function WellnessHealing() {
  const [currentTime, setCurrentTime] = useState("")
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0)
  const [selectedMood, setSelectedMood] = useState("")
  const [savedAffirmations, setSavedAffirmations] = useState<HealingMessage[]>([])
  const [showMoodFeedback, setShowMoodFeedback] = useState(false)

  const tracks = [
    {
      title: "Lullaby for Mom | Bài hát ru cho mẹ",
      duration: "8:32",
      category: "Sleep",
      emoji: "🎵",
    },
    {
      title: "Gentle Rain | Cơn mưa dịu nhẹ",
      duration: "10:15",
      category: "Calm",
      emoji: "🌧️",
    },
    {
      title: "Heartbeat Connection | Nhịp tim yêu thương",
      duration: "6:45",
      category: "Bonding",
      emoji: "💓",
    },
    {
      title: "Morning Stretch | Thức dậy nhẹ nhàng",
      duration: "5:20",
      category: "Energy",
      emoji: "🌅",
    },
  ]

  const affirmations: HealingMessage[] = [
    {
      en: "You are not alone.",
      vi: "Mẹ không đơn độc.",
    },
    {
      en: "Progress, not perfection.",
      vi: "Tiến bộ, không cần hoàn hảo.",
    },
    {
      en: "Your love is your greatest power.",
      vi: "Tình yêu là sức mạnh lớn nhất của mẹ.",
    },
    {
      en: "Take one soft breath. You're safe now.",
      vi: "Hít thở nhẹ nhàng. Mẹ an toàn rồi.",
    },
    {
      en: "You are doing amazing, Mommy.",
      vi: "Mẹ đang làm rất tuyệt vời.",
    },
    {
      en: "Let go of worry, breathe in peace.",
      vi: "Buông lo, hít thở bình yên.",
    },
    {
      en: "You deserve rest and love.",
      vi: "Mẹ xứng đáng được yêu thương và nghỉ ngơi.",
    },
    {
      en: "Every breath brings calm.",
      vi: "Mỗi hơi thở mang đến sự bình yên.",
    },
  ]

  const moodOptions = [
    { emoji: "🥰", label: "Grateful", vi: "Biết ơn" },
    { emoji: "😊", label: "Happy", vi: "Vui vẻ" },
    { emoji: "😐", label: "Neutral", vi: "Bình thường" },
    { emoji: "😔", label: "Tired", vi: "Mệt mỏi" },
    { emoji: "😢", label: "Overwhelmed", vi: "Quá tải" },
  ]

  const moodMessages: Record<string, HealingMessage> = {
    "🥰": {
      en: "Your gratitude is beautiful. Keep shining.",
      vi: "Sự biết ơn của mẹ rất đẹp. Hãy tiếp tục tỏa sáng.",
    },
    "😊": {
      en: "You're radiating joy. Spread it around.",
      vi: "Mẹ đang tỏa sáng hạnh phúc. Hãy chia sẻ nó.",
    },
    "😐": {
      en: "It's okay to feel neutral. You're still amazing.",
      vi: "Không sao cả nếu mẹ cảm thấy bình thường. Mẹ vẫn tuyệt vời.",
    },
    "😔": {
      en: "It's okay to feel tired. You're still amazing.",
      vi: "Không sao cả nếu mẹ mệt. Mẹ vẫn tuyệt vời lắm.",
    },
    "😢": {
      en: "All feelings are valid. You are growing love every day.",
      vi: "Mọi cảm xúc đều đáng được trân trọng. Mẹ đang nuôi dưỡng yêu thương mỗi ngày.",
    },
  }

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours()
      if (hour < 12) {
        setCurrentTime("morning")
      } else if (hour < 18) {
        setCurrentTime("afternoon")
      } else {
        setCurrentTime("evening")
      }
    }
    updateTime()
  }, [])

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setShowMoodFeedback(true)
    setTimeout(() => setShowMoodFeedback(false), 3000)
  }

  const handleSaveAffirmation = () => {
    const affirmation = affirmations[currentAffirmationIndex]
    if (!savedAffirmations.some((a) => a.en === affirmation.en)) {
      setSavedAffirmations([...savedAffirmations, affirmation])
    }
  }

  const getGreeting = () => {
    if (currentTime === "morning") {
      return {
        en: "Good morning, Mommy",
        vi: "Chào buổi sáng, mẹ yêu",
        emoji: "🌞",
      }
    } else if (currentTime === "afternoon") {
      return {
        en: "You're doing beautifully today",
        vi: "Hôm nay mẹ đang làm rất tốt",
        emoji: "☀️",
      }
    } else {
      return {
        en: "Time to rest, you did beautifully today",
        vi: "Đã đến lúc nghỉ ngơi, hôm nay mẹ đã làm rất tốt",
        emoji: "💕",
      }
    }
  }

  const greeting = getGreeting()

  return (
    <div className="bg-gradient-to-br from-lavender/20 via-mint/20 to-cream rounded-2xl p-6 shadow-sm border border-lavender/30">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {greeting.en} {greeting.emoji}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {greeting.vi} {greeting.emoji}
        </p>
        <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
          Breathe in peace. You are doing enough. | Hít thở bình yên. Mẹ đang làm đủ tốt rồi.
        </p>
      </div>

      {/* Meditation & Music Zone */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Calm Moments | Khoảnh khắc bình yên 🌿
        </h3>
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-xl p-4 border transition-all ${
                index === currentTrackIndex
                  ? "border-lavender/50 dark:border-purple-900/50 bg-lavender/10 dark:bg-purple-900/10"
                  : "border-lavender/20 dark:border-purple-900/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => {
                      setCurrentTrackIndex(index)
                      setIsPlayingMusic(!isPlayingMusic)
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-lavender/30 dark:bg-purple-900/30 hover:bg-lavender/50 dark:hover:bg-purple-900/50 flex items-center justify-center transition-all"
                  >
                    {isPlayingMusic && index === currentTrackIndex ? (
                      <Pause size={18} className="text-slate-700 dark:text-slate-300" />
                    ) : (
                      <Play size={18} className="text-slate-700 dark:text-slate-300 ml-0.5" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                      {track.emoji} {track.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{track.duration}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-lavender dark:text-purple-400">{track.category}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                "Every breath brings calm. | Mỗi hơi thở mang đến sự bình yên."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Healing Messages & Affirmations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Healing Words | Lời thì thầm chữa lành 💗
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-lavender/30 dark:border-purple-900/30 min-h-32 flex flex-col justify-between">
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {affirmations[currentAffirmationIndex].en}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{affirmations[currentAffirmationIndex].vi}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() =>
                setCurrentAffirmationIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length)
              }
              className="flex-shrink-0 w-10 h-10 rounded-full bg-lavender/30 dark:bg-purple-900/30 hover:bg-lavender/50 dark:hover:bg-purple-900/50 flex items-center justify-center transition-all"
            >
              <ChevronLeft size={18} className="text-slate-700 dark:text-slate-300" />
            </button>
            <button
              onClick={handleSaveAffirmation}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-lavender/20 dark:bg-purple-900/20 hover:bg-lavender/40 dark:hover:bg-purple-900/40 transition-all text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <Bookmark size={16} />
              Save | Lưu
            </button>
            <button
              onClick={() => setCurrentAffirmationIndex((prev) => (prev + 1) % affirmations.length)}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-lavender/30 dark:bg-purple-900/30 hover:bg-lavender/50 dark:hover:bg-purple-900/50 flex items-center justify-center transition-all"
            >
              <ChevronRight size={18} className="text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Mood Journal */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
          My Feelings Today | Cảm xúc hôm nay 💕
        </h3>
        <div className="flex gap-3 flex-wrap mb-4">
          {moodOptions.map((option) => (
            <button
              key={option.emoji}
              onClick={() => handleMoodSelect(option.emoji)}
              className={`text-3xl p-3 rounded-xl transition-all ${
                selectedMood === option.emoji
                  ? "bg-lavender/40 scale-110 ring-2 ring-lavender"
                  : "bg-white dark:bg-slate-800 hover:bg-lavender/20 dark:hover:bg-purple-900/20"
              }`}
              title={`${option.label} | ${option.vi}`}
            >
              {option.emoji}
            </button>
          ))}
        </div>

        {showMoodFeedback && selectedMood && (
          <div className="bg-lavender/20 dark:bg-purple-900/20 rounded-lg p-4 border border-lavender/30 dark:border-purple-900/30 animate-slide-up-fade">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {moodMessages[selectedMood].en}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{moodMessages[selectedMood].vi}</p>
          </div>
        )}
      </div>

      {/* Saved Affirmations */}
      {savedAffirmations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            My Healing Box | Hộp chữa lành của mẹ ({savedAffirmations.length})
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {savedAffirmations.map((affirmation, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-lavender/20 dark:border-purple-900/20 flex items-start gap-2"
              >
                <Heart
                  size={14}
                  className="text-lavender dark:text-purple-400 flex-shrink-0 mt-1"
                  fill="currentColor"
                />
                <div className="flex-1 text-xs">
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{affirmation.en}</p>
                  <p className="text-slate-600 dark:text-slate-400">{affirmation.vi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
