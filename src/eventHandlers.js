import { findFirstChildNode, restoreDefaultText } from './util'
import Selector from './selector'

const fileApi = !!window.File

const getSelectedFiles = (input) => {
  if (input.hasAttribute('multiple') && fileApi) {
    const files = [].slice.call(input.files)
      .map((file) => file.name)

    return files.join(', ')
  }

  return input.value
}

function handleInputChange() {
  const label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    const element = findFirstChildNode(label)
    element.innerHTML = getSelectedFiles(this)
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
