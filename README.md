# bs-custom-file-input

[![npm version](https://img.shields.io/npm/v/bs-custom-file-input.svg)](https://www.npmjs.com/package/bs-custom-file-input)
[![dependencies Status](https://img.shields.io/david/Johann-S/bs-custom-file-input.svg)](https://david-dm.org/Johann-S/bs-custom-file-input)
[![devDependencies Status](https://img.shields.io/david/dev/Johann-S/bs-custom-file-input.svg)](https://david-dm.org/Johann-S/bs-custom-file-input?type=dev)
[![Build Status](https://img.shields.io/travis/Johann-S/bs-custom-file-input/master.svg)](https://travis-ci.org/Johann-S/bs-custom-file-input)
![Coveralls github branch](https://img.shields.io/coveralls/github/Johann-S/bs-custom-file-input/master.svg)

A little plugin which makes Bootstrap 4 custom file input dynamic with no dependencies.

Features:

- Works with Bootstrap 4
- Works without *dependencies*
- Display file name
- Display file names for `multiple` input
- Reset your custom file input to its initial state
- Small, only **2kb** and less if you gzip it

## Install

### With npm

```sh
npm install bs-custom-file-input --save
```

### CDN

CDN | Link
------------ | -------------
unpkg | [`https://unpkg.com/bs-custom-file-input`](https://unpkg.com/bs-custom-file-input)
unpkg, minified | [`https://unpkg.com/bs-custom-file-input/dist/bs-custom-file-input.min.js`](https://unpkg.com/bs-custom-file-input/dist/bs-custom-file-input.min.js)

## How to use it

You should wait for the document ready event and call the `init` method to make your custom file input dynamic.
We expose one global variable available everywhere: `bsCustomFileInput`

```js
$(document).ready(function () {
  bsCustomFileInput.init()
})
```

### Use it with npm

```js
import bsCustomFileInput from 'bs-custom-file-input'
```

For more examples check out [this file](https://github.com/Johann-S/bs-custom-file-input/blob/master/tests/index.html).

This library is UMD ready so you can use it everywhere.

## Methods

### init

Finds your Bootstrap custom file input and will make them dynamic.

### destroy

Removes this plugin from your Bootstrap custom file input and restore them at their first initial state

## License

[MIT](https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
