/**
 * AI Tone Filter Context & Hooks
 * Provides tone filtering across the entire application
 */

'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { 
  applyToneFilter, 
  detectEmotionalIntent,
  applyVietnameseToneFilter,
  type ToneMode, 
  type Context as ToneContext, 
  type SpeakerRelation,
  type ToneFilterResult,
  type ToneFilterContext,
  TONE_MODES
} from '@/lib/ai-tone-filter'

interface ToneFilterContextType {
  currentToneMode: ToneMode
  isFilterEnabled: boolean
  userPreferences: {
    softness: number
    encouragement: number
    formality: number
  }
  
  // Core functions
  setToneMode: (mode: ToneMode) => void
  toggleFilter: () => void
  updatePreferences: (prefs: Partial<ToneFilterContextType['userPreferences']>) => void
  filterText: (text: string, context: ToneContext, relation?: SpeakerRelation) => Promise<ToneFilterResult>
  
  // UI state
  isTransitioning: boolean
  lastFilterResult: ToneFilterResult | null
  
  // Testing
  runHugTest: (text: string) => Promise<{ passed: boolean; score: number; feedback: string }>
  getSentimentScore: (text: string) => Promise<number>
}

const ToneFilterContext = createContext<ToneFilterContextType | null>(null)

interface ToneFilterProviderProps {
  children: React.ReactNode
  defaultMode?: ToneMode
  enableByDefault?: boolean
}

export function ToneFilterProvider({ 
  children, 
  defaultMode = 'soothing',
  enableByDefault = true 
}: ToneFilterProviderProps) {
  const [currentToneMode, setCurrentToneMode] = useState<ToneMode>(defaultMode)
  const [isFilterEnabled, setIsFilterEnabled] = useState(enableByDefault)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastFilterResult, setLastFilterResult] = useState<ToneFilterResult | null>(null)
  const [userPreferences, setUserPreferences] = useState({
    softness: 0.8,
    encouragement: 0.7,
    formality: 0.3
  })

  // Load settings from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('mommy-leveling-tone-mode') as ToneMode
    const savedEnabled = localStorage.getItem('mommy-leveling-tone-enabled') === 'true'
    const savedPrefs = localStorage.getItem('mommy-leveling-tone-preferences')
    
    if (savedMode && TONE_MODES[savedMode]) setCurrentToneMode(savedMode)
    setIsFilterEnabled(savedEnabled !== null ? savedEnabled : enableByDefault)
    
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs)
        setUserPreferences((prev: any) => ({ ...prev, ...prefs }))
      } catch (e) {
        console.warn('Failed to load tone preferences')
      }
    }
  }, [enableByDefault])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('mommy-leveling-tone-mode', currentToneMode)
  }, [currentToneMode])

  useEffect(() => {
    localStorage.setItem('mommy-leveling-tone-enabled', isFilterEnabled.toString())
  }, [isFilterEnabled])

  useEffect(() => {
    localStorage.setItem('mommy-leveling-tone-preferences', JSON.stringify(userPreferences))
  }, [userPreferences])

  const setToneMode = useCallback((mode: ToneMode) => {
    setIsTransitioning(true)
    setCurrentToneMode(mode)
    
    // Add visual transition effect
    document.body.classList.add('tone-transitioning')
    setTimeout(() => {
      document.body.classList.remove('tone-transitioning')
      setIsTransitioning(false)
    }, 800)
  }, [])

  const toggleFilter = useCallback(() => {
    setIsFilterEnabled((prev: boolean) => !prev)
  }, [])

  const updatePreferences = useCallback((prefs: Partial<ToneFilterContextType['userPreferences']>) => {
    setUserPreferences((prev: any) => ({ ...prev, ...prefs }))
  }, [])

  const filterText = useCallback(async (
    text: string, 
    context: ToneContext, 
    relation: SpeakerRelation = 'system-to-mom'
  ): Promise<ToneFilterResult> => {
    if (!isFilterEnabled) {
      return {
        originalText: text,
        filteredText: text,
        transformations: [],
        sentimentScore: 0.5,
        hugScore: 0.3,
        emotionalResonance: 0.4,
        appliedPatterns: [],
        mode: currentToneMode
      }
    }

    const emotionalIntent = detectEmotionalIntent(text, context)
    
    const filterContext: ToneFilterContext = {
      mode: currentToneMode,
      context,
      relation,
      emotionalIntent,
      language: 'en', // Will be detected/passed from translation context
      userPreferences
    }

    const result = applyToneFilter(text, filterContext)
    setLastFilterResult(result)
    
    return result
  }, [currentToneMode, isFilterEnabled, userPreferences])

  const runHugTest = useCallback(async (text: string) => {
    const result = await filterText(text, 'wellness', 'system-to-mom')
    const passed = result.hugScore >= 0.7 && result.sentimentScore >= 0.85
    
    const feedback = []
    if (result.hugScore >= 0.8) feedback.push('✅ Feels like a warm hug')
    else if (result.hugScore >= 0.6) feedback.push('💛 Somewhat comforting')
    else feedback.push('⚠️ Could be more nurturing')
    
    if (result.sentimentScore >= 0.9) feedback.push('✅ Beautifully positive')
    else if (result.sentimentScore >= 0.8) feedback.push('💚 Good emotional tone')
    else feedback.push('⚠️ Needs more warmth')
    
    return {
      passed,
      score: (result.hugScore + result.sentimentScore) / 2,
      feedback: feedback.join(' | ')
    }
  }, [filterText])

  const getSentimentScore = useCallback(async (text: string) => {
    const result = await filterText(text, 'dashboard')
    return result.sentimentScore
  }, [filterText])

  const contextValue = React.useMemo(() => ({
    currentToneMode,
    isFilterEnabled,
    userPreferences,
    setToneMode,
    toggleFilter,
    updatePreferences,
    filterText,
    isTransitioning,
    lastFilterResult,
    runHugTest,
    getSentimentScore
  }), [
    currentToneMode,
    isFilterEnabled,
    userPreferences,
    setToneMode,
    toggleFilter,
    updatePreferences,
    filterText,
    isTransitioning,
    lastFilterResult,
    runHugTest,
    getSentimentScore
  ])

  return React.createElement(
    ToneFilterContext.Provider,
    { value: contextValue },
    children
  )
}

export function useToneFilter() {
  const context = useContext(ToneFilterContext)
  if (!context) {
    throw new Error('useToneFilter must be used within ToneFilterProvider')
  }
  return context
}

/**
 * Hook for automatically filtering text content
 */
export function useFilteredText(
  text: string, 
  context: ToneContext = 'dashboard',
  relation: SpeakerRelation = 'system-to-mom'
) {
  const { filterText, isFilterEnabled, currentToneMode } = useToneFilter()
  const [filteredText, setFilteredText] = useState(text)
  const [isFiltering, setIsFiltering] = useState(false)
  const textRef = useRef(text)

  useEffect(() => {
    if (textRef.current === text && filteredText !== text) return
    textRef.current = text

    if (!text.trim()) {
      setFilteredText(text)
      return
    }

    setIsFiltering(true)
    
    const applyFilter = async () => {
      try {
        const result = await filterText(text, context, relation)
        setFilteredText(result.filteredText)
      } catch (error) {
        console.error('Tone filtering error:', error)
        setFilteredText(text)
      } finally {
        setIsFiltering(false)
      }
    }

    const debounceTimeout = setTimeout(applyFilter, 100)
    return () => clearTimeout(debounceTimeout)
  }, [text, filterText, context, relation, currentToneMode, isFilterEnabled])

  return {
    filteredText,
    isFiltering,
    originalText: text
  }
}

/**
 * Hook for tone mode information
 */
export function useToneModeInfo(mode?: ToneMode) {
  const { currentToneMode } = useToneFilter()
  const targetMode = mode || currentToneMode
  
  return {
    mode: targetMode,
    info: TONE_MODES[targetMode as keyof typeof TONE_MODES],
    isActive: targetMode === currentToneMode
  }
}

/**
 * Hook for Vietnamese text filtering
 */
export function useVietnameseFilter(text: string) {
  const { currentToneMode, isFilterEnabled } = useToneFilter()
  const [filteredText, setFilteredText] = useState(text)

  useEffect(() => {
    if (!isFilterEnabled || !text.trim()) {
      setFilteredText(text)
      return
    }

    const filtered = applyVietnameseToneFilter(text, currentToneMode)
    setFilteredText(filtered)
  }, [text, currentToneMode, isFilterEnabled])

  return filteredText
}

/**
 * Hook for real-time sentiment monitoring
 */
export function useSentimentMonitor(text: string) {
  const { getSentimentScore } = useToneFilter()
  const [sentiment, setSentiment] = useState(0.5)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    
    const analyzeSentiment = async () => {
      try {
        const score = await getSentimentScore(text)
        setSentiment(score)
      } finally {
        setIsAnalyzing(false)
      }
    }

    const debounceTimeout = setTimeout(analyzeSentiment, 300)
    return () => clearTimeout(debounceTimeout)
  }, [text, getSentimentScore])

  const getSentimentEmoji = () => {
    if (sentiment >= 0.9) return '🌟'
    if (sentiment >= 0.8) return '💕'
    if (sentiment >= 0.7) return '💚'
    if (sentiment >= 0.6) return '💛'
    return '🤍'
  }

  const getSentimentLabel = () => {
    if (sentiment >= 0.9) return 'Beautifully warm'
    if (sentiment >= 0.8) return 'Comforting'
    if (sentiment >= 0.7) return 'Gentle'
    if (sentiment >= 0.6) return 'Neutral+'
    return 'Could be warmer'
  }

  return {
    sentiment,
    isAnalyzing,
    emoji: getSentimentEmoji(),
    label: getSentimentLabel(),
    isPositive: sentiment >= 0.7
  }
}