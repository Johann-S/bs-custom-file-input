import { getDefaultText, restoreDefaultText } from './util'
import {
  handleFormReset,
  handleInputChange,
} from './eventHandlers'
import Selector from './selector'

const Event = {
  FORMRESET     : 'reset',
  INPUTCHANGE   : 'change',
  INPUTFOCUSIN  : 'focusin',
  INPUTFOCUSOUT : 'focusout',
}

const customProperty = 'bsCustomFileInput'

let customFormSelector = null
let customInputSelector = null

const bsCustomFileInput = {
  init(inputSelector = Selector.CUSTOMFILE, formSelector = Selector.FORM) {
    customInputSelector = inputSelector
    customFormSelector = formSelector

    const customFileInputList = [].slice.call(document.querySelectorAll(customInputSelector))
    const formList = [].slice.call(document.querySelectorAll(customFormSelector))

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
    const formList = [].slice.call(document.querySelectorAll(customFormSelector))
    const customFileInputList = [].slice.call(document.querySelectorAll(customInputSelector))
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
