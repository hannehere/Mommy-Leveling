/**
 * Baby Nutrition & Feeding Tracker Components
 * Comprehensive feeding tracking, growth monitoring, and milestone tracking for babies
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
import { 
  Baby, 
  Clock, 
  Droplets, 
  Heart, 
  TrendingUp, 
  Apple, 
  Timer, 
  Calendar,
  Plus,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Zap,
  Moon
} from 'lucide-react'
import { 
  nutritionTracker, 
  FeedingSession, 
  BabyGrowthRecord, 
  BabyProfile,
  formatDuration,
  calculateAge,
  getAgeAppropriateFeeding
} from '@/lib/nutrition-wellness-tracker'

interface BabyNutritionTrackerProps {
  babyProfile?: BabyProfile
  className?: string
}

export function BabyNutritionTracker({ babyProfile, className = '' }: BabyNutritionTrackerProps) {
  const [activeTab, setActiveTab] = useState<'feeding' | 'growth' | 'milestones'>('feeding')
  const [feedingHistory, setFeedingHistory] = useState<FeedingSession[]>([])
  const [showAddFeeding, setShowAddFeeding] = useState(false)
  const [showAddGrowth, setShowAddGrowth] = useState(false)

  useEffect(() => {
    // Load feeding history
    const history = nutritionTracker.getFeedingHistory(7)
    setFeedingHistory(history)
  }, [])

  if (!babyProfile) {
    return (
      <Card className={`bg-linear-to-br from-baby-blue/10 to-mint/10 border-baby-blue/20 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-baby-blue">
            <Baby className="w-6 h-6" />
            <ToneFilteredText context="wellness">
              Baby Nutrition Tracker
            </ToneFilteredText>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              Please set up your baby's profile to start tracking nutrition and growth
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-baby-blue hover:bg-baby-blue/90">
            <ToneFilteredText context="dashboard">
              Create Baby Profile
            </ToneFilteredText>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const babyAge = calculateAge(babyProfile.birthDate)
  const ageAppropriateFeeds = getAgeAppropriateFeeding(babyAge.months)

  return (
    <Card className={`bg-linear-to-br from-baby-blue/10 to-mint/10 border-baby-blue/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-baby-blue">
          <Baby className="w-6 h-6" />
          <ToneFilteredText context="wellness">
            {babyProfile.name}'s Nutrition Tracker
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="wellness">
            {`${babyAge.months} months, ${babyAge.weeks % 4} weeks old`}
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feeding" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Feeding
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Growth
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Milestones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feeding" className="space-y-4">
            <FeedingTracker 
              babyProfile={babyProfile} 
              feedingHistory={feedingHistory}
              onAddFeeding={() => setShowAddFeeding(true)}
            />
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <GrowthTracker 
              babyProfile={babyProfile}
              onAddRecord={() => setShowAddGrowth(true)}
            />
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <MilestoneTracker babyProfile={babyProfile} />
          </TabsContent>
        </Tabs>

        {/* Add Feeding Modal */}
        <AddFeedingModal 
          isOpen={showAddFeeding}
          onClose={() => setShowAddFeeding(false)}
          onSave={(feeding) => {
            nutritionTracker.addFeedingSession(feeding)
            setFeedingHistory(nutritionTracker.getFeedingHistory(7))
            setShowAddFeeding(false)
          }}
          ageAppropriateFeeds={ageAppropriateFeeds}
        />

        {/* Add Growth Record Modal */}
        <AddGrowthModal 
          isOpen={showAddGrowth}
          onClose={() => setShowAddGrowth(false)}
          onSave={(growth) => {
            nutritionTracker.addGrowthRecord(growth)
            setShowAddGrowth(false)
          }}
        />
      </CardContent>
    </Card>
  )
}

interface FeedingTrackerProps {
  babyProfile: BabyProfile
  feedingHistory: FeedingSession[]
  onAddFeeding: () => void
}

function FeedingTracker({ babyProfile, feedingHistory, onAddFeeding }: FeedingTrackerProps) {
  const todayFeedings = feedingHistory.filter(f => 
    f.timestamp.toDateString() === new Date().toDateString()
  )

  const lastFeeding = feedingHistory[0]
  const nextFeedingTime = lastFeeding 
    ? new Date(lastFeeding.timestamp.getTime() + (3 * 60 * 60 * 1000)) // 3 hours later
    : null

  const avgInterval = feedingHistory.length > 1 
    ? feedingHistory.slice(0, -1).reduce((sum, feeding, i) => {
        const interval = feeding.timestamp.getTime() - feedingHistory[i + 1].timestamp.getTime()
        return sum + (interval / (1000 * 60 * 60)) // hours
      }, 0) / (feedingHistory.length - 1)
    : 0

  return (
    <div className="space-y-4">
      {/* Today's Summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-mint/10 border-mint/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-mint font-medium">
              <ToneFilteredText context="wellness">Today's Feedings</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mint">{todayFeedings.length}</div>
            {avgInterval > 0 && (
              <p className="text-sm text-gray-600">
                <ToneFilteredText context="wellness">
                  {`Avg ${Math.round(avgInterval * 10) / 10}h intervals`}
                </ToneFilteredText>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-baby-blue/10 border-baby-blue/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-baby-blue font-medium">
              <ToneFilteredText context="wellness">Last Feeding</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lastFeeding ? (
              <div>
                <div className="text-2xl font-bold text-baby-blue">
                  {formatDuration(Math.floor((Date.now() - lastFeeding.timestamp.getTime()) / (1000 * 60)))} ago
                </div>
                <p className="text-sm text-gray-600 capitalize">
                  {lastFeeding.type.replace('-', ' ')}
                </p>
              </div>
            ) : (
              <div className="text-gray-500">
                <ToneFilteredText context="wellness">
                  No feedings recorded yet
                </ToneFilteredText>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Next Feeding Reminder */}
      {nextFeedingTime && (
        <Card className="bg-peach/10 border-peach/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-peach" />
                <div>
                  <p className="font-medium text-peach">
                    <ToneFilteredText context="wellness">
                      Next feeding reminder
                    </ToneFilteredText>
                  </p>
                  <p className="text-sm text-gray-600">
                    {nextFeedingTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-peach/20 text-peach border-peach/30">
                {nextFeedingTime < new Date() ? 'Due now' : 'Upcoming'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Feeding Button */}
      <Button onClick={onAddFeeding} className="w-full bg-baby-blue hover:bg-baby-blue/90">
        <Plus className="w-4 h-4 mr-2" />
        <ToneFilteredText context="dashboard">
          Log New Feeding
        </ToneFilteredText>
      </Button>

      {/* Recent Feeding History */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-800">
          <ToneFilteredText context="wellness">
            Recent Feedings
          </ToneFilteredText>
        </h4>
        {feedingHistory.slice(0, 5).map((feeding) => (
          <Card key={feeding.id} className="bg-white/50 border-gray-200">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-baby-blue" />
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {feeding.type.replace('-', ' ')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {feeding.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {feeding.duration && (
                    <p className="text-sm text-gray-600">
                      {formatDuration(feeding.duration)}
                    </p>
                  )}
                  {feeding.amount && (
                    <p className="text-sm text-gray-600">
                      {feeding.amount}ml
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    {feeding.babyMood === 'content' && <Smile className="w-3 h-3 text-green-500" />}
                    {feeding.babyMood === 'fussy' && <Frown className="w-3 h-3 text-orange-500" />}
                    {feeding.babyMood === 'sleepy' && <Moon className="w-3 h-3 text-blue-500" />}
                    {feeding.babyMood === 'alert' && <Zap className="w-3 h-3 text-yellow-500" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface GrowthTrackerProps {
  babyProfile: BabyProfile
  onAddRecord: () => void
}

function GrowthTracker({ babyProfile, onAddRecord }: GrowthTrackerProps) {
  const [growthHistory, setGrowthHistory] = useState<BabyGrowthRecord[]>([])

  useEffect(() => {
    const history = nutritionTracker.getGrowthTrend(6)
    setGrowthHistory(history)
  }, [])

  const latestRecord = growthHistory[growthHistory.length - 1]
  const previousRecord = growthHistory[growthHistory.length - 2]

  const weightGain = latestRecord && previousRecord 
    ? latestRecord.weight - previousRecord.weight 
    : 0

  const heightGain = latestRecord && previousRecord 
    ? latestRecord.height - previousRecord.height 
    : 0

  return (
    <div className="space-y-4">
      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-mint/10 border-mint/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-mint font-medium">
              <ToneFilteredText context="wellness">Current Weight</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mint">
              {latestRecord ? `${latestRecord.weight}kg` : `${babyProfile.currentWeight}kg`}
            </div>
            {weightGain !== 0 && (
              <p className="text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-600">+{weightGain.toFixed(1)}kg</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-baby-blue/10 border-baby-blue/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-baby-blue font-medium">
              <ToneFilteredText context="wellness">Current Height</ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-baby-blue">
              {latestRecord ? `${latestRecord.height}cm` : `${babyProfile.currentHeight}cm`}
            </div>
            {heightGain !== 0 && (
              <p className="text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-600">+{heightGain.toFixed(1)}cm</span>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Growth Percentiles */}
      {latestRecord && (
        <Card className="bg-peach/10 border-peach/20">
          <CardHeader>
            <CardTitle className="text-peach">
              <ToneFilteredText context="wellness">
                Growth Percentiles
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Weight Percentile</span>
                <span className="font-medium">{latestRecord.percentiles.weight}%</span>
              </div>
              <Progress value={latestRecord.percentiles.weight} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Height Percentile</span>
                <span className="font-medium">{latestRecord.percentiles.height}%</span>
              </div>
              <Progress value={latestRecord.percentiles.height} className="h-2" />
            </div>
            {latestRecord.percentiles.headCircumference && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Head Circumference</span>
                  <span className="font-medium">{latestRecord.percentiles.headCircumference}%</span>
                </div>
                <Progress value={latestRecord.percentiles.headCircumference} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Record Button */}
      <Button onClick={onAddRecord} className="w-full bg-mint hover:bg-mint/90">
        <Plus className="w-4 h-4 mr-2" />
        <ToneFilteredText context="dashboard">
          Record New Measurements
        </ToneFilteredText>
      </Button>

      {/* Growth Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle>
            <ToneFilteredText context="wellness">
              Growth Trend
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-linear-to-r from-mint/10 to-baby-blue/10 rounded-lg flex items-end justify-center p-4">
            <div className="flex items-end gap-2 h-full">
              {growthHistory.slice(-6).map((record, index) => (
                <div 
                  key={record.id}
                  className="bg-linear-to-t from-mint to-baby-blue rounded-t flex-1"
                  style={{ 
                    height: `${Math.min((record.weight / 15) * 100, 100)}%`,
                    minHeight: '20%'
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            <ToneFilteredText context="wellness">
              Weight trend over the last 6 months
            </ToneFilteredText>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

interface MilestoneTrackerProps {
  babyProfile: BabyProfile
}

function MilestoneTracker({ babyProfile }: MilestoneTrackerProps) {
  const babyAge = calculateAge(babyProfile.birthDate)
  
  // Sample milestones based on age
  const milestones = [
    { name: 'First smile', expectedAge: 2, category: 'social', achieved: babyAge.months >= 2 },
    { name: 'Holds head up', expectedAge: 3, category: 'motor', achieved: babyAge.months >= 3 },
    { name: 'Laughs out loud', expectedAge: 4, category: 'social', achieved: babyAge.months >= 4 },
    { name: 'Rolls over', expectedAge: 5, category: 'motor', achieved: babyAge.months >= 5 },
    { name: 'Sits without support', expectedAge: 6, category: 'motor', achieved: babyAge.months >= 6 },
    { name: 'Says first words', expectedAge: 12, category: 'language', achieved: false },
    { name: 'Takes first steps', expectedAge: 14, category: 'motor', achieved: false },
  ]

  const achievedCount = milestones.filter(m => m.achieved).length
  const upcomingMilestones = milestones.filter(m => !m.achieved && m.expectedAge <= babyAge.months + 2)

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="bg-linear-to-r from-peach/10 to-lavender/10 border-peach/20">
        <CardHeader>
          <CardTitle className="text-peach">
            <ToneFilteredText context="wellness">
              Development Progress
            </ToneFilteredText>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              {`${achievedCount} of ${milestones.length} milestones achieved`}
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress 
            value={(achievedCount / milestones.length) * 100} 
            className="h-3 mb-2"
          />
          <p className="text-sm text-gray-600">
            <ToneFilteredText context="wellness">
              Your little one is developing beautifully!
            </ToneFilteredText>
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      {upcomingMilestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <ToneFilteredText context="wellness">
                Upcoming Milestones
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div>
                  <p className="font-medium text-gray-800">{milestone.name}</p>
                  <p className="text-sm text-gray-600">
                    Expected around {milestone.expectedAge} months
                  </p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  {milestone.category}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* All Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>
            <ToneFilteredText context="wellness">
              All Milestones
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                milestone.achieved 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {milestone.achieved && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <p className={`font-medium ${
                    milestone.achieved ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {milestone.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {milestone.expectedAge} months • {milestone.category}
                  </p>
                </div>
              </div>
              {milestone.achieved && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Achieved ✓
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Modal Components
interface AddFeedingModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (feeding: Omit<FeedingSession, 'id'>) => void
  ageAppropriateFeeds: string[]
}

function AddFeedingModal({ isOpen, onClose, onSave, ageAppropriateFeeds }: AddFeedingModalProps) {
  const [feedingType, setFeedingType] = useState<'breast' | 'bottle-formula' | 'bottle-breast-milk' | 'solid-food'>('breast')
  const [duration, setDuration] = useState('')
  const [amount, setAmount] = useState('')
  const [breast, setBreast] = useState<'left' | 'right' | 'both'>('left')
  const [babyMood, setBabyMood] = useState<'content' | 'fussy' | 'sleepy' | 'alert'>('content')
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    const feeding: Omit<FeedingSession, 'id'> = {
      timestamp: new Date(),
      type: feedingType,
      duration: duration ? parseInt(duration) : undefined,
      amount: amount ? parseInt(amount) : undefined,
      breast: feedingType === 'breast' ? breast : undefined,
      babyMood,
      notes: notes || undefined
    }
    
    onSave(feeding)
    
    // Reset form
    setDuration('')
    setAmount('')
    setNotes('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <ToneFilteredText context="wellness">
              Log New Feeding
            </ToneFilteredText>
          </DialogTitle>
          <DialogDescription>
            <ToneFilteredText context="wellness">
              Record your baby's feeding session
            </ToneFilteredText>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Feeding Type */}
          <div>
            <Label>
              <ToneFilteredText context="wellness">Feeding Type</ToneFilteredText>
            </Label>
            <Select value={feedingType} onValueChange={(value: any) => setFeedingType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breast">Breastfeeding</SelectItem>
                <SelectItem value="bottle-formula">Bottle - Formula</SelectItem>
                <SelectItem value="bottle-breast-milk">Bottle - Breast Milk</SelectItem>
                <SelectItem value="solid-food">Solid Food</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration for breastfeeding */}
          {feedingType === 'breast' && (
            <>
              <div>
                <Label>
                  <ToneFilteredText context="wellness">Duration (minutes)</ToneFilteredText>
                </Label>
                <Input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="15"
                />
              </div>
              <div>
                <Label>
                  <ToneFilteredText context="wellness">Breast</ToneFilteredText>
                </Label>
                <Select value={breast} onValueChange={(value: any) => setBreast(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Amount for bottles */}
          {(feedingType === 'bottle-formula' || feedingType === 'bottle-breast-milk') && (
            <div>
              <Label>
                <ToneFilteredText context="wellness">Amount (ml)</ToneFilteredText>
              </Label>
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="120"
              />
            </div>
          )}

          {/* Baby's Mood */}
          <div>
            <Label>
              <ToneFilteredText context="wellness">Baby's Mood After</ToneFilteredText>
            </Label>
            <Select value={babyMood} onValueChange={(value: any) => setBabyMood(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="content">😊 Content</SelectItem>
                <SelectItem value="fussy">😤 Fussy</SelectItem>
                <SelectItem value="sleepy">😴 Sleepy</SelectItem>
                <SelectItem value="alert">⚡ Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label>
              <ToneFilteredText context="wellness">Notes (optional)</ToneFilteredText>
            </Label>
            <Textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional observations..."
              rows={2}
            />
          </div>

          {/* Age-appropriate feeding info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-3">
              <p className="text-sm font-medium text-blue-800 mb-2">
                <ToneFilteredText context="wellness">
                  Age-appropriate feeding:
                </ToneFilteredText>
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                {ageAppropriateFeeds.map((feed, index) => (
                  <li key={index}>• {feed}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <ToneFilteredText context="dashboard">Cancel</ToneFilteredText>
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-baby-blue hover:bg-baby-blue/90">
              <ToneFilteredText context="dashboard">Save Feeding</ToneFilteredText>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface AddGrowthModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (growth: Omit<BabyGrowthRecord, 'id'>) => void
}

function AddGrowthModal({ isOpen, onClose, onSave }: AddGrowthModalProps) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [headCircumference, setHeadCircumference] = useState('')
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    const growth: Omit<BabyGrowthRecord, 'id'> = {
      date: new Date(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: headCircumference ? parseFloat(headCircumference) : undefined,
      percentiles: {
        weight: Math.random() * 100, // In real app, calculate from growth charts
        height: Math.random() * 100,
        headCircumference: headCircumference ? Math.random() * 100 : undefined
      },
      notes: notes || undefined
    }
    
    onSave(growth)
    
    // Reset form
    setWeight('')
    setHeight('')
    setHeadCircumference('')
    setNotes('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <ToneFilteredText context="wellness">
              Record Growth Measurements
            </ToneFilteredText>
          </DialogTitle>
          <DialogDescription>
            <ToneFilteredText context="wellness">
              Add your baby's latest measurements
            </ToneFilteredText>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>
              <ToneFilteredText context="wellness">Weight (kg)</ToneFilteredText>
            </Label>
            <Input 
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="7.2"
            />
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Height (cm)</ToneFilteredText>
            </Label>
            <Input 
              type="number" 
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="68.5"
            />
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Head Circumference (cm) - Optional</ToneFilteredText>
            </Label>
            <Input 
              type="number" 
              step="0.1"
              value={headCircumference}
              onChange={(e) => setHeadCircumference(e.target.value)}
              placeholder="42.0"
            />
          </div>

          <div>
            <Label>
              <ToneFilteredText context="wellness">Notes (optional)</ToneFilteredText>
            </Label>
            <Textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any observations about growth or development..."
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <ToneFilteredText context="dashboard">Cancel</ToneFilteredText>
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-mint hover:bg-mint/90"
              disabled={!weight || !height}
            >
              <ToneFilteredText context="dashboard">Save Measurements</ToneFilteredText>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BabyNutritionTracker