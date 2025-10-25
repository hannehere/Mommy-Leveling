// lib/mommy-skill-tree.ts - Core Mommy Skill Tree Engine
// 🌸 Complete skill tree system with XP management, level progression, and skill unlocking

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  requiredXP: number;
  unlocked: boolean;
  unlockedAt?: Date;
  category: SkillCategory;
  prerequisites?: string[];
  rewards?: {
    xpBonus?: number;
    specialAbility?: string;
    badge?: string;
  };
}

export interface SkillCategory {
  id: 'body' | 'mind' | 'emotion' | 'growth';
  name: string;
  description: string;
  color: string;
  icon: string;
  xp: number;
  unlocked: boolean;
  skills: Record<string, SkillNode>;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  lastActiveDate: Date;
  streak: number;
  achievements: string[];
  tree: Record<string, SkillCategory>;
}

export interface ActivityXPMapping {
  nutrition: { category: 'body'; xp: number };
  exercise: { category: 'body'; xp: number };
  meditation: { category: 'mind'; xp: number };
  learning: { category: 'mind'; xp: number };
  journaling: { category: 'emotion'; xp: number };
  bonding: { category: 'emotion'; xp: number };
  milestone: { category: 'growth'; xp: number };
  teaching: { category: 'growth'; xp: number };
}

export class MommySkillTreeError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'MommySkillTreeError';
  }
}

export class MommySkillTree {
  private userId: string;
  private progress: UserProgress;
  private readonly DECAY_RATE = 0.05;
  private readonly INACTIVE_THRESHOLD_DAYS = 2;
  private readonly BASE_XP_PER_LEVEL = 100;

  constructor(userId: string, savedProgress?: Partial<UserProgress>) {
    this.userId = userId;
    this.progress = this.initializeProgress(savedProgress);
  }

  private initializeProgress(savedProgress?: Partial<UserProgress>): UserProgress {
    const defaultCategories: Record<string, SkillCategory> = {
      body: {
        id: 'body',
        name: 'Sức khỏe thể chất',
        description: 'Chăm sóc cơ thể và sức khỏe',
        color: 'bg-peach-500',
        icon: '💪',
        xp: 0,
        unlocked: true,
        skills: this.getDefaultSkills('body')
      },
      mind: {
        id: 'mind',
        name: 'Tinh thần trí tuệ',
        description: 'Phát triển tư duy và học hỏi',
        color: 'bg-lavender-500',
        icon: '🧠',
        xp: 0,
        unlocked: true,
        skills: this.getDefaultSkills('mind')
      },
      emotion: {
        id: 'emotion',
        name: 'Cảm xúc tâm hồn',
        description: 'Quản lý cảm xúc và kết nối',
        color: 'bg-mint-500',
        icon: '💝',
        xp: 0,
        unlocked: true,
        skills: this.getDefaultSkills('emotion')
      },
      growth: {
        id: 'growth',
        name: 'Phát triển bản thân',
        description: 'Học hỏi và tiến bộ mỗi ngày',
        color: 'bg-baby-blue-500',
        icon: '🌱',
        xp: 0,
        unlocked: true,
        skills: this.getDefaultSkills('growth')
      }
    };

    return {
      userId: this.userId,
      totalXP: 0,
      level: 1,
      currentLevelXP: 0,
      nextLevelXP: this.BASE_XP_PER_LEVEL,
      lastActiveDate: new Date(),
      streak: 0,
      achievements: [],
      tree: defaultCategories,
      ...savedProgress
    };
  }

  private getDefaultSkills(categoryId: 'body' | 'mind' | 'emotion' | 'growth'): Record<string, SkillNode> {
    const skillSets = {
      body: {
        'healthy-eating': {
          id: 'healthy-eating',
          name: 'Dinh dưỡng cân bằng',
          description: 'Duy trì chế độ ăn uống lành mạnh',
          requiredXP: 50,
          unlocked: false,
          category: { id: 'body' } as SkillCategory,
          rewards: { xpBonus: 10, badge: '🥗' }
        },
        'regular-exercise': {
          id: 'regular-exercise',
          name: 'Vận động đều đặn',
          description: 'Duy trì thói quen tập luyện',
          requiredXP: 100,
          unlocked: false,
          category: { id: 'body' } as SkillCategory,
          rewards: { xpBonus: 15, badge: '🏃‍♀️' }
        },
        'rest-recovery': {
          id: 'rest-recovery',
          name: 'Nghỉ ngơi phục hồi',
          description: 'Quản lý giấc ngủ và thư giãn',
          requiredXP: 150,
          unlocked: false,
          category: { id: 'body' } as SkillCategory,
          prerequisites: ['healthy-eating'],
          rewards: { xpBonus: 20, badge: '😴' }
        }
      },
      mind: {
        'mindfulness': {
          id: 'mindfulness',
          name: 'Chánh niệm tỉnh thức',
          description: 'Thực hành thiền và chánh niệm',
          requiredXP: 75,
          unlocked: false,
          category: { id: 'mind' } as SkillCategory,
          rewards: { xpBonus: 12, badge: '🧘‍♀️' }
        },
        'continuous-learning': {
          id: 'continuous-learning',
          name: 'Học hỏi không ngừng',
          description: 'Đọc sách và học kỹ năng mới',
          requiredXP: 120,
          unlocked: false,
          category: { id: 'mind' } as SkillCategory,
          rewards: { xpBonus: 18, badge: '📚' }
        },
        'creative-thinking': {
          id: 'creative-thinking',
          name: 'Tư duy sáng tạo',
          description: 'Phát triển khả năng sáng tạo',
          requiredXP: 180,
          unlocked: false,
          category: { id: 'mind' } as SkillCategory,
          prerequisites: ['mindfulness', 'continuous-learning'],
          rewards: { xpBonus: 25, badge: '🎨' }
        }
      },
      emotion: {
        'emotional-regulation': {
          id: 'emotional-regulation',
          name: 'Quản lý cảm xúc',
          description: 'Điều tiết cảm xúc hiệu quả',
          requiredXP: 60,
          unlocked: false,
          category: { id: 'emotion' } as SkillCategory,
          rewards: { xpBonus: 10, badge: '😌' }
        },
        'empathy-connection': {
          id: 'empathy-connection',
          name: 'Đồng cảm kết nối',
          description: 'Xây dựng mối quan hệ ý nghĩa',
          requiredXP: 110,
          unlocked: false,
          category: { id: 'emotion' } as SkillCategory,
          rewards: { xpBonus: 16, badge: '🤗' }
        },
        'gratitude-joy': {
          id: 'gratitude-joy',
          name: 'Biết ơn hạnh phúc',
          description: 'Nuôi dưỡng lòng biết ơn và niềm vui',
          requiredXP: 160,
          unlocked: false,
          category: { id: 'emotion' } as SkillCategory,
          prerequisites: ['emotional-regulation'],
          rewards: { xpBonus: 22, badge: '🙏' }
        }
      },
      growth: {
        'goal-setting': {
          id: 'goal-setting',
          name: 'Đặt mục tiêu',
          description: 'Lập kế hoạch và theo đuổi mục tiêu',
          requiredXP: 80,
          unlocked: false,
          category: { id: 'growth' } as SkillCategory,
          rewards: { xpBonus: 14, badge: '🎯' }
        },
        'resilience': {
          id: 'resilience',
          name: 'Kiên cường bền bỉ',
          description: 'Vượt qua thử thách và khó khăn',
          requiredXP: 130,
          unlocked: false,
          category: { id: 'growth' } as SkillCategory,
          rewards: { xpBonus: 20, badge: '💪' }
        },
        'wisdom-sharing': {
          id: 'wisdom-sharing',
          name: 'Chia sẻ trí tuệ',
          description: 'Truyền đạt kinh nghiệm cho người khác',
          requiredXP: 200,
          unlocked: false,
          category: { id: 'growth' } as SkillCategory,
          prerequisites: ['goal-setting', 'resilience'],
          rewards: { xpBonus: 30, badge: '👩‍🏫' }
        }
      }
    };

    return skillSets[categoryId];
  }

  // Core XP Management
  addXP(category: 'body' | 'mind' | 'emotion' | 'growth', amount: number): {
    success: boolean;
    leveledUp: boolean;
    unlockedSkills: SkillNode[];
    newLevel?: number;
  } {
    if (amount <= 0) {
      throw new MommySkillTreeError('XP must be greater than 0', 'INVALID_XP');
    }

    if (!this.progress.tree[category]) {
      throw new MommySkillTreeError('Invalid category', 'INVALID_CATEGORY');
    }

    // Add XP to category and total
    this.progress.tree[category].xp += amount;
    this.progress.totalXP += amount;
    this.progress.currentLevelXP += amount;
    this.progress.lastActiveDate = new Date();

    // Check for skill unlocks
    const unlockedSkills = this.checkSkillUnlocks(category);

    // Check for level up
    const levelUpResult = this.checkLevelUp();

    // Update streak
    this.updateStreak();

    return {
      success: true,
      leveledUp: levelUpResult.leveledUp,
      unlockedSkills,
      newLevel: levelUpResult.newLevel
    };
  }

  private checkLevelUp(): { leveledUp: boolean; newLevel?: number } {
    let leveledUp = false;
    let levelsGained = 0;

    while (this.progress.currentLevelXP >= this.progress.nextLevelXP) {
      this.progress.currentLevelXP -= this.progress.nextLevelXP;
      this.progress.level++;
      levelsGained++;
      leveledUp = true;
      
      // Calculate next level XP requirement
      this.progress.nextLevelXP = this.calculateXPRequirement(this.progress.level + 1);
      
      // Trigger level up animation and rewards
      this.triggerLevelUpAnimation();
    }

    return {
      leveledUp,
      newLevel: leveledUp ? this.progress.level : undefined
    };
  }

  private calculateXPRequirement(level: number): number {
    // Simple linear progression for predictable testing
    return this.BASE_XP_PER_LEVEL + ((level - 2) * 20);
  }

  private checkSkillUnlocks(category: 'body' | 'mind' | 'emotion' | 'growth'): SkillNode[] {
    const unlockedSkills: SkillNode[] = [];
    const categoryData = this.progress.tree[category];

    Object.values(categoryData.skills).forEach(skill => {
      if (!skill.unlocked && categoryData.xp >= skill.requiredXP) {
        // Check prerequisites
        const prerequisitesMet = this.checkPrerequisites(skill);
        
        if (prerequisitesMet) {
          skill.unlocked = true;
          skill.unlockedAt = new Date();
          unlockedSkills.push(skill);
          
          // Add achievement
          this.progress.achievements.push(`skill-${skill.id}-unlocked`);
        }
      }
    });

    return unlockedSkills;
  }

  private checkPrerequisites(skill: SkillNode): boolean {
    if (!skill.prerequisites) return true;

    return skill.prerequisites.every(prereqId => {
      // Find the prerequisite skill across all categories
      for (const category of Object.values(this.progress.tree)) {
        const prereqSkill = category.skills[prereqId];
        if (prereqSkill && prereqSkill.unlocked) {
          return true;
        }
      }
      return false;
    });
  }

  private updateStreak(): void {
    const today = new Date();
    const lastActive = new Date(this.progress.lastActiveDate);
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Same day, maintain current streak (or start at 1 if it's 0)
      if (this.progress.streak === 0) {
        this.progress.streak = 1;
      }
    } else if (daysDiff === 1) {
      // Next day, increment streak
      this.progress.streak++;
    } else if (daysDiff > 1) {
      // Gap in activity, reset streak to 1 (counting today)
      this.progress.streak = 1;
    }
    
    // Update last active date after streak calculation 
    this.progress.lastActiveDate = today;
  }

  // Skill Management
  unlockSkill(category: 'body' | 'mind' | 'emotion' | 'growth', skillId: string): boolean {
    const categoryData = this.progress.tree[category];
    const skill = categoryData?.skills[skillId];

    if (!skill) {
      throw new MommySkillTreeError('Skill not found', 'SKILL_NOT_FOUND');
    }

    if (skill.unlocked) {
      return true; // Already unlocked
    }

    const hasEnoughXP = categoryData.xp >= skill.requiredXP;
    const prerequisitesMet = this.checkPrerequisites(skill);

    if (hasEnoughXP && prerequisitesMet) {
      skill.unlocked = true;
      skill.unlockedAt = new Date();
      this.progress.achievements.push(`skill-${skill.id}-unlocked`);
      return true;
    }

    return false;
  }

  // XP Decay System
  decayXP(daysInactive?: number): { decayed: boolean; decayAmount: number } {
    const today = new Date();
    const lastActive = new Date(this.progress.lastActiveDate);
    const daysDiff = daysInactive ?? Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff <= this.INACTIVE_THRESHOLD_DAYS) {
      return { decayed: false, decayAmount: 0 };
    }

    let totalDecayAmount = 0;
    const decayMultiplier = Math.min(0.3, this.DECAY_RATE * (daysDiff - this.INACTIVE_THRESHOLD_DAYS));

    Object.keys(this.progress.tree).forEach(categoryKey => {
      const category = this.progress.tree[categoryKey];
      const decayAmount = Math.floor(category.xp * decayMultiplier);
      category.xp = Math.max(0, category.xp - decayAmount);
      totalDecayAmount += decayAmount;
    });

    // Recalculate total XP from all categories to ensure consistency
    this.progress.totalXP = Object.values(this.progress.tree).reduce((sum, cat) => sum + cat.xp, 0);

    // Reset streak if inactive too long
    if (daysDiff > 7) {
      this.progress.streak = 0;
    }

    return { decayed: true, decayAmount: totalDecayAmount };
  }

  // Progress Calculation
  calculateProgress(): {
    overall: number;
    byCategory: Record<string, number>;
    nextLevelProgress: number;
  } {
    const totalPossibleXP = Object.values(this.progress.tree).reduce((sum, category) => {
      const maxXPInCategory = Math.max(...Object.values(category.skills).map(skill => skill.requiredXP));
      return sum + maxXPInCategory;
    }, 0);

    const currentTotalXP = Object.values(this.progress.tree).reduce((sum, category) => sum + category.xp, 0);

    const byCategory: Record<string, number> = {};
    Object.entries(this.progress.tree).forEach(([key, category]) => {
      const maxXPInCategory = Math.max(...Object.values(category.skills).map(skill => skill.requiredXP));
      byCategory[key] = maxXPInCategory > 0 ? category.xp / maxXPInCategory : 0;
    });

    const nextLevelProgress = this.progress.currentLevelXP / this.progress.nextLevelXP;

    return {
      overall: totalPossibleXP > 0 ? currentTotalXP / totalPossibleXP : 0,
      byCategory,
      nextLevelProgress
    };
  }

  // Animation and Feedback
  triggerLevelUpAnimation(): void {
    console.log(`✨ Chúc mừng mẹ! Đã lên cấp ${this.progress.level}! 🌸`);
    // This would trigger UI animations in the actual implementation
  }

  // Data Management
  clearProgress(): void {
    this.progress = this.initializeProgress();
  }

  getProgress(): UserProgress {
    return { ...this.progress };
  }

  exportData(): string {
    return JSON.stringify(this.progress, null, 2);
  }

  importData(data: string): void {
    try {
      const imported = JSON.parse(data) as UserProgress;
      this.progress = this.initializeProgress(imported);
    } catch (error) {
      throw new MommySkillTreeError('Invalid import data', 'INVALID_IMPORT');
    }
  }

  // Utility Methods
  getSkillByCategory(category: 'body' | 'mind' | 'emotion' | 'growth'): SkillNode[] {
    return Object.values(this.progress.tree[category]?.skills || {});
  }

  getUnlockedSkills(): SkillNode[] {
    const allSkills: SkillNode[] = [];
    Object.values(this.progress.tree).forEach(category => {
      Object.values(category.skills).forEach(skill => {
        if (skill.unlocked) {
          allSkills.push(skill);
        }
      });
    });
    return allSkills;
  }

  getAvailableSkills(categoryId?: 'body' | 'mind' | 'emotion' | 'growth'): SkillNode[] {
    const categories = categoryId ? [this.progress.tree[categoryId]] : Object.values(this.progress.tree);
    const availableSkills: SkillNode[] = [];

    categories.forEach(category => {
      Object.values(category.skills).forEach(skill => {
        if (!skill.unlocked && category.xp >= skill.requiredXP && this.checkPrerequisites(skill)) {
          availableSkills.push(skill);
        }
      });
    });

    return availableSkills;
  }

  // Integration helpers for other systems
  static getActivityXPMapping(): ActivityXPMapping {
    return {
      nutrition: { category: 'body', xp: 15 },
      exercise: { category: 'body', xp: 20 },
      meditation: { category: 'mind', xp: 18 },
      learning: { category: 'mind', xp: 12 },
      journaling: { category: 'emotion', xp: 14 },
      bonding: { category: 'emotion', xp: 16 },
      milestone: { category: 'growth', xp: 25 },
      teaching: { category: 'growth', xp: 20 }
    };
  }

  addXPFromActivity(activity: keyof ActivityXPMapping, amount?: number): {
    success: boolean;
    leveledUp: boolean;
    unlockedSkills: SkillNode[];
    newLevel?: number;
  } {
    const mapping = MommySkillTree.getActivityXPMapping()[activity];
    const xpAmount = amount || mapping.xp;
    return this.addXP(mapping.category, xpAmount);
  }

  // Testing helper - simulate date change
  setLastActiveDate(date: Date): void {
    this.progress.lastActiveDate = date;
  }
}

// Export default instance creator
export function createMommySkillTree(userId: string, savedProgress?: Partial<UserProgress>): MommySkillTree {
  return new MommySkillTree(userId, savedProgress);
}export default MommySkillTree;