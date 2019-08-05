module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  setupFiles: ['<rootDir>/enzyme.config.js'],
}
