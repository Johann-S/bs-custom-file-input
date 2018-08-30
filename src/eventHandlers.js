import Selector from './selector'
import { restoreDefaultText } from './util'

const fileApi = !!window.File

const getSelectedFiles = (input) => {
  if (input.hasAttribute('multiple') && fileApi) {
    const files = [].slice.call(input.files)
      .map((file) => file.name)

    return files.join(', ')
  } else {
    return input.value
  }
}

function handleInputChange() {
  const label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    label.innerHTML = getSelectedFiles(this)
  }
}

function handleFormReset() {
  const customFileList = [].slice.call(this.querySelectorAll(Selector.CUSTOMFILE))

  for (let i = 0, len = customFileList.length; i < len; i++) {
    restoreDefaultText(customFileList[i])
  }
}

function handleDrop(event) {
  event.preventDefault()

  const label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    const fileNamesList = [].slice.call(event.dataTransfer.files)
      .map((file) => file.name)

    label.innerHTML = this.hasAttribute('multiple')
      ? fileNamesList.join(', ')
      : fileNamesList[0]
  }
}

function handleDragOver(event) {
  event.preventDefault()
}

export {
  handleDragOver,
  handleDrop,
  handleInputChange,
  handleFormReset,
}
