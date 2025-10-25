/**
 * Sleep Tracking System for Mom & Baby
 * Comprehensive sleep pattern analysis, quality metrics, and personalized recommendations
 */

'use client'

import React, { useState, useEffect } from 'react'
import { ToneFilteredText } from '@/components/tone-filtered-text'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { 
  Moon, 
  Sun, 
  Clock, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Timer, 
  Baby,
  Heart,
  Plus,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Star,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react'
import { 
  nutritionTracker, 
  SleepSession, 
  DailySleepSummary,
  BabyProfile,
  MomProfile,
  formatDuration
} from '@/lib/nutrition-wellness-tracker'

interface SleepTrackerProps {
  momProfile?: MomProfile
  babyProfile?: BabyProfile
  className?: string
}

export function SleepTracker({ momProfile, babyProfile, className = '' }: SleepTrackerProps) {
  const [activeTab, setActiveTab] = useState<'mom' | 'baby' | 'insights'>('baby')
  const [isTrackingMom, setIsTrackingMom] = useState(false)
  const [isTrackingBaby, setIsTrackingBaby] = useState(false)
  const [currentMomSession, setCurrentMomSession] = useState<Date | null>(null)
  const [currentBabySession, setCurrentBabySession] = useState<Date | null>(null)
  const [showAddSleep, setShowAddSleep] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<'mom' | 'baby'>('baby')

  return (
    <Card className={`bg-linear-to-br from-lavender/10 to-baby-blue/10 border-lavender/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lavender">
          <Moon className="w-6 h-6" />
          <ToneFilteredText context="wellness">
            Sleep Tracking
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="wellness">
            Monitor sleep patterns and quality for better rest
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="baby" className="flex items-center gap-2">
              <Baby className="w-4 h-4" />
              Baby Sleep
            </TabsTrigger>
            <TabsTrigger value="mom" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Mom Sleep
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="baby" className="space-y-4">
            <BabySleepTracker 
              babyProfile={babyProfile}
              isTracking={isTrackingBaby}
              currentSession={currentBabySession}
              onStartTracking={() => {
                setIsTrackingBaby(true)
                setCurrentBabySession(new Date())
              }}
              onStopTracking={(quality, interruptions, notes) => {
                if (currentBabySession) {
                  const session: Omit<SleepSession, 'id'> = {
                    person: 'baby',
                    startTime: currentBabySession,
                    endTime: new Date(),
                    duration: Math.floor((Date.now() - currentBabySession.getTime()) / (1000 * 60)),
                    quality,
                    interruptions,
                    location: 'crib',
                    notes
                  }
                  nutritionTracker.addSleepSession(session)
                }
                setIsTrackingBaby(false)
                setCurrentBabySession(null)
              }}
              onAddManual={() => {
                setSelectedPerson('baby')
                setShowAddSleep(true)
              }}
            />
          </TabsContent>

          <TabsContent value="mom" className="space-y-4">
            <MomSleepTracker 
              momProfile={momProfile}
              isTracking={isTrackingMom}
              currentSession={currentMomSession}
              onStartTracking={() => {
                setIsTrackingMom(true)
                setCurrentMomSession(new Date())
              }}
              onStopTracking={(quality, interruptions, notes) => {
                if (currentMomSession) {
                  const session: Omit<SleepSession, 'id'> = {
                    person: 'mom',
                    startTime: currentMomSession,
                    endTime: new Date(),
                    duration: Math.floor((Date.now() - currentMomSession.getTime()) / (1000 * 60)),
                    quality,
                    interruptions,
                    location: 'parent-bed',
                    notes
                  }
                  nutritionTracker.addSleepSession(session)
                }
                setIsTrackingMom(false)
                setCurrentMomSession(null)
              }}
              onAddManual={() => {
                setSelectedPerson('mom')
                setShowAddSleep(true)
              }}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <SleepInsights 
              momProfile={momProfile}
              babyProfile={babyProfile}
            />
          </TabsContent>
        </Tabs>

        {/* Add Manual Sleep Session Modal */}
        <AddSleepSessionModal 
          isOpen={showAddSleep}
          onClose={() => setShowAddSleep(false)}
          person={selectedPerson}
          onSave={(session) => {
            nutritionTracker.addSleepSession(session)
            setShowAddSleep(false)
          }}
        />
      </CardContent>
    </Card>
  )
}

interface BabySleepTrackerProps {
  babyProfile?: BabyProfile
  isTracking: boolean
  currentSession: Date | null
  onStartTracking: () => void
  onStopTracking: (quality: number, interruptions: number, notes?: string) => void
  onAddManual: () => void
}

function BabySleepTracker({ 
  babyProfile, 
  isTracking, 
  currentSession, 
  onStartTracking, 
  onStopTracking, 
  onAddManual 
}: BabySleepTrackerProps) {
  const [sleepSummary, setSleepSummary] = useState<DailySleepSummary[]>([])
  const [currentDuration, setCurrentDuration] = useState(0)

  // Update duration every minute when tracking
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking && currentSession) {
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - currentSession.getTime()) / (1000 * 60))
        setCurrentDuration(duration)
      }, 60000) // Update every minute
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, currentSession])

  useEffect(() => {
    const summary = nutritionTracker.getSleepSummary('baby', 7)
    setSleepSummary(summary)
  }, [])

  const todaySummary = sleepSummary.find(s => 
    s.date.toDateString() === new Date().toDateString()
  )

  const averageSleep = sleepSummary.length > 0 
    ? sleepSummary.reduce((sum, day) => sum + day.totalSleep, 0) / sleepSummary.length
    : 0

  const handleStopTracking = () => {
    // Simple form for quality and interruptions
    const quality = 4 as 1 | 2 | 3 | 4 | 5 // Default to good
    const interruptions = 1 // Default
    onStopTracking(quality, interruptions)
  }

  return (
    <div className="space-y-4">
      {/* Current Sleep Session */}
      <Card className="bg-baby-blue/10 border-baby-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-baby-blue">
            <span>
              <ToneFilteredText context="wellness">
                Baby's Sleep Session
              </ToneFilteredText>
            </span>
            {isTracking && (
              <Badge className="bg-baby-blue/20 text-baby-blue border-baby-blue/30 animate-pulse">
                Sleeping
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isTracking ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-baby-blue mb-2">
                  {formatDuration(currentDuration)}
                </div>
                <p className="text-sm text-gray-600">
                  <ToneFilteredText context="wellness">
                    {`Started at ${currentSession?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) || ''}`}
                  </ToneFilteredText>
                </p>
              </div>
              
              <Button 
                onClick={handleStopTracking}
                className="w-full bg-baby-blue hover:bg-baby-blue/90"
                size="lg"
              >
                <Pause className="w-4 h-4 mr-2" />
                <ToneFilteredText context="dashboard">
                  End Sleep Session
                </ToneFilteredText>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <Moon className="w-12 h-12 mx-auto mb-3 text-baby-blue/60" />
                <p className="text-gray-600 mb-4">
                  <ToneFilteredText context="wellness">
                    Track your baby's next sleep session
                  </ToneFilteredText>
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={onStartTracking}
                  className="bg-baby-blue hover:bg-baby-blue/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <ToneFilteredText context="dashboard">Start Sleep</ToneFilteredText>
                </Button>
                <Button 
                  onClick={onAddManual}
                  variant="outline"
                  className="border-baby-blue/20 text-baby-blue"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <ToneFilteredText context="dashboard">Add Manual</ToneFilteredText>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Sleep Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-mint/10 border-mint/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-mint font-medium">
              <ToneFilteredText context="wellness">Total Sleep Today</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mint">
              {todaySummary ? formatDuration(todaySummary.totalSleep) : '0h 0m'}
            </div>
            <p className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {`Night: ${todaySummary ? formatDuration(todaySummary.nightSleep) : '0h'} • Naps: ${todaySummary ? formatDuration(todaySummary.napTime) : '0h'}`}
              </ToneFilteredText>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-peach/10 border-peach/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-peach font-medium">
              <ToneFilteredText context="wellness">Sleep Quality</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-peach">
              {todaySummary ? `${todaySummary.averageQuality.toFixed(1)}/5` : 'N/A'}
            </div>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`w-3 h-3 ${
                    star <= (todaySummary?.averageQuality || 0) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Sleep Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-baby-blue" />
            <ToneFilteredText context="wellness">
              Weekly Sleep Pattern
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-linear-to-r from-baby-blue/10 to-mint/10 rounded-lg flex items-end justify-center p-4">
            <div className="flex items-end gap-2 h-full w-full">
              {sleepSummary.slice(0, 7).map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-linear-to-t from-baby-blue to-mint rounded-t"
                    style={{ 
                      height: `${Math.min((day.totalSleep / 720) * 100, 100)}%`, // 720 min = 12 hours max
                      minHeight: '10%'
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {day.date.toLocaleDateString([], { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>
              <ToneFilteredText context="wellness">7 days ago</ToneFilteredText>
            </span>
            <span>
              <ToneFilteredText context="wellness">Today</ToneFilteredText>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Recommendations for Baby */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            <ToneFilteredText context="wellness">
              Baby Sleep Tips
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Moon className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Consistent bedtime routines help babies develop healthy sleep patterns.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Sun className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Natural light during the day helps regulate your baby's circadian rhythm.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Every baby is different. Trust your instincts and be patient with the process.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MomSleepTrackerProps {
  momProfile?: MomProfile
  isTracking: boolean
  currentSession: Date | null
  onStartTracking: () => void
  onStopTracking: (quality: number, interruptions: number, notes?: string) => void
  onAddManual: () => void
}

function MomSleepTracker({ 
  momProfile, 
  isTracking, 
  currentSession, 
  onStartTracking, 
  onStopTracking, 
  onAddManual 
}: MomSleepTrackerProps) {
  const [sleepSummary, setSleepSummary] = useState<DailySleepSummary[]>([])
  const [currentDuration, setCurrentDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking && currentSession) {
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - currentSession.getTime()) / (1000 * 60))
        setCurrentDuration(duration)
      }, 60000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, currentSession])

  useEffect(() => {
    const summary = nutritionTracker.getSleepSummary('mom', 7)
    setSleepSummary(summary)
  }, [])

  const todaySummary = sleepSummary.find(s => 
    s.date.toDateString() === new Date().toDateString()
  )

  const weeklyAverage = sleepSummary.length > 0 
    ? sleepSummary.reduce((sum, day) => sum + day.totalSleep, 0) / sleepSummary.length
    : 0

  const sleepDebt = Math.max(0, (8 * 60) - (todaySummary?.totalSleep || 0)) // 8 hours target

  const handleStopTracking = () => {
    const quality = 3 as 1 | 2 | 3 | 4 | 5 // Default
    const interruptions = 2 // Default for new moms
    onStopTracking(quality, interruptions)
  }

  return (
    <div className="space-y-4">
      {/* Current Sleep Session */}
      <Card className="bg-lavender/10 border-lavender/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lavender">
            <span>
              <ToneFilteredText context="wellness">
                {`${momProfile?.name || 'Your'} Sleep Session`}
              </ToneFilteredText>
            </span>
            {isTracking && (
              <Badge className="bg-lavender/20 text-lavender border-lavender/30 animate-pulse">
                Resting
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isTracking ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-lavender mb-2">
                  {formatDuration(currentDuration)}
                </div>
                <p className="text-sm text-gray-600">
                  <ToneFilteredText context="wellness">
                    {`Rest started at ${currentSession?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}`}
                  </ToneFilteredText>
                </p>
              </div>
              
              <Button 
                onClick={handleStopTracking}
                className="w-full bg-lavender hover:bg-lavender/90"
                size="lg"
              >
                <Pause className="w-4 h-4 mr-2" />
                <ToneFilteredText context="dashboard">
                  End Rest Session
                </ToneFilteredText>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <Heart className="w-12 h-12 mx-auto mb-3 text-lavender/60" />
                <p className="text-gray-600 mb-4">
                  <ToneFilteredText context="wellness">
                    You deserve rest. Track your sleep to prioritize your wellbeing.
                  </ToneFilteredText>
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={onStartTracking}
                  className="bg-lavender hover:bg-lavender/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <ToneFilteredText context="dashboard">Start Rest</ToneFilteredText>
                </Button>
                <Button 
                  onClick={onAddManual}
                  variant="outline"
                  className="border-lavender/20 text-lavender"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <ToneFilteredText context="dashboard">Add Manual</ToneFilteredText>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mom's Sleep Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-peach/10 border-peach/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-peach font-medium">
              <ToneFilteredText context="wellness">Total Sleep Today</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-peach">
              {todaySummary ? formatDuration(todaySummary.totalSleep) : '0h 0m'}
            </div>
            <p className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {`Target: 8 hours • Weekly avg: ${formatDuration(weeklyAverage)}`}
              </ToneFilteredText>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-mint/10 border-mint/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-mint font-medium">
              <ToneFilteredText context="wellness">Sleep Efficiency</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mint">
              {todaySummary ? `${Math.round(todaySummary.sleepEfficiency)}%` : 'N/A'}
            </div>
            <p className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {`${todaySummary?.wakeUps || 0} night wake-ups`}
              </ToneFilteredText>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Debt Alert */}
      {sleepDebt > 60 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium text-orange-800">
                  <ToneFilteredText context="wellness">
                    Sleep Debt Alert
                  </ToneFilteredText>
                </p>
                <p className="text-sm text-orange-600">
                  <ToneFilteredText context="wellness">
                    {`You need ${formatDuration(sleepDebt)} more rest to reach your daily goal. Consider a nap if possible.`}
                  </ToneFilteredText>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Sleep Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-lavender" />
            <ToneFilteredText context="wellness">
              Sleep Quality Trend
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-linear-to-r from-lavender/10 to-peach/10 rounded-lg flex items-end justify-center p-4">
            <div className="flex items-end gap-2 h-full w-full">
              {sleepSummary.slice(0, 7).map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-linear-to-t from-lavender to-peach rounded-t"
                    style={{ 
                      height: `${(day.averageQuality / 5) * 100}%`,
                      minHeight: '20%'
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {day.date.toLocaleDateString([], { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mom Sleep Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">
            <ToneFilteredText context="wellness">
              Self-Care Sleep Tips
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  "Sleep when the baby sleeps" isn't just advice - it's essential self-care.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Even 20-30 minute power naps can significantly boost your energy and mood.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Ask for help with night duties. Taking turns allows for better rest for everyone.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SleepInsightsProps {
  momProfile?: MomProfile
  babyProfile?: BabyProfile
}

function SleepInsights({ momProfile, babyProfile }: SleepInsightsProps) {
  const [momSummary, setMomSummary] = useState<DailySleepSummary[]>([])
  const [babySummary, setBabySummary] = useState<DailySleepSummary[]>([])

  useEffect(() => {
    setMomSummary(nutritionTracker.getSleepSummary('mom', 14))
    setBabySummary(nutritionTracker.getSleepSummary('baby', 14))
  }, [])

  const momAvgSleep = momSummary.length > 0 
    ? momSummary.reduce((sum, day) => sum + day.totalSleep, 0) / momSummary.length
    : 0

  const babyAvgSleep = babySummary.length > 0 
    ? babySummary.reduce((sum, day) => sum + day.totalSleep, 0) / babySummary.length
    : 0

  const momSleepScore = Math.min((momAvgSleep / (8 * 60)) * 100, 100) // 8 hours target
  const babySleepScore = Math.min((babyAvgSleep / (12 * 60)) * 100, 100) // 12 hours target

  const correlationInsights = analyzeSleepCorrelation(momSummary, babySummary)

  return (
    <div className="space-y-4">
      {/* Sleep Score Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-lavender/10 border-lavender/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lavender text-lg">
              <ToneFilteredText context="wellness">
                Mom's Sleep Score
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-lavender mb-2">
              {Math.round(momSleepScore)}%
            </div>
            <Progress value={momSleepScore} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {`Average: ${formatDuration(momAvgSleep)} per night`}
              </ToneFilteredText>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-baby-blue/10 border-baby-blue/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-baby-blue text-lg">
              <ToneFilteredText context="wellness">
                Baby's Sleep Score
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-baby-blue mb-2">
              {Math.round(babySleepScore)}%
            </div>
            <Progress value={babySleepScore} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {`Average: ${formatDuration(babyAvgSleep)} per day`}
              </ToneFilteredText>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Pattern Correlation */}
      <Card className="bg-mint/10 border-mint/20">
        <CardHeader>
          <CardTitle className="text-mint">
            <ToneFilteredText context="wellness">
              Sleep Pattern Insights
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlationInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.type === 'positive' ? 'bg-green-500' : 
                  insight.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-800">{insight.title}</p>
                  <p className="text-sm text-gray-600">
                    <ToneFilteredText context="wellness">
                      {insight.description}
                    </ToneFilteredText>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep Environment Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            <ToneFilteredText context="wellness">
              Optimizing Sleep Environment
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Moon className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Keep the room cool (65-68°F) and dark for better sleep quality for both mom and baby.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  White noise machines can help both you and baby sleep through minor disturbances.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Consider room-sharing for the first 6 months to make nighttime feeding easier.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <ToneFilteredText context="wellness">
              Two-Week Sleep Comparison
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-linear-to-r from-lavender/10 to-baby-blue/10 rounded-lg p-4">
            <div className="h-full flex items-end justify-between">
              {/* Simple visualization showing mom vs baby sleep over time */}
              <div className="flex-1 flex items-end gap-1">
                {momSummary.slice(0, 14).map((day, index) => (
                  <div key={`mom-${index}`} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-lavender rounded-t"
                      style={{ 
                        height: `${Math.min((day.totalSleep / (10 * 60)) * 100, 100)}%`,
                        minHeight: '10%'
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="w-4" /> {/* Spacer */}
              <div className="flex-1 flex items-end gap-1">
                {babySummary.slice(0, 14).map((day, index) => (
                  <div key={`baby-${index}`} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-baby-blue rounded-t"
                      style={{ 
                        height: `${Math.min((day.totalSleep / (15 * 60)) * 100, 100)}%`,
                        minHeight: '10%'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>
              <span className="inline-block w-3 h-3 bg-lavender rounded mr-1" />
              Mom's Sleep
            </span>
            <span>
              <span className="inline-block w-3 h-3 bg-baby-blue rounded mr-1" />
              Baby's Sleep
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to analyze sleep correlation
function analyzeSleepCorrelation(momSummary: DailySleepSummary[], babySummary: DailySleepSummary[]) {
  const insights = []

  if (momSummary.length > 0 && babySummary.length > 0) {
    const momAvgQuality = momSummary.reduce((sum, day) => sum + day.averageQuality, 0) / momSummary.length
    const babyAvgQuality = babySummary.reduce((sum, day) => sum + day.averageQuality, 0) / babySummary.length

    if (momAvgQuality < 3 || babyAvgQuality < 3) {
      insights.push({
        type: 'warning' as const,
        title: 'Sleep Quality Needs Attention',
        description: 'Both mom and baby could benefit from sleep environment improvements and routine adjustments.'
      })
    }

    const momAvgWakeUps = momSummary.reduce((sum, day) => sum + day.wakeUps, 0) / momSummary.length
    const babyAvgWakeUps = babySummary.reduce((sum, day) => sum + day.wakeUps, 0) / babySummary.length

    if (momAvgWakeUps > 3 && babyAvgWakeUps > 4) {
      insights.push({
        type: 'info' as const,
        title: 'Frequent Night Wakings',
        description: 'Consider sleep training methods or consulting with your pediatrician about sleep patterns.'
      })
    }

    if (momAvgQuality >= 4 && babyAvgQuality >= 4) {
      insights.push({
        type: 'positive' as const,
        title: 'Great Sleep Patterns!',
        description: 'Both you and baby are getting quality rest. Keep up the excellent sleep hygiene!'
      })
    }
  }

  if (insights.length === 0) {
    insights.push({
      type: 'info' as const,
      title: 'Building Sleep Data',
      description: 'Continue tracking to get personalized insights about your family\'s sleep patterns.'
    })
  }

  return insights
}

// Add Sleep Session Modal Component
interface AddSleepSessionModalProps {
  isOpen: boolean
  onClose: () => void
  person: 'mom' | 'baby'
  onSave: (session: Omit<SleepSession, 'id'>) => void
}

function AddSleepSessionModal({ isOpen, onClose, person, onSave }: AddSleepSessionModalProps) {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [quality, setQuality] = useState([3])
  const [interruptions, setInterruptions] = useState('')
  const [location, setLocation] = useState<'crib' | 'parent-bed' | 'bassinet' | 'other'>('crib')
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    if (!startTime || !endTime) return

    const start = new Date(`${new Date().toDateString()} ${startTime}`)
    const end = new Date(`${new Date().toDateString()} ${endTime}`)
    
    if (end <= start) {
      // Handle next day scenario
      end.setDate(end.getDate() + 1)
    }

    const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60))

    const session: Omit<SleepSession, 'id'> = {
      person,
      startTime: start,
      endTime: end,
      duration,
      quality: quality[0] as 1 | 2 | 3 | 4 | 5,
      interruptions: parseInt(interruptions) || 0,
      location,
      notes: notes || undefined
    }

    onSave(session)
    
    // Reset form
    setStartTime('')
    setEndTime('')
    setQuality([3])
    setInterruptions('')
    setNotes('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <ToneFilteredText context="wellness">
              {`Add ${person === 'mom' ? 'Mom\'s' : 'Baby\'s'} Sleep Session`}
            </ToneFilteredText>
          </DialogTitle>
          <DialogDescription>
            <ToneFilteredText context="wellness">
              Log a completed sleep session manually
            </ToneFilteredText>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                <ToneFilteredText context="wellness">Start Time</ToneFilteredText>
              </Label>
              <Input 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label>
                <ToneFilteredText context="wellness">End Time</ToneFilteredText>
              </Label>
              <Input 
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">
              <ToneFilteredText context="wellness">
                {`Sleep Quality: ${quality[0]}/5`}
              </ToneFilteredText>
            </Label>
            <Slider
              value={quality}
              onValueChange={setQuality}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Great</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Night Wake-ups</ToneFilteredText>
            </Label>
            <Input 
              type="number"
              min="0"
              value={interruptions}
              onChange={(e) => setInterruptions(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Sleep Location</ToneFilteredText>
            </Label>
            <Select value={location} onValueChange={(value: any) => setLocation(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crib">Crib</SelectItem>
                <SelectItem value="parent-bed">Parent's Bed</SelectItem>
                <SelectItem value="bassinet">Bassinet</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Notes (optional)</ToneFilteredText>
            </Label>
            <Textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any observations about this sleep session..."
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <ToneFilteredText context="dashboard">Cancel</ToneFilteredText>
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-lavender hover:bg-lavender/90"
              disabled={!startTime || !endTime}
            >
              <ToneFilteredText context="dashboard">Save Sleep Session</ToneFilteredText>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SleepTracker