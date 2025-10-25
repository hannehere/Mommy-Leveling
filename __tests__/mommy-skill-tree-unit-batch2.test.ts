// __tests__/mommy-skill-tree-unit-batch2.test.ts
// 🏆 PURE UNIT TESTS - Batch 2 (50 Tests) for Competition

import MommySkillTree, { MommySkillTreeError, createMommySkillTree } from '../lib/mommy-skill-tree';

describe('🏆 Pure Unit Tests - Batch 2 (50 Tests)', () => {
  let skillTree: MommySkillTree;

  beforeEach(() => {
    skillTree = createMommySkillTree('UNIT_TEST_USER_B2');
  });

  // ========== DECAY XP UNIT TESTS (15 tests) ==========
  describe('decayXP Method Unit Tests', () => {
    test('Unit 51: decayXP returns object with correct properties', () => {
      const result = skillTree.decayXP(1);
      expect(result).toHaveProperty('decayed');
      expect(result).toHaveProperty('decayAmount');
    });

    test('Unit 52: decayXP returns false for days within threshold', () => {
      expect(skillTree.decayXP(1).decayed).toBe(false);
    });

    test('Unit 53: decayXP returns zero decay amount within threshold', () => {
      expect(skillTree.decayXP(2).decayAmount).toBe(0);
    });

    test('Unit 54: decayXP returns true for days beyond threshold', () => {
      skillTree.addXP('body', 100);
      expect(skillTree.decayXP(5).decayed).toBe(true);
    });

    test('Unit 55: decayXP returns positive decay amount beyond threshold', () => {
      skillTree.addXP('body', 100);
      expect(skillTree.decayXP(5).decayAmount).toBeGreaterThan(0);
    });

    test('Unit 56: decayXP reduces body XP when active', () => {
      skillTree.addXP('body', 100);
      const xpBefore = skillTree.getProgress().tree.body.xp;
      skillTree.decayXP(5);
      expect(skillTree.getProgress().tree.body.xp).toBeLessThan(xpBefore);
    });

    test('Unit 57: decayXP doesn\'t reduce XP below zero', () => {
      skillTree.addXP('body', 10);
      skillTree.decayXP(100);
      expect(skillTree.getProgress().tree.body.xp).toBeGreaterThanOrEqual(0);
    });

    test('Unit 58: decayXP resets streak after 7 days', () => {
      skillTree.addXP('body', 10);
      skillTree.decayXP(8);
      expect(skillTree.getProgress().streak).toBe(0);
    });

    test('Unit 59: decayXP preserves streak under 7 days', () => {
      skillTree.addXP('body', 10);
      const streakBefore = skillTree.getProgress().streak;
      skillTree.decayXP(5);
      expect(skillTree.getProgress().streak).toBe(streakBefore);
    });

    test('Unit 60: decayXP with zero days has no effect', () => {
      skillTree.addXP('body', 100);
      const xpBefore = skillTree.getProgress().tree.body.xp;
      skillTree.decayXP(0);
      expect(skillTree.getProgress().tree.body.xp).toBe(xpBefore);
    });

    test('Unit 61: decayXP handles negative days parameter', () => {
      skillTree.addXP('body', 100);
      expect(skillTree.decayXP(-1).decayed).toBe(false);
    });

    test('Unit 62: decayXP affects all categories equally', () => {
      skillTree.addXP('body', 100);
      skillTree.addXP('mind', 100);
      skillTree.decayXP(5);
      const progress = skillTree.getProgress();
      expect(progress.tree.body.xp).toBeLessThan(100);
      expect(progress.tree.mind.xp).toBeLessThan(100);
    });

    test('Unit 63: decayXP recalculates totalXP correctly', () => {
      skillTree.addXP('body', 50);
      skillTree.addXP('mind', 50);
      skillTree.decayXP(5);
      const progress = skillTree.getProgress();
      const calculatedTotal = progress.tree.body.xp + progress.tree.mind.xp + 
                             progress.tree.emotion.xp + progress.tree.growth.xp;
      expect(progress.totalXP).toBe(calculatedTotal);
    });

    test('Unit 64: decayXP return types are correct', () => {
      const result = skillTree.decayXP(1);
      expect(typeof result.decayed).toBe('boolean');
      expect(typeof result.decayAmount).toBe('number');
    });

    test('Unit 65: decayXP handles edge case of exactly threshold days', () => {
      skillTree.addXP('body', 100);
      expect(skillTree.decayXP(2).decayed).toBe(false);
    });
  });

  // ========== CALCULATE PROGRESS UNIT TESTS (10 tests) ==========
  describe('calculateProgress Method Unit Tests', () => {
    test('Unit 66: calculateProgress returns object with required properties', () => {
      const progress = skillTree.calculateProgress();
      expect(progress).toHaveProperty('overall');
      expect(progress).toHaveProperty('byCategory');
      expect(progress).toHaveProperty('nextLevelProgress');
    });

    test('Unit 67: calculateProgress overall is number type', () => {
      expect(typeof skillTree.calculateProgress().overall).toBe('number');
    });

    test('Unit 68: calculateProgress byCategory is object type', () => {
      expect(typeof skillTree.calculateProgress().byCategory).toBe('object');
    });

    test('Unit 69: calculateProgress nextLevelProgress is number type', () => {
      expect(typeof skillTree.calculateProgress().nextLevelProgress).toBe('number');
    });

    test('Unit 70: calculateProgress overall starts at 0', () => {
      expect(skillTree.calculateProgress().overall).toBe(0);
    });

    test('Unit 71: calculateProgress nextLevelProgress starts at 0', () => {
      expect(skillTree.calculateProgress().nextLevelProgress).toBe(0);
    });

    test('Unit 72: calculateProgress byCategory has 4 categories', () => {
      expect(Object.keys(skillTree.calculateProgress().byCategory)).toHaveLength(4);
    });

    test('Unit 73: calculateProgress byCategory contains all categories', () => {
      const progress = skillTree.calculateProgress();
      expect(progress.byCategory).toHaveProperty('body');
      expect(progress.byCategory).toHaveProperty('mind');
      expect(progress.byCategory).toHaveProperty('emotion');
      expect(progress.byCategory).toHaveProperty('growth');
    });

    test('Unit 74: calculateProgress increases with XP', () => {
      const progressBefore = skillTree.calculateProgress().overall;
      skillTree.addXP('body', 50);
      const progressAfter = skillTree.calculateProgress().overall;
      expect(progressAfter).toBeGreaterThan(progressBefore);
    });

    test('Unit 75: calculateProgress nextLevelProgress is correct fraction', () => {
      skillTree.addXP('body', 25);
      expect(skillTree.calculateProgress().nextLevelProgress).toBe(0.25);
    });
  });

  // ========== CLEAR PROGRESS UNIT TESTS (8 tests) ==========
  describe('clearProgress Method Unit Tests', () => {
    test('Unit 76: clearProgress resets totalXP to 0', () => {
      skillTree.addXP('body', 100);
      skillTree.clearProgress();
      expect(skillTree.getProgress().totalXP).toBe(0);
    });

    test('Unit 77: clearProgress resets level to 1', () => {
      skillTree.addXP('body', 200);
      skillTree.clearProgress();
      expect(skillTree.getProgress().level).toBe(1);
    });

    test('Unit 78: clearProgress resets body XP', () => {
      skillTree.addXP('body', 50);
      skillTree.clearProgress();
      expect(skillTree.getProgress().tree.body.xp).toBe(0);
    });

    test('Unit 79: clearProgress resets mind XP', () => {
      skillTree.addXP('mind', 40);
      skillTree.clearProgress();
      expect(skillTree.getProgress().tree.mind.xp).toBe(0);
    });

    test('Unit 80: clearProgress resets emotion XP', () => {
      skillTree.addXP('emotion', 30);
      skillTree.clearProgress();
      expect(skillTree.getProgress().tree.emotion.xp).toBe(0);
    });

    test('Unit 81: clearProgress resets growth XP', () => {
      skillTree.addXP('growth', 20);
      skillTree.clearProgress();
      expect(skillTree.getProgress().tree.growth.xp).toBe(0);
    });

    test('Unit 82: clearProgress resets achievements', () => {
      skillTree.addXP('body', 60);
      skillTree.unlockSkill('body', 'healthy-eating');
      skillTree.clearProgress();
      expect(skillTree.getProgress().achievements).toEqual([]);
    });

    test('Unit 83: clearProgress maintains userId', () => {
      const userIdBefore = skillTree.getProgress().userId;
      skillTree.addXP('body', 100);
      skillTree.clearProgress();
      expect(skillTree.getProgress().userId).toBe(userIdBefore);
    });
  });

  // ========== IMPORT/EXPORT DATA UNIT TESTS (12 tests) ==========
  describe('Import/Export Data Unit Tests', () => {
    test('Unit 84: exportData returns string type', () => {
      expect(typeof skillTree.exportData()).toBe('string');
    });

    test('Unit 85: exportData returns valid JSON string', () => {
      const exported = skillTree.exportData();
      expect(() => JSON.parse(exported)).not.toThrow();
    });

    test('Unit 86: exportData contains userId', () => {
      const exported = JSON.parse(skillTree.exportData());
      expect(exported).toHaveProperty('userId');
    });

    test('Unit 87: exportData contains totalXP', () => {
      skillTree.addXP('body', 50);
      const exported = JSON.parse(skillTree.exportData());
      expect(exported.totalXP).toBe(50);
    });

    test('Unit 88: exportData contains level', () => {
      const exported = JSON.parse(skillTree.exportData());
      expect(exported).toHaveProperty('level');
    });

    test('Unit 89: exportData contains tree structure', () => {
      const exported = JSON.parse(skillTree.exportData());
      expect(exported).toHaveProperty('tree');
    });

    test('Unit 90: importData with valid JSON succeeds', () => {
      const testData = { userId: 'test', totalXP: 100, level: 2 };
      expect(() => {
        skillTree.importData(JSON.stringify(testData));
      }).not.toThrow();
    });

    test('Unit 91: importData throws error for invalid JSON', () => {
      expect(() => {
        skillTree.importData('invalid json');
      }).toThrow('Invalid import data');
    });

    test('Unit 92: importData error is MommySkillTreeError', () => {
      try {
        skillTree.importData('invalid');
      } catch (error) {
        expect(error).toBeInstanceOf(MommySkillTreeError);
      }
    });

    test('Unit 93: importData error has correct code', () => {
      try {
        skillTree.importData('invalid');
      } catch (error) {
        expect((error as MommySkillTreeError).code).toBe('INVALID_IMPORT');
      }
    });

    test('Unit 94: importData updates totalXP correctly', () => {
      const testData = { totalXP: 200 };
      skillTree.importData(JSON.stringify(testData));
      expect(skillTree.getProgress().totalXP).toBe(200);
    });

    test('Unit 95: importData with empty object doesn\'t crash', () => {
      expect(() => {
        skillTree.importData('{}');
      }).not.toThrow();
    });
  });

  // ========== STATIC METHODS UNIT TESTS (5 tests) ==========
  describe('Static Methods Unit Tests', () => {
    test('Unit 96: getActivityXPMapping returns object', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(typeof mapping).toBe('object');
    });

    test('Unit 97: getActivityXPMapping contains nutrition', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping).toHaveProperty('nutrition');
    });

    test('Unit 98: getActivityXPMapping nutrition has category and xp', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping.nutrition).toHaveProperty('category');
      expect(mapping.nutrition).toHaveProperty('xp');
    });

    test('Unit 99: getActivityXPMapping nutrition category is body', () => {
      const mapping = MommySkillTree.getActivityXPMapping();
      expect(mapping.nutrition.category).toBe('body');
    });

    test('Unit 100: getActivityXPMapping returns consistent values', () => {
      const mapping1 = MommySkillTree.getActivityXPMapping();
      const mapping2 = MommySkillTree.getActivityXPMapping();
      expect(mapping1.nutrition.xp).toBe(mapping2.nutrition.xp);
    });
  });
});