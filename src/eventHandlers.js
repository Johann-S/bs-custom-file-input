import { findFirstChildNode, restoreDefaultText } from './util'
import Selector from './selector'

const fileApi = !!window.File
const FAKE_PATH = 'fakepath'
const FAKE_PATH_SEPARATOR = '\\'

const getSelectedFiles = (input) => {
  if (input.hasAttribute('multiple') && fileApi) {
    return [].slice.call(input.files)
      .map((file) => file.name)
      .join(', ')
  }

  if (input.value.indexOf(FAKE_PATH) !== -1) {
    const splittedValue = input.value.split(FAKE_PATH_SEPARATOR)

    return splittedValue[splittedValue.length - 1]
  }

  return input.value
}

function handleInputChange() {
  const label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    const element = findFirstChildNode(label)
    const inputValue = getSelectedFiles(this)

    if (inputValue.length) {
      element.textContent = inputValue
    } else {
      restoreDefaultText(this)
    }
  }
}

function handleFormReset() {
  const customFileList = [].slice.call(this.querySelectorAll(Selector.INPUT))
    .filter((input) => !!input.bsCustomFileInput)

  for (let i = 0, len = customFileList.length; i < len; i++) {
    restoreDefaultText(customFileList[i])
  }
}

export {
  handleInputChange,
  handleFormReset,
}
