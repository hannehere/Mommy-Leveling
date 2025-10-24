/**
 * Bilingual Text Display Component
 * Shows text in both languages with smooth transitions
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useEmotionalTranslation, useTranslateText } from '@/hooks/use-emotional-translation'
import { Loader2, Sparkles } from 'lucide-react'

interface BilingualTextProps {
  children: string
  className?: string
  showOriginal?: boolean
  fadeTransition?: boolean
  sparkleEffect?: boolean
  as?: keyof JSX.IntrinsicElements
}

export function BilingualText({ 
  children, 
  className = '',
  showOriginal = false,
  fadeTransition = true,
  sparkleEffect = false,
  as: Component = 'span'
}: BilingualTextProps) {
  const { currentLanguage, bilingualMode, isTranslating } = useEmotionalTranslation()
  const translateText = useTranslateText()
  
  const [displayText, setDisplayText] = useState(children)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const translateContent = async () => {
      if (!children.trim()) return

      setIsAnimating(fadeTransition)
      
      try {
        const result = await translateText(children, {
          showOriginal: showOriginal || bilingualMode
        })
        
        if (fadeTransition) {
          // Fade out, change text, fade in
          setTimeout(() => {
            setDisplayText(result.displayText)
            setIsAnimating(false)
          }, 150)
        } else {
          setDisplayText(result.displayText)
          setIsAnimating(false)
        }
      } catch (error) {
        console.error('Translation error:', error)
        setDisplayText(children)
        setIsAnimating(false)
      }
    }

    translateContent()
  }, [children, currentLanguage, bilingualMode, showOriginal, fadeTransition, translateText])

  const combinedClassName = `
    ${className}
    ${isAnimating ? 'opacity-50 transition-opacity duration-150' : 'opacity-100 transition-opacity duration-150'}
    ${sparkleEffect ? 'relative' : ''}
  `.trim()

  return (
    <Component className={combinedClassName}>
      {isTranslating && (
        <Loader2 className="inline w-3 h-3 mr-1 animate-spin text-peach" />
      )}
      {displayText}
      {sparkleEffect && !isAnimating && (
        <Sparkles className="inline w-3 h-3 ml-1 text-lavender opacity-60" />
      )}
    </Component>
  )
}

interface TranslatedMessageProps {
  message: string
  tone?: 'joy' | 'comfort' | 'motivation' | 'reflection'
  className?: string
  showEmotionalIndicator?: boolean
}

export function TranslatedMessage({ 
  message, 
  tone = 'comfort',
  className = '',
  showEmotionalIndicator = true
}: TranslatedMessageProps) {
  const { currentLanguage } = useEmotionalTranslation()
  
  const getEmotionalEmoji = (tone: string) => {
    switch (tone) {
      case 'joy': return '✨'
      case 'comfort': return '🌿'
      case 'motivation': return '💪'
      case 'reflection': return '💭'
      default: return '💕'
    }
  }

  const getToneClass = (tone: string) => {
    switch (tone) {
      case 'joy': return 'text-yellow-600 dark:text-yellow-400'
      case 'comfort': return 'text-mint dark:text-mint'
      case 'motivation': return 'text-blue-600 dark:text-blue-400'
      case 'reflection': return 'text-lavender dark:text-lavender'
      default: return 'text-peach dark:text-peach'
    }
  }

  return (
    <div className={`
      bg-gradient-to-r from-cream/50 to-white/50 dark:from-slate-800/50 dark:to-slate-700/50
      border border-peach/20 rounded-xl p-4 ${className}
    `}>
      <div className="flex items-start gap-3">
        {showEmotionalIndicator && (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            bg-gradient-to-br from-peach/20 to-lavender/20
          `}>
            {getEmotionalEmoji(tone)}
          </div>
        )}
        <div className="flex-1">
          <BilingualText 
            className={`text-sm leading-relaxed ${getToneClass(tone)}`}
            fadeTransition
            sparkleEffect
          >
            {message}
          </BilingualText>
        </div>
      </div>
    </div>
  )
}

interface MommyTipProps {
  tip: string
  category?: string
  className?: string
}

export function MommyTip({ tip, category, className = '' }: MommyTipProps) {
  const { currentLanguage } = useEmotionalTranslation()
  
  return (
    <div className={`
      bg-gradient-to-br from-mint/10 to-baby-blue/10 
      border border-mint/30 rounded-2xl p-5 ${className}
    `}>
      {category && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-mint rounded-full" />
          <BilingualText className="text-xs font-medium text-mint uppercase tracking-wide">
            {category}
          </BilingualText>
        </div>
      )}
      
      <BilingualText 
        className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
        as="p"
        fadeTransition
      >
        {tip}
      </BilingualText>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-mint">
          <span>💡</span>
          <BilingualText>
            {currentLanguage === 'vi' ? 'Mẹo của mẹ' : 'Mommy Tip'}
          </BilingualText>
        </div>
        <div className="w-12 h-1 bg-gradient-to-r from-mint to-baby-blue rounded-full" />
      </div>
    </div>
  )
}

interface GratitudeNoteProps {
  note: string
  author?: string
  className?: string
}

export function GratitudeNote({ note, author, className = '' }: GratitudeNoteProps) {
  return (
    <div className={`
      bg-gradient-to-br from-lavender/10 to-peach/10 
      border border-lavender/30 rounded-2xl p-5 ${className}
    `}>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-lavender to-peach flex items-center justify-center text-white text-xs">
          💝
        </div>
        <div className="flex-1">
          <BilingualText 
            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic"
            as="blockquote"
            sparkleEffect
          >
            "{note}"
          </BilingualText>
          
          {author && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-4 h-px bg-gradient-to-r from-transparent to-lavender" />
              <BilingualText className="text-xs text-lavender font-medium">
                {author}
              </BilingualText>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BilingualText