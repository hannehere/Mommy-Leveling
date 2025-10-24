export default function MotivationalFooter() {
  const quotes = [
    "Every cuddle is a level-up.",
    "You're doing an amazing job, mom.",
    "Your love is the greatest power-up.",
    "Motherhood is the ultimate adventure.",
    "You're stronger than you think.",
    "Every moment with your baby is precious.",
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="bg-gradient-to-r from-peach/20 via-lavender/20 to-mint/20 rounded-2xl shadow-lg p-8 border border-peach/20 text-center">
      <p className="text-2xl font-bold bg-gradient-to-r from-peach to-lavender bg-clip-text text-transparent mb-2">
        {randomQuote}
      </p>
      <p className="text-sm text-gray-600">Keep leveling up your motherhood journey!</p>
    </div>
  )
}
