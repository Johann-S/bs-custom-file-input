import { restoreDefaultText } from './util'
import Selector from './selector'

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
	if (this.parentNode) {
		const label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL)

		if (label) {
			label.innerHTML = getSelectedFiles(this)
		}
	}
}

// Needed for keyboard users in firefox
function handleFocusin() {
	this.classList.add('focus')
}

// Needed for keyboard users in firefox
function handleFocusout() {
	this.classList.remove('focus')
}

function handleFormReset() {
	const customFileList = [].slice.call(this.querySelectorAll(Selector.CUSTOMFILE))

	for (let i = 0, len = customFileList.length; i < len; i++) {
		restoreDefaultText(customFileList[i])
	}
}

export {
	handleInputChange,
	handleFocusin,
	handleFocusout,
	handleFormReset,
}
