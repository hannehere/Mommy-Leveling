/**
 * Mommy & Baby Nutrition & Wellness Tracker - Core Engine
 * Comprehensive health tracking system for mothers and babies
 */

export interface BabyProfile {
  id: string
  name: string
  birthDate: Date
  currentWeight: number // kg
  currentHeight: number // cm
  birthWeight: number
  birthHeight: number
  gestationWeeks: number
  feedingType: 'breastfeeding' | 'formula' | 'mixed' | 'solid-foods'
  allergies: string[]
  medicalNotes: string[]
}

export interface MomProfile {
  id: string
  name: string
  age: number
  isBreastfeeding: boolean
  deliveryDate: Date
  deliveryType: 'vaginal' | 'c-section'
  currentWeight: number
  prePregnancyWeight: number
  targetWeight?: number
  allergies: string[]
  medications: string[]
  medicalConditions: string[]
}

// Baby Nutrition Tracking
export interface FeedingSession {
  id: string
  timestamp: Date
  type: 'breast' | 'bottle-formula' | 'bottle-breast-milk' | 'solid-food'
  duration?: number // minutes for breastfeeding
  amount?: number // ml for bottles
  breast?: 'left' | 'right' | 'both'
  foodItems?: string[] // for solid foods
  notes?: string
  babyMood: 'content' | 'fussy' | 'sleepy' | 'alert'
}

export interface BabyGrowthRecord {
  id: string
  date: Date
  weight: number
  height: number
  headCircumference?: number
  bmizScore?: number
  percentiles: {
    weight: number
    height: number
    headCircumference?: number
  }
  notes?: string
}

export interface BabyMilestone {
  id: string
  name: string
  category: 'motor' | 'cognitive' | 'language' | 'social' | 'feeding'
  expectedAge: number // months
  achievedDate?: Date
  notes?: string
}

// Mom Nutrition & Wellness
export interface MomNutritionEntry {
  id: string
  date: Date
  meals: {
    breakfast?: MealEntry
    lunch?: MealEntry
    dinner?: MealEntry
    snacks?: MealEntry[]
  }
  hydration: {
    water: number // ml
    otherFluids: { type: string; amount: number }[]
  }
  vitamins: {
    name: string
    taken: boolean
    time?: Date
  }[]
  energy: 1 | 2 | 3 | 4 | 5 // 1 = very low, 5 = very high
  mood: 'great' | 'good' | 'okay' | 'tired' | 'overwhelmed'
  symptoms?: string[]
}

export interface MealEntry {
  foods: FoodItem[]
  calories?: number
  notes?: string
  time: Date
}

export interface FoodItem {
  name: string
  amount: number
  unit: 'g' | 'ml' | 'cup' | 'piece' | 'tbsp' | 'tsp'
  calories?: number
  nutrients?: {
    protein?: number
    carbs?: number
    fat?: number
    fiber?: number
    calcium?: number
    iron?: number
  }
}

// Sleep Tracking
export interface SleepSession {
  id: string
  person: 'mom' | 'baby'
  startTime: Date
  endTime?: Date
  duration?: number // minutes
  quality: 1 | 2 | 3 | 4 | 5 // 1 = very poor, 5 = excellent
  interruptions: number
  location: 'crib' | 'parent-bed' | 'bassinet' | 'other'
  notes?: string
}

export interface DailySleepSummary {
  date: Date
  person: 'mom' | 'baby'
  totalSleep: number // minutes
  nightSleep: number
  napTime: number
  sleepEfficiency: number // percentage
  averageQuality: number
  wakeUps: number
}

// Health Goals & Tracking
export interface HealthGoal {
  id: string
  person: 'mom' | 'baby'
  category: 'nutrition' | 'hydration' | 'sleep' | 'weight' | 'activity' | 'wellness'
  title: string
  description: string
  target: number
  unit: string
  timeframe: 'daily' | 'weekly' | 'monthly'
  startDate: Date
  endDate?: Date
  isActive: boolean
  progress: HealthGoalProgress[]
}

export interface HealthGoalProgress {
  date: Date
  value: number
  achieved: boolean
  notes?: string
}

// Analytics & Insights
export interface HealthAnalytics {
  period: 'week' | 'month' | 'quarter'
  babyGrowth: {
    weightTrend: 'increasing' | 'stable' | 'concerning'
    feedingPattern: 'regular' | 'irregular' | 'improving'
    sleepQuality: 'good' | 'fair' | 'needs-attention'
    developmentScore: number // 0-100
  }
  momWellness: {
    nutritionScore: number // 0-100
    hydrationScore: number
    sleepScore: number
    moodTrend: 'improving' | 'stable' | 'declining'
    energyTrend: 'increasing' | 'stable' | 'decreasing'
  }
  recommendations: HealthRecommendation[]
}

export interface HealthRecommendation {
  id: string
  priority: 'high' | 'medium' | 'low'
  category: 'nutrition' | 'sleep' | 'feeding' | 'development' | 'wellness'
  title: string
  description: string
  actionSteps: string[]
  personalized: boolean
  aiGenerated: boolean
}

/**
 * Core Nutrition & Wellness Tracker Class
 */
export class NutritionWellnessTracker {
  private momProfile: MomProfile | null = null
  private babyProfile: BabyProfile | null = null
  private feedingSessions: FeedingSession[] = []
  private growthRecords: BabyGrowthRecord[] = []
  private nutritionEntries: MomNutritionEntry[] = []
  private sleepSessions: SleepSession[] = []
  private healthGoals: HealthGoal[] = []

  // Profile Management
  setMomProfile(profile: MomProfile): void {
    this.momProfile = profile
  }

  setBabyProfile(profile: BabyProfile): void {
    this.babyProfile = profile
  }

  // Baby Feeding Tracking
  addFeedingSession(session: Omit<FeedingSession, 'id'>): FeedingSession {
    const feedingSession: FeedingSession = {
      id: `feeding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...session
    }
    this.feedingSessions.push(feedingSession)
    return feedingSession
  }

  getFeedingHistory(days: number = 7): FeedingSession[] {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    return this.feedingSessions
      .filter(session => session.timestamp >= cutoffDate)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Growth Tracking
  addGrowthRecord(record: Omit<BabyGrowthRecord, 'id'>): BabyGrowthRecord {
    const growthRecord: BabyGrowthRecord = {
      id: `growth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...record
    }
    this.growthRecords.push(growthRecord)
    return growthRecord
  }

  getGrowthTrend(months: number = 6): BabyGrowthRecord[] {
    const cutoffDate = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000)
    return this.growthRecords
      .filter(record => record.date >= cutoffDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  // Mom Nutrition Tracking
  addNutritionEntry(entry: Omit<MomNutritionEntry, 'id'>): MomNutritionEntry {
    const nutritionEntry: MomNutritionEntry = {
      id: `nutrition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...entry
    }
    this.nutritionEntries.push(nutritionEntry)
    return nutritionEntry
  }

  getNutritionHistory(days: number = 30): MomNutritionEntry[] {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    return this.nutritionEntries
      .filter(entry => entry.date >= cutoffDate)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  // Sleep Tracking
  addSleepSession(session: Omit<SleepSession, 'id'>): SleepSession {
    const sleepSession: SleepSession = {
      id: `sleep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...session
    }
    this.sleepSessions.push(sleepSession)
    return sleepSession
  }

  getSleepSummary(person: 'mom' | 'baby', days: number = 7): DailySleepSummary[] {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const sessions = this.sleepSessions.filter(
      session => session.person === person && session.startTime >= cutoffDate
    )

    const summaryMap = new Map<string, DailySleepSummary>()
    
    sessions.forEach(session => {
      const dateKey = session.startTime.toDateString()
      if (!summaryMap.has(dateKey)) {
        summaryMap.set(dateKey, {
          date: new Date(session.startTime.toDateString()),
          person,
          totalSleep: 0,
          nightSleep: 0,
          napTime: 0,
          sleepEfficiency: 0,
          averageQuality: 0,
          wakeUps: 0
        })
      }

      const summary = summaryMap.get(dateKey)!
      const duration = session.duration || 0
      summary.totalSleep += duration
      
      // Night sleep vs nap classification
      const hour = session.startTime.getHours()
      if (hour >= 20 || hour <= 6) {
        summary.nightSleep += duration
      } else {
        summary.napTime += duration
      }
      
      summary.wakeUps += session.interruptions
    })

    return Array.from(summaryMap.values()).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )
  }

  // Health Goals
  createHealthGoal(goal: Omit<HealthGoal, 'id' | 'progress'>): HealthGoal {
    const healthGoal: HealthGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      progress: [],
      ...goal
    }
    this.healthGoals.push(healthGoal)
    return healthGoal
  }

  updateGoalProgress(goalId: string, progress: Omit<HealthGoalProgress, 'achieved'>): void {
    const goal = this.healthGoals.find(g => g.id === goalId)
    if (goal) {
      const progressEntry: HealthGoalProgress = {
        ...progress,
        achieved: progress.value >= goal.target
      }
      goal.progress.push(progressEntry)
    }
  }

  // Analytics
  generateHealthAnalytics(period: 'week' | 'month' | 'quarter' = 'week'): HealthAnalytics {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90
    
    return {
      period,
      babyGrowth: this.analyzeBabyGrowth(days),
      momWellness: this.analyzeMomWellness(days),
      recommendations: this.generateRecommendations()
    }
  }

  private analyzeBabyGrowth(days: number) {
    const recentGrowth = this.getGrowthTrend(Math.floor(days / 30))
    const recentFeeding = this.getFeedingHistory(days)
    const babySleep = this.getSleepSummary('baby', days)

    return {
      weightTrend: this.calculateWeightTrend(recentGrowth),
      feedingPattern: this.analyzeFeedingPattern(recentFeeding),
      sleepQuality: this.analyzeSleepQuality(babySleep),
      developmentScore: this.calculateDevelopmentScore()
    }
  }

  private analyzeMomWellness(days: number) {
    const recentNutrition = this.getNutritionHistory(days)
    const momSleep = this.getSleepSummary('mom', days)

    return {
      nutritionScore: this.calculateNutritionScore(recentNutrition),
      hydrationScore: this.calculateHydrationScore(recentNutrition),
      sleepScore: this.calculateSleepScore(momSleep),
      moodTrend: this.analyzeMoodTrend(recentNutrition),
      energyTrend: this.analyzeEnergyTrend(recentNutrition)
    }
  }

  private calculateWeightTrend(records: BabyGrowthRecord[]): 'increasing' | 'stable' | 'concerning' {
    if (records.length < 2) return 'stable'
    
    const recent = records[records.length - 1]
    const previous = records[records.length - 2]
    const weightChange = recent.weight - previous.weight
    const daysElapsed = (recent.date.getTime() - previous.date.getTime()) / (1000 * 60 * 60 * 24)
    const weeklyGain = (weightChange / daysElapsed) * 7

    // Expected weekly weight gain for babies (varies by age)
    if (weeklyGain >= 100) return 'increasing' // 100g+ per week is good
    if (weeklyGain >= 50) return 'stable'
    return 'concerning'
  }

  private analyzeFeedingPattern(sessions: FeedingSession[]): 'regular' | 'irregular' | 'improving' {
    if (sessions.length < 10) return 'irregular'
    
    // Analyze feeding intervals
    const intervals: number[] = []
    for (let i = 1; i < sessions.length; i++) {
      const interval = sessions[i-1].timestamp.getTime() - sessions[i].timestamp.getTime()
      intervals.push(interval / (1000 * 60 * 60)) // hours
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length
    
    // Regular feeding if average is 2-4 hours with low variance
    if (avgInterval >= 2 && avgInterval <= 4 && variance < 2) return 'regular'
    if (variance < 3) return 'improving'
    return 'irregular'
  }

  private analyzeSleepQuality(sleepData: DailySleepSummary[]): 'good' | 'fair' | 'needs-attention' {
    if (sleepData.length === 0) return 'needs-attention'
    
    const avgTotalSleep = sleepData.reduce((sum, day) => sum + day.totalSleep, 0) / sleepData.length
    const avgWakeUps = sleepData.reduce((sum, day) => sum + day.wakeUps, 0) / sleepData.length
    
    // Baby sleep quality assessment (age-dependent, this is a simplified version)
    if (avgTotalSleep >= 600 && avgWakeUps <= 3) return 'good' // 10+ hours, ≤3 wake-ups
    if (avgTotalSleep >= 480 && avgWakeUps <= 5) return 'fair'  // 8+ hours, ≤5 wake-ups
    return 'needs-attention'
  }

  private calculateDevelopmentScore(): number {
    // Simplified development score based on milestones and growth
    return Math.floor(Math.random() * 30) + 70 // 70-100 range (placeholder)
  }

  private calculateNutritionScore(entries: MomNutritionEntry[]): number {
    if (entries.length === 0) return 0
    
    let totalScore = 0
    entries.forEach(entry => {
      let dayScore = 0
      
      // Meal completeness (30 points)
      const mealCount = [entry.meals.breakfast, entry.meals.lunch, entry.meals.dinner]
        .filter(meal => meal).length
      dayScore += (mealCount / 3) * 30
      
      // Hydration (25 points)
      const hydrationTarget = 2000 // 2L daily
      dayScore += Math.min(entry.hydration.water / hydrationTarget, 1) * 25
      
      // Vitamin compliance (20 points)
      const vitaminCompliance = entry.vitamins.filter(v => v.taken).length / entry.vitamins.length
      dayScore += vitaminCompliance * 20
      
      // Energy levels (15 points)
      dayScore += (entry.energy / 5) * 15
      
      // Mood (10 points)
      const moodScore = entry.mood === 'great' ? 10 : entry.mood === 'good' ? 8 : 
                       entry.mood === 'okay' ? 6 : entry.mood === 'tired' ? 4 : 2
      dayScore += moodScore
      
      totalScore += dayScore
    })
    
    return Math.round(totalScore / entries.length)
  }

  private calculateHydrationScore(entries: MomNutritionEntry[]): number {
    if (entries.length === 0) return 0
    
    const target = 2000 // 2L daily for breastfeeding moms
    const avgHydration = entries.reduce((sum, entry) => sum + entry.hydration.water, 0) / entries.length
    return Math.round(Math.min(avgHydration / target, 1) * 100)
  }

  private calculateSleepScore(sleepData: DailySleepSummary[]): number {
    if (sleepData.length === 0) return 0
    
    const avgSleep = sleepData.reduce((sum, day) => sum + day.totalSleep, 0) / sleepData.length
    const target = 480 // 8 hours for new moms
    return Math.round(Math.min(avgSleep / target, 1) * 100)
  }

  private analyzeMoodTrend(entries: MomNutritionEntry[]): 'improving' | 'stable' | 'declining' {
    if (entries.length < 7) return 'stable'
    
    const moodValues = entries.map(entry => {
      switch (entry.mood) {
        case 'great': return 5
        case 'good': return 4
        case 'okay': return 3
        case 'tired': return 2
        case 'overwhelmed': return 1
        default: return 3
      }
    })
    
    const firstHalf = moodValues.slice(0, Math.floor(moodValues.length / 2))
    const secondHalf = moodValues.slice(Math.floor(moodValues.length / 2))
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
    
    if (secondAvg > firstAvg + 0.5) return 'improving'
    if (secondAvg < firstAvg - 0.5) return 'declining'
    return 'stable'
  }

  private analyzeEnergyTrend(entries: MomNutritionEntry[]): 'increasing' | 'stable' | 'decreasing' {
    if (entries.length < 7) return 'stable'
    
    const energyValues = entries.map(entry => entry.energy)
    const firstHalf = energyValues.slice(0, Math.floor(energyValues.length / 2))
    const secondHalf = energyValues.slice(Math.floor(energyValues.length / 2))
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
    
    if (secondAvg > firstAvg + 0.5) return 'increasing'
    if (secondAvg < firstAvg - 0.5) return 'decreasing'
    return 'stable'
  }

  private generateRecommendations(): HealthRecommendation[] {
    const recommendations: HealthRecommendation[] = []
    
    // Add some sample recommendations (in a real app, these would be data-driven)
    recommendations.push({
      id: 'hydration_reminder',
      priority: 'high',
      category: 'nutrition',
      title: 'Increase Water Intake',
      description: 'Your hydration levels could be improved for better milk production and energy.',
      actionSteps: [
        'Keep a water bottle within reach while nursing',
        'Set hourly reminders to drink water',
        'Add slices of lemon or cucumber for flavor'
      ],
      personalized: true,
      aiGenerated: true
    })
    
    return recommendations
  }

  // Data Export/Import
  exportData(): string {
    return JSON.stringify({
      momProfile: this.momProfile,
      babyProfile: this.babyProfile,
      feedingSessions: this.feedingSessions,
      growthRecords: this.growthRecords,
      nutritionEntries: this.nutritionEntries,
      sleepSessions: this.sleepSessions,
      healthGoals: this.healthGoals,
      exportDate: new Date().toISOString()
    }, null, 2)
  }

  importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData)
      this.momProfile = data.momProfile
      this.babyProfile = data.babyProfile
      this.feedingSessions = data.feedingSessions || []
      this.growthRecords = data.growthRecords || []
      this.nutritionEntries = data.nutritionEntries || []
      this.sleepSessions = data.sleepSessions || []
      this.healthGoals = data.healthGoals || []
    } catch (error) {
      throw new Error('Invalid data format for import')
    }
  }
}

// Global instance
export const nutritionTracker = new NutritionWellnessTracker()

// Utility functions
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export const calculateAge = (birthDate: Date): { months: number; weeks: number; days: number } => {
  const now = new Date()
  const diffTime = now.getTime() - birthDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  return {
    months: Math.floor(diffDays / 30),
    weeks: Math.floor(diffDays / 7),
    days: diffDays
  }
}

export const getAgeAppropriateFeeding = (ageInMonths: number): string[] => {
  if (ageInMonths < 4) {
    return ['Breast milk or formula only']
  } else if (ageInMonths < 6) {
    return ['Breast milk/formula', 'Begin introducing single-grain cereals']
  } else if (ageInMonths < 8) {
    return ['Breast milk/formula', 'Pureed fruits and vegetables', 'Iron-fortified cereals']
  } else if (ageInMonths < 12) {
    return ['Breast milk/formula', 'Soft finger foods', 'Chopped fruits and vegetables', 'Soft meats']
  } else {
    return ['Whole milk', 'Family foods cut into small pieces', 'Variety of textures and flavors']
  }
}