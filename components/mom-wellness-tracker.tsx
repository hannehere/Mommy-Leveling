/**
 * Mom Wellness & Nutrition Tracker Components
 * Comprehensive wellness tracking for mothers including nutrition, hydration, mood, energy, and recovery
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
  Heart, 
  Droplets, 
  Utensils, 
  Brain, 
  Zap, 
  Clock, 
  Calendar,
  Plus,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  AlertTriangle,
  CheckCircle,
  Target,
  Award,
  Moon,
  Sun
} from 'lucide-react'
import { 
  nutritionTracker, 
  MomNutritionEntry, 
  MomProfile,
  HealthGoal
} from '@/lib/nutrition-wellness-tracker'

interface MomWellnessTrackerProps {
  momProfile?: MomProfile
  className?: string
}

export function MomWellnessTracker({ momProfile, className = '' }: MomWellnessTrackerProps) {
  const [activeTab, setActiveTab] = useState<'nutrition' | 'hydration' | 'mood' | 'goals'>('nutrition')
  const [nutritionHistory, setNutritionHistory] = useState<MomNutritionEntry[]>([])
  const [todayEntry, setTodayEntry] = useState<MomNutritionEntry | null>(null)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)

  useEffect(() => {
    // Load nutrition history
    const history = nutritionTracker.getNutritionHistory(30)
    setNutritionHistory(history)
    
    // Find today's entry
    const today = history.find(entry => 
      entry.date.toDateString() === new Date().toDateString()
    )
    setTodayEntry(today || null)
  }, [])

  if (!momProfile) {
    return (
      <Card className={`bg-linear-to-br from-peach/10 to-lavender/10 border-peach/20 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-peach">
            <Heart className="w-6 h-6" />
            <ToneFilteredText context="wellness">
              Mom Wellness Tracker
            </ToneFilteredText>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              Please set up your profile to start tracking your wellness journey
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-peach hover:bg-peach/90">
            <ToneFilteredText context="dashboard">
              Create Mom Profile
            </ToneFilteredText>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const analytics = nutritionTracker.generateHealthAnalytics('week')

  return (
    <Card className={`bg-linear-to-br from-peach/10 to-lavender/10 border-peach/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-peach">
          <Heart className="w-6 h-6" />
          <ToneFilteredText context="wellness">
            {`${momProfile.name}'s Wellness Journey`}
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="wellness">
            Track your nutrition, hydration, mood, and recovery
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="nutrition" className="flex items-center gap-1">
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="hydration" className="flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">Hydration</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-4">
            <NutritionTracker 
              momProfile={momProfile}
              todayEntry={todayEntry}
              nutritionHistory={nutritionHistory}
              analytics={analytics}
              onAddEntry={() => setShowAddEntry(true)}
            />
          </TabsContent>

          <TabsContent value="hydration" className="space-y-4">
            <HydrationTracker 
              todayEntry={todayEntry}
              nutritionHistory={nutritionHistory}
              analytics={analytics}
            />
          </TabsContent>

          <TabsContent value="mood" className="space-y-4">
            <MoodEnergyTracker 
              todayEntry={todayEntry}
              nutritionHistory={nutritionHistory}
              analytics={analytics}
            />
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <WellnessGoalsTracker 
              onAddGoal={() => setShowAddGoal(true)}
            />
          </TabsContent>
        </Tabs>

        {/* Add Nutrition Entry Modal */}
        <AddNutritionModal 
          isOpen={showAddEntry}
          onClose={() => setShowAddEntry(false)}
          onSave={(entry) => {
            nutritionTracker.addNutritionEntry(entry)
            const history = nutritionTracker.getNutritionHistory(30)
            setNutritionHistory(history)
            const today = history.find(e => 
              e.date.toDateString() === new Date().toDateString()
            )
            setTodayEntry(today || null)
            setShowAddEntry(false)
          }}
          existingEntry={todayEntry}
        />

        {/* Add Wellness Goal Modal */}
        <AddWellnessGoalModal 
          isOpen={showAddGoal}
          onClose={() => setShowAddGoal(false)}
          onSave={(goal) => {
            nutritionTracker.createHealthGoal(goal)
            setShowAddGoal(false)
          }}
        />
      </CardContent>
    </Card>
  )
}

interface NutritionTrackerProps {
  momProfile: MomProfile
  todayEntry: MomNutritionEntry | null
  nutritionHistory: MomNutritionEntry[]
  analytics: any
  onAddEntry: () => void
}

function NutritionTracker({ momProfile, todayEntry, nutritionHistory, analytics, onAddEntry }: NutritionTrackerProps) {
  const nutritionScore = analytics.momWellness.nutritionScore
  const weeklyAverage = nutritionHistory.slice(0, 7).reduce((sum, entry) => {
    let dayScore = 0
    // Calculate basic nutrition score
    const meals = [entry.meals.breakfast, entry.meals.lunch, entry.meals.dinner].filter(Boolean).length
    dayScore += (meals / 3) * 100
    return sum + dayScore
  }, 0) / Math.min(nutritionHistory.length, 7)

  return (
    <div className="space-y-4">
      {/* Nutrition Score Overview */}
      <Card className="bg-peach/10 border-peach/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-peach">
              <ToneFilteredText context="wellness">
                Weekly Nutrition Score
              </ToneFilteredText>
            </span>
            <Badge variant="outline" className="bg-peach/20 text-peach border-peach/30">
              {`${nutritionScore}/100`}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={nutritionScore} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">
            <ToneFilteredText context="wellness">
              {nutritionScore >= 80 
                ? "You're nourishing yourself beautifully!" 
                : nutritionScore >= 60 
                ? "Good progress! Small improvements make a big difference." 
                : "Every meal is a chance to care for yourself. You're doing great."
              }
            </ToneFilteredText>
          </p>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <ToneFilteredText context="wellness">
              Today's Meals
            </ToneFilteredText>
            <Button onClick={onAddEntry} size="sm" className="bg-peach hover:bg-peach/90">
              <Plus className="w-4 h-4 mr-1" />
              <ToneFilteredText context="dashboard">Add</ToneFilteredText>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayEntry ? (
            <div className="space-y-3">
              <MealCard title="Breakfast" meal={todayEntry.meals.breakfast} />
              <MealCard title="Lunch" meal={todayEntry.meals.lunch} />
              <MealCard title="Dinner" meal={todayEntry.meals.dinner} />
              {todayEntry.meals.snacks && todayEntry.meals.snacks.length > 0 && (
                <MealCard title="Snacks" meal={todayEntry.meals.snacks[0]} />
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Utensils className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>
                <ToneFilteredText context="wellness">
                  No meals logged today yet. Start by adding your first meal!
                </ToneFilteredText>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vitamin & Supplement Tracking */}
      {todayEntry && (
        <Card>
          <CardHeader>
            <CardTitle>
              <ToneFilteredText context="wellness">
                Vitamins & Supplements
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {todayEntry.vitamins.map((vitamin, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    vitamin.taken 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{vitamin.name}</span>
                    {vitamin.taken ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  {vitamin.taken && vitamin.time && (
                    <p className="text-xs text-gray-500 mt-1">
                      {vitamin.time.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nutrition Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">
            <ToneFilteredText context="wellness">
              Personalized Nutrition Tips
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {momProfile.isBreastfeeding && (
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">
                  <ToneFilteredText context="wellness">
                    As a breastfeeding mom, aim for an extra 300-500 calories daily from nutritious sources.
                  </ToneFilteredText>
                </p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Droplets className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Iron-rich foods like leafy greens and lean meats support your energy and recovery.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Sun className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Don't forget healthy fats from avocados, nuts, and fish for brain health and hormone balance.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MealCardProps {
  title: string
  meal?: any
}

function MealCard({ title, meal }: MealCardProps) {
  return (
    <div className={`p-3 rounded-lg border ${
      meal ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{title}</span>
        {meal ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
        )}
      </div>
      {meal && (
        <div className="mt-1">
          {meal.foods && meal.foods.length > 0 && (
            <p className="text-xs text-gray-600">
              {meal.foods.map((food: any, index: number) => food.name).join(', ')}
            </p>
          )}
          {meal.time && (
            <p className="text-xs text-gray-500">
              {meal.time.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

interface HydrationTrackerProps {
  todayEntry: MomNutritionEntry | null
  nutritionHistory: MomNutritionEntry[]
  analytics: any
}

function HydrationTracker({ todayEntry, nutritionHistory, analytics }: HydrationTrackerProps) {
  const [waterIntake, setWaterIntake] = useState(todayEntry?.hydration.water || 0)
  const target = 2500 // 2.5L for breastfeeding moms
  const percentage = Math.min((waterIntake / target) * 100, 100)
  
  const weeklyAverage = nutritionHistory.slice(0, 7).reduce((sum, entry) => 
    sum + entry.hydration.water, 0
  ) / Math.min(nutritionHistory.length, 7) || 0

  const addWater = (amount: number) => {
    setWaterIntake(prev => prev + amount)
  }

  return (
    <div className="space-y-4">
      {/* Today's Hydration */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-800">
            <span>
              <ToneFilteredText context="wellness">
                Today's Hydration
              </ToneFilteredText>
            </span>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
              {`${waterIntake}ml / ${target}ml`}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={percentage} className="h-4 mb-4" />
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              <ToneFilteredText context="wellness">
                {percentage >= 100 
                  ? "Excellent hydration! Your body is thanking you." 
                  : percentage >= 75 
                  ? "Great progress! Keep going strong." 
                  : "Every sip counts. You're doing wonderfully."
                }
              </ToneFilteredText>
            </span>
            <span className="text-lg font-bold text-blue-600">
              {Math.round(percentage)}%
            </span>
          </div>

          {/* Quick Add Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[100, 200, 250, 500].map(amount => (
              <Button 
                key={amount}
                onClick={() => addWater(amount)}
                variant="outline" 
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                +{amount}ml
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Hydration Trend */}
      <Card>
        <CardHeader>
          <CardTitle>
            <ToneFilteredText context="wellness">
              Hydration Trend
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Weekly Average</span>
            <span className="font-medium">{Math.round(weeklyAverage)}ml/day</span>
          </div>
          
          <div className="h-24 bg-linear-to-r from-blue-100 to-blue-50 rounded-lg flex items-end justify-center p-3">
            <div className="flex items-end gap-1 h-full w-full">
              {nutritionHistory.slice(0, 7).map((entry, index) => (
                <div 
                  key={index}
                  className="bg-linear-to-t from-blue-400 to-blue-300 rounded-t flex-1"
                  style={{ 
                    height: `${Math.min((entry.hydration.water / target) * 100, 100)}%`,
                    minHeight: '10%'
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hydration Tips */}
      <Card className="bg-mint/10 border-mint/20">
        <CardHeader>
          <CardTitle className="text-mint">
            <ToneFilteredText context="wellness">
              Hydration Tips for Moms
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Droplets className="w-4 h-4 text-mint mt-0.5" />
              <p className="text-sm text-gray-700">
                <ToneFilteredText context="wellness">
                  Keep a water bottle within arm's reach while nursing or pumping.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-mint mt-0.5" />
              <p className="text-sm text-gray-700">
                <ToneFilteredText context="wellness">
                  Set gentle reminders every hour to take a few sips.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-mint mt-0.5" />
              <p className="text-sm text-gray-700">
                <ToneFilteredText context="wellness">
                  Add slices of lemon, cucumber, or mint for natural flavor.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MoodEnergyTrackerProps {
  todayEntry: MomNutritionEntry | null
  nutritionHistory: MomNutritionEntry[]
  analytics: any
}

function MoodEnergyTracker({ todayEntry, nutritionHistory, analytics }: MoodEnergyTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [selectedEnergy, setSelectedEnergy] = useState<number[]>([3])
  
  const moodTrend = analytics.momWellness.moodTrend
  const energyTrend = analytics.momWellness.energyTrend
  
  const moodOptions = [
    { value: 'great', label: 'Great', emoji: '😊', color: 'green' },
    { value: 'good', label: 'Good', emoji: '🙂', color: 'blue' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: 'yellow' },
    { value: 'tired', label: 'Tired', emoji: '😴', color: 'orange' },
    { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😰', color: 'red' }
  ]

  const weeklyMoods = nutritionHistory.slice(0, 7).map(entry => entry.mood)
  const weeklyEnergy = nutritionHistory.slice(0, 7).map(entry => entry.energy)

  return (
    <div className="space-y-4">
      {/* Today's Check-in */}
      <Card className="bg-lavender/10 border-lavender/20">
        <CardHeader>
          <CardTitle className="text-lavender">
            <ToneFilteredText context="wellness">
              How are you feeling today?
            </ToneFilteredText>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              Taking a moment to check in with yourself
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mood Selection */}
          <div>
            <Label className="text-sm font-medium">
              <ToneFilteredText context="wellness">Current Mood</ToneFilteredText>
            </Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMood(mood.value)}
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              <ToneFilteredText context="wellness">
                {`Energy Level: ${selectedEnergy[0]}/5`}
              </ToneFilteredText>
            </Label>
            <Slider
              value={selectedEnergy}
              onValueChange={setSelectedEnergy}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Very Low</span>
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Very High</span>
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-lavender hover:bg-lavender/90">
            <ToneFilteredText context="dashboard">
              Save Today's Check-in
            </ToneFilteredText>
          </Button>
        </CardContent>
      </Card>

      {/* Mood & Energy Trends */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <ToneFilteredText context="wellness">Mood Trend</ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${
                moodTrend === 'improving' ? 'text-green-500' : 
                moodTrend === 'stable' ? 'text-blue-500' : 'text-orange-500'
              }`} />
              <span className={`text-sm font-medium ${
                moodTrend === 'improving' ? 'text-green-700' : 
                moodTrend === 'stable' ? 'text-blue-700' : 'text-orange-700'
              }`}>
                {moodTrend === 'improving' ? 'Improving' : 
                 moodTrend === 'stable' ? 'Stable' : 'Needs attention'}
              </span>
            </div>
            <div className="h-12 bg-gray-100 rounded flex items-end gap-1 p-1">
              {weeklyMoods.map((mood, index) => {
                const moodValue = mood === 'great' ? 5 : mood === 'good' ? 4 : 
                                 mood === 'okay' ? 3 : mood === 'tired' ? 2 : 1
                return (
                  <div 
                    key={index}
                    className="bg-linear-to-t from-lavender to-lavender/60 rounded flex-1"
                    style={{ height: `${(moodValue / 5) * 100}%` }}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <ToneFilteredText context="wellness">Energy Trend</ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${
                energyTrend === 'increasing' ? 'text-green-500' : 
                energyTrend === 'stable' ? 'text-blue-500' : 'text-orange-500'
              }`} />
              <span className={`text-sm font-medium ${
                energyTrend === 'increasing' ? 'text-green-700' : 
                energyTrend === 'stable' ? 'text-blue-700' : 'text-orange-700'
              }`}>
                {energyTrend === 'increasing' ? 'Increasing' : 
                 energyTrend === 'stable' ? 'Stable' : 'Decreasing'}
              </span>
            </div>
            <div className="h-12 bg-gray-100 rounded flex items-end gap-1 p-1">
              {weeklyEnergy.map((energy, index) => (
                <div 
                  key={index}
                  className="bg-linear-to-t from-mint to-mint/60 rounded flex-1"
                  style={{ height: `${(energy / 5) * 100}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Insights */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            <ToneFilteredText context="wellness">
              Personalized Wellness Insights
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodTrend === 'declining' && (
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  <ToneFilteredText context="wellness">
                    Your mood has been challenging lately. Consider reaching out for support or taking small breaks for self-care.
                  </ToneFilteredText>
                </p>
              </div>
            )}
            {energyTrend === 'decreasing' && (
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  <ToneFilteredText context="wellness">
                    Your energy levels might benefit from focusing on nutrition, hydration, and rest when possible.
                  </ToneFilteredText>
                </p>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Moon className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <ToneFilteredText context="wellness">
                  Remember: it's completely normal for new moms to have ups and downs. You're doing an amazing job.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface WellnessGoalsTrackerProps {
  onAddGoal: () => void
}

function WellnessGoalsTracker({ onAddGoal }: WellnessGoalsTrackerProps) {
  const [goals, setGoals] = useState<HealthGoal[]>([])

  // Sample goals for demo
  useEffect(() => {
    const sampleGoals: HealthGoal[] = [
      {
        id: 'hydration-goal',
        person: 'mom',
        category: 'hydration',
        title: 'Daily Hydration',
        description: 'Drink at least 2.5L of water daily',
        target: 2500,
        unit: 'ml',
        timeframe: 'daily',
        startDate: new Date(),
        isActive: true,
        progress: [
          { date: new Date(), value: 2200, achieved: false },
          { date: new Date(Date.now() - 86400000), value: 2600, achieved: true }
        ]
      },
      {
        id: 'nutrition-goal',
        person: 'mom',
        category: 'nutrition',
        title: 'Balanced Meals',
        description: 'Eat 3 balanced meals daily',
        target: 3,
        unit: 'meals',
        timeframe: 'daily',
        startDate: new Date(),
        isActive: true,
        progress: [
          { date: new Date(), value: 2, achieved: false },
          { date: new Date(Date.now() - 86400000), value: 3, achieved: true }
        ]
      }
    ]
    setGoals(sampleGoals)
  }, [])

  return (
    <div className="space-y-4">
      {/* Add Goal Button */}
      <Button onClick={onAddGoal} className="w-full bg-peach hover:bg-peach/90">
        <Plus className="w-4 h-4 mr-2" />
        <ToneFilteredText context="dashboard">
          Add New Wellness Goal
        </ToneFilteredText>
      </Button>

      {/* Active Goals */}
      <div className="space-y-3">
        {goals.map((goal) => {
          const latestProgress = goal.progress[goal.progress.length - 1]
          const progressPercentage = latestProgress 
            ? Math.min((latestProgress.value / goal.target) * 100, 100)
            : 0
          
          const achievedDays = goal.progress.filter(p => p.achieved).length
          const totalDays = goal.progress.length

          return (
            <Card key={goal.id} className="bg-mint/10 border-mint/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-mint text-sm">
                    {goal.title}
                  </CardTitle>
                  <Badge variant="outline" className="bg-mint/20 text-mint border-mint/30">
                    {goal.category}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {goal.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Current Progress */}
                  <div className="flex justify-between items-center text-sm">
                    <span>Today's Progress</span>
                    <span className="font-medium">
                      {latestProgress?.value || 0} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  
                  {/* Weekly Success Rate */}
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>Success Rate</span>
                    <span>{totalDays > 0 ? Math.round((achievedDays / totalDays) * 100) : 0}%</span>
                  </div>
                  
                  {/* Achievement Status */}
                  {latestProgress?.achieved ? (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <ToneFilteredText context="wellness">
                        Goal achieved today! Well done!
                      </ToneFilteredText>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-600 text-xs">
                      <Target className="w-3 h-3" />
                      <ToneFilteredText context="wellness">
                        Keep going! You can do this!
                      </ToneFilteredText>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Goal Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">
            <ToneFilteredText context="wellness">
              Goal Achievement Tips
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Start with small, achievable goals and celebrate every success.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Set gentle reminders throughout the day to stay on track.
                </ToneFilteredText>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-700">
                <ToneFilteredText context="wellness">
                  Be kind to yourself on challenging days. Progress isn't always linear.
                </ToneFilteredText>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Modal Components (AddNutritionModal and AddWellnessGoalModal would be implemented here)
// For brevity, I'll add placeholder components

function AddNutritionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  existingEntry 
}: { 
  isOpen: boolean
  onClose: () => void
  onSave: (entry: Omit<MomNutritionEntry, 'id'>) => void
  existingEntry: MomNutritionEntry | null
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <ToneFilteredText context="wellness">
              Log Today's Nutrition
            </ToneFilteredText>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-500">
            <ToneFilteredText context="wellness">
              Nutrition logging form would be implemented here
            </ToneFilteredText>
          </p>
          <Button onClick={onClose} className="mt-4">
            <ToneFilteredText context="dashboard">Close</ToneFilteredText>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddWellnessGoalModal({ 
  isOpen, 
  onClose, 
  onSave 
}: { 
  isOpen: boolean
  onClose: () => void
  onSave: (goal: any) => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <ToneFilteredText context="wellness">
              Create Wellness Goal
            </ToneFilteredText>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-500">
            <ToneFilteredText context="wellness">
              Goal creation form would be implemented here
            </ToneFilteredText>
          </p>
          <Button onClick={onClose} className="mt-4">
            <ToneFilteredText context="dashboard">Close</ToneFilteredText>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MomWellnessTracker