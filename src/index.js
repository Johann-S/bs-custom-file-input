import { getDefaultText, restoreDefaultText } from './util'
import { handleFormReset, handleInputChange } from './eventHandlers'
import Selector from './selector'

const customProperty = 'bsCustomFileInput'
const Event = {
  FORMRESET   : 'reset',
  INPUTCHANGE : 'change',
}

const bsCustomFileInput = {
  init(inputSelector = Selector.CUSTOMFILE, formSelector = Selector.FORM) {
    const customFileInputList = [].slice.call(document.querySelectorAll(inputSelector))
    const formList = [].slice.call(document.querySelectorAll(formSelector))

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      Object.defineProperty(input, customProperty, {
        value: {
          defaultText: getDefaultText(input),
        },
        writable: true,
      })

      handleInputChange.call(input)
      input.addEventListener(Event.INPUTCHANGE, handleInputChange)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].addEventListener(Event.FORMRESET, handleFormReset)
      Object.defineProperty(formList[i], customProperty, {
        value: true,
        writable: true,
      })
    }
  },

  destroy() {
    const formList = [].slice.call(document.querySelectorAll(Selector.FORM))
      .filter((form) => !!form.bsCustomFileInput)
    const customFileInputList = [].slice.call(document.querySelectorAll(Selector.INPUT))
      .filter((input) => !!input.bsCustomFileInput)

    for (let i = 0, len = customFileInputList.length; i < len; i++) {
      const input = customFileInputList[i]

      restoreDefaultText(input)
      input[customProperty] = undefined

      input.removeEventListener(Event.INPUTCHANGE, handleInputChange)
    }

    for (let i = 0, len = formList.length; i < len; i++) {
      formList[i].removeEventListener(Event.FORMRESET, handleFormReset)
      formList[i][customProperty] = undefined
    }
  },
}

export default bsCustomFileInput
