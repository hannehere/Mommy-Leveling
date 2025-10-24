"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Lock } from "lucide-react"
import MissionModal from "./mission-modal"
import XPRewardAnimation from "./xp-reward-animation"
import SkillTreeToDashboardTransition from "./skill-tree-to-dashboard-transition"

interface Skill {
  id: string
  name: string
  xp: number
  level: number
  unlocked: boolean
  icon: string
  description: string
  affirmation: string
}

interface SkillCategory {
  id: string
  name: string
  emoji: string
  color: string
  skills: Skill[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "nutrition",
    name: "Nutrition & Health",
    emoji: "🍎",
    color: "peach",
    skills: [
      {
        id: "balanced-meals",
        name: "Balanced Meals",
        xp: 450,
        level: 3,
        unlocked: true,
        icon: "🥗",
        description: "Chuẩn bị bữa ăn cân bằng cho bé và cho mẹ.",
        affirmation: "Mẹ đang chăm sóc sức khỏe của cả hai 💚",
      },
      {
        id: "hydration",
        name: "Hydration Master",
        xp: 320,
        level: 2,
        unlocked: true,
        icon: "💧",
        description: "Uống đủ nước và giúp bé uống nước đều đặn.",
        affirmation: "Mẹ giỏi lắm, sức khỏe là ưu tiên hàng đầu 💙",
      },
      {
        id: "vitamin",
        name: "Vitamin Tracker",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "💊",
        description: "Theo dõi vitamin và chất dinh dưỡng.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
    ],
  },
  {
    id: "emotional",
    name: "Emotional Connection",
    emoji: "💕",
    color: "lavender",
    skills: [
      {
        id: "bonding",
        name: "Bonding Moments",
        xp: 500,
        level: 4,
        unlocked: true,
        icon: "🤗",
        description: "Ôm bé ít nhất 5 phút và thì thầm điều gì đó yêu thương.",
        affirmation: "Mẹ và bé vừa gắn kết hơn 🌸",
      },
      {
        id: "reading-cues",
        name: "Reading Baby's Cues",
        xp: 280,
        level: 2,
        unlocked: true,
        icon: "👀",
        description: "Quan sát và hiểu những tín hiệu của bé.",
        affirmation: "Mẹ hiểu bé rất tốt 💖",
      },
      {
        id: "calm-cuddle",
        name: "Calm & Cuddle",
        xp: 150,
        level: 1,
        unlocked: true,
        icon: "🛏️",
        description: "Tạo không gian yên tĩnh để bé ngủ ngon.",
        affirmation: "Tình yêu của mẹ là sức mạnh lớn nhất 💕",
      },
    ],
  },
  {
    id: "development",
    name: "Baby Development",
    emoji: "🧩",
    color: "baby-blue",
    skills: [
      {
        id: "tummy-time",
        name: "Tummy Time Trainer",
        xp: 380,
        level: 3,
        unlocked: true,
        icon: "🤸",
        description: "Tập tummy time để phát triển cơ bé.",
        affirmation: "Mẹ đang giúp bé phát triển khỏe mạnh 🌱",
      },
      {
        id: "tiny-steps",
        name: "Tiny Steps",
        xp: 200,
        level: 1,
        unlocked: true,
        icon: "👣",
        description: "Hỗ trợ bé bước đi những bước đầu tiên.",
        affirmation: "Mỗi bước nhỏ là một chiến thắng lớn 🎉",
      },
      {
        id: "play-learn",
        name: "Play & Learn",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "🎮",
        description: "Chơi và học cùng bé.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
    ],
  },
  {
    id: "self-care",
    name: "Self-Care for Mom",
    emoji: "🌿",
    color: "mint",
    skills: [
      {
        id: "rest-well",
        name: "Rest Well",
        xp: 420,
        level: 3,
        unlocked: true,
        icon: "😴",
        description: "Nghỉ ngơi đủ để có năng lượng chăm con.",
        affirmation: "Mẹ xứng đáng được nghỉ ngơi 💚",
      },
      {
        id: "mindful",
        name: "Mindful Moments",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "🧘",
        description: "Dành thời gian thiền định và thư giãn.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
      {
        id: "me-time",
        name: "Me Time Magic",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "✨",
        description: "Dành thời gian cho bản thân mẹ.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
    ],
  },
  {
    id: "community",
    name: "Community & Support",
    emoji: "🤝",
    color: "baby-blue",
    skills: [
      {
        id: "sharing",
        name: "Sharing Stories",
        xp: 290,
        level: 2,
        unlocked: true,
        icon: "📖",
        description: "Chia sẻ câu chuyện của mẹ với cộng đồng.",
        affirmation: "Câu chuyện của mẹ sẽ truyền cảm hứng cho người khác 💬",
      },
      {
        id: "helping",
        name: "Helping Another Mom",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "🤲",
        description: "Giúp đỡ một mẹ khác trên hành trình của họ.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
      {
        id: "community-star",
        name: "Community Star",
        xp: 0,
        level: 0,
        unlocked: false,
        icon: "⭐",
        description: "Trở thành ngôi sao của cộng đồng.",
        affirmation: "Mẹ sẽ unlock kỹ năng này khi tiến bộ hơn",
      },
    ],
  },
]

const TOTAL_XP = 3090
const MAX_XP = 5000

export default function SkillTree() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["nutrition", "emotional"]))
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showEntrance, setShowEntrance] = useState(true)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [showMissionModal, setShowMissionModal] = useState(false)
  const [showRewardAnimation, setShowRewardAnimation] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowEntrance(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleSkillClick = (skill: Skill) => {
    if (skill.unlocked) {
      setSelectedSkill(skill)
      setShowMissionModal(true)
    }
  }

  const handleMissionComplete = () => {
    setShowMissionModal(false)
    setShowRewardAnimation(true)
  }

  const handleRewardComplete = () => {
    setShowRewardAnimation(false)
    setShowTransition(true)
  }

  const xpPercentage = (TOTAL_XP / MAX_XP) * 100

  // Desktop radial layout
  if (!isMobile) {
    const centerX = 400
    const centerY = 300
    const radius = 200

    return (
      <section
        className={`w-full py-16 px-4 bg-gradient-to-b from-cream via-white to-cream transition-opacity duration-1000 ${showEntrance ? "opacity-0" : "opacity-100"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Cây Kỹ Năng Motherhood của Mẹ</h2>
            <p className="text-gray-600">Mỗi kỹ năng là một bước tiến trên hành trình yêu thương</p>
          </div>

          <div className="relative w-full h-[600px] flex items-center justify-center">
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 600"
              style={{ maxWidth: "100%", height: "auto" }}
            >
              {/* Draw connecting lines */}
              {SKILL_CATEGORIES.map((category, idx) => {
                const angle = (idx / SKILL_CATEGORIES.length) * Math.PI * 2 - Math.PI / 2
                const x = centerX + radius * Math.cos(angle)
                const y = centerY + radius * Math.sin(angle)

                return (
                  <g key={`line-${category.id}`}>
                    {/* Glow effect for unlocked categories */}
                    {category.skills.some((s) => s.unlocked) && (
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        stroke={`url(#gradient-${category.color})`}
                        strokeWidth="3"
                        opacity="0.6"
                        className="animate-pulse"
                      />
                    )}
                    <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="#e0e0e0" strokeWidth="2" opacity="0.3" />
                  </g>
                )
              })}

              {/* Define gradients */}
              <defs>
                <linearGradient id="gradient-peach" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD6C9" />
                  <stop offset="100%" stopColor="#FF9B7D" />
                </linearGradient>
                <linearGradient id="gradient-lavender" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E7D1FF" />
                  <stop offset="100%" stopColor="#C9A8FF" />
                </linearGradient>
                <linearGradient id="gradient-baby-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BCE5FF" />
                  <stop offset="100%" stopColor="#7ECBFF" />
                </linearGradient>
                <linearGradient id="gradient-mint" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8F2D4" />
                  <stop offset="100%" stopColor="#8FE5B8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center avatar and XP bar */}
            <div className="absolute z-10 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-peach to-lavender rounded-full blur-lg opacity-60 animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-br from-peach to-lavender rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-4xl">👩‍👧</span>
                </div>
                {/* XP progress ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#e0e0e0" strokeWidth="2" />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#FFD6C9"
                    strokeWidth="2"
                    strokeDasharray={`${(xpPercentage / 100) * 301.6} 301.6`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Mom Level 12</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {TOTAL_XP} / {MAX_XP} XP
                </p>
              </div>

              {/* XP bar */}
              <div className="w-48 h-3 bg-gray-200 rounded-full mt-3 overflow-hidden shadow-md">
                <div
                  className="h-full bg-gradient-to-r from-peach to-lavender transition-all duration-1000"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>

            {/* Skill nodes */}
            {SKILL_CATEGORIES.map((category, idx) => {
              const angle = (idx / SKILL_CATEGORIES.length) * Math.PI * 2 - Math.PI / 2
              const x = centerX + radius * Math.cos(angle)
              const y = centerY + radius * Math.sin(angle)

              return (
                <div
                  key={category.id}
                  className="absolute"
                  style={{
                    left: `${(x / 800) * 100}%`,
                    top: `${(y / 600) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative group">
                    {/* Category node */}
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white transition-all duration-300 cursor-pointer ${
                        category.skills.some((s) => s.unlocked)
                          ? `bg-${category.color} hover:scale-110 animate-pulse-glow`
                          : "bg-gray-200 opacity-50"
                      }`}
                      onMouseEnter={() => setHoveredSkill(category.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => {
                        const unlockedSkill = category.skills.find((s) => s.unlocked)
                        if (unlockedSkill) handleSkillClick(unlockedSkill)
                      }}
                    >
                      {category.emoji}
                    </div>

                    {/* Tooltip */}
                    {hoveredSkill === category.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20 shadow-lg">
                        {category.name}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center mt-12">
            <button className="px-6 py-3 bg-gradient-to-r from-peach to-lavender text-gray-800 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 min-h-12">
              Nhiệm vụ tiếp theo
            </button>
            <button className="px-6 py-3 bg-mint text-gray-800 font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 min-h-12">
              Xem thành tựu
            </button>
          </div>
        </div>

        {/* Mission modal, reward animation, and transition components */}
        {selectedSkill && (
          <MissionModal
            isOpen={showMissionModal}
            onClose={() => setShowMissionModal(false)}
            onComplete={handleMissionComplete}
            skill={{
              ...selectedSkill,
              reward: { xp: 25, points: "+1 Calm Point" },
              duration: "5 phút",
            }}
          />
        )}

        {showRewardAnimation && selectedSkill && (
          <XPRewardAnimation xp={25} affirmation={selectedSkill.affirmation} onComplete={handleRewardComplete} />
        )}

        <SkillTreeToDashboardTransition isActive={showTransition} onComplete={() => setShowTransition(false)} />
      </section>
    )
  }

  // Mobile vertical layout
  return (
    <section
      className={`w-full py-12 px-4 bg-gradient-to-b from-cream via-white to-cream transition-opacity duration-1000 ${showEntrance ? "opacity-0" : "opacity-100"}`}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Cây Kỹ Năng của Mẹ</h2>
          <p className="text-sm text-gray-600">Mỗi kỹ năng là một bước tiến</p>
        </div>

        {/* Center avatar and XP */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-peach to-lavender rounded-full blur-lg opacity-60 animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-peach to-lavender rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-3xl">👩‍👧</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">Mom Level 12</h3>
          <p className="text-xs text-gray-600 mt-1">
            {TOTAL_XP} / {MAX_XP} XP
          </p>

          {/* XP bar */}
          <div className="w-40 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden shadow-md">
            <div
              className="h-full bg-gradient-to-r from-peach to-lavender transition-all duration-1000"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        {/* Collapsible categories */}
        <div className="space-y-3">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full px-4 py-3 flex items-center justify-between font-semibold transition-colors ${
                  category.skills.some((s) => s.unlocked)
                    ? `bg-${category.color} text-gray-800 hover:opacity-90`
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{category.emoji}</span>
                  {category.name}
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${expandedCategories.has(category.id) ? "rotate-180" : ""}`}
                />
              </button>

              {expandedCategories.has(category.id) && (
                <div className="bg-white p-3 space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        skill.unlocked
                          ? "border-gray-200 bg-gray-50 hover:bg-gray-100"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                      onClick={() => handleSkillClick(skill)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-lg">{skill.icon}</span>
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{skill.name}</p>
                            {skill.unlocked ? (
                              <p className="text-xs text-gray-600">
                                Level {skill.level} • {skill.xp} XP
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Lock size={12} /> Locked
                              </p>
                            )}
                          </div>
                        </div>
                        {skill.unlocked && skill.level > 0 && (
                          <div className="flex gap-1">
                            {Array.from({ length: skill.level }).map((_, i) => (
                              <span key={i} className="text-yellow-400">
                                ⭐
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Progress bar for unlocked skills */}
                      {skill.unlocked && (
                        <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-peach to-lavender"
                            style={{ width: `${(skill.xp / 500) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <button className="w-full px-4 py-3 bg-gradient-to-r from-peach to-lavender text-gray-800 font-semibold rounded-full hover:shadow-lg transition-all duration-300 min-h-12">
            Nhiệm vụ tiếp theo
          </button>
          <button className="w-full px-4 py-3 bg-mint text-gray-800 font-semibold rounded-full hover:shadow-lg transition-all duration-300 min-h-12">
            Xem thành tựu
          </button>
        </div>

        {/* Mission modal, reward animation, and transition components for mobile */}
        {selectedSkill && (
          <MissionModal
            isOpen={showMissionModal}
            onClose={() => setShowMissionModal(false)}
            onComplete={handleMissionComplete}
            skill={{
              ...selectedSkill,
              reward: { xp: 25, points: "+1 Calm Point" },
              duration: "5 phút",
            }}
          />
        )}

        {showRewardAnimation && selectedSkill && (
          <XPRewardAnimation xp={25} affirmation={selectedSkill.affirmation} onComplete={handleRewardComplete} />
        )}

        <SkillTreeToDashboardTransition isActive={showTransition} onComplete={() => setShowTransition(false)} />
      </div>
    </section>
  )
}
