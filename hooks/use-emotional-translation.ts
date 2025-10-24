/**
 * Emotional Translation Context & Hooks
 * Provides seamless language switching with emotional preservation
 */

'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { 
  translateWithEmotion, 
  validateEmotionalTranslation,
  type Language, 
  type TranslationMode, 
  type TranslationResult,
  type EmotionalTone
} from '@/lib/emotional-translator'

interface EmotionalTranslationContextType {
  currentLanguage: Language
  translationMode: TranslationMode
  isTranslating: boolean
  bilingualMode: boolean
  
  // Core functions
  switchLanguage: (lang: Language) => void
  setTranslationMode: (mode: TranslationMode) => void
  toggleBilingualMode: () => void
  translateText: (text: string, targetLang?: Language) => Promise<TranslationResult>
  
  // UI state
  showTranslationTooltip: boolean
  setShowTranslationTooltip: (show: boolean) => void
  lastTranslation: TranslationResult | null
  
  // Comfort test
  runComfortTest: (text: string) => Promise<{ passed: boolean; score: number; feedback: string }>
}

const EmotionalTranslationContext = createContext<EmotionalTranslationContextType | null>(null)

interface EmotionalTranslationProviderProps {
  children: React.ReactNode
  defaultLanguage?: Language
  defaultMode?: TranslationMode
}

export function EmotionalTranslationProvider({ 
  children, 
  defaultLanguage = 'en',
  defaultMode = 'warm-gentle' 
}: EmotionalTranslationProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage)
  const [translationMode, setTranslationModeState] = useState<TranslationMode>(defaultMode)
  const [isTranslating, setIsTranslating] = useState(false)
  const [bilingualMode, setBilingualMode] = useState(false)
  const [showTranslationTooltip, setShowTranslationTooltip] = useState(false)
  const [lastTranslation, setLastTranslation] = useState<TranslationResult | null>(null)

  // Load settings from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('mommy-leveling-language') as Language
    const savedMode = localStorage.getItem('mommy-leveling-translation-mode') as TranslationMode
    const savedBilingual = localStorage.getItem('mommy-leveling-bilingual-mode') === 'true'
    
    if (savedLanguage) setCurrentLanguage(savedLanguage)
    if (savedMode) setTranslationModeState(savedMode)
    setBilingualMode(savedBilingual)
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('mommy-leveling-language', currentLanguage)
  }, [currentLanguage])

  useEffect(() => {
    localStorage.setItem('mommy-leveling-translation-mode', translationMode)
  }, [translationMode])

  useEffect(() => {
    localStorage.setItem('mommy-leveling-bilingual-mode', bilingualMode.toString())
  }, [bilingualMode])

  const switchLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
    // Trigger heartbeat pulse animation
    document.body.classList.add('language-switching')
    setTimeout(() => {
      document.body.classList.remove('language-switching')
    }, 600)
  }, [])

  const setTranslationMode = useCallback((mode: TranslationMode) => {
    setTranslationModeState(mode)
  }, [])

  const toggleBilingualMode = useCallback(() => {
    setBilingualMode((prev: boolean) => !prev)
  }, [])

  const translateText = useCallback(async (
    text: string, 
    targetLang?: Language
  ): Promise<TranslationResult> => {
    setIsTranslating(true)
    
    try {
      const sourceLang = currentLanguage
      const target = targetLang || (currentLanguage === 'en' ? 'vi' : 'en')
      
      const result = await translateWithEmotion(text, sourceLang, target, translationMode)
      setLastTranslation(result)
      
      return result
    } finally {
      setIsTranslating(false)
    }
  }, [currentLanguage, translationMode])

  const runComfortTest = useCallback(async (text: string) => {
    const result = await translateText(text)
    return validateEmotionalTranslation(result)
  }, [translateText])

  const contextValue: EmotionalTranslationContextType = {
    currentLanguage,
    translationMode,
    isTranslating,
    bilingualMode,
    switchLanguage,
    setTranslationMode,
    toggleBilingualMode,
    translateText,
    showTranslationTooltip,
    setShowTranslationTooltip,
    lastTranslation,
    runComfortTest
  }

  return (
    <EmotionalTranslationContext.Provider value={contextValue}>
      {children}
    </EmotionalTranslationContext.Provider>
  )
}

export function useEmotionalTranslation() {
  const context = useContext(EmotionalTranslationContext)
  if (!context) {
    throw new Error('useEmotionalTranslation must be used within EmotionalTranslationProvider')
  }
  return context
}

/**
 * Hook for translating text with emotional preservation
 */
export function useTranslateText() {
  const { translateText, currentLanguage, bilingualMode } = useEmotionalTranslation()
  
  return useCallback(async (text: string, options?: {
    targetLang?: Language
    showOriginal?: boolean
  }) => {
    const result = await translateText(text, options?.targetLang)
    
    if (bilingualMode || options?.showOriginal) {
      return {
        ...result,
        displayText: `${result.originalText} | ${result.translatedText}`
      }
    }
    
    return {
      ...result,
      displayText: result.translatedText
    }
  }, [translateText, currentLanguage, bilingualMode])
}

/**
 * Hook for automatic UI text translation
 */
export function useUITranslation() {
  const { currentLanguage, translateText } = useEmotionalTranslation()
  const [translations, setTranslations] = useState<Map<string, string>>(new Map())

  const t = useCallback((key: string, fallback?: string) => {
    const cached = translations.get(key)
    if (cached) return cached

    // For demo, return fallback or key
    return fallback || key
  }, [translations])

  const loadTranslations = useCallback(async (texts: Record<string, string>) => {
    const newTranslations = new Map(translations)
    
    for (const [key, text] of Object.entries(texts)) {
      if (!newTranslations.has(key)) {
        const result = await translateText(text)
        newTranslations.set(key, result.translatedText)
      }
    }
    
    setTranslations(newTranslations)
  }, [translateText, translations])

  return { t, loadTranslations, currentLanguage }
}

/**
 * Hook for emotional tone analysis
 */
export function useEmotionalTone(text: string) {
  const [tone, setTone] = useState<EmotionalTone>('neutral')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const { translateText } = useEmotionalTranslation()

  useEffect(() => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis (in real implementation, this would be more sophisticated)
    const analyzeEmotionalTone = async () => {
      try {
        const result = await translateText(text, 'en') // Analyze in English for consistency
        setTone(result.emotionalContext.tone)
      } finally {
        setIsAnalyzing(false)
      }
    }

    const debounceTimeout = setTimeout(analyzeEmotionalTone, 300)
    return () => clearTimeout(debounceTimeout)
  }, [text, translateText])

  return { tone, isAnalyzing }
}