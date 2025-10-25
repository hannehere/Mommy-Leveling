// jest.setup.js - Jest setup file
// Global test configuration and utilities

// Mock console.log for animation functions to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn()
};

// Mock performance API for Node.js environment
if (typeof performance === 'undefined') {
  global.performance = {
    now: () => Date.now()
  };
}

// Global test timeout
jest.setTimeout(10000);