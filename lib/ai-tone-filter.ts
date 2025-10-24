/**
 * AI Tone Filter System - Core Engine
 * Final emotional layer that refines all text before display
 * Transforms neutral text into emotionally warm, encouraging language
 */

export type ToneMode = 'soothing' | 'hopeful' | 'healing' | 'joyful' | 'gentle-encouragement'
export type Context = 'dashboard' | 'wellness' | 'journal' | 'community' | 'notification' | 'mission' | 'achievement'
export type SpeakerRelation = 'system-to-mom' | 'mom-to-system' | 'mom-to-community' | 'community-to-mom'

export interface EmotionalIntent {
  primary: 'comforting' | 'hopeful' | 'reflective' | 'proud' | 'healing' | 'celebrating' | 'encouraging'
  intensity: number // 0-1 scale
  urgency: 'gentle' | 'moderate' | 'immediate'
  supportLevel: 'acknowledgment' | 'validation' | 'empowerment' | 'celebration'
}

export interface ToneFilterContext {
  mode: ToneMode
  context: Context
  relation: SpeakerRelation
  emotionalIntent: EmotionalIntent
  language: 'en' | 'vi'
  userPreferences?: {
    softness: number // 0-1, how gentle the tone should be
    encouragement: number // 0-1, how much encouragement to add
    formality: number // 0-1, how formal vs intimate
  }
}

export interface ToneFilterResult {
  originalText: string
  filteredText: string
  transformations: string[]
  sentimentScore: number // 0-1, target ≥0.85
  hugScore: number // 0-1, does it feel like a hug?
  emotionalResonance: number // 0-1, emotional connection strength
  appliedPatterns: string[]
  mode: ToneMode
}

/**
 * Tone Mode Definitions with emotional characteristics
 */
export const TONE_MODES = {
  'soothing': {
    name: { en: 'Gentle Default', vi: 'Dịu dàng (mặc định)' },
    emoji: '🌿',
    characteristics: {
      pace: 'slow',
      warmth: 0.9,
      softness: 0.95,
      encouragement: 0.7,
      intimacy: 0.8
    },
    patterns: ['pause-and-breathe', 'its-okay', 'gentle-guidance', 'soft-validation']
  },
  
  'hopeful': {
    name: { en: 'Tomorrow\'s Light', vi: 'Ánh sáng ngày mai' },
    emoji: '🌅',
    characteristics: {
      pace: 'moderate',
      warmth: 0.8,
      softness: 0.7,
      encouragement: 0.9,
      intimacy: 0.6
    },
    patterns: ['tomorrow-focus', 'possibility-language', 'growth-mindset', 'forward-looking']
  },
  
  'healing': {
    name: { en: 'Healing Whisper', vi: 'Lời thì thầm chữa lành' },
    emoji: '💕',
    characteristics: {
      pace: 'very-slow',
      warmth: 0.95,
      softness: 1.0,
      encouragement: 0.6,
      intimacy: 0.95
    },
    patterns: ['heart-healing', 'gentle-recovery', 'self-compassion', 'inner-strength']
  },
  
  'joyful': {
    name: { en: 'Playful Light', vi: 'Nhẹ nhàng vui tươi' },
    emoji: '☀️',
    characteristics: {
      pace: 'upbeat',
      warmth: 0.8,
      softness: 0.6,
      encouragement: 0.95,
      intimacy: 0.7
    },
    patterns: ['celebration', 'proud-moments', 'bright-energy', 'sparkle-joy']
  },
  
  'gentle-encouragement': {
    name: { en: 'Loving Support', vi: 'Hỗ trợ yêu thương' },
    emoji: '✨',
    characteristics: {
      pace: 'steady',
      warmth: 0.9,
      softness: 0.8,
      encouragement: 0.9,
      intimacy: 0.8
    },
    patterns: ['step-by-step', 'you-can-do-this', 'gentle-push', 'loving-reminder']
  }
} as const

/**
 * Harsh phrase detection and replacement patterns
 */
const HARSH_PATTERNS = {
  'system-commands': {
    patterns: [
      /\b(you must|you should|you need to|don't forget|make sure|remember to)\b/gi,
      /\b(required|necessary|mandatory|important that you)\b/gi,
      /\b(update|complete|finish|submit)\b/gi
    ],
    replacements: {
      'soothing': ['when you\'re ready', 'if you feel like it', 'maybe consider', 'in your own time'],
      'hopeful': ['you might want to', 'when it feels right', 'perhaps', 'when you\'re inspired'],
      'healing': ['if it brings you peace', 'when your heart is ready', 'gently', 'with love'],
      'joyful': ['you could try', 'it might be fun to', 'celebrate by', 'joyfully'],
      'gentle-encouragement': ['you\'re invited to', 'take a moment to', 'lovingly', 'with care']
    }
  },
  
  'robotic-language': {
    patterns: [
      /\b(click here|press button|select option|choose from)\b/gi,
      /\b(error|failed|invalid|incorrect)\b/gi,
      /\b(data|information|details|specifications)\b/gi
    ],
    replacements: {
      'soothing': ['gently tap', 'softly choose', 'something went differently', 'your heart\'s choice'],
      'hopeful': ['discover', 'explore', 'let\'s try again', 'your beautiful details'],
      'healing': ['touch with care', 'choose what feels right', 'it\'s okay, let\'s heal this', 'your story'],
      'joyful': ['playfully tap', 'pick what sparkles', 'oops, let\'s dance through this', 'your wonderful info'],
      'gentle-encouragement': ['lovingly select', 'choose with confidence', 'we\'ll figure this out together', 'your precious details']
    }
  }
}

/**
 * Emotional enhancement patterns for each tone mode
 */
const ENHANCEMENT_PATTERNS = {
  'soothing': {
    prefixes: ['Breathe...', 'Gently...', 'With love...', 'Softly...'],
    suffixes: ['💚', '🌿', '🕊️', '🤱'],
    connectors: ['and that\'s beautiful', 'with tender care', 'in your own gentle way'],
    rhythm: 'slow-breathing' // Longer pauses, shorter sentences
  },
  
  'hopeful': {
    prefixes: ['Tomorrow brings...', 'You\'re growing...', 'Each day...', 'Beautiful possibilities...'],
    suffixes: ['🌅', '🌱', '✨', '🦋'],
    connectors: ['and brighter days await', 'with hope in your heart', 'toward beautiful tomorrows'],
    rhythm: 'forward-flowing' // Future-focused, uplifting pace
  },
  
  'healing': {
    prefixes: ['Your heart knows...', 'Healing happens...', 'With compassion...', 'Gently healing...'],
    suffixes: ['💕', '🌸', '🤍', '🌿'],
    connectors: ['with infinite love', 'as you heal beautifully', 'in your sacred time'],
    rhythm: 'whisper-soft' // Very gentle, intimate pace
  },
  
  'joyful': {
    prefixes: ['Celebrate!', 'How wonderful!', 'Shine bright!', 'Dance with joy!'],
    suffixes: ['🎉', '✨', '💫', '🌟'],
    connectors: ['and that\'s amazing!', 'with sparkling joy', 'in this beautiful moment'],
    rhythm: 'light-bouncy' // Energetic, uplifting rhythm
  },
  
  'gentle-encouragement': {
    prefixes: ['You\'ve got this...', 'Step by step...', 'With love and strength...', 'Believe in yourself...'],
    suffixes: ['💪', '🌟', '💝', '🦋'],
    connectors: ['and you\'re doing beautifully', 'with loving support', 'one gentle step at a time'],
    rhythm: 'steady-support' // Consistent, reassuring pace
  }
}

/**
 * Context-specific tone adjustments
 */
const CONTEXT_ADJUSTMENTS = {
  'dashboard': {
    focus: 'progress-celebration',
    intimacy: 0.7,
    formality: 0.3,
    encouragement: 0.8
  },
  'wellness': {
    focus: 'self-care-gentle',
    intimacy: 0.9,
    formality: 0.2,
    encouragement: 0.6
  },
  'journal': {
    focus: 'reflection-deep',
    intimacy: 0.95,
    formality: 0.1,
    encouragement: 0.5
  },
  'community': {
    focus: 'connection-warm',
    intimacy: 0.6,
    formality: 0.4,
    encouragement: 0.7
  },
  'notification': {
    focus: 'gentle-reminder',
    intimacy: 0.8,
    formality: 0.3,
    encouragement: 0.9
  },
  'mission': {
    focus: 'motivation-soft',
    intimacy: 0.7,
    formality: 0.3,
    encouragement: 0.95
  },
  'achievement': {
    focus: 'celebration-proud',
    intimacy: 0.8,
    formality: 0.2,
    encouragement: 0.9
  }
}

/**
 * Detect emotional intent from text
 */
export function detectEmotionalIntent(text: string, context: Context): EmotionalIntent {
  const normalizedText = text.toLowerCase()
  
  // Pattern matching for different intents
  const intentPatterns = {
    comforting: /\b(rest|tired|difficult|hard|struggle|overwhelming|sad|cry)\b/i,
    hopeful: /\b(tomorrow|future|grow|better|improve|dream|possibility)\b/i,
    reflective: /\b(think|remember|grateful|journey|learn|understand)\b/i,
    proud: /\b(achievement|success|completed|finished|proud|amazing|wonderful)\b/i,
    healing: /\b(heal|recover|peace|calm|breathe|gentle|tender|safe)\b/i,
    celebrating: /\b(celebrate|joy|happy|excited|milestone|victory|accomplished)\b/i,
    encouraging: /\b(try|attempt|goal|challenge|effort|step|progress)\b/i
  }
  
  let dominantIntent: EmotionalIntent['primary'] = 'encouraging'
  let maxScore = 0
  
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    const matches = text.match(pattern)
    const score = matches ? matches.length : 0
    if (score > maxScore) {
      maxScore = score
      dominantIntent = intent as EmotionalIntent['primary']
    }
  }
  
  // Calculate intensity based on emotional markers
  const emotionalMarkers = text.match(/[!?.]{1,3}|[😊😢💕🌟✨]/g) || []
  const intensity = Math.min(emotionalMarkers.length / 3, 1)
  
  // Determine urgency and support level based on context
  const urgency = context === 'notification' ? 'gentle' : 
                  context === 'mission' ? 'moderate' : 'gentle'
  
  const supportLevel = dominantIntent === 'celebrating' ? 'celebration' :
                       dominantIntent === 'proud' ? 'empowerment' :
                       dominantIntent === 'comforting' ? 'validation' : 'acknowledgment'
  
  return {
    primary: dominantIntent,
    intensity,
    urgency,
    supportLevel
  }
}

/**
 * Apply tone filtering to text
 */
export function applyToneFilter(
  text: string, 
  filterContext: ToneFilterContext
): ToneFilterResult {
  const { mode, context, relation, language } = filterContext
  const transformations: string[] = []
  const appliedPatterns: string[] = []
  let filteredText = text
  
  // Step 1: Remove harsh patterns
  for (const [patternName, patternData] of Object.entries(HARSH_PATTERNS)) {
    for (const pattern of patternData.patterns) {
      if (pattern.test(filteredText)) {
        const replacements = patternData.replacements[mode]
        const replacement = replacements[Math.floor(Math.random() * replacements.length)]
        filteredText = filteredText.replace(pattern, replacement)
        transformations.push(`Softened ${patternName}`)
        appliedPatterns.push(patternName)
      }
    }
  }
  
  // Step 2: Apply tone mode enhancements
  const modeData = TONE_MODES[mode]
  const enhancements = ENHANCEMENT_PATTERNS[mode]
  
  // Add emotional connectors for longer text
  if (filteredText.length > 50 && Math.random() < 0.6) {
    const connector = enhancements.connectors[Math.floor(Math.random() * enhancements.connectors.length)]
    filteredText = `${filteredText} ${connector}`
    transformations.push('Added emotional connector')
  }
  
  // Add appropriate emoji based on mode and context
  if (!filteredText.match(/[😊😢💕🌟✨🌿💚🕊️🤱🌅🌱🦋💫🎉🌸🤍💪💝]/)) {
    const emoji = enhancements.suffixes[Math.floor(Math.random() * enhancements.suffixes.length)]
    filteredText = `${filteredText} ${emoji}`
    transformations.push('Added emotional emoji')
  }
  
  // Step 3: Adjust for context
  const contextData = CONTEXT_ADJUSTMENTS[context]
  
  // Make text more intimate for personal contexts
  if (contextData.intimacy > 0.8 && relation === 'system-to-mom') {
    filteredText = filteredText.replace(/\byou\b/g, language === 'vi' ? 'mẹ yêu' : 'dear mama')
    transformations.push('Increased intimacy')
  }
  
  // Step 4: Apply rhythm adjustments
  if (enhancements.rhythm === 'slow-breathing') {
    // Break into shorter, gentler sentences
    filteredText = filteredText.replace(/,\s+/g, '... ')
    transformations.push('Applied breathing rhythm')
  } else if (enhancements.rhythm === 'whisper-soft') {
    // Make it even gentler
    filteredText = filteredText.toLowerCase().replace(filteredText[0], filteredText[0].toUpperCase())
    transformations.push('Applied whisper-soft tone')
  }
  
  // Step 5: Calculate scores
  const sentimentScore = calculateSentimentScore(filteredText, mode)
  const hugScore = calculateHugScore(filteredText, mode)
  const emotionalResonance = calculateEmotionalResonance(filteredText, filterContext.emotionalIntent)
  
  return {
    originalText: text,
    filteredText,
    transformations,
    sentimentScore,
    hugScore,
    emotionalResonance,
    appliedPatterns,
    mode
  }
}

/**
 * Calculate sentiment score (target ≥0.85)
 */
function calculateSentimentScore(text: string, mode: ToneMode): number {
  const positiveWords = ['love', 'beautiful', 'wonderful', 'gentle', 'peaceful', 'joy', 'celebrate', 'amazing', 'proud', 'blessed']
  const softWords = ['maybe', 'perhaps', 'gently', 'softly', 'with care', 'when ready']
  const encouragingWords = ['you can', 'believe', 'strong', 'capable', 'worthy', 'enough']
  
  const normalizedText = text.toLowerCase()
  let score = 0.5 // baseline
  
  // Positive word bonus
  positiveWords.forEach(word => {
    if (normalizedText.includes(word)) score += 0.05
  })
  
  // Soft language bonus
  softWords.forEach(word => {
    if (normalizedText.includes(word)) score += 0.03
  })
  
  // Encouraging language bonus
  encouragingWords.forEach(word => {
    if (normalizedText.includes(word)) score += 0.04
  })
  
  // Emoji bonus
  const emojiCount = (text.match(/[😊😢💕🌟✨🌿💚🕊️🤱🌅🌱🦋💫🎉🌸🤍💪💝]/g) || []).length
  score += emojiCount * 0.02
  
  // Mode-specific adjustments
  const modeCharacteristics = TONE_MODES[mode].characteristics
  score += modeCharacteristics.warmth * 0.1
  score += modeCharacteristics.softness * 0.05
  
  return Math.min(score, 1)
}

/**
 * Calculate "hug score" - does it feel like a hug?
 */
function calculateHugScore(text: string, mode: ToneMode): number {
  const hugIndicators = [
    'you\'re', 'with love', 'dear', 'mama', 'gently', 'softly', 'peaceful', 'safe', 
    'beautiful', 'wonderful', 'proud of you', 'you matter', 'enough', 'beloved'
  ]
  
  const normalizedText = text.toLowerCase()
  let hugScore = 0.3 // baseline
  
  hugIndicators.forEach(indicator => {
    if (normalizedText.includes(indicator)) {
      hugScore += 0.08
    }
  })
  
  // Personal pronouns increase hug feeling
  const personalPronouns = (normalizedText.match(/\b(you|your|you're)\b/g) || []).length
  hugScore += personalPronouns * 0.03
  
  // Gentle language multiplier
  const modeCharacteristics = TONE_MODES[mode].characteristics
  hugScore *= (modeCharacteristics.softness + modeCharacteristics.intimacy) / 2
  
  return Math.min(hugScore, 1)
}

/**
 * Calculate emotional resonance with detected intent
 */
function calculateEmotionalResonance(text: string, intent: EmotionalIntent): number {
  const resonanceKeywords = {
    comforting: ['safe', 'okay', 'gentle', 'peace', 'rest', 'breathe'],
    hopeful: ['tomorrow', 'possibility', 'dream', 'grow', 'bright', 'future'],
    reflective: ['journey', 'learn', 'grateful', 'wisdom', 'understand', 'growth'],
    proud: ['amazing', 'wonderful', 'accomplished', 'strong', 'capable', 'brilliant'],
    healing: ['heal', 'recovery', 'gentle', 'tender', 'love', 'compassion'],
    celebrating: ['celebrate', 'joy', 'happiness', 'victory', 'success', 'milestone'],
    encouraging: ['believe', 'can do', 'strong', 'capable', 'try', 'step forward']
  }
  
  const keywords = resonanceKeywords[intent.primary] || []
  const normalizedText = text.toLowerCase()
  
  let resonance = 0.4 // baseline
  keywords.forEach(keyword => {
    if (normalizedText.includes(keyword)) {
      resonance += 0.1
    }
  })
  
  // Intensity multiplier
  resonance *= (1 + intent.intensity * 0.5)
  
  return Math.min(resonance, 1)
}

/**
 * Vietnamese-specific tone filtering
 */
export function applyVietnameseToneFilter(text: string, mode: ToneMode): string {
  const vietnameseEnhancements: Record<ToneMode, {
    replacements: Record<string, string>;
    suffixes: string[];
  }> = {
    'soothing': {
      replacements: {
        'bạn': 'mẹ yêu',
        'phải': 'có thể',
        'cần': 'nên nhẹ nhàng',
        'làm': 'dịu dàng làm'
      },
      suffixes: ['💚', '🌿', 'với tình yêu', 'một cách dịu dàng']
    },
    'healing': {
      replacements: {
        'bạn': 'tim mẹ',
        'khó khăn': 'thử thách nhẹ nhàng',
        'vấn đề': 'điều cần chữa lành',
        'lỗi': 'điều cần yêu thương'
      },
      suffixes: ['💕', '🌸', 'với lòng thương', 'bằng tình yêu']
    },
    'joyful': {
      replacements: {
        'tốt': 'tuyệt vời',
        'hoàn thành': 'hoàn thành rực rỡ',
        'thành công': 'thành công rạng ngời'
      },
      suffixes: ['🎉', '✨', 'thật tuyệt vời', 'đầy niềm vui']
    },
    'hopeful': {
      replacements: {
        'có thể': 'chắc chắn có thể',
        'sẽ': 'sẽ tươi sáng',
        'ngày mai': 'ngày mai đẹp trời'
      },
      suffixes: ['🌅', '🌱', 'với hy vọng', 'hướng tới tương lai']
    },
    'gentle-encouragement': {
      replacements: {
        'thử': 'nhẹ nhàng thử',
        'cố gắng': 'yêu thương cố gắng',
        'làm được': 'chắc chắn làm được'
      },
      suffixes: ['✨', '💪', 'với sự hỗ trợ', 'từng bước một']
    }
  }
  
  const modeEnhancements = vietnameseEnhancements[mode]
  if (!modeEnhancements) return text
  
  let filteredText = text
  
  // Apply replacements
  for (const [original, replacement] of Object.entries(modeEnhancements.replacements)) {
    const regex = new RegExp(`\\b${original}\\b`, 'gi')
    filteredText = filteredText.replace(regex, replacement as string)
  }
  
  // Add suffix if appropriate
  if (Math.random() < 0.4) {
    const suffix = modeEnhancements.suffixes[Math.floor(Math.random() * modeEnhancements.suffixes.length)]
    filteredText = `${filteredText} ${suffix}`
  }
  
  return filteredText
}

export default applyToneFilter