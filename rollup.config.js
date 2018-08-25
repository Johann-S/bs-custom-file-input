/* eslint-env node */

const path = require('path')
const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

const pkg = require(path.resolve(__dirname, 'package.json'))
const year = new Date().getFullYear()

const buildProd = process.env.PROD === 'true'
let fileDest = './dist/bs-custom-file-input.js'

const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
]

if (buildProd) {
  fileDest = './dist/bs-custom-file-input.min.js'
  plugins.push(uglify({
    output: {
      comments: /^!/,
    },
  }))
}

module.exports = {
  input: './src/index.js',
  output: {
    banner:
`/*!
 * BsCustomFileInput v${pkg.version} (${pkg.homepage})
 * Copyright ${year} ${pkg.author}
 * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
 */`,
    file: fileDest,
    format: 'umd',
    name: 'bsCustomFileInput',
    sourcemap: true,
  },
  watch: {
    include: 'src/**.js',
  },
  plugins,
}
