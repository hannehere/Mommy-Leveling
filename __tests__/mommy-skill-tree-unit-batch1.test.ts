// __tests__/mommy-skill-tree-unit-batch1.test.ts
// 🏆 PURE UNIT TESTS - Batch 1 (50 Tests) for Competition

import MommySkillTree, { MommySkillTreeError, createMommySkillTree } from '../lib/mommy-skill-tree';

describe('🏆 Pure Unit Tests - Batch 1 (50 Tests)', () => {
  let skillTree: MommySkillTree;

  beforeEach(() => {
    skillTree = createMommySkillTree('UNIT_TEST_USER');
  });

  // ========== CONSTRUCTOR UNIT TESTS (10 tests) ==========
  describe('Constructor Unit Tests', () => {
    test('Unit 1: Constructor initializes userId correctly', () => {
      const tree = createMommySkillTree('TEST_123');
      expect(tree.getProgress().userId).toBe('TEST_123');
    });

    test('Unit 2: Constructor initializes totalXP as zero', () => {
      expect(skillTree.getProgress().totalXP).toBe(0);
    });

    test('Unit 3: Constructor initializes level as 1', () => {
      expect(skillTree.getProgress().level).toBe(1);
    });

    test('Unit 4: Constructor initializes currentLevelXP as 0', () => {
      expect(skillTree.getProgress().currentLevelXP).toBe(0);
    });

    test('Unit 5: Constructor initializes nextLevelXP as 100', () => {
      expect(skillTree.getProgress().nextLevelXP).toBe(100);
    });

    test('Unit 6: Constructor initializes streak as 0', () => {
      expect(skillTree.getProgress().streak).toBe(0);
    });

    test('Unit 7: Constructor initializes achievements as empty array', () => {
      expect(skillTree.getProgress().achievements).toEqual([]);
    });

    test('Unit 8: Constructor initializes lastActiveDate as Date', () => {
      expect(skillTree.getProgress().lastActiveDate).toBeInstanceOf(Date);
    });

    test('Unit 9: Constructor initializes body category unlocked', () => {
      expect(skillTree.getProgress().tree.body.unlocked).toBe(true);
    });

    test('Unit 10: Constructor initializes all 4 categories', () => {
      expect(Object.keys(skillTree.getProgress().tree)).toHaveLength(4);
    });
  });

  // ========== ADD XP VALIDATION UNIT TESTS (15 tests) ==========
  describe('addXP Input Validation Unit Tests', () => {
    test('Unit 11: addXP returns success true for valid input', () => {
      expect(skillTree.addXP('body', 10).success).toBe(true);
    });

    test('Unit 12: addXP throws error for negative XP', () => {
      expect(() => skillTree.addXP('body', -5)).toThrow('XP must be greater than 0');
    });

    test('Unit 13: addXP throws error for zero XP', () => {
      expect(() => skillTree.addXP('body', 0)).toThrow('XP must be greater than 0');
    });

    test('Unit 14: addXP throws MommySkillTreeError for negative XP', () => {
      expect(() => skillTree.addXP('body', -1)).toThrow(MommySkillTreeError);
    });

    test('Unit 15: addXP error has correct code for negative XP', () => {
      try {
        skillTree.addXP('body', -1);
      } catch (error) {
        expect((error as MommySkillTreeError).code).toBe('INVALID_XP');
      }
    });

    test('Unit 16: addXP throws error for invalid category', () => {
      expect(() => {
        // @ts-ignore
        skillTree.addXP('invalid', 10);
      }).toThrow('Invalid category');
    });

    test('Unit 17: addXP invalid category error has correct code', () => {
      try {
        // @ts-ignore
        skillTree.addXP('invalid', 10);
      } catch (error) {
        expect((error as MommySkillTreeError).code).toBe('INVALID_CATEGORY');
      }
    });

    test('Unit 18: addXP handles minimum valid XP (1)', () => {
      expect(skillTree.addXP('body', 1).success).toBe(true);
    });

    test('Unit 19: addXP handles decimal XP values', () => {
      skillTree.addXP('body', 15.5);
      expect(skillTree.getProgress().tree.body.xp).toBe(15.5);
    });

    test('Unit 20: addXP handles large XP values', () => {
      skillTree.addXP('body', 9999);
      expect(skillTree.getProgress().tree.body.xp).toBe(9999);
    });

    test('Unit 21: addXP with floating point precision', () => {
      skillTree.addXP('body', 0.1);
      skillTree.addXP('body', 0.2);
      expect(skillTree.getProgress().tree.body.xp).toBeCloseTo(0.3, 10);
    });

    test('Unit 22: addXP preserves other categories when adding to body', () => {
      skillTree.addXP('mind', 20);
      skillTree.addXP('body', 30);
      expect(skillTree.getProgress().tree.mind.xp).toBe(20);
    });

    test('Unit 23: addXP updates lastActiveDate', () => {
      const beforeTime = new Date();
      skillTree.addXP('body', 10);
      expect(skillTree.getProgress().lastActiveDate.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    test('Unit 24: addXP returns leveledUp false for small amounts', () => {
      expect(skillTree.addXP('body', 10).leveledUp).toBe(false);
    });

    test('Unit 25: addXP returns empty unlockedSkills for insufficient XP', () => {
      expect(skillTree.addXP('body', 10).unlockedSkills).toEqual([]);
    });
  });

  // ========== CATEGORY-SPECIFIC XP UNIT TESTS (8 tests) ==========
  describe('Category-specific XP Unit Tests', () => {
    test('Unit 26: addXP increases body XP correctly', () => {
      skillTree.addXP('body', 25);
      expect(skillTree.getProgress().tree.body.xp).toBe(25);
    });

    test('Unit 27: addXP increases mind XP independently', () => {
      skillTree.addXP('mind', 30);
      expect(skillTree.getProgress().tree.mind.xp).toBe(30);
      expect(skillTree.getProgress().tree.body.xp).toBe(0);
    });

    test('Unit 28: addXP increases emotion XP independently', () => {
      skillTree.addXP('emotion', 40);
      expect(skillTree.getProgress().tree.emotion.xp).toBe(40);
    });

    test('Unit 29: addXP increases growth XP independently', () => {
      skillTree.addXP('growth', 50);
      expect(skillTree.getProgress().tree.growth.xp).toBe(50);
    });

    test('Unit 30: addXP accumulates correctly in same category', () => {
      skillTree.addXP('body', 10);
      skillTree.addXP('body', 15);
      expect(skillTree.getProgress().tree.body.xp).toBe(25);
    });

    test('Unit 31: addXP updates totalXP correctly', () => {
      skillTree.addXP('body', 15);
      expect(skillTree.getProgress().totalXP).toBe(15);
    });

    test('Unit 32: addXP updates currentLevelXP correctly', () => {
      skillTree.addXP('body', 20);
      expect(skillTree.getProgress().currentLevelXP).toBe(20);
    });

    test('Unit 33: addXP across categories updates totalXP', () => {
      skillTree.addXP('body', 10);
      skillTree.addXP('mind', 15);
      expect(skillTree.getProgress().totalXP).toBe(25);
    });
  });

  // ========== UNLOCK SKILL UNIT TESTS (12 tests) ==========
  describe('unlockSkill Unit Tests', () => {
    test('Unit 34: unlockSkill returns false for insufficient XP', () => {
      expect(skillTree.unlockSkill('body', 'healthy-eating')).toBe(false);
    });

    test('Unit 35: unlockSkill returns true for sufficient XP', () => {
      skillTree.addXP('body', 60);
      expect(skillTree.unlockSkill('body', 'healthy-eating')).toBe(true);
    });

    test('Unit 36: unlockSkill sets unlocked property true', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.getProgress().tree.body.skills['healthy-eating'].unlocked).toBe(true);
    });

    test('Unit 37: unlockSkill sets unlockedAt date', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.getProgress().tree.body.skills['healthy-eating'].unlockedAt).toBeInstanceOf(Date);
    });

    test('Unit 38: unlockSkill adds achievement', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.getProgress().achievements).toContain('skill-healthy-eating-unlocked');
    });

    test('Unit 39: unlockSkill throws error for non-existent skill', () => {
      expect(() => skillTree.unlockSkill('body', 'non-existent')).toThrow('Skill not found');
    });

    test('Unit 40: unlockSkill error has correct code', () => {
      try {
        skillTree.unlockSkill('body', 'non-existent');
      } catch (error) {
        expect((error as MommySkillTreeError).code).toBe('SKILL_NOT_FOUND');
      }
    });

    test('Unit 41: unlockSkill returns true if already unlocked', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.unlockSkill('body', 'healthy-eating')).toBe(true);
    });

    test('Unit 42: unlockSkill works at exact XP requirement', () => {
      skillTree.addXP('body', 50);
      expect(skillTree.unlockSkill('body', 'healthy-eating')).toBe(true);
    });

    test('Unit 43: unlockSkill fails one XP below requirement', () => {
      skillTree.addXP('body', 49);
      expect(skillTree.unlockSkill('body', 'healthy-eating')).toBe(false);
    });

    test('Unit 44: unlockSkill doesn\'t affect XP amounts', () => {
      skillTree.addXP('body', 60);
      const xpBefore = skillTree.getProgress().tree.body.xp;
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.getProgress().tree.body.xp).toBe(xpBefore);
    });

    test('Unit 45: unlockSkill achievement is added only once', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const achievementsFirst = skillTree.getProgress().achievements.length;
      skillTree.unlockSkill('body', 'healthy-eating');
      expect(skillTree.getProgress().achievements.length).toBe(achievementsFirst);
    });
  });

  // ========== HELPER METHODS UNIT TESTS (5 tests) ==========
  describe('Helper Methods Unit Tests', () => {
    test('Unit 46: getProgress returns UserProgress object', () => {
      const progress = skillTree.getProgress();
      expect(progress).toHaveProperty('userId');
      expect(progress).toHaveProperty('totalXP');
      expect(progress).toHaveProperty('level');
    });

    test('Unit 47: getSkillByCategory returns array', () => {
      const skills = skillTree.getSkillByCategory('body');
      expect(Array.isArray(skills)).toBe(true);
    });

    test('Unit 48: getUnlockedSkills returns array', () => {
      const skills = skillTree.getUnlockedSkills();
      expect(Array.isArray(skills)).toBe(true);
    });

    test('Unit 49: exportData returns string', () => {
      expect(typeof skillTree.exportData()).toBe('string');
    });

    test('Unit 50: exportData returns valid JSON', () => {
      const exported = skillTree.exportData();
      expect(() => JSON.parse(exported)).not.toThrow();
    });
  });
});