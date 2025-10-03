module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/setup-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
