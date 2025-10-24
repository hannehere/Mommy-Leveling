# AI Emotional Translator for Mommy Leveling 🌿💕

A heartfelt translation system that preserves warmth, empathy, and tenderness when translating between English ↔ Vietnamese for the Mommy Leveling platform.

## 🧠 Core Features

- **Emotional Tone Detection**: Automatically detects joy, sadness, reflection, motivation, comfort, and healing tones
- **Warm Translation**: Preserves emotional context and nurturing language
- **Bilingual Display**: Shows both languages simultaneously when needed
- **Cultural Sensitivity**: Optimized for Vietnamese motherhood context
- **Smooth Animations**: Heartbeat pulse, fade transitions, and soft glow effects
- **Three Translation Modes**: Warm & Gentle, Creative Reflection, and Neutral

## 🎨 Visual Identity

- **Colors**: Soft pastels with peach (#FFD6C9), lavender (#E7D1FF), mint (#C8F2D4)
- **Animations**: Heartbeat pulse, breathing glow, gentle bounces
- **Icons**: 🪞 (mirror), 💬 (soft bubble), 🕊️ (peace), 🌿 (nature)
- **Font**: Be Vietnam Pro with Vietnamese subset support

## 🚀 Quick Start

### 1. Wrap Your App

```tsx
import { EmotionalTranslationWrapper } from '@/components/emotional-translation-integration'

export default function App() {
  return (
    <EmotionalTranslationWrapper>
      {/* Your app content */}
    </EmotionalTranslationWrapper>
  )
}
```

### 2. Use BilingualText Component

```tsx
import { BilingualText } from '@/components/bilingual-text'

function MyComponent() {
  return (
    <BilingualText 
      className="text-lg font-medium"
      fadeTransition
      sparkleEffect
    >
      You're doing amazing, mama! 💕
    </BilingualText>
  )
}
```

### 3. Add Translation Toggle

```tsx
import { EmotionalTranslatorToggle } from '@/components/emotional-translator-toggle'

// Minimal version
<EmotionalTranslatorToggle variant="minimal" />

// Floating action button
<EmotionalTranslatorToggle variant="floating" />

// Full featured with mode selection
<EmotionalTranslatorToggle showLabel />
```

## 💬 Translation Examples

### Comfort & Healing
```
EN: "Take a deep breath, you are safe now 🌿"
VI: "Hít một hơi thật sâu, mẹ an toàn rồi 🌿"

EN: "It's okay to rest."
VI: "Nghỉ ngơi cũng là yêu thương chính mình."
```

### Joy & Celebration
```
EN: "You're doing great, Mommy 💕"
VI: "Mẹ đang làm rất tuyệt vời 💕"

EN: "Amazing work!"
VI: "Làm tuyệt vời lắm!"
```

### Motivation & Strength
```
EN: "You've got this, warrior mama!"
VI: "Mẹ làm được mà, mẹ chiến binh!"

EN: "Your love is enough."
VI: "Tình yêu của mẹ là đủ."
```

## 🛠️ Components Overview

### Core Services
- `lib/emotional-translator.ts` - Main translation engine with tone detection
- `lib/emotional-dictionary.ts` - Comprehensive vocabulary mappings
- `hooks/use-emotional-translation.ts` - React hooks and context provider

### UI Components
- `components/emotional-translator-toggle.tsx` - Language switcher with modes
- `components/bilingual-text.tsx` - Bilingual text display with animations
- `components/emotional-translation-integration.tsx` - Pre-built integration components

### Specialized Components
- `TranslatedMessage` - Emotional messages with tone indicators
- `MommyTip` - Translated parenting tips
- `GratitudeNote` - Bilingual gratitude expressions
- `TranslatedDailyMissionCard` - Mission cards with translation
- `TranslatedAchievementBadge` - Achievement badges with emotional context

## 🎯 Translation Modes

### 1. Warm & Gentle (Default)
- Adds nurturing terms: "mẹ yêu", "con yêu", "dear"
- Softens imperatives: "hãy nhẹ nhàng"
- Perfect for comfort and healing contexts

### 2. Creative Reflection
- Adds sparkle effects and contemplative emojis
- Enhanced for gratitude and mindfulness content
- Poetic and expressive translations

### 3. Neutral
- Direct translations without emotional enhancement
- Professional and straightforward
- Maintains original tone without additions

## 🎪 UI Behaviors

### Language Switching
- **Heartbeat Pulse**: Button pulses like a gentle heartbeat during switch
- **Fade Transition**: Text fades out, changes, then fades in
- **Body Class**: `language-switching` class added during transition

### Emotional Indicators
- **Tone Icons**: 💕 (comfort), ✨ (joy), 💪 (motivation), 💭 (reflection)
- **Color Coding**: Each tone has associated color palette
- **Glow Effects**: Soft glow around emotionally charged text

### Tooltip Messages
```
"Softly translated with love 💕 | Dịch nhẹ nhàng bằng yêu thương 💕"
"AI Emotional Translation 🌿 | Dịch cảm xúc bằng AI 🌿"
```

## 🧘 Comfort Test

The system includes a "Comfort Test" that validates translations:

```tsx
const { runComfortTest } = useEmotionalTranslation()

const result = await runComfortTest("You're doing great, mama!")
// Returns: { passed: boolean, score: number, feedback: string }
```

**Criteria:**
- ✅ Emojis preserved
- ✅ Emotional tone detected
- ✅ Translation length appropriate  
- ✅ Nurturing tone applied
- **Goal**: "If you read it aloud, does it feel like a hug? 🤍"

## 🌸 Healing Affirmations

Built-in affirmations for different times of day:

```tsx
import { HEALING_AFFIRMATIONS } from '@/lib/emotional-dictionary'

// Morning affirmations
HEALING_AFFIRMATIONS.morning.en[0] // "Today, I choose to be gentle with myself."
HEALING_AFFIRMATIONS.morning.vi[0] // "Hôm nay, mẹ chọn dịu dàng với chính mình."

// Evening reflections
HEALING_AFFIRMATIONS.evening.en[0] // "I did my best today, and that is enough."
HEALING_AFFIRMATIONS.evening.vi[0] // "Hôm nay mẹ đã cố gắng hết sức, và điều đó là đủ."
```

## 📚 Vietnamese Cultural Context

Special handling for Vietnamese motherhood expressions:

- **Traditional Values**: "tình mẹ" (mother's love), "gia đình" (family)
- **Modern Context**: "mẹ đi làm" (working mama), "cân bằng cuộc sống" (life balance)
- **Cultural Bridge**: "Đông Tây hòa quyện" (East meets West)

## 🎨 Custom Animations

Added to `globals.css`:
- `animate-heartbeat-pulse` - Gentle heartbeat for language switching
- `animate-language-switch-fade` - Smooth text transitions
- `animate-text-emotion-glow` - Soft glow for emotional text
- `animate-warm-appear` - Gentle appearance animation
- `animate-love-ripple` - Ripple effect for emotional moments

## 💡 Integration Tips

### Dashboard Integration
```tsx
// Replace existing text with translated versions
<BilingualText>Daily Missions</BilingualText>

// Add translation toggle to header
<EmotionalTranslatorToggle variant="minimal" />

// Use pre-built translated components
<TranslatedDailyMissionCard title="Feed baby on time" xp={10} />
```

### Gratitude Journal
```tsx
<GratitudeNote 
  note="Every day I'm amazed by how much love I can feel."
  author="Sarah, new mom"
/>
```

### Motivational Messages
```tsx
<TranslatedMessage
  message="You're doing such a wonderful job, mama!"
  tone="joy"
  showEmotionalIndicator
/>
```

## 🔄 Future Enhancements

- **Voice Translation**: Speak translations with emotional tone
- **AI Integration**: Connect to GPT/Gemini for dynamic translations
- **Community Translations**: Crowd-sourced emotional mappings
- **Sentiment Analysis**: Real-time emotional state detection
- **Personalization**: Learn individual mom's preferred language style

## 💗 Philosophy

*"Every word should feel alive, warm, and motherly. Mỗi dòng chữ phải khiến người đọc cảm nhận được sự ấm áp và dịu dàng như vòng tay mẹ."*

This system doesn't just translate words—it translates feelings, preserving the tender emotional connection that makes motherhood special. 🌿💕