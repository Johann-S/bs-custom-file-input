import Selector from './selector'

const textNodeType = 3
const getDefaultText = (input) => {
  let defaultText = ''

  const label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    defaultText = label.textContent
  }

  return defaultText
}

const findFirstChildNode = (element) => {
  if (element.childNodes.length > 0) {
    const childNodes = [].slice.call(element.childNodes)

    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i]
      if (node.nodeType !== textNodeType) {
        return node
      }
    }
  }

  return element
}

const restoreDefaultText = (input) => {
  const defaultText = input.bsCustomFileInput.defaultText
  const label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL)

  if (label) {
    const element = findFirstChildNode(label)

    element.textContent = defaultText
  }
}

export {
  getDefaultText,
  findFirstChildNode,
  restoreDefaultText,
}
