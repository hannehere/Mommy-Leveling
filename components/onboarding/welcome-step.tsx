"use client"

export default function WelcomeStep() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 md:p-12 backdrop-blur-sm text-center">
      <div className="mb-8 flex justify-center">
        <div className="relative w-32 h-32">
          {/* Animated glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-peach/30 to-lavender/30 rounded-full blur-2xl animate-pulse" />
          {/* Mom and baby emoji with animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce" style={{ animationDelay: "0s" }}>
              👩‍👧
            </div>
          </div>
          {/* Floating hearts */}
          <div className="absolute top-0 right-0 text-2xl animate-float" style={{ animationDelay: "0s" }}>
            💕
          </div>
          <div className="absolute bottom-0 left-0 text-2xl animate-float" style={{ animationDelay: "0.5s" }}>
            💕
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
        Chào mừng mẹ đến với hành trình level up 💕
      </h1>
      <p className="text-lg text-muted-foreground mb-2">Một nơi để mẹ và bé cùng trưởng thành – từng bước nhỏ.</p>
      <p className="text-base text-muted-foreground mb-8">Mẹ đang làm rất tốt 🌷</p>

      <div className="bg-peach/10 dark:bg-rose-900/20 rounded-2xl p-6 mb-8 border-2 border-peach/30">
        <p className="text-sm text-foreground">✨ Không có hành trình nào giống nhau — và đó chính là điều đẹp nhất.</p>
      </div>

      <p className="text-muted-foreground">
        Hãy cùng chúng tôi khám phá những cách để mẹ và bé phát triển, học hỏi, và tìm thấy niềm vui mỗi ngày.
      </p>
    </div>
  )
}

const float = {
  "0%, 100%": {
    transform: "translateY(0px) translateX(0px)",
    opacity: "0.2",
  },
  "50%": {
    transform: "translateY(-20px) translateX(10px)",
    opacity: "0.4",
  },
}

const animateFloat = {
  animation: "float 6s ease-in-out infinite",
}
