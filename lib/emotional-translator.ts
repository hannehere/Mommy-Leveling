/**
 * AI Emotional Translator - Core Translation Service
 * Preserves warmth, empathy, and tenderness in English ↔ Vietnamese translations
 * Specifically optimized for motherhood context
 */

export type EmotionalTone = 'joy' | 'sadness' | 'reflection' | 'motivation' | 'comfort' | 'celebration' | 'healing' | 'neutral'
export type Language = 'en' | 'vi'
export type TranslationMode = 'warm-gentle' | 'neutral' | 'creative-reflection'

export interface EmotionalContext {
  tone: EmotionalTone
  intensity: number // 0-1 scale
  keywords: string[]
  isParentingRelated: boolean
  requiresNurturing: boolean
}

export interface TranslationResult {
  originalText: string
  translatedText: string
  sourceLang: Language
  targetLang: Language
  emotionalContext: EmotionalContext
  confidence: number
  preservedEmojis: string[]
  mode: TranslationMode
}

/**
 * Emotional vocabulary mappings for nurturing motherhood context
 */
const EMOTIONAL_MAPPINGS = {
  // Joy & Celebration
  joy: {
    'en-vi': {
      'great job': 'làm tuyệt vời lắm',
      'amazing': 'tuyệt vời',
      'wonderful': 'thật tuyệt',
      'proud of you': 'tự hào về mẹ',
      'you did it': 'mẹ đã làm được rồi',
      'celebrate': 'ăn mừng',
      'achievement': 'thành tựu của mẹ',
      'victory': 'chiến thắng',
      'success': 'thành công'
    },
    'vi-en': {
      'tuyệt vời': 'wonderful',
      'làm tốt lắm': 'you did great',
      'giỏi quá': 'amazing',
      'thành công': 'beautiful success',
      'ăn mừng': 'celebrate with joy'
    }
  },

  // Comfort & Healing
  comfort: {
    'en-vi': {
      'it\'s okay': 'không sao đâu',
      'you\'re safe': 'mẹ an toàn rồi',
      'breathe': 'hít thở nhẹ nhàng',
      'rest': 'nghỉ ngơi',
      'take care': 'chăm sóc bản thân',
      'be gentle': 'hãy dịu dàng với chính mình',
      'you matter': 'mẹ rất quan trọng',
      'healing': 'chữa lành',
      'peace': 'bình yên',
      'safe space': 'không gian an toàn'
    },
    'vi-en': {
      'không sao': 'it\'s perfectly okay',
      'bình yên': 'peaceful and safe',
      'chữa lành': 'gentle healing',
      'nghỉ ngơi': 'restorative rest',
      'an toàn': 'safe and protected'
    }
  },

  // Motivation & Encouragement
  motivation: {
    'en-vi': {
      'keep going': 'tiếp tục nhé',
      'you can do this': 'mẹ làm được mà',
      'believe in yourself': 'hãy tin vào chính mình',
      'strong': 'mạnh mẽ',
      'brave': 'dũng cảm',
      'resilient': 'kiên cường',
      'warrior': 'chiến binh',
      'hero': 'người hùng',
      'champion': 'nhà vô địch'
    },
    'vi-en': {
      'mạnh mẽ': 'beautifully strong',
      'dũng cảm': 'courageously brave',
      'kiên cường': 'resilient and powerful',
      'chiến thắng': 'triumphant victory'
    }
  },

  // Reflection & Gratitude
  reflection: {
    'en-vi': {
      'grateful': 'biết ơn',
      'thankful': 'cảm kích',
      'blessed': 'may mắn',
      'mindful': 'tỉnh thức',
      'present': 'hiện tại',
      'journey': 'hành trình',
      'growth': 'trưởng thành',
      'wisdom': 'sự khôn ngoan',
      'reflection': 'suy ngẫm'
    },
    'vi-en': {
      'biết ơn': 'deeply grateful',
      'cảm kích': 'heartfully thankful',
      'hành trình': 'meaningful journey',
      'trưởng thành': 'beautiful growth'
    }
  }
}

/**
 * Tone detection patterns for emotional analysis
 */
const TONE_PATTERNS = {
  joy: [
    /\b(amazing|wonderful|great|fantastic|beautiful|lovely|happy|excited|celebration|success|proud)\b/i,
    /[🎉🎊✨💫⭐🌟🎈🎁🏆]/,
    /(!{1,3})/
  ],
  
  sadness: [
    /\b(sad|crying|tears|difficult|hard|struggle|overwhelmed|exhausted|tired)\b/i,
    /[😢😭💔😞😔]/,
    /(\.\.\.|…)/
  ],
  
  comfort: [
    /\b(okay|safe|gentle|soft|calm|peace|breathe|rest|comfort|warm|hug)\b/i,
    /[🤗💙💚🌿🕊️☮️]/,
    /\b(it's okay|you're safe|take care|be gentle)\b/i
  ],
  
  motivation: [
    /\b(strong|brave|warrior|hero|champion|believe|can do|keep going|don't give up)\b/i,
    /[💪🔥⚡🦋🌟]/,
    /\b(you can|believe in|keep going|never give up)\b/i
  ],
  
  reflection: [
    /\b(grateful|thankful|blessed|journey|growth|wisdom|mindful|reflection)\b/i,
    /[🙏✨💭🌸🌿]/,
    /\b(looking back|thinking about|grateful for)\b/i
  ],
  
  healing: [
    /\b(healing|recovery|gentle|tender|nurturing|caring|love yourself)\b/i,
    /[💚🌿🕊️💙]/,
    /\b(heal|recover|be kind to yourself)\b/i
  ]
}

/**
 * Detect emotional tone and context from text
 */
export function detectEmotionalContext(text: string): EmotionalContext {
  const normalizedText = text.toLowerCase()
  const toneScores: Record<EmotionalTone, number> = {
    joy: 0,
    sadness: 0,
    reflection: 0,
    motivation: 0,
    comfort: 0,
    celebration: 0,
    healing: 0,
    neutral: 0
  }

  // Analyze patterns for each tone
  Object.entries(TONE_PATTERNS).forEach(([tone, patterns]) => {
    patterns.forEach(pattern => {
      const matches = text.match(pattern)
      if (matches) {
        toneScores[tone as EmotionalTone] += matches.length
      }
    })
  })

  // Find dominant tone
  const dominantTone = Object.entries(toneScores).reduce((a, b) => 
    toneScores[a[0] as EmotionalTone] > toneScores[b[0] as EmotionalTone] ? a : b
  )[0] as EmotionalTone

  // Calculate intensity
  const totalScore = Object.values(toneScores).reduce((sum, score) => sum + score, 0)
  const intensity = totalScore > 0 ? Math.min(toneScores[dominantTone] / totalScore, 1) : 0

  // Extract keywords
  const keywords: string[] = []
  Object.values(EMOTIONAL_MAPPINGS).forEach(mapping => {
    Object.values(mapping).forEach(translations => {
      Object.keys(translations).forEach(key => {
        if (normalizedText.includes(key.toLowerCase())) {
          keywords.push(key)
        }
      })
    })
  })

  // Check if parenting-related
  const parentingKeywords = ['mom', 'mother', 'baby', 'child', 'parenting', 'mẹ', 'con', 'bé', 'nuôi dạy']
  const isParentingRelated = parentingKeywords.some(keyword => 
    normalizedText.includes(keyword.toLowerCase())
  )

  // Determine if nurturing tone is needed
  const requiresNurturing = ['comfort', 'healing', 'sadness'].includes(dominantTone) || isParentingRelated

  return {
    tone: totalScore > 0 ? dominantTone : 'neutral',
    intensity,
    keywords,
    isParentingRelated,
    requiresNurturing
  }
}

/**
 * Apply emotional mappings to translation
 */
function applyEmotionalMapping(
  text: string, 
  sourceLang: Language, 
  targetLang: Language, 
  context: EmotionalContext,
  mode: TranslationMode
): string {
  let result = text.toLowerCase()
  const mappingKey = `${sourceLang}-${targetLang}` as const
  
  // Apply tone-specific mappings
  const toneMappings = EMOTIONAL_MAPPINGS[context.tone]
  if (toneMappings && toneMappings[mappingKey]) {
    const translations = toneMappings[mappingKey]
    Object.entries(translations).forEach(([source, target]) => {
      const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      result = result.replace(regex, target)
    })
  }

  // Apply mode-specific adjustments
  if (mode === 'warm-gentle') {
    result = addWarmthToTranslation(result, targetLang, context)
  } else if (mode === 'creative-reflection') {
    result = addCreativeTouch(result, targetLang, context)
  }

  return result
}

/**
 * Add warmth and gentleness to translation
 */
function addWarmthToTranslation(text: string, lang: Language, context: EmotionalContext): string {
  if (lang === 'vi') {
    // Add Vietnamese warmth markers
    if (context.requiresNurturing) {
      text = text.replace(/\bmẹ\b/g, 'mẹ yêu')
      text = text.replace(/\bcon\b/g, 'con yêu')
    }
    
    // Soften imperatives
    text = text.replace(/\bhãy\b/g, 'hãy nhẹ nhàng')
    text = text.replace(/\bphải\b/g, 'nên')
    
  } else {
    // Add English warmth
    if (context.requiresNurturing) {
      text = text.replace(/\byou\b/g, 'dear')
      text = text.replace(/\bshould\b/g, 'might want to')
    }
  }
  
  return text
}

/**
 * Add creative and reflective elements
 */
function addCreativeTouch(text: string, lang: Language, context: EmotionalContext): string {
  if (context.tone === 'reflection') {
    if (lang === 'vi') {
      text = `✨ ${text} ✨`
    } else {
      text = `💭 ${text} 💫`
    }
  }
  
  return text
}

/**
 * Extract and preserve emojis from text
 */
function extractEmojis(text: string): string[] {
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu
  return text.match(emojiRegex) || []
}

/**
 * Main translation function with emotional preservation
 */
export async function translateWithEmotion(
  text: string,
  sourceLang: Language,
  targetLang: Language,
  mode: TranslationMode = 'warm-gentle'
): Promise<TranslationResult> {
  
  // Detect emotional context
  const emotionalContext = detectEmotionalContext(text)
  
  // Extract emojis to preserve them
  const preservedEmojis = extractEmojis(text)
  
  // Apply emotional mapping
  let translatedText = applyEmotionalMapping(text, sourceLang, targetLang, emotionalContext, mode)
  
  // For demo purposes, we'll use a simplified translation
  // In production, this would integrate with a proper translation API
  if (!translatedText || translatedText === text.toLowerCase()) {
    translatedText = await fallbackTranslation(text, sourceLang, targetLang, emotionalContext)
  }
  
  // Restore original casing and emojis
  translatedText = restoreFormatting(translatedText, text, preservedEmojis)
  
  return {
    originalText: text,
    translatedText,
    sourceLang,
    targetLang,
    emotionalContext,
    confidence: emotionalContext.intensity,
    preservedEmojis,
    mode
  }
}

/**
 * Fallback translation with emotional context
 */
async function fallbackTranslation(
  text: string, 
  sourceLang: Language, 
  targetLang: Language, 
  context: EmotionalContext
): Promise<string> {
  // This would integrate with translation APIs like Google Translate, DeepL, etc.
  // For now, return enhanced version with emotional context
  
  const commonTranslations = {
    'en-vi': {
      'Hello': 'Xin chào',
      'Thank you': 'Cảm ơn mẹ',
      'Good job': 'Làm tốt lắm',
      'You are amazing': 'Mẹ thật tuyệt vời',
      'Take care': 'Chăm sóc bản thân nhé',
      'Rest well': 'Nghỉ ngơi thật tốt',
      'I love you': 'Yêu mẹ nhiều lắm'
    },
    'vi-en': {
      'Xin chào': 'Hello dear',
      'Cảm ơn': 'Thank you so much',
      'Tốt lắm': 'Wonderful',
      'Tuyệt vời': 'Amazing',
      'Nghỉ ngơi': 'Rest peacefully',
      'Yêu': 'Love dearly'
    }
  }
  
  const mappingKey = `${sourceLang}-${targetLang}` as keyof typeof commonTranslations
  const translations = commonTranslations[mappingKey]
  
  if (translations) {
    for (const [source, target] of Object.entries(translations)) {
      if (text.toLowerCase().includes(source.toLowerCase())) {
        return target
      }
    }
  }
  
  // Return original with emotional enhancement
  return context.requiresNurturing ? `💕 ${text} 💕` : text
}

/**
 * Restore original formatting and emojis
 */
function restoreFormatting(translatedText: string, originalText: string, emojis: string[]): string {
  let result = translatedText
  
  // Restore capitalization pattern
  if (originalText[0] && originalText[0] === originalText[0].toUpperCase()) {
    result = result.charAt(0).toUpperCase() + result.slice(1)
  }
  
  // Add back emojis if they were lost
  emojis.forEach(emoji => {
    if (!result.includes(emoji)) {
      result += ` ${emoji}`
    }
  })
  
  return result
}

/**
 * Validate translation quality and emotional preservation
 */
export function validateEmotionalTranslation(result: TranslationResult): {
  passed: boolean
  score: number
  feedback: string
} {
  let score = 0
  const feedback: string[] = []
  
  // Check emoji preservation
  if (result.preservedEmojis.length > 0) {
    const emojisInTranslation = extractEmojis(result.translatedText).length
    if (emojisInTranslation >= result.preservedEmojis.length) {
      score += 20
      feedback.push('✅ Emojis preserved')
    } else {
      feedback.push('⚠️ Some emojis lost')
    }
  }
  
  // Check emotional context
  if (result.emotionalContext.tone !== 'neutral') {
    score += 30
    feedback.push(`✅ Emotional tone detected: ${result.emotionalContext.tone}`)
  }
  
  // Check length reasonableness
  const lengthRatio = result.translatedText.length / result.originalText.length
  if (lengthRatio > 0.5 && lengthRatio < 2) {
    score += 25
    feedback.push('✅ Translation length appropriate')
  }
  
  // Check nurturing elements for parenting content
  if (result.emotionalContext.isParentingRelated) {
    const hasNurturingWords = /\b(mẹ yêu|con yêu|dear|gently|softly)\b/i.test(result.translatedText)
    if (hasNurturingWords) {
      score += 25
      feedback.push('✅ Nurturing tone applied')
    } else {
      feedback.push('⚠️ Consider adding more nurturing language')
    }
  }
  
  return {
    passed: score >= 70,
    score,
    feedback: feedback.join(' | ')
  }
}