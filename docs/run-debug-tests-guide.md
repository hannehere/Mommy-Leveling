# 🚀 Giai đoạn 4: Chạy & Debug Tests cho Mommy Skill Tree

## 📋 **Bước 1: Chạy Test Suite**

### **🎯 Basic Test Commands**
```bash
# Run all Mommy Skill Tree tests
npm test

# Run specific test file
npm test mommy-skill-tree

# Run with detailed output
npm test -- --verbose

# Run with coverage report
npm test -- --coverage

# Watch mode (auto re-run on changes)
npm test -- --watch

# Run only failing tests
npm test -- --onlyFailures
```

### **⚡ Advanced Testing Commands**
```bash
# Run unit tests in batch (our competition setup)
npx jest mommy-skill-tree-unit-batch --verbose

# Run comprehensive integration tests
npx jest mommy-skill-tree-comprehensive --verbose

# Performance testing with timing
npm test -- --verbose --detectOpenHandles

# Generate detailed coverage report
npm test -- --coverage --coverageReporters=html

# Debug mode with inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 🔧 **Bước 2: Phân tích lỗi trong Motherhood Context**

### **🚨 Các lỗi thường gặp trong Mommy Skill Tree**

#### **1. Module Import Issues**
```bash
ERROR: Cannot find module '../lib/mommy-skill-tree'
CAUSE: Incorrect path or missing TypeScript compilation
FIX: Check import path and run tsc build
```

#### **2. MommySkillTreeError Not Defined**
```bash
ERROR: ReferenceError: MommySkillTreeError is not defined
CAUSE: Missing custom error class export
FIX: Ensure proper export in mommy-skill-tree.ts
```

#### **3. Skill Category Validation Failed**
```bash
ERROR: TypeError: Cannot read property 'xp' of undefined
CAUSE: Invalid skill category or uninitialized progress
FIX: Check VALID_CATEGORIES array and initialization
```

#### **4. Mock Function Issues**
```bash
ERROR: TypeError: mommyTree.checkLevelUp is not a function
CAUSE: Mock not properly set up for private methods
FIX: Use proper Jest spy setup
```

#### **5. Performance Test Timeout**
```bash
ERROR: Timeout exceeded (5000ms)
CAUSE: Performance test too strict or system overload
FIX: Adjust threshold or optimize method
```

---

## 🤖 **Debug với AI - Motherhood Testing Context**

### **📋 Prompt 4: Debug Failing Mommy Skill Tree Test**

```
Help me fix this failing unit test for Mommy Skill Tree application:

ERROR: [PASTE EXACT ERROR MESSAGE HERE]

TEST CODE:
```typescript
[PASTE YOUR FAILING TEST CODE HERE]
```

SOURCE CODE (addXP method):
```typescript
[PASTE MOMMY SKILL TREE addXP METHOD HERE]
```

CONTEXT: This is a motherhood skill development app with 4 categories (body, mind, emotion, growth). The addXP() method should:
1. Validate category is one of ['body', 'mind', 'emotion', 'growth']
2. Validate XP amount is positive number
3. Add XP to specific category
4. Update lastActivity timestamp
5. Check for level ups and skill unlocks
6. Return XPResult object

What's wrong and how to fix it? Provide specific solution with corrected code.
```

---

## 🎯 **Common Debug Scenarios & Solutions**

### **🟡 Scenario 1: Category Validation Error**

**Error:**
```
TypeError: Cannot read property 'includes' of undefined
at MommySkillTree.addXP (mommy-skill-tree.ts:45)
```

**AI Debug Prompt:**
```
Fix this Mommy Skill Tree validation error:

ERROR: TypeError: Cannot read property 'includes' of undefined

TEST: mommyTree.addXP('body', 25)
SOURCE: if (!category || !this.VALID_CATEGORIES.includes(category))

The error happens when checking valid motherhood categories. What's missing?
```

**Expected AI Solution:**
```typescript
// Problem: VALID_CATEGORIES not properly initialized
// Fix: Add proper initialization in constructor
constructor(userId: string, savedProgress?: Partial<UserProgress>) {
  this.VALID_CATEGORIES = ['body', 'mind', 'emotion', 'growth'] as const;
  // ... rest of constructor
}
```

### **🟡 Scenario 2: Mock Setup Issues**

**Error:**
```
TypeError: mommyTree.checkLevelUp is not a function
```

**AI Debug Prompt:**
```
Fix Jest mock setup for Mommy Skill Tree:

ERROR: TypeError: mommyTree.checkLevelUp is not a function

TEST CODE:
const checkLevelUpSpy = jest.spyOn(mommyTree, 'checkLevelUp');
checkLevelUpSpy.mockReturnValue(true);

SOURCE: Private method checkLevelUp() exists in class

Why can't Jest spy on this motherhood skill progression method?
```

**Expected AI Solution:**
```typescript
// Problem: Method is private, Jest can't spy on it
// Fix 1: Make method protected or public for testing
protected checkLevelUp(category: SkillCategory): boolean {
  // implementation
}

// Fix 2: Test through public interface instead
test('should trigger level progression', () => {
  // Set up conditions that naturally trigger level up
  mommyTree.progress.body.xp = 95; // Near threshold
  const result = mommyTree.addXP('body', 10); // Push over threshold
  expect(result.leveledUp).toBe(true);
});
```

### **🟡 Scenario 3: Performance Test Failures**

**Error:**
```
Expected: < 5
Received: 15.3
```

**AI Debug Prompt:**
```
Fix performance test for busy mom mobile app:

ERROR: Performance threshold exceeded
Expected: < 5ms
Received: 15.3ms

TEST: Mobile XP addition should complete within 5ms
CONTEXT: This is for busy moms who need instant feedback while managing babies

How to optimize addXP() method for mobile performance?
```

**Expected AI Solution:**
```typescript
// Problem: Performance optimization needed
// Fix: Optimize critical path and defer non-essential operations

addXP(category: SkillCategory, amount: number): XPResult {
  // Fast path validations (optimized)
  if (!this.VALID_CATEGORIES_SET.has(category)) {
    throw new MommySkillTreeError('Invalid category', 'INVALID_CATEGORY');
  }
  
  // Pre-compute values
  const previousXP = this.progress[category].xp;
  
  // Core operation (fastest possible)
  this.progress[category].xp += amount;
  this.progress[category].lastActivity = this.currentTimestamp; // Pre-computed
  
  // Defer heavy operations to next tick if needed
  const leveledUp = this.checkLevelUp(category);
  
  return {
    success: true,
    leveledUp,
    // ... other properties
  };
}
```

---

## 🎯 **Debug Workflow Optimization**

### **⚡ AI-Assisted Debug Process**

1. **📋 Copy Error Message** (exact text)
2. **📝 Gather Context** (test code + source code)
3. **🤖 Submit to AI** with motherhood context
4. **✅ Apply Solution** step by step
5. **🔄 Verify Fix** with test re-run
6. **📊 Check Coverage** maintained

### **🏆 Competition Debug Tips**

- **Keep error logs** for pattern analysis
- **Test one fix** at a time for clarity
- **Maintain test coverage** during debugging
- **Document solutions** for team learning
- **Use AI for** complex logic issues
- **Manual review for** domain-specific logic

---

## 🚀 **Production Debug Commands**

### **🔍 Advanced Debugging**
```bash
# Debug with breakpoints
node --inspect-brk node_modules/.bin/jest --runInBand mommy-skill-tree

# Memory leak detection
npm test -- --detectLeaks

# Coverage with source maps
npm test -- --coverage --sourceMaps

# Performance profiling
npm test -- --verbose --logHeapUsage

# Export coverage for analysis
npm test -- --coverage --coverageReporters=json-summary
```

### **📊 CI/CD Integration**
```bash
# Competition-ready test command
npm run test:competition -- --coverage --verbose --ci

# Performance benchmark
npm run test:performance -- --maxWorkers=1

# Full validation suite
npm run test:complete -- --coverage --detectOpenHandles --verbose
```

---

## 💡 **Success Metrics for Competition**

- **✅ All tests pass** (100% success rate)
- **✅ 95%+ code coverage** achieved
- **✅ Performance under 5ms** for mobile
- **✅ Zero memory leaks** detected
- **✅ Clean error handling** for edge cases

This comprehensive debugging approach demonstrates **professional testing practices** and **AI-assisted development workflow** - perfect for competition excellence! 🏆👑