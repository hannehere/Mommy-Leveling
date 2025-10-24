/**
 * Tone Customization UI Components
 * Beautiful interface for selecting and customizing tone modes
 */

'use client'

import React, { useState } from 'react'
import { useToneFilter, useToneModeInfo } from '@/hooks/use-tone-filter'
import { TONE_MODES, type ToneMode } from '@/lib/ai-tone-filter'
import { ToneModeIndicator, ToneFilteredText } from '@/components/tone-filtered-text'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip'
import { Settings, Heart, Sparkles, Volume2, VolumeX } from 'lucide-react'

interface ToneModesSelectorProps {
  className?: string
  variant?: 'compact' | 'expanded' | 'grid'
}

export function ToneModesSelector({ 
  className = '', 
  variant = 'compact' 
}: ToneModesSelectorProps) {
  const { currentToneMode, setToneMode, isTransitioning, isFilterEnabled, toggleFilter } = useToneFilter()

  const handleModeChange = (mode: ToneMode) => {
    if (mode !== currentToneMode) {
      setToneMode(mode)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <TooltipProvider>
          <div className="flex gap-1">
            {Object.entries(TONE_MODES).map(([mode, config]) => (
              <Tooltip key={mode}>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentToneMode === mode ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleModeChange(mode as ToneMode)}
                    disabled={isTransitioning}
                    className={`
                      relative w-10 h-10 p-0 rounded-full transition-all duration-300
                      ${currentToneMode === mode 
                        ? 'bg-gradient-to-br from-peach to-lavender text-white shadow-lg shadow-peach/25 scale-110 border-2 border-white' 
                        : 'hover:bg-gradient-to-br hover:from-peach/20 hover:to-lavender/20 text-slate-600 hover:text-peach border border-transparent'
                      }
                      ${isTransitioning ? 'animate-pulse' : ''}
                    `}
                  >
                    <span className="text-sm">{config.emoji}</span>
                    {currentToneMode === mode && (
                      <div className="absolute inset-0 rounded-full animate-pulse-glow" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium">{config.name.en}</p>
                  <p className="text-xs text-gray-500">{config.name.vi}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        
        <div className="w-px h-6 bg-gradient-to-b from-peach/30 to-lavender/30" />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFilter}
                className="w-10 h-10 p-0 rounded-full hover:bg-gradient-to-br hover:from-peach/20 hover:to-lavender/20 border border-transparent"
              >
                {isFilterEnabled ? (
                  <Volume2 className="w-4 h-4 text-peach" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                {isFilterEnabled ? 'Tone filter active' : 'Tone filter disabled'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {Object.entries(TONE_MODES).map(([mode, config]) => (
          <Card 
            key={mode}
            className={`
              cursor-pointer transition-all duration-300 hover:shadow-lg
              ${currentToneMode === mode 
                ? 'ring-2 ring-peach/50 bg-gradient-to-br from-peach/5 to-lavender/5' 
                : 'hover:bg-peach/5'
              }
            `}
            onClick={() => handleModeChange(mode as ToneMode)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center text-lg
                  ${currentToneMode === mode 
                    ? 'bg-gradient-to-br from-peach to-lavender text-white' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {config.emoji}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm">{config.name.en}</CardTitle>
                  <CardDescription className="text-xs">{config.name.vi}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex gap-2 text-xs">
                  <Badge variant="secondary" className="px-2 py-0.5">
                    Warmth: {Math.round(config.characteristics.warmth * 100)}%
                  </Badge>
                  <Badge variant="secondary" className="px-2 py-0.5">
                    Soft: {Math.round(config.characteristics.softness * 100)}%
                  </Badge>
                </div>
                {currentToneMode === mode && (
                  <div className="text-xs text-peach font-medium animate-fade-in">
                    ✨ Active
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Expanded variant
  return (
    <div className={`space-y-4 ${className}`}>
      {Object.entries(TONE_MODES).map(([mode, config]) => (
        <div
          key={mode}
          className={`
            p-4 rounded-2xl border transition-all duration-300 cursor-pointer
            ${currentToneMode === mode 
              ? 'border-peach/50 bg-gradient-to-r from-peach/5 to-lavender/5 shadow-md' 
              : 'border-gray-200 hover:border-peach/30 hover:bg-peach/5'
            }
          `}
          onClick={() => handleModeChange(mode as ToneMode)}
        >
          <div className="flex items-center gap-4">
            <ToneModeIndicator mode={mode as ToneMode} size="lg" />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-800">{config.name.en}</h3>
                <span className="text-sm text-gray-500">{config.name.vi}</span>
                {currentToneMode === mode && (
                  <Badge className="bg-peach/20 text-peach border-peach/30">
                    Active
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="flex flex-col">
                  <span className="text-gray-500">Warmth</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-peach to-lavender rounded-full"
                        style={{ width: `${config.characteristics.warmth * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {Math.round(config.characteristics.warmth * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500">Softness</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-mint to-baby-blue rounded-full"
                        style={{ width: `${config.characteristics.softness * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {Math.round(config.characteristics.softness * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500">Encouragement</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"
                        style={{ width: `${config.characteristics.encouragement * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {Math.round(config.characteristics.encouragement * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500">Intimacy</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"
                        style={{ width: `${config.characteristics.intimacy * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {Math.round(config.characteristics.intimacy * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface ToneCustomizationPanelProps {
  className?: string
}

export function ToneCustomizationPanel({ className = '' }: ToneCustomizationPanelProps) {
  const { 
    userPreferences, 
    updatePreferences, 
    isFilterEnabled, 
    toggleFilter,
    currentToneMode 
  } = useToneFilter()
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Settings className="w-4 h-4 mr-2" />
          Tone Settings
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-slate-800">
            <Heart className="w-5 h-5 text-peach" />
            AI Tone Filter Settings
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Customize how your text feels - from gentle whispers to joyful celebrations
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cream/50 to-peach/5 rounded-lg border border-peach/10">
            <div>
              <h4 className="font-medium text-slate-700">Enable Tone Filtering</h4>
              <p className="text-sm text-slate-500">
                Transform all text into emotionally warm, encouraging language
              </p>
            </div>
            <Switch checked={isFilterEnabled} onCheckedChange={toggleFilter} />
          </div>
          
          {isFilterEnabled && (
            <>
              {/* Tone Mode Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-lavender" />
                  Tone Mode
                </h4>
                <ToneModesSelector variant="grid" />
              </div>
              
              {/* Custom Preferences */}
              <div className="space-y-6">
                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-mint" />
                  Fine-tune Your Experience
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Softness</label>
                      <span className="text-sm text-peach font-medium">
                        {Math.round(userPreferences.softness * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[userPreferences.softness]}
                      onValueChange={([value]) => updatePreferences({ softness: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      How gentle and tender the language feels
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Encouragement</label>
                      <span className="text-sm text-lavender font-medium">
                        {Math.round(userPreferences.encouragement * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[userPreferences.encouragement]}
                      onValueChange={([value]) => updatePreferences({ encouragement: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      How much motivational support to add
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Formality</label>
                      <span className="text-sm text-gray-500">
                        {Math.round(userPreferences.formality * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[userPreferences.formality]}
                      onValueChange={([value]) => updatePreferences({ formality: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      0% = Very intimate, 100% = More professional
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Preview */}
              <div className="space-y-4">
                <h4 className="font-medium text-slate-700">Preview</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2 font-medium">Original:</p>
                    <p className="text-sm text-slate-700">You should complete your daily tasks.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-peach/15 to-lavender/15 border border-peach/20 rounded-lg">
                    <p className="text-sm text-peach font-medium mb-2">With {TONE_MODES[currentToneMode].name.en}:</p>
                    <ToneFilteredText context="dashboard" showShimmer className="text-slate-700">
                      You should complete your daily tasks.
                    </ToneFilteredText>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ToneFloatingControlProps {
  className?: string
}

export function ToneFloatingControl({ className = '' }: ToneFloatingControlProps) {
  const { currentToneMode, isFilterEnabled } = useToneFilter()
  const { info } = useToneModeInfo()
  
  return (
    <div className={`fixed bottom-20 right-6 z-40 ${className}`}>
      <div className="flex flex-col items-end gap-3">
        {/* Current mode indicator */}
        {isFilterEnabled && (
          <div className="bg-gradient-to-r from-peach/10 to-lavender/10 dark:from-peach/20 dark:to-lavender/20 rounded-full shadow-lg border border-peach/30 px-4 py-2 animate-warm-appear backdrop-blur">
            <div className="flex items-center gap-2 text-sm">
              <span>{info.emoji}</span>
              <span className="text-peach font-medium dark:text-peach">{info.name.en}</span>
            </div>
          </div>
        )}
        
        {/* Main controls */}
        <Card className="bg-gradient-to-br from-cream/95 to-white/95 dark:from-slate-800/95 dark:to-slate-700/95 backdrop-blur shadow-xl border-peach/30">
          <CardContent className="p-3">
            <div className="flex flex-col gap-3">
              <ToneModesSelector variant="compact" />
              <ToneCustomizationPanel />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ToneModesSelector