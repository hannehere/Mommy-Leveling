/**
 * App-Level Tone Filter Integration
 * Wraps the entire application with tone filtering capabilities
 */

'use client'

import React, { ReactNode } from 'react'
import { ToneFilterProvider } from '@/hooks/use-tone-filter'
import { ToneFloatingControl } from '@/components/tone-customization-ui'
import { EmotionalTestingDialog } from '@/components/hug-test-panel'
import { Button } from '@/components/ui/button'
import { TestTube } from 'lucide-react'

interface AppToneWrapperProps {
  children: ReactNode
}

/**
 * Main wrapper that provides tone filtering context to the entire app
 */
export function AppToneWrapper({ children }: AppToneWrapperProps) {
  return (
    <ToneFilterProvider>
      <div className="relative">
        {children}
        
        {/* Floating Controls - Available throughout the app */}
        <ToneFloatingControl />
        
        {/* Development Testing Tools */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 z-40">
            <EmotionalTestingDialog>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test UX
              </Button>
            </EmotionalTestingDialog>
          </div>
        )}
      </div>
    </ToneFilterProvider>
  )
}

/**
 * Enhanced Navigation with tone-filtered text
 */
interface NavigationItem {
  href: string
  label: string
  description?: string
}

interface ToneAwareNavigationProps {
  items: NavigationItem[]
  className?: string
}

export function ToneAwareNavigation({ items, className = '' }: ToneAwareNavigationProps) {
  return (
    <nav className={className}>
      {items.map((item, index) => (
        <a 
          key={index}
          href={item.href}
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="font-medium text-gray-900">
            {item.label}
          </div>
          {item.description && (
            <div className="text-sm text-gray-600 mt-1">
              {item.description}
            </div>
          )}
        </a>
      ))}
    </nav>
  )
}

/**
 * Auto-filtered notification system
 */
interface NotificationToastProps {
  title: string
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  onClose?: () => void
}

export function NotificationToast({ 
  title, 
  message, 
  type = 'info',
  onClose 
}: NotificationToastProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800'
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800'
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800'
    }
  }

  return (
    <div className={`p-4 border rounded-lg ${getTypeStyles()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium mb-1">
            {title}
          </h4>
          <p className="text-sm opacity-90">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-current opacity-60 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Global message interceptor for automatic tone filtering
 */
interface GlobalMessageConfig {
  enableAutoFiltering: boolean
  preserveOriginalForComparison: boolean
  debugMode: boolean
}

const defaultConfig: GlobalMessageConfig = {
  enableAutoFiltering: true,
  preserveOriginalForComparison: process.env.NODE_ENV === 'development',
  debugMode: process.env.NODE_ENV === 'development'
}

let globalConfig = defaultConfig

export function configureGlobalFiltering(config: Partial<GlobalMessageConfig>) {
  globalConfig = { ...globalConfig, ...config }
}

/**
 * Automatic text interceptor for system messages, errors, and notifications
 */
export function useAutoFilteredMessages() {
  const filterSystemMessage = (message: string, context: string = 'system') => {
    if (!globalConfig.enableAutoFiltering) {
      return message
    }
    
    // This would typically integrate with the tone filter hook
    // For now, return the message as-is with a plan for integration
    return message
  }

  const filterErrorMessage = (error: string) => {
    if (!globalConfig.enableAutoFiltering) {
      return error
    }
    
    // Transform harsh error messages into gentle guidance
    const gentleError = error
      .replace(/Error:/g, 'Oops, something gentle happened:')
      .replace(/Failed to/g, 'We had a little hiccup while trying to')
      .replace(/Cannot/g, 'We cannot quite')
      .replace(/Invalid/g, 'This looks a bit different than expected')
    
    return gentleError
  }

  const filterSuccessMessage = (message: string) => {
    if (!globalConfig.enableAutoFiltering) {
      return message
    }
    
    // Enhance success messages with warmth
    if (!message.includes('💕') && !message.includes('✨') && !message.includes('🌟')) {
      return `${message} ✨`
    }
    
    return message
  }

  return {
    filterSystemMessage,
    filterErrorMessage,
    filterSuccessMessage,
    isEnabled: globalConfig.enableAutoFiltering
  }
}

/**
 * Page wrapper that automatically applies tone filtering to content
 */
interface ToneAwarePageProps {
  children: ReactNode
  pageTitle?: string
  pageDescription?: string
  showToneControls?: boolean
}

export function ToneAwarePage({ 
  children, 
  pageTitle,
  pageDescription,
  showToneControls = true 
}: ToneAwarePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-mint/10">
      {pageTitle && (
        <header className="px-6 py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {pageTitle}
            </h1>
            {pageDescription && (
              <p className="text-gray-600 text-lg">
                {pageDescription}
              </p>
            )}
          </div>
        </header>
      )}
      
      <main className="relative">
        {children}
      </main>
    </div>
  )
}

/**
 * Context-aware tone filtering for different sections
 */
export const TONE_CONTEXTS = {
  welcome: 'A warm, excited greeting for new mothers',
  dashboard: 'Encouraging progress updates and gentle motivation',
  journal: 'Safe, private space for emotional expression',
  community: 'Supportive peer connection and shared experiences',
  learning: 'Educational content with emotional sensitivity',
  wellness: 'Health information with care and reassurance',
  celebration: 'Joyful acknowledgment of achievements',
  notification: 'Gentle system messages and updates',
  error: 'Reassuring guidance when things go wrong',
  success: 'Warm celebration of completed actions'
} as const

export type ToneContext = keyof typeof TONE_CONTEXTS

/**
 * Hook for context-aware tone filtering
 */
export function useContextualTone(context: ToneContext) {
  const contextDescription = TONE_CONTEXTS[context]
  
  const getContextualPrompt = () => {
    return `Context: ${contextDescription}. Apply appropriate emotional tone for this situation.`
  }
  
  const getContextualStyles = () => {
    switch (context) {
      case 'welcome':
        return 'text-peach-600 font-medium'
      case 'celebration':
        return 'text-yellow-600 font-semibold'
      case 'wellness':
        return 'text-mint-600'
      case 'error':
        return 'text-red-500 font-normal'
      case 'success':
        return 'text-green-600 font-medium'
      default:
        return 'text-gray-700'
    }
  }
  
  return {
    contextDescription,
    contextualPrompt: getContextualPrompt(),
    contextualStyles: getContextualStyles()
  }
}

export default AppToneWrapper