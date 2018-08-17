# bs-custom-file-input

[![npm version](https://img.shields.io/npm/v/bs-custom-file-input.svg)](https://www.npmjs.com/package/bs-custom-file-input)
[![dependencies Status](https://img.shields.io/david/Johann-S/bs-custom-file-input.svg)](https://david-dm.org/Johann-S/bs-custom-file-input)
[![devDependencies Status](https://img.shields.io/david/dev/Johann-S/bs-custom-file-input.svg)](https://david-dm.org/Johann-S/bs-custom-file-input?type=dev)

A little plugin which dynamize Bootstrap 4 custom file input, with no dependencies.

Features:
 - Works with Bootstrap 4
 - Works without *dependencies*
 - Display file name
 - Display file names for `multiple` input
 - Reset your custom file input to their initial state
 - Small only **2kb** and less if you gzip it

## Install

### With NPM
```shell
npm install bs-custom-file-input --save
```

### CDN

CDN | Link
------------ | -------------
unpkg | [`https://unpkg.com/bs-custom-file-input`](https://unpkg.com/bs-custom-file-input) 
unpkg, minified | [`https://unpkg.com/bs-custom-file-input/dist/bs-custom-file-input.min.js`](https://unpkg.com/bs-custom-file-input/dist/bs-custom-file-input.min.js)

## How to use it

You should wait for the document ready event and call the init method to dynamize your custom file input.
We expose one global variable available everywhere : `bsCustomFileInput`

```javascript
$(document).ready(function () {
	bsCustomFileInput.init()
})
```

### Use it with npm

```javascript
import bsCustomFileInput from 'bs-custom-file-input'
```

For more example do not hesitate to open this file: https://github.com/Johann-S/bs-custom-file-input/blob/master/tests/index.html

This lib is UMD ready so you can use it everywhere

## Methods

### init

This method will find your Bootstrap custom file input and will dynamize them.

### destroy

This method will remove this plugin from your Bootstrap custom file input and restore them at their first initial state

## License

[MIT](https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
