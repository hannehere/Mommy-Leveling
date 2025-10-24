"use client"

import { useEffect, useState } from "react"

interface ConfettiBurstProps {
  trigger: boolean
  particleCount?: number
}

export function ConfettiBurst({ trigger, particleCount = 30 }: ConfettiBurstProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.2,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => setParticles([]), 1500)
      return () => clearTimeout(timer)
    }
  }, [trigger, particleCount])

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none text-2xl animate-burst"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {["✨", "💕", "🌟", "💫", "🎉"][particle.id % 5]}
        </div>
      ))}

      <style jsx>{`
        @keyframes burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 300 - 150}px) scale(0);
          }
        }
        .animate-burst {
          animation: burst 1.5s ease-out forwards;
        }
      `}</style>
    </>
  )
}
