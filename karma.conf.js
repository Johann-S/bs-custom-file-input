/* eslint-env node */
const path = require('path')
const coveragePath = path.resolve(__dirname, 'tests/coverage')

module.exports = function(config) {
  config.set({
    frameworks: ['chai', 'mocha', 'sinon'],
    files: [
      'tests/coverage/bs-custom-file-input.js',
      'tests/*.js',
    ],
    exclude: [
      'tests/*.html',
    ],
    reporters: ['dots', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      dir: coveragePath,
      reports: ['lcov', 'text-summary'],
      thresholds: {
        emitWarning: false,
        global: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
        },
      },
    },
  })
}
