/* eslint-env mocha, browser */
/* global bsCustomFileInput: false, expect: false, assert: false, sinon: false */

var mochaDiv

document.addEventListener('DOMContentLoaded', function() {
  mochaDiv = document.createElement('div')
  mochaDiv.setAttribute('id', 'mocha')

  document.body.appendChild(mochaDiv)
})

var customInputFile = [
  '<div class="custom-file">',
  '  <input type="file" class="custom-file-input">',
  '  <label class="custom-file-label">Choose file</label>',
  '</div>',
].join('')

describe('bsCustomInputFile', function () {
  var mochaDiv
  var input

  before(function () {
    mochaDiv = document.getElementById('mocha')
  })

  beforeEach(function() {
    mochaDiv.innerHTML = customInputFile
    input = document.querySelector('input')
  })

  afterEach(function () {
    mochaDiv.innerHTML = ''
  })

  describe('init', function () {
    it('should add bsCustomFileInput property', function () {
      bsCustomFileInput.init()

      expect(input.bsCustomFileInput).to.not.undefined
    })

    it('should store default text', function () {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      expect(input.bsCustomFileInput.defaultText).equal(label.innerHTML)
    })

    it('should add listener to the given input', function () {
      var spy = sinon.spy(input, 'addEventListener')

      bsCustomFileInput.init()

      expect(spy.callCount).equal(3)
    })

    it('should add an event listener on forms', function () {
      var form = document.createElement('form')
      form.innerHTML = customInputFile

      mochaDiv.appendChild(form)

      var spy = sinon.spy(form, 'addEventListener')

      bsCustomFileInput.init()

      expect(spy.called).to.be.true
    })
  })

  describe('destroy', function () {
    it('should remove bsCustomFileInput property', function () {
      bsCustomFileInput.init()
      bsCustomFileInput.destroy()

      expect(input.bsCustomFileInput).to.undefined
    })

    it('should remove event listener on forms', function () {
      var form = document.createElement('form')
      form.innerHTML = [
        '<div class="custom-file">',
        '  <input type="file" class="custom-file-input">',
        '</div>',
      ].join('')

      mochaDiv.appendChild(form)

      var spy = sinon.spy(form, 'removeEventListener')

      bsCustomFileInput.init()
      bsCustomFileInput.destroy()

      expect(spy.called).to.be.true
    })
  })

  describe('util - handleInputChange', function () {
    it('should change the label when a file is selected', function (done) {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      input.addEventListener('change', function () {
        expect(label.innerHTML).equal(input.value)
        done()
      })

      Object.defineProperty(input, 'value', {
        value: 'myFakeFile.exe',
      })

      input.dispatchEvent(new Event('change'))
    })

    it('should change the label when files are selected', function (done) {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      input.addEventListener('change', function () {
        expect(label.innerHTML).equal('myFakeFile.exe, fakeImage.png')
        done()
      })

      Object.defineProperty(input, 'files', {
        value: [
          new File([], 'myFakeFile.exe'),
          new File([], 'fakeImage.png'),
        ],
      })

      input.setAttribute('multiple', '')
      input.dispatchEvent(new Event('change'))
    })

    it('should do nothing if the input file has no label element', function (done) {
      mochaDiv.innerHTML = [
        '<div class="custom-file">',
        '  <input type="file" class="custom-file-input">',
        '</div>',
      ].join('')

      bsCustomFileInput.init()

      input = document.querySelector('input')

      input.addEventListener('change', function () {
        expect(input.bsCustomFileInput).not.undefined
        done()
      })

      input.dispatchEvent(new Event('change'))
    })
  })

  describe('util - handleFormReset', function () {
    var form

    beforeEach(function () {
      form = document.createElement('form')
      form.innerHTML = customInputFile

      mochaDiv.innerHTML = ''
      mochaDiv.appendChild(form)

      input = document.querySelector('input')
    })

    it('should reset input value and restore default text', function (done) {
      bsCustomFileInput.init()
      var label = document.querySelector('.custom-file-label')

      input.addEventListener('change', function () {
        expect(label.innerHTML).equal('myFakeFile.exe')

        form.reset()

        expect(label.innerHTML).equal('Choose file')
        done()
      })

      Object.defineProperty(input, 'value', {
        value: 'myFakeFile.exe',
      })

      input.dispatchEvent(new Event('change'))
    })
  })

  describe('util - handleFocusin', function () {
    it('should add focus class', function (done) {
      bsCustomFileInput.init()

      input.addEventListener('focusin', function () {
        assert.ok(input.classList.contains('focus'))
        done()
      })

      input.dispatchEvent(new Event('focusin'))
    })
  })

  describe('util - handleFocusout', function () {
    it('should remove focus class', function (done) {
      bsCustomFileInput.init()

      input.addEventListener('focusout', function () {
        assert.ok(!input.classList.contains('focus'))
        done()
      })

      input.dispatchEvent(new Event('focusin'))
      input.dispatchEvent(new Event('focusout'))
    })
  })
})
