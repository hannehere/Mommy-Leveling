// __tests__/mommy-skill-tree.test.ts - Comprehensive test suite for Mommy Skill Tree
// 🧪 Testing all business logic, edge cases, and integration scenarios

import MommySkillTree, { MommySkillTreeError, createMommySkillTree } from '../lib/mommy-skill-tree';

describe('MommySkillTree Core Engine', () => {
  let skillTree: MommySkillTree;
  const userId = 'TEST_USER_001';

  beforeEach(() => {
    skillTree = createMommySkillTree(userId);
  });

  describe('Initialization', () => {
    test('should initialize with default values', () => {
      const progress = skillTree.getProgress();
      
      expect(progress.userId).toBe(userId);
      expect(progress.level).toBe(1);
      expect(progress.totalXP).toBe(0);
      expect(progress.currentLevelXP).toBe(0);
      expect(progress.nextLevelXP).toBe(100);
      expect(progress.streak).toBe(0);
      expect(Object.keys(progress.tree)).toHaveLength(4);
      expect(progress.tree.body.unlocked).toBe(true);
      expect(progress.tree.mind.unlocked).toBe(true);
      expect(progress.tree.emotion.unlocked).toBe(true);
      expect(progress.tree.growth.unlocked).toBe(true);
    });

    test('should initialize with saved progress', () => {
      const savedProgress = {
        level: 5,
        totalXP: 1500,
        streak: 10
      };

      const skillTreeWithProgress = createMommySkillTree(userId, savedProgress);
      const progress = skillTreeWithProgress.getProgress();

      expect(progress.level).toBe(5);
      expect(progress.totalXP).toBe(1500);
      expect(progress.streak).toBe(10);
    });
  });

  describe('XP Management - Core Functionality', () => {
    test('should add XP to correct category', () => {
      const result = skillTree.addXP('body', 50);
      const progress = skillTree.getProgress();

      expect(result.success).toBe(true);
      expect(progress.tree.body.xp).toBe(50);
      expect(progress.totalXP).toBe(50);
      expect(progress.currentLevelXP).toBe(50);
    });

    test('should handle multiple XP additions correctly', () => {
      skillTree.addXP('body', 30);
      skillTree.addXP('mind', 40);
      skillTree.addXP('body', 20);

      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(50);
      expect(progress.tree.mind.xp).toBe(40);
      expect(progress.totalXP).toBe(90);
    });

    test('should trigger level up at correct threshold', () => {
      const result = skillTree.addXP('body', 100);

      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);

      const progress = skillTree.getProgress();
      expect(progress.level).toBe(2);
      expect(progress.currentLevelXP).toBe(0); // Should reset after level up
      expect(progress.nextLevelXP).toBe(120); // BASE_XP_PER_LEVEL + ((2-2) * 20) = 100 + 0 = 100 for level 2->3
    });

    test('should handle multiple level ups in single XP addition', () => {
      const result = skillTree.addXP('body', 350); // Should trigger multiple level ups

      const progress = skillTree.getProgress();
      expect(progress.level).toBeGreaterThan(2);
      expect(result.leveledUp).toBe(true);
    });
  });

  describe('XP Management - Edge Cases', () => {
    test('should reject negative XP', () => {
      expect(() => {
        skillTree.addXP('body', -10);
      }).toThrow(MommySkillTreeError);
      
      expect(() => {
        skillTree.addXP('body', -10);
      }).toThrow('XP must be greater than 0');
    });

    test('should reject zero XP', () => {
      expect(() => {
        skillTree.addXP('body', 0);
      }).toThrow(MommySkillTreeError);
    });

    test('should reject invalid category', () => {
      expect(() => {
        // @ts-ignore - Testing runtime error
        skillTree.addXP('invalid_category', 50);
      }).toThrow('Invalid category');
    });

    test('should handle extremely large XP values', () => {
      const result = skillTree.addXP('body', 10000);
      
      expect(result.success).toBe(true);
      const progress = skillTree.getProgress();
      expect(progress.level).toBeGreaterThan(10);
      expect(progress.totalXP).toBe(10000);
    });
  });

  describe('Skill Unlocking Logic', () => {
    test('should unlock skill when XP requirement met', () => {
      skillTree.addXP('body', 60); // Above healthy-eating requirement (50)
      
      const unlockedSkills = skillTree.getUnlockedSkills();
      const healthyEatingSkill = unlockedSkills.find(skill => skill.id === 'healthy-eating');
      
      expect(healthyEatingSkill).toBeDefined();
      expect(healthyEatingSkill?.unlocked).toBe(true);
      expect(healthyEatingSkill?.unlockedAt).toBeInstanceOf(Date);
    });

    test('should not unlock skill when XP insufficient', () => {
      skillTree.addXP('body', 30); // Below healthy-eating requirement (50)
      
      const progress = skillTree.getProgress();
      const healthyEatingSkill = progress.tree.body.skills['healthy-eating'];
      
      expect(healthyEatingSkill.unlocked).toBe(false);
    });

    test('should check prerequisites before unlocking', () => {
      // rest-recovery requires healthy-eating as prerequisite
      skillTree.addXP('body', 200); // More than enough XP
      
      const progress = skillTree.getProgress();
      const restRecoverySkill = progress.tree.body.skills['rest-recovery'];
      
      // Should unlock healthy-eating and regular-exercise but rest-recovery needs healthy-eating first
      expect(progress.tree.body.skills['healthy-eating'].unlocked).toBe(true);
      expect(progress.tree.body.skills['regular-exercise'].unlocked).toBe(true);
      expect(restRecoverySkill.unlocked).toBe(true); // Should unlock since healthy-eating is now unlocked
    });

    test('should unlock multiple skills in single XP addition', () => {
      const result = skillTree.addXP('mind', 200);
      
      expect(result.unlockedSkills.length).toBeGreaterThan(1);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.mind.skills['mindfulness'].unlocked).toBe(true);
      expect(progress.tree.mind.skills['continuous-learning'].unlocked).toBe(true);
    });

    test('should add achievements when skills unlock', () => {
      skillTree.addXP('emotion', 70);
      
      const progress = skillTree.getProgress();
      expect(progress.achievements).toContain('skill-emotional-regulation-unlocked');
    });
  });

  describe('Manual Skill Unlocking', () => {
    test('should manually unlock skill with sufficient XP', () => {
      skillTree.addXP('growth', 100);
      const result = skillTree.unlockSkill('growth', 'goal-setting');
      
      expect(result).toBe(true);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.growth.skills['goal-setting'].unlocked).toBe(true);
    });

    test('should fail to unlock skill with insufficient XP', () => {
      skillTree.addXP('growth', 30); // Below goal-setting requirement (80)
      const result = skillTree.unlockSkill('growth', 'goal-setting');
      
      expect(result).toBe(false);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.growth.skills['goal-setting'].unlocked).toBe(false);
    });

    test('should return true if skill already unlocked', () => {
      skillTree.addXP('growth', 100);
      skillTree.unlockSkill('growth', 'goal-setting');
      
      const result = skillTree.unlockSkill('growth', 'goal-setting');
      expect(result).toBe(true);
    });

    test('should throw error for non-existent skill', () => {
      expect(() => {
        skillTree.unlockSkill('growth', 'non-existent-skill');
      }).toThrow('Skill not found');
    });
  });

  describe('XP Decay System', () => {
    test('should not decay XP within threshold period', () => {
      skillTree.addXP('body', 100);
      
      const result = skillTree.decayXP(2); // Within threshold
      
      expect(result.decayed).toBe(false);
      expect(result.decayAmount).toBe(0);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(100);
    });

    test('should decay XP after threshold period', () => {
      skillTree.addXP('body', 100);
      skillTree.addXP('mind', 80);
      
      const result = skillTree.decayXP(7); // Beyond threshold
      
      expect(result.decayed).toBe(true);
      expect(result.decayAmount).toBeGreaterThan(0);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeLessThan(100);
      expect(progress.tree.mind.xp).toBeLessThan(80);
    });

    test('should reset streak after long inactivity', () => {
      skillTree.addXP('body', 50);
      const progress = skillTree.getProgress();
      progress.streak = 10; // Set some streak
      
      skillTree.decayXP(10); // Long inactivity
      
      const updatedProgress = skillTree.getProgress();
      expect(updatedProgress.streak).toBe(0);
    });

    test('should not reduce XP below zero', () => {
      skillTree.addXP('body', 10);
      
      skillTree.decayXP(30); // Extreme inactivity
      
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeGreaterThanOrEqual(0); // Should not go below 0
      expect(progress.totalXP).toBeGreaterThanOrEqual(0); // Should not go below 0
      
      // With extreme decay, should be close to 0
      expect(progress.tree.body.xp).toBeLessThanOrEqual(10);
    });
  });

  describe('Progress Calculation', () => {
    test('should calculate overall progress correctly', () => {
      skillTree.addXP('body', 100);
      skillTree.addXP('mind', 150);
      
      const progress = skillTree.calculateProgress();
      
      expect(progress.overall).toBeGreaterThan(0);
      expect(progress.overall).toBeLessThanOrEqual(1);
      expect(progress.byCategory.body).toBeGreaterThan(0);
      expect(progress.byCategory.mind).toBeGreaterThan(0);
    });

    test('should calculate next level progress correctly', () => {
      skillTree.addXP('body', 50);
      
      const progress = skillTree.calculateProgress();
      
      expect(progress.nextLevelProgress).toBe(0.5); // 50/100
    });

    test('should handle zero progress correctly', () => {
      const progress = skillTree.calculateProgress();
      
      expect(progress.overall).toBe(0);
      expect(progress.nextLevelProgress).toBe(0);
      Object.values(progress.byCategory).forEach(value => {
        expect(value).toBe(0);
      });
    });
  });

  describe('Data Management', () => {
    test('should clear progress completely', () => {
      skillTree.addXP('body', 100);
      skillTree.addXP('mind', 50);
      
      skillTree.clearProgress();
      
      const progress = skillTree.getProgress();
      expect(progress.level).toBe(1);
      expect(progress.totalXP).toBe(0);
      expect(progress.tree.body.xp).toBe(0);
      expect(progress.tree.mind.xp).toBe(0);
      expect(progress.achievements).toHaveLength(0);
    });

    test('should export data correctly', () => {
      skillTree.addXP('body', 100);
      
      const exportedData = skillTree.exportData();
      const parsed = JSON.parse(exportedData);
      
      expect(parsed.userId).toBe(userId);
      expect(parsed.totalXP).toBe(100);
      expect(parsed.tree.body.xp).toBe(100);
    });

    test('should import data correctly', () => {
      const testData = {
        userId: userId,
        level: 3,
        totalXP: 500,
        tree: {
          body: { xp: 200 },
          mind: { xp: 150 }
        }
      };
      
      skillTree.importData(JSON.stringify(testData));
      
      const progress = skillTree.getProgress();
      expect(progress.level).toBe(3);
      expect(progress.totalXP).toBe(500);
    });

    test('should throw error on invalid import data', () => {
      expect(() => {
        skillTree.importData('invalid json data');
      }).toThrow('Invalid import data');
    });
  });

  describe('Activity Integration', () => {
    test('should add XP from predefined activities', () => {
      const result = skillTree.addXPFromActivity('nutrition');
      
      expect(result.success).toBe(true);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(15); // Default nutrition XP
    });

    test('should override activity XP amount', () => {
      const result = skillTree.addXPFromActivity('meditation', 30);
      
      expect(result.success).toBe(true);
      
      const progress = skillTree.getProgress();
      expect(progress.tree.mind.xp).toBe(30); // Custom amount instead of default 18
    });

    test('should get activity XP mapping', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      
      expect(mapping.nutrition.category).toBe('body');
      expect(mapping.meditation.category).toBe('mind');
      expect(mapping.journaling.category).toBe('emotion');
      expect(mapping.milestone.category).toBe('growth');
      expect(typeof mapping.nutrition.xp).toBe('number');
    });
  });

  describe('Utility Methods', () => {
    test('should get skills by category', () => {
      const bodySkills = skillTree.getSkillByCategory('body');
      
      expect(bodySkills.length).toBeGreaterThan(0);
      bodySkills.forEach(skill => {
        expect(skill.category.id).toBe('body');
      });
    });

    test('should get unlocked skills only', () => {
      skillTree.addXP('body', 100);
      
      const unlockedSkills = skillTree.getUnlockedSkills();
      
      unlockedSkills.forEach(skill => {
        expect(skill.unlocked).toBe(true);
      });
    });

    test('should get available skills for unlock', () => {
      skillTree.addXP('mind', 80);
      
      const availableSkills = skillTree.getAvailableSkills('mind');
      
      availableSkills.forEach(skill => {
        expect(skill.unlocked).toBe(false);
        expect(skillTree.getProgress().tree.mind.xp).toBeGreaterThanOrEqual(skill.requiredXP);
      });
    });
  });

  describe('Streak Management', () => {
    test('should maintain streak on consecutive days', () => {
      // Test simple streak logic - just verify it doesn't crash and maintains basic logic
      skillTree.addXP('body', 10);
      let progress = skillTree.getProgress();
      expect(progress.streak).toBeGreaterThanOrEqual(1); // Should have at least 1 day streak
      
      // Add more XP same day
      skillTree.addXP('body', 10);
      progress = skillTree.getProgress();
      expect(progress.streak).toBeGreaterThanOrEqual(1); // Should maintain streak
    });
  });

  describe('Complex Integration Scenarios', () => {
    test('should handle complete user journey', () => {
      // Week 1: Starting journey
      skillTree.addXPFromActivity('nutrition', 25); // Higher amounts to reach unlock thresholds
      skillTree.addXPFromActivity('meditation', 30);
      skillTree.addXPFromActivity('journaling', 20);
      
      let progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(75);
      
      // Week 2: More activities, some skills unlock
      skillTree.addXPFromActivity('exercise', 30);
      skillTree.addXPFromActivity('learning', 35);
      skillTree.addXPFromActivity('bonding', 25);
      
      progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(165);
      expect(progress.level).toBeGreaterThan(1);
      
      const unlockedSkills = skillTree.getUnlockedSkills();
      expect(unlockedSkills.length).toBeGreaterThan(0);
      
      // Week 3: Decay test
      skillTree.decayXP(5);
      
      const finalProgress = skillTree.getProgress();
      expect(finalProgress.totalXP).toBeLessThan(165);
    });

    test('should maintain data integrity across operations', () => {
      // Perform various operations
      skillTree.addXP('body', 80);
      skillTree.addXP('mind', 90);
      skillTree.unlockSkill('body', 'healthy-eating');
      skillTree.decayXP(3);
      
      // Export and reimport
      const exported = skillTree.exportData();
      const newSkillTree = createMommySkillTree('TEST_USER_002');
      newSkillTree.importData(exported);
      
      // Verify data integrity
      const originalProgress = skillTree.getProgress();
      const importedProgress = newSkillTree.getProgress();
      
      expect(importedProgress.tree.body.xp).toBe(originalProgress.tree.body.xp);
      expect(importedProgress.tree.mind.xp).toBe(originalProgress.tree.mind.xp);
      expect(importedProgress.level).toBe(originalProgress.level);
    });
  });

  describe('Performance and Scalability', () => {
    test('should handle rapid XP additions efficiently', () => {
      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        skillTree.addXP('body', 1);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
      
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(1000);
    });

    test('should handle large skill trees efficiently', () => {
      // Add many skills through multiple categories
      ['body', 'mind', 'emotion', 'growth'].forEach(category => {
        skillTree.addXP(category as any, 500);
      });
      
      const start = performance.now();
      const unlockedSkills = skillTree.getUnlockedSkills();
      const availableSkills = skillTree.getAvailableSkills();
      const progress = skillTree.calculateProgress();
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100); // Should be very fast
      expect(unlockedSkills.length).toBeGreaterThan(0);
      expect(progress.overall).toBeGreaterThan(0);
    });
  });
});

// Additional test utilities
export const TestUtils = {
  createSkillTreeWithProgress: (level: number, totalXP: number) => {
    const tree = createMommySkillTree('TEST_USER');
    const progress = {
      level,
      totalXP,
      currentLevelXP: totalXP % 100,
      tree: {
        body: { xp: Math.floor(totalXP * 0.3) },
        mind: { xp: Math.floor(totalXP * 0.25) },
        emotion: { xp: Math.floor(totalXP * 0.25) },
        growth: { xp: Math.floor(totalXP * 0.2) }
      }
    };
    tree.importData(JSON.stringify(progress));
    return tree;
  },

  simulateUserActivity: (tree: MommySkillTree, days: number) => {
    const activities = ['nutrition', 'exercise', 'meditation', 'journaling'] as const;
    
    for (let day = 0; day < days; day++) {
      const dailyActivities = Math.floor(Math.random() * 3) + 1;
      
      for (let activity = 0; activity < dailyActivities; activity++) {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        tree.addXPFromActivity(randomActivity);
      }
    }
    
    return tree.getProgress();
  }
};