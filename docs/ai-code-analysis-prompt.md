# 🤖 AI-Powered Code Analysis Prompt for Mommy Skill Tree

## 📋 **Prompt Template for Code Analysis**

```
Analyze this Mommy Skill Tree class and identify all functions that need unit testing:

[PASTE MOMMY SKILL TREE CODE HERE]

For each function, identify:
1. Main functionality
2. Input parameters and types  
3. Expected return values
4. Potential edge cases
5. Dependencies that need mocking
6. Business logic validation points
7. Error scenarios and exception handling
```

---

## 🎯 **Expected AI Output Sample:**

```
Functions to test in MommySkillTree:

1. constructor(userId, savedProgress?)
   - Main: Initialize skill tree for user with default or saved progress
   - Inputs: userId (string), savedProgress (Partial<UserProgress>, optional)
   - Returns: MommySkillTree instance
   - Edge cases: empty userId, invalid savedProgress, null inputs
   - Dependencies: initializeProgress, getDefaultSkills methods
   - Business logic: 4 categories (body, mind, emotion, growth) initialization
   - Errors: Invalid user data format

2. addXP(category, amount)
   - Main: Add experience points to specific skill category
   - Inputs: category ('body'|'mind'|'emotion'|'growth'), amount (number)
   - Returns: {success: boolean, leveledUp: boolean, unlockedSkills: SkillNode[], newLevel?: number}
   - Edge cases: negative XP, zero XP, invalid category, decimal amounts, extremely large values
   - Dependencies: checkLevelUp, checkSkillUnlocks, updateStreak methods
   - Business logic: XP accumulation, level progression, skill unlocking
   - Errors: MommySkillTreeError for invalid inputs

3. unlockSkill(category, skillId)
   - Main: Manually unlock a skill if requirements are met
   - Inputs: category (string), skillId (string)
   - Returns: boolean (success/failure)
   - Edge cases: insufficient XP, non-existent skill, already unlocked skill, invalid category
   - Dependencies: checkPrerequisites method
   - Business logic: XP threshold validation, prerequisite checking
   - Errors: SKILL_NOT_FOUND error

4. decayXP(daysInactive?)
   - Main: Reduce XP based on inactivity period
   - Inputs: daysInactive (number, optional)
   - Returns: {decayed: boolean, decayAmount: number}
   - Edge cases: negative days, zero days, very large inactivity periods, no XP to decay
   - Dependencies: Date calculations, decay rate constants
   - Business logic: Threshold-based decay (>2 days), streak reset (>7 days)
   - Errors: None (graceful handling)

5. calculateProgress()
   - Main: Calculate overall and category-specific progress percentages
   - Inputs: none
   - Returns: {overall: number, byCategory: Record<string, number>, nextLevelProgress: number}
   - Edge cases: zero XP, completed skills, division by zero scenarios
   - Dependencies: skill requirements data
   - Business logic: Progress calculation algorithms, level progress tracking
   - Errors: None (returns 0 for edge cases)

6. clearProgress()
   - Main: Reset all progress to initial state
   - Inputs: none
   - Returns: void
   - Edge cases: already cleared progress
   - Dependencies: initializeProgress method
   - Business logic: Complete state reset while preserving userId
   - Errors: None

7. exportData()
   - Main: Serialize current progress to JSON string
   - Inputs: none
   - Returns: string (JSON)
   - Edge cases: circular references, very large data
   - Dependencies: JSON.stringify
   - Business logic: Complete progress serialization
   - Errors: Serialization errors (rare)

8. importData(data)
   - Main: Deserialize and restore progress from JSON string
   - Inputs: data (string)
   - Returns: void
   - Edge cases: invalid JSON, corrupted data, version mismatches, empty string
   - Dependencies: JSON.parse, initializeProgress
   - Business logic: Data validation and restoration
   - Errors: INVALID_IMPORT error for bad data

9. getSkillByCategory(category)
   - Main: Retrieve all skills for a specific category
   - Inputs: category ('body'|'mind'|'emotion'|'growth')
   - Returns: SkillNode[]
   - Edge cases: invalid category, empty category
   - Dependencies: progress tree structure
   - Business logic: Category-based skill filtering
   - Errors: None (returns empty array)

10. getUnlockedSkills()
    - Main: Get all currently unlocked skills across categories
    - Inputs: none
    - Returns: SkillNode[]
    - Edge cases: no unlocked skills, all skills unlocked
    - Dependencies: skill unlock status
    - Business logic: Cross-category skill aggregation
    - Errors: None

11. addXPFromActivity(activity, amount?)
    - Main: Add XP from predefined activity mappings
    - Inputs: activity (keyof ActivityXPMapping), amount (number, optional)
    - Returns: {success: boolean, leveledUp: boolean, unlockedSkills: SkillNode[], newLevel?: number}
    - Edge cases: unknown activity, override amounts, zero/negative custom amounts
    - Dependencies: getActivityXPMapping, addXP method
    - Business logic: Activity-to-category mapping, default vs custom XP amounts
    - Errors: Propagated from addXP method

12. Static: getActivityXPMapping()
    - Main: Return mapping of activities to categories and XP values
    - Inputs: none
    - Returns: ActivityXPMapping
    - Edge cases: None (static data)
    - Dependencies: None
    - Business logic: Predefined activity mappings
    - Errors: None

Key Testing Priorities:
- XP validation and business rules (addXP)
- Skill unlocking logic with prerequisites
- Data persistence integrity (export/import)
- Edge case handling for all inputs
- Error scenarios and custom exceptions
- Performance with large datasets
- State management consistency
```

---

## 🚀 **Advanced Prompt Variations:**

### **For Competition Edge:**
```
Analyze this Mommy Skill Tree class and generate 100+ unit test cases covering:

[PASTE CODE HERE]

Focus on:
1. Boundary value analysis for each method
2. Equivalence partitioning for input validation  
3. State transition testing for XP/Level progression
4. Exception path coverage
5. Mock scenarios for dependencies
6. Performance edge cases
7. Data integrity validation

Generate specific test method names and expected assertions.
```

### **For Comprehensive Coverage:**
```
Perform static code analysis on this Skill Tree implementation:

[PASTE CODE HERE]

Identify:
1. Cyclomatic complexity of each method
2. All possible execution paths
3. Input validation gaps
4. Error handling completeness
5. Side effects and state mutations
6. Integration points requiring mocking
7. Performance bottlenecks
8. Security considerations

Recommend specific unit test scenarios for each identified issue.
```

---

## 🎯 **Usage Instructions:**

1. **Copy** the MommySkillTree class code from `lib/mommy-skill-tree.ts`
2. **Paste** it into the prompt template
3. **Submit** to AI (ChatGPT, Claude, etc.)
4. **Generate** comprehensive test specifications
5. **Implement** the suggested unit tests
6. **Validate** against our existing 100 unit tests

---

## 💡 **Pro Tips for Competition:**

- **Customize prompts** for different AI models (GPT-4, Claude, Gemini)
- **Iterate prompts** to get more specific test cases
- **Combine outputs** from multiple AI analyses
- **Validate suggestions** against real edge cases
- **Use for documentation** and code review prep

This approach shows **AI-assisted testing strategy** - very impressive for competition judges! 🏆