# bs-custom-file-input

A little plugin for Bootstrap 4 custom file input, with no dependencies.

## Install

```shell
npm install bs-custom-file-input --save
```

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
