/**
 * Emotional Translation Integration for Dashboard
 * Seamlessly integrates AI translation into existing components
 */

'use client'

import React from 'react'
import { EmotionalTranslationProvider } from '@/hooks/use-emotional-translation'
import { EmotionalTranslatorToggle } from '@/components/emotional-translator-toggle'
import { BilingualText, TranslatedMessage, MommyTip, GratitudeNote } from '@/components/bilingual-text'

/**
 * Wrap the entire app with emotional translation support
 */
export function EmotionalTranslationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EmotionalTranslationProvider defaultLanguage="en" defaultMode="warm-gentle">
      {children}
      {/* Floating translation toggle */}
      <EmotionalTranslatorToggle variant="floating" />
    </EmotionalTranslationProvider>
  )
}

/**
 * Enhanced Daily Missions with Translation
 */
export function TranslatedDailyMissionCard({ 
  title, 
  xp, 
  completed = false,
  className = ''
}: {
  title: string
  xp: number
  completed?: boolean
  className?: string
}) {
  return (
    <div className={`
      p-4 rounded-xl border transition-all duration-300
      ${completed 
        ? 'bg-gradient-to-r from-mint/10 to-baby-blue/10 border-mint/30' 
        : 'bg-white dark:bg-slate-800 border-peach/20 hover:border-peach/40'
      }
      ${className}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-sm
            ${completed ? 'bg-mint text-white' : 'bg-gray-100 text-gray-400'}
          `}>
            {completed ? '✓' : '○'}
          </div>
          <BilingualText 
            className={`font-medium ${completed ? 'text-gray-600 line-through' : 'text-foreground'}`}
            fadeTransition
          >
            {title}
          </BilingualText>
        </div>
        
        <div className="flex items-center gap-1 bg-gradient-to-r from-peach/20 to-lavender/20 px-3 py-1 rounded-full">
          <span className="text-yellow-500">⚡</span>
          <span className="text-sm font-bold text-foreground">+{xp}</span>
        </div>
      </div>
      
      {completed && (
        <TranslatedMessage
          message="Well done! You're taking great care of yourself and your baby."
          tone="joy"
          className="mt-3"
          showEmotionalIndicator={false}
        />
      )}
    </div>
  )
}

/**
 * Enhanced Motivational Footer with Translation
 */
export function TranslatedMotivationalMessage({ 
  message, 
  author,
  className = '' 
}: {
  message: string
  author?: string
  className?: string
}) {
  return (
    <div className={`
      bg-gradient-to-br from-lavender/5 to-peach/5 
      border border-lavender/20 rounded-2xl p-6 text-center
      ${className}
    `}>
      <div className="max-w-2xl mx-auto">
        <BilingualText 
          className="text-lg text-foreground leading-relaxed font-medium"
          as="blockquote"
          sparkleEffect
        >
          "{message}"
        </BilingualText>
        
        {author && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
            <BilingualText className="text-sm text-lavender font-medium">
              — {author}
            </BilingualText>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Enhanced Baby Health Tracker with Translation
 */
export function TranslatedHealthMetric({ 
  label, 
  value, 
  trend, 
  unit = '',
  trendDirection = 'neutral'
}: {
  label: string
  value: string | number
  trend?: string
  unit?: string
  trendDirection?: 'up' | 'down' | 'neutral'
}) {
  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-mint'
      case 'down': return 'text-peach'
      default: return 'text-gray-500'
    }
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '📊'
    }
  }

  return (
    <div className="bg-gradient-to-br from-baby-blue/10 to-mint/10 rounded-xl p-4 border border-baby-blue/20">
      <BilingualText className="text-xs font-medium text-gray-600 mb-1">
        {label}
      </BilingualText>
      
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground">
          {value}{unit}
        </span>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${getTrendColor(trendDirection)}`}>
            <span>{getTrendIcon(trendDirection)}</span>
            <BilingualText>{trend}</BilingualText>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Enhanced Achievement Badge with Translation
 */
export function TranslatedAchievementBadge({ 
  title, 
  description, 
  icon, 
  unlocked = false,
  progress,
  className = ''
}: {
  title: string
  description: string
  icon: string
  unlocked?: boolean
  progress?: number
  className?: string
}) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl border transition-all duration-300
      ${unlocked 
        ? 'bg-gradient-to-br from-mint/20 to-baby-blue/20 border-mint/40 shadow-lg' 
        : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'
      }
      ${className}
    `}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-2xl
            ${unlocked 
              ? 'bg-gradient-to-br from-mint to-baby-blue' 
              : 'bg-gray-200 dark:bg-slate-600'
            }
          `}>
            {unlocked ? icon : '🔒'}
          </div>
          
          <div className="flex-1 min-w-0">
            <BilingualText 
              className={`font-semibold ${unlocked ? 'text-foreground' : 'text-gray-500'}`}
              fadeTransition
            >
              {title}
            </BilingualText>
            
            <BilingualText 
              className={`text-sm mt-1 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}
              as="p"
            >
              {description}
            </BilingualText>
            
            {progress !== undefined && !unlocked && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <BilingualText>Progress</BilingualText>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-peach to-lavender h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {unlocked && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✨</span>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Collection of pre-translated common messages for the Mommy Leveling app
 */
export const TranslatedMessages = {
  Encouragement: {
    WellDone: () => (
      <TranslatedMessage
        message="You're doing such a wonderful job, mama! Every moment of care matters."
        tone="joy"
      />
    ),
    KeepGoing: () => (
      <TranslatedMessage
        message="Take it one day at a time. You're stronger than you know."
        tone="motivation"
      />
    ),
    RestTime: () => (
      <TranslatedMessage
        message="It's okay to rest. Taking care of yourself is taking care of your baby too."
        tone="comfort"
      />
    ),
    Grateful: () => (
      <TranslatedMessage
        message="Your love and dedication create beautiful moments every day."
        tone="reflection"
      />
    )
  },
  
  Tips: {
    Feeding: () => (
      <MommyTip
        category="Feeding"
        tip="Trust your instincts. Every baby has their own rhythm, and you're learning it together."
      />
    ),
    Sleep: () => (
      <MommyTip
        category="Sleep"
        tip="Rest when your baby rests. Even 20 minutes can help restore your energy."
      />
    ),
    SelfCare: () => (
      <MommyTip
        category="Self-Care"
        tip="A few deep breaths, a warm cup of tea, or a gentle stretch can work wonders."
      />
    )
  },
  
  Gratitude: {
    NewMom: () => (
      <GratitudeNote
        note="Every day I'm amazed by how much love I can feel. Being a mom has opened my heart in ways I never imagined."
        author="Sarah, new mom"
      />
    ),
    Growth: () => (
      <GratitudeNote
        note="The little victories - first smiles, peaceful naps, successful feedings - they all add up to something beautiful."
        author="Maria, 6 months postpartum"
      />
    )
  }
}

export default EmotionalTranslationWrapper