import { getDefaultText, restoreDefaultText } from './util'
import {
  handleFormReset,
  handleInputChange,
} from './eventHandlers'
import Selector from './selector'

const Event = {
  INPUTCHANGE   : 'change',
  INPUTFOCUSIN  : 'focusin',
  INPUTFOCUSOUT : 'focusout',
  FORMRESET     : 'reset',
}

const customProperty = 'bsCustomFileInput'

const bsCustomFileInput = {
  customInputSelector: null,
  customFormSelector: null,

  init(inputSelector = Selector.CUSTOMFILE, formSelector = Selector.FORM) {
    this.customInputSelector = inputSelector
    this.customFormSelector = formSelector

    const customFileInputList = [].slice.call(document.querySelectorAll(this.customInputSelector))
    const formList = [].slice.call(document.querySelectorAll(this.customFormSelector))

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      Object.defineProperty(input, customProperty, {
        value: {
          defaultText: getDefaultText(input),
        },
        writable: true,
      })

      input.addEventListener(Event.INPUTCHANGE, handleInputChange)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].addEventListener(Event.FORMRESET, handleFormReset)
    }
  },

  destroy() {
    const formList = [].slice.call(document.querySelectorAll(this.customFormSelector))
    const customFileInputList = [].slice.call(document.querySelectorAll(this.customInputSelector))
      .filter((input) => !!input.bsCustomFileInput)

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      restoreDefaultText(input)
      input[customProperty] = undefined

      input.removeEventListener(Event.INPUTCHANGE, handleInputChange)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].removeEventListener(Event.FORMRESET, handleFormReset)
    }
  },
}

export default bsCustomFileInput
