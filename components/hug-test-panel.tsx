/**
 * Hug Test & Emotional UX Testing System
 * Validates if text "feels like a hug" with user feedback
 */

'use client'

import React, { useState, useCallback } from 'react'
import { useToneFilter, useSentimentMonitor } from '@/hooks/use-tone-filter'
import { ToneFilteredText } from '@/components/tone-filtered-text'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Heart, TestTube, Sparkles, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react'

interface HugTestResult {
  passed: boolean
  hugScore: number
  sentimentScore: number
  emotionalResonance: number
  feedback: string
  suggestions: string[]
}

interface EmojiReaction {
  emoji: string
  label: string
  value: number
  color: string
}

const EMOJI_REACTIONS: EmojiReaction[] = [
  { emoji: '🤗', label: 'Feels like a warm hug', value: 1.0, color: 'text-pink-500' },
  { emoji: '💕', label: 'Very comforting', value: 0.9, color: 'text-rose-500' },
  { emoji: '😊', label: 'Pleasant and warm', value: 0.8, color: 'text-yellow-500' },
  { emoji: '🙂', label: 'Neutral-positive', value: 0.6, color: 'text-blue-500' },
  { emoji: '😐', label: 'Neutral', value: 0.5, color: 'text-gray-500' },
  { emoji: '😕', label: 'Could be warmer', value: 0.3, color: 'text-orange-500' },
  { emoji: '😟', label: 'Feels distant', value: 0.1, color: 'text-red-500' }
]

interface HugTestPanelProps {
  className?: string
}

export function HugTestPanel({ className = '' }: HugTestPanelProps) {
  const { runHugTest, currentToneMode } = useToneFilter()
  const [testText, setTestText] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<HugTestResult | null>(null)
  const [userReaction, setUserReaction] = useState<EmojiReaction | null>(null)

  const runTest = async () => {
    if (!testText.trim()) return

    setIsRunning(true)
    setResult(null)
    setUserReaction(null)

    try {
      const testResult = await runHugTest(testText)
      
      // Create comprehensive result
      const hugTestResult: HugTestResult = {
        passed: testResult.passed,
        hugScore: testResult.score,
        sentimentScore: testResult.score, // Simplified for demo
        emotionalResonance: testResult.score * 0.9, // Estimated
        feedback: testResult.feedback,
        suggestions: generateSuggestions(testResult.score)
      }
      
      setResult(hugTestResult)
    } finally {
      setIsRunning(false)
    }
  }

  const generateSuggestions = (score: number): string[] => {
    if (score >= 0.8) {
      return [
        '✨ Perfect! This text radiates warmth.',
        '💝 Consider this your gold standard.',
        '🌟 This would make any mom feel loved.'
      ]
    } else if (score >= 0.6) {
      return [
        '💡 Try adding more personal pronouns ("you", "your").',
        '🌿 Consider softer language ("maybe", "gently").',
        '💕 Add emotional validation ("it\'s okay", "you matter").'
      ]
    } else {
      return [
        '🚨 This needs significant warmth improvements.',
        '💔 Remove harsh commands and imperatives.',
        '🤲 Add nurturing words and emotional support.',
        '🌸 Consider the healing tone mode for better results.'
      ]
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.85) return 'text-green-600'
    if (score >= 0.7) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 0.85) return 'from-green-50 to-emerald-50 border-green-200'
    if (score >= 0.7) return 'from-yellow-50 to-orange-50 border-yellow-200'
    return 'from-red-50 to-pink-50 border-red-200'
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-peach" />
          Hug Test
          <Badge variant="secondary" className="ml-auto">
            Current mode: {currentToneMode}
          </Badge>
        </CardTitle>
        <CardDescription>
          Test if your text feels like a warm hug 🤍
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Test Text</label>
          <Textarea
            placeholder="Enter text to test... (e.g., 'You need to complete your tasks')"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="min-h-20"
          />
          <Button 
            onClick={runTest} 
            disabled={!testText.trim() || isRunning}
            className="w-full"
          >
            {isRunning ? (
              <>
                <TestTube className="w-4 h-4 mr-2 animate-spin" />
                Running Hug Test...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Run Hug Test
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            {/* Score Overview */}
            <div className={`p-4 rounded-xl border bg-gradient-to-br ${getScoreBackground(result.hugScore)}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Overall Hug Score</h4>
                <span className={`text-2xl font-bold ${getScoreColor(result.hugScore)}`}>
                  {Math.round(result.hugScore * 100)}%
                </span>
              </div>
              
              <Progress 
                value={result.hugScore * 100} 
                className="mb-3"
              />
              
              <div className="flex items-center gap-2 text-sm">
                <span className={result.passed ? 'text-green-600' : 'text-red-600'}>
                  {result.passed ? '✅ Passed' : '❌ Failed'}
                </span>
                <span className="text-gray-500">•</span>
                <span>Target: ≥70% hug score</span>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-pink-600">
                  {Math.round(result.hugScore * 100)}%
                </div>
                <div className="text-xs text-gray-600">Hug Score</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-600">
                  {Math.round(result.sentimentScore * 100)}%
                </div>
                <div className="text-xs text-gray-600">Sentiment</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-purple-600">
                  {Math.round(result.emotionalResonance * 100)}%
                </div>
                <div className="text-xs text-gray-600">Resonance</div>
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="space-y-3">
              <h4 className="font-medium">Comparison</h4>
              
              <div className="grid gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Original:</div>
                  <div className="text-sm">{testText}</div>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-peach/10 to-lavender/10 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Filtered:</div>
                  <ToneFilteredText 
                    context="wellness" 
                    className="text-sm"
                    showShimmer
                  >
                    {testText}
                  </ToneFilteredText>
                </div>
              </div>
            </div>

            {/* User Reaction */}
            <div className="space-y-3">
              <h4 className="font-medium">How does it feel to you?</h4>
              <div className="grid grid-cols-4 gap-2">
                {EMOJI_REACTIONS.map((reaction, index) => (
                  <Button
                    key={index}
                    variant={userReaction?.emoji === reaction.emoji ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserReaction(reaction)}
                    className="flex flex-col gap-1 h-auto py-3"
                  >
                    <span className="text-lg">{reaction.emoji}</span>
                    <span className="text-xs text-center leading-tight">
                      {reaction.label}
                    </span>
                  </Button>
                ))}
              </div>
              
              {userReaction && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{userReaction.emoji}</span>
                    <span>You selected: <strong>{userReaction.label}</strong></span>
                    <span className="ml-auto text-blue-600 font-medium">
                      {Math.round(userReaction.value * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <h4 className="font-medium">Suggestions</h4>
              <div className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-lavender/10 border border-lavender/30 rounded-lg text-sm"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ABTestingPanelProps {
  className?: string
}

export function ABTestingPanel({ className = '' }: ABTestingPanelProps) {
  const [testResults, setTestResults] = useState<Array<{
    id: string
    textA: string
    textB: string
    userChoice: 'A' | 'B' | null
    timestamp: Date
  }>>([])

  const addTest = (textA: string, textB: string) => {
    const newTest = {
      id: Date.now().toString(),
      textA,
      textB,
      userChoice: null,
      timestamp: new Date()
    }
    setTestResults(prev => [newTest, ...prev.slice(0, 4)]) // Keep last 5 tests
  }

  const recordChoice = (testId: string, choice: 'A' | 'B') => {
    setTestResults(prev => prev.map(test => 
      test.id === testId ? { ...test, userChoice: choice } : test
    ))
  }

  // Demo tests
  React.useEffect(() => {
    const demoTests = [
      {
        textA: "You must complete your daily tasks.",
        textB: "When you're ready, maybe take a moment to lovingly care for your daily routine 🌿"
      },
      {
        textA: "Don't forget to update your baby's log.",
        textB: "If it brings you peace, you might want to note down baby's beautiful progress 💕"
      }
    ]

    demoTests.forEach(test => addTest(test.textA, test.textB))
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-lavender" />
          A/B Comfort Testing
        </CardTitle>
        <CardDescription>
          Compare different versions and choose what feels better
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {testResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No tests available yet</p>
          </div>
        ) : (
          testResults.map((test) => (
            <div key={test.id} className="space-y-4 p-4 border rounded-xl bg-gray-50">
              <div className="text-xs text-gray-500 text-center">
                Which version feels more like a loving conversation?
              </div>
              
              <div className="grid gap-3">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    test.userChoice === 'A' 
                      ? 'border-peach bg-peach/10 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => recordChoice(test.id, 'A')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">Version A</Badge>
                    {test.userChoice === 'A' && (
                      <ThumbsUp className="w-4 h-4 text-peach" />
                    )}
                  </div>
                  <p className="text-sm">{test.textA}</p>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    test.userChoice === 'B' 
                      ? 'border-peach bg-peach/10 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => recordChoice(test.id, 'B')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">Version B (Filtered)</Badge>
                    {test.userChoice === 'B' && (
                      <ThumbsUp className="w-4 h-4 text-peach" />
                    )}
                  </div>
                  <p className="text-sm">{test.textB}</p>
                </div>
              </div>
              
              {test.userChoice && (
                <div className="text-center text-sm text-green-600 font-medium">
                  ✓ Thank you for your feedback!
                </div>
              )}
            </div>
          ))
        )}
        
        <div className="text-xs text-center text-gray-500">
          Your feedback helps improve the emotional tone of the platform 💕
        </div>
      </CardContent>
    </Card>
  )
}

interface EmotionalTestingDialogProps {
  children: React.ReactNode
}

export function EmotionalTestingDialog({ children }: EmotionalTestingDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <TestTube className="w-5 h-5 text-peach" />
            Emotional UX Testing Lab
          </DialogTitle>
          <DialogDescription>
            Test and validate the emotional impact of your text
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <HugTestPanel />
          <ABTestingPanel />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HugTestPanel