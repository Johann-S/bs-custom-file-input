var customInputFile = [
  '<div class="custom-file">',
  '  <input type="file" class="custom-file-input">',
  '  <label class="custom-file-label">Choose file</label>',
  '</div>',
].join('')

describe('index.js', function () {
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

    it('should display already selected files on init', function () {
      input.setAttribute('multiple', '')
      Object.defineProperty(input, 'files', {
        value: [
          new File([], 'myFakeFile.exe'),
          new File([], 'fakeImage.png'),
        ],
      })

      bsCustomFileInput.init()

      var label = document.querySelector('.custom-file-label')

      expect(label.innerHTML).equal('myFakeFile.exe, fakeImage.png')
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
})
