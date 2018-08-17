/*!
 * BsCustomFileInput v1.0.0 (https://github.com/Johann-S/bs-custom-file-input)
 * Copyright 2018 Johann-S <johann.servoire@gmail.com>
 * Licensed under MIT (https://github.com/Johann-S/bs-custom-file-input/blob/master/LICENSE)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.bsCustomFileInput = factory());
}(this, (function () { 'use strict';

	var Selector = {
	  CUSTOMFILE: '.custom-file input[type="file"]',
	  CUSTOMFILELABEL: '.custom-file-label',
	  FORM: 'form'
	};

	var getDefaultText = function getDefaultText(input) {
	  var defaultText = '';

	  if (input.parentNode) {
	    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

	    if (label) {
	      defaultText = label.innerHTML;
	    }
	  }

	  return defaultText;
	};

	var restoreDefaultText = function restoreDefaultText(input) {
	  var defaultText = input.bsCustomFileInput.defaultText;

	  if (input.parentNode) {
	    var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

	    if (label) {
	      label.innerHTML = defaultText;
	    }
	  }
	};

	var fileApi = !!window.File;

	var getSelectedFiles = function getSelectedFiles(input) {
	  if (input.hasAttribute('multiple') && fileApi) {
	    var files = [].slice.call(input.files).map(function (file) {
	      return file.name;
	    });
	    return files.join(', ');
	  } else {
	    return input.value;
	  }
	};

	function handleInputChange() {
	  if (this.parentNode) {
	    var label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL);

	    if (label) {
	      label.innerHTML = getSelectedFiles(this);
	    }
	  }
	} // Needed for keyboard users in firefox


	function handleFocusin() {
	  this.classList.add('focus');
	} // Needed for keyboard users in firefox


	function handleFocusout() {
	  this.classList.remove('focus');
	}

	function handleFormReset() {
	  var customFileList = [].slice.call(this.querySelectorAll(Selector.CUSTOMFILE));

	  for (var i = 0, len = customFileList.length; i < len; i++) {
	    restoreDefaultText(customFileList[i]);
	  }
	}

	var Event = {
	  INPUTCHANGE: 'change',
	  INPUTFOCUSIN: 'focusin',
	  INPUTFOCUSOUT: 'focusout',
	  FORMRESET: 'reset'
	};
	var bsCustomFileInput = {
	  init: function init() {
	    var customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE));
	    var formList = [].slice.call(document.querySelectorAll(Selector.FORM));

	    for (var i = 0, len = customFileInputList.length; i < len; i++) {
	      var input = customFileInputList[i];
	      Object.defineProperty(input, 'bsCustomFileInput', {
	        value: {
	          defaultText: getDefaultText(input)
	        }
	      });
	      input.addEventListener(Event.INPUTCHANGE, handleInputChange);
	      input.addEventListener(Event.INPUTFOCUSIN, handleFocusin);
	      input.addEventListener(Event.INPUTFOCUSOUT, handleFocusout);
	    }

	    for (var _i = 0, _len = formList.length; _i < _len; _i++) {
	      formList[_i].addEventListener(Event.FORMRESET, handleFormReset);
	    }
	  },
	  destroy: function destroy() {
	    var formList = [].slice.call(document.querySelectorAll(Selector.FORM));
	    var customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE)).filter(function (input) {
	      return !!input.bsCustomFileInput;
	    });

	    for (var i = 0, len = customFileInputList.length; i < len; i++) {
	      var input = customFileInputList[i];
	      restoreDefaultText(input);
	      input.removeEventListener(Event.INPUTCHANGE, handleInputChange);
	      input.removeEventListener(Event.INPUTFOCUSIN, handleFocusin);
	      input.removeEventListener(Event.INPUTFOCUSOUT, handleFocusout);
	    }

	    for (var _i2 = 0, _len2 = formList.length; _i2 < _len2; _i2++) {
	      formList[_i2].removeEventListener(Event.FORMRESET, handleFormReset);
	    }
	  }
	};

	return bsCustomFileInput;

})));
//# sourceMappingURL=bs-custom-file-input.js.map
