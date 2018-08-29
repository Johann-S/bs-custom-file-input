var customInputFile = [
  '<div class="custom-file">',
  '  <input type="file" class="custom-file-input">',
  '  <label class="custom-file-label">Choose file</label>',
  '</div>',
].join('')


var mochaFixtureDiv = document.createElement('div')
mochaFixtureDiv.setAttribute('id', 'mocha-fixture')
document.body.appendChild(mochaFixtureDiv)

describe('bsCustomInputFile', function () {
  var input
  var mochaFixtureDiv

  before(function () {
    mochaFixtureDiv = document.getElementById('mocha-fixture')
  })

  beforeEach(function() {
    mochaFixtureDiv.innerHTML = customInputFile
    input = document.querySelector('input')
  })

  afterEach(function () {
    mochaFixtureDiv.innerHTML = ''
  })

  describe('init', function () {
    it('should add bsCustomFileInput property', function () {
      bsCustomFileInput.init()

      expect(input.bsCustomFileInput).not.undefined
    })

    it('should store default text', function () {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      expect(input.bsCustomFileInput.defaultText).equal(label.innerHTML)
    })

    it('should add listener to the given input', function () {
      var spy = sinon.spy(input, 'addEventListener')

      bsCustomFileInput.init()

      expect(spy.called).equal(true)
    })

    it('should add an event listener on forms', function () {
      var form = document.createElement('form')
      form.innerHTML = customInputFile

      mochaFixtureDiv.appendChild(form)

      var spy = sinon.spy(form, 'addEventListener')

      bsCustomFileInput.init()

      expect(spy.called).to.be.true
    })

    it('should store custom input selector and custom form selector', function () {
      bsCustomFileInput.init('input', '.form')

      expect(bsCustomFileInput.customInputSelector).equal('input')
      expect(bsCustomFileInput.customFormSelector).equal('.form')
    })

    it('should select only my custom input selector', function () {
      mochaFixtureDiv.innerHTML = [
        '<input type="file" id="test" />',
        customInputFile,
      ].join('')

      bsCustomFileInput.init('#test')

      var testInput = document.getElementById('test')
      var otherInput = document.querySelector('.custom-file input[type="file"]')

      expect(testInput.bsCustomFileInput).not.undefined
      expect(otherInput.bsCustomFileInput).undefined
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

      mochaFixtureDiv.appendChild(form)

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
      mochaFixtureDiv.innerHTML = [
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

      mochaFixtureDiv.innerHTML = ''
      mochaFixtureDiv.appendChild(form)

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
})
