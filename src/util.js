import Selector from './selector'

const getDefaultText = (input) => {
  let defaultText = ''

  const label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    defaultText = label.innerHTML
  }

  return defaultText
}

const restoreDefaultText = (input) => {
  const defaultText = input.bsCustomFileInput.defaultText
  const label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    label.innerHTML = defaultText
  }
}

export {
  getDefaultText,
  restoreDefaultText,
}
