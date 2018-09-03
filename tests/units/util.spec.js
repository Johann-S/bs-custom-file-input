var customInputFile = [
  '<div class="custom-file">',
  '  <input type="file" class="custom-file-input">',
  '  <label class="custom-file-label">Choose file</label>',
  '</div>',
].join('')

describe('util.js', function () {
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
