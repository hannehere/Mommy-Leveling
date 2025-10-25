# ⚡ Giai đoạn 5: Tối ưu & Mocking cho Mommy Skill Tree

## 🎯 **Mock External Dependencies - Motherhood Context**

### **🤱 Realistic Mommy Skill Tree Dependencies**

```typescript
// Mock Motherhood Services
jest.mock('../services/activityTracker');
jest.mock('../services/levelProgressionService');
jest.mock('../services/achievementService');
jest.mock('../services/mommyAnalytics');

const ActivityTracker = require('../services/activityTracker');
const LevelProgressionService = require('../services/levelProgressionService');
const AchievementService = require('../services/achievementService');
const MommyAnalytics = require('../services/mommyAnalytics');

describe('MommySkillTree with Mocked Motherhood Services', () => {
  let mommyTree: MommySkillTree;
  
  beforeEach(() => {
    // Setup realistic motherhood mock data
    ActivityTracker.getActivityXPMapping.mockReturnValue({
      'morning-workout': { category: 'body', xp: 25 },
      'baby-nap-meditation': { category: 'mind', xp: 15 },
      'emotional-journaling': { category: 'emotion', xp: 30 },
      'parenting-course': { category: 'growth', xp: 40 }
    });
    
    LevelProgressionService.calculateLevelUp.mockReturnValue({
      leveledUp: true,
      newLevel: 2,
      xpToNext: 150,
      celebration: { message: 'Amazing progress, Super Mom!' }
    });
    
    AchievementService.checkUnlocks.mockReturnValue([
      {
        id: 'patience-master-1',
        name: 'Patience Master',
        category: 'emotion',
        description: 'Stayed calm during 5 toddler tantrums',
        icon: '🧘‍♀️',
        rarity: 'common'
      }
    ]);
    
    MommyAnalytics.trackProgress.mockResolvedValue({
      userId: 'mom_sarah_123',
      timestamp: '2025-10-25T08:30:00Z',
      eventType: 'xp_gained',
      success: true
    });
    
    mommyTree = new MommySkillTree('mom_sarah_123');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should integrate with activity tracking service', () => {
    // Given
    const activity = 'morning-workout';
    
    // When
    const activityData = ActivityTracker.getActivityXPMapping();
    const result = mommyTree.addXP(
      activityData[activity].category, 
      activityData[activity].xp
    );
    
    // Then
    expect(result.success).toBe(true);
    expect(ActivityTracker.getActivityXPMapping).toHaveBeenCalled();
    expect(mommyTree.progress.body.xp).toBe(25);
  });

  test('should trigger level progression celebration', () => {
    // Given
    const emotionXP = 100;
    
    // When
    const result = mommyTree.addXP('emotion', emotionXP);
    
    // Then
    expect(result.leveledUp).toBe(true);
    expect(LevelProgressionService.calculateLevelUp).toHaveBeenCalledWith(
      'emotion', 
      expect.any(Number)
    );
  });

  test('should unlock motherhood achievements', () => {
    // Given
    const mindXP = 75;
    
    // When
    const result = mommyTree.addXP('mind', mindXP);
    
    // Then
    expect(result.unlockedSkills).toHaveLength(1);
    expect(result.unlockedSkills[0].name).toBe('Patience Master');
    expect(AchievementService.checkUnlocks).toHaveBeenCalledWith(
      'mind',
      expect.any(Number)
    );
  });

  test('should track analytics for mom insights', async () => {
    // Given
    const growthXP = 40;
    
    // When
    mommyTree.addXP('growth', growthXP);
    
    // Then
    expect(MommyAnalytics.trackProgress).toHaveBeenCalledWith({
      userId: 'mom_sarah_123',
      category: 'growth',
      xpGained: 40,
      currentXP: expect.any(Number),
      timestamp: expect.any(String)
    });
  });
});
```

---

## 🤖 **Prompt 5: Generate Mocks cho Mommy Skill Tree**

```
Create Jest mock objects for these motherhood dependencies in Mommy Skill Tree:

- ActivityTracker.getActivityXPMapping() - Returns mapping of daily mom activities to XP
- LevelProgressionService.calculateLevelUp(category, currentXP) - Handles level progression logic
- AchievementService.checkUnlocks(category, xp) - Manages motherhood skill unlocks
- MommyAnalytics.trackProgress(data) - Tracks mom progress for insights
- NotificationService.sendCelebration(achievement) - Sends level-up celebrations
- DataPersistence.saveProgress(userId, progress) - Saves mom's skill tree data

Context: This is for a motherhood skill development app with 4 categories (body, mind, emotion, growth). Include realistic motherhood test data like:
- Activities: morning workout, baby nap meditation, emotional journaling, parenting courses
- Achievements: patience master, self-care champion, growth mindset, wellness warrior
- User data: mom profiles with realistic scenarios

Include proper mock setup/teardown and realistic motherhood scenarios.
```

---

## 🎯 **Expected AI Output: Complete Mock Suite**

```typescript
// __mocks__/mommySkillTreeMocks.ts
export const mockActivityTracker = {
  getActivityXPMapping: jest.fn(() => ({
    // Body category activities
    'morning-workout': { category: 'body', xp: 25, duration: 30 },
    'postnatal-yoga': { category: 'body', xp: 20, duration: 20 },
    'walk-with-baby': { category: 'body', xp: 15, duration: 45 },
    'healthy-meal-prep': { category: 'body', xp: 10, duration: 60 },
    
    // Mind category activities  
    'baby-nap-meditation': { category: 'mind', xp: 15, duration: 10 },
    'reading-parenting-book': { category: 'mind', xp: 12, duration: 20 },
    'mindfulness-moment': { category: 'mind', xp: 8, duration: 5 },
    'learning-new-skill': { category: 'mind', xp: 18, duration: 30 },
    
    // Emotion category activities
    'emotional-journaling': { category: 'emotion', xp: 30, duration: 15 },
    'self-care-time': { category: 'emotion', xp: 25, duration: 30 },
    'mom-friend-chat': { category: 'emotion', xp: 20, duration: 60 },
    'gratitude-practice': { category: 'emotion', xp: 12, duration: 10 },
    
    // Growth category activities
    'parenting-course': { category: 'growth', xp: 40, duration: 120 },
    'mom-support-meeting': { category: 'growth', xp: 35, duration: 90 },
    'skill-development': { category: 'growth', xp: 30, duration: 60 },
    'goal-setting-session': { category: 'growth', xp: 22, duration: 45 }
  })),
  
  validateActivity: jest.fn((activityId: string) => 
    ['morning-workout', 'baby-nap-meditation', 'emotional-journaling', 'parenting-course']
      .includes(activityId)
  )
};

export const mockLevelProgressionService = {
  calculateLevelUp: jest.fn((category: string, currentXP: number) => ({
    leveledUp: currentXP >= 100,
    newLevel: Math.floor(currentXP / 100) + 1,
    xpToNext: 100 - (currentXP % 100),
    celebration: {
      message: category === 'body' ? 'Physical wellness champion!' :
               category === 'mind' ? 'Mental clarity master!' :
               category === 'emotion' ? 'Emotional intelligence rockstar!' :
               'Personal growth superstar!',
      animation: 'level-up-sparkle',
      duration: 3000
    }
  })),
  
  getXPRequirements: jest.fn((level: number) => level * 100),
  
  calculateProgress: jest.fn((currentXP: number, level: number) => ({
    percentage: (currentXP % 100) / 100 * 100,
    xpInLevel: currentXP % 100,
    xpToNext: 100 - (currentXP % 100)
  }))
};

export const mockAchievementService = {
  checkUnlocks: jest.fn((category: string, xp: number) => {
    const achievements = [];
    
    if (xp >= 50) {
      achievements.push({
        id: `${category}-beginner`,
        name: `${category.charAt(0).toUpperCase()}${category.slice(1)} Beginner`,
        category,
        description: `Started your ${category} journey - every expert was once a beginner!`,
        icon: category === 'body' ? '💪' : 
              category === 'mind' ? '🧠' :
              category === 'emotion' ? '❤️' : '🌱',
        rarity: 'common',
        xpRequired: 50
      });
    }
    
    if (xp >= 150) {
      achievements.push({
        id: `${category}-champion`,
        name: `${category.charAt(0).toUpperCase()}${category.slice(1)} Champion`,
        category,
        description: `Consistent dedication to your ${category} development!`,
        icon: category === 'body' ? '🏆' : 
              category === 'mind' ? '🎓' :
              category === 'emotion' ? '🌟' : '🚀',
        rarity: 'rare',
        xpRequired: 150
      });
    }
    
    return achievements;
  }),
  
  getAllAchievements: jest.fn(() => [
    { id: 'patience-master', name: 'Patience Master', category: 'emotion' },
    { id: 'wellness-warrior', name: 'Wellness Warrior', category: 'body' },
    { id: 'mindful-mama', name: 'Mindful Mama', category: 'mind' },
    { id: 'growth-goddess', name: 'Growth Goddess', category: 'growth' }
  ])
};

export const mockMommyAnalytics = {
  trackProgress: jest.fn(async (data) => ({
    userId: data.userId,
    timestamp: new Date().toISOString(),
    eventType: 'xp_gained',
    category: data.category,
    xpAmount: data.xpGained,
    success: true,
    insights: {
      streakDay: 5,
      weeklyProgress: 85,
      favoriteCategory: 'emotion'
    }
  })),
  
  getDailyStats: jest.fn(async (userId: string) => ({
    totalXP: 245,
    activitiesCompleted: 8,
    currentStreak: 5,
    categoryBreakdown: {
      body: 65,
      mind: 45,
      emotion: 85,
      growth: 50
    }
  })),
  
  getWeeklyInsights: jest.fn(async (userId: string) => ({
    totalXP: 1680,
    mostActiveDay: 'Monday',
    improvementAreas: ['mind', 'growth'],
    celebrationMessage: 'Amazing week of self-care and growth!'
  }))
};

export const mockNotificationService = {
  sendCelebration: jest.fn(async (achievement) => ({
    sent: true,
    message: `🎉 Congratulations! You unlocked: ${achievement.name}`,
    type: 'celebration',
    priority: 'high',
    deliveredAt: new Date().toISOString()
  })),
  
  sendDailyReminder: jest.fn(async (userId: string) => ({
    sent: true,
    message: 'Time for your self-care moment, Super Mom! 💝',
    type: 'reminder',
    scheduledFor: '14:00'
  })),
  
  sendEncouragement: jest.fn(async (userId: string, context: string) => ({
    sent: true,
    message: context === 'low_activity' 
      ? 'Every small step counts in your motherhood journey! 🌟'
      : 'You\'re doing amazing! Keep up the great work! 💪',
    type: 'encouragement'
  }))
};

export const mockDataPersistence = {
  saveProgress: jest.fn(async (userId: string, progress: any) => ({
    success: true,
    timestamp: new Date().toISOString(),
    backupLocation: `cloud://mommy-data/${userId}/progress-backup.json`,
    version: '1.0.2'
  })),
  
  loadProgress: jest.fn(async (userId: string) => ({
    body: { xp: 125, level: 2, lastActivity: '2025-10-25T07:30:00Z' },
    mind: { xp: 85, level: 1, lastActivity: '2025-10-25T09:15:00Z' },
    emotion: { xp: 180, level: 2, lastActivity: '2025-10-25T14:00:00Z' },
    growth: { xp: 95, level: 1, lastActivity: '2025-10-25T20:30:00Z' }
  })),
  
  createBackup: jest.fn(async (userId: string) => ({
    success: true,
    backupId: `backup-${Date.now()}`,
    size: '2.4KB',
    location: `cloud://backups/${userId}/`
  }))
};

// Test Helper Functions
export const setupMotherhoodMocks = () => {
  jest.clearAllMocks();
  
  // Setup default realistic scenarios
  mockActivityTracker.getActivityXPMapping.mockReturnValue({
    'morning-workout': { category: 'body', xp: 25 },
    'emotional-journaling': { category: 'emotion', xp: 30 }
  });
  
  mockLevelProgressionService.calculateLevelUp.mockReturnValue({
    leveledUp: false,
    newLevel: 1,
    xpToNext: 75
  });
  
  mockAchievementService.checkUnlocks.mockReturnValue([]);
  mockMommyAnalytics.trackProgress.mockResolvedValue({ success: true });
  mockNotificationService.sendCelebration.mockResolvedValue({ sent: true });
  mockDataPersistence.saveProgress.mockResolvedValue({ success: true });
};

export const mockMommyProfiles = {
  newMom: {
    userId: 'new_mom_emma',
    stage: 'postpartum',
    preferences: { focusArea: 'body', notifications: true },
    currentProgress: { body: 15, mind: 8, emotion: 25, growth: 5 }
  },
  
  experiencedMom: {
    userId: 'experienced_mom_sarah',
    stage: 'established',
    preferences: { focusArea: 'growth', notifications: false },
    currentProgress: { body: 145, mind: 125, emotion: 180, growth: 200 }
  },
  
  workingMom: {
    userId: 'working_mom_lisa',
    stage: 'balancing',
    preferences: { focusArea: 'mind', notifications: true },
    currentProgress: { body: 75, mind: 155, emotion: 95, growth: 110 }
  }
};
```

---

## 🎯 **Advanced Mock Testing Scenarios**

```typescript
describe('Advanced Motherhood Mock Scenarios', () => {
  beforeEach(() => {
    setupMotherhoodMocks();
  });

  test('should handle new mom onboarding journey', () => {
    // Given - New mom profile
    const newMom = new MommySkillTree(mockMommyProfiles.newMom.userId);
    mockLevelProgressionService.calculateLevelUp.mockReturnValue({
      leveledUp: true,
      newLevel: 2,
      celebration: { message: 'First level up! You\'re amazing!' }
    });
    
    // When - First significant achievement
    const result = newMom.addXP('emotion', 50);
    
    // Then - Proper new mom celebration
    expect(result.leveledUp).toBe(true);
    expect(mockNotificationService.sendCelebration).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('amazing')
      })
    );
  });

  test('should track working mom time constraints', () => {
    // Given - Working mom with limited time
    const workingMom = new MommySkillTree(mockMommyProfiles.workingMom.userId);
    mockActivityTracker.getActivityXPMapping.mockReturnValue({
      'quick-mindfulness': { category: 'mind', xp: 8, duration: 3 }
    });
    
    // When - Quick activity during busy day
    workingMom.addXP('mind', 8);
    
    // Then - Analytics should track time-efficient activities
    expect(mockMommyAnalytics.trackProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'mind',
        context: expect.anything()
      })
    );
  });

  test('should handle service failures gracefully', () => {
    // Given - Mock service failure
    mockDataPersistence.saveProgress.mockRejectedValue(
      new Error('Network timeout')
    );
    
    // When - XP addition during network issues
    const result = mommyTree.addXP('body', 25);
    
    // Then - Should still succeed locally
    expect(result.success).toBe(true);
    expect(mommyTree.progress.body.xp).toBe(25);
  });
});
```

---

## 🚀 **Competition Optimization Benefits**

### **✅ Professional Mocking Strategy**
- **Realistic motherhood data** in all mocks
- **Service integration** testing coverage
- **Error scenario** handling
- **Performance optimization** with proper mock setup

### **✅ Domain Expertise Demonstrated**
- **Motherhood-specific activities** and achievements
- **User personas** (new mom, experienced mom, working mom)
- **Real-world scenarios** and edge cases
- **Positive psychology** approach in messages

### **✅ Technical Excellence**
- **Complete mock suite** for all dependencies
- **Async/await** handling in mocks
- **Helper functions** for test setup
- **Clean teardown** and state management

This comprehensive mocking strategy demonstrates **expert-level testing practices** and **deep domain knowledge** - perfect for winning competitions! 🏆👑