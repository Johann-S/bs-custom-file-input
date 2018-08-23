import { getDefaultText, restoreDefaultText } from './util'
import {
  handleFocusin,
  handleFocusout,
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
  init() {
    const customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE))
    const formList = [].slice.call(document.querySelectorAll(Selector.FORM))

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      Object.defineProperty(input, customProperty, {
        value: {
          defaultText: getDefaultText(input),
        },
      })

      input.addEventListener(Event.INPUTCHANGE, handleInputChange)
      input.addEventListener(Event.INPUTFOCUSIN, handleFocusin)
      input.addEventListener(Event.INPUTFOCUSOUT, handleFocusout)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].addEventListener(Event.FORMRESET, handleFormReset)
    }
  },

  destroy() {
    const formList = [].slice.call(document.querySelectorAll(Selector.FORM))
    const customFileInputList = [].slice.call(document.querySelectorAll(Selector.CUSTOMFILE))
      .filter((input) => !!input.bsCustomFileInput)

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      restoreDefaultText(input)
      delete input[customProperty]

      input.removeEventListener(Event.INPUTCHANGE, handleInputChange)
      input.removeEventListener(Event.INPUTFOCUSIN, handleFocusin)
      input.removeEventListener(Event.INPUTFOCUSOUT, handleFocusout)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].removeEventListener(Event.FORMRESET, handleFormReset)
    }
  },
}

export default bsCustomFileInput
