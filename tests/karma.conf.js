/* eslint-env node */
const path = require('path')
const ip = require('ip')
const {
  browsers,
  browsersKeys,
} = require('./browsers')

const coveragePath = path.resolve(__dirname, 'coverage')
const browserTest = process.env.browser === 'true'

module.exports = function(config) {
  const conf = {
    basePath: '../',
    frameworks: ['chai', 'mocha', 'sinon'],
    files: [
      'tests/coverage/bs-custom-file-input.js',
      'tests/polyfill.js',
      'tests/units/index.spec.js',
      'tests/units/eventHandlers.spec.js',
    ],
    exclude: [
      'tests/*.html',
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR || config.LOG_WARN,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
  }

  if (browserTest) {
    conf.files[0] = 'dist/bs-custom-file-input.min.js'
    conf.hostname = ip.address()
    conf.browserStack = {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      build: `bsCustomFileInput-${new Date().toISOString()}`,
      project: 'bsCustomFileInput',
      retryLimit: 2,
    }

    conf.customLaunchers = browsers
    conf.browsers = browsersKeys
    conf.reporters.push('BrowserStack')
  } else {
    conf.reporters.push('coverage-istanbul')
    conf.coverageIstanbulReporter = {
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
    }
  }

  config.set(conf)
}
