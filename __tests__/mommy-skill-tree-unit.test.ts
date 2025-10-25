// __tests__/mommy-skill-tree-unit.test.ts
// 🎯 PURE UNIT TESTS - High Volume for Competition Requirements
// Each test focuses on SINGLE FUNCTION/METHOD in isolation

import MommySkillTree, { MommySkillTreeError, createMommySkillTree, SkillNode, UserProgress } from '../lib/mommy-skill-tree';

describe('🏆 Pure Unit Tests - Competition Grade (100+ Tests)', () => {
  let skillTree: MommySkillTree;
  const testUserId = 'UNIT_TEST_USER';

  beforeEach(() => {
    skillTree = createMommySkillTree(testUserId);
  });

  // ========== CONSTRUCTOR UNIT TESTS (10 tests) ==========
  describe('Constructor Unit Tests', () => {
    test('Unit 1: Constructor initializes userId correctly', () => {
      const tree = createMommySkillTree('TEST_123');
      const progress = tree.getProgress();
      expect(progress.userId).toBe('TEST_123');
    });

    test('Unit 2: Constructor initializes totalXP as zero', () => {
      const progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(0);
    });

    test('Unit 3: Constructor initializes level as 1', () => {
      const progress = skillTree.getProgress();
      expect(progress.level).toBe(1);
    });

    test('Unit 4: Constructor initializes currentLevelXP as 0', () => {
      const progress = skillTree.getProgress();
      expect(progress.currentLevelXP).toBe(0);
    });

    test('Unit 5: Constructor initializes nextLevelXP as 100', () => {
      const progress = skillTree.getProgress();
      expect(progress.nextLevelXP).toBe(100);
    });

    test('Unit 6: Constructor initializes streak as 0', () => {
      const progress = skillTree.getProgress();
      expect(progress.streak).toBe(0);
    });

    test('Unit 7: Constructor initializes achievements as empty array', () => {
      const progress = skillTree.getProgress();
      expect(progress.achievements).toEqual([]);
    });

    test('Unit 8: Constructor initializes lastActiveDate as Date', () => {
      const progress = skillTree.getProgress();
      expect(progress.lastActiveDate).toBeInstanceOf(Date);
    });

    test('Unit 9: Constructor initializes body category', () => {
      const progress = skillTree.getProgress();
      expect(progress.tree.body).toBeDefined();
      expect(progress.tree.body.xp).toBe(0);
      expect(progress.tree.body.unlocked).toBe(true);
    });

    test('Unit 10: Constructor initializes all 4 categories', () => {
      const progress = skillTree.getProgress();
      expect(Object.keys(progress.tree)).toHaveLength(4);
      expect(progress.tree.body).toBeDefined();
      expect(progress.tree.mind).toBeDefined();
      expect(progress.tree.emotion).toBeDefined();
      expect(progress.tree.growth).toBeDefined();
    });
  });

  // ========== ADD XP METHOD UNIT TESTS (25 tests) ==========
  describe('addXP Method Unit Tests', () => {
    test('Unit 11: addXP returns success true for valid input', () => {
      const result = skillTree.addXP('body', 10);
      expect(result.success).toBe(true);
    });

    test('Unit 12: addXP returns leveledUp false for small XP', () => {
      const result = skillTree.addXP('body', 10);
      expect(result.leveledUp).toBe(false);
    });

    test('Unit 13: addXP returns empty unlockedSkills for insufficient XP', () => {
      const result = skillTree.addXP('body', 10);
      expect(result.unlockedSkills).toEqual([]);
    });

    test('Unit 14: addXP increases body XP by exact amount', () => {
      skillTree.addXP('body', 25);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(25);
    });

    test('Unit 15: addXP increases mind XP independently', () => {
      skillTree.addXP('mind', 30);
      const progress = skillTree.getProgress();
      expect(progress.tree.mind.xp).toBe(30);
      expect(progress.tree.body.xp).toBe(0);
    });

    test('Unit 16: addXP increases emotion XP independently', () => {
      skillTree.addXP('emotion', 40);
      const progress = skillTree.getProgress();
      expect(progress.tree.emotion.xp).toBe(40);
    });

    test('Unit 17: addXP increases growth XP independently', () => {
      skillTree.addXP('growth', 50);
      const progress = skillTree.getProgress();
      expect(progress.tree.growth.xp).toBe(50);
    });

    test('Unit 18: addXP increases totalXP correctly', () => {
      skillTree.addXP('body', 15);
      const progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(15);
    });

    test('Unit 19: addXP increases currentLevelXP correctly', () => {
      skillTree.addXP('body', 20);
      const progress = skillTree.getProgress();
      expect(progress.currentLevelXP).toBe(20);
    });

    test('Unit 20: addXP throws error for negative XP', () => {
      expect(() => skillTree.addXP('body', -5)).toThrow(MommySkillTreeError);
    });

    test('Unit 21: addXP throws error for zero XP', () => {
      expect(() => skillTree.addXP('body', 0)).toThrow(MommySkillTreeError);
    });

    test('Unit 22: addXP throws specific error message for negative XP', () => {
      expect(() => skillTree.addXP('body', -1)).toThrow('XP must be greater than 0');
    });

    test('Unit 23: addXP throws specific error message for zero XP', () => {
      expect(() => skillTree.addXP('body', 0)).toThrow('XP must be greater than 0');
    });

    test('Unit 24: addXP throws error for invalid category', () => {
      expect(() => {
        // @ts-ignore
        skillTree.addXP('invalid', 10);
      }).toThrow('Invalid category');
    });

    test('Unit 25: addXP handles decimal XP values', () => {
      skillTree.addXP('body', 15.5);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(15.5);
    });

    test('Unit 26: addXP handles large XP values', () => {
      skillTree.addXP('body', 9999);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(9999);
    });

    test('Unit 27: addXP updates lastActiveDate', () => {
      const beforeTime = new Date();
      skillTree.addXP('body', 10);
      const progress = skillTree.getProgress();
      expect(progress.lastActiveDate.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    test('Unit 28: addXP returns leveledUp true when threshold reached', () => {
      const result = skillTree.addXP('body', 100);
      expect(result.leveledUp).toBe(true);
    });

    test('Unit 29: addXP returns newLevel when leveled up', () => {
      const result = skillTree.addXP('body', 100);
      expect(result.newLevel).toBe(2);
    });

    test('Unit 30: addXP preserves other categories XP', () => {
      skillTree.addXP('mind', 20);
      skillTree.addXP('body', 30);
      const progress = skillTree.getProgress();
      expect(progress.tree.mind.xp).toBe(20);
      expect(progress.tree.body.xp).toBe(30);
    });

    test('Unit 31: addXP handles floating point precision', () => {
      skillTree.addXP('body', 0.1);
      skillTree.addXP('body', 0.2);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeCloseTo(0.3, 10);
    });

    test('Unit 32: addXP error has correct error code', () => {
      try {
        skillTree.addXP('body', -1);
      } catch (error) {
        expect(error).toBeInstanceOf(MommySkillTreeError);
        expect((error as MommySkillTreeError).code).toBe('INVALID_XP');
      }
    });

    test('Unit 33: addXP invalid category error has correct code', () => {
      try {
        // @ts-ignore
        skillTree.addXP('invalid', 10);
      } catch (error) {
        expect(error).toBeInstanceOf(MommySkillTreeError);
        expect((error as MommySkillTreeError).code).toBe('INVALID_CATEGORY');
      }
    });

    test('Unit 34: addXP with 1 XP works correctly', () => {
      const result = skillTree.addXP('body', 1);
      expect(result.success).toBe(true);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(1);
    });

    test('Unit 35: addXP with maximum safe integer', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER;
      skillTree.addXP('body', maxSafe);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(maxSafe);
    });
  });

  // ========== UNLOCK SKILL METHOD UNIT TESTS (20 tests) ==========
  describe('unlockSkill Method Unit Tests', () => {
    test('Unit 36: unlockSkill returns false for insufficient XP', () => {
      const result = skillTree.unlockSkill('body', 'healthy-eating');
      expect(result).toBe(false);
    });

    test('Unit 37: unlockSkill returns true for sufficient XP', () => {
      skillTree.addXP('body', 60);
      const result = skillTree.unlockSkill('body', 'healthy-eating');
      expect(result).toBe(true);
    });

    test('Unit 38: unlockSkill sets skill unlocked property', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const progress = skillTree.getProgress();
      expect(progress.tree.body.skills['healthy-eating'].unlocked).toBe(true);
    });

    test('Unit 39: unlockSkill sets unlockedAt date', () => {
      skillTree.addXP('body', 60);
      const beforeTime = new Date();
      skillTree.unlockSkill('body', 'healthy-eating');
      const progress = skillTree.getProgress();
      const unlockedAt = progress.tree.body.skills['healthy-eating'].unlockedAt;
      expect(unlockedAt).toBeInstanceOf(Date);
      expect(unlockedAt!.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    test('Unit 40: unlockSkill adds achievement', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const progress = skillTree.getProgress();
      expect(progress.achievements).toContain('skill-healthy-eating-unlocked');
    });

    test('Unit 41: unlockSkill throws error for non-existent skill', () => {
      expect(() => {
        skillTree.unlockSkill('body', 'non-existent-skill');
      }).toThrow('Skill not found');
    });

    test('Unit 42: unlockSkill error has correct code', () => {
      try {
        skillTree.unlockSkill('body', 'non-existent-skill');
      } catch (error) {
        expect(error).toBeInstanceOf(MommySkillTreeError);
        expect((error as MommySkillTreeError).code).toBe('SKILL_NOT_FOUND');
      }
    });

    test('Unit 43: unlockSkill returns true if already unlocked', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const result = skillTree.unlockSkill('body', 'healthy-eating');
      expect(result).toBe(true);
    });

    test('Unit 44: unlockSkill works for mind category', () => {
      skillTree.addXP('mind', 80);
      const result = skillTree.unlockSkill('mind', 'mindfulness');
      expect(result).toBe(true);
    });

    test('Unit 45: unlockSkill works for emotion category', () => {
      skillTree.addXP('emotion', 70);
      const result = skillTree.unlockSkill('emotion', 'emotional-regulation');
      expect(result).toBe(true);
    });

    test('Unit 46: unlockSkill works for growth category', () => {
      skillTree.addXP('growth', 90);
      const result = skillTree.unlockSkill('growth', 'goal-setting');
      expect(result).toBe(true);
    });

    test('Unit 47: unlockSkill preserves other skills state', () => {
      skillTree.addXP('body', 200);
      const beforeUnlock = skillTree.getProgress().tree.body.skills['regular-exercise'].unlocked;
      skillTree.unlockSkill('body', 'healthy-eating');
      const afterUnlock = skillTree.getProgress().tree.body.skills['regular-exercise'].unlocked;
      expect(beforeUnlock).toBe(afterUnlock);
    });

    test('Unit 48: unlockSkill exact XP requirement boundary', () => {
      skillTree.addXP('body', 50); // Exact requirement for healthy-eating
      const result = skillTree.unlockSkill('body', 'healthy-eating');
      expect(result).toBe(true);
    });

    test('Unit 49: unlockSkill one XP below requirement', () => {
      skillTree.addXP('body', 49); // One below requirement
      const result = skillTree.unlockSkill('body', 'healthy-eating');
      expect(result).toBe(false);
    });

    test('Unit 50: unlockSkill doesn\'t affect XP amounts', () => {
      skillTree.addXP('body', 60);
      const xpBefore = skillTree.getProgress().tree.body.xp;
      skillTree.unlockSkill('body', 'healthy-eating');
      const xpAfter = skillTree.getProgress().tree.body.xp;
      expect(xpBefore).toBe(xpAfter);
    });

    test('Unit 51: unlockSkill achievement array length increases', () => {
      skillTree.addXP('body', 60);
      const achievementsBefore = skillTree.getProgress().achievements.length;
      skillTree.unlockSkill('body', 'healthy-eating');
      const achievementsAfter = skillTree.getProgress().achievements.length;
      expect(achievementsAfter).toBe(achievementsBefore + 1);
    });

    test('Unit 52: unlockSkill doesn\'t add duplicate achievements', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const achievementsAfterFirst = skillTree.getProgress().achievements.length;
      skillTree.unlockSkill('body', 'healthy-eating');
      const achievementsAfterSecond = skillTree.getProgress().achievements.length;
      expect(achievementsAfterFirst).toBe(achievementsAfterSecond);
    });

    test('Unit 53: unlockSkill throws error for invalid category', () => {
      expect(() => {
        // @ts-ignore
        skillTree.unlockSkill('invalid', 'some-skill');
      }).toThrow();
    });

    test('Unit 54: unlockSkill skill object structure validation', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const skill = skillTree.getProgress().tree.body.skills['healthy-eating'];
      expect(skill).toHaveProperty('id');
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('unlocked');
      expect(skill).toHaveProperty('unlockedAt');
    });

    test('Unit 55: unlockSkill maintains skill metadata', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const skill = skillTree.getProgress().tree.body.skills['healthy-eating'];
      expect(skill.id).toBe('healthy-eating');
      expect(skill.name).toBe('Dinh dưỡng cân bằng');
      expect(skill.requiredXP).toBe(50);
    });
  });

  // ========== DECAY XP METHOD UNIT TESTS (15 tests) ==========
  describe('decayXP Method Unit Tests', () => {
    test('Unit 56: decayXP returns false for days within threshold', () => {
      const result = skillTree.decayXP(1);
      expect(result.decayed).toBe(false);
    });

    test('Unit 57: decayXP returns zero decay amount within threshold', () => {
      const result = skillTree.decayXP(2);
      expect(result.decayAmount).toBe(0);
    });

    test('Unit 58: decayXP returns true for days beyond threshold', () => {
      skillTree.addXP('body', 100);
      const result = skillTree.decayXP(5);
      expect(result.decayed).toBe(true);
    });

    test('Unit 59: decayXP returns positive decay amount beyond threshold', () => {
      skillTree.addXP('body', 100);
      const result = skillTree.decayXP(5);
      expect(result.decayAmount).toBeGreaterThan(0);
    });

    test('Unit 60: decayXP reduces body XP correctly', () => {
      skillTree.addXP('body', 100);
      const xpBefore = skillTree.getProgress().tree.body.xp;
      skillTree.decayXP(5);
      const xpAfter = skillTree.getProgress().tree.body.xp;
      expect(xpAfter).toBeLessThan(xpBefore);
    });

    test('Unit 61: decayXP reduces mind XP correctly', () => {
      skillTree.addXP('mind', 100);
      const xpBefore = skillTree.getProgress().tree.mind.xp;
      skillTree.decayXP(5);
      const xpAfter = skillTree.getProgress().tree.mind.xp;
      expect(xpAfter).toBeLessThan(xpBefore);
    });

    test('Unit 62: decayXP reduces emotion XP correctly', () => {
      skillTree.addXP('emotion', 100);
      const xpBefore = skillTree.getProgress().tree.emotion.xp;
      skillTree.decayXP(5);
      const xpAfter = skillTree.getProgress().tree.emotion.xp;
      expect(xpAfter).toBeLessThan(xpBefore);
    });

    test('Unit 63: decayXP reduces growth XP correctly', () => {
      skillTree.addXP('growth', 100);
      const xpBefore = skillTree.getProgress().tree.growth.xp;
      skillTree.decayXP(5);
      const xpAfter = skillTree.getProgress().tree.growth.xp;
      expect(xpAfter).toBeLessThan(xpBefore);
    });

    test('Unit 64: decayXP doesn\'t reduce XP below zero', () => {
      skillTree.addXP('body', 10);
      skillTree.decayXP(100);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeGreaterThanOrEqual(0);
    });

    test('Unit 65: decayXP resets streak after 7 days', () => {
      skillTree.addXP('body', 10); // Set streak to 1
      skillTree.decayXP(8);
      const progress = skillTree.getProgress();
      expect(progress.streak).toBe(0);
    });

    test('Unit 66: decayXP preserves streak under 7 days', () => {
      skillTree.addXP('body', 10);
      const streakBefore = skillTree.getProgress().streak;
      skillTree.decayXP(5);
      const streakAfter = skillTree.getProgress().streak;
      expect(streakAfter).toBe(streakBefore);
    });

    test('Unit 67: decayXP with zero days has no effect', () => {
      skillTree.addXP('body', 100);
      const progressBefore = skillTree.getProgress();
      skillTree.decayXP(0);
      const progressAfter = skillTree.getProgress();
      expect(progressAfter.tree.body.xp).toBe(progressBefore.tree.body.xp);
    });

    test('Unit 68: decayXP calculates totalXP correctly', () => {
      skillTree.addXP('body', 50);
      skillTree.addXP('mind', 50);
      skillTree.decayXP(5);
      const progress = skillTree.getProgress();
      const calculatedTotal = progress.tree.body.xp + progress.tree.mind.xp + 
                             progress.tree.emotion.xp + progress.tree.growth.xp;
      expect(progress.totalXP).toBe(calculatedTotal);
    });

    test('Unit 69: decayXP with negative days parameter', () => {
      skillTree.addXP('body', 100);
      const result = skillTree.decayXP(-1);
      expect(result.decayed).toBe(false);
    });

    test('Unit 70: decayXP returns object with correct properties', () => {
      const result = skillTree.decayXP(1);
      expect(result).toHaveProperty('decayed');
      expect(result).toHaveProperty('decayAmount');
      expect(typeof result.decayed).toBe('boolean');
      expect(typeof result.decayAmount).toBe('number');
    });
  });

  // ========== CALCULATE PROGRESS METHOD UNIT TESTS (10 tests) ==========
  describe('calculateProgress Method Unit Tests', () => {
    test('Unit 71: calculateProgress returns object with correct properties', () => {
      const progress = skillTree.calculateProgress();
      expect(progress).toHaveProperty('overall');
      expect(progress).toHaveProperty('byCategory');
      expect(progress).toHaveProperty('nextLevelProgress');
    });

    test('Unit 72: calculateProgress overall is number', () => {
      const progress = skillTree.calculateProgress();
      expect(typeof progress.overall).toBe('number');
    });

    test('Unit 73: calculateProgress byCategory is object', () => {
      const progress = skillTree.calculateProgress();
      expect(typeof progress.byCategory).toBe('object');
    });

    test('Unit 74: calculateProgress nextLevelProgress is number', () => {
      const progress = skillTree.calculateProgress();
      expect(typeof progress.nextLevelProgress).toBe('number');
    });

    test('Unit 75: calculateProgress overall is 0 for new tree', () => {
      const progress = skillTree.calculateProgress();
      expect(progress.overall).toBe(0);
    });

    test('Unit 76: calculateProgress nextLevelProgress is 0 for new tree', () => {
      const progress = skillTree.calculateProgress();
      expect(progress.nextLevelProgress).toBe(0);
    });

    test('Unit 77: calculateProgress byCategory has 4 categories', () => {
      const progress = skillTree.calculateProgress();
      expect(Object.keys(progress.byCategory)).toHaveLength(4);
    });

    test('Unit 78: calculateProgress byCategory contains correct keys', () => {
      const progress = skillTree.calculateProgress();
      expect(progress.byCategory).toHaveProperty('body');
      expect(progress.byCategory).toHaveProperty('mind');
      expect(progress.byCategory).toHaveProperty('emotion');
      expect(progress.byCategory).toHaveProperty('growth');
    });

    test('Unit 79: calculateProgress increases with XP', () => {
      const progressBefore = skillTree.calculateProgress();
      skillTree.addXP('body', 50);
      const progressAfter = skillTree.calculateProgress();
      expect(progressAfter.overall).toBeGreaterThan(progressBefore.overall);
    });

    test('Unit 80: calculateProgress nextLevelProgress increases correctly', () => {
      skillTree.addXP('body', 25);
      const progress = skillTree.calculateProgress();
      expect(progress.nextLevelProgress).toBe(0.25); // 25/100
    });
  });

  // ========== CLEAR PROGRESS METHOD UNIT TESTS (5 tests) ==========
  describe('clearProgress Method Unit Tests', () => {
    test('Unit 81: clearProgress resets totalXP to 0', () => {
      skillTree.addXP('body', 100);
      skillTree.clearProgress();
      const progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(0);
    });

    test('Unit 82: clearProgress resets level to 1', () => {
      skillTree.addXP('body', 200);
      skillTree.clearProgress();
      const progress = skillTree.getProgress();
      expect(progress.level).toBe(1);
    });

    test('Unit 83: clearProgress resets all category XP', () => {
      skillTree.addXP('body', 50);
      skillTree.addXP('mind', 40);
      skillTree.clearProgress();
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(0);
      expect(progress.tree.mind.xp).toBe(0);
      expect(progress.tree.emotion.xp).toBe(0);
      expect(progress.tree.growth.xp).toBe(0);
    });

    test('Unit 84: clearProgress resets achievements', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      skillTree.clearProgress();
      const progress = skillTree.getProgress();
      expect(progress.achievements).toEqual([]);
    });

    test('Unit 85: clearProgress maintains userId', () => {
      skillTree.addXP('body', 100);
      const userIdBefore = skillTree.getProgress().userId;
      skillTree.clearProgress();
      const userIdAfter = skillTree.getProgress().userId;
      expect(userIdAfter).toBe(userIdBefore);
    });
  });

  // ========== GET PROGRESS METHOD UNIT TESTS (5 tests) ==========
  describe('getProgress Method Unit Tests', () => {
    test('Unit 86: getProgress returns UserProgress object', () => {
      const progress = skillTree.getProgress();
      expect(progress).toHaveProperty('userId');
      expect(progress).toHaveProperty('totalXP');
      expect(progress).toHaveProperty('level');
      expect(progress).toHaveProperty('tree');
    });

    test('Unit 87: getProgress returns copy not reference', () => {
      const progress1 = skillTree.getProgress();
      const progress2 = skillTree.getProgress();
      expect(progress1).not.toBe(progress2);
    });

    test('Unit 88: getProgress reflects current state', () => {
      skillTree.addXP('body', 30);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(30);
    });

    test('Unit 89: getProgress tree has all categories', () => {
      const progress = skillTree.getProgress();
      expect(progress.tree).toHaveProperty('body');
      expect(progress.tree).toHaveProperty('mind');
      expect(progress.tree).toHaveProperty('emotion');
      expect(progress.tree).toHaveProperty('growth');
    });

    test('Unit 90: getProgress contains valid Date', () => {
      const progress = skillTree.getProgress();
      expect(progress.lastActiveDate).toBeInstanceOf(Date);
    });
  });

  // ========== EXPORT/IMPORT DATA UNIT TESTS (10 tests) ==========
  describe('exportData/importData Method Unit Tests', () => {
    test('Unit 91: exportData returns string', () => {
      const exported = skillTree.exportData();
      expect(typeof exported).toBe('string');
    });

    test('Unit 92: exportData returns valid JSON', () => {
      const exported = skillTree.exportData();
      expect(() => JSON.parse(exported)).not.toThrow();
    });

    test('Unit 93: exportData contains userId', () => {
      const exported = skillTree.exportData();
      const parsed = JSON.parse(exported);
      expect(parsed).toHaveProperty('userId');
    });

    test('Unit 94: exportData contains totalXP', () => {
      skillTree.addXP('body', 50);
      const exported = skillTree.exportData();
      const parsed = JSON.parse(exported);
      expect(parsed.totalXP).toBe(50);
    });

    test('Unit 95: importData with valid JSON succeeds', () => {
      const testData = { userId: 'test', totalXP: 100, level: 2 };
      expect(() => {
        skillTree.importData(JSON.stringify(testData));
      }).not.toThrow();
    });

    test('Unit 96: importData throws error for invalid JSON', () => {
      expect(() => {
        skillTree.importData('invalid json');
      }).toThrow('Invalid import data');
    });

    test('Unit 97: importData error has correct code', () => {
      try {
        skillTree.importData('invalid');
      } catch (error) {
        expect(error).toBeInstanceOf(MommySkillTreeError);
        expect((error as MommySkillTreeError).code).toBe('INVALID_IMPORT');
      }
    });

    test('Unit 98: importData updates progress correctly', () => {
      const testData = { totalXP: 200, level: 3 };
      skillTree.importData(JSON.stringify(testData));
      const progress = skillTree.getProgress();
      expect(progress.totalXP).toBe(200);
      expect(progress.level).toBe(3);
    });

    test('Unit 99: exportData then importData preserves data', () => {
      skillTree.addXP('body', 75);
      const exported = skillTree.exportData();
      const newTree = createMommySkillTree('NEW_USER');
      newTree.importData(exported);
      const newProgress = newTree.getProgress();
      expect(newProgress.tree.body.xp).toBe(75);
    });

    test('Unit 100: importData with empty object doesn\'t crash', () => {
      expect(() => {
        skillTree.importData('{}');
      }).not.toThrow();
    });
  });

  // ========== ACTIVITY XP MAPPING STATIC METHOD TESTS (5 tests) ==========
  describe('Static Method Unit Tests', () => {
    test('Unit 101: getActivityXPMapping returns object', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(typeof mapping).toBe('object');
    });

    test('Unit 102: getActivityXPMapping contains nutrition', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping).toHaveProperty('nutrition');
    });

    test('Unit 103: getActivityXPMapping nutrition has correct structure', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping.nutrition).toHaveProperty('category');
      expect(mapping.nutrition).toHaveProperty('xp');
    });

    test('Unit 104: getActivityXPMapping nutrition category is body', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping.nutrition.category).toBe('body');
    });

    test('Unit 105: getActivityXPMapping meditation category is mind', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping.meditation.category).toBe('mind');
    });
  });

  // ========== HELPER METHOD UNIT TESTS (15 tests) ==========
  describe('Helper Method Unit Tests', () => {
    test('Unit 106: getSkillByCategory returns array', () => {
      const skills = skillTree.getSkillByCategory('body');
      expect(Array.isArray(skills)).toBe(true);
    });

    test('Unit 107: getSkillByCategory body returns body skills', () => {
      const skills = skillTree.getSkillByCategory('body');
      skills.forEach(skill => {
        expect(skill.category.id).toBe('body');
      });
    });

    test('Unit 108: getSkillByCategory mind returns mind skills', () => {
      const skills = skillTree.getSkillByCategory('mind');
      skills.forEach(skill => {
        expect(skill.category.id).toBe('mind');
      });
    });

    test('Unit 109: getUnlockedSkills returns array', () => {
      const skills = skillTree.getUnlockedSkills();
      expect(Array.isArray(skills)).toBe(true);
    });

    test('Unit 110: getUnlockedSkills returns only unlocked skills', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      const skills = skillTree.getUnlockedSkills();
      skills.forEach(skill => {
        expect(skill.unlocked).toBe(true);
      });
    });

    test('Unit 111: getAvailableSkills returns array', () => {
      const skills = skillTree.getAvailableSkills();
      expect(Array.isArray(skills)).toBe(true);
    });

    test('Unit 112: getAvailableSkills returns unlockable skills', () => {
      skillTree.addXP('body', 60);
      const skills = skillTree.getAvailableSkills('body');
      skills.forEach(skill => {
        expect(skill.unlocked).toBe(false);
        expect(skillTree.getProgress().tree.body.xp).toBeGreaterThanOrEqual(skill.requiredXP);
      });
    });

    test('Unit 113: setLastActiveDate updates date', () => {
      const testDate = new Date('2024-01-01');
      skillTree.setLastActiveDate(testDate);
      const progress = skillTree.getProgress();
      expect(progress.lastActiveDate).toEqual(testDate);
    });

    test('Unit 114: addXPFromActivity returns result object', () => {
      const result = skillTree.addXPFromActivity('nutrition');
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('leveledUp');
      expect(result).toHaveProperty('unlockedSkills');
    });

    test('Unit 115: addXPFromActivity with custom amount', () => {
      skillTree.addXPFromActivity('nutrition', 50);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(50);
    });

    test('Unit 116: addXPFromActivity uses default amount', () => {
      skillTree.addXPFromActivity('nutrition');
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBe(15); // Default nutrition XP
    });

    test('Unit 117: addXPFromActivity exercise maps to body', () => {
      skillTree.addXPFromActivity('exercise');
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeGreaterThan(0);
    });

    test('Unit 118: addXPFromActivity meditation maps to mind', () => {
      skillTree.addXPFromActivity('meditation');
      const progress = skillTree.getProgress();
      expect(progress.tree.mind.xp).toBeGreaterThan(0);
    });

    test('Unit 119: addXPFromActivity journaling maps to emotion', () => {
      skillTree.addXPFromActivity('journaling');
      const progress = skillTree.getProgress();
      expect(progress.tree.emotion.xp).toBeGreaterThan(0);
    });

    test('Unit 120: addXPFromActivity milestone maps to growth', () => {
      skillTree.addXPFromActivity('milestone');
      const progress = skillTree.getProgress();
      expect(progress.tree.growth.xp).toBeGreaterThan(0);
    });
  });
});