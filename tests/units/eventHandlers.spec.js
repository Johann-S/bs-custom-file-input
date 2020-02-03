var customInputFile = [
  '<div class="custom-file">',
  '  <input type="file" class="custom-file-input">',
  '  <label class="custom-file-label">Choose file</label>',
  '</div>',
].join('')

describe('eventHandlers.js', function () {
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

  describe('handleInputChange', function () {
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

    it('should change the label when a file is selected and escape html', function (done) {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')
      var expectedValue = '&lt;svg onload=alert(1)&gt;'

      input.addEventListener('change', function () {
        expect(label.innerHTML).equal(expectedValue)
        done()
      })

      Object.defineProperty(input, 'value', {
        value: '<svg onload=alert(1)>',
      })

      input.dispatchEvent(new Event('change'))
    })

    it('should remove fakepath if found', function (done) {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      input.addEventListener('change', function () {
        expect(label.innerHTML).equal('myFakeFile.exe')
        done()
      })

      Object.defineProperty(input, 'value', {
        value: 'C:\\fakepath\\myFakeFile.exe',
      })

      input.dispatchEvent(new Event('change'))
    })

    it('should restore default text if value is empty', function (done) {
      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      function firstListener() {
        expect(label.innerHTML).equal('myFakeFile.exe')
        input.removeEventListener('change', firstListener)

        input.addEventListener('change', secondListener)
        input.value = ''
        input.dispatchEvent(new Event('change'))
      }

      function secondListener() {
        expect(label.innerHTML).equal('Choose file')
        done()
      }

      input.addEventListener('change', firstListener)

      Object.defineProperty(input, 'value', {
        value: 'myFakeFile.exe',
        configurable: true,
        writable: true,
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

    it('should not write in label if there is a child', function (done) {
      mochaFixtureDiv.innerHTML = [
        '<div class="custom-file">',
        '  <input type="file" class="custom-file-input" multiple>',
        '  <label class="custom-file-label">',
        '    <span>Choose file</span>',
        '  </label>',
        '</div>',
      ].join('')

      bsCustomFileInput.init()

      var span = document.querySelector('.custom-file-label span')
      input = document.querySelector('input')

      input.addEventListener('change', function () {
        expect(span.innerHTML).equal('myFakeFile.exe, fakeImage.png')
        done()
      })

      Object.defineProperty(input, 'files', {
        value: [
          new File([], 'myFakeFile.exe'),
          new File([], 'fakeImage.png'),
        ],
      })

      input.dispatchEvent(new Event('change'))
    })

    it('should use the label if no children', function (done) {
      mochaFixtureDiv.innerHTML = [
        '<div class="custom-file">',
        '  <input type="file" class="custom-file-input" multiple>',
        '  <label class="custom-file-label"></label>',
        '</div>',
      ].join('')

      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')
      input = document.querySelector('input')

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

      input.dispatchEvent(new Event('change'))
    })
  })

  describe('handleFormReset', function () {
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
