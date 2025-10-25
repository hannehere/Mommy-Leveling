/**
 * Comprehensive Health & Wellness Dashboard
 * Unified view of nutrition, wellness, and health insights for mom & baby
 */

'use client'

import React, { useState, useEffect } from 'react'
import { ToneFilteredText } from '@/components/tone-filtered-text'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  Baby, 
  Droplets, 
  Moon, 
  TrendingUp, 
  Target, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Star,
  Sparkles,
  Award,
  Activity,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import BabyNutritionTracker from '@/components/baby-nutrition-tracker'
import MomWellnessTracker from '@/components/mom-wellness-tracker'
import SleepTracker from '@/components/sleep-tracker'
import { 
  nutritionTracker, 
  BabyProfile, 
  MomProfile,
  HealthAnalytics,
  formatDuration
} from '@/lib/nutrition-wellness-tracker'

interface NutritionWellnessDashboardProps {
  momProfile?: MomProfile
  babyProfile?: BabyProfile
  className?: string
}

export function NutritionWellnessDashboard({ 
  momProfile, 
  babyProfile, 
  className = '' 
}: NutritionWellnessDashboardProps) {
  const [activeView, setActiveView] = useState<'overview' | 'baby' | 'mom' | 'sleep'>('overview')
  const [analytics, setAnalytics] = useState<HealthAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)
      try {
        const data = nutritionTracker.generateHealthAnalytics('week')
        setAnalytics(data)
      } catch (error) {
        console.error('Error loading analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (!momProfile && !babyProfile) {
    return (
      <Card className={`bg-linear-to-br from-peach/10 to-lavender/10 border-peach/20 ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-peach">
            <Heart className="w-6 h-6" />
            <ToneFilteredText context="wellness">
              Health & Wellness Dashboard
            </ToneFilteredText>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              Set up your profiles to start tracking your family's wellness journey
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button className="bg-peach hover:bg-peach/90">
              <ToneFilteredText context="dashboard">
                Set Up Mom Profile
              </ToneFilteredText>
            </Button>
            <Button className="bg-baby-blue hover:bg-baby-blue/90">
              <ToneFilteredText context="dashboard">
                Set Up Baby Profile
              </ToneFilteredText>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Dashboard Header */}
      <Card className="bg-linear-to-r from-peach/10 via-lavender/10 to-mint/10 border-peach/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-peach" />
              <ToneFilteredText context="wellness">
                Family Wellness Dashboard
              </ToneFilteredText>
            </div>
            <Badge variant="outline" className="bg-peach/20 text-peach border-peach/30">
              {new Date().toLocaleDateString([], { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </Badge>
          </CardTitle>
          <CardDescription>
            <ToneFilteredText context="wellness">
              Your comprehensive view of health, nutrition, and wellness
            </ToneFilteredText>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="baby" className="flex items-center gap-2">
            <Baby className="w-4 h-4" />
            <span className="hidden sm:inline">Baby</span>
          </TabsTrigger>
          <TabsTrigger value="mom" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Mom</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <HealthOverview 
            analytics={analytics}
            momProfile={momProfile}
            babyProfile={babyProfile}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="baby" className="space-y-6">
          <BabyNutritionTracker 
            babyProfile={babyProfile}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="mom" className="space-y-6">
          <MomWellnessTracker 
            momProfile={momProfile}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <SleepTracker 
            momProfile={momProfile}
            babyProfile={babyProfile}
            className="w-full"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface HealthOverviewProps {
  analytics: HealthAnalytics | null
  momProfile?: MomProfile
  babyProfile?: BabyProfile
  isLoading: boolean
}

function HealthOverview({ analytics, momProfile, babyProfile, isLoading }: HealthOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-gray-100 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analytics) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600">
              <ToneFilteredText context="wellness">
                Unable to load health analytics. Please try again later.
              </ToneFilteredText>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Health Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mom Wellness Score */}
        <Card className="bg-linear-to-br from-peach/10 to-lavender/10 border-peach/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-peach">
              <Heart className="w-5 h-5" />
              <ToneFilteredText context="wellness">
                Mom Wellness Score
              </ToneFilteredText>
            </CardTitle>
            <CardDescription>
              <ToneFilteredText context="wellness">
                Overall health and wellbeing this week
              </ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-peach mb-2">
                  {Math.round((
                    analytics.momWellness.nutritionScore + 
                    analytics.momWellness.hydrationScore + 
                    analytics.momWellness.sleepScore
                  ) / 3)}%
                </div>
                <Progress 
                  value={(analytics.momWellness.nutritionScore + 
                         analytics.momWellness.hydrationScore + 
                         analytics.momWellness.sleepScore) / 3} 
                  className="h-3" 
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-medium text-peach">
                    {analytics.momWellness.nutritionScore}%
                  </div>
                  <div className="text-gray-600">Nutrition</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-600">
                    {analytics.momWellness.hydrationScore}%
                  </div>
                  <div className="text-gray-600">Hydration</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-lavender">
                    {analytics.momWellness.sleepScore}%
                  </div>
                  <div className="text-gray-600">Sleep</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Baby Development Score */}
        <Card className="bg-linear-to-br from-baby-blue/10 to-mint/10 border-baby-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-baby-blue">
              <Baby className="w-5 h-5" />
              <ToneFilteredText context="wellness">
                Baby Development Score
              </ToneFilteredText>
            </CardTitle>
            <CardDescription>
              <ToneFilteredText context="wellness">
                Growth, feeding, and sleep patterns
              </ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-baby-blue mb-2">
                  {analytics.babyGrowth.developmentScore}%
                </div>
                <Progress value={analytics.babyGrowth.developmentScore} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <MetricRow 
                  label="Growth Trend"
                  value={analytics.babyGrowth.weightTrend}
                  type={analytics.babyGrowth.weightTrend === 'increasing' ? 'positive' : 
                        analytics.babyGrowth.weightTrend === 'stable' ? 'neutral' : 'warning'}
                />
                <MetricRow 
                  label="Feeding Pattern"
                  value={analytics.babyGrowth.feedingPattern}
                  type={analytics.babyGrowth.feedingPattern === 'regular' ? 'positive' : 
                        analytics.babyGrowth.feedingPattern === 'improving' ? 'neutral' : 'warning'}
                />
                <MetricRow 
                  label="Sleep Quality"
                  value={analytics.babyGrowth.sleepQuality}
                  type={analytics.babyGrowth.sleepQuality === 'good' ? 'positive' : 
                        analytics.babyGrowth.sleepQuality === 'fair' ? 'neutral' : 'warning'}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-mint/10 border-mint/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-mint">
              <TrendingUp className="w-5 h-5" />
              <ToneFilteredText context="wellness">
                Mom Wellness Trends
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <TrendRow 
                label="Mood"
                trend={analytics.momWellness.moodTrend}
                description="Your emotional wellbeing pattern"
              />
              <TrendRow 
                label="Energy"
                trend={analytics.momWellness.energyTrend}
                description="Daily energy levels"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-yellow-800">
              <Target className="w-5 h-5" />
              <ToneFilteredText context="wellness">
                Today's Goals
              </ToneFilteredText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <GoalProgress 
                label="Hydration Goal"
                current={1800}
                target={2500}
                unit="ml"
                color="blue"
              />
              <GoalProgress 
                label="Sleep Goal"
                current={360}
                target={480}
                unit="min"
                color="lavender"
              />
              <GoalProgress 
                label="Feeding Sessions"
                current={4}
                target={6}
                unit="sessions"
                color="mint"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      {analytics.recommendations && analytics.recommendations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-800">
              <Sparkles className="w-5 h-5" />
              <ToneFilteredText context="wellness">
                Personalized Recommendations
              </ToneFilteredText>
            </CardTitle>
            <CardDescription>
              <ToneFilteredText context="wellness">
                AI-powered insights based on your health data
              </ToneFilteredText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recommendations.slice(0, 3).map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-600" />
            <ToneFilteredText context="wellness">
              Quick Actions
            </ToneFilteredText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="bg-baby-blue hover:bg-baby-blue/90 h-auto py-3 flex flex-col gap-1">
              <Baby className="w-5 h-5" />
              <span className="text-xs">
                <ToneFilteredText context="dashboard">Log Feeding</ToneFilteredText>
              </span>
            </Button>
            <Button className="bg-peach hover:bg-peach/90 h-auto py-3 flex flex-col gap-1">
              <Droplets className="w-5 h-5" />
              <span className="text-xs">
                <ToneFilteredText context="dashboard">Add Water</ToneFilteredText>
              </span>
            </Button>
            <Button className="bg-lavender hover:bg-lavender/90 h-auto py-3 flex flex-col gap-1">
              <Moon className="w-5 h-5" />
              <span className="text-xs">
                <ToneFilteredText context="dashboard">Track Sleep</ToneFilteredText>
              </span>
            </Button>
            <Button className="bg-mint hover:bg-mint/90 h-auto py-3 flex flex-col gap-1">
              <Heart className="w-5 h-5" />
              <span className="text-xs">
                <ToneFilteredText context="dashboard">Mood Check</ToneFilteredText>
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper Components
interface MetricRowProps {
  label: string
  value: string
  type: 'positive' | 'neutral' | 'warning'
}

function MetricRow({ label, value, type }: MetricRowProps) {
  const colors = {
    positive: 'text-green-600',
    neutral: 'text-blue-600',
    warning: 'text-orange-600'
  }

  const icons = {
    positive: <CheckCircle className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />
  }

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <div className={`flex items-center gap-1 ${colors[type]} font-medium capitalize`}>
        {icons[type]}
        {value}
      </div>
    </div>
  )
}

interface TrendRowProps {
  label: string
  trend: 'improving' | 'stable' | 'declining' | 'increasing' | 'decreasing'
  description: string
}

function TrendRow({ label, trend, description }: TrendRowProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'improving':
      case 'increasing':
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'declining':
      case 'decreasing':
        return <ArrowDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-blue-500" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'improving':
      case 'increasing':
        return 'text-green-600'
      case 'declining':
      case 'decreasing':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">{label}</span>
        <div className={`flex items-center gap-1 ${getTrendColor()} font-medium capitalize`}>
          {getTrendIcon()}
          {trend}
        </div>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}

interface GoalProgressProps {
  label: string
  current: number
  target: number
  unit: string
  color: string
}

function GoalProgress({ label, current, target, unit, color }: GoalProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-800">{label}</span>
        <span className="text-gray-600">
          {current}/{target} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      {percentage >= 100 && (
        <div className="flex items-center gap-1 text-green-600 text-xs">
          <CheckCircle className="w-3 h-3" />
          <ToneFilteredText context="wellness">
            Goal achieved! Well done!
          </ToneFilteredText>
        </div>
      )}
    </div>
  )
}

interface RecommendationCardProps {
  recommendation: any
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const priorityColors: Record<string, string> = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-orange-200 bg-orange-50',
    low: 'border-blue-200 bg-blue-50'
  }

  const priorityIcons: Record<string, React.ReactNode> = {
    high: <AlertCircle className="w-4 h-4 text-red-500" />,
    medium: <Star className="w-4 h-4 text-orange-500" />,
    low: <Sparkles className="w-4 h-4 text-blue-500" />
  }

  return (
    <div className={`p-4 rounded-lg border ${priorityColors[recommendation.priority] || priorityColors.low}`}>
      <div className="flex items-start gap-3">
        {priorityIcons[recommendation.priority] || priorityIcons.low}
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 mb-1">
            {recommendation.title}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            <ToneFilteredText context="wellness">
              {recommendation.description}
            </ToneFilteredText>
          </p>
          {recommendation.actionSteps && recommendation.actionSteps.length > 0 && (
            <ul className="text-xs text-gray-500 space-y-1">
              {recommendation.actionSteps.slice(0, 2).map((step: string, index: number) => (
                <li key={index} className="flex items-start gap-1">
                  <span>•</span>
                  <ToneFilteredText context="wellness">
                    {step}
                  </ToneFilteredText>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={`${
            recommendation.priority === 'high' ? 'border-red-300 text-red-700' :
            recommendation.priority === 'medium' ? 'border-orange-300 text-orange-700' :
            'border-blue-300 text-blue-700'
          } text-xs`}
        >
          {recommendation.priority}
        </Badge>
      </div>
    </div>
  )
}

export default NutritionWellnessDashboard