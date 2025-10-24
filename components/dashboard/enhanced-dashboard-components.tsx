/**
 * Enhanced Dashboard Components with Tone Filtering
 * All dashboard text is automatically filtered for warmth and encouragement
 */

'use client'

import React from 'react'
import { ToneFilteredText, NotificationWithTone, JournalPromptWithTone } from '@/components/tone-filtered-text'
import { useToneFilter } from '@/hooks/use-tone-filter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Calendar, 
  BookOpen, 
  Users, 
  Award,
  Star,
  Sparkles,
  Baby,
  Target,
  TrendingUp
} from 'lucide-react'

/**
 * Dashboard Welcome Message with Dynamic Tone
 */
interface DashboardWelcomeProps {
  motherName?: string
  babyName?: string
  currentLevel?: number
  totalXP?: number
}

export function DashboardWelcome({ 
  motherName = "Beautiful Mom", 
  babyName = "Little One",
  currentLevel = 5,
  totalXP = 1250
}: DashboardWelcomeProps) {
  const { currentToneMode } = useToneFilter()
  
  const welcomeMessages = {
    soothing: `Welcome back, ${motherName}. Take a gentle breath and know that you're exactly where you need to be today.`,
    hopeful: `Hello there, ${motherName}! Each day with ${babyName} is a beautiful step forward in your amazing journey.`,
    healing: `You're here, ${motherName}, and that's beautiful. Every moment you spend caring shows your incredible strength.`,
    joyful: `Hey wonderful ${motherName}! Ready for another amazing day of discoveries with ${babyName}? ✨`,
    'gentle-encouragement': `You're doing such meaningful work, ${motherName}. Let's celebrate your progress and plan some lovely moments ahead.`
  }
  
  return (
    <Card className="bg-gradient-to-r from-peach/10 via-lavender/10 to-mint/10 border-none shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-peach to-lavender bg-clip-text text-transparent">
              Level {currentLevel} Mom
            </CardTitle>
            <CardDescription className="text-base mt-1">
              <ToneFilteredText context="welcome" className="font-medium">
                {welcomeMessages[currentToneMode] || welcomeMessages['gentle-encouragement']}
              </ToneFilteredText>
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Total XP</div>
            <div className="text-2xl font-bold text-mint">{totalXP.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progress to Level {currentLevel + 1}</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </CardHeader>
    </Card>
  )
}

/**
 * Daily Missions with Encouraging Tone
 */
interface Mission {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
  category: 'wellness' | 'baby' | 'learning' | 'community'
}

interface DailyMissionsCardProps {
  missions?: Mission[]
}

export function DailyMissionsCard({ missions = [] }: DailyMissionsCardProps) {
  const defaultMissions: Mission[] = [
    {
      id: '1',
      title: 'Track feeding session',
      description: 'Log one feeding time with baby',
      xp: 10,
      completed: true,
      category: 'baby'
    },
    {
      id: '2',
      title: 'Take 5 minutes for yourself',
      description: 'Practice mindful breathing or gentle stretching',
      xp: 15,
      completed: false,
      category: 'wellness'
    },
    {
      id: '3',
      title: 'Connect with another mom',
      description: 'Share a kind message in the community',
      xp: 20,
      completed: false,
      category: 'community'
    }
  ]
  
  const activeMissions = missions.length > 0 ? missions : defaultMissions
  const completedCount = activeMissions.filter(m => m.completed).length
  
  const getCategoryIcon = (category: Mission['category']) => {
    const icons = {
      wellness: Heart,
      baby: Baby,
      learning: BookOpen,
      community: Users
    }
    const Icon = icons[category]
    return <Icon className="w-4 h-4" />
  }
  
  const getCategoryColor = (category: Mission['category']) => {
    const colors = {
      wellness: 'text-pink-600 bg-pink-50',
      baby: 'text-blue-600 bg-blue-50',
      learning: 'text-purple-600 bg-purple-50',
      community: 'text-green-600 bg-green-50'
    }
    return colors[category]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Target className="w-5 h-5 text-peach" />
          <ToneFilteredText context="dashboard">
            Today's Gentle Missions
          </ToneFilteredText>
          <Badge variant="secondary" className="ml-auto">
            {completedCount}/{activeMissions.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="dashboard">
            Small steps that nurture both you and baby 🌱
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activeMissions.map((mission) => (
          <div 
            key={mission.id}
            className={`p-4 rounded-lg border transition-all ${
              mission.completed 
                ? 'bg-green-50 border-green-200 opacity-70' 
                : 'bg-white border-gray-200 hover:border-peach/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getCategoryColor(mission.category)}`}>
                {getCategoryIcon(mission.category)}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium ${mission.completed ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                  <ToneFilteredText context="dashboard">
                    {mission.title}
                  </ToneFilteredText>
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <ToneFilteredText context="dashboard">
                    {mission.description}
                  </ToneFilteredText>
                </p>
                
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="text-xs">
                    +{mission.xp} XP
                  </Badge>
                  
                  {!mission.completed && (
                    <Button size="sm" variant="outline" className="text-xs">
                      <ToneFilteredText context="dashboard">
                        Complete gently
                      </ToneFilteredText>
                    </Button>
                  )}
                  
                  {mission.completed && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Completed!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {completedCount === activeMissions.length && (
          <div className="text-center py-6 bg-gradient-to-r from-peach/10 to-lavender/10 rounded-lg">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-peach" />
            <ToneFilteredText context="celebration" className="font-medium text-lg">
              All missions completed! You're doing beautifully today ✨
            </ToneFilteredText>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Achievement Celebrations with Warm Tone
 */
interface Achievement {
  id: string
  title: string
  description: string
  iconEmoji: string
  unlockedAt: Date
  category: string
}

interface RecentAchievementsProps {
  achievements?: Achievement[]
}

export function RecentAchievements({ achievements = [] }: RecentAchievementsProps) {
  const defaultAchievements: Achievement[] = [
    {
      id: '1',
      title: 'First Week Warrior',
      description: 'Completed your first week of tracking',
      iconEmoji: '🌟',
      unlockedAt: new Date(),
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Self-Care Queen',
      description: 'Took time for wellness 5 days in a row',
      iconEmoji: '👑',
      unlockedAt: new Date(Date.now() - 86400000),
      category: 'wellness'
    }
  ]
  
  const recentAchievements = achievements.length > 0 ? achievements : defaultAchievements

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Award className="w-5 h-5 text-yellow-500" />
          <ToneFilteredText context="celebration">
            Recent Celebrations
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="celebration">
            Beautiful moments worth celebrating 🎉
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {recentAchievements.map((achievement) => (
          <div 
            key={achievement.id}
            className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {achievement.iconEmoji}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  <ToneFilteredText context="celebration">
                    {achievement.title}
                  </ToneFilteredText>
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <ToneFilteredText context="celebration">
                    {achievement.description}
                  </ToneFilteredText>
                </p>
                
                <div className="text-xs text-gray-500 mt-2">
                  Unlocked {achievement.unlockedAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          <ToneFilteredText context="dashboard">
            View all your beautiful achievements
          </ToneFilteredText>
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * Wellness Check-in with Gentle Prompts
 */
export function WellnessCheckIn() {
  const [selectedMood, setSelectedMood] = React.useState('')
  
  const moodOptions = [
    { emoji: '🌟', label: 'Radiant', value: 'radiant' },
    { emoji: '😊', label: 'Content', value: 'content' },
    { emoji: '🙂', label: 'Okay', value: 'okay' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😔', label: 'Tired', value: 'tired' },
    { emoji: '🤗', label: 'Need comfort', value: 'comfort' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-pink-500" />
          <ToneFilteredText context="wellness">
            Gentle Check-in
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="wellness">
            How are you feeling in this beautiful moment?
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
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
        
        {selectedMood && (
          <div className="p-4 bg-mint/10 border border-mint/30 rounded-lg">
            <JournalPromptWithTone 
              prompt="What's one small thing that brought you joy today?"
              context="wellness"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Community Messages with Tone Filtering
 */
interface CommunityMessage {
  id: string
  author: string
  message: string
  timestamp: Date
  supportCount: number
}

interface CommunityFeedProps {
  messages?: CommunityMessage[]
}

export function CommunityFeed({ messages = [] }: CommunityFeedProps) {
  const defaultMessages: CommunityMessage[] = [
    {
      id: '1',
      author: 'Sarah M.',
      message: 'Finally got 4 hours of sleep! Feeling like a new person.',
      timestamp: new Date(Date.now() - 3600000),
      supportCount: 12
    },
    {
      id: '2', 
      author: 'Emma K.',
      message: 'Baby smiled at me today and my heart just melted.',
      timestamp: new Date(Date.now() - 7200000),
      supportCount: 18
    }
  ]
  
  const feedMessages = messages.length > 0 ? messages : defaultMessages

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-500" />
          <ToneFilteredText context="community">
            Mom Community
          </ToneFilteredText>
        </CardTitle>
        <CardDescription>
          <ToneFilteredText context="community">
            Sharing beautiful moments together 💕
          </ToneFilteredText>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {feedMessages.map((message) => (
          <div key={message.id} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-blue-800">{message.author}</span>
              <span className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">
              <ToneFilteredText context="community">
                {message.message}
              </ToneFilteredText>
            </p>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Heart className="w-3 h-3 mr-1" />
                Support ({message.supportCount})
              </Button>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          <ToneFilteredText context="community">
            Share your beautiful moment
          </ToneFilteredText>
        </Button>
      </CardContent>
    </Card>
  )
}

export default DashboardWelcome