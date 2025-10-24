/**
 * Emotional Translation Toggle Component
 * Beautiful language switcher with heartbeat pulse animation
 */

'use client'

import React, { useState } from 'react'
import { Languages, Heart, Sparkles, Mirror, MessageCircle, Dove } from 'lucide-react'
import { useEmotionalTranslation } from '@/hooks/use-emotional-translation'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface EmotionalTranslatorToggleProps {
  className?: string
  showLabel?: boolean
  variant?: 'default' | 'minimal' | 'floating'
}

export function EmotionalTranslatorToggle({ 
  className = '', 
  showLabel = true,
  variant = 'default'
}: EmotionalTranslatorToggleProps) {
  const {
    currentLanguage,
    translationMode,
    bilingualMode,
    isTranslating,
    switchLanguage,
    setTranslationMode,
    toggleBilingualMode,
    showTranslationTooltip,
    setShowTranslationTooltip
  } = useEmotionalTranslation()

  const [isAnimating, setIsAnimating] = useState(false)

  const handleLanguageSwitch = (lang: 'en' | 'vi') => {
    setIsAnimating(true)
    switchLanguage(lang)
    
    // Trigger heartbeat pulse animation
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'warm-gentle': return <Heart className="w-4 h-4 text-peach" />
      case 'creative-reflection': return <Sparkles className="w-4 h-4 text-lavender" />
      case 'neutral': return <MessageCircle className="w-4 h-4 text-mint" />
      default: return <Heart className="w-4 h-4 text-peach" />
    }
  }

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'warm-gentle': return currentLanguage === 'vi' ? 'Ấm áp & dịu dàng' : 'Warm & Gentle'
      case 'creative-reflection': return currentLanguage === 'vi' ? 'Sáng tạo & cảm nhận' : 'Creative Reflection'
      case 'neutral': return currentLanguage === 'vi' ? 'Trung lập' : 'Neutral'
      default: return 'Warm & Gentle'
    }
  }

  if (variant === 'minimal') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLanguageSwitch(currentLanguage === 'en' ? 'vi' : 'en')}
              className={`relative ${className} ${isAnimating ? 'animate-pulse-glow' : ''}`}
              disabled={isTranslating}
            >
              <Languages className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {currentLanguage.toUpperCase()}
              </span>
              {isTranslating && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-peach rounded-full animate-ping" />
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {currentLanguage === 'vi' 
                ? 'Dịch nhẹ nhàng bằng yêu thương 💕' 
                : 'Softly translated with love 💕'
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                onClick={() => handleLanguageSwitch(currentLanguage === 'en' ? 'vi' : 'en')}
                className={`
                  relative rounded-full bg-gradient-to-r from-peach/90 to-lavender/90 
                  hover:from-peach hover:to-lavender text-white shadow-lg 
                  hover:shadow-xl transition-all duration-300
                  ${isAnimating ? 'animate-breathing-glow scale-110' : ''}
                  ${isTranslating ? 'animate-pulse' : ''}
                `}
                disabled={isTranslating}
              >
                <Mirror className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  {currentLanguage === 'vi' ? 'EN' : 'VI'}
                </span>
                {isTranslating && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-4 h-4 bg-white rounded-full animate-ping opacity-75" />
                  </div>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-sm flex items-center gap-2">
                <Dove className="w-4 h-4" />
                {currentLanguage === 'vi' 
                  ? 'Dịch cảm xúc bằng AI 🌿' 
                  : 'AI Emotional Translation 🌿'
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  // Default variant - full featured
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`
              relative bg-gradient-to-r from-cream to-white dark:from-slate-800 dark:to-slate-700
              border-peach/30 hover:border-peach/50 transition-all duration-300
              ${isAnimating ? 'animate-heartbeat-pulse' : ''}
              ${isTranslating ? 'animate-gentle-bounce' : ''}
            `}
            disabled={isTranslating}
          >
            <div className="flex items-center gap-2">
              {getModeIcon(translationMode)}
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage.toUpperCase()}
              </span>
              {bilingualMode && (
                <span className="text-xs bg-mint/20 text-mint px-1.5 py-0.5 rounded-full">
                  {currentLanguage === 'vi' ? '2 ngôn ngữ' : 'Bilingual'}
                </span>
              )}
            </div>
            {isTranslating && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-peach rounded-full animate-ping" />
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-72 bg-white dark:bg-slate-800 border-peach/20 shadow-xl">
          <DropdownMenuLabel className="text-sm font-medium text-foreground flex items-center gap-2">
            <Heart className="w-4 h-4 text-peach" />
            {currentLanguage === 'vi' 
              ? 'Dịch cảm xúc bằng AI 🌿' 
              : 'AI Emotional Translation 🌿'
            }
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* Language Selection */}
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">
              {currentLanguage === 'vi' ? 'Ngôn ngữ' : 'Language'}
            </p>
            <div className="flex gap-2">
              <Button
                variant={currentLanguage === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLanguageSwitch('en')}
                className="flex-1 text-xs"
              >
                English
              </Button>
              <Button
                variant={currentLanguage === 'vi' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLanguageSwitch('vi')}
                className="flex-1 text-xs"
              >
                Tiếng Việt
              </Button>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Translation Mode */}
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">
              {currentLanguage === 'vi' ? 'Chế độ dịch' : 'Translation Mode'}
            </p>
            <div className="space-y-1">
              {(['warm-gentle', 'creative-reflection', 'neutral'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={translationMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTranslationMode(mode)}
                  className="w-full justify-start text-xs"
                >
                  {getModeIcon(mode)}
                  <span className="ml-2">{getModeLabel(mode)}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Bilingual Mode Toggle */}
          <DropdownMenuItem
            onClick={toggleBilingualMode}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className={`w-4 h-4 rounded border ${bilingualMode ? 'bg-mint border-mint' : 'border-gray-300'} flex items-center justify-center`}>
              {bilingualMode && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-sm">
              {currentLanguage === 'vi' 
                ? 'Hiển thị cả hai ngôn ngữ' 
                : 'Show both languages'
              }
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <div className="p-2 text-xs text-muted-foreground text-center italic">
            {currentLanguage === 'vi' 
              ? 'Dịch cả cảm xúc, không chỉ ngôn từ.' 
              : 'Feelings, not just words.'
            }
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {showLabel && (
        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'vi' 
              ? 'Dịch nhẹ nhàng bằng yêu thương 💕' 
              : 'Softly translated with love 💕'
            }
          </p>
        </div>
      )}
    </div>
  )
}