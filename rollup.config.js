/* eslint-env node */

const path = require('path')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

const pkg = require(path.resolve(__dirname, 'package.json'))
const year = new Date().getFullYear()

const buildProd = process.env.PROD === 'true'
const buildTest = process.env.TEST === 'true'
const buildDev = process.env.DEV === 'true'

const conf = {
  input: './src/index.js',
  output: {
    banner:
`/*!
 * bsCustomFileInput v${pkg.version} (${pkg.homepage})
 * Copyright 2018 - ${year} ${pkg.author}
 * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
 */`,
    file: './dist/bs-custom-file-input.js',
    format: 'umd',
    name: 'bsCustomFileInput',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}

if (buildTest) {
  conf.output.file = './tests/coverage/bs-custom-file-input.js'
}

if (buildDev) {
  conf.output.file = './tests/coverage/bs-custom-file-input.js'
  conf.watch = {
    include: 'src/**.js',
  }
}

if (buildProd) {
  conf.output.file = './dist/bs-custom-file-input.min.js'
  conf.plugins.push(uglify({
    compress: {
      typeofs: false,
    },
    mangle: true,
    output: {
      comments: /^!/,
    },
  }))
}

module.exports = conf
