/**
 * Tone-Filtered Text Components
 * Beautiful text display with AI tone filtering and shimmer animations
 */

'use client'

import React, { useState, useEffect } from 'react'
import { useFilteredText, useToneFilter, useSentimentMonitor, useToneModeInfo } from '@/hooks/use-tone-filter'
import { type ToneMode, type Context as ToneContext, type SpeakerRelation, TONE_MODES } from '@/lib/ai-tone-filter'
import { Sparkles, Heart, Sun, Leaf, Zap, Loader2 } from 'lucide-react'

interface ToneFilteredTextProps {
  children: string
  context?: ToneContext
  relation?: SpeakerRelation
  className?: string
  showShimmer?: boolean
  showSentimentIndicator?: boolean
  as?: keyof JSX.IntrinsicElements
  animate?: boolean
}

export function ToneFilteredText({ 
  children, 
  context = 'dashboard',
  relation = 'system-to-mom',
  className = '',
  showShimmer = true,
  showSentimentIndicator = false,
  as: Component = 'span',
  animate = true
}: ToneFilteredTextProps) {
  const { filteredText, isFiltering, originalText } = useFilteredText(children, context, relation)
  const { sentiment, emoji, isPositive } = useSentimentMonitor(filteredText)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Gentle fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [filteredText])

  const combinedClassName = `
    ${className}
    ${animate ? 'transition-all duration-500 ease-out' : ''}
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
    ${showShimmer && isFiltering ? 'animate-shimmer' : ''}
    ${isPositive ? 'tone-positive' : ''}
    tone-filtered-text
  `.trim()

  return (
    <Component className={combinedClassName}>
      {isFiltering && (
        <Loader2 className="inline w-3 h-3 mr-1 animate-spin text-peach opacity-60" />
      )}
      {filteredText}
      {showSentimentIndicator && !isFiltering && (
        <span className="ml-1 text-xs opacity-60" title={`Sentiment: ${Math.round(sentiment * 100)}%`}>
          {emoji}
        </span>
      )}
    </Component>
  )
}

interface ToneModeIndicatorProps {
  mode?: ToneMode
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ToneModeIndicator({ 
  mode, 
  size = 'md', 
  showLabel = false,
  className = ''
}: ToneModeIndicatorProps) {
  const { mode: currentMode, info, isActive } = useToneModeInfo(mode)
  
  const getModeIcon = (mode: ToneMode) => {
    switch (mode) {
      case 'soothing': return <Leaf className="w-full h-full" />
      case 'hopeful': return <Sun className="w-full h-full" />
      case 'healing': return <Heart className="w-full h-full" />
      case 'joyful': return <Sparkles className="w-full h-full" />
      case 'gentle-encouragement': return <Zap className="w-full h-full" />
      default: return <Leaf className="w-full h-full" />
    }
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        ${isActive 
          ? 'bg-gradient-to-br from-peach/30 to-lavender/30 text-peach animate-gentle-bounce' 
          : 'bg-gray-100 text-gray-400'
        }
      `}>
        {getModeIcon(currentMode)}
      </div>
      
      {showLabel && (
        <div className="flex items-center gap-1">
          <span className={`${textSizeClasses[size]} font-medium`}>
            {info.emoji}
          </span>
          <span className={`${textSizeClasses[size]} text-gray-600`}>
            {info.name.en}
          </span>
        </div>
      )}
    </div>
  )
}

interface NotificationWithToneProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'celebration'
  className?: string
  autoHide?: boolean
  duration?: number
}

export function NotificationWithTone({ 
  message, 
  type = 'info',
  className = '',
  autoHide = true,
  duration = 5000
}: NotificationWithToneProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => setIsVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [autoHide, duration])

  if (!isVisible) return null

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-mint/20 to-baby-blue/20 border-mint/40 text-mint'
      case 'celebration':
        return 'bg-gradient-to-r from-peach/20 to-lavender/20 border-peach/40 text-peach animate-gentle-bounce'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 text-yellow-700'
      default:
        return 'bg-gradient-to-r from-lavender/10 to-peach/10 border-lavender/30 text-lavender'
    }
  }

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border p-4 mb-4 
      animate-warm-appear ${getTypeStyles(type)} ${className}
    `}>
      <div className="flex items-start gap-3">
        <ToneModeIndicator size="sm" />
        <ToneFilteredText
          context="notification"
          className="flex-1 text-sm leading-relaxed"
          showShimmer
          animate
        >
          {message}
        </ToneFilteredText>
      </div>
      
      {/* Subtle shimmer background for emotional tuning */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
    </div>
  )
}

interface JournalPromptWithToneProps {
  prompt: string
  category?: string
  className?: string
}

export function JournalPromptWithTone({ 
  prompt, 
  category,
  className = ''
}: JournalPromptWithToneProps) {
  return (
    <div className={`
      bg-gradient-to-br from-lavender/5 to-peach/5 
      border border-lavender/20 rounded-2xl p-6 ${className}
    `}>
      {category && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-lavender rounded-full" />
          <ToneFilteredText 
            context="journal"
            className="text-xs font-medium text-lavender uppercase tracking-wide"
          >
            {category}
          </ToneFilteredText>
        </div>
      )}
      
      <ToneFilteredText
        context="journal"
        className="text-base text-gray-700 leading-relaxed"
        showShimmer
        showSentimentIndicator
        as="p"
      >
        {prompt}
      </ToneFilteredText>
      
      <div className="mt-4 flex items-center justify-between">
        <ToneModeIndicator size="sm" showLabel />
        <div className="w-16 h-1 bg-gradient-to-r from-lavender/30 to-peach/30 rounded-full" />
      </div>
    </div>
  )
}

interface CommunityMessageWithToneProps {
  message: string
  author?: string
  timestamp?: string
  relation?: SpeakerRelation
  className?: string
}

export function CommunityMessageWithTone({ 
  message, 
  author,
  timestamp,
  relation = 'mom-to-community',
  className = ''
}: CommunityMessageWithToneProps) {
  return (
    <div className={`
      bg-white dark:bg-slate-800 rounded-2xl border border-mint/20 
      p-4 shadow-sm hover:shadow-md transition-shadow ${className}
    `}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint/30 to-baby-blue/30 flex items-center justify-center">
          <Heart className="w-4 h-4 text-mint" />
        </div>
        
        <div className="flex-1 min-w-0">
          <ToneFilteredText
            context="community"
            relation={relation}
            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
            showShimmer
          >
            {message}
          </ToneFilteredText>
          
          {(author || timestamp) && (
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
              {author && (
                <ToneFilteredText 
                  context="community"
                  className="font-medium"
                >
                  {author}
                </ToneFilteredText>
              )}
              {timestamp && <span>{timestamp}</span>}
              <ToneModeIndicator size="sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface WellnessMessageWithToneProps {
  title: string
  message: string
  icon?: string
  className?: string
}

export function WellnessMessageWithTone({ 
  title, 
  message, 
  icon = '🌿',
  className = ''
}: WellnessMessageWithToneProps) {
  return (
    <div className={`
      bg-gradient-to-br from-mint/10 to-baby-blue/10 
      border border-mint/30 rounded-2xl p-6 ${className}
    `}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint to-baby-blue flex items-center justify-center text-white text-xl">
          {icon}
        </div>
        
        <div className="flex-1">
          <ToneFilteredText
            context="wellness"
            className="text-lg font-semibold text-gray-800 mb-2"
            as="h3"
          >
            {title}
          </ToneFilteredText>
          
          <ToneFilteredText
            context="wellness"
            className="text-gray-600 leading-relaxed"
            showShimmer
            showSentimentIndicator
            as="p"
          >
            {message}
          </ToneFilteredText>
          
          <div className="mt-4 flex items-center justify-between">
            <ToneModeIndicator size="sm" showLabel />
            <div className="text-xs text-mint font-medium">Wellness Moment</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToneFilteredText